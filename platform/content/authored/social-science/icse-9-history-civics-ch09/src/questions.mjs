// ICSE 9 History & Civics, ch09 The Sangam Age — question bank.
// Every ledger, museum label, excavation note, village note and trader below is imagined by SOYL and labelled as
// imagined; no textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No poem, kural,
// inscription or passage of any text is quoted or translated; the Tirukkural is described by structure and themes
// only. Dates are the commonly taught approximate ranges (Sangam Age about 300 BCE to 300 CE; books differ; the
// date of the Tirukkural is debated, often placed between about the 1st century BCE and the 5th century CE).
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
export const AGE = { sangam: [-300, 300], kural: [-100, 500] };
assert.ok(AGE.sangam[0] < AGE.sangam[1] && AGE.kural[0] < AGE.kural[1]);

/** The Sangam Age and the debated date range of the Tirukkural on one arrow (negative = BCE; approximate). */
export function timelineFigure(alt, caption) {
  const s = new Svg(720, 250);
  const X = (yr) => 40 + (yr - AGE.sangam[0]) * 0.8;
  const w1 = (AGE.sangam[1] - AGE.sangam[0]) * 0.8;
  s.rect(X(AGE.sangam[0]), 28, w1, 62, { rx: 8, fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.8 });
  s.text(X(AGE.sangam[0]) + w1 / 2, 52, 'The Sangam Age', { size: 15, bold: true });
  s.text(X(AGE.sangam[0]) + w1 / 2, 74, 'about 300 BCE to 300 CE', { size: 13 });
  const w2 = (AGE.kural[1] - AGE.kural[0]) * 0.8;
  s.rect(X(AGE.kural[0]), 104, w2, 62, { rx: 8, fill: 'green', fillOpacity: 0.12, color: 'green', sw: 1.8, dash: true });
  s.text(X(AGE.kural[0]) + w2 / 2, 128, 'Tirukkural: its date is debated', { size: 15, bold: true });
  s.text(X(AGE.kural[0]) + w2 / 2, 150, 'often placed about 100 BCE to 500 CE', { size: 13 });
  s.arrow(30, 186, 705, 186, { sw: 1.6 });
  [[-300, '300 BCE'], [0, '0'], [300, '300 CE'], [500, '500 CE']].forEach(([yr, lab]) => {
    s.line(X(yr), 180, X(yr), 192, { sw: 1.4 });
    s.text(X(yr), 206, lab, { size: 12 });
  });
  s.text(360, 234, 'Dates are approximate and vary between books; drawn roughly to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** The five tinai (landscapes) of the poems. */
export function tinaiFigure(alt, caption) {
  const s = new Svg(720, 235);
  const cols = [
    ['Kurinji', 'accent', ['Hills', 'Honey and', 'forest produce']],
    ['Mullai', 'green', ['Forest and', 'pasture', 'Herding cattle']],
    ['Marutam', 'blue', ['Farmland', 'Rice fields;', 'the most fertile']],
    ['Neytal', 'accent', ['The coast', 'Fishing, salt', 'and sea trade']],
    ['Palai', 'muted', ['Dry land', 'Hard to farm;', 'hot and barren']],
  ];
  cols.forEach(([title, col, lines], i) => {
    const x = 14 + i * 140;
    s.rect(x, 15, 132, 175, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + 66, 42, title, { size: 16, bold: true });
    s.line(x + 12, 60, x + 120, 60, { sw: 1, color: col });
    lines.forEach((t, k) => s.text(x + 66, 90 + k * 32, t, { size: 13 }));
  });
  s.text(360, 215, 'The five tinai are a way the poems describe landscapes; real places often mix them', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic map of ports and Madurai. */
export function portsFigure(alt, caption) {
  const s = new Svg(720, 440);
  s.text(110, 250, 'Arabian Sea', { size: 13, italic: true, muted: true });
  s.text(615, 330, 'Bay of Bengal', { size: 13, italic: true, muted: true });
  const pts = [
    [272, 300, 'Muziris (Chera)', 'end', 'accent'],
    [504, 240, 'Arikamedu', 'start', 'blue'],
    [461, 300, 'Puhar (Chola)', 'start', 'green'],
    [345, 340, 'Madurai', 'end', 'muted'],
    [400, 372, 'Korkai (Pandya)', 'start', 'accent'],
  ];
  pts.forEach(([x, y, name, anchor, col]) => {
    s.dot(x, y, 6, col);
    s.text(x + (anchor === 'start' ? 12 : -12), y, name, { size: 14, anchor, bold: true });
  });
  s.text(360, 425, 'Schematic, not to scale. Positions are approximate and only some places are shown', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Two-way overseas trade. */
export function tradeFigure(alt, caption) {
  const s = new Svg(720, 300);
  s.rect(15, 85, 190, 140, { rx: 10, fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.8 });
  ['South Indian', 'ports and', 'markets'].forEach((t, i) => s.text(110, 120 + i * 28, t, { size: 15, bold: i === 0 }));
  s.rect(515, 85, 190, 140, { rx: 10, fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.8 });
  ['Roman world,', 'West Asia and', 'South-East Asia'].forEach((t, i) => s.text(610, 120 + i * 28, t, { size: 15, bold: i === 0 }));
  s.text(360, 52, 'Exports: pepper, other spices, pearls,', { size: 12 });
  s.text(360, 72, 'ivory, fine cotton cloth, precious stones', { size: 12 });
  s.arrow(215, 120, 505, 120, { sw: 1.8 });
  s.arrow(505, 190, 215, 190, { sw: 1.8, color: 'green' });
  s.text(360, 218, 'Imports: Roman gold and silver coins,', { size: 12 });
  s.text(360, 238, 'wine in amphorae, glass, metals', { size: 12 });
  s.text(360, 282, 'Simplified; sailing was helped by the monsoon winds', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Sources: Tirukkural, Sangam literature, megaliths
Q('m_three_kingdoms', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A guide at an imagined museum of South Indian history lists the three ruling families of the Sangam Age on a wall panel. Which list is on the panel?',
  opts: ['The Cheras, the Cholas and the Pandyas', 'The Mauryas, the Guptas and the Cholas', 'The Pallavas, the Satavahanas and the Kushanas', 'The Cheras, the Mauryas and the Vakatakas'],
  sol: 'The three ruling families named in Sangam literature were the Cheras, Cholas and Pandyas. The Mauryas, Guptas, Satavahanas, Kushanas and Vakatakas ruled elsewhere or in other ages.',
}));
Q('m_sangam_tradition', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A teacher in an imagined school at Madurai says, "Tradition speaks of three Sangams." Which statement presents this correctly for a history exam?',
  opts: [
    'Tradition says assemblies of poets met at Madurai under Pandya patronage; it is a tradition, not a fully proved fact',
    'Historians have proved every detail of three Sangams with dated records',
    'The Sangams were meetings of kings from the north',
    'The Sangams were markets where goods were bartered',
  ],
  sol: 'The Sangams are remembered as assemblies of poets under Pandya patronage, but the details come from tradition. They were not proved in full, they were not northern kings, and they were not markets.',
}));
Q('m_kural_author', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A librarian in an imagined town library shelves a work of 1,330 couplets in 133 chapters of ten couplets each. To whom is this work attributed?',
  opts: ['Thiruvalluvar', 'Avvaiyar', 'Karikala', 'Ilango the merchant'],
  sol: 'The Tirukkural is attributed to Thiruvalluvar. Avvaiyar was a woman poet, Karikala was a Chola king, and the other name is not the attributed author of the Tirukkural.',
}));
Q('m_kural_parts', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A student club in the imagined Kaveripur school is sorting chapters of the Tirukkural by theme. A chapter on how a ruler should govern and how wealth should be managed would go under which part?',
  opts: ['Porul, the part on wealth and polity', 'Aram, the part on virtue', 'Inbam, the part on love', 'None, since the work has no parts'],
  sol: 'Governance and wealth belong to porul. Aram is virtue and inbam is love. The work has three parts, so it does have parts.',
}));
Q('m_kural_date', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'In an imagined history quiz, a contestant says, "The Tirukkural was certainly written in the year 50 BCE." Which reply is the most accurate?',
  opts: [
    'Its date is debated; it is often placed somewhere between about the 1st century BCE and the 5th century CE',
    'Correct, because every scholar agrees on 50 BCE',
    'Wrong, because it was written in the 20th century',
    'Wrong, because the Tirukkural is not a literary work',
  ],
  sol: 'Scholars differ on when the Tirukkural was composed, so a single exact year cannot be claimed. It is not a modern work, and it is a literary work.',
}));
Q('m_tolkappiyam', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A card in an imagined gallery reads: "An early work of Tamil grammar, studied by poets." Which Sangam-age work does the card describe?',
  opts: ['The Tolkappiyam', 'The Silappatikaram', 'The Pattuppattu', 'The Manimekalai'],
  sol: 'The Tolkappiyam is the work on grammar. The Pattuppattu is the collection of ten idylls, and the Silappatikaram and Manimekalai are epics usually placed just after the Sangam period.',
}));
Q('m_epics_after', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'A student writes that the Silappatikaram and the Manimekalai are Sangam works in the strict sense. How should a careful historian correct this?',
  opts: [
    'They are later epics, usually placed just after the Sangam period',
    'They are the oldest works of the Sangam Age',
    'They are books on grammar like the Tolkappiyam',
    'They are anthologies of eight books',
  ],
  sol: 'The two epics are usually placed just after the Sangam period. They are not the oldest works, not grammar, and the eight anthologies are the Ettuthogai.',
}));
Q('m_poem_caution', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'An imagined poem of the Sangam style praises a chief for feeding every visiting poet. What caution should a historian keep in mind before using it as evidence?',
  opts: [
    'Poets often praised their patrons, so the poem should be checked against other evidence',
    'Poems can never be used as evidence',
    'The poem must be accepted word for word',
    'A poem can only tell us about the weather',
  ],
  sol: 'Poets who depended on patrons tended to praise them, so a careful historian cross-checks. Poems are useful, though not to be accepted word for word, and they tell us about much more than weather.',
}));
Q('m_megalith_type', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Archaeologists in an imagined survey of Karuvur hills find a ring of large standing stones that marks a burial. What is this kind of megalith called?',
  opts: ['A stone circle', 'A dolmen only', 'A rock-cut cave', 'A temple tower'],
  sol: 'A ring of standing stones marking a burial is a stone circle. A dolmen is a chamber of large stones with a capstone, which is a different form; a cave and a tower are not burials.',
}));
Q('m_megalith_goods', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Excavators of an imagined stone-circle burial at Kalinagar find an iron blade, black-and-red pots and a few ornaments. What does this best suggest?',
  opts: [
    'The community used iron and may have believed in some form of life after death',
    'The community knew nothing about metals',
    'The burial belongs to a Roman merchant who sailed from Rome',
    'The pots prove that the people never farmed',
  ],
  sol: 'Iron tools and goods placed with the dead suggest the use of iron and a belief that the dead needed such things. They do not show ignorance of metals, a Roman burial, or that no one farmed.',
}));
Q('m_status_goods', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'In an imagined excavation, one cist contains only a few pots, while another in the same field contains many ornaments, iron weapons and a horse-like figurine. What can a historian cautiously say?',
  opts: [
    'The difference suggests differences in wealth or status within the community',
    'The two burials prove the community had no social differences',
    'The ornaments show the buried person was a Chola king',
    'Only the burial with pots is real',
  ],
  sol: 'Different quantities and kinds of grave goods suggest differences in status, though a careful historian says "suggests". They do not prove equality, do not name a king, and both burials are real.',
}));
Q('ar_megalith', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Black-and-red pottery is commonly found among the grave goods of megalithic burials.',
  r: 'The presence of such pottery proves that every buried person was a ruler.',
  sol: 'A is true: black-and-red ware is a typical grave good. R is false: pottery cannot prove rank, and many ordinary burials contain it.',
}));
Q('ar_kural', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'The Tirukkural has 1,330 couplets.',
  r: 'The Tirukkural is divided into three parts: aram, porul and inbam.',
  sol: 'Both statements are true, but the division into three parts does not explain why the total is 1,330 couplets.',
}));
Q('tf_sangam_proved', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Every detail of the three Sangams held at Madurai is established as historical fact by dated records.',
  sol: 'The Sangams come from tradition; historians do not treat every detail as proved.',
}));
Q('fb_aram', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The three parts of the Tirukkural are aram (virtue), porul (wealth and polity) and ___ (love).',
  acc: [['inbam', 'Inbam']],
  sol: 'The third part is inbam.',
}));
Q('mt_literature', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each work or group of works with what it is.',
  pairs: [
    ['Tolkappiyam', 'A work on grammar'],
    ['Ettuthogai', 'The Eight Anthologies'],
    ['Pattuppattu', 'The Ten Idylls'],
    ['Silappatikaram', 'A later epic, usually placed just after the Sangam period'],
  ],
  sol: 'The Tolkappiyam is on grammar, the Ettuthogai are eight anthologies, the Pattuppattu are ten idylls, and the Silappatikaram is a later epic.',
}));
Q('ord_kural_parts', ord({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'Arrange the three parts of the Tirukkural in the order in which they are usually listed.',
  items: ['Aram (virtue)', 'Porul (wealth and polity)', 'Inbam (love)'],
  sol: 'Virtue, then wealth and polity, then love.',
}));
Q('s_three_sangams', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does tradition say about the three Sangams, and why should the statement be treated with care?',
  model: 'Tradition speaks of **three Sangams**, assemblies of poets held at **Madurai** under **Pandya patronage**. It is a **tradition**, not a fully proved fact, so historians treat the details with care.',
  sol: 'Assemblies of poets at Madurai; tradition.',
  scheme: [['Three assemblies of poets at Madurai under Pandya patronage', 1], ['Treated as tradition, not established fact', 1]],
}));
Q('s_kural_structure', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Describe the structure of the Tirukkural in two points.',
  model: '1. It has **1,330 couplets (kurals)** arranged in **133 chapters** of ten couplets each.\n2. It has **three parts**: **aram** (virtue), **porul** (wealth and polity) and **inbam** (love).',
  sol: 'Couplets and chapters; three parts.',
  scheme: [['1,330 couplets in 133 chapters of ten', 1], ['Three parts named', 1]],
}));
Q('s_megalith_suggests', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined excavation at Kalinagar finds iron tools and ornaments with a burial. State two things such grave goods suggest about the people.',
  model: '1. They **suggest the use of iron** by the community.\n2. Goods placed with the dead **suggest a belief in life after death**; differences in the goods may also suggest **differences in status**.',
  sol: 'Iron; belief; status.',
  scheme: [['Use of iron', 1], ['Belief in life after death or difference in status', 1]],
}));
Q('s_megalith_types', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name two kinds of megalithic burial and one place known for one of them.',
  model: 'Two kinds are **stone circles** and **dolmens**; **cists** and **urn burials** are others. **Adichanallur** in Tamil Nadu is a well-known urn-burial site.',
  sol: 'Two kinds and one site.',
  scheme: [['Two kinds named', 1], ['Adichanallur or another correct site', 1]],
}));
Q('s_poem_use', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A historian at an imagined archive reads a Sangam-style poem about a bustling harbour. State one thing it can tell us and one caution in using it.',
  model: 'It can tell us about **trade and daily life** at a harbour. **Caution:** the poem is a **work of literature**, so it should be checked against **other evidence** such as excavations.',
  sol: 'One use; one caution.',
  scheme: [['One thing the poem can tell us', 1], ['Caution: literature; use other evidence', 1]],
}));
Q('s3_literature_tells', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name the main works of Sangam literature and state what they tell us about the period.',
  model: '1. The main works are the **Tolkappiyam** (grammar), the **Ettuthogai** (Eight Anthologies) and the **Pattuppattu** (Ten Idylls).\n2. They tell us about **kings and war**, **trade** and the **landscapes** of the region.\n3. They also show **daily life**; the later epics **Silappatikaram** and **Manimekalai** are usually placed just after the period.',
  sol: 'Works; what they tell us; later epics.',
  scheme: [['Works named', 1], ['Kings, war, trade, landscapes', 1], ['Daily life; later epics noted', 1]],
}));
Q('s3_kural_value', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain in three points why the Tirukkural is important to students of history and to readers today.',
  model: '1. It is attributed to **Thiruvalluvar**, though its **date is debated** (often placed between about the 1st century BCE and the 5th century CE).\n2. Its **three parts** deal with **virtue, wealth and polity, and love**.\n3. It is valued as a **guide to ethics and conduct**.',
  sol: 'Author and date; three parts; guide to conduct.',
  scheme: [['Author; date debated', 1], ['Three parts', 1], ['Guide to ethics and conduct', 1]],
}));
Q('s3_megalith_evidence', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A museum label in an imagined gallery says: "Megalithic burials tell us how early South Indians lived." In three points, say how far this is fair.',
  model: '1. It is **partly fair**: grave goods such as **iron tools** and **black-and-red pottery** suggest the use of iron and a belief in life after death.\n2. Differences in the goods **suggest differences in status**.\n3. But burials show **how people were buried**, not their whole lives, so they must be read with **literature** and other evidence.',
  sol: 'Partly fair; what they suggest; limits.',
  scheme: [['What the goods suggest', 1], ['Status differences suggested', 1], ['Limits; use other evidence', 1]],
}));

