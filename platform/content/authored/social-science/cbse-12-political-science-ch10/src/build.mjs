// Build CBSE 12 Political Science ch10 Politics of Planned Development. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch10/src/build.mjs
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch10', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- imagined data (computed, asserted)
// Wheat yield in two imagined districts, quintals per hectare.
const YIELD = { irrigated: { name: 'Haripur (irrigated)', y1965: 12, y1975: 30 }, dry: { name: 'Dhoolgarh (dry)', y1965: 10, y1975: 12 } };
const pctRise = (a, b) => Math.round(((b - a) / a) * 100);
const RISE_IRR = pctRise(YIELD.irrigated.y1965, YIELD.irrigated.y1975);
const RISE_DRY = pctRise(YIELD.dry.y1965, YIELD.dry.y1975);
assert.equal(RISE_IRR, 150);
assert.equal(RISE_DRY, 20);
const GAP_1965 = YIELD.irrigated.y1965 - YIELD.dry.y1965;
const GAP_1975 = YIELD.irrigated.y1975 - YIELD.dry.y1975;
assert.equal(GAP_1965, 2);
assert.equal(GAP_1975, 18);

// ---------------------------------------------------------------- SVG figures
const vSpectrum = (() => {
  const s = new Svg(660, 200);
  s.line(130, 100, 530, 100, { sw: 3, color: 'muted' });
  s.dot(130, 100, 7);
  s.dot(530, 100, 7);
  s.dot(330, 100, 9, 'accent');
  s.text(130, 70, 'Liberal-capitalist', { bold: true });
  s.text(130, 132, 'Market and private firms', { size: 13 });
  s.text(130, 152, 'e.g. USA, Western Europe', { size: 12, muted: true });
  s.text(530, 70, 'Socialist', { bold: true });
  s.text(530, 132, 'State ownership and plans', { size: 13 });
  s.text(530, 152, 'e.g. the USSR', { size: 12, muted: true });
  s.text(330, 70, 'India: mixed economy', { bold: true, color: 'accent' });
  s.text(330, 132, 'Public and private sectors', { size: 13 });
  s.text(330, 152, 'with state planning', { size: 13 });
  s.text(330, 186, 'India chose a path between the two models.', { size: 12, muted: true });
  return s.visual('Diagram of a line between two models of development: liberal-capitalist at the left (market and private firms, such as the USA and Western Europe) and socialist at the right (state ownership and plans, such as the USSR); India\'s mixed economy sits in the middle with public and private sectors and state planning', 'Two models and the Indian middle path');
})();

const EVENTS = [
  [1944, 'Bombay Plan', 'up'],
  [1950, 'Planning Commission', 'down'],
  [1951, 'First Plan', 'up'],
  [1956, 'Second Plan', 'down'],
  [1966, 'Annual plans to 1969', 'up'],
  [1970, 'Operation Flood', 'down'],
  [1991, 'Economic reforms', 'up'],
  [2015, 'NITI Aayog', 'down'],
];
const vTimeline = (() => {
  const s = new Svg(700, 230);
  const X = (y) => 50 + ((y - 1940) / (2020 - 1940)) * 600;
  s.arrow(30, 115, 680, 115, { sw: 1.8 });
  for (const [yr, label, pos] of EVENTS) {
    const x = X(yr);
    const up = pos === 'up';
    const lift = yr === 1951 ? 40 : yr === 1956 ? 40 : 0;
    s.dot(x, 115, 5, 'accent');
    s.line(x, up ? 110 : 120, x, up ? 78 - lift : 152 + lift, { sw: 1.2, color: 'muted' });
    s.text(x, up ? 64 - lift : 166 + lift, String(yr), { size: 12, bold: true });
    s.text(x, up ? 48 - lift : 182 + lift, label, { size: 12 });
  }
  return s.visual('Timeline from 1940 to 2020: Bombay Plan 1944, Planning Commission 1950, First Plan 1951, Second Plan 1956, annual plans from 1966 to 1969, Operation Flood 1970, economic reforms 1991, and NITI Aayog 2015', 'Planning in India: key dates');
})();

const vYield = (() => {
  const s = new Svg(560, 290);
  const c = s.chart({ x0: 0, x1: 4, y0: 0, y1: 35, left: 70, top: 30, width: 420, height: 200, yLabel: 'Quintals per hectare' });
  const bars = [
    [0.6, YIELD.irrigated.y1965, 'muted'],
    [1.2, YIELD.irrigated.y1975, 'accent'],
    [2.6, YIELD.dry.y1965, 'muted'],
    [3.2, YIELD.dry.y1975, 'accent'],
  ];
  for (const [x, v, col] of bars) {
    s.rect(c.X(x) - 22, c.Y(v), 44, c.Y(0) - c.Y(v), { fill: col, stroke: false, rx: 2 });
    c.label([x, v], String(v), { dy: -10, size: 12 });
  }
  for (const y of [10, 20, 30]) c.yTick(y, String(y));
  s.text(c.X(0.9), c.Y(0) + 18, 'Haripur (irrigated)', { size: 12 });
  s.text(c.X(2.9), c.Y(0) + 18, 'Dhoolgarh (dry)', { size: 12 });
  s.rect(400, 8, 14, 14, { fill: 'muted', stroke: false, rx: 2 });
  s.text(420, 15, '1965', { size: 12, anchor: 'start' });
  s.rect(470, 8, 14, 14, { fill: 'accent', stroke: false, rx: 2 });
  s.text(490, 15, '1975', { size: 12, anchor: 'start' });
  return s.visual(`Bar chart of imagined wheat yields: Haripur, an irrigated district, rises from ${YIELD.irrigated.y1965} to ${YIELD.irrigated.y1975} quintals per hectare between 1965 and 1975; Dhoolgarh, a dry district, rises only from ${YIELD.dry.y1965} to ${YIELD.dry.y1975}`, 'Imagined districts: the gap between them widens.');
})();

