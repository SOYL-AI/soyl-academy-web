// CBSE 12 Economics, ch10 Rural Development — question bank. Every scenario, table and passage is
// written by SOYL (imagined villages, people, rates and prices, labelled as such); no NCERT exercise or
// board/sample-paper item is reused. Real-world facts are limited to stable, commonly taught ones
// (bank nationalisation 1969, RRBs 1975, NABARD 1982, Operation Flood from 1970, the Anand pattern).
// Every computed figure is derived here, never typed by hand. The deleted topics (Poverty;
// Infrastructure as a chapter) are not examined.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// Moneylender vs bank crop loan (imagined rates).
export const LOAN = { p: 20000, mlRate: 5, months: 6, bankRate: 7 };
export const ML_INT = (LOAN.p * LOAN.mlRate * LOAN.months) / 100; // 6,000 (per month rate)
export const BANK_INT = (LOAN.p * LOAN.bankRate * LOAN.months) / (100 * 12); // 700 (per year rate)
export const SAVED = ML_INT - BANK_INT; // 5,300
// Price spread on tomatoes (₹ per kg).
export const TOM = { consumer: 40, farmer: 12 };
export const TOM_SHARE = pct(TOM.farmer, TOM.consumer); // 30
export const TOM_SPREAD = TOM.consumer - TOM.farmer; // 28
// Storage vs distress sale.
export const STORE = { q: 50, harvest: 1800, later: 2200, cost: 100 };
export const STORE_GAIN = STORE.q * (STORE.later - STORE.harvest - STORE.cost); // 15,000
// Self-help group thrift.
export const SHG = { members: 15, monthly: 200, months: 12 };
export const SHG_FUND = SHG.members * SHG.monthly * SHG.months; // 36,000
// Diversified farm household income (₹ a year).
export const HH = { crops: 60000, dairy: 30000, poultry: 10000 };
export const HH_TOTAL = HH.crops + HH.dairy + HH.poultry; // 1,00,000
export const HH_NONCROP = pct(HH.dairy + HH.poultry, HH_TOTAL); // 40
// Organic vs conventional (one acre, imagined).
export const ORG = { convQ: 40, convP: 2000, convCost: 12000, orgQ: 34, orgP: 2500, orgCost: 5000 };
export const CONV_NET = ORG.convQ * ORG.convP - ORG.convCost; // 68,000
export const ORG_NET = ORG.orgQ * ORG.orgP - ORG.orgCost; // 80,000
export const ORG_YIELD_FALL = pct(ORG.convQ - ORG.orgQ, ORG.convQ); // 15
// Dairy cooperative payment.
export const MILK = { litres: 10, price: 40, days: 30 };
export const MILK_PAY = MILK.litres * MILK.price * MILK.days; // 12,000
// Faulty scale.
export const SCALE = { true: 100, shown: 95, price: 30 };
export const SCALE_LOSS = (SCALE.true - SCALE.shown) * SCALE.price; // 150
// Case: Kalyanpur credit table.
export const KAL = { ml: 18, bank: 45, coop: 22, shg: 15 };
export const KAL_TOTAL = KAL.ml + KAL.bank + KAL.coop + KAL.shg; // 100 (₹ lakh)
export const KAL_INST = KAL.bank + KAL.coop; // 67
// Case: Hiware farmers' market.
export const MKT = { mandi: 14, direct: 22, consumerOld: 30, consumerNew: 26 };
export const MKT_GAIN = MKT.direct - MKT.mandi; // 8
export const MKT_SAVE = MKT.consumerOld - MKT.consumerNew; // 4

if (ML_INT !== 6000 || BANK_INT !== 700 || SAVED !== 5300 || TOM_SHARE !== 30 || TOM_SPREAD !== 28 || STORE_GAIN !== 15000 || SHG_FUND !== 36000 || HH_TOTAL !== 100000 || HH_NONCROP !== 40 || CONV_NET !== 68000 || ORG_NET !== 80000 || ORG_YIELD_FALL !== 15 || MILK_PAY !== 12000 || SCALE_LOSS !== 150 || KAL_TOTAL !== 100 || KAL_INST !== 67 || MKT_GAIN !== 8 || MKT_SAVE !== 4)
  throw new Error('ch10 figure check failed');

// ================================================================ t01 meaning of rural development
Q('m_rd_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Rural development mainly means',
  opts: [
    'action to develop the areas that lag behind in the village economy and improve the lives of rural people',
    'moving most rural people to cities so that villages become smaller',
    'raising the output of large factories located in villages',
    'replacing farming completely with services in every village',
  ],
  sol: 'Rural development focuses on the lagging areas and people of the village economy: skills, health, land, credit, marketing and productive work. It does not aim to empty villages, build big factories there or abolish farming.',
}));
Q('s_rd_areas', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any four areas that need attention for the development of rural India.',
  model: '1. **Human capital**: literacy, especially of women, skills and health.\n2. **Land reforms** and better use of local resources.\n3. **Credit** at fair rates and **marketing** facilities.\n4. **Productive non-farm work** and research into better farm methods.',
  sol: 'Any four distinct areas from human capital, land reforms, credit, marketing, productive activities and research.',
  scheme: [['Any two areas', 1], ['Any two more areas', 1]],
}));

