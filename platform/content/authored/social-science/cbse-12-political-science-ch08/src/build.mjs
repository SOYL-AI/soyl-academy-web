// Build CBSE 12 Political Science ch08 Challenges of Nation-Building. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch08', 'social-science');
const { EVENTS, NEW_STATES } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
const vChallenges = (() => {
  const s = new Svg(660, 250);
  s.rect(220, 14, 220, 50, { color: 'accent', sw: 2 });
  s.text(330, 39, 'India in 1947', { bold: true });
  const boxes = [
    [20, 'Unity', 'One nation, many', 'languages and faiths'],
    [240, 'Democracy', 'Constitution, rights,', 'a vote for every adult'],
    [460, 'Development', 'Well-being of the', 'whole society'],
  ];
  for (const [x, h, a, b] of boxes) {
    s.arrow(330, 64, x + 90, 120, { sw: 1.6, color: 'muted' });
    s.rect(x, 122, 180, 96, { sw: 1.6 });
    s.text(x + 90, 148, h, { bold: true });
    s.text(x + 90, 176, a, { size: 13 });
    s.text(x + 90, 196, b, { size: 13 });
  }
  return s.visual('Diagram: India in 1947 at the top, with arrows to three challenges: unity (one nation with many languages and faiths), democracy (a Constitution, rights and a vote for every adult) and development (the well-being of the whole society)', 'Three challenges of nation-building');
})();

