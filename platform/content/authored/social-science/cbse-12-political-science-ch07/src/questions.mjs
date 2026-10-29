// CBSE 12 Political Science, ch07 Globalisation — question bank. Every scenario, country, document and
// speaker is imagined and written by SOYL (labelled as such); no NCERT text, box, cartoon or exercise and
// no board/sample-paper item is reused (D-036). Real-world facts are limited to stable, verifiable ones:
// India's 1991 reforms, the WTO (1995), the Seattle WTO ministerial protests (1999), the World Social
// Forum (first meeting Porto Alegre 2001, fourth meeting Mumbai 2004). Nothing after 2024 is stated.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ================================================================ t01 Concept and causes
Q('m_flows_four', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Globalisation as a concept is fundamentally about worldwide flows. Which set correctly lists these flows?',
  opts: [
    'Ideas, capital, commodities and people',
    'Only goods traded between neighbouring countries',
    'Only money moving between central banks',
    'Only soldiers and weapons crossing borders',
  ],
  sol: 'Globalisation means flows of **ideas, capital, commodities and people** across different parts of the world. The other options pick a single narrow flow or have nothing to do with the concept.',
}));
Q('m_multi_dim', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why is globalisation described as a multi-dimensional concept?',
  opts: [
    'It has political, economic and cultural dimensions, and affects different societies differently',
    'It concerns only the economy, measured in many different currencies',
    'It happens in only one dimension at a time, first trade and then culture',
    'It is decided by many dimensions of a single country\'s constitution',
  ],
  sol: 'Globalisation is not only economic: it has **political, economic and cultural** manifestations, and its effects vary from society to society. The other options either reduce it to economics or misread the word "dimension".',
}));
Q('m_tech_cause', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which factor is generally regarded as the most crucial cause of present-day globalisation?',
  opts: [
    'Technology, from the telegraph and telephone to the microchip and the internet',
    'The end of all national borders after the Second World War',
    'A single treaty signed by every country in the world',
    'The decision of one country to rule the rest of the world',
  ],
  sol: 'Advances in **technology** made it possible to move ideas, capital, goods and people quickly across the world. Borders have not ended, no single treaty created globalisation, and no one country rules the world.',
}));
Q('m_online_course', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Riya, a student in Nagpur, studies lessons on climate science prepared by teachers in three other continents and discusses them online with classmates abroad. Which flow of globalisation do the lessons themselves mainly represent?',
  opts: ['Flow of ideas', 'Flow of capital', 'Flow of commodities', 'Flow of people'],
  sol: 'Knowledge and lessons that travel across the world are a **flow of ideas**. No money is invested, no goods are traded and nobody moves to another country in this example.',
}));
Q('m_not_global', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'Which one of the following is **NOT** an example of globalisation?',
  opts: [
    'A farmer selling vegetables at the weekly market of his own village',
    'A garment unit in Tiruppur exporting T-shirts to buyers in Europe',
    'A software engineer from Hyderabad taking up a job in another country',
    'A foreign company investing in a car factory near Chennai',
  ],
  sol: 'A purely local sale inside one village involves no flow across countries. Exporting goods (commodities), working abroad (people) and foreign investment (capital) are all global flows.',
}));
Q('m_interconnected', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A banking crisis in an imagined country, Valdora, leads within weeks to cancelled orders and job losses in factories in a distant imagined country, Sumeria. Which feature of globalisation does this show most clearly?',
  opts: [
    'Worldwide interconnectedness: events in one part of the world affect people far away',
    'The complete end of the role of national governments',
    'The free movement of people without visas',
    'Cultural homogenisation through films and music',
  ],
  sol: 'The crisis travels through trade and finance links, showing **interconnectedness**. Governments still exist, no movement of people is involved, and nothing cultural is described.',
}));
Q('m_uneven_flow', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which statement about the flows of globalisation is most accurate?',
  opts: [
    'Goods and capital move much more freely than people, who still face visa and immigration controls',
    'People now move between countries more freely than goods do',
    'All four flows move with equal ease in every part of the world',
    'Ideas cannot travel across borders without people moving too',
  ],
  sol: 'Flows are **uneven**: countries have lowered barriers to trade and investment, but most still guard their borders closely against the movement of people. Ideas travel easily through media and the internet.',
}));
Q('ar_tech', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Technology has been a crucial cause of globalisation.',
  r: 'Inventions such as the telegraph, the telephone, the microchip and the internet made it possible to move ideas, capital and goods across the world quickly.',
  sol: 'Both are true, and R explains A: faster communication and transport technology is what made worldwide flows on today\'s scale possible.',
}));
Q('ar_new', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'Globalisation is an entirely new process that began only in the 1990s.',
  r: 'Exchanges of goods, ideas and people across distant regions also took place in earlier centuries.',
  sol: 'A is false: the 1990s brought a faster and wider phase, but long-distance exchange is much older. R is true, and it is the reason A is wrong.',
}));
Q('tf_economic_only', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Globalisation is purely an economic phenomenon.',
  sol: 'Globalisation also has **political and cultural** dimensions, such as changes in what states do and in what people eat, wear and watch.',
}));
Q('fb_flows', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'As a concept, globalisation fundamentally deals with ___ of ideas, capital, commodities and people across the world.',
  acc: [['flows', 'flow', 'movement', 'movements']],
  sol: 'Globalisation is about the flows (movement) of ideas, capital, commodities and people.',
}));
Q('mt_flows', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined event with the flow of globalisation it best shows.',
  pairs: [
    ['A Pune software firm sets up an office in Toronto with its own funds', 'Flow of capital'],
    ['Cardamom from Idukki is sold in supermarkets abroad', 'Flow of commodities'],
    ['A nurse from Kochi joins a hospital in another country', 'Flow of people'],
    ['A yoga teaching video made in Rishikesh is watched in many countries', 'Flow of ideas'],
  ],
  sol: 'Investing money abroad is capital; exported spices are commodities; a worker moving abroad is a flow of people; a teaching video spreads ideas.',
}));
Q('s_meaning', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by globalisation? Give one example from daily life in India.',
  model: 'Globalisation means **worldwide interconnectedness** created by **flows of ideas, capital, commodities and people** across countries. Example: a family in Indore uses a phone assembled from parts made in several countries and watches series produced abroad.',
  sol: 'A definition built on flows and interconnectedness, plus one concrete Indian example.',
  scheme: [['Meaning with flows or interconnectedness', 1], ['Suitable example', 1]],
}));
Q('s_tech_role', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two examples to show how technology has helped globalisation.',
  model: '(1) **Internet and video calls** let a designer in Jaipur work with clients in other continents in real time. (2) **Container shipping and air cargo** carry flowers, medicines and machines between countries within days.',
  sol: 'Two different technologies, each tied to a global flow.',
  scheme: [['First example linked to a flow', 1], ['Second example linked to a flow', 1]],
}));
Q('s3_causes', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three causes of globalisation.',
  model: '1. **Technology:** the telegraph, telephone, microchip and internet made fast communication and trade possible.\n2. **Awareness of interconnectedness:** people realise that events such as a disease outbreak or a financial crash in one place affect everyone, which encourages cooperation.\n3. **Economic policies:** many governments lowered trade barriers and welcomed foreign investment, so goods and capital moved more freely.',
  sol: 'Three distinct causes, each briefly explained.',
  scheme: [['First cause explained', 1], ['Second cause explained', 1], ['Third cause explained', 1]],
}));
Q('l_concept', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the concept of globalisation. Why is it wrong to think of it as a purely economic process caused by a single factor?',
  model: '1. **Meaning:** globalisation is the **worldwide interconnectedness** produced by flows of **ideas, capital, commodities and people**.\n2. **Uneven flows:** goods and capital move freely, while people still face **visa controls**, so it affects groups differently.\n3. **Political side:** it changes what **states** can and cannot do, for example in welfare spending.\n4. **Cultural side:** it changes **food, dress, music and language**, sometimes mixing cultures and sometimes threatening them.\n5. **Many causes:** **technology** is crucial, but awareness of shared problems and the **policies of governments** also drive it, so no single cause explains it.',
  sol: 'Define the concept, then show its political and cultural sides and its several causes.',
  scheme: [['Meaning in terms of flows', 1], ['Uneven or differential effects', 1], ['Political dimension', 1], ['Cultural dimension', 1], ['More than one cause explained', 1]],
}));

