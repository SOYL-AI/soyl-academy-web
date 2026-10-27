// Build CBSE 10 Social Science ch19 Sectors of the Indian Economy. Run from platform/:
//   npx tsx content/authored/social-science/cbse-10-social-science-ch19/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

setUnit('cbse-10-social-science-ch19', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vSectors = table(
  ['Sector', 'What it does', 'Examples', 'Also called'],
  [
    ['Primary', 'Produces goods by using natural resources directly', 'Farming, fishing, dairy, forestry', 'Agriculture and related sector'],
    ['Secondary', 'Changes natural products into other forms by manufacturing', 'Sugar mill, textile mill, furniture workshop, bakery', 'Industrial sector'],
    ['Tertiary', 'Provides services that support production and people\'s needs', 'Transport, storage, banking, trade, teaching, health care, IT', 'Service sector'],
  ],
  'Table of the three sectors: primary uses natural resources directly (farming, fishing, dairy, forestry); secondary manufactures (sugar mill, textile mill, furniture, bakery); tertiary provides services (transport, storage, banking, trade, teaching, health, IT)',
);
const vMilk = flow(
  'LR',
  ['Dairy farmer milks cows (primary)', 'Dairy plant makes paneer and ghee (secondary)', 'Trucks, shops and banks move, sell and finance them (tertiary)', 'Family buys paneer'],
  'Flow showing one product across the sectors: a dairy farmer (primary), a dairy plant making paneer and ghee (secondary), trucks, shops and banks (tertiary), and a family buying paneer',
  'One product, three sectors',
);
const vInterdep = flow(
  'TB',
  ['Cotton crop fails (primary)', 'Mills get less raw cotton (secondary)', 'Truckers, traders and banks lose business (tertiary)', 'Incomes fall across the economy'],
  'Flow of a chain of effects: a cotton crop failure leads to less raw cotton for mills, less business for truckers, traders and banks, and lower incomes across the economy',
  'Interdependence works in both directions',
);
const vClassify = table(
  ['Activity (imagined Kerala village)', 'Sector', 'Reason'],
  [
    ['Tapping rubber trees', 'Primary', 'Uses a natural resource directly'],
    ['Making rubber sheets and tyres', 'Secondary', 'Changes latex into another form'],
    ['Carrying rubber sheets to Kochi', 'Tertiary', 'Transport service'],
    ['A teacher at the village school', 'Tertiary', 'Education service'],
    ['Catching sardines', 'Primary', 'Natural resource used directly'],
    ['A boat-repair yard', 'Tertiary', 'Repair is a service'],
  ],
  'Table classifying six activities in an imagined Kerala village: tapping rubber and catching sardines are primary; making rubber sheets and tyres is secondary; transport, teaching and boat repair are tertiary',
  'Ask: does it use nature directly, change a product, or provide a service?',
);
const vGdpChain = table(
  ['Stage', 'Sold to', 'Value of sale (₹)', 'Value added (₹)'],
  [
    ['Farmer grows wheat', 'Flour mill', '800', '800'],
    ['Mill makes flour', 'Bakery', '1,200', '400'],
    ['Bakery makes bread', 'Consumers', '2,000', '800'],
    ['**Counted in GDP**', '', '**Final good only: 2,000**', '**Total: 2,000**'],
  ],
  'Table of a wheat–flour–bread chain: wheat sold for 800 rupees, flour for 1,200 and bread for 2,000; values added are 800, 400 and 800; only the final good worth 2,000 is counted, which equals the total value added',
  'Imagined figures.',
);
const vHistory = {
  kind: 'plot',
  spec: {
    x: { min: 1800, max: 2000, label: 'Year' },
    y: { min: 0, max: 80, label: 'Share of workers (%)' },
    functions: [],
    points: [],
    series: [
      { label: 'Primary', points: [[1800, 75], [1850, 60], [1900, 40], [1950, 15], [2000, 5]], kind: 'line' },
      { label: 'Secondary', points: [[1800, 10], [1850, 25], [1900, 40], [1950, 35], [2000, 22]], kind: 'line' },
      { label: 'Tertiary', points: [[1800, 15], [1850, 15], [1900, 20], [1950, 50], [2000, 73]], kind: 'line' },
    ],
    grid: true,
  },
  alt: 'Line chart of an imagined developed country from 1800 to 2000: the primary share of workers falls from 75 to 5 per cent, the secondary share rises to 40 per cent by 1900 and then falls to 22, and the tertiary share rises from 15 to 73 per cent',
  caption: 'Imagined developed country: primary → secondary → tertiary.',
};
const vIndia = {
  kind: 'plot',
  spec: {
    x: { min: 0, max: 8, label: 'Bars 1–3: share of GDP; bars 5–7: share of workers (primary, secondary, tertiary)' },
    y: { min: 0, max: 60, label: 'Per cent (rounded, approximate)' },
    functions: [],
    points: [],
    series: [
      { label: 'Share of GDP', points: [[1, 18], [2, 28], [3, 54]], kind: 'bar' },
      { label: 'Share of workers', points: [[5, 46], [6, 25], [7, 29]], kind: 'bar' },
    ],
    grid: true,
  },
  alt: 'Bar chart for India in recent years, rounded and approximate: share of GDP is about 18 per cent primary, 28 secondary and 54 tertiary; share of workers is about 46 per cent primary, 25 secondary and 29 tertiary',
  caption: 'India, recent years (rounded, approximate; exact values change every year).',
};
const vWhyTertiary = table(
  ['Reason', 'Example'],
  [
    ['Basic services every country needs', 'Hospitals, schools, post offices, police, courts, banks'],
    ['Support for farming and industry', 'Transport, storage, trade and credit for crops and factory goods'],
    ['Rising incomes', 'More eating out, tourism, private schools and hospitals'],
    ['New technology', 'Software, internet services, digital payments, call centres'],
  ],
  'Table of four reasons the tertiary sector has grown: basic services, support for other sectors, rising incomes and new technology, each with examples',
);
const vDisguised = table(
  ['Situation (imagined family in Bihar)', 'Workers', 'Output of paddy (quintals)'],
  [
    ['All family members work on the 2-hectare plot', '7', '40'],
    ['Only four members work on the plot', '4', '40'],
    ['**Disguisedly unemployed**', '**7 − 4 = 3**', 'Output unchanged'],
  ],
  'Table: with seven members working, output is 40 quintals; with four, it is still 40 quintals; so three members are disguisedly unemployed',
  'Imagined figures.',
);
const vJobs = flow(
  'TB',
  ['More jobs in and near villages', 'Irrigation for a second crop', 'Roads, transport and cold storage', 'Cheap credit for small enterprises', 'Agro-processing units in small towns', 'Tourism, health, education and IT services'],
  'Flow from one goal, more jobs in and near villages, to five ways: irrigation for a second crop; roads, transport and cold storage; cheap credit; agro-processing units; and tourism, health, education and IT services',
  'Ways to create employment',
  [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
    { from: 'n1', to: 'n4' },
    { from: 'n1', to: 'n5' },
    { from: 'n1', to: 'n6' },
  ],
);
const vMgnrega = table(
  ['Feature of MGNREGA 2005', 'What it means'],
  [
    ['100 days a year', 'Every rural household whose adults volunteer for unskilled manual work can demand it'],
    ['Within 15 days', 'Work must be given within 15 days of applying, or an unemployment allowance is due'],
    ['Women', 'At least one-third of the workers should be women'],
    ['Kind of work', 'Water conservation, ponds, check dams, land development, tree planting, rural roads'],
    ['Payment and checks', 'Wages into bank or post-office accounts; social audits by the gram sabha'],
  ],
  'Table of five features of MGNREGA 2005: 100 days a year for rural households, work within 15 days or an allowance, at least one-third women, works such as water conservation and rural roads, and wages paid into accounts with social audits',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Three sectors', 'Primary (nature), secondary (manufacturing), tertiary (services); all interdependent'],
    ['GDP', 'Value of final goods and services produced within a country in a year; no double counting'],
    ['Change over time', 'Developed countries: primary → secondary → tertiary'],
    ['India', 'Tertiary produces over half of GDP, but the primary sector still employs the most workers'],
    ['Disguised unemployment', 'More workers than needed; removing some does not reduce output'],
    ['MGNREGA 2005', '100 days of work for rural households; allowance if not given in 15 days'],
  ],
  'Summary table of Part 1: three sectors, GDP, change over time, India\'s pattern, disguised unemployment and MGNREGA 2005',
);
const vOrg = table(
  ['Organised sector', 'Unorganised sector'],
  [
    ['Registered with the government', 'Small, scattered units, often not registered'],
    ['Follows labour laws', 'Rules exist but are largely not followed'],
    ['Regular jobs, appointment letters', 'Irregular work; dismissal at any time'],
    ['Paid leave, provident fund, medical benefits, pension', 'Usually no paid leave or benefits'],
    ['Fixed hours, overtime pay', 'Long hours, low pay, no overtime'],
  ],
  'Table comparing the organised sector (registered, follows labour laws, regular jobs, benefits, fixed hours) with the unorganised sector (small and scattered, rules not followed, irregular work, no benefits, long hours and low pay)',
);
const vWhoUnorg = table(
  ['Where', 'Who works in the unorganised sector'],
  [
    ['Rural areas', 'Landless farm labourers, small and marginal farmers, sharecroppers, artisans such as weavers and carpenters'],
    ['Urban areas', 'Construction workers, street vendors, head-load workers, domestic workers, workers in small workshops'],
    ['New forms', 'App-based delivery and ride-hailing workers paid per task'],
  ],
  'Table of who works in the unorganised sector: in rural areas landless labourers, small farmers, sharecroppers and artisans; in urban areas construction workers, vendors, head-load and domestic workers; and new app-based delivery and ride workers',
);
const vShift = flow(
  'LR',
  ['Big firms hire through contractors', 'Workers on short contracts', 'No paid leave, provident fund or security', 'Unorganised conditions inside organised firms'],
  'Flow: big firms hire through contractors, workers are on short contracts, they get no paid leave, provident fund or security, so unorganised conditions spread inside organised firms',
  'A trend since the 1990s',
);
const vClassifyWorkers = table(
  ['Worker (imagined)', 'Organised or unorganised?', 'Clue'],
  [
    ['Nurse in a government hospital, Patna', 'Organised', 'Appointment letter, paid leave, pension'],
    ['Woman rolling agarbattis at home for a trader, Mysuru', 'Unorganised', 'Paid per thousand sticks, no benefits'],
    ['Engineer in a registered software company, Pune', 'Organised', 'Regular salary, provident fund, health cover'],
    ['Security guard hired through a contractor for a bank', 'Unorganised', 'Short contract, no paid leave'],
    ['Taxi driver working through an app, Kolkata', 'Unorganised', 'Paid per ride, no fixed salary'],
  ],
  'Table classifying five imagined workers: a government nurse and a software engineer are organised; an agarbatti roller at home, a contract security guard and an app-based taxi driver are unorganised, with clues for each',
  'Look at the terms of work, not the size or fame of the employer.',
);
const vProtect = table(
  ['Problem', 'Measure'],
  [
    ['Very low wages', 'Enforce minimum wages; simple ways to complain'],
    ['No help in illness, injury or old age', 'Social security: health and accident cover, pensions; registration on the e-Shram portal'],
    ['Small units cannot get credit or markets', 'Cheap loans, raw materials and marketing support; cooperatives'],
    ['Low skills keep pay low', 'Skill training linked to local work'],
  ],
  'Table of problems of unorganised workers and measures: minimum wages for low pay, social security and e-Shram registration for illness and old age, credit and marketing support for small units, and skill training',
);
const vPubPriv = table(
  ['Basis', 'Public sector', 'Private sector'],
  [
    ['Ownership', 'Government owns most assets', 'Individuals or companies own the assets'],
    ['Motive', 'Public welfare', 'Profit'],
    ['Money from', 'Taxes and charges', 'Sales and investors'],
    ['Examples', 'Indian Railways, India Post, government hospitals', 'A private airline, a mobile phone company, a private school'],
  ],
  'Table comparing public and private sectors by ownership, motive, source of money and examples: Indian Railways, India Post and government hospitals versus a private airline, a mobile company and a private school',
);
const vWhyGovt = table(
  ['What the government provides', 'Why the private sector alone would not'],
  [
    ['Roads, bridges, railways, ports, dams', 'Huge cost; hard to charge every user enough for a profit'],
    ['Cheap electricity for small industries', 'A profit-seeking firm would charge the full cost'],
    ['Grain bought at a support price, sold cheaply in ration shops', 'Helps farmers and the poor; no profit in it'],
    ['Schools, hospitals, nutrition programmes', 'Many poor families cannot pay private prices'],
  ],
  'Table of what the government provides and why: infrastructure because of huge cost, cheap electricity, grain procurement and ration shops, and schools and hospitals for families who cannot pay private prices',
);
const vPds = flow(
  'LR',
  ['Farmers sell grain at a minimum support price', 'Food Corporation of India buys and stores it', 'Ration shops sell it cheaply or give it free', 'Poor families get food security'],
  'Flow: farmers sell grain at a minimum support price, the Food Corporation of India buys and stores it, ration shops sell it cheaply or give it free, and poor families get food security',
  'The government bears the difference in cost.',
);
const vPlan5 = table(
  ['Point', 'Organised sector', 'Unorganised sector'],
  [
    ['1. Registration', 'Registered', 'Often unregistered'],
    ['2. Rules', 'Labour laws followed', 'Largely not followed'],
    ['3. Security', 'Regular jobs', 'Dismissal any time'],
    ['4. Benefits', 'Paid leave, provident fund', 'Usually none'],
    ['5. Hours and pay', 'Fixed hours, overtime', 'Long hours, low pay'],
  ],
  'Answer plan table for a five-mark comparison: registration, rules, security, benefits, and hours and pay, each stated for both sectors',
  'One mark per point; every point names both sectors.',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Organised sector', 'Registered, follows labour laws, regular jobs with benefits'],
    ['Unorganised sector', 'Small, scattered, rules not followed, insecure and low-paid'],
    ['Protection', 'Minimum wages, social security (e-Shram), support to small units'],
    ['Public sector', 'Government owns; aims at welfare (railways, post, ration shops)'],
    ['Private sector', 'Privately owned; aims at profit'],
    ['Why government provides', 'Huge-cost infrastructure, support to producers, health, education, food'],
  ],
  'Summary table of Part 2: organised and unorganised sectors, protection of workers, public and private sectors, and why the government provides some goods and services',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Sectors of the Indian Economy — Part 1: Sectors, GDP and Employment',
  goals: [
    'Classify economic activities into the primary, secondary and tertiary sectors and explain how they depend on each other',
    'Explain GDP and why only final goods and services are counted',
    'Interpret how the shares of the sectors in output and employment have changed, in developed countries and in India',
    'Explain disguised unemployment and underemployment, and ways to create more employment, including MGNREGA 2005',
  ],
  slides: [
    sl('title', 'Sectors of the Indian Economy', {
      b: 'Part 1 — the **three sectors**, **GDP**, how their importance changes, **disguised unemployment** and **MGNREGA**.',
      v: flow('LR', ['Three sectors', 'How they depend on each other', 'GDP', 'Changing importance', 'Hidden unemployment', 'Creating jobs and MGNREGA'], 'Route map of Part 1: three sectors, interdependence, GDP, changing importance, hidden unemployment, creating jobs and MGNREGA', 'Part 1 at a glance'),
      n: 'Namaste! Think of your breakfast this morning. Someone grew the wheat, someone turned it into bread, and someone carried it to the shop and sold it. Each of these people did a different kind of work. In this chapter we group all such work into three sectors, see how we measure what a country produces, and ask an important question: are there enough good jobs for everyone?',
    }),
    sl('concept', 'Economic activities', {
      b: 'An **economic activity** produces a good or a service in exchange for money (or for one\'s own use).',
      v: table(['Activity', 'Produces', 'Example'], [['Growing vegetables', 'A good, directly from nature', 'A farmer near Nashik grows onions'], ['Making biscuits', 'A good, by manufacturing', 'A factory in Kolkata bakes biscuits'], ['Teaching', 'A service', 'A teacher in Imphal teaches Class 10']], 'Table of three activities: growing vegetables produces a good from nature, making biscuits produces a good by manufacturing, and teaching produces a service'),
      n: 'An economic activity is any work that produces a good or a service, usually in return for money. Notice the three kinds of work in this table. The onion farmer takes a good directly from nature. The biscuit factory changes wheat, sugar and oil into a new product. The teacher does not make any object at all; she provides a service. These three kinds of work are the basis of the three sectors.',
    }),
    sl('diagram', 'The three sectors', {
      v: vSectors,
      n: 'Here is the main classification. The primary sector uses natural resources directly: farming, fishing, dairy and forestry. Because most of its products come from agriculture, it is also called the agriculture and related sector. The secondary sector changes natural products into other forms by manufacturing, so it is also called the industrial sector. The tertiary sector provides services such as transport, banking, trade, teaching and health care, so it is called the service sector.',
    }),
    sl('check', 'Quick check: which sector?', {
      b: 'Which one of these is a **secondary**-sector activity?',
      chk: 'm_paneer',
      n: 'Ask yourself one question for each option: is nature used directly, is a product being changed into another form, or is a service being provided?',
    }),
    sl('diagram', 'One product, three sectors', {
      v: vMilk,
      n: 'Follow a glass of milk. The dairy farmer works in the primary sector. The dairy plant that turns milk into paneer and ghee is in the secondary sector. The trucks that carry it, the shop that sells it and the bank that lends to the dairy are all in the tertiary sector. So one product passes through all three sectors before it reaches your plate.',
    }),
    sl('diagram', 'The sectors depend on each other', {
      b: 'A problem in one sector spreads to the others.',
      v: vInterdep,
      n: 'Because one product passes through all three sectors, they depend on each other. Suppose the cotton crop fails. Mills get less raw cotton and may cut production. Truck owners, traders and banks lose business too. It works the other way as well: if mills stop buying, cotton farmers suffer. This is called interdependence, and examiners love to ask for an example of it.',
    }),
    sl('example', 'Worked example 1: classifying activities', {
      b: 'Classify six activities in an imagined village in Kerala, with a reason for each.',
      bl: [
        'Step 1 — Ask: is a natural resource used directly? Then it is **primary**.',
        'Step 2 — Is a product changed into another form? Then it is **secondary**.',
        'Step 3 — Is a service provided (transport, repair, teaching, trade)? Then it is **tertiary**.',
        'Step 4 — Write the sector **and** the reason; the reason earns the mark.',
      ],
      v: vClassify,
      n: 'Let us practise with an imagined village in Kerala. Tapping rubber trees and catching fish use nature directly, so they are primary. Turning latex into rubber sheets and tyres is manufacturing, so it is secondary. Carrying sheets to Kochi, teaching, and repairing boats are services, so they are tertiary. Notice the boat-repair yard: repair is a service, even though it happens in a workshop.',
    }),
    sl('concept', 'Gross Domestic Product (GDP)', {
      b: '**GDP** = the value of all **final** goods and services produced **within a country** during a particular year.',
      bl: [
        '**Final goods** reach the consumer, e.g. bread, a bicycle, a haircut.',
        '**Intermediate goods** are used up in making other goods, e.g. flour used by a bakery.',
        'Only final goods are counted: their price **already includes** the intermediate goods.',
        'In India, GDP is estimated by the **National Statistics Office** of the central government\'s statistics ministry.',
      ],
      v: flow('LR', ['Intermediate goods (flour, steel, cotton yarn)', 'Used up in production', 'Final goods and services (bread, cycles, shirts, haircuts)', 'Counted in GDP'], 'Flow: intermediate goods such as flour, steel and yarn are used up in production; final goods and services are what GDP counts', 'Count final goods only'),
      n: 'To compare the sectors, economists add up the value of what each sector produces. The total for the country is the Gross Domestic Product, or GDP. The key word is final. A bakery buys flour and sells bread. If we counted the flour and the bread, the flour would be counted twice, because its value is already inside the price of the bread. So GDP counts only final goods and services.',
    }),
    sl('example', 'Worked example 2: avoiding double counting', {
      b: 'Wheat worth ₹800 → flour worth ₹1,200 → bread worth ₹2,000 (imagined). How much is added to GDP?',
      bl: [
        'Step 1 — Identify the final good: the **bread** sold to consumers.',
        'Step 2 — Count it once: **₹2,000**.',
        'Step 3 — Check with value added: 800 + 400 + 800 = **₹2,000**.',
        'Step 4 — Wrong method: 800 + 1,200 + 2,000 = ₹4,000 counts wheat and flour twice.',
      ],
      v: vGdpChain,
      n: 'Here is the classic trap. The tempting answer adds all three sales and gets four thousand rupees. But the wheat is inside the flour, and the flour is inside the bread. The correct answer is two thousand rupees, the value of the final bread. As a check, add only the value each stage adds: eight hundred, then four hundred, then eight hundred. That also gives two thousand.',
    }),
    sl('check', 'Quick check: GDP', {
      b: 'True or false? The value of the flour bought by a bakery is added to GDP separately from the bread it sells.',
      chk: 'tf_gdp_inter',
      n: 'Remember the bakery example. Is the flour a final good or an intermediate good?',
    }),
    sl('diagram', 'How the sectors changed in developed countries', {
      v: vHistory,
      n: 'This chart shows an imagined developed country over two hundred years. At first most people farmed, herded or fished. As farming improved, fewer farmers could feed everyone, and people moved into crafts and then factories, so the secondary sector grew. In the twentieth century services took over, and today most workers there are in the tertiary sector. Primary, then secondary, then tertiary: remember that order.',
    }),
    sl('diagram', 'India: output has shifted, jobs have not', {
      b: 'Rounded, approximate shares for recent years.',
      v: vIndia,
      n: 'Now India. Look at the first three bars. The tertiary sector produces more than half of our GDP, and the primary sector less than a fifth. Now look at the last three bars. Close to half of all workers still depend on the primary sector. So production has shifted to services, but jobs have not shifted as much. This mismatch is the central problem of this chapter.',
    }),
    sl('concept', 'Why has the tertiary sector grown so much?', {
      v: vWhyTertiary,
      n: 'Why have services grown so fast? First, every country needs basic services like hospitals, schools, police and banks. Second, as farming and industry grow, they need more transport, storage, trade and credit. Third, as incomes rise, people spend more on eating out, travel and private schools. Fourth, new technology has created whole new services, from software to digital payments. But remember: not every service job is well paid.',
    }),
    sl('check', 'Quick check: reading the pattern', {
      b: 'Which of the statements about India are correct?',
      chk: 'm_statements',
      n: 'Look back at the two sets of bars before you choose. Did jobs move as fast as output?',
    }),
    sl('two-column', 'Hidden unemployment', {
      cols: [
        '**Disguised unemployment (mainly rural)**\n\n- More people work on a task than are needed\n- Everyone looks busy\n- If some leave, **output does not fall**\n- Common on small family farms',
        '**Underemployment (rural and urban)**\n\n- People work below their capacity\n- Casual workers get work only some days\n- Vendors and repair persons wait for customers\n- Income is low and uncertain',
      ],
      n: 'If so many people are still in agriculture, are they fully employed? Often not. In disguised unemployment, more people work on a small farm than it needs. Everyone looks busy, but if some left, the harvest would be the same. In cities, many casual workers, painters and vendors find work only some days. Both are kinds of underemployment: people work, but below their capacity.',
    }),
    sl('example', 'Worked example 3: measuring disguised unemployment', {
      b: 'An imagined family in Bihar: seven members work on a 2-hectare plot. With only four members, output stays at 40 quintals.',
      bl: [
        'Step 1 — Workers really needed: **4**.',
        'Step 2 — Surplus: 7 − 4 = **3**.',
        'Step 3 — Test: output with 7 = output with 4, so the 3 add nothing.',
        'Step 4 — Conclude: **3 members are disguisedly unemployed**; they could earn elsewhere without lowering farm output.',
      ],
      v: vDisguised,
      n: 'Let us measure it. Seven family members produce forty quintals of paddy. When only four work, the plot still produces forty quintals. So three members are not really adding anything. They are disguisedly unemployed. The good news is hidden in the answer: if these three found work in a nearby mill or shop, the family\'s farm output would not fall, and its total income would rise.',
    }),
    sl('diagram', 'How can more jobs be created?', {
      v: vJobs,
      n: 'So how do we create more work? Irrigation lets farmers grow a second crop, so they need labour for more months. Roads and cold storage let produce reach bigger markets, creating jobs in transport and trade. Cheap credit helps people start small enterprises. Food-processing units in small towns use local crops. And services like tourism, health, education and IT can employ many more people, especially if they are trained.',
    }),
    sl('diagram', 'MGNREGA 2005: the right to work', {
      b: 'The **Mahatma Gandhi National Rural Employment Guarantee Act**, 2005. *Update: in December 2025 Parliament passed a new law to replace it with a rural job guarantee of 125 days; your 2026–27 syllabus still names MGNREGA 2005, so learn its features.*',
      v: vMgnrega,
      n: 'To deal with rural unemployment, Parliament passed MGNREGA in 2005. It guarantees one hundred days of unskilled manual work a year to every rural household that asks. If work is not given within fifteen days, the household gets an unemployment allowance. At least one third of the workers should be women. The works, like ponds and check dams, are chosen to raise future farm output. In December 2025 a new law was passed to replace it, but learn the 2005 Act for your exam.',
    }),
    sl('check', 'Quick check: MGNREGA', {
      b: 'If work is not given within 15 days of an application under MGNREGA, what happens?',
      chk: 'm_allowance',
      n: 'Remember why the Act is called a right to work. What does the law promise if the government does not keep its side?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Here is Part 1 in a nutshell. Work is grouped into primary, secondary and tertiary sectors, and they depend on each other. GDP adds up final goods and services, never the intermediate ones. Developed countries moved from primary to secondary to tertiary. In India, services now produce over half of GDP, but agriculture still employs the most people, many of them underemployed. MGNREGA gives rural households a legal right to one hundred days of work.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      bl: [
        'Classify by the **nature of the activity** and give the reason; repair, transport and trade are tertiary.',
        'GDP: write **final**, **within a country**, **one year**; mention double counting.',
        'Data questions: compare **output share and employment share** for each sector, quoting figures.',
        'Disguised unemployment: always add "**output does not fall** if some workers leave".',
        'MGNREGA: **100 days**, **rural households**, **15 days or allowance**, **one-third women**.',
        'Interdependence: give a **chain** through all three sectors, not a list.',
      ],
      n: 'Some tips. When you classify an activity, the reason earns the mark, so always write it. In a GDP answer, three words matter: final, within a country, and one year. In data questions, compare both columns, output and jobs, with numbers. For disguised unemployment, never forget the test: output does not fall. And for MGNREGA, four numbers and words win marks: one hundred days, rural households, fifteen days, one third women.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Sectors of the Indian Economy — Part 2: Organised and Unorganised, Public and Private',
  goals: [
    'Compare the organised and unorganised sectors and explain how unorganised workers can be protected',
    'Distinguish the public and private sectors by ownership and motive',
    'Explain why the government provides some goods and services itself',
  ],
  slides: [
    sl('title', 'Two more ways to classify work', {
      b: 'Part 2 — **organised vs unorganised** (conditions of work) and **public vs private** (ownership).',
      v: flow('LR', ['Classify by conditions of work', 'Organised and unorganised', 'Protecting workers', 'Classify by ownership', 'Public and private', 'Role of government'], 'Route map of Part 2: conditions of work, organised and unorganised sectors, protecting workers, ownership, public and private sectors, and the role of government', 'Part 2 at a glance'),
      n: 'In Part 1 we classified work by what people do. Now we use two other lenses. The first asks: what are the conditions of work? Is the job regular and protected, or not? That gives the organised and unorganised sectors. The second asks: who owns the enterprise, the government or private persons? That gives the public and private sectors. One worker can belong to several classifications at once.',
    }),
    sl('concept', 'The organised sector', {
      b: 'Enterprises or places of work where the **terms of employment are regular** and people have **assured work**.',
      v: table(['Feature', 'What it means for a worker'], [['Registered with the government', 'The enterprise must follow labour laws'], ['Appointment letter', 'Job and terms are written down'], ['Fixed hours, overtime pay', 'Extra hours are paid extra'], ['Paid leave, provident fund, medical benefits, pension', 'Protection in illness and old age']], 'Table of four features of the organised sector and what each means for a worker: registration, appointment letter, fixed hours with overtime pay, and paid leave, provident fund, medical benefits and pension'),
      n: 'The organised sector covers enterprises that are registered with the government and must follow its rules on employment. A worker gets an appointment letter, works fixed hours and is paid extra for overtime. She gets paid leave, provident fund, medical benefits and, often, a pension. Many of these rules were brought together in four labour codes that came into force in November 2025. Such jobs are regular and secure.',
    }),
    sl('diagram', 'The unorganised sector', {
      b: 'Small and scattered units, largely **outside government control**; rules exist but are **not followed**.',
      v: vWhoUnorg,
      n: 'The unorganised sector is made up of small, scattered units, often not registered. Rules may exist, but they are not followed. Jobs are low-paid and irregular, and a worker can be told to leave at any time. Look at who works here: landless labourers, small farmers, artisans, construction and domestic workers, vendors, and now many app-based delivery riders. Together, they make up a large majority of India\'s workers.',
    }),
    sl('two-column', 'Comparing the two', {
      cols: [
        '**Organised**\n\n- Registered; labour laws followed\n- Regular job, appointment letter\n- Paid leave, provident fund, pension\n- Fixed hours, overtime pay',
        '**Unorganised**\n\n- Small, scattered; rules not followed\n- Irregular work; dismissal any time\n- No paid leave or benefits\n- Long hours, low pay',
      ],
      n: 'Put the two side by side. Notice that every point has a pair: registered versus not, regular versus irregular, benefits versus none, fixed hours versus long hours. In the exam, a difference earns its mark only when you state both sides. Writing only that organised jobs are secure is half an answer; add that unorganised workers can be dismissed at any time.',
    }),
    sl('check', 'Quick check: organised sector', {
      b: 'Which of these is a feature of the **organised** sector?',
      chk: 'm_org_feature',
      n: 'Three options describe one sector and one describes the other. Which one is about protection for workers?',
    }),
    sl('diagram', 'Unorganised work inside big companies', {
      v: vShift,
      n: 'Here is a trend worth knowing. Since the nineteen nineties, many large companies have hired workers through contractors on short contracts instead of as permanent staff. These workers may work in a big, registered factory or office, but they get no paid leave, provident fund or security. So unorganised conditions have spread even inside the organised sector. The size of the employer does not decide the sector; the terms of work do.',
    }),
    sl('example', 'Worked example 1: organised or unorganised?', {
      b: 'Classify five imagined workers.',
      bl: [
        'Step 1 — Look for the clues: appointment letter, salary, paid leave, provident fund.',
        'Step 2 — If they are present, the job is **organised**.',
        'Step 3 — If pay is per piece, per day or per task with no benefits, it is **unorganised**.',
        'Step 4 — Ignore how big or famous the employer is.',
      ],
      v: vClassifyWorkers,
      n: 'Let us practise. The government nurse and the software engineer have regular salaries and benefits, so they are organised. The woman rolling agarbattis at home is paid per thousand sticks, with nothing else, so she is unorganised. The security guard works in a bank, but through a contractor without leave or security, so he is unorganised too. And the app-based driver, paid per ride, is unorganised.',
    }),
    sl('concept', 'Protecting unorganised workers', {
      v: vProtect,
      n: 'How can these workers be protected? Minimum wages must actually be paid. Social security matters most: health and accident cover and pensions, which the government now reaches through registration on the e-Shram portal, where more than thirty crore workers have registered. Small units need cheap credit, raw materials and help with marketing. Cooperatives and skill training raise incomes too. Protection is needed on economic grounds, and also on social grounds.',
    }),
    sl('check', 'Quick check: a new kind of job', {
      b: 'Ayaan delivers food in Pune through an app, paid per delivery, with no paid leave. Which sector is his work closest to?',
      chk: 'm_gig',
      n: 'Remember the last two slides. Do the size and fame of the app company decide the sector, or do the terms of work?',
    }),
    sl('diagram', 'Public and private sectors', {
      v: vPubPriv,
      n: 'Now the second lens: ownership. In the public sector, the government owns most of the assets and provides the services, like Indian Railways, India Post or a government hospital. In the private sector, individuals or companies own the assets. The motives differ too. A private firm must earn a profit to survive. The public sector aims at public welfare, and may run some services even at a loss.',
    }),
    sl('concept', 'Why the government provides some things', {
      v: vWhyGovt,
      n: 'Why can we not leave everything to private firms? Some things, like roads, bridges and dams, need huge spending, and it is hard to charge each user enough to make a profit. Some things, like cheap electricity for small industries, help development but would not pay a private firm. And many families cannot afford private prices for schools, hospitals and food. So the government steps in, paying for it from taxes.',
    }),
    sl('example', 'Worked example 2: why ration shops exist', {
      b: 'Explain how and why the government supplies cheap foodgrains.',
      bl: [
        'Step 1 — The Food Corporation of India buys wheat and rice from farmers at a **minimum support price**.',
        'Step 2 — It **stores** the grain and sends it to **ration shops**.',
        'Step 3 — Eligible families get it **cheaply or free**; about 80 crore people are covered.',
        'Step 4 — Why public? It supports **farmers** and gives the **poor** food security; the government bears the cost, so there is no profit in it.',
      ],
      v: vPds,
      n: 'Here is the public sector in action. The Food Corporation of India buys grain from farmers at a minimum support price, which protects farm incomes. It stores the grain and sends it to ration shops, where eligible families get it cheaply or free. The government pays the difference. No private trader would do this, because there is no profit in it. The motive is welfare.',
    }),
    sl('check', 'Quick check: ration shops', {
      b: 'Why does the government buy grain at a support price and sell it cheaply through ration shops?',
      chk: 'm_fci',
      n: 'Think about the motive of the public sector. Is it profit, or something else?',
    }),
    sl('example', 'Worked example 3: planning a five-mark comparison', {
      b: '*Distinguish between the organised and unorganised sectors on any five points.*',
      bl: [
        'Step 1 — Choose five **bases**: registration, rules, security, benefits, hours and pay.',
        'Step 2 — For each base, write **both** sectors in one numbered point.',
        'Step 3 — Bold the key words examiners look for.',
        'Step 4 — Stay within about 120 words; five numbered points, one mark each.',
      ],
      v: vPlan5,
      n: 'A five-mark comparison is easy to plan. Choose five bases, like registration, rules, security, benefits, and hours and pay. Then write one numbered point for each base, always stating both sectors. A table in your head turns into five clean sentences. This plan also works for public versus private sectors: ownership, motive, source of money, examples and the kind of services provided.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'Here is Part 2 in brief. The organised sector is registered, follows labour laws and gives regular jobs with benefits. The unorganised sector is small and scattered, with insecure, low-paid work, and it employs most Indian workers, so protecting them matters. The public sector is owned by the government and aims at welfare; the private sector is privately owned and aims at profit. The government provides what private firms would not.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      bl: [
        'Organised vs unorganised = **conditions of work**; public vs private = **ownership**.',
        'In a difference question, state **both sectors** in every point.',
        'Contract workers in big firms have **unorganised** conditions.',
        'Public sector motive = **welfare**, not only profit; give an example (railways, ration shops).',
        'For "protect unorganised workers", cover **wages, social security and support to small units**.',
        'One person can be in several classes: a nurse in a government hospital is tertiary, organised and public.',
      ],
      n: 'Final tips. Keep the bases of classification clear: organised and unorganised are about conditions of work; public and private are about ownership; primary, secondary and tertiary are about the nature of work. One person can belong to all three at once. In difference questions, write both sides of every point. And for protection of workers, cover wages, social security and support for small enterprises.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Sectors of the Indian Economy — Notes',
  sections: [
    {
      h: '1. Primary, secondary and tertiary sectors',
      t: 1,
      b: 'Economic activities are grouped by the **nature of the activity**.\n\n- **Primary sector:** goods produced by **using natural resources directly**: farming, dairy, fishing, forestry. Also called the **agriculture and related sector**.\n- **Secondary sector:** natural products **changed into other forms** by manufacturing: sugar from cane, cloth from cotton, furniture from wood. Also called the **industrial sector**.\n- **Tertiary sector:** activities that **do not produce a good** but provide **services**: transport, storage, communication, banking, trade, teaching, health care, IT. Also called the **service sector**.\n\n**Interdependence:** the sectors depend on each other. Farmers sell to mills and need transport and credit; mills need raw materials from farms; services earn by moving, selling and financing farm and factory goods. A crop failure, or a factory closure, spreads through all three.',
      terms: [
        ['Primary sector', 'Activities that produce goods by using natural resources directly.'],
        ['Secondary sector', 'Activities that change natural products into other forms through manufacturing.'],
        ['Tertiary sector', 'Activities that provide services which help production and meet people\'s needs.'],
        ['Interdependence', 'The dependence of each sector on the others for raw materials, markets and services.'],
      ],
      v: vSectors,
    },
    {
      h: '2. Gross Domestic Product',
      t: 2,
      b: '**GDP** is the value of all **final goods and services** produced **within a country** during a **particular year**. Adding the output of the three sectors gives GDP.\n\n- **Final goods** reach the consumer (bread, a bicycle, a haircut).\n- **Intermediate goods** are used up in making other goods (flour for a bakery, cotton yarn for a weaver).\n- Only final goods are counted, because their price **already includes** the intermediate goods; counting both is **double counting**. Adding the **value added** at each stage gives the same total.\n\nIn India, GDP is estimated by the **National Statistics Office** under the central government\'s Ministry of Statistics and Programme Implementation.',
      terms: [
        ['Gross Domestic Product (GDP)', 'The value of all final goods and services produced within a country in a year.'],
        ['Final goods', 'Goods bought by the final user, not used up in producing other goods.'],
        ['Intermediate goods', 'Goods used up as inputs in producing other goods.'],
        ['Value added', 'The value of a stage\'s output minus the value of the inputs it bought.'],
      ],
      v: vGdpChain,
    },
    {
      h: '3. Changing importance of the sectors',
      t: 2,
      b: '**Developed countries:** at first most people worked in the primary sector. Better farming freed labour; with new methods, factories spread and the **secondary sector** became most important. Over the last century the **tertiary sector** became the largest in both output and employment.\n\n**India:** over the decades the **tertiary sector** has become the **largest producing sector**; it now produces more than half of GDP, while the primary sector produces less than a fifth. But **employment has not shifted as much**: the primary sector is still the **largest employer**, with a little under half of all workers.\n\n**Why services grew:** basic services (hospitals, schools, police, courts, banks); support for farming and industry (transport, storage, trade, credit); rising incomes (eating out, tourism, private schools and hospitals); and new IT-based services. **But** growth is uneven: alongside well-paid IT and finance jobs are many small shopkeepers, vendors and repair persons who earn little.',
      terms: [
        ['Largest producing sector (India)', 'The tertiary sector, with more than half of GDP.'],
        ['Largest employer (India)', 'The primary sector, with a little under half of all workers.'],
      ],
      v: vIndia,
    },
    {
      h: '4. Disguised unemployment and underemployment',
      t: 2,
      b: 'Because jobs have not grown enough outside agriculture, many people remain on farms.\n\n- **Disguised unemployment:** more people work on a task than are needed. All **appear employed**, but if some leave, **output does not fall**. Typical of small family farms.\n- **Underemployment:** people work **below their potential**. In cities, casual workers (painters, plumbers, loaders) find work only some days; vendors wait all day for few customers.\n\nThe surplus workers could move to other work **without reducing farm output**, so creating such work raises incomes.',
      terms: [
        ['Disguised unemployment', 'A situation in which more people are working than needed, so removing some does not lower output.'],
        ['Underemployment', 'Working below one\'s capacity, for too few days or with too little to do.'],
      ],
      v: vDisguised,
    },
    {
      h: '5. Creating more employment; MGNREGA 2005',
      t: 3,
      b: '**Ways to create jobs:** irrigation for a second crop; rural roads, transport and **cold storage**; **cheap credit** from banks and self-help groups for small enterprises; **agro-processing** units in small towns; and services such as **tourism, health, education and IT**, with skill training.\n\n**MGNREGA 2005** (Mahatma Gandhi National Rural Employment Guarantee Act):\n- guarantees **100 days** of unskilled manual work in a year to every **rural household** that demands it;\n- if work is not given within **15 days**, an **unemployment allowance** is due, which is why it is called a **right to work**;\n- at least **one-third** of the workers should be **women**;\n- works that raise land productivity and reduce environmental damage are preferred: water conservation, check dams, ponds, tree planting, land development, rural roads;\n- wages are paid into bank or post-office accounts; **social audits** by the gram sabha check the work.\n\n*Update:* in December 2025 Parliament passed a new law (the Viksit Bharat – Guarantee for Rozgar and Ajeevika Mission (Gramin) Act) to replace MGNREGA with a rural job guarantee of **125 days**. The 2026–27 CBSE syllabus still names MGNREGA 2005; learn its features for the exam.',
      terms: [
        ['MGNREGA', 'The 2005 Act guaranteeing 100 days of wage work a year to rural households that ask for it.'],
        ['Unemployment allowance', 'Payment due when work demanded under the Act is not provided within 15 days.'],
        ['Social audit', 'A public check of works and payments by the gram sabha.'],
      ],
      v: vMgnrega,
      vs: [vJobs],
    },
    {
      h: '6. Organised and unorganised sectors',
      t: 4,
      b: 'This classification is based on **conditions of work**.\n\n- **Organised sector:** enterprises **registered** with the government that follow labour laws. Jobs are **regular**, with an appointment letter, fixed hours, overtime pay, **paid leave, provident fund, medical benefits** and often a pension. (Since November 2025 many older labour laws have been merged into **four labour codes**.)\n- **Unorganised sector:** **small and scattered** units, largely outside government control; rules are **not followed**. Work is **low-paid, irregular** and insecure; there is no paid leave or provident fund, and workers can be dismissed any time.\n\n**Who:** landless labourers, small farmers, sharecroppers and artisans in villages; construction, domestic and head-load workers, vendors and workers in small workshops in towns; app-based delivery and ride workers paid per task. Workers from socially disadvantaged communities and many women are over-represented. A large majority of India\'s workers, around nine in ten, work without formal protection.\n\n**Trend:** since the 1990s, more firms hire through **contractors**, so unorganised conditions spread even inside organised enterprises.\n\n**Protection:** enforce **minimum wages**; **social security** (health and accident cover, pensions) through registration on the **e-Shram** portal; cheap credit, raw materials and marketing for small units; cooperatives and skill training.',
      terms: [
        ['Organised sector', 'Registered enterprises with regular, protected jobs governed by labour laws.'],
        ['Unorganised sector', 'Small, scattered units where employment rules are largely not followed.'],
        ['e-Shram', 'The government\'s national register of unorganised workers, used to reach them with social security.'],
      ],
      v: vOrg,
      vs: [vProtect],
    },
    {
      h: '7. Public and private sectors',
      t: 5,
      b: 'This classification is based on **ownership**.\n\n- **Public sector:** the **government owns** most assets and provides the services: Indian Railways, India Post, government schools and hospitals. Aim: **public welfare**.\n- **Private sector:** **individuals or companies** own the assets. Aim: **profit**.\n\n**Why the government provides some things:**\n1. **Infrastructure** (roads, bridges, railways, ports, dams) needs huge spending, and it is hard to charge every user enough for a profit.\n2. **Support to producers:** cheap electricity for small industries; grain bought from farmers at a **minimum support price** by the Food Corporation of India.\n3. **Food security:** grain sold cheaply or given free through **ration shops** (about 80 crore people are covered).\n4. **Health, education and nutrition** for families who cannot pay private prices.\n\nThe money comes mainly from **taxes**.',
      terms: [
        ['Public sector', 'The part of the economy owned and run by the government, aiming at welfare.'],
        ['Private sector', 'The part of the economy owned by individuals or companies, aiming at profit.'],
        ['Minimum support price', 'The price at which the government buys certain crops from farmers.'],
      ],
      v: vPubPriv,
      vs: [vPds],
    },
  ],
  tips: '**Common mistakes**\n- Classifying by the place of work: a boat-repair workshop is **tertiary** (a service); a potter at home is **secondary**.\n- Leaving out "**final**" in the definition of GDP, or adding intermediate goods (double counting).\n- Saying the tertiary sector employs the most people in India: it **produces** the most; the **primary** sector **employs** the most.\n- Defining disguised unemployment without the test "**output does not fall**".\n- Saying MGNREGA covers cities or gives 100 days per person: it is **100 days per rural household**.\n- Treating every worker of a big company as organised: **contract workers** are not protected.\n- Mixing up the bases: organised/unorganised = conditions of work; public/private = ownership.\n\n**How marks are usually awarded**\n- 1-mark MCQ and assertion-reason: one correct option.\n- 2 marks: two points, or a point with an example (about 40 words).\n- 3 marks: three distinct points (about 60 words); difference questions state both sides.\n- 5 marks: five numbered points (about 120 words); data questions quote figures, interpret them and suggest a remedy.\n\n**Data in SOYL practice** are imagined but realistic; your board paper will give its own table. Compare every row and column before you write.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is an **economic activity**?', 'Any work that produces a **good or a service**, usually for money.', 'definition', 1],
  ['**Primary sector**', 'Produces goods by using **natural resources directly**: farming, dairy, fishing, forestry.', 'definition', 1],
  ['Another name for the primary sector', '**Agriculture and related sector**.', 'fact', 1],
  ['**Secondary sector**', 'Changes natural products into **other forms by manufacturing**; also the **industrial sector**.', 'definition', 1],
  ['**Tertiary sector**', 'Provides **services** (transport, banking, trade, teaching, health, IT); also the **service sector**.', 'definition', 1],
  ['Sector of a **boat-repair yard**?', '**Tertiary**: repair is a service.', 'example', 1],
  ['Sector of a **potter** making pots at home?', '**Secondary**: clay is changed into pots.', 'example', 1],
  ['Example of **interdependence**', 'Cane crop fails → sugar mill lacks raw material → truckers, traders and banks lose business.', 'example', 1],
  ['**GDP**', 'Value of all **final** goods and services produced **within a country** in **a year**.', 'definition', 2],
  ['**Final good** vs **intermediate good**', 'Final: bought by the user (bread). Intermediate: used up in making another good (flour for a bakery).', 'concept', 2],
  ['Why are intermediate goods not counted in GDP?', 'Their value is already inside the final good: counting them is **double counting**.', 'concept', 2],
  ['Who estimates India\'s GDP?', 'The **National Statistics Office** of the Ministry of Statistics and Programme Implementation.', 'fact', 2],
  ['Order of importance of sectors in developed countries', '**Primary → secondary → tertiary**.', 'concept', 2],
  ['India\'s **largest producing** sector', '**Tertiary**: more than half of GDP.', 'fact', 2],
  ['India\'s **largest employer**', '**Primary**: a little under half of all workers.', 'fact', 2],
  ['Four reasons for the growth of services', 'Basic services; support for other sectors; rising incomes; new IT-based services.', 'concept', 2],
  ['**Disguised unemployment**', 'More workers than needed; all look busy; if some leave, **output does not fall**.', 'definition', 2],
  ['**Underemployment** in a city: example', 'A painter who finds paid work only two or three days a week.', 'example', 2],
  ['7 work a plot, 4 give the same output', '**3** are disguisedly unemployed.', 'example', 2],
  ['Five ways to create rural jobs', 'Irrigation, roads and cold storage, cheap credit, agro-processing, services (tourism, health, education).', 'concept', 3],
  ['**MGNREGA**: year and guarantee', '**2005**; **100 days** of unskilled manual work a year per **rural household**.', 'fact', 3],
  ['MGNREGA: if no work in **15 days**?', 'An **unemployment allowance** is due — hence the "right to work".', 'fact', 3],
  ['MGNREGA: share for women', 'At least **one-third** of the workers.', 'fact', 3],
  ['Update on MGNREGA (December 2025)', 'A new law was passed to replace it with a **125-day** rural job guarantee; the 2026–27 syllabus still names MGNREGA 2005.', 'fact', 3],
  ['**Organised sector**', 'Registered enterprises; labour laws followed; **regular jobs** with paid leave, provident fund, medical benefits.', 'definition', 4],
  ['**Unorganised sector**', 'Small, scattered units; rules **not followed**; **low-paid, irregular, insecure** work.', 'definition', 4],
  ['Is a contract worker in a big factory organised?', 'Usually **no**: without security or benefits, the conditions are unorganised.', 'exam-tip', 4],
  ['Three ways to protect unorganised workers', 'Minimum wages; social security (e-Shram registration, pensions, insurance); credit and marketing for small units.', 'concept', 4],
  ['**Public sector**', 'Government **owns** most assets and provides services; aim: **welfare**.', 'definition', 5],
  ['**Private sector**', 'Individuals or companies own the assets; aim: **profit**.', 'definition', 5],
  ['Why does the government build rural roads?', 'Huge cost, and users cannot easily be charged enough for a profit.', 'concept', 5],
  ['Bases of the three classifications', 'Nature of work (primary/secondary/tertiary); conditions of work (organised/unorganised); ownership (public/private).', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const SST_SHORT = 'cbse-10-social-science-chapter-test-short';
const SST_LONG = 'cbse-10-social-science-chapter-test-long';
const T_SHORT = test({
  kind: 'short',
  blueprint: SST_SHORT,
  title: 'Chapter test (short) — Sectors of the Indian Economy',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_mushroom', 'm_largest_output', 'm_registered', 'ar_support'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s_disguised', 's_pub_priv', 's3_tertiary_reasons'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 120 words.', items: [{ attempt: 1, keys: ['l_disguised', 'l_org_unorg'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_gramsabha'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: SST_LONG,
  title: 'Chapter test (long) — Sectors of the Indian Economy',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_drought_chain', 'm_gdp_def', 'm_double', 'm_not_reason', 'm_mgnrega_days', 'm_contract', 'm_motive', 'm_roads_why', 'ar_lowpaid', 'ar_insecurity'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words. Questions 13 and 15 have an internal choice.', items: ['s_prim_sec', 's_mgnrega_feat', { attempt: 1, keys: ['s_why_protect', 's_not_private'] }, 's3_jobs_lag', { attempt: 1, keys: ['s3_nurse_domestic', 's3_govt_role'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer the data-based question 16, and any ONE of questions 17 and 18, in about 120 words each.', items: ['l_data_ranipur', { attempt: 1, keys: ['l_mgnrega', 'l_public_role'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_rider', 'sb_letter'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-10-social-science-ch19 only (three sectors; GDP and employment; MGNREGA and creating jobs; organised/unorganised; public/private)',
    originality: 'every scenario, table and source written for this chapter (imagined people, places and figures); no NCERT exercise, boxed example or board-paper item reused',
    data: 'imagined tables recomputed by the build (shares add to 100; Navgarh 360/600 = 60%, 120/250 = 48%, 90/600 = 15%; Ranipur columns sum to 100; wheat-flour-bread value added 800 + 400 + 800 = 2,000); India shares shown only as rounded, approximate values for recent years',
    facts: 'MGNREGA 2005 provisions (100 days per rural household, 15 days or allowance, one-third women, social audit); December 2025 replacement law and the four labour codes (November 2025) given as dated updates; e-Shram; FCI, MSP and ration shops',
    gate: 'npm test -w @soyl/content-templates, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
