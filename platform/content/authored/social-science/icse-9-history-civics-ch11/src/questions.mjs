// ICSE 9 History & Civics, ch11 Medieval India: The Cholas — question bank.
// Every temple-guide booklet, record keeper's note and set of school notes below is imagined by SOYL and labelled as
// imagined; no textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No inscription
// is quoted: the Uttaramerur rules and the named grants are paraphrased only.
// Dates are the commonly taught approximate ones (books differ): Vijayalaya about 850 CE; Parantaka I about 907-955;
// Rajaraja I about 985-1014; Rajendra I about 1014-1044; Kulottunga I about 1070-1120; Uttaramerur inscriptions about
// 919 and 921 CE; Brihadishwara Temple completed about 1010 CE, vimana about 66 m; Srivijaya expedition about 1025 CE;
// Great Living Chola Temples listed 1987, extended 2004.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
export const REIGNS = [
  ['Parantaka I', 907, 955],
  ['Rajaraja I', 985, 1014],
  ['Rajendra I', 1014, 1044],
  ['Kulottunga I', 1070, 1120],
];
assert.equal(REIGNS[1][2], REIGNS[2][1]);
const T0 = 850;
const T1 = 1120;

/** The Chola kings on one time line, drawn roughly to scale (years CE, approximate). */
export function kingsFigure(alt, caption) {
  const s = new Svg(720, 245);
  const px = 640 / (T1 - T0);
  const X = (yr) => 40 + (yr - T0) * px;
  // Vijayalaya: a marker; Aditya I: a dashed bar that ends where Parantaka I begins.
  s.dot(X(850), 117, 7, 'accent');
  s.line(X(850), 51, X(850), 110, { sw: 1, color: 'muted', dash: true });
  s.text(20, 40, 'Vijayalaya (about 850)', { size: 14, bold: true, anchor: 'start' });
  s.rect(X(850) + 10, 100, X(907) - X(850) - 10, 34, { rx: 6, fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.8, dash: true });
  const ax = (X(850) + 10 + X(907)) / 2;
  s.line(ax, 81, ax, 100, { sw: 1, color: 'muted', dash: true });
  s.text(ax, 70, 'Aditya I', { size: 14, bold: true });
  s.line(ax, 134, ax, 173, { sw: 1, color: 'muted', dash: true });
  s.text(ax, 184, 'ends about 907', { size: 12 });
  const cols = ['accent', 'green', 'blue', 'accent'];
  const up = [70, 40, 70, 40];
  const down = [158, 158, 184, 158];
  REIGNS.forEach(([name, a, b], i) => {
    const x = X(a);
    const w = (b - a) * px;
    const cx = x + w / 2;
    s.rect(x, 100, w, 34, { rx: 6, fill: cols[i], fillOpacity: 0.2, color: cols[i], sw: 1.8 });
    s.line(cx, up[i] + 11, cx, 100, { sw: 1, color: 'muted', dash: true });
    s.text(cx, up[i], name, { size: 14, bold: true });
    s.line(cx, 134, cx, down[i] - 11, { sw: 1, color: 'muted', dash: true });
    s.text(cx, down[i], `${a} to ${b}`, { size: 12 });
  });
  s.text((X(955) + X(985)) / 2, 117, 'others', { size: 11, muted: true });
  s.text((X(1044) + X(1070)) / 2, 117, 'others', { size: 11, muted: true });
  s.text(360, 226, 'Drawn roughly to scale. All years are CE and approximate; books differ by a few years', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Chart of Chola administration. */
export function adminFigure(alt, caption) {
  const s = new Svg(720, 410);
  s.rect(230, 10, 260, 40, { rx: 8, fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.8 });
  s.text(360, 30, 'The king', { size: 15, bold: true });
  s.line(360, 50, 360, 64, { sw: 1.6 });
  s.rect(110, 64, 500, 56, { rx: 8, fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.8 });
  s.text(360, 83, 'Ministers and officials', { size: 15, bold: true });
  s.text(360, 105, 'Help the king and carry out his orders', { size: 13 });
  const cols = [
    ['Mandalam (province)', 'accent', ['Often under a prince', 'or a viceroy']],
    ['Valanadu or nadu', 'green', ['A district made up', 'of many villages']],
    ['Village', 'blue', ['Run through local', 'assemblies']],
  ];
  cols.forEach(([title, col, lines], i) => {
    const x = 15 + i * 245;
    s.line(360, 120, x + 100, 140, { sw: 1.4, color: 'muted' });
    s.rect(x, 140, 200, 104, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + 100, 163, title, { size: 15, bold: true });
    s.line(x + 14, 178, x + 186, 178, { sw: 1, color: col });
    lines.forEach((t, k) => s.text(x + 100, 203 + k * 22, t, { size: 13 }));
    if (i < 2) s.arrow(x + 202, 192, x + 243, 192, { sw: 1.4, color: 'muted' });
  });
  const boxes = [
    ['Ur', 'Landholders of ordinary villages', 'accent'],
    ['Sabha', 'Brahmadeya villages', 'green'],
    ['Nagaram', 'Merchants in trade centres', 'blue'],
  ];
  boxes.forEach(([t, d, col], i) => {
    const x = 15 + i * 245;
    s.line(505, 244, x + 100, 276, { sw: 1.2, color: 'muted' });
    s.rect(x, 276, 210, 62, { rx: 8, fill: col, fillOpacity: 0.12, color: col, sw: 1.6 });
    s.text(x + 105, 297, t, { size: 15, bold: true });
    s.text(x + 105, 320, d, { size: 12 });
  });
  s.text(360, 362, 'Committees (variyams) looked after tanks, gardens, temples and justice', { size: 13 });
  s.text(360, 392, 'Simplified chart; names and powers varied by place and period', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic plan and side view of a Chola Dravida temple. */
export function templeFigure(alt, caption) {
  const s = new Svg(720, 360);
  s.text(180, 22, 'Plan (top view)', { size: 15, bold: true });
  s.rect(20, 45, 320, 240, { rx: 4, color: 'muted', sw: 1.6, dash: true });
  s.rect(32, 135, 62, 70, { rx: 2, fill: 'green', fillOpacity: 0.16, color: 'green', sw: 1.8 });
  s.text(63, 170, 'Gopuram', { size: 12, bold: true });
  s.rect(118, 140, 96, 60, { rx: 2, fill: 'blue', fillOpacity: 0.14, color: 'blue', sw: 1.8 });
  s.text(166, 170, 'Mandapa', { size: 13, bold: true });
  s.rect(238, 118, 90, 104, { rx: 2, fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 2 });
  s.text(283, 160, 'Vimana', { size: 13, bold: true });
  s.text(283, 180, 'above sanctum', { size: 11 });
  s.arrow(52, 105, 52, 128, { sw: 1.4, color: 'muted' });
  s.text(52, 94, 'Entrance', { size: 11, muted: true });
  s.text(180, 308, 'Enclosure wall (dashed)', { size: 13 });
  s.text(540, 22, 'Side view', { size: 15, bold: true });
  s.line(375, 285, 705, 285, { sw: 1.8 });
  s.rect(390, 235, 80, 50, { rx: 2, fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.8 });
  s.polygon([[395, 235], [465, 235], [452, 175], [408, 175]], { fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.8 });
  s.rect(498, 248, 78, 37, { rx: 2, fill: 'blue', fillOpacity: 0.14, color: 'blue', sw: 1.8 });
  [514, 537, 560].forEach((x) => s.line(x, 255, x, 285, { sw: 1.2, color: 'blue' }));
  s.rect(600, 235, 92, 50, { rx: 2, fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.8 });
  s.polygon([[606, 235], [686, 235], [672, 195], [620, 195]], { fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.8 });
  s.polygon([[620, 195], [672, 195], [662, 158], [630, 158]], { fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.8 });
  s.polygon([[630, 158], [662, 158], [654, 122], [638, 122]], { fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.8 });
  s.dot(646, 112, 6, 'accent');
  s.text(646, 92, 'Tallest part', { size: 12, muted: true });
  s.text(430, 302, 'Gopuram', { size: 13, bold: true });
  s.text(537, 302, 'Mandapa', { size: 13, bold: true });
  s.text(646, 302, 'Vimana', { size: 13, bold: true });
  s.text(430, 320, 'gateway tower', { size: 11, muted: true });
  s.text(537, 320, 'pillared hall', { size: 11, muted: true });
  s.text(646, 320, 'tower over sanctum', { size: 11, muted: true });
  s.text(360, 348, 'Schematic, not to scale. A simple sketch of the main parts, not the plan of any one temple', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** The six steps of the lost-wax method. */
export function waxFigure(alt, caption) {
  const s = new Svg(720, 250);
  const steps = [
    ['1. Wax model', 'Shape and detail in wax', 'accent'],
    ['2. Clay coating', 'Clay is laid over the wax', 'green'],
    ['3. Heating', 'The wax melts and runs out', 'blue'],
    ['4. Pouring', 'Molten metal fills the space', 'accent'],
    ['5. Breaking the mould', 'The clay is chipped away', 'green'],
    ['6. Finishing', 'Cleaning and fine detail', 'blue'],
  ];
  steps.forEach(([t, d, col], i) => {
    const x = 15 + (i % 3) * 240;
    const y = i < 3 ? 15 : 135;
    s.rect(x, y, 210, 70, { rx: 10, fill: col, fillOpacity: 0.14, color: col, sw: 1.8 });
    s.text(x + 105, y + 25, t, { size: 15, bold: true });
    s.text(x + 105, y + 50, d, { size: 13 });
    if (i % 3 < 2) s.arrow(x + 212, y + 35, x + 238, y + 35, { sw: 1.5, color: 'muted' });
  });
  s.line(600, 85, 600, 110, { sw: 1.5, color: 'muted' });
  s.line(600, 110, 120, 110, { sw: 1.5, color: 'muted' });
  s.arrow(120, 110, 120, 134, { sw: 1.5, color: 'muted' });
  s.text(360, 228, 'Simplified sequence of the lost-wax (cire perdue) method', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Sources
Q('m_plates_example', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A student of the imagined Class IX at Gyan Jyoti School is asked to name one set of Chola copper-plate grants for a wall chart. Which entry is correct?',
  opts: ['The Anbil plates', 'The Allahabad Pillar Inscription', 'The Prayag Prashasti', 'The Kalinga edicts'],
  sol: 'The Anbil plates, with the Thiruvalangadu and Larger Leiden plates, are examples of Chola copper-plate grants. The other three belong to the Gupta and Mauryan periods.',
}));
Q('m_grant_praise', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In the imagined Vellaru Heritage Centre, a card says that a king\'s copper-plate grant of a village begins with long praise of his family and victories. How should a student use this grant as a source?',
  opts: [
    'Treat the gift of the village as useful evidence but read the praise with care and compare it with other sources',
    'Accept every claim of victory as proved, because metal does not change',
    'Ignore the grant, because praise makes it useless',
    'Use it only to learn the colour of the metal',
  ],
  sol: 'A grant is a valuable record of gifts, places and rulers, but praise of a king is meant to please, so it is checked against other evidence. It is neither proof of every claim nor useless.',
}));
Q('m_uttar_where', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A page of the imagined Chola Trail booklet says the Uttaramerur inscriptions, from the reign of Parantaka I, are found in the present-day district of:',
  opts: ['Kanchipuram', 'Madurai', 'Kanyakumari', 'Nilgiris'],
  sol: 'Uttaramerur lies in present-day Kanchipuram district. The other districts are in the same part of the country but are not where these inscriptions are found.',
}));
Q('m_kudavolai', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined notes of a village record keeper named Kanagan, each eligible name was written on a palm leaf, the leaves were placed in a pot and one was drawn for each ward. What was this method of choosing members called?',
  opts: ['Kudavolai', 'Variyam', 'Nagaram', 'Brahmadeya'],
  sol: 'Drawing names written on palm leaves from a pot is the kudavolai system described in the Uttaramerur inscriptions. A variyam is a committee, a nagaram a merchants\' assembly and a brahmadeya a village granted to Brahmanas.',
}));
Q('m_disqualify', mcq({
  t: [1, 3], d: 4, c: 'analysis',
  stem: 'Ilango of the imagined village of Mullaikudi owns a house and a plot of land, is within the age range and knows the work of administration. Under rules like those at Uttaramerur, which further fact would still keep him out of the sabha?',
  opts: [
    'He earlier held a committee post and never submitted its accounts',
    'He owns two plots of land instead of one',
    'He lives in a house with a tiled roof',
    'He learned administration from his grandfather',
  ],
  sol: 'Rules of this kind barred people who had failed to give accounts of an earlier office, as commonly taught. Owning more land, the roof of a house or the source of one\'s learning are not disqualifications.',
}));
Q('m_brihad_height', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The imagined Thanjavur Visitors\' Guide says that the vimana of the Brihadishwara Temple rises to about how many metres?',
  opts: ['About 66 metres', 'About 16 metres', 'About 6 metres', 'About 166 metres'],
  sol: 'The vimana is commonly given as about 66 metres high. The other figures are far too small or too large for the tower.',
}));
Q('m_brihad_source', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'During an imagined debate, a student says, "The Brihadishwara Temple is only a place of worship, so it tells us nothing about the Chola state." Which reply is the best?',
  opts: [
    'The inscriptions on its walls and its size and planning also show the king\'s power, gifts and resources',
    'The student is right, because buildings never help historians',
    'It tells us only the weather of the region',
    'It tells us only about the Gupta age',
  ],
  sol: 'Inscriptions record gifts and events, and a building on this scale reflects royal power and resources, so it is a source for politics as well as religion. The other replies deny this or are unrelated.',
}));
Q('m_whs', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'A quiz card in the imagined Chola Heritage Club asks which three temples make up the World Heritage Site called the Great Living Chola Temples. Which answer is correct?',
  opts: [
    'Thanjavur, Gangaikondacholapuram and Darasuram',
    'Thanjavur, Konark and Hampi',
    'Gangaikondacholapuram, Khajuraho and Deogarh',
    'Darasuram, Madurai and Mamallapuram',
  ],
  sol: 'The site includes the Brihadishwara Temple at Thanjavur, the temple at Gangaikondacholapuram and the Airavatesvara temple at Darasuram. The other sets mix in monuments of other places and periods.',
}));
Q('ar_inscr', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Chola inscriptions are valuable sources for historians.',
  r: 'They record gifts, village rules and the names of rulers and places, often on the walls of temples, so they give direct evidence of the period.',
  sol: 'Both are true, and the reason explains the assertion: the direct records of gifts, rules and rulers are what make them valuable.',
}));
Q('tf_lot', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? According to the Uttaramerur inscriptions, a village sabha could choose its members by drawing lots.',
  sol: 'True. Names of eligible persons were put in a pot and drawn by lot, which is called the kudavolai method.',
}));
Q('fb_uttar_king', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The Uttaramerur inscriptions date from the reign of ___, about 919 and 921 CE.',
  acc: [['Parantaka I', 'Parantaka', 'Parantaka 1']],
  sol: 'They belong to the reign of Parantaka I.',
}));
Q('mt_sources', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each source of Chola history with what it is.',
  pairs: [
    ['Anbil plates', 'A set of copper-plate grants'],
    ['Uttaramerur inscriptions', 'Records of how a village sabha was run'],
    ['Brihadishwara Temple', 'A temple of Shiva at Thanjavur, completed about 1010 CE'],
    ['Kudavolai', 'Choosing members by drawing names from a pot'],
  ],
  sol: 'The Anbil plates are copper-plate grants, the Uttaramerur inscriptions describe a village sabha, the Brihadishwara Temple was completed about 1010 CE, and kudavolai is the lot system.',
}));
Q('s_inscr_value', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why are stone inscriptions and copper-plate grants valuable sources for the Chola period? Give two points.',
  model: 'They are **direct records made at the time**, so they give names of rulers, places and gifts. Many also describe **local rules**, such as those of village assemblies, which books written much later rarely mention.',
  sol: 'Direct records; local rules and gifts.',
  scheme: [['Direct records of rulers, places and gifts', 1], ['Details of local administration', 1]],
}));
Q('s_grant_caution', short({
  t: 1, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'A student in the imagined history club says that every claim in a royal grant must be exactly true. Give two reasons why a historian would be careful.',
  model: 'Such grants often begin with **praise of the king**, which may exaggerate his deeds. A historian therefore **compares the grant with other evidence**, such as other inscriptions, before accepting a claim.',
  sol: 'Praise may exaggerate; compare with other evidence.',
  scheme: [['Grants open with royal praise that may exaggerate', 1], ['Compare with other evidence', 1]],
}));
Q('s_brihad_features', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two features of the Brihadishwara Temple at Thanjavur that make it an important source.',
  model: 'It has a **tall vimana of about 66 metres**, a massive **Nandi**, a large linga and painted **murals**. Its walls also carry **inscriptions**, and it was built by **Rajaraja I**.',
  sol: 'Any two: vimana, Nandi, murals, inscriptions.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s3_uttar', short({
  t: [1, 3], d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe, in three points, how the Uttaramerur inscriptions show that a Chola village sabha followed fixed rules.',
  model: '1. The village was divided into **wards**, and members were picked by **drawing lots** (kudavolai) from names written on palm leaves.\n2. Candidates needed **qualifications**, such as owning land and a house, a suitable age and knowledge of the Vedas or administration.\n3. There were **disqualifications** and **committees (variyams)** for tanks, gardens and justice.',
  sol: 'Lot system; qualifications; disqualifications and committees.',
  scheme: [['Wards and kudavolai', 1], ['Qualifications', 1], ['Disqualifications and committees', 1]],
}));
Q('s3_brihad', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give three facts about the Brihadishwara Temple: its builder, its date and its place in world heritage.',
  model: '1. It was built by **Rajaraja I** and dedicated to **Shiva**.\n2. It was completed about **1010 CE** at **Thanjavur**.\n3. It is part of the World Heritage Site called the **Great Living Chola Temples**, listed in **1987** and extended in **2004** to include Gangaikondacholapuram and Darasuram.',
  sol: 'Builder; date; World Heritage listing.',
  scheme: [['Rajaraja I as builder, dedicated to Shiva', 1], ['About 1010 CE at Thanjavur', 1], ['World Heritage Site, 1987 and 2004', 1]],
}));
Q('s3_temple_guide', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined guide at Thanjavur tells a group, "Everything on these walls is a document." Give three kinds of information a historian can draw from the temple and its walls.',
  model: '1. The **inscriptions** record **gifts of land and lamps** made to the temple.\n2. The **size and design** of the building show the **power and wealth** of the king who built it.\n3. The **murals and sculpture** show the **art and beliefs** of the time.',
  sol: 'Gifts; power and wealth; art and beliefs.',
  scheme: [['Inscriptions and gifts', 1], ['Size, power and wealth', 1], ['Murals, art and beliefs', 1]],
}));