// ================================================================ t02 Consequences: political
Q('m_welfare_retreat', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Critics of globalisation argue that it erodes state capacity. What do they mean?',
  opts: [
    'The old welfare state gives way to a minimalist state that leaves many economic and social choices to the market',
    'States lose their armies and police to international organisations',
    'States stop holding elections because companies choose governments',
    'States gain complete control over all multinational companies',
  ],
  sol: 'The concern is that governments **withdraw from welfare functions** and let the **market** decide more, so the welfare state shrinks to a minimalist one. States keep their armies and elections, and they do not control all companies.',
}));
Q('m_minimal', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A minimalist state limits itself mainly to which functions?',
  opts: [
    'Maintaining law and order and the security of its citizens',
    'Running every factory and shop in the country',
    'Fixing the price of every commodity sold in the market',
    'Providing free housing, food and jobs to all citizens',
  ],
  sol: 'A minimalist state keeps only **core functions** such as law and order and security; it withdraws from many welfare and economic roles. The other options describe a state doing far more, not less.',
}));
Q('m_state_tech', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The imagined state of Kavera uses a digital identity system and bank accounts to send pensions directly to elderly citizens, cutting out middlemen. What does this suggest about globalisation and the state?',
  opts: [
    'Technology that spreads with globalisation can increase the capacity of the state',
    'Globalisation always reduces what a state can do for its citizens',
    'Pensions are a sign that the welfare state has ended',
    'Only multinational companies can deliver welfare in a globalised world',
  ],
  sol: 'New technology gives the state better information and delivery tools, so in some ways its **capacity grows**. This shows that the "weakening state" argument is not the whole story.',
}));
Q('m_state_primacy', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement best describes the position of the state under globalisation?',
  opts: [
    'The state remains the most important political unit, though its economic role has changed',
    'The state has disappeared and been replaced by global markets',
    'The state now has no role in national security',
    'The state has become weaker in every country in exactly the same way',
  ],
  sol: 'States continue to make laws, keep order and decide on **national security**, so they remain the **primary** actors; what has changed is their economic role. Effects also differ from country to country.',
}));
Q('m_mnc', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A large multinational company tells the imagined government of Marenia that it will build a plant there only if certain labour and tax rules are relaxed. The government agrees. Which consequence of globalisation does this illustrate?',
  opts: [
    'Reduced ability of governments to make decisions entirely on their own',
    'Cultural heterogenisation',
    'Growth of the welfare state',
    'Restriction on the flow of capital',
  ],
  sol: 'Bigger roles for **multinational companies** mean governments sometimes adjust policy to attract investment, which reduces their ability to decide alone. The other options do not fit the situation.',
}));
Q('ar_mnc_people', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Multinational companies have gained a larger role in shaping decisions under globalisation.',
  r: 'Under globalisation, people can now move between all countries without any restriction.',
  sol: 'A is true: governments often weigh the wishes of large investors. R is false: the movement of people remains closely controlled by visas and immigration rules.',
}));

