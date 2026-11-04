// CBSE 11 Business Studies, ch01 Nature and Purpose of Business: question bank. Every firm, person and
// situation is imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036).
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 History of trade and commerce in India
Q('m_hundi', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In the indigenous banking of old India, a written order by which one person asked another, often in a distant town, to pay a stated sum to a named person was called a',
  opts: ['hundi', 'debenture', 'balance sheet', 'ration card'],
  sol: 'The hundi worked like a bill of exchange and let traders move money without carrying coins over long routes. A debenture is a loan certificate of a company, a balance sheet is a statement of assets and liabilities, and a ration card is a document for buying rationed goods.',
}));
Q('m_shroff', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined port town of Suvarnapur, a trader named Dharmadas lent money to merchants against their goods, accepted deposits and arranged payments to other towns through written orders. In the old system of indigenous banking he would be called a',
  opts: ['shroff or seth', 'commission agent only', 'craft artisan', 'guild inspector'],
  sol: 'Lending, accepting deposits and transferring money are the work of an indigenous banker, known as a shroff or seth. A commission agent earns a fee for arranging sales, an artisan makes goods, and a guild inspector is not a banker.',
}));
Q('m_routes', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which pair correctly describes two famous overland trade routes of ancient India?',
  opts: [
    'Uttarapatha ran through the north, Dakshinapatha ran towards the south',
    'Uttarapatha ran through the south, Dakshinapatha ran through the north',
    'Both routes were sea lanes along the western coast only',
    'Both routes were used only for local barter within one village',
  ],
  sol: 'Uttarapatha was the northern highway and Dakshinapatha the southern one; both carried long-distance trade and linked with wider routes such as the Silk Route. The other options reverse the directions or wrongly limit the routes to the sea or to a village.',
}));
Q('m_shreni', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined ancient town, weavers, potters and traders formed a body that fixed standards of quality, settled disputes among members and helped a member whose goods were lost on the road. This body is best described as a',
  opts: ['merchant guild (shreni)', 'joint stock company', 'modern retail chain', 'government mint'],
  sol: 'Guilds of traders and artisans, called shrenis, regulated trade and supported their members. A joint stock company and a retail chain are modern forms, and a mint makes coins; none of them regulated a body of artisans and traders in this way.',
}));
Q('m_intermediary', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'As trade spread over longer distances in old India, producers and distant buyers increasingly relied on commission agents, brokers and distributors. The main reason was that',
  opts: [
    'intermediaries linked sellers and buyers who could not meet easily and arranged credit and goods',
    'producers were forbidden by custom to sell anything directly',
    'trade had stopped and only barter within families remained',
    'there were no roads or ports anywhere in the country',
  ],
  sol: 'Growing distances and wider markets created the need for people who brought buyers and sellers together and extended credit. The other options give causes that are false or unrelated to a spreading trade.',
}));

