// Build ICSE 9 History & Civics ch16 The Modern Age in Europe: Reformation. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch16/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch16', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (own drawings, schematic)
function boxes(s, list) {
  list.forEach(([x, y, w, h, col, title, lines]) => {
    s.rect(x, y, w, h, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + w / 2, y + 22, title, { size: 14, bold: true });
    lines.forEach((t, k) => s.text(x + w / 2, y + 46 + k * 18, t, { size: 12 }));
  });
}

function causesWeb(alt, caption) {
  const s = new Svg(720, 340);
  // connectors first, boxes and centre on top
  s.line(160, 124, 300, 160, { sw: 1.5, color: 'muted' });
  s.line(560, 124, 420, 160, { sw: 1.5, color: 'muted' });
  s.line(160, 218, 300, 190, { sw: 1.5, color: 'muted' });
  s.line(560, 218, 420, 190, { sw: 1.5, color: 'muted' });
  boxes(s, [
    [10, 10, 300, 114, 'blue', 'Church practices objected to', ['Sale of indulgences; sale of offices', 'Wealth and taxes, such as the tithe', 'Worldly lives of some clergy', 'Church courts; services in Latin']],
    [410, 10, 300, 114, 'green', 'The new learning', ['Renaissance spirit of enquiry', 'Humanists such as Erasmus', 'Printing: ideas and Bibles spread']],
    [10, 218, 300, 112, 'accent', 'Earlier reformers', ['John Wycliffe, England', '(14th century)', 'Jan Hus, Bohemia', '(early 15th century)']],
    [410, 218, 300, 112, 'accent', 'Rulers and merchants', ['Rulers of nation-states wanted', 'control of Church lands and posts', 'Merchants resented Church taxes']],
  ]);
  s.rect(290, 142, 140, 66, { rx: 12, fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 2.2 });
  s.text(360, 166, 'The Reformation', { size: 15, bold: true });
  s.text(360, 188, 'begins in 1517', { size: 13 });
  return s.visual(alt, caption);
}

function timelineFig(alt, caption) {
  const s = new Svg(720, 300);
  const X = (yr) => 40 + ((yr - 1510) * 640) / 60;
  s.rect(X(1545), 136, X(1563) - X(1545), 28, { rx: 4, fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 1.4 });
  s.arrow(30, 150, 704, 150, { sw: 1.8 });
  const ev = [
    [1517, 'up1', '1517', 'Ninety-five Theses', 'green', 'start'],
    [1521, 'dn1', '1521', 'Diet of Worms', 'green', 'start'],
    [1534, 'up2', '1534', 'Act of Supremacy', 'blue', 'start'],
    [1540, 'dn2', '1540', 'Jesuits approved', 'accent', 'start'],
    [1555, 'dn1', '1555', 'Peace of Augsburg', 'green', 'start'],
  ];
  const Yt = { up1: 44, up2: 96, dn1: 206, dn2: 256 };
  ev.forEach(([yr, tier, a, b, col, anc]) => {
    const x = X(yr);
    const y = Yt[tier];
    const up = tier.startsWith('up');
    s.line(x, 150, x, up ? y + 20 : y - 20, { sw: 1.4, color: col });
    s.dot(x, 150, 5, col);
    s.text(x + 6, y, a, { size: 14, bold: true, anchor: anc });
    s.text(x + 6, y + (up ? 17 : 17), b, { size: 13, anchor: anc });
  });
  s.text(X(1554), 118, '1545 to 1563', { size: 12, anchor: 'middle' });
  s.text((X(1545) + X(1563)) / 2, 150, 'Council of Trent', { size: 12 });
  s.text(360, 288, 'Drawn to scale from 1510 to 1570; the shaded bar is the Council of Trent', { size: 11, muted: true });
  return s.visual(alt, caption);
}

function teachingsChart(alt, caption) {
  const s = new Svg(720, 270);
  s.rect(160, 10, 400, 40, { rx: 10, fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 2 });
  s.text(360, 31, 'Main teachings of Martin Luther', { size: 16, bold: true });
  const cols = [
    ['Salvation by faith', '', ['Forgiveness comes', 'through faith, not', 'by buying', 'indulgences']],
    ['The Bible', '', ['The Bible is the', 'main authority', 'for belief']],
    ['Priesthood', 'of all believers', ['Every believer may', 'approach God', 'directly']],
    ['Fewer sacraments', '', ['Baptism and', 'communion are', 'kept']],
    ['Local language', '', ['Services and the', 'Bible in the', 'language of', 'the people']],
  ];
  cols.forEach(([t1, t2, lines], i) => {
    const x = 8 + i * 142;
    s.line(x + 66, 50, x + 66, 78, { sw: 1.4, color: 'muted' });
    s.rect(x, 78, 132, 176, { rx: 10, fill: i % 2 ? 'green' : 'blue', fillOpacity: 0.12, color: i % 2 ? 'green' : 'blue', sw: 1.8 });
    s.text(x + 66, 100, t1, { size: 13, bold: true });
    if (t2) s.text(x + 66, 117, t2, { size: 13, bold: true });
    lines.forEach((t, k) => s.text(x + 66, 148 + k * 20, t, { size: 12 }));
  });
  return s.visual(alt, caption);
}

function counterFlow(alt, caption) {
  const s = new Svg(720, 330);
  s.rect(60, 10, 600, 40, { rx: 10, fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 2 });
  s.text(360, 31, 'Aim: reform the Church and check Protestantism', { size: 15, bold: true });
  const items = [
    ['Council of Trent', '1545 to 1563', 'Doctrines reaffirmed', 'Seminaries, discipline'],
    ['Society of Jesus', 'Approved 1540', 'Education and', 'missions'],
    ['The Index', 'A list of books', 'Catholics were told', 'not to read'],
    ['Church courts', 'Against heresy', '(the Inquisition)', ''],
  ];
  items.forEach(([t, a, b, c], i) => {
    const x = 12 + i * 177;
    s.arrow(x + 82, 50, x + 82, 82, { sw: 1.4, color: 'muted' });
    s.rect(x, 86, 165, 120, { rx: 10, fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.8 });
    s.text(x + 82, 108, t, { size: 14, bold: true });
    s.text(x + 82, 138, a, { size: 12 });
    s.text(x + 82, 158, b, { size: 12 });
    if (c) s.text(x + 82, 178, c, { size: 12 });
    s.arrow(x + 82, 206, x + 82, 246, { sw: 1.4, color: 'muted' });
  });
  s.rect(60, 250, 600, 64, { rx: 10, fill: 'green', fillOpacity: 0.14, color: 'green', sw: 2 });
  s.text(360, 272, 'Result: a reformed Catholic Church,', { size: 14, bold: true });
  s.text(360, 295, 'strong in southern Europe', { size: 14, bold: true });
  return s.visual(alt, caption);
}

