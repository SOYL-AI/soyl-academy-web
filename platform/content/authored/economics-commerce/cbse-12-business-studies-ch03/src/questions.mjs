// CBSE 12 Business Studies, ch03 Business Environment — question bank. Every firm, person, town and
// situation is imagined by SOYL and labelled as such; no NCERT text, example or exercise and no
// board/sample-paper item is reused (D-036). Real-world facts are limited to stable ones (demonetisation
// announced on 8 November 2016, withdrawing the legal-tender status of the old ₹500 and ₹1,000 notes).
// Liberalisation, privatisation and globalisation as an impact on business is a deleted topic and is not
// tested. The only computed figure (the cash-to-digital share in the case of Shree Ganesh Traders) is
// derived here.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figure
// Imagined wholesale shop: receipts in one month before and after the note withdrawal (₹ thousand).
export const SHOP = { before: { cash: 360, digital: 40 }, after: { cash: 210, digital: 190 } };
const tot = (m) => m.cash + m.digital;
export const DIG_SHARE_BEFORE = (100 * SHOP.before.digital) / tot(SHOP.before); // 10
export const DIG_SHARE_AFTER = (100 * SHOP.after.digital) / tot(SHOP.after); // 47.5
assert.equal(tot(SHOP.before), 400);
assert.equal(tot(SHOP.after), 400);
assert.equal(DIG_SHARE_BEFORE, 10);
assert.equal(DIG_SHARE_AFTER, 47.5);