// ================================================================ t01 rural credit
Q('m_credit_need', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Why do farmers need credit more than most other producers?',
  opts: [
    'There is a long gap between sowing and harvest, while seeds, fertiliser and family needs must be paid for in between',
    'Farm output is sold before the seeds are sown',
    'Farmers never have any family expenses',
    'Banks require every farmer to borrow each season',
  ],
  sol: 'Farming has a long gestation period: money is spent on inputs at sowing but income comes only after harvest, and household needs continue in between. The other options are untrue.',
}));
Q('m_noninst', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following is a **non-institutional** source of rural credit?',
  opts: ['A village moneylender', 'A Regional Rural Bank', 'A primary agricultural credit society', 'A nationalised commercial bank'],
  sol: 'Moneylenders, traders and landlords lend privately, outside any regulated institution. RRBs, cooperative credit societies and commercial banks are institutional sources.',
}));
Q('m_moneylender_harm', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Ramesh, a small farmer in an imagined village of Vidarbha, borrows from a trader who also buys his cotton. Which outcome is **most likely**?',
  opts: [
    'He must sell his cotton to the trader at a low price fixed by the lender, and the debt keeps growing',
    'He will get the highest market price because the trader is his lender',
    'He pays no interest because the loan is informal',
    'His loan will be refinanced by NABARD',
  ],
  sol: 'Lenders who are also buyers tie the loan to the crop: the farmer sells at the lender\'s price, pays high interest and often remains in debt. Informal loans carry interest, and NABARD does not refinance private traders.',
}));
Q('m_nationalisation', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The expansion of commercial bank branches into rural areas got a major push after',
  opts: ['the nationalisation of major commercial banks in 1969', 'the first census of 1881', 'the setting up of the Planning Commission in 1950', 'the start of GST in 2017'],
  sol: 'After major banks were nationalised in 1969, the government directed them to open rural branches and lend to priority sectors such as agriculture. The other events are unrelated to rural banking.',
}));
Q('m_rrb', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Regional Rural Banks were set up in India in',
  opts: ['1975', '1949', '1991', '2005'],
  sol: 'RRBs were created in 1975 to give credit to small farmers, labourers, artisans and small entrepreneurs in rural areas.',
}));
Q('m_nabard', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which body was set up in 1982 as the apex institution to coordinate the institutions financing rural areas?',
  opts: ['NABARD', 'Reserve Bank of India', 'Food Corporation of India', 'National Dairy Development Board'],
  sol: 'The National Bank for Agriculture and Rural Development (NABARD), set up in 1982, coordinates and refinances rural credit institutions. The RBI is the central bank; FCI handles food stocks; NDDB promotes dairying.',
}));
Q('m_shg_feature', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement best describes a **self-help group** (SHG)?',
  opts: [
    'A small group of rural people, often women, who pool small savings and lend to members, and may then borrow from banks',
    'A large company that lends to farmers at high interest',
    'A government office that buys grain at the minimum support price',
    'A cooperative that sells milk in cities',
  ],
  sol: 'SHGs encourage thrift: members save small amounts regularly, lend to each other at reasonable rates and can get bank loans as a group. The other options describe lenders, FCI and a dairy cooperative.',
}));
Q('m_shg_collateral', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why can an SHG member get a loan without pledging land or gold?',
  opts: [
    'The group itself guarantees repayment, and members know and check each other',
    'Banks are not allowed to ask anyone for security',
    'SHG loans never have to be repaid',
    'The moneylender pledges his own land for her',
  ],
  sol: 'Group responsibility and peer monitoring replace collateral: the group decides, guarantees and follows up on repayment. Loans are repaid, banks may take security from other borrowers, and the moneylender has no role.',
}));
Q('m_credit_problem', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which is a widely discussed **weakness** of institutional rural credit?',
  opts: [
    'Poor recovery of loans and a smaller share of credit reaching small and marginal farmers',
    'It charges higher interest than moneylenders',
    'It has completely replaced informal lenders in every village',
    'It gives loans only to industrial firms in cities',
  ],
  sol: 'Institutional credit has expanded but faces defaults and does not reach enough small and marginal farmers, so informal lenders survive. Its rates are usually lower than moneylenders\', and it does lend to farmers.',
}));
Q('ar_gestation', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Farmers often need loans before the crop is harvested.',
  r: 'Agriculture has a long gestation period between spending on inputs and receiving income from the crop.',
  sol: 'Both are true, and R explains A: since income comes only after harvest, inputs and household needs in the meantime must be financed by borrowing.',
}));
Q('ar_ml_low', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'Moneylenders charge lower interest than banks, which is why poor farmers prefer them.',
  r: 'Moneylenders lend quickly, without paperwork, and often without security.',
  sol: 'A is false: moneylenders usually charge much higher interest than banks. R is true: their speed and lack of formalities are why many still borrow from them.',
}));
Q('ar_nabard', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Self-help groups have helped many rural women save and borrow.',
  r: 'NABARD was set up in 1982 to coordinate rural financing institutions.',
  sol: 'Both statements are true, but R does not explain A: the rise of SHG savings and loans among women is due to group thrift and bank linkage, not to the date NABARD was formed.',
}));
Q('tf_rrb', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? Regional Rural Banks are non-institutional sources of credit.',
  sol: 'RRBs are banks regulated by law, so they are institutional sources. Moneylenders and traders are non-institutional.',
}));
Q('fb_nabard', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The apex body for rural financing in India, set up in 1982, is ___.',
  acc: [['NABARD', 'National Bank for Agriculture and Rural Development']],
  sol: 'NABARD, the National Bank for Agriculture and Rural Development.',
}));
Q('mt_sources', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each source of rural credit with its description.',
  pairs: [
    ['Moneylender', 'Informal lender; quick loans at high interest'],
    ['Primary agricultural credit society', 'Cooperative of farmers that lends to its members'],
    ['Regional Rural Bank', 'Bank set up in 1975 for small rural borrowers'],
    ['Self-help group', 'Small group that pools members\' savings'],
  ],
  sol: 'Moneylenders are informal and costly; credit societies are cooperatives of members; RRBs are banks for small rural borrowers; SHGs pool thrift and lend within the group.',
}));
Q('n_interest', num({
  t: 1, d: 3, c: 'application', marks: 2, value: SAVED, unit: '₹',
  stem: `An imagined farmer needs ₹${inr(LOAN.p)} for ${LOAN.months} months. A moneylender charges ${LOAN.mlRate} per cent **a month** (simple interest); a cooperative bank charges ${LOAN.bankRate} per cent **a year** (simple interest). How much interest (in ₹) does she save by borrowing from the bank?`,
  sol: `Step 1: Moneylender's interest = ${inr(LOAN.p)} × ${LOAN.mlRate}/100 × ${LOAN.months} = ₹${inr(ML_INT)}.\nStep 2: Bank's interest = ${inr(LOAN.p)} × ${LOAN.bankRate}/100 × ${LOAN.months}/12 = ₹${inr(BANK_INT)}.\nStep 3: Saving = ${inr(ML_INT)} − ${inr(BANK_INT)} = ₹${inr(SAVED)}.`,
  scheme: [['Both interest amounts correct', 1], [`Saving ₹${inr(SAVED)}`, 1]],
}));
Q('n_shg', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: SHG_FUND, unit: '₹',
  stem: `An imagined SHG has ${SHG.members} members. Each saves ₹${SHG.monthly} a month. What is the group's total saving after ${SHG.months} months (in ₹)?`,
  sol: `Step 1: Saving = members × monthly saving × months.\nStep 2: ${SHG.members} × ${SHG.monthly} × ${SHG.months} = ₹${inr(SHG_FUND)}.`,
}));
Q('s_inst_vs_noninst', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between institutional and non-institutional sources of rural credit, with one example of each.',
  model: '1. **Institutional** sources are regulated bodies that lend at **fair, stated rates**, e.g. a commercial bank, an RRB or a cooperative credit society.\n2. **Non-institutional** sources are private lenders, often charging **high interest** with no regulation, e.g. moneylenders, traders and landlords.',
  sol: 'Contrast regulation and terms, with one example on each side.',
  scheme: [['Institutional with example', 1], ['Non-institutional with example', 1]],
}));
Q('s_shg_role', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'How do self-help groups help reduce rural dependence on moneylenders? Give two points.',
  model: '1. Members **save regularly** and borrow from the group\'s own fund at **reasonable interest**, so small needs no longer go to the moneylender.\n2. After a record of repayment, the group gets **bank loans without collateral**, opening formal credit to poor women who had none.',
  sol: 'Internal thrift and lending, then bank linkage without security.',
  scheme: [['Internal savings and lending', 1], ['Bank linkage without collateral', 1]],
}));
Q('s_why_inst_fail', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons why moneylenders still lend to many farmers despite the growth of banks.',
  model: '1. Small and **marginal farmers** without land titles or security find it **hard to get bank loans**, while moneylenders lend quickly without paperwork.\n2. Banks may be **far away** and slow, and they do not lend for family needs such as weddings or illness, which moneylenders do.',
  sol: 'Access barriers at banks and the convenience or purposes covered by moneylenders.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_credit_need', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three reasons why rural households need credit.',
  model: '1. **Long gestation**: farmers spend on seeds, fertiliser and labour at sowing but are paid only after harvest.\n2. **Investment**: buying a pump, cattle, or digging a well needs a large sum at once.\n3. **Family needs**: weddings, illness, deaths and ceremonies, and survival after a crop failure, often require borrowing.',
  sol: 'One point each on working capital, fixed investment and household or emergency needs.',
  scheme: [['Working capital over the season', 1], ['Fixed investment', 1], ['Household and emergency needs', 1]],
}));
Q('s3_credit_problems', short({
  t: 1, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Rural banking has grown since 1969, yet it faces problems. Explain any three.',
  model: '1. **Insufficient reach**: credit still does not reach many small and marginal farmers and landless workers, who remain with moneylenders.\n2. **Poor recovery**: defaults on farm loans weaken banks\' ability to lend again.\n3. **Weak focus**: banks have often preferred larger, safer borrowers, and **mobilising rural savings** has been slow.',
  sol: 'Three distinct problems: reach, recovery and the bias or deposit side.',
  scheme: [['First problem explained', 1], ['Second problem explained', 1], ['Third problem explained', 1]],
}));
Q('l_rural_credit', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the institutional structure of rural credit in India and explain how it has tried to free farmers from moneylenders.',
  model: '1. **Commercial banks**: after nationalisation in **1969**, they opened rural branches and lent to agriculture as a priority sector.\n2. **Regional Rural Banks** (from **1975**) serve small farmers, labourers and artisans.\n3. **Cooperative credit societies and banks** lend to members; land development banks give longer loans.\n4. **NABARD** (**1982**) coordinates and refinances these institutions.\n5. **SHGs** pool savings and borrow from banks without collateral, reaching poor women. Together these give **cheaper, regulated credit**, so farmers depend less on moneylenders\' high interest and tied sales, though coverage of the poorest is still incomplete.',
  sol: 'Four institutions or links in the system, then how they reduce dependence on moneylenders, with a balanced closing remark.',
  scheme: [['Commercial banks after 1969', 1], ['RRBs and cooperatives', 1], ['NABARD as the apex body', 1], ['SHGs and microcredit', 1], ['Effect on dependence on moneylenders', 1]],
}));
Q('l_shg_eval', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the role of self-help groups and microcredit in rural development.',
  model: '1. **Thrift**: members save small amounts regularly, building a common fund.\n2. **Fair credit**: they lend to members at reasonable rates for small needs, replacing costly informal loans.\n3. **Bank linkage**: a repayment record lets groups borrow from banks **without collateral**.\n4. **Empowerment**: most members are **women**, who gain income, confidence and a voice in decisions.\n5. **Limits**: loans are small and often used for **consumption** rather than production, and some groups collapse without training or markets. On balance SHGs widen access to credit, but they need links to **skills and markets** to raise incomes lastingly.',
  sol: 'Benefits (thrift, credit, linkage, empowerment) and limitations, ending in a judgement.',
  scheme: [['Thrift and pooled fund', 1], ['Credit at reasonable rates', 1], ['Bank linkage without collateral', 1], ['Empowerment of women', 1], ['Limitations and judgement', 1]],
}));

