// CBSE 12 Economics, ch08 Liberalisation, Privatisation and Globalisation: An Appraisal — question bank.
// Every scenario, table and passage is written by SOYL (imagined firms, countries, people and figures,
// labelled as such); no NCERT exercise or board/sample-paper item is reused. Real-world facts are limited
// to stable, commonly taught ones (1991 crisis and New Economic Policy, WTO 1995, demonetisation of
// 8 November 2016, GST from 1 July 2017). The appraisal items ask for arguments on both sides; keys never
// require a political verdict. Every computed figure is derived here, never typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// Imagined country Ranakpur: foreign-exchange reserves and monthly import bill (billion US dollars).
export const RES = { reserves: 2.4, monthlyImports: 1.2 };
export const COVER = RES.reserves / RES.monthlyImports; // 2 months
// Import duty cut on an imagined machine part: world price ₹500.
export const DUTY = { price: 500, before: 40, after: 10 };
export const LANDED_BEFORE = DUTY.price * (1 + DUTY.before / 100); // 700
export const LANDED_AFTER = DUTY.price * (1 + DUTY.after / 100); // 550
export const LANDED_FALL = LANDED_BEFORE - LANDED_AFTER; // 150
// Disinvestment in an imagined public-sector company: 50 crore shares, 10 per cent sold at ₹80.
export const DIS = { shares: 50, soldPct: 10, price: 80 };
export const DIS_SOLD = (DIS.shares * DIS.soldPct) / 100; // 5 crore shares
export const DIS_RECEIPT = DIS_SOLD * DIS.price; // ₹400 crore
export const DIS_LEFT = 100 - DIS.soldPct; // 90 per cent
// GST with input tax credit on an imagined two-stage chain at an imagined 10 per cent rate.
export const GST = { rate: 10, makerSale: 1000, traderSale: 1300 };
export const GST_MAKER = (GST.makerSale * GST.rate) / 100; // 100
export const GST_TRADER_OUT = (GST.traderSale * GST.rate) / 100; // 130
export const GST_TRADER_PAY = GST_TRADER_OUT - GST_MAKER; // 30
export const GST_TOTAL = GST_MAKER + GST_TRADER_PAY; // 130
// The old cascading way: the trader's tax is charged on a price that already includes the maker's tax.
export const CASC_BASE = GST.makerSale + GST_MAKER + (GST.traderSale - GST.makerSale); // 1,400
export const CASC_TRADER = (CASC_BASE * GST.rate) / 100; // 140
export const CASC_TOTAL = GST_MAKER + CASC_TRADER; // 240
// Imagined economy's GDP by sector (₹ thousand crore), year 1 and year 2.
export const GDP = { y1: { agri: 30, ind: 30, serv: 40 }, y2: { agri: 31, ind: 34, serv: 50 } };
const tot = (y) => y.agri + y.ind + y.serv;
export const GDP1 = tot(GDP.y1); // 100
export const GDP2 = tot(GDP.y2); // 115
export const GROWTH = pct(GDP2 - GDP1, GDP1); // 15
export const SERV_SHARE2 = pct(GDP.y2.serv, GDP2); // 43.5
export const SERV_GROWTH = pct(GDP.y2.serv - GDP.y1.serv, GDP.y1.serv); // 25
export const AGRI_GROWTH = pct(GDP.y2.agri - GDP.y1.agri, GDP.y1.agri); // 3.3
// Old notes deposited by an imagined shopkeeper in November 2016.
export const NOTES = { n1000: 6, n500: 8 };
export const NOTES_VALUE = NOTES.n1000 * 1000 + NOTES.n500 * 500; // 10,000
// Outsourcing: an imagined firm pays ₹1,200 an hour for a service at home and ₹500 an hour abroad, 40 hours.
export const OUT = { home: 1200, abroad: 500, hours: 40 };
export const OUT_SAVING = (OUT.home - OUT.abroad) * OUT.hours; // 28,000

if (COVER !== 2 || LANDED_BEFORE !== 700 || LANDED_AFTER !== 550 || LANDED_FALL !== 150) throw new Error('crisis/duty figures');
if (DIS_SOLD !== 5 || DIS_RECEIPT !== 400 || DIS_LEFT !== 90) throw new Error('disinvestment figures');
if (GST_MAKER !== 100 || GST_TRADER_OUT !== 130 || GST_TRADER_PAY !== 30 || GST_TOTAL !== 130 || CASC_BASE !== 1400 || CASC_TRADER !== 140 || CASC_TOTAL !== 240) throw new Error('GST figures');
if (GDP1 !== 100 || GDP2 !== 115 || GROWTH !== 15 || SERV_SHARE2 !== 43.5 || SERV_GROWTH !== 25 || AGRI_GROWTH !== 3.3) throw new Error('GDP figures');
if (NOTES_VALUE !== 10000 || OUT_SAVING !== 28000) throw new Error('notes/outsourcing figures');

