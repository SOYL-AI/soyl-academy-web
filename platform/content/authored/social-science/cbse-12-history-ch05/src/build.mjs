// Build CBSE 12 History ch05 Through the Eyes of Travellers: Perceptions of Society (c. 10th-17th centuries).
// Run from platform/:  npx tsx content/authored/social-science/cbse-12-history-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch05', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
const vTimeline = (() => {
  const s = new Svg(680, 230);
  const AX = 140;
  const X = (y) => 70 + ((y - 1000) / 700) * 540;
  s.arrow(40, AX, 655, AX, { sw: 1.8 });
  for (let yr = 1000; yr <= 1700; yr += 100) {
    s.line(X(yr), AX - 6, X(yr), AX + 6, { sw: 1.2, color: 'muted' });
    s.text(X(yr), AX + 22, String(yr), { size: 12, muted: true });
  }
  const group = (cx, dots, year, lines) => {
    for (const d of dots) s.dot(X(d), AX, 4, 'accent');
    s.line(cx, AX, cx, 96, { sw: 1.4, color: 'accent' });
    s.text(cx, 20, year, { bold: true, size: 13 });
    lines.forEach((ln, i) => s.text(cx, 40 + i * 18, ln, { size: 12 }));
  };
  group(X(1017), [1017], '1017', ['Al-Biruni is taken', 'to Ghazni']);
  group(X(1343), [1333, 1342, 1354], '1333 to 1354', ['Ibn Battuta in India:', 'Sind 1333, envoy 1342,', 'home in Morocco 1354']);
  group(X(1662), [1656, 1668], '1656 to 1668', ['Bernier in the', 'Mughal Empire']);
  s.text(340, 205, 'Years CE; the short spans are drawn as dots because they are only a few years long', { size: 12, muted: true });
  return s.visual('Timeline from 1000 to 1700 CE with three groups of dots: 1017, Al-Biruni taken to Ghazni; 1333, 1342 and 1354, Ibn Battuta reaching Sind, going as envoy to China and returning to Morocco; and 1656 to 1668, Bernier in the Mughal Empire', 'Three travellers across seven centuries');
})();

const vChapter = (() => {
  const s = new Svg(660, 250);
  s.text(330, 20, 'A typical chapter of the Kitab-ul-Hind (eighty chapters, in Arabic)', { bold: true, size: 14 });
  const boxes = [
    [20, 'Opens with', 'a question'],
    [240, 'Describes the subject', 'from Sanskritic traditions'],
    [460, 'Closes with a', 'comparison with', 'other cultures'],
  ];
  boxes.forEach(([x, ...lines], i) => {
    s.rect(x, 50, 180, 90, { sw: i === 1 ? 2.4 : 1.8, color: i === 1 ? 'accent' : undefined, fill: i === 1 ? 'fill' : undefined });
    lines.forEach((ln, j) => s.text(x + 90, 76 + j * 20, ln, { size: 13, bold: j === 0 }));
  });
  s.arrow(202, 95, 238, 95, { sw: 1.8 });
  s.arrow(422, 95, 458, 95, { sw: 1.8 });
  s.text(330, 176, 'Subjects: religion and philosophy, festivals, astronomy, alchemy,', { size: 12, muted: true });
  s.text(330, 194, 'manners and customs, weights and measures, iconography, laws', { size: 12, muted: true });
  s.text(330, 222, 'The description rests mainly on Sanskrit texts and on the scholars who taught them', { size: 12 });
  return s.visual('Diagram of a typical chapter of the Kitab-ul-Hind in three boxes joined by arrows: it opens with a question, describes the subject from Sanskritic traditions, and closes with a comparison with other cultures; the subjects listed beneath include religion and philosophy, festivals, astronomy, alchemy, customs, weights and measures, iconography and laws', 'Question, description, comparison');
})();

