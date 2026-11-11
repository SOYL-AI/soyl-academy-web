// Build CBSE 12 History ch02 Kings, Farmers and Towns. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-history-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch02', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps: OA-23)
// Timeline in four label lanes (far above, near below, near above, far below) so neighbouring labels never collide.
function timeline(items, alt, caption, y0, y1) {
  const s = new Svg(680, 360);
  const AX = 180;
  const X = (y) => 70 + ((y - y0) / (y1 - y0)) * 540;
  s.arrow(40, AX, 650, AX, { sw: 1.8 });
  for (let yr = y0; yr <= y1; yr += 100) s.line(X(yr), AX - 6, X(yr), AX + 6, { sw: 1.2, color: 'muted' });
  const LANES = [20, AX + 30, 92, AX + 102];
  items.forEach(([yr, yearLabel, label], i) => {
    const top = LANES[i % 4];
    const above = top < AX;
    const lines = label.split(' | ');
    s.dot(X(yr), AX, 6, 'accent');
    s.line(X(yr), AX, X(yr), above ? top + 12 + lines.length * 18 : top - 12, { sw: 1.4, color: 'accent' });
    s.text(X(yr), top, yearLabel, { bold: true, size: 13 });
    lines.forEach((ln, j) => s.text(X(yr), top + 18 + j * 18, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}
const T1 = [
  [-600, '6th c. BCE', 'Sixteen | mahajanapadas'],
  [-321, 'c. 321 BCE', 'Mauryan empire | founded'],
  [-250, '3rd c. BCE', 'Ashoka | and dhamma'],
  [-150, 'from 2nd c. BCE', 'Cholas, Cheras, | Pandyas'],
  [0, 'c. start of CE', 'Land grants | recorded'],
  [50, '1st c. CE', 'Kushana | gold coins'],
  [350, '4th c. CE', 'Guptas | rise'],
  [550, 'c. 6th c. CE', 'Fewer gold | coins found'],
];
const vTimeline = timeline(
  T1,
  `Timeline from 600 BCE to 600 CE: ${T1.map(([, y, l]) => `${y}, ${l.replace(' | ', ' ')}`).join('; ')}`,
  'Six centuries of kings, farmers and towns',
  -600, 600,
);

const vMagadhaSvg = (() => {
  const s = new Svg(760, 250);
  s.rect(270, 12, 220, 48, { color: 'accent', sw: 2 });
  s.text(380, 36, 'The rise of Magadha', { bold: true });
  const boxes = [
    ['Fertile land', ['Farming, people,', 'revenue']],
    ['Iron mines', ['In present-day', 'Jharkhand: tools', 'and weapons']],
    ['Forests', ['Elephants for', 'the army']],
    ['Rivers', ['The Ganga and', 'its tributaries']],
    ['Rulers', ['Bimbisara,', 'Ajatasattu,', 'Mahapadma Nanda']],
  ];
  boxes.forEach(([h, ls], i) => {
    const x = 6 + i * 152;
    s.arrow(380, 60, x + 70, 118, { sw: 1.5, color: 'muted' });
    s.rect(x, 120, 140, 104, { sw: 1.6 });
    s.text(x + 70, 142, h, { bold: true });
    ls.forEach((ln, j) => s.text(x + 70, 166 + j * 19, ln, { size: 12 }));
  });
  return s.visual('Diagram: the rise of Magadha at the top, with arrows to five factors: fertile land (farming, people and revenue), iron mines in present-day Jharkhand (tools and weapons), forests (elephants for the army), the Ganga and its tributaries (rivers), and ambitious rulers such as Bimbisara, Ajatasattu and Mahapadma Nanda', 'Natural advantages and human choices');
})();

const vMaurya = (() => {
  const s = new Svg(760, 270);
  s.rect(270, 12, 220, 56, { color: 'accent', sw: 2 });
  s.text(380, 34, 'Pataliputra', { bold: true });
  s.text(380, 54, 'Capital', { size: 13 });
  const names = ['Taxila', 'Ujjayini', 'Tosali', 'Suvarnagiri'];
  names.forEach((n, i) => {
    const x = 20 + i * 180;
    s.arrow(380, 68, x + 80, 126, { sw: 1.5, color: 'muted' });
    s.rect(x, 128, 160, 62, { sw: 1.6 });
    s.text(x + 80, 152, n, { bold: true });
    s.text(x + 80, 174, 'Provincial centre', { size: 12 });
  });
  s.text(380, 224, 'Control strongest around the capital and the provincial centres', { size: 13 });
  s.text(380, 246, 'Links by land routes and river routes (diagram of the structure only)', { size: 12, muted: true });
  return s.visual('Diagram of the structure of the Mauryan empire: Pataliputra, the capital, at the top, linked to four provincial centres, Taxila, Ujjayini, Tosali and Suvarnagiri; administrative control was strongest around the capital and the provincial centres. The diagram shows structure only and not positions on the ground', 'Five political centres');
})();

const vCoinsSvg = (() => {
  const s = new Svg(760, 190);
  const stages = [
    ['Punch-marked', 'Silver, copper', 'from c. 6th c. BCE'],
    ['Indo-Greek', 'Names and images', 'of rulers'],
    ['Kushana', 'Gold on a large', 'scale, c. 1st c. CE'],
    ['Gupta', 'Gold coins,', 'remarkably pure'],
    ['From c. 6th c. CE', 'Fewer gold coins', 'found (debated)'],
  ];
  stages.forEach(([h, a, b], i) => {
    const x = 6 + i * 152;
    s.rect(x, 40, 140, 110, { sw: 1.6, color: i === 4 ? 'accent' : undefined });
    s.text(x + 70, 66, h, { bold: true, size: 13 });
    s.text(x + 70, 98, a, { size: 12 });
    s.text(x + 70, 118, b, { size: 12 });
    if (i < 4) s.arrow(x + 140, 95, x + 152, 95, { sw: 1.5, color: 'muted' });
  });
  return s.visual('Sequence of coin types: punch-marked silver and copper coins from about the sixth century BCE; Indo-Greek coins with the names and images of rulers; Kushana gold coins on a large scale from about the first century CE; Gupta gold coins, remarkably pure; and from about the sixth century CE fewer gold coins found, which historians debate', 'Coins in sequence');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Prinsep and Piyadassi', 'The mahajanapadas', 'The rise of Magadha', 'The Mauryan empire', 'Ashoka and dhamma'], 'Route map of Part 1: Prinsep and Piyadassi, the mahajanapadas, the rise of Magadha, the Mauryan empire, and Ashoka and dhamma', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['New ideas of kingship', 'Farmers and rural society', 'Land grants', 'Towns and trade', 'Coins and inscriptions'], 'Route map of Part 2: new ideas of kingship, farmers and rural society, land grants, towns and trade, and coins and inscriptions', 'Part 2 at a glance');
const vPrinsep = table(
  ['Question', 'Answer'],
  [
    ['Who?', 'James Prinsep, an officer of the East India Company\'s mint'],
    ['When?', 'The 1830s; Ashokan Brahmi read by 1838'],
    ['What did he find?', 'Most inscriptions name a king as Piyadassi, meaning pleasant to behold'],
    ['How was the king identified?', 'An inscription naming Ashoka was found; some also used devanampiya'],
  ],
  'Table about Prinsep: an officer of the East India Company\'s mint, in the 1830s, who found that most inscriptions name a king as Piyadassi, meaning pleasant to behold; the king was identified as Ashoka when an inscription naming Ashoka was found',
  'Prinsep and Piyadassi',
);
const vScripts = table(
  ['Script or language', 'Where it was used'],
  [
    ['Prakrit', 'The language of most Ashokan inscriptions'],
    ['Brahmi', 'Most of the subcontinent'],
    ['Kharosthi', 'The north-west'],
    ['Aramaic and Greek', 'Some inscriptions in Afghanistan'],
  ],
  'Table: Prakrit was the language of most Ashokan inscriptions; Brahmi was used in most of the subcontinent, Kharosthi in the north-west, and Aramaic and Greek for some inscriptions in Afghanistan',
);
const vEpigraphy = flow('LR', ['Find and copy the inscription', 'Read the script', 'Compare copies', 'Check with other evidence', 'Use with care'], 'Flow of epigraphy: find and copy the inscription, read the script, compare copies, check with other evidence, and use with care', 'How an epigraphist works');
const vMaha = table(
  ['Type of state', 'Examples', 'Rule'],
  [
    ['Monarchy', 'Magadha, Koshala, Avanti', 'A king, expected by the Dharmasutras to be a Kshatriya'],
    ['Gana or sangha', 'Vajji', 'A group of men sharing power'],
    ['Common features', 'Many capitals fortified', 'Taxes, tribute, raids and armies'],
  ],
  'Table of mahajanapadas: monarchies such as Magadha, Koshala and Avanti ruled by a king who the Dharmasutras expected to be a Kshatriya; ganas or sanghas such as the Vajji ruled by a group of men; and common features of fortified capitals, taxes, tribute, raids and armies',
  'Kings and ganas',
);
const vCapitals = table(
  ['Capital', 'What it was like', 'When'],
  [
    ['Rajagaha (Rajgir)', 'A fortified settlement among hills', 'Earlier capital of Magadha'],
    ['Pataliputra (Patna)', 'A new capital on the Ganga', 'From the fourth century BCE'],
  ],
  'Table of Magadha\'s capitals: Rajagaha, a fortified settlement among hills, was the earlier capital, and Pataliputra, on the Ganga, became the capital from the fourth century BCE',
);
const vSources = table(
  ['Source', 'What it offers', 'Caution'],
  [
    ['Archaeology', 'Remains of settlements and objects', 'Only what survives'],
    ['Megasthenes\' account', 'A Greek ambassador\'s view of the empire', 'Survives only in fragments'],
    ['Arthashastra', 'A text on government', 'Only parts are probably by Kautilya or Chanakya'],
    ['Later texts', 'Buddhist, Jaina, Puranic and Sanskrit works', 'Composed later'],
    ['Ashoka\'s inscriptions', 'The king\'s own message on rocks and pillars', 'His view, not everyday life'],
  ],
  'Table of sources for the Mauryan empire: archaeology, Megasthenes\' account which survives only in fragments, the Arthashastra of which only parts are probably by Kautilya or Chanakya, later Buddhist, Jaina, Puranic and Sanskrit works, and Ashoka\'s inscriptions which give the king\'s own view',
  'Five kinds of evidence',
);
const vCommittee = table(
  ['Subcommittee for', 'Task'],
  [
    ['The navy', 'Coordinate sea and river forces'],
    ['Transport and supplies', 'Move and feed the army'],
    ['Foot soldiers', 'Infantry'],
    ['Horses', 'Cavalry'],
    ['Chariots', 'War chariots'],
    ['Elephants', 'War elephants'],
  ],
  'Table of the six subcommittees mentioned by Megasthenes for coordinating military activity: the navy, transport and supplies, foot soldiers, horses, chariots and elephants',
  'A committee with six subcommittees',
);
const vDhamma = table(
  ['Principle of dhamma', 'In practice'],
  [
    ['Respect for elders', 'A moral rule for everyone'],
    ['Generosity', 'To Brahmanas and renouncers'],
    ['Kindness', 'To servants and slaves'],
    ['Tolerance', 'Respect for the religions and traditions of others'],
    ['How it spread', 'Dhamma mahamattas and inscriptions'],
  ],
  'Table of Ashoka\'s dhamma: respect for elders, generosity to Brahmanas and renouncers, kindness to servants and slaves, respect for the religions and traditions of others, and spread through dhamma mahamattas and inscriptions',
  'Dhamma was moral advice, not a new religion',
);
const vAnswer5 = table(
  ['Mark', 'What to write (about 20 words each)'],
  [
    ['1', 'What dhamma was: moral principles'],
    ['2', 'How it was spread: mahamattas and inscriptions'],
    ['3', 'How it could help hold the empire together'],
    ['4', 'Limits: the king\'s own words; uneven control'],
    ['5', 'Your judgement, with a reason'],
  ],
  'Table planning a 5-mark answer on Ashoka\'s dhamma: what it was, how it was spread, how it could help the empire, the limits of the evidence, and a reasoned judgement',
  'Five headed points earn five marks',
);
const vControl = table(
  ['Evidence', 'What it suggests'],
  [
    ['Five political centres', 'Rule was organised around a few strong points'],
    ['Control strongest near the capital and provincial centres', 'Control was weaker elsewhere'],
    ['Communication by land and river routes', 'Links existed, but along routes'],
    ['Conclusion', 'Uneven control, not the same rule everywhere'],
  ],
  'Table weighing the evidence on Mauryan control: five political centres suggest rule organised around a few strong points; strongest control near the capital and provincial centres suggests weaker control elsewhere; communication by land and river routes suggests links along routes; the conclusion is uneven control',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Prinsep', 'Deciphered Brahmi and Kharosthi in the 1830s; Piyadassi'],
    ['Mahajanapadas', 'Sixteen; kings and ganas; fortified capitals'],
    ['Magadha', 'Land, iron, elephants, rivers, ambitious rulers'],
    ['Mauryas', 'Five centres; uneven control; sources need care'],
    ['Dhamma', 'Moral principles spread by mahamattas'],
  ],
  'Summary table of Part 1: Prinsep and the 1830s decipherment, the sixteen mahajanapadas, the reasons for Magadha\'s rise, the Mauryan empire with five centres and uneven control, and dhamma as moral principles',
);
const vTips1 = table(
  ['Do', 'Avoid'],
  [
    ['Name both Brahmi and Kharosthi', 'Saying Ashoka\'s edicts were in Sanskrit'],
    ['Give natural and human reasons for Magadha', 'Giving only one kind of reason'],
    ['Say control was uneven', 'Writing that the whole subcontinent was ruled alike'],
    ['Call dhamma moral principles', 'Calling dhamma a new religion'],
  ],
  'Table of exam tips for Part 1: name both Brahmi and Kharosthi, give natural and human reasons for Magadha, say Mauryan control was uneven, and call dhamma moral principles, avoiding the opposite mistakes',
);
const vKingship = table(
  ['Ruler or group', 'How status was claimed', 'Where we read of it'],
  [
    ['Kushanas', 'Title devaputra; colossal statues at Mat near Mathura and in Afghanistan', 'Statues and titles'],
    ['Chiefs of Tamilakam', 'Cholas, Cheras, Pandyas; known from Sangam texts', 'Sangam texts'],
    ['Guptas', 'Depended on samantas; praised in prashastis', 'Prayaga prashasti by Harishena'],
  ],
  'Table of ideas of kingship: the Kushanas used the title devaputra and colossal statues at Mat near Mathura and in Afghanistan; the Cholas, Cheras and Pandyas of Tamilakam are known from Sangam texts; the Guptas depended on samantas and were praised in prashastis such as the Prayaga prashasti by Harishena',
  'Three ways of presenting kingship',
);
const vSouth = table(
  ['Question', 'Answer'],
  [
    ['Who?', 'Chiefs and kings: Cholas, Cheras, Pandyas'],
    ['Where?', 'Tamilakam, the Tamil-speaking south'],
    ['Since when?', 'From about the second century BCE'],
    ['How do we know?', 'Sangam texts mention them'],
  ],
  'Table about southern chiefs and kings: the Cholas, Cheras and Pandyas of Tamilakam, from about the second century BCE, known from Sangam texts',
);
const vPrashasti = flow('LR', ['A court poet', 'Writes praise of the king', 'Cut on stone: Harishena and Samudragupta at Prayaga', 'Historians read it with care'], 'Flow of a prashasti: a court poet writes praise of the king, it is cut on stone as in the Prayaga prashasti of Harishena for Samudragupta, and historians read it with care', 'Reading a prashasti');
const vJataka = flow('LR', ['Jataka and Panchatantra stories', 'Hints of heavy taxes', 'Tension between kings and subjects', 'Check against other evidence'], 'Flow: stories in the Jatakas and the Panchatantra hint at heavy taxes, which suggest tension between kings and subjects, to be checked against other evidence', 'Stories as hints');
const vProduction = table(
  ['Strategy', 'Note'],
  [
    ['Iron-tipped ploughshare', 'Used in the Ganga and Kaveri valleys'],
    ['Transplanting paddy', 'Raised yields'],
    ['Hoe', 'Used in drier regions'],
    ['Irrigation', 'Wells, tanks and canals; some built by communities or individuals'],
  ],
  'Table of strategies to raise production: the iron-tipped ploughshare in the Ganga and Kaveri valleys, transplanting paddy, the hoe in drier regions, and irrigation by wells, tanks and canals, some built by communities or individuals',
  'Ways to raise production',
);
const vAgri = table(
  ['Group', 'Term and note'],
  [
    ['Landless agricultural labourers', 'Worked for others'],
    ['Small peasants', 'Worked their own plots'],
    ['Large landholders', 'Vellalar in Tamil; gahapati in Pali means a household head who controlled land'],
    ['Ploughmen and slaves', 'Uzhavar and adimai in Sangam texts'],
  ],
  'Table of rural groups: landless agricultural labourers, small peasants, large landholders called vellalar in Tamil, with gahapati in Pali meaning a household head who controlled land, and ploughmen and slaves called uzhavar and adimai in the Sangam texts',
  'Differences in the countryside',
);
const vGrants = flow('LR', ['A ruler or queen', 'Gives land, recorded on copper plates', 'Brahmanas or a religious institution', 'Agrahara', 'Historians debate the reasons'], 'Flow of land grants: a ruler or queen gives land, recorded on copper plates, to Brahmanas or a religious institution; land given to Brahmanas is called agrahara; historians debate the reasons', 'Land grants');
const vGrantViews = table(
  ['View', 'Idea', 'What would support it'],
  [
    ['Extend farming', 'Grants brought new land under the plough', 'Evidence of waste or forest land farmed afterwards'],
    ['Win allies', 'Kings gained supporters where control was weak', 'Grants in distant or loosely held areas'],
    ['Show power', 'A grant displayed the ruler\'s authority', 'Public records and ceremonies'],
  ],
  'Table weighing three views of land grants: extending farming, supported by evidence of waste or forest land farmed afterwards; winning allies, supported by grants in distant or loosely held areas; and showing power, supported by public records and ceremonies',
);
const vTowns = table(
  ['Evidence', 'What it shows'],
  [
    ['Cities such as Pataliputra, Ujjayini, Puhar and Mathura', 'Towns on trade routes and coasts'],
    ['Northern Black Polished Ware', 'Fine glossy pottery at urban sites'],
    ['Short donor inscriptions', 'Washing folk, weavers, scribes, carpenters, potters, goldsmiths, blacksmiths, officials and merchants'],
    ['Shrenis', 'Guilds of craftspeople and merchants'],
  ],
  'Table of evidence about towns: cities such as Pataliputra, Ujjayini, Puhar and Mathura on routes and coasts; Northern Black Polished Ware at urban sites; short donor inscriptions naming many occupations; and shrenis or guilds',
  'Evidence of towns and crafts',
);
const vTrade = table(
  ['Aspect', 'Details'],
  [
    ['Routes', 'Land, river and sea routes to North Africa, West Asia, Southeast Asia and China'],
    ['Goods', 'Salt, grain, cloth, metal ores, stone, timber, medicinal plants, spices'],
    ['Pepper', 'Highly valued in the Roman Empire'],
    ['Traders', 'Peddlers, mariners and merchants'],
  ],
  'Table of trade: land, river and sea routes to North Africa, West Asia, Southeast Asia and China; goods such as salt, grain, cloth, metal ores, stone, timber, medicinal plants and spices; pepper highly valued in the Roman Empire; and traders including peddlers, mariners and merchants',
  'Trade routes and goods',
);
const vHoard = table(
  ['A hoard of Roman coins in the south', 'Yes or no'],
  [
    ['Coins reached the region', 'Yes'],
    ['This fits trade in valued goods such as pepper', 'Yes, as a likely reading'],
    ['Roman officials ruled the region', 'No: not shown by the find'],
    ['All trade was with Rome', 'No: not shown by the find'],
  ],
  'Table on reading a hoard of Roman coins in the south: coins reached the region, yes; this fits trade in goods such as pepper, yes as a likely reading; Roman officials ruled the region, no, not shown; all trade was with Rome, no, not shown',
);
const vLimits = table(
  ['What inscriptions give', 'Limits'],
  [
    ['Words of rulers and donors', 'Record what the makers wished to say'],
    ['Names, titles, gifts', 'Letters may be faint, damaged or missing'],
    ['Evidence for many occupations', 'Meanings of some words are uncertain'],
    ['A fixed record in stone or metal', 'Many more existed than survive; not all are read'],
  ],
  'Table of what inscriptions give and their limits: the words of rulers and donors, but they record what the makers wished to say; names, titles and gifts, but letters may be faint, damaged or missing; evidence for many occupations, but meanings of some words are uncertain; a fixed record, but many more existed than survive and not all are read',
  'Uses and limits of inscriptions',
);
const vReadInscr = flow('LR', ['Who made it and why?', 'What does it say?', 'What does it leave out?', 'What other evidence checks it?'], 'Flow for reading an inscription source: who made it and why, what it says, what it leaves out, and what other evidence checks it', 'Four questions for a source');
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Kingship', 'Kushana devaputra; Tamil chiefs; Guptas and samantas; prashastis'],
    ['Farmers', 'Iron ploughshare, paddy transplanting, irrigation; vellalar, uzhavar, adimai'],
    ['Land grants', 'Copper plates; agrahara; debated reasons'],
    ['Towns and trade', 'Pepper, Roman coins, guilds, donor records'],
    ['Coins', 'Punch-marked, Indo-Greek, Kushana gold, Gupta purity'],
  ],
  'Summary table of Part 2: kingship, farmers and rural terms, land grants, towns and trade, and coins',
);
const vTips2 = table(
  ['Do', 'Avoid'],
  [
    ['Present land grant reasons as a debate', 'Stating one reason as settled fact'],
    ['Say a hoard shows trade, not rule', 'Writing that Rome ruled the south'],
    ['Treat a prashasti as praise by a court poet', 'Quoting it as plain fact'],
    ['Note that fewer gold coins is debated', 'Writing that trade certainly collapsed'],
  ],
  'Table of exam tips for Part 2: present land grant reasons as a debate, say a hoard shows trade and not rule, treat a prashasti as praise by a court poet, and note that fewer gold coins is debated, avoiding the opposite mistakes',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Kings, Farmers and Towns — Part 1: Reading Inscriptions, Mahajanapadas and the Mauryas',
  goals: [
    'Explain how Prinsep\'s decipherment of Brahmi and Kharosthi changed the study of early history',
    'Describe the sixteen mahajanapadas and explain the rise of Magadha',
    'Describe Mauryan administration and the sources historians use for it',
    'Evaluate Ashoka\'s dhamma and the limits of the evidence about it',
  ],
  slides: [
    sl('title', 'Kings, Farmers and Towns', {
      b: 'Part 1 — from **Prinsep and Piyadassi** and the **mahajanapadas** to the **Mauryan empire** and **Ashoka\'s dhamma**.',
      v: vRoute1,
      n: 'Between about 600 BCE and 600 CE the subcontinent saw kingdoms, empires, farming villages and busy towns grow. In this first part we begin with the scholar who learned to read the oldest inscriptions. Then we study the sixteen mahajanapadas, the rise of Magadha, the Mauryan empire, and the ideas of Ashoka.',
    }),
    sl('concept', 'Prinsep and the puzzle of Piyadassi', {
      b: '**James Prinsep**, an officer of the East India Company\'s mint, deciphered **Brahmi** and **Kharosthi** in the 1830s. He found that most inscriptions named a king as **Piyadassi**, "pleasant to behold".',
      v: vPrinsep,
      n: 'In the 1830s James Prinsep, an officer of the East India Company\'s mint, worked out how to read the Brahmi and Kharosthi scripts. He found that most of the inscriptions he read named a king called Piyadassi, a word meaning pleasant to behold. Some also used the title devanampiya. Who was this king? The answer came when an inscription naming Ashoka was found.',
    }),
    sl('concept', 'Scripts and languages', {
      b: 'Most Ashokan inscriptions are in **Prakrit**. Brahmi was used in most of the subcontinent and **Kharosthi** in the north-west; **Aramaic and Greek** appear in Afghanistan.',
      v: vScripts,
      n: 'Most of Ashoka\'s inscriptions were composed in Prakrit. Brahmi was used in most of the subcontinent, while Kharosthi was used in the north-west. In Afghanistan, some inscriptions were written in Aramaic and Greek. Once these scripts could be read, historians could for the first time study the words of an early ruler directly, instead of relying only on what later writers said.',
    }),
    sl('check', 'Quick check: Prinsep', {
      b: 'True or false? Prinsep served in the mint of the East India Company.',
      chk: 'tf_prinsep',
      v: vPrinsep,
      n: 'Recall where Prinsep worked, then decide whether the statement is true or false.',
    }),
    sl('concept', 'Epigraphy: reading inscriptions', {
      b: '**Epigraphy** is the study of inscriptions. Historians copy the letters, read the script, compare copies and check the result against other evidence.',
      v: vEpigraphy,
      n: 'Epigraphy is the study of inscriptions. An epigraphist copies the letters, reads the script and compares different copies. Because letters may be worn or missing, the reading is then checked against other evidence. Prinsep followed this careful method, and historians still follow its basic steps.',
    }),
    sl('concept', 'The sixteen mahajanapadas', {
      b: 'In the **sixth century BCE**, Buddhist and Jaina texts name **sixteen mahajanapadas**, among them Magadha, Koshala, Kuru, Panchala, Gandhara, Avanti and Vajji.',
      bl: ['Capitals were often fortified', 'Rulers collected taxes and tribute, raided neighbours and kept armies'],
      v: vMaha,
      n: 'In the sixth century BCE, Buddhist and Jaina texts name sixteen great states, the mahajanapadas. They include Magadha, Koshala, Kuru, Panchala, Gandhara, Avanti and Vajji. Their capitals were often fortified. Their rulers collected taxes and tribute, raided their neighbours and kept armies, which is how some states grew stronger than others.',
    }),
    sl('two-column', 'Kings and ganas', {
      cols: ['**Monarchies:** most mahajanapadas had a king. Brahmanas composed **Dharmasutras**, rules which expected rulers to be Kshatriyas.', '**Ganas or sanghas:** a few states, such as the **Vajji**, were ruled by a group of men who shared power.'],
      v: vMaha,
      n: 'Most mahajanapadas were ruled by kings. Brahmanas composed rules called Dharmasutras, which expected rulers to be Kshatriyas. A few states were different. In a gana or sangha, such as the Vajji, a group of men shared power. Remember that these were two kinds of government among the sixteen, and that monarchies were the majority.',
    }),
    sl('diagram', 'Why Magadha rose', {
      v: vMagadhaSvg,
      n: 'Between the sixth and fourth centuries BCE, Magadha became the most powerful state. Its land was fertile. There were iron mines in present-day Jharkhand, and forests supplied elephants for war. The Ganga and its tributaries helped communication. Buddhist and Jaina writers also credited ambitious rulers, such as Bimbisara, Ajatasattu and Mahapadma Nanda, helped by able ministers.',
    }),
    sl('concept', 'Two capitals', {
      b: '**Rajagaha** (Rajgir), a fortified settlement among hills, was the first capital. In the fourth century BCE the capital shifted to **Pataliputra** (Patna).',
      v: vCapitals,
      n: 'Magadha\'s first capital was Rajagaha, today called Rajgir, a fortified settlement among hills. In the fourth century BCE the capital shifted to Pataliputra, today called Patna, on the Ganga. A hill fortress and a river capital show two different ideas of what a capital needed to do.',
    }),
    sl('example', 'Worked example 1: building a chronology', {
      b: 'Question: *Arrange these in order: Ashoka\'s reign; the sixteen mahajanapadas; Kushana gold coins; the founding of the Mauryan empire.*',
      bl: [
        'Step 1 — Note the **anchor dates**: sixth century BCE, c. 321 BCE, third century BCE, first century CE.',
        'Step 2 — **BCE runs backwards**: a larger BCE number is earlier.',
        'Step 3 — Write the order: mahajanapadas, Mauryan empire, Ashoka, Kushana gold coins.',
      ],
      v: vTimeline,
      n: 'To build a chronology, first note an anchor date for each event. The mahajanapadas belong to the sixth century BCE, the Mauryan empire begins around 321 BCE, Ashoka reigns in the third century BCE, and Kushana gold coins belong to the first century CE. Remember that BCE years run backwards, so a larger number means an earlier time.',
    }),
    sl('diagram', 'The Mauryan empire: five centres', {
      v: vMaurya,
      n: 'Chandragupta Maurya founded the empire around 321 BCE, extending it to Afghanistan and Baluchistan. His grandson Ashoka conquered Kalinga, in coastal Odisha. There were five major political centres: Pataliputra, the capital, and Taxila, Ujjayini, Tosali and Suvarnagiri. Control was strongest around the capital and the provincial centres. This diagram shows only the structure, not positions on the ground.',
    }),
    sl('concept', 'Sources for the Mauryan empire', {
      v: vSources,
      n: 'Historians use five kinds of evidence for the Mauryan empire. There is archaeology. There is the account of Megasthenes, which survives only in fragments. There is the Arthashastra, parts of which were probably composed by Kautilya or Chanakya. There are later Buddhist, Jaina and Puranic texts. And there are Ashoka\'s own inscriptions. Each has its limits, so they are best used together.',
    }),
    sl('check', 'Quick check: names and descriptions', {
      b: 'Match each item connected with the Mauryan empire with its description.',
      chk: 'mt_sources',
      v: vSources,
      n: 'Think about who wrote each source and what role each name played in the empire.',
    }),
    sl('concept', 'A committee for the army', {
      b: 'Megasthenes mentions a **committee with six subcommittees** to coordinate military activity.',
      v: vCommittee,
      n: 'Megasthenes mentions a committee with six subcommittees. Together they coordinated military activity. One looked after the navy, one transport and supplies, and the others foot soldiers, horses, chariots and elephants. Notice how the army is divided by the kind of force, and remember that this is the report of a visitor.',
    }),
    sl('concept', 'Ashoka\'s dhamma', {
      b: 'Ashoka asked people to follow **dhamma**: respect for elders, generosity to Brahmanas and renouncers, kind treatment of servants and slaves, and respect for the religions and traditions of others. **Dhamma mahamattas** carried the message.',
      v: vDhamma,
      n: 'Ashoka\'s dhamma was a set of moral principles. People were asked to respect their elders, to be generous to Brahmanas and renouncers, to treat servants and slaves kindly, and to respect the religions and traditions of others. Special officers called dhamma mahamattas were appointed to carry the message, and it was also cut on rocks and pillars.',
    }),
    sl('check', 'Quick check: the officers', {
      b: 'Ashoka appointed special officers called dhamma ___ to spread his message.',
      chk: 'fb_mahamatta',
      v: vDhamma,
      n: 'Recall the name of the officers who carried the message of dhamma.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: 'Question: *Assess the importance of Ashoka\'s dhamma.*',
      bl: [
        'Step 1 — Say what dhamma **was**: moral principles.',
        'Step 2 — Say **how it spread**: mahamattas and inscriptions.',
        'Step 3 — Say how it could help an empire of many peoples.',
        'Step 4 — Name the **limits**: the king\'s own words, uneven control.',
        'Step 5 — End with a **judgement** and a reason.',
      ],
      v: vAnswer5,
      n: 'Here is how to plan a five mark answer on dhamma. First say what it was, a set of moral principles. Then say how it spread. Next say how it could help hold together an empire of many peoples. Then give the limits of the evidence, because the edicts are the king\'s own words. Finish with a judgement. Any well argued view can score.',
    }),
    sl('example', 'Worked example 3: weighing the evidence on control', {
      b: 'Question: *Did the Mauryas rule the whole subcontinent in the same way?*',
      bl: [
        'Step 1 — Name the **claim** to be tested.',
        'Step 2 — Give the **evidence**: five centres; control strongest near the capital and provincial centres.',
        'Step 3 — **Infer**: control was weaker elsewhere.',
        'Step 4 — **Conclude** with a qualified answer.',
      ],
      v: vControl,
      n: 'Evaluation questions ask you to weigh evidence. First name the claim, that the Mauryas ruled everywhere in the same way. Next give the evidence, five political centres and control that was strongest around the capital and provincial centres. Then infer that control was weaker elsewhere. Conclude with a careful answer: the empire was large, but its control was uneven.',
    }),
    sl('check', 'Quick check: is dhamma a religion?', {
      b: 'True or false? Ashoka\'s dhamma was a new religion with its own priests and rituals.',
      chk: 'tf_dhamma',
      v: vDhamma,
      n: 'Think about what dhamma asked of people, including how they should treat other faiths.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. Prinsep deciphered Brahmi and Kharosthi in the 1830s, and Piyadassi was identified as Ashoka. Sixteen mahajanapadas existed in the sixth century BCE, mostly monarchies, with a few ganas. Magadha rose through land, iron, elephants, rivers and ambitious rulers. The Mauryan empire had five centres and uneven control. Ashoka\'s dhamma was a set of moral principles spread by mahamattas.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name **both** Brahmi and Kharosthi; do not say the edicts were in Sanskrit.',
        'Give **natural and human** reasons for Magadha\'s rise.',
        'Say control was **uneven**; do not claim identical rule everywhere.',
        'Call dhamma **moral principles**, not a new religion.',
        'In source questions, say whose view it gives and what it leaves out.',
      ],
      v: vTips1,
      n: 'A few tips. Name both Brahmi and Kharosthi. Give both natural and human reasons when you explain the rise of Magadha. Say that Mauryan control was uneven. Call dhamma a set of moral principles, not a new religion. And in source questions, always say whose view the source gives and what it leaves out.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Kings, Farmers and Towns — Part 2: Kingship, Farmers, Towns and Coins',
  goals: [
    'Explain new ideas of kingship under the Kushanas, southern chiefs and the Guptas',
    'Describe changes in rural society and explain the debate about land grants',
    'Describe towns, trade networks and the evidence of coins',
    'Read inscriptions critically and state their limits as evidence',
  ],
  slides: [
    sl('title', 'Kingship, Farmers and Towns', {
      b: 'Part 2 — how rulers claimed **status**, how **farmers** and **land grants** changed the countryside, and how **towns, trade and coins** tell their story.',
      v: vRoute2,
      n: 'In Part 2 we look at how rulers presented themselves, how farming and land grants changed the countryside, and how towns, trade and coins show a busy economy. We end by asking an important historian\'s question: how far can inscriptions be trusted, and what do they leave out?',
    }),
    sl('concept', 'Rulers claim a high status', {
      b: 'The **Kushanas** (c. 1st century BCE to 1st century CE) took the title **devaputra**, and installed **colossal statues** at a shrine at **Mat** near Mathura and in Afghanistan.',
      v: vKingship,
      n: 'The Kushanas ruled from about the first century BCE to the first century CE. They adopted the title devaputra, meaning son of god, and installed colossal statues of themselves in a shrine at Mat, near Mathura, and in Afghanistan. These were ways of claiming that a king stood close to the divine, a new idea of kingship.',
    }),
    sl('concept', 'Chiefs of the south', {
      b: 'From about the **second century BCE**, chiefs and kings of **Tamilakam**, the **Cholas, Cheras and Pandyas**, are mentioned in the **Sangam texts**.',
      v: vSouth,
      n: 'In the Tamil-speaking south, called Tamilakam, there were chiefs and kings from about the second century BCE. The best known are the Cholas, the Cheras and the Pandyas. We know of them from Sangam texts, early Tamil poems, which mention them and their dealings with others.',
    }),
    sl('concept', 'Guptas, samantas and prashastis', {
      b: 'The **Guptas** (from c. 4th century CE) depended on **samantas**. A **prashasti** is a praise composed by a court poet; the Prayaga prashasti was composed by **Harishena** for **Samudragupta**.',
      v: vPrashasti,
      n: 'The Gupta rulers, from about the fourth century CE, depended on samantas, powerful local lords. Kings were also praised in prashastis, poems of praise by court poets. A famous example is the Prayaga prashasti, composed by Harishena for Samudragupta and cut on a pillar. Historians read it for what it says, but remember that it is praise.',
    }),
    sl('check', 'Quick check: a title', {
      b: 'Which title did the Kushana kings adopt to claim a god-like status?',
      chk: 'm_kushana_title',
      v: vKingship,
      n: 'Think of the title that means son of god.',
    }),
    sl('concept', 'Kings and subjects', {
      b: 'Stories in the **Jatakas** and the **Panchatantra** suggest tension between kings and subjects over **heavy taxes**. Stories are hints, not records.',
      v: vJataka,
      n: 'Stories in the Jatakas and the Panchatantra hint that heavy taxes could cause tension between kings and their subjects. Historians use such stories carefully. A story can show what worried people, but it is not a dated record, so its hints should be checked against other evidence.',
    }),
    sl('concept', 'Raising production', {
      b: 'Strategies to raise production included the **iron-tipped ploughshare**, **transplanting paddy**, the **hoe** in drier regions, and **irrigation** by wells, tanks and canals.',
      v: vProduction,
      n: 'Farmers and rulers used several strategies to raise production. The iron-tipped ploughshare spread in the Ganga and Kaveri valleys. Paddy was transplanted. In drier regions the hoe was used. Irrigation by wells, tanks and canals helped too, and some of these were built by communities or by individuals, not only by kings.',
    }),
    sl('concept', 'Who worked the land?', {
      b: 'Rural society was unequal: **landless labourers**, **small peasants** and **large landholders**. Tamil texts use **vellalar**, **uzhavar** and **adimai**; Pali texts use **gahapati**.',
      v: vAgri,
      n: 'Not everyone who worked in agriculture was in the same position. There were landless agricultural labourers, small peasants, and large landholders. Tamil Sangam texts call large landowners vellalar, ploughmen uzhavar, and slaves adimai. Pali texts use the word gahapati for the head of a household, who controlled its land and workers.',
    }),
    sl('check', 'Quick check: Sangam terms', {
      b: 'In the Tamil Sangam texts, large landowners were called ___ and ploughmen were called ___.',
      chk: 'fb_sangam',
      v: vAgri,
      n: 'Recall the two Tamil words for large landowners and for ploughmen.',
    }),
    sl('diagram', 'Land grants', {
      v: vGrants,
      n: 'From about the beginning of the Common Era, inscriptions, often on copper plates, record grants of land. Rulers, and sometimes queens, gave land to religious institutions or to Brahmanas. Land given to Brahmanas is called agrahara. Prabhavati Gupta, daughter of Chandragupta II, who married into the Vakataka family of the Deccan, is known to have made a grant.',
    }),
    sl('example', 'Worked example 1: weighing views on land grants', {
      b: 'Question: *Why were land grants made? Weigh the views.*',
      bl: [
        'Step 1 — State each **view**: extend farming; win allies; show power.',
        'Step 2 — Say what **evidence** would support each.',
        'Step 3 — Note that the plates record the **gift**, not usually the motive.',
        'Step 4 — **Conclude**: the purposes may have worked together.',
      ],
      v: vGrantViews,
      n: 'Historians disagree about why land grants were made, so give the views and weigh them. One view says grants extended farming to new lands. Another says kings won allies. A third says grants showed power. For each, ask what evidence would support it. Then note that plates record the gift, not usually the motive, and conclude that more than one purpose may have worked.',
    }),
    sl('concept', 'Towns and crafts', {
      b: 'Cities such as **Pataliputra, Ujjayini, Puhar and Mathura** grew on routes and coasts. **Northern Black Polished Ware** is found at urban sites, and short donor inscriptions name many occupations. **Shrenis** were guilds.',
      v: vTowns,
      n: 'Many cities grew along routes and coasts, including Pataliputra, Ujjayini, Puhar and Mathura. Archaeologists find a fine glossy pottery, called Northern Black Polished Ware, at urban sites. Short donor inscriptions name washing folk, weavers, scribes, carpenters, potters, goldsmiths, blacksmiths, officials and merchants. Craftspeople and merchants formed guilds, called shrenis.',
    }),
    sl('concept', 'Trade routes and goods', {
      b: 'From about the **sixth century BCE**, land, river and sea routes linked the subcontinent to **North Africa, West Asia, Southeast Asia and China**. **Pepper** was highly valued in the Roman Empire.',
      v: vTrade,
      n: 'From about the sixth century BCE, land and river routes and sea routes linked the subcontinent with North Africa, West Asia, Southeast Asia and China. Salt, grain, cloth, metal ores, stone, timber, medicinal plants and spices were traded. Pepper was highly valued in the Roman Empire. The traders included peddlers, mariners and merchants.',
    }),
    sl('check', 'Quick check: Roman coins', {
      b: 'True or false? Hoards of Roman coins found in south India prove that the Roman Empire governed the region.',
      chk: 'tf_roman',
      v: vTrade,
      n: 'Ask what a hoard of coins can show, and what it cannot.',
    }),
    sl('diagram', 'Coins and kings', {
      v: vCoinsSvg,
      n: 'Coins are studied in numismatics. Punch-marked silver and copper coins are among the earliest, from about the sixth century BCE. Indo-Greek rulers first put their names and images on coins. The Kushanas issued gold coins on a large scale, and Gupta gold coins are remarkable for their purity. Tribal republics such as the Yaudheyas issued copper coins. From about the sixth century CE fewer gold coins are found.',
    }),
    sl('example', 'Worked example 2: reading a hoard', {
      b: 'Question: *A hoard of Roman coins is found in the south. What can and cannot be concluded?*',
      bl: [
        'Step 1 — What the find **shows**: Roman coins reached the region.',
        'Step 2 — A **likely reading**: trade in valued goods such as pepper.',
        'Step 3 — What it does **not** show: Roman rule, or that all trade was with Rome.',
      ],
      v: vHoard,
      n: 'When you meet a hoard, separate what the find shows from what it does not. It shows that Roman coins reached the region. A likely reading is trade in valued goods such as pepper. It does not show that Romans ruled the area, nor that all trade was with Rome. A careful answer gives the evidence, one reasonable reading, and a clear limit.',
    }),
    sl('concept', 'Inscriptions: uses and limits', {
      b: 'Inscriptions give the **words of rulers and donors**, but letters may be faint, damaged or missing, word meanings are uncertain, not all are read, and they record what their **makers** wished to say.',
      v: vLimits,
      n: 'Inscriptions are valuable, but they have limits. Letters may be faintly engraved, damaged or missing. The meanings of some words are uncertain, and not all inscriptions have been deciphered or translated. Many more existed than survive. They record what their makers wished to say, so everyday life is often left out, and historians still debate what some of them mean.',
    }),
    sl('example', 'Worked example 3: reading an inscription source', {
      b: 'Question: *How do you answer a source question on an inscription summary?*',
      bl: [
        'Step 1 — **Who** made it and **why**?',
        'Step 2 — **What does it say**? Quote for a "which line" part.',
        'Step 3 — **What does it leave out?**',
        'Step 4 — **What other evidence** could check it?',
      ],
      v: vReadInscr,
      n: 'In a source question on an inscription, ask four things. Who made it, and why? What does it say? For a which line question, copy the words exactly. What does it leave out, such as everyday life? And what other evidence could check it, such as coins or other inscriptions? These four questions give you marks in the explain parts.',
    }),
    sl('check', 'Quick check: the order of coins', {
      b: 'Arrange these stages in the history of early Indian coins in the order in which they appear.',
      chk: 'ord_coins',
      v: vCoinsSvg,
      n: 'Use the sequence on the coins slide to put the four developments in order.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. Kushana kings used the title devaputra and colossal statues. Chiefs of the south appear in Sangam texts, and Guptas depended on samantas and were praised in prashastis. Farmers raised production by many means, and society was unequal. Land grants are recorded on copper plates and their reasons are debated. Towns, trade and coins show a lively economy, and inscriptions must be read with care.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Present reasons for land grants as a **debate**, not as settled fact.',
        'A hoard of Roman coins shows **trade**, not rule.',
        'A prashasti is **praise** by a court poet; check it with other evidence.',
        'Fewer gold coins after c. 600 CE is **debated**; do not say trade certainly collapsed.',
        'Use the four source questions: who, what, what is left out, what checks it.',
      ],
      v: vTips2,
      n: 'Some tips for Part 2. Present the reasons for land grants as a debate. Remember that a hoard of Roman coins shows trade, not rule. Treat a prashasti as praise by a court poet and check it against other evidence. Do not claim that trade certainly collapsed when fewer gold coins appear. And in source questions, use the four questions: who, what, what is left out, and what checks it.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Kings, Farmers and Towns: Early States and Economies — Notes',
  sections: [
    {
      h: '1. Reading the oldest inscriptions',
      t: [1, 5],
      b: '**James Prinsep**, working in the mint of the East India Company, read the **Brahmi** and **Kharosthi** scripts in the 1830s; Ashokan Brahmi was read by **1838**.\n\n- Most Ashokan inscriptions are in **Prakrit**; Brahmi covers most of the subcontinent, Kharosthi the **north-west**, and **Aramaic and Greek** appear in Afghanistan.\n- Most inscriptions name a king as **Piyadassi**, "pleasant to behold"; some also use **devanampiya**. Ashoka was identified when an inscription naming him was found.\n\n**Limits of inscriptions:** faint, damaged or missing letters; uncertain word meanings; many not yet read; far more once existed than survive; they speak for their makers, leaving ordinary life out.',
      terms: [
        ['Epigraphy', 'The study of inscriptions: texts cut into stone, metal or other hard surfaces.'],
        ['Piyadassi', 'A royal epithet meaning pleasant to behold, found in most Ashokan inscriptions.'],
      ],
      v: vPrinsep,
      vs: [vScripts, vLimits],
    },
    {
      h: '2. Mahajanapadas and the rise of Magadha',
      t: 1,
      b: 'Buddhist and Jaina texts of the **sixth century BCE** list **sixteen mahajanapadas**, such as Vajji, Magadha, Koshala, Kuru, Panchala, Gandhara and Avanti.\n\n- Most were **monarchies**; some were **ganas or sanghas**, ruled by groups of men (for example the Vajji).\n- **Dharmasutras**, composed by Brahmanas, expected rulers to be Kshatriyas.\n- Capitals were often **fortified**; rulers took taxes and tribute, raided neighbours and kept armies.\n\n**Magadha** became the strongest (6th to 4th century BCE). Reasons: fertile land; **iron mines** in present-day Jharkhand; **elephants** from forests; the **Ganga** and its tributaries; and ambitious rulers (**Bimbisara, Ajatasattu, Mahapadma Nanda**) with their ministers. Its capital **Rajagaha** (Rajgir) was a fortified settlement among hills; **Pataliputra** (Patna) became the capital in the fourth century BCE.',
      terms: [
        ['Mahajanapada', 'One of the sixteen great states of the sixth century BCE.'],
        ['Gana or sangha', 'A state in which a group of men shared power instead of a single king.'],
      ],
      v: vMaha,
      vs: [vMagadhaSvg, vCapitals],
    },
    {
      h: '3. The Mauryan empire',
      t: 2,
      b: '**Chandragupta Maurya** founded the empire around **321 BCE**, extending it to Afghanistan and Baluchistan. His grandson **Ashoka** conquered **Kalinga** (coastal Odisha).\n\n**Sources:** archaeology; **Megasthenes**, whose account survives only in fragments; the **Arthashastra**, parts of which were probably by Kautilya or Chanakya; later Buddhist, Jaina and Puranic texts and Sanskrit works; and Ashoka\'s inscriptions on rocks and pillars.\n\n**Administration:** five political centres, **Pataliputra** (capital), **Taxila, Ujjayini, Tosali, Suvarnagiri**; control was strongest around the capital and provincial centres; communication ran along land and river routes. Megasthenes mentions a committee with **six subcommittees** to coordinate military activity.\n\n**Interpretation:** nineteenth- and twentieth-century historians prized the empire as a large early state, but the evidence shows uneven control and not a uniform rule over the whole subcontinent.',
      terms: [
        ['Arthashastra', 'A text on government, parts of which were probably composed by Kautilya or Chanakya.'],
        ['Provincial centre', 'A major centre of administration away from the capital, such as Taxila.'],
      ],
      v: vMaurya,
      vs: [vSources, vCommittee],
    },
    {
      h: '4. Ashoka\'s dhamma',
      t: 2,
      b: 'Ashoka\'s **dhamma** was a set of **moral principles**, not a new religion:\n- respect for **elders**;\n- generosity to **Brahmanas and renouncers**;\n- kind treatment of **servants and slaves**;\n- respect for the **religions and traditions of others**.\n\nSpecial officers, the **dhamma mahamattas**, were appointed to spread the message, and it was cut on rocks and pillars.\n\n**Assessing it:** a shared moral message could reach people of many regions; but the edicts are the king\'s own statements, so they show what he wished, not how far people followed it.',
      terms: [
        ['Dhamma', 'Ashoka\'s set of moral principles for his subjects.'],
        ['Dhamma mahamatta', 'An officer appointed by Ashoka to spread the principles of dhamma.'],
      ],
      v: vDhamma,
      vs: [vAnswer5],
    },
    {
      h: '5. New notions of kingship',
      t: 3,
      b: '- **Kushanas** (c. 1st century BCE to 1st century CE) claimed a high status: the title **devaputra** and **colossal statues** at a shrine at **Mat** near Mathura, and in Afghanistan.\n- **Tamilakam:** chiefs and kings, the **Cholas, Cheras and Pandyas**, from about the second century BCE, mentioned in **Sangam texts**.\n- **Guptas** (from about the fourth century CE) depended on **samantas**.\n- **Prashastis:** praise-poems by court poets. The **Prayaga prashasti** was composed by **Harishena** for **Samudragupta**. Treat it as praise: it gives the king\'s image and needs checking against coins and other evidence.',
      terms: [
        ['Devaputra', 'A title meaning son of god, adopted by the Kushana kings.'],
        ['Prashasti', 'A poem of praise for a king, composed by a court poet.'],
      ],
      v: vKingship,
      vs: [vSouth, vPrashasti],
    },
    {
      h: '6. Farmers and land grants',
      t: 3,
      b: '**Kings and subjects:** stories in the Jatakas and the Panchatantra suggest tension over heavy taxes.\n\n**More production:** the iron-tipped ploughshare (Ganga and Kaveri valleys); transplanting paddy; the hoe in drier regions; irrigation by wells, tanks and canals, some built by communities or individuals.\n\n**Differences:** landless agricultural labourers, small peasants and large landholders. Terms: **vellalar** (large landowners), **uzhavar** (ploughmen), **adimai** (slaves) in Tamil texts; **gahapati**, a household head controlling land, in Pali.\n\n**Land grants:** recorded on copper plates from about the start of the Common Era; given to religious institutions or Brahmanas (**agrahara**). **Prabhavati Gupta**, daughter of Chandragupta II and married into the Vakataka family of the Deccan, made one. **Why?** Historians debate: to extend farming, to win allies, to show power. The plates record the gift, rarely the motive.',
      terms: [
        ['Agrahara', 'Land granted to Brahmanas.'],
        ['Gahapati', 'A Pali term for the head of a household who controlled its land and workers.'],
      ],
      v: vAgri,
      vs: [vProduction, vGrants, vGrantViews],
    },
    {
      h: '7. Towns, trade and coins',
      t: 4,
      b: '**Towns:** Pataliputra, Ujjayini, Puhar (Kaveripattinam), Mathura and others on routes and coasts. **Northern Black Polished Ware** is a fine glossy pottery of urban sites. Short donor inscriptions name washing folk, weavers, scribes, carpenters, potters, goldsmiths, blacksmiths, officials and merchants; craft and trade groups formed **shrenis** (guilds).\n\n**Trade:** from about the sixth century BCE, land, river and sea routes reached North Africa, West Asia, Southeast Asia and China; salt, grain, cloth, metal ores, stone, timber, medicinal plants and spices travelled; **pepper** was highly valued in Rome. Traders: peddlers, mariners, merchants.\n\n**Coins** (numismatics): **punch-marked** silver and copper coins (from c. 6th century BCE) carry symbols; **Indo-Greek** coins first bore rulers\' names and images; **Kushanas** issued gold on a large scale (c. 1st century CE); **Gupta** gold is remarkably pure; **Yaudheyas** (Punjab and Haryana) issued copper coins; hoards of **Roman coins** are found in the south. Fewer gold coins appear from about the sixth century CE, which some read as declining trade; others disagree.',
      terms: [
        ['Numismatics', 'The study of coins.'],
        ['Shreni', 'A guild of craftspeople or merchants.'],
      ],
      v: vTowns,
      vs: [vTrade, vCoinsSvg, vHoard, vTimeline],
    },
  ],
  tips: '**Common mistakes**\n- Writing that Ashokan inscriptions were in Sanskrit, or naming only one script.\n- Giving only natural reasons (or only the rulers) for Magadha\'s rise.\n- Writing that the Mauryas ruled the whole subcontinent in the same way.\n- Calling dhamma a new religion.\n- Presenting one reason for land grants as settled fact.\n- Writing that a hoard of Roman coins shows Roman rule.\n- Quoting a prashasti or an edict as plain fact without noting who made it.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or fact.\n- 2 marks: two points, or a meaning plus a use (30 to 50 words).\n- 3 marks: three distinct points (50 to 80 words).\n- 5 marks: five headed points (80 to 120 words); for "assess" or "to what extent" questions, include a weighed judgement.\n- Source questions (4 marks): part (a) 1 mark, part (b) 1 mark, part (c) 2 marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice, never quotations; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Epigraphy**', 'The study of inscriptions.', 'definition', 1],
  ['Who deciphered Brahmi and Kharosthi?', '**James Prinsep**, an officer of the East India Company\'s mint, in the 1830s.', 'fact', 1],
  ['What does **Piyadassi** mean?', 'Pleasant to behold, a royal epithet in most Ashokan inscriptions.', 'definition', 1],
  ['Which scripts did Ashoka\'s inscriptions use, and where?', '**Brahmi** in most of the subcontinent, **Kharosthi** in the north-west, **Aramaic and Greek** in Afghanistan.', 'fact', 1],
  ['How many mahajanapadas did the texts name?', '**Sixteen**, in the sixth century BCE.', 'fact', 1],
  ['**Gana or sangha**', 'A state ruled by a group of men sharing power, for example the **Vajji**.', 'definition', 1],
  ['What did the **Dharmasutras** expect of rulers?', 'That they be **Kshatriyas**.', 'fact', 1],
  ['Why did Magadha rise?', 'Fertile land, **iron mines**, **elephants**, the **Ganga**, and ambitious rulers with ministers.', 'concept', 1],
  ['Capitals of Magadha', '**Rajagaha** (Rajgir), then **Pataliputra** (Patna) from the fourth century BCE.', 'fact', 1],
  ['Who founded the Mauryan empire?', '**Chandragupta Maurya**, around 321 BCE.', 'fact', 2],
  ['What did Ashoka conquer?', '**Kalinga**, in coastal Odisha.', 'fact', 2],
  ['Five political centres of the Mauryas', '**Pataliputra**, Taxila, Ujjayini, Tosali, Suvarnagiri.', 'fact', 2],
  ['Where was Mauryan control strongest?', 'Around the **capital and provincial centres**.', 'concept', 2],
  ['**Megasthenes**', 'A Greek ambassador; his account survives only in **fragments**.', 'fact', 2],
  ['**Arthashastra**', 'A text on government; parts probably by **Kautilya or Chanakya**.', 'definition', 2],
  ['Principles of **dhamma**', 'Respect for elders; generosity; kindness to servants and slaves; respect for others\' faiths.', 'concept', 2],
  ['**Dhamma mahamattas**', 'Officers appointed by Ashoka to spread dhamma.', 'definition', 2],
  ['Is dhamma a new religion?', '**No**: it is a set of moral principles.', 'exam-tip', 2],
  ['**Devaputra**', 'Kushana title meaning son of god.', 'definition', 3],
  ['Where were colossal Kushana statues installed?', 'At a shrine at **Mat** near Mathura, and in Afghanistan.', 'fact', 3],
  ['Chiefs of **Tamilakam**', '**Cholas, Cheras, Pandyas**, mentioned in Sangam texts from c. 2nd century BCE.', 'fact', 3],
  ['Who composed the Prayaga prashasti?', '**Harishena**, for **Samudragupta**.', 'fact', 3],
  ['**Samantas**', 'Powerful local lords on whom the Guptas depended.', 'definition', 3],
  ['Tamil terms: landowners, ploughmen, slaves', '**Vellalar, uzhavar, adimai**.', 'fact', 3],
  ['**Agrahara**', 'Land granted to Brahmanas.', 'definition', 3],
  ['Why were land grants made?', 'A **debate**: extend farming, win allies, show power.', 'exam-tip', 3],
  ['Which Gupta woman made a land grant?', '**Prabhavati Gupta**, daughter of Chandragupta II.', 'fact', 3],
  ['**Northern Black Polished Ware**', 'A fine, glossy pottery found at urban sites.', 'definition', 4],
  ['Which good was highly valued in Rome?', '**Pepper**.', 'fact', 4],
  ['**Numismatics**', 'The study of coins.', 'definition', 4],
  ['First coins to show rulers\' names and images', '**Indo-Greek** coins.', 'fact', 4],
  ['Who issued gold coins on a large scale?', 'The **Kushanas**, c. 1st century CE.', 'fact', 4],
  ['What do hoards of Roman coins show?', '**Trade contacts**, not Roman rule.', 'exam-tip', 4],
  ['Why do historians hesitate to use inscriptions as complete evidence?', 'They are damaged, partly unread, incomplete, and show the **makers\' view**.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Kings, Farmers and Towns',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_prinsep_evidence', 'm_prabhavati_use', 'm_hoard', 'ar_megasthenes'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_dhamma', 's_kushana', 's3_coins'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_dhamma', 'l_land'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_notebook'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Kings, Farmers and Towns',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_gana', 'm_dating_capital', 'm_dhamma_evidence', 'm_inscr_inference', 'm_prashasti_use', 'm_land_interp', 'm_few_gold', 'm_coin_dating', 'ar_capital', 'ar_roman'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_sources_maurya', 's_donor', { attempt: 1, keys: ['s_land_reason', 's_gana'] }, 's3_maurya_admin', { attempt: 1, keys: ['s3_rural', 's3_new_inscription'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_magadha', { attempt: 1, keys: ['l_compare_sources', 'l_coins'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_plates', 'sb_diary'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch02 (Prinsep and Piyadassi, the mahajanapadas; the Mauryan empire and Ashoka\'s dhamma; new notions of kingship and changing rural society; towns, trade, coins and kings; sources: inscriptions)',
    originality: 'every source passage is an imagined document or a SOYL summary in its own words (labelled); no NCERT text, source box, inscription translation, exercise or board/sample-paper item reused (D-036); the Prayaga prashasti is described, never quoted; no invented quotation of any real person; no maps (OA-23)',
    facts: 'Prinsep (East India Company mint, 1830s, Ashokan Brahmi by 1838); Piyadassi; devanampiya; sixteen mahajanapadas in the sixth century BCE; Magadha factors; Rajagaha to Pataliputra in the fourth century BCE; Chandragupta c. 321 BCE; Kalinga; five Mauryan centres; Megasthenes committee of six subcommittees; dhamma and dhamma mahamattas; Kushanas c. 1st century BCE to 1st century CE; Tamilakam from c. 2nd century BCE; Guptas from c. 4th century CE; Prayaga prashasti by Harishena for Samudragupta; land grants from the start of the Common Era; Prabhavati Gupta; trade from the sixth century BCE; punch-marked coins c. 6th century BCE; Kushana gold c. 1st century CE; fewer gold coins from c. 6th century CE (debated)',
    neutrality: 'caste terms (Brahmana, Kshatriya) stated as the texts\' expectations, not endorsed; land-grant motives and the decline of gold coins presented as debates',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