// ================================================================ t01 Concept, features and importance
Q('m_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In Business Studies, the term **business environment** refers to',
  opts: [
    'the total of all individuals, institutions and other forces outside a business that may affect its performance',
    'the office building, machines and furniture of a business',
    'the relations among the employees working inside one firm',
    'only the customers who buy the products of a business',
  ],
  sol: 'Business environment means the sum of all **external** forces (individuals, institutions and other forces) that lie outside the control of a business but may affect it. Buildings and staff relations are internal; customers are only one part of it.',
}));
Q('m_specific', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Rangoli Paints (an imagined firm in Pune) notices that its two main suppliers of titanium dioxide have raised prices, and a rival has opened a depot next door. These forces are examples of',
  opts: ['specific forces', 'general forces', 'internal forces', 'controllable forces'],
  sol: 'Suppliers and competitors affect an individual firm **directly** in its day-to-day working, so they are **specific** forces. General forces (economic, social, political, legal, technological) affect all firms indirectly. Neither group is internal or under the firm\'s control.',
}));
Q('m_general', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is a **general** force of the business environment?',
  opts: [
    'A change in the social attitudes of people towards healthy food',
    'A firm\'s regular customers asking for faster delivery',
    'A supplier delaying the delivery of raw material to one factory',
    'A local investor offering to buy shares of a particular company',
  ],
  sol: 'A change in social attitudes affects **all** firms, though indirectly, so it is a general force. Customers, suppliers and investors deal with one firm directly; they are specific forces.',
}));
Q('m_relativity', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A rise in demand for woollen jackets in Ladakh does not change demand for them in coastal Chennai. Which feature of business environment does this illustrate?',
  opts: ['Relativity', 'Inter-relatedness', 'Totality of external forces', 'Complexity'],
  sol: 'The impact of environmental forces **differs from place to place** (and from firm to firm). This is **relativity**. Inter-relatedness is about forces affecting each other; totality is about the sum of forces; complexity is about how hard the forces are to understand.',
}));
Q('m_dynamic', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Business environment is called **dynamic** because',
  opts: [
    'it keeps changing all the time, in technology, tastes, competition and government policy',
    'it can be fully controlled by the top management of a firm',
    'it affects only large companies and never small firms',
    'its future course can be predicted exactly',
  ],
  sol: 'Dynamic means **constantly changing**. The environment is outside a firm\'s control, affects firms of every size, and its future is uncertain, so the other options describe the opposite.',
}));
Q('m_uncertainty', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A fashion brand in Surat (imagined) cannot tell whether this winter\'s colours will still be popular next year. This shows which feature of business environment?',
  opts: ['Uncertainty', 'Relativity', 'Specific and general forces', 'Totality of external forces'],
  sol: 'Future conditions are **hard to predict**, especially in fast-changing fields such as fashion and technology. That is **uncertainty**.',
}));
Q('m_firstmover', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Dhruv Agro (imagined) spotted early that city families wanted ready-to-cook millet mixes, launched one before any rival and became the best-known brand. Which benefit of understanding the environment did it gain?',
  opts: [
    'Identifying opportunities and getting the first-mover advantage',
    'Identifying threats and getting early warning signals',
    'Tapping useful resources',
    'Assistance in planning only for the next week',
  ],
  sol: 'Spotting a new demand before others and acting on it first gives the **first-mover advantage**, the benefit of identifying opportunities. Early warning signals are about threats; tapping resources is about inputs such as finance and raw material.',
}));
Q('m_warning', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Seeing that two foreign brands were about to enter India with cheaper electric scooters, Vidyut Motors (imagined) cut costs, improved after-sales service and advertised its local network. This illustrates the importance of business environment in',
  opts: [
    'identifying threats and early warning signals',
    'identifying opportunities and getting the first-mover advantage',
    'tapping useful resources',
    'improving the image of the government',
  ],
  sol: 'The coming competition is a **threat**; reading it early lets the firm prepare. That is the benefit of **identifying threats and early warning signals**.',
}));
Q('m_resources', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Business environment is a **source of inputs** such as finance, machines, raw material and labour, and a business supplies outputs to it. This explains why understanding it helps in',
  opts: ['tapping useful resources', 'improving performance only through advertising', 'reducing competition by law', 'avoiding all risks'],
  sol: 'A firm gets its **resources** from the environment and must understand it to obtain them on good terms. No firm can avoid all risks or reduce competition simply by understanding the environment.',
}));
Q('m_not_feature', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is **NOT** a feature of business environment?',
  opts: ['It is fully under the control of the business', 'It is dynamic', 'It is complex', 'It is relative'],
  sol: 'The environment consists of **external** forces that a firm **cannot control**; it can only adapt to them. Dynamic, complex and relative are all features.',
}));
Q('ar_interrelated', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'Different forces of business environment are closely inter-related.',
  r: 'A rise in health awareness, a social change, can increase demand for fitness trackers and push firms to adopt new sensor technology.',
  sol: 'Both are true, and R explains A: one social change sets off economic (demand) and technological (new products) changes, showing that the forces are **inter-related**.',
}));
Q('ar_control', ar({
  t: 1, d: 2, c: 'analysis', key: 'd',
  a: 'A firm can change its business environment whenever it wishes.',
  r: 'Business environment consists of forces that are outside the control of an individual business.',
  sol: 'A is false: the environment is external and a single firm cannot change it at will; it can only respond. R is true.',
}));
Q('ar_performance', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Firms that keep studying their environment usually perform better over time.',
  r: 'Business environment includes both specific forces and general forces.',
  sol: 'Both statements are true, but R does not explain A. A is true because such firms adjust their plans in time; R merely classifies the forces.',
}));
Q('tf_complex', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Business environment is complex because it is made up of many inter-related and changing forces whose combined effect is hard to understand fully.',
  sol: 'This is the meaning of **complexity**: it is easy to list the forces but hard to understand how together they will affect a business.',
}));
Q('tf_onlybig', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Only large companies need to understand their business environment; small firms are not affected by it.',
  sol: 'Every business, large or small, operates in the environment and is affected by it; small firms may even be **more** vulnerable because they have fewer resources to absorb shocks.',
}));
Q('fb_totality', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Business environment is the sum or aggregate of all things external to a firm. This feature is called the ___ of external forces.',
  acc: [['totality']],
  sol: 'This feature is called the **totality** of external forces.',
}));
Q('mt_features', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined situation with the feature of business environment it shows best.',
  pairs: [
    ['A new tax rule makes a firm also revise its prices and its advertising', 'Inter-relatedness'],
    ['Mobile phone models become outdated within a year or two', 'Dynamic nature'],
    ['Demand for raincoats rises in Kerala in June but not in Rajasthan', 'Relativity'],
    ['A firm cannot predict how a coming election will change its sales', 'Uncertainty'],
  ],
  sol: 'One change sets off others (inter-relatedness); constant change (dynamic); different effect in different places (relativity); future hard to predict (uncertainty).',
}));
Q('s_specgen', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do specific forces of business environment differ from general forces? Give one example of each.',
  model: '**Specific forces** affect an individual firm **directly** in its day-to-day working, e.g. its **customers, suppliers, competitors and investors**. **General forces** affect **all** firms, **indirectly**, e.g. **economic, social, political, legal and technological** conditions.',
  sol: 'Contrast direct vs indirect effect and individual firm vs all firms, with one example each.',
  scheme: [['Specific forces with example', 1], ['General forces with example', 1]],
}));
Q('s_coping', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'With an imagined example, show how understanding the environment helps a firm cope with rapid changes.',
  model: 'When online shopping grew fast, **Kavya Footwear** (imagined) studied the trend, set up its own **website and delivery tie-ups**, and trained staff to answer online queries. By **adapting in time**, it kept its customers instead of losing them to online sellers.',
  sol: 'Name a rapid change, the firm\'s timely response, and the result.',
  scheme: [['A rapid change in the environment', 1], ['How studying it let the firm adapt in time', 1]],
}));
Q('s_planning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does knowledge of the business environment assist in planning and policy formulation?',
  model: 'Since the environment brings **opportunities and threats**, knowing it helps managers decide **which goals to set and which course of action to follow**. For example, a firm expecting a sharp rise in raw-material prices may plan **bulk buying** or a **substitute material** in advance.',
  sol: 'Link environmental knowledge to choosing goals and policies, with an illustration.',
  scheme: [['Environment gives the basis for future plans and policies', 1], ['Illustration', 1]],
}));
Q('s3_three_features', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three features of business environment.',
  model: '1. **Totality of external forces:** it is the sum of all forces outside the firm, taken together.\n2. **Dynamic nature:** it keeps changing in technology, tastes, competition and policy.\n3. **Uncertainty:** future changes are hard to predict, especially in fast-moving fields such as IT and fashion.',
  sol: 'Any three of: totality, specific and general forces, inter-relatedness, dynamic, uncertainty, complexity, relativity, each with a short explanation.',
  scheme: [['First feature explained', 1], ['Second feature explained', 1], ['Third feature explained', 1]],
}));
Q('s3_importance', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Pankhuri Cosmetics (imagined) studies market reports, government notices and social-media trends every month. Explain three ways in which this habit helps the firm.',
  model: '1. **Opportunities:** it can spot new demand early (say for herbal products) and gain the **first-mover advantage**.\n2. **Threats:** it gets **early warning** of new rivals or stricter rules and can prepare.\n3. **Improves performance:** by matching its plans to changes, it keeps **customers and profits** over time.',
  sol: 'Any three benefits (opportunities, threats, tapping resources, coping with change, planning, performance) applied to the firm.',
  scheme: [['First benefit applied', 1], ['Second benefit applied', 1], ['Third benefit applied', 1]],
}));
Q('l_importance', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: '"Understanding the business environment is essential for the success of a business." Explain any five reasons in support of this statement.',
  model: '1. **Identifying opportunities and first-mover advantage:** firms that spot new needs early lead the market.\n2. **Identifying threats and early warning signals:** firms can prepare for new rivals, rules or shortages.\n3. **Tapping useful resources:** finance, raw material, machines and labour come from the environment.\n4. **Coping with rapid changes:** firms that watch the environment adapt in time instead of being surprised.\n5. **Assistance in planning and policy formulation:** knowledge of opportunities and threats is the basis of future plans. (Also: **improving performance** over time.)',
  sol: 'Five distinct points with a line of explanation each.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1], ['Fourth reason', 1], ['Fifth reason', 1]],
}));
Q('l_features', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five features of business environment, with a short illustration of each.',
  model: '1. **Totality of external forces:** all outside forces taken together, e.g. customers, rivals, laws and technology.\n2. **Specific and general forces:** suppliers and customers act directly; economic and social forces act indirectly.\n3. **Inter-relatedness:** a new law can change prices, demand and technology at once.\n4. **Dynamic nature:** phone models become outdated within a year or two.\n5. **Relativity:** demand for woollens rises in hill towns but not on the coast. (Also: uncertainty, complexity.)',
  sol: 'Five features, each named, explained and illustrated briefly.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1], ['Fourth feature', 1], ['Fifth feature', 1]],
}));