// ================================================================ t02 Women in Sangam society
Q('m_avvaiyar_name', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'An imagined exhibition on women poets mentions Avvaiyar. Which statement about the name is correct?',
  opts: [
    'The name was used by more than one poet across different periods',
    'Only one person ever used the name, in a single year',
    'It is the name of a Chola king',
    'It is the name of a port',
  ],
  sol: 'The name Avvaiyar was used by more than one poet across periods, so historians are careful to say which poet is meant. It is not a king or a port.',
}));
Q('m_women_work', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Students of the imagined Kaveripur school list tasks done by women in a marutam village according to the poems. Which list fits the evidence best?',
  opts: [
    'Farming tasks, spinning and weaving, and selling goods',
    'Commanding armies on all frontiers',
    'Governing every port as a Chera king',
    'None, since women worked only indoors',
  ],
  sol: 'The poems show women taking part in farming, spinning, weaving and selling goods. They do not show women commanding every army or ruling every port, and they were not confined to indoor tasks.',
}));
Q('m_women_education', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'What does the existence of women poets in Sangam literature suggest about education?',
  opts: [
    'Some women received education and could compose poetry',
    'No woman was ever taught anything',
    'All women attended the same school as every man',
    'Poetry was forbidden',
  ],
  sol: 'Women who composed poems must have been educated, so the evidence suggests that some women received education. It does not mean all women or all men studied together, and poetry was not forbidden.',
}));
Q('m_widow_poems', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'An imagined student reads that Sangam poems praise women poets, mention women farming and weaving, and also describe hardships faced by widows. Which conclusion about women in Sangam society fits all of this evidence best?',
  opts: [
    'Women\'s position was mixed: some were educated and many worked, but widows faced hardships',
    'All women enjoyed complete equality with men in every respect',
    'Women took no part in learning or in economic life',
    'The poems tell us nothing about women\'s lives',
  ],
  sol: 'The evidence points both ways: women poets and women\'s work show education and economic roles, while the poems also describe the hardships of widows. So the position was mixed; complete equality, no role at all, or no information do not fit the evidence.',
}));
Q('ar_women_work', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Women of the Sangam Age took no part in any economic activity.',
  r: 'The poems mention women taking part in farming, spinning, weaving and selling goods.',
  sol: 'A is false. R is true: the poems show women engaged in several kinds of work, which contradicts the assertion.',
}));
Q('tf_women_poets', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Women poets such as Avvaiyar contributed to Sangam literature.',
  sol: 'Avvaiyar, Nachchellaiyar and Kakkaipadiniyar are among the women poets remembered.',
}));
Q('s_women_poets', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name any two women poets of the Sangam tradition and say what the name Avvaiyar warns a historian about.',
  model: 'Two women poets are **Avvaiyar** and **Nachchellaiyar** (Kakkaipadiniyar is another). The name **Avvaiyar** was used by **more than one poet** across periods, so one must be careful which poet is meant.',
  sol: 'Two names; Avvaiyar used by more than one poet.',
  scheme: [['Two women poets named', 1], ['Avvaiyar used by more than one poet', 1]],
}));
Q('s_women_roles', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'In an imagined village note, a woman is described spinning cotton while her neighbour sells baskets in the market. Which two economic roles of women do these show?',
  model: 'Spinning (and weaving) shows the part played by women in **textile work**, and selling baskets shows women taking part in **trade in markets**. Women also worked in **farming**.',
  sol: 'Spinning and selling.',
  scheme: [['Spinning or weaving', 1], ['Selling goods', 1]],
}));
Q('s3_women_position', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the position of women in Sangam society in three points.',
  model: '1. **Women poets** such as **Avvaiyar** contributed to literature, which suggests that some women were educated.\n2. Women took part in **farming, spinning, weaving and selling goods**.\n3. The poems also describe the **hardships of widows**, so the picture is mixed.',
  sol: 'Poets; work; mixed picture.',
  scheme: [['Women poets; education', 1], ['Economic roles', 1], ['Hardships of widows noted', 1]],
}));
Q('s3_women_evidence', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A student at an imagined seminar says that poems alone give a complete picture of the lives of women. Give three points to evaluate this view.',
  model: '1. The poems are **valuable evidence**: they show women as poets, workers and sellers.\n2. But many poets were **themselves from particular groups**, so they may not show the life of every woman.\n3. A historian should **compare poems with other evidence**, so the view is only **partly fair**.',
  sol: 'Value; limits; compare evidence.',
  scheme: [['Value of the poems', 1], ['Limits of the poets', 1], ['Compare with other evidence', 1]],
}));

