// Build CBSE 12 Political Science ch15 Recent Developments in Indian Politics. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch15/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch15', 'social-science');
const { LS_SEATS, MAJORITY, MOCK, MOCK_TOTAL, MOCK_SHORT, MOCK_SPARE, RES, RES_TOTAL, BJP, SHORT_2024 } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
// Governments at the Centre, 1989–2024 (approximate start and end years for drawing).
const GOVTS = [
  [1989.9, 1990.9, 'National Front: V. P. Singh', 'up', 1],
  [1990.9, 1991.5, 'Chandra Shekhar', 'up', 2],
  [1991.5, 1996.4, 'Congress: P. V. Narasimha Rao', 'up', 3],
  [1996.4, 1998.2, 'United Front: Deve Gowda, Gujral', 'down', 1],
  [1998.2, 2004.4, 'NDA: A. B. Vajpayee', 'down', 2],
  [2004.4, 2014.4, 'UPA: Manmohan Singh', 'up', 1],
  [2014.4, 2024.9, 'NDA: Narendra Modi', 'down', 1],
];
const vGovts = (() => {
  const s = new Svg(760, 260);
  const X = (y) => 40 + ((y - 1989) / (2025 - 1989)) * 680;
  const BAR = 120;
  s.arrow(30, BAR + 22, 740, BAR + 22, { sw: 1.4 });
  for (const yr of [1990, 2000, 2010, 2020]) {
    s.line(X(yr), BAR + 16, X(yr), BAR + 28, { sw: 1.2, color: 'muted' });
    s.text(X(yr), BAR + 40, String(yr), { size: 11, muted: true });
  }
  const LANE = { up: [0, 28, 56, 84], down: [0, 182, 210, 238] };
  GOVTS.forEach(([a, b, label, side, lane], i) => {
    s.rect(X(a), BAR, X(b) - X(a), 16, { rx: 2, sw: 1, color: i % 2 ? 'muted' : 'accent', fill: i % 2 ? 'muted' : 'accent', fillOpacity: 0.6 });
    const y = LANE[side][lane];
    s.line(X(a) + 1, side === 'up' ? y + 8 : y - 8, X(a) + 1, side === 'up' ? BAR : BAR + 16, { sw: 1, color: 'muted' });
    s.text(X(a) + 4, y, label, { anchor: 'start', size: 12 });
  });
  return s.visual(
    'Timeline of governments at the Centre from 1989 to 2024: National Front under V. P. Singh from 1989; Chandra Shekhar 1990 to 1991; Congress under P. V. Narasimha Rao 1991 to 1996; United Front under H. D. Deve Gowda and I. K. Gujral 1996 to 1998; NDA under A. B. Vajpayee 1998 to 2004; UPA under Manmohan Singh 2004 to 2014; NDA under Narendra Modi from 2014',
    'Governments at the Centre, 1989–2024 (a short BJP-led government in 1996 lasted about two weeks).',
  );
})();

const vSeats = (() => {
  const s = new Svg(620, 300);
  const c = s.chart({ x0: 0, x1: 3, y0: 0, y1: 350, left: 70, top: 34, width: 500, height: 210, yLabel: 'Lok Sabha seats', xLabel: 'Election' });
  [2014, 2019, 2024].forEach((yr, i) => {
    const x = i + 0.5;
    const v = BJP[yr];
    s.rect(c.X(x - 0.18), c.Y(v), c.X(x + 0.18) - c.X(x - 0.18), c.Y(0) - c.Y(v), { rx: 2, sw: 1.2, color: 'accent', fill: 'accent', fillOpacity: 0.55 });
    s.text(c.X(x), c.Y(v) - 10, String(v), { size: 12 });
    c.xTick(x, String(yr));
  });
  s.line(c.X(0), c.Y(MAJORITY), c.X(3), c.Y(MAJORITY), { sw: 1.6, dash: true, color: 'red' });
  s.text(c.X(3), c.Y(MAJORITY) - 10, `Majority mark ${MAJORITY}`, { anchor: 'end', size: 12, color: 'red' });
  [0, 100, 200, 300].forEach((v) => c.yTick(v, String(v)));
  return s.visual(
    `Bar chart of seats won by the BJP, the single largest party, in three Lok Sabha elections: ${BJP[2014]} in 2014, ${BJP[2019]} in 2019 and ${BJP[2024]} in 2024, with a dashed line at the majority mark of ${MAJORITY}; the first two bars cross the line and the third does not`,
    `Commonly reported results; the House has ${LS_SEATS} seats.`,
  );
})();

