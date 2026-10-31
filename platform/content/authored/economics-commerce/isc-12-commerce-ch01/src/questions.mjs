// ISC 12 Commerce, ch01 Business Environment — question bank. Every firm, person and situation is imagined and
// written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or
// board item is reused (D-036). Firms and places differ from the CBSE 12 Business Studies chapters.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Meaning, features and importance
Q('m_totality', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement best describes the **business environment** of a firm?',
  opts: [
    'The sum total of all individuals, institutions and forces, inside and outside the firm, that affect its working and performance',
    'Only the government rules that a firm must obey',
    'The physical surroundings of a factory, such as air and water',
    'The list of customers who buy from the firm',
  ],
  sol: 'Business environment is the totality of forces and institutions, internal and external, that influence a business. Laws, natural surroundings or customers are only parts of it.',
}));
Q('m_specific_general', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Chinar Woollens, an imagined shawl maker in Srinagar, faces two changes: a rival opens a showroom on the same street, and the government changes the tax rate on all textiles. These two changes are examples of, respectively,',
  opts: ['a specific force and a general force', 'a general force and a specific force', 'two general forces', 'two internal forces'],
  sol: 'A rival on the same street affects this firm directly (specific force); a tax change for all textiles affects every firm in the industry (general force).',
}));
Q('m_interrelated', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Rising petrol prices made commuters in an imagined town prefer electric scooters, which in turn led a local workshop to train its mechanics in battery repair. Which feature of business environment does this chain of changes show best?',
  opts: ['Inter-relatedness', 'Relativity', 'Totality of external forces', 'Uncertainty'],
  sol: 'A change in one factor (economic: fuel prices) set off changes in others (social: commuter preference; technological: new repair skills). The factors are inter-related.',
}));
Q('m_uncertainty', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Fashion trends for festival wear can change within a single season, so a garment exporter cannot be sure which colours will sell next year. This illustrates that the business environment is',
  opts: ['uncertain', 'static', 'fully controllable', 'the same for every firm'],
  sol: 'Future changes in the environment are difficult to predict, especially in fast-moving areas such as fashion and technology: uncertainty.',
}));
Q('m_relativity', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Thick woollen jackets sell briskly in Shimla but hardly at all in Chennai, although they are made by the same imagined firm. Which feature of business environment explains this?',
  opts: ['Relativity: the environment differs from place to place', 'Inter-relatedness of factors', 'Specific and general forces', 'Complexity'],
  sol: 'The impact of environmental factors differs from country to country and region to region (here, climate and local needs): relativity.',
}));
Q('m_firstmover', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Pahadi Organics, an imagined food firm in Almora, noticed early that health-conscious buyers were asking for millet snacks and launched a range a year before its rivals, capturing most of the shelf space. Which benefit of understanding the environment does this show?',
  opts: ['It helps the firm identify opportunities and gain a first-mover advantage', 'It helps the firm identify threats and give early warning', 'It helps the firm tap useful resources', 'It helps the firm improve its internal culture'],
  sol: 'By spotting a positive trend early, the firm got there first. Identifying opportunities brings a first-mover advantage.',
}));
Q('m_earlywarning', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Tamarind Tiffins, an imagined lunch-box service in Madurai, saw three cloud kitchens open nearby with app-based ordering. It quickly started its own phone ordering and loyalty card. Understanding the environment helped it mainly by',
  opts: ['identifying a threat and acting on the early warning', 'gaining a first-mover advantage in a new market', 'raising capital from the public', 'reducing the number of competitors'],
  sol: 'The cloud kitchens were a threat; noticing them early let the firm respond before losing customers.',
}));
Q('ar_dynamic', ar({
  t: 1, d: 3, c: 'understanding',
  a: 'The business environment is dynamic.',
  r: 'Technology, consumer tastes, laws and economic conditions keep changing over time.',
  key: 'a',
  sol: 'Both are true, and continuous change in its factors is exactly why the environment is called dynamic.',
}));
Q('ar_control', ar({
  t: 1, d: 3, c: 'analysis',
  a: 'A firm can study and respond to its external environment.',
  r: 'A firm can fully control the factors of its external environment.',
  key: 'c',
  sol: 'The assertion is true: firms monitor the environment and adapt. The reason is false: external factors such as government policy or competitors are largely beyond the firm\'s control.',
}));
Q('tf_complex', tf({
  t: 1, d: 1, c: 'understanding',
  stem: 'The business environment is simple to understand because each of its factors acts on its own.',
  ans: false,
  sol: 'False. Many factors act together and affect one another, so the environment is complex and its combined effect is hard to judge.',
}));
Q('fb_specific', fb({
  t: 1, d: 3, c: 'analysis',
  stem: 'Complete the analogy. A rival opening a shop next door : Specific force :: A change in interest rates by the Reserve Bank of India : ___',
  acc: [['General force', 'general forces', 'General']],
  sol: 'A rival next door affects one firm directly (specific force); an interest-rate change affects all firms alike, so it is a general force.',
}));
Q('s_features', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two features of business environment.',
  model: '1. **Dynamic:** the environment keeps **changing** — technology, tastes and laws do not stay the same.\n2. **Inter-related:** its factors **affect one another**; a change in fuel prices can alter buying habits and spur new technology.',
  sol: 'Any two features (totality, specific and general forces, inter-relatedness, dynamic, uncertainty, complexity, relativity), each explained.',
  scheme: [['First feature explained', 1], ['Second feature explained', 1]],
}));
Q('s_importance2', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Lohit Tea Estate, an imagined tea grower in Dibrugarh, tracks rainfall forecasts, export demand and new government schemes every month. State two ways in which this understanding helps the estate.',
  model: '1. It helps **plan and formulate policies**, for example timing plucking and exports with forecasts.\n2. It helps **identify opportunities** such as new **government schemes** or rising export demand, and **threats** such as poor rainfall, before rivals do.',
  sol: 'Two benefits (planning, opportunities, threats, resources, coping with change, performance) linked to the estate.',
  scheme: [['First benefit linked to the case', 1], ['Second benefit linked to the case', 1]],
}));
Q('s3_importance', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Coromandel Cocoa, an imagined chocolate maker in Kochi, studies its environment closely. Explain three ways in which this helps the firm, with an example of each from a chocolate business.',
  model: '1. **Identifying opportunities:** noticing demand for **sugar-free chocolate** lets it launch early and gain a first-mover advantage.\n2. **Early warning of threats:** seeing an imported brand cut prices lets it plan a **response** in time.\n3. **Tapping resources:** knowing **cocoa growers\' cooperatives** and banks helps it secure inputs and finance on good terms.',
  sol: 'Any three benefits (opportunities, threats, resources, coping with change, planning, performance), each with a chocolate example.',
  scheme: [['First benefit with example', 1], ['Second benefit with example', 1], ['Third benefit with example', 1]],
}));
Q('s3_features3', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the features of business environment that make it difficult for managers to predict its effects: uncertainty, complexity and relativity.',
  model: '1. **Uncertainty:** future changes are **hard to predict**, especially in fast-moving fields such as technology and fashion.\n2. **Complexity:** many factors act **together** and affect one another, so their **combined** effect is hard to judge.\n3. **Relativity:** the impact differs from **place to place** and firm to firm, so one firm\'s experience cannot simply be copied.',
  sol: 'Each of the three features explained.',
  scheme: [['Uncertainty', 1], ['Complexity', 1], ['Relativity', 1]],
}));
Q('l_env', long({
  t: [1, 2], d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) What is meant by business environment? [1]\n(b) Explain any two features of business environment. [2]\n(c) Zari Threads, an imagined maker of silk yarn in Varanasi, ignored reports that power looms were replacing handlooms and lost half its buyers in two years. Explain two ways in which studying the environment could have helped it. [2]',
  model: '(a) **Business environment** is the **sum total of all individuals, institutions and forces**, internal and external, that **affect the working and performance** of a firm.\n\n(b) **Dynamic** — it keeps **changing** with technology, tastes and laws. **Uncertain** — future changes are **hard to predict**, so firms must keep watching it.\n\n(c) **Early warning of threats:** regular study would have shown the **shift to power looms**, giving time to **adapt** its yarn for them. **Coping with rapid change:** knowing the trend early, the firm could have **retrained** staff and **found new buyers** instead of losing half its customers.',
  sol: 'Meaning; two features; two benefits applied to Zari Threads.',
  scheme: [['(a) Meaning', 1], ['(b) Two features', 2], ['(c) Two benefits applied to the case', 2]],
}));

