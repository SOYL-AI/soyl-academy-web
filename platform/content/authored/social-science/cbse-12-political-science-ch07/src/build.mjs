// Build CBSE 12 Political Science ch07 Globalisation. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch07', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
const vFlows = (() => {
  const s = new Svg(660, 300);
  s.rect(240, 120, 180, 60, { color: 'accent', sw: 2.2 });
  s.text(330, 150, 'Globalisation', { bold: true, size: 16 });
  const boxes = [
    [20, 20, 'Ideas', 'Online courses, news, films'],
    [460, 20, 'Capital', 'Foreign investment, loans'],
    [20, 216, 'Commodities', 'Exported tea, phones, cars'],
    [460, 216, 'People', 'Workers, students, tourists'],
  ];
  for (const [x, y, h, sub] of boxes) {
    s.rect(x, y, 180, 64, { sw: 1.6 });
    s.text(x + 90, y + 22, h, { bold: true });
    s.text(x + 90, y + 44, sub, { size: 12 });
    const bx = x < 300 ? x + 180 : x;
    const by = y < 150 ? y + 64 : y;
    const cx = x < 300 ? 240 : 420;
    const cy = y < 150 ? 120 : 180;
    s.arrow(cx, cy, bx, by, { sw: 1.6, color: 'muted' });
  }
  s.text(330, 292, 'Flows in both directions link distant places', { size: 12, muted: true });
  return s.visual('Diagram: globalisation at the centre with four flows around it: ideas (online courses, news, films), capital (foreign investment, loans), commodities (exported tea, phones, cars) and people (workers, students, tourists)', 'Four flows of globalisation');
})();

const vState = (() => {
  const s = new Svg(660, 270);
  const cols = [
    [20, 'Can weaken the state', ['Welfare state shrinks', 'Market decides more', 'Companies press for policy changes'], 'accent'],
    [340, 'Can strengthen the state', ['Better information on citizens', 'Faster delivery of services', 'Still controls law and security'], 'blue'],
  ];
  for (const [x, h, lines, color] of cols) {
    s.rect(x, 20, 300, 170, { color, sw: 2 });
    s.text(x + 150, 46, h, { bold: true, color });
    lines.forEach((t, i) => s.text(x + 150, 86 + i * 34, t, { size: 13 }));
  }
  s.text(330, 222, 'Either way, the state remains the primary political unit', { size: 13, bold: true });
  s.text(330, 250, 'Its economic role changes; its political role continues', { size: 12, muted: true });
  return s.visual('Two-column diagram. Left: globalisation can weaken the state, as the welfare state shrinks, the market decides more and companies press for policy changes. Right: it can strengthen the state through better information on citizens, faster delivery of services, and continued control of law and security. Below: either way the state remains the primary political unit', 'Globalisation and state capacity');
})();

const EVENTS = [
  [1991, 'India\'s reforms', 'up'],
  [1995, 'WTO set up', 'down'],
  [1999, 'Seattle protests', 'up'],
  [2001, 'First WSF, Porto Alegre', 'down'],
  [2004, 'WSF in Mumbai', 'up'],
];
const vTimeline = (() => {
  const s = new Svg(660, 210);
  const X = (y) => 60 + ((y - 1990) / 15) * 560;
  s.arrow(40, 105, 645, 105, { sw: 1.8 });
  for (const yr of [1990, 1995, 2000, 2005]) {
    s.line(X(yr), 100, X(yr), 110, { sw: 1.2, color: 'muted' });
  }
  for (const [yr, label, pos] of EVENTS) {
    const x = X(yr);
    s.dot(x, 105, 5, 'accent');
    if (pos === 'up') {
      s.line(x, 100, x, 62, { sw: 1.2, color: 'muted' });
      s.text(x, 50, String(yr), { bold: true, size: 13 });
      s.text(x, 28, label, { size: 12 });
    } else {
      s.line(x, 110, x, 148, { sw: 1.2, color: 'muted' });
      s.text(x, 160, String(yr), { bold: true, size: 13 });
      s.text(x, 182, label, { size: 12 });
    }
  }
  return s.visual('Timeline from 1990 to 2005: India begins major reforms in 1991, the WTO is set up in 1995, protests at the WTO meeting in Seattle in 1999, the first World Social Forum in Porto Alegre in 2001, and the World Social Forum in Mumbai in 2004', 'Key dates in the globalisation debate');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Meaning: four flows', 'Uneven flows', 'Causes', 'Is it new?', 'Effects on the state'], 'Route map of Part 1: meaning of globalisation as four flows, uneven flows, causes, whether it is new, and effects on the state', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Economic effects', 'Cultural effects', 'India and globalisation', 'Resistance', 'World Social Forum'], 'Route map of Part 2: economic effects, cultural effects, India and globalisation, resistance, and the World Social Forum', 'Part 2 at a glance');
