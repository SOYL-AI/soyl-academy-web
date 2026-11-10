// Build CBSE 12 History ch04 Thinkers, Beliefs and Buildings: Cultural Developments (c. 600 BCE to 600 CE). Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-history-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch04', 'social-science');
const { SPAN } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Compact helpers: alt text is generated from the content so that it always matches the table or flow.
const T = (headers, rows, caption) => table(headers, rows, `Table of ${caption}. Columns: ${headers.join(', ')}. ${rows.map((r) => r.join(', ')).join('; ')}`, caption);
const F = (labels, caption) => flow('LR', labels, `Flow of ${caption}: ${labels.join(', then ')}`, caption);

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
const yearLabel = (y) => (y < 0 ? `c. ${-y} BCE` : `c. ${y} CE`);
function timeline(items, alt, caption, y0, y1, step) {
  // Four label lanes (far above, near below, near above, far below) so neighbouring labels never collide.
  const s = new Svg(680, 360);
  const AX = 180;
  const X = (y) => 70 + ((y - y0) / (y1 - y0)) * 540;
  s.arrow(40, AX, 650, AX, { sw: 1.8 });
  for (let yr = y0; yr <= y1; yr += step) s.line(X(yr), AX - 6, X(yr), AX + 6, { sw: 1.2, color: 'muted' });
  const LANES = [20, AX + 30, 92, AX + 102];
  items.forEach(([yr, label], i) => {
    const top = LANES[i % 4];
    const above = top < AX;
    const lines = label.split(' | ');
    s.dot(X(yr), AX, 6, 'accent');
    s.line(X(yr), AX, X(yr), above ? top + 12 + lines.length * 18 : top - 12, { sw: 1.4, color: 'accent' });
    s.text(X(yr), top, yearLabel(yr), { bold: true, size: 13 });
    lines.forEach((ln, j) => s.text(X(yr), top + 18 + j * 18, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}
const vSpan = timeline(
  SPAN,
  `Timeline from 700 BCE to 800 CE: ${SPAN.map(([y, t]) => `${yearLabel(y)}, ${t.replace(/ \| /g, ' ')}`).join('; ')}`,
  'Five landmarks across a long span',
  -700, 800, 100,
);

const vStupa = (() => {
  const s = new Svg(680, 330);
  const G = 262;
  s.text(20, 16, 'Schematic side view, not to scale', { anchor: 'start', size: 13, muted: true });
  s.line(90, G, 650, G, { sw: 2 });
  s.path(`M 210 ${G} A 130 130 0 0 1 470 ${G} Z`, { sw: 2.4, color: 'accent', fill: 'fill' });
  s.rect(314, 106, 52, 26, { sw: 1.6, rx: 2 });
  s.line(340, 106, 340, 44, { sw: 2.4 });
  s.path('M 304 62 Q 340 30 376 62 Z', { sw: 1.8, fill: 'fill' });
  for (let x = 150; x <= 530; x += 20) s.line(x, G - 30, x, G, { sw: 1.6 });
  s.line(150, G - 26, 530, G - 26, { sw: 1.4 });
  s.line(150, G - 8, 530, G - 8, { sw: 1.4 });
  s.line(570, 150, 570, G, { sw: 3 });
  s.line(610, 150, 610, G, { sw: 3 });
  for (const [y, x0, x1] of [[156, 556, 624], [178, 560, 620], [200, 560, 620]]) s.line(x0, y, x1, y, { sw: 3 });
  s.text(590, 122, 'Torana', { bold: true, size: 14 });
  s.text(590, 138, '(gateway)', { size: 12 });
  s.text(430, 36, 'Chhatri (umbrella)', { anchor: 'start', size: 13 });
  s.line(426, 40, 372, 56, { sw: 1.2, color: 'muted' });
  s.text(430, 74, 'Yashti (mast)', { anchor: 'start', size: 13 });
  s.line(426, 76, 346, 76, { sw: 1.2, color: 'muted' });
  s.text(430, 104, 'Harmika', { anchor: 'start', size: 13 });
  s.text(430, 122, 'abode of the gods', { anchor: 'start', size: 12 });
  s.line(426, 108, 370, 116, { sw: 1.2, color: 'muted' });
  s.text(340, 192, 'Anda', { bold: true });
  s.text(340, 210, 'hemispherical mound', { size: 12 });
  s.text(20, 188, 'Vedika', { anchor: 'start', size: 13, bold: true });
  s.text(20, 205, '(railing)', { anchor: 'start', size: 12 });
  s.line(70, 208, 148, 236, { sw: 1.2, color: 'muted' });
  s.arrow(190, 296, 490, 296, { sw: 1.8, color: 'accent' });
  s.text(340, 316, 'Devotees walk round it clockwise: pradakshina', { size: 13 });
  return s.visual('Schematic side view of a stupa, not to scale: a hemispherical mound called the anda; on top a balcony-like harmika, the abode of the gods, with a mast called the yashti and an umbrella called the chhatri; a railing called the vedika around the base; a gateway called the torana at one side; and an arrow showing devotees walking round clockwise', 'Parts of a stupa');
})();

const vPlan = (() => {
  const s = new Svg(580, 340);
  const cx = 190, cy = 180;
  const circle = (r, o) => s.path(`M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`, o);
  s.text(20, 14, 'Schematic plan from above, not a map', { anchor: 'start', size: 13, muted: true });
  circle(135, { sw: 2.4 });
  circle(112, { sw: 1.6, dash: true, color: 'accent' });
  circle(90, { sw: 2.4, color: 'accent', fill: 'fill' });
  s.rect(cx - 12, cy - 12, 24, 24, { sw: 1.6, rx: 2 });
  s.head(cx + 10, cy - 112, 1, 0, { color: 'accent', size: 11 });
  s.rect(cx - 14, cy - 150, 28, 30, { sw: 2, rx: 2 });
  s.rect(cx - 14, cy + 120, 28, 30, { sw: 2, rx: 2 });
  s.rect(cx - 150, cy - 14, 30, 28, { sw: 2, rx: 2 });
  s.rect(cx + 120, cy - 14, 30, 28, { sw: 2, rx: 2 });
  s.text(380, 82, 'Railing (vedika)', { anchor: 'start', size: 13 });
  s.line(376, 84, 290, 85, { sw: 1.2, color: 'muted' });
  s.text(380, 130, 'Anda (dome from above)', { anchor: 'start', size: 13 });
  s.line(376, 132, 272, 139, { sw: 1.2, color: 'muted' });
  s.text(380, 180, 'Gateway (torana)', { anchor: 'start', size: 13 });
  s.line(376, 180, 342, 180, { sw: 1.2, color: 'muted' });
  s.text(380, 262, 'Path for pradakshina', { anchor: 'start', size: 13 });
  s.line(376, 262, 272, 259, { sw: 1.2, color: 'muted' });
  s.text(380, 298, 'Small square at the centre:', { anchor: 'start', size: 13 });
  s.text(380, 316, 'the harmika', { anchor: 'start', size: 13 });
  return s.visual('Schematic plan of a stupa seen from above, not a map: a large inner circle for the dome with a small square for the harmika at its centre, a dashed circle for the path on which devotees walk round clockwise, an outer circle for the railing, and four gateways facing the four directions', 'A stupa seen from above');
})();

const vTemple = (() => {
  const s = new Svg(680, 310);
  s.text(130, 14, 'Early temple: plan', { bold: true, size: 14 });
  s.text(490, 14, 'Later temple: side view', { bold: true, size: 14 });
  s.line(310, 30, 310, 280, { sw: 1.2, dash: true, color: 'muted' });
  // Early plan: square sanctum with one doorway and a porch with pillars.
  s.line(70, 80, 180, 80, { sw: 4 });
  s.line(70, 80, 70, 190, { sw: 4 });
  s.line(180, 80, 180, 190, { sw: 4 });
  s.line(70, 190, 115, 190, { sw: 4 });
  s.line(145, 190, 180, 190, { sw: 4 });
  s.text(125, 135, 'Garbhagriha', { bold: true, size: 13 });
  s.text(125, 154, '(shrine room)', { size: 12 });
  for (const x of [85, 115, 145, 175]) s.dot(x, 216, 5);
  s.arrow(130, 252, 130, 198, { sw: 1.8, color: 'accent' });
  s.text(130, 270, 'Single doorway', { size: 13 });
  s.text(235, 216, 'Porch pillars', { anchor: 'start', size: 12 });
  // Later side view: platform, shrine body, tall shikhara, finial.
  s.rect(400, 230, 180, 30, { sw: 2, rx: 2 });
  s.rect(430, 150, 120, 80, { sw: 2.2, rx: 2 });
  s.rect(475, 190, 30, 40, { sw: 1.6, rx: 2 });
  for (const x of [445, 460, 520, 535]) s.line(x, 160, x, 222, { sw: 1.2, color: 'muted' });
  s.polygon([[430, 150], [550, 150], [525, 62], [455, 62]], { sw: 2.4, color: 'accent', fill: 'fill' });
  s.line(490, 62, 490, 38, { sw: 2 });
  s.dot(490, 34, 5, 'accent');
  s.text(560, 100, 'Shikhara', { anchor: 'start', size: 13, bold: true });
  s.text(560, 118, '(tall tower)', { anchor: 'start', size: 12 });
  s.text(490, 172, 'Carved walls', { size: 12 });
  s.text(340, 294, 'Schematic drawings, not to scale', { size: 13, muted: true });
  return s.visual('Two schematic drawings, not to scale: on the left, the plan of an early temple, a small square shrine room called the garbhagriha with a single doorway and a porch with pillars; on the right, a side view of a later temple with a tall tower called the shikhara over the shrine and carved walls', 'Early and later temples');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = F(['Sanchi and its survival', 'A time of ferment', 'Sacrifice and debate', 'The Buddha and the sangha', 'Jaina ideas and spread'], 'Part 1');
const vRoute2 = F(['A long span of centuries', 'Stupas and their parts', 'Sculpture and its readings', 'Mahayana and Puranic traditions', 'Temples and sources'], 'Part 2');
const vGateway = F(['Europeans admire Sanchi', 'The French ask for the eastern gateway', 'Shahjehan Begum is asked', 'Plaster casts are made', 'The originals stay in place'], 'the story of the eastern gateway');
const vSanchiAmaravati = T(
  ['', 'Sanchi', 'Amaravati'],
  [
    ['Where', 'Near Bhopal, Madhya Pradesh', 'Andhra Pradesh'],
    ['Nineteenth century', 'Gateways stayed; casts were made', 'The stupa was dismantled'],
    ['Sculptures', 'Stayed at the site', 'Went to Calcutta, Madras and London'],
    ['Care', 'Begums of Bhopal gave money', 'H. H. Cole argued for casts, not removal'],
    ['Result', 'Preserved in place; World Heritage site, 1989', 'Setting lost; pieces scattered'],
  ],
  'Sanchi compared with Amaravati',
);
const vFerment = T(
  ['Thinker', 'Linked with'],
  [['Zarathustra', 'Iran'], ['Kong Zi', 'China'], ['Socrates, Plato and Aristotle', 'Greece'], ['Mahavira and the Buddha', 'India']],
  'thinkers of the age of ferment and the lands they are linked with',
);
const vSacrifice = F(['Hymns to Agni, Indra and Soma', 'Household sacrifices', 'Rajasuya and ashvamedha by chiefs and kings', 'Brahmana priests conduct the rites', 'Some begin to question their worth'], 'how sacrifices changed');
const vDebate = T(
  ['Feature', 'What it was'],
  [
    ['Upanishads', 'Raised questions about life, death, atman and brahman'],
    ['Teachers', 'Travelled from place to place'],
    ['Debates', 'Held in a kutagarashala or in groves'],
    ['Aim', 'To persuade others of a teacher\'s ideas'],
  ],
  'the Upanishads, travelling teachers and debates',
);
const vVoices = T(
  ['Teacher', 'Group or label', 'Position, in plain words'],
  [
    ['Makkhali Gosala', 'Ajivikas', 'Everything is fixed in advance; effort cannot change it'],
    ['Ajita Kesakambalin', 'Materialist', 'The body returns to its elements at death; nothing survives'],
  ],
  'two other teachers and the positions attributed to them',
);
const vJaina = T(
  ['Idea', 'Detail'],
  [
    ['Teacher', 'Mahavira (Vardhamana), regarded as the 24th tirthankara'],
    ['The world', 'The whole world is animated'],
    ['Ahimsa', 'Non-injury to every living being'],
    ['Release', 'Through renunciation and penance; karma and rebirth'],
    ['Monks', 'Five vows: not to kill, steal or lie, to own nothing, celibacy'],
    ['Spread and texts', 'Many parts of India; Prakrit, Sanskrit and Tamil'],
  ],
  'Jaina teaching',
);
const vPlanJaina = T(
  ['Mark', 'What to write (about 20 words each)'],
  [
    ['1', 'The whole world is animated'],
    ['2', 'Ahimsa: non-injury to every living being'],
    ['3', 'Karma and rebirth'],
    ['4', 'Release through renunciation and penance; the five vows of monks'],
    ['5', 'Spread to many parts of India; texts in Prakrit, Sanskrit and Tamil'],
  ],
  'a plan for a 5-mark answer on Jaina teaching',
);
const vLife = T(
  ['Event', 'Place or detail'],
  [
    ['Early life', 'Siddhartha of the Shakya clan'],
    ['Leaving home', 'After seeing old age, sickness, death and a renouncer'],
    ['Enlightenment', 'Bodh Gaya'],
    ['First sermon', 'Sarnath'],
    ['Mahaparinibbana', 'Kusinagara'],
  ],
  'the life of the Buddha',
);
const vTeach = T(
  ['Idea', 'Meaning'],
  [
    ['Anicca', 'The world is transient'],
    ['Anatta', 'There is no permanent soul'],
    ['Dukkha', 'Sorrow is intrinsic to existence'],
    ['Middle path', 'Between severe penance and self-indulgence'],
    ['Human institutions', 'Created by humans, not by divine will'],
    ['Nibbana', 'Release through individual effort and right action'],
  ],
  'the main teachings of the Buddha',
);
const vSangha = T(
  ['Feature', 'Detail'],
  [
    ['Members', 'Monks (bhikkhus) and later nuns (bhikkhunis)'],
    ['First nun', 'Mahapajapati Gotami, after Ananda persuaded the Buddha'],
    ['Standing', 'All were regarded as equal within the sangha'],
    ['Followers', 'Kings, wealthy men, householders, workers, slaves, craftspeople'],
    ['Verses', 'The Therigatha preserves verses by bhikkhunis'],
  ],
  'the sangha',
);
const vChronicle = F(['Who wrote it, and when?', 'What does it claim?', 'For whom was it written?', 'What else supports the claim?', 'What can safely be concluded?'], 'five steps for reading a chronicle');
const vTexts = T(
  ['Text or place', 'What it is'],
  [
    ['Vinaya Pitaka', 'Rules for the sangha'],
    ['Sutta Pitaka', 'Teachings; includes the Therigatha'],
    ['Abhidhamma Pitaka', 'Philosophy'],
    ['Dipavamsa and Mahavamsa', 'Later chronicles from Sri Lanka'],
    ['Spread', 'Sri Lanka, Central Asia, China, Korea, Japan, Southeast Asia'],
  ],
  'Buddhist texts and the spread of Buddhism',
);
const vEqual = T(
  ['Claim: women and men stood equal in the sangha', 'For', 'Limit'],
  [
    ['Standing', 'All members were regarded as equal', 'The rule is stated in texts compiled later'],
    ['Admission', 'Women were ordained as bhikkhunis', 'The first woman was admitted only after Ananda persuaded the Buddha'],
    ['Voice', 'The Therigatha preserves verses by bhikkhunis', 'Verses show achievement, not full equality'],
  ],
  'weighing the claim that women and men stood equal in the sangha',
);
const vSum1 = T(
  ['Idea', 'Remember'],
  [
    ['Sanchi', 'Near Bhopal; Begums funded care; casts for the gateway; World Heritage 1989'],
    ['Amaravati', 'Dismantled; sculptures to Calcutta, Madras and London'],
    ['Ferment', 'Rigveda, sacrifices, Upanishads, debates, Gosala and Ajita'],
    ['Jainism', 'Mahavira; ahimsa; five vows'],
    ['Buddhism', 'Middle path; sangha; Tipitaka; spread'],
  ],
  'a summary of Part 1',
);
const vTips1 = T(
  ['Mistake to avoid', 'Better'],
  [
    ['Writing that Sanchi was dismantled', 'That was Amaravati; Sanchi stayed in place'],
    ['Calling the Therigatha a work by monks', 'It preserves verses by bhikkhunis'],
    ['Judging one faith against another', 'Describe each in its own terms'],
    ['Mixing up the Pitakas', 'Vinaya: rules; Sutta: teachings; Abhidhamma: philosophy'],
  ],
  'common mistakes in Part 1 and better answers',
);
const vRelic = T(
  ['Point', 'Detail'],
  [
    ['What a stupa is', 'A mound raised over relics'],
    ['Relics', 'Bodily remains such as bones or ashes, or objects used by the Buddha'],
    ['Why they were built', 'Relic sites were venerated'],
    ['Ashokavadana', 'Says Ashoka divided relics and ordered stupas in important towns'],
    ['Major stupas', 'Bharhut, Sanchi, Amaravati'],
  ],
  'what a stupa is and why it was built',
);
const vDonor = T(
  ['Kind of donor', 'Example'],
  [
    ['Kings', 'The Satavahanas'],
    ['Guilds', 'Ivory workers gave one gateway at Sanchi'],
    ['Merchants', 'Recorded on railings and gateways'],
    ['Ordinary people', 'Women and men named in inscriptions'],
    ['The sangha', 'Bhikkhus and bhikkhunis'],
  ],
  'who paid for stupas',
);
const vReadPlan = T(
  ['Step', 'What to look for'],
  [
    ['1', 'The mound at the centre and the harmika on it'],
    ['2', 'The railing that circles the mound'],
    ['3', 'The gateways: how many, and which way they face'],
    ['4', 'The path between mound and railing for walking round'],
  ],
  'four steps for reading a stupa plan',
);
const vSymbols = T(
  ['Symbol', 'Stands for'],
  [['Empty seat', 'Meditation'], ['Stupa', 'Mahaparinibbana'], ['Wheel', 'First sermon at Sarnath'], ['Tree', 'Enlightenment']],
  'symbols used by early sculptors for the Buddha',
);
const vStories = T(
  ['Carving', 'What it is'],
  [
    ['Jataka scenes', 'Tales of earlier births; the Vessantara Jataka is on the northern gateway'],
    ['Shalabhanjika', 'A woman holding a tree branch; auspicious; perhaps from popular traditions'],
    ['Serpents and animals', 'Motifs that appear on the stupa'],
    ['Method', 'Texts help identify scenes, but caution is needed'],
  ],
  'kinds of carving at Sanchi',
);
const vDebates = T(
  ['Image or question', 'One reading', 'Another reading'],
  [
    ['Woman with lotuses and elephants', 'Maya, the Buddha\'s mother', 'Gajalakshmi, goddess of good fortune'],
    ['Trees and serpents', 'Fergusson: tree and serpent worship', 'Buddhist stories and symbols'],
  ],
  'debates in reading the sculpture of Sanchi',
);
const vMahayana = T(
  ['Idea', 'Detail'],
  [
    ['Time', 'From about the beginning of the Common Era'],
    ['The Buddha', 'Seen as a saviour'],
    ['Bodhisattvas', 'Compassionate beings who help others reach salvation'],
    ['Images', 'Worship of Buddha images; Mathura and Taxila from about the first century CE'],
    ['Names', 'Hinayana (lesser vehicle) was Mahayana\'s word; the older tradition calls itself Theravada'],
  ],
  'Mahayana Buddhism',
);
const vPuranic = T(
  ['Tradition', 'Main deity and idea'],
  [
    ['Vaishnavism', 'Vishnu; ten avatars, such as Varaha, Narasimha, Rama and Krishna'],
    ['Shaivism', 'Shiva, often shown as the linga'],
    ['Puranas', 'Compiled by Brahmanas, many from the middle of the first millennium CE'],
    ['Style', 'Simple Sanskrit; read aloud to all, including women and Shudras'],
  ],
  'Puranic Hinduism',
);
const vPlanNew = T(
  ['Mark', 'What to write (about 20 words each)'],
  [
    ['1', 'Mahayana: the Buddha as saviour; Bodhisattvas'],
    ['2', 'Buddha images begin, at Mathura and Taxila'],
    ['3', 'Vaishnavism: Vishnu and his avatars'],
    ['4', 'Shaivism: Shiva and the linga'],
    ['5', 'The Puranas: simple Sanskrit, read aloud'],
  ],
  'a plan for a 5-mark answer on new devotional traditions',
);
const vTemples = T(
  ['Building', 'Detail'],
  [
    ['Dashavatara temple, Deogarh', 'Uttar Pradesh; about the fifth century CE'],
    ['Barabar caves', 'Bihar; cut into rock for the Ajivikas in Ashoka\'s time'],
    ['Kailashnatha temple, Ellora', 'Eighth century CE; carved out of a single rock'],
  ],
  'early temples and rock-cut shrines',
);
const vBias = T(
  ['Nineteenth-century judgement', 'Why it needs care'],
  [
    ['Indian sculpture compared with Greek art', 'The standard was foreign to the makers'],
    ['Many-armed or many-headed images seemed strange', 'The features carried meanings in their own traditions'],
    ['Gandhara work was valued', 'It resembled Greek work; Partha Mitter has studied these attitudes'],
  ],
  'nineteenth-century judgements of Indian sculpture',
);
const vSum2 = T(
  ['Idea', 'Remember'],
  [
    ['Stupa', 'Relics; anda, harmika, yashti, chhatri, vedika, torana; pradakshina'],
    ['Donors', 'Kings, guilds, merchants, ordinary people, the sangha'],
    ['Sculpture', 'Symbols, Jatakas, shalabhanjika; debated readings'],
    ['New traditions', 'Mahayana; Vaishnavism and Shaivism; Puranas'],
    ['Temples', 'Garbhagriha, shikhara; Deogarh, Barabar, Ellora'],
  ],
  'a summary of Part 2',
);
const vTips2 = T(
  ['Mistake to avoid', 'Better'],
  [
    ['Showing the Buddha in human form at Sanchi', 'Early sculptors used symbols'],
    ['Saying Barabar caves were Jaina', 'They were cut for the Ajivikas'],
    ['Stating a debated reading as fact', 'Say who reads it which way'],
    ['Saying kings alone paid for stupas', 'Many donors are recorded'],
  ],
  'common mistakes in Part 2 and better answers',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Thinkers, Beliefs and Buildings — Part 1: Sanchi, Debates and the Buddha',
  goals: [
    'Describe how Sanchi was discovered and preserved, and contrast it with Amaravati',
    'Explain the background of sacrifices, questions and debates around 600 BCE',
    'Explain the teachings of Mahavira and the Buddha and the working of the sangha',
    'Weigh evidence and plan answers on early religious thought',
  ],
  slides: [
    sl('title', 'Thinkers, Beliefs and Buildings', {
      b: 'Part 1: **Sanchi**, the time of **ferment**, and the **Jaina** and **Buddhist** traditions.',
      v: vRoute1,
      n: 'In this part we begin at Sanchi, a great stupa near Bhopal, and ask how it survived. Then we step back to about 600 BCE, a time of lively thinking, with sacrifices, questions about life and death, and public debates. We meet the Jaina teacher Mahavira, the Buddha, and the sangha, the community of monks and nuns.',
    }),
    sl('concept', 'Sanchi and its gateways', {
      b: 'The Great Stupa near **Bhopal** goes back to **Ashoka\'s time** and was enlarged later. Europeans took great interest in it.',
      v: vGateway,
      n: 'Sanchi lies near Bhopal in present day Madhya Pradesh. Its Great Stupa goes back to the time of Ashoka and was enlarged later. In the nineteenth century Europeans took great interest. The French asked Shahjehan Begum, ruler of Bhopal, for the eastern gateway, and the English wanted one too. Both were satisfied with plaster cast copies, and the originals stayed where they stood.',
    }),
    sl('two-column', 'Preserved or dismantled', {
      cols: [
        '**Sanchi:** the **Begums of Bhopal** gave money for its care. Sultan Jehan Begum funded a **museum and guesthouse**, and the publication of **John Marshall\'s** volumes.',
        '**Amaravati:** the stupa was **dismantled** in the nineteenth century and its sculptures went to Calcutta, Madras and London. **H. H. Cole** argued against removal.',
      ],
      v: vSanchiAmaravati,
      n: 'Sanchi survived while Amaravati did not. Shahjehan Begum and her successor Sultan Jehan Begum gave money for its preservation. Sultan Jehan Begum paid for a museum and a guesthouse, where John Marshall lived and wrote, and for the printing of his volumes on Sanchi. At Amaravati the stupa was dismantled, and its sculptures went to Calcutta, Madras and London. H. H. Cole argued against removing such remains.',
    }),
    sl('check', 'Quick check: a listing', {
      b: 'Sanchi was declared a UNESCO World Heritage site in ___.',
      chk: 'fb_unesco',
      n: 'Think of the year the monument was recognised across the world.',
    }),
    sl('concept', 'A time of ferment', {
      b: 'Around **600 BCE**, thinkers in several lands questioned older ideas.',
      v: vFerment,
      n: 'Around 600 BCE, thinkers in several parts of the world were asking big questions. Zarathustra is linked with Iran, Kong Zi with China, and Socrates, Plato and Aristotle with Greece. In India, Mahavira and the Buddha lived in roughly this period. They lived in different lands, yet all questioned older ideas.',
    }),
    sl('concept', 'The tradition of sacrifice', {
      b: 'The **Rigveda** has hymns to **Agni, Indra and Soma**. Sacrifices grew from household rites to **royal ceremonies**.',
      v: vSacrifice,
      n: 'The Rigveda, compiled between about 1500 and 1000 BCE, contains hymns to gods such as Agni, Indra and Soma. Sacrifices were at first household affairs. Later, chiefs and kings performed large ones, such as the rajasuya and the ashvamedha, with Brahmana priests conducting the rites. Over time, some people began to ask what sacrifices could really achieve.',
    }),
    sl('check', 'Quick check: how sacrifice changed', {
      b: 'How did the sacrifices of the Vedic tradition change over time?',
      chk: 'm_sacrifice',
      n: 'Recall the move from household rites to royal ones.',
    }),
    sl('concept', 'Upanishads and debates', {
      b: 'The **Upanishads** asked about **life and death**. Teachers **travelled** and argued in a **kutagarashala** or in groves.',
      v: vDebate,
      n: 'From about the sixth century BCE, the Upanishads raised questions about life, death and what lies beyond. They spoke of the atman, the self, and brahman, the ultimate reality. Teachers travelled from place to place and debated with rivals. Debates took place in a kutagarashala, a hut with a pointed roof, or in groves, and a teacher who argued well could win followers.',
    }),
    sl('concept', 'Other voices', {
      b: '**Makkhali Gosala** and **Ajita Kesakambalin** offered very different answers. Their own works have not survived.',
      v: vVoices,
      n: 'Not every teacher offered the same answer. Makkhali Gosala, whose followers were the Ajivikas, held that everything is fixed in advance and human effort cannot change it. Ajita Kesakambalin held that the body returns to its elements at death and that nothing survives. Their own works have not come down to us, so we know them mainly through the accounts of their critics.',
    }),
    sl('check', 'Quick check: who held what', {
      b: 'Match each teacher or group with the position attributed to it.',
      chk: 'mt_thinkers',
      n: 'Match each name with the idea described in your notes.',
    }),
    sl('concept', 'Mahavira and Jaina ideas', {
      b: 'Central ideas: an **animated world**, **ahimsa**, **karma**, and release through **renunciation**.',
      v: vJaina,
      n: 'Mahavira, also called Vardhamana, is regarded as the twenty fourth tirthankara. Jaina teaching holds that the whole world is animated, so non injury to all living beings, ahimsa, is central. Karma shapes rebirth, and freedom comes through renunciation and penance. Monks follow five vows: not to kill, steal or lie, to own no property and to observe celibacy. Jaina ideas spread to many parts of India.',
    }),
    sl('example', 'Worked example 1: planning a 5-mark answer', {
      b: 'Question: *Describe the main teachings of Jainism.*',
      bl: [
        'Step 1 — One headed point for each mark.',
        'Step 2 — Start with the **animated world** and **ahimsa**.',
        'Step 3 — Add **karma, rebirth** and release through **renunciation**.',
        'Step 4 — Close with the **five vows** and the **spread** of Jainism.',
      ],
      v: vPlanJaina,
      n: 'To plan a five mark answer on Jaina teaching, give one headed point for each mark. First, the world is animated. Second, ahimsa, non injury to every living being. Third, karma and rebirth. Fourth, release through renunciation and penance, with the five vows for monks. Fifth, the spread of Jainism and its texts. Keep each point to about twenty words.',
    }),
    sl('concept', 'The Buddha: his life', {
      b: 'Siddhartha of the **Shakya** clan left home and became the Buddha. Key places: **Bodh Gaya**, **Sarnath**, **Kusinagara**.',
      v: vLife,
      n: 'Siddhartha, of the Shakya clan, left home after seeing old age, sickness, death and a renouncer. He attained enlightenment at Bodh Gaya and preached his first sermon at Sarnath. He passed away, an event called the mahaparinibbana, at Kusinagara. We know of his life mainly from Buddhist texts composed after his death.',
    }),
    sl('concept', 'The Buddha: his teachings', {
      b: 'The world is **transient** and **soulless**; **sorrow** is part of life; follow the **middle path**.',
      v: vTeach,
      n: 'The Sutta Pitaka describes the world as transient, anicca, and without a permanent soul, anatta. Sorrow, dukkha, is part of existence. The Buddha taught a middle path between severe penance and self indulgence. He said social institutions were created by humans, not by divine will. Release from rebirth, nibbana, comes through individual effort and right action.',
    }),
    sl('concept', 'The sangha', {
      b: 'An organisation of **monks** and later **nuns**. Within it, all were regarded as **equal**.',
      v: vSangha,
      n: 'The sangha was an organisation of monks, bhikkhus, and later of nuns, bhikkhunis. Mahapajapati Gotami, the foster mother of the Buddha, was the first woman ordained, after Ananda persuaded the Buddha. Within the sangha all were regarded as equal. Followers came from many groups, including kings, wealthy men, householders, workers, slaves and craftspeople. The Therigatha preserves verses composed by bhikkhunis.',
    }),
    sl('check', 'Quick check: the first nun', {
      b: 'Who was the first woman to be ordained as a bhikkhuni?',
      chk: 'm_first_nun',
      n: 'Remember the foster mother of the Buddha.',
    }),
    sl('example', 'Worked example 2: reading a chronicle with care', {
      b: 'A chronicle written in Sri Lanka tells of the arrival of the Buddha\'s teaching. How do you use it?',
      bl: [
        'Step 1 — Ask **who wrote it, and when**.',
        'Step 2 — Note **what it claims** and **for whom**.',
        'Step 3 — Look for **other evidence** that agrees.',
        'Step 4 — State what can **safely** be concluded.',
      ],
      v: vChronicle,
      n: 'Chronicles such as the Dipavamsa and Mahavamsa were composed in Sri Lanka. To use one with care, ask who wrote it and when, and for whom. Note what it claims, and what other evidence supports the claim. Then state what can safely be concluded. A chronicle written long after an event may record memory and belief, not only fact.',
    }),
    sl('concept', 'Texts and the spread of Buddhism', {
      b: 'The **Tipitaka** has three collections. Buddhism spread **beyond India**.',
      v: vTexts,
      n: 'The Tipitaka has three collections. The Vinaya Pitaka holds rules for the sangha. The Sutta Pitaka holds teachings. The Abhidhamma Pitaka deals with philosophy. They were compiled after the death of the Buddha. Buddhism spread to Sri Lanka, Central Asia, China, Korea, Japan and Southeast Asia.',
    }),
    sl('example', 'Worked example 3: weighing a claim', {
      b: 'Claim: *Women and men stood equal in the sangha.* Weigh it.',
      bl: [
        'Step 1 — **For:** all members were regarded as equal; women were ordained.',
        'Step 2 — **Limit:** the first woman was admitted after Ananda persuaded the Buddha.',
        'Step 3 — Note that our texts were **compiled later**.',
        'Step 4 — Conclude: a **real place**, but **full equality is not shown**.',
      ],
      v: vEqual,
      n: 'Weigh the claim that women and men stood equal in the sangha. For it: all members were regarded as equal, and women were ordained, with verses by bhikkhunis in the Therigatha. Limits: the first woman was admitted only after Ananda persuaded the Buddha, and our texts were compiled later. Conclude that women had a real place, but the evidence does not show full equality.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Sanchi survived because its care was taken up by the Begums of Bhopal, while Amaravati was dismantled. Around 600 BCE, thinkers asked new questions, and the worth of sacrifices was debated. Mahavira stressed ahimsa. The Buddha taught the middle path and individual effort, and the sangha welcomed people from many groups. The Tipitaka records his teaching.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Sanchi stayed in place; **Amaravati** was dismantled.',
        'The **Therigatha** preserves verses by **bhikkhunis**.',
        'Describe each tradition in **its own terms**.',
        'Keep the three **Pitakas** apart.',
        'In source questions, separate what a text **says** from what it **shows**.',
      ],
      v: vTips1,
      n: 'Tips. Sanchi is near Bhopal, and Amaravati was the stupa that was dismantled. Describe each tradition in its own terms and never judge one faith against another. Name the Pitakas correctly. Remember that the Therigatha preserves verses by bhikkhunis. In source questions, separate what a text says from what it can show.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Thinkers, Beliefs and Buildings — Part 2: Stupas, Sculpture, New Traditions and Temples',
  goals: [
    'Explain why and how stupas were built and who paid for them',
    'Interpret the sculpture of Sanchi and recognise debated readings',
    'Describe Mahayana Buddhism, Vaishnavism, Shaivism and early temples',
    'Use sculpture and architecture as sources with proper caution',
  ],
  slides: [
    sl('title', 'Stupas, Sculpture and Temples', {
      b: 'Part 2: **stupas**, their **sculpture**, **new traditions** and early **temples**.',
      v: vRoute2,
      n: 'In this part we study stupas, the buildings that made Sanchi famous. We see why they were built, how they were planned, and who paid for them. Then we learn how historians read their sculpture, and how Mahayana Buddhism, Puranic traditions and early temples arose. We end with sculpture and architecture as sources.',
    }),
    sl('diagram', 'A long span of centuries', {
      v: vSpan,
      n: 'Here is a long span. Around 600 BCE, ideas were in ferment. In the time of Ashoka the Great Stupa at Sanchi had its beginnings. Around the first century CE, Buddha images began at Mathura and Taxila. By about the fifth century CE the Dashavatara temple stood at Deogarh, and in the eighth century the Kailashnatha temple was carved at Ellora.',
    }),
    sl('concept', 'Relics and stupas', {
      b: 'A stupa is a **mound over relics**. The **Ashokavadana** says Ashoka ordered stupas in important towns.',
      v: vRelic,
      n: 'A stupa is a mound raised over relics, which may be bodily remains such as bones or ashes, or objects used by the Buddha. Such places were venerated. A text called the Ashokavadana says that Ashoka divided the relics and ordered stupas built over them in important towns. Bharhut, Sanchi and Amaravati are among the major stupas.',
    }),
    sl('diagram', 'The parts of a stupa', {
      v: vStupa,
      n: 'Look at the parts. The anda is the hemispherical mound. On top is the harmika, a balcony like structure regarded as the abode of the gods, and from it rises the yashti, a mast, carrying a chhatri, an umbrella. A railing, the vedika, separates the sacred space, and toranas, or gateways, give entry. Devotees walk round the stupa clockwise.',
    }),
    sl('check', 'Quick check: what lies inside', {
      b: 'What was usually placed inside the mound of an early Buddhist stupa?',
      chk: 'm_relic',
      n: 'Think of why such mounds were venerated.',
    }),
    sl('diagram', 'A stupa seen from above', {
      v: vPlan,
      n: 'This is a plan from above, not a map. The mound is the large inner circle, with the harmika at its centre. A railing circles it, with four gateways facing four directions, as at Sanchi. The path between the mound and the railing is where devotees walk round, in pradakshina. Reading plans helps us imagine how worshippers moved.',
    }),
    sl('concept', 'Who paid for stupas?', {
      b: 'Inscriptions name **many donors**, from kings to ordinary women and men.',
      v: vDonor,
      n: 'Inscriptions on railings and gateways record who paid. Donors included kings, such as the Satavahanas, guilds, merchants, ordinary women and men, and bhikkhus and bhikkhunis. One gateway at Sanchi was the gift of ivory workers. So stupas were built by many hands, not by rulers alone, and the records are a precious source on ordinary people.',
    }),
    sl('example', 'Worked example 1: reading a plan', {
      b: 'You are given a plan of a stupa. How do you turn it into evidence?',
      bl: [
        'Step 1 — Find the **mound** and the **harmika**.',
        'Step 2 — Find the **railing** around it.',
        'Step 3 — Count the **gateways** and note their directions.',
        'Step 4 — Trace the **path for walking round**.',
      ],
      v: vReadPlan,
      n: 'To read a plan, work from the centre outwards. First find the mound and the harmika. Then find the railing around it. Next, locate the gateways and note how many there are and which way they face. Finally trace the path for walking round. Each step turns a drawing into evidence about how the stupa was used.',
    }),
    sl('concept', 'Symbols for the Buddha', {
      b: 'Early sculptors showed the Buddha through **symbols**, not a human figure.',
      v: vSymbols,
      n: 'Early sculptors at Sanchi did not show the Buddha in human form. They used symbols. An empty seat stands for meditation, a stupa for the mahaparinibbana, a wheel for the first sermon at Sarnath and a tree for enlightenment. Human images of the Buddha began to be made only from about the first century CE, at centres such as Mathura and Taxila.',
    }),
    sl('check', 'Quick check: reading symbols', {
      b: 'Match each symbol with what it stands for.',
      chk: 'mt_symbols',
      n: 'Think of the seat, the stupa, the wheel and the tree.',
    }),
    sl('concept', 'Stories in stone', {
      b: '**Jataka** scenes, the **shalabhanjika**, and **serpents and animals** fill the carvings.',
      v: vStories,
      n: 'Many carvings show stories. Scenes from the Jatakas, tales of the Buddha\'s earlier births, include the Vessantara Jataka on the northern gateway, which shows a prince known for giving. The shalabhanjika, a woman holding the branch of a tree, was considered auspicious and perhaps came from popular traditions. Serpents and animals also appear. Art historians use texts to identify scenes, but they must be cautious.',
    }),
    sl('concept', 'When readings differ', {
      b: 'Some images are **debated**. Say **who** reads an image **which way**.',
      v: vDebates,
      n: 'Readings can differ. A woman with lotuses and elephants sprinkling water is seen by some historians as Maya, the mother of the Buddha, and by others as Gajalakshmi, a goddess of good fortune. James Fergusson thought Sanchi was a centre of tree and serpent worship, but he had not consulted Buddhist texts. These debates show why sculpture must be read with care.',
    }),
    sl('concept', 'Mahayana Buddhism', {
      b: 'The Buddha as **saviour**, **Bodhisattvas**, and the worship of **images**.',
      v: vMahayana,
      n: 'From about the beginning of the Common Era, new ideas grew in Buddhism. The Buddha came to be seen as a saviour, and Bodhisattvas, compassionate beings who help others toward salvation, became important. Images of the Buddha began to be worshipped. Followers of this Mahayana path called the older tradition Hinayana, or lesser vehicle, but its own followers call it Theravada.',
    }),
    sl('check', 'Quick check: a name', {
      b: 'Why do many followers of the older tradition avoid the name Hinayana?',
      chk: 'm_theravada',
      n: 'Think about who first used the word.',
    }),
    sl('concept', 'Puranic Hinduism', {
      b: '**Vaishnavism** and **Shaivism** grew, and the **Puranas** were meant to be **read aloud**.',
      v: vPuranic,
      n: 'Puranic Hinduism grew in the same centuries. In Vaishnavism, Vishnu is the chief deity, and he is believed to have come to the world in ten avatars, including Varaha, Narasimha, Rama and Krishna. In Shaivism, Shiva is worshipped, often in the form of the linga. The Puranas, compiled by Brahmanas, many from about the middle of the first millennium CE, were in simple Sanskrit and meant to be read aloud.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: 'Question: *Describe the growth of new devotional traditions.*',
      bl: [
        'Step 1 — **Mahayana:** saviour and Bodhisattvas.',
        'Step 2 — **Images** of the Buddha begin.',
        'Step 3 — **Vaishnavism** and **Shaivism**.',
        'Step 4 — The **Puranas**, read aloud in simple Sanskrit.',
      ],
      v: vPlanNew,
      n: 'Plan this five mark answer with five headed points. One, Mahayana ideas of the Buddha as saviour and of Bodhisattvas. Two, the start of Buddha images. Three, Vaishnavism and avatars. Four, Shaivism and the linga. Five, the Puranas, read aloud in simple Sanskrit. Aim for about twenty words a point.',
    }),
    sl('diagram', 'Early and later temples', {
      v: vTemple,
      n: 'Early temples were small square rooms, the garbhagriha, with a single doorway. Later a tall shikhara was built over the central shrine, and the walls were carved. The drawings are schematic, not to scale. Notice how the later temple draws the eye upwards, while the early plan shows a simple room entered through a porch.',
    }),
    sl('concept', 'Temples and rock-cut shrines', {
      b: 'Examples: **Deogarh**, the **Barabar caves**, and **Ellora**.',
      v: vTemples,
      n: 'Examples show the range. The Dashavatara temple at Deogarh in Uttar Pradesh dates from about the fifth century CE. Some early shrines were cut into rock: the Barabar caves in Bihar were excavated for the Ajivikas in the time of Ashoka. Later, in the eighth century CE, the Kailashnatha temple at Ellora was carved out of a single rock.',
    }),
    sl('example', 'Worked example 3: judging a judgement', {
      b: 'A nineteenth-century writer calls a many-armed image strange. What do you make of this?',
      bl: [
        'Step 1 — Note the writer\'s **standard**: Greek art.',
        'Step 2 — Ask what the image **meant to its makers**.',
        'Step 3 — Recall that Gandhara work was **valued** for resembling Greek work.',
        'Step 4 — Conclude: the judgement tells us about the **writer**, not only the image.',
      ],
      v: vBias,
      n: 'Nineteenth century European scholars often judged Indian sculpture against Greek art. Images with many arms or heads seemed strange to them, while Gandhara sculpture was valued because it resembled Greek work. Partha Mitter has studied these attitudes. A careful historian asks what an image meant to those who made and worshipped it, rather than whether it matched a foreign standard.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Stupas were raised over relics and had a mound, harmika, mast, railing and gateways. Many kinds of donors paid for them. Early sculptors used symbols, and some readings of sculpture are debated. Mahayana, Vaishnavism and Shaivism grew, with the Puranas read aloud. Early temples began as small shrine rooms and later gained towers, and some shrines were cut from rock.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Early sculptors used **symbols**, not a human Buddha.',
        'The **Barabar caves** were cut for the **Ajivikas**.',
        'Present debated readings as **debates**.',
        '**Many donors** paid for stupas.',
        'Describe every tradition **respectfully** and factually.',
      ],
      v: vTips2,
      n: 'Some tips. Early sculptors used symbols, not a human figure of the Buddha. The Barabar caves were cut for the Ajivikas. Present debated readings as debates, saying who reads an image which way. Remember that many donors paid for stupas. And describe every tradition respectfully and factually, as a historian would.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Thinkers, Beliefs and Buildings — Notes',
  sections: [
    {
      h: '1. Sanchi: discovery and preservation',
      t: 1,
      b: '**Sanchi** is near **Bhopal** in present-day Madhya Pradesh. Its **Great Stupa** goes back to **Ashoka\'s time** and was enlarged afterwards. In the nineteenth century Europeans were keenly interested: the **French** asked **Shahjehan Begum** for the eastern gateway and the **English** wanted one too. Both accepted **plaster-cast copies**, and the originals stayed.\n\nThe rulers of Bhopal, Shahjehan Begum and **Sultan Jehan Begum**, paid for preservation. Sultan Jehan Begum financed a **museum**, a **guesthouse** where **John Marshall** lived and wrote, and the printing of his volumes. Sanchi became a **UNESCO World Heritage site** in 1989.\n\n**Contrast:** the stupa at **Amaravati** (Andhra Pradesh) was taken apart in the nineteenth century and its sculptures went to Calcutta, Madras and London. **H. H. Cole** argued for casts rather than removal.',
      terms: [
        ['Plaster cast', 'A copy of a carving made in plaster, which leaves the original in place.'],
        ['World Heritage site', 'A place recognised by UNESCO as having value for all humanity.'],
      ],
      v: vGateway,
      vs: [vSanchiAmaravati],
    },
    {
      h: '2. The age of ferment: sacrifices and debates',
      t: 1,
      b: 'Around **600 BCE** thinkers in several lands asked fresh questions: Zarathustra (Iran), Kong Zi (China), Socrates, Plato and Aristotle (Greece), Mahavira and the Buddha (India).\n\n**Vedic tradition:** the **Rigveda** (compiled about 1500 to 1000 BCE) has hymns to **Agni, Indra and Soma**. Sacrifices began as **household** affairs; later chiefs and kings held great ones such as the **rajasuya** and **ashvamedha**, with **Brahmana** priests. The **Upanishads** (from about the sixth century BCE) asked about life, death, the **atman** and **brahman**.\n\n**Debates:** teachers travelled and argued in a **kutagarashala** (a hut with a pointed roof) or in groves. Other teachers: **Makkhali Gosala** (the Ajivikas), who held that everything is fixed in advance, and **Ajita Kesakambalin**, who held that nothing survives death. We know them mostly through their critics.',
      terms: [
        ['Kutagarashala', 'A hut with a pointed roof, one of the places where debates were held.'],
        ['Ajivikas', 'Followers of Makkhali Gosala, who held that everything is fixed in advance.'],
      ],
      v: vSacrifice,
      vs: [vFerment, vDebate, vVoices],
    },
    {
      h: '3. The Buddha and his teachings',
      t: 2,
      b: '**Siddhartha** of the **Shakya** clan left home after seeing old age, sickness, death and a renouncer. **Bodh Gaya:** enlightenment. **Sarnath:** first sermon. **Kusinagara:** passing away (**mahaparinibbana**).\n\n**Teachings (Sutta Pitaka):** the world is **transient (anicca)** and **soulless (anatta)**; **sorrow (dukkha)** is part of existence; follow the **middle path** between severe penance and self-indulgence; social institutions are human creations; **nibbana** comes through individual effort and right action.\n\n**Texts:** the **Tipitaka** (Vinaya: rules for the sangha; Sutta: teachings; Abhidhamma: philosophy) was compiled after his death. The **Dipavamsa** and **Mahavamsa** are later chronicles from Sri Lanka.',
      terms: [
        ['Middle path', 'The way between severe penance and a life of self-indulgence.'],
        ['Tipitaka', 'The three collections of Buddhist texts: Vinaya, Sutta and Abhidhamma.'],
      ],
      v: vLife,
      vs: [vTeach, vTexts],
    },
    {
      h: '4. The sangha, Jaina ideas and the spread of Buddhism',
      t: 2,
      b: '**Sangha:** an organisation of **monks (bhikkhus)** and later **nuns (bhikkhunis)**. **Mahapajapati Gotami**, the Buddha\'s foster mother, was the first woman ordained, after **Ananda** spoke for her. Within the sangha all were regarded as **equal**; followers included kings, wealthy men, householders, workers, slaves and craftspeople. The **Therigatha** preserves verses by bhikkhunis.\n\n**Jainism:** **Mahavira** (Vardhamana) is regarded as the **24th tirthankara**. The whole world is animated, so **ahimsa** is central; **karma** and rebirth; release through renunciation and penance. Monks take **five vows**: not to kill, steal or lie, to own no property, and celibacy. Jaina texts were written in Prakrit, Sanskrit and Tamil.\n\n**Spread:** Buddhism reached Sri Lanka, Central Asia, China, Korea, Japan and Southeast Asia.',
      terms: [
        ['Sangha', 'The community of Buddhist monks and nuns.'],
        ['Ahimsa', 'Non-injury to living beings, central to Jaina teaching.'],
      ],
      v: vSangha,
      vs: [vJaina, vEqual],
    },
    {
      h: '5. Stupas: why and how they were built',
      t: 3,
      b: 'A **stupa** is a mound raised over **relics**: bodily remains such as bones or ashes, or objects used by the Buddha. The **Ashokavadana** says that Ashoka divided relics and ordered stupas in important towns. Major stupas: **Bharhut, Sanchi, Amaravati**.\n\n**Parts:** **anda** (hemispherical mound); **harmika** (balcony-like structure, the abode of the gods); **yashti** (mast) with a **chhatri** (umbrella); **vedika** (railing) around the sacred space; **toranas** (gateways), richly carved at Sanchi, which has four. Devotees walked round clockwise: **pradakshina**.\n\n**Donors:** inscriptions record gifts from kings such as the Satavahanas, guilds (ivory workers gave a gateway at Sanchi), merchants, ordinary women and men, and bhikkhus and bhikkhunis.',
      terms: [
        ['Relic', 'A bodily remain, or an object used by a revered person, kept as sacred.'],
        ['Pradakshina', 'Walking round a sacred object in a clockwise direction.'],
      ],
      v: vStupa,
      vs: [vPlan, vRelic, vDonor],
    },
    {
      h: '6. Reading the sculpture of stupas',
      t: [3, 5],
      b: '**Symbols:** early sculptors showed the Buddha by an **empty seat** (meditation), a **stupa** (mahaparinibbana), a **wheel** (first sermon) and a **tree** (enlightenment). Human images began from about the first century CE.\n\n**Carvings:** **Jataka** scenes (for example the Vessantara Jataka on the northern gateway), the **shalabhanjika** (a woman holding a branch, perhaps from popular traditions), serpents and animals.\n\n**Debates:** a woman with lotuses and elephants is read as **Maya** by some and **Gajalakshmi** by others. **James Fergusson** thought Sanchi a centre of tree and serpent worship without consulting Buddhist texts. Art historians use texts to identify scenes, but with caution.\n\n**Judging images:** nineteenth-century European scholars often compared Indian sculpture with Greek art; many-armed images seemed strange to them, and Gandhara work was valued for its likeness to Greek work (Partha Mitter has studied these attitudes).',
      terms: [
        ['Jataka', 'A story of an earlier birth of the Buddha.'],
        ['Shalabhanjika', 'A woman holding the branch of a tree, regarded as auspicious.'],
      ],
      v: vSymbols,
      vs: [vStories, vDebates, vBias],
    },
    {
      h: '7. New traditions and early temples',
      t: [4, 5],
      b: '**Mahayana:** from about the beginning of the Common Era the Buddha came to be seen as a **saviour** and **Bodhisattvas** became important; Buddha **images** began (Mathura, Taxila). Its followers called the older tradition **Hinayana**; it is called **Theravada** by its followers.\n\n**Puranic Hinduism:** **Vaishnavism** (Vishnu; ten **avatars**, such as Varaha, Narasimha, Rama and Krishna) and **Shaivism** (Shiva, often as the **linga**). The **Puranas**, compiled by Brahmanas, many from about the middle of the first millennium CE, used simple Sanskrit and were read aloud to all.\n\n**Temples:** early ones were small square rooms (**garbhagriha**) with one doorway; later a tall **shikhara** rose over the shrine and walls were carved. **Deogarh** (Dashavatara temple, about the fifth century CE); rock-cut: **Barabar caves** (for the Ajivikas, Ashoka\'s time) and the **Kailashnatha** temple at **Ellora** (eighth century CE, one rock).',
      terms: [
        ['Bodhisattva', 'A compassionate being who helps others to reach salvation.'],
        ['Garbhagriha', 'The small square shrine room of an early temple.'],
      ],
      v: vTemple,
      vs: [vMahayana, vPuranic, vTemples],
    },
  ],
  tips: '**Common mistakes**\n- Writing that Sanchi was dismantled (that was Amaravati), or that the French and English took gateways away.\n- Showing the Buddha in human form in early Sanchi sculpture.\n- Saying the Barabar caves were Jaina, or mixing up the three Pitakas.\n- Stating a debated reading (Maya or Gajalakshmi, the Mahabalipuram relief) as settled fact.\n- Writing that kings alone paid for stupas, or judging one faith against another.\n- In source questions, copying a sentence when asked to infer.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); assessment questions need evidence on more than one side and a judgement.\n- Source questions (4 marks): parts (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Where is Sanchi?', 'Near **Bhopal**, Madhya Pradesh; Great Stupa from **Ashoka\'s time**, enlarged later.', 'fact', 1],
  ['What happened to the Sanchi gateway requests?', 'French and English both wanted one; **plaster casts** were made; originals stayed.', 'fact', 1],
  ['Who helped to preserve Sanchi?', '**Shahjehan Begum** and **Sultan Jehan Begum** of Bhopal; museum, guesthouse, Marshall\'s volumes.', 'fact', 1],
  ['Sanchi versus Amaravati', 'Sanchi stayed in place; **Amaravati** was dismantled, sculptures to Calcutta, Madras, London.', 'concept', 1],
  ['World Heritage listing of Sanchi', '**1989**.', 'fact', 1],
  ['Rigveda: dates and gods', 'Compiled about **1500 to 1000 BCE**; hymns to **Agni, Indra and Soma**.', 'fact', 1],
  ['Rajasuya and ashvamedha', 'Large sacrifices performed by **chiefs and kings** with Brahmana priests.', 'definition', 1],
  ['**Upanishads**', 'From about the sixth century BCE; questions about life, death, **atman** and **brahman**.', 'definition', 1],
  ['**Kutagarashala**', 'A hut with a pointed roof where debates were held.', 'definition', 1],
  ['Makkhali Gosala and Ajita Kesakambalin', 'Gosala (Ajivikas): everything fixed in advance. Ajita: nothing survives death. Known through critics.', 'concept', 1],
  ['Mahavira', 'Regarded as the **24th tirthankara**; ahimsa, karma, renunciation.', 'fact', 2],
  ['Five vows of a Jaina monk', 'Not to kill, steal or lie; to own no property; celibacy.', 'fact', 2],
  ['**Ahimsa**', 'Non-injury to living beings, central in Jaina teaching because the world is animated.', 'definition', 2],
  ['Places in the Buddha\'s life', 'Enlightenment **Bodh Gaya**; first sermon **Sarnath**; passing away **Kusinagara**.', 'fact', 2],
  ['**Anicca, anatta, dukkha**', 'Transient world; no permanent soul; sorrow intrinsic to existence.', 'definition', 2],
  ['The **middle path**', 'Between severe penance and self-indulgence.', 'definition', 2],
  ['Buddha on social institutions', 'Created by **humans**, not by divine will; stress on individual effort.', 'concept', 2],
  ['The **sangha**', 'Community of monks (bhikkhus) and nuns (bhikkhunis); members regarded as equal.', 'definition', 2],
  ['First woman ordained', '**Mahapajapati Gotami**, after **Ananda** persuaded the Buddha.', 'fact', 2],
  ['The Tipitaka', '**Vinaya** (rules), **Sutta** (teachings), **Abhidhamma** (philosophy); compiled after his death.', 'fact', 2],
  ['Therigatha', 'Verses composed by **bhikkhunis**; part of the Sutta Pitaka.', 'fact', 2],
  ['What is a stupa?', 'A mound raised over **relics** of the Buddha; a venerated site.', 'definition', 3],
  ['Parts of a stupa', '**Anda**, **harmika**, **yashti** with **chhatri**, **vedika**, **toranas**.', 'fact', 3],
  ['Pradakshina', 'Walking round the stupa **clockwise**.', 'definition', 3],
  ['Donors at stupas', 'Kings (Satavahanas), guilds, merchants, ordinary women and men, bhikkhus, bhikkhunis.', 'fact', 3],
  ['Early symbols for the Buddha', 'Empty seat, stupa, wheel, tree: meditation, passing away, first sermon, enlightenment.', 'concept', 3],
  ['Shalabhanjika', 'A woman holding a tree branch; auspicious; perhaps from popular traditions.', 'definition', 3],
  ['Maya or Gajalakshmi?', 'A debated reading of the woman with lotuses and elephants; present it as a **debate**.', 'exam-tip', 3],
  ['Mahayana', 'Buddha as saviour; **Bodhisattvas**; image worship from about the first century CE.', 'fact', 4],
  ['Hinayana and Theravada', 'Hinayana was Mahayana\'s word; the older tradition calls itself **Theravada**.', 'concept', 4],
  ['Vaishnavism and Shaivism', 'Vishnu with ten **avatars**; Shiva, often as the **linga**.', 'fact', 4],
  ['Early temples', '**Garbhagriha** with one doorway; later a **shikhara**; Deogarh about the fifth century CE.', 'fact', 4],
  ['Reading sculpture with care', 'Use texts but expect debate; do not judge by a foreign standard such as Greek art.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Thinkers, Beliefs and Buildings',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_survive', 'm_reject', 'm_vaishnava', 'ar_donors'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_sangha', 's2_relief', 's3_puranas'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_vedic', 'l_stupa'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_panel'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Thinkers, Beliefs and Buildings',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_sanchi_loc', 'm_sultan', 'm_jain_vows', 'm_sangha_equal', 'm_spread_ev', 'm_stupa_shape', 'm_maya', 'm_temple_dev', 'ar_therigatha', 'ar_gandhara'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_gateways', 's2_king', { attempt: 1, keys: ['s2_avatar', 's2_appeal'] }, 's3_teachings', { attempt: 1, keys: ['s3_readings', 's3_extremes'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_survival', { attempt: 1, keys: ['l_sculpture', 'l_temples'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_diary', 'sb_letter'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch04 only (Sanchi and the background of sacrifices and debates; the Buddha, Jaina ideas and the spread of Buddhism; stupas and their sculpture; Mahayana, Puranic traditions and temples; source-based practice)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; no NCERT text, source box, caption, map or exercise and no board or sample-paper item reused (D-036); no verse of any scripture quoted or translated; no quotation of any real person',
    facts: `${SPAN.map(([y, t]) => `${yearLabel(y)} ${t.replace(/ \| /g, ' ')}`).join('; ')}; Rigveda about 1500–1000 BCE; Sanchi World Heritage 1989; five vows of a Jaina monk; ten avatars in tradition; no maps (OA-23)`,
    neutrality: 'every tradition described as a historian would, without judging one faith against another; readings of the woman with lotuses and elephants, the Mahabalipuram relief and the sculpture of Sanchi presented as debates',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
