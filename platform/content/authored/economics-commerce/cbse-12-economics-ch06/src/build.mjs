// Build CBSE 12 Economics ch06 Indian Economy on the Eve of Independence. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch06', 'economics-commerce');
const { inr, PROV, PROV_AGRI, TRADE, SURPLUS, WEAVE, WEAVE_FALL } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (computed, never typed)
// Approximate all-India shares of the workforce, 1947 (ranges as commonly cited; bars at mid-points).
const OCC = [
  ['Agriculture', 70, 75],
  ['Manufacturing', 9, 11],
  ['Services', 15, 20],
];
const mid = (a, b) => (a + b) / 2;
if (Math.round(OCC.reduce((s, [, a, b]) => s + mid(a, b), 0)) !== 100) throw new Error('occupational mid-points must sum to 100');
// Worked example: imagined district trade (₹ lakh).
const WX = { x: 74, m: 51 };
const WXs = WX.x - WX.m;
// Worked example 2 (deck 2): imagined district workforce.
const WD = { total: 40000, agri: 29200 };
const WDp = Math.round((1000 * WD.agri) / WD.total) / 10;
if (WXs !== 23 || WDp !== 73 || PROV_AGRI !== 72 || SURPLUS !== 90 || WEAVE_FALL !== 37.5) throw new Error('figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Aims of colonial rule', 'Low income and slow growth', 'Agriculture', 'Industry'], 'Route map of Part 1: aims of colonial rule, low income and slow growth, agriculture, and industry', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Foreign trade', 'Demographic condition', 'Occupational structure', 'Infrastructure', 'The overall picture'], 'Route map of Part 2: foreign trade, demographic condition, occupational structure, infrastructure and the overall picture', 'Part 2 at a glance');
const vColonial = flow('LR', ['Indian raw materials (cotton, jute, indigo)', 'British factories', 'Finished goods (cloth, light machinery)', 'Sold in Indian markets'], 'Flow of the colonial pattern: Indian raw materials go to British factories, which make finished goods that are sold back in Indian markets', 'The colonial economic loop', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n1' },
]);
const vEstimates = table(
  ['Who estimated India\'s income in colonial times', 'Note'],
  [
    ['Dadabhai Naoroji', 'Early estimate; linked poverty to the drain of wealth'],
    ['William Digby, Findlay Shirras', 'Other private estimates'],
    ['R. C. Desai', 'Later estimate'],
    ['V. K. R. V. Rao', 'Generally regarded as the most significant'],
  ],
  'Table of people who estimated colonial India\'s income: Dadabhai Naoroji, William Digby, Findlay Shirras, R. C. Desai, and V. K. R. V. Rao, whose estimates are generally regarded as the most significant',
  'The government made no serious estimate; private estimates differ in method.',
);
const vGrowth = table(
  ['First half of the twentieth century', 'Approximate yearly growth'],
  [
    ['Aggregate real output', 'Less than 2 per cent'],
    ['Output per person', 'About half a per cent'],
  ],
  'Table: in the first half of the twentieth century aggregate real output grew by less than 2 per cent a year and output per person by about half a per cent',
  'Commonly cited approximate estimates.',
);
const vSettle = flow('LR', ['Cultivator tills the land', 'Pays rent to the zamindar', 'Zamindar pays fixed revenue to the colonial state', 'Little left for investment in land'], 'Flow of the zamindari arrangement: the cultivator pays rent to the zamindar, the zamindar pays fixed revenue to the colonial state, and little is left to invest in the land', 'Who got the surplus?');
const vAgriCauses = table(
  ['Cause of stagnation', 'How it held output back'],
  [
    ['Land settlement (zamindari)', 'Rent went to landlords who seldom improved the land'],
    ['Revenue terms', 'Fixed sums by fixed dates, even in bad years'],
    ['Low technology', 'Wooden ploughs, old seeds, little fertiliser'],
    ['Poor irrigation', 'Most land depended on rain; floods unchecked'],
  ],
  'Table of four causes of agricultural stagnation: the zamindari land settlement, harsh revenue terms, low technology and poor irrigation, with how each held output back',
);
const vCommercial = flow('LR', ['Food crops (rice, wheat, millets)', 'Cash crops for British industry (indigo, jute, cotton)', 'Gains to traders, moneylenders, exporters', 'Cultivators stay poor; less food'], 'Flow of commercialisation: farmers shift from food crops to cash crops for British industry; gains go to traders, moneylenders and exporters, while cultivators stay poor and grow less food', 'Commercialisation without prosperity');
const vCaseEvidence = table(
  ['Clue in the imagined account', 'Feature of colonial agriculture'],
  [
    ['Half the crop goes as rent to the landlord\'s agent', 'Zamindari land settlement'],
    ['The village grows indigo for a European planter', 'Commercialisation of agriculture'],
    ['One canal, dry most of the year; fields wait for rain', 'Poor irrigation'],
    ['The same wooden plough as the grandfather', 'Low technology'],
  ],
  'Table linking four clues in an imagined account to features of colonial agriculture: rent to the landlord\'s agent is zamindari, indigo for a planter is commercialisation, a dry canal is poor irrigation, an old wooden plough is low technology',
  'Imagined village; quote the clue, then name the feature.',
);
const vDeind = flow('TB', ['Cheap machine-made British cloth enters at low duty', 'Indian handicrafts lose their market', 'Artisans lose work', 'Few modern factories to absorb them', 'More pressure on land and more unemployment'], 'Flow of de-industrialisation: cheap British cloth enters at low duty, handicrafts lose their market, artisans lose work, few factories absorb them, so pressure on land and unemployment rise', 'De-industrialisation in five steps');
const vMotive = table(
  ['Motive of colonial industrial policy', 'What it meant for India'],
  [
    ['Cheap raw materials for British industry', 'India exported cotton, jute, indigo, silk'],
    ['A large market for British finished goods', 'Indian crafts were undersold at home'],
  ],
  'Table of the two-fold motive of colonial industrial policy: cheap raw materials for British industry, and a market for British finished goods, with what each meant for India',
);
const vModern = table(
  ['Industry', 'Where', 'Ownership / note'],
  [
    ['Cotton textile mills', 'Western India (present-day Maharashtra and Gujarat)', 'Mainly Indian-owned'],
    ['Jute mills', 'Bengal', 'Mainly foreign-owned'],
    ['Iron and steel (TISCO, 1907)', 'Eastern India', 'Indian private enterprise'],
    ['Sugar, cement, paper', 'Various', 'Came up later, after the Second World War'],
  ],
  'Table of modern industries in colonial India: cotton mills in western India, mainly Indian-owned; jute mills in Bengal, mainly foreign-owned; iron and steel with TISCO in 1907; sugar, cement and paper later',
  'Approximate, commonly cited pattern.',
);
const vWeaver = table(
  ['Step', 'Working (imagined weaver)'],
  [
    ['Income before mill cloth', `₹${WEAVE.before} a year`],
    ['Income after', `₹${WEAVE.after} a year`],
    ['Fall', `${WEAVE.before} − ${WEAVE.after} = ₹${WEAVE.before - WEAVE.after}`],
    ['Percentage fall', `${WEAVE.before - WEAVE.after} ÷ ${WEAVE.before} × 100 = ${WEAVE_FALL}%`],
  ],
  `Table of a worked example: an imagined weaver\'s income falls from ${WEAVE.before} to ${WEAVE.after} rupees a year, a fall of ${WEAVE.before - WEAVE.after} rupees, which is ${WEAVE_FALL} per cent`,
  'Imagined figures.',
);
const vGaps = flow('LR', ['Hardly any capital goods industry', 'Machines must be imported', 'New industry slow and costly to start', 'Small public sector: railways, power, communication, ports'], 'Flow: hardly any capital goods industry meant machines had to be imported, so new industry was slow and costly; the public sector was small, limited to railways, power, communication and ports', 'The weak base of industry');
const vSummary1 = table(
  ['Area', 'State in 1947'],
  [
    ['Aim of colonial policy', 'Raw materials out, British goods in'],
    ['Income', 'Low; growth under 2 per cent a year, per head about half a per cent'],
    ['Agriculture', 'Main occupation, but stagnant: zamindari, low technology, little irrigation'],
    ['Industry', 'Handicrafts declined; few modern mills; no capital goods base'],
  ],
  'Summary table of Part 1: colonial aims, low income and slow growth, stagnant agriculture and weak industry in 1947',
);
const vTrade = table(
  ['India exported (mainly)', 'India imported (mainly)'],
  [
    ['Raw cotton, raw silk, wool', 'Cotton, silk and woollen cloth'],
    ['Jute, indigo, sugar', 'Light machinery and iron goods'],
  ],
  'Table of the composition of colonial India\'s trade: exports were mainly primary products such as raw cotton, silk, wool, jute, indigo and sugar; imports were mainly finished cloth, light machinery and iron goods',
);
const vMonopoly = flow('LR', ['British control of exports and imports', 'More than half of trade with Britain', 'Rest mainly with China, Ceylon, Persia', 'Suez Canal (1869) cuts freight time and cost'], 'Flow: British control of trade, more than half of it with Britain, the rest mainly with China, Ceylon and Persia, and the Suez Canal of 1869 cutting freight time and cost', 'Direction of trade');
const vDrain = flow('LR', ['Export surplus earned', 'Pays for colonial office in Britain', 'Pays for wars and invisible imports', 'No gold or silver comes in', 'Shortages of grain, cloth, kerosene at home'], 'Flow of the drain: the export surplus pays for the colonial office in Britain, wars and invisible imports, no gold or silver comes in, and shortages of grain, cloth and kerosene persist', 'Why a surplus became a drain');
const vTradeWE = table(
  ['Step', 'Working (imagined district port, ₹ lakh)'],
  [
    ['Exports', String(WX.x)],
    ['Imports', String(WX.m)],
    ['Export surplus', `${WX.x} − ${WX.m} = ${WXs}`],
    ['Interpret', 'Surplus sent abroad, no bullion in → drain'],
  ],
  `Table of a worked example: an imagined district port exports ${WX.x} and imports ${WX.m} lakh rupees of goods, an export surplus of ${WXs}, which is interpreted as a drain because no bullion came in`,
  'Imagined figures.',
);
// Schematic demographic transition: birth and death rates before and after 1921 (illustrative, not data).
const vDemo = (() => {
  const s = new Svg(600, 300);
  const ch = s.chart({ x0: 1881, x1: 1951, y0: 0, y1: 60, left: 70, top: 30, width: 470, height: 210, xLabel: 'Year', yLabel: 'Per thousand per year' });
  const birth = (x) => 46 - (x - 1881) * 0.04;
  const death = (x) => (x <= 1921 ? 42 + 2 * Math.sin((x - 1881) / 3) : 42 - (x - 1921) * 0.45);
  ch.fn(birth, 1881, 1951, { color: 'accent', sw: 2.5 });
  ch.fn(death, 1881, 1951, { color: 'muted', sw: 2.5 }, 140);
  s.line(ch.X(1921), ch.Y(0), ch.X(1921), ch.Y(58), { sw: 1.4, dash: true });
  ch.label([1921, 58], '1921: the great divide', { dy: -6, size: 12 });
  ch.label([1890, birth(1890)], 'Birth rate', { dy: -14, size: 13, color: 'accent' });
  ch.label([1941, death(1941)], 'Death rate', { dy: 16, size: 13, color: 'muted' });
  ch.label([1901, 12], 'Stage 1: both high', { size: 12 });
  ch.label([1937, 12], 'Stage 2: death rate falls', { size: 12 });
  for (const y of [1881, 1901, 1921, 1941]) ch.xTick(y, String(y));
  ch.yTick(20, '20').yTick(40, '40');
  return s.visual('Schematic line chart of birth and death rates from 1881 to 1951: before 1921 both are high and close, so population grows slowly; after 1921 the death rate falls while the birth rate stays high, so population grows steadily', 'Schematic only (shapes, not actual data): 1921 separates the first and second stages.');
})();
const vIndicators = table(
  ['Indicator, around 1947', 'Approximate level'],
  [
    ['Overall literacy', 'Less than 16 per cent'],
    ['Female literacy', 'About 7 per cent'],
    ['Life expectancy at birth', 'About 32 years'],
    ['Infant mortality', 'Over 200 per thousand live births'],
  ],
  'Table of approximate demographic indicators around 1947: overall literacy below 16 per cent, female literacy about 7 per cent, life expectancy about 32 years, infant mortality over 200 per thousand live births',
  'Commonly cited approximate values.',
);
const vOcc = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 4, y0: 0, y1: 80, left: 70, top: 30, width: 440, height: 210, xLabel: 'Sector', yLabel: 'Share of workforce (per cent)' });
  OCC.forEach(([name, a, b], i) => {
    const x = i + 1, m = mid(a, b);
    const x0 = ch.X(x - 0.32), x1 = ch.X(x + 0.32);
    s.rect(x0, ch.Y(m), x1 - x0, ch.Y(0) - ch.Y(m), { fill: i === 0 ? 'accent' : 'fill', color: 'accent', sw: 1.5, rx: 2 });
    ch.label([x, m], a === 9 ? 'about 10' : `${a}–${b}`, { dy: -12, size: 13, bold: true });
    ch.xTick(x, name);
  });
  ch.yTick(20, '20').yTick(40, '40').yTick(60, '60');
  return s.visual('Bar chart of the approximate shares of India\'s workforce around 1947: agriculture 70 to 75 per cent, manufacturing about 10 per cent and services 15 to 20 per cent', 'Approximate, rounded shares as commonly cited; bars drawn at mid-points.');
})();
const vOccWE = table(
  ['Step', 'Working (imagined district)'],
  [
    ['Workers in agriculture', inr(WD.agri)],
    ['All workers', inr(WD.total)],
    ['Share', `${inr(WD.agri)} ÷ ${inr(WD.total)} × 100 = ${WDp}%`],
    ['Compare', 'Inside the all-India range of 70–75 per cent'],
  ],
  `Table of a worked example: ${inr(WD.agri)} of ${inr(WD.total)} workers in agriculture gives a share of ${WDp} per cent, inside the all-India range of 70 to 75 per cent`,
  'Imagined figures.',
);
const vRegional = table(
  ['Regions (approximate pattern)', 'Share of agriculture in the workforce'],
  [
    ['Parts of the Madras, Bombay and Bengal presidencies', 'Fell slightly'],
    ['Orissa, Rajasthan, Punjab', 'Rose'],
  ],
  'Table of the regional pattern: in parts of the Madras, Bombay and Bengal presidencies the share of agriculture in the workforce fell slightly, while in Orissa, Rajasthan and Punjab it rose',
  'Growing regional variation.',
);
const vRail = table(
  ['Railways (from 1853): gains', 'Railways: costs and limits'],
  [
    ['Long-distance travel became possible', 'Built to serve administration and export trade'],
    ['Broke geographical and cultural barriers', 'Carried British goods inland, hurting crafts'],
    ['Widened markets for crops', 'Helped commercialisation more than the cultivator'],
  ],
  'Two-column table of the railways: gains were long-distance travel, breaking geographical and cultural barriers and wider markets; costs were a colonial purpose, carrying British goods inland and favouring commercialisation over the cultivator',
);
const vOtherInfra = table(
  ['Infrastructure', 'Main colonial purpose', 'Limitation'],
  [
    ['Roads', 'Moving troops; linking the interior to railway stations and ports', 'Few all-weather roads in villages'],
    ['Inland waterways', 'Cheap carriage of goods', 'Some, like a coastal canal in Orissa, were uneconomical'],
    ['Posts', 'Public communication', 'Service remained inadequate'],
    ['Electric telegraph', 'Maintaining law and order', 'Expensive; served the state first'],
  ],
  'Table of other colonial infrastructure: roads for troops and links to stations and ports, with few all-weather village roads; waterways, some uneconomical; posts, inadequate; and the electric telegraph, mainly for law and order',
);
const vFiveMark = flow('LR', ['Read the command word (explain, evaluate)', 'Plan five areas or five points', 'One bold key term per point', 'Add one fact or example each', 'End with a judgement if asked to evaluate'], 'Flow for structuring a five-mark answer: read the command word, plan five points, put one key term in bold per point, add a fact or example to each, and end with a judgement when asked to evaluate', 'A five-mark plan');
const vSummary2 = table(
  ['Area', 'State in 1947'],
  [
    ['Foreign trade', 'Raw materials out, finished goods in; British monopoly; surplus drained'],
    ['Demography', 'High birth and death rates; literacy under 16 per cent; life expectancy about 32'],
    ['Occupations', 'About 70–75 per cent in agriculture; regional variation grew'],
    ['Infrastructure', 'Railways, ports, posts, telegraph: built for colonial purposes; a mixed legacy'],
  ],
  'Summary table of Part 2: trade, demography, occupational structure and infrastructure in 1947',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Indian Economy on the Eve of Independence — Part 1: Colonial Aims, Agriculture and Industry',
  goals: [
    'Explain the economic aims of colonial rule and why income grew so slowly',
    'Explain the causes of agricultural stagnation, including land settlement and commercialisation',
    'Explain de-industrialisation and the limits of modern industry in 1947',
    'Use evidence from a case or a table to identify features of the colonial economy',
  ],
  slides: [
    sl('title', 'Indian Economy on the Eve of Independence', {
      b: 'Part 1 — **why** colonial rule shaped the economy as it did, and the state of **agriculture** and **industry** in 1947.',
      v: vRoute1,
      n: 'When India became independent in 1947, it inherited an economy shaped by nearly two centuries of colonial rule. To understand the plans and policies that came later, we first need a clear picture of where the country started. In this part we look at the aims of colonial policy, the low level of income, and the state of agriculture and industry.',
    }),
    sl('diagram', 'What colonial policy wanted', {
      b: 'India as a **supplier of raw materials** and a **market** for British manufactures.',
      v: vColonial,
      n: 'Colonial economic policy served the ruling country, not the colony. India was to send raw materials such as cotton, jute and indigo to British factories, and then buy back the finished goods those factories made. This loop explains almost every feature we will study: stagnant farms, declining crafts, trade tied to Britain, and infrastructure built to move goods to the ports.',
    }),
    sl('concept', 'Low national income', {
      b: 'The colonial government never measured national income seriously; private scholars did.',
      v: vEstimates,
      n: 'How poor was colonial India? The government itself made no serious attempt to measure national income. Scholars filled the gap, among them Dadabhai Naoroji, William Digby, Findlay Shirras and R. C. Desai. The estimates of V. K. R. V. Rao are generally treated as the most significant. Their methods differed, but all of them pointed to very low income per person.',
    }),
    sl('concept', 'Very slow growth', {
      b: 'In the first half of the twentieth century, **aggregate real output** grew by **less than 2 per cent** a year, and **output per person** by about **half a per cent**.',
      v: vGrowth,
      n: 'Growth was painfully slow. Total output grew by less than two per cent a year in the first half of the twentieth century. Because population was also rising, output per person grew by only about half a per cent a year. At that pace, living standards hardly changed within a lifetime.',
    }),
    sl('concept', 'Agriculture: the main occupation', {
      b: 'About **85 per cent** of people lived in villages and depended on agriculture, directly or indirectly. Yet the sector **stagnated**: output per acre stayed low.',
      bl: ['Largest sector by people dependent on it', 'Slow growth of output, low productivity', 'Some growth of cash crops in a few areas'],
      n: 'Agriculture was the backbone of colonial India. Roughly eighty five out of every hundred people lived in villages and depended on farming in some way. But this huge sector was stagnant. Output per acre stayed low, and the little growth that took place came from bringing more land under the plough, not from better methods.',
    }),
    sl('diagram', 'Land settlement: who got the surplus?', {
      b: 'Under the **zamindari** system, landlords collected rent and paid fixed revenue to the state.',
      v: vSettle,
      n: 'Why did farming stagnate? Start with the land settlement. In large areas, especially under the permanent settlement in Bengal, zamindars collected rent from the cultivators and paid a fixed revenue to the colonial government. The zamindar kept the difference, so the surplus went to him, not to the tiller. Few zamindars invested in improving the land, and the cultivator had neither the means nor the reason to do so.',
    }),
    sl('check', 'Quick check: revenue terms', {
      b: 'A zamindar must pay a fixed revenue by a fixed date, and the crop fails. What is he likely to do?',
      chk: 'm_revenue_terms',
      n: 'Think about the pressure a fixed deadline creates when the harvest fails. Whose burden does it become?',
    }),
    sl('concept', 'Other causes of stagnation', {
      b: 'Rent pressure, **low technology** and **poor irrigation** worked together.',
      v: vAgriCauses,
      n: 'Land settlement was not the only problem. The terms of revenue were harsh: a fixed sum had to be paid by a fixed date, whatever the harvest. Technology was backward, with wooden ploughs, old seeds and very little fertiliser. And most fields depended on the monsoon, because investment in irrigation and flood control was small. Together these kept yields low.',
    }),
    sl('diagram', 'Commercialisation of agriculture', {
      b: 'Some farmers shifted from **food crops** to **cash crops** for British industry.',
      v: vCommercial,
      n: 'In some regions farmers began growing cash crops such as indigo, jute and cotton, often to feed British mills. This is called commercialisation of agriculture. It raised the output of these crops in a few areas, but the gains went mostly to traders, moneylenders and exporters. Most cultivators stayed poor and indebted, and growing less food made families more exposed to famine.',
    }),
    sl('example', 'Worked example 1: reading a case', {
      b: 'An imagined account describes a village in 1900. Find the features of colonial agriculture it shows.',
      bl: [
        'Step 1 — Underline each **clue** in the passage.',
        'Step 2 — Name the **feature** it shows, using the exact term.',
        'Step 3 — Link the feature to its **effect** on output or on the cultivator.',
      ],
      v: vCaseEvidence,
      n: 'Case questions reward precise matching. Here is an imagined village. Half the crop goes as rent to the landlord\'s agent, so that is the zamindari settlement. Indigo grown for a European planter shows commercialisation. A canal that stays dry shows poor irrigation, and the grandfather\'s wooden plough shows low technology. Quote the clue, name the feature, and add its effect.',
    }),
    sl('check', 'Quick check: causes of stagnation', {
      b: 'Which one was **NOT** a cause of agricultural stagnation in colonial India?',
      chk: 'm_stagnation_cause',
      n: 'One of these options belongs to a much later period of Indian farming. Spot it.',
    }),
    sl('diagram', 'Industry: de-industrialisation', {
      b: 'Traditional **handicrafts declined**, and **modern industry did not grow** enough to replace them.',
      v: vDeind,
      n: 'Now industry. India was once famous for its handicrafts, especially fine cotton and silk textiles. Under colonial rule, cheap machine-made cloth from British mills entered the country at low duty and took away the craftsmen\'s market. Artisans lost their work, and very few modern factories came up to employ them. This double process, decline without replacement, is called de-industrialisation.',
    }),
    sl('two-column', 'The two-fold motive', {
      cols: [
        '**Raw materials**\n\nCheap cotton, jute, indigo and silk for Britain\'s growing factories.',
        '**Market**\n\nA vast Indian market for British cloth and other manufactured goods.',
      ],
      v: vMotive,
      n: 'Why did colonial policy allow, and even encourage, the decline of Indian crafts? There were two motives. First, India was to be a source of cheap raw materials for Britain\'s expanding industries. Second, India was to be a large market for the finished goods those industries produced. Thriving Indian crafts would have competed with both aims.',
    }),
    sl('check', 'Quick check: a weaver\'s loss', {
      b: 'An imagined weaver family in Bengal loses its customers in the 1880s. Why?',
      chk: 'm_handicraft_why',
      n: 'Ask which change made the weaver\'s cloth look expensive to buyers.',
    }),
    sl('concept', 'Modern industry: a slow start', {
      b: 'Modern factories came up from the **second half of the nineteenth century**, but growth stayed slow.',
      v: vModern,
      n: 'Modern industry did begin, but slowly. Cotton textile mills came up in western India, mostly owned by Indians. Jute mills grew around Bengal, mostly owned by foreigners. The Tata Iron and Steel Company was incorporated in nineteen hundred and seven. Sugar, cement and paper factories followed later. Even so, industry\'s share of national output remained small.',
    }),
    sl('example', 'Worked example 2: measuring a craftsman\'s loss', {
      b: `An imagined weaver earned ₹${WEAVE.before} a year before mill cloth reached his town and ₹${WEAVE.after} after. Find the percentage fall.`,
      bl: [
        `Step 1 — Fall = ${WEAVE.before} − ${WEAVE.after} = ₹${WEAVE.before - WEAVE.after}.`,
        `Step 2 — Percentage fall = fall ÷ original × 100 = ${WEAVE_FALL}%.`,
        'Step 3 — Interpret: a loss of more than a third of income pushes the family towards farm labour or debt.',
      ],
      v: vWeaver,
      n: 'Let us put a number on de-industrialisation for one imagined weaver. His income fell from two hundred and forty rupees a year to one hundred and fifty. The fall is ninety rupees. Divide by the original income and multiply by one hundred, and you get thirty seven and a half per cent. Always finish with the meaning: such a loss pushed artisans back to the land.',
    }),
    sl('check', 'Quick check: your turn', {
      b: 'Try the percentage fall for the weaver in the practice question.',
      chk: 'n_weaver',
      n: 'Use the same two steps: find the fall, then divide by the original income and multiply by one hundred.',
    }),
    sl('diagram', 'The weak base of industry', {
      b: 'Almost **no capital goods industry**, and a **small public sector**.',
      v: vGaps,
      n: 'Two more gaps mattered. India had hardly any capital goods industry, the industry that makes machines and machine tools. So every new factory needed imported machinery, which made industrial growth slow and costly. The public sector was also small, limited mainly to railways, power, communication, ports and a few departmental undertakings.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Colonial policy made India a supplier of raw materials and a market for British goods. Income was low and grew very slowly. Agriculture employed most people but stagnated because of the zamindari system, harsh revenue terms, poor technology and little irrigation. Handicrafts declined, modern industry stayed small, and there was almost no capital goods base.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define **de-industrialisation** with both halves: crafts declined **and** modern industry did not replace them.',
        'For stagnation, give the **cause and its effect**: zamindari → rent to landlords → no investment.',
        'Commercialisation is **not** prosperity: say who gained (traders, exporters) and who did not.',
        'Quote figures as **approximate**: growth under 2 per cent a year, per head about half a per cent.',
        'Jute mills: Bengal, mainly foreign-owned; cotton mills: western India, mainly Indian-owned.',
      ],
      n: 'A few tips for the board paper. When you define de-industrialisation, write both halves: the decline of crafts and the failure of modern industry to replace them. For every cause of stagnation, add its effect. Never call commercialisation a success without saying who gained. Quote figures as approximate. And remember which region and which owners went with cotton and jute mills.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Indian Economy on the Eve of Independence — Part 2: Trade, People and Infrastructure',
  goals: [
    'Describe the composition and direction of foreign trade and explain the drain of the export surplus',
    'Describe the demographic condition, including the significance of 1921',
    'Interpret the occupational structure and its regional variation',
    'Appraise colonial infrastructure in a balanced way',
  ],
  slides: [
    sl('title', 'Trade, People and Infrastructure in 1947', {
      b: 'Part 2 — **foreign trade**, **population**, **occupations** and **infrastructure**, then the overall picture.',
      v: vRoute2,
      n: 'In Part 2 we look outward and then at the people. How did India trade with the world, and who gained from it? What did population, literacy and health look like? Where did people work? And what kind of roads, railways and communications did independent India inherit?',
    }),
    sl('concept', 'Composition of foreign trade', {
      b: 'India became an **exporter of primary products** and an **importer of finished goods**.',
      v: vTrade,
      n: 'Look at what crossed the ports. India sent out primary products: raw cotton, raw silk, wool, jute, indigo and sugar. It brought in finished consumer goods such as cotton, silk and woollen cloth, along with light machinery from British factories. This is exactly the colonial loop from Part 1, now seen at the docks.',
    }),
    sl('diagram', 'Direction of trade and the Suez Canal', {
      b: 'Britain kept a **monopoly**: more than half of India\'s trade was with Britain.',
      v: vMonopoly,
      n: 'Britain controlled India\'s exports and imports, so more than half of all trade went to or came from Britain. The rest was mainly with China, Ceylon and Persia. The opening of the Suez Canal in eighteen sixty nine shortened the sea route between Britain and India, making freight cheaper and faster and tightening this control.',
    }),
    sl('check', 'Quick check: the canal', {
      b: 'How did the opening of the Suez Canal affect India\'s trade?',
      chk: 'm_suez',
      n: 'Think about distance, cost, and whose goods could now move more cheaply.',
    }),
    sl('diagram', 'A surplus that became a drain', {
      b: 'Exports exceeded imports, but the **surplus left the country**.',
      v: vDrain,
      n: 'India usually exported more than it imported, so it earned an export surplus. Normally that would add to a country\'s wealth. But this surplus paid for the colonial government\'s office in Britain, for wars, and for invisible imports such as shipping and insurance. No gold or silver flowed in, and shortages of grain, cloth and kerosene continued. That is why it is called a drain of wealth.',
    }),
    sl('example', 'Worked example 1: calculating and interpreting a surplus', {
      b: `An imagined district port records exports of ₹${WX.x} lakh and imports of ₹${WX.m} lakh in a year, and no bullion arrives.`,
      bl: [
        `Step 1 — Export surplus = exports − imports = ${WX.x} − ${WX.m} = ₹${WXs} lakh.`,
        'Step 2 — Ask where it went: the colonial establishment, wars, invisible imports.',
        'Step 3 — Conclude: a surplus with no inflow of wealth is a **drain**.',
      ],
      v: vTradeWE,
      n: 'Here is how to handle a trade question. Subtract imports from exports to find the surplus: seventy four minus fifty one gives twenty three lakh rupees. Then interpret it. If no gold or silver came in, the surplus was used up abroad. The marks are in the second step: naming where the surplus went and calling it a drain.',
    }),
    sl('diagram', 'Population: 1921, the great divide', {
      b: 'The first census was in **1881**. Before **1921**, growth was slow and uneven; after it, steady.',
      v: vDemo,
      n: 'The first census was taken in eighteen eighty one. Until nineteen twenty one, both birth and death rates were high, so population grew slowly and unevenly: the first stage of the demographic transition. After nineteen twenty one the death rate began to fall while the birth rate stayed high, so population grew steadily. That is why nineteen twenty one is called the year of the great divide. The chart shows shapes only, not exact data.',
    }),
    sl('check', 'Quick check: which stage?', {
      b: 'A region has a birth rate of 46 and a death rate of 44 per thousand. How is its population changing?',
      chk: 'm_demo_stage',
      n: 'Subtract the death rate from the birth rate. Is that a small or a large gap?',
    }),
    sl('concept', 'The quality of life', {
      b: 'Low literacy, short lives and very high infant mortality.',
      v: vIndicators,
      n: 'The social indicators were grim. Fewer than one in six people could read and write, and among women only about seven in a hundred. Life expectancy at birth was only about thirty two years. Infant mortality was over two hundred per thousand live births. Public health facilities were scarce, and water borne and air borne diseases spread widely. Poverty was extensive.',
    }),
    sl('diagram', 'Occupational structure', {
      b: '**Occupational structure** = how the workforce is spread across sectors.',
      v: vOcc,
      n: 'Where did people work? Agriculture employed the largest share of the workforce, about seventy to seventy five per cent. Manufacturing employed only about ten per cent, and services about fifteen to twenty per cent. An economy where three out of four workers are on the land, with low productivity, is a poor, agrarian economy.',
    }),
    sl('example', 'Worked example 2: a district\'s workforce', {
      b: `An imagined district has ${inr(WD.total)} workers, ${inr(WD.agri)} of them in agriculture. Find the share and compare it with India.`,
      bl: [
        `Step 1 — Share = ${inr(WD.agri)} ÷ ${inr(WD.total)} × 100 = ${WDp}%.`,
        'Step 2 — Compare: inside the all-India range of about 70–75 per cent.',
        'Step 3 — Conclude: a typical agrarian district of the time.',
      ],
      v: vOccWE,
      n: 'Data questions often ask you to compute a share and compare. Divide the agricultural workers by all workers and multiply by one hundred: here that gives seventy three per cent. Then compare with the all India range of seventy to seventy five per cent and draw a conclusion: this imagined district is typical of its time.',
    }),
    sl('check', 'Quick check: a province', {
      b: 'Find the share of agriculture in the workforce of an imagined province.',
      chk: 'n_province',
      n: 'Divide, multiply by one hundred, and check whether your answer looks reasonable for that period.',
    }),
    sl('concept', 'Growing regional variation', {
      b: 'The share of agriculture **fell slightly** in some regions and **rose** in others.',
      v: vRegional,
      n: 'The national figures hide differences between regions. In parts of the Madras, Bombay and Bengal presidencies, the share of workers in agriculture fell slightly as some industry and services grew. In regions such as Orissa, Rajasthan and Punjab, the share actually rose. So regional variation in the occupational structure was widening.',
    }),
    sl('two-column', 'Railways: a mixed legacy', {
      cols: [
        '**Gains**\n\nLong-distance travel; geographical and cultural barriers broken; wider markets.',
        '**Costs**\n\nBuilt for administration and export trade; carried British goods inland; aided commercialisation more than the cultivator.',
      ],
      v: vRail,
      n: 'The railways, which began carrying passengers in eighteen fifty three, are the best known colonial infrastructure. They made long distance travel possible and helped break geographical and cultural barriers. But their routes were planned to move raw materials to the ports and British goods into the interior, which hurt crafts. A balanced answer gives both sides.',
    }),
    sl('concept', 'Roads, waterways, posts and telegraph', {
      b: 'Built mainly for **colonial purposes**; coverage of villages stayed poor.',
      v: vOtherInfra,
      n: 'Roads were built mainly to move troops and to link the interior to railway stations and ports, so most villages lacked all weather roads. Some inland waterways, such as a coastal canal in Orissa, turned out to be uneconomical. Posts served the public but remained inadequate. The electric telegraph was expanded mainly to help maintain law and order.',
    }),
    sl('check', 'Quick check: railways', {
      b: 'Which was a **positive** effect of the railways in colonial India?',
      chk: 'm_rail_effect',
      n: 'Three of these options are claims the evidence does not support. Find the one that does hold.',
    }),
    sl('example', 'Worked example 3: planning a five-mark answer', {
      b: 'Question: "Critically appraise the impact of British rule on the Indian economy."',
      bl: [
        'Step 1 — Plan five areas: agriculture, industry, trade, demography, infrastructure.',
        'Step 2 — One **key term** each: zamindari, de-industrialisation, drain, 1921, railways.',
        'Step 3 — Add one fact or effect to each point.',
        'Step 4 — "Critically appraise" needs a **conclusion**: weak and stagnant economy, with a usable infrastructure base.',
      ],
      v: vFiveMark,
      n: 'Long answers in this chapter are easy to plan if you use the five areas as your five points. Give each point one key term and one fact. Watch the command word: appraise or evaluate means you must end with a judgement, such as a stagnant economy that nevertheless left a base of railways and ports.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. India exported raw materials and imported finished goods, mostly through Britain, and its export surplus was drained away. Population grew steadily after nineteen twenty one, but literacy and life expectancy were very low. About seventy to seventy five per cent of workers were in agriculture. Infrastructure was built for colonial purposes and left a mixed legacy.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Trade: write **composition**, **direction** and the **drain** as three separate points.',
        '1921: explain **why** it is the great divide (death rate fell, birth rate stayed high).',
        'Give demographic figures as **approximate**: literacy under 16 per cent, life expectancy about 32 years.',
        'Infrastructure questions usually want **both sides**; end with a judgement.',
        'Dates to keep straight: 1853 railways, 1869 Suez Canal, 1881 first census, 1907 TISCO, 1921 great divide.',
      ],
      n: 'Final tips. Treat composition, direction and the drain as separate points in any trade answer. For nineteen twenty one, always explain the reason. Quote demographic figures as approximate values. Infrastructure questions want gains and costs with a judgement. And keep the five key dates straight, because they make easy one mark questions.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Indian Economy on the Eve of Independence — Notes',
  sections: [
    {
      h: '1. Colonial aims and low level of development',
      t: 1,
      b: 'Colonial economic policy aimed to make India a **supplier of raw materials** to British industry and a **market for British finished goods**. Development of the Indian economy was not its concern.\n\n**National income:** the colonial government made no serious estimate. Private estimates were made by **Dadabhai Naoroji, William Digby, Findlay Shirras, V. K. R. V. Rao** and **R. C. Desai**; Rao\'s are generally regarded as the most significant.\n\n**Growth (first half of the twentieth century, approximate):** aggregate real output under **2 per cent** a year; output per person about **0.5 per cent** a year.',
      terms: [
        ['Colonial economy', 'An economy run to serve the interests of the ruling country rather than its own people.'],
        ['Per capita income', 'National income divided by population; an average income per person.'],
      ],
      v: vColonial,
      vs: [vEstimates],
    },
    {
      h: '2. Agriculture: largest and stagnant',
      t: 1,
      b: 'About **85 per cent** of people lived in villages and depended on agriculture. Output grew slowly and productivity was low.\n\n**Causes of stagnation:**\n1. **Land settlement** — under **zamindari** (permanent settlement in Bengal), zamindars collected rent and paid fixed revenue; the surplus went to them, and few invested in the land.\n2. **Revenue terms** — fixed sums by fixed dates, even when crops failed; tenants were squeezed.\n3. **Low technology** — old tools, little fertiliser.\n4. **Poor irrigation and flood control.**\n5. **Commercialisation** — a shift to cash crops (indigo, jute, cotton) for British industry, which raised output in a few areas but enriched traders and exporters more than cultivators.',
      terms: [
        ['Zamindari system', 'A land settlement in which landlords collected rent from cultivators and paid revenue to the state.'],
        ['Commercialisation of agriculture', 'Growing crops for sale in the market (cash crops) rather than for the family\'s own use.'],
        ['Stagnation', 'Little or no growth over a long period.'],
      ],
      v: vSettle,
      vs: [vAgriCauses, vCommercial],
    },
    {
      h: '3. Industry: decline of crafts, slow modern growth',
      t: 1,
      b: '**De-industrialisation:** traditional handicrafts declined and modern industry did not replace them. Cheap machine-made British goods, imported at low duty, took the craftsmen\'s market; artisans were pushed into farming or unemployment.\n\n**Two-fold motive:** cheap raw materials for Britain, and a large market for British manufactures.\n\n**Modern industry:** cotton mills in western India (mainly Indian-owned) and jute mills in Bengal (mainly foreign-owned) from the second half of the nineteenth century; **TISCO, 1907**; sugar, cement and paper later. Industry\'s share of output stayed small.\n\n**Weak base:** almost **no capital goods industry**; the **public sector** was limited to railways, power, communication, ports and some departmental undertakings.',
      terms: [
        ['De-industrialisation', 'The decline of existing industries without new industries taking their place.'],
        ['Capital goods', 'Machines and tools used to produce other goods.'],
      ],
      v: vDeind,
      vs: [vModern, vGaps],
    },
    {
      h: '4. Foreign trade and the drain',
      t: 1,
      b: '**Composition:** exporter of **primary products** (raw cotton, raw silk, wool, jute, indigo, sugar); importer of **finished goods** (cloth, light machinery).\n\n**Direction:** a British **monopoly** — more than half of India\'s trade was with Britain; the rest mainly with China, Ceylon and Persia. The **Suez Canal (1869)** cut the time and cost of shipping.\n\n**Export surplus and drain:** exports exceeded imports, but the surplus paid for the colonial office in Britain, wars and invisible imports. No gold or silver came in, and grain, cloth and kerosene were scarce at home.',
      terms: [
        ['Export surplus', 'The excess of the value of exports over the value of imports.'],
        ['Drain of wealth', 'The transfer of India\'s surplus to Britain without any return to India.'],
      ],
      v: vTrade,
      vs: [vMonopoly, vDrain],
    },
    {
      h: '5. Demographic condition',
      t: 1,
      b: 'The **first census** was taken in **1881**. Until **1921**, birth and death rates were both high and growth was slow (first stage of the demographic transition). After 1921 the death rate fell while the birth rate stayed high, so population grew steadily: **1921 is the year of the great divide**.\n\n**Approximate indicators:** literacy under **16 per cent** (women about **7 per cent**); life expectancy about **32 years**; infant mortality **over 200** per thousand. Public health facilities were scarce; diseases and famines were frequent; poverty was widespread.',
      terms: [
        ['Demographic transition', 'The change from high birth and death rates to low ones as a country develops.'],
        ['Infant mortality rate', 'Deaths of infants under one year per thousand live births.'],
        ['Life expectancy', 'The average number of years a newborn is expected to live.'],
      ],
      v: vDemo,
      vs: [vIndicators],
    },
    {
      h: '6. Occupational structure',
      t: 1,
      b: '**Occupational structure** is the distribution of the workforce across sectors. Around 1947, approximately: **agriculture 70–75 per cent**, **manufacturing about 10 per cent**, **services 15–20 per cent**.\n\n**Regional variation:** the share of agriculture fell slightly in parts of the Madras, Bombay and Bengal presidencies, but rose in Orissa, Rajasthan and Punjab.',
      terms: [
        ['Occupational structure', 'The distribution of the working population among different occupations or sectors.'],
      ],
      v: vOcc,
      vs: [vRegional],
    },
    {
      h: '7. Infrastructure: a mixed legacy',
      t: 1,
      b: '**Railways** (passenger service from **1853**): long-distance travel, broke geographical and cultural barriers, wider markets; but built for administration and export trade, carried British goods inland and aided commercialisation.\n\n**Roads** served troops and linked the interior to stations and ports; most villages had no all-weather roads. **Inland waterways** were developed, but some (like a coastal canal in Orissa) were uneconomical. **Posts** remained inadequate; the **electric telegraph** served mainly law and order.\n\n**Overall:** independent India inherited a poor, stagnant economy, with a usable but colonially shaped base of infrastructure.',
      terms: [
        ['Infrastructure', 'Basic facilities such as transport, power and communication that support economic activity.'],
      ],
      v: vRail,
      vs: [vOtherInfra],
    },
  ],
  tips: '**Common mistakes**\n- Defining de-industrialisation as "no industry": it is the **decline of crafts without replacement** by modern industry.\n- Calling commercialisation a gain for farmers: the gains went mainly to **traders and exporters**.\n- Treating the export surplus as wealth: it was a **drain**.\n- Writing 1881 as the great divide: **1881** = first census; **1921** = great divide.\n- Giving precise figures as exact: say **about 32 years**, **under 16 per cent**, **70–75 per cent**.\n- One-sided infrastructure answers: give **gains and costs**, then judge.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2 marks: two points, or a definition and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five points with key terms and facts (80–120 words); "evaluate" needs a judgement.\n- Case-based: quote the clue from the passage, then name the feature.\n\nAll cases and tables in SOYL practice are imagined; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Main aim of colonial economic policy', 'Make India a **supplier of raw materials** and a **market for British finished goods**.', 'concept', 1],
  ['Whose colonial-era income estimates are regarded as most significant?', '**V. K. R. V. Rao**.', 'fact', 1],
  ['Name two other estimators of colonial India\'s income', 'Dadabhai Naoroji, William Digby (also Findlay Shirras, R. C. Desai).', 'fact', 1],
  ['Growth in the first half of the twentieth century', 'Aggregate output **under 2 per cent** a year; per person about **half a per cent**.', 'fact', 1],
  ['Share of people depending on agriculture', 'About **85 per cent**, directly or indirectly.', 'fact', 1],
  ['**Zamindari** system', 'Landlords collected rent from cultivators and paid fixed revenue to the state; they kept the surplus.', 'definition', 1],
  ['Why did zamindars not improve the land?', 'Their interest was in **collecting rent**, not investing; tillers lacked the means.', 'concept', 1],
  ['**Commercialisation of agriculture**', 'Shift from food crops to **cash crops** (indigo, jute, cotton), largely for British industry.', 'definition', 1],
  ['Who gained from commercialisation?', 'Mainly **traders, moneylenders and exporters**, not most cultivators.', 'concept', 1],
  ['Four causes of agricultural stagnation', 'Land settlement, harsh revenue terms, low technology, poor irrigation.', 'concept', 1],
  ['**De-industrialisation**', 'Decline of **handicrafts** without modern industry replacing them.', 'definition', 1],
  ['Two-fold motive behind de-industrialisation', 'Cheap **raw materials** for Britain; a **market** for British goods.', 'concept', 1],
  ['Cotton mills vs jute mills', 'Cotton: **western India**, mainly Indian-owned. Jute: **Bengal**, mainly foreign-owned.', 'fact', 1],
  ['TISCO was incorporated in', '**1907**.', 'fact', 1],
  ['Why was the lack of capital goods serious?', 'Every new factory needed **imported machines**, so growth was slow and costly.', 'concept', 1],
  ['Public sector in 1947', 'Small: **railways, power, communication, ports**, some departmental undertakings.', 'fact', 1],
  ['Colonial India exported mainly', '**Primary products**: raw cotton, silk, wool, jute, indigo, sugar.', 'fact', 1],
  ['Colonial India imported mainly', '**Finished goods**: cloth, light machinery.', 'fact', 1],
  ['Share of India\'s trade with Britain', '**More than half**; the rest mainly with China, Ceylon, Persia.', 'fact', 1],
  ['Suez Canal: year and effect', '**1869**; cut freight time and cost between Britain and India.', 'fact', 1],
  ['Why was the export surplus a **drain**?', 'It paid for the colonial office in Britain, wars and invisible imports; **no bullion** came in.', 'concept', 1],
  ['First census', '**1881**.', 'fact', 1],
  ['Why is **1921** the great divide?', 'After 1921 the **death rate fell** while the birth rate stayed high: steady population growth.', 'concept', 1],
  ['Literacy around 1947', 'Under **16 per cent** overall; women about **7 per cent**.', 'fact', 1],
  ['Life expectancy around 1947', 'About **32 years**.', 'fact', 1],
  ['Infant mortality around 1947', '**Over 200** per thousand live births.', 'fact', 1],
  ['Occupational structure around 1947', 'Agriculture **70–75%**, manufacturing about **10%**, services **15–20%**.', 'fact', 1],
  ['Regional variation in occupations', 'Agriculture\'s share fell slightly in parts of Madras, Bombay, Bengal; rose in Orissa, Rajasthan, Punjab.', 'fact', 1],
  ['First passenger train in India', '**1853**.', 'fact', 1],
  ['One gain and one cost of railways', 'Gain: long-distance travel, barriers broken. Cost: carried British goods inland, hurting crafts.', 'exam-tip', 1],
  ['Main purpose of the electric telegraph', 'Maintaining **law and order**.', 'fact', 1],
  ['Five key dates', '1853 railways · 1869 Suez · 1881 census · 1907 TISCO · 1921 great divide.', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Indian Economy on the Eve of Independence',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_aim', 'm_deind', 'm_exports', 'ar_deind'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_stagnation', 's_trade', 's3_drain'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_agriculture', 'l_infra'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_letter'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Indian Economy on the Eve of Independence',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_zamindari', 'm_commercial', 'm_capital_goods', 'm_monopoly', 'm_surplus_use', 'm_1921', 'm_occ', 'm_infra_purpose', 'ar_surplus', 'ar_mortality'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_deind', 's_demo', { attempt: 1, keys: ['s_commercial', 's_rail_mixed'] }, 's3_industry', { attempt: 1, keys: ['s3_demo_eval', 's3_infra'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_overall', { attempt: 1, keys: ['l_industry', 'l_trade'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_occupation', 'cb_trade'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-12-economics-ch06 only (agriculture, industry, foreign trade, demography, occupational structure and infrastructure under colonial rule)',
    originality: 'every case, letter, report and table written for this chapter (imagined people, villages, ports and figures, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build (province ${inr(PROV.agri)}/${inr(PROV.total)} = ${PROV_AGRI} per cent; exports ${TRADE.x} − imports ${TRADE.m} = ${SURPLUS}; weaver ${WEAVE.before} → ${WEAVE.after} = ${WEAVE_FALL} per cent fall; district ${WD.agri}/${WD.total} = ${WDp} per cent); all-India values given only as commonly cited approximations`,
    facts: 'about 85 per cent dependent on agriculture; workforce 70–75 / about 10 / 15–20 per cent; growth under 2 per cent and about 0.5 per cent per head; literacy under 16 per cent (women about 7), life expectancy about 32, infant mortality over 200 per thousand; 1853 railways, 1869 Suez, 1881 census, 1907 TISCO, 1921 great divide',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
