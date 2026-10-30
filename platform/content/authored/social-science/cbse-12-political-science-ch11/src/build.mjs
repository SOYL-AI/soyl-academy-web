// Build CBSE 12 Political Science ch11 India's External Relations. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch11', 'social-science');
const { CHINA, PAKISTAN, NUCLEAR } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
const vBlocs = (() => {
  const s = new Svg(660, 240);
  s.rect(20, 40, 180, 150, { sw: 1.6 });
  s.text(110, 66, 'Western bloc', { bold: true });
  s.text(110, 96, 'Led by the USA', { size: 13 });
  s.text(110, 120, 'NATO and other pacts', { size: 13 });
  s.rect(460, 40, 180, 150, { sw: 1.6 });
  s.text(550, 66, 'Eastern bloc', { bold: true });
  s.text(550, 96, 'Led by the USSR', { size: 13 });
  s.text(550, 120, 'Warsaw Pact', { size: 13 });
  s.rect(240, 20, 180, 190, { color: 'accent', sw: 2.4 });
  s.text(330, 46, 'Non-aligned', { bold: true, color: 'accent' });
  s.text(330, 78, 'No military pact', { size: 13 });
  s.text(330, 102, 'Judge each issue', { size: 13 });
  s.text(330, 122, 'on its merits', { size: 13 });
  s.text(330, 146, 'Aid and trade', { size: 13 });
  s.text(330, 166, 'with both sides', { size: 13 });
  s.arrow(240, 150, 204, 150, { sw: 1.4, color: 'muted' });
  s.arrow(420, 150, 456, 150, { sw: 1.4, color: 'muted' });
  s.text(330, 228, 'Independent, active, outside both blocs', { size: 12, muted: true });
  return s.visual('Diagram of the Cold War world: a Western bloc led by the USA with NATO on the left, an Eastern bloc led by the USSR with the Warsaw Pact on the right, and in the middle the non-aligned position: no military pact, judging each issue on its merits, and aid and trade with both sides', 'Non-alignment: outside both blocs, but not outside world affairs');
})();