// ================================================================ t01 agricultural marketing
Q('m_marketing_def', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Agricultural marketing covers',
  opts: [
    'assembling, storing, processing, grading, packing, transporting and selling farm produce',
    'only the sowing and harvesting of crops',
    'only the advertising of fertilisers on television',
    'only the export of food grains',
  ],
  sol: 'Marketing is the whole chain of activities from collecting produce to its sale, including storage, processing, grading, packing and transport. Sowing and harvesting are production; advertising and export are narrow parts at most.',
}));
Q('m_distress', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A vegetable grower in an imagined village near Nashik sells his whole onion crop on the day of harvest at a very low price because he has nowhere to keep it. This is an example of',
  opts: ['distress sale due to lack of storage', 'regulated marketing', 'buffer stocking', 'organic farming'],
  sol: 'Without storage he is forced to sell immediately, whatever the price: a distress sale. Regulated markets, buffer stocks and organic farming are unrelated to his problem.',
}));
Q('m_regulated', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The main purpose of **regulating** agricultural markets is to',
  opts: [
    'create orderly and transparent conditions so that farmers get fair prices',
    'fix the same price for every crop in every season',
    'stop farmers from selling to private traders',
    'collect a new tax from consumers',
  ],
  sol: 'Regulated markets check malpractices such as faulty weights and hidden commissions, making trading transparent so that farmers get fair prices. They do not fix all prices, ban private traders or exist to tax consumers.',
}));
Q('m_msp', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The **minimum support price** (MSP) helps farmers mainly by',
  opts: [
    'assuring a price at which the government will buy certain crops, which protects them from very low prices',
    'guaranteeing that all crops will be sold abroad',
    'giving free seeds to every farmer',
    'fixing the retail price that consumers pay in shops',
  ],
  sol: 'MSP is the price announced before sowing at which government agencies buy notified crops, so farmers are protected if market prices fall. It is not an export guarantee, a seed scheme or a retail price.',
}));
Q('m_buffer', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A year of poor rains raises grain prices in an imagined state. Which marketing measure helps the government keep prices in check?',
  opts: [
    'Releasing grain from buffer stocks through the public distribution system',
    'Closing all regulated markets',
    'Banning cold storages',
    'Withdrawing the minimum support price',
  ],
  sol: 'Grain bought earlier and held as buffer stock can be released through ration shops when supply falls, which keeps prices in check. The other steps would worsen supply or marketing.',
}));
Q('m_direct', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Farmers\' markets where growers sell straight to consumers mainly benefit **both** sides because',
  opts: [
    'fewer middlemen take a margin, so farmers get more and consumers pay less',
    'the government pays every buyer a subsidy',
    'prices there are always fixed at MSP',
    'only exported crops are sold there',
  ],
  sol: 'Cutting out intermediaries narrows the price spread, so part of the margin goes to the farmer and part to the consumer. Such markets do not pay buyers subsidies, are not tied to MSP and sell local produce.',
}));
Q('m_storage_effect', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Which is the most likely result of building cold storages near potato-growing villages?',
  opts: [
    'Farmers can wait for better prices instead of selling everything at harvest',
    'Potato output will fall to zero',
    'Farmers will have to pay higher interest to moneylenders',
    'Consumers will be unable to buy potatoes out of season',
  ],
  sol: 'Storage lets farmers spread sales over the year and avoid harvest-time gluts, and it also supplies potatoes out of season. It does not cut output or raise interest.',
}));
Q('ar_malpractice', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Without regulation, farmers often receive less than the fair value of their produce.',
  r: 'Traders may use faulty weights, manipulate accounts and keep farmers unaware of market prices.',
  sol: 'Both are true, and R explains A: such malpractices and lack of price information take away part of what farmers should earn.',
}));
Q('ar_msp', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'Minimum support prices reduce the risk of a crash in farmers\' income for the crops covered.',
  r: 'Under MSP, the government buys every crop grown in India at a fixed price.',
  sol: 'A is true: an assured purchase price protects farmers of covered crops. R is false: MSP covers only certain notified crops, and procurement is limited to them.',
}));
Q('tf_buffer', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Buffer stocks of food grains are held so that grain can be supplied to consumers when production falls or prices rise.',
  sol: 'Grains procured in good years are stored and released through the public distribution system in shortages, protecting consumers.',
}));
Q('fb_spread', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'The difference between the price paid by the consumer and the price received by the farmer is called the price ___.',
  acc: [['spread']],
  sol: 'It is the price spread; it goes to transporters, traders and other intermediaries.',
}));
Q('ord_marketing', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these stages in the marketing of a wheat crop in a sensible order.',
  items: ['Harvesting and assembling the grain', 'Grading and packing it in bags', 'Storing it in a warehouse', 'Transporting it to buyers and selling it'],
  sol: 'Grain is first assembled, then graded and packed, stored until sale, and finally moved to buyers and sold.',
}));
Q('n_spread', num({
  t: 1, d: 2, c: 'application', marks: 1, value: TOM_SHARE, unit: '%',
  stem: `In an imagined town, consumers pay ₹${TOM.consumer} a kg for tomatoes, but the grower receives only ₹${TOM.farmer} a kg. What percentage of the consumer's price reaches the grower?`,
  sol: `Step 1: Farmer's share = farmer's price ÷ consumer's price × 100.\nStep 2: ${TOM.farmer} ÷ ${TOM.consumer} × 100 = ${TOM_SHARE} per cent.`,
}));
Q('n_storage', num({
  t: 1, d: 3, c: 'application', marks: 2, value: STORE_GAIN, unit: '₹',
  stem: `An imagined farmer has ${STORE.q} quintals of wheat. At harvest the price is ₹${inr(STORE.harvest)} a quintal; three months later it is ₹${inr(STORE.later)}. Storing in a warehouse costs ₹${STORE.cost} a quintal for that period. How much more (in ₹) does she earn by storing and selling later?`,
  sol: `Step 1: Extra price per quintal = ${inr(STORE.later)} − ${inr(STORE.harvest)} = ₹400.\nStep 2: Net gain per quintal = 400 − ${STORE.cost} = ₹300.\nStep 3: Total = ${STORE.q} × 300 = ₹${inr(STORE_GAIN)}.`,
  scheme: [['Net gain per quintal ₹300', 1], [`Total ₹${inr(STORE_GAIN)}`, 1]],
}));
Q('n_scale', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: SCALE_LOSS, unit: '₹',
  stem: `A trader's faulty scale shows ${SCALE.shown} kg when ${SCALE.true} kg of chillies is weighed. At ₹${SCALE.price} a kg, how much (in ₹) does the farmer lose on this one sale?`,
  sol: `Step 1: Weight lost = ${SCALE.true} − ${SCALE.shown} = 5 kg.\nStep 2: Loss = 5 × ${SCALE.price} = ₹${SCALE_LOSS}.`,
}));
Q('s_marketing_problems', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two problems faced by farmers in selling their produce.',
  model: '1. **Malpractices** by traders: faulty weights and manipulated accounts reduce what the farmer is paid.\n2. **No storage and little price information**: farmers sell at harvest at low prices, often to the trader who lent them money.',
  sol: 'Any two genuine marketing problems, each briefly explained.',
  scheme: [['First problem', 1], ['Second problem', 1]],
}));
Q('s_infra_marketing', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'How can better roads and cold storage improve a vegetable grower\'s income?',
  model: '1. **Roads** let her reach **larger markets** quickly and cheaply, so she is not tied to one local buyer.\n2. **Cold storage** keeps vegetables fresh, so she can **sell when prices are better** instead of making a distress sale.',
  sol: 'Link each facility to a better price or wider market.',
  scheme: [['Roads and wider markets', 1], ['Storage and timing of sale', 1]],
}));
Q('s3_marketing_measures', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain any three measures taken to improve agricultural marketing in India.',
  model: '1. **Regulated markets**: orderly, transparent auctions and correct weights so farmers get fair prices.\n2. **Physical infrastructure**: roads, warehouses, cold storages and processing units that reduce wastage and distress sales.\n3. **Policy support**: **minimum support prices**, **buffer stocks** and the **public distribution system** protect both farmers and consumers.',
  sol: 'Three measures, each with how it helps the farmer.',
  scheme: [['Regulation of markets', 1], ['Infrastructure', 1], ['MSP, buffer stocks or PDS', 1]],
}));
Q('s3_alt_channels', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'What are alternative marketing channels? Explain how they help farmers, with two examples of such channels.',
  model: 'Alternative channels let farmers **sell directly** to consumers or large buyers, bypassing layers of middlemen. Examples: **farmers\' markets** run in several states where growers sell straight to city households, and **contracts with food-processing firms or retail chains** that agree a price in advance. They **narrow the price spread**, raise farmers\' share and reduce price uncertainty.',
  sol: 'Meaning, two kinds of channel, and the benefit to farmers.',
  scheme: [['Meaning', 1], ['Two examples', 1], ['How they help farmers', 1]],
}));
Q('l_marketing', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Why do Indian farmers often fail to get a fair price for their produce? Explain the measures taken by the government to improve agricultural marketing.',
  model: '**Problems:**\n1. **Malpractices**: faulty weights, hidden deductions and manipulated accounts.\n2. **No storage or price information**, so farmers sell at harvest or to the lender who financed them.\n\n**Measures:**\n3. **Regulated markets** that make trading transparent.\n4. **Infrastructure**: roads, warehouses, cold storages and processing that cut wastage.\n5. **Cooperative marketing** and policy tools: **MSP**, **buffer stocks** held by the Food Corporation of India and the **public distribution system**, plus direct farmers\' markets. These raise the farmer\'s share, though private trade still dominates in many areas.',
  sol: 'Two problems, then three measures with their effect.',
  scheme: [['First problem', 1], ['Second problem', 1], ['Regulated markets', 1], ['Infrastructure', 1], ['Cooperatives and policy tools', 1]],
}));

