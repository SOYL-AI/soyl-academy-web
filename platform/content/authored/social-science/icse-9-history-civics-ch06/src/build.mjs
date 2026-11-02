// Build ICSE 9 History & Civics ch06 The Vedic Period. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch06', 'social-science');
const { periodsFigure, assemblyFigure, ashramaFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Periods and sources', 'Family and king', 'Assemblies that checked the king'], 'Route map of Part 1: the two Vedic periods and their sources, the family and the king, and the assemblies that checked the king', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Economy compared', 'Women compared', 'Varnas and ashramas', 'Education'], 'Route map of Part 2: the economy of the two periods, the position of women, the varnas and ashramas, and education', 'Part 2 at a glance');
const vPeriods = periodsFigure('Two boxes on a time arrow drawn roughly to scale: the Early or Rig Vedic period from about 1500 to 1000 BCE and the Later Vedic period from about 1000 to 600 BCE; dates are approximate and vary between books', 'The two periods (approximate dates).');
const vVedas = table(['Veda', 'What it mainly contains'], [
  ['Rig Veda', 'Hymns of praise in ten books (mandalas); the oldest'],
  ['Sama Veda', 'Verses arranged as melodies for chanting'],
  ['Yajur Veda', 'Formulae and rules for performing sacrifices'],
  ['Atharva Veda', 'Charms, spells, healing and everyday concerns'],
], 'Table of the four Vedas: Rig Veda hymns in ten mandalas, Sama Veda melodies for chanting, Yajur Veda formulae for sacrifices, Atharva Veda charms and everyday concerns');
const vTexts = table(['Source', 'Kind of work', 'Helps us learn about'], [
  ['Brahmanas', 'Explanations of rituals', 'Ritual life; Later Vedic ideas'],
  ['Aranyakas', 'Forest texts on ritual meaning', 'Ritual and thought'],
  ['Upanishads', 'Discussions of ideas', 'Thought and beliefs'],
  ['Ramayana and Mahabharata', 'Epics (literature)', 'Society and values of the Later age'],
], 'Table of other sources: Brahmanas explain rituals, Aranyakas are forest texts on ritual meaning, Upanishads discuss ideas, and the Ramayana and Mahabharata are epics that show society and values of the Later age');
const vEpics = flow('LR', ['Ramayana, traditionally by Valmiki', 'Mahabharata, traditionally by Vyasa', 'Literary sources: family life, kingship, values'], 'Flow: the Ramayana traditionally attributed to Valmiki and the Mahabharata to Vyasa are literary sources for family life, kingship and values of the Later Vedic age', 'Epics as sources (read with care).');
const vUse = table(['Question a historian asks', 'Best source'], [
  ['How were tribes and their gods praised in the Early age?', 'Rig Veda hymns'],
  ['How was a sacrifice carried out step by step?', 'Yajur Veda and the Brahmanas'],
  ['What daily concerns and healing practices are recorded?', 'Atharva Veda'],
  ['What did family life and kingship look like in the Later age?', 'The epics, with other sources'],
], 'Table matching four historian questions with sources: hymns in the Rig Veda, sacrifice steps in the Yajur Veda and Brahmanas, daily concerns in the Atharva Veda, and Later age family life and kingship in the epics together with other sources');
const vUnits = flow('LR', ['Kula: the patriarchal family', 'Grama: a village of families', 'Vis: a group of villages', 'Jana: the tribe'], 'Flow from the smallest to the largest unit: kula the patriarchal family, grama a village of families, vis a group of villages, jana the tribe', 'Social units, smallest to largest.');
const vKing = table(['Question', 'Early Vedic answer'], [
  ['Who headed the family?', 'The father or eldest male (patriarchal)'],
  ['What did the rajan do?', 'Protected the tribe; led it in war'],
  ['Was he absolute?', 'No: assemblies and advisers checked him'],
  ['How was he supported?', 'By voluntary offerings called bali'],
], 'Table on the Early Vedic family and king: the father headed the family, the rajan protected the tribe and led it in war, he was not absolute because assemblies and advisers checked him, and he was supported by voluntary offerings called bali');
const vOfficials = table(['Official', 'Role'], [
  ['Purohita', 'Priest and adviser of the rajan'],
  ['Senani', 'Commander of the army'],
  ['Gramani', 'Head of a village (grama)'],
], 'Table of three officials: the purohita priest and adviser, the senani army commander, and the gramani village head');
const vAssembly = assemblyFigure('Three boxes of assemblies. Sabha: smaller body of elders and nobles that advised the king and heard some disputes. Samiti: larger assembly of the people of the tribe, linked to choosing and backing the king. Vidatha: the oldest assembly, a tribal gathering where religious and war matters were discussed', 'Three assemblies of the Early Vedic tribe.');
const vCheck = flow('LR', ['Rajan proposes a plan', 'Sabha advises; Samiti backs or withholds support', 'Rajan needs support: power is checked'], 'Flow: the rajan proposes a plan, the Sabha advises and the Samiti backs or withholds support, so the rajan needs support and his power is checked', 'How assemblies checked the king.');
const vPlan = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three assemblies named; the Vidatha as the oldest'],
  ['(ii)', '3', 'Sabha described; Samiti described; the difference'],
  ['(iii)', '4', 'Role of each assembly; how the king was limited'],
], 'Table planning a ten-mark answer on the assemblies: part (i) three assemblies for 3 marks, part (ii) Sabha and Samiti compared for 3 marks, part (iii) checks on the king for 4 marks');
const vEcon = table(['Point', 'Early Vedic', 'Later Vedic'], [
  ['Main activity', 'Cattle-rearing (pastoral)', 'Settled agriculture'],
  ['Chief wealth', 'Cattle', 'Land and its produce'],
  ['Tools', 'Mostly stone, wood and copper or bronze', 'Iron from about 1000 BCE in some areas'],
  ['Crafts and trade', 'Limited', 'Crafts, trade, beginnings of towns'],
], 'Table comparing the Early and Later Vedic economy: main activity cattle-rearing then settled agriculture, chief wealth cattle then land, tools mostly stone wood and copper then iron from about 1000 BCE in some areas, crafts and trade limited then growing with the beginnings of towns');
const vIron = flow('LR', ['Iron axes and ploughshares', 'Forests cleared, heavy soil ploughed', 'Surplus grain, crafts and trade', 'Beginnings of towns'], 'Flow: iron axes and ploughshares let farmers clear forests and plough heavy soil, giving surplus grain that supports crafts and trade and the beginnings of towns', 'How iron changed the economy.');
const vObjects = table(['Imagined museum object', 'Period', 'Reason'], [
  ['A model herd with tiny plots', 'Early Vedic', 'Cattle as wealth; little farming'],
  ['An iron ploughshare', 'Later Vedic', 'Iron and settled agriculture'],
  ['A potter\'s wheel and traders\' weights', 'Later Vedic', 'Crafts and trade'],
], 'Table sorting three imagined museum objects: a model herd is Early Vedic, an iron ploughshare is Later Vedic, and a potter\'s wheel with traders\' weights is Later Vedic');
const vWomen = table(['Point', 'Early Vedic', 'Later Vedic'], [
  ['Education', 'Open to women; some composed hymns', 'More restricted'],
  ['Assemblies and rituals', 'Women took part', 'Largely excluded from assemblies'],
  ['Marriage', 'Some choice', 'Less choice'],
  ['Overall', 'Relatively respected', 'Position declined'],
], 'Table comparing women in the Early and Later Vedic periods on education, assemblies and rituals, marriage and overall position: relatively respected in the Early period and a declining position in the Later period');
const vVarna = table(['Varna', 'Work usually linked with it'], [
  ['Brahmanas', 'Study, teaching and priestly work'],
  ['Kshatriyas', 'Ruling and protecting the people'],
  ['Vaishyas', 'Farming, cattle-rearing and trade'],
  ['Shudras', 'Service to the other groups'],
], 'Table of the four varnas and the work usually linked with each: Brahmanas study teaching and priestly work, Kshatriyas ruling and protection, Vaishyas farming cattle-rearing and trade, Shudras service to the other groups');
const vVarnaChange = flow('LR', ['Early: flexible, linked to occupation', 'Later: rigid, decided by birth', 'A hierarchy that later caused inequality'], 'Flow: in the Early period the varna divisions were flexible and linked to occupation; in the Later period they became rigid and decided by birth; this became a hierarchy that later caused inequality', 'How the varna system changed.');
const vAshrama = ashramaFigure('Four rising steps: Brahmacharya student life, Grihastha householder life, Vanaprastha gradual withdrawal, and Sannyasa life of renunciation, shown in order from left to right', 'The four ashramas in order.');
const vGurukul = table(['Feature', 'In the gurukul'], [
  ['Place', 'Students lived with the teacher (guru)'],
  ['Method', 'Oral: listening, reciting, memorising'],
  ['Subjects', 'Vedas and ritual, language and grammar, skills linked to a student\'s work'],
], 'Table on the gurukul: students lived with the teacher, learned orally by listening reciting and memorising, and studied the Vedas and ritual, language and grammar, and skills linked to a student\'s work');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three contrasts: activity, wealth, crafts and trade'],
  ['(ii)', '3', 'Education, rituals and assemblies, choice in marriage'],
  ['(iii)', '4', 'Decline described; different reasons given by historians'],
], 'Table planning a ten-mark answer on the economy and women: part (i) three contrasts for 3 marks, part (ii) the Early position of women for 3 marks, part (iii) decline and different reasons for 4 marks');
const vCompare = table(['Feature', 'Early Vedic', 'Later Vedic'], [
  ['Economy', 'Pastoral', 'Settled agriculture, iron, crafts'],
  ['Women', 'Relatively respected', 'Position declined'],
  ['Varna', 'Flexible', 'Rigid, birth-based'],
  ['Power of the king', 'Checked by assemblies', 'Kings gained more power'],
], 'Table comparing the Early and Later Vedic periods on economy, women, varna and the power of the king');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Vedic Period — Part 1: Sources, the Family and the King, and the Assemblies',
  goals: [
    'Name the four Vedas and state what each contains',
    'Explain the importance of the Ramayana and the Mahabharata as sources for the Later Vedic period',
    'Describe the patriarchal family and the position and duties of the king in the Early Vedic period',
    'Distinguish the Sabha, the Samiti and the Vidatha and explain how they checked the king',
  ],
  slides: [
    sl('title', 'The Vedic Period: sources, king and assemblies', {
      b: 'Part 1 — how we know about the Vedic age and how a tribe was governed.',
      v: vRoute1,
      n: 'After the Harappan cities, a new way of life is described in a body of literature called the Vedas. In this part we learn what the four Vedas contain, how other works help, how the Early Vedic family and king worked, and how assemblies kept the king in check.',
    }),
    sl('diagram', 'Two periods, roughly dated', {
      b: 'Historians divide the Vedic age into an **Early** and a **Later** period.',
      v: vPeriods,
      n: 'Historians divide the Vedic age into two periods. The Early or Rig Vedic period is dated about fifteen hundred to one thousand before the common era. The Later Vedic period runs from about one thousand to six hundred before the common era. Books differ a little on these dates, so always say about.',
    }),
    sl('diagram', 'The four Vedas', {
      v: vVedas,
      n: 'There are four Vedas. The Rig Veda is the oldest and is a collection of hymns arranged in ten books called mandalas. The Sama Veda has verses set to melodies for chanting. The Yajur Veda has formulae and rules for sacrifices. The Atharva Veda has charms, spells, healing and everyday concerns.',
    }),
    sl('diagram', 'Other works that help', {
      b: 'The Vedas were learnt by heart and passed on by speech long before they were written down.',
      v: vTexts,
      n: 'Other works are connected with the Vedas. The Brahmanas explain rituals. The Aranyakas, or forest texts, reflect on their meaning. The Upanishads discuss ideas and beliefs. These later works, together with the epics, help us understand the Later Vedic age. All were learnt by heart and passed on by speech for a very long time.',
    }),
    sl('check', 'Quick check: match the Vedas', {
      b: 'Match each Veda with what it mainly contains.',
      chk: 'mt_vedas',
      n: 'Look back at the table of the four Vedas. Match each one with its main contents. Remember that the Rig Veda is the oldest.',
    }),
    sl('concept', 'The epics as sources', {
      bl: [
        'The **Ramayana**, traditionally by **Valmiki**, and the **Mahabharata**, traditionally by **Vyasa**.',
        'They are **literary sources** for the **Later Vedic** age.',
        'They show **family life, kingship and values**.',
        'Read them **with care** and **together with other sources**.',
      ],
      v: vEpics,
      n: 'The Ramayana is traditionally attributed to Valmiki and the Mahabharata to Vyasa. For students of history they are literary sources that show family life, kingship and the values people admired in the Later Vedic age. Because they are works of literature, historians read them with care and alongside other sources.',
    }),
    sl('example', 'Worked example 1: choosing the right source', {
      b: 'Ask what you want to know, then pick the source that fits.',
      bl: [
        'Step 1 — Read the question the historian is asking.',
        'Step 2 — Decide: hymns, ritual rules, daily concerns or society?',
        'Step 3 — Match it with the right Veda or work.',
        'Step 4 — Add one more source if the age is the Later period.',
      ],
      v: vUse,
      n: 'Here is a simple method. Read the question and decide whether it is about hymns, ritual rules, daily concerns or society. Then match it with the right source. Questions on the praise of gods go to the Rig Veda. Sacrifice steps go to the Yajur Veda. Healing and daily concerns go to the Atharva Veda. Society in the Later age goes to the epics with other sources.',
    }),
    sl('check', 'Quick check: a choir leader', {
      b: 'Which Veda is closest to singing verses to tunes?',
      chk: 'm_sama',
      n: 'Think about which Veda is arranged for chanting to melodies, and which ones are about hymns, rituals or charms.',
    }),
    sl('diagram', 'From family to tribe', {
      b: 'The basic unit of Early Vedic society was the **patriarchal family**.',
      v: vUnits,
      n: 'The basic unit of Early Vedic society was the family, called the kula. It was patriarchal, which means the father or eldest male headed it. Families together formed a village called a grama. Villages formed a larger group called a vis, and these made up the tribe, the jana.',
    }),
    sl('concept', 'The rajan: protector and leader', {
      v: vKing,
      bl: [
        'The **rajan** protected the tribe and led it in **war**.',
        'He was **not an absolute ruler**.',
        'People gave **bali**, voluntary offerings, in support.',
      ],
      n: 'The king was called the rajan. His main duties were to protect the tribe, its people and cattle, and to lead it in war. He was not an absolute ruler, because advisers and assemblies limited him. The people supported him with voluntary offerings called bali, not with a fixed tax.',
    }),
    sl('diagram', 'Officials who helped the king', {
      v: vOfficials,
      n: 'The rajan was helped by officials. The purohita was the priest and adviser who blessed the king and guided him in important matters. The senani was the commander of the army. The gramani was the head of a village. Together they carried out the daily work of the tribe.',
    }),
    sl('check', 'Quick check: smallest to largest', {
      b: 'Arrange the Early Vedic social units from the smallest to the largest.',
      chk: 'ord_units',
      n: 'Start with the family and end with the tribe. Use the chain of units you have just seen.',
    }),
    sl('diagram', 'Three assemblies', {
      b: 'The Sabha, the Samiti and the Vidatha were **checks on the king**.',
      v: vAssembly,
      n: 'The Early Vedic tribe had three assemblies. The Sabha was a smaller body of elders and nobles who advised the king. The Samiti was a larger assembly of the people of the tribe, linked to choosing and backing the king. The Vidatha is regarded as the oldest assembly, where tribal, religious and war matters were discussed.',
    }),
    sl('concept', 'How assemblies checked the king', {
      bl: [
        'The **Sabha** advised him: he did not decide alone.',
        'The **Samiti** could **back** or **withhold** support.',
        'The **Vidatha** gave a **tribal forum** for religious and war matters.',
      ],
      v: vCheck,
      n: 'Suppose the rajan proposes a plan. The Sabha advises him on it. The Samiti may back the plan or withhold support. The Vidatha gives the tribe a place to discuss religious and war matters. Because he needs their support, the king cannot rule by his own will alone. This is how assemblies checked his power.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Name the three assemblies. [3] (ii) Compare the Sabha and the Samiti. [3] (iii) How did assemblies check the king? [4]',
      bl: [
        '(i) Three names + the Vidatha as the oldest.',
        '(ii) One point for each, then the difference.',
        '(iii) One point per assembly, then a closing line on limited power.',
        'Aim for one point per mark.',
      ],
      v: vPlan,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second and four to the last. Part one names the three assemblies and says the Vidatha is the oldest. Part two describes the Sabha and the Samiti and states how they differ. Part three gives a point for each assembly and ends with how the king was limited.',
    }),
    sl('check', 'Quick check: oldest and smaller', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_assemblies',
      n: 'Check each statement on its own first. Then ask whether the reason really explains the assertion.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Four Vedas: **Rig**, **Sama**, **Yajur**, **Atharva**; the epics help for the **Later** age.',
        'Family (**kula**) to **grama**, **vis** and **jana**; the **rajan** protected and led in war.',
        'Officials: **purohita**, **senani**, **gramani**.',
        'Assemblies: **Sabha**, **Samiti**, **Vidatha**, which **checked** the king.',
      ],
      v: vAssembly,
      n: 'To sum up. The four Vedas are the Rig, Sama, Yajur and Atharva Vedas, and the epics help us for the Later age. Society rested on the family and grew into the tribe. The rajan protected the tribe and led it in war, helped by officials, and was checked by three assemblies.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Say **about** with every date; books differ.',
        'Name the **Veda** and its **contents** together.',
        'Never write that the early king was an **absolute ruler**.',
        'For assemblies, state **size and members** to show the difference.',
        'Treat the epics as **literary sources**; do not claim exact dates.',
      ],
      n: 'Some exam habits. Add the word about to every date. When you name a Veda, state its contents too. Never write that the Early Vedic king was an absolute ruler. For the assemblies, mention size and members to show how they differ. And treat the epics as literary sources that help us, not as exact records.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Vedic Period — Part 2: Economy, Women, Varnas, Ashramas and Education',
  goals: [
    'Compare the economy of the Early (pastoral) and Later (settled agriculture, crafts) Vedic periods',
    'Compare the position of women in the Early and Later Vedic periods',
    'Explain the four varnas and how they became rigid in the Later period',
    'Describe the four ashramas and the gurukul system of education',
  ],
  slides: [
    sl('title', 'Economy, women, varnas and education', {
      b: 'Part 2 — how life changed between the **Early** and **Later** Vedic ages.',
      v: vRoute2,
      n: 'In this part we compare the economy of the two periods, see how the position of women changed, learn about the four varnas and four ashramas, and look at how students were taught in the gurukul. The aim is to describe each point factually and to compare the two periods.',
    }),
    sl('diagram', 'Two periods again', {
      v: vPeriods,
      n: 'Remember the two periods. The Early Vedic period is about fifteen hundred to one thousand before the common era, and the Later Vedic period about one thousand to six hundred before the common era. Most changes we study now happened gradually between them, not suddenly.',
    }),
    sl('concept', 'The economy compared', {
      bl: [
        '**Early:** mainly **pastoral**; **cattle** were wealth.',
        '**Later:** **settled agriculture**, **iron**, crafts, trade.',
        'Towns **began** to appear.',
      ],
      v: vEcon,
      n: 'In the Early period the economy was mainly pastoral. Cattle were the chief wealth and farming was a lesser activity. In the Later period settled agriculture became important, iron appeared in some areas from about one thousand before the common era, crafts and trade grew, and the beginnings of towns appeared.',
    }),
    sl('diagram', 'How iron changed farming', {
      v: vIron,
      n: 'Iron axes helped farmers clear forests, and iron ploughshares helped them turn heavy soil. More land under the plough meant a surplus of grain. A surplus can feed craftworkers and traders who do not farm. In this way iron helped settled agriculture, crafts, trade and the first towns to grow together.',
    }),
    sl('check', 'Quick check: what was wealth?', {
      b: 'In the Early period, which was the main form of wealth?',
      chk: 'm_cattle_wealth',
      n: 'Think about the way of life of the Early Vedic tribes. What did they count as riches?',
    }),
    sl('example', 'Worked example 3: sorting museum objects', {
      b: 'Match each object to a period, then give the reason.',
      bl: [
        'Step 1 — Name what the object is used for.',
        'Step 2 — Link it with herding, farming, crafts or trade.',
        'Step 3 — Choose the period.',
        'Step 4 — Write the reason in one line.',
      ],
      v: vObjects,
      n: 'Use four steps. Say what the object is used for. Link it with herding, farming, crafts or trade. Choose the period. Then write the reason in one line. A model herd with tiny plots belongs to the Early period. An iron ploughshare, and a potter\'s wheel with traders\' weights, belong to the Later period.',
    }),
    sl('concept', 'Women in the two periods', {
      bl: [
        '**Early:** relatively **respected**; education, rituals, assemblies.',
        'Women composers of hymns, traditionally **Ghosha, Apala, Lopamudra**.',
        '**Later:** **excluded** from assemblies; more restrictions.',
      ],
      v: vWomen,
      n: 'In the Early period women were relatively respected. They could be educated, take part in rituals and assemblies, and had some choice in marriage. Ghosha, Apala and Lopamudra are traditionally named as composers of hymns. In the Later period their position declined, with exclusion from assemblies and more restrictions.',
    }),
    sl('check', 'Quick check: Early position of women', {
      b: 'Which statement best describes women in the Early Vedic period?',
      chk: 'm_women_early',
      n: 'Think about education, rituals and assemblies in the Early period.',
    }),
    sl('diagram', 'The four varnas', {
      b: 'We describe the varnas as a **historical development**, without praising or blaming any group.',
      v: vVarna,
      n: 'Vedic society spoke of four varnas. The Brahmanas were linked with study, teaching and priestly work. The Kshatriyas were linked with ruling and protecting the people. The Vaishyas were linked with farming, cattle-rearing and trade. The Shudras were linked with service to the other groups.',
    }),
    sl('concept', 'How the varnas hardened', {
      bl: [
        '**Early:** flexible, linked to **occupation**.',
        '**Later:** **rigid**, decided by **birth**.',
        'It became a **hierarchy** that later caused **inequality**.',
      ],
      v: vVarnaChange,
      n: 'In the Early period the divisions were fairly flexible and tied to a person\'s occupation. In the Later period they became rigid and were decided by birth. This turned into a hierarchy that later caused inequality. Historians study this change to understand how society developed. Today the Constitution of India guarantees equality to all citizens.',
    }),
    sl('check', 'Quick check: the four varnas', {
      b: 'Which list gives the four varnas?',
      chk: 'm_varna_four',
      n: 'Be careful not to mix the varnas with the ashramas or the Vedas. Which list names the four varnas?',
    }),
    sl('diagram', 'The four ashramas', {
      b: 'Four **ideal stages of life**, followed in order.',
      v: vAshrama,
      n: 'The four ashramas were ideal stages of life. Brahmacharya was student life. Grihastha was the life of a householder who earns a living and raises a family. Vanaprastha was a gradual withdrawal from worldly duties. Sannyasa was a life of renunciation. They describe a pattern, not what every person did.',
    }),
    sl('check', 'Quick check: ashramas in order', {
      b: 'Arrange the four ashramas in order.',
      chk: 'ord_ashrama',
      n: 'Begin with the student stage and end with renunciation.',
    }),
    sl('diagram', 'The gurukul', {
      v: vGurukul,
      n: 'In the gurukul system students lived with the teacher, whom they called the guru, and helped in the household. Learning was oral. Students listened, recited and memorised. They studied the Vedas and rituals, language and grammar, and skills linked to the work they would do, such as warfare for future warriors.',
    }),
    sl('example', 'Worked example 4: planning a 10-mark answer', {
      b: 'Question: (i) Compare the economy in three points. [3] (ii) Women in the Early period. [3] (iii) Change in the Later period, with reasons. [4]',
      bl: [
        '(i) Activity, wealth, crafts and trade: one point each.',
        '(ii) Education, rituals and assemblies, marriage.',
        '(iii) Decline described + more than one reason, with a note of caution.',
        'Say **about** with dates; avoid blame.',
      ],
      v: vPlan2,
      n: 'Plan this answer in three parts. Part one compares the two economies in three points, one for each mark. Part two describes the respected position of women in the Early period. Part three describes the decline and gives more than one reason, with a note that historians read the evidence in different ways.',
    }),
    sl('diagram', 'The two periods compared', {
      v: vCompare,
      n: 'Here is the whole picture. The Early economy was pastoral and the Later economy was settled with iron and crafts. Women were relatively respected in the Early period and their position declined in the Later period. The varna divisions were flexible and then rigid. Kings gained more power in the Later period.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Economy: **pastoral** to **settled agriculture**, **iron**, crafts, early towns.',
        'Women: **respected** in the Early period; **declined** in the Later.',
        'Varnas: **flexible** to **rigid**; ashramas: four **ideal stages**.',
        'Gurukul: **oral** learning with the **teacher**.',
      ],
      v: vCompare,
      n: 'To sum up. The economy moved from herding to settled farming with iron and crafts. Women were relatively respected in the Early period and lost ground in the Later one. The varna system hardened, the ashramas described four ideal stages of life, and students learned orally in the gurukul.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'For a **comparison**, give both periods in each point.',
        'Use **about** for dates; say that books differ.',
        'Describe the varnas **factually**; do not praise or blame any group.',
        'Mention that historians give **different reasons** for changes.',
        'In 3 + 3 + 4 answers, use the last four marks for reasons or evaluation.',
      ],
      n: 'Some exam habits. In a comparison, give both periods in every point. Use the word about with dates. Describe the varnas factually and do not praise or blame any group. Mention that historians give different reasons for change. And in a three, three and four mark answer, use the last four marks for reasons or evaluation.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Vedic Period — notes',
  sections: [
    {
      h: '1. The two periods and the sources',
      t: 1,
      b: '- **Early (Rig) Vedic:** about 1500 to 1000 BCE. **Later Vedic:** about 1000 to 600 BCE. Dates are approximate and vary between books; say **about**.\n- **Four Vedas:** **Rig Veda** (oldest; hymns in ten mandalas, about a thousand hymns), **Sama Veda** (melodies for chanting), **Yajur Veda** (formulae and rules for sacrifices), **Atharva Veda** (charms, spells, healing, everyday concerns).\n- Other works: **Brahmanas** (rituals), **Aranyakas** (forest texts), **Upanishads** (ideas).\n- **Epics:** the **Ramayana** (traditionally Valmiki) and the **Mahabharata** (traditionally Vyasa) are **literary sources** for the Later Vedic age: family life, kingship, values. Read with care and with other sources.\n- The texts were learnt by heart and handed down orally for a long time.',
      terms: [['Mandala', 'One of the ten books of the Rig Veda.'], ['Literary source', 'A work of literature that historians use, with care, as evidence.']],
      v: vPeriods,
      vs: [vVedas, vTexts],
    },
    {
      h: '2. The Early Vedic family and the king',
      t: 2,
      b: '- The **patriarchal family (kula)**, headed by the father or eldest male, was the basic unit.\n- Units from smallest to largest: **kula, grama, vis, jana** (tribe).\n- The **rajan** protected the tribe and led it in war; he was **not absolute**. People supported him with voluntary offerings called **bali**.\n- Officials: **purohita** (priest and adviser), **senani** (army commander), **gramani** (village head).',
      terms: [['Rajan', 'The king or chief of the tribe.'], ['Purohita', 'The priest and adviser of the king.'], ['Senani', 'The commander of the army.'], ['Gramani', 'The head of a village.']],
      v: vUnits,
      vs: [vKing, vOfficials],
    },
    {
      h: '3. The assemblies',
      t: 3,
      b: '- **Sabha:** smaller body of elders and nobles; advised the king; heard some disputes.\n- **Samiti:** larger assembly of the people of the tribe; linked to choosing and backing the king.\n- **Vidatha:** regarded as the oldest assembly; tribal, religious and military matters.\n- **Checks:** the king needed the support of the assemblies, so he could not rule by his own will alone.',
      terms: [['Sabha', 'Smaller assembly of elders.'], ['Samiti', 'Larger assembly of the people.'], ['Vidatha', 'The oldest assembly, with tribal, religious and military functions.']],
      v: vAssembly,
      vs: [vCheck],
    },
    {
      h: '4. Economy and women: Early and Later compared',
      t: 4,
      b: '- **Early economy:** mainly **pastoral**; **cattle** were wealth; some agriculture.\n- **Later economy:** **settled agriculture**; **iron** from about 1000 BCE in some areas; **crafts**, **trade** and the beginnings of **towns**.\n- **Women, Early:** relatively respected: education, rituals, assemblies, some choice in marriage; women composers of hymns, traditionally Ghosha, Apala and Lopamudra.\n- **Women, Later:** position declined: largely excluded from assemblies and more restrictions. Historians give different reasons for the change.',
      terms: [['Pastoral', 'Based on rearing animals such as cattle.'], ['Settled agriculture', 'Farming in fixed fields, with villages that stay in one place.']],
      v: vEcon,
      vs: [vIron, vWomen],
    },
    {
      h: '5. Varnas and ashramas',
      t: 5,
      b: '- **Four varnas:** Brahmanas (study, teaching, priestly work), Kshatriyas (ruling, protecting), Vaishyas (farming, cattle-rearing, trade), Shudras (service).\n- **Early period:** flexible, linked to occupation. **Later period:** rigid, birth-based. It became a **hierarchy** that later caused inequality. Describe it factually; today the Constitution guarantees equality to all citizens.\n- **Four ashramas (ideal stages):** **Brahmacharya** (student), **Grihastha** (householder), **Vanaprastha** (gradual withdrawal), **Sannyasa** (renunciation).',
      terms: [['Varna', 'One of the four divisions of Vedic society.'], ['Ashrama', 'One of the four ideal stages of life.']],
      v: vVarna,
      vs: [vVarnaChange, vAshrama],
    },
    {
      h: '6. Education and the periods compared',
      t: 5,
      b: '- **Gurukul:** students lived with the **teacher (guru)**.\n- **Method:** **oral**: listening, reciting, memorising.\n- **Subjects:** the Vedas and rituals, language and grammar, and skills linked to a student\'s work (for example warfare for future warriors).\n- **Summary of change:** economy from pastoral to settled; women from respected to a lower position; varna from flexible to rigid; kings gained more power in the Later age.',
      terms: [['Gurukul', 'A teacher\'s home where students lived and learned.'], ['Guru', 'Teacher.']],
      v: vGurukul,
      vs: [vCompare],
    },
  ],
  tips: '**Common mistakes**\n- Giving a date without the word about.\n- Mixing up the Sabha and the Samiti.\n- Writing that the Early Vedic king was an absolute ruler.\n- Treating the epics as exact records of dates.\n- Confusing the four varnas with the four ashramas.\n- Praising or blaming a group when describing the varnas.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a link or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Dates of the Early (Rig) Vedic period', 'About **1500 to 1000 BCE** (books differ).', 'fact', 1],
  ['Dates of the Later Vedic period', 'About **1000 to 600 BCE** (books differ).', 'fact', 1],
  ['The four Vedas', 'Rig, Sama, Yajur and Atharva.', 'fact', 1],
  ['Rig Veda', 'The **oldest** Veda; **hymns** in ten books called mandalas.', 'definition', 1],
  ['Sama Veda', 'Verses arranged as **melodies** for chanting.', 'definition', 1],
  ['Yajur Veda', '**Formulae and rules** for performing sacrifices.', 'definition', 1],
  ['Atharva Veda', '**Charms, spells, healing** and everyday concerns.', 'definition', 1],
  ['Brahmanas, Aranyakas, Upanishads', 'Works connected with the Vedas: rituals, forest reflections and ideas.', 'concept', 1],
  ['Importance of the epics', 'Literary sources for **Later Vedic** society: family life, kingship, values; read with care.', 'concept', 1],
  ['Traditional authors of the epics', 'Ramayana: **Valmiki**. Mahabharata: **Vyasa**.', 'fact', 1],
  ['Kula', 'The **patriarchal family**, the basic unit of Early Vedic society.', 'definition', 2],
  ['Order of social units', 'Kula, grama, vis, jana (smallest to largest).', 'concept', 2],
  ['Rajan', 'The king: **protected the tribe** and **led it in war**; not absolute.', 'definition', 2],
  ['Bali', 'Voluntary offerings made to the rajan by the people.', 'definition', 2],
  ['Purohita', 'The priest and adviser of the king.', 'definition', 2],
  ['Senani', 'The commander of the army.', 'definition', 2],
  ['Gramani', 'The head of a village (grama).', 'definition', 2],
  ['Sabha', '**Smaller** body of elders and nobles; advised the king.', 'definition', 3],
  ['Samiti', '**Larger** assembly of the people; linked to choosing and backing the king.', 'definition', 3],
  ['Vidatha', 'The **oldest** assembly: tribal, religious and military matters.', 'definition', 3],
  ['How did assemblies check the king?', 'The king needed their **support**, so he could not rule by his will alone.', 'concept', 3],
  ['Early Vedic economy', 'Mainly **pastoral**; **cattle** were wealth.', 'concept', 4],
  ['Later Vedic economy', '**Settled agriculture**, **iron**, crafts, trade, beginnings of towns.', 'concept', 4],
  ['Why did iron matter?', 'Iron axes and ploughs cleared forests and ploughed heavy soil, so farming grew.', 'concept', 4],
  ['Women in the Early period', 'Relatively respected: education, rituals, assemblies, some choice in marriage.', 'concept', 4],
  ['Women composers of hymns', 'Traditionally **Ghosha, Apala and Lopamudra**.', 'fact', 4],
  ['Women in the Later period', 'Position **declined**: excluded from assemblies; more restrictions.', 'concept', 4],
  ['The four varnas', 'Brahmanas, Kshatriyas, Vaishyas, Shudras.', 'fact', 5],
  ['Varna: Early versus Later', 'Early: **flexible**, linked to occupation. Later: **rigid**, birth-based; a hierarchy that later caused inequality.', 'concept', 5],
  ['The four ashramas', 'Brahmacharya, Grihastha, Vanaprastha, Sannyasa.', 'fact', 5],
  ['Gurukul', 'Students **lived with the teacher** and learned **orally**.', 'definition', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Vedic Period',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_atharva_label', 'm_not_absolute', 'm_check_power', 'm_varna_later', 'ar_economy', 's_sabha_samiti', 's3_women_compare'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_society', 'l_varna_ashrama'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Vedic Period',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_yajur_label', 'm_senani', 'm_vidatha', 'm_composer', 'm_later_econ', 'm_ashrama_scenario', 'm_one_source', 'ar_epics', 's_epics_imp', 's_officials', 's_iron_effect', 's3_checks_king', 's3_education'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_sources', 'l_assemblies', 'l_women_economy'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of icse-9-history-civics-ch06 only (the four Vedas and the epics as sources; Early Vedic family and king; Sabha, Samiti and Vidatha; women and economy compared; varnas, ashramas and the gurukul)',
    originality: 'every role-play, museum label, diary and tribe is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no hymn, verse or passage quoted',
    data: 'period dates asserted to be contiguous and in order; all dates given as about',
    facts: 'Early Vedic about 1500 to 1000 BCE and Later Vedic about 1000 to 600 BCE (books differ); four Vedas and their contents; Rig Veda ten mandalas; epics as literary sources (Valmiki, Vyasa traditionally); kula, grama, vis, jana; rajan, purohita, senani, gramani, bali; Sabha, Samiti, Vidatha; women composers Ghosha, Apala, Lopamudra; iron from about 1000 BCE in some areas; four varnas and four ashramas; gurukul',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