// ================================================================ t02 Consequences: economic
Q('m_imf_wto', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which international organisations are often said to play a major part in shaping economic policies across the world under globalisation?',
  opts: [
    'The International Monetary Fund and the World Trade Organisation',
    'The International Court of Justice and the Trusteeship Council',
    'Amnesty International and Human Rights Watch',
    'The South Asian Association for Regional Cooperation and the Non-Aligned Movement',
  ],
  sol: 'The **IMF** (finance and loans) and the **WTO** (rules of trade) shape economic policy in many countries. The other bodies deal with law, human rights or regional and political cooperation.',
}));
Q('m_econ_glob', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Economic globalisation usually involves',
  opts: [
    'fewer restrictions on imports and greater flows of trade and investment between countries',
    'a ban on foreign companies in all sectors',
    'higher tariffs on every imported good',
    'an end to all exports so that goods stay at home',
  ],
  sol: 'Economic globalisation means **opening up**: lower import barriers, more trade and more foreign investment. The other options describe closing an economy.',
}));
Q('m_safety_net', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'After opening its economy, the imagined country Rovania cuts subsidies on cooking gas and reduces spending on public hospitals. What would critics of economic globalisation say?',
  opts: [
    'Social safety nets that protect the weakest sections are being weakened',
    'Rovania is moving towards a bigger welfare state',
    'Rovania has stopped participating in the world economy',
    'These steps will certainly reduce inequality',
  ],
  sol: 'Critics fear that reduced public spending removes **social safety nets** for the poor. The steps shrink welfare rather than expand it, and they do not show withdrawal from the world economy.',
}));
Q('m_advocates', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What do advocates of economic globalisation argue?',
  opts: [
    'Open trade and investment generate faster growth and greater well-being for larger sections of people',
    'Every country should produce everything it needs by itself',
    'Globalisation will inevitably make poor countries poorer',
    'Foreign investment should be completely banned',
  ],
  sol: 'Supporters claim that openness brings **growth, jobs and choice**. The other options are views of critics or of closed-economy approaches.',
}));
Q('ar_uneven', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Economic globalisation has had unequal effects within and among countries.',
  r: 'Some groups and countries have gained greatly from new markets and investment, while others have lost jobs or protection.',
  sol: 'Both are true, and R explains A: gains and losses are spread unevenly, which is exactly why the effects are unequal.',
}));
Q('tf_people', tf({
  t: 2, d: 2, c: 'application', ans: true,
  stem: 'True or false? Under globalisation, the movement of people across countries is still more restricted than the movement of goods and capital.',
  sol: 'Most countries have lowered barriers to trade and investment but continue to control immigration carefully through visas and work permits.',
}));
Q('s_state_capacity', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'In what two ways can globalisation change the capacity of the state?',
  model: '(1) It can **weaken** the state: the welfare state shrinks and the **market** and multinational companies influence economic decisions. (2) It can **strengthen** the state: new **technology** helps governments gather information and deliver services more efficiently.',
  sol: 'One way it weakens, one way it strengthens the state.',
  scheme: [['Weakening with reason', 1], ['Strengthening with reason', 1]],
}));
Q('s_two_views_econ', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give one argument of supporters and one argument of critics about economic globalisation.',
  model: '**Supporters:** opening trade and investment brings **growth, jobs and wider choice** for consumers. **Critics:** benefits go mainly to the already better-off, while **small producers and workers** lose protection and the gap between rich and poor widens.',
  sol: 'One balanced argument from each side.',
  scheme: [['Supporters\' argument', 1], ['Critics\' argument', 1]],
}));
Q('s_safety_net', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'What is a social safety net? Why do critics of globalisation stress it?',
  model: 'A **social safety net** is public support, such as subsidised food, pensions or health care, that protects people from sudden loss of income. Critics stress it because opening the economy can cost **weaker sections** jobs or support, and they need protection during change.',
  sol: 'Meaning with an example, and the reason critics emphasise it.',
  scheme: [['Meaning of social safety net', 1], ['Why critics stress it', 1]],
}));
Q('s3_political', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three political consequences of globalisation.',
  model: '1. **Erosion of state capacity:** the welfare state gives way to a minimalist state that leaves more to the market.\n2. **Bigger role for multinational companies:** governments may adjust their policies to attract investors, so they decide less on their own.\n3. **Enhanced capacity through technology:** at the same time, new tools help governments collect information and run their affairs better, so the state remains the primary political unit.',
  sol: 'Three distinct political effects, including at least one that shows the state is not simply weakened.',
  scheme: [['First consequence', 1], ['Second consequence', 1], ['Third consequence', 1]],
}));
Q('s3_economic_debate', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: '"Economic globalisation helps everyone equally." Do you agree? Give three reasons for your answer.',
  model: 'I do **not fully agree**. (1) Consumers and skilled workers often gain from **cheaper goods and new jobs**. (2) But small producers and unskilled workers may **lose jobs or protection** when imports rise. (3) Countries with capital and technology usually gain **more** than poorer countries, so gains are real but **unevenly shared**.',
  sol: 'A clear position supported by three reasons that weigh gains against unequal effects.',
  scheme: [['Clear position', 1], ['Reasons on gains', 1], ['Reasons on unequal effects', 1]],
}));
Q('l_econ_consequences', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Examine the economic consequences of globalisation, presenting the views of both its supporters and its critics.',
  model: '1. **More trade and investment:** import barriers have fallen, and capital moves quickly between countries.\n2. **Role of IMF and WTO:** these bodies influence economic policies, which some see as stability and others as outside pressure.\n3. **Supporters:** openness brings **growth, jobs, technology and wider choice**.\n4. **Critics:** gains go mainly to the better-off; **social safety nets** for the poor weaken, and some call it a new form of dependence.\n5. **Balance:** effects are **uneven**; with sensible policies and protection for weaker sections, many countries have gained.',
  sol: 'Describe the changes, then present both views and end with a reasoned judgement.',
  scheme: [['Trade and capital flows', 1], ['Role of international institutions', 1], ['Supporters\' view', 1], ['Critics\' view', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ t02 Consequences: cultural
Q('m_homogen', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What is meant by cultural homogenisation?',
  opts: [
    'The spread of one dominant culture so that cultures across the world begin to look alike',
    'The mixing of two cultures to create something new',
    'The protection of every local culture by law',
    'The study of cultures in different countries',
  ],
  sol: 'Homogenisation means **sameness**: a dominant culture, often of powerful countries, spreads and local cultures fade. Mixing to create something new is heterogenisation.',
}));
Q('m_hybrid', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A café in Chennai serves dosas with fillings borrowed from Mexican and Italian cooking, and young customers love them. This is best described as an example of',
  opts: ['cultural heterogenisation', 'cultural homogenisation', 'a minimalist state', 'a social safety net'],
  sol: 'A **new mix** of local and foreign food widens choices: this is **heterogenisation** (a hybrid culture), not the replacement of the local dish by a foreign one.',
}));
Q('m_cultural_fear', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why do some people fear the cultural effects of globalisation?',
  opts: [
    'They worry that a dominant culture may push aside traditional cultures and local ways of life',
    'They believe all cultural exchange is illegal',
    'They think globalisation stops people from watching films',
    'They fear that the state will ban foreign languages',
  ],
  sol: 'The fear is of **homogenisation**: the culture of the powerful spreading at the cost of local languages, food and customs. The other options are not arguments made in this debate.',
}));
Q('ar_culture_choices', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Cultural globalisation can widen the choices available to people.',
  r: 'Globalisation has increased the movement of goods across national borders.',
  sol: 'Both are true, but R does not explain A: wider cultural choices come from new ideas, food, music and dress mixing with local culture, not simply from more trade in goods.',
}));
Q('tf_culture', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The cultural effects of globalisation are always harmful.',
  sol: 'Globalisation can threaten traditional cultures, but it can also **enrich** them by mixing influences and widening choices (heterogenisation).',
}));
Q('fb_hetero', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'When outside influences mix with local culture, widening choices and creating new combinations, the process is called cultural ___.',
  acc: [['heterogenisation', 'heterogenization']],
  sol: 'This is cultural heterogenisation, the opposite tendency to homogenisation.',
}));
Q('mt_concepts', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each term from the globalisation debate with its meaning.',
  pairs: [
    ['Minimalist state', 'A state limited to core functions such as law and order and security'],
    ['Cultural homogenisation', 'Spread of one dominant culture that makes cultures look alike'],
    ['Cultural heterogenisation', 'Mixing of cultures that creates new combinations and wider choices'],
    ['Social safety net', 'Public support that protects the weakest from sudden loss of income'],
  ],
  sol: 'Each term is matched with its standard meaning as used in the chapter.',
}));
Q('s_homogen_hetero', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between cultural homogenisation and cultural heterogenisation.',
  model: '**Homogenisation:** a dominant culture spreads and **local cultures fade**, so societies start to look alike. **Heterogenisation:** foreign influences **mix** with local culture, producing new combinations and **widening choices** without erasing tradition.',
  sol: 'One feature of each, showing the contrast between sameness and mixing.',
  scheme: [['Homogenisation explained', 1], ['Heterogenisation explained', 1]],
}));
Q('s_cultural_example', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give one example each, from your own surroundings, of cultural homogenisation and cultural heterogenisation.',
  model: '**Homogenisation:** in many towns, local snacks are being replaced by the **same fast-food chains** found everywhere. **Heterogenisation:** a college band in Shillong mixes **Khasi folk tunes with rock**, creating a new style enjoyed by many.',
  sol: 'Any two suitable, clearly labelled examples.',
  scheme: [['Example of homogenisation', 1], ['Example of heterogenisation', 1]],
}));
Q('s3_culture_both', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Is cultural globalisation a threat or an opportunity for a society like India? Give three arguments.',
  model: 'It is **both**. (1) **Threat:** powerful foreign media can push aside local languages, crafts and festivals among the young. (2) **Opportunity:** contact with other cultures widens choices and lets Indian music, food and yoga reach the world. (3) **Balance:** a confident culture can **absorb** outside influences and remain itself, so the result depends on how society responds.',
  sol: 'Arguments on both sides and a reasoned conclusion.',
  scheme: [['Threat argued', 1], ['Opportunity argued', 1], ['Reasoned conclusion', 1]],
}));
Q('l_three_consequences', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Analyse the political, economic and cultural consequences of globalisation.',
  model: '1. **Political (weakening):** the welfare state gives way to a **minimalist state**; companies influence policy.\n2. **Political (strengthening):** **technology** improves the state\'s information and services; it remains the main political unit.\n3. **Economic:** **more trade and investment**, with the IMF and WTO shaping policy; growth for some, loss of protection for others.\n4. **Cultural risk:** a dominant culture may cause **homogenisation**.\n5. **Cultural gain:** mixing creates **hybrid cultures** and widens choices, so effects are mixed in every sphere.',
  sol: 'Cover all three spheres and show that each has more than one effect.',
  scheme: [['Political: weakening of the state', 1], ['Political: enhanced capacity', 1], ['Economic consequences', 1], ['Cultural homogenisation', 1], ['Cultural heterogenisation', 1]],
}));