// ================================================================ t02 Environmental scanning
Q('m_scan_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Environmental scanning means',
  opts: [
    'continuously gathering and analysing information about the environment to detect early signs of opportunities and threats',
    'cleaning the surroundings of a factory to reduce pollution',
    'checking the accounts of a firm at the end of the year',
    'scanning products with bar codes at the billing counter',
  ],
  sol: 'Environmental scanning is the careful monitoring of the environment, both internal and external, to spot early signals of change.',
}));
Q('m_scan_case', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Officers of the imagined Narmada Dairy Cooperative in Jabalpur read trade magazines, visit food fairs, note the prices of rival brands and collect farmers\' feedback every month, and then discuss what they found. This activity is',
  opts: ['environmental scanning', 'SWOT analysis', 'recruitment', 'quality control'],
  sol: 'Regularly collecting and analysing information about the environment to spot signals of change is environmental scanning. SWOT may use these findings, but the activity described is scanning.',
}));
Q('m_scan_why', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why should environmental scanning be a continuous activity rather than a one-time exercise?',
  opts: ['Because the environment keeps changing', 'Because laws require firms to scan every day', 'Because scanning replaces planning', 'Because internal factors never change'],
  sol: 'The environment is dynamic, so information gathered once soon becomes out of date.',
}));
Q('tf_scan', tf({
  t: 2, d: 1, c: 'recall',
  stem: 'Environmental scanning needs to be done only once, when a business is first set up.',
  ans: false,
  sol: 'False. Because the environment is dynamic, scanning has to be continuous.',
}));
Q('fb_scan', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The careful monitoring of the environment to detect early signals of change is called environmental ___.',
  acc: [['scanning']],
  sol: 'Environmental scanning.',
}));
Q('ar_scan', ar({
  t: 2, d: 3, c: 'understanding',
  a: 'Environmental scanning helps a firm spot opportunities and threats early.',
  r: 'The micro environment includes suppliers, customers and competitors.',
  key: 'b',
  sol: 'Both statements are true, but the make-up of the micro environment does not explain why scanning gives early signals; that comes from continuous monitoring of change.',
}));
Q('s_scan', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is environmental scanning? Give one reason why firms carry it out.',
  model: '**Environmental scanning** is the **continuous gathering and analysis of information** about the internal and external environment to **detect early signals** of change. Firms do it to **spot opportunities and threats in time** and plan their response.',
  sol: 'Meaning plus one reason.',
  scheme: [['Meaning', 1], ['Reason', 1]],
}));
Q('s3_scan_steps', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain how Aravalli Stone Crafts, an imagined small firm making marble handicrafts in Jodhpur, could carry out environmental scanning, giving one example for each step: gathering, analysing and using the information.',
  model: '1. **Gathering:** the owner collects information from **trade fairs, export portals, newspapers and buyers\' feedback**, for example on demand for light-weight décor.\n2. **Analysing:** the team **sorts** the signals into **opportunities and threats**, for example rising online orders and cheaper resin copies.\n3. **Using it:** the findings are **shared** with managers and used to **plan**, for example opening an online store.',
  sol: 'Three steps of scanning, each with a suitable example.',
  scheme: [['Gathering with example', 1], ['Analysing with example', 1], ['Using with example', 1]],
}));