// ================================================================ t01 cooperatives and dairying
Q('m_anand', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The cooperative model of dairying that inspired Operation Flood began in',
  opts: ['Anand, Gujarat', 'Ludhiana, Punjab', 'Kochi, Kerala', 'Guwahati, Assam'],
  sol: 'The Anand pattern of milk cooperatives in Gujarat became the model that Operation Flood spread to other states.',
}));
Q('m_op_flood', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under **Operation Flood**, milk producers',
  opts: [
    'pool their milk in village cooperatives, which process and market it and pay them fair prices',
    'sell all their milk to foreign companies',
    'are paid by the government whether or not they supply milk',
    'must give up crop farming completely',
  ],
  sol: 'Farmers form village cooperatives; milk is collected, graded, processed and sold in cities through a cooperative network, and producers are paid by quantity and quality. The other options misdescribe the programme.',
}));
Q('tf_coop_middlemen', tf({
  t: 1, d: 2, c: 'application', ans: true,
  stem: 'True or false? A dairy cooperative that collects, processes and sells its members\' milk reduces the role of middlemen.',
  sol: 'The cooperative itself does the work that private traders did, so producers keep a larger share of the final price.',
}));
Q('n_milk', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: MILK_PAY, unit: '₹',
  stem: `A member of an imagined village dairy cooperative pours ${MILK.litres} litres of milk a day at ₹${MILK.price} a litre. How much (in ₹) is she paid for ${MILK.days} days?`,
  sol: `Step 1: Payment = litres a day × price × days.\nStep 2: ${MILK.litres} × ${MILK.price} × ${MILK.days} = ₹${inr(MILK_PAY)}.`,
}));
Q('s3_coop_dairy', short({
  t: 1, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Explain three ways in which dairy cooperatives have helped rural households.',
  model: '1. **Fair, regular income**: members are paid by quantity and quality, often weekly, which steadies household income.\n2. **No middlemen**: the cooperative processes and sells milk, so the producer keeps more of the price.\n3. **Support and empowerment**: veterinary care, feed and training are provided, and **women**, who do much of the dairy work, gain income of their own.',
  sol: 'Income, removal of intermediaries, and services or empowerment.',
  scheme: [['Regular, fair income', 1], ['Fewer middlemen', 1], ['Support services or women\'s income', 1]],
}));