const vUneven = table(
  ['Flow', 'How freely it moves', 'Imagined example'],
  [
    ['Commodities', 'Fairly freely; import barriers have fallen', 'Tiruppur T-shirts sold in Europe'],
    ['Capital', 'Very fast; money moves at a click', 'A fund invests in a Chennai car plant'],
    ['Ideas', 'Almost without limit through media', 'A cooking channel watched worldwide'],
    ['People', 'Restricted by visas and work permits', 'A nurse waits months for a work visa'],
  ],
  'Table of how freely each flow moves: commodities fairly freely, capital very fast, ideas almost without limit, but people are restricted by visas and work permits',
  'Flows are uneven: people move least freely.',
);
const vWE1 = table(
  ['Line in the imagined news story', 'Flow', 'Clue'],
  [
    ['A Japanese firm buys a stake in a Gujarat solar company', 'Capital', 'Money invested across borders'],
    ['Assam tea reaches cafés in Dubai', 'Commodities', 'Goods traded'],
    ['A Mizo footballer signs for a club abroad', 'People', 'A person moves for work'],
    ['A Telugu film is dubbed into Spanish', 'Ideas', 'Culture and stories travel'],
  ],
  'Worked example table: a firm buying a stake abroad is capital; Assam tea sold in Dubai is commodities; a footballer moving abroad is people; a dubbed Telugu film is ideas',
  'Ask what crosses the border: money, goods, a person or an idea.',
);
const vDims = table(
  ['Dimension', 'What changes', 'Imagined example'],
  [
    ['Political', 'What the state does and who influences decisions', 'A government cuts a subsidy to attract investors'],
    ['Economic', 'Trade, investment and jobs', 'A new export order for a Ludhiana cycle maker'],
    ['Cultural', 'Food, dress, music, language', 'Teenagers in Bhopal follow a Korean band'],
  ],
  'Table of the three dimensions of globalisation: political (what the state does), economic (trade, investment and jobs) and cultural (food, dress, music and language), each with an example',
  'Globalisation is multi-dimensional.',
);
const vTech = table(
  ['Technology', 'What it made possible'],
  [
    ['Telegraph and telephone', 'Messages across oceans in minutes'],
    ['Container ships and air cargo', 'Cheap, fast movement of goods'],
    ['Microchip and computers', 'Storing and processing information at speed'],
    ['Internet and mobile phones', 'Instant flows of ideas, money and services'],
  ],
  'Table of technologies and what they made possible: telegraph and telephone for fast messages, container ships and air cargo for goods, microchips for information, and the internet and mobile phones for instant flows',
  'Technology is the crucial, but not the only, cause.',
);
const vCauses = flow('LR', ['Technology', 'Awareness of interconnectedness', 'Government policies that open economies', 'Faster, wider flows'], 'Flow of causes: technology, awareness that the world is interconnected, and government policies that open economies together lead to faster and wider flows', 'No single cause');
const vOld = table(
  ['Earlier centuries', 'Today'],
  [
    ['Spice and silk routes linked Asia, Africa and Europe', 'Container ships and the internet link the whole world'],
    ['Journeys took months', 'Money and messages move in seconds'],
    ['Few people and goods took part', 'Billions of people and products are linked'],
  ],
  'Table comparing earlier long-distance exchange (spice and silk routes, journeys of months, few participants) with today (container ships and the internet, instant flows, billions linked)',
  'Exchange is old; its speed and scale are new.',
);
const vMnc = flow('TB', ['Company offers investment', 'Asks for easier rules on tax or labour', 'Government weighs jobs against control', 'Policy may change'], 'Flow: a multinational company offers investment and asks for easier rules, the government weighs jobs against control, and policy may change', 'How companies can influence policy');
const vCapacity = table(
  ['How technology helps', 'Imagined example'],
  [
    ['Better information about citizens', 'A state register finds families missing from a food scheme'],
    ['Direct delivery of benefits', 'Pensions paid straight into bank accounts in Kavera'],
    ['Faster public services', 'Land records available online in a district office'],
  ],
  'Table of ways technology helps the state: better information about citizens, direct delivery of benefits and faster public services, each with an imagined example',
  'Globalisation can add to state capacity.',
);
const vWE2 = table(
  ['Step', 'What to do', 'Applied to the Tarvia note (imagined)'],
  [
    ['1', 'Underline the action of the state', 'Tarvia lowers import duty and cuts a fertiliser subsidy'],
    ['2', 'Ask who gains and who loses', 'Consumers gain cheaper goods; small farmers lose support'],
    ['3', 'Name the concept', 'Retreat of the welfare state; economic opening'],
    ['4', 'Quote, name, explain', 'Write the line, the concept and one sentence of reasoning'],
  ],
  'Worked example table: four steps to read a source on state policy, applied to an imagined note from Tarvia that lowers import duty and cuts a fertiliser subsidy',
  'Quote, name, explain earns full marks.',
);
const vPrimary = table(
  ['Still done by the state', 'Done differently now'],
  [
    ['Making laws and keeping order', 'More economic decisions left to the market'],
    ['Defence and national security', 'Policies shaped with an eye on investors'],
    ['Holding elections and governing', 'Services delivered through digital tools'],
  ],
  'Table: the state still makes laws, keeps order, handles defence and holds elections, while it now leaves more economic decisions to the market, considers investors and uses digital tools',
  'The state remains the primary political unit.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Meaning', 'Worldwide flows of ideas, capital, commodities and people'],
    ['Uneven', 'People move least freely'],
    ['Causes', 'Technology above all, plus awareness and policy'],
    ['State', 'Welfare role may shrink; technology may add capacity'],
    ['Primacy', 'The state remains the main political unit'],
  ],
  'Summary table of Part 1: meaning as four flows, unevenness, causes, effects on the state and the continued primacy of the state',
);
const vEconFlow = flow('LR', ['Lower import barriers', 'More trade and foreign investment', 'IMF and WTO shape policy', 'Growth for some, pressure on others'], 'Flow of economic globalisation: lower import barriers lead to more trade and foreign investment, the IMF and WTO shape policy, and the result is growth for some and pressure on others', 'Economic globalisation');
const vEcon = table(
  ['Supporters say', 'Critics say'],
  [
    ['Faster growth and more jobs', 'Gains go mainly to the better-off'],
    ['Cheaper goods and wider choice', 'Small producers cannot compete'],
    ['New technology arrives', 'Safety nets for the poor weaken'],
    ['Countries learn from each other', 'Outside bodies shape national policy'],
  ],
  'Table comparing supporters of economic globalisation (growth, jobs, cheaper goods, technology, learning) with critics (gains to the better-off, small producers squeezed, weaker safety nets, outside influence on policy)',
  'Most scholars take a middle position.',
);
const vSafety = table(
  ['Safety net', 'Whom it protects'],
  [
    ['Subsidised food grains', 'Poor families when prices rise'],
    ['Old-age pensions', 'Elderly people without regular income'],
    ['Public health care', 'Those who cannot pay private fees'],
    ['Job guarantee schemes', 'Rural workers in lean seasons'],
  ],
  'Table of social safety nets and whom they protect: subsidised food grains, old-age pensions, public health care and job guarantee schemes',
  'Critics fear these weaken under market pressure.',
);
const vWE3 = table(
  ['Point', 'Content for a 5-mark answer'],
  [
    ['1', 'What changed: trade and capital flows'],
    ['2', 'Role of the IMF and WTO'],
    ['3', 'Supporters: growth, jobs, choice'],
    ['4', 'Critics: inequality, weaker safety nets'],
    ['5', 'Your balanced judgement'],
  ],
  'Worked example table: a five-point plan for a long answer on economic consequences: what changed, role of the IMF and WTO, supporters\' view, critics\' view and a balanced judgement',
  'One mark per point; both sides plus a judgement.',
);
const vHomogen = flow('LR', ['Powerful countries export films, food and brands', 'Same products everywhere', 'Local tastes and languages may fade'], 'Flow of cultural homogenisation: powerful countries export films, food and brands, the same products appear everywhere and local tastes and languages may fade', 'The fear of sameness');
const vCulture = table(
  ['Homogenisation', 'Heterogenisation'],
  [
    ['One dominant culture spreads', 'Cultures mix and combine'],
    ['Choices narrow', 'Choices widen'],
    ['Imagined: every town has the same burger chain', 'Imagined: a Shillong band mixes Khasi tunes with rock'],
  ],
  'Table comparing cultural homogenisation (one dominant culture spreads, choices narrow, the same burger chain everywhere) with heterogenisation (cultures mix, choices widen, a band mixing Khasi tunes with rock)',
  'Two opposite tendencies.',
);
const vEnrich = table(
  ['Threat', 'Enrichment'],
  [
    ['Local crafts lose buyers', 'Indian food, yoga and music reach the world'],
    ['Young people forget folk stories', 'Online videos help keep folk songs alive'],
    ['One language dominates media', 'People become comfortable in several languages'],
  ],
  'Table of cultural threats (crafts lose buyers, folk stories forgotten, one language dominates) and enrichments (Indian culture reaches the world, folk songs kept alive online, people use several languages)',
  'The outcome depends on how a society responds.',
);
const vIndia = flow('LR', ['Colonial era: raw materials out, goods in', 'After 1947: protection and self-reliance', '1991: economic reforms', 'Today: faster growth, uneven gains'], 'Flow of India and globalisation: colonial era exporting raw materials and importing goods, protection after 1947, reforms in 1991, and today faster growth with uneven gains', 'India and globalisation');
const vIndiaNow = table(
  ['Gains since 1991', 'Concerns'],
  [
    ['Faster growth', 'Benefits unevenly shared'],
    ['Services and IT jobs', 'Pressure on small producers'],
    ['Wider consumer choice', 'Informal workers lack protection'],
  ],
  'Table of India since 1991: gains (faster growth, services and IT jobs, wider choice) and concerns (uneven benefits, pressure on small producers, unprotected informal workers)',
  'A mixed record, still debated.',
);
const vCritiques = table(
  ['Left critique', 'Right critique'],
  [
    ['A phase of global capitalism', 'Weakens the power of the state'],
    ['Makes the rich richer, the poor poorer', 'Wants self-reliance and protection in some sectors'],
    ['Focus on class and workers', 'Focus on nation and traditional culture'],
  ],
  'Table comparing the left critique of globalisation (a phase of global capitalism that widens inequality, focus on class) with the right critique (weakens the state, wants self-reliance, focus on nation and culture)',
  'Critics oppose a form of globalisation, not all contact.',
);
const vIndiaResist = table(
  ['Who', 'Concern (stated generally)'],
  [
    ['Trade unions and Left parties', 'Jobs, wages and public-sector employment'],
    ['Farmers\' and small producers\' groups', 'Competition from large foreign firms and imports'],
    ['Some cultural groups', 'Foreign influence on customs and media'],
  ],
  'Table of resistance to globalisation in India: trade unions and Left parties on jobs and wages, farmers\' and small producers\' groups on competition, and some cultural groups on foreign influence',
);
const vWE4 = table(
  ['Point', 'What to write on resistance'],
  [
    ['1', 'Not against connection, against a form'],
    ['2', 'Left critique'],
    ['3', 'Right critique'],
    ['4', 'World Social Forum: Porto Alegre 2001, Mumbai 2004'],
    ['5', 'Resistance in India: unions, farmers, producers'],
  ],
  'Worked example table: a five-point plan for a long answer on resistance: nature of resistance, left critique, right critique, the World Social Forum and resistance in India',
  'Give each point a heading in your answer.',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Economic', 'More trade and investment; IMF and WTO; uneven gains'],
    ['Cultural', 'Homogenisation fear; heterogenisation widens choice'],
    ['India', 'Colonial flows, protection, 1991 reforms'],
    ['Resistance', 'Left and right critiques; World Social Forum'],
  ],
  'Summary table of Part 2: economic effects, cultural effects, India\'s path and resistance to globalisation',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Globalisation — Part 1: Meaning, Causes and the State',
  goals: [
    'Explain globalisation as flows of ideas, capital, commodities and people',
    'Explain why the flows are uneven and why globalisation is multi-dimensional',
    'Explain the causes of globalisation, especially technology',
    'Analyse how globalisation can weaken and strengthen the capacity of the state',
  ],
  slides: [
    sl('title', 'Globalisation', {
      b: 'Part 1 — what globalisation **means**, what **causes** it, and what it does to the **state**.',
      v: vRoute1,
      n: 'Look at the things around you. Your phone may be designed in one country and assembled in another. The song you hum may come from Seoul, and the news you read may be written in London. This is globalisation. In this part we see what the word means, why it has spread so fast, and what it does to the power of governments.',
    }),
    sl('diagram', 'Four flows', {
      b: 'Globalisation = **worldwide interconnectedness** created by **flows** of ideas, capital, commodities and people.',
      v: vFlows,
      n: 'At its heart, globalisation is about flows. Ideas travel through films, books and the internet. Capital moves when investors put money into businesses in other countries. Commodities are goods traded across borders. And people move to work, study or travel. Together these flows tie distant places into one connected world. Keep these four words in mind; most questions begin here.',
    }),
    sl('check', 'Quick check: many dimensions', {
      b: 'Why is globalisation called multi-dimensional?',
      chk: 'm_multi_dim',
      n: 'Think about whether globalisation touches only the economy, or also politics and culture.',
    }),
    sl('concept', 'The flows are uneven', {
      b: 'Goods, money and ideas cross borders easily; **people** face **visas and work permits**.',
      v: vUneven,
      n: 'The four flows do not move equally. Goods and money cross borders far more easily than before, and ideas spread almost without limit. People are different. Most countries still control who may enter and work, through visas and permits. So globalisation affects groups unequally. A company can move its capital at a click, while a worker may wait months for permission to move.',
    }),
    sl('example', 'Worked example 1: name the flow', {
      b: 'Classify each line of an imagined news story by the flow it shows.',
      bl: [
        'Step 1 — Ask what crosses the border: **money, goods, a person or an idea**.',
        'Step 2 — Money invested = **capital**; goods sold = **commodities**.',
        'Step 3 — A person moving = **people**; stories, knowledge, films = **ideas**.',
        'Step 4 — Write the flow **and** the clue from the line.',
      ],
      v: vWE1,
      n: 'Source questions often ask you to spot a flow. Ask one question: what is crossing the border? When a Japanese firm buys a share in a Gujarat company, money crosses, so it is capital. Tea sold in Dubai is a commodity. A footballer signing abroad is a flow of people. A dubbed film carries stories, so it is a flow of ideas.',
    }),
    sl('check', 'Quick check: match the flows', {
      b: 'Match each imagined event with the flow it shows.',
      chk: 'mt_flows',
      n: 'Use the same question as in the worked example: what exactly crosses the border?',
    }),
    sl('concept', 'More than economics', {
      b: 'Globalisation has **political, economic and cultural** dimensions, and different societies feel it differently.',
      v: vDims,
      n: 'It is a common mistake to think of globalisation only as trade and money. It also changes what governments do and who influences their decisions. And it changes culture: what we eat, wear, watch and speak. Its effects also differ from place to place. A change that helps one group may hurt another, so we must study each dimension separately.',
    }),
    sl('concept', 'Causes: technology', {
      b: '**Technology** is the most important cause of present-day globalisation.',
      v: vTech,
      n: 'Why has globalisation grown so fast? The biggest reason is technology. The telegraph and telephone made it possible to send messages across oceans. Container ships and air cargo made goods cheap to move. The microchip and the internet let ideas, money and services travel almost instantly. Without these inventions, today\'s flows would be impossible.',
    }),
    sl('diagram', 'Causes: not one factor alone', {
      v: vCauses,
      n: 'Technology is crucial, but it is not the only cause. People have also become aware that the world is connected: a financial crash or a new disease in one place soon affects others, so countries work together. And many governments chose to open their economies, lowering trade barriers and welcoming investment. Together these factors produce faster and wider flows.',
    }),
    sl('check', 'Quick check: not global', {
      b: 'Which of these is NOT an example of globalisation?',
      chk: 'm_not_global',
      n: 'Look for the activity in which nothing crosses a national border.',
    }),
    sl('concept', 'Is globalisation new?', {
      b: 'Long-distance exchange is **old**; what is new is its **speed and scale**.',
      v: vOld,
      n: 'Trade, travel and the spread of ideas across continents are not new. Merchants carried spices and silk along ancient routes, and religions and languages spread across regions. What is new today is the speed and the scale. Money and messages move in seconds, and billions of people and products are linked. That is why the present phase feels so different.',
    }),
    sl('diagram', 'Globalisation and state capacity', {
      b: 'Does globalisation **weaken** or **strengthen** the state? Both, in different ways.',
      v: vState,
      n: 'A big political question is what globalisation does to the power of states. Critics say it weakens them: the welfare state shrinks into a minimalist state, and the market makes more decisions. Others point out that new technology helps governments know more about their citizens and serve them faster. Either way, states have not disappeared. They still make laws and guard national security.',
    }),
    sl('concept', 'The role of multinational companies', {
      b: 'Large companies can **influence** governments that want their investment.',
      v: vMnc,
      n: 'Multinational companies now play a bigger role in world politics. When a company offers to build a factory, it may ask a government to ease rules on tax or labour. The government must weigh new jobs against its own control over policy. So some decisions that states once took alone are now shaped by the wishes of investors.',
    }),
    sl('concept', 'Technology can add to state capacity', {
      b: 'Globalisation also brings tools that make the state **more** effective.',
      v: vCapacity,
      n: 'The story is not only one of retreat. The same technology that drives globalisation gives governments better information about their citizens. Benefits can be paid straight into bank accounts, and records can be kept online. In these ways the state can actually do more than before, which is why many scholars reject the idea that globalisation simply weakens it.',
    }),
    sl('example', 'Worked example 2: reading a source on the state', {
      b: 'An imagined policy note from Tarvia lowers import duty and cuts a fertiliser subsidy. How do you answer a source question on it?',
      bl: [
        'Step 1 — Underline what the **state** is doing.',
        'Step 2 — Ask **who gains** and **who loses**.',
        'Step 3 — Name the **concept** it shows.',
        'Step 4 — **Quote, name, explain** in your answer.',
      ],
      v: vWE2,
      n: 'Here is a method for source questions. First, underline what the government is doing: lowering import duty and cutting a subsidy. Second, ask who gains and who loses: consumers get cheaper goods, small farmers lose support. Third, name the idea: the retreat of the welfare state and economic opening. Finally, quote the line, name the concept and explain it in one sentence.',
    }),
    sl('check', 'Quick check: technology and the state', {
      b: 'What does the imagined Kavera pension scheme suggest about globalisation and the state?',
      chk: 'm_state_tech',
      n: 'Ask whether the government is doing less or more because of new technology.',
    }),
    sl('concept', 'The state remains primary', {
      b: 'States still make laws, keep order and decide on **national security**.',
      v: vPrimary,
      n: 'After weighing both sides, most scholars conclude that the state remains the most important political unit. It still makes laws, keeps order, runs elections and decides on defence. What has changed is its economic role: more decisions are left to the market, policies are made with investors in mind, and services are delivered with new tools.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Let us sum up. Globalisation means worldwide flows of ideas, capital, commodities and people, and the flows are uneven, with people moving least freely. It is multi-dimensional. Technology is its most important cause, along with awareness of interconnectedness and government policy. It can shrink the welfare role of the state but can also add to its capacity, and the state remains the primary political unit.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Define globalisation with the **four flows**; one-word answers lose marks.',
        'Never call it **purely economic**: name the political and cultural sides too.',
        'For causes, put **technology** first, but show it is **not the only** cause.',
        'On the state, give **both** sides: weakening and enhanced capacity.',
        'In sources: **quote** the line, **name** the concept, **explain** in one sentence.',
      ],
      n: 'A few tips. Always define globalisation through the four flows. Never say it is only economic. When asked about causes, start with technology, but add other causes. On the state, examiners reward answers that show both sides, the weakening and the strengthening. In source questions, quote the line, name the concept and give one sentence of explanation.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Globalisation — Part 2: Economy, Culture, India and Resistance',
  goals: [
    'Evaluate the economic consequences of globalisation from both sides',
    'Distinguish cultural homogenisation and heterogenisation',
    'Describe India\'s experience of globalisation from colonial times to the 1991 reforms and after',
    'Explain resistance to globalisation, including the World Social Forum',
  ],
  slides: [
    sl('title', 'Globalisation: economy, culture and resistance', {
      b: 'Part 2 — **economic** and **cultural** effects, **India\'s** experience and **resistance**.',
      v: vRoute2,
      n: 'In Part 1 we saw what globalisation is and what it does to the state. Now we look at its effects on the economy and on culture, and then at India: how our country moved from colonial trade to protection and then to opening up. Finally we meet the critics, and the World Social Forum, where many of them meet.',
    }),
    sl('diagram', 'Economic globalisation', {
      b: 'Lower barriers, more **trade and investment**, a big role for the **IMF** and **WTO**.',
      v: vEconFlow,
      n: 'Economic globalisation means that countries lower their barriers to imports and welcome foreign investment. Trade and capital flows grow. International bodies such as the International Monetary Fund and the World Trade Organisation play a large part in shaping economic policy. The result is faster growth for some, but new pressures for others, which is why the subject is hotly debated.',
    }),
    sl('two-column', 'Supporters and critics', {
      b: 'The economic debate has two sides and a large middle ground.',
      cols: [
        '**Supporters:** faster growth, more jobs, cheaper goods, new technology.',
        '**Critics:** unequal gains, squeezed small producers, weaker safety nets, outside influence on policy.',
      ],
      v: vEcon,
      n: 'Supporters argue that openness brings growth, jobs, cheaper goods and new technology. Critics reply that the gains go mainly to those who are already better off, that small producers cannot compete, and that outside bodies shape national policy. Many scholars take a middle path: globalisation can help, but only with rules and protection for those who might lose.',
    }),
    sl('concept', 'Social safety nets', {
      b: 'Public support that protects the **weakest** from sudden loss of income.',
      v: vSafety,
      n: 'Critics often speak of social safety nets. These are forms of public support, such as cheap food grains, pensions, public hospitals and job schemes, that catch people when they fall. The worry is that, under pressure to cut spending and attract investment, governments may weaken these nets just when people need them most.',
    }),
    sl('example', 'Worked example 3: planning a 5-mark answer', {
      b: 'Question: Examine the economic consequences of globalisation. Plan five points.',
      bl: [
        'Point 1 — What changed: **trade and capital** flows.',
        'Point 2 — Role of the **IMF and WTO**.',
        'Point 3 — **Supporters**: growth, jobs, choice.',
        'Point 4 — **Critics**: inequality, weaker safety nets.',
        'Point 5 — Your **balanced judgement**.',
      ],
      v: vWE3,
      n: 'Five-mark questions usually carry one mark per point. Plan before you write. Start with what changed, then the role of international bodies. Give the supporters a point and the critics a point. End with your own balanced judgement. This plan keeps your answer within the word limit and makes sure you show both sides, which is what examiners look for.',
    }),
    sl('check', 'Quick check: moving people', {
      b: 'True or false: people still move across borders less freely than goods and capital.',
      chk: 'tf_people',
      n: 'Remember what we learnt about the four flows in Part 1.',
    }),
    sl('diagram', 'Cultural homogenisation', {
      b: 'The fear that one **dominant culture** will make the world look alike.',
      v: vHomogen,
      n: 'Now culture. Many people fear that globalisation leads to cultural homogenisation. The films, food and brands of powerful countries spread everywhere, so towns across the world begin to look and sound the same. Local tastes, crafts and languages may fade. Some writers call this the spread of a single global culture, which is really the culture of the most powerful.',
    }),
    sl('concept', 'Heterogenisation and hybrid cultures', {
      b: 'Outside influences can also **mix** with local culture and **widen choices**.',
      v: vCulture,
      n: 'There is another side. When outside influences meet local culture, they often mix and create something new. A band in Shillong blends folk tunes with rock, and a café invents a new kind of dosa. This is cultural heterogenisation. It widens our choices without wiping out tradition, and it shows that culture is always changing.',
    }),
    sl('check', 'Quick check: a new dosa', {
      b: 'A Chennai café mixes Mexican and Italian fillings into dosas. What is this an example of?',
      chk: 'm_hybrid',
      n: 'Ask whether the local dish has been replaced, or mixed with something new.',
    }),
    sl('concept', 'Threat or enrichment?', {
      b: 'Cultural globalisation can **threaten** and **enrich**; the outcome depends on how a society responds.',
      v: vEnrich,
      n: 'So is cultural globalisation a threat or an enrichment? It can be both. Crafts may lose buyers and young people may forget folk stories. But Indian food, yoga and music have also reached the world, and online videos help keep folk songs alive. A confident society can absorb outside influences and remain itself.',
    }),
    sl('check', 'Quick check: key terms', {
      b: 'Match each term from the globalisation debate with its meaning.',
      chk: 'mt_concepts',
      n: 'Four key terms from both parts of this chapter. Match each with its meaning.',
    }),
    sl('diagram', 'India and globalisation', {
      b: 'From colonial trade to protection to the **1991 reforms**.',
      v: vIndia,
      n: 'India has a long history of global contact. Under colonial rule, it sent raw materials abroad and bought finished goods, a pattern that served the colonial power. After independence, India chose protection, restricting imports to build its own industry and become self-reliant. Growth stayed slow, and in 1991, after a financial crisis, India began major reforms to open its economy.',
    }),
    sl('concept', 'India since 1991', {
      b: 'Real gains, uneven sharing: the debate continues.',
      v: vIndiaNow,
      n: 'Since 1991, India\'s economy has grown faster, with many new jobs in services and information technology and far wider choice for consumers. But the gains have not been shared evenly. Small producers face new competition, and many informal workers lack protection. That is why people in India still debate how to spread the benefits more widely.',
    }),
    sl('concept', 'Resistance: left and right', {
      b: 'Critics oppose a **particular form** of globalisation, not all global contact.',
      v: vCritiques,
      n: 'Resistance to globalisation comes from different directions. Critics on the left see it as a phase of global capitalism that makes the rich richer and the poor poorer. Critics on the right worry that it weakens the state, and they want self-reliance in some sectors and protection for traditional culture. Most critics are not against contact itself, but against the present form of globalisation.',
    }),
    sl('diagram', 'The World Social Forum', {
      b: 'An open meeting ground for movements opposed to **neo-liberal globalisation**.',
      v: vTimeline,
      n: 'The World Social Forum is an open platform where human rights activists, environmentalists, labour, youth and women\'s groups meet to oppose neo-liberal globalisation. Its first meeting was held in Porto Alegre in Brazil in 2001, and its fourth meeting was held in Mumbai in 2004. Notice that these critics use global networks to come together.',
    }),
    sl('concept', 'Resistance in India', {
      b: 'Unions, Left parties, farmers\' and producers\' groups, and some cultural groups.',
      v: vIndiaResist,
      n: 'In India too, globalisation has met resistance. Trade unions and Left parties have protested against policies they see as harmful to workers. Farmers\' and small producers\' groups have campaigned against competition from large foreign firms and imports. Some groups object to foreign influence on customs and media. Write about these in general terms, as our syllabus does.',
    }),
    sl('example', 'Worked example 4: a 5-mark answer on resistance', {
      b: 'Question: Explain the main forms of resistance to globalisation. Plan five points.',
      bl: [
        'Point 1 — Resistance is against a **form**, not all contact.',
        'Point 2 — **Left** critique.',
        'Point 3 — **Right** critique.',
        'Point 4 — **World Social Forum**: Porto Alegre 2001, Mumbai 2004.',
        'Point 5 — Resistance **in India**.',
      ],
      v: vWE4,
      n: 'Here is another plan. Start by saying that critics oppose a form of globalisation rather than all contact. Then give the left critique and the right critique. Add the World Social Forum with its two key venues and years. Finish with resistance in India. Five points, each with a heading, will cover everything an examiner expects.',
    }),
    sl('check', 'Quick check: put the events in order', {
      b: 'Arrange the five events connected with globalisation in chronological order.',
      chk: 'ord_timeline',
      n: 'Use the timeline we saw on the World Social Forum slide.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Economic globalisation brings more trade and investment, with the IMF and WTO shaping policy, but its gains are uneven. Culturally, it can make the world look alike, or mix cultures and widen choice. India moved from colonial trade to protection and then to the 1991 reforms. Critics on the left and right, and the World Social Forum, resist its present form.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Economic answers need **both sides** and a judgement.',
        'Do not confuse **homogenisation** (sameness) with **heterogenisation** (mixing).',
        'World Social Forum: **Porto Alegre 2001**, **Mumbai 2004**.',
        'India: colonial flows, protection after 1947, **1991** reforms.',
        'Write about political groups **neutrally**, by their stated concerns.',
      ],
      n: 'Final tips. In economic questions, give both sides and end with your own judgement. Keep homogenisation and heterogenisation apart: one means sameness, the other mixing. Learn the two venues and years of the World Social Forum. For India, remember the three phases. And describe political groups neutrally, through their stated concerns, as examiners expect.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Globalisation — Notes',
  sections: [
    {
      h: '1. Meaning of globalisation',
      t: 1,
      b: '**Globalisation** is a process of **worldwide interconnectedness** produced by **flows** of four kinds:\n- **Ideas** (news, films, knowledge, values)\n- **Capital** (investment, loans)\n- **Commodities** (goods traded across borders)\n- **People** (workers, students, tourists)\n\nThe flows are **uneven**: goods, money and ideas move far more easily than people, who face visa and immigration controls. Globalisation is **multi-dimensional** (political, economic, cultural) and its effects **differ** from society to society and group to group.',
      terms: [
        ['Globalisation', 'Worldwide interconnectedness produced by flows of ideas, capital, commodities and people.'],
        ['Interconnectedness', 'A condition in which events in one part of the world quickly affect people elsewhere.'],
      ],
      v: vFlows,
      vs: [vUneven],
    },
    {
      h: '2. Causes of globalisation',
      t: 1,
      b: '- **Technology** is the most crucial cause: the telegraph, telephone, container shipping, microchip and internet have made worldwide flows fast and cheap.\n- **Awareness of interconnectedness**: people see that crises, diseases and environmental problems cross borders, which encourages cooperation.\n- **Government choices**: many countries lowered trade barriers and opened to investment.\n\nGlobalisation is **not caused by one factor alone**. Long-distance exchange is centuries old; what is new is its **speed and scale**.',
      terms: [['Multi-dimensional', 'Having political, economic and cultural sides, not only an economic one.']],
      v: vTech,
      vs: [vCauses, vOld],
    },
    {
      h: '3. Political consequences',
      t: 2,
      b: '**Erosion of state capacity (critics\' view):** the **welfare state** gives way to a **minimalist state** that keeps core functions such as law and order and security, and leaves many economic and social choices to the **market**. Multinational companies gain influence over policy.\n\n**Enhanced capacity:** technology gives governments better information about citizens and better ways to deliver services.\n\n**Conclusion:** the state remains the **primary political unit**; its economic role has changed, but it still makes laws, keeps order and decides on national security.',
      terms: [
        ['Welfare state', 'A state that takes responsibility for the social and economic well-being of its citizens.'],
        ['Minimalist state', 'A state that limits itself to core functions such as law and order and security.'],
      ],
      v: vState,
      vs: [vMnc, vCapacity, vPrimary],
    },
    {
      h: '4. Economic consequences',
      t: 2,
      b: '- **More trade and investment** as import restrictions fall and capital moves quickly.\n- International institutions such as the **IMF** and **WTO** influence economic policy in many countries.\n- **Uneven effects:** some groups and countries gain far more than others; the movement of people stays restricted.\n\n**Supporters:** openness brings growth, jobs, cheaper goods and technology.\n**Critics:** benefits concentrate among the better-off, small producers struggle, **social safety nets** may weaken, and some describe it as a new form of dependence.\n**Middle view:** with rules and protection for the vulnerable, gains can be widely shared.',
      terms: [['Social safety net', 'Public support (food, pensions, health care, job schemes) that protects the weakest from income shocks.']],
      v: vEconFlow,
      vs: [vEcon, vSafety],
    },
    {
      h: '5. Cultural consequences',
      t: 2,
      b: '**Homogenisation:** the culture of powerful countries spreads and local cultures fade; the world starts to look alike. Some writers call this the spread of a single global culture.\n\n**Heterogenisation:** outside influences mix with local culture, producing **hybrid cultures** and widening choices without erasing tradition.\n\nCultural globalisation can be both a **threat** (crafts lose buyers, local stories forgotten) and an **enrichment** (Indian culture reaches the world, new forms emerge).',
      terms: [
        ['Cultural homogenisation', 'The spread of one dominant culture, making cultures across the world alike.'],
        ['Cultural heterogenisation', 'The mixing of cultures that creates new combinations and widens choices.'],
      ],
      v: vCulture,
      vs: [vHomogen, vEnrich],
    },
    {
      h: '6. India and globalisation; resistance',
      t: 3,
      b: '**India:** in the colonial era India exported raw materials and imported finished goods. After 1947 it followed **protectionism** to build industry and self-reliance; growth remained slow. In **1991**, after a financial crisis, it began major **economic reforms**. Since then growth has been faster, with new service and IT jobs, but gains are **unevenly shared**.\n\n**Resistance:** most critics oppose a particular (**neo-liberal**) form of globalisation, not global contact as such.\n- **Left:** a phase of global capitalism that widens the gap between rich and poor.\n- **Right:** fears a weaker state, wants self-reliance in some sectors and protection of traditional culture.\n- **Seattle, 1999:** protests at the WTO ministerial meeting.\n- **World Social Forum:** an open platform of activists, environmentalists, labour, youth and women\'s groups; first met in **Porto Alegre, Brazil (2001)**; fourth meeting in **Mumbai (2004)**.\n- **In India:** trade unions, Left parties, farmers\' and small producers\' groups and some cultural groups have protested against aspects of globalisation.',
      terms: [
        ['Protectionism', 'Restricting imports to shelter domestic producers.'],
        ['World Social Forum', 'An open meeting ground of movements and activists opposed to neo-liberal globalisation.'],
      ],
      v: vIndia,
      vs: [vIndiaNow, vCritiques, vTimeline, vIndiaResist],
    },
  ],
  tips: '**Common mistakes**\n- Defining globalisation in one word ("trade"): always mention the **four flows** and interconnectedness.\n- Calling it **purely economic** or caused by **technology alone**.\n- Saying globalisation has made the state **disappear**: it remains the primary political unit.\n- Mixing up **homogenisation** (sameness) and **heterogenisation** (mixing).\n- Getting the World Social Forum venues wrong: **Porto Alegre 2001**, **Mumbai 2004** (fourth meeting).\n\n**How marks are usually awarded**\n- 1-mark MCQ and assertion-reason: one correct option.\n- 2 marks: two points or a point with an example (about 30–50 words).\n- 3 marks: three distinct points (about 50–80 words).\n- 5 marks: five headed points with both sides and a judgement (about 80–120 words).\n- Source questions: quote the line, name the concept, explain briefly.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Globalisation**', 'Worldwide **interconnectedness** produced by flows of ideas, capital, commodities and people.', 'definition', 1],
  ['The **four flows** of globalisation', 'Ideas, capital, commodities, people.', 'fact', 1],
  ['Which flow is **most restricted**?', 'The flow of **people**: visas and work permits.', 'concept', 1],
  ['Why is globalisation **multi-dimensional**?', 'It has political, economic and cultural sides, and affects societies differently.', 'concept', 1],
  ['Most crucial **cause** of globalisation', '**Technology**: telegraph, telephone, microchip, internet.', 'fact', 1],
  ['Two causes besides technology', 'Awareness of worldwide interconnectedness; government policies that open economies.', 'concept', 1],
  ['Is globalisation new?', 'Exchange is old; its **speed and scale** are new.', 'concept', 1],
  ['Example of a **flow of capital**', 'A foreign firm investing in a factory in India.', 'example', 1],
  ['**Welfare state**', 'A state responsible for the social and economic well-being of its citizens.', 'definition', 2],
  ['**Minimalist state**', 'Keeps core functions such as law and order and security; leaves more to the market.', 'definition', 2],
  ['How globalisation can **weaken** the state', 'Welfare role shrinks; market and companies shape decisions.', 'concept', 2],
  ['How globalisation can **strengthen** the state', 'Technology gives better information and service delivery.', 'concept', 2],
  ['Is the state still primary?', 'Yes: it makes laws, keeps order and decides on national security.', 'exam-tip', 2],
  ['Two bodies that shape economic policy worldwide', 'The **IMF** and the **WTO**.', 'fact', 2],
  ['**Economic globalisation**', 'Lower import barriers; more trade and investment across countries.', 'definition', 2],
  ['Supporters of economic globalisation say…', 'Growth, jobs, cheaper goods, technology.', 'concept', 2],
  ['Critics of economic globalisation say…', 'Unequal gains, squeezed small producers, weaker safety nets.', 'concept', 2],
  ['**Social safety net**', 'Public support protecting the weakest: food subsidy, pensions, health care, job schemes.', 'definition', 2],
  ['**Cultural homogenisation**', 'Spread of one dominant culture; the world starts to look alike.', 'definition', 2],
  ['**Cultural heterogenisation**', 'Cultures mix into new forms; choices widen.', 'definition', 2],
  ['Example of a **hybrid culture**', 'A band mixing folk tunes with rock; a fusion dish.', 'example', 2],
  ['Is cultural globalisation always harmful?', 'No: it can threaten traditions but can also enrich and widen choice.', 'exam-tip', 2],
  ['India under **colonial rule**', 'Exported raw materials, imported finished goods.', 'fact', 3],
  ['India **after 1947**', 'Protectionism and self-reliance; slow growth.', 'fact', 3],
  ['India\'s major **economic reforms** began in', '**1991**.', 'fact', 3],
  ['**Left critique** of globalisation', 'A phase of global capitalism that makes the rich richer and the poor poorer.', 'concept', 3],
  ['**Right critique** of globalisation', 'Weakens the state; wants self-reliance; protects traditional culture.', 'concept', 3],
  ['Protests at the WTO meeting, **1999**', 'Held in **Seattle**.', 'fact', 3],
  ['**World Social Forum**: first and fourth meetings', 'Porto Alegre, Brazil (**2001**); Mumbai (**2004**).', 'fact', 3],
  ['Who meets at the World Social Forum?', 'Human rights activists, environmentalists, labour, youth and women\'s groups.', 'fact', 3],
  ['Resistance in India: who?', 'Trade unions, Left parties, farmers\' and small producers\' groups, some cultural groups.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Globalisation',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_tech_cause', 'm_safety_net', 'm_wsf_nature', 'ar_resist'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_meaning', 's_homogen_hetero', 's3_political'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_concept', 'l_resistance'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_festival'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Globalisation',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_interconnected', 'm_uneven_flow', 'm_minimal', 'm_mnc', 'm_imf_wto', 'm_cultural_fear', 'm_colonial', 'm_left_critique', 'ar_tech', 'ar_uneven'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_state_capacity', 's_wsf', { attempt: 1, keys: ['s_two_views_econ', 's_india_protection'] }, 's3_economic_debate', { attempt: 1, keys: ['s3_culture_both', 's3_left_right'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_three_consequences', { attempt: 1, keys: ['l_econ_consequences', 'l_india'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_marenia', 'sb_weavers'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-political-science-ch07 only (concept and causes; political, economic and cultural consequences; India and globalisation and resistance, including the World Social Forum)',
    originality: 'every source, country, speaker and scenario is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    facts: `timeline ${EVENTS.map(([y, l]) => `${y} ${l}`).join('; ')}; nothing after 2024 stated`,
    neutrality: 'economic and cultural effects presented with arguments of supporters and critics; left and right critiques and Indian resistance described by stated concerns, without judgement',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
