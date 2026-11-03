// ICSE 9 History & Civics, ch14 Medieval India: Composite Culture — question bank.
// Every walk, notebook, diary, panel, school and town below is imagined by SOYL and labelled as imagined; no textbook text,
// box or exercise and no specimen or board-paper item is reused (D-036). No verse, hymn or saying of any saint is quoted:
// ideas are paraphrased. Every faith and tradition is treated neutrally and respectfully and none is ranked above another.
// Dates are the commonly taught approximate ones. Christian missionaries are covered for education and social service only.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
export const DIED = { moinuddin: 1236, nizamuddin: 1325, chaitanya: 1534, nanak: 1539 }; // approximate years CE
assert.ok(DIED.moinuddin < DIED.nizamuddin && DIED.nizamuddin < DIED.chaitanya && DIED.chaitanya < DIED.nanak);

/** Factors web: six boxes feeding composite culture. */
export function factorsFigure(alt, caption) {
  const s = new Svg(720, 330);
  const tops = [
    [20, 'Long living together', 'people of many faiths as neighbours'],
    [260, 'Patronage by rulers', 'for example Akbar\'s tolerance'],
    [500, 'Bhakti and Sufi movements', 'love, devotion and equality'],
  ];
  const bots = [
    [20, 'Trade and towns', 'markets bring people together'],
    [260, 'Meeting of languages', 'Urdu grew from Hindavi'],
    [500, 'Artisans, many patrons', 'builders, weavers, painters'],
  ];
  s.rect(270, 140, 180, 50, { rx: 12, fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(360, 165, 'Composite culture', { size: 16, bold: true });
  tops.forEach(([x, t, sub]) => {
    s.rect(x, 14, 200, 58, { rx: 10, fill: 'blue', fillOpacity: 0.1, color: 'blue', sw: 1.6 });
    s.text(x + 100, 36, t, { size: 14, bold: true });
    s.text(x + 100, 57, sub, { size: 11, muted: true });
  });
  bots.forEach(([x, t, sub]) => {
    s.rect(x, 258, 200, 58, { rx: 10, fill: 'green', fillOpacity: 0.1, color: 'green', sw: 1.6 });
    s.text(x + 100, 280, t, { size: 14, bold: true });
    s.text(x + 100, 301, sub, { size: 11, muted: true });
  });
  s.arrow(120, 74, 290, 138, { sw: 1.4, color: 'muted' });
  s.arrow(360, 74, 360, 138, { sw: 1.4, color: 'muted' });
  s.arrow(600, 74, 430, 138, { sw: 1.4, color: 'muted' });
  s.arrow(120, 256, 290, 192, { sw: 1.4, color: 'muted' });
  s.arrow(360, 256, 360, 192, { sw: 1.4, color: 'muted' });
  s.arrow(600, 256, 430, 192, { sw: 1.4, color: 'muted' });
  return s.visual(alt, caption);
}

/** Schematic map of regions linked with the saints (numbered pins and a legend). Not to scale. */
export function saintsMapFigure(alt, caption) {
  const s = new Svg(720, 372);
  const X = (lon) => 20 + (lon - 68) * 11.5;
  const Y = (lat) => 20 + (37.5 - lat) * 10.5;
  const outline = [
    [74.5, 34.5], [77, 35], [78.5, 32.5], [80, 30.3], [84, 27.8], [88, 27.5], [89.5, 26.8], [92, 27], [95, 28.5], [97, 28], [95, 26], [94, 24],
    [93, 22], [91.2, 23.5], [89, 22], [88.2, 21.6], [86.8, 20.5], [85, 19.3], [82.5, 17], [80.3, 15.5], [80.2, 13], [79.8, 10.5], [78.2, 8.1],
    [77.5, 8.1], [76.2, 9.5], [75, 12.5], [73.7, 16], [72.8, 19], [72.6, 21.5], [70, 20.8], [69, 22.3], [70.5, 23.2], [68.2, 23.7], [70, 24.3],
    [71, 25.5], [70.2, 27.5], [71.5, 28], [72.5, 30], [74, 31], [74.5, 32.5],
  ];
  s.polygon(outline.map(([lo, la]) => [X(lo), Y(la)]), { sw: 1.6, color: 'muted', fill: 'fill', fillOpacity: 0.25 });
  const pins = [
    [1, 75.3, 31, 'Guru Nanak: Punjab'],
    [2, 73.5, 26.2, 'Mirabai: Rajasthan'],
    [3, 77.7, 27.4, 'Surdas: Braj region'],
    [4, 81.5, 27.3, 'Tulsidas: Awadh region'],
    [5, 83.6, 25.2, 'Ramananda and Kabir: north India'],
    [6, 87.5, 22.8, 'Chaitanya: Bengal and Odisha'],
    [7, 92.6, 26.2, 'Sankardeva: Assam'],
    [8, 74.5, 18.5, 'Namdev, Tukaram: Maharashtra'],
    [9, 78.3, 10.8, 'Alvars, Nayanars: south (earlier)'],
  ];
  const ring = (x, y) => s.path(`M ${x - 11} ${y} a 11 11 0 1 0 22 0 a 11 11 0 1 0 -22 0`, { fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 1.6 });
  pins.forEach(([n, lo, la, label], i) => {
    ring(X(lo), Y(la));
    s.text(X(lo), Y(la), String(n), { size: 12, bold: true });
    const ly = 44 + i * 34;
    ring(420, ly);
    s.text(420, ly, String(n), { size: 12, bold: true });
    s.text(440, ly, label, { size: 14, anchor: 'start' });
  });
  s.text(560, 18, 'Saints and regions', { size: 15, bold: true });
  s.text(360, 358, 'Schematic, not to scale; positions are approximate', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Bhakti and Sufi compared in three boxes: Bhakti, both, Sufi. */
export function compareFigure(alt, caption) {
  const s = new Svg(720, 250);
  const cols = [
    ['Bhakti movement', 'blue', ['Devotion to a personal God', 'Saints in many regions', 'Kirtan and bhajan', 'Teacher: the guru', 'Regional languages']],
    ['Both', 'accent', ['Love and devotion to God', 'Simple living and service', 'A message of equality', 'Music and song', 'Open to people of all groups']],
    ['Sufi movement', 'green', ['Mystics within Islam', 'A pir guides murids', 'Khanqahs open to all', 'Orders: Chishti, Suhrawardi', 'Sama and qawwali']],
  ];
  cols.forEach(([title, col, lines], i) => {
    const x = 10 + i * 238;
    s.rect(x, 12, 224, 226, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + 112, 38, title, { size: 17, bold: true });
    s.line(x + 14, 54, x + 210, 54, { sw: 1, color: col });
    lines.forEach((t, k) => s.text(x + 112, 84 + k * 31, t, { size: 13 }));
  });
  return s.visual(alt, caption);
}

/** A schematic gateway showing features of the Indo-Islamic style (blue) and Indian features (green). */
export function archFigure(alt, caption) {
  const s = new Svg(720, 345);
  // building
  s.rect(250, 160, 220, 130, { rx: 2, fill: 'fill', fillOpacity: 0.25, color: 'muted', sw: 1.6 });
  s.path('M 310 290 V 222 Q 316 192 360 176 Q 404 192 410 222 V 290', { color: 'blue', sw: 2.2, fill: 'blue', fillOpacity: 0.12 });
  s.path('M 300 160 Q 300 94 360 94 Q 420 94 420 160', { color: 'blue', sw: 2.2, fill: 'blue', fillOpacity: 0.12 });
  s.line(360, 94, 360, 78, { sw: 2, color: 'blue' });
  s.rect(232, 112, 16, 178, { rx: 3, fill: 'blue', fillOpacity: 0.15, color: 'blue', sw: 1.8 });
  s.rect(472, 112, 16, 178, { rx: 3, fill: 'blue', fillOpacity: 0.15, color: 'blue', sw: 1.8 });
  // chhatris
  [[258, 286], [434, 462]].forEach(([a, b]) => {
    s.line(a + 4, 134, a + 4, 160, { sw: 2, color: 'green' });
    s.line(b - 4, 134, b - 4, 160, { sw: 2, color: 'green' });
    s.path(`M ${a} 134 Q ${(a + b) / 2} 112 ${b} 134 Z`, { color: 'green', sw: 2, fill: 'green', fillOpacity: 0.15 });
  });
  // brackets
  [[262, 282], [438, 458]].forEach(([a, b]) => s.polygon([[a, 160], [b, 160], [a, 180]], { color: 'green', sw: 1.8, fill: 'green', fillOpacity: 0.2 }));
  // carved panels
  [270, 294, 426, 450].forEach((cx) => s.polygon([[cx - 12, 268], [cx, 259], [cx + 12, 268], [cx, 277]], { color: 'green', sw: 1.4 }));
  // numbered markers and a legend on the left
  const ring = (x, y, col) => s.path(`M ${x - 10} ${y} a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0`, { fill: 'fill', fillOpacity: 0.95, color: col, sw: 1.8 });
  const items = [
    [1, 'Dome', 'blue', 360, 128, 88],
    [2, 'Pointed arch', 'blue', 360, 232, 113],
    [3, 'Minaret', 'blue', 240, 150, 138],
    [4, 'Chhatri', 'green', 272, 126, 214],
    [5, 'Brackets', 'green', 266, 174, 239],
    [6, 'Carved motifs', 'green', 282, 246, 264],
  ];
  s.text(20, 62, 'Indo-Islamic style', { size: 14, bold: true, anchor: 'start', color: 'blue' });
  s.text(20, 188, 'Indian features', { size: 14, bold: true, anchor: 'start', color: 'green' });
  items.forEach(([n, label, col, mx, my, ly]) => {
    ring(mx, my, col);
    s.text(mx, my, String(n), { size: 12, bold: true });
    ring(30, ly, col);
    s.text(30, ly, String(n), { size: 12, bold: true });
    s.text(50, ly, label, { size: 14, anchor: 'start' });
  });
  s.text(360, 328, 'Schematic drawing, not a real building and not to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Factors for the growth of composite culture
Q('m_factor_urdu', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Ms Devika, an imagined language teacher in Lakshmipur, tells her class that in the Delhi region everyday Hindavi speech took in many Persian, Arabic and Turkish words, and that Urdu grew in this way. Which factor of composite culture does she describe?',
  opts: [
    'The meeting of languages through daily contact',
    'The end of all trade between towns',
    'The ban on every regional speech',
    'The rule that only one language could be written',
  ],
  sol: 'Urdu grew as words of several languages mixed in everyday speech, a meeting of languages. Trade did not end, regional speech was not banned, and many languages were in use.',
}));
Q('m_factor_akbar', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A plaque at the imagined Heritage Club of Navnagar says that a ruler welcomed poets, singers and scholars of different faiths at his court and gave them gifts and honour. Which factor of composite culture does the plaque best illustrate?',
  opts: [
    'Patronage by rulers, as in the policy of tolerance followed by Akbar',
    'The complete separation of every community',
    'The closing of all temples, mosques and markets',
    'A law that all artists must follow one tradition',
  ],
  sol: 'Rulers who honoured artists and scholars of many faiths show patronage, which Akbar\'s tolerance is a good example of. The other options describe separation or compulsion, which do not build a blended culture.',
}));
Q('m_factor_trade', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'On the imagined heritage walk of Class IX-B through the old bazaar of Kamalpur, the guide points out a lane where a cloth merchant, a dyer and a bangle-maker of different faiths run shops side by side. Which factor of composite culture does the lane show?',
  opts: [
    'Trade and towns, which brought different people into daily contact',
    'The fall of all towns and the closing of markets',
    'A rule that each faith must trade in a separate town',
    'The abolition of all crafts',
  ],
  sol: 'A busy bazaar where people of different faiths work together is the effect of trade and towns. The other options describe the opposite: no towns, forced separation or no crafts.',
}));
Q('m_factor_artisan', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Ghulam, an imagined stone-carver of Shilpapur, has carved a window screen for a temple, a pattern for a mosque and a balcony for a merchant\'s house in the same season. What does this show about medieval India?',
  opts: [
    'Artisans worked for many patrons and their skills were shared across traditions',
    'Each artisan could work only for one faith',
    'Carving was forbidden in towns',
    'Artisans had no skills worth sharing',
  ],
  sol: 'One craftsman serving different patrons shows artisans working for many patrons, so skills and designs crossed between traditions. The other options deny this evidence.',
}));
Q('m_composite_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The imagined school magazine of Madhavpur explains composite culture to Class IX readers. Which explanation is correct?',
  opts: [
    'A shared way of life formed when people of different traditions lived together and mingled ideas, arts and languages',
    'A culture in which one tradition forced all others to disappear',
    'A culture that grew in one town and never spread',
    'A culture made only of royal court ceremonies',
  ],
  sol: 'Composite culture means a blend that grew out of contact between traditions. It was not forced on others, was not limited to one town and was not only a court ceremony.',
}));
Q('m_not_factor', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A group project in the imagined Kaveripur History Club lists factors for the growth of composite culture in medieval India. Which entry does NOT belong on the list?',
  opts: [
    'A rule that no two communities may meet or trade',
    'Long living together of people of different faiths',
    'Artisans working for many patrons',
    'The Bhakti and Sufi movements',
  ],
  sol: 'A rule keeping communities apart would block blending, so it is not a factor. Living together, artisans serving many patrons and the Bhakti and Sufi movements all helped composite culture grow.',
}));
Q('ar_urdu', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Urdu is often given as an example of the meeting of languages in medieval India.',
  r: 'Urdu grew from Hindavi, also called Khari Boli, as many Persian, Arabic and Turkish words were taken into it.',
  sol: 'Both are true. The way Urdu grew by taking words from several languages into a language of the region is exactly what makes it an example of languages meeting.',
}));
Q('ar_patron', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Patronage by rulers helped composite culture to grow.',
  r: 'Rulers who gave gifts and honour to artists and scholars of different traditions brought them together at court, where they shared ideas.',
  sol: 'Both are true. Court patronage placed artists of different traditions side by side, so ideas, styles and skills were shared, which explains how patronage helped composite culture.',
}));
Q('tf_one_language', tf({
  t: 1, d: 2, c: 'analysis', ans: false,
  stem: 'True or false? A visitor to the imagined museum at Sundarnagar says that Urdu grew only from Persian, with no link to the speech of the people of the region.',
  sol: 'Urdu grew from Hindavi (Khari Boli), a language of the region, with Persian, Arabic and Turkish words added.',
}));
Q('fb_khari', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In the imagined notes of a music teacher at Rampur, Urdu is said to have grown from Hindavi, also called ___ Boli, with Persian, Arabic and Turkish words added.',
  acc: [['Khari', 'khari']],
  sol: 'Hindavi is also called Khari Boli.',
}));
Q('s_composite_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name any two factors that helped composite culture to grow in medieval India and explain each in a line.',
  model: '**Trade and towns** brought people of different faiths into daily contact in markets. **Patronage by rulers** brought artists and scholars of many traditions to royal courts, where they shared their ideas.',
  sol: 'Two factors with an explanation each.',
  scheme: [['One factor explained', 1], ['A second factor explained', 1]],
}));
Q('s_urdu', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Explain how Urdu grew, as an example of the meeting of languages.',
  model: 'Urdu grew from **Hindavi**, also called **Khari Boli**, the speech of the Delhi region. Many **Persian, Arabic and Turkish words** came into everyday speech and became part of it.',
  sol: 'Hindavi with Persian, Arabic and Turkish words.',
  scheme: [['Grew from Hindavi (Khari Boli)', 1], ['Persian, Arabic and Turkish words added', 1]],
}));
Q('s3_factors', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Heritage Club of Navnagar prepares a chart on composite culture. Give three factors for it, each with one example or reason.',
  model: '1. **Long living together:** neighbours of different faiths shared festivals, food and work.\n2. **Patronage by rulers:** Akbar\'s tolerance gave artists of every tradition a place at court.\n3. **Artisans working for many patrons:** one craftsman carved for a temple, a mosque and a mansion, mixing designs.',
  sol: 'Three factors with reasons.',
  scheme: [['Living together, with reason', 1], ['Patronage, with example', 1], ['Artisans or trade or languages, with reason', 1]],
}));

