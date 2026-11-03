// ICSE 9 History & Civics, ch15 The Modern Age in Europe: Renaissance — question bank.
// Every art-club card, apprentice's diary, school notebook, town scene and exhibition label below is imagined by SOYL and
// labelled as imagined; no textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No line of
// Shakespeare, Dante, Chaucer, Petrarch or Copernicus is quoted, and no artwork is reproduced: ideas are paraphrased.
// Dates are the commonly taught approximate ones: Renaissance about the 14th to 16th century; Black Death about 1347-1351;
// Gutenberg's movable type about 1450, Gutenberg Bible about 1455; Constantinople 1453; Caxton from 1476; Columbus 1492;
// Vasco da Gama at Calicut 1498; Leonardo 1452-1519; Copernicus 1473-1543 (book 1543); Shakespeare 1564-1616.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
/** Causes web: six causes feed the Renaissance. */
export function causesFigure(alt, caption) {
  const s = new Svg(720, 420);
  const top = [
    [15, 'Capture of Constantinople', 'Greek scholars go west', 'accent'],
    [265, 'Decline of feudalism', 'Black Death, Crusades, cannon', 'green'],
    [515, 'New trade routes', 'Venice, Genoa, sea voyages', 'blue'],
  ];
  const bottom = [
    [15, 'Wealthy patrons', 'The Medici of Florence', 'blue'],
    [265, 'Spirit of enquiry', 'Reason and observation', 'accent'],
    [515, 'Printing press', 'Cheaper books, faster ideas', 'green'],
  ];
  s.rect(255, 175, 210, 70, { rx: 12, fill: 'accent', fillOpacity: 0.22, color: 'accent', sw: 2.2 });
  s.text(360, 202, 'The Renaissance', { size: 17, bold: true });
  s.text(360, 224, 'about the 14th to 16th century', { size: 12 });
  top.forEach(([x, a, b, col]) => {
    s.rect(x, 20, 190, 56, { rx: 8, fill: col, fillOpacity: 0.14, color: col, sw: 1.8 });
    s.text(x + 95, 41, a, { size: 13, bold: true });
    s.text(x + 95, 61, b, { size: 12 });
    s.arrow(x + 95, 76, 255 + (x + 95 - 110) * 0.4 + 0, 175, { sw: 1.4, color: 'muted' });
  });
  bottom.forEach(([x, a, b, col]) => {
    s.rect(x, 344, 190, 56, { rx: 8, fill: col, fillOpacity: 0.14, color: col, sw: 1.8 });
    s.text(x + 95, 365, a, { size: 13, bold: true });
    s.text(x + 95, 385, b, { size: 12 });
    s.arrow(x + 95, 344, 255 + (x + 95 - 110) * 0.4 + 0, 245, { sw: 1.4, color: 'muted' });
  });
  s.text(360, 300, 'Causes strengthened one another', { size: 12, muted: true });
  s.text(110, 135, 'Schematic web, not a ranking', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Timeline from 1347 to 1616 with one row per event. */
export function timelineFigure(alt, caption) {
  const s = new Svg(720, 340);
  const X = (yr) => 40 + (yr - 1347) * (640 / (1616 - 1347));
  [1350, 1400, 1450, 1500, 1550, 1600].forEach((yr) => {
    s.line(X(yr), 34, X(yr), 306, { sw: 1, color: 'muted', dash: true });
    s.text(X(yr), 20, String(yr), { size: 12, bold: true });
  });
  // [label, from, to, side, color]
  const rows = [
    ['Black Death, about 1347 to 1351', 1347, 1351, 'r', 'accent'],
    ['Gutenberg prints with movable type, about 1450', 1450, 1450, 'r', 'green'],
    ['Leonardo da Vinci, 1452 to 1519', 1452, 1519, 'r', 'blue'],
    ['Constantinople taken by the Ottomans, 1453', 1453, 1453, 'r', 'accent'],
    ['Caxton prints in England, from 1476', 1476, 1476, 'r', 'green'],
    ['Columbus crosses the Atlantic, 1492', 1492, 1492, 'r', 'blue'],
    ['Vasco da Gama reaches Calicut, 1498', 1498, 1498, 'r', 'blue'],
    ['Copernicus\'s book is published, 1543', 1543, 1543, 'l', 'accent'],
    ['Shakespeare, 1564 to 1616', 1564, 1616, 'l', 'green'],
  ];
  rows.forEach(([label, a, b, side, col], i) => {
    const y = 52 + i * 28;
    if (a === b) s.dot(X(a), y, 6, col);
    else s.rect(X(a), y - 7, Math.max(X(b) - X(a), 8), 14, { rx: 4, fill: col, fillOpacity: 0.3, color: col, sw: 1.6 });
    if (side === 'r') s.text(X(b) + 14, y, label, { size: 13, anchor: 'start' });
    else s.text(X(a) - 12, y, label, { size: 13, anchor: 'end' });
  });
  s.text(360, 326, 'Roughly to scale. Dates are the commonly taught ones; some are approximate', { size: 11, muted: true });
  return s.visual(alt, caption);
}

function ring(s, cx, cy, r, o) {
  s.path(`M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`, o);
}
/** Schematic of the geocentric and heliocentric models. */
export function modelsFigure(alt, caption) {
  const s = new Svg(720, 420);
  const cy = 235;
  // left panel: Earth at the centre
  s.text(180, 22, 'Earth-centred (geocentric)', { size: 15, bold: true });
  s.text(180, 42, 'the older Ptolemaic view', { size: 12, muted: true });
  ring(s, 180, cy, 140, { color: 'muted', sw: 1.2, dash: true });
  ring(s, 180, cy, 112, { color: 'muted', sw: 1.2 });
  ring(s, 180, cy, 78, { color: 'muted', sw: 1.2 });
  ring(s, 180, cy, 45, { color: 'muted', sw: 1.2 });
  s.dot(180, cy, 8, 'blue');
  s.text(180, cy + 24, 'Earth', { size: 12, bold: true });
  s.dot(180, cy - 45, 5, 'accent');
  s.text(180, cy - 61, 'Moon', { size: 12 });
  s.dot(180, cy - 78, 6, 'green');
  s.text(180, cy - 94, 'Sun', { size: 12 });
  s.dot(180, cy - 112, 5, 'accent');
  s.text(180, cy - 127, 'Planet', { size: 12 });
  s.text(180, cy - 150, 'Fixed stars', { size: 12, muted: true });
  // right panel: Sun at the centre
  s.text(540, 22, 'Sun-centred (heliocentric)', { size: 15, bold: true });
  s.text(540, 42, 'the Copernican view', { size: 12, muted: true });
  ring(s, 540, cy, 140, { color: 'muted', sw: 1.2, dash: true });
  ring(s, 540, cy, 112, { color: 'muted', sw: 1.2 });
  ring(s, 540, cy, 78, { color: 'muted', sw: 1.2 });
  ring(s, 540, cy, 45, { color: 'muted', sw: 1.2 });
  s.dot(540, cy, 9, 'accent');
  s.text(540, cy + 25, 'Sun', { size: 12, bold: true });
  s.dot(540, cy - 45, 5, 'green');
  s.text(540, cy - 61, 'Planet', { size: 12 });
  s.dot(540, cy - 78, 6, 'blue');
  s.text(540, cy - 94, 'Earth', { size: 12, bold: true });
  s.dot(540, cy - 112, 5, 'green');
  s.text(540, cy - 127, 'Planet', { size: 12 });
  s.text(540, cy - 150, 'Fixed stars', { size: 12, muted: true });
  s.text(360, 400, 'Schematic, not to scale. Orbits are drawn as simple circles to show which body is at the centre', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Printing spread: from the press to faster ideas. */
export function printingFigure(alt, caption) {
  const s = new Svg(720, 300);
  const boxes = [
    [20, 30, 'Mainz, about 1450', 'Gutenberg: movable type', 'accent'],
    [260, 30, 'Gutenberg Bible', 'about 1455', 'green'],
    [500, 30, 'Caxton in England', 'printing from 1476', 'blue'],
    [20, 175, 'Books cheaper', 'and more numerous', 'accent'],
    [260, 175, 'Literacy spreads', 'more readers', 'green'],
    [500, 175, 'Ideas travel faster', 'across Europe', 'blue'],
  ];
  boxes.forEach(([x, y, a, b, col]) => {
    s.rect(x, y, 200, 70, { rx: 10, fill: col, fillOpacity: 0.14, color: col, sw: 1.8 });
    s.text(x + 100, y + 27, a, { size: 14, bold: true });
    s.text(x + 100, y + 49, b, { size: 12 });
  });
  s.arrow(222, 65, 258, 65, { sw: 1.6 });
  s.arrow(462, 65, 498, 65, { sw: 1.6 });
  s.arrow(222, 210, 258, 210, { sw: 1.6 });
  s.arrow(462, 210, 498, 210, { sw: 1.6 });
  s.polyline([[600, 100], [600, 138], [120, 138]], { sw: 1.6 });
  s.arrow(120, 138, 120, 173, { sw: 1.6 });
  s.text(360, 285, 'Schematic flow. Dates are approximate', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// sanity: the timeline rows are in date order
assert.ok(1347 < 1450 && 1453 < 1492 && 1498 < 1543);

// ================================================================ t01 Meaning, Constantinople, feudalism
Q('m_rebirth', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The imagined Rivermead Art Club prints a poster titled "Our Renaissance Week". A visitor asks about the word. Which language does it come from, and what does it mean?',
  opts: ['French, meaning rebirth', 'Latin, meaning conquest', 'Greek, meaning travel', 'German, meaning printing'],
  sol: 'Renaissance is a French word meaning rebirth, used for the revival of interest in classical Greek and Roman learning together with new ideas in art, literature and science. Conquest, travel and printing are not what the word means.',
}));
Q('m_manuscripts', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In an imagined diary from the year 1453, a Greek teacher called Nikos leaves a city that has just fallen to the Ottoman Turks and sails to Italy with a trunk of old manuscripts. How did journeys like his help the Renaissance?',
  opts: [
    'They brought classical texts and learning to Italy, where scholars studied them with fresh interest',
    'They ended the use of Greek and Latin in Italy',
    'They created the first printing press in Italy',
    'They made Italian merchants stop trading with the East',
  ],
  sol: 'Greek scholars moving to Italy with manuscripts encouraged the study of classical texts, a central part of the Renaissance. The printing press came from Mainz and was not created by these journeys, and the fall of the city did not end learning of Greek or Latin.',
}));
Q('m_route_search', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined merchant of Seaview, whose family sold spices, writes in 1460: "Since the great city on the Bosphorus changed hands, our old road to the East is hard to use." What was the long-term result in Europe?',
  opts: [
    'The disruption of the land and sea routes to the East encouraged a search for new sea routes',
    'Europe stopped all trade with Asia for four centuries',
    'Merchants moved their goods only by overland caravans through Constantinople',
    'The Ottomans withdrew from the city within a few years',
  ],
  sol: 'The capture of Constantinople in 1453 disrupted the old trade routes to the East, which encouraged the search for new sea routes. Trade did not stop for centuries, caravans could not use the old route freely, and the Ottomans kept the city.',
}));
Q('m_black_death', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined manor of Oakdene, about 1350, a plague has killed many farm workers. The surviving labourers refuse to work unless the lord pays wages. Which cause of the decline of feudalism does this show?',
  opts: [
    'The Black Death caused labour shortages, so peasants could demand wages',
    'The invention of the printing press raised the price of grain',
    'The Crusades ended the need for lords',
    'The discovery of the sea route to India',
  ],
  sol: 'The Black Death (about 1347 to 1351) left too few workers, so peasants could demand wages. Printing, a sea route to India and the end of the Crusades are not what drove this change in the manor.',
}));
Q('m_cannon', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined guide at the ruined castle of Stonehaven says: "Thick walls once kept armies out, but the new iron guns of a royal army broke them in a single week." Which development does she describe?',
  opts: [
    'Gunpowder and cannon made castles and knights less important, so kings grew stronger',
    'The rise of the Black Death, which emptied every castle',
    'The founding of new universities by the Medici',
    'The invention of movable type',
  ],
  sol: 'Gunpowder and cannon made castle walls and armoured knights less useful, which weakened feudal lords and strengthened kings. The plague, Medici patronage and movable type belong to other developments.',
}));
Q('m_middle_class', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined port of Marenza, a rich cloth trader who is neither a lord nor a peasant buys books and pays an artist to paint his family. Which group in society does he stand for?',
  opts: [
    'A rich middle class that emerged as towns, trade and a money economy grew',
    'A feudal lord with a large estate',
    'A serf tied to the land',
    'A knight serving in a castle',
  ],
  sol: 'Growing towns and trade, and a money economy, produced a rich middle class that could buy books and support art. A lord holds an estate, a serf is tied to the land and a knight serves in a castle, none of which fits a trader.',
}));
Q('mt_meaning', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'In the imagined notebook of the Hillcrest History Club, four terms need their meanings. Match each term with its meaning.',
  pairs: [
    ['Renaissance', 'A French word meaning rebirth'],
    ['Feudalism', 'A system in which lords held land and peasants worked it'],
    ['Black Death', 'A deadly plague of about 1347 to 1351'],
    ['Classical learning', 'The ideas and writings of ancient Greece and Rome'],
  ],
  sol: 'Renaissance means rebirth, feudalism was the system of lords and peasants, the Black Death was the plague of about 1347 to 1351, and classical learning means ancient Greek and Roman knowledge.',
}));
Q('tf_florence', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The imagined Rivermead Art Club notes that the Renaissance began in Italy, in the city of Florence, and then spread across Europe.',
  sol: 'True. The movement began in Florence, in Italy, and spread to the rest of Europe over the 14th to 16th century.',
}));
Q('tf_constantinople', tf({
  t: 1, d: 2, c: 'recall', ans: false,
  stem: 'True or false? A student of the imagined Pinewood School writes that Constantinople was taken by the Ottoman Turks in the year 1492.',
  sol: 'False. The Ottoman Turks took Constantinople in 1453; 1492 is the year of the first voyage of Columbus.',
}));
Q('fb_year', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Ottoman Turks captured Constantinople in the year ___.',
  acc: [['1453']],
  sol: 'The year was 1453, when Greek scholars began moving to Italy with their manuscripts.',
}));
Q('fb_rebirth', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The word Renaissance is a French word that means ___.',
  acc: [['rebirth', 'Rebirth', 're-birth']],
  sol: 'The word means rebirth, because the age revived interest in classical learning.',
}));
Q('ar_black', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Black Death helped to weaken feudalism in Europe.',
  r: 'The plague left labour in short supply, so surviving peasants could demand wages instead of serving their lords for nothing.',
  sol: 'Both are true, and the reason explains the assertion: the shortage of labour gave peasants bargaining power, which loosened the hold of the lords.',
}));
Q('ar_trade_route', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The capture of Constantinople in 1453 made the old routes to the East easier and safer for European traders.',
  r: 'The capture disrupted trade routes to the East and encouraged the search for new sea routes.',
  sol: 'The assertion is false, because the routes were disrupted rather than made easier. The reason is true and states what actually happened.',
}));
Q('s_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'At the opening of the imagined Hillcrest Renaissance fair, a guide asks every visitor to define the word. What is the Renaissance, and when did it take place?',
  model: 'The Renaissance, a French word for **rebirth**, was a revival of interest in **classical Greek and Roman learning** along with new ideas in art, literature and science. It lasted from about the **14th to the 16th century**.',
  sol: 'Meaning as rebirth of classical learning with new ideas; about the 14th to 16th century.',
  scheme: [['Revival of classical Greek and Roman learning with new ideas (rebirth)', 1], ['About the 14th to the 16th century, beginning in Italy', 1]],
}));
Q('s_constantinople', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain two ways in which the fall of Constantinople to the Ottoman Turks in 1453 affected Europe.',
  model: 'Greek scholars moved to **Italy** with their **manuscripts**, which encouraged the study of classical texts. The city\'s fall also **disrupted trade routes to the East**, which encouraged Europeans to look for new sea routes.',
  sol: 'Scholars and manuscripts reached Italy; trade routes disrupted, leading to a search for sea routes.',
  scheme: [['Greek scholars and manuscripts reach Italy; classical study encouraged', 1], ['Trade routes disrupted; search for new sea routes', 1]],
}));
Q('s_feudal_reasons', short({
  t: 1, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'An imagined student, Karan, claims that feudalism ended in a single year when one castle fell. Give two reasons why historians describe a gradual decline instead.',
  model: 'Several causes worked together over many decades: the **Crusades** weakened many lords, the **Black Death** caused labour shortages, and **towns and trade** grew. Later, **cannon** made castles less useful, so no single event ended feudalism.',
  sol: 'Many causes over a long time: Crusades, plague, towns, cannon.',
  scheme: [['Two or more causes named, for example Crusades and Black Death', 1], ['Idea that causes acted gradually together, not in a single year', 1]],
}));
Q('s3_feudal', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three developments that led to the decline of feudalism in Europe.',
  model: '1. The **Crusades** weakened many feudal lords.\n2. The **Black Death** (about 1347 to 1351) left few workers, which let peasants ask for wages.\n3. **Towns, trade and a money economy** grew, and gunpowder and **cannon** made castles and knights less important, so **kings grew stronger**.',
  sol: 'Any three: Crusades, Black Death, trade and towns, cannon, stronger kings.',
  scheme: [['Crusades or cannon', 1], ['Black Death and wages', 1], ['Growth of towns and trade, rise of kings or the middle class', 1]],
}));
Q('s3_causes', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined exhibition panel at Rivermead lists "1453, a plague of about 1350, a new kind of cannon". Link each of the three to the Renaissance.',
  model: '1. **1453**: Greek scholars moved to Italy with manuscripts, so classical study grew.\n2. **The plague of about 1350**, the Black Death, caused labour shortages and helped to weaken feudalism.\n3. **Cannon** made castles and knights less important, so kings grew stronger and society changed.',
  sol: 'Constantinople, Black Death, cannon each linked to a Renaissance cause.',
  scheme: [['1453 linked to scholars and manuscripts', 1], ['Black Death linked to decline of feudalism', 1], ['Cannon linked to stronger kings', 1]],
}));
Q('l_origin', long({
  t: 1, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The imagined Hillcrest Heritage Society is preparing a wall chart on how the Renaissance began.\n\n(i) What is meant by the Renaissance, and where did it begin? **[3]**\n(ii) How did the capture of Constantinople in 1453 help the Renaissance? **[3]**\n(iii) Explain how the Black Death and the growth of towns and trade weakened feudalism. **[4]**',
  model: '(i) The Renaissance was a **revival of interest in classical Greek and Roman learning** together with new ideas in art, literature and science. The French word means **rebirth**. It began in **Italy**, in the city of **Florence**, and lasted about the 14th to 16th century.\n\n(ii) When the **Ottoman Turks took Constantinople in 1453**, Greek scholars moved to **Italy** with their manuscripts, and this encouraged the study of classical texts. The city\'s fall also **disrupted the trade routes to the East**, which pushed Europeans to look for new sea routes.\n\n(iii) The **Black Death** (about 1347 to 1351) left too few workers, so peasants could **demand wages** and the lords lost power. At the same time **towns, trade and a money economy** grew, and a **rich middle class** appeared. As a result the old tie between lord and peasant weakened and **kings grew stronger**.',
  sol: 'Meaning and place; effects of 1453; Black Death and growth of towns and trade.',
  scheme: [['(i) Revival of classical Greek and Roman learning with new ideas (rebirth)', 1.5], ['(i) Began in Italy, Florence; about the 14th to 16th century', 1.5], ['(ii) Scholars and manuscripts move to Italy', 1.5], ['(ii) Trade routes disrupted; search for sea routes', 1.5], ['(iii) Black Death: labour shortage and wages', 1.5], ['(iii) Towns, trade and money economy; rich middle class', 1.5], ['(iii) Weakened lords, stronger kings', 1]],
}));

