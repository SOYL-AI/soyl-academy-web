// ICSE 9 History & Civics, ch12 Medieval India: The Delhi Sultanate — question bank.
// Every diary, museum label, school note and classroom scene below is imagined by SOYL and labelled as imagined; no
// textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No inscription, chronicle or
// speech is quoted: ideas are paraphrased. Dates are the commonly taught ones (books differ): dynasties 1206-1290,
// 1290-1320, 1320-1414, 1414-1451, 1451-1526; Qutab Minar begun about 1199; Alauddin Khalji about 1296-1316;
// Muhammad bin Tughlaq about 1325-1351; capital moved about 1327; token currency about 1329-30.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
export const DYNASTIES = [
  ['Mamluk (Ilbari)', 1206, 1290],
  ['Khalji', 1290, 1320],
  ['Tughlaq', 1320, 1414],
  ['Sayyid', 1414, 1451],
  ['Lodi', 1451, 1526],
];
for (let i = 1; i < DYNASTIES.length; i++) assert.equal(DYNASTIES[i][1], DYNASTIES[i - 1][2]);

/** The five dynasties as bars on one time line, drawn to scale (years CE). */
export function dynastiesFigure(alt, caption) {
  const s = new Svg(720, 250);
  const px = 640 / (DYNASTIES[4][2] - DYNASTIES[0][1]);
  const X = (yr) => 40 + (yr - DYNASTIES[0][1]) * px;
  const cols = ['accent', 'green', 'blue', 'accent', 'green'];
  DYNASTIES.forEach(([name, a, b], i) => {
    const x = X(a);
    const w = (b - a) * px;
    const cx = x + w / 2;
    s.rect(x, 100, w, 34, { rx: 6, fill: cols[i], fillOpacity: 0.2, color: cols[i], sw: 1.8 });
    const ny = i % 2 === 0 ? 40 : 70;
    s.line(cx, ny + 11, cx, 100, { sw: 1, color: 'muted', dash: true });
    s.text(cx, ny, name, { size: 14, bold: true });
    const dy = i % 2 === 0 ? 158 : 184;
    s.line(cx, 134, cx, dy - 11, { sw: 1, color: 'muted', dash: true });
    s.text(cx, dy, `${a} to ${b}`, { size: 12 });
  });
  s.text(360, 214, 'The Lodi line ends at the First Battle of Panipat, 1526', { size: 13, bold: true });
  s.text(360, 235, 'Drawn to scale. Years CE as commonly taught', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Flow chart of the market regulations of Alauddin Khalji. */
export function marketFigure(alt, caption) {
  const s = new Svg(720, 400);
  s.rect(60, 10, 600, 52, { rx: 8, fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.8 });
  s.text(360, 28, 'Aim: keep a large standing army on modest salaries', { size: 15, bold: true });
  s.text(360, 49, 'especially against Mongol raids', { size: 13 });
  s.arrow(360, 62, 360, 80, { sw: 1.6 });
  s.rect(60, 80, 600, 44, { rx: 8, fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.8 });
  s.text(360, 102, 'Fixed prices for grain, cloth, horses and other goods', { size: 15, bold: true });
  s.arrow(360, 124, 360, 142, { sw: 1.6 });
  const boxes = [
    ['Separate markets', 'for different goods'],
    ['Market superintendent', '(shahna-i-mandi)'],
    ['State granaries', 'to store grain'],
    ['Merchants registered', 'with the state'],
    ['Spies report', 'on traders'],
    ['Strict penalties', 'for cheating on weights'],
  ];
  boxes.forEach(([a, b], i) => {
    const x = 15 + (i % 3) * 235;
    const y = 142 + Math.floor(i / 3) * 66;
    s.rect(x, y, 215, 54, { rx: 8, fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.6 });
    s.text(x + 107.5, y + 20, a, { size: 14, bold: true });
    s.text(x + 107.5, y + 40, b, { size: 12 });
  });
  s.arrow(360, 274, 360, 296, { sw: 1.6 });
  s.rect(60, 296, 600, 56, { rx: 8, fill: 'fill', fillOpacity: 0.5, color: 'muted', sw: 1.6 });
  s.text(360, 316, 'Result: steady prices in Delhi during his reign', { size: 15, bold: true });
  s.text(360, 338, 'The system did not continue after him', { size: 13 });
  s.text(360, 380, 'Simplified chart of the regulations as commonly taught', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic elevation of the Qutab Minar with five storeys. */
export function minarFigure(alt, caption) {
  const s = new Svg(720, 420);
  const cx = 190;
  const ys = [360, 260, 190, 135, 90, 50];
  const hw = (y) => 55 - (360 - y) * (27 / 310);
  const cols = ['accent', 'blue', 'accent', 'blue', 'accent'];
  for (let i = 0; i < 5; i++) {
    const y0 = ys[i];
    const y1 = ys[i + 1];
    s.polygon([[cx - hw(y0), y0], [cx + hw(y0), y0], [cx + hw(y1), y1], [cx - hw(y1), y1]], { fill: cols[i], fillOpacity: 0.16, color: cols[i], sw: 1.8 });
    const m = (y0 + y1) / 2;
    s.line(cx - hw(m) + 3, m - 4, cx + hw(m) - 3, m - 4, { sw: 1, color: 'muted', dash: true });
    s.line(cx - hw(m) + 3, m + 4, cx + hw(m) - 3, m + 4, { sw: 1, color: 'muted', dash: true });
    if (i > 0) s.line(cx - hw(y0) - 8, y0, cx + hw(y0) + 8, y0, { sw: 2.2 });
    s.text(cx, m, String(5 - i), { size: 13, bold: true });
  }
  s.line(80, 360, 300, 360, { sw: 1.6, color: 'muted' });
  s.arrow(112, 200, 112, 52, { sw: 1.3, color: 'muted' });
  s.arrow(112, 210, 112, 358, { sw: 1.3, color: 'muted' });
  s.text(58, 205, 'about', { size: 13 });
  s.text(58, 224, '72.5 m', { size: 13, bold: true });
  s.line(262, 262, 262, 358, { sw: 1.6, color: 'accent' });
  s.text(275, 300, 'Begun by Qutbuddin Aibak,', { size: 13, anchor: 'start', bold: true });
  s.text(275, 320, 'about 1199 (lowest storey)', { size: 13, anchor: 'start' });
  s.line(262, 98, 262, 258, { sw: 1.6, color: 'blue' });
  s.text(275, 168, 'Upper storeys completed', { size: 13, anchor: 'start', bold: true });
  s.text(275, 188, 'by Iltutmish', { size: 13, anchor: 'start' });
  s.text(275, 64, 'Repaired and raised later,', { size: 13, anchor: 'start', bold: true });
  s.text(275, 84, 'including by Firuz Shah Tughlaq after lightning', { size: 13, anchor: 'start' });
  s.text(360, 384, 'Dashed lines: bands of carved inscriptions. Red and buff sandstone and marble', { size: 12 });
  s.text(360, 404, 'Schematic, not to scale; the storey divisions are approximate', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic map of the Deccan campaign. */
export function deccanFigure(alt, caption) {
  const s = new Svg(820, 420);
  s.polygon([[170, 100], [575, 100], [555, 160], [530, 230], [490, 300], [425, 392], [295, 392], [240, 330], [205, 250], [175, 170]], { sw: 1.6, color: 'muted', dash: true });
  const pts = [
    [360, 45, 'Delhi', 'start', 'accent'],
    [290, 170, '1 Devagiri', 'end', 'green'],
    [430, 205, '2 Warangal', 'start', 'blue'],
    [300, 290, '3 Dwarasamudra', 'start', 'accent'],
    [360, 345, '4 Madurai', 'below', 'green'],
  ];
  const route = [[360, 45], [290, 170], [430, 205], [300, 290], [360, 345]];
  for (let i = 0; i < route.length - 1; i++) {
    const [x1, y1] = route[i];
    const [x2, y2] = route[i + 1];
    const L = Math.hypot(x2 - x1, y2 - y1);
    const k = 9 / L;
    s.arrow(x1 + (x2 - x1) * k, y1 + (y2 - y1) * k, x2 - (x2 - x1) * k, y2 - (y2 - y1) * k, { sw: 1.3, color: 'muted', dash: true });
  }
  pts.forEach(([x, y, name, anchor, col]) => {
    s.dot(x, y, 6, col);
    if (anchor === 'below') s.text(x, y + 18, name, { size: 14, bold: true });
    else s.text(x + (anchor === 'start' ? 12 : -12), y, name, { size: 14, anchor, bold: true });
  });
  s.text(600, 100, 'Campaigns led by Malik Kafur', { size: 14, anchor: 'start', bold: true });
  s.text(600, 120, '(as commonly taught)', { size: 12, anchor: 'start', muted: true });
  const leg = [['1 Devagiri (Yadavas)', 'about 1307 to 08'], ['2 Warangal (Kakatiyas)', 'about 1309 to 10'], ['3 Dwarasamudra (Hoysalas)', 'about 1311'], ['4 Madurai (Pandyas)', 'about 1311']];
  leg.forEach(([a, b], i) => {
    s.text(600, 160 + i * 52, a, { size: 13, anchor: 'start', bold: true });
    s.text(600, 180 + i * 52, b, { size: 12, anchor: 'start' });
  });
  s.text(410, 406, 'Schematic, not to scale, positions approximate. Arrows show the order, not the exact routes', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Sources: inscriptions and the Qutab Minar
Q('m_inscr_coin', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A curator at the imagined Kasara Coin Room finds a worn coin with lettering in Arabic script around its rim. Which question can that lettering help her answer?',
  opts: [
    'Which ruler issued the coin, with what title, and in which year',
    'How many soldiers the ruler kept in his army',
    'What crops were grown in the ruler\'s kingdom',
    'Which battles the ruler had fought',
  ],
  sol: 'Inscriptions on coins and monuments record details such as the ruler\'s name and titles and the date. They do not give army numbers, crops or a list of battles.',
}));
Q('m_minar_start', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'On a school trip to Mehrauli, the imagined guide Ms. Kavya says: "Work on this tower began about 1199 under the ruler who later became the first sultan of the Mamluk line." Whom does she mean?',
  opts: ['Qutbuddin Aibak', 'Iltutmish', 'Alauddin Khalji', 'Firuz Shah Tughlaq'],
  sol: 'Qutbuddin Aibak began the Qutab Minar about 1199. Iltutmish completed the upper storeys, Firuz Shah Tughlaq repaired it much later, and Alauddin Khalji belongs to the next dynasty.',
}));
Q('m_minar_firuz', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A conservation note in an imagined heritage office records that the upper part of the tower was damaged by lightning and later repaired and raised by a Tughlaq ruler. Which ruler does the note refer to?',
  opts: ['Firuz Shah Tughlaq', 'Qutbuddin Aibak', 'Ibrahim Lodi', 'Khizr Khan'],
  sol: 'Firuz Shah Tughlaq repaired and raised the Minar after lightning damage. Aibak began it, Ibrahim Lodi was the last Lodi ruler, and Khizr Khan founded the Sayyid dynasty.',
}));
Q('m_minar_height', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Class IX club of Gyan Ganga School builds a model of the Qutab Minar at a scale of 1 to 100. The tower is about 72.5 m high. How tall should the model be?',
  opts: ['About 72.5 cm', 'About 7.25 m', 'About 725 cm', 'About 7.25 cm'],
  sol: 'At 1 to 100 the model is 72.5 m divided by 100, which is 0.725 m or 72.5 cm. A height of 7.25 m would be a 1 to 10 scale, 725 cm is the same 7.25 m, and 7.25 cm would be a 1 to 1000 scale.',
}));
Q('m_unesco', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'An imagined quiz card reads: "The Qutab Minar is part of a UNESCO World Heritage Site called Qutb Minar and its Monuments." In which year was it listed?',
  opts: ['1993', '1983', '2003', '2016'],
  sol: 'The site was listed in 1993. The year 2016 is when the ruins of Nalanda were listed, and the other years are distractors.',
}));
Q('m_minar_tells', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Three imagined students describe what the Qutab Minar tells us. Which statement is the best supported by the monument itself?',
  opts: [
    'Its arches and bands of carved lettering show the building style of the Sultanate, and its long building history connects several rulers',
    'It proves that the whole of India was ruled from Delhi for the entire period',
    'It was finished in a single year by one ruler',
    'It was built only with locally made bricks and no stone',
  ],
  sol: 'The Minar\'s arches, calligraphy and the work of Aibak, Iltutmish and later rulers show a style and a long history. A single building cannot prove rule over the whole country, it was not finished in one year, and it is built of sandstone and marble.',
}));
Q('tf_unesco_site', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The Qutab Minar is only one of several monuments that make up the UNESCO World Heritage Site called Qutb Minar and its Monuments.',
  sol: 'True. The listing of 1993 covers the Minar and the other monuments around it.',
}));
Q('fb_iltutmish', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The upper storeys of the Qutab Minar were completed by ___.',
  acc: [['Iltutmish', 'iltutmish']],
  sol: 'Iltutmish completed the upper storeys that Qutbuddin Aibak had begun.',
}));
Q('ar_chronicle', ar({
  t: 1, d: 4, c: 'evaluation', verdict: 'A-false-R-true',
  a: 'A historian in the imagined Salar Library should treat one Persian chronicle of a reign as the complete and final account of that reign.',
  r: 'A chronicle reflects the point of view of its author, so it is checked against inscriptions, coins and monuments.',
  sol: 'The assertion is false, because no single source gives the complete account. The reason is true: a chronicle, such as the history by Ziauddin Barani, is one author\'s view and is compared with other evidence.',
}));
Q('mt_sources', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each term connected with the sources of the Delhi Sultanate with its meaning.',
  pairs: [
    ['Inscription', 'Writing carved or stamped on stone, metal or a coin'],
    ['Calligraphy', 'The art of beautiful writing, seen in the bands of the Minar'],
    ['Qutab Minar', 'A tower in Delhi begun by Qutbuddin Aibak about 1199'],
    ['Chronicle', 'A written account of events, such as the history by Ziauddin Barani'],
  ],
  sol: 'An inscription is writing on stone, metal or coins; calligraphy is the art of fine writing; the Qutab Minar is the tower begun by Aibak; a chronicle is a written account of events.',
}));
Q('s_inscr', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two kinds of facts that Arabic and Persian inscriptions on monuments and coins give a historian.',
  model: '1. They record the **builder or issuer**, that is, the ruler or official who ordered the work.\n2. They give the **date** and the **titles** the ruler used, which help to place him in time.',
  sol: 'Any two of: builders, dates, titles.',
  scheme: [['Builder or ruler named', 1], ['Date or titles recorded', 1]],
}));
Q('s3_minar_tells', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three things the Qutab Minar tells us about the Delhi Sultanate.',
  model: '1. Its **arches and calligraphy** show the building style of the Sultanate.\n2. Its **inscriptions** name the rulers who built and repaired it.\n3. The work of **Aibak, Iltutmish and Firuz Shah Tughlaq** over many years shows that rulers of different dynasties continued earlier buildings.',
  sol: 'Style; inscriptions naming rulers; continuity across rulers.',
  scheme: [['Arches and calligraphy as a style', 1], ['Inscriptions name rulers', 1], ['Several rulers worked on it', 1]],
}));
Q('l_sources', long({
  t: 1, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Qutab Minar in Delhi is one of the best-known sources for the history of the Delhi Sultanate.\n\n(i) Name the ruler who began it, the ruler who completed the upper storeys, and one later ruler who repaired it. **[3]**\n(ii) Describe its main features. **[3]**\n(iii) Explain what the Minar and its inscriptions help a historian to learn. **[4]**',
  model: '(i) **Qutbuddin Aibak** began the tower about **1199**. **Iltutmish** completed the upper storeys. Later, **Firuz Shah Tughlaq** repaired and raised it after it was damaged by lightning.\n\n(ii) The Minar is about **72.5 m** high and is built of **red and buff sandstone and marble**. It rises in several storeys with balconies and has **bands of carved inscriptions**. It is part of the UNESCO World Heritage Site **Qutb Minar and its Monuments**, listed in 1993.\n\n(iii) The **arches and calligraphy** show the building style of the Sultanate. The **inscriptions** record the builders, dates and titles, so they help fix who ruled and when. Its repair by later rulers shows that the building was valued across dynasties.',
  sol: 'Rulers; features; what the Minar and inscriptions reveal.',
  scheme: [['(i) Aibak began it about 1199', 1], ['(i) Iltutmish completed the upper storeys', 1], ['(i) A later repairer such as Firuz Shah Tughlaq', 1], ['(ii) Height and materials', 1.5], ['(ii) Storeys, inscriptions, UNESCO listing', 1.5], ['(iii) Style: arches and calligraphy', 1.5], ['(iii) Inscriptions give builders, dates, titles', 1.5], ['(iii) Continuity across rulers', 1]],
}));

