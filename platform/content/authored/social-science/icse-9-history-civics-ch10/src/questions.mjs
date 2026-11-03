// ICSE 9 History & Civics, ch10 The Age of the Guptas — question bank.
// Every pilgrim's notebook, museum label, club log, school scene and eulogy below is imagined by SOYL and labelled as
// imagined; no textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No passage of
// Fa-hien's account, of the Allahabad Pillar Inscription or of any work of Kalidasa is quoted: ideas are paraphrased.
// Dates are the commonly taught approximate ones (books differ): Gupta era from about 319-320 CE; Chandragupta I about
// 320-335 CE; Samudragupta about 335-375 CE; Chandragupta II about 375-415 CE; Kumaragupta I about 415-455 CE;
// Skandagupta about 455-467 CE; Fa-hien in India about 399-412 CE; Aryabhatta born 476 CE, Aryabhatiya about 499 CE.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
export const REIGNS = [
  ['Chandragupta I', 320, 335],
  ['Samudragupta', 335, 375],
  ['Chandragupta II', 375, 415],
  ['Kumaragupta I', 415, 455],
  ['Skandagupta', 455, 467],
];
for (let i = 1; i < REIGNS.length; i++) assert.equal(REIGNS[i][1], REIGNS[i - 1][2]);

/** The five rulers as bars on one time line, drawn roughly to scale (years CE, approximate). */
export function rulersFigure(alt, caption) {
  const s = new Svg(720, 235);
  const px = 640 / (REIGNS[4][2] - REIGNS[0][1]);
  const X = (yr) => 40 + (yr - REIGNS[0][1]) * px;
  const cols = ['accent', 'green', 'blue', 'accent', 'green'];
  REIGNS.forEach(([name, a, b], i) => {
    const x = X(a);
    const w = (b - a) * px;
    const cx = x + w / 2;
    s.rect(x, 100, w, 34, { rx: 6, fill: cols[i], fillOpacity: 0.2, color: cols[i], sw: 1.8 });
    const ny = i % 2 === 0 ? 40 : 70;
    s.line(cx, ny + 11, cx, 100, { sw: 1, color: 'muted', dash: true });
    s.text(cx, ny, name, { size: 14, bold: true });
    const dy = i % 2 === 0 ? 158 : 184;
    s.line(cx, 134, cx, dy - 11, { sw: 1, color: 'muted', dash: true });
    s.text(cx, dy, `about ${a} to ${b} CE`, { size: 12 });
  });
  s.text(360, 218, 'Drawn roughly to scale. Dates are approximate and books differ by a few years', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Chart of Gupta administration. */
export function adminFigure(alt, caption) {
  const s = new Svg(720, 360);
  s.rect(230, 10, 260, 42, { rx: 8, fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.8 });
  s.text(360, 31, 'The king (Maharajadhiraja)', { size: 15, bold: true });
  s.line(360, 52, 360, 68, { sw: 1.6 });
  s.rect(110, 68, 500, 62, { rx: 8, fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.8 });
  s.text(360, 88, 'Ministers and high officers', { size: 15, bold: true });
  s.text(360, 112, 'Kumaramatya, sandhivigrahika, mahadandanayaka', { size: 13 });
  const cols = [
    ['Province (bhukti)', 'accent', ['Head: uparika', 'Acts for the king']],
    ['District (vishaya)', 'green', ['Head: vishayapati', 'Looks after the district']],
    ['Village', 'blue', ['Head: gramika', 'Helped by village elders']],
  ];
  cols.forEach(([title, col, lines], i) => {
    const x = 15 + i * 245;
    s.line(360, 130, x + 100, 152, { sw: 1.4, color: 'muted' });
    s.rect(x, 152, 200, 110, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + 100, 176, title, { size: 15, bold: true });
    s.line(x + 14, 192, x + 186, 192, { sw: 1, color: col });
    lines.forEach((t, k) => s.text(x + 100, 217 + k * 24, t, { size: 13 }));
    if (i < 2) s.arrow(x + 202, 207, x + 243, 207, { sw: 1.4, color: 'muted' });
  });
  s.rect(15, 282, 690, 44, { rx: 8, fill: 'fill', fillOpacity: 0.5, color: 'muted', sw: 1.4 });
  s.text(360, 304, 'Towns: councils with representatives of guilds', { size: 14, bold: true });
  s.text(360, 346, 'Simplified chart; titles of officers and their duties vary between books', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic plan and side view of the Dashavatara temple at Deogarh. */
export function templeFigure(alt, caption) {
  const s = new Svg(720, 350);
  s.text(180, 22, 'Plan (top view)', { size: 15, bold: true });
  s.rect(60, 45, 240, 240, { rx: 4, color: 'muted', sw: 1.6, dash: true });
  s.rect(135, 120, 90, 90, { rx: 2, fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 2 });
  s.text(180, 165, 'Sanctum', { size: 14, bold: true });
  [[72, 57], [248, 57], [72, 233], [248, 233]].forEach(([x, y]) => s.rect(x, y, 40, 40, { rx: 2, color: 'green', sw: 1.4, dash: true }));
  s.text(180, 303, 'Raised platform (jagati)', { size: 13 });
  s.text(180, 322, 'Dashed corners: small shrines (panchayatana plan)', { size: 11, muted: true });
  s.text(550, 22, 'Side view', { size: 15, bold: true });
  s.rect(415, 250, 270, 36, { rx: 3, fill: 'fill', fillOpacity: 0.5, color: 'muted', sw: 1.6 });
  s.text(550, 268, 'Platform (jagati)', { size: 13 });
  s.rect(470, 155, 160, 95, { rx: 2, fill: 'blue', fillOpacity: 0.14, color: 'blue', sw: 1.8 });
  s.text(550, 195, 'Square sanctum', { size: 13, bold: true });
  s.text(550, 218, 'with carved panels', { size: 12 });
  s.polygon([[480, 155], [620, 155], [595, 100], [505, 100]], { fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.8 });
  s.text(550, 128, 'Shikhara (tower)', { size: 13, bold: true });
  s.polyline([[505, 100], [550, 55], [595, 100]], { color: 'muted', sw: 1.4, dash: true });
  s.text(625, 68, 'Upper part lost', { size: 12, anchor: 'start', muted: true });
  s.text(360, 342, 'Schematic, not to scale. A simple sketch of the main features, not an exact plan', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic map of some places linked with the Guptas. */
export function mapFigure(alt, caption) {
  const s = new Svg(720, 400);
  const pts = [
    [392, 175, 'Deogarh', 'end', 'green', 0],
    [445, 130, 'Prayagraj (Allahabad)', 'end', 'accent', 0],
    [492, 130, 'Pataliputra', 'start', 'blue', -8],
    [498, 165, 'Nalanda', 'start', 'accent', 6],
  ];
  pts.forEach(([x, y, name, anchor, col, dy]) => {
    s.dot(x, y, 6, col);
    s.text(x + (anchor === 'start' ? 12 : -12), y + dy, name, { size: 14, anchor, bold: true });
  });
  s.text(250, 215, 'Western India', { size: 13, italic: true });
  s.text(250, 233, '(land of the Shakas)', { size: 12, italic: true, muted: true });
  s.text(360, 392, 'Schematic, not to scale. Positions are approximate and only some places are shown', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Sources
Q('m_fahien_king', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A student in an imagined Class IX history club says, "Fa-hien tells us in his book that Chandragupta II was a great ruler." Which reply is the most accurate?',
  opts: [
    'Fa-hien does not name the king; historians link his visit of about 399 to 412 CE with Chandragupta II from the dates',
    'Fa-hien names Samudragupta in every chapter',
    'Fa-hien was a Gupta minister who wrote the king\'s orders',
    'Fa-hien wrote only about Nalanda and not about the land',
  ],
  sol: 'The account describes the land and its people but, as commonly taught, does not name the king; the link with Chandragupta II comes from the dates. He was a Chinese monk, not a minister, and he wrote about many places.',
}));
Q('m_fahien_chandala', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'In an imagined discussion, a teacher notes that Fa-hien found the land peaceful and prosperous but also records that Chandalas lived apart and were treated as outcastes. What should a historian conclude?',
  opts: [
    'Conditions were not the same for everyone: the account shows prosperity and also social exclusion of some groups',
    'There was no inequality of any kind in Gupta society',
    'Chandalas governed the towns where they lived',
    'The account cannot be used at all as a source',
  ],
  sol: 'A careful reading keeps both observations: a prosperous land and a society in which some groups were excluded. The account is a useful source, though not a perfect one; the other options contradict it.',
}));
Q('m_fahien_punish', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined student prepares a chart headed "What Fa-hien\'s account is commonly taught to say about the Gupta land". Which entry belongs on the chart?',
  opts: [
    'Punishments were mostly mild, often fines, and travellers could move about freely',
    'Every traveller needed a royal pass at each town',
    'Buddhist monasteries had all been closed',
    'The pilgrim was received by the king in a grand court procession',
  ],
  sol: 'As commonly taught, the account describes mild punishments, mostly fines, and freedom of movement. It also mentions Buddhist monasteries, so closure is wrong, and it does not claim a royal pass or a procession.',
}));
Q('m_prayag_caution', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A student in an imagined debate says, "Every claim in the Allahabad Pillar Inscription must be exactly true, because it was carved in stone." Which reply is the most accurate?',
  opts: [
    'It is a prashasti, a eulogy meant to praise the king, so it should be read with care and checked against other evidence such as coins',
    'It is true in every line, because stone cannot be changed',
    'It is false in every line, because a poet wrote it',
    'It says nothing about the ruler\'s campaigns',
  ],
  sol: 'A prashasti is written to praise, so a historian reads it with care and compares it with other evidence. It is not true in every line or false in every line, and it does record the campaigns.',
}));
Q('m_prashasti_use', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A researcher in an imagined library wants a list of the northern and southern rulers who, according to a court record, submitted to Samudragupta. Which source should she open first?',
  opts: ['The Allahabad Pillar Inscription', 'The account of Fa-hien', 'The Sushruta Samhita', 'The ruins of Nalanda'],
  sol: 'The inscription records Samudragupta\'s campaigns and the rulers who submitted. Fa-hien wrote about a later visit and about the land, the Samhita is a medical text, and the ruins of Nalanda belong to a monastery-university.',
}));
Q('tf_prashasti', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The Prayag Prashasti was composed in Sanskrit by Harisena, a court poet and official of Samudragupta.',
  sol: 'True. Harisena composed it in Sanskrit, and it was engraved on an earlier Ashokan pillar now at Allahabad (Prayagraj).',
}));
Q('fb_fahien', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Fa-hien, who visited India about 399 to 412 CE, came from the country of ___.',
  acc: [['China', 'china']],
  sol: 'He came from China: Fa-hien was a Chinese Buddhist monk-pilgrim.',
}));
Q('mt_sources', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each term connected with the sources of Gupta history with what it is.',
  pairs: [
    ['Fa-hien', 'Chinese monk-pilgrim who visited India about 399 to 412 CE'],
    ['Harisena', 'Court poet who composed the Prayag Prashasti'],
    ['Prashasti', 'A eulogy that praises a king'],
    ['Allahabad pillar', 'An earlier Ashokan pillar that carries the inscription'],
  ],
  sol: 'Fa-hien was the Chinese pilgrim, Harisena the poet, a prashasti is a eulogy, and the Allahabad pillar is an Ashokan pillar that was later engraved with the inscription.',
}));
Q('s_fahien', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two things that the account of Fa-hien tells us about life in the Gupta land.',
  model: '1. He describes a **peaceful and prosperous** land where **punishments were mild**, mostly fines.\n2. He notes **Buddhist monasteries** and **charitable houses and free hospitals** at Pataliputra, and that people could **travel freely**.',
  sol: 'Any two: peace and mild punishments; monasteries and hospitals; freedom of travel.',
  scheme: [['First observation from the account', 1], ['Second observation from the account', 1]],
}));
Q('s_prayag', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is the Allahabad Pillar Inscription important as a source for Samudragupta?',
  model: 'It was composed by **Harisena**, a court poet and official, and it records Samudragupta\'s **campaigns in the north and the south** and the **rulers who submitted**. It is therefore a main source for his reign.',
  sol: 'Harisena; campaigns and rulers who submitted.',
  scheme: [['Composed by Harisena, a court poet and official', 1], ['Records campaigns and rulers who submitted', 1]],
}));
Q('s_prashasti_care', short({
  t: 1, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'A student in an imagined class calls the Allahabad Pillar Inscription "the complete truth about Samudragupta". Give two reasons why a historian would not say this.',
  model: 'It is a **prashasti**, a **eulogy** written to praise the king, so it may leave out defeats or exaggerate. A historian therefore **checks it against other evidence**, such as coins.',
  sol: 'Eulogy meant to praise; compare with other evidence.',
  scheme: [['It is a eulogy that praises the king', 1], ['It must be checked against other evidence', 1]],
}));
Q('s3_sources', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name two sources of Gupta history, say who is linked with each, and give one reason why each must be read with care.',
  model: '1. **Fa-hien\'s account**: written by a Chinese monk who visited about 399 to 412 CE.\n2. **Allahabad Pillar Inscription**: composed by Harisena in praise of Samudragupta.\n3. **Care**: Fa-hien was an outsider who does not name the king, and the inscription is a **eulogy**, so both must be checked against other evidence.',
  sol: 'Two sources with their authors and two cautions.',
  scheme: [['Fa-hien\'s account with its author', 1], ['Allahabad Pillar Inscription with Harisena', 1], ['A caution for each source', 1]],
}));