// ================================================================ t02 Concept, characteristics and objectives of business
Q('m_noneco', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Kavita, a nurse, spends her Sunday cooking and serving free meals to stray animals at a shelter out of sympathy. Her Sunday activity is',
  opts: ['a non-economic activity', 'a business activity', 'a profession', 'employment'],
  sol: 'An activity done out of love, sympathy, religion or patriotism, with no aim of earning a living, is non-economic. It is not business, profession or employment, which are the three kinds of economic activity.',
}));
Q('m_business_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Which statement best defines business?',
  opts: [
    'An economic activity of producing or buying and selling goods and services regularly to earn profit',
    'Any activity done out of sympathy for the needy',
    'Work done for an employer in return for a wage',
    'Service by a trained expert regulated by a professional body',
  ],
  sol: 'Business combines production or procurement, sale or exchange, regularity and the profit motive. The remaining options describe a non-economic activity, employment and a profession.',
}));
Q('m_profession_doc', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Dr. Arjun (imagined) treats patients in his own clinic, holds a medical degree, is registered with a professional council and follows its code of conduct. He charges a fee per consultation. His activity is',
  opts: ['a profession', 'employment', 'a business of trading', 'a non-economic activity'],
  sol: 'Specialised knowledge, a registered qualification, regulation by a body with a code of conduct and a fee for the service make it a profession. He is not working for a wage, is not trading goods for profit, and is earning a living, so it is economic.',
}));
Q('m_employment_teacher', mcq({
  t: 2, d: 1, c: 'application',
  stem: 'Meera (imagined) works as a teacher in a school on a monthly salary under an appointment letter. Her work is',
  opts: ['employment', 'a business', 'a profession practised independently', 'a non-economic activity'],
  sol: 'Work for another person or organisation in return for a wage or salary is employment. A business earns profit, an independent profession earns fees, and she is earning a living, so it is not non-economic.',
}));
Q('m_reward_kinds', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The usual reward for business, profession and employment respectively is',
  opts: ['profit, professional fees and wages or salary', 'wages, profit and fees', 'fees, salary and profit', 'salary, fees and profit'],
  sol: 'A business owner earns profit, a professional earns fees, and an employee earns wages or salary. The other options mismatch the three kinds with their rewards.',
}));
Q('m_transfer', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement about transfer of interest is correct?',
  opts: [
    'A business can usually be transferred to another person, with some formalities, but a profession and an employment cannot',
    'A profession can be freely sold to any buyer, but a business cannot',
    'An employment can be transferred to a relative on the employee\'s wish',
    'None of the three can be transferred under any circumstances',
  ],
  sol: 'Business interest may be transferred, subject to formalities; a doctor\'s practice depends on personal qualification and a job depends on the employer\'s appointment, so these cannot be passed on freely.',
}));
Q('m_risk_comp', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: 'Among business, profession and employment, the degree of risk and the capital needed are usually highest in',
  opts: ['business', 'profession', 'employment', 'all three equally'],
  sol: 'A business owner invests considerable capital and bears the uncertainty of profit or loss. A professional needs modest capital and bears some risk, and an employee needs no capital and has the least risk because pay is fixed.',
}));
Q('m_not_char', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Seema sold her own old scooter to a neighbour for Rs 18,000 once, as she was moving abroad. This is not business mainly because',
  opts: [
    'it is a one-time sale and not dealing on a regular basis',
    'a scooter is not a good',
    'she did not receive any money',
    'business is possible only with machinery',
  ],
  sol: 'Regular dealing is a characteristic of business; a single sale of a personal item is not business. A scooter is a good, she received money, and business does not need machinery.',
}));
Q('m_uncertain', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Fatima (imagined) runs a bakery. In a good month she earned a profit of Rs 40,000; in the rainy season her profit fell to Rs 6,000. Which characteristic of business does this show?',
  opts: ['Uncertainty of return', 'Dealing in goods on a regular basis', 'Production of goods', 'Sale or exchange'],
  sol: 'Return in business is never certain; it can rise or fall because of changing conditions. Regular dealing, production and sale are present too but do not explain the variation in profit.',
}));
Q('m_innovation', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Padma Plastics (imagined) introduced a bottle that dissolves in water and a faster moulding process. Which objective of business does this show?',
  opts: ['Innovation', 'Market standing', 'Social responsibility', 'Worker attitude'],
  sol: 'New products and new methods of production are innovation. Market standing concerns the share held by the firm, social responsibility concerns benefit to society, and worker attitude concerns employees.',
}));
Q('m_productivity', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A tile factory at the imagined town of Morbipur tried to produce more tiles per hour with the same machines and fewer rejects. The objective of business it was pursuing is',
  opts: ['productivity', 'innovation', 'market standing', 'managerial development'],
  sol: 'Output relative to the resources used measures productivity; every firm tries to improve it. The other objectives deal with new ideas, position in the market or training of managers.',
}));
Q('m_obj_profit_reason', mcq({
  t: 2, d: 3, c: 'evaluation',
  stem: 'Which view of profit as an objective is the most reasonable?',
  opts: [
    'Profit is necessary for survival and growth, but it cannot be the only objective of a business',
    'Profit is the only objective, so other objectives are a waste',
    'Profit is harmful, so a business should avoid it',
    'Profit matters only for the first year of a business',
  ],
  sol: 'A business needs profit to pay costs, to reward the owner for risk and to grow, but it also needs customers, skilled employees, innovation and public goodwill to last. Treating profit as the only goal can lead to unfair practices; avoiding it makes survival impossible.',
}));
Q('m_marketstanding', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Delta Cycles (imagined) set itself the aim of rising from third to first among the cycle makers in its state by sales. This aim relates to',
  opts: ['market standing', 'physical resources', 'worker performance', 'employment'],
  sol: 'The position of the firm among competitors and its share of the market are its market standing. Physical resources are land, plant and so on; worker performance concerns employee output.',
}));

