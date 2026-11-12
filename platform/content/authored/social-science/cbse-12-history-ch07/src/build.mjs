// Build CBSE 12 History ch07 An Imperial Capital: Vijayanagara (c. 14th-16th centuries).
// Run from platform/:  npx tsx content/authored/social-science/cbse-12-history-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch07', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (schematics only: no maps, places named in words)
const vEmpire = (() => {
  const s = new Svg(680, 250);
  const AX = 140;
  const X = (y) => 60 + ((y - 1300) / 300) * 560;
  s.arrow(30, AX, 668, AX, { sw: 1.8 });
  for (let yr = 1300; yr <= 1600; yr += 50) {
    s.line(X(yr), AX - 5, X(yr), AX + 5, { sw: 1.2, color: 'muted' });
    s.text(X(yr), AX + 20, String(yr), { size: 12, muted: true });
  }
  const above = (yr, lines) => {
    s.dot(X(yr), AX, 4, 'accent');
    s.line(X(yr), AX, X(yr), 84, { sw: 1.4, color: 'accent' });
    s.text(X(yr), 18, String(yr), { bold: true, size: 13 });
    lines.forEach((ln, i) => s.text(X(yr), 38 + i * 18, ln, { size: 12 }));
  };
  above(1336, ['Harihara and Bukka', 'found Vijayanagara']);
  above(1485, ['Saluva dynasty', 'begins']);
  above(1565, ['Rama Raya defeated at', 'Rakshasi-Tangadi']);
  const cx = (X(1509) + X(1529)) / 2;
  s.line(X(1509), AX, X(1529), AX, { sw: 7, color: 'accent' });
  s.line(cx, AX + 8, cx, 190, { sw: 1.4, color: 'accent' });
  s.text(cx, 204, '1509 to 1529: Krishnadeva Raya', { size: 12, bold: true });
  s.text(cx, 222, 'Tuluva dynasty', { size: 12 });
  s.text(150, 238, 'Years CE; only some events of the empire are shown', { size: 11, muted: true });
  return s.visual('Timeline from 1300 to 1600 CE: 1336, Harihara and Bukka found Vijayanagara; 1485, the Saluva dynasty begins; 1509 to 1529, Krishnadeva Raya of the Tuluva dynasty rules, shown as a thick bar; 1565, Rama Raya is defeated at Rakshasi-Tangadi', 'The empire from 1336 to 1565');
})();

const vRedisc = (() => {
  const s = new Svg(680, 240);
  const AX = 130;
  const X = (y) => 50 + ((y - 1780) / 220) * 580;
  s.arrow(25, AX, 668, AX, { sw: 1.8 });
  for (let yr = 1780; yr <= 2000; yr += 20) {
    s.line(X(yr), AX - 5, X(yr), AX + 5, { sw: 1.2, color: 'muted' });
    if ((yr - 1780) % 40 === 0) s.text(X(yr), AX + 20, String(yr), { size: 11, muted: true });
  }
  const up = (yr, label, lines) => {
    s.dot(X(yr), AX, 4, 'accent');
    s.line(X(yr), AX, X(yr), 70, { sw: 1.4, color: 'accent' });
    s.text(X(yr), 16, label, { bold: true, size: 13 });
    lines.forEach((ln, i) => s.text(X(yr), 36 + i * 17, ln, { size: 12 }));
  };
  const down = (yr, label, lines) => {
    s.dot(X(yr), AX, 4, 'accent');
    s.line(X(yr), AX, X(yr), 170, { sw: 1.4, color: 'accent' });
    s.text(X(yr), 184, label, { bold: true, size: 13 });
    lines.forEach((ln, i) => s.text(X(yr), 202 + i * 17, ln, { size: 12 }));
  };
  up(1800, '1800', ['Mackenzie brings', 'the ruins to light']);
  down(1815, '1815', ['Mackenzie becomes first', 'Surveyor General of India']);
  up(1856, '1856', ['Photographers begin', 'to record the monuments']);
  up(1970, '1970s onward', ['Detailed surveys', 'and excavations']);
  down(1986, '1986', ['Declared a World', 'Heritage site']);
  return s.visual('Timeline from 1780 to 2000 CE: 1800, Colin Mackenzie brings the ruins of Hampi to light; 1815, he becomes the first Surveyor General of India; 1856, photographers begin to record the monuments; from the 1970s, detailed surveys and excavations; 1986, Hampi is declared a World Heritage site', 'Recovering the site, 1800 to 1986');
})();

const vZones = (() => {
  const s = new Svg(700, 380);
  s.text(350, 16, 'Zones of the Vijayanagara settlement (schematic, not a map)', { bold: true, size: 14 });
  s.rect(10, 34, 680, 336, { sw: 1.6, dash: true, color: 'muted' });
  const box = (x, y, title, lines, accent) => {
    s.rect(x, y, 320, 140, { sw: accent ? 2.4 : 1.8, color: accent ? 'accent' : undefined, fill: accent ? 'fill' : undefined });
    s.text(x + 160, y + 24, title, { bold: true, size: 14 });
    lines.forEach((ln, i) => s.text(x + 160, y + 52 + i * 21, ln, { size: 12 }));
  };
  box(25, 50, 'Royal centre', ['Mahanavami dibba, Lotus Mahal', 'Hazara Rama temple, elephant stables', 'Over 60 temples, about 30 palace-type', 'building complexes'], true);
  box(355, 50, 'Sacred centre', ['Virupaksha and Vitthala temples', 'Gopurams, mandapas, colonnades', 'Chariot streets; hills linked with', 'stories from the Ramayana'], true);
  box(25, 205, 'Urban core', ['Roads along the valleys', 'Few remains of ordinary houses', 'Tombs, mosques and small shrines', 'Wells and tanks']);
  box(355, 205, 'Irrigated fields', ['Kamalapuram tank and its canal', 'Hiriya canal from a river dam', 'Fields inside the fortified area', 'Streams and embankments']);
  s.text(350, 358, 'The dashed line stands for the fortifications; positions in the diagram are not real directions', { size: 11, muted: true });
  return s.visual('Schematic of four zones inside a dashed line that stands for the fortifications: the royal centre with the Mahanavami dibba, the Lotus Mahal, the Hazara Rama temple, elephant stables, over sixty temples and about thirty palace-type complexes; the sacred centre with the Virupaksha and Vitthala temples, gopurams, mandapas, colonnades and chariot streets; the urban core with roads along valleys, few remains of ordinary houses, tombs, mosques, small shrines, wells and tanks; and irrigated fields with the Kamalapuram tank, the Hiriya canal and fields inside the fortified area. Positions are not real directions', 'Four zones of the settlement');
})();

const vWater = (() => {
  const s = new Svg(700, 270);
  s.text(175, 14, 'Stored water: tank and canal', { bold: true, size: 13 });
  s.text(525, 14, 'River water: dam and canal', { bold: true, size: 13 });
  const col = (x, items) => items.forEach((t, i) => {
    const y = 30 + i * 58;
    s.rect(x, y, 310, 40, { sw: i === items.length - 1 ? 2.4 : 1.6, color: i === items.length - 1 ? 'accent' : undefined, fill: i === items.length - 1 ? 'fill' : undefined });
    s.text(x + 155, y + 20, t, { size: 12 });
    if (i < items.length - 1) s.arrow(x + 155, y + 40, x + 155, y + 56, { sw: 1.6 });
  });
  col(20, ['Streams flow down from the granite hills', 'Embankments hold the water in reservoirs', 'Kamalapuram tank (early 15th century)', 'Canal links the tank to the royal centre']);
  col(370, ['Dam built across the Tungabhadra', 'The Hiriya canal carries the water', 'The valley fields are irrigated']);
  return s.visual('Two chains of boxes joined by arrows: stored water, in which streams flow down from granite hills, embankments hold the water in reservoirs, the Kamalapuram tank of the early fifteenth century is formed, and a canal links the tank to the royal centre; and river water, in which a dam is built across the Tungabhadra, the Hiriya canal carries the water, and the valley fields are irrigated', 'Two water systems');
})();