const vMock = (() => {
  const s = new Svg(640, 230);
  const L = 40, W = 560, Y0 = 70, H = 44;
  const X = (v) => L + (v / LS_SEATS) * W;
  let acc = 0;
  const parts = [[MOCK.lead, 'Green Party', 'accent'], ...MOCK.allies.map((v, i) => [v, `Ally ${i + 1}`, 'muted'])];
  parts.forEach(([v, , col], i) => {
    s.rect(X(acc), Y0, X(acc + v) - X(acc), H, { rx: 0, sw: 1, color: col, fill: col, fillOpacity: i ? 0.35 + 0.15 * i : 0.6 });
    acc += v;
  });
  s.text(X(MOCK.lead / 2), Y0 + H / 2, `${MOCK.lead}`, { size: 13, bold: true });
  s.text(X(MOCK.lead) + 4, Y0 - 12, `Allies ${MOCK.allies.join(' + ')}`, { anchor: 'start', size: 12 });
  s.line(X(MAJORITY), Y0 - 30, X(MAJORITY), Y0 + H + 30, { sw: 1.6, dash: true, color: 'red' });
  s.text(X(MAJORITY), Y0 - 40, `Majority ${MAJORITY}`, { size: 12, color: 'red' });
  s.text(X(acc), Y0 + H + 44, `Total ${MOCK_TOTAL}`, { size: 12, bold: true });
  s.text(L, Y0 + H + 44, 'Green Party alone is short', { anchor: 'start', size: 12, muted: true });
  s.line(L, Y0 + H + 8, X(LS_SEATS), Y0 + H + 8, { sw: 1, color: 'muted' });
  s.text(X(LS_SEATS), Y0 + H + 22, `${LS_SEATS} seats`, { anchor: 'end', size: 11, muted: true });
  return s.visual(
    `Stacked bar of an imagined mock parliament of ${LS_SEATS} seats: the Green Party has ${MOCK.lead} seats and three allies add ${MOCK.allies.join(', ')}, giving ${MOCK_TOTAL}; a dashed line marks the majority of ${MAJORITY}, which the party alone does not reach but the alliance passes by ${MOCK_SPARE}`,
    'Imagined figures, computed by the build.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['End of Congress dominance', 'Coalition era', 'Mandal and OBC politics'], 'Route map of Part 1: the end of Congress dominance, the coalition era, and Mandal and the politics of backward classes', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Communalism and secularism', 'Ayodhya 1986–2019', 'New consensus', 'Elections 2014–2024'], 'Route map of Part 2: communalism and secularism, the Ayodhya dispute from 1986 to 2019, the new consensus, and the elections of 2014 to 2024', 'Part 2 at a glance');
const vFive = table(
  ['Development (around 1989–92)', 'Why it mattered'],
  [
    ['1989 election: no party wins a majority', 'Beginning of the coalition era'],
    ['Mandal decision, August 1990', 'Backward-caste politics becomes central'],
    ['New economic policy, 1991', 'Shift in economic direction'],
    ['Assassination of Rajiv Gandhi, May 1991', 'Change in Congress leadership'],
    ['Ayodhya dispute, demolition in December 1992', 'Religion and secularism at the centre of debate'],
  ],
  'Table of five developments around 1989 to 1992 and why each mattered: the 1989 hung verdict, the Mandal decision of 1990, the new economic policy of 1991, the assassination of Rajiv Gandhi in May 1991, and the Ayodhya dispute leading to the demolition of December 1992',
);
const vGovtTable = table(
  ['Years', 'Government', 'How it held a majority'],
  [
    ['1989–90', 'National Front (V. P. Singh)', 'Outside support of the BJP and the Left'],
    ['1990–91', 'Chandra Shekhar', 'Outside support of the Congress'],
    ['1991–96', 'Congress (P. V. Narasimha Rao)', 'Minority at first; later gained enough support'],
    ['1996–98', 'United Front (Deve Gowda, then Gujral)', 'Outside support of the Congress'],
    ['1998–2004', 'NDA (A. B. Vajpayee)', 'Pre-poll alliance led by the BJP'],
    ['2004–14', 'UPA (Manmohan Singh)', 'Alliance led by the Congress; Left support till 2008'],
  ],
  'Table of governments from 1989 to 2014 and how each held a majority: National Front with outside support of the BJP and the Left; Chandra Shekhar with Congress support; the Congress under Narasimha Rao; the United Front with Congress support; the NDA under Vajpayee; the UPA under Manmohan Singh',
);
const vCoalFeatures = table(
  ['Feature', 'What it looks like'],
  [
    ['No single-party majority', 'Several parties needed to reach 272'],
    ['Outside support', 'A party backs the government without ministers'],
    ['Common minimum programme', 'Written agenda all partners accept'],
    ['Bargaining power', 'Small partners seek posts and policies'],
    ['Instability risk', 'A partner leaving can bring a government down'],
  ],
  'Table of five features of coalition politics: no single-party majority, outside support, a common minimum programme, bargaining power of small partners, and the risk of instability',
);
const vMandalFlow = flow('LR', ['1978: Commission appointed', '1980: report submitted', 'August 1990: decision announced', 'Protests and support', '1992: upheld by the Supreme Court'], 'Flow of the Mandal story: commission appointed in 1978, report in 1980, decision announced in August 1990, protests and support, and the Supreme Court upholding it in 1992', 'The Mandal issue step by step');
const vReservation = table(
  ['Group', 'Share of central government posts'],
  [['Other Backward Classes', `${RES.OBC} per cent`], ['Scheduled Castes', `${RES.SC} per cent`], ['Scheduled Tribes', `${RES.ST} per cent`], ['Total', `${RES_TOTAL} per cent (within the 50 per cent ceiling)`]],
  `Table of reservation in central government posts: ${RES.OBC} per cent for OBCs, ${RES.SC} per cent for Scheduled Castes and ${RES.ST} per cent for Scheduled Tribes, a total of ${RES_TOTAL} per cent`,
);
const vObcEffects = flow('TB', ['Mandal decision (1990)', 'Backward castes organise politically', 'Parties compete for their support', 'More OBC leaders in legislatures and governments'], 'Flow: the Mandal decision of 1990 led backward castes to organise, parties to compete for their support, and more OBC leaders to enter legislatures and governments', 'From a decision to a new politics');
const vAyodhya = flow('LR', ['1986: locks opened by court order', '1990: rath yatra', '6 December 1992: demolition', 'Violence; UP government dismissed', '2019: Supreme Court verdict'], 'Flow of the Ayodhya dispute: locks opened in 1986, a rath yatra in 1990, demolition on 6 December 1992, violence and dismissal of the state government, and the Supreme Court verdict in 2019', 'The Ayodhya dispute, 1986–2019');
const vSecular = table(
  ['Communal politics', 'Secular democracy'],
  [
    ['Divides people by religion', 'Treats every citizen as equal'],
    ['Claims one community is superior or threatened by others', 'State keeps equal distance from all religions'],
    ['Can lead to violence and fear', 'Law protects every life and property alike'],
  ],
  'Comparison table: communal politics divides people by religion, claims one community is superior or threatened, and can lead to violence; secular democracy treats every citizen as equal, keeps the state equidistant from all religions and protects all lives alike',
);
const vResponses = table(
  ['Event', 'Institutional response'],
  [
    ['Demolition, December 1992', 'State government dismissed; President\'s Rule; commission of inquiry'],
    ['Violence in Gujarat, 2002', 'National Human Rights Commission examined the state\'s response'],
    ['Title dispute', 'Settled by the Supreme Court in November 2019'],
  ],
  'Table of institutional responses: after the demolition in 1992 the state government was dismissed and an inquiry set up; after the Gujarat violence of 2002 the National Human Rights Commission examined the state response; the title dispute was settled by the Supreme Court in 2019',
);
const vConsensus = table(
  ['Element of the new consensus', 'Example'],
  [
    ['Agreement on new economic policies', 'Reforms continued under different governments after 1991'],
    ['Acceptance of backward-caste claims', 'All major parties accepted OBC reservation'],
    ['Role of state-level parties', 'They shared power at the Centre in UF, NDA and UPA'],
    ['Pragmatism over ideology', 'Alliances across ideological lines'],
  ],
  'Table of four elements of the new consensus with examples: agreement on economic reforms, acceptance of backward-caste claims, the role of state-level parties at the Centre, and pragmatic alliances across ideological lines',
);
const vElections = table(
  ['Election', 'Largest party (seats)', 'Majority on its own?', 'Government'],
  [['2014', `BJP (${BJP[2014]})`, 'Yes', 'NDA; Narendra Modi PM'], ['2019', `BJP (${BJP[2019]})`, 'Yes', 'NDA; Narendra Modi PM'], ['2024', `BJP (${BJP[2024]})`, `No (${SHORT_2024} short)`, 'NDA; Narendra Modi PM, third term']],
  `Table of the 2014, 2019 and 2024 Lok Sabha elections: the BJP won ${BJP[2014]}, ${BJP[2019]} and ${BJP[2024]} seats; it had a majority on its own in 2014 and 2019 but not in 2024, when it was ${SHORT_2024} short; the NDA formed the government each time with Narendra Modi as Prime Minister`,
  'Commonly reported results; no party is evaluated here.',
);
const vPlan5 = table(
  ['Step', 'For a 5-mark answer on coalition politics'],
  [['1', 'Define: coalition = government of two or more parties'], ['2', 'Context: no single-party majority 1989–2014'], ['3', 'Three features, each with a dated example'], ['4', 'A balanced closing line'], ['5', 'Stay within 80–120 words']],
  'Table showing five steps for a five-mark answer on coalition politics: define, give context, three features with dated examples, a balanced closing line, and keep to 80 to 120 words',
);
const vSourceSteps = table(
  ['Source skill', 'What to do'],
  [['Identify', 'Name the event, law or concept the source points to'], ['Quote', 'Copy the exact line that proves your answer'], ['Explain', 'Link the line to the concept in your own words']],
  'Table of three source-reading steps: identify the event or concept, quote the exact line, and explain the link in your own words',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [['End of dominance', '1989 hung verdict; Rajiv Gandhi killed May 1991; reforms 1991'], ['Coalition era', 'NF, UF, NDA, UPA; outside support; common minimum programme'], ['Mandal', '1978 commission, 1980 report, 1990 decision, 1992 judgment']],
  'Summary table for Part 1: the end of Congress dominance, the coalition era and the Mandal issue',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [['Communalism', 'Shah Bano 1985; locks opened 1986; demolition 1992; Gujarat 2002; verdict 2019'], ['New consensus', 'Reforms, OBC claims, state parties, pragmatism'], ['Recent elections', `2014 and 2019 single-party majority; 2024 NDA with allies`]],
  'Summary table for Part 2: communalism and the Ayodhya dispute, the new consensus, and the recent elections',
);
const vTips1 = table(
  ['Common slip', 'Correct version'],
  [['Rajiv Gandhi was PM when killed', 'He was campaigning in 1991, in opposition'], ['Mandal set up in 1990', 'Appointed 1978; decision announced 1990'], ['NF had its own majority', 'It relied on outside support']],
  'Table of common slips for Part 1 with the correct versions',
);
const vTips2 = table(
  ['Common slip', 'Correct version'],
  [['BJP majority on its own in 2024', `${BJP[2024]} seats; NDA formed the government`], ['Shah Bano in 1992', 'Judgment of 1985'], ['Giving opinions on current leaders', 'Give facts and balanced arguments']],
  'Table of common slips for Part 2 with the correct versions',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Recent Developments in Indian Politics — Part 1: Coalitions and the Rise of the OBCs',
  goals: [
    'Explain the developments that ended Congress dominance around 1989–91',
    'Describe the governments and the features of the coalition era from 1989 to 2014',
    'Explain the Mandal issue and the political rise of the Other Backward Classes',
  ],
  slides: [
    sl('title', 'Recent Developments in Indian Politics', {
      b: 'Part 1 — the **end of Congress dominance**, the **coalition era** and **Mandal**.',
      v: vRoute1,
      n: 'Between 1989 and 1992 Indian politics changed more quickly than in any earlier period. One party no longer dominated, governments were formed by alliances, and the politics of backward castes moved to the centre. In this part we follow these changes, using dates and facts you can rely on in the exam.',
    }),
    sl('concept', 'Five developments around 1989–92', {
      v: vFive,
      n: 'Five developments shaped the decade. The 1989 election gave no party a majority. In 1990 the decision on the Mandal report changed the politics of caste. In 1991 the new economic policy began. In May 1991 Rajiv Gandhi was assassinated while campaigning. And the Ayodhya dispute grew until the demolition of December 1992.',
    }),
    sl('concept', 'The 1989 verdict', {
      b: 'In 1989 the Congress remained the largest party but lost its majority.',
      bl: ['National Front government under V. P. Singh', 'Outside support from the BJP and the Left', 'Start of a long period without single-party majorities'],
      n: 'In the 1989 election the Congress lost its majority. A National Front government was formed under V. P. Singh, and it survived only because two very different groups, the BJP and the Left parties, supported it from outside. From now until 2014 no party would win a Lok Sabha majority on its own.',
    }),
    sl('diagram', 'Governments from 1989 to 2024', {
      v: vGovts,
      n: 'This timeline shows every government at the Centre from 1989. Notice how short the early ones are: the National Front, Chandra Shekhar, and the United Front. Governments became more stable from 1998, when the NDA under A. B. Vajpayee and then the UPA under Manmohan Singh each completed full terms. The NDA has governed since 2014.',
    }),
    sl('check', 'Quick check: outside support', {
      b: 'A party votes for the government but takes no minister\'s post. What is this called?',
      chk: 'm_outside',
      n: 'Think about the National Front in 1989 and the United Front in 1996. Some parties kept them in office without joining the ministry. What do we call this?',
    }),
    sl('two-column', 'How each government held a majority', {
      cols: ['**1989–98:** short-lived governments depending on outside support', '**1998–2014:** larger alliances, the NDA and the UPA, completing full terms'],
      v: vGovtTable,
      n: 'The table shows how each government found its majority. Until 1998, governments depended on parties outside the ministry, and they fell when that support was withdrawn. From 1998, larger alliances formed before or after the election, the NDA led by the BJP and the UPA led by the Congress, gave more stable governments.',
    }),
    sl('concept', 'Features of coalition politics', {
      v: vCoalFeatures,
      n: 'Coalition politics has five main features. No party can reach the majority mark alone. Some parties give outside support. Partners agree on a common minimum programme. Small partners gain bargaining power because their seats are needed. And governments face the risk of collapse if a partner leaves, as happened in April 1999.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange the governments from the National Front to the UPA in chronological order.',
      chk: 'ord_govts',
      n: 'Use the timeline in your mind. Which came first, the United Front or the NDA? And where does the Congress government of 1991 fit?',
    }),
    sl('example', 'Worked example 1: coalition arithmetic', {
      b: 'An imagined mock parliament with 543 seats.',
      bl: [
        `Step 1 — Majority mark: half of ${LS_SEATS} is 271.5, so ${MAJORITY}.`,
        `Step 2 — Largest party: ${MOCK.lead}; short by ${MOCK_SHORT}.`,
        `Step 3 — Add allies: ${MOCK.lead} + ${MOCK.allies.join(' + ')} = ${MOCK_TOTAL}.`,
        `Step 4 — ${MOCK_TOTAL} is ${MOCK_SPARE} above ${MAJORITY}: the alliance can govern.`,
      ],
      v: vMock,
      n: `Let us practise coalition arithmetic with an imagined mock parliament. The majority mark is ${MAJORITY}. The largest party has ${MOCK.lead} seats, which is not enough. When three smaller parties join, the total reaches ${MOCK_TOTAL}, just above the mark. Notice how much power the smallest ally now has: without it, the alliance would fall below the line.`,
    }),
    sl('check', 'Quick check: the majority mark', {
      b: 'The Lok Sabha has 543 elected seats. What is the majority mark?',
      chk: 'n_majority',
      n: 'A majority means more than half of the seats. Work out half of five hundred and forty three, then find the next whole number.',
    }),
    sl('concept', 'The Mandal Commission', {
      b: 'The **Second Backward Classes Commission**, chaired by **B. P. Mandal**.',
      bl: ['Appointed by the Janata government in 1978', 'Report submitted in 1980', `Recommended ${RES.OBC} per cent reservation for OBCs in education and government jobs`],
      v: vMandalFlow,
      n: 'The Second Backward Classes Commission was appointed in 1978 and chaired by B. P. Mandal. Its report of 1980 found that backward castes were poorly represented in education and public jobs, and recommended twenty seven per cent reservation for them. For ten years the report was not acted upon, until August 1990.',
    }),
    sl('concept', 'The 1990 decision and the reactions', {
      b: 'In **August 1990** the National Front government announced OBC reservation in central government jobs.',
      bl: ['Protests by some groups who opposed caste-based reservation', 'Strong support from backward-caste groups', 'The matter reached the Supreme Court'],
      n: 'In August 1990 the National Front government announced that it would reserve central government jobs for OBCs. The decision divided opinion sharply. Some groups, many of them students, protested against it, while backward-caste groups strongly supported it. The question then went to the Supreme Court.',
    }),
    sl('diagram', 'The Indra Sawhney judgment and reservation shares', {
      b: 'In **1992** the Supreme Court upheld the decision, with a 50 per cent ceiling and exclusion of the creamy layer.',
      v: vReservation,
      n: `In 1992, in the Indra Sawhney case, the Supreme Court upheld OBC reservation in central jobs. It said total reservation should generally not cross half, and it excluded the better-off among the OBCs, called the creamy layer. Add the shares in the table and you get ${RES_TOTAL} per cent, just inside the ceiling.`,
    }),
    sl('check', 'Quick check: the creamy layer', {
      b: 'Which children of an OBC family would be outside OBC reservation?',
      chk: 'm_creamy',
      n: 'Remember the purpose of excluding the creamy layer: benefits should reach those who still need them.',
    }),
    sl('concept', 'The political rise of the OBCs', {
      v: vObcEffects,
      n: 'The Mandal decision did more than change job rules. Backward castes organised politically, parties with strong support among them grew, especially in the north, and every party had to compete for their votes. Parties representing Dalits, such as the Bahujan Samaj Party founded in 1984 under Kanshi Ram, also grew in this period.',
    }),
    sl('example', 'Worked example 2: planning a five-mark answer', {
      b: 'Question: describe the features of coalition politics in India.',
      v: vPlan5,
      n: 'For a five-mark answer, plan before you write. Start with a one-line definition. Add the context that no party won a majority from 1989 to 2014. Then give three features, each with a dated example such as outside support in 1989 or a government falling in 1999. Close with a balanced line, and keep within the word limit.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The 1989 verdict ended single-party majorities for twenty five years. Governments relied first on outside support and later on larger alliances, the NDA and the UPA. The Mandal Commission of 1978, the decision of 1990 and the judgment of 1992 brought backward castes to the centre of Indian politics.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      n: 'Three slips to avoid. Rajiv Gandhi was not Prime Minister in 1991; he was campaigning when he was killed. The Mandal Commission was appointed in 1978, not 1990. And the National Front never had a majority of its own; it relied on outside support. Dates and names earn marks in this chapter, so learn them carefully.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Recent Developments in Indian Politics — Part 2: Secularism, Consensus and Recent Elections',
  goals: [
    'Explain communalism and secularism and the challenges posed by the Ayodhya dispute and communal violence',
    'Describe the elements of the new consensus among parties',
    'State the results of the Lok Sabha elections of 2014, 2019 and 2024 as dated facts',
  ],
  slides: [
    sl('title', 'Secularism, consensus and recent elections', {
      b: 'Part 2 — **communalism and secularism**, the **new consensus** and the **elections of 2014 to 2024**.',
      v: vRoute2,
      n: 'In this part we look at a difficult question for any democracy: how should it deal with conflicts based on religion? Then we see the points on which most parties came to agree, and finally we note, as plain facts, the results of the last three Lok Sabha elections.',
    }),
    sl('two-column', 'Communal politics and secular democracy', {
      cols: ['**Communalism:** religion used to divide citizens', '**Secularism:** equal respect, equal law, equal protection'],
      v: vSecular,
      n: 'Communal politics treats religious communities as rivals and uses religion to divide citizens. A secular democracy treats every citizen as equal, whatever their faith, and the state protects every life and property alike. India\'s Constitution follows the second idea, and the events of this period tested it.',
    }),
    sl('concept', 'The Shah Bano case, 1985', {
      b: 'A judgment on maintenance for a divorced woman led to a national debate.',
      bl: ['Supreme Court judgment, 1985', 'Parliament passed a law on the subject in 1986', 'Debate on personal law, women\'s rights and secularism'],
      n: 'In 1985 the Supreme Court ruled that a divorced woman, Shah Bano, could claim maintenance from her former husband. Some groups saw the judgment as interference in personal law, while others saw it as a matter of women\'s rights. Parliament passed a law on the subject in 1986, and the debate on secularism became sharper.',
    }),
    sl('diagram', 'The Ayodhya dispute, 1986 to 2019', {
      v: vAyodhya,
      n: 'Follow the dispute step by step. In 1986 a court order led to the opening of the locks of the disputed structure. In 1990 a rath yatra made the temple demand a national campaign. On the sixth of December 1992 the Babri Masjid was demolished, and violence followed in many places. In 2019 the Supreme Court decided the title dispute.',
    }),
    sl('check', 'Quick check: a secular administration', {
      b: 'An imagined town protects processions of every faith and punishes anyone who incites violence. What does this reflect?',
      chk: 'm_secular_scenario',
      n: 'Ask whether the administration treats every community the same way. Which idea from the table does that match?',
    }),
    sl('concept', 'After December 1992', {
      b: 'Violence in several parts of the country; the Uttar Pradesh government was dismissed.',
      bl: ['President\'s Rule imposed in Uttar Pradesh', 'A commission of inquiry was set up', 'The debate on secularism intensified'],
      n: 'The demolition was followed by communal violence in several parts of India in which many people lost their lives. The central government dismissed the state government of Uttar Pradesh, and a commission was set up to inquire into the events. For many people the question became how a democracy protects all its citizens equally.',
    }),
    sl('concept', 'Gujarat, 2002', {
      b: 'A fire on a train at Godhra in February 2002 was followed by violence across many parts of Gujarat.',
      v: vResponses,
      n: 'In February 2002 a fire on a train at Godhra killed many passengers. Violence then spread across many parts of Gujarat, and many people, most of them Muslims, lost their lives. The National Human Rights Commission examined how the state government had responded. Episodes like this remind us that equal protection of the law is the first duty of a democratic state.',
    }),
    sl('check', 'Quick check: the 2019 verdict', {
      b: 'True or false: the Supreme Court decided the Ayodhya title dispute in November 2019.',
      chk: 'tf_2019',
      n: 'Recall the last step of the flow diagram you saw a moment ago.',
    }),
    sl('example', 'Worked example 1: reading a source', {
      b: 'An imagined peace committee writes in January 1993 that "anyone who threatens a neighbour will be arrested, whatever his faith".',
      v: vSourceSteps,
      n: 'Source questions follow three steps. First identify: the minutes come soon after the events of December 1992. Then quote the exact line that answers the question. Finally explain the link in your own words: arresting anyone who threatens a neighbour, whatever his faith, is equal protection of the law, a principle of secular democracy.',
    }),
    sl('concept', 'The new consensus', {
      v: vConsensus,
      n: 'Despite sharp competition, most parties came to agree on four things. They accepted the new economic policies, differing mainly on pace. They accepted the claims of backward castes. They accepted state-level parties as partners in governing the country. And they made alliances for practical reasons of winning and governing, often across ideological lines.',
    }),
    sl('check', 'Quick check: pragmatism', {
      b: 'Two parties with very different ideologies make a pre-poll alliance to win more seats. What does this illustrate?',
      chk: 'm_pragmatic',
      n: 'Is the alliance based on shared ideas, or on the practical goal of winning? Choose the option that matches.',
    }),
    sl('concept', 'State-level parties at the Centre', {
      b: 'State-level parties became partners in governing the country.',
      bl: ['Partners in the United Front, the NDA and the UPA', 'Held ministries and shaped national decisions', 'The line between national and regional parties grew weaker'],
      n: 'From 1996 onwards, parties based in one state regularly held ministries at the Centre as alliance partners. They shaped national decisions on many issues. As a result, the old line between national and regional parties became much less sharp, which is an important part of the new consensus.',
    }),
    sl('diagram', 'Lok Sabha elections of 2014, 2019 and 2024', {
      v: vSeats,
      n: `These are dated facts, not judgements. In 2014 the BJP won ${BJP[2014]} seats, the first single-party majority since 1984. In 2019 it won ${BJP[2019]} seats. In 2024 it won ${BJP[2024]} seats, short of the majority mark, and the NDA formed the government with its allies. Narendra Modi was sworn in for a third term in June 2024.`,
    }),
    sl('concept', 'The three results side by side', {
      v: vElections,
      n: 'The table puts the three results side by side. The government each time was formed by the NDA with Narendra Modi as Prime Minister. The difference is whether the largest party had a majority on its own: yes in 2014 and 2019, no in 2024. In the exam, state such results as facts and do not add opinions.',
    }),
    sl('check', 'Quick check: 2014', {
      b: 'What was significant about the result of the 2014 Lok Sabha election?',
      chk: 'm_2014',
      n: 'Think back to the coalition era that began in 1989. What changed in 2014?',
    }),
    sl('example', 'Worked example 2: a balanced answer', {
      b: 'Question: coalition government versus single-party majority. Present both views.',
      bl: ['Two points for coalitions: wider representation; consultation', 'Two points for majorities: quicker decisions; less risk of collapse', 'Conclusion: both work within the Constitution if accountable to Parliament'],
      v: vCoalFeatures,
      n: 'Some questions ask you to weigh two views. Give two clear points on each side, with examples such as the fall of a government in 1999. Then end with a reasoned conclusion that rests on constitutional principles, such as accountability to Parliament. You are never asked to judge a present party or leader, so keep to facts and arguments.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Communal politics divides citizens, while secular democracy protects all equally. The Ayodhya dispute ran from 1986 to the Supreme Court verdict of 2019, with violence after 1992 and in Gujarat in 2002. Most parties came to share a new consensus. The elections of 2014 and 2019 gave one party a majority; in 2024 the NDA governed with allies.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      n: 'Three slips to avoid. In 2024 the BJP did not win a majority on its own; the NDA formed the government. The Shah Bano judgment came in 1985, not 1992. And on recent politics, examiners want accurate facts and balanced arguments, not your opinion of any party or leader.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Recent Developments in Indian Politics — notes',
  sections: [
    {
      h: '1. The changes of 1989–92',
      t: 1,
      b: '- **1989:** the Congress lost its majority; a **National Front** government under **V. P. Singh** took office with outside support from the BJP and the Left.\n- **1990:** the Mandal decision; the National Front government fell in November and **Chandra Shekhar** formed a government with Congress support.\n- **May 1991:** **Rajiv Gandhi** was assassinated during the election campaign in Tamil Nadu.\n- **1991:** a Congress government under **P. V. Narasimha Rao** began the **new economic policy**.\n- **December 1992:** the demolition at **Ayodhya**.',
      terms: [['Hung Parliament', 'A Lok Sabha in which no party or pre-poll alliance has a majority.']],
      v: vFive,
    },
    {
      h: '2. The coalition era, 1989–2014',
      t: 1,
      b: '**Governments:** National Front (1989–90); Chandra Shekhar (1990–91); Congress under Rao (1991–96); a BJP-led government of about two weeks (1996); **United Front** under **H. D. Deve Gowda** and **I. K. Gujral** (1996–98, Congress support from outside); **NDA** under **A. B. Vajpayee** (1998–2004, lost a confidence vote by one vote in April 1999 and returned after the 1999 election); **UPA** under **Manmohan Singh** (2004–14).\n\n**Features:** no single-party majority; outside support; a **common minimum programme**; bargaining power of small partners; risk of a government falling when a partner leaves.',
      terms: [
        ['Coalition government', 'A government formed by two or more parties together.'],
        ['Outside support', 'Voting for a government in the House without joining its ministry.'],
        ['Common minimum programme', 'The shared agenda that coalition partners agree to follow.'],
      ],
      v: vGovts,
      vs: [vGovtTable, vCoalFeatures],
    },
    {
      h: '3. Mandal and the political rise of the OBCs',
      t: 2,
      b: `- **1978:** the Janata government appointed the **Second Backward Classes Commission** under **B. P. Mandal**; report in **1980**.\n- It recommended **${RES.OBC} per cent** reservation for OBCs in educational institutions and government jobs.\n- **August 1990:** the National Front government announced OBC reservation in central government jobs; protests by some, strong support from others.\n- **1992, Indra Sawhney case:** the Supreme Court upheld the decision, kept total reservation generally within **50 per cent** and excluded the **creamy layer**.\n\n**Political effects:** backward castes organised; parties with strong OBC support grew, especially in the north; every party now sought these votes. The **Bahujan Samaj Party** (1984, **Kanshi Ram**) grew among Dalit voters in this period.`,
      terms: [
        ['OBC', 'Other Backward Classes: socially and educationally backward groups other than SCs and STs.'],
        ['Creamy layer', 'The better-off section among OBCs, excluded from OBC reservation.'],
      ],
      v: vMandalFlow,
      vs: [vReservation, vObcEffects],
    },
    {
      h: '4. Communalism, secularism and democracy',
      t: 3,
      b: '- **1985:** the **Shah Bano** judgment on maintenance and the 1986 law started a national debate on personal law and secularism.\n- **1986:** a court order led to the opening of the locks of the disputed structure at Ayodhya.\n- **1990:** a **rath yatra** from Somnath towards Ayodhya.\n- **6 December 1992:** demolition of the **Babri Masjid**; violence in many places; the UP government dismissed; a commission of inquiry appointed.\n- **2002:** after a fire on a train at Godhra, violence spread across Gujarat; the **NHRC** examined the state\'s response.\n- **November 2019:** the **Supreme Court** decided the title dispute: the site for a temple through a trust, and five acres elsewhere in Ayodhya for a mosque.\n\n**Lesson for democracy:** equal protection of every citizen and peaceful, legal settlement of disputes.',
      terms: [
        ['Communalism', 'Politics that divides people on the basis of religion.'],
        ['Secularism', 'Equal treatment of all religions by the state and equal rights for all citizens.'],
      ],
      v: vAyodhya,
      vs: [vSecular, vResponses],
    },
    {
      h: '5. The emerging consensus',
      t: 4,
      b: '1. **New economic policies:** accepted by most parties, with differences of degree.\n2. **Backward-caste claims:** representation and reservation accepted across parties.\n3. **State-level parties:** accepted as partners in central government.\n4. **Pragmatism:** alliances formed to win and govern, not only on shared ideology.',
      terms: [['Pragmatism', 'Acting on practical considerations rather than fixed ideological positions.']],
      v: vConsensus,
    },
    {
      h: '6. Lok Sabha elections, 2014–2024 (dated facts)',
      t: 4,
      b: `- **2014:** the BJP won **${BJP[2014]}** seats, the first single-party majority since 1984; the **NDA** formed the government with **Narendra Modi** as Prime Minister.\n- **2019:** the BJP won **${BJP[2019]}** seats; the NDA continued in office.\n- **2024:** the BJP won **${BJP[2024]}** seats, below the majority mark of **${MAJORITY}**; the **NDA** formed the government with its allies and Narendra Modi was sworn in for a third term in **June 2024**.\n\nSeat figures are as commonly reported. Answers on recent politics should state facts and balanced arguments, not opinions about parties or leaders.`,
      terms: [['Majority mark', `${MAJORITY} of the ${LS_SEATS} elected Lok Sabha seats.`]],
      v: vSeats,
      vs: [vElections],
    },
  ],
  tips: '**Common mistakes**\n- Saying Rajiv Gandhi was Prime Minister in 1991: he was campaigning, in opposition.\n- Dating the Mandal Commission to 1990: it was appointed in **1978**; the decision came in 1990.\n- Saying the BJP won a majority on its own in 2024: the **NDA** formed the government.\n- Writing opinions about current parties or leaders: give **facts and balanced arguments**.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, date or term.\n- 2–3 marks: one explained point per mark, with a date or example.\n- 5 marks: five numbered points; "examine" or "evaluate" needs both sides and a conclusion.\n- Source questions: identify, quote the line, explain.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Election that began the coalition era', '**1989**.', 'fact', 1],
  ['National Front government', '**1989–90**, **V. P. Singh**, outside support from the **BJP and the Left**.', 'fact', 1],
  ['Rajiv Gandhi assassinated', '**May 1991**, during the election campaign in Tamil Nadu.', 'fact', 1],
  ['Government that began the 1991 reforms', 'Congress under **P. V. Narasimha Rao**.', 'fact', 1],
  ['United Front Prime Ministers', '**H. D. Deve Gowda** and **I. K. Gujral** (1996–98).', 'fact', 1],
  ['NDA 1998–2004', 'Led by the BJP; Prime Minister **A. B. Vajpayee**.', 'fact', 1],
  ['April 1999', 'NDA government lost a confidence vote by **one vote**.', 'fact', 1],
  ['UPA 2004–14', 'Led by the Congress; Prime Minister **Manmohan Singh**.', 'fact', 1],
  ['**Outside support**', 'Backing a government in the House without joining the ministry.', 'definition', 1],
  ['**Common minimum programme**', 'The agreed agenda of coalition partners.', 'definition', 1],
  ['Lok Sabha majority mark', `**${MAJORITY}** of ${LS_SEATS} seats.`, 'fact', 1],
  ['Mandal Commission appointed', '**1978**, by the Janata government; report **1980**.', 'fact', 2],
  ['Mandal recommendation', `**${RES.OBC} per cent** reservation for OBCs in education and government jobs.`, 'fact', 2],
  ['Decision to implement Mandal', '**August 1990**, National Front government.', 'fact', 2],
  ['Indra Sawhney case (1992)', 'Upheld OBC reservation; **50 per cent** ceiling; creamy layer excluded.', 'fact', 2],
  ['**Creamy layer**', 'Better-off OBCs, excluded from OBC reservation.', 'definition', 2],
  ['Total central reservation', `${RES.OBC} + ${RES.SC} + ${RES.ST} = **${RES_TOTAL} per cent**.`, 'example', 2],
  ['BSP founded', '**1984**, under **Kanshi Ram**.', 'fact', 2],
  ['Shah Bano judgment', '**1985**; debate on personal law and secularism.', 'fact', 3],
  ['Locks opened at Ayodhya', '**1986**, after a court order.', 'fact', 3],
  ['Demolition of the Babri Masjid', '**6 December 1992**.', 'fact', 3],
  ['Supreme Court Ayodhya verdict', '**November 2019**.', 'fact', 3],
  ['**Communalism**', 'Dividing people on the basis of religion.', 'definition', 3],
  ['Why communal violence threatens democracy', 'It denies citizens **equal protection** and security.', 'concept', 3],
  ['Four elements of the new consensus', 'Economic reforms; backward-caste claims; state-level parties; pragmatism.', 'concept', 4],
  ['2014 Lok Sabha result', `BJP **${BJP[2014]}**: first single-party majority since 1984.`, 'fact', 4],
  ['2019 Lok Sabha result', `BJP **${BJP[2019]}**: majority on its own.`, 'fact', 4],
  ['2024 Lok Sabha result', `BJP **${BJP[2024]}**, short of a majority; **NDA** government.`, 'fact', 4],
  ['Exam trap: 2024', 'Do **not** write that the BJP won a majority on its own.', 'exam-tip', 4],
  ['Exam rule for recent politics', 'Facts and balanced arguments, **no opinions** on parties or leaders.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Recent Developments in Indian Politics',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_1989_turn', 'm_mandal_reco', 'm_dec1992', 'ar_cmp'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_coalition_meaning', 's_consensus_two', 's3_obc_politics'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_mandal', 'l_consensus'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_diary1996'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Recent Developments in Indian Politics',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_nf_support', 'm_rao_1991', 'm_uf_pms', 'm_sawhney', 'm_communalism', 'm_after1992', 'm_consensus', 'm_2024', 'ar_democracy', 'ar_consensus'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_outside_two', 's_mandal_two', { attempt: 1, keys: ['s_shahbano', 's_lessons'] }, 's3_decline', { attempt: 1, keys: ['s3_ayodhya_steps', 's3_consensus'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_coalition_era', { attempt: 1, keys: ['l_communalism', 'l_coal_single'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_letter1990', 'sb_peace'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-political-science-ch15 only (context of the 1990s and the coalition era; Mandal and the OBCs; communalism, secularism and Ayodhya; new consensus and recent elections)',
    originality: 'every source, mock parliament, town and speaker is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    data: `computed by the build: majority mark ${MAJORITY} of ${LS_SEATS}; mock alliance ${MOCK.lead} + ${MOCK.allies.join(' + ')} = ${MOCK_TOTAL} (short ${MOCK_SHORT} alone, ${MOCK_SPARE} spare); reservation ${RES.OBC} + ${RES.SC} + ${RES.ST} = ${RES_TOTAL}; BJP seats as commonly reported ${BJP[2014]}/${BJP[2019]}/${BJP[2024]}, 2024 short by ${SHORT_2024}`,
    facts: 'governments 1989–2024 with their leaders; Rajiv Gandhi assassinated May 1991; 1991 reforms; April 1999 confidence vote; Mandal 1978/1980/1990, Indra Sawhney 1992; BSP 1984; Shah Bano 1985 and the 1986 law; locks opened 1986; rath yatra 1990; demolition 6 December 1992; Godhra and Gujarat 2002; Supreme Court verdict November 2019; Lok Sabha results 2014, 2019, 2024',
    neutrality: 'facts stated without evaluation; no question asks students to judge a current party, government or leader; debates presented with balanced arguments; nothing after 2024',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
