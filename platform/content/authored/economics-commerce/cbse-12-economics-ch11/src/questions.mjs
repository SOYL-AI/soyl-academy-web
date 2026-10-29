// CBSE 12 Economics, ch11 Employment: Growth, Informalisation and Other Issues — question bank. Every
// scenario, table and passage is written by SOYL (imagined districts, villages, firms and people,
// labelled as such); no NCERT exercise or board/sample-paper item is reused. Real-world facts are limited
// to stable, commonly taught ones (definitions, the qualitative pattern of India's workforce, MGNREGA
// 2005 in broad terms, the Census and NSO surveys as data sources). No recent Indian statistics are
// stated. Every computed figure is derived here, never typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
export const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// Worker-population ratio of an imagined district.
export const DIST = { pop: 500000, workers: 190000 };
export const DIST_WPR = pct(DIST.workers, DIST.pop); // 38
// Gender split of an imagined village.
export const VIL = { men: 1300, women: 1200, menW: 676, womenW: 324 };
export const VIL_MEN = pct(VIL.menW, VIL.men); // 52
export const VIL_WOMEN = pct(VIL.womenW, VIL.women); // 27
export const VIL_ALL = pct(VIL.menW + VIL.womenW, VIL.men + VIL.women); // 40
// Status of workers in an imagined block.
export const BLK = { self: 208, casual: 120, regular: 72 };
export const BLK_TOTAL = BLK.self + BLK.casual + BLK.regular; // 400
export const BLK_SELF = pct(BLK.self, BLK_TOTAL); // 52
export const BLK_CASUAL = pct(BLK.casual, BLK_TOTAL); // 30
// Formal share in an imagined town.
export const TOWN = { workers: 1250, formal: 125 };
export const TOWN_FORMAL = pct(TOWN.formal, TOWN.workers); // 10
// Labour force and unemployment in an imagined city.
export const CITY = { lf: 5200, wf: 4940 };
export const CITY_UNEMP = CITY.lf - CITY.wf; // 260
export const CITY_RATE = pct(CITY_UNEMP, CITY.lf); // 5
// Jobless growth (index numbers, imagined state).
export const IDX = { out0: 100, out1: 160, emp0: 100, emp1: 115 };
export const OUT_GROWTH = pct(IDX.out1 - IDX.out0, IDX.out0); // 60
export const EMP_GROWTH = pct(IDX.emp1 - IDX.emp0, IDX.emp0); // 15
// Disguised unemployment on a family farm.
export const FARM = { working: 7, needed: 4 };
export const FARM_DISGUISED = FARM.working - FARM.needed; // 3
// Wage-employment days.
export const JOB = { guarantee: 100, got: 64 };
export const JOB_LEFT = JOB.guarantee - JOB.got; // 36
// Casualisation in an imagined district: casual workers per 100 workers.
export const CAS = { before: 24, after: 32 };
export const CAS_RISE = CAS.after - CAS.before; // 8
// Case: Sitapur district table (thousands).
export const SIT = { ruralPop: 800, ruralW: 336, urbanPop: 400, urbanW: 136 };
export const SIT_RURAL = pct(SIT.ruralW, SIT.ruralPop); // 42
export const SIT_URBAN = pct(SIT.urbanW, SIT.urbanPop); // 34
export const SIT_ALL = pct(SIT.ruralW + SIT.urbanW, SIT.ruralPop + SIT.urbanPop); // 39.3
// Case: Kanpur-style garment unit (imagined Ratnapur Garments).
export const GAR = { perm0: 400, contract0: 100, perm1: 250, contract1: 350 };
export const GAR_C0 = pct(GAR.contract0, GAR.perm0 + GAR.contract0); // 20
export const GAR_C1 = pct(GAR.contract1, GAR.perm1 + GAR.contract1); // 58.3
// Case: wage-employment works in an imagined panchayat.
export const PAN = { days: 3200, wage: 250, households: 80 };
export const PAN_WAGES = PAN.days * PAN.wage; // 8,00,000
export const PAN_AVG = PAN.days / PAN.households; // 40

if (DIST_WPR !== 38 || VIL_MEN !== 52 || VIL_WOMEN !== 27 || VIL_ALL !== 40 || BLK_TOTAL !== 400 || BLK_SELF !== 52 || BLK_CASUAL !== 30 || TOWN_FORMAL !== 10 || CITY_UNEMP !== 260 || CITY_RATE !== 5 || OUT_GROWTH !== 60 || EMP_GROWTH !== 15 || FARM_DISGUISED !== 3 || JOB_LEFT !== 36 || CAS_RISE !== 8 || SIT_RURAL !== 42 || SIT_URBAN !== 34 || SIT_ALL !== 39.3 || GAR_C0 !== 20 || GAR_C1 !== 58.3 || PAN_WAGES !== 800000 || PAN_AVG !== 40)
  throw new Error('ch11 figure check failed');

