// Build CBSE 12 Economics ch11 Employment: Growth, Informalisation and Other Issues. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch11', 'economics-commerce');
const { inr, pct } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- deck figures (computed, never typed)
// WE1: worker-population ratio by gender in an imagined village of Madhya Pradesh.
const WE1 = { men: 1000, women: 1000, menW: 540, womenW: 260 };
const WE1_MEN = pct(WE1.menW, WE1.men); // 54
const WE1_WOMEN = pct(WE1.womenW, WE1.women); // 26
const WE1_ALL = pct(WE1.menW + WE1.womenW, WE1.men + WE1.women); // 40
// WE2: status of 500 workers in an imagined block of Rajasthan.
const WE2 = { self: 260, casual: 155, regular: 85 };
const WE2_T = WE2.self + WE2.casual + WE2.regular; // 500
const WE2_S = pct(WE2.self, WE2_T); // 52
const WE2_C = pct(WE2.casual, WE2_T); // 31
const WE2_R = pct(WE2.regular, WE2_T); // 17
// WE3: jobless growth on index numbers (imagined state, base year index 100).
const WE3 = { out: 150, emp: 110 };
const WE3_OG = WE3.out - 100; // 50
const WE3_EG = WE3.emp - 100; // 10
// WE4: unemployment in an imagined town.
const WE4 = { lf: 8000, wf: 7600 };
const WE4_U = WE4.lf - WE4.wf; // 400
const WE4_R = pct(WE4_U, WE4.lf); // 5
// WE5: output of a family plot by number of workers (quintals); flat after 4 workers.
const WE5_OUT = [0, 10, 18, 24, 28, 28, 28, 28];
const WE5_NEEDED = WE5_OUT.indexOf(Math.max(...WE5_OUT)); // 4
const WE5_DISG = 7 - WE5_NEEDED; // 3
if (WE1_MEN !== 54 || WE1_WOMEN !== 26 || WE1_ALL !== 40 || WE2_T !== 500 || WE2_S !== 52 || WE2_C !== 31 || WE2_R !== 17 || WE3_OG !== 50 || WE3_EG !== 10 || WE4_U !== 400 || WE4_R !== 5 || WE5_NEEDED !== 4 || WE5_DISG !== 3)
  throw new Error('ch11 deck figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Who is a worker', 'Workforce and labour force', 'Worker-population ratio', 'Status of workers', 'Sectors and growth', 'Formal and informal work'], 'Route map of Part 1: who is a worker, workforce and labour force, the worker-population ratio, status of workers, sectors and growth, and formal and informal work', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Meaning of unemployment', 'Open, disguised, seasonal', 'Measuring it', 'Problems', 'Government policies', 'Appraisal'], 'Route map of Part 2: meaning of unemployment, its open, disguised and seasonal types, measuring it, problems, government policies and an appraisal', 'Part 2 at a glance');