// ================================================================ t02 Dynasties
Q('m_after_khalji', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A student in the imagined Class IX of Vidya Mandir lists the Sultanate dynasties on the board but leaves a gap after the Khalji dynasty. Which dynasty fills the gap?',
  opts: ['Tughlaq', 'Mamluk', 'Lodi', 'Sayyid'],
  sol: 'The order is Mamluk, Khalji, Tughlaq, Sayyid and Lodi, so the Tughlaq dynasty follows the Khalji. The Mamluk came before it, and the Sayyid and Lodi came later.',
}));
Q('m_longest', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'An imagined timeline in the Meerpur Heritage Room gives the Mamluk dynasty as 1206 to 1290 and the Tughlaq dynasty as 1320 to 1414. Comparing all five dynasties by length, which statement is correct?',
  opts: [
    'The Tughlaq dynasty lasted longest, about 94 years, and the Khalji dynasty was the shortest, about 30 years',
    'The Mamluk dynasty lasted longest, about 94 years',
    'The Sayyid dynasty was the shortest, about 30 years',
    'The Lodi dynasty lasted longest, about 75 years',
  ],
  sol: 'The lengths are Mamluk about 84, Khalji about 30, Tughlaq about 94, Sayyid about 37 and Lodi about 75 years. So the Tughlaq lasted longest and the Khalji was the shortest.',
}));
Q('m_start1206', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'An imagined exhibition panel starts its story of the Delhi Sultanate in the year 1206. Which dynasty began to rule in that year?',
  opts: ['The Mamluk (Ilbari) dynasty', 'The Khalji dynasty', 'The Tughlaq dynasty', 'The Lodi dynasty'],
  sol: 'The Mamluk dynasty, also called the Slave or Ilbari dynasty, began in 1206. The Khalji began in 1290, the Tughlaq in 1320 and the Lodi in 1451.',
}));
Q('ar_panipat', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'The Delhi Sultanate is said to have ended in 1526.',
  r: 'In that year Ibrahim Lodi, the last Lodi ruler, was defeated by Babur at the First Battle of Panipat.',
  sol: 'Both are true, and the reason explains the assertion: the defeat of the last Lodi ruler at Panipat in 1526 is the event that closes the Sultanate period.',
}));
Q('ord_dynasties', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the dynasties of the Delhi Sultanate in chronological order, earliest first.',
  items: ['Mamluk (Ilbari)', 'Khalji', 'Tughlaq', 'Sayyid', 'Lodi'],
  sol: 'Mamluk, Khalji, Tughlaq, Sayyid and Lodi.',
}));
Q('mt_dynasties', match({
  t: 2, d: 3, c: 'recall', marks: 2,
  stem: 'Match each dynasty with the years it is commonly taught to have ruled.',
  pairs: [
    ['Khalji', '1290 to 1320'],
    ['Tughlaq', '1320 to 1414'],
    ['Sayyid', '1414 to 1451'],
    ['Lodi', '1451 to 1526'],
  ],
  sol: 'The Khalji ruled 1290 to 1320, the Tughlaq 1320 to 1414, the Sayyid 1414 to 1451 and the Lodi 1451 to 1526.',
}));
Q('s_dyn', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the first and the last dynasty of the Delhi Sultanate and give the year in which each began or ended.',
  model: 'The first was the **Mamluk (Ilbari) dynasty**, which began in **1206**. The last was the **Lodi dynasty**, which ended in **1526** at the First Battle of Panipat.',
  sol: 'Mamluk 1206; Lodi 1526.',
  scheme: [['Mamluk dynasty and 1206', 1], ['Lodi dynasty and 1526', 1]],
}));
Q('s3_dyn', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined student writes the order as Khalji, Mamluk, Tughlaq, Lodi, Sayyid. Correct the order and give the starting year of any two of the dynasties.',
  model: '1. The correct order is **Mamluk, Khalji, Tughlaq, Sayyid, Lodi**.\n2. The **Mamluk** dynasty began in **1206** and the **Khalji** in **1290**.\n3. The Sayyid dynasty came before the Lodi, which began in **1451**.',
  sol: 'Correct order with two starting years.',
  scheme: [['Correct order of all five', 1], ['Two starting years', 1], ['Sayyid before Lodi or a third year', 1]],
}));

