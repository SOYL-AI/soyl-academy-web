// Build CBSE 10 Social Science ch21 Globalisation and the Indian Economy. Run from platform/:
//   npx tsx content/authored/social-science/cbse-10-social-science-ch21/src/build.mjs
// Board scope: t01 (What is globalisation?) and t02 (Factors that have enabled globalisation).
// t03 is assessed only through the interdisciplinary project: Part 2 is a project-companion deck,
// its items are labelled practice-only, and the chapter tests use t01–t02 items only.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

setUnit('cbse-10-social-science-ch21', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vChannels = table(
  ['Channel', 'What moves', 'Example (imagined or general)'],
  [
    ['Trade', 'Goods and services', 'Indian medicines sold in Africa; software services for banks abroad'],
    ['Investment', 'Money spent on factories, offices, machines', 'A foreign company builds a factory in Gujarat'],
    ['Technology', 'Machines, software, know-how', 'Indian hospitals use scanners designed abroad'],
    ['People', 'Workers and students', 'Nurses and engineers working abroad (limited by visas)'],
  ],
  'Table of the four channels of globalisation: trade in goods and services, investment, technology, and people, with an example of each',
);
const vMarkets = flow(
  'LR',
  ['Producers sell beyond their own country', 'Buyers get goods from many countries', 'Competition across borders', 'Markets of different countries become one connected market'],
  'Flow: producers sell beyond their own country, buyers get goods from many countries, competition crosses borders, and markets become connected',
  'Foreign trade integrates markets',
);
const vMnc = table(
  ['Idea', 'Meaning'],
  [
    ['Multinational corporation (MNC)', 'A company that owns or controls production in more than one nation'],
    ['Investment', 'Money spent to buy assets such as land, buildings, machines and equipment'],
    ['Foreign investment', 'Investment made by MNCs in other countries'],
    ['Where MNCs produce', 'Close to markets, where labour and other resources are cheap, and where government policies help'],
  ],
  'Table defining an MNC, investment and foreign investment, and where MNCs choose to produce: near markets, with cheap labour and resources, and helpful policies',
);
const vScooter = table(
  ['Part of an imagined electric scooter', 'Where it is made'],
  [
    ['Design and software', 'Bengaluru, India'],
    ['Battery cells', 'South Korea'],
    ['Motor', 'China'],
    ['Brake system', 'Germany'],
    ['Assembly', 'Hosur, Tamil Nadu'],
    ['Sold in', 'India and 15 other countries'],
  ],
  'Table of where the parts of an imagined electric scooter are made: design in Bengaluru, battery cells in South Korea, motor in China, brakes in Germany, assembly in Hosur, sold in India and 15 other countries',
  'Imagined example: one product, many countries.',
);
const vFreedom = table(
  ['What crosses borders', 'How freely today', 'Why'],
  [
    ['Goods', 'Very freely', 'Lower import taxes; containers; WTO rules'],
    ['Investment', 'Freely in most sectors', 'Governments invite foreign investment'],
    ['Technology', 'Freely', 'Internet, licensing, MNCs'],
    ['People', 'Least freely', 'Visas, work permits, immigration rules'],
  ],
  'Table of how freely things cross borders: goods very freely, investment freely in most sectors, technology freely, people least freely because of visas and immigration rules',
);
const vFactors = flow(
  'TB',
  ['Factors that enabled globalisation', 'Technology: transport (containers, air freight)', 'Technology: information and communication (internet, telecom, computers)', 'Liberalisation of foreign trade and investment policy', 'World Trade Organisation rules'],
  'Flow from the heading Factors that enabled globalisation to four factors: transport technology, information and communication technology, liberalisation of trade and investment policy, and WTO rules',
  'Three big factors (technology counted in two parts)',
  [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
    { from: 'n1', to: 'n4' },
    { from: 'n1', to: 'n5' },
  ],
);
const vContainer = flow(
  'LR',
  ['Factory packs goods into a container', 'Truck or train carries the container to port', 'Crane lifts it onto a ship', 'Ship to a port abroad', 'Container reaches the buyer unopened'],
  'Flow of a container journey: packed at the factory, carried by truck or train, lifted onto a ship, shipped abroad, and delivered unopened to the buyer',
  'Containers cut handling time and cost',
);
const vIt = table(
  ['Service done in India (imagined)', 'Customer abroad'],
  [
    ['Software maintenance by a firm in Hyderabad', 'A bank in London'],
    ['Reading of medical scans by radiologists in Chennai', 'Hospitals in Australia'],
    ['Animation for a cartoon series, studio in Pune', 'A TV channel in the USA'],
    ['Accounts and payroll by a firm in Gurugram', 'A retail chain in Canada'],
  ],
  'Table of four services done in India for customers abroad through information technology: software maintenance, reading medical scans, animation, and accounts and payroll',
);
const vBarriers = table(
  ['Trade barrier', 'What it does', 'Example (imagined)'],
  [
    ['Tax on imports (tariff)', 'Makes imported goods dearer', '40% duty on imported bicycles'],
    ['Quota', 'Limits the quantity that may be imported', 'Only 10,000 tonnes of edible oil a year'],
    ['Licence or permission', 'Imports allowed only with government approval', 'Licence needed to import machines'],
  ],
  'Table of three trade barriers: a tax on imports makes them dearer, a quota limits quantity, and licences require government permission, each with an imagined example',
);
const vTariff = table(
  ['', 'Duty 25%', 'Duty 5%'],
  [
    ['Price of imported lamp before duty', '₹1,200', '₹1,200'],
    ['Duty', '1,200 × 25 ÷ 100 = ₹300', '1,200 × 5 ÷ 100 = ₹60'],
    ['Price in the market', '₹1,500', '₹1,260'],
  ],
  'Table: an imported lamp costing 1,200 rupees sells for 1,500 rupees with a 25 per cent duty and for 1,260 rupees with a 5 per cent duty',
  'Imagined figures.',
);
const vTimeline = flow(
  'LR',
  ['After 1947: barriers protect young industries', '1991: barriers removed to a large extent', '1995: India a founding member of the WTO', '2020s: trade agreements with partners such as the UAE, Australia and the UK'],
  'Timeline flow: barriers after 1947 to protect young industries, liberalisation from 1991, India a founding member of the WTO in 1995, and trade agreements in the 2020s with partners such as the UAE, Australia and the UK',
  'India\'s trade policy over time',
);
const vWto = table(
  ['Question', 'Answer'],
  [
    ['What is its aim?', 'To liberalise international trade'],
    ['How?', 'By setting rules for trade that members agree to follow, and settling trade disputes'],
    ['Members', 'More than 160 countries; India since its start in 1995'],
    ['Who started it?', 'It came about at the initiative of developed countries'],
    ['Criticism', 'Developed countries keep barriers and large farm subsidies while developing countries are pressed to open up'],
  ],
  'Table on the World Trade Organisation: its aim, how it works, members, who started it, and the criticism that developed countries keep barriers and farm subsidies',
);
const vPlan = table(
  ['Point', 'Factor', 'Detail to write'],
  [
    ['1', 'Transport technology', 'Containers, cheaper air freight: less time and cost'],
    ['2', 'Information technology', 'Internet, telecom: services delivered across countries'],
    ['3', 'Liberalisation', 'Removal of barriers on trade and investment'],
    ['4', 'India 1991', 'Barriers removed so Indian producers compete globally'],
    ['5', 'WTO', 'Rules to liberalise trade; criticism of unfair practice'],
  ],
  'Answer plan table for a five-mark question on the factors of globalisation: transport technology, information technology, liberalisation, India in 1991, and the WTO',
  'One mark per point.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Globalisation', 'Rapid integration of countries: trade, investment, technology, people'],
    ['MNC', 'Owns or controls production in more than one nation'],
    ['Integration of markets', 'Producers sell abroad, buyers get foreign goods, choice widens'],
    ['Technology', 'Containers and air freight; internet and telecom'],
    ['Liberalisation', 'Removing barriers such as import taxes and quotas; India from 1991'],
    ['WTO', 'Aims to liberalise trade; criticised for unfair practice'],
  ],
  'Summary table of Part 1: globalisation, MNCs, integration of markets, technology, liberalisation and the WTO',
);
const vStrategies = table(
  ['How MNCs spread production', 'Imagined example'],
  [
    ['Joint production with a local company', 'A foreign carmaker and an Indian firm build a plant together'],
    ['Buying a local company', 'An MNC buys a popular Indian snack brand'],
    ['Large orders with small producers', 'A sports brand orders jerseys from small units in Tiruppur'],
  ],
  'Table of three ways MNCs spread production: joint production with a local company, buying a local company, and placing large orders with small producers',
);
const vCashew = flow(
  'LR',
  ['Small processors in Kollam shell and grade cashews', 'An MNC buys them at a fixed price', 'Packed under the MNC\'s brand', 'Sold in supermarkets in Europe and the Gulf'],
  'Flow: small cashew processors in Kollam sell to an MNC at a fixed price, the nuts are packed under the MNC brand, and sold in supermarkets in Europe and the Gulf',
  'Imagined example: interlinked production',
);
const vSez = table(
  ['Policy', 'What it offers'],
  [
    ['Special Economic Zones (SEZ Act, 2005)', 'World-class power, water, roads, transport and storage; tax benefits for some years'],
    ['Production-linked incentives (since 2020)', 'Payments to firms that raise production in India, e.g. mobile phones'],
    ['Easier rules for foreign investment', 'Foreign investment allowed in most sectors'],
  ],
  'Table of policies to attract foreign investment: Special Economic Zones under the 2005 Act, production-linked incentives since 2020, and easier rules for foreign investment',
);
const vImpact = table(
  ['Group', 'Gains', 'Losses'],
  [
    ['Consumers (especially well-off, urban)', 'Choice, quality, lower prices', '—'],
    ['Large Indian companies', 'New technology, partners, markets abroad', 'Tougher competition'],
    ['Small producers', 'Some get orders from MNCs', 'Many hit by cheaper imports'],
    ['Workers', 'New jobs in some sectors', 'More temporary, insecure jobs'],
  ],
  'Table of the impact of globalisation on consumers, large Indian companies, small producers and workers, showing gains and losses for each',
);
const vIndianMnc = table(
  ['Indian company', 'Global move'],
  [
    ['Tata Steel', 'Bought the European steelmaker Corus in 2007'],
    ['Bharti Airtel', 'Took over mobile networks in many African countries in 2010'],
    ['Indian IT companies', 'Offices and clients across the world'],
  ],
  'Table of Indian companies that went global: Tata Steel bought Corus in 2007, Bharti Airtel took over mobile networks in Africa in 2010, and Indian IT companies operate worldwide',
);
const vFair = flow(
  'TB',
  ['Fair globalisation: benefits shared by all', 'Government enforces labour laws', 'Government supports small producers', 'Developing countries negotiate fairer WTO rules together', 'People\'s organisations and campaigns'],
  'Flow from fair globalisation to four supports: enforcing labour laws, supporting small producers, negotiating fairer WTO rules together, and people\'s organisations',
  'Making globalisation fairer',
  [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
    { from: 'n1', to: 'n4' },
    { from: 'n1', to: 'n5' },
  ],
);
const vSurvey = table(
  ['Product in a local shop (imagined survey)', 'Brand from', 'Made in', 'Price (₹)'],
  [
    ['Smartphone', 'South Korea', 'Uttar Pradesh, India', '15,000'],
    ['Running shoes', 'USA', 'Vietnam', '4,500'],
    ['Biscuits', 'India', 'India', '30'],
    ['Washing machine', 'Japan', 'Maharashtra, India', '24,000'],
  ],
  'Table from an imagined shop survey listing four products with the brand country, the place of manufacture and the price',
  'Imagined survey for a project.',
);
const vProjectPlan = table(
  ['Section of the project', 'What to include'],
  [
    ['1. Question', 'e.g. "Who gains from globalisation in my town?"'],
    ['2. Data', 'A shop survey, interviews with a shopkeeper, a worker, a small producer'],
    ['3. Gains', 'Choice, prices, jobs, new markets'],
    ['4. Losses', 'Small producers hurt, insecure jobs'],
    ['5. Judgement', 'Balanced conclusion with suggestions for fair globalisation'],
  ],
  'Plan for a project on globalisation in five sections: question, data, gains, losses and a balanced judgement with suggestions',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['How MNCs spread', 'Joint production, buying local firms, orders with small producers'],
    ['Attracting investment', 'SEZs, incentives, easier rules'],
    ['Impact', 'Consumers and big firms gain; small producers and many workers struggle'],
    ['Indian MNCs', 'Some Indian firms now invest abroad'],
    ['Fair globalisation', 'Labour laws, support for small producers, fairer WTO rules'],
  ],
  'Summary table of Part 2: how MNCs spread production, attracting investment, impact, Indian MNCs and fair globalisation',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Globalisation and the Indian Economy — Part 1: What Globalisation Is and What Enabled It',
  goals: [
    'Define globalisation as the integration of countries through trade, investment, technology and the movement of people',
    'Explain the role of MNCs and foreign trade in integrating markets',
    'Explain how transport and information technology enabled globalisation',
    'Explain liberalisation of trade and investment, India\'s 1991 changes and the role of the WTO',
  ],
  slides: [
    sl('title', 'Globalisation and the Indian Economy', {
      b: 'Part 1 — **what globalisation is** and the **factors that made it possible**. *These two topics are the board-exam part of this chapter.*',
      v: flow('LR', ['What is globalisation?', 'MNCs and investment', 'Integration of markets', 'Technology', 'Liberalisation and the WTO'], 'Route map of Part 1: what globalisation is, MNCs and investment, integration of markets, technology, and liberalisation and the WTO', 'Part 1 at a glance'),
      n: 'Namaste! Look at the things around you: your phone, your shoes, the fruit in your kitchen. Many of them were designed, made or grown in other countries, and many things made in India are used abroad. This deep connection between countries is called globalisation. In this part we ask what globalisation is, and what made it possible. These two topics are what the board exam tests from this chapter.',
    }),
    sl('concept', 'What is globalisation?', {
      b: '**Globalisation** is the process of **rapid integration or interconnection** between countries.',
      v: vChannels,
      n: 'Globalisation means that countries are becoming closely connected, very quickly. They connect in four ways. Goods and services are traded. Companies invest in factories and offices abroad. Technology, like machines and software, moves across borders. And people move for work and study. When you answer a question on globalisation, name these four channels and give an example of each.',
    }),
    sl('diagram', 'Foreign trade connects markets', {
      v: vMarkets,
      n: 'Start with trade. Foreign trade lets producers sell beyond their own country, and lets buyers choose goods made abroad. Ratnagiri mangoes reach London; New Zealand kiwis reach Pune. Sellers from many countries now compete in the same market, so choice widens and prices tend to come closer. When markets in different countries become linked like this, we say they are integrated.',
    }),
    sl('check', 'Quick check: mangoes and kiwis', {
      b: 'Indian mangoes are sold in London, and New Zealand kiwis in Pune. What does this show?',
      chk: 'm_market_integration',
      n: 'Think about what happens to markets when goods from many countries are sold side by side.',
    }),
    sl('concept', 'Multinational corporations and investment', {
      v: vMnc,
      n: 'Multinational corporations play a big part. An MNC owns or controls production in more than one country. When it spends money on land, buildings and machines abroad, that is foreign investment. Where does an MNC set up? Close to its markets, where labour and resources are cheap, and where government policies are helpful. By investing and producing across countries, MNCs move goods, money and technology across borders.',
    }),
    sl('example', 'Worked example 1: one product, many countries', {
      b: 'Trace an imagined electric scooter and decide what it tells us about globalisation.',
      bl: [
        'Step 1 — List where each part is made: Bengaluru, South Korea, China, Germany, Hosur.',
        'Step 2 — Identify the channels: **trade** in parts, **investment** in plants, **technology** in design and batteries.',
        'Step 3 — Note where it is sold: India and 15 other countries.',
        'Step 4 — Conclude: production and markets of many countries are **integrated** in one product.',
      ],
      v: vScooter,
      n: 'Let us read one product like a map. This imagined electric scooter is designed in Bengaluru, its battery cells come from South Korea, the motor from China and the brakes from Germany, and it is assembled in Hosur. It is then sold in sixteen countries. Trade, investment and technology are all at work in a single product. That is globalisation in one picture.',
    }),
    sl('diagram', 'What moves freely, and what does not', {
      v: vFreedom,
      n: 'Not everything moves equally freely. Goods cross borders very easily now, because taxes on imports are lower and transport is cheap. Investment and technology also move freely in most sectors. But people move least freely: countries control who may enter and work through visas and immigration rules. So, in today\'s globalisation, a phone travels more easily than the engineer who designed it.',
    }),
    sl('check', 'Quick check: the least free', {
      b: 'Which of these has moved least freely between countries in recent globalisation?',
      chk: 'm_people_least',
      n: 'Think about what you need to cross a border yourself, compared with a parcel.',
    }),
    sl('diagram', 'What made globalisation possible?', {
      v: vFactors,
      n: 'Now the second board topic: the factors that enabled globalisation. There are three big ones. First, technology, in two parts: transport technology, which moves goods cheaply, and information and communication technology, which moves information instantly. Second, liberalisation: governments removing barriers on trade and investment. Third, international rules made through the World Trade Organisation. Let us take them one by one.',
    }),
    sl('concept', 'Factor 1: transport technology', {
      b: 'Goods are packed in **containers**, which move intact between trucks, trains and ships.',
      v: vContainer,
      n: 'In the past, every sack and box was loaded onto ships by hand, one at a time, and loading took weeks. Today goods are packed in standard steel containers at the factory. The container travels by truck or train, is lifted onto a ship by a crane in minutes, and reaches the buyer unopened. Along with cheaper air freight, this has cut the time and cost of moving goods across the world.',
    }),
    sl('concept', 'Factor 1: information and communication technology', {
      v: vIt,
      n: 'The second part of technology is information and communication. Computers, the internet, mobile phones and satellite links let information travel instantly. So services can now be produced in one country and delivered in another. Indian firms maintain software for foreign banks, read medical scans for hospitals abroad, make animation and keep accounts, all without anyone travelling. Firms also use these tools to coordinate production spread across countries.',
    }),
    sl('check', 'Quick check: comics from Kochi', {
      b: 'A Kochi studio colours a comic book for a publisher in Tokyo and sends the files over the internet the same evening. Which factor makes this possible?',
      chk: 'm_it',
      n: 'Ask what carried the work from Kochi to Tokyo. Was it a ship, a person or something else?',
    }),
    sl('concept', 'Trade barriers', {
      b: 'A **trade barrier** is a restriction on foreign trade set by the government.',
      v: vBarriers,
      n: 'Before we discuss liberalisation, we need to know what a trade barrier is. It is any restriction a government puts on foreign trade. A tax on imports makes foreign goods dearer. A quota limits the quantity that may come in. A licence means imports need government permission. Governments use barriers to decide what, and how much, comes into the country, often to protect their own producers.',
    }),
    sl('example', 'Worked example 2: how an import duty changes a price', {
      b: 'An imported lamp costs ₹1,200 before duty (imagined). Find its market price with a 25% duty and with a 5% duty.',
      bl: [
        'Step 1 — Duty at 25%: 1,200 × 25 ÷ 100 = **₹300**, so price = **₹1,500**.',
        'Step 2 — Duty at 5%: 1,200 × 5 ÷ 100 = **₹60**, so price = **₹1,260**.',
        'Step 3 — Cutting the duty lowers the price by **₹240**.',
        'Step 4 — Interpret: imports become cheaper, so buyers gain and local makers face more competition.',
      ],
      v: vTariff,
      n: 'See a trade barrier in numbers. With a twenty five per cent duty, a lamp costing twelve hundred rupees sells for fifteen hundred. Cut the duty to five per cent and it sells for twelve hundred and sixty. That is two hundred and forty rupees cheaper. Buyers gain, but a local lamp maker now faces tougher competition. This is exactly the trade-off governments weigh when they liberalise.',
    }),
    sl('diagram', 'Factor 2: liberalisation in India', {
      v: vTimeline,
      n: 'Here is India\'s story. After independence, the government put barriers on foreign trade and investment to protect young Indian industries from foreign competition. In nineteen ninety one, it decided Indian producers were ready to compete with the world, and removed barriers to a large extent. Removing such barriers is called liberalisation. India joined the World Trade Organisation when it began in nineteen ninety five, and has recently signed new trade agreements.',
    }),
    sl('two-column', 'Why protect then, why open later?', {
      cols: [
        '**After 1947: protection**\n\n- Industries were just starting\n- Foreign firms were bigger and more experienced\n- Barriers gave Indian producers time to grow\n- Imports limited to essentials such as machinery and oil',
        '**From 1991: liberalisation**\n\n- Indian producers judged ready to compete\n- Competition expected to raise quality and efficiency\n- Easier imports of machines and inputs\n- Foreign investment invited in many sectors',
      ],
      n: 'Compare the two periods. After independence, Indian industries were young, and foreign firms were much stronger, so barriers gave Indian producers time to grow. By nineteen ninety one, the government felt the time had come for them to compete. It expected competition to improve quality and efficiency. In an exam, always give the reason for each policy, not just the date.',
    }),
    sl('check', 'Quick check: a limit on oil imports', {
      b: 'A country allows only 10,000 tonnes of edible oil to be imported in a year. What is this?',
      chk: 'm_quota',
      n: 'Is this limit about the price of the imports, or the quantity?',
    }),
    sl('diagram', 'Factor 3: the World Trade Organisation', {
      v: vWto,
      n: 'The third factor is the World Trade Organisation. Its aim is to liberalise international trade, and it does this by setting rules that members agree to follow. More than one hundred and sixty countries are members. But developing countries have a complaint. Some rich countries keep their own barriers and pay large subsidies to their farmers, while pressing poorer countries to open up. So the rules are not always applied fairly.',
    }),
    sl('example', 'Worked example 3: planning a five-mark answer on the factors', {
      b: '*Explain the factors that have enabled globalisation.* (5 marks)',
      bl: [
        'Step 1 — Split technology into **transport** and **information** technology (two points).',
        'Step 2 — Explain **liberalisation** and give India\'s **1991** example (two points).',
        'Step 3 — Add the **WTO**: its aim, and the criticism of unfair practice.',
        'Step 4 — Each point: the factor, then **what it changed** (cost, time, barriers).',
      ],
      v: vPlan,
      n: 'Here is a plan that earns all five marks. Split technology into two points: transport, and information technology. Then explain liberalisation, and give India\'s example from nineteen ninety one. End with the World Trade Organisation, its aim, and the criticism. For every factor, write what it changed: lower cost, less time, or fewer barriers. That link is what examiners reward.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Here is Part 1 in brief. Globalisation is the rapid integration of countries through trade, investment, technology and the movement of people. MNCs and foreign trade connect markets and give consumers wider choice. Three factors made it possible: technology in transport and communication, liberalisation of trade and investment, which India began in nineteen ninety one, and the rules of the World Trade Organisation.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      bl: [
        'Definition: "**rapid integration or interconnection between countries**", then the four channels.',
        'MNC: "owns or **controls production** in **more than one nation**".',
        'Trade barrier example: **tax on imports**; liberalisation = **removing** barriers.',
        'India: barriers after independence to **protect young industries**; removed from **1991** to compete.',
        'WTO: aim = **liberalise international trade**; add the **criticism** in longer answers.',
        'Only this part (what globalisation is, and its factors) is examined in the board paper.',
      ],
      n: 'Some tips. Learn the definition word for word in your own phrasing: rapid integration or interconnection between countries. For an MNC, the key words are controls production in more than one nation. For a trade barrier, give a tax on imports as the example. For India, always pair a date with a reason. And for the WTO, state its aim, and in longer answers add the criticism of unfair practice.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Globalisation and the Indian Economy — Part 2: Production Across Countries and Fair Globalisation (project companion)',
  goals: [
    'Describe how MNCs spread and interlink production across countries (interdisciplinary project topic)',
    'Analyse the impact of globalisation on different groups in India (project topic)',
    'Suggest ways to make globalisation fairer (project topic)',
  ],
  slides: [
    sl('title', 'Project companion: globalisation at work', {
      b: '*This part is for the **interdisciplinary project**; it is **not examined** in the board paper.*',
      v: flow('LR', ['How MNCs spread production', 'Attracting investment', 'Who gains, who loses', 'Indian companies abroad', 'Fair globalisation', 'Planning your project'], 'Route map of Part 2: how MNCs spread production, attracting investment, who gains and who loses, Indian companies abroad, fair globalisation, and planning a project', 'Part 2 at a glance'),
      n: 'This part is different. It covers production across countries, the impact of globalisation and the struggle for a fair globalisation. CBSE does not test these topics in the board paper; they are assessed through your interdisciplinary project. So treat this deck as a project companion: understand the ideas, collect examples from your own town, and learn how to build a balanced argument.',
    }),
    sl('concept', 'How MNCs spread production', {
      v: vStrategies,
      n: 'MNCs spread their production in three common ways. They set up production jointly with a local company, sharing money and technology. They buy local companies outright, often well-known brands. Or they place large orders with small producers, for garments, footwear or sports goods, and sell the products under their own brand. Each way links production in one country with markets in many others.',
    }),
    sl('diagram', 'Interlinked production: an example', {
      v: vCashew,
      n: 'Here is an imagined chain. Small cashew processors in Kollam shell and grade the nuts. An MNC buys them at a fixed price, packs them under its own brand, and sells them in supermarkets in Europe and the Gulf. The small processors get steady orders, but the price is set by the powerful buyer, and much of the final price is earned by the brand. That is interlinked production.',
    }),
    sl('check', 'Quick check: how MNCs spread', {
      b: 'Which is a common way in which MNCs spread their production in other countries?',
      chk: 'p_m_strategy',
      n: 'Think back to the three ways on the earlier slide.',
    }),
    sl('concept', 'How governments attract foreign investment', {
      v: vSez,
      n: 'Governments compete to attract MNCs. India set up Special Economic Zones, under a law of two thousand five, offering world-class power, water, roads and storage, with tax benefits for some years. Since twenty twenty, production-linked incentives reward firms that raise output in India, for example in mobile phones, and many phones sold worldwide are now made here. Rules for foreign investment have also been eased.',
    }),
    sl('diagram', 'Who gains, who loses?', {
      v: vImpact,
      n: 'Globalisation has not affected everyone the same way. Consumers, especially well-off ones in cities, have more choice and better quality at lower prices. Large Indian companies gained technology, partners and new markets. But many small producers were hurt by cheaper imports. And for many workers, jobs have become more temporary and insecure. Your project should show both sides.',
    }),
    sl('check', 'Quick check: who gained most clearly?', {
      b: 'Which group in India has generally gained most clearly from globalisation?',
      chk: 'p_m_impact',
      n: 'Look at the gains and losses table. Which row has gains and no clear losses?',
    }),
    sl('concept', 'Indian companies go global', {
      v: vIndianMnc,
      n: 'Globalisation works both ways. Some Indian companies have become multinationals themselves. Tata Steel bought the European steelmaker Corus in two thousand seven. Bharti Airtel took over mobile networks in many African countries in two thousand ten. Indian IT companies have offices and clients across the world. For a project, look for a company from your own state that sells or produces abroad.',
    }),
    sl('two-column', 'The hard side of globalisation', {
      cols: [
        '**Small producers**\n\n- Compete with cheaper imports\n- Little capital to buy new technology\n- Some lose business or close\n- Workers in those units lose jobs',
        '**Workers**\n\n- Employers seek "flexibility"\n- Short contracts, long hours in peak season\n- Fewer benefits, less security\n- Gains not shared fairly',
      ],
      n: 'Now the hard side. Many small producers, with little capital and old machines, cannot match cheaper imports or big global brands, and some have closed. Workers face pressure too. Employers competing on cost want flexibility, which often means short contracts, long hours in peak seasons and fewer benefits. So the gains of globalisation are not shared equally.',
    }),
    sl('diagram', 'Towards a fair globalisation', {
      v: vFair,
      n: 'How can globalisation be made fairer, so that its benefits are shared by all? The government can enforce labour laws properly, so workers get their rights. It can support small producers with credit and technology until they can compete. Developing countries can negotiate together for fairer rules at the World Trade Organisation. And people\'s organisations can campaign for workers and small producers.',
    }),
    sl('check', 'Quick check: Special Economic Zones', {
      b: 'Special Economic Zones are set up to do what?',
      chk: 'p_m_sez',
      n: 'Recall what an SEZ offers to companies, and why.',
    }),
    sl('example', 'Worked example 1: a shop survey for your project', {
      b: 'Survey four products in a local shop (imagined results) and draw a conclusion.',
      bl: [
        'Step 1 — For each product, note the **brand country** and where it was **made**.',
        'Step 2 — Notice: a Korean phone and a Japanese washing machine are **made in India**.',
        'Step 3 — Notice: American shoes are made in **Vietnam**; the biscuits are Indian throughout.',
        'Step 4 — Conclude: brands and production are **spread across countries**; India is both a market and a production base.',
      ],
      v: vSurvey,
      n: 'A simple shop survey makes a strong project. For each product, note where the brand is from and where it was made. In this imagined survey, the Korean phone and the Japanese washing machine were made in India, the American shoes in Vietnam, and the biscuits were Indian throughout. The conclusion: production is spread across countries, and India is both a market and a place where goods are made.',
    }),
    sl('example', 'Worked example 2: building a balanced project', {
      b: 'Plan a project on "Who gains from globalisation in my town?"',
      bl: [
        'Step 1 — Ask one clear question.',
        'Step 2 — Collect **data**: a shop survey and short interviews with a shopkeeper, a worker and a small producer.',
        'Step 3 — Present **gains** and **losses** with your evidence.',
        'Step 4 — End with a **balanced judgement** and suggestions for fair globalisation.',
      ],
      v: vProjectPlan,
      n: 'Here is a plan for your project. Start with one clear question. Collect your own evidence: a shop survey, and short interviews with a shopkeeper, a worker and a small producer. Present the gains and the losses you found. End with a balanced judgement and two or three suggestions for a fairer globalisation. Original local evidence is what makes a project stand out.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'Here is Part 2 in brief. MNCs spread production through joint ventures, buying local firms and orders with small producers. Governments attract them with special zones and incentives. Consumers and large firms have gained most clearly, while many small producers and workers have struggled. Some Indian firms are now multinationals. Fair globalisation needs labour laws, support for small producers and fairer world trade rules.',
    }),
    sl('exam-tips', 'Project tips', {
      bl: [
        'These topics are for the **interdisciplinary project**, not the board paper.',
        'Use **local evidence**: a shop survey, interviews, product labels.',
        'Show **both** gains and losses, for different groups.',
        'Label imagined or estimated figures clearly; give sources for real ones.',
        'End with **suggestions** for fair globalisation.',
        'For the board exam, revise **Part 1**: what globalisation is and the factors that enabled it.',
      ],
      n: 'A few project tips. Use evidence from your own surroundings: product labels, a shop survey, and short interviews. Show gains and losses for different groups, not just one side. Label any estimated figures and name the source of real ones. End with practical suggestions. And remember, for the board exam, revise Part 1: what globalisation is, and the factors that enabled it.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Globalisation and the Indian Economy — Notes',
  sections: [
    {
      h: '1. What is globalisation?',
      t: 1,
      b: '**Globalisation** is the process of **rapid integration or interconnection** between countries. Countries connect through four channels:\n\n1. **Trade** in goods and services;\n2. **Investment**, mostly by multinational corporations;\n3. **Technology** (machines, software, know-how);\n4. **People** moving for work and study, which remains the **most restricted** channel because of visas and immigration rules.\n\n**Foreign trade integrates markets:** producers sell beyond their domestic markets, buyers get goods from other countries, and competition crosses borders, so the markets of different countries become connected and consumers get **wider choice**.',
      terms: [
        ['Globalisation', 'The rapid integration or interconnection of countries through trade, investment, technology and people.'],
        ['Integration of markets', 'The joining of markets in different countries through trade, so that goods from many countries compete in each market.'],
      ],
      v: vChannels,
      vs: [vMarkets],
    },
    {
      h: '2. MNCs and foreign investment',
      t: 1,
      b: 'A **multinational corporation (MNC)** owns or controls production in **more than one nation**. MNCs set up offices and factories where they are **close to markets**, where **labour and other resources are cheap**, and where government policies help, so that their costs fall and profits rise.\n\n**Investment** is money spent on assets such as land, buildings, machines and equipment; investment by MNCs in other countries is **foreign investment**. By investing, producing and selling in many countries, MNCs move **goods, services, capital and technology** across borders, which makes them a major force in globalisation. A single product (a phone, a scooter) may be designed in one country, use parts from several others and be assembled in a third.',
      terms: [
        ['Multinational corporation (MNC)', 'A company that owns or controls production in more than one nation.'],
        ['Investment', 'Money spent to buy assets such as land, buildings, machines and equipment.'],
        ['Foreign investment', 'Investment made by MNCs in other countries.'],
      ],
      v: vMnc,
      vs: [vScooter],
    },
    {
      h: '3. Factor 1: technology',
      t: 2,
      b: '**Transport technology:** goods are packed in **containers** that move intact between trucks, trains, ships and planes, cutting handling time and port costs; bigger ships and cheaper air freight have lowered the cost of moving goods over long distances.\n\n**Information and communication technology:** computers, the internet, mobile phones and satellite links let information travel instantly. Firms can **coordinate production** spread across countries, and **services** can be produced in one country and delivered in another: software maintenance, medical-scan reading, animation, accounting, call centres.',
      terms: [
        ['Containerisation', 'Packing goods in standard containers that are moved intact between modes of transport.'],
        ['Information and communication technology', 'Computers, internet, telecom and satellites used to store, send and process information.'],
      ],
      v: vContainer,
      vs: [vIt],
    },
    {
      h: '4. Factor 2: liberalisation of foreign trade and investment policy',
      t: 2,
      b: 'A **trade barrier** is a restriction on foreign trade set by the government: a **tax on imports** (tariff), a **quota** on quantity, or a licence. Governments use barriers to decide what, and how much, comes into the country.\n\n- **After independence**, India put barriers on foreign trade and investment to **protect producers** whose industries were just starting; only essentials such as machinery, fertilisers and petroleum were imported freely.\n- **From 1991**, the government decided that Indian producers should **compete with producers around the globe**, expecting competition to improve their performance. Barriers on trade and investment were **removed to a large extent**.\n\nRemoving barriers or restrictions set by the government is called **liberalisation**. With liberalisation, businesses can decide freely what to import or export. In recent years India has also signed trade agreements that cut duties with partners such as the **UAE and Australia (2022)** and the **United Kingdom (signed 2025)**.',
      terms: [
        ['Trade barrier', 'A government restriction on foreign trade, such as a tax on imports or a quota.'],
        ['Quota', 'A limit on the quantity of a good that may be imported.'],
        ['Liberalisation', 'Removal of barriers or restrictions set by the government on trade and investment.'],
      ],
      v: vBarriers,
      vs: [vTimeline],
    },
    {
      h: '5. Factor 3: the World Trade Organisation',
      t: 2,
      b: 'The **WTO** aims to **liberalise international trade**. It sets **rules** for international trade that members agree to follow, and helps settle trade disputes. It came about at the initiative of the **developed countries**; it has more than 160 members, and India has been a member since it began in **1995**.\n\n**Criticism:** the WTO is supposed to allow free trade for all, but in practice developed countries have kept some barriers and pay **large subsidies** to their own farmers, while developing countries are pressed to remove protection. Developing countries argue for **fairer rules**.',
      terms: [
        ['World Trade Organisation (WTO)', 'An international organisation that sets rules to liberalise international trade.'],
        ['Subsidy', 'Government payment to producers that lets them sell below their cost.'],
      ],
      v: vWto,
    },
    {
      h: '6. Project topic: production across countries, impact and fair globalisation',
      t: 3,
      b: '*Assessed through the interdisciplinary project, not the board paper.*\n\n**How MNCs spread production:** joint production with local companies; buying local companies; large orders with small producers (garments, footwear, sports goods). Production in many countries becomes **interlinked**.\n\n**Attracting investment:** **Special Economic Zones** (SEZ Act 2005) with world-class facilities and tax benefits; **production-linked incentives** (since 2020); easier rules for foreign investment.\n\n**Impact on India:** consumers, especially well-off urban ones, gained **choice, quality and lower prices**; MNCs invested and created jobs; some Indian companies became **multinationals** (e.g. Tata Steel bought Corus in 2007; Bharti Airtel expanded into Africa in 2010); IT and service firms found new markets. But many **small producers** were hurt by competition, and employers\' demand for **flexibility** made many jobs temporary and insecure.\n\n**Fair globalisation** creates opportunities for all and shares the benefits better: the government should **enforce labour laws**, **support small producers**, use trade barriers where needed, and negotiate with other developing countries for **fairer WTO rules**; people\'s organisations also campaign for fairness.',
      terms: [
        ['Special Economic Zone (SEZ)', 'An industrial zone with world-class facilities and tax benefits, set up to attract investment.'],
        ['Fair globalisation', 'Globalisation that creates opportunities for all and shares its benefits better.'],
      ],
      v: vImpact,
      vs: [vFair],
    },
  ],
  tips: '**Common mistakes**\n- Defining globalisation as "trade with foreign countries" only: include **investment, technology and people**.\n- Defining an MNC as a company that "sells abroad": it must **own or control production** in more than one nation.\n- Calling a tax on imports "liberalisation": a tax is a **barrier**; liberalisation **removes** barriers.\n- Giving 1991 without the **reason** (Indian producers ready to compete), or the earlier barriers without theirs (protect young industries).\n- Saying people move as freely as goods: people move **least freely**.\n- Writing long answers about MNC strategies, impact or fair globalisation in the board paper: these are **project topics**.\n\n**How marks are usually awarded**\n- 1-mark MCQ and assertion-reason: one correct option.\n- 2 marks: two points (about 40 words); 3 marks: three points (about 60 words).\n- 5 marks: five numbered points (about 120 words); for "factors", split technology into transport and IT, then liberalisation, India in 1991 and the WTO.\n\n**Data in SOYL practice** are imagined but realistic; your board paper will give its own table.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Globalisation**', 'Rapid **integration or interconnection** between countries.', 'definition', 1],
  ['Four channels of globalisation', 'Trade in goods and services; investment; technology; movement of people.', 'concept', 1],
  ['Which channel is least free?', '**People**: visas, work permits and immigration rules.', 'fact', 1],
  ['**MNC**', 'A company that owns or **controls production in more than one nation**.', 'definition', 1],
  ['Where do MNCs set up production?', 'Near markets; where labour and resources are cheap; where policies help.', 'concept', 1],
  ['**Investment**', 'Money spent on assets such as land, buildings and machines.', 'definition', 1],
  ['**Foreign investment**', 'Investment by MNCs in other countries.', 'definition', 1],
  ['How does foreign trade **integrate markets**?', 'Producers sell abroad and buyers get foreign goods, so markets join and choice widens.', 'concept', 1],
  ['Example of one product made in many countries', 'Designed in one country, parts from several, assembled in India, sold worldwide.', 'example', 1],
  ['Three factors that enabled globalisation', 'Technology (transport, IT); liberalisation; WTO rules.', 'concept', 2],
  ['How did **containers** help?', 'Goods move intact between truck, train and ship: less handling time and cost.', 'concept', 2],
  ['How did **IT** help?', 'Instant communication: production coordinated across countries; services delivered abroad.', 'concept', 2],
  ['A service traded through IT', 'Software maintenance by an Indian firm for a bank abroad.', 'example', 2],
  ['**Trade barrier**', 'A government restriction on foreign trade, e.g. a **tax on imports**.', 'definition', 2],
  ['**Quota**', 'A limit on the quantity of a good that may be imported.', 'definition', 2],
  ['**Liberalisation**', '**Removing** barriers or restrictions set by the government.', 'definition', 2],
  ['Why barriers after independence?', 'To **protect young Indian industries** from foreign competition.', 'concept', 2],
  ['What happened in **1991**?', 'Barriers removed to a large extent so Indian producers could **compete globally**.', 'fact', 2],
  ['Import duty example', '₹500 toy + 20% duty = ₹600.', 'example', 2],
  ['**WTO**: aim', 'To **liberalise international trade** by setting rules.', 'definition', 2],
  ['WTO: who started it, and when did India join?', 'Developed countries\' initiative; India a member since it began in **1995**.', 'fact', 2],
  ['Criticism of the WTO', 'Developed countries keep barriers and farm subsidies but press poor countries to open up.', 'concept', 2],
  ['Recent Indian trade agreements', 'UAE and Australia (2022); United Kingdom (signed 2025).', 'fact', 2],
  ['Which topics are in the board exam?', '**What is globalisation?** and **Factors that have enabled globalisation**.', 'exam-tip', 2],
  ['(Project) Three ways MNCs spread production', 'Joint production; buying local firms; large orders with small producers.', 'concept', 3],
  ['(Project) **SEZ**', 'Special Economic Zone: world-class facilities and tax benefits to attract investment.', 'definition', 3],
  ['(Project) Who gained most clearly?', 'Consumers (especially well-off, urban); large firms.', 'concept', 3],
  ['(Project) Who was hurt?', 'Many small producers; workers with insecure, flexible jobs.', 'concept', 3],
  ['(Project) An Indian MNC', 'Tata Steel bought Corus (Europe) in 2007.', 'example', 3],
  ['(Project) **Fair globalisation**', 'Opportunities for all and fairer sharing of benefits: labour laws, support for small producers, fair WTO rules.', 'definition', 3],
]);

// ---------------------------------------------------------------- tests (t01–t02 only)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-10-social-science-chapter-test-short',
  title: 'Chapter test (short) — Globalisation and the Indian Economy',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_def', 'm_container', 'm_liberal', 'ar_tech'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 40 words and the 3-mark question in about 60 words.', items: ['s_def', 's_barrier', 's3_factors'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 120 words.', items: [{ attempt: 1, keys: ['l_what', 'l_factors'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_port'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-10-social-science-chapter-test-long',
  title: 'Chapter test (long) — Globalisation and the Indian Economy',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_channels', 'm_mnc_def', 'm_foreign_inv', 'm_barrier', 'm_why_barriers', 'm_wto_aim', 'm_wto_unfair', 'm_effect_barriers', 'ar_mnc', 'ar_1991'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 40 words and 3-mark questions in about 60 words. Questions 13 and 15 have an internal choice.', items: ['s_mnc', 's_tech', { attempt: 1, keys: ['s_integration', 's_wto'] }, 's3_channels', { attempt: 1, keys: ['s3_barriers_india', 's3_mnc_role'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer the data-based question 16, and any ONE of questions 17 and 18, in about 120 words each.', items: ['l_data_exporter', { attempt: 1, keys: ['l_mnc_glob', 'l_liberal_eval'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_1993', 'sb_market'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'board scope t01 (What is globalisation?) and t02 (factors that enabled globalisation); t03 (production across countries, impact, fair globalisation) is board_assessed: false, covered by a project-companion deck and 15 items labelled practice-only, never used in the tests',
    originality: 'every scenario, table and source written for this chapter (imagined people, firms, countries and figures); NCERT\'s Ford, Cargill, toy, capacitor and garment-exporter examples and its list of Indian MNCs are not reused',
    data: 'figures recomputed by the build: duty 500 × 20% = 100; 2,000 at 30% vs 10% = 600 vs 200; lamp 1,200 at 25% = 1,500 and at 5% = 1,260; Sagarland 80 − 12 = 68 points and 600 ÷ 40 = 15 times; Nova X 35 + 20 + 15 = 70%; export share 450 ÷ 3,000 = 15%; SEZ 18,000 ÷ 30,000 = 60%',
    facts: 'India liberalised from 1991; WTO began in 1995 with India a member, more than 160 members; trade agreements with the UAE and Australia (2022) and the UK (signed 2025); SEZ Act 2005; production-linked incentives since 2020; Tata Steel–Corus 2007; Bharti Airtel in Africa 2010',
    gate: 'npm test -w @soyl/content-templates, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