// ================================================================ t02 Trade routes, enquiry, printing
Q('m_venice', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined ledger page in the museum of Marenza shows ships arriving with silk, spices and glass. Which pair of Italian city-states became rich through trade in this age?',
  opts: ['Venice and Genoa', 'Mainz and Florence', 'Calicut and Lisbon', 'London and Paris'],
  sol: 'Venice and Genoa were Italian city-states that grew rich from trade. Mainz is in Germany and Calicut is in India, while London and Paris are not Italian city-states.',
}));
Q('m_medici', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined exhibition card at the Rivermead Art Club says: "A banking family of Florence paid painters and sculptors and helped scholars to copy old books." Which family does the card describe?',
  opts: ['The Medici', 'The Gutenbergs', 'The Tudors', 'The Habsburgs'],
  sol: 'The Medici of Florence were wealthy patrons who supported artists and scholars. Gutenberg was a printer from Mainz, and the Tudors and Habsburgs were royal houses of other lands.',
}));
Q('m_columbus', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A time-line strip prepared by the imagined class of Pinewood School marks the first voyage of Columbus across the Atlantic. In which year does it belong?',
  opts: ['1492', '1453', '1498', '1543'],
  sol: 'Columbus made his first voyage in 1492. The year 1453 is the fall of Constantinople, 1498 is when Vasco da Gama reached Calicut, and 1543 is when Copernicus\'s book appeared.',
}));
Q('m_gama', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'On an imagined map-quiz board in Seaview, a pin is placed on the Indian port that Vasco da Gama reached in 1498 after sailing round Africa. Which port is it?',
  opts: ['Calicut', 'Mainz', 'Florence', 'Constantinople'],
  sol: 'Vasco da Gama reached Calicut in 1498. Mainz and Florence are in Europe, and Constantinople lay on the old route between Europe and Asia.',
}));
Q('m_petrarch', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A caption in the imagined Hillcrest library says: "Often called the father of humanism, this Italian poet turned attention to human life and abilities." Which person fits the caption?',
  opts: ['Petrarch', 'Copernicus', 'Caxton', 'Vasco da Gama'],
  sol: 'Petrarch is often called the father of humanism. Copernicus was an astronomer, Caxton a printer and Vasco da Gama a sea-voyager.',
}));
Q('m_experiment', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At the imagined Pinewood Science Fair, Meera does not accept the claim that heavier stones always fall faster. She drops two stones from the same height and records what she sees. Which Renaissance attitude does she show?',
  opts: [
    'The spirit of enquiry: reliance on reason, observation and experiment rather than only on tradition',
    'Feudal loyalty to an older authority',
    'A wish to copy old books by hand',
    'Acceptance of whatever an earlier writer had said',
  ],
  sol: 'Testing a claim by observation and experiment is the spirit of enquiry. Obeying old authority, copying by hand and accepting earlier writers unchallenged go against that attitude.',
}));
Q('m_gutenberg', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A label in the imagined print museum of Valdoro reads: "In the German town of Mainz, about 1450, a goldsmith began printing with movable metal type." Whose work does it describe?',
  opts: ['Johannes Gutenberg', 'William Caxton', 'Petrarch', 'Leonardo da Vinci'],
  sol: 'The goldsmith of Mainz who brought in printing with movable metal type about 1450 was Johannes Gutenberg. Caxton printed in England from 1476, while Petrarch and Leonardo were a poet and an artist-scientist.',
}));
Q('m_caxton', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined diary of Tomas, an apprentice in a print shop in the town of Valdoro, an old customer says that books reached England only after a merchant set up a press in 1476. Whom does the customer mean?',
  opts: ['William Caxton', 'Johannes Gutenberg', 'Nicolaus Copernicus', 'William Shakespeare'],
  sol: 'William Caxton printed in England from 1476. Gutenberg worked in Mainz, while Copernicus was an astronomer and Shakespeare a playwright who was born later.',
}));
Q('m_print_effect', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Tomas, the imagined apprentice, notes that a scribe once needed months to copy one Bible, while the press in his shop makes many copies in a week. Which effect of printing does his note best support?',
  opts: [
    'Books became cheaper and more numerous, so literacy spread and ideas travelled faster',
    'Books became so rare that only kings could own them',
    'Ideas stopped travelling beyond a single town',
    'Printing made handwriting illegal in Europe',
  ],
  sol: 'A press that makes many copies quickly lowers the cost of books and increases their number, which spreads literacy and ideas. The other options say the opposite or invent a law.',
}));
Q('m_pair_order', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A student of the imagined Pinewood School pins four pairs of event cards on a board. Which pair is listed in the correct order, earliest first?',
  opts: [
    'The capture of Constantinople (1453), then the Gutenberg Bible (about 1455)',
    'The voyage of Columbus (1492), then the Gutenberg Bible (about 1455)',
    'Vasco da Gama at Calicut (1498), then the voyage of Columbus (1492)',
    'The book of Copernicus (1543), then the press of Caxton (1476)',
  ],
  sol: 'Constantinople fell in 1453, before the Gutenberg Bible of about 1455. In the other pairs the later event is placed first: Columbus came after the Bible, Vasco da Gama after Columbus, and the book of Copernicus after Caxton.',
}));
Q('fb_petrarch', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Petrarch is often called the father of ___.',
  acc: [['humanism', 'Humanism']],
  sol: 'He is often called the father of humanism, the interest in human life and abilities.',
}));
Q('mt_print', match({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'On a wall of the imagined Valdoro print museum, four cards have lost their pairs. Match each name with the right description.',
  pairs: [
    ['Johannes Gutenberg', 'Developed printing with movable metal type at Mainz, about 1450'],
    ['William Caxton', 'Printed books in England from 1476'],
    ['The Medici', 'Wealthy patrons of Florence who supported artists and scholars'],
    ['Vasco da Gama', 'Reached Calicut by sea in 1498'],
  ],
  sol: 'Gutenberg developed movable type, Caxton printed in England, the Medici were patrons, and Vasco da Gama reached Calicut.',
}));
Q('ord_voyage_chain', ord({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'The imagined Seaview Maritime Club arranges four cards on a shelf. Put the events in order, earliest first.',
  items: ['The Ottomans capture Constantinople', 'Columbus makes his voyage across the Atlantic', 'Vasco da Gama reaches Calicut', 'Copernicus\'s book is published'],
  sol: 'Constantinople (1453), Columbus (1492), Vasco da Gama (1498), Copernicus\'s book (1543).',
}));
Q('ar_print', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The printing press helped ideas to spread faster across Europe.',
  r: 'Printing made books cheaper and more numerous, so more people could read.',
  sol: 'Both are true, and the reason explains the assertion: cheaper and more plentiful books reached more readers, which carried ideas farther and faster.',
}));
Q('ar_medici', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Wealthy patrons such as the Medici of Florence supported artists and scholars.',
  r: 'Vasco da Gama reached Calicut in 1498.',
  sol: 'Both statements are true, but Vasco da Gama\'s voyage does not explain why the Medici supported artists and scholars. The patrons\' wealth came from trade and banking in Florence.',
}));
Q('s_trade', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why did the Italian city-states of Venice and Genoa grow rich, and how did this help artists?',
  model: 'Venice and Genoa grew rich from **trade** with the East. Wealthy families and merchants, such as the **Medici of Florence**, used their money to act as **patrons** who supported artists and scholars.',
  sol: 'Rich from trade; wealthy patrons supported artists.',
  scheme: [['Venice and Genoa grew rich from trade', 1], ['Wealthy patrons such as the Medici supported artists and scholars', 1]],
}));
Q('s_enquiry', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'In an imagined class talk at Hillcrest, a teacher asks what is meant by the spirit of enquiry. Explain it in two points.',
  model: 'It meant **questioning tradition and authority** instead of accepting old ideas without thought. People relied on **reason, observation and experiment**, and **humanism** turned interest to human life and abilities.',
  sol: 'Questioning tradition; reason, observation and experiment (humanism).',
  scheme: [['Questioning of tradition and authority', 1], ['Reliance on reason, observation and experiment, with humanism', 1]],
}));
Q('s_printing', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two facts about the invention of the printing press in the Renaissance.',
  model: 'At **Mainz**, **Johannes Gutenberg** worked out printing with **movable metal type** about **1450**, and the **Gutenberg Bible** dates to about **1455**. **William Caxton** printed in England from **1476**.',
  sol: 'Gutenberg, movable metal type, about 1450; Bible about 1455; Caxton from 1476.',
  scheme: [['Gutenberg of Mainz, movable metal type, about 1450', 1], ['Gutenberg Bible about 1455 or Caxton in England from 1476', 1]],
}));
Q('s_voyages', short({
  t: 2, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'An imagined student, Farah, says that the voyages of Columbus in 1492 and Vasco da Gama in 1498 were linked to the Renaissance. Give two reasons that support her view.',
  model: 'The **disruption of old routes to the East** after 1453 encouraged a **search for new sea routes**. The **spirit of enquiry** and the wealth of trading states also encouraged **exploration**, leading to the voyages of Columbus and Vasco da Gama.',
  sol: 'Routes disrupted and search for sea routes; enquiry and trade wealth encouraged exploration.',
  scheme: [['Disrupted routes led to a search for sea routes', 1], ['Spirit of enquiry or trade wealth encouraged voyages', 1]],
}));
Q('s3_print', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Tomas, the imagined apprentice of Valdoro, wants to tell a customer why a press changed the world. In three points, explain the effects of printing.',
  model: '1. **Books became cheaper and more numerous** than hand-copied ones.\n2. **Literacy spread**, because more people could afford to read.\n3. **Ideas travelled faster** across Europe, and printed texts helped new learning and local languages to reach many readers.',
  sol: 'Cheaper books; literacy; faster spread of ideas.',
  scheme: [['Books cheaper and more numerous', 1], ['Literacy spread', 1], ['Ideas travelled faster', 1]],
}));
Q('l_trade', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The imagined Marenza Merchants\' Museum is planning a gallery on trade and the new age.\n\n(i) How did trade make the Italian city-states rich? **[3]**\n(ii) Describe the role of patrons such as the Medici of Florence. **[3]**\n(iii) Explain how the voyages of Columbus in 1492 and Vasco da Gama in 1498 are linked to the Renaissance. **[4]**',
  model: '(i) Italian city-states such as **Venice and Genoa** stood on the trade routes between Europe and the East. Merchants carried silk and spices and earned large profits, so these cities grew **rich**, with towns, banks and a **rich middle class**.\n\n(ii) **Wealthy patrons**, such as the **Medici of Florence**, used their money to pay painters, sculptors and **scholars**. Their support gave artists the time and means to work, which is one reason why **Florence** became the early home of the Renaissance.\n\n(iii) When the capture of Constantinople in 1453 **disrupted old trade routes**, Europeans looked for **new sea routes**. The **spirit of enquiry** and wealth from trade supported such voyages. **Columbus made his Atlantic crossing in 1492**, and **Vasco da Gama arrived at Calicut in 1498**. They are linked consequences of the same age.',
  sol: 'Trade and wealth of city-states; the Medici as patrons; the voyages as linked consequences.',
  scheme: [['(i) Venice and Genoa on trade routes with the East', 1.5], ['(i) Grew rich; towns and middle class', 1.5], ['(ii) Medici as wealthy patrons of Florence', 1.5], ['(ii) Supported artists and scholars; Florence a home of the Renaissance', 1.5], ['(iii) Disrupted routes and search for sea routes', 1], ['(iii) Spirit of enquiry and wealth encouraged voyages', 1], ['(iii) Columbus 1492 and Vasco da Gama 1498 named', 2]],
}));
Q('l_printing', long({
  t: 2, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'The imagined Valdoro Print Museum has asked Class IX students to write a panel on the printing press.\n\n(i) Who developed printing with movable metal type, where and when? **[3]**\n(ii) Name two famous printed works or printers and say what each did. **[3]**\n(iii) Explain how printing helped the spread of the new ideas of the Renaissance. **[4]**',
  model: '(i) **Johannes Gutenberg** of **Mainz** developed printing with **movable metal type** about **1450**. Single metal letters could be arranged, inked and reused, which was far faster than copying by hand.\n\n(ii) The **Gutenberg Bible**, which dates to about **1455**, was among the earliest printed books. **William Caxton** printed in **England from 1476**, bringing the new craft to English readers.\n\n(iii) Printing made **books cheaper and more numerous**, so more people could buy and read them. **Literacy spread**, and **ideas travelled faster** from one town and country to another. New learning, art, science and works in local languages therefore reached many readers quickly and made the Renaissance a wide movement.',
  sol: 'Gutenberg, Mainz, about 1450; Gutenberg Bible and Caxton; effects of printing.',
  scheme: [['(i) Gutenberg of Mainz', 1], ['(i) Movable metal type', 1], ['(i) About 1450', 1], ['(ii) Gutenberg Bible about 1455', 1.5], ['(ii) Caxton in England from 1476', 1.5], ['(iii) Cheaper and more numerous books', 1.5], ['(iii) Literacy spread', 1], ['(iii) Ideas travelled faster; link to the Renaissance', 1.5]],
}));
Q('l_enquiry', long({
  t: 2, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'A debate at the imagined Pinewood School asks whether the spirit of enquiry was the most important cause of the Renaissance.\n\n(i) What is meant by the spirit of enquiry? **[3]**\n(ii) Explain humanism and say why Petrarch is often called its father. **[3]**\n(iii) "Trade and printing mattered as much as enquiry." Discuss this view in four marks. **[4]**',
  model: '(i) The **spirit of enquiry** was the habit of **questioning tradition and authority**. People tried to rely on **reason, observation and experiment** rather than only on what had been handed down.\n\n(ii) **Humanism** is an interest in **human life and abilities**, rather than only in religious matters. **Petrarch** is often called its **father** because his Italian writings and study of classical authors turned attention to human thought and feeling.\n\n(iii) The view has weight. **Trade** made cities rich and gave **patrons** the money to support scholars, and **printing** spread the new ideas widely. Without them, questioning might have stayed within a few towns. Even so, enquiry gave the movement its spirit, so the causes worked together and none acted alone.',
  sol: 'Spirit of enquiry; humanism and Petrarch; balanced discussion of causes.',
  scheme: [['(i) Questioning tradition and authority', 1.5], ['(i) Reason, observation and experiment', 1.5], ['(ii) Humanism: interest in human life and abilities', 1.5], ['(ii) Petrarch often called its father', 1.5], ['(iii) Trade and patrons gave means', 1], ['(iii) Printing spread ideas', 1], ['(iii) Causes worked together; reasoned judgement', 2]],
}));