// ================================================================ t02 Dimensions
Q('m_dim_economic', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A fall in the interest rates charged by banks on loans helps Saarthi Housing (an imagined builder) sell more flats. This change belongs to the',
  opts: ['economic environment', 'social environment', 'legal environment', 'technological environment'],
  sol: 'Interest rates, inflation, incomes and money supply are parts of the **economic environment**.',
}));
Q('m_dim_social', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'More families in Indian cities now celebrate birthdays at restaurants and order gifts online. A caterer sees this as a change in the',
  opts: ['social environment', 'political environment', 'legal environment', 'economic environment only'],
  sol: 'Customs, traditions, lifestyles and values are parts of the **social environment**; this is a change in how people celebrate.',
}));
Q('m_dim_tech', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Small shopkeepers in a town begin accepting payments by scanning a QR code on customers\' phones. This change mainly reflects the',
  opts: ['technological environment', 'political environment', 'social environment', 'legal environment'],
  sol: 'A new method of doing things (digital payment through phones and QR codes) is a change in the **technological environment**.',
}));
Q('m_dim_political', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Foreign investors hesitate to set up factories in an imagined country, Tarangistan, because its governments keep falling and law and order is weak. This is an example of the',
  opts: ['political environment', 'legal environment', 'technological environment', 'social environment'],
  sol: '**Political** conditions (stability of government, law and order, the attitude of government to business) affect business confidence. The legal environment is about laws and court decisions themselves.',
}));
Q('m_dim_legal', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A new rule requires every packaged snack to print the amount of sugar and salt on its label, and Kesar Foods (imagined) has to redesign all its packets. This is an example of the',
  opts: ['legal environment', 'political environment', 'social environment', 'economic environment'],
  sol: 'Rules, acts and court judgments that firms must follow form the **legal environment**. The packaging change is compulsory under a rule, so it is legal, not merely political.',
}));
Q('m_legal_vs_pol', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Which pair correctly distinguishes the **political** and **legal** environments?',
  opts: [
    'Political: stability of government and its attitude to business; legal: laws passed and court decisions',
    'Political: laws passed by Parliament; legal: elections and political parties',
    'Political: interest rates and inflation; legal: customs and traditions',
    'Political: new inventions; legal: tastes of consumers',
  ],
  sol: 'The **political** environment covers political conditions such as stability, peace and the government\'s attitude to business. The **legal** environment covers legislation, rules and judicial decisions. The other pairs mix in economic, social and technological forces.',
}));
Q('m_tech_threat', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Digital cameras on phones sharply reduced the sale of photographic film rolls. What does this show about technological change?',
  opts: [
    'It creates opportunities for some firms and threats for others',
    'It affects only the firm that invents the new technology',
    'It is a political force rather than a technological one',
    'It always benefits every existing firm equally',
  ],
  sol: 'New technology opens a market for some (phone and app makers) while making older products obsolete (film rolls). It is a technological force and its effect differs across firms.',
}));
Q('ar_social', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Growing concern for the environment has increased demand for cloth bags and steel water bottles.',
  r: 'The social environment includes the values and attitudes of people, which shape what they buy.',
  sol: 'Both are true and R explains A: a change in people\'s **values** (a social force) has changed their demand.',
}));
Q('ar_economic', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'A rise in people\'s disposable income usually raises the demand for many goods and services.',
  r: 'Disposable income is a part of the legal environment of business.',
  sol: 'A is true: with more income to spend, people buy more. R is false: income, prices and interest rates belong to the **economic** environment, not the legal one.',
}));
Q('tf_courts', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A court judgment that changes how firms must dispose of plastic waste is part of the legal environment of business.',
  sol: 'The legal environment includes **judicial decisions** as well as acts and rules passed by the legislature and the government.',
}));
Q('tf_festival', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A rise in demand for sweets and lamps before Diwali is mainly a technological factor affecting business.',
  sol: 'Festivals and traditions are part of the **social** environment, not the technological environment.',
}));
Q('fb_dims', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Changes in the rate of inflation, interest rates and the money supply are part of the ___ environment.',
  acc: [['economic']],
  sol: 'These are parts of the **economic** environment.',
}));
Q('fb_dims2', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Scientific improvements and innovations that provide new ways of producing goods and services form the ___ environment.',
  acc: [['technological']],
  sol: 'They form the **technological** environment.',
}));
Q('mt_dims', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each imagined change faced by Ujala Lights, a lamp maker in Moradabad, with the dimension of business environment it belongs to.',
  pairs: [
    ['Banks raise the interest rate on working-capital loans', 'Economic'],
    ['Buyers now prefer lamps made from recycled metal', 'Social'],
    ['LED chips make old bulbs out of date', 'Technological'],
    ['A rule makes energy-rating labels compulsory on lamps', 'Legal'],
  ],
  sol: 'Interest rates are economic; buyers\' values are social; new methods and products are technological; compulsory rules are legal.',
}));
Q('ord_respond', ord({
  t: 2, d: 2, c: 'application', marks: 1,
  stem: 'Arrange, in a sensible order, the steps a firm takes to respond to a change in its business environment.',
  items: [
    'Scan the environment and notice the change',
    'Judge whether it is an opportunity or a threat for the firm',
    'Revise plans and policies to suit the change',
    'Act on the revised plan and watch the results',
  ],
  sol: 'A firm first notices the change, then judges its meaning for itself, then revises its plans, and finally acts and reviews.',
}));
Q('s_tech_env', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the technological environment? Show with an imagined example how it can be both an opportunity and a threat.',
  model: 'The **technological environment** consists of **scientific improvements and innovations** that give new ways of producing goods and services. When video calls spread, **Setu Telecom** (imagined) gained new subscribers (**opportunity**), while a chain of phone booths lost most of its business (**threat**).',
  sol: 'Meaning plus an example showing gain for one firm and loss for another.',
  scheme: [['Meaning', 1], ['Example showing opportunity and threat', 1]],
}));
Q('s_social_env', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two examples of changes in the social environment and state how each could affect a business.',
  model: '1. **More women in paid work:** demand rises for **creches, ready-to-cook food and home services**.\n2. **Greater health awareness:** demand rises for **fitness centres and low-sugar foods**, while fried snacks may lose some buyers.',
  sol: 'Two social changes, each linked to a business effect.',
  scheme: [['First change with effect', 1], ['Second change with effect', 1]],
}));
Q('s_econ_env', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name any two elements of the economic environment and state how each affects business.',
  model: '1. **Interest rates:** lower rates make loans cheaper, so firms invest more and buyers purchase more on credit.\n2. **Inflation:** rising prices raise costs of raw material and wages, and may reduce what customers can buy.',
  sol: 'Two economic elements (interest rates, inflation, income, money supply, stock market, tax rates) with their effect.',
  scheme: [['First element with effect', 1], ['Second element with effect', 1]],
}));
Q('s3_pol_legal', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Distinguish between the political and the legal environment of business, giving an imagined example of each.',
  model: '1. **Political environment:** political conditions such as **stability of government, peace and law and order**, and the government\'s **attitude** to business. Example: frequent changes of government in a state make investors wait.\n2. **Legal environment:** **acts, rules and court decisions** that business must obey. Example: a new rule makes warning labels compulsory on energy drinks.\n3. Political conditions **shape confidence**; legal provisions **bind** firms directly.',
  sol: 'Meaning of each with an example, and the point of contrast.',
  scheme: [['Political environment with example', 1], ['Legal environment with example', 1], ['Point of contrast', 1]],
}));
Q('s3_classify_five', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Identify the dimension of business environment in each case: (i) a sharp rise in fuel prices; (ii) an increasing preference for working from home; (iii) robots that can pack medicines in a pharmacy warehouse.',
  model: '(i) **Economic** environment: fuel is a basic input, so a price rise changes **costs, prices and demand** across the economy.\n(ii) **Social** environment: it is a change in the **lifestyle and work habits** of people, which shifts demand towards home offices and delivery.\n(iii) **Technological** environment: robots are a **new method of doing work**, an innovation in how goods are handled.',
  sol: 'One mark for each correct dimension with the reason.',
  scheme: [['(i) Economic', 1], ['(ii) Social', 1], ['(iii) Technological', 1]],
}));
Q('l_dimensions', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the five dimensions of the business environment. Illustrate each with an imagined change that could affect a bicycle maker in Ludhiana.',
  model: '1. **Economic:** interest rates, inflation and incomes; e.g. higher steel prices raise its costs.\n2. **Social:** values and lifestyles; e.g. more people cycling for fitness raises demand.\n3. **Technological:** new methods; e.g. electric-assist motors create a new product line.\n4. **Political:** stability and government attitude; e.g. a stable state government that welcomes industry encourages expansion.\n5. **Legal:** acts, rules and court decisions; e.g. a new safety standard requires reflectors on every cycle.',
  sol: 'Each dimension named and explained, with a relevant example for the bicycle maker.',
  scheme: [['Economic', 1], ['Social', 1], ['Technological', 1], ['Political', 1], ['Legal', 1]],
}));
Q('l_interrelated_dims', long({
  t: [2, 1], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Using one imagined example, show how a single change in one dimension of the environment can set off changes in other dimensions, and evaluate what a firm should do about it.',
  model: '1. **Start (technological):** cheap smartphones and data spread to small towns.\n2. **Social:** people begin to shop, bank and learn online; habits change.\n3. **Economic:** online sellers gain sales; some small shops lose customers.\n4. **Legal:** new rules follow on data protection and online consumer rights.\n5. **Evaluation:** because the forces are **inter-related**, a firm such as **Mehta General Stores** (imagined) should **scan all dimensions together**, add an online order channel and train staff, rather than react to one change at a time.',
  sol: 'A chain through at least three dimensions, then a reasoned recommendation.',
  scheme: [['First change and dimension', 1], ['Second linked change', 1], ['Third linked change', 1], ['Feature shown: inter-relatedness', 1], ['Reasoned recommendation for the firm', 1]],
}));

