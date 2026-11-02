// Build ICSE 9 History & Civics ch10 The Age of the Guptas. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch10/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch10', 'social-science');
const { rulersFigure, adminFigure, templeFigure, mapFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Sources: Fa-hien and the Prayag Prashasti', 'The Gupta kings in order', 'How the empire was governed'], 'Route map of Part 1: the sources, the Gupta kings in order, and the administration', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Nalanda, Aryabhatta and Sushruta', 'Kalidasa and the Deogarh temple', 'A golden age?'], 'Route map of Part 2: Nalanda, Aryabhatta and Sushruta; Kalidasa and the Deogarh temple; and the question of a golden age', 'Part 2 at a glance');
const vSources = table(['Source', 'What it is', 'What it helps us learn'], [
  ['Account of Fa-hien', 'Travel account of a Chinese Buddhist monk, about 399 to 412 CE', 'Society and government in the time of Chandragupta II, seen by a visitor'],
  ['Allahabad Pillar Inscription', 'Sanskrit eulogy by Harisena on an Ashokan pillar', 'The campaigns of Samudragupta and the rulers who submitted'],
], 'Table of two sources: the account of Fa-hien, a Chinese monk who visited about 399 to 412 CE, and the Allahabad Pillar Inscription, a Sanskrit eulogy by Harisena about Samudragupta');
const vFahien = table(['Point', 'About Fa-hien'], [
  ['Who', 'A Chinese Buddhist monk-pilgrim'],
  ['When', 'About 399 to 412 CE, in the reign of Chandragupta II'],
  ['Why', 'To collect Buddhist texts'],
  ['Caution', 'He does not name the king; he is an outsider'],
], 'Table about Fa-hien: a Chinese Buddhist monk-pilgrim who travelled about 399 to 412 CE in the reign of Chandragupta II to collect Buddhist texts, who does not name the king');
const vFahienSaw = table(['What the account is commonly taught to describe', 'What it suggests'], [
  ['A peaceful and prosperous land', 'Order and some wealth'],
  ['Mild punishments, mostly fines; freedom of movement', 'Light justice and safe roads'],
  ['Buddhist monasteries; charitable houses and free hospitals at Pataliputra', 'Religious support and care for the sick'],
  ['Chandalas lived apart and were treated as outcastes', 'Social exclusion existed alongside prosperity'],
], 'Table of what the account of Fa-hien is commonly taught to describe: a peaceful and prosperous land, mild punishments and freedom of movement, monasteries and hospitals, and Chandalas living apart as outcastes');
const vPrayag = table(['Point', 'Allahabad Pillar Inscription (Prayag Prashasti)'], [
  ['Author', 'Harisena, a court poet and official of Samudragupta'],
  ['Language', 'Sanskrit'],
  ['Where', 'Engraved on an earlier Ashokan pillar, now at Allahabad (Prayagraj)'],
  ['Records', 'Campaigns in the north and south; rulers who submitted'],
  ['Caution', 'A prashasti praises the king, so read with care'],
], 'Table about the Allahabad Pillar Inscription: composed in Sanskrit by Harisena, engraved on an earlier Ashokan pillar at Allahabad, recording the campaigns of Samudragupta and rulers who submitted, and a eulogy to be read with care');
const vMap = mapFigure('Schematic map with four places marked: Prayagraj with the Allahabad pillar, Pataliputra, Nalanda in Bihar and Deogarh in Uttar Pradesh, with western India, land of the Shakas, labelled to the west; not to scale and positions approximate', 'Some places linked with the Guptas (schematic, not to scale).');
const vCare = table(['Question a historian asks', 'Source to use', 'Caution to add'], [
  ['What did a visitor notice about roads and justice?', 'Account of Fa-hien', 'An outsider who does not name the king'],
  ['Which rulers is Samudragupta said to have defeated?', 'Allahabad Pillar Inscription', 'A eulogy; check with coins'],
  ['How large was the territory?', 'Coins and inscriptions together', 'No single source tells all'],
], 'Table matching three historian questions with sources and cautions: Fa-hien for roads and justice, the Allahabad Pillar Inscription for the rulers said to be defeated, and coins with inscriptions for territory');
const vRulers = rulersFigure('Five bars on a time line drawn roughly to scale: Chandragupta I about 320 to 335 CE, Samudragupta about 335 to 375 CE, Chandragupta II about 375 to 415 CE, Kumaragupta I about 415 to 455 CE and Skandagupta about 455 to 467 CE; dates approximate', 'The five Gupta rulers (approximate dates).');
const vEarly = flow('LR', ['Sri Gupta, founder in tradition', 'Ghatotkacha', 'Chandragupta I marries Kumaradevi, about 320 CE'], 'Flow: Sri Gupta, founder in tradition, then Ghatotkacha, then Chandragupta I who married the Lichchhavi princess Kumaradevi and whose reign begins the Gupta era about 319 to 320 CE', 'The early Guptas.');
const vTwo = table(['Ruler', 'Approximate reign', 'Commonly taught'], [
  ['Samudragupta', 'About 335 to 375 CE', 'Military leader; campaigns in the Allahabad Pillar Inscription; patron of music (veena coins)'],
  ['Chandragupta II Vikramaditya', 'About 375 or 380 to 415 CE', 'Defeated the Shakas of western India; nine gems linked by tradition'],
], 'Table of two rulers: Samudragupta, about 335 to 375 CE, a military leader and patron of music, and Chandragupta II Vikramaditya, about 375 or 380 to 415 CE, who defeated the Shakas');
const vLater = table(['Ruler', 'Approximate reign', 'Commonly taught'], [
  ['Kumaragupta I', 'About 415 to 455 CE', 'Nalanda traditionally linked with his reign'],
  ['Skandagupta', 'About 455 to 467 CE', 'Resisted the Huna invasions'],
], 'Table of two later rulers: Kumaragupta I, about 415 to 455 CE, linked with Nalanda by tradition, and Skandagupta, about 455 to 467 CE, who resisted the Huna invasions');
const vAdmin = adminFigure('Chart: the king at the top with the title Maharajadhiraja, ministers and high officers below him, then three boxes in a row for province under an uparika, district under a vishayapati and village under a gramika with elders, and a strip for town councils with guild representatives', 'Gupta administration (simplified).');
const vCentre = table(['Officer or body', 'Role (as commonly taught)'], [
  ['King', 'Grand titles such as Maharajadhiraja; assisted by ministers'],
  ['Kumaramatya', 'High officer'],
  ['Sandhivigrahika', 'Minister of peace and war'],
  ['Mahadandanayaka', 'Chief judicial or military officer'],
], 'Table of the central administration: the king with titles such as Maharajadhiraja, the kumaramatya as high officer, the sandhivigrahika as minister of peace and war, and the mahadandanayaka as chief judicial or military officer');
const vLocal = flow('LR', ['Province (bhukti) under an uparika', 'District (vishaya) under a vishayapati', 'Village under a gramika with elders'], 'Flow: province called a bhukti under an uparika, district called a vishaya under a vishayapati, and village under a gramika with elders', 'Levels below the centre.');
const vTownRev = table(['Feature', 'Gupta practice'], [
  ['Towns', 'Councils with representatives of guilds'],
  ['Land revenue', 'Commonly about one-sixth of the produce'],
  ['Compared with the Mauryas', 'More decentralised: more left to local bodies'],
], 'Table of town councils with guild representatives, land revenue about one-sixth of produce, and the comparison that Gupta administration was more decentralised than the Mauryan');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'King with titles; ministers; two named officers'],
  ['(ii)', '3', 'Bhukti and uparika; vishaya and vishayapati; gramika with elders'],
  ['(iii)', '4', 'Town councils; revenue about one-sixth; comparison with the Mauryas'],
], 'Table planning a ten-mark answer on administration: part (i) king and officers for 3 marks, part (ii) provinces, districts and villages for 3 marks, part (iii) town councils, revenue and comparison for 4 marks');
const vNalanda = table(['Point', 'Nalanda'], [
  ['What', 'Buddhist monastery-university (mahavihara)'],
  ['Where', 'Present-day Bihar'],
  ['Founded', 'About the 5th century CE; tradition links it with Kumaragupta I'],
  ['Learning', 'A library and many subjects, not only Buddhism'],
], 'Table about Nalanda: a Buddhist monastery-university in present-day Bihar, founded about the 5th century CE and linked by tradition with Kumaragupta I, with a library and many subjects');
const vNalandaLife = flow('LR', ['Students come from across Asia; Xuanzang studies there in the 7th century', 'Declines in the late 12th century', 'Ruins become a UNESCO World Heritage Site in 2016'], 'Flow: students come from across Asia and Xuanzang studies there in the 7th century, Nalanda declines in the late 12th century, and its ruins become a UNESCO World Heritage Site in 2016', 'From Nalanda\'s peak to today.');
const vAryabhata = table(['Point', 'Aryabhatta'], [
  ['Born', '476 CE'],
  ['Work', 'The Aryabhatiya, about 499 CE'],
  ['Fields', 'Astronomy and mathematics'],
  ['Honour', 'India\'s first satellite (1975) was named Aryabhata'],
], 'Table about Aryabhatta: born 476 CE, wrote the Aryabhatiya about 499 CE, in astronomy and mathematics, and India\'s first satellite in 1975 was named Aryabhata');
const vAryaIdeas = flow('LR', ['The earth rotates on its axis', 'Eclipses come from the shadows of the earth and the moon', 'A close value of pi, about 3.1416, and the place-value system'], 'Flow: the earth rotates on its axis, eclipses come from the shadows of the earth and the moon, and a close value of pi about 3.1416 with the place-value system', 'The ideas of Aryabhatta.');
const vSushruta = table(['Point', 'Sushruta Samhita'], [
  ['What', 'A classic text on medicine and surgery'],
  ['Contains', 'Many surgical instruments and procedures, including repair of the nose'],
  ['Stresses', 'Training and cleanliness'],
  ['Date', 'Debated: compiled and revised over centuries'],
], 'Table about the Sushruta Samhita: a classic text on medicine and surgery describing instruments and procedures including repair of the nose, stressing training and cleanliness, with a debated date');
const vDateRule = table(['Step', 'Example for the Sushruta Samhita'], [
  ['1. Ask who or what', 'A text, not a single reign'],
  ['2. Check the date', 'Debated; compiled and revised over centuries'],
  ['3. Say how it is used', 'Studied alongside the Gupta age'],
  ['4. Avoid the claim', 'Do not say he lived under one Gupta king'],
], 'Table of four steps for handling a text with a debated date, applied to the Sushruta Samhita: ask what it is, check the date, say how it is used and avoid claiming one reign');
const vKalidasa = table(['Kind', 'Works of Kalidasa'], [
  ['Plays', 'Abhijnanashakuntalam, Malavikagnimitram, Vikramorvashiyam'],
  ['Long poems', 'Raghuvamsha, Kumarasambhava'],
  ['Other poems', 'Meghaduta, Ritusamhara'],
  ['Link', 'Traditionally linked with the court of Chandragupta II'],
], 'Table of the works of Kalidasa: the plays Abhijnanashakuntalam, Malavikagnimitram and Vikramorvashiyam, the long poems Raghuvamsha and Kumarasambhava, and the poems Meghaduta and Ritusamhara');
const vThemes = table(['Work', 'Theme in brief'], [
  ['Abhijnanashakuntalam', 'A king and a young woman raised in a forest hermitage'],
  ['Meghaduta', 'A cloud asked to carry a message to a distant beloved'],
  ['Raghuvamsha', 'The story of a line of kings'],
], 'Table of themes in brief: Abhijnanashakuntalam about a king and a young woman raised in a forest hermitage, Meghaduta about a cloud carrying a message, and Raghuvamsha about a line of kings');
const vTemple = templeFigure('Schematic plan and side view of the Dashavatara temple at Deogarh: a raised platform called a jagati, a square sanctum, four small corner shrines in a panchayatana plan, and a tower called a shikhara of which only part survives; not to scale', 'Dashavatara temple, Deogarh (schematic, not to scale).');
const vPanels = table(['Panel', 'What it shows'], [
  ['Anantashayana', 'Vishnu resting on the serpent Sheshanaga'],
  ['Gajendra moksha', 'The story of the elephant Gajendra and his release'],
  ['Nara-Narayana', 'The pair of sages Nara and Narayana'],
], 'Table of three carved panels at Deogarh: Anantashayana with Vishnu on Sheshanaga, Gajendra moksha, and Nara-Narayana');
const vGolden = table(['View', 'Reason'], [
  ['Often called a golden age', 'Literature, science, art and architecture flourished'],
  ['Historians qualify the label', 'Prosperity and culture were mostly of the elite'],
  ['Also noted', 'Caste rules grew stricter; some groups were excluded'],
], 'Table on the golden age: often called a golden age for literature, science and art, but historians qualify the label because prosperity was mostly of the elite and caste rules grew stricter');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three achievements: Kalidasa, Aryabhatta, Deogarh'],
  ['(ii)', '3', 'Two points of exclusion: Chandalas apart; elite prosperity'],
  ['(iii)', '4', 'Partly fair; often called, historians qualify'],
], 'Table planning a ten-mark evaluation on the golden age: part (i) three achievements for 3 marks, part (ii) two points of exclusion for 3 marks, part (iii) a balanced judgement for 4 marks');
const vSummary2 = table(['Topic', 'Key points'], [
  ['Nalanda', 'Mahavihara in Bihar; library; students from Asia; declined late 12th century'],
  ['Aryabhatta, Sushruta', 'Earth rotates, eclipses, pi; medicine and surgery with a debated date'],
  ['Kalidasa, Deogarh', 'Plays and poems; platform, sanctum, shikhara, panels'],
], 'Summary table of Part 2: Nalanda, Aryabhatta and Sushruta, and Kalidasa and the Deogarh temple');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Age of the Guptas — Part 1: Sources, Kings and Administration',
  goals: [
    'Explain what Fa-hien\'s account tells us about society and administration',
    'Explain the importance of the Allahabad Pillar Inscription and why it is read with care',
    'List the major Gupta rulers in chronological order with approximate reigns',
    'Describe central, provincial and local administration under the Guptas',
  ],
  slides: [
    sl('title', 'The Age of the Guptas: sources, kings and administration', {
      b: 'Part 1 — how we know about the Guptas, who ruled, and how they governed.',
      v: vRoute1,
      n: 'In this part we learn how historians know about the Gupta age. We meet the Gupta rulers in order, and then see how the king, his officers, provinces, districts, villages and towns shared the work of government.',
    }),
    sl('diagram', 'Two main sources at a glance', {
      v: vSources,
      n: 'Two sources are named in the syllabus. The first is the account of Fa-hien, a Chinese Buddhist monk who visited India. The second is the Allahabad Pillar Inscription, a Sanskrit eulogy composed by Harisena about Samudragupta. Each tells us something different, and each needs care.',
    }),
    sl('concept', 'Fa-hien, the Chinese pilgrim', {
      bl: [
        'A **Chinese Buddhist monk-pilgrim**.',
        'Travelled in India about **399 to 412 CE**, in the reign of **Chandragupta II**.',
        'Came to **collect Buddhist texts**.',
        'He **does not name the king**; the link comes from the dates.',
      ],
      v: vFahien,
      n: 'Fa-hien was a Chinese Buddhist monk who travelled in India from about three hundred ninety nine to four hundred twelve of the common era. This was in the reign of Chandragupta the Second. He came to collect Buddhist texts. As commonly taught, he does not name the king, so historians link his visit with the king from the dates.',
    }),
    sl('diagram', 'What the account describes', {
      b: 'Always paraphrase; never copy the pilgrim\'s words.',
      v: vFahienSaw,
      n: 'As commonly taught, the account describes a peaceful and prosperous land. Punishments were mild, mostly fines, and people could travel freely. There were Buddhist monasteries, and charitable houses and free hospitals at Pataliputra. The account also notes that Chandalas lived apart and were treated as outcastes. So prosperity and exclusion appear together.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term with what it is.',
      chk: 'mt_sources',
      n: 'Look back at the two sources. Match each name or term with what it is. Remember who Harisena was, and what the word prashasti means.',
    }),
    sl('concept', 'The Allahabad Pillar Inscription', {
      bl: [
        'Composed in **Sanskrit** by **Harisena**, a court poet and official of **Samudragupta**.',
        'Engraved on an **earlier Ashokan pillar** now at Allahabad (Prayagraj).',
        'Records **campaigns in the north and south** and the **rulers who submitted**.',
        'A **prashasti** (eulogy): it praises the king, so **read with care**.',
      ],
      v: vPrayag,
      n: 'The Allahabad Pillar Inscription is also called the Prayag Prashasti. Harisena, a court poet and official of Samudragupta, composed it in Sanskrit. It was engraved on an earlier pillar of the age of Ashoka, now at Allahabad. It records the campaigns of Samudragupta and the rulers who submitted. Because it is a eulogy, it praises the king, so a historian reads it with care.',
    }),
    sl('diagram', 'Places linked with the Guptas', {
      b: 'Schematic map: positions are approximate.',
      v: vMap,
      n: 'This is a schematic map, not drawn to scale. It shows Prayagraj, where the pillar stands, Pataliputra, Nalanda in Bihar and Deogarh in Uttar Pradesh. Western India was the land of the Shakas, whom a later Gupta king defeated. Use the map to place the names, not to measure distances.',
    }),
    sl('example', 'Worked example 1: using a source with care', {
      b: 'Ask what you want to know, pick the source, then add the caution.',
      bl: [
        'Step 1 — Read the question the historian is asking.',
        'Step 2 — Choose the source that can answer it.',
        'Step 3 — Say what kind of source it is.',
        'Step 4 — Add one caution.',
      ],
      v: vCare,
      n: 'Here is a simple method. Read the question the historian is asking. Choose the source that can answer it. Say what kind of source it is, and add one caution. For roads and justice we use Fa-hien and note that he was an outsider. For the rulers said to be defeated we use the inscription and note that it is a eulogy. For the size of the territory we use coins together with inscriptions.',
    }),
    sl('check', 'Quick check: who composed it?', {
      b: 'Decide whether the statement about the Prayag Prashasti is true or false.',
      chk: 'tf_prashasti',
      n: 'Think about who wrote the inscription, in which language, and about which ruler.',
    }),
    sl('diagram', 'The five rulers in order', {
      v: vRulers,
      n: 'The major Gupta rulers were Chandragupta the First, Samudragupta, Chandragupta the Second, Kumaragupta the First and Skandagupta. The bars are drawn roughly to scale. Chandragupta the First ruled from about three hundred twenty of the common era, and Skandagupta until about four hundred sixty seven. Books differ a little, so always say about.',
    }),
    sl('concept', 'The early Guptas and Chandragupta I', {
      bl: [
        '**Sri Gupta** is the founder in **tradition**, followed by **Ghatotkacha**.',
        '**Chandragupta I**, about **320 to 335 CE**.',
        'The **Gupta era** begins about **319 to 320 CE**.',
        'His marriage to the **Lichchhavi** princess **Kumaradevi** strengthened his position.',
      ],
      v: vEarly,
      n: 'In tradition, Sri Gupta founded the line, and Ghatotkacha followed him. Chandragupta the First ruled from about three hundred twenty to three hundred thirty five of the common era. The Gupta era begins about three hundred nineteen or twenty. His marriage to Kumaradevi, a Lichchhavi princess, linked his house with an important ruling clan and strengthened his position.',
    }),
    sl('diagram', 'Samudragupta and Chandragupta II', {
      v: vTwo,
      n: 'Samudragupta ruled from about three hundred thirty five to three hundred seventy five. He was a military leader, and the inscription records his campaigns. He was also a patron of music, and some coins show him playing the veena. Chandragupta the Second, also called Vikramaditya, defeated the Shakas of western India. By tradition, the nine gems are linked with his court.',
    }),
    sl('diagram', 'Kumaragupta I and Skandagupta', {
      v: vLater,
      n: 'Kumaragupta the First ruled from about four hundred fifteen to four hundred fifty five, and Nalanda is traditionally linked with his reign. Skandagupta followed him, from about four hundred fifty five to four hundred sixty seven, and he resisted the Huna invasions. Remember the order of all five rulers.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange the Gupta rulers in chronological order.',
      chk: 'ord_kings',
      n: 'Begin with the ruler whose reign opens the Gupta era, and end with the one who resisted the Hunas.',
    }),
    sl('diagram', 'Chart of the administration', {
      b: 'The king stood at the top; officers and local bodies shared the work.',
      v: vAdmin,
      n: 'This chart shows the administration in simple form. The king, with the title Maharajadhiraja, stood at the top and was assisted by ministers and high officers. Below him were provinces, districts and villages, each with its own head. Towns had councils in which guilds were represented.',
    }),
    sl('concept', 'The centre: king and officers', {
      bl: [
        'Grand titles such as **Maharajadhiraja**.',
        '**Kumaramatya**: high officers.',
        '**Sandhivigrahika**: minister of peace and war.',
        '**Mahadandanayaka**: chief judicial or military officer.',
      ],
      v: vCentre,
      n: 'At the centre the king took grand titles such as Maharajadhiraja, and ministers assisted him. The kumaramatyas were high officers. The sandhivigrahika was the minister of peace and war. The mahadandanayaka was a chief judicial or military officer. Titles and duties vary a little between books.',
    }),
    sl('concept', 'Provinces, districts and villages', {
      bl: [
        '**Province** (**bhukti**) under an **uparika**.',
        '**District** (**vishaya**) under a **vishayapati**.',
        '**Village** headed by a **gramika** with **elders**.',
      ],
      v: vLocal,
      n: 'The empire was divided into provinces called bhuktis, each under an uparika. Provinces had districts called vishayas, each under a vishayapati. A village was headed by a gramika, who worked with the village elders. In this way orders and local decisions moved between the centre and the villages.',
    }),
    sl('concept', 'Towns, revenue and a comparison', {
      bl: [
        'Towns had **councils** with **guild representatives**.',
        'Land revenue commonly **about one-sixth** of the produce.',
        'More **decentralised** than the Mauryan system.',
      ],
      v: vTownRev,
      n: 'Towns had councils with representatives of the guilds. Land revenue was commonly about one sixth of the produce. When we compare with the Mauryan empire, Gupta administration was more decentralised, because village elders and town councils did much of the local work.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) The king and officers. [3] (ii) Provinces, districts, villages. [3] (iii) Towns, revenue, comparison. [4]',
      bl: [
        '(i) King with titles; ministers; two officers.',
        '(ii) Bhukti and uparika; vishaya and vishayapati; gramika.',
        '(iii) Town councils; one-sixth; more decentralised.',
        'Aim for one point per mark.',
      ],
      v: vPlan1,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second and four to the last. Part one covers the king and two named officers. Part two covers the province, the district and the village with their heads. Part three covers town councils, land revenue and the comparison with the Mauryas.',
    }),
    sl('check', 'Quick check: why decentralised?', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_admin',
      n: 'Check each statement on its own first. Then ask whether the reason really explains the assertion.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Sources: **Fa-hien** and the **Allahabad Pillar Inscription**.',
        'Rulers: **Chandragupta I**, **Samudragupta**, **Chandragupta II**, **Kumaragupta I**, **Skandagupta**.',
        'Centre: king, ministers, **kumaramatya**, **sandhivigrahika**.',
        '**Bhukti**, **vishaya**, village; town councils.',
      ],
      v: vAdmin,
      n: 'To sum up. Two sources help us, the account of Fa-hien and the Allahabad Pillar Inscription. The rulers in order are Chandragupta the First, Samudragupta, Chandragupta the Second, Kumaragupta the First and Skandagupta. The king and his officers ran the centre, while provinces, districts, villages and towns shared the local work.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Say **about** with every date; books differ.',
        'Give the **author** of each source with a **caution**.',
        'Write the Fa-hien details in **your own words**, and state the Chandalas point **neutrally**.',
        'Spell **sandhivigrahika**, **uparika** and **vishayapati** carefully.',
        'In a comparison, say **more decentralised**, and give a reason.',
      ],
      n: 'Some exam habits. Add the word about to every date. Give the author of each source and a caution. Write what Fa-hien noticed in your own words, and state the point about Chandalas plainly and neutrally. Spell the names of the officers with care. In a comparison with the Mauryas, say more decentralised and give a reason.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Age of the Guptas — Part 2: Education, Science and Culture',
  goals: [
    'Describe Nalanda as a centre of learning',
    'State the contributions of Aryabhatta and the Sushruta Samhita, with the date debate',
    'Name the works of Kalidasa and describe the Dashavatara temple at Deogarh',
    'Explain why the Gupta age is often called a golden age and why historians qualify the term',
  ],
  slides: [
    sl('title', 'Education, science and culture in the Gupta age', {
      b: 'Part 2 — a university, two scientists, a poet and a temple.',
      v: vRoute2,
      n: 'In this part we study Nalanda as a centre of learning, the work of Aryabhatta and the Sushruta Samhita, the plays and poems of Kalidasa, and the temple at Deogarh. We end by asking why the age is often called golden, and why historians add a word of care.',
    }),
    sl('concept', 'Nalanda: a great mahavihara', {
      bl: [
        'A **Buddhist monastery-university** in present-day **Bihar**.',
        'Founded about the **5th century CE**; tradition links it with **Kumaragupta I**.',
        'It had a **library** and taught **many subjects**, not only Buddhism.',
      ],
      v: vNalanda,
      n: 'Nalanda was a great Buddhist monastery university, called a mahavihara, in present day Bihar. It was founded about the fifth century of the common era, and tradition links it with Kumaragupta the First. It had a library and taught many subjects, not only the teachings of the Buddha.',
    }),
    sl('diagram', 'Nalanda: learners and legacy', {
      v: vNalandaLife,
      n: 'Nalanda attracted students from across Asia. The Chinese pilgrim Xuanzang studied there in the seventh century. Nalanda declined in the late twelfth century. Its ruins became a UNESCO World Heritage Site in the year two thousand sixteen.',
    }),
    sl('check', 'Quick check: only Buddhism?', {
      b: 'Decide whether the statement about Nalanda is true or false.',
      chk: 'tf_nalanda',
      n: 'Think about what Nalanda had, what it taught, and where its students came from.',
    }),
    sl('concept', 'Aryabhatta, the astronomer and mathematician', {
      bl: [
        'Born in **476 CE**; wrote the **Aryabhatiya** about **499 CE**.',
        'Worked in **astronomy** and **mathematics**.',
        'India\'s first satellite (**1975**) was named **Aryabhata**.',
      ],
      v: vAryabhata,
      n: 'Aryabhatta was born in four hundred seventy six of the common era. He wrote the Aryabhatiya in about four hundred ninety nine. He worked in astronomy and mathematics. India honoured him by naming its first satellite, launched in nineteen seventy five, Aryabhata. The syllabus spells his name Aryabhatta.',
    }),
    sl('diagram', 'The ideas of Aryabhatta', {
      v: vAryaIdeas,
      n: 'Aryabhatta stated that the earth rotates on its axis. He explained eclipses by the shadows of the earth and the moon. He also gave a close value of pi, about three point one four one six, and worked with the place value system. These ideas make him a great figure in the history of science.',
    }),
    sl('check', 'Quick check: name the book', {
      b: 'Fill in the blank.',
      chk: 'fb_aryabhatiya',
      n: 'Recall the name of the work of Aryabhatta and its approximate date.',
    }),
    sl('concept', 'The Sushruta Samhita', {
      bl: [
        'A classic text on **medicine and surgery**.',
        'Describes many **surgical instruments** and procedures, including **repair of the nose**.',
        'Stresses **training and cleanliness**.',
        'Its **date is debated**: compiled and revised over centuries.',
      ],
      v: vSushruta,
      n: 'The Sushruta Samhita is a classic text on medicine and surgery. It describes many surgical instruments and procedures, including repair of the nose, which is an early form of plastic surgery. It stresses training and cleanliness. Its date is debated, because the text was compiled and revised over centuries.',
    }),
    sl('example', 'Worked example 3: a text with a debated date', {
      b: 'Question: "Did Sushruta live under Chandragupta II?" Follow the steps.',
      bl: [
        'Step 1 — Ask what the source is: a text.',
        'Step 2 — Check the date: debated.',
        'Step 3 — Say how it is used: studied with the Gupta age.',
        'Step 4 — Avoid the claim of a single reign.',
      ],
      v: vDateRule,
      n: 'Use four steps. First ask what the source is. Here it is a text. Second, check its date, which is debated. Third, say how it is used. The syllabus studies it along with the Gupta age. Fourth, avoid the claim that Sushruta lived under one Gupta king.',
    }),
    sl('concept', 'Kalidasa, the poet and playwright', {
      bl: [
        'Greatest **Sanskrit** poet and playwright.',
        'By **tradition** linked with the court of **Chandragupta II**.',
        'Plays: **Abhijnanashakuntalam**, **Malavikagnimitram**, **Vikramorvashiyam**.',
        'Poems: **Raghuvamsha**, **Kumarasambhava**, **Meghaduta**, **Ritusamhara**.',
      ],
      v: vKalidasa,
      n: 'Kalidasa is the greatest Sanskrit poet and playwright. Tradition links him with the court of Chandragupta the Second. His plays are Abhijnanashakuntalam, Malavikagnimitram and Vikramorvashiyam. His long poems are Raghuvamsha and Kumarasambhava, and he also wrote Meghaduta and Ritusamhara.',
    }),
    sl('diagram', 'Themes, described in our own words', {
      b: 'Each work has its own **theme**.',
      v: vThemes,
      n: 'Abhijnanashakuntalam is about a king and a young woman raised in a forest hermitage. Meghaduta is about a cloud asked to carry a message to a distant beloved. Raghuvamsha tells of a line of kings. In answers, give the themes in your own words.',
    }),
    sl('diagram', 'The Dashavatara temple at Deogarh', {
      b: 'Schematic sketch: not an exact plan.',
      v: vTemple,
      n: 'The Dashavatara temple is at Deogarh in Lalitpur district of Uttar Pradesh. It is dedicated to Vishnu and dates from about the sixth century. It is one of the earliest stone temples of north India. It stands on a raised platform called the jagati, with a square sanctum, and a tower called the shikhara that survives only in part. It is often described as of the panchayatana type.',
    }),
    sl('concept', 'The carved panels', {
      bl: [
        '**Anantashayana**: Vishnu resting on the serpent **Sheshanaga**.',
        '**Gajendra moksha**: the elephant Gajendra\'s release.',
        '**Nara-Narayana**: the sages Nara and Narayana.',
      ],
      v: vPanels,
      n: 'The temple walls carry carved panels. One shows Vishnu resting on the serpent Sheshanaga, a scene called Anantashayana. Another shows the story of the elephant Gajendra and his release. A third shows the sages Nara and Narayana.',
    }),
    sl('check', 'Quick check: which scene?', {
      b: 'Which scene is described in the label?',
      chk: 'm_deogarh_panel',
      n: 'Think about the serpent, the god resting on it, and the name given to this scene.',
    }),
    sl('diagram', 'A golden age?', {
      b: 'The age is **often called** a golden age; historians **qualify** the label.',
      v: vGolden,
      n: 'The Gupta age is often called a golden age because literature, science, art and architecture flourished. Historians qualify the label. They note that prosperity and culture were mostly of the elite, that caste rules grew stricter, and that some groups, such as the Chandalas in the account of Fa-hien, were excluded.',
    }),
    sl('example', 'Worked example 4: planning a 10-mark evaluation', {
      b: 'Question: (i) Three achievements. [3] (ii) Two points of exclusion. [3] (iii) Evaluate. [4]',
      bl: [
        '(i) Kalidasa, Aryabhatta, Deogarh.',
        '(ii) Chandalas apart; prosperity mostly of the elite.',
        '(iii) Partly fair; often called, but qualified.',
        'Use neutral words: some historians, others.',
      ],
      v: vPlan2,
      n: 'Plan this answer in three parts. Part one gives three achievements, such as Kalidasa, Aryabhatta and the Deogarh temple. Part two gives two points of exclusion, such as the Chandalas living apart and the prosperity being mostly of the elite. Part three gives a balanced judgement, saying the age is often called golden but that historians qualify the term.',
    }),
    sl('check', 'Quick check: the work of Aryabhatta', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_aryabhata',
      n: 'Check each statement on its own first. Then ask whether the reason really explains the assertion.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**Nalanda**: mahavihara in Bihar; library; students from across Asia.',
        '**Aryabhatta**: earth rotates, eclipses, pi; **Sushruta Samhita**: surgery, debated date.',
        '**Kalidasa**: plays and poems.',
        '**Deogarh**: jagati, sanctum, shikhara, panels.',
      ],
      v: vSummary2,
      n: 'To sum up. Nalanda was a great centre of learning. Aryabhatta worked in astronomy and mathematics, and the Sushruta Samhita is a classic text on medicine with a debated date. Kalidasa wrote plays and poems, and the Deogarh temple shows early stone architecture. The age is often called golden, but historians qualify the label.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Give **dates** with **about**, except the fixed ones such as **476 CE**, **1975** and **2016**.',
        'Never claim Sushruta lived under **one Gupta king**; say the **date is debated**.',
        'Name the **works of Kalidasa** correctly; do **not** copy lines.',
        'Describe the temple: **jagati**, **sanctum**, **shikhara**, **panels**.',
        'For **golden age**, write **often called** and give both views.',
      ],
      n: 'Some exam habits. Give dates with the word about, except the fixed ones such as the birth year of Aryabhatta, the satellite and the world heritage listing. Never say that Sushruta lived under one Gupta king. Name the works of Kalidasa correctly, and do not copy lines. Describe the temple with the platform, sanctum, tower and panels. For the golden age, write often called, and give both views.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Age of the Guptas — notes',
  sections: [
    {
      h: '1. Sources: Fa-hien and the Allahabad Pillar Inscription',
      t: 1,
      b: '- **Fa-hien (Faxian):** a Chinese Buddhist monk-pilgrim who travelled in India about **399 to 412 CE**, in the reign of **Chandragupta II**, to collect Buddhist texts. As commonly taught, his account describes a peaceful and prosperous land, mild punishments (mostly fines), freedom of movement, Buddhist monasteries, and charitable houses and free hospitals at Pataliputra. He also notes that the **Chandalas** lived apart and were treated as outcastes. He does not name the king.\n- **Allahabad Pillar Inscription (Prayag Prashasti):** composed in **Sanskrit** by **Harisena**, a court poet and official of **Samudragupta**; engraved on an **earlier Ashokan pillar** now at Allahabad (Prayagraj). It records Samudragupta\'s campaigns in the north and south and the rulers who submitted. It is a **prashasti** (eulogy), so it praises the king and is read with care.',
      terms: [['Prashasti', 'A eulogy, a composition in praise of a king.'], ['Monk-pilgrim', 'A monk who travels to holy places and centres of learning.'], ['Chandalas', 'A group that, in the account, lived apart from others.']],
      v: vSources,
      vs: [vFahien, vPrayag],
    },
    {
      h: '2. Where things were',
      t: 1,
      b: '- **Prayagraj (Allahabad)** has the pillar with the inscription. **Pataliputra** is the capital of the age. **Nalanda** is in Bihar. **Deogarh** is in Lalitpur district, Uttar Pradesh.\n- Western India was the land of the **Shakas**.\n- The map is **schematic** and **not to scale**.',
      terms: [['Pataliputra', 'A major city of the Gupta age, in present-day Bihar.']],
      v: vMap,
      vs: [],
    },
    {
      h: '3. The Gupta kings in order',
      t: 2,
      b: '- **Sri Gupta** (founder in tradition) and **Ghatotkacha**.\n- **Chandragupta I** (about 320 to 335 CE): marriage with the Lichchhavi princess **Kumaradevi** strengthened his position. The **Gupta era** begins about 319 to 320 CE.\n- **Samudragupta** (about 335 to 375 CE): a military leader and a patron of music; coins show him playing the veena. (A modern historian, V. A. Smith, called him the "Napoleon of India", a comparison that is debated.)\n- **Chandragupta II Vikramaditya** (about 375 or 380 to 415 CE): defeated the **Shakas** of western India; by tradition the **nine gems (navaratnas)** are linked with his court.\n- **Kumaragupta I** (about 415 to 455 CE): Nalanda is traditionally linked with his reign.\n- **Skandagupta** (about 455 to 467 CE): resisted the **Huna** invasions.\n- Dates are approximate and books vary; say **about**.',
      terms: [['Lichchhavis', 'A ruling clan whose princess married Chandragupta I.'], ['Vikramaditya', 'A title of Chandragupta II.'], ['Navaratnas', 'The nine gems, a group of scholars and poets linked by tradition with a royal court.']],
      v: vRulers,
      vs: [vEarly, vTwo, vLater],
    },
    {
      h: '4. Gupta administration',
      t: 3,
      b: '- **Centre:** the king took grand titles such as **Maharajadhiraja** and was assisted by ministers. Officers as commonly taught: **kumaramatya** (high officers), **sandhivigrahika** (minister of peace and war), **mahadandanayaka** (chief judicial or military officer).\n- **Provinces (bhukti)** were under an **uparika**; **districts (vishaya)** under a **vishayapati**; a **village** was headed by a **gramika** with elders.\n- **Towns** had councils with **guild representatives**. Land revenue was commonly about **one-sixth** of the produce.\n- Gupta administration was **more decentralised** than the Mauryan.',
      terms: [['Bhukti', 'A province.'], ['Vishaya', 'A district.'], ['Gramika', 'The head of a village.'], ['Uparika', 'The head of a province.']],
      v: vAdmin,
      vs: [vCentre, vLocal, vTownRev],
    },
    {
      h: '5. Education and science: Nalanda, Aryabhatta and Sushruta',
      t: 4,
      b: '- **Nalanda:** a great Buddhist **mahavihara** (monastery-university) in present-day **Bihar**, founded about the 5th century CE. It drew students from across Asia, and Xuanzang studied there in the 7th century. It had a library and taught many subjects, not only Buddhism. It declined in the late 12th century, and its ruins became a **UNESCO World Heritage Site in 2016**.\n- **Aryabhatta (Aryabhata):** born **476 CE**; wrote the **Aryabhatiya** about **499 CE**. He stated that the earth rotates on its axis, explained eclipses by the shadows of the earth and the moon, gave a close value of **pi** (about 3.1416) and worked with the place-value system. India\'s first satellite (1975) was named after him.\n- **Sushruta Samhita:** a classic text on **medicine and surgery**; it describes many surgical instruments and procedures, including repair of the nose (an early form of plastic surgery), and stresses training and cleanliness. Its **date is debated**: the text was compiled and revised over centuries, and the syllabus studies it with the Gupta age.',
      terms: [['Mahavihara', 'A great Buddhist monastery that was also a centre of learning.'], ['Samhita', 'A collection, here a compiled text.'], ['Place-value system', 'Writing numbers so that the position of a digit gives its value.']],
      v: vNalanda,
      vs: [vNalandaLife, vAryabhata, vAryaIdeas, vSushruta],
    },
    {
      h: '6. Culture: Kalidasa, Deogarh and the golden age',
      t: 5,
      b: '- **Kalidasa:** the greatest Sanskrit poet and playwright, traditionally linked with Chandragupta II\'s court. Plays: **Abhijnanashakuntalam**, **Malavikagnimitram**, **Vikramorvashiyam**. Long poems: **Raghuvamsha**, **Kumarasambhava**. Also **Meghaduta** and **Ritusamhara**.\n- **Dashavatara temple, Deogarh:** in Lalitpur district, Uttar Pradesh, about the 6th century CE; dedicated to Vishnu; one of the earliest stone temples of north India. It stands on a raised platform (**jagati**) with a square sanctum and a **shikhara** that survives only in part; it is often described as of the **panchayatana** type. Carved panels include **Anantashayana** (Vishnu resting on Sheshanaga), **Gajendra moksha** and **Nara-Narayana**.\n- **Golden age:** the age is often called a golden age for literature, science and art, but historians qualify the label because the prosperity and culture were mostly of the elite and caste rules grew stricter.',
      terms: [['Jagati', 'The raised platform on which a temple stands.'], ['Shikhara', 'The tower above the sanctum of a temple.'], ['Sanctum', 'The inner chamber where the image is kept.']],
      v: vKalidasa,
      vs: [vThemes, vTemple, vPanels, vGolden],
    },
  ],
  tips: '**Common mistakes**\n- Giving a date without the word about.\n- Saying that Fa-hien named the king, or quoting him.\n- Treating the Allahabad Pillar Inscription as the complete truth; it is a eulogy.\n- Mixing up uparika (province) and vishayapati (district).\n- Writing that Sushruta lived under one Gupta king.\n- Listing the Aryabhatiya as a work of Kalidasa.\n- Saying the age was golden for everyone.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a link or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who was Fa-hien?', 'A **Chinese Buddhist monk-pilgrim** who travelled in India about 399 to 412 CE.', 'fact', 1],
  ['Why did Fa-hien come to India?', 'To **collect Buddhist texts**.', 'fact', 1],
  ['Which king did Fa-hien visit in time?', 'The reign of **Chandragupta II**; he **does not name the king**.', 'concept', 1],
  ['What does Fa-hien\'s account describe?', 'A peaceful, prosperous land; mild punishments (fines); freedom of movement; monasteries; hospitals.', 'concept', 1],
  ['Chandalas in the account', 'They **lived apart** and were treated as outcastes.', 'fact', 1],
  ['Allahabad Pillar Inscription', 'Also the **Prayag Prashasti**; Sanskrit eulogy on an earlier Ashokan pillar.', 'definition', 1],
  ['Who composed the Prayag Prashasti?', '**Harisena**, court poet and official of Samudragupta.', 'fact', 1],
  ['What is a prashasti?', 'A **eulogy**; it praises the king, so read with care.', 'definition', 1],
  ['Start of the Gupta era', 'About **319 to 320 CE**.', 'fact', 2],
  ['Chandragupta I', 'About **320 to 335 CE**; married the Lichchhavi princess **Kumaradevi**.', 'fact', 2],
  ['Samudragupta', 'About **335 to 375 CE**; military leader; patron of music (veena coins).', 'fact', 2],
  ['Chandragupta II Vikramaditya', 'About **375 or 380 to 415 CE**; defeated the **Shakas**.', 'fact', 2],
  ['The nine gems', 'The **navaratnas**, linked with Chandragupta II\'s court by **tradition**.', 'concept', 2],
  ['Kumaragupta I', 'About **415 to 455 CE**; **Nalanda** traditionally linked with his reign.', 'fact', 2],
  ['Skandagupta', 'About **455 to 467 CE**; resisted the **Huna** invasions.', 'fact', 2],
  ['Title of a Gupta king', '**Maharajadhiraja**; assisted by ministers.', 'definition', 3],
  ['Kumaramatya', 'A **high officer**.', 'definition', 3],
  ['Sandhivigrahika', 'Minister of **peace and war**.', 'definition', 3],
  ['Mahadandanayaka', 'Chief **judicial or military** officer.', 'definition', 3],
  ['Bhukti and uparika', 'A **province** and its head.', 'definition', 3],
  ['Vishaya and vishayapati', 'A **district** and its head.', 'definition', 3],
  ['Village head', 'The **gramika**, with village elders.', 'definition', 3],
  ['Land revenue', 'Commonly about **one-sixth** of the produce.', 'fact', 3],
  ['Gupta and Mauryan administration', 'Gupta was **more decentralised**: more local bodies.', 'concept', 3],
  ['What was Nalanda?', 'A great Buddhist **mahavihara** (monastery-university) in present-day **Bihar**.', 'definition', 4],
  ['Nalanda\'s decline and ruins', 'Declined in the **late 12th century**; ruins a **UNESCO World Heritage Site** since 2016.', 'fact', 4],
  ['Aryabhatta\'s ideas', 'Earth **rotates on its axis**; eclipses from **shadows**; close value of **pi**.', 'concept', 4],
  ['Aryabhatta\'s book', 'The **Aryabhatiya**, about 499 CE; he was born in 476 CE.', 'fact', 4],
  ['Sushruta Samhita', 'Classic text on **medicine and surgery**; **date debated**.', 'definition', 4],
  ['Works of Kalidasa', 'Plays: Abhijnanashakuntalam, Malavikagnimitram, Vikramorvashiyam. Poems: Raghuvamsha, Kumarasambhava, Meghaduta, Ritusamhara.', 'fact', 5],
  ['Deogarh temple', 'Dashavatara temple to **Vishnu**, Lalitpur district, Uttar Pradesh; about the 6th century CE.', 'fact', 5],
  ['Parts of the Deogarh temple', '**Jagati** (platform), square **sanctum**, **shikhara** (survives in part).', 'concept', 5],
  ['Golden age?', 'Often called a golden age, but historians **qualify** it: mostly the elite; caste rules stricter.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Age of the Guptas',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_fahien_chandala', 'm_veena', 'm_sandhi', 'm_eclipse', 'ar_sushruta', 's_fahien', 's3_kings'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_admin', 'l_science'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Age of the Guptas',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_fahien_king', 'm_prayag_caution', 'm_huna', 'm_revenue', 'm_xuanzang', 'm_sushruta_date', 'm_deogarh_feature', 'ar_golden', 's_prayag', 's_c2', 's_aryabhata', 's3_town', 's3_culture'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_sources', 'l_culture', 'l_golden'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of icse-9-history-civics-ch10 only (Fa-hien and the Allahabad Pillar Inscription; Gupta kings in order; Gupta administration; Nalanda, Aryabhatta and Sushruta; Kalidasa and the Deogarh temple)',
    originality: 'every pilgrim\'s notebook, museum label, club log and classroom scene is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no passage of Fa-hien, the Prayag Prashasti or Kalidasa is quoted',
    data: 'reign dates asserted contiguous (each Gupta reign ends where the next begins); all dates given as about except fixed ones (476 CE, 1975, 2016)',
    facts: 'Fa-hien about 399 to 412 CE; Gupta era about 319 to 320 CE; Chandragupta I about 320 to 335; Samudragupta about 335 to 375; Chandragupta II about 375 or 380 to 415; Kumaragupta I about 415 to 455; Skandagupta about 455 to 467; Aryabhatta born 476 CE, Aryabhatiya about 499 CE; Nalanda declined late 12th century, UNESCO 2016; Deogarh about 6th century CE',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