// ================================================================ t02 Kings
Q('m_vijayalaya', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A family tree in the imagined Chola Gallery begins with the ruler who took Thanjavur about 850 CE and founded the later (imperial) Chola line. Whose name goes at the top?',
  opts: ['Vijayalaya', 'Rajaraja I', 'Rajendra I', 'Kulottunga I'],
  sol: 'Vijayalaya took Thanjavur about 850 CE and began the line. Rajaraja I, Rajendra I and Kulottunga I ruled much later.',
}));
Q('m_ganga', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A card in a school quiz says: "This king led an expedition to the Ganga, took the title Gangaikondachola and founded a new capital." Which king is meant?',
  opts: ['Rajendra I', 'Rajaraja I', 'Parantaka I', 'Aditya I'],
  sol: 'Rajendra I took the title Gangaikondachola and founded Gangaikondacholapuram. Rajaraja I built the Thanjavur temple, and Parantaka I and Aditya I ruled earlier.',
}));
Q('m_rajaraja_temple', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A museum guide in the imagined town of Vennaiyur says, "This king added the Maldives and parts of Sri Lanka to his power, built a strong navy, and raised a great temple at Thanjavur." Which king is described?',
  opts: ['Rajaraja I', 'Rajendra I', 'Vijayalaya', 'Aditya I'],
  sol: 'These achievements belong to Rajaraja I. Rajendra I is known for the Ganga expedition and the Srivijaya voyage, while Vijayalaya and Aditya I belong to the early line.',
}));
Q('m_srivijaya', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined project on sea trade, a student writes that a Chola fleet sailed to Srivijaya in South-East Asia about 1025 CE. Which king sent it?',
  opts: ['Rajendra I', 'Vijayalaya', 'Parantaka I', 'Kulottunga I'],
  sol: 'The naval expedition to Srivijaya is linked with Rajendra I. The others are not associated with this voyage.',
}));
Q('m_years', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined museum label gives the reign of Rajaraja I as about 985 to 1014 CE and of Rajendra I as about 1014 to 1044 CE. About how many years do the two reigns cover together?',
  opts: ['About 59 years', 'About 29 years', 'About 95 years', 'About 30 years'],
  sol: 'Counting from 985 to 1044 gives about 59 years. Twenty-nine and thirty are the lengths of single reigns, and 95 comes from a slip in subtracting.',
}));
Q('m_order', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Four students of the imagined Arivu Academy arrange Chola rulers on a wall. Which arrangement is correct, earliest first?',
  opts: [
    'Vijayalaya, Parantaka I, Rajaraja I, Rajendra I',
    'Parantaka I, Vijayalaya, Rajendra I, Rajaraja I',
    'Rajaraja I, Vijayalaya, Parantaka I, Rajendra I',
    'Vijayalaya, Rajendra I, Parantaka I, Rajaraja I',
  ],
  sol: 'The order is Vijayalaya (about 850), Parantaka I (about 907 to 955), Rajaraja I (about 985 to 1014) and Rajendra I (about 1014 to 1044). The others place at least one pair the wrong way round.',
}));
Q('m_naval', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A student in an imagined seminar must pick the strongest evidence for the claim that the Cholas were a naval power. Which is best?',
  opts: [
    'The Chola hold on the Maldives and the sea expedition to Srivijaya about 1025 CE',
    'The height of the vimana at Thanjavur',
    'The lot system in village assemblies',
    'The casting of bronze images',
  ],
  sol: 'Taking island territory and sending a fleet across the sea need a navy. A tall tower, a village election method and bronze casting show other strengths, not sea power.',
}));
Q('ar_navy', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Srivijaya expedition shows the strength of the Chola navy under Rajendra I.',
  r: 'It was a voyage across the sea to South-East Asia, about 1025 CE.',
  sol: 'Both are true, and the reason explains the assertion: crossing the sea to South-East Asia could be done only with a strong fleet.',
}));
Q('tf_kulottunga', tf({
  t: 2, d: 3, c: 'recall', ans: false,
  stem: 'True or false? Kulottunga I (about 1070 to 1120) ruled before Rajaraja I.',
  sol: 'False. Kulottunga I ruled after Rajaraja I (about 985 to 1014) and Rajendra I.',
}));
Q('fb_ganga', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'After his expedition to the Ganga, Rajendra I took the title ___.',
  acc: [['Gangaikondachola', 'Gangaikonda Chola', 'Gangaikondacholan']],
  sol: 'He took the title Gangaikondachola.',
}));
Q('ord_kings', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange these Chola kings in chronological order, earliest first.',
  items: ['Vijayalaya', 'Aditya I', 'Parantaka I', 'Rajaraja I', 'Rajendra I'],
  sol: 'Vijayalaya, Aditya I, Parantaka I, Rajaraja I and Rajendra I.',
}));
Q('s_rajaraja', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two achievements of Rajaraja I.',
  model: 'He extended Chola power in the **south**, including **Sri Lanka** and the **Maldives**, using a strong **navy**. He also built the **Brihadishwara Temple** at Thanjavur, completed about 1010 CE.',
  sol: 'Conquests and naval power; the temple.',
  scheme: [['Conquests in the south, Sri Lanka or the Maldives', 1], ['Brihadishwara Temple', 1]],
}));
Q('s_rajendra', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two achievements of Rajendra I.',
  model: 'He led an **expedition to the Ganga** and took the title **Gangaikondachola**, founding **Gangaikondacholapuram** as a new capital. He also sent a **naval expedition to Srivijaya** about 1025 CE.',
  sol: 'Ganga expedition and capital; Srivijaya.',
  scheme: [['Ganga expedition, title or new capital', 1], ['Naval expedition to Srivijaya', 1]],
}));
Q('s3_kings', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give one important fact each about Parantaka I, Rajaraja I and Rajendra I, with their approximate reigns.',
  model: '1. **Parantaka I** (about 907 to 955): the **Uttaramerur inscriptions** on village government come from his reign.\n2. **Rajaraja I** (about 985 to 1014): he built the **Brihadishwara Temple** and extended Chola power by land and sea.\n3. **Rajendra I** (about 1014 to 1044): he took the title **Gangaikondachola** and sent a fleet to **Srivijaya**.',
  sol: 'One fact for each king.',
  scheme: [['Parantaka I with reign and fact', 1], ['Rajaraja I with reign and fact', 1], ['Rajendra I with reign and fact', 1]],
}));
Q('s3_timeline', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined student draws a timeline that puts Rajendra I before Rajaraja I and gives the Srivijaya expedition to Vijayalaya. Correct the two mistakes.',
  model: '1. **Rajaraja I** (about 985 to 1014) ruled **before** Rajendra I (about 1014 to 1044), who was his successor.\n2. The **Srivijaya expedition**, about 1025 CE, was a **naval** venture of **Rajendra I**.\n3. **Vijayalaya**, about 850 CE, belongs at the **start** of the timeline.',
  sol: 'Correct order; correct king for Srivijaya.',
  scheme: [['Rajaraja I before Rajendra I', 1], ['Srivijaya expedition under Rajendra I', 1], ['Vijayalaya at the start', 1]],
}));

