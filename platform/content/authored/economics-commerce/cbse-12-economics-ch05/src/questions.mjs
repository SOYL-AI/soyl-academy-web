// CBSE 12 Economics, ch05 Balance of Payments — question bank. Every country, account and schedule is
// imagined by SOYL; no NCERT exercise, boxed example or board/sample-paper item is reused. Every number
// in a key or worked solution is computed here, so stems, keys and solutions cannot drift apart.
// Units: imagined countries in USD million; exchange rates in rupees per US dollar (imagined schedules,
// not market rates).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

/** Indian digit grouping. */
export const f = (n) => n.toLocaleString('en-IN');
export const must = (cond, msg) => {
  if (!cond) throw new Error(`ch05 numbers changed: ${msg} (update the text)`);
};
/** Balance-of-payments arithmetic: goods, services, income and transfers, then autonomous capital flows. */
export function bop(o) {
  const bot = o.xg - o.mg;
  const svc = o.xs - o.ms;
  const inc = o.ir - o.ip;
  const tr = o.tr - o.tp;
  const invis = svc + inc + tr;
  const cab = bot + invis;
  const ka = o.fdi + o.fpi + o.loans;
  return { bot, svc, inc, tr, invis, cab, ka, overall: cab + ka };
}
/** Linear foreign-exchange market: Qd = a − b·e, Qs = c + d·e (e in ₹ per USD). */
export const eqRate = (a, b, c, d) => (a - c) / (b + d);

// ================================================================ t01 Balance of payments account
Q('m_bop_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The balance of payments of a country is',
  opts: [
    'a systematic record of all economic transactions between its residents and the rest of the world during a period',
    'a record of only the exports and imports of goods during a year',
    'the stock of foreign currency held by the central bank on a given date',
    'the difference between the government\'s receipts and expenditure',
  ],
  sol: 'BoP covers every economic transaction with non-residents (goods, services, income, transfers, assets and liabilities) over a period, usually a year. Exports and imports of goods alone form the balance of trade; reserves are a stock; receipts and expenditure of the government form the budget.',
}));
Q('m_visible', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Exports and imports of **goods** are called visible items because',
  opts: ['goods are physical and can be seen and recorded as they cross the border', 'they are recorded in the capital account', 'they are always larger than trade in services', 'they are financed by the central bank'],
  sol: 'Goods are tangible: customs can see and record them at ports and border posts. Services, income and transfers cannot be seen in this way, so they are called invisibles. Goods trade is in the current account, its size varies by country, and it is financed by buyers and sellers, not the central bank.',
}));
Q('m_ca_item', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A nurse from Kerala working in an imagined Gulf country sends money every month to her parents in Kochi. In India\'s BoP this is recorded as',
  opts: ['a receipt in the current account under transfers', 'a payment in the current account under services', 'a receipt in the capital account as foreign investment', 'a payment in the capital account as a loan'],
  sol: 'Money sent home by workers abroad is a one-way transfer: nothing is given back for it. It brings foreign exchange into India, so it is a receipt (credit) under current transfers. It is not a service sold, an investment or a loan.',
}));
Q('m_ka_item', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which one of the following is recorded in the **capital account** of India\'s BoP?',
  opts: [
    'A foreign car company builds a factory near Chennai',
    'An Indian software firm earns fees for designing an app for a client in Germany',
    'A family in Punjab receives a gift from relatives in Canada',
    'India imports crude oil from abroad',
  ],
  sol: 'Building a factory is foreign direct investment: it creates an asset owned by a non-resident, a claim on India, so it is a capital-account item. Software fees are a service export, the gift is a current transfer, and oil is a visible import; all three are current-account items.',
}));
Q('m_autonomous', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Autonomous transactions in the BoP are those that',
  opts: [
    'are made for their own sake, such as profit or consumption, independent of the BoP position',
    'are made by the central bank to cover a gap in the BoP',
    'are recorded only in the capital account',
    'can never be in deficit',
  ],
  sol: 'Autonomous ("above the line") transactions happen because of economic motives such as profit, trade or consumption, whatever the state of the BoP. Transactions made to fill the gap left by them are accommodating ("below the line"). Autonomous items appear in both accounts and can show a deficit.',
}));
Q('m_accommodating', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The central bank of an imagined country sells US dollars from its reserves because autonomous payments exceeded autonomous receipts this year. This sale is',
  opts: ['an accommodating transaction', 'an autonomous transaction', 'a visible item of the current account', 'a current transfer'],
  sol: 'The sale is made only to cover the gap between autonomous payments and receipts, so it is an accommodating (below-the-line) transaction, often called official reserve transactions. It is not undertaken for profit, it is not trade in goods, and it is not a gift.',
}));
Q('m_deficit_meaning', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A **BoP deficit** means that',
  opts: [
    'autonomous payments to the rest of the world exceed autonomous receipts from it',
    'imports of goods exceed exports of goods',
    'the government spends more than it earns',
    'the capital account shows a surplus',
  ],
  sol: 'The BoP is in deficit when autonomous outflows exceed autonomous inflows (current and capital accounts together), so the gap must be met by accommodating items such as a fall in reserves. Imports exceeding exports of goods is a trade deficit; overspending by government is a fiscal deficit.',
}));
Q('m_tourism', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Tourists from Japan spend money on hotels and guides in Jaipur. In India\'s BoP this is',
  opts: ['a receipt from export of services in the current account', 'a payment for import of services in the current account', 'a receipt in the capital account', 'a visible export'],
  sol: 'Indian hotels and guides sell a service to non-residents, which earns foreign exchange: an export of services (travel), a credit in the current account. It is not a payment, not an asset transaction, and not trade in goods.',
}));
Q('m_bot_num', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined country exports goods worth USD 1,200 million and services worth USD 400 million. It imports goods worth USD 1,500 million and services worth USD 250 million. Its balance of trade is',
  opts: ['a deficit of USD 300 million', 'a deficit of USD 150 million', 'a surplus of USD 150 million', 'a surplus of USD 100 million'],
  sol: 'The balance of trade counts goods only: 1,200 − 1,500 = −300, a deficit of USD 300 million. Including services (400 − 250 = 150) gives a deficit of 150 on goods and services, which is a different balance.',
}));
Q('m_ca_contents', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of these is **not** a part of the current account?',
  opts: ['Borrowing from foreign banks', 'Trade in goods', 'Trade in services', 'Current transfers'],
  sol: 'Borrowing creates a liability to non-residents, so it belongs to the capital account. Goods, services, income and transfers are the four parts of the current account.',
}));
must(1200 - 1500 === -300 && 400 - 250 === 150, 'm_bot_num');