const vWorker = table(
  ['Person (imagined)', 'Worker?', 'Why'],
  [
    ['A farmer sowing wheat on her own land', 'Yes', 'Produces a good'],
    ['A son helping unpaid in the family shop', 'Yes', 'Takes part in production'],
    ['A bank clerk absent this week with fever', 'Yes', 'Temporarily away from a regular job'],
    ['A full-time college student', 'No', 'No economic activity'],
    ['A retired grandfather living on his pension', 'No', 'A pension is not payment for current work'],
  ],
  'Table of five imagined persons: a farmer, an unpaid helper in the family shop and a clerk on sick leave are workers; a full-time student and a pensioner doing no economic activity are not',
  'The test is taking part in production, not being paid a wage.',
);
const vForce = flow('TB', ['Population', 'Not in the labour force: students, home-makers, the very old and young', 'Labour force: working or seeking work', 'Workforce: actually working', 'Unemployed: seeking or available but without work'], 'Tree: the population divides into those outside the labour force and the labour force; the labour force divides into the workforce, who are working, and the unemployed, who seek work but have none', 'Labour force = workforce + unemployed', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n3', to: 'n5' },
]);
const vWprFormula = table(
  ['Step', 'Imagined district'],
  [
    ['Population', '6,00,000'],
    ['Workers', '2,40,000'],
    ['Worker-population ratio = workers ÷ population × 100', `${pct(240000, 600000)} per cent`],
  ],
  `Table computing the worker-population ratio of an imagined district: 2,40,000 workers out of a population of 6,00,000 gives ${pct(240000, 600000)} per cent`,
  'A higher ratio means a larger share of people takes part in production.',
);
const vWpr = (() => {
  const s = new Svg(560, 290);
  const ch = s.chart({ x0: 0, x1: 4, y0: 0, y1: 60, left: 70, top: 30, width: 440, height: 200, xLabel: 'Group', yLabel: 'Worker-population ratio (per cent)' });
  [[1, WE1_MEN, 'Men', 'accent'], [2, WE1_WOMEN, 'Women', 'fill'], [3, WE1_ALL, 'All', 'muted']].forEach(([x, v, name, fill]) => {
    const x0 = ch.X(x - 0.3), x1 = ch.X(x + 0.3);
    s.rect(x0, ch.Y(v), x1 - x0, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.5, rx: 2 });
    ch.label([x, v], `${v}`, { dy: -12, size: 13, bold: true });
    ch.xTick(x, name);
  });
  ch.yTick(20, '20').yTick(40, '40');
  return s.visual(`Bar chart of worker-population ratios in an imagined village: men ${WE1_MEN} per cent, women ${WE1_WOMEN} per cent, all ${WE1_ALL} per cent`, 'Imagined village of 1,000 men and 1,000 women.');
})();
const vWE1 = table(
  ['Group', 'Population', 'Workers', 'Ratio (per cent)'],
  [
    ['Men', inr(WE1.men), String(WE1.menW), `${WE1.menW} ÷ ${inr(WE1.men)} × 100 = ${WE1_MEN}`],
    ['Women', inr(WE1.women), String(WE1.womenW), `${WE1.womenW} ÷ ${inr(WE1.women)} × 100 = ${WE1_WOMEN}`],
    ['All', inr(WE1.men + WE1.women), String(WE1.menW + WE1.womenW), `${WE1.menW + WE1.womenW} ÷ ${inr(WE1.men + WE1.women)} × 100 = ${WE1_ALL}`],
  ],
  `Table working out worker-population ratios in an imagined village: men ${WE1_MEN}, women ${WE1_WOMEN}, all ${WE1_ALL} per cent`,
  'Imagined figures.',
);
const vPatterns = table(
  ['Comparison', 'Broad pattern in India', 'Main reason'],
  [
    ['Men vs women', 'Ratio higher for men', 'Much of women\'s household work is not counted'],
    ['Rural vs urban', 'Ratio higher in villages', 'Poor farm families need every hand; townspeople study longer'],
    ['Rural women vs urban women', 'Higher for rural women', 'Farm and family enterprise work'],
  ],
  'Table of broad participation patterns: the ratio is higher for men than women, higher in rural than urban areas, and higher for rural than urban women, with reasons',
  'Qualitative patterns only; check current survey reports for figures.',
);
const vStatusTypes = table(
  ['Status', 'Meaning', 'Example (imagined)'],
  [
    ['Self-employed', 'Owns and runs an enterprise', 'A farmer, a kirana shop owner, a potter'],
    ['Regular salaried employee', 'Hired regularly, paid a wage or salary, often with benefits', 'A bank clerk, a factory supervisor'],
    ['Casual wage labourer', 'Hired for a day or a few days, no security', 'A head-load worker, a farm labourer at harvest'],
  ],
  'Table of the three categories of workers by status: self-employed, regular salaried employees and casual wage labourers, with meanings and examples',
);
const vStatusBar = (() => {
  const s = new Svg(560, 170);
  const left = 40, width = 480, y = 60, h = 44, k = width / WE2_T;
  const parts = [['Self-employed', WE2.self, WE2_S, 'accent'], ['Casual', WE2.casual, WE2_C, 'fill'], ['Regular', WE2.regular, WE2_R, 'muted']];
  let x = left;
  for (const [name, v, p, fill] of parts) {
    s.rect(x, y, v * k, h, { fill, color: 'accent', sw: 1.2, rx: 0 });
    s.text(x + (v * k) / 2, y - 14, name, { size: 12 });
    s.text(x + (v * k) / 2, y + h + 16, `${p} per cent`, { size: 13, bold: true });
    x += v * k;
  }
  s.text(left + width / 2, 150, `${WE2_T} workers in an imagined block`, { size: 13 });
  return s.visual(`Stacked bar of ${WE2_T} workers in an imagined block: self-employed ${WE2_S} per cent, casual ${WE2_C} per cent, regular salaried ${WE2_R} per cent`, 'Imagined block. Self-employment is the largest share.');
})();
const vStatusPattern = table(
  ['Where / who', 'Most common status', 'Why'],
  [
    ['Villages', 'Self-employed and casual', 'Own small farms; labour on others\' farms'],
    ['Towns', 'More regular salaried', 'Offices, factories and services hire regularly'],
    ['Women', 'Self-employed or casual', 'Fewer have the education or mobility for regular jobs'],
  ],
  'Table of status patterns: in villages self-employment and casual labour dominate, in towns regular salaried work is more common, and women are more often self-employed or casual',
);
const vSectors = table(
  ['Sector', 'Share of workers over time', 'Note'],
  [
    ['Primary (farming and allied)', 'Falling, but still the largest', 'Many workers, low output per worker'],
    ['Secondary (industry)', 'Rising slowly', 'Construction a big source of new work'],
    ['Tertiary (services)', 'Rising fastest', 'Trade, transport, IT, health, education'],
  ],
  'Table of the changing distribution of India\'s workers by sector: the primary share is falling but still largest, the secondary share rising slowly, and the services share rising fastest',
  'Broad trends; no exact shares are given.',
);
const vJobless = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 10, y0: 80, y1: 160, left: 70, top: 30, width: 420, height: 210, xLabel: 'Years', yLabel: 'Index (base year 100)' });
  ch.fn((x) => 100 + (WE3_OG * x) / 10, 0, 10, { color: 'accent', sw: 2.5 }, 10);
  ch.fn((x) => 100 + (WE3_EG * x) / 10, 0, 10, { sw: 2.5, dash: true }, 10);
  ch.label([10, WE3.out], `Output ${WE3.out}`, { anchor: 'end', dy: -14, dx: -4, size: 13, color: 'accent' });
  ch.label([10, WE3.emp], `Jobs ${WE3.emp}`, { anchor: 'end', dy: -14, dx: -4, size: 13 });
  ch.xTick(0, '0').xTick(5, '5').xTick(10, '10');
  ch.yTick(100, '100').yTick(120, '120').yTick(140, '140');
  return s.visual(`Line chart for an imagined state over ten years: an output index rises from 100 to ${WE3.out} while an employment index rises only from 100 to ${WE3.emp}`, 'Jobless growth: output races ahead of jobs (imagined).');
})();
const vWE3 = table(
  ['Step', 'Output', 'Employment'],
  [
    ['Index in base year', '100', '100'],
    ['Index after ten years', String(WE3.out), String(WE3.emp)],
    ['Growth (per cent)', `${WE3.out} − 100 = ${WE3_OG}`, `${WE3.emp} − 100 = ${WE3_EG}`],
  ],
  `Table: output index grows from 100 to ${WE3.out} (${WE3_OG} per cent) while employment index grows from 100 to ${WE3.emp} (${WE3_EG} per cent)`,
  'With a base of 100, growth in per cent is simply the index minus 100.',
);
const vCasual = flow('LR', ['Regular jobs grow slowly', 'Firms prefer short-term hiring', 'New entrants take casual work', 'Share of casual labour rises'], 'Flow of casualisation: regular jobs grow slowly, firms prefer short-term hiring, new entrants take casual work, and the share of casual labour rises', 'Casualisation');
const vFormal = table(
  ['Feature', 'Formal (organised) sector', 'Informal (unorganised) sector'],
  [
    ['Who', 'All public-sector units; private units hiring 10 or more workers', 'Farmers, own-account workers, small enterprises, casual labour'],
    ['Income', 'Regular', 'Irregular, often low'],
    ['Protection', 'Provident fund, paid leave, pensions, labour laws', 'Little or none'],
    ['Voice', 'Can form trade unions', 'Rarely organised'],
  ],
  'Table comparing the formal and informal sectors: who is in each, regularity of income, social protection and the ability to form trade unions',
);
const vInformal = flow('LR', ['Formal jobs grow slowly', 'Firms hire on contract', 'Most new work is informal', 'Larger informal share of the workforce'], 'Flow of informalisation: formal jobs grow slowly, firms hire on contract, most new work is informal, so the informal share of the workforce grows', 'Informalisation');
const vProtect = flow('LR', ['Register informal workers', 'Social security: health, accident, pension', 'Minimum wages enforced', 'Credit, skills and markets for small units'], 'Flow of measures to protect informal workers: registration, social security, enforcement of minimum wages, and credit, skills and markets for small units', 'Protecting informal workers');
const vSummary1 = table(
  ['Idea', 'In one line'],
  [
    ['Worker', 'Anyone taking part in economic activity, paid or unpaid'],
    ['Labour force', 'Workforce + unemployed'],
    ['Worker-population ratio', 'Workers ÷ population × 100'],
    ['Status', 'Self-employed (largest), casual, regular salaried'],
    ['Jobless growth', 'Output grows much faster than jobs'],
    ['Casualisation / informalisation', 'Rising shares of casual and informal work'],
  ],
  'Summary table of Part 1: worker, labour force, worker-population ratio, status of workers, jobless growth, and casualisation and informalisation',
);
const vUnemp = table(
  ['Step', 'Imagined town'],
  [
    ['Labour force', inr(WE4.lf)],
    ['Workforce', inr(WE4.wf)],
    ['Unemployed = labour force − workforce', `${inr(WE4.lf)} − ${inr(WE4.wf)} = ${WE4_U}`],
    ['Share of the labour force', `${WE4_U} ÷ ${inr(WE4.lf)} × 100 = ${WE4_R} per cent`],
  ],
  `Table computing unemployment in an imagined town: labour force ${inr(WE4.lf)} minus workforce ${inr(WE4.wf)} gives ${WE4_U} unemployed, ${WE4_R} per cent of the labour force`,
);
const vUnempMeaning = table(
  ['Is the person…', 'Then'],
  [
    ['working?', 'In the workforce'],
    ['not working, but seeking or available for work?', 'Unemployed (in the labour force)'],
    ['not working and not seeking work?', 'Outside the labour force'],
  ],
  'Decision table: a person who is working is in the workforce; one who is not working but is seeking work is unemployed; one not working and not seeking work is outside the labour force',
);
const vTypes = table(
  ['Type', 'What it looks like', 'Where it is common'],
  [
    ['Open', 'Willing and able to work, but no work at all', 'Towns; educated youth'],
    ['Disguised', 'More people on a job than needed; output would not fall if some left', 'Family farms and small family businesses'],
    ['Seasonal', 'Work only in some months', 'Farming, sugar mills, tourism'],
  ],
  'Table of three types of unemployment: open, disguised and seasonal, with what each looks like and where it is common',
);
const vDisg = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 8, y0: 0, y1: 35, left: 70, top: 30, width: 420, height: 210, xLabel: 'Family members working', yLabel: 'Output (quintals)' });
  const pts = WE5_OUT.map((v, i) => [ch.X(i), ch.Y(v)]);
  s.polyline(pts, { color: 'accent', sw: 2.5 });
  WE5_OUT.forEach((v, i) => { if (i) ch.dot([i, v]); ch.xTick(i, String(i)); });
  ch.label([5.5, 28], 'Output stops rising', { dy: -16, size: 13 });
  ch.yTick(10, '10').yTick(20, '20').yTick(28, '28');
  return s.visual(`Line chart of output of an imagined family plot against the number of members working: output rises to 28 quintals with 4 workers and stays at 28 with 5, 6 or 7 workers, so 3 of 7 are disguisedly unemployed`, 'Imagined plot. Beyond 4 workers, extra hands add nothing.');
})();
const vMeasure = table(
  ['Source', 'What it gives'],
  [
    ['Census of India', 'Workers and non-workers for the whole population, once a decade'],
    ['Labour force surveys of the National Statistical Office', 'Regular estimates of participation, status and unemployment'],
    ['Employment exchanges', 'Records of people registered as seeking work'],
  ],
  'Table of data sources on employment: the Census, labour force surveys of the National Statistical Office, and employment exchanges, with what each provides',
  'Disguised and seasonal unemployment are hard to see in any survey.',
);
const vProblems = table(
  ['Problem', 'What it means for workers'],
  [
    ['Slow growth of formal jobs', 'Most new workers end up in informal work'],
    ['Underemployment in farming', 'Many hands, low output per worker'],
    ['Skills mismatch', 'Graduates jobless while firms lack trained workers'],
    ['Low participation of women', 'A large source of talent left unused'],
  ],
  'Table of employment problems in India: slow growth of formal jobs, underemployment in farming, skills mismatch and low participation of women, with what each means for workers',
);
const vGovt = flow('TB', ['Government and employment', 'Directly: hires in departments and public enterprises', 'Indirectly: its output and spending make other firms hire', 'Through programmes: wage employment, self-employment, skills'], 'Tree of how the government creates employment: directly by hiring, indirectly through its output and spending, and through wage-employment, self-employment and skill programmes', 'Three routes', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' },
]);
const vProgrammes = table(
  ['Kind of programme', 'How it works', 'Example'],
  [
    ['Wage employment', 'Paid work on public works', 'Rural employment guarantee, MGNREGA 2005'],
    ['Self-employment', 'Loans, subsidies and training to start an enterprise', 'A loan to open a repair shop'],
    ['Skill development', 'Training for jobs in demand', 'Courses for electricians, nurses, welders'],
  ],
  'Table of employment programmes: wage employment on public works such as MGNREGA 2005, self-employment through loans and training, and skill development',
);
const vMgnrega = flow('LR', ['Rural household registers', 'Adults ask for work', 'Up to 100 days of unskilled work a year', 'Wages paid into accounts; allowance if no work in time'], 'Flow of the rural employment guarantee: a rural household registers, adults ask for work, up to 100 days of unskilled work a year are provided, and wages are paid into accounts, with an allowance if work is not given in time', 'MGNREGA 2005 in brief');
const vAppraise = table(
  ['Gains', 'Concerns'],
  [
    ['Lean-season income for poor households', 'Delays in wage payments'],
    ['Assets such as ponds and roads', 'Fewer days given than demanded in places'],
    ['Credit and skills for enterprises', 'Formal jobs still grow slowly'],
  ],
  'Table weighing government employment policies: gains such as lean-season income, assets and credit and skills, against concerns such as delayed wages, fewer days than demanded and slow growth of formal jobs',
);
const vSummary2 = table(
  ['Idea', 'In one line'],
  [
    ['Unemployed', 'Seeking or available for work, but without it'],
    ['Open / disguised / seasonal', 'No work / surplus hands / work only in some months'],
    ['Data', 'Census, NSO labour force surveys, employment exchanges'],
    ['Government', 'Direct, indirect and programme routes'],
    ['MGNREGA 2005', 'Up to 100 days of wage work for rural households'],
  ],
  'Summary table of Part 2: who is unemployed, the three types, data sources, the routes by which the government creates jobs, and MGNREGA 2005',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Employment — Part 1: Workers, Participation and the Changing Structure of Work',
  goals: [
    'Define a worker, the workforce and the labour force, and calculate the worker-population ratio',
    'Interpret differences in participation between men and women and between rural and urban areas',
    'Classify workers by status and describe how work is distributed across sectors',
    'Explain jobless growth, casualisation and the informalisation of the workforce',
  ],
  slides: [
    sl('title', 'Employment: Growth, Informalisation and Other Issues', {
      b: 'Part 1 — who counts as a **worker**, how many people work, **in what status**, and how the **structure of work** is changing.',
      v: vRoute1,
      n: 'Every economy needs people to produce goods and services, and every family needs a source of income. In this chapter we ask who is counted as a worker in India, what kind of work people do, and why so much of it is irregular and unprotected. Part one builds the vocabulary; part two looks at unemployment and what the government does about it.',
    }),
    sl('concept', 'Who is a worker?', {
      b: 'A **worker** is anyone who takes part in an **economic activity** that adds to the production of goods and services — paid or unpaid.',
      v: vWorker,
      n: 'Economists count a person as a worker if he or she takes part in producing goods or services. A wage is not required. A boy helping without pay in the family shop is a worker, and so is a clerk who is away for a few days with fever. A full-time student or a retired person who does no economic activity is not. The question is always: is this person contributing to production?',
    }),
    sl('diagram', 'Workforce and labour force', {
      b: '**Labour force** = workforce + the unemployed.',
      v: vForce,
      n: 'Start with the whole population. Some people are outside the labour force: young children, full-time students, home-makers and the very old. Everyone else is in the labour force. Within it, those actually working form the workforce, and those seeking or available for work but without it are the unemployed. So the labour force is always larger than the workforce unless there is no unemployment at all.',
    }),
    sl('check', 'Quick check: name the total', {
      b: 'What do we call the workforce together with those seeking work?',
      chk: 'fb_labour_force',
      n: 'Remember the tree: working people plus job seekers. What name covers both groups together?',
    }),
    sl('concept', 'The worker-population ratio', {
      b: '**Worker-population ratio** = workers ÷ population × 100. It shows what share of people takes part in production.',
      v: vWprFormula,
      n: 'To compare places of different sizes, we use the worker-population ratio. Divide the number of workers by the population and multiply by one hundred. In this imagined district, two lakh forty thousand workers out of six lakh people gives forty per cent. A higher ratio means a larger share of people is engaged in producing goods and services.',
    }),
    sl('example', 'Worked example 1: ratios for men and women', {
      b: `An imagined village in Madhya Pradesh has ${inr(WE1.men)} men and ${inr(WE1.women)} women; ${WE1.menW} men and ${WE1.womenW} women are workers.`,
      bl: [
        'Step 1 — Use each group\'s own population as the base.',
        `Step 2 — Men: ${WE1.menW} ÷ ${inr(WE1.men)} × 100 = ${WE1_MEN} per cent.`,
        `Step 3 — Women: ${WE1.womenW} ÷ ${inr(WE1.women)} × 100 = ${WE1_WOMEN} per cent.`,
        `Step 4 — All: ${WE1.menW + WE1.womenW} ÷ ${inr(WE1.men + WE1.women)} × 100 = ${WE1_ALL} per cent.`,
      ],
      v: vWE1,
      n: 'Let us practise. For men, five hundred and forty workers out of one thousand men gives fifty four per cent. For women, two hundred and sixty out of one thousand gives twenty six per cent. For the whole village, eight hundred out of two thousand gives forty per cent. A common mistake is to divide women workers by the total population; always use the group\'s own population.',
    }),
    sl('diagram', 'The gap at a glance', {
      v: vWpr,
      n: 'Here are the same three ratios as bars. The women\'s bar is about half the men\'s. Does that mean women in this village work less? Not necessarily. Cooking, fetching water and caring for children take long hours, but they are not counted as economic activity. So part of the gap is a gap in what we measure, not only in what people do.',
    }),
    sl('concept', 'Who participates more?', {
      b: 'Three broad patterns in India.',
      v: vPatterns,
      n: 'Three patterns stand out. Men have a higher ratio than women. Villages have a higher ratio than towns, because poor farm families need every member to work, while in towns more young people stay in school and college. And rural women are more often counted as workers than urban women, because they work on family farms and in family enterprises. These are broad patterns; the survey reports give exact figures.',
    }),
    sl('check', 'Quick check: compute a ratio', {
      b: 'An imagined hill district has 80,000 people and 30,000 workers. What is its worker-population ratio?',
      chk: 'm_wpr_calc',
      n: 'Divide workers by population and multiply by one hundred. Watch out for options that use the wrong base.',
    }),
    sl('concept', 'Status of workers', {
      b: 'Workers are grouped by the **terms** on which they work.',
      v: vStatusTypes,
      n: 'Workers are also classified by status. The self-employed own and run their own enterprise: a farmer, a shopkeeper, a potter. Regular salaried employees are hired by someone else and paid regularly, often with benefits like paid leave. Casual wage labourers are hired for a day or a few days at a time, with no assurance of further work. Self-employment has long been the largest of the three in India.',
    }),
    sl('example', 'Worked example 2: status shares in a block', {
      b: `A survey of ${WE2_T} workers in an imagined block of Rajasthan finds ${WE2.self} self-employed, ${WE2.casual} casual and ${WE2.regular} regular salaried.`,
      bl: [
        `Step 1 — Total: ${WE2.self} + ${WE2.casual} + ${WE2.regular} = ${WE2_T}.`,
        `Step 2 — Self-employed: ${WE2.self} ÷ ${WE2_T} × 100 = ${WE2_S} per cent.`,
        `Step 3 — Casual: ${WE2_C} per cent; regular: ${WE2_R} per cent. Check: the shares add to 100.`,
        'Step 4 — Interpret: most people work for themselves or by the day; secure jobs are few.',
      ],
      v: vStatusBar,
      n: 'Add the three groups to get five hundred workers. Two hundred and sixty self-employed is fifty two per cent. One hundred and fifty five casual workers is thirty one per cent, and eighty five regular employees is seventeen per cent. The shares add up to one hundred, which is a quick check. The interpretation earns marks too: secure, regular jobs are the smallest group.',
    }),
    sl('diagram', 'Where and for whom each status is common', {
      v: vStatusPattern,
      n: 'Status differs by place and by gender. In villages, most people farm their own small plots or labour on others\' farms, so self-employment and casual work dominate. In towns, offices, factories and services hire regularly, so regular salaried jobs are more common. Women are more often self-employed or casual, partly because fewer have had the education and freedom to move that regular jobs often need.',
    }),
    sl('check', 'Quick check: what status?', {
      b: 'A man hired by building contractors each morning at a labour chowk, with no written contract, is a…',
      chk: 'm_casual',
      n: 'Ask two questions. Does he own an enterprise? Is he hired on regular terms? If the answer to both is no, which status is left?',
    }),
    sl('concept', 'Work across the three sectors', {
      b: 'Farming still employs the **largest share** of workers, but its share is **falling**.',
      v: vSectors,
      n: 'Since independence, the share of workers in farming and allied activities has fallen, but it is still the largest single share. Industry has gained a little, with construction an important source of new work. Services have gained the most. Yet output has shifted to services much faster than workers have, so many people remain in farming, where output per worker is low.',
    }),
    sl('diagram', 'Jobless growth', {
      b: '**Jobless growth**: GDP rises much faster than employment.',
      v: vJobless,
      n: 'Look at this imagined state. Over ten years, its output index climbs steeply, but the employment index rises only a little. This is called jobless growth. It happens when growth comes mainly from better machines and higher productivity rather than from hiring more people. Growth is still welcome, but it does not by itself solve the problem of finding work for a growing labour force.',
    }),
    sl('example', 'Worked example 3: measuring the gap', {
      b: `Output index: 100 → ${WE3.out}. Employment index: 100 → ${WE3.emp}. How far did jobs lag output?`,
      bl: [
        'Step 1 — With a base of 100, growth in per cent is the new index minus 100.',
        `Step 2 — Output grew ${WE3_OG} per cent; employment grew ${WE3_EG} per cent.`,
        `Step 3 — Gap: ${WE3_OG} − ${WE3_EG} = ${WE3_OG - WE3_EG} percentage points.`,
        'Step 4 — Conclude: a sign of jobless growth.',
      ],
      v: vWE3,
      n: 'Index numbers make growth easy to read. When the base is one hundred, an index of one hundred and fifty means fifty per cent growth, and one hundred and ten means ten per cent. So output grew fifty per cent while jobs grew only ten per cent, a gap of forty percentage points. Say percentage points, not per cent, when you subtract two percentages.',
    }),
    sl('diagram', 'Casualisation', {
      b: 'A rising share of **casual** wage work in total employment.',
      v: vCasual,
      n: 'Over several decades, the share of casual wage labour in India rose compared with regular jobs. Economists call this casualisation. Regular jobs grew slowly, many employers preferred short-term hiring, and new entrants to the labour force often found only casual work. Casual workers have the least security of all, so casualisation means more families depend on uncertain daily earnings.',
    }),
    sl('check', 'Quick check: growth without jobs', {
      b: 'What does jobless growth describe?',
      chk: 'm_jobless',
      n: 'Think back to the two lines on the chart. Which one ran ahead, and which one lagged behind?',
    }),
    sl('concept', 'Formal and informal sectors', {
      b: 'The **formal sector**: all public-sector units and private units hiring **10 or more** workers. Everyone else is **informal**.',
      v: vFormal,
      n: 'Workers are also divided by the sector they work in. The formal, or organised, sector includes every public-sector establishment and private establishments that hire ten or more workers. Its workers usually have regular incomes, social security and the right to form trade unions. The informal sector covers farmers, own-account workers, small enterprises and casual labourers, who mostly have none of these protections.',
    }),
    sl('diagram', 'Informalisation', {
      b: 'A growing share of work is informal, **even inside large firms**.',
      v: vInformal,
      n: 'Formal jobs have grown slowly. Many firms, including large ones, now hire through contractors, paying by the day or by the piece without benefits. So most new work created in recent decades has been informal. This trend is called informalisation. Remember that it is the terms of work, not the size of the employer, that decide whether a worker is formal or informal.',
    }),
    sl('two-column', 'Can informal workers be protected?', {
      cols: [
        '**Why it matters**\n- Most workers are informal\n- Illness or old age can push families into poverty\n- Low wages, no bargaining power',
        '**What can help**\n- Registration and social security\n- Enforcing minimum wages\n- Credit, skills and markets for small units',
      ],
      v: vProtect,
      n: 'Since most Indian workers are informal, their welfare is central to the employment question. Measures that can help include registering informal workers so that health, accident and pension schemes can reach them, enforcing minimum wages and safe conditions, and giving small enterprises credit, skills and markets so that they can grow and pay better. Protection and productivity need to rise together.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up part one. A worker is anyone taking part in production, paid or not. The labour force is the workforce plus the unemployed. The worker-population ratio is higher for men and in villages. Self-employment is the largest status. Output has grown faster than jobs, and the shares of casual and informal work have risen.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define a **worker** by taking part in production, not by earning a wage.',
        'Use the **group\'s own population** as the base for its ratio; show the formula and the working.',
        'When subtracting two percentages, write **percentage points**.',
        'Formal or informal depends on **terms of work**: a contract worker in a big firm is informal.',
        'Give a **reason** with every pattern (rural–urban, men–women); the reason earns the second mark.',
        '3 marks = three distinct points; 5 marks = five points with an example or figure.',
      ],
      n: 'A few tips. Define a worker by participation in production. In numericals, write the formula, use the right base and show each step. Write percentage points when you subtract percentages. Judge formal or informal by the terms of work. And whenever you describe a pattern, add the reason; that is usually where the second mark lies.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Employment — Part 2: Unemployment, Problems and Policies',
  goals: [
    'Explain who is unemployed and calculate unemployment from labour force data',
    'Distinguish open, disguised and seasonal unemployment and explain why some are hard to measure',
    'Explain the main employment problems in India',
    'Evaluate how the government creates employment, including MGNREGA 2005',
  ],
  slides: [
    sl('title', 'Employment — Part 2', {
      b: 'Part 2 — **unemployment**: its types, how it is measured, and what the **government** does about it.',
      v: vRoute2,
      n: 'In part one we counted workers. Now we look at people who want work but cannot find enough of it. We will meet three kinds of unemployment that are common in India, see why some of them hide inside the workforce, and then examine the main ways in which the government tries to create jobs.',
    }),
    sl('concept', 'Who is unemployed?', {
      b: 'A person is **unemployed** if he or she is **not working** but is **seeking or available** for work.',
      v: vUnempMeaning,
      n: 'Being without work is not enough to be counted as unemployed. A full-time student or a retired person is not working, but is not looking for work either, so they are outside the labour force. A person is unemployed only if she has no work and is seeking or available for it. So the number of unemployed equals the labour force minus the workforce.',
    }),
    sl('example', 'Worked example 4: counting the unemployed', {
      b: `An imagined town has a labour force of ${inr(WE4.lf)} and a workforce of ${inr(WE4.wf)}.`,
      bl: [
        'Step 1 — Unemployed = labour force − workforce.',
        `Step 2 — ${inr(WE4.lf)} − ${inr(WE4.wf)} = ${WE4_U} people.`,
        `Step 3 — As a share of the labour force: ${WE4_U} ÷ ${inr(WE4.lf)} × 100 = ${WE4_R} per cent.`,
        'Step 4 — Use the labour force, not the population, as the base.',
      ],
      v: vUnemp,
      n: 'Eight thousand people are in the labour force and seven thousand six hundred are working, so four hundred are unemployed. As a share of the labour force that is five per cent. Notice the base: unemployment is compared with the labour force, because people outside it, such as students, are not looking for work.',
    }),
    sl('diagram', 'Three kinds of unemployment', {
      v: vTypes,
      n: 'Three kinds are especially important in India. Open unemployment is the plainest: people willing and able to work find none, often educated young people in towns. Disguised unemployment hides on family farms where more people work than are needed. Seasonal unemployment comes and goes with the crop calendar, leaving farm workers idle for months between harvest and the next sowing.',
    }),
    sl('check', 'Quick check: an electrician without work', {
      b: 'A trained electrician has searched for work for eight months without success. What type of unemployment is this?',
      chk: 'm_open_unemp',
      n: 'He is willing, able and actively searching, yet has no work at all. Which type fits?',
    }),
    sl('example', 'Worked example 5: spotting disguised unemployment', {
      b: 'Output of an imagined family plot as more members join the work.',
      bl: [
        'Step 1 — Read where the output curve stops rising.',
        `Step 2 — Output reaches its maximum with ${WE5_NEEDED} workers.`,
        `Step 3 — With 7 working: 7 − ${WE5_NEEDED} = ${WE5_DISG} add nothing to output.`,
        `Step 4 — These ${WE5_DISG} are disguisedly unemployed: busy, but not productive.`,
      ],
      v: vDisg,
      n: 'This chart shows the harvest of an imagined family plot as more members work on it. Output rises with the first four workers and then stays flat. So if seven members work, three of them add nothing to output, even though they look busy every day. They are disguisedly unemployed. If they found other work, the family\'s harvest would not fall and its income would rise.',
    }),
    sl('check', 'Quick check: idle in winter', {
      b: 'True or false? A tea-garden worker idle in winter, when plucking stops, is disguisedly unemployed.',
      chk: 'tf_seasonal',
      n: 'Ask yourself: is the idleness caused by too many hands on the job, or by the season?',
    }),
    sl('concept', 'Measuring employment', {
      b: 'Data come from the **Census**, the **labour force surveys of the National Statistical Office** and **employment exchanges**.',
      v: vMeasure,
      n: 'India measures employment through the Census once every ten years, through regular labour force surveys of the National Statistical Office, and through records of employment exchanges. Even so, disguised and seasonal unemployment are hard to capture, because the people affected are counted as workers for much of the year. Unpaid family work also blurs the line between working and idle.',
    }),
    sl('concept', 'The main problems', {
      v: vProblems,
      n: 'Pulling the threads together, India faces four linked problems. Formal jobs have grown slowly, so most new work is informal. Farming still holds far more workers than it needs. Many educated young people lack the skills employers want. And women\'s participation remains low, leaving a great deal of talent unused. Good policy has to work on all four.',
    }),
    sl('check', 'Quick check: jobs without takers', {
      b: 'A city has jobless graduates while firms cannot find welders and nurses. What does this point to?',
      chk: 'm_skill_mismatch',
      n: 'The jobs exist and so do the job seekers. What is missing between them?',
    }),
    sl('diagram', 'How the government creates jobs', {
      b: 'Three routes: **direct**, **indirect** and **programmes**.',
      v: vGovt,
      n: 'The government creates employment in three ways. Directly, by hiring teachers, nurses, clerks and engineers in its own departments and public enterprises. Indirectly, when its output and spending lead private firms to hire: a public power plant buys coal and transport, so mines and truck owners take on workers. And through programmes that provide wage employment, support self-employment and build skills.',
    }),
    sl('diagram', 'Kinds of employment programmes', {
      v: vProgrammes,
      n: 'Employment programmes come in three kinds. Wage-employment programmes offer paid work on public works such as ponds, roads and tree planting. Self-employment programmes give loans, subsidies and training so that people can start their own enterprises. Skill-development programmes train people for the jobs that firms need. Many schemes combine these approaches.',
    }),
    sl('diagram', 'The rural employment guarantee', {
      b: '**MGNREGA 2005**: a legal right to wage work for rural households.',
      v: vMgnrega,
      n: 'The Mahatma Gandhi National Rural Employment Guarantee Act of two thousand and five turned rural wage work into a legal right. A rural household whose adults want unskilled manual work can demand up to one hundred days of it in a year. If work is not given in time, an unemployment allowance is due. Wages are paid into bank or post office accounts.',
    }),
    sl('two-column', 'Weighing government policies', {
      cols: [
        '**Gains**\n- Lean-season income for poor households\n- Useful local assets\n- Credit and skills for small enterprises',
        '**Concerns**\n- Delays in wages and fewer days than demanded in places\n- Formal jobs still grow slowly\n- Skills do not always match demand',
      ],
      v: vAppraise,
      n: 'How well have these policies worked? They have given income and some security to millions of poor households, built ponds, roads and other assets, and helped many start small enterprises. At the same time, delays in payments, uneven delivery and the slow growth of formal jobs limit their reach. A fair answer in the exam presents both sides and suggests improvements.',
    }),
    sl('check', 'Quick check: a loan for a repair shop', {
      b: 'A young woman gets a subsidised loan and training and opens a mobile-repair shop. What kind of programme is this?',
      chk: 'm_self_prog',
      n: 'Is she being paid wages for public work, or helped to start her own enterprise?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up part two. The unemployed are those seeking or available for work without it; their number is the labour force minus the workforce. Open, disguised and seasonal unemployment are the main types, and the last two are hard to measure. The government creates jobs directly, indirectly and through wage, self-employment and skill programmes such as MGNREGA.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Disguised = **output would not fall** if some workers left; seasonal = **no work in some months**.',
        'Unemployed = labour force − workforce; compare with the **labour force**, not the population.',
        'Direct vs indirect job creation: give one **example** of each.',
        'MGNREGA: **up to 100 days**, **rural households**, unskilled manual work, allowance if no work in time.',
        'Policy questions: state **gains and limits**, then a suggestion; keep the wording neutral.',
      ],
      n: 'Final tips for part two. Learn the test for disguised unemployment: output would not fall if some workers left. Use the labour force as the base for unemployment. Give a concrete example for direct and indirect job creation. State the features of the rural guarantee precisely. And in any policy question, weigh gains against limits before you suggest an improvement.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Employment: Growth, Informalisation and Other Issues — notes',
  sections: [
    {
      h: '1. Workers, workforce and labour force',
      t: 1,
      b: 'A **worker** is a person engaged in any **economic activity**, that is, any activity that contributes to the production of goods and services. Payment is not the test: unpaid helpers in a family farm or shop are workers, and so are regular employees temporarily absent through illness. Full-time students, home-makers doing only household work, and pensioners doing no economic activity are not workers.\n\n- **Workforce:** all persons actually working.\n- **Unemployed:** persons not working but **seeking or available** for work.\n- **Labour force = workforce + unemployed.** People who neither work nor seek work are outside it.',
      terms: [
        ['Worker', 'A person engaged in an activity that adds to the production of goods and services, paid or unpaid.'],
        ['Workforce', 'The number of persons actually working.'],
        ['Labour force', 'The workforce together with the unemployed who are seeking or available for work.'],
      ],
      v: vForce,
      vs: [vWorker],
    },
    {
      h: '2. Worker-population ratio and participation',
      t: 1,
      b: '**Worker-population ratio = (number of workers ÷ total population) × 100.** It indicates what proportion of the population is actively contributing to production; it is used to compare regions and groups.\n\n**Broad patterns in India** (qualitative; the latest survey reports give figures):\n- Higher for **men** than for **women**: much of the work women do at home is not counted as economic activity, and social norms limit women\'s paid work.\n- Higher in **rural** than in **urban** areas: poor farm households need everyone\'s labour; in towns more young people study longer.\n- Higher for **rural women** than for **urban women**: rural women work on family farms and enterprises.',
      terms: [['Worker-population ratio', 'Workers as a percentage of the total population of a region or group.']],
      v: vWpr,
      vs: [vPatterns],
    },
    {
      h: '3. Status of workers and distribution across sectors',
      t: 1,
      b: '**By status:**\n- **Self-employed:** own and operate an enterprise; the **largest** category in India.\n- **Regular salaried employees:** hired on a regular basis and paid wages or salaries, often with benefits.\n- **Casual wage labourers:** hired for short spells, with no assurance of continued work or social security.\n\n**Rural vs urban:** self-employment and casual work dominate villages; regular salaried jobs are more common in towns. **Women** are more often self-employed or casual.\n\n**By sector:** the share of the **primary sector** in employment has **declined** but is still the largest; the **tertiary** share has risen most and the **secondary** share somewhat. Output has moved towards services faster than workers, leaving many in low-productivity farming.',
      terms: [
        ['Self-employed', 'A worker who owns and runs an enterprise to earn a living.'],
        ['Casual wage labourer', 'A worker hired by others for short periods, without regular work or benefits.'],
        ['Regular salaried employee', 'A worker hired on a regular basis and paid a wage or salary.'],
      ],
      v: vStatusTypes,
      vs: [vStatusPattern, vSectors],
    },
    {
      h: '4. Growth, casualisation and informalisation',
      t: 1,
      b: '**Jobless growth:** GDP has grown faster than employment, because much growth came from technology and productivity rather than from more hiring.\n\n**Casualisation:** over several decades the share of **casual** wage labour rose relative to regular salaried work, so more workers depend on uncertain daily earnings.\n\n**Formal sector:** all **public-sector** establishments and **private** establishments employing **10 or more** hired workers. **Informal sector:** all other enterprises and workers — farmers, agricultural labourers, own-account workers, small enterprises and casual labour.\n\n**Informalisation:** a rising share of the workforce works informally, including **contract workers inside formal firms**. Causes: slow growth of formal jobs, cost-cutting through contract hiring, slower public-sector hiring.\n\n**Protecting informal workers:** registration and social security (health, accident cover, pensions), enforcement of minimum wages and safety, and credit, skills and market access for small enterprises.',
      terms: [
        ['Jobless growth', 'A situation in which output grows without a proportionate rise in employment.'],
        ['Casualisation', 'A rise in the share of casual wage labour in total employment.'],
        ['Informalisation', 'A rise in the share of workers in the informal sector or on informal terms.'],
      ],
      v: vJobless,
      vs: [vFormal, vInformal, vProtect],
    },
    {
      h: '5. Unemployment: meaning, types and measurement',
      t: 2,
      b: 'A person is **unemployed** when he or she has no work but is seeking or available for it. **Unemployed = labour force − workforce.**\n\n- **Open unemployment:** willing and able to work at the prevailing wage, but no work at all; common among educated youth in towns.\n- **Disguised unemployment:** more persons engaged in an activity than required; withdrawing some would **not reduce output**. Common on small family farms.\n- **Seasonal unemployment:** work available only in certain months, as in farming between harvest and sowing.\n\n**Data sources:** the **Census of India**, the **labour force surveys of the National Statistical Office (NSO)**, and **employment exchanges**. Disguised and seasonal unemployment are hard to measure because the persons concerned appear to be working.',
      terms: [
        ['Open unemployment', 'Being without any work while willing and able to work at the going wage.'],
        ['Disguised unemployment', 'Surplus workers whose removal would not reduce total output.'],
        ['Seasonal unemployment', 'Lack of work during certain seasons of the year.'],
      ],
      v: vTypes,
      vs: [vDisg, vMeasure],
    },
    {
      h: '6. Problems and government policies',
      t: 2,
      b: '**Problems:** slow growth of formal jobs; underemployment in farming; mismatch between the skills of job seekers and the needs of employers; low participation of women.\n\n**How the government generates employment:**\n1. **Directly** — hiring in its departments, services and public enterprises.\n2. **Indirectly** — its output and investment raise demand for goods and services of private firms, which then hire.\n3. **Programmes** — **wage employment** on public works; **self-employment** through loans, subsidies and training; **skill development** for jobs in demand.\n\n**MGNREGA 2005:** a legal guarantee of up to **100 days** of unskilled manual wage work a year to every **rural household** that asks; an unemployment allowance if work is not given in time; wages paid into accounts; works such as water conservation and rural roads.\n\n**Appraisal (balanced):** these measures have given income and security to many poor households and created assets, but implementation gaps (such as payment delays) and the slow growth of formal jobs limit their impact; better skills and labour-intensive growth are widely seen as the long-term answer.',
      terms: [
        ['Wage-employment programme', 'A scheme that offers paid work, usually on public works.'],
        ['Self-employment programme', 'A scheme that helps people start their own enterprises with credit, subsidies and training.'],
        ['MGNREGA 2005', 'The Act that guarantees rural households up to 100 days of wage work a year.'],
      ],
      v: vGovt,
      vs: [vProgrammes, vMgnrega, vProblems],
    },
  ],
  tips: '**Common mistakes**\n- Saying an unpaid family helper is not a worker: anyone taking part in production is a worker.\n- Dividing women workers by the total population when asked for the women\'s ratio.\n- Calling a contract worker in a large factory formal: the **terms** of work decide.\n- Mixing up disguised unemployment (output would not fall) and seasonal unemployment (no work in some months).\n- Writing that MGNREGA gives 100 days to each **person** or to **urban** youth: it is up to 100 days per **rural household**.\n- Writing "per cent" for the difference of two percentages: it is **percentage points**.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or value.\n- 2 marks: two points, or a definition with an example (about 30–50 words).\n- 3 marks: three distinct points (about 50–80 words).\n- 5 marks: five points with examples, data or a balanced judgement (about 80–120 words).\n\n**Data in SOYL practice** are imagined; board papers supply their own tables. Show the formula, the substitution and the result with its unit.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who is a **worker**?', 'Anyone engaged in an activity that adds to the production of goods and services, **paid or unpaid**.', 'definition', 1],
  ['Is an unpaid helper in the family shop a worker?', '**Yes**: she takes part in production.', 'example', 1],
  ['Is a full-time student a worker?', '**No**, if he does no economic activity.', 'example', 1],
  ['**Workforce**', 'The persons **actually working**.', 'definition', 1],
  ['**Labour force**', '**Workforce + unemployed** (those seeking or available for work).', 'definition', 1],
  ['Worker-population ratio: formula', '**Workers ÷ population × 100**.', 'formula', 1],
  ['Ratio: men or women higher?', '**Men**; much of women\'s household work is not counted.', 'fact', 1],
  ['Ratio: rural or urban higher?', '**Rural**; poor farm families need every hand, townspeople study longer.', 'fact', 1],
  ['Three categories of workers by **status**', 'Self-employed; regular salaried employees; casual wage labourers.', 'concept', 1],
  ['Largest status category in India', '**Self-employed**.', 'fact', 1],
  ['Where are regular salaried jobs more common?', 'In **towns and cities**, where offices and factories hire regularly.', 'fact', 1],
  ['Sector employing the largest share of workers', '**Primary** (farming and allied), though its share is falling.', 'fact', 1],
  ['**Jobless growth**', 'GDP grows much faster than employment.', 'definition', 1],
  ['**Casualisation**', 'A rising share of **casual** wage labour in total employment.', 'definition', 1],
  ['**Formal sector**', 'All public-sector units + private units hiring **10 or more** workers.', 'definition', 1],
  ['**Informal sector**', 'Farmers, own-account workers, small enterprises and casual labour, mostly unprotected.', 'definition', 1],
  ['**Informalisation**', 'A rising share of work on informal terms, **even inside formal firms**.', 'definition', 1],
  ['Is a contract worker in a big factory formal?', 'Usually **no**: without security and benefits the work is informal.', 'exam-tip', 1],
  ['Three ways to protect informal workers', 'Social security after registration; minimum wages; credit, skills and markets for small units.', 'concept', 1],
  ['Who is **unemployed**?', 'A person **without work** who is **seeking or available** for it.', 'definition', 2],
  ['Unemployed: formula', '**Labour force − workforce**.', 'formula', 2],
  ['**Open unemployment**', 'Willing and able to work at the going wage, but no work at all.', 'definition', 2],
  ['**Disguised unemployment**: the test', 'If some workers left, **output would not fall**.', 'definition', 2],
  ['**Seasonal unemployment**', 'Work only in some months, e.g. between harvest and sowing.', 'definition', 2],
  ['7 work a plot that 4 can manage', '**3** are disguisedly unemployed.', 'example', 2],
  ['Sources of employment data', 'Census; NSO labour force surveys; employment exchanges.', 'fact', 2],
  ['Direct vs indirect job creation', 'Direct: government hires. Indirect: its output and spending make private firms hire.', 'concept', 2],
  ['Wage-employment vs self-employment programme', 'Wage: paid work on public works. Self: loans and training to start an enterprise.', 'concept', 2],
  ['**MGNREGA 2005** in one line', 'Up to **100 days** of unskilled manual wage work a year for every **rural household** that asks.', 'fact', 2],
  ['Skills mismatch', 'Job seekers lack the skills employers need, so jobs and jobless coexist.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Employment: Growth, Informalisation and Other Issues',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_worker_unpaid', 'm_formal_def', 'm_seasonal', 'ar_jobless'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_worker_force', 's_direct_indirect', 's3_inform_causes'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_status', 'l_policies'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the report and answer all parts. Part (c) has an internal choice.', items: ['cb_panchayat'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Employment: Growth, Informalisation and Other Issues',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_not_worker', 'm_labour_force', 'm_rural_women', 'm_regular', 'm_contract_informal', 'm_disguised', 'm_indirect_job', 'm_mgnrega', 'ar_women_wpr', 'ar_disguised'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_formal_informal', 's_dis_seasonal', { attempt: 1, keys: ['s_rural_urban_wpr', 's_mgnrega_feat'] }, 's3_self_emp', { attempt: 1, keys: ['s3_protect_inf', 's3_jobless_fix'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_informal', { attempt: 1, keys: ['l_unemp_types', 'l_rural_jobs'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage or table and answer all parts. Part (c) of each has an internal choice.', items: ['cb_sitapur', 'cb_seasons'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (workforce participation, status, sectors, jobless growth, casualisation, formal and informal sectors, informalisation) and t02 (unemployment types and data, problems, government policies incl. MGNREGA 2005) of cbse-12-economics-ch11 only',
    originality: 'every case, report, table and figure written for this chapter (imagined districts, villages, firms and people, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build (village ratios ${WE1_MEN}/${WE1_WOMEN}/${WE1_ALL} per cent; block status ${WE2_S}/${WE2_C}/${WE2_R} per cent; output vs jobs ${WE3_OG} vs ${WE3_EG} per cent; town unemployed ${WE4_U}, ${WE4_R} per cent; ${WE5_DISG} disguisedly unemployed; question-bank figures asserted in questions.mjs); India's patterns stated qualitatively only`,
    facts: 'formal sector = public sector + private establishments with 10 or more hired workers; data sources Census, NSO labour force surveys, employment exchanges; MGNREGA 2005 (up to 100 days per rural household, allowance if work not given in time); no recent statistics stated',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