// ---------------------------------------------------------------- other visuals
const vRoute1 = flow('LR', ['Development as politics', 'Two models', 'Consensus and the Bombay Plan', 'Planning Commission', 'First and Second Plans', 'The great debates'], 'Route map of Part 1: development as politics, two models, consensus and the Bombay Plan, the Planning Commission, the First and Second Plans, and the great debates', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Foundations built', 'Land reform', 'Food crisis', 'Green Revolution', 'Operation Flood', 'Displacement', 'NITI Aayog'], 'Route map of Part 2: foundations built, land reform, food crisis, Green Revolution, Operation Flood, displacement and NITI Aayog', 'Part 2 at a glance');
const vWhoGains = table(
  ['Imagined project', 'Who may gain', 'Who may bear the cost'],
  [
    ['A steel plant on forest land', 'Job-seekers, industry, the national economy', 'Forest dwellers who lose land and livelihood'],
    ['A large dam', 'Farmers on the plains, towns that get power', 'Villages that are submerged upstream'],
    ['A mine near a river', 'Mining firms, the state treasury', 'Fishers and farmers downstream'],
  ],
  'Table of three imagined projects showing gainers and losers: a steel plant helps job-seekers but costs forest dwellers their land; a dam helps plains farmers and towns but submerges upstream villages; a mine helps firms and the treasury but harms fishers and farmers downstream',
  'Every project raises the question: development for whom?',
);
const vModels = table(
  ['', 'Liberal-capitalist', 'Socialist'],
  [
    ['Who owns production?', 'Mostly private firms', 'Mostly the state'],
    ['How are decisions made?', 'Through the market', 'Through central plans'],
    ['Main promise', 'Growth and individual freedom', 'Equality and security'],
    ['Example at the time', 'USA, Western Europe', 'USSR'],
  ],
  'Comparison table: under the liberal-capitalist model private firms own production and the market decides, promising growth and freedom, as in the USA and Western Europe; under the socialist model the state owns production and plans, promising equality, as in the USSR',
);
const vConsensus = flow('LR', ['Poverty and low output at independence', 'Agreement: the state must plan and invest', 'Even industrialists agreed (Bombay Plan, 1944)', 'Disputes: which sector first, how big a public sector'], 'Flow: poverty at independence led to broad agreement that the state must plan and invest; even industrialists agreed in the Bombay Plan of 1944; the disputes were about which sector came first and how large the public sector should be', 'Consensus on planning, disagreement on details');
const vPC = table(
  ['Feature', 'Planning Commission'],
  [
    ['Set up', 'March 1950'],
    ['How', 'By a resolution of the Government of India'],
    ['Status', 'Advisory; not constitutional, not statutory'],
    ['Chairperson', 'The Prime Minister'],
    ['Main task', 'Draw up Five Year Plans and guide public investment'],
  ],
  'Table of facts about the Planning Commission: set up in March 1950 by a resolution of the Government of India; advisory, neither constitutional nor statutory; chaired by the Prime Minister; it drew up Five Year Plans and guided public investment',
);
const vPlan1 = table(
  ['First Five Year Plan (from 1951)', ''],
  [
    ['Main focus', 'Agriculture: irrigation, dams, land reform'],
    ['Why', 'Food shortages and the disruption of Partition'],
    ['Thinker linked', 'K. N. Raj, who urged a steady, cautious pace'],
    ['Idea', 'Raise savings and output first, then expand'],
  ],
  'Table of the First Five Year Plan from 1951: focus on agriculture, irrigation, dams and land reform because of food shortages and Partition; linked to K. N. Raj who urged a cautious pace',
);
const vPlan2 = table(
  ['Second Five Year Plan (from 1956)', ''],
  [
    ['Main focus', 'Heavy industry: steel, machines, power'],
    ['Thinker linked', 'P. C. Mahalanobis'],
    ['Tools', 'Public investment; high tariffs on imports to protect Indian industry'],
    ['Effect', 'Public sector grew; private industry grew behind protection'],
  ],
  'Table of the Second Five Year Plan from 1956: focus on heavy industry under P. C. Mahalanobis, using public investment and protective tariffs; both public and private industry grew',
);
const vDebateEx = table(
  ['Argument heard in an imagined 1957 debate', 'Side of the debate'],
  [
    ['"Farmers still wait for wells while steel gets the money."', 'Agriculture first'],
    ['"Without steel we cannot make pumps, rails or tractors."', 'Industry first'],
    ['"Basic industry needs capital no private firm can raise."', 'For the public sector'],
    ['"Licences and controls slow down enterprise."', 'For more room for the private sector'],
  ],
  'Worked example table sorting four imagined arguments: farmers waiting for wells supports agriculture first; needing steel for pumps supports industry first; capital needs support the public sector; complaints about licences support more room for the private sector',
  'Imagined speakers, written by SOYL for practice.',
);
const vAgriInd = table(
  ['Agriculture first', 'Industry first'],
  [
    ['Most Indians lived on farms', 'Industry was needed to end poverty in the long run'],
    ['The Second Plan was said to neglect villages', 'Farming itself needs pumps, fertiliser and power'],
    ['Land reform and rural credit were weak', 'Agriculture still got substantial public funds'],
  ],
  'Two-column table of the agriculture versus industry debate: one side stressed that most Indians lived on farms and that villages were neglected; the other said industry was needed to end poverty and to supply pumps, fertiliser and power to farms',
);
const vPubPvt = table(
  ['Public sector: arguments for', 'Public sector: concerns'],
  [
    ['Huge, slow-return investment in steel and power', 'Many units became inefficient'],
    ['Balanced growth across regions', 'Licences and controls held back private initiative'],
    ['Control of key sectors in national interest', 'Losses had to be met from public money'],
  ],
  'Table of arguments for a large public sector (huge investment, regional balance, control of key sectors) and concerns (inefficiency, licences holding back private initiative, losses met from public money)',
);
const vVoices = table(
  ['Voice', 'Main idea'],
  [
    ['J. C. Kumarappa', 'Gandhian plan: village industries, self-reliance, simple living'],
    ['Chaudhary Charan Singh', 'Agriculture and villages should come first'],
    ['Industrialists (Bombay Plan)', 'State-led investment in industry, with a private sector'],
    ['P. C. Mahalanobis', 'Rapid growth of heavy and basic industry'],
  ],
  'Table of voices in the planning debate: J. C. Kumarappa for a Gandhian village plan; Chaudhary Charan Singh for agriculture first; industrialists of the Bombay Plan for state-led investment with a private sector; P. C. Mahalanobis for heavy industry',
);
const vFiveMark = flow('TB', ['Point 1: the two models', 'Point 2: consensus on planning', 'Point 3: disputes on priorities and ownership', 'Point 4: features of the mixed economy', 'Point 5: why it suited a democracy'], 'Flow of a five-point answer plan: the two models, the consensus on planning, the disputes, the features of the mixed economy and why it suited a democracy', 'One idea per point; bold the key term');
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Development', 'A political choice with winners and losers'],
    ['Models', 'Liberal-capitalist, socialist; India chose a mix'],
    ['Bombay Plan', '1944, by industrialists'],
    ['Planning Commission', 'March 1950, resolution, Prime Minister chairs'],
    ['Plans', 'First (1951): agriculture. Second (1956): heavy industry'],
  ],
  'Summary table of Part 1: development is a political choice; two models and India\'s mix; the Bombay Plan of 1944; the Planning Commission of 1950; the First Plan on agriculture and the Second on heavy industry',
);
const vTips1 = table(
  ['Common slip', 'Correct version'],
  [
    ['The Planning Commission was in the Constitution', 'It was set up by a government resolution'],
    ['The First Plan stressed heavy industry', 'That was the Second Plan'],
    ['India copied the Soviet model', 'India chose a mixed economy'],
  ],
  'Table of common slips: the Planning Commission was set up by resolution, not by the Constitution; heavy industry was the Second Plan\'s focus; India chose a mixed economy, not a copy of the Soviet model',
);

