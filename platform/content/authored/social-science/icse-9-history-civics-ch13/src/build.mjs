// Build ICSE 9 History & Civics ch13 Medieval India: The Mughal Empire. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch13/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch13', 'social-science');
const { RULERS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (own drawings, schematic)
/** The rulers as bars on one time line, drawn to scale (years CE). */
function rulersFigure(alt, caption) {
  const s = new Svg(780, 290);
  const y0 = RULERS[0][1];
  const y1 = RULERS[RULERS.length - 1][2];
  const px = 700 / (y1 - y0);
  const X = (yr) => 40 + (yr - y0) * px;
  const cols = ['accent', 'green', 'blue', 'accent', 'green', 'blue', 'accent'];
  // the interval of Sher Shah Suri, drawn as a dashed outline
  s.rect(X(1540), 120, (1555 - 1540) * px, 40, { rx: 4, color: 'muted', dash: true, sw: 1.4 });
  RULERS.forEach(([name, a, b], i) => {
    s.rect(X(a), 120, (b - a) * px, 40, { rx: 4, fill: cols[i], fillOpacity: 0.22, color: cols[i], sw: 1.8 });
  });
  // wide bars: name inside, years below
  [[3, 'Akbar'], [4, 'Jahangir'], [5, 'Shah Jahan'], [6, 'Aurangzeb']].forEach(([i, nm]) => {
    const [, a, b] = RULERS[i];
    const cx = X((a + b) / 2);
    s.text(cx, 140, nm, { size: 14, bold: true });
    s.text(cx, 180, `${a} to ${b}`, { size: 12 });
  });
  // narrow bars: callouts above
  s.line(X(1528), 52, X(1528), 120, { sw: 1, color: 'muted', dash: true });
  s.text(40, 38, 'Babur 1526 to 1530', { size: 13, bold: true, anchor: 'start' });
  s.line(X(1535), 80, X(1535), 120, { sw: 1, color: 'muted', dash: true });
  s.text(70, 66, 'Humayun 1530 to 1540', { size: 13, bold: true, anchor: 'start' });
  s.line(X(1547.5), 100, X(1547.5), 120, { sw: 1, color: 'muted', dash: true });
  s.text(110, 92, 'Sher Shah Suri interval, 1540 to 1555', { size: 12, anchor: 'start' });
  // second period of Humayun: callout below
  s.line(X(1555.5), 160, X(1555.5), 208, { sw: 1, color: 'muted', dash: true });
  s.text(X(1555.5), 222, 'Humayun again, 1555 to 1556', { size: 13, bold: true, anchor: 'start' });
  s.text(390, 262, 'Drawn to scale. Years CE as commonly taught; Shah Jahan is given from 1628', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic map of the three battles of Babur. */
function battlesFigure(alt, caption) {
  const s = new Svg(800, 400);
  s.rect(20, 20, 470, 340, { rx: 14, color: 'muted', dash: true, sw: 1.3 });
  s.text(40, 38, 'North India (schematic)', { size: 12, anchor: 'start', muted: true });
  // the Ganga as a dashed line
  s.path('M 310 100 C 360 170, 420 240, 470 320', { color: 'blue', dash: true, sw: 1.6 });
  s.text(425, 225, 'Ganga', { size: 12, anchor: 'start', color: 'blue' });
  const P = { panipat: [180, 90], delhi: [235, 150], khanwa: [200, 245], agra: [260, 235], ghaghra: [370, 290] };
  const arrow = (a, b) => {
    const [x1, y1] = a; const [x2, y2] = b;
    const L = Math.hypot(x2 - x1, y2 - y1); const k = 11 / L;
    s.arrow(x1 + (x2 - x1) * k, y1 + (y2 - y1) * k, x2 - (x2 - x1) * k, y2 - (y2 - y1) * k, { sw: 1.4, color: 'muted', dash: true });
  };
  arrow(P.panipat, P.khanwa);
  arrow(P.khanwa, P.ghaghra);
  s.dot(P.delhi[0], P.delhi[1], 5, 'muted');
  s.text(P.delhi[0] + 12, P.delhi[1], 'Delhi', { size: 13, anchor: 'start' });
  s.dot(P.agra[0], P.agra[1], 5, 'muted');
  s.text(P.agra[0] + 12, P.agra[1] - 14, 'Agra', { size: 13, anchor: 'start' });
  [['panipat', '1 Panipat', 'accent', 'start'], ['khanwa', '2 Khanwa', 'green', 'end'], ['ghaghra', '3 Ghaghra', 'blue', 'start']].forEach(([k, label, col, anc]) => {
    s.dot(P[k][0], P[k][1], 7, col);
    if (k === 'ghaghra') s.text(P[k][0], P[k][1] - 20, label, { size: 14, bold: true });
    else s.text(P[k][0] + (anc === 'start' ? 14 : -14), P[k][1], label, { size: 14, anchor: anc, bold: true });
  });
  const x = 515;
  s.text(x, 40, 'Babur\'s three battles', { size: 15, anchor: 'start', bold: true });
  const rows = [
    ['1 Panipat, 1526', 'against Ibrahim Lodi'],
    ['2 Khanwa, 1527', 'against Rana Sanga and allies'],
    ['3 Ghaghra, 1529', 'against Afghan chiefs of the east'],
  ];
  rows.forEach(([a, b], i) => {
    s.text(x, 80 + i * 56, a, { size: 14, anchor: 'start', bold: true });
    s.text(x, 102 + i * 56, b, { size: 12, anchor: 'start' });
  });
  s.text(x, 262, 'Dashed arrows show the order of', { size: 12, anchor: 'start' });
  s.text(x, 280, 'the battles, not routes.', { size: 12, anchor: 'start' });
  s.text(400, 384, 'Schematic, not to scale, positions approximate', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic elevation of the Taj Mahal with a small plan of the charbagh. */
function tajFigure(alt, caption) {
  const s = new Svg(900, 500);
  // raised platform and main block
  s.rect(150, 340, 460, 28, { rx: 3, fill: 'fill', fillOpacity: 0.5, color: 'muted', sw: 1.6 });
  s.rect(270, 200, 220, 140, { rx: 3, fill: 'accent', fillOpacity: 0.1, color: 'accent', sw: 1.8 });
  // central arched portal
  s.path('M 350 340 L 350 262 C 350 235, 410 235, 410 262 L 410 340', { color: 'accent', sw: 1.6 });
  // double dome: outer solid, inner dashed
  s.path('M 310 200 C 298 128, 336 106, 380 106 C 424 106, 462 128, 450 200', { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.9 });
  s.path('M 332 200 C 326 152, 350 140, 380 140 C 410 140, 434 152, 428 200', { color: 'blue', dash: true, sw: 1.3 });
  s.line(380, 106, 380, 80, { sw: 1.6 });
  s.dot(380, 77, 3);
  // two small side domes
  s.path('M 275 200 C 275 182, 297 182, 297 200', { color: 'accent', sw: 1.5 });
  s.path('M 463 200 C 463 182, 485 182, 485 200', { color: 'accent', sw: 1.5 });
  // minarets (front pair; back pair hidden in this view)
  [[180, 200], [550, 200]].forEach(([x]) => {
    s.rect(x - 11, 150, 22, 190, { rx: 2, fill: 'green', fillOpacity: 0.16, color: 'green', sw: 1.6 });
    s.rect(x - 14, 140, 28, 10, { rx: 2, color: 'green', sw: 1.4 });
    s.path(`M ${x - 10} 140 C ${x - 10} 122, ${x + 10} 122, ${x + 10} 140`, { color: 'green', sw: 1.5 });
  });
  // labels on the right
  const R = 650;
  s.line(380, 82, R - 8, 82, { sw: 1, color: 'muted', dash: true });
  s.text(R, 82, 'Finial', { size: 13, anchor: 'start' });
  s.line(452, 150, R - 8, 150, { sw: 1, color: 'muted', dash: true });
  s.text(R, 138, 'Double dome', { size: 13, anchor: 'start', bold: true });
  s.text(R, 158, '(outer and inner shell)', { size: 12, anchor: 'start' });
  s.line(410, 255, R - 8, 220, { sw: 1, color: 'muted', dash: true });
  s.text(R, 220, 'Central arched portal', { size: 13, anchor: 'start' });
  s.line(486, 300, R - 8, 290, { sw: 1, color: 'muted', dash: true });
  s.text(R, 278, 'White marble with inlay', { size: 13, anchor: 'start', bold: true });
  s.text(R, 298, 'of coloured stones', { size: 12, anchor: 'start' });
  s.text(R, 316, '(pietra dura)', { size: 12, anchor: 'start' });
  s.line(610, 354, R - 8, 354, { sw: 1, color: 'muted', dash: true });
  s.text(R, 354, 'Raised platform', { size: 13, anchor: 'start' });
  s.line(180, 130, 140, 100, { sw: 1, color: 'muted', dash: true });
  s.text(20, 90, 'Minaret: four in all,', { size: 13, anchor: 'start', bold: true });
  s.text(20, 110, 'two hidden behind', { size: 12, anchor: 'start' });
  s.text(380, 392, 'Symmetrical about the centre line', { size: 13 });
  // plan inset: the charbagh
  s.rect(40, 405, 120, 80, { rx: 3, color: 'muted', sw: 1.6 });
  s.line(100, 405, 100, 485, { sw: 1.4, color: 'green' });
  s.line(40, 445, 160, 445, { sw: 1.4, color: 'green' });
  s.text(200, 435, 'Plan: the charbagh, a garden', { size: 13, anchor: 'start' });
  s.text(200, 455, 'divided into four parts', { size: 13, anchor: 'start' });
  s.text(640, 475, 'Schematic, not to scale', { size: 12, muted: true });
  return s.visual(alt, caption);
}

/** Structure chart of the mansabdari system. */
function mansabFigure(alt, caption) {
  const s = new Svg(760, 440);
  s.rect(190, 10, 380, 44, { rx: 8, fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.8 });
  s.text(380, 32, 'The emperor appoints, ranks and transfers', { size: 14, bold: true });
  s.arrow(380, 54, 380, 80, { sw: 1.6 });
  s.rect(170, 80, 420, 52, { rx: 8, fill: 'green', fillOpacity: 0.14, color: 'green', sw: 1.8 });
  s.text(380, 99, 'Mansabdars: officers who hold a mansab (rank)', { size: 14, bold: true });
  s.text(380, 119, 'Ranks from 10 up to 5,000 for nobles; higher for princes', { size: 12 });
  s.arrow(300, 132, 190, 170, { sw: 1.6 });
  s.arrow(460, 132, 570, 170, { sw: 1.6 });
  s.rect(40, 170, 300, 70, { rx: 8, fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.8 });
  s.text(190, 194, 'Zat', { size: 15, bold: true });
  s.text(190, 218, 'personal rank and pay', { size: 13 });
  s.rect(420, 170, 300, 70, { rx: 8, fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.8 });
  s.text(570, 194, 'Sawar', { size: 15, bold: true });
  s.text(570, 218, 'number of horsemen to maintain', { size: 13 });
  s.arrow(190, 240, 330, 280, { sw: 1.6 });
  s.arrow(570, 240, 430, 280, { sw: 1.6 });
  s.rect(170, 280, 420, 54, { rx: 8, fill: 'fill', fillOpacity: 0.5, color: 'muted', sw: 1.6 });
  s.text(380, 300, 'Paid in cash or by a jagir', { size: 14, bold: true });
  s.text(380, 320, '(an assignment of land revenue)', { size: 12 });
  s.text(380, 366, 'Rules: ranks not hereditary; officers transferred; ranks given on merit', { size: 13, bold: true });
  s.text(380, 392, 'Merits: efficient army, loyalty. Defects: false musters, pressure on peasants, shortage of jagirs', { size: 12 });
  s.text(380, 424, 'Simplified chart of the system as commonly taught', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ---------------------------------------------------------------- figures and tables: Part 1
const vRoute1 = flow('LR', ['Sources: the Ain-i-Akbari and Shah Jahan\'s monuments', 'The Mughal rulers in order', 'Babur: three battles'], 'Route map of Part 1: the sources, the Mughal rulers in order, and the three battles of Babur', 'Part 1 at a glance');
const vAin = table(['Point', 'The Ain-i-Akbari'], [
  ['Author', 'Abul Fazl, a courtier of Akbar'],
  ['Part of', 'The third part of the Akbarnama, completed about 1598'],
  ['Describes', 'Administration, revenue system, mansabdari, army, provinces, society, statistics of produce and prices'],
], 'Table about the Ain-i-Akbari: written by Abul Fazl, third part of the Akbarnama completed about 1598, describing administration, revenue, mansabdari, army, provinces, society and statistics of produce and prices');
const vAinCare = table(['Value', 'Care needed'], [
  ['Detailed official information', 'Written by a courtier, so it praises Akbar'],
  ['Statistics and descriptions', 'Compare with other sources'],
  ['Many subjects in one work', 'Do not accept every claim as final'],
], 'Table of the value of the Ain-i-Akbari, detailed official information, and the care needed, since it was written by a courtier who praises Akbar and should be compared with other sources');
const vTajFacts = table(['Feature', 'Taj Mahal, Agra'], [
  ['Built by', 'Shah Jahan, in memory of his wife Mumtaz Mahal'],
  ['Built', 'About 1632 to 1653'],
  ['Materials and decoration', 'White marble; inlay of coloured stones (pietra dura)'],
  ['Plan', 'Charbagh garden, raised platform, symmetry'],
  ['Parts', 'Double dome, four minarets'],
  ['Recognition', 'UNESCO World Heritage Site, 1983'],
], 'Table of features of the Taj Mahal: built by Shah Jahan in memory of Mumtaz Mahal about 1632 to 1653, white marble with pietra dura inlay, charbagh garden, raised platform, symmetry, double dome, four minarets, World Heritage Site in 1983');
const vTaj = tajFigure('Schematic elevation of the Taj Mahal with a double dome and finial, a central arched portal, two visible minarets of four, a raised platform and white marble with inlay, and a small plan of the four-part charbagh garden; not to scale', 'The Taj Mahal (schematic, not to scale).');
const vJamaRed = table(['Monument', 'Built by Shah Jahan', 'Features'], [
  ['Jama Masjid, Delhi', 'About 1650 to 1656', 'Red sandstone and white marble; large courtyard; three domes and two minarets; one of the largest mosques in India'],
  ['Red Fort (Lal Qila), Delhi', 'About 1639 to 1648', 'Red sandstone walls; Diwan-i-Am and Diwan-i-Khas; in Shahjahanabad; World Heritage Site, 2007'],
], 'Table of the Jama Masjid built about 1650 to 1656 with a large courtyard, three domes and two minarets, and the Red Fort built about 1639 to 1648 with red sandstone walls and two halls of audience in Shahjahanabad');
const vHalls = table(['Hall', 'Meaning', 'Who came'], [
  ['Diwan-i-Am', 'Hall of public audience', 'Ordinary petitioners and the public'],
  ['Diwan-i-Khas', 'Hall of private audience', 'Nobles and officers by invitation'],
], 'Table of the two halls of the Red Fort: Diwan-i-Am, the hall of public audience, and Diwan-i-Khas, the hall of private audience');
const vReveal = table(['What we see', 'What it reveals'], [
  ['Large buildings of marble and sandstone', 'Wealth of the empire'],
  ['Grand scale and planning', 'Power of the emperor'],
  ['Domes, arches and inlay', 'A blend of Persian and Indian styles'],
  ['Fine carving and inlay work', 'Skilled craftsmen'],
], 'Table of what the monuments reveal: large buildings show wealth, grand scale shows power, domes and arches show a blend of Persian and Indian styles, and fine work shows skilled craftsmen');
const vLabel = table(['Step', 'Example: an imagined museum label'], [
  ['1. Describe what you see', 'A model of a white tomb with four minarets and a garden in four parts'],
  ['2. Name the monument', 'The Taj Mahal, Agra'],
  ['3. Say what it reveals', 'Wealth, power, a blend of styles, skilled craftsmen'],
  ['4. Add one care', 'One building cannot show the whole empire'],
], 'Table of four steps for reading a museum label: describe the model, name the monument, say what it reveals, and add a caution');
const vRulers = rulersFigure('Seven bars on a time line drawn to scale: Babur 1526 to 1530, Humayun 1530 to 1540, an interval of Sher Shah Suri 1540 to 1555, Humayun again 1555 to 1556, Akbar 1556 to 1605, Jahangir 1605 to 1627, Shah Jahan 1628 to 1658 and Aurangzeb 1658 to 1707', 'The Mughal rulers (to scale).');
const vEarly = table(['Ruler', 'About', 'Note'], [
  ['Babur', '1526 to 1530', 'Began Mughal rule after the First Battle of Panipat'],
  ['Humayun', '1530 to 1540 and 1555 to 1556', 'His rule was interrupted by Sher Shah Suri'],
  ['Akbar', '1556 to 1605', 'Third in the order of rulers'],
], 'Table of the first three Mughal rulers: Babur 1526 to 1530, Humayun 1530 to 1540 and 1555 to 1556 with Sher Shah Suri between, and Akbar 1556 to 1605');
const vLater = table(['Ruler', 'About', 'Place in the order'], [
  ['Jahangir', '1605 to 1627', 'After Akbar'],
  ['Shah Jahan', '1628 to 1658', 'After Jahangir; builder of the Taj Mahal, Jama Masjid and Red Fort'],
  ['Aurangzeb', '1658 to 1707', 'After Shah Jahan'],
], 'Table of Jahangir 1605 to 1627, Shah Jahan 1628 to 1658 and Aurangzeb 1658 to 1707 with their place in the order of rulers');
const vPanipat = table(['Point', 'First Battle of Panipat'], [
  ['Year', '1526'],
  ['Against', 'Ibrahim Lodi, the last Sultan of Delhi'],
  ['Babur\'s advantages', 'Artillery (guns); the tulughma flanking tactic; defences of carts'],
  ['Result', 'End of the Delhi Sultanate; start of Mughal rule'],
], 'Table about the First Battle of Panipat in 1526 against Ibrahim Lodi, with Babur\'s advantages of artillery, the tulughma and carts, and the result of the end of the Delhi Sultanate and the start of Mughal rule');
const vMap = battlesFigure('Schematic map of north India with a dashed Ganga, Delhi and Agra marked, and three numbered battle sites in order: 1 Panipat north of Delhi, 2 Khanwa west of Agra and 3 Ghaghra to the east, with the years 1526, 1527 and 1529 and the opponents listed; not to scale and positions approximate', 'Babur\'s three battles (schematic, not to scale).');
const vKG = table(['Battle', 'Against', 'Result'], [
  ['Khanwa, 1527', 'Rana Sanga of Mewar and allies', 'Mughal power secured in north India'],
  ['Ghaghra, 1529', 'Afghan chiefs of Bihar and Bengal, including Mahmud Lodi', 'Eastern Afghan resistance checked'],
], 'Table of the Battle of Khanwa in 1527 against Rana Sanga and allies, and the Battle of Ghaghra in 1529 against Afghan chiefs of Bihar and Bengal, with their results');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three battles, years and opponents'],
  ['(ii)', '3', 'Artillery; tulughma; carts'],
  ['(iii)', '4', 'One result for each battle, with a short link'],
], 'Table planning a ten-mark answer on Babur: part (i) three battles for 3 marks, part (ii) advantages at Panipat for 3 marks, part (iii) results for 4 marks');
const vSummary1 = table(['Topic', 'Key points'], [
  ['Sources', 'Ain-i-Akbari (Abul Fazl, about 1598); Taj Mahal, Jama Masjid, Red Fort'],
  ['Rulers', 'Babur, Humayun, Akbar, Jahangir, Shah Jahan, Aurangzeb'],
  ['Babur', 'Panipat 1526, Khanwa 1527, Ghaghra 1529'],
], 'Summary table of Part 1: sources, the rulers in order and the three battles of Babur');

// ---------------------------------------------------------------- figures and tables: Part 2
const vRoute2 = flow('LR', ['Akbar: Rajput policy and integration', 'Akbar: social and educational reforms', 'The mansabdari system'], 'Route map of Part 2: Akbar\'s Rajput policy and integration, his social and educational reforms, and the mansabdari system', 'Part 2 at a glance');
const vRajputMethods = table(['Method', 'Example'], [
  ['Alliances through marriage', 'With the Kachhwaha ruler of Amber, 1562'],
  ['High mansabs for Rajput nobles', 'Raja Man Singh'],
  ['Kingdoms kept by rulers who accepted overlordship', 'Rulers who joined the empire'],
  ['War with rulers who refused', 'Mewar under Maharana Pratap; Battle of Haldighati, 1576'],
], 'Table of the features of Akbar\'s Rajput policy: marriage alliances with Amber in 1562, high mansabs such as Raja Man Singh, kingdoms kept by rulers who accepted overlordship, and war with those who refused, such as Mewar and the Battle of Haldighati in 1576');
const vRajputFlow = flow('LR', ['Aim: a stable empire with loyal allies', 'Alliances, high mansabs, kingdoms kept', 'Rajput nobles serve the empire'], 'Flow: the aim of a stable empire with loyal allies, then alliances, high mansabs and kingdoms kept, then Rajput nobles serving the empire', 'Aim, means and effect.');
const vAccept = table(['Choice of the ruler', 'What followed'], [
  ['Accepted Mughal overlordship', 'Kept his kingdom; his house joined the empire as partners'],
  ['Refused overlordship', 'Faced war'],
  ['Example of resistance', 'Maharana Pratap of Mewar resisted; Haldighati was fought in 1576'],
], 'Table: rulers who accepted overlordship kept their kingdoms, rulers who refused faced war, and Maharana Pratap of Mewar resisted, with the Battle of Haldighati in 1576');
const vClassify = table(['Imagined case', 'Feature of the policy'], [
  ['Raja Veer accepts overlordship and keeps his kingdom', 'Kingdoms kept by rulers who accept'],
  ['A noble of Amber is given a mansab of high rank', 'High mansabs for Rajput nobles'],
  ['A kingdom refuses overlordship and a battle follows', 'War with rulers who refuse'],
], 'Table sorting three imagined cases into features of the Rajput policy: kingdom kept, high mansab, and war with a ruler who refuses');
const vSulh = table(['Step', 'About', 'Aim'], [
  ['Sulh-i-kul, peace with all', 'Policy of the reign', 'Tolerance'],
  ['Pilgrim tax abolished', 'About 1563', 'Remove a tax on pilgrims to holy places'],
  ['Jizya abolished', 'About 1564', 'Remove a tax on non-Muslim subjects'],
], 'Table of Sulh-i-kul meaning peace with all, the abolition of the pilgrim tax about 1563 and of the jizya about 1564, with their aims');
const vSteps = flow('LR', ['About 1563: pilgrim tax abolished', 'About 1564: jizya abolished', 'From about 1575: Ibadat Khana'], 'Flow of steps of Akbar: about 1563 the pilgrim tax abolished, about 1564 the jizya abolished and from about 1575 the Ibadat Khana', 'Steps of integration in order.');
const vIntegration = table(['Step', 'What it did'], [
  ['Ibadat Khana, Fatehpur Sikri (from about 1575)', 'Scholars of different faiths discussed ideas'],
  ['Persian as the language of administration', 'One language for officers across regions'],
  ['Uniform administration', 'One system of rules in the provinces'],
  ['Din-i-Ilahi (optional)', 'A small following; it ended with him'],
], 'Table of the Ibadat Khana from about 1575, Persian as the language of administration, a uniform administration, and the Din-i-Ilahi with a small following that ended with Akbar');
const vSocial = table(['Reform (as commonly taught)', 'Detail'], [
  ['Forced sati', 'Discouraged'],
  ['Widow remarriage', 'Allowed'],
  ['Child marriage', 'Discouraged by fixing minimum ages for marriage'],
], 'Table of social reforms as commonly taught: forced sati discouraged, widow remarriage allowed, and child marriage discouraged by minimum ages for marriage');
const vEdu = table(['Area', 'What Akbar did'], [
  ['Education', 'Encouraged practical subjects such as mathematics, agriculture and history in schools'],
  ['Translation', 'Sanskrit works such as the Mahabharata translated into Persian (the Razmnama), with other works'],
  ['Patronage', 'Scholars, painters and musicians, for example Tansen'],
], 'Table of education, translation and patronage under Akbar: practical subjects in schools, translations including the Razmnama, and patronage of scholars, painters and musicians such as Tansen');
const vMansab = mansabFigure('Structure chart of the mansabdari system: the emperor appoints mansabdars, whose mansab has two parts, zat for personal rank and pay and sawar for the number of horsemen, paid in cash or by a jagir; with rules of non-hereditary ranks, transfers and merit, and a note of merits and defects', 'The mansabdari system (simplified).');
const vZat = table(['Term', 'Meaning'], [
  ['Mansab', 'Rank'],
  ['Zat', 'Personal rank and pay'],
  ['Sawar', 'Number of horsemen to be maintained'],
  ['Ranks', 'From 10 up to 5,000 for nobles; higher for princes'],
  ['Introduced', 'By Akbar, about the 1570s (dates vary)'],
], 'Table of terms of the mansabdari system: mansab is rank, zat is personal rank and pay, sawar is the number of horsemen, ranks run from 10 to 5,000 for nobles, introduced by Akbar about the 1570s');
const vRead = table(['Step', 'Imagined mansabdar: zat 1,000, sawar 500'], [
  ['1. Read the zat', 'Personal rank 1,000, which sets his pay'],
  ['2. Read the sawar', 'He must maintain 500 horsemen'],
  ['3. Find the payment', 'In cash or by a jagir'],
  ['4. Add a rule', 'The rank is not hereditary; he may be transferred'],
], 'Table of four steps for reading an imagined mansab with zat 1,000 and sawar 500: read the zat, read the sawar, find the payment and add a rule');
const vRules = table(['Rule', 'Effect'], [
  ['Payment in cash or by jagir', 'Officers paid without owning the land'],
  ['Ranks not hereditary', 'Loyalty to the emperor'],
  ['Officers transferred', 'Less chance of local power'],
  ['Ranks on merit', 'Able men could rise'],
], 'Table of rules of the mansabdari system: payment by cash or jagir, ranks not hereditary, transfers and ranks on merit, with their effects');
const vMD = table(['Merits', 'Defects'], [
  ['Efficient army and administration', 'False musters'],
  ['Loyalty to the emperor', 'Pressure on peasants by jagirdars'],
  ['Ranks given on merit', 'Shortage of jagirs; weak control under later rulers'],
], 'Table of the merits of the mansabdari system, an efficient army and administration, loyalty and merit, against its defects of false musters, pressure on peasants and a shortage of jagirs with weak control later');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three merits'],
  ['(ii)', '3', 'Three defects'],
  ['(iii)', '4', 'A judgement and a reason'],
], 'Table planning a ten-mark assessment: part (i) three merits for 3 marks, part (ii) three defects for 3 marks, part (iii) a judgement with a reason for 4 marks');
const vSummary2 = table(['Topic', 'Key points'], [
  ['Rajput policy', 'Marriage alliances, high mansabs, kingdoms kept; Haldighati 1576'],
  ['Integration', 'Sulh-i-kul; pilgrim tax and jizya abolished; Ibadat Khana; Persian'],
  ['Reforms', 'Sati, widow remarriage, marriage ages; education, translation, patronage'],
  ['Mansabdari', 'Zat and sawar; cash or jagir; merits and defects'],
], 'Summary table of Part 2: the Rajput policy, integration, social and educational reforms and the mansabdari system');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Mughal Empire — Part 1: Sources, Rulers and Babur',
  goals: [
    'Name the author of the Ain-i-Akbari and explain its value and its limits as a source',
    'Describe the Taj Mahal, the Jama Masjid and the Red Fort, and what they reveal',
    'List the Mughal emperors in order from Babur to Aurangzeb',
    'Describe the three battles that established Mughal rule and their results',
  ],
  slides: [
    sl('title', 'The Mughal Empire: sources, rulers and Babur', {
      b: 'Part 1 — how we know about the Mughals, who ruled and in what order, and how Babur began the empire.',
      v: vRoute1,
      n: 'In this part we learn how historians know about the Mughal Empire. We study a famous book of Akbar\'s reign and three monuments of Shah Jahan. Then we put the rulers in order and study the three battles of Babur.',
    }),
    sl('diagram', 'The Ain i Akbari at a glance', {
      v: vAin,
      n: 'The Ain i Akbari was written by Abul Fazl, a courtier of Akbar. It is the third part of the Akbarnama, completed about fifteen ninety eight. It describes the administration, the revenue system, the mansabdari system, the army, the provinces, society, and statistics of produce and prices.',
    }),
    sl('concept', 'Value and care', {
      bl: [
        'Value: **detailed official information**.',
        'Care: written by a **courtier**, so it **praises Akbar**.',
        'Compare it with **other sources**.',
      ],
      v: vAinCare,
      n: 'The book is valuable because it gives detailed official information about the empire. The care needed is that its author was a courtier, so he praises his ruler. A good historian compares it with other sources and does not accept every claim as final.',
    }),
    sl('concept', 'The Taj Mahal, Agra', {
      bl: [
        'Built by **Shah Jahan** in memory of **Mumtaz Mahal**, about **1632 to 1653**.',
        '**White marble** with inlay of coloured stones, called **pietra dura**.',
        '**Charbagh** garden, **raised platform**, **symmetry**, **double dome**, **four minarets**.',
        '**UNESCO** World Heritage Site, **1983**.',
      ],
      v: vTajFacts,
      n: 'The Taj Mahal at Agra was built by Shah Jahan in memory of his wife Mumtaz Mahal, about sixteen thirty two to sixteen fifty three. It is of white marble with inlay of coloured stones. It has a four part garden, a raised platform, a double dome and four minarets. It became a World Heritage Site in nineteen eighty three.',
    }),
    sl('diagram', 'The Taj Mahal in a sketch', {
      b: 'Schematic sketch: not drawn to scale.',
      v: vTaj,
      n: 'This is a schematic sketch, not drawn to scale. It shows the double dome with its finial, the arched portal in the centre, and two of the four minarets. The building stands on a raised platform and is the same on both sides of its centre line. The small plan shows the garden divided into four parts.',
    }),
    sl('concept', 'The Jama Masjid and the Red Fort, Delhi', {
      bl: [
        '**Jama Masjid**: about **1650 to 1656**; red sandstone and white marble; large **courtyard**; **three domes**, **two minarets**.',
        '**Red Fort**: about **1639 to 1648**; red sandstone walls; **Diwan-i-Am** and **Diwan-i-Khas**.',
        'The Fort stands in his new city, **Shahjahanabad**; a **World Heritage Site** since **2007**.',
      ],
      v: vJamaRed,
      n: 'Shah Jahan also built the Jama Masjid in Delhi, about sixteen fifty to sixteen fifty six. It has a very large courtyard, three domes and two minarets. The Red Fort was built about sixteen thirty nine to sixteen forty eight in his new city, Shahjahanabad. It has red sandstone walls, and the halls of public and private audience. Today the Prime Minister addresses the nation from it on Independence Day.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_taj',
      n: 'Recall the year in which the Taj Mahal was listed as a World Heritage Site.',
    }),
    sl('diagram', 'The two halls of the Red Fort', {
      v: vHalls,
      n: 'The Diwan i Am was the hall of public audience, where ordinary petitioners came. The Diwan i Khas was the hall of private audience, for nobles and officers by invitation. Remember am for all and khas for special.',
    }),
    sl('diagram', 'What the monuments reveal', {
      b: 'Read a monument as a source, not only as a sight.',
      v: vReveal,
      n: 'Large buildings of marble and sandstone reveal the wealth of the empire. Their grand scale shows the power of the emperor. The domes, arches and inlay show a blend of Persian and Indian styles. The fine work shows skilled craftsmen. One building, however, cannot show the whole empire.',
    }),
    sl('example', 'Worked example 1: reading a museum label', {
      b: 'Imagined label: a model of a white tomb with four minarets and a garden in four parts.',
      bl: [
        'Step 1 — Describe what you see.',
        'Step 2 — Name the monument.',
        'Step 3 — Say what it reveals.',
        'Step 4 — Add one care.',
      ],
      v: vLabel,
      n: 'Use four steps on an imagined museum label. First describe what you see, a model of a white tomb with four minarets and a four part garden. Second, name it as the Taj Mahal. Third, say what it reveals, such as wealth, power, a blend of styles and skilled craftsmen. Fourth, add a care: one building cannot show the whole empire.',
    }),
    sl('check', 'Quick check: match the sources', {
      b: 'Match each source or monument with its detail.',
      chk: 'mt_monuments',
      n: 'Recall the details of each monument and of the book of Abul Fazl, and match them.',
    }),
    sl('diagram', 'The Mughal rulers on a time line', {
      v: vRulers,
      n: 'This time line is drawn to scale. The rulers in order are Babur, Humayun, Akbar, Jahangir, Shah Jahan and Aurangzeb. The rule of Humayun was interrupted by Sher Shah Suri, so it appears in two pieces. Notice the Akbar bar, which is among the longest.',
    }),
    sl('concept', 'Babur, Humayun and Akbar', {
      bl: [
        '**Babur**: about **1526 to 1530**.',
        '**Humayun**: about **1530 to 1540** and **1555 to 1556**; interrupted by **Sher Shah Suri**.',
        '**Akbar**: about **1556 to 1605**.',
      ],
      v: vEarly,
      n: 'Babur began Mughal rule and ruled about fifteen twenty six to fifteen thirty. Humayun ruled about fifteen thirty to fifteen forty and again fifteen fifty five to fifteen fifty six. Sher Shah Suri interrupted his rule. Akbar ruled from about fifteen fifty six to sixteen oh five.',
    }),
    sl('concept', 'Jahangir, Shah Jahan and Aurangzeb', {
      bl: [
        '**Jahangir**: about **1605 to 1627**.',
        '**Shah Jahan**: about **1628 to 1658**.',
        '**Aurangzeb**: about **1658 to 1707**.',
      ],
      v: vLater,
      n: 'Jahangir followed Akbar and ruled about sixteen oh five to sixteen twenty seven. Shah Jahan followed Jahangir, from about sixteen twenty eight to sixteen fifty eight. Aurangzeb followed Shah Jahan, from about sixteen fifty eight to seventeen oh seven. For this chapter, learn their place in the order.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange the emperors in the order in which they came to the throne.',
      chk: 'ord_rulers',
      n: 'Begin with the ruler who began Mughal rule in fifteen twenty six, and end with the one who followed Shah Jahan.',
    }),
    sl('concept', 'The First Battle of Panipat, 1526', {
      bl: [
        'Against **Ibrahim Lodi**, the last Sultan of Delhi.',
        'Babur\'s advantages: **artillery**, the **tulughma** flanking tactic, **defences of carts**.',
        'Result: the **end of the Delhi Sultanate** and the **start of Mughal rule**.',
      ],
      v: vPanipat,
      n: 'At the First Battle of Panipat in fifteen twenty six, Babur defeated Ibrahim Lodi. Babur used artillery, a flanking tactic called the tulughma, and defences made of carts. The result was the end of the Delhi Sultanate and the start of Mughal rule.',
    }),
    sl('diagram', 'The three battles on a map', {
      b: 'Schematic map: positions are approximate.',
      v: vMap,
      n: 'This is a schematic map, not drawn to scale. The three battles in order are Panipat in fifteen twenty six, Khanwa in fifteen twenty seven and Ghaghra in fifteen twenty nine. The dashed arrows show only the order of the battles, not the routes of the army.',
    }),
    sl('concept', 'Khanwa and Ghaghra', {
      bl: [
        '**Khanwa, 1527**: against **Rana Sanga of Mewar** and allies; Mughal power **secured in north India**.',
        '**Ghaghra, 1529**: against **Afghan chiefs of Bihar and Bengal**, including **Mahmud Lodi**; eastern resistance **checked**.',
      ],
      v: vKG,
      n: 'At Khanwa in fifteen twenty seven, Babur faced Rana Sanga of Mewar and his allies. The result was that Mughal power was secured in north India. At Ghaghra in fifteen twenty nine, he faced Afghan chiefs of Bihar and Bengal, including Mahmud Lodi, and the resistance in the east was checked.',
    }),
    sl('check', 'Quick check: match the battles', {
      b: 'Match each battle or tactic with its description.',
      chk: 'mt_battles',
      n: 'Recall each battle, its opponent and its result, and match them.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Three battles. [3] (ii) Advantages at Panipat. [3] (iii) Results. [4]',
      bl: [
        '(i) Panipat, Khanwa, Ghaghra with years and opponents.',
        '(ii) Artillery; tulughma; carts.',
        '(iii) One result for each battle.',
        'Aim for one point per mark.',
      ],
      v: vPlan1,
      n: 'To plan a ten mark answer in three parts, give three marks to the first part, three to the second and four to the last. Part one names the three battles with years and opponents. Part two gives the advantages at Panipat. Part three gives one result for each battle.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        '**Ain-i-Akbari**: Abul Fazl, about **1598**; valuable, but check for praise.',
        'Monuments of **Shah Jahan**: **Taj Mahal**, **Jama Masjid**, **Red Fort**.',
        'Order: **Babur, Humayun, Akbar, Jahangir, Shah Jahan, Aurangzeb**.',
        '**Panipat 1526**, **Khanwa 1527**, **Ghaghra 1529**.',
      ],
      v: vSummary1,
      n: 'To sum up. The Ain i Akbari by Abul Fazl is valuable but must be read with care. The monuments of Shah Jahan reveal wealth, power, a blend of styles and skilled craftsmen. The rulers in order are Babur, Humayun, Akbar, Jahangir, Shah Jahan and Aurangzeb. Babur won at Panipat, Khanwa and Ghaghra.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Name **Abul Fazl** and say **why care is needed**.',
        'Pair each monument with its **builder, city and one feature**.',
        'Use **about** with dates, but give **1526, 1527, 1529** for the battles.',
        'Give the **result** of each battle, not only its name.',
        'For rulers, learn the **order** and the **place** of each.',
      ],
      n: 'Some exam habits. Name Abul Fazl and say why care is needed in using his book. Pair each monument with its builder, its city and one feature. Give the result of each battle, not only its name. For the rulers, learn the order and the place of each one.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Mughal Empire — Part 2: Akbar and the Mansabdari System',
  goals: [
    'Explain the main features and aims of Akbar\'s Rajput policy',
    'Describe the steps by which Akbar brought the empire together, including Sulh-i-kul',
    'Describe his social and educational reforms, as commonly taught',
    'Explain the mansabdari system, including zat and sawar, with its merits and defects',
  ],
  slides: [
    sl('title', 'Akbar: policy, reforms and the mansabdari system', {
      b: 'Part 2 — how Akbar built a stable empire and how his officers were ranked.',
      v: vRoute2,
      n: 'In this part we study Akbar. First his policy towards the Rajput rulers and the steps he took to bring the empire together. Then his social and educational reforms. Last, the mansabdari system, by which his officers were ranked.',
    }),
    sl('concept', 'Akbar\'s Rajput policy', {
      bl: [
        '**Alliances through marriage**: the Kachhwaha ruler of **Amber**, **1562**.',
        '**High mansabs** for Rajput nobles, such as **Raja Man Singh**.',
        'Rulers who **accepted overlordship kept their kingdoms**.',
        'Rulers who **refused** faced **war**.',
      ],
      v: vRajputMethods,
      n: 'Akbar made alliances through marriage, for example with the Kachhwaha ruler of Amber in fifteen sixty two. He gave high mansabs to Rajput nobles, such as Raja Man Singh. Rulers who accepted Mughal overlordship kept their kingdoms. Those who refused faced war.',
    }),
    sl('diagram', 'The aim of the policy', {
      b: 'Aim, then means, then effect.',
      v: vRajputFlow,
      n: 'The aim was a stable empire with loyal allies. The means were alliances, high mansabs, and kingdoms kept by rulers who joined. The effect was that Rajput nobles served the empire.',
    }),
    sl('concept', 'Those who accepted and those who resisted', {
      bl: [
        '**Accepted** overlordship: **kingdom kept**.',
        '**Refused**: **war**.',
        'Mewar under **Maharana Pratap** resisted; the **Battle of Haldighati** was fought in **1576**.',
      ],
      v: vAccept,
      n: 'Rulers who accepted overlordship kept their kingdoms. Mewar, under Maharana Pratap, chose to resist, and the Battle of Haldighati was fought in fifteen seventy six. Maharana Pratap is remembered with respect for his resistance, and his name is honoured in his region.',
    }),
    sl('example', 'Worked example 3: sorting three cases', {
      b: 'Match each imagined case with a feature of the policy.',
      bl: [
        'Case 1 — Raja Veer accepts overlordship and keeps his kingdom.',
        'Case 2 — A noble of Amber is given a mansab of high rank.',
        'Case 3 — A kingdom refuses overlordship and a battle follows.',
      ],
      v: vClassify,
      n: 'Sort three imagined cases. Case one, a ruler accepts overlordship and keeps his kingdom. That is the feature of kingdoms kept. Case two, a noble is given a high mansab. That is the feature of high mansabs. Case three, a kingdom refuses and a battle follows. That is war with rulers who refuse.',
    }),
    sl('concept', 'Sulh i kul and two taxes', {
      bl: [
        '**Sulh-i-kul**: **peace with all**, tolerance.',
        '**Pilgrim tax** abolished about **1563**.',
        '**Jizya** abolished about **1564**.',
      ],
      v: vSulh,
      n: 'Sulh i kul means peace with all. It was a policy of tolerance. About fifteen sixty three the pilgrim tax was abolished, and about fifteen sixty four the jizya was abolished. The pilgrim tax was charged on pilgrims to holy places and the jizya on non-Muslim subjects, so their removal was a step towards treating all subjects alike.',
    }),
    sl('diagram', 'Steps of integration in order', {
      v: vSteps,
      n: 'Here are the steps in order. The pilgrim tax was abolished about fifteen sixty three. The jizya was abolished about fifteen sixty four. From about fifteen seventy five scholars met at the Ibadat Khana.',
    }),
    sl('concept', 'The Ibadat Khana, Persian and a uniform administration', {
      bl: [
        '**Ibadat Khana**, **Fatehpur Sikri**, from about **1575**: scholars of different faiths discussed ideas.',
        '**Persian** the language of **administration**.',
        'A **uniform administration**.',
        '**Din-i-Ilahi**: optional; a small following; it ended with him.',
      ],
      v: vIntegration,
      n: 'From about fifteen seventy five, scholars of different faiths discussed ideas at the Ibadat Khana in Fatehpur Sikri. Persian was made the language of administration, and a uniform administration was set up. The Din i Ilahi was optional. It had a small following, and it ended with him.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Fill in the blank.',
      chk: 'fb_sulhikul',
      n: 'Recall the policy of tolerance whose name means peace with all.',
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'Arrange the events of Akbar\'s reign in order.',
      chk: 'ord_akbar',
      n: 'Think of the year of the marriage alliance with Amber, then the two taxes, then the Ibadat Khana.',
    }),
    sl('concept', 'Social reforms, as commonly taught', {
      bl: [
        '**Forced sati** discouraged.',
        '**Widow remarriage** allowed.',
        '**Child marriage** discouraged by fixing **minimum ages** for marriage.',
      ],
      v: vSocial,
      n: 'As commonly taught, Akbar discouraged forced sati and allowed widow remarriage. He also tried to discourage child marriage by fixing minimum ages for marriage.',
    }),
    sl('concept', 'Education, translation and patronage', {
      bl: [
        '**Practical subjects** such as **mathematics, agriculture and history** in schools.',
        '**Translation department**: the **Mahabharata** became the **Razmnama** in Persian.',
        '**Patronage** of scholars, painters and musicians, such as **Tansen**.',
      ],
      v: vEdu,
      n: 'Akbar encouraged education with practical subjects such as mathematics, agriculture and history. A translation department had Sanskrit works, such as the Mahabharata, put into Persian. This translation is called the Razmnama. He also gave patronage to scholars, painters and musicians, for example the musician Tansen.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_social',
      n: 'Think about what Akbar is commonly taught to have done about the age of marriage.',
    }),
    sl('diagram', 'The mansabdari system', {
      b: 'A simplified chart: read it from top to bottom.',
      v: vMansab,
      n: 'The emperor appointed and ranked the officers, called mansabdars. A mansab has two parts. Zat is personal rank and pay. Sawar is the number of horsemen to be maintained. Officers were paid in cash or by a jagir. Ranks were not hereditary, officers were transferred, and ranks were given on merit.',
    }),
    sl('concept', 'Zat, sawar and ranks', {
      bl: [
        '**Mansab** means **rank**.',
        '**Zat**: personal rank and pay; **sawar**: horsemen to be maintained.',
        'Ranks from **10 up to 5,000** for nobles; higher for princes.',
        'Introduced by **Akbar**, about the **1570s** (dates vary).',
      ],
      v: vZat,
      n: 'Mansab means rank. Zat was the personal rank and pay of an officer. Sawar was the number of horsemen he had to maintain. Ranks ranged from ten up to five thousand for nobles, and were higher for princes. Akbar introduced the system about the fifteen seventies, though dates vary.',
    }),
    sl('example', 'Worked example 4: reading a mansab', {
      b: 'Imagined mansabdar: zat 1,000, sawar 500.',
      bl: [
        'Step 1 — Read the zat.',
        'Step 2 — Read the sawar.',
        'Step 3 — Find the payment.',
        'Step 4 — Add a rule.',
      ],
      v: vRead,
      n: 'Take an imagined mansabdar with a zat of one thousand and a sawar of five hundred. First read the zat. It is his personal rank, which sets his pay. Second read the sawar. He must maintain five hundred horsemen. Third, he is paid in cash or by a jagir. Fourth, his rank is not hereditary and he may be transferred.',
    }),
    sl('concept', 'Rules and their effect', {
      bl: [
        'Payment in **cash** or by **jagir**.',
        'Ranks **not hereditary**: loyalty to the emperor.',
        'Officers **transferred**: less local power.',
        'Ranks on **merit**.',
      ],
      v: vRules,
      n: 'A jagir was an assignment of land revenue given in place of a salary. Because ranks were not hereditary, officers looked to the emperor for their position. Transfers kept officers from building local power. Ranks were given on merit, so able men could rise.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term of the system with its meaning.',
      chk: 'mt_mansab',
      n: 'Recall each term and match it with its meaning.',
    }),
    sl('diagram', 'Merits and defects', {
      b: 'Learn them as two short lists.',
      v: vMD,
      n: 'The merits were an efficient army and administration, loyalty to the emperor, and ranks given on merit. The defects were false musters, pressure on the peasants by jagirdars, and later a shortage of jagirs together with weak control under later rulers.',
    }),
    sl('example', 'Worked example 5: planning a 10-mark assessment', {
      b: 'Question: (i) Three merits. [3] (ii) Three defects. [3] (iii) Assess. [4]',
      bl: [
        '(i) Efficient army; loyalty; merit.',
        '(ii) False musters; pressure on peasants; shortage of jagirs.',
        '(iii) A judgement with a reason.',
        'Give both sides before judging.',
      ],
      v: vPlan2,
      n: 'Plan this answer in three parts. Part one lists three merits. Part two lists three defects. Part three gives a judgement with a reason, for example that the system worked well while the emperor kept firm control. Give both sides before you judge.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**Rajput policy**: marriage alliances, high mansabs, kingdoms kept; **Haldighati 1576**.',
        '**Integration**: **Sulh-i-kul**, taxes abolished, **Ibadat Khana**, **Persian**.',
        '**Reforms**: sati, widow remarriage, marriage ages; **education**, **translation**, **patronage**.',
        '**Mansabdari**: **zat** and **sawar**; cash or jagir; merits and defects.',
      ],
      v: vSummary2,
      n: 'To sum up. Akbar built a stable empire through alliances, high mansabs and the tolerance of Sulh i kul. His reforms touched society, education and the arts. The mansabdari system ranked officers by zat and sawar, and had merits and defects.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Give the **aim** of the Rajput policy before the methods.',
        'Describe policies by their **aims and results**, in neutral words.',
        'Pair each tax with its approximate year: **1563** and **1564**.',
        'Explain **zat** and **sawar** in one line each.',
        'For an assessment, give **merits and defects** before the judgement.',
      ],
      n: 'Some exam habits. Give the aim of the Rajput policy before the methods. Describe policies by their aims and results, in neutral words. Pair each tax with its approximate year. Explain zat and sawar in one line each. For an assessment, give merits and defects before your judgement.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Mughal Empire — notes',
  sections: [
    {
      h: '1. The Ain-i-Akbari as a source',
      t: 1,
      b: '- The **Ain-i-Akbari** was written by **Abul Fazl**, a courtier of Akbar.\n- It forms the **third part of the Akbarnama**, which was completed about **1598**.\n- It describes the administration, the revenue system, the mansabdari system, the army, the provinces, society and statistics of produce and prices.\n- **Value:** it supplies detailed official information on many subjects.\n- **Care:** its author served Akbar, so the work praises him; a historian checks its claims against other sources.',
      terms: [['Courtier', 'A member of a ruler\'s court who serves him.'], ['Akbarnama', 'The history of Akbar\'s reign; the Ain-i-Akbari is its third part.'], ['Source', 'Anything from the past that helps us to know about it.']],
      v: vAin,
      vs: [vAinCare],
    },
    {
      h: '2. Monuments of Shah Jahan',
      t: 1,
      b: '- **Taj Mahal, Agra:** built by Shah Jahan in memory of his wife **Mumtaz Mahal**, about **1632 to 1653**. White marble; inlay of coloured stones (**pietra dura**); a **charbagh** (four-part garden); a **double dome**; **four minarets**; a raised platform; symmetry. **UNESCO World Heritage Site, 1983**.\n- **Jama Masjid, Delhi:** about **1650 to 1656**; red sandstone and white marble; a large courtyard; **three domes** and **two minarets**; one of the largest mosques in India.\n- **Red Fort (Lal Qila), Delhi:** about **1639 to 1648**, in his new city **Shahjahanabad**; red sandstone walls; the **Diwan-i-Am** (hall of public audience) and the **Diwan-i-Khas** (hall of private audience); **World Heritage Site, 2007**. The Prime Minister addresses the nation from it on Independence Day.\n- **What they reveal:** wealth, power, a blend of Persian and Indian styles, and skilled craftsmen.',
      terms: [['Pietra dura', 'Inlay of cut coloured stones set into marble.'], ['Charbagh', 'A garden divided into four parts.'], ['Diwan-i-Am', 'The hall of public audience.'], ['Diwan-i-Khas', 'The hall of private audience.']],
      v: vTajFacts,
      vs: [vTaj, vJamaRed, vHalls, vReveal],
    },
    {
      h: '3. The Mughal rulers in order',
      t: 2,
      b: '- **Babur:** about 1526 to 1530.\n- **Humayun:** about 1530 to 1540 and 1555 to 1556; his rule was interrupted by **Sher Shah Suri**.\n- **Akbar:** about 1556 to 1605.\n- **Jahangir:** about 1605 to 1627.\n- **Shah Jahan:** about 1628 to 1658.\n- **Aurangzeb:** about 1658 to 1707.\n- Reign lengths from these years: Babur about 4, Jahangir about 22, Shah Jahan about 30, Akbar about 49 years.',
      terms: [['Mughal', 'The dynasty founded by Babur in 1526.'], ['Reign', 'The years in which a ruler rules.']],
      v: vRulers,
      vs: [vEarly, vLater],
    },
    {
      h: '4. Babur: the three battles',
      t: 3,
      b: '- **First Battle of Panipat, 1526:** Babur against **Ibrahim Lodi**. Babur\'s advantages were **artillery (guns)**, the **tulughma** flanking tactic and **defences of carts**. Result: the **end of the Delhi Sultanate** and the start of Mughal rule.\n- **Battle of Khanwa, 1527:** against **Rana Sanga of Mewar** and allies. Result: **Mughal power secured in north India**.\n- **Battle of Ghaghra, 1529:** against **Afghan chiefs of Bihar and Bengal**, including **Mahmud Lodi**. Result: **eastern Afghan resistance checked**.',
      terms: [['Artillery', 'Guns and cannon.'], ['Tulughma', 'A flanking tactic in which wings swing round the enemy.'], ['Overlordship', 'Rule over a ruler who keeps his own kingdom.']],
      v: vPanipat,
      vs: [vMap, vKG],
    },
    {
      h: '5. Akbar: Rajput policy and integration',
      t: 4,
      b: '- **Rajput policy:** alliances through marriage (for example with the Kachhwaha ruler of **Amber**, **1562**); **high mansabs** to Rajput nobles (for example **Raja Man Singh**); rulers who accepted Mughal overlordship **kept their kingdoms**; those who refused faced war. **Mewar under Maharana Pratap** resisted, and the **Battle of Haldighati** was fought in **1576**. Aims: a stable empire with loyal allies.\n- **Integration:** **Sulh-i-kul** ("peace with all", tolerance); the **pilgrim tax** abolished about **1563** and the **jizya** about **1564**; the **Ibadat Khana** at Fatehpur Sikri (from about **1575**), where scholars of different faiths discussed ideas; **Persian** the language of administration; a **uniform administration**.\n- **Din-i-Ilahi** was optional; it had a small following and ended with him.',
      terms: [['Sulh-i-kul', 'Peace with all; a policy of tolerance.'], ['Jizya', 'A tax on non-Muslim subjects; abolished by Akbar about 1564.'], ['Ibadat Khana', 'The hall at Fatehpur Sikri where scholars of different faiths met.']],
      v: vRajputMethods,
      vs: [vRajputFlow, vAccept, vSulh, vSteps, vIntegration],
    },
    {
      h: '6. Akbar: social and educational reforms',
      t: 5,
      b: '- **Social reforms (as commonly taught):** forced **sati** discouraged; **widow remarriage** allowed; **child marriage** discouraged by fixing **minimum ages** for marriage.\n- **Education:** practical subjects such as **mathematics, agriculture and history** encouraged in schools.\n- **Translation department:** Sanskrit works such as the **Mahabharata** were put into Persian (the **Razmnama**), along with other works.\n- **Patronage:** scholars, painters and musicians, for example **Tansen**.',
      terms: [['Razmnama', 'The Persian translation of the Mahabharata.'], ['Patronage', 'Support given to artists and scholars.']],
      v: vSocial,
      vs: [vEdu],
    },
    {
      h: '7. The mansabdari system',
      t: 6,
      b: '- **Mansab** means **rank**. The system was introduced by **Akbar**, about the **1570s** (dates vary).\n- **Zat:** personal rank and pay. **Sawar:** the number of horsemen to be maintained.\n- **Ranks** ranged from **10 up to 5,000** for nobles; higher for princes.\n- **Payment** was in cash or by a **jagir** (an assignment of land revenue).\n- **Rules:** ranks were **not hereditary**; officers were **transferred**.\n- **Merits:** an efficient army and administration; loyalty to the emperor; ranks given on merit.\n- **Defects:** false musters; pressure on peasants by jagirdars; later a shortage of jagirs and weak control under later rulers.',
      terms: [['Mansabdar', 'An officer who held a mansab.'], ['Jagir', 'An assignment of land revenue given as pay.'], ['Muster', 'An inspection of soldiers and horses.']],
      v: vMansab,
      vs: [vZat, vRead, vRules, vMD],
    },
  ],
  tips: '**Common mistakes**\n- Giving a date without the word about, or mixing the order of the six rulers.\n- Writing that Humayun ruled in one block; his rule was interrupted by Sher Shah Suri.\n- Mixing up the battles and their opponents: Ibrahim Lodi (Panipat), Rana Sanga (Khanwa), Afghan chiefs of the east (Ghaghra).\n- Writing zat and sawar the wrong way round: zat is personal rank and pay, sawar is the number of horsemen.\n- Giving the Rajput policy without its aim, or describing it in loaded words; use neutral, factual words and describe aims and results.\n- Giving only merits or only defects of the mansabdari system.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a result, a link or an assessment.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote the Ain-i-Akbari?', '**Abul Fazl**, a courtier of Akbar.', 'fact', 1],
  ['Of which work is the Ain-i-Akbari a part?', 'The **third part of the Akbarnama**, completed about 1598.', 'fact', 1],
  ['What does the Ain-i-Akbari describe?', 'Administration, revenue, mansabdari, army, provinces, society, statistics of produce and prices.', 'concept', 1],
  ['Value and care of the Ain-i-Akbari', 'Value: detailed official information. Care: written by a courtier, so it praises Akbar.', 'concept', 1],
  ['The Taj Mahal: who and why?', 'Built by **Shah Jahan** in memory of **Mumtaz Mahal**, about 1632 to 1653.', 'fact', 1],
  ['Features of the Taj Mahal', 'White marble, pietra dura inlay, charbagh, double dome, four minarets, raised platform, symmetry.', 'fact', 1],
  ['Taj Mahal and UNESCO', 'World Heritage Site, **1983**.', 'fact', 1],
  ['The Jama Masjid, Delhi', 'About **1650 to 1656**; red sandstone and white marble; large courtyard; three domes, two minarets.', 'fact', 1],
  ['The Red Fort (Lal Qila)', 'About **1639 to 1648**, in Shahjahanabad; red sandstone walls; **Diwan-i-Am** and **Diwan-i-Khas**; World Heritage Site, 2007.', 'fact', 1],
  ['What do the monuments reveal?', 'Wealth, power, a blend of Persian and Indian styles, skilled craftsmen.', 'concept', 1],
  ['Name the six rulers in order', 'Babur, Humayun, Akbar, Jahangir, Shah Jahan, Aurangzeb.', 'concept', 2],
  ['Babur and Humayun: dates', 'Babur about **1526 to 1530**; Humayun about **1530 to 1540** and **1555 to 1556**.', 'fact', 2],
  ['Who interrupted Humayun\'s rule?', '**Sher Shah Suri**.', 'fact', 2],
  ['Akbar, Jahangir, Shah Jahan, Aurangzeb: dates', 'About 1556 to 1605; 1605 to 1627; 1628 to 1658; 1658 to 1707.', 'fact', 2],
  ['First Battle of Panipat', '**1526**, Babur against **Ibrahim Lodi**; the Delhi Sultanate ended and Mughal rule began.', 'fact', 3],
  ['Babur\'s advantages at Panipat', 'Artillery (guns), the tulughma flanking tactic, defences of carts.', 'concept', 3],
  ['Battle of Khanwa', '**1527**, against **Rana Sanga of Mewar** and allies; Mughal power secured in north India.', 'fact', 3],
  ['Battle of Ghaghra', '**1529**, against Afghan chiefs of Bihar and Bengal (including Mahmud Lodi); eastern resistance checked.', 'fact', 3],
  ['Akbar\'s Rajput policy', 'Marriage alliances, high mansabs, kingdoms kept by those who accepted overlordship; war with those who refused.', 'concept', 4],
  ['Examples from the Rajput policy', 'Kachhwaha ruler of Amber (1562); Raja Man Singh; Mewar under Maharana Pratap, Haldighati (1576).', 'fact', 4],
  ['Aims of the Rajput policy', 'A stable empire with loyal allies.', 'concept', 4],
  ['Sulh-i-kul', '"Peace with all": a policy of tolerance.', 'definition', 4],
  ['Taxes abolished by Akbar', 'Pilgrim tax about **1563**; jizya about **1564**.', 'fact', 4],
  ['The Ibadat Khana', 'At Fatehpur Sikri, from about **1575**: scholars of different faiths discussed ideas.', 'fact', 4],
  ['Language of administration', '**Persian**; with a uniform administration.', 'fact', 4],
  ['Din-i-Ilahi', 'Optional; a small following; it ended with him.', 'fact', 4],
  ['Akbar\'s social reforms (as commonly taught)', 'Forced sati discouraged; widow remarriage allowed; minimum ages for marriage.', 'concept', 5],
  ['The Razmnama', 'The Persian translation of the **Mahabharata**, made in the translation department.', 'fact', 5],
  ['Education and patronage under Akbar', 'Practical subjects in schools; patronage of scholars, painters and musicians such as Tansen.', 'concept', 5],
  ['What does mansab mean?', '**Rank**.', 'definition', 6],
  ['Zat and sawar', 'Zat: personal rank and pay. Sawar: number of horsemen to be maintained.', 'definition', 6],
  ['Ranks and payment in the mansabdari system', 'From 10 up to 5,000 for nobles; paid in cash or by a **jagir**.', 'fact', 6],
  ['Merits and defects of the mansabdari system', 'Merits: efficient army, loyalty, merit. Defects: false musters, pressure on peasants, shortage of jagirs, weak later control.', 'concept', 6],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Mughal Empire',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_reveal', 'm_humayun', 'm_amber', 'm_zat_sawar', 'ar_panipat', 's_sulh', 's3_babur'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_ain', 'l_reforms'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Mughal Empire',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_ain_caution', 'm_shortest', 'm_ghaghra', 'm_taxes', 'm_education', 'm_payment', 'm_babur_analysis', 'ar_mansab', 's_ain', 's_babur_pan', 's_translation', 's3_integration', 's3_merits'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_monuments', 'l_rajput', 'l_mansab'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of icse-9-history-civics-ch13 only (the Ain-i-Akbari and the monuments of Shah Jahan; the Mughal rulers in order; Babur and three battles; Akbar Rajput policy and integration; Akbar social and educational reforms; the mansabdari system)',
    originality: 'every guide, label, ledger, newspaper report and school scene is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); nothing from the Ain-i-Akbari or any chronicle is quoted',
    data: 'ruler years given as about; reign lengths computed in the code (Babur 4, Jahangir 22, Shah Jahan 30, Akbar 49 years; Akbar and Aurangzeb tie so no item compares them)',
    facts: 'Ain-i-Akbari by Abul Fazl, third part of the Akbarnama, about 1598; Taj Mahal about 1632-1653, UNESCO 1983; Jama Masjid about 1650-1656; Red Fort about 1639-1648, UNESCO 2007; Panipat 1526, Khanwa 1527, Ghaghra 1529; Amber 1562; pilgrim tax about 1563, jizya about 1564; Ibadat Khana about 1575; Haldighati 1576; mansabdari about the 1570s',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
