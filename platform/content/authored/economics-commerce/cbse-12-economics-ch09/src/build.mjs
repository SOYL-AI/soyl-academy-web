// Build CBSE 12 Economics ch09 Human Capital Formation in India. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch09', 'economics-commerce');
const {
  inr, ITI, ITI_GAIN_M, ITI_PAYBACK, MIG, MIG_NET_M, MIG_NET_Y,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (computed, never typed)
// Deck worked example 1: imagined tailoring course (₹ a month).
const WT = { cost: 24000, before: 6000, after: 9000 };
const WT_GAIN = WT.after - WT.before; // 3,000
const WT_PAY = WT.cost / WT_GAIN; // 8 months
const WT_5Y = WT_GAIN * 12 * 5 - WT.cost; // net gain over five years
// Deck 2 worked example 1: imagined state Tapti Pradesh (₹ crore).
const TP = { sdp: 250000, spend: 50000, edu: 8000 };
const TP_SHARE_SPEND = Math.round((1000 * TP.edu) / TP.spend) / 10; // 16
const TP_SHARE_SDP = Math.round((1000 * TP.edu) / TP.sdp) / 10; // 3.2
const TP_AT6 = (6 * TP.sdp) / 100; // 15,000
const TP_GAP = TP_AT6 - TP.edu; // 7,000
// Deck 2 worked example 2: imagined block cohort and literacy.
const WB = { joined: 500, completed: 410, male: 79, female: 66 };
const WB_DROP = WB.joined - WB.completed; // 90
const WB_DROP_PCT = Math.round((1000 * WB_DROP) / WB.joined) / 10; // 18
const WB_GAP = WB.male - WB.female; // 13
if (WT_GAIN !== 3000 || WT_PAY !== 8 || WT_5Y !== 156000 || TP_SHARE_SPEND !== 16 || TP_SHARE_SDP !== 3.2 || TP_AT6 !== 15000 || TP_GAP !== 7000 || WB_DROP !== 90 || WB_DROP_PCT !== 18 || WB_GAP !== 13)
  throw new Error('figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What is human capital?', 'Five sources', 'Human vs physical capital', 'Human capital and growth', 'Human development', 'Knowledge economy'], 'Route map of Part 1: what human capital is, its five sources, how it differs from physical capital, its link with growth, human development and the knowledge economy', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Why the State steps in', 'Measuring education spending', 'The 6 per cent goal', 'Right to Education', 'Achievements and problems', 'The way forward'], 'Route map of Part 2: why the State steps in, measuring education spending, the 6 per cent goal, the right to education, achievements and problems, and the way forward', 'Part 2 at a glance');
const vWhatHC = table(
  ['Kind of capital', 'Examples', 'Where it lives'],
  [
    ['Physical capital', 'Machines, tools, buildings, roads', 'Outside people; can be sold separately'],
    ['Human capital', 'Skill, knowledge, expertise, good health', 'Inside people; goes wherever they go'],
  ],
  'Table comparing physical capital (machines, tools, buildings, roads; can be sold separately) with human capital (skill, knowledge, expertise, good health; lives inside people)',
  'Both raise output; only one is built into people.',
);
const vSources = flow('LR', ['Education', 'Health', 'On-the-job training', 'Migration', 'Information'], 'Flow listing the five sources of human capital formation: education, health, on-the-job training, migration and information', 'Five sources of human capital formation');
const vEduReturn = table(
  ['Spending on education', 'Return expected later'],
  [
    ['Fees, books, time spent studying', 'Higher earnings over a working life'],
    ['A family pays for a daughter\'s nursing diploma', 'A salaried job and a better standard of living'],
    ['Government spends on schools', 'More productive workers and more tax revenue'],
  ],
  'Table pairing spending on education with returns: fees and time bring higher lifetime earnings; a nursing diploma brings a salaried job; public spending on schools brings more productive workers',
  'Education is treated as an investment because the return comes later.',
);
const vCourse = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 10000, left: 80, top: 30, width: 420, height: 210, xLabel: 'Before and after', yLabel: 'Monthly earnings (rupees)' });
  [[1, WT.before, 'Before course', 'fill'], [2, WT.after, 'After course', 'accent']].forEach(([x, v, name, fill]) => {
    const x0 = ch.X(x - 0.3), x1 = ch.X(x + 0.3);
    s.rect(x0, ch.Y(v), x1 - x0, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.5, rx: 2 });
    ch.label([x, v], `₹${inr(v)}`, { dy: -12, size: 13, bold: true });
    ch.xTick(x, name);
  });
  ch.yTick(5000, '5,000').yTick(10000, '10,000');
  return s.visual(`Bar chart of an imagined tailor's monthly earnings: ${inr(WT.before)} rupees before a course and ${inr(WT.after)} rupees after it, a rise of ${inr(WT_GAIN)} rupees a month`, `Imagined figures: the course cost ₹${inr(WT.cost)} and is repaid in ${WT_PAY} months.`);
})();
const vCourseTable = table(
  ['Step', 'Working (imagined tailoring course)'],
  [
    ['Extra earnings a month', `${inr(WT.after)} − ${inr(WT.before)} = ₹${inr(WT_GAIN)}`],
    ['Months to repay the cost', `${inr(WT.cost)} ÷ ${inr(WT_GAIN)} = ${WT_PAY}`],
    ['Net gain over five years', `${inr(WT_GAIN)} × 12 × 5 − ${inr(WT.cost)} = ₹${inr(WT_5Y)}`],
  ],
  `Table of the worked example: extra earnings of ${inr(WT_GAIN)} rupees a month repay a ${inr(WT.cost)} rupee course in ${WT_PAY} months, and give a net gain of ${inr(WT_5Y)} rupees over five years`,
);
const vHealth = table(
  ['Kind of health spending', 'Example'],
  [
    ['Preventive medicine', 'Immunisation of children'],
    ['Curative medicine', 'Treatment in a hospital when ill'],
    ['Social medicine', 'Spreading health literacy (hand-washing, nutrition)'],
    ['Basic facilities', 'Clean drinking water and good sanitation'],
  ],
  'Table of kinds of health spending: preventive medicine such as immunisation, curative medicine such as hospital treatment, social medicine such as health literacy, and basic facilities such as clean water and sanitation',
);
const vMigration = table(
  ['Migration: costs', 'Migration: returns'],
  [
    ['Transport to the new place', 'Higher earnings for the same skill'],
    ['Higher cost of living in cities', 'New skills picked up at work'],
    ['Living away from family', 'Money sent home to the family'],
  ],
  'Table of the costs of migration (transport, higher cost of living, living away from family) and its returns (higher earnings, new skills, money sent home)',
  'Migration adds to human capital only when the returns exceed the costs.',
);
const vMigWE = table(
  ['Step', 'Working (imagined worker Anil, rupees)'],
  [
    ['Net extra income a month', `${inr(MIG.city)} − ${inr(MIG.extraLiving)} − ${inr(MIG.home)} = ${inr(MIG_NET_M)}`],
    ['For one year', `${inr(MIG_NET_M)} × 12 = ${inr(MIG_NET_M * 12)}`],
    ['Less the cost of moving', `${inr(MIG_NET_M * 12)} − ${inr(MIG.cost)} = ${inr(MIG_NET_Y)}`],
    ['Decision', 'Positive net gain, so moving pays'],
  ],
  `Table of the migration worked example: net extra income of ${inr(MIG_NET_M)} rupees a month gives ${inr(MIG_NET_M * 12)} in a year; after the moving cost of ${inr(MIG.cost)} the first-year gain is ${inr(MIG_NET_Y)} rupees`,
);
const vHvP = table(
  ['Basis', 'Physical capital', 'Human capital'],
  [
    ['Nature', 'Tangible', 'Intangible'],
    ['Separable from owner', 'Yes, can be sold', 'No, stays with the person'],
    ['Mobility between countries', 'Fairly mobile', 'Restricted by nationality and culture'],
    ['Depreciation', 'Wear and tear', 'Ageing; skills becoming outdated'],
    ['Benefits', 'Mainly to the owner', 'To the owner and to society'],
  ],
  'Table comparing physical and human capital on nature, separability, mobility, depreciation and benefits: physical capital is tangible, separable, fairly mobile, wears out and benefits its owner; human capital is intangible, inseparable, less mobile, ages or becomes outdated and benefits society as well',
);
const vTwoWay = (() => {
  const s = new Svg(560, 260);
  s.rect(30, 95, 170, 70, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(115, 120, 'Human capital', { bold: true });
  s.text(115, 142, '(skills, health)', { size: 12, muted: true });
  s.rect(360, 95, 170, 70, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(445, 120, 'Economic growth', { bold: true });
  s.text(445, 142, '(more output, income)', { size: 12, muted: true });
  s.path('M 200 110 C 260 50, 300 50, 358 110', { color: 'accent', sw: 2.5 });
  s.head(358, 110, 1, 1, { color: 'accent' });
  s.text(280, 40, 'Productivity, innovation', { size: 13, color: 'accent' });
  s.path('M 360 150 C 300 210, 260 210, 202 150', { sw: 2.5, dash: true });
  s.head(202, 150, -1, -1);
  s.text(280, 228, 'Income to spend on schools and hospitals', { size: 13 });
  return s.visual('Diagram of a two-way link: human capital raises economic growth through productivity and innovation, and economic growth gives the income to spend on schools and hospitals, which builds more human capital', 'Each feeds the other.');
})();
const vHD = table(
  ['', 'Human capital', 'Human development'],
  [
    ['Education and health are', 'Means to raise productivity', 'Ends in themselves'],
    ['Judged by', 'Extra output they produce', 'Contribution to well-being'],
    ['Scope', 'Narrower', 'Wider'],
  ],
  'Table comparing human capital, which sees education and health as means to raise productivity, with human development, which sees them as ends in themselves and is the wider idea',
);
const vSummary1 = flow('TB', ['Human capital: skills, knowledge and health in people', 'Formed by education, health, training, migration and information', 'Raises productivity and growth; growth funds more of it', 'Human development: well-being as an end'], 'Summary flow of Part 1: human capital is skill, knowledge and health in people; it is formed by five sources; it raises growth and growth funds more of it; human development values well-being as an end', 'Part 1 in four lines');

const vWhyState = table(
  ['Reason', 'What goes wrong without the State'],
  [
    ['Long gestation', 'Returns come years later; poor families cannot pay now'],
    ['Social benefits', 'Private choices ignore benefits to others'],
    ['Information gaps', 'Families cannot judge quality; some providers overcharge'],
    ['Equity', 'The poor are shut out of schools and hospitals'],
  ],
  'Table of reasons for State provision of education and health: long gestation, social benefits, information gaps and equity, with what goes wrong without the State',
);
const vIndicators = table(
  ['Indicator', 'What it shows'],
  [
    ['Education spending as a share of total government expenditure', 'How high education ranks among the government\'s priorities'],
    ['Education spending as a share of GDP', 'How much of the country\'s income goes to education'],
  ],
  'Table of the two indicators of education spending: share of total government expenditure shows priority; share of GDP shows how much of national income goes to education',
);
const vGoal = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 8, left: 70, top: 30, width: 430, height: 210, xLabel: 'Imagined state', yLabel: 'Per cent of State Domestic Product' });
  const x0 = ch.X(1 - 0.3), x1 = ch.X(1 + 0.3);
  s.rect(x0, ch.Y(TP_SHARE_SDP), x1 - x0, ch.Y(0) - ch.Y(TP_SHARE_SDP), { fill: 'accent', color: 'accent', sw: 1.5, rx: 2 });
  ch.label([1, TP_SHARE_SDP], `${TP_SHARE_SDP}%`, { dy: -12, size: 13, bold: true });
  ch.xTick(1, 'Tapti Pradesh');
  s.line(ch.X(0), ch.Y(6), ch.X(2.9), ch.Y(6), { sw: 2, dash: true, color: 'muted' });
  ch.label([2.1, 6], '6 per cent goal', { dy: -12, size: 13 });
  ch.yTick(2, '2').yTick(4, '4').yTick(6, '6');
  return s.visual(`Bar chart of the imagined state Tapti Pradesh spending ${TP_SHARE_SDP} per cent of its State Domestic Product on education, below a dashed line marking the 6 per cent goal`, 'Imagined state; the 6 per cent line is the long-standing goal for public spending on education.');
})();
const vTpWE = table(
  ['Step', 'Working (imagined Tapti Pradesh, ₹ crore)'],
  [
    ['Share of government expenditure', `${inr(TP.edu)} ÷ ${inr(TP.spend)} × 100 = ${TP_SHARE_SPEND}%`],
    ['Share of State Domestic Product', `${inr(TP.edu)} ÷ ${inr(TP.sdp)} × 100 = ${TP_SHARE_SDP}%`],
    ['Spending at 6 per cent', `6 ÷ 100 × ${inr(TP.sdp)} = ${inr(TP_AT6)}`],
    ['Extra needed', `${inr(TP_AT6)} − ${inr(TP.edu)} = ${inr(TP_GAP)}`],
  ],
  `Table of the worked example: education spending of ${inr(TP.edu)} crore is ${TP_SHARE_SPEND} per cent of government expenditure and ${TP_SHARE_SDP} per cent of State Domestic Product; reaching 6 per cent needs ${inr(TP_AT6)} crore, or ${inr(TP_GAP)} crore more`,
);
const vRTE = table(
  ['Provision', 'In brief'],
  [
    ['Fundamental right', 'Article 21A: free and compulsory education for ages 6–14'],
    ['Law that gives effect to it', 'Right of Children to Free and Compulsory Education Act, 2009'],
    ['Neighbourhood school', 'Every child can be admitted to a school near home'],
    ['Weaker sections', 'Private unaided schools reserve 25 per cent of entry-level seats'],
    ['Standards', 'Norms for teachers, classrooms and facilities'],
  ],
  'Table of the right to education: Article 21A gives free and compulsory education for ages 6 to 14; the RTE Act 2009 gives effect to it with neighbourhood schools, 25 per cent of entry seats in private unaided schools for weaker sections, and norms for teachers and facilities',
);
const vAchieve = table(
  ['Achievement', 'In broad terms'],
  [
    ['Literacy', 'From under one in five people (1951) to about three in four (Census 2011)'],
    ['Primary enrolment', 'Close to universal'],
    ['Midday meals, free books', 'Help keep poor children in school'],
    ['Higher and technical education', 'A large system of universities, institutes and colleges'],
  ],
  'Table of achievements: literacy rose from under one in five people in 1951 to about three in four in 2011; primary enrolment is close to universal; midday meals and free books help retention; higher and technical education has grown',
  'Broad, rounded statements; check current figures in your textbook.',
);
const vProblems = table(
  ['Problem', 'What it looks like'],
  [
    ['Quality', 'Children finish classes without basic reading and arithmetic'],
    ['Gender gap', 'Female literacy below male literacy'],
    ['Regional gaps', 'Large differences between states and between rural and urban areas'],
    ['Dropouts', 'Many leave after the elementary stage'],
    ['Spending', 'Public spending below the 6 per cent of GDP goal'],
    ['Brain drain and educated unemployment', 'Skills lost abroad or left idle at home'],
  ],
  'Table of problems in Indian education: quality, gender gap, regional gaps, dropouts, low spending, brain drain and educated unemployment, each with what it looks like',
);
const vBlockWE = table(
  ['Step', 'Working (imagined block)'],
  [
    ['Dropouts', `${WB.joined} − ${WB.completed} = ${WB_DROP}`],
    ['Dropout rate', `${WB_DROP} ÷ ${WB.joined} × 100 = ${WB_DROP_PCT}%`],
    ['Gender gap in literacy', `${WB.male} − ${WB.female} = ${WB_GAP} percentage points`],
  ],
  `Table of the worked example: ${WB_DROP} of ${WB.joined} children dropped out, a rate of ${WB_DROP_PCT} per cent, and the gender gap in literacy is ${WB_GAP} percentage points`,
);
const vGirls = flow('LR', ['Girl completes school', 'Later marriage, smaller family', 'Healthier, better-fed children', 'More say at home and work', 'Stronger human capital next generation'], 'Flow of the benefits of girls\' education: completing school leads to later marriage and smaller families, healthier children, more say at home and work, and stronger human capital in the next generation', 'Why girls\' education has large social returns');
const vQuality = table(
  ['Quantity (access)', 'Quality (learning)'],
  [
    ['Number of schools and seats', 'Trained, regular teachers'],
    ['Enrolment rates', 'What children can actually read and calculate'],
    ['Years spent in school', 'Skills that employers need'],
  ],
  'Table contrasting quantity measures of education (schools, enrolment, years in school) with quality measures (trained teachers, learning levels, employable skills)',
  'India has done better on the left column than on the right.',
);
const vForward = flow('LR', ['Raise public spending towards 6 per cent', 'Train and support teachers', 'Track learning, not just enrolment', 'Vocational skills linked to jobs', 'Reach girls and lagging regions'], 'Flow of the way forward: raise public spending towards 6 per cent, train teachers, track learning, link vocational skills to jobs, and reach girls and lagging regions', 'The way forward');
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Why the State steps in', 'Long gestation, social benefits, information gaps, equity'],
    ['Two indicators', 'Share of government expenditure; share of GDP'],
    ['Goal', 'About 6 per cent of GDP (1964–66 Commission; NEP 2020)'],
    ['Right', 'Article 21A and RTE Act 2009: ages 6–14'],
    ['Big challenge', 'Quality and equity, not only access'],
  ],
  'Summary table of Part 2: why the State steps in, the two spending indicators, the 6 per cent goal, Article 21A and the RTE Act 2009, and the challenge of quality and equity',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Human Capital Formation in India — Part 1: Human Capital and Development',
  goals: [
    'Explain human capital, human capital formation and how human capital differs from physical capital',
    'Explain the five sources of human capital formation with Indian examples',
    'Analyse the two-way link between human capital and economic growth',
    'Distinguish human capital from human development and assess India as a knowledge economy',
  ],
  slides: [
    sl('title', 'Human Capital Formation in India', {
      b: 'Part 1: what **human capital** is, how it is **formed**, and why it matters for **growth** and **development**.',
      v: vRoute1,
      n: 'Think of two farmers with the same land and the same tractor. One has learnt about soil testing and new seeds; the other has not. Who will grow more? In this chapter we look at the skills, knowledge and health inside people, which economists call human capital, and at how a country builds it.',
    }),
    sl('concept', 'What is human capital?', {
      b: '**Human capital** is the stock of **skill, knowledge, expertise and health** embodied in the people of a country at a point of time.',
      v: vWhatHC,
      n: 'Just as a country has a stock of machines and buildings, called physical capital, it has a stock of skills and knowledge in its people, called human capital. An engineer, a nurse or a skilled weaver carries this capital wherever they go. It cannot be seen or sold separately from the person, but it raises what that person can produce.',
    }),
    sl('concept', 'Human capital formation', {
      b: '**Human capital formation** is the **process** of adding to the stock of human capital over time.',
      bl: [
        'Stock: skills and knowledge of all people at a point of time.',
        'Process: spending on education, health, training, migration and information.',
        'It turns a large population into a **productive asset** instead of a burden.',
      ],
      n: 'Human capital is a stock; human capital formation is the process of adding to it over time. A country with many people but little education and poor health has a large population, not a large stock of human capital. When it invests in schools, clinics and training, those same people become a productive asset. That is the central idea of this chapter.',
    }),
    sl('diagram', 'Five sources of human capital', {
      v: vSources,
      n: 'There are five main sources of human capital formation: education, health, on-the-job training, migration and information. In the next few slides we take each in turn. For every source, ask the same question: does this spending raise the ability of a person to produce, or the return that person gets from the skills already held?',
    }),
    sl('concept', 'Education as an investment', {
      b: 'Individuals and governments spend on education today because it brings **higher earnings and output later**.',
      v: vEduReturn,
      n: 'Why do families spend on fees, books and coaching? Because they expect higher earnings in future. In that sense education is an investment, just like buying a machine. The government also spends on schools and colleges, expecting a more productive workforce. Notice that the return comes years later, which is one reason why poor families find it hard to invest on their own.',
    }),
    sl('check', 'Quick check: which is not a source?', {
      b: 'Which of these does **not** add to human capital?',
      chk: 'm_not_source',
      n: 'For each option, ask whether it builds skills and health in people, or whether it adds to the stock of machines.',
    }),
    sl('example', 'Worked example 1: is a course worth it?', {
      b: `An imagined tailor in Surat pays ₹${inr(WT.cost)} for a fashion-stitching course. Her earnings rise from ₹${inr(WT.before)} to ₹${inr(WT.after)} a month.`,
      bl: [
        `Step 1: Extra earnings a month = ${inr(WT.after)} − ${inr(WT.before)} = **₹${inr(WT_GAIN)}**.`,
        `Step 2: Months to repay = ${inr(WT.cost)} ÷ ${inr(WT_GAIN)} = **${WT_PAY} months**.`,
        `Step 3: Over five years, net gain = ${inr(WT_GAIN)} × 12 × 5 − ${inr(WT.cost)} = **₹${inr(WT_5Y)}**.`,
        'Step 4: Conclude: the course is a sound investment in her human capital.',
      ],
      v: vCourse,
      n: 'Let us treat a course as an investment. The tailor earns three thousand rupees more each month after the course. The course cost twenty four thousand rupees, so it pays for itself in eight months. After that, the extra income keeps coming for years. Over five years her net gain is more than one and a half lakh rupees. This is exactly why education and training are called investments.',
    }),
    sl('concept', 'Health as a source', {
      b: 'A healthy worker can work **longer and better**. Health spending includes:',
      v: vHealth,
      n: 'A sick worker loses days of work and works with less energy. So spending on health raises the productive capacity of people. It takes several forms: preventive medicine such as vaccination, curative medicine when people fall ill, social medicine that spreads health literacy, and basic facilities like clean water and sanitation. All of these add to human capital.',
    }),
    sl('concept', 'On-the-job training', {
      b: 'Firms train their workers at the workplace, or send them for courses, to raise productivity.',
      bl: [
        'Example: a car maker in Chennai trains new workers to operate welding robots.',
        'The firm expects the **extra output** to exceed the cost of training.',
        'Firms often ask trained workers to **stay for a period** so that the firm gains the return.',
      ],
      n: 'Much learning happens at work. A firm may train its workers on the shop floor under a skilled supervisor, or send them for a course. Training costs money, so the firm expects the extra output of trained workers to be worth more. That is why firms often ask trained workers to stay for some years; otherwise a rival firm would gain from the training.',
    }),
    sl('two-column', 'Migration and information', {
      cols: [
        '**Migration**\n\nPeople move to where their skills earn more: a nurse from Kerala to Delhi, an engineer abroad. It counts only if the **returns exceed the costs** of moving.',
        '**Information**\n\nKnowing about **job openings, wages and courses** helps people choose the right education and the job that uses their skills best.',
      ],
      v: vMigration,
      n: 'Migration and information are the last two sources. When a skilled person moves to a place where the same skill earns more, the return on human capital rises. But migration has costs, such as transport, a higher cost of living and living away from family. It is a source only if the gain is larger. Information about jobs and courses helps people make these choices well.',
    }),
    sl('check', 'Quick check: migration', {
      b: 'Is a nurse who moves to a better-paid hospital adding to human capital formation?',
      chk: 'tf_migration',
      n: 'Think about returns and costs: does the move raise what her existing skills earn?',
    }),
    sl('example', 'Worked example 2: should Anil migrate?', {
      b: `Anil earns ₹${inr(MIG.home)} a month at home and could earn ₹${inr(MIG.city)} in a city, where living costs ₹${inr(MIG.extraLiving)} a month more. Moving costs ₹${inr(MIG.cost)} once.`,
      bl: [
        'Step 1: Subtract the extra living cost and the home income from the city income.',
        'Step 2: Multiply by 12 for a year.',
        'Step 3: Subtract the one-time cost of moving.',
        'Step 4: A positive result means the move adds to the return on his skills.',
      ],
      v: vMigWE,
      n: 'Here is how to weigh migration. In the city Anil earns more, but he must pay more for rent and food, so his net extra income is ten thousand rupees a month. Over a year that is one lakh twenty thousand rupees. Take away the one-time cost of moving, thirty thousand rupees, and he still gains ninety thousand rupees in the first year. So migration adds to the returns on his human capital.',
    }),
    sl('two-column', 'Human capital vs physical capital', {
      cols: [
        '**Physical capital**\n\nTangible; can be sold; owner and capital can be separated; benefits mainly the owner.',
        '**Human capital**\n\nIntangible; cannot be separated from the person; less mobile across countries; benefits the owner **and society**.',
      ],
      v: vHvP,
      n: 'Both kinds of capital raise output, but they differ. A machine is tangible and can be sold, while skill stays inside a person. Physical capital moves fairly easily between countries; people face visas and cultural barriers. Both depreciate: machines wear out, while skills become outdated as technology changes. And human capital spreads benefits to society, for example when an educated mother keeps her family healthier.',
    }),
    sl('check', 'Quick check: payback of a course', {
      b: 'Calculate how many months a course takes to pay for itself.',
      chk: 'n_payback',
      n: 'Find the extra monthly earnings first, then divide the cost of the course by that amount.',
    }),
    sl('diagram', 'Human capital and economic growth: a two-way link', {
      v: vTwoWay,
      n: 'Human capital raises growth. Educated and healthy workers are more productive, they invent and adapt new technology, and they make better use of machines. Growth, in turn, raises incomes, so families and governments can spend more on schools and hospitals, building more human capital. Because each feeds the other, the link is two way, and it is hard to say which comes first.',
    }),
    sl('concept', 'Human capital vs human development', {
      b: '**Human development** is the wider idea: education and health matter **for their own sake**.',
      v: vHD,
      n: 'Human capital sees education and health as means to an end: they matter because they raise productivity. Human development sees them as ends in themselves. Being able to read, and living a long and healthy life, are part of well-being even if they add nothing to output. So a child with a disability deserves education whether or not it raises national income. Human development is the broader concept.',
    }),
    sl('check', 'Quick check: two ideas compared', {
      b: 'How does human development differ from human capital?',
      chk: 'm_hd_vs_hc',
      n: 'Remember the key words: means and ends.',
    }),
    sl('concept', 'India as a knowledge economy?', {
      b: 'A **knowledge economy** grows mainly by creating and using knowledge.',
      bl: [
        '**Strengths:** a large young workforce; a strong record in IT and software services.',
        '**Gaps:** many workers have little schooling or training; research spending is limited.',
        '**Condition:** quality education and skills must reach the majority, not just a few.',
      ],
      n: 'India\'s success in software and IT services has led many to say it can become a knowledge economy, where growth comes from skills and ideas rather than natural resources. There are real strengths, such as a large young workforce. But much of the workforce still has little schooling or training. The potential will be realised only if quality education and skills reach most people.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Let us sum up. Human capital is the skill, knowledge and health in people. It is formed through education, health, on-the-job training, migration and information. It differs from physical capital, and it has a two-way link with growth. Human development goes further and values education and health for their own sake.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define human capital as a **stock** and human capital formation as a **process**.',
        'For sources, give **all five** and an example for each.',
        'In difference questions, state **both sides** on the same basis.',
        'For migration, mention **costs and returns**; it counts only if returns exceed costs.',
        'Human capital vs human development: **means vs ends**.',
        'Numericals: show the **steps** (extra earnings, payback, net gain) with units.',
      ],
      n: 'A few tips. Keep the stock and process distinction clear. List all five sources with examples. In difference questions, write both sides on the same basis, such as tangibility. For migration, always mention costs as well as returns. For human development, the key words are means and ends. And in numericals, show each step with units to earn the step marks.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Human Capital Formation in India — Part 2: Growth of the Education Sector',
  goals: [
    'Explain why the government provides and regulates education and health',
    'Interpret the two indicators of government spending on education and the 6 per cent goal',
    'Explain the right to education under Article 21A and the RTE Act 2009',
    'Evaluate the achievements and problems of the education sector in India',
  ],
  slides: [
    sl('title', 'Growth of the Education Sector in India', {
      b: 'Part 2: how India spends on education, what the **right to education** means, and how far we have come.',
      v: vRoute2,
      n: 'In Part 2 we look at India\'s record. Why does the government run schools at all? How do we measure its spending? What does the right to education promise? And, honestly, how well has the education sector done so far, and what still needs to change?',
    }),
    sl('concept', 'Why the State steps in', {
      b: 'Education and health are not left only to the market, for four reasons.',
      v: vWhyState,
      n: 'Education and health bring returns over many years, and poor families cannot pay the cost today. They also benefit society, which private choices ignore. Families often cannot judge the quality of a school or a hospital, and some providers overcharge. And without public provision the poor would be shut out. So central and state governments, along with private providers, all play a part.',
    }),
    sl('concept', 'Measuring government spending on education', {
      b: 'Two indicators are used.',
      v: vIndicators,
      n: 'There are two ways to judge government spending on education. The first is its share in total government expenditure, which tells us how high education ranks among the government\'s priorities. The second is its share in GDP, which tells us how much of the country\'s income is devoted to education. A government can score well on one and poorly on the other.',
    }),
    sl('diagram', 'The 6 per cent goal', {
      b: 'The **Education Commission (1964–66)** recommended public spending on education of about **6 per cent of GDP**; the **National Education Policy 2020** repeated the goal.',
      v: vGoal,
      n: 'In the nineteen sixties, the Education Commission, often called the Kothari Commission, recommended that public spending on education should reach about six per cent of GDP. The National Education Policy of twenty twenty repeated this goal. Actual public spending in India has remained below it. The chart shows an imagined state that falls short in the same way.',
    }),
    sl('check', 'Quick check: six per cent of what?', {
      b: 'Does the 6 per cent goal refer to the government budget or to GDP?',
      chk: 'tf_6pc',
      n: 'Look again at the two indicators. Which one compares spending with the size of the economy?',
    }),
    sl('example', 'Worked example 1: one state, two indicators', {
      b: `Imagined Tapti Pradesh: State Domestic Product ₹${inr(TP.sdp)} crore, total spending ₹${inr(TP.spend)} crore, education ₹${inr(TP.edu)} crore.`,
      bl: [
        `Step 1: Share of government expenditure = **${TP_SHARE_SPEND}%**, a high priority.`,
        `Step 2: Share of State Domestic Product = **${TP_SHARE_SDP}%**, below the 6 per cent goal.`,
        `Step 3: Spending at 6 per cent = ₹${inr(TP_AT6)} crore; extra needed = **₹${inr(TP_GAP)} crore**.`,
        'Step 4: Conclude: education is a priority in the budget, but the budget itself is small relative to income.',
      ],
      v: vTpWE,
      n: 'Let us apply both indicators to an imagined state. Education takes sixteen per cent of the state\'s spending, which looks like a high priority. But it is only three point two per cent of the state\'s income, about half of the six per cent goal. To reach the goal, the state must spend seven thousand crore rupees more. So both claims, priority and shortfall, can be true at once.',
    }),
    sl('concept', 'The right to education', {
      b: 'Elementary education is a **fundamental right**.',
      v: vRTE,
      n: 'Article 21A of the Constitution makes free and compulsory education a fundamental right for every child aged six to fourteen. The Right to Education Act of two thousand and nine gives effect to this right. Children can be admitted to a neighbourhood school, private unaided schools must keep a quarter of their entry seats for children from weaker sections, and schools must meet norms for teachers and facilities.',
    }),
    sl('check', 'Quick check: age group', {
      b: 'Which age group does Article 21A cover?',
      chk: 'm_21a',
      n: 'Recall the ages for which elementary education is free and compulsory.',
    }),
    sl('concept', 'Achievements', {
      b: 'India has made large gains in **access** to education.',
      v: vAchieve,
      n: 'Since independence, literacy has risen from fewer than one in five people to about three in four by the census of twenty eleven. Enrolment in primary school is now close to universal, helped by midday meals and free textbooks. India has also built a very large system of higher and technical education, which supplies doctors, engineers and other skilled workers.',
    }),
    sl('concept', 'Problems that remain', {
      b: 'Gains in access have not been matched by gains in **quality and equity**.',
      v: vProblems,
      n: 'Problems remain. Many children complete classes without basic reading and arithmetic. Female literacy is still below male literacy, and some states and rural areas lag behind. Many children drop out after the elementary stage. Public spending is below the six per cent goal. And some skilled people leave the country, while some educated youth cannot find suitable work.',
    }),
    sl('example', 'Worked example 2: reading a block report', {
      b: `An imagined block: ${WB.joined} children joined Class 1 together and ${WB.completed} completed Class 8. Literacy: male ${WB.male}%, female ${WB.female}%.`,
      bl: [
        `Step 1: Dropouts = **${WB_DROP}**; dropout rate = **${WB_DROP_PCT}%**.`,
        `Step 2: Gender gap = ${WB.male} − ${WB.female} = **${WB_GAP} percentage points**.`,
        'Step 3: Interpret: nearly one child in five did not finish elementary school, and women lag behind men.',
        'Step 4: Suggest: schools nearer home, scholarships for girls, remedial teaching.',
      ],
      v: vBlockWE,
      n: 'Here is how to read a district report. Ninety of five hundred children dropped out before Class eight, a dropout rate of eighteen per cent. The gender gap in literacy is thirteen percentage points. Do not stop at the numbers. Interpret them: nearly one child in five did not finish elementary school. Then suggest measures, such as schools closer to home and scholarships for girls.',
    }),
    sl('check', 'Quick check: dropout rate', {
      b: 'Calculate a dropout rate from a block\'s figures.',
      chk: 'n_dropout',
      n: 'Subtract those who completed from those who joined, then divide by those who joined and multiply by one hundred.',
    }),
    sl('diagram', 'Why girls\' education matters so much', {
      v: vGirls,
      n: 'Educating girls has returns far beyond the girl\'s own income. Educated women tend to marry later and have smaller families, their children are healthier and better fed, and they have more say at home and at work. Each of these strengthens the human capital of the next generation. That is why closing the gender gap is so important.',
    }),
    sl('two-column', 'Quantity and quality', {
      cols: [
        '**Quantity**\n\nMore schools, more seats, higher enrolment.',
        '**Quality**\n\nTrained teachers, real learning, skills employers need.',
      ],
      v: vQuality,
      n: 'It helps to separate quantity from quality. Quantity means schools, seats and enrolment, and here India has done well. Quality means what children actually learn and whether they gain skills that employers need. Here progress has been slower. Human capital depends on quality: a year in school builds skills only if real learning happens.',
    }),
    sl('check', 'Quick check: pupils per teacher', {
      b: 'Work out a school\'s pupil–teacher ratio.',
      chk: 'm_ptr',
      n: 'Divide the number of pupils by the number of teachers.',
    }),
    sl('concept', 'The way forward', {
      b: 'Measures commonly suggested:',
      v: vForward,
      n: 'What would strengthen India\'s human capital? Raising public spending towards the six per cent goal; training and supporting teachers; tracking what children learn and not only whether they enrol; linking vocational courses to real jobs; and reaching girls and lagging regions first. Different governments weigh these differently, but each targets quality and equity.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. The State steps in because of long gestation, social benefits, information gaps and equity. Spending is judged by its share of government expenditure and of GDP, against a goal of about six per cent of GDP. Article 21A and the RTE Act make elementary education a right. Access has improved greatly; quality and equity are the big challenges.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'The 6 per cent goal is of **GDP**, not of the budget.',
        'Article **21A** and the **RTE Act 2009**: ages **6–14**.',
        'In "evaluate" questions, give **achievements and problems**, then a judgement.',
        'Use broad, rounded facts (about three in four literate in 2011); avoid inventing precise figures.',
        'Data questions: compute, then **interpret** and **suggest**.',
      ],
      n: 'Some final tips. Remember that the six per cent goal is a share of GDP. Know Article twenty one A and the RTE Act, and the ages six to fourteen. When asked to evaluate, give both achievements and problems and end with a judgement. Use broad, rounded facts rather than inventing exact figures. In data questions, calculate, interpret and then suggest.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Human Capital Formation in India — Notes',
  sections: [
    {
      h: '1. Human capital and human capital formation',
      t: 1,
      b: '**Human capital** is the stock of skill, knowledge, expertise and health embodied in the people of a country at a point of time. **Human capital formation** is the process of adding to this stock over time by spending on education, health, training, migration and information.\n\nA large population becomes a productive **asset** only when it has human capital; otherwise it can be a burden on scarce resources.',
      terms: [
        ['Human capital', 'The stock of skill, knowledge and health in a country\'s people at a point of time.'],
        ['Human capital formation', 'The process of increasing the stock of human capital over time.'],
      ],
      v: vWhatHC,
    },
    {
      h: '2. Sources of human capital formation',
      t: 1,
      b: '1. **Education:** spending on schooling and higher studies raises future earnings and output; it is an investment because the return comes later.\n2. **Health:** preventive medicine (immunisation), curative medicine (treatment), social medicine (health literacy), clean water and sanitation raise the capacity to work.\n3. **On-the-job training:** firms train workers at the workplace or send them for courses, expecting extra output; they often bind trained workers to stay for a period.\n4. **Migration:** moving to where skills earn more (rural to urban, or abroad); it counts only if the returns exceed the costs (transport, higher cost of living, psychic costs).\n5. **Information:** spending on information about jobs, wages, education and health helps people make better choices.',
      terms: [
        ['On-the-job training', 'Training given by firms to their workers at or for the workplace.'],
        ['Preventive medicine', 'Health measures that stop disease before it occurs, such as vaccination.'],
      ],
      v: vSources,
      vs: [vHealth, vMigration],
    },
    {
      h: '3. Human capital and physical capital',
      t: 1,
      b: '- **Nature:** physical capital is tangible; human capital is intangible.\n- **Separability:** a machine can be sold apart from its owner; skill cannot be separated from the person.\n- **Mobility:** physical capital moves fairly easily between countries; people face restrictions of nationality and culture.\n- **Depreciation:** machines wear out; skills become outdated, and people age, so continuous learning is needed.\n- **Benefits:** physical capital mainly benefits its owner; human capital also creates **social benefits** (an educated person helps others learn and stay healthy).\n\nThe two are **complements**: modern machinery needs trained people to run it.',
      terms: [['Social benefit', 'A benefit that reaches people other than the one who paid for the good or service.']],
      v: vHvP,
    },
    {
      h: '4. Human capital, growth and human development',
      t: 1,
      b: '**Growth:** human capital raises labour productivity, encourages innovation and helps the economy use physical capital well. Higher growth in turn gives families and governments more to spend on schools and hospitals. The link is **two-way**, and it is hard to show which comes first.\n\n**Human development** treats education and health as **ends in themselves**, part of well-being; human capital treats them as **means** to raise productivity. Human development is the wider idea.\n\n**Knowledge economy:** India\'s IT and software services show the potential of a skilled workforce, but much of the workforce still has little schooling or training; quality education for the majority is the condition for this potential to be realised.',
      terms: [
        ['Human development', 'The idea that education and health are part of well-being, valuable for their own sake.'],
        ['Knowledge economy', 'An economy whose growth comes mainly from creating, spreading and using knowledge.'],
        ['Brain drain', 'The emigration of highly skilled people, so that the home country loses the return on their training.'],
      ],
      v: vTwoWay,
      vs: [vHD],
    },
    {
      h: '5. Government and education spending in India',
      t: 2,
      b: '**Why the State intervenes:** returns come over a long period and poor families cannot pay now; education and health have social benefits; families face information gaps and may be overcharged; and equity requires that the poor are not shut out. Education is on the concurrent list, so both the Centre and the states are responsible; private institutions also provide it.\n\n**Indicators:** education expenditure as a percentage of (i) total government expenditure, which shows priority, and (ii) GDP, which shows how much of national income goes to education.\n\n**Goal:** the **Education Commission (1964–66)** recommended about **6 per cent of GDP**; the **National Education Policy 2020** repeated it. Public spending has remained below this level.\n\n**Right to education:** **Article 21A** makes free and compulsory education for children aged **6 to 14** a fundamental right; the **RTE Act 2009** gives effect to it (neighbourhood schools, 25 per cent of entry-level seats in private unaided schools for weaker sections, norms for teachers and facilities).',
      terms: [
        ['Article 21A', 'The constitutional right of every child aged 6 to 14 to free and compulsory education.'],
        ['Concurrent list', 'Subjects on which both the Union and the states can make laws; education is one of them.'],
      ],
      v: vIndicators,
      vs: [vGoal, vRTE],
    },
    {
      h: '6. Achievements, problems and the way forward',
      t: 2,
      b: '**Achievements (broad):** literacy has risen from under one in five people in 1951 to about three in four (Census 2011); primary enrolment is close to universal; midday meals and free textbooks help keep poor children in school; a large system of higher and technical education has grown.\n\n**Problems:** low quality of learning; gender gap (female literacy below male literacy); regional and rural–urban gaps; dropouts after the elementary stage; public spending below the 6 per cent goal; brain drain; unemployment among educated youth.\n\n**Way forward:** raise public spending towards 6 per cent of GDP; train and support teachers; measure learning outcomes, not only enrolment; link vocational education to jobs; focus on girls and lagging regions.',
      terms: [
        ['Dropout rate', 'The share of children who leave school before completing a stage.'],
        ['Pupil–teacher ratio', 'The number of pupils per teacher in a school or system.'],
      ],
      v: vProblems,
      vs: [vAchieve, vForward],
    },
  ],
  tips: '**Common mistakes**\n- Writing "population" for human capital: human capital is **skill, knowledge and health**, not a head count.\n- Listing only education as a source: there are **five** (education, health, on-the-job training, migration, information).\n- Forgetting the **costs** of migration.\n- Mixing up human capital (means) and human development (ends).\n- Saying the 6 per cent goal is of the government budget: it is of **GDP**.\n- Giving made-up exact statistics; use broad, rounded facts.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 2 marks: two points, or a point with an example (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five points (80–120 words); "evaluate" questions need both sides and a judgement.\n- Case-based: calculate from the data, then interpret using the passage.\n\nAll cases and tables in SOYL practice are imagined; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Human capital**', 'The stock of **skill, knowledge, expertise and health** in a country\'s people.', 'definition', 1],
  ['**Human capital formation**', 'The **process** of adding to the stock of human capital over time.', 'definition', 1],
  ['Five sources of human capital', 'Education, health, on-the-job training, migration, information.', 'concept', 1],
  ['Why is education an investment?', 'Spending now brings **higher earnings and output later**.', 'concept', 1],
  ['Four kinds of health spending', 'Preventive, curative, social medicine; clean water and sanitation.', 'concept', 1],
  ['Example of **preventive** medicine', 'Immunisation of children.', 'example', 1],
  ['Why do firms bind trained workers to stay?', 'To recover the **return on the training** they paid for.', 'concept', 1],
  ['When does migration add to human capital?', 'When the **returns exceed the costs** (transport, living costs, living away).', 'concept', 1],
  ['Why is information a source?', 'It helps people choose the **right education and job** for their skills.', 'concept', 1],
  ['Tangible or intangible: human capital?', '**Intangible**; it cannot be separated from its owner.', 'fact', 1],
  ['Does human capital depreciate?', 'Yes: through **ageing** and **skills becoming outdated**.', 'concept', 1],
  ['Who benefits from human capital?', 'The owner **and society** (social benefits).', 'concept', 1],
  ['Three ways human capital raises growth', 'Productivity; innovation; better use of physical capital.', 'concept', 1],
  ['Why is the link with growth two-way?', 'Growth gives the **income to spend** on schools and hospitals.', 'concept', 1],
  ['Human capital vs human development', 'Human capital: **means** to productivity. Human development: **ends** in themselves.', 'exam-tip', 1],
  ['**Knowledge economy**', 'Growth driven by creating and using **knowledge**, e.g. IT services.', 'definition', 1],
  ['**Brain drain**', 'Emigration of skilled people; the home country loses the return on their training.', 'definition', 1],
  ['Payback of a course', '**Cost ÷ extra earnings a month** = months to repay.', 'exam-tip', 1],
  ['Four reasons the State provides education', 'Long gestation, social benefits, information gaps, equity.', 'concept', 2],
  ['Two indicators of education spending', 'Share of **total government expenditure**; share of **GDP**.', 'concept', 2],
  ['What does the share of GDP show?', 'How much of the country\'s **income** goes to education.', 'concept', 2],
  ['The 6 per cent goal', 'About **6 per cent of GDP**: Education Commission 1964–66; repeated in NEP 2020.', 'fact', 2],
  ['Article **21A**', 'Free and compulsory education for children aged **6 to 14** as a fundamental right.', 'fact', 2],
  ['RTE Act: year', '**2009**.', 'fact', 2],
  ['RTE: seats in private unaided schools', '**25 per cent** of entry-level seats for weaker and disadvantaged groups.', 'fact', 2],
  ['Literacy: 1951 vs 2011 (broad)', 'Under **one in five** → about **three in four**.', 'fact', 2],
  ['Main problem now: access or quality?', '**Quality**: enrolment is close to universal, learning lags.', 'concept', 2],
  ['Dropout rate', '(Joined − completed) ÷ joined × 100.', 'exam-tip', 2],
  ['Why girls\' education has large social returns', 'Healthier children, smaller families, more say at home and work.', 'concept', 2],
  ['Five steps for the way forward', 'Spend towards 6%; teachers; learning outcomes; vocational links; girls and lagging regions.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Human Capital Formation in India',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_hc_def', 'm_quality', 'm_twoway', 'ar_rte'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_hc_physical', 's_rte', 's3_growth'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_hc_growth', 'l_state_edu'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_skill'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Human Capital Formation in India',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_on_job', 'm_migration_cost', 'm_info', 'm_brain_drain', 'm_six_pc', 'm_dropout', 'm_higher', 'm_unemp_educated', 'ar_health', 'ar_spending'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_health', 's_spend_indicators', { attempt: 1, keys: ['s_hd', 's_girls'] }, 's3_sources', { attempt: 1, keys: ['s3_problems', 's3_knowledge'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_govt_role', { attempt: 1, keys: ['l_sources', 'l_problems_measures'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage or data set and answer all parts. Part (c) of each has an internal choice.', items: ['cb_budget', 'cb_village'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-12-economics-ch09 only (human capital, its sources and role in development; growth of the education sector in India)',
    originality: 'every case, table and scenario written for this chapter (imagined people, states, blocks and figures, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build (course ${inr(WT.cost)} ÷ ${inr(WT_GAIN)} = ${WT_PAY} months; ITI ${inr(ITI.cost)} ÷ ${inr(ITI_GAIN_M)} = ${ITI_PAYBACK} months; migration first-year gain ${inr(MIG_NET_Y)}; Tapti Pradesh ${TP_SHARE_SPEND} and ${TP_SHARE_SDP} per cent, gap ${inr(TP_GAP)} crore; block dropout ${WB_DROP_PCT} per cent)`,
    facts: 'Article 21A and the RTE Act 2009 (ages 6–14, 25 per cent entry seats in private unaided schools); 6 per cent of GDP goal from the Education Commission 1964–66, repeated in NEP 2020; literacy under one in five in 1951 and about three in four in Census 2011 (rounded); education on the concurrent list',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