function timeline(items, alt, caption, y0, y1, step) {
  // Four label lanes (far above, near below, near above, far below) so neighbouring labels never collide.
  const s = new Svg(680, 360);
  const AX = 180;
  const X = (y) => 80 + ((y - y0) / (y1 - y0)) * 520;
  s.arrow(40, AX, 650, AX, { sw: 1.8 });
  for (let yr = y0; yr <= y1; yr += step) s.line(X(yr), AX - 6, X(yr), AX + 6, { sw: 1.2, color: 'muted' });
  const LANES = [20, AX + 30, 92, AX + 102];
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
const CH_SHORT = ['PRC founded; | India recognises it', 'Panchsheel', 'Dalai Lama | given asylum', 'Border war', 'Full relations | restored', 'Rajiv Gandhi | visits China'];
const vChina = timeline(
  CHINA.map(([y], i) => [y, CH_SHORT[i]]),
  `Timeline of India–China relations: ${CHINA.map(([y, t]) => `${y}, ${t}`).join('; ')}`,
  'India and China, 1949–1988',
  1945, 1990, 5,
);
const PK_SHORT = ['War over | Kashmir', 'Indus Waters | Treaty', 'War of 1965', 'Tashkent', 'War; Bangladesh | is born', 'Simla | Agreement', 'Kargil'];
const vPakistan = timeline(
  PAKISTAN.map(([y], i) => [y, PK_SHORT[i]]),
  `Timeline of India–Pakistan relations: ${PAKISTAN.map(([y, t]) => `${y}, ${t}`).join('; ')}`,
  'Wars and agreements, 1947–1999',
  1945, 2000, 5,
);
const NU_SHORT = ['Atomic Energy | Commission', 'NPT; India | stays out', 'First test, | Pokhran', 'CTBT not | signed', 'Tests at | Pokhran'];
const vNuclear = timeline(
  NUCLEAR.map(([y], i) => [y, NU_SHORT[i]]),
  `Timeline of India's nuclear policy: ${NUCLEAR.map(([y, t]) => `${y}, ${t}`).join('; ')}`,
  'From atomic research to a declared doctrine',
  1945, 2000, 5,
);
const vDoctrine = (() => {
  const s = new Svg(660, 220);
  s.rect(230, 14, 200, 52, { color: 'accent', sw: 2 });
  s.text(330, 40, 'India\'s nuclear doctrine', { bold: true });
  const boxes = [
    [30, 'No first use', 'Weapons only to', 'answer an attack'],
    [350, 'Credible minimum', 'Just enough to make', 'an attack unthinkable'],
  ];
  for (const [x, h, a, b] of boxes) {
    s.arrow(330, 66, x + 140, 112, { sw: 1.6, color: 'muted' });
    s.rect(x, 114, 280, 90, { sw: 1.6 });
    s.text(x + 140, 138, h, { bold: true });
    s.text(x + 140, 164, a, { size: 13 });
    s.text(x + 140, 184, b, { size: 13 });
  }
  return s.visual('Diagram of India\'s nuclear doctrine with two parts: no first use, meaning weapons only to answer an attack, and credible minimum deterrence, meaning just enough capability to make an attack unthinkable', 'Two pillars of the declared doctrine');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['The world in 1947', 'Nehru and the goals', 'Non-alignment', 'Afro-Asian unity', 'China: friendship to war'], 'Route map of Part 1: the world in 1947, Nehru and the goals of foreign policy, non-alignment, Afro-Asian unity, and India–China relations from friendship to war', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Kashmir and the Indus', '1965 and Tashkent', '1971 and Simla', 'Kargil', 'Nuclear policy'], 'Route map of Part 2: Kashmir and the Indus treaty, the 1965 war and Tashkent, the 1971 war and Simla, Kargil, and nuclear policy', 'Part 2 at a glance');
const vContext = table(
  ['Feature of the world in 1947', 'What it meant for India'],
  [
    ['Cold War between two blocs', 'Pressure to take sides'],
    ['Wave of decolonisation in Asia and Africa', 'Natural partners among new nations'],
    ['Poverty and the need to rebuild', 'Need for aid, technology and peace'],
    ['A new United Nations', 'A stage for a new country\'s voice'],
  ],
  'Table of four features of the world in 1947 and what each meant for India: the Cold War meant pressure to take sides; decolonisation gave partners among new nations; poverty meant a need for aid, technology and peace; the new United Nations gave a stage',
);
const vThree = table(
  ['Policy', 'Joins a bloc?', 'Takes positions on world issues?'],
  [
    ['Non-alignment', 'No', 'Yes, actively, issue by issue'],
    ['Isolationism', 'No', 'No, keeps away from world affairs'],
    ['Neutrality', 'No', 'No, stays out of disputes and wars'],
    ['Alliance membership', 'Yes', 'Follows the bloc\'s line'],
  ],
  'Table comparing non-alignment, isolationism, neutrality and alliance membership: only alliance members join a bloc; only non-alignment combines staying out of blocs with active positions on world issues',
  'Non-alignment is not neutrality',
);
const vAfroAsian = flow('LR', ['Asian Relations Conference, New Delhi (1947)', 'Support to Indonesia\'s freedom struggle', 'Asian-African conference, Bandung (1955)', 'First NAM summit, Belgrade (1961)'], 'Flow of Afro-Asian unity: the Asian Relations Conference in New Delhi in 1947, support to Indonesia, the Bandung conference in 1955 and the first NAM summit at Belgrade in 1961', 'From Afro-Asian solidarity to NAM');
const vClassify = table(
  ['Imagined country in 1956 does…', 'Points to'],
  [
    ['Refuses every military pact', 'Not in a bloc'],
    ['Criticises each superpower on different issues', 'Independent judgement'],
    ['Takes aid from both for dams and steel', 'Development through both sides'],
    ['Joins conferences of new nations', 'Afro-Asian solidarity'],
  ],
  'Worked example table: an imagined country that refuses pacts, criticises each superpower on different issues, takes aid from both and joins conferences of new nations is following non-alignment',
  'Verdict: non-alignment',
);
const vEarlyChina = table(
  ['Step', 'Year'],
  [
    ['India recognises the People\'s Republic', '1949–50'],
    ['Panchsheel: five principles of peaceful coexistence', '1954'],
    ['Close contacts and visits between leaders', '1950s'],
  ],
  'Table of early friendship with China: recognition of the People\'s Republic in 1949 to 1950, Panchsheel in 1954 and visits between leaders in the 1950s',
);
const vSectors = table(
  ['Sector', 'Area in dispute'],
  [
    ['Western', 'Aksai Chin (Ladakh region)'],
    ['Eastern', 'North-East Frontier Agency, today Arunachal Pradesh'],
  ],
  'Table of the two main areas of the boundary dispute: Aksai Chin in the western sector and the North-East Frontier Agency, today Arunachal Pradesh, in the eastern sector',
  'Rival claims on two sectors',
);
const vWar1962 = flow('TB', ['Unsettled boundary and mistrust over Tibet', 'Fighting in both sectors (October 1962)', 'Indian forces suffer reverses', 'China declares a unilateral ceasefire (November)'], 'Flow of the 1962 war: an unsettled boundary and mistrust over Tibet, fighting in both sectors in October, reverses for Indian forces, and a unilateral ceasefire declared by China in November', 'The war in brief');
const vEffects1962 = table(
  ['Area', 'Effect'],
  [
    ['Image and morale', 'Setback to national pride and to Nehru\'s standing'],
    ['Defence', 'Sharp rise in spending; modernisation of forces'],
    ['Parliament', 'Defence Minister resigns; first no-confidence motion (1963)'],
    ['Parties', 'Differences over China feed the CPI split (1964)'],
  ],
  'Table of the effects of the 1962 war: a setback to image and morale, a sharp rise in defence spending, the resignation of the Defence Minister and the first no-confidence motion in 1963, and differences that fed the split of the CPI in 1964',
);
const vPlan5 = table(
  ['Mark', 'What to write (about 20 words each)'],
  [
    ['1', 'Early friendship: recognition and Panchsheel'],
    ['2', 'Tibet and the asylum of 1959'],
    ['3', 'Boundary: Aksai Chin and the eastern sector'],
    ['4', 'The war of 1962 and the ceasefire'],
    ['5', 'Your judgement on the main cause'],
  ],
  'Worked example table planning a 5-mark answer on India–China relations: early friendship, Tibet, the boundary, the war and a judgement on the main cause',
  'Five headed points, one judgement',
);
const vSum1 = table(
  ['Idea', 'Key point'],
  [
    ['Goals', 'Sovereignty, territorial integrity, development'],
    ['Non-alignment', 'Out of blocs, active on issues; NAM from 1961'],
    ['Afro-Asian unity', 'New Delhi 1947, Bandung 1955'],
    ['China', 'Panchsheel 1954, Tibet 1959, war 1962, ties restored 1976'],
  ],
  'Summary table of Part 1: goals of sovereignty, territorial integrity and development; non-alignment as staying out of blocs while active on issues; Afro-Asian unity; and India–China relations from 1954 to 1976',
);
const vKashmir = table(
  ['Year', 'Development'],
  [
    ['1947', 'Fighting begins after raiders enter Kashmir; the ruler accedes to India'],
    ['1948', 'India takes the issue to the United Nations'],
    ['1949', 'A ceasefire line divides the territory'],
  ],
  'Table of the Kashmir conflict of 1947 to 1949: fighting and accession in 1947, India taking the matter to the United Nations in 1948, and a ceasefire line in 1949',
  'The dispute that shaped the relationship',
);
const vIndus = table(
  ['Feature of the Indus Waters Treaty', 'Detail'],
  [
    ['Year and signatories', '1960; Prime Minister Nehru and President Ayub Khan'],
    ['Mediator', 'The World Bank'],
    ['Subject', 'Sharing the rivers of the Indus system'],
  ],
  'Table of the Indus Waters Treaty: signed in 1960 by Nehru and Ayub Khan, mediated by the World Bank, on sharing the rivers of the Indus system',
);
const v1965 = flow('LR', ['Clashes in the Rann of Kutch (April)', 'Offensive in Jammu and Kashmir (August–September)', 'UN-backed ceasefire (September)', 'Tashkent Agreement (January 1966)'], 'Flow of the 1965 conflict: clashes in the Rann of Kutch in April, an offensive in Jammu and Kashmir in August and September, a UN-backed ceasefire in September and the Tashkent Agreement in January 1966', '1965 in four steps');
const v1971Background = flow('TB', ['Awami League wins the 1970 elections', 'Power is not handed over', 'Military crackdown in East Pakistan (March 1971)', 'Millions of refugees cross into India'], 'Flow of the background to 1971: the Awami League wins the 1970 elections, power is not handed over, a military crackdown begins in March 1971 and millions of refugees cross into India', 'How a crisis next door reached India');
const v1971War = table(
  ['Date', 'Event'],
  [
    ['August 1971', 'Treaty of Peace, Friendship and Cooperation with the USSR'],
    ['December 1971', 'War on the eastern and western fronts'],
    ['16 December 1971', 'Surrender at Dhaka; Bangladesh independent'],
  ],
  'Table of 1971: the treaty with the USSR in August, war in December, and the surrender at Dhaka on 16 December leading to an independent Bangladesh',
);
const vSimlaKargil = table(
  ['Event', 'What it involved'],
  [
    ['Simla Agreement, 1972', 'Peaceful, bilateral settlement of differences; respect for the line of control'],
    ['Lahore bus journey, February 1999', 'A peace initiative by the two prime ministers'],
    ['Kargil, May–July 1999', 'Intruders occupy heights on the Indian side; Indian forces recover them'],
  ],
  'Table of peace and conflict: the Simla Agreement of 1972, the Lahore bus journey of February 1999 and the Kargil conflict of May to July 1999',
  'Peace efforts and conflict side by side',
);
const vSource = flow('LR', ['Read the heading: who, where, when', 'Find the event in the background', 'Quote the line for "which line" parts', 'Name the concept, then explain'], 'Flow for a source question: read the heading, find the event in the background, quote the exact line where asked, and name and explain the concept', 'Four steps for a source question');
const vNucStart = table(
  ['Person or idea', 'Position'],
  [
    ['Homi J. Bhabha', 'Led the atomic programme from the late 1940s'],
    ['Nehru', 'Science for development; against nuclear weapons; for disarmament'],
    ['China\'s test, 1964', 'Added a security concern'],
  ],
  'Table of the beginnings of nuclear policy: Homi Bhabha led the programme from the late 1940s; Nehru supported science for development but opposed nuclear weapons; China\'s test in 1964 added a security concern',
);
const vTreaties = table(
  ['Treaty', 'What it does', 'India\'s objection'],
  [
    ['NPT (1968)', 'Five states keep weapons; others give up the option', 'Discriminatory'],
    ['CTBT (1996)', 'Bans all nuclear test explosions', 'Freezes an unequal order'],
  ],
  'Table of two treaties: the NPT of 1968 lets five states keep weapons while others give up the option, which India calls discriminatory; the CTBT of 1996 bans all test explosions, which India says freezes an unequal order',
  'Why India stayed out',
);
const vEval = table(
  ['Step', 'Content'],
  [
    ['1', 'Peaceful beginnings under Bhabha and Nehru'],
    ['2', 'China\'s test and the NPT'],
    ['3', 'Pokhran 1974'],
    ['4', 'Pokhran 1998 and the doctrine'],
    ['5', 'Judgement: deterrence and disarmament vs regional tension'],
  ],
  'Worked example table for a 5-mark evaluation on nuclear policy: beginnings, China\'s test and the NPT, the 1974 test, the 1998 tests and doctrine, and a balanced judgement',
  'Trace, then judge',
);
const vSum2 = table(
  ['Topic', 'Key point'],
  [
    ['Kashmir', 'Conflict from 1947; ceasefire line 1949'],
    ['Cooperation', 'Indus Waters Treaty 1960'],
    ['1965 and 1971', 'Tashkent 1966; Bangladesh and Simla 1971–72'],
    ['Kargil', '1999'],
    ['Nuclear', 'Tests 1974 and 1998; no first use; minimum deterrence'],
  ],
  'Summary table of Part 2: Kashmir from 1947, the Indus treaty of 1960, Tashkent and Simla after the wars of 1965 and 1971, Kargil in 1999, and nuclear tests with the doctrine of no first use and minimum deterrence',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'India\'s External Relations — Part 1: Non-Alignment and China',
  goals: [
    'Explain the international context in which India\'s foreign policy was shaped after 1947',
    'Explain the objectives of foreign policy and the policy of non-alignment',
    'Describe India\'s role in Afro-Asian unity and the Non-Aligned Movement',
    'Analyse India–China relations up to and after the war of 1962',
  ],
  slides: [
    sl('title', 'India\'s External Relations', {
      b: 'Part 1 — how a newly free India dealt with the **Cold War**, built **non-alignment**, and faced the **1962 war** with China.',
      v: vRoute1,
      n: 'In 1947 India became free in a world that was splitting into two rival camps. A new nation, poor but proud of its freedom struggle, had to decide how to deal with the great powers and with its neighbours. In this part we look at the goals of India\'s foreign policy, the idea of non-alignment, and the story of relations with China up to the war of 1962.',
    }),
    sl('concept', 'The world India entered', {
      v: vContext,
      n: 'Four features of the world shaped India\'s choices. The Cold War pressed new nations to take sides. Many countries of Asia and Africa were winning freedom at the same time, so India had natural partners. India was poor and needed aid, technology and peace to develop. And the new United Nations gave a young country a place to make its voice heard.',
    }),
    sl('concept', 'Nehru and the goals of foreign policy', {
      b: 'Jawaharlal Nehru was **Prime Minister and Foreign Minister** from 1947 to 1964.',
      bl: ['Preserve **sovereignty** won after a long struggle', 'Protect **territorial integrity**', 'Promote **rapid economic development**', 'Means: **non-alignment**'],
      n: 'Nehru held both the post of Prime Minister and that of Foreign Minister, so he shaped foreign policy closely. His aims were to keep India\'s hard-won independence, to protect its territory, and to develop the economy quickly. The Constitution also asks the state to promote peace and respect for international law. The chosen method was non-alignment.',
    }),
    sl('diagram', 'Non-alignment: outside both blocs', {
      v: vBlocs,
      n: 'Here is the idea in one picture. On one side is the Western bloc led by the United States, on the other the Eastern bloc led by the Soviet Union. India chose to join neither military alliance. Instead it judged each issue on its merits and dealt with both sides for aid and trade. Notice that India stays in the picture: it is outside the blocs, but not outside world affairs.',
    }),
    sl('check', 'Quick check: non-alignment', {
      b: 'True or false? Non-alignment means the same as isolationism.',
      chk: 'tf_nam_isolation',
      n: 'Think about whether India kept away from world affairs or took part in them.',
    }),
    sl('concept', 'Non-alignment is not neutrality', {
      v: vThree,
      n: 'Students often mix up three ideas. Isolationism means keeping away from world affairs altogether. Neutrality means staying out of wars and disputes. Non-alignment is different from both. India stayed out of military blocs, but it took positions, mediated in crises and supported freedom struggles. The best one-line answer is: out of blocs, active on issues.',
    }),
    sl('diagram', 'Afro-Asian unity and the birth of NAM', {
      v: vAfroAsian,
      n: 'India reached out to other newly free nations. It hosted the Asian Relations Conference in March 1947, even before independence, and backed Indonesia\'s fight for freedom. In 1955 Asian and African states met at Bandung in Indonesia. In 1961 the first summit of the Non-Aligned Movement was held at Belgrade, led by Nehru, Tito, Nasser, Sukarno and Nkrumah.',
    }),
    sl('check', 'Quick check: Bandung', {
      b: 'Name the Indonesian city where the Asian-African conference of 1955 was held.',
      chk: 'fb_bandung',
      n: 'This conference came six years before the first summit of the Non-Aligned Movement.',
    }),
    sl('example', 'Worked example 1: is this non-alignment?', {
      b: 'Decide which policy an imagined country of 1956 is following.',
      bl: [
        'Step 1 — Does it join a **military pact**? No.',
        'Step 2 — Does it take **positions** on issues? Yes, criticising each superpower on different questions.',
        'Step 3 — Does it deal with **both sides**? Yes, for aid.',
        'Step 4 — Out of blocs plus active on issues: **non-alignment**.',
      ],
      v: vClassify,
      n: 'Let us apply the idea. An imagined country refuses all pacts, criticises one superpower on one question and the other on another, and takes aid from both for its dams and steel plants. It is not isolationist, because it takes part. It is not neutral, because it takes positions. It is not a bloc member. So it is following non-alignment.',
    }),
    sl('concept', 'Debates and changes', {
      bl: [
        'Critics said non-alignment was **unprincipled** or tilted towards the **USSR**, especially after 1971.',
        'The Janata government of **1977** promised **genuine non-alignment**.',
        'After the Cold War, debate on whether NAM still matters.',
      ],
      n: 'Non-alignment had critics. Some said it avoided hard choices; others said India leaned towards the Soviet Union, especially after the treaty of 1971. When the Janata Party came to power in 1977, it said it would follow genuine non-alignment. After the Cold War ended, people asked whether the idea still had meaning. Exam answers should present such debates fairly, with arguments on each side.',
    }),
    sl('concept', 'India and China: a friendly start', {
      v: vEarlyChina,
      n: 'Relations with China began warmly. India was among the first countries to recognise the People\'s Republic. In 1954 the two signed an agreement based on Panchsheel, the five principles of peaceful coexistence: respect for each other\'s territory, non-aggression, non-interference, equality and mutual benefit, and peaceful coexistence. Leaders of both countries visited each other in the 1950s.',
    }),
    sl('diagram', 'Timeline: India and China', {
      v: vChina,
      n: 'This timeline shows the arc of the relationship. Recognition in 1949 and Panchsheel in 1954 mark the friendly phase. The Dalai Lama\'s asylum in 1959 and the war of 1962 mark the break. Full diplomatic relations were restored in 1976, and Prime Minister Rajiv Gandhi\'s visit in 1988 opened a new phase of contact.',
    }),
    sl('concept', 'Tibet and the boundary', {
      b: 'China took control of **Tibet** in 1950; in **1959** the Dalai Lama fled and India gave him **asylum**. The **boundary** was disputed in two sectors.',
      v: vSectors,
      n: 'Two issues strained the friendship. China took control of Tibet in 1950, and after an uprising in 1959 the Dalai Lama fled to India, which gave him asylum. China objected. At the same time the two sides had rival claims on the boundary: Aksai Chin in the western sector and the area then called the North-East Frontier Agency in the east.',
    }),
    sl('check', 'Quick check: order of events', {
      b: 'Arrange the events in India–China relations in the correct order.',
      chk: 'ord_china',
      n: 'Use the timeline: the agreement came first, the war in between, and normal ties later.',
    }),
    sl('diagram', 'The war of 1962', {
      v: vWar1962,
      n: 'In October 1962 fighting broke out in both sectors. Indian forces suffered serious reverses. In November China declared a unilateral ceasefire, and the fighting stopped. Describe the war factually: the causes were the unsettled boundary and the mistrust that had grown over Tibet.',
    }),
    sl('concept', 'Effects of the war', {
      v: vEffects1962,
      n: 'The war had several effects at home. It hurt national morale and Nehru\'s standing. Defence spending rose sharply and the forces were modernised. The Defence Minister resigned, and in 1963 the government faced its first no-confidence motion, which it survived. Differences over China also contributed to the split in the Communist Party of India in 1964.',
    }),
    sl('check', 'Quick check: how the war ended', {
      b: 'True or false? The 1962 war ended when China declared a unilateral ceasefire.',
      chk: 'tf_ceasefire',
      n: 'Recall what happened in November 1962.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: 'Question: *Trace India–China relations from 1949 to 1962 and assess the main cause of the conflict.*',
      bl: [
        'Step 1 — Four headed points in **time order**.',
        'Step 2 — One fact or date in **each** point.',
        'Step 3 — A **judgement** on the main cause, with a reason.',
        'Step 4 — Neutral wording; about 100 words.',
      ],
      v: vPlan5,
      n: 'For a five-mark answer, plan five headed points. Write four points in time order: early friendship, Tibet, the boundary dispute and the war itself, each with a date. Then give a judgement on the main cause, with a reason. Keep the wording neutral and factual, and stay near a hundred words.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. India\'s foreign policy aimed at sovereignty, territorial integrity and development. Its method was non-alignment: out of blocs, active on issues. India built Afro-Asian unity and helped found the Non-Aligned Movement in 1961. With China, friendship and Panchsheel gave way to the war of 1962, and full relations were restored only in 1976.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Never define non-alignment as **neutrality** or **isolation**.',
        'Learn the pairs: **Bandung 1955**, **Belgrade 1961**, **Panchsheel 1954**, **war 1962**.',
        'For 1962, give **two causes** (boundary, Tibet) and **domestic effects**.',
        'Keep wording **neutral** about China and all leaders.',
        'Source parts: quote for "which line", name and explain for the rest.',
      ],
      n: 'A few tips. Never call non-alignment neutrality or isolation. Learn the key dates in pairs. For the 1962 war, give two causes and at least two effects inside India. Keep your wording neutral and factual. In source questions, quote exactly when asked for a line, and name and explain the concept elsewhere.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'India\'s External Relations — Part 2: Pakistan and Nuclear Policy',
  goals: [
    'Describe the conflicts and agreements between India and Pakistan from 1947 to 1999',
    'Explain the wars of 1965 and 1971 and their outcomes',
    'Explain the development of India\'s nuclear policy and its doctrine',
  ],
  slides: [
    sl('title', 'Wars, peace and the bomb', {
      b: 'Part 2 — **India and Pakistan** from 1947 to 1999, and **India\'s nuclear policy**.',
      v: vRoute2,
      n: 'In this part we turn to India\'s relations with Pakistan, a neighbour born from the same Partition. The two countries fought wars and also signed important agreements. Then we study how India\'s nuclear policy developed, from peaceful research in the 1940s to the tests of 1998 and the doctrine that followed.',
    }),
    sl('concept', 'Kashmir: the first conflict', {
      v: vKashmir,
      n: 'The conflict over Kashmir began soon after independence. In October 1947 armed raiders entered Kashmir and its ruler acceded to India; fighting followed. India took the matter to the United Nations, and in 1949 a ceasefire line divided the territory. The two countries have held conflicting positions on Kashmir ever since.',
    }),
    sl('concept', 'Cooperation on rivers', {
      v: vIndus,
      n: 'Conflict did not stop cooperation entirely. In 1960 Prime Minister Nehru and President Ayub Khan signed the Indus Waters Treaty, with the World Bank as mediator. It set out how the rivers of the Indus system would be shared. It is often cited as an example of practical cooperation between the two countries despite tension.',
    }),
    sl('diagram', 'Timeline: India and Pakistan', {
      v: vPakistan,
      n: 'This timeline puts the main events in order. A war over Kashmir began in 1947. The Indus treaty came in 1960. War in 1965 was followed by the Tashkent Agreement in 1966. War in 1971 led to the birth of Bangladesh, followed by the Simla Agreement in 1972. The Kargil conflict took place in 1999.',
    }),
    sl('diagram', 'The conflict of 1965', {
      v: v1965,
      n: 'In 1965 clashes in the Rann of Kutch in April were followed by a larger offensive in Jammu and Kashmir in August and September, and fighting spread along the border. Lal Bahadur Shastri was Prime Minister. A ceasefire backed by the United Nations came in September, and in January 1966 the two leaders signed the Tashkent Agreement, with the Soviet Union as mediator.',
    }),
    sl('check', 'Quick check: Tashkent', {
      b: 'An imagined photograph shows two leaders shaking hands in a Central Asian city in January 1966. Which event does it record?',
      chk: 'm_shastri_scenario',
      n: 'Think of the agreement that followed the war of 1965.',
    }),
    sl('diagram', 'Background to 1971', {
      v: v1971Background,
      n: 'The crisis of 1971 began inside Pakistan. In the 1970 elections the Awami League won in East Pakistan, but power was not handed over. In March 1971 the army began a crackdown, and millions of refugees crossed into India. This placed a huge burden on India and made the crisis India\'s concern.',
    }),
    sl('concept', 'The war of 1971', {
      v: v1971War,
      n: 'With the United States and China leaning towards Pakistan, India signed a twenty-year treaty of peace, friendship and cooperation with the Soviet Union in August 1971. War broke out in December. On sixteenth December Pakistan\'s forces in the east surrendered at Dhaka, and Bangladesh became an independent country.',
    }),
    sl('concept', 'Simla, Lahore and Kargil', {
      v: vSimlaKargil,
      n: 'In July 1972 Indira Gandhi and Zulfikar Ali Bhutto signed the Simla Agreement. Both countries agreed to settle differences peacefully and bilaterally, and to respect the line of control. Peace efforts continued, such as the bus journey to Lahore in February 1999, but in May that year intruders occupied heights near Kargil, and Indian forces recovered them by July.',
    }),
    sl('check', 'Quick check: chronology', {
      b: 'Arrange these events in India–Pakistan relations in the correct order.',
      chk: 'ord_pakistan',
      n: 'Start with the river treaty and end with the conflict in the mountains.',
    }),
    sl('example', 'Worked example 3: reading a source', {
      b: 'A farmer\'s letter of January 1966 mentions trenches dug in September and leaders meeting in a cold northern city with Russian hosts.',
      bl: [
        'Step 1 — Date and place: a border village, early 1966.',
        'Step 2 — Background event: the **1965 war**.',
        'Step 3 — The meeting: the **Tashkent Agreement**.',
        'Step 4 — Explain: forces return to **pre-war positions**; Kashmir stays unsettled.',
      ],
      v: vSource,
      n: 'Here is how to read a source. A letter from early 1966 speaks of trenches dug in September and of leaders meeting with Russian hosts. The date points to the war of 1965, and the meeting is the Tashkent Agreement. If asked to explain, say that the armies returned to their earlier positions, but the Kashmir question itself was not settled.',
    }),
    sl('concept', 'Nuclear policy: the beginnings', {
      v: vNucStart,
      n: 'India\'s nuclear programme began in the late 1940s under the scientist Homi J. Bhabha, aimed at peaceful uses such as power. Nehru supported science for development, but he opposed nuclear weapons and campaigned for disarmament. China\'s nuclear test in 1964 added a new security concern for India.',
    }),
    sl('diagram', 'Timeline: nuclear policy', {
      v: vNuclear,
      n: 'The timeline shows the key steps. The Atomic Energy Commission was set up in 1948. India stayed out of the Non-Proliferation Treaty that opened in 1968. India conducted its first test at Pokhran in May 1974, called a peaceful nuclear explosion. India did not sign the test ban treaty of 1996, and conducted a series of tests at Pokhran in May 1998.',
    }),
    sl('concept', 'Why India stayed out of the treaties', {
      v: vTreaties,
      n: 'India rejected the Non-Proliferation Treaty as discriminatory. It allowed five states that had tested before 1967 to keep their weapons, while all others had to give up the option. India said it supported universal disarmament, not a permanent division between nuclear haves and have-nots. It took a similar view of the test ban treaty of 1996.',
    }),
    sl('check', 'Quick check: nuclear milestones', {
      b: 'Arrange these milestones of India\'s nuclear policy in the correct order.',
      chk: 'ord_nuclear',
      n: 'The treaty came first, then the first test, then the test ban, and finally the second set of tests.',
    }),
    sl('diagram', '1998 and the doctrine', {
      b: 'Tests at Pokhran in **May 1998**; Pakistan tested later that month. India then declared its doctrine.',
      v: vDoctrine,
      n: 'In May 1998 India carried out a series of tests at Pokhran, and Pakistan tested soon after. India then declared its doctrine. First, no first use: India would use nuclear weapons only to answer a nuclear attack. Second, credible minimum deterrence: India would keep only enough capability to make an attack unthinkable. India also says it remains committed to global disarmament.',
    }),
    sl('check', 'Quick check: the doctrine', {
      b: 'True or false? India\'s doctrine includes a commitment not to be the first to use nuclear weapons.',
      chk: 'tf_nofirstuse',
      n: 'Recall the two pillars of the declared doctrine.',
    }),
    sl('example', 'Worked example 4: an evaluation answer', {
      b: 'Question: *Has India\'s nuclear policy been consistent with its commitment to peace?*',
      bl: [
        'Step 1 — **Trace** four stages with dates.',
        'Step 2 — Give the argument **for**: deterrence only, no first use, support for disarmament.',
        'Step 3 — Give the argument **against**: regional tension, a neighbour\'s tests.',
        'Step 4 — **Conclude** with your reasoned view.',
      ],
      v: vEval,
      n: 'An evaluation question needs both sides. First trace the policy in four stages with dates. Then give the case for consistency: weapons only for deterrence, no first use and continued support for disarmament. Then the case against: the tests raised tension in the region. Finish with your own reasoned view. Either conclusion can score if it is argued well.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. Kashmir has been at the centre of India–Pakistan conflict since 1947, yet the two signed the Indus Waters Treaty in 1960. The war of 1965 ended with Tashkent; the war of 1971 created Bangladesh and was followed by Simla. Kargil came in 1999. India tested in 1974 and 1998, stayed out of the treaties it saw as unequal, and declared no first use and minimum deterrence.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Pair each war with its agreement: **1965 → Tashkent 1966**, **1971 → Simla 1972**.',
        'Name the mediator: **World Bank** (Indus), **USSR** (Tashkent).',
        'Explain India\'s objection to the NPT as **discriminatory**, with the reason.',
        'Know both parts of the doctrine: **no first use**, **credible minimum deterrence**.',
        'Use neutral wording: "conflicting positions", not blame.',
      ],
      n: 'Some final tips. Pair each war with the agreement that followed it. Name the mediators: the World Bank for the Indus treaty and the Soviet Union for Tashkent. When asked why India did not sign the Non-Proliferation Treaty, give the reason, not just the word discriminatory. Know both parts of the doctrine. And describe disputes neutrally.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'India\'s External Relations — Notes',
  sections: [
    {
      h: '1. Context and objectives',
      t: 1,
      b: 'India became independent in the early years of the **Cold War**, when many Asian and African countries were also gaining freedom. **Jawaharlal Nehru** was both Prime Minister and Foreign Minister from 1947 to 1964.\n\n**Objectives:** keep the **sovereignty** won in the freedom struggle; protect **territorial integrity**; achieve **rapid economic development**.\n\nThe **Directive Principles** (Article 51) ask the state to promote international peace and security, just relations between nations and respect for international law.',
      terms: [
        ['Foreign policy', 'The principles and actions a country uses in its relations with other countries.'],
        ['Sovereignty', 'A state\'s supreme authority to decide its own affairs without outside control.'],
      ],
      v: vContext,
    },
    {
      h: '2. Non-alignment and the Non-Aligned Movement',
      t: 1,
      b: '**Non-alignment** means keeping out of the military alliances of the two Cold War blocs while taking an **independent, active** part in world affairs. It is **not** isolationism and **not** neutrality.\n\n**Afro-Asian unity:** Asian Relations Conference (New Delhi, **March 1947**); support for Indonesia\'s freedom; Asian-African conference at **Bandung (1955)**.\n\n**NAM:** first summit at **Belgrade, 1961**; leaders usually named as founders: **Nehru, Tito, Nasser, Sukarno, Nkrumah**.\n\n**Debates:** critics spoke of a Soviet tilt, especially after 1971; the **Janata** government (1977) promised *genuine non-alignment*; after the Cold War its relevance was debated.',
      terms: [
        ['Non-alignment', 'Staying out of military blocs while judging each international issue independently.'],
        ['Isolationism', 'Keeping away from world affairs altogether.'],
        ['Neutrality', 'Staying out of wars and disputes, taking no side.'],
      ],
      v: vBlocs,
      vs: [vThree, vAfroAsian],
    },
    {
      h: '3. India and China before 1962',
      t: 2,
      b: '- India recognised the **People\'s Republic of China** soon after its founding (1949).\n- **Panchsheel (1954):** five principles of peaceful coexistence — mutual respect for territorial integrity and sovereignty, mutual non-aggression, non-interference in internal affairs, equality and mutual benefit, peaceful coexistence.\n- **Tibet:** China took control in 1950; after the 1959 uprising the **Dalai Lama** came to India and received **asylum**, which China resented.\n- **Boundary:** rival claims in the **western sector (Aksai Chin)** and the **eastern sector (NEFA, now Arunachal Pradesh)**.',
      terms: [
        ['Panchsheel', 'The five principles of peaceful coexistence agreed by India and China in 1954.'],
        ['Asylum', 'Protection given by a state to a person fleeing another country.'],
      ],
      v: vChina,
      vs: [vSectors],
    },
    {
      h: '4. The war of 1962 and after',
      t: 2,
      b: '- Fighting in both sectors in **October 1962**; Indian forces faced reverses; China declared a **unilateral ceasefire** in **November**.\n- **Effects in India:** blow to morale and to Nehru\'s standing; **defence spending raised** and forces modernised; **Defence Minister V. K. Krishna Menon** resigned; first **no-confidence motion** in the Lok Sabha (1963), which the government survived; differences over China contributed to the **CPI split (1964)**.\n- **Normalisation:** full diplomatic relations restored in **1976**; Prime Minister **Rajiv Gandhi visited China in 1988**.',
      terms: [
        ['Unilateral ceasefire', 'A halt in fighting announced by one side without a joint agreement.'],
        ['No-confidence motion', 'A motion in the Lok Sabha asking whether the government still has the majority\'s support.'],
      ],
      v: vWar1962,
      vs: [vEffects1962],
    },
    {
      h: '5. Wars and peace with Pakistan',
      t: 3,
      b: '- **1947–48:** fighting in **Kashmir**; the ruler acceded to India; India took the matter to the **UN**; a **ceasefire line** in 1949. The two countries have held conflicting positions on Kashmir since.\n- **Indus Waters Treaty (1960):** signed by **Nehru and Ayub Khan**, mediated by the **World Bank**.\n- **1965:** Rann of Kutch clashes (April), larger offensive in **Jammu and Kashmir** (August–September); **UN-backed ceasefire**; **Tashkent Agreement** (January 1966) with **Soviet** mediation — forces returned to pre-war positions. PM **Lal Bahadur Shastri**.\n- **1971:** Awami League (Sheikh Mujibur Rahman) won the 1970 elections; crackdown from **March 1971**; **millions of refugees** in India; **Indo-Soviet Treaty (August 1971)**; war in **December**; surrender at **Dhaka on 16 December**; **Bangladesh** independent.\n- **Simla Agreement (July 1972):** Indira Gandhi and Zulfikar Ali Bhutto; peaceful, **bilateral** settlement; respect for the **line of control**.\n- **1999:** Lahore bus journey (February); **Kargil conflict** (May–July).',
      terms: [
        ['Line of control', 'The line in Jammu and Kashmir, confirmed at Simla, that separates the areas held by India and Pakistan.'],
        ['Bilateral', 'Between two countries only, without a third party.'],
      ],
      v: vPakistan,
      vs: [v1965, v1971War],
    },
    {
      h: '6. India\'s nuclear policy',
      t: 4,
      b: '- **Beginnings:** programme under **Homi J. Bhabha** from the late 1940s, for peaceful uses; Nehru opposed nuclear weapons and pressed for **comprehensive disarmament**.\n- **China\'s test (1964)** raised a security concern.\n- **NPT (1968):** India stayed out, calling it **discriminatory** — it recognises only the five states that tested before 1 January 1967 as nuclear-weapon states.\n- **May 1974:** first test at **Pokhran**, described as a *peaceful nuclear explosion*.\n- **CTBT (1996):** not signed, on similar grounds.\n- **May 1998:** tests at Pokhran; Pakistan tested later that month.\n- **Doctrine:** **no first use** and **credible minimum deterrence**; continued support for global, non-discriminatory disarmament.',
      terms: [
        ['Deterrence', 'Preventing an attack by making the attacker expect an unacceptable response.'],
        ['NPT', 'The Nuclear Non-Proliferation Treaty of 1968.'],
        ['CTBT', 'The Comprehensive Test Ban Treaty of 1996, banning all nuclear test explosions.'],
      ],
      v: vNuclear,
      vs: [vTreaties, vDoctrine],
    },
  ],
  tips: '**Common mistakes**\n- Calling non-alignment *neutrality* or *isolation*.\n- Mixing up **Bandung (1955)** and **Belgrade (1961)**.\n- Placing **Tashkent** after 1971 or **Simla** after 1965.\n- Saying the Tashkent or Simla agreement settled Kashmir — neither did.\n- Writing only "discriminatory" for the NPT without explaining why.\n\n**How marks are usually awarded**\n- 1-mark MCQ and assertion-reason: one correct option.\n- 2 marks: two points (30–50 words); 3 marks: three points (50–80 words).\n- 5 marks: five headed points (80–120 words), with dates; evaluation questions need both sides and a judgement.\n- Source-based (4 marks): quote exactly for "which line" parts; name and explain the concept for the rest.\n\n**Neutral wording:** describe disputes as conflicting positions and events factually; avoid blaming any country or leader.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Three objectives of Nehru\'s foreign policy', 'Sovereignty, territorial integrity, rapid economic development.', 'concept', 1],
  ['Nehru\'s two posts', 'Prime Minister **and** Foreign Minister (1947–64).', 'fact', 1],
  ['**Non-alignment**', 'Out of both Cold War military blocs; independent and active on each issue.', 'definition', 1],
  ['Non-alignment vs neutrality', 'Neutrality: no side, no part in wars. Non-alignment: no bloc, but active positions.', 'exam-tip', 1],
  ['Asian Relations Conference', 'New Delhi, **March 1947**.', 'fact', 1],
  ['Bandung conference', 'Asian-African conference, Indonesia, **1955**.', 'fact', 1],
  ['First NAM summit', '**Belgrade, 1961**.', 'fact', 1],
  ['Founders usually named for NAM', 'Nehru, Tito, Nasser, Sukarno, Nkrumah.', 'fact', 1],
  ['Janata government on non-alignment (1977)', 'Promised **genuine non-alignment**.', 'fact', 1],
  ['**Panchsheel**', 'Five principles of peaceful coexistence, India–China, **1954**.', 'definition', 2],
  ['Dalai Lama given asylum', '**1959**.', 'fact', 2],
  ['Two disputed sectors with China', 'Western: **Aksai Chin**. Eastern: **NEFA** (now Arunachal Pradesh).', 'fact', 2],
  ['How the 1962 war ended', 'China declared a **unilateral ceasefire** (November 1962).', 'fact', 2],
  ['Two domestic effects of 1962', 'Defence Minister resigned; first no-confidence motion (1963).', 'concept', 2],
  ['Party that split partly over China', '**Communist Party of India**, 1964.', 'fact', 2],
  ['India–China full relations restored', '**1976**; Rajiv Gandhi visited China in **1988**.', 'fact', 2],
  ['Indus Waters Treaty', '**1960**; Nehru and Ayub Khan; mediated by the **World Bank**.', 'fact', 3],
  ['Start of the 1965 conflict', 'Rann of Kutch clashes (April), then Jammu and Kashmir (August–September).', 'fact', 3],
  ['**Tashkent Agreement**', 'January **1966**; Shastri and Ayub Khan; **Soviet** mediation; forces back to pre-war positions.', 'fact', 3],
  ['Background to 1971', 'Awami League won 1970 elections; crackdown March 1971; millions of refugees in India.', 'concept', 3],
  ['Indo-Soviet Treaty', 'Peace, Friendship and Cooperation, **August 1971**, 20 years.', 'fact', 3],
  ['Outcome of the 1971 war', 'Surrender at Dhaka, **16 December 1971**; **Bangladesh** independent.', 'fact', 3],
  ['**Simla Agreement**', 'July **1972**; Indira Gandhi and Z. A. Bhutto; bilateral, peaceful settlement; respect the line of control.', 'fact', 3],
  ['Kargil conflict', '**May–July 1999**.', 'fact', 3],
  ['Pair each war with its agreement', '1965 → Tashkent (1966); 1971 → Simla (1972).', 'exam-tip', 3],
  ['Who led India\'s early nuclear programme?', '**Homi J. Bhabha**.', 'fact', 4],
  ['India\'s nuclear tests', 'Pokhran, **May 1974** and **May 1998**.', 'fact', 4],
  ['Why India rejects the NPT', 'Discriminatory: five states keep weapons; all others must give up the option.', 'concept', 4],
  ['**CTBT**', '1996 treaty banning all nuclear tests; India did not sign.', 'definition', 4],
  ['India\'s nuclear doctrine', '**No first use** and **credible minimum deterrence**.', 'definition', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — India\'s External Relations',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_not_neutral', 'm_tibet', 'm_simla', 'ar_npt'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_panchsheel', 's_doctrine', 's3_1962_effects'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_nonalign', 'l_nuclear'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_letter1966'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — India\'s External Relations',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_nam_founders', 'm_bandung', 'm_disputed_areas', 'm_1962_consequence', 'm_tashkent', 'm_1971_treaty', 'm_npt_view', 'm_1998_scenario', 'ar_nonalign_active', 'ar_1971'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_nam_meaning', 's_1965', { attempt: 1, keys: ['s_indus', 's_npt'] }, 's3_1971_factors', { attempt: 1, keys: ['s3_why_nonalign', 's3_1998'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_pakistan', { attempt: 1, keys: ['l_china', 'l_neighbour_policy'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_editorial1962', 'sb_camp1971'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-political-science-ch11 only (international context and non-alignment; China and the 1962 war; wars and peace with Pakistan; nuclear policy)',
    originality: 'every source and scenario is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    facts: `China ${CHINA.map(([y, t]) => `${y} ${t}`).join('; ')}; Pakistan ${PAKISTAN.map(([y, t]) => `${y} ${t}`).join('; ')}; nuclear ${NUCLEAR.map(([y, t]) => `${y} ${t}`).join('; ')}; Bandung 1955; Belgrade 1961; Indo-Soviet Treaty August 1971; Dhaka surrender 16 December 1971; nothing after 2024 stated`,
    neutrality: 'China, Pakistan and all leaders described factually; Kashmir described as conflicting positions; evaluation items give both sides',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