// ================================================================ t02 Kings
Q('m_c1_marriage', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A family tree drawn by students of an imagined school shows that one early Gupta ruler married the Lichchhavi princess Kumaradevi, which strengthened his position. Whose name belongs at the top of the tree?',
  opts: ['Chandragupta I', 'Skandagupta', 'Kumaragupta I', 'Ghatotkacha'],
  sol: 'Chandragupta I is the ruler associated with the marriage to Kumaradevi. Ghatotkacha came before him in tradition, and Kumaragupta I and Skandagupta ruled later.',
}));
Q('m_veena', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In an imagined coin gallery, a gold coin shows a king seated and playing the veena. Which ruler, a military leader and also a patron of music, do such coins suggest?',
  opts: ['Samudragupta', 'Skandagupta', 'Kumaragupta I', 'Chandragupta I'],
  sol: 'Coins showing the king with a veena are linked with Samudragupta, who was a military leader and a patron of music. Skandagupta is remembered for resisting the Hunas, and the others are known for other reasons.',
}));
Q('m_shakas', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A teacher in an imagined classroom says: "This ruler took the title Vikramaditya after defeating the Shakas of western India." Which ruler is meant?',
  opts: ['Chandragupta II', 'Chandragupta I', 'Samudragupta', 'Kumaragupta I'],
  sol: 'Chandragupta II, also called Vikramaditya, is the ruler who defeated the Shakas of western India. The others are known for the marriage with Kumaradevi, for the southern and northern campaigns, and for a long peaceful reign.',
}));
Q('m_huna', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A guide at an imagined fort exhibition says that the last great ruler of the early Gupta line spent much of his reign resisting invaders called the Hunas. Whom does she mean?',
  opts: ['Skandagupta', 'Samudragupta', 'Chandragupta II', 'Sri Gupta'],
  sol: 'Skandagupta (about 455 to 467 CE) is the ruler who resisted the Huna invasions. Samudragupta and Chandragupta II ruled earlier, and Sri Gupta is regarded in tradition as the founder of the line.',
}));
Q('m_years_calc', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined museum label gives the reigns of Chandragupta II as about 375 to 415 CE and of Kumaragupta I as about 415 to 455 CE. About how many years did the two reigns cover together?',
  opts: ['About 80 years', 'About 40 years', 'About 120 years', 'About 8 years'],
  sol: 'Each reign is about 40 years, and 40 plus 40 gives about 80. The others come from counting one reign only, adding a third reign, or dropping a digit.',
}));
Q('ar_c1', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The marriage of Chandragupta I with Kumaradevi strengthened his position.',
  r: 'Kumaradevi was a Lichchhavi princess, so the marriage linked his house with an important ruling clan.',
  sol: 'Both are true, and the reason explains the assertion: the alliance with the Lichchhavi clan is what added to his standing.',
}));
Q('tf_vikramaditya', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'True or false? Chandragupta II is also known by the title Vikramaditya.',
  sol: 'True. Chandragupta II (about 375 or 380 to 415 CE) is commonly called Vikramaditya.',
}));
Q('ord_kings', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these Gupta rulers in chronological order, earliest first.',
  items: ['Chandragupta I', 'Samudragupta', 'Chandragupta II', 'Kumaragupta I', 'Skandagupta'],
  sol: 'Chandragupta I, Samudragupta, Chandragupta II, Kumaragupta I and Skandagupta.',
}));
Q('s_samudra', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two facts about Samudragupta.',
  model: '1. He was a **military leader** whose campaigns in the north and south are recorded in the **Allahabad Pillar Inscription**.\n2. He was a **patron of music**, and some of his coins show him playing the **veena**.',
  sol: 'Military campaigns; patron of music.',
  scheme: [['Military leader and campaigns', 1], ['Patron of music, veena coins', 1]],
}));
Q('s_c2', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two points about Chandragupta II Vikramaditya.',
  model: '1. He **defeated the Shakas** of western India and took the title **Vikramaditya**.\n2. By **tradition**, the **nine gems (navaratnas)**, a group of scholars and poets, are linked with his court.',
  sol: 'Defeated the Shakas; nine gems by tradition.',
  scheme: [['Defeat of the Shakas, title Vikramaditya', 1], ['Nine gems linked with his court by tradition', 1]],
}));
Q('s3_kings', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give one important fact each about Chandragupta I, Kumaragupta I and Skandagupta.',
  model: '1. **Chandragupta I** (about 320 to 335 CE): his marriage to the Lichchhavi princess **Kumaradevi** strengthened his position; the Gupta era begins about 319 to 320 CE.\n2. **Kumaragupta I** (about 415 to 455 CE): by tradition, the great centre of learning at **Nalanda** belongs to his reign.\n3. **Skandagupta** (about 455 to 467 CE): he **resisted the Huna invasions**.',
  sol: 'One fact for each of the three rulers.',
  scheme: [['Chandragupta I fact', 1], ['Kumaragupta I fact', 1], ['Skandagupta fact', 1]],
}));
Q('s3_timeline', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined student draws a timeline that puts Skandagupta before Samudragupta and gives the reign of Chandragupta I as about 455 to 467 CE. Correct the two mistakes.',
  model: '1. **Skandagupta** ruled last, about **455 to 467 CE**, after Samudragupta, Chandragupta II and Kumaragupta I.\n2. **Samudragupta** ruled about **335 to 375 CE**, soon after Chandragupta I.\n3. **Chandragupta I** ruled about **320 to 335 CE**, the earliest of the five.',
  sol: 'Correct order and dates.',
  scheme: [['Skandagupta placed last with date', 1], ['Samudragupta placed second', 1], ['Chandragupta I with correct reign', 1]],
}));

