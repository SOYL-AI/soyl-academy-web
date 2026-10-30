// Build CBSE 12 Political Science ch14 Regional Aspirations. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch14/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch14', 'social-science');
const { EVENTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
const vSpectrum = (() => {
  const s = new Svg(680, 230);
  s.text(340, 22, 'The range of regional demands', { bold: true });
  s.arrow(40, 110, 650, 110, { sw: 2, color: 'accent' });
  const pts = [
    [110, 'Language and', 'cultural rights'],
    [260, 'More powers', 'for the state'],
    [410, 'A separate state', 'or council'],
    [570, 'Separation', '(secession)'],
  ];
  for (const [x, a, b] of pts) {
    s.dot(x, 110, 7, 'accent');
    s.text(x, 150, a, { size: 13 });
    s.text(x, 170, b, { size: 13 });
  }
  s.text(110, 70, 'Most demands', { size: 12, muted: true });
  s.text(570, 70, 'Few demands', { size: 12, muted: true });
  s.text(340, 205, 'Democratic politics accommodates the left side; the Constitution rules out separation', { size: 12, muted: true });
  return s.visual(
    'Diagram of the range of regional demands along an arrow: language and cultural rights, more powers for the state, a separate state or council, and separation; most demands lie on the left side, few on the right, and the Constitution rules out separation',
    'Most regional demands seek recognition and a share in power, not separation',
  );
})();

const vThreeIssues = (() => {
  const s = new Svg(680, 250);
  s.rect(230, 14, 220, 50, { color: 'accent', sw: 2 });
  s.text(340, 39, 'Politics of the North-East', { bold: true });
  const boxes = [
    [20, 'Autonomy', 'New states and', 'autonomous councils'],
    [250, 'Secession', 'Armed movements;', 'later accords'],
    [480, 'Outsiders', 'Movements against', 'migration'],
  ];
  for (const [x, h, a, b] of boxes) {
    s.arrow(340, 64, x + 90, 120, { sw: 1.6, color: 'muted' });
    s.rect(x, 122, 180, 96, { sw: 1.6 });
    s.text(x + 90, 148, h, { bold: true });
    s.text(x + 90, 176, a, { size: 13 });
    s.text(x + 90, 196, b, { size: 13 });
  }
  return s.visual('Diagram: politics of the North-East at the top, with arrows to three kinds of issue: autonomy (new states and autonomous councils), secession (armed movements, later accords) and movements against outsiders (opposing migration)', 'Three kinds of issue in the North-East');
})();

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
    s.text(X(yr), top, String(yr), { bold: true, size: 13 });
    lines.forEach((ln, j) => s.text(X(yr), top + 18 + j * 18, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}
const ev = (y) => {
  const e = EVENTS.find(([yr]) => yr === y);
  if (!e) throw new Error(`no event for ${y}`);
  return e;
};
const TL_NORTH = [
  [1947, 'Accession of | Jammu and Kashmir'],
  [1973, 'Anandpur Sahib | Resolution'],
  [1984, 'Operation | Blue Star'],
  [1985, 'Punjab | Accord'],
  [1989, 'Insurgency in | Kashmir valley'],
  [1992, 'Elections | in Punjab'],
];
for (const [y] of TL_NORTH) ev(y);
const vTimelineNorth = timeline(
  TL_NORTH,
  `Timeline from 1947 to 1992: ${TL_NORTH.map(([y, t]) => `${y}, ${t.replace(' | ', ' ')}`).join('; ')}`,
  'Jammu and Kashmir and Punjab: key years',
  1945, 1995, 5,
);
const TL_NE = [
  [1963, 'Nagaland | a state'],
  [1966, 'MNF armed | campaign'],
  [1972, 'Meghalaya, Manipur, | Tripura states'],
  [1979, 'Assam Movement | begins'],
  [1985, 'Assam | Accord'],
  [1986, 'Mizoram | Accord'],
  [1987, 'Mizoram, Arunachal | states'],
];
for (const [y] of TL_NE) if (y !== 1972 && y !== 1987) ev(y);
const vTimelineNE = timeline(
  TL_NE,
  `Timeline of the North-East from 1963 to 1987: ${TL_NE.map(([y, t]) => `${y}, ${t.replace(' | ', ' ')}`).join('; ')}`,
  'The North-East: from new states to peace accords',
  1960, 1990, 5,
);

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Region and the nation', 'Early tensions', 'Jammu and Kashmir', 'Punjab'], 'Route map of Part 1: region and the nation, early tensions, Jammu and Kashmir, and Punjab', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['The North-East', 'Autonomy', 'Secession and accords', 'Outsiders', 'Lessons'], 'Route map of Part 2: the North-East, autonomy, secession and accords, movements against outsiders, and lessons', 'Part 2 at a glance');
const vApproach = table(
  ['Possible approach to regions', 'Did India choose it?'],
  [
    ['Treat every regional demand as a threat', 'No'],
    ['Impose one language and culture', 'No'],
    ['Accept diversity; settle demands democratically within one nation', 'Yes'],
    ['Allow regions to leave the Union', 'No'],
  ],
  'Table of four possible approaches to regions; India chose to accept diversity and settle demands democratically within one nation, and rejected treating demands as threats, imposing uniformity or allowing secession',
);
const vEarly = table(
  ['Early tension', 'Where', 'How it was handled'],
  [
    ['Demand for linguistic states', 'Many parts of India', 'States reorganised on language lines (1956 and after)'],
    ['Dravidian movement; anti-Hindi protests (1965)', 'Tamil Nadu', 'Elections and debate; English continued alongside Hindi'],
    ['Hill and tribal identities', 'North-East', 'New states and autonomous councils'],
  ],
  'Table of early tensions: the demand for linguistic states was met by reorganisation from 1956; the Dravidian movement in Tamil Nadu worked through elections, and English continued alongside Hindi; hill and tribal identities in the North-East were met by new states and councils',
);
const vAreas = table(
  ['Region', 'Main issue', 'Period of greatest tension'],
  [
    ['Jammu and Kashmir', 'Status, autonomy, the claim of Pakistan', 'From 1989'],
    ['Punjab', 'Autonomy, later militancy', '1980s to early 1990s'],
    ['North-East', 'Autonomy, secession, migration', '1950s to 1980s'],
  ],
  'Table of three areas of tension: Jammu and Kashmir (status, autonomy and Pakistan\'s claim, from 1989), Punjab (autonomy and later militancy, 1980s to early 1990s) and the North-East (autonomy, secession and migration, 1950s to 1980s)',
);
const vKashmirRoots = flow('TB', ['October 1947: raiders enter the state', 'Maharaja signs the Instrument of Accession', 'Indian army sent; war with Pakistan', 'Part of the state remains under Pakistan\'s control', 'Article 370 gives the state special status'], 'Flow of the roots of the Kashmir issue: raiders enter in October 1947, the Maharaja signs the Instrument of Accession, the Indian army is sent and war follows, part of the state remains under Pakistan\'s control, and Article 370 gives special status', 'How the issue began');
const vDimensions = table(
  ['External dimension', 'Internal dimension'],
  [
    ['Pakistan\'s claim to the region', 'Debate over autonomy and special status'],
    ['Wars and talks between the two countries', 'Different aspirations of Jammu, the valley and Ladakh'],
  ],
  'Table comparing the two dimensions of the Kashmir issue: externally, Pakistan\'s claim and wars and talks between the two countries; internally, debate over autonomy and the different aspirations of Jammu, the valley and Ladakh',
);
const vKashmirPhases = table(
  ['Year', 'Development'],
  [
    ['1948', 'Sheikh Abdullah heads the state government; land reforms'],
    ['1953', 'Abdullah dismissed and detained'],
    ['1974', 'Agreement; Abdullah returns as Chief Minister (1975)'],
    ['1987', 'Assembly election; allegations that it was unfair'],
    ['1989', 'Armed insurgency spreads'],
    ['2002', 'Assembly election widely seen as fair'],
  ],
  'Table of phases in Jammu and Kashmir: 1948 Abdullah heads the government; 1953 dismissed; 1974 agreement and return as Chief Minister; 1987 election with allegations of unfairness; 1989 insurgency; 2002 election widely seen as fair',
);
const vStrands = table(
  ['Strand of separatist politics', 'What it wanted'],
  [
    ['First', 'A separate Kashmiri nation'],
    ['Second', 'Merger with Pakistan'],
    ['Third', 'Greater autonomy for the people of the state within India'],
  ],
  'Table of three strands of separatist politics: a separate Kashmiri nation, merger with Pakistan, and greater autonomy within India',
  'Not one demand but several',
);
const vReadSource = flow('LR', ['Read the heading: who, where, when', 'Spot the event in the background', 'Quote the exact line for "which line" parts', 'Name the concept, then explain it'], 'Flow for answering a source question: read the heading, spot the event in the background, quote the exact line, then name and explain the concept', 'Four steps for a source question');
const vPunjabBack = table(
  ['Year', 'Development'],
  [
    ['1966', 'Punjab reorganised; Haryana and Himachal Pradesh separated'],
    ['1967, 1977', 'Akali Dal leads governments in the state'],
    ['1973', 'Anandpur Sahib Resolution: regional autonomy, federalism'],
    ['Early 1980s', 'Talks fail; a section turns to militancy'],
  ],
  'Table of Punjab\'s background: 1966 reorganisation; Akali Dal governments in 1967 and 1977; the Anandpur Sahib Resolution of 1973 on regional autonomy; failed talks and militancy in the early 1980s',
);
const vCycle = flow('TB', ['Militancy grows in the early 1980s', 'June 1984: Operation Blue Star at the Golden Temple', 'October 1984: Prime Minister Indira Gandhi assassinated', 'Violence against Sikhs in Delhi and elsewhere', 'Deep hurt and distrust'], 'Flow of the cycle of violence in 1984: militancy grows, Operation Blue Star in June, the assassination of Prime Minister Indira Gandhi in October, violence against Sikhs in Delhi and elsewhere, and deep hurt and distrust', 'A tragic year');
const vPeace = flow('LR', ['July 1985: Punjab Accord', 'August 1985: Longowal assassinated', 'Militancy continues; President\'s rule', '1992: elections held', 'Mid-1990s: normal politics returns'], 'Flow of the road to peace in Punjab: the Punjab Accord in July 1985, Longowal assassinated in August 1985, continued militancy and President\'s rule, elections in 1992, and a return to normal politics by the mid-1990s', 'A slow return to peace');
const vAnswer5 = table(
  ['Mark', 'What to write (about 20 words each)'],
  [
    ['1', '1973: Anandpur Sahib Resolution, autonomy'],
    ['2', 'Early 1980s: militancy grows'],
    ['3', '1984: Blue Star; assassination; violence'],
    ['4', '1985 Accord; 1992 elections'],
    ['5', 'Lesson, with a reason'],
  ],
  'Table planning a 5-mark answer on Punjab: one point each on 1973, the early 1980s, 1984, the accord and the 1992 elections, and a lesson with a reason',
  'Five dated points earn five marks',
);
const vSummary1 = table(
  ['Topic', 'Key points'],
  [
    ['Approach', 'Accept diversity; settle demands democratically'],
    ['Jammu and Kashmir', 'Accession 1947; Article 370; insurgency from 1989'],
    ['Punjab', '1973 resolution; 1984; Accord 1985; elections 1992'],
  ],
  'Summary table: India\'s approach accepts diversity; Jammu and Kashmir accession 1947, Article 370 and insurgency from 1989; Punjab 1973 resolution, 1984, Accord 1985 and elections 1992',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Treating every regional demand as secession', 'Most demands seek autonomy or recognition'],
    ['Mixing up 1984 events', 'Blue Star June; assassination October'],
    ['Giving opinions on current politics', 'Stick to dated facts and textbook concepts'],
  ],
  'Table of common mistakes: treating every demand as secession, mixing up the June and October 1984 events, and giving opinions on current politics instead of dated facts',
);
const vSisters = table(
  ['State', 'Became a full state'],
  [
    ['Assam', '1950 (Constitution)'],
    ['Nagaland', '1963'],
    ['Meghalaya, Manipur, Tripura', '1972'],
    ['Mizoram, Arunachal Pradesh', '1987'],
    ['Sikkim (joined India)', '1975'],
  ],
  'Table of the North-Eastern states and when they became full states: Assam from 1950, Nagaland 1963, Meghalaya, Manipur and Tripura 1972, Mizoram and Arunachal Pradesh 1987, and Sikkim, which joined India in 1975',
  'Seven sisters, and Sikkim',
);
const vCouncils = table(
  ['Arrangement', 'What it gives'],
  [
    ['New state', 'A full government for a distinct community or region'],
    ['Autonomous district council', 'Control over land, customs and local matters'],
    ['Special constitutional provisions', 'Protection of local laws and customs'],
  ],
  'Table of arrangements for autonomy: a new state gives a full government; an autonomous district council gives control over land, customs and local matters; special constitutional provisions protect local laws and customs',
);
const vMizo = flow('TB', ['Late 1950s: famine, felt to be poorly handled', 'MNF formed under Laldenga', '1966: armed campaign for independence', '1986: Mizoram Peace Accord', 'Laldenga Chief Minister; statehood in 1987'], 'Flow of the Mizo movement: famine in the late 1950s felt to be poorly handled, the Mizo National Front formed under Laldenga, an armed campaign from 1966, the Peace Accord of 1986, and Laldenga as Chief Minister with statehood in 1987', 'From revolt to accord');
const vNaga = table(
  ['Phase', 'What happened'],
  [
    ['1951', 'Naga National Council under Phizo declares independence'],
    ['1963', 'Nagaland becomes a state'],
    ['Later decades', 'Some armed groups continue; ceasefires and talks'],
  ],
  'Table of the Naga movement: a declaration of independence by the Naga National Council under Phizo in 1951, statehood in 1963, and later decades in which some groups continued while ceasefires and talks took place',
);
const vAssam = flow('TB', ['Fear of migration changing the population balance', '1979: AASU leads the Assam Movement', 'Six years of agitation', '1985: Assam Accord', 'AGP forms the government'], 'Flow of the Assam Movement: fear of migration changing the population balance, the movement led by AASU from 1979, six years of agitation, the Assam Accord in 1985, and the AGP forming the government', 'A movement against outsiders');
const vCompare = table(
  ['Question', 'Mizo movement', 'Assam Movement'],
  [
    ['Aim', 'Independence (at first)', 'Removal of migrants seen as outsiders'],
    ['Method', 'Armed struggle', 'Mass agitation'],
    ['Outcome', '1986 accord; statehood', '1985 accord; AGP government'],
  ],
  'Table comparing the Mizo movement (aim of independence, armed struggle, 1986 accord and statehood) with the Assam Movement (removal of migrants seen as outsiders, mass agitation, 1985 accord and an AGP government)',
  'Same region, different movements',
);
const vLessons = table(
  ['Lesson', 'Example'],
  [
    ['Regional aspirations are normal in a democracy', 'Tamil Nadu: a movement became mainstream politics'],
    ['Dialogue works better than force', 'Mizoram Accord 1986'],
    ['Share power with regions', 'Autonomous councils in tribal areas'],
    ['Attend to regional imbalance', 'Demands for development in Assam'],
  ],
  'Table of four lessons with examples: aspirations are normal (Tamil Nadu), dialogue works (Mizoram Accord), share power (autonomous councils) and attend to imbalance (Assam)',
);
const vFlexible = table(
  ['Constitutional tool', 'Use'],
  [
    ['Parliament can form new states', 'Nagaland, Mizoram and others'],
    ['Sixth Schedule', 'Autonomous councils in tribal areas'],
    ['Special provisions for some states', 'Protection of local customs and land'],
  ],
  'Table of constitutional tools: Parliament can form new states, the Sixth Schedule allows autonomous councils, and special provisions protect local customs and land',
);
const vEval = table(
  ['Step', 'What to do'],
  [
    ['1', 'State your view in one line'],
    ['2', 'Give reasons, each with a case (Mizoram, Punjab, Tamil Nadu)'],
    ['3', 'Avoid opinions on current politics'],
    ['4', 'End with a balanced conclusion'],
  ],
  'Table of four steps for an evaluation question: state a view, give reasons with cases, avoid opinions on current politics, and end with a balanced conclusion',
  'Evaluate with evidence',
);
const vSummary2 = table(
  ['Topic', 'Key points'],
  [
    ['North-East issues', 'Autonomy, secession, outsiders'],
    ['Accords', 'Assam 1985; Mizoram 1986'],
    ['Lessons', 'Dialogue, power-sharing, balance, flexibility'],
  ],
  'Summary table: North-East issues of autonomy, secession and outsiders; the Assam and Mizoram accords; lessons of dialogue, power-sharing, balance and flexibility',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Calling the Assam Movement secessionist', 'It opposed migration; it did not seek independence'],
    ['Dating Mizoram statehood to 1986', 'Accord 1986; statehood 1987'],
    ['Blaming a community', 'Describe events and grievances factually'],
  ],
  'Table of common mistakes: calling the Assam Movement secessionist, dating Mizoram statehood to 1986 instead of 1987, and blaming a community instead of describing events factually',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Regional Aspirations — Part 1: Region and Nation; Jammu and Kashmir; Punjab',
  goals: [
    'Explain India\'s approach to accommodating regional diversity',
    'Explain the roots and phases of the Kashmir issue, including its external and internal dimensions',
    'Trace the Punjab crisis from 1973 to the elections of 1992',
    'Write factual, neutral answers on sensitive regional issues',
  ],
  slides: [
    sl('title', 'Regional Aspirations', {
      b: 'Part 1 — how India approaches **regional diversity**, and the experiences of **Jammu and Kashmir** and **Punjab**.',
      v: vRoute1,
      n: 'India is a land of many regions, each with its own languages, histories and hopes. After independence, some regions asked for more powers, some for new states, and a few groups for separation. In this part we look at how the Indian state approached these demands, and at two of the most difficult cases, Jammu and Kashmir and Punjab.',
    }),
    sl('concept', 'Region and the nation', {
      b: 'India chose to **accept diversity** and to settle regional demands through **democratic politics**, within one nation.',
      v: vApproach,
      n: 'There were several possible ways to deal with regions. A government could treat every demand as a threat, or force one language and culture on everyone. India rejected both. It also did not allow regions to leave the Union. Instead, it accepted diversity and let regions raise their concerns through parties, elections and negotiation, as long as the unity of the nation was respected.',
    }),
    sl('check', 'Quick check: the Indian approach', {
      b: 'Which statement best describes India\'s approach to regional diversity?',
      chk: 'm_approach',
      n: 'Think about what India accepted and what it rejected. Then choose the statement that matches.',
    }),
    sl('concept', 'Early tensions', {
      b: 'Language, identity and the shape of states caused tension in the first decades.',
      v: vEarly,
      n: 'Soon after independence, people in many regions asked for states based on language, and the states were reorganised from 1956. In Tamil Nadu, the Dravidian movement grew into strong parties, and in 1965 there were large protests against making Hindi the only official language. In the North-East, hill communities wanted their own political units. Most of these demands were settled through democratic means.',
    }),
    sl('diagram', 'The range of regional demands', {
      v: vSpectrum,
      n: 'Regional demands are not all the same. Most ask for recognition of a language or culture, or for more powers for a state. Some ask for a separate state or an autonomous council. Only a few seek separation from the country. The Indian approach has been to meet the first kinds of demand through politics and negotiation, while the Constitution does not allow any part of the country to break away.',
    }),
    sl('concept', 'Three areas of tension', {
      v: vAreas,
      n: 'Three regions saw long periods of tension after independence: Jammu and Kashmir, Punjab and the North-East. In each, the issues were different. In Kashmir they concerned status and autonomy, as well as a claim by Pakistan. In Punjab, demands for autonomy were followed by a period of militancy. In the North-East, there were demands for autonomy, secession in some areas, and movements against migration.',
    }),
    sl('concept', 'Roots of the Kashmir issue', {
      b: 'The issue began with the **accession of October 1947** and has **external** and **internal** dimensions.',
      v: vKashmirRoots,
      n: 'At independence, Jammu and Kashmir was a princely state. In October 1947, raiders from the Pakistan side entered the state, and the Maharaja signed the Instrument of Accession to India. The Indian army was sent in, and war followed. Part of the state remained under Pakistan\'s control. Under Article 370, the state was given special status and greater autonomy than other states.',
    }),
    sl('two-column', 'External and internal dimensions', {
      cols: ['**External:** Pakistan has claimed the region since 1947; the two countries have fought wars and held talks.', '**Internal:** debate over the state\'s **autonomy** and status, and the different aspirations of **Jammu, the valley and Ladakh**.'],
      v: vDimensions,
      n: 'Examiners often ask about the two dimensions of the Kashmir issue. The external dimension is the dispute with Pakistan, which has led to wars and many rounds of talks. The internal dimension concerns the status and autonomy of the state within India, and the fact that its three regions, Jammu, the valley and Ladakh, have had different hopes and concerns.',
    }),
    sl('check', 'Quick check: three regions', {
      b: 'Which were the three regions of the former state of Jammu and Kashmir?',
      chk: 'm_three_regions',
      n: 'Recall the three parts of the former state, each with its own languages and concerns.',
    }),
    sl('concept', 'Politics in the state, 1948 to 2002', {
      v: vKashmirPhases,
      n: 'From 1948 Sheikh Abdullah of the National Conference led the state government and carried out land reforms. He was dismissed in 1953. After an agreement in 1974 he returned as Chief Minister. The 1987 assembly election was followed by allegations that it was not fair, which added to resentment. From 1989 armed insurgency spread. In 2002 an election widely described as fair was held.',
    }),
    sl('concept', 'Separatism, and a dated note', {
      b: 'Separatist politics took **several forms**.\n\n*Dated note:* in August 2019, Parliament ended the special status under Article 370 and reorganised the state as two Union Territories, Jammu and Kashmir, and Ladakh. In December 2023 the Supreme Court upheld this change.',
      v: vStrands,
      n: 'Separatist politics in Kashmir was not one demand. Some groups wanted a separate nation, some wanted merger with Pakistan, and others wanted greater autonomy within India. Note one recent dated fact. In August 2019, Parliament ended the special status and reorganised the state into two Union Territories, and in December 2023 the Supreme Court upheld this. We record it as a fact only.',
    }),
    sl('example', 'Worked example 1: reading a source', {
      b: 'A source describes empty classrooms in Srinagar in 1990 and young men who feel their votes do not count.',
      bl: [
        'Step 1 — Heading: Srinagar, 1990.',
        'Step 2 — Background: insurgency from 1989; resentment after the 1987 election.',
        'Step 3 — For "which line" parts, quote the exact words.',
        'Step 4 — Name the concept (alienation, strands of separatism) and explain it.',
      ],
      v: vReadSource,
      n: 'Let us practise with a source. A teacher in Srinagar writes in 1990 that half the class has stopped coming and that young men feel their votes do not count. First, note the place and the date. Second, link it to the background: insurgency from 1989 and resentment after the 1987 election. Third, quote exact lines when asked. Finally, name the concept and explain it in your own words.',
    }),
    sl('check', 'Quick check: Article 370', {
      b: 'True or false? Under Article 370, Jammu and Kashmir had its own constitution.',
      chk: 'tf_370_own_constitution',
      n: 'Recall what made the state\'s position special before 2019.',
    }),
    sl('concept', 'Punjab: the background', {
      b: 'Demands for **autonomy** came first; militancy came later.',
      v: vPunjabBack,
      n: 'In 1966 Punjab was reorganised and Haryana and Himachal Pradesh were separated from it. The Akali Dal, a party that spoke for many Sikhs, led governments in the state in 1967 and 1977. In 1973 it passed the Anandpur Sahib Resolution, which asked for regional autonomy and a stronger federal system. In the early 1980s talks failed, and a section turned to militancy.',
    }),
    sl('diagram', '1984: a tragic year', {
      v: vCycle,
      n: 'Militancy grew in the early 1980s and centred on the Golden Temple complex in Amritsar. In June 1984 the army carried out Operation Blue Star there. In October 1984 Prime Minister Indira Gandhi was assassinated. In the days that followed, many Sikhs were attacked and killed in Delhi and in other places. These events caused deep hurt and distrust, and they must be described carefully and factually.',
    }),
    sl('check', 'Quick check: Operation Blue Star', {
      b: 'In which month and year did Operation Blue Star take place?',
      chk: 'm_bluestar',
      n: 'Two different events of 1984 happened in June and in October. Match the right month to this one.',
    }),
    sl('concept', 'The road to peace', {
      v: vPeace,
      n: 'In July 1985, Prime Minister Rajiv Gandhi and the Akali Dal President, Harchand Singh Longowal, signed the Punjab Accord. It promised Chandigarh to Punjab, a tribunal on river waters and help for victims. Longowal was assassinated a month later, and militancy continued for years under President\'s rule. Elections were held in 1992, and by the mid-1990s normal political life had returned.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer on Punjab', {
      b: 'Question: trace the Punjab crisis from 1973 to 1992 and state a lesson.',
      bl: [
        'Step 1 — Put events in order with dates.',
        'Step 2 — Write one point for each stage (about 20 words).',
        'Step 3 — Describe 1984 factually, without blaming any community.',
        'Step 4 — End with a lesson and a reason.',
      ],
      v: vAnswer5,
      n: 'Here is how to plan a five-mark answer on Punjab. Write five points in time order: the 1973 resolution, the growth of militancy, the events of 1984, the 1985 accord with the 1992 elections, and finally a lesson. Describe the events of 1984 factually and without blaming any community. End with a lesson such as the value of early dialogue.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. India accepts regional diversity and settles demands democratically within one nation. In Jammu and Kashmir, the issue began with the accession of 1947, involves both Pakistan\'s claim and internal debates, and saw insurgency from 1989. In Punjab, the 1973 resolution, the tragic events of 1984, the 1985 accord and the elections of 1992 mark the main stages.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      v: vTips1,
      n: 'Some exam tips. Do not treat every regional demand as a demand for separation; most seek autonomy or recognition. Keep the two events of 1984 apart: Blue Star in June, the assassination in October. In this chapter, stick to dated facts and textbook ideas, and avoid personal opinions on current politics. Neutral, factual answers score best.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Regional Aspirations — Part 2: The North-East and Lessons for Integration',
  goals: [
    'Explain the three kinds of issue in the politics of the North-East',
    'Describe demands for autonomy, secessionist movements and movements against outsiders, with examples',
    'Explain how accords helped bring movements into democratic politics',
    'Draw lessons for accommodation and national integration',
  ],
  slides: [
    sl('title', 'Regional Aspirations: the North-East and lessons', {
      b: 'Part 2 — **autonomy**, **secession** and **outsiders** in the North-East, and the **lessons** of regional movements.',
      v: vRoute2,
      n: 'In this part we travel to the North-East, a region of great diversity that felt cut off from the rest of the country after 1947. We will study three kinds of political issue there: demands for autonomy, secessionist movements and movements against people seen as outsiders. Finally, we ask what India\'s experience of regional movements teaches us about national unity.',
    }),
    sl('diagram', 'The North-Eastern states', {
      v: vSisters,
      n: 'The seven states of the North-East are often called the seven sisters. Assam was a state from the start. Nagaland became a state in 1963; Meghalaya, Manipur and Tripura in 1972; and Mizoram and Arunachal Pradesh in 1987. Sikkim joined India in 1975 and is now counted in the region. After Partition, the region was linked to the rest of India only by a narrow strip of land.',
    }),
    sl('diagram', 'Three kinds of issue', {
      v: vThreeIssues,
      n: 'Politics in the North-East has revolved around three kinds of issue. First, demands for autonomy, which led to new states and autonomous councils. Second, secessionist movements among some groups, which later ended in accords. Third, movements against people seen as outsiders, the best known being the Assam Movement. Let us look at each in turn.',
    }),
    sl('check', 'Quick check: the seven sisters', {
      b: 'Which state is NOT one of the original seven sisters?',
      chk: 'm_seven',
      n: 'Remember that one state joined India later and is now counted in the region.',
    }),
    sl('diagram', 'From new states to peace accords', {
      v: vTimelineNE,
      n: 'This timeline shows how the map and politics of the North-East changed. Nagaland became a state in 1963. The Mizo National Front began an armed campaign in 1966. Meghalaya, Manipur and Tripura became states in 1972. The Assam Movement began in 1979 and ended with an accord in 1985. The Mizoram Accord came in 1986, and Mizoram and Arunachal became states in 1987.',
    }),
    sl('concept', 'Demands for autonomy', {
      b: 'Non-Assamese communities resisted the imposition of **Assamese**; new states and **autonomous councils** followed.',
      v: vCouncils,
      n: 'At independence, much of the region was part of Assam. Many non-Assamese communities felt their identity was threatened when Assamese was imposed, and they demanded their own political units. The result was new states such as Meghalaya. Where a full state was not possible, autonomous district councils were created, giving communities control over land, customs and local matters.',
    }),
    sl('concept', 'Secession: the Mizo movement', {
      v: vMizo,
      n: 'In the late 1950s a famine struck the Mizo hills, and many Mizos felt the government of Assam did not handle it well. The Mizo National Front was formed under Laldenga and in 1966 began an armed campaign for independence. After two decades of conflict, the Mizoram Peace Accord was signed in 1986. Laldenga became Chief Minister, and Mizoram became a state in 1987.',
    }),
    sl('concept', 'The Naga movement', {
      v: vNaga,
      n: 'Among the Nagas, a section of leaders under the Naga National Council declared independence in 1951. Nagaland became a state in 1963, but some armed groups continued their struggle. In later decades there were ceasefires and long negotiations. The Naga case shows that some regional questions take a long time to settle, and that talks continue over many years.',
    }),
    sl('check', 'Quick check: the Mizoram Accord', {
      b: 'What did the Mizoram Peace Accord of 1986 achieve?',
      chk: 'm_mizo_accord',
      n: 'Think about what happened to the armed struggle, to its leader and to the status of Mizoram.',
    }),
    sl('concept', 'Movements against outsiders: Assam', {
      v: vAssam,
      n: 'In Assam, many local people feared that migration, especially of people believed to have come from Bangladesh without documents, would change the population balance and reduce their access to land and jobs. From 1979 the All Assam Students\' Union led a six-year movement. It ended with the Assam Accord of 1985. Its leaders formed the Asom Gana Parishad, which won the state election.',
    }),
    sl('example', 'Worked example 1: comparing two movements', {
      b: 'Question: how was the Assam Movement different from the Mizo movement?',
      bl: [
        'Step 1 — Compare the aims.',
        'Step 2 — Compare the methods.',
        'Step 3 — Compare the outcomes, with dates.',
      ],
      v: vCompare,
      n: 'Here is a model comparison. The Mizo movement at first aimed at independence and used armed struggle; it ended in the 1986 accord and statehood. The Assam Movement aimed at removing migrants it saw as outsiders and used mass agitation; it ended in the 1985 accord and an AGP government. A good comparison sets the aims, methods and outcomes side by side.',
    }),
    sl('check', 'Quick check: chronology', {
      b: 'Arrange the events in chronological order.',
      chk: 'ord_events',
      n: 'Use the decades as anchors: the sixties, the seventies, and the middle of the eighties.',
    }),
    sl('diagram', 'Jammu and Kashmir and Punjab: key years', {
      v: vTimelineNorth,
      n: 'Before we draw lessons, recall the key years from Part 1. The accession of Jammu and Kashmir in 1947. The Anandpur Sahib Resolution of 1973. Operation Blue Star in 1984 and the Punjab Accord in 1985. Insurgency in the Kashmir valley from 1989, and elections in Punjab in 1992. Comparing these with the North-East helps us see common lessons.',
    }),
    sl('concept', 'Lessons for national integration', {
      v: vLessons,
      n: 'What does all this teach us? First, regional aspirations are a normal part of democracy. Second, dialogue works better than force, as the Mizoram Accord shows. Third, regions and smaller groups need a real share in power, for example through autonomous councils. Fourth, regional economic imbalance must be addressed, or backward regions will feel neglected.',
    }),
    sl('concept', 'A flexible Constitution', {
      v: vFlexible,
      n: 'The Constitution has helped. Parliament can create new states, as it did for Nagaland and Mizoram. The Sixth Schedule allows autonomous councils in tribal areas. Some states have special provisions that protect their customs and land. This flexibility shows that national unity in India has been built through accommodation rather than uniformity.',
    }),
    sl('check', 'Quick check: power-sharing', {
      b: 'A smaller region complains that its voice is never heard. Which lesson applies?',
      chk: 'm_power_sharing',
      n: 'Ask which lesson is about giving groups a real share in decisions.',
    }),
    sl('example', 'Worked example 2: an evaluation question', {
      b: 'Question: "Regional aspirations are not a threat to national unity." Evaluate.',
      bl: [
        'Step 1 — State your view in one line.',
        'Step 2 — Give reasons, each backed by a case.',
        'Step 3 — Stay factual; avoid opinions on current politics.',
        'Step 4 — Close with a balanced conclusion.',
      ],
      v: vEval,
      n: 'For an evaluation question, begin with a clear view, such as: largely true. Then give reasons backed by cases. Tamil Nadu shows a regional movement working within democracy; Mizoram shows dialogue ending an armed conflict; the 1980s show how delay can deepen distrust. Stay factual and close with a balanced conclusion.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. The North-East has seen demands for autonomy, secessionist movements and movements against outsiders. Accords in Assam in 1985 and Mizoram in 1986 brought movements into democratic politics. The main lessons are dialogue, power-sharing, attention to regional imbalance and the flexibility of the Constitution.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      v: vTips2,
      n: 'Some final tips. The Assam Movement opposed migration; it did not seek independence. Mizoram\'s accord was signed in 1986, but statehood came in 1987. Never blame a community; describe events and grievances factually. In source questions, quote exact lines, and in long answers, back each point with a dated example.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Regional Aspirations — Notes',
  sections: [
    {
      h: '1. Region and the nation',
      t: 1,
      b: 'India is a land of many regions, languages and cultures. After 1947 the Indian state chose to **accept diversity** and to handle regional demands through **democratic politics**: parties, elections, negotiation and, where needed, new states or councils. It rejected both **forced uniformity** and a **right to secede**.\n\n**Early tensions:** demands for **linguistic states** (states reorganised from 1956); the **Dravidian movement** in Tamil Nadu, which turned into strong electoral parties and led protests in **1965** against making Hindi the sole official language; hill and tribal identities in the North-East.\n\nThree regions saw long periods of tension: **Jammu and Kashmir, Punjab and the North-East**.',
      terms: [
        ['Regional aspiration', 'A demand by people of a region for recognition, more powers, a separate state or a fairer share of resources.'],
        ['Autonomy', 'The power of a region or group to govern its own affairs within a larger country.'],
      ],
      v: vApproach,
      vs: [vSpectrum],
    },
    {
      h: '2. Jammu and Kashmir',
      t: 2,
      b: '**Roots:** in **October 1947** raiders from the Pakistan side entered the state; the Maharaja signed the **Instrument of Accession**; war followed and a part of the state remained under Pakistan\'s control. **Article 370** gave the state special status and its own constitution.\n\n**Two dimensions:** **external** (Pakistan\'s claim, wars and talks) and **internal** (autonomy and status; the different aspirations of **Jammu, the valley and Ladakh**).\n\n**Phases:** Sheikh Abdullah (National Conference) led the government from **1948**, carried out land reforms and was dismissed in **1953**; returned after the **1974** agreement; allegations about the fairness of the **1987** election; armed insurgency from **1989**; an election widely seen as fair in **2002**.\n\n**Separatism** took three forms: a separate nation, merger with Pakistan, or more autonomy within India.\n\n*Dated note:* Parliament ended the special status in August 2019 and created two Union Territories (Jammu and Kashmir; Ladakh); the Supreme Court upheld this in December 2023.',
      terms: [
        ['Instrument of Accession', 'The document by which a princely ruler joined his state to India.'],
        ['Article 370', 'The constitutional provision that gave Jammu and Kashmir special status until 2019.'],
      ],
      v: vKashmirRoots,
      vs: [vDimensions, vKashmirPhases],
    },
    {
      h: '3. Punjab',
      t: 2,
      b: '- **1966:** Punjab reorganised; Haryana and Himachal Pradesh separated.\n- **Akali Dal** governments in **1967** and **1977**.\n- **1973:** the **Anandpur Sahib Resolution** asked for regional autonomy and a stronger federal system.\n- **Early 1980s:** talks failed; a section turned to **militancy**, centred on the Golden Temple complex.\n- **June 1984:** **Operation Blue Star**. **October 1984:** Prime Minister **Indira Gandhi assassinated**; violence against Sikhs in Delhi and other places followed.\n- **July 1985:** **Punjab Accord** (Rajiv Gandhi–Longowal): Chandigarh to Punjab, a commission on boundaries, a tribunal on Ravi–Beas waters, compensation. Longowal was assassinated in August 1985.\n- Militancy continued under President\'s rule; **elections in 1992**; normal politics by the mid-1990s.',
      terms: [
        ['Anandpur Sahib Resolution', 'The Akali Dal\'s 1973 resolution for regional autonomy and federalism.'],
        ['Punjab Accord', 'The 1985 agreement between Rajiv Gandhi and Harchand Singh Longowal.'],
      ],
      v: vPunjabBack,
      vs: [vCycle, vPeace],
    },
    {
      h: '4. The North-East: autonomy and secession',
      t: 3,
      b: 'Seven states, often called the **seven sisters**, plus **Sikkim** (joined India in **1975**). After Partition the region was linked to India by a **narrow corridor** and lost old trade routes.\n\n**Autonomy:** non-Assamese groups resisted the imposition of Assamese; new states (**Nagaland 1963; Meghalaya, Manipur, Tripura 1972; Mizoram, Arunachal 1987**) and **autonomous councils**.\n\n**Secession:** the **Mizo National Front** under **Laldenga** began an armed campaign in **1966** after a famine that many felt was poorly handled; the **Mizoram Peace Accord (1986)** made Laldenga Chief Minister and Mizoram a state in 1987. Among the Nagas, the Naga National Council under **Phizo** declared independence in **1951**; some groups continued after statehood, with later ceasefires and talks.',
      terms: [
        ['Autonomous district council', 'A local body with powers over land, customs and local matters in tribal areas.'],
        ['Secession', 'The breaking away of a region to form a separate country.'],
      ],
      v: vSisters,
      vs: [vThreeIssues, vMizo, vNaga],
    },
    {
      h: '5. The North-East: movements against outsiders',
      t: 3,
      b: 'Many local communities feared that **migration** would change the population balance and take away **land, jobs and political power**.\n\nThe **Assam Movement (1979–85)**, led by the **All Assam Students\' Union (AASU)**, demanded the detection and removal of migrants it regarded as illegal, especially those believed to have come from Bangladesh, and also raised concerns about the state\'s development. It did **not** seek independence. It ended with the **Assam Accord (1985)**; its leaders formed the **Asom Gana Parishad**, which won the 1985 election. The migration question remained politically sensitive.',
      terms: [
        ['AASU', 'All Assam Students\' Union, which led the Assam Movement.'],
        ['Assam Accord', 'The 1985 agreement that ended the Assam Movement.'],
      ],
      v: vAssam,
      vs: [vCompare, vTimelineNE],
    },
    {
      h: '6. Accommodation and national integration',
      t: 4,
      b: '1. **Regional aspirations are normal** in a democracy and are not anti-national in themselves.\n2. **Dialogue works better than suppression**: the accords in Punjab, Assam and Mizoram brought movements into electoral politics.\n3. **Power-sharing**: regions and smaller groups need a real voice, at the Centre and within states.\n4. **Regional imbalance** must be addressed so that no region feels neglected.\n5. **Flexibility**: Parliament can form new states; the **Sixth Schedule** and special provisions protect local customs and land.\n\nIndia\'s unity has been built through **accommodation, not uniformity**; regional parties have often shared power at the Centre.',
      terms: [
        ['Sixth Schedule', 'The part of the Constitution that provides for autonomous councils in some tribal areas.'],
        ['Power-sharing', 'Giving different regions and groups a real share in decision-making.'],
      ],
      v: vLessons,
      vs: [vFlexible, vTimelineNorth],
    },
  ],
  tips: '**Common mistakes**\n- Treating every regional demand as secession; most seek autonomy or recognition.\n- Confusing **June 1984** (Operation Blue Star) with **October 1984** (assassination of Indira Gandhi).\n- Calling the Assam Movement secessionist; it opposed migration.\n- Dating Mizoram\'s statehood to 1986; the accord was 1986, statehood **1987**.\n- Giving personal opinions on current politics, or blaming any community.\n\n**How marks are usually awarded**\n- 1-mark MCQ and assertion-reason: one correct option.\n- 2 marks: two points (about 30–50 words).\n- 3 marks: three distinct points (about 50–80 words).\n- 5 marks: five dated points (about 80–120 words), ending with a judgement or lesson where asked.\n- Source-based (4 marks): quote exact lines where asked; name the concept, then explain it.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['India\'s approach to regions', 'Accept **diversity**; settle demands **democratically** within one nation.', 'concept', 1],
  ['What did India reject in dealing with regions?', 'Forced **uniformity** and a **right to secede**.', 'concept', 1],
  ['**Regional aspiration**', 'A demand by a region for recognition, more powers, a new state or a fairer share of resources.', 'definition', 1],
  ['Tamil Nadu, 1965', 'Protests against making **Hindi** the sole official language; the Dravidian movement worked through **elections**.', 'fact', 1],
  ['Three areas of tension', '**Jammu and Kashmir, Punjab, the North-East**.', 'fact', 1],
  ['Accession of Jammu and Kashmir', '**October 1947**, after raiders from the Pakistan side entered the state.', 'fact', 2],
  ['**Article 370**', 'Gave Jammu and Kashmir **special status** and its own constitution (until 2019).', 'definition', 2],
  ['External vs internal dimension of Kashmir', 'External: **Pakistan\'s claim**. Internal: **autonomy** and the hopes of Jammu, the valley and Ladakh.', 'concept', 2],
  ['Sheikh Abdullah', 'National Conference leader; headed the government from **1948**; dismissed **1953**; returned after **1974**.', 'fact', 2],
  ['Insurgency in the Kashmir valley', 'From **1989**, after resentment including over the **1987** election.', 'fact', 2],
  ['Three strands of separatism in Kashmir', 'Separate nation; merger with Pakistan; more autonomy within India.', 'concept', 2],
  ['Dated note: 2019', 'Special status ended; two Union Territories (J&K, Ladakh); upheld by the Supreme Court in **December 2023**.', 'fact', 2],
  ['**Anandpur Sahib Resolution**', 'Akali Dal, **1973**: regional autonomy and a stronger federal system.', 'definition', 2],
  ['Operation Blue Star', '**June 1984**, at the **Golden Temple**, Amritsar.', 'fact', 2],
  ['October 1984', 'Prime Minister **Indira Gandhi assassinated**; violence against Sikhs in Delhi and elsewhere.', 'fact', 2],
  ['Punjab Accord', '**July 1985**, Rajiv Gandhi and **Harchand Singh Longowal**: Chandigarh, river waters tribunal, compensation.', 'fact', 2],
  ['Elections in Punjab after militancy', '**1992**; normal politics by the mid-1990s.', 'fact', 2],
  ['Seven sisters', 'Assam, Arunachal, Manipur, Meghalaya, Mizoram, Nagaland, Tripura (Sikkim joined India in **1975**).', 'fact', 3],
  ['Three issues in the North-East', '**Autonomy**, **secession**, movements against **outsiders**.', 'concept', 3],
  ['Why new hill states?', 'Non-Assamese groups resisted the imposition of **Assamese**.', 'concept', 3],
  ['Nagaland became a state', '**1963**.', 'fact', 3],
  ['Mizo National Front', 'Led by **Laldenga**; armed campaign from **1966**.', 'fact', 3],
  ['Mizoram Peace Accord', '**1986**; Laldenga Chief Minister; statehood **1987**.', 'fact', 3],
  ['Naga National Council', 'Under **Phizo**; declared independence in **1951**; later ceasefires and talks.', 'fact', 3],
  ['Assam Movement', '**1979–85**, led by **AASU**, against migrants seen as outsiders; not secessionist.', 'fact', 3],
  ['Assam Accord and after', '**1985**; leaders formed the **Asom Gana Parishad**, which won the election.', 'fact', 3],
  ['Lessons of regional movements', 'Aspirations are normal; dialogue; power-sharing; attend to imbalance; flexibility.', 'concept', 4],
  ['**Sixth Schedule**', 'Provides for **autonomous councils** in some tribal areas.', 'definition', 4],
  ['Why is Mizoram called a successful accord?', 'The armed group **joined electoral politics** and peace held.', 'exam-tip', 4],
  ['Answering on sensitive topics', 'Use **dated facts**, neutral words; never blame a community.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Regional Aspirations',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_accession', 'm_mnf', 'm_lesson_democracy', 'ar_kashmir_dimensions'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_370', 's_ne_issues', 's3_assam'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_kashmir', 'l_northeast'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_aizawl_letter'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Regional Aspirations',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dravidian', 'm_art370', 'm_anandpur', 'm_punjab_accord', 'm_meghalaya', 'm_naga', 'm_assam_accord', 'm_flexible', 'ar_punjab_1992', 'ar_mizo'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_punjab_accord', 's_lessons', { attempt: 1, keys: ['s_kashmir_external', 's_mizo_accord'] }, 's3_punjab_causes', { attempt: 1, keys: ['s3_dravidian', 's3_integration'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_punjab', { attempt: 1, keys: ['l_lessons', 'l_compare'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_ludhiana_report', 'sb_guwahati_diary'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-political-science-ch14 only (region and the nation; Jammu and Kashmir and Punjab; the North-East; accommodation and national integration)',
    originality: 'every source and scenario is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    facts: `chronology ${EVENTS.map(([y, t]) => `${y} ${t}`).join('; ')}; new states 1963, 1972, 1987; Sikkim 1975; Tamil Nadu protests 1965; Abdullah 1948, 1953, 1974; 2002 election; 2019 change stated once as a dated fact (Supreme Court December 2023); nothing else after 2014`,
    neutrality: 'communities never blamed; 1984 events described factually and humanely; Kashmir and the North-East stated neutrally; no opinion on contested current politics',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