Q('ar_balances', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'In the accounting sense, the balance of payments always balances.',
  r: 'The balance of payments records transactions over a period of time, usually a financial year.',
  sol: 'Both are true, but R does not explain A. The BoP balances because every transaction is entered twice (double entry) and any gap in autonomous items is met by accommodating items such as a change in reserves; the length of the period has nothing to do with it.',
}));
Q('ar_trade_ca', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'A country can have a deficit in its balance of trade and a surplus in its current account at the same time.',
  r: 'A surplus on invisibles (services, income and transfers) can be larger than the deficit on goods.',
  sol: 'Both are true, and R explains A: current account balance = trade balance + net invisibles, so a large invisibles surplus can more than cover the trade deficit.',
}));
Q('ar_fdi', ar({
  t: 1, d: 2, c: 'understanding', key: 'd',
  a: 'Foreign direct investment into India is recorded in the current account.',
  r: 'Foreign direct investment changes the assets and liabilities of residents.',
  sol: 'A is false: FDI creates a claim of non-residents on Indian assets, so it is a capital-account item. R is true, and it is exactly why FDI belongs to the capital account.',
}));
Q('tf_gift', tf({
  t: 1, d: 2, c: 'application', ans: false,
  stem: 'True or false? A cash gift received by a family in Lucknow from relatives in London is recorded in India\'s capital account.',
  sol: 'A gift is a one-way current transfer: it creates no asset or liability, so it goes in the current account (transfers), not the capital account.',
}));
Q('tf_bot_part', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? The balance of trade is a part of the current account balance.',
  sol: 'The current account balance is the balance of trade (goods) plus net invisibles, so the trade balance is one part of it.',
}));
Q('fb_invisibles', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Services, income and transfers in the current account are together called ___ items.',
  acc: [['invisible', 'invisibles']],
  sol: 'They cannot be seen crossing the border, so they are called invisible items (invisibles).',
}));
Q('mt_items', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each transaction of India with the place where it is recorded in India\'s BoP.',
  pairs: [
    ['Import of gold bars', 'Current account: goods (visible)'],
    ['An Indian airline earns fares from foreign passengers', 'Current account: services'],
    ['Interest paid by an Indian firm on a loan from a foreign bank', 'Current account: income'],
    ['A foreign pension fund buys shares on the Indian stock market', 'Capital account: portfolio investment'],
  ],
  sol: 'Gold is a good; air fares from foreigners are a service export; interest is investment income paid abroad; buying shares without control is portfolio investment, a capital-account item.',
}));
Q('ord_overall', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps for finding whether a country\'s BoP is in surplus or deficit, in the correct order.',
  items: [
    'Find the balance of trade: exports of goods minus imports of goods',
    'Add net services, net income and net transfers to get the current account balance',
    'Add the net autonomous capital flows to get the overall balance',
    'Read the result: a surplus raises official reserves, a deficit is met by drawing them down',
  ],
  sol: 'Goods first, then invisibles to reach the current account, then autonomous capital flows to reach the overall balance, and finally the matching change in reserves.',
}));
must(2450 - 3020 === -570, 'n_bot');
Q('n_bot', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: 570, unit: 'USD million',
  stem: 'An imagined island country exports goods worth USD 2,450 million and imports goods worth USD 3,020 million. What is the size of its trade deficit (in USD million)?',
  sol: 'Step 1: Balance of trade = exports of goods − imports of goods.\nStep 2: 2,450 − 3,020 = −570. The trade deficit is USD 570 million.',
}));
{
  const cab = -900 + 650 - 120 + 410;
  must(cab === 40, 'n_cab');
  Q('n_cab', num({
    t: 1, d: 3, c: 'application', marks: 2, value: cab, unit: 'USD million',
    stem: 'For an imagined country (USD million): trade deficit 900; net export of services 650; net income paid abroad 120; net transfers received 410. Calculate its current account surplus (in USD million).',
    sol: `Step 1: Current account balance = balance of trade + net services + net income + net transfers.\nStep 2: −900 + 650 − 120 + 410 = ${cab}. The current account has a surplus of USD ${cab} million.`,
    scheme: [['Correct method: trade balance plus net invisibles with signs', 1], [`Answer: surplus of USD ${cab} million`, 1]],
  }));
}
{
  const overall = -300 + 450;
  must(overall === 150, 'n_reserves');
  Q('n_reserves', num({
    t: 1, d: 3, c: 'application', marks: 1, value: overall, unit: 'USD million',
    stem: 'An imagined country has a current account deficit of USD 300 million and net autonomous capital inflows of USD 450 million. By how much do its official reserves rise (in USD million)?',
    sol: `Step 1: Overall balance = current account balance + net autonomous capital flows.\nStep 2: −300 + 450 = ${overall}, a BoP surplus, so reserves rise by USD ${overall} million.`,
  }));
}
Q('s_bot_bop', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the balance of trade and the balance of payments.',
  model: '1. The **balance of trade** records only **exports and imports of goods** (visible items).\n2. The **balance of payments** records **all** transactions with the rest of the world: goods, **services, income, transfers** and **capital** flows. So the balance of trade is a **narrower** part of the BoP.',
  sol: 'State the coverage of each; the BoP includes invisibles and capital flows.',
  scheme: [['Balance of trade: goods only', 1], ['BoP: all current and capital transactions', 1]],
}));
Q('s_auto_acc', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between autonomous and accommodating transactions in the balance of payments.',
  model: '1. **Autonomous** transactions are made for their **own sake** (profit, trade, consumption), **independent** of the BoP position; they are "above the line".\n2. **Accommodating** transactions are made **to cover a gap** in autonomous transactions, for example a **change in official reserves**; they are "below the line".',
  sol: 'Motive and independence of BoP for one; gap-filling for the other, with an example.',
  scheme: [['Autonomous: own motive, independent of BoP', 1], ['Accommodating: to cover the gap, with example', 1]],
}));
Q('s_ca_ka', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Giving one example of each, distinguish between the current account and the capital account of the BoP.',
  model: '1. The **current account** records trade in goods and services, income and transfers, which **do not change** a country\'s assets or liabilities, e.g. **export of tea**.\n2. The **capital account** records transactions that **change assets or liabilities** with the rest of the world, e.g. a **foreign firm buying an Indian company**.',
  sol: 'The basis is whether assets and liabilities change; one correct example each.',
  scheme: [['Current account with example', 1], ['Capital account with example', 1]],
}));
Q('s3_classify', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'State, with a reason, where each of the following is recorded in India\'s BoP: (i) an Indian student pays tuition fees to a university abroad; (ii) an Indian bank borrows from a bank in Singapore; (iii) India buys fighter-jet parts from abroad.',
  model: '(i) **Current account, services (payment):** India **imports an education service**, which uses up foreign exchange.\n(ii) **Capital account (receipt):** borrowing creates a **liability** of an Indian resident to a non-resident and brings in foreign exchange.\n(iii) **Current account, goods (payment):** parts are **visible imports** of goods.',
  sol: 'Name the account, the side (receipt or payment) and the reason for each.',
  scheme: [['(i) Current account, service import, with reason', 1], ['(ii) Capital account, loan receipt, with reason', 1], ['(iii) Current account, visible import, with reason', 1]],
}));
Q('s3_trade_ca', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How can a country run a trade deficit year after year and still have a current account surplus? Explain with an imagined example.',
  model: 'The **current account balance = trade balance + net invisibles**. A country that sells many **services** (software, travel) and receives large **remittances** can earn more on invisibles than it loses on goods. For example, a trade deficit of USD 500 million and net invisibles of **plus USD 650 million** give a **current account surplus of USD 150 million**.',
  sol: 'State the identity, explain the role of invisibles, and give consistent numbers.',
  scheme: [['Identity: CAB = trade balance + net invisibles', 1], ['Invisibles surplus explained (services, remittances)', 1], ['Consistent numerical example', 1]],
}));
must(-500 + 650 === 150, 's3_trade_ca');
Q('s3_deficit_finance', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined country has a BoP deficit of USD 800 million this year. Explain three ways in which this deficit can be met.',
  model: '1. **Drawing down official reserves:** the central bank **sells foreign currency** from its reserves.\n2. **Borrowing** from the **International Monetary Fund** or other official lenders to fill the gap.\n3. **Attracting accommodating inflows** such as short-term official loans from friendly governments. (Later, the country must also cut the deficit itself, e.g. by raising exports.)',
  sol: 'Accommodating means: reserves, IMF or official borrowing; three distinct ways.',
  scheme: [['Using reserves', 1], ['Borrowing from IMF or official lenders', 1], ['A third accommodating source', 1]],
}));
Q('l_components', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the components of the current account and the capital account of the balance of payments.',
  model: '**Current account**\n1. **Goods (visible trade):** exports and imports of goods; their difference is the **balance of trade**.\n2. **Services:** travel, transport, software, banking and insurance bought and sold abroad.\n3. **Income:** wages, interest, profit and dividends earned from or paid to non-residents.\n4. **Transfers:** one-way flows such as **remittances**, gifts and grants.\n\n**Capital account**\n5. Flows that **change assets or liabilities**: **foreign direct investment**, **portfolio investment** (shares, bonds), **external loans and borrowings**, and **banking capital** such as deposits of non-resident Indians.',
  sol: 'Four current-account components and the main capital-account components, each with a line of meaning.',
  scheme: [['Goods and balance of trade', 1], ['Services', 1], ['Income and transfers', 1], ['Capital account: FDI and portfolio investment', 1], ['Capital account: loans and banking capital', 1]],
}));

