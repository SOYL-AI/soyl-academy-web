// Build CBSE 12 Political Science ch09 Era of One-Party Dominance. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch09', 'social-science');
const { FPTP, TOTAL, VOTES, SEATS, VOTE_PCT, SEAT_PCT, GAP_P } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
const EVENTS = [
  [1950, 'Election Commission', 'set up (January)'],
  [1951, 'Jana Sangh founded', ''],
  [1952, 'First Lok Sabha', 'after polls of 1951–52'],
  [1957, 'Second election', 'CPI wins Kerala'],
  [1959, 'Swatantra founded', 'Kerala govt dismissed'],
  [1962, 'Third election', 'Congress majority'],
  [1964, 'CPI splits', 'CPI(M) formed'],
];
const vTimeline = (() => {
  const s = new Svg(720, 290);
  const X = (y) => 110 + ((y - 1950) / (1965 - 1950)) * 540;
  const AX = 145;
  s.arrow(30, AX, 700, AX, { sw: 1.8 });
  for (const yr of [1950, 1955, 1960, 1965]) {
    s.line(X(yr), AX - 6, X(yr), AX + 6, { sw: 1.2, color: 'muted' });
  }
  const LEVEL = [26, 76, 214, 264];
  EVENTS.forEach(([yr, a, b], i) => {
    const y = LEVEL[i % 4];
    const up = y < AX;
    s.dot(X(yr), AX, 5, 'accent');
    s.line(X(yr), AX, X(yr), up ? y + 26 : y - 30, { sw: 1.2, color: 'accent' });
    s.text(X(yr), y - (up ? 0 : 14), `${yr}: ${a}`, { bold: true, size: 12 });
    if (b) s.text(X(yr), y + (up ? 16 : 2), b, { size: 11 });
  });
  return s.visual(
    'Timeline from 1950 to 1965: Election Commission set up in 1950; Bharatiya Jana Sangh founded in 1951; first Lok Sabha in 1952 after the polls of 1951 to 1952; second general election in 1957, when the CPI won Kerala; Swatantra Party founded and the Kerala government dismissed in 1959; third general election in 1962; the CPI split in 1964',
    'The era of one-party dominance at a glance',
  );
})();

const vBars = (() => {
  const s = new Svg(660, 300);
  const c = s.chart({ x0: 0, x1: 3, y0: 0, y1: 100, left: 70, top: 30, width: 540, height: 210, yLabel: 'Per cent', xLabel: 'Party' });
  ['P', 'Q', 'R'].forEach((p, i) => {
    const x = i + 0.5;
    const w = 0.16;
    const bar = (x0, v, color) => {
      if (v > 0) s.rect(c.X(x0), c.Y(v), c.X(x0 + w) - c.X(x0), c.Y(0) - c.Y(v), { rx: 2, sw: 1.2, color, fill: color === 'accent' ? 'accent' : 'muted', fillOpacity: 0.55 });
      s.text(c.X(x0 + w / 2), c.Y(v) - 10, `${v}%`, { size: 12 });
    };
    bar(x - 0.2, VOTE_PCT[p], 'muted');
    bar(x + 0.04, SEAT_PCT[p], 'accent');
    c.xTick(x, `Party ${p}`);
  });
  [0, 50, 100].forEach((v) => c.yTick(v, String(v)));
  s.rect(440, 8, 14, 12, { rx: 2, sw: 1, color: 'muted', fill: 'muted', fillOpacity: 0.55 });
  s.text(460, 14, 'Vote share', { anchor: 'start', size: 12 });
  s.rect(540, 8, 14, 12, { rx: 2, sw: 1, color: 'accent', fill: 'accent', fillOpacity: 0.55 });
  s.text(560, 14, 'Seat share', { anchor: 'start', size: 12 });
  return s.visual(
    `Bar chart for the imagined state Sonpradesh: Party P has ${VOTE_PCT.P} per cent of votes and ${SEAT_PCT.P} per cent of seats; Party Q has ${VOTE_PCT.Q} per cent of votes and ${SEAT_PCT.Q} per cent of seats; Party R has ${VOTE_PCT.R} per cent of votes and no seats`,
    'Imagined figures, computed by the build: first-past-the-post magnifies the lead of the largest party.',
  );
})();