const vWeb = causesWeb('Causes web: the Reformation at the centre, with four boxes around it: Church practices objected to, the new learning, earlier reformers, and rulers and merchants', 'Causes of the Reformation at a glance.');
const vTimeline = timelineFig('A time arrow from 1510 to 1570 drawn to scale: Ninety-five Theses 1517, Diet of Worms 1521, Act of Supremacy 1534, Jesuits approved 1540, Peace of Augsburg 1555, and a shaded bar for the Council of Trent from 1545 to 1563', 'Key dates, 1517 to 1563 (to scale).');
const vTeach = teachingsChart('Chart of the main teachings of Martin Luther: salvation by faith, the Bible as the main authority, priesthood of all believers, fewer sacraments and services in the local language', 'Luther\'s main teachings.');
const vCounter = counterFlow('Flow chart: the aim of reforming the Church and checking Protestantism leads to four measures, the Council of Trent, the Society of Jesus, the Index and the Church courts against heresy, and these lead to a reformed Catholic Church strong in southern Europe', 'Measures of the Counter Reformation.');

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Meaning and date', 'Church practices critics objected to', 'The new learning', 'Other causes'], 'Route map of Part 1: the meaning and date of the Reformation, the Church practices critics objected to, the new learning, and other causes', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Luther\'s protest', 'His teachings and their effects', 'Other reformers', 'The Counter Reformation'], 'Route map of Part 2: Luther\'s protest, his teachings and their effects, other reformers, and the Counter Reformation', 'Part 2 at a glance');
const vMeaning = table(['Point', 'Fact'], [
  ['What it was', 'A 16th-century movement in Western Christianity'],
  ['What it did', 'Protested against certain practices of the Roman Catholic Church'],
  ['What it led to', 'The formation of Protestant churches'],
  ['When it began', 'In 1517'],
], 'Table on the Reformation: a sixteenth-century movement in Western Christianity that protested against certain practices of the Roman Catholic Church, led to Protestant churches, and began in 1517');
const vIndSim = table(['Practice', 'What it was', 'What critics said'], [
  ['Sale of indulgences', 'Certificates said to reduce punishment for sins', 'Forgiveness seemed to be sold for money'],
  ['Sale of Church offices (simony)', 'Offices given for payment', 'Posts went to those who paid, not those best suited'],
], 'Table of two practices critics objected to: the sale of indulgences, certificates said to reduce punishment for sins, and simony, the sale of Church offices, with what critics said about each');
const vOther = table(['Practice', 'What critics objected to'], [
  ['Wealth and taxes', 'The great wealth of the Church and taxes such as the tithe'],
  ['Worldly lives', 'Some clergy lived in ways critics thought unsuited to their calling'],
  ['Church courts', 'Their authority over many matters of daily life'],
  ['Latin', 'Services and the Bible in Latin, which ordinary people did not understand'],
], 'Table of four further practices: the wealth and taxes of the Church, the worldly lives of some clergy, the authority of Church courts, and services and the Bible in Latin');
const vScenes = table(['Imagined scene', 'Practice or cause'], [
  ['A farmer in Linden hands over a tenth of his grain', 'Wealth and taxes (the tithe)'],
  ['A post in Lindenmark goes to whoever pays most', 'Sale of Church offices (simony)'],
  ['A villager in Linden holds a certificate bought from a seller', 'Sale of indulgences'],
  ['A shepherd cannot follow the Latin in his village church', 'Services in Latin'],
], 'Table sorting four imagined scenes: a tenth of grain is the tithe, a post to the highest payer is simony, a bought certificate is an indulgence, and Latin not understood is the language criticism');
const vEnquiry = flow('LR', ['Renaissance spirit of enquiry', 'People question authority', 'Church practices are examined'], 'Flow: the Renaissance spirit of enquiry led people to question authority, so Church practices were examined', 'The spirit of enquiry.');
const vErasmus = table(['Point', 'Fact'], [
  ['Who', 'Erasmus, a Dutch humanist scholar'],
  ['Work', 'The Praise of Folly (about 1511)'],
  ['Contribution', 'His writings criticised abuses and encouraged people to question'],
], 'Table on Erasmus: a Dutch humanist scholar, author of The Praise of Folly about 1511, whose writings criticised abuses and encouraged people to question');
const vPrint = flow('LR', ['Scribes copy by hand: slow', 'The printing press makes many copies', 'Pamphlets and Bibles spread quickly'], 'Flow: scribes copy by hand slowly, the printing press makes many copies, and pamphlets and Bibles spread quickly', 'Printing.');
const vEarlier = table(['Reformer', 'Country', 'Time', 'Note'], [
  ['John Wycliffe', 'England', '14th century', 'An English translation of the Bible'],
  ['Jan Hus', 'Bohemia', 'Early 15th century', 'Also questioned some Church practices'],
], 'Table of two earlier reformers: John Wycliffe in England in the fourteenth century, with an English translation of the Bible, and Jan Hus in Bohemia in the early fifteenth century');
const vRulers = flow('LR', ['Nation-states grow stronger', 'Rulers want control of Church lands and appointments', 'Merchants resent Church taxes'], 'Flow: nation-states grow stronger, rulers want control of Church lands and appointments, and merchants resent Church taxes', 'Rulers and merchants.');
const vGroups = table(['Group of cause', 'Examples'], [
  ['Church practices', 'Indulgences, simony, wealth and taxes, worldly lives, courts, Latin'],
  ['New learning', 'Renaissance spirit of enquiry, Erasmus, printing'],
  ['Earlier reformers', 'Wycliffe in England, Hus in Bohemia'],
  ['Political and economic', 'Rulers of nation-states, merchants'],
], 'Table grouping the causes: Church practices, the new learning, earlier reformers, and political and economic causes, each with examples');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three practices critics objected to'],
  ['(ii)', '3', 'Renaissance, Erasmus, printing'],
  ['(iii)', '4', 'Rulers, merchants, Wycliffe and Hus'],
], 'Table planning a ten-mark answer: part (i) three practices for 3 marks, part (ii) the new learning for 3 marks, part (iii) rulers, merchants and earlier reformers for 4 marks');
const vWords = table(['Instead of', 'Write'], [
  ['The Church was corrupt', 'Critics objected to certain practices, such as the sale of indulgences'],
  ['The reformers were rebels', 'Reformers protested against certain practices and proposed changes'],
  ['Protestants were right', 'Protestant churches formed from the movement'],
], 'Table of neutral wording: instead of saying the Church was corrupt, write that critics objected to certain practices; instead of calling reformers rebels, write that they protested and proposed changes; instead of saying Protestants were right, write that Protestant churches formed');