// ================================================================ t03 Alauddin: markets and Deccan
Q('m_markets_aim', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The imagined clerk Bharat writes in his ledger: "The Sultan wants goods in Delhi to cost little, so that soldiers on modest pay can still buy what they need." What was the main aim of the market regulations of Alauddin Khalji?',
  opts: [
    'To maintain a large standing army on modest salaries, especially against Mongol raids',
    'To raise the land tax to half of the produce',
    'To move the capital to the Deccan',
    'To issue copper coins valued like silver',
  ],
  sol: 'The regulations kept prices low so a big army could be paid modest salaries, which mattered during Mongol raids. The land tax, the move of the capital and token coins are other topics.',
}));
Q('m_shahna', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'At the imagined cloth market of Sarai Rohan, an officer inspects the stalls and reports on the traders to the Sultan. Which official under Alauddin Khalji does this describe?',
  opts: ['The market superintendent (shahna-i-mandi)', 'A khut', 'A chaudhari', 'A muqaddam'],
  sol: 'The shahna-i-mandi supervised the market. Khuts, muqaddams and chaudharis were local intermediaries in the countryside who were involved in revenue.',
}));
Q('m_diary_goods', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Govind, an imagined horse dealer of Delhi, finds that he may not sell a horse for more than the fixed rate announced for his market. Which policy of Alauddin Khalji explains this?',
  opts: [
    'Price control through the market regulations',
    'Branding of horses with the dagh',
    'The measurement of land in the Doab',
    'The token currency',
  ],
  sol: 'Fixed prices for grain, cloth, horses and other goods were part of the market regulations. The dagh was for branding army horses, land measurement belonged to the revenue reforms, and token currency was introduced under a later ruler.',
}));
Q('m_kafur', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'An imagined museum card on the Deccan expedition says that the army sent south from Delhi under Alauddin Khalji was led by his general. Who was he?',
  opts: ['Malik Kafur', 'Ziauddin Barani', 'Bahlul Lodi', 'Khizr Khan'],
  sol: 'Malik Kafur led the Deccan expedition. Ziauddin Barani was a chronicler, Bahlul Lodi founded the Lodi dynasty and Khizr Khan founded the Sayyid dynasty.',
}));
Q('m_deccan_aim', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined student notes that after the campaigns of about 1307 to 1311, the Yadavas, Kakatiyas, Hoysalas and Pandyas sent wealth to Delhi but continued to have rulers of their own. What does this suggest about the aim of the expedition?',
  opts: [
    'It aimed mainly at wealth and tribute, with the southern kingdoms accepting overlordship rather than being annexed directly',
    'It aimed at the direct annexation of every southern kingdom',
    'It aimed at moving the capital to the south',
    'It aimed at ending the Mongol raids in the south',
  ],
  sol: 'The kingdoms kept their own rulers but paid wealth and accepted overlordship, which points to tribute as the main aim. Annexation was mostly not attempted, the capital moved only later, and the Mongol raids came from the north-west.',
}));
Q('m_market_end', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'In an imagined debate, a student says: "Prices in Delhi stayed steady during Alauddin Khalji\'s reign, yet the system did not last after him." Which explanation is the best supported?',
  opts: [
    'The system depended on strong enforcement through officials and spies under his personal control, which later rulers did not keep up',
    'The prices fell because land tax was abolished',
    'The system ended because the Mongols captured Delhi',
    'The system never had officials to enforce it',
  ],
  sol: 'The regulations worked through supervision by the superintendent, spies and strict penalties, so they depended on a strong ruler. The land tax was in fact raised in the Doab, the Mongols did not capture Delhi, and officials did exist.',
}));
Q('ar_market', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Alauddin Khalji fixed the prices of grain, cloth, horses and other goods in Delhi.',
  r: 'He wished to maintain a large standing army on modest salaries.',
  sol: 'Both are true, and the reason explains the assertion: with prices fixed low, modest salaries were enough for soldiers, so a large army could be kept.',
}));
Q('fb_dwarasamudra', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'During the Deccan expedition the army of Delhi reached Dwarasamudra, the capital of the ___ dynasty.',
  acc: [['Hoysala', 'Hoysalas', 'hoysala', 'hoysalas']],
  sol: 'Dwarasamudra was the capital of the Hoysalas.',
}));
Q('mt_deccan', match({
  t: 3, d: 3, c: 'recall', marks: 2,
  stem: 'Match each place attacked in the Deccan expedition with the dynasty that ruled it.',
  pairs: [
    ['Devagiri', 'Yadavas'],
    ['Warangal', 'Kakatiyas'],
    ['Dwarasamudra', 'Hoysalas'],
    ['Madurai', 'Pandyas'],
  ],
  sol: 'Devagiri was held by the Yadavas, Warangal by the Kakatiyas, Dwarasamudra by the Hoysalas and Madurai by the Pandyas.',
}));
Q('ord_deccan', ord({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these Deccan campaigns of Alauddin Khalji\'s reign in the order in which they took place, earliest first.',
  items: ['Devagiri, about 1307 to 08', 'Warangal, about 1309 to 10', 'Madurai, about 1311'],
  sol: 'Devagiri about 1307 to 08, then Warangal about 1309 to 10, then Madurai about 1311.',
}));
Q('s_market', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two measures taken by Alauddin Khalji to make his market regulations work.',
  model: '1. He appointed a **market superintendent (shahna-i-mandi)** and set up **separate markets** for different goods.\n2. He kept **state granaries**, **registered the merchants** and used **spies** to report on traders.',
  sol: 'Any two of the officials, granaries, registration and spies.',
  scheme: [['First measure', 1], ['Second measure', 1]],
}));
Q('s2_deccan', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two results of the Deccan expedition led by Malik Kafur.',
  model: '1. A great deal of **wealth** and tribute reached Delhi from the south.\n2. The southern kingdoms **accepted the overlordship** of Delhi, though most kept their own rulers.',
  sol: 'Wealth for Delhi; southern kingdoms accepted overlordship.',
  scheme: [['Wealth and tribute for Delhi', 1], ['Overlordship accepted by the southern kingdoms', 1]],
}));
Q('s3_market', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the aim of Alauddin Khalji\'s market regulations and describe two ways in which they were enforced.',
  model: '1. **Aim**: to keep a **large standing army** on **modest salaries**, especially against Mongol raids.\n2. **Enforcement**: a **market superintendent** and **spies** watched the traders.\n3. Merchants were **registered**, and cheating on weights brought **strict penalties**.',
  sol: 'Aim; two methods of enforcement.',
  scheme: [['Aim stated', 1], ['First method of enforcement', 1], ['Second method of enforcement', 1]],
}));
Q('s3_deccan', short({
  t: 3, d: 3, c: 'recall', marks: 3, wl: S3,
  stem: 'Name three southern kingdoms attacked in the Deccan expedition of Alauddin Khalji and the dynasty that ruled each.',
  model: '1. **Devagiri**, ruled by the **Yadavas**, about 1307 to 08.\n2. **Warangal**, ruled by the **Kakatiyas**, about 1309 to 10.\n3. **Dwarasamudra** of the **Hoysalas**, or **Madurai** of the **Pandyas**, about 1311.',
  sol: 'Any three place and dynasty pairs.',
  scheme: [['First pair', 1], ['Second pair', 1], ['Third pair', 1]],
}));
Q('l_market', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The market regulations were among the best-known measures of Alauddin Khalji.\n\n(i) State the aim of the regulations and name the goods whose prices were fixed. **[3]**\n(ii) Describe how the markets and the traders were supervised. **[3]**\n(iii) Describe the results of the regulations and say what happened to them after his reign. **[4]**',
  model: '(i) The aim was to **maintain a large standing army on modest salaries**, especially against **Mongol raids**. Prices were fixed for **grain, cloth, horses** and other goods.\n\n(ii) There were **separate markets** under a **market superintendent (shahna-i-mandi)**. The state kept **granaries**, **registered the merchants** and used **spies** to report on traders. Cheating on weights brought **strict penalties**.\n\n(iii) The result was **stable prices in Delhi** during his reign, so soldiers could manage on modest pay and a large army could be maintained. The system depended on close control by the ruler, and it **ended after him**.',
  sol: 'Aim and goods; supervision; results and end of the system.',
  scheme: [['(i) Aim: large army on modest salaries, Mongol raids', 2], ['(i) Goods: grain, cloth, horses', 1], ['(ii) Separate markets and superintendent', 1], ['(ii) Granaries and registration of merchants', 1], ['(ii) Spies and penalties', 1], ['(iii) Stable prices in Delhi during his reign', 2], ['(iii) A large army could be kept', 1], ['(iii) The system ended after him', 1]],
}));
Q('l_deccan', long({
  t: 3, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Alauddin Khalji sent an army to the Deccan under Malik Kafur.\n\n(i) Name the four kingdoms attacked, with the dynasty that ruled each. **[3]**\n(ii) State the aims of the expedition. **[3]**\n(iii) Describe its results for Delhi and for the southern kingdoms. **[4]**',
  model: '(i) The army sent from Delhi under Malik Kafur marched against **Devagiri (Yadavas)** about 1307 to 08, **Warangal (Kakatiyas)** about 1309 to 10, **Dwarasamudra (Hoysalas)** about 1311 and **Madurai (Pandyas)** about 1311.\n\n(ii) The main aim was **wealth and tribute** rather than direct annexation of the southern lands. The campaigns also made the rulers of the south accept the **overlordship** of Delhi, so that the rich kingdoms of the peninsula were brought into its influence without a long occupation.\n\n(iii) **Delhi** gained great **wealth**, which helped to pay for the large army and its needs. The **southern kingdoms** accepted overlordship and paid tribute, but most of them kept their own rulers and were not directly governed from Delhi. In this way the expedition widened the reach of Delhi in the south.',
  sol: 'Four kingdoms; aims; results.',
  scheme: [['(i) Devagiri and Warangal with dynasties', 1.5], ['(i) Dwarasamudra and Madurai with dynasties', 1.5], ['(ii) Wealth and tribute', 1.5], ['(ii) Overlordship rather than annexation', 1.5], ['(iii) Wealth for Delhi', 2], ['(iii) Southern kingdoms accepted overlordship and kept rulers', 2]],
}));
Q('sb_visit', source({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined school notes and answer the questions that follow. ${IMAG}`,
  passage: '**Notes from the imagined heritage-walk file of Class IX, Greenfield Public School**\n\nAt Mehrauli our guide, Ms. Kavya, showed us a tall tower of red and buff sandstone and marble with bands of carved lettering. She said that work on it began about 1199 under a ruler of the first dynasty, that a later ruler of the same dynasty completed the upper storeys, and that another ruler repaired it after lightning damage. Our teacher reminded us that the dynasties, in order, are the first one, then the Khalji, then the Tughlaq, then two more ending in 1526.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the tower described in the notes.', model: 'The **Qutab Minar** (Qutb Minar).', sol: 'The Qutab Minar.', scheme: [['Qutab Minar', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which dynasty was "the first dynasty" in the notes?', model: 'The **Mamluk (Ilbari)** dynasty.', sol: 'Mamluk.', scheme: [['Mamluk (Ilbari)', 1]] })),
    child('c', short({ t: [1, 2], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Name the two rulers of the first dynasty who began and completed the upper storeys of the tower, and say which later ruler repaired it.', model: '**Qutbuddin Aibak** began it and **Iltutmish** completed the upper storeys. **Firuz Shah Tughlaq** (a Tughlaq ruler) repaired it later.', sol: 'Aibak; Iltutmish; Firuz Shah Tughlaq.', scheme: [['Aibak began and Iltutmish completed the upper storeys', 1], ['Firuz Shah Tughlaq repaired it', 1]] }), [
      short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Name the two dynasties that the teacher left out between the Tughlaq and the year 1526.', model: 'The **Sayyid** dynasty (1414 to 1451) and the **Lodi** dynasty (1451 to 1526).', sol: 'Sayyid and Lodi.', scheme: [['Sayyid dynasty', 1], ['Lodi dynasty', 1]] }),
    ]),
  ],
}));
Q('sb_diary', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined diary page and answer the questions that follow. ${IMAG}`,
  passage: '**A page from the imagined diary of Nihal, a made-up grain merchant of Delhi**\n\nThis season the price of wheat in my lane has not moved. Everything in the grain market is sold at the rate announced for it, and my name is entered in the register of merchants. The market superintendent walks through the stalls, and my neighbour says that spies listen to what traders say. A friend who sells cloth told me that soldiers in the city pay little for their needs, because the army is large and its salaries are modest. I hear that a rule has been issued that nobles must ask permission before holding a large feast.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name one measure of the market regulations that Nihal mentions.', model: 'The **registration of merchants** (or fixed prices, the superintendent, or spies).', sol: 'Any one measure named in the diary.', scheme: [['One measure named', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'Which ruler\'s reign does this diary page describe?', model: '**Alauddin Khalji** (about 1296 to 1316).', sol: 'Alauddin Khalji.', scheme: [['Alauddin Khalji', 1]] })),
    child('c', short({ t: [3, 4], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why were salaries for soldiers described as modest, and how did fixed prices help them?', model: 'The state kept a **large standing army**, so salaries had to be **modest**. **Fixed prices** kept goods cheap, so modest pay was still enough for soldiers\' needs.', sol: 'Large army, modest pay; fixed prices kept goods cheap.', scheme: [['Large army needed modest salaries', 1], ['Fixed prices made modest pay enough', 1]] }), [
      short({ t: 4, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Which measure against the nobles does the last sentence refer to, and name one more such measure.', model: 'The need for **permission for feasts and gatherings**. Another measure was the need for permission for **marriages between noble families** (or the ban on liquor, or a spy system).', sol: 'Permission for feasts; one more measure.', scheme: [['Permission for feasts and gatherings', 1], ['One more measure', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 Nobility, military, revenue
Q('m_nobility', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The imagined noble Rukn wishes to hold a large feast for his family and friends during the reign of Alauddin Khalji. What did the rules of the Sultan require him to do?',
  opts: [
    'Obtain permission before holding the gathering',
    'Hold it only inside the royal fort',
    'Pay the land tax in advance',
    'Register his horses with the market superintendent',
  ],
  sol: 'Alauddin allowed feasts and gatherings of nobles only with permission, to prevent plots against him. The other options mix in unrelated measures.',
}));
Q('m_dagh', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'At an imagined army review at Siri, each horse of the cavalry is marked with an official brand so that no owner can replace a good horse with a weak one. What is this practice called?',
  opts: ['Dagh', 'Huliya', 'Shahna-i-mandi', 'Khut'],
  sol: 'The branding of horses was called dagh. The huliya was a descriptive roll of the soldiers, the shahna-i-mandi was the market superintendent, and a khut was a local revenue intermediary.',
}));
Q('m_cash_army', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'The imagined soldier Rahim of Delhi receives his salary in cash from the royal treasury and not through a grant of land. What did this arrangement help the ruler to do?',
  opts: [
    'Keep a permanent standing army under his direct control',
    'Hand the army to the nobles to manage',
    'Stop paying any soldiers during peace',
    'Avoid any need for forts',
  ],
  sol: 'A standing army paid in cash was directly under the ruler. It was not left to the nobles, it was permanent, and forts were also strengthened against the Mongols.',
}));
Q('m_revenue_half', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A village in the Doab, imagined for this question, produces 80 quintals of grain. If the land tax was raised to about half of the produce, how much was due to the state?',
  opts: ['About 40 quintals', 'About 20 quintals', 'About 16 quintals', 'About 60 quintals'],
  sol: 'Half of 80 is 40. Twenty would be a quarter, 16 would be one-fifth and 60 would be three-quarters.',
}));
Q('m_intermediaries', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'In an imagined district, the khuts, muqaddams and chaudharis lose some of the privileges they had enjoyed in collecting revenue. What is the best explanation of this change under Alauddin Khalji?',
  opts: [
    'His revenue reforms curbed these local intermediaries so that more of the revenue reached the state',
    'He gave them higher salaries to win their support',
    'He abolished land revenue completely',
    'He moved the revenue office to the Deccan',
  ],
  sol: 'The reforms curbed the privileges of local intermediaries and brought more revenue to the state. Land revenue was not abolished, and the revenue was collected around Delhi, not in the Deccan.',
}));
Q('ar_reforms', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Alauddin Khalji had the land measured in the Doab region.',
  r: 'Measurement allowed the revenue to be fixed on the area actually cultivated.',
  sol: 'Both are true, and the reason explains the assertion: measuring the land gave a basis for assessing the tax on the cultivated area.',
}));
Q('tf_nobles', tf({
  t: 4, d: 2, c: 'recall', ans: false,
  stem: 'True or false? Under Alauddin Khalji, marriages between noble families could be arranged freely without any permission.',
  sol: 'False. Marriages between noble families needed the Sultan\'s permission.',
}));
Q('fb_huliya', fb({
  t: 4, d: 3, c: 'recall',
  stem: 'A descriptive roll of every soldier, kept to prevent false musters, was called the ___.',
  acc: [['huliya', 'Huliya', 'chehra', 'Chehra']],
  sol: 'This roll was called the huliya, also known as the chehra.',
}));
Q('mt_terms', match({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each term from the reforms of Alauddin Khalji with its meaning.',
  pairs: [
    ['Dagh', 'Branding of horses'],
    ['Huliya', 'Descriptive roll of soldiers'],
    ['Khut', 'A local intermediary in revenue collection'],
    ['Shahna-i-mandi', 'Market superintendent'],
  ],
  sol: 'Dagh was the branding of horses, the huliya a descriptive roll of soldiers, a khut a local revenue intermediary and the shahna-i-mandi the market superintendent.',
}));
Q('s_nobility', short({
  t: 4, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two measures taken by Alauddin Khalji to keep a check on the nobility.',
  model: '1. Feasts and **gatherings** of nobles, and **marriages** between noble families, were allowed only with **permission**.\n2. He banned **liquor**, set up a **spy system** and took back many **grants and gifts of land**.',
  sol: 'Any two measures such as permission, ban, spies, resumption of grants.',
  scheme: [['First measure', 1], ['Second measure', 1]],
}));
Q('s_revenue', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features of the revenue reforms of Alauddin Khalji.',
  model: '1. The **land was measured**, and the tax in the **Doab** was raised to about **half of the produce**.\n2. Revenue could be paid in **cash or kind**, and the **privileges of local intermediaries** such as khuts, muqaddams and chaudharis were curbed.',
  sol: 'Any two of the features.',
  scheme: [['Measurement and the tax rate', 1], ['Cash or kind, or curbing intermediaries', 1]],
}));
Q('s3_military', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three military reforms of Alauddin Khalji.',
  model: '1. He created a **permanent standing army** paid in **cash**.\n2. He introduced the **dagh**, the branding of horses, and the **huliya**, a descriptive roll of soldiers, to stop cheating.\n3. He **strengthened forts** against the Mongol raids.',
  sol: 'Standing army; dagh and huliya; forts.',
  scheme: [['Standing army paid in cash', 1], ['Dagh and huliya', 1], ['Forts strengthened', 1]],
}));
Q('l_nobility', long({
  t: 4, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Alauddin Khalji reorganised the nobility, the army and the revenue.\n\n(i) Describe the measures he took to keep a check on the nobles. **[3]**\n(ii) Describe his military reforms. **[3]**\n(iii) Explain his revenue reforms and what they aimed to do. **[4]**',
  model: '(i) **Feasts and gatherings** of nobles and **marriages** between noble families were allowed only with **permission**. He banned **liquor**, used **spies**, and took back many **grants and gifts of land**.\n\n(ii) He raised a **permanent standing army** paid in **cash**. The **dagh** (branding of horses) and the **huliya** (descriptive roll of soldiers) prevented false musters, and **forts** were strengthened against the Mongols.\n\n(iii) The **land was measured**, and in the **Doab** the tax was raised to about **half of the produce**, collected in **cash or kind**. The privileges of **khuts, muqaddams and chaudharis** were curbed. The aim was to bring more revenue to the state to pay for the army.',
  sol: 'Measures on nobles; military reforms; revenue reforms and their aim.',
  scheme: [['(i) Permission for feasts and marriages', 1], ['(i) Liquor ban and spies', 1], ['(i) Land grants taken back', 1], ['(ii) Standing army paid in cash', 1.5], ['(ii) Dagh, huliya and forts', 1.5], ['(iii) Measurement and tax about half in the Doab', 1.5], ['(iii) Cash or kind; intermediaries curbed', 1.5], ['(iii) Aim: more revenue to the state for the army', 1]],
}));