// ================================================================ t01 Background and features of the 1991 reforms
Q('m_crisis_root', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The economic crisis of 1991 is best traced to',
  opts: [
    'persistent government spending above its revenue and an import bill that exports could not pay for',
    'a sudden rise in India\'s exports that the ports could not handle',
    'a surplus of foreign exchange that pushed prices down',
    'the end of the Five Year Plans in the 1970s',
  ],
  sol: 'For years the government had spent more than it earned (rising fiscal deficits) and the country had imported more than it could finance through exports. Borrowing filled both gaps until lenders lost confidence. Rising exports and a foreign-exchange surplus are the opposite of what happened, and planning continued after the 1970s.',
}));
Q('m_reserves', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In 1991, India\'s foreign-exchange reserves had fallen so low that they could pay for imports for only about',
  opts: ['two weeks', 'two years', 'six months', 'one year'],
  sol: 'Reserves were commonly described as enough for only about two weeks of imports, which is why the crisis was so acute. A cover of months or years would not have been a crisis.',
}));
Q('m_imf', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which international institutions gave India loans in 1991 on the condition that it reform its economy?',
  opts: [
    'The International Monetary Fund (IMF) and the World Bank',
    'The WTO and the United Nations Children\'s Fund',
    'The Asian Development Bank and the Reserve Bank of India',
    'The GST Council and NITI Aayog',
  ],
  sol: 'India approached the IMF and the World Bank, which lent money in return for reforms that opened the economy. The RBI, the GST Council and NITI Aayog are Indian bodies, and the WTO did not exist until 1995.',
}));
Q('m_stab_struct', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which pair correctly matches the two groups of measures in the New Economic Policy?',
  opts: [
    'Stabilisation: short-term, to correct the balance of payments and control inflation; structural reform: long-term, to raise efficiency and competitiveness',
    'Stabilisation: long-term, to raise efficiency; structural reform: short-term, to control inflation',
    'Stabilisation: only for agriculture; structural reform: only for banks',
    'Stabilisation: raising import duties; structural reform: nationalising private firms',
  ],
  sol: 'Stabilisation measures were short-run steps to restore foreign-exchange reserves and bring prices under control. Structural reforms were long-run changes in rules to make the economy more efficient and internationally competitive. The second option reverses them; the others misdescribe both.',
}));
Q('m_delicense', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under industrial-sector reforms after 1991, industrial licensing was',
  opts: [
    'abolished for almost all industries, kept only for a short list such as alcohol, cigarettes, hazardous chemicals and industrial explosives',
    'extended to every small shop and workshop',
    'made compulsory for all exports',
    'handed over to the World Bank',
  ],
  sol: 'Delicensing removed the need for a government licence to start or expand a factory in nearly all industries; a short list linked to health, safety or strategic concerns kept it. The other options describe tighter control or an absurd transfer of powers.',
}));
Q('m_reserved', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'After the reforms, which of the following is among the very few activities still reserved for the public sector?',
  opts: ['Atomic energy', 'Steel making', 'Air transport', 'Telecommunication services'],
  sol: 'Only a few strategic areas, such as atomic energy and railway operations, remain reserved for the public sector. Steel, air transport and telecom were opened to private firms.',
}));
Q('m_rbi_role', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Financial-sector reforms changed the role of the Reserve Bank of India from',
  opts: ['regulator to facilitator of the financial sector', 'facilitator to owner of all banks', 'lender to farmers to tax collector', 'central bank to commercial bank'],
  sol: 'The RBI moved from controlling interest rates and many bank decisions directly towards setting rules and letting the financial sector take more of its own decisions. It did not take over banks, collect taxes or turn into a commercial bank.',
}));
Q('m_tax_reform', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following was part of tax reforms after 1991?',
  opts: [
    'Lower and simpler income and corporation tax rates, to encourage saving and honest reporting',
    'Higher income tax rates on all households',
    'Abolition of all indirect taxes',
    'Taxes collected only in foreign currency',
  ],
  sol: 'Rates of personal income tax and corporation tax were reduced and procedures simplified, on the view that very high rates encouraged evasion. Indirect taxes were reformed, not abolished.',
}));
Q('m_devalue', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In 1991 the rupee was devalued against foreign currencies. What was the immediate aim?',
  opts: [
    'To make Indian exports cheaper abroad and so earn more foreign exchange',
    'To make imports cheaper for Indian buyers',
    'To raise the price of Indian goods abroad',
    'To stop foreign tourists from visiting India',
  ],
  sol: 'A lower value of the rupee means a foreign buyer pays fewer dollars for an Indian good, so exports become cheaper abroad and the inflow of foreign exchange rises. Imports become dearer, not cheaper.',
}));
Q('m_qr', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined Indian firm could import only 2,000 tonnes of a chemical a year under a fixed quota before 1991. After trade reforms, which change would it most likely see?',
  opts: [
    'The quota is removed and imports are allowed, subject only to a lower import duty',
    'The quota is cut to zero and the chemical is banned',
    'The firm must now export 2,000 tonnes before it may import any',
    'The government buys all the chemical and resells it',
  ],
  sol: 'Trade reforms dismantled quantitative restrictions such as quotas and lowered tariffs, so imports were governed by price (duty) rather than by fixed quantities. A ban, an export condition or a state monopoly would be the opposite of liberalisation.',
}));
Q('m_fdi', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which measure is an example of investment-policy reform after 1991?',
  opts: [
    'Raising the limits on foreign direct investment in many industries',
    'Banning foreign companies from owning any shares in Indian firms',
    'Reserving all manufacturing for small-scale units',
    'Fixing the rupee permanently at one rate',
  ],
  sol: 'Higher FDI limits allowed foreign investors to own larger shares of Indian enterprises. The other options are restrictions that the reforms moved away from.',
}));
Q('m_lpg_order', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which statement correctly links the three parts of the New Economic Policy?',
  opts: [
    'Liberalisation removes controls, privatisation reduces state ownership, and globalisation links the economy with the world',
    'Liberalisation increases licensing, privatisation nationalises firms, and globalisation closes borders',
    'Liberalisation means selling public firms, privatisation means opening trade, and globalisation means delicensing',
    'All three mean the same thing: raising taxes',
  ],
  sol: 'Each part has a distinct role: removing government controls (liberalisation), reducing the government\'s ownership and management of enterprises (privatisation), and integrating with the world economy through trade, investment and technology (globalisation).',
}));
Q('ar_crisis', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'In 1991 India found it difficult to pay for essential imports such as petroleum.',
  r: 'Its foreign-exchange reserves had fallen to a very low level.',
  sol: 'Both are true, and R explains A: imports are paid for in foreign exchange, so when reserves ran very low, paying even for essential imports became hard.',
}));
Q('ar_delicense', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'After 1991 private firms could start or expand most industries without a government licence.',
  r: 'The rupee was devalued in 1991.',
  sol: 'Both statements are true, but devaluation is a foreign-exchange measure. Firms no longer needed licences because of industrial delicensing, so R does not explain A.',
}));
Q('ar_rbi', ar({
  t: 1, d: 2, c: 'analysis', key: 'c',
  a: 'Financial-sector reforms allowed private Indian banks and foreign banks to expand in India.',
  r: 'After the reforms, the RBI stopped regulating banks altogether.',
  sol: 'A is true: new private and foreign banks were allowed to grow. R is false: the RBI still regulates banks; it became more of a facilitator but did not give up regulation.',
}));
Q('tf_wto_gatt', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The World Trade Organization was set up in 1995 as the successor to the General Agreement on Tariffs and Trade (GATT).',
  sol: 'GATT was the earlier agreement on trade rules; the WTO replaced it in 1995 and also covers services and intellectual property.',
}));
Q('fb_stab', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Short-term measures of the 1991 reforms, aimed at correcting the balance of payments and controlling inflation, are called ___ measures.',
  acc: [['stabilisation', 'stabilization']],
  sol: 'They are stabilisation measures; the long-term changes are structural reform measures.',
}));
Q('mt_reforms', match({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Match each reform (column A) with the sector it belongs to (column B).',
  pairs: [
    ['Most industries no longer need a licence', 'Industrial sector'],
    ['Private and foreign banks allowed to expand', 'Financial sector'],
    ['Corporation tax rates reduced', 'Tax (fiscal) policy'],
    ['Quotas on imports removed and tariffs lowered', 'Trade and investment policy'],
  ],
  sol: 'Delicensing is an industrial reform; bank entry is a financial-sector reform; tax rates are fiscal policy; quotas and tariffs are trade policy.',
}));
Q('n_cover', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: COVER, unit: 'months',
  stem: `The imagined country Ranakpur has foreign-exchange reserves of ${RES.reserves} billion US dollars, and its imports cost ${RES.monthlyImports} billion US dollars a month. For how many months can the reserves pay for imports?`,
  sol: `Step 1: Import cover = reserves ÷ monthly import bill.\nStep 2: ${RES.reserves} ÷ ${RES.monthlyImports} = ${COVER}. So about ${COVER} months.`,
}));
Q('n_duty', num({
  t: 1, d: 3, c: 'application', marks: 2, value: LANDED_FALL, unit: '₹',
  stem: `An imagined machine part costs ₹${DUTY.price} abroad. The import duty on it is cut from ${DUTY.before} per cent to ${DUTY.after} per cent. By how many rupees does its cost to an Indian buyer (price plus duty) fall?`,
  sol: `Step 1: Cost before = ${DUTY.price} + ${DUTY.before} per cent of ${DUTY.price} = ₹${LANDED_BEFORE}.\nStep 2: Cost after = ${DUTY.price} + ${DUTY.after} per cent of ${DUTY.price} = ₹${LANDED_AFTER}.\nStep 3: Fall = ${LANDED_BEFORE} − ${LANDED_AFTER} = ₹${LANDED_FALL}.`,
  scheme: [['Cost before and after the cut', 1], [`Fall of ₹${LANDED_FALL}`, 1]],
}));
Q('s_crisis_causes', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two causes of the economic crisis that India faced in 1991.',
  model: '1. **Fiscal deficits:** for years the government spent more than its revenue and borrowed to fill the gap, so interest payments kept rising.\n2. **Balance-of-payments problem:** imports grew faster than exports, and **foreign-exchange reserves** fell to a very low level.',
  sol: 'One fiscal cause and one external cause, each explained in a line.',
  scheme: [['Fiscal cause explained', 1], ['External (BoP / reserves) cause explained', 1]],
}));
Q('s_stab_vs_struct', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between stabilisation measures and structural reform measures.',
  model: '1. **Stabilisation measures** are **short-term**: they aim to correct the balance of payments, rebuild foreign-exchange reserves and **control inflation**.\n2. **Structural reform measures** are **long-term**: they change rules and institutions to raise **efficiency and international competitiveness**.',
  sol: 'State the time frame and the aim of each.',
  scheme: [['Stabilisation: short-term, with its aim', 1], ['Structural reform: long-term, with its aim', 1]],
}));
Q('s_fin_reform', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two measures of financial-sector reform introduced after 1991.',
  model: '1. **Private Indian and foreign banks** were allowed to set up and expand branches, increasing competition.\n2. **Foreign institutional investors** were allowed to invest in Indian financial markets, and banks got more freedom over some decisions, with the RBI acting more as a **facilitator**.',
  sol: 'Any two genuine financial-sector measures (bank entry, FII investment, freer decisions, role of RBI).',
  scheme: [['First measure', 1], ['Second measure', 1]],
}));
Q('s3_liberal_ind', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three ways in which the industrial sector was liberalised after 1991.',
  model: '1. **Delicensing:** licences were abolished for almost all industries, kept only for a short list such as alcohol, cigarettes and hazardous chemicals.\n2. **Fewer reserved areas:** most industries once reserved for the public sector were opened to private firms; only a few strategic ones, such as atomic energy and railway operations, remained.\n3. **Freer decisions:** many goods were de-reserved from small-scale industry, and firms could decide prices and capacity in response to the market.',
  sol: 'Three distinct industrial measures, each with a short explanation.',
  scheme: [['Delicensing', 1], ['Opening of reserved areas', 1], ['De-reservation or market-based decisions', 1]],
}));
Q('s3_trade_reform', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Describe three features of trade and investment policy reforms after 1991.',
  model: '1. **Quantitative restrictions** such as import quotas were removed in stages, so imports came to be governed by price rather than fixed quantities.\n2. **Import tariffs were reduced** and export duties removed, which lowered input costs and made Indian goods more competitive abroad.\n3. **Foreign investment** limits were raised in many industries, allowing more FDI and portfolio investment along with new technology.',
  sol: 'Three features: quotas, tariffs/export duties, and foreign investment.',
  scheme: [['Quotas removed', 1], ['Tariffs reduced / export duties removed', 1], ['Foreign investment opened', 1]],
}));
Q('l_npe_features', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the main reforms under liberalisation introduced in India from 1991.',
  model: '1. **Industrial sector:** licensing abolished for nearly all industries; few areas left for the public sector; de-reservation of goods from small-scale industry.\n2. **Financial sector:** private Indian and foreign banks allowed; foreign institutional investors permitted; the RBI moved from regulator towards **facilitator**.\n3. **Tax reforms:** lower and simpler **income and corporation tax** rates; reform of indirect taxes towards a common national market.\n4. **Foreign exchange:** the rupee was **devalued** in 1991 and later its rate was left largely to the market.\n5. **Trade and investment:** **quotas** removed, **tariffs** reduced, export duties dropped and **FDI** limits raised.',
  sol: 'Five areas of liberalisation, each with one or two concrete measures.',
  scheme: [['Industrial sector', 1], ['Financial sector', 1], ['Tax reforms', 1], ['Foreign-exchange reform', 1], ['Trade and investment reform', 1]],
}));