// ================================================================ t02 diversification
Q('m_div_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Agricultural diversification has two aspects:',
  opts: [
    'a change in the cropping pattern, and a shift of workers from crop farming to allied and non-farm activities',
    'more fertiliser use and more pesticide use',
    'selling crops abroad and importing food',
    'buying more land and hiring more labourers',
  ],
  sol: 'Diversification means growing a wider range of crops, and moving part of the workforce into livestock, fisheries, horticulture and non-farm work. The other pairs are not what the term means.',
}));
Q('m_div_need', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: 'Why is diversification especially important for rain-fed farming regions?',
  opts: [
    'Depending on one crop and the rains is risky, and other activities give work and income when the crop fails or in the off-season',
    'Rain-fed regions have too much irrigation already',
    'Diversification stops all rainfall variation',
    'It removes the need for any credit',
  ],
  sol: 'Farm income in rain-fed areas is uncertain and seasonal; other activities spread the risk and provide work through the year. Diversification does not change rainfall or end the need for credit.',
}));
Q('m_livestock', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A farming family in an imagined village of Rajasthan keeps goats and a few cows along with its millet crop. The main advantage is that',
  opts: [
    'livestock gives income and food even when the crop fails, so the family\'s risk is lower',
    'animals guarantee the millet crop a higher yield every year',
    'the family no longer needs any water',
    'the government buys all their goats at the MSP',
  ],
  sol: 'Mixed farming spreads risk: milk and the sale of animals continue in a drought year. Livestock does not guarantee yields, remove water needs or come under MSP.',
}));
Q('m_horti', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Horticulture includes the growing of',
  opts: ['fruits, vegetables, flowers, medicinal and aromatic plants, and spices', 'only wheat and rice', 'only cotton and jute', 'only timber trees in forests'],
  sol: 'Horticulture covers fruits, vegetables, flowers, spices, plantation crops, and medicinal and aromatic plants. Cereals, fibres and forest timber are other activities.',
}));
Q('m_women_fish', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined coastal village of Odisha, the men go out to sea while many women dry, process and sell the fish. This shows that fisheries',
  opts: [
    'create non-crop work for whole families, including women',
    'are part of the secondary sector only',
    'need no credit or marketing',
    'are possible only in rivers',
  ],
  sol: 'Fishing, processing and selling provide work for both men and women outside crop farming. Fisheries need credit and marketing, and include marine as well as inland waters.',
}));
Q('m_it', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which is the best example of information technology helping rural development?',
  opts: [
    'A mobile service that tells farmers the weather forecast and crop prices in nearby markets',
    'A farmer ploughing his field with bullocks',
    'A moneylender writing loans in a paper register',
    'A trader using a faulty weighing scale',
  ],
  sol: 'Timely weather and price information helps farmers plan and sell better, and such services also create rural jobs. The other examples involve no IT.',
}));
Q('ar_nonfarm', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Non-farm activities are an important source of rural employment.',
  r: 'Crop farming in many areas provides work for only part of the year, leaving workers idle in the off-season.',
  sol: 'Both are true, and R explains A: because farming is seasonal, non-farm work such as processing, crafts and services fills the gap.',
}));
Q('tf_div_cereal', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Agricultural diversification means growing only cereals over a wider area.',
  sol: 'Diversification means moving to a wider range of crops and activities, such as fruits, vegetables, livestock and fisheries, not concentrating on cereals.',
}));
Q('mt_allied', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each imagined rural enterprise with the activity it represents.',
  pairs: [
    ['A poultry unit of 500 birds in Namakkal district', 'Animal husbandry'],
    ['A pond raising rohu and catla in West Bengal', 'Inland fisheries'],
    ['A marigold and rose farm near Bengaluru', 'Horticulture (floriculture)'],
    ['A village unit making pickles and papad', 'Agro-processing (non-farm work)'],
  ],
  sol: 'Poultry is animal husbandry; pond fish are inland fisheries; flowers are floriculture within horticulture; pickles and papad are food processing, a non-farm activity.',
}));
Q('n_divshare', num({
  t: 2, d: 2, c: 'application', marks: 1, value: HH_NONCROP, unit: '%',
  stem: `An imagined farm household earns ₹${inr(HH.crops)} a year from crops, ₹${inr(HH.dairy)} from dairy and ₹${inr(HH.poultry)} from poultry. What percentage of its income comes from activities other than crops?`,
  sol: `Step 1: Total income = ${inr(HH.crops)} + ${inr(HH.dairy)} + ${inr(HH.poultry)} = ₹${inr(HH_TOTAL)}.\nStep 2: Non-crop share = (${inr(HH.dairy)} + ${inr(HH.poultry)}) ÷ ${inr(HH_TOTAL)} × 100 = ${HH_NONCROP} per cent.`,
}));
Q('s_div_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are the two aspects of agricultural diversification?',
  model: '1. **Change in cropping pattern**: moving from mainly food grains to a wider range of crops such as fruits, vegetables, oilseeds and flowers.\n2. **Shift of workers** from crop farming to **allied activities** (livestock, fisheries, poultry) and **non-farm work** (processing, crafts, services).',
  sol: 'Name and explain both aspects.',
  scheme: [['Cropping pattern', 1], ['Shift of workforce to allied and non-farm work', 1]],
}));
Q('s_animal', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Explain two ways in which animal husbandry helps small and landless rural families.',
  model: '1. It gives a **steady income** from milk, eggs or meat through the year, even when crops fail.\n2. It needs **little land**, so landless and women-headed families can keep a few animals, and dung gives **manure and fuel**.',
  sol: 'Income stability and suitability for families with little or no land.',
  scheme: [['Stable income and lower risk', 1], ['Little land needed, other uses', 1]],
}));
Q('s3_horti', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'How can horticulture raise incomes and employment in rural areas? Give three points.',
  model: '1. **Higher value**: fruits, vegetables and flowers often earn more per acre than cereals.\n2. **More work**: picking, grading, packing and transport employ many people, including **women**.\n3. **Links to processing and export**: juice, pickle and spice units and exports create further jobs and income.',
  sol: 'Three linked benefits: value per acre, labour use, and processing or trade.',
  scheme: [['Higher value per acre', 1], ['Labour-intensive work', 1], ['Processing or export links', 1]],
}));
Q('l_diversification', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Why is diversification into productive non-farm activities necessary for rural India? Explain with reference to any three such activities.',
  model: '1. **Need**: crop farming is **seasonal and risky**, especially where it depends on rain; it cannot employ the growing rural workforce all year.\n2. **Spreading risk**: other sources of income protect families when a crop fails.\n3. **Animal husbandry**: cattle, goats and poultry give **regular income** and suit families with little land.\n4. **Fisheries**: inland and marine fishing, processing and selling provide work for men and **women**.\n5. **Horticulture and agro-processing**: fruits, flowers and processing units earn more per acre and create jobs; **IT** services add information and new work. Diversification therefore gives **productive employment** and steadier incomes.',
  sol: 'Why diversification is needed, then three activities with how each helps.',
  scheme: [['Seasonality and risk of crop farming', 1], ['Spreading risk / employment need', 1], ['First activity', 1], ['Second activity', 1], ['Third activity', 1]],
}));
Q('l_it', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the role of information technology in rural development.',
  model: '1. **Information for farming**: weather forecasts, crop advice and soil information help farmers plan better.\n2. **Prices and markets**: knowing prices in nearby markets lets farmers choose where and when to sell.\n3. **Services**: online access to government schemes, land records and banking saves time and reduces middlemen.\n4. **Jobs**: village service centres and data work create employment for educated rural youth.\n5. **Limits**: weak connectivity, low digital literacy and cost keep many poor households out. IT is a powerful tool when supported by **skills and connectivity**.',
  sol: 'Four uses with benefits and one set of limitations, with a judgement.',
  scheme: [['Farm information', 1], ['Price and market information', 1], ['Access to services', 1], ['Employment', 1], ['Limitations and judgement', 1]],
}));

