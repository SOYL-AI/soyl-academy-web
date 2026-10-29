// Build CBSE 12 Economics ch10 Rural Development. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch10/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch10', 'economics-commerce');
const { inr } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (computed, never typed)
const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;
// Worked example 1: moneylender vs bank on an imagined loan.
const WE1 = { p: 30000, ml: 4, months: 4, bank: 8 };
const WE1_ML = (WE1.p * WE1.ml * WE1.months) / 100; // 4,800
const WE1_BANK = (WE1.p * WE1.bank * WE1.months) / 1200; // 800
const WE1_SAVE = WE1_ML - WE1_BANK; // 4,000
// Worked example 2: price spread on onions (₹ a kg).
const WE2 = { consumer: 35, farmer: 14, transport: 4, wholesaler: 7 };
const WE2_SPREAD = WE2.consumer - WE2.farmer; // 21
const WE2_RETAIL = WE2_SPREAD - WE2.transport - WE2.wholesaler; // 10
const WE2_SHARE = pct(WE2.farmer, WE2.consumer); // 40
// Worked example 3: diversified household income (₹ a year).
const WE3 = { crops: 54000, goats: 18000, fish: 18000 };
const WE3_TOTAL = WE3.crops + WE3.goats + WE3.fish; // 90,000
const WE3_SHARE = pct(WE3.goats + WE3.fish, WE3_TOTAL); // 40
// Worked example 4: organic vs chemical on one acre.
const WE4 = { cq: 30, cp: 2200, cc: 10000, oq: 27, op: 2600, oc: 4000 };
const WE4_C = WE4.cq * WE4.cp - WE4.cc; // 56,000
const WE4_O = WE4.oq * WE4.op - WE4.oc; // 66,200
if (WE1_ML !== 4800 || WE1_BANK !== 800 || WE1_SAVE !== 4000 || WE2_SPREAD !== 21 || WE2_RETAIL !== 10 || WE2_SHARE !== 40 || WE3_TOTAL !== 90000 || WE3_SHARE !== 40 || WE4_C !== 56000 || WE4_O !== 66200)
  throw new Error('ch10 deck figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What rural development means', 'Why farmers borrow', 'Who lends', 'Self-help groups', 'Selling the crop', 'Better marketing'], 'Route map of Part 1: what rural development means, why farmers borrow, who lends, self-help groups, selling the crop and better marketing', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Dairy cooperatives', 'Diversification', 'Allied activities', 'Non-farm work and IT', 'Organic farming'], 'Route map of Part 2: dairy cooperatives, diversification, allied activities, non-farm work and IT, and organic farming', 'Part 2 at a glance');