// Privatisation and globalisation (still t01: features of the reforms)
Q('m_disinvest', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Selling part of the government\'s shares in a public-sector enterprise to the public or private investors is called',
  opts: ['disinvestment', 'demonetisation', 'devaluation', 'delicensing'],
  sol: 'Disinvestment transfers part of the government\'s equity to others. Demonetisation withdraws currency notes, devaluation lowers the currency\'s official value, and delicensing removes licence requirements.',
}));
Q('m_navratna', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why were some profitable public-sector enterprises given Maharatna, Navratna or Miniratna status?',
  opts: [
    'To give them more freedom in management and investment decisions so they could compete better',
    'To close them down and sell their land',
    'To stop them from earning profits',
    'To bring them under direct control of foreign governments',
  ],
  sol: 'These statuses give efficient public enterprises greater operational and financial autonomy, so that they can expand and compete in a liberalised market. They are not about closure, limiting profit or foreign control.',
}));
Q('m_outsourcing', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A hospital in Canada sends its patients\' medical transcription work to a firm in Pune, which returns typed reports overnight. This is an example of',
  opts: ['outsourcing', 'disinvestment', 'import substitution', 'demonetisation'],
  sol: 'Buying a service from an outside firm, here in another country, is outsourcing; cheap, fast communication made such services tradeable. The other terms describe ownership, a trade strategy and currency withdrawal.',
}));
Q('m_wto_aim', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is an aim of the World Trade Organization?',
  opts: [
    'To set up a rule-based trading system and reduce tariff and non-tariff barriers among members',
    'To lend money to countries facing a balance-of-payments crisis',
    'To fix the exchange rate of every currency',
    'To collect GST on international trade',
  ],
  sol: 'The WTO sets and enforces rules for trade in goods and services and works to lower barriers. Lending in a BoP crisis is the IMF\'s role; it does not fix exchange rates or collect taxes.',
}));
Q('ar_outsourcing', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'India became an important destination for outsourcing of services after the reforms.',
  r: 'India had a large pool of skilled, English-speaking workers available at relatively low wages, and communication technology became cheap.',
  sol: 'Both are true, and R explains A: skilled workers at lower cost, combined with cheap telecom and the internet, made it profitable for foreign firms to outsource services to India.',
}));
Q('tf_privatisation', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Privatisation means only selling a public-sector enterprise outright to a private company; selling part of its shares is not privatisation.',
  sol: 'Privatisation includes both an outright sale and disinvestment, in which part of the government\'s equity is sold to private investors or the public.',
}));
Q('n_disinvest', num({
  t: 1, d: 3, c: 'application', marks: 2, value: DIS_RECEIPT, unit: '₹ crore',
  stem: `The government owns all ${DIS.shares} crore shares of an imagined public-sector company. It sells ${DIS.soldPct} per cent of them to the public at ₹${DIS.price} a share. How much does it receive (in ₹ crore)?`,
  sol: `Step 1: Shares sold = ${DIS.soldPct} per cent of ${DIS.shares} crore = ${DIS_SOLD} crore.\nStep 2: Receipt = ${DIS_SOLD} crore × ₹${DIS.price} = ₹${DIS_RECEIPT} crore. (The government keeps ${DIS_LEFT} per cent of the shares.)`,
  scheme: [['Shares sold', 1], [`Receipt ₹${DIS_RECEIPT} crore`, 1]],
}));
Q('n_outsource', num({
  t: 1, d: 2, c: 'application', marks: 1, value: OUT_SAVING, unit: '₹',
  stem: `An imagined firm abroad pays the equivalent of ₹${inr(OUT.home)} an hour for an accounting service at home. An Indian firm offers it for ₹${OUT.abroad} an hour. How much does the foreign firm save on a job of ${OUT.hours} hours by outsourcing it to India?`,
  sol: `Step 1: Saving per hour = ${inr(OUT.home)} − ${OUT.abroad} = ₹${OUT.home - OUT.abroad}.\nStep 2: Saving = ${OUT.home - OUT.abroad} × ${OUT.hours} = ₹${inr(OUT_SAVING)}.`,
}));
Q('s_privatise_why', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why the government chose to disinvest in public-sector enterprises.',
  model: '1. To improve **efficiency and financial discipline** by bringing in private shareholders and market scrutiny.\n2. To raise **resources** for the government, which could be used to reduce borrowing or fund social and infrastructure spending.',
  sol: 'One efficiency reason and one revenue reason.',
  scheme: [['Efficiency reason', 1], ['Revenue reason', 1]],
}));
Q('s3_outsourcing', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'What is outsourcing? Explain two reasons why India has gained from it.',
  model: '**Outsourcing** is buying a service (or a part of production) from an outside firm, often in another country, instead of doing it within the firm.\n1. India has many **skilled, English-speaking** workers whose **wages are lower** than in rich countries, so its firms can quote competitive prices.\n2. Cheap **telecommunication and the internet** let services such as call centres, accounting and software work be delivered instantly across the world.',
  sol: 'Meaning, then two reasons linked to India\'s advantage.',
  scheme: [['Meaning of outsourcing', 1], ['First reason', 1], ['Second reason', 1]],
}));
Q('l_privatisation', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Explain privatisation as part of the New Economic Policy. Present one argument for and one against disinvestment, and state your own reasoned view.',
  model: '1. **Meaning:** privatisation reduces government ownership or management of enterprises, by outright sale or by **disinvestment** (selling part of the equity).\n2. **Aims:** improve efficiency and discipline, and raise resources for the government.\n3. **Autonomy:** profitable enterprises were given **Maharatna, Navratna or Miniratna** status, with more freedom in decisions.\n4. **For:** market investors and competition can push enterprises to cut waste; proceeds can fund roads, health or debt reduction.\n5. **Against and view:** critics argue that assets were sometimes **sold below their value** and proceeds used for routine expenses. A balanced view: disinvestment helps when sales are transparent, fairly priced and the money builds lasting assets.',
  sol: 'Meaning, aims, autonomy, then a balanced appraisal with a reasoned view; any well-argued view earns the mark.',
  scheme: [['Meaning, including disinvestment', 1], ['Aims', 1], ['Ratna statuses / autonomy', 1], ['Argument for', 1], ['Argument against with a reasoned view', 1]],
}));