// ================================================================ t02 organic farming
Q('m_org_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Organic farming is a system of cultivation that',
  opts: [
    'relies on organic manure, compost and natural pest control instead of chemical fertilisers and pesticides',
    'uses the largest possible amount of chemical fertilisers',
    'grows crops only inside factories',
    'depends only on imported hybrid seeds',
  ],
  sol: 'Organic farming restores and maintains ecological balance by using natural inputs and avoiding synthetic chemicals. The other options describe intensive chemical farming or unrelated practices.',
}));
Q('m_org_benefit', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which is a benefit of organic farming for **small farmers**?',
  opts: [
    'Inputs such as compost can be made on the farm, so costs are lower',
    'Yields always double in the first year',
    'Organic produce never spoils',
    'No labour is needed',
  ],
  sol: 'On-farm inputs replace costly purchased chemicals. Yields often fall at first, organic produce can have a shorter shelf life, and organic methods usually need more labour.',
}));
Q('m_org_limit', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which is a genuine **limitation** of organic farming?',
  opts: [
    'Yields may fall in the early years, and organic produce may have a shorter shelf life',
    'It always harms soil fertility',
    'It uses more chemical pesticides than modern farming',
    'There is no demand for organic food anywhere',
  ],
  sol: 'Lower early yields and perishability are real problems. Organic farming improves soil health, avoids chemical pesticides and has growing demand.',
}));
Q('ar_org_jobs', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Organic farming can create more employment in rural areas.',
  r: 'Organic methods such as composting and manual weeding need more labour than chemical farming.',
  sol: 'Both are true, and R explains A: more labour-intensive methods mean more work per acre.',
}));
Q('tf_org_yield', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: 'True or false? A farmer who switches to organic farming can expect higher yields than before from the very first season.',
  sol: 'Yields often dip in the first few years while the soil recovers and natural pest control builds up.',
}));
Q('n_organic', num({
  t: 2, d: 3, c: 'application', marks: 2, value: ORG_NET - CONV_NET, unit: '₹',
  stem: `On one acre of an imagined farm, chemical farming gives ${ORG.convQ} quintals sold at ₹${inr(ORG.convP)} a quintal, with input costs of ₹${inr(ORG.convCost)}. Organic farming gives ${ORG.orgQ} quintals sold at ₹${inr(ORG.orgP)} a quintal, with input costs of ₹${inr(ORG.orgCost)}. By how much (in ₹) is the organic net income higher?`,
  sol: `Step 1: Chemical: ${ORG.convQ} × ${inr(ORG.convP)} − ${inr(ORG.convCost)} = ₹${inr(CONV_NET)}.\nStep 2: Organic: ${ORG.orgQ} × ${inr(ORG.orgP)} − ${inr(ORG.orgCost)} = ₹${inr(ORG_NET)}.\nStep 3: Difference = ${inr(ORG_NET)} − ${inr(CONV_NET)} = ₹${inr(ORG_NET - CONV_NET)}.`,
  scheme: [['Both net incomes correct', 1], [`Difference ₹${inr(ORG_NET - CONV_NET)}`, 1]],
}));
Q('s_org_benefits', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two benefits of organic farming.',
  model: '1. It **protects the environment**: soil, water and helpful insects are not damaged by chemicals, so farming is **sustainable**.\n2. It gives **healthier food** and can earn **higher prices** in domestic and export markets.',
  sol: 'Any two: sustainability, health, lower input costs, export demand, more employment.',
  scheme: [['First benefit', 1], ['Second benefit', 1]],
}));
Q('s3_org_problems', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three problems that limit the spread of organic farming in India.',
  model: '1. **Lower early yields**: output may fall for a few years, which small farmers cannot afford.\n2. **Marketing and certification**: farmers need awareness, certification and buyers willing to pay a premium.\n3. **Short shelf life** and limited choice of off-season produce, with too little storage and transport for perishable organic food.',
  sol: 'Three distinct barriers: yield, market access or certification, and perishability.',
  scheme: [['Yield problem', 1], ['Marketing or certification', 1], ['Shelf life or infrastructure', 1]],
}));
Q('l_organic', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Organic farming is often called the answer to the problems of chemical farming. Evaluate this view.',
  model: '1. **Meaning**: farming with **compost, manure and natural pest control**, avoiding synthetic chemicals.\n2. **Environment**: it restores **soil health** and avoids polluting water, so it is **sustainable**.\n3. **Economics**: on-farm inputs cut costs, and **premium prices** and export demand can raise income; it is **labour-intensive**, creating rural work.\n4. **Health**: food free of chemical residues.\n5. **Limits**: **lower early yields**, **shorter shelf life**, the need for certification and marketing, and the question of feeding a large population. So it is a valuable path, especially for some crops and regions, but it needs **support in transition** and markets rather than being a complete answer by itself.',
  sol: 'Meaning, benefits on three fronts, limitations, then a balanced judgement.',
  scheme: [['Meaning', 1], ['Environmental benefit', 1], ['Economic benefits', 1], ['Limitations', 1], ['Balanced judgement', 1]],
}));