// ================================================================ t03 India and globalisation; resistance
Q('m_colonial', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'During colonial rule, what was India\'s main role in the flows of world trade?',
  opts: [
    'A supplier of raw materials and a buyer of finished goods',
    'A leading exporter of machines to Europe',
    'A country completely cut off from world trade',
    'The main source of foreign investment in Britain',
  ],
  sol: 'Under colonial rule India exported **raw materials** (cotton, indigo, jute) and imported **finished goods**, a pattern that served the colonial power.',
}));
Q('m_protection', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What economic approach did India follow for several decades after independence?',
  opts: [
    'Protecting domestic producers by restricting imports, with the aim of self-reliance',
    'Removing all barriers to imports immediately',
    'Allowing only foreign companies to run industries',
    'Ending all trade with other countries',
  ],
  sol: 'India chose **protectionism** to build its own industry and reduce dependence. Trade continued, but imports were restricted; the economy was not handed to foreign companies.',
}));
Q('m_1991', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In which year did India begin a major programme of economic reforms that opened its economy more to the world?',
  opts: ['1991', '1971', '1984', '2004'],
  fixed: true, key: 'a',
  sol: 'The major reforms began in **1991**. The other years are not the starting point of these reforms.',
}));
Q('m_wsf_first', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Where and when was the first meeting of the World Social Forum held?',
  opts: ['Porto Alegre, Brazil, in 2001', 'Mumbai, India, in 2001', 'Seattle, USA, in 1999', 'Geneva, Switzerland, in 1995'],
  sol: 'The first World Social Forum met in **Porto Alegre, Brazil, in 2001**. Mumbai hosted the fourth meeting in 2004; Seattle saw protests at a WTO meeting in 1999; Geneva is where the WTO is based.',
}));
Q('m_wsf_mumbai', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The fourth meeting of the World Social Forum was held in',
  opts: ['Mumbai in 2004', 'Kolkata in 2001', 'New Delhi in 1999', 'Chennai in 2007'],
  sol: 'The **fourth** World Social Forum was held in **Mumbai in 2004**.',
}));
Q('m_wsf_nature', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which description best fits the World Social Forum?',
  opts: [
    'An open platform where human rights activists, environmentalists, labour, youth and women\'s groups oppose neo-liberal globalisation',
    'An organisation of governments that sets the rules of world trade',
    'A bank that lends money to countries facing economic crises',
    'A military alliance of countries opposed to globalisation',
  ],
  sol: 'The WSF is a **meeting ground of social movements and activists**, not a body of governments (the WTO), a lender (the IMF) or an alliance.',
}));
Q('m_left_critique', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which argument is most typical of left-wing critics of globalisation?',
  opts: [
    'Present-day globalisation is a phase of global capitalism that makes the rich richer and the poor poorer',
    'Globalisation will destroy traditional culture and religion',
    'Globalisation weakens the state, which must protect national power',
    'Globalisation is good for all and needs no regulation',
  ],
  sol: 'Left critics focus on **class and inequality** under global capitalism. Concern for traditional culture or state power is more typical of right-wing critics; the last option is not a critique at all.',
}));
Q('m_right_critique', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A speaker at an imagined rally says: "Foreign television is making our children forget our own festivals and language." This concern is closest to which critique of globalisation?',
  opts: [
    'The cultural critique often associated with right-wing critics',
    'The left-wing critique about class inequality',
    'The argument of supporters of free trade',
    'The case for a bigger role for multinational companies',
  ],
  sol: 'Worry about losing **traditional culture** is the cultural concern usually voiced by right-wing critics. It is not about class (left critique) and it is the opposite of supporters\' views.',
}));
Q('m_seattle', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Large protests against unfair global trade practices took place at the meeting of the World Trade Organisation in 1999 in',
  opts: ['Seattle', 'Porto Alegre', 'Mumbai', 'Bretton Woods'],
  sol: 'The 1999 WTO ministerial meeting in **Seattle** saw widespread protests. Porto Alegre and Mumbai hosted the World Social Forum; Bretton Woods is linked to the 1944 conference that planned the IMF and World Bank.',
}));
Q('m_india_resist', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined association of handloom weavers in Bhagalpur organises a march against cheap imported fabric and demands support for local producers. This is an example of',
  opts: [
    'resistance to globalisation in India by groups who fear losing their livelihood',
    'cultural heterogenisation',
    'expansion of the welfare state under globalisation',
    'the work of the World Trade Organisation',
  ],
  sol: 'Producers who fear competition from imports and protest for protection are part of the **resistance to globalisation** in India. Nothing here is a cultural mix, a welfare expansion or WTO action.',
}));
Q('ar_resist', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Resistance to globalisation is not necessarily resistance to the idea of global connectedness.',
  r: 'Many critics oppose a particular form of globalisation, while themselves using worldwide networks to organise and share ideas.',
  sol: 'Both are true, and R explains A: movements like the World Social Forum are themselves global, so what they oppose is a specific (neo-liberal) form of globalisation, not connection as such.',
}));
Q('ar_india_growth', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'India\'s economy grew faster in the decades after the 1991 reforms than in the early decades after independence.',
  r: 'India had no economic links at all with the rest of the world before 1991.',
  sol: 'A is true. R is false: India traded with other countries throughout, though it restricted imports and foreign investment before 1991.',
}));
Q('tf_wsf', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The first meeting of the World Social Forum was held in Brazil.',
  sol: 'It met first in Porto Alegre, Brazil, in 2001.',
}));
Q('ord_timeline', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events connected with globalisation in chronological order.',
  items: [
    'India begins major economic reforms',
    'The World Trade Organisation is set up',
    'Protests at the WTO meeting in Seattle',
    'First meeting of the World Social Forum in Porto Alegre',
    'World Social Forum meets in Mumbai',
  ],
  sol: 'Reforms in India 1991 → WTO 1995 → Seattle protests 1999 → first WSF 2001 → WSF in Mumbai 2004.',
}));
Q('s_india_protection', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why did India follow a protectionist policy after independence, and why did it change this policy in 1991?',
  model: '**Why protection:** after colonial experience, India wanted to build its **own industries** and become **self-reliant**. **Why change:** growth stayed slow and the economy faced a **financial crisis**, so from 1991 India removed many restrictions to achieve **higher growth**.',
  sol: 'One reason for protection and one for the 1991 change.',
  scheme: [['Reason for protectionism', 1], ['Reason for the 1991 change', 1]],
}));
Q('s_wsf', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is the World Social Forum? Mention where its first and fourth meetings were held.',
  model: 'The **World Social Forum** is an open platform where activists, environmentalists, labour, youth and women\'s groups come together to **oppose neo-liberal globalisation**. Its first meeting was in **Porto Alegre, Brazil (2001)** and its fourth in **Mumbai (2004)**.',
  sol: 'Nature of the forum plus both venues.',
  scheme: [['Nature of the WSF', 1], ['Both venues with years', 1]],
}));
Q('s_india_resist', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Mention any two forms that resistance to globalisation has taken in India.',
  model: '(1) **Trade unions and Left parties** have protested against policies they see as harming workers and public-sector jobs. (2) **Farmers\' and small producers\' groups** have campaigned against the entry of large foreign firms into their sectors; some groups also object to foreign cultural influences.',
  sol: 'Any two forms, each linked to a group.',
  scheme: [['First form of resistance', 1], ['Second form of resistance', 1]],
}));
Q('s3_left_right', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the criticism of globalisation made by the left with that made by the right.',
  model: '1. **Left critics** see present-day globalisation as a phase of **global capitalism** that makes the rich richer and the poor poorer.\n2. **Right critics** worry about the **weakening of the state** (politically) and want self-reliance and protection in some sectors (economically).\n3. **Cultural concern:** the right also fears the **loss of traditional culture**, while the left focuses on **class inequality**.',
  sol: 'Contrast the two critiques on at least two grounds.',
  scheme: [['Left critique', 1], ['Right critique: political or economic', 1], ['Contrast on culture or inequality', 1]],
}));
Q('s3_india_appraisal', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Evaluate India\'s experience of globalisation since 1991 in three points.',
  model: '1. **Gains:** faster economic growth, new jobs in services and information technology, and wider consumer choice.\n2. **Concerns:** benefits have been **uneven**; some farmers, small producers and informal workers have faced new pressures.\n3. **Judgement:** India has gained overall, but the debate continues on how to **share the benefits** more widely and protect weaker sections.',
  sol: 'Gains, concerns and a balanced judgement.',
  scheme: [['Gains', 1], ['Concerns', 1], ['Balanced judgement', 1]],
}));
Q('l_resistance', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the main forms of resistance to globalisation, with reference to the World Social Forum and to India.',
  model: '1. **Not anti-connection:** critics usually oppose a particular **neo-liberal** form of globalisation, not global contact itself.\n2. **Left critique:** global capitalism is seen to make the **rich richer** and the poor poorer.\n3. **Right critique:** concern for the **weakening state**, self-reliance and **traditional culture**.\n4. **World Social Forum:** an open platform of activists and movements; first met in **Porto Alegre (2001)**, fourth in **Mumbai (2004)**.\n5. **India:** protests have come from **trade unions and Left parties** (jobs, wages), **farmers and small producers** (competition from big firms) and some groups worried about foreign cultural influence.',
  sol: 'Cover the nature of resistance, both critiques, the WSF and Indian examples.',
  scheme: [['Nature of resistance', 1], ['Left critique', 1], ['Right critique', 1], ['World Social Forum', 1], ['Resistance in India', 1]],
}));
Q('l_india', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Trace India\'s experience of globalisation from colonial times to the period after 1991, and assess whether it has been beneficial.',
  model: '1. **Colonial period:** India supplied **raw materials** and bought finished goods, a pattern that served the colonial power.\n2. **After 1947:** **protectionism** and self-reliance built industry, but growth stayed slow.\n3. **1991 reforms:** India **opened** trade and investment after a financial crisis.\n4. **Benefits:** **faster growth**, services and IT jobs, wider consumer choice.\n5. **Assessment:** gains are real but **uneven**; small producers and informal workers face pressure, so policies to spread benefits matter.',
  sol: 'Three phases, then a reasoned assessment with both gains and concerns.',
  scheme: [['Colonial phase', 1], ['Protectionist phase', 1], ['1991 opening', 1], ['Benefits', 1], ['Balanced assessment', 1]],
}));