function timeline(items, alt, caption, y0, y1, step) {
  // Four label lanes (far above, near below, near above, far below) so neighbouring labels never collide.
  const s = new Svg(680, 360);
  const AX = 180;
  const X = (y) => 70 + ((y - y0) / (y1 - y0)) * 540;
  s.arrow(40, AX, 650, AX, { sw: 1.8 });
  for (let yr = y0; yr <= y1; yr += step) {
    s.line(X(yr), AX - 6, X(yr), AX + 6, { sw: 1.2, color: 'muted' });
  }
  const LANES = [20, AX + 30, 92, AX + 102]; // y of the year label in each lane
  items.forEach(([yr, label], i) => {
    const top = LANES[i % 4];
    const above = top < AX;
    const lines = label.split(' | ');
    s.dot(X(yr), AX, 6, 'accent');
    s.line(X(yr), AX, X(yr), above ? top + 12 + lines.length * 18 : top - 12, { sw: 1.4, color: 'accent' });
    s.text(X(yr), top, String(yr), { bold: true, size: 13 });
    lines.forEach((ln, j) => s.text(X(yr), top + 18 + j * 18, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}
const SHORT = {
  'Independence and Partition (August)': 'Independence | and Partition',
  'Hyderabad joins India after police action (September)': 'Hyderabad | joins India',
  'Merger agreement for Manipur signed (September)': 'Manipur merger | agreement',
  'Andhra State formed (October)': 'Andhra State | formed',
  'States Reorganisation Act': 'States Reorganisation | Act',
  'Bombay State divided into Maharashtra and Gujarat': 'Maharashtra and | Gujarat',
};
const vEvents = timeline(
  EVENTS.map(([y, t]) => [y, SHORT[t]]),
  `Timeline from 1947 to 1960: ${EVENTS.map(([y, t]) => `${y}, ${t}`).join('; ')}`,
  'From Partition to the first linguistic states',
  1946, 1961, 1,
);
const NS_SHORT = { 'Maharashtra, Gujarat': 'Maharashtra, | Gujarat', Nagaland: 'Nagaland', 'Punjab, Haryana': 'Punjab, | Haryana', 'Meghalaya, Manipur, Tripura': 'Meghalaya, Manipur, | Tripura', 'Mizoram, Arunachal Pradesh': 'Mizoram, | Arunachal', 'Chhattisgarh, Uttarakhand, Jharkhand': 'Chhattisgarh, Uttara- | khand, Jharkhand', Telangana: 'Telangana' };
const vNewStates = timeline(
  NEW_STATES.map(([y, t]) => [y, NS_SHORT[t]]),
  `Timeline of new states after 1956: ${NEW_STATES.map(([y, t]) => `${y}, ${t}`).join('; ')}`,
  'The map keeps changing, through Parliament',
  1956, 2016, 10,
);

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Three challenges', 'Partition: the basis', 'Problems in drawing the line', 'Human consequences', 'A secular choice'], 'Route map of Part 1: the three challenges, the basis of Partition, problems in drawing the line, human consequences, and the choice of a secular state', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['565 princely states', 'Instrument of Accession', 'Difficult cases', 'Linguistic demand', '1956 and after'], 'Route map of Part 2: the princely states, the Instrument of Accession, difficult cases, the linguistic demand, and reorganisation in 1956 and after', 'Part 2 at a glance');
const vProblems = table(
  ['Problem in drawing the line', 'What it meant'],
  [
    ['No single Muslim-majority belt', 'Two zones, so Pakistan had a western and an eastern wing'],
    ['Not every Muslim-majority area wanted Pakistan', 'The North-West Frontier Province leader opposed it, but was overruled'],
    ['Punjab and Bengal were mixed', 'The provinces were split district by district'],
    ['Minorities on both sides', 'Millions were left on the "wrong" side of the line'],
  ],
  'Table of four problems in drawing the Partition line: no single Muslim-majority belt, opposition in the North-West Frontier Province, the mixed populations of Punjab and Bengal, and minorities left on both sides',
);
const vConsequences = flow('TB', ['A new border drawn in weeks', 'Fear among minorities on both sides', 'Forced migration on a huge scale', 'Violence, loss of life, families divided', 'Refugees to be resettled by both governments'], 'Flow of the human consequences of Partition: a new border drawn in weeks, fear among minorities, forced migration, violence and divided families, and refugees to be resettled', 'People of every community suffered');
const vTwoWings = table(
  ['Part of the new country', 'Where', 'Later'],
  [
    ['West Pakistan', 'North-west of the subcontinent', 'Pakistan'],
    ['East Pakistan', 'East, beyond Indian territory', 'Bangladesh (1971)'],
  ],
  'Table: West Pakistan in the north-west, which is today\'s Pakistan, and East Pakistan in the east, beyond Indian territory, which became Bangladesh in 1971',
  'Two wings, separated by India',
);
const vSecular = table(
  ['Question', 'India\'s answer'],
  [
    ['Does citizenship depend on religion?', 'No: every citizen has equal rights'],
    ['Does the state have an official religion?', 'No: it treats all faiths equally'],
    ['What about minorities who stayed?', 'Full citizens, with rights protected by the Constitution'],
  ],
  'Table of India\'s secular choice: citizenship does not depend on religion, the state has no official religion, and minorities who stayed are full citizens with protected rights',
);
const vAnswer5 = table(
  ['Mark', 'What to write (about 20 words each)'],
  [
    ['1', 'Unity: one nation with diversity'],
    ['2', 'Democracy: Constitution, rights, adult franchise'],
    ['3', 'Development: welfare of all'],
    ['4', 'Context of 1947: Partition, refugees, 565 states'],
    ['5', 'Your judgement, with a reason'],
  ],
  'Table planning a 5-mark answer: one point each on unity, democracy, development, the context of 1947, and a reasoned judgement',
  'Five headed points earn five marks',
);
const vReadSource = flow('LR', ['Read the heading: who, where, when', 'Spot the event in the background', 'Quote the exact line for "which line" parts', 'Name the concept, then explain it'], 'Flow for answering a source question: read the heading, spot the event in the background, quote the exact line, then name and explain the concept', 'Four steps for a source question');
const vStates = table(
  ['Choice in 1947', 'In law', 'In practice'],
  [
    ['Join India', 'Allowed', 'Almost all rulers did so before 15 August'],
    ['Join Pakistan', 'Allowed', 'A few states in or next to Pakistan'],
    ['Stay independent', 'Allowed once paramountcy lapsed', 'Not accepted by India for states within its territory'],
  ],
  'Table of the choices before princely rulers in 1947: joining India, joining Pakistan or staying independent; legally all were allowed, but in practice almost all joined India',
);
const vApproach = flow('LR', ['People of the states wish to join India', 'Persuade and negotiate with rulers', 'Firm on defence, foreign affairs, communications', 'Flexible on local autonomy'], 'Flow of the government\'s approach: the people wish to join India, so negotiate with rulers, be firm on defence, foreign affairs and communications, and be flexible on local autonomy', 'Persuasion with firmness');
const vCases = table(
  ['State', 'What happened', 'Year'],
  [
    ['Junagadh', 'Ruler announced accession to Pakistan; plebiscite chose India', '1948'],
    ['Hyderabad', 'Nizam sought independence; police action; joined India', '1948'],
    ['Manipur', 'Elected assembly in 1948; merger signed without consulting it', '1949'],
    ['Kashmir', 'Ruler signed accession after raiders entered (see Chapter 14)', '1947'],
  ],
  'Table of four difficult cases: Junagadh joined India after a plebiscite in 1948; Hyderabad joined after police action in 1948; Manipur\'s merger in 1949 was signed without consulting its elected assembly; Kashmir\'s ruler signed accession in 1947, studied in Chapter 14',
);
const vLingCase = table(
  ['For linguistic states', 'Early fears'],
  [
    ['Government, courts and schools in the people\'s language', 'Might encourage separatism after Partition'],
    ['Wider participation in politics', 'Might distract from refugees and development'],
    ['Recognises regional identity', 'Disputes over mixed border areas and cities'],
  ],
  'Two-column table: arguments for linguistic states (government in the people\'s language, wider participation, recognising identity) and the early fears (separatism, distraction from other tasks, disputes over border areas and cities)',
);
const vAndhra = flow('LR', ['Demand for a Telugu-speaking state', 'Potti Sriramulu\'s fast; death, December 1952', 'Protests across the region', 'Andhra State, October 1953', 'States Reorganisation Commission, 1953'], 'Flow of the Andhra movement: the demand for a Telugu-speaking state, Potti Sriramulu\'s fast and death in December 1952, protests, Andhra State in October 1953, and the States Reorganisation Commission in 1953', 'One movement, a national change');
const v1956 = table(
  ['Step', 'Result'],
  [
    ['States Reorganisation Commission (1953)', 'Recommended boundaries that reflect language'],
    ['States Reorganisation Act (1956)', '14 states and 6 union territories'],
    ['Bombay State divided (1960)', 'Maharashtra and Gujarat'],
  ],
  'Table: the States Reorganisation Commission of 1953 recommended boundaries reflecting language; the 1956 Act created 14 states and 6 union territories; Bombay State was divided into Maharashtra and Gujarat in 1960',
);
const vRecall = table(
  ['Clue', 'Answer'],
  [
    ['A document, three subjects to the Union', 'Instrument of Accession'],
    ['A fast in 1952', 'Potti Sriramulu, Andhra'],
    ['A plebiscite in 1948', 'Junagadh'],
    ['14 and 6', 'States and union territories in 1956'],
  ],
  'Recall table pairing clues with answers: the Instrument of Accession, Potti Sriramulu and Andhra, the Junagadh plebiscite, and 14 states and 6 union territories in 1956',
  'Clue, then answer',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Three challenges', 'Unity, democracy, development'],
    ['Basis of Partition', 'Two-nation theory; religious majorities'],
    ['Problems', 'Two wings; Frontier opposition; Punjab and Bengal split; minorities'],
    ['Consequences', 'Forced migration, violence, divided families'],
    ['India\'s choice', 'A secular state for all citizens'],
  ],
  'Summary table of Part 1: the three challenges, the basis of Partition, the problems in drawing the line, the consequences, and India\'s secular choice',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Princely states', 'About 565; paramountcy lapsed'],
    ['Method', 'Instrument of Accession; Patel and V. P. Menon'],
    ['Difficult cases', 'Junagadh, Hyderabad, Manipur, Kashmir'],
    ['Linguistic states', 'Andhra 1953; SRC 1953; Act 1956 (14 and 6)'],
    ['Result', 'Diversity accepted; unity strengthened'],
  ],
  'Summary table of Part 2: about 565 princely states, the Instrument of Accession, the difficult cases, linguistic reorganisation from 1953 to 1956, and the result',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Challenges of Nation-Building — Part 1: Three Challenges and Partition',
  goals: [
    'Explain the three challenges of unity, democracy and development that India faced in 1947',
    'Explain the basis of Partition and the problems in drawing the boundary',
    'Describe the human consequences of Partition factually',
    'Explain why India chose to be a secular state',
  ],
  slides: [
    sl('title', 'Challenges of Nation-Building', {
      b: 'Part 1 — the **three challenges** before the new nation and the experience of **Partition**.',
      v: vRoute1,
      n: 'At midnight on fifteenth August 1947, India became independent. It was a moment of joy, but also of great difficulty. The country was being divided, millions of people were on the move, and hundreds of princely states had to decide their future. In this part we look at the three big challenges before the new nation and at what Partition meant for ordinary people.',
    }),
    sl('diagram', 'Three challenges', {
      v: vChallenges,
      n: 'The leaders of the new nation faced three challenges. The first was unity: holding together a land of many languages, faiths and regions without forcing everyone to be the same. The second was democracy: running the country through a Constitution, with rights and a vote for every adult. The third was development: improving the lives of the whole society, especially the poor, and not just a few groups.',
    }),
    sl('check', 'Quick check: the three challenges', {
      b: 'Which set correctly lists the three broad challenges of 1947?',
      chk: 'm_three_challenges',
      n: 'Pick the option that names unity, democracy and development together.',
    }),
    sl('concept', 'Partition: the basis', {
      b: 'British India was divided into **India** and **Pakistan** on the basis of the **two-nation theory** put forward by the Muslim League: areas with a **Muslim majority** would form Pakistan.',
      v: vTwoWings,
      n: 'The demand for Pakistan rested on the two-nation theory, the claim that Hindus and Muslims were two separate nations. The plan was that areas with a Muslim majority would form Pakistan and the rest would remain India. That sounds simple, but drawing the actual line on the ground turned out to be extremely difficult, as the next slides show.',
    }),
    sl('diagram', 'Problems in drawing the line', {
      v: vProblems,
      n: 'There were four problems. First, the Muslim-majority areas were in two zones, so Pakistan had a western and an eastern wing. Second, not every Muslim-majority area wanted Pakistan; the leader of the North-West Frontier Province opposed it but was overruled. Third, Punjab and Bengal had large non-Muslim populations, so the provinces themselves were split. Fourth, millions of people became minorities overnight.',
    }),
    sl('check', 'Quick check: the Frontier Province', {
      b: 'The Frontier leader opposed Partition, yet the province joined Pakistan. What problem does this show?',
      chk: 'm_frontier',
      n: 'Ask yourself whether being a Muslim-majority area automatically meant wanting to join Pakistan.',
    }),
    sl('concept', 'Minorities on both sides', {
      b: 'Communities lived side by side almost everywhere. The new line left **Hindus and Sikhs** in what became Pakistan and **Muslims** in what remained India, often in large numbers.',
      bl: ['Many feared for their safety', 'Homes, land and shops could not be carried across', 'Families were split by the border'],
      v: vConsequences,
      n: 'Because people of different faiths lived side by side in villages and towns, no line could separate them neatly. Overnight, millions found themselves on the other side of a border from people they thought of as their own. Fear spread quickly. Many decided, or were forced, to leave homes that their families had lived in for generations.',
    }),
    sl('concept', 'The human cost', {
      b: 'Partition caused one of the **largest forced migrations** in history. People of **every community** suffered **violence**, loss of property and the breaking up of families; women were especially vulnerable.',
      bl: ['Estimates of deaths and of people displaced vary widely', 'Both governments had to resettle refugees', 'Memories of loss shaped families for generations'],
      n: 'The human cost of Partition was enormous. Millions crossed the new border in a few months, many on foot or in overcrowded trains. There was violence in which people of every community were victims. Historians give different estimates of how many died and how many were displaced, but all agree that the suffering was immense and that its memories have lasted for generations.',
    }),
    sl('two-column', 'Two governments, one task', {
      cols: ['**In India:** refugee camps, new colonies and land for those who arrived; rebuilding livelihoods.', '**In Pakistan:** the same tasks for those who arrived from India.'],
      v: vTwoWings,
      n: 'Both new governments faced the same urgent task: giving shelter, food and work to people who had lost everything. New colonies and towns grew around many cities. This was part of the challenge of development from the very first day. It also tested the promise of democracy, because the new citizens needed to feel that the state cared for them equally.',
    }),
    sl('concept', 'A secular choice', {
      b: 'Even after a Partition on religious lines, India chose to be a **secular state**: every citizen equal, whatever their faith.',
      v: vSecular,
      n: 'After so much violence in the name of religion, India\'s leaders could have built a state that favoured one faith. They chose the opposite. The Constitution makes every citizen equal, whatever their religion, and gives the state no official religion. Minorities who stayed in India were full citizens. This choice was a direct answer to the challenge of unity in a diverse society.',
    }),
    sl('check', 'Quick check: one wing or two?', {
      b: 'True or false? In 1947 Pakistan was a single territory to the west of India.',
      chk: 'tf_one_wing',
      n: 'Recall where the two Muslim-majority zones lay.',
    }),
    sl('example', 'Worked example 1: planning a 5-mark answer', {
      b: 'Question: *Explain the three challenges of nation-building. Which was the most difficult in 1947?*',
      bl: [
        'Step 1 — One headed point for **each challenge** (3 marks).',
        'Step 2 — One point on the **context of 1947**: Partition, refugees, princely states.',
        'Step 3 — A **judgement** with a reason; any well-argued choice can score.',
        'Step 4 — Keep to about 100 words; use headings.',
      ],
      v: vAnswer5,
      n: 'Here is how to plan a five-mark answer. Give one clear point for each of the three challenges. Add one point that sets the scene in 1947, mentioning Partition, refugees and the princely states. Finish with your own judgement and a reason. Examiners reward a reasoned choice, so you might argue that unity came first, because democracy and development depended on it.',
    }),
    sl('example', 'Worked example 2: reading a source', {
      b: 'A diary from a railway station in 1947 describes crowded trains arriving and leaving. How do you answer the questions on it?',
      bl: [
        'Step 1 — The **heading** gives place and date: Amritsar, 1947.',
        'Step 2 — The **event** in the background is Partition.',
        'Step 3 — For "which line" questions, **quote** the exact words.',
        'Step 4 — For "explain" questions, **name** the concept, then link it to the source.',
      ],
      v: vReadSource,
      n: 'Source questions follow a pattern. Start with the heading, which tells you who wrote it, where and when. Then work out the event in the background. If a part asks which line shows something, copy the exact words in quotation marks. If it asks you to explain, first name the idea from the chapter, such as forced migration, and then connect it to details in the source.',
    }),
    sl('check', 'Quick check: name the theory', {
      b: 'The idea that Hindus and Muslims formed two separate nations was called the ___ theory.',
      chk: 'fb_two_nation',
      n: 'This idea was the basis of the demand for Pakistan.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. The new nation faced three challenges: unity, democracy and development. Partition was based on the two-nation theory, but drawing the line raised four problems: two separate zones, opposition in the Frontier Province, divided Punjab and Bengal, and minorities on both sides. The result was forced migration and great suffering. India answered by choosing to be a secular state.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name **all three** challenges; many answers forget development.',
        'Give the **four problems** of drawing the line as separate points.',
        'Describe Partition violence **factually**, without blaming any community.',
        'Do not confuse **East Pakistan** (1947) with **Bangladesh** (1971).',
        'Source parts: **quote** for "which line", **name and explain** for the rest.',
      ],
      v: vProblems,
      n: 'A few tips. Always name all three challenges, because development is often forgotten. Learn the four problems of drawing the line as separate points; each can earn a mark. Write about Partition factually and humanely, without blaming any community. Remember that East Pakistan became Bangladesh only in 1971. And in source questions, quote exact lines when asked, and name the concept before explaining it.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Challenges of Nation-Building — Part 2: Princely States and Reorganisation',
  goals: [
    'Explain the problem of the princely states and how they were integrated',
    'Describe the difficult cases of Junagadh, Hyderabad and Manipur',
    'Explain the movement for linguistic states and the States Reorganisation Act of 1956',
    'Assess why linguistic reorganisation strengthened unity and democracy',
  ],
  slides: [
    sl('title', 'Princely States and Reorganisation', {
      b: 'Part 2 — how about **565 princely states** joined the Union, and how the map was **redrawn on linguistic lines**.',
      v: vRoute2,
      n: 'In Part 2 we look at two great tasks that shaped the map of India. First, the integration of about five hundred and sixty-five princely states, ruled by kings and nawabs under British supremacy. Second, the redrawing of state boundaries so that people could be governed in their own language. Both were tests of whether unity and diversity could go together.',
    }),
    sl('concept', 'The problem of the princely states', {
      b: 'When British rule ended, **paramountcy lapsed**. In law, each ruler could join India, join Pakistan or **stay independent**.',
      v: vStates,
      n: 'Under British rule, the princely states accepted British supremacy, called paramountcy. When the British left, that ended. In law, each ruler was free to join India, join Pakistan, or try to stay independent. The decision lay with the rulers, not the people. If many had chosen independence, India could have been broken into hundreds of pieces. That is why integration was so urgent.',
    }),
    sl('diagram', 'The government\'s approach', {
      v: vApproach,
      n: 'The government\'s approach had three parts. It believed that the people of most states wished to be part of India. It combined persuasion with firmness, negotiating patiently but making clear that the unity of the country was not negotiable. And it was flexible, allowing some areas a measure of local autonomy. Sardar Patel led this work, assisted by the senior official V. P. Menon.',
    }),
    sl('concept', 'The Instrument of Accession', {
      b: 'Rulers signed the **Instrument of Accession**, handing **defence, external affairs and communications** to the Union. Almost all signed **before 15 August 1947**.',
      v: vStates,
      n: 'The key document was the Instrument of Accession. By signing it, a ruler handed three subjects to the Union: defence, external affairs and communications. Almost every ruler signed before independence day. A few cases were harder. Let us look at them next, keeping to the facts of what happened in each.',
    }),
    sl('check', 'Quick check: the document', {
      b: 'The document by which a ruler joined the Union was called the …',
      chk: 'm_instrument',
      n: 'Think of the paper that handed defence, external affairs and communications to the Union.',
    }),
    sl('diagram', 'The difficult cases', {
      v: vCases,
      n: 'Four cases were difficult. In Junagadh the ruler announced accession to Pakistan, but a plebiscite in 1948 showed the people wished to join India. In Hyderabad the Nizam sought independence; after unrest, the state joined India following police action in September 1948. In Manipur the merger of 1949 was signed without consulting the elected assembly. Kashmir is studied in Chapter Fourteen.',
    }),
    sl('concept', 'Hyderabad', {
      b: 'The **Nizam** of Hyderabad, ruler of the largest princely state, wanted independence and signed only a **Standstill Agreement** (November 1947).',
      bl: ['A peasant movement in Telangana', 'Violence by an armed group, the Razakars', 'Police action in September 1948; Hyderabad joins India'],
      n: 'Hyderabad was the largest princely state, surrounded by Indian territory. Its ruler, the Nizam, wanted it to be independent and signed only a Standstill Agreement, which kept old arrangements going for a while. Inside the state there was a peasant movement in Telangana and violence by an armed group called the Razakars. Indian forces entered the state in September 1948, and it was then integrated with the Union.',
    }),
    sl('concept', 'Manipur', {
      b: 'The Maharaja signed the Instrument of Accession; Manipur held **elections under universal adult franchise** in 1948. The **merger agreement** of September 1949 was signed **without consulting** the elected assembly.',
      v: vCases,
      n: 'Manipur\'s story is different. Its ruler signed the Instrument of Accession, and in 1948 Manipur held elections under universal adult franchise, becoming a constitutional monarchy with an elected assembly. But in September 1949 the merger agreement with India was signed without consulting that assembly. This caused anger and resentment that shaped politics in the region for a long time.',
    }),
    sl('check', 'Quick check: Junagadh', {
      b: 'How was the question of Junagadh finally settled?',
      chk: 'm_junagadh',
      n: 'Remember what the people of Junagadh were asked to do in 1948.',
    }),
    sl('two-column', 'The demand for linguistic states', {
      cols: ['**For:** government, courts and schools in the people\'s language; wider participation; recognition of identity.', '**Early fears:** separatism after Partition; distraction from refugees and development; disputes over mixed areas.'],
      v: vLingCase,
      n: 'The national movement had long accepted that provinces could be formed by language. After Partition, though, leaders became cautious. They feared new divisions might encourage separatism and distract from urgent tasks. Supporters argued that people should be governed in the language they speak, so that democracy would be real for them. The pressure from below proved too strong to ignore.',
    }),
    sl('diagram', 'The Andhra movement', {
      v: vAndhra,
      n: 'The turning point came in the Telugu-speaking areas of Madras Province. Potti Sriramulu, a veteran Gandhian, went on a fast for a separate state and died in December 1952. Protests spread across the region. The government announced a new state, and Andhra State was formed in October 1953. Soon after, a commission was appointed to look at the whole country.',
    }),
    sl('check', 'Quick check: a fast in 1952', {
      b: 'Potti Sriramulu\'s death in December 1952 led directly to the formation of which state?',
      chk: 'm_sriramulu',
      n: 'His fast was for Telugu speakers.',
    }),
    sl('concept', 'The States Reorganisation Act, 1956', {
      b: 'The **States Reorganisation Commission** (1953) recommended that boundaries reflect **language**. The **1956 Act** created **14 states and 6 union territories**.',
      v: v1956,
      n: 'The States Reorganisation Commission was set up in 1953. It accepted that state boundaries should reflect the language of the people. Its report led to the States Reorganisation Act of 1956, which created fourteen states and six union territories. The process did not stop there. In 1960, after a strong movement, Bombay State was divided into Maharashtra and Gujarat.',
    }),
    sl('diagram', 'The map keeps changing', {
      v: vNewStates,
      n: 'Since then the map has changed many times. Nagaland became a state in 1963; Punjab was reorganised and Haryana created in 1966; Meghalaya, Manipur and Tripura became states in 1972; Mizoram and Arunachal Pradesh in 1987; Chhattisgarh, Uttarakhand and Jharkhand in 2000; and Telangana in 2014. Later states were often based on regional or tribal identity, not only language.',
    }),
    sl('example', 'Worked example 3: reading a timeline', {
      b: 'Order these events and name the challenge each relates to: Andhra State; Hyderabad joins India; Partition; the 1956 Act.',
      bl: [
        'Step 1 — Place each on the timeline: 1947, 1948, 1953, 1956.',
        'Step 2 — Partition and Hyderabad: **unity** (territory).',
        'Step 3 — Andhra and 1956: **unity with diversity**, and **democracy** (government in people\'s language).',
        'Step 4 — Write the order: Partition, Hyderabad, Andhra State, the 1956 Act.',
      ],
      v: vEvents,
      n: 'Chronology questions are easier with a timeline in your head. Partition comes in 1947, Hyderabad joins in 1948, Manipur\'s merger is signed in 1949, Andhra State is formed in 1953, and the reorganisation act follows in 1956. Then link each event to a challenge. Partition and the princely states are about territorial unity; linguistic states are about unity with diversity and making democracy real.',
    }),
    sl('example', 'Worked example 4: an evaluation question', {
      b: 'Question: *Did linguistic states weaken India?* Plan a balanced answer.',
      bl: [
        'Step 1 — State the **early fear** and why it existed.',
        'Step 2 — Give the **evidence**: many new states, yet India stayed united.',
        'Step 3 — Explain **why**: access, participation, recognition of identity.',
        'Step 4 — **Conclude**: fears proved largely unfounded; disputes remain, settled through Parliament.',
      ],
      v: vLingCase,
      n: 'Evaluation questions need both sides. Begin with the fear that linguistic states might weaken the country, and explain why leaders felt it so soon after Partition. Then give the evidence: many new states were formed, and India remained united. Explain why, using access, participation and recognition of identity. Conclude that the fears proved largely unfounded, though some disputes remain and are settled through Parliament.',
    }),
    sl('check', 'Quick check: order of new states', {
      b: 'Arrange Nagaland, Haryana, Meghalaya and Jharkhand in the order in which they became states.',
      chk: 'ord_states',
      n: 'Use the timeline on the previous slides.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. About five hundred and sixty-five princely states had to decide their future when paramountcy lapsed. Through the Instrument of Accession, led by Sardar Patel and V. P. Menon, almost all joined India; Junagadh, Hyderabad, Manipur and Kashmir were harder cases. Linguistic reorganisation began with Andhra in 1953 and the Act of 1956, and it strengthened unity by accepting diversity.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Paramountcy **lapsed**; the choice lay with **rulers**, not people.',
        'Learn the **three subjects** in the Instrument of Accession.',
        'Know the year of each difficult case: Junagadh 1948, Hyderabad 1948, Manipur 1949.',
        'SRC **1953**; Act **1956**: **14 states, 6 union territories**.',
        'Do not write that religion was a basis of reorganisation: it was **language** (and later regional identity).',
      ],
      v: vRecall,
      n: 'Some tips for Part 2. Remember that when paramountcy lapsed, the choice lay with rulers, not the people. Learn the three subjects handed over by the Instrument of Accession. Keep the years of the difficult cases straight. Remember the Commission in 1953 and the Act in 1956, with fourteen states and six union territories. And never write that states were reorganised on religion.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Challenges of Nation-Building — Notes',
  sections: [
    {
      h: '1. Three challenges for the new nation',
      t: 1,
      b: 'India became independent on **15 August 1947**. The new nation faced three broad challenges:\n\n1. **Unity:** shaping one nation from a society of many languages, faiths and regions, while respecting that diversity.\n2. **Democracy:** governing through a **Constitution** with **fundamental rights** and **universal adult franchise**.\n3. **Development:** improving the lives of **all** citizens, especially the poor; the **Directive Principles of State Policy** set out these goals.\n\nAll three had to be faced at once, in the shadow of Partition.',
      terms: [
        ['Nation-building', 'Creating a shared political community and the institutions that hold it together.'],
        ['Universal adult franchise', 'The right of every adult citizen to vote.'],
      ],
      v: vChallenges,
    },
    {
      h: '2. Partition: basis and problems',
      t: 1,
      b: 'Partition followed the **two-nation theory** of the Muslim League: Muslim-majority areas were to form **Pakistan**.\n\n**Problems in drawing the boundary:**\n1. Muslim-majority areas were in **two zones**, so Pakistan had **West** and **East** wings (East Pakistan became **Bangladesh** in 1971).\n2. Some Muslim-majority areas did not want Pakistan: **Khan Abdul Ghaffar Khan** of the North-West Frontier Province opposed it, but the province went to Pakistan.\n3. **Punjab** and **Bengal** had large non-Muslim populations, so they were **divided**.\n4. **Minorities** were left on both sides of the new line.',
      terms: [
        ['Two-nation theory', 'The claim that Hindus and Muslims formed two separate nations.'],
        ['Frontier Gandhi', 'Popular name of Khan Abdul Ghaffar Khan, who opposed Partition.'],
      ],
      v: vProblems,
    },
    {
      h: '3. Consequences of Partition and the secular choice',
      t: 1,
      b: '- **Forced migration:** millions crossed the new border within months; estimates of the numbers displaced and killed vary widely.\n- **Violence:** people of **every community** suffered; women were especially vulnerable; families were divided.\n- **Division of assets:** property, offices, the railways and the armed forces were divided.\n- **Refugees:** both governments had to provide shelter and livelihoods.\n- **Mahatma Gandhi** worked for communal harmony in riot-hit areas; he was assassinated on **30 January 1948**.\n\n**Secular choice:** India did not adopt any state religion; citizenship and rights do not depend on faith, and minorities are full citizens.',
      terms: [
        ['Refugee', 'A person forced to leave home and cross a border to find safety.'],
        ['Secular state', 'A state that has no official religion and treats all faiths equally.'],
      ],
      v: vConsequences,
      vs: [vSecular],
    },
    {
      h: '4. Integration of the princely states',
      t: 2,
      b: 'There were about **565 princely states**. When British **paramountcy lapsed**, rulers were legally free to join India or Pakistan or to stay independent.\n\n**Approach:** the government held that the people of most states wanted to join India; it was **firm** on unity but **flexible** about local autonomy. **Sardar Vallabhbhai Patel** (Deputy Prime Minister and Home Minister) led the effort, assisted by **V. P. Menon**.\n\n**Instrument of Accession:** rulers handed **defence, external affairs and communications** to the Union; nearly all signed before 15 August 1947.',
      terms: [
        ['Paramountcy', 'British supremacy over the princely states, which ended in 1947.'],
        ['Instrument of Accession', 'The document by which a ruler joined the Indian Union.'],
      ],
      v: vApproach,
      vs: [vStates],
    },
    {
      h: '5. The difficult cases',
      t: 2,
      b: '- **Junagadh:** the ruler announced accession to Pakistan; a **plebiscite** in February **1948** confirmed the people\'s wish to join India.\n- **Hyderabad:** the **Nizam** sought independence and signed a **Standstill Agreement** (November 1947); amid a peasant movement in **Telangana** and violence by the **Razakars**, the state joined India after **police action in September 1948**.\n- **Manipur:** the Maharaja signed the Instrument of Accession; **elections under universal adult franchise** were held in **1948**; the **merger agreement** of **September 1949** was signed without consulting the elected assembly, leaving resentment.\n- **Kashmir:** its ruler signed the Instrument of Accession in October 1947 (studied in Chapter 14).',
      terms: [
        ['Standstill Agreement', 'A temporary agreement to keep existing arrangements in place.'],
        ['Plebiscite', 'A direct vote of the people on a single question.'],
      ],
      v: vCases,
    },
    {
      h: '6. Reorganisation of states',
      t: 3,
      b: 'The national movement had accepted **linguistic provinces**, but after Partition leaders were cautious, fearing separatism.\n\n- **Andhra:** **Potti Sriramulu** died after a long fast in **December 1952**; **Andhra State** was formed in **October 1953**.\n- **States Reorganisation Commission** (1953) → **States Reorganisation Act, 1956**: **14 states and 6 union territories**, mainly on language.\n- **Later changes:** Maharashtra and Gujarat (1960), Nagaland (1963), Punjab and Haryana (1966), Meghalaya, Manipur and Tripura (1972), Mizoram and Arunachal Pradesh (1987), Chhattisgarh, Uttarakhand and Jharkhand (2000), Telangana (2014).\n\n**Assessment:** the fear of break-up proved unfounded. Linguistic states brought government closer to the people, widened participation, and showed that **accepting diversity strengthens unity**. New states are formed by **Parliament** under the Constitution.',
      terms: [
        ['Linguistic state', 'A state whose boundaries are drawn mainly around one language.'],
        ['States Reorganisation Commission', 'The body (1953) whose report led to the 1956 Act.'],
      ],
      v: vAndhra,
      vs: [v1956, vNewStates],
    },
  ],
  tips: '**Common mistakes**\n- Forgetting **development** among the three challenges.\n- Writing that the princely states\' **people** chose: the legal choice lay with the **rulers**.\n- Mixing up the years: Hyderabad **1948**, Manipur merger **1949**, Andhra **1953**, Act **1956**.\n- Saying states were reorganised on **religion**: the basis was **language** (and later regional or tribal identity).\n- Writing about Partition violence in a way that blames a community. Stick to facts.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a meaning plus importance (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); evaluation questions need both sides and a conclusion.\n- Source questions (4 marks): quote, name, explain; part (c) has an internal choice.\n\n**Sources in SOYL practice** are imagined documents written for practice; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Three challenges of nation-building', '**Unity**, **democracy**, **development**.', 'concept', 1],
  ['Unity "with diversity" means…', 'One nation that **respects** many languages, faiths and regions.', 'concept', 1],
  ['Basis of Partition', 'The **two-nation theory**: Muslim-majority areas to form Pakistan.', 'definition', 1],
  ['Why two wings of Pakistan?', 'Muslim-majority areas were in **two zones**, west and east.', 'concept', 1],
  ['Who was the "Frontier Gandhi"?', '**Khan Abdul Ghaffar Khan**, who opposed Partition.', 'fact', 1],
  ['Why were Punjab and Bengal divided?', 'Muslim majority overall, but **many non-Muslim-majority districts**.', 'concept', 1],
  ['East Pakistan became…', '**Bangladesh**, in **1971**.', 'fact', 1],
  ['Three consequences of Partition', 'Forced migration; violence and loss of life; division of assets and families.', 'concept', 1],
  ['Date of Mahatma Gandhi\'s assassination', '**30 January 1948**.', 'fact', 1],
  ['India\'s answer to Partition on religious lines', 'A **secular state**: equal citizenship for all faiths.', 'concept', 1],
  ['Number of princely states (approx.)', 'About **565**.', 'fact', 2],
  ['**Paramountcy**', 'British supremacy over princely states; it **lapsed** in 1947.', 'definition', 2],
  ['Who decided accession in law?', 'The **ruler**, not the people.', 'exam-tip', 2],
  ['**Instrument of Accession**: three subjects', '**Defence, external affairs, communications**.', 'fact', 2],
  ['Leaders of integration', '**Sardar Patel**, assisted by **V. P. Menon**.', 'fact', 2],
  ['Government\'s approach to princely states', 'People wished to join India; firm on unity; flexible on autonomy.', 'concept', 2],
  ['**Junagadh**', 'Ruler chose Pakistan; **plebiscite (1948)** chose India.', 'fact', 2],
  ['**Hyderabad**', 'Nizam sought independence; Standstill Agreement; **police action, September 1948**.', 'fact', 2],
  ['**Razakars**', 'An armed group in Hyderabad in 1947–48.', 'definition', 2],
  ['**Manipur**', 'Elections in **1948**; merger signed **September 1949** without consulting the assembly.', 'fact', 2],
  ['**Standstill Agreement**', 'A temporary agreement keeping existing arrangements in place.', 'definition', 2],
  ['Potti Sriramulu', 'Gandhian who died after a fast for a Telugu state, **December 1952**.', 'fact', 3],
  ['Andhra State formed', '**October 1953**.', 'fact', 3],
  ['States Reorganisation Commission', 'Appointed **1953**; led to the **1956 Act**.', 'fact', 3],
  ['1956 Act created…', '**14 states** and **6 union territories**.', 'fact', 3],
  ['Bombay State divided (1960) into…', '**Maharashtra** and **Gujarat**.', 'fact', 3],
  ['States created in 2000', '**Chhattisgarh, Uttarakhand, Jharkhand**.', 'fact', 3],
  ['Newest state in the list (2014)', '**Telangana**.', 'fact', 3],
  ['Why early fears of linguistic states?', 'Coming after Partition, leaders feared **separatism**.', 'concept', 3],
  ['Result of linguistic states', 'Government closer to people; wider participation; **unity strengthened**.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Challenges of Nation-Building',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_belt', 'm_hyderabad', 'm_linguistic_basis', 'ar_rulers'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_instrument', 's_andhra', 's3_problems'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_integration', 'l_reorganisation'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_station'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Challenges of Nation-Building',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_two_nation', 'm_minorities', 'm_consequence', 'm_paramountcy', 'm_patel', 'm_manipur', 'm_src', 'm_outcome', 'ar_belt', 'ar_linguistic'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_two_wings', 's_manipur', { attempt: 1, keys: ['s_minorities', 's_fears'] }, 's3_hyderabad', { attempt: 1, keys: ['s3_consequences', 's3_benefits'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_challenges', { attempt: 1, keys: ['l_partition', 'l_unity_diversity'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_dewan', 'sb_report'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-political-science-ch08 only (challenges for the new nation and Partition; integration of princely states; reorganisation of states)',
    originality: 'every source and scenario is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    facts: `chronology ${EVENTS.map(([y, t]) => `${y} ${t}`).join('; ')}; new states ${NEW_STATES.map(([y, t]) => `${y} ${t}`).join('; ')}; about 565 princely states; Junagadh plebiscite 1948; Gandhi assassinated 30 January 1948; SRC 1953; 1956 Act 14 states and 6 union territories; nothing after 2024 stated`,
    neutrality: 'Partition violence described factually without blaming any community; neighbours, leaders and difficult accession cases stated neutrally',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