// ================================================================ t03 Classification of business activities
Q('m_extractive', mcq({
  t: 3, d: 1, c: 'application',
  stem: 'Villagers of the imagined village of Machhuwadi catch fish from the sea and sell them at the harbour. Their activity belongs to',
  opts: ['extractive industry', 'genetic industry', 'manufacturing industry', 'construction'],
  sol: 'Taking out natural products from the sea, earth or forest is extractive industry. Genetic industry breeds plants and animals, manufacturing changes materials into goods, and construction builds structures.',
}));
Q('m_genetic', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A farm raises high-yield saplings in a nursery and breeds cattle for sale. These activities belong to',
  opts: ['genetic industry', 'extractive industry', 'assembling industry', 'tertiary industry'],
  sol: 'Reproducing and multiplying plants and animals for further use is genetic industry, a type of primary industry. Extractive industry takes out what nature has provided; assembling joins ready parts; tertiary industry gives services.',
}));
Q('m_analytical', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Crude oil is separated into petrol, diesel and kerosene at a refinery. This kind of manufacturing is',
  opts: ['analytical', 'synthetical', 'processing', 'assembling'],
  sol: 'Separating one material into several products is analytical manufacturing. Synthetical combines materials, processing passes raw material through stages, and assembling fits parts together.',
}));
Q('m_synthetical', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'At the imagined Bhima Cement Works, limestone, clay and other materials are combined to make one product. Which kind of manufacturing is this?',
  opts: ['Synthetical', 'Analytical', 'Assembling', 'Extractive'],
  sol: 'Combining several materials into a single new product is synthetical manufacturing. Analytical separates; assembling joins finished parts; extractive is a primary industry, not manufacturing.',
}));
Q('m_assembling', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A small workshop buys frames, wheels, chains and seats from different makers and fits them to produce finished bicycles. The workshop is in',
  opts: ['assembling industry', 'processing industry', 'analytical industry', 'genetic industry'],
  sol: 'Putting together ready-made components into a final product is assembling. Processing converts raw material through successive stages (as in sugar or paper), and analytical splits one material into parts.',
}));
Q('m_construction', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Building a road, a bridge or a dam is part of',
  opts: ['construction, a secondary industry', 'extractive industry, a primary industry', 'banking, an auxiliary to trade', 'wholesale trade'],
  sol: 'Construction of buildings, roads, bridges and dams is a secondary industry along with manufacturing. It is not primary, is not a service such as banking, and is not trade.',
}));
Q('m_wholesaler', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Ramesh Stores (an imagined grocer) buys sacks of rice from an agency that purchases in large lots from mills, and sells it in small quantities to households. Which statement is correct?',
  opts: [
    'The agency is a wholesaler and Ramesh Stores is a retailer',
    'Both are wholesalers',
    'The agency is a retailer and Ramesh Stores is a wholesaler',
    'Both are engaged in external trade',
  ],
  sol: 'A wholesaler buys in bulk and sells to traders in smaller lots; a retailer sells to the final consumers. Both here deal within the country, so this is internal trade.',
}));
Q('m_entrepot', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Sagar Overseas (imagined) buys cocoa from one foreign country and, without using it in India, sells it to another foreign buyer through its warehouse. This is',
  opts: ['entrepot trade', 'export of its own goods only', 'retail trade', 'home trade'],
  sol: 'Importing goods in order to export them again is entrepot (re-export) trade. It is not retail or home trade, and the goods are not its own produce, so it is not a simple export.',
}));
Q('m_aux_time', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Warehousing helps trade by removing the hindrance of',
  opts: ['time', 'place', 'finance', 'information'],
  sol: 'Goods produced in one season can be stored and sold in another, so warehousing removes the gap of time. Transport overcomes place, banking helps finance, and advertising supplies information.',
}));
Q('m_aux_place', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Which auxiliary to trade removes the hindrance of place by moving goods from producers to consumers?',
  opts: ['Transport', 'Insurance', 'Banking', 'Advertising'],
  sol: 'Transport carries goods to where they are needed. Insurance covers risk, banking supplies finance, and advertising gives information to buyers.',
}));
Q('m_aux_info', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Before launching its new millet biscuits, the imagined firm Annapurna Foods placed notices in newspapers and on the radio so that shoppers would learn of them. Which hindrance did it try to remove?',
  opts: ['Information', 'Place', 'Time', 'Risk'],
  sol: 'Advertising removes the hindrance of knowledge by telling buyers about products. Place is overcome by transport, time by warehousing, and risk by insurance.',
}));
Q('m_commerce_def', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Commerce is best described as',
  opts: ['trade together with the auxiliaries to trade', 'manufacturing of goods only', 'extraction of minerals only', 'trade in imported goods only'],
  sol: 'Commerce covers trade (buying and selling) and the services that assist it, such as transport, banking, insurance, warehousing and advertising. It is wider than trade alone and does not cover production.',
}));

// ================================================================ t04 Business risk
Q('m_risk_meaning', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Business risk means',
  opts: [
    'the possibility of loss or of inadequate profit caused by uncertain or unexpected events',
    'a certain loss that is known in advance',
    'the fixed salary paid to employees',
    'the rate of tax on profit',
  ],
  sol: 'Risk arises because the future is uncertain: demand, costs or events may turn out differently than expected. A certain loss, a salary and a tax rate are not uncertainties of this kind.',
}));
Q('m_risk_natural', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A flood destroyed the stock in the godown of the imagined Hari Hardware Store at Jalpur. This loss arose from',
  opts: ['a natural cause of risk', 'a human cause of risk', 'an economic cause of risk', 'a political cause of risk'],
  sol: 'Floods, earthquakes and cyclones are natural causes beyond human control. Human causes involve people such as employees; economic causes involve markets; political causes involve government and unrest.',
}));
Q('m_risk_human', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A cashier of an imagined sweet shop carried away part of the daily takings, and a strike by the staff followed. These are examples of risks arising from',
  opts: ['human causes', 'natural causes', 'economic causes only', 'political causes only'],
  sol: 'Dishonesty of employees, strikes and inefficient management belong to human causes. Natural causes are events of nature, and economic causes concern markets, prices and competition.',
}));
Q('m_risk_econ', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A new supermarket opened next to Ramesh Stores and cut prices, so his sales fell sharply. This risk arose from',
  opts: ['an economic cause (competition)', 'a natural cause', 'a human cause only', 'a political cause'],
  sol: 'Competition, changes in demand, prices and technology are economic causes. Natural causes involve nature and human causes involve the conduct of people inside the firm.',
}));
Q('m_risk_other', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'An exporter of imagined handloom bags lost income because disturbances in a buying country stopped orders and the rupee value of the foreign payment fell. Which grouping of causes fits best?',
  opts: ['Other causes: political disturbances and exchange-rate changes', 'Natural causes only', 'Human causes only', 'No cause of business risk'],
  sol: 'Political disturbances and changes in exchange rates are listed among other causes of business risk. Nothing here is a natural event or dishonest conduct by employees, so natural and human causes do not apply.',
}));
Q('m_risk_profit', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which statement about business risk and profit is correct?',
  opts: [
    'Profit is the reward for bearing risk',
    'Risk can be removed fully, so profit is always certain',
    'Only large businesses face risk',
    'Risk and profit have no connection',
  ],
  sol: 'An entrepreneur who bears uncertainty earns profit as a reward. Risk can be reduced but never removed, every business faces it in some degree, and the link between risk and profit is direct.',
}));