// ================================================================ t05 Muhammad bin Tughlaq: capital and tokens
Q('m_capital_reason', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'In an imagined history club, four members give reasons for the transfer of the capital from Delhi to Devagiri about 1327. Which is a reason commonly taught?',
  opts: [
    'Devagiri lay in a central position from which the south could be controlled, and it was safer from Mongol raids',
    'Delhi had run out of drinking water',
    'The Mongols had asked for the capital to be moved',
    'The army had been disbanded in Delhi',
  ],
  sol: 'As commonly taught, Devagiri was more central for controlling the south and was safer from Mongol raids than Delhi. The other reasons are not part of the usual account.',
}));
Q('m_capital_fail', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: 'An imagined traveller\'s note from about 1328 records the hardship of the long march from Delhi to Daulatabad and the distance of the new capital from the north-west frontier. Which conclusion about the transfer is best supported?',
  opts: [
    'The hardship of the journey and the distance from the north-west frontier made the plan hard to sustain, and the court returned to Delhi',
    'The transfer was a lasting success and Delhi was abandoned for ever',
    'The transfer ended the Mongol threat in the north-west',
    'The people were happy to move',
  ],
  sol: 'The hardship and distance made the plan hard to sustain, so the capital returned to Delhi. It was not a lasting success, the north-west frontier was left more distant, and the note does not suggest the move was welcomed.',
}));
Q('m_token_reason', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'A museum guide in the imagined town of Rampur explains why Muhammad bin Tughlaq issued bronze or copper coins to be valued like silver tankas about 1329 to 30. Which reason is commonly taught?',
  opts: [
    'There was a shortage of silver at the time',
    'There was too much silver in the treasury',
    'Merchants had asked for bronze coins to be made',
    'The tanka had to be withdrawn because it was forged',
  ],
  sol: 'As commonly taught, the experiment came at a time of silver shortage. It was not caused by too much silver, by a request of merchants or by a forged tanka.',
}));
Q('m_token_fail', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: 'An imagined coin collector found many token coins, some very crudely made, in an old well in the village of Naya Kheda. Which two reasons for the failure of the token currency do these coins best illustrate?',
  opts: [
    'Easy forgery and the loss of trust in the coins',
    'Heavy taxation and the flight of peasants',
    'The strict control of markets and the fixed price of horses',
    'The distance of the new capital and the hardship of travel',
  ],
  sol: 'Coins that were easy to copy lost the trust of people, which is why the token currency failed. Heavy taxation belongs to the Doab, market control to Alauddin Khalji and the distance of the capital to Daulatabad.',
}));
Q('m_token_exchange', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'In an imagined account, people in Delhi bring bundles of token coins to the royal treasury, and the treasury gives them silver tankas in return. What does this show about the token currency?',
  opts: [
    'The experiment was ended: the coins were withdrawn and exchanged by the treasury',
    'The experiment had just begun',
    'The treasury had no silver left',
    'Token coins had become the only legal money',
  ],
  sol: 'The treasury withdrew the coins and exchanged them, which marks the end of the experiment. It does not show a beginning, a lack of silver or exclusive use of token coins.',
}));
Q('ar_token', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The token currency of Muhammad bin Tughlaq failed.',
  r: 'The coins could be forged easily, so people lost trust in them.',
  sol: 'Both are true, and the reason explains the assertion: easy forgery destroyed trust in the coins, and without trust they could not pass as silver.',
}));
Q('tf_capital', tf({
  t: 5, d: 2, c: 'recall', ans: true,
  stem: 'True or false? Muhammad bin Tughlaq transferred his capital from Delhi to Devagiri, which he renamed Daulatabad, about 1327.',
  sol: 'True. Devagiri was renamed Daulatabad, and the transfer is commonly dated about 1327.',
}));
Q('ord_events', ord({
  t: [2, 3, 5], d: 3, c: 'understanding', marks: 2,
  stem: 'An imagined museum case holds four labels about the Sultanate. Arrange the events in the order in which they happened, earliest first.',
  items: ['Qutbuddin Aibak begins the Qutab Minar, about 1199', 'Malik Kafur\'s army marches to Devagiri, about 1307 to 08', 'The capital is moved to Daulatabad, about 1327', 'The First Battle of Panipat, 1526'],
  sol: 'Aibak begins the Minar about 1199, then the march to Devagiri about 1307 to 08, then the move to Daulatabad about 1327, then Panipat in 1526.',
}));
Q('mt_mbt', match({
  t: [5, 6], d: 3, c: 'recall', marks: 2,
  stem: 'Match each term connected with Muhammad bin Tughlaq with its meaning.',
  pairs: [
    ['Daulatabad', 'The new name given to Devagiri'],
    ['Tanka', 'A silver coin of the time'],
    ['Token coins', 'Bronze or copper coins valued like silver'],
    ['Khurasan', 'A region he planned to conquer'],
  ],
  sol: 'Daulatabad was the new name of Devagiri, the tanka a silver coin, token coins were bronze or copper pieces valued like silver, and Khurasan was a region he planned to conquer.',
}));
Q('s_cap_reasons', short({
  t: 5, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two reasons given for the transfer of the capital from Delhi to Devagiri.',
  model: '1. Devagiri lay in a **central position**, so it was a better place from which to **control the south**.\n2. It was believed to be **safer from Mongol raids** than Delhi.',
  sol: 'Central location to control the south; safety from Mongol raids.',
  scheme: [['Central location to control the south', 1], ['Safety from Mongol raids', 1]],
}));
Q('s_cap_fail', short({
  t: 5, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two reasons why the transfer of the capital to Daulatabad failed.',
  model: '1. The **long journey** caused great **hardship** to those who moved.\n2. Daulatabad was far from the **north-west frontier**, so the north was hard to defend, and the court **returned to Delhi**.',
  sol: 'Hardship of the journey; distance from the north-west frontier.',
  scheme: [['Hardship of the long journey', 1], ['Distance from the north-west frontier', 1]],
}));
Q('s3_token', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three reasons why the token currency experiment failed.',
  model: '1. The coins were **easy to forge**, because many people could imitate them.\n2. People **lost trust** and kept their silver tankas.\n3. The coins were **withdrawn** and **exchanged by the treasury**, which ended the experiment.',
  sol: 'Forgery; loss of trust; withdrawal and exchange.',
  scheme: [['Easy forgery', 1], ['Loss of trust', 1], ['Withdrawal and exchange by the treasury', 1]],
}));
Q('l_capital', long({
  t: 5, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Muhammad bin Tughlaq moved his capital from Delhi to Devagiri.\n\n(i) State the reasons commonly given for the transfer. **[3]**\n(ii) Describe how the plan was carried out and what difficulties followed. **[3]**\n(iii) Explain why the plan failed and what happened in the end. **[4]**',
  model: '(i) About **1327** he moved the capital to **Devagiri**, which he renamed **Daulatabad**. The reasons given are its **central location**, from which the **south** could be controlled, and its **safety from Mongol raids**.\n\n(ii) The court and many people had to make the **long journey** from Delhi, and the **hardship** on the way was great. Daulatabad was far from the **north-west frontier**.\n\n(iii) The plan failed because the **hardship** was heavy and because the **distance** from the north-west made the frontier hard to defend. The capital **returned to Delhi**, and the experiment is remembered as a failure, though some historians say the idea had merit.',
  sol: 'Reasons; carrying out and difficulties; failure and outcome.',
  scheme: [['(i) Devagiri renamed Daulatabad, about 1327', 1], ['(i) Central location to control the south', 1], ['(i) Safety from Mongol raids', 1], ['(ii) Long journey and hardship', 1.5], ['(ii) Distance from the north-west frontier', 1.5], ['(iii) Why it failed', 2], ['(iii) Return to Delhi', 2]],
}));
Q('l_token', long({
  t: 5, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'About 1329 to 30, Muhammad bin Tughlaq introduced a token currency.\n\n(i) Describe the token currency and the situation in which it was introduced. **[3]**\n(ii) Explain why it failed. **[3]**\n(iii) Describe what the government did in the end, and evaluate the idea. **[4]**',
  model: '(i) **Bronze or copper coins** were to be valued like the **silver tankas**, so that a coin of a cheaper metal would pass for the same worth as a silver one. As commonly taught, the plan came at a time of **silver shortage**, when there was too little silver for the needs of the state and of trade.\n\n(ii) The coins were **easy to forge**, so many false coins appeared and were hard to tell from the true ones. People **lost trust** in them and would not accept them at the worth of silver, and trade suffered.\n\n(iii) The coins were **withdrawn** and **exchanged by the treasury** for silver, which was a heavy cost. Some historians say the idea was **far-sighted**, since token money is used in many countries, but that it was **badly prepared**, because no safeguards against forgery were in place.',
  sol: 'The coins and the situation; reasons for failure; the end and an evaluation.',
  scheme: [['(i) Bronze or copper valued like silver tankas', 2], ['(i) Silver shortage', 1], ['(ii) Easy forgery', 1.5], ['(ii) Loss of trust', 1.5], ['(iii) Withdrawal and exchange by the treasury', 2], ['(iii) A balanced evaluation of the idea', 2]],
}));
Q('sb_coin', source({
  t: [5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined museum label and answer the questions that follow. ${IMAG}`,
  passage: '**Label for a display case in the Money Gallery of an imagined museum**\n\nThe case holds a silver coin and a handful of copper discs stamped with the marks of a silver coin. The copper discs were found in an imagined hoard in the village of Naya Kheda. Several of them differ in size and weight, and a few look as if they were copied from one another. Next to them lies a receipt from an imagined treasury showing that a bundle of such discs was exchanged for a silver coin.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Which experiment of which ruler does the display illustrate?', model: 'The **token currency** of **Muhammad bin Tughlaq**.', sol: 'Token currency of Muhammad bin Tughlaq.', scheme: [['Token currency of Muhammad bin Tughlaq', 1]] })),
    child('b', short({ t: 5, d: 3, c: 'application', marks: 1, stem: 'Which detail of the label suggests that the coins were easy to forge?', model: 'Some discs **differ in size and weight** and look **copied from one another**.', sol: 'Differences and copies.', scheme: [['Discs differ and look copied', 1]] })),
    child('c', short({ t: 5, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): What does the receipt show about the end of the experiment?', model: 'It shows that the treasury **exchanged** the discs for **silver coins**, so the tokens were **withdrawn**.', sol: 'Treasury exchanged tokens for silver; tokens withdrawn.', scheme: [['The treasury exchanged the discs for silver', 1], ['The tokens were withdrawn', 1]] }), [
      short({ t: 5, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): State one reason commonly given for introducing token coins and one reason for their failure.', model: 'The reason for introducing them was a **silver shortage**; one reason for failure was **easy forgery** (or loss of trust).', sol: 'Silver shortage; forgery or loss of trust.', scheme: [['Silver shortage', 1], ['Forgery or loss of trust', 1]] }),
    ]),
  ],
}));

// ================================================================ t06 Muhammad bin Tughlaq: Doab and conquests
Q('m_doab_famine', mcq({
  t: 6, d: 3, c: 'application',
  stem: 'In the imagined Doab village of Ghazipur Khurd, a family receives an order to pay a higher land tax in a year when the harvest has failed. What were the likely results, as commonly taught for Muhammad bin Tughlaq\'s tax in the Doab?',
  opts: [
    'Unrest, and the flight of many peasants from their fields',
    'A rise in grain stocks in the state granaries',
    'A great increase in the number of cultivated fields',
    'The end of all revenue collection',
  ],
  sol: 'The tax increase came at a time of famine, which led to unrest and the flight of peasants. The other options describe the opposite or something that did not happen.',
}));
Q('m_khurasan', mcq({
  t: 6, d: 2, c: 'recall',
  stem: 'An imagined exhibition card on the plans of conquest of Muhammad bin Tughlaq says: "An army was raised for Khurasan but was disbanded before it set out." What does the card describe?',
  opts: [
    'A plan of conquest that was given up without a campaign',
    'A great victory in the north-west',
    'A battle against the Mongols at Delhi',
    'An expedition that suffered heavy losses',
  ],
  sol: 'The Khurasan plan was dropped when the army was disbanded. The expedition with heavy losses was the one to Qarachil.',
}));
Q('m_qarachil', mcq({
  t: 6, d: 3, c: 'application',
  stem: 'The imagined Hill Archive records an expedition into the mountains of the Kumaon region in which the army suffered heavy losses. Which expedition of Muhammad bin Tughlaq is it?',
  opts: ['The Qarachil expedition', 'The Khurasan expedition', 'The Deccan expedition of Malik Kafur', 'The Panipat campaign'],
  sol: 'The Qarachil expedition into the hill region suffered heavy losses. Khurasan was given up, the Deccan expedition belonged to Alauddin Khalji, and Panipat was in 1526.',
}));
Q('m_debate', mcq({
  t: 6, d: 4, c: 'evaluation',
  stem: 'In an imagined seminar, Dr. Lata says some historians regard Muhammad bin Tughlaq as a far-sighted ruler whose plans were poorly carried out, while Mr. Asif says others regard them as impractical. Which summary of the debate is the most balanced?',
  opts: [
    'Historians differ: some see well-meant, far-sighted ideas that were badly carried out, and others see impractical schemes',
    'All historians agree that he was entirely wise',
    'All historians agree that he planned nothing of value',
    'The debate has no bearing on his reign',
  ],
  sol: 'A balanced answer states both views as views of historians. The options that make all historians agree misstate the debate, and the debate does bear on judging his reign.',
}));
Q('ar_doab', ar({
  t: 6, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The increase of tax in the Doab led to unrest.',
  r: 'It came at a time of famine, when many peasants could not pay and left their fields.',
  sol: 'Both are true, and the reason explains the assertion: a heavier tax in a famine pushed peasants to flight and unrest.',
}));
Q('tf_qarachil', tf({
  t: 6, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The expedition to Qarachil in the Kumaon hill region suffered heavy losses.',
  sol: 'True. The army suffered heavy losses, so the expedition is counted as a failure.',
}));
Q('fb_doab', fb({
  t: 6, d: 1, c: 'recall',
  stem: 'The fertile region between the Ganga and the Yamuna, where Muhammad bin Tughlaq raised the tax, is called the ___.',
  acc: [['Doab', 'doab']],
  sol: 'The region is the Doab.',
}));
Q('s_doab', short({
  t: 6, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two results of the increase in the tax in the Doab.',
  model: '1. It came at a time of **famine**, and it led to **unrest** among the peasants.\n2. Many peasants **fled** from their fields, and the relief measures that followed, such as **loans and wells**, came **too late**.',
  sol: 'Unrest and flight of peasants; late relief.',
  scheme: [['Unrest at a time of famine', 1], ['Flight of peasants; relief came late', 1]],
}));
Q('s_conquest', short({
  t: 6, d: 3, c: 'recall', marks: 2, wl: S2,
  stem: 'Name two plans of conquest of Muhammad bin Tughlaq and state what happened to each.',
  model: '1. **Khurasan**: an army was **raised** for the plan and then **disbanded**.\n2. **Qarachil**, in the Kumaon hills: an expedition was sent but it **suffered heavy losses**.',
  sol: 'Khurasan; Qarachil.',
  scheme: [['Khurasan and its outcome', 1], ['Qarachil and its outcome', 1]],
}));
Q('s3_debate', short({
  t: 6, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Give the two views historians hold about Muhammad bin Tughlaq and say which one you find stronger, with a reason.',
  model: '1. Some historians regard him as a **far-sighted ruler** whose plans were **poorly carried out**.\n2. Others regard his schemes as **impractical** and badly judged.\n3. A reasoned answer may find the **first view** fairer for the capital and the coins, because the ideas had a purpose, while the Doab tax in a famine was ill-timed.',
  sol: 'Two views and a reasoned choice.',
  scheme: [['First view', 1], ['Second view', 1], ['A reasoned choice', 1]],
}));
Q('l_doab', long({
  t: 6, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Muhammad bin Tughlaq raised the tax in the Doab and planned conquests in the north and north-west.\n\n(i) Describe the tax increase in the Doab and its results. **[3]**\n(ii) Describe his plans for Khurasan and Qarachil. **[3]**\n(iii) Evaluate his reign: present two views historians hold about him. **[4]**',
  model: '(i) He **raised the tax** in the **Doab**, the fertile land between the Ganga and the Yamuna, at a time of **famine**. Many peasants could not pay, and this led to **unrest** and the **flight of peasants** from their fields.\n\n(ii) The army raised for **Khurasan** was **disbanded** without a campaign. The **Qarachil** expedition into the Kumaon hills region **suffered heavy losses**. In the Doab, relief measures such as **loans and wells** were taken, but they came **late** to help the peasants.\n\n(iii) **Some historians** regard him as a **far-sighted ruler** whose plans were **poorly carried out**. **Others** see his schemes as **impractical**. A balanced answer says that his ideas had a purpose, but that poor timing and weak preparation caused hardship, so both views deserve a hearing.',
  sol: 'Doab tax; Khurasan and Qarachil; two views.',
  scheme: [['(i) Tax raised during famine', 1.5], ['(i) Unrest and flight of peasants', 1.5], ['(ii) Khurasan army disbanded', 1], ['(ii) Qarachil heavy losses', 1], ['(ii) Late relief measures', 1], ['(iii) Far-sighted but poorly carried out', 1.5], ['(iii) Impractical', 1.5], ['(iii) A balanced conclusion', 1]],
}));
