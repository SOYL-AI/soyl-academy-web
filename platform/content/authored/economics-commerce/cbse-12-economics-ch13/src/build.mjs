// Build CBSE 12 Economics ch13 Comparative Development Experiences of India and its Neighbours.
// Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch13/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch13', 'economics-commerce');
const { inr } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (computed, never typed)
// Worked example 1: per capita income growth of two imagined countries.
const WE1 = { P: { g: 6, p: 2.5 }, Q: { g: 5, p: 1 } };
const WE1_P = WE1.P.g - WE1.P.p; // 3.5
const WE1_Q = WE1.Q.g - WE1.Q.p; // 4
// Worked example 3: dual pricing in an imagined reform-era factory (price units per tonne).
const WE3 = { quota: 1000, fixed: 20, extra: 400, market: 30 };
const WE3_QUOTA_REV = WE3.quota * WE3.fixed; // 20,000
const WE3_EXTRA_REV = WE3.extra * WE3.market; // 12,000
const WE3_TOTAL = WE3_QUOTA_REV + WE3_EXTRA_REV; // 32,000
const WE3_ALL_FIXED = (WE3.quota + WE3.extra) * WE3.fixed; // 28,000
const WE3_GAIN = WE3_TOTAL - WE3_ALL_FIXED; // 4,000
// Ageing figure: an imagined country's age structure, 40 years apart (per cent of population).
const AGE = { before: { young: 35, old: 8 }, after: { young: 17, old: 22 } };
if (WE1_P !== 3.5 || WE1_Q !== 4 || WE3_QUOTA_REV !== 20000 || WE3_EXTRA_REV !== 12000 || WE3_TOTAL !== 32000 || WE3_ALL_FIXED !== 28000 || WE3_GAIN !== 4000)
  throw new Error('ch13 deck figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Why compare neighbours', 'Similar starting points', 'Pakistan\'s path', 'China before 1978'], 'Route map of Part 1: why compare neighbours, similar starting points, Pakistan\'s path and China before 1978', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['China\'s reforms from 1978', 'Population', 'Output and sectors', 'Human development', 'Appraisal'], 'Route map of Part 2: China\'s reforms from 1978, population, output and sectors, human development, and an appraisal', 'Part 2 at a glance');