// ================================================================ assertion-reason
Q('ar_profit', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Profit is necessary for a business but cannot be its only objective.',
  r: 'A firm also needs satisfied customers, skilled employees, new ideas and public goodwill to stay in the market for a long time.',
  sol: 'Both statements are true. Profit pays costs, rewards risk and funds growth, and R explains why it is not enough: a firm that ignores customers, workers, innovation and society will not last, however much it earns today.',
}));
Q('ar_gopal', ar({
  t: 2, d: 2, c: 'application', verdict: 'both-true-explains',
  a: 'Gopal, a teacher in an imagined private school, is engaged in employment.',
  r: 'He works under an appointment letter and receives a fixed monthly salary from the school.',
  sol: 'Both are true and R explains A: working for another party under a contract for a wage or salary is what makes an activity employment.',
}));
Q('ar_aux', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Banking and finance are auxiliaries to trade.',
  r: 'Transport removes the hindrance of place by carrying goods from producers to consumers.',
  sol: 'Both are true, but R does not explain A. Banking is an auxiliary because it removes the hindrance of finance; the role of transport concerns place, a different hindrance.',
}));
Q('ar_risk', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Careful planning can remove business risk completely.',
  r: 'Business risk arises because the future is uncertain and events may differ from expectations.',
  sol: 'A is false: planning, insurance and good management can reduce risk but never remove it. R is true: uncertainty about the future is the very source of business risk.',
}));
Q('ar_hundi', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'A hundi allowed traders in old India to send money to another town without carrying coins.',
  r: 'Hundis could be issued only by the government mint.',
  sol: 'A is true: the hundi was an order to pay a stated sum, like a bill of exchange. R is false: hundis were written by merchants and indigenous bankers, not issued only by a mint.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_fees', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'True or false? The usual reward of a profession is profit, while that of an employee is professional fees.',
  sol: 'The rewards are the other way round: a professional earns fees, a business owner earns profit and an employee earns wages or salary.',
}));
Q('tf_entrepot', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Entrepot trade means importing goods with the aim of exporting them again.',
  sol: 'Entrepot trade, also called re-export trade, buys goods from one country to sell to another without using them in the home country.',
}));
Q('tf_retailer', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A retailer usually buys in small lots from consumers and sells in bulk to manufacturers.',
  sol: 'The reverse is true: a retailer buys in fairly large lots from wholesalers or producers and sells in small quantities to final consumers.',
}));
Q('fb_aux', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Transport removes the hindrance of ___, while insurance removes the hindrance of ___.',
  acc: [['place'], ['risk']],
  sol: 'Transport overcomes the hindrance of place and insurance covers the hindrance of risk.',
}));
Q('fb_commerce', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Commerce is made up of trade and the ___ to trade, such as banking and warehousing.',
  acc: [['auxiliaries', 'auxiliary']],
  sol: 'Commerce is trade plus the auxiliaries to trade, the services that remove hindrances in trade.',
}));
Q('mt_compare', match({
  t: 2, d: 2, c: 'understanding', marks: 3,
  stem: 'Match each reward with the economic activity in which it is earned.',
  pairs: [
    ['Profit', 'Business'],
    ['Professional fees', 'Profession'],
    ['Wages or salary', 'Employment'],
  ],
  sol: 'A business owner earns profit for bearing risk; a professional earns fees for a specialised service; an employee earns wages or salary for work done under an employer.',
}));
Q('mt_industry', match({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Match each imagined activity with its type of industry.',
  pairs: [
    ['A village crew mines salt from sea water', 'Extractive'],
    ['A farm multiplies seedlings in a nursery', 'Genetic'],
    ['A refinery splits crude oil into fuels', 'Analytical'],
    ['A workshop fits bought parts into computers', 'Assembling'],
  ],
  sol: 'Taking natural products from the earth or water is extractive, breeding plants is genetic, separating a material into parts is analytical, and putting finished parts together is assembling.',
}));
Q('mt_risk', match({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Match each event with the cause of business risk it illustrates.',
  pairs: [
    ['An earthquake damages a warehouse', 'Natural'],
    ['A dishonest clerk misuses funds', 'Human'],
    ['A new technology makes the old machine outdated', 'Economic'],
    ['A sudden change in the exchange rate cuts export earnings', 'Other'],
  ],
  sol: 'An earthquake is a natural cause, a dishonest clerk is a human cause, outdated technology is an economic cause, and an exchange-rate change is among the other causes.',
}));
Q('ord_chain', ord({
  t: 3, d: 2, c: 'application', marks: 2,
  items: [
    'Fisherfolk of an imagined village land fish at the harbour',
    'A factory cleans, cooks and tins the fish',
    'A wholesaler buys cartons of tins',
    'A retailer sells tins to households',
  ],
  stem: 'Arrange these steps of an imagined fish product in the order in which it moves from catch to consumer.',
  sol: 'Catching fish is the primary activity, tinning it is the secondary activity, and buying and selling the tins is trade, first wholesale and then retail.',
}));
Q('ord_scale', ord({
  t: 3, d: 2, c: 'understanding', marks: 2,
  items: ['Retail trade', 'Internal trade', 'Trade', 'Commerce'],
  stem: 'Arrange these terms from the narrowest to the widest.',
  sol: 'Retail trade is a part of internal trade, internal trade is a part of trade, and trade together with the auxiliaries to trade makes up commerce.',
}));