// ================================================================ t03 Micro environment
Q('m_internal', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is an **internal** factor in the micro environment of a firm?',
  opts: ['The firm\'s own mission, objectives and value system', 'The suppliers of its raw material', 'The customers who buy its products', 'The banks that lend to it'],
  sol: 'Mission, objectives and values are inside the firm and largely under its control. Suppliers, customers and financiers are external micro factors.',
}));
Q('m_supplier', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Coromandel Cocoa (imagined) has to raise its chocolate prices because the cooperative that sells it cocoa beans has raised its rates by a fifth. Which factor of its environment caused the change?',
  opts: ['Suppliers, an external micro factor', 'Customers, an external micro factor', 'The technological environment', 'Its own corporate culture'],
  sol: 'The cocoa cooperative supplies raw material; suppliers belong to the external micro environment.',
}));
Q('m_intermediary', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Sundarban Honey, an imagined firm in Kolkata, sells through a network of distributors, a courier company and two online marketplaces. In its micro environment, these are',
  opts: ['marketing intermediaries', 'competitors', 'financiers', 'internal factors'],
  sol: 'Firms that help a business distribute, deliver and sell its goods are marketing intermediaries.',
}));
Q('m_publics', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Residents of a colony near the imagined Malwa Bakes factory in Indore complain to the media about smoke from its ovens, and a local newspaper carries the story. Which part of the micro environment does this group represent?',
  opts: ['Public (local public and media)', 'Suppliers', 'Marketing intermediaries', 'Internal human resources'],
  sol: 'Any group with an actual or potential interest in, or effect on, the firm — local residents, media, citizens\' groups — is part of the public in the micro environment.',
}));
Q('m_hr', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Half of the skilled carpenters of Shillong Bamboo Furniture, an imagined firm, left for better-paying jobs, and orders were delayed. The factor affected is',
  opts: ['human resources, an internal factor', 'competitors, an external micro factor', 'the political environment', 'the legal environment'],
  sol: 'The skills and number of a firm\'s own employees are an internal factor (human resources).',
}));
Q('m_competitor', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Two new brands of packaged idli batter started offering free delivery in the city where an imagined batter maker sells. Which external micro factor is the maker facing?',
  opts: ['Competitors', 'Suppliers', 'Financiers', 'Marketing intermediaries'],
  sol: 'Other firms selling similar products to the same buyers are competitors.',
}));
Q('ar_micro', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Customers are an internal factor of a firm\'s micro environment.',
  r: 'A firm can fully decide what its customers will buy.',
  key: 'd',
  sol: 'Both statements are false. Customers are an external micro factor, and a firm can influence but not control their choices.',
}));
Q('tf_internal', tf({
  t: 3, d: 1, c: 'understanding',
  stem: 'Internal factors of the environment, such as a firm\'s policies and resources, are generally within its control.',
  ans: true,
  sol: 'True. A firm can change its own policies, structure and resources, though not overnight; external factors are largely beyond its control.',
}));
Q('fb_micro', fb({
  t: 3, d: 3, c: 'analysis',
  stem: 'Complete the analogy. A bank that lends money to the firm : Financier :: A wholesaler who stocks and resells the firm\'s goods : ___',
  acc: [['Marketing intermediary', 'marketing intermediaries', 'Intermediary', 'Middleman']],
  sol: 'A lending bank is a financier; a wholesaler who helps the goods reach buyers is a marketing intermediary.',
}));
Q('mt_micro', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each factor in the micro environment of an imagined spice exporter with its category.',
  pairs: [
    ['Pepper growers who sell to the exporter', 'Suppliers'],
    ['Foreign importers who buy its spices', 'Customers'],
    ['The exporter\'s quality-first value system', 'Internal factor'],
    ['A shipping agent who books containers', 'Marketing intermediary'],
  ],
  sol: 'Growers supply inputs; importers are customers; the value system is internal; the shipping agent helps deliver the goods, so it is an intermediary.',
}));
Q('s_internal', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two internal factors of a firm\'s environment.',
  model: '1. **Value system and mission:** the beliefs and goals of the owners shape **policies and choices**, such as a firm refusing to use child labour.\n2. **Financial resources:** the **funds** available decide whether the firm can expand, buy technology or survive a bad year.',
  sol: 'Any two internal factors (value system, mission and objectives, structure, culture, human, physical, technological, financial or marketing resources, image) explained.',
  scheme: [['First factor explained', 1], ['Second factor explained', 1]],
}));
Q('s_external_micro', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Kutch Salt Works, an imagined salt producer, sells through local wholesalers and depends on a transport firm for trucks. A rival has just cut prices. Identify two external micro factors in this situation and say how each affects the firm.',
  model: '1. **Marketing intermediaries** — the **wholesalers** and **transport firm** decide how fast and widely its salt reaches buyers.\n2. **Competitors** — the **rival\'s price cut** may take away its customers, forcing it to respond.',
  sol: 'Two external micro factors identified from the case, each with its effect.',
  scheme: [['First factor with effect', 1], ['Second factor with effect', 1]],
}));
Q('s3_micro', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between the micro environment and the macro environment of a business on any three bases.',
  model: '1. **Nearness:** the micro environment is the firm\'s **immediate** surroundings; the macro environment is the **wider** setting.\n2. **Components:** micro covers **internal factors, suppliers, customers, competitors, intermediaries, financiers and the public**; macro covers **economic, social, technological, political and legal** forces.\n3. **Control and effect:** micro factors affect **one firm directly** and some can be influenced; macro forces affect **all firms** and are beyond the firm\'s control.',
  sol: 'Three valid bases of difference.',
  scheme: [['First basis', 1], ['Second basis', 1], ['Third basis', 1]],
}));
Q('s3_internal3', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Shillong Bamboo Furniture (imagined) has a strong brand among hotels, an old machine shop, and owners who insist on using only certified bamboo. Identify three internal factors from these details and explain how each affects the firm.',
  model: '1. **Company image and brand:** the **strong brand among hotels** brings repeat orders and lets it charge a fair price.\n2. **Physical assets and technology:** the **old machine shop** limits speed and finish, and may raise costs.\n3. **Value system:** insisting on **certified bamboo** builds trust with eco-conscious buyers but may raise raw-material cost.',
  sol: 'Three internal factors drawn from the details, each with its effect.',
  scheme: [['Brand or image', 1], ['Physical assets or technology', 1], ['Value system', 1]],
}));
Q('l_micro', long({
  t: [3, 4], d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Distinguish between internal and external factors of a firm\'s environment. [1]\n(b) Sahyadri EV Scooters, an imagined maker in Nashik, buys batteries from one supplier, sells through 40 dealers, borrows from a cooperative bank, and faces two bigger rival brands. Identify four external micro factors and explain how each could affect the firm. [4]',
  model: '(a) **Internal factors** (such as policies, structure and resources) are **within the firm** and largely controllable; **external factors** (such as suppliers, customers, competitors, the economy and laws) are **outside** it and largely beyond its control.\n\n(b) 1. **Supplier** — depending on **one battery supplier** means any delay or price rise stops production.\n2. **Marketing intermediaries** — the **40 dealers** decide how widely and quickly scooters reach buyers.\n3. **Financier** — the **cooperative bank\'s** terms decide how cheaply the firm can expand.\n4. **Competitors** — the **two bigger rivals** may cut prices or launch new models, forcing Sahyadri to respond.',
  sol: 'Distinction; four external micro factors with effects.',
  scheme: [['(a) Distinction', 1], ['(b) Four factors with effects', 4]],
}));