// ================================================================ t02 Bhakti movement
Q('m_bhakti_ritual', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Savitri, an imagined villager of Gopalpur, says that she cannot afford grand ceremonies but believes that sincere devotion to the one God she loves is enough. Which principle of the Bhakti movement does her belief match?',
  opts: [
    'God can be reached through sincere devotion rather than elaborate ritual',
    'God can be reached only by costly ceremonies',
    'God can be reached only by the rich',
    'God cannot be reached at all',
  ],
  sol: 'Bhakti saints taught that loving, sincere devotion mattered more than elaborate ritual. The other options say the reverse or deny that God can be reached.',
}));
Q('m_bhakti_caste', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'At an imagined evening gathering of devotees in Bhaktipur, a weaver, a potter and a farmer sit in one row and sing together, and nobody is asked about birth or caste. Which Bhakti principle does this scene show?',
  opts: [
    'Rejection of caste distinctions and the equality of all in devotion',
    'The rule that each caste must sing separately',
    'The rule that only priests may sing',
    'The ban on all singing',
  ],
  sol: 'Many Bhakti saints rejected caste distinctions and stressed equality. The other options describe separation, a priestly monopoly or a ban, which Bhakti did not teach.',
}));
Q('m_bhakti_language', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A notebook of the imagined music teacher Mr Rao at Pandharpur records that the saint-poets of the region composed their songs in the Marathi spoken by farmers and traders, not in Sanskrit. Which Bhakti principle does this show?',
  opts: [
    'Use of regional languages rather than Sanskrit',
    'A rule that songs must be written only in Persian',
    'A ban on composing songs',
    'The belief that only Sanskrit scholars may pray',
  ],
  sol: 'Bhakti saints used the regional languages of ordinary people. They did not restrict worship to Sanskrit or Persian, and they did not ban songs.',
}));
Q('m_guru', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Tara, an imagined disciple in a village near Varanasi, walks each morning to her teacher, who guides her in prayer and in right conduct. Which principle of the Bhakti movement does this illustrate?',
  opts: [
    'The importance of the guru',
    'The rejection of all learning',
    'The worship of many rulers',
    'The rule that no one needs guidance',
  ],
  sol: 'Bhakti stressed the importance of the guru as a guide on the path of devotion. The other options contradict this.',
}));
Q('m_kabir', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A label in the imagined Weavers\' Gallery at Kashipur describes a weaver of Varanasi who taught that there is one God, stressed unity among people and criticised empty ritual in every faith. Which Bhakti saint does it describe?',
  opts: ['Kabir', 'Tulsidas', 'Mirabai', 'Chaitanya Mahaprabhu'],
  sol: 'The weaver of Varanasi who stressed one God and unity is Kabir. Tulsidas wrote the Ramcharitmanas, Mirabai is linked with Rajasthan, and Chaitanya with Bengal and Odisha.',
}));
Q('m_nanak', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A quiz card at the imagined Punjab Study Camp reads: born in 1469, the first Guru of the Sikhs, taught one God, equality, honest work and service, and the community kitchen called langar. Whose name belongs on the card?',
  opts: ['Guru Nanak', 'Sankardeva', 'Tukaram', 'Surdas'],
  sol: 'Guru Nanak (1469 to 1539) was the first Sikh Guru, from Punjab. Sankardeva is linked with Assam, Tukaram with Maharashtra and Surdas with devotion to Krishna.',
}));
Q('m_tulsidas', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined librarian of Ayodhya Road School shows a catalogue card for the Ramcharitmanas by Tulsidas and asks in which language it was written. What is the correct answer?',
  opts: ['Awadhi, a language of the region', 'Persian', 'Pali', 'Tamil'],
  sol: 'Tulsidas wrote the Ramcharitmanas in Awadhi, a regional language. It was not written in Persian, Pali or Tamil.',
}));
Q('m_chaitanya', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined music class at Gaurpur, the teacher says that a saint of Bengal and Odisha, who lived about 1486 to 1534, spread devotion through group singing called kirtan. Which saint is it?',
  opts: ['Chaitanya Mahaprabhu', 'Namdev', 'Mirabai', 'Ramananda'],
  sol: 'Chaitanya Mahaprabhu is linked with Bengal and Odisha and with kirtan. Namdev belongs to Maharashtra, Mirabai to Rajasthan and Ramananda to north India.',
}));
Q('ar_regional', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Bhakti saints reached many ordinary people by composing in regional languages.',
  r: 'Every villager in medieval India could understand Sanskrit well, so the saints had no need to use any other language.',
  sol: 'A is true. R is false: Sanskrit was not understood by most ordinary people, which is why the use of regional languages mattered.',
}));
Q('ar_kabir_tulsi', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Kabir was a weaver of Varanasi who stressed one God and unity.',
  r: 'Tulsidas wrote the Ramcharitmanas in the Awadhi language.',
  sol: 'Both are true, but they are separate facts about two different saints. The second does not explain the first.',
}));
Q('fb_langar', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'In the imagined notes of a camp leader, Guru Nanak is remembered for one God, equality, honest work, service and the community kitchen called ___.',
  acc: [['langar', 'Langar']],
  sol: 'The community kitchen is called langar.',
}));
Q('mt_saint_region', match({
  t: 2, d: 3, c: 'recall', marks: 2,
  stem: 'Four saint cards from an imagined exhibition in Bhaktipur have lost their region labels. Match each saint with the region.',
  pairs: [
    ['Guru Nanak', 'Punjab'],
    ['Mirabai', 'Rajasthan'],
    ['Chaitanya Mahaprabhu', 'Bengal and Odisha'],
    ['Sankardeva', 'Assam'],
  ],
  sol: 'Guru Nanak with Punjab, Mirabai with Rajasthan, Chaitanya with Bengal and Odisha, Sankardeva with Assam.',
}));
Q('s_bhakti_equality', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How did the Bhakti saints show a belief in equality? Give two points.',
  model: 'Many saints **rejected caste distinctions** and said that people of every group were equal before God. They welcomed **all** to their gatherings and sang in **regional languages** that everyone understood.',
  sol: 'Rejection of caste distinctions; open gatherings and local languages.',
  scheme: [['Rejected caste distinctions; equality of all', 1], ['Open gatherings or regional languages', 1]],
}));
Q('s_kabir', short({
  t: 2, d: 3, c: 'recall', marks: 2, wl: S2,
  stem: 'Who was Kabir, and what did he teach? Answer in two points.',
  model: 'Kabir was a **weaver of Varanasi**. He taught that there is **one God**, stressed **unity** among all people and criticised empty ritual in every faith.',
  sol: 'Weaver of Varanasi; one God and unity.',
  scheme: [['Weaver of Varanasi', 1], ['One God, unity; criticism of empty ritual', 1]],
}));
Q('s_nanak', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Write two teachings or practices linked with Guru Nanak.',
  model: 'Guru Nanak (1469 to 1539), the **first Sikh Guru** of Punjab, taught **one God** and the **equality** of all. He stressed **honest work and service**, and the community meal of **langar** reflects this.',
  sol: 'One God; equality; honest work; service; langar.',
  scheme: [['One God and equality', 1], ['Honest work, service or langar', 1]],
}));
Q('s_tulsidas_mira', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A student of the imagined Jaipur Heritage Club must tell visitors about Tulsidas and Mirabai in one line each. What should she say?',
  model: '**Tulsidas** wrote the **Ramcharitmanas** in the **Awadhi** language, which ordinary people could follow. **Mirabai** belongs to **Rajasthan** and is remembered in song for devotion to **Krishna**.',
  sol: 'Tulsidas and the Ramcharitmanas; Mirabai and Krishna.',
  scheme: [['Tulsidas: Ramcharitmanas in Awadhi', 1], ['Mirabai: Rajasthan, devotion to Krishna', 1]],
}));
Q('s3_bhakti_principles', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three principles of the Bhakti movement.',
  model: '1. Devotion and love for **one personal God**; God is reached by **sincere devotion** more than by elaborate ritual.\n2. Many saints **rejected caste distinctions** and stressed the **equality** of all.\n3. They used **regional languages**, valued the **guru** and urged pure living and service.',
  sol: 'Devotion; equality; regional languages, guru and service.',
  scheme: [['Devotion to one personal God; sincere devotion over ritual', 1], ['Rejection of caste; equality', 1], ['Regional languages, guru, pure living and service', 1]],
}));
Q('s3_saints_regions', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Mr Rao, an imagined music teacher, draws a chart of saints and their regions. Name three saints and the region linked with each.',
  model: '1. **Guru Nanak:** Punjab, where he taught as the first Sikh Guru.\n2. **Mirabai:** Rajasthan, remembered in song for her devotion to Krishna.\n3. **Namdev and Tukaram:** Maharashtra. Other correct answers include **Chaitanya** (Bengal and Odisha, kirtan) and **Sankardeva** (Assam).',
  sol: 'Three saints with regions.',
  scheme: [['First saint and region', 1], ['Second saint and region', 1], ['Third saint and region', 1]],
}));