// ================================================================ t03 Administration
Q('m_sandhi', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined office chart at a school exhibition, a card reads: "I advise the king on whether to make peace or go to war." Which Gupta official does the card represent?',
  opts: ['The sandhivigrahika', 'The gramika', 'The vishayapati', 'The uparika'],
  sol: 'The sandhivigrahika is commonly taught as the minister of peace and war. The gramika headed a village, the vishayapati a district and the uparika a province.',
}));
Q('m_uparika', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'On an imagined heritage trail, a board says: "A bhukti was one of the large divisions of the empire." Who headed a bhukti?',
  opts: ['An uparika', 'A gramika', 'A vishayapati', 'A mahadandanayaka'],
  sol: 'A bhukti (province) was under an uparika. A vishayapati headed a vishaya (district), a gramika a village, and a mahadandanayaka was a high judicial or military officer at the centre.',
}));
Q('m_village_head', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined Gupta-age village called Devpur, a dispute over a boundary is first heard by the headman together with the elders. What was the headman called?',
  opts: ['Gramika', 'Uparika', 'Kumaramatya', 'Vishayapati'],
  sol: 'A village was headed by a gramika, assisted by village elders. The uparika, kumaramatya and vishayapati held higher offices.',
}));
Q('m_revenue', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined farmer, Madan, harvests 90 quintals of grain. If land revenue was commonly about one-sixth of the produce, how much would be due?',
  opts: ['About 15 quintals', 'About 30 quintals', 'About 9 quintals', 'About 60 quintals'],
  sol: 'One-sixth of 90 is 15. Thirty would be one-third, 9 is one-tenth, and 60 is two-thirds.',
}));
Q('m_town_council', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In the imagined Gupta-age town of Chandanpur, the council that helps run the town includes a representative of the cloth merchants\' guild and one of the potters\' guild. What does this show?',
  opts: [
    'Towns had councils in which guilds were represented, so some local matters were handled locally',
    'The king alone decided every matter in the town',
    'Guilds were forbidden in towns',
    'Towns had no administration at all',
  ],
  sol: 'Town councils with guild representatives show a share of local self-management. The other options deny local bodies or guilds.',
}));
Q('m_compare', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'An imagined student compares the Mauryan and Gupta administrations and notes that village elders and town councils did much local work in Gupta times. Which conclusion is the best supported?',
  opts: [
    'Gupta administration was more decentralised, leaving more to local bodies, than the Mauryan',
    'Gupta administration was exactly the same as the Mauryan in every detail',
    'The Gupta king had no officials',
    'There were no villages in Gupta times',
  ],
  sol: 'Local bodies sharing the work point to a more decentralised system than the Mauryan one. The other options ignore the evidence or exaggerate.',
}));
Q('ar_admin', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Gupta administration is described as more decentralised than the Mauryan.',
  r: 'Villages had a gramika with elders and towns had councils with guild representatives, who handled many local matters.',
  sol: 'Both are true, and the reason explains the assertion: the sharing of local work with these bodies is what makes the system more decentralised.',
}));
Q('fb_gramika', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'In Gupta administration, the head of a village was called the ___.',
  acc: [['gramika', 'Gramika']],
  sol: 'The village head was the gramika.',
}));
Q('mt_admin', match({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each Gupta administrative term with its meaning.',
  pairs: [
    ['Kumaramatya', 'A high officer'],
    ['Sandhivigrahika', 'Minister of peace and war'],
    ['Uparika', 'Head of a province (bhukti)'],
    ['Vishayapati', 'Head of a district (vishaya)'],
  ],
  sol: 'A kumaramatya was a high officer, the sandhivigrahika dealt with peace and war, the uparika headed a province and the vishayapati a district.',
}));
Q('ord_levels', ord({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these levels of Gupta administration from the highest to the lowest.',
  items: ['The king and ministers', 'Province (bhukti)', 'District (vishaya)', 'Village'],
  sol: 'King and ministers, province, district, village.',
}));
Q('s_central', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the position of the Gupta king and name two officers who assisted him.',
  model: 'The king took grand titles such as **Maharajadhiraja** and was assisted by **ministers**. Officers included the **kumaramatya** (high officer) and the **sandhivigrahika** (minister of peace and war).',
  sol: 'Grand titles and ministers; two officers.',
  scheme: [['King with titles, helped by ministers', 1], ['Two officers named with roles', 1]],
}));
Q('s_prov', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'How was the empire divided for administration under the Guptas? Name the heads of the divisions.',
  model: 'The empire was divided into **provinces (bhukti)** under an **uparika** and **districts (vishaya)** under a **vishayapati**. A village was headed by a **gramika** with elders.',
  sol: 'Bhukti and uparika; vishaya and vishayapati.',
  scheme: [['Provinces (bhukti) under the uparika', 1], ['Districts under the vishayapati; village under the gramika', 1]],
}));
Q('s_decentral', short({
  t: 3, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Give two reasons why historians describe Gupta administration as more decentralised than the Mauryan.',
  model: '**Village elders** with the **gramika** managed local matters. **Town councils** with **guild representatives** also shared the work, so less was decided only by the centre.',
  sol: 'Village elders; town councils and guilds.',
  scheme: [['Village headman and elders handled local matters', 1], ['Town councils with guild representatives', 1]],
}));
Q('s3_admin', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the central, provincial and local administration of the Guptas, one point each.',
  model: '1. **Centre**: the king, with titles such as Maharajadhiraja, was helped by **ministers** and officers like the kumaramatya.\n2. **Provinces and districts**: **bhukti** under an **uparika**; **vishaya** under a **vishayapati**.\n3. **Local**: a **gramika** with village elders, and **town councils** with guild representatives.',
  sol: 'Centre; provinces and districts; local bodies.',
  scheme: [['Central administration', 1], ['Provinces and districts', 1], ['Village and town bodies', 1]],
}));
Q('s3_town', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined town of Chandanpur has a council with representatives of the guilds. Explain, in three points, how such a council helped the Gupta administration.',
  model: '1. It let **local matters** be handled in the town itself.\n2. **Guild representatives** brought the knowledge of **trade and crafts** into decisions.\n3. It **shared the work** with the king\'s officers, which is why the system is called **more decentralised**.',
  sol: 'Local matters; guild knowledge; shared work.',
  scheme: [['Local matters handled locally', 1], ['Guild representatives and trade knowledge', 1], ['Sharing work, decentralisation', 1]],
}));

