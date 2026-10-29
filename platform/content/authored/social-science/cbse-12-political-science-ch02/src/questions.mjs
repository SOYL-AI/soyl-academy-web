// CBSE 12 Political Science, ch02 Contemporary Centres of Power — question bank. Every source, diary,
// editorial and debate is written by SOYL and labelled as imagined; no NCERT text, boxed source,
// cartoon or board/sample-paper item is reused (D-036). Facts are limited to stable, commonly taught
// dates and features; nothing after 2024 is tested; wording on disputes is neutral.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const SRC = '*(Imagined document written by SOYL for practice; the people, publications and events in it are not real.)*';

// ================================================================ t01 European Union
Q('m_ecsc', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which body, set up in 1951 by six western European countries, pooled their coal and steel production?',
  opts: ['The European Coal and Steel Community', 'The European Economic Community', 'The Organisation for European Economic Cooperation', 'The Council of Europe'],
  sol: 'The European Coal and Steel Community (1951) brought the coal and steel industries of six states under common rules. The EEC came in 1957, the OEEC in 1948 (to run Marshall Plan aid) and the Council of Europe in 1949.',
}));
Q('m_marshall', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How did the Marshall Plan contribute to European integration after the Second World War?',
  opts: [
    'American aid for rebuilding was routed through a common European organisation, which got states used to working together',
    'It created a common European army under a single commander',
    'It introduced a single European currency in the 1950s',
    'It made Europe a single federal state with one parliament',
  ],
  sol: 'Marshall Plan aid was handled through the Organisation for European Economic Cooperation (1948), so European states had to plan and cooperate jointly. A common currency came only in 1999–2002; Europe never became a single federal state or army.',
}));
Q('m_maastricht', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The treaty signed in 1992 that established the European Union is named after the Dutch city of',
  opts: ['Maastricht', 'Rome', 'Lisbon', 'Paris'],
  sol: 'The Treaty of Maastricht (signed 1992, in force 1993) created the European Union. The Treaty of Rome (1957) set up the EEC; Paris (1951) the coal and steel community; Lisbon (2007) later reformed the EU\'s working.',
}));
Q('m_euro_coins', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Euro notes and coins replaced national currencies in the shops of the first euro countries in',
  opts: ['2002', '1992', '1957', '2020'],
  sol: 'The euro began as an accounting currency in 1999; notes and coins came into daily use on 1 January 2002. 1992 is the Maastricht Treaty, 1957 the Treaty of Rome and 2020 the year the United Kingdom left the EU.',
}));
Q('m_eu_flag', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The European Union\'s flag shows a circle of twelve gold stars. What do the stars stand for?',
  opts: [
    'Unity, solidarity and harmony among the peoples of Europe, not the number of member states',
    'The twelve member states that signed the Maastricht Treaty, one star each',
    'The twelve countries that use the euro',
    'The twelve months in which the EU Parliament meets',
  ],
  sol: 'The number twelve is a symbol of completeness and unity and has never changed as members joined or left; it does not count member states or euro users.',
}));
Q('m_eu_actor', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A diplomat says, "The EU is more than a trade bloc." Which piece of evidence best supports this claim?',
  opts: [
    'It has its own flag, anthem and currency and tries to act jointly in foreign and security matters',
    'Its members trade a great deal with one another',
    'Many of its members are members of the United Nations',
    'Its member states have their own national armies',
  ],
  sol: 'Symbols, a common currency and attempts at a common foreign and security policy show political ambitions beyond trade. Internal trade is exactly what a trade bloc does; UN membership and national armies say nothing about the EU as a body.',
}));
Q('m_eu_limit', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which of the following shows a **limit** to the EU\'s unity as a political actor?',
  opts: [
    'Member states keep their own foreign and defence policies and sometimes take opposite positions on a world crisis',
    'The EU has a common market for goods and services',
    'Most member states use the euro',
    'Citizens of member states can travel and work in other member states',
  ],
  sol: 'Separate national foreign and defence policies, and open disagreement among members, limit the EU\'s ability to speak with one voice. The other three are signs of integration, not limits.',
}));
Q('m_brexit', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'After a referendum held in 2016, which country left the European Union on 31 January 2020?',
  opts: ['The United Kingdom', 'France', 'Norway', 'Denmark'],
  sol: 'The United Kingdom left the EU on 31 January 2020 after its 2016 referendum. France and Denmark remain members; Norway never joined the EU.',
}));
Q('m_eu_economy', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An Indian textile exporter finds that, after one set of EU rules is met, her shirts can be sold in Spain, Germany and Poland without separate national checks. Which feature of the EU explains this?',
  opts: ['The single market with common standards', 'The European Coal and Steel Community', 'The EU\'s common flag and anthem', 'The national armies of member states'],
  sol: 'The EU\'s single market applies one set of product rules across member states, so a good cleared for one can circulate in all. The coal and steel community dealt only with those two industries; symbols and armies have nothing to do with trade rules.',
}));
Q('ar_euro_some', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'Not all members of the European Union use the euro.',
  r: 'Joining the common currency is a separate step, and some members chose to keep their own currencies.',
  sol: 'Both true, and R explains A: euro membership is not automatic, and countries such as Denmark and Sweden still use their own currencies.',
}));
Q('ar_constitution', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'An attempt to adopt a constitution for the European Union failed in the mid-2000s.',
  r: 'The European Union uses a single currency in many of its member states.',
  sol: 'Both are true: voters in France and the Netherlands rejected the proposed constitution in 2005, and the euro is used widely. But the single currency does not explain why the constitution failed, so R is not the explanation.',
}));
Q('ar_economic_power', ar({
  t: 1, d: 2, c: 'understanding', key: 'c',
  a: 'The European Union is an important economic actor in world trade.',
  r: 'The European Union has no common currency.',
  sol: 'A is true: the EU is one of the largest trading groups in the world. R is false: most EU members share the euro.',
}));
Q('tf_eu_federal', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? With the Maastricht Treaty, the member states of the European Union gave up their separate foreign policies and became one federal country.',
  sol: 'The EU is a union of sovereign states that pool some powers; members kept their own foreign and defence policies, and the EU is not a federal country.',
}));
Q('fb_eec', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The European Economic Community was created by the Treaty of ___ in 1957.',
  acc: [['Rome']],
  sol: 'The Treaty of Rome (1957) created the European Economic Community and the European Atomic Energy Community.',
}));
Q('ord_eu', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these steps in the making of the European Union in chronological order.',
  items: [
    'Marshall Plan aid is run through the Organisation for European Economic Cooperation',
    'Six states form the European Coal and Steel Community',
    'The Treaty of Rome creates the European Economic Community',
    'The Maastricht Treaty establishes the European Union',
    'Euro notes and coins come into daily use',
  ],
  sol: '1948 OEEC → 1951 coal and steel community → 1957 Treaty of Rome → 1992 Maastricht → 2002 euro notes and coins.',
}));
Q('s_eu_post_war', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why did western European states begin to cooperate closely after the Second World War? Give two reasons.',
  model: '1. The war had **ruined their economies**; cooperation, helped by **Marshall Plan aid**, speeded up **rebuilding**.\n2. They wanted to make **another war among themselves impossible** and to stand together in the **Cold War**.',
  sol: 'One economic reason (recovery) and one political or security reason.',
  scheme: [['Economic recovery and aid', 1], ['Peace among themselves or Cold War security', 1]],
}));
Q('s_eu_political', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Give two examples that show the European Union acting as a **political** body and not only an economic one.',
  model: '1. It has **symbols** of a political community: a **flag, an anthem and a founding day**.\n2. It tries to follow a **common foreign and security policy** and speaks for members in **international negotiations**, for example on climate.',
  sol: 'Any two non-economic features: symbols, common foreign policy, joint diplomatic positions, citizens\' rights across states.',
  scheme: [['First political feature', 1], ['Second political feature', 1]],
}));
Q('s3_eu_influence', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain the economic, political and military sources of the European Union\'s influence in world affairs.',
  model: '1. **Economic:** it is one of the **largest economies and trading blocs** in the world; its **euro** is a major world currency and its rules shape trade with other countries.\n2. **Political:** one member, **France**, is a **permanent member of the UN Security Council**, and the EU often negotiates as one voice, for example on **climate**.\n3. **Military:** its members together maintain **large armed forces** and spend heavily on defence, though defence stays mostly national.',
  sol: 'One point under each of the three heads, each linked to influence.',
  scheme: [['Economic source', 1], ['Political source', 1], ['Military source', 1]],
}));
Q('l_eu_evolution', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Trace the evolution of the European Union from the end of the Second World War to the introduction of the euro.',
  model: '1. **Post-war recovery:** the American **Marshall Plan** (1948) was run through the **OEEC**, so states learnt to plan jointly; the **Council of Europe** followed in 1949.\n2. **1951:** six states formed the **European Coal and Steel Community**, pooling key war industries.\n3. **1957:** the **Treaty of Rome** created the **European Economic Community** and Euratom; a common market grew.\n4. **1992:** after the end of the Cold War, the **Maastricht Treaty** created the **European Union** with common foreign, security and justice policies.\n5. **1999–2002:** the **euro** was introduced, with notes and coins in daily use from **2002**.',
  sol: 'Five stages in correct order, each with its date and significance.',
  scheme: [['Marshall Plan / OEEC', 1], ['Coal and Steel Community 1951', 1], ['Treaty of Rome 1957', 1], ['Maastricht 1992', 1], ['Euro 1999–2002', 1]],
}));
Q('l_eu_limits', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"The European Union is an economic giant but a political dwarf." Assess this view with arguments on both sides.',
  model: '**For the view:**\n1. Members keep **national foreign and defence policies** and often **disagree** on world crises.\n2. Proposals for deeper union have met **resistance**: a draft **constitution** was rejected in 2005, and the **United Kingdom left** in 2020.\n3. Some members stay **out of the euro**.\n**Against the view:**\n4. The EU has **symbols**, a **parliament**, common laws and negotiates as **one voice** on trade and climate.\n5. Its rules and market size give it **political leverage**. **Conclusion:** strongest in economics, real but **limited** in politics.',
  sol: 'At least two points on each side and a balanced conclusion.',
  scheme: [['Two points supporting the view', 2], ['Two points against the view', 2], ['Balanced conclusion', 1]],
}));
Q('sb_brussels_diary', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from Meher's travel diary about crossing a European border and answer the questions that follow. ${SRC}`,
  passage: '**From the travel diary of Meher, an Indian college student on an exchange visit, 2023**\n\nWe took a bus from Brussels to Amsterdam today and no one checked our papers at the border; I only noticed the change because the road signs switched language. Lunch in the Netherlands cost the same kind of money as breakfast in Belgium, the same notes, the same coins. Our guide said this was unthinkable for her grandparents, whose countries had fought each other twice in one century. In the evening I watched a debate on television: one speaker wanted the Union to build a joint army, another said defence must stay a national matter. They did not agree.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the common currency that Meher used in both countries.', model: 'The **euro**.', sol: 'The shared notes and coins in Belgium and the Netherlands are euros.', scheme: [['Euro', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which feature of European integration is shown by the bus crossing the border without checks?', model: '**Free movement** of people across internal borders, with **no internal border checks** among most member states.', sol: 'Link the unchecked border crossing to free movement inside the Union.', scheme: [['Free movement / no internal border checks', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the television debate show a limit of the European Union as a political actor?', model: 'The speakers **disagreed** on a **joint army**: defence and foreign policy remain largely **national**, so members do not always act as **one political unit**.', sol: 'Connect the disagreement on defence to the limit on common policy.', scheme: [['Defence and foreign policy remain national', 1], ['So the Union cannot always speak with one voice', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does the guide say this was unthinkable for her grandparents? Explain with reference to the reasons for European integration.', model: 'Her grandparents\' countries had **fought two wars**. After 1945, Europe chose **cooperation** to rebuild and to make **another war among members impossible**, which now allows open borders.', sol: 'Use the wars as the background and peace through cooperation as the reason.', scheme: [['Background of the two world wars', 1], ['Integration aimed at peace and recovery', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 ASEAN
Q('m_asean_year', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Association of South East Asian Nations (ASEAN) was founded in 1967 through a declaration signed in',
  opts: ['Bangkok', 'Jakarta', 'Manila', 'Singapore'],
  sol: 'ASEAN was set up on 8 August 1967 by the Bangkok Declaration, signed by Indonesia, Malaysia, the Philippines, Singapore and Thailand.',
}));
Q('m_asean_founders', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which one of the following was **not** among the five founding members of ASEAN?',
  opts: ['Vietnam', 'Indonesia', 'Thailand', 'The Philippines'],
  sol: 'The founders were Indonesia, Malaysia, the Philippines, Singapore and Thailand. Vietnam joined later, in 1995.',
}));
Q('m_asean_way', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The "ASEAN Way" refers to',
  opts: [
    'informal, non-confrontational and cooperative interaction that respects each member\'s sovereignty',
    'a common army that intervenes in members\' internal disputes',
    'a single currency used by all members',
    'majority voting in which outvoted members must obey',
  ],
  sol: 'ASEAN works by consultation and consensus, avoids confrontation and respects national sovereignty. It has no common army, no single currency and no binding majority vote.',
}));
Q('m_arf', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What is the main purpose of the ASEAN Regional Forum, set up in 1994?',
  opts: [
    'Dialogue among ASEAN and other countries on political and security questions in the region',
    'Running a common market with one currency',
    'Organising sports events among member states',
    'Settling trade disputes through a binding court',
  ],
  sol: 'The ASEAN Regional Forum brings ASEAN members together with other countries for dialogue on security and confidence-building. It is not a currency union, a sports body or a court.',
}));
Q('m_asean_pillars', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The ASEAN Community that members agreed to build rests on three pillars. Which list is correct?',
  opts: [
    'Security (political-security), economic and socio-cultural communities',
    'Military, monetary and religious communities',
    'Agricultural, industrial and service communities',
    'Northern, central and southern communities',
  ],
  sol: 'Members agreed in 2003 to build an ASEAN Community with three pillars: political-security, economic and socio-cultural.',
}));
Q('m_act_east', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A new direct flight between Guwahati and a Southeast Asian capital, and a road project towards Myanmar and Thailand, would best fit which Indian policy?',
  opts: ['The Act East policy', 'The policy of import substitution', 'The Panchsheel agreement', 'The Green Revolution'],
  sol: 'Connecting India\'s North-East with Southeast Asia is a core aim of the Act East policy (the successor, from 2014, to the Look East policy of the early 1990s). The other options are unrelated to regional connectivity.',
}));
Q('m_asean_why_success', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why has ASEAN been described as a fast-growing and attractive region for trade and investment? Choose the best reason.',
  opts: [
    'Its members have worked to lower trade barriers among themselves and to attract foreign investment, while avoiding conflict',
    'It has a single government that controls all members\' economies',
    'Its members share one language and one religion',
    'It forbids members from trading with countries outside the region',
  ],
  sol: 'Lowering internal barriers (for example the ASEAN Free Trade Area) and openness to investment, in a climate of peace, made the region attractive. ASEAN has no single government, its members are culturally diverse, and it trades widely with the world.',
}));
Q('ar_asean_way', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'ASEAN has not tried to become a supranational body like the European Union.',
  r: 'The ASEAN Way stresses consensus and respect for the national sovereignty of members.',
  sol: 'Both true, and R explains A: because ASEAN values sovereignty and consensus, it has kept decision-making with member governments rather than building supranational institutions.',
}));
Q('ar_asean_currency', ar({
  t: 2, d: 2, c: 'understanding', key: 'd',
  a: 'ASEAN members use a single common currency like the euro.',
  r: 'ASEAN has worked to increase trade and economic cooperation among its members.',
  sol: 'A is false: ASEAN has no common currency. R is true: it has built a free trade area and other economic links.',
}));
Q('tf_asean_india', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? India is not a member of ASEAN, but it has built close ties with the organisation, including a free trade agreement in goods.',
  sol: 'India is a dialogue partner, not a member; the India–ASEAN trade in goods agreement was signed in 2009.',
}));
Q('fb_look_east', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'India\'s policy of closer ties with Southeast Asia, begun in the early 1990s as the Look East policy, was renamed the ___ East policy in 2014.',
  acc: [['Act']],
  sol: 'The Look East policy became the Act East policy in 2014, stressing action and connectivity.',
}));
Q('mt_asean', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each ASEAN-related term with what it refers to.',
  pairs: [
    ['Bangkok Declaration', 'Founding document of ASEAN, 1967'],
    ['ASEAN Way', 'Informal, consensus-based style of working'],
    ['ASEAN Regional Forum', 'Security dialogue with outside countries'],
    ['Act East policy', 'India\'s outreach to Southeast Asia from 2014'],
  ],
  sol: 'The declaration founded ASEAN; the ASEAN Way is its style; the Forum handles security dialogue; Act East is India\'s policy.',
}));
Q('s_asean_way', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain what is meant by the "ASEAN Way".',
  model: 'The ASEAN Way is a style of **informal, non-confrontational and cooperative** interaction. Members decide by **consultation and consensus** and **respect national sovereignty**, avoiding interference in one another\'s affairs.',
  sol: 'Style of interaction plus the principle of sovereignty.',
  scheme: [['Informal, cooperative, consensus-based', 1], ['Respect for sovereignty and non-interference', 1]],
}));
Q('s_asean_india', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Why is ASEAN important for India? Give two reasons.',
  model: '1. It is a large and growing **market** and source of **investment**; India has a **trade agreement** in goods with it.\n2. Ties with ASEAN help **connect India\'s North-East** with Southeast Asia and support **stability** in the wider region.',
  sol: 'One economic and one strategic or connectivity reason.',
  scheme: [['Economic reason', 1], ['Strategic or connectivity reason', 1]],
}));
Q('s3_asean_community', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the three pillars of the ASEAN Community.',
  model: '1. **Political-security community:** members settle disputes **peacefully**, do not use force against each other and discuss security through bodies such as the **ASEAN Regional Forum**.\n2. **Economic community:** a **common market and production base**, with lower trade barriers and more investment.\n3. **Socio-cultural community:** cooperation in **education, health, disaster relief and culture** to build a shared regional identity.',
  sol: 'Name each pillar and give one feature of it.',
  scheme: [['Political-security community', 1], ['Economic community', 1], ['Socio-cultural community', 1]],
}));
Q('l_asean_role', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain how ASEAN has emerged as an important regional organisation. How does India relate to it?',
  model: '1. **Origin:** set up in **1967** by five states to promote **peace, growth and cooperation** in a region of Cold War tension.\n2. **ASEAN Way:** informal, consensus-based working that **respects sovereignty** kept members together.\n3. **Economy:** a **free trade area**, an **economic community** and openness to **investment** made it a fast-growing region.\n4. **Security:** the **ASEAN Regional Forum** brings in outside powers for dialogue.\n5. **India:** the **Look East** policy of the early 1990s became **Act East** (2014); India has a **trade agreement** in goods and close ties on connectivity.',
  sol: 'Origin, style, economic role, security role and India\'s policy.',
  scheme: [['Origin and aims', 1], ['ASEAN Way', 1], ['Economic role', 1], ['Security role', 1], ['India and ASEAN', 1]],
}));
Q('sb_asean_editorial', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the newspaper editorial on a Southeast Asian summit and answer the questions that follow. ${SRC}`,
  passage: '**Editorial in the imagined newspaper *Coastal Herald*, after a regional summit**\n\nOnce again the leaders have met, smiled for the cameras and issued a statement that offends no one. Critics call this weakness: no member was named or blamed for anything. Yet the same habit of quiet talk has kept ten very different countries — monarchies and republics, rich ports and poor farming states — from fighting one another for decades. Their factories now trade parts across borders and tourists fly between their capitals daily. A neighbour across the Bay of Bengal has noticed: its new road and air links point east.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which working style of the organisation is the editorial describing?', model: 'The **ASEAN Way**: informal, consensus-based, non-confrontational working.', sol: 'Quiet talk and statements that blame no one describe the ASEAN Way.', scheme: [['ASEAN Way', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which country is most likely the "neighbour across the Bay of Bengal", and which policy of that country is hinted at?', model: '**India**, and its **Act East policy**.', sol: 'Eastward road and air links from across the Bay of Bengal point to India\'s Act East policy.', scheme: [['India with the Act East policy', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): The editorial gives one criticism and one defence of this style. State both.', model: '**Criticism:** it avoids hard decisions and blames no one, so it can look **weak**. **Defence:** it has kept very different countries at **peace** and built **economic** ties.', sol: 'One criticism and one defence, both drawn from the source.', scheme: [['Criticism', 1], ['Defence', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Give two pieces of evidence from the source that the region\'s economic integration has grown.', model: '1. **Factories trade parts across borders**.\n2. **Tourists fly between capitals daily**.', sol: 'Two separate pieces of evidence from the text.', scheme: [['First piece of evidence', 1], ['Second piece of evidence', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 China and India–China relations
Q('m_china_1978', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'China began its major economic reforms, including the "open door" policy, in the year',
  opts: ['1978', '1949', '1962', '2001'],
  sol: 'Reforms began in 1978. 1949 is the founding of the People\'s Republic, 1962 the India–China war, 2001 China\'s entry into the WTO.',
}));
Q('m_china_sez', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why did China set up Special Economic Zones from 1980 onwards?',
  opts: [
    'To attract foreign investment and technology with lower taxes and easier rules in chosen areas',
    'To keep foreigners out of the coastal provinces',
    'To return all farmland to collective communes',
    'To stop trade with the outside world',
  ],
  sol: 'Special Economic Zones offered foreign firms easier rules and tax benefits, bringing investment, technology and exports. They opened China up; they did not close it or collectivise land.',
}));
Q('m_china_agri', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which change in Chinese agriculture after the reforms raised farm output and rural incomes?',
  opts: [
    'Land was leased to individual households, which could sell surplus produce after meeting state quotas',
    'Private farming was banned and all land was given to state farms',
    'Farmers were ordered to grow only cotton',
    'All farm prices were frozen at 1949 levels',
  ],
  sol: 'Leasing land to households and allowing them to sell surplus gave farmers incentives, so output and incomes rose. The other options describe tighter control, the opposite of the reforms.',
}));
Q('m_china_wto', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'China became a member of the World Trade Organisation in',
  opts: ['2001', '1978', '1995', '1991'],
  sol: 'China joined the WTO in 2001. The WTO itself was set up in 1995; 1978 is the start of China\'s reforms.',
}));
Q('m_china_shock', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'How did China\'s path to a market economy differ from the "shock therapy" followed by Russia in the 1990s?',
  opts: [
    'China opened its economy step by step without first dismantling its political system',
    'China sold all state firms overnight to private buyers',
    'China first held multi-party elections and then reformed the economy',
    'China closed its economy to foreign investment',
  ],
  sol: 'China reformed gradually, starting with agriculture and special zones, while keeping its one-party political system; Russia tried a sudden, total switch. China did not privatise overnight, hold multi-party elections or close itself to investment.',
}));
Q('m_china_problems', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A report on an imagined interior Chinese province notes falling rural jobs, polluted rivers and a widening gap with rich coastal cities. These are best described as',
  opts: [
    'costs of rapid growth that critics of China\'s reforms often point to',
    'results of the Cultural Revolution of 1966–76',
    'effects of China\'s entry into ASEAN',
    'problems caused by the euro',
  ],
  sol: 'Unemployment in some areas, environmental damage and regional and rural–urban inequality are commonly cited costs of China\'s rapid growth. China is not an ASEAN member, and the euro is irrelevant.',
}));
Q('m_panchsheel', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The Panchsheel, the five principles of peaceful coexistence, were agreed between India and China in',
  opts: ['1954', '1947', '1962', '1988'],
  sol: 'Panchsheel was agreed in 1954. 1962 is the year of the border war; 1988 the year of a prime-ministerial visit that helped improve ties.',
}));
Q('m_india_china_since', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which statement best describes India–China relations since the late 1980s?',
  opts: [
    'Trade and contacts grew strongly while the boundary question remained unresolved and caused periods of tension',
    'The two countries have had no trade with each other',
    'The boundary question was fully settled in 1988',
    'The two countries formed a military alliance against other powers',
  ],
  sol: 'The relationship mixes cooperation (trade, contacts, talks) with an unsettled boundary that has caused tension, for example the clash in the Galwan valley in 2020. There is large trade, no final boundary settlement and no alliance.',
}));
Q('ar_china_growth', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'China became one of the fastest-growing economies of the world after 1978.',
  r: 'Reforms in agriculture, the opening of special zones to foreign investment and a focus on exports raised output rapidly.',
  sol: 'Both true, and R explains A: household farming, foreign investment through special zones and export-led industry drove the rapid growth.',
}));
Q('ar_1962', ar({
  t: 3, d: 2, c: 'understanding', key: 'c',
  a: 'Relations between India and China suffered a serious setback in 1962.',
  r: 'India and China have never had any dispute over their boundary.',
  sol: 'A is true: the 1962 border war set relations back for years. R is false: the boundary question has been the central dispute.',
}));
Q('tf_china_ambassadors', tf({
  t: 3, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? After the 1962 war, India and China restored relations at the level of ambassadors only in 1976.',
  sol: 'Ambassador-level relations were restored in 1976, after more than a decade.',
}));
Q('s_china_reforms', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features of the economic reforms that China began in 1978.',
  model: '1. **Agriculture:** collective farmland was leased to **households**, which could sell their surplus produce in the market after meeting a fixed state quota.\n2. **Open door:** **Special Economic Zones** welcomed foreign investment and technology for **export-led** industry.',
  sol: 'Any two correct features: household farming, SEZs, foreign investment, gradual opening, later WTO entry.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_india_china_coop', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Give two areas in which India and China have cooperated despite their differences.',
  model: '1. **Trade:** China has become one of India\'s **largest trading partners**.\n2. **Multilateral forums:** both work together in groups such as **BRICS** and on issues such as **climate negotiations**.',
  sol: 'Two genuine areas of cooperation: trade, forums, cultural or educational exchange.',
  scheme: [['First area of cooperation', 1], ['Second area of cooperation', 1]],
}));
Q('s3_china_costs', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'China\'s rapid growth has also had costs. Explain any three.',
  model: '1. **Unemployment** in some sectors as old state firms were restructured.\n2. **Environmental damage**: polluted air and rivers in industrial regions.\n3. **Inequality**: a wide gap between **rich coastal and poorer interior** regions and between **urban and rural** people; corruption has also been a concern.',
  sol: 'Three distinct costs, each explained briefly.',
  scheme: [['First cost', 1], ['Second cost', 1], ['Third cost', 1]],
}));
Q('l_china_rise', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the main steps by which China rose as an economic power after 1978.',
  model: '1. **Break with the old model:** the Soviet-style, closed economy had grown slowly, so reforms began in **1978**.\n2. **Agriculture first:** land leased to **households**, raising output and rural incomes.\n3. **Open door:** **Special Economic Zones** drew **foreign investment and technology**; industry grew for **export**.\n4. **Gradual path:** reform came **step by step**, without the shock therapy seen in Russia.\n5. **World economy:** entry into the **WTO in 2001** deepened trade; China became a major manufacturing and trading power.',
  sol: 'Five steps in a logical order with explanation.',
  scheme: [['Need for reform', 1], ['Agricultural reform', 1], ['Open door and SEZs', 1], ['Gradual approach', 1], ['WTO and world trade', 1]],
}));
Q('l_india_china', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Assess India–China relations since 1947, bringing out both conflict and cooperation.',
  model: '1. **Early friendship:** India recognised the new People\'s Republic and the two agreed on **Panchsheel** (1954).\n2. **Conflict:** the **1962 border war** set ties back; the **boundary question** remains unresolved, with periods of tension such as the **Galwan valley clash (2020)**.\n3. **Thaw:** ambassadors were restored in **1976**; a prime-ministerial visit in **1988** opened the way to boundary talks.\n4. **Cooperation:** fast-growing **trade**, and work together in **BRICS** and on **climate**.\n5. **Assessment:** a relationship of **competition and cooperation**, managed through dialogue.',
  sol: 'Conflict and cooperation both covered, in order, with a balanced judgement.',
  scheme: [['Early phase', 1], ['Conflict', 1], ['Improvement', 1], ['Cooperation', 1], ['Balanced assessment', 1]],
}));
Q('sb_china_report', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from a research report on a Chinese county and answer the questions that follow. ${SRC}`,
  passage: '**From a report by the imagined Ganga Institute of Asian Studies, Lucknow**\n\nIn the late 1970s a farmer in the imagined Chinese county of Lianshan handed over almost all his harvest to the collective. By the mid-1980s the same family leased its own plot, met a fixed delivery to the state and sold the rest in the town market. A short train ride away, a fishing village had become a special zone, where foreign companies built factories that shipped toys and electronics abroad. The county\'s income rose fast. The report adds two warnings: the river below the factories now runs grey, and young people from inland villages crowd into the zone because there is little work at home.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which reform in agriculture does the farmer\'s story show?', model: '**Household farming**: land **leased to families**, who sell their surplus after a fixed delivery to the state.', sol: 'Leasing plus selling surplus is the household reform.', scheme: [['Land leased to households, surplus sold', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'What policy does the fishing village that became a "special zone" illustrate?', model: 'The **open door** policy through **Special Economic Zones** for foreign investment and exports.', sol: 'A zone with foreign factories exporting goods illustrates SEZs and the open door.', scheme: [['Open door / SEZs', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Identify the two costs of growth mentioned in the report.', model: '1. **Environmental damage**: the river "runs grey".\n2. **Regional inequality and lack of jobs inland**, pushing young people to migrate to the zone.', sol: 'Pollution and inland unemployment or regional imbalance.', scheme: [['Pollution', 1], ['Regional inequality or inland unemployment', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the report show that China\'s reforms were gradual rather than a shock?', model: 'Farmers still made a **fixed delivery to the state** while selling the rest, and opening began in **chosen zones**, not everywhere at once: a **step-by-step** change.', sol: 'Two signs of gradualism from the text.', scheme: [['State delivery kept alongside markets', 1], ['Opening limited to chosen zones', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 Japan and South Korea
Q('m_japan_g7', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Japan is the only Asian member of which group of major industrialised democracies?',
  opts: ['The Group of Seven (G7)', 'ASEAN', 'SAARC', 'The European Union'],
  sol: 'Japan is the only Asian country in the G7. It is not a member of ASEAN, SAARC or the EU.',
}));
Q('m_japan_constitution', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'Article 9 of Japan\'s post-war constitution is best known for',
  opts: [
    'renouncing war as a means of settling international disputes',
    'making Japan a one-party state',
    'requiring every citizen to serve in the army',
    'ending the monarchy in Japan',
  ],
  sol: 'Article 9 renounces war as a sovereign right; Japan\'s defence forces are organised for self-defence. Japan is a multi-party democracy with a constitutional emperor.',
}));
Q('m_japan_atom', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Which two Japanese cities suffered atomic bombings in August 1945?',
  opts: ['Hiroshima and Nagasaki', 'Tokyo and Osaka', 'Kyoto and Kobe', 'Sapporo and Nagoya'],
  sol: 'Hiroshima and Nagasaki were destroyed by atomic bombs in August 1945, shortly before the end of the Second World War.',
}));
Q('m_korea_divide', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'The Korean peninsula was divided into two states along the',
  opts: ['38th parallel', 'Equator', 'Tropic of Cancer', '17th parallel'],
  sol: 'Korea was divided near the 38th parallel at the end of the Second World War; the Korean War (1950–53) followed. The 17th parallel was the line once dividing Vietnam.',
}));
Q('m_korea_un', mcq({
  t: 4, d: 3, c: 'recall',
  stem: 'In which year did both South Korea and North Korea become members of the United Nations?',
  opts: ['1991', '1945', '1953', '1988'],
  sol: 'Both Koreas joined the UN in 1991. 1945 is the division of the peninsula, 1953 the end of fighting in the Korean War, and 1988 the Seoul Olympics.',
}));
Q('m_korea_miracle', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A student\'s project on an East Asian country describes rapid industrial growth from the 1960s, a move to democracy in the late 1980s, membership of the OECD and world-famous electronics, ships and cars. Which country is it?',
  opts: ['South Korea', 'North Korea', 'Myanmar', 'Mongolia'],
  sol: 'Rapid growth from the 1960s (often called the Miracle on the Han River), democratisation around 1987, OECD membership (1996) and major exports in electronics, ships and cars describe South Korea.',
}));
Q('m_japan_india', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Japanese loans and technology helping to build a city metro in India are an example of',
  opts: [
    'Japan\'s role as a major source of development assistance and investment',
    'Japan\'s membership of SAARC',
    'Japan\'s permanent seat in the UN Security Council',
    'Japan\'s military alliance with India',
  ],
  sol: 'Japan is an important source of development finance and technology for India, for example in metro and rail projects. Japan is not in SAARC, has no permanent UN Security Council seat, and has no military alliance with India.',
}));
Q('ar_japan_military', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'Japan\'s influence in world affairs has rested mainly on its economy and technology rather than on military power.',
  r: 'Its post-war constitution renounces war, and its defence forces are organised for self-defence.',
  sol: 'Both true, and R explains A: with war renounced, Japan built influence through its economy, technology and aid.',
}));
Q('ar_korea_power', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'South Korea is regarded as an emerging power in Asia.',
  r: 'South Korea hosted the Summer Olympic Games in Seoul in 1988.',
  sol: 'Both true, but R does not explain A. South Korea\'s status comes from its industrial growth, technology, trade and democratic stability; hosting the Olympics was a sign of its rise, not the reason for it.',
}));
Q('tf_japan_unsc', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? Japan is a permanent member of the UN Security Council.',
  sol: 'Japan is not a permanent member; it seeks a permanent seat and works with India, Germany and Brazil (the G4) on Security Council reform.',
}));
Q('fb_korea_war', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'The Korean War between the two Korean states, with outside powers involved, was fought from 1950 to ___.',
  acc: [['1953']],
  sol: 'The Korean War lasted from 1950 to 1953 and ended in an armistice.',
}));
Q('mt_powers', match({
  t: 4, d: 2, c: 'application',
  stem: 'Match each description with the centre of power it fits.',
  pairs: [
    ['Common currency used by most of its members', 'European Union'],
    ['Regional body known for consensus and non-interference', 'ASEAN'],
    ['Reforms from 1978 with Special Economic Zones', 'China'],
    ['Only Asian member of the G7', 'Japan'],
  ],
  sol: 'Euro → EU; ASEAN Way → ASEAN; 1978 reforms and SEZs → China; G7 → Japan.',
}));
Q('ord_east_asia', ord({
  t: 4, d: 3, c: 'understanding', marks: 1,
  stem: 'Arrange these East Asian events in chronological order.',
  items: [
    'Atomic bombings of Hiroshima and Nagasaki',
    'Start of the Korean War',
    'China begins its economic reforms',
    'Both Koreas join the United Nations',
    'China joins the World Trade Organisation',
  ],
  sol: '1945 atomic bombings → 1950 Korean War → 1978 Chinese reforms → 1991 Koreas join the UN → 2001 China in the WTO.',
}));
Q('s_japan_power', short({
  t: 4, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two reasons why Japan is considered an important power even though its military is limited.',
  model: '1. It is one of the world\'s **largest and most advanced economies**, a leader in **technology**.\n2. It is a major giver of **development aid** and a long-standing contributor to the **United Nations**.',
  sol: 'Economic or technological strength plus aid or UN role.',
  scheme: [['Economic or technological strength', 1], ['Aid or UN contribution', 1]],
}));
Q('s_korea_rise', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Explain two factors behind South Korea\'s rise as an economic power.',
  model: '1. **Export-led industrialisation** from the 1960s in steel, ships, electronics and cars.\n2. Heavy investment in **education and technology**, and later a stable **democracy** that kept it open to the world.',
  sol: 'Two different factors, explained.',
  scheme: [['First factor', 1], ['Second factor', 1]],
}));
Q('s3_japan_korea_india', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'How are Japan and South Korea important partners for India? Give three points.',
  model: '1. **Investment and aid:** Japan funds and builds **metro and rail** projects; firms from both countries invest in Indian factories.\n2. **Trade:** India has a **comprehensive economic partnership agreement** with South Korea and close trade ties with Japan.\n3. **Strategic ties:** India has **strategic partnerships** with both and works with Japan in regional and Security Council reform groupings.',
  sol: 'Three different areas of partnership.',
  scheme: [['Investment and aid', 1], ['Trade', 1], ['Strategic or diplomatic ties', 1]],
}));
Q('l_japan_korea', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain why Japan and South Korea are regarded as emerging centres of power in the contemporary world.',
  model: '**Japan:**\n1. Rebuilt after 1945 into one of the **largest economies**, a leader in **technology** and the only Asian **G7** member.\n2. A major source of **aid** and a long-standing **UN** contributor; influence rests on economy since war is **renounced** (Article 9).\n**South Korea:**\n3. Rapid **export-led growth** from the 1960s turned a war-torn country into an **industrial** power.\n4. Became a **democracy** in the late 1980s, joined the **UN (1991)** and the **OECD (1996)**.\n5. **Both** are key partners for India and for Asia\'s economic growth.',
  sol: 'Two or three points on each country and a link to their wider role.',
  scheme: [['Japan: economy and technology', 1], ['Japan: aid, UN, Article 9', 1], ['South Korea: growth', 1], ['South Korea: democracy and memberships', 1], ['Wider significance', 1]],
}));
Q('sb_mun_debate', source({
  t: [4, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the minutes of a school Model United Nations debate and answer the questions that follow. ${SRC}`,
  passage: '**Minutes of a Model United Nations debate at an imagined school in Pune, 2024**\n\nThe delegate playing Country P said her nation, flattened by war in 1945, had chosen never again to settle disputes by force; its strength today lay in factories, research laboratories and aid to poorer countries. The delegate for Country Q replied that his country, split in two after the same war and torn by fighting in the early 1950s, had been one of the poorest in Asia; it then built ships, steel and electronics for export and became a democracy in the late 1980s. A third delegate warned both that a giant neighbour, which had opened special zones to foreign firms from 1980, was now out-producing them.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Identify Country P.', model: '**Japan**.', sol: 'Devastated in 1945, renounced war, strong in industry, research and aid: Japan.', scheme: [['Japan', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Identify Country Q.', model: '**South Korea**.', sol: 'Divided after 1945, war in the early 1950s, export-led growth, democracy in the late 1980s: South Korea.', scheme: [['South Korea', 1]] })),
    child('c', short({ t: [4, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which "giant neighbour" is the third delegate referring to? Give two clues from the source.', model: '**China**. Clues: it is a **giant neighbour** of both, and it opened **special zones to foreign firms from 1980**.', sol: 'Name China and cite the special zones and size.', scheme: [['China', 1], ['Clue from the source', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): What is common to the way Country P and Country Q became powers? Explain.', model: 'Both rose mainly through **economic strength**: **industry, exports and technology**, after recovering from **war**, rather than through military expansion.', sol: 'Common path: economic, not military, rise after war.', scheme: [['Economic, industry-led rise', 1], ['After war, not by military expansion', 1]] }),
    ]),
  ],
}));

// ================================================================ extra items across topics
Q('m_centres_why', mcq({
  t: [1, 2], d: 2, c: 'understanding',
  stem: 'Why are the EU and ASEAN called alternative centres of power after the Cold War?',
  opts: [
    'They give their members collective economic and political weight that no single member would have alone',
    'They are military alliances led by the United States',
    'They have replaced the United Nations',
    'They are single countries with one government',
  ],
  sol: 'Regional groupings pool their members\' economic and political weight, offering alternatives to the dominance of one superpower. They are not US-led alliances, have not replaced the UN, and are groupings of sovereign states.',
}));
Q('m_compare_eu_asean', mcq({
  t: [1, 2], d: 3, c: 'analysis',
  stem: 'Which statement correctly compares the EU and ASEAN?',
  opts: [
    'The EU has supranational institutions and a common currency; ASEAN relies on consensus among sovereign governments',
    'Both have a common currency',
    'ASEAN has a stronger common parliament than the EU',
    'Neither works to increase trade among its members',
  ],
  sol: 'The EU has a parliament, common laws and the euro; ASEAN keeps decisions with member governments through the ASEAN Way. ASEAN has no common currency or strong parliament, and both promote internal trade.',
}));
Q('s3_eu_asean_compare', short({
  t: [1, 2], d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the European Union and ASEAN on any three points.',
  model: '1. **Institutions:** the EU has **supranational** bodies such as a parliament and common laws; ASEAN works through **meetings of governments**.\n2. **Currency:** most EU members share the **euro**; ASEAN has **no common currency**.\n3. **Style:** the EU binds members by **treaties and rules**; ASEAN follows the informal, consensus-based **ASEAN Way** that **respects sovereignty**.',
  sol: 'Three points, each stating both sides.',
  scheme: [['First comparison', 1], ['Second comparison', 1], ['Third comparison', 1]],
}));
Q('l_centres_compare', long({
  t: [1, 2, 3], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'After the Cold War, many saw the EU, ASEAN and China as new centres of power. How far do they balance the influence of a single superpower?',
  model: '1. **EU:** a huge **single market** and the **euro** give it weight in trade and climate talks.\n2. **ASEAN:** gives smaller states a **collective voice** and draws major powers into its **forums**.\n3. **China:** rapid **economic rise** has made it a leading **manufacturing and trading** power.\n4. **Limits:** the EU lacks a fully common **foreign and defence policy**; ASEAN works by **consensus**; China faces **internal costs** of growth.\n5. **Judgement:** they make the world **more multipolar** economically, but balancing is **partial**, strongest in **economics**.',
  sol: 'Strength of each centre, their limits, and a reasoned judgement.',
  scheme: [['EU', 1], ['ASEAN', 1], ['China', 1], ['Limits', 1], ['Reasoned judgement', 1]],
}));
Q('s_brexit_effect', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'How did the United Kingdom\'s exit from the European Union in 2020 affect the Union? Give two effects.',
  model: '1. The EU lost one of its **largest economies**, reducing its **economic weight**.\n2. It lost a **permanent member of the UN Security Council** and a major military power from its ranks; membership fell to **27**.',
  sol: 'Two effects linked to the loss of a large member.',
  scheme: [['Economic effect', 1], ['Political or military effect', 1]],
}));
Q('s3_act_east', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain how India\'s Look East policy changed into the Act East policy.',
  model: '1. **Look East (early 1990s):** after economic reforms, India sought **trade and investment** with Southeast Asia and closer ties with ASEAN.\n2. **Act East (2014):** the focus widened to **connectivity** (roads, air links, ports), **security** cooperation and East Asia as a whole.\n3. **North-East:** the newer policy stresses linking India\'s **North-East** with Southeast Asia.',
  sol: 'Origin, change of focus, and the North-East link.',
  scheme: [['Look East focus', 1], ['Act East: wider focus', 1], ['Connectivity / North-East', 1]],
}));
Q('s_galwan', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why does the boundary question remain a source of tension between India and China? Give two reasons.',
  model: '1. The two countries have **different views** on where the boundary lies in several sectors, and it has **not been finally settled**.\n2. Troops face each other along the **Line of Actual Control**, so incidents such as the **2020 clash in the Galwan valley** can occur.',
  sol: 'Unsettled boundary plus the risk of incidents along the LAC.',
  scheme: [['Unsettled boundary claims', 1], ['Incidents along the Line of Actual Control', 1]],
}));
Q('tf_asean_ten', tf({
  t: 2, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? ASEAN grew from five founding members in 1967 to ten members by 1999, as Brunei, Vietnam, Laos, Myanmar and Cambodia joined.',
  sol: 'Brunei joined in 1984, Vietnam in 1995, Laos and Myanmar in 1997 and Cambodia in 1999, making ten members.',
}));
Q('sb_trade_fair', source({
  t: [2, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the notes an exporter wrote after an Asian trade fair and answer the questions that follow. ${SRC}`,
  passage: '**Notes of an imagined Chennai exporter after an Asian trade fair, 2024**\n\nThree buyers from Southeast Asian countries told me that, under the agreement between their organisation and India, my machine parts now face lower duties. One of them, from a member that joined the group in 1995 and borders China, wants a factory partner in India. Then a Japanese company offered technology for my plant, financed by a loan from its government\'s aid agency. On the train home I read that a new highway is planned to link our North-East with Myanmar and Thailand.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the regional organisation the three buyers belong to.', model: '**ASEAN**.', sol: 'An organisation of Southeast Asian countries with a trade agreement with India: ASEAN.', scheme: [['ASEAN', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which member joined in 1995 and borders China?', model: '**Vietnam**.', sol: 'Vietnam joined ASEAN in 1995 and shares a border with China.', scheme: [['Vietnam', 1]] })),
    child('c', short({ t: [2, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which Indian policy is reflected in the planned highway? Explain its aim.', model: 'The **Act East policy**: it aims to **connect India\'s North-East** with Southeast Asia and deepen **trade and people-to-people** links.', sol: 'Name the policy and state the connectivity aim.', scheme: [['Act East policy', 1], ['Connectivity aim', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does the Japanese offer show about the basis of Japan\'s influence?', model: 'Japan\'s influence rests on **technology and finance**: it spreads influence through **investment and development aid**, not military power.', sol: 'Technology and aid as the basis of influence.', scheme: [['Technology and investment', 1], ['Aid, not military power', 1]] }),
    ]),
  ],
}));
Q('m_two_tourists', mcq({
  t: [1, 2], d: 3, c: 'application',
  stem: 'Two imagined tourists compare notes: Lucia pays with the same notes in Italy and Germany, while Arif has to change money when he crosses from Thailand into Malaysia. What does the contrast show?',
  opts: [
    'The EU has a common currency used by most members, while ASEAN members keep their own currencies',
    'ASEAN has a common currency, while the EU does not',
    'Both groupings have abolished national currencies',
    'Neither grouping allows tourists to cross borders',
  ],
  sol: 'Italy and Germany both use the euro; Thailand and Malaysia have their own currencies because ASEAN has no common currency.',
}));
Q('m_port_loan', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined island state builds a new port with low-interest loans and engineers from an Asian country that is a member of the Group of Seven and whose constitution renounces war. Which country is providing the help?',
  opts: ['Japan', 'South Korea', 'China', 'Singapore'],
  sol: 'Membership of the G7 and a constitution renouncing war (Article 9) identify Japan, a major giver of development aid. South Korea, China and Singapore are not G7 members.',
}));