// ================================================================ t04 Macro environment
Q('m_economic', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The Reserve Bank of India raises its policy rate, and banks increase interest on business loans. For an imagined furniture maker planning a new factory, this change belongs to the',
  opts: ['economic environment', 'social environment', 'technological environment', 'political environment'],
  sol: 'Interest rates, inflation, income and economic policies form the economic environment.',
}));
Q('m_social', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'More working couples in an imagined city now prefer ready-to-cook meal kits to cooking from scratch. An imagined food firm sees this as a change in its',
  opts: ['social environment', 'legal environment', 'economic environment', 'political environment'],
  sol: 'Changes in lifestyles, habits, values and family patterns are part of the social environment.',
}));
Q('m_tech', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Farmers near an imagined pesticide dealer start hiring drones to spray crops, cutting spraying time by more than half. This is a change in the',
  opts: ['technological environment', 'social environment', 'legal environment', 'political environment'],
  sol: 'New methods, machines and innovations make up the technological environment.',
}));
Q('m_political', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined foreign electronics company decides to build a plant in a state because the government there has been stable for years and welcomes investment. Which macro dimension most influenced its decision?',
  opts: ['Political environment', 'Technological environment', 'Social environment', 'Micro environment'],
  sol: 'Political stability and the government\'s attitude to business form the political environment.',
}));
Q('m_legal', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A new rule requires all packaged snacks to show the amount of salt and sugar on the front of the pack, and an imagined snack maker redesigns its packets. This change comes from the',
  opts: ['legal environment', 'technological environment', 'economic environment', 'micro environment'],
  sol: 'Laws, rules and regulations that a business must follow make up the legal environment.',
}));
Q('m_odd', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Which one of the following is **not** a part of the macro environment of a business?',
  opts: ['The prices charged by a rival in the same market', 'The rate of inflation in the economy', 'The literacy rate of the population', 'A new law on the privacy of customer data'],
  sol: 'A rival\'s prices belong to the micro environment (competitors). Inflation (economic), literacy (social) and a privacy law (legal) are macro forces.',
}));
Q('ar_macro', ar({
  t: 4, d: 3, c: 'understanding',
  a: 'Growing health awareness has increased the demand for millet-based foods.',
  r: 'The social environment includes changes in people\'s values, habits and lifestyles.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: health awareness is a social change that alters what people buy.',
}));
Q('ar_tech', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'Online shopping apps have changed the way many small retailers sell.',
  r: 'The political environment includes the stability of the government.',
  key: 'b',
  sol: 'Both are true, but government stability (political) does not explain the change in retailing, which is technological.',
}));
Q('tf_tastes', tf({
  t: 4, d: 1, c: 'understanding',
  stem: 'A change in the tastes and preferences of consumers is part of the technological environment.',
  ans: false,
  sol: 'False. Tastes and preferences belong to the social environment.',
}));
Q('fb_economic', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'Interest rates, inflation and per capita income are factors of the ___ environment.',
  acc: [['economic']],
  sol: 'They are economic factors.',
}));
Q('mt_macro', match({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Match each change faced by an imagined travel agency with the macro dimension it belongs to.',
  pairs: [
    ['More families now take short weekend trips', 'Social'],
    ['Customers book tickets through a new AI travel app', 'Technological'],
    ['A new rule caps cancellation fees on air tickets', 'Legal'],
    ['Rising fuel prices push up air fares', 'Economic'],
  ],
  sol: 'Travel habits are social; apps are technological; a rule on fees is legal; fuel prices and fares are economic.',
}));
Q('s_macro2', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain how each of the following changes could affect an imagined two-wheeler showroom: (i) banks raise interest rates on vehicle loans; (ii) more young buyers prefer electric scooters.',
  model: '(i) **Economic environment:** costlier loans **reduce demand**, since many buyers purchase on credit.\n(ii) **Social environment:** the showroom must **stock electric models** and train staff, or lose young buyers.',
  sol: 'Each change linked to its dimension and its effect.',
  scheme: [['(i) Economic effect', 1], ['(ii) Social effect', 1]],
}));
Q('s3_macro', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Malwa Bakes (imagined), Indore, faces three changes: a new labelling law, a rise in wheat prices, and customers choosing whole-grain bread. Identify the macro dimension of each change and explain one effect on the bakery.',
  model: '1. **Labelling law — legal:** packs must be **redesigned** to show the required details, adding cost.\n2. **Rising wheat prices — economic:** **raw-material cost** rises, squeezing margins or forcing a price increase.\n3. **Whole-grain preference — social:** the bakery should **add whole-grain lines** to keep customers.',
  sol: 'Each change classified and its effect explained.',
  scheme: [['Legal with effect', 1], ['Economic with effect', 1], ['Social with effect', 1]],
}));
Q('s3_lpg', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain liberalisation, privatisation and globalisation as changes in the economic environment of Indian business since 1991.',
  model: '1. **Liberalisation:** removal of unnecessary **controls and licences**, freeing firms to decide on production, prices and expansion.\n2. **Privatisation:** a **reduced role of the public sector**, with government sharing or selling ownership of public enterprises.\n3. **Globalisation:** **integration** of the Indian economy with the world economy through freer **trade, investment and technology** flows.',
  sol: 'Each of the three changes explained.',
  scheme: [['Liberalisation', 1], ['Privatisation', 1], ['Globalisation', 1]],
}));
Q('l_macro', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the five components of the macro environment, giving for each an example of a change that could affect an imagined mobile-accessories shop.',
  model: '1. **Economic:** interest rates, inflation, incomes and policies — a **fall in incomes** reduces spending on accessories.\n2. **Social:** values, habits, demographics — more **students using phones for study** raises demand for chargers.\n3. **Technological:** new methods and products — a new **charging standard** makes old cables obsolete.\n4. **Political:** stability and government attitude — **stable policies** encourage the shop to invest in a second outlet.\n5. **Legal:** laws and rules — a rule on **safety certification** of chargers forces it to stock certified items.',
  sol: 'One mark for each component with a suitable example.',
  scheme: [['Economic', 1], ['Social', 1], ['Technological', 1], ['Political', 1], ['Legal', 1]],
}));