// ================================================================ t03 Administration
Q('m_mandalam', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'In the imagined Chola Gallery chart, the largest divisions of the kingdom, often placed under princes or viceroys, are labelled with which term?',
  opts: ['Mandalam', 'Gopuram', 'Variyam', 'Nagaram'],
  sol: 'A mandalam was a province. A gopuram is a temple gateway, a variyam a committee and a nagaram an assembly of merchants.',
}));
Q('m_valanadu', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A record keeper\'s imagined chart shows three levels: a mandalam, then a group of villages under one name, then the single village. What is the middle level called?',
  opts: ['Valanadu or nadu', 'Brahmadeya', 'Mandapa', 'Vimana'],
  sol: 'The division between mandalam and village was the valanadu or nadu, a district. A brahmadeya is a type of village, and mandapa and vimana are parts of temples.',
}));
Q('m_ur', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In the imagined ordinary village of Pallikudi, the landholders meet under a tree to settle the use of a common pasture. Which body are they forming?',
  opts: ['The ur', 'The sabha', 'The nagaram', 'The variyam of justice'],
  sol: 'The ur was the assembly of an ordinary village, for landholders. The sabha belonged to brahmadeya villages, the nagaram to merchants in trade centres, and a variyam was a committee.',
}));
Q('m_sabha', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The imagined village of Chaturvedimangalam was granted to a group of Brahmanas and its affairs are run by their assembly. What is this assembly called?',
  opts: ['The sabha', 'The ur', 'The nagaram', 'The mandalam'],
  sol: 'The assembly of a brahmadeya village was the sabha. The ur belonged to ordinary villages, the nagaram to merchants, and a mandalam is a province.',
}));
Q('m_nagaram', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In the imagined trade centre of Vennaiyur, cloth sellers, oil merchants and grain dealers meet to decide matters of the market. Which Chola body is this?',
  opts: ['The nagaram', 'The ur', 'The sabha', 'The valanadu'],
  sol: 'The nagaram was the assembly of merchants in a trade centre. The ur and sabha were village assemblies, and a valanadu was a district.',
}));
Q('m_revenue', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined officer of the Chola treasury, Madhavan, measures fields before fixing what each farmer owes. What main source of income does his work serve?',
  opts: ['Land revenue', 'Customs on sea trade only', 'Fines on temple visitors', 'Sale of bronze images'],
  sol: 'Land revenue was the main income, and surveying the land helped fix it. The other options are minor or not sources of regular state income.',
}));
Q('m_selfgov', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'A student in an imagined seminar says that written rules on qualifications, drawing of lots and committees at Uttaramerur show something about Chola villages. Which conclusion is best supported?',
  opts: [
    'Some villages had organised local self-government with rules for choosing and checking members',
    'Villages had no say in any matter',
    'Every village in the kingdom was run in exactly the same way',
    'The king chose every village member directly',
  ],
  sol: 'Fixed rules for selection and committees point to organised local self-government. They do not show that all villages were alike, and the king did not choose each member.',
}));
Q('ar_assemblies', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'The sabha was an assembly of merchants in trade centres.',
  r: 'The nagaram was the Chola assembly of merchants in trade centres.',
  sol: 'A is false: the sabha was the assembly of brahmadeya villages. R is true: the merchants\' body was the nagaram.',
}));
Q('ar_sabha', ar({
  t: [1, 3], d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Uttaramerur inscriptions are cited as evidence of organised self-government in a Chola village.',
  r: 'They set out how members were chosen, with qualifications, disqualifications and committees.',
  sol: 'Both are true, and the reason explains the assertion: the detailed rules are what show organised self-government.',
}));
Q('tf_survey', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: 'True or false? Land revenue was the main income of the Chola state, and land was surveyed.',
  sol: 'True. Land revenue was the chief source of income, and surveys helped to fix it.',
}));
Q('mt_admin', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each Chola administrative term with its meaning.',
  pairs: [
    ['Mandalam', 'A province'],
    ['Valanadu', 'A district'],
    ['Ur', 'Assembly of an ordinary village'],
    ['Nagaram', 'Assembly of merchants'],
  ],
  sol: 'A mandalam was a province, a valanadu a district, the ur an ordinary village assembly and the nagaram a merchants\' assembly.',
}));
Q('mt_bodies', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined situation with the Chola body that would handle it.',
  pairs: [
    ['Landholders of an ordinary village meet about a boundary stone', 'Ur'],
    ['Brahmanas of a granted village choose a tank committee', 'Sabha'],
    ['Traders of a market town settle a dispute over weights', 'Nagaram'],
    ['A prince is sent to look after a large province', 'Mandalam'],
  ],
  sol: 'The boundary matter belongs to the ur, the tank committee to the sabha, the market dispute to the nagaram, and the prince goes to a mandalam.',
}));
Q('s_divisions', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the divisions of the Chola kingdom, from largest to smallest, below the king.',
  model: 'The kingdom was divided into **mandalams** (provinces), often under princes or viceroys. Each mandalam had **valanadus or nadus** (districts), and each district was made up of **villages**.',
  sol: 'Mandalam, valanadu or nadu, village.',
  scheme: [['Mandalams as provinces', 1], ['Valanadus and villages', 1]],
}));
Q('s_committees', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What were variyams in a Chola village, and name two matters they looked after.',
  model: 'Variyams were **committees** chosen by the village assembly. They looked after **tanks** and **gardens**, and others dealt with **justice** and **temples**.',
  sol: 'Committees; two matters.',
  scheme: [['Variyams as committees of the assembly', 1], ['Two matters they handled', 1]],
}));
Q('s_revenue', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why was land surveyed in the Chola kingdom, and what was the main income of the state?',
  model: 'Land was **surveyed** so that the amount due from each holding could be **fixed fairly**. **Land revenue** was the chief income of the state.',
  sol: 'To fix revenue; land revenue.',
  scheme: [['Survey to fix what was due', 1], ['Land revenue as the main income', 1]],
}));
Q('s_nagaram_case', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In the imagined market town of Vennaiyur the weavers and oil merchants form a body of their own. Name it and say who its members were.',
  model: 'The body is the **nagaram**, the Chola assembly of **merchants**. It worked in **trade centres** and gave traders a voice in the affairs of their market.',
  sol: 'Nagaram; merchants.',
  scheme: [['Nagaram named', 1], ['Merchants in trade centres', 1]],
}));
Q('s3_levels', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the central, provincial and local levels of Chola administration, one point each.',
  model: '1. **Centre**: the king, helped by **ministers and officials**.\n2. **Provinces and districts**: **mandalams**, often under princes or viceroys, divided into **valanadus or nadus**.\n3. **Villages**: governed through **assemblies** such as the ur, sabha and nagaram.',
  sol: 'Centre; provinces and districts; villages.',
  scheme: [['Central administration', 1], ['Mandalam and valanadu', 1], ['Village assemblies', 1]],
}));
Q('s3_village_case', short({
  t: 3, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'In the imagined brahmadeya village of Chaturvedimangalam, the tank embankment has broken. Explain in three points how a Chola sabha could deal with it.',
  model: '1. The **sabha** would turn to its **tank committee (variyam)**, chosen under its rules.\n2. Members of the committee would have been picked by **lot** and judged fit by the **qualifications** laid down.\n3. The work could be paid for from **village funds**, while the sabha **checked the accounts**.',
  sol: 'Tank committee; chosen by rule; funds and accounts.',
  scheme: [['Tank committee of the sabha', 1], ['Members chosen by lot and qualifications', 1], ['Funds and accounts checked', 1]],
}));