// ================================================================ sources
Q('sb_callcentre', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined blog of a customer-service worker in Gurugram and answer the questions that follow. ${IMAG}`,
  passage: '**From the blog of Neha, a customer-service executive (imagined), 2019**\n\nMy shift starts at seven in the evening, when it is morning for our customers on the other side of the world. I answer questions about mobile phone bills for a company whose head office I have never seen. My salary is paid in rupees, but the company is owned by investors in three countries. During the break my friends and I order momos and pasta, and talk about a series made in Korea. My cousin left last year to work as an engineer abroad, and we speak every Sunday on a video call.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which line shows the flow of capital?', model: 'The company is **owned by investors in three countries**, who have invested their money in it.', sol: 'Foreign ownership through investment is a flow of capital.', scheme: [['Correct line identified', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Identify one flow of people mentioned in the source.', model: 'Neha\'s **cousin moved abroad** to work as an engineer.', sol: 'A person moving to another country for work is a flow of people.', scheme: [['Flow of people identified', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the source show the role of technology in globalisation? Give two points.', model: '(1) Neha serves customers on another continent **over phone and computer networks** without leaving Gurugram. (2) The family keeps in touch through **weekly video calls**, which would have been impossible a few decades ago.', sol: 'Two technology-based links from the source.', scheme: [['First technology link', 1], ['Second technology link', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Show how the source illustrates that globalisation is multi-dimensional.', model: 'It has an **economic** side (foreign investment and jobs serving customers abroad) and a **cultural** side (food from other countries and a Korean series), so it is more than just trade.', sol: 'Identify at least two dimensions with evidence.', scheme: [['Economic dimension with evidence', 1], ['Cultural dimension with evidence', 1]] }),
    ]),
  ],
}));
Q('sb_marenia', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source on the imagined country Marenia's new economic policy and answer the questions that follow. ${IMAG}`,
  passage: '**Report from an imagined newspaper in Marenia, 2010**\n\nThe government today announced that foreign companies will be allowed to open large retail stores, and that the subsidy on kerosene will be phased out over three years. The finance minister said the steps were needed to attract investment and meet conditions for an international loan. Trade unions called a strike, warning that small shopkeepers would lose their business. In the same speech, the minister launched a digital card that will let the poorest families receive cash support directly in their bank accounts.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify one step that shows the economic dimension of globalisation.', model: 'Allowing **foreign companies to open large retail stores** (or opening to foreign investment).', sol: 'Opening to foreign investment is economic globalisation.', scheme: [['Correct step identified', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which international organisation is most likely to attach conditions to a loan of this kind?', model: 'The **International Monetary Fund (IMF)**.', sol: 'The IMF lends to countries and often attaches policy conditions.', scheme: [['IMF', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the source show both the weakening and the strengthening of state capacity?', model: '**Weakening:** phasing out subsidies and adjusting policy to loan conditions show the state stepping back from welfare. **Strengthening:** the **digital card** lets the state reach poor families directly, using technology to act more effectively.', sol: 'One sign of each from the source.', scheme: [['Weakening with evidence', 1], ['Strengthening with evidence', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why are the trade unions opposed to the new policy? Is their fear justified? Give one reason.', model: 'They fear **small shopkeepers will lose business** to large foreign stores. The fear is **partly justified**: big stores can undercut small shops, though cash support and new jobs may soften the impact.', sol: 'State the fear and give one reasoned judgement.', scheme: [['Reason for opposition', 1], ['Reasoned judgement', 1]] }),
    ]),
  ],
}));
Q('sb_festival', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from an imagined school magazine report on a cultural festival in Guwahati and answer the questions that follow. ${IMAG}`,
  passage: '**From the school magazine (imagined): "Rang Utsav 2023"**\n\nThe evening opened with a band that mixed Bihu drum rhythms with electric guitars, and the crowd sang along to lyrics in both Assamese and English. Food stalls sold pitha alongside burgers and noodles. In a panel discussion, a retired teacher worried that children now know more about foreign cartoon characters than about the stories of their own grandparents. A Class 12 student replied that her generation was learning Assamese folk songs from online videos shared by people living in other countries.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify one example of cultural heterogenisation in the source.', model: 'The band **mixing Bihu rhythms with electric guitars** (or lyrics in two languages).', sol: 'Mixing local and foreign forms creates a hybrid culture.', scheme: [['Correct example', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which fear about cultural globalisation does the retired teacher express?', model: '**Cultural homogenisation**: a dominant foreign culture pushing aside local stories and traditions.', sol: 'Loss of local tradition to a dominant culture is homogenisation.', scheme: [['Homogenisation named', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): How does the student\'s reply challenge the teacher\'s fear? Explain.', model: 'She shows that global technology can also **spread and preserve local culture**: Assamese folk songs reach young people through videos shared from abroad, so globalisation can **strengthen** tradition, not only erase it.', sol: 'Link the reply to the idea that cultural effects can be enriching.', scheme: [['Point of the reply', 1], ['Link to enriching effects', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): On the evidence of the festival, is cultural globalisation a threat or an opportunity? Give two reasons.', model: 'Mostly an **opportunity**: (1) local music and food survive alongside new items, so **choices widen**; (2) new forms such as the Bihu-rock band show tradition **adapting** rather than disappearing, though the teacher\'s concern deserves attention.', sol: 'A view supported by two pieces of evidence.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
Q('sb_delegate', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined diary of a delegate at a World Social Forum meeting and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of an imagined delegate from a fishworkers\' union, January 2004**\n\nThe grounds are crowded with tents and banners in dozens of languages. This morning I listened to forest dwellers, women\'s groups and farm workers. A speaker from South America said that the forum was not against countries trading or people meeting; it was against rules that put profit above people. In the afternoon our union explained how large trawlers had reduced our catch. Strangely, we are all here because of cheap flights, mobile phones and email, the very tools of the globalised world.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'In which city was the World Social Forum meeting of 2004 held?', model: '**Mumbai**.', sol: 'The fourth WSF (2004) was held in Mumbai.', scheme: [['Mumbai', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Name any two kinds of groups that took part, according to the source.', model: '**Forest dwellers, women\'s groups, farm workers** or a **fishworkers\' union** (any two).', sol: 'Any two groups named in the diary.', scheme: [['Two groups', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the diary show that resistance to globalisation is not resistance to global connectedness?', model: 'The forum says it is not against **trade or people meeting** but against rules that put **profit above people**; and the delegates themselves use **flights, phones and email**, the tools of globalisation, to come together.', sol: 'Use both the speaker\'s statement and the delegates\' use of global tools.', scheme: [['Opposes a form, not connection', 1], ['Uses global tools', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Is the union\'s complaint closer to the left or the right critique of globalisation? Give a reason.', model: 'Closer to the **left** critique: it is about **livelihoods of poor workers** being harmed by large commercial interests (big trawlers), which fits the argument that global capitalism benefits the rich at the cost of the poor.', sol: 'Name the left critique and link it to livelihoods and inequality.', scheme: [['Left critique named', 1], ['Reason from the source', 1]] }),
    ]),
  ],
}));
Q('sb_weavers', source({
  t: 3, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the source from an imagined letter of a weavers' cooperative in Varanasi and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from the secretary of a weavers\' cooperative (imagined), 2015**\n\nIn my father\'s time, before the economy was opened, our saris faced little competition from abroad. Since then, cheap machine-made fabric from other countries has taken away much of our ordinary trade, and many young weavers have left for jobs in the cities. But two years ago a design student helped us start selling through a website. Now buyers from four continents order our hand-woven silk, and we earn more for each piece than ever before. We ask the government to help the weavers who cannot reach these new markets.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Which phase of India\'s economic policy does the phrase "before the economy was opened" refer to?', model: 'The phase of **protectionism**, before the reforms of **1991**.', sol: 'India restricted imports until the 1991 reforms.', scheme: [['Protectionist phase before 1991', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify one harmful and one helpful effect of globalisation on the weavers.', model: '**Harmful:** cheap imported fabric took away ordinary trade. **Helpful:** online sales brought buyers from four continents.', sol: 'One effect of each kind from the letter.', scheme: [['Both effects identified', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): What does the letter suggest about the unequal effects of globalisation? Explain.', model: 'Weavers who can **reach global buyers** through the internet gain, while those who **cannot** lose trade to imports and leave the craft. So globalisation creates **winners and losers within the same community**, which is why the secretary asks for government help.', sol: 'Identify winners and losers and link to unequal effects.', scheme: [['Winners and losers identified', 1], ['Link to unequal effects', 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two ways in which the government could help the weavers who cannot reach new markets.', model: '(1) Provide **training and shared online platforms** so that small weavers can sell directly to buyers. (2) Offer **cheap credit, design support and a safety net** such as health cover during the period of adjustment.', sol: 'Two practical, relevant steps.', scheme: [['First suggestion', 1], ['Second suggestion', 1]] }),
    ]),
  ],
}));
