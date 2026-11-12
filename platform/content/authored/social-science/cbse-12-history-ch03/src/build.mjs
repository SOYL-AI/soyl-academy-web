// Build CBSE 12 History ch03 Kinship, Caste and Class: Early Societies (c. 600 BCE-600 CE). Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-history-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch03', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
function timeline(items, alt, caption, y0, y1, step) {
  // Four label lanes (far above, near below, near above, far below) so neighbouring labels never collide.
  const s = new Svg(680, 360);
  const AX = 180;
  const X = (y) => 70 + ((y - y0) / (y1 - y0)) * 540;
  s.arrow(40, AX, 650, AX, { sw: 1.8 });
  for (let yr = y0; yr <= y1; yr += step) s.line(X(yr), AX - 6, X(yr), AX + 6, { sw: 1.2, color: 'muted' });
  const LANES = [20, AX + 30, 92, AX + 102];
  items.forEach(([yr, yrLabel, label], i) => {
    const top = LANES[i % 4];
    const above = top < AX;
    const lines = label.split(' | ');
    s.dot(X(yr), AX, 6, 'accent');
    s.line(X(yr), AX, X(yr), above ? top + 12 + lines.length * 18 : top - 12, { sw: 1.4, color: 'accent' });
    s.text(X(yr), top, yrLabel, { bold: true, size: 13 });
    lines.forEach((ln, j) => s.text(X(yr), top + 18 + j * 18, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}
const EDITION = [
  [1917, '1917', 'Project begins | at Pune'],
  [1919, '1919', 'Sukthankar | leads the work'],
  [1951, '1951 to 1952', 'Lal digs at | Hastinapur'],
  [1966, '1966', 'Edition | completed'],
];
const vEdition = timeline(EDITION, `Timeline from 1910 to 1970: ${EDITION.map(([, y, t]) => `${y}, ${t.replace(' | ', ' ')}`).join('; ')}`, 'The critical edition and the dig at Hastinapur', 1910, 1970, 10);
const ERAS = [
  [-500, 'c. 500 BCE', 'Epic begins | to take shape'],
  [-200, 'c. 200 BCE', 'Manusmriti | compiled from'],
  [150, 'c. 150 CE', 'Rudradaman | repairs lake'],
  [200, 'c. 200 CE', 'Manusmriti | period ends'],
  [400, 'c. 400s CE', 'Mandasor | guild inscription'],
  [630, 'c. 630 CE', 'Xuan Zang | in India'],
];
const vEras = timeline(ERAS, `Timeline from 600 BCE to 700 CE: ${ERAS.map(([, y, t]) => `${y}, ${t.replace(' | ', ' ')}`).join('; ')}`, 'Texts, rulers and observers across about a thousand years', -600, 700, 100);

const vGotra = (() => {
  const s = new Svg(680, 300);
  s.rect(30, 40, 180, 90, { sw: 2.2, color: 'accent', fill: 'fill' });
  s.text(120, 70, 'Father\'s gotra', { bold: true });
  s.text(120, 96, 'named after a Vedic seer', { size: 12 });
  s.rect(470, 40, 180, 90, { sw: 2.2, color: 'accent', fill: 'fill' });
  s.text(560, 70, 'Husband\'s gotra', { bold: true });
  s.text(560, 96, 'the bride is expected to join it', { size: 12 });
  s.arrow(212, 85, 468, 85, { sw: 2 });
  s.text(340, 62, 'On marriage', { size: 13, bold: true });
  s.text(340, 108, 'Same-gotra marriage not allowed', { size: 12 });
  s.rect(30, 170, 620, 100, { sw: 1.6, dash: true, color: 'muted' });
  s.text(340, 192, 'Departures seen in Satavahana inscriptions', { bold: true, size: 14 });
  s.text(340, 220, 'Queens such as Gotami and Vasithi bear names from their fathers\' gotras', { size: 13 });
  s.text(340, 244, 'Some queens belonged to the same gotra as their husbands', { size: 13 });
  return s.visual('Diagram of the gotra rule: a bride moves from her father\'s gotra to her husband\'s gotra on marriage and members of one gotra may not marry; below, departures seen in Satavahana inscriptions, where queens such as Gotami and Vasithi bear names from their fathers\' gotras and some queens belonged to the gotra of their husbands', 'The gotra rule and some departures');
})();

const vVarnaSvg = (() => {
  const s = new Svg(680, 330);
  s.text(165, 20, 'Ideal order in the texts', { bold: true, size: 14 });
  s.text(515, 20, 'Evidence of social reality', { bold: true, size: 14 });
  const L = [
    ['Brahmanas', 'study, teach, sacrifice, gifts'],
    ['Kshatriyas', 'warfare, protection, justice'],
    ['Vaishyas', 'agriculture, herding, trade'],
    ['Shudras', 'service to the three higher varnas'],
  ];
  const R = [
    ['Shungas and Kanvas', 'rulers who were Brahmanas'],
    ['Shakas', 'called outsiders, yet Rudradaman ruled'],
    ['A Satavahana ruler', 'claimed to be a Brahmana king'],
    ['Guilds and jatis', 'groups by occupation, with records'],
  ];
  L.forEach(([a, b], i) => {
    const y = 40 + i * 70;
    s.rect(30, y, 270, 56, { sw: 1.8, color: i === 0 ? 'accent' : undefined, fill: 'fill' });
    s.text(165, y + 20, a, { bold: true, size: 14 });
    s.text(165, y + 40, b, { size: 12 });
  });
  R.forEach(([a, b], i) => {
    const y = 40 + i * 70;
    s.rect(380, y, 270, 56, { sw: 1.8, color: 'accent' });
    s.text(515, y + 20, a, { bold: true, size: 14 });
    s.text(515, y + 40, b, { size: 12 });
  });
  s.arrow(306, 165, 374, 165, { sw: 1.8 });
  return s.visual('Two columns compared: on the left the ideal order of four varnas with the duties assigned in the texts; on the right evidence of social reality, namely Shunga and Kanva Brahmana rulers, the Shaka ruler Rudradaman, a Satavahana ruler claiming to be a Brahmana king, and guilds and jatis organised by occupation', 'Ideal order and evidence of practice');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['The Mahabharata', 'The critical edition', 'Kinship and descent', 'Marriage rules', 'Gotra'], 'Route map of Part 1: the Mahabharata, the critical edition, kinship and descent, marriage rules, and gotra', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Varna', 'Jati', 'Property and gender', 'Buddhist views', 'The epic as a text'], 'Route map of Part 2: varna, jati, property and gender, Buddhist views, and the epic as a text', 'Part 2 at a glance');
const vEpic = table(
  ['Feature', 'What to remember'],
  [
    ['Story', 'A conflict between two sets of cousins, Kauravas and Pandavas, of the Kuru lineage'],
    ['Composition', 'Over about a thousand years, from c. 500 BCE'],
    ['Parts', 'Narrative sections and didactic sections'],
    ['Language', 'Sanskrit, simpler than the Vedas or the prashastis'],
    ['Tradition', 'Names Vyasa as the author'],
  ],
  'Table of features of the Mahabharata: a conflict between Kauravas and Pandavas of the Kuru lineage; composed over about a thousand years from c. 500 BCE; narrative and didactic sections; simple Sanskrit; and Vyasa named as author by tradition',
  'The epic at a glance',
);
const vEdSteps = flow('LR', ['Collect Sanskrit manuscripts from many regions', 'Compare them closely', 'Choose verses common to most versions', 'Publish: many volumes, 13,000+ pages'], 'Flow of four steps in making the critical edition: collect manuscripts from many regions, compare them, choose verses common to most versions, and publish in many volumes of over 13,000 pages', 'From manuscripts to an edition');
const vEdFind = table(
  ['Finding', 'What it means'],
  [
    ['A common core', 'Many verses recur in manuscripts from distant regions'],
    ['Regional variations', 'Extra episodes and different readings in each region'],
    ['For historians', 'The story was shaped by complex social histories; the normative texts were not followed everywhere'],
  ],
  'Table of what the critical edition showed: a common core, regional variations, and what these mean for historians, namely a story shaped by complex social histories and norms not followed everywhere',
);
const vBallad = table(
  ['Imagined copies of a ballad', 'Decision', 'Why'],
  [
    ['Seven of nine tell of a flood', 'Main text', 'Common to most versions'],
    ['Two from one hamlet tell of a festival', 'Record as a variation', 'Local evidence, not the core'],
    ['What cannot be said', 'Who first composed it', 'Later copies only'],
  ],
  'Table for an imagined ballad: a flood stanza found in seven of nine copies goes in the main text; a festival stanza from one hamlet is recorded as a variation; the copies cannot show who first composed it',
  'What an edition can and cannot show',
);
const vKin = table(
  ['Term', 'Meaning'],
  [
    ['Kula', 'Family'],
    ['Jnati', 'Kinfolk, the wider circle of relatives'],
    ['Vamsha', 'Lineage, the line of descent'],
    ['Patriliny', 'Descent traced from father to son'],
    ['Matriliny', 'Descent traced through the mother'],
  ],
  'Table of kinship terms: kula, family; jnati, kinfolk; vamsha, lineage; patriliny, descent from father to son; matriliny, descent through the mother',
  'Words for kinship',
);
const vPatri = table(
  ['', 'Evidence'],
  [
    ['The norm', 'Patriliny the ideal in ruling families from c. 6th century BCE; the epic shows succession from father to son'],
    ['Exceptions', 'Brothers sometimes succeeded; women such as Prabhavati Gupta exercised power'],
  ],
  'Table of the norm and the exceptions: patriliny was the ideal from about the sixth century BCE and the epic shows father to son succession; brothers sometimes succeeded and women such as Prabhavati Gupta exercised power',
);
const vMarr = table(
  ['Term', 'Meaning', 'Example from the sources'],
  [
    ['Exogamy', 'Marriage outside a unit', 'Rule that members of one gotra could not marry'],
    ['Endogamy', 'Marriage within a unit', 'Some Satavahana queens in their husbands\' gotras'],
    ['Polygyny', 'A man with several wives', 'Common among rulers'],
    ['Polyandry', 'A woman with several husbands', 'Draupadi and the Pandavas'],
  ],
  'Table of marriage terms with examples: exogamy and the rule on gotra; endogamy and some Satavahana queens; polygyny among rulers; and polyandry in Draupadi\'s marriage to the Pandavas',
  'Four terms for marriage',
);
const vForms = table(
  ['Idea', 'What the texts say'],
  [
    ['Forms of marriage', 'Eight forms; the first four were considered good, the rest condemned'],
    ['Source', 'Dharmasutras and Dharmashastras, including the Manusmriti (c. 200 BCE to 200 CE)'],
    ['Kanyadana', 'The gift of a daughter, an important duty of a father'],
    ['Draupadi\'s marriage', 'A well-known case of polyandry; historians explain it in different ways'],
  ],
  'Table of ideas about marriage in the texts: eight forms, the first four considered good and the rest condemned; the Dharmashastras including the Manusmriti; kanyadana as a father\'s duty; and Draupadi\'s marriage explained in different ways by historians',
);
const vClassify = table(
  ['Imagined custom', 'Name'],
  [
    ['A person must marry outside the village', 'Exogamy'],
    ['A person must marry within the jati', 'Endogamy'],
    ['A chief has three wives at once', 'Polygyny'],
    ['A woman is wife to two brothers', 'Polyandry'],
  ],
  'Table classifying imagined customs: marrying outside the village is exogamy; marrying within the jati is endogamy; a chief with three wives is polygyny; a woman married to two brothers is polyandry',
  'Classify by checking the criterion',
);
const vSat = table(
  ['Feature', 'Evidence'],
  [
    ['Names', 'Queens such as Gotami and Vasithi kept names from their fathers\' gotras'],
    ['Same gotra', 'Some queens belonged to their husbands\' gotras, a practice also found in parts of south India'],
    ['Metronymics', 'Rulers such as Gotami-puta Siri-Satakani were named after their mothers'],
    ['Caution', 'Succession was usually patrilineal'],
  ],
  'Table of Satavahana evidence: queens such as Gotami and Vasithi kept names from their fathers\' gotras; some queens belonged to their husbands\' gotras; rulers such as Gotami-puta Siri-Satakani were named after their mothers; but succession was usually patrilineal',
  'Departures and a caution',
);
const vPlan5 = table(
  ['Mark', 'What to write'],
  [
    ['1', 'Define patriliny: descent from father to son'],
    ['2', 'The norm: ideal in ruling families from c. 6th century BCE; epic succession'],
    ['3', 'Exceptions: brothers; women such as Prabhavati Gupta'],
    ['4', 'Other evidence: Satavahana names, queens\' gotras'],
    ['5', 'Judgement: dominant, not universal'],
  ],
  'Table planning a 5-mark answer on patriliny: define it, state the norm, give exceptions, add other evidence such as Satavahana names, and finish with a judgement that it was dominant but not universal',
  'Five headed points earn five marks',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['The edition', '1917 to 1966, Pune; common core and variations'],
    ['The epic', 'Kuru cousins; sutas, then Brahmanas; c. 500 BCE onwards'],
    ['Kinship', 'Patriliny the ideal; exceptions exist'],
    ['Marriage', 'Exogamy, endogamy, polygyny, polyandry; eight forms'],
    ['Gotra', 'Same gotra no marriage; bride adopts husband\'s gotra; Satavahana departures'],
  ],
  'Summary table of Part 1: the critical edition from 1917 to 1966, the epic and its composers, patriliny and exceptions, marriage terms and forms, and the gotra rule with Satavahana departures',
);
const vTips1 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Saying the edition restored the original text', 'It chose verses common to most versions'],
    ['Saying metronymics mean matriliny', 'Succession was usually patrilineal'],
    ['Mixing up polygyny and polyandry', 'Gyny: wives; andry: husbands'],
    ['Writing that all queens broke the gotra rule', 'Some did; it is a departure, not the rule'],
  ],
  'Table of exam mistakes and corrections: the edition chose common verses and did not restore the original text; metronymics do not mean matriliny; polygyny is several wives and polyandry several husbands; and only some queens departed from the gotra rule',
);
const vVarna4 = table(
  ['Varna', 'Duties laid down in the texts'],
  [
    ['Brahmanas', 'Study and teach the Vedas, perform sacrifices, give and receive gifts'],
    ['Kshatriyas', 'Warfare, protect people, administer justice; also study, sacrifice, give gifts'],
    ['Vaishyas', 'Agriculture, pastoralism and trade, along with study, sacrifice and gifts'],
    ['Shudras', 'Service to the three higher varnas'],
  ],
  'Table of the duties assigned to the four varnas in the Dharmasutras and Dharmashastras: Brahmanas study, teach, sacrifice and give and receive gifts; Kshatriyas fight, protect and administer justice; Vaishyas farm, herd and trade; Shudras serve the three higher varnas',
  'An ideal order laid down in texts',
);
const vStrat = flow('LR', ['Claim a divine origin for the order', 'Advise kings to enforce it', 'Teach that status comes by birth'], 'Flow of three strategies of Brahmanas: claiming a divine origin for the varna order, advising kings to enforce it, and teaching that status comes by birth', 'Three strategies');
const vRulers = table(
  ['Ruler or dynasty', 'Background', 'Point'],
  [
    ['Mauryas', 'Kshatriya in Buddhist texts; low origin in some Brahmanical texts', 'Sources disagree'],
    ['Shungas, Kanvas', 'Brahmanas', 'Brahmana rulers'],
    ['Shakas; Rudradaman (c. 2nd century CE)', 'Central Asia; called mlechchhas', 'He repaired the Sudarshana lake'],
    ['Gotami-puta Siri-Satakani', 'Satavahana; claimed to be a unique Brahmana', 'Married into the Shaka family'],
  ],
  'Table of rulers of different backgrounds: the Mauryas, described differently in Buddhist and Brahmanical texts; the Shungas and Kanvas, who were Brahmanas; the Shakas and Rudradaman, who repaired the Sudarshana lake; and the Satavahana ruler Gotami-puta Siri-Satakani, who claimed to be a unique Brahmana and married into the Shaka family',
  'Rulers who did not fit the ideal',
);
const vNormEx = table(
  ['Step', 'Imagined case'],
  [
    ['What the text says', 'Each varna has fixed duties'],
    ['Who wrote it, for whom', 'Brahmana authors; for kings and householders'],
    ['What other evidence shows', 'A guild of mixed callings built a temple'],
    ['Careful conclusion', 'The text shows an ideal; practice was more varied'],
  ],
  'Table of four steps for reading a normative text with an imagined case: what the text says, who wrote it and for whom, what other evidence shows, and a careful conclusion that it shows an ideal while practice was varied',
  'Norm and evidence together',
);
const vJati = table(
  ['', 'Varna', 'Jati'],
  [
    ['Number', 'Four, fixed', 'Not fixed; new groups were added'],
    ['Basis', 'Duties laid down in texts', 'Usually a shared occupation'],
    ['Examples', 'Brahmanas, Kshatriyas', 'Nishadas; guilds of craftspeople (shrenis)'],
  ],
  'Table comparing varna and jati: varnas were four and fixed while jatis were not fixed; varna was based on duties in texts while jati usually rested on shared occupation; examples are Brahmanas and Kshatriyas for varna, and Nishadas and craft guilds called shrenis for jati',
  'Varna and jati',
);
const vGuild = table(
  ['Source', 'What it records', 'What it suggests'],
  [
    ['Mandasor inscription (5th century CE)', 'Silk weavers from Lata built a temple to the sun god', 'Guilds could migrate, organise and fund public buildings'],
  ],
  'Table of the Mandasor inscription of the fifth century CE: silk weavers who came from Lata built a temple to the sun god, which suggests that guilds could migrate, organise and fund public buildings',
);
const vJati3 = table(
  ['Mark', 'What to write'],
  [
    ['1', 'New groups were classed as jatis, such as forest peoples'],
    ['2', 'Craft workers formed guilds, shrenis, by occupation'],
    ['3', 'The number of jatis was not fixed, unlike the four varnas'],
  ],
  'Table planning a 3-mark answer on how new jatis arose: forest peoples classed as jatis, craft workers forming guilds, and the number of jatis not being fixed unlike the four varnas',
  'Three headed points earn three marks',
);
const vOutside = table(
  ['Group', 'Position in the texts and in accounts'],
  [
    ['Forest peoples, nomads', 'Outside the varna system'],
    ['Speakers of non-Sanskritic languages', 'Called mlechchhas, regarded as outsiders'],
    ['A story in the epic', 'Ekalavya, a Nishada, was refused instruction by Drona and asked to give up his thumb'],
    ['Chandalas', 'At the bottom; tasks such as handling corpses; the Manusmriti set restrictions; Fa Xian and Xuan Zang noted that they lived outside towns'],
  ],
  'Table of groups outside or at the bottom of the order: forest peoples and nomads, speakers of non-Sanskritic languages called mlechchhas, the epic story of Ekalavya, and the chandalas, for whom the Manusmriti set restrictions and who lived outside towns according to Fa Xian and Xuan Zang',
  'Those outside the system',
);
const vProp = table(
  ['Rule in the Manusmriti', 'Effect'],
  [
    ['Father\'s estate divided among sons after both parents die', 'Equal shares, with a special share for the eldest'],
    ['Women could not claim a share of the estate', 'Land and wealth went to sons'],
    ['Stridhana: gifts at marriage', 'Hers to keep; her children could inherit it'],
    ['Women warned against hoarding family property', 'Needed the husband\'s permission'],
    ['Exceptions in practice', 'Upper-class women such as Prabhavati Gupta had access to resources'],
  ],
  'Table of the Manusmriti\'s rules on property: the father\'s estate divided equally among sons with a special share for the eldest; women excluded from the estate but keeping stridhana; a warning against hoarding family property; and exceptions in practice such as Prabhavati Gupta',
  'Property and gender',
);
const vWealth = table(
  ['Source', 'What it shows'],
  [
    ['Brahmanical texts', 'Occupations and status tied to varna'],
    ['Buddhist texts and others', 'Wealthy people of low status; poor Brahmanas'],
    ['Tamil Sangam texts', 'Chiefs as patrons of poets; the rich expected to share'],
  ],
  'Table of evidence on wealth and status: Brahmanical texts tie occupations and status to varna; Buddhist and other texts show wealthy people of low status and poor Brahmanas; Tamil Sangam texts show chiefs as patrons of poets and the rich expected to share',
);
const vBuddha = flow('LR', ['Differences are recognised', 'But not seen as natural or fixed', 'Claims of status by birth rejected', 'Institutions made by human choices'], 'Flow of the Buddhist view: differences are recognised, but are not seen as natural or fixed, claims of status by birth are rejected, and institutions are seen as made by human choices, as in the mahasammata story', 'The Buddhist alternative');
const vTextRows = table(
  ['Question to ask', 'What historians find'],
  [
    ['Language', 'Sanskrit, simpler than the Vedas or the prashastis'],
    ['Content', 'Narrative sections and didactic sections'],
    ['Author', 'Tradition names Vyasa; sutas probably first, Brahmanas later'],
    ['Date', 'About a thousand years from c. 500 BCE; Vishnu worship grew c. 200 BCE to 200 CE'],
    ['Hastinapur', 'B. B. Lal found a settlement in 1951 to 1952; identification with the epic\'s city is debated'],
  ],
  'Table of how historians analyse the Mahabharata: language, content, author, date, and the debated identification of Hastinapur',
  'Language, content, author, date',
);
const vDynamic = flow('LR', ['Sung by sutas', 'Preserved and added to by Brahmanas', 'Vishnu and Krishna worship grows', 'Retold in many languages and forms'], 'Flow of the epic as a dynamic text: sung by sutas, preserved and added to by Brahmanas, growth of Vishnu and Krishna worship, and retelling in many languages and forms', 'A text that kept growing');
const vReadText = table(
  ['Step', 'An imagined summary of a Dharmashastra-type text'],
  [
    ['What it says', 'Sons divide the estate; daughters are not named'],
    ['Observation or inference?', 'The rule is stated; that families followed it is an inference'],
    ['Who, for whom', 'Written by learned men for householders'],
    ['What cannot be said', 'How many families kept the rule'],
  ],
  'Table of four steps in reading a text-based source with an imagined summary: what it says, observation or inference, who wrote it and for whom, and what cannot be said',
  'Reading a text as a source',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Varna', 'Four, with assigned duties; strategies of Brahmanas'],
    ['Reality', 'Brahmana, Shaka and Satavahana rulers; Mauryas disputed'],
    ['Jati', 'Number not fixed; guilds; Mandasor'],
    ['Outside', 'Forest peoples, nomads, mlechchhas, chandalas'],
    ['Property', 'Sons share; stridhana; exceptions'],
    ['Buddhists', 'Differences not natural or fixed'],
    ['The epic', 'Language, content, author, date; a dynamic text'],
  ],
  'Summary table of Part 2: varna, reality, jati, those outside the system, property, Buddhist views, and the epic as a dynamic text',
);
const vTips2 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Treating a norm as a description of life', 'Texts say what authors wished; check other evidence'],
    ['Writing that all rulers were Kshatriyas', 'Several were not; some disputed'],
    ['Saying Hastinapur is proven to be the epic\'s city', 'It is debated'],
    ['Writing that Buddhists denied all differences', 'They recognised them but not as natural or fixed'],
  ],
  'Table of exam mistakes and corrections: do not treat a norm as a description of life; not all rulers were Kshatriyas; the identification of Hastinapur is debated; and Buddhists recognised differences but did not regard them as natural or fixed',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Kinship, Caste and Class — Part 1: The Epic, Kinship and Marriage',
  goals: [
    'Explain the critical edition of the Mahabharata and what it showed',
    'Describe kinship, patriliny and the exceptions to it',
    'Explain marriage rules, the eight forms and the practice of gotra',
    'Use inscriptions and texts to test norms against practice',
  ],
  slides: [
    sl('title', 'Kinship, Caste and Class', {
      b: 'Part 1: the **critical edition** of the Mahabharata, and the rules of **kinship, marriage and gotra**.',
      v: vRoute1,
      n: 'In this part we start with the Mahabharata, the great epic, and with the long project that produced its critical edition. Then we turn to family life: how descent was traced, whom people could marry, and what the practice of gotra required. Throughout, we ask whether the rules in the texts matched what people actually did.',
    }),
    sl('concept', 'The Mahabharata at a glance', {
      b: 'A story of **two sets of cousins**, composed over **about a thousand years**.',
      v: vEpic,
      n: 'The Mahabharata tells of a conflict between two sets of cousins, the Kauravas and the Pandavas, of the Kuru lineage. It was composed over about a thousand years, from about five hundred BCE. It has narrative parts and parts that teach. Its Sanskrit is simpler than that of the Vedas. Tradition names Vyasa as its author.',
    }),
    sl('diagram', 'Making the critical edition: a timeline', {
      v: vEdition,
      n: 'The project began in nineteen seventeen at the Bhandarkar Oriental Research Institute in Pune. From nineteen nineteen the work was led by V S Sukthankar. The edition was completed in nineteen sixty six, after about forty seven years. The dig at Hastinapur in nineteen fifty one and fifty two is a separate effort, shown here because it also tested the epic.',
    }),
    sl('concept', 'How the edition was made', {
      b: 'Scholars **collected**, **compared** and **chose** verses common to most versions.',
      v: vEdSteps,
      n: 'Scholars collected Sanskrit manuscripts of the epic from many parts of the subcontinent. They compared them closely. Then they chose the verses that were common to most versions. The result ran to many volumes and over thirteen thousand pages. The aim was not to find one lost original, but to give the best supported text from the copies that survive.',
    }),
    sl('concept', 'What the edition showed', {
      b: 'A **common core** with many **regional variations**.',
      v: vEdFind,
      n: 'The manuscripts shared a common core, so the story travelled widely. But they also carried many regional variations. Historians read this as a sign that the story was shaped by complex social histories as it moved through different societies. It also shows that the norms in the normative texts were not followed everywhere.',
    }),
    sl('check', 'Quick check: the year', {
      b: 'The critical edition was completed in the year ___.',
      chk: 'fb_ed_year',
      n: 'Count forty seven years from the start.',
    }),
    sl('example', 'Worked example 1: what an edition can and cannot show', {
      b: 'An editor has nine imagined copies of a village ballad. Decide what to do with two different stanzas.',
      bl: [
        'Step 1 — Count which stanza is **common to most** copies.',
        'Step 2 — Put it in the **main text**.',
        'Step 3 — **Record** the other as a regional variation.',
        'Step 4 — State a limit: later copies **cannot show** who first composed it.',
      ],
      v: vBallad,
      n: 'Suppose seven of nine copies of a ballad tell of a flood, while two from one hamlet tell of a festival. The flood stanza is common to most, so it goes in the main text. The festival stanza is recorded as a local variation. And we must add a limit: copies made later cannot tell us who first composed the ballad.',
    }),
    sl('concept', 'Words for kinship', {
      b: 'Kinship words show how early societies thought about **family and descent**.',
      v: vKin,
      n: 'The Sanskrit texts use three words that matter here. Kula means family. Jnati means kinfolk, the wider circle of relatives. Vamsha means lineage, the line of descent. Descent could be traced from the father, which is patriliny, or through the mother, which is matriliny. Each choice shaped who inherited and who ruled.',
    }),
    sl('two-column', 'Patriliny: the norm and the exceptions', {
      cols: [
        '**The norm:** patriliny, descent from father to son, became the ideal in ruling families from about the sixth century BCE. The epic shows succession passing from father to son.',
        '**Exceptions:** sometimes brothers succeeded, and women such as Prabhavati Gupta exercised power.',
      ],
      v: vPatri,
      n: 'From about the sixth century BCE, patriliny became the ideal in ruling families, and the epic presents succession from father to son as usual. But there were exceptions. At times brothers succeeded one another. Some women, such as Prabhavati Gupta, exercised power. So a norm tells us what was expected, not everything that happened.',
    }),
    sl('check', 'Quick check: descent', {
      b: 'Descent traced from father to son is called…',
      chk: 'm_patri',
      n: 'Think of the word for the father line.',
    }),
    sl('concept', 'Rules of marriage', {
      b: 'Four terms: **exogamy**, **endogamy**, **polygyny** and **polyandry**.',
      v: vMarr,
      n: 'Exogamy is marriage outside a unit such as a gotra, and endogamy is marriage within a unit. Polygyny is a man having several wives, and polyandry is a woman having several husbands. Draupadi\'s marriage to the Pandavas is the famous case of polyandry in the epic, and historians explain it in different ways.',
    }),
    sl('concept', 'Eight forms and kanyadana', {
      b: 'The texts ranked **eight forms** of marriage. Kanyadana was a father\'s duty.',
      v: vForms,
      n: 'The Dharmasutras and Dharmashastras, including the Manusmriti, recognised eight forms of marriage. The first four were considered good and the rest were condemned. Kanyadana, the gift of a daughter in marriage, was seen as an important duty of a father. Notice again that these are rules laid down in texts.',
    }),
    sl('example', 'Worked example 2: classifying customs', {
      b: 'Name each imagined custom by checking what it asks of the couple.',
      bl: [
        'Step 1 — Ask: is the rule about **which group**, or about **how many spouses**?',
        'Step 2 — Marry **outside** the group: exogamy. **Within**: endogamy.',
        'Step 3 — Many **wives**: polygyny. Many **husbands**: polyandry.',
        'Step 4 — Check that the name fits the **criterion**, not just the sound.',
      ],
      v: vClassify,
      n: 'To classify a custom, first ask whether the rule concerns a group or the number of spouses. Marrying outside the village is exogamy, and marrying within the jati is endogamy. A chief with three wives is polygyny, and a woman married to two brothers is polyandry. Always check the criterion rather than guessing from the sound of the word.',
    }),
    sl('diagram', 'Gotra: the rule', {
      v: vGotra,
      n: 'From about a thousand BCE, Brahmanical practice classified people into gotras named after Vedic seers. A woman was expected to give up her father\'s gotra and adopt her husband\'s on marriage, and members of one gotra could not marry. But inscriptions of the Satavahanas show departures from these rules, as the lower box on the figure shows.',
    }),
    sl('concept', 'Satavahana departures', {
      b: 'Names and gotras in inscriptions show **practice differing from the texts**.',
      v: vSat,
      n: 'Several Satavahana queens, such as Gotami and Vasithi, kept names from their fathers\' gotras. Some belonged to the same gotra as their husbands, a practice also found in parts of south India. Some rulers were named after their mothers. But this did not mean mothers decided succession, which was usually patrilineal.',
    }),
    sl('check', 'Quick check: gotra', {
      b: 'After marriage, a woman was expected to…',
      chk: 'm_gotra_rule',
      n: 'Think of the gotra she would be counted in.',
    }),
    sl('example', 'Worked example 3: planning a 5-mark answer', {
      b: 'Question: *Discuss the importance of patriliny in early societies.*',
      bl: [
        'Step 1 — **Define** it.',
        'Step 2 — Give the **norm** and its date.',
        'Step 3 — Give **exceptions**.',
        'Step 4 — Add **other evidence**; end with a **judgement**.',
      ],
      v: vPlan5,
      n: 'To plan a five mark answer on patriliny, define it in one line. Then state the norm and its date. Next give the exceptions, such as brothers succeeding and women like Prabhavati Gupta. Add other evidence, such as Satavahana names. Close with a judgement: patriliny was dominant, but not universal.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. The critical edition ran from nineteen seventeen to nineteen sixty six and showed a common core with regional variations. The epic grew over about a thousand years. Patriliny was the ideal, with exceptions. Marriage had four key terms and eight forms. Gotra rules were set out in texts, and Satavahana inscriptions show departures.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'The edition chose verses **common to most** versions.',
        'Metronymics do **not** mean matrilineal succession.',
        'Polygyny: **wives**. Polyandry: **husbands**.',
        'Say that some queens **departed** from the gotra rule.',
        'A norm is not proof of practice.',
      ],
      v: vTips1,
      n: 'A few tips. Remember that the edition chose verses common to most versions. Do not write that metronymics prove matrilineal succession. Keep polygyny and polyandry apart. Say that some queens departed from the gotra rule, not all. And always separate what a text says should happen from what the evidence shows did happen.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Kinship, Caste and Class — Part 2: Varna, Property and the Epic as a Text',
  goals: [
    'Compare the ideal varna order with evidence of social reality',
    'Explain jati, guilds and the position of those outside the order',
    'Explain gendered access to property and the Buddhist alternative',
    'Analyse the Mahabharata as a dynamic text and read a text as a source',
  ],
  slides: [
    sl('title', 'Varna, Property and the Epic as a Text', {
      b: 'Part 2: the **varna ideal and the reality**, **jati**, **property**, **Buddhist views** and how historians **analyse a text**.',
      v: vRoute2,
      n: 'In this part we look at the varna order laid down in texts and set it beside evidence of how society worked. We study jati, property and gender, and an alternative view in Buddhist texts. We end by asking how historians analyse the Mahabharata as a text, and practise reading a text as a source.',
    }),
    sl('concept', 'The ideal varna order', {
      b: 'Four varnas, each with **assigned duties**, laid down in the Dharmasutras and Dharmashastras.',
      v: vVarna4,
      n: 'The Dharmasutras and Dharmashastras set out an ideal order of four varnas. Brahmanas were to study and teach the Vedas, perform sacrifices and give and receive gifts. Kshatriyas were to fight, protect people and administer justice. Vaishyas were to farm, herd and trade. Shudras were to serve the three higher varnas. This is a norm laid down in texts.',
    }),
    sl('concept', 'How Brahmanas urged the order', {
      b: 'Three **strategies** to enforce the norms.',
      v: vStrat,
      n: 'Brahmanas used three strategies to enforce the order. First, they claimed that it had a divine origin, citing a hymn of the Rigveda. Second, they advised kings to uphold it in their kingdoms. Third, they tried to persuade people that status was fixed by birth. How far people accepted this is a separate question, which we test against evidence.',
    }),
    sl('diagram', 'Ideal order and evidence of practice', {
      v: vVarnaSvg,
      n: 'On the left is the ideal order set out in the texts. On the right is evidence of how society worked. The Shungas and Kanvas were Brahmanas who ruled. The Shakas were called outsiders by Brahmanas, yet Rudradaman ruled well. A Satavahana ruler claimed to be a Brahmana king. Guilds and jatis were organised by occupation.',
    }),
    sl('concept', 'Rulers of different backgrounds', {
      b: 'Kings were **not always Kshatriyas**.',
      v: vRulers,
      n: 'The Mauryas are called Kshatriyas in Buddhist texts but low in origin in some Brahmanical texts, so the sources disagree. The Shungas and Kanvas were Brahmanas. The Shakas came from Central Asia and were called mlechchhas, yet Rudradaman repaired the Sudarshana lake. The Satavahana ruler Gotami-puta Siri-Satakani claimed to be a unique Brahmana and married into the Shaka family.',
    }),
    sl('check', 'Quick check: duties', {
      b: 'Which varna was expected to serve the three higher varnas?',
      chk: 'm_varna_duty',
      n: 'Think of the fourth varna.',
    }),
    sl('example', 'Worked example 1: reading a norm beside other evidence', {
      b: 'An imagined text assigns fixed duties to each varna. A guild inscription shows members of mixed callings. What can we say?',
      bl: [
        'Step 1 — State **what the text says**.',
        'Step 2 — Ask **who wrote it** and for whom.',
        'Step 3 — Set **other evidence** beside it.',
        'Step 4 — Conclude **carefully**: an ideal, with varied practice.',
      ],
      v: vNormEx,
      n: 'First state what the text says: each varna has fixed duties. Then ask who wrote it and for whom. Now set a guild inscription beside it, showing members of mixed callings. A careful conclusion is that the text shows an ideal, while practice was more varied. We cannot say that everyone ignored the text, or that everyone obeyed it.',
    }),
    sl('concept', 'Jati and guilds', {
      b: 'The number of jatis was **not fixed**. Members often shared an **occupation** and formed **shrenis**.',
      v: vJati,
      n: 'Unlike the four varnas, the number of jatis was not fixed. New groups, such as forest peoples like the Nishadas and guilds of craftspeople, were classed as jatis. Members of a jati often shared an occupation, and could form guilds called shrenis. The Mandasor inscription of the fifth century CE records silk weavers from Lata who built a temple to the sun god.',
    }),
    sl('example', 'Worked example 2: planning a 3-mark answer', {
      b: 'Question: *Explain how new jatis arose.*',
      bl: [
        'Step 1 — **New groups**, such as forest peoples, classed as jatis.',
        'Step 2 — **Craft guilds** formed around an occupation.',
        'Step 3 — **No fixed number**, unlike the four varnas.',
      ],
      v: vJati3,
      n: 'For a three mark answer, give three distinct points, one line each. First, new groups such as forest peoples were classed as jatis. Second, craft workers formed guilds around an occupation. Third, the number of jatis was not fixed, unlike the four varnas. Keep each point short, and do not repeat the same idea in different words.',
    }),
    sl('check', 'Quick check: jati', {
      b: 'Assertion: the number of jatis was not fixed. Reason: the Dharmashastras described four varnas. Which option is correct?',
      chk: 'ar_jati',
      n: 'Decide whether the second statement explains the first.',
    }),
    sl('concept', 'Those outside the system', {
      b: 'Forest peoples, nomads, speakers of other languages and the **chandalas**. Untouchability was an unjust practice; Article 17 of the Constitution abolishes it.',
      v: vOutside,
      n: 'Some groups stood outside the varna system, such as forest peoples, nomads and speakers of non Sanskritic languages, called mlechchhas. The chandalas were placed at the very bottom and given tasks such as handling corpses. The Manusmriti set restrictions on them, and Chinese pilgrims recorded that they lived outside towns. This was unjust, and the Constitution now abolishes it.',
    }),
    sl('concept', 'Property: sons, daughters, stridhana', {
      b: 'The Manusmriti: estate to the **sons**; women kept **stridhana**.',
      v: vProp,
      n: 'The Manusmriti said that a father\'s estate should be divided among the sons after both parents died, with a special share for the eldest. Women could not claim a share, but they kept stridhana, gifts received at marriage, which their children could inherit. The text also warned women against hoarding family property. Yet upper class women such as Prabhavati Gupta had access to resources.',
    }),
    sl('two-column', 'Varna, wealth and status', {
      cols: [
        '**In the Brahmanical texts:** occupations and status were tied to varna, and the Shudras were to serve.',
        '**In other evidence:** Buddhist texts mention wealthy people of low status and poor Brahmanas; Tamil Sangam texts show chiefs as patrons of poets, with the rich expected to share.',
      ],
      v: vWealth,
      n: 'Brahmanical texts tied occupations and status to varna. But other evidence points to a more varied picture. Buddhist and other texts mention wealthy people of low status and poor Brahmanas. Tamil Sangam texts show chiefs as patrons of poets, and say that the rich were expected to share. Wealth and status did not always move together.',
    }),
    sl('concept', 'A Buddhist alternative', {
      b: 'Differences were recognised, but **not seen as natural or fixed**.',
      v: vBuddha,
      n: 'Buddhists recognised differences in society, but they did not regard them as natural or fixed. They rejected claims of status by birth. A story in the Sutta Pitaka describes a ruler, the mahasammata, chosen by the people. It suggests that human institutions are made by human choices. This was an alternative view, not a programme that removed all differences.',
    }),
    sl('check', 'Quick check: the Buddhist view', {
      b: 'How did Buddhist teachings treat social differences?',
      chk: 'm_buddhist_view',
      n: 'Remember that they recognised differences.',
    }),
    sl('diagram', 'Texts, rulers and observers across a thousand years', {
      v: vEras,
      n: 'This timeline places the sources of the chapter. The epic begins to take shape from about five hundred BCE. The Manusmriti was compiled between about two hundred BCE and two hundred CE. Rudradaman repaired the lake in the second century CE. The Mandasor inscription belongs to the fifth century CE, and Xuan Zang travelled in India in the seventh century.',
    }),
    sl('concept', 'Analysing the epic as a text', {
      b: 'Ask about **language**, **content**, **author** and **date**.',
      v: vTextRows,
      n: 'Historians ask four questions of the epic. Language: Sanskrit, but simpler than the Vedas. Content: narrative and teaching sections. Author: tradition names Vyasa, but historians think sutas composed it first and Brahmanas later added material. Date: about a thousand years from five hundred BCE. At Hastinapur, B B Lal found a settlement in nineteen fifty one and fifty two, but the identification is debated.',
    }),
    sl('diagram', 'A dynamic text', {
      v: vDynamic,
      n: 'The Mahabharata kept growing. It was first sung by sutas. Brahmanas later preserved it and added material. Between about two hundred BCE and two hundred CE, worship of Vishnu grew and Krishna came to be identified with Vishnu. The Bhagavad Gita is part of the epic. It has been retold in many languages, in written and oral forms, in folk versions and performances.',
    }),
    sl('example', 'Worked example 3: reading a text as a source', {
      b: 'A summary says: *Sons divide the estate; daughters are not named.* How do you use it?',
      bl: [
        'Step 1 — Note **what it says**.',
        'Step 2 — Separate **observation** from **inference**.',
        'Step 3 — Ask **who wrote it** and for whom.',
        'Step 4 — State **what cannot be said**.',
      ],
      v: vReadText,
      n: 'Note first what the summary says. Then separate observation from inference. That the rule is stated is an observation. That families followed it is an inference. Ask who wrote the text and for whom. Finally state what cannot be said, such as how many families kept the rule. A text shows an intention, and other evidence is needed to show practice.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. The texts set out four varnas with assigned duties, and Brahmanas used three strategies to enforce them. Rulers of many backgrounds show that practice differed. The number of jatis was not fixed. Property passed to sons, with stridhana for women. Buddhists recognised differences but did not see them as natural. The epic is a dynamic text.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'A **norm** is not a description of life.',
        'Not all rulers were **Kshatriyas**; the Mauryas are **disputed**.',
        'The identification of Hastinapur is **debated**.',
        'Buddhists **recognised** differences; they rejected claims of birth.',
        'In source questions, separate **observation** from **inference**.',
      ],
      v: vTips2,
      n: 'Some tips. A norm is not a description of life. Not all rulers were Kshatriyas, and the Mauryas are disputed. The identification of Hastinapur is debated. Buddhists recognised differences but rejected claims of status by birth. In source questions, separate what the text says from what you infer, and say what cannot be concluded.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Kinship, Caste and Class — Notes',
  sections: [
    {
      h: '1. The critical edition of the Mahabharata',
      t: 1,
      b: 'The project began in **1917** at the **Bhandarkar Oriental Research Institute, Pune**, and from **1919** it was led by **V. S. Sukthankar**. Scholars gathered Sanskrit manuscripts from across the subcontinent, compared them, and retained the verses found in most versions. The result filled many volumes and over **13,000 pages**, and it was finished in **1966**, roughly 47 years after the start.\n\n**What it showed:** a **common core** of the story across regions, alongside many **regional variations**. Historians read the variations as a trace of the complex social histories through which the story passed, and as a sign that the normative texts were not followed everywhere.',
      terms: [
        ['Critical edition', 'A text prepared by comparing many manuscripts and choosing the readings best supported by them.'],
        ['Variation', 'A reading or episode found in some manuscripts or regions but not in most.'],
      ],
      v: vEdition,
      vs: [vEdSteps, vEdFind],
    },
    {
      h: '2. The Mahabharata: story, composers and growth',
      t: 1,
      b: 'The epic centres on a conflict between two sets of cousins, the **Kauravas** and **Pandavas**, of the **Kuru** lineage. It was composed over about a thousand years from c. **500 BCE**, and it has **narrative** parts and **didactic** parts. Its Sanskrit is simpler than that of the Vedas or of the prashastis, royal praise poems.\n\nTradition names **Vyasa** as author. Historians think that **sutas** (charioteer-bards) first composed it, and that Brahmanas later took over its preservation and added material. From c. **200 BCE to 200 CE** the worship of **Vishnu** grew and Krishna came to be identified with Vishnu; the **Bhagavad Gita** belongs to the epic.',
      terms: [
        ['Suta', 'A charioteer-bard, thought to be among the first composers and singers of the epic.'],
        ['Didactic', 'Meant to teach, as in the long passages on conduct.'],
      ],
      v: vEpic,
      vs: [vDynamic],
    },
    {
      h: '3. Kinship and marriage',
      t: 2,
      b: '**Kula** is family, **jnati** is the wider body of kinfolk and **vamsha** is lineage. **Patriliny** (descent from father to son) became the ideal in ruling families from c. 6th century BCE, and the epic shows succession from father to son as usual. **Matriliny** traces descent through the mother. There were exceptions: brothers sometimes succeeded, and women such as **Prabhavati Gupta** exercised power.\n\n**Marriage terms:** **exogamy** (outside a unit), **endogamy** (within a unit), **polygyny** (several wives) and **polyandry** (several husbands, as in Draupadi\'s marriage to the Pandavas, which historians explain in different ways). The Dharmashastras, including the **Manusmriti** (compiled c. 200 BCE to 200 CE), recognised **eight forms** of marriage, ranking the first four as good and condemning the rest. **Kanyadana**, the gift of a daughter, was a father\'s important duty.',
      terms: [
        ['Patriliny', 'Descent traced from father to son.'],
        ['Kanyadana', 'The gift of a daughter in marriage, a father\'s duty.'],
      ],
      v: vKin,
      vs: [vPatri, vMarr, vForms],
    },
    {
      h: '4. Gotra and the Satavahanas',
      t: 2,
      b: 'From about **1000 BCE**, a Brahmanical practice sorted people into **gotras** named after Vedic seers. A bride was expected to leave her father\'s gotra and take her husband\'s, and men and women of one gotra were not to marry.\n\nInscriptions of the **Satavahanas** show other customs. Several queens, such as **Gotami** and **Vasithi**, kept names formed from their fathers\' gotras. Some queens shared the gotra of their husbands (endogamy, also found in parts of south India). Some rulers, such as **Gotami-puta Siri-Satakani**, carried **metronymics**, names from the mother. Even so, succession to the throne was usually patrilineal.',
      terms: [
        ['Gotra', 'A group of people classified under the name of a Vedic seer; a bride was expected to adopt her husband\'s.'],
        ['Metronymic', 'A name derived from the mother.'],
      ],
      v: vGotra,
      vs: [vSat],
    },
    {
      h: '5. Varna, jati and the Brahmanical ideal',
      t: 3,
      b: 'The Dharmasutras and Dharmashastras described an ideal order of **four varnas**. **Brahmanas**: study and teach the Vedas, perform sacrifices, give and receive gifts. **Kshatriyas**: warfare, protection, justice (and study, sacrifice, gifts). **Vaishyas**: these as well as agriculture, pastoralism and trade. **Shudras**: service to the three higher varnas.\n\nBrahmanas pressed the order through **three strategies**: a claim of divine origin (citing a Rigveda hymn), advice to kings to enforce it, and persuasion that status came by birth.\n\n**Reality:** the Mauryas are Kshatriya in Buddhist texts, of low origin in some Brahmanical ones; the Shungas and Kanvas were Brahmanas; the Shaka Rudradaman (c. 2nd century CE) repaired the Sudarshana lake although Brahmanas called Shakas mlechchhas; the Satavahana Gotami-puta Siri-Satakani claimed to be a unique Brahmana and married into the Shaka family.\n\n**Jati:** the number was not fixed; new groups (forest peoples such as the Nishadas, craft guilds) were classed as jatis, and members often shared an occupation and formed **shrenis**. The **Mandasor** inscription (5th century CE) records silk weavers from Lata building a temple to the sun god.\n\n**Outside the order:** forest peoples, nomads and mlechchhas. The Ekalavya story in the epic tells of a Nishada refused instruction by Drona. The **chandalas** were placed at the bottom, given tasks such as handling corpses and restricted by the Manusmriti; **Fa Xian** (c. 5th century CE) and **Xuan Zang** (c. 7th century CE) recorded that they lived outside towns. Untouchability was an unjust practice, and Article 17 of the Constitution abolishes it.',
      terms: [
        ['Varna', 'One of four groups in the ideal order laid down in the Dharmasutras and Dharmashastras.'],
        ['Jati', 'A hereditary group, often tied to an occupation, whose number was not fixed.'],
      ],
      v: vVarna4,
      vs: [vVarnaSvg, vRulers, vJati, vOutside],
    },
    {
      h: '6. Beyond birth: property, wealth and Buddhist views',
      t: 4,
      b: '**Property.** The Manusmriti said that, after both parents died, a father\'s estate was to be divided equally among the sons, with a special share for the eldest. Women had no claim to a share of that estate, but they could keep **stridhana**, gifts received at marriage, which their children could inherit without the husband\'s claim. The text warned women against hoarding family property without the husband\'s permission. Upper-class women such as **Prabhavati Gupta** had access to resources such as land.\n\n**Varna and wealth.** Shudras were expected to serve, yet Buddhist and other texts show wealthy people of low status and poor Brahmanas. Tamil **Sangam** texts show chiefs as patrons of poets, with the rich expected to share.\n\n**Buddhist alternative.** Buddhists recognised differences but did not regard them as natural or fixed, and rejected claims of status by birth. A story in the **Sutta Pitaka** describes a ruler, the **mahasammata**, chosen by the people, suggesting that institutions are made by human choices.',
      terms: [
        ['Stridhana', 'Gifts a woman received at marriage; hers to keep, and inherited by her children.'],
        ['Mahasammata', 'In a Sutta Pitaka story, the ruler chosen by the people.'],
      ],
      v: vProp,
      vs: [vWealth, vBuddha],
    },
    {
      h: '7. The epic as a dynamic text, and texts as sources',
      t: [4, 5],
      b: 'Historians ask four questions of a text: **language** (Sanskrit, simpler than the Vedas), **content** (narrative and didactic sections), **author** (tradition: Vyasa; historians: sutas first, Brahmanas later) and **date** (about a thousand years from c. 500 BCE).\n\nAt **Hastinapur**, a village near Meerut, **B. B. Lal** excavated in **1951 to 1952** and found traces of a settlement; whether it is the epic\'s Hastinapura is debated. The epic is a **dynamic text**: it was retold in many languages and regions, in written and oral forms, in folk versions and performances.\n\n**Reading a text as a source:** note who wrote it and for whom, separate what it says from what you infer, treat a norm as a norm and not as proof of practice, and say what cannot be concluded.',
      terms: [
        ['Dynamic text', 'A text that keeps changing through additions and retellings in many forms.'],
        ['Normative text', 'A text that lays down how people should act, not a record of how they did.'],
      ],
      v: vTextRows,
      vs: [vEras, vReadText],
    },
  ],
  tips: '**Common mistakes**\n- Writing that the critical edition restored the original epic, or that it proved regional versions worthless.\n- Writing that metronymics prove matrilineal succession, or that every queen broke the gotra rule.\n- Mixing up polygyny and polyandry, or exogamy and endogamy.\n- Presenting the varna order as a description of what everyone did, or writing that all kings were Kshatriyas.\n- Saying that Hastinapur is proven to be the epic\'s city.\n- Writing that Buddhists denied that any social differences existed.\n- In source questions, copying a sentence when asked to infer, or stating an inference as a fact.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); "assess" and "to what extent" need evidence on both sides and a judgement.\n- Source questions (4 marks): part (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice; the board paper will give its own. Treat every rule in a text as a norm and ask what other evidence shows.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Where and when did the critical edition project begin?', '1917, at the **Bhandarkar Oriental Research Institute**, Pune.', 'fact', 1],
  ['Who led the critical edition from 1919?', '**V. S. Sukthankar**.', 'fact', 1],
  ['When was the critical edition completed?', '**1966**, after about 47 years.', 'fact', 1],
  ['How did editors choose between manuscripts?', 'They kept the verses **common to most versions**.', 'concept', 1],
  ['What did the edition show?', 'A **common core** with many **regional variations**.', 'concept', 1],
  ['Why record the variations?', 'They are evidence of how the story changed in different societies.', 'exam-tip', 1],
  ['The Mahabharata: its story', 'A conflict between two sets of cousins, **Kauravas** and **Pandavas**, of the **Kuru** lineage.', 'fact', 1],
  ['Who first composed the epic, according to historians?', '**Sutas** (charioteer-bards); Brahmanas later added material.', 'fact', 1],
  ['Time span of composition', 'About a thousand years from c. **500 BCE**.', 'fact', 1],
  ['**Dynamic text**', 'A text that keeps changing through additions and retellings.', 'definition', 4],
  ['**Kula**, **jnati**, **vamsha**', 'Family, kinfolk, lineage.', 'definition', 2],
  ['**Patriliny**', 'Descent traced from father to son.', 'definition', 2],
  ['**Matriliny**', 'Descent traced through the mother.', 'definition', 2],
  ['Exceptions to patrilineal succession', 'Brothers sometimes succeeded; women such as **Prabhavati Gupta** held power.', 'fact', 2],
  ['**Exogamy** and **endogamy**', 'Marriage outside a unit; marriage within a unit.', 'definition', 2],
  ['**Polygyny** and **polyandry**', 'Several wives; several husbands. Draupadi: polyandry.', 'definition', 2],
  ['Forms of marriage in the Dharmashastras', 'Eight; the first four good, the rest condemned.', 'fact', 2],
  ['**Kanyadana**', 'Gift of a daughter in marriage; a father\'s important duty.', 'definition', 2],
  ['**Gotra**: the rules', 'Named after Vedic seers; same-gotra marriage barred; bride adopts husband\'s gotra.', 'concept', 2],
  ['Satavahana departures', 'Queens kept names from fathers\' gotras; some shared husbands\' gotras; metronymics.', 'concept', 2],
  ['Do metronymics mean matriliny?', 'No: succession was usually **patrilineal**.', 'exam-tip', 2],
  ['Duties of the four varnas', 'Brahmanas: study, teach, sacrifice, gifts. Kshatriyas: warfare, justice. Vaishyas: farming, herding, trade. Shudras: service.', 'fact', 3],
  ['Three strategies of Brahmanas', 'Divine origin; advising kings; status by birth.', 'concept', 3],
  ['Examples of non-Kshatriya rulers', 'Shungas and Kanvas (Brahmanas); Shakas (Rudradaman); Gotami-puta Siri-Satakani.', 'fact', 3],
  ['The Mauryas and varna', 'Kshatriya in Buddhist texts; low origin in some Brahmanical texts.', 'exam-tip', 3],
  ['Varna vs jati: number', 'Varnas: four, fixed. Jatis: **not fixed**.', 'concept', 3],
  ['**Shreni**', 'A guild of craftspeople, often of one jati. Example: silk weavers at Mandasor.', 'definition', 3],
  ['Those outside the varna system', 'Forest peoples, nomads, mlechchhas, and the chandalas at the bottom.', 'fact', 3],
  ['**Stridhana**', 'Gifts a woman received at marriage; hers to keep; her children could inherit.', 'definition', 4],
  ['Manusmriti on a father\'s estate', 'Divided equally among the sons, with a special share for the eldest.', 'fact', 4],
  ['Buddhist view of social differences', 'Recognised, but **not natural or fixed**; claims of birth rejected.', 'concept', 4],
  ['Reading a text as a source', 'Separate what it says from what you infer; a norm is not proof of practice.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Kinship, Caste and Class',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ed_weaken', 'm_jati_case', 'm_property_case', 'ar_gotra'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_ed_claim', 's_guild', 's3_kin'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_dynamic', 'l_varna'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_prop'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Kinship, Caste and Class',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ed_question', 'm_exo', 'm_metro', 'm_nonksh_new', 'm_source_fit', 'm_land_inscr', 'm_text_date', 'm_source_conflict', 'ar_varna_weak', 'ar_dyn'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_sat_inf', 's_dating', { attempt: 1, keys: ['s_jati', 's_ed_steps'] }, 's3_ed', { attempt: 1, keys: ['s3_claim', 's3_property'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_kin', { attempt: 1, keys: ['l_buddhist', 'l_marriage'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_diary', 'sb_varna'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch03 only (the critical edition and the epic; kinship, marriage and gotra; varna, jati and the Brahmanical ideal; property, Buddhist views and the epic as a dynamic text; source-based practice with texts)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; no verse or passage of the Mahabharata, Manusmriti, Dharmasutras, Rigveda or any inscription is quoted or closely paraphrased; no NCERT text, source box, caption, map or exercise and no board or sample-paper item reused (D-036)',
    facts: 'critical edition begun 1917 at the Bhandarkar Oriental Research Institute, Pune; Sukthankar from 1919; over 13,000 pages; completed 1966; epic composed over about a thousand years from c. 500 BCE; Manusmriti c. 200 BCE–200 CE; Vishnu worship c. 200 BCE–200 CE; Lal at Hastinapur 1951–52; Rudradaman c. 2nd century CE; Mandasor 5th century CE; Fa Xian c. 5th and Xuan Zang c. 7th century CE; no maps (OA-23)',
    neutrality: 'caste, untouchability and gender presented as norms in particular texts set against evidence of social reality; debates presented as debates; untouchability stated once as an unjust practice abolished by Article 17',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