const vLuther = table(['Point', 'Fact'], [
  ['Name', 'Martin Luther (1483 to 1546)'],
  ['Country', 'Germany'],
  ['Position', 'A monk and a professor at Wittenberg'],
  ['Known for', 'The Ninety-five Theses (1517)'],
], 'Table of facts on Martin Luther: 1483 to 1546, German, a monk and professor at Wittenberg, known for the Ninety-five Theses of 1517');
const vThesis = flow('LR', ['Johann Tetzel sells indulgences in Germany', 'Luther makes the Ninety-five Theses public, 1517', 'Protest against the sale of indulgences', 'Printing spreads the ideas'], 'Flow: Johann Tetzel sells indulgences in Germany, Luther makes the Ninety-five Theses public in 1517, the protest is against the sale of indulgences, and printing spreads the ideas', 'The protest of 1517.');
const vWorms = flow('LR', ['Excommunicated by Pope Leo X, 1521', 'Diet of Worms, 1521: refuses to take back his views', 'Protected by Frederick of Saxony', 'Translates the New Testament into German'], 'Flow: excommunicated by Pope Leo X in 1521, refuses to take back his views at the Diet of Worms in 1521, is protected by Frederick of Saxony, and translates the New Testament into German', 'From 1521 onwards.');
const vTeachTable = table(['Teaching', 'Meaning', 'Contrast with the practice objected to'], [
  ['Salvation by faith', 'Forgiveness through faith', 'Not by buying indulgences'],
  ['The Bible', 'The main authority', 'Rather than Church offices alone'],
  ['Priesthood of all believers', 'Every believer may approach God directly', 'No priest as a necessary go-between'],
  ['Fewer sacraments', 'Baptism and communion', 'Fewer than the Catholic Church counts'],
  ['Local language', 'Services and Bible in the language of the people', 'Instead of Latin'],
], 'Table of five teachings of Luther with meaning and contrast: salvation by faith, the Bible as authority, priesthood of all believers, baptism and communion, and services in the local language');
const vSceneTeach = table(['Imagined scene', 'Teaching'], [
  ['A pastor in Nordburg reads a German Bible aloud at the Sunday service', 'Local language; Bible as authority'],
  ['A miller says he trusts in faith, not in a bought certificate', 'Salvation by faith'],
  ['A teacher says any believer may read and pray without a priest as go-between', 'Priesthood of all believers'],
  ['A parish keeps only baptism and communion as sacraments', 'Fewer sacraments'],
], 'Table matching four imagined scenes to Luther\'s teachings: a German Bible read aloud, trust in faith, any believer may pray directly, and only baptism and communion kept');
const vEffects = flow('LR', ['Lutheran churches spread in northern Germany and Scandinavia', 'Western Christianity is divided', 'Peace of Augsburg, 1555'], 'Flow: Lutheran churches spread in northern Germany and Scandinavia, Western Christianity is divided, and the Peace of Augsburg of 1555 follows', 'Effects of Luther\'s protest.');
const vAugs = table(['Question', 'Answer'], [
  ['Year', '1555'],
  ['Who chose the faith of a state?', 'Its ruler'],
  ['Which faiths could he choose?', 'Lutheran or Catholic'],
  ['What did it show?', 'Lutheranism was recognised beside Catholicism'],
], 'Table on the Peace of Augsburg of 1555: the ruler chose the faith of his state, either Lutheran or Catholic, and Lutheranism was recognised beside Catholicism');
const vOthers = table(['Reformer or act', 'Place', 'One line'], [
  ['Zwingli', 'Zurich', 'A reformer who worked in Zurich'],
  ['Calvin', 'Geneva', 'A reformer who worked in Geneva'],
  ['Henry VIII', 'England', 'The Act of Supremacy (1534) made the king head of the Church of England'],
], 'Table of other reformers: Zwingli in Zurich, Calvin in Geneva, and Henry VIII in England with the Act of Supremacy of 1534 making the king head of the Church of England');
const vTrent = table(['Decision of the Council of Trent (1545 to 1563)', 'Aim'], [
  ['Reaffirmed Catholic doctrines', 'Clear teaching'],
  ['Stopped the sale of indulgences for money', 'Remove a practice critics objected to'],
  ['Better training of priests in seminaries', 'Better trained clergy'],
  ['Insisted on discipline among the clergy', 'Better conduct'],
], 'Table of four decisions of the Council of Trent from 1545 to 1563: doctrines reaffirmed, sale of indulgences for money stopped, seminaries for priests, and discipline among the clergy');
const vJesuits = table(['Point', 'Fact'], [
  ['Name', 'Society of Jesus (Jesuits)'],
  ['Founder', 'Ignatius Loyola'],
  ['Approved', '1540'],
  ['Work', 'Education and missions'],
  ['Example', 'Francis Xavier in Asia (see Chapter 14)'],
], 'Table on the Society of Jesus: the Jesuits, founded by Ignatius Loyola, approved in 1540, working in education and missions, for example Francis Xavier in Asia');
const vIndex = table(['Measure', 'What it was'], [
  ['The Index', 'A list of books that Catholics were told not to read'],
  ['The Inquisition', 'Church courts that dealt with heresy, meaning belief the Church considered contrary to its teaching'],
  ['Result', 'A reformed Catholic Church, strong in southern Europe'],
], 'Table: the Index was a list of books Catholics were told not to read, the Inquisition means Church courts dealing with heresy, and the result was a reformed Catholic Church strong in southern Europe');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Meaning; two decisions of Trent'],
  ['(ii)', '3', 'Jesuits: founder, 1540, education, missions'],
  ['(iii)', '4', 'Index, Inquisition, two results'],
], 'Table planning a ten-mark answer: part (i) meaning and two decisions of the Council of Trent for 3 marks, part (ii) the Jesuits for 3 marks, part (iii) the Index, the Inquisition and two results for 4 marks');
const vCompare = table(['', 'Reformation', 'Counter Reformation'], [
  ['Who', 'Luther and other reformers', 'The Catholic Church'],
  ['Aim', 'Change certain practices', 'Reform itself; check Protestantism'],
  ['Key steps', 'Theses 1517; teachings; churches', 'Trent; Jesuits; Index; courts'],
  ['Result', 'Protestant churches', 'Reformed, strong in the south'],
], 'Table comparing the Reformation and the Counter Reformation on who, aim, key steps and result');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Reformation: Part 1 — Meaning and Causes',
  goals: [
    'Define the Reformation and state when it began',
    'Explain the practices of the Church that critics objected to',
    'Explain the role of the new learning, earlier reformers, rulers and merchants',
  ],
  slides: [
    sl('title', 'The Reformation: meaning and causes', {
      b: 'Part 1 — what the Reformation was and why it began.',
      v: vRoute1,
      n: 'In this part we learn what the Reformation was and why it began in fifteen seventeen. We study the practices of the Church that critics objected to, the new learning, and other causes such as rulers, merchants and earlier reformers. For every tradition we use respectful and neutral words.',
    }),
    sl('diagram', 'What was the Reformation?', {
      b: 'Learn this definition well; it is a favourite exam point.',
      v: vMeaning,
      n: 'The Reformation was a movement of the sixteenth century in Western Christianity. It protested against certain practices of the Roman Catholic Church and led to the formation of Protestant churches. It began in the year fifteen seventeen. Notice the careful word certain: the protest was about particular practices.',
    }),
    sl('diagram', 'Causes at a glance', {
      b: 'Four groups of causes worked together.',
      v: vWeb,
      n: 'Look at the web. Four groups of causes worked together. There were practices of the Church that critics objected to. There was the new learning. There were earlier reformers. And there were rulers and merchants with their own interests. No single cause explains everything.',
    }),
    sl('concept', 'Practices critics objected to: indulgences and offices', {
      bl: [
        '**Indulgences**: certificates said to reduce punishment for sins.',
        '**Simony**: the sale of Church offices.',
        'Critics objected that these seemed to put a price on forgiveness and posts.',
      ],
      v: vIndSim,
      n: 'First, indulgences. These were certificates said to reduce punishment for sins, and critics objected to their sale for money. Second, simony, which means the sale of Church offices. Critics said posts could go to those who paid rather than to those best suited. Always say critics objected, which keeps your wording neutral.',
    }),
    sl('concept', 'Practices critics objected to: wealth, lives, courts, Latin', {
      bl: [
        'The **great wealth and taxes** of the Church, such as the **tithe**.',
        'The **worldly lives** of some clergy.',
        '**Church courts**.',
        'Services and the Bible in **Latin**.',
      ],
      v: vOther,
      n: 'Critics also pointed to the great wealth and taxes of the Church, such as the tithe, which was about one tenth of produce or income. They noted the worldly lives of some clergy, and the authority of Church courts. And they observed that services and the Bible were in Latin, which ordinary people did not understand.',
    }),
    sl('check', 'Quick check: a certificate', {
      b: 'Name the practice, and say why critics objected.',
      chk: 'm_indulgence',
      n: 'Read about the baker and his certificate. Name the practice, and then think about what critics objected to in its sale.',
    }),
    sl('example', 'Worked example 1: from scene to practice', {
      b: 'Read the scene, find the practice, then state it neutrally.',
      bl: [
        'Step 1 — What exactly is happening?',
        'Step 2 — Is it money, a post, a tax or a language?',
        'Step 3 — Name the practice.',
        'Step 4 — Write: critics objected to this.',
      ],
      v: vScenes,
      n: 'Use four steps. First, see what exactly is happening. Second, decide whether it is about money, a post, a tax or a language. Third, name the practice. Fourth, write that critics objected to it. A tenth of grain is the tithe. A post for the highest payer is simony. A bought certificate is an indulgence.',
    }),
    sl('concept', 'The new learning: the spirit of enquiry', {
      b: 'The **Renaissance** is only background here: its spirit of enquiry encouraged people to **question authority**.',
      v: vEnquiry,
      n: 'The Renaissance was a movement of new learning. Here we need only its spirit of enquiry. People were encouraged to ask questions and to question authority, and so they also began to examine Church practices. The Renaissance has its own chapter. For now, treat it as background.',
    }),
    sl('concept', 'Erasmus and the humanists', {
      bl: [
        '**Humanist** scholars studied old writings with care.',
        '**Erasmus** was a **Dutch** scholar.',
        'His work **The Praise of Folly** (about **1511**) criticised abuses.',
      ],
      v: vErasmus,
      n: 'Humanist scholars studied old writings with great care. One famous humanist was Erasmus, a Dutch scholar. His book The Praise of Folly, written about fifteen eleven, criticised abuses. Remember that Erasmus did not found a Protestant church; he contributed by encouraging people to question.',
    }),
    sl('concept', 'Printing', {
      b: '**Printing** spread critical ideas and Bibles **quickly**.',
      v: vPrint,
      n: 'Before printing, books were copied by hand, which was slow. A printing press could make many copies in a short time. Pamphlets and Bibles could therefore reach many more readers, and critical ideas spread quickly across towns and countries.',
    }),
    sl('check', 'Quick check: printing', {
      b: 'Decide whether the assertion and the reason are true.',
      chk: 'ar_printing',
      n: 'Check each statement on its own first. Then ask whether the reason explains the assertion.',
    }),
    sl('concept', 'Earlier reformers', {
      b: 'Dissatisfaction was not new. Remember the two names and their countries.',
      v: vEarlier,
      n: 'Unease with certain practices was older than Luther. John Wycliffe in England, in the fourteenth century, is remembered for an English translation of the Bible. Jan Hus in Bohemia, in the early fifteenth century, also questioned some Church practices. For your exam, the names, countries and times are enough.',
    }),
    sl('concept', 'Rulers and merchants', {
      bl: [
        '**Rulers** of growing nation-states wanted control over **Church lands** and **appointments**.',
        '**Merchants** resented Church **taxes**.',
      ],
      v: vRulers,
      n: 'Not every cause was about belief. Rulers of growing nation states wanted control over Church lands and over appointments in their kingdoms. Merchants resented the taxes they paid to the Church, which reduced their profits. These interests joined the religious causes.',
    }),
    sl('example', 'Worked example 2: sort the causes', {
      b: 'Place each cause in its group.',
      bl: [
        'Step 1 — Is it about Church practice, learning, history or interests?',
        'Step 2 — Put it in the group.',
        'Step 3 — Check you have all four groups.',
      ],
      v: vGroups,
      n: 'To revise, sort the causes into four groups. Church practices include indulgences, simony, wealth and taxes, worldly lives, courts and Latin. The new learning includes the spirit of enquiry, Erasmus and printing. Earlier reformers are Wycliffe and Hus. And political and economic causes are rulers and merchants.',
    }),
    sl('check', 'Quick check: spot the result', {
      b: 'Find the item that is a later result, not a cause.',
      chk: 'm_not_cause',
      n: 'Think about dates. A cause comes before the Reformation or at its start. Which item came after?',
    }),
    sl('example', 'Worked example 3: planning a 10-mark answer', {
      b: 'Question: (i) Three practices objected to. [3] (ii) The new learning. [3] (iii) Rulers, merchants, earlier reformers. [4]',
      bl: [
        '(i) Indulgences, simony, wealth and taxes.',
        '(ii) Enquiry, Erasmus, printing.',
        '(iii) Rulers; merchants; Wycliffe and Hus.',
        'One clear point for each mark.',
      ],
      v: vPlan1,
      n: 'Plan a ten mark answer in three parts. Part one gives three practices that critics objected to. Part two explains the new learning with the spirit of enquiry, Erasmus and printing. Part three covers rulers, merchants and the earlier reformers Wycliffe and Hus. Give one clear point for each mark.',
    }),
    sl('check', 'Quick check: match scene and cause', {
      b: 'Match each scene with its cause.',
      chk: 'mt_causes_scenes',
      n: 'Use the groups of causes you have just learned. Match each scene with the cause it shows.',
    }),
    sl('diagram', 'Writing about the causes neutrally', {
      b: 'Neutral wording earns marks and shows respect.',
      v: vWords,
      n: 'In a history answer, avoid sweeping words. Instead of saying the Church was corrupt, write that critics objected to certain practices. Instead of calling reformers rebels, write that they protested and proposed changes. Instead of saying one side was right, write that Protestant churches formed. This is both accurate and respectful.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        '**Reformation**: a 16th-century movement; began in **1517**; led to **Protestant** churches.',
        'Practices critics objected to: **indulgences**, **simony**, **wealth and taxes**, **worldly lives**, **courts**, **Latin**.',
        'New learning: **enquiry**, **Erasmus**, **printing**.',
        'Also: **Wycliffe** and **Hus**, **rulers**, **merchants**.',
      ],
      v: vGroups,
      n: 'To sum up. The Reformation was a sixteenth century movement that began in fifteen seventeen and led to Protestant churches. Critics objected to practices such as indulgences, simony, wealth and taxes, worldly lives, courts and Latin. The new learning, earlier reformers, rulers and merchants also played a part.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Say **about** with approximate dates; give **1517** for the beginning.',
        'Write **critics objected to**, never sweeping words.',
        'Group causes into **practices, learning, earlier reformers, interests**.',
        'Name **Erasmus** with **The Praise of Folly**; name **Wycliffe** and **Hus** with countries.',
        'Mention the Renaissance only as **background**.',
      ],
      n: 'Some exam habits. Add the word about to approximate dates, and give fifteen seventeen for the beginning. Write that critics objected, never use sweeping words. Group the causes. Name Erasmus with his book, and Wycliffe and Hus with their countries. Mention the Renaissance only as background.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Reformation: Part 2 — Martin Luther and the Counter Reformation',
  goals: [
    'Describe Luther\'s protest, his main teachings and their effects',
    'Name the other reformers in one line each',
    'Explain the measures of the Counter Reformation',
  ],
  slides: [
    sl('title', 'Martin Luther and the Counter Reformation', {
      b: 'Part 2 — a protest, its teachings and effects, and the Catholic response.',
      v: vRoute2,
      n: 'In this part we meet Martin Luther and study his protest, his teachings and their effects. We name the other reformers. Then we study the measures that the Catholic Church took in the Counter Reformation.',
    }),
    sl('diagram', 'Key dates, 1517 to 1563', {
      b: 'Use this timeline as your map for the whole part.',
      v: vTimeline,
      n: 'Here is the timeline, drawn to scale. In fifteen seventeen the Ninety five Theses. In fifteen twenty one the Diet of Worms. In fifteen thirty four the Act of Supremacy in England. In fifteen forty the Jesuits were approved. The Council of Trent met from fifteen forty five to fifteen sixty three. In fifteen fifty five came the Peace of Augsburg.',
    }),
    sl('concept', 'Martin Luther', {
      bl: [
        'Lived from **1483** to **1546**.',
        'A German **monk** and **professor** at **Wittenberg**.',
      ],
      v: vLuther,
      n: 'Martin Luther lived from fourteen eighty three to fifteen forty six. He was a German monk and a professor at the university of Wittenberg. In history, he is remembered for the protest he made public in fifteen seventeen, and for the teachings that followed from it.',
    }),
    sl('concept', '1517: the Ninety-five Theses', {
      b: 'Johann Tetzel was selling indulgences in Germany. Luther made public his **Ninety-five Theses** against their sale.',
      v: vThesis,
      n: 'In fifteen seventeen, Johann Tetzel was selling indulgences in Germany. Luther made public the Ninety five Theses, which were statements for debate against the sale of indulgences. Printing carried his ideas quickly to many readers. Remember: the Theses protested against the sale, and you do not need to learn their text.',
    }),
    sl('concept', '1521 and after', {
      bl: [
        '**Pope Leo X** excommunicated Luther (**1521**).',
        'At the **Diet of Worms** (**1521**) he refused to take back his views.',
        '**Frederick of Saxony** protected him.',
        'He translated the **New Testament** into German, and later the whole Bible.',
      ],
      v: vWorms,
      n: 'In fifteen twenty one, Pope Leo the Tenth excommunicated Luther. At the Diet of Worms, an assembly of German princes and officials, Luther refused to take back his views. Frederick of Saxony protected him. During this time he translated the New Testament into German, and later the whole Bible.',
    }),
    sl('check', 'Quick check: the assembly of 1521', {
      b: 'Name the assembly and the monk.',
      chk: 'm_worms',
      n: 'Read the clerk\'s diary. Think about the year, the place and who refused to take back his writings.',
    }),
    sl('concept', 'Luther\'s main teachings', {
      b: 'Five teachings: **faith**, the **Bible**, **priesthood of all believers**, **fewer sacraments**, **local language**.',
      v: vTeach,
      n: 'Look at the chart of five teachings. Salvation by faith. The Bible as the main authority. The priesthood of all believers. Fewer sacraments, namely baptism and communion. And services in the language of the people. Learn all five, because an exam may ask for any three.',
    }),
    sl('diagram', 'The teachings explained', {
      b: 'Each teaching also answers a practice that critics had objected to.',
      v: vTeachTable,
      n: 'Take each teaching in turn. Salvation by faith means forgiveness through faith, and not by buying indulgences. The Bible is the main authority. Priesthood of all believers means every believer may approach God directly. Two sacraments are kept, baptism and communion. And the language of the people replaces Latin in services and in the Bible.',
    }),
    sl('example', 'Worked example 4: from scene to teaching', {
      b: 'Read the scene, find the idea, name the teaching.',
      bl: [
        'Step 1 — What do people do or say?',
        'Step 2 — Is it about faith, the Bible, believers, sacraments or language?',
        'Step 3 — Name the teaching.',
        'Step 4 — Say what practice it answers.',
      ],
      v: vSceneTeach,
      n: 'Use four steps. See what people do or say. Decide whether it is about faith, the Bible, believers, sacraments or language. Name the teaching, and say what practice it answers. A German Bible read aloud shows the language teaching. Trust in faith, not in a bought certificate, shows salvation by faith.',
    }),
    sl('concept', 'Effects of Luther\'s protest', {
      bl: [
        '**Lutheran churches** spread in northern Germany and Scandinavia.',
        'Western Christianity was **divided**.',
        'The **Peace of Augsburg** followed in **1555**.',
      ],
      v: vEffects,
      n: 'Lutheran churches spread in northern Germany and in the lands of Scandinavia. Western Christianity was divided between Catholic and Protestant churches. In fifteen fifty five came the Peace of Augsburg. These are the three main effects you should be able to describe.',
    }),
    sl('concept', 'The Peace of Augsburg (1555)', {
      b: 'Each ruler in the German states chose **Lutheran** or **Catholic** faith for his **state**.',
      v: vAugs,
      n: 'By the Peace of Augsburg in fifteen fifty five, each ruler in the German states chose either the Lutheran or the Catholic faith for his state. This recognised Lutheranism beside Catholicism. Notice that the ruler chose, and not each villager. This is a common point to check.',
    }),
    sl('concept', 'Other reformers, one line each', {
      b: 'Add one line each to your answer.',
      v: vOthers,
      n: 'Other reformers followed Luther. Zwingli worked in Zurich. Calvin worked in Geneva. In England, Henry the Eighth issued the Act of Supremacy in fifteen thirty four, which made the king head of the Church of England. One line for each is enough.',
    }),
    sl('check', 'Quick check: match the reformers', {
      b: 'Match each name with its description.',
      chk: 'mt_reformers',
      n: 'Use the table of other reformers. Match each name with the right place or act.',
    }),
    sl('diagram', 'The Counter Reformation', {
      b: 'The **Catholic Church** reformed itself and checked the spread of Protestantism. Also called the **Catholic Reformation**.',
      v: vCounter,
      n: 'The Counter Reformation, also called the Catholic Reformation, means the measures by which the Catholic Church reformed itself and checked the spread of Protestantism. The chart shows four measures: the Council of Trent, the Society of Jesus, the Index, and Church courts against heresy. The result was a reformed Church.',
    }),
    sl('concept', 'The Council of Trent (1545 to 1563)', {
      v: vTrent,
      bl: [
        '**Reaffirmed** Catholic doctrines.',
        '**Stopped** the sale of indulgences for money.',
        'Required **seminaries** and **discipline**.',
      ],
      n: 'The Council of Trent met from fifteen forty five to fifteen sixty three. It reaffirmed Catholic doctrines. It stopped the sale of indulgences for money. It required better training of priests in seminaries and insisted on discipline among the clergy. These are the four decisions to remember.',
    }),
    sl('concept', 'The Society of Jesus', {
      v: vJesuits,
      bl: [
        'Founded by **Ignatius Loyola**; approved **1540**.',
        'Worked in **education** and **missions**.',
        '**Francis Xavier** worked in Asia.',
      ],
      n: 'The Society of Jesus, whose members are called Jesuits, was founded by Ignatius Loyola and approved in fifteen forty. Its members worked in education and missions. Francis Xavier, for example, worked in Asia, which links with Chapter Fourteen. Remember the founder, the year and the two kinds of work.',
    }),
    sl('check', 'Quick check: a Jesuit school', {
      b: 'In which fields did the Jesuits mainly work?',
      chk: 'm_jesuits',
      n: 'Think about what a school and a missionary letter tell you about the work of the Jesuits.',
    }),
    sl('concept', 'The Index, the Inquisition and the results', {
      v: vIndex,
      bl: [
        'The **Index**: a list of books Catholics were told not to read.',
        'The **Inquisition**: Church courts that dealt with heresy.',
        '**Results**: a reformed Church, strong in southern Europe.',
      ],
      n: 'The Index was a list of books that Catholics were told not to read. The Inquisition means the Church courts that dealt with questions of heresy, which is belief the Church considered contrary to its teaching. Results: the Catholic Church was reformed, and remained strong in southern Europe.',
    }),
    sl('example', 'Worked example 5: planning a 10-mark answer', {
      b: 'Question: (i) Meaning; two decisions of Trent. [3] (ii) The Jesuits. [3] (iii) Index, Inquisition, two results. [4]',
      bl: [
        '(i) Meaning, then two decisions.',
        '(ii) Founder, 1540, education, missions.',
        '(iii) Index; courts; reformed and strong in the south.',
      ],
      v: vPlan2,
      n: 'Plan this answer in three parts. Part one states the meaning of the Counter Reformation and two decisions of the Council of Trent. Part two covers the Jesuits: founder, the year fifteen forty, education and missions. Part three names the Index and the Inquisition, and gives two results.',
    }),
    sl('check', 'Quick check: match the measures', {
      b: 'Match each measure with its description.',
      chk: 'mt_counter',
      n: 'Use the chart of measures. Match the Council, the Society, the Index and the Inquisition with their descriptions.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**Luther**: Wittenberg; Theses **1517**; excommunicated and Worms **1521**; German Bible.',
        '**Teachings**: faith, Bible, priesthood of all believers, two sacraments, local language.',
        '**Effects**: Lutheran churches, division, **Augsburg 1555**; Zwingli, Calvin, Henry VIII.',
        '**Counter Reformation**: **Trent**, **Jesuits**, **Index**, **Inquisition**.',
      ],
      v: vCompare,
      n: 'To sum up. Luther made public the Ninety five Theses in fifteen seventeen, appeared before the Diet of Worms in fifteen twenty one and translated the Bible into German. His teachings led to Lutheran churches and a divided Western Christianity. The Catholic Church responded with the Council of Trent, the Jesuits, the Index and Church courts.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Give the **year** with each event: 1517, 1521, 1534, 1540, 1545 to 1563, 1555.',
        'Learn all **five teachings** of Luther.',
        'In Augsburg, the **ruler** chose, not each villager.',
        'Describe the **Index** and the **Inquisition** briefly and neutrally.',
        'Never rank one tradition above the other.',
      ],
      n: 'Some exam habits. Give the year with every event. Learn all five teachings of Luther. At Augsburg, the ruler chose, not each villager. Describe the Index and the Inquisition briefly and neutrally. And never rank one tradition above the other.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Modern Age in Europe: Reformation — notes',
  sections: [
    {
      h: '1. Meaning and practices critics objected to',
      t: 1,
      b: '- **Reformation:** a **16th-century movement** in Western Christianity that **protested against certain practices of the Roman Catholic Church** and led to the formation of **Protestant churches**. It began in **1517**.\n- Practices critics objected to: the **sale of indulgences**; the **sale of Church offices** (simony); the **great wealth and taxes** of the Church (for example the tithe); the **worldly lives** of some clergy; **Church courts**; **services and the Bible in Latin**, which ordinary people did not understand.\n- Use neutral wording: write that **critics objected to** these practices.',
      terms: [['Reformation', 'A 16th-century movement in Western Christianity that began in 1517.'], ['Indulgence', 'A certificate said to reduce punishment for sins.'], ['Simony', 'The sale of Church offices.'], ['Tithe', 'A Church tax of about one tenth of produce or income.']],
      v: vMeaning,
      vs: [vIndSim, vOther],
    },
    {
      h: '2. The new learning and other causes',
      t: 1,
      b: '- **New learning:** the Renaissance spirit of enquiry encouraged people to question authority (the Renaissance is background only). **Erasmus**, a Dutch humanist, criticised abuses in **The Praise of Folly** (about 1511). **Printing** spread critical ideas and Bibles quickly.\n- **Earlier reformers:** **John Wycliffe** in England (14th century; an English Bible) and **Jan Hus** in Bohemia (early 15th century).\n- **Rulers** of growing nation-states wanted control over Church lands and appointments; **merchants** resented Church taxes.',
      terms: [['Humanist', 'A scholar of the new learning who studied old writings with care.'], ['Nation-state', 'A growing state under a ruler, with its own interests.']],
      v: vWeb,
      vs: [vErasmus, vPrint, vEarlier],
    },
    {
      h: '3. Martin Luther\'s protest',
      t: 2,
      b: '- **Martin Luther** (1483 to 1546): a German monk and a professor at **Wittenberg**.\n- **1517:** he made public the **Ninety-five Theses** against the **sale of indulgences**; **Johann Tetzel** was selling indulgences in Germany.\n- **1521:** **Pope Leo X excommunicated** him; at the **Diet of Worms** he refused to take back his views.\n- **Frederick of Saxony** protected him. He translated the **New Testament into German**, and later the whole Bible.',
      terms: [['Excommunication', 'Exclusion from the Church by the Pope.'], ['Diet', 'An assembly of princes and officials of the German states.']],
      v: vLuther,
      vs: [vThesis, vWorms, vTimeline],
    },
    {
      h: '4. Luther\'s main teachings',
      t: 2,
      b: '- **Salvation by faith** (justification by faith), not by buying indulgences.\n- The **Bible** as the main authority.\n- The **priesthood of all believers**: every believer may approach God directly.\n- **Fewer sacraments:** baptism and communion.\n- Services and the Bible in the **language of the people**.',
      terms: [['Justification by faith', 'Forgiveness through faith.'], ['Sacrament', 'A sacred rite of the Church; Luther kept baptism and communion.']],
      v: vTeach,
      vs: [vTeachTable],
    },
    {
      h: '5. Effects of Luther\'s protest and other reformers',
      t: 2,
      b: '- **Lutheran churches** spread in **northern Germany** and **Scandinavia**.\n- **Western Christianity was divided** into Catholic and Protestant churches.\n- **Peace of Augsburg (1555):** each ruler in the German states chose the **Lutheran or Catholic** faith for his state.\n- **Other reformers (one line each):** **Zwingli** in **Zurich**; **Calvin** in **Geneva**; in England **Henry VIII\'s Act of Supremacy (1534)** made the king head of the Church of England.',
      terms: [['Protestant', 'A follower of one of the churches formed from the Reformation.'], ['Act of Supremacy', 'The 1534 Act that made the English king head of the Church of England.']],
      v: vEffects,
      vs: [vAugs, vOthers],
    },
    {
      h: '6. The Counter Reformation (Catholic Reformation)',
      t: 3,
      b: '- **Meaning:** measures by which the Catholic Church reformed itself and checked the spread of Protestantism.\n- **Council of Trent (1545 to 1563):** reaffirmed Catholic doctrines; stopped the sale of indulgences for money; required better training of priests in seminaries; insisted on discipline among the clergy.\n- **Society of Jesus (Jesuits):** founded by **Ignatius Loyola**, approved **1540**; worked in **education** and **missions** (Francis Xavier in Asia, see Chapter 14).\n- **The Index** of prohibited books; Church courts against heresy (**the Inquisition**).\n- **Results:** a reformed Catholic Church that remained strong in southern Europe.',
      terms: [['Counter Reformation', 'The Catholic Church\'s own reform and its effort to check Protestantism.'], ['Seminary', 'A school for training priests.'], ['Heresy', 'Belief that the Church considered contrary to its teaching.']],
      v: vCounter,
      vs: [vTrent, vJesuits, vIndex],
    },
  ],
  tips: '**Common mistakes**\n- Giving a date without the word about, or forgetting that 1517 began the Reformation.\n- Mixing up Erasmus (a scholar who criticised abuses) with Luther.\n- Writing that each villager chose a faith at Augsburg; it was the ruler.\n- Forgetting two sacraments (baptism and communion) or one of the five teachings.\n- Confusing the Council of Trent with the Diet of Worms.\n- Using sweeping words such as corrupt or evil; write that critics objected to certain practices.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or date.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a link, reasons or a result.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['The Reformation', 'A **16th-century** movement in Western Christianity; protested against certain practices of the Roman Catholic Church; led to **Protestant** churches.', 'definition', 1],
  ['Year the Reformation began', '**1517**.', 'fact', 1],
  ['Indulgence', 'A certificate said to **reduce punishment for sins**; critics objected to its **sale**.', 'definition', 1],
  ['Simony', 'The **sale of Church offices**.', 'definition', 1],
  ['Tithe', 'A Church tax of about **one tenth** of produce or income.', 'definition', 1],
  ['Practices critics objected to', 'Indulgences, simony, **wealth and taxes**, **worldly lives** of some clergy, **Church courts**, services and Bible in **Latin**.', 'concept', 1],
  ['Why Latin was a complaint', 'Ordinary people **did not understand** it.', 'concept', 1],
  ['The new learning (spirit of enquiry)', 'The Renaissance spirit encouraged people to **question authority**.', 'concept', 1],
  ['Erasmus', 'A **Dutch** humanist scholar; wrote **The Praise of Folly** (about 1511); criticised abuses.', 'fact', 1],
  ['Printing and the Reformation', 'It spread **critical ideas and Bibles quickly**.', 'concept', 1],
  ['Earlier reformers', '**John Wycliffe** (England, 14th century); **Jan Hus** (Bohemia, early 15th century).', 'fact', 1],
  ['Rulers and the Reformation', 'Rulers of growing nation-states wanted control over **Church lands and appointments**.', 'concept', 1],
  ['Merchants and the Reformation', 'Merchants **resented Church taxes**.', 'concept', 1],
  ['Martin Luther', '**1483 to 1546**; a German **monk** and **professor at Wittenberg**.', 'fact', 2],
  ['Ninety-five Theses', 'Made public by Luther in **1517** against the **sale of indulgences**.', 'fact', 2],
  ['Johann Tetzel', 'He was selling **indulgences** in Germany in 1517.', 'fact', 2],
  ['Luther and Pope Leo X', 'Excommunicated Luther in **1521**.', 'fact', 2],
  ['Diet of Worms (1521)', 'Assembly where Luther **refused to take back his views**.', 'fact', 2],
  ['Frederick of Saxony', 'The ruler who **protected Luther**.', 'fact', 2],
  ['Luther\'s Bible', 'He translated the **New Testament into German**, and later the whole Bible.', 'fact', 2],
  ['Luther: salvation', 'Salvation by **faith** (justification by faith), not by buying indulgences.', 'concept', 2],
  ['Luther: authority', 'The **Bible** as the main authority.', 'concept', 2],
  ['Luther: priesthood', 'The **priesthood of all believers**.', 'concept', 2],
  ['Luther: sacraments and language', '**Baptism and communion** only; services in the **language of the people**.', 'concept', 2],
  ['Effects of Luther\'s protest', 'Lutheran churches in **northern Germany and Scandinavia**; Western Christianity **divided**.', 'concept', 2],
  ['Peace of Augsburg (1555)', 'Each **ruler** in the German states chose **Lutheran or Catholic** faith for his state.', 'fact', 2],
  ['Zwingli and Calvin', 'Zwingli in **Zurich**; Calvin in **Geneva**.', 'fact', 2],
  ['Act of Supremacy (1534)', 'Henry VIII; the **king became head of the Church of England**.', 'fact', 2],
  ['Counter Reformation', 'The Catholic Church\'s measures to **reform itself** and **check the spread of Protestantism**.', 'definition', 3],
  ['Council of Trent', '**1545 to 1563**: doctrines reaffirmed; indulgence sale for money stopped; **seminaries**; **discipline**.', 'fact', 3],
  ['Society of Jesus', 'Founded by **Ignatius Loyola**, approved **1540**; **education** and **missions**.', 'fact', 3],
  ['Francis Xavier', 'A Jesuit who worked in **Asia** (see Chapter 14).', 'fact', 3],
  ['The Index', 'A list of **books Catholics were told not to read**.', 'definition', 3],
  ['The Inquisition', '**Church courts** that dealt with **heresy**.', 'definition', 3],
  ['Result of the Counter Reformation', 'A **reformed** Catholic Church that remained **strong in southern Europe**.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Reformation',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_tithe', 'm_faith', 'm_index', 'm_rulers', 'ar_latin', 's_diet', 's3_trent'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_causes_church', 'l_luther_teach'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Reformation',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_define', 'm_simony', 'm_wycliffe_hus', 'm_tetzel', 'm_priesthood', 'm_trent_measures', 'm_result', 'ar_augsburg', 's_erasmus', 's_rulers_merch', 's_jesuit', 's3_newlearning', 's3_effects'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_causes_eval', 'l_effects', 'l_counter'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of icse-9-history-civics-ch16 only (meaning and causes of the Reformation; Martin Luther; the Counter Reformation); the Renaissance is background only (ch15)',
    originality: 'every notice board, order book, diary, club and town is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); nothing is quoted, ideas are paraphrased',
    data: 'timeline drawn to scale from 1510 to 1570; dates are the commonly taught ones',
    facts: 'Reformation began 1517; Luther 1483 to 1546, Wittenberg; Ninety-five Theses 1517, Tetzel; Pope Leo X and Diet of Worms 1521; Frederick of Saxony; German New Testament; five teachings; Peace of Augsburg 1555; Zwingli Zurich; Calvin Geneva; Act of Supremacy 1534; Council of Trent 1545 to 1563; Jesuits approved 1540, Ignatius Loyola, Francis Xavier in Asia; Index; Inquisition; Erasmus, The Praise of Folly about 1511; Wycliffe (England, 14th century); Hus (Bohemia, early 15th century)',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