// ================================================================ t04 Education and science
Q('m_nalanda_subjects', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined student from a distant land writes home: "The mahavihara I joined in Bihar has a large library, and we study many subjects, not only the teachings of the Buddha." Which institution is he describing?',
  opts: ['Nalanda', 'Deogarh', 'Prayagraj', 'Pataliputra\'s city council'],
  sol: 'Nalanda was a great Buddhist monastery-university in present-day Bihar with a library, and it taught many subjects. Deogarh is a temple, Prayagraj is a city with a pillar, and a council is not a place of learning.',
}));
Q('m_xuanzang', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'In an imagined pilgrim\'s notebook exhibit, two cards show Chinese monks: one visited India about 399 to 412 CE and one studied at Nalanda in the 7th century. Which pair is matched correctly?',
  opts: [
    'Fa-hien in the 5th century, Xuanzang in the 7th century',
    'Xuanzang in the 5th century, Fa-hien in the 7th century',
    'Both in the 5th century',
    'Both in the 9th century',
  ],
  sol: 'Fa-hien visited about 399 to 412 CE, which is the early 5th century, and Xuanzang studied at Nalanda in the 7th century. The other options reverse or repeat the centuries.',
}));
Q('m_aryabhata_earth', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The imagined Tara Astronomy Club asks why the stars seem to circle the sky every night. Which Gupta-age astronomer stated that the earth rotates on its axis?',
  opts: ['Aryabhatta', 'Sushruta', 'Harisena', 'Fa-hien'],
  sol: 'Aryabhatta (born 476 CE) stated that the earth rotates on its axis. Sushruta is linked with medicine and surgery, Harisena with a poem in praise of a king, and Fa-hien with a travel account.',
}));
Q('m_eclipse', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'During an imagined eclipse watch, a club member explains it as the shadow of the earth falling on the moon. Whose explanation, in the Gupta age, does this match?',
  opts: [
    'Aryabhatta, who explained eclipses by the shadows of the earth and the moon',
    'Kalidasa, who explained eclipses in a play',
    'Sushruta, who described the heavens',
    'Harisena, who recorded eclipses in an inscription',
  ],
  sol: 'Aryabhatta explained eclipses by shadows of the earth and moon. The others are linked with literature, medicine and an inscription, not with the explanation of eclipses.',
}));
Q('m_sushruta_date', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'A student in an imagined study group says, "The Sushruta Samhita is in our Gupta chapter, so Sushruta must have lived in the reign of Chandragupta II." Which reply is the most accurate?',
  opts: [
    'The text\'s date is debated and it was compiled and revised over centuries, so it is studied alongside the Gupta age without fixing his lifetime to one reign',
    'The student is right, because the text names Chandragupta II',
    'The student is right, because Sushruta was a Gupta king',
    'The text was written in the 20th century',
  ],
  sol: 'The Sushruta Samhita is a classic text on medicine whose date is debated; it was compiled and revised over centuries. Studying it with the Gupta age does not mean he lived under one Gupta king.',
}));
Q('m_rhino', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A card in an imagined museum of medicine describes an early text that lists surgical instruments, stresses training and cleanliness, and describes repairing a damaged nose. Which text is it?',
  opts: ['The Sushruta Samhita', 'The Aryabhatiya', 'The Prayag Prashasti', 'The Meghaduta'],
  sol: 'The Sushruta Samhita describes instruments and surgical procedures, including repair of the nose. The Aryabhatiya is on astronomy and mathematics, the Prashasti is an inscription, and the Meghaduta is a poem.',
}));
Q('ar_aryabhata', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Aryabhatta is remembered as a great astronomer and mathematician.',
  r: 'In the Aryabhatiya, written about 499 CE, he stated that the earth rotates on its axis, explained eclipses and worked with the place-value system.',
  sol: 'Both are true, and the reason explains the assertion: these contributions are why he is remembered in both fields.',
}));
Q('ar_sushruta', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Sushruta Samhita is valued as a source on early medicine and surgery.',
  r: 'It describes many surgical instruments and procedures and stresses training and cleanliness.',
  sol: 'Both are true, and the reason explains the assertion: the detailed description of instruments, procedures and training is what gives the text its value.',
}));
Q('tf_nalanda', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? Nalanda taught only the teachings of the Buddha and had no library.',
  sol: 'False. Nalanda had a library and taught many subjects, not only Buddhism, and it attracted students from across Asia.',
}));
Q('fb_aryabhatiya', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'Aryabhatta wrote the ___ in about 499 CE.',
  acc: [['Aryabhatiya', 'aryabhatiya', 'Aryabhattiya']],
  sol: 'The work is the Aryabhatiya.',
}));
Q('mt_science', match({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each Gupta-age name or place with what it is linked with.',
  pairs: [
    ['Nalanda', 'Monastery-university in Bihar'],
    ['Aryabhatta', 'Astronomy and mathematics'],
    ['Sushruta Samhita', 'Medicine and surgery'],
    ['Xuanzang', 'Chinese pilgrim who studied at Nalanda'],
  ],
  sol: 'Nalanda was a monastery-university, Aryabhatta worked in astronomy and mathematics, the Sushruta Samhita is a medical text, and Xuanzang was a Chinese pilgrim.',
}));
Q('s_nalanda', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is Nalanda called a great centre of learning? Give two points.',
  model: 'Nalanda was a **mahavihara** in present-day **Bihar** that drew **students from across Asia**, including Xuanzang. Its **library** and its teaching of **many subjects** beyond religion made it a centre of learning.',
  sol: 'Students from Asia; library and many subjects.',
  scheme: [['Students from across Asia, Xuanzang', 1], ['Library and many subjects', 1]],
}));
Q('s_aryabhata', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two contributions of Aryabhatta.',
  model: '1. He stated that the **earth rotates on its axis** and explained **eclipses** by the shadows of the earth and the moon.\n2. He gave a **close value of pi**, about **3.1416**, and worked with the **place-value system**, in the **Aryabhatiya**.',
  sol: 'Rotation and eclipses; pi and place value.',
  scheme: [['Rotation of the earth or eclipses', 1], ['Value of pi or place-value system', 1]],
}));
Q('s_sushruta', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does the Sushruta Samhita tell us about early medicine, and why must its date be stated with care?',
  model: 'It is a classic text that describes **surgical instruments and procedures**, including repair of the **nose**, and stresses **training and cleanliness**. Its **date is debated** because it was **compiled and revised over centuries**.',
  sol: 'Instruments and procedures; debated date.',
  scheme: [['Instruments, procedures, training or cleanliness', 1], ['Date debated, compiled over centuries', 1]],
}));
Q('s3_nalanda', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe Nalanda as a centre of learning in three points: its place, its learners and its later history.',
  model: '1. **Place**: a Buddhist **mahavihara** in present-day **Bihar**, founded about the **5th century CE**.\n2. **Learners**: its **library** and many subjects drew students from across Asia, and the pilgrim **Xuanzang** studied there in the 7th century.\n3. **Later history**: it **declined in the late 12th century**, and its ruins are a **UNESCO World Heritage Site** since 2016.',
  sol: 'Place; learners; later history.',
  scheme: [['Place and founding', 1], ['Library, students, Xuanzang', 1], ['Decline and World Heritage Site', 1]],
}));
Q('s3_science', short({
  t: 4, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined school science fair has stalls on Aryabhatta, Sushruta and Nalanda. Write one line for each stall.',
  model: '1. **Aryabhatta**: stated that the **earth rotates**, explained **eclipses** and gave a close value of **pi**.\n2. **Sushruta**: the **Samhita** describes surgical instruments and procedures and stresses **cleanliness**.\n3. **Nalanda**: a **monastery-university** in Bihar with a library, which drew students from across Asia.',
  sol: 'One line for each stall.',
  scheme: [['Aryabhatta line', 1], ['Sushruta line', 1], ['Nalanda line', 1]],
}));