// ================================================================ case-based
Q('cb_credit', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined village and figures, written by SOYL for practice.)*',
  passage: `**Loans taken by households of Kalyanpur village (imagined), by source, last year (₹ lakh)**\n\n| Source | Amount (₹ lakh) |\n|---|---|\n| Moneylenders and traders | ${KAL.ml} |\n| Commercial bank and RRB branch | ${KAL.bank} |\n| Cooperative credit society | ${KAL.coop} |\n| Self-help groups | ${KAL.shg} |\n| **Total** | **${KAL_TOTAL}** |\n\nA survey note adds that most of the moneylenders' loans went to landless labourers and families with less than one acre, at interest of 3 to 5 per cent a month.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'understanding', marks: 1, value: KAL_INST, unit: '%', stem: 'What percentage of the village\'s total borrowing came from banks and the cooperative society together?', sol: `Step 1: Banks + cooperative = ${KAL.bank} + ${KAL.coop} = ${KAL_INST} lakh.\nStep 2: Share = ${KAL_INST} ÷ ${KAL_TOTAL} × 100 = ${KAL_INST} per cent.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which group of households depends most on moneylenders, according to the note?', model: '**Landless labourers and families with less than one acre** (small and marginal households).', sol: 'Read the survey note under the table.', scheme: [['Landless and marginal households', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why might these households still borrow from moneylenders at such high interest? Give two reasons.', model: '(1) They have **no land or assets to pledge**, so banks are reluctant to lend to them. (2) Moneylenders lend **quickly**, without paperwork, and also for **family needs** such as illness, which banks do not cover.', sol: 'Two reasons rooted in access barriers and convenience.', scheme: [['First reason', 1], ['Second reason', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two steps that could reduce these households\' dependence on moneylenders.', model: '(1) Form or strengthen **SHGs** so that they can save and get **bank loans without collateral**. (2) Ask banks and RRBs to offer **small, quick loans** close to the village, for example through a local banking agent.', sol: 'Two workable steps that widen access to institutional credit.', scheme: [['First workable step', 1], ['Second workable step', 1]] }),
    ]),
  ],
}));
Q('cb_market', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined town, people and prices, written by SOYL for practice.)*',
  passage: `**A weekly farmers' market opens in Hiware (imagined), Maharashtra**\n\nUntil last year, Sunanda sold her brinjals to a commission agent at the town mandi for ₹${MKT.mandi} a kg; by the time they reached a city household they cost ₹${MKT.consumerOld}. Some weeks the agent's scale "lost" a few kilos, and payment came a fortnight late. This year the municipality gave growers stalls in a weekly farmers' market. Sunanda now sells directly to households at ₹${MKT.direct} a kg, and her customers say they pay ₹${MKT.consumerNew} instead of ₹${MKT.consumerOld}. She worries, though, about what to do with brinjals left unsold at the end of the day.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: MKT_GAIN, unit: '₹', stem: 'By how much (in ₹ per kg) has Sunanda\'s price risen?', sol: `Step 1: New price − old price.\nStep 2: ${MKT.direct} − ${MKT.mandi} = ₹${MKT_GAIN} a kg.` })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Name two malpractices she faced at the mandi.', model: '**Faulty weighing** (the scale "lost" kilos) and **delayed payment**.', sol: 'Both are stated in the passage.', scheme: [['Both malpractices', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the farmers\' market benefits both Sunanda and her customers.', model: `Cutting out the agent **narrows the price spread**: Sunanda earns **₹${MKT_GAIN} more** a kg, while customers pay **₹${MKT_SAVE} less** a kg, because the middleman's margin is shared between them.`, sol: 'Use the figures to show both gains come from removing the intermediary.', scheme: [['Gain to the farmer', 1], ['Gain to consumers via a smaller spread', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two ways to solve Sunanda\'s problem of unsold produce.', model: '(1) A shared **cold storage** at the market so that produce keeps for the next day. (2) A **cooperative** of growers that sells leftovers to hotels or a **processing unit** making pickles.', sol: 'Two practical storage or marketing solutions.', scheme: [['First solution', 1], ['Second solution', 1]] }),
    ]),
  ],
}));
Q('cb_organic', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined village and people, written by SOYL for practice.)*',
  passage: '**From the diary of Tsering, a farmer in an imagined hill village**\n\nThree years ago our farmers\' group decided to stop chemical fertilisers. The first two harvests of ginger were smaller and some neighbours laughed. We made compost pits, kept more cows for manure and sprayed a neem mix on pests; my wife and two village youths now have work all season. This year the soil feels softer, the yield is almost back, and a company from the plains buys our certified ginger at a better price. My son keeps chickens and a fish pond too, so a bad season in one no longer frightens us.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Which type of farming has the group adopted?', model: '**Organic farming.**', sol: 'They replaced chemical fertilisers and pesticides with compost, manure and a neem spray.', scheme: [['Organic farming', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote one limitation of this type of farming that the diary mentions.', model: 'The **first two harvests were smaller** (lower yields in the early years).', sol: 'The early fall in yield is stated directly.', scheme: [['Lower early yields', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Give two benefits of the change, using evidence from the diary.', model: '(1) **More employment**: composting and manual pest control give work to his wife and two youths all season. (2) **Better income and soil**: certified ginger sells at a **higher price**, and the soil has improved.', sol: 'Two benefits, each tied to a line in the diary.', scheme: [['First benefit with evidence', 1], ['Second benefit with evidence', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the son\'s chickens and fish pond show diversification, and why does it help?', model: 'Poultry and fisheries are **allied activities** beyond crops, so the family has **several sources of income**; if one fails, the others continue, which **lowers risk**.', sol: 'Identify the allied activities and explain risk-spreading.', scheme: [['Allied activities identified', 1], ['Risk spreading explained', 1]] }),
    ]),
  ],
}));