const vChain = (() => {
  const s = new Svg(700, 390);
  const steps = [
    'Emperor owns all land (Bernier\'s claim)',
    'So there is no private property in land',
    'Landholders cannot pass land to their children',
    'So they do not invest in improving the land',
    'Agriculture declines and peasants are oppressed',
    'Very poor mass, small rich ruling class, no middle class',
  ];
  steps.forEach((t, i) => {
    const y = 12 + i * 62;
    s.rect(20, y, 410, 44, { sw: i === 0 ? 2.4 : 1.6, color: i === 0 ? 'accent' : undefined, fill: i === 0 ? 'fill' : undefined });
    s.text(225, y + 22, t, { size: 12 });
    if (i < steps.length - 1) s.arrow(225, y + 44, 225, y + 60, { sw: 1.6 });
  });
  s.rect(455, 12, 225, 200, { sw: 1.6, dash: true, color: 'muted' });
  s.text(567, 34, 'Historians\' doubts', { bold: true, size: 13 });
  const doubts = ['The Ain-i Akbari does not', 'say the state was the', 'sole owner of land.', '', 'Bernier himself describes', 'artisans, workshops and', 'varied towns.'];
  doubts.forEach((ln, i) => ln && s.text(467, 62 + i * 20, ln, { size: 12, anchor: 'start' }));
  return s.visual('Flow diagram of Bernier\'s argument in six boxes joined by arrows: the emperor owns all land; so there is no private property in land; landholders cannot pass land to their children; so they do not invest; agriculture declines and peasants are oppressed; society is a very poor mass and a small rich ruling class with no middle class; beside it a dashed box of historians\' doubts: the Ain-i Akbari does not say the state was sole owner, and Bernier himself describes artisans, workshops and varied towns', 'Bernier\'s chain of argument and the doubts about it');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoute1 = flow('LR', ['Travellers and their accounts', 'Al-Biruni and the Kitab-ul-Hind', 'Barriers and caste', 'Ibn Battuta and the Rihla', 'Cities, post and slaves'], 'Route map of Part 1: travellers and their accounts, Al-Biruni and the Kitab-ul-Hind, his barriers and his account of caste, Ibn Battuta and the Rihla, and his notes on cities, the post and slaves', 'Part 1 at a glance');
const vTrav = table(
  ['Traveller', 'Came from', 'In India', 'Account'],
  [
    ['Al-Biruni', 'Khwarizm (present-day Uzbekistan)', 'After 1017; the Punjab and north India', 'Kitab-ul-Hind, in Arabic'],
    ['Ibn Battuta', 'Tangier, Morocco', 'From 1333; Delhi and beyond', 'Rihla, in Arabic'],
    ['François Bernier', 'France', '1656 to 1668; Mughal Empire', 'Travels in the Mughal Empire'],
  ],
  'Table of three travellers: Al-Biruni from Khwarizm, in India after 1017, author of the Kitab-ul-Hind in Arabic; Ibn Battuta from Tangier, in India from 1333, author of the Rihla in Arabic; and François Bernier from France, in the Mughal Empire from 1656 to 1668, author of Travels in the Mughal Empire',
  'Three travellers at a glance',
);
const vABlife = flow('LR', ['Born in Khwarizm, 973', 'Learns many languages', 'Taken to Ghazni, 1017', 'Studies Sanskrit texts with Brahmana scholars', 'Writes the Kitab-ul-Hind in Arabic'], 'Flow of Al-Biruni\'s life: born in Khwarizm in 973, learns many languages, is taken to Ghazni in 1017, studies Sanskrit texts with Brahmana scholars, and writes the Kitab-ul-Hind in Arabic', 'From Khwarizm to the Kitab-ul-Hind');
const vBarrier = table(
  ['Barrier named by Al-Biruni', 'What it meant'],
  [
    ['Language', 'Sanskrit was very different from Arabic and Persian'],
    ['Belief and practice', 'Religious ideas and customs differed from those he knew'],
    ['Insularity', 'In his view, local people were self-absorbed'],
  ],
  'Table of the three barriers Al-Biruni named: language, since Sanskrit differed from Arabic and Persian; differences of belief and practice; and, in his view, the self-absorption and insularity of local people',
  'Three barriers to understanding',
);
const vCaste = table(
  ['What he did', 'What to note'],
  [
    ['Described the four varnas from Brahmanical texts', 'Reflects the norms of the texts, not everyday practice'],
    ['Compared them with social classes in ancient Persia', 'Showed that divisions were not unique to India'],
    ['Rejected the notion of pollution as against nature', 'His own judgement, not that of his sources'],
  ],
  'Table on caste in the Kitab-ul-Hind: he described the four varnas from Brahmanical texts, which reflect the norms of the texts; compared them with social classes in ancient Persia, showing that divisions were not unique to India; and rejected the notion of pollution as contrary to nature, which was his own judgement',
  'Al-Biruni on caste',
);
const vAnswerAB = table(
  ['Mark', 'What to write (about 20 words each)'],
  [
    ['1', 'Author: Al-Biruni, taken to Ghazni in 1017, studied Sanskrit in north India'],
    ['2', 'Language and size: Arabic, eighty chapters'],
    ['3', 'Subjects: religion, astronomy, festivals, customs, weights and measures, laws'],
    ['4', 'Plan: a question, a description from Sanskritic traditions, a comparison'],
    ['5', 'Sources: Sanskrit texts and scholars, so it reflects their norms'],
  ],
  'Table planning a 5-mark answer on Al-Biruni\'s work: one point each on the author, the language and size, the subjects, the chapter plan, and the sources he used',
  'Five headed points earn five marks',
);
const vIBlife = flow('LR', ['Born in Tangier, 1304', 'Travels in West Asia, Central Asia and East Africa', 'Reaches Sind, 1333', 'Qazi of Delhi', 'Envoy to China, 1342', 'Back in Morocco, 1354'], 'Flow of Ibn Battuta\'s life: born in Tangier in 1304, travels in West Asia, Central Asia and East Africa, reaches Sind in 1333, becomes qazi of Delhi, goes as envoy to China in 1342, and is back in Morocco in 1354', 'The journey of Ibn Battuta');
const vCities = table(
  ['Topic', 'What he noted'],
  [
    ['Delhi', 'A vast and populous city'],
    ['Daulatabad', 'Comparable in size to Delhi'],
    ['Markets', 'Social as well as economic places; music and dancing in some'],
    ['Cloth', 'Cotton, fine muslin and silk in demand in West and Southeast Asia'],
    ['Plants', 'Coconut and paan explained to readers who had not seen them'],
  ],
  'Table of what Ibn Battuta noted: Delhi as a vast and populous city, Daulatabad comparable in size, markets as social and economic places with music and dancing in some, Indian cloth in demand abroad, and the coconut and paan explained to his readers',
  'What caught his eye',
);
const vPost = table(
  ['System', 'Local name', 'How it worked'],
  [
    ['Horse post', 'uluq', 'Royal horses stationed every four miles'],
    ['Foot post', 'dawa', 'Three stations in every mile'],
  ],
  'Table of the two postal systems: the horse post, called uluq, with royal horses every four miles, and the foot post, called dawa, with three stations in every mile',
  'Two kinds of post',
);
const vPostEx = table(
  ['System', 'Rule', 'Stations in 20 miles'],
  [
    ['Horse post', '20 miles divided by 4 miles per station', '5'],
    ['Foot post', '20 miles times 3 stations per mile', '60'],
  ],
  'Table of a worked example for a 20-mile road: the horse post needs 20 divided by 4, which is 5 stations; the foot post needs 20 times 3, which is 60 stations',
);
const vSlave = table(
  ['What he noted', 'What it suggests'],
  [
    ['Slaves sold openly in markets and given as gifts', 'Slavery was a recognised institution'],
    ['Female slaves in the sultan\'s service, some skilled in music and dance', 'Some had specialised roles at court'],
    ['Slaves doing domestic labour, such as carrying palanquins', 'Others did heavy household work'],
    ['Slaves used to keep watch on nobles', 'Some were used for surveillance'],
  ],
  'Table of Ibn Battuta\'s notes on slaves: sold openly in markets and given as gifts; female slaves in the sultan\'s service, some skilled in music and dance; domestic labour such as carrying palanquins; and slaves used to watch nobles, together with what each suggests',
  'Slaves in the Rihla',
);
const vReadNote = flow('LR', ['Who wrote it, and for whom?', 'Seen or told?', 'What was unfamiliar to the writer?', 'What is missing?'], 'Flow of four questions for reading a traveller\'s note: who wrote it and for whom, whether the writer saw it or was told, what was unfamiliar to the writer, and what is missing', 'Four questions for a traveller\'s note');
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Al-Biruni', 'Taken to Ghazni in 1017; Kitab-ul-Hind in Arabic; eighty chapters; question, description, comparison'],
    ['Barriers', 'Language, belief and practice, insularity (in his view)'],
    ['Caste', 'Four varnas from Brahmanical texts; Persian comparison; pollution rejected'],
    ['Ibn Battuta', 'Born 1304; Sind 1333; qazi of Delhi; envoy to China 1342; Rihla in Arabic'],
    ['His notes', 'Cities and markets; cloth; uluq and dawa; slaves of many kinds'],
  ],
  'Summary table of Part 1: Al-Biruni and the Kitab-ul-Hind, his three barriers, his account of caste, Ibn Battuta\'s life and the Rihla, and his notes on cities, cloth, the post and slaves',
);
const vTips1 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Mixing up the two travellers\' centuries', 'Al-Biruni: eleventh century; Ibn Battuta: fourteenth century'],
    ['Writing that Al-Biruni accepted caste rules', 'He used the texts but rejected the notion of pollution'],
    ['Swapping uluq and dawa', 'Uluq: horse post; dawa: foot post'],
    ['Treating a traveller\'s report as plain fact', 'Say what he saw or was told, and note its limits'],
  ],
  'Table of exam mistakes and corrections: Al-Biruni belongs to the eleventh century and Ibn Battuta to the fourteenth; Al-Biruni used the texts but rejected pollution; uluq is the horse post and dawa the foot post; and a traveller\'s report should be treated as a perception with limits',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vRoute2 = flow('LR', ['Bernier and the land question', 'Camp towns and doubts', 'Women and sati', 'Slaves compared', 'Using accounts as sources'], 'Route map of Part 2: Bernier and the land question, camp towns and the doubts about his picture, women and sati, slaves compared, and using travellers\' accounts as sources', 'Part 2 at a glance');