// ================================================================ t05 SWOT analysis
Q('m_swot_internal', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'In a SWOT analysis, which two elements come from the firm\'s **internal** environment?',
  opts: ['Strengths and weaknesses', 'Opportunities and threats', 'Strengths and opportunities', 'Weaknesses and threats'],
  sol: 'Strengths and weaknesses are inside the firm; opportunities and threats come from the external environment.',
}));
Q('m_strength', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined bakery has three master bakers trained in France and a cake recipe that customers cannot find elsewhere. In its SWOT analysis, these are',
  opts: ['strengths', 'opportunities', 'weaknesses', 'threats'],
  sol: 'Skilled staff and a unique recipe are internal advantages: strengths.',
}));
Q('m_threat', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'A large supermarket chain plans to open a store with a bakery section in the same market as the imagined bakery. In the bakery\'s SWOT analysis, this is',
  opts: ['a threat', 'an opportunity', 'a weakness', 'a strength'],
  sol: 'An external development that could hurt the bakery is a threat.',
}));
Q('m_opportunity', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'A state government announces subsidies for small food-processing units that buy energy-efficient ovens. For a small imagined bakery, this is',
  opts: ['an opportunity', 'a strength', 'a threat', 'a weakness'],
  sol: 'A favourable external development the firm can use is an opportunity.',
}));
Q('m_weakness', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'Zari Threads (imagined) has outdated machines, no website and depends on a single buyer for most of its sales. In SWOT terms these are',
  opts: ['weaknesses', 'threats', 'opportunities', 'strengths'],
  sol: 'Internal limitations of the firm are weaknesses. (Dependence on one buyer is an internal weakness of its sales base, even though the buyer is outside.)',
}));
Q('tf_swot', tf({
  t: 5, d: 1, c: 'understanding',
  stem: 'In a SWOT analysis, opportunities and threats arise from the external environment of the firm.',
  ans: true,
  sol: 'True. Opportunities and threats come from changes outside the firm, such as new rivals or new government schemes; strengths and weaknesses lie inside it.',
}));
Q('s_swot', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is SWOT analysis? Why is it useful to a small business?',
  model: '**SWOT analysis** is a study of a firm\'s internal **Strengths** and **Weaknesses** and the external **Opportunities** and **Threats** it faces. It helps a small business **build on strengths, correct weaknesses, use opportunities and guard against threats** when planning.',
  sol: 'Meaning with all four elements, plus usefulness.',
  scheme: [['Meaning with four elements', 1], ['Usefulness', 1]],
}));
Q('s3_swot_make', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Prepare a simple SWOT analysis for Tamarind Tiffins (imagined), a home-food lunch service in Madurai, using these facts: loyal office customers; only two delivery staff; offices returning to full attendance; cloud kitchens opening nearby.',
  model: '| | |\n|---|---|\n| **Strength:** loyal office customers who trust home-style food | **Weakness:** only two delivery staff limit growth and speed |\n| **Opportunity:** offices returning to **full attendance** mean more lunch orders | **Threat:** **cloud kitchens** nearby compete on variety and app ordering |',
  sol: 'Each fact placed correctly in S, W, O or T with a short reason.',
  scheme: [['Strength and weakness correct', 1], ['Opportunity correct', 1], ['Threat correct', 1]],
}));
Q('l_swot', long({
  t: [5, 3, 4], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Kosi Cane Crafts is an imagined cane-furniture unit in Purnea run by eight artisans. It has a strong local reputation and low costs, but no website and little working capital. Hotel chains are looking for eco-friendly furniture, while cheap plastic furniture is flooding the market and a new rule requires fire-safety labels on furniture for hotels.\n(a) Prepare a SWOT analysis for the unit. [4]\n(b) Suggest one strategy that uses a strength to grab an opportunity. [1]',
  model: '(a) **Strengths** (internal, helpful): a strong **local reputation** built over years, and **low costs**, because eight skilled artisans work with locally grown cane.\n**Weaknesses** (internal, harmful): **no website**, so distant buyers cannot find the unit; and **little working capital**, so it cannot buy material in advance for large orders.\n**Opportunities** (external, helpful): **hotel chains** looking for **eco-friendly** furniture, a growing and well-paying market.\n**Threats** (external, harmful): **cheap plastic furniture** flooding the market; and the new **fire-safety labelling rule**, which adds cost and paperwork if the unit cannot comply.\n\n(b) Use its **low costs and reputation** to offer **certified, eco-friendly cane sets** to hotel chains. By meeting the labelling rule, it turns the rule into a selling point rather than a barrier.',
  sol: 'Each element correctly classified (the labelling rule is an external threat or, if met, an advantage); a strategy matching a strength to an opportunity.',
  scheme: [['(a) Strengths and weaknesses', 2], ['(a) Opportunities and threats', 2], ['(b) S–O strategy', 1]],
}));