const vUmbrella = (() => {
  const s = new Svg(680, 300);
  s.rect(20, 14, 440, 270, { sw: 2, color: 'accent', fill: 'fill' });
  s.text(240, 38, 'The Congress in the 1950s', { bold: true, color: 'accent' });
  const inner = [
    [40, 60, 'Socialists'], [250, 60, 'Conservatives'],
    [40, 130, 'Farmers and peasants'], [250, 130, 'Traders and industrialists'],
    [40, 200, 'Many castes and religions'], [250, 200, 'Every region'],
  ];
  for (const [x, y, t] of inner) {
    s.rect(x, y, 190, 50, { sw: 1.4 });
    s.text(x + 95, y + 25, t, { size: 13 });
  }
  s.text(240, 268, 'Factions argue inside; compromise in the middle', { size: 12, muted: true });
  s.text(570, 38, 'Outside: small parties', { bold: true, size: 13 });
  ['Socialist Party', 'CPI', 'Jana Sangh', 'Swatantra'].forEach((t, i) => {
    s.rect(490, 60 + i * 52, 160, 38, { sw: 1.2, color: 'muted' });
    s.text(570, 79 + i * 52, t, { size: 13 });
  });
  return s.visual(
    'Diagram: a large box labelled the Congress in the 1950s holds six groups — socialists, conservatives, farmers and peasants, traders and industrialists, many castes and religions, and every region — with factions arguing inside and compromising in the middle; outside it stand four small parties: the Socialist Party, the CPI, the Jana Sangh and Swatantra',
    'A social and ideological coalition, with a small opposition outside',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Why 1951–52 was a test', 'The Election Commission', 'Voting with symbols', 'Three elections', 'Seats and votes', 'Kerala 1957'], 'Route map of Part 1: why the first election was a test, the Election Commission, voting with symbols, the three elections, seats and votes, and Kerala in 1957', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['What dominance means', 'A coalition party', 'Factions', 'Why the opposition mattered', 'Four opposition parties'], 'Route map of Part 2: what dominance means, the Congress as a coalition, factions, why the opposition mattered, and four early opposition parties', 'Part 2 at a glance');
const vTest = table(
  ['Challenge in 1951', 'How it was met'],
  [
    ['About 17 crore adults, most voting for the first time', 'Electoral rolls prepared and constituencies drawn'],
    ['Most voters could not read', 'A symbol for each candidate'],
    ['A vast country with poor roads', 'Polling spread over several months'],
    ['Doubts at home and abroad', 'Peaceful polls; results accepted by losers'],
  ],
  'Table of the challenges of the first election and responses: a huge new electorate met by rolls and constituencies; non-literate voters met by symbols; a vast country met by polling over months; doubts met by peaceful polls whose results losers accepted',
  'Figures are approximate.',
);
const vMethod = table(
  ['Stage', 'What a voter saw'],
  [
    ['1951–52 and 1957', 'A separate box for each candidate, marked with a symbol'],
    ['From 1962', 'One ballot paper with all names and symbols, marked with a stamp'],
    ['From the late 1990s', 'Electronic voting machines; used across the country by 2004'],
  ],
  'Table of voting methods: separate boxes with symbols in the first two elections; one ballot paper with names and symbols later; electronic voting machines from the late 1990s, used across the country by 2004',
);
const vThree = table(
  ['Election', 'Congress at the Centre', 'Note'],
  [
    ['1951–52', 'About three-quarters of Lok Sabha seats', 'Vote share under half'],
    ['1957', 'Again about three-quarters of seats', 'Kerala elects a communist government'],
    ['1962', 'Again a large majority', 'Opposition still divided'],
  ],
  'Table of the first three elections: in 1951 to 1952, 1957 and 1962 the Congress won roughly three-quarters of Lok Sabha seats with under half of the votes; Kerala elected a communist government in 1957; the opposition remained divided',
  'Shares are rounded and approximate.',
);
const vFptpFlow = flow('LR', ['Many candidates in one constituency', 'Most votes wins (not necessarily a majority)', 'Repeated in every constituency', 'Largest party can win far more seats than its vote share'], 'Flow: many candidates contest a constituency; the one with the most votes wins even without a majority; this repeats in every constituency; so the largest party can win far more seats than its share of votes', 'First-past-the-post');
const vSon = table(
  ['Constituency', 'P', 'Q', 'R', 'Winner'],
  [
    ...FPTP.map((c) => [c.seat, String(c.P), String(c.Q), String(c.R), ['P', 'Q', 'R'].reduce((a, b) => (c[b] > c[a] ? b : a), 'P')]),
    ['**Total votes**', `**${VOTES.P}**`, `**${VOTES.Q}**`, `**${VOTES.R}**`, `**P ${SEATS.P}, Q ${SEATS.Q}, R ${SEATS.R}**`],
  ],
  `Table of votes in thousands in five imagined constituencies of Sonpradesh; totals P ${VOTES.P}, Q ${VOTES.Q}, R ${VOTES.R}; P wins ${SEATS.P} seats, Q wins ${SEATS.Q}, R none`,
  'Imagined state; votes in thousands.',
);
const vKerala = table(
  ['Year', 'Event'],
  [
    ['1957', 'CPI wins the Kerala assembly election; E. M. S. Namboodiripad becomes Chief Minister'],
    ['1957–59', 'Land and education reforms proposed; strong protests by opponents'],
    ['1959', 'Centre dismisses the government under Article 356 (President\'s Rule)'],
  ],
  'Table on Kerala: in 1957 the CPI won and E. M. S. Namboodiripad became Chief Minister; reforms and protests followed; in 1959 the Centre dismissed the government under Article 356',
);
const vPlan5 = table(
  ['Point', 'Content for the first-election answer'],
  [
    ['1', 'Who ran it: Election Commission (1950), Sukumar Sen'],
    ['2', 'Scale: about 17 crore adults, new rolls'],
    ['3', 'Method: symbols, separate boxes, months of polling'],
    ['4', 'Outcome: peaceful; results accepted'],
    ['5', 'Meaning: adult franchise can work in a poor, non-literate society'],
  ],
  'Planning table for a five-mark answer on the first election: who ran it, scale, method, outcome and meaning',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Election Commission', 'Set up 1950; first CEC Sukumar Sen'],
    ['First election', '1951–52; symbols and separate boxes'],
    ['Three elections', '1952, 1957, 1962: about three-quarters of seats for Congress'],
    ['Seats and votes', 'First-past-the-post plus a divided opposition'],
    ['Kerala', 'CPI government 1957; dismissed 1959 (Article 356)'],
  ],
  'Summary table of Part 1: the Election Commission and Sukumar Sen, the first election and symbols, three elections, seats versus votes, and Kerala',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['"India was a one-party state"', 'One party was dominant in free, competitive elections'],
    ['"Congress won a majority of votes"', 'It won most seats with less than half of the votes'],
    ['"Swatantra fought the 1952 election"', 'Swatantra was founded in 1959'],
  ],
  'Exam tips table: India was dominant-party, not one-party; the Congress won most seats with under half the votes; Swatantra was founded only in 1959',
);
const vDominance = table(
  ['', 'Dominant-party democracy', 'One-party system'],
  [
    ['Other parties', 'Legal, contest and criticise', 'Not allowed'],
    ['Elections', 'Free and competitive', 'No real choice'],
    ['India 1952–67', 'Yes', 'No'],
  ],
  'Comparison table: in a dominant-party democracy other parties are legal and elections free; in a one-party system other parties are banned; India from 1952 to 1967 was the first kind',
);
const vFaction = flow('LR', ['Two groups disagree inside the party', 'They argue in party forums', 'A middle-ground compromise', 'Both stay; party keeps wide support'], 'Flow: two groups disagree inside the party, argue in party forums, reach a middle-ground compromise, and both stay so the party keeps wide support', 'How factions were managed');
const vReadSrc = table(
  ['Step', 'What to look for'],
  [
    ['1', 'Who wrote it and when (an imagined letter of 1956)'],
    ['2', 'Words that signal a concept: "two camps", "middle", "three castes"'],
    ['3', 'Name the concept: factions, compromise, social coalition'],
    ['4', 'Quote the line and explain in one sentence'],
  ],
  'Four steps to read a source: who and when, signal words, name the concept, quote and explain',
);
const vOppRole = table(
  ['Role', 'What it did in the 1950s'],
  [
    ['Watchdog', 'Questioned policies in Parliament and outside'],
    ['Alternatives', 'Kept other economic and social programmes alive'],
    ['Safety valve', 'Gave dissatisfied people a democratic outlet'],
    ['Training ground', 'Prepared leaders for later decades'],
  ],
  'Table of roles of the opposition: watchdog, alternatives, safety valve and training ground',
);
const vParties = table(
  ['Party', 'Origin', 'Main ideas'],
  [
    ['Socialist Party', 'From the Congress Socialist Party (1934); separate from 1948', 'Democratic socialism; equality'],
    ['Communist Party of India', 'Communist groups from the 1920s', 'Marxism-Leninism; workers and peasants'],
    ['Bharatiya Jana Sangh', '1951, Syama Prasad Mukherjee', 'National and cultural unity; Hindi'],
    ['Swatantra Party', '1959, C. Rajagopalachari and others', 'Free enterprise; less state control'],
  ],
  'Table of four early opposition parties with origins and ideas: Socialist Party, Communist Party of India, Bharatiya Jana Sangh and Swatantra Party',
);
const vRightLeft = table(
  ['', 'Bharatiya Jana Sangh', 'Swatantra Party'],
  [
    ['Founded', '1951', '1959'],
    ['Main concern', 'National and cultural unity', 'Economic freedom'],
    ['Economy', 'Less central to its programme', 'Free enterprise, fewer controls'],
    ['Support', 'Parts of the north', 'Landowners, industrialists, some princely families'],
  ],
  'Comparison table of the Jana Sangh and Swatantra: founding years 1951 and 1959; cultural unity versus economic freedom; their economic positions; and their support bases',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Dominance', 'Won free elections; not a one-party state'],
    ['Coalition', 'Social and ideological; factions tolerated'],
    ['Opposition', 'Few seats but real influence'],
    ['Four parties', 'Socialists, CPI, Jana Sangh, Swatantra'],
  ],
  'Summary table of Part 2: dominance through free elections, the Congress as a coalition with factions, the role of the opposition, and four opposition parties',
);
const vTips2 = table(
  ['How marks are awarded', 'Tip'],
  [
    ['1 mark', 'One correct option or term'],
    ['2–3 marks', 'One point per mark, each explained'],
    ['5 marks', 'Five numbered points; for "evaluate", give both sides and a conclusion'],
    ['Source', 'Quote the line, name the concept, explain'],
  ],
  'Exam tips table on how marks are awarded for one-mark, short, five-mark and source questions',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Era of One-Party Dominance — Part 1: The First Three Elections',
  goals: [
    'Explain why India\'s first general election was a test for democracy and how it was organised',
    'Describe the role of the Election Commission and the use of symbols',
    'Compare the results of the 1952, 1957 and 1962 elections',
    'Explain how first-past-the-post gave the Congress more seats than votes',
  ],
  slides: [
    sl('title', 'Era of One-Party Dominance', {
      b: 'Part 1 — the **first three general elections** and how one party came to dominate.',
      v: vRoute1,
      n: 'Imagine organising an election in which about seventeen crore people vote, most of them for the first time, and most of them cannot read. That was India in 1951. In this part we see how the country met that challenge, what the first three elections produced, and why one party won so many seats.',
    }),
    sl('concept', 'Why 1951 was a test', {
      b: 'India gave **every adult** the vote at once, in a poor and largely non-literate society.',
      v: vTest,
      n: 'Many observers doubted that a poor country, where most people could not read, could hold a free election with every adult voting. The table shows each challenge and how it was met: new electoral rolls, symbols for candidates, polling spread over months, and finally a peaceful result that the losers accepted.',
    }),
    sl('concept', 'The Election Commission', {
      b: 'Set up in **January 1950**. The first **Chief Election Commissioner** was **Sukumar Sen**.',
      bl: ['Prepared electoral rolls and drew constituencies', 'Trained lakhs of polling staff', 'Polling ran from late 1951 into early 1952'],
      n: 'The Election Commission was created in January 1950, just as the Constitution came into force. Its first head, Sukumar Sen, had to prepare voter lists, draw constituency boundaries and train lakhs of staff. Because the task was so large, voting was spread over several months, which is why we call it the election of 1951 to 1952.',
    }),
    sl('diagram', 'The era at a glance', {
      v: vTimeline,
      n: 'This timeline covers the whole chapter. The Election Commission comes first, in 1950. The Jana Sangh is founded in 1951 and the first Lok Sabha meets in 1952. In 1957 Kerala elects a communist government. In 1959 the Swatantra Party is founded and the Kerala government is dismissed. The third election follows in 1962, and the communists split in 1964.',
    }),
    sl('check', 'Quick check: why the doubts?', {
      b: 'Why did many observers doubt that India could hold a free election in 1951?',
      chk: 'm_uaf',
      n: 'Think about who was being given the vote, and what the country was like at the time.',
    }),
    sl('concept', 'Voting when most could not read', {
      b: 'Each candidate had a **symbol**; voters put the ballot in the box with that symbol.',
      v: vMethod,
      n: 'How do you vote if you cannot read names? In the first two elections, each candidate had a separate box marked with a symbol, such as a lamp or a pair of bullocks. Later a single ballot paper carried all names and symbols. From the late 1990s electronic voting machines came in, and by 2004 they were used all over the country.',
    }),
    sl('check', 'Quick check: symbols', {
      b: 'Which arrangement helped non-literate voters in the early elections?',
      chk: 'm_symbols',
      n: 'Look for the option that keeps the vote both correct and secret.',
    }),
    sl('concept', 'A peaceful verdict', {
      b: 'The polls were **peaceful**, turnout was reasonable, and **losers accepted** the result.',
      bl: ['Democracy was shown to work in a poor country', 'The Congress won a large majority', 'Jawaharlal Nehru continued as Prime Minister'],
      n: 'The election passed off peacefully and its results were accepted, including by those who lost. That acceptance matters as much as the voting itself. The Congress won a big majority and Jawaharlal Nehru continued as Prime Minister. The world saw that adult franchise could work even where poverty and illiteracy were widespread.',
    }),
    sl('diagram', 'Three elections, one pattern', {
      v: vThree,
      n: 'Look at the three elections side by side. Each time the Congress won roughly three-quarters of the seats in the Lok Sabha. Yet its share of votes stayed below half. Kerala in 1957 was the notable exception at the state level. Why should seats and votes differ so much? The next slides answer that question.',
    }),
    sl('concept', 'First-past-the-post', {
      b: 'In each constituency the candidate with the **most votes** wins, even without a majority.',
      v: vFptpFlow,
      n: 'India elects the Lok Sabha by the first-past-the-post system. Whoever gets the most votes in a constituency wins, even with forty per cent. If one party is strong everywhere and its rivals split the remaining votes, that party can win seat after seat. Across the country, its share of seats then rises far above its share of votes.',
    }),
    sl('example', 'Worked example 1: the imagined state of Sonpradesh', {
      b: 'Votes (in thousands) in five imagined constituencies.',
      bl: [
        'Step 1 — Find the winner in each row: the party with the most votes.',
        `Step 2 — Count seats: P ${SEATS.P}, Q ${SEATS.Q}, R ${SEATS.R}.`,
        `Step 3 — Vote share of P: ${VOTES.P} ÷ ${TOTAL} × 100 = ${VOTE_PCT.P}%.`,
        `Step 4 — Seat share of P: ${SEATS.P} ÷ ${FPTP.length} × 100 = ${SEAT_PCT.P}%; gap ${GAP_P} percentage points.`,
      ],
      v: vSon,
      n: `Let us work through an imagined state. In each row, the party with the most votes wins. Party P wins four of the five seats. Now add the votes: P has ${VOTES.P} thousand out of ${TOTAL} thousand, about thirty-seven per cent. So P has eighty per cent of the seats with well under half of the votes, because Q and R split the rest.`,
    }),
    sl('diagram', 'Votes versus seats', {
      v: vBars,
      n: 'The bar chart shows the same result. For Party P, the seat bar towers over the vote bar. Party R, with more than a quarter of the votes, gets no seat at all. This is how the Congress, with a divided opposition, turned less than half of the votes into a commanding majority of seats in the early elections.',
    }),
    sl('check', 'Quick check: compute a share', {
      b: 'What was Party P\'s share of the votes in Sonpradesh?',
      chk: 'n_vote_share',
      n: 'Divide the votes of P by the total votes and multiply by one hundred.',
    }),
    sl('check', 'Quick check: name the system', {
      b: 'Name the system in which the candidate with the most votes wins.',
      chk: 'fb_fptp',
      n: 'It is named after a race in which only the first runner to cross the line matters.',
    }),
    sl('concept', 'Kerala, 1957', {
      b: 'The **CPI** won Kerala in 1957 — a communist party in power **through the ballot**.',
      v: vKerala,
      n: 'Kerala gave the first big surprise. In 1957 the Communist Party of India won the state election, and E. M. S. Namboodiripad became Chief Minister. It was rare anywhere in the world for communists to take office through a free vote. After two years of protests, the Centre dismissed the government in 1959 under Article 356, which began a long debate.',
    }),
    sl('example', 'Worked example 2: planning a five-mark answer', {
      b: 'Question: describe the first general election and why it mattered.',
      bl: ['Step 1 — Note five headings before writing.', 'Step 2 — One fact per heading.', 'Step 3 — End with the significance.'],
      v: vPlan5,
      n: 'Five-mark answers reward five clear points. Before you write, jot down five headings: who ran the election, how big it was, how people voted, what happened, and why it mattered. Put one solid fact under each heading. Ending with the significance turns a list of facts into an answer that earns full marks.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The Election Commission, led first by Sukumar Sen, organised a huge election in 1951 to 1952 using symbols and separate boxes. In 1952, 1957 and 1962 the Congress won about three-quarters of the seats with less than half the votes, thanks to first-past-the-post and a divided opposition. Kerala in 1957 was the exception.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      n: 'Watch out for three common slips. Never call India a one-party state; it had one dominant party in free elections. Do not say the Congress won a majority of votes; it won a majority of seats. And remember the Swatantra Party came only in 1959, so it did not contest the first two elections.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Era of One-Party Dominance — Part 2: The Congress System and the Opposition',
  goals: [
    'Distinguish a dominant-party democracy from a one-party system',
    'Explain the Congress as a social and ideological coalition that tolerated factions',
    'Explain the role of the opposition in the 1950s',
    'Describe the ideas and origins of the Socialist Party, the CPI, the Jana Sangh and the Swatantra Party',
  ],
  slides: [
    sl('title', 'The Congress System and the Opposition', {
      b: 'Part 2 — **why** the Congress dominated, and **who** opposed it.',
      v: vRoute2,
      n: 'In Part 1 we saw that one party won election after election. Now we ask why, and what kind of party it was. We will also meet the small opposition parties of the time and see why they mattered far more than their seat numbers suggest.',
    }),
    sl('concept', 'Dominance is not one-party rule', {
      b: 'Other parties were **legal**, contested freely and **criticised** the government.',
      v: vDominance,
      n: 'Some countries have only one legal party. India was different. Here many parties contested freely, and the Congress won because voters chose it. So we call this dominance within a democracy, not a one-party system. This difference is the starting point for every answer in this chapter.',
    }),
    sl('diagram', 'A party that held many groups', {
      v: vUmbrella,
      n: 'Picture the Congress as a large tent. Inside it were socialists and conservatives, farmers and industrialists, people of many castes, religions and regions. Groups argued inside the tent and usually met in the middle. Outside stood a few small parties. Because so many interests were already inside, it was hard for any outside party to grow quickly.',
    }),
    sl('check', 'Quick check: a coalition party', {
      b: 'What does it mean to call the Congress a social and ideological coalition?',
      chk: 'm_umbrella',
      n: 'Remember that the Congress was one party. Ask what was varied inside it.',
    }),
    sl('concept', 'Tolerance of factions', {
      b: '**Factions** — groups inside the party — were allowed to compete.',
      v: vFaction,
      n: 'Factions were groups inside the Congress, formed around ideas or loyal followings of leaders. Instead of expelling them, the party let them compete and bargain. Unhappy groups could fight inside the party rather than leave it. In this way, factions worked like an internal check that kept the party in touch with many interests.',
    }),
    sl('example', 'Worked example 1: reading a source on factions', {
      b: 'An imagined district secretary writes in 1956 about "two camps" that reached a resolution "in the middle".',
      bl: ['Step 1 — Who and when?', 'Step 2 — Find the signal words.', 'Step 3 — Name the concept.', 'Step 4 — Quote and explain.'],
      v: vReadSrc,
      n: 'Source questions follow a routine. First, note who wrote it and when. Then look for signal words: two camps suggests factions; a resolution in the middle suggests compromise; candidates from three castes suggests a social coalition. Name the concept, quote the line, and add one sentence of explanation. That routine earns most of the marks.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Was the Congress a formal alliance of separate registered parties?',
      chk: 'tf_coalition_formal',
      n: 'Think about the difference between a coalition of groups and a coalition of parties.',
    }),
    sl('concept', 'Small but important: the opposition', {
      b: 'The opposition won **few seats** but played **real roles**.',
      v: vOppRole,
      n: 'The opposition parties of the 1950s were small in Parliament, yet they questioned the government, kept other ideas alive and gave unhappy citizens a democratic outlet. Their leaders were often respected by the ruling party, and some had served together in the first broad-based cabinet. Many of their ideas and leaders became important in later decades.',
    }),
    sl('diagram', 'Four early opposition parties', {
      v: vParties,
      n: 'Here are the four parties you must know. The Socialists came out of a group inside the Congress and became separate in 1948. The Communists had worked since the 1920s. The Jana Sangh was founded in 1951 by Syama Prasad Mukherjee. The Swatantra Party was founded in 1959 by C. Rajagopalachari and others.',
    }),
    sl('check', 'Quick check: where did the socialists start?', {
      b: 'Before 1948, the socialists had worked as which group?',
      chk: 'm_socialist_origin',
      n: 'They began inside the Congress itself. Which group was that?',
    }),
    sl('concept', 'Socialists and communists', {
      b: 'Both stood for **equality**, but by different routes.',
      bl: ['Socialists: democratic socialism through elections and reform; split into several parties later', 'CPI: Marxism-Leninism; largest opposition group in the first Lok Sabha; won Kerala in 1957; split in 1964'],
      n: 'The socialists wanted equality through democratic means and criticised the Congress for favouring the better-off; later they split into several parties. The Communist Party of India drew on Marxism-Leninism, had strong support among workers and peasants in some regions, and was the largest opposition group in the first Lok Sabha. It split in 1964.',
    }),
    sl('concept', 'Jana Sangh and Swatantra', {
      b: 'One stressed **cultural unity**; the other **economic freedom**.',
      v: vRightLeft,
      n: 'The Jana Sangh stressed national and cultural unity and promoted Hindi as the official language; its support was mainly in parts of the north. The Swatantra Party, formed after the Congress backed land ceilings and state trading in grain, wanted less state control and more freedom for private enterprise.',
    }),
    sl('check', 'Quick check: match parties and ideas', {
      b: 'Match each party with the idea most closely linked to it.',
      chk: 'mt_parties',
      n: 'Use the key word for each: equality, revolution theory, cultural unity, free enterprise.',
    }),
    sl('example', 'Worked example 2: comparing two parties', {
      b: 'Question: compare the Jana Sangh and the Swatantra Party.',
      bl: ['Step 1 — Choose four headings: founded, main concern, economy, support.', 'Step 2 — Fill both columns under each heading.', 'Step 3 — Add one shared point: both opposed the Congress.'],
      v: vRightLeft,
      n: 'Comparison answers go wrong when students describe one party fully and then the other. Instead, pick headings and compare across them: when founded, main concern, view of the economy, and where support came from. Finish with what they shared. This structure makes every point a real comparison and is easy for the examiner to mark.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The Congress dominated through free elections, not by banning rivals. It was a social and ideological coalition that tolerated factions. The opposition was small but acted as a watchdog and kept alternatives alive. Remember the four parties: the Socialists, the CPI, the Jana Sangh and the Swatantra Party.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      n: 'Marks follow points. One mark needs one correct choice. Two and three-mark answers need one explained point per mark. Five-mark answers need five numbered points, and for evaluate questions, both sides and a conclusion. In source questions, quote the line, name the concept and explain it in your own words.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Era of One-Party Dominance — Notes',
  sections: [
    {
      h: '1. The first general election (1951–52)',
      t: 1,
      b: '**Election Commission:** created in **January 1950**; first Chief Election Commissioner **Sukumar Sen**.\n\n**The challenge:** universal adult franchise for about **17 crore** adults in a poor, mostly non-literate society. Tasks included preparing electoral rolls, drawing constituencies and training lakhs of polling staff. Polling ran from **October 1951** into **early 1952**.\n\n**Method:** a **symbol** for each candidate and a separate box per candidate (first two elections); later a single ballot paper with all names and symbols; electronic voting machines from the late 1990s, used across the country by 2004.\n\n**Result:** peaceful polls; the losers accepted the outcome; the Congress won a big majority and Jawaharlal Nehru remained Prime Minister. The election showed that adult franchise could work in a poor country.',
      terms: [
        ['Universal adult franchise', 'The right of every adult citizen to vote, without conditions of property, education, gender or caste.'],
        ['Chief Election Commissioner', 'The head of the Election Commission of India.'],
      ],
      v: vTest,
      vs: [vMethod],
    },
    {
      h: '2. The second and third elections and Kerala',
      t: 1,
      b: '**1957 and 1962:** the Congress again won roughly **three-quarters** of Lok Sabha seats.\n\n**Kerala, 1957:** the **Communist Party of India** won the assembly election; **E. M. S. Namboodiripad** became Chief Minister. A communist party coming to power through a free vote was rare in the world. After protests against its reforms, the Centre **dismissed** the government in **1959** under **Article 356**, which started a lasting debate on the use of President\'s Rule.',
      terms: [['Article 356', 'The provision under which the President can take over the government of a state (President\'s Rule).']],
      v: vThree,
      vs: [vKerala],
    },
    {
      h: '3. Seats and votes: first-past-the-post',
      t: 1,
      b: 'In the **first-past-the-post** system the candidate with the **most votes** in a constituency wins, even without 50 per cent.\n\nThe Congress was present in every constituency, while the opposition was **divided** among several parties. So it won most seats with **less than half** of the votes.\n\n**Imagined illustration (Sonpradesh):** P has ' + VOTE_PCT.P + '% of the votes but ' + SEAT_PCT.P + '% of the seats; R has ' + VOTE_PCT.R + '% of the votes and no seat.',
      terms: [['First-past-the-post', 'An electoral system in which the candidate with the largest number of votes wins the seat.']],
      v: vBars,
      vs: [vSon],
    },
    {
      h: '4. The nature of Congress dominance',
      t: 2,
      b: '**Dominant party, not one party:** opposition parties were legal and elections free.\n\n**Why the Congress dominated:**\n- **Legacy** of the national movement and well-known leaders.\n- **Organisation** spread across the country before the first election.\n- **Social coalition:** support from many classes, castes, religions and regions.\n- **Ideological coalition:** left, right and centre inside one party; policies usually in the middle.\n- **Tolerance of factions:** groups competed inside the party, acting as an internal check and reducing exits.\n- A **divided opposition**.',
      terms: [
        ['Faction', 'A group within a party, based on ideas or loyalty to a leader.'],
        ['Coalition', 'A combination of groups; for the Congress, of social groups and ideas within one party.'],
      ],
      v: vUmbrella,
      vs: [vDominance, vFaction],
    },
    {
      h: '5. The opposition parties',
      t: 3,
      b: '**Socialist Party:** from the Congress Socialist Party (1934); separate from **1948** when the Congress stopped allowing organised groups with their own constitutions; democratic socialism; later split into several parties.\n\n**Communist Party of India:** communist groups active from the 1920s; Marxism-Leninism; largest opposition group in the first Lok Sabha; won Kerala in 1957; split in **1964** (the CPI(M) was formed).\n\n**Bharatiya Jana Sangh:** founded **1951**; founder-president **Syama Prasad Mukherjee**; stressed national and cultural unity and Hindi as the official language; limited seats, support mainly in parts of the north.\n\n**Swatantra Party:** founded **1959** after the Congress Nagpur resolution (land ceilings, state trading in food grains, cooperative farming); leaders included **C. Rajagopalachari**; wanted less state control and free enterprise.',
      terms: [['Opposition', 'Parties not in government that criticise it and offer alternatives.']],
      v: vParties,
      vs: [vRightLeft],
    },
    {
      h: '6. Why the opposition mattered',
      t: 3,
      b: 'Though they won few seats, opposition parties:\n- **questioned** the government and kept it accountable;\n- kept **alternative programmes** alive;\n- gave unhappy citizens a **democratic outlet**, so discontent did not turn against democracy;\n- **trained leaders** for later decades.\n\nRelations were often respectful; the first cabinet after independence was broad-based and included non-Congress figures such as B. R. Ambedkar and Syama Prasad Mukherjee.',
      v: vOppRole,
    },
  ],
  tips: '**Common mistakes**\n- Calling India a one-party state: say **dominant-party democracy**.\n- Saying the Congress won most **votes**: it won most **seats**, with under half the votes.\n- Placing Swatantra in the 1950s elections: it was founded in **1959**.\n- Mixing up the Jana Sangh (cultural unity) and Swatantra (free enterprise).\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2–3 marks: one explained point per mark.\n- 5 marks: five numbered points; "evaluate" needs both sides and a conclusion.\n- Source questions: quote the line, name the concept, explain.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['When was the Election Commission set up?', '**January 1950**.', 'fact', 1],
  ['First Chief Election Commissioner', '**Sukumar Sen**.', 'fact', 1],
  ['When was the first general election held?', 'From **October 1951** to **early 1952**.', 'fact', 1],
  ['About how many voters in 1951–52?', 'About **17 crore** adults (approximate).', 'fact', 1],
  ['Why symbols?', 'Most voters **could not read**; a symbol let them find their candidate.', 'concept', 1],
  ['Ballot boxes in the first two elections', 'A **separate box per candidate**, marked with a symbol.', 'fact', 1],
  ['Years of the first three general elections', '**1951–52, 1957, 1962**.', 'fact', 1],
  ['Congress seat share in these elections', 'About **three-quarters** of Lok Sabha seats.', 'fact', 1],
  ['Congress vote share in these elections', '**Less than half** of the votes.', 'fact', 1],
  ['**First-past-the-post**', 'The candidate with the **most votes** wins, even without a majority.', 'definition', 1],
  ['Why seats exceeded votes for the Congress', 'First-past-the-post plus a **divided opposition**.', 'concept', 1],
  ['Kerala 1957', 'The **CPI** won; **E. M. S. Namboodiripad** became Chief Minister.', 'fact', 1],
  ['Kerala 1959', 'Government **dismissed** under **Article 356**.', 'fact', 1],
  ['Dominant party vs one-party state', 'Dominant: wins free elections, rivals legal. One-party: rivals banned.', 'concept', 2],
  ['**Social coalition**', 'Support from many classes, castes, religions and regions.', 'definition', 2],
  ['**Ideological coalition**', 'Left, right and centre inside one party.', 'definition', 2],
  ['**Faction**', 'A group inside a party, built on ideas or loyalty to a leader.', 'definition', 2],
  ['How factions helped the Congress', 'Discontent stayed **inside**; factions acted as an internal **check**.', 'concept', 2],
  ['Legacy of the national movement', 'Many saw the Congress as the party that **won freedom**.', 'concept', 2],
  ['Prime Minister during 1952–62', '**Jawaharlal Nehru**.', 'fact', 2],
  ['Socialist Party: origin', 'From the **Congress Socialist Party** (1934); separate from **1948**.', 'fact', 3],
  ['CPI: two key facts', 'Largest opposition group in the **first Lok Sabha**; split in **1964**.', 'fact', 3],
  ['Bharatiya Jana Sangh: founded', '**1951**, by **Syama Prasad Mukherjee**.', 'fact', 3],
  ['Jana Sangh: main ideas', 'National and **cultural unity**; **Hindi** as official language.', 'concept', 3],
  ['Swatantra Party: founded', '**1959**; leaders included **C. Rajagopalachari**.', 'fact', 3],
  ['Swatantra: main ideas', '**Free enterprise**, less state control, opposed land ceilings.', 'concept', 3],
  ['Why Swatantra was formed', 'Reaction to the Congress **Nagpur resolution** (1959) on land ceilings and state trading.', 'concept', 3],
  ['Four roles of the opposition', 'Watchdog, alternatives, democratic outlet, training leaders.', 'concept', 3],
  ['Exam trap: Swatantra in 1952?', '**No** — it was founded in 1959.', 'exam-tip', 3],
  ['Exam trap: "one-party state"', 'Say **dominant-party democracy** instead.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Era of One-Party Dominance',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ec_year', 'm_legacy', 'm_bjs_year', 'ar_opposition'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_social_coalition', 's_opp_roles', 's3_reasons_dominance'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_first_election', 'l_opposition'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_faction'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Era of One-Party Dominance',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_first_cec', 'm_fptp_meaning', 'm_seat_bonus', 'm_dominance_democratic', 'm_faction_effect', 'm_swatantra_year', 'm_kerala_dismissal', 'm_respect', 'ar_fptp', 'ar_one_party'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_ec_challenge', 's_fptp_plural', { attempt: 1, keys: ['s_bjs_two', 's_swatantra_two'] }, 's3_three_elections', { attempt: 1, keys: ['s3_kerala', 's3_opp_weak'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_congress_system', { attempt: 1, keys: ['l_fptp_effect', 'l_compare_two'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_sonpradesh', 'sb_kerala'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-political-science-ch09 only (first three general elections; nature of Congress dominance; emergence of opposition parties)',
    originality: 'every source, state, constituency and speaker is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    data: `imagined Sonpradesh computed by the build: votes P ${VOTES.P}, Q ${VOTES.Q}, R ${VOTES.R} of ${TOTAL}; seats ${SEATS.P}/${SEATS.Q}/${SEATS.R}; P ${VOTE_PCT.P}% of votes, ${SEAT_PCT.P}% of seats, gap ${GAP_P}; real results stated only as approximate shares (about three-quarters of seats, under half of votes; about 17 crore voters)`,
    facts: 'Election Commission January 1950; Sukumar Sen; polls October 1951 to early 1952; 1957 and 1962 elections; Kerala CPI government 1957 and dismissal under Article 356 in 1959; Congress Socialist Party 1934 and Socialist Party 1948; Jana Sangh 1951 (Syama Prasad Mukherjee); Swatantra 1959 (C. Rajagopalachari); CPI split 1964; EVMs nationwide by 2004',
    neutrality: 'each party\'s ideas described in neutral, factual terms; the Kerala dismissal presented with arguments on both sides; nothing after 2024',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