const vBnWho = table(
  ['Item', 'Detail'],
  [
    ['Home', 'France'],
    ['Occupation', 'Physician, philosopher and historian'],
    ['In the Mughal Empire', '1656 to 1668'],
    ['Posts', 'Physician to Prince Dara Shukoh; later attached to the noble Danishmand Khan'],
    ['Book', 'Travels in the Mughal Empire, dedicated to Louis XIV'],
  ],
  'Table about Bernier: from France; a physician, philosopher and historian; in the Mughal Empire from 1656 to 1668; physician to Prince Dara Shukoh and later attached to the noble Danishmand Khan; author of Travels in the Mughal Empire, dedicated to Louis XIV',
  'François Bernier at a glance',
);
const vCamp = table(
  ['Idea', 'Meaning', 'A caution'],
  [
    ['Camp town', 'A town that owed its existence to the imperial camp and would shrink if the court moved', 'Not every urban centre fits the label'],
    ['Share of town dwellers', 'About 15 per cent of people lived in towns in the seventeenth century (a historians\' estimate)', 'On average higher than in western Europe at the time'],
  ],
  'Table on camp towns: a camp town owed its existence to the imperial camp and would shrink if the court moved, though not every urban centre fits the label; and historians estimate that about 15 per cent of people lived in towns in the seventeenth century, on average higher than in western Europe at the time',
  'Camp towns and the share of town dwellers',
);
const vDoubts = table(
  ['Bernier\'s claim', 'What historians point out'],
  [
    ['The emperor owned all land', 'The Ain-i Akbari and other official documents do not say the state was sole owner'],
    ['There was no middle class', 'He himself describes artisans, karkhanas (workshops) and merchants'],
    ['Towns were only camp towns', 'There were varied urban centres'],
    ['India was the inverse of Europe', 'He measured India against France, writing for readers at home'],
  ],
  'Table of Bernier\'s claims and the doubts about them: sole ownership of land by the emperor is not stated in the Ain-i Akbari; no middle class conflicts with his own descriptions of artisans, workshops and merchants; towns were only camp towns although there were varied urban centres; and India as the inverse of Europe reflects his French standard of comparison',
  'Claims and doubts',
);
const vInfl = flow('LR', ['Bernier, 1656 to 1668', 'Montesquieu: oriental despotism', 'Karl Marx: Asiatic mode of production'], 'Flow showing the influence of Bernier\'s ideas: Bernier in 1656 to 1668, then Montesquieu\'s idea of oriental despotism, then Karl Marx\'s idea of the Asiatic mode of production', 'From Bernier to Marx');
const vWeighEx = table(
  ['Claim: a foreigner\'s account is worthless', 'Weighing'],
  [
    ['For', 'A foreigner may misread customs and rely on interpreters'],
    ['Against', 'He may notice what locals take for granted, and many details can be checked'],
    ['Verdict', 'Foreign authorship is a reason for care, not for rejection'],
  ],
  'Table weighing the claim that a foreigner\'s account is worthless: for, a foreigner may misread customs; against, he may notice what locals take for granted and details can be checked; verdict, care but not rejection',
);
const vWomen = table(
  ['What travellers often noticed', 'What they often missed'],
  [
    ['Unusual practices, such as sati', 'Women\'s everyday work in agriculture'],
    ['Elite and court households', 'Women\'s work in making goods'],
    ['Single, striking occasions', 'The ordinary life of village women'],
  ],
  'Table of what travellers noticed about women, which was unusual practices, elite households and single striking occasions, and what they missed, which was women\'s work in agriculture and in making goods and the ordinary life of village women',
  'A partial picture',
);
const vSati = table(
  ['Point', 'Note'],
  [
    ['The practice', 'A widow burnt on her husband\'s funeral pyre; recorded by some observers'],
    ['Why noticed', 'Very different from practices in the observers\' own lands'],
    ['How common', 'Not universal'],
    ['Law', 'Abolished in 1829 under Lord William Bentinck'],
  ],
  'Table on sati: the practice recorded by some observers, why it was noticed because it differed from practices in their own lands, that it was not universal, and that it was abolished by law in 1829 under Lord William Bentinck',
);
const vSlaveCmp = table(
  ['Group', 'How the accounts show them', 'A gap'],
  [
    ['Women', 'Sati; elite households', 'Work in fields and crafts'],
    ['Slaves', 'Markets, gifts, palace roles, domestic labour', 'Numbers and their own views'],
  ],
  'Table comparing how accounts show women, through sati and elite households with a gap in their work in fields and crafts, and slaves, through markets, gifts, palace roles and domestic labour with a gap in numbers and their own views',
  'Women and slaves compared',
);
const vOthers = table(
  ['Traveller', 'Home', 'Note'],
  [
    ['Abdur Razzaq Samarqandi', 'Herat', 'Visited south India in the 1440s'],
    ['Duarte Barbosa', 'Portugal', 'Sixteenth century'],
    ['Jean-Baptiste Tavernier', 'France', 'A jeweller; seventeenth century'],
    ['Niccolao Manucci', 'Italy', 'Seventeenth century'],
  ],
  'Table of other travellers: Abdur Razzaq Samarqandi of Herat, who visited south India in the 1440s; Duarte Barbosa of Portugal in the sixteenth century; Jean-Baptiste Tavernier, a French jeweller of the seventeenth century; and Niccolao Manucci of Italy in the seventeenth century',
  'Other travellers',
);
const vSourceEx = table(
  ['Question', 'For the imagined note'],
  [
    ['Who wrote, and for whom?', 'A jeweller writing for readers at home'],
    ['Seen or told?', 'Seen at a banquet, not in the markets'],
    ['What stood out?', 'Elite women and an unusual occasion'],
    ['What is missing?', 'Women\'s work and everyday life; check revenue and craft records'],
  ],
  'Table applying four questions to an imagined note by a jeweller: the writer is a jeweller writing for readers at home; he saw a banquet, not the markets; elite women and an unusual occasion stood out; women\'s work and everyday life are missing and would need revenue and craft records',
);
const vCross = flow('LR', ['Read the account', 'Ask who, for whom and from whom', 'Compare with chronicles, revenue records, inscriptions', 'Weigh agreement and conflict', 'State a conclusion and its limits'], 'Flow of five steps for cross-checking a traveller\'s account: read it, ask who wrote it, for whom and from whom the information came, compare it with chronicles, revenue records and inscriptions, weigh agreement and conflict, and state a conclusion with its limits', 'Testing a traveller\'s account');
const vChronoEx = table(
  ['Clue in an imagined note', 'Points to', 'Period'],
  [
    ['A French physician attached to the noble Danishmand Khan', 'Bernier', '1656 to 1668'],
    ['A foreign qazi sent by the sultan as envoy to China', 'Ibn Battuta', '1342'],
    ['Scholars taken from Khwarizm to Ghazni', 'Al-Biruni', '1017'],
  ],
  'Table of clues and what they fix: a French physician attached to Danishmand Khan points to Bernier in 1656 to 1668; a foreign qazi sent as envoy to China points to Ibn Battuta in 1342; and scholars taken from Khwarizm to Ghazni point to Al-Biruni in 1017',
  'Clues to a chronology',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Bernier', 'French physician; 1656 to 1668; no private property in land; no middle class; camp towns'],
    ['Doubts', 'Ain-i Akbari; his own descriptions of artisans and towns; French standard'],
    ['Influence', 'Montesquieu: oriental despotism; Marx: Asiatic mode of production'],
    ['Women and slaves', 'Sati noticed because unusual, not universal, banned 1829; women\'s labour overlooked; slaves in varied roles'],
    ['Method', 'Who wrote, for whom, from whom; cross-check; state limits'],
  ],
  'Summary table of Part 2: Bernier\'s claims, the doubts about them, his influence, women and slaves in travellers\' accounts, and the method of testing accounts',
);
const vTips2 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Stating Bernier\'s claim as a fact', 'Present it as his perception and give the doubts'],
    ['Saying the Ain-i Akbari declares state ownership', 'It does not say the state was sole owner'],
    ['Describing sati as universal or typical of women\'s lives', 'Not universal; one thing travellers noticed; abolished in 1829'],
    ['Treating two reports from one informant as two proofs', 'They are not independent'],
  ],
  'Table of exam mistakes and corrections: Bernier\'s claim is a perception with doubts; the Ain-i Akbari does not declare state ownership; sati was not universal or typical of women\'s lives and was abolished in 1829; and two reports from one informant are not independent proofs',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Through the Eyes of Travellers — Part 1: Al-Biruni and Ibn Battuta',
  goals: [
    'Explain Al-Biruni\'s life, the Kitab-ul-Hind, the barriers he named and his account of caste',
    'Describe Ibn Battuta\'s account of cities, markets, the postal system and slaves',
    'Treat each account as a perception shaped by its writer, not as plain fact',
    'Plan short and long answers and read a traveller\'s note with four questions',
  ],
  slides: [
    sl('title', 'Through the Eyes of Travellers', {
      b: 'Part 1: **Al-Biruni** and **Ibn Battuta**, two scholars who wrote about the India they met, and how historians read what they wrote.',
      v: vRoute1,
      n: 'Between the eleventh and the seventeenth centuries many travellers came to India and wrote about what they saw. Their accounts are precious, yet each writer had a home, a purpose and a point of view. In this part we study Al-Biruni and Ibn Battuta, and learn how historians read their books.',
    }),
    sl('concept', 'Who wrote, and from where', {
      b: 'Each traveller came from **outside India**, which makes the account both useful and limited.',
      v: vTrav,
      n: 'Al-Biruni came from Khwarizm, in present day Uzbekistan, and wrote the Kitab-ul-Hind in Arabic. Ibn Battuta was born in Tangier, in Morocco, and his Rihla is also in Arabic. François Bernier was a French physician who wrote about the Mughal Empire. Each came from outside India, and that outside view is what makes their accounts both useful and limited.',
    }),
    sl('diagram', 'Three visits on a timeline', {
      v: vTimeline,
      n: 'Here are the three travellers on a timeline. Al-Biruni was taken to Ghazni in 1017. Ibn Battuta reached Sind in 1333, was sent as envoy to China in 1342 and was back in Morocco in 1354. Bernier lived in the Mughal Empire from 1656 to 1668. Notice how widely the visits are spread across the centuries.',
    }),
    sl('concept', 'Al-Biruni: the scholar', {
      b: 'Born in **973** in Khwarizm; taken to Ghazni in **1017**; studied Sanskrit texts with **Brahmana scholars**.',
      v: vABlife,
      n: 'Al-Biruni was born in 973 in Khwarizm. He learned several languages, including Syriac, Arabic, Persian, Hebrew and Sanskrit. In 1017 Sultan Mahmud of Ghazni invaded Khwarizm and took several scholars to Ghazni, Al-Biruni among them. He spent years in the Punjab and parts of north India, studying religious and philosophical texts with Brahmana scholars.',
    }),
    sl('diagram', 'A chapter of the Kitab-ul-Hind', {
      v: vChapter,
      n: 'The Kitab-ul-Hind was written in Arabic and has eighty chapters. They deal with religion and philosophy, festivals, astronomy, alchemy, manners and customs, social life, weights and measures, iconography and laws. Each chapter usually began with a question, went on to a description based on Sanskritic traditions, and closed with a comparison with other cultures.',
    }),
    sl('check', 'Quick check: the size of the work', {
      b: 'The Kitab-ul-Hind, written in Arabic, is a work of ___ chapters.',
      chk: 'fb_ab80',
      n: 'Recall how the work is arranged and how many parts it has.',
    }),
    sl('concept', 'Three barriers to understanding', {
      b: 'Al-Biruni named **language**, **differences of belief and practice**, and the **insularity** of local people, in his view.',
      v: vBarrier,
      n: 'Al-Biruni named three barriers to understanding India. The first was language, because Sanskrit was very different from Arabic and Persian. The second was difference in religious beliefs and practices. The third, in his view, was the self absorption and insularity of the local people. He tried to overcome the first by learning Sanskrit and by translating works in both directions.',
    }),
    sl('check', 'Quick check: home regions', {
      b: 'Match each traveller with the land from which he came.',
      chk: 'mt_origin',
      n: 'Remember the home region of each traveller.',
    }),
    sl('concept', 'Caste in the Kitab-ul-Hind', {
      b: 'He described the **varnas from Brahmanical texts**, compared them with **Persian classes**, and rejected the notion of **pollution**.',
      v: vCaste,
      n: 'On caste, Al-Biruni described the four varnas from Brahmanical texts and compared them with social classes in ancient Persia. He noted that social divisions were not unique to India. But he disapproved of the notion of pollution, calling it contrary to the laws of nature. Since he relied on Sanskrit texts, his account reflects their norms more than everyday practice.',
    }),
    sl('example', 'Worked example 1: planning a 5-mark answer', {
      b: 'Question: *Describe Al-Biruni\'s work and the way it is organised.*',
      bl: [
        'Step 1 — One point on the **author** and his background.',
        'Step 2 — One point on the **language and size** of the book.',
        'Step 3 — One point on its **subjects**.',
        'Step 4 — One point on the **chapter plan** and one on his **sources**.',
      ],
      v: vAnswerAB,
      n: 'To plan a five mark answer on Al-Biruni\'s work, spend one mark on the author\'s background, one on the language and size of the book, one on its subjects, one on the chapter plan of question, description and comparison, and one on his use of Sanskrit texts. Write each point in a headed line of about twenty words.',
    }),
    sl('check', 'Quick check: translations', {
      b: 'True or false? Al-Biruni translated Sanskrit works into Arabic and parts of Euclid into Sanskrit.',
      chk: 'tf_ab_euclid',
      n: 'Think about the two directions of translation.',
    }),
    sl('concept', 'Ibn Battuta: the traveller', {
      b: 'Born in **Tangier** in **1304**; qazi of Delhi; envoy to **China** in **1342**; back in Morocco in **1354**.',
      v: vIBlife,
      n: 'Ibn Battuta was born in Tangier in 1304, into a family of scholars of Islamic law. He travelled widely in West Asia, Central Asia and East Africa before reaching Sind in 1333. In Delhi, Sultan Muhammad bin Tughlaq made him qazi, or judge. In 1342 the sultan sent him as envoy to the Mongol ruler of China. He returned to Morocco in 1354.',
    }),
    sl('concept', 'What he noticed in the cities', {
      b: 'Delhi and Daulatabad were **vast**; markets were **social** places; Indian **cloth** was in demand abroad.',
      v: vCities,
      n: 'Ibn Battuta described Delhi as a vast and populous city, and said that Daulatabad was comparable in size. He saw that markets were places of social as well as economic activity, with music and dancing in some. He noted that Indian cloth, in cotton, fine muslin and silk, was in great demand in West and Southeast Asia. He also explained the coconut and the paan to readers who had never seen them.',
    }),
    sl('concept', 'The postal system', {
      b: 'The **uluq** was the horse post; the **dawa** was the foot post.',
      v: vPost,
      n: 'He was struck by the postal system. The horse post, called uluq, used royal horses stationed every four miles. The foot post, called dawa, had three stations in every mile. These systems carried news and also goods, such as fruit from Khurasan, very quickly. Remember that this is one traveller\'s report, and its speed needs checking.',
    }),
    sl('example', 'Worked example 2: counting relay stations', {
      b: 'Question: *How many stations are needed along a 20-mile road under each system?*',
      bl: [
        'Step 1 — Write the **rule** for each system.',
        'Step 2 — Horse post: **distance divided by spacing**.',
        'Step 3 — Foot post: **distance times stations per mile**.',
        'Step 4 — State the answer in **words**.',
      ],
      v: vPostEx,
      n: 'Here is a quick calculation. For the horse post, divide the distance by the spacing: twenty miles divided by four gives five stations. For the foot post, multiply the distance by the number of stations in each mile: twenty times three gives sixty. Always write the rule first, then the working, then the answer in words.',
    }),
    sl('check', 'Quick check: names of the post', {
      b: 'The horse post was called ___ and the foot post was called ___.',
      chk: 'fb_uluq',
      n: 'Recall the two local names.',
    }),
    sl('concept', 'Slaves in his account', {
      b: 'Slaves were **sold in markets** and **given as gifts**, and did **varied work**.',
      v: vSlave,
      n: 'Ibn Battuta saw that slaves were openly sold in markets and given as gifts. He also noticed differences among them. Female slaves served in the sultan\'s household, and some were skilled in music and dance. Others did domestic labour, such as carrying palanquins. The sultan also used slaves to keep watch on nobles. His account shows variety, though not numbers or the slaves\' own views.',
    }),
    sl('example', 'Worked example 3: reading a traveller\'s note', {
      b: 'Imagined note: *A visiting scholar writes that the lamps at the festival were lovely and the people eager to explain, but that many customs stayed unclear because the texts were in Sanskrit.*',
      bl: [
        'Step 1 — **Who** wrote it, and for whom?',
        'Step 2 — What did he **see**, and what was he **told**?',
        'Step 3 — What was **unfamiliar** to him?',
        'Step 4 — What is **missing**?',
      ],
      v: vReadNote,
      n: 'When reading a traveller\'s note, ask four questions. Who wrote it, and for whom? What did the writer see, and what was he told? What was unfamiliar to him? And what is missing? In this imagined note, the writer is a scholar, the language problem matches a barrier Al-Biruni named, and nothing is said about the ordinary organisers of the festival.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. Al-Biruni, taken to Ghazni in 1017, wrote the Kitab-ul-Hind in Arabic, with eighty chapters and a pattern of question, description and comparison. He named three barriers and described caste from Brahmanical texts. Ibn Battuta, a Moroccan judge, described cities, markets, cloth, the two posts and slaves. Both accounts are valuable and both need cross checking.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Al-Biruni: **eleventh century**. Ibn Battuta: **fourteenth century**.',
        'Name the **uluq** (horse) and the **dawa** (foot) correctly.',
        'Present caste as **Al-Biruni\'s description from texts**, not as plain fact.',
        'Rejecting **pollution** was his own judgement.',
        'In source questions ask: who wrote it, for whom, and what is missing?',
      ],
      v: vTips1,
      n: 'Some tips. Do not confuse the two travellers: Al-Biruni wrote in the eleventh century and Ibn Battuta in the fourteenth. Name the uluq and the dawa correctly. Present caste as Al-Biruni\'s description from texts, not as a plain fact. In source questions, ask who wrote, for whom, and what is missing.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Through the Eyes of Travellers — Part 2: Bernier, Women and Sources',
  goals: [
    'Explain Bernier\'s views on land and society, the doubts about them and their influence',
    'Describe how travellers recorded women, slaves and sati, and what they missed',
    'Test a traveller\'s account by cross-checking it with other evidence',
    'Weigh a claim, read a source and build a chronology from clues',
  ],
  slides: [
    sl('title', 'Bernier, Women and Sources', {
      b: 'Part 2: **François Bernier** and the East–West comparison, travellers on **women and slaves**, and how to use their accounts as **sources**.',
      v: vRoute2,
      n: 'In this part we study François Bernier and his comparison of East and West, then ask how travellers described women and slaves, and finally learn how to treat any traveller\'s account as a source. Keep asking one question throughout: what did the writer see, and what did he bring with him from home?',
    }),
    sl('concept', 'Bernier: who he was', {
      b: 'A French **physician** in the Mughal Empire from **1656 to 1668**, attached to **Dara Shukoh** and then **Danishmand Khan**.',
      v: vBnWho,
      n: 'François Bernier was a French physician, philosopher and historian. He lived in the Mughal Empire from 1656 to 1668. He was first physician to Prince Dara Shukoh and later attached to the noble Danishmand Khan. His book, Travels in the Mughal Empire, was dedicated to Louis the Fourteenth of France and contrasted India with Europe, especially France.',
    }),
    sl('diagram', 'Bernier\'s chain of argument', {
      v: vChain,
      n: 'This diagram shows his argument. He claimed that the emperor owned all land, so there was no private property in land. Landholders could not pass land to their children, so they did not invest in it. Agriculture declined and peasants were oppressed. Society, he said, was a very poor mass and a small rich ruling class, with no middle class.',
    }),
    sl('check', 'Quick check: his first patron', {
      b: 'Bernier first served as physician to Prince ___.',
      chk: 'fb_bn_dara',
      n: 'Recall the prince whose household he first joined.',
    }),
    sl('concept', 'Camp towns', {
      b: 'A **camp town** owed its existence to the imperial camp. Historians estimate that about **15 per cent** lived in towns.',
      v: vCamp,
      n: 'Bernier called Mughal cities camp towns, meaning that they owed their existence to the imperial camp and would shrink if the court moved. Yet historians have estimated that about fifteen per cent of the population lived in towns in the seventeenth century, which on average was higher than in western Europe at the time. Treat that figure as an estimate.',
    }),
    sl('concept', 'Problems with his picture', {
      b: 'The **Ain-i Akbari** does not say the state was sole owner; he himself describes **artisans and merchants**.',
      v: vDoubts,
      n: 'Historians question his picture on three grounds. Official documents such as the Ain-i Akbari do not say that the state was sole owner of land. He himself described skilled artisans, workshops and merchants, which complicates the claim of no middle class. And he judged India against Europe, presenting it as the opposite and generally inferior.',
    }),
    sl('check', 'Quick check: the Ain-i Akbari', {
      b: 'True or false? The Ain-i Akbari states that the Mughal state was the sole owner of all land.',
      chk: 'tf_bn_ain',
      n: 'Think about what official documents say, and what Bernier claimed.',
    }),
    sl('concept', 'Influence on later thinkers', {
      b: '**Montesquieu**: oriental despotism. **Karl Marx**: Asiatic mode of production.',
      v: vInfl,
      n: 'Bernier\'s ideas travelled far. Montesquieu used such ideas in his theory of oriental despotism, and later Karl Marx took them up in his idea of the Asiatic mode of production. In this way a seventeenth century physician\'s perception shaped European thinking about Asia for centuries, which is why historians test his claims carefully.',
    }),
    sl('example', 'Worked example 1: weighing a claim', {
      b: 'Claim: *A traveller\'s account is worthless because he was a foreigner.* Weigh it.',
      bl: [
        'Step 1 — **For:** a foreigner may misread customs.',
        'Step 2 — **Against:** he may notice what locals take for granted.',
        'Step 3 — Note what can be **checked**.',
        'Step 4 — **Verdict:** care, not rejection.',
      ],
      v: vWeighEx,
      n: 'To weigh a claim, set out both sides. For the claim, a foreigner may misread what he sees. Against it, he may notice what locals take for granted, and many details can be checked. Conclude that foreign authorship is a reason for care and not for rejection, and say which checks you would apply.',
    }),
    sl('concept', 'Women in travellers\' accounts', {
      b: 'Travellers noticed the **unusual** and the **elite**; women\'s **labour** was important but seldom described.',
      v: vWomen,
      n: 'Travellers noticed what was unfamiliar to them. Their accounts of women often focus on unusual practices and on elite households. But women\'s labour was important in agriculture and in non agricultural production, and travellers say little about it. So their accounts show how outsiders perceived women, and must be balanced with other evidence.',
    }),
    sl('two-column', 'Sati: a perception, not the whole picture', {
      cols: [
        '**What was recorded:** several observers described sati, the practice of a widow being burnt on her husband\'s funeral pyre, because it differed from practices in their own lands.',
        '**What to remember:** it was not universal, it was not the whole of women\'s lives, and it was abolished by law in **1829** under **Lord William Bentinck**.',
      ],
      v: vSati,
      n: 'Several travellers recorded sati, the practice of a widow being burnt on her husband\'s funeral pyre. They wrote about it because it was so different from practices at home. It was not universal, and it was not the whole of women\'s lives. It was later abolished by law in 1829, under Lord William Bentinck.',
    }),
    sl('check', 'Quick check: how common?', {
      b: 'True or false? Sati was practised everywhere in India in the centuries covered by travellers\' accounts.',
      chk: 'tf_w_sati',
      n: 'Think about why travellers wrote about it.',
    }),
    sl('concept', 'Women and slaves compared', {
      b: 'Both appear mostly in **elite or unusual scenes** seen by outsiders. Each source has a **gap**.',
      v: vSlaveCmp,
      n: 'Compare how the sources show women and slaves. Both appear mostly in elite or unusual scenes seen by outsiders. For women, the gap is work in fields and crafts. For slaves, Ibn Battuta shows varied roles but gives no numbers and no voice to the slaves themselves. A good comparison names what each source shows and what it leaves out.',
    }),
    sl('concept', 'Other travellers', {
      b: 'Each traveller had a different **purpose**, so each noticed different things.',
      v: vOthers,
      n: 'Other travellers also wrote about India. Abdur Razzaq Samarqandi visited south India in the 1440s. Duarte Barbosa was a Portuguese traveller of the sixteenth century. Jean Baptiste Tavernier was a French jeweller and Niccolao Manucci an Italian, both of the seventeenth century. Each had a different purpose, so each noticed different things.',
    }),
    sl('example', 'Worked example 2: reading a source', {
      b: 'Imagined note: *A visiting jeweller writes at length about the palace women he met at a banquet, but not about the women selling thread at the gate.* Analyse it.',
      bl: [
        'Step 1 — **Who** wrote, and for whom?',
        'Step 2 — **Seen or told?**',
        'Step 3 — What **stood out**?',
        'Step 4 — What is **missing**, and where could it be found?',
      ],
      v: vSourceEx,
      n: 'Read the note in four steps. The writer is a jeweller, whose business took him to rich households. He tells us what he saw at a banquet, not in markets. The unusual and the elite are over represented. What is missing is women\'s work and everyday life, so a historian would look for revenue or craft records to balance it.',
    }),
    sl('concept', 'Cross-checking an account', {
      b: 'Compare with **chronicles**, **revenue records** and **inscriptions**, then state a conclusion with its **limits**.',
      v: vCross,
      n: 'Historians treat travellers\' accounts as evidence to be tested. They ask who wrote, for whom and from whom the information came. They compare the account with Persian chronicles, revenue records and inscriptions. Then they weigh the points of agreement and conflict, and state a conclusion with its limits. Travellers wrote for readers at home, noticed the unfamiliar and depended on informants.',
    }),
    sl('check', 'Quick check: the method', {
      b: 'Arrange these steps in a sensible order for testing a traveller\'s claim.',
      chk: 'ord_method',
      n: 'Think about what comes first and what comes last.',
    }),
    sl('example', 'Worked example 3: a chronology from clues', {
      b: 'Clue: *A note mentions a French physician attached to a noble named Danishmand Khan.* Where does it belong?',
      bl: [
        'Step 1 — Match the **clue** to a traveller.',
        'Step 2 — Recall the traveller\'s **dates**.',
        'Step 3 — Place the note **within** that period.',
        'Step 4 — Repeat for **each clue** and order them.',
      ],
      v: vChronoEx,
      n: 'To build a chronology from clues, match each clue with a traveller. A French physician attached to Danishmand Khan points to Bernier, so the note belongs between 1656 and 1668. A foreign qazi sent as envoy to China points to Ibn Battuta in 1342. Scholars taken from Khwarizm to Ghazni point to Al-Biruni in 1017.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. Bernier argued that the lack of private property in land explained decline and a society without a middle class, but historians doubt this, pointing to the Ain-i Akbari and to his own descriptions. His ideas influenced Montesquieu and Marx. Accounts of women and slaves show what outsiders noticed, not everything. Always cross-check travellers\' accounts.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Present Bernier\'s claims as his **perception**, with the doubts.',
        'The **Ain-i Akbari** does not say the state was sole owner.',
        'Sati was **not universal**; it was banned in **1829**.',
        'Two reports from **one informant** are not two proofs.',
        'Always end with a **conclusion and its limits**.',
      ],
      v: vTips2,
      n: 'Some tips. Present Bernier\'s claims as his perception and give the doubts. Remember that the Ain-i Akbari does not say the state was sole owner. Sati was not universal and was banned in 1829. Two reports from one informant are not two proofs. And always end a source answer with a conclusion and its limits.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Through the Eyes of Travellers — Notes',
  sections: [
    {
      h: '1. Al-Biruni and his world',
      t: 1,
      b: '**Al-Biruni** was born in **973** in **Khwarizm**, in present-day Uzbekistan. He studied in several languages (Syriac, Arabic, Persian, Hebrew and Sanskrit). When Sultan **Mahmud of Ghazni** invaded his homeland in **1017**, he was among the scholars carried to Ghazni. He then spent years in the Punjab and parts of north India, where he learned Sanskrit and read religious and philosophical texts with **Brahmana scholars**. He also translated Sanskrit works, among them one on grammar by Patanjali, into Arabic, and parts of Euclid into Sanskrit.',
      terms: [
        ['Kitab-ul-Hind', 'Al-Biruni\'s Arabic work on India, in eighty chapters.'],
        ['Sanskritic traditions', 'The learned texts and teachings in Sanskrit on which his descriptions were based.'],
      ],
      v: vTimeline,
      vs: [vTrav, vABlife],
    },
    {
      h: '2. The Kitab-ul-Hind: plan, barriers and caste',
      t: 1,
      b: 'The work has **eighty chapters** on religion and philosophy, festivals, astronomy, alchemy, customs, social life, weights and measures, iconography and laws. A chapter usually opened with a **question**, continued with a **description** from Sanskritic traditions and ended with a **comparison** with other cultures.\n\n**Barriers** he named: the gulf between Sanskrit and Arabic or Persian; differences in religious belief and practice; and what he saw as the self-absorption and insularity of local people.\n\n**Caste:** he gave the four varnas as the texts describe them, set them beside classes in ancient Persia, and observed that divisions were not peculiar to India. He did not accept the idea of pollution, which he held to be against nature. Because his guides were Brahmanical texts, his picture shows their norms more than daily life.',
      terms: [
        ['Varna', 'One of the four divisions of society described in Brahmanical texts.'],
        ['Pollution', 'The notion that contact with some people or things makes others impure; Al-Biruni rejected it.'],
      ],
      v: vChapter,
      vs: [vBarrier, vCaste],
    },
    {
      h: '3. Ibn Battuta and the Rihla',
      t: 2,
      b: '**Ibn Battuta** was born in **Tangier**, Morocco, in **1304**, into a family of scholars of Islamic law. After travelling in West Asia, Central Asia and East Africa he reached **Sind in 1333**. **Muhammad bin Tughlaq** made him **qazi** of Delhi, and in **1342** sent him as envoy to the Mongol (Yuan) ruler of China. He returned to Morocco in **1354**. His account, the **Rihla**, is in Arabic and was dictated and recorded by Ibn Juzayy.\n\nHe wrote for readers far away, so he explained things unknown to them, such as the **coconut** and the **paan** (betel leaf).',
      terms: [
        ['Rihla', 'Ibn Battuta\'s Arabic travel account, recorded after he returned to Morocco.'],
        ['Qazi', 'A judge who decides cases by Islamic law.'],
      ],
      v: vIBlife,
      vs: [vTimeline],
    },
    {
      h: '4. Cities, trade, the post and slaves',
      t: 2,
      b: '**Cities and markets:** Delhi was a vast, populous city and Daulatabad was comparable in size. Markets were social as well as economic centres, with music and dancing in some. **Trade:** Indian cotton, fine muslin and silk were in great demand in West and Southeast Asia.\n\n**Post:** the **uluq** (horse post) had royal horses every four miles; the **dawa** (foot post) had three stations in every mile. They carried news and goods, such as fruit from Khurasan, quickly, and impressed him.\n\n**Slaves:** they were sold openly in markets and given as gifts. Some female slaves served the sultan and were skilled in music and dance; others did domestic labour such as carrying palanquins; the sultan also used slaves to watch the nobles.',
      terms: [
        ['Uluq and dawa', 'The horse post and the foot post of the sultanate.'],
        ['Palanquin', 'A covered seat carried on the shoulders of bearers.'],
      ],
      v: vCities,
      vs: [vPost, vSlave],
    },
    {
      h: '5. François Bernier and the East–West comparison',
      t: 3,
      b: '**Bernier** was a French physician, philosopher and historian, in the Mughal Empire from **1656 to 1668**. He served **Prince Dara Shukoh** as physician and was later attached to the noble **Danishmand Khan**. His book, *Travels in the Mughal Empire*, was dedicated to **Louis XIV** and set India against Europe, especially France, as its inverse and generally its inferior.\n\n**Key claim:** the emperor owned all land, so there was **no private property in land**. Landholders could not pass land to their children and so did not invest; agriculture declined and peasants were oppressed; society was a very poor mass and a small rich ruling class, with **no middle class**; towns were **camp towns**.\n\n**Doubts:** the **Ain-i Akbari** and other official documents do not say the state was sole owner; Bernier himself described artisans, **karkhanas** (workshops) and merchants. Historians estimate that about 15 per cent of people lived in towns in the seventeenth century, on average more than in western Europe then.\n\n**Influence:** **Montesquieu** (oriental despotism) and **Karl Marx** (Asiatic mode of production).',
      terms: [
        ['Camp town', 'A town that, in Bernier\'s view, depended on the imperial camp and would shrink if the court left.'],
        ['Karkhana', 'A workshop where artisans made goods.'],
      ],
      v: vChain,
      vs: [vBnWho, vCamp, vDoubts],
    },
    {
      h: '6. Women, slaves and sati in the accounts',
      t: 4,
      b: 'Travellers noticed what looked unfamiliar. **Sati**, the practice of a widow being burnt on her husband\'s funeral pyre, was recorded by some observers because it was so different from practices in their own lands. It was not universal and was abolished by law in **1829** under **Lord William Bentinck**.\n\nWomen\'s lives were far wider. Their **labour** was important in agriculture and in non-agricultural production, but travellers often wrote about the unusual and about **elite households**.\n\n**Slaves** appear in Ibn Battuta\'s notes in many roles. To compare women and slaves, ask what each account shows, whose eyes it uses and what it leaves out. Other travellers who wrote about India include Abdur Razzaq Samarqandi (south India, 1440s), Duarte Barbosa (Portuguese, sixteenth century), Jean-Baptiste Tavernier (French jeweller) and Niccolao Manucci (Italian), the last two of the seventeenth century.',
      terms: [
        ['Sati', 'The practice of a widow being burnt on her husband\'s funeral pyre, recorded by some travellers.'],
        ['Perception', 'How an observer saw something, shaped by his own background and purpose.'],
      ],
      v: vWomen,
      vs: [vSati, vSlaveCmp, vOthers],
    },
    {
      h: '7. Travellers\' accounts as sources',
      t: 5,
      b: 'Travellers wrote for readers at home, noticed what was **unfamiliar**, depended on **interpreters** or particular informants, and compared what they saw with their own societies. Their accounts are valuable, but they must be **cross-checked** against Persian chronicles, revenue records and inscriptions.\n\n**Reading a passage:** ask who wrote it, for whom, whether the writer saw or was told, what stood out and what is missing. Two reports that rest on one informant are not independent. State a conclusion together with its limits.\n\nIn SOYL practice, source passages are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
      terms: [
        ['Cross-checking', 'Testing a claim against other, independent kinds of evidence.'],
        ['Informant', 'A person from whom a traveller learned what he reports.'],
      ],
      v: vCross,
      vs: [vReadNote, vChronoEx],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up the centuries of Al-Biruni (eleventh), Ibn Battuta (fourteenth) and Bernier (seventeenth).\n- Writing that Al-Biruni accepted every caste rule; he used Brahmanical texts but rejected the notion of pollution.\n- Swapping uluq (horse post) and dawa (foot post).\n- Stating Bernier\'s claims as facts, or writing that the Ain-i Akbari declares state ownership of land.\n- Describing sati as universal or as the whole of women\'s lives.\n- Treating a traveller\'s report as plain fact instead of a perception with limits.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); assess, compare and evaluate questions need evidence on more than one side and a judgement.\n- Source questions (4 marks): parts (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Where was Al-Biruni from?', '**Khwarizm**, in present-day Uzbekistan; born in 973.', 'fact', 1],
  ['What brought Al-Biruni to Ghazni?', 'Sultan Mahmud\'s invasion of Khwarizm in **1017**; scholars were taken away.', 'fact', 1],
  ['Language of the Kitab-ul-Hind', '**Arabic**; eighty chapters.', 'fact', 1],
  ['Plan of a chapter', 'Question, description from Sanskritic traditions, comparison with other cultures.', 'concept', 1],
  ['Subjects in the Kitab-ul-Hind', 'Religion and philosophy, festivals, astronomy, alchemy, customs, weights and measures, laws.', 'fact', 1],
  ['Three barriers named by Al-Biruni', 'Language; differences of belief and practice; insularity of local people (in his view).', 'concept', 1],
  ['Al-Biruni on caste', 'Described the varnas from **Brahmanical texts**, compared with Persia, rejected **pollution**.', 'concept', 1],
  ['**Sanskritic traditions**', 'The learned texts and teachings in Sanskrit on which Al-Biruni based his descriptions.', 'definition', 1],
  ['Translations by Al-Biruni', 'Patanjali\'s grammar into Arabic; parts of **Euclid** into Sanskrit.', 'fact', 1],
  ['Limit of the Kitab-ul-Hind', 'Relies on Brahmanical texts: shows their norms, not daily practice.', 'exam-tip', 1],
  ['Where was Ibn Battuta from?', '**Tangier**, Morocco; born in 1304.', 'fact', 2],
  ['Ibn Battuta in India', 'Reached Sind in **1333**; qazi of Delhi under Muhammad bin Tughlaq.', 'fact', 2],
  ['1342 and 1354', 'Sent as envoy to China in 1342; back in Morocco in 1354.', 'fact', 2],
  ['**Rihla**', 'Ibn Battuta\'s Arabic account, recorded by Ibn Juzayy.', 'definition', 2],
  ['Why explain coconut and paan?', 'He wrote for readers far away who had never seen them.', 'concept', 2],
  ['Uluq and dawa', '**Uluq**: horse post, every four miles. **Dawa**: foot post, three stations per mile.', 'fact', 2],
  ['Indian cloth in his account', 'Cotton, fine muslin and silk in demand in West and Southeast Asia.', 'fact', 2],
  ['Slaves in the Rihla', 'Sold in markets, given as gifts; roles from music and dance to carrying palanquins; used to watch nobles.', 'fact', 2],
  ['**Bernier**', 'French physician, in the Mughal Empire **1656 to 1668**; physician to Dara Shukoh.', 'fact', 3],
  ['Bernier\'s key claim', 'Emperor owned all land, so **no private property in land**.', 'concept', 3],
  ['His chain of argument', 'No inheritance, no investment, decline, oppressed peasants, no middle class.', 'concept', 3],
  ['**Camp town**', 'A town depending on the imperial camp, in Bernier\'s view.', 'definition', 3],
  ['Doubts about Bernier', 'Ain-i Akbari does not say the state was sole owner; he describes artisans and merchants.', 'concept', 3],
  ['Share living in towns', 'About 15 per cent in the seventeenth century (historians\' estimate; more than western Europe).', 'fact', 3],
  ['Influence of Bernier', '**Montesquieu**: oriental despotism. **Marx**: Asiatic mode of production.', 'fact', 3],
  ['Why did travellers write about sati?', 'It was very different from practices at home; it was not universal.', 'concept', 4],
  ['Sati and the law', 'Abolished in **1829** under Lord William Bentinck.', 'fact', 4],
  ['What did travellers often miss about women?', 'Women\'s **labour** in agriculture and in making goods.', 'concept', 4],
  ['Comparing women and slaves', 'Ask what each account shows, whose eyes it uses and what it leaves out.', 'exam-tip', 4],
  ['Why cross-check an account?', 'Writers wrote for readers at home, noticed the unfamiliar and used informants.', 'concept', 5],
  ['Sources for cross-checking', 'Persian chronicles, revenue records, inscriptions.', 'fact', 5],
  ['Reading a traveller\'s passage', 'Who wrote, for whom? Seen or told? What stood out? What is missing?', 'exam-tip', 5],
  ['Two reports, one informant', 'Not independent: they do not confirm each other.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Through the Eyes of Travellers',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ab_fit', 'm_ib_post_calc', 'm_w_conflict', 'ar_bn_camp'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_ab_barriers', 's_slave_limits', 's3_bn_checks'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_ab_assess', 'l_women_slaves'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_ib'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Through the Eyes of Travellers',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ab_caste', 'm_ab_attrib', 'm_ib_born', 'm_ib_position', 'm_bn_weaken', 'm_bn_sale', 'm_w_fit', 'm_m_weigh', 'ar_ib_delhi', 'ar_w_labour'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_ib_post', 's_bn_claim', { attempt: 1, keys: ['s_m_cross', 's_w_two'] }, 's3_ab_apply', { attempt: 1, keys: ['s3_ib_post_check', 's3_w_partial'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_ib_describe', { attempt: 1, keys: ['l_bn_evaluate', 'l_method'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_women', 'sb_bn'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch05 only (Al-Biruni and the Kitab-ul-Hind; Ibn Battuta\'s Rihla; Bernier and the East–West comparison; women, slaves and sati in travellers\' accounts; source-based practice)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; no traveller is quoted, translated or closely paraphrased; no NCERT text, source box, caption, map or exercise and no board or sample-paper item reused (D-036)',
    facts: 'Al-Biruni born 973 in Khwarizm, taken to Ghazni 1017, Kitab-ul-Hind in Arabic with 80 chapters; Ibn Battuta born 1304 in Tangier, Sind 1333, envoy to China 1342, Morocco 1354, uluq every four miles and dawa three stations per mile; Bernier 1656–1668, about 15 per cent in towns (historians\' estimate); sati abolished 1829 under Lord William Bentinck; no maps (OA-23)',
    neutrality: 'caste, religion, women, slavery and sati presented as travellers\' perceptions with their biases examined; sati described in one neutral line, not universal, abolished by law in 1829; no lurid detail',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