// ================================================================ t03 Leonardo, Shakespeare, Copernicus
Q('m_leo_works', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined exhibition card at the Rivermead Art Club reads: "The artist who painted The Last Supper and the Mona Lisa also drew machines and studied the human body." Whom does the card name?',
  opts: ['Leonardo da Vinci', 'William Shakespeare', 'Nicolaus Copernicus', 'Johannes Gutenberg'],
  sol: 'Leonardo da Vinci painted The Last Supper and the Mona Lisa and also studied anatomy and designed devices. Shakespeare was a playwright, Copernicus an astronomer and Gutenberg a printer.',
}));
Q('m_leo_notebook', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A guide at the imagined Valdoro Science Museum shows a page of notes, in mirror writing, with sketches of muscles in the arm and drawings of a flying machine. Which Renaissance person would a historian link with such notebooks?',
  opts: [
    'Leonardo da Vinci, whose notebooks hold studies of anatomy and designs for flying machines',
    'William Caxton, who printed notebooks in Mainz',
    'Petrarch, who drew machines to carry humans',
    'Vasco da Gama, who drew the inside of the body',
  ],
  sol: 'Leonardo\'s notebooks contain studies of anatomy and designs for flying machines and other devices. Caxton was a printer, Petrarch a poet, and Vasco da Gama a sea-voyager.',
}));
Q('m_universal', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'On the imagined "Renaissance Heroes" poster of Pinewood School, Leonardo is called a universal man, or Renaissance man. Why is that label used?',
  opts: [
    'He was skilled in many fields, as painter, scientist and engineer',
    'He ruled many countries',
    'He printed books in every language',
    'He travelled to every continent',
  ],
  sol: 'A universal man excels in many fields, and Leonardo did so as painter, scientist and engineer. He was not a ruler, a printer or a traveller to every continent.',
}));
Q('m_shk_plays', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The imagined Hillcrest Drama Club puts up a poster of plays by one English playwright. Which list of four titles belongs to William Shakespeare?',
  opts: [
    'Hamlet, Macbeth, Romeo and Juliet, The Merchant of Venice',
    'The Last Supper, Mona Lisa, Hamlet, Macbeth',
    'The Divine Comedy, Macbeth, Julius Caesar, Hamlet',
    'The Canterbury Tales, Romeo and Juliet, Hamlet, The Merchant of Venice',
  ],
  sol: 'Hamlet, Macbeth, Romeo and Juliet and The Merchant of Venice are all plays by Shakespeare. The Last Supper and the Mona Lisa are paintings, while The Divine Comedy and The Canterbury Tales are long poems by Dante and Chaucer.',
}));
Q('m_shk_count', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'A librarian in the imagined town of Hillcrest tells students that William Shakespeare lived from 1564 to 1616. How many plays are commonly credited to him, besides his sonnets?',
  opts: ['About 37 to 39, as counts vary', 'About 3', 'About 400', 'Exactly 1,000'],
  sol: 'Counts vary, but about 37 to 39 plays are credited to him, along with sonnets. Three is too few, and 400 and 1,000 are far too many.',
}));
Q('m_cop_helio', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In the imagined Pinewood Science Fair, a model shows a bright lamp in the middle with the earth and planets circling around it. Whose theory does this model follow?',
  opts: [
    'Nicolaus Copernicus, whose heliocentric theory put the sun at the centre',
    'Ptolemy, whose view put the sun at the centre',
    'Leonardo da Vinci, who wrote on the planets as a poet',
    'Gutenberg, who wrote a book on planets',
  ],
  sol: 'Copernicus proposed that the earth and planets move around the sun, which is the heliocentric theory. Ptolemy\'s older view was earth-centred, and Leonardo and Gutenberg are not linked with this theory.',
}));
Q('m_geocentric', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'Two imagined students of Pinewood School argue. Aarav says that the sun moves round a still earth; Bina says that the earth and planets move around the sun. Which statement is correct?',
  opts: [
    'Aarav holds the older geocentric (Ptolemaic) view and Bina holds the heliocentric view of Copernicus',
    'Aarav holds the heliocentric view and Bina the geocentric view',
    'Both hold the geocentric view',
    'Both hold the heliocentric view',
  ],
  sol: 'A view that puts the earth still at the centre is geocentric, the older Ptolemaic view. A view that puts the sun at the centre is heliocentric, the view of Copernicus. So Aarav and Bina hold opposite views.',
}));
Q('m_shk_lang', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'An imagined critic writes in the Hillcrest school magazine that Shakespeare is remembered because his plays explore human nature and have enriched English with new expressions. Which Renaissance idea does this reflect?',
  opts: [
    'Humanism, with its interest in human life and abilities, and the rise of a literature in a local language',
    'Feudalism, with its obedience to lords',
    'The geocentric view of the heavens',
    'The disruption of trade after 1453',
  ],
  sol: 'Shakespeare\'s interest in human nature reflects humanism, and writing in English belongs to the rise of vernacular literature. Feudalism, a geocentric view and trade disruption do not explain his work.',
}));
Q('tf_cop', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? An imagined student of Hillcrest writes that Copernicus proposed that the sun moves around a still earth.',
  sol: 'False. Copernicus proposed that the earth and the planets move around the sun (the heliocentric view); the sun moving around a still earth is the older geocentric view.',
}));
Q('tf_shk', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: 'True or false? In the imagined Drama Club notes, William Shakespeare is described as an English playwright and poet whose plays include Hamlet and Macbeth.',
  sol: 'True. Shakespeare (1564 to 1616) was an English playwright and poet; Hamlet and Macbeth are among his plays.',
}));
Q('mt_people', match({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'The imagined Rivermead Art Club exhibition has four cards. Match each person with the field and work that fit.',
  pairs: [
    ['Leonardo da Vinci', 'Painter, scientist and engineer; notebooks on anatomy and flying machines'],
    ['William Shakespeare', 'English playwright and poet; wrote Hamlet and Macbeth'],
    ['Nicolaus Copernicus', 'Astronomer who proposed that the earth moves round the sun'],
    ['Petrarch', 'Italian writer often called the father of humanism'],
  ],
  sol: 'Leonardo was a painter, scientist and engineer, Shakespeare a playwright, Copernicus an astronomer and Petrarch is often called the father of humanism.',
}));
Q('ar_cop', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Copernicus challenged the older earth-centred (geocentric) view of the heavens.',
  r: 'His book on the motion of the earth and planets was published in 1453, the year Constantinople fell.',
  sol: 'The assertion is true, since Copernicus proposed a sun-centred view. The reason is false: his book was published in 1543, not 1453.',
}));
Q('s_leonardo', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is Leonardo da Vinci called a universal man? Give two points.',
  model: 'Leonardo was a **painter**, a **scientist** and an **engineer**, whose works include **The Last Supper** and the **Mona Lisa**. His **notebooks** hold studies of **anatomy** and designs for **flying machines**, so he excelled in many fields.',
  sol: 'Painter, scientist and engineer; notebooks on anatomy and flying machines.',
  scheme: [['Painter, scientist and engineer; named works', 1], ['Notebooks: anatomy and designs for devices', 1]],
}));
Q('s_shk', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two contributions of William Shakespeare to literature.',
  model: 'Shakespeare, an English playwright and poet, wrote about **37 to 39 plays**, among them **Hamlet** and **Macbeth**, as well as sonnets. His subject was **human nature**, and he **added richly to English**.',
  sol: 'Plays and sonnets; human nature; enriched English.',
  scheme: [['Plays and sonnets with named plays', 1], ['Wrote about human nature and enriched English', 1]],
}));
Q('s_cop', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was the heliocentric theory, and whose older view did it challenge?',
  model: 'Copernicus proposed that the **earth and the planets move around the sun**, the **heliocentric theory**. This challenged the older **earth-centred (geocentric) view**, associated with **Ptolemy**.',
  sol: 'Earth and planets move around the sun; challenged the geocentric Ptolemaic view.',
  scheme: [['Earth and planets move around the sun', 1], ['Challenged the earth-centred (Ptolemaic) view', 1]],
}));
Q('s3_three', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name one field and one contribution each for Leonardo da Vinci, William Shakespeare and Nicolaus Copernicus.',
  model: '1. **Leonardo da Vinci** (1452 to 1519), art: painted **The Last Supper** and the **Mona Lisa**.\n2. **William Shakespeare** (1564 to 1616), literature: wrote plays such as **Hamlet** and **Macbeth**.\n3. **Nicolaus Copernicus** (1473 to 1543), science: proposed the **heliocentric theory**.',
  sol: 'Leonardo in art, Shakespeare in literature, Copernicus in science.',
  scheme: [['Leonardo with a contribution', 1], ['Shakespeare with a contribution', 1], ['Copernicus with a contribution', 1]],
}));
Q('s3_models', short({
  t: 3, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Pinewood Science Fair shows two sky models side by side. Explain in three points how the Copernican model differs from the earlier view.',
  model: '1. In the **earlier (geocentric, Ptolemaic) view** the **earth stood at the centre**.\n2. In the **Copernican (heliocentric) view** the **sun is at the centre** and the earth and planets move around it.\n3. The new view **challenged old authority** and later helped astronomers such as Galileo and Kepler.',
  sol: 'Earth at centre versus sun at centre; challenge to authority.',
  scheme: [['Older view: earth at the centre', 1], ['Copernican view: sun at the centre, earth and planets move round it', 1], ['Challenged authority; later astronomers built on it', 1]],
}));
Q('l_arts', long({
  t: 3, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'The imagined Rivermead Art Club is holding a Renaissance exhibition on art and literature.\n\n(i) Describe the work of Leonardo da Vinci. **[3]**\n(ii) Describe the contribution of William Shakespeare to literature. **[3]**\n(iii) Explain why both are seen as products of the Renaissance. **[4]**',
  model: '(i) **Leonardo da Vinci** (1452 to 1519) was a **painter, scientist and engineer**. His works include **The Last Supper** and the **Mona Lisa**, and his **notebooks** hold studies of **anatomy** and designs for **flying machines** and other devices.\n\n(ii) **William Shakespeare** (1564 to 1616) was an **English playwright and poet**. He wrote about **37 to 39 plays**, as counts vary, such as **Hamlet**, **Macbeth**, **Romeo and Juliet**, **Julius Caesar** and **The Merchant of Venice**, and also sonnets.\n\n(iii) Both are products of the Renaissance because of its **humanism**, since they explored **human abilities and human nature**. Leonardo used **observation and experiment** in art and science, and Shakespeare wrote in **English**, helping local languages to flourish. Leonardo is called a **universal man**, and Shakespeare **enriched the English language**.',
  sol: 'Leonardo; Shakespeare; why both belong to the Renaissance.',
  scheme: [['(i) Painter, scientist and engineer', 1], ['(i) Works named', 1], ['(i) Notebooks: anatomy and flying machines', 1], ['(ii) English playwright and poet', 1], ['(ii) Named plays; about 37 to 39 plays and sonnets', 1], ['(ii) Human nature and enriched English', 1], ['(iii) Humanism and human nature or abilities', 1.5], ['(iii) Observation or local language, with an example', 1.5], ['(iii) Universal man or enriched English', 1]],
}));
Q('l_copernicus', long({
  t: 3, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'A school in the imagined town of Hillcrest is putting up a display on how people understood the sky.\n\n(i) What was the older view of the heavens? **[3]**\n(ii) What did Copernicus propose, and when was his book published? **[3]**\n(iii) Explain why his theory was important for later science. **[4]**',
  model: '(i) The older view, called **geocentric** or **Ptolemaic**, held that the **earth stood still at the centre**, with the sun, moon and planets moving around it. It was accepted for a long time because it seemed to fit what people saw and was backed by authority.\n\n(ii) **Nicolaus Copernicus** (1473 to 1543) proposed that the **earth and the planets move around the sun**, the **heliocentric theory**. His book was published in **1543**.\n\n(iii) The theory **challenged the old earth-centred view** and the authority behind it, which showed the **spirit of enquiry**. It **laid the foundation** for later astronomers such as **Galileo and Kepler**, so it helped the growth of science and the experimental method.',
  sol: 'Geocentric view; heliocentric theory and 1543; importance for later science.',
  scheme: [['(i) Geocentric or Ptolemaic view', 1.5], ['(i) Earth still at the centre; others move around it', 1.5], ['(ii) Earth and planets move around the sun', 1.5], ['(ii) Book published in 1543', 1.5], ['(iii) Challenged old view and authority; spirit of enquiry', 2], ['(iii) Foundation for Galileo and Kepler', 2]],
}));
Q('sb_diary', source({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined apprentice's diary and answer the questions that follow. ${IMAG}`,
  passage: '**A page from the imagined diary of Tomas, apprentice in a print shop in the made-up town of Valdoro**\n\nMaster Bruno set the letters in the frame this morning, one metal block for each letter, and I inked them while he pulled the press. By evening we had a stack of finished sheets. A scribe in the next street needs a season to copy one book, and Bruno says our books cost only a part of his. Today a young teacher bought a copy and said she would read it aloud to her pupils. Bruno says that the same book is now being read in many towns, and that people ask more questions than they once did.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'According to the diary, what is the advantage of printed books over those of the scribe?', model: 'Printed books are **cheaper** and can be made **faster and in larger numbers**.', sol: 'Cheaper and quicker.', scheme: [['Cheaper or faster', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Which real invention does Bruno\'s method resemble, and who developed it?', model: '**Movable metal type**, developed by **Johannes Gutenberg** of Mainz about 1450.', sol: 'Movable metal type, Gutenberg.', scheme: [['Movable type by Gutenberg', 1]] })),
    child('c', short({ t: [2, 3], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Name two effects of printing that the diary suggests.', model: 'Books became **cheaper and more numerous**, so **literacy spread**; the same book was read in many towns, so **ideas travelled faster** and people **asked more questions**.', sol: 'Any two effects.', scheme: [['First effect', 1], ['Second effect', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): The diary says people asked more questions. Link this to a spirit of the Renaissance and name one thinker who questioned an old view.', model: 'It shows the **spirit of enquiry**. **Copernicus** questioned the older earth-centred view and proposed the heliocentric theory.', sol: 'Spirit of enquiry; Copernicus.', scheme: [['Spirit of enquiry', 1], ['Copernicus or another named thinker', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 Consequences
Q('m_vernacular', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A teacher at the imagined Hillcrest School shows two books: a long poem written in Italian by Dante and a set of tales written in English by Chaucer. What development of the Renaissance do both illustrate?',
  opts: [
    'The rise of vernacular languages and literature, helped by the printing press',
    'The end of all writing in Latin',
    'The decline of feudalism in Italy only',
    'The rule of a single language over all Europe',
  ],
  sol: 'Writing in the everyday languages of the people, such as Italian and English, is the rise of vernacular literature, which printing helped to spread. Writing in Latin did not end, and no single language ruled Europe.',
}));
Q('m_perspective', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'On an imagined Rivermead Art Club card, a painter explains that she makes a road in her picture look as if it runs back into the distance, and that she studies bones and muscles so that her figures look real. Which consequence of the Renaissance does her method show?',
  opts: [
    'Realism in art, with perspective, anatomy and a study of nature',
    'The spread of feudalism in art',
    'The use of printing to copy portraits',
    'The rule of a king over art',
  ],
  sol: 'Perspective, a study of anatomy and a close look at nature are marks of Renaissance realism in art. The other options name things that have nothing to do with how the picture is made.',
}));
Q('m_nation', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'An imagined Pinewood School chart links the decline of feudal lords, the rise of a rich middle class that paid taxes, and cannon owned by kings. Which consequence does this chain of facts help to explain?',
  opts: [
    'The growth of strong nation-states under powerful kings',
    'The return of feudalism',
    'The end of trade in Europe',
    'The loss of all interest in learning',
  ],
  sol: 'When lords weakened and kings gained money and cannon, kings grew stronger, which helped nation-states to grow. The chain points away from feudalism, the end of trade and the loss of learning.',
}));
Q('m_science_growth', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A group of imagined students in the Valdoro Science Club tests ideas by repeating an experiment before accepting any claim. Which consequence of the Renaissance does their method continue?',
  opts: [
    'The growth of science and the experimental method',
    'The spread of feudal obedience',
    'The end of printing',
    'The decline of towns',
  ],
  sol: 'Testing ideas by experiment belongs to the growth of science and the experimental method that the Renaissance encouraged. Feudal obedience, the end of printing and the decline of towns do not.',
}));
Q('m_humanism', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'A student of the imagined Hillcrest School writes a definition of humanism for the school magazine. Which definition is correct?',
  opts: [
    'An interest in human life and abilities, with Petrarch often called its father',
    'A belief that kings alone should rule',
    'A system by which lords held land from kings',
    'The study of the stars only',
  ],
  sol: 'Humanism is an interest in human life and abilities, and Petrarch is often called its father. Rule by kings, lords holding land and the study of stars are different ideas.',
}));
Q('m_enquiry_link', mcq({
  t: 4, d: 4, c: 'evaluation',
  stem: 'An imagined student, Zoya, says in a Hillcrest debate: "The spirit of enquiry led some people to question old practices, and in time it helped to bring about the Reformation, which is studied in the next chapter." Which comment on her claim is the most accurate?',
  opts: [
    'It is reasonable, since the spirit of enquiry encouraged questioning, though the Reformation had other causes too',
    'It is false, because the Renaissance had no effect on anything later',
    'It is true only for science and never for religion',
    'It is false, because the Reformation happened before the Renaissance',
  ],
  sol: 'The spirit of enquiry encouraged questioning and later helped lead towards the Reformation, though that movement had its own causes as well. The Renaissance did affect later events, and the Reformation came after it, not before.',
}));
Q('ar_vernacular', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Literature in vernacular languages grew during and after the Renaissance.',
  r: 'The printing press made books in local languages cheaper, so many more people could read them.',
  sol: 'Both are true, and the reason explains the assertion: cheap printed books made it easier for writers in local languages to reach many readers.',
}));
Q('ord_consequence', ord({
  t: 4, d: 3, c: 'analysis', marks: 2,
  stem: 'The imagined Valdoro Print Museum puts four stages of one chain on separate cards. Put them in logical order.',
  items: ['Gutenberg develops movable type', 'Books become cheaper and more numerous', 'Literacy spreads among more people', 'Ideas travel faster across Europe'],
  sol: 'Movable type, cheaper and more numerous books, spread of literacy, faster travel of ideas.',
}));
Q('mt_conseq', match({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'The imagined Pinewood School displays four consequence cards. Match each consequence with its example.',
  pairs: [
    ['Humanism', 'Interest in human life and abilities; Petrarch'],
    ['Realism in art', 'Perspective and the study of anatomy'],
    ['Growth of science', 'Copernicus and later astronomers; the experimental method'],
    ['Vernacular literature', 'Dante in Italian and Chaucer in English'],
  ],
  sol: 'Humanism relates to Petrarch, realism in art to perspective and anatomy, growth of science to Copernicus and experiment, and vernacular literature to Dante and Chaucer.',
}));
Q('s_conseq', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two consequences of the Renaissance for art and science.',
  model: 'In art, **realism** developed, with **perspective**, a study of **anatomy** and nature. In science, the **experimental method** grew, as shown by astronomers who followed **Copernicus**.',
  sol: 'Realism in art; growth of science and experiment.',
  scheme: [['Realism in art: perspective, anatomy, nature', 1], ['Growth of science and the experimental method', 1]],
}));
Q('s_vernacular', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the rise of vernacular literature? Give two examples.',
  model: 'It means that writers used the **everyday languages of the people**, not only Latin. **Dante** wrote in **Italian** and **Chaucer** in **English**, and the **printing press** helped such works to reach readers.',
  sol: 'Writing in local languages; Dante, Chaucer, printing helped.',
  scheme: [['Writing in local or everyday languages', 1], ['Dante in Italian and Chaucer in English', 1]],
}));
Q('s3_conseq', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three consequences of the Renaissance.',
  model: '1. **Humanism** developed, with interest in human life and abilities.\n2. **Realism in art** grew, and **science and the experimental method** advanced.\n3. **Vernacular languages and literature** rose, and **strong nation-states** grew, while the spirit of enquiry encouraged geographical discoveries.',
  sol: 'Any three: humanism, realism, science, vernacular literature, nation-states.',
  scheme: [['First consequence', 1], ['Second consequence', 1], ['Third consequence', 1]],
}));
Q('s3_reform_line', short({
  t: 4, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'An imagined student in a Pinewood School quiz says that the Renaissance affected only art. Give three points to show that this is wrong.',
  model: '1. It affected **literature**, as vernacular writers such as Dante and Chaucer and later Shakespeare show.\n2. It affected **science**, as Copernicus challenged the earth-centred view.\n3. The **spirit of enquiry** encouraged **geographical discoveries** and later the Reformation, so it changed Europe widely.',
  sol: 'Literature; science; enquiry led to discoveries.',
  scheme: [['Effect on literature', 1], ['Effect on science', 1], ['Spirit of enquiry linked to discoveries and later events', 1]],
}));
Q('l_conseq', long({
  t: 4, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The imagined Pinewood School is preparing a summary chart on what changed in Europe because of the Renaissance.\n\n(i) Explain humanism and realism in art. **[3]**\n(ii) Describe the rise of science and of vernacular literature. **[3]**\n(iii) How did the Renaissance help the growth of strong nation-states and the spirit of discovery? **[4]**',
  model: '(i) **Humanism** was an interest in **human life and abilities**, with **Petrarch** often called its father. In art, **realism** grew, with **perspective**, a study of **anatomy** and a close look at **nature**.\n\n(ii) **Science** advanced through the **experimental method** and observation, as in the heliocentric theory of **Copernicus**. **Vernacular languages** also rose, as **Dante** wrote in Italian and **Chaucer** in English, and the **printing press** helped such books to spread.\n\n(iii) As **feudal lords weakened**, **kings grew stronger** and **nation-states** developed, helped by taxes from the middle class and by cannon. The **spirit of enquiry** also **encouraged geographical discoveries**, such as the voyages of Columbus and Vasco da Gama, and later the Reformation.',
  sol: 'Humanism and realism; science and vernacular literature; nation-states and discoveries.',
  scheme: [['(i) Humanism with Petrarch', 1.5], ['(i) Realism in art: perspective, anatomy, nature', 1.5], ['(ii) Science and experimental method, Copernicus', 1.5], ['(ii) Vernacular languages, Dante and Chaucer, printing', 1.5], ['(iii) Weakened lords, stronger kings, nation-states', 2], ['(iii) Enquiry encouraged discoveries and later events', 2]],
}));
Q('sb_card', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined exhibition card and answer the questions that follow. ${IMAG}`,
  passage: '**An exhibition card from the made-up Rivermead Art Club, "Looking at the World Again"**\n\nPainter Elena Marsh made two pictures of the same village green. The first, in the older style, shows flat figures of the same size no matter how far away they stand. The second shows the green with the road narrowing to a point, the villagers with real muscles under their sleeves, and a cat that looks as if it might jump. Elena visited a dissecting room at the college of Montrose to study how the body is built. She says: "I want to see the world as it is, not only as I was taught to draw it."',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name one feature of the second picture that shows realism.', model: 'The **road narrowing to a point** (perspective), or figures with **real muscles** (anatomy).', sol: 'Perspective or anatomy.', scheme: [['One feature', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Which Renaissance person studied anatomy in notebooks and is called a universal man?', model: '**Leonardo da Vinci**.', sol: 'Leonardo da Vinci.', scheme: [['Leonardo da Vinci', 1]] })),
    child('c', short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): How does Elena\'s approach reflect the spirit of enquiry? Give two points.', model: 'She **observes the world directly**, as when she studies the body, and she **questions the older style** she was taught. This is the reliance on **observation and reason** instead of tradition alone.', sol: 'Observation; questions older tradition.', scheme: [['Direct observation of the body or the village', 1], ['Questions tradition rather than accepting it', 1]] }), [
      short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name two other consequences of the Renaissance besides realism in art.', model: 'Any two: **humanism**, **growth of science**, **vernacular literature**, **strong nation-states**.', sol: 'Any two consequences.', scheme: [['First consequence', 1], ['Second consequence', 1]] }),
    ]),
  ],
}));
Q('sb_notebook', source({
  t: [2, 3], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined notebook page and answer the questions that follow. ${IMAG}`,
  passage: '**A page from a school notebook of the made-up Hillcrest Observers\' Club**\n\nTwo drawings of the sky are pinned side by side. Drawing one puts the earth in the middle and shows the sun and planets circling it. Drawing two puts the sun in the middle and shows the earth and the other planets circling it, and the earth also turning once on its own axis. Our teacher says the second drawing came from a book published in the year 1543, and that older teachers found it hard to accept because the first drawing matched what they saw and what an old authority had written. We decided to watch the sky ourselves for a month before choosing.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'recall', marks: 1, stem: 'Which drawing shows the heliocentric view?', model: '**Drawing two**, with the sun in the middle.', sol: 'Drawing two.', scheme: [['Drawing two', 1]] })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'Name the scientist whose book of 1543 is meant.', model: '**Nicolaus Copernicus**.', sol: 'Copernicus.', scheme: [['Copernicus', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Why did the club decide to watch the sky for a month? Link your answer to the Renaissance.', model: 'They wanted to rely on **observation and reason** rather than only on authority, which is the **spirit of enquiry** of the Renaissance.', sol: 'Observation over authority; spirit of enquiry.', scheme: [['Observation rather than authority', 1], ['Link to the spirit of enquiry', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name the older view shown in drawing one and one astronomer who built on Copernicus later.', model: 'It is the **geocentric (Ptolemaic) view**. **Galileo** or **Kepler** built on the work of Copernicus.', sol: 'Geocentric; Galileo or Kepler.', scheme: [['Geocentric or Ptolemaic view', 1], ['Galileo or Kepler', 1]] }),
    ]),
  ],
}));