// ================================================================ t03 Demonetisation
Q('m_demo_date', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Government of India announced the withdrawal of legal-tender status of the then existing ₹500 and ₹1,000 notes on',
  opts: ['8 November 2016', '1 July 2017', '24 July 1991', '1 April 2010'],
  sol: 'The announcement was made on **8 November 2016**. 1 July 2017 is the start of GST; 24 July 1991 is the date of the budget that began the 1991 reforms; 1 April 2010 is not related.',
}));
Q('m_demo_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'For a business, what did demonetisation of the old ₹500 and ₹1,000 notes mean in practice?',
  opts: [
    'Those notes could no longer be used as legal tender for payments and had to be deposited or exchanged within a time limit',
    'Those notes became more valuable and were kept as savings',
    'All bank accounts were closed for a year',
    'Prices of all goods were fixed by the government',
  ],
  sol: 'Demonetisation withdrew the **legal-tender** status of the notes: they stopped being valid money for payments and holders had to deposit or exchange them within a set period.',
}));
Q('m_demo_tax', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Demonetisation is described as a **tax administration measure** mainly because',
  opts: [
    'cash holdings had to be brought into banks, where they became traceable and could be checked against declared income',
    'it reduced every tax rate in the country',
    'it abolished income tax for small traders',
    'it replaced all indirect taxes with one tax',
  ],
  sol: 'Old notes had to be deposited in bank accounts, so **unaccounted cash** came into the formal system where it could be checked against declared incomes. It did not change tax rates; replacing indirect taxes describes GST.',
}));
Q('m_demo_digital', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'After November 2016, a chemist in Nagpur (imagined) started accepting payment through mobile wallets and card machines. Which stated feature of demonetisation does this reflect?',
  opts: [
    'A push towards a less-cash, digital economy',
    'An increase in the supply of high-value notes',
    'A ban on all small retail businesses',
    'A rise in import duties on medicines',
  ],
  sol: 'One stated aim was to **encourage digital transactions** and reduce dependence on cash; the chemist\'s switch reflects that.',
}));
Q('m_demo_formal', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which of the following is an example of the **formalisation of savings** linked to demonetisation?',
  opts: [
    'A household deposits cash it kept at home into a bank account, from which it later earns interest',
    'A household hides more cash under the mattress',
    'A trader buys gold with cash and keeps it at home',
    'A shopkeeper refuses to accept any cash at all',
  ],
  sol: 'Moving idle cash from homes into **banks** brings savings into the formal financial system, where they can be lent out for investment. The other options keep money outside the formal system.',
}));
Q('m_demo_counterfeit', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'One stated objective of withdrawing the old high-value notes was to deal with fake currency. Why would withdrawal help here?',
  opts: [
    'Fake notes of the old series would be detected and become useless when people deposited or exchanged them',
    'Fake notes would automatically turn into real ones',
    'Banks would stop checking notes',
    'People would be allowed to print their own notes',
  ],
  sol: 'When every old note had to pass through a bank, **counterfeit** notes of that series could be identified and taken out of circulation.',
}));
Q('ar_demo_cash', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Businesses that relied mainly on cash payments felt a sharp short-term disruption after November 2016.',
  r: 'A large part of the currency in circulation was withdrawn at once, and new notes took time to reach people.',
  sol: 'Both are true and R explains A: with most high-value cash withdrawn suddenly and replaced gradually, cash-based businesses faced a **temporary shortage** of money for transactions.',
}));
Q('ar_demo_gst', ar({
  t: 3, d: 2, c: 'analysis', key: 'd',
  a: 'Demonetisation replaced many indirect taxes with a single Goods and Services Tax.',
  r: 'Demonetisation withdrew the legal-tender status of the old ₹500 and ₹1,000 notes.',
  sol: 'A is false: replacing indirect taxes describes **GST** (2017), a separate reform. R correctly describes demonetisation.',
}));
Q('tf_demo_all', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In November 2016 every Indian currency note, including ₹10 and ₹100 notes, lost its legal-tender status.',
  sol: 'Only the then existing **₹500 and ₹1,000** notes were demonetised; smaller notes remained valid.',
}));
Q('fb_demo', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Demonetisation means that a currency unit ceases to be ___ tender.',
  acc: [['legal']],
  sol: 'A demonetised note is no longer **legal** tender: it need not be accepted for payment.',
}));
Q('n_digital_share', num({
  t: 3, d: 2, c: 'application', marks: 1, value: DIG_SHARE_AFTER, unit: '%',
  stem: `Shree Ganesh Traders (an imagined wholesaler) received ₹${SHOP.after.cash} thousand in cash and ₹${SHOP.after.digital} thousand through digital payments in a month after the note withdrawal. What percentage of its receipts was digital?`,
  sol: `Step 1: Total receipts = ${SHOP.after.cash} + ${SHOP.after.digital} = ${tot(SHOP.after)} thousand.\nStep 2: Digital share = ${SHOP.after.digital} ÷ ${tot(SHOP.after)} × 100 = ${DIG_SHARE_AFTER} per cent.`,
}));
Q('s_demo_features', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two features of demonetisation as a measure affecting the business environment.',
  model: '1. **Tax administration measure:** cash had to be deposited in banks, so unaccounted money could be **traced and taxed**.\n2. **Push to a less-cash economy:** it encouraged **digital payments** such as cards, wallets and bank transfers.',
  sol: 'Any two of: tax administration, curbing black money and fake notes, push to digital transactions, formalisation of savings, channelling savings into the formal system.',
  scheme: [['First feature explained', 1], ['Second feature explained', 1]],
}));
Q('s_demo_business', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain one short-term difficulty and one longer-term change that demonetisation brought for small retailers.',
  model: '**Short term:** a sudden **shortage of cash** reduced sales for shops whose customers paid in cash. **Longer term:** many shops began accepting **digital payments**, which made their sales records more formal and traceable.',
  sol: 'One short-run effect and one longer-run change, each explained.',
  scheme: [['Short-term difficulty', 1], ['Longer-term change', 1]],
}));
Q('s3_demo_objectives', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three stated objectives behind withdrawing the old high-value notes in November 2016.',
  model: '1. **Curb black money:** unaccounted cash had to come into banks, where it could be checked.\n2. **Remove counterfeit notes:** fake notes of the old series were caught when deposited or exchanged.\n3. **Encourage digital transactions:** a less-cash economy makes payments traceable and reduces cash handling.',
  sol: 'Three distinct objectives with a line of explanation each.',
  scheme: [['First objective', 1], ['Second objective', 1], ['Third objective', 1]],
}));
Q('l_demo', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the concept of demonetisation and analyse how it changed the business environment for Indian firms, giving both its intended features and the adjustments firms had to make.',
  model: '1. **Concept:** on **8 November 2016** the government withdrew the legal-tender status of the old **₹500 and ₹1,000** notes; they had to be deposited or exchanged.\n2. **Tax administration:** cash came into banks, making incomes **traceable**.\n3. **Less-cash economy:** firms and customers moved towards **digital payments**.\n4. **Formalisation:** savings and transactions shifted into the **formal** banking system.\n5. **Adjustments:** cash-based firms faced a **temporary shortage** of cash and lower sales, and had to open accounts, accept digital payments and keep better records.',
  sol: 'Concept, three features, and the adjustment firms faced, in neutral terms.',
  scheme: [['Concept with date and notes', 1], ['Tax administration feature', 1], ['Digital payments feature', 1], ['Formalisation feature', 1], ['Adjustments by firms', 1]],
}));

