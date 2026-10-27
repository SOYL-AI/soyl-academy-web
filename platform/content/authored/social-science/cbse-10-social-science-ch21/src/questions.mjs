// CBSE 10 Social Science, ch21 Globalisation and the Indian Economy — question bank. CBSE examines
// this chapter only for "What is globalisation?" (t01) and "Factors that have enabled globalisation"
// (t02); t03 (production across countries, impact, fair globalisation) is assessed through the
// interdisciplinary project, so its items are labelled practice-only and never used in the tests.
// Every scenario, table and source is written by SOYL; no NCERT example or board-paper item is reused.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, source, caseQ, child } from './lib.mjs';

const S2 = [25, 40];
const S3 = [40, 60];
const L5 = [100, 120];
const P = '*(Interdisciplinary project topic: practice only, not assessed in the board exam.)*\n\n';

// ================================================================ t01 What is globalisation?
Q('m_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Globalisation is best described as',
  opts: [
    'the process of rapid integration or interconnection between countries',
    'a policy of stopping all imports to protect local producers',
    'the movement of people from villages to cities within a country',
    'the government taking over private companies',
  ],
  sol: 'The key idea is countries becoming closely and quickly connected (through trade, investment, technology and people). Stopping imports is protection, rural–urban migration is internal, and nationalisation is about ownership.',
}));
Q('m_channels', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Through which of the following do countries become more closely connected in globalisation?',
  opts: [
    'Movement of goods and services, investment, technology and people across countries',
    'Only movement of people from poor to rich countries',
    'Only the exchange of cultural programmes between governments',
    'Only aid given by rich countries to poor ones',
  ],
  sol: 'Globalisation works through four channels: trade in goods and services, investment, technology and (to a smaller extent) people. Each of the other options names, at most, one narrow channel.',
}));
Q('m_people_least', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these has moved **least freely** between countries in the recent wave of globalisation?',
  opts: ['People', 'Goods', 'Investment', 'Technology'],
  sol: 'Goods, investment and technology now cross borders far more easily than before. Movement of people is still limited by visas, work permits and immigration rules.',
}));
Q('m_mnc_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A multinational corporation (MNC) is a company that',
  opts: [
    'owns or controls production in more than one nation',
    'sells its goods only in its home country',
    'is owned by the governments of several countries',
    'employs workers from many countries in a single factory',
  ],
  sol: 'An MNC owns or controls production (factories, offices) in more than one country. Selling only at home, government ownership, or a multinational workforce in one factory do not define it.',
}));
Q('m_foreign_inv', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When a company based in South Korea spends money to buy land, build a factory and install machines in Uttar Pradesh, this is an example of',
  opts: ['foreign investment', 'a trade barrier', 'a quota on imports', 'disguised unemployment'],
  sol: 'Investment is money spent on assets such as land, buildings and machines; when an MNC makes it in another country, it is foreign investment. Barriers and quotas restrict trade; disguised unemployment is unrelated.',
}));
Q('m_market_integration', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Alphonso mangoes from Ratnagiri are sold in London, and kiwis from New Zealand are sold in Pune. What does this show?',
  opts: [
    'Foreign trade is integrating markets in different countries',
    'Both countries have banned imports of fruit',
    'Fruit is produced by multinational corporations only',
    'Prices of fruit are fixed by the WTO',
  ],
  sol: 'Producers reach buyers beyond their own country, and buyers get goods from abroad: markets are being connected (integrated) through trade. Bans would stop this, fruit is grown by many farmers, and the WTO does not fix prices.',
}));
Q('m_choice', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A shopper in Kochi can choose among phones from Indian, Korean, Chinese and American brands at similar prices. Which feature of globalisation does this mainly reflect?',
  opts: [
    'Integration of markets, giving consumers wider choice',
    'Restriction of imports through high taxes',
    'Movement of people from India to Korea',
    'Nationalisation of the phone industry',
  ],
  sol: 'When markets are connected, goods from many countries are sold side by side, so buyers get more choice. High taxes would reduce choice; migration and nationalisation are not involved.',
}));
Q('m_mnc_why', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why do MNCs usually set up production where they can get cheap labour and other resources, and also be close to markets?',
  opts: [
    'To lower their costs of production and earn greater profits',
    'Because governments force all companies to move abroad',
    'To reduce the number of goods they sell',
    'Because they are not allowed to make profits in their home country',
  ],
  sol: 'MNCs choose locations that cut costs (cheap labour, resources) and give access to buyers, so that profits rise. Governments do not force them, they want to sell more, not less, and profits are allowed at home too.',
}));
Q('m_not_glob', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of the following is **NOT** an example of globalisation?',
  opts: [
    'A farmer in Haryana sells wheat at the local mandi in Karnal',
    'A software firm in Bengaluru writes programs for a bank in Germany',
    'A Japanese car company builds a factory in Gujarat',
    'A student in Kolkata takes an online course taught from Canada',
  ],
  sol: 'Selling wheat at a local market involves no other country. The other three link India with other countries through services trade, foreign investment and technology.',
}));
Q('ar_mnc', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'MNCs are playing a major role in the globalisation process.',
  r: 'MNCs move goods, services, investment and technology between the countries where they produce and sell.',
  sol: 'Both are true, and R explains A: by producing and selling in many countries, MNCs carry goods, investment and technology across borders.',
}));
Q('ar_people', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Movement of people between countries has been limited in globalisation.',
  r: 'Foreign trade allows producers to reach markets beyond their own country.',
  sol: 'Both are true, but R is about trade in goods and does not explain A. A is explained by visa and immigration restrictions.',
}));
Q('tf_people', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In the recent wave of globalisation, people move between countries as freely as goods do.',
  sol: 'People\'s movement is limited by visas, work permits and immigration rules, while goods, investment and technology move much more freely.',
}));
Q('fb_glob', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Rapid integration or interconnection between countries is known as ___.',
  acc: [['globalisation', 'globalization']],
  sol: 'This process is globalisation.',
}));
Q('mt_channels', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined event with the channel of globalisation it shows.',
  pairs: [
    ['Basmati rice from Punjab is shipped to the UAE', 'Trade in goods'],
    ['A German company builds a wind-turbine factory in Tamil Nadu', 'Foreign investment'],
    ['A hospital in Mumbai uses a scanner and software developed in Japan', 'Movement of technology'],
    ['A nurse from Kerala takes a job in a hospital in Ireland', 'Movement of people'],
  ],
  sol: 'Shipping rice is trade; building a factory abroad is investment; using foreign equipment and software is technology moving; a nurse taking a job abroad is movement of people.',
}));
Q('n_export_share', num({
  t: 1, d: 2, c: 'application', marks: 1, value: 15, unit: '%',
  stem: 'An imagined country produces goods and services worth ₹3,000 crore in a year and exports goods worth ₹450 crore. What share of its output does it export, in per cent?',
  sol: 'Step 1: Share = 450 ÷ 3,000 × 100.\nStep 2: 450 ÷ 3,000 = 0.15, and 0.15 × 100 = 15. So 15%.',
}));
Q('s_def', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is globalisation? Name any two ways in which countries become connected through it.',
  model: '1. **Globalisation** means countries becoming **rapidly integrated**, or interconnected, with one another.\n2. Countries connect through **trade in goods and services** and **foreign investment** (also technology and movement of people).',
  sol: 'Definition, then any two of trade, investment, technology, people.',
  scheme: [['Definition', 1], ['Two channels', 1]],
}));
Q('s_mnc', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is a multinational corporation? Give one reason why MNCs set up production in other countries.',
  model: '1. An **MNC** is a company that **owns or controls production** in **more than one country**.\n2. MNCs set up production where they get **cheap labour and resources** and are **close to markets**, which lowers costs and raises **profits**.',
  sol: 'Definition, then one cost or market reason.',
  scheme: [['Definition of MNC', 1], ['One reason', 1]],
}));
Q('s_integration', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does foreign trade lead to integration of markets across countries?',
  model: '1. Producers can sell **beyond their domestic markets**, competing with producers in other countries.\n2. Buyers get **goods produced abroad**, so the **same goods** are sold in many countries at **similar prices**: markets become connected.',
  sol: 'Two sides: sellers reach foreign buyers; buyers get foreign goods, so markets join.',
  scheme: [['Producers reach foreign markets', 1], ['Buyers get foreign goods; markets connect', 1]],
}));
Q('s_people', short({
  t: 1, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why has the movement of people between countries been more limited than the movement of goods?',
  model: '1. Countries control entry through **visas, work permits and immigration rules**, often to protect **jobs** for their own citizens.\n2. Goods and investment face **far fewer restrictions** today, so they move more freely than people.',
  sol: 'Restrictions on people, compared with liberalised trade and investment.',
  scheme: [['Restrictions on movement of people', 1], ['Contrast with goods and investment', 1]],
}));
Q('s3_channels', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Explain, with an Indian example of each, three ways in which India is connected to other countries through globalisation.',
  model: '1. **Trade:** India exports **medicines and software services** and imports **crude oil and electronics**.\n2. **Investment:** foreign companies have built **car and phone factories** in Tamil Nadu and Gujarat.\n3. **Technology and people:** Indian hospitals use **imported machines and software**, and many Indian **nurses and engineers** work abroad.',
  sol: 'Three channels, each with a concrete Indian example.',
  scheme: [['Trade with an example', 1], ['Investment with an example', 1], ['Technology or people with an example', 1]],
}));
Q('s3_mnc_role', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the role of MNCs in the globalisation process.',
  model: '1. MNCs **invest** in factories and offices in many countries, moving **capital** across borders.\n2. They **spread production** across countries and sell worldwide, so **goods and services** cross borders.\n3. They carry **technology and management methods** to the places where they produce, linking the economies of distant countries.',
  sol: 'Three roles: investment, production and trade across borders, technology transfer.',
  scheme: [['Investment across countries', 1], ['Production and trade across countries', 1], ['Technology transfer and linking economies', 1]],
}));
Q('l_what', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'What is globalisation? Explain the different ways in which it connects countries, with examples.',
  model: '1. **Meaning:** globalisation is the **rapid integration** or interconnection of countries.\n2. **Trade:** more goods and services cross borders; e.g. Indian **mangoes** in London and New Zealand **kiwis** in Pune, so **markets are integrated**.\n3. **Investment:** **MNCs** invest in factories and offices abroad; e.g. foreign firms assemble **smartphones** in Tamil Nadu.\n4. **Technology:** machines, software and know-how move between countries; e.g. Indian firms provide **IT services** to banks abroad.\n5. **People:** people move for work and study, but **less freely** because of visas and immigration rules.',
  sol: 'Definition, then four channels each with an example, noting that people move least.',
  scheme: [['Meaning', 1], ['Trade with example', 1], ['Investment / MNCs with example', 1], ['Technology with example', 1], ['People, with the limitation', 1]],
}));
Q('l_mnc_glob', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"MNCs are the main drivers of globalisation." Do you agree? Give reasons for your answer.',
  model: '1. **Largely agree.** MNCs **invest** in many countries, so **capital** moves across borders on a large scale.\n2. They **spread production** (design in one country, parts in another, assembly in a third), linking economies.\n3. They **sell worldwide**, so **trade** and competition between markets grow.\n4. They carry **technology** and management methods to the countries where they produce.\n5. **But not alone:** MNCs could do this only because **technology** (containers, internet) made it cheap and **governments liberalised** trade and investment, guided by **WTO rules**; so MNCs drive globalisation, but within conditions others created.',
  sol: 'Take a position, give three or four roles of MNCs with reasons, and weigh them against the enabling factors.',
  scheme: [['Position with investment role', 1], ['Spreading production', 1], ['Trade and competition', 1], ['Technology', 1], ['Weighing: enabling factors', 1]],
}));
Q('sb_market', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**From a school magazine article, "A walk through my supermarket", by Tanvi, Class 10, Bengaluru (imagined), 2025**\n\nThe apples came from Washington and the avocados from Kenya. The olive oil was from Spain, but the bottle was filled in Haryana. My father\'s new phone was designed in California and assembled near Chennai. On the way home, we passed the office where my aunt works: her team writes software for a bank in Frankfurt. That night, on a video call, my cousin who studies nursing in Dublin said that her hospital has hired many nurses from Kerala.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the process that the article describes.', model: '**Globalisation**: the rapid integration of countries.', sol: 'Goods, services, production and people connecting countries point to globalisation.', scheme: [['Globalisation', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Give one example from the source of production spread across countries.', model: 'The phone was **designed in California** and **assembled near Chennai** (or: olive oil from Spain bottled in Haryana).', sol: 'Look for a product made in stages in different countries.', scheme: [['One correct example', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the source, show any two channels through which countries are connected.', model: '**Trade in goods:** apples from Washington and avocados from Kenya are sold in Bengaluru. **Movement of people / services:** nurses from Kerala work in Dublin, and the aunt\'s team sells software services to Frankfurt.', sol: 'Name two channels and support each with a detail from the source.', scheme: [['First channel with evidence', 1], ['Second channel with evidence', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How do the shoppers in Tanvi\'s supermarket benefit from integration of markets?', model: 'They get **wider choice**: fruit, oil and phones from many countries are on the same shelf. **Competition** among sellers from different countries keeps **quality up and prices down**.', sol: 'Two benefits to consumers: choice and competition (quality, price).', scheme: [['Wider choice', 1], ['Competition: quality or price', 1]] }),
    ]),
  ],
}));
Q('cb_phone', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined company and figures written by SOYL for practice.)*',
  passage: '**How the imagined "Nova X" smartphone is made**\n\n| Stage | Where | Share of the phone\'s value (%) |\n|---|---|---|\n| Design and software | United States | 35 |\n| Processor chips | Taiwan | 20 |\n| Display | South Korea | 15 |\n| Camera and other parts | Japan and China | 18 |\n| Assembly and testing | Tamil Nadu, India | 12 |\n\nThe phones are sold in more than 60 countries.',
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: 70, unit: '%', stem: 'What share of the phone\'s value is created in the United States, Taiwan and South Korea together?', sol: 'Step 1: Add the three rows: 35 + 20 + 15.\nStep 2: = 70. So 70%.' })),
    child('b', mcq({ t: 1, d: 2, c: 'application', stem: 'Which stage of production is carried out in India?', opts: ['Assembly and testing', 'Design and software', 'Processor chips', 'Display'], sol: 'The table places assembly and testing in Tamil Nadu; the other stages are in other countries.' })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the table illustrate globalisation?', model: 'One product is **made in stages across five countries** and **sold in more than 60**, so production and markets of distant countries are **integrated**. Investment, parts and technology all **cross borders**.', sol: 'Point to production spread across countries and sales in many markets.', scheme: [['Production spread across countries', 1], ['Markets of many countries integrated', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): India\'s stage adds only 12% of the value. Suggest how India could gain a larger share.', model: '(1) Train engineers and attract investment for **chip and display making**, which add more value. (2) Develop **design and software** firms in India, since design carries the **largest share (35%)**.', sol: 'Suggestions must target higher-value stages identified in the table.', scheme: [['First higher-value stage', 1], ['Second higher-value stage', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 Factors that have enabled globalisation
Q('m_container', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which development in transport has greatly lowered the cost of moving goods across countries?',
  opts: [
    'Containers that are loaded intact onto ships, trains, planes and trucks',
    'Bullock carts with rubber tyres',
    'Toll booths on national highways',
    'Ration cards for transport workers',
  ],
  sol: 'Goods packed in standard containers move between trucks, trains and ships without repacking, which cuts handling time and cost. The other options have nothing to do with international transport costs.',
}));
Q('m_it', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An animation studio in Kochi colours the pages of a comic book for a publisher in Tokyo and sends the files over the internet the same evening. Which factor of globalisation makes this possible?',
  opts: ['Information and communication technology', 'Trade barriers', 'Import quotas', 'Movement of people'],
  sol: 'Computers, the internet and fast telecommunication let services be produced in one country and delivered instantly to another. Barriers and quotas restrict trade, and nobody travelled.',
}));
Q('m_barrier', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A tax on imports is an example of',
  opts: ['a trade barrier', 'foreign investment', 'liberalisation', 'a multinational corporation'],
  sol: 'A tax on imports (a tariff) restricts foreign trade, so it is a trade barrier. Liberalisation means removing such barriers.',
}));
Q('m_liberal', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: '**Liberalisation** means',
  opts: [
    'removing barriers or restrictions set by the government on trade and investment',
    'putting higher taxes on imported goods',
    'banning foreign companies from investing',
    'the government buying all private factories',
  ],
  sol: 'Liberalisation removes government restrictions so that trade and investment can flow more freely. The other options add restrictions or change ownership.',
}));
Q('m_why_barriers', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why did the Indian government put barriers on foreign trade and foreign investment after independence?',
  opts: [
    'To protect producers within the country, whose industries had only just started, from foreign competition',
    'To help foreign companies sell more in India',
    'Because the WTO required all new countries to do so',
    'To increase the prices that foreign buyers paid for Indian goods',
  ],
  sol: 'Young Indian industries needed protection from established foreign competitors. The barriers did the opposite of helping foreign firms, the WTO did not exist then (it was set up in 1995), and import barriers do not raise prices for foreign buyers.',
}));
Q('m_1991', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'In which year did India make far-reaching changes to remove barriers on foreign trade and investment?',
  opts: ['1991', '1947', '1975', '2016'],
  sol: 'From 1991, the government decided that Indian producers should compete with producers around the world and removed barriers to a large extent.',
}));
Q('m_wto_aim', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The main aim of the World Trade Organisation (WTO) is to',
  opts: [
    'liberalise international trade by setting rules for it',
    'give loans to farmers in poor countries',
    'fix the prices of all goods sold in the world',
    'run multinational corporations',
  ],
  sol: 'The WTO sets rules for international trade and aims to make it freer. It does not give farm loans, fix prices or run companies.',
}));
Q('m_wto_unfair', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Developing countries often say that WTO rules work unfairly in practice. Which of the following best supports their view?',
  opts: [
    'Some developed countries give large subsidies to their own farmers while asking developing countries to remove protection',
    'Developing countries are not allowed to join the WTO',
    'The WTO bans all exports from developing countries',
    'The WTO requires every country to use the same currency',
  ],
  sol: 'Large farm subsidies keep prices low for rich countries\' farmers and hurt farmers elsewhere, while poorer countries are pressed to open up. Developing countries are members, exports are not banned, and there is no common currency.',
}));
Q('m_quota', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined country allows only 10,000 tonnes of edible oil to be imported in a year, whatever the price. This is an example of',
  opts: ['a quota, a kind of trade barrier', 'liberalisation of trade', 'foreign investment', 'a free-trade rule of the WTO'],
  sol: 'A limit on the quantity that may be imported is a quota, which restricts trade. It is the opposite of liberalisation and has nothing to do with investment.',
}));
Q('m_tech_services', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which of these services could be provided to a customer abroad **mainly because of** modern information technology?',
  opts: [
    'A Pune firm keeping the accounts of a company in Canada',
    'A barber in Lucknow cutting a tourist\'s hair',
    'A tailor in Jaipur stitching a dress for a local customer',
    'A taxi driver in Goa taking visitors to the beach',
  ],
  sol: 'Accounting can be done remotely and sent over the internet, so the customer can be in another country. The other services need the customer to be physically present.',
}));
Q('m_effect_barriers', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'If an imagined country cuts its import duty on bicycles from 40% to 5%, what is the **most likely** immediate effect?',
  opts: [
    'Imported bicycles become cheaper, and local makers face more competition',
    'Imported bicycles become more expensive',
    'Local bicycle makers no longer have any competition',
    'Bicycles can no longer be imported',
  ],
  sol: 'A lower tax on imports lowers their price in the local market, so local producers must compete harder. The other options reverse the effect.',
}));
Q('m_statements', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Read the statements.\n\nI. Improvements in transport and communication have helped globalisation.\nII. Trade barriers make it easier to import goods.\nIII. The WTO was started at the initiative of developed countries.\n\nWhich of these are correct?',
  opts: ['I and III only', 'I and II only', 'II and III only', 'I, II and III'],
  sol: 'I is correct. II is wrong: barriers restrict imports. III is correct: the WTO came about at the initiative of developed countries. So I and III only.',
}));
Q('m_fta', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In recent years India has signed trade agreements with the UAE, Australia and the United Kingdom that lower import duties on many goods between the partners. These agreements are an example of',
  opts: ['liberalisation of foreign trade', 'putting up new trade barriers', 'nationalisation', 'the movement of people only'],
  sol: 'Lowering duties between partners removes barriers to trade, which is liberalisation. It is the opposite of new barriers and has nothing to do with nationalisation.',
}));
Q('ar_tech', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'Rapid improvement in technology has stimulated globalisation.',
  r: 'Faster, cheaper transport and instant communication allow goods and services to be produced and delivered across countries.',
  sol: 'Both are true, and R explains A: technology lowered the cost and time of moving goods and information between countries.',
}));
Q('ar_liberal', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Liberalisation has allowed Indian businesses to import raw materials and machines more easily.',
  r: 'Liberalisation means putting more restrictions on foreign trade.',
  sol: 'A is true. R is false: liberalisation means **removing** restrictions on trade and investment.',
}));
Q('ar_wto', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'The WTO aims to liberalise international trade.',
  r: 'The WTO has more than 160 member countries.',
  sol: 'Both are true, but the number of members does not explain the aim. The aim follows from the WTO\'s purpose of setting rules that make trade freer.',
}));
Q('ar_barrier', ar({
  t: 2, d: 2, c: 'understanding', key: 'd',
  a: 'A tax on imports increases the volume of foreign trade.',
  r: 'Governments can use trade barriers to decide what kinds of goods, and how much of each, should come into the country.',
  sol: 'A is false: a tax on imports makes them dearer and restricts trade. R is true: barriers let governments regulate imports.',
}));
Q('ar_1991', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Around 1991 the Indian government removed many barriers on foreign trade and investment.',
  r: 'It felt that the time had come for Indian producers to compete with producers around the globe.',
  sol: 'Both are true, and R explains A: the government believed competition would improve the performance of Indian producers.',
}));
Q('tf_wto', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The World Trade Organisation was started at the initiative of the developed countries.',
  sol: 'The WTO came about at the initiative of developed countries; it aims to liberalise international trade.',
}));
Q('tf_barrier', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'True or false? Removing barriers on foreign trade is called protectionism.',
  sol: 'Removing barriers is liberalisation. Protectionism means putting up barriers to protect local producers.',
}));
Q('fb_liberal', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Removing barriers or restrictions set by the government on foreign trade and investment is called ___.',
  acc: [['liberalisation', 'liberalization']],
  sol: 'This is liberalisation.',
}));
Q('fb_wto', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The international organisation whose aim is to liberalise international trade is the World ___ Organisation.',
  acc: [['Trade']],
  sol: 'It is the World Trade Organisation (WTO).',
}));
Q('mt_factors', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each imagined change with the factor of globalisation it represents.',
  pairs: [
    ['Garments from Tiruppur reach Rotterdam in containers in three weeks', 'Improvement in transport technology'],
    ['A radiologist in Chennai reads scans sent from a hospital in Australia', 'Information and communication technology'],
    ['A country cuts the import duty on solar panels from 30% to 5%', 'Liberalisation of trade policy'],
    ['Member countries agree on common rules for trade in services', 'Rules set through the WTO'],
  ],
  sol: 'Containers are transport technology; reading scans remotely is IT; cutting duties is liberalisation; common rules for trade come from WTO negotiations.',
}));
Q('mt_terms', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each term with its meaning.',
  pairs: [
    ['Trade barrier', 'A restriction on foreign trade, such as a tax on imports'],
    ['Liberalisation', 'Removal of government restrictions on trade and investment'],
    ['Quota', 'A limit on the quantity of a good that may be imported'],
    ['Foreign investment', 'Money spent by an MNC on assets such as land, buildings and machines in another country'],
  ],
  sol: 'Barriers restrict; liberalisation removes restrictions; a quota limits quantity; foreign investment buys assets abroad.',
}));
Q('ord_policy', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these stages in India\'s policy on foreign trade in the order in which they happened.',
  items: [
    'After independence, barriers protect young Indian industries',
    'In 1991, the government removes barriers to a large extent',
    'India joins the newly formed WTO in 1995',
    'In the 2020s, India signs new trade agreements with partners such as the UAE and the UK',
  ],
  sol: 'Protection came first after 1947; liberalisation began in 1991; the WTO was formed in 1995 with India as a founding member; recent trade agreements followed in the 2020s.',
}));
Q('n_duty', num({
  t: 2, d: 2, c: 'application', marks: 1, value: 600, unit: '₹',
  stem: 'An imported toy costs ₹500 before tax. The government charges an import duty of 20% on it. What will the toy cost after the duty (in ₹)?',
  sol: 'Step 1: Duty = 500 × 20 ÷ 100 = 100.\nStep 2: Price after duty = 500 + 100 = 600. So ₹600.',
}));
Q('n_duty_cut', num({
  t: 2, d: 3, c: 'application', marks: 2, value: 400, unit: '₹',
  stem: 'An imported solar lantern costs ₹2,000 before tax. The import duty on it is cut from 30% to 10%. By how much (in ₹) does its price after duty fall?',
  sol: 'Step 1: At 30%, duty = 2,000 × 30 ÷ 100 = 600.\nStep 2: At 10%, duty = 2,000 × 10 ÷ 100 = 200.\nStep 3: Fall in price = 600 − 200 = 400. So ₹400.',
  scheme: [['Duty at both rates', 1], ['Fall of ₹400', 1]],
}));
Q('s_tech', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How has technology in transport helped globalisation?',
  model: '1. **Containers** let goods be loaded intact onto ships, trains and trucks, cutting **handling time and cost**.\n2. Bigger ships and **cheaper air transport** move goods over long distances **faster and at lower cost**.',
  sol: 'Two transport improvements, each with its effect on cost or time.',
  scheme: [['Containers and lower handling cost', 1], ['Faster, cheaper long-distance transport', 1]],
}));
Q('s_it', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'How has information technology helped services to be traded across countries? Give an example.',
  model: '1. **Computers, the internet and telecom** let work be done in one country and **delivered instantly** to another.\n2. E.g., an IT firm in Hyderabad **maintains software** for a bank in London.',
  sol: 'Explain the mechanism, then give one service example.',
  scheme: [['Mechanism', 1], ['Example', 1]],
}));
Q('s_barrier', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a trade barrier? Why do governments use trade barriers?',
  model: '1. A **trade barrier** is a **restriction on foreign trade**, such as a **tax on imports** or a **quota**.\n2. Governments use barriers to **regulate** what and how much is imported, often to **protect domestic producers**.',
  sol: 'Meaning with an example; purpose.',
  scheme: [['Meaning with example', 1], ['Purpose', 1]],
}));
Q('s_liberal_why', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why did the Indian government decide to remove barriers on foreign trade and investment in 1991?',
  model: '1. It felt that Indian producers were ready to **compete** with producers **around the world**.\n2. Competition was expected to **improve the quality and efficiency** of Indian producers.',
  sol: 'Two linked reasons: readiness to compete; competition improves performance.',
  scheme: [['Readiness to compete globally', 1], ['Competition improves performance', 1]],
}));
Q('s_wto', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the aim of the WTO. Why do developing countries criticise it?',
  model: '1. The **WTO** aims to **liberalise international trade** by setting **rules** for it.\n2. Developing countries say **developed countries** keep **barriers and farm subsidies** while forcing poorer countries to **remove protection**.',
  sol: 'Aim; the double-standard criticism.',
  scheme: [['Aim', 1], ['Criticism', 1]],
}));
Q('s3_factors', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three factors that have enabled globalisation.',
  model: '1. **Transport technology:** containers and cheaper air travel cut the **cost and time** of moving goods.\n2. **Information technology:** computers, internet and telecom let **services** be produced and delivered **across countries**.\n3. **Liberalisation:** governments **removed barriers** on trade and investment, encouraged by **WTO rules**.',
  sol: 'Three distinct factors, each with what it changed.',
  scheme: [['Transport technology', 1], ['Information technology', 1], ['Liberalisation / WTO', 1]],
}));
Q('s3_barriers_india', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare India\'s trade policy before and after 1991.',
  model: '1. **Before 1991:** India put **barriers** (high import taxes, licences, limits) on foreign trade and investment.\n2. The aim was to **protect young Indian industries** from foreign competition.\n3. **After 1991:** barriers were **removed to a large extent**; imports and foreign investment were allowed so Indian producers would **compete globally**.',
  sol: 'Policy and reason before 1991; change and reason after.',
  scheme: [['Barriers before 1991', 1], ['Reason: protection', 1], ['Liberalisation after 1991 with reason', 1]],
}));
Q('s3_wto_fair', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: '"The WTO is supposed to allow free trade for all, but in practice it is not fair to all." Evaluate this statement.',
  model: '1. **For:** WTO rules have **lowered barriers** and given countries a **forum** to settle trade disputes.\n2. **Against:** some developed countries keep **large farm subsidies** and other barriers, while developing countries are pressed to **open their markets**.\n3. **Judgement:** the statement is **largely true**; developing countries must negotiate **together** for fairer rules.',
  sol: 'One point for the WTO, one against, and a reasoned judgement.',
  scheme: [['Point in favour', 1], ['Point against', 1], ['Reasoned judgement', 1]],
}));
Q('s3_tech_combo', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why would liberalisation alone not have produced today\'s level of globalisation without technology? Explain.',
  model: '1. Liberalisation **removed legal barriers**, but if transport were **slow and costly**, trade would still be expensive.\n2. **Containers and cheap freight** made it profitable to move goods long distances.\n3. **Internet and telecom** made it possible to **coordinate production** and sell **services** across countries; together, policy and technology drove globalisation.',
  sol: 'Show that policy opened the door but technology made crossing it cheap; conclude that both were needed.',
  scheme: [['Limits of liberalisation alone', 1], ['Role of transport technology', 1], ['Role of IT; both needed', 1]],
}));
Q('l_factors', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the factors that have enabled globalisation.',
  model: '1. **Transport technology:** **containers**, bigger ships and cheaper air transport lowered the **cost and time** of moving goods.\n2. **Information and communication technology:** **computers, the internet and mobile phones** let firms coordinate production and deliver **services** across countries.\n3. **Liberalisation:** governments **removed barriers** such as import taxes and limits, so goods and investment move freely.\n4. **India from 1991:** barriers were removed to a large extent so that Indian producers could **compete globally**.\n5. **WTO:** its **rules** aim to **liberalise international trade**, though developing countries say developed countries keep **unfair barriers**.',
  sol: 'Two technology factors, two policy points (general and India), and the WTO with its criticism.',
  scheme: [['Transport technology', 1], ['Information technology', 1], ['Liberalisation', 1], ['India\'s 1991 changes', 1], ['WTO and its criticism', 1]],
}));
Q('l_liberal_eval', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Was the removal of trade barriers in India from 1991 a wise decision? Evaluate with reasons.',
  model: '1. **Why barriers existed:** after independence, they protected **young Indian industries** from foreign competition.\n2. **Gains:** liberalisation brought **imports of machines and inputs**, more **foreign investment** and **wider choice** for consumers.\n3. **Gains (2):** competition pushed many Indian firms to improve **quality**; some became **global companies** themselves.\n4. **Costs:** many **small producers** could not match cheaper imports and lost business or closed.\n5. **Judgement:** **largely wise**, because India gained growth and choice, but it needed **support for small producers** and fair rules to share the gains.',
  sol: 'Context, two gains, one cost, and a balanced judgement.',
  scheme: [['Context of earlier barriers', 1], ['Gain: imports, investment, choice', 1], ['Gain: competition, quality', 1], ['Cost to small producers', 1], ['Balanced judgement', 1]],
}));
Q('l_data_exporter', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Study the table about an **imagined garment exporter in Tiruppur** and answer: identify the factors of globalisation that explain each change, and explain how these changes affected the firm\'s business.\n\n| | 1995 | 2025 |\n|---|---|---|\n| Time to send a new design to a buyer in Europe | 7 days by courier | A few seconds by internet |\n| Time to ship an order to Europe | About 40 days | About 22 days in containers |\n| Import duty on special fabric bought from abroad | 60% | 10% |\n| Number of buyers abroad | 3 | 25 |\n\n*(Imagined figures written by SOYL for practice.)*',
  model: '1. **Design sent in seconds instead of 7 days:** **information technology** (internet, email, video calls).\n2. **Shipping down from about 40 to 22 days:** **transport technology**, especially **containers**.\n3. **Fabric duty cut from 60% to 10%:** **liberalisation** of trade policy (trade barriers removed).\n4. **Effect on costs:** cheaper inputs and faster delivery let the firm **cut costs** and meet buyers\' deadlines.\n5. **Effect on sales:** it reached **many more markets**, so buyers abroad rose from **3 to 25**; its market became **integrated** with Europe\'s.',
  sol: 'Match each row to a factor (IT, transport, liberalisation), then explain the combined effect on costs and on the number of buyers (3 → 25).',
  scheme: [['IT with the figures', 1], ['Transport technology with the figures', 1], ['Liberalisation with the figures', 1], ['Effect on costs and delivery', 1], ['Effect on markets: 3 to 25 buyers', 1]],
}));
Q('sb_port', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**From the diary of Murugan, a crane operator at a container terminal near Chennai (imagined), 2024**\n\nForty years ago my father carried sacks up a wooden plank into the ships, one by one, and a ship took two weeks to load. Today I lift a steel box the size of a room straight off a train and set it on a ship in under two minutes. Nobody opens the box until it reaches the buyer\'s warehouse in Germany or the United States. This morning the boxes held car parts from Sriperumbudur and cotton shirts from Tiruppur. My son, who works in an office in the city, tracks every box on a computer screen.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name the transport technology Murugan works with.', model: '**Containers** (containerised shipping).', sol: 'The steel boxes loaded intact are containers.', scheme: [['Containers', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Give one advantage of this technology mentioned in the source.', model: 'Loading takes **minutes instead of weeks** / goods are **not unpacked** until they reach the buyer.', sol: 'Any one advantage stated in the diary.', scheme: [['One advantage from the source', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How has this change in transport helped globalisation?', model: 'Faster, cheaper loading **cuts the cost and time** of moving goods, so firms in Chennai can **sell car parts and shirts** in Germany and the US profitably. Markets of distant countries become **integrated**.', sol: 'Link lower cost and time to more trade and integrated markets.', scheme: [['Lower cost and time of transport', 1], ['More trade / integration of markets', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the work of Murugan\'s son show a second factor of globalisation?', model: 'He **tracks every container on a computer**, which shows **information technology**. IT lets firms **coordinate production and shipping** across countries in real time.', sol: 'Identify IT and explain its role in coordinating global trade.', scheme: [['Identifies information technology', 1], ['Explains its role', 1]] }),
    ]),
  ],
}));
Q('sb_1993', source({
  t: 2, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**Letter from Harjit Singh, a bicycle-parts maker in Ludhiana, to his brother in Toronto (imagined), 1993**\n\nFor forty years nobody could bring foreign bicycle parts into India without a licence and a heavy tax, so our small factory sold everything it made. Now the government has cut many taxes on imports, and our buyers say that gear sets from abroad are cheaper and smoother. I am worried, but there is good news too: I can now import a modern machine from Taiwan without months of paperwork. If our parts become as good as theirs, why should we not sell them abroad as well?',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'What is the government\'s policy change described in the letter called?', model: '**Liberalisation** (of foreign trade).', sol: 'Cutting import taxes and removing licences is liberalisation.', scheme: [['Liberalisation', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Why had the government put barriers on imports for forty years?', model: 'To **protect Indian producers**, whose industries were young, from **foreign competition**.', sol: 'The purpose of post-independence barriers.', scheme: [['Protection of young domestic industry', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Is Harjit Singh right to see both a threat and an opportunity? Explain.', model: 'Yes. **Threat:** cheaper, better imported parts can **take away his buyers**. **Opportunity:** he can **import modern machines** easily, improve quality and **export** to new markets, so liberalisation can help firms that **upgrade**.', sol: 'One threat and one opportunity, both drawn from the letter, with a judgement.', scheme: [['Threat explained', 1], ['Opportunity explained', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How might competition from imports benefit buyers of bicycles in India?', model: 'Buyers get **better and cheaper parts**, as the letter says of the imported gears. Indian makers must **improve quality and cut prices** to compete, so buyers gain **choice and value**.', sol: 'Two benefits to buyers from competition.', scheme: [['Better or cheaper goods', 1], ['Pressure on local makers to improve', 1]] }),
    ]),
  ],
}));
Q('cb_duties', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined country and figures written by SOYL for practice.)*',
  passage: '**Sagarland (imagined country): average import duty and imports**\n\n| Year | Average import duty (%) | Imports (₹ thousand crore) |\n|---|---|---|\n| 1990 | 80 | 40 |\n| 2005 | 30 | 150 |\n| 2025 | 12 | 600 |',
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: 68, unit: 'percentage points', stem: 'By how many percentage points did the average import duty fall between 1990 and 2025?', sol: 'Step 1: 80 − 12 = 68.\nStep 2: The duty fell by 68 percentage points.' })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: 15, unit: 'times', stem: 'How many times larger were imports in 2025 than in 1990?', sol: 'Step 1: 600 ÷ 40 = 15.\nStep 2: Imports were 15 times larger.' })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain the link between the two columns.', model: 'As Sagarland **liberalised** and cut duties from **80% to 12%**, imported goods became **cheaper**, so imports rose from **40 to 600**. Lower trade barriers allowed **more foreign trade**.', sol: 'Connect falling duties to cheaper imports and higher import volumes, quoting the figures.', scheme: [['Lower duties make imports cheaper', 1], ['Imports rise; figures used', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one benefit and one problem that falling duties could bring to Sagarland.', model: '**Benefit:** consumers and firms get **cheaper goods, machines and raw materials**. **Problem:** **local producers** who cannot match cheaper imports may **lose business**, and their workers their jobs.', sol: 'One gain (consumers or firms) and one cost (local producers).', scheme: [['One benefit', 1], ['One problem', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Production across countries, impact, fair globalisation (project only)
Q('p_m_strategy', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `${P}Which of the following is a common way in which MNCs spread their production in other countries?`,
  opts: [
    'Setting up production jointly with local companies, or buying them',
    'Closing all factories in the countries where they sell',
    'Refusing to place orders with small producers',
    'Producing only in their home country',
  ],
  sol: 'MNCs often partner with local companies (joint production), buy them, or place large orders with small producers. The other options would stop them spreading production.',
}));
Q('p_m_sez', mcq({
  t: 3, d: 2, c: 'recall',
  stem: `${P}Special Economic Zones (SEZs) are set up to`,
  opts: [
    'attract foreign companies to invest by offering world-class facilities and tax benefits',
    'stop all foreign companies from entering India',
    'protect forests from industry',
    'collect higher taxes from exporters',
  ],
  sol: 'SEZs offer electricity, water, roads, transport and storage of world-class standard, and tax exemptions for some years, to attract investment, especially for exports.',
}));
Q('p_m_impact', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `${P}Which group in India has generally gained **most clearly** from globalisation?`,
  opts: [
    'Well-off urban consumers, who have more choice and better quality at lower prices',
    'All small producers, whose sales have risen everywhere',
    'All workers, whose jobs have become more secure',
    'Nobody, because globalisation has had no effects',
  ],
  sol: 'Consumers, especially well-off urban ones, gained choice and quality. Many small producers faced tough competition, and many workers have less secure, flexible jobs.',
}));
Q('p_m_indian_mnc', mcq({
  t: 3, d: 2, c: 'application',
  stem: `${P}An Indian steel company buys a steelmaker in Europe and runs plants in several countries. What does this show?`,
  opts: [
    'Some Indian companies have themselves become multinationals',
    'Only foreign companies can become multinationals',
    'Globalisation has stopped Indian companies from investing',
    'India has banned foreign trade in steel',
  ],
  sol: 'Globalisation has allowed some large Indian firms to invest abroad and operate in many countries, i.e. to become MNCs.',
}));
Q('p_m_flexible', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `${P}"Flexibility" in labour, which many employers seek because of global competition, often means that workers`,
  opts: [
    'are hired for short periods, with less job security and fewer benefits',
    'get permanent jobs with more paid leave',
    'can choose any working hours they like',
    'are paid more for fewer hours of work',
  ],
  sol: 'Competing on cost, employers prefer to hire workers flexibly: temporary contracts, long hours in peak seasons, fewer benefits. That reduces security, the opposite of the other options.',
}));
Q('p_m_fair', mcq({
  t: 3, d: 3, c: 'application',
  stem: `${P}Which step would help make globalisation **fairer**?`,
  opts: [
    'The government supports small producers and makes sure labour laws are properly enforced',
    'Removing all labour laws so that MNCs invest more',
    'Letting rich countries keep their subsidies while poor countries remove theirs',
    'Stopping all trade with other countries',
  ],
  sol: 'Fair globalisation means its benefits are shared: support for small producers and protection of workers. Removing labour laws or accepting unequal rules makes it less fair, and stopping all trade gives up its gains.',
}));
Q('p_ar', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  pre: P,
  a: 'Globalisation has not benefited all producers equally.',
  r: 'Small producers with old technology and little capital often cannot match the quality and prices of large global competitors.',
  sol: 'Both are true, and R explains A: competition rewards those with capital and technology and hurts those without.',
}));
Q('p_tf', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: `${P}True or false? Some large Indian companies have become multinational corporations.`,
  sol: 'Some Indian firms now own and run operations in several countries, for example in steel, telecom and IT.',
}));
Q('p_fb', fb({
  t: 3, d: 1, c: 'recall',
  stem: `${P}Industrial zones with world-class facilities, set up to attract foreign companies, are called Special ___ Zones.`,
  acc: [['Economic']],
  sol: 'They are Special Economic Zones (SEZs).',
}));
Q('p_ord', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: `${P}Arrange the steps by which an imagined MNC places a large order with small producers, in order.`,
  items: [
    'The MNC decides to buy football jerseys from India for its stores in Europe',
    'It places a large order with small garment makers in Tiruppur at a fixed low price',
    'The garment makers hire extra workers for a few months to finish the order',
    'The jerseys are sold in Europe under the MNC\'s brand at a much higher price',
  ],
  sol: 'Decision, order to small producers, temporary hiring to meet it, and sale abroad under the MNC\'s brand.',
}));
Q('p_s_consumers', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `${P}How has globalisation benefited consumers in India? Give two points.`,
  model: '1. Consumers have **greater choice**: goods of many brands and countries are available.\n2. Competition has improved **quality** and lowered **prices** of many goods, such as phones and electronics.',
  sol: 'Two benefits: choice; quality and price.',
  scheme: [['Greater choice', 1], ['Better quality / lower prices', 1]],
}));
Q('p_s_small', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `${P}Why have many small producers in India found globalisation difficult?`,
  model: '1. They face competition from **cheaper imports** and large firms with **better technology**.\n2. With **little capital**, they cannot easily upgrade, so many **lost business** or closed.',
  sol: 'Competition plus lack of capital and technology.',
  scheme: [['Tough competition', 1], ['Lack of capital / technology', 1]],
}));
Q('p_s3_fair', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: `${P}What is "fair globalisation"? Suggest two ways in which the government can promote it.`,
  model: '1. **Fair globalisation** creates opportunities for all and ensures its **benefits are better shared**.\n2. The government should **enforce labour laws** so that workers get their rights.\n3. It should **support small producers** and negotiate at the **WTO** for fairer rules.',
  sol: 'Meaning, then two government measures.',
  scheme: [['Meaning', 1], ['First measure', 1], ['Second measure', 1]],
}));
Q('p_l_impact', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `${P}Explain the impact of globalisation on India.`,
  model: '1. **Consumers:** buyers, especially well-off ones in cities, now enjoy more **choice**, better **quality** and lower **prices** for goods such as phones, cars and appliances.\n2. **Investment and jobs:** MNCs have invested in **phones, cars, electronics and services**, creating new jobs and helping local suppliers of parts and services.\n3. **Indian companies:** some, with new technology and partners, grew into **global firms**; IT and service companies found **new markets** abroad.\n4. **Small producers:** many faced **severe competition** from cheaper imports and big brands; some lost business or closed.\n5. **Workers:** employers seek **flexibility**, so many jobs are **temporary and insecure**. Overall, the gains of globalisation are **unevenly shared**.',
  sol: 'Gains (consumers, investment, Indian firms) and losses (small producers, workers), with a conclusion on uneven benefits.',
  scheme: [['Consumers', 1], ['Investment and jobs', 1], ['Indian companies', 1], ['Small producers', 1], ['Workers; uneven gains', 1]],
}));
Q('p_cb_sez', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `${P}Study the table and answer the questions that follow. *(Imagined zone and figures written by SOYL for practice.)*`,
  passage: '**An imagined Special Economic Zone near Visakhapatnam, after five years**\n\n| Item | Figure |\n|---|---|\n| Companies set up | 40 (12 foreign, 28 Indian) |\n| Jobs created | 30,000 (of which 18,000 on short contracts) |\n| Exports in the fifth year | ₹9,000 crore |\n| Land acquired from farmers | 2,500 acres |',
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: 60, unit: '%', stem: 'What percentage of the jobs created are on short contracts?', sol: 'Step 1: 18,000 ÷ 30,000 × 100.\nStep 2: 0.6 × 100 = 60. So 60%.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Give one benefit of the zone shown in the table.', model: '**30,000 jobs** created / **exports of ₹9,000 crore** / investment by **40 companies**.', sol: 'Any one positive figure from the table.', scheme: [['One benefit with a figure', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Is the zone an example of fair globalisation? Give reasons from the table.', model: '**Partly.** It brought **investment, jobs and exports**, but **60% of jobs are short-contract** and **2,500 acres** were taken from farmers, so the gains are **not shared fairly** unless workers and farmers are protected.', sol: 'Weigh the gains against the costs shown in the table.', scheme: [['Gains from the table', 1], ['Costs and judgement', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two steps that would make the zone fairer to workers and farmers.', model: '(1) Enforce **labour laws**, with more **permanent jobs** and social security. (2) Give farmers **fair compensation**, a share in jobs and **skill training** for local youth.', sol: 'One step for workers, one for farmers.', scheme: [['Step for workers', 1], ['Step for farmers', 1]] }),
    ]),
  ],
}));

// ================================================================ additional t02 item
Q('n_saving', num({
  t: 2, d: 4, c: 'application', marks: 2, value: 230000, unit: '₹',
  stem: 'An imagined garment firm imports special fabric worth ₹4,00,000 a year. The import duty on it falls from 60% to 10%, and container shipping also cuts its freight bill by ₹30,000 a year. What is the firm\'s total yearly saving (in ₹)?',
  sol: 'Step 1: Duty at 60% = 4,00,000 × 60 ÷ 100 = 2,40,000.\nStep 2: Duty at 10% = 4,00,000 × 10 ÷ 100 = 40,000; saving on duty = 2,40,000 − 40,000 = 2,00,000.\nStep 3: Add the freight saving: 2,00,000 + 30,000 = 2,30,000. Total saving ₹2,30,000.',
  scheme: [['Saving on duty (₹2,00,000)', 1], ['Total including freight: ₹2,30,000', 1]],
}));
