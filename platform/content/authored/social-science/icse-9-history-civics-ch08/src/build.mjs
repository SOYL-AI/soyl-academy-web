// Build ICSE 9 History & Civics ch08 The Mauryan Empire. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch08', 'social-science');
const { rulersFigure, adminFigure, mapFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Sources of Mauryan history', 'The three rulers', 'How the empire was governed'], 'Route map of Part 1: the sources of Mauryan history, the three rulers in order, and how the empire was governed', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['The Kalinga War', 'Principles of Dhamma', 'Impact of Dhamma'], 'Route map of Part 2: the Kalinga War, the principles of Dhamma, and the impact of Dhamma', 'Part 2 at a glance');
const vSources = table(['Source', 'What it is', 'What it helps us learn'], [
  ['Arthashastra', 'Treatise on statecraft, attributed to Kautilya', 'How a state was expected to be run'],
  ['Indika', 'Account by the Greek envoy Megasthenes', 'Pataliputra and the court, seen by a foreigner'],
  ['Ashokan Edicts', 'Royal messages carved on rocks and pillars', 'Ashoka\'s Dhamma and policies, in his own words'],
  ['Sanchi Stupa', 'Buddhist monument in Madhya Pradesh', 'Buddhist art and belief'],
], 'Table of four sources: the Arthashastra is a treatise on statecraft attributed to Kautilya, the Indika an account by Megasthenes, the Ashokan Edicts are carved royal messages, and Sanchi Stupa is a Buddhist monument in Madhya Pradesh');
const vArth = table(['Point', 'About the Arthashastra'], [
  ['Author', 'Attributed to Kautilya (Chanakya), minister of Chandragupta'],
  ['Kind of work', 'A treatise on statecraft'],
  ['Topics', 'Revenue, spies, war, justice, the duties of a king'],
  ['Caution', 'Its date is debated; some parts may be later'],
], 'Table about the Arthashastra: attributed to Kautilya or Chanakya, a treatise on statecraft covering revenue, spies, war and justice, with the caution that its date is debated and some parts may be later');
const vIndika = flow('LR', ['Seleucus Nikator sends Megasthenes as envoy', 'He observes Pataliputra and the court', 'His Indika survives only in quotations by later writers'], 'Flow: Seleucus Nikator sends Megasthenes as envoy, he observes Pataliputra and the court, and his Indika survives only in quotations by later Greek and Roman writers', 'The Indika: how it reached us.');
const vEdicts = table(['Feature', 'The Ashokan Edicts'], [
  ['Where carved', 'Rocks and pillars across the empire'],
  ['Language and script', 'Mostly Prakrit in Brahmi; Kharosthi in the north-west; Greek and Aramaic in the far north-west'],
  ['Deciphered', 'James Prinsep, 1837'],
  ['What they record', 'Dhamma, the Kalinga War, welfare measures'],
], 'Table about the Ashokan Edicts: carved on rocks and pillars, mostly Prakrit in Brahmi script with Kharosthi, Greek and Aramaic in the north-west, deciphered by James Prinsep in 1837, and recording Dhamma, the Kalinga War and welfare');
const vMap = mapFigure('Schematic map with seven places marked: Taxila in the north-west, Sarnath, Pataliputra and Sanchi in the north and centre, Ujjain in the west centre, Tosali in the east and Suvarnagiri in the south; not to scale and positions approximate', 'Some Mauryan places (schematic, not to scale).');
const vSanchi = table(['Point', 'Sanchi Stupa'], [
  ['Place', 'Madhya Pradesh'],
  ['Origin', 'Begun under Ashoka; enlarged later'],
  ['Gateways', 'Carved gateways added about the first century BCE'],
  ['Value as a source', 'Shows Buddhist art, belief and royal patronage'],
], 'Table about Sanchi Stupa: in Madhya Pradesh, begun under Ashoka and enlarged later, carved gateways added about the first century BCE, and valuable as evidence of Buddhist art, belief and royal patronage');
const vUse = table(['Question a historian asks', 'Best source'], [
  ['How did the Mauryas expect a king to run revenue and spies?', 'Arthashastra, with care'],
  ['What did a foreign envoy notice about Pataliputra?', 'Indika, through later quotations'],
  ['What did Ashoka say about the Kalinga War?', 'Ashokan Edicts'],
  ['What art did Buddhists create in this age?', 'Sanchi Stupa'],
], 'Table matching four historian questions with sources: the Arthashastra for revenue and spies with care, the Indika for what an envoy noticed in Pataliputra, the edicts for Ashoka on the Kalinga War, and Sanchi Stupa for Buddhist art');
const vRulers = rulersFigure('Three boxes on a time arrow drawn roughly to scale: Chandragupta about 321 to 297 BCE, Bindusara about 297 to 273 BCE and Ashoka about 268 to 232 BCE; dates approximate and vary between books', 'The three rulers (approximate dates).');
const vChand = flow('LR', ['Overthrew the Nandas, about 321 BCE', 'Conflict with Seleucus, treaty about 305 to 303 BCE', 'Megasthenes comes to Pataliputra'], 'Flow: Chandragupta overthrew the Nandas about 321 BCE, fought Seleucus and made a treaty about 305 to 303 BCE, and Megasthenes came to Pataliputra as envoy', 'Chandragupta Maurya, in order.');
const vBind = table(['Ruler', 'Approximate reign', 'Commonly taught'], [
  ['Chandragupta Maurya', 'About 321 to 297 BCE', 'Founder; overthrew the Nandas; treaty with Seleucus'],
  ['Bindusara', 'About 297 to 273 BCE', 'Son of Chandragupta; held the empire together'],
  ['Ashoka', 'About 268 to 232 BCE', 'Kalinga War; Dhamma; edicts'],
], 'Table of the three rulers with approximate reigns and what each is commonly taught for: Chandragupta the founder, Bindusara son of Chandragupta who held the empire together, and Ashoka for the Kalinga War, Dhamma and edicts');
const vAdmin = adminFigure('Chart: the king at the top, a council of ministers below him, and three boxes below that: central officials such as the samaharta and sannidhata, provinces ruled by princes called kumaras with capitals at Taxila, Ujjain, Tosali and Suvarnagiri, and the city of Pataliputra run by a board of thirty in six committees of five', 'Mauryan administration (simplified).');
const vProv = table(['Level', 'Who governed', 'Examples'], [
  ['Centre', 'King, helped by the council of ministers', 'Samaharta (revenue), sannidhata (treasury)'],
  ['Province', 'A prince called a kumara', 'Taxila, Ujjain, Tosali, Suvarnagiri'],
  ['District and village', 'Local officials under the province', 'Passed orders and collected revenue'],
], 'Table of three levels of government: the centre with the king and ministers, provinces under kumaras with capitals such as Taxila and Ujjain, and districts and villages under local officials');
const vCity = table(['Point', 'Pataliputra, as reported from Megasthenes'], [
  ['Board', 'Thirty members'],
  ['Committees', 'Six committees of five members'],
  ['Matters', 'Crafts, trade, foreigners, births and deaths'],
  ['Caution', 'A foreigner\'s report; read with care'],
], 'Table about Pataliputra as reported from Megasthenes: a board of thirty members in six committees of five dealing with crafts, trade, foreigners and births and deaths, with the caution that it is a foreigner\'s report');
const vPlan = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Position of the king; council of ministers; one named official'],
  ['(ii)', '3', 'Kumaras; two capitals; districts and villages'],
  ['(iii)', '4', 'Board of thirty in six committees; spies; army'],
], 'Table planning a ten-mark answer on administration: part (i) the king and ministers for 3 marks, part (ii) provinces for 3 marks, part (iii) Pataliputra, spies and army for 4 marks');
const vKalinga = flow('LR', ['Kalinga War, about 261 BCE', 'Great suffering; Ashoka\'s remorse recorded in the edicts', 'Conquest by war set aside; Dhamma promoted'], 'Flow: the Kalinga War about 261 BCE caused great suffering, the edicts record Ashoka\'s remorse, and he set aside conquest by war and promoted Dhamma', 'From the Kalinga War to Dhamma.');
const vPrinciples = table(['Principle', 'What it means'], [
  ['Tolerance of all sects', 'Respect for the beliefs of others'],
  ['Non-violence', 'Avoiding needless harm to people and animals'],
  ['Respect for elders and teachers', 'Honouring those who guide us'],
  ['Kindness to servants', 'Fair and gentle treatment of those who work for us'],
], 'Table of four principles of Dhamma: tolerance of all sects, non-violence, respect for elders and teachers, and kindness to servants');
const vNature = table(['Dhamma was', 'Dhamma was not'], [
  ['A moral code for people of all sects', 'A separate new religion, in the view of many historians'],
  ['Announced in public edicts', 'Forced on people'],
  ['A policy linked to welfare', 'A tax or a military order'],
], 'Table: Dhamma was a moral code for people of all sects, announced in public edicts and linked to welfare; it was not, in the view of many historians, a separate new religion, nor forced on people, nor a tax or military order');
const vSort = table(['Imagined action', 'Principle', 'Reason'], [
  ['Two neighbours of different faiths share a festival ground', 'Tolerance', 'Respect for beliefs'],
  ['A carter refuses to overload his bullocks', 'Non-violence', 'Avoids needless harm'],
  ['A weaver lets his helper rest after a long day', 'Kindness to servants', 'Fair treatment of workers'],
], 'Table sorting three imagined actions into principles: neighbours sharing a festival ground show tolerance, a carter not overloading bullocks shows non-violence, and a weaver letting his helper rest shows kindness to servants');
const vMaha = flow('LR', ['Ashoka appoints Dhamma-mahamattas', 'They travel among the people', 'They explain Dhamma and look after welfare of all sects'], 'Flow: Ashoka appoints Dhamma-mahamattas who travel among the people, explain Dhamma and look after the welfare of people of all sects', 'The work of the Dhamma-mahamattas.');
const vWelfare = table(['Welfare measure', 'Purpose'], [
  ['Roads with shade trees', 'Comfort for travellers'],
  ['Wells and rest-houses', 'Water and rest on the road'],
  ['Care for people and animals', 'Medical help and medicinal plants'],
], 'Table of welfare measures: roads with shade trees for comfort, wells and rest-houses for water and rest, and care for people and animals with medical help and medicinal plants');
const vBuddhism = flow('LR', ['Royal support and stupas', 'Third Buddhist Council at Pataliputra', 'Missions abroad, including Mahendra and Sanghamitra to Sri Lanka'], 'Flow: royal support and stupas, the Third Buddhist Council at Pataliputra, and missions abroad including Mahendra and Sanghamitra to Sri Lanka', 'How Buddhism spread.');
const vCulture = table(['Monument', 'Importance'], [
  ['Stupas such as Sanchi', 'Centres of Buddhist art'],
  ['Pillars with edicts', 'Public messages in stone'],
  ['Lion Capital of Sarnath', 'Source of India\'s national emblem'],
], 'Table of cultural legacy: stupas such as Sanchi as centres of Buddhist art, pillars with edicts as public messages in stone, and the Lion Capital of Sarnath as the source of the national emblem of India');
const vAdminImpact = flow('LR', ['Dhamma-mahamattas appointed', 'Officials urged to treat people fairly', 'Welfare added to the work of government'], 'Flow: Dhamma-mahamattas appointed, officials urged to treat people fairly, and welfare added to the work of government', 'Dhamma and administration.');
const vDebate = table(['View', 'Reason given'], [
  ['Some historians', 'Stress on Dhamma and non-violence reduced military strength'],
  ['Other historians', 'Weak successors and the size of the empire were the main causes'],
  ['Others', 'Pressure on revenue and the cost of government'],
], 'Table of debated views on the later weakening of the empire: some historians cite reduced military strength from the stress on Dhamma, others weak successors and the size of the empire, and others pressure on revenue');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Effect on administration; one welfare measure; Dhamma-mahamattas'],
  ['(ii)', '3', 'Buddhism: council, missions; culture: stupas, pillars'],
  ['(iii)', '4', 'Two views on weakening; why debated'],
], 'Table planning a ten-mark answer on the impact of Dhamma: part (i) administration and welfare for 3 marks, part (ii) Buddhism and culture for 3 marks, part (iii) two views on weakening for 4 marks');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Mauryan Empire — Part 1: Sources, Rulers and Administration',
  goals: [
    'Name the authors of the Arthashastra and the Indika and state what each tells us',
    'Explain the importance of the Ashokan Edicts and the Sanchi Stupa as sources',
    'List the major Mauryan rulers in chronological order with approximate reigns',
    'Describe central, provincial and city administration, including Pataliputra',
  ],
  slides: [
    sl('title', 'The Mauryan Empire: sources, rulers and administration', {
      b: 'Part 1 — how we know about the Mauryas, who ruled, and how the empire was governed.',
      v: vRoute1,
      n: 'In this part we learn how historians know about the Mauryan Empire. We meet its three great rulers in order, and then see how the king, his ministers, governors and city officials ran so large an empire.',
    }),
    sl('diagram', 'Four sources at a glance', {
      v: vSources,
      n: 'Four sources help us to study the Mauryas. The Arthashastra is a treatise on statecraft attributed to Kautilya. The Indika is an account by the Greek envoy Megasthenes. The Ashokan Edicts are royal messages carved on rocks and pillars. The Sanchi Stupa is a Buddhist monument in Madhya Pradesh.',
    }),
    sl('concept', 'The Arthashastra', {
      bl: [
        'Attributed to **Kautilya**, also called **Chanakya**, minister of Chandragupta.',
        'A **treatise on statecraft**: revenue, spies, war and justice.',
        'Its **date is debated** and some parts may be **later**.',
        'Read it **with care** and **with other sources**.',
      ],
      v: vArth,
      n: 'The Arthashastra is traditionally attributed to Kautilya, also called Chanakya, a minister of Chandragupta. It is a treatise on how a state should be run, covering revenue, spies, war and justice. Scholars debate its date, and some parts may be later, so historians read it with care and together with other sources.',
    }),
    sl('concept', 'The Indika of Megasthenes', {
      bl: [
        'Written by **Megasthenes**, envoy of **Seleucus Nikator** at **Pataliputra**.',
        'Describes the **city, the court and society** as a foreigner saw them.',
        'It **survives only through quotations** by later Greek and Roman writers.',
      ],
      v: vIndika,
      n: 'Megasthenes was sent as an envoy by Seleucus Nikator to the court of Chandragupta at Pataliputra. His book, the Indika, describes the city, the court and society as a foreigner saw them. The original is lost, and we know it only from quotations by later Greek and Roman writers.',
    }),
    sl('check', 'Quick check: match the sources', {
      b: 'Match each source with what it is.',
      chk: 'mt_sources',
      n: 'Look back at the table of the four sources. Match each one with what it is. Remember who wrote the Arthashastra and who wrote the Indika.',
    }),
    sl('concept', 'The Ashokan Edicts', {
      bl: [
        'Messages carved on **rocks and pillars** across the empire.',
        'Mostly **Prakrit** in **Brahmi**; other scripts in the north-west.',
        '**Deciphered by James Prinsep in 1837.**',
        'They record **Dhamma**, the **Kalinga War** and **welfare**.',
      ],
      v: vEdicts,
      n: 'The Ashokan Edicts are messages carved on rocks and pillars across the empire. Most are in the Prakrit language in the Brahmi script, with other languages in the north-west. James Prinsep deciphered the Brahmi script in eighteen thirty seven. The edicts record Ashoka\'s Dhamma, the Kalinga War and his welfare measures in his own words.',
    }),
    sl('diagram', 'Where the edicts and other sites lie', {
      b: 'Schematic map: positions are approximate.',
      v: vMap,
      n: 'This is a schematic map, not drawn to scale. It shows some places linked with the Mauryas. Pataliputra was the capital. Taxila, Ujjain, Tosali and Suvarnagiri were provincial capitals. Sarnath and Sanchi are famous for their monuments. Edicts were set up in many regions, so that people everywhere could see them.',
    }),
    sl('concept', 'The Sanchi Stupa', {
      bl: [
        'A **Buddhist monument** in **Madhya Pradesh**.',
        '**Begun under Ashoka** and **enlarged later**.',
        'The **carved gateways** were added about the **first century BCE**.',
        'Evidence of **Buddhist art, belief and royal patronage**.',
      ],
      v: vSanchi,
      n: 'The Sanchi Stupa stands in Madhya Pradesh. It was begun under Ashoka and enlarged later, and its carved gateways were added about the first century before the common era. It is a useful source because its carvings show Buddhist art and belief, and its beginning shows royal support for Buddhism.',
    }),
    sl('example', 'Worked example 1: choosing the right source', {
      b: 'Ask what you want to know, then pick the source that fits.',
      bl: [
        'Step 1 — Read the question the historian is asking.',
        'Step 2 — Decide: statecraft, a foreign view, the ruler\'s own words, or art?',
        'Step 3 — Match it with the right source.',
        'Step 4 — Add a caution about that kind of source.',
      ],
      v: vUse,
      n: 'Here is a simple method. Read the question and decide whether it is about statecraft, a foreign view, the ruler\'s own words or art. Then match it with the right source. Statecraft goes to the Arthashastra. A foreign view goes to the Indika. The ruler\'s own words are in the edicts. Art is at Sanchi. Finally, add a caution suited to that source.',
    }),
    sl('check', 'Quick check: a famous envoy', {
      b: 'Decide whether the statement about the Indika is true or false.',
      chk: 'tf_indika',
      n: 'Think about who Megasthenes was, whom he served, and how his book has reached us.',
    }),
    sl('diagram', 'The three rulers in order', {
      v: vRulers,
      n: 'The three major Mauryan rulers were Chandragupta Maurya, Bindusara and Ashoka. The boxes are drawn roughly to scale. Chandragupta ruled from about three hundred twenty one before the common era, Bindusara from about two hundred ninety seven, and Ashoka from about two hundred sixty eight. Books differ a little, so say about.',
    }),
    sl('concept', 'Chandragupta Maurya', {
      bl: [
        '**Overthrew the Nandas** and founded the empire.',
        'Fought **Seleucus Nikator**; a **treaty** ended the conflict.',
        'The treaty left the north-west **secure**.',
        '**Megasthenes** then came to **Pataliputra** as envoy.',
      ],
      v: vChand,
      n: 'Chandragupta overthrew the Nandas and founded the Mauryan Empire in about three hundred twenty one before the common era. In the north-west he fought Seleucus Nikator, and a treaty ended the conflict. After it, Megasthenes came to Pataliputra as an envoy. The treaty left the frontier secure and brought the Mauryas recognition abroad.',
    }),
    sl('diagram', 'Bindusara and Ashoka', {
      v: vBind,
      n: 'Bindusara was the son of Chandragupta and the father of Ashoka, and he held the empire together. Ashoka came after him and is remembered for the Kalinga War, for Dhamma and for his edicts. Remember the order Chandragupta, Bindusara, Ashoka, and give each reign with the word about.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange the rulers in chronological order.',
      chk: 'ord_kings',
      n: 'Begin with the dynasty that Chandragupta overthrew, and then follow the three Mauryan rulers.',
    }),
    sl('diagram', 'Chart of the administration', {
      b: 'The king stood at the **centre**; officials carried his orders down.',
      v: vAdmin,
      n: 'This chart shows the administration in simple form. The king stood at the centre and was helped by a council of ministers called the mantriparishad. Below him were central officials, provinces ruled by princes called kumaras, and the capital city of Pataliputra with its own board of officials.',
    }),
    sl('concept', 'Centre and provinces', {
      bl: [
        'The **king** had the final authority; ministers **advised** him.',
        'The **samaharta** handled **revenue**; the **sannidhata** the **treasury**.',
        'Provinces were ruled by **kumaras**, with capitals such as **Taxila**, **Ujjain**, **Tosali** and **Suvarnagiri**.',
        'Provinces had **districts** and **villages**.',
      ],
      v: vProv,
      n: 'At the centre, the king had the final authority and a council of ministers advised him. The samaharta handled revenue and the sannidhata kept the treasury. Provinces were ruled by princes called kumaras, from capitals such as Taxila, Ujjain, Tosali and Suvarnagiri. Each province had districts and villages that passed orders downward.',
    }),
    sl('concept', 'Pataliputra: a city with a board', {
      bl: [
        'A **board of thirty**, in **six committees of five**.',
        'Committees looked after matters such as **crafts, trade, foreigners** and **births and deaths**.',
        'The account comes from **Megasthenes**: paraphrase and read with care.',
      ],
      v: vCity,
      n: 'As reported from Megasthenes, the capital Pataliputra was run by a board of thirty members, divided into six committees of five. The committees looked after matters such as crafts, trade, foreigners, and births and deaths. We repeat this in our own words and remember that it is a foreigner\'s report.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) The king and ministers. [3] (ii) The provinces. [3] (iii) Pataliputra, spies and the army. [4]',
      bl: [
        '(i) King at the centre; council; one named official.',
        '(ii) Kumaras; two capitals; districts and villages.',
        '(iii) Board of thirty; spies; army.',
        'Aim for one point per mark.',
      ],
      v: vPlan,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second and four to the last. Part one covers the king, the council and one named official. Part two covers kumaras, two capitals, and districts and villages. Part three covers the board of thirty, the spies and the army.',
    }),
    sl('check', 'Quick check: why was it organised?', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_central',
      n: 'Check each statement on its own first. Then ask whether the reason really explains the assertion.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Sources: **Arthashastra**, **Indika**, **Ashokan Edicts**, **Sanchi Stupa**.',
        'Rulers: **Chandragupta**, **Bindusara**, **Ashoka**.',
        'Centre: king, **ministers**, **samaharta**, **sannidhata**.',
        'Provinces under **kumaras**; Pataliputra under a **board of thirty**.',
      ],
      v: vAdmin,
      n: 'To sum up. Four sources help us: the Arthashastra, the Indika, the edicts and Sanchi. The rulers in order are Chandragupta, Bindusara and Ashoka. The king, ministers and officials ran the centre, kumaras ran the provinces, and a board of thirty ran the city of Pataliputra.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Say **about** with every date; books differ.',
        'Give the **author** and the **contribution** of each source together.',
        'Mention a **caution**: the Arthashastra is a treatise; the Indika is a foreigner\'s view.',
        'Name **two capitals** and the **kumara** when writing about provinces.',
        'Write the Pataliputra board in **your own words**.',
      ],
      n: 'Some exam habits. Add the word about to every date. When you name a source, give its author and what it tells us. Mention a caution, such as that the Arthashastra is a treatise and the Indika a foreigner\'s view. For provinces, name two capitals and the kumara. Describe the Pataliputra board in your own words.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Mauryan Empire — Part 2: Ashoka\'s Dhamma and Its Impact',
  goals: [
    'Explain how the Kalinga War influenced Ashoka',
    'Explain the principles of Dhamma: tolerance, non-violence, respect for elders and kindness to servants',
    'Evaluate the impact of Dhamma on administration, the spread of Buddhism and culture',
    'Present the debated view on the weakening of the empire',
  ],
  slides: [
    sl('title', 'Ashoka\'s Dhamma and its impact', {
      b: 'Part 2 — a war, a change of heart, and what followed.',
      v: vRoute2,
      n: 'In this part we study the Kalinga War and how it changed Ashoka. We then learn the principles of his Dhamma and weigh its impact on administration, on Buddhism and on Indian culture. We also see why some historians debate its effects.',
    }),
    sl('concept', 'The Kalinga War', {
      bl: [
        'Fought in about **261 BCE**.',
        'The edicts describe great **suffering**.',
        'Ashoka expressed **remorse**.',
        'He set aside **conquest by war**.',
      ],
      v: vKalinga,
      n: 'The Kalinga War was fought in about two hundred sixty one before the common era. The edicts describe the great suffering it caused, and they record that Ashoka felt sorrow. After this, he set aside conquest by war and turned to Dhamma. We give no figures, only what the edicts say.',
    }),
    sl('check', 'Quick check: a turning point', {
      b: 'Which statement best describes the change in Ashoka\'s policy?',
      chk: 'm_kalinga_turn',
      n: 'Think about what the edicts say about his feelings after the war, and which policy he promoted afterwards.',
    }),
    sl('concept', 'Principles of Dhamma', {
      bl: [
        '**Tolerance** of all sects.',
        '**Non-violence** towards people and animals.',
        '**Respect** for elders and teachers.',
        '**Kindness** to servants.',
      ],
      v: vPrinciples,
      n: 'Ashoka\'s Dhamma had several principles. Tolerance meant respect for the beliefs of all sects. Non-violence meant avoiding needless harm to people and animals. People were to respect their elders and teachers, and to be kind to servants. The care of people and animals was also taught.',
    }),
    sl('diagram', 'What kind of thing was Dhamma?', {
      b: 'Many historians describe Dhamma as a **moral code**, not a separate religion.',
      v: vNature,
      n: 'What was Dhamma? Many historians describe it as a moral code for people of all sects, and not as a separate new religion. It was announced in public edicts and it was linked to welfare. It was not forced on people, and it was not a tax or a military order.',
    }),
    sl('example', 'Worked example 3: sorting actions into principles', {
      b: 'Match each imagined action to a principle, then give the reason.',
      bl: [
        'Step 1 — Read the action.',
        'Step 2 — Ask who is being treated well: a different faith, an animal, a worker.',
        'Step 3 — Name the principle.',
        'Step 4 — Write the reason in one line.',
      ],
      v: vSort,
      n: 'Use four steps. Read the action. Ask who is being treated well, such as a person of a different faith, an animal or a worker. Name the principle and write the reason in one line. Neighbours sharing a festival ground show tolerance. A carter who will not overload his bullocks shows non-violence. A weaver who lets his helper rest shows kindness to servants.',
    }),
    sl('check', 'Quick check: separate religion?', {
      b: 'Decide whether the statement about Dhamma is true or false.',
      chk: 'tf_dhamma_religion',
      n: 'Think about how many historians describe Dhamma, and whether it was forced on people.',
    }),
    sl('concept', 'The Dhamma-mahamattas', {
      bl: [
        'Special officers appointed by Ashoka.',
        'They **travelled among the people**.',
        'They explained **Dhamma** and looked after **welfare**.',
        'They worked for people of **all sects**.',
      ],
      v: vMaha,
      n: 'To spread Dhamma, Ashoka appointed special officers called Dhamma-mahamattas. They travelled among the people, explained right conduct and looked after the welfare of people of all sects. This shows that Dhamma was not only a personal belief of the king, but also a public policy.',
    }),
    sl('diagram', 'Welfare measures', {
      v: vWelfare,
      n: 'The edicts record welfare measures. Roads were planted with shade trees, and wells and rest-houses were set up for travellers. There was care for people and animals, with medical help and medicinal plants. These measures are one reason why Ashoka\'s rule is remembered.',
    }),
    sl('concept', 'Impact on administration', {
      bl: [
        '**Dhamma-mahamattas** were appointed.',
        'Officials were urged to treat people **fairly**.',
        '**Welfare** became part of government.',
      ],
      v: vAdminImpact,
      n: 'Dhamma affected the administration. Dhamma-mahamattas were appointed, officials were urged to treat people fairly, and welfare became a part of the work of government. The edicts also served as public messages, carved where many people could see them.',
    }),
    sl('diagram', 'The spread of Buddhism', {
      b: 'Ashoka supported Buddhism, while his Dhamma was addressed to **people of all sects**.',
      v: vBuddhism,
      n: 'Ashoka supported Buddhism. He built stupas, and the Third Buddhist Council is traditionally held at Pataliputra. Missions were sent abroad, including Mahendra and Sanghamitra to Sri Lanka. At the same time, his Dhamma was addressed to people of all sects, so we keep the two ideas separate.',
    }),
    sl('diagram', 'Culture and legacy', {
      v: vCulture,
      n: 'Ashoka left a lasting mark on culture. Stupas such as Sanchi became centres of Buddhist art. Pillars carried public messages in stone. The Lion Capital of Sarnath, a pillar top with four lions, is the source of the national emblem of India.',
    }),
    sl('check', 'Quick check: a pillar with four lions', {
      b: 'Which statement about the Sarnath pillar top is correct?',
      chk: 'm_emblem',
      n: 'Think about the monument found at Sarnath and about what it gave to modern India.',
    }),
    sl('diagram', 'Was the empire weakened?', {
      b: 'Historians **debate** the causes of the later weakening of the empire.',
      v: vDebate,
      n: 'After Ashoka, the empire weakened. Some historians link this to his policies, because a stress on Dhamma and non-violence may have reduced military strength. Others point to weak successors and the size of the empire. Others point to pressure on revenue. The causes are debated, so a careful answer gives more than one view.',
    }),
    sl('example', 'Worked example 4: planning a 10-mark evaluation', {
      b: 'Question: (i) Administration and welfare. [3] (ii) Buddhism and culture. [3] (iii) Two views on weakening. [4]',
      bl: [
        '(i) Dhamma-mahamattas; one welfare measure.',
        '(ii) Council and missions; stupas and pillars.',
        '(iii) One view, the other view, then why debated.',
        'Use neutral words: some historians, others.',
      ],
      v: vPlan2,
      n: 'Plan this answer in three parts. Part one covers administration and one welfare measure. Part two covers Buddhism, with the council and missions, and culture, with stupas and pillars. Part three gives one view on the weakening, then the other view, and ends by saying why it is debated.',
    }),
    sl('check', 'Quick check: why Dhamma after Kalinga?', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_dhamma',
      n: 'Check each statement on its own first. Then ask whether the reason really explains the assertion.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'The **Kalinga War**, about **261 BCE**, led to **remorse** and **Dhamma**.',
        'Principles: **tolerance, non-violence, respect, kindness**.',
        '**Dhamma-mahamattas** and **welfare** shaped administration.',
        '**Buddhism** spread; **stupas** and the **Lion Capital** remain.',
      ],
      v: vCulture,
      n: 'To sum up. The Kalinga War led Ashoka to Dhamma. Its principles were tolerance, non-violence, respect for elders and kindness to servants. Dhamma-mahamattas and welfare shaped administration, Buddhism spread, and stupas and the Lion Capital remain. The reasons for the later weakening of the empire are debated.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Give the **date** of the Kalinga War as **about 261 BCE**; do not give casualty figures.',
        'Name **four principles** and match them with an **example**.',
        'Call Dhamma a **moral code for all sects**; say it was not forced.',
        'In an evaluation, write **some historians** and **others**.',
        'Spell the officers: **Dhamma-mahamattas**.',
      ],
      n: 'Some exam habits. Give the date of the Kalinga War as about two hundred sixty one before the common era, and do not invent figures. Name four principles and match them with examples. Call Dhamma a moral code for all sects. In an evaluation, write some historians and others. And spell Dhamma-mahamattas with care.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Mauryan Empire — notes',
  sections: [
    {
      h: '1. Sources of Mauryan history',
      t: 1,
      b: '- **Arthashastra:** treatise on statecraft attributed to **Kautilya** (Chanakya), minister of Chandragupta; revenue, spies, war, justice. Rediscovered and published by R. Shamasastry in the early 1900s. Its date is debated and some parts may be later: read it with care.\n- **Indika:** by **Megasthenes**, Greek envoy of Seleucus Nikator at Pataliputra; describes the city, court and society as a foreigner saw them. Survives only in quotations by later Greek and Roman writers.\n- **Ashokan Edicts:** carved on rocks and pillars, mostly Prakrit in Brahmi script (Kharosthi in the north-west; Greek and Aramaic in the far north-west). Deciphered by **James Prinsep in 1837**. Ashoka calls himself Devanampiya Piyadasi.\n- **Sanchi Stupa:** Madhya Pradesh; begun under Ashoka, enlarged later; carved gateways added about the first century BCE.',
      terms: [['Treatise', 'A long, formal work on one subject, such as statecraft.'], ['Edict', 'A royal order or message, here carved in stone.'], ['Stupa', 'A dome-shaped Buddhist monument.']],
      v: vSources,
      vs: [vEdicts, vSanchi],
    },
    {
      h: '2. Where things were',
      t: 1,
      b: '- **Pataliputra** was the capital. **Taxila, Ujjain, Tosali** and **Suvarnagiri** were provincial capitals.\n- **Sarnath** and **Sanchi** are famous for Mauryan and Buddhist monuments.\n- The map is **schematic** and **not to scale**.',
      terms: [['Pataliputra', 'The capital of the Mauryan Empire.']],
      v: vMap,
      vs: [],
    },
    {
      h: '3. The three rulers',
      t: 2,
      b: '- **Chandragupta Maurya** (about 321 to 297 BCE): overthrew the Nandas; conflict with Seleucus Nikator and a treaty (about 305 to 303 BCE); Megasthenes came as envoy.\n- **Bindusara** (about 297 to 273 BCE): son of Chandragupta; held the empire together.\n- **Ashoka** (about 268 to 232 BCE): Kalinga War, Dhamma, edicts.\n- Dates are approximate and vary between books; say **about**.',
      terms: [['Nandas', 'The dynasty that ruled Magadha before the Mauryas.']],
      v: vRulers,
      vs: [vBind, vChand],
    },
    {
      h: '4. Administration',
      t: 3,
      b: '- **Centre:** the king, helped by the council of ministers (**mantriparishad**); officials such as the **samaharta** (revenue) and **sannidhata** (treasury).\n- **Provinces:** ruled by princes (**kumaras**) with capitals such as Taxila, Ujjain, Tosali and Suvarnagiri; divided into districts and villages.\n- **Pataliputra:** as reported from Megasthenes, a board of **thirty** in **six committees of five**, dealing with matters such as crafts, trade, foreigners and births and deaths.\n- **Spies** reported to the king; a large **army** defended the empire.',
      terms: [['Mantriparishad', 'The council of ministers.'], ['Kumara', 'A prince who governed a province.'], ['Samaharta', 'The chief revenue official.'], ['Sannidhata', 'The keeper of the treasury.']],
      v: vAdmin,
      vs: [vProv, vCity],
    },
    {
      h: '5. Ashoka and Dhamma',
      t: 4,
      b: '- The **Kalinga War** (about **261 BCE**): the edicts describe great suffering and Ashoka\'s remorse; he set aside conquest by war.\n- **Principles of Dhamma:** tolerance of all sects, non-violence, respect for elders and teachers, kindness to servants, welfare of people and animals.\n- **Dhamma-mahamattas** were appointed to spread Dhamma and look after welfare.\n- Many historians call Dhamma a **moral code for people of all sects**, not a separate new religion.',
      terms: [['Dhamma', 'Ashoka\'s code of right conduct.'], ['Dhamma-mahamatta', 'An officer appointed to spread Dhamma and care for welfare.']],
      v: vKalinga,
      vs: [vPrinciples, vNature],
    },
    {
      h: '6. Impact of Dhamma',
      t: 5,
      b: '- **Administration:** Dhamma-mahamattas; officials urged to treat people fairly; welfare as part of government.\n- **Welfare:** roads with shade trees, wells, rest-houses, care for people and animals.\n- **Buddhism:** royal support, stupas, the Third Buddhist Council at Pataliputra, missions (Mahendra and Sanghamitra to Sri Lanka).\n- **Culture:** stupas such as Sanchi; pillars; the **Lion Capital of Sarnath**, the source of India\'s national emblem.\n- **Debate:** some historians link the later weakening of the empire to Ashoka\'s policies; others point to weak successors, size and revenue.',
      terms: [['Lion Capital', 'The pillar top found at Sarnath, with four lions.'], ['Mission', 'A group sent to carry a message to another land.']],
      v: vWelfare,
      vs: [vBuddhism, vCulture, vDebate],
    },
  ],
  tips: '**Common mistakes**\n- Giving a date without the word about.\n- Mixing up the author of the Arthashastra (Kautilya) and of the Indika (Megasthenes).\n- Writing that Megasthenes was an Indian minister.\n- Calling Dhamma a new religion forced on people.\n- Giving casualty figures for the Kalinga War.\n- Saying one cause alone destroyed the empire.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a link or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Author of the Arthashastra', '**Kautilya** (Chanakya), minister of Chandragupta.', 'fact', 1],
  ['What is the Arthashastra?', 'A **treatise on statecraft**; read with care because its date is debated.', 'definition', 1],
  ['Author of the Indika', '**Megasthenes**, Greek envoy of Seleucus Nikator.', 'fact', 1],
  ['How does the Indika survive?', 'Only through **quotations** in later Greek and Roman writers.', 'concept', 1],
  ['Ashokan Edicts', 'Royal messages carved on **rocks and pillars**; mostly Prakrit in Brahmi script.', 'definition', 1],
  ['Who deciphered the Brahmi script?', '**James Prinsep**, in 1837.', 'fact', 1],
  ['Sanchi Stupa', 'Buddhist monument in **Madhya Pradesh**; begun under Ashoka and enlarged later.', 'definition', 1],
  ['Sanchi gateways', 'Carved gateways added about the **first century BCE**.', 'fact', 1],
  ['Three major Mauryan rulers', 'Chandragupta Maurya, Bindusara, Ashoka.', 'fact', 2],
  ['Reign of Chandragupta', 'About **321 to 297 BCE** (books differ).', 'fact', 2],
  ['Reign of Bindusara', 'About **297 to 273 BCE** (books differ).', 'fact', 2],
  ['Reign of Ashoka', 'About **268 to 232 BCE** (books differ).', 'fact', 2],
  ['Chandragupta and Seleucus', 'Conflict and **treaty**, about 305 to 303 BCE.', 'concept', 2],
  ['Overthrown by Chandragupta', 'The **Nandas**.', 'fact', 2],
  ['Mantriparishad', 'The **council of ministers** that advised the king.', 'definition', 3],
  ['Samaharta', 'Chief official for **revenue**.', 'definition', 3],
  ['Sannidhata', 'Keeper of the **treasury**.', 'definition', 3],
  ['Kumara', 'A **prince** who governed a province.', 'definition', 3],
  ['Provincial capitals', 'Taxila, Ujjain, Tosali, Suvarnagiri.', 'fact', 3],
  ['Pataliputra administration', 'Board of **thirty** in **six committees of five**, as reported from Megasthenes.', 'concept', 3],
  ['Kalinga War', 'About **261 BCE**; the edicts describe great suffering and Ashoka\'s remorse.', 'fact', 4],
  ['Effect of the Kalinga War', 'Ashoka set aside conquest by war and promoted **Dhamma**.', 'concept', 4],
  ['Principles of Dhamma', 'Tolerance, non-violence, respect for elders and teachers, kindness to servants.', 'concept', 4],
  ['Nature of Dhamma', 'A **moral code** for people of all sects, not a separate religion (as many historians say).', 'concept', 4],
  ['Dhamma-mahamattas', 'Officers appointed to spread Dhamma and look after welfare.', 'definition', 4],
  ['Welfare measures', 'Roads with shade trees, wells, rest-houses, care for people and animals.', 'concept', 5],
  ['Spread of Buddhism', 'Royal support, Third Buddhist Council at **Pataliputra**, missions abroad.', 'concept', 5],
  ['Mission to Sri Lanka', 'Traditionally **Mahendra and Sanghamitra**.', 'fact', 5],
  ['Lion Capital of Sarnath', 'Pillar top with four lions; the source of India\'s **national emblem**.', 'fact', 5],
  ['Why did the empire weaken?', 'Debated: some link it to Ashoka\'s policies, others to weak successors, size and revenue.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Mauryan Empire',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_indika_author', 'm_seleucus', 'm_samaharta', 'm_nonviolence', 'ar_buddhism', 's_edicts_imp', 's3_impact'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_admin', 'l_kalinga'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Mauryan Empire',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_prinsep', 'm_arth_caution', 'm_dates_scenario', 'm_province_head', 'm_city_board', 'm_mahamatta', 'm_welfare', 'ar_weak', 's_indika', 's_prov', 's_kalinga', 's3_pataliputra', 's3_weakening'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_sources', 'l_dhamma', 'l_impact'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of icse-9-history-civics-ch08 only (Arthashastra, Indika, Ashokan Edicts and Sanchi Stupa as sources; Chandragupta, Bindusara and Ashoka in order; central, provincial and city administration; principles of Dhamma and the Kalinga War; impact of Dhamma)',
    originality: 'every museum guide note, traveller\'s letter, school report and classroom scene is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no edict, no Arthashastra passage and no Indika passage is quoted',
    data: 'reign dates asserted consistent (Chandragupta ends where Bindusara begins; Ashoka begins after Bindusara ends); all dates given as about',
    facts: 'Chandragupta about 321 to 297 BCE; Bindusara about 297 to 273 BCE; Ashoka about 268 to 232 BCE; Seleucus conflict and treaty about 305 to 303 BCE; Kalinga War about 261 BCE; James Prinsep deciphered Brahmi in 1837; Sanchi gateways about first century BCE; board of thirty in six committees of five at Pataliputra; provincial capitals Taxila, Ujjain, Tosali, Suvarnagiri; Third Buddhist Council at Pataliputra; Mahendra and Sanghamitra to Sri Lanka; Lion Capital of Sarnath and the national emblem',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
