// Build ICSE 9 History & Civics ch07 Jainism and Buddhism. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch07', 'social-science');
const { timelineFigure, mapFigure, compareFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Sources of the two faiths', 'Causes of new faiths in the 6th century BCE', 'Kings and local languages'], 'Route map of Part 1: the sources of Jainism and Buddhism, the causes for the rise of new faiths, and the role of kings and local languages', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Where it happened', 'Doctrines of Jainism', 'Doctrines of Buddhism', 'The two compared'], 'Route map of Part 2: key sites, the doctrines of Jainism, the doctrines of Buddhism, and a comparison of the two', 'Part 2 at a glance');
const vTimeline = timelineFigure('A time arrow from 700 to 400 BCE drawn to scale with the sixth century BCE shaded; the Buddha is marked as born about 563 BCE and Mahavira about 540 BCE; dates are approximate and vary between books', 'The two founders on a timeline (approximate dates).');
const vMap = mapFigure('Schematic map, not to scale, of the Ganga plains showing Lumbini, Kushinagar, Sarnath and Bodh Gaya as Buddhist sites and Kundagrama near Vaishali as the birthplace of Mahavira', 'Key sites (schematic, not to scale).');
const vCompareFig = compareFigure('Three boxes comparing Jainism and Buddhism: Jainism with Mahavira, Tri-ratnas, five vows, strict ahimsa and the Angas; both faiths with the sixth century BCE, questioning costly rituals, karma and rebirth, ahimsa and local languages; Buddhism with the Buddha, Four Noble Truths, Eightfold Path, Middle Path, Nirvana and the Tripitakas', 'Jainism and Buddhism compared.');

const vSources = table(['Faith', 'Main texts', 'Notes'], [
  ['Jainism', 'The Angas', 'Twelve in tradition; compiled at Valabhi'],
  ['Buddhism', 'The Tripitakas', 'Three baskets; composed in Pali'],
  ['Buddhism', 'The Jatakas', 'Stories of the Buddha\'s earlier births'],
], 'Table of sources: the Angas for Jainism, twelve in tradition and compiled at Valabhi; the Tripitakas for Buddhism, three baskets composed in Pali; and the Jatakas, stories of the Buddha\'s earlier births');
const vAngas = flow('LR', ['Teachings passed on by word of mouth', 'Council of Valabhi, about 5th to 6th century CE', 'Twelve Angas, in tradition'], 'Flow: Jain teachings were passed on orally, then compiled at the Council of Valabhi about the fifth to sixth century CE, giving the twelve Angas in tradition', 'How the Angas came to be written.');
const vPitakas = table(['Pitaka', 'What it holds'], [
  ['Vinaya Pitaka', 'Rules of conduct for monks and nuns'],
  ['Sutta Pitaka', 'Discourses and teachings attributed to the Buddha'],
  ['Abhidhamma Pitaka', 'Deeper philosophical analysis of the teachings'],
], 'Table of the three Pitakas: the Vinaya Pitaka holds rules for monks and nuns, the Sutta Pitaka holds discourses of the Buddha, the Abhidhamma Pitaka holds deeper analysis');
const vJatakas = flow('LR', ['Jataka stories', 'Told as earlier births of the Buddha', 'Glimpses of markets, villages and travellers'], 'Flow: the Jatakas are stories told as earlier births of the Buddha, and they give glimpses of markets, villages and travellers', 'The Jatakas as a source.');
const vUse = table(['Question a historian asks', 'Best source'], [
  ['What rules did Buddhist monks and nuns follow?', 'Vinaya Pitaka'],
  ['What are the main Jain texts?', 'The Angas'],
  ['How did traders and villagers live?', 'The Jatakas, with other sources'],
  ['What did the Buddha teach in his talks?', 'Sutta Pitaka'],
], 'Table matching four historian questions with sources: Buddhist monastic rules in the Vinaya Pitaka, Jain texts in the Angas, traders and villagers in the Jatakas with other sources, and the Buddha\'s talks in the Sutta Pitaka');
const vCauses = table(['Kind of cause', 'In brief'], [
  ['Religious', 'Costly rituals; priests; Sanskrit not understood by many'],
  ['Social', 'Rigid varna system; Kshatriya and Vaishya aspirations'],
  ['Economic', 'Cattle needed for farming; growth of trade and towns'],
  ['Political', 'Rise of kingdoms; royal support'],
  ['Language', 'Prakrit and Pali, close to common speech'],
], 'Table of five kinds of cause for the rise of new faiths: religious, social, economic, political and language, each with a short description');
const vReligious = table(['Point', 'What historians note'], [
  ['Rituals', 'Complex and costly sacrifices'],
  ['Priests', 'A leading place in ceremonies'],
  ['Language', 'Sanskrit not understood by common people'],
  ['The new teachers', 'Questioned some practices; the older tradition continued'],
], 'Table of religious causes: complex and costly rituals, the leading place of priests, Sanskrit not understood by common people, and new teachers who questioned some practices while the older tradition continued');
const vSocial = table(['Group', 'Position or hope'], [
  ['All groups', 'Rank was becoming fixed by birth'],
  ['Kshatriyas', 'Wished for a standing equal to their power'],
  ['Vaishyas', 'Wealthy from trade but wanted more respect'],
], 'Table of social causes: rank fixed by birth for all groups, Kshatriyas wishing for a standing equal to their power, and Vaishyas wealthy from trade but wanting more respect');
const vCattle = flow('LR', ['Farming needs oxen and cows', 'Large sacrifices use many animals', 'Ahimsa welcomed by farmers'], 'Flow: farming needs oxen and cows, large sacrifices use many animals, so farmers welcomed the teaching of ahimsa', 'An economic cause: cattle.');
const vTrade = flow('LR', ['Trade and towns grow', 'Vaishyas gain wealth', 'They seek standing and give gifts to the new teachers'], 'Flow: trade and towns grow, Vaishyas gain wealth, and they seek standing and give gifts to the new teachers', 'An economic cause: trade.');
const vPolitics = table(['Point', 'What it meant'], [
  ['Kingdoms', 'Larger kingdoms such as Magadha were growing'],
  ['Royal support', 'Rulers gave the new teachers gifts and protection'],
  ['Local languages', 'Prakrit and Pali reached many more people'],
], 'Table of political and language points: larger kingdoms such as Magadha growing, rulers giving gifts and protection, and Prakrit and Pali reaching more people');
const vClassify = table(['Imagined situation', 'Kind of cause'], [
  ['A villager cannot follow the language of a long rite', 'Religious'],
  ['A rich trader is ranked low because of birth', 'Social'],
  ['A farmer cannot spare an ox for a sacrifice', 'Economic'],
  ['A king gives a rest-house to a teacher', 'Political'],
], 'Table sorting four imagined situations into causes: a villager who cannot follow a rite is religious, a rich trader ranked low by birth is social, a farmer who cannot spare an ox is economic, and a king giving a rest-house is political');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three religious causes'],
  ['(ii)', '3', 'Two social causes and one economic cause'],
  ['(iii)', '4', 'Kingdoms and royal support; local languages'],
], 'Table planning a ten-mark answer on the causes: part (i) three religious causes for 3 marks, part (ii) two social causes and one economic cause for 3 marks, part (iii) kingdoms and local languages for 4 marks');