// ================================================================ t03 Agriculture
Q('m_tinai_marutam', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In the poems of the Sangam Age, which of the five tinai stood for fertile farmland?',
  opts: ['Marutam', 'Kurinji', 'Neytal', 'Palai'],
  sol: 'Marutam was the fertile farmland. Kurinji was hills, neytal the coast and palai dry land.',
}));
Q('m_tinai_scenario', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A poet in an imagined story describes a place of dry, cracked ground where travellers hurry across a hot plain. Which tinai does the poet describe?',
  opts: ['Palai', 'Marutam', 'Mullai', 'Neytal'],
  sol: 'Dry land is palai. Marutam is farmland, mullai is forest and pasture, and neytal is the coast.',
}));
Q('m_tinai_coast', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined fisher family of Nilakkarai sells fish and salt near the shore and sails to meet traders. Which tinai fits their home?',
  opts: ['Neytal', 'Kurinji', 'Marutam', 'Mullai'],
  sol: 'Neytal is the coastal landscape. Kurinji is hills, marutam farmland, and mullai forest and pasture.',
}));
Q('m_spices', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined spice farmer of the hill country grows pepper, ginger, turmeric and cardamom. Why would traders of the ports want these crops?',
  opts: ['They were in demand as spices, including in overseas trade', 'They could only be used as roof tiles', 'They were useless to traders', 'They were used only as fuel'],
  sol: 'Spices such as pepper were valued in markets and overseas. They were not tiles, were not worthless, and were not just fuel.',
}));
Q('m_kallanai', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'A guide at an imagined display on irrigation describes the Kallanai (Grand Anicut) on the Kaveri. Which statement is correctly worded?',
  opts: [
    'It is traditionally attributed to the Chola king Karikala, about the 2nd century CE',
    'It was certainly built by Karikala in the year 150 CE',
    'It is a Roman port',
    'It is a Pandya book of poems',
  ],
  sol: 'The attribution to Karikala is traditional, and the date is given as about the 2nd century CE. It is not a certain year, a port or a book.',
}));
Q('m_marutam_surplus', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'Why would an imagined chief at Kaveripur want to protect the tanks and river channels of the marutam lands?',
  opts: [
    'They supported rice cultivation, so protecting them helped the food supply and the economy',
    'They were used only for decoration',
    'They were enemies of the people',
    'They helped only the palai lands',
  ],
  sol: 'Water from tanks and rivers made rice farming possible on marutam lands, which fed people and supported trade. They were not mere decoration, harmful, or for palai lands.',
}));
Q('tf_tinai_palai', tf({
  t: 3, d: 2, c: 'recall', ans: false,
  stem: 'True or false? In the poems, palai stands for fertile farmland.',
  sol: 'Palai stands for dry land; marutam is the fertile farmland.',
}));
Q('tf_kallanai', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The Kallanai on the Kaveri is traditionally attributed to the Chola king Karikala.',
  sol: 'The attribution is traditional and the date is given as about the 2nd century CE.',
}));
Q('fb_kaveri', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The Kallanai (Grand Anicut) is built across the river ___.',
  acc: [['Kaveri', 'Cauvery']],
  sol: 'It is on the Kaveri.',
}));
Q('mt_tinai', match({
  t: 3, d: 2, c: 'recall', marks: 3,
  stem: 'Match each tinai with its landscape.',
  pairs: [
    ['Kurinji', 'Hills'],
    ['Mullai', 'Forest and pasture'],
    ['Marutam', 'Farmland'],
    ['Neytal', 'Coast'],
    ['Palai', 'Dry land'],
  ],
  sol: 'Kurinji is hills, mullai forest and pasture, marutam farmland, neytal coast and palai dry land.',
}));
Q('s_tinai_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name any two of the five tinai and state the landscape each stands for.',
  model: '**Marutam** stands for **farmland**, and **neytal** for the **coast**. (Kurinji is hills, mullai is forest and pasture, and palai is dry land.)',
  sol: 'Two tinai with landscapes.',
  scheme: [['First tinai with landscape', 1], ['Second tinai with landscape', 1]],
}));
Q('s_irrigation', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two sources of irrigation in the Sangam Age and name one famous work on the Kaveri.',
  model: 'Farmers irrigated from **tanks** and **rivers**. The **Kallanai (Grand Anicut)** on the **Kaveri** is **traditionally attributed** to the Chola king **Karikala**.',
  sol: 'Tanks, rivers; Kallanai.',
  scheme: [['Tanks and rivers', 1], ['Kallanai on the Kaveri', 1]],
}));
Q('s_village_note', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined village in the Kaveri region has two tanks and a river channel, and its farmers grow rice and sugarcane. Which tinai does it belong to, and why?',
  model: 'It belongs to **marutam**, the **fertile farmland**. The **tanks and river channels** supply water throughout the year, so **rice and sugarcane**, which need plenty of water, grow well there and a surplus can go to the market.',
  sol: 'Marutam; farmland and water.',
  scheme: [['Marutam identified', 1], ['Reason: farmland with water', 1]],
}));
Q('s3_agriculture', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe agriculture in the Sangam Age in three points.',
  model: '1. **Rice** was the main crop; others were **sugarcane**, **cotton**, **millets** and **spices**.\n2. **Marutam** was the fertile farmland.\n3. Fields were watered from **tanks and rivers**; the **Kallanai** on the Kaveri is **traditionally attributed** to Karikala, about the 2nd century CE.',
  sol: 'Crops; marutam; irrigation.',
  scheme: [['Crops', 1], ['Marutam', 1], ['Irrigation and the Kallanai, hedged', 1]],
}));
Q('s3_tinai_economy', short({
  t: 3, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Choose any three tinai and show how each landscape shaped the way people earned a living.',
  model: '1. **Marutam**, farmland: people grew **rice and sugarcane**.\n2. **Neytal**, the coast: people **fished, made salt and traded**.\n3. **Mullai**, forest and pasture: people **herded cattle**. (Kurinji gave honey and forest produce; palai was hard to farm.)',
  sol: 'Three tinai and their livelihoods.',
  scheme: [['First tinai and livelihood', 1], ['Second tinai and livelihood', 1], ['Third tinai and livelihood', 1]],
}));