// ================================================================ case-based
Q('cb_scan_micro', caseQ({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Brahmaputra Boatworks (imagined), Guwahati**\n\nBrahmaputra Boatworks builds fibreglass ferries. Every Friday its manager, Rituparna, spends an hour reading river-transport news, talking to boat operators and checking the rates of two rival yards. Last month she learnt that the state plans to add twenty new ferry routes, and that the resin supplier in Kolkata may raise prices. The boatworks also depends on a cooperative bank for working capital and on a trucking firm to carry boats to the river.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Rituparna\'s Friday routine is an example of', opts: ['environmental scanning', 'SWOT analysis', 'staffing', 'quality control'], sol: 'Regularly gathering and analysing information about the environment is environmental scanning.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the external micro factor represented by the resin supplier.', model: '**Suppliers.**', sol: 'The resin supplier provides raw material: a supplier.', scheme: [['Suppliers', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two other external micro factors in the passage and explain how each matters to the boatworks.', model: '1. **Financier:** the **cooperative bank** provides working capital; its terms affect how many boats can be built.\n2. **Marketing intermediary / competitors:** the **trucking firm** decides timely delivery; the **two rival yards** set price limits.', sol: 'Two factors from the passage with their importance.', scheme: [['First factor with importance', 1], ['Second factor with importance', 1]] }), [
      short({ t: [2, 5], d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Classify the twenty new ferry routes and the possible resin price rise as opportunities or threats, with reasons.', model: '**New ferry routes — opportunity:** more routes mean **more orders** for ferries.\n**Resin price rise — threat:** higher **raw-material cost** may cut margins or force price increases.', sol: 'Correct classification with reasons.', scheme: [['Routes as opportunity', 1], ['Resin rise as threat', 1]] }),
    ]),
  ],
}));
Q('cb_macro_swot', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm, written by SOYL for practice.)*',
  passage: '**Kalimpong Kitchens (imagined)**\n\nKalimpong Kitchens makes ready-to-eat momos and sells them through cafés. Its chefs are highly skilled, but its cold-storage unit is small. Recently, more young people have started eating packaged snacks at work, a new food-safety rule requires a licence number on every pack, banks have cut interest rates on small business loans, and a delivery app has made it easy for cafés to order supplies online.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'The new food-safety rule belongs to which dimension of the macro environment?', opts: ['Legal', 'Social', 'Technological', 'Economic'], sol: 'Rules a business must follow form the legal environment.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows a change in the technological environment.', model: '"**a delivery app has made it easy for cafés to order supplies online**".', sol: 'The line about the delivery app.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: [5, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify one strength and one weakness of the firm from the passage.', model: '**Strength:** **highly skilled chefs**. **Weakness:** a **small cold-storage unit**, which limits how much it can stock.', sol: 'One internal strength and one internal weakness.', scheme: [['Strength', 1], ['Weakness', 1]] }), [
      short({ t: [4, 5], d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how the cut in interest rates could help the firm deal with its weakness.', model: 'Cheaper **loans (economic opportunity)** let the firm **borrow to enlarge its cold storage**, removing the weakness that limits its stock and sales.', sol: 'Links the economic change to fixing the weakness.', scheme: [['Interest cut as economic opportunity', 1], ['Linked to enlarging cold storage', 1]] }),
    ]),
  ],
}));
