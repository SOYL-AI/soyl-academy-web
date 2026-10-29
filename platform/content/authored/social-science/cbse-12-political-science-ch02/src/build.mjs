// Build CBSE 12 Political Science ch02 Contemporary Centres of Power. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch02', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
/** Ordinal timeline: equal spacing so labels never collide; labels alternate above and below. */
function timeline(events, alt, caption) {
  const W = 720, H = 230, x0 = 70, x1 = W - 70, yAxis = 115;
  const s = new Svg(W, H);
  s.line(x0 - 30, yAxis, x1 + 30, yAxis, { sw: 2.4, color: 'muted' });
  const step = (x1 - x0) / (events.length - 1);
  events.forEach(([year, lines], i) => {
    const x = x0 + i * step;
    const up = i % 2 === 0;
    s.line(x, yAxis, x, up ? yAxis - 22 : yAxis + 22, { sw: 1.4, color: 'muted' });
    s.dot(x, yAxis, 6, 'accent');
    const yYear = up ? yAxis - 34 : yAxis + 34;
    s.text(x, yYear, year, { bold: true, size: 15, color: 'accent' });
    lines.forEach((ln, j) => s.text(x, up ? yYear - 18 * (lines.length - j) : yYear + 18 * (j + 1), ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}
/** A five-point star polygon centred at (cx, cy). */
function star(cx, cy, R, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 === 0 ? R : r;
    pts.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
  }
  return pts;
}

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Centres of power after the Cold War', 'Europe rebuilds after 1945', 'From coal and steel to the EU', 'The EU as an actor and its limits', 'ASEAN and the ASEAN Way', 'India looks and acts east'], 'Route map of Part 1: centres of power after the Cold War, Europe after 1945, from coal and steel to the EU, the EU as an actor and its limits, ASEAN and the ASEAN Way, and India\'s Look East and Act East policies', 'Part 1 at a glance');
const vCentres = table(
  ['Centre of power', 'Main source of influence'],
  [
    ['European Union', 'Single market, the euro, common institutions'],
    ['ASEAN', 'Collective voice of Southeast Asian states; dialogue forums'],
    ['China', 'Rapid economic growth since 1978; trade and manufacturing'],
    ['Japan', 'Advanced economy, technology and aid'],
    ['South Korea', 'Export-led industry and technology'],
  ],
  'Table of five centres of power and their main sources of influence: the EU through its single market, euro and institutions; ASEAN through a collective voice and forums; China through rapid growth; Japan through economy, technology and aid; South Korea through export-led industry',
  'Influence today is often economic as much as military.',
);
const vPostWar = flow('LR', ['Europe ruined by war (1945)', 'Marshall Plan aid run through the OEEC (1948)', 'Council of Europe (1949)', 'Habit of working together'], 'Flow: Europe ruined by war in 1945, Marshall Plan aid run through the OEEC in 1948, the Council of Europe in 1949, and a growing habit of working together', 'How cooperation began');
const vEuTimeline = timeline(
  [['1948', ['OEEC runs', 'Marshall aid']], ['1951', ['Coal and Steel', 'Community']], ['1957', ['Treaty of Rome:', 'EEC']], ['1992', ['Maastricht:', 'EU created']], ['2002', ['Euro notes', 'and coins']], ['2020', ['UK leaves;', '27 members']]],
  'Timeline of European integration: 1948 OEEC runs Marshall aid; 1951 Coal and Steel Community; 1957 Treaty of Rome creates the EEC; 1992 Maastricht Treaty creates the EU; 2002 euro notes and coins; 2020 the United Kingdom leaves and 27 members remain',
  'Events are evenly spaced, not drawn to a time scale.',
);
const vMaastricht = table(
  ['Area', 'What the EU added after Maastricht (1992)'],
  [
    ['Economy', 'Single market; path to a common currency'],
    ['Foreign and security policy', 'Aim of acting together in world affairs'],
    ['Justice and home affairs', 'Cooperation on police, courts and borders'],
    ['Citizens', 'Citizenship of the Union alongside national citizenship'],
  ],
  'Table of what the Maastricht Treaty added: a single market and path to a common currency, an aim of common foreign and security policy, cooperation in justice and home affairs, and citizenship of the Union',
);
const vFlag = (() => {
  const s = new Svg(420, 260);
  s.rect(60, 20, 300, 200, { fill: 'blue', stroke: false, rx: 4 });
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    s.polygon(star(210 + 70 * Math.sin(a), 120 - 70 * Math.cos(a), 12, 5), { fill: 'yellow', stroke: false });
  }
  s.text(210, 245, 'Twelve stars in a circle: unity, not a count of members', { size: 13 });
  return s.visual('Drawing of a flag with a blue field and a circle of twelve yellow five-pointed stars; the caption says the twelve stars stand for unity, not for the number of members', 'Symbols are one sign that the EU is more than a trade bloc.');
})();
const vActor = table(
  ['Kind of influence', 'Examples'],
  [
    ['Economic', 'One of the largest economies; the euro; rules that partners must meet to trade'],
    ['Political', 'France holds a permanent UN Security Council seat; joint positions in trade and climate talks'],
    ['Military', 'Large combined armed forces and defence spending of members'],
  ],
  'Table of the EU\'s influence: economic (large economy, euro, trade rules), political (France\'s permanent Security Council seat, joint positions in talks) and military (large combined forces of members)',
);
const vLimits = flow('TB', ['Members keep their own foreign and defence policies', 'Disagreements on world crises', 'Draft constitution rejected (2005)', 'United Kingdom leaves (2020)', 'Union cannot always speak with one voice'], 'Flow of the EU\'s limits: members keep their own foreign and defence policies, disagree on crises, a draft constitution was rejected in 2005 and the United Kingdom left in 2020, so the Union cannot always speak with one voice', 'Limits of the EU as a political actor');
const vWorked1 = table(
  ['Step', 'What to write'],
  [
    ['1. Read the command', '"Explain the sources of influence": three heads expected'],
    ['2. Economic', 'Large market and the euro'],
    ['3. Political', 'Permanent Security Council seat of one member; joint diplomacy'],
    ['4. Military', 'Large combined forces of members'],
    ['5. Check', 'One clear point under each head, linked to influence'],
  ],
  'Table of steps for a 3-mark answer on the EU\'s influence: read the command, then one point each on economic, political and military influence, then check',
);
const vAseanMembers = table(
  ['Year', 'Joined ASEAN'],
  [
    ['1967', 'Indonesia, Malaysia, the Philippines, Singapore, Thailand (founders)'],
    ['1984', 'Brunei'],
    ['1995', 'Vietnam'],
    ['1997', 'Laos, Myanmar'],
    ['1999', 'Cambodia'],
  ],
  'Table of ASEAN membership: the five founders in 1967, Brunei in 1984, Vietnam in 1995, Laos and Myanmar in 1997, and Cambodia in 1999',
  'Membership as taught for the syllabus (ten members by 1999).',
);
const STEPS = [[1967, 5], [1984, 6], [1995, 7], [1997, 9], [1999, 10]];
if (STEPS[STEPS.length - 1][1] !== 10 || STEPS[0][1] !== 5) throw new Error('ASEAN step check failed');
const vAseanGrowth = (() => {
  const s = new Svg(640, 300);
  const c = s.chart({ x0: 1965, x1: 2002, y0: 0, y1: 12, left: 60, top: 40, width: 520, height: 200, xLabel: 'Year', yLabel: 'Members' });
  const pts = [];
  STEPS.forEach(([yr, n], i) => {
    if (i > 0) pts.push([c.X(yr), c.Y(STEPS[i - 1][1])]);
    pts.push([c.X(yr), c.Y(n)]);
  });
  pts.push([c.X(2002), c.Y(10)]);
  s.polyline(pts, { color: 'accent', sw: 3 });
  STEPS.forEach(([yr, n]) => { c.dot([yr, n], 'accent'); c.label([yr, n], String(n), { dy: -14, size: 12 }); });
  [1967, 1984, 1995, 1999].forEach((yr) => c.xTick(yr, String(yr)));
  [5, 10].forEach((v) => c.yTick(v, String(v)));
  return s.visual('Step chart of ASEAN membership: five in 1967, six in 1984, seven in 1995, nine in 1997 and ten in 1999', 'From five founders to ten members.');
})();
const vStyles = table(
  ['', 'European Union', 'ASEAN'],
  [
    ['How decisions are made', 'Treaties, common laws, supranational bodies', 'Consultation and consensus among governments'],
    ['Currency', 'The euro in most members', 'No common currency'],
    ['Attitude to sovereignty', 'Members pool some powers', 'Strong respect for national sovereignty'],
  ],
  'Comparison table of the EU and ASEAN: the EU decides through treaties, common laws and supranational bodies, uses the euro and pools powers; ASEAN decides by consensus among governments, has no common currency and strongly respects sovereignty',
);
const vPillars = flow('TB', ['ASEAN Community (agreed 2003)', 'Political-security community', 'Economic community', 'Socio-cultural community'], 'Flow of the ASEAN Community agreed in 2003 and its three pillars: political-security, economic and socio-cultural communities', 'Three pillars', [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }]);
const vActEast = flow('LR', ['Look East policy (early 1990s): trade and investment', 'Trade in goods agreement with ASEAN (2009)', 'Act East policy (2014): connectivity, security, wider East Asia', 'Roads and air links from the North-East'], 'Flow from the Look East policy of the early 1990s to the 2009 trade agreement in goods, the Act East policy of 2014, and road and air links from India\'s North-East', 'India and Southeast Asia');
const vWorked2 = table(
  ['Clue in the source', 'What it points to'],
  [
    ['Leaders issue a statement that blames no one', 'Consensus, non-confrontation'],
    ['Very different states stay at peace for decades', 'Respect for sovereignty and quiet diplomacy'],
    ['Therefore', 'The ASEAN Way'],
  ],
  'Table linking clues in a source to the concept: statements that blame no one show consensus, peace among very different states shows respect for sovereignty, so the concept is the ASEAN Way',
);
const vSummary1 = table(
  ['Topic', 'Key points'],
  [
    ['EU: evolution', 'OEEC 1948 → Coal and Steel 1951 → Rome 1957 → Maastricht 1992 → euro 2002'],
    ['EU: actor', 'Economic weight, political voice, members\' forces'],
    ['EU: limits', 'National foreign policies, constitution rejected 2005, UK left 2020'],
    ['ASEAN', '1967 Bangkok; ASEAN Way; three pillars; Regional Forum 1994'],
    ['India', 'Look East (early 1990s) → Act East (2014)'],
  ],
  'Summary table of Part 1: EU evolution from 1948 to the euro, the EU as an economic, political and military actor, its limits, ASEAN\'s founding, style, pillars and forum, and India\'s Look East and Act East policies',
);
const vTips1 = table(
  ['Mistake', 'Correct it'],
  [
    ['"The flag has one star per member"', 'Twelve stars symbolise unity'],
    ['"ASEAN uses a common currency"', 'Only the EU has one (the euro)'],
    ['"Maastricht created the EEC"', 'Rome 1957 created the EEC; Maastricht 1992 the EU'],
  ],
  'Table of common mistakes: the flag\'s stars do not count members, ASEAN has no common currency, and the Treaty of Rome created the EEC while Maastricht created the EU',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['China before 1978', 'Reforms and the open door', 'Costs of growth', 'India and China', 'Japan', 'South Korea'], 'Route map of Part 2: China before 1978, reforms and the open door, costs of growth, India and China, Japan and South Korea', 'Part 2 at a glance');
