// Build ICSE 9 History & Civics ch09 The Sangam Age. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch09', 'social-science');
const { timelineFigure, tinaiFigure, portsFigure, tradeFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Kingdoms and literature', 'Tirukkural and megaliths', 'Women in society'], 'Route map of Part 1: the three kingdoms and Sangam literature, the Tirukkural and megaliths as sources, and the position of women', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Landscapes and crops', 'Irrigation', 'Internal trade', 'Ports and the Roman world'], 'Route map of Part 2: the five landscapes and crops, irrigation, internal trade, and ports and links with the Roman world', 'Part 2 at a glance');
const vTime = timelineFigure('Two boxes on a time arrow drawn roughly to scale: the Sangam Age from about 300 BCE to 300 CE, and a dashed box for the Tirukkural, whose date is debated and often placed from about 100 BCE to 500 CE; dates are approximate and vary between books', 'The Sangam Age and the debated date of the Tirukkural (approximate).');
const vKingdoms = table(['Ruling family', 'Region and port', 'Linked with'], [
  ['Cheras', 'West coast; port of Muziris', 'Pepper and spices'],
  ['Cholas', 'Kaveri region; port of Puhar', 'Fertile farmland'],
  ['Pandyas', 'Madurai area; port of Korkai', 'Pearls; the Sangams (tradition)'],
], 'Table of the three ruling families: the Cheras on the west coast with the port of Muziris and pepper, the Cholas in the Kaveri region with the port of Puhar and fertile farmland, and the Pandyas in the Madurai area with the port of Korkai, pearls and the tradition of the Sangams');
const vSangam = flow('LR', ['Tradition: three Sangams of poets', 'Held at Madurai under Pandya patronage', 'A tradition, not a proved fact'], 'Flow: tradition speaks of three Sangams of poets, held at Madurai under Pandya patronage; this is tradition and not a fully proved fact', 'The three Sangams: tradition.');
const vLit = table(['Work', 'What it is'], [
  ['Tolkappiyam', 'A work on grammar'],
  ['Ettuthogai', 'The Eight Anthologies'],
  ['Pattuppattu', 'The Ten Idylls'],
  ['Silappatikaram and Manimekalai', 'Later epics, usually placed just after the Sangam period'],
], 'Table of Sangam literature: the Tolkappiyam on grammar, the Ettuthogai or Eight Anthologies, the Pattuppattu or Ten Idylls, and the later epics Silappatikaram and Manimekalai usually placed just after the Sangam period');
const vLitTells = flow('LR', ['Poems and other works', 'Kings, war, trade, landscapes, daily life', 'Read with care, with other evidence'], 'Flow: the poems and other works tell us about kings, war, trade, landscapes and daily life, and are read with care and with other evidence', 'What the literature tells us.');
const vKural = table(['Point', 'Detail'], [
  ['Attributed to', 'Thiruvalluvar'],
  ['Size', '1,330 couplets (kurals) in 133 chapters of ten'],
  ['Date', 'Debated; often placed about 1st century BCE to 5th century CE'],
  ['Value', 'A guide to ethics and conduct'],
], 'Table of facts on the Tirukkural: attributed to Thiruvalluvar, 1,330 couplets in 133 chapters of ten, date debated and often placed about the 1st century BCE to the 5th century CE, valued as a guide to ethics and conduct');
const vKuralParts = flow('LR', ['Aram: virtue', 'Porul: wealth and polity', 'Inbam: love'], 'Flow of the three parts of the Tirukkural: aram or virtue, porul or wealth and polity, and inbam or love', 'The three parts of the Tirukkural.');
const vUse = table(['Question a historian asks', 'Best source'], [
  ['What did people think about conduct and virtue?', 'The Tirukkural'],
  ['How was Tamil grammar described?', 'The Tolkappiyam'],
  ['What were ports, kings and landscapes like?', 'The anthologies and idylls, with other evidence'],
  ['How were the dead buried and with what goods?', 'Megalithic burials'],
], 'Table matching four historian questions with sources: conduct and virtue in the Tirukkural, grammar in the Tolkappiyam, ports kings and landscapes in the anthologies and idylls with other evidence, and burials in megalithic sites');
const vMegaTypes = table(['Kind of burial', 'What it is'], [
  ['Stone circle', 'A ring of large stones marking a burial'],
  ['Dolmen', 'A chamber of large stones with a capstone'],
  ['Cist', 'A box-like grave lined with stone slabs'],
  ['Urn burial', 'Remains in a large pottery urn; Adichanallur is a well-known site'],
], 'Table of megalithic burials: a stone circle is a ring of large stones, a dolmen a chamber of large stones with a capstone, a cist a box-like grave lined with slabs, and an urn burial holds remains in a large pottery urn, as at Adichanallur');
const vMegaGoods = table(['Grave goods', 'What they suggest'], [
  ['Iron tools and weapons', 'The use of iron'],
  ['Black-and-red pottery and ornaments', 'Goods placed for the dead: a belief in life after death'],
  ['Many goods in one grave, few in another', 'Differences in status'],
], 'Table of grave goods and what they suggest: iron tools and weapons suggest the use of iron, black-and-red pottery and ornaments suggest a belief in life after death, and many goods in one grave and few in another suggest differences in status');
const vAvvaiyar = flow('LR', ['The name Avvaiyar', 'Used by more than one poet across periods', 'Say which poet is meant'], 'Flow: the name Avvaiyar was used by more than one poet across periods, so a historian says which poet is meant', 'A name used by more than one poet.');
const vWomen = table(['Area', 'What the sources show'], [
  ['Poets', 'Avvaiyar, Nachchellaiyar, Kakkaipadiniyar'],
  ['Work', 'Farming, spinning, weaving, selling goods'],
  ['Education', 'Suggested by the women poets'],
  ['Hardships', 'The poems describe the difficult lives of widows'],
], 'Table on women in Sangam society: poets Avvaiyar, Nachchellaiyar and Kakkaipadiniyar, work in farming spinning weaving and selling goods, education suggested by the women poets, and the hardships of widows described in the poems');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three works named: Tolkappiyam, Ettuthogai, Pattuppattu'],
  ['(ii)', '3', 'Couplets and chapters; three parts; themes'],
  ['(iii)', '4', 'What the works tell us; one caution'],
], 'Table planning a ten-mark answer on Sangam literature: part (i) three works for 3 marks, part (ii) the structure of the Tirukkural for 3 marks, part (iii) what the works tell us and a caution for 4 marks');
const vCrops = table(['Crop', 'Note'], [
  ['Rice', 'The main crop; grown on marutam farmland'],
  ['Sugarcane and cotton', 'Cash crops; cotton cloth was exported'],
  ['Millets', 'Grown in drier areas'],
  ['Pepper, ginger, turmeric, cardamom', 'Spices; pepper was prized overseas'],
], 'Table of crops: rice the main crop on marutam farmland, sugarcane and cotton as cash crops with cotton cloth exported, millets in drier areas, and spices such as pepper ginger turmeric and cardamom with pepper prized overseas');
const vIrrig = flow('LR', ['Rivers and tanks store and carry water', 'Fields get water through channels', 'Rice grows; surplus for markets'], 'Flow: rivers and tanks store and carry water, fields get water through channels, and rice grows with a surplus for markets', 'How irrigation helped farming.');
const vKallanai = flow('LR', ['The Kaveri river', 'Kallanai (Grand Anicut), a stone dam', 'Traditionally attributed to Karikala, about the 2nd century CE'], 'Flow: the Kaveri river, the Kallanai or Grand Anicut stone dam, and its traditional attribution to the Chola king Karikala about the 2nd century CE', 'The Kallanai: a traditional attribution.');
const vMatch = table(['Imagined poem scene', 'Tinai', 'Reason'], [
  ['A poet describes fishers selling salt near the waves', 'Neytal', 'Coast'],
  ['A poet describes ripe rice fields beside a tank', 'Marutam', 'Fertile farmland'],
  ['A poet describes a cracked, hot plain', 'Palai', 'Dry land'],
], 'Table sorting three imagined poem scenes into tinai: fishers selling salt near the waves is neytal for coast, ripe rice fields beside a tank is marutam for fertile farmland, and a cracked hot plain is palai for dry land');
const vFarmEcon = flow('LR', ['Farmers grow rice and cotton', 'Surplus goes to markets', 'Some goods reach the ports', 'Overseas trade'], 'Flow: farmers grow rice and cotton, surplus goes to markets, some goods reach the ports, and overseas trade follows', 'From field to overseas trade.');
const vInternal = table(['Kind of trade', 'How it worked'], [
  ['Barter', 'Goods exchanged for goods, such as rice for cloth'],
  ['Markets', 'Towns and ports had markets where many goods were sold'],
  ['Overseas', 'Ships linked the ports with distant lands'],
], 'Table on kinds of trade: barter exchanges goods for goods such as rice for cloth, markets in towns and ports sold many goods, and overseas trade used ships to link the ports with distant lands');
const vMap = portsFigure('Schematic sketch of relative positions in South India, with no coastline or borders drawn, showing five places: Muziris of the Cheras on the west coast, Madurai inland, Korkai of the Pandyas near the southern tip, Puhar of the Cholas on the east coast and Arikamedu north of Puhar on the east coast; not to scale and positions approximate', 'Ports and Madurai (schematic).');
const vPorts = table(['Port', 'Kingdom', 'Known for'], [
  ['Puhar (Kaveripattinam)', 'Chola', 'A busy port at the mouth of the Kaveri'],
  ['Muziris', 'Chera', 'Pepper trade on the Kerala coast'],
  ['Korkai', 'Pandya', 'Pearls'],
  ['Arikamedu', 'Near Puducherry', 'Indo-Roman trading site, excavated in the 1940s'],
], 'Table of ports: Puhar of the Cholas at the mouth of the Kaveri, Muziris of the Cheras for pepper, Korkai of the Pandyas for pearls, and Arikamedu near Puducherry as an Indo-Roman trading site excavated in the 1940s');
const vTrade = tradeFigure('Two boxes joined by two arrows: South Indian ports send exports of pepper, other spices, pearls, ivory, fine cotton cloth and precious stones to the Roman world, West Asia and South-East Asia, and receive imports of Roman gold and silver coins, wine in amphorae, glass and metals', 'Overseas trade: exports and imports.');
const vEvidence = table(['Evidence', 'What it suggests'], [
  ['Hoards of Roman gold and silver coins in South India', 'Trade with the Roman world'],
  ['Wine jars (amphorae) and glass at Arikamedu', 'Goods arriving from abroad'],
  ['The Periplus of the Erythraean Sea (1st century CE)', 'A Greek guide for sailors that names some ports'],
  ['The word Yavanas in the poems', 'Greek, Roman and West Asian traders were known'],
], 'Table of evidence: hoards of Roman coins suggest trade with the Roman world, amphorae and glass at Arikamedu show goods arriving from abroad, the Periplus of the Erythraean Sea is a Greek guide for sailors that names some ports, and the word Yavanas in the poems shows that foreign traders were known');
const vMonsoon = flow('LR', ['Seasonal monsoon winds', 'Ships cross the sea in season', 'Ports load and unload goods'], 'Flow: seasonal monsoon winds let ships cross the sea in season, and ports load and unload goods', 'Monsoon winds and ports.');
const vLedger = table(['Ledger entry (imagined)', 'Exports or imports?', 'Reason'], [
  ['Ten sacks of pepper sold to a ship', 'Export', 'Leaves the region'],
  ['Twelve jars of wine received', 'Import', 'Arrives from abroad'],
  ['Rice traded for cloth, no coins', 'Neither: barter', 'Internal trade'],
], 'Table sorting three imagined ledger entries: pepper sold to a ship is an export, jars of wine received are an import, and rice traded for cloth with no coins is barter, which is internal trade');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three ports with kingdom or feature'],
  ['(ii)', '3', 'Exports and imports, with examples'],
  ['(iii)', '4', 'Internal and overseas trade; evidence of Roman links'],
], 'Table planning a ten-mark answer on trade: part (i) three ports for 3 marks, part (ii) exports and imports for 3 marks, part (iii) internal and overseas trade with evidence for 4 marks');
const vWhy = table(['Effect of trade', 'Example'], [
  ['Wealth for ports and producers', 'Pepper and pearls sold overseas'],
  ['Growth of port towns and markets', 'Puhar and Muziris'],
  ['Contact with other cultures', 'Yavana traders at the ports'],
], 'Table of the effects of trade: wealth for ports and producers from pepper and pearls, growth of port towns and markets such as Puhar and Muziris, and contact with other cultures through Yavana traders');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Sangam Age — Part 1: Kingdoms, Sources and Women',
  goals: [
    'Name the three ruling families and describe the tradition of the Sangams as a tradition',
    'Explain what Sangam literature and the Tirukkural tell us, without quoting any poem',
    'Explain what megalithic burials and their grave goods suggest about early South Indian society',
    'Describe the position of women in Sangam society, including women poets',
  ],
  slides: [
    sl('title', 'The Sangam Age: kingdoms, sources and women', {
      b: 'Part 1 — who ruled, how we know about the age, and how women appear in the sources.',
      v: vRoute1,
      n: 'In this part we meet the three ruling families of the Sangam Age and learn how we know about them. We look at Sangam literature, the Tirukkural and megalithic burials, and then at the position of women. We always say about with dates, and we never quote any poem.',
    }),
    sl('diagram', 'The age on a timeline', {
      b: 'The Sangam Age is placed about the **3rd century BCE to the 3rd century CE**; books vary.',
      v: vTime,
      n: 'The Sangam Age is usually placed from about the third century before the common era to about the third century of the common era. Books vary, so always say about. The date of the Tirukkural is debated. It is often placed somewhere between about the first century before the common era and the fifth century of the common era.',
    }),
    sl('diagram', 'Three ruling families', {
      v: vKingdoms,
      n: 'Three ruling families are named in the sources. The Cheras were linked with the west coast and the port of Muziris. The Cholas were linked with the Kaveri region and the port of Puhar. The Pandyas were linked with the Madurai area and the port of Korkai, which was known for pearls.',
    }),
    sl('concept', 'The three Sangams: a tradition', {
      bl: [
        'Tradition speaks of **three Sangams**, assemblies of **poets**.',
        'They are said to have met at **Madurai** under **Pandya patronage**.',
        'Treat this as **tradition**, not as established fact.',
      ],
      v: vSangam,
      n: 'Tradition speaks of three Sangams, which were assemblies of poets. They are said to have met at Madurai under the patronage of the Pandya kings. In an exam we present this as tradition. The details are not fully proved, and we do not state them as established fact.',
    }),
    sl('check', 'Quick check: three families', {
      b: 'Which list names the three ruling families of the Sangam Age?',
      chk: 'm_three_kingdoms',
      n: 'Think about the table you have just seen. Which three families ruled in the Tamil region?',
    }),
    sl('diagram', 'Sangam literature', {
      b: 'The works tell us about **kings, war, trade, landscapes and daily life**.',
      v: vLit,
      n: 'Sangam literature includes the Tolkappiyam, a work on grammar. It also includes the Ettuthogai, the Eight Anthologies, and the Pattuppattu, the Ten Idylls. Two later epics, the Silappatikaram and the Manimekalai, are usually placed just after the Sangam period. We only name them here.',
    }),
    sl('concept', 'What the literature tells us', {
      bl: [
        'It tells us about **kings and war**, **trade**, **landscapes** and **daily life**.',
        'Poets often **praised their patrons**: read with care.',
        'Compare with **other evidence**, such as excavations.',
      ],
      v: vLitTells,
      n: 'The poems and other works tell us about kings and war, about trade, about the landscapes of the region and about daily life. But poets often praised the people who supported them. A historian therefore reads such works with care and compares them with other evidence, such as the results of excavations.',
    }),
    sl('check', 'Quick check: match the works', {
      b: 'Match each work with what it is.',
      chk: 'mt_literature',
      n: 'Look back at the table of Sangam literature. Match each work with its kind.',
    }),
    sl('diagram', 'The Tirukkural: key facts', {
      b: 'We describe its structure and themes only; we **never quote** a couplet.',
      v: vKural,
      n: 'The Tirukkural is attributed to Thiruvalluvar. It has one thousand three hundred and thirty couplets, called kurals, arranged in one hundred and thirty three chapters of ten. Its date is debated, and it is valued as a guide to ethics and conduct. In exams we describe its themes and never quote its lines.',
    }),
    sl('concept', 'Three parts, three themes', {
      bl: [
        '**Aram:** virtue.',
        '**Porul:** wealth and polity (government).',
        '**Inbam:** love.',
      ],
      v: vKuralParts,
      n: 'The Tirukkural has three parts. Aram deals with virtue. Porul deals with wealth and polity, which means government and the management of wealth. Inbam deals with love. Together they give a guide to right conduct in personal life, public life and family life.',
    }),
    sl('check', 'Quick check: parts in order', {
      b: 'Arrange the three parts of the Tirukkural in the usual order.',
      chk: 'ord_kural_parts',
      n: 'Start with virtue, then wealth and polity, and finish with love.',
    }),
    sl('example', 'Worked example 1: choosing the right source', {
      b: 'Ask what you want to know, then pick the source that fits.',
      bl: [
        'Step 1 — Read the question the historian is asking.',
        'Step 2 — Decide: conduct, grammar, kings and trade, or burials?',
        'Step 3 — Match it with a work or a burial site.',
        'Step 4 — Add one more kind of evidence and note its limits.',
      ],
      v: vUse,
      n: 'Here is a simple method. Read the question and decide whether it is about conduct, grammar, kings and trade, or burials. Then match it with a source. Questions on conduct go to the Tirukkural. Grammar goes to the Tolkappiyam. Burials go to megalithic sites. Always add one more kind of evidence and note its limits.',
    }),
    sl('diagram', 'Megaliths: burials marked with big stones', {
      v: vMegaTypes,
      n: 'Megaliths are burials marked with large stones. A stone circle is a ring of stones. A dolmen is a chamber of large stones with a capstone. A cist is a box shaped grave lined with slabs. In an urn burial the remains are placed in a large pottery urn. Adichanallur in Tamil Nadu is a well known urn burial site.',
    }),
    sl('concept', 'What the grave goods suggest', {
      bl: [
        '**Iron** tools and weapons **suggest** the use of iron.',
        'Black-and-red pottery and ornaments **suggest** a belief in life after death.',
        'Unequal goods **suggest** differences in status.',
      ],
      v: vMegaGoods,
      n: 'Burials contain goods such as iron tools and weapons, black and red pottery and ornaments. Iron tools suggest that the community used iron. Goods placed with the dead suggest a belief in life after death. Many goods in one grave and few in another suggest differences in status. We say suggest, because burials give only part of the picture.',
    }),
    sl('check', 'Quick check: a ring of stones', {
      b: 'What is a ring of large stones that marks a burial called?',
      chk: 'm_megalith_type',
      n: 'Think about the table of megalithic burials. Which kind is a ring of large stones?',
    }),
    sl('concept', 'Women poets', {
      bl: [
        'Women poets contributed to Sangam literature.',
        '**Avvaiyar** is the best known; **Nachchellaiyar** and **Kakkaipadiniyar** are others.',
        'A name shared by **more than one poet** in different periods: **Avvaiyar**.',
      ],
      v: vAvvaiyar,
      n: 'Women poets contributed to Sangam literature. Avvaiyar is the best known. Nachchellaiyar and Kakkaipadiniyar are other names. The name Avvaiyar was used by more than one poet across different periods, so a careful historian says which poet is meant. The presence of women poets suggests that some women were educated.',
    }),
    sl('diagram', 'Women in society', {
      b: 'The sources show a **mixed picture** of the lives of women.',
      v: vWomen,
      n: 'Besides poetry, women took part in farming, spinning and weaving, and selling goods. The poems also describe the hardships faced by widows, so the picture is a mixed one. The sources are poems written by particular poets, so they show part of the picture and must be read with care.',
    }),
    sl('check', 'Quick check: women poets', {
      b: 'True or false: women poets such as Avvaiyar contributed to Sangam literature.',
      chk: 'tf_women_poets',
      n: 'Recall the names of women poets from the previous slides.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Name three works of Sangam literature. [3] (ii) Describe the Tirukkural. [3] (iii) What do they tell us? One caution. [4]',
      bl: [
        '(i) Three works named in one line each.',
        '(ii) Couplets and chapters, then three parts.',
        '(iii) What they tell us, then one caution.',
        'Aim for one point per mark.',
      ],
      v: vPlan1,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second and four to the last. Part one names three works. Part two gives the structure of the Tirukkural and its three parts. Part three says what the works tell us and ends with one caution.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Ruling families: **Cheras, Cholas, Pandyas**; the three **Sangams** are a **tradition**.',
        'Literature: **Tolkappiyam**, **Ettuthogai**, **Pattuppattu**; later epics named only.',
        '**Tirukkural:** 1,330 couplets, **aram, porul, inbam**; date debated.',
        '**Megaliths** suggest iron use, belief and status; **women** as poets and workers.',
      ],
      v: vTime,
      n: 'To sum up. The Cheras, Cholas and Pandyas ruled. The three Sangams are a tradition. Sangam literature and the Tirukkural tell us about kings, trade, landscapes and conduct, but we read them with care. Megalithic burials suggest the use of iron, a belief in life after death and differences in status. Women appear as poets and workers.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Say **about** with every date; books differ.',
        'Present the three Sangams as **tradition**.',
        '**Never quote** a poem or a couplet; describe themes.',
        'Use **suggests** for what burials show.',
        'Mention that **Avvaiyar** was a name used by more than one poet.',
      ],
      n: 'Some exam habits. Add the word about to every date. Present the three Sangams as a tradition. Never quote a poem or a couplet, but describe its themes. Use the word suggests for what burials show. And remember that Avvaiyar was a name used by more than one poet.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Sangam Age — Part 2: Agriculture, Trade and the Roman World',
  goals: [
    'Name the five tinai and the main crops, and explain irrigation including the Kallanai',
    'Explain internal trade and overseas trade',
    'Name the main ports, exports and imports',
    'Give evidence of links with the Roman world',
  ],
  slides: [
    sl('title', 'Agriculture, trade and the Roman world', {
      b: 'Part 2 — how people earned a living, from the field to the port.',
      v: vRoute2,
      n: 'In this part we study the economy. We start with the five landscapes of the poems and the crops grown on them. Then we see how fields were watered. After that we study markets, ports and the overseas trade that linked the region with the Roman world.',
    }),
    sl('diagram', 'The five tinai', {
      b: 'The poems describe five **landscapes**; **marutam** was the fertile farmland.',
      v: tinaiFigure('Five boxes: kurinji for hills, mullai for forest and pasture, marutam for farmland, neytal for the coast, and palai for dry land', 'The five tinai.'),
      n: 'The poems describe five landscapes called tinai. Kurinji is the hills. Mullai is forest and pasture. Marutam is farmland, and it was the most fertile. Neytal is the coast. Palai is dry land that is hard to farm. The five are a way the poems describe places, and real places often mix them.',
    }),
    sl('diagram', 'Crops of the Sangam Age', {
      v: vCrops,
      n: 'Rice was the main crop. Sugarcane and cotton were also grown, and cotton cloth was a valued product. Millets grew in drier areas. Spices such as pepper, ginger, turmeric and cardamom were grown too, and pepper was especially prized overseas. Together these crops fed people and supplied the markets.',
    }),
    sl('check', 'Quick check: fertile farmland', {
      b: 'Which tinai stood for fertile farmland?',
      chk: 'm_tinai_marutam',
      n: 'Look back at the five landscapes. Which one is farmland?',
    }),
    sl('concept', 'Irrigation: tanks and rivers', {
      bl: [
        'Fields were watered from **tanks** and **rivers**.',
        'Channels carried water to the **rice** fields.',
        'A **surplus** of food could go to markets.',
      ],
      v: vIrrig,
      n: 'Farmers watered their fields from tanks and rivers. Tanks stored water, and channels carried it to the fields. With dependable water, rice grew well, and farmers had a surplus that could go to the markets. Without irrigation, such a surplus would have been much smaller.',
    }),
    sl('diagram', 'The Kallanai', {
      b: 'We word it carefully: **traditionally attributed**, about the **2nd century CE**.',
      v: vKallanai,
      n: 'The Kallanai, also called the Grand Anicut, is a stone dam on the Kaveri river. It is traditionally attributed to the Chola king Karikala, and it is dated about the second century of the common era. We say traditionally attributed because the attribution rests on tradition.',
    }),
    sl('check', 'Quick check: match the landscapes', {
      b: 'Match each tinai with its landscape.',
      chk: 'mt_tinai',
      n: 'Match the five names with hills, forest and pasture, farmland, coast and dry land.',
    }),
    sl('example', 'Worked example 3: sorting poem scenes', {
      b: 'Match each imagined poem scene to a tinai, then give the reason.',
      bl: [
        'Step 1 — Read what the scene shows: water, crops, sand, hills.',
        'Step 2 — Link it with the landscape.',
        'Step 3 — Choose the tinai.',
        'Step 4 — Write the reason in one line.',
      ],
      v: vMatch,
      n: 'Use four steps. Read what the scene shows. Link it with a landscape. Choose the tinai. Then write the reason in one line. Fishers selling salt near the waves belong to neytal, the coast. Ripe rice fields beside a tank belong to marutam, farmland. A cracked hot plain belongs to palai, dry land.',
    }),
    sl('diagram', 'From field to overseas trade', {
      v: vFarmEcon,
      n: 'Farming was linked with trade. Farmers grew rice and cotton. A surplus went to the markets. Some goods, especially cotton cloth and spices, reached the ports. From the ports they went overseas. In this way the field, the market and the port were linked in one economy.',
    }),
    sl('concept', 'Internal trade', {
      bl: [
        '**Barter:** goods exchanged for goods.',
        '**Markets** in towns and ports.',
        'Goods moved between **landscapes**.',
      ],
      v: vInternal,
      n: 'Internal trade was carried on by barter and in markets. In barter, goods were exchanged for goods, as when rice was traded for cloth. Markets in towns and ports sold many goods. People of different landscapes met in the markets, so farmers, fishers and herders could all get what they needed.',
    }),
    sl('diagram', 'Ports on a schematic map', {
      b: 'Schematic, not to scale; positions are approximate.',
      v: vMap,
      n: 'Here is a schematic map. Muziris, the Chera port, lies on the west coast. Korkai, the Pandya port, lies near the southern tip. Puhar, the Chola port, is on the east coast, and Arikamedu lies near Puducherry on the same coast. Madurai is inland. The map is not to scale, and positions are approximate.',
    }),
    sl('diagram', 'The main ports', {
      v: vPorts,
      n: 'Puhar, also called Kaveripattinam, was a busy Chola port at the mouth of the Kaveri. Muziris was a Chera port on the Kerala coast and was well known for pepper. Korkai was a Pandya port known for pearls. Arikamedu, near Puducherry, was an Indo Roman trading site, excavated in the nineteen forties.',
    }),
    sl('check', 'Quick check: a Chera port', {
      b: 'Which Chera port on the Kerala coast was linked with pepper?',
      chk: 'm_port_muziris',
      n: 'Think about the table of ports. Which one belonged to the Cheras?',
    }),
    sl('diagram', 'Exports and imports', {
      b: 'Ships carried goods between the ports and **Roman, West Asian and South-East Asian** markets.',
      v: vTrade,
      n: 'Overseas trade went in two directions. The exports were pepper and other spices, pearls, ivory, fine cotton cloth and precious stones. The imports were Roman gold and silver coins, wine in large jars called amphorae, glass and metals. The trade linked the region with the Roman world, South East Asia and West Asia.',
    }),
    sl('concept', 'Evidence of links with the Roman world', {
      bl: [
        'Hoards of **Roman coins** found in South India.',
        '**Amphorae** and **glass** at sites such as **Arikamedu**.',
        'A 1st-century CE Greek guide for sailors, the **Periplus**, names some ports.',
        '**Yavanas:** the poems use this word for Greek, Roman and West Asian traders.',
      ],
      v: vEvidence,
      n: 'Several kinds of evidence show links with the Roman world. Hoards of Roman gold and silver coins have been found in South India. Wine jars and glass have been found at Arikamedu. A Greek guide for sailors from the first century of the common era, the Periplus of the Erythraean Sea, names some ports. The poems use the word Yavanas for foreign traders.',
    }),
    sl('diagram', 'Monsoon winds and ports', {
      v: vMonsoon,
      n: 'Sailors learned to use the seasonal monsoon winds. The winds helped ships cross the sea in season. Ports gave ships a place to load and unload goods. Without the winds and the ports, regular overseas trade would have been much harder.',
    }),
    sl('check', 'Quick check: Roman coins', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_roman_coins',
      n: 'Check each statement on its own first. Then ask whether the reason explains the assertion.',
    }),
    sl('example', 'Worked example 4: reading a ledger and planning', {
      b: 'Sort each imagined ledger entry, then plan a 3 + 3 + 4 answer on trade.',
      bl: [
        'Step 1 — Ask: does the good leave or arrive?',
        'Step 2 — Leaves: export. Arrives: import.',
        'Step 3 — No coins and goods swapped: barter.',
        'Step 4 — Plan: ports 3, goods 3, importance and evidence 4.',
      ],
      v: vLedger,
      n: 'To read a ledger, ask whether the good leaves the region or arrives. A good that leaves is an export. A good that arrives is an import. Goods swapped for goods with no coins are barter, which is internal trade. For a ten mark answer, give three marks to ports, three to goods and four to importance and evidence.',
    }),
    sl('check', 'Quick check: a pepper sack travels', {
      b: 'Arrange the steps of a sack of pepper that travels overseas.',
      chk: 'ord_pepper_route',
      n: 'Start in the hills and end with a sale to traders abroad.',
    }),
    sl('diagram', 'Why trade mattered', {
      v: vWhy,
      n: 'Trade mattered in three ways. It brought wealth to ports and to the people who produced pepper, pearls and cloth. It helped port towns and markets to grow. It also brought contact with other cultures through the Yavana traders who came to the ports.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Five **tinai**; **marutam** was fertile farmland; **rice** was the main crop.',
        '**Tanks and rivers**; **Kallanai** traditionally attributed to **Karikala**.',
        '**Ports:** Puhar, Muziris, Korkai, Arikamedu.',
        '**Exports** and **imports**; evidence: **Roman coins**, **amphorae**, the **Periplus**.',
      ],
      v: vTrade,
      n: 'To sum up. The poems describe five landscapes, and marutam was the fertile farmland where rice was the main crop. Fields were watered from tanks and rivers. Ports such as Puhar and Muziris linked the region with the Roman world. Exports included pepper and pearls, and imports included coins and wine. Hoards of Roman coins and the site at Arikamedu give evidence.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Say **traditionally attributed** and **about the 2nd century CE** for the Kallanai.',
        'Name **port, kingdom and goods** together.',
        'Keep **exports** and **imports** separate.',
        'Give **evidence** for Roman trade: coins, amphorae, Arikamedu, the Periplus.',
        '**Never quote** the Periplus or any poem.',
      ],
      n: 'Some exam habits. Say traditionally attributed and about the second century of the common era for the Kallanai. Name the port, the kingdom and the goods together. Keep exports and imports separate. Give evidence for Roman trade, such as coins, amphorae and Arikamedu. And never quote the Periplus or any poem.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Sangam Age — notes',
  sections: [
    {
      h: '1. The age and the three kingdoms',
      t: 1,
      b: '- The **Sangam Age** is placed about the **3rd century BCE to the 3rd century CE**; books vary, so say **about**.\n- Three ruling families: the **Cheras** (west coast; **Muziris**), the **Cholas** (Kaveri region; **Puhar**) and the **Pandyas** (Madurai area; **Korkai**).\n- **Tradition** speaks of **three Sangams**, assemblies of poets at **Madurai** under **Pandya patronage**. Present this as tradition, not established fact.',
      terms: [['Sangam', 'An assembly of poets, in tradition; also the name of the age.'], ['Patronage', 'Support given by a ruler or a rich person to poets or artists.']],
      v: vTime,
      vs: [vKingdoms, vSangam],
    },
    {
      h: '2. Sangam literature and the Tirukkural',
      t: 1,
      b: '- **Tolkappiyam:** a work on grammar. **Ettuthogai:** the Eight Anthologies. **Pattuppattu:** the Ten Idylls.\n- The later epics **Silappatikaram** and **Manimekalai** are usually placed just after the Sangam period (named only).\n- The works tell us about **kings, war, trade, landscapes and daily life**; poets often praised patrons, so read with care.\n- **Tirukkural:** attributed to **Thiruvalluvar**; **1,330 couplets (kurals)** in **133 chapters** of ten; three parts: **aram** (virtue), **porul** (wealth and polity), **inbam** (love). Its date is debated, often placed about the 1st century BCE to the 5th century CE. It is valued as a guide to ethics and conduct.\n- Never quote a poem or a couplet; describe themes.',
      terms: [['Kural', 'A couplet; the Tirukkural is made of 1,330 of them.'], ['Anthology', 'A collection of poems by many poets.']],
      v: vLit,
      vs: [vLitTells, vKural, vKuralParts],
    },
    {
      h: '3. Megaliths',
      t: 1,
      b: '- **Megaliths** are burials marked with **large stones**: **stone circles**, **dolmens**, **cists** and **urn burials** (**Adichanallur** in Tamil Nadu is a well-known urn-burial site).\n- Grave goods include **iron tools and weapons**, **black-and-red pottery** and **ornaments**.\n- They **suggest** the use of iron, a belief in life after death, and differences in status shown by grave goods. Burials give only part of the picture, so read them with literature.',
      terms: [['Megalith', 'A large stone used to mark a burial.'], ['Grave goods', 'Objects placed in a grave with the dead.']],
      v: vMegaTypes,
      vs: [vMegaGoods, vUse],
    },
    {
      h: '4. Women in Sangam society',
      t: 2,
      b: '- **Women poets** contributed to Sangam literature: **Avvaiyar** (best known; the name was used by **more than one poet** across periods), **Nachchellaiyar**, **Kakkaipadiniyar**.\n- Women took part in **farming, spinning and weaving, and selling goods**.\n- The women poets **suggest** that some women were educated.\n- Widows, the poems show, led **hard lives**.',
      terms: [['Avvaiyar', 'A name used by more than one woman poet across periods.']],
      v: vWomen,
      vs: [vAvvaiyar],
    },
    {
      h: '5. Agriculture',
      t: 3,
      b: '- **Five tinai:** **kurinji** (hills), **mullai** (forest and pasture), **marutam** (farmland), **neytal** (coast), **palai** (dry land). **Marutam** was the fertile farmland.\n- **Crops:** **rice** (main), **sugarcane**, **cotton**, **millets**, and spices: **pepper**, ginger, turmeric, cardamom.\n- **Irrigation** from **tanks and rivers**. The **Kallanai (Grand Anicut)**, a dam across the **Kaveri**, is **traditionally attributed** to **Karikala**, a Chola king, and dated about the **2nd century CE**.',
      terms: [['Tinai', 'One of the five landscapes of the poems.'], ['Irrigation', 'Bringing water to fields by tanks, channels or rivers.']],
      v: tinaiFigure('Five boxes: kurinji for hills, mullai for forest and pasture, marutam for farmland, neytal for the coast, and palai for dry land', 'The five tinai.'),
      vs: [vCrops, vIrrig, vKallanai],
    },
    {
      h: '6. Trade, ports and the Roman world',
      t: 4,
      b: '- **Internal trade:** barter and markets. **Overseas trade:** with the **Roman world, South-East Asia and West Asia**.\n- **Ports:** **Puhar/Kaveripattinam** (Chola), **Muziris** (Chera, Kerala coast), **Korkai** (Pandya; pearls), **Arikamedu** near Puducherry (Indo-Roman site excavated in the 1940s).\n- **Exports:** pepper, other spices, pearls, ivory, fine cotton cloth, precious stones. **Imports:** Roman gold and silver coins, wine in amphorae, glass, metals.\n- **Yavanas:** Greeks, Romans and other West Asian traders. **Monsoon winds** helped sailing.\n- **Evidence:** hoards of Roman coins; Arikamedu; the **Periplus of the Erythraean Sea** (1st century CE Greek guide for sailors; named only).',
      terms: [['Barter', 'Exchange of goods for goods.'], ['Amphora', 'A tall jar used to carry wine or oil.'], ['Yavanas', 'The term for Greeks, Romans and other West Asian traders.']],
      v: vPorts,
      vs: [vMap, vTrade, vEvidence],
    },
  ],
  tips: '**Common mistakes**\n- Giving a date without the word about.\n- Stating the three Sangams as proved fact.\n- Quoting a poem, a kural or the Periplus.\n- Writing "the Kallanai was built by Karikala" without "traditionally attributed".\n- Mixing up exports and imports, or Puhar, Muziris and Korkai.\n- Writing that women of the Sangam Age had no part in learning or work.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a caution or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Dates of the Sangam Age', 'About **3rd century BCE to 3rd century CE** (books vary).', 'fact', 1],
  ['The three ruling families', 'The **Cheras, Cholas and Pandyas**.', 'fact', 1],
  ['The three Sangams', 'A **tradition** of assemblies of poets at **Madurai** under **Pandya patronage**; not established fact.', 'concept', 1],
  ['Tolkappiyam', 'A work on **grammar**.', 'definition', 1],
  ['Ettuthogai and Pattuppattu', 'The **Eight Anthologies** and the **Ten Idylls**.', 'definition', 1],
  ['Silappatikaram and Manimekalai', 'Later epics, usually placed **just after** the Sangam period (named only).', 'fact', 1],
  ['What Sangam literature tells us', '**Kings, war, trade, landscapes** and **daily life**; read with care.', 'concept', 1],
  ['Tirukkural: author', 'Attributed to **Thiruvalluvar**.', 'fact', 1],
  ['Tirukkural: size', '**1,330 couplets (kurals)** in **133 chapters** of ten.', 'fact', 1],
  ['Tirukkural: three parts', '**Aram** (virtue), **porul** (wealth and polity), **inbam** (love).', 'fact', 1],
  ['Tirukkural: date', '**Debated**; often placed about the 1st century BCE to the 5th century CE.', 'concept', 1],
  ['Why the Tirukkural is valued', 'As a **guide to ethics and conduct**.', 'concept', 1],
  ['Megalith', 'A burial marked with **large stones**.', 'definition', 1],
  ['Kinds of megalithic burial', '**Stone circles, dolmens, cists** and **urn burials**.', 'fact', 1],
  ['Adichanallur', 'A well-known **urn-burial** site in Tamil Nadu.', 'fact', 1],
  ['Grave goods in megaliths', '**Iron tools and weapons**, **black-and-red pottery**, **ornaments**.', 'fact', 1],
  ['What megaliths suggest', 'Use of **iron**, belief in **life after death**, differences in **status**.', 'concept', 1],
  ['Women poets', '**Avvaiyar**, **Nachchellaiyar**, **Kakkaipadiniyar**.', 'fact', 2],
  ['The name Avvaiyar', 'Used by **more than one poet** across periods.', 'concept', 2],
  ['Work done by women', '**Farming, spinning and weaving, selling goods**.', 'concept', 2],
  ['The five tinai', '**Kurinji** (hills), **mullai** (forest, pasture), **marutam** (farmland), **neytal** (coast), **palai** (dry land).', 'fact', 3],
  ['Main crop', '**Rice**; also sugarcane, cotton, millets and spices.', 'fact', 3],
  ['Irrigation', 'From **tanks and rivers**.', 'concept', 3],
  ['Kallanai (Grand Anicut)', 'On the **Kaveri**; **traditionally attributed** to **Karikala**, about the **2nd century CE**.', 'fact', 3],
  ['Internal trade', '**Barter** and **markets**.', 'concept', 4],
  ['Ports of the three kingdoms', '**Puhar** (Chola), **Muziris** (Chera), **Korkai** (Pandya, pearls).', 'fact', 4],
  ['Arikamedu', 'An **Indo-Roman trading site** near Puducherry, excavated in the **1940s**.', 'fact', 4],
  ['Exports', '**Pepper, other spices, pearls, ivory, fine cotton cloth, precious stones**.', 'fact', 4],
  ['Imports', '**Roman gold and silver coins, wine in amphorae, glass, metals**.', 'fact', 4],
  ['Yavanas', 'Greeks, Romans and other **West Asian traders**.', 'definition', 4],
  ['Evidence of Roman trade', '**Coin hoards**, **amphorae and glass**, the **Periplus** (1st century CE Greek guide for sailors).', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Sangam Age',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_kural_parts', 'm_women_work', 'm_tinai_scenario', 'm_imports', 'ar_women_work', 's_irrigation', 's3_internal_overseas'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_women', 'l_agriculture'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Sangam Age',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_kural_date', 'm_megalith_goods', 'm_avvaiyar_name', 'm_kallanai', 'm_arikamedu', 'm_coin_hoard', 'm_internal_trade', 'ar_monsoon', 's_three_sangams', 's_women_roles', 's_arikamedu', 's3_literature_tells', 's3_agriculture'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_sources', 'l_trade', 'l_megaliths'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-9-history-civics-ch09 only (the Tirukkural, Sangam literature and megaliths; women; agriculture; trade, ports and links with the Roman world)',
    originality: 'every ledger, museum label, excavation note and village note is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no poem, kural, inscription or passage quoted or translated',
    data: 'Sangam Age and Tirukkural date ranges asserted to be well-formed; all dates given as about or as a debated range',
    facts: 'Sangam Age about 3rd century BCE to 3rd century CE; Cheras, Cholas, Pandyas; three Sangams at Madurai as tradition; Tirukkural attributed to Thiruvalluvar, 1,330 couplets, 133 chapters, aram, porul, inbam, date debated; Tolkappiyam, Ettuthogai, Pattuppattu, Silappatikaram and Manimekalai (named only); megaliths and Adichanallur; Avvaiyar (name used by more than one poet), Nachchellaiyar, Kakkaipadiniyar; five tinai; crops; Kallanai traditionally attributed to Karikala about 2nd century CE; ports Puhar, Muziris, Korkai, Arikamedu (excavated 1940s); exports and imports; Yavanas; the Periplus (1st century CE, named only)',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