// ================================================================ t04 Art
Q('m_dravida', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The imagined Temple Trail leaflet lists the parts of a Chola temple in the Dravida style. Which set is correct?',
  opts: [
    'Vimana, gopuram, mandapa and enclosure wall',
    'Stupa, chaitya and vihara',
    'Shikhara, jagati and pillar capital',
    'Minaret, dome and arch',
  ],
  sol: 'A Chola Dravida temple has a vimana, gopuram, mandapas and an enclosure wall. The other sets name Buddhist structures, northern temple parts and features of other building traditions.',
}));
Q('m_vimana', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A drawing in the imagined guide of Sivapuram shows a pyramidal tower rising in storeys above the sanctum, the tallest part of the temple. What is it called?',
  opts: ['Vimana', 'Gopuram', 'Mandapa', 'Kudavolai'],
  sol: 'The pyramidal tower over the sanctum is the vimana. The gopuram is a gateway tower, a mandapa a pillared hall, and kudavolai is a lot system.',
}));
Q('m_gopuram', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A visitor to an imagined later Chola temple notices a large tower over the entrance of the enclosure wall. Which part is this?',
  opts: ['A gopuram', 'A vimana', 'A mandapa', 'A linga'],
  sol: 'A tower over a gateway is a gopuram, and in later temples these gateways grew larger. The vimana rises over the sanctum, a mandapa is a hall and a linga is the sacred form worshipped inside.',
}));
Q('m_waxstep', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'In the imagined workshop of the bronze-caster Murugan, a clay coating has just dried over a wax model. What is the next step in the lost-wax method?',
  opts: [
    'The mould is heated so that the wax melts and runs out',
    'Molten metal is poured in before any heating',
    'The mould is broken open to take out the finished image',
    'The wax model is made again from the start',
  ],
  sol: 'After the clay coating, the mould is heated and the wax melts out, leaving a hollow. Metal is poured only after that, and the mould is broken only when the metal has set.',
}));
Q('m_nataraja', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'A label in the imagined bronze gallery of Vennaiyur says the Nataraja shows Shiva dancing within a ring of flames. According to the commonly taught reading, what does the ring stand for?',
  opts: [
    'The cosmic cycle of creation and destruction',
    'A boundary of a Chola province',
    'The shape of a temple gateway',
    'The fire used to melt the wax',
  ],
  sol: 'The ring of flames is commonly read as a symbol of the cosmic cycle of creation and destruction. It is not a boundary, a gateway or the casting fire.',
}));
Q('m_bronze_why', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'A critic in an imagined art class explains why Chola bronzes are admired. Which reason is best?',
  opts: [
    'Their balance, grace and fine detail',
    'The great size of every image',
    'That they were cast without any clay mould',
    'That they were made only in Delhi',
  ],
  sol: 'The qualities usually praised are poise, flowing movement and careful detail. Many bronzes are small, they were cast in clay moulds, and they were made in the Chola lands of the south.',
}));
Q('m_gopuram_check', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Two imagined students compare an early Chola temple with a later one. Which observation fits what is commonly taught about gopurams?',
  opts: [
    'The gateway towers became larger in later temples',
    'Gateway towers were never built',
    'The gopuram was always lower than a pillared hall',
    'Gopurams stood over the sanctum in every temple',
  ],
  sol: 'As commonly taught, gopurams grew larger in later temples. The tower over the sanctum is the vimana, not the gopuram.',
}));
Q('ar_vimana', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The vimana is the most striking feature of the Brihadishwara Temple.',
  r: 'The vimana is the gateway tower of the enclosure wall.',
  sol: 'A is true: the very tall vimana stands out. R is false: the vimana is the tower over the sanctum, while the gopuram is the gateway tower.',
}));
Q('ar_wax', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Chola bronze images were cast by the lost-wax method.',
  r: 'The Nataraja shows Shiva in a ring of flames.',
  sol: 'Both are true, but R does not explain A: the ring of flames describes one image, not the method of casting.',
}));
Q('tf_gopuram', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? In a Chola temple, the gopuram is the tower that rises directly above the sanctum.',
  sol: 'False. The tower above the sanctum is the vimana; the gopuram is the gateway tower.',
}));
Q('fb_lostwax', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'Chola bronze images were cast by the ___ method.',
  acc: [['lost-wax', 'lost wax', 'cire perdue']],
  sol: 'They were cast by the lost-wax (cire perdue) method.',
}));
Q('ord_wax', ord({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of the lost-wax method in the correct order.',
  items: ['Make a wax model', 'Coat the model with clay', 'Heat the mould so the wax melts out', 'Pour in molten metal', 'Break the mould and finish the image'],
  sol: 'Wax model, clay coating, heating, pouring, breaking and finishing.',
}));
Q('mt_temple', match({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each part of a Chola temple with its description.',
  pairs: [
    ['Vimana', 'Pyramidal tower over the sanctum'],
    ['Gopuram', 'Gateway tower'],
    ['Mandapa', 'Pillared hall'],
    ['Enclosure wall', 'Wall that surrounds the temple'],
  ],
  sol: 'The vimana is the tower over the sanctum, the gopuram a gateway tower, the mandapa a pillared hall, and the enclosure wall surrounds the temple.',
}));
Q('s_vimana_gopuram', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the difference between a vimana and a gopuram in a Chola temple.',
  model: 'The **vimana** is the pyramidal tower built **above the sanctum**, and at Thanjavur it is very tall. The **gopuram** is the tower over a **gateway** of the temple, and it grew larger in later temples.',
  sol: 'Vimana over sanctum; gopuram over gateway.',
  scheme: [['Vimana: tower over the sanctum', 1], ['Gopuram: gateway tower', 1]],
}));
Q('s_nataraja', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the Nataraja bronze and say what it is thought to symbolise.',
  model: 'In the Nataraja bronze, **Shiva** is the **Lord of Dance** and the figure is surrounded by a **ring of flames**. This ring is commonly read as a symbol of the **cosmic cycle of creation and destruction**.',
  sol: 'Lord of Dance in flames; cosmic cycle.',
  scheme: [['Shiva as Lord of Dance in a ring of flames', 1], ['Symbol of the cosmic cycle', 1]],
}));
Q('s_wax_why', short({
  t: 4, d: 4, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined caster, Murugan, wants a fine ornament on a small bronze image to appear exactly as in his model. Why does the lost-wax method suit this need?',
  model: 'The **wax model** can carry **very fine detail**, and the **clay** coating takes the shape of that detail. When **metal** replaces the melted wax, it copies the detail.',
  sol: 'Wax carries detail; clay copies it; metal fills the space.',
  scheme: [['Wax model holds fine detail', 1], ['Clay mould copies it and metal fills the space', 1]],
}));
Q('s3_temple', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three features of Chola temple architecture.',
  model: '1. The **vimana**, a pyramidal tower over the sanctum, very tall at **Thanjavur**.\n2. The **gopuram**, a gateway tower, which became **larger** in later temples.\n3. **Mandapas**, pillared halls, and an **enclosure wall** around the temple.',
  sol: 'Vimana; gopuram; mandapas and wall.',
  scheme: [['Vimana', 1], ['Gopuram', 1], ['Mandapas and enclosure wall', 1]],
}));
Q('s3_bronze_admire', short({
  t: 4, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A visitor to the imagined bronze gallery of Vennaiyur asks why Chola bronzes are admired. Give three reasons.',
  model: '1. They show **balance** in the pose of the figure.\n2. They show **grace** in movement and expression.\n3. They carry **fine detail** in ornaments and features, made possible by the **lost-wax method**.',
  sol: 'Balance; grace; fine detail.',
  scheme: [['Balance', 1], ['Grace', 1], ['Fine detail and the method', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_inscr', long({
  t: [1, 3], d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Inscriptions are among the best sources for the Chola period.\n\n(i) Name two kinds of inscriptions, with one example of each. **[3]**\n(ii) Explain how the Uttaramerur inscriptions show the way a village sabha chose its members. **[3]**\n(iii) Explain the value of such inscriptions as sources, and one care a historian must take. **[4]**',
  model: '(i) Chola kings issued **stone inscriptions**, often cut on temple walls, and **copper-plate grants**. Examples of the grants are the **Anbil plates**, and the Thiruvalangadu or Larger Leiden plates.\n\n(ii) The Uttaramerur inscriptions, of **Parantaka I** (about 919 and 921 CE), say the village was split into wards. Names of eligible persons were written on **palm leaves**, put in a pot and **drawn by lot** (kudavolai).\n\n(iii) They are **direct records** of gifts, rules and rulers, so they show how villages were run. Because royal grants open with praise, they must be **compared with other evidence**.',
  sol: 'Two kinds with examples; the lot system; value and caution.',
  scheme: [['(i) Stone inscriptions and copper-plate grants', 2], ['(i) One example', 1], ['(ii) Reign of Parantaka I, wards', 1], ['(ii) Palm leaves drawn by lot (kudavolai)', 2], ['(iii) Direct records of gifts, rules and rulers', 2], ['(iii) Caution: praise, compare with other evidence', 2]],
}));
Q('l_brihad', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'The Brihadishwara Temple at Thanjavur is both a monument and a source of history.\n\n(i) Who built it, when was it completed and to whom is it dedicated? **[3]**\n(ii) Describe its main features. **[3]**\n(iii) Explain how it helps us to learn about the Cholas, and state its place in world heritage. **[4]**',
  model: '(i) The temple at **Thanjavur** was built by the king **Rajaraja I** and completed about **1010 CE**. It is dedicated to the god **Shiva**, and it is the best-known monument of the Chola kings.\n\n(ii) A towering **vimana** of about **66 metres** rises above the sanctum. Inside and around it are a massive **Nandi**, a large **linga**, painted **murals** on the walls and long **inscriptions** cut into the stone.\n\n(iii) The inscriptions record **gifts** made to the temple, and the scale of the building points to the **power and wealth** of the king who raised it. In this way a monument of worship also serves as a source for politics and the economy. It belongs to the World Heritage Site **Great Living Chola Temples**, listed in **1987** and extended in **2004** to include the temples at Gangaikondacholapuram and Darasuram.',
  sol: 'Builder, date and dedication; features; value as a source and heritage status.',
  scheme: [['(i) Rajaraja I', 1], ['(i) About 1010 CE', 1], ['(i) Dedicated to Shiva', 1], ['(ii) Vimana of about 66 metres', 1], ['(ii) Nandi and linga', 1], ['(ii) Murals and inscriptions', 1], ['(iii) Inscriptions and power of the king', 2], ['(iii) World Heritage listing, 1987 and 2004', 2]],
}));
Q('l_kings', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The later Chola kings built a powerful state.\n\n(i) List Vijayalaya, Aditya I, Parantaka I, Rajaraja I and Rajendra I in chronological order, with approximate dates where known. **[3]**\n(ii) Describe the achievements of Rajaraja I. **[3]**\n(iii) Describe the achievements of Rajendra I. **[4]**',
  model: '(i) The order is **Vijayalaya** (about 850 CE), who took Thanjavur, then **Aditya I**, **Parantaka I** (about 907 to 955), **Rajaraja I** (about 985 to 1014) and **Rajendra I** (about 1014 to 1044). Dates are approximate and books differ a little.\n\n(ii) Rajaraja I won lands in the **south** and in **Sri Lanka**, took the **Maldives** and kept a strong **navy** that made Chola power felt across the sea. He also built the great **Brihadishwara Temple** at Thanjavur, completed about 1010 CE.\n\n(iii) Rajendra I led an expedition to the **Ganga** and took the title **Gangaikondachola**. He founded a new capital, **Gangaikondacholapuram**, and about **1025 CE** he sent a **naval expedition** to **Srivijaya** in South-East Asia, which shows the reach of the Chola fleet.',
  sol: 'Order of kings; Rajaraja I; Rajendra I.',
  scheme: [['(i) Five kings in the correct order', 2], ['(i) Approximate dates', 1], ['(ii) Conquests and naval power', 1.5], ['(ii) Brihadishwara Temple', 1.5], ['(iii) Ganga expedition, title and capital', 2], ['(iii) Srivijaya expedition, about 1025 CE', 2]],
}));
Q('l_admin', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Cholas governed through several levels.\n\n(i) Describe the position of the king and his officials. **[3]**\n(ii) Name and describe the divisions of the kingdom. **[3]**\n(iii) Describe the three kinds of local assembly and the main source of revenue. **[4]**',
  model: '(i) At the head of the state stood the **king**. He was helped by **ministers** and many **officials** who carried out his orders and watched over the work of government in the kingdom.\n\n(ii) The kingdom was divided into **mandalams**, which were provinces, often placed under **princes or viceroys**. Each mandalam held **valanadus or nadus**, which were districts, and each district was made up of many **villages**.\n\n(iii) Local affairs were handled by assemblies. The **ur** served ordinary villages, the **sabha** served **brahmadeya** villages granted to Brahmanas, and the **nagaram** served **merchants** in trade centres. **Land revenue** was the main income of the state, and land was **surveyed** to fix what was due from each holding.',
  sol: 'King and officials; divisions; assemblies and revenue.',
  scheme: [['(i) King at the head', 1], ['(i) Ministers and officials', 2], ['(ii) Mandalam, often under princes or viceroys', 1.5], ['(ii) Valanadu or nadu and village', 1.5], ['(iii) Ur, sabha and nagaram', 2], ['(iii) Land revenue and survey', 2]],
}));
Q('l_village', long({
  t: [1, 3], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'A student of the imagined Class IX of Tamarai School says: "Chola villages governed themselves."\n\n(i) Name the assemblies through which villages and merchants managed their affairs. **[3]**\n(ii) Describe two ways in which the Uttaramerur rules show organised self-government. **[3]**\n(iii) Evaluate the statement: how far is it fair? **[4]**',
  model: '(i) Ordinary villages had the **ur**, an assembly of landholders. Villages granted to Brahmanas, called brahmadeya villages, had the **sabha**. Merchants in trade centres had the **nagaram**, which looked after matters of the market.\n\n(ii) The Uttaramerur inscriptions show that members were picked by **lot** from names on palm leaves, and only those who met the **qualifications** and avoided the **disqualifications** could be listed. The sabha also worked through **committees (variyams)** for tanks, gardens and justice, which shows division of work.\n\n(iii) The statement is **partly fair**. Local bodies had real duties and written rules, so villages did manage many of their own affairs. Yet they worked inside a kingdom headed by the **king**, whose officials and **land revenue** system reached every village, so the self-government was real but not complete.',
  sol: 'Assemblies; two Uttaramerur features; a balanced judgement.',
  scheme: [['(i) Ur', 1], ['(i) Sabha', 1], ['(i) Nagaram', 1], ['(ii) Lot system with qualifications and disqualifications', 1.5], ['(ii) Committees', 1.5], ['(iii) Partly fair, with evidence of local rules', 2], ['(iii) Limits set by the king and revenue system', 2]],
}));
Q('l_temple', long({
  t: 4, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Chola temples are remembered for their architecture.\n\n(i) Name the four main parts of a Chola temple in the Dravida style. **[3]**\n(ii) Describe the vimana and the gopuram, and how the gopuram changed in later temples. **[3]**\n(iii) Describe the Brihadishwara Temple as an example of Chola architecture. **[4]**',
  model: '(i) A Chola temple in the Dravida style had four main parts: the **vimana**, the **gopuram**, the **mandapas** and the **enclosure wall** that surrounded the whole temple.\n\n(ii) The **vimana** is a pyramidal tower that rises in storeys above the sanctum. The **gopuram** is the tower over the gateway. In the **later Chola temples** the gopurams became **larger**, so that they came to stand out more than before.\n\n(iii) At **Thanjavur** the Brihadishwara Temple has a vimana of about **66 metres**, which dominates the whole complex. It also has a massive **Nandi**, pillared **mandapas**, painted **murals** and **inscriptions**, and it forms part of the **Great Living Chola Temples**, a World Heritage Site.',
  sol: 'Four parts; vimana and gopuram; Brihadishwara as an example.',
  scheme: [['(i) Vimana and gopuram', 1.5], ['(i) Mandapa and enclosure wall', 1.5], ['(ii) Vimana described', 1], ['(ii) Gopuram and its growth', 2], ['(iii) Vimana of about 66 metres, Nandi', 2], ['(iii) Murals, inscriptions, World Heritage', 2]],
}));
Q('l_bronze', long({
  t: 4, d: 4, c: 'application', marks: 10, wl: L10,
  stem: 'The imagined bronze workshop of Murugan makes images in the Chola tradition.\n\n(i) Describe the lost-wax method in its main steps. **[3]**\n(ii) Describe the Nataraja and what it is thought to symbolise. **[3]**\n(iii) Explain why Chola bronzes are admired. **[4]**',
  model: '(i) First a **wax model** of the image is made, and it is coated with **clay** to form a mould. Next the mould is **heated** so that the wax melts and runs out, and **molten metal** is poured into the empty space. When the metal has set, the **mould is broken** and the image is cleaned and finished.\n\n(ii) The **Nataraja** is an image of **Shiva as Lord of Dance**. The figure dances inside a **ring of flames**, which is commonly read as a symbol of the **cosmic cycle of creation and destruction**.\n\n(iii) Chola bronzes are admired for their **balance**, since the figures seem poised in movement, and for their **grace** of line and expression. They also show **fine detail** in ornaments and features, which the wax model could hold and the metal copied closely.',
  sol: 'Lost-wax steps; Nataraja; reasons for admiration.',
  scheme: [['(i) Wax model and clay coating', 1], ['(i) Heating and pouring', 1], ['(i) Breaking the mould and finishing', 1], ['(ii) Lord of Dance in a ring of flames', 1.5], ['(ii) Symbol of the cosmic cycle', 1.5], ['(iii) Balance and grace', 2], ['(iii) Fine detail and the method', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_booklet', source({
  t: [1, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined temple-guide booklet and answer the questions that follow. ${IMAG}`,
  passage: '**A page from the Visitors\' Booklet of the Sivapuram Temple, an imagined shrine built by an imagined king, Maran Varman**\n\nWelcome. You first pass under a tall gateway tower and then walk through a hall of many pillars to the inner shrine. Above the shrine a tower of many storeys narrows towards the sky and is taller than the gateway. In a side chamber stands a bronze figure of the dancing Lord in a ring of flames, made by the lost-wax method. Along the base of the walls, long lines of writing record gifts of land and lamps made in the king\'s time.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'What is the tower over the entrance called?', model: 'A **gopuram**.', sol: 'A gopuram.', scheme: [['Gopuram', 1]] })),
    child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'Name the tower over the shrine, and name the real Chola temple famous for a very tall one.', model: 'The **vimana**; the **Brihadishwara Temple** at Thanjavur.', sol: 'Vimana; Brihadishwara Temple.', scheme: [['Vimana and the Brihadishwara Temple', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): How can the writing along the base of the walls help a historian?', model: 'It **records gifts** of land and lamps, so it shows **what the temple received** and how it was supported. Such records are **direct evidence** of the time.', sol: 'Records of gifts; direct evidence.', scheme: [['Records gifts to the temple', 1], ['Direct evidence of the period', 1]] }), [
      short({ t: 4, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): State the first two steps of the method used to make the bronze figure.', model: 'First a **wax model** is made, and then it is **coated with clay** to form a mould.', sol: 'Wax model; clay coating.', scheme: [['Wax model', 1], ['Clay coating', 1]] }),
    ]),
  ],
}));
Q('sb_keeper', source({
  t: [1, 3], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined record keeper's notes and answer the questions that follow. ${IMAG}`,
  passage: '**Notes of Kanagan, the imagined record keeper of the village of Mullaikudi**\n\nToday the assembly chose the committee for the tank. The names of those eligible, each written on a palm leaf, were put in a pot and a child drew one leaf for each ward. Only those who owned land and a house, were of the right age and knew the work of administration had been listed. One candidate was left out because he had never given accounts of an earlier post. The new committee will watch the sluices and settle disputes over water.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What is this method of choosing members called?', model: '**Kudavolai**, the method of drawing lots.', sol: 'Kudavolai.', scheme: [['Kudavolai', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'What was a committee of this kind called in Chola inscriptions?', model: 'A **variyam**.', sol: 'A variyam.', scheme: [['Variyam', 1]] })),
    child('c', short({ t: [1, 3], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Give two qualifications and one reason for disqualification that the notes mention.', model: 'Qualifications: **owning land and a house**, being of the **right age** and knowing **administration**. A candidate was barred for **never giving accounts** of an earlier post.', sol: 'Two qualifications; the accounts rule.', scheme: [['Two qualifications', 1], ['Disqualification for no accounts', 1]] }), [
      short({ t: 1, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Which real inscriptions describe such rules, and in whose reign were they made?', model: 'The **Uttaramerur inscriptions**, made about **919 and 921 CE** in the reign of **Parantaka I**.', sol: 'Uttaramerur; Parantaka I.', scheme: [['Uttaramerur inscriptions', 1], ['Reign of Parantaka I', 1]] }),
    ]),
  ],
}));
Q('sb_notes', source({
  t: [2, 1], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined project notes and answer the questions that follow. ${IMAG}`,
  passage: '**Project notes of Meena, an imagined student of Class IX, on the Cholas**\n\n1. Vijayalaya took Thanjavur about 850 CE and founded the later Chola line.\n2. Rajendra I ruled before Rajaraja I.\n3. Rajaraja I built the Brihadishwara Temple, completed about 1010 CE.\n4. A Chola fleet went to Srivijaya about 1025 CE.\n5. The Brihadishwara Temple is dedicated to Vishnu.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which numbered note gives the kings in the wrong order?', model: 'Note **2**: Rajaraja I ruled before Rajendra I.', sol: 'Note 2.', scheme: [['Note 2', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which numbered note gives the wrong deity, and who is the temple dedicated to?', model: 'Note **5**; the temple is dedicated to **Shiva**.', sol: 'Note 5; Shiva.', scheme: [['Note 5 and Shiva', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Write the corrected versions of the two wrong notes.', model: 'Rajaraja I ruled **before** Rajendra I, and the Brihadishwara Temple is dedicated to **Shiva**.', sol: 'Corrected order; Shiva.', scheme: [['Corrected note 2', 1], ['Corrected note 5', 1]] }), [
      short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Name the king who sent the fleet in note 4, and give one other achievement of his.', model: '**Rajendra I** sent the fleet. He also led an expedition to the **Ganga** and founded **Gangaikondacholapuram**.', sol: 'Rajendra I; Ganga expedition or capital.', scheme: [['Rajendra I', 1], ['One other achievement', 1]] }),
    ]),
  ],
}));
