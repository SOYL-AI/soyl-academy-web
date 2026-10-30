// Build CBSE 12 Political Science ch12 Challenges to and Restoration of the Congress System. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch12', 'social-science');
const { HOUSE, MAJORITY, FRONT_AFTER, SHORT_BY, SURPLUS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
const EVENTS = [
  [1964, 'Nehru dies', 'Shastri becomes PM'],
  [1965, 'War with Pakistan', ''],
  [1966, 'Tashkent; Indira Gandhi PM', 'rupee devalued'],
  [1967, 'Fourth general election', 'Congress loses states'],
  [1969, 'Banks nationalised', 'Giri elected; party splits'],
  [1971, 'Fifth general election', 'Congress (R) wins big'],
];
const vTimeline = (() => {
  const s = new Svg(760, 300);
  const X = (y) => 110 + ((y - 1964) / (1971 - 1964)) * 540;
  const AX = 150;
  s.arrow(30, AX, 740, AX, { sw: 1.8 });
  for (const yr of [1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971]) s.line(X(yr), AX - 6, X(yr), AX + 6, { sw: 1.2, color: 'muted' });
  const LEVEL = [26, 222, 76, 272, 26, 222];
  EVENTS.forEach(([yr, a, b], i) => {
    const y = LEVEL[i];
    const up = y < AX;
    s.dot(X(yr), AX, 5, 'accent');
    s.line(X(yr), AX, X(yr), up ? y + 26 : y - 30, { sw: 1.2, color: 'accent' });
    s.text(X(yr), y - (up ? 0 : 14), `${yr}: ${a}`, { bold: true, size: 12 });
    if (b) s.text(X(yr), y + (up ? 16 : 2), b, { size: 11 });
  });
  return s.visual(
    'Timeline from 1964 to 1971: Nehru dies and Shastri becomes Prime Minister in 1964; war with Pakistan in 1965; Tashkent, Indira Gandhi as Prime Minister and devaluation in 1966; the fourth general election in 1967, when the Congress loses several states; bank nationalisation, V. V. Giri elected President and the party split in 1969; the fifth general election in 1971, won by the Congress (R)',
    'From succession to restoration, 1964–71',
  );
})();

const vHouse = (() => {
  const s = new Svg(640, 300);
  const c = s.chart({ x0: 0, x1: 2, y0: 0, y1: 40, left: 70, top: 30, width: 500, height: 210, yLabel: 'Seats held by the front', xLabel: 'Stage' });
  const bars = [
    [0.5, HOUSE.front, 'Before defections'],
    [1.5, FRONT_AFTER, 'After defections'],
  ];
  for (const [x, v, label] of bars) {
    const w = 0.3;
    const color = v >= MAJORITY ? 'accent' : 'muted';
    s.rect(c.X(x - w / 2), c.Y(v), c.X(x + w / 2) - c.X(x - w / 2), c.Y(0) - c.Y(v), { rx: 2, sw: 1.2, color, fill: color, fillOpacity: 0.55 });
    s.text(c.X(x), c.Y(v) - 10, String(v), { size: 12, bold: true });
    c.xTick(x, label);
  }
  s.line(c.X(0), c.Y(MAJORITY), c.X(2), c.Y(MAJORITY), { sw: 1.4, dash: true, color: 'accent' });
  s.text(c.X(2) - 4, c.Y(MAJORITY) - 10, `Majority mark: ${MAJORITY}`, { anchor: 'end', size: 12, color: 'accent' });
  [0, 20, 40].forEach((v) => c.yTick(v, String(v)));
  return s.visual(
    `Bar chart for the imagined ${HOUSE.seats}-member Sonbhadra assembly: the front holds ${HOUSE.front} seats before defections, above the majority mark of ${MAJORITY}, and ${FRONT_AFTER} seats after ${HOUSE.defectors} members defect, ${SHORT_BY} below the mark`,
    'Imagined assembly; figures computed by the build.',
  );
})();

const vSplit = (() => {
  const s = new Svg(680, 290);
  s.rect(220, 16, 240, 56, { sw: 2, color: 'accent', fill: 'fill' });
  s.text(340, 36, 'Indian National Congress', { bold: true, size: 14 });
  s.text(340, 56, 'until November 1969', { size: 12 });
  s.arrow(300, 72, 170, 140, { sw: 1.6 });
  s.arrow(380, 72, 510, 140, { sw: 1.6 });
  s.rect(40, 142, 260, 120, { sw: 1.6, color: 'muted' });
  s.text(170, 166, 'Congress (O)', { bold: true, size: 14 });
  s.text(170, 192, '"Organisation"', { size: 12 });
  s.text(170, 214, 'Senior party leaders', { size: 12 });
  s.text(170, 236, '(the Syndicate)', { size: 12 });
  s.rect(380, 142, 260, 120, { sw: 1.6, color: 'accent' });
  s.text(510, 166, 'Congress (R)', { bold: true, size: 14, color: 'accent' });
  s.text(510, 192, '"Requisitionists"', { size: 12 });
  s.text(510, 214, 'Led by Indira Gandhi', { size: 12 });
  s.text(510, 236, 'Wins the 1971 election', { size: 12 });
  return s.visual(
    'Diagram of the 1969 split: the Indian National Congress divides in November 1969 into the Congress (O), for Organisation, made up of senior party leaders known as the Syndicate, and the Congress (R), for Requisitionists, led by Indira Gandhi, which goes on to win the 1971 election',
    'One party becomes two',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Who after Nehru?', '1964: consensus', '1966: contest', 'A troubled economy', '1967: the shock', 'Coalitions and defections'], 'Route map of Part 1: who after Nehru, the consensus of 1964, the contest of 1966, a troubled economy, the shock of 1967, and coalitions and defections', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Prime Minister versus Syndicate', 'The 1969 presidential election', 'The split', 'Radical steps', 'The 1971 election', 'A restored but changed Congress'], 'Route map of Part 2: the Prime Minister against the Syndicate, the 1969 presidential election, the split, radical steps, the 1971 election, and a restored but changed Congress', 'Part 2 at a glance');
const vFear = table(
  ['Fear in 1964', 'What actually happened'],
  [
    ['Many new nations fell to army or one-person rule after their founders', 'Leaders were chosen inside the ruling party and approved by MPs'],
    ['No one could fill the place of a leader in office since 1947', 'Two successions in under two years, both peaceful'],
    ['A long fight could divide the party', 'The party stayed united until 1969'],
  ],
  'Table comparing fears in 1964 with what happened: fears of army or one-person rule, of no possible successor, and of a party split, against peaceful choices by MPs, two smooth successions and a united party until 1969',
);
const v1964 = flow('LR', ['May 1964: Nehru dies', 'Gulzarilal Nanda acting Prime Minister', 'Kamaraj consults leaders and MPs', 'Shastri chosen without a contest'], 'Flow of the 1964 succession: Nehru dies in May; Gulzarilal Nanda is acting Prime Minister; the Congress president Kamaraj consults leaders and MPs; Lal Bahadur Shastri is chosen without a contest', 'The 1964 succession');
const vShastri = table(
  ['Year', 'Under Shastri'],
  [
    ['1964', 'Takes office in June'],
    ['1965', 'War with Pakistan; food shortage after a failed monsoon'],
    ['January 1966', 'Tashkent Declaration with Pakistan; Shastri dies in Tashkent'],
  ],
  'Table of Shastri\'s term: takes office in June 1964; war with Pakistan and a food shortage in 1965; the Tashkent Declaration and his death in January 1966',
);
const vContest = table(
  ['', '1964', '1966'],
  [
    ['How the leader was chosen', 'Consultation and consensus', 'Secret ballot of Congress MPs'],
    ['Leader chosen', 'Lal Bahadur Shastri', 'Indira Gandhi'],
    ['Rival', 'None in a vote', 'Morarji Desai'],
    ['What it showed', 'Smooth agreement', 'A contest settled democratically'],
  ],
  'Comparison table of 1964 and 1966: consensus versus secret ballot; Shastri versus Indira Gandhi; no vote versus a contest with Morarji Desai; smooth agreement versus a democratically settled contest',
);
const vPlanSucc = table(
  ['Point', 'Content for a five-mark answer on succession'],
  [
    ['1', 'Why it was a test: other new nations, a long-serving leader'],
    ['2', '1964: Nanda as interim, Kamaraj consults, Shastri chosen'],
    ['3', 'Shastri\'s term: 1965 war, food crisis, Tashkent'],
    ['4', '1966: secret ballot, Indira Gandhi defeats Morarji Desai'],
    ['5', 'Conclusion: peaceful transfer, party procedure respected'],
  ],
  'Planning table for a five-mark answer on succession: why it was a test, the 1964 succession, Shastri\'s term, the 1966 contest, and a conclusion',
);
const vSyndicate = table(
  ['Question', 'Answer'],
  [
    ['Who?', 'Senior Congress organisational leaders such as K. Kamaraj, S. K. Patil, S. Nijalingappa, N. Sanjiva Reddy and Atulya Ghosh'],
    ['Power base', 'Control of the party organisation in their states'],
    ['Role in 1964 and 1966', 'Helped choose Shastri, then backed Indira Gandhi'],
    ['Later', 'Clashed with the Prime Minister and led the Congress (O) after 1969'],
  ],
  'Table on the Syndicate: senior organisational leaders including Kamaraj, Patil, Nijalingappa, Sanjiva Reddy and Atulya Ghosh; their power base in the party organisation; their role in 1964 and 1966; and their later clash with the Prime Minister and leadership of the Congress (O)',
);
const vEconomy = flow('LR', ['Monsoons fail', 'Food shortage and imports', 'Prices rise', 'Rupee devalued (1966)', 'Strikes and protests'], 'Flow of the economic background: failed monsoons, food shortage and imports, rising prices, devaluation of the rupee in 1966, and strikes and protests', 'The mood before 1967');
const vLohia = flow('LR', ['Congress wins with under half the votes', 'Because the opposition splits the rest', 'So: unite against the Congress', 'One opposition candidate per seat'], 'Flow of the logic of non-Congressism: the Congress wins with under half the votes because the opposition splits the rest, so the opposition should unite behind one candidate per seat', 'Non-Congressism (Ram Manohar Lohia)');
const v1967 = table(
  ['Level', 'Result of 1967 (broad)'],
  [
    ['Lok Sabha', 'Congress keeps a narrow majority, its lowest so far'],
    ['States', 'Non-Congress governments in several states, soon or at once'],
    ['Madras', 'DMK wins a majority on its own'],
    ['Many other states', 'Coalitions of several parties (SVD governments)'],
  ],
  'Table of the 1967 results: a narrow Congress majority in the Lok Sabha; non-Congress governments in several states; a DMK majority in Madras; coalition governments in many other states',
  'Stated broadly; no seat figures.',
);
const vHouseSteps = table(
  ['Step', 'Working (imagined Sonbhadra)'],
  [
    ['Majority mark', `${HOUSE.seats} ÷ 2 + 1 = ${MAJORITY}`],
    ['Front before', `${HOUSE.front}, which is ${SURPLUS} above the mark`],
    ['After defections', `${HOUSE.front} − ${HOUSE.defectors} = ${FRONT_AFTER}`],
    ['Result', `${SHORT_BY} short of a majority: the government falls`],
  ],
  `Working table: majority mark ${MAJORITY}; front ${HOUSE.front}; after ${HOUSE.defectors} defections ${FRONT_AFTER}; ${SHORT_BY} short of a majority`,
);
const vSvd = table(
  ['Feature of state politics after 1967', 'Why it mattered'],
  [
    ['Coalitions of left and right parties', 'Little agreement on policy'],
    ['Narrow majorities', 'A few votes decided survival'],
    ['Frequent defections ("Aya Ram, Gaya Ram")', 'Governments rose and fell quickly'],
    ['President\'s Rule in some states', 'The Centre stepped in when no majority held'],
  ],
  'Table on state politics after 1967: coalitions of left and right with little policy agreement; narrow majorities; frequent defections that toppled governments; and President\'s Rule in some states',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['1964', 'Consensus; Kamaraj consults; Shastri chosen'],
    ['1965–66', 'War, food crisis, Tashkent, Shastri dies'],
    ['1966', 'Secret ballot; Indira Gandhi defeats Morarji Desai'],
    ['1967', 'Narrow majority at the Centre; several states lost'],
    ['After 1967', 'Coalitions, SVD governments, defections'],
  ],
  'Summary table of Part 1: the 1964 consensus, the events of 1965 to 1966, the 1966 contest, the 1967 results and coalition politics after 1967',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['"The Congress lost the Centre in 1967"', 'It kept a narrow majority at the Centre'],
    ['"Shastri was chosen by a vote"', '1964 was by consensus; 1966 was the contest'],
    ['"Non-Congressism was a party"', 'It was a strategy of opposition unity'],
  ],
  'Exam tips table: the Congress kept the Centre in 1967; 1964 was consensus and 1966 a contest; non-Congressism was a strategy, not a party',
);
const vRivalry = flow('LR', ['1966: Syndicate backs Indira Gandhi', 'She relies on her own advisers', 'Differences over economic policy', '1969: open clash'], 'Flow of the growing rivalry: in 1966 the Syndicate backs Indira Gandhi; she relies on her own advisers; differences grow over economic policy; and in 1969 there is an open clash', 'From partnership to rivalry');
const vPres = table(
  ['', 'Official Congress candidate', 'Rival candidate'],
  [
    ['Name', 'N. Sanjiva Reddy', 'V. V. Giri (Vice-President)'],
    ['Backed by', 'The Syndicate and the party organisation', 'Indira Gandhi\'s supporters, with a call for a conscience vote'],
    ['Result (August 1969)', 'Lost', 'Won'],
  ],
  'Table of the 1969 presidential election: N. Sanjiva Reddy, the official Congress candidate backed by the Syndicate, lost; V. V. Giri, the Vice-President, backed by Indira Gandhi\'s supporters with a call for a conscience vote, won in August 1969',
);
const vRadical = table(
  ['Step', 'When', 'Presented as'],
  [
    ['Ten-point programme', '1967', 'Social control of banks, public distribution, land reform'],
    ['Bank nationalisation', 'July 1969', 'Credit for farmers and small businesses'],
    ['End of privy purses', 'Tried 1970; done 1971', 'Ending privileges of former princes'],
  ],
  'Table of radical steps: the ten-point programme of 1967; bank nationalisation in July 1969; and the end of privy purses, attempted in 1970 and achieved in 1971',
);
const vReadSrc = table(
  ['Step', 'What to do with a source on the split'],
  [
    ['1', 'Note who wrote it and when (an imagined letter of December 1969)'],
    ['2', 'Spot signal words: "two signboards", "conscience", "banks taken over"'],
    ['3', 'Name the concept: split, conscience vote, bank nationalisation'],
    ['4', 'Quote the line and explain in one sentence'],
  ],
  'Four steps to read a source on the split: who and when, signal words, naming the concept, and quoting and explaining',
);
const vToward = flow('LR', ['Minority government after the split', 'Support from other parties in Parliament', 'Lok Sabha dissolved early (December 1970)', 'Election held in March 1971'], 'Flow towards the 1971 election: a minority government after the split, survival with support from other parties, early dissolution of the Lok Sabha in December 1970, and an election in March 1971', 'Towards 1971');
const vCampaigns = table(
  ['', 'Grand Alliance', 'Congress (R)'],
  [
    ['Members', 'Congress (O), Jana Sangh, Swatantra, Samyukta Socialist Party', 'Indira Gandhi\'s Congress, with allies such as the CPI'],
    ['Main message', 'Remove Indira Gandhi', 'Remove poverty (garibi hatao)'],
    ['Programme', 'No common positive programme', 'Bank nationalisation, end of privy purses, land reform'],
  ],
  'Comparison of the 1971 campaigns: the Grand Alliance of the Congress (O), Jana Sangh, Swatantra and the Samyukta Socialist Party, focused on removing Indira Gandhi; the Congress (R) with allies such as the CPI, focused on removing poverty with a list of programmes',
);
const v1971 = table(
  ['Who', 'Result in 1971 (broad)'],
  [
    ['Congress (R)', 'About two-thirds of Lok Sabha seats'],
    ['Grand Alliance', 'Far fewer seats than expected'],
    ['After the war of December 1971', 'Congress wins most state assemblies in 1972'],
  ],
  'Table of the 1971 results: about two-thirds of Lok Sabha seats for the Congress (R), a poor result for the Grand Alliance, and Congress wins in most state assemblies in 1972 after the December 1971 war',
  'Shares are rounded and approximate.',
);
const vOldNew = table(
  ['Feature', 'Congress system, 1952–67', 'Restored Congress, after 1971'],
  [
    ['Strength came from', 'Many regional leaders and the organisation', 'The popular appeal of one leader'],
    ['Factions', 'Accommodated inside the party', 'Less room for rivals'],
    ['Social support', 'Through local notables', 'Directly from the poor and disadvantaged'],
  ],
  'Comparison table of the old Congress system and the restored Congress: strength from regional leaders versus one leader; factions accommodated versus less room for rivals; support through local notables versus directly from the poor',
);
const vRestore = flow('LR', ['Setback in 1967', 'Split in 1969', 'Victory in 1971', 'Dominance back, but a different party'], 'Flow: setback in 1967, split in 1969, victory in 1971, and dominance restored but in a different kind of party', 'Restored, but changed');
const vAfter = table(
  ['When', 'What'],
  [
    ['December 1971', 'War with Pakistan; Bangladesh becomes independent'],
    ['1972', 'Congress wins most state assembly elections'],
    ['1971', 'Twenty-sixth Amendment ends privy purses'],
  ],
  'Table of events just after the 1971 election: the December 1971 war and the independence of Bangladesh, Congress wins in state elections in 1972, and the amendment ending privy purses in 1971',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Syndicate', 'Organisational leaders; clashed with the Prime Minister'],
    ['1969 President', 'Giri beats Reddy after a conscience vote'],
    ['Split', 'November 1969: Congress (O) and Congress (R)'],
    ['Radical steps', 'Banks 1969; privy purses ended 1971'],
    ['1971', 'Garibi hatao; about two-thirds of seats'],
  ],
  'Summary table of Part 2: the Syndicate, the 1969 presidential election, the split, radical steps, and the 1971 election',
);
const vTips2 = table(
  ['How marks are awarded', 'Tip'],
  [
    ['1 mark', 'One correct option or term'],
    ['2–3 marks', 'One explained point per mark'],
    ['5 marks', 'Five numbered points; for "evaluate", both sides and a conclusion'],
    ['Source', 'Quote the line, name the concept, explain'],
  ],
  'Exam tips table on how marks are awarded for one-mark, short, five-mark and source questions',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Challenges to the Congress System — Part 1: Succession and the 1967 Shock',
  goals: [
    'Explain how the succession from Nehru to Shastri to Indira Gandhi took place',
    'Describe the role of the Syndicate in Congress politics',
    'Analyse the background and results of the 1967 election',
    'Explain coalition politics and defection in the states after 1967',
  ],
  slides: [
    sl('title', 'Challenges to and Restoration of the Congress System', {
      b: 'Part 1 — **who after Nehru?** and the **political earthquake of 1967**.',
      v: vRoute1,
      n: 'For seventeen years one leader and one party had dominated Indian politics. Then, in 1964, that leader died. In this part we see how India chose new Prime Ministers, how a troubled economy shaped the mood of the country, and why the election of 1967 shook the Congress so badly in the states.',
    }),
    sl('concept', 'Who after Nehru?', {
      b: 'Many observers expected the end of democracy after the founding leader. It did not happen.',
      v: vFear,
      n: 'When Nehru died, people inside and outside India asked whether democracy would survive. In many new nations, the death of a founding leader had brought soldiers or a single ruler to power. The table compares those fears with what really happened in India: leaders were chosen by elected members, and the change was peaceful.',
    }),
    sl('concept', '1964: a succession by consensus', {
      b: 'The Congress president **K. Kamaraj** consulted leaders and MPs; **Lal Bahadur Shastri** was chosen without a contest.',
      v: v1964,
      n: 'After Nehru died in May 1964, Gulzarilal Nanda served briefly as acting Prime Minister. The Congress president, Kamaraj, spent days talking to senior leaders and Congress members of Parliament. They agreed on Lal Bahadur Shastri, who took office in June 1964. No vote was needed.',
    }),
    sl('diagram', 'The years 1964 to 1971 at a glance', {
      v: vTimeline,
      n: 'Here is the whole chapter on one line. Two successions come in 1964 and 1966, with a war in between. The election of 1967 shakes the Congress. In 1969 banks are nationalised, the presidential election divides the party, and the Congress splits. In 1971 the Congress led by Indira Gandhi wins a large victory.',
    }),
    sl('check', 'Quick check: put the events in order', {
      b: 'Arrange the events of 1964–66 in the order in which they happened.',
      chk: 'ord_succession',
      n: 'Start with the death that raised the question of succession, and end with the second new Prime Minister.',
    }),
    sl('concept', 'Shastri\'s short term', {
      b: 'Less than two years, but full of crises.',
      v: vShastri,
      n: 'Shastri faced two big crises. In 1965 India fought a war with Pakistan. At the same time the monsoon failed, and the country faced a serious food shortage. In January 1966 Shastri went to Tashkent, in the Soviet Union, to sign an agreement with Pakistan. He died there soon after signing it.',
    }),
    sl('two-column', '1966: a succession by contest', {
      cols: ['**1964:** consultation, consensus, Shastri chosen without a vote.', '**1966:** a secret ballot of Congress MPs; **Indira Gandhi** defeats **Morarji Desai**.'],
      v: vContest,
      n: 'The second succession was different. This time there were two candidates, and Congress members of Parliament voted by secret ballot. Indira Gandhi defeated Morarji Desai. The loser accepted the result and the government continued. A contested choice settled by votes is also a sign of a working democracy.',
    }),
    sl('example', 'Worked example 1: planning a five-mark answer on succession', {
      b: 'Question: describe the succession from Nehru to Indira Gandhi and what it showed.',
      bl: [
        'Step 1 — Begin with why it was a test.',
        'Step 2 — Narrate 1964, then Shastri\'s term, then 1966.',
        'Step 3 — Give one named fact per point (Kamaraj, Tashkent, Morarji Desai).',
        'Step 4 — End with a conclusion about democracy.',
      ],
      v: vPlanSucc,
      n: 'Let us plan a five-mark answer. First say why the moment was a test. Then tell the story in order: the consensus of 1964, the crises of Shastri\'s term, and the contest of 1966. Give a named fact in each point. Finish with a conclusion: power changed hands peacefully through the party and Parliament.',
    }),
    sl('check', 'Quick check: name the agreement', {
      b: 'Fill in the name of the 1966 agreement between India and Pakistan.',
      chk: 'fb_tashkent',
      n: 'The agreement is named after the city where it was signed.',
    }),
    sl('concept', 'The Syndicate', {
      b: 'An informal group of **senior Congress organisational leaders** with great influence in the party.',
      v: vSyndicate,
      n: 'The Syndicate was not an official body. It was a group of powerful Congress leaders who controlled the party organisation in their states. They helped choose Shastri and then backed Indira Gandhi in 1966, partly expecting her to rely on their advice. Later, as we will see, this relationship turned into rivalry.',
    }),
    sl('concept', 'A troubled economy before 1967', {
      b: 'Drought, food shortage, rising prices and the **devaluation of the rupee in 1966**.',
      v: vEconomy,
      n: 'The mid-sixties were hard years. Two poor monsoons cut food production and India had to import grain. Prices rose fast. In 1966 the government devalued the rupee, a decision that was widely criticised. Strikes, student protests and agitations spread across many states. This was the mood in which people went to vote in 1967.',
    }),
    sl('check', 'Quick check: devaluation', {
      b: 'In which year was the rupee devalued?',
      chk: 'm_devaluation',
      n: 'It was in the same year that a new Prime Minister took office.',
    }),
    sl('concept', 'Non-Congressism', {
      b: 'Ram Manohar **Lohia** urged the opposition to **unite** so that anti-Congress votes were not split.',
      v: vLohia,
      n: 'The socialist leader Ram Manohar Lohia noticed a simple fact. The Congress usually won seats with less than half of the votes, because the opposition divided the rest. His answer was non-Congressism: opposition parties, however different, should come together and put up common candidates. In 1967 many parties tried this.',
    }),
    sl('diagram', '1967: the political earthquake', {
      v: v1967,
      n: 'The results shocked the country. At the Centre the Congress kept a majority, but a narrow one. In the states the picture was very different. In Madras the DMK won a majority on its own. In many other states no party had a majority, and coalitions of several parties formed non-Congress governments.',
    }),
    sl('example', 'Worked example 2: how defections topple a government', {
      b: `An imagined ${HOUSE.seats}-member assembly, Sonbhadra.`,
      bl: [
        `Step 1 — Majority mark: half of ${HOUSE.seats} plus one = ${MAJORITY}.`,
        `Step 2 — The front holds ${HOUSE.front}, so it is ${SURPLUS} above the mark.`,
        `Step 3 — ${HOUSE.defectors} members defect: ${HOUSE.front} − ${HOUSE.defectors} = ${FRONT_AFTER}.`,
        `Step 4 — ${FRONT_AFTER} is ${SHORT_BY} below ${MAJORITY}, so the front loses its majority.`,
      ],
      v: vHouse,
      n: 'Let us see why defections mattered so much. In an imagined assembly of sixty members, a government needs thirty-one. A front with thirty-three members has only two to spare. If four of its members cross over, it falls to twenty-nine, two short of a majority. A handful of legislators could bring a government down.',
    }),
    sl('check', 'Quick check: find the majority mark', {
      b: 'How many seats are needed for a simple majority in a sixty-member assembly?',
      chk: 'n_majority_mark',
      n: 'Take half of the house and add one.',
    }),
    sl('concept', 'Coalitions and defections', {
      b: 'After 1967, many states saw **unstable coalitions** and frequent **defections**.',
      v: vSvd,
      n: 'The new coalitions, often called SVD governments, joined parties of the left and the right. Their main common aim was keeping the Congress out. With narrow majorities, they were easily upset by defections. An MLA in Haryana changed parties three times in a fortnight, giving India the phrase Aya Ram, Gaya Ram. Some states came under President\'s Rule.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'Let us sum up. In 1964 the Congress chose Shastri by consensus. War, a food crisis and Tashkent followed. In 1966 Indira Gandhi won a contest against Morarji Desai. In 1967 the Congress kept the Centre narrowly but lost several states, and coalition politics and defections began.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      n: 'Three common mistakes cost marks. The Congress did not lose the Centre in 1967; it lost several states. The 1964 succession was by consensus, while 1966 was the contest. And non-Congressism was a strategy of opposition unity, not the name of a party. Always add one named fact to each point.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Challenges to the Congress System — Part 2: Split and Restoration',
  goals: [
    'Explain the conflict between the Prime Minister and the Syndicate',
    'Describe the presidential election of 1969 and the Congress split',
    'Explain the radical economic steps of 1969–71',
    'Analyse the 1971 election and how the restored Congress differed from the old',
  ],
  slides: [
    sl('title', 'Split and Restoration', {
      b: 'Part 2 — the **split of 1969** and the **victory of 1971**.',
      v: vRoute2,
      n: 'After 1967 the Congress faced trouble from inside as well as outside. In this part we follow the growing rivalry between the Prime Minister and the senior party leaders, the presidential election that broke the party in two, and the election of 1971 that brought the Congress back to dominance, but in a new form.',
    }),
    sl('concept', 'From partnership to rivalry', {
      b: 'The Syndicate had backed Indira Gandhi in 1966; by 1969 the two sides were in open conflict.',
      v: vRivalry,
      n: 'In 1966 the senior organisational leaders supported Indira Gandhi. Over the next three years she began to take decisions with her own advisers and pushed a more radical economic agenda. The party leaders resisted. The quarrel was about power and about policy, and it needed only a trigger to break into the open.',
    }),
    sl('concept', 'The presidential election of 1969', {
      b: 'The death of President Zakir Husain led to an election that divided the Congress.',
      v: vPres,
      n: 'President Zakir Husain died in 1969. The party organisation chose N. Sanjiva Reddy as the official Congress candidate. The Vice-President, V. V. Giri, entered the contest as an independent. Indira Gandhi asked Congress legislators to vote according to their conscience. Giri won. The official candidate of the ruling party had lost.',
    }),
    sl('diagram', 'One party becomes two', {
      v: vSplit,
      n: 'After the presidential election, the Congress president expelled Indira Gandhi from the party, and in November 1969 the Congress split. The group of senior organisational leaders became the Congress O, for Organisation. Her supporters became the Congress R, for Requisitionists. Most Congress MPs went with her.',
    }),
    sl('check', 'Quick check: the names after the split', {
      b: 'True or false: the two parties of 1969 were the Congress (I) and the Congress (S).',
      chk: 'tf_congress_i',
      n: 'Think of the words Organisation and Requisitionists.',
    }),
    sl('concept', 'Radical steps', {
      b: 'Bank nationalisation and the end of **privy purses** gave the Prime Minister\'s side a **pro-poor image**.',
      v: vRadical,
      n: 'Indira Gandhi presented the split as a conflict between socialists and conservatives. In July 1969 fourteen major private banks were nationalised. Her government also moved to end privy purses, the payments promised to former princes. A first attempt in 1970 failed, and an amendment in 1971 finally ended them.',
    }),
    sl('check', 'Quick check: how many banks?', {
      b: 'Fill in the number of banks nationalised in July 1969.',
      chk: 'fb_banks',
      n: 'The number is more than ten and less than twenty.',
    }),
    sl('example', 'Worked example 1: reading a source on the split', {
      b: 'An imagined letter of December 1969 describes a district office with "two signboards".',
      bl: [
        'Step 1 — Who and when: a party worker, after the November split.',
        'Step 2 — Signal words: two signboards, conscience, banks taken over.',
        'Step 3 — Concepts: the split, the conscience vote, bank nationalisation.',
        'Step 4 — Quote the line and explain it in one sentence.',
      ],
      v: vReadSrc,
      n: 'Source questions reward careful reading. Suppose an imagined party worker writes that his district office now has two signboards. That points to the split into two parties. A mention of voting by conscience points to the presidential election. Name each concept, quote the line, and explain it in one clear sentence.',
    }),
    sl('concept', 'Towards 1971', {
      b: 'After the split the government needed outside support; the Lok Sabha was **dissolved early**.',
      v: vToward,
      n: 'After the split the Prime Minister\'s party did not have a majority of its own and relied on support from other parties, such as the communists and some regional parties. In December 1970 she recommended early dissolution of the Lok Sabha. A fresh election was held in March 1971.',
    }),
    sl('two-column', 'Two campaigns', {
      cols: ['**Grand Alliance:** Congress (O), Jana Sangh, Swatantra, SSP. Message: remove Indira Gandhi.', '**Congress (R):** message of **garibi hatao**, remove poverty, with a list of programmes.'],
      v: vCampaigns,
      n: 'The main opposition parties formed a Grand Alliance. Their common message was to remove Indira Gandhi from power. The Congress led by her campaigned on a positive promise, garibi hatao, which means remove poverty. It pointed to bank nationalisation and the end of privy purses as proof of its intentions.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term from 1967–71 with its meaning.',
      chk: 'mt_terms',
      n: 'Two of the terms are party names after the split.',
    }),
    sl('diagram', 'The result of 1971', {
      v: v1971,
      n: 'The result was decisive. The Congress led by Indira Gandhi won about two-thirds of the seats in the Lok Sabha. The Grand Alliance did far worse than expected. After the war with Pakistan in December 1971, which led to the independence of Bangladesh, the Congress also won most state elections in 1972.',
    }),
    sl('example', 'Worked example 2: comparing the old and new Congress', {
      b: 'Question: was the Congress after 1971 the same as before?',
      bl: [
        'Step 1 — Choose three features: leadership, factions, social support.',
        'Step 2 — For each, write the old pattern, then the new one.',
        'Step 3 — Use linking words such as whereas or unlike.',
        'Step 4 — End with a one-line judgement.',
      ],
      v: vOldNew,
      n: 'A comparison answer needs features, not stories. Pick three: who gave the party its strength, how it handled factions, and where its votes came from. For each, set the old pattern beside the new one. Then add a one-line judgement: dominance came back, but the party now worked in a different way.',
    }),
    sl('concept', 'Restored, but changed', {
      b: 'Dominance returned, but the Congress now rested on **one leader\'s appeal** and support from the **poor and disadvantaged**.',
      v: vRestore,
      n: 'Historians speak of the restoration of the Congress system after 1971. The party again won large majorities. But the old system, a broad party that held many factions and regional leaders together, did not return. The new Congress drew its strength from the popularity of its leader and from the support of poorer voters.',
    }),
    sl('check', 'Quick check: chronology', {
      b: 'Arrange the events from 1967 to 1971 in order.',
      chk: 'ord_1969_71',
      n: 'Remember that the banks were nationalised a month before the presidential election.',
    }),
    sl('concept', 'Just after 1971', {
      b: 'A war, a new neighbour and state elections.',
      v: vAfter,
      n: 'Three events followed the election. In December 1971 India and Pakistan went to war, and Bangladesh became an independent country. In 1972 the Congress won most of the state assembly elections. And an amendment to the Constitution in 1971 ended the privy purses of the former princes.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. The Syndicate and the Prime Minister clashed. In 1969 Giri defeated the official candidate after a conscience vote, and the party split into the Congress O and the Congress R. Banks were nationalised and privy purses ended. In 1971 a campaign to remove poverty won about two-thirds of the seats.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      n: 'In this chapter, dates and names carry marks, so learn the order: 1964, 1966, 1967, 1969, 1971. For evaluate questions, give both sides and end with your judgement. For source questions, quote the exact line before you explain it. Keep your language neutral when you describe leaders and parties.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Challenges to and Restoration of the Congress System — Notes',
  sections: [
    {
      h: '1. The succession of 1964',
      t: 1,
      b: 'Nehru died in **May 1964**. Many observers feared for democracy, since founding leaders in other new nations had often been followed by army or one-person rule.\n\n- **Gulzarilal Nanda** became acting (interim) Prime Minister.\n- The Congress president **K. Kamaraj** consulted senior leaders and Congress MPs.\n- **Lal Bahadur Shastri** was chosen unanimously and took office in **June 1964**.\n\nThe transfer was smooth and showed that the party could choose a successor through its own procedures.',
      terms: [['Succession', 'The choice of a new leader when the office falls vacant.'], ['Interim Prime Minister', 'A Prime Minister who holds office for a short time until a regular choice is made.']],
      v: v1964,
      vs: [vFear],
    },
    {
      h: '2. Shastri, Tashkent and the contest of 1966',
      t: 1,
      b: '**Shastri\'s term (1964–66):** a **war with Pakistan in 1965** and a severe **food shortage** after the monsoon failed. In **January 1966** India and Pakistan signed the **Tashkent Declaration**; Shastri died in Tashkent soon after.\n\n**1966:** for the first time the leadership was decided by a **secret ballot of Congress MPs**. **Indira Gandhi** defeated **Morarji Desai** and became Prime Minister. She had the backing of the **Syndicate**, an informal group of senior organisational leaders (K. Kamaraj, S. K. Patil, S. Nijalingappa, N. Sanjiva Reddy, Atulya Ghosh), who expected to guide her.\n\nTwo successions in under two years, one by consensus and one by contest, both peaceful.',
      terms: [['Syndicate', 'An informal group of powerful Congress organisational leaders in the 1960s.']],
      v: vContest,
      vs: [vShastri, vSyndicate],
    },
    {
      h: '3. The fourth general election, 1967',
      t: 2,
      b: '**Background:** drought, food scarcity and imports, rising prices, the **devaluation of the rupee (1966)**, strikes and agitations. Indira Gandhi had been Prime Minister for barely a year.\n\n**Opposition strategy:** **non-Congressism**, argued by the socialist **Ram Manohar Lohia**: since the Congress won seats with less than half of the votes, the opposition should unite.\n\n**Results:** the Congress kept a **narrow majority** in the Lok Sabha, its weakest so far, but lost power in **several states**. In **Madras** the **DMK** won a majority on its own. Because the shock was so great, the result is often called a **political earthquake**.',
      terms: [['Non-Congressism', 'The strategy of uniting opposition parties to defeat the Congress.'], ['Devaluation', 'An official lowering of the value of a currency against other currencies.']],
      v: v1967,
      vs: [vEconomy, vLohia],
    },
    {
      h: '4. Coalitions and defections',
      t: 2,
      b: 'In many states, non-Congress parties formed **coalition governments**, often called **SVD** (Samyukt Vidhayak Dal, joint legislature party) governments. Some brought together parties of the **right and the left**; what they shared was opposition to the Congress.\n\n**Defection** — a legislator leaving the party on whose ticket he or she was elected — became common. An MLA in **Haryana** changed sides three times in a fortnight in 1967, giving rise to the phrase **"Aya Ram, Gaya Ram"**. Thin majorities meant that a few defections could topple a government, and several states saw **President\'s Rule**.',
      terms: [['Coalition government', 'A government formed by two or more parties together.'], ['Defection', 'Changing party after being elected as a legislator.']],
      v: vSvd,
      vs: [vHouse, vHouseSteps],
    },
    {
      h: '5. The split of 1969',
      t: 3,
      b: '**Rivalry:** the Prime Minister increasingly relied on her own advisers and a more radical programme; the Syndicate resisted. The **ten-point programme** of 1967 already spoke of social control of banks, public distribution and land reform.\n\n**Presidential election (August 1969):** after President Zakir Husain\'s death, the official candidate **N. Sanjiva Reddy** was opposed by the Vice-President **V. V. Giri** as an independent. Indira Gandhi called for a **conscience vote**, and **Giri won**.\n\n**Split (November 1969):** the Congress president expelled her, and the party divided into the **Congress (O)** (Organisation) and the **Congress (R)** (Requisitionists). Her government continued with outside support.\n\n**Radical steps:** **fourteen major banks nationalised (July 1969)**; **privy purses** of former princes ended by the **Twenty-sixth Amendment (1971)** after a failed attempt in 1970.',
      terms: [['Conscience vote', 'A call to legislators to vote by personal judgement rather than the party\'s official choice.'], ['Privy purse', 'An annual payment and privileges promised to a former princely ruler at integration.']],
      v: vSplit,
      vs: [vPres, vRadical],
    },
    {
      h: '6. The 1971 election and the restoration',
      t: 3,
      b: 'The Lok Sabha was dissolved early (**December 1970**) and polls were held in **March 1971**.\n\n- **Grand Alliance:** Congress (O), Jana Sangh, Swatantra and the Samyukta Socialist Party; message: remove Indira Gandhi.\n- **Congress (R):** slogan **garibi hatao** (remove poverty), with allies such as the CPI; appeal to the landless, Dalits, Adivasis, minorities, women and the unemployed.\n\n**Result:** the Congress (R) won about **two-thirds of Lok Sabha seats**. After the **December 1971 war**, which led to the independence of Bangladesh, the Congress also won most state elections in **1972**.\n\n**A restored but different system:** dominance returned, but the party now rested on the **popular appeal of one leader** and direct support from the poor, with **less room for factions** than in the old Congress system.',
      terms: [['Grand Alliance', 'The 1971 front of the main non-communist opposition parties.'], ['Restoration', 'The return of Congress dominance after 1971, though on a different basis.']],
      v: vOldNew,
      vs: [vCampaigns, v1971],
    },
  ],
  tips: '**Common mistakes**\n- Saying the Congress lost the Centre in 1967: it lost several **states**.\n- Mixing the two successions: **1964 consensus**, **1966 secret ballot**.\n- Swapping O and R: **O = Organisation (Syndicate)**, **R = Requisitionists (Indira Gandhi)**.\n- Dating privy purses to 1969: they ended in **1971**.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2–3 marks: one explained point per mark.\n- 5 marks: five numbered points; for "evaluate", give both sides and a conclusion.\n- Source questions: quote the line, name the concept, explain.\n\nUse neutral language about leaders and parties; describe what they did, not whether they were good or bad.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['When did Nehru die?', '**May 1964**.', 'fact', 1],
  ['Acting Prime Minister after Nehru', '**Gulzarilal Nanda** (briefly).', 'fact', 1],
  ['Who managed the 1964 succession?', 'Congress president **K. Kamaraj**, by consulting leaders and MPs.', 'fact', 1],
  ['Prime Minister from June 1964', '**Lal Bahadur Shastri**.', 'fact', 1],
  ['Two crises under Shastri', 'The **1965 war** with Pakistan and a **food shortage**.', 'concept', 1],
  ['Tashkent Declaration', 'India–Pakistan agreement of **January 1966** after the 1965 war.', 'fact', 1],
  ['How was the 1966 leader chosen?', '**Secret ballot** of Congress MPs: Indira Gandhi defeated **Morarji Desai**.', 'fact', 1],
  ['The **Syndicate**', 'Informal group of senior Congress **organisational leaders**.', 'definition', 1],
  ['Name three Syndicate leaders', 'K. Kamaraj, S. K. Patil, S. Nijalingappa (also N. Sanjiva Reddy, Atulya Ghosh).', 'fact', 1],
  ['1964 vs 1966 succession', '1964 **consensus**; 1966 **contest**.', 'exam-tip', 1],
  ['Rupee devalued in', '**1966**.', 'fact', 2],
  ['Economic mood before 1967', 'Drought, food shortage, price rise, devaluation, protests.', 'concept', 2],
  ['**Non-Congressism**', 'Opposition parties uniting to defeat the Congress; argued by **Ram Manohar Lohia**.', 'definition', 2],
  ['Why "political earthquake"?', 'Narrow Congress majority at the Centre; **several states lost**.', 'concept', 2],
  ['DMK in 1967', 'Won a majority on its own in **Madras** (now Tamil Nadu).', 'fact', 2],
  ['**SVD** government', 'Samyukt Vidhayak Dal: a joint legislature party (coalition) after 1967.', 'definition', 2],
  ['**Defection**', 'A legislator changing party after being elected.', 'definition', 2],
  ['"Aya Ram, Gaya Ram"', 'Phrase for frequent defection; from a **Haryana** MLA in 1967.', 'fact', 2],
  ['Majority mark in a 60-member house', '**31** (half plus one).', 'example', 2],
  ['Why coalitions after 1967 were unstable', 'Opposite ideologies and thin majorities upset by defections.', 'concept', 2],
  ['1969 presidential candidates', 'Official: **N. Sanjiva Reddy**. Winner: **V. V. Giri** (independent).', 'fact', 3],
  ['**Conscience vote**', 'Vote by personal judgement, not the party\'s official choice.', 'definition', 3],
  ['Split of November 1969', '**Congress (O)** (Organisation) and **Congress (R)** (Requisitionists).', 'fact', 3],
  ['Bank nationalisation', '**Fourteen** major private banks, **July 1969**.', 'fact', 3],
  ['**Privy purse**', 'Payment to former princes; ended by an amendment in **1971**.', 'definition', 3],
  ['Grand Alliance of 1971', 'Congress (O), Jana Sangh, Swatantra, SSP.', 'fact', 3],
  ['Slogan of the Congress (R) in 1971', '**Garibi hatao** (remove poverty).', 'fact', 3],
  ['Result of 1971', 'Congress (R) won about **two-thirds** of Lok Sabha seats.', 'fact', 3],
  ['Old vs restored Congress', 'Old: many leaders and factions. New: one leader\'s appeal, direct support of the poor.', 'concept', 3],
  ['Exam trap: O and R', 'O = **Organisation** (Syndicate); R = **Requisitionists** (Indira Gandhi).', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Challenges to and Restoration of the Congress System',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_shastri_pm', 'm_non_congressism', 'm_o_and_r', 'ar_defection'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_shastri_challenges', 's_garibi', 's3_why_split'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_succession', 'l_1967'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_sonbhadra'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Challenges to and Restoration of the Congress System',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_nehru_death', 'm_tashkent', 'm_syndicate_meaning', 'm_earthquake', 'm_dmk', 'm_1969_president', 'm_bank_nat', 'm_grand_alliance', 'ar_succession', 'ar_1971_win'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_why_worry', 's_svd_nature', { attempt: 1, keys: ['s_conscience', 's_bank_privy'] }, 's3_earthquake', { attempt: 1, keys: ['s3_restored', 's3_two_successions'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_split_1971', { attempt: 1, keys: ['l_coalitions', 'l_restoration'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_secretariat', 'sb_split_letter'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-political-science-ch12 only (political succession; the fourth general election 1967 and coalitions; the Congress split and the 1971 election)',
    originality: 'every source, state, assembly and speaker is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    data: `imagined Sonbhadra assembly computed by the build: ${HOUSE.seats} seats, majority ${MAJORITY}, front ${HOUSE.front} (surplus ${SURPLUS}), ${HOUSE.defectors} defections leave ${FRONT_AFTER}, ${SHORT_BY} short; real results stated only broadly (narrow Congress majority in 1967; about two-thirds of Lok Sabha seats for the Congress (R) in 1971)`,
    facts: 'Nehru died May 1964; Nanda acting PM; Kamaraj; Shastri June 1964; 1965 war; Tashkent January 1966; Indira Gandhi defeats Morarji Desai 1966; devaluation 1966; Lohia and non-Congressism; DMK majority in Madras 1967; SVD governments; Aya Ram, Gaya Ram (Haryana 1967); Zakir Husain\'s death and the 1969 presidential election (Giri vs Reddy); split November 1969; 14 banks July 1969; privy purses ended 1971; Lok Sabha dissolved December 1970; March 1971 election; Grand Alliance; garibi hatao',
    neutrality: 'leaders and parties described by what they did, without evaluative adjectives; evaluation questions ask for both sides; nothing after 2024',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