// ================================================================ t02 Appraisal of the LPG policy
Q('m_growth_led', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the decades after the reforms, which sector contributed most to the growth of India\'s GDP?',
  opts: ['The service sector', 'Agriculture', 'Mining alone', 'The small-scale handloom sector'],
  sol: 'Growth after 1991 was led mainly by services such as IT, finance, trade and telecom. Agricultural growth slowed, and mining or handlooms were too small to lead growth.',
}));
Q('m_agri_concern', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which is a common criticism of the effect of the reforms on agriculture?',
  opts: [
    'Public investment in farm infrastructure such as irrigation, power and research did not keep pace',
    'Farmers were forced to stop growing cash crops',
    'All farm subsidies were doubled every year',
    'Agricultural exports were banned completely',
  ],
  sol: 'Critics point out that public spending on irrigation, roads, power and research grew slowly, and that opening to world markets exposed farmers to price swings. The reforms did not ban cash crops or farm exports, and subsidies were not doubled.',
}));
Q('m_reserves_after', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which change after the reforms is generally counted as a success?',
  opts: [
    'A large increase in India\'s foreign-exchange reserves',
    'A fall in the share of services in GDP',
    'The end of all fiscal deficits from 1992',
    'A complete stop to imports of crude oil',
  ],
  sol: 'Foreign-exchange reserves rose many times over compared with 1991, helped by foreign investment, software exports and remittances. Services grew, deficits continued, and oil imports went on.',
}));
Q('m_jobless', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Critics sometimes describe growth after the reforms as "jobless growth". What do they mean?',
  opts: [
    'Output grew fast, but good-quality employment grew much more slowly',
    'Output stopped growing and so did employment',
    'Employment grew fast but output fell',
    'Only government jobs increased',
  ],
  sol: 'The phrase means that GDP rose rapidly, led by capital- and skill-intensive services and industries, while decent jobs for the large workforce grew much more slowly. The other options do not describe the criticism.',
}));
Q('m_ind_mixed', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Small Indian manufacturers of toys and electronic goods faced difficulty after imports were liberalised mainly because',
  opts: [
    'cheaper imports competed with them while infrastructure such as power remained weak',
    'they were not allowed to sell in India any more',
    'all their raw materials were banned',
    'their products were taxed at zero per cent',
  ],
  sol: 'Lower tariffs brought in cheaper foreign goods, and domestic producers with costly or unreliable power and inputs found it hard to compete. Nothing stopped them from selling at home, and lower taxes would have helped them.',
}));
Q('m_fiscal_after', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined state cuts tax rates hoping that people will report more income, but in the first two years total tax collected falls. This illustrates which concern raised about fiscal policy after the reforms?',
  opts: [
    'Lower tax rates may not raise revenue quickly, which can limit the government\'s spending on social sectors',
    'Lower tax rates always raise revenue immediately',
    'Tax cuts have no effect on government revenue',
    'Lower tax rates make imports more expensive',
  ],
  sol: 'Rate cuts were expected to improve compliance over time, but critics note that revenue did not always respond quickly, squeezing funds for health, education and welfare. The case shows exactly that delay; the other options contradict it or are unrelated.',
}));
Q('m_globalisation_both', mcq({
  t: 2, d: 3, c: 'evaluation',
  stem: 'Which statement gives the most balanced appraisal of globalisation\'s effect on India?',
  opts: [
    'It brought foreign investment, technology and wider markets, but its benefits were uneven across sectors, regions and workers',
    'It harmed every sector and every person without exception',
    'It benefited every sector and every person equally',
    'It had no effect on India\'s economy at all',
  ],
  sol: 'A balanced appraisal recognises gains (investment, technology, exports, consumer choice) and uneven distribution (some regions, workers and small producers gained far less). The other options are one-sided or plainly untrue.',
}));
Q('ar_services', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'After the reforms, the share of the service sector in India\'s GDP increased.',
  r: 'Services such as IT, telecom, finance and trade grew faster than agriculture and industry.',
  sol: 'Both are true, and R explains A: when one sector grows faster than the others, its share in total output rises.',
}));
Q('ar_agri_exports', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'After the reforms, farmers were cut off from world markets for their crops.',
  r: 'Opening the economy linked domestic farm prices more closely with international prices.',
  sol: 'A is false: the reforms opened, not closed, world markets to Indian farm produce. R is true: farm prices became more sensitive to world price movements, which is one reason farmers faced more risk.',
}));
Q('tf_reserves', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? One of the outcomes of the reforms was a large rise in India\'s foreign-exchange reserves compared with 1991.',
  sol: 'Reserves grew many times over after 1991, which is usually counted as a success of the reforms.',
}));
Q('ord_reform', ord({
  t: 2, d: 3, c: 'analysis', marks: 1,
  stem: 'Arrange the following in the order in which they happened.',
  items: [
    'Foreign-exchange reserves fall to a very low level',
    'India seeks loans from the IMF and the World Bank',
    'The New Economic Policy is announced',
    'India becomes a founder member of the WTO',
  ],
  sol: 'The reserve crisis came first, then the request for international loans, then the New Economic Policy (1991), and the WTO came into being in 1995.',
}));
Q('fb_jobless', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Growth in which output rises fast but employment rises much more slowly is often called ___ growth.',
  acc: [['jobless']],
  sol: 'It is called jobless growth.',
}));
Q('n_growth', num({
  t: 2, d: 2, c: 'application', marks: 1, value: GROWTH, unit: '%',
  stem: `An imagined economy\'s GDP rises from ₹${GDP1} thousand crore in year 1 to ₹${GDP2} thousand crore in year 2. Calculate its growth rate.`,
  sol: `Step 1: Growth rate = (GDP in year 2 − GDP in year 1) ÷ GDP in year 1 × 100.\nStep 2: (${GDP2} − ${GDP1}) ÷ ${GDP1} × 100 = ${GROWTH} per cent.`,
}));
Q('s_agri_effect', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why do critics say that agriculture gained little from the reforms? Give two reasons.',
  model: '1. **Public investment** in irrigation, power, roads, markets and research grew slowly, so farm productivity improved little.\n2. Opening to world markets and a shift towards **export-oriented cash crops** exposed farmers to **price swings** and reduced the area under food grains in some regions.',
  sol: 'Two reasons: weak public investment, and exposure to world prices / crop shift.',
  scheme: [['First reason explained', 1], ['Second reason explained', 1]],
}));
Q('s_ind_effect', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain two reasons why industrial growth after the reforms was uneven.',
  model: '1. **Cheaper imports** competed with many domestic producers, especially small units, which lost part of their market.\n2. **Infrastructure** such as power and transport did not improve fast enough, keeping costs high and making it harder for Indian goods to compete abroad.',
  sol: 'Two reasons: import competition and weak infrastructure (or limited access to foreign markets).',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_success', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'State three outcomes of the reforms that are generally considered successes.',
  model: '1. **Faster GDP growth** than in the decades before 1991, led by the service sector.\n2. A large increase in **foreign-exchange reserves** and in foreign investment, making the economy far less vulnerable to a crisis like that of 1991.\n3. Growth of **exports of services** such as software and business services, and wider consumer choice and better quality of goods.',
  sol: 'Three distinct successes, each with a line of explanation.',
  scheme: [['Growth', 1], ['Reserves / foreign investment', 1], ['Exports of services / consumer choice', 1]],
}));
Q('s3_criticism', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'State three criticisms that have been made of the economic reforms.',
  model: '1. **Agriculture** gained little: public investment in farm infrastructure lagged and farmers faced world price swings.\n2. **Employment** in good-quality jobs grew slowly compared with output ("jobless growth").\n3. Gains were **uneven**: some regions and skilled workers gained much more than others, and disinvestment was at times said to undervalue public assets.',
  sol: 'Three distinct criticisms, each explained.',
  scheme: [['Agriculture', 1], ['Employment', 1], ['Unequal gains / disinvestment', 1]],
}));
Q('l_appraisal', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Critically appraise the impact of the economic reforms since 1991 on the Indian economy.',
  model: '1. **Growth:** GDP grew faster than before 1991, led mainly by **services**.\n2. **External sector:** foreign-exchange **reserves** and foreign investment rose sharply; services exports grew.\n3. **Agriculture:** growth slowed; public investment in irrigation, power and research lagged, and farmers faced world price swings.\n4. **Industry and jobs:** cheaper imports and weak infrastructure hurt many small units; decent jobs grew slower than output.\n5. **Overall:** the reforms ended the 1991 crisis and raised growth, but benefits were **uneven**; wider gains need investment in farming, skills and infrastructure.',
  sol: 'Positives and negatives across sectors, ending with a balanced conclusion.',
  scheme: [['Growth', 1], ['External sector', 1], ['Agriculture', 1], ['Industry and employment', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ t03 Demonetisation and GST
Q('m_demo_date', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'On 8 November 2016, the Government of India announced that which currency notes would cease to be legal tender?',
  opts: ['₹500 and ₹1,000 notes', '₹100 and ₹200 notes', '₹10 and ₹20 notes', 'All coins'],
  sol: 'The old series ₹500 and ₹1,000 notes stopped being legal tender; holders could deposit or exchange them at banks for a limited period.',
}));
Q('m_demo_obj', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following was a stated objective of demonetisation?',
  opts: [
    'To curb black money and counterfeit notes and to encourage digital payments',
    'To raise the price of gold',
    'To increase the import of foreign currency notes',
    'To replace the rupee with a foreign currency',
  ],
  sol: 'The government stated aims of curbing black money and corruption, removing counterfeit notes, cutting terror financing and promoting digital payments. The other options were never objectives.',
}));
Q('m_legal_tender', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'When a currency note ceases to be **legal tender**, it means that',
  opts: [
    'it can no longer be used to settle payments by law',
    'its value doubles overnight',
    'it can be used only in foreign countries',
    'it can be used only to pay taxes',
  ],
  sol: 'Legal tender is money that must be accepted in payment by law; once withdrawn, the note cannot be used for payments (it could only be deposited or exchanged during the allowed period).',
}));
Q('m_gst_date', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Goods and Services Tax (GST) came into force in India on',
  opts: ['1 July 2017', '8 November 2016', '1 April 1991', '1 January 1995'],
  sol: 'GST was launched on 1 July 2017. 8 November 2016 is the demonetisation announcement, 1991 is the year of the reforms, and 1995 is when the WTO was set up.',
}));
Q('m_gst_type', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'GST is best described as',
  opts: [
    'an indirect tax on the supply of goods and services that replaced many central and state taxes',
    'a direct tax on income of individuals',
    'a tax on agricultural land only',
    'a tax collected only by municipalities',
  ],
  sol: 'GST is an indirect tax on supplies of goods and services; it subsumed taxes such as central excise, service tax and state VAT. It is not an income tax, a land tax or a municipal tax.',
}));
Q('m_gst_council', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Who decides GST rates and rules in India?',
  opts: [
    'The GST Council, made up of the Union Finance Minister and the finance ministers of the states and some union territories',
    'The Reserve Bank of India alone',
    'The World Trade Organization',
    'Each district collector separately',
  ],
  sol: 'GST is shared by the Centre and the states, so a joint body, the GST Council, recommends rates and rules. The RBI, the WTO and district officials do not set GST.',
}));
Q('m_cascade', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Under GST, a trader pays tax only on the value she adds, because she can deduct the tax already paid on her purchases. This deduction is called',
  opts: ['input tax credit', 'a tax holiday', 'a customs duty', 'a subsidy'],
  sol: 'Input tax credit lets each seller subtract the GST paid on inputs from the GST charged on sales, which removes the "tax on tax" (cascading) of the old system.',
}));
Q('m_one_nation', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'GST is often linked with the idea of "one nation, one tax" because',
  opts: [
    'a single tax structure across states replaced many different state and central taxes, helping create a common national market',
    'every good in India is taxed at exactly the same rate',
    'states no longer receive any tax revenue',
    'it abolished income tax',
  ],
  sol: 'GST replaced a patchwork of state and central indirect taxes with one framework, reducing barriers to moving goods between states. There are still different rate slabs, states share the revenue, and income tax continues.',
}));
Q('ar_gst', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'GST reduces the cascading effect of taxes.',
  r: 'Under GST, tax paid on inputs can be set off against tax on output through input tax credit.',
  sol: 'Both are true, and R explains A: because tax on inputs is credited, tax is not charged again on tax already paid, so cascading falls.',
}));
Q('ar_demo', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'Digital payments in India increased after demonetisation.',
  r: 'GST was introduced on 1 July 2017.',
  sol: 'Both statements are true, but the rise in digital payments after November 2016 is linked to the shortage of cash and the push for digital modes, not to GST, so R does not explain A.',
}));
Q('tf_gst_direct', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? GST is a direct tax paid on a person\'s income.',
  sol: 'GST is an indirect tax on the supply of goods and services; income tax is the direct tax on income.',
}));
Q('mt_dates', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each event (column A) with its year (column B).',
  pairs: [
    ['New Economic Policy announced', '1991'],
    ['World Trade Organization set up', '1995'],
    ['Demonetisation of ₹500 and ₹1,000 notes', '2016'],
    ['GST comes into force', '2017'],
  ],
  sol: 'NEP 1991; WTO 1995; demonetisation announced on 8 November 2016; GST from 1 July 2017.',
}));
Q('n_gst', num({
  t: 3, d: 3, c: 'application', marks: 2, value: GST_TRADER_PAY, unit: '₹',
  stem: `At an imagined GST rate of ${GST.rate} per cent, a manufacturer sells cloth to a trader for ₹${inr(GST.makerSale)} (before tax) and charges GST on it. The trader sells the cloth for ₹${inr(GST.traderSale)} (before tax). How much GST must the trader pay to the government after input tax credit?`,
  sol: `Step 1: GST on the trader\'s sale = ${GST.rate} per cent of ${inr(GST.traderSale)} = ₹${GST_TRADER_OUT}.\nStep 2: Input tax credit (GST paid to the manufacturer) = ${GST.rate} per cent of ${inr(GST.makerSale)} = ₹${GST_MAKER}.\nStep 3: GST payable = ${GST_TRADER_OUT} − ${GST_MAKER} = ₹${GST_TRADER_PAY}.`,
  scheme: [['Output tax and input credit', 1], [`Net GST ₹${GST_TRADER_PAY}`, 1]],
}));
Q('n_notes', num({
  t: 3, d: 1, c: 'understanding', marks: 1, value: NOTES_VALUE, unit: '₹',
  stem: `In November 2016 an imagined shopkeeper deposits ${NOTES.n1000} old ₹1,000 notes and ${NOTES.n500} old ₹500 notes in her bank account. What is the total value deposited?`,
  sol: `Step 1: ${NOTES.n1000} × 1,000 = ₹${inr(NOTES.n1000 * 1000)}; ${NOTES.n500} × 500 = ₹${inr(NOTES.n500 * 500)}.\nStep 2: Total = ${inr(NOTES.n1000 * 1000)} + ${inr(NOTES.n500 * 500)} = ₹${inr(NOTES_VALUE)}.`,
}));
Q('s_demo_obj', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two objectives of demonetisation announced in November 2016.',
  model: '1. To curb **black money** (unaccounted income held in cash) and corruption.\n2. To remove **counterfeit notes** from circulation and to encourage a shift to **digital payments**.',
  sol: 'Any two stated objectives.',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s_gst_features', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two features of GST.',
  model: '1. It is an **indirect tax** on the supply of goods and services that **replaced many central and state taxes**, such as excise duty, service tax and VAT.\n2. **Input tax credit** lets sellers deduct tax paid on purchases, so tax is effectively paid only on **value added**.',
  sol: 'Two genuine features (subsuming taxes, input tax credit, GST Council, destination-based).',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s3_demo_effects', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three effects that were observed after demonetisation in 2016.',
  model: '1. **Shortage of cash:** long queues at banks and ATMs for weeks, as the withdrawn notes were most of the cash in circulation.\n2. **Pressure on cash-based activity:** small traders, daily-wage workers and farmers who relied on cash faced difficulty for some time.\n3. **Shift to digital payments:** use of cards, mobile wallets and UPI rose, and bank deposits increased as old notes were deposited.',
  sol: 'Three observed effects, stated neutrally.',
  scheme: [['Cash shortage', 1], ['Effect on cash-based activity', 1], ['Digital payments / deposits', 1]],
}));
Q('s3_gst_benefits', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three ways in which GST is expected to benefit the economy.',
  model: '1. **No cascading:** input tax credit removes tax on tax, which can lower costs and prices.\n2. **Common national market:** one tax framework across states makes moving goods between states simpler, with fewer checkposts and delays.\n3. **Wider tax base:** invoices and credits are matched online, which encourages businesses to register and can raise revenue.',
  sol: 'Three distinct expected benefits.',
  scheme: [['Removal of cascading', 1], ['Common market / ease of movement', 1], ['Wider tax base / compliance', 1]],
}));
Q('l_gst', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'What is GST? Explain its structure and the main objectives behind its introduction.',
  model: '1. **Meaning:** GST is an **indirect tax** on the supply of goods and services, in force from **1 July 2017**.\n2. **Taxes replaced:** it subsumed many central and state taxes such as central excise, service tax and state VAT.\n3. **Structure:** central GST and state GST on supplies within a state; integrated GST on supplies between states; rates recommended by the **GST Council** of the Centre and states.\n4. **Objective one:** remove **cascading** through input tax credit, so tax falls only on value added.\n5. **Objective two:** create a **common national market** ("one nation, one tax") and widen the tax base through better compliance.',
  sol: 'Meaning and date, taxes replaced, structure, and two objectives.',
  scheme: [['Meaning and date', 1], ['Taxes replaced', 1], ['Structure (CGST, SGST, IGST, Council)', 1], ['Cascading removed', 1], ['Common market / wider base', 1]],
}));
Q('l_demo', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Explain the meaning and objectives of demonetisation (2016) and discuss its effects on the economy.',
  model: '1. **Meaning:** on **8 November 2016** the old **₹500 and ₹1,000** notes ceased to be legal tender; holders could deposit or exchange them for a limited period.\n2. **Objectives:** curb **black money** and corruption, remove **counterfeit notes**, cut terror financing and promote **digital payments**.\n3. **Short-run effects:** an acute **cash shortage**, queues at banks, and difficulty for cash-dependent traders, farmers and workers.\n4. **Other effects:** a rise in **digital payments** and bank deposits, and more people brought into the tax net.\n5. **Assessment:** economists differ on how far the objectives were met; most agree it changed payment habits but imposed real short-run costs.',
  sol: 'Meaning, objectives, short-run costs, other effects, and a neutral assessment.',
  scheme: [['Meaning and date', 1], ['Objectives', 1], ['Short-run effects', 1], ['Other effects', 1], ['Balanced assessment', 1]],
}));