// ================================================================ t01 Workers, workforce and participation
Q('m_worker_unpaid', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Meena, 19, spends the whole day helping her parents run their family dhaba on a highway in Haryana. She is not paid a separate wage. In employment statistics she is',
  opts: [
    'a worker, because she takes part in an activity that produces a service and adds to GDP',
    'not a worker, because she receives no wage of her own',
    'unemployed, because she has no job outside the family',
    'outside the labour force, because family members are never counted',
  ],
  sol: 'Anyone who takes part in an economic activity counts as a worker, including unpaid helpers in a family enterprise. A wage is not the test; contributing to production is. She is neither unemployed nor outside the labour force.',
}));
Q('m_not_worker', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of these persons in an imagined Pune household would **NOT** be counted as a worker?',
  opts: [
    'Rohan, a full-time college student who does no paid or family work',
    'Asha, who runs a beauty parlour from the front room',
    'Vinod, a bank clerk on medical leave this week',
    'Kamla, who helps her son sell vegetables from his cart every morning',
  ],
  sol: 'A full-time student who does no economic activity is not a worker. The parlour owner is self-employed; a regular employee temporarily absent due to illness is still a worker; an unpaid helper in a family enterprise is a worker.',
}));
Q('m_wpr_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'The worker-population ratio of a country is a useful indicator because it shows',
  opts: [
    'what proportion of the population is actively contributing to the production of goods and services',
    'how many people are looking for work but cannot find it',
    'the average wage earned by workers in a year',
    'how many workers are employed by the government',
  ],
  sol: 'The ratio = workers ÷ population × 100, so it tells us what share of people take part in production. The number seeking work is unemployment; wages and government jobs are different measures.',
}));
Q('m_wpr_calc', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'An imagined hill district has a population of 80,000, of whom 30,000 are workers. Its worker-population ratio is',
  opts: ['37.5 per cent', '30 per cent', '62.5 per cent', '2.67 per cent'],
  sol: 'Ratio = 30,000 ÷ 80,000 × 100 = 37.5 per cent. 62.5 is the share of non-workers; the other two misuse the numbers.',
}));
Q('m_labour_force', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement correctly describes the **labour force** of an economy?',
  opts: [
    'It includes those who are working and those who are not working but are seeking or available for work',
    'It includes only those who are actually working',
    'It includes the whole population of working age, whether or not they want work',
    'It includes only workers in factories and offices',
  ],
  sol: 'Labour force = workforce (those working) + the unemployed (seeking or available for work). The workforce alone leaves out the unemployed; people of working age who do not want work, such as full-time students, are outside it.',
}));
Q('m_rural_women', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In India, a larger share of rural women than urban women is counted as working. The best explanation is that',
  opts: [
    'many poor rural households need every member\'s labour on farms and in family enterprises, while more urban women stay in education or home-based roles that are not counted',
    'urban areas have no jobs open to women',
    'rural women earn higher wages than urban women',
    'the Census counts only rural women as workers',
  ],
  sol: 'Rural families, often poor and working on their own land or as labourers, rely on women\'s work. In towns, more women from better-off households study or do unpaid household work, which is not counted as economic activity. Urban jobs for women do exist, rural wages are not higher, and the Census counts workers everywhere.',
}));
Q('m_self_emp', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Shabana owns two sewing machines and stitches blouses to order in her house in Lucknow. Her status as a worker is',
  opts: ['self-employed', 'regular salaried employee', 'casual wage labourer', 'unemployed'],
  sol: 'She owns and runs her own enterprise and earns from it, so she is self-employed. She is not hired by anyone, either regularly or by the day.',
}));
Q('m_casual', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Ramesh waits at a labour chowk in Jaipur each morning and is hired for the day by building contractors, without any written contract. He is a',
  opts: ['casual wage labourer', 'regular salaried employee', 'self-employed worker', 'formal-sector worker'],
  sol: 'Being hired by others for a day or a few days, with no regular job or social security, makes him a casual wage labourer. He does not own an enterprise, and with no contract or benefits he is not in the formal sector.',
}));
Q('m_regular', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which worker in an imagined city is a **regular salaried employee**?',
  opts: [
    'A nurse employed by a hospital who gets a monthly salary and provident fund',
    'A plumber who visits homes and charges each customer separately',
    'A farm labourer hired for the harvest season',
    'A woman who runs a tiffin service from her kitchen',
  ],
  sol: 'A regular salaried employee is hired by someone else and paid regularly, often with benefits. The plumber and the tiffin service are self-employed; the harvest labourer is a casual worker.',
}));
Q('m_status_largest', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Taking all of India\'s workers together, the largest category by **status** has long been',
  opts: ['self-employed workers', 'regular salaried employees', 'casual wage labourers', 'government employees'],
  sol: 'Self-employment (farmers on their own land, shopkeepers, artisans, vendors) has long been the largest category, followed by casual wage labour; regular salaried jobs are the smallest share. Government employees are a part of regular salaried workers.',
}));
Q('m_urban_regular', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Regular salaried jobs form a much larger share of work in towns than in villages. Which reason best explains this?',
  opts: [
    'Offices, factories and services that hire people on regular terms are concentrated in towns and cities',
    'Village people do not want regular jobs',
    'Self-employment is banned in towns',
    'Casual work does not exist in towns',
  ],
  sol: 'Enterprises that hire on regular terms — offices, larger factories, hospitals, banks, schools — are concentrated in urban areas and need educated, skilled workers. In villages most people farm their own land or work as casual labourers. The other options are false.',
}));
Q('m_formal_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under the commonly used classification, which establishments together make up the **formal sector**?',
  opts: [
    'All public-sector establishments and private establishments that employ 10 or more hired workers',
    'Only government departments and ministries',
    'All enterprises that sell goods in a market',
    'All farms, shops and workshops with at least one worker',
  ],
  sol: 'The formal (organised) sector = all public-sector establishments + private-sector establishments hiring 10 or more workers. Everyone else (farmers, own-account workers, small enterprises) is in the informal sector.',
}));
Q('m_informal_example', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of these workers is in the **informal** sector?',
  opts: [
    'A cobbler working on his own at a pavement in Patna',
    'A clerk in a state government treasury office',
    'An engineer in a public-sector power company',
    'An accountant in a private firm employing 300 people on regular terms',
  ],
  sol: 'An own-account worker on the pavement has no employer, no protection and no regular income, so he is informal. Government and public-sector employees, and regular staff of a large private firm, are in the formal sector.',
}));
Q('m_jobless', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: '"Jobless growth" describes a situation in which',
  opts: [
    'GDP grows rapidly, but employment grows much more slowly or hardly at all',
    'GDP falls while employment rises',
    'both GDP and employment stop growing',
    'every new job is created by the government',
  ],
  sol: 'In jobless growth, output rises (often because of better technology and productivity) without a matching rise in jobs. The other options describe different situations.',
}));
Q('m_casualisation', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Economists speak of the **casualisation** of the workforce when',
  opts: [
    'the share of casual wage labourers rises while the shares of self-employed and regular salaried workers fall',
    'more workers get permanent jobs with social security',
    'the workforce moves from services back to farming',
    'the government raises the minimum wage',
  ],
  sol: 'Casualisation is the rising share of casual wage work in total employment — work that is irregular and insecure. More permanent jobs is the opposite; the sector shift and minimum wages are different ideas.',
}));
Q('m_contract_informal', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A large automobile company in an imagined industrial town hires half its workers through contractors, paid by the day, with no provident fund or paid leave. Economists would describe these workers as',
  opts: [
    'informal workers inside a formal-sector firm, an example of informalisation',
    'formal workers, because the company is large and registered',
    'self-employed, because they are hired through contractors',
    'public-sector workers, because the company pays taxes',
  ],
  sol: 'What makes work formal is its terms: regular contracts, social security and protection. Contract workers without these are informal even inside a large registered company; their growing share is informalisation. Contract labour is not self-employment, and paying taxes does not make a firm public.',
}));
Q('m_sector_shift', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Over the decades since 1950, how has the distribution of India\'s workforce across sectors changed?',
  opts: [
    'The primary sector\'s share has fallen, though it still employs the largest share; the shares of the secondary and especially the service sector have risen',
    'The primary sector\'s share has risen steadily',
    'The service sector now employs more than three-quarters of all workers',
    'There has been no change at all in the sector shares',
  ],
  sol: 'The share of agriculture and allied work has declined but remains the largest single share; the secondary and tertiary sectors have gained, services more. The other options contradict this broad pattern.',
}));
Q('ar_women_wpr', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'The worker-population ratio for women in India is lower than that for men.',
  r: 'Much of the work that women do at home, such as cooking, cleaning and caring for the family, is not counted as economic activity.',
  sol: 'Both are true, and R explains A: unpaid household work is not counted as production for the market, so many women who work hard every day are not counted as workers, which lowers their measured ratio.',
}));
Q('ar_jobless', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'A rise in GDP does not always create a proportionate rise in employment.',
  r: 'Output can grow through better technology and higher productivity, so firms can produce more without hiring many more workers.',
  sol: 'Both are true, and R explains A: when growth comes from machines and productivity rather than more workers, jobs lag behind output (jobless growth).',
}));
Q('ar_formal_protect', ar({
  t: 1, d: 2, c: 'analysis', key: 'b',
  a: 'Workers in the formal sector usually enjoy social security benefits.',
  r: 'The informal sector includes millions of farmers, agricultural labourers and owners of small enterprises.',
  sol: 'Both statements are true, but R describes who is in the informal sector; it does not explain why formal workers get social security (labour laws and regular contracts do).',
}));
Q('ar_casual_secure', ar({
  t: 1, d: 2, c: 'understanding', key: 'd',
  a: 'Casual wage labourers enjoy greater job security than regular salaried employees.',
  r: 'Casual wage labourers are hired for short periods and are not assured of regular work.',
  sol: 'A is false: casual workers have the least security. R is true and is exactly why they are insecure.',
}));
Q('tf_unpaid_family', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? A boy who helps his father harvest wheat on the family farm during his school holidays is counted as a worker for the period he works.',
  sol: 'He takes part in production on the family farm, so he is a worker for that period, even without a wage.',
}));
Q('tf_formal_ten', tf({
  t: 1, d: 2, c: 'application', ans: false,
  stem: 'True or false? A private bakery in Indore that employs 6 hired workers belongs to the formal sector under the commonly used classification.',
  sol: 'A private establishment is in the formal sector only if it hires 10 or more workers; with 6 hired workers the bakery is in the informal sector.',
}));
Q('fb_labour_force', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The workforce together with those who are seeking or available for work but cannot find it is called the ___.',
  acc: [['labour force']],
  sol: 'Workforce + unemployed = labour force.',
}));
Q('mt_status', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined worker in Kochi with their status in employment.',
  pairs: [
    ['Thomas, who owns a small fishing boat and sells his own catch', 'Self-employed'],
    ['Lissy, a teacher in a school on a monthly salary with a pension scheme', 'Regular salaried employee'],
    ['Biju, a loader hired by the day at the harbour', 'Casual wage labourer'],
    ['Anu, a graduate who has applied for many jobs and is still looking', 'Unemployed (in the labour force)'],
  ],
  sol: 'Owning and running one\'s own enterprise is self-employment; a regular wage with benefits is regular salaried work; daily hire is casual labour; seeking work without finding it is unemployment.',
}));
Q('n_wpr', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: DIST_WPR, unit: '%',
  stem: `An imagined district in Odisha has a population of ${inr(DIST.pop)} and ${inr(DIST.workers)} workers. Calculate its worker-population ratio.`,
  sol: `Step 1: Ratio = workers ÷ population × 100.\nStep 2: ${inr(DIST.workers)} ÷ ${inr(DIST.pop)} × 100 = ${DIST_WPR} per cent.`,
}));
Q('n_women_wpr', num({
  t: 1, d: 3, c: 'application', marks: 2, value: VIL_WOMEN, unit: '%',
  stem: `In an imagined village in Bihar there are ${inr(VIL.men)} men and ${inr(VIL.women)} women. ${VIL.menW} men and ${VIL.womenW} women are workers. What is the worker-population ratio for **women**?`,
  sol: `Step 1: Use only the women: workers ÷ population × 100.\nStep 2: ${VIL.womenW} ÷ ${inr(VIL.women)} × 100 = ${VIL_WOMEN} per cent (for men it is ${VIL_MEN} per cent, and ${VIL_ALL} per cent overall).`,
  scheme: [['Correct formula with the women\'s figures', 1], [`Answer ${VIL_WOMEN} per cent`, 1]],
}));
Q('n_self_share', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: BLK_SELF, unit: '%',
  stem: `A survey of an imagined block finds ${BLK.self} self-employed workers, ${BLK.casual} casual wage labourers and ${BLK.regular} regular salaried employees. What percentage of the block's workers are self-employed?`,
  sol: `Step 1: Total workers = ${BLK.self} + ${BLK.casual} + ${BLK.regular} = ${BLK_TOTAL}.\nStep 2: Share = ${BLK.self} ÷ ${BLK_TOTAL} × 100 = ${BLK_SELF} per cent.`,
}));
Q('n_formal_share', num({
  t: 1, d: 2, c: 'application', marks: 1, value: 100 - TOWN_FORMAL, unit: '%',
  stem: `Of ${inr(TOWN.workers)} workers in an imagined small town, ${TOWN.formal} work in the formal sector. What percentage work in the **informal** sector?`,
  sol: `Step 1: Formal share = ${TOWN.formal} ÷ ${inr(TOWN.workers)} × 100 = ${TOWN_FORMAL} per cent.\nStep 2: Informal share = 100 − ${TOWN_FORMAL} = ${100 - TOWN_FORMAL} per cent.`,
}));
Q('n_casual_rise', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: CAS_RISE, unit: 'percentage points',
  stem: `In an imagined district, casual wage labourers were ${CAS.before} out of every 100 workers in one survey and ${CAS.after} out of every 100 in a later survey. By how many percentage points did their share rise?`,
  sol: `Step 1: Shares are ${CAS.before} per cent and ${CAS.after} per cent.\nStep 2: Rise = ${CAS.after} − ${CAS.before} = ${CAS_RISE} percentage points, a sign of casualisation.`,
}));
Q('s_worker_force', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the workforce and the labour force of an economy.',
  model: '1. The **workforce** is the number of people **actually working**, in any economic activity, paid or as family helpers.\n2. The **labour force** is the workforce **plus the unemployed**, those who are not working but are **seeking or available** for work. So the labour force is the larger of the two.',
  sol: 'Define both; show that the labour force adds the unemployed to the workforce.',
  scheme: [['Workforce defined', 1], ['Labour force defined with the unemployed', 1]],
}));
Q('s_rural_urban_wpr', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why is the worker-population ratio usually higher in rural areas than in urban areas of India? Give two reasons.',
  model: '1. Many rural households are **poor and own small farms**, so almost every member, including women and older children, **must work** to survive.\n2. In towns, more young people **stay in education** longer and many women from better-off homes do unpaid housework, which is **not counted** as work.',
  sol: 'One reason about rural need to work; one about urban education or uncounted work.',
  scheme: [['Rural households need every member to work', 1], ['Urban schooling or uncounted household work', 1]],
}));
Q('s_formal_informal', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do workers in the formal sector differ from those in the informal sector? Give two points of difference.',
  model: '1. **Formal** workers have **regular jobs and income**, while **informal** workers face **irregular** work and earnings.\n2. Formal workers get **social security** such as provident fund, paid leave and pensions and can form **trade unions**; informal workers usually have **no such protection**.',
  sol: 'Two clear contrasts: regularity of work and income, and protection or benefits.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s_casual_regular', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Rafiq is a casual worker at a brick kiln; his cousin Salim is a regular salaried employee of a cooperative bank. Compare their positions on two grounds.',
  model: '1. **Security:** Salim is employed **all year** with a fixed salary; Rafiq is hired **only when work is available** and may be idle for weeks.\n2. **Benefits:** Salim gets **provident fund, paid leave** and medical cover; Rafiq gets **only his daily wage**, with no social security.',
  sol: 'Compare on job security and on benefits, naming both workers.',
  scheme: [['Comparison on security of work', 1], ['Comparison on benefits', 1]],
}));
Q('s3_self_emp', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three reasons why self-employment is the largest source of work in rural India.',
  model: '1. Most rural families **own or rent small plots** and cultivate them themselves, so they count as self-employed farmers.\n2. Many run **family enterprises** such as dairies, small shops, handicrafts or repair work, because **regular jobs** in villages are **scarce**.\n3. Low levels of **education and skills** limit access to salaried jobs, so people create their **own work** with family labour and little capital.',
  sol: 'Three distinct reasons: land cultivation, family enterprises because of scarce jobs, and skills limiting salaried work.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('s3_inform_causes', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three reasons why an increasing share of workers has ended up in the informal sector in recent decades.',
  model: '1. **Formal jobs grew slowly**: many firms raised output with **machines** rather than workers, so most new workers found only informal work.\n2. Many firms prefer **contract and casual hiring**, which **cuts costs** and avoids long-term obligations.\n3. Fewer new **public-sector jobs** were created, and young people moving off farms joined **small enterprises and self-employment** in towns.',
  sol: 'Three distinct causes: slow formal job growth, contract hiring by firms, and slower public hiring with migration into small enterprises.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('s3_protect_inf', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Suggest three measures to improve the condition of workers in the informal sector, and say briefly why each would help.',
  model: '1. **Register** informal workers and extend **social security** (health insurance, accident cover, old-age pensions), so that illness or old age does not push families into poverty.\n2. Enforce **minimum wages** and safe working conditions, so that employers cannot pay far below a fair rate.\n3. Provide **cheap credit, skills and market links** to small enterprises, so that they grow, become more **productive** and pay better.',
  sol: 'Three distinct, workable measures, each with a reason.',
  scheme: [['First measure with reason', 1], ['Second measure with reason', 1], ['Third measure with reason', 1]],
}));
Q('l_status', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the three categories of workers by status of employment, and describe how their shares differ between rural and urban areas and between men and women in India.',
  model: '1. **Self-employed:** own and run an enterprise (farmers, shopkeepers, artisans); the **largest category** overall.\n2. **Regular salaried employees:** hired on a regular basis with fixed pay and often benefits.\n3. **Casual wage labourers:** hired for short periods without security.\n4. **Rural vs urban:** in villages, **self-employment and casual labour** dominate because most people farm or labour on farms; in towns, **regular salaried jobs** are far more common because offices and factories are located there.\n5. **Men vs women:** women are **more often self-employed or casual** and less often in regular jobs, which needs more education and mobility.',
  sol: 'Define the three categories, then compare rural with urban and men with women, with a reason for each pattern.',
  scheme: [['Self-employed', 1], ['Regular salaried', 1], ['Casual wage labourers', 1], ['Rural–urban difference with reason', 1], ['Gender difference with reason', 1]],
}));
Q('l_informal', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'What is meant by the informalisation of the workforce? Explain its causes and evaluate its effects on workers.',
  model: '1. **Meaning:** a rising share of workers in the **informal sector**, or on informal terms (contract, casual) even inside formal firms.\n2. **Causes:** formal jobs grew slowly as firms adopted **labour-saving technology**; firms use **contract labour** to cut costs; public-sector hiring slowed.\n3. **Effects on income:** informal workers get **irregular, often low** earnings.\n4. **Effects on security:** **no provident fund, paid leave or pension**, and little bargaining power through unions.\n5. **Evaluation:** informal work still **absorbs millions** who would otherwise have no work, and gives some flexibility; the task is to **extend protection** and skills to it, not merely to replace it.',
  sol: 'Meaning, causes, two effects and a balanced judgement.',
  scheme: [['Meaning of informalisation', 1], ['Causes', 1], ['Effect on income', 1], ['Effect on security and protection', 1], ['Balanced evaluation', 1]],
}));
Q('l_structure', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the main changes in the structure of employment in India since independence: across sectors, by status, and in relation to the growth of GDP.',
  model: '1. **Across sectors:** the share of the **primary sector** in employment has **fallen**, though it remains the largest; the **services** share has risen most, with some rise in industry.\n2. **By status:** **self-employment** remains the largest category, but over several decades the share of **casual wage labour** rose relative to regular jobs (**casualisation**).\n3. **Formal vs informal:** most new work has been **informal**, so the formal sector\'s share stays small.\n4. **Jobs and GDP:** GDP has grown **faster than employment**, a pattern called **jobless growth**.\n5. **Meaning:** output has shifted to services and industry faster than workers have, so many remain in **low-productivity** farm and informal work.',
  sol: 'Cover sector shares, status (casualisation), informal growth, jobless growth and what it means.',
  scheme: [['Sector shift', 1], ['Casualisation', 1], ['Informal growth', 1], ['Jobless growth', 1], ['Interpretation', 1]],
}));
Q('cb_sitapur', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table on the workforce of an imagined district and answer the questions that follow. *(Imagined district and figures, written by SOYL for practice.)*',
  passage: `**Population and workers in Sitapur Khurd district (imagined), thousands**\n\n| Area | Population | Workers |\n|---|---|---|\n| Rural | ${SIT.ruralPop} | ${SIT.ruralW} |\n| Urban | ${SIT.urbanPop} | ${SIT.urbanW} |\n\nA note from the district office adds that most rural workers farm their own land or work as labourers on others' farms, while most urban workers are traders, office staff and factory hands.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: SIT_RURAL, unit: '%', stem: 'Calculate the worker-population ratio of the rural area.', sol: `Step 1: Rural workers ÷ rural population × 100.\nStep 2: ${SIT.ruralW} ÷ ${SIT.ruralPop} × 100 = ${SIT_RURAL} per cent.` })),
    child('b', num({ t: 1, d: 2, c: 'application', marks: 1, value: SIT_URBAN, unit: '%', stem: 'Calculate the worker-population ratio of the urban area.', sol: `Step 1: Urban workers ÷ urban population × 100.\nStep 2: ${SIT.urbanW} ÷ ${SIT.urbanPop} × 100 = ${SIT_URBAN} per cent.` })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Give two reasons why the rural ratio is higher than the urban ratio in this district.', model: `The rural ratio (${SIT_RURAL} per cent) exceeds the urban (${SIT_URBAN} per cent) because (1) poor farm households need **every member's labour**, including women, on their own plots; (2) in towns more young people **stay in school or college** and many women's household work is **not counted**.`, sol: 'Use the computed ratios and give two reasons.', scheme: [['First reason', 1], ['Second reason', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Using the note, state which status of employment is likely to dominate in each area, with a reason.', model: 'Rural: **self-employment and casual labour**, since people farm their own land or labour on others\' farms. Urban: more **regular salaried** work, since office and factory jobs are hired on regular terms (traders are self-employed).', sol: 'Link the note to the categories of status.', scheme: [['Rural status with reason', 1], ['Urban status with reason', 1]] }),
    ]),
  ],
}));
Q('cb_garments', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the account of an imagined garment factory and answer the questions that follow. *(Imagined firm, people and figures, written by SOYL for practice.)*',
  passage: `**Ratnapur Garments (imagined): ten years of change**\n\nTen years ago the factory had ${GAR.perm0} permanent workers and ${GAR.contract0} contract workers. Today it has ${GAR.perm1} permanent workers and ${GAR.contract1} contract workers, hired through a labour contractor. Permanent workers get a monthly salary, provident fund, paid leave and medical cover. Contract workers like Pushpa are paid by the piece, can be dropped when orders fall, and get none of these benefits. The owner says contract hiring lets him survive when export orders swing from season to season.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'understanding', marks: 1, value: GAR_C0, unit: '%', stem: 'What percentage of the factory\'s workers were on contract ten years ago?', sol: `Step 1: Total = ${GAR.perm0} + ${GAR.contract0} = ${GAR.perm0 + GAR.contract0}.\nStep 2: Share = ${GAR.contract0} ÷ ${GAR.perm0 + GAR.contract0} × 100 = ${GAR_C0} per cent.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Is Pushpa a formal or an informal worker? Give one reason.', model: '**Informal**: she has **no provident fund, paid leave or job security**, even though the factory itself is a large, registered firm.', sol: 'The terms of work, not the size of the firm, decide.', scheme: [['Informal, with a reason based on her terms of work', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): The contract share is now about ${Math.round(GAR_C1)} per cent. Which trend in Indian employment does this illustrate? Explain.`, model: `It illustrates **informalisation**: the contract share rose from ${GAR_C0} per cent to about ${Math.round(GAR_C1)} per cent, so a growing part of the workforce works on **informal terms**, without security or benefits, even **inside a formal-sector firm**.`, sol: 'Name the trend and connect it to the change in shares.', scheme: [['Names informalisation', 1], ['Explains using the change in shares', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The owner says contract hiring helps him survive. Give one argument for and one against his view.', model: '**For:** flexible hiring lets the firm **cut costs when orders fall**, so it stays in business and keeps some jobs. **Against:** workers bear all the **risk**, with **no income security or benefits**, which keeps their earnings and welfare low.', sol: 'One balanced point on each side.', scheme: [['Argument for', 1], ['Argument against', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 Unemployment, problems and policies
Q('m_open_unemp', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'A trained electrician in Kanpur has been searching for work for eight months and is willing to work at the going wage, but finds none. This is an example of',
  opts: ['open unemployment', 'disguised unemployment', 'seasonal unemployment', 'voluntary idleness'],
  sol: 'He is willing and able to work at the prevailing wage and is actively looking, but has no work at all: open unemployment. Disguised unemployment hides inside a farm or family business; seasonal unemployment follows a crop calendar; he is not idle by choice.',
}));
Q('m_disguised', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Six members of a family work on their two-acre plot in an imagined Bihar village. If two of them took jobs in a nearby town, the farm\'s output would not change. The two members are',
  opts: ['disguisedly unemployed', 'openly unemployed', 'seasonally unemployed', 'regular salaried workers'],
  sol: 'They appear to be working, but their contribution to output is nil, because output would not fall without them: disguised unemployment. They are not openly jobless, their idleness is not tied to a season, and they are not salaried.',
}));
Q('m_seasonal', mcq({
  t: 2, d: 1, c: 'application',
  stem: 'Labourers in an imagined rain-fed district of Telangana find farm work during sowing and harvest but sit idle for several months in between. This is',
  opts: ['seasonal unemployment', 'disguised unemployment', 'educated unemployment', 'jobless growth'],
  sol: 'Unemployment that follows the farm calendar, with no work in certain months, is seasonal. Disguised unemployment involves surplus workers while work is going on; educated unemployment and jobless growth are different ideas.',
}));
Q('m_data_source', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of the following is a major source of data on employment and unemployment in India?',
  opts: [
    'Periodic labour force surveys conducted by the National Statistical Office',
    'Annual reports of private companies',
    'The Union Budget speech',
    'Election results',
  ],
  sol: 'Employment data come mainly from the Census of India, the labour force surveys of the National Statistical Office and the records of employment exchanges. Company reports, budget speeches and election results are not employment surveys.',
}));
Q('m_direct_job', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'When a state government recruits teachers for its schools, it creates employment',
  opts: ['directly', 'indirectly', 'only in the private sector', 'without any effect on the labour market'],
  sol: 'Hiring people into government departments and services is direct job creation by the government. Indirect creation happens when government output or spending leads other firms to hire.',
}));
Q('m_indirect_job', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A public-sector fertiliser plant in an imagined district expands output. Nearby, transporters, packaging units and repair workshops hire more workers. The jobs in these firms are an example of',
  opts: [
    'indirect job creation by the government',
    'direct job creation by the government',
    'disguised unemployment',
    'casualisation of the workforce',
  ],
  sol: 'The plant\'s own new posts are direct jobs; jobs that arise in other firms because the plant buys their goods and services are created indirectly. Neither disguised unemployment nor casualisation is described.',
}));
Q('m_wage_prog', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A government programme gives rural households paid manual work on public works such as ponds and roads. It is best described as a',
  opts: ['wage-employment programme', 'self-employment programme', 'disinvestment programme', 'programme of import substitution'],
  sol: 'Providing paid work on public works is wage employment. Self-employment programmes help people start their own enterprises with loans and training; the other two are unrelated policies.',
}));
Q('m_self_prog', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Rekha, an unemployed young woman in an imagined Assam town, gets a subsidised bank loan and training under a government scheme and opens a mobile-repair shop. The scheme is an example of',
  opts: ['a self-employment programme', 'a wage-employment programme', 'direct recruitment into government service', 'a programme for formal-sector workers'],
  sol: 'Helping a person set up her own enterprise with credit and skills is a self-employment programme. She is not hired for wages or into government service, and her small shop is in the informal sector.',
}));
Q('m_mgnrega', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Under the Mahatma Gandhi National Rural Employment Guarantee Act, 2005, the legal guarantee is for',
  opts: [
    'up to 100 days of unskilled manual wage work in a year for every rural household whose adults want it',
    'a permanent government job for one member of every family',
    '100 days of paid training for urban graduates',
    'free land for every landless labourer',
  ],
  sol: 'The Act guarantees up to 100 days of wage employment a year to each rural household whose adult members volunteer for unskilled manual work. It does not give permanent jobs, training for urban graduates or land.',
}));
Q('m_skill_mismatch', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined city has thousands of jobless graduates, while local firms say they cannot find trained welders, electricians and nurses. This mainly points to',
  opts: [
    'a mismatch between the skills people have and the skills employers need',
    'disguised unemployment in agriculture',
    'a rise in the worker-population ratio',
    'seasonal unemployment',
  ],
  sol: 'Jobs exist but go unfilled while educated people stay unemployed, so the problem is a skills mismatch, calling for vocational and technical training. The other options do not fit an urban, educated, year-round situation.',
}));
Q('ar_disguised', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Disguised unemployment is common in Indian agriculture.',
  r: 'Many families have more members working on small plots than the land actually needs, because there is little other work available.',
  sol: 'Both are true, and R explains A: with few non-farm jobs, surplus family labour stays on small plots, adding nothing to output.',
}));
Q('ar_mgnrega_urban', ar({
  t: 2, d: 2, c: 'understanding', key: 'd',
  a: 'MGNREGA 2005 guarantees employment to educated urban youth in offices.',
  r: 'MGNREGA 2005 provides unskilled manual wage work to rural households.',
  sol: 'A is false: the guarantee is for rural households doing unskilled manual work, not for office jobs in towns. R is true.',
}));
Q('ar_indirect', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Government spending on roads can create jobs in many private firms.',
  r: 'The government is a large employer in India through its departments and public enterprises.',
  sol: 'Both are true, but R speaks of direct employment by the government, while A is about indirect jobs in private firms that supply and use the roads. R does not explain A.',
}));
Q('tf_seasonal', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: 'True or false? A tea-garden worker in Assam who is idle in the winter months, when picking stops, suffers from disguised unemployment.',
  sol: 'Idleness linked to the crop calendar (no plucking in winter) is seasonal unemployment, not disguised unemployment, which is about surplus workers while work continues.',
}));
Q('fb_disguised', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'When more people are engaged in a job than are actually needed, so that removing some would not reduce output, the situation is called ___ unemployment.',
  acc: [['disguised', 'hidden']],
  sol: 'This is disguised (hidden) unemployment.',
}));
Q('ord_indirect', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps by which a new public-sector steel plant in an imagined district creates jobs indirectly, in the correct order.',
  items: [
    'The government invests in the new steel plant',
    'The plant starts production and buys iron ore, coal and transport services',
    'Mines, transporters and suppliers receive more orders',
    'These supplier firms hire more workers',
  ],
  sol: 'Investment comes first, then the plant\'s purchases from other firms, then more orders for those firms, and finally new hiring in them.',
}));
Q('mt_unemp_types', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each imagined situation in rural and urban India with the type of unemployment it shows.',
  pairs: [
    ['Five brothers work a one-acre plot that two could manage', 'Disguised unemployment'],
    ['Sugarcane cutters have no work after the crushing season ends', 'Seasonal unemployment'],
    ['A diploma holder in Bhopal looks for work every day but finds none', 'Open unemployment'],
  ],
  marks: 3,
  sol: 'Surplus workers on a small plot are disguisedly unemployed; idleness after a crop season is seasonal; a job seeker with no work at all is openly unemployed.',
}));
Q('n_unemployed', num({
  t: 2, d: 2, c: 'application', marks: 2, value: CITY_UNEMP, unit: 'persons',
  stem: `An imagined town has a labour force of ${inr(CITY.lf)} and a workforce of ${inr(CITY.wf)}. How many people are unemployed? (Also note what share of the labour force they form.)`,
  sol: `Step 1: Unemployed = labour force − workforce = ${inr(CITY.lf)} − ${inr(CITY.wf)} = ${CITY_UNEMP}.\nStep 2: Share = ${CITY_UNEMP} ÷ ${inr(CITY.lf)} × 100 = ${CITY_RATE} per cent of the labour force.`,
  scheme: [['Unemployed = labour force − workforce', 1], [`Answer ${CITY_UNEMP}`, 1]],
}));
Q('n_disguised', num({
  t: 2, d: 1, c: 'understanding', marks: 1, value: FARM_DISGUISED, unit: 'persons',
  stem: `${FARM.working} members of an imagined family work on their farm. The same output could be produced by ${FARM.needed} of them. How many members are disguisedly unemployed?`,
  sol: `Step 1: Disguised unemployment = workers engaged − workers needed.\nStep 2: ${FARM.working} − ${FARM.needed} = ${FARM_DISGUISED} persons.`,
}));
Q('n_days_left', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: JOB_LEFT, unit: 'days',
  stem: `By December, an imagined household in Chhattisgarh has received ${JOB.got} days of work under the rural employment guarantee in the current year. Up to how many more days of work can it still demand this year under the 100-day guarantee?`,
  sol: `Step 1: Guarantee = ${JOB.guarantee} days a year per household.\nStep 2: Days left = ${JOB.guarantee} − ${JOB.got} = ${JOB_LEFT} days.`,
}));
Q('n_jobless', num({
  t: 2, d: 3, c: 'application', marks: 2, value: OUT_GROWTH - EMP_GROWTH, unit: 'percentage points',
  stem: `In an imagined state, an index of output rose from ${IDX.out0} to ${IDX.out1} over ten years, while an index of employment rose from ${IDX.emp0} to ${IDX.emp1}. By how many percentage points did output growth exceed employment growth?`,
  sol: `Step 1: Output growth = (${IDX.out1} − ${IDX.out0}) ÷ ${IDX.out0} × 100 = ${OUT_GROWTH} per cent; employment growth = (${IDX.emp1} − ${IDX.emp0}) ÷ ${IDX.emp0} × 100 = ${EMP_GROWTH} per cent.\nStep 2: Gap = ${OUT_GROWTH} − ${EMP_GROWTH} = ${OUT_GROWTH - EMP_GROWTH} percentage points, a sign of jobless growth.`,
  scheme: [['Both growth rates', 1], [`Gap ${OUT_GROWTH - EMP_GROWTH} percentage points`, 1]],
}));
Q('s_dis_seasonal', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between disguised unemployment and seasonal unemployment, with an example of each from rural India.',
  model: '1. **Disguised:** more people work on a task than needed, so removing some would **not reduce output**, e.g. six family members on a plot that **three could manage**.\n2. **Seasonal:** people have work only in **certain months**, e.g. farm labourers idle between **harvest and the next sowing**.',
  sol: 'One definition and example for each type.',
  scheme: [['Disguised unemployment with example', 1], ['Seasonal unemployment with example', 1]],
}));
Q('s_direct_indirect', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'With one example each, explain how the government creates employment directly and indirectly.',
  model: '1. **Directly:** by hiring people in its own departments and enterprises, e.g. recruiting **nurses for government hospitals**.\n2. **Indirectly:** its output or spending leads **other firms to hire**, e.g. a public **power plant** that buys coal and transport, so mines and truck operators take on more workers.',
  sol: 'One direct and one indirect route, each with a clear example.',
  scheme: [['Direct creation with example', 1], ['Indirect creation with example', 1]],
}));
Q('s_data_sources', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the main sources of data on employment in India and state one use of such data.',
  model: '1. **Sources:** the **Census of India**, the **labour force surveys of the National Statistical Office**, and the records of **employment exchanges**.\n2. **Use:** they show the size and **pattern of the workforce** and unemployment, which helps the government **design and target** employment policies.',
  sol: 'Name the sources; give one purpose.',
  scheme: [['Sources named', 1], ['One use of the data', 1]],
}));
Q('s_mgnrega_feat', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain two features of the rural employment guarantee under MGNREGA 2005 that make it different from an ordinary government scheme.',
  model: '1. Work is a **legal guarantee**: a rural household can **demand** up to **100 days** of unskilled manual work a year.\n2. If work is not provided within the time fixed, the household is entitled to an **unemployment allowance**, so the state is **accountable** for delivering it.',
  sol: 'Two features that turn work into a legal entitlement.',
  scheme: [['Legal guarantee of up to 100 days on demand', 1], ['Unemployment allowance and accountability', 1]],
}));
Q('s3_jobless_fix', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Suggest three ways in which India could make its economic growth create more jobs.',
  model: '1. Promote **labour-intensive industries** such as textiles, food processing, leather and tourism, which employ many people per unit of output.\n2. Support **small and micro enterprises** with credit, simpler rules and market access, since they employ most non-farm workers.\n3. Invest in **skills and vocational training**, so that workers can fill the jobs that growing firms create.',
  sol: 'Three distinct, workable measures linked to more jobs per unit of growth.',
  scheme: [['First measure', 1], ['Second measure', 1], ['Third measure', 1]],
}));
Q('s3_policies', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three kinds of programmes through which the government has tried to generate employment in India.',
  model: '1. **Direct employment** in government departments and **public enterprises**.\n2. **Wage-employment programmes** that offer paid work on **public works**, such as the rural employment guarantee under **MGNREGA 2005**.\n3. **Self-employment programmes** that give **loans, subsidies and training** to help people start small enterprises; skill-training schemes support both.',
  sol: 'Three kinds of programme, each described.',
  scheme: [['Direct employment', 1], ['Wage-employment programmes', 1], ['Self-employment programmes', 1]],
}));
Q('s3_mgnrega_eval', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Evaluate the rural employment guarantee as a policy: give two benefits and one limitation.',
  model: '1. **Benefit:** it gives rural households **income in the lean season**, which reduces hunger and **distress migration**.\n2. **Benefit:** works such as **ponds, check dams and rural roads** build assets that can raise farm output.\n3. **Limitation:** **delayed wage payments** and fewer days than demanded in some areas reduce its usefulness, so better **implementation** is needed.',
  sol: 'Two benefits and one limitation, each explained.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Limitation', 1]],
}));
Q('l_unemp_types', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the main types of unemployment found in India. Why are some of them hard to measure?',
  model: '1. **Open unemployment:** people willing and able to work at the going wage find **no work at all**; common among educated youth in towns.\n2. **Disguised unemployment:** more workers than needed on **family farms** or businesses; output would not fall if some left.\n3. **Seasonal unemployment:** farm workers have work only in **sowing and harvest** months.\n4. **Hard to measure:** the disguised and seasonally unemployed **appear to be working** for much of the year, so surveys count them as workers.\n5. Also, much rural work is **unpaid family work**, so the line between working and idle is blurred.',
  sol: 'Three types with Indian contexts, then two reasons why measurement is difficult.',
  scheme: [['Open unemployment', 1], ['Disguised unemployment', 1], ['Seasonal unemployment', 1], ['Why disguised and seasonal are hidden', 1], ['Second measurement problem', 1]],
}));
Q('l_policies', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Critically examine the role of the government in generating employment in India.',
  model: '1. **Direct jobs:** the government hires in its departments, schools, hospitals and **public enterprises**.\n2. **Indirect jobs:** public investment in **power, roads and industry** raises output and hiring in private firms.\n3. **Wage employment:** schemes such as **MGNREGA 2005** give rural households paid work on public works in the lean season.\n4. **Self-employment and skills:** subsidised **loans and training** help people start enterprises.\n5. **Assessment:** these schemes have given **income and some security** to millions, but problems of **implementation**, slow growth of formal jobs and skill gaps limit their reach; better targeting and **skills** remain the key.',
  sol: 'Four channels, then a balanced judgement.',
  scheme: [['Direct jobs', 1], ['Indirect jobs', 1], ['Wage-employment schemes', 1], ['Self-employment and skills', 1], ['Balanced assessment', 1]],
}));
Q('l_rural_jobs', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Agriculture still employs the largest share of India\'s workers, yet much of this work is underemployment. Suggest and explain five measures to create productive jobs for rural workers.',
  model: '1. **Irrigation and water works** (check dams, canals) allow a **second crop**, giving work for more months of the year.\n2. **Rural roads, storage and markets** create jobs in **transport, trade and warehousing**.\n3. **Agro-processing units** (dairy, rice mills, fruit products) near villages add value and hire local workers.\n4. **Cheap credit and SHGs** help households start **non-farm enterprises** such as poultry, tailoring and repair work.\n5. **Skill training** prepares rural youth for jobs in construction, services and manufacturing in nearby towns.',
  sol: 'Five distinct measures, each tied to how it creates productive work.',
  scheme: [['First measure', 1], ['Second measure', 1], ['Third measure', 1], ['Fourth measure', 1], ['Fifth measure', 1]],
}));
Q('cb_panchayat', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the report from an imagined gram panchayat on wage-employment works and answer the questions that follow. *(Imagined panchayat, people and an imagined wage of ₹250 a day, written by SOYL for practice.)*',
  passage: `**Report of Devgarh gram panchayat (imagined), last financial year**\n\nUnder the rural employment guarantee, ${PAN.households} households worked a total of ${inr(PAN.days)} person-days on desilting the village tank and building a gravel road to the weekly market. At the notified wage of ₹${PAN.wage} a day, wages were paid into workers' bank accounts, though some payments were delayed by six weeks. The sarpanch noted that fewer young men left for brick kilns in the summer, and that the deeper tank now holds water until March.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: PAN_WAGES, unit: '₹', stem: 'What was the total wage bill of these works (in ₹)?', sol: `Step 1: Wage bill = person-days × daily wage.\nStep 2: ${inr(PAN.days)} × ${PAN.wage} = ₹${inr(PAN_WAGES)}.` })),
    child('b', num({ t: 2, d: 2, c: 'understanding', marks: 1, value: PAN_AVG, unit: 'days', stem: 'On average, how many days of work did each participating household get?', sol: `Step 1: Average = person-days ÷ households.\nStep 2: ${inr(PAN.days)} ÷ ${PAN.households} = ${PAN_AVG} days.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Give two pieces of evidence from the report that the works helped the village beyond paying wages.', model: '(1) **Fewer young men migrated** to brick kilns in summer, so families stayed together with local income. (2) The **deeper tank holds water until March**, which can support a **second crop** and more farm work.', sol: 'Two effects beyond wages, both from the report.', scheme: [['First piece of evidence', 1], ['Second piece of evidence', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Households got about ${PAN_AVG} days on average against a guarantee of 100. Suggest two reasons for the gap or two ways to improve delivery.`, model: '(1) Households may not know their **right to demand** work, or works are not opened in time; **awareness camps** and a shelf of ready projects would help. (2) **Late wages** discourage people from asking for work; **timely payment** with compensation for delays would raise take-up.', sol: 'Two reasons or remedies linked to the report.', scheme: [['First reason or remedy', 1], ['Second reason or remedy', 1]] }),
    ]),
  ],
}));
Q('cb_seasons', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the account of an imagined farming family and answer the questions that follow. *(Imagined family and village, written by SOYL for practice.)*',
  passage: '**The Kisku family of Bhurkunda (imagined), Jharkhand**\n\nThe Kiskus own one and a half acres of rain-fed land. From July to October all five adults — Somra, his wife, his two sons and his daughter-in-law — work on the paddy crop, though Somra admits that three of them could manage it. After the harvest there is no farm work until the next monsoon. The elder son, Birsa, a Class 12 pass, has applied for jobs in Ranchi for a year without success; the younger son goes to Punjab each winter to work on farms. The daughter-in-law has joined a self-help group that is planning a small poultry unit.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'How many members of the family are disguisedly unemployed during the paddy season?', model: '**Two** (five adults work where three could manage).', sol: 'Five engaged − three needed = two.', scheme: [['Two members', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which type of unemployment does Birsa face?', model: '**Open unemployment** (educated unemployment): he seeks work but finds none.', sol: 'He is actively seeking work and has none at all.', scheme: [['Open (educated) unemployment', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the seasonal problem the family faces and explain how the younger son and the daughter-in-law are responding to it.', model: 'After the harvest there is **no farm work until the monsoon** (seasonal unemployment). The younger son **migrates** to Punjab for winter farm work, and the daughter-in-law is building a **non-farm income** through an SHG poultry unit.', sol: 'Name the seasonal problem; link each response to it.', scheme: [['Seasonal unemployment identified', 1], ['Both responses explained', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two measures that would provide this family with productive work in its own area through the year.', model: '(1) **Irrigation** such as a check dam or tube-well so that a **winter crop** can be grown. (2) **Credit and training** for non-farm work, such as the poultry unit or skill courses that help Birsa find **local jobs**.', sol: 'Two measures tied to the family\'s situation.', scheme: [['First measure', 1], ['Second measure', 1]] }),
    ]),
  ],
}));