// ================================================================ t05 Culture
Q('m_kalidasa_works', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined librarian sorts cards onto a shelf for Kalidasa. Which set of titles belongs on that shelf?',
  opts: [
    'Abhijnanashakuntalam, Raghuvamsha and Meghaduta',
    'Aryabhatiya, Raghuvamsha and Meghaduta',
    'Abhijnanashakuntalam, Sushruta Samhita and Meghaduta',
    'Prayag Prashasti, Kumarasambhava and Ritusamhara',
  ],
  sol: 'Abhijnanashakuntalam, Raghuvamsha and Meghaduta are works of Kalidasa. The Aryabhatiya, the Sushruta Samhita and the Prayag Prashasti are by other authors or are not his.',
}));
Q('m_meghaduta', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'In an imagined literature class, a teacher describes a long poem in which an exiled being asks a passing cloud to carry a message to his beloved far away. Which work of Kalidasa is this?',
  opts: ['Meghaduta', 'Abhijnanashakuntalam', 'Raghuvamsha', 'Malavikagnimitram'],
  sol: 'The Meghaduta is the poem of the cloud messenger. Abhijnanashakuntalam is a play on a king and Shakuntala, Raghuvamsha is a long poem on a line of kings, and Malavikagnimitram is a play.',
}));
Q('m_shakuntalam', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'An imagined theatre club plans to stage Kalidasa\'s best-known play, in which a king meets and loses and then recovers a young woman who grew up in a forest hermitage. Which play is it?',
  opts: ['Abhijnanashakuntalam', 'Meghaduta', 'Ritusamhara', 'Kumarasambhava'],
  sol: 'The play about a king and Shakuntala is Abhijnanashakuntalam. Meghaduta, Ritusamhara and Kumarasambhava are poems, not plays.',
}));
Q('m_deogarh_feature', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'On an imagined study tour, a guide describes a stone temple on a raised platform with a square sanctum, carved panels on the walls and a tower of which only part survives. Which set of terms fits?',
  opts: [
    'Jagati (platform), garbhagriha (sanctum) and shikhara (tower)',
    'Stupa, vihara and chaitya',
    'Gopuram, vimana and mandapa of a southern gateway',
    'Pillar, edict and capital',
  ],
  sol: 'The Deogarh temple has a raised platform (jagati), a square sanctum and a shikhara that survives only in part. The other sets name Buddhist structures, southern temple parts and pillar features.',
}));
Q('m_deogarh_panel', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'An imagined museum label describes a carved panel on the Deogarh temple in which Vishnu rests on the serpent Sheshanaga. What is this scene called?',
  opts: ['Anantashayana', 'Gajendra moksha', 'Nara-Narayana', 'Dashavatara'],
  sol: 'Vishnu resting on Sheshanaga is called Anantashayana. Gajendra moksha and Nara-Narayana are other carved panels, and Dashavatara refers to the ten forms for which the temple is named.',
}));
Q('m_golden', mcq({
  t: 5, d: 4, c: 'evaluation',
  stem: 'An imagined seminar asks whether the Gupta age was truly a golden age. Which statement is the most balanced?',
  opts: [
    'It is often called a golden age for its art, literature and science, but historians qualify this because the prosperity was mostly of the elite and caste rules grew stricter',
    'It was a golden age for every person without exception',
    'It was not a golden age because no literature or science was produced',
    'Historians all agree that the label should be removed',
  ],
  sol: 'A balanced answer names the real achievements and the qualification made by historians. The other options deny the achievements or claim agreement that does not exist.',
}));
Q('ar_golden', ar({
  t: 5, d: 4, c: 'evaluation', verdict: 'A-true-R-false',
  a: 'The Gupta age is often called a golden age, though historians qualify the term.',
  r: 'Historians say that the prosperity and culture of the age were enjoyed equally by all sections of society.',
  sol: 'A is true. R is false: historians point out that the prosperity and culture were mostly of the elite and that caste rules grew stricter, so they were not enjoyed equally.',
}));
Q('tf_deogarh', tf({
  t: 5, d: 2, c: 'recall', ans: false,
  stem: 'True or false? The Dashavatara temple at Deogarh is dedicated to Vishnu and stands in Bihar.',
  sol: 'False. It is dedicated to Vishnu, but it stands in Lalitpur district of Uttar Pradesh, not in Bihar.',
}));
Q('fb_jagati', fb({
  t: 5, d: 2, c: 'recall',
  stem: 'The raised platform on which the Deogarh temple stands is called the ___.',
  acc: [['jagati', 'Jagati']],
  sol: 'The raised platform is called the jagati.',
}));
Q('mt_culture', match({
  t: 5, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each work or feature of Gupta culture with what it is.',
  pairs: [
    ['Abhijnanashakuntalam', 'Play by Kalidasa'],
    ['Meghaduta', 'Poem by Kalidasa'],
    ['Shikhara', 'Tower over the sanctum'],
    ['Anantashayana', 'Vishnu resting on Sheshanaga'],
  ],
  sol: 'Abhijnanashakuntalam is a play, Meghaduta a poem, a shikhara a tower, and Anantashayana shows Vishnu on Sheshanaga.',
}));
Q('s_kalidasa', short({
  t: 5, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name two plays and two long poems of Kalidasa.',
  model: 'Two of his **plays** are **Abhijnanashakuntalam** and **Malavikagnimitram**; a third is **Vikramorvashiyam**.\nTwo of his long **poems** are **Raghuvamsha** and **Kumarasambhava**; he also wrote the shorter **Meghaduta** and **Ritusamhara**.',
  sol: 'Two plays and two poems.',
  scheme: [['Two plays named', 1], ['Two long poems named', 1]],
}));
Q('s_deogarh', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two architectural features of the Dashavatara temple at Deogarh.',
  model: 'It stands on a **raised platform (jagati)** with a **square sanctum**. It also had a **shikhara (tower)** that survives only in part; its walls carry **carved panels**.',
  sol: 'Platform and sanctum; tower and panels.',
  scheme: [['Raised platform and square sanctum', 1], ['Shikhara or carved panels', 1]],
}));
Q('s_golden', short({
  t: 5, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Why do some historians say the phrase "golden age" should be used with care for the Gupta period?',
  model: 'Art, literature and science did flourish, but the prosperity and culture were **mostly of the elite**. Some historians also note that **caste rules grew stricter** and that some groups were excluded.',
  sol: 'Elite prosperity; stricter caste rules.',
  scheme: [['Benefits mostly of the elite', 1], ['Stricter caste rules or exclusion', 1]],
}));
Q('s3_culture', short({
  t: 5, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain why the Gupta period is often called a golden age, with one point each on literature, science and art.',
  model: '1. **Literature**: Kalidasa wrote plays and poems such as Abhijnanashakuntalam and Raghuvamsha.\n2. **Science**: Aryabhatta in astronomy and mathematics, and the Sushruta Samhita on medicine.\n3. **Art and architecture**: the **Dashavatara temple at Deogarh** with its carved panels.',
  sol: 'Literature; science; art.',
  scheme: [['Literature', 1], ['Science', 1], ['Art and architecture', 1]],
}));
Q('s3_deogarh_panels', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined guide at Deogarh points out three carved scenes. Name the three scenes and say what each shows.',
  model: '1. **Anantashayana**: the panel shows the god Vishnu resting on the coils of the serpent **Sheshanaga**.\n2. **Gajendra moksha**: the panel tells the story of the elephant Gajendra and his release from distress.\n3. **Nara-Narayana**: the panel shows the pair of sages Nara and Narayana, shown together in a calm setting.',
  sol: 'Three scenes with what they show.',
  scheme: [['Anantashayana and Sheshanaga', 1], ['Gajendra moksha', 1], ['Nara-Narayana', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_sources', long({
  t: 1, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Fa-hien\'s account and the Allahabad Pillar Inscription are two important sources of Gupta history.\n\n(i) Who was Fa-hien, and when and why did he visit India? **[3]**\n(ii) What does his account tell us about society and administration? **[3]**\n(iii) Explain the importance of the Allahabad Pillar Inscription and why it should be read with care. **[4]**',
  model: '(i) **Fa-hien** was a **Chinese Buddhist monk-pilgrim** who travelled in India about **399 to 412 CE**, in the reign of **Chandragupta II**, to collect **Buddhist texts**.\n\n(ii) He describes a **peaceful and prosperous** land with **mild punishments**, mostly fines, **freedom of movement**, **Buddhist monasteries** and **charitable houses and free hospitals** at Pataliputra. He also notes that **Chandalas lived apart** and were treated as outcastes.\n\n(iii) The inscription was composed in Sanskrit by **Harisena**, engraved on an earlier **Ashokan pillar** at Allahabad, and records Samudragupta\'s **campaigns** and the rulers who submitted. It is a **prashasti**, a **eulogy**, so it praises the king and must be **checked against other evidence**.',
  sol: 'Fa-hien and his visit; what he tells us; the inscription and the caution.',
  scheme: [['(i) Chinese monk-pilgrim', 1], ['(i) About 399 to 412 CE, Chandragupta II', 1], ['(i) Purpose: Buddhist texts', 1], ['(ii) Peace, mild punishments, freedom of movement', 1.5], ['(ii) Monasteries, hospitals, Chandalas apart', 1.5], ['(iii) Harisena, Sanskrit, Ashokan pillar', 1], ['(iii) Campaigns and rulers who submitted', 1.5], ['(iii) Eulogy, read with care', 1.5]],
}));
Q('l_kings', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Gupta rulers built a large empire.\n\n(i) List the rulers from Chandragupta I to Skandagupta in order. **[3]**\n(ii) Describe the achievements of Samudragupta. **[3]**\n(iii) Explain the importance of Chandragupta II Vikramaditya, and say how Skandagupta is remembered. **[4]**',
  model: '(i) **Chandragupta I** (about 320 to 335 CE), **Samudragupta** (about 335 to 375 CE), **Chandragupta II** (about 375 to 415 CE), **Kumaragupta I** (about 415 to 455 CE) and **Skandagupta** (about 455 to 467 CE).\n\n(ii) Samudragupta was a **military leader** whose campaigns in the north and the south are recorded in the **Allahabad Pillar Inscription**. He was also a **patron of music**: coins show him playing the **veena**.\n\n(iii) Chandragupta II **defeated the Shakas** of western India and took the title **Vikramaditya**; by **tradition** the **nine gems** are linked with his court, where **Kalidasa** is placed. **Skandagupta** is remembered for **resisting the Huna invasions**.',
  sol: 'Order of rulers; Samudragupta; Chandragupta II and Skandagupta.',
  scheme: [['(i) Five rulers in the correct order', 2], ['(i) Approximate reigns', 1], ['(ii) Military campaigns and the inscription', 1.5], ['(ii) Patron of music, veena coins', 1.5], ['(iii) Shakas and Vikramaditya', 1.5], ['(iii) Nine gems or Kalidasa by tradition', 1], ['(iii) Skandagupta and the Hunas', 1.5]],
}));
Q('l_admin', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Guptas governed their empire through a system with several levels.\n\n(i) Describe the position of the king and name two officers who helped him. **[3]**\n(ii) How were provinces, districts and villages governed? **[3]**\n(iii) Describe the role of town councils and land revenue, and compare the system briefly with the Mauryan one. **[4]**',
  model: '(i) The king took grand titles such as **Maharajadhiraja** and was assisted by **ministers** in running the empire. Officers included the **kumaramatya** (high officer), the **sandhivigrahika** (minister of peace and war) and the **mahadandanayaka** (chief judicial or military officer).\n\n(ii) A **province (bhukti)** was under an **uparika**, who acted for the king, and a **district (vishaya)** under a **vishayapati**. A **village** was headed by a **gramika** who worked with the **village elders** on local matters.\n\n(iii) **Towns** had **councils** with representatives of **guilds**, so trade and crafts had a voice. **Land revenue** was commonly about **one-sixth** of the produce. Compared with the Mauryan system, Gupta administration was **more decentralised**, because more work was left to local bodies such as these.',
  sol: 'King and officers; provinces, districts and villages; town councils, revenue and comparison.',
  scheme: [['(i) King with titles and ministers', 1], ['(i) Two officers with roles', 2], ['(ii) Bhukti and uparika; vishaya and vishayapati', 2], ['(ii) Village gramika with elders', 1], ['(iii) Town councils with guilds', 1.5], ['(iii) Land revenue about one-sixth', 1], ['(iii) More decentralised than the Mauryan', 1.5]],
}));
Q('l_nalanda', long({
  t: 4, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Nalanda was one of the great centres of learning of ancient India.\n\n(i) Where was Nalanda and what kind of institution was it? **[3]**\n(ii) Describe its library, its students and its studies. **[3]**\n(iii) Explain how it declined and how its ruins are recognised today. **[4]**',
  model: '(i) Nalanda was in present-day **Bihar**. It was a great **Buddhist monastery-university (mahavihara)** founded about the **5th century CE**, and tradition links it with the reign of **Kumaragupta I**.\n\n(ii) Its **library** and its teaching of **many subjects**, not only Buddhism, made it a true centre of learning. It attracted **students from across Asia**, and the Chinese pilgrim **Xuanzang** studied there in the **7th century**, which shows how far its fame travelled.\n\n(iii) Nalanda **declined in the late 12th century**, and its buildings fell into ruin over time. Its **ruins** were recognised as a **UNESCO World Heritage Site in 2016**, which shows their value today as a record of ancient education and a reminder of the learning that once flourished there.',
  sol: 'Place and kind of institution; library, students and studies; decline and recognition.',
  scheme: [['(i) Bihar', 1], ['(i) Buddhist mahavihara, about the 5th century', 1], ['(i) Tradition links it with Kumaragupta I', 1], ['(ii) Library and many subjects', 1.5], ['(ii) Students from across Asia, Xuanzang', 1.5], ['(iii) Decline in the late 12th century', 2], ['(iii) World Heritage Site in 2016', 2]],
}));
Q('l_science', long({
  t: 4, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'An imagined school prepares a display on the science of the Gupta age.\n\n(i) State three contributions of Aryabhatta. **[3]**\n(ii) Describe what the Sushruta Samhita contains. **[3]**\n(iii) Explain why the date of Sushruta cannot be fixed to one reign, and how Aryabhatta is remembered in India today. **[4]**',
  model: '(i) **Aryabhatta**, born in **476 CE**, wrote the **Aryabhatiya** in about **499 CE**. He stated that the **earth rotates on its axis**, explained **eclipses** by the shadows of the earth and the moon, and gave a close value of **pi** (about 3.1416) with the **place-value system**.\n\n(ii) The **Sushruta Samhita** is a classic text on **medicine and surgery**. It describes many **surgical instruments** and procedures, including **repair of the nose** (an early form of plastic surgery), and stresses **training and cleanliness**.\n\n(iii) The text was **compiled and revised over centuries** and its **date is debated**, so it is studied with the Gupta age without claiming that Sushruta lived under one Gupta king. India\'s **first satellite, launched in 1975**, was named **Aryabhata** after him.',
  sol: 'Aryabhatta; Sushruta Samhita; date debate and the satellite.',
  scheme: [['(i) Rotation of the earth', 1], ['(i) Eclipses explained by shadows', 1], ['(i) Pi and place value, Aryabhatiya', 1], ['(ii) Instruments and procedures', 1.5], ['(ii) Nose repair, training and cleanliness', 1.5], ['(iii) Text compiled and revised, date debated', 2], ['(iii) Satellite named Aryabhata, 1975', 2]],
}));
Q('l_culture', long({
  t: 5, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'The Gupta age made lasting contributions to literature and architecture.\n\n(i) Name the major works of Kalidasa. **[3]**\n(ii) Describe the architectural features of the Dashavatara temple at Deogarh. **[3]**\n(iii) Describe the carved panels of the temple and explain why the Gupta age is called a golden age of literature. **[4]**',
  model: '(i) **Kalidasa**, traditionally linked with Chandragupta II\'s court, wrote the plays **Abhijnanashakuntalam**, **Malavikagnimitram** and **Vikramorvashiyam**, the long poems **Raghuvamsha** and **Kumarasambhava**, and also **Meghaduta** and **Ritusamhara**.\n\n(ii) The temple, in **Lalitpur district, Uttar Pradesh**, is dedicated to **Vishnu** and dates from about the **6th century CE**. It stands on a raised **platform (jagati)** with a **square sanctum** and a **shikhara** that survives only in part.\n\n(iii) Its panels show **Anantashayana** (Vishnu resting on Sheshanaga), **Gajendra moksha** and **Nara-Narayana**. The age is called a golden age of literature because of **Kalidasa\'s** plays and poems and other Sanskrit writing, though historians qualify the label.',
  sol: 'Works of Kalidasa; features of the temple; panels and golden age of literature.',
  scheme: [['(i) Three plays or poems named', 3], ['(ii) Location, dedication, date', 1], ['(ii) Platform, sanctum, shikhara', 2], ['(iii) Three panels described', 2], ['(iii) Kalidasa and the golden age of literature', 2]],
}));
Q('l_golden', long({
  t: 5, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'A student in an imagined debate says: "The Gupta age was a golden age for everyone."\n\n(i) Give three achievements of the age that support the label. **[3]**\n(ii) Give two points from Fa-hien\'s account or elsewhere that show some people did not share equally in this age. **[3]**\n(iii) Evaluate the student\'s statement: how far is it fair? **[4]**',
  model: '(i) The age saw the plays and poems of **Kalidasa**, the work of **Aryabhatta** in astronomy and mathematics, and the **Dashavatara temple at Deogarh**; **Nalanda** and the **Sushruta Samhita** may also be cited.\n\n(ii) **Fa-hien** notes that **Chandalas lived apart** and were treated as outcastes. Historians also note that the prosperity and culture were **mostly of the elite** and that **caste rules grew stricter**.\n\n(iii) The statement is **only partly fair**. Literature, science and art did flourish, but these gains were mostly **elite**, and **some groups were excluded**. A careful answer says the age is **often called** a golden age but that historians **qualify** the term.',
  sol: 'Achievements; evidence of inequality; evaluation of the statement.',
  scheme: [['(i) Three achievements', 3], ['(ii) Chandalas living apart', 1.5], ['(ii) Elite prosperity or stricter caste rules', 1.5], ['(iii) Partly fair, with reasons', 2], ['(iii) Often called, but qualified by historians', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_notebook', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined pilgrim's notebook and answer the questions that follow. ${IMAG}`,
  passage: '**A page from the imagined notebook of Lin Yao, a made-up monk-pilgrim**\n\nThe road from the river town to the capital was safe, and nobody stopped me to ask for a pass. At the town of Suryapur the magistrate told me that the usual punishment for a petty offence is a fine, and that harsher penalties are rare. The monastery gave me a room, and outside the gate stands a free rest-house for the sick. I saw a few families who live beyond the town wall and may not mix with the others. I never learned the name of the king, for no one spoke of him in my hearing.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What does Lin Yao say is the usual punishment for a petty offence?', model: 'A **fine**.', sol: 'A fine.', scheme: [['A fine', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'analysis', marks: 1, stem: 'Does the notebook name the ruler? How does this match the real pilgrim Fa-hien?', model: 'No. In the same way, Fa-hien, as commonly taught, **does not name the king**.', sol: 'No, as with Fa-hien.', scheme: [['Matches Fa-hien: the king is not named', 1]] })),
    child('c', short({ t: [1, 3], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Name two points in the notebook that fit the picture of Gupta society given by Fa-hien.', model: '**Safe travel without a pass** (freedom of movement), **mild punishments**, a **monastery** and a **free rest-house for the sick**, and families living **apart** from the others.', sol: 'Any two matching points.', scheme: [['First matching point', 1], ['Second matching point', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name the real Chinese pilgrim who visited in the reign of Chandragupta II and say why he came.', model: '**Fa-hien**, who travelled about **399 to 412 CE** to collect **Buddhist texts**.', sol: 'Fa-hien; to collect Buddhist texts.', scheme: [['Fa-hien named', 1], ['Purpose: Buddhist texts', 1]] }),
    ]),
  ],
}));
Q('sb_eulogy', source({
  t: [1, 2], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined museum label and answer the questions that follow. ${IMAG}`,
  passage: '**Label for a model pillar in the Heritage Gallery of an imagined museum**\n\nThe model shows a pillar covered with verses composed by a court poet named Rudrasena in praise of an imaginary king, Veeravarman of Surapur. The verses call the king unbeatable in battle, generous, learned and loved by all. They list many rulers who are said to have bowed to him. No defeats are mentioned. The same king\'s coins, kept in the next case, show only a modest territory.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'What kind of composition is such a set of verses called?', model: 'A **prashasti**, that is, a **eulogy**.', sol: 'Prashasti or eulogy.', scheme: [['Prashasti or eulogy', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which real inscription of the Gupta age is of this kind?', model: 'The **Allahabad Pillar Inscription** (Prayag Prashasti).', sol: 'Allahabad Pillar Inscription.', scheme: [['Allahabad Pillar Inscription', 1]] })),
    child('c', short({ t: [1, 2], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Why should a historian be careful with this label\'s verses, and what else can be used to check them?', model: 'The poet was **praising the king**, so defeats may be **left out** and claims exaggerated. The **coins** in the next case can be used to **check** how large the territory really was.', sol: 'Praise may exaggerate; check with coins.', scheme: [['The verses are praise, so may exaggerate or omit', 1], ['Check against other evidence such as coins', 1]] }), [
      short({ t: 1, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Who composed the Allahabad Pillar Inscription, and about whom?', model: '**Harisena**, a court poet and official, composed it about **Samudragupta**.', sol: 'Harisena; Samudragupta.', scheme: [['Harisena named', 1], ['About Samudragupta', 1]] }),
    ]),
  ],
}));
Q('sb_club', source({
  t: [4, 5], d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined club log and answer the questions that follow. ${IMAG}`,
  passage: '**Log of the Tara Astronomy Club of the imagined Class IX of Gyan Deep School**\n\nOn eclipse night the club gathered on the roof. Meera said that a scholar born in 476 CE had explained eclipses by shadows long before telescopes and had said that the earth turns on its axis. Imran added that the same scholar worked on a place-value system and a close value of pi. On the walk home the club passed a school display on a very old medical text that describes surgical instruments and stresses cleanliness. Teacher Anil told us that the date of that text is debated.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the scholar whom Meera and Imran describe.', model: '**Aryabhatta** (Aryabhata).', sol: 'Aryabhatta.', scheme: [['Aryabhatta', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'Which medical text does the school display describe?', model: 'The **Sushruta Samhita**.', sol: 'Sushruta Samhita.', scheme: [['Sushruta Samhita', 1]] })),
    child('c', short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why did Teacher Anil say the date of the medical text is debated?', model: 'Because the text was **compiled and revised over centuries**, so it cannot be fixed to the life of one author or one reign.', sol: 'Compiled and revised over centuries.', scheme: [['Compiled and revised over centuries', 1], ['So no single date or reign can be given', 1]] }), [
      short({ t: 4, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Name the book in which the scholar set out his ideas, and say how India honoured him in 1975.', model: 'The **Aryabhatiya**, written about **499 CE**; India\'s **first satellite**, launched in **1975**, was named **Aryabhata**.', sol: 'Aryabhatiya; first satellite 1975.', scheme: [['Aryabhatiya named', 1], ['Satellite named after him in 1975', 1]] }),
    ]),
  ],
}));