const vMahavira = table(['Point', 'Fact'], [
  ['Name', 'Vardhamana, later called Mahavira and Jina'],
  ['Birth', 'About 540 BCE at Kundagrama near Vaishali'],
  ['Place in tradition', 'The twenty-fourth Tirthankara; Parshvanatha was the twenty-third'],
  ['Attainment', 'Kevala jnana, perfect knowledge, after years of austere practice'],
], 'Table of facts on Mahavira: Vardhamana, later called Mahavira and Jina; born about 540 BCE at Kundagrama near Vaishali; the twenty-fourth Tirthankara after Parshvanatha; attained kevala jnana after years of austere practice');
const vTriratna = flow('LR', ['Right faith', 'Right knowledge', 'Right conduct', 'Moksha: liberation'], 'Flow: right faith, right knowledge and right conduct, the Tri-ratnas, lead to moksha or liberation', 'The Tri-ratnas.');
const vVows = table(['Vow', 'Meaning'], [
  ['Ahimsa', 'Not harming any living being'],
  ['Satya', 'Speaking the truth'],
  ['Asteya', 'Not taking what is not given'],
  ['Aparigraha', 'Limiting attachment to possessions'],
  ['Brahmacharya', 'Self-restraint; the fifth vow, added by Mahavira'],
], 'Table of the five Jain vows: ahimsa not harming living beings, satya speaking the truth, asteya not taking what is not given, aparigraha limiting possessions, and brahmacharya self-restraint added by Mahavira');
const vKarma = flow('LR', ['Actions bind karma to the soul', 'Karma shapes rebirth', 'Tri-ratnas and discipline shed karma', 'Moksha'], 'Flow: actions bind karma to the soul, karma shapes rebirth, the Tri-ratnas and discipline shed karma, and the soul reaches moksha', 'Karma, rebirth and moksha in Jainism.');
const vEquality = table(['Idea', 'What it means'], [
  ['Souls in all beings', 'Every living being deserves care'],
  ['Path open to all', 'Conduct, not birth, decides progress'],
  ['Later sects', 'Shvetambara and Digambara, in brief'],
], 'Table of Jain ideas on equality: souls in all beings so every being deserves care, a path open to all so conduct and not birth decides progress, and the later sects Shvetambara and Digambara in brief');
const vVowScenes = table(['Imagined scene', 'Vow'], [
  ['A shopkeeper runs after a customer to return a coin', 'Asteya'],
  ['A landowner gives away surplus grain', 'Aparigraha'],
  ['A monk brushes the path before walking', 'Ahimsa'],
  ['A merchant admits a fault in his goods to a buyer', 'Satya'],
], 'Table matching four imagined scenes to vows: returning a coin is asteya, giving away surplus grain is aparigraha, brushing the path is ahimsa, and admitting a fault in goods is satya');
const vBuddhaLife = flow('LR', ['Lumbini: birth', 'Bodh Gaya: enlightenment', 'Sarnath: first sermon', 'Kushinagar: mahaparinirvana'], 'Flow of four sites in the life of the Buddha: Lumbini for birth, Bodh Gaya for enlightenment, Sarnath for the first sermon and Kushinagar for mahaparinirvana', 'Four sites in the Buddha\'s life.');
const vTruths = table(['Noble Truth', 'In brief'], [
  ['First', 'Life involves suffering'],
  ['Second', 'Desire is the cause of suffering'],
  ['Third', 'Suffering can come to an end'],
  ['Fourth', 'The Eightfold Path is the way'],
], 'Table of the Four Noble Truths: life involves suffering, desire is the cause, suffering can come to an end, and the Eightfold Path is the way');
const vEight = table(['Step', 'Right ...', 'Step', 'Right ...'], [
  ['1', 'view', '5', 'livelihood'],
  ['2', 'resolve', '6', 'effort'],
  ['3', 'speech', '7', 'mindfulness'],
  ['4', 'action', '8', 'concentration'],
], 'Table of the eight steps of the Eightfold Path: right view, resolve, speech, action, livelihood, effort, mindfulness and concentration');
const vMiddle = flow('LR', ['Avoid extreme indulgence', 'Avoid extreme self-denial', 'Follow the balanced Middle Path'], 'Flow: avoid extreme indulgence, avoid extreme self-denial, and follow the balanced Middle Path', 'The Middle Path.');
const vNirvana = flow('LR', ['Desire ends', 'The cycle of rebirth ends', 'Nirvana: suffering comes to an end'], 'Flow: when desire ends, the cycle of rebirth ends, and Nirvana is the end of suffering', 'Nirvana.');
const vSangha = table(['Idea', 'Point'], [
  ['Sangha', 'Community of Buddhist monks and nuns'],
  ['Its work', 'Followed rules, preserved and spread the teachings'],
  ['Texts', 'Rules of the Vinaya Pitaka guided the community'],
], 'Table on the Sangha: the community of monks and nuns, which followed rules and preserved and spread the teachings, guided by the rules of the Vinaya Pitaka');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three similarities'],
  ['(ii)', '3', 'Three differences'],
  ['(iii)', '4', 'Appeal to a trader and to a farmer; no ranking'],
], 'Table planning a ten-mark comparison answer: part (i) three similarities for 3 marks, part (ii) three differences for 3 marks, part (iii) appeal to a trader and a farmer without ranking for 4 marks');
const vCompareTable = table(['Feature', 'Jainism', 'Buddhism'], [
  ['Founder or teacher', 'Mahavira, the 24th Tirthankara', 'Siddhartha Gautama, the Buddha'],
  ['Key ideas', 'Tri-ratnas, five vows', 'Four Noble Truths, Eightfold Path'],
  ['Attitude to austerity', 'Strong stress', 'Middle Path'],
  ['Goal', 'Moksha', 'Nirvana'],
  ['Texts', 'The Angas', 'The Tripitakas'],
], 'Table comparing Jainism and Buddhism on founder, key ideas, attitude to austerity, goal and texts');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Jainism and Buddhism — Part 1: Sources and Causes for the Rise of New Faiths',
  goals: [
    'Identify the Angas as Jain texts and the Tripitakas and the Jatakas as Buddhist texts',
    'Explain the religious, social and economic causes that led to the rise of new faiths in the 6th century BCE',
    'Explain how kingdoms and local languages helped the new teachings to spread',
  ],
  slides: [
    sl('title', 'Jainism and Buddhism: sources and causes', {
      b: 'Part 1 — how we know about two new faiths and why they arose.',
      v: vRoute1,
      n: 'In the sixth century before the common era, two new teachers, Mahavira and the Buddha, gained many followers in northern India. In this part we learn which texts tell us about their teachings, and why so many people were ready to listen.',
    }),
    sl('diagram', 'Two founders, one century', {
      b: 'Both teachers are placed in the **sixth century BCE**, but books differ on exact dates.',
      v: vTimeline,
      n: 'Look at the timeline. The Buddha is commonly taught as born about five hundred and sixty three before the common era, and Mahavira about five hundred and forty. Both fall in the sixth century. Books differ on exact dates, so we always say about.',
    }),
    sl('diagram', 'Sources at a glance', {
      v: vSources,
      n: 'Three groups of texts help us. The Angas are the sacred texts of Jainism. The Tripitakas are the sacred texts of Buddhism, composed in the Pali language. The Jatakas are Buddhist stories about the earlier births of the Buddha. In this chapter we need only a brief knowledge of each.',
    }),
    sl('concept', 'The Jain Angas', {
      bl: [
        'The **Angas** are sacred **Jain** texts, **twelve** in tradition.',
        'The teachings were first **passed on orally**.',
        'They were compiled at the **Council of Valabhi**, about the **fifth to sixth century CE**.',
      ],
      v: vAngas,
      n: 'The Angas are sacred Jain texts, twelve in number according to tradition. For a long time the teachings were passed on by word of mouth. They were compiled at the Council of Valabhi, about the fifth to sixth century of the common era. Always say about when you give this date.',
    }),
    sl('concept', 'The Buddhist Tripitakas', {
      bl: [
        '**Tripitaka** means **three baskets**.',
        'The language is **Pali**.',
        'Each Pitaka has its own subject.',
      ],
      v: vPitakas,
      n: 'Tripitaka means three baskets. The Vinaya Pitaka holds rules of conduct for monks and nuns. The Sutta Pitaka holds discourses and teachings attributed to the Buddha. The Abhidhamma Pitaka holds deeper analysis of the teachings. All three were composed in the Pali language, which ordinary people could follow more easily than Sanskrit.',
    }),
    sl('diagram', 'The Jatakas', {
      b: 'A **Jataka** is a story told as an **earlier birth of the Buddha**.',
      v: vJatakas,
      n: 'The Jatakas are stories told as earlier births of the Buddha. Many of them are set among merchants, villagers and travellers, so they give historians glimpses of everyday life. Because they are stories, a historian reads them together with other sources.',
    }),
    sl('check', 'Quick check: match the sources', {
      b: 'Match each source with its description.',
      chk: 'mt_sources',
      n: 'Think about which texts are Jain and which are Buddhist. Then match the Vinaya and Sutta baskets with their contents.',
    }),
    sl('example', 'Worked example 1: choosing the right source', {
      b: 'Read the question, then name the source.',
      bl: [
        'Step 1 — Is the question about Jainism or Buddhism?',
        'Step 2 — Is it about rules, teachings or stories?',
        'Step 3 — Name the text.',
        'Step 4 — Add a caution if the text is a story.',
      ],
      v: vUse,
      n: 'Here is a simple method. First decide whether the question is about Jainism or Buddhism. Then decide whether it asks about rules, teachings or stories. Name the text that fits. Monastic rules go to the Vinaya Pitaka. Jain texts are the Angas. Stories of daily life are found in the Jatakas, to be read with care.',
    }),
    sl('diagram', 'Why new faiths arose', {
      b: 'Historians point to **several causes** working together.',
      v: vCauses,
      n: 'Historians see several causes working together. Some were religious, some social, some economic and some political. The use of local languages also mattered. No single cause explains everything. In the next slides we look at each cause and at how to describe it fairly.',
    }),
    sl('concept', 'Religious causes', {
      bl: [
        '**Complex and costly** rituals and sacrifices.',
        'A **leading place** for priests in ceremonies.',
        '**Sanskrit** not understood by common people.',
      ],
      v: vReligious,
      n: 'Over time, rituals and sacrifices had become complex and costly. Priests held a leading place in ceremonies, and the language of the rites, Sanskrit, was not understood by many ordinary people. The new teachers questioned some of these practices and offered other paths. The older tradition continued alongside them.',
    }),
    sl('concept', 'Social causes', {
      bl: [
        'The **varna system** was becoming **rigid**.',
        '**Kshatriyas** wanted a standing equal to their power.',
        '**Vaishyas** were wealthy but wanted more respect.',
      ],
      v: vSocial,
      n: 'In society, rank was becoming fixed by birth. Kshatriyas, the rulers and warriors, wished for a standing equal to their power. Vaishyas, who earned wealth from trade, wanted more respect than birth alone gave them. Teachings that valued conduct more than birth appealed to many groups.',
    }),
    sl('check', 'Quick check: a villager\'s complaint', {
      b: 'Which cause does the villager\'s letter illustrate?',
      chk: 'm_cause_ritual',
      n: 'Read the letter again. The villager writes about costly rites and a language he cannot follow. Think about which kind of cause that is.',
    }),
    sl('concept', 'Economic causes', {
      bl: [
        'Farming needed **cattle**; large sacrifices used many animals.',
        '**Trade and towns** grew; **Vaishyas** gained wealth.',
        'Both groups found the new teachings **welcoming**.',
      ],
      v: vCattle,
      n: 'Farming depended on oxen and cows, so large sacrifices that used up many animals worried farmers. They welcomed the teaching of ahimsa. At the same time, trade and towns were growing, and Vaishyas gained wealth. Many of them gave gifts to the new teachers and their followers.',
    }),
    sl('diagram', 'Kingdoms and languages', {
      b: 'Rulers and local languages helped the new teachings **spread**.',
      v: vPolitics,
      n: 'Larger kingdoms, such as Magadha, were growing in this age. Rulers gave the new teachers gifts and protection, which helped the teachings spread. The teachers spoke Prakrit and Pali, languages close to everyday speech, so ordinary people could understand them directly.',
    }),
    sl('example', 'Worked example 2: classify the situation', {
      b: 'Sort each imagined situation under a kind of cause.',
      bl: [
        'Step 1 — Read what the person says or does.',
        'Step 2 — Ask: is it about rites, rank, money or rulers?',
        'Step 3 — Name the cause.',
        'Step 4 — Give a one-line reason.',
      ],
      v: vClassify,
      n: 'Try this method. Read what the person says or does. Ask whether it is about rites, rank, money or rulers. Then name the cause and give a one line reason. A villager who cannot follow a long rite shows a religious cause. A rich trader ranked low by birth shows a social cause. A farmer who cannot spare an ox shows an economic cause.',
    }),
    sl('check', 'Quick check: which entry does not belong?', {
      b: 'Find the entry that is NOT a cause.',
      chk: 'm_not_cause',
      n: 'Go through the causes you have just seen. Which entry on the list is not one of them?',
    }),
    sl('example', 'Worked example 3: planning a 10-mark answer', {
      b: 'Question: (i) Three religious causes. [3] (ii) Two social causes and one economic cause. [3] (iii) Kingdoms and languages. [4]',
      bl: [
        '(i) Rituals, priests, language.',
        '(ii) Rigid varna, Vaishya hopes, cattle.',
        '(iii) Royal support, then local languages.',
        'One clear point for each mark.',
      ],
      v: vPlan1,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second and four to the last. Part one gives three religious causes. Part two gives two social causes and one economic cause. Part three explains royal support and the use of local languages, with a closing line that the older tradition continued.',
    }),
    sl('check', 'Quick check: cattle and ahimsa', {
      b: 'Decide whether the assertion and the reason are true.',
      chk: 'ar_cattle',
      n: 'Check each statement on its own first. Then ask whether the reason is correct.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Texts: **Angas** (Jain); **Tripitakas** and **Jatakas** (Buddhist).',
        'Causes: **religious**, **social**, **economic**, **political**.',
        'Local languages: **Prakrit** and **Pali**.',
        'New teachings **questioned** some practices; the older tradition **continued**.',
      ],
      v: vCauses,
      n: 'To sum up. The Angas are Jain texts and the Tripitakas and Jatakas are Buddhist texts. New faiths arose in the sixth century before the common era because of religious, social, economic and political causes, and because teachers used the languages of the people. Describe all of this neutrally and respectfully.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Say **about** with dates.',
        'Name the **faith** with its **text**.',
        'Give **causes in kinds**: religious, social, economic, political.',
        'Use **neutral words**: the teachings **questioned**, never insult any tradition.',
        'Do not rank one faith above another.',
      ],
      n: 'Some exam habits. Add the word about to every date. When you name a text, name its faith too. Group your causes into kinds. Use neutral words and say that the teachings questioned certain practices. Never insult any tradition, and never rank one faith above another.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Jainism and Buddhism — Part 2: The Doctrines, and the Two Faiths Compared',
  goals: [
    'Explain the three jewels of Jainism, the five vows, and the Jain ideas of karma, equality and moksha',
    'State the Four Noble Truths, list the steps of the Eightfold Path and explain Nirvana',
    'Compare Jainism and Buddhism by similarities and differences',
  ],
  slides: [
    sl('title', 'The doctrines of Jainism and Buddhism', {
      b: 'Part 2 — what each teaching asks of a person.',
      v: vRoute2,
      n: 'In this part we look at where the main events took place, then at the doctrines of Jainism and of Buddhism, and finally at how the two faiths are alike and different. As always, we paraphrase the teachings in our own words and treat both faiths with equal respect.',
    }),
    sl('diagram', 'Key sites', {
      b: 'A **schematic** map; it is not drawn to scale.',
      v: vMap,
      n: 'This schematic map is not to scale. Lumbini is traditionally the birthplace of the Buddha. Bodh Gaya is where he attained enlightenment, and Sarnath is where he gave his first sermon. Kushinagar is where he passed away. Mahavira is said to have been born at Kundagrama near Vaishali.',
    }),
    sl('concept', 'Mahavira', {
      v: vMahavira,
      bl: [
        'Born about **540 BCE** near **Vaishali**.',
        'The **twenty-fourth Tirthankara**.',
        'Attained **kevala jnana**; called **Jina**.',
      ],
      n: 'Vardhamana was born about five hundred and forty before the common era at Kundagrama near Vaishali. After years of austere practice he attained kevala jnana, or perfect knowledge. He was called Jina, the conqueror, and Mahavira, the great hero. Jains count him as the twenty fourth Tirthankara, after Parshvanatha.',
    }),
    sl('concept', 'The Tri-ratnas', {
      bl: [
        '**Right faith**: trust in the teachings.',
        '**Right knowledge**: understanding them.',
        '**Right conduct**: living by them.',
      ],
      v: vTriratna,
      n: 'The three jewels, or Tri ratnas, are right faith, right knowledge and right conduct. Right faith is trust in the teachings. Right knowledge is understanding them. Right conduct is living by them. Together they are the path that leads the soul towards moksha, or liberation.',
    }),
    sl('check', 'Quick check: the three jewels', {
      b: 'Match the three actions of an imagined student with the Tri-ratnas.',
      chk: 'm_triratna_scenario',
      n: 'Think about trusting, studying and living by the teachings. Match each with the correct jewel.',
    }),
    sl('concept', 'The five vows', {
      v: vVows,
      bl: [
        'Four vows were taught earlier by **Parshvanatha**.',
        'The fifth, **brahmacharya**, was added by **Mahavira**.',
      ],
      n: 'The five vows are ahimsa, satya, asteya, aparigraha and brahmacharya. Ahimsa is not harming any living being. Satya is truth. Asteya is not taking what is not given. Aparigraha is limiting attachment to possessions. Brahmacharya is self restraint. Parshvanatha taught the first four, and Mahavira added the fifth.',
    }),
    sl('concept', 'Karma, equality and moksha', {
      bl: [
        '**Karma** binds the soul and shapes **rebirth**.',
        '**Equality**: every being has a soul; conduct, not birth, decides progress.',
        '**Moksha**: freedom of the soul from karma.',
      ],
      v: vKarma,
      n: 'In Jain belief, actions bind karma to the soul, and karma shapes rebirth. The path to moksha, the freedom of the soul from karma, is followed through the three jewels and discipline. Jain teaching also holds that all living beings have souls, and that conduct, not birth, decides progress. Later, Jainism divided into two main sects, the Shvetambara and the Digambara.',
    }),
    sl('example', 'Worked example 4: from scene to vow', {
      b: 'Read the scene, find the action, name the vow.',
      bl: [
        'Step 1 — Read what the person does.',
        'Step 2 — Is it about harm, truth, taking, possessions or restraint?',
        'Step 3 — Name the vow.',
        'Step 4 — Explain it in one line.',
      ],
      v: vVowScenes,
      n: 'Use four steps. Read what the person does. Decide whether it is about harm, truth, taking, possessions or restraint. Then name the vow and explain it in one line. Returning a coin is asteya. Giving away surplus grain is aparigraha. Brushing the path before walking is ahimsa. Admitting a fault in goods is satya.',
    }),
    sl('check', 'Quick check: practising the vows', {
      b: 'Match each vow with a way of practising it.',
      chk: 'mt_vows',
      n: 'Use the table of vows. Match each vow with the action that fits it.',
    }),
    sl('concept', 'The Buddha\'s life', {
      b: 'Siddhartha Gautama was born about **563 BCE** (dates vary).',
      v: vBuddhaLife,
      n: 'Siddhartha Gautama is traditionally said to have been born at Lumbini, about five hundred and sixty three before the common era; dates vary. After he left home to seek an answer to suffering, he attained enlightenment at Bodh Gaya. He gave his first sermon at Sarnath and passed away at Kushinagar, an event called mahaparinirvana.',
    }),
    sl('concept', 'The Four Noble Truths', {
      v: vTruths,
      bl: [
        'Life involves **suffering**.',
        '**Desire** is the cause.',
        'Suffering can **end**.',
        'The **Eightfold Path** is the way.',
      ],
      n: 'The Four Noble Truths are the heart of the Buddha\'s teaching. The first truth is that life involves suffering. The second is that desire is the cause of suffering. The third is that suffering can come to an end. The fourth is that the Eightfold Path is the way to end it.',
    }),
    sl('check', 'Quick check: which truth?', {
      b: 'Which Noble Truth does the imagined monk\'s teaching match?',
      chk: 'm_first_truth',
      n: 'Sickness, loss and old age are described. Think about which of the four truths speaks of these.',
    }),
    sl('concept', 'The Eightfold Path', {
      b: 'Eight steps; each begins with the word **right**.',
      v: vEight,
      n: 'The Eightfold Path has eight steps. They are right view, right resolve, right speech, right action, right livelihood, right effort, right mindfulness and right concentration. They guide a person in understanding, conduct and the training of the mind.',
    }),
    sl('check', 'Quick check: order the steps', {
      b: 'Arrange four steps in their traditional order.',
      chk: 'ord_eightfold',
      n: 'Recall the order from the table. Start with view and end with concentration.',
    }),
    sl('concept', 'The Middle Path, Nirvana and the Sangha', {
      bl: [
        'The **Middle Path** avoids **two extremes**.',
        '**Nirvana**: freedom from desire and from rebirth.',
        'The **Sangha** preserved the teachings.',
      ],
      v: vMiddle,
      n: 'The Middle Path avoids two extremes, extreme indulgence and extreme self denial. Nirvana is freedom from desire and from the cycle of rebirth, which brings suffering to an end. The Sangha, the community of monks and nuns, followed rules, preserved the teachings and helped to spread them.',
    }),
    sl('diagram', 'Nirvana and the Sangha', {
      v: vNirvana,
      n: 'When desire comes to an end, the cycle of rebirth comes to an end. This is Nirvana, the end of suffering. It is not a place or a kingdom. The Sangha, the community of monks and nuns, kept the teachings alive and shared them with ordinary people.',
    }),
    sl('diagram', 'The two faiths compared', {
      b: 'Compare in **three boxes**: Jainism, both, Buddhism.',
      v: vCompareFig,
      n: 'This chart compares the two faiths. Both arose in the sixth century before the common era, questioned costly rituals, accepted karma and rebirth, taught ahimsa and used the languages of the people. Jainism stresses strict ahimsa and austerity. Buddhism teaches the Middle Path. Compare without ranking.',
    }),
    sl('example', 'Worked example 5: planning a 10-mark comparison', {
      b: 'Question: (i) Three similarities. [3] (ii) Three differences. [3] (iii) Appeal to a trader and a farmer. [4]',
      bl: [
        '(i) Age, karma, ahimsa.',
        '(ii) Austerity or Middle Path; key ideas; spread.',
        '(iii) One point for the trader, one for the farmer, then a note: no ranking.',
      ],
      v: vPlan2,
      n: 'To plan this answer, give three points to similarities, three to differences, and four to the last part. In the last part, explain why a trader and a farmer could both find the teachings attractive. End with a short note that each faith is studied on its own merits, with no ranking.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Jainism: **Tri-ratnas**, **five vows**, **karma**, **equality**, **moksha**.',
        'Buddhism: **Four Noble Truths**, **Eightfold Path**, **Middle Path**, **Nirvana**, **Sangha**.',
        'Both: **ahimsa**, **karma and rebirth**, local languages.',
      ],
      v: vCompareTable,
      n: 'To sum up. Jainism teaches the three jewels, the five vows, karma, equality and moksha. Buddhism teaches the Four Noble Truths, the Eightfold Path, the Middle Path and Nirvana, and the Sangha preserved the teaching. Both taught ahimsa, accepted karma and rebirth, and used the languages of the people.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        '**Paraphrase** the teachings; do not quote scripture.',
        'Name the **five vows** and the **eight steps** completely.',
        'In a comparison, give **both** faiths in each point.',
        'Say **about** with dates; books differ.',
        'Use **respectful** words for every faith.',
      ],
      n: 'Some exam habits. Put the teachings in your own words and do not try to quote scripture. Learn the five vows and the eight steps completely. In a comparison, mention both faiths in every point. Use the word about with dates. And use respectful words for every faith.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Jainism and Buddhism — notes',
  sections: [
    {
      h: '1. Sources: the Angas, the Tripitakas and the Jatakas',
      t: 1,
      b: '- **Jain texts:** the **Angas**, twelve in tradition, handed down orally and compiled at the **Council of Valabhi**, about the 5th to 6th century CE (books differ).\n- **Buddhist texts:** the **Tripitakas** (**Vinaya** Pitaka: rules for monks and nuns; **Sutta** Pitaka: discourses; **Abhidhamma** Pitaka: deeper analysis), composed in **Pali**.\n- **Jatakas:** stories told as earlier births of the Buddha; many are set among merchants and villagers, so they give glimpses of daily life.\n- A historian reads religious texts **with other sources**.',
      terms: [['Angas', 'Sacred Jain texts, twelve in tradition.'], ['Tripitakas', 'The three baskets of Buddhist teaching, in Pali.'], ['Jatakas', 'Stories of the Buddha\'s earlier births.']],
      v: vSources,
      vs: [vPitakas, vTimeline],
    },
    {
      h: '2. Causes for the rise of new faiths in the 6th century BCE',
      t: 2,
      b: '- **Religious:** rituals and sacrifices had become complex and costly; priests had a leading place; Sanskrit was not understood by many people.\n- **Social:** the varna system was becoming rigid; Kshatriyas and Vaishyas wished for a higher standing.\n- **Economic:** farming needed cattle (ahimsa welcomed); trade and towns grew and Vaishyas gained wealth.\n- **Political:** growth of kingdoms such as Magadha; rulers supported the new teachers.\n- **Language:** Prakrit and Pali were close to everyday speech.\n- The new teachings **questioned** some practices and offered other paths; the older tradition **continued**.',
      terms: [['Prakrit', 'Languages close to everyday speech, used by Jain teachers.'], ['Pali', 'The language of the Buddhist Tripitakas.']],
      v: vCauses,
      vs: [vCattle, vTrade],
    },
    {
      h: '3. Mahavira, the Tri-ratnas and the five vows',
      t: 3,
      b: '- **Vardhamana Mahavira:** born about **540 BCE** at **Kundagrama** near **Vaishali**; the **24th Tirthankara** (Parshvanatha was the 23rd); attained **kevala jnana** after austere practice; called **Jina** and **Mahavira**.\n- **Tri-ratnas:** right faith, right knowledge, right conduct.\n- **Five vows:** ahimsa, satya, asteya, aparigraha, brahmacharya (the fifth added by Mahavira).',
      terms: [['Tirthankara', 'A Jain teacher who shows the path to liberation.'], ['Kevala jnana', 'Perfect knowledge.'], ['Tri-ratnas', 'The three jewels: right faith, right knowledge, right conduct.']],
      v: vMahavira,
      vs: [vTriratna, vVows],
    },
    {
      h: '4. Karma, equality, moksha and later sects',
      t: 3,
      b: '- **Karma:** actions bind karma to the soul and shape rebirth.\n- **Equality:** every living being has a soul; conduct, not birth, decides progress.\n- **Moksha:** liberation of the soul from karma and the cycle of birth, through the Tri-ratnas and discipline.\n- **Later sects (brief):** Shvetambara and Digambara.',
      terms: [['Karma', 'The result of actions, which binds the soul.'], ['Moksha', 'Liberation of the soul.']],
      v: vKarma,
      vs: [vEquality],
    },
    {
      h: '5. The Buddha and the Four Noble Truths',
      t: 4,
      b: '- **Siddhartha Gautama:** born about **563 BCE** at **Lumbini** (dates vary); **enlightenment** at **Bodh Gaya**; **first sermon** at **Sarnath**; **mahaparinirvana** at **Kushinagar**.\n- **Four Noble Truths:** life involves suffering; desire is the cause; suffering can end; the Eightfold Path is the way.',
      terms: [['Mahaparinirvana', 'The Buddha\'s passing away at Kushinagar.'], ['Enlightenment', 'The Buddha\'s attainment of understanding at Bodh Gaya.']],
      v: vBuddhaLife,
      vs: [vTruths, vMap],
    },
    {
      h: '6. Eightfold Path, Middle Path, Nirvana, Sangha and comparison',
      t: 4,
      b: '- **Eightfold Path:** right view, resolve, speech, action, livelihood, effort, mindfulness, concentration.\n- **Middle Path:** avoids extreme indulgence and extreme self-denial.\n- **Nirvana:** freedom from desire and from the cycle of rebirth; the end of suffering.\n- **Sangha:** the community of monks and nuns.\n- **Similarities:** same century; questioned costly rituals; karma and rebirth; ahimsa; local languages; monastic orders.\n- **Differences:** strict austerity and the Tri-ratnas with five vows (Jainism) versus the Middle Path, Four Noble Truths and Eightfold Path (Buddhism); Buddhism spread to many lands.',
      terms: [['Middle Path', 'A balanced way between two extremes.'], ['Nirvana', 'Freedom from desire and from rebirth.'], ['Sangha', 'The Buddhist community of monks and nuns.']],
      v: vEight,
      vs: [vMiddle, vCompareFig],
    },
  ],
  tips: '**Common mistakes**\n- Giving a date without the word about.\n- Confusing the Angas (Jain) with the Tripitakas and Jatakas (Buddhist).\n- Mixing up the five vows with the Tri-ratnas.\n- Listing only seven steps of the Eightfold Path, or confusing it with the Four Noble Truths.\n- Writing that one faith is better than another, or insulting the older tradition.\n- Quoting scripture instead of paraphrasing.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a link or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['The Angas', 'Sacred **Jain** texts, **twelve** in tradition.', 'definition', 1],
  ['Council of Valabhi', 'Where the Angas were compiled, about the **5th to 6th century CE**.', 'fact', 1],
  ['The Tripitakas', 'The **three baskets** of Buddhist teaching, composed in **Pali**.', 'definition', 1],
  ['Vinaya Pitaka', '**Rules of conduct** for monks and nuns.', 'definition', 1],
  ['Sutta Pitaka', '**Discourses** and teachings attributed to the Buddha.', 'definition', 1],
  ['Abhidhamma Pitaka', '**Deeper analysis** of the teachings.', 'definition', 1],
  ['The Jatakas', 'Stories told as **earlier births of the Buddha**; glimpses of daily life.', 'definition', 1],
  ['Religious causes of new faiths', 'Costly rituals; leading place of priests; Sanskrit not understood by many.', 'concept', 2],
  ['Social causes of new faiths', 'Rigid varna system; **Kshatriya** and **Vaishya** hopes for standing.', 'concept', 2],
  ['Economic causes of new faiths', 'Farming needed **cattle**; **trade and towns** grew.', 'concept', 2],
  ['Political cause of new faiths', 'Rise of kingdoms such as Magadha; royal support.', 'concept', 2],
  ['Why Prakrit and Pali mattered', 'They were close to **everyday speech**, so common people understood.', 'concept', 2],
  ['How to describe the new teachings', 'They **questioned** some practices; the older tradition **continued**.', 'concept', 2],
  ['Mahavira: birth', 'About **540 BCE** at **Kundagrama** near Vaishali.', 'fact', 3],
  ['Mahavira: place in tradition', 'The **24th Tirthankara**; Parshvanatha was the 23rd.', 'fact', 3],
  ['Kevala jnana', '**Perfect knowledge**, attained by Mahavira; he was called **Jina**.', 'definition', 3],
  ['The Tri-ratnas', '**Right faith, right knowledge, right conduct.**', 'fact', 3],
  ['The five vows', 'Ahimsa, satya, asteya, aparigraha, brahmacharya.', 'fact', 3],
  ['The fifth vow', '**Brahmacharya**, added by Mahavira.', 'fact', 3],
  ['Jain idea of karma', 'Actions bind karma to the soul and shape **rebirth**.', 'concept', 3],
  ['Jain idea of equality', 'Every being has a soul; **conduct, not birth**, decides progress.', 'concept', 3],
  ['Moksha', '**Liberation** of the soul from karma and the cycle of birth.', 'definition', 3],
  ['Later Jain sects (brief)', '**Shvetambara** and **Digambara**.', 'fact', 3],
  ['Siddhartha Gautama: birth', 'About **563 BCE** at **Lumbini** (dates vary).', 'fact', 4],
  ['Four sites in the Buddha\'s life', 'Lumbini: birth. Bodh Gaya: enlightenment. Sarnath: first sermon. Kushinagar: mahaparinirvana.', 'fact', 4],
  ['The Four Noble Truths', 'Life involves suffering; **desire** is the cause; suffering can **end**; the **Eightfold Path** is the way.', 'fact', 4],
  ['The Eightfold Path', 'Right view, resolve, speech, action, livelihood, effort, mindfulness, concentration.', 'fact', 4],
  ['The Middle Path', 'Avoids **extreme indulgence** and **extreme self-denial**.', 'definition', 4],
  ['Nirvana', 'Freedom from **desire** and from the cycle of **rebirth**; the end of suffering.', 'definition', 4],
  ['The Sangha', 'The **community of Buddhist monks and nuns**.', 'definition', 4],
  ['Jainism and Buddhism: one similarity', 'Both taught **ahimsa** and accepted **karma and rebirth**.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — Jainism and Buddhism',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_pitaka_vinaya', 'm_cause_vaishya', 'm_vows_asteya', 'm_second_truth', 'ar_trade', 's_causes_econ', 's3_four_truths'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_causes', 'l_buddhism'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — Jainism and Buddhism',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_angas_diary', 'm_jataka_label', 'm_cause_cattle', 'm_fifth_vow', 'm_karma', 'm_middle_path', 'm_speech_step', 'ar_vows', 's_angas', 's_language', 's_nirvana', 's3_social_causes', 's3_mahavira'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_sources', 'l_jainism', 'l_compare'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-9-history-civics-ch07 only (the Angas, Tripitakas and Jatakas as sources; causes for the rise of new faiths in the 6th century BCE; Jain doctrines: Tri-ratnas, five vows, karma, equality, moksha; Buddhist doctrines: Four Noble Truths, Eightfold Path, Middle Path, Nirvana, Sangha)',
    originality: 'every diary, letter, exhibition label, school visit and town is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); teachings are paraphrased, no scripture quoted',
    data: 'Buddha born about 563 BCE and Mahavira about 540 BCE (books differ), asserted in order; timeline drawn to scale; schematic map and chart carry their own scale notes',
    facts: 'Angas twelve in tradition, compiled at Valabhi about the 5th to 6th century CE; Tripitakas (Vinaya, Sutta, Abhidhamma) in Pali; Jatakas; causes of the 6th century BCE; Mahavira 24th Tirthankara, Parshvanatha 23rd, Kundagrama near Vaishali, kevala jnana, Jina; Tri-ratnas; five vows with brahmacharya added by Mahavira; karma, equality, moksha; Shvetambara and Digambara; Buddha at Lumbini, Bodh Gaya, Sarnath, Kushinagar; Four Noble Truths; Eightfold Path; Middle Path; Nirvana; Sangha',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