// ================================================================ case-based
Q('cb_crisis', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined account written by SOYL for practice; the country and figures are not real.)*',
  passage: `**Ranakpur, an imagined country, early 1990s**\n\nFor ten years Ranakpur's government had spent far more than it collected in taxes, borrowing at home and abroad to cover the gap. Its imports of oil and machinery grew much faster than its exports. Then a war in the oil-producing region raised fuel prices sharply. By the end of the year its foreign-exchange reserves stood at only ${RES.reserves} billion US dollars, while imports cost ${RES.monthlyImports} billion US dollars a month. Lenders stopped renewing loans. The government turned to two international institutions, which agreed to lend on condition that it remove controls on industry and trade, sell part of its shares in state firms and open its economy to foreign investment.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: COVER, unit: 'months', stem: 'For how many months of imports could Ranakpur\'s reserves pay?', sol: `Step 1: Cover = reserves ÷ monthly imports.\nStep 2: ${RES.reserves} ÷ ${RES.monthlyImports} = ${COVER} months.` })),
    child('b', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the two international institutions to which a country in such a crisis usually turns.', model: 'The **International Monetary Fund (IMF)** and the **World Bank**.', sol: 'The two Bretton Woods institutions.', scheme: [['IMF and World Bank', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the conditions in the passage that correspond to liberalisation, privatisation and globalisation.', model: '**Liberalisation:** removing controls on industry and trade. **Privatisation:** selling part of its shares in state firms (disinvestment). **Globalisation:** opening the economy to foreign investment.', sol: 'Map each condition to one of the three parts.', scheme: [['Two parts correctly identified', 1], ['Third part correctly identified', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify one fiscal and one external cause of Ranakpur\'s crisis from the passage.', model: '**Fiscal:** years of government spending far above tax revenue, financed by **borrowing**. **External:** imports growing faster than exports, worsened by **higher oil prices**, which drained **reserves**.', sol: 'One cause from the budget side and one from the balance-of-payments side.', scheme: [['Fiscal cause', 1], ['External cause', 1]] }),
    ]),
  ],
}));
Q('cb_sectors', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined economy and figures, written by SOYL for practice.)*',
  passage: `**GDP by sector of an imagined economy (₹ thousand crore, constant prices)**\n\n| Sector | Year 1 | Year 2 |\n|---|---|---|\n| Agriculture | ${GDP.y1.agri} | ${GDP.y2.agri} |\n| Industry | ${GDP.y1.ind} | ${GDP.y2.ind} |\n| Services | ${GDP.y1.serv} | ${GDP.y2.serv} |\n| **Total** | **${GDP1}** | **${GDP2}** |`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: SERV_GROWTH, unit: '%', stem: 'Calculate the growth rate of the service sector between the two years.', sol: `Step 1: Growth = (${GDP.y2.serv} − ${GDP.y1.serv}) ÷ ${GDP.y1.serv} × 100.\nStep 2: ${GDP.y2.serv - GDP.y1.serv} ÷ ${GDP.y1.serv} × 100 = ${SERV_GROWTH} per cent.` })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: SERV_SHARE2, unit: '%', stem: 'What is the share of services in total GDP in year 2? (Round to one decimal place.)', sol: `Step 1: Share = ${GDP.y2.serv} ÷ ${GDP2} × 100.\nStep 2: ${GDP.y2.serv} ÷ ${GDP2} × 100 = ${SERV_SHARE2} per cent (rounded).` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): Agriculture grew by only about ${AGRI_GROWTH} per cent. Suggest two reasons, of the kind discussed for India after 1991, why farm growth may lag.`, model: '(1) Slow growth of **public investment** in irrigation, power, roads and research kept productivity low. (2) Exposure to **world price swings** and a shift towards cash crops raised risk for farmers.', sol: 'Two reasons linked to investment and to market exposure.', scheme: [['First reason', 1], ['Second reason', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Services lead this economy\'s growth. Explain one benefit and one risk of growth led by services.', model: '**Benefit:** fast-growing services such as IT and finance raise incomes and **export earnings**. **Risk:** they employ relatively **few workers** compared with farming, so growth may not create enough jobs for the large workforce.', sol: 'One benefit and one risk, each explained.', scheme: [['Benefit', 1], ['Risk', 1]] }),
    ]),
  ],
}));
Q('cb_gst', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined conversation written by SOYL for practice; the rate used is imagined, not an actual GST rate.)*',
  passage: `**At a cloth shop in an imagined town, Kanchanpur**\n\nMeera's mill sells cloth to Arjun's shop for ₹${inr(GST.makerSale)} and charges GST at an imagined rate of ${GST.rate} per cent on it. Arjun sells the cloth to customers for ₹${inr(GST.traderSale)} plus GST. "Under the old system," says Arjun, "I had to pay tax on my whole selling price, which already had the mill's tax inside it, and my goods were stopped at the state border for checks. Now I claim credit for the tax Meera paid, and my truck crosses into the next state without waiting." His accountant adds that all invoices are now uploaded online and matched.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: GST_TRADER_PAY, unit: '₹', stem: 'How much GST does Arjun pay to the government after claiming input tax credit?', sol: `Step 1: Tax on sale = ${GST.rate} per cent of ${inr(GST.traderSale)} = ₹${GST_TRADER_OUT}; credit = ₹${GST_MAKER}.\nStep 2: Net = ${GST_TRADER_OUT} − ${GST_MAKER} = ₹${GST_TRADER_PAY}.` })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Which feature of the old system does Arjun describe as "tax on tax"?', model: 'The **cascading effect** of taxes: tax was charged on a price that already included earlier tax.', sol: 'Name the cascading effect.', scheme: [['Cascading effect', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): Under the old cascading method, Arjun would have paid ${GST.rate} per cent on ₹${inr(CASC_BASE)} (his price including the mill\'s tax). Compare total tax on the cloth under the two systems.`, model: `**Old system:** ${GST_MAKER} + ${CASC_TRADER} = **₹${CASC_TOTAL}**. **GST:** ${GST_MAKER} + ${GST_TRADER_PAY} = **₹${GST_TOTAL}**, which is ${GST.rate} per cent of the final value. GST collects ₹${CASC_TOTAL - GST_TOTAL} less because tax is not charged on tax.`, sol: 'Compute both totals and explain the difference.', scheme: [['Both totals', 1], ['Reason for the difference', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify two objectives of GST illustrated in the passage.', model: '(1) **Removing cascading** through input tax credit. (2) A **common national market**: goods move between states without border checks; online matching of invoices also **widens the tax base**.', sol: 'Two objectives drawn from the passage.', scheme: [['First objective', 1], ['Second objective', 1]] }),
    ]),
  ],
}));