const vAreas = table(
  ['Area needing attention', 'Why it matters'],
  [
    ['Human capital: literacy, skills, health', 'Healthy, skilled people earn more'],
    ['Land reforms', 'Secure land gives a reason to invest'],
    ['Credit and marketing', 'Fair loans and fair prices raise farm income'],
    ['Productive activities and research', 'New crops, methods and non-farm jobs'],
  ],
  'Table of areas needing attention for rural development: human capital, land reforms, credit and marketing, and productive activities and research, with why each matters',
);
const vGestation = flow('LR', ['Sowing: pay for seeds, fertiliser, labour', 'Months of growth: family still needs money', 'Harvest and sale', 'Repay the loan'], 'Flow of the farm season: money is spent at sowing and during months of growth, income comes only at harvest and sale, and then the loan is repaid', 'Why farmers borrow: the gap between spending and earning');
const vSources = flow('TB', ['Sources of rural credit', 'Non-institutional: moneylenders, traders, landlords', 'Institutional: commercial banks, RRBs, cooperatives, SHGs', 'NABARD: apex body that coordinates and refinances'], 'Tree of rural credit sources: non-institutional sources are moneylenders, traders and landlords; institutional sources are commercial banks, Regional Rural Banks, cooperatives and self-help groups, coordinated by NABARD', 'Two families of lenders', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n3', to: 'n4' },
]);
const vTimeline = table(
  ['Year', 'Step in rural banking'],
  [
    ['1969', 'Major commercial banks nationalised; rural branches expand'],
    ['1975', 'Regional Rural Banks set up'],
    ['1982', 'NABARD set up as the apex body for rural financing'],
    ['From the 1990s', 'Self-help groups linked to banks spread microcredit'],
  ],
  'Timeline table of rural banking: 1969 nationalisation of major banks, 1975 Regional Rural Banks, 1982 NABARD, and from the 1990s self-help groups linked to banks',
  'Multi-agency approach: many kinds of institutions, one goal.',
);
const vInterest = (() => {
  const s = new Svg(560, 290);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 6000, left: 80, top: 30, width: 420, height: 200, xLabel: 'Lender', yLabel: 'Interest for 4 months (₹)' });
  [[1, WE1_ML, 'Moneylender', 'accent'], [2, WE1_BANK, 'Bank', 'fill']].forEach(([x, v, name, fill]) => {
    const x0 = ch.X(x - 0.3), x1 = ch.X(x + 0.3);
    s.rect(x0, ch.Y(v), x1 - x0, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.5, rx: 2 });
    ch.label([x, v], `₹${inr(v)}`, { dy: -12, size: 13, bold: true });
    ch.xTick(x, name);
  });
  ch.yTick(2000, '2,000').yTick(4000, '4,000');
  return s.visual(`Bar chart comparing interest on an imagined loan of ${inr(WE1.p)} rupees for 4 months: ${inr(WE1_ML)} rupees from a moneylender at 4 per cent a month against ${inr(WE1_BANK)} rupees from a bank at 8 per cent a year`, `Imagined rates. Saving by borrowing from the bank: ₹${inr(WE1_SAVE)}.`);
})();
const vWE1 = table(
  ['Step', 'Moneylender (4 per cent a month)', 'Bank (8 per cent a year)'],
  [
    ['Principal and time', `₹${inr(WE1.p)}, 4 months`, `₹${inr(WE1.p)}, 4 months`],
    ['Interest', `${inr(WE1.p)} × 4/100 × 4 = ₹${inr(WE1_ML)}`, `${inr(WE1.p)} × 8/100 × 4/12 = ₹${inr(WE1_BANK)}`],
    ['Difference', `₹${inr(WE1_SAVE)} more`, '—'],
  ],
  `Table working out interest on an imagined loan of ${inr(WE1.p)} rupees for 4 months: ${inr(WE1_ML)} rupees from the moneylender, ${inr(WE1_BANK)} rupees from the bank, a difference of ${inr(WE1_SAVE)} rupees`,
  'Watch the unit of the rate: a month or a year.',
);
const vShg = flow('LR', ['10–20 members, mostly women', 'Save a small sum every month', 'Lend to members at fair interest', 'Repayment record builds trust', 'Bank loan to the group without collateral'], 'Flow of how a self-help group works: members save regularly, lend to each other at fair interest, build a repayment record and then get a bank loan as a group without collateral', 'How an SHG works');
const vCreditProblems = table(
  ['Problem', 'Effect'],
  [
    ['Small and marginal farmers poorly reached', 'They stay with moneylenders'],
    ['Loan defaults', 'Banks lose the ability to lend again'],
    ['Preference for larger borrowers', 'Credit goes where risk seems low'],
    ['Weak link with rural savings', 'Less money to lend locally'],
  ],
  'Table of problems of institutional rural credit and their effects: small farmers poorly reached, defaults, preference for larger borrowers, weak link with rural savings',
);
const vMarketChain = flow('LR', ['Assemble', 'Grade and pack', 'Store', 'Transport', 'Sell'], 'Flow of the stages of agricultural marketing: assemble, grade and pack, store, transport and sell', 'Marketing is everything between the field and the buyer');
const vMarketProblems = table(
  ['Problem at the market', 'How the farmer loses'],
  [
    ['Faulty weights, manipulated accounts', 'Paid for less than he sold'],
    ['No price information', 'Accepts whatever price is offered'],
    ['No storage', 'Distress sale at harvest'],
    ['Loan tied to the crop', 'Must sell to the lender-trader'],
  ],
  'Table of problems farmers face when selling: faulty weights, no price information, no storage, and loans tied to the crop, with how each causes a loss',
);
const vSpread = (() => {
  const s = new Svg(560, 170);
  const left = 40, width = 480, y = 60, h = 44, k = width / WE2.consumer;
  const parts = [['Farmer', WE2.farmer, 'accent'], ['Transport', WE2.transport, 'muted'], ['Wholesaler', WE2.wholesaler, 'fill'], ['Retailer', WE2_RETAIL, 'muted']];
  let x = left;
  for (const [name, v, fill] of parts) {
    s.rect(x, y, v * k, h, { fill, color: 'accent', sw: 1.2, rx: 0 });
    s.text(x + (v * k) / 2, y - 14, name, { size: 12 });
    s.text(x + (v * k) / 2, y + h + 16, `₹${v}`, { size: 13, bold: true });
    x += v * k;
  }
  s.text(left + width / 2, 150, `Consumer pays ₹${WE2.consumer} a kg; farmer gets ₹${WE2.farmer} (${WE2_SHARE} per cent)`, { size: 13 });
  return s.visual(`Stacked bar of an imagined onion price of ${WE2.consumer} rupees a kg split among farmer ${WE2.farmer}, transport ${WE2.transport}, wholesaler ${WE2.wholesaler} and retailer ${WE2_RETAIL} rupees`, `Imagined prices. Price spread = ₹${WE2_SPREAD} a kg.`);
})();
const vMeasures = table(
  ['Measure', 'What it does'],
  [
    ['Regulated markets', 'Open auctions, correct weights, prompt payment'],
    ['Infrastructure', 'Roads, warehouses, cold storage, processing'],
    ['Cooperative marketing', 'Farmers sell together and share the margin'],
    ['MSP, buffer stocks, PDS', 'Floor price for farmers; grain for consumers in shortages'],
    ['Direct channels', 'Farmers\' markets, contracts with processors and retailers'],
  ],
  'Table of measures to improve agricultural marketing: regulated markets, infrastructure, cooperative marketing, MSP with buffer stocks and the public distribution system, and direct channels',
);
const vMsp = flow('LR', ['MSP announced before sowing', 'Government agencies buy grain', 'Buffer stocks in warehouses', 'Released through ration shops'], 'Flow from the minimum support price announced before sowing, to government purchase, buffer stocks in warehouses, and release through ration shops', 'One chain protects farmers and consumers');
const vDairy = flow('LR', ['Member pours milk at village society', 'Tested and paid by quantity and fat', 'District union processes it', 'State federation sells the brand in cities'], 'Flow of a dairy cooperative on the Anand pattern: members pour milk at the village society, are paid by quantity and fat, the district union processes it and the state federation sells it in cities', 'The three-tier cooperative pattern');
const vCoopWhy = table(
  ['Gain to members', 'Why'],
  [
    ['Regular income', 'Paid often, by quantity and quality'],
    ['No middlemen', 'The cooperative itself processes and sells'],
    ['Services', 'Vet care, feed, training'],
    ['Women\'s income', 'Women do much of the dairy work'],
  ],
  'Table of gains from dairy cooperatives: regular income, no middlemen, services such as vet care and feed, and income for women',
);
const vDiv = flow('TB', ['Diversification', 'Change in cropping pattern: more fruits, vegetables, oilseeds, flowers', 'Shift of workers to allied and non-farm activities'], 'Diagram of the two aspects of diversification: a change in cropping pattern, and a shift of workers to allied and non-farm activities', 'Two aspects', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' },
]);
const vAllied = table(
  ['Activity', 'Examples', 'Why it helps'],
  [
    ['Animal husbandry', 'Cattle, buffaloes, goats, poultry', 'Steady income; needs little land'],
    ['Fisheries', 'Inland ponds and rivers; sea fishing', 'Work for men and women'],
    ['Horticulture', 'Fruits, vegetables, flowers, spices', 'More value per acre'],
    ['Non-farm work', 'Agro-processing, crafts, tourism, IT services', 'Jobs outside the crop season'],
  ],
  'Table of allied and non-farm activities: animal husbandry, fisheries, horticulture and non-farm work, with examples and why each helps',
);
const vDivIncome = (() => {
  const s = new Svg(560, 290);
  const ch = s.chart({ x0: 0, x1: 4, y0: 0, y1: 60000, left: 80, top: 30, width: 420, height: 200, xLabel: 'Source', yLabel: 'Income a year (₹)' });
  [[1, WE3.crops, 'Crops', 'fill'], [2, WE3.goats, 'Goats', 'accent'], [3, WE3.fish, 'Fish pond', 'accent']].forEach(([x, v, name, fill]) => {
    const x0 = ch.X(x - 0.3), x1 = ch.X(x + 0.3);
    s.rect(x0, ch.Y(v), x1 - x0, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.5, rx: 2 });
    ch.label([x, v], `₹${inr(v)}`, { dy: -12, size: 13, bold: true });
    ch.xTick(x, name);
  });
  ch.yTick(20000, '20,000').yTick(40000, '40,000');
  return s.visual(`Bar chart of an imagined household's yearly income: crops ${inr(WE3.crops)}, goats ${inr(WE3.goats)} and fish pond ${inr(WE3.fish)} rupees`, `Imagined household: ${WE3_SHARE} per cent of income from outside crops.`);
})();
const vIT = flow('LR', ['Weather and crop advice', 'Prices in nearby markets', 'Online services and records', 'Rural service jobs'], 'Flow of what information technology brings to villages: weather and crop advice, market prices, online services and records, and rural service jobs', 'What IT can bring to a village');
const vOrganic = table(
  ['Organic farming', 'Chemical-intensive farming'],
  [
    ['Compost, manure, green manure', 'Chemical fertilisers'],
    ['Neem and other natural pest control', 'Chemical pesticides'],
    ['Builds soil health over time', 'Soil can degrade with heavy use'],
    ['More labour per acre', 'Less labour per acre'],
  ],
  'Comparison table of organic farming, which uses compost, manure and natural pest control, builds soil and needs more labour, with chemical-intensive farming',
);
const vWE4 = table(
  ['One acre (imagined)', 'Chemical', 'Organic'],
  [
    ['Output (quintals)', String(WE4.cq), String(WE4.oq)],
    ['Price (₹ a quintal)', inr(WE4.cp), inr(WE4.op)],
    ['Revenue (₹)', inr(WE4.cq * WE4.cp), inr(WE4.oq * WE4.op)],
    ['Input costs (₹)', inr(WE4.cc), inr(WE4.oc)],
    ['**Net income (₹)**', `**${inr(WE4_C)}**`, `**${inr(WE4_O)}**`],
  ],
  `Table comparing one imagined acre: chemical farming gives ${WE4.cq} quintals at ${inr(WE4.cp)} rupees with costs of ${inr(WE4.cc)}, net ${inr(WE4_C)}; organic gives ${WE4.oq} quintals at ${inr(WE4.op)} rupees with costs of ${inr(WE4.oc)}, net ${inr(WE4_O)}`,
  'Imagined figures; a premium price is not guaranteed.',
);
const vOrgBalance = table(
  ['Benefits', 'Limitations'],
  [
    ['Sustainable: soil and water protected', 'Lower yields in the early years'],
    ['Cheaper on-farm inputs', 'Shorter shelf life of produce'],
    ['Healthier food; export demand', 'Certification and marketing needed'],
    ['More rural employment', 'Less choice of off-season produce'],
  ],
  'Table balancing the benefits of organic farming (sustainability, cheaper inputs, healthier food, more employment) against its limitations (lower early yields, shorter shelf life, certification and marketing needs, less off-season choice)',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Rural development', 'Action on the lagging areas and people of the village economy'],
    ['Need for credit', 'Long gap between spending and harvest; family needs'],
    ['Institutions', 'Banks after 1969, RRBs 1975, cooperatives, NABARD 1982, SHGs'],
    ['Marketing problems', 'Malpractices, no information, no storage, tied sales'],
    ['Measures', 'Regulated markets, infrastructure, cooperatives, MSP, buffer stocks, PDS, direct channels'],
  ],
  'Summary table of Part 1: rural development, the need for credit, credit institutions, marketing problems and measures',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Dairy cooperatives', 'Anand pattern; Operation Flood; fair, regular income'],
    ['Diversification', 'New crops and a shift of workers to allied and non-farm work'],
    ['Allied activities', 'Animal husbandry, fisheries, horticulture'],
    ['IT', 'Information, services and jobs'],
    ['Organic farming', 'Sustainable and labour-intensive; lower early yields'],
  ],
  'Summary table of Part 2: dairy cooperatives, diversification, allied activities, information technology and organic farming',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Rural Development — Part 1: Rural Credit and Agricultural Marketing',
  goals: [
    'Explain what rural development means and which areas need attention',
    'Explain why rural households need credit and compare its institutional and non-institutional sources',
    'Evaluate self-help groups and the problems of rural banking',
    'Explain the problems of agricultural marketing and the measures taken to improve it',
  ],
  slides: [
    sl('title', 'Rural Development', {
      b: 'Part 1 — **rural credit** and **agricultural marketing**: how farmers borrow and how they sell.',
      v: vRoute1,
      n: 'Most Indians still live in villages, and a large share of them depend on farming. Yet a farm family can work hard all season and still end up in debt. Why? Often because it borrowed at high interest or sold its crop at a poor price. In this part we study rural credit and agricultural marketing, two areas that decide how much of the harvest stays with the farmer.',
    }),
    sl('concept', 'What is rural development?', {
      b: 'Rural development is action to develop the **areas and people that lag behind** in the village economy.',
      v: vAreas,
      n: 'Rural development is not only about more crops. It means improving the lives of rural people by working on the areas that lag behind. These include literacy and health, land reforms, fair credit, better marketing, and new productive work. In this chapter the syllabus asks us to focus on credit, marketing, diversification and organic farming.',
    }),
    sl('diagram', 'Why do farmers need credit?', {
      b: 'Farming has a **long gestation period**: spending comes months before income.',
      v: vGestation,
      n: 'A farmer pays for seeds, fertiliser and labour at sowing, but is paid only after the harvest is sold, months later. In between, the family still needs food, medicine and money for weddings or emergencies. A farmer may also need a large sum for a pump or a pair of bullocks. So credit is a normal and necessary part of farm life.',
    }),
    sl('diagram', 'Who lends in rural India?', {
      b: 'Two families of lenders: **non-institutional** and **institutional**.',
      v: vSources,
      n: 'Rural credit comes from two kinds of sources. Non-institutional lenders are private: moneylenders, traders and landlords. They lend quickly but often at very high interest, and a trader who lends may also force the farmer to sell him the crop cheaply. Institutional sources are regulated: commercial banks, Regional Rural Banks, cooperatives and self-help groups, with NABARD at the top coordinating them.',
    }),
    sl('check', 'Quick check: sources of credit', {
      b: 'Which one is a **non-institutional** source of credit?',
      chk: 'm_noninst',
      n: 'Ask: is this lender regulated by law and part of the banking system, or is it a private person lending on his own terms?',
    }),
    sl('concept', 'The growth of rural banking', {
      b: 'A **multi-agency approach**: many institutions, one goal of cheaper credit for villages.',
      v: vTimeline,
      n: 'After major commercial banks were nationalised in nineteen sixty nine, they were asked to open branches in villages and lend to agriculture. Regional Rural Banks followed in nineteen seventy five, and NABARD was set up in nineteen eighty two as the apex body to coordinate and refinance rural lenders. Cooperative credit societies and, later, self-help groups completed the system.',
    }),
    sl('check', 'Quick check: the apex body', {
      b: 'Which body coordinates the institutions that finance rural areas?',
      chk: 'm_nabard',
      n: 'Think of the body set up in nineteen eighty two whose name contains both agriculture and rural development.',
    }),
    sl('example', 'Worked example 1: what a moneylender really costs', {
      b: `An imagined farmer borrows ₹${inr(WE1.p)} for 4 months. Compare a moneylender at **4 per cent a month** with a bank at **8 per cent a year**.`,
      bl: [
        'Step 1 — Check the unit of each rate: per month or per year.',
        'Step 2 — Simple interest = principal × rate ÷ 100 × time (in the same unit as the rate).',
        `Step 3 — Moneylender: ₹${inr(WE1_ML)}; bank: ₹${inr(WE1_BANK)}.`,
        `Step 4 — Conclude: the bank saves her ₹${inr(WE1_SAVE)}.`,
      ],
      v: vWE1,
      n: 'Let us compare. The moneylender charges four per cent a month, so for four months that is sixteen per cent of thirty thousand rupees, which is four thousand eight hundred rupees. The bank charges eight per cent a year; four months is one third of a year, so the interest is just eight hundred rupees. The same loan costs six times as much from the moneylender.',
    }),
    sl('diagram', 'The gap at a glance', {
      v: vInterest,
      n: 'Here is the same comparison as a picture. The moneylender\'s bar towers over the bank\'s. This is why the spread of institutional credit matters so much: every rupee saved on interest stays with the farm family. It also explains how a family that borrows repeatedly from moneylenders can fall into a debt trap.',
    }),
    sl('diagram', 'Self-help groups and microcredit', {
      b: 'Small groups, mostly of women, who **save together** and **borrow together**.',
      v: vShg,
      n: 'A self-help group is a small group, often of ten to twenty women, who save a small amount every month. The pooled fund is lent to members at fair interest. Once the group has a good repayment record, a bank can lend to it without asking for land or gold, because the group guarantees repayment. This is called microcredit.',
    }),
    sl('two-column', 'SHGs: strengths and limits', {
      cols: [
        '**Strengths**\n- Habit of thrift\n- Loans without collateral\n- Women gain income and confidence\n- Less dependence on moneylenders',
        '**Limits**\n- Loans are small\n- Often used for consumption\n- Need skills and markets to raise incomes\n- Some groups break up',
      ],
      v: flow('LR', ['Thrift', 'Credit', 'Enterprise', 'Income'], 'Flow from thrift to credit to enterprise to income, the path an SHG hopes to follow', 'The hoped-for path'),
      n: 'Self-help groups have brought credit to many women who had none. But a fair judgement must include the limits. The loans are small, and many are used for household needs rather than for starting an enterprise. To raise incomes for good, groups need training, skills and access to markets as well as credit.',
    }),
    sl('concept', 'Problems of institutional credit', {
      v: vCreditProblems,
      n: 'Rural banking has grown a great deal, but it has weaknesses. Many small and marginal farmers and landless workers are still not reached, so they borrow from moneylenders. Loan defaults weaken banks. Lenders have often preferred larger borrowers who seem safer. And banks have done less to collect rural savings that could be lent locally.',
    }),
    sl('diagram', 'Selling the crop: agricultural marketing', {
      b: 'Marketing = everything that happens to the produce **between the field and the buyer**.',
      v: vMarketChain,
      n: 'Growing a good crop is half the battle. The other half is selling it well. Agricultural marketing includes assembling the produce, grading and packing it, storing it, transporting it and finally selling it. At each step, the farmer can gain or lose.',
    }),
    sl('concept', 'Where farmers lose money', {
      v: vMarketProblems,
      n: 'Without regulation, farmers often lose at the market. Traders may use faulty weights and manipulate accounts. Farmers may not know the prices in other markets. Without storage, they must sell at harvest when prices are lowest; this is called a distress sale. And a farmer who borrowed from a trader may be forced to sell to him at a low price.',
    }),
    sl('check', 'Quick check: distress sale', {
      b: 'An onion grower sells his whole crop on harvest day because he has nowhere to keep it. What is this?',
      chk: 'm_distress',
      n: 'Look for the reason he had no choice about when to sell.',
    }),
    sl('example', 'Worked example 2: the price spread', {
      b: `Consumers in an imagined city pay ₹${WE2.consumer} a kg for onions; the farmer gets ₹${WE2.farmer}.`,
      bl: [
        `Step 1 — Price spread = ${WE2.consumer} − ${WE2.farmer} = ₹${WE2_SPREAD} a kg.`,
        `Step 2 — Farmer's share = ${WE2.farmer} ÷ ${WE2.consumer} × 100 = ${WE2_SHARE} per cent.`,
        `Step 3 — Split the spread: transport ₹${WE2.transport}, wholesaler ₹${WE2.wholesaler}, retailer ₹${WE2_RETAIL}.`,
        'Step 4 — Interpret: fewer middlemen would leave more for both farmer and consumer.',
      ],
      v: vSpread,
      n: 'The price spread is the gap between what the consumer pays and what the farmer receives. Here it is twenty one rupees a kilo, and the farmer keeps only forty per cent of the final price. Part of the spread pays for real services like transport, but layers of middlemen take the rest. Marketing reforms try to shrink this gap.',
    }),
    sl('concept', 'Measures to improve marketing', {
      v: vMeasures,
      n: 'The government has tried several measures. Regulated markets bring open auctions and correct weights. Roads, warehouses and cold storages cut wastage and distress sales. Cooperatives let farmers sell together. Minimum support prices, buffer stocks and the public distribution system protect farmers and consumers. And direct channels, such as farmers\' markets, let growers sell straight to buyers.',
    }),
    sl('diagram', 'MSP, buffer stocks and ration shops', {
      v: vMsp,
      n: 'Here is how one chain works. The government announces a minimum support price for certain crops before sowing. Its agencies buy grain at that price, so farmers have a floor. The grain is kept as buffer stock in warehouses. When harvests fail or prices rise, it is released through ration shops, protecting consumers.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Rural development means working on the lagging areas of the village economy. Farmers need credit because of the long gap between spending and earning. Banks, Regional Rural Banks, cooperatives, NABARD and self-help groups have widened cheaper credit, though the poorest are not fully reached. Marketing reforms aim to give farmers a fair share of the final price.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Credit: always link **need** to the **gestation period** and family needs.',
        'Dates: **1969** nationalisation, **1975** RRBs, **1982** NABARD.',
        'SHGs: mention **collateral-free** bank linkage and **women**; evaluate with limits.',
        'Marketing: name the malpractice, then the matching measure.',
        'Numericals: check whether the interest rate is **per month** or **per year**.',
      ],
      v: flow('LR', ['Problem', 'Cause', 'Measure', 'Effect'], 'Flow of a strong answer: problem, cause, measure and effect', 'Structure for 3 and 5 mark answers'),
      n: 'A few tips. When asked why farmers need credit, mention the long gestation period and family needs. Learn the three dates: nineteen sixty nine, seventy five and eighty two. For self-help groups, stress loans without collateral and the role of women, and give limits if asked to evaluate. In marketing answers, match each problem with a measure. In numericals, check the unit of the interest rate.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Rural Development — Part 2: Cooperatives, Diversification and Organic Farming',
  goals: [
    'Explain how dairy cooperatives on the Anand pattern help rural households',
    'Explain the two aspects of agricultural diversification and why it is needed',
    'Describe allied activities, non-farm work and the role of information technology',
    'Evaluate organic farming, with its benefits and limitations',
  ],
  slides: [
    sl('title', 'Rural Development — Part 2', {
      b: '**Cooperatives**, **diversification** and **organic farming**: new ways to earn and to farm.',
      v: vRoute2,
      n: 'In Part 1 we saw how farmers borrow and sell. Now we look at three ideas that change how rural families earn and farm. Cooperatives let small producers act together. Diversification spreads work and risk beyond a single crop. And organic farming offers a more sustainable way of growing food. Each has strengths and limits we must be ready to weigh.',
    }),
    sl('diagram', 'Dairy cooperatives: the Anand pattern', {
      b: 'Village societies, district unions and state federations, owned by **milk producers**.',
      v: vDairy,
      n: 'The best-known example of cooperative marketing is dairying. Beginning in Anand in Gujarat, milk producers formed village societies. Each member pours milk, which is tested and paid for by quantity and fat. District unions process it, and a state federation sells it under one brand in cities. From nineteen seventy, Operation Flood spread this pattern to many states, helping India become one of the largest milk producers in the world.',
    }),
    sl('check', 'Quick check: where it began', {
      b: 'Where did the cooperative dairy model behind Operation Flood begin?',
      chk: 'm_anand',
      n: 'Recall the town in Gujarat whose milk cooperative became a model for the whole country.',
    }),
    sl('concept', 'Why cooperatives help', {
      v: vCoopWhy,
      n: 'Why do members gain? They are paid regularly and fairly. Because the cooperative processes and sells the milk itself, there are no middlemen taking a margin. Members also get services such as veterinary care and cattle feed. And since women do much of the dairy work, cooperatives give many rural women an income of their own.',
    }),
    sl('diagram', 'What is diversification?', {
      v: vDiv,
      n: 'Diversification has two aspects. The first is a change in the cropping pattern, from mainly food grains to a wider range including fruits, vegetables, oilseeds and flowers. The second is a shift of workers from crop farming to allied activities such as livestock and fisheries, and to non-farm work such as processing, crafts and services.',
    }),
    sl('concept', 'Why diversify?', {
      b: 'Crop farming alone is **seasonal** and, where it depends on rain, **risky**.',
      bl: ['Work for only part of the year', 'One bad monsoon can wipe out income', 'A growing rural workforce needs more productive jobs'],
      n: 'Why is diversification needed? In much of India, crop farming gives work for only part of the year, and in rain-fed areas one poor monsoon can destroy a family\'s income. The rural workforce is also growing, and farms cannot absorb everyone productively. Other activities provide work in the off-season and spread the risk.',
    }),
    sl('diagram', 'Allied and non-farm activities', {
      v: vAllied,
      n: 'Here are the main options. Animal husbandry, with cattle, goats and poultry, gives a steady income and needs little land. Fisheries, inland and marine, employ men and women. Horticulture, growing fruits, vegetables, flowers and spices, earns more per acre. And non-farm work, like agro-processing, crafts and tourism, creates jobs outside the crop season.',
    }),
    sl('check', 'Quick check: mixed farming', {
      b: 'A family keeps goats and cows along with its millet crop. What is the main advantage?',
      chk: 'm_livestock',
      n: 'Think about what happens to the family\'s income in a year when the rains fail.',
    }),
    sl('example', 'Worked example 3: how much comes from outside crops?', {
      b: `An imagined household earns ₹${inr(WE3.crops)} from crops, ₹${inr(WE3.goats)} from goats and ₹${inr(WE3.fish)} from a fish pond in a year.`,
      bl: [
        `Step 1 — Total income = ₹${inr(WE3_TOTAL)}.`,
        `Step 2 — Non-crop income = ${inr(WE3.goats)} + ${inr(WE3.fish)} = ₹${inr(WE3.goats + WE3.fish)}.`,
        `Step 3 — Share = ${inr(WE3.goats + WE3.fish)} ÷ ${inr(WE3_TOTAL)} × 100 = ${WE3_SHARE} per cent.`,
        'Step 4 — Interpret: if the crop fails, much of the income survives.',
      ],
      v: vDivIncome,
      n: 'Let us measure diversification for one imagined family. Its total income is ninety thousand rupees, of which thirty six thousand comes from goats and fish. That is forty per cent of its income from outside crops. In a drought year the crop income may collapse, but the goats and the fish pond keep a large part of the family\'s earnings safe.',
    }),
    sl('concept', 'Horticulture and fisheries up close', {
      b: 'High-value crops and fish bring **income per acre** and **work for women**.',
      bl: ['Fruits, vegetables, flowers, spices, medicinal plants', 'Picking, grading, packing and processing create jobs', 'Fisheries: catching, drying, processing and selling'],
      v: flow('LR', ['Grow high-value produce', 'Grade and pack', 'Process (juice, pickle, dried fish)', 'Sell in towns or abroad'], 'Flow of value addition: grow high-value produce, grade and pack, process into juice, pickle or dried fish, and sell in towns or abroad', 'Each step adds jobs'),
      n: 'Horticulture covers fruits, vegetables, flowers, spices and medicinal plants. These usually earn more per acre than cereals, and picking, grading and packing need many hands, often women\'s. Fisheries work the same way: some family members catch fish while others dry, process and sell them. Each step from field or pond to market adds jobs and income.',
    }),
    sl('diagram', 'Information technology in villages', {
      v: vIT,
      n: 'Information technology is a newer tool. A phone message with the weather forecast or crop advice helps farmers plan. Knowing prices in nearby markets helps them decide where and when to sell. Online access to land records and schemes saves time. And village service centres create jobs for educated rural youth. Its reach is limited, though, where connectivity and digital skills are weak.',
    }),
    sl('check', 'Quick check: horticulture', {
      b: 'Which of these does horticulture include?',
      chk: 'm_horti',
      n: 'Horticulture is about gardens and orchards on a larger scale. Which option fits?',
    }),
    sl('diagram', 'Organic farming', {
      b: 'Farming that **restores and maintains ecological balance**, without synthetic chemicals.',
      v: vOrganic,
      n: 'Organic farming replaces chemical fertilisers with compost, manure and green manure, and chemical pesticides with natural methods such as neem sprays. It aims to keep the soil, water and living things in balance. It also needs more labour per acre, which matters in a country with many rural workers.',
    }),
    sl('example', 'Worked example 4: does organic pay?', {
      b: 'Compare one imagined acre under chemical and organic farming.',
      bl: [
        `Step 1 — Chemical: ${WE4.cq} × ${inr(WE4.cp)} − ${inr(WE4.cc)} = ₹${inr(WE4_C)}.`,
        `Step 2 — Organic: ${WE4.oq} × ${inr(WE4.op)} − ${inr(WE4.oc)} = ₹${inr(WE4_O)}.`,
        'Step 3 — Output is lower but the price premium and lower costs more than make up for it.',
        'Step 4 — Caution: without certification and buyers, the premium may vanish.',
      ],
      v: vWE4,
      n: 'Here organic output is lower, twenty seven quintals instead of thirty. But the organic crop sells at a higher price and needs fewer purchased inputs, so the net income is higher: sixty six thousand two hundred rupees against fifty six thousand. The lesson is that organic farming can pay, but only if the farmer can reach buyers who pay a premium.',
    }),
    sl('check', 'Quick check: the first season', {
      b: 'Will a farmer who switches to organic farming get higher yields from the very first season?',
      chk: 'tf_org_yield',
      n: 'Think about how long the soil takes to recover after years of chemical use.',
    }),
    sl('two-column', 'Weighing organic farming', {
      cols: [
        '**Benefits**\n- Sustainable\n- Cheaper inputs\n- Healthier food, export demand\n- More rural jobs',
        '**Limitations**\n- Lower early yields\n- Short shelf life\n- Certification and marketing\n- Less off-season choice',
      ],
      v: vOrgBalance,
      n: 'When you evaluate organic farming, set the benefits against the limits. It protects the environment, costs less in purchased inputs, gives healthier food and creates work. But yields may fall in the first years, produce can spoil sooner, farmers need certification and buyers, and there is less choice out of season. A balanced answer ends with a judgement.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Dairy cooperatives on the Anand pattern give producers fair, regular income without middlemen. Diversification changes the cropping pattern and moves workers into allied and non-farm activities, spreading risk. Information technology brings information, services and jobs. Organic farming is sustainable and labour-intensive, but has lower early yields and needs good markets.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Diversification: always give **both aspects**.',
        'Name allied activities **with an example** and **why each helps**.',
        'Operation Flood: say **cooperative**, **Anand**, **no middlemen**.',
        'Organic farming: "evaluate" needs **benefits, limits and a judgement**.',
        'Case passages: quote the clue, then name the concept.',
      ],
      v: flow('LR', ['Define', 'Explain with an example', 'Weigh both sides', 'Judge'], 'Flow of an evaluation answer: define, explain with an example, weigh both sides and judge', 'For evaluate questions'),
      n: 'Some final tips. For diversification, always give both aspects. When you name an allied activity, add an example and say why it helps. For Operation Flood, use the words cooperative, Anand and no middlemen. If a question says evaluate, give benefits, limits and your judgement. In case-based questions, quote the clue from the passage before naming the concept.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Rural Development — notes',
  sections: [
    {
      h: '1. Meaning of rural development',
      t: 1,
      b: 'Rural development is action aimed at the **areas and sections that lag behind** in the village economy. Areas needing attention include **human capital** (literacy, especially female literacy, skills and health), **land reforms**, **credit** and **marketing**, **productive activities** including non-farm work, and **research** into better methods.\n\nThis chapter studies credit, marketing, diversification and organic farming. (Poverty and Infrastructure are not in the 2026-27 syllabus.)',
      terms: [['Rural development', 'Improving the lives and incomes of rural people by acting on the lagging areas of the village economy.']],
      v: vAreas,
    },
    {
      h: '2. Rural credit: need and sources',
      t: 1,
      b: '**Need:** farming has a **long gestation period** between spending on inputs and getting income; there are fixed investments (pumps, cattle, wells) and family needs (illness, weddings, ceremonies).\n\n**Non-institutional sources:** moneylenders, traders and landlords. Quick and informal, but usually at **very high interest**; loans may be tied to selling the crop to the lender, which can create a **debt trap**.\n\n**Institutional sources:** commercial banks (rural branches grew after **nationalisation in 1969**), **Regional Rural Banks** (**1975**), cooperative credit societies and banks, land development banks, and **self-help groups**. **NABARD** (**1982**) is the apex body that coordinates and refinances rural lenders.',
      terms: [
        ['Gestation period', 'The time between spending on production and receiving income from it.'],
        ['NABARD', 'National Bank for Agriculture and Rural Development, the apex body for rural financing (1982).'],
      ],
      v: vSources,
      vs: [vTimeline],
    },
    {
      h: '3. Self-help groups and problems of rural banking',
      t: 1,
      b: '**SHGs:** small groups, mostly of women, that build a common fund from regular small savings, lend to members at reasonable interest, and after a good repayment record borrow from banks **without collateral**. This is **microcredit**. SHGs encourage thrift and give women income and a voice; their loans are small and often used for consumption, so they need skills and market links too.\n\n**Problems of institutional credit:** it does not reach enough small and marginal farmers and landless workers; **loan defaults** weaken banks; lenders have preferred larger borrowers; and mobilising rural savings has been slow. Moneylenders therefore survive.',
      terms: [
        ['Self-help group', 'A small group that pools members\' savings, lends within the group and borrows from banks as a group.'],
        ['Microcredit', 'Small loans to poor borrowers, often through groups, without collateral.'],
      ],
      v: vShg,
      vs: [vCreditProblems],
    },
    {
      h: '4. Agricultural marketing',
      t: 1,
      b: '**Meaning:** assembling, storing, processing, grading, packing, transporting and selling farm produce.\n\n**Problems:** faulty weights and manipulated accounts; no information on prices elsewhere; no storage, which forces **distress sales**; loans tied to selling to the lender.\n\n**Measures:**\n1. **Regulated markets** for open, orderly and transparent trading.\n2. **Physical infrastructure**: roads, railways, warehouses, cold storages, processing units.\n3. **Cooperative marketing**, so producers sell together.\n4. **Policy instruments**: **minimum support prices** for certain crops; **buffer stocks** of wheat and rice held by the Food Corporation of India; the **public distribution system**.\n5. **Alternative channels**: farmers\' markets where growers sell directly to consumers in several states, and contracts with processing firms and retail chains.\n\nThe **price spread** is the gap between the consumer\'s price and the farmer\'s price; reforms aim to narrow it.',
      terms: [
        ['Distress sale', 'Selling produce at a low price at harvest because the farmer cannot store or wait.'],
        ['Minimum support price', 'The price at which the government offers to buy notified crops, announced before sowing.'],
        ['Buffer stock', 'Grain held by the government to supply in shortages and steady prices.'],
        ['Price spread', 'Consumer\'s price minus the farmer\'s price for the same produce.'],
      ],
      v: vMarketProblems,
      vs: [vMeasures, vSpread],
    },
    {
      h: '5. Cooperatives and dairying',
      t: 1,
      b: 'Cooperatives let small producers act together in credit, marketing and processing. The best-known example is **dairying**: the **Anand pattern** in Gujarat (village societies → district unions → state federation) was spread across states by **Operation Flood**, begun in **1970**. Members are paid by quantity and fat content; the cooperative processes and sells the milk, removing middlemen; members get services such as veterinary care and feed. Dairying gives regular income, much of it earned by **women**, and India has become one of the world\'s largest milk producers.',
      terms: [['Operation Flood', 'A national programme from 1970 that spread cooperative dairying on the Anand pattern.']],
      v: vDairy,
      vs: [vCoopWhy],
    },
    {
      h: '6. Diversification into productive activities',
      t: 2,
      b: '**Two aspects:** (1) a **change in cropping pattern** towards a wider range of crops; (2) a **shift of workers** from crop farming to **allied activities** and **non-farm** work.\n\n**Why:** crop farming is seasonal and, in rain-fed areas, risky; the rural workforce needs more productive, year-round work.\n\n**Animal husbandry:** cattle, buffaloes, goats, poultry; regular income, suits small and landless families, reduces risk (mixed farming).\n**Fisheries:** inland (ponds, rivers, reservoirs) and marine; women often process and sell the catch.\n**Horticulture:** fruits, vegetables, flowers, spices, medicinal and aromatic plants; high value per acre, labour-intensive, links to processing and export.\n**Non-farm work:** agro-processing, food processing, crafts, pottery, tourism.\n**Information technology:** weather and crop advice, market prices, online records and services, and new rural jobs; limited by weak connectivity and digital skills.',
      terms: [
        ['Diversification', 'Widening the range of crops and moving workers into allied and non-farm activities.'],
        ['Allied activities', 'Livestock, fisheries, poultry and horticulture, closely linked to farming.'],
      ],
      v: vDiv,
      vs: [vAllied, vIT],
    },
    {
      h: '7. Organic farming',
      t: 2,
      b: '**Meaning:** a whole system of farming that restores, maintains and enhances ecological balance, using **compost, manure, green manure and natural pest control** instead of synthetic fertilisers and pesticides.\n\n**Benefits:** sustainable for soil and water; **cheaper on-farm inputs**; food free of chemical residues; demand at home and abroad; **more labour per acre**, so more rural jobs.\n\n**Limitations:** **lower yields in the early years**; **shorter shelf life**; less choice of off-season produce; farmers need awareness, **certification** and marketing support. A balanced view: valuable for many crops and regions, with support during the transition. (One frequently cited example: Sikkim was declared a fully organic state in 2016.)',
      terms: [['Organic farming', 'Farming with natural inputs and pest control, without synthetic chemicals, aiming at ecological balance.']],
      v: vOrganic,
      vs: [vOrgBalance, vWE4],
    },
  ],
  tips: '**Common mistakes**\n- Calling RRBs or SHGs non-institutional: they are **institutional** sources.\n- Giving one aspect of diversification only: there are **two**.\n- Saying MSP covers **every** crop: only **notified** crops.\n- Writing "organic farming always raises yields": early yields often **fall**.\n- Mixing per-month and per-year interest rates in numericals.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2 marks: two points (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five points with key terms (80–120 words); "evaluate" needs benefits, limits and a judgement.\n- Case-based: quote the clue, then name the concept; show working in numerical parts.\n\nAll cases and tables in SOYL practice are imagined; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Rural development**', 'Action on the **lagging areas and people** of the village economy.', 'definition', 1],
  ['Why do farmers need credit?', '**Long gestation period**; fixed investment; family needs.', 'concept', 1],
  ['**Gestation period** in farming', 'Time between spending on inputs (sowing) and income (harvest).', 'definition', 1],
  ['Non-institutional sources of credit', '**Moneylenders, traders, landlords**.', 'fact', 1],
  ['Institutional sources of credit', 'Commercial banks, **RRBs**, cooperatives, land development banks, **SHGs**.', 'fact', 1],
  ['Bank nationalisation year', '**1969**: rural branches and priority lending followed.', 'fact', 1],
  ['Regional Rural Banks set up in', '**1975**.', 'fact', 1],
  ['**NABARD**: year and role', '**1982**; apex body that coordinates and refinances rural lenders.', 'fact', 1],
  ['**Self-help group**', 'Small group (often women) that saves, lends within, and borrows from banks as a group.', 'definition', 1],
  ['Why can SHGs borrow without collateral?', 'The **group guarantees** repayment; members monitor each other.', 'concept', 1],
  ['**Microcredit**', 'Small loans to the poor, often through groups, without collateral.', 'definition', 1],
  ['Two problems of institutional credit', 'Poor reach to small and marginal farmers; loan **defaults**.', 'concept', 1],
  ['**Agricultural marketing**', 'Assembling, storing, processing, grading, packing, transporting and selling produce.', 'definition', 1],
  ['**Distress sale**', 'Selling at a low price at harvest because one cannot store or wait.', 'definition', 1],
  ['Four marketing malpractices or problems', 'Faulty weights, manipulated accounts, no price information, no storage.', 'concept', 1],
  ['**Regulated markets**', 'Open, orderly, transparent trading so farmers get fair prices.', 'definition', 1],
  ['**MSP**', 'Price announced before sowing at which government buys **notified** crops.', 'definition', 1],
  ['**Buffer stock**', 'Grain held by government (Food Corporation of India) for shortages.', 'definition', 1],
  ['**Price spread**', 'Consumer\'s price minus farmer\'s price.', 'definition', 1],
  ['Alternative marketing channels', 'Farmers\' markets (direct sale), contracts with processors and retail chains.', 'concept', 1],
  ['**Operation Flood**', 'From **1970**; spread cooperative dairying on the **Anand pattern** (Gujarat).', 'fact', 1],
  ['Three tiers of the Anand pattern', 'Village society → district union → state federation.', 'fact', 1],
  ['Two aspects of **diversification**', 'Change in **cropping pattern**; shift of workers to **allied and non-farm** activities.', 'definition', 2],
  ['Why diversify?', 'Farming is **seasonal** and risky; need for year-round productive work.', 'concept', 2],
  ['Allied activities', '**Animal husbandry, fisheries, horticulture** (and poultry).', 'fact', 2],
  ['**Horticulture** includes', 'Fruits, vegetables, flowers, spices, medicinal and aromatic plants.', 'fact', 2],
  ['How IT helps villages', 'Weather and crop advice, market prices, online services, rural jobs.', 'concept', 2],
  ['**Organic farming**', 'Natural inputs and pest control, no synthetic chemicals; ecological balance.', 'definition', 2],
  ['Three benefits of organic farming', 'Sustainable; cheaper inputs; more jobs (also healthier food, exports).', 'concept', 2],
  ['Three limitations of organic farming', 'Lower **early yields**; short **shelf life**; certification and marketing needs.', 'concept', 2],
  ['"Evaluate" questions need', 'Benefits **+** limits **+** a judgement.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Rural Development',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_credit_need', 'm_regulated', 'm_org_meaning', 'ar_gestation'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_inst_vs_noninst', 's_div_two', 's3_marketing_measures'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_rural_credit', 'l_organic'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_market'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Rural Development',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_moneylender_harm', 'm_nationalisation', 'm_shg_collateral', 'm_msp', 'm_buffer', 'm_op_flood', 'm_div_need', 'm_org_limit', 'ar_malpractice', 'ar_org_jobs'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_shg_role', 's_marketing_problems', { attempt: 1, keys: ['s_animal', 's_org_benefits'] }, 's3_credit_problems', { attempt: 1, keys: ['s3_horti', 's3_org_problems'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_marketing', { attempt: 1, keys: ['l_diversification', 'l_shg_eval'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage or table and answer all parts. Part (c) of each has an internal choice.', items: ['cb_credit', 'cb_organic'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (rural credit, agricultural marketing, cooperatives) and t02 (diversification, organic farming) of cbse-12-economics-ch10 only; the deleted topics Poverty and Infrastructure are not examined',
    originality: 'every case, diary, table and figure written for this chapter (imagined villages, people, rates and prices, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build (moneylender ${inr(WE1_ML)} vs bank ${inr(WE1_BANK)}; onion spread ${WE2_SPREAD}, farmer's share ${WE2_SHARE} per cent; household non-crop share ${WE3_SHARE} per cent; organic net ${inr(WE4_O)} vs chemical ${inr(WE4_C)}; question-bank figures asserted in questions.mjs)`,
    facts: 'bank nationalisation 1969, RRBs 1975, NABARD 1982, Operation Flood from 1970 on the Anand pattern, Sikkim declared fully organic in 2016; no recent credit or output statistics stated',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