// ================================================================ short answer, 2 marks
Q('s_shreni', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two ways in which merchant guilds (shrenis) helped trade in ancient India.',
  model: '1. A guild **regulated trade** among its members by fixing standards of quality and settling disputes.\n2. It **supported members**, for example by lending in difficulty and protecting their common interests in dealings with rulers and distant buyers.',
  sol: 'Any two functions of guilds, each stated with a brief explanation.',
  scheme: [['First way explained', 1], ['Second way explained', 1]],
}));
Q('s_indig', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features of indigenous banking in India.',
  model: '1. Indigenous bankers such as **shroffs and seths** accepted deposits, gave credit to traders and transferred money.\n2. They used instruments such as the **hundi** (a bill of exchange) and the chitthi, so that money could be sent without carrying coins.',
  sol: 'Any two features: bankers and their functions, instruments.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_econ_noneco', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Rohit repairs bicycles in his own shop to earn a living, and on Sundays he repairs the cycles of an orphanage free of charge. Which of his activities is economic and which is non-economic? Give a reason for each.',
  model: '1. Repairing bicycles in his shop is **economic**, because it is done to earn a living.\n2. Repairing the orphanage cycles free of charge is **non-economic**, because it is done out of sympathy and not for money.',
  sol: 'Each activity classified correctly with a reason.',
  scheme: [['Shop repairs: economic, with reason', 1], ['Orphanage repairs: non-economic, with reason', 1]],
}));
Q('s_two_obj', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A dairy cooperative of the imagined village of Gokulpur tests its milk with new equipment so that every can is of the same quality, and it trains its collection staff each year. Identify the two objectives of business shown.',
  model: '1. **Productivity or innovation**: using new equipment to improve quality and output of the dairy.\n2. **Worker performance and attitude, and manager development**: training the collection staff each year to improve their skills and attitude.',
  sol: 'Two objectives named from the situation with a link to the lines.',
  scheme: [['First objective with reason', 1], ['Second objective with reason', 1]],
}));
Q('s_business_chars', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Rajan buys onions from farmers every morning in the imagined town of Nandpur and sells them to shops, never sure what price he will get. Identify two characteristics of business seen here.',
  model: '1. **Dealings on a regular basis:** he buys and sells onions every morning.\n2. **Uncertainty of return** and an element of risk: he is never sure what price he will get, so his profit may vary or turn into a loss.',
  sol: 'Any two characteristics identified with a reference to the situation.',
  scheme: [['First characteristic with reason', 1], ['Second characteristic with reason', 1]],
}));
Q('s_extr_gen', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between extractive and genetic industries, with one example of each.',
  model: '1. **Extractive industries** take out products that nature has provided, such as minerals from a mine or fish from the sea.\n2. **Genetic industries** breed and multiply plants and animals for further use, such as a nursery or a cattle-breeding farm.',
  sol: 'The difference with one example of each.',
  scheme: [['Extractive with example', 1], ['Genetic with example', 1]],
}));
Q('s_wh_ret', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two differences between a wholesaler and a retailer.',
  model: '1. A **wholesaler** buys in bulk from producers and sells to retailers and other traders; a **retailer** buys from wholesalers and sells to the final consumers.\n2. A wholesaler deals in large quantities of a limited range; a retailer deals in small quantities of a wide range of goods.',
  sol: 'Any two differences, such as customers and the quantity handled.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s_aux_two', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined potato grower of Hillpur stores her crop in a cold room until prices rise and then arranges a truck to send it to the city. Name the two auxiliaries to trade used and the hindrance each removes.',
  model: '1. **Warehousing** (the cold room) removes the hindrance of **time**, because goods are held until they are needed.\n2. **Transport** (the truck) removes the hindrance of **place**, because goods reach the city market.',
  sol: 'Warehousing for time and transport for place.',
  scheme: [['Warehousing and time', 1], ['Transport and place', 1]],
}));
Q('s_risk_meaning', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the meaning of business risk with an example.',
  model: '**Business risk** is the possibility of inadequate profit or of loss due to uncertainties or unexpected events.\nFor example, a bakery may buy flour in large quantity and then find that demand falls because of a new competitor, so some stock is wasted.',
  sol: 'The meaning (1) and a suitable example (1).',
  scheme: [['Meaning of business risk', 1], ['Example', 1]],
}));
Q('s_risk_causes', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give one natural and one human cause of risk for a sugar mill in the imagined town of Ganganagar, with an example of each.',
  model: '1. **Natural cause:** a drought or flood may destroy the sugarcane crop, so the mill gets too little cane.\n2. **Human cause:** a strike by workers or dishonesty of an employee in the stores may stop production or cause losses.',
  sol: 'One natural and one human cause with an example.',
  scheme: [['Natural cause with example', 1], ['Human cause with example', 1]],
}));