// ================================================================ case-based
Q('cb_saanjh', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined firm and situation written by SOYL for practice.)*',
  passage: '**Saanjh Handlooms, Bhagalpur (imagined)**\n\nSaanjh Handlooms makes silk stoles. Last year its owner, Farida, noticed three things. First, young buyers in big cities were asking for "slow fashion": hand-made, long-lasting clothes. Second, a new e-commerce portal for artisans was letting weavers sell directly to customers across India. Third, the bank had lowered the interest rate on loans for small enterprises. Farida took a loan, put her stoles on the portal before other weavers in her town did, and within a year her sales had doubled. "If I had waited," she says, "the others would have taken these customers."',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows a change in the social environment.', model: '"**Young buyers in big cities were asking for slow fashion: hand-made, long-lasting clothes.**"', sol: 'A change in values and tastes of buyers is social.', scheme: [['Correct line quoted', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the dimension of the environment shown by the bank lowering its loan interest rate.', model: '**Economic** environment.', sol: 'Interest rates belong to the economic environment.', scheme: [['Economic environment', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which benefit of understanding the business environment did Farida gain? Explain with a line from the passage.', model: '**Identifying opportunities and the first-mover advantage.** She saw the new demand and the portal early and "put her stoles on the portal **before other weavers** in her town did", so she captured the customers first.', sol: 'Name the benefit and link it to her acting before rivals.', scheme: [['Benefit named', 1], ['Linked to the passage', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The passage shows three forces working together. Name the feature of business environment this illustrates and explain it.', model: '**Inter-relatedness:** a social change (demand for hand-made goods), a technological change (the e-commerce portal) and an economic change (cheaper loans) **worked together** to create one opportunity.', sol: 'Name inter-relatedness and show the forces combining.', scheme: [['Feature named', 1], ['Explained with the three forces', 1]] }),
    ]),
  ],
}));
Q('cb_vidyut', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined company and situation written by SOYL for practice.)*',
  passage: '**Vidyut Motors, Hosur (imagined)**\n\nVidyut Motors makes electric scooters. In its yearly review, the management listed: (1) a state government that has stayed stable for many years and invites investors to industrial parks; (2) a new rule that every electric scooter battery must pass a fire-safety test before sale; (3) a new type of battery that charges in fifteen minutes; and (4) rising petrol prices that make customers think about switching to electric scooters.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the dimension of the environment in item (1).', model: '**Political** environment: stability of government and its attitude to business.', sol: 'A stable government that welcomes investors is a political condition.', scheme: [['Political environment', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the dimension of the environment in item (2).', model: '**Legal** environment: a compulsory rule that firms must obey.', sol: 'A mandatory safety test is a rule, so legal.', scheme: [['Legal environment', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the dimensions in items (3) and (4), and state whether each is an opportunity or a threat for Vidyut Motors.', model: 'Item (3) is **technological**: an **opportunity** if Vidyut adopts fast-charging batteries (a threat only if rivals adopt them first). Item (4) is **economic**: an **opportunity**, because costlier petrol pushes buyers towards electric scooters.', sol: 'Correct dimension for each and a reasoned judgement.', scheme: [['Item (3) technological with judgement', 1], ['Item (4) economic with judgement', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why items (1) and (2) belong to different dimensions, although both involve the government.', model: 'Item (1) is about **political conditions**: stability and the government\'s welcoming attitude, which build confidence. Item (2) is a **legal provision**: a rule firms are bound to follow. Political conditions shape the climate; legal provisions directly bind firms.', sol: 'Contrast political conditions with binding legal rules.', scheme: [['Item (1) as political conditions', 1], ['Item (2) as a binding legal rule', 1]] }),
    ]),
  ],
}));
Q('cb_ganesh', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table and passage and answer the questions that follow. *(An imagined wholesaler and figures written by SOYL for practice.)*',
  passage: `**Shree Ganesh Traders, a wholesaler in an imagined town, Rampur Kalan (₹ thousand per month)**\n\n| Month | Cash receipts | Digital receipts | Total |\n|---|---|---|---|\n| October 2016 | ${SHOP.before.cash} | ${SHOP.before.digital} | ${tot(SHOP.before)} |\n| A month in 2017 | ${SHOP.after.cash} | ${SHOP.after.digital} | ${tot(SHOP.after)} |\n\nThe owner, Ganesh Rao, says: "In November 2016 the old big notes stopped being valid. For some weeks my retailers had no cash to pay me. I opened a current account, installed a card machine and began sending bills by phone. Now most of my bigger buyers pay me directly into the bank, and my accountant says our books are much cleaner."`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: DIG_SHARE_BEFORE, unit: '%', stem: 'What percentage of the receipts in October 2016 was digital?', sol: `Step 1: Digital share = ${SHOP.before.digital} ÷ ${tot(SHOP.before)} × 100.\nStep 2: ${SHOP.before.digital} ÷ ${tot(SHOP.before)} × 100 = ${DIG_SHARE_BEFORE} per cent.` })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Quote the line that shows the short-term difficulty the business faced.', model: '"**For some weeks my retailers had no cash to pay me.**"', sol: 'The temporary cash shortage is the short-term difficulty.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two features of demonetisation reflected in Ganesh Rao\'s later experience.', model: '(1) **Push towards a less-cash, digital economy:** he installed a card machine and buyers pay into the bank. (2) **Formalisation and tax administration:** his transactions now pass through a bank account, so his "books are much cleaner" and traceable.', sol: 'Two features, each linked to the passage.', scheme: [['First feature linked', 1], ['Second feature linked', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Using the table, describe how the mix of receipts changed, and state one reason for the change.', model: `The digital share rose from **${DIG_SHARE_BEFORE} per cent** to **${DIG_SHARE_AFTER} per cent**, while the total stayed at ₹${tot(SHOP.after)} thousand. Reason: after the old notes were withdrawn, buyers and the trader **shifted to bank and card payments**.`, sol: 'Compare the two shares and give a reason from the passage.', scheme: [['Change described with figures', 1], ['Reason', 1]] }),
    ]),
  ],
}));
Q('cb_kesar', caseQ({
  t: [1, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined company and situation written by SOYL for practice.)*',
  passage: '**Kesar Foods, Indore (imagined)**\n\nKesar Foods sells fried snacks across central India. Its marketing head, Jatin, warned the board: "Customers are reading labels more and talking about healthy eating. A rival is testing baked snacks. We do not know whether this trend will last or fade." The board asked for a study of the market every quarter. When a new rule later required sugar and salt content on every label, Kesar was already testing a baked range and had new labels ready, while two smaller rivals had to withdraw stock from shops.',
  parts: [
    child('a', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Quote the words that show the feature "uncertainty" of business environment.', model: '"**We do not know whether this trend will last or fade.**"', sol: 'The future of the trend cannot be predicted: uncertainty.', scheme: [['Correct words quoted', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which benefit of understanding the environment is shown by Jatin\'s warning about the rival\'s baked snacks?', model: '**Identifying threats and early warning signals.**', sol: 'A rival\'s new product is a threat noticed early.', scheme: [['Threats and early warning', 1]] })),
    child('c', short({ t: [1, 2], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Name the dimension of the environment shown by the labelling rule, and explain why Kesar coped with it better than its rivals.', model: 'The rule is part of the **legal** environment. Because Kesar **studied the environment every quarter**, it had a baked range and new labels ready **before** the rule came, so it **coped with the rapid change**, while rivals were caught unprepared.', sol: 'Name legal, then link regular scanning to better coping.', scheme: [['Legal environment', 1], ['Reason linked to regular study of the environment', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Evaluate the board\'s decision to study the market every quarter.', model: 'It was **sound**: the environment is **dynamic and uncertain**, so a one-time study would soon be outdated. Regular study gave **early warning**, helped **planning** (the baked range) and **improved performance** compared with rivals; the cost of the study was small against the losses avoided.', sol: 'A judgement supported by features and benefits.', scheme: [['Judgement with feature-based reason', 1], ['Benefit shown in the passage', 1]] }),
    ]),
  ],
}));
Q('cb_tarang', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined company and situation written by SOYL for practice.)*',
  passage: '**Tarang Water Purifiers, Coimbatore (imagined)**\n\nTarang\'s sales were rising steadily. Then three things happened within a year: more households in small towns began to worry about water-borne diseases; banks offered easy monthly instalments for home appliances; and a new purifier design using fewer filters and less wasted water appeared in the market. Tarang\'s managers are now deciding which of these changes matters most.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the dimension of the environment shown by households worrying about water-borne diseases.', model: '**Social** environment: health awareness and attitudes of people.', sol: 'Health awareness is a social factor.', scheme: [['Social environment', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the dimension shown by banks offering easy monthly instalments.', model: '**Economic** environment: availability and cost of credit.', sol: 'Credit terms belong to the economic environment.', scheme: [['Economic environment', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the dimension shown by the new purifier design and explain whether it is an opportunity or a threat for Tarang.', model: 'It is **technological**. It is a **threat** if a rival owns the design and Tarang keeps its old product, but an **opportunity** if Tarang adopts or improves on it quickly, because buyers will prefer purifiers that waste less water.', sol: 'Correct dimension and a reasoned judgement that may go either way.', scheme: [['Technological environment', 1], ['Reasoned opportunity/threat judgement', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which feature of business environment does the phrase "within a year" highlight? Explain.', model: '**Dynamic nature:** the environment **changes continuously and quickly**; three important changes arrived within a single year, so Tarang must keep reviewing its plans.', sol: 'Dynamic nature linked to the speed of change.', scheme: [['Dynamic nature', 1], ['Explained with the passage', 1]] }),
    ]),
  ],
}));