const vWalls = (() => {
  const s = new Svg(700, 325);
  for (let i = 0; i < 7; i++) s.rect(10 + i * 16, 10 + i * 16, 420 - 32 * i, 290 - 32 * i, { sw: i === 0 ? 2.4 : 1.6, rx: 4, color: i === 0 ? 'accent' : undefined });
  s.text(220, 155, 'Innermost line', { size: 12, bold: true });
  const call = (dx, y, l1, l2) => {
    s.dot(dx, y, 3, 'accent');
    s.line(dx, y, 445, y, { sw: 1.2, color: 'muted' });
    s.text(450, y - 9, l1, { anchor: 'start', size: 12 });
    s.text(450, y + 9, l2, { anchor: 'start', size: 12 });
  };
  call(422, 60, 'Seven lines of fortification', 'enclosed city, fields and forests');
  call(374, 130, 'No mortar: wedge-shaped stone', 'blocks held by interlocking');
  call(358, 200, 'Gateways often used', 'arches and domes');
  s.text(350, 314, 'Schematic only: seven nested lines, not a plan of the real walls', { size: 12, muted: true });
  return s.visual('Schematic of seven nested rectangles standing for seven lines of fortification, with three callouts: the seven lines enclosed city, fields and forests; walls used no mortar and wedge-shaped stone blocks were held by interlocking; gateways often used arches and domes. It is not a plan of the real walls', 'Seven lines of fortification');
})();

const vDibba = (() => {
  const s = new Svg(640, 295);
  s.text(250, 16, 'Mahanavami dibba (schematic side view; tiers and proportions not to scale)', { bold: true, size: 13 });
  s.line(40, 250, 440, 250, { sw: 2 });
  s.rect(60, 200, 340, 50, { sw: 1.8, rx: 3 });
  s.rect(90, 150, 280, 50, { sw: 1.8, rx: 3 });
  s.rect(120, 100, 220, 50, { sw: 1.8, rx: 3 });
  s.text(230, 125, 'carved sides', { italic: true, size: 12 });
  s.text(230, 175, 'carved sides', { italic: true, size: 12 });
  s.text(230, 225, 'carved sides', { italic: true, size: 12 });
  s.arrow(425, 250, 425, 100, { sw: 1.6, color: 'accent' });
  s.arrow(425, 100, 425, 250, { sw: 1.6, color: 'accent' });
  s.text(440, 175, 'Height: about 40 feet', { anchor: 'start', size: 12, bold: true });
  s.line(60, 272, 400, 272, { sw: 1.6, color: 'accent' });
  s.text(230, 288, 'Base: about 11,000 square feet', { size: 12, bold: true });
  return s.visual('Schematic side view of a platform drawn as three stacked tiers with carved sides, with a dimension arrow showing a height of about 40 feet and a bar under the base marking a base area of about 11,000 square feet; tiers and proportions are not to scale', 'The Mahanavami dibba');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoute1 = flow('LR', ['Discovery of Hampi', 'Rise of the empire', 'Rayas and nayakas', 'Sultanates and trade'], 'Route map of Part 1: the discovery of Hampi, the rise of the empire, rayas and nayakas, and relations with the Sultanates and trade', 'Part 1 at a glance');
const vHampi = table(
  ['Item', 'Detail'],
  [
    ['Name', 'From Pampadevi, the local mother goddess'],
    ['Brought to light', '1800, by Colonel Colin Mackenzie of the East India Company'],
    ['Early information', 'Memories of priests of the Virupaksha temple and the Pampadevi shrine'],
    ['Later recognition', 'Declared a World Heritage site in 1986'],
  ],
  'Table about Hampi: its name comes from Pampadevi, the local mother goddess; it was brought to light in 1800 by Colonel Colin Mackenzie of the East India Company; his early information came from the memories of priests of the Virupaksha temple and the Pampadevi shrine; it became a World Heritage site in 1986',
  'Hampi at a glance',
);
const vMethods = table(
  ['Kind of evidence', 'What it gave'],
  [
    ['Mackenzie\'s early work', 'First recorded information, helped by the priests\' memories'],
    ['Photographs from 1856', 'The look of monuments as they then stood'],
    ['Inscriptions collected by epigraphists', 'Names, gifts and orders'],
    ['Travellers\' accounts', 'Descriptions of the city in its days'],
    ['Surveys and excavations from the 1970s', 'Detailed mapping of the site'],
  ],
  'Table of evidence used to build up the picture of Hampi: Mackenzie\'s early work gave first recorded information with the help of the priests\' memories; photographs from 1856 show the look of monuments; inscriptions give names, gifts and orders; travellers\' accounts describe the city in its days; surveys and excavations from the 1970s mapped the site in detail',
  'Evidence for Hampi',
);
const vTrade = table(
  ['Factor', 'Why it mattered'],
  [
    ['Fertile river valleys', 'Farming and revenue'],
    ['Horses from Arabia and Central Asia', 'Vital for warfare; kudirai chettis traded in them'],
    ['The west coast', 'The Portuguese arrived in 1498 and set up trading stations'],
    ['Spices, textiles, precious stones', 'Lucrative trade'],
    ['Rivals', 'The Deccan Sultans and the Gajapati rulers of Orissa'],
  ],
  'Table of factors in the rise of the empire: fertile river valleys gave farming and revenue; horses from Arabia and Central Asia were vital for warfare and kudirai chettis traded in them; the Portuguese reached the west coast in 1498; spices, textiles and precious stones made trade lucrative; and the rivals were the Deccan Sultans and the Gajapati rulers of Orissa',
  'Land, trade and rivals',
);
const vKdr = table(
  ['Year', 'What happened'],
  [
    ['1509 to 1529', 'Reign of Krishnadeva Raya (Tuluva dynasty)'],
    ['1512', 'Acquires the Raichur doab'],
    ['1514', 'Subdues the rulers of Orissa'],
    ['1520', 'Defeats the Sultan of Bijapur'],
    ['Also', 'Built fine temples and gopurams; credited with the Telugu work Amuktamalyada'],
  ],
  'Table on Krishnadeva Raya: reign 1509 to 1529; the Raichur doab acquired in 1512; the rulers of Orissa subdued in 1514; the Sultan of Bijapur defeated in 1520; and fine temples and gopurams built, with the Telugu work Amuktamalyada credited to him',
  'Krishnadeva Raya at a glance',
);
const vDateEx = table(
  ['Clue in an imagined undated order', 'What it tells'],
  [
    ['Names a Saluva raya as ruling', 'After 1485, when the Saluva dynasty began'],
    ['Mentions Portuguese traders at their west-coast stations', 'After 1498'],
    ['Mentions no Tuluva ruler', 'Before the Tuluva rulers took over, in the early 1500s'],
    ['Verdict', 'Between 1498 and the early 1500s'],
  ],
  'Table dating an imagined order from clues: a Saluva raya as ruling means after 1485; Portuguese traders at their stations means after 1498; no mention of a Tuluva ruler means before the Tuluva took over in the early 1500s; so it falls between 1498 and the early 1500s',
  'Dating from clues',
);
const vBattle = flow('LR', ['Rama Raya leads the army, 1565', 'Armies of Bijapur, Ahmadnagar and Golconda combine', 'Defeat at Rakshasi-Tangadi (Talikota)', 'City sacked and soon abandoned', 'Centre shifts east under the Aravidu dynasty'], 'Flow of the events of 1565: Rama Raya leads the army, the combined armies of Bijapur, Ahmadnagar and Golconda face it, Vijayanagara is defeated at Rakshasi-Tangadi also called Talikota, the city is sacked and soon abandoned, and the centre of the empire shifts east under the Aravidu dynasty', 'The battle of 1565 and after');
const vNay = flow('LR', ['Raya grants a territory (amaram)', 'Amara-nayaka governs and collects dues', 'Keeps a part for horses and elephants', 'Sends troops to the king', 'Pays yearly tribute; brings gifts to court'], 'Flow of the amara-nayaka system: the raya grants a territory called an amaram; the amara-nayaka governs it and collects dues; keeps a part for horses and elephants; sends troops to the king; and pays yearly tribute and brings gifts to court', 'How the system worked');
const vNayDetail = table(
  ['Point', 'Detail'],
  [
    ['Nayakas', 'Military chiefs who controlled forts and armed supporters'],
    ['Amara-nayakas', 'Commanders given territories (amaram) by the raya'],
    ['Dues from', 'Peasants, crafts persons and traders'],
    ['Transfers', 'Kings sometimes moved commanders from one territory to another'],
    ['Later', 'Many nayakas set up independent kingdoms in the seventeenth century'],
    ['Historians note', 'Elements of the iqta system of the Delhi Sultanate'],
  ],
  'Table on the nayakas: nayakas were military chiefs who controlled forts and armed supporters; amara-nayakas were commanders given territories by the raya; they collected dues from peasants, crafts persons and traders; kings sometimes transferred them; many set up independent kingdoms in the seventeenth century; and historians see elements of the iqta system of the Delhi Sultanate',
  'Nayakas and amara-nayakas',
);
const vSult = table(
  ['Kind of contact', 'Example'],
  [
    ['War', 'Struggles over the fertile Raichur doab and over trade'],
    ['Shifting alliances', 'The sultans fought one another; Rama Raya played one against another'],
    ['Borrowing', 'Titles such as Hindu Suratrana; arches and domes'],
    ['Trade', 'Merchants and goods crossed political lines'],
  ],
  'Table of contacts between Vijayanagara and the Sultanates: war over the fertile Raichur doab and trade; shifting alliances, since the sultans fought one another and Rama Raya played one against another; borrowing of titles such as Hindu Suratrana and of arches and domes; and trade that crossed political lines',
  'War, alliance, borrowing and trade',
);
const vHorseEx = table(
  ['Mark', 'Point to write'],
  [
    ['1', 'Horses came from Arabia and Central Asia and were vital for warfare'],
    ['2', 'Kudirai chettis traded in horses; the Portuguese set up stations on the west coast from 1498'],
    ['3', 'So trade routes and the coast mattered for the strength of the army'],
  ],
  'Table planning a 3-mark answer on why trade in horses mattered: horses came from Arabia and Central Asia and were vital for warfare; kudirai chettis traded in them and the Portuguese set up stations on the west coast from 1498; so trade routes and the coast mattered for the strength of the army',
  'One point for each mark',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Hampi', 'Name from Pampadevi; Mackenzie 1800; photographs from 1856; World Heritage 1986'],
    ['The empire', 'Founded 1336 by Harihara and Bukka; Sangama, Saluva (1485), Tuluva'],
    ['Krishnadeva Raya', '1509 to 1529; Raichur doab 1512, Orissa 1514, Bijapur 1520'],
    ['1565', 'Rama Raya; Rakshasi-Tangadi; city sacked; centre shifts east'],
    ['Nayakas', 'Amara-nayakas held amaram, sent troops, paid tribute, could be transferred'],
    ['Sultanates', 'War, shifting alliances, borrowing and trade'],
  ],
  'Summary table of Part 1: Hampi and its recovery, the founding and dynasties of the empire, Krishnadeva Raya, the battle of 1565, the amara-nayaka system, and relations with the Sultanates',
);
const vTips1 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Describing the wars with the Sultanates as only a clash of religions', 'Wars between states that also traded and made alliances'],
    ['Saying Krishnadeva Raya founded the empire', 'Founded in 1336; he ruled 1509 to 1529'],
    ['Saying nayakas were always independent', 'Amara-nayakas served the raya; independence came later'],
    ['Writing that the city was destroyed in an instant', 'It was sacked and soon abandoned after 1565'],
  ],
  'Table of exam mistakes and corrections: do not call the wars with the Sultanates only a clash of religions; Krishnadeva Raya did not found the empire; nayakas were not always independent; and the city was sacked and soon abandoned after 1565',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vRoute2 = flow('LR', ['Water and walls', 'The urban core', 'The royal centre', 'The sacred centre', 'Buildings and plans as sources'], 'Route map of Part 2: water and walls, the urban core, the royal centre, the sacred centre, and buildings and plans as sources', 'Part 2 at a glance');