// ================================================================ t04 Trade, ports and the Roman world
Q('m_port_muziris', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Which Chera port on the Kerala coast was a well-known centre of the pepper trade?',
  opts: ['Muziris', 'Korkai', 'Puhar', 'Arikamedu'],
  sol: 'Muziris was the Chera port on the Kerala coast. Korkai was a Pandya port, Puhar a Chola port, and Arikamedu is near Puducherry.',
}));
Q('m_port_korkai', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined trader in a ledger notes that his best pearls came from a southern Pandya port. Which port is he most likely to have written?',
  opts: ['Korkai', 'Puhar', 'Muziris', 'Arikamedu'],
  sol: 'Korkai was the Pandya port known for pearls. Puhar was Chola, Muziris was Chera, and Arikamedu was an Indo-Roman trading site.',
}));
Q('m_arikamedu', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'An imagined museum card says: "A trading site near Puducherry, excavated in the 1940s, with goods linking South India and the Roman world." Which site is described?',
  opts: ['Arikamedu', 'Adichanallur', 'Madurai', 'Kallanai'],
  sol: 'Arikamedu is the Indo-Roman trading site near Puducherry excavated in the 1940s. Adichanallur is an urn-burial site, Madurai a Pandya centre, and Kallanai a dam.',
}));
Q('m_imports', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined trader at Muziris unloads jars of wine, a crate of glass and a bag of gold coins from a ship that arrived from the Roman world. What are these goods?',
  opts: ['Imports', 'Exports', 'Local barter goods only', 'Tax paid to the Cheras only'],
  sol: 'Goods that arrive from abroad are imports. They are not exports, which leave the region, and nothing in the list says that they were local barter or tax.',
}));
Q('m_coin_hoard', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'In an imagined dig near a Chera town, archaeologists find a pot filled with Roman gold and silver coins. What does this most directly suggest?',
  opts: [
    'Overseas trade linked the region with the Roman world',
    'The Romans ruled the town for a thousand years',
    'The town made its own coins only',
    'Coins were used only for decoration',
  ],
  sol: 'Roman coins in South India suggest trade with the Roman world. They do not prove Roman rule, and a hoard of Roman coins is not locally made or merely decoration.',
}));
Q('m_internal_trade', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'At an imagined market in a marutam town, a farmer trades a sack of rice for a bundle of cloth with no coins changing hands. What kind of internal trade is this?',
  opts: ['Barter', 'Overseas trade', 'A tax payment', 'Banking'],
  sol: 'Exchanging goods for goods is barter. It was not overseas trade, a tax or banking.',
}));
Q('m_periplus', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'A museum label in an imagined gallery mentions the Periplus of the Erythraean Sea. How is this work best described?',
  opts: [
    'A 1st-century CE Greek guide for sailors that names some of the ports',
    'A Chera king\'s book of laws',
    'A poem by Avvaiyar',
    'A Roman map of the Kaveri',
  ],
  sol: 'It was a Greek guide for sailors from the 1st century CE which names some South Indian ports. It was not a Chera law book, a poem by Avvaiyar or a map of the Kaveri.',
}));
Q('ar_roman_coins', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Hoards of Roman gold and silver coins have been found in South India.',
  r: 'These coins suggest that South India had overseas trade with the Roman world.',
  sol: 'Both are true. Coins from Rome found in South India are evidence that goods and money moved between the two regions, so R explains why the hoards matter.',
}));
Q('ar_monsoon', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Sailors from the ports of the Chera country could cross the Arabian Sea in a regular season.',
  r: 'Seasonal monsoon winds helped to drive ships.',
  sol: 'Both are true. The seasonal winds made regular crossings possible, so R explains A.',
}));
Q('fb_yavana', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The term used in Sangam literature for Greeks, Romans and other West Asian traders was ___.',
  acc: [['Yavanas', 'Yavana', 'yavanas', 'yavana']],
  sol: 'They were called Yavanas.',
}));
Q('mt_ports', match({
  t: 4, d: 2, c: 'recall', marks: 2,
  stem: 'Match each port with its kingdom or what it was known for.',
  pairs: [
    ['Puhar (Kaveripattinam)', 'Chola port'],
    ['Muziris', 'Chera port on the Kerala coast'],
    ['Korkai', 'Pandya port known for pearls'],
    ['Arikamedu', 'Indo-Roman trading site near Puducherry'],
  ],
  sol: 'Puhar was Chola, Muziris Chera, Korkai a Pandya port of pearls, and Arikamedu an Indo-Roman site.',
}));
Q('ord_pepper_route', ord({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'In an imagined story, a sack of pepper travels overseas. Arrange the steps in order.',
  items: ['Pepper is grown and picked in the hills', 'It is carried to a port such as Muziris', 'It is loaded on a ship and sails with the monsoon', 'It is sold to traders in the Roman world'],
  sol: 'Grown, carried to the port, shipped with the monsoon, then sold abroad.',
}));
Q('s_ports_named', short({
  t: 4, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name two ports of the Sangam Age and the kingdom each belonged to.',
  model: '**Puhar** (Kaveripattinam) was a **Chola** port, and **Muziris** was a **Chera** port. (**Korkai** was a **Pandya** port known for pearls.)',
  sol: 'Two ports with kingdoms.',
  scheme: [['First port with kingdom', 1], ['Second port with kingdom', 1]],
}));
Q('s_exports_imports', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two exports and two imports of the Sangam Age.',
  model: 'Exports: **pepper** and **pearls** (also spices, ivory, fine cotton cloth and precious stones). Imports: **Roman gold and silver coins** and **wine** (also glass and metals).',
  sol: 'Two exports and two imports.',
  scheme: [['Two exports', 1], ['Two imports', 1]],
}));
Q('s_arikamedu', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was Arikamedu and why is it important to historians?',
  model: '**Arikamedu**, near **Puducherry**, was an **Indo-Roman trading site** excavated in the **1940s**. It is important because it shows **links with the Roman world**.',
  sol: 'Indo-Roman trading site; links with Rome.',
  scheme: [['Indo-Roman trading site near Puducherry', 1], ['Importance: links with the Roman world', 1]],
}));
Q('s_barter', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In an imagined market, a potter gives three pots to a farmer for a measure of millet. Name this kind of trade and say how it differs from overseas trade.',
  model: 'This is **barter**, a form of **internal trade**, which is the **exchange of goods for goods**. **Overseas trade** went **across the sea** to places such as the Roman world.',
  sol: 'Barter; internal versus overseas.',
  scheme: [['Barter / internal trade', 1], ['Difference: overseas crosses the sea', 1]],
}));
Q('s3_internal_overseas', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain in three points the importance of internal and overseas trade in the Sangam Age.',
  model: '1. **Internal trade** by **barter and markets** moved rice, salt and cloth between landscapes.\n2. **Overseas trade** linked the region with the **Roman world, South-East Asia and West Asia**.\n3. It brought **wealth** to ports such as **Puhar and Muziris** and to those who sold **pepper, pearls and cloth**.',
  sol: 'Internal; overseas; wealth.',
  scheme: [['Internal trade', 1], ['Overseas links', 1], ['Wealth for ports and producers', 1]],
}));
Q('s3_roman_evidence', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three kinds of evidence for trade between South India and the Roman world.',
  model: '1. **Hoards of Roman gold and silver coins** found in South India.\n2. **Arikamedu**, an Indo-Roman trading site, and finds such as **wine jars (amphorae)** and **glass**.\n3. The **Periplus of the Erythraean Sea** (1st century CE), a Greek guide for sailors, and Sangam poems which name **Yavana** traders.',
  sol: 'Coins; excavations; texts.',
  scheme: [['Coin hoards', 1], ['Excavated site and finds', 1], ['Written sources', 1]],
}));
Q('s3_ledger', short({
  t: 4, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined ledger of the trader Valavan records: pepper and pearls sold to a ship\'s captain, and amphorae of wine and gold coins taken in return. In three points, explain what the ledger shows.',
  model: '1. **Pepper and pearls** are **exports**, because they leave the region and are sold to the captain of a ship.\n2. **Wine** and **gold coins** are **imports**, because they arrive from abroad as goods and payment.\n3. Together they show **two-way overseas trade**, probably with the **Roman world**, carried on through a **port**.',
  sol: 'Exports; imports; two-way trade.',
  scheme: [['Exports identified', 1], ['Imports identified', 1], ['Two-way trade through a port', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_sources', long({
  t: 1, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Sangam literature and the Tirukkural are important sources of the period.\n\n(i) Name three works or groups of works of Sangam literature. **[3]**\n(ii) Describe the structure and the main themes of the Tirukkural. **[3]**\n(iii) Explain what these works tell us about the period, and one caution in using them. **[4]**',
  model: '(i) The **Tolkappiyam** (a work on grammar), the **Ettuthogai** (Eight Anthologies) and the **Pattuppattu** (Ten Idylls).\n\n(ii) The **Tirukkural**, attributed to **Thiruvalluvar**, has **1,330 couplets** in **133 chapters** of ten. Its three parts are **aram** (virtue), **porul** (wealth and polity) and **inbam** (love). It is valued as a guide to **ethics and conduct**.\n\n(iii) These works tell us about **kings and war**, **trade**, **landscapes** and **daily life**. The later epics **Silappatikaram** and **Manimekalai** are usually placed just after the period. **Caution:** the works are literature, often praise patrons, and the **date of the Tirukkural is debated**, so they are read with other evidence.',
  sol: 'Works; structure and themes; what they tell us and a caution.',
  scheme: [['(i) Three works named', 3], ['(ii) Structure', 1.5], ['(ii) Three parts and themes', 1.5], ['(iii) What they tell us', 2], ['(iii) Caution', 2]],
}));
Q('l_megaliths', long({
  t: 1, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Megalithic burials are an important source for early South Indian society.\n\n(i) What are megaliths? Name three kinds of burial. **[3]**\n(ii) State the grave goods found and the place known for urn burials. **[3]**\n(iii) What do these burials suggest about the people, and what are the limits of this evidence? **[4]**',
  model: '(i) **Megaliths** are burials marked with **large stones**. Three kinds are **stone circles**, **dolmens** and **cists**; **urn burials** are another.\n\n(ii) Grave goods include **iron tools and weapons**, **black-and-red pottery** and **ornaments**. **Adichanallur** in Tamil Nadu is a well-known urn-burial site.\n\n(iii) The burials **suggest the use of iron**, a **belief in life after death** and **differences in status**, shown by the goods. The evidence has **limits**: burials show how the dead were buried rather than all of life, and not every burial contains the same goods, so any conclusion is a careful suggestion. Historians therefore read burials **with literature** and other sources before drawing a picture of early South Indian society.',
  sol: 'Meaning and kinds; goods and site; what they suggest and limits.',
  scheme: [['(i) Meaning', 1], ['(i) Three kinds', 2], ['(ii) Grave goods', 2], ['(ii) Adichanallur', 1], ['(iii) What they suggest', 2], ['(iii) Limits', 2]],
}));
Q('l_women', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Women appear in many of the poems of the Sangam Age.\n\n(i) Name two women poets and say what the name Avvaiyar tells us. **[3]**\n(ii) Describe the work that women did. **[3]**\n(iii) Explain what the poems suggest about education and about hardships faced by some women, and why they must be read with care. **[4]**',
  model: '(i) **Avvaiyar** and **Nachchellaiyar** (also Kakkaipadiniyar) contributed to Sangam literature. The name **Avvaiyar** was used by **more than one poet** across periods.\n\n(ii) Women took part in **farming**, **spinning and weaving**, and **selling goods** in markets. This shows that women were not limited to the home but also contributed to the economy of villages, towns and ports.\n\n(iii) That women composed poems **suggests that some women were educated**. The poems also describe the **hardships of widows**. These are **literary sources** written by particular poets, so they show only part of the picture and must be read with **care** and with other evidence. A balanced answer mentions the women who composed poetry, the women who worked and the hardships of widows, giving each its place.',
  sol: 'Poets; work; education and hardships with a caution.',
  scheme: [['(i) Two poets named', 2], ['(i) Avvaiyar note', 1], ['(ii) Three kinds of work', 3], ['(iii) Education', 1.5], ['(iii) Hardships of widows', 1], ['(iii) Caution', 1.5]],
}));
Q('l_agriculture', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Agriculture was an important part of the Sangam economy.\n\n(i) Name the five tinai and say which was fertile farmland. **[3]**\n(ii) Name the main crops of the period. **[3]**\n(iii) Describe irrigation in the Sangam Age, including the Kallanai and how the attribution should be worded. **[4]**',
  model: '(i) The five tinai are **kurinji** (hills), **mullai** (forest and pasture), **marutam** (farmland), **neytal** (coast) and **palai** (dry land). **Marutam** was the fertile farmland.\n\n(ii) **Rice** was the main crop. Others were **sugarcane**, **cotton**, **millets**, and spices such as **pepper**, **ginger**, **turmeric** and **cardamom**.\n\n(iii) Fields were irrigated from **tanks** and **rivers**. The **Kallanai (Grand Anicut)** on the **Kaveri** is **traditionally attributed** to the Chola king **Karikala**, about the **2nd century CE**. It is worded as traditional because the attribution rests on tradition and the exact date is not certain. Water from such works supported rice cultivation on marutam lands, which fed the people and produced a surplus for markets and trade.',
  sol: 'Tinai; crops; irrigation and the Kallanai.',
  scheme: [['(i) Five tinai named', 2], ['(i) Marutam', 1], ['(ii) Rice as main crop', 1], ['(ii) Other crops', 2], ['(iii) Tanks and rivers', 1.5], ['(iii) Kallanai, hedged and dated', 2.5]],
}));
Q('l_trade', long({
  t: 4, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Trade made the Sangam kingdoms prosperous.\n\n(i) Name three ports and the kingdom or feature of each. **[3]**\n(ii) List the main exports and imports of overseas trade. **[3]**\n(iii) Explain the importance of internal and overseas trade, with evidence of links with the Roman world. **[4]**',
  model: '(i) **Puhar** (Kaveripattinam) was a **Chola** port, **Muziris** a **Chera** port on the Kerala coast, and **Korkai** a **Pandya** port known for **pearls**. **Arikamedu** near Puducherry was an Indo-Roman trading site.\n\n(ii) **Exports:** pepper, other spices, pearls, ivory, fine cotton cloth and precious stones. **Imports:** Roman gold and silver coins, wine in amphorae, glass and metals.\n\n(iii) **Internal trade** by **barter and markets** moved goods between landscapes; **overseas trade** linked the region with the **Roman world, South-East Asia and West Asia**, helped by the **monsoon winds**. Evidence includes **hoards of Roman coins**, the excavated site at **Arikamedu**, and the **Periplus of the Erythraean Sea**.',
  sol: 'Ports; exports and imports; importance and evidence.',
  scheme: [['(i) Three ports with kingdom or feature', 3], ['(ii) Exports', 1.5], ['(ii) Imports', 1.5], ['(iii) Internal and overseas trade', 2], ['(iii) Evidence of Roman links', 2]],
}));
Q('l_overseas', long({
  t: 4, d: 4, c: 'application', marks: 10, wl: L10,
  stem: 'An imagined trader\'s ledger of Puhar lists pepper, pearls and cotton cloth sent out, and Roman coins, wine in amphorae and glass brought in.\n\n(i) Say which entries are exports and which are imports. **[3]**\n(ii) Name two ports that could appear in such a ledger and the people called Yavanas. **[3]**\n(iii) Explain how the monsoon winds and the ports helped the trade, and what the Roman coins found in South India suggest. **[4]**',
  model: '(i) **Exports:** pepper, pearls and fine cotton cloth. **Imports:** Roman gold and silver coins, wine in amphorae and glass.\n\n(ii) **Puhar** (Chola) and **Muziris** (Chera) could appear. **Yavanas** was the term for **Greeks, Romans and other West Asian traders**.\n\n(iii) The **monsoon winds** let sailors cross the sea in season, and **ports** gave ships a place to load and unload. Hoards of **Roman gold and silver coins** found in South India **suggest** that goods were exchanged with the **Roman world** in a flourishing two-way trade. Such a ledger therefore shows how a port town brought together local producers, markets and foreign traders, and why ports such as Puhar and Muziris grew rich.',
  sol: 'Exports and imports; ports and Yavanas; monsoon and coins.',
  scheme: [['(i) Exports', 1.5], ['(i) Imports', 1.5], ['(ii) Two ports', 1.5], ['(ii) Yavanas', 1.5], ['(iii) Monsoon and ports', 2], ['(iii) Coins suggest trade with Rome', 2]],
}));
Q('l_evaluate', long({
  t: [1, 2, 4], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'An imagined student claims: "Because poems praise kings and traders, nothing in Sangam literature can be trusted as history."\n\n(i) Name three kinds of information that Sangam literature gives. **[3]**\n(ii) Name two other kinds of evidence, apart from literature, for the period. **[3]**\n(iii) Evaluate the claim: how far is it fair, and how should a historian use poems and other evidence together? **[4]**',
  model: '(i) Sangam literature tells us about **kings and war**, **trade**, **landscapes (tinai)** and **daily life**, including the lives of **women**.\n\n(ii) **Megalithic burials** and their grave goods, and **excavated sites** such as **Arikamedu** with **Roman coin hoards**.\n\n(iii) The claim is **partly fair**: poets often **praised patrons**, so some details may be **exaggerated**. But the poems also give **useful detail**, and they can be **checked against** burials, coins and excavations. A historian therefore uses **literature and archaeology together**, noting the **limits** of each and saying **about** with dates. In this way the student is right to be careful, but wrong to reject all the evidence, because a balanced historian weighs every source instead of trusting or discarding it entirely.',
  sol: 'Information; other evidence; balanced evaluation.',
  scheme: [['(i) Three kinds of information', 3], ['(ii) Two other kinds of evidence', 3], ['(iii) Why partly fair', 2], ['(iii) How to use sources together', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_ledger', source({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined trader's ledger and answer the questions that follow. ${IMAG}`,
  passage: '**Ledger page of Valavan, a port trader of the imagined harbour town of Kadalpuram**\n\nDay 3: Received forty sacks of pepper from hill growers. Sold ten sacks of pepper and a string of pearls to a captain from a Yavana ship.\n\nDay 5: Took in twelve jars of wine and a small chest of gold coins in payment. The captain said the winds were right for sailing before the next season changed.\n\nDay 6: Rice and salt traded in the town market for cotton cloth; no coins used.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Who are the Yavanas in this ledger?', model: '**Greeks, Romans and other West Asian traders** (here the captain\'s ship).', sol: 'Greeks, Romans and West Asian traders.', scheme: [['Greeks, Romans and West Asian traders', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the kind of internal trade shown on Day 6.', model: '**Barter**: goods exchanged for goods with no coins.', sol: 'Barter.', scheme: [['Barter', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name two exports and two imports recorded in the ledger.', model: '**Exports:** **pepper** and **pearls**. **Imports:** **wine** and **gold coins**.', sol: 'Two exports and two imports.', scheme: [['Two exports', 1], ['Two imports', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does the captain\'s remark about the winds tell us about overseas trade?', model: 'It shows that **seasonal monsoon winds** helped sailors cross the sea, so **voyages followed the seasons**.', sol: 'Monsoon winds; seasonal sailing.', scheme: [['Monsoon winds helped sailing', 1], ['Voyages followed the seasons', 1]] }),
    ]),
  ],
}));
Q('sb_excavation', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined excavation notes and answer the questions that follow. ${IMAG}`,
  passage: '**Notes from an imagined excavation at Kalinagar, written by a school project team**\n\nA ring of large standing stones surrounds a burial. Inside we found an iron blade, black-and-red pots and a few ornaments. In a second burial nearby we found only two pots. No writing was found at either burial.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'application', marks: 1, stem: 'Name the kind of megalith described in the first sentence.', model: 'A **stone circle**.', sol: 'Stone circle.', scheme: [['Stone circle', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name one grave good that suggests the use of iron.', model: 'The **iron blade**.', sol: 'Iron blade.', scheme: [['Iron blade', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): What may the difference between the two burials suggest, and why should the team say "suggest"?', model: 'It may **suggest a difference in status or wealth**. The team should say **suggest** because there is **no writing** to confirm it, and the burials give **only part** of the picture.', sol: 'Status difference; caution.', scheme: [['Difference in status or wealth', 1], ['Why caution: no writing; part of the picture', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two things the grave goods suggest about the beliefs and technology of the people.', model: 'Goods placed with the dead **suggest a belief in life after death**, and the **iron blade suggests the use of iron**.', sol: 'Belief; iron.', scheme: [['Belief in life after death', 1], ['Use of iron', 1]] }),
    ]),
  ],
}));
Q('sb_village_notes', source({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined school notes on a village and answer the questions that follow. ${IMAG}`,
  passage: '**Class IX project notes on the imagined village of Marutapuram**\n\nThe village lies on fertile ground beside a river channel, with a large tank. Families grow rice and sugarcane. Women help in the fields and spin cotton thread, and some sell thread and cloth in the market. A woman of the village, who is said to compose songs, is much respected. The notes also mention that a widow in the village faces difficulties and is helped by her neighbours.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which tinai does the village belong to?', model: '**Marutam**, the fertile farmland.', sol: 'Marutam.', scheme: [['Marutam', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name one source of irrigation mentioned in the notes.', model: 'The **tank** (or the **river channel**).', sol: 'Tank or river channel.', scheme: [['Tank or river channel', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Name two economic roles of women shown in the notes.', model: 'Women **help in the fields** and **spin cotton thread**; some **sell thread and cloth** in the market.', sol: 'Two roles.', scheme: [['First role', 1], ['Second role', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The notes are imagined. Why would a historian still want other evidence about women of the real Sangam Age?', model: 'The notes are **one imagined account**, so they cannot show every woman\'s life. A historian compares **poems** by women and others with **other evidence** to build a **balanced picture**.', sol: 'One account; compare sources.', scheme: [['One account is not enough', 1], ['Compare poems with other evidence', 1]] }),
    ]),
  ],
}));