// ---------------------------------------------------------------- t01 case-based and long numericals
export const ISL = { xg: 5400, mg: 7100, xs: 3300, ms: 1900, ir: 600, ip: 1000, tr: 1500, tp: 200, fdi: 1200, fpi: -500, loans: 300 };
export const isl = bop(ISL);
must(isl.bot === -1700 && isl.invis === 2300 && isl.cab === 600 && isl.ka === 1000 && isl.overall === 1600, 'Islandia');
Q('cb_islandia', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined country and figures, written by SOYL for practice.)*',
  passage: `**Transactions of the imagined island country of Islandia with the rest of the world in one year (USD million)**\n\n| Item | Receipts | Payments |\n|---|---|---|\n| Goods | ${f(ISL.xg)} | ${f(ISL.mg)} |\n| Services | ${f(ISL.xs)} | ${f(ISL.ms)} |\n| Income | ${f(ISL.ir)} | ${f(ISL.ip)} |\n| Transfers | ${f(ISL.tr)} | ${f(ISL.tp)} |\n\nIn the same year Islandia received net foreign direct investment of ${f(ISL.fdi)}, saw a net outflow of portfolio investment of ${f(-ISL.fpi)} and received net external loans of ${f(ISL.loans)}. All these flows were autonomous.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: -isl.bot, unit: 'USD million', stem: 'What is the size of Islandia\'s trade deficit (in USD million)?', sol: `Step 1: Balance of trade = goods receipts − goods payments.\nStep 2: ${f(ISL.xg)} − ${f(ISL.mg)} = −${f(-isl.bot)}. The trade deficit is USD ${f(-isl.bot)} million.` })),
    child('b', num({ t: 1, d: 3, c: 'application', marks: 1, value: isl.cab, unit: 'USD million', stem: 'Calculate Islandia\'s current account surplus (in USD million).', sol: `Step 1: Net services ${f(isl.svc)}, net income −${f(-isl.inc)}, net transfers ${f(isl.tr)}; net invisibles = ${f(isl.invis)}.\nStep 2: Current account balance = −${f(-isl.bot)} + ${f(isl.invis)} = ${f(isl.cab)}. Surplus of USD ${f(isl.cab)} million.` })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Find Islandia\'s overall BoP balance and state what happens to its official reserves.', model: `Net autonomous capital flows = ${f(ISL.fdi)} − ${f(-ISL.fpi)} + ${f(ISL.loans)} = **${f(isl.ka)}**. Overall balance = ${f(isl.cab)} + ${f(isl.ka)} = **surplus of USD ${f(isl.overall)} million**, so official **reserves rise by USD ${f(isl.overall)} million**.`, sol: 'Add the capital flows with signs, add them to the current account balance, and link a surplus to rising reserves.', scheme: [['Capital account balance and overall balance computed', 1], ['Reserves rise by the surplus', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Islandia imports far more goods than it exports, yet its current account is in surplus. Explain how, using the table.', model: `Goods show a deficit of ${f(-isl.bot)}, but **invisibles** show a surplus of **${f(isl.invis)}**: services earn ${f(isl.svc)} net and transfers ${f(isl.tr)} net, more than the net income paid of ${f(-isl.inc)}. Because the invisibles surplus is **larger than the trade deficit**, the current account is in surplus.`, sol: 'Compare the invisibles surplus with the trade deficit using the figures.', scheme: [['Invisibles surplus identified with figures', 1], ['Compared with the trade deficit', 1]] }),
    ]),
  ],
}));
Q('cb_remit', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(Imagined district and firms, written by SOYL for practice.)*',
  passage: '**Money that crosses borders: one week in Meenapuram (imagined district)**\n\nIn Meenapuram, almost every third family has a member working abroad, mostly as electricians, nurses and drivers in West Asia. Each month they send money home, which families spend on houses, school fees and health care. This week a European engineering company announced that it would build a pump factory in the district, owning it fully. A local textile exporter shipped a consignment of bedsheets to Italy, and the district hospital paid interest on a loan it had earlier taken from a foreign development bank. At the same time, the national central bank said it had bought US dollars in the market to stop the rupee from rising too fast.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', marks: 1, stem: 'The money sent home by workers abroad is recorded in India\'s BoP as', opts: ['a receipt under current transfers', 'a receipt under foreign direct investment', 'a payment under services', 'a receipt under portfolio investment'], sol: 'Remittances are one-way transfers into India: a credit under transfers in the current account.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'In which account is the European company\'s pump factory recorded, and why?', model: '**Capital account**, as **foreign direct investment**: a non-resident acquires a lasting, controlling asset in India.', sol: 'A fully owned factory is direct investment, an asset-changing flow.', scheme: [['Capital account (FDI) with reason', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Classify the bedsheet export and the hospital\'s interest payment, stating account, item and side.', model: '**Bedsheets:** current account, **goods (visible) export**, a **receipt**. **Interest:** current account, **income** paid to a non-resident, a **payment**; it is not a capital-account item because only the **loan itself** changes liabilities, not the interest.', sol: 'Both are current-account items; state item and side for each.', scheme: [['Export: current account, goods, receipt', 1], ['Interest: current account, income, payment', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Is the central bank\'s purchase of US dollars an autonomous or an accommodating transaction? Give a reason.', model: 'It is **accommodating** (an official reserve transaction): the central bank buys dollars **not for profit or trade** but to absorb the **excess supply** of foreign exchange created by autonomous inflows, which **raises its reserves**.', sol: 'Accommodating, because it responds to the BoP position rather than to its own motive.', scheme: [['Accommodating', 1], ['Reason: responds to the surplus of autonomous inflows', 1]] }),
    ]),
  ],
}));
Q('l_islandia_num', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: [60, 120],
  stem: 'From the following data of an imagined country (USD million), calculate (a) the balance of trade, (b) the balance on invisibles, (c) the current account balance and (d) the overall BoP balance, and (e) state the change in official reserves.\n\nExports of goods 3,600; imports of goods 4,450; exports of services 1,900; imports of services 1,150; income received 220; income paid 480; transfers received 960; transfers paid 90; net autonomous capital inflows 300.',
  model: (() => {
    const b = bop({ xg: 3600, mg: 4450, xs: 1900, ms: 1150, ir: 220, ip: 480, tr: 960, tp: 90, fdi: 300, fpi: 0, loans: 0 });
    must(b.bot === -850 && b.invis === 1360 && b.cab === 510 && b.overall === 810, 'l_islandia_num');
    return `(a) **Balance of trade** = 3,600 − 4,450 = **−${f(-b.bot)}** (deficit).\n(b) **Invisibles** = (1,900 − 1,150) + (220 − 480) + (960 − 90) = ${f(b.svc)} − ${f(-b.inc)} + ${f(b.tr)} = **${f(b.invis)}** (surplus).\n(c) **Current account balance** = −${f(-b.bot)} + ${f(b.invis)} = **${f(b.cab)}** (surplus).\n(d) **Overall balance** = ${f(b.cab)} + 300 = **${f(b.overall)}** (BoP surplus).\n(e) **Official reserves rise by USD ${f(b.overall)} million**.`;
  })(),
  sol: 'Goods only for (a); services, income and transfers for (b); add for (c); add autonomous capital for (d); a surplus adds to reserves.',
  scheme: [['(a) Balance of trade −850', 1], ['(b) Invisibles 1,360', 1], ['(c) Current account balance 510', 1], ['(d) Overall balance 810', 1], ['(e) Reserves rise by 810', 1]],
}));
Q('l_deficit', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'An imagined country has had a large current account deficit for five years, financed mainly by short-term borrowing. Explain why this may be risky and suggest ways to reduce the deficit.',
  model: '**Risks**\n1. **Short-term loans** must be repaid or rolled over soon; if lenders lose confidence, money can **flow out suddenly**.\n2. **Reserves** may be drawn down quickly, and the currency may **depreciate sharply**, raising the cost of imports such as fuel.\n3. **Interest payments** abroad add to future current account deficits.\n\n**Ways to reduce it**\n4. Raise **exports** of goods and services through better quality, infrastructure and new markets; encourage **remittances and tourism**.\n5. Prefer **long-term, non-debt inflows** such as **FDI**, and reduce non-essential imports by building domestic production.',
  sol: 'Three risks linked to short-term debt and reserves, then two realistic remedies.',
  scheme: [['Risk: sudden outflow of short-term money', 1], ['Risk: falling reserves and sharp depreciation', 1], ['Risk: rising interest burden', 1], ['Remedy: raise exports or invisibles', 1], ['Remedy: long-term inflows or import substitution', 1]],
}));

// ================================================================ t02 Exchange rate systems
Q('m_er_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The foreign exchange rate is',
  opts: [
    'the price of one unit of a foreign currency in terms of the domestic currency',
    'the rate of interest paid on foreign loans',
    'the ratio of exports to imports',
    'the price of gold in the international market',
  ],
  sol: 'The exchange rate tells how many units of domestic currency buy one unit of foreign currency, e.g. rupees per US dollar. The other options are an interest rate, a trade ratio and a commodity price.',
}));
Q('m_fixed', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Under a **fixed** exchange rate system, the exchange rate is',
  opts: ['set by the government or central bank and kept there by official action', 'determined freely by demand and supply without intervention', 'changed by the market every minute', 'set by the World Bank for each country'],
  sol: 'In a fixed (pegged) system the authorities announce a rate and buy or sell foreign currency to hold it. Free determination by demand and supply is the flexible system; the World Bank does not set exchange rates.',
}));
Q('m_flexible', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is a feature of a **flexible** exchange rate system?',
  opts: ['The rate is determined by the demand for and supply of foreign exchange', 'The central bank must hold very large reserves to defend the rate', 'The currency can be devalued only by a government order', 'The rate never changes'],
  sol: 'In a flexible (floating) system the market sets the rate. Large reserves are needed to defend a fixed rate, devaluation belongs to a fixed system, and a flexible rate keeps changing.',
}));
Q('m_managed', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Managed floating is a system in which',
  opts: [
    'the market determines the rate, but the central bank intervenes to limit large swings',
    'the government fixes the rate and never allows it to change',
    'the rate is linked to the price of gold',
    'the central bank never buys or sells foreign currency',
  ],
  sol: 'Managed floating mixes both systems: demand and supply set the rate, and the central bank buys or sells foreign currency to smooth sharp movements. It is neither a hard peg nor a gold standard, and it does involve intervention.',
}));
Q('m_devaluation', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The government of an imagined country with a pegged currency announces that its currency will now exchange at 50 per US dollar instead of 40. This is',
  opts: ['devaluation of its currency', 'revaluation of its currency', 'appreciation of its currency in a free market', 'a fall in the exchange rate'],
  sol: 'More domestic currency per dollar means a lower external value. Because it is an official decision under a pegged system, it is devaluation, not market depreciation. Revaluation and appreciation are rises in value, and the exchange rate (domestic currency per dollar) has risen, not fallen.',
}));
Q('m_dep_effect', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'If the rupee depreciates against the US dollar, other things remaining the same, the most likely effect is that',
  opts: ['Indian exports become cheaper for foreign buyers and imports become dearer in India', 'Indian exports become dearer for foreign buyers', 'imports become cheaper in India', 'the prices of traded goods are not affected'],
  sol: 'After depreciation each dollar buys more rupees, so Indian goods cost foreigners fewer dollars (exports rise), while each imported item costs more rupees (imports fall). The other options reverse or deny these effects.',
}));
Q('m_reserves_fixed', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why does a fixed exchange rate system require the central bank to hold large foreign exchange reserves?',
  opts: [
    'It must sell foreign currency whenever demand exceeds supply at the fixed rate',
    'Reserves are needed to pay government salaries',
    'Exporters must deposit all reserves with the World Bank',
    'Reserves keep interest rates fixed',
  ],
  sol: 'At the pegged rate, any excess demand for foreign currency has to be met by official sales from reserves, otherwise the rate would rise. Salaries, the World Bank and interest rates have nothing to do with this.',
}));
must(50 > 40, 'm_devaluation');
Q('ar_dirty', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'Managed floating is sometimes called "dirty floating".',
  r: 'Under managed floating the central bank intervenes in the foreign exchange market instead of leaving the rate entirely to the market.',
  sol: 'Both are true, and R explains A: the float is "dirty" because official buying and selling of foreign currency influences the rate.',
}));
Q('ar_devalue', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'Devaluation of a currency takes place under a flexible exchange rate system.',
  r: 'Devaluation is a deliberate reduction in the external value of a currency by the government or central bank.',
  sol: 'A is false: under a flexible system the value falls through the market, which is depreciation. R is true; devaluation is an official decision, so it belongs to a fixed or pegged system.',
}));
Q('tf_flex_res', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A flexible exchange rate system requires the central bank to keep large reserves to defend the rate.',
  sol: 'Under a pure float the rate adjusts to clear the market, so there is no rate to defend; large reserves are a need of a fixed system.',
}));
Q('fb_revaluation', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'A deliberate increase in the external value of a currency by the government under a fixed exchange rate system is called ___.',
  acc: [['revaluation']],
  sol: 'An official rise in value is revaluation; the market counterpart under a flexible system is appreciation.',
}));
Q('mt_terms', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each exchange-rate term with the change in the value of a currency that it describes.',
  pairs: [
    ['Devaluation', 'Fall in a currency\'s value by an official decision'],
    ['Depreciation', 'Fall in a currency\'s value through market forces'],
    ['Revaluation', 'Rise in a currency\'s value by an official decision'],
    ['Appreciation', 'Rise in a currency\'s value through market forces'],
  ],
  sol: 'Official changes (fixed system): devaluation and revaluation. Market changes (flexible system): depreciation and appreciation.',
}));
Q('s_dev_dep', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between devaluation and depreciation of a currency.',
  model: '1. **Devaluation** is a fall in the external value of a currency **decided by the government or central bank**, under a **fixed** exchange rate system.\n2. **Depreciation** is a fall in its value caused by **market forces** of demand and supply, under a **flexible** system.',
  sol: 'Both are falls in value; the difference is official decision versus market forces, and the system each belongs to.',
  scheme: [['Devaluation: official, fixed system', 1], ['Depreciation: market, flexible system', 1]],
}));
Q('s_managed', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is managed floating? Why do many countries prefer it?',
  model: 'Under **managed floating**, the exchange rate is set mainly by **demand and supply**, but the central bank **buys or sells foreign currency** to stop sharp swings. Countries prefer it because it combines the **flexibility** of a float with some of the **stability** of a fixed rate.',
  sol: 'Meaning with intervention, and the advantage of combining both systems.',
  scheme: [['Meaning: market rate with central bank intervention', 1], ['Reason: flexibility with stability', 1]],
}));
Q('s3_fixed_merits', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Give any three merits of a fixed exchange rate system.',
  model: '1. **Stability:** traders and investors know the rate in advance, which **encourages foreign trade** and long-term investment.\n2. **Less speculation:** since the rate does not move freely, there is little gain from betting on it.\n3. **Discipline:** the government must keep **inflation and deficits** in check, or it cannot hold the peg.',
  sol: 'Any three: certainty for trade, fewer speculative swings, policy discipline, smooth capital flows.',
  scheme: [['First merit with explanation', 1], ['Second merit with explanation', 1], ['Third merit with explanation', 1]],
}));
Q('s3_flex_demerits', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Explain three demerits of a flexible exchange rate system.',
  model: '1. **Uncertainty:** frequent changes in the rate make the rupee value of future export earnings and import bills hard to predict, which **discourages trade and investment**.\n2. **Speculation:** traders betting on the rate can push it up or down **sharply**.\n3. **Inflation risk:** a sharp **depreciation** makes imported fuel and inputs dearer and can raise domestic prices.',
  sol: 'Three distinct demerits, each with its effect.',
  scheme: [['Uncertainty and its effect on trade', 1], ['Speculation and volatility', 1], ['Imported inflation or another valid demerit', 1]],
}));
Q('l_compare', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare fixed and flexible exchange rate systems on five points.',
  model: '1. **Who sets the rate:** fixed — the **government or central bank**; flexible — **demand and supply** in the market.\n2. **Reserves:** fixed needs **large reserves** to defend the rate; flexible needs **few**.\n3. **Changes in value:** fixed — **devaluation and revaluation** by decision; flexible — **depreciation and appreciation** by the market.\n4. **Stability:** fixed gives **certainty** to traders; flexible can be **volatile**.\n5. **BoP adjustment:** under flexible rates the rate **adjusts automatically** to correct imbalances; under fixed rates the government must use **policy** or reserves.',
  sol: 'Five comparison points, each stating both systems.',
  scheme: [['Who sets the rate', 1], ['Need for reserves', 1], ['Terms for changes in value', 1], ['Stability versus volatility', 1], ['Adjustment of BoP imbalances', 1]],
}));
Q('cb_peg', caseQ({
  t: [2, 1], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(Imagined country, currency and figures, written by SOYL for practice.)*',
  passage: '**The Marang dilemma (imagined country)**\n\nFor ten years the central bank of Marang kept its currency, the mara, fixed at 20 maras per US dollar. Imports of machinery and fuel grew faster than exports, and every year the central bank had to sell dollars to hold the rate. Its reserves fell from about nine months of imports to under three. Traders began to expect a change and bought dollars early, which made the shortage worse. Finally the government announced a new rate of 25 maras per dollar and said that from next year it would let the market set the rate, stepping in only to calm sharp swings.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', marks: 1, stem: 'The change from 20 to 25 maras per US dollar announced by the government is', opts: ['devaluation of the mara', 'depreciation of the mara', 'revaluation of the mara', 'appreciation of the mara'], sol: 'The mara\'s value fell (more maras per dollar) by an official decision under a fixed system: devaluation.' })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Name the exchange rate system that Marang plans to adopt from next year.', model: '**Managed floating** (a market-determined rate with central bank intervention to limit sharp swings).', sol: 'The market sets the rate, with occasional intervention.', scheme: [['Managed floating', 1]] })),
    child('c', short({ t: [2, 1], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why did Marang\'s reserves keep falling under the fixed rate?', model: 'At 20 maras per dollar, the **demand for dollars** (for growing imports) **exceeded the supply** (from exports). To keep the rate fixed, the central bank had to **sell dollars from reserves** to meet the excess demand every year, and **speculative buying** of dollars made the gap larger.', sol: 'Excess demand at the pegged rate met by official sales; speculation added to it.', scheme: [['Excess demand for dollars at the fixed rate', 1], ['Met by selling reserves; speculation worsened it', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): How might the new rate of 25 maras per dollar affect Marang\'s exports and imports?', model: 'Each dollar now buys **more maras**, so Marang\'s goods become **cheaper for foreign buyers** and **exports should rise**. Imports cost **more maras**, so they should **fall**. Together these reduce the excess demand for dollars, though dearer fuel may raise prices at home.', sol: 'Exports cheaper abroad, imports dearer at home; link to the BoP gap.', scheme: [['Effect on exports', 1], ['Effect on imports', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Determination of the exchange rate in a free market
Q('m_demand_src', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which of the following creates a **demand** for US dollars in India?',
  opts: ['An Indian company importing medical equipment from the USA', 'A US tourist spending a holiday in Goa', 'A US firm investing in an Indian start-up', 'An Indian IT firm earning fees from a client in New York'],
  sol: 'An importer must pay in dollars, so it buys dollars with rupees: demand for foreign exchange. The tourist, the US investor and the IT firm\'s fees all bring dollars into India, which adds to the supply of foreign exchange.',
}));
Q('m_supply_src', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which of the following adds to the **supply** of foreign exchange in India?',
  opts: ['Remittances sent home by Indians working abroad', 'Indian students paying fees to universities abroad', 'Indian firms buying companies abroad', 'Imports of crude oil'],
  sol: 'Remittances bring foreign currency into India, which is converted into rupees: supply of foreign exchange. Fees abroad, buying companies abroad and oil imports all need foreign currency, so they add to demand.',
}));
Q('m_d_slope', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The demand curve for foreign exchange slopes downward because when the exchange rate (rupees per dollar) falls,',
  opts: ['foreign goods become cheaper in rupees, so more is imported and more dollars are demanded', 'Indian exports become cheaper for foreigners', 'foreign tourists visit India more', 'the central bank sells more dollars'],
  sol: 'A lower rupee price of the dollar makes imports, foreign travel and foreign study cheaper for Indians, so they demand more dollars. Cheaper exports for foreigners would happen when the rate rises, and tourist arrivals or central bank sales are supply-side matters.',
}));
Q('m_s_slope', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The supply curve of foreign exchange usually slopes upward because a rise in the exchange rate',
  opts: ['makes a country\'s exports cheaper for foreigners, so they buy more and supply more foreign currency', 'makes imports cheaper for residents', 'reduces the number of foreign tourists', 'reduces remittances from abroad'],
  sol: 'When each dollar buys more rupees, Indian goods and services cost foreigners fewer dollars, so exports and tourist spending rise, bringing in more dollars. Imports become dearer, not cheaper, after a rise.',
}));
Q('m_equil', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In a free market, the equilibrium exchange rate is the rate at which',
  opts: ['the demand for foreign exchange equals its supply', 'exports equal imports of goods', 'the central bank\'s reserves are largest', 'the rupee and the dollar have the same value'],
  sol: 'Like any market price, the exchange rate settles where quantity demanded equals quantity supplied. Trade balance, reserves and a one-to-one value play no part in the definition.',
}));
Q('m_d_shift', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'In a flexible system, Indians suddenly start importing many more mobile phones. Other things remaining the same, the exchange rate (rupees per dollar)',
  opts: ['rises, and the rupee depreciates', 'falls, and the rupee appreciates', 'does not change, because supply also rises automatically', 'falls, and the rupee depreciates'],
  sol: 'More imports raise the demand for dollars, shifting the demand curve to the right. At the old rate there is excess demand, so the rate rises: more rupees per dollar, i.e. the rupee depreciates. Supply does not shift by itself, and a fall in the rate would mean appreciation.',
}));
Q('m_s_shift', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A large inflow of foreign direct investment into India, other things remaining the same, will',
  opts: ['shift the supply curve of dollars to the right and lower the exchange rate', 'shift the demand curve for dollars to the right and raise the exchange rate', 'shift the supply curve of dollars to the left and raise the exchange rate', 'leave the exchange rate unchanged'],
  sol: 'Foreign investors bring dollars and sell them for rupees, so supply rises (shifts right). At the old rate supply exceeds demand, so the rate falls: fewer rupees per dollar, an appreciation of the rupee.',
}));
Q('m_reading', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The exchange rate in an imagined market moves from ₹84 to ₹80 per US dollar. This means the rupee has',
  opts: ['appreciated, because fewer rupees now buy one dollar', 'depreciated, because the number has fallen', 'been devalued by the government', 'lost value against the dollar'],
  sol: 'Rupees per dollar fell from 84 to 80, so each rupee is now worth more dollars: the rupee appreciated (market change). A fall in the rate is not depreciation, and nothing says the government acted.',
}));
Q('ar_s_slope', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'The supply of foreign exchange generally rises when the exchange rate rises.',
  r: 'A higher exchange rate makes domestic goods cheaper for foreign buyers, so exports and the inflow of foreign currency increase.',
  sol: 'Both are true, and R explains A: more rupees per dollar means foreigners pay fewer dollars for each Indian good, so they buy more and supply more dollars.',
}));
Q('ar_d_slope', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'The demand curve for foreign exchange slopes downward from left to right.',
  r: 'When the exchange rate rises, imported goods become cheaper for domestic buyers.',
  sol: 'A is true. R is false: a rise in the rate (more rupees per dollar) makes imports dearer, which is why less foreign exchange is demanded at a higher rate.',
}));
Q('tf_speculation', tf({
  t: 3, d: 3, c: 'application', ans: true,
  stem: 'True or false? If traders expect the rupee to depreciate next month, their buying of dollars today can itself raise today\'s exchange rate.',
  sol: 'Expecting the dollar to become dearer, speculators buy dollars now; this raises current demand, so the rate rises today. Expectations can be self-fulfilling in a free market.',
}));
{
  // Qd = 640 − 4e, Qs = 6e − 160 (USD million, e in ₹ per USD).
  const e = eqRate(640, 4, -160, 6);
  const q = 640 - 4 * e;
  const e2 = eqRate(740, 4, -160, 6);
  must(e === 80 && q === 320 && e2 === 90, 'n_equil / n_new_rate');
  Q('n_equil', num({
    t: 3, d: 3, c: 'application', marks: 2, value: e, unit: '₹ per USD',
    stem: 'In an imagined free market, the demand for US dollars is Qd = 640 − 4e and the supply is Qs = 6e − 160, where e is the exchange rate in rupees per dollar and quantities are in USD million. Find the equilibrium exchange rate (in ₹ per USD).',
    sol: `Step 1: At equilibrium Qd = Qs: 640 − 4e = 6e − 160.\nStep 2: 800 = 10e, so e = ${e}. (Check: Qd = 640 − 320 = ${q} = Qs.) The equilibrium rate is ₹${e} per US dollar.`,
    scheme: [['Setting demand equal to supply', 1], [`e = ₹${e} per USD`, 1]],
  }));
  Q('n_new_rate', num({
    t: 3, d: 4, c: 'analysis', marks: 2, value: e2, unit: '₹ per USD',
    stem: 'In the market Qd = 640 − 4e, Qs = 6e − 160 (USD million, e in rupees per dollar), demand for dollars rises by USD 100 million at every exchange rate. Find the new equilibrium rate (in ₹ per USD).',
    sol: `Step 1: New demand Qd = 740 − 4e; set equal to supply: 740 − 4e = 6e − 160.\nStep 2: 900 = 10e, so e = ${e2}. The rate rises from ${e} to ₹${e2} per dollar: the rupee depreciates.`,
    scheme: [['New demand equation equated with supply', 1], [`e = ₹${e2} per USD`, 1]],
  }));
}
Q('s_why_d', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does the demand for foreign exchange fall when the exchange rate rises?',
  model: 'A rise in the rate means **more rupees per dollar**, so **imports, foreign travel and study abroad** become **dearer** for Indians. They buy less of them and therefore **demand fewer dollars**. Hence the demand curve slopes downward.',
  sol: 'Link a higher rate to dearer foreign goods and services, and then to less foreign exchange demanded.',
  scheme: [['Higher rate makes foreign goods and services dearer', 1], ['So less foreign exchange is demanded', 1]],
}));
Q('s_supply_src', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any four sources of supply of foreign exchange.',
  model: '1. **Exports** of goods and services.\n2. **Remittances** from residents working abroad.\n3. **Foreign direct and portfolio investment** into the country.\n4. **Spending by foreign tourists** (or foreign loans and gifts received).',
  sol: 'Any four inflows of foreign currency, half a mark each.',
  scheme: [['Any two sources', 1], ['Any two more sources', 1]],
}));
Q('s3_shifts', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the effect of each of the following on the exchange rate of the rupee in a free market: (i) a rise in foreign tourist arrivals in India; (ii) a rise in Indian students going abroad; (iii) a fall in remittances from abroad.',
  model: '(i) Tourists bring dollars, so **supply rises**; the rate **falls** and the rupee **appreciates**.\n(ii) Students need dollars for fees, so **demand rises**; the rate **rises** and the rupee **depreciates**.\n(iii) Fewer remittances mean **supply falls**; the rate **rises** and the rupee **depreciates**.',
  sol: 'For each, identify the curve that shifts, its direction, and the change in the rate.',
  scheme: [['(i) Supply rises, rate falls', 1], ['(ii) Demand rises, rate rises', 1], ['(iii) Supply falls, rate rises', 1]],
}));
Q('s3_equil_diag', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'With the help of a diagram described in words, explain how the equilibrium exchange rate is determined in a free market.',
  model: 'Draw the **exchange rate** on the vertical axis and the **quantity of foreign exchange** on the horizontal axis. The **demand curve** slopes **downward** (imports get dearer as the rate rises) and the **supply curve** slopes **upward** (exports get cheaper for foreigners). They cross at **E**: the **equilibrium rate** where demand equals supply. Above E supply exceeds demand and the rate falls; below E demand exceeds supply and the rate rises.',
  sol: 'Axes, the slope of each curve with a reason, the point of intersection, and how the market moves back to it.',
  scheme: [['Axes and the two curves with slopes', 1], ['Equilibrium at the intersection', 1], ['Adjustment from excess demand or supply', 1]],
}));
Q('l_determination', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain how the exchange rate is determined under a flexible system. What happens to it when the demand for foreign exchange rises? Use a diagram described in words.',
  model: '1. **Demand** for foreign exchange comes from **imports**, travel and study abroad, investment abroad and payments of loans; it **slopes downward**, because a higher rate makes these dearer.\n2. **Supply** comes from **exports**, foreign tourists, remittances and foreign investment; it **slopes upward**, because a higher rate makes exports cheaper for foreigners.\n3. The **equilibrium rate** is where the two curves **intersect**: demand equals supply.\n4. If demand **rises** (say, more imports), the demand curve **shifts right**; at the old rate there is **excess demand**.\n5. The rate **rises** to a new, higher equilibrium where more foreign exchange is traded, so the domestic currency **depreciates**.',
  sol: 'Sources and slopes of demand and supply, the equilibrium, and the shift with its result.',
  scheme: [['Demand: sources and downward slope', 1], ['Supply: sources and upward slope', 1], ['Equilibrium at intersection', 1], ['Rise in demand shifts the curve right; excess demand', 1], ['New higher rate; depreciation', 1]],
}));
{
  const rates = [70, 75, 80, 85, 90];
  const D = rates.map((e) => 640 - 4 * e);
  const Sx = rates.map((e) => 6 * e - 160);
  const ie = rates.findIndex((_, i) => D[i] === Sx[i]);
  const ex75 = D[1] - Sx[1];
  must(rates[ie] === 80 && ex75 === 50 && D[3] - Sx[3] === -50, 'cb_market');
  Q('cb_market', caseQ({
    t: 3, d: 4, c: 'analysis', origin: 'soyl-original',
    stem: 'Study the schedule and answer the questions that follow. *(Imagined market schedule written by SOYL for practice; these are not actual market rates.)*',
    passage: `**Demand for and supply of US dollars in an imagined free market (USD million per week)**\n\n| Exchange rate (₹ per USD) | ${rates.join(' | ')} |\n|---|${rates.map(() => '---').join('|')}|\n| Quantity demanded | ${D.join(' | ')} |\n| Quantity supplied | ${Sx.join(' | ')} |\n\nThe central bank does not intervene in this market.`,
    parts: [
      child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: rates[ie], unit: '₹ per USD', stem: 'What is the equilibrium exchange rate (in ₹ per USD)?', sol: `Step 1: Compare quantity demanded and supplied at each rate.\nStep 2: They are equal (${D[ie]} = ${Sx[ie]}) only at ₹${rates[ie]} per dollar.` })),
      child('b', num({ t: 3, d: 3, c: 'application', marks: 1, value: ex75, unit: 'USD million', stem: 'At ₹75 per US dollar, what is the excess demand for dollars (in USD million)?', sol: `Step 1: Excess demand = quantity demanded − quantity supplied at ₹75.\nStep 2: ${D[1]} − ${Sx[1]} = ${ex75} USD million.` })),
      child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain what will happen if the rate is ₹85 per US dollar.', model: `At ₹85, supply is ${Sx[3]} but demand is only ${D[3]}: an **excess supply of ${-(D[3] - Sx[3])}** USD million. Holders of dollars **compete to sell**, so the **rate falls** towards **₹${rates[ie]}**, where the market clears; the rupee **appreciates**.`, sol: 'Compare the quantities at 85, identify excess supply, and state the direction of movement.', scheme: [['Excess supply at ₹85 identified with figures', 1], ['Rate falls to equilibrium; rupee appreciates', 1]] }), [
        short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Remittances into the country rise sharply. Predict the effect on the equilibrium rate and on the rupee.', model: 'Remittances add to the **supply of dollars**, so the **supply curve shifts right**. At ₹80 there is now **excess supply**, so the equilibrium rate **falls below ₹80**, and the rupee **appreciates**.', sol: 'Supply shifts right; rate falls; appreciation.', scheme: [['Supply of dollars rises (shift right)', 1], ['Rate falls; rupee appreciates', 1]] }),
      ]),
    ],
  }));
}