const vUrban = table(
  ['Feature', 'Note'],
  [
    ['Roads', 'Followed the valleys'],
    ['Ordinary houses', 'Few archaeological remains, though travellers such as Barbosa described them'],
    ['Tombs and mosques', 'In one part; mandapa-like features resemble temple architecture'],
    ['Shrines and small temples', 'Widespread'],
    ['Water', 'Wells and tanks served the residents'],
  ],
  'Table on the urban core: roads followed the valleys; few archaeological remains of ordinary houses though travellers such as Barbosa described them; tombs and mosques in one part with mandapa-like features resembling temple architecture; widespread shrines and small temples; and wells and tanks for the residents',
  'The urban core',
);
const vZoneEx = table(
  ['Block on an imagined plan', 'Clues', 'Zone'],
  [
    ['1', 'Gateways taller than the shrine towers; long colonnades', 'Sacred centre'],
    ['2', 'A tank with a canal; strips of field inside a wall', 'Irrigated fields'],
    ['3', 'A high carved platform; stables for elephants', 'Royal centre'],
    ['4', 'Roads in a valley; wells; small shrines', 'Urban core'],
  ],
  'Table reading an imagined plan: block 1 with gateways taller than shrine towers and long colonnades is the sacred centre; block 2 with a tank, a canal and strips of field inside a wall is the irrigated fields; block 3 with a high carved platform and stables for elephants is the royal centre; and block 4 with roads in a valley, wells and small shrines is the urban core',
  'Clues point to zones',
);
const vRoyal = table(
  ['Feature', 'Note'],
  [
    ['Position', 'South-western part of the settlement'],
    ['Buildings', 'Over 60 temples; about 30 building complexes described as palaces'],
    ['Largest enclosure', 'Called the king\'s palace; its function is uncertain'],
    ['Hazara Rama temple', 'Probably used only by the king and his family; panels from the Ramayana'],
    ['Nearby', 'Elephant stables'],
  ],
  'Table on the royal centre: in the south-western part of the settlement; over 60 temples and about 30 complexes described as palaces; the largest enclosure called the king\'s palace with uncertain function; the Hazara Rama temple probably used only by the king and his family with panels from the Ramayana; and elephant stables nearby',
  'The royal centre',
);
const vFest = table(
  ['Evidence', 'What it adds'],
  [
    ['The platform', 'A massive structure with carved sides'],
    ['Travellers\' descriptions', 'Worship of the image and of the state horse, sacrifices, displays, a review of the army, gifts by nayakas'],
    ['Together', 'Historians link the platform with rituals of the Mahanavami festival, held in the autumn months'],
  ],
  'Table on the Mahanavami festival: the platform is a massive structure with carved sides; travellers describe worship of the image and the state horse, sacrifices, displays, a review of the army and gifts by nayakas; together, historians link the platform with the rituals of the Mahanavami festival held in the autumn months',
  'Building and description together',
);
const vOpen = table(
  ['Building', 'What is known', 'Status'],
  [
    ['Lotus Mahal', 'A name given by British travellers in the nineteenth century', 'Use uncertain; possibly a council chamber'],
    ['King\'s palace', 'The largest enclosure of the royal centre', 'Function uncertain'],
  ],
  'Table of two open questions: the Lotus Mahal, whose name was given by British travellers in the nineteenth century and whose use is uncertain, possibly a council chamber; and the king\'s palace, the largest enclosure of the royal centre, whose function is uncertain',
  'Two open questions',
);
const vSacred = table(
  ['Feature', 'Note'],
  [
    ['Setting', 'Northern part, near the Tungabhadra, among rocky hills'],
    ['Stories', 'Hills linked with the Ramayana (Kishkindha) and with Pampadevi marrying Virupaksha'],
    ['Claim', 'Rulers said they ruled on behalf of Virupaksha and signed orders Shri Virupaksha in Kannada'],
    ['Building', 'Gopurams, mandapas, long colonnaded corridors'],
    ['Krishnadeva Raya', 'Hall before the Virupaksha main shrine at his accession; eastern gopuram credited to him'],
  ],
  'Table on the sacred centre: in the northern part near the Tungabhadra among rocky hills; hills linked with the Ramayana and with Pampadevi marrying Virupaksha; rulers claimed to rule on behalf of Virupaksha and signed orders Shri Virupaksha in Kannada; gopurams, mandapas and colonnaded corridors; and a hall before the main shrine of the Virupaksha temple built by Krishnadeva Raya at his accession, with the eastern gopuram credited to him',
  'The sacred centre',
);
const vTemples = table(
  ['Temple', 'Deity', 'Notable feature'],
  [
    ['Virupaksha', 'A form of Shiva, linked with the local goddess Pampadevi', 'Gopurams; hall before the main shrine'],
    ['Vitthala', 'A form of Vishnu, worshipped in Maharashtra', 'Shrine designed as a chariot; chariot streets'],
  ],
  'Table of two temples: the Virupaksha temple for a form of Shiva linked with Pampadevi, with gopurams and a hall before the main shrine; and the Vitthala temple for a form of Vishnu worshipped in Maharashtra, with a shrine designed as a chariot and chariot streets',
  'Two great temples',
);
const vHazaraEx = table(
  ['What the building shows', 'What stays an inference'],
  [
    ['Panels from the Ramayana on its walls', 'That only the king and his family used it'],
    ['Its place in the royal centre', 'The exact rites held there'],
  ],
  'Table separating what the Hazara Rama temple shows, which is panels from the Ramayana and its place in the royal centre, from what stays an inference, which is that only the king and his family used it and the exact rites held there',
  'Seen and inferred',
);
const vRead = flow('LR', ['Plan or building: layout and design', 'Inscriptions: donors, gifts and orders', 'Travellers: what they saw and were told', 'Photographs and surveys: the state of the site over time', 'Combine and cross-check'], 'Flow of kinds of evidence for Vijayanagara: a plan or building gives layout and design; inscriptions give donors, gifts and orders; travellers give what they saw and were told; photographs and surveys show the state of the site over time; then all are combined and cross-checked', 'Kinds of evidence');
const vLabelEx = table(
  ['Question for a board that says Queens\' bath', 'Why it matters'],
  [
    ['Who gave the name, and when?', 'A name given long afterwards is not a record of use'],
    ['What does the structure itself show?', 'Steps, tanks and drains point to water use'],
    ['Is there an independent record?', 'An inscription or a description would help'],
    ['Verdict', 'Keep the label as a suggestion until evidence supports it'],
  ],
  'Table of four questions for testing an imagined board that says Queens\' bath: who gave the name and when; what the structure itself shows; whether there is an independent record; and the verdict, to keep the label as a suggestion until evidence supports it',
  'Testing a label',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Water', 'Tungabhadra basin, hill streams, embankments; Kamalapuram tank; Hiriya canal'],
    ['Walls', 'Seven lines enclosing fields and forests; no mortar; arched gateways'],
    ['Urban core', 'Roads in valleys; few remains of houses; tombs, mosques, shrines'],
    ['Royal centre', 'South-west; over 60 temples; Mahanavami dibba; Lotus Mahal; Hazara Rama'],
    ['Sacred centre', 'North; Virupaksha and Vitthala; gopurams; chariot streets'],
    ['Sources', 'Combine plans, buildings, inscriptions, travellers and photographs'],
  ],
  'Summary table of Part 2: water and the Tungabhadra basin; seven lines of walls; the urban core; the royal centre; the sacred centre; and combining plans, buildings, inscriptions, travellers and photographs as sources',
);
const vTips2 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Stating the use of the Lotus Mahal as fact', 'Its use is uncertain; the name is later'],
    ['Calling the largest enclosure the king\'s palace without comment', 'Say its function is uncertain'],
    ['Mixing the two temples\' deities', 'Virupaksha: a form of Shiva; Vitthala: a form of Vishnu'],
    ['Reading a plan as a record of everyday life', 'Buildings show rulers\' ideas and planning more than ordinary lives'],
  ],
  'Table of exam mistakes and corrections: the use of the Lotus Mahal is uncertain; the function of the king\'s palace is uncertain; Virupaksha is a form of Shiva and Vitthala a form of Vishnu; and buildings show rulers\' ideas and planning more than ordinary lives',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'An Imperial Capital: Vijayanagara — Part 1: Hampi, the Empire and the Nayakas',
  goals: [
    'Explain how Hampi was brought to light and how historians learned more about it',
    'Describe the rise of the empire, its dynasties, Krishnadeva Raya and the events of 1565',
    'Explain the amara-nayaka system and relations with the Deccan Sultanates',
    'Date a source from clues and plan a short answer on trade',
  ],
  slides: [
    sl('title', 'An Imperial Capital: Vijayanagara', {
      b: 'Part 1: the **discovery of Hampi**, the **rise of the empire**, the **nayakas** and the **Deccan Sultanates**.',
      v: vRoute1,
      n: 'Between the fourteenth and the sixteenth centuries, Vijayanagara was one of the great cities of the south. Today it lies in ruins at Hampi. In this part we see how the ruins were brought to light, how the empire rose and fell, how its commanders were organised, and how it dealt with its neighbours.',
    }),
    sl('concept', 'Hampi: the name and the place', {
      b: 'The name comes from **Pampadevi**; the ruins were brought to light in **1800** by **Colin Mackenzie**.',
      v: vHampi,
      n: 'Hampi takes its name from Pampadevi, the local mother goddess. In 1800 Colonel Colin Mackenzie, an engineer and antiquarian of the East India Company, brought the ruins to light. His early information came from the memories of priests of the Virupaksha temple and the Pampadevi shrine. In 1986 Hampi was declared a World Heritage site.',
    }),
    sl('diagram', 'Recovering the site', {
      v: vRedisc,
      n: 'This timeline shows how the site was recovered. Mackenzie came in 1800, and in 1815 he became the first Surveyor General of India. From 1856 photographers such as Alexander Greenlaw recorded the monuments. From the 1970s detailed surveys and excavations mapped the site, with scholars such as John Fritz, George Michell and M S Nagaraja Rao.',
    }),
    sl('concept', 'How the picture was built up', {
      b: 'Historians combine **photographs**, **inscriptions**, **travellers\' accounts** and **surveys**.',
      v: vMethods,
      n: 'Historians built up the picture from several kinds of evidence. Mackenzie gave the first records. Photographs from 1856 show the monuments as they stood. Epigraphists collected inscriptions that record gifts and orders. Historians used these together with the accounts of travellers. Later surveys and excavations mapped the site in detail.',
    }),
    sl('check', 'Quick check: the name', {
      b: 'Hampi takes its name from the local mother goddess ___.',
      chk: 'fb_pampa',
      n: 'Recall where the name of the place comes from.',
    }),
    sl('diagram', 'The empire on a timeline', {
      v: vEmpire,
      n: 'Here is the empire on a timeline. Harihara and Bukka founded it in 1336. The Saluva dynasty began in 1485, after the Sangama rulers. Krishnadeva Raya of the Tuluva dynasty ruled from 1509 to 1529. In 1565 the army led by Rama Raya was defeated at Rakshasi Tangadi. The great days of the empire thus cover little more than two centuries.',
    }),
    sl('concept', 'Land, trade and rivals', {
      b: '**Fertile valleys**, **horse trade** and **spices** made the empire rich; its rivals were the **Deccan Sultans** and the **Gajapati** rulers.',
      v: vTrade,
      n: 'Vijayanagara means city of victory. The empire stretched from the Krishna and Tungabhadra doab to the far south. Fertile river valleys and rich trade gave it wealth. Horses from Arabia and Central Asia were vital for warfare, and local merchants called kudirai chettis traded in them. The Portuguese reached the west coast in 1498. Its rivals were the Deccan Sultans and the Gajapati rulers of Orissa.',
    }),
    sl('concept', 'Krishnadeva Raya', {
      b: 'Ruled **1509 to 1529**; acquired the **Raichur doab**, subdued **Orissa**, defeated **Bijapur**.',
      v: vKdr,
      n: 'Krishnadeva Raya of the Tuluva dynasty ruled from 1509 to 1529. He acquired the Raichur doab in 1512, subdued the rulers of Orissa in 1514 and defeated the Sultan of Bijapur in 1520. He built fine temples and gopurams, and a Telugu work on statecraft, the Amuktamalyada, is credited to him. After his death the empire came under strain.',
    }),
    sl('example', 'Worked example 1: dating an undated order', {
      b: 'Imagined order: *it names a Saluva raya as ruling, mentions Portuguese traders at their west-coast stations, and mentions no Tuluva ruler.* When was it issued?',
      bl: [
        'Step 1 — Use each **clue** to set a limit.',
        'Step 2 — Take the **latest earliest date**.',
        'Step 3 — Take the **earliest latest date**.',
        'Step 4 — State the **range** and any doubt.',
      ],
      v: vDateEx,
      n: 'To date an undated order, use each clue to set a limit. A Saluva raya as ruling means after 1485. Portuguese traders at their stations means after 1498. No Tuluva ruler means before the Tuluva took over, early in the sixteenth century. So the order falls between 1498 and the early 1500s. Always state the range, and say what remains doubtful.',
    }),
    sl('concept', 'The battle of 1565', {
      b: 'Rama Raya led the army; the armies of **Bijapur, Ahmadnagar and Golconda** combined; Vijayanagara was **defeated**.',
      v: vBattle,
      n: 'In 1565 Rama Raya, the chief minister of the empire, led the army into battle at Rakshasi Tangadi, also called Talikota. The combined armies of Bijapur, Ahmadnagar and Golconda defeated the forces of Vijayanagara. The city was sacked and soon abandoned. The centre of the empire shifted east, under the Aravidu dynasty.',
    }),
    sl('check', 'Quick check: a chronology', {
      b: 'Arrange these events in chronological order.',
      chk: 'ord_found',
      n: 'Think about the founding, a conquest, the great battle and the rediscovery.',
    }),
    sl('concept', 'Nayakas and amara-nayakas', {
      b: 'The raya granted **territories (amaram)** to commanders, who **collected dues**, **sent troops** and **paid tribute**.',
      v: vNay,
      n: 'Nayakas were military chiefs who controlled forts and armed supporters. The amara-nayakas were commanders given territories, called amaram, by the raya. They collected taxes and dues from peasants, crafts persons and traders, and kept part for their horses and elephants. They sent troops to the king, paid annual tribute and presented gifts at the royal court.',
    }),
    sl('concept', 'The system in practice', {
      b: 'Kings sometimes **transferred** commanders; in the seventeenth century many nayakas set up **independent kingdoms**.',
      v: vNayDetail,
      n: 'Kings sometimes transferred amara-nayakas from one territory to another. Later, in the seventeenth century, many nayakas established independent kingdoms. Historians note that the system contains elements of the iqta system of the Delhi Sultanate. Remember the key idea: a territory was granted in return for service to the raya.',
    }),
    sl('check', 'Quick check: a claim', {
      b: 'True or false? In the sixteenth century the amara-nayakas ruled independent kingdoms and owed nothing to the raya.',
      chk: 'tf_nay',
      n: 'Think about what the commanders owed and when independence came.',
    }),
    sl('concept', 'Rayas and the Deccan Sultanates', {
      b: 'Relations mixed **war**, **shifting alliances**, **borrowing** and **trade**.',
      v: vSult,
      n: 'The rayas fought often with the Deccan Sultanates, especially over the fertile Raichur doab and over trade. But the sultans also fought one another, and Rama Raya played one sultan against another. The rayas borrowed titles, such as Hindu Suratrana, and features such as arches and domes. These were wars between states that also traded and made alliances.',
    }),
    sl('check', 'Quick check: people and acts', {
      b: 'Match each person with what he is associated with.',
      chk: 'mt_people',
      n: 'Recall the founders, the great ruler, the minister and the discoverer.',
    }),
    sl('example', 'Worked example 2: planning a 3-mark answer', {
      b: 'Question: *Explain why trade in horses mattered to the rayas.*',
      bl: [
        'Step 1 — Write the **fact**: where horses came from.',
        'Step 2 — Add **who traded** and where.',
        'Step 3 — Close with the **consequence** for the army.',
      ],
      v: vHorseEx,
      n: 'To plan a three mark answer, write three linked points. First, horses came from Arabia and Central Asia and were vital for warfare. Second, kudirai chettis traded in them, and the Portuguese set up stations on the west coast from 1498. Third, trade routes and the coast therefore mattered for the strength of the army.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. Mackenzie brought the ruins to light in 1800, and photographs, inscriptions and surveys filled in the picture. The empire was founded in 1336, flourished under Krishnadeva Raya, and was defeated in 1565. Amara-nayakas held territories in return for service. Relations with the Sultanates mixed war, alliance, borrowing and trade.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Describe the wars as **between states**, not as only a clash of religions.',
        'Krishnadeva Raya **ruled 1509 to 1529**; he did not found the empire.',
        'Amara-nayakas **served the raya**; independence came later.',
        'Say the city was **sacked and soon abandoned** after 1565.',
        'In dating questions, give a **range** and name the clues.',
      ],
      v: vTips1,
      n: 'Some tips. Describe the wars with the Sultanates as wars between states, not only a clash of religions. Krishnadeva Raya ruled from 1509 to 1529 and did not found the empire. Amara-nayakas served the raya, and independence came later. After 1565 the city was sacked and soon abandoned. In dating questions, give a range and name the clues.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'An Imperial Capital: Vijayanagara — Part 2: The City, Its Centres and Its Sources',
  goals: [
    'Describe the water resources, the fortifications and the urban core',
    'Describe the royal centre, the Mahanavami dibba and the open questions about buildings',
    'Describe the sacred centre, the Virupaksha and Vitthala temples and the claim of the rulers',
    'Read buildings and plans as sources, and test a label on a building',
  ],
  slides: [
    sl('title', 'The City, Its Centres and Its Sources', {
      b: 'Part 2: **water and walls**, the **urban core**, the **royal** and **sacred centres**, and **buildings and plans** as sources.',
      v: vRoute2,
      n: 'In this part we walk through the city. We start with its water and its walls, then the urban core, the royal centre and the sacred centre. Finally we ask how historians use buildings and plans as sources, and what those sources can and cannot tell us.',
    }),
    sl('diagram', 'A site chosen for water', {
      v: vWater,
      n: 'The Tungabhadra river forms a natural basin on the north east, and streams flowed down from the granite hills. Embankments created reservoirs. The Kamalapuram tank, made in the early fifteenth century, watered fields and was linked by a canal to the royal centre. The Hiriya canal drew water from a dam across the Tungabhadra to irrigate the valley.',
    }),
    sl('diagram', 'Seven lines of fortification', {
      v: vWalls,
      n: 'Abdur Razzaq, an ambassador from Persia who came in the 1440s, noted seven lines of fortification. They enclosed not only the city but also agricultural land and forests, and fields within the walls helped the city to withstand sieges. The walls used no mortar. Wedge shaped stone blocks were held in place by interlocking, and gateways often used arches and domes.',
    }),
    sl('check', 'Quick check: the walls', {
      b: 'The walls used no cementing agent such as ___; wedge-shaped blocks held one another by interlocking.',
      chk: 'fb_mortar',
      n: 'Recall how the stones of the walls were held together.',
    }),
    sl('concept', 'The urban core', {
      b: 'Roads followed the **valleys**; **few remains** of ordinary houses survive; **tombs, mosques and shrines** were widespread.',
      v: vUrban,
      n: 'In the urban core, roads followed the valleys. Archaeologists found few remains of ordinary houses, though travellers such as Barbosa described them. One part held tombs and mosques whose mandapa like features resemble temple architecture. Shrines and small temples were widespread, and wells and tanks served the residents.',
    }),
    sl('diagram', 'Zones of the city', {
      v: vZones,
      n: 'This schematic shows four kinds of zone: the royal centre, the sacred centre, the urban core and the irrigated fields, all within the fortified area. It is not a map, and the boxes do not show real directions. Its purpose is to help you remember what belongs to each zone.',
    }),
    sl('example', 'Worked example 1: reading an imagined plan', {
      b: 'Imagined plan with four blocks. Name the zone of each from its clues.',
      bl: [
        'Step 1 — List the **clues** for each block.',
        'Step 2 — Match them to a **zone**.',
        'Step 3 — Note what the plan **cannot show**: dates and builders.',
      ],
      v: vZoneEx,
      n: 'To read a plan, list the clues for each block and match them to a zone. Gateways taller than shrine towers and long colonnades point to the sacred centre. A tank with a canal and strips of field inside a wall point to irrigated fields. A high carved platform and stables point to the royal centre. Remember that a plan does not give dates or builders.',
    }),
    sl('concept', 'The royal centre', {
      b: 'South-western part; over **60 temples**, about **30 palace-type complexes**; the **Hazara Rama temple**.',
      v: vRoyal,
      n: 'The royal centre lay in the south western part of the settlement. It had over sixty temples and about thirty building complexes described as palaces. The largest enclosure is called the king\'s palace, but its function is uncertain. The Hazara Rama temple was probably used only by the king and his family, and had panels from the Ramayana. Elephant stables lay nearby.',
    }),
    sl('diagram', 'The Mahanavami dibba', {
      v: vDibba,
      n: 'The Mahanavami dibba is a massive platform with carved sides. It rises from a base of about eleven thousand square feet to a height of about forty feet. This drawing is a schematic and is not to scale. It shows the dimensions that matter, and reminds us that the platform was designed to be seen.',
    }),
    sl('check', 'Quick check: the platform', {
      b: 'The Mahanavami dibba is a massive platform with carved sides. About how high does it rise?',
      chk: 'm_dibba_size',
      n: 'Recall the height of the platform.',
    }),
    sl('concept', 'The platform and the festival', {
      b: 'Historians combine the **platform** with **travellers\' descriptions** of the **Mahanavami** festival.',
      v: vFest,
      n: 'The Mahanavami, the great ninth day, was a festival of the autumn months, September and October. Travellers describe worship of the image and of the state horse, sacrifices, displays, a review of the army and gifts brought by nayakas to the king. Historians link the platform with these rituals by combining such descriptions with the structure itself.',
    }),
    sl('concept', 'Open questions', {
      b: 'The **Lotus Mahal** and the **king\'s palace** are **open questions**.',
      v: vOpen,
      n: 'Some buildings raise open questions. The Lotus Mahal was named by British travellers in the nineteenth century, and its use is uncertain; one suggestion is that it was a council chamber. The largest enclosure of the royal centre is called the king\'s palace, but nobody is sure of its function. Historians treat these as questions, not settled facts.',
    }),
    sl('concept', 'The sacred centre', {
      b: 'Rocky hills near the **Tungabhadra**; stories of the **Ramayana** and of **Pampadevi** and **Virupaksha**.',
      v: vSacred,
      n: 'The sacred centre lay in the northern part, near the Tungabhadra, among rocky hills. These hills were linked with stories from the Ramayana and with the goddess Pampadevi marrying Virupaksha, a form of Shiva. The rulers claimed to rule on behalf of Virupaksha and signed their orders Shri Virupaksha in Kannada. Temple building included gopurams, mandapas and long colonnaded corridors.',
    }),
    sl('two-column', 'Virupaksha and Vitthala', {
      cols: [
        '**Virupaksha temple:** a form of **Shiva**; Krishnadeva Raya built a **hall** before the main shrine to mark his accession and is credited with the **eastern gopuram**.',
        '**Vitthala temple:** Vitthala is a form of **Vishnu** worshipped in Maharashtra; the shrine is designed as a **chariot**, and **chariot streets** extended from the gopurams.',
      ],
      v: vTemples,
      n: 'The Virupaksha temple honours a form of Shiva. Krishnadeva Raya built a hall in front of its main shrine to mark his accession, and he is credited with the eastern gopuram. The Vitthala temple honours Vitthala, a form of Vishnu worshipped in Maharashtra. Its shrine is designed as a chariot. Rulers used temples to claim legitimacy, and temples were centres of learning and of the economy.',
    }),
    sl('check', 'Quick check: a name', {
      b: 'True or false? Historians are certain that the Lotus Mahal was a pleasure pavilion of the queens, as its name suggests.',
      chk: 'tf_lotus',
      n: 'Think about who gave the name and what is known of its use.',
    }),
    sl('example', 'Worked example 2: seen and inferred', {
      b: 'Take the **Hazara Rama temple**. Which statements come from the building and which are inferences?',
      bl: [
        'Step 1 — List what can be **seen**: panels, position.',
        'Step 2 — List what is **inferred**: who used it.',
        'Step 3 — Mark the inference with a word such as **probably**.',
      ],
      v: vHazaraEx,
      n: 'Separate what a building shows from what is inferred. The Hazara Rama temple has panels from the Ramayana and stands in the royal centre; these can be seen. That only the king and his family used it is probably true, but it is an inference. Use a word such as probably when you state an inference.',
    }),
    sl('concept', 'Buildings, plans and other sources', {
      b: 'Combine **plans**, **inscriptions**, **travellers** and **photographs**.',
      v: vRead,
      n: 'Buildings and plans show layout and design, and they tell us more about the ideas and planning of rulers than about ordinary lives. Inscriptions give donors, gifts and orders. Travellers say what they saw and were told. Photographs and surveys show the state of the site over time. Historians combine and cross check all of these.',
    }),
    sl('check', 'Quick check: reading a plan', {
      b: 'Arrange these steps in a sensible order for reading a plan.',
      chk: 'ord_read',
      n: 'Think about what comes first and what comes last.',
    }),
    sl('example', 'Worked example 3: testing a label', {
      b: 'Imagined board near a ruined tank: *Queens\' bath.* Test the label.',
      bl: [
        'Step 1 — **Who** gave the name, and **when**?',
        'Step 2 — What does the **structure** itself show?',
        'Step 3 — Is there an **independent record**?',
        'Step 4 — State a **verdict**.',
      ],
      v: vLabelEx,
      n: 'Test a label with four questions. Who gave the name, and when? What does the structure itself show? Is there an independent record, such as an inscription or a description? Then state a verdict. Without such evidence, keep the label as a suggestion, and say so in your answer.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. The site gave water and the rulers added tanks and canals. Seven lines of wall, built without mortar, enclosed city, fields and forests. The royal centre had the Mahanavami dibba and the Lotus Mahal; the sacred centre had the Virupaksha and Vitthala temples. Buildings are valuable sources, but several uses remain uncertain.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Say the use of the **Lotus Mahal** is **uncertain**.',
        'Say the function of the **king\'s palace** is **uncertain**.',
        'Virupaksha is a form of **Shiva**; Vitthala a form of **Vishnu**.',
        'Buildings show **rulers\' ideas and planning** more than ordinary lives.',
        'Give **numbers** such as 40 feet and 11,000 square feet as about.',
      ],
      v: vTips2,
      n: 'Some tips. Say that the use of the Lotus Mahal and the function of the king\'s palace are uncertain. Virupaksha is a form of Shiva, and Vitthala is a form of Vishnu. Buildings show the ideas and planning of rulers more than ordinary lives. Give numbers such as forty feet as approximate. And name the evidence behind every claim.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'An Imperial Capital: Vijayanagara — Notes',
  sections: [
    {
      h: '1. Discovery of Hampi',
      t: 1,
      b: 'The ruins at **Hampi** were brought to light in **1800** by **Colonel Colin Mackenzie**, an engineer and antiquarian of the East India Company, who later became the first **Surveyor General of India** (1815). His early information drew on the memories of the priests of the **Virupaksha temple** and the shrine of **Pampadevi**; the name Hampi comes from Pampadevi, the local mother goddess.\n\nFrom **1856** photographers, among them Alexander Greenlaw, recorded the monuments. Epigraphists collected **inscriptions**, and historians used these together with the accounts of travellers. From the **1970s** detailed surveys and excavations, with scholars such as John M. Fritz, George Michell and M. S. Nagaraja Rao, mapped the site closely. In **1986** Hampi was declared a **World Heritage site**.',
      terms: [
        ['Epigraphist', 'A scholar who collects and reads inscriptions.'],
        ['Antiquarian', 'A person who studies old objects and ruins.'],
      ],
      v: vRedisc,
      vs: [vHampi, vMethods],
    },
    {
      h: '2. The rise of the empire',
      t: 1,
      b: 'Vijayanagara, the **city of victory**, was founded in **1336** by two brothers, **Harihara** and **Bukka**. The empire stretched from the Krishna–Tungabhadra doab to the far south, and its rulers were called **rayas**. Its rivals were the **Deccan Sultans** and the **Gajapati** rulers of Orissa.\n\n**Wealth:** fertile river valleys and lucrative trade. **Horses**, which came from Arabia and Central Asia, were vital for warfare, and local merchants called **kudirai chettis** traded in them. The **Portuguese** arrived on the west coast in **1498** and set up trading stations; spices, textiles and precious stones were traded.\n\n**Dynasties:** Sangama, then **Saluva** (from 1485), then **Tuluva**, and later the **Aravidu**. **Krishnadeva Raya** (ruled **1509 to 1529**) acquired the **Raichur doab** (1512), subdued the rulers of Orissa (1514) and defeated the Sultan of Bijapur (1520). He built fine temples and gopurams, and the Telugu work **Amuktamalyada** on statecraft is credited to him.\n\n**1565:** **Rama Raya**, the chief minister, led the army at **Rakshasi-Tangadi** (also called **Talikota**) against the combined armies of Bijapur, Ahmadnagar and Golconda. Vijayanagara was defeated, the city was sacked and soon abandoned, and the centre of the empire shifted east under the Aravidu dynasty.',
      terms: [
        ['Raya', 'The title of a ruler of Vijayanagara.'],
        ['Kudirai chettis', 'Local merchants who traded in horses.'],
      ],
      v: vEmpire,
      vs: [vTrade, vKdr, vBattle],
    },
    {
      h: '3. Nayakas and amara-nayakas',
      t: 2,
      b: '**Nayakas** were military chiefs who controlled forts and armed supporters. The **amara-nayakas** were military commanders given territories, called **amaram**, to govern by the raya. They collected taxes and dues from peasants, crafts persons and traders, kept part for themselves and for maintaining horses and elephants, and contributed troops to the king. They paid **annual tribute** and presented **gifts** at the royal court. Kings sometimes **transferred** them from one territory to another. In the seventeenth century many nayakas set up **independent kingdoms**. Historians see elements of the **iqta** system of the Delhi Sultanate in the arrangement.',
      terms: [
        ['Amaram', 'A territory given to an amara-nayaka to govern.'],
        ['Amara-nayaka', 'A military commander who held an amaram and served the raya.'],
      ],
      v: vNay,
      vs: [vNayDetail],
    },
    {
      h: '4. Relations with the Deccan Sultanates',
      t: 2,
      b: 'The rayas and the Deccan Sultanates fought often, above all over the fertile **Raichur doab** and over **trade**. But the relations were not only war. The sultans fought **one another**, and Rama Raya played one sultan against another in shifting coalitions. The rayas borrowed **titles**, such as **Hindu Suratrana** (Hindu Sultan), and **architectural features**, such as arches and domes. These were wars between states that also traded and made alliances; historians do not describe them as wars that began in religion.',
      terms: [
        ['Hindu Suratrana', 'A title, meaning Hindu Sultan, by which the rayas were sometimes called.'],
        ['Doab', 'Land between two rivers; the Raichur doab lay between rivers and was fertile.'],
      ],
      v: vSult,
    },
    {
      h: '5. Water, walls and the urban core',
      t: 3,
      b: '**Water:** the **Tungabhadra** forms a natural basin on the north-east, and streams flowed down from granite hills. **Embankments** created reservoirs. The **Kamalapuram tank** (early fifteenth century) watered fields and was linked by a canal to the royal centre; the **Hiriya canal** drew water from a dam across the Tungabhadra to irrigate the valley.\n\n**Walls:** **Abdur Razzaq**, an ambassador from Persia in the 1440s, noted **seven lines of fortification**, which enclosed city, agricultural land and forests. No mortar or cementing agent was used: **wedge-shaped** stone blocks were held by **interlocking**. Gateways often had **arches and domes**, features of Indo-Islamic architecture. Fields within the walls helped the city to withstand sieges.\n\n**Urban core:** roads followed valleys; there are **few remains of ordinary houses**, though travellers such as **Barbosa** described them. One part had tombs and mosques whose mandapa-like features resemble temple architecture; shrines, small temples, wells and tanks were widespread.',
      terms: [
        ['Fortification', 'A wall or line of defence built round a place.'],
        ['Mandapa', 'A pillared hall in a temple.'],
      ],
      v: vWater,
      vs: [vWalls, vUrban, vZones],
    },
    {
      h: '6. The royal and sacred centres',
      t: 4,
      b: '**Royal centre:** the south-western part of the settlement, with over **60 temples** and about **30 building complexes** described as palaces. The largest enclosure is called the **king\'s palace**; its function is uncertain. The **Mahanavami dibba** is a massive platform with carved sides, rising from a base of about 11,000 square feet to about 40 feet. Rituals of the **Mahanavami** festival in the autumn months (September–October) included worship of the image and of the state horse, sacrifices, displays, a review of the army and gifts by nayakas; historians link the platform with them by combining travellers\' descriptions with the structure. The **Lotus Mahal** got its name from British travellers in the nineteenth century, and its use is uncertain (possibly a council chamber). The **Hazara Rama temple** was probably used only by the king and his family and has panels from the Ramayana. Elephant stables lay nearby.\n\n**Sacred centre:** the northern part, near the Tungabhadra, with rocky hills linked with the Ramayana (the kingdom of Kishkindha) and with **Pampadevi** marrying **Virupaksha**, a form of Shiva. The rulers claimed to rule on behalf of Virupaksha and signed orders **Shri Virupaksha** in Kannada. Temples had **gopurams** (royal gateways, often taller than the shrine towers), mandapas and long colonnaded corridors. Krishnadeva Raya built a hall before the main shrine of the Virupaksha temple at his accession and is credited with its eastern gopuram. The **Vitthala** temple, for a form of Vishnu worshipped in Maharashtra, has a shrine designed as a **chariot**; chariot streets extended from temple gopurams. Rulers used temples to claim legitimacy, and temples were centres of learning and of the economy.',
      terms: [
        ['Gopuram', 'A royal gateway of a temple, often taller than the towers of the shrine.'],
        ['Mahanavami dibba', 'A massive carved platform of the royal centre, linked with the Mahanavami festival.'],
      ],
      v: vDibba,
      vs: [vRoyal, vFest, vSacred, vTemples],
    },
    {
      h: '7. Sources: buildings and plans',
      t: 5,
      b: 'Historians use **buildings and plans**, **inscriptions**, **travellers\' accounts** (Niccolo de Conti, Abdur Razzaq, Afanasii Nikitin, Duarte Barbosa, Domingo Paes, Fernao Nuniz) and **photographs**. Buildings tell us more about the **ideas and planning of rulers** than about the lives of ordinary people. Some questions remain open, such as who used the king\'s palace and what the Lotus Mahal was for.\n\n**Reading a plan or building:** note who made it and when; identify its parts; link them with written evidence; say what it supports and what it cannot show.\n\nIn SOYL practice, source passages are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
      terms: [
        ['Plan', 'A drawing that shows the layout of a building or of a group of buildings.'],
        ['Inscription', 'Writing cut into stone or metal, often recording gifts or orders.'],
      ],
      v: vRead,
      vs: [vZoneEx, vLabelEx],
    },
  ],
  tips: '**Common mistakes**\n- Describing the wars with the Deccan Sultanates only as a clash of religions; they were wars between states that also traded and made alliances.\n- Saying that Krishnadeva Raya founded the empire; it was founded in 1336 and he ruled from 1509 to 1529.\n- Writing that nayakas were always independent; amara-nayakas served the raya, and independence came later.\n- Stating the use of the Lotus Mahal or the king\'s palace as fact; both are uncertain.\n- Mixing the deities: Virupaksha is a form of Shiva and Vitthala a form of Vishnu.\n- Reading buildings as a record of everyday life.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); examine, compare and discuss questions need a judgement.\n- Source questions (4 marks): parts (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who brought the ruins of Hampi to light, and when?', '**Colin Mackenzie**, an engineer and antiquarian of the East India Company, in **1800**.', 'fact', 1],
  ['Where did the name Hampi come from?', '**Pampadevi**, the local mother goddess.', 'fact', 1],
  ['Whose memories guided Mackenzie\'s early work?', 'Priests of the **Virupaksha temple** and the **Pampadevi shrine**.', 'fact', 1],
  ['When did photographers begin to record Hampi?', 'From **1856**; Alexander Greenlaw was one of them.', 'fact', 1],
  ['**Epigraphist**', 'A scholar who collects and reads inscriptions.', 'definition', 1],
  ['When was Hampi declared a World Heritage site?', 'In **1986**.', 'fact', 1],
  ['Who founded Vijayanagara, and when?', 'The brothers **Harihara and Bukka**, in **1336**.', 'fact', 1],
  ['What does Vijayanagara mean?', '**City of victory**.', 'fact', 1],
  ['Order of the dynasties', 'Sangama, then **Saluva** (from 1485), then **Tuluva**; the Aravidu later.', 'fact', 1],
  ['Rivals of Vijayanagara', 'The **Deccan Sultans** and the **Gajapati** rulers of Orissa.', 'fact', 1],
  ['**Kudirai chettis**', 'Local merchants who traded in horses.', 'definition', 1],
  ['Why were horses important?', 'They were vital for warfare and came from Arabia and Central Asia.', 'concept', 1],
  ['Krishnadeva Raya: dates and acts', 'Ruled **1509 to 1529**; Raichur doab 1512; Orissa 1514; Bijapur 1520.', 'fact', 1],
  ['What is the Amuktamalyada?', 'A Telugu work on statecraft credited to Krishnadeva Raya.', 'fact', 1],
  ['What happened in 1565?', '**Rama Raya** led the army at Rakshasi-Tangadi (Talikota); defeat; city sacked and soon abandoned.', 'fact', 1],
  ['**Amara-nayaka**', 'A military commander who held an **amaram** from the raya and served him.', 'definition', 2],
  ['What did an amara-nayaka collect and keep?', 'Dues from peasants, crafts persons and traders; kept part for horses and elephants.', 'fact', 2],
  ['What did an amara-nayaka owe the raya?', 'Troops, annual tribute and gifts at court.', 'fact', 2],
  ['What happened to many nayakas later?', 'In the seventeenth century many set up **independent kingdoms**.', 'fact', 2],
  ['**Hindu Suratrana**', 'A title, meaning Hindu Sultan, by which rayas were sometimes called; shows borrowing.', 'definition', 2],
  ['Relations with the Sultanates', 'War over the Raichur doab and trade, but also shifting alliances, borrowing and trade.', 'concept', 2],
  ['Exam tip on the wars', 'Call them wars between states that also traded and made alliances.', 'exam-tip', 2],
  ['What natural feature lay on the north-east of the site?', 'The **Tungabhadra**, forming a natural basin.', 'fact', 3],
  ['Name the two big water works', 'The **Kamalapuram tank** with its canal to the royal centre, and the **Hiriya canal** from a dam on the Tungabhadra.', 'fact', 3],
  ['How many lines of fortification, and who noted them?', '**Seven**, noted by Abdur Razzaq in the 1440s.', 'fact', 3],
  ['How were the walls built?', 'No mortar; **wedge-shaped** blocks held by interlocking; gateways with arches and domes.', 'fact', 3],
  ['What did historians find in the urban core?', 'Few remains of ordinary houses; tombs, mosques, shrines, wells and tanks.', 'fact', 3],
  ['Where was the royal centre?', 'The south-western part; over 60 temples and about 30 palace-type complexes.', 'fact', 4],
  ['Size of the **Mahanavami dibba**', 'About **11,000 square feet** at the base and about **40 feet** high.', 'fact', 4],
  ['Uncertainties in the royal centre', 'The use of the **Lotus Mahal** and the function of the **king\'s palace**.', 'exam-tip', 4],
  ['Virupaksha and Vitthala', 'Virupaksha: a form of **Shiva**. Vitthala: a form of **Vishnu**, with a chariot-shaped shrine.', 'concept', 4],
  ['Why did rulers sign Shri Virupaksha?', 'To show they ruled on behalf of the god, which gave legitimacy.', 'concept', 4],
  ['What can buildings and plans tell us best?', 'The ideas and planning of rulers, more than ordinary lives.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — An Imperial Capital: Vijayanagara',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_hp_photo', 'm_nay_criteria', 'm_dibba_weaken', 'ar_houses'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_water', 's_sult', 's3_festival'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_rise', 'l_centres'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_surveyor'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — An Imperial Capital: Vijayanagara',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_found', 'm_kdr_date', 'm_nay_indep', 'm_sult_events', 'm_tank', 'm_channel', 'm_lotus_name', 'm_date_note', 'ar_doab', 'ar_virup'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_found', 's_amara', { attempt: 1, keys: ['s_trench', 's_dibba'] }, 's3_amara_transfer', { attempt: 1, keys: ['s3_city', 's3_temple'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_water_fort', { attempt: 1, keys: ['l_sultan', 'l_sources'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_nayaka', 'sb_guide'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch07 only (the discovery of Hampi and the rise of the empire; rayas, nayakas and the Deccan Sultanates; water resources, fortifications and the urban core; the royal and sacred centres; sources: buildings and plans)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; no traveller or inscription is quoted, translated or closely paraphrased; no NCERT text, source box, caption, map or exercise and no board or sample-paper item reused (D-036)',
    facts: 'Mackenzie 1800 and Surveyor General 1815; photographers from 1856; UNESCO 1986; empire founded 1336 by Harihara and Bukka; Saluva from 1485; Krishnadeva Raya 1509–1529 (Raichur doab 1512, Orissa 1514, Bijapur 1520); Portuguese 1498; Rakshasi-Tangadi 1565; seven lines of fortification noted in the 1440s; Mahanavami dibba about 11,000 square feet and about 40 feet; no maps (OA-23)',
    neutrality: 'wars with the Deccan Sultanates presented as wars between states that also traded and allied, with borrowing of titles and architecture; no religious framing of the conflicts',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