// ================================================================ short answer, 3 marks
Q('s3_routes', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the main trade routes and trading links of ancient and medieval India.',
  model: '1. **Overland routes:** the Uttarapatha ran through the north and the Dakshinapatha towards the south, joining many towns and markets.\n2. **Links beyond India:** these routes connected with the Silk Route, and early cities such as those of the Indus Valley traded with Mesopotamia.\n3. **Ports:** harbours on both coasts carried goods by sea to distant lands.',
  sol: 'Three points: the two overland routes, links with the Silk Route and outside lands, and the ports.',
  scheme: [['Uttarapatha and Dakshinapatha', 1], ['Links with the Silk Route and other regions', 1], ['Ports and sea trade', 1]],
}));
Q('s3_intermed', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why did intermediaries such as commission agents and brokers become important as trade grew? Give three reasons.',
  model: '1. **Distance:** producers and buyers lived far apart, so agents brought them together.\n2. **Credit and trust:** agents and bankers extended credit and guaranteed payment through hundis.\n3. **Specialisation:** brokers and distributors knew markets and prices, so producers could concentrate on making goods.',
  sol: 'Any three reasons: distance, credit, specialised knowledge.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('s3_bus_prof', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between business and profession on any three bases.',
  model: '1. **Reward:** business earns profit; a profession earns fees.\n2. **Qualification:** business needs no prescribed qualification in most cases; a profession needs a specified qualification and training.\n3. **Regulation and risk:** a profession is regulated by a professional body with a code of conduct and bears less risk than business.',
  sol: 'Any three bases of difference, each with both sides stated.',
  scheme: [['First basis', 1], ['Second basis', 1], ['Third basis', 1]],
}));
Q('s3_profit', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Explain why profit alone cannot be the objective of a business. Give any three reasons.',
  model: '1. **Survival needs more than profit:** customers, skilled workers and good suppliers are essential.\n2. **Unfair practices:** chasing profit alone may tempt a firm to cheat customers, which harms goodwill.\n3. **Long-term growth:** innovation, productivity and social responsibility keep a firm competitive over the years.',
  sol: 'Any three reasons showing that profit is necessary but not sufficient.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('s3_manuf', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three kinds of manufacturing industry with an example of each.',
  model: '1. **Analytical:** separates one material into several products, as an oil refinery does.\n2. **Synthetical:** combines materials into one product, as in cement.\n3. **Processing:** passes raw material through successive stages, as in sugar or paper. (Assembling joins parts, as in bicycles.)',
  sol: 'Any three of analytical, synthetical, processing and assembling, each with meaning and example.',
  scheme: [['First kind with example', 1], ['Second kind with example', 1], ['Third kind with example', 1]],
}));
Q('s3_trade', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the types of trade, with a note on each.',
  model: '1. **Internal trade** is within the country; it is **wholesale** (bulk sales to traders) or **retail** (sales to consumers).\n2. **External trade** is between countries: **import** brings goods in, **export** sends goods out.\n3. **Entrepot** trade imports goods in order to export them again.',
  sol: 'Internal (wholesale, retail) and external (import, export, entrepot).',
  scheme: [['Internal trade with its two kinds', 1], ['Import and export', 1], ['Entrepot trade', 1]],
}));
Q('s3_risk_nature', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three features of the nature of business risk.',
  model: '1. **Uncertainty:** risk arises from the uncertainty of future events.\n2. **Essential part:** every business must face risk, whatever its form.\n3. **Degree varies:** it depends on the nature and size of the business; and **profit is the reward** for bearing it.',
  sol: 'Any three features from the nature of risk.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));

// ================================================================ long answer, 5 marks
Q('l_compare', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Distinguish between business, profession and employment on any five bases.',
  model: '1. **Mode of establishment:** business is set up by the owner; a profession needs membership of a professional body; employment begins with a contract or appointment.\n2. **Nature of work:** production or sale of goods and services; personalised expert service; work assigned by the employer.\n3. **Qualification:** none prescribed for business; specified for a profession; as the job needs.\n4. **Reward:** profit; fees; wages or salary.\n5. **Capital and risk:** considerable and high; limited and some; none and little.',
  sol: 'Five bases, each with the three activities contrasted (about one mark each).',
  scheme: [['First basis, all three', 1], ['Second basis, all three', 1], ['Third basis, all three', 1], ['Fourth basis, all three', 1], ['Fifth basis, all three', 1]],
}));
Q('l_chars', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five characteristics of business.',
  model: '1. **An economic activity:** it is done to earn a living.\n2. **Production or procurement:** goods are made or bought for sale.\n3. **Sale or exchange:** goods and services must be transferred to buyers for value.\n4. **Dealings on a regular basis:** a single sale is not business.\n5. **Profit earning:** the main aim is a surplus over costs.\n6. **Uncertainty of return:** profit is never certain.\n7. **Element of risk:** loss is always possible. (Any five.)',
  sol: 'Any five of the seven characteristics, one mark each with a brief explanation.',
  scheme: [['First characteristic', 1], ['Second characteristic', 1], ['Third characteristic', 1], ['Fourth characteristic', 1], ['Fifth characteristic', 1]],
}));
Q('l_objectives', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'A growing imagined firm, Greenleaf Foods, wants to list its objectives. Explain any five objectives of business that it might set, with an example each.',
  model: '1. **Market standing:** become the largest seller of snacks in its region, ahead of its rivals.\n2. **Innovation:** launch a new baked snack and a faster packing method.\n3. **Productivity:** cut waste per batch so that more snacks are made from the same flour and machines.\n4. **Earning profit:** meet all costs and keep a surplus to reward the owners and fund growth.\n5. **Social responsibility:** use recyclable packaging and buy from local farmers.\nOther objectives: physical and financial resources, manager performance and development, worker performance and attitude.',
  sol: 'Any five objectives each explained with an example.',
  scheme: [['First objective with example', 1], ['Second objective with example', 1], ['Third objective with example', 1], ['Fourth objective with example', 1], ['Fifth objective with example', 1]],
}));
Q('l_classify', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the classification of industries into primary, secondary and tertiary, with examples.',
  model: '1. **Primary industries** use natural resources directly. They are **extractive** (mining, fishing, forestry) or **genetic** (cattle breeding, nurseries).\n2. **Secondary industries** turn materials into other goods or build structures.\n3. **Manufacturing** is analytical (oil refinery), synthetical (cement), processing (sugar, paper) or assembling (bicycles, computers).\n4. **Construction** covers the building of roads, bridges, dams and buildings.\n5. **Tertiary industries** are service industries such as transport, banking and insurance, which act as auxiliaries to trade.',
  sol: 'Primary (two kinds), secondary (manufacturing and construction), tertiary, with examples.',
  scheme: [['Primary: extractive and genetic with examples', 1], ['Secondary: manufacturing kinds with examples', 1], ['Secondary: construction with examples', 1], ['Tertiary services with examples', 1], ['Clear classification into three groups', 1]],
}));
Q('l_aux', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain how the five auxiliaries to trade help commerce by removing hindrances.',
  model: '1. **Transport and communication** remove the hindrance of **place** by moving goods and messages.\n2. **Warehousing** removes the hindrance of **time** by storing goods until needed.\n3. **Banking and finance** remove the hindrance of **finance** by providing credit and payment facilities.\n4. **Insurance** removes the hindrance of **risk** by compensating for losses.\n5. **Advertising** removes the hindrance of **information** by telling buyers about goods.',
  sol: 'Five auxiliaries, each linked to the hindrance it removes.',
  scheme: [['Transport and place', 1], ['Warehousing and time', 1], ['Banking and finance', 1], ['Insurance and risk', 1], ['Advertising and information', 1]],
}));
Q('l_risk', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the nature of business risk and its main causes with one example of each.',
  model: '1. **Nature:** risk arises from uncertainty, is part of every business, differs with the nature and size of the business, and is rewarded by profit.\n2. **Natural causes:** floods, earthquakes and other acts of nature that damage stock or plant.\n3. **Human causes:** dishonest employees, strikes and inefficient management.\n4. **Economic causes:** a fall in demand, competition, price changes and new technology.\n5. **Other causes:** political disturbances and changes in exchange rates.\nSo risk can be reduced, but never removed.',
  sol: 'Nature (1 mark) and the four groups of causes (1 mark each).',
  scheme: [['Nature of risk', 1], ['Natural causes with example', 1], ['Human causes with example', 1], ['Economic causes with example', 1], ['Other causes with example', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2, part (c) with a choice)
Q('cb_machhuwadi', caseQ({
  t: [3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined cooperative and village, written for practice.)*',
  passage: '**Machhuwadi Fishers\' Society (imagined)**\n\nIn the imagined coastal village of Machhuwadi, boat crews bring in fish every morning. Part of the catch is packed in ice at a cold store owned by the village society and carried by truck to a city market. The rest goes to a small unit of the society, where the fish is cooked, sealed in tins and labelled. The society has bought a policy against the loss of boats in storms and has taken a bank loan to buy new nets.',
  parts: [
    child('a', mcq({ t: 3, d: 1, c: 'application', stem: 'Catching fish from the sea is an example of', opts: ['extractive industry', 'genetic industry', 'construction', 'retail trade'], sol: 'Taking a natural product from the sea is extractive industry. Genetic industry breeds plants and animals, construction builds structures and retail trade sells to consumers.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows a secondary industry.', model: '"**where the fish is cooked, sealed in tins and labelled**": this is a processing activity, a kind of manufacturing, and so a secondary industry.', sol: 'The line about cooking and tinning the fish.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two auxiliaries to trade from the passage and state the hindrance each removes.', model: '1. **Warehousing** (the cold store) removes the hindrance of **time**.\n2. **Transport** (the truck to the city market) removes the hindrance of **place**. (Also: insurance removes risk and the bank loan removes finance.)', sol: 'Any two auxiliaries with the hindrance each removes.', scheme: [['First auxiliary and hindrance', 1], ['Second auxiliary and hindrance', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Name the auxiliaries to trade that cover the society\'s risk and its need for money, and state the hindrance each removes.', model: '1. **Insurance** (the policy against loss of boats) removes the hindrance of **risk**.\n2. **Banking and finance** (the bank loan for nets) removes the hindrance of **finance**.', sol: 'Insurance for risk and banking for finance.', scheme: [['Insurance and risk', 1], ['Banking and finance', 1]] }),
    ]),
  ],
}));
Q('cb_three_people', caseQ({
  t: [2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined people, written for practice.)*',
  passage: '**Three neighbours of Lakshmi Nagar (imagined)**\n\nGopal teaches in a school and receives a salary on the first of every month. Dr. Nisha treats patients at her own clinic, is registered with a medical council and charges a fee for each visit. Ramesh runs a general store; he buys goods from wholesalers, sells them daily and keeps whatever remains after his costs, though some months he earns almost nothing.',
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'application', stem: 'Whose activity is a business?', opts: ['Ramesh', 'Gopal', 'Dr. Nisha', 'Both Gopal and Dr. Nisha'], sol: 'Ramesh buys and sells goods regularly to earn profit, so his activity is business. Gopal is in employment and Dr. Nisha practises a profession.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the reward of the profession.', model: '"**charges a fee for each visit**": a professional earns fees.', sol: 'The line about the fee.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): State two differences between the activity of Ramesh and that of Gopal, using the passage.', model: '1. **Reward:** Ramesh keeps what remains after costs, which is profit; Gopal receives a fixed salary.\n2. **Risk:** Ramesh bears uncertainty, as some months he earns almost nothing; Gopal\'s pay is regular and carries little risk.', sol: 'Two differences between business and employment with reference to the lines.', scheme: [['First difference', 1], ['Second difference', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two differences between the activity of Dr. Nisha and that of Ramesh, using the passage.', model: '1. **Qualification and regulation:** Dr. Nisha needs a medical qualification and registration with a council; Ramesh needs no prescribed degree.\n2. **Reward:** she earns a fee per visit; he earns profit that is uncertain.', sol: 'Two differences between profession and business with reference to the lines.', scheme: [['First difference', 1], ['Second difference', 1]] }),
    ]),
  ],
}));
Q('cb_ramesh_risk', caseQ({
  t: [4], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined grocer, written for practice.)*',
  passage: '**Ramesh Stores in the monsoon (imagined)**\n\nDuring a heavy monsoon, water entered the shop of Ramesh and spoiled sacks of flour. A few weeks later, a helper took cash from the drawer and left the job. Then a large retail chain opened across the road and sold the same items at lower prices, and the price of cooking oil rose sharply. Ramesh did not close the shop; he said that these troubles were the cost of doing business, and that in a good year the profit made up for them.',
  parts: [
    child('a', mcq({ t: 4, d: 1, c: 'application', stem: 'The spoiling of the flour in the monsoon arose from', opts: ['a natural cause of risk', 'a human cause of risk', 'an economic cause of risk', 'a political cause of risk'], sol: 'Heavy rain and flooding are natural causes. The helper\'s act is human, competition and price changes are economic, and no political event is mentioned.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows a human cause of risk.', model: '"**a helper took cash from the drawer and left the job**": dishonesty of an employee is a human cause.', sol: 'The line about the helper.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Identify two economic causes of risk from the passage.', model: '1. **Competition:** a large retail chain opened across the road and sold the same items at lower prices.\n2. **Price change:** the price of cooking oil rose sharply, raising costs.', sol: 'Competition and price change, each tied to a line.', scheme: [['First economic cause', 1], ['Second economic cause', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Which feature of the nature of business risk does the closing remark of Ramesh show? Explain.', model: 'It shows that **profit is the reward for bearing risk**: troubles are part of every business, and in a good year the profit makes up for them. It also shows that risk is an essential part of business.', sol: 'Profit as the reward for risk, with an explanation.', scheme: [['Feature identified', 1], ['Explained with the passage', 1]] }),
    ]),
  ],
}));
Q('cb_suvarnapur', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined ancient port town, written for practice.)*',
  passage: '**The port of Suvarnapur (imagined)**\n\nIn the imagined ancient port of Suvarnapur, weavers and dyers formed a body that fixed the quality of cloth and settled quarrels among them. Ratnavati, a seth, took deposits from traders, lent money against cargo and wrote hundis payable in towns along the southern highway, the Dakshinapatha. Agents who earned a fee on each sale brought buyers from inland markets to the weavers, and ships from the harbour carried bales to distant lands.',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'application', stem: 'The body of weavers and dyers described in the passage is a', opts: ['guild (shreni)', 'bank', 'port authority', 'brokerage firm'], sol: 'A body of artisans that regulates quality and settles disputes is a guild or shreni. A bank lends money, a port authority runs the harbour and a brokerage arranges deals for a fee.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows an overland trade route.', model: '"**the southern highway, the Dakshinapatha**": the Dakshinapatha was a southern overland route.', sol: 'The line naming the Dakshinapatha.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain two functions of indigenous banking shown in the passage.', model: '1. **Credit:** Ratnavati lent money to traders against their cargo.\n2. **Deposits and transfer of money:** she took deposits and wrote hundis payable in other towns, so money moved without coins being carried.', sol: 'Two functions with reference to the lines.', scheme: [['First function', 1], ['Second function', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify the intermediaries in the passage and explain why they were useful.', model: '**Agents** who earned a fee on each sale were intermediaries. They were useful because they brought buyers from inland markets to the weavers, who could not easily find distant buyers on their own.', sol: 'Agents named and their usefulness explained.', scheme: [['Intermediaries identified', 1], ['Usefulness explained', 1]] }),
    ]),
  ],
}));
Q('cb_sagar', caseQ({
  t: [3], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined trading firm, written for practice.)*',
  passage: '**Sagar Overseas (imagined)**\n\nSagar Overseas buys dried dates from a grower abroad and keeps them in its godown for a few weeks before shipping the whole lot to a buyer in a third country, without selling a single packet in India. It also sends carpets made by weavers of the imagined town of Rangpur to a buyer in another country. At home, it supplies spices in large sacks to local shopkeepers, who sell them in small packets to households.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: 'Buying dates abroad and shipping them to a third country is', opts: ['entrepot trade', 'retail trade', 'internal trade', 'a genetic industry'], sol: 'Importing goods to export them again is entrepot trade. Retail and internal trade take place within the country, and genetic industry breeds plants and animals.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows export of goods made in India.', model: '"**sends carpets made by weavers of the imagined town of Rangpur to a buyer in another country**": goods produced in India are sold abroad, which is export.', sol: 'The line about the carpets.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the wholesale and the retail activity in the passage and give a reason for each.', model: '1. **Wholesale:** supplying spices in large sacks to shopkeepers, as the goods are sold in bulk to traders.\n2. **Retail:** the shopkeepers selling small packets to households, as the sale is to final consumers.', sol: 'Wholesale and retail, each with a reason from the passage.', scheme: [['Wholesale with reason', 1], ['Retail with reason', 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Name the auxiliary to trade used when the dates are kept in the godown and state the hindrance it removes.', model: '**Warehousing** is used. It removes the hindrance of **time**, because the goods can wait for weeks until the buyer is ready.', sol: 'Warehousing and the hindrance of time.', scheme: [['Warehousing', 1], ['Hindrance of time explained', 1]] }),
    ]),
  ],
}));