const vFoundations = table(
  ['Area', 'What planning built or changed'],
  [
    ['Irrigation and power', 'Large multipurpose dams and canals'],
    ['Industry', 'Public-sector steel plants, such as Bhilai (with Soviet help)'],
    ['Institutions', 'Research, technical and training institutions'],
    ['Private sector', 'Grew in a protected home market'],
  ],
  'Table of foundations built by planning: dams and canals, public-sector steel plants such as Bhilai built with Soviet help, research and training institutions, and a private sector that grew in a protected market',
);
const vLand = table(
  ['Land reform measure', 'Outcome'],
  [
    ['Abolition of zamindari', 'Largely achieved; intermediaries removed'],
    ['Consolidation of holdings', 'Achieved in some states'],
    ['Ceilings on land holdings', 'Weak: evaded by powerful landowners'],
    ['Rights for tenants', 'Uneven across states'],
  ],
  'Table of land reform outcomes: zamindari abolition largely achieved; consolidation in some states; land ceilings weak because powerful landowners evaded them; tenant rights uneven',
);
const vFoodCrisis = flow('LR', ['Droughts in the mid-1960s', 'Food shortages and grain imports', 'Pressure to raise output fast', 'New agricultural strategy'], 'Flow: droughts in the mid-1960s caused food shortages and dependence on imported grain, creating pressure to raise output quickly and leading to a new agricultural strategy', 'Why the Green Revolution came');
const vGR = flow('LR', ['High-yielding seeds', 'Fertiliser and pesticides', 'Assured irrigation', 'Support prices and subsidies', 'Higher grain output'], 'Flow of the Green Revolution package: high-yielding seeds, fertiliser and pesticides, assured irrigation and support prices with subsidies leading to higher grain output', 'The Green Revolution package');
const vGRPolitics = table(
  ['Effect', 'Political meaning'],
  [
    ['Rich and middle farmers prospered', 'They became an organised pressure group in politics'],
    ['Irrigated regions moved ahead', 'Regional inequality widened'],
    ['Poor peasants gained little', 'Unrest and protest in some areas'],
    ['Food self-sufficiency', 'Less dependence on food aid from abroad'],
  ],
  'Table of political effects of the Green Revolution: prosperous farmers became an organised pressure group; regional inequality widened; poor peasants gained little, leading to unrest in places; food self-sufficiency reduced dependence on foreign aid',
);
const vYieldTable = table(
  ['Imagined district', 'Yield 1965', 'Yield 1975', 'Rise'],
  [
    [YIELD.irrigated.name, String(YIELD.irrigated.y1965), String(YIELD.irrigated.y1975), `${RISE_IRR} per cent`],
    [YIELD.dry.name, String(YIELD.dry.y1965), String(YIELD.dry.y1975), `${RISE_DRY} per cent`],
    ['Gap between them', String(GAP_1965), String(GAP_1975), 'Gap widens'],
  ],
  `Worked example table of imagined wheat yields in quintals per hectare: Haripur rises from ${YIELD.irrigated.y1965} to ${YIELD.irrigated.y1975}, a rise of ${RISE_IRR} per cent; Dhoolgarh rises from ${YIELD.dry.y1965} to ${YIELD.dry.y1975}, a rise of ${RISE_DRY} per cent; the gap grows from ${GAP_1965} to ${GAP_1975}`,
  'Imagined figures, computed in the build.',
);
const vDairy = flow('LR', ['Village milk society (members pour milk)', 'District union (processing plant)', 'State federation and city markets', 'Payment returns to members'], 'Flow of the cooperative dairy model: village milk societies collect milk, the district union processes it, the state federation markets it in cities, and payment returns to the member producers', 'The Anand pattern spread by Operation Flood');
const vDisplace = table(
  ['Question raised by movements', 'Why it matters'],
  [
    ['Were affected people consulted?', 'Decisions affect their homes and livelihoods'],
    ['Is there land for land, not only cash?', 'Cash cannot replace a forest or a farm'],
    ['Who shares the benefits?', 'Gains often go elsewhere'],
  ],
  'Table of questions raised about displacement: whether affected people were consulted, whether land is given for land and not only cash, and who shares the benefits of a project',
);
const vPCvsNITI = table(
  ['', 'Planning Commission', 'NITI Aayog'],
  [
    ['Years', '1950 to 2014', 'From 1 January 2015'],
    ['Created by', 'Government resolution', 'Government resolution'],
    ['Chairperson', 'Prime Minister', 'Prime Minister'],
    ['Main work', 'Five Year Plans; plan funds', 'Policy advice; think tank'],
    ['States', 'Mainly through plan talks', 'Governing Council of chief ministers'],
  ],
  'Comparison table: the Planning Commission (1950 to 2014) and NITI Aayog (from 1 January 2015) were both created by government resolution and chaired by the Prime Minister; the Commission drew up plans and dealt with plan funds, while NITI Aayog is a think tank giving advice, with a Governing Council of chief ministers',
);
const vNITIflow = flow('TB', ['Prime Minister (chairperson)', 'Governing Council: chief ministers and union territory heads', 'Expert members and staff', 'Policy advice, ideas and rankings for Union and states'], 'Flow of NITI Aayog\'s structure: the Prime Minister as chairperson, a Governing Council of chief ministers and union territory heads, expert members and staff, producing policy advice and rankings for the Union and states', 'How NITI Aayog is organised');
const vCompareEx = table(
  ['Step', 'What to write'],
  [
    ['1. Basis', 'Name the basis of each point: role, funds, states'],
    ['2. Pair', 'Write the Commission and NITI Aayog side by side'],
    ['3. Facts', 'Give dates: 1950 and 1 January 2015'],
    ['4. Judge', 'End with one balanced line if asked to evaluate'],
  ],
  'Worked example table for a comparison answer: name the basis of each point, pair the two bodies side by side, give the dates 1950 and 1 January 2015, and end with a balanced line if asked to evaluate',
);
const vSummary2 = table(
  ['Outcome', 'Remember'],
  [
    ['Foundations', 'Dams, steel plants, institutions'],
    ['Land reform', 'Zamindari gone; ceilings weak'],
    ['Green Revolution', 'More grain; wider gaps; farmers organised'],
    ['Operation Flood', '1970; cooperatives; Verghese Kurien'],
    ['NITI Aayog', '1 January 2015; think tank; cooperative federalism'],
  ],
  'Summary table of Part 2: foundations of dams and steel plants; zamindari abolished but ceilings weak; Green Revolution raised grain output, widened gaps and organised farmers; Operation Flood from 1970 with cooperatives; NITI Aayog from 1 January 2015 as a think tank for cooperative federalism',
);
const vTips2 = table(
  ['Common slip', 'Correct version'],
  [
    ['The Green Revolution helped everyone equally', 'Gains went mainly to irrigated regions and richer farmers'],
    ['NITI Aayog makes Five Year Plans', 'It is a think tank giving advice'],
    ['Operation Flood was about floods', 'It was about milk cooperatives'],
  ],
  'Table of common slips: the Green Revolution did not help everyone equally; NITI Aayog does not make Five Year Plans; Operation Flood was about milk cooperatives, not floods',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Politics of Planned Development — Part 1: Models, Plans and Debates',
  goals: [
    'Explain why development is a political question',
    'Compare the liberal-capitalist and socialist models and explain India\'s mixed economy',
    'Describe the Bombay Plan, the Planning Commission and the first two Five Year Plans',
    'Analyse the debates on agriculture versus industry and public versus private sector',
  ],
  slides: [
    sl('title', 'Politics of Planned Development', {
      b: 'Part 1 — **models** of development, the **Planning Commission**, the first **Five Year Plans** and the great **debates**.',
      v: vRoute1,
      n: 'When India became independent, it was one of the poorest countries in the world. Everyone wanted development, but what kind, and for whom? Should the country build steel mills or village wells first? Should the state run factories or leave them to business? In this part we see how India answered these questions, and why the answers were argued over in politics and not settled by experts alone.',
    }),
    sl('concept', 'Development is a political question', {
      b: 'Every project has **gainers** and **losers**, so choices about development are argued over in public life.',
      v: vWhoGains,
      n: 'Look at these imagined projects. A steel plant brings jobs, but forest dwellers may lose their land. A dam irrigates the plains, but upstream villages go under water. So development is never just a technical plan. It decides who gains and who pays. That is why parties, movements and citizens debate it, and why it belongs in a political science course.',
    }),
    sl('two-column', 'Two models before India', {
      b: 'At independence, two broad models were on offer.',
      cols: [
        '**Liberal-capitalist**\n\n- Private firms and the market\n- Western Europe and the USA',
        '**Socialist**\n\n- State ownership and central plans\n- The Soviet Union',
      ],
      v: vModels,
      n: 'Two models were visible to the new nation. In the liberal-capitalist model of Western Europe and the United States, private firms produce goods and the market guides decisions. In the socialist model of the Soviet Union, the state owns most production and plans it centrally. Each promised something different, growth and freedom on one side, equality and security on the other.',
    }),
    sl('check', 'Quick check: what did everyone agree on?', {
      b: 'Around independence, leaders of different views agreed on one point. Which?',
      chk: 'm_consensus',
      n: 'Think about the role of the government. Did people want to leave development entirely to private business?',
    }),
    sl('diagram', 'India\'s middle path', {
      b: 'India chose a **mixed economy**: public and private sectors, with state planning.',
      v: vSpectrum,
      n: 'India did not copy either model. It chose a mixed economy. The state would run key sectors such as steel, power and railways, and plan public investment. At the same time, private property and private firms would continue in farming, trade and most industries. Leaders felt this fitted a democracy that wanted both growth and social justice.',
    }),
    sl('concept', 'A consensus on planning', {
      b: 'There was wide agreement that the **state must plan and invest**; even industrialists said so in the **Bombay Plan (1944)**.',
      v: vConsensus,
      n: 'Here is a surprising fact. Planning was not only a socialist idea in India. In 1944 a group of leading industrialists drew up the Bombay Plan, which asked the state to invest heavily in industry. So there was a broad consensus that the government must lead development. The arguments that followed were about details: which sector should come first, and how big the public sector should be.',
    }),
    sl('concept', 'The Planning Commission', {
      b: 'Set up in **March 1950** by a **government resolution**; chaired by the **Prime Minister**.',
      v: vPC,
      n: 'In March 1950 the Government of India created the Planning Commission by a simple resolution. It was not mentioned in the Constitution and no separate law created it, so it was an advisory body. But because the Prime Minister was its chairperson, its advice carried great weight. Its main job was to prepare Five Year Plans and guide how public money was invested.',
    }),
    sl('check', 'Quick check: true or false?', {
      b: 'The Planning Commission was set up by an Act of Parliament. True or false?',
      chk: 'tf_pc_statute',
      n: 'Recall how the Commission was created in 1950. Was it a law, an article of the Constitution, or something simpler?',
    }),
    sl('diagram', 'Planning in India: a timeline', {
      v: vTimeline,
      n: 'Here is the whole story on one line. The Bombay Plan came in 1944. The Planning Commission followed in 1950, and the First Plan in 1951. The Second Plan began in 1956. After droughts and strain, there were annual plans from 1966 to 1969. Operation Flood began in 1970. Economic reforms came in 1991, and in 2015 NITI Aayog replaced the Planning Commission.',
    }),
    sl('concept', 'The First Five Year Plan', {
      b: 'From **1951**, with **agriculture** at the centre.',
      v: vPlan1,
      n: 'The First Plan began in 1951. After Partition and food shortages, it put agriculture first: irrigation, dams and land reform. The young economist K. N. Raj argued that a poor country should move steadily rather than rush, building savings and capacity before attempting very fast growth. The First Plan aimed to lift farm output and incomes as a base for later progress.',
    }),
    sl('concept', 'The Second Five Year Plan', {
      b: 'From **1956**, with **heavy industry** at the centre.',
      v: vPlan2,
      n: 'The Second Plan, from 1956, changed the emphasis. Shaped by the statistician P. C. Mahalanobis, it aimed at rapid growth of heavy industry such as steel, machines and power. The state invested directly, and high duties on imports protected Indian industry from foreign competition. Both public enterprises and private firms grew in this protected home market.',
    }),
    sl('check', 'Quick check: the First Plan', {
      b: 'What was the main emphasis of the First Five Year Plan?',
      chk: 'm_first_plan',
      n: 'Remember the situation right after Partition. What did the country most urgently need more of?',
    }),
    sl('example', 'Worked example 1: sort the arguments', {
      b: 'Four imagined speakers at a 1957 debate. Which side is each on?',
      bl: [
        'Step 1 — Find the **key word**: wells, steel, capital, licences.',
        'Step 2 — Ask which **debate** it belongs to: sector priority or ownership.',
        'Step 3 — Name the **side** and give a one-line reason.',
      ],
      v: vDebateEx,
      n: 'Let us practise sorting arguments, a skill that source questions test. The first speaker complains that farmers wait for wells while steel gets money, so he stands for agriculture first. The second says steel is needed for pumps and rails, so she is for industry first. The third and fourth are arguing about ownership: one supports the public sector, the other wants more room for private firms.',
    }),
    sl('two-column', 'Debate 1: agriculture or industry?', {
      cols: [
        '**Agriculture first**\n\n- Most people lived on farms\n- Villages felt neglected',
        '**Industry first**\n\n- Industry ends poverty in the long run\n- Farms need industrial inputs',
      ],
      v: vAgriInd,
      n: 'The first great debate was about priority. Critics said the Second Plan neglected the countryside, where most Indians lived, and that land reform and rural credit were weak. Defenders replied that without industry poverty could never be removed, that farming itself needed pumps, fertiliser and power, and that agriculture still received large public funds. Both sides had a point.',
    }),
    sl('concept', 'Debate 2: public or private sector?', {
      b: 'How large should the **public sector** be?',
      v: vPubPvt,
      n: 'The second debate was about ownership. Supporters of a large public sector said steel and power needed huge investment with slow returns, which private firms of the time could not provide, and that the state could spread industry to backward regions. Critics replied that many public units became inefficient, and that licences and controls slowed down private enterprise. This debate returned strongly in later decades.',
    }),
    sl('concept', 'Other voices in the debate', {
      b: 'Not everyone agreed with the industry-first path.',
      v: vVoices,
      n: 'Several thinkers offered alternatives. J. C. Kumarappa developed a Gandhian programme built on village industries and self-reliance. Chaudhary Charan Singh, a leader of peasant politics, argued that agriculture and villages should come first. Industrialists in the Bombay Plan wanted state investment alongside a private sector. And P. C. Mahalanobis made the case for rapid heavy industry. Knowing who said what helps in source questions.',
    }),
    sl('check', 'Quick check: match the people', {
      b: 'Match each person with the idea they are linked with.',
      chk: 'mt_people',
      n: 'Think of four names: a statistician, a cautious economist, a Gandhian thinker, and the leader of the dairy cooperatives.',
    }),
    sl('example', 'Worked example 2: a five-mark answer', {
      b: 'Question: *Why did India choose a mixed economy?* Plan five points before writing.',
      bl: [
        'Give **one idea per point**, about 20 words each.',
        'Use **key terms** in bold: mixed economy, public sector, planning.',
        'Finish with **why** the choice suited India.',
      ],
      v: vFiveMark,
      n: 'Here is how to plan a five-mark answer. Point one: describe the two models. Point two: the consensus that the state must plan. Point three: the disputes over priorities and ownership. Point four: the features of the mixed economy. Point five: why it suited a democracy that wanted growth with justice. Five clear points, one idea each, and key terms in bold.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Development is political because it creates winners and losers. India chose a mixed economy between the capitalist and socialist models. There was a broad consensus on planning, shown even by the Bombay Plan of 1944. The Planning Commission was set up in 1950. The First Plan stressed agriculture and the Second stressed heavy industry, which sparked lasting debates.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Planning Commission: **1950**, set up by **resolution**, chaired by the **Prime Minister**.',
        'First Plan **agriculture**; Second Plan **heavy industry** (Mahalanobis).',
        'For "debate" questions, give **both sides** and a balanced line.',
        'Source questions: **quote** the line, **name** the idea, **explain** it.',
      ],
      v: vTips1,
      n: 'A few exam tips. Keep the facts about the Planning Commission exact: 1950, a resolution, the Prime Minister as chair. Do not mix up the First and Second Plans. When a question asks about a debate, present both sides and end with a balanced judgement. In source questions, quote the line, name the idea and explain it in a sentence.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Politics of Planned Development — Part 2: Outcomes and NITI Aayog',
  goals: [
    'Assess the outcomes of planning: foundations, land reform and their limits',
    'Explain the Green Revolution and its political consequences',
    'Explain Operation Flood and the cooperative model',
    'Compare the Planning Commission and NITI Aayog',
  ],
  slides: [
    sl('title', 'Outcomes of planning and NITI Aayog', {
      b: 'Part 2 — what planning **achieved**, where it **fell short**, and what **replaced** the Planning Commission.',
      v: vRoute2,
      n: 'In this part we judge the results. What did decades of planning build, and where did it fall short? We look at land reform, the food crisis of the 1960s, the Green Revolution and how it changed rural politics, the dairy cooperatives of Operation Flood, protests over displacement, and finally NITI Aayog, which replaced the Planning Commission in 2015.',
    }),
    sl('concept', 'Foundations for the future', {
      b: 'Planning built the **base** on which later growth stood.',
      v: vFoundations,
      n: 'The early plans built large dams and canals, steel plants in the public sector, such as Bhilai built with Soviet help, and many research and training institutions. The private sector also grew in a protected home market. Many historians see these as foundations for later growth, even though poverty remained widespread for a long time.',
    }),
    sl('concept', 'Land reform: mixed results', {
      b: '**Zamindari** went, but **ceilings** and **tenant** protection were weak.',
      v: vLand,
      n: 'Land reform had mixed results. The abolition of zamindari largely succeeded, removing intermediaries between the state and the cultivators. Consolidation of scattered plots worked in some states. But ceilings on land and protection for tenants were weak, because landowners were powerful in local and state politics and found ways around the laws. So few landless families actually received land.',
    }),
    sl('concept', 'The food crisis of the 1960s', {
      b: 'Droughts and **food shortages** forced a change in strategy.',
      v: vFoodCrisis,
      n: 'In the mid-1960s, failed monsoons led to serious food shortages, and India had to import grain. This dependence was worrying for a proud new nation. Planning was even paused for annual plans between 1966 and 1969. The crisis convinced the government that farm output had to rise quickly, and it adopted a new strategy for agriculture.',
    }),
    sl('diagram', 'The Green Revolution', {
      b: 'A package of **seeds, inputs, water and prices**.',
      v: vGR,
      n: 'The new strategy, later called the Green Revolution, gave farmers high-yielding seeds along with fertiliser, pesticides and assured irrigation, backed by subsidies and support prices. It was introduced first in areas that already had water. Wheat, and later rice, output rose sharply, and India became much more self-sufficient in food grains.',
    }),
    sl('check', 'Quick check: the package', {
      b: 'What was the Green Revolution mainly based on?',
      chk: 'm_gr_inputs',
      n: 'Recall the four parts of the package shown on the previous slide.',
    }),
    sl('diagram', 'Gains were uneven', {
      b: 'Irrigated districts raced ahead; dry districts lagged.',
      v: vYield,
      n: 'This imagined chart shows why the Green Revolution was uneven. An irrigated district more than doubles its yield in ten years, while a dry district barely moves. Real patterns were similar: Punjab, Haryana and western Uttar Pradesh gained most. Within villages, farmers who could afford seeds, fertiliser and wells gained more than small farmers.',
    }),
    sl('concept', 'Political effects of the Green Revolution', {
      b: 'New prosperity created **new political forces**.',
      v: vGRPolitics,
      n: 'The Green Revolution changed rural politics. Prosperous middle and rich farmers became an organised force, pressing for support prices and cheap inputs, and parties had to court them. Regional inequality widened. In some areas poor peasants who gained little turned to protest. And food self-sufficiency reduced dependence on foreign aid, which mattered for national pride and policy.',
    }),
    sl('example', 'Worked example 1: read the data', {
      b: 'Use the imagined yields to show how the Green Revolution widened gaps.',
      bl: [
        `Step 1 — Rise in Haripur: from ${YIELD.irrigated.y1965} to ${YIELD.irrigated.y1975} is a rise of **${RISE_IRR} per cent**.`,
        `Step 2 — Rise in Dhoolgarh: from ${YIELD.dry.y1965} to ${YIELD.dry.y1975} is only **${RISE_DRY} per cent**.`,
        `Step 3 — The gap grows from **${GAP_1965}** to **${GAP_1975}** quintals per hectare.`,
        'Step 4 — Link it to **irrigation**, then to **politics**.',
      ],
      v: vYieldTable,
      n: 'Let us read the data. Haripur rose from twelve to thirty quintals, a rise of one hundred and fifty per cent. Dhoolgarh rose from ten to twelve, only twenty per cent. So the gap between them grew from two to eighteen quintals. The reason is irrigation. In an exam, connect such numbers to the political point: unequal gains created new interests and new tensions.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange four rural developments in the order they began.',
      chk: 'ord_agri',
      n: 'Start with the early reform of the 1950s and end with the dairy programme of 1970.',
    }),
    sl('diagram', 'Operation Flood and the cooperative model', {
      b: 'From **1970**: village milk societies linked to city markets.',
      v: vDairy,
      n: 'Another success story came from dairying. Building on the cooperative pattern of Anand in Gujarat, associated with Verghese Kurien, Operation Flood began in 1970. Village producers, many with just one or two animals, formed milk societies. District unions processed the milk, which reached city markets. Because producers owned the system, the gains returned to them. It is often called the White Revolution.',
    }),
    sl('check', 'Quick check: Operation Flood', {
      b: 'What did Operation Flood aim to do?',
      chk: 'm_op_flood',
      n: 'Do not be misled by the name. Think about milk, villages and cities.',
    }),
    sl('concept', 'Development and displacement', {
      b: 'Big projects raised questions about **who pays** the price.',
      v: vDisplace,
      n: 'Large dams, mines and industries often displaced forest and rural communities. Over time, movements asked hard questions. Were affected people consulted? Would they get land for land, not just cash? Who would share the benefits? These debates, stated here without taking sides, show again that development is political: it involves rights, interests and choices made through democratic processes.',
    }),
    sl('concept', 'From the Planning Commission to NITI Aayog', {
      b: 'On **1 January 2015**, **NITI Aayog** replaced the Planning Commission.',
      v: vPCvsNITI,
      n: 'After economic reforms made the economy more market-led, the role of central planning was debated. On the first of January 2015 the Planning Commission was replaced by NITI Aayog, the National Institution for Transforming India. Like the old body, it was created by a government resolution and is chaired by the Prime Minister. But it works mainly as a think tank, and it does not allocate plan funds.',
    }),
    sl('diagram', 'How NITI Aayog is organised', {
      b: 'A **Governing Council** brings the Union and the states together.',
      v: vNITIflow,
      n: 'NITI Aayog has the Prime Minister as chairperson. Its Governing Council includes the chief ministers of the states and the heads of union territories, along with expert members and staff. It offers policy advice, ideas and comparisons of states. This structure is meant to promote cooperative federalism, treating states as partners. How well that works in practice is still debated.',
    }),
    sl('check', 'Quick check: the date', {
      b: 'From which date did NITI Aayog replace the Planning Commission?',
      chk: 'm_niti_year',
      n: 'It was the first day of a year in the twenty-first century.',
    }),
    sl('example', 'Worked example 2: a comparison answer', {
      b: 'Question: *Distinguish the Planning Commission from NITI Aayog.*',
      bl: [
        'Use **bases**: role, funds, place of the states.',
        'Write each point as a **pair**.',
        'Include the **dates** 1950 and 1 January 2015.',
      ],
      v: vCompareEx,
      n: 'Here is a method for comparison questions. Pick a basis for each point, such as role, funds or the place of the states. Then write each point as a pair, one line for the Planning Commission and one for NITI Aayog. Add the key dates. If the question asks you to evaluate, close with one balanced sentence rather than an opinion.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Planning built dams, steel plants and institutions. Land reform removed zamindari, but ceilings were weak. The Green Revolution raised grain output, widened regional and class gaps, and created an organised farmers\' lobby. Operation Flood spread milk cooperatives from 1970. And in 2015 NITI Aayog replaced the Planning Commission as a think tank for cooperative federalism.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Green Revolution: give **both** gains and inequalities, then the **political** effect.',
        'Operation Flood **1970**; Verghese Kurien; cooperatives.',
        'NITI Aayog **1 January 2015**; think tank; **Governing Council** of chief ministers.',
        'On displacement and reforms, stay **neutral**: present views, do not take sides.',
      ],
      v: vTips2,
      n: 'Final tips. When you write about the Green Revolution, show both the gains and the inequalities, and then the political effect. Remember Operation Flood began in 1970. Know the date and role of NITI Aayog. On contested questions such as displacement or the change of institutions, present the arguments fairly and avoid personal opinions.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Politics of Planned Development — Notes',
  sections: [
    {
      h: '1. Development as a political question; two models',
      t: 1,
      b: '**Development** means improving people\'s lives, but every project creates **gainers and losers** (jobs and output for some; loss of land, forest or livelihood for others). Choices of priority and of who bears the cost are therefore settled through **public debate and politics**.\n\n**Two models at independence:**\n- **Liberal-capitalist** (Western Europe, USA): private ownership, market decisions, promise of growth and freedom.\n- **Socialist** (USSR): state ownership, central planning, promise of equality.\n\n**India\'s choice:** a **mixed economy**, with a public sector in key industries, private property and private firms elsewhere, and **state planning** of investment.',
      terms: [
        ['Mixed economy', 'An economy in which public and private sectors work side by side, with the state planning investment.'],
        ['Liberal-capitalist model', 'Development led by private firms and markets with a limited role for the state.'],
        ['Socialist model', 'Development led by state ownership of production and central planning.'],
      ],
      v: vModels,
      vs: [vWhoGains],
    },
    {
      h: '2. Consensus on planning; the Planning Commission',
      t: 1,
      b: '**Consensus:** across views, leaders accepted that the **state must plan and invest** to overcome poverty.\n\n**Bombay Plan (1944):** a joint proposal by a group of **leading industrialists** for a planned economy with large **state investment** in industry, showing that business groups too backed planning.\n\n**Planning Commission:**\n- Set up in **March 1950** by a **resolution of the Government of India**.\n- **Advisory**: neither a constitutional nor a statutory body.\n- **Chairperson:** the **Prime Minister**.\n- Prepared **Five Year Plans** and guided public investment.\n\nA **National Development Council** of the Prime Minister, chief ministers and others was added in 1952 to involve the states.',
      terms: [
        ['Bombay Plan', 'A 1944 proposal by industrialists for a state-led planned economy with a private sector.'],
        ['Planning Commission', 'The advisory body, set up in 1950 and chaired by the Prime Minister, that prepared Five Year Plans.'],
      ],
      v: vPC,
      vs: [vConsensus],
    },
    {
      h: '3. The First and Second Plans and the great debates',
      t: 1,
      b: '**First Plan (from 1951):** focus on **agriculture**, irrigation, dams and **land reform**. Economist **K. N. Raj** urged a steady, cautious pace in the first two decades.\n\n**Second Plan (from 1956):** focus on **heavy industry** (steel, machines, power), shaped by **P. C. Mahalanobis**; public investment and **protective tariffs** on imports. Both the public and the private sector grew.\n\n**Debate 1 — agriculture versus industry:** critics (e.g. **Chaudhary Charan Singh**) said villages were neglected; defenders said industry was essential and agriculture still received funds.\n\n**Debate 2 — public versus private sector:** a large public sector was defended for basic industries and regional balance, and criticised for inefficiency and licence controls.\n\n**Alternative voices:** **J. C. Kumarappa** proposed a **Gandhian**, village-centred plan.',
      terms: [
        ['Protective tariff', 'A high duty on imports that shields domestic industry from foreign competition.'],
        ['Heavy industry', 'Basic industries such as steel, machine-building and power that supply other industries.'],
      ],
      v: vPlan2,
      vs: [vPlan1, vAgriInd, vVoices],
    },
    {
      h: '4. Outcomes: foundations and land reform',
      t: 2,
      b: '**Foundations:** multipurpose **dams and canals**, public-sector **steel plants** (e.g. **Bhilai**, built with Soviet collaboration), and research and training **institutions**. The private sector expanded behind protection.\n\n**Land reform:**\n- **Abolition of zamindari** — largely achieved.\n- **Consolidation** of holdings — in some states.\n- **Land ceilings** — weak; evaded by landowners with political influence.\n- **Tenancy** reforms — uneven.\n\n**Food crisis:** droughts in the **mid-1960s** caused shortages and grain imports; three **annual plans (1966–69)** replaced a Five Year Plan for a time (the "plan holiday").',
      terms: [
        ['Zamindari abolition', 'Removal of intermediaries who collected rent between the state and cultivators.'],
        ['Land ceiling', 'A legal maximum on the land one family may own; surplus land is to be redistributed.'],
      ],
      v: vLand,
      vs: [vFoundations, vFoodCrisis],
    },
    {
      h: '5. The Green Revolution and Operation Flood',
      t: 2,
      b: '**Green Revolution (from the late 1960s):** high-yielding seeds + fertiliser and pesticides + assured irrigation + support prices and subsidies; first in irrigated areas.\n\n**Results:** grain output rose and India became largely **self-sufficient** in food grains. Gains were concentrated in **Punjab, Haryana and western Uttar Pradesh** and among better-off farmers, widening **regional and class inequality**.\n\n**Political effects:** **middle and rich farmers** emerged as an **organised political force**; inequality fed **unrest** in some areas.\n\n**Operation Flood (from 1970):** spread the **Anand cooperative pattern**, associated with **Verghese Kurien**, across India; village milk societies, district unions and city markets, owned by producers. It raised incomes of small and landless households and is called the **White Revolution**.',
      terms: [
        ['Green Revolution', 'The strategy of high-yielding seeds and modern inputs that raised grain output from the late 1960s.'],
        ['Operation Flood', 'The national dairy programme begun in 1970 to link village milk cooperatives with city markets.'],
      ],
      v: vYield,
      vs: [vGR, vGRPolitics, vDairy],
    },
    {
      h: '6. Displacement, and from the Planning Commission to NITI Aayog',
      t: 2,
      b: '**Displacement:** large dams, mines and industries displaced forest and rural communities; movements raised questions of **consultation, rehabilitation (land for land)** and **sharing benefits**.\n\n**NITI Aayog** (National Institution for Transforming India) replaced the Planning Commission on **1 January 2015**:\n- Created by a **government resolution**; chaired by the **Prime Minister**.\n- Works as a **policy think tank**; does **not** allocate plan funds.\n- **Governing Council** of chief ministers and union territory heads, to promote **cooperative federalism**.\n\nSupporters saw it as suited to a market-led economy and to a larger voice for states; others worried that states lost a forum for discussing funds. Its record is still debated.',
      terms: [
        ['NITI Aayog', 'The policy think tank of the Government of India that replaced the Planning Commission in 2015.'],
        ['Cooperative federalism', 'The Union and states working together as partners on shared national goals.'],
      ],
      v: vPCvsNITI,
      vs: [vNITIflow, vDisplace],
    },
  ],
  tips: '**Common mistakes**\n- Calling the Planning Commission a constitutional body: it was set up by a **resolution** in 1950.\n- Swapping the First Plan (**agriculture**) and the Second Plan (**heavy industry**).\n- Saying India copied the Soviet model: it chose a **mixed economy**.\n- Describing the Green Revolution only as a success: give the **inequalities** and the **political** effects too.\n- Thinking NITI Aayog makes Five Year Plans: it is a **think tank**.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point with an example (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); "examine" or "evaluate" questions need both sides and a conclusion.\n- Source questions (4 marks): quote, name, explain; part (c) has an internal choice.\n\n**Sources in SOYL practice** are imagined documents written for practice; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Why is development a **political** question?', 'Every project has **gainers and losers**, so priorities are settled through public debate.', 'concept', 1],
  ['Two models at independence', '**Liberal-capitalist** (West) and **socialist** (USSR).', 'concept', 1],
  ['India\'s choice of model', 'A **mixed economy**: public and private sectors with state planning.', 'definition', 1],
  ['**Bombay Plan**', '**1944**; industrialists proposed state-led planning with a private sector.', 'fact', 1],
  ['Planning Commission: when and how?', '**March 1950**, by a **resolution** of the Government of India.', 'fact', 1],
  ['Status of the Planning Commission', '**Advisory**; neither constitutional nor statutory.', 'fact', 1],
  ['Chair of the Planning Commission', 'The **Prime Minister**.', 'fact', 1],
  ['First Five Year Plan', 'From **1951**; **agriculture**, irrigation, dams, land reform.', 'fact', 1],
  ['K. N. Raj', 'Economist of the First Plan; urged a **steady, cautious pace**.', 'fact', 1],
  ['Second Five Year Plan', 'From **1956**; **heavy industry**; P. C. Mahalanobis.', 'fact', 1],
  ['How did the Second Plan protect industry?', 'High **tariffs** on imports.', 'concept', 1],
  ['J. C. Kumarappa', 'Proposed a **Gandhian**, village-centred economic plan.', 'fact', 1],
  ['Chaudhary Charan Singh\'s criticism', 'Planning favoured **urban industry** over **agriculture and villages**.', 'concept', 1],
  ['Case for a large public sector', 'Huge, slow-return investment; regional balance; key sectors.', 'concept', 1],
  ['Case against a large public sector', 'Inefficiency; licences slowed private initiative.', 'concept', 1],
  ['Bhilai steel plant', 'A public-sector plant built with **Soviet** collaboration.', 'example', 2],
  ['Outcome of land reform', 'Zamindari **abolished**; ceilings and tenancy reforms **weak**.', 'concept', 2],
  ['Why were land ceilings weak?', 'Landowners were **politically influential** and evaded the laws.', 'concept', 2],
  ['**Plan holiday**', 'Annual plans from **1966 to 1969** after droughts and strain.', 'fact', 2],
  ['Why the Green Revolution?', 'Food shortages and grain imports in the **mid-1960s**.', 'concept', 2],
  ['Green Revolution package', 'High-yielding seeds, fertiliser, pesticides, irrigation, support prices.', 'concept', 2],
  ['Where did the Green Revolution gain most?', '**Punjab, Haryana, western Uttar Pradesh** (irrigated areas).', 'fact', 2],
  ['Political effect of the Green Revolution', 'Rise of **middle and rich farmers** as an organised force.', 'concept', 2],
  ['Social effect of the Green Revolution', 'Wider **regional and class inequality**; unrest in some areas.', 'concept', 2],
  ['**Operation Flood**', 'From **1970**; milk cooperatives linked to city markets.', 'fact', 2],
  ['Verghese Kurien', 'Leader of the **cooperative dairy** movement (Anand pattern).', 'fact', 2],
  ['Questions raised about displacement', 'Consultation, land for land, sharing benefits.', 'concept', 2],
  ['**NITI Aayog**: date', 'Replaced the Planning Commission on **1 January 2015**.', 'fact', 2],
  ['NITI stands for', 'National Institution for **Transforming** India.', 'fact', 2],
  ['Role of NITI Aayog', 'Policy **think tank**; promotes **cooperative federalism**.', 'concept', 2],
  ['Planning Commission vs NITI Aayog: one difference', 'NITI Aayog does **not** allocate plan funds; it advises.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Politics of Planned Development',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_bombay_plan', 'm_gr_regions', 'm_niti_role', 'ar_resolution'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_two_models', 's_kurien', 's3_consensus_disagree'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_models_debate', 'l_gr_outcomes'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_farmer_letter'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Politics of Planned Development',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dev_cost', 'm_pc_status', 'm_second_plan', 'm_charan_singh', 'm_land_reform', 'm_food_crisis', 'm_niti_funds', 'm_displacement', 'ar_gr_regions', 'ar_niti_pc'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_pol_question', 's_first_second', { attempt: 1, keys: ['s_gr_political', 's_niti_vs_pc'] }, 's3_outcomes', { attempt: 1, keys: ['s3_public_private', 's3_niti_coop'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_dev_politics', { attempt: 1, keys: ['l_agri_industry', 'l_niti'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_district_meeting', 'sb_dam_report'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-12-political-science-ch10 only (political contestation over development and planning models; major outcomes and NITI Aayog)',
    originality: 'every source, district, speaker and scenario is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    data: `imagined yields computed in the build: Haripur ${YIELD.irrigated.y1965} to ${YIELD.irrigated.y1975} (${RISE_IRR} per cent), Dhoolgarh ${YIELD.dry.y1965} to ${YIELD.dry.y1975} (${RISE_DRY} per cent), gap ${GAP_1965} to ${GAP_1975}`,
    facts: 'Bombay Plan 1944; Planning Commission March 1950 by resolution, Prime Minister chair; National Development Council 1952 (notes only); First Plan 1951, Second Plan 1956 (Mahalanobis); annual plans 1966–69; Bhilai with Soviet collaboration; Operation Flood 1970 (Kurien, Anand pattern); NITI Aayog 1 January 2015; nothing after 2024',
    neutrality: 'planning debates, the public sector, displacement and the NITI Aayog change presented with arguments on both sides; no opinion on current politics',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