// ================================================================ t03 Sufi movement
Q('m_sufi_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Rukhsana, an imagined student of Nizamabad, is asked to describe the Sufis in one sentence. Which sentence is correct?',
  opts: [
    'Sufis were mystics within Islam who stressed love and devotion to God, a simple life and service to humanity',
    'Sufis were rulers who collected taxes from villages',
    'Sufis were traders who dealt only in cloth',
    'Sufis were soldiers who guarded forts',
  ],
  sol: 'Sufis were mystics within Islam who stressed love of God, simple living and service. They were not rulers, cloth traders or soldiers.',
}));
Q('m_khanqah', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined traveller\'s notebook describes a hospice near Ajmerpur where travellers of any faith were given food and rest and where seekers gathered around a teacher. What was such a place called?',
  opts: ['A khanqah', 'A fort', 'A customs house', 'A court of law'],
  sol: 'A Sufi hospice open to all was a khanqah. A fort, a customs house or a court of law has a different purpose.',
}));
Q('m_pir_murid', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Salim, an imagined young man of Dilwalpur, becomes the disciple of a spiritual teacher who guides him in prayer and in service to the poor. In the Sufi tradition, what are the teacher and the disciple called?',
  opts: ['Pir (or sheikh) and murid', 'Raja and praja', 'Guru and sevak of a temple only', 'Qazi and clerk'],
  sol: 'The Sufi teacher is the pir or sheikh and the disciple is the murid. The other pairs name a ruler and subject, a temple helper or a judge and clerk.',
}));
Q('m_silsila', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A wall chart in the imagined Study Centre of Bholapur lists the Chishti and the Suhrawardi among the best known Sufi groups in India. What is such a group called?',
  opts: ['A silsila, or order', 'A samiti, or tribal assembly', 'A sangha, or monastic community', 'A guild of artisans'],
  sol: 'Sufi groups are called silsilas or orders. A samiti is an assembly, a sangha is a Buddhist community and a guild is a group of artisans.',
}));
Q('m_moinuddin', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'A guide at an imagined heritage tour of Ajmer says that a Chishti saint who settled there and died about 1236 is remembered by people of many faiths. Which saint is it?',
  opts: ['Khwaja Moinuddin Chishti', 'Nizamuddin Auliya', 'Amir Khusrau', 'Guru Nanak'],
  sol: 'Khwaja Moinuddin Chishti is linked with Ajmer. Nizamuddin Auliya is linked with Delhi, Amir Khusrau was a poet and musician, and Guru Nanak was the first Sikh Guru.',
}));
Q('m_khusrau', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The imagined music teacher Ms Farida tells her class that a poet and musician (1253 to 1325), a disciple of Nizamuddin Auliya, is linked with the qawwali tradition. Whom does she mean?',
  opts: ['Amir Khusrau', 'Tansen', 'Tukaram', 'Tulsidas'],
  sol: 'Amir Khusrau was a disciple of Nizamuddin Auliya and is linked with qawwali. Tansen was a musician of Akbar\'s court, while Tukaram and Tulsidas were Bhakti saints.',
}));
Q('ar_khanqah', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Sufi teachers allowed only the wealthy to become disciples and to enter their khanqahs.',
  r: 'Khanqahs were open to all who came, and the Sufis stressed service to humanity.',
  sol: 'A is false: Sufi khanqahs were open to all. R is true: it states how the khanqahs worked and what the Sufis taught.',
}));
Q('tf_khusrau_disciple', tf({
  t: 3, d: 3, c: 'application', ans: false,
  stem: 'True or false? A guide at the imagined Ajmer Heritage Walk says that Amir Khusrau was a disciple of Khwaja Moinuddin Chishti.',
  sol: 'Amir Khusrau (1253 to 1325) was a disciple of Nizamuddin Auliya of Delhi, so the statement is false.',
}));
Q('tf_sama', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An imagined classroom chart at Dilwalpur says that sama, a gathering with devotional music, was part of the practice of some Sufi orders.',
  sol: 'Sama, devotional music, was practised in some orders, so the statement is true.',
}));
Q('fb_khanqah', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'In an imagined notebook of a student at Nizamabad, a Sufi hospice open to people of all faiths is called a ___.',
  acc: [['khanqah', 'Khanqah']],
  sol: 'A Sufi hospice is a khanqah.',
}));
Q('mt_sufi_terms', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'An imagined student of Dilwalpur writes four Sufi terms on cards. Match each term with its meaning.',
  pairs: [
    ['Pir', 'A spiritual teacher who guides disciples'],
    ['Murid', 'A disciple of a pir'],
    ['Khanqah', 'A hospice open to all'],
    ['Silsila', 'An order, such as the Chishti'],
  ],
  sol: 'Pir is the teacher, murid is the disciple, khanqah is the hospice and silsila is an order.',
}));
Q('s_sufi_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who were the Sufis? State two of their principles.',
  model: 'The Sufis were **mystics within Islam**. Their stress fell on **love of God**, on living **simply**, and on **serving** other people.',
  sol: 'Mystics within Islam; love of God, simple life, service.',
  scheme: [['Mystics within Islam', 1], ['Two principles', 1]],
}));
Q('s_khanqah', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined visitor to a Sufi hospice near Bholapur sees a pir with his murids and many travellers being fed. Name the hospice and say why it mattered to society.',
  model: 'It is a **khanqah**, where the **pir** guided his **murids**. It mattered because it was **open to all**, so travellers and the poor of every group received food, rest and teaching.',
  sol: 'Khanqah; open to all.',
  scheme: [['Khanqah named; pir and murids', 1], ['Open to all; food, rest and teaching', 1]],
}));
Q('s_khusrau', short({
  t: 3, d: 3, c: 'recall', marks: 2, wl: S2,
  stem: 'Who was Amir Khusrau? Give two facts.',
  model: '**Amir Khusrau** (1253 to 1325) was a **poet and musician** and a **disciple of Nizamuddin Auliya**. He is linked with the **qawwali** tradition and traditionally credited with some musical innovations.',
  sol: 'Poet and musician; disciple of Nizamuddin Auliya; qawwali.',
  scheme: [['Poet and musician; dates', 1], ['Disciple of Nizamuddin Auliya; qawwali', 1]],
}));
Q('s3_sufi_principles', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three principles or practices of the Sufi movement.',
  model: '1. Sufis stressed **love and devotion to God**, a **simple life** and **service to humanity**.\n2. A **pir** or sheikh guided **murids** in orders called **silsilas**, such as the Chishti and the Suhrawardi.\n3. **Khanqahs** were open to all, and some orders held **sama**, a gathering with devotional music.',
  sol: 'Love of God and service; pir and silsilas; khanqahs and sama.',
  scheme: [['Love of God, simple life, service', 1], ['Pir, murids, silsilas', 1], ['Khanqahs open to all; sama', 1]],
}));
Q('s3_sufi_saints', short({
  t: 3, d: 3, c: 'recall', marks: 3, wl: S3,
  stem: 'Name three persons linked with the Sufi tradition in India and say one thing about each.',
  model: '1. **Khwaja Moinuddin Chishti** is linked with **Ajmer** and died about 1236.\n2. **Nizamuddin Auliya** of **Delhi**, a Chishti saint, died in 1325.\n3. **Amir Khusrau** (1253 to 1325) was a poet and musician and his disciple, linked with qawwali.',
  sol: 'Three Sufi figures with a fact each.',
  scheme: [['Moinuddin Chishti with fact', 1], ['Nizamuddin Auliya with fact', 1], ['Amir Khusrau with fact', 1]],
}));
Q('ord_deaths', ord({
  t: [3, 2], d: 4, c: 'understanding', marks: 2,
  stem: 'A timeline panel in the imagined Heritage Hall of Navnagar must be arranged in order of the years in which these four persons died, earliest first. Arrange them.',
  items: ['Khwaja Moinuddin Chishti (about 1236)', 'Nizamuddin Auliya (1325)', 'Chaitanya Mahaprabhu (about 1534)', 'Guru Nanak (1539)'],
  sol: 'Moinuddin Chishti, Nizamuddin Auliya, Chaitanya Mahaprabhu, Guru Nanak.',
}));