const vChinaBefore = table(
  ['Feature', 'China before 1978'],
  [
    ['Model', 'Soviet-style planned economy after 1949'],
    ['Farming', 'Collective farms; little incentive for families'],
    ['Industry', 'State-owned, slow to modernise'],
    ['Outside world', 'Little foreign trade or investment'],
  ],
  'Table of China before 1978: a Soviet-style planned economy after 1949, collective farming with little incentive, state-owned industry slow to modernise, and little foreign trade or investment',
);
const vReformPath = flow('LR', ['1978: reforms begin', 'Farmland leased to households', 'Special Economic Zones from 1980', 'Foreign investment and exports', 'WTO membership (2001)'], 'Flow of China\'s reform path: reforms begin in 1978, farmland leased to households, Special Economic Zones from 1980, foreign investment and exports, and WTO membership in 2001', 'Step by step');
const vGradual = table(
  ['', 'China (from 1978)', 'Russia (1990s shock therapy)'],
  [
    ['Speed', 'Gradual, step by step', 'Sudden, all at once'],
    ['Politics', 'One-party system kept', 'Political system changed first'],
    ['Where it started', 'Agriculture and chosen zones', 'Whole economy together'],
  ],
  'Comparison table: China reformed gradually from 1978, kept its one-party system and began with agriculture and chosen zones; Russia\'s shock therapy in the 1990s was sudden, followed political change and covered the whole economy at once',
);
const vCosts = flow('TB', ['Rapid growth', 'Jobs lost as old state firms restructured', 'Polluted air and rivers', 'Coastal–interior and urban–rural gaps', 'Concerns about corruption'], 'Flow from rapid growth to its costs: job losses as state firms restructured, polluted air and rivers, coastal–interior and urban–rural gaps, and concerns about corruption', 'Costs critics point to', [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }, { from: 'n1', to: 'n5' }]);
const vWorked3 = table(
  ['Line in the source', 'Concept'],
  [
    ['A family leases its own plot and sells the surplus', 'Household farming reform'],
    ['A fishing village becomes a zone for foreign factories', 'Open door; Special Economic Zone'],
    ['The river runs grey', 'Environmental cost of growth'],
  ],
  'Table linking lines in a source to concepts: leasing a plot and selling surplus shows household farming, a zone for foreign factories shows the open door, and a grey river shows the environmental cost of growth',
);
const vIndiaChina = timeline(
  [['1954', ['Panchsheel', 'agreed']], ['1962', ['Border', 'war']], ['1976', ['Ambassadors', 'restored']], ['1988', ['Prime Minister\'s', 'visit; talks']], ['2020', ['Clash in the', 'Galwan valley']]],
  'Timeline of India–China relations: 1954 Panchsheel agreed; 1962 border war; 1976 ambassadors restored; 1988 prime-ministerial visit opens boundary talks; 2020 clash in the Galwan valley',
  'Selected events, evenly spaced; the boundary question remains under discussion.',
);
const vCoopConflict = table(
  ['Cooperation', 'Disagreement'],
  [
    ['Large and growing trade', 'Unsettled boundary along the Line of Actual Control'],
    ['Work together in BRICS and climate talks', 'Periods of tension and military standoffs'],
    ['Cultural and educational exchanges', 'Differences over some regional relationships'],
  ],
  'Two-column table of India–China relations: cooperation in trade, in BRICS and climate talks, and in exchanges; disagreement over the unsettled boundary, periods of tension and some regional relationships',
);
const vJapan = table(
  ['Feature', 'Japan'],
  [
    ['After 1945', 'Rebuilt from wartime destruction, including the atomic bombings of Hiroshima and Nagasaki'],
    ['Economy', 'One of the largest and most advanced; strong in technology'],
    ['Groupings', 'Only Asian member of the Group of Seven'],
    ['Security', 'Article 9 renounces war; forces for self-defence'],
    ['World role', 'Major aid giver; long-standing UN contributor; seeks a permanent Security Council seat'],
  ],
  'Table of Japan\'s features: rebuilt after 1945, one of the largest and most advanced economies, the only Asian member of the Group of Seven, Article 9 renouncing war, and a major aid giver and UN contributor seeking a permanent Security Council seat',
);
const vKorea = flow('LR', ['Peninsula divided near the 38th parallel (1945)', 'Korean War (1950–53)', 'Export-led growth from the 1960s', 'Democracy (late 1980s); UN membership (1991)', 'OECD member (1996); technology leader'], 'Flow of South Korea\'s path: division near the 38th parallel in 1945, the Korean War from 1950 to 1953, export-led growth from the 1960s, democracy in the late 1980s and UN membership in 1991, and OECD membership in 1996', 'South Korea\'s rise');
const vJapanKorea = (() => {
  const s = new Svg(640, 250);
  const box = (x, title, lines) => {
    s.rect(x, 20, 280, 210, { fill: 'fill', color: 'muted', sw: 1.5 });
    s.text(x + 140, 46, title, { bold: true, size: 16, color: 'accent' });
    lines.forEach((ln, i) => s.text(x + 140, 82 + i * 30, ln, { size: 13 }));
  };
  box(20, 'Japan', ['Advanced economy since', 'the post-war decades', 'Technology and aid', 'War renounced (Article 9)', 'Asian member of G7']);
  box(340, 'South Korea', ['Rapid growth', 'from the 1960s', 'Ships, steel, electronics', 'Democracy, late 1980s', 'OECD member (1996)']);
  return s.visual('Two side-by-side boxes. Japan: advanced economy since the post-war decades, technology and aid, war renounced by Article 9, Asian member of the G7. South Korea: rapid growth from the 1960s, ships, steel and electronics, democracy in the late 1980s, OECD member from 1996', 'Two paths to influence, both mainly economic.');
})();
const vPartners = table(
  ['Partner', 'Ties with India'],
  [
    ['Japan', 'Loans and technology for metro and rail projects; investment; strategic partnership; Security Council reform group'],
    ['South Korea', 'Comprehensive economic partnership agreement (2010); investment in factories; strategic partnership'],
  ],
  'Table of India\'s ties: with Japan through loans and technology for metro and rail, investment, a strategic partnership and a Security Council reform group; with South Korea through a 2010 economic partnership agreement, investment and a strategic partnership',
);
const vWorked4 = table(
  ['Part of the answer', 'Content (5 marks)'],
  [
    ['Opening', 'Both rose mainly through economic strength'],
    ['Japan (2 points)', 'Advanced economy and technology; aid and UN role, war renounced'],
    ['South Korea (2 points)', 'Export-led growth; democracy, UN and OECD membership'],
    ['Conclusion (1 point)', 'Both are key partners for India and for Asia\'s growth'],
  ],
  'Table planning a 5-mark answer: an opening line, two points on Japan, two on South Korea, and a concluding point on their wider role',
);
const vSummary2 = table(
  ['Topic', 'Key points'],
  [
    ['China\'s rise', '1978 reforms; household farming; SEZs from 1980; WTO 2001; gradual path'],
    ['Costs', 'Jobs, pollution, regional and rural–urban gaps'],
    ['India–China', 'Panchsheel 1954; war 1962; ambassadors 1976; visit 1988; trade grows, boundary unsettled'],
    ['Japan', 'Advanced economy, technology, aid; Article 9; G7'],
    ['South Korea', 'Divided 1945; war 1950–53; export-led growth; democracy; UN 1991; OECD 1996'],
  ],
  'Summary table of Part 2: China\'s reforms and costs, milestones in India–China relations, Japan\'s features and South Korea\'s path',
);
const vTips2 = table(
  ['Mistake', 'Correct it'],
  [
    ['"China reformed by shock therapy"', 'China\'s reforms were gradual'],
    ['"Japan is a permanent member of the Security Council"', 'It seeks a permanent seat'],
    ['"India and China have no cooperation"', 'Trade and forums show cooperation alongside disputes'],
  ],
  'Table of common mistakes: China\'s reforms were gradual, Japan seeks but does not hold a permanent Security Council seat, and India and China cooperate as well as disagree',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Contemporary Centres of Power — Part 1: The European Union and ASEAN',
  goals: [
    'Trace how European cooperation after 1945 grew into the European Union',
    'Explain the EU\'s economic, political and military influence and its limits',
    'Explain the ASEAN Way, the ASEAN Community and the ASEAN Regional Forum',
    'Describe India\'s Look East and Act East policies',
  ],
  slides: [
    sl('title', 'Contemporary Centres of Power', {
      b: 'Part 1 — two regional groupings: the **European Union** and **ASEAN**.',
      v: vRoute1,
      n: 'When the Cold War ended in 1991, one superpower was left standing. Yet power in the world did not sit in one place. Regional groupings and fast-growing economies became centres of influence of their own. In this part we study two such groupings: the European Union, which grew out of a war-torn Europe, and ASEAN, which brought together the states of Southeast Asia.',
    }),
    sl('concept', 'What makes a centre of power?', {
      b: 'After the Cold War, influence comes from **economy, technology and collective voice**, not only armies.',
      v: vCentres,
      n: 'A centre of power is a state or group of states whose decisions shape what others do. Look at the table. The European Union draws strength from its single market and currency. ASEAN gives smaller states a collective voice. China, Japan and South Korea are strong because of their economies and technology. Notice how much of this power is economic rather than military.',
    }),
    sl('diagram', 'Europe after 1945', {
      v: vPostWar,
      n: 'In 1945 much of Europe lay in ruins. The United States offered aid for rebuilding under the Marshall Plan, but asked the Europeans to plan together. The Organisation for European Economic Cooperation, set up in 1948, did that job. The Council of Europe followed in 1949. Step by step, countries that had fought each other learnt to cooperate.',
    }),
    sl('diagram', 'From coal and steel to the Union', {
      v: vEuTimeline,
      n: 'Here is the path in six steps. In 1951 six countries pooled their coal and steel industries, the materials of war. In 1957 the Treaty of Rome created the European Economic Community. After the Cold War, the Maastricht Treaty of 1992 created the European Union. Euro notes and coins came into daily use in 2002, and in 2020 the United Kingdom left, leaving twenty-seven members.',
    }),
    sl('check', 'Quick check: coal and steel', {
      b: 'Which body pooled the coal and steel of six countries in 1951?',
      chk: 'm_ecsc',
      n: 'Think of the earliest of the treaties on the timeline you have just seen.',
    }),
    sl('concept', 'What Maastricht changed', {
      b: 'The **Maastricht Treaty (1992)** turned an economic community into a **union** with political aims.',
      v: vMaastricht,
      n: 'Maastricht did more than deepen the market. It set the path to a common currency, set the aim of a common foreign and security policy, brought cooperation on police and justice, and created citizenship of the Union alongside national citizenship. That is why we say the EU became more than an economic association.',
    }),
    sl('diagram', 'Symbols of a union', {
      b: 'A **flag**, an **anthem**, a founding day and a **currency**.',
      v: vFlag,
      n: 'States have symbols, and so does the European Union: a flag, an anthem and a currency, the euro. The flag shows twelve gold stars in a circle on a blue field. The number twelve stands for completeness and unity, and it has not changed as countries joined or left. Symbols like these show the ambition to be a political community.',
    }),
    sl('check', 'Quick check: the stars on the flag', {
      b: 'What do the twelve stars on the EU flag stand for?',
      chk: 'm_eu_flag',
      n: 'Remember that the EU has had many more than twelve members at times.',
    }),
    sl('two-column', 'The EU as an actor', {
      cols: [
        '**Economic and political**\n\n- One of the largest economies\n- The euro\n- One member with a permanent Security Council seat',
        '**Military and diplomatic**\n\n- Large combined forces of members\n- Joint positions in trade and climate talks',
      ],
      v: vActor,
      n: 'The EU influences the world in three ways. Economically, it is one of the largest markets, and countries that wish to sell there must meet its standards. Politically, France holds a permanent seat in the Security Council, and the EU often negotiates as one voice. Militarily, its members together keep large armed forces, though defence remains mostly national.',
    }),
    sl('diagram', 'Limits of the EU', {
      v: vLimits,
      n: 'The EU also has limits. Members keep their own foreign and defence policies and sometimes disagree sharply. In 2005 voters in France and the Netherlands rejected a proposed constitution. Some members chose not to adopt the euro, and the United Kingdom left the Union in 2020. So the EU cannot always speak with one voice in world politics.',
    }),
    sl('example', 'Worked example 1: a 3-mark answer on influence', {
      b: 'Question: *Explain the economic, political and military sources of the EU\'s influence.*',
      bl: [
        'Step 1 — Three heads are named, so plan **one point per head**.',
        'Step 2 — Economic: size of market, the **euro**.',
        'Step 3 — Political: **France\'s permanent seat**, joint diplomacy.',
        'Step 4 — Military: **combined forces** of members.',
      ],
      v: vWorked1,
      n: 'When a question names three heads, give exactly one clear point under each. Start with the economy: a very large market and a major currency. Then politics: a member with a permanent seat in the Security Council, and joint positions in negotiations. Then the military: the combined forces of the members. Finish by checking that each point says how it gives influence.',
    }),
    sl('check', 'Quick check: a federal country?', {
      b: 'True or false: Maastricht turned the member states into one federal country.',
      chk: 'tf_eu_federal',
      n: 'Ask yourself who still decides foreign and defence policy.',
    }),
    sl('concept', 'The making of ASEAN', {
      b: 'Founded on **8 August 1967** by the **Bangkok Declaration**.',
      v: vAseanMembers,
      n: 'In 1967, five Southeast Asian countries, Indonesia, Malaysia, the Philippines, Singapore and Thailand, signed a declaration in Bangkok and founded ASEAN. The region had seen colonial rule, wars and Cold War rivalries. The founders wanted peace, economic growth and cooperation. Over the next three decades five more countries joined.',
    }),
    sl('diagram', 'ASEAN grows', {
      v: vAseanGrowth,
      n: 'This step chart shows the growth in membership. Brunei joined in 1984, Vietnam in 1995, Laos and Myanmar in 1997, and Cambodia in 1999. By then ASEAN had ten members, from small, rich trading states to large, mainly farming countries.',
    }),
    sl('two-column', 'The ASEAN Way', {
      cols: [
        '**ASEAN Way**\n\n- Informal and cooperative\n- Consensus, no confrontation\n- Respect for sovereignty',
        '**Contrast with the EU**\n\n- No supranational bodies\n- No common currency',
      ],
      v: vStyles,
      n: 'ASEAN works in its own style, called the ASEAN Way. Meetings are informal, decisions are taken by consensus, and members avoid open confrontation and do not interfere in one another\'s internal affairs. Compare this with the EU, which has common laws, a parliament and a currency. ASEAN keeps decisions with national governments.',
    }),
    sl('diagram', 'The ASEAN Community and the Regional Forum', {
      b: 'Three pillars agreed in **2003**; the **ASEAN Regional Forum** (1994) for security dialogue.',
      v: vPillars,
      n: 'In 2003 the members agreed to build an ASEAN Community on three pillars: political and security cooperation, an economic community with a common market and production base, and a socio-cultural community. Earlier, in 1994, they set up the ASEAN Regional Forum, where ASEAN meets other countries, including major powers, to discuss security.',
    }),
    sl('concept', 'India looks and acts east', {
      b: 'India is **not a member** of ASEAN but a close **partner**.',
      v: vActEast,
      n: 'After its own economic reforms, India adopted a Look East policy in the early 1990s to build trade and investment ties with Southeast Asia. A trade agreement in goods with ASEAN was signed in 2009. In 2014 the policy was renamed Act East, adding connectivity, security cooperation and the wider East Asian region, with special attention to India\'s North-East.',
    }),
    sl('example', 'Worked example 2: spotting the ASEAN Way in a source', {
      b: 'A source says leaders issued a statement that "offends no one" and that very different states have stayed at peace for decades.',
      bl: [
        'Step 1 — Underline the clues: **blames no one**, **quiet talk**, **peace among different states**.',
        'Step 2 — Match clues to features: consensus, non-confrontation, respect for sovereignty.',
        'Step 3 — Name the concept: the **ASEAN Way**, and quote one line as evidence.',
      ],
      v: vWorked2,
      n: 'Source questions reward careful reading. First underline the clues. A statement that blames no one points to consensus and non-confrontation. Peace among very different states points to quiet diplomacy and respect for sovereignty. Put the clues together and name the concept, the ASEAN Way, then quote a short phrase from the source as your evidence.',
    }),
    sl('check', 'Quick check: three pillars', {
      b: 'Which list gives the three pillars of the ASEAN Community?',
      chk: 'm_asean_pillars',
      n: 'One pillar is about security, one about the economy, and one about society and culture.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. European cooperation began with Marshall aid in 1948 and grew through the coal and steel community, the Treaty of Rome and the Maastricht Treaty into the European Union, with the euro from 2002. The EU is a strong economic actor with real but limited political unity. ASEAN, founded in 1967, works through the ASEAN Way, and India engages it through its Act East policy.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Learn the EU sequence with dates: **1948, 1951, 1957, 1992, 2002**.',
        'Contrast the EU (supranational, euro) with ASEAN (consensus, sovereignty).',
        'For source items, **quote** the line, then **name** the concept.',
        'Stay neutral: describe limits and criticisms as "critics argue", not as your own verdict.',
      ],
      v: vTips1,
      n: 'Some tips for the exam. Learn the European dates in order. When asked to compare the EU and ASEAN, contrast supranational institutions and the euro with consensus and sovereignty. In source questions, quote a short line and then name the concept. And keep your tone neutral when you write about the limits of any organisation.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Contemporary Centres of Power — Part 2: China, Japan and South Korea',
  goals: [
    'Explain how China rose as an economic power after 1978 and the costs of its growth',
    'Summarise India–China relations, showing both cooperation and disagreement',
    'Explain the economic and political significance of Japan and South Korea',
    'Describe India\'s partnerships with Japan and South Korea',
  ],
  slides: [
    sl('title', 'China, Japan and South Korea', {
      b: 'Part 2 — three Asian economies that became **centres of power**.',
      v: vRoute2,
      n: 'In this part we move to East Asia. China, which began reforming its economy in 1978, became one of the world\'s great economic powers. Japan rebuilt itself after 1945 into an advanced economy. South Korea rose from war and poverty to become an industrial and technological leader. We also look at India\'s relations with all three.',
    }),
    sl('concept', 'China before 1978', {
      b: 'After **1949**, the People\'s Republic followed a **Soviet-style** planned economy.',
      v: vChinaBefore,
      n: 'After the People\'s Republic of China was founded in 1949, it followed a planned economy on the Soviet model. Farms were collective, industry was owned by the state, and the country had little trade with the outside world. Growth was slow, and many people remained poor. By the late nineteen seventies, China\'s leaders decided to change course.',
    }),
    sl('diagram', 'The reform path', {
      v: vReformPath,
      n: 'Reforms began in 1978 with the open door policy. Farmland was leased to families, who could sell what they grew beyond a fixed delivery to the state, so output and rural incomes rose. From 1980 Special Economic Zones invited foreign firms with easier rules. Investment, technology and exports followed, and in 2001 China joined the World Trade Organisation.',
    }),
    sl('check', 'Quick check: Special Economic Zones', {
      b: 'Why did China set up Special Economic Zones?',
      chk: 'm_china_sez',
      n: 'Think about what foreign companies brought with them to these zones.',
    }),
    sl('two-column', 'Gradual reform, not shock therapy', {
      cols: [
        '**China**\n\n- Step by step\n- One-party system kept\n- Began with farms and zones',
        '**Russia in the 1990s**\n\n- Sudden switch\n- Political change came first\n- Whole economy at once',
      ],
      v: vGradual,
      n: 'Compare China\'s path with Russia\'s shock therapy in the 1990s. Russia tried to change the whole economy at once, after its political system had already changed. China moved step by step, beginning with agriculture and a few zones, and kept its one-party political system. This gradual path is a key point in exam answers.',
    }),
    sl('diagram', 'Costs of rapid growth', {
      v: vCosts,
      n: 'Rapid growth also had costs, and critics point to several. Restructuring of old state firms cost many people their jobs. Air and rivers in industrial areas became polluted. Gaps widened between rich coastal regions and poorer interior ones, and between towns and villages. Corruption has also been a concern. A balanced answer mentions these costs alongside the gains.',
    }),
    sl('example', 'Worked example 1: reading a source on China\'s reforms', {
      b: 'A source describes a farmer leasing a plot, a fishing village turned into a zone for foreign factories, and a river that "runs grey".',
      bl: [
        'Step 1 — Match each line to a concept.',
        'Step 2 — Leased plot and surplus sold: **household farming**.',
        'Step 3 — Village turned into a zone: **open door, SEZ**.',
        'Step 4 — Grey river: an **environmental cost**.',
      ],
      v: vWorked3,
      n: 'Let us read a source the way an examiner expects. Take each line in turn and match it to a concept from the chapter. A family leasing land and selling its surplus shows household farming. A village turned into a zone for foreign factories shows the open door and Special Economic Zones. A polluted river shows an environmental cost of growth.',
    }),
    sl('diagram', 'India and China: key moments', {
      v: vIndiaChina,
      n: 'India and China agreed on Panchsheel, the five principles of peaceful coexistence, in 1954. The border war of 1962 set relations back for years. Ambassadors were restored in 1976, and a prime-ministerial visit in 1988 opened the way to talks on the boundary. Tension has returned at times, for example after a clash in the Galwan valley in 2020.',
    }),
    sl('check', 'Quick check: Panchsheel', {
      b: 'In which year did India and China agree on Panchsheel?',
      chk: 'm_panchsheel',
      n: 'It came before the border war, in the early years of the relationship.',
    }),
    sl('two-column', 'Cooperation and disagreement', {
      cols: [
        '**Cooperation**\n\n- Large trade\n- BRICS and climate talks\n- Exchanges',
        '**Disagreement**\n\n- Unsettled boundary\n- Periods of tension',
      ],
      v: vCoopConflict,
      n: 'The relationship today has two sides. China has become one of India\'s largest trading partners, and the two work together in groups such as BRICS and in climate negotiations. At the same time the boundary has not been finally settled, and there have been periods of tension. Exam answers should present both sides in neutral language.',
    }),
    sl('concept', 'Japan', {
      b: 'Influence built on **economy, technology and aid**.',
      v: vJapan,
      n: 'Japan was devastated in 1945, including by the atomic bombings of Hiroshima and Nagasaki. It rebuilt itself into one of the world\'s most advanced economies, famous for technology. It is the only Asian member of the Group of Seven. Its constitution renounces war, so its influence rests mainly on its economy, its aid and its long-standing support for the United Nations.',
    }),
    sl('check', 'Quick check: Japan\'s group', {
      b: 'Japan is the only Asian member of which group?',
      chk: 'm_japan_g7',
      n: 'It is a small group of major industrialised democracies.',
    }),
    sl('diagram', 'South Korea', {
      v: vKorea,
      n: 'At the end of the Second World War, Korea was divided near the thirty-eighth parallel. War between the two Korean states followed from 1950 to 1953. South Korea was then among the poorest countries in Asia. From the 1960s it grew rapidly through exports of steel, ships, electronics and cars. It became a democracy in the late 1980s, joined the United Nations in 1991 and the OECD in 1996.',
    }),
    sl('diagram', 'Two paths, one pattern', {
      v: vJapanKorea,
      n: 'Put the two side by side. Japan became an advanced economy in the decades after the war, and spreads influence through technology and aid. South Korea rose later, from the 1960s, through export industries, and became a democracy. Both became powers mainly through economic strength rather than military expansion.',
    }),
    sl('concept', 'Partners for India', {
      b: 'Investment, technology, trade and **strategic partnerships**.',
      v: vPartners,
      n: 'Both countries are important partners for India. Japanese loans and technology have helped build metro and rail projects, and Japanese firms invest in Indian factories. India and South Korea have had a comprehensive economic partnership agreement since 2010, and Korean firms also invest in India. India has strategic partnerships with both.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark comparison', {
      b: 'Question: *Why are Japan and South Korea regarded as emerging centres of power?*',
      bl: [
        'Step 1 — Opening line: both rose mainly through **economic** strength.',
        'Step 2 — Two points on **Japan**; two on **South Korea**.',
        'Step 3 — One concluding point on their wider role.',
        'Step 4 — Keep to about 100 words; use dates only where sure.',
      ],
      v: vWorked4,
      n: 'For a five-mark question, plan five points. Open with the common idea, that both rose through economic strength. Give two points on Japan, such as its advanced technology and its aid and United Nations role. Give two on South Korea, such as export-led growth and its democratic transition. End with their importance for India and Asia.',
    }),
    sl('check', 'Quick check: the dividing line', {
      b: 'Along which line was Korea divided after the Second World War?',
      chk: 'm_korea_divide',
      n: 'It is a line of latitude, and a different line once divided Vietnam.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. China reformed gradually from 1978, with household farming, Special Economic Zones and later WTO membership, becoming an economic power at some social and environmental cost. India and China combine trade and cooperation with an unsettled boundary. Japan and South Korea became powers mainly through economy and technology, and both are close partners of India.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Use the right word for China\'s path: **gradual** reform, not shock therapy.',
        'India–China answers need **both** cooperation and disagreement, in neutral words.',
        'Japan **seeks** a permanent Security Council seat; it does not hold one.',
        'In source items, quote a short phrase and name the concept.',
      ],
      v: vTips2,
      n: 'A few final tips. Describe China\'s reforms as gradual. When writing on India and China, give both cooperation and disagreement and use neutral words. Remember that Japan seeks, but does not hold, a permanent seat in the Security Council. And in source questions, always quote a short phrase before you name the concept.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Contemporary Centres of Power — notes',
  sections: [
    {
      h: '1. Europe after 1945 and the making of the EU',
      t: 1,
      b: '**Why cooperate?** Wartime ruin, the wish to rule out another war among neighbours, and the Cold War.\n\n**Milestones**\n- **1948:** Marshall Plan aid handled by the **OEEC**.\n- **1949:** Council of Europe.\n- **1951:** **European Coal and Steel Community** of six states.\n- **1957:** **Treaty of Rome** creates the European Economic Community (and Euratom).\n- **1992:** **Maastricht Treaty** creates the **European Union** (in force 1993).\n- **1999 / 2002:** the **euro** as an accounting currency, then notes and coins.\n- **2020:** the United Kingdom leaves on 31 January; 27 members remain.',
      terms: [
        ['OEEC', 'Organisation for European Economic Cooperation (1948), set up to manage Marshall Plan aid jointly.'],
        ['Treaty of Rome', 'The 1957 treaty that created the European Economic Community.'],
        ['Maastricht Treaty', 'The 1992 treaty that founded the European Union.'],
      ],
      v: vEuTimeline,
      vs: [vPostWar],
    },
    {
      h: '2. The EU as an actor, and its limits',
      t: 1,
      b: '**More than a trade bloc:** a flag (twelve stars for unity), an anthem, a currency, citizenship of the Union, and the aim of a common foreign and security policy.\n\n**Influence**\n- *Economic:* a very large single market; the euro; its standards shape trade with partners.\n- *Political:* France sits permanently on the UN Security Council; the EU often negotiates jointly, as in climate talks.\n- *Military:* member states together keep large forces.\n\n**Limits:** national foreign and defence policies remain; members can disagree on crises; a draft constitution failed in 2005 after referendums in France and the Netherlands; some members (such as Denmark and Sweden) keep their own currencies; the UK left in 2020.',
      terms: [
        ['Supranational', 'Having authority above that of member states in agreed areas, as some EU bodies do.'],
        ['Euro', 'The common currency used by most EU members, in notes and coins since 2002.'],
      ],
      v: vActor,
      vs: [vFlag, vLimits],
    },
    {
      h: '3. ASEAN',
      t: 2,
      b: '**Founded:** 8 August 1967, Bangkok Declaration, by Indonesia, Malaysia, the Philippines, Singapore and Thailand. Later: Brunei 1984, Vietnam 1995, Laos and Myanmar 1997, Cambodia 1999.\n\n**ASEAN Way:** informal and cooperative interaction, consensus, avoidance of confrontation, non-interference and respect for sovereignty.\n\n**Institutions and aims:** ASEAN Free Trade Area (1992); the **ASEAN Regional Forum** (1994) for security dialogue with outside powers; in 2003 members agreed on an **ASEAN Community** with three pillars — political-security, economic and socio-cultural.\n\n**India:** Look East policy (early 1990s) → trade in goods agreement (2009) → **Act East** (2014), stressing connectivity with the North-East.',
      terms: [
        ['ASEAN Way', 'ASEAN\'s informal, consensus-based and non-confrontational style that respects sovereignty.'],
        ['ASEAN Regional Forum', 'A body set up in 1994 for dialogue on regional security between ASEAN and other countries.'],
        ['Act East policy', 'India\'s policy, from 2014, of deeper economic, strategic and connectivity ties with East and Southeast Asia.'],
      ],
      v: vAseanGrowth,
      vs: [vStyles, vPillars, vActEast],
    },
    {
      h: '4. The rise of China',
      t: 3,
      b: '**Before 1978:** Soviet-style planning after 1949; collective farms; state industry; little foreign trade.\n\n**Reforms from 1978 (open door):**\n- Farmland leased to households; surplus sold after the state quota.\n- **Special Economic Zones** from 1980 attracted foreign investment and technology.\n- Export-led industrial growth; later restructuring of state firms.\n- **WTO** membership in **2001**.\n\n**Gradual path:** unlike Russia\'s shock therapy, China moved in stages and kept its one-party system.\n\n**Costs often cited:** job losses in restructured firms, pollution, coastal–interior and rural–urban inequality, corruption.',
      terms: [
        ['Open door policy', 'China\'s post-1978 opening to foreign trade, investment and technology.'],
        ['Special Economic Zone', 'An area with special tax and trade rules to attract foreign investment.'],
      ],
      v: vReformPath,
      vs: [vGradual, vCosts],
    },
    {
      h: '5. India–China relations',
      t: 3,
      b: '- **1954:** Panchsheel, the five principles of peaceful coexistence.\n- **1962:** border war; relations set back.\n- **1976:** ambassador-level relations restored.\n- **1988:** a prime-ministerial visit opens a phase of boundary talks and confidence-building.\n- **Since then:** trade has grown very large; both work together in BRICS and climate negotiations.\n- **Disagreements:** the boundary along the Line of Actual Control is not finally settled; tensions have flared, as in the Galwan valley clash of June 2020, followed by rounds of talks.\n\nWrite about this relationship in neutral terms: describe each side\'s position and the facts, not blame.',
      terms: [
        ['Panchsheel', 'Five principles of peaceful coexistence agreed by India and China in 1954.'],
        ['Line of Actual Control', 'The line separating areas under Indian and Chinese control along the disputed boundary.'],
      ],
      v: vIndiaChina,
      vs: [vCoopConflict],
    },
    {
      h: '6. Japan and South Korea',
      t: 4,
      b: '**Japan:** rebuilt after 1945 (Hiroshima and Nagasaki were destroyed by atomic bombs); one of the most advanced economies, strong in technology; the only Asian member of the G7; Article 9 of its constitution renounces war; a major aid giver and long-standing UN contributor; seeks a permanent Security Council seat with India, Germany and Brazil (the G4).\n\n**South Korea:** Korea divided near the 38th parallel in 1945; Korean War 1950–53; rapid export-led growth from the 1960s; democratic transition in the late 1980s; both Koreas joined the UN in 1991; OECD member from 1996.\n\n**India\'s ties:** Japanese finance and technology for metro and rail, investment and a strategic partnership; with South Korea, a comprehensive economic partnership agreement (2010) and a strategic partnership.',
      terms: [
        ['Article 9', 'The clause of Japan\'s constitution renouncing war as a means of settling disputes.'],
        ['G4', 'Brazil, Germany, India and Japan, which support one another\'s bids for permanent Security Council seats.'],
      ],
      v: vJapanKorea,
      vs: [vJapan, vKorea, vPartners],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up treaties: Rome (1957) created the EEC; Maastricht (1992) created the EU.\n- Saying ASEAN has a common currency or a supranational parliament.\n- Calling China\'s reforms "shock therapy".\n- Writing that Japan holds a permanent Security Council seat.\n- Giving only conflict, or only cooperation, in India–China answers.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, or a single identification in a source item.\n- 2 marks: two points (about 30–50 words).\n- 3 marks: three distinct points (about 50–80 words).\n- 5 marks: five points (about 80–120 words); "assess" questions need both sides and a conclusion.\n- Source items: quote a phrase, then name and explain the concept.\n\n**Tone:** use neutral, factual language about every country and dispute.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Year of the **European Coal and Steel Community**', '**1951**, six states.', 'fact', 1],
  ['What created the **EEC**?', 'The **Treaty of Rome**, 1957.', 'fact', 1],
  ['What created the **European Union**?', 'The **Maastricht Treaty**, 1992.', 'fact', 1],
  ['Body that managed **Marshall Plan** aid', 'The **OEEC** (1948).', 'fact', 1],
  ['Euro notes and coins began in…', '**2002** (accounting currency from 1999).', 'fact', 1],
  ['The twelve stars on the EU flag mean…', '**Unity and completeness**, not the number of members.', 'concept', 1],
  ['Three kinds of EU influence', 'Economic (market, euro), political (joint voice, France\'s Security Council seat), military (members\' forces).', 'concept', 1],
  ['Two limits of the EU', 'National foreign and defence policies; constitution rejected 2005; UK left 2020.', 'concept', 1],
  ['When did the UK leave the EU?', '**31 January 2020**, after a 2016 referendum.', 'fact', 1],
  ['ASEAN founded', '**8 August 1967**, **Bangkok** Declaration.', 'fact', 2],
  ['Five founders of ASEAN', 'Indonesia, Malaysia, the Philippines, Singapore, Thailand.', 'fact', 2],
  ['**ASEAN Way**', 'Informal, consensus-based, non-confrontational; respects sovereignty.', 'definition', 2],
  ['**ASEAN Regional Forum**', 'Set up **1994** for security dialogue with outside countries.', 'definition', 2],
  ['Three pillars of the ASEAN Community', 'Political-security, economic, socio-cultural (agreed 2003).', 'concept', 2],
  ['Look East → Act East', 'Early 1990s → **2014**; adds connectivity and security, links the North-East.', 'fact', 2],
  ['India–ASEAN trade in goods agreement', 'Signed **2009**.', 'fact', 2],
  ['EU vs ASEAN in one line', 'EU pools sovereignty and has the euro; ASEAN keeps sovereignty and works by consensus.', 'exam-tip', 2],
  ['China\'s reforms began in…', '**1978** (open door).', 'fact', 3],
  ['Special Economic Zones', 'From **1980**; easier rules to attract foreign investment and technology.', 'definition', 3],
  ['China joined the WTO', '**2001**.', 'fact', 3],
  ['China vs Russia\'s path', 'China: **gradual**, one-party system kept. Russia: **shock therapy**.', 'concept', 3],
  ['Costs of China\'s growth', 'Job losses, pollution, regional and rural–urban gaps, corruption.', 'concept', 3],
  ['**Panchsheel**', 'Five principles of peaceful coexistence, India–China, **1954**.', 'definition', 3],
  ['India–China milestones', '1962 war; 1976 ambassadors; 1988 visit; 2020 Galwan clash.', 'fact', 3],
  ['India–China: cooperation', 'Large trade; BRICS; climate talks.', 'concept', 3],
  ['Japan in the G7', 'The **only Asian** member.', 'fact', 4],
  ['Article 9 of Japan\'s constitution', 'Renounces war; forces for self-defence.', 'fact', 4],
  ['Korea divided along…', 'The **38th parallel** (1945); war **1950–53**.', 'fact', 4],
  ['Both Koreas joined the UN in…', '**1991**.', 'fact', 4],
  ['South Korea\'s rise in brief', 'Export-led growth from the 1960s; democracy late 1980s; OECD 1996.', 'concept', 4],
  ['India and South Korea trade pact', 'Comprehensive economic partnership agreement, **2010**.', 'fact', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Contemporary Centres of Power',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_maastricht', 'm_asean_way', 'm_china_wto', 'ar_asean_way'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_eu_post_war', 's_china_reforms', 's3_asean_community'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_eu_evolution', 'l_china_rise'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_china_report'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Contemporary Centres of Power',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_marshall', 'm_eu_limit', 'm_asean_founders', 'm_act_east', 'm_china_shock', 'm_india_china_since', 'm_japan_constitution', 'm_korea_miracle', 'ar_china_growth', 'ar_japan_military'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_asean_way', 's_japan_power', { attempt: 1, keys: ['s_india_china_coop', 's_korea_rise'] }, 's3_eu_influence', { attempt: 1, keys: ['s3_china_costs', 's3_japan_korea_india'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_india_china', { attempt: 1, keys: ['l_asean_role', 'l_japan_korea'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_brussels_diary', 'sb_mun_debate'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-political-science-ch02 only (European Union; ASEAN; rise of China and India–China relations; Japan and South Korea)',
    originality: 'every source (a student\'s diary, an editorial, a think-tank report, Model UN minutes, an exporter\'s notes) is written by SOYL and labelled as imagined; no NCERT text, cartoon or board/sample-paper item reused (D-036)',
    facts: 'stable dates only: OEEC 1948, Council of Europe 1949, ECSC 1951, Rome 1957, Maastricht 1992, euro 1999/2002, constitution rejected 2005, UK left 31 January 2020; ASEAN 1967 and later members to 1999, AFTA 1992, ARF 1994, three pillars 2003, India–ASEAN goods agreement 2009, Act East 2014; China reforms 1978, SEZs 1980, WTO 2001; Panchsheel 1954, war 1962, ambassadors 1976, visit 1988, Galwan clash 2020; Hiroshima and Nagasaki 1945, Article 9, G7; Korea divided 1945, war 1950–53, UN 1991, OECD 1996, India–Korea CEPA 2010; nothing after 2024; no statistics',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