const vStart = table(
  ['', 'India', 'Pakistan', 'China'],
  [
    ['Became a new nation', '1947 (independence)', '1947 (independence)', '1949 (People\'s Republic)'],
    ['First five-year plan announced', '1951', '1956', '1953'],
    ['Economy around 1950', 'Poor, mainly agricultural', 'Poor, mainly agricultural', 'Poor, mainly agricultural'],
    ['Major reforms began', '1991', '1988', '1978'],
  ],
  'Table comparing the three neighbours: India and Pakistan became independent in 1947 and China became the People\'s Republic in 1949; first plans announced in 1951, 1956 and 1953; all poor and mainly agricultural around 1950; major reforms began in 1991, 1988 and 1978',
  'Similar starting points, different paths.',
);
const vTimeline = (() => {
  const s = new Svg(620, 250);
  const x0 = 60, x1 = 590, a = 1945, b = 1995;
  const X = (y) => x0 + ((y - a) / (b - a)) * (x1 - x0);
  const lanes = [['India', 60, [[1947, 'Independence'], [1951, 'First plan'], [1991, 'Reforms']]], ['Pakistan', 125, [[1947, 'Independence'], [1956, 'First plan'], [1988, 'Reforms']]], ['China', 190, [[1949, 'PRC'], [1953, 'Plan'], [1958, 'GLF'], [1978, 'Reforms']]]];
  for (const [name, y, ev] of lanes) {
    s.text(8, y, name, { anchor: 'start', size: 13, bold: true });
    s.line(x0, y, x1, y, { sw: 1.5, color: 'muted' });
    ev.forEach(([yr, lab], i) => {
      s.dot(X(yr), y, 5, 'accent');
      s.text(X(yr), y - 14, `${yr}`, { size: 11, bold: true });
      // Alternate label rows so that neighbouring events (1947 and 1951) never overlap.
      s.text(X(yr), y + 16 + (i % 2) * 14, lab, { size: 11 });
    });
  }
  // Cultural Revolution band on the China lane.
  s.rect(X(1966), 178, X(1976) - X(1966), 24, { fill: 'fill', color: 'accent', sw: 1, rx: 3 });
  s.text((X(1966) + X(1976)) / 2, 190, 'CR 1966–76', { size: 10 });
  for (const yr of [1950, 1960, 1970, 1980, 1990]) s.text(X(yr), 238, `${yr}`, { size: 11, muted: true });
  return s.visual('Timeline with three lanes from 1945 to 1995: India independence 1947, first plan 1951, reforms 1991; Pakistan independence 1947, first plan 1956, reforms 1988; China People\'s Republic 1949, first plan 1953, Great Leap Forward 1958, Cultural Revolution 1966 to 1976, reforms 1978', 'GLF = Great Leap Forward; CR = Cultural Revolution; PRC = People\'s Republic of China.');
})();
const vPakPhases = flow('TB', ['Mixed economy after 1947', 'Import substitution behind tariffs (late 1950s–1960s)', 'Green Revolution in farming (1960s)', 'Nationalisation of capital goods industries (1970s)', 'Shift to the private sector (late 1970s–1980s)', 'Reforms begin (1988)'], 'Flow of Pakistan\'s strategy: mixed economy after 1947, import substitution behind tariffs in the late 1950s and 1960s, the Green Revolution, nationalisation of capital goods industries in the 1970s, a shift to the private sector, and reforms from 1988', 'Pakistan\'s path in six steps');
const vPakSources = table(
  ['Source of foreign exchange', 'Why it is uncertain'],
  [
    ['Remittances from workers abroad (many in West Asia)', 'Depend on jobs in other countries'],
    ['Loans and aid from other countries', 'Depend on donors\' decisions and conditions'],
    ['Exports of mainly primary and simple goods', 'Low value, and prices swing'],
  ],
  'Table of Pakistan\'s main sources of foreign exchange and why each is uncertain: remittances depend on jobs abroad, loans and aid on donors, and exports of simple goods on swinging prices',
);
const vWE1 = table(
  ['Imagined country', 'GDP growth (per cent a year)', 'Population growth (per cent a year)', 'Per capita growth (approx.)'],
  [
    ['P', `${WE1.P.g}`, `${WE1.P.p}`, `${WE1.P.g} − ${WE1.P.p} = ${WE1_P}`],
    ['Q', `${WE1.Q.g}`, `${WE1.Q.p}`, `${WE1.Q.g} − ${WE1.Q.p} = ${WE1_Q}`],
  ],
  `Table of two imagined countries: P grows at ${WE1.P.g} per cent with population growth ${WE1.P.p}, so per capita income grows about ${WE1_P} per cent; Q grows at ${WE1.Q.g} per cent with population growth ${WE1.Q.p}, so per capita income grows about ${WE1_Q} per cent`,
  'Imagined figures: the slower-growing economy improves living standards faster.',
);
const vUneven = flow('LR', ['Weather-dependent farm output', 'Remittances and aid from abroad', 'Narrow export base', 'Political instability', 'Uneven growth'], 'Flow of causes of uneven growth in Pakistan: weather-dependent farm output, remittances and aid from abroad, a narrow export base and political instability', 'Why growth was hard to sustain', [
  { from: 'n1', to: 'n5' }, { from: 'n2', to: 'n5' }, { from: 'n3', to: 'n5' }, { from: 'n4', to: 'n5' },
]);
const vChinaPre = flow('LR', ['1949: People\'s Republic', '1953: first plan', '1958: Great Leap Forward and communes', '1966–76: Cultural Revolution', '1978: reforms'], 'Flow of China\'s path before reform: People\'s Republic 1949, first plan 1953, Great Leap Forward and communes 1958, Cultural Revolution 1966 to 1976, and reforms from 1978', 'China before 1978');
const vCommune = table(
  ['Feature', 'Commune system'],
  [
    ['Who farmed', 'Teams of villagers farming land collectively'],
    ['How output was shared', 'By the collective, according to work done'],
    ['Aim', 'Pool labour and land for faster growth'],
    ['Weakness', 'Little extra reward for extra effort'],
  ],
  'Table of the commune system: villagers farmed land collectively in teams, output was shared by the collective, the aim was to pool labour and land, and the weakness was little extra reward for extra effort',
);
const vSetbacks = flow('TB', ['Great Leap Forward (1958): mass industrialisation', 'Severe famine and the withdrawal of Soviet experts', 'Cultural Revolution (1966–76): students and professionals sent to the countryside', 'Growth uneven; reforms from 1978'], 'Flow: the Great Leap Forward of 1958 aimed at mass industrialisation, met a severe famine and the withdrawal of Soviet experts, then the Cultural Revolution of 1966 to 1976, and finally reforms from 1978', 'Setbacks before reform');
const vWE2 = table(
  ['Event', 'Country', 'Year or period'],
  [
    ['First five-year plan announced', 'China', '1953'],
    ['First five-year plan announced', 'Pakistan', '1956'],
    ['Great Leap Forward', 'China', '1958'],
    ['Nationalisation of capital goods industries', 'Pakistan', '1970s'],
    ['Cultural Revolution', 'China', '1966–76'],
    ['Reforms begin', 'China, Pakistan, India', '1978, 1988, 1991'],
  ],
  'Table placing events in order with country and year: China first plan 1953, Pakistan first plan 1956, Great Leap Forward 1958, Cultural Revolution 1966 to 1976, Pakistan nationalisation in the 1970s, reforms in China 1978, Pakistan 1988 and India 1991',
  'Tip: memorise the three reform years as 78, 88, 91.',
);
const vSum1 = table(
  ['Country', 'Path before reform', 'Reforms'],
  [
    ['Pakistan', 'Mixed economy; import substitution; Green Revolution; nationalisation in the 1970s', '1988'],
    ['China', 'State-directed; Great Leap Forward; communes; Cultural Revolution', '1978'],
    ['India', 'Mixed economy; five-year plans from 1951; import substitution', '1991'],
  ],
  'Summary table: Pakistan followed a mixed economy, import substitution, the Green Revolution and nationalisation, with reforms from 1988; China was state-directed with the Great Leap Forward, communes and the Cultural Revolution, with reforms from 1978; India followed a mixed economy and plans, with reforms from 1991',
);
const vReforms = table(
  ['Area', 'Reform after 1978'],
  [
    ['Agriculture (first phase)', 'Commune land divided into household plots; families kept income after fixed taxes'],
    ['Industry (later phase)', 'Private firms and township and village enterprises compete with state-owned enterprises'],
    ['Prices', 'Dual pricing: fixed price for a quota, market price for the rest'],
    ['Foreign trade and investment', 'Special economic zones to attract foreign direct investment'],
  ],
  'Table of China\'s reforms after 1978: household plots in agriculture first, competition for state-owned enterprises in industry later, dual pricing, and special economic zones for foreign investment',
);
const vPlot = table(
  ['', 'Commune', 'Household plot'],
  [
    ['Who decides', 'The collective', 'The family'],
    ['Reward for extra effort', 'Shared by all', 'Kept by the family after fixed taxes'],
    ['Reason to improve the land', 'Weak', 'Strong'],
  ],
  'Table comparing the commune with the household plot: the collective decides versus the family, reward shared by all versus kept by the family after taxes, weak versus strong reason to improve the land',
);
const vDual = (() => {
  const s = new Svg(560, 270);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 35000, left: 80, top: 30, width: 420, height: 180, xLabel: 'Pricing', yLabel: 'Revenue (price units)' });
  const bar = (x, parts) => {
    let base = 0;
    for (const [v, fill, lab] of parts) {
      const xa = ch.X(x - 0.3), xb = ch.X(x + 0.3);
      s.rect(xa, ch.Y(base + v), xb - xa, ch.Y(base) - ch.Y(base + v), { fill, color: 'accent', sw: 1.2, rx: 0 });
      s.text((xa + xb) / 2, (ch.Y(base) + ch.Y(base + v)) / 2, lab, { size: 11 });
      base += v;
    }
    ch.label([x, base], inr(base), { dy: -12, size: 13, bold: true });
  };
  bar(1, [[WE3_ALL_FIXED, 'muted', 'All at fixed price']]);
  bar(2, [[WE3_QUOTA_REV, 'muted', 'Quota'], [WE3_EXTRA_REV, 'fill', 'Extra at market']]);
  ch.xTick(1, 'Single fixed price').xTick(2, 'Dual pricing');
  ch.yTick(10000, '10,000').yTick(20000, '20,000').yTick(30000, '30,000');
  return s.visual(`Bar chart for an imagined factory producing ${inr(WE3.quota + WE3.extra)} tonnes: at a single fixed price revenue is ${inr(WE3_ALL_FIXED)}; under dual pricing the quota earns ${inr(WE3_QUOTA_REV)} and the extra output earns ${inr(WE3_EXTRA_REV)}, a total of ${inr(WE3_TOTAL)}`, `Imagined figures. Dual pricing adds ${inr(WE3_GAIN)} price units: a reason to produce more.`);
})();
const vSez = flow('LR', ['Special economic zones on the coast', 'Better infrastructure, freer rules', 'Foreign direct investment arrives', 'Factories produce for export', 'Jobs, technology and foreign exchange'], 'Flow of how special economic zones worked: better infrastructure and freer rules attract foreign direct investment, factories produce for export, bringing jobs, technology and foreign exchange', 'How SEZs helped');
const vDemog = table(
  ['Indicator', 'What the comparison shows (broadly)'],
  [
    ['Growth of population', 'Slowest in China after the one-child policy; faster in India and Pakistan'],
    ['Age structure', 'China ageing fastest; India and Pakistan younger'],
    ['Sex ratio', 'Low and biased against females in all three'],
    ['Density', 'High in all three compared with most of the world'],
  ],
  'Table of qualitative demographic comparisons: population growth slowest in China after the one-child policy, China ageing fastest, sex ratio low and biased against females in all three, density high in all three',
  'Broad patterns only; no current figures.',
);
const vAgeing = (() => {
  const s = new Svg(560, 270);
  const ch = s.chart({ x0: 0, x1: 5, y0: 0, y1: 40, left: 70, top: 30, width: 440, height: 180, xLabel: 'Age group', yLabel: 'Share of population (per cent)' });
  const bars = [[0.8, AGE.before.young, 'muted'], [1.6, AGE.after.young, 'accent'], [3.2, AGE.before.old, 'muted'], [4, AGE.after.old, 'accent']];
  for (const [x, v, fill] of bars) {
    const xa = ch.X(x - 0.3), xb = ch.X(x + 0.3);
    s.rect(xa, ch.Y(v), xb - xa, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.2, rx: 2 });
    ch.label([x, v], `${v}`, { dy: -12, size: 12, bold: true });
  }
  ch.xTick(1.2, 'Under 15').xTick(3.6, '60 and above');
  ch.yTick(10, '10').yTick(20, '20').yTick(30, '30');
  s.rect(400, 36, 14, 12, { fill: 'muted', stroke: false, rx: 1 }).text(420, 42, 'Before policy', { anchor: 'start', size: 11 });
  s.rect(400, 56, 14, 12, { fill: 'accent', stroke: false, rx: 1 }).text(420, 62, '40 years later', { anchor: 'start', size: 11 });
  return s.visual(`Bar chart of an imagined country before and 40 years after a one-child limit: children under 15 fall from ${AGE.before.young} to ${AGE.after.young} per cent of the population, while people aged 60 and above rise from ${AGE.before.old} to ${AGE.after.old} per cent`, 'Imagined country: fewer children, more elderly.');
})();
const vSector = table(
  ['', 'China', 'India', 'Pakistan'],
  [
    ['Main driver of output growth', 'Manufacturing (industry)', 'Services', 'Services, with farming still important'],
    ['Movement of workers out of agriculture', 'Large and fast', 'Slow: agriculture still a large employer', 'Slow: agriculture still a large employer'],
  ],
  'Table of sectoral comparison: China\'s growth led by manufacturing with a large, fast move of workers out of agriculture; India\'s and Pakistan\'s led by services, with agriculture still a large employer',
  'Qualitative comparison only.',
);
const vHdi = table(
  ['Indicator', 'Broad position'],
  [
    ['Life expectancy, literacy, income per head', 'China ahead of India and Pakistan on most'],
    ['India and Pakistan', 'Close to each other; each ahead on some indicators'],
    ['What the indices leave out', 'Political and civil freedoms (liberty)'],
  ],
  'Table of human development: China is ahead of India and Pakistan on most indicators such as life expectancy, literacy and income per head; India and Pakistan are close, each ahead on some; the indices leave out political and civil freedoms',
);
const vWE4 = table(
  ['Point of comparison', 'India', 'China', 'Link word'],
  [
    ['Start of reforms', '1991', '1978', 'whereas'],
    ['Lead sector of growth', 'Services', 'Manufacturing', 'while'],
    ['Population policy', 'No strict limit', 'One-child policy from about 1979', 'in contrast'],
    ['Human development', 'Behind on most', 'Ahead on most', 'however'],
  ],
  'Table showing how to structure a comparison answer: for each point give India, China and a link word; start of reforms 1991 versus 1978, lead sector services versus manufacturing, population policy no strict limit versus one-child policy, human development behind versus ahead',
  'One row of the table becomes one numbered point in your answer.',
);
const vAppraisal = table(
  ['Country', 'Strengths', 'Limits'],
  [
    ['China', 'Rapid growth; strong base in health and education', 'Ageing; low sex ratio'],
    ['India', 'Steady, services-led growth', 'Many workers still in low-productivity farming'],
    ['Pakistan', 'Higher food output; growing services', 'Reliance on remittances and aid; uneven growth'],
  ],
  'Appraisal table: China has rapid growth and a strong health and education base but faces ageing and a low sex ratio; India has steady services-led growth but many workers remain in farming; Pakistan has higher food output and growing services but relies on remittances and aid',
  'Every path had gains and costs.',
);
const vSum2 = flow('TB', ['Similar start around 1950', 'China: reforms from 1978, industry-led, fastest growth', 'India: reforms 1991, services-led', 'Pakistan: reforms 1988, uneven growth', 'Compare on growth, population, sectors and human development'], 'Summary flow: similar start around 1950; China reformed from 1978 with industry-led fastest growth; India reformed in 1991 with services-led growth; Pakistan reformed in 1988 with uneven growth; compare on growth, population, sectors and human development', 'Chapter in one picture');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'India and its Neighbours — Part 1: Starting Points, Pakistan and China before 1978',
  goals: [
    'Explain why India, Pakistan and China are compared and how similar their starting points were',
    'Describe the stages of Pakistan\'s development strategy and why its growth was uneven',
    'Describe China\'s path from 1949 to 1978: the first plan, the Great Leap Forward, communes and the Cultural Revolution',
  ],
  slides: [
    sl('title', 'Comparative Development Experiences of India and its Neighbours', {
      b: 'Part 1 — **why compare**, **similar starting points**, **Pakistan\'s path** and **China before 1978**.',
      v: vRoute1,
      n: 'Three large neighbours began their journeys at almost the same time, as poor and mainly agricultural countries. Yet their paths and results turned out quite different. In this part we look at where they started, how Pakistan built its economy, and what China tried before its famous reforms. Comparing neighbours helps us see what India did well and what it can still learn.',
    }),
    sl('concept', 'Why compare with neighbours?', {
      bl: [
        'Neighbours share **history, geography and similar problems**, so the comparison is fair.',
        'Comparison shows our **strengths and weaknesses** more clearly than looking at India alone.',
        'Countries also group together for trade and cooperation, for example **SAARC (1985)** in South Asia.',
      ],
      n: 'Why study the neighbours at all? Because a fair comparison needs countries that faced similar problems. India, Pakistan and China share long borders, a colonial or semi-colonial past, huge populations and poor starting conditions. When we place them side by side, it becomes easier to judge which policies worked. Countries in the region also cooperate, for example through SAARC, set up in 1985.',
    }),
    sl('diagram', 'Similar starting points', {
      v: vStart,
      n: 'Look at the first rows of this table. India and Pakistan became independent in 1947, and the People\'s Republic of China was set up in 1949. All three announced five-year plans within a few years: India in 1951, China in 1953 and Pakistan in 1956. Around 1950 all three were poor and depended mainly on farming. The last row shows that each later turned to major reforms, in a different year.',
    }),
    sl('diagram', 'Timeline of the three paths', {
      v: vTimeline,
      n: 'This timeline puts the three countries in three lanes. Notice that China moved first and fastest in changing course, with reforms in 1978. Pakistan followed in 1988 and India in 1991. Before that, China went through two very different experiments, the Great Leap Forward of 1958 and the Cultural Revolution from 1966 to 1976. Keep this picture in mind; examiners often test the order of events.',
    }),
    sl('concept', 'Pakistan: a mixed economy', {
      b: 'Like India, Pakistan gave roles to both the **public** and **private** sectors and followed **import substitution**.',
      v: vPakPhases,
      n: 'Pakistan chose a mixed economy, much like India. In the late 1950s and 1960s it built consumer goods industries behind high tariffs, which is import substitution. In the 1960s the Green Revolution raised grain output. In the 1970s it nationalised capital goods industries. Then, from the late 1970s, it turned back towards the private sector, and in 1988 it began economic reforms.',
    }),
    sl('concept', 'Green Revolution and the 1970s in Pakistan', {
      bl: [
        'High-yielding seeds raised **food-grain output**, especially wheat.',
        'Farming became more **mechanised**; the state invested in **infrastructure** in some regions.',
        '1970s: **capital goods industries nationalised**.',
        'Late 1970s and 1980s: **denationalisation**; encouragement to private firms.',
      ],
      n: 'The Green Revolution changed farming in Pakistan as it did in India. New seeds, fertilisers and irrigation raised the output of food grains. It also brought machines to farms and more public spending on roads and canals in some regions. In industry, the 1970s saw nationalisation of capital goods industries. Later the direction reversed, and private firms were encouraged again.',
    }),
    sl('concept', 'Reforms of 1988 and sources of foreign exchange', {
      b: 'Pakistan began **reforms in 1988**. For much of its history, foreign exchange came largely from **outside support**.',
      v: vPakSources,
      n: 'Facing a financial crisis, Pakistan began economic reforms in 1988. Its foreign exchange came from three main places, shown here. Workers abroad, many of them in West Asia, sent money home. Other countries gave loans and aid. Exports grew, but they were mostly simple, lower value goods. Look at the second column: each source depends on something outside the country\'s control.',
    }),
    sl('check', 'Quick check: Pakistan in the 1970s', {
      b: 'True or false? In the 1970s Pakistan privatised all its capital goods industries.',
      chk: 'tf_pak_nationalise',
      n: 'Think carefully about the direction of policy in the 1970s. Was it towards the state or towards private owners?',
    }),
    sl('example', 'Worked example 1: comparing per capita growth', {
      b: 'Two imagined countries. Which one raises living standards faster?',
      bl: [
        'Step 1 — Per capita income growth is roughly **GDP growth minus population growth**.',
        `Step 2 — Country P: ${WE1.P.g} − ${WE1.P.p} = **${WE1_P} per cent**.`,
        `Step 3 — Country Q: ${WE1.Q.g} − ${WE1.Q.p} = **${WE1_Q} per cent**.`,
        'Step 4 — Q improves average incomes faster, even though its GDP grows more slowly.',
      ],
      v: vWE1,
      n: 'Here is a skill you will use throughout this chapter. Country P has faster GDP growth, but its population also grows fast. Subtract population growth from GDP growth to estimate how fast income per person rises. P gets about three and a half per cent, while Q gets about four per cent. So the slower growing economy is actually improving average living standards faster.',
    }),
    sl('diagram', 'Why Pakistan\'s growth was uneven', {
      v: vUneven,
      n: 'Economists usually give four reasons why Pakistan found it hard to keep growth steady. Farm output depended on the weather. Foreign exchange depended on remittances and aid. The export base stayed narrow. And frequent political changes made long term planning difficult. When several of these went wrong in the same year, growth fell sharply. A strong base of manufactured exports could have cushioned these shocks.',
    }),
    sl('check', 'Quick check: Pakistan\'s reforms', {
      b: 'In which year did Pakistan begin its economic reforms?',
      chk: 'm_pak_reform',
      n: 'Remember the three reform years and match the right one to Pakistan.',
    }),
    sl('diagram', 'China after 1949', {
      b: 'The People\'s Republic of China was set up in **1949**. The state directed the economy and launched its **first plan in 1953**.',
      v: vChinaPre,
      n: 'Now let us turn to China. After the People\'s Republic was set up in 1949, all important sectors were brought under state direction, and the first five year plan began in 1953. Over the next twenty five years China tried two bold campaigns, shown in the middle of this flow, before it changed direction completely in 1978.',
    }),
    sl('concept', 'The Great Leap Forward (1958)', {
      bl: [
        'Aim: **industrialise the country on a massive scale**, very quickly.',
        'People were encouraged to set up **industries in their backyards**, such as small furnaces for steel.',
        'In rural areas, **communes** were formed to farm land collectively.',
      ],
      n: 'In 1958 China launched the Great Leap Forward. The idea was to industrialise at great speed. Villagers were urged to start small industries in their own backyards, including furnaces to make steel. At the same time, rural families were organised into communes, where people farmed the land together. The campaign was meant to pool the country\'s labour for a giant push.',
    }),
    sl('diagram', 'How a commune worked', {
      v: vCommune,
      n: 'In a commune, teams of villagers farmed the land collectively, and the harvest was shared out by the collective according to work done. The aim was to pool land and labour. But look at the last row. If a family worked harder, its share hardly grew, so there was little extra reward for extra effort. This weakness matters when we study the reforms in Part 2.',
    }),
    sl('check', 'Quick check: backyard industries', {
      b: 'What was the intention behind backyard industries during the Great Leap Forward?',
      chk: 'm_backyard',
      n: 'Link the backyard furnaces to the main aim of the campaign.',
    }),
    sl('diagram', 'Setbacks and the Cultural Revolution', {
      v: vSetbacks,
      n: 'The Great Leap Forward ran into serious trouble. A severe famine, linked both to drought and to the campaign\'s own policies, cost a very large number of lives, and a conflict with the Soviet Union led to the withdrawal of its experts. Later, from 1966 to 1976, came the Cultural Revolution, when students and professionals were sent to work and learn in the countryside.',
    }),
    sl('example', 'Worked example 2: putting events in order', {
      b: 'Place six events in time, with the country for each.',
      bl: [
        'Step 1 — Fix the anchors: **1947 and 1949** (new nations).',
        'Step 2 — Plans: **1951** India, **1953** China, **1956** Pakistan.',
        'Step 3 — China\'s campaigns: **1958**, then **1966–76**.',
        'Step 4 — Reforms: **1978**, **1988**, **1991**.',
      ],
      v: vWE2,
      n: 'Ordering questions are common in this chapter, so build a simple method. First fix the anchors, 1947 and 1949. Next place the three first plans. Then add China\'s two campaigns. Finally add the three reform years, which many students remember as seventy eight, eighty eight and ninety one. Write the country next to every date so you never mix them up.',
    }),
    sl('check', 'Quick check: China\'s timeline', {
      b: 'Arrange the stages of China\'s development path in the order in which they happened.',
      chk: 'ord_china',
      n: 'Use the anchors from the worked example: founding, first plan, the two campaigns, and then reform.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. All three countries began poor and agricultural around 1950 and turned to planning. Pakistan followed a mixed economy, import substitution and the Green Revolution, nationalised in the 1970s and reformed in 1988. China was state directed, tried the Great Leap Forward and communes, went through the Cultural Revolution, and reformed in 1978. India reformed in 1991.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Always write the **country with each date**; mixing up 1978, 1988 and 1991 is the most common slip.',
        'Pakistan **nationalised** in the 1970s; the turn to the private sector came **after** that.',
        'For "why was Pakistan\'s growth uneven", give **separate** reasons: weather, remittances and aid, narrow exports, instability.',
        'Describe the Great Leap Forward by its **aim** (rapid industrialisation) and its **tools** (backyard industries, communes).',
        '3 marks = three distinct points of about 20 words each; 5 marks = five numbered points.',
      ],
      n: 'A few tips before you move on. Always pair a date with its country. Remember that Pakistan nationalised in the 1970s and only later moved towards private firms. When asked for reasons, give separate points rather than one long sentence. And describe the Great Leap Forward by both its aim and its tools. Marks are awarded point by point, so number your points.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'India and its Neighbours — Part 2: China\'s Reforms and the Comparison',
  goals: [
    'Explain China\'s reforms from 1978: household plots, dual pricing, competition and special economic zones',
    'Compare the three countries on population, sectoral composition and human development, using broad patterns',
    'Appraise the development strategies and structure a comparison answer',
  ],
  slides: [
    sl('title', 'China\'s reforms and the three-way comparison', {
      b: 'Part 2 — **reforms from 1978**, **population**, **sectors**, **human development** and an **appraisal**.',
      v: vRoute2,
      n: 'In Part 2 we see how China changed course in 1978 and why its economy then grew so quickly. After that we compare all three countries on population, on the structure of output, and on human development. We finish by weighing the strengths and limits of each path, and by learning how to write a clear comparison answer.',
    }),
    sl('diagram', 'Reforms from 1978, in phases', {
      v: vReforms,
      n: 'China introduced its reforms step by step. The first phase covered agriculture, foreign trade and investment. In agriculture, commune land was divided among households. In the later phase came industry, where private firms and township and village enterprises were allowed to compete with state owned enterprises. Dual pricing and special economic zones completed the package.',
    }),
    sl('diagram', 'From communes to household plots', {
      v: vPlot,
      n: 'Compare the two columns. In a commune, extra effort was shared by everyone. Under the new system, each family farmed its own plot, paid the taxes fixed by the government, and kept the rest. Suddenly hard work and care for the land paid off for the family itself. This change in incentives is the key to the rise in farm output that followed.',
    }),
    sl('concept', 'Dual pricing', {
      bl: [
        'Farmers and firms sold a **fixed quota** to the state at **fixed prices**.',
        'Anything produced **above the quota** could be sold at **market prices**.',
        'As output grew, a larger share of goods was traded in markets.',
      ],
      n: 'Dual pricing was a clever bridge between the old system and the market. A farmer or factory still had to sell a quota to the state at a fixed price. But anything produced beyond the quota could be sold at the market price, which was usually higher. So producers had a strong reason to produce more, and over time markets handled a growing share of trade.',
    }),
    sl('example', 'Worked example 3: the incentive in dual pricing', {
      b: `An imagined factory produces ${inr(WE3.quota + WE3.extra)} tonnes. The quota is ${inr(WE3.quota)} tonnes at a fixed price of ${WE3.fixed}; the rest sells at the market price of ${WE3.market} (price units a tonne).`,
      bl: [
        `Step 1 — Quota revenue: ${inr(WE3.quota)} × ${WE3.fixed} = **${inr(WE3_QUOTA_REV)}**.`,
        `Step 2 — Extra output: ${WE3.extra} × ${WE3.market} = **${inr(WE3_EXTRA_REV)}**.`,
        `Step 3 — Total: **${inr(WE3_TOTAL)}**, against ${inr(WE3_ALL_FIXED)} if everything sold at the fixed price.`,
        `Step 4 — The gain of **${inr(WE3_GAIN)}** rewards producing beyond the quota.`,
      ],
      v: vDual,
      n: 'Let us put numbers on the idea. The factory sells its quota of one thousand tonnes at the fixed price and earns twenty thousand. The extra four hundred tonnes sell at the market price and earn twelve thousand more. If everything had been sold at the fixed price, it would earn only twenty eight thousand. The difference of four thousand is the reward for producing more.',
    }),
    sl('check', 'Quick check: name the arrangement', {
      b: 'A quota sold to the state at fixed prices, and extra output sold at market prices. What is this called?',
      chk: 'm_dual_price',
      n: 'You have just worked through an example of this arrangement. Name it.',
    }),
    sl('diagram', 'Township enterprises, SEZs and foreign investment', {
      b: '**Township and village enterprises**, owned by local collectives, grew fast and competed with state firms.',
      v: vSez,
      n: 'Two more reforms changed Chinese industry. Township and village enterprises, owned and run by local collectives, grew quickly and gave state owned firms real competition. And special economic zones offered good infrastructure and freer rules to foreign investors. Follow the flow: investment arrived, factories produced for export, and the country gained jobs, technology and foreign exchange.',
    }),
    sl('diagram', 'Comparing population', {
      v: vDemog,
      n: 'Now the comparison begins. China introduced a one child policy in the late 1970s, which sharply slowed population growth. India and Pakistan have younger populations that are still growing faster. In all three, the sex ratio is low and biased against females. All three are also densely populated. Notice that these are broad patterns; you are not expected to quote current figures.',
    }),
    sl('diagram', 'What a one-child limit does to age structure', {
      v: vAgeing,
      n: 'This chart shows an imagined country before and forty years after a one child limit. The share of children falls by half, while the share of people over sixty almost triples. Fewer young workers must now support many more elderly people. This is the ageing problem that China faces, and it is why the policy was later relaxed.',
    }),
    sl('check', 'Quick check: sex ratio', {
      b: 'Calculate the sex ratio of an imagined district from its numbers of females and males.',
      chk: 'num_sex_ratio',
      n: 'Divide females by males and multiply by one thousand.',
    }),
    sl('concept', 'Sex ratio and density: reading the measures', {
      bl: [
        '**Sex ratio** = number of females per 1,000 males; a **low** sex ratio means fewer females.',
        '**Density** = population ÷ area, in persons per square kilometre.',
        'A low sex ratio often reflects a **preference for sons**; strict limits on family size can worsen it.',
      ],
      n: 'Two measures appear again and again in comparison questions. The sex ratio counts females for every thousand males, so a low number means fewer females. Density is population divided by area. When families are allowed very few children, a preference for sons can push the sex ratio down further, which is a social as well as an economic concern.',
    }),
    sl('diagram', 'Output and sectors', {
      v: vSector,
      n: 'Here is the biggest structural difference. China\'s growth has been driven mainly by manufacturing, and a very large number of workers moved out of farming into factories. In India and Pakistan, services have led the growth of output, but a large share of workers still remains in agriculture. That means many people are stuck in low productivity farm work.',
    }),
    sl('check', 'Quick check: per capita growth', {
      b: 'Two imagined countries grow at 6 per cent a year, with population growth of 1 and 3 per cent. What follows?',
      chk: 'm_check_pcg',
      n: 'Use the rule from Part 1: subtract population growth from GDP growth.',
    }),
    sl('diagram', 'Human development', {
      v: vHdi,
      n: 'On most human development indicators, such as life expectancy, literacy and income per head, China is ahead of both India and Pakistan. One reason is that China spread basic health care and schooling widely even before its reforms. India and Pakistan are close to each other, and each does better on some indicators. Again, remember the broad order rather than exact ranks.',
    }),
    sl('concept', 'What the indices leave out', {
      bl: [
        'Human development indices measure **health, education and income**.',
        'They do **not** measure **liberty**: political and civil freedoms, protection of rights.',
        'Some economists suggest adding **liberty indicators** for a fuller picture.',
      ],
      n: 'Human development indices are useful, but they are not the whole story. They measure health, education and income. They say nothing about how free people are to take part in decisions or how well their rights are protected. Some economists therefore suggest adding liberty indicators. In an answer, mentioning this limit shows balanced judgement.',
    }),
    sl('check', 'Quick check: what HDI measures', {
      b: 'True or false? Life expectancy and literacy also measure political freedom.',
      chk: 'tf_check_hdi',
      n: 'Think about what each indicator actually counts.',
    }),
    sl('example', 'Worked example 4: structuring a comparison answer', {
      b: 'Question: "Compare India and China on any four points." Build the answer as a table first.',
      bl: [
        'Step 1 — Choose **four separate points**: reforms, lead sector, population policy, human development.',
        'Step 2 — For each, state **both countries** in one sentence, joined by a link word.',
        'Step 3 — Number the points; one point earns about one mark.',
        'Step 4 — End with a one-line judgement if the question asks you to evaluate.',
      ],
      v: vWE4,
      n: 'Comparison answers lose marks when students describe one country fully and then forget the other. Avoid that by planning in a table. Pick four separate points. For each one, mention India and China in the same sentence, joined by words like whereas or in contrast. Number your points, and add a short judgement only if the question asks for one.',
    }),
    sl('diagram', 'Appraisal: gains and costs of each path', {
      v: vAppraisal,
      n: 'Let us weigh the paths fairly. China achieved rapid growth on a strong base of health and education, but now faces ageing and a low sex ratio. India has grown steadily, led by services, though many workers are still in farming. Pakistan raised food output and services, but relied heavily on remittances and aid, so its growth was uneven. Every path had gains and costs.',
    }),
    sl('summary', 'Summary of the chapter', {
      v: vSum2,
      n: 'To sum up. The three neighbours started from similar places around 1950. China reformed first, in 1978, and its manufacturing led growth was the fastest. India reformed in 1991 with services leading, and Pakistan in 1988 with more uneven results. Compare them on growth, population, sectors and human development, and remember the limits of each measure.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Never quote current GDP, HDI ranks or population numbers from memory; state the **broad order** (China ahead on most).',
        'Link **household plots** and **dual pricing** to **incentives**: that is the reason output rose.',
        'One-child policy: write both effects, **ageing** and a **lower sex ratio**.',
        'In comparison answers, mention **both countries in every point**.',
        'For evaluation questions, add a limit: indices leave out **liberty**.',
        'Data case: compute per capita growth as GDP growth minus population growth, and show the subtraction.',
      ],
      n: 'Final tips. Do not invent exact figures; describe the broad order. When you explain why China\'s output rose, connect each reform to incentives. For the one child policy, give both ageing and the sex ratio. In every comparison point, name both countries. And in evaluation questions, a short line on what the indices leave out earns credit for balance.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Comparative Development Experiences of India and its Neighbours — notes',
  sections: [
    {
      h: '1. Why compare, and similar starting points',
      t: [1, 2],
      b: 'Comparing **neighbours** is fair because they share history, geography and similar problems. Around **1950** India, Pakistan and China were all **poor, mainly agricultural** economies with low incomes.\n\n- **New nations:** India and Pakistan **1947**; People\'s Republic of China **1949**.\n- **First five-year plans announced:** India **1951**, China **1953**, Pakistan **1956**.\n- **Major reforms began:** China **1978**, Pakistan **1988**, India **1991**.\n\nCountries in the region also cooperate through groupings such as **SAARC** (set up in 1985).',
      terms: [
        ['Mixed economy', 'An economy in which the public and private sectors both play a role in production.'],
        ['Import substitution', 'Producing at home, behind tariffs and quotas, goods that were earlier imported.'],
      ],
      v: vStart,
      vs: [vTimeline],
    },
    {
      h: '2. Pakistan\'s development path',
      t: 1,
      b: '- **Mixed economy** after 1947, with planning (first plan announced 1956).\n- **Late 1950s–1960s:** **import substitution**: consumer-goods industries behind **tariff protection**.\n- **1960s:** the **Green Revolution** raised food-grain output; farming was **mechanised** and the state invested in infrastructure in some regions.\n- **1970s:** **nationalisation of capital goods industries**.\n- **Late 1970s–1980s:** **denationalisation** and encouragement to the private sector, supported by financial help from Western countries and **remittances** from emigrant workers, many in **West Asia**.\n- **1988:** economic **reforms** began after a financial crisis.\n\n**Why growth was uneven:** farm output depended on the **weather**; foreign exchange came largely from **remittances and foreign aid**, not from a growing base of manufactured exports; and **political instability** made long-term policy difficult. In both India and Pakistan, **services** became the largest sector of output.',
      terms: [
        ['Remittances', 'Money sent home by people working abroad; a source of foreign exchange.'],
        ['Nationalisation', 'Transfer of privately owned enterprises to government ownership.'],
      ],
      v: vPakPhases,
      vs: [vPakSources, vUneven],
    },
    {
      h: '3. China before 1978',
      t: 2,
      b: '- **1949:** People\'s Republic set up; important sectors brought under **state direction**; **first plan 1953**.\n- **Great Leap Forward (1958):** a campaign to **industrialise on a massive scale**; people set up **backyard industries** (for example small steel furnaces); in rural areas **communes** farmed land **collectively**.\n- **Setbacks:** a **severe famine**, linked to drought and to the campaign\'s own policies, in which a very large number of people died; a conflict with the Soviet Union led to the **withdrawal of Soviet experts**.\n- **Great Proletarian Cultural Revolution (1966–76):** students and professionals were sent to **work and learn in the countryside**.\n\nEven so, the pre-reform years spread **basic education and health care** widely and built some rural infrastructure, a base that helped later growth.',
      terms: [
        ['Great Leap Forward', 'China\'s 1958 campaign for rapid, large-scale industrialisation, including backyard industries and communes.'],
        ['Commune system', 'Collective cultivation of land by teams of villagers in rural China.'],
        ['Cultural Revolution', 'The period 1966–76 in China when students and professionals were sent to the countryside.'],
      ],
      v: vChinaPre,
      vs: [vCommune, vSetbacks],
    },
    {
      h: '4. China\'s reforms from 1978',
      t: 2,
      b: 'Reforms came **in phases**. The **first phase** covered **agriculture, foreign trade and investment**; the **later phase** covered industry.\n\n- **Agriculture:** commune land divided into **plots for households**; each family paid the taxes fixed by the government and **kept the rest**, so effort was rewarded.\n- **Industry:** private firms and **township and village enterprises** (owned by local collectives) were allowed to **compete** with **state-owned enterprises**, pushing all of them to be efficient.\n- **Dual pricing:** a **quota** sold to the state at fixed prices, anything above it at **market prices**.\n- **Special economic zones:** coastal areas with good facilities and freer rules to attract **foreign direct investment** and promote exports.\n\nThe result was rapid, **manufacturing-led** growth.',
      terms: [
        ['Dual pricing', 'Fixed prices for output sold to the state under a quota, and market prices for output above it.'],
        ['Township and village enterprise', 'An enterprise owned and run by a local collective in reform-era China.'],
        ['Special economic zone (SEZ)', 'An area with special facilities and rules to attract foreign investment.'],
      ],
      v: vReforms,
      vs: [vPlot, vDual, vSez],
    },
    {
      h: '5. Comparing population and the structure of output',
      t: [1, 2],
      b: '**Population (broad patterns):**\n- China introduced the **one-child policy** in the late **1970s** (from about 1979). Population growth slowed sharply; after a few decades the **share of elderly people rose** (**ageing**) and the policy was later relaxed.\n- The **sex ratio** (females per 1,000 males) is **low and biased against females** in all three countries; son preference is one cause.\n- India and Pakistan have **younger** populations that still grow faster than China\'s.\n\n**Output and sectors:**\n- **China:** growth led mainly by **manufacturing**; a large, fast movement of workers **out of agriculture**.\n- **India and Pakistan:** **services** are the largest and fastest-growing sector of output, while **agriculture still employs a large share** of workers.\n\n**Useful calculations:** growth rate = change ÷ original × 100; per capita income growth ≈ GDP growth − population growth; density = population ÷ area; sex ratio = females ÷ males × 1,000.',
      terms: [
        ['Sex ratio', 'The number of females per 1,000 males in a population.'],
        ['Density of population', 'The number of persons per square kilometre of area.'],
        ['Ageing', 'A rise in the share of elderly people in the population.'],
      ],
      v: vDemog,
      vs: [vAgeing, vSector, vWE1],
    },
    {
      h: '6. Human development and appraisal',
      t: [1, 2],
      b: '- On **most human development indicators** (life expectancy, literacy, income per head), **China is ahead** of India and Pakistan; India and Pakistan are **close to each other**, each ahead on some indicators.\n- A main reason for China\'s lead is its early spread of **health care and primary education**.\n- **Limits:** these indices do not measure **liberty** (political and civil freedoms, protection of rights) or how fairly gains are shared; some economists suggest **liberty indicators**.\n\n**Appraisal:** China achieved the fastest growth but faces ageing and a low sex ratio; India grew steadily, led by services, with many workers still in farming; Pakistan raised food output and services but depended on remittances, aid and the weather. **Lessons:** invest in people, link reward to effort, build a broad export base, keep policy stable.',
      terms: [
        ['Human development', 'Improvement in people\'s health, education and standard of living, measured by indicators such as life expectancy and literacy.'],
        ['Liberty indicators', 'Measures of political and civil freedom that some economists suggest adding to human development indices.'],
      ],
      v: vHdi,
      vs: [vAppraisal, vWE4],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up the reform years: **China 1978, Pakistan 1988, India 1991**.\n- Saying Pakistan privatised in the 1970s: it **nationalised** capital goods industries then.\n- Quoting exact current GDP, HDI ranks or population figures: describe the **broad order** instead.\n- Writing a comparison that describes one country only: name **both countries in every point**.\n- Saying a low sex ratio means more females: it means **fewer females** per 1,000 males.\n- Forgetting that per capita growth ≈ GDP growth − population growth.\n\n**How marks are usually awarded**\n- 1 mark: correct option or value.\n- 3 marks: three distinct points (about 50–80 words).\n- 5 marks: five numbered points (about 80–120 words); comparisons give both countries per point; evaluations end with a balanced judgement.\n- Case-based: use the figures in the table or passage, and show each step of a calculation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Year: India and Pakistan become independent; PRC set up', '**1947**; **1949**.', 'fact', 1],
  ['First five-year plans announced', 'India **1951**, China **1953**, Pakistan **1956**.', 'fact', 1],
  ['Major reforms began', 'China **1978**, Pakistan **1988**, India **1991**.', 'fact', 2],
  ['Why compare India with its neighbours?', 'Shared history, geography and problems make a **fair comparison** and show our strengths and weaknesses.', 'concept', 1],
  ['Pakistan\'s economic system after 1947', 'A **mixed economy**, with public and private sectors.', 'fact', 1],
  ['Pakistan in the late 1950s and 1960s', '**Import substitution** behind tariffs; then the **Green Revolution**.', 'fact', 1],
  ['Pakistan in the 1970s', '**Nationalisation of capital goods industries**.', 'fact', 1],
  ['Pakistan: main sources of foreign exchange', '**Remittances** from workers abroad (many in West Asia) and **foreign loans and aid**.', 'fact', 1],
  ['Four reasons for Pakistan\'s uneven growth', 'Weather-dependent farming; remittances and aid; narrow exports; political instability.', 'concept', 1],
  ['Largest sector of output in India and Pakistan', '**Services** (tertiary sector).', 'fact', 1],
  ['**Great Leap Forward**', '**1958** campaign in China to industrialise on a massive scale: backyard industries and communes.', 'definition', 2],
  ['**Commune system**', 'People in rural China **cultivated land collectively**.', 'definition', 2],
  ['Why did the Great Leap Forward run into trouble?', 'A **severe famine** and the **withdrawal of Soviet experts** after a conflict.', 'concept', 2],
  ['**Cultural Revolution**', '**1966–76**: students and professionals sent to work and learn in the **countryside**.', 'definition', 2],
  ['First phase of China\'s 1978 reforms', '**Agriculture, foreign trade and investment**; industry came later.', 'fact', 2],
  ['Household plots after 1978', 'Commune land divided among families; they **kept income after fixed taxes**, so effort paid.', 'concept', 2],
  ['**Dual pricing**', 'Quota sold to the state at **fixed prices**; extra output at **market prices**.', 'definition', 2],
  ['**Township and village enterprises**', 'Enterprises **owned by local collectives** that competed with state-owned enterprises.', 'definition', 2],
  ['**Special economic zones**', 'Areas with good facilities and freer rules to attract **foreign direct investment**.', 'definition', 2],
  ['**One-child policy**', 'Introduced in China in the late **1970s**: slower population growth, then **ageing** and a lower sex ratio.', 'fact', 2],
  ['**Sex ratio**', 'Number of **females per 1,000 males**; low and biased against females in all three.', 'definition', 2],
  ['**Density of population**', 'Persons per square kilometre = **population ÷ area**.', 'formula', 1],
  ['Per capita income growth (approx.)', '**GDP growth − population growth**.', 'formula', 1],
  ['Lead sector of China\'s growth', '**Manufacturing (industry)**; workers moved out of agriculture fast.', 'fact', 2],
  ['Human development: broad order', '**China ahead** of India and Pakistan on most indicators; India and Pakistan close.', 'fact', 2],
  ['Why is China ahead on human development?', 'Early, wide spread of **basic health care and primary education**.', 'concept', 2],
  ['What do HDI-type indices leave out?', '**Liberty**: political and civil freedoms; hence the idea of **liberty indicators**.', 'concept', 2],
  ['Ageing: why is it a problem?', '**Fewer workers support more elderly** dependants; pension and care costs rise.', 'concept', 2],
  ['Structure of a comparison answer', 'Separate numbered points; **both countries in each point**; link words (whereas, in contrast).', 'exam-tip', 2],
  ['Four lessons from the three paths', 'Invest in people; link reward to effort; broad export base; stable policy.', 'concept', 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Comparative Development Experiences of India and its Neighbours',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_pak_mixed', 'm_glf', 'm_hdi_order', 'ar_reform_growth'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_sez_role', 's_pak_greenrev', 's3_china_reforms'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_china_path', 'l_pak_path'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_village'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Comparative Development Experiences of India and its Neighbours',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_plans_order', 'm_pak_forex', 'm_pak_instability', 'm_commune', 'm_household_resp', 'm_sez', 'm_china_industry', 'm_one_child', 'ar_pak_remit', 'ar_glf'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_glf_fail', 's_one_child_effects', { attempt: 1, keys: ['s_commune_vs_plot', 's_pak_growth_slow'] }, 's3_ind_pak_compare', { attempt: 1, keys: ['s3_china_india_sector', 's3_glf_vs_reforms'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_three_compare', { attempt: 1, keys: ['l_hdi_compare', 'l_lessons'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage or table and answer all parts. Part (c) of each has an internal choice.', items: ['cb_three', 'cb_meghdesh'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (India and Pakistan) and t02 (India and China) of cbse-12-economics-ch13 only',
    originality: 'every case, account, table and figure written for this chapter (imagined countries Meghdesh and Tianmar, imagined Countries A, B, C, P, Q and an imagined village account, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build (per capita growth ${WE1_P} and ${WE1_Q}; dual pricing ${inr(WE3_TOTAL)} vs ${inr(WE3_ALL_FIXED)}; question-bank figures asserted in questions.mjs); no current statistics of India, China or Pakistan`,
    facts: 'independence 1947, PRC 1949; first plans announced 1951/1953/1956; Great Leap Forward 1958; Cultural Revolution 1966-76; reforms 1978/1988/1991; one-child policy late 1970s; Pakistan nationalisation in the 1970s; SAARC 1985; human development stated as broad order only',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