// ================================================================ t04 Impact, composite culture, Christian missionaries
Q('m_impact_language', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The imagined librarian of Sahityapur points to shelves of songs and poems in Hindi, Punjabi, Bengali and Marathi written by saints of the Bhakti and Sufi movements. Which impact does this show?',
  opts: [
    'The growth of regional languages and literature',
    'The decline of all literature',
    'The ban on all regional languages',
    'The spread of one language to every region',
  ],
  sol: 'Saints composing in the speech of the people helped regional languages and their literature to grow. The other options say literature declined, was banned or became one language, none of which happened.',
}));
Q('m_dargah', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'During an imagined study visit to a dargah in Ajmerpur, the students see visitors of many faiths sitting together, listening to music and offering respect. Which impact of the Sufi and Bhakti movements does this show?',
  opts: [
    'Shrines and dargahs visited by people of many faiths, showing social harmony',
    'The closing of all shrines to outsiders',
    'A rule that only one community may visit',
    'The end of all devotional music',
  ],
  sol: 'Shrines that people of many faiths visit show the social harmony these movements encouraged. The other options show exclusion or no music, which does not match the scene.',
}));
Q('m_fatehpur', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'In the imagined notes of the Heritage Club of Sikripur, a student describes Fatehpur Sikri: arches, domes and minarets alongside brackets, chhatris and carved motifs. How should the club describe this kind of building?',
  opts: [
    'An example of composite culture in architecture, the Indo-Islamic style',
    'A building with features of one tradition only',
    'A building with no decoration',
    'A building made only of imported parts',
  ],
  sol: 'Arches, domes and minarets blended with Indian brackets, chhatris and carvings make the Indo-Islamic style, a composite form. The other options say it came from one source, had no decoration or was imported.',
}));
Q('m_tansen', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A concert poster at the imagined Sangeet Sabha of Gwaliorpur mentions Tansen at Akbar\'s court as a name in Hindustani classical music. What does the poster show about medieval India?',
  opts: [
    'Court patronage of music helped Hindustani classical traditions to develop',
    'Music was forbidden at every court',
    'Only one kind of music existed',
    'Musicians could not travel between regions',
  ],
  sol: 'Tansen at Akbar\'s court shows patronage that helped Hindustani classical music to grow. The other options deny or limit musical life.',
}));
Q('m_vasco', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'A panel at the imagined Coastal History Gallery says that the Portuguese reached India by sea in 1498 under a navigator. Who was the navigator?',
  opts: ['Vasco da Gama', 'William Carey', 'Francis Xavier', 'Tansen'],
  sol: 'Vasco da Gama led the Portuguese to India in 1498. William Carey came later to Serampore, Francis Xavier reached Goa in 1542, and Tansen was a musician.',
}));
Q('m_xavier', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The imagined timeline of the Goa Study Camp says that a Jesuit priest arrived at Goa in 1542 and about 1556 a printing press was set up there. Who is the priest?',
  opts: ['St Francis Xavier', 'William Carey', 'Vasco da Gama', 'Amir Khusrau'],
  sol: 'St Francis Xavier came to Goa in 1542. William Carey worked at Serampore from 1800, Vasco da Gama arrived in 1498, and Amir Khusrau was a Sufi poet.',
}));
Q('m_carey', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A panel in the imagined Printing Museum of Hoogliabad says that, from 1800, a missionary at Serampore set up printing presses and translated texts into Indian languages including Bengali. Who is the missionary?',
  opts: ['William Carey', 'Francis Xavier', 'Vasco da Gama', 'Tulsidas'],
  sol: 'William Carey worked at Serampore from 1800. Francis Xavier came to Goa in 1542, Vasco da Gama reached India in 1498, and Tulsidas was a Bhakti poet.',
}));
Q('m_missionary_scope', mcq({
  t: 4, d: 4, c: 'evaluation',
  stem: 'Three students of the imagined Class IX-C of Serampore Road School list the contribution of Christian missionaries. Which list best fits the syllabus topic?',
  opts: [
    'Schools and colleges, printing presses, translations, hospitals and orphanages',
    'Building forts and collecting taxes',
    'Composing Sufi poetry for khanqahs',
    'Founding the Bhakti movement in Bengal',
  ],
  sol: 'Missionaries are remembered for education, printing, translation and social service. Forts and taxes belong to rulers, Sufi poetry to Sufis and the Bhakti movement to Bhakti saints.',
}));
Q('ar_press', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A printing press at Serampore, from 1800, printed translations into Bengali and other Indian languages.',
  r: 'The Portuguese reached India in 1498 under Vasco da Gama.',
  sol: 'Both are true, but the arrival of the Portuguese in 1498 does not explain the work of the Serampore press, which was set up much later.',
}));
Q('tf_missionary_schools', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A panel in the imagined Education Museum of Hoogliabad says that missionaries founded schools and colleges and also hospitals and orphanages.',
  sol: 'Missionaries set up schools, colleges, hospitals and orphanages, so the statement is true.',
}));
Q('fb_goa', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'On the imagined Goa Study Camp timeline, St Francis Xavier came to ___ in 1542.',
  acc: [['Goa', 'goa']],
  sol: 'Francis Xavier came to Goa in 1542.',
}));
Q('mt_composite_examples', match({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'An imagined student of Sikripur sorts examples of composite culture on a board. Match each example with the field it belongs to.',
  pairs: [
    ['Fatehpur Sikri', 'Architecture: Indo-Islamic style'],
    ['Tansen at Akbar\'s court', 'Music: Hindustani classical tradition'],
    ['Mughal miniatures', 'Painting: Persian and Indian styles blended'],
    ['Urdu', 'Language: Hindavi with Persian, Arabic and Turkish words'],
  ],
  sol: 'Fatehpur Sikri with architecture, Tansen with music, miniatures with painting, Urdu with language.',
}));
Q('mt_missionary_events', match({
  t: 4, d: 3, c: 'recall', marks: 2,
  stem: 'The imagined timeline of the Goa Study Camp has lost its dates. Match each event with its year.',
  pairs: [
    ['Portuguese reach India', '1498'],
    ['Francis Xavier comes to Goa', '1542'],
    ['A printing press set up at Goa', 'About 1556'],
    ['William Carey at Serampore', 'From 1800'],
  ],
  sol: 'The Portuguese in 1498, Xavier in 1542, the Goa press about 1556, Carey from 1800.',
}));
Q('ord_missionaries', ord({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these events from the imagined Goa Study Camp timeline in the order in which they happened, earliest first.',
  items: ['The Portuguese reach India', 'Francis Xavier comes to Goa', 'Jesuit priests visit Akbar\'s court', 'William Carey sets up presses at Serampore'],
  sol: 'The Portuguese in 1498, Xavier in 1542, the Jesuits at Akbar\'s court about 1580, Carey from 1800.',
}));
Q('s_dargah', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'People of many faiths visit a dargah in the imagined town of Ajmerpur and listen to music there. What does this show about the impact of the Sufi movement? Answer in two points.',
  model: 'It shows the **social harmony** the Sufis encouraged, since people of **many faiths** gathered at one shrine. It also shows the place of **devotional music**, such as qawwali, in shared worship.',
  sol: 'Social harmony; devotional music.',
  scheme: [['Social harmony; people of many faiths', 1], ['Devotional music', 1]],
}));
Q('s_impact_music', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name three forms of devotional music that grew out of the Bhakti and Sufi movements.',
  model: '**Kirtan** and **bhajan** came from the Bhakti movement, and **qawwali** from the Sufi tradition. All three use music and song to express devotion in a form that ordinary people could join.',
  sol: 'Kirtan, bhajan, qawwali.',
  scheme: [['Kirtan and bhajan', 1], ['Qawwali; link with devotion', 1]],
}));
Q('s_serampore', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A student at the imagined Hoogliabad Museum reads about Serampore and asks how William Carey helped the spread of printed books. What is the answer?',
  model: 'From 1800 **William Carey** worked at **Serampore**, where printing presses were set up. Texts were **translated** into Indian languages, including **Bengali**, and printed for more readers.',
  sol: 'Presses at Serampore; translations including Bengali.',
  scheme: [['Serampore from 1800; presses', 1], ['Translations into Indian languages including Bengali', 1]],
}));
Q('s3_impact', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three effects of the Bhakti and Sufi movements on society and religion.',
  model: '1. They encouraged **social harmony** and a message of **equality**.\n2. Saints composing in local speech helped **regional languages and literature** such as Hindi, Punjabi, Bengali and Marathi to grow.\n3. They spread **simpler forms of worship**, devotional music and **shrines** visited by people of many faiths.',
  sol: 'Harmony and equality; regional languages; simpler worship and shrines.',
  scheme: [['Harmony and equality', 1], ['Regional languages and literature', 1], ['Simpler worship, music or shrines', 1]],
}));
Q('s3_architecture', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The imagined Heritage Club of Sikripur is asked why Fatehpur Sikri shows composite culture. Give three points.',
  model: '1. It combines **arches, domes and minarets** with Indian features.\n2. These Indian features include **brackets, chhatris and carved motifs**.\n3. Together they make the **Indo-Islamic style**, a blend of traditions, and Fatehpur Sikri is a good example.',
  sol: 'Arches, domes, minarets with brackets, chhatris, carvings; Indo-Islamic style.',
  scheme: [['Arches, domes, minarets', 1], ['Brackets, chhatris, carved motifs', 1], ['Indo-Islamic style as a blend', 1]],
}));
Q('s3_missionary_edu', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three contributions of Christian missionaries in medieval and early modern India to education and social service.',
  model: '1. They set up **printing presses**, at Goa about 1556 and later at Serampore, and translated texts into Indian languages.\n2. They founded **schools and colleges**.\n3. They opened **hospitals and orphanages**, and some missionaries spoke against social evils of the time.',
  sol: 'Presses and translations; schools and colleges; hospitals and orphanages.',
  scheme: [['Printing presses and translations', 1], ['Schools and colleges', 1], ['Hospitals, orphanages, social service', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_factors', long({
  t: 1, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Heritage Club of the imagined town of Navnagar prepares an exhibition titled "Many Threads, One Cloth" on composite culture.\n\n(i) State three factors responsible for the growth of a composite culture in medieval India. **[3]**\n(ii) Explain how the meeting of languages and the work of artisans helped it. **[3]**\n(iii) Describe the role of rulers, with the example of Akbar, and of the Bhakti and Sufi movements. **[4]**',
  model: '(i) **Long living together** of people of different faiths, **trade and towns**, and **patronage by rulers** all helped composite culture to grow, because each of them brought people of different traditions into regular contact with one another.\n\n(ii) Languages mixed: **Urdu** grew from Hindavi with Persian, Arabic and Turkish words. **Artisans** worked for many patrons, so designs and skills passed between traditions, and the buildings, cloth and carvings they made often blended the tastes of several communities.\n\n(iii) Rulers gave gifts and honour to artists and scholars of every tradition; **Akbar\'s policy of tolerance** is a well known case. The **Bhakti and Sufi movements** taught love, devotion and equality, and brought people of different groups closer.',
  sol: 'Three factors; languages and artisans; rulers and the two movements.',
  scheme: [['(i) Three factors', 3], ['(ii) Meeting of languages', 1.5], ['(ii) Artisans', 1.5], ['(iii) Role of rulers, with Akbar', 2], ['(iii) Bhakti and Sufi movements', 2]],
}));
Q('l_bhakti', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'A teacher at the imagined Bhaktipur Study Camp asks Class IX to explain the Bhakti movement.\n\n(i) State three principles of the Bhakti movement. **[3]**\n(ii) Name three Bhakti saints and the region linked with each. **[3]**\n(iii) Explain the teachings of Kabir and of Guru Nanak. **[4]**',
  model: '(i) Bhakti stressed **devotion to one personal God**, the use of **regional languages** and the **equality** of all, with many saints rejecting caste distinctions and asking people to live a pure life of service to others.\n\n(ii) **Guru Nanak** is linked with Punjab, **Mirabai** with Rajasthan and **Chaitanya Mahaprabhu** with Bengal and Odisha. **Namdev**, **Tukaram** and **Sankardeva** are linked with Maharashtra and Assam.\n\n(iii) **Kabir**, a weaver of Varanasi, stressed **one God** and unity and criticised empty ritual in every faith, speaking in the plain speech of the people. **Guru Nanak** (1469 to 1539), the first Sikh Guru, taught **one God**, equality, honest work and service, and the langar, a community kitchen open to all, reflects this.',
  sol: 'Principles; saints and regions; Kabir and Guru Nanak.',
  scheme: [['(i) Three principles', 3], ['(ii) Three saints with regions', 3], ['(iii) Kabir', 2], ['(iii) Guru Nanak', 2]],
}));
Q('l_sufi', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The imagined Study Centre of Bholapur holds a lecture on the Sufi movement in India.\n\n(i) State three principles of Sufism. **[3]**\n(ii) Explain the terms pir, murid, khanqah and sama. **[3]**\n(iii) Name two Sufi silsilas and two Sufi saints with a fact about each. **[4]**',
  model: '(i) Sufis, mystics within Islam, stressed **love and devotion to God**, a **simple life** and **service to humanity**, seeing these as the way to come close to God.\n\n(ii) A **pir** or sheikh is a spiritual teacher and a **murid** is his disciple. A **khanqah** is a hospice open to all, and **sama** is a gathering with devotional music practised in some orders, where listeners joined in the music of devotion.\n\n(iii) The **Chishti** and the **Suhrawardi** are among the best known silsilas, or orders. **Khwaja Moinuddin Chishti** is linked with Ajmer and died about 1236, and **Nizamuddin Auliya** of Delhi died in 1325. Both are remembered by people of many faiths, and the poet and musician Amir Khusrau was a disciple of Nizamuddin Auliya.',
  sol: 'Principles; terms; silsilas and saints.',
  scheme: [['(i) Three principles', 3], ['(ii) Pir and murid', 1.5], ['(ii) Khanqah and sama', 1.5], ['(iii) Two silsilas', 1], ['(iii) Two saints with facts', 3]],
}));
Q('l_compare_bs', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Two student groups in the imagined school at Dilwalpur prepare a chart of the Bhakti and the Sufi movements. They must treat both with equal respect.\n\n(i) Give three similarities between the two movements. **[3]**\n(ii) Give three differences, such as in terms and practices. **[3]**\n(iii) Explain how both helped a villager of the time, without ranking one above the other. **[4]**',
  model: '(i) Both stressed **love and devotion to God**, a **simple life and service**, and a **message of equality**; both also used music and local speech.\n\n(ii) The Bhakti teacher is the **guru**, the Sufi teacher is the **pir** with **murids**. Bhakti songs are **kirtan and bhajan**, Sufi gatherings include **sama and qawwali**. Sufis were organised in **silsilas** and met in **khanqahs**, while Bhakti saints are linked with many regions.\n\n(iii) A villager could join either in a language he understood, be received without regard to birth, and find comfort in simple worship and song. Each movement gave such help in its own way, so both are studied on their merits.',
  sol: 'Similarities; differences; help to a villager.',
  scheme: [['(i) Three similarities', 3], ['(ii) Three differences', 3], ['(iii) Help to a villager', 2], ['(iii) Equal respect, no ranking', 2]],
}));
Q('l_impact', long({
  t: 4, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The imagined Sahityapur Literary Society holds a talk on what the Bhakti and Sufi movements left behind.\n\n(i) Explain their impact on social harmony and equality. **[3]**\n(ii) Explain their impact on regional languages and literature. **[3]**\n(iii) Describe their impact on devotional music, forms of worship and shrines. **[4]**',
  model: '(i) Both movements taught love and service and rejected narrow divisions, so people of different groups learned to **respect one another** and the idea of **equality** spread, since a person was judged by sincere devotion and conduct and not by birth.\n\n(ii) Saints composed in the speech of the people, so **Hindi, Punjabi, Bengali, Marathi** and other languages gained rich literature, and ordinary people could read and hear devotional writing in their own speech, which enriched the languages themselves.\n\n(iii) **Kirtan, bhajan and qawwali** developed as devotional music. Worship became **simpler**, with less stress on elaborate ceremony, and **shrines and dargahs** were visited by people of many faiths, becoming places of peace and shared respect.',
  sol: 'Harmony and equality; languages; music, worship and shrines.',
  scheme: [['(i) Harmony', 1.5], ['(i) Equality', 1.5], ['(ii) Regional languages named', 1.5], ['(ii) Literature and reach', 1.5], ['(iii) Devotional music', 1.5], ['(iii) Simpler worship', 1], ['(iii) Shrines and dargahs', 1.5]],
}));
Q('l_composite', long({
  t: 4, d: 4, c: 'application', marks: 10, wl: L10,
  stem: 'The imagined Heritage Club of Sikripur walks through Fatehpur Sikri and then attends a concert and an art class.\n\n(i) Explain how Fatehpur Sikri shows composite culture in architecture. **[3]**\n(ii) Give one example each from music and from painting. **[3]**\n(iii) Explain how Urdu and the Persian translations of Sanskrit works show composite culture in language and literature. **[4]**',
  model: '(i) Fatehpur Sikri joins **arches, domes and minarets** with Indian features such as **brackets, chhatris and carved motifs**. This is the **Indo-Islamic style**, a blend of building traditions that grew from the work of builders and carvers of different backgrounds.\n\n(ii) In music, **Tansen** at Akbar\'s court shows the growth of **Hindustani classical** traditions. In painting, **Mughal miniatures** blended **Persian and Indian** styles.\n\n(iii) **Urdu** grew from Hindavi with Persian, Arabic and Turkish words, so it joins several traditions. **Persian translations of Sanskrit works** carried ideas and stories from one literary tradition to another and widened the readers of both; such work also let readers of one language learn from the literature of another.',
  sol: 'Architecture; music and painting; Urdu and translations.',
  scheme: [['(i) Features from both traditions', 2], ['(i) Indo-Islamic style', 1], ['(ii) Music example', 1.5], ['(ii) Painting example', 1.5], ['(iii) Urdu', 2], ['(iii) Persian translations of Sanskrit works', 2]],
}));
Q('l_missionaries', long({
  t: 4, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The imagined Goa Study Camp prepares a timeline and a poster on Christian missionaries in India.\n\n(i) State the events of 1498, 1542 and about 1556. **[3]**\n(ii) Describe the visit of the Jesuits to Akbar\'s court and the work of William Carey at Serampore. **[3]**\n(iii) Explain the contribution of missionaries to education and social service. **[4]**',
  model: '(i) In **1498** the Portuguese reached India under **Vasco da Gama**. **St Francis Xavier** came to **Goa** in **1542**, and about **1556** a **printing press** was set up in Goa, an early press in India.\n\n(ii) Jesuit priests visited **Akbar\'s court** about **1580**. From **1800** **William Carey** worked at **Serampore**, set up printing presses and translated texts into Indian languages including Bengali.\n\n(iii) Missionaries founded **schools and colleges**, **hospitals and orphanages**, and brought printed books and translations to more readers, which helped learning to spread beyond a small circle. Some also spoke against social evils of the time, so their work reached beyond the classroom into daily life.',
  sol: 'Dates; Jesuits and Carey; education and social service.',
  scheme: [['(i) 1498, Vasco da Gama', 1], ['(i) 1542, Xavier at Goa', 1], ['(i) About 1556, press at Goa', 1], ['(ii) Jesuits at Akbar\'s court', 1.5], ['(ii) Carey at Serampore', 1.5], ['(iii) Education', 2], ['(iii) Social service', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_walk', source({
  t: [1, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined notes of a school heritage walk and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of the Heritage Club of the imagined Vidyapur School, from a walk through the old quarter of the imagined town of Sikripur**\n\nStop 1: The gateway has a pointed arch, a great dome and two tall minarets. Above its roof stand small domed pavilions on pillars, and the walls carry carved patterns of lotus and leaf.\n\nStop 2: In the bazaar lane, a stone-carver and a cloth-dyer of different faiths share a workshop wall. The guide says the carver worked on a temple, a mosque and a merchant\'s house in a single year.\n\nStop 3: In the library hall, our teacher shows a manuscript in which Persian words stand among everyday Hindavi speech.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the style of architecture described at Stop 1.', model: 'The **Indo-Islamic** style, a composite style.', sol: 'Indo-Islamic style.', scheme: [['Indo-Islamic style', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which factor of composite culture does the carver at Stop 2 illustrate?', model: '**Artisans working for many patrons.**', sol: 'Artisans for many patrons.', scheme: [['Artisans for many patrons', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name two Indian features at Stop 1 and say what they show.', model: 'The **chhatris** (domed pavilions on pillars) and the **carved lotus and leaf patterns** are Indian features. Together with the arch, dome and minarets they show a **blend of traditions**.', sol: 'Chhatris and carved motifs; a blend.', scheme: [['Two Indian features named', 1], ['They show a blend of traditions', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does the manuscript at Stop 3 show about language, and how did Urdu grow?', model: 'It shows the **meeting of languages**. **Urdu** grew from **Hindavi (Khari Boli)** with Persian, Arabic and Turkish words added.', sol: 'Meeting of languages; Urdu from Hindavi.', scheme: [['Meeting of languages', 1], ['Urdu from Hindavi with other words', 1]] }),
    ]),
  ],
}));
Q('sb_music_notes', source({
  t: [2, 3, 4], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined music teacher's notes and answer the questions that follow. ${IMAG}`,
  passage: '**From the notebook of Ms Farida, an imagined music teacher at the imagined Sangeet Vidyalaya, Rampur**\n\nLesson 3: Today we looked at three kinds of group singing. In the first, devotees sit together and sing the name of God in turn, as taught by a saint of Bengal. In the second, simple songs in the language of the village are sung at fairs and homes, and they came from Bhakti saints. In the third, a gathering at a Sufi shrine includes songs of devotion, and the poet and musician Amir Khusrau is linked with its tradition.\n\nLesson 4: A student asked whether these songs belong to one community only. I said that listeners of many faiths gather at such places and that each tradition may be studied on its own merits.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the kind of group singing linked with the saint of Bengal in the first kind.', model: '**Kirtan**, spread by Chaitanya Mahaprabhu.', sol: 'Kirtan.', scheme: [['Kirtan', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the tradition of music linked with Amir Khusrau in the third kind.', model: '**Qawwali.**', sol: 'Qawwali.', scheme: [['Qawwali', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): What does Lesson 4 show about the impact of the Bhakti and Sufi movements?', model: 'It shows **social harmony**: listeners of **many faiths** gather where devotional music is sung, and each tradition is respected.', sol: 'Social harmony; many faiths.', scheme: [['Social harmony', 1], ['Listeners of many faiths', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the second kind of songs reached many ordinary people.', model: 'They were sung in the **language of the village**, which ordinary people understood. The Bhakti saints used **regional languages** instead of Sanskrit.', sol: 'Regional languages understood by all.', scheme: [['Language of the village', 1], ['Regional languages instead of Sanskrit', 1]] }),
    ]),
  ],
}));
Q('sb_panel', source({
  t: [4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined museum panel and answer the questions that follow. ${IMAG}`,
  passage: '**Panel in the imagined Hoogliabad Museum of Education and Printing**\n\nPanel 1: In 1498 sailors from Portugal reached India by sea. In 1542 a Jesuit priest came to Goa. About 1556 a printing press was set up there.\n\nPanel 2: About 1580 Jesuit priests visited the court of the Mughal emperor Akbar.\n\nPanel 3: From 1800 a missionary at Serampore set up presses. Texts were translated into Indian languages, and later schools and colleges were opened. Other missionaries opened hospitals and orphanages.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Who is the Jesuit priest who came to Goa in 1542?', model: '**St Francis Xavier.**', sol: 'St Francis Xavier.', scheme: [['Francis Xavier', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the missionary and the place described in Panel 3.', model: '**William Carey** at **Serampore**.', sol: 'William Carey; Serampore.', scheme: [['Carey and Serampore', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name two kinds of service to society mentioned on Panel 3 apart from printing.', model: 'The panel mentions **schools and colleges** (education), and **hospitals and orphanages** (social service).', sol: 'Education; hospitals and orphanages.', scheme: [['Schools and colleges', 1], ['Hospitals and orphanages', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How does Panel 2 add to the story of cultural contact in medieval India?', model: 'It shows that Jesuit priests visited **Akbar\'s court** about **1580**, adding another contact between traditions at a ruler\'s court.', sol: 'Jesuits at Akbar\'s court; cultural contact.', scheme: [['Jesuits at Akbar\'s court about 1580', 1], ['Contact between traditions', 1]] }),
    ]),
  ],
}));
