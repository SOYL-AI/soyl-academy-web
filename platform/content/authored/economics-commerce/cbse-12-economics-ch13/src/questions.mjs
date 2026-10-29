// CBSE 12 Economics, ch13 Comparative Development Experiences of India and its Neighbours — question
// bank. Every scenario, table and passage is written by SOYL (imagined countries, villages and figures,
// labelled as such); no NCERT exercise or board/sample-paper item is reused. Real-world facts are
// limited to stable, commonly taught ones (independence 1947, People's Republic of China 1949, first
// plans 1951/1953/1956, Great Leap Forward 1958, Cultural Revolution 1966-76, reforms from 1978,
// one-child policy from about 1979, Pakistan's nationalisation in the 1970s and reforms from 1988).
// No current statistics of India, China or Pakistan are stated: comparisons are qualitative only.
// Every computed figure is derived here, never typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures (imagined data)
// Growth of an imagined country's real GDP (₹ thousand crore).
export const GR = { y0: 1250, y1: 1325 };
export const GR_RATE = pct(GR.y1 - GR.y0, GR.y0); // 6
// Per capita income of an imagined country.
export const PCI = { gdp: 9600, pop: 3.2 }; // ₹ crore, crore people
export const PCI_VAL = Math.round(PCI.gdp / PCI.pop); // 3,000
// Sex ratio (females per 1,000 males).
export const SR = { f: 465000, m: 500000 };
export const SR_VAL = Math.round((SR.f / SR.m) * 1000); // 930
// Density of population.
export const DEN = { pop: 180000000, area: 600000 };
export const DEN_VAL = DEN.pop / DEN.area; // 300
// Share of services in GDP.
export const SH = { services: 540, gdp: 1200 };
export const SH_VAL = pct(SH.services, SH.gdp); // 45
// Approximate per capita income growth.
export const PCG = { gdpG: 7, popG: 2 };
export const PCG_VAL = PCG.gdpG - PCG.popG; // 5
// Case table of three imagined countries.
export const ABC = {
  A: { gdpG: 8, popG: 0.5, agriWork: 25, indGdp: 40, servGdp: 50, life: 77 },
  B: { gdpG: 6.5, popG: 1, agriWork: 44, indGdp: 25, servGdp: 57, life: 70 },
  C: { gdpG: 4, popG: 2, agriWork: 37, indGdp: 20, servGdp: 56, life: 66 },
};
export const ABC_PCG_B = ABC.B.gdpG - ABC.B.popG; // 5.5
export const ABC_PCG_C = ABC.C.gdpG - ABC.C.popG; // 2
export const ABC_AGRI_GDP_A = 100 - ABC.A.indGdp - ABC.A.servGdp; // 10
// Ageing case: share of people aged 60+ in an imagined country.
export const AGE = { old: 33, total: 150 }; // crore
export const AGE_VAL = pct(AGE.old, AGE.total); // 22
// Remittance case (imagined country Meghdesh, ₹ thousand crore).
export const REM = { remit: 72, exports: 240 };
export const REM_VAL = pct(REM.remit, REM.exports); // 30
// Doubling: a population growing at 2 per cent a year doubles in about 70 ÷ 2 years.
export const DBL = { g: 2 };
export const DBL_VAL = 70 / DBL.g; // 35

if (GR_RATE !== 6 || PCI_VAL !== 3000 || SR_VAL !== 930 || DEN_VAL !== 300 || SH_VAL !== 45 || PCG_VAL !== 5 || ABC_PCG_B !== 5.5 || ABC_PCG_C !== 2 || ABC_AGRI_GDP_A !== 10 || AGE_VAL !== 22 || REM_VAL !== 30 || DBL_VAL !== 35)
  throw new Error('ch13 question figure check failed');
for (const k of ['A', 'B', 'C']) if (ABC[k].indGdp + ABC[k].servGdp >= 100) throw new Error('ABC shares');

// ================================================================ starting points and India–Pakistan (t01)
Q('m_similar_start', mcq({
  t: [1, 2], d: 1, c: 'recall',
  stem: 'India and Pakistan became independent nations in 1947. In which year was the People\'s Republic of China established?',
  opts: ['1949', '1947', '1951', '1978'],
  sol: 'The People\'s Republic of China was established in 1949, two years after India and Pakistan gained independence; 1951 is the start of India\'s First Five Year Plan and 1978 the start of China\'s reforms.',
}));
Q('m_plans_order', mcq({
  t: [1, 2], d: 2, c: 'understanding',
  stem: 'All three neighbours began planned development within a few years of each other. Which order of the announcement of their first five-year plans is correct?',
  opts: ['India (1951), China (1953), Pakistan (1956)', 'China (1951), India (1953), Pakistan (1956)', 'Pakistan (1951), India (1953), China (1956)', 'India (1951), Pakistan (1953), China (1956)'],
  sol: 'India announced its first plan in 1951, China in 1953 and Pakistan in 1956 (Pakistan\'s first plan is often called the Medium Term Development Plan).',
}));
Q('m_common_feature', mcq({
  t: [1, 2], d: 2, c: 'understanding',
  stem: 'Around 1950, which feature was shared by the economies of India, Pakistan and China?',
  opts: [
    'A large share of the workforce depended on agriculture and incomes were low',
    'Services produced most of national output',
    'Most people lived in large cities',
    'All three had already completed land reforms and industrialisation',
  ],
  sol: 'All three began as poor, mainly agricultural economies with low incomes. A services-led output, urban majorities and completed industrialisation came much later, if at all.',
}));
Q('m_pak_mixed', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Like India, Pakistan chose a **mixed economy** after independence. What does this mean for the way its economy was organised?',
  opts: [
    'Both the public sector and the private sector had a role in production',
    'The state owned every farm and factory',
    'The government played no part in economic decisions',
    'Foreign companies ran all major industries',
  ],
  sol: 'In a mixed economy the public and private sectors co-exist. Full state ownership describes a command economy, and no role for the state describes a free-market economy.',
}));
Q('m_pak_1970s', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which policy change marked Pakistan\'s economy in the 1970s?',
  opts: [
    'Nationalisation of capital goods industries',
    'The Great Leap Forward',
    'Creation of people\'s communes',
    'Withdrawal of high-value notes as legal tender',
  ],
  sol: 'In the 1970s Pakistan nationalised capital goods industries. The Great Leap Forward and communes belong to China\'s history, and note withdrawal is unrelated.',
}));
Q('m_pak_reform', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Pakistan, facing a financial crisis, began economic reforms in which year?',
  opts: ['1988', '1978', '1991', '1965'],
  sol: 'Pakistan initiated reforms in 1988. China began in 1978 and India in 1991.',
}));
Q('m_pak_forex', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An economist studying Pakistan\'s growth notes that, in many years, foreign exchange came largely from abroad rather than from a steady rise in exports of manufactured goods. Which two sources is she most likely to point to?',
  opts: [
    'Remittances from Pakistani workers abroad (notably in West Asia) and loans and grants from other countries',
    'Profits of state-run communes and township enterprises',
    'Earnings from special economic zones set up in 1978',
    'Tourist spending and sales of IT services to the USA',
  ],
  sol: 'Pakistan relied heavily on remittances from emigrants (many in West Asia) and on foreign loans and aid. Communes, township enterprises and 1978 SEZs describe China.',
}));
Q('m_pak_greenrev', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In both India and Pakistan, the Green Revolution of the 1960s raised the output of food grains. Which further change did it bring in Pakistan, according to the usual account?',
  opts: [
    'Mechanisation of farming and more public investment in infrastructure in some areas',
    'An end to the use of chemical fertilisers',
    'Collective farming in communes',
    'A ban on private trade in grain',
  ],
  sol: 'The Green Revolution led to mechanisation and greater public investment in infrastructure in selected areas. It increased (not ended) fertiliser use, and communes belong to China.',
}));
Q('m_pak_instability', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which explanation is commonly given for why Pakistan\'s growth rate slowed and was hard to sustain from the late 1980s?',
  opts: [
    'Dependence on agriculture affected by weather, on remittances and on foreign aid, together with political instability',
    'Too rapid a rise in manufactured exports',
    'A one-child policy that shrank its workforce',
    'A complete shift of workers from agriculture to services',
  ],
  sol: 'Growth depended on good harvests, remittances and foreign assistance, all uncertain, and on stable policy, which was often lacking. A one-child policy was China\'s, and Pakistan\'s export base remained narrow.',
}));
Q('m_ind_pak_services', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Compare how the structure of output changed in India and in Pakistan. Which sector became the largest contributor to GDP in both countries?',
  opts: ['The tertiary (service) sector', 'The primary sector', 'The secondary sector', 'The household sector'],
  sol: 'In both India and Pakistan the service sector became the largest contributor to GDP, even though agriculture still employs a large share of workers.',
}));
Q('ar_pak_remit', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'A fall in the number of workers going abroad can hurt Pakistan\'s balance of payments.',
  r: 'Remittances sent home by emigrant workers have been an important source of foreign exchange for Pakistan.',
  sol: 'Both are true, and R explains A: fewer emigrants means fewer remittances, so less foreign exchange comes in.',
}));
Q('ar_mixed_both', ar({
  t: 1, d: 2, c: 'analysis', key: 'b',
  a: 'India and Pakistan both followed a mixed economy with a public sector in the early decades.',
  r: 'Pakistan began economic reforms in 1988, a few years before India.',
  sol: 'Both statements are true, but R (the date of Pakistan\'s reforms) does not explain why both countries chose a mixed economy in the early decades.',
}));
Q('tf_pak_nationalise', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In the 1970s Pakistan moved away from the public sector and privatised all its capital goods industries.',
  sol: 'In the 1970s Pakistan did the opposite: it nationalised capital goods industries. The shift towards denationalisation and the private sector came later, from the late 1970s and 1980s.',
}));
Q('num_growth', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: GR_RATE, unit: '%',
  stem: `The real GDP of an imagined country rose from ₹${inr(GR.y0)} thousand crore to ₹${inr(GR.y1)} thousand crore in one year. What was its growth rate (in per cent)?`,
  sol: `Step 1: Increase = ${inr(GR.y1)} − ${inr(GR.y0)} = ${GR.y1 - GR.y0}.\nStep 2: Growth rate = ${GR.y1 - GR.y0} ÷ ${inr(GR.y0)} × 100 = ${GR_RATE} per cent.`,
}));
Q('num_services', num({
  t: 1, d: 2, c: 'application', marks: 1, value: SH_VAL, unit: '%',
  stem: `In an imagined South Asian economy, GDP is ₹${inr(SH.gdp)} thousand crore, of which services produce ₹${SH.services} thousand crore. What share of GDP (in per cent) comes from services?`,
  sol: `Step 1: Share = services ÷ GDP × 100.\nStep 2: ${SH.services} ÷ ${inr(SH.gdp)} × 100 = ${SH_VAL} per cent.`,
}));
Q('num_pcg', num({
  t: 1, d: 3, c: 'application', marks: 1, value: PCG_VAL, unit: '%',
  stem: `An imagined country's GDP grows at ${PCG.gdpG} per cent a year while its population grows at ${PCG.popG} per cent a year. Approximately how fast (in per cent a year) does its per capita income grow?`,
  sol: `Step 1: Per capita income growth ≈ GDP growth − population growth.\nStep 2: ${PCG.gdpG} − ${PCG.popG} = ${PCG_VAL} per cent a year (approximately).`,
}));
Q('s_pak_phases', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Outline two phases in Pakistan\'s industrial policy between the 1950s and the 1980s.',
  model: '1. **Late 1950s–1960s:** a mixed economy with **import substitution**, building consumer-goods industries behind **tariff protection**.\n2. **1970s:** **nationalisation of capital goods industries**; from the late 1970s and 1980s, a shift towards **denationalisation** and encouragement of the **private sector**.',
  sol: 'Name each phase with its period and its main policy.',
  scheme: [['Import-substitution phase', 1], ['Nationalisation and the later shift to the private sector', 1]],
}));
Q('s_pak_greenrev', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two effects of the Green Revolution on Pakistan\'s agriculture.',
  model: '1. It raised the **output of food grains**, especially wheat, through high-yielding seeds, fertilisers and irrigation.\n2. It brought **mechanisation** of farming and greater **public investment in infrastructure** such as canals and roads in some regions.',
  sol: 'One effect on output, one on methods or investment.',
  scheme: [['Higher food-grain output', 1], ['Mechanisation or public investment in infrastructure', 1]],
}));
Q('s_pak_growth_slow', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why is growth that depends on remittances and foreign aid considered less secure than growth based on rising exports of manufactured goods? Give two reasons.',
  model: '1. Remittances and aid depend on **conditions abroad** (jobs in other countries, donors\' decisions), which the home country cannot control.\n2. They do not build the country\'s own **productive capacity**; exports of manufactures come from **domestic factories, skills and technology** that keep growing.',
  sol: 'One point on uncertainty of the source, one on productive capacity.',
  scheme: [['Dependence on outside conditions', 1], ['Does not build domestic productive capacity', 1]],
}));
Q('s3_ind_pak_compare', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the development paths of India and Pakistan on any three points.',
  model: '1. **Strategy:** both chose a **mixed economy** with five-year plans and import substitution in the early decades.\n2. **Reforms:** Pakistan began reforms in **1988**, India in **1991**, both after financial stress.\n3. **Sources of growth:** in both, **services** became the largest sector of output; Pakistan has depended more on **remittances and foreign aid**, and its growth has been more uneven, partly because of **political instability**.',
  sol: 'Three points, each saying how the two countries are alike or different.',
  scheme: [['First comparison', 1], ['Second comparison', 1], ['Third comparison', 1]],
}));
Q('s3_pak_reasons', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three reasons commonly offered for the slowdown of Pakistan\'s economy after the late 1980s.',
  model: '1. **Agriculture**, still a large source of income, depended on **weather and good harvests**, so output swung from year to year.\n2. Foreign exchange came largely from **remittances and foreign aid** rather than from growing **manufactured exports**.\n3. **Political instability** and frequent changes in policy discouraged long-term investment.',
  sol: 'Three distinct reasons: farm dependence, external sources of funds, instability.',
  scheme: [['Dependence on agriculture and weather', 1], ['Remittances and aid, weak exports', 1], ['Political instability', 1]],
}));
Q('l_pak_path', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the main stages of Pakistan\'s development strategy from independence to the reforms of 1988, and explain one strength and one weakness of the path it followed.',
  model: '1. **Mixed economy:** after 1947 Pakistan gave roles to both the **public and private sectors**, with five-year plans from **1956**.\n2. **Import substitution (late 1950s–1960s):** consumer-goods industries grew behind **tariff protection**; the **Green Revolution** raised grain output and brought mechanisation.\n3. **1970s:** **capital goods industries were nationalised**.\n4. **Late 1970s–1980s:** a turn to **denationalisation** and the private sector, supported by Western aid and **remittances** from workers in West Asia; **reforms began in 1988**.\n5. **Appraisal:** a **strength** was higher food output and a growing service sector; a **weakness** was reliance on **remittances, aid and farm output**, with **political instability** making growth uneven.',
  sol: 'Four stages in order, then a strength and a weakness.',
  scheme: [['Mixed economy and planning', 1], ['Import substitution and Green Revolution', 1], ['Nationalisation in the 1970s', 1], ['Shift to the private sector and 1988 reforms', 1], ['One strength and one weakness', 1]],
}));

// ================================================================ China's strategy and reforms (t02)
Q('m_glf', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Great Leap Forward campaign, launched in China in 1958, aimed mainly at',
  opts: ['industrialising the country on a massive scale', 'opening the country to foreign investment', 'reducing the role of the state in farming', 'limiting each family to one child'],
  sol: 'The Great Leap Forward (1958) aimed at rapid, large-scale industrialisation, including small industries set up in villages. Foreign investment came with the 1978 reforms, and the one-child policy from about 1979.',
}));
Q('m_backyard', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'During the Great Leap Forward, people were encouraged to set up industries in their backyards. What was the intention?',
  opts: [
    'To spread industrial production, such as making steel, to villages across the country',
    'To export toys and electronics to Europe',
    'To replace farming completely with services',
    'To reduce the number of people employed',
  ],
  sol: 'Backyard furnaces were meant to spread industry, especially steel-making, into rural areas and speed up industrialisation.',
}));
Q('m_commune', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Under China\'s commune system in rural areas, how was land farmed?',
  opts: ['People cultivated land collectively', 'Each family owned and farmed its own plot for profit', 'Foreign companies leased the land', 'Land was left fallow to restore fertility'],
  sol: 'In the communes, people cultivated land collectively. Household plots for each family came with the reforms after 1978.',
}));
Q('m_gpcr', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Great Proletarian Cultural Revolution in China took place during',
  opts: ['1966–76', '1949–58', '1978–88', '1958–62'],
  sol: 'The Cultural Revolution ran from 1966 to 1976; during it, students and professionals were sent to work and learn in the countryside. Reforms began in 1978.',
}));
Q('m_reform_start', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'When China began its reforms in 1978, in which areas were they introduced first?',
  opts: [
    'Agriculture, foreign trade and investment',
    'Defence and space research',
    'Banking only',
    'Population control only',
  ],
  sol: 'The reforms were introduced in phases: the first phase covered agriculture, foreign trade and investment; reforms in industry and other areas followed.',
}));
Q('m_household_resp', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'After 1978 a farming family in rural China was allotted a plot of commune land. After paying the taxes fixed by the government, it could keep its income. Which reform does this describe?',
  opts: [
    'The division of commune land into plots for individual households (the household responsibility idea)',
    'The Great Leap Forward',
    'The creation of special economic zones',
    'The Cultural Revolution',
  ],
  sol: 'Dividing commune land into household plots, with families keeping income after paying fixed taxes, is the household responsibility approach of the 1978 reforms. SEZs were coastal zones for foreign investors.',
}));
Q('m_dual_price', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In a reform-era Chinese factory, the first 1,000 tonnes of output had to be sold to the state at fixed prices, while anything produced above that could be sold at market prices. This arrangement is called',
  opts: ['dual pricing', 'price ceiling', 'minimum support price', 'dumping'],
  sol: 'Dual pricing fixed prices for a quota sold to the state and allowed market prices for the rest, encouraging firms to produce more. A price ceiling is a single maximum price; MSP is India\'s farm-price policy.',
}));
Q('m_sez', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why did China set up special economic zones (SEZs) as part of its reforms?',
  opts: [
    'To attract foreign investors with better facilities and freer rules',
    'To shift factories away from the coast to the interior',
    'To collectivise farming',
    'To stop all imports',
  ],
  sol: 'SEZs offered infrastructure and more liberal rules to attract foreign direct investment and promote exports.',
}));
Q('m_tve', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In the reform period, township and village enterprises in China were',
  opts: [
    'enterprises owned and operated by local collectives that competed with state-owned enterprises',
    'large factories owned by foreign companies in SEZs',
    'communes that farmed land collectively',
    'state banks lending only to farmers',
  ],
  sol: 'Township and village enterprises were locally owned collective enterprises; their growth added competition for state-owned enterprises.',
}));
Q('m_soe_compete', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why would allowing private firms and township enterprises to compete with state-owned enterprises raise efficiency in China?',
  opts: [
    'State firms facing rivals had to cut costs and improve quality or lose buyers',
    'Competition guaranteed state firms a fixed market',
    'Private firms were not allowed to make profits',
    'It reduced the total number of goods produced',
  ],
  sol: 'Competition removes a protected market: firms that waste resources lose customers, so all firms are pushed to be efficient.',
}));
Q('m_china_industry', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Comparing the composition of output, which statement about China and India is generally accepted?',
  opts: [
    'China\'s growth has been led mainly by manufacturing (industry), while India\'s has been led more by services',
    'Both countries produce most of their output in agriculture',
    'India\'s growth has been led by manufacturing and China\'s by services',
    'Neither has seen any fall in the share of agriculture',
  ],
  sol: 'China moved a large share of workers into manufacturing, which became the driver of its growth; in India the service sector has led output growth. In both, agriculture\'s share of output has fallen.',
}));
Q('m_one_child', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'China introduced the one-child policy in the late 1970s. Which outcome is commonly linked to it?',
  opts: [
    'A slower growth of population, and later a rising proportion of elderly people',
    'A sharp rise in the birth rate',
    'An increase in the number of women relative to men',
    'An immediate rise in the share of young people',
  ],
  sol: 'The policy slowed population growth; after a few decades it meant fewer young people and a rising share of the elderly. It is also linked to a decline in the sex ratio, not a rise.',
}));
Q('m_ageing_problem', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An economy where the share of elderly people rises fast while the share of working-age people falls is most likely to face which problem?',
  opts: [
    'Fewer workers supporting a growing number of dependants, raising the cost of pensions and care',
    'Too many young people looking for school seats',
    'A rising birth rate',
    'An automatic fall in the sex ratio',
  ],
  sol: 'Ageing raises the burden on working people: fewer earners must support more elderly dependants through pensions, health care and family support.',
}));
Q('m_hdi_order', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'On most human development indicators (such as life expectancy, literacy and income per head), how do the three neighbours broadly compare?',
  opts: [
    'China is ahead of both India and Pakistan',
    'Pakistan is ahead of both China and India',
    'India is ahead of both China and Pakistan on every indicator',
    'All three have identical values',
  ],
  sol: 'On most human development indicators China is ahead of India and Pakistan; India and Pakistan are closer to each other, each doing better on some indicators.',
}));
Q('m_liberty', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Some economists argue that human development indices are incomplete because they leave out',
  opts: [
    'measures of political and civil freedoms, such as protection of constitutional rights',
    'life expectancy at birth',
    'adult literacy',
    'income per head',
  ],
  sol: 'Life expectancy, literacy and income are already part of human development measures. What they do not capture is liberty, such as democratic participation and the protection of rights, so some suggest adding liberty indicators.',
}));
Q('ar_glf', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'The Great Leap Forward did not achieve its goals in many sectors.',
  r: 'It faced serious problems, including a severe famine in which a very large number of people died, and the withdrawal of Soviet experts after a conflict between the two countries.',
  sol: 'Both are true and R explains A: a famine, linked to drought and to the campaign\'s own policies, and the loss of Soviet experts seriously damaged the campaign.',
}));
Q('ar_reform_growth', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Agricultural output in China rose after commune land was divided into household plots.',
  r: 'Families could keep the income left after paying fixed taxes, which gave them a reason to work harder and invest in their land.',
  sol: 'Both are true and R explains A: household plots linked effort to reward, which raised output.',
}));
Q('ar_sex_ratio', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'All three neighbours have a sex ratio that is low and biased against females.',
  r: 'A low sex ratio means there are more females than males in the population.',
  sol: 'A is true: India, Pakistan and China all have fewer females than males per thousand. R is false: a low sex ratio (females per 1,000 males below 1,000) means fewer females than males.',
}));
Q('ar_china_fdi', ar({
  t: 2, d: 2, c: 'analysis', key: 'd',
  a: 'China kept its economy closed to foreign direct investment after 1978.',
  r: 'China set up special economic zones to attract foreign investors.',
  sol: 'A is false: from 1978 China opened up to foreign direct investment. R is true: SEZs were created for exactly this purpose.',
}));
Q('tf_reform_phase', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? China\'s reforms after 1978 were introduced in phases, starting with agriculture, foreign trade and investment.',
  sol: 'The first phase covered agriculture, foreign trade and investment; industrial reforms and others followed in a later phase.',
}));
Q('tf_cr_students', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'True or false? During the Cultural Revolution in China, students and professionals were sent to work and learn in the countryside.',
  sol: 'This was a well-known feature of the Cultural Revolution (1966–76).',
}));
Q('fb_glf_year', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'China launched the Great Leap Forward campaign in the year ___, aiming at rapid industrialisation.',
  acc: [['1958']],
  sol: 'The Great Leap Forward began in 1958.',
}));
Q('fb_dual', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Fixing prices for a quota of output sold to the state, while letting the rest be sold at market prices, was called ___ pricing in reform-era China.',
  acc: [['dual']],
  sol: 'This was dual pricing: fixed prices for the state quota, market prices for the extra output.',
}));
Q('mt_events', match({
  t: [1, 2], d: 2, c: 'recall',
  stem: 'Match each event in the development of the three neighbours with its year.',
  pairs: [
    ['Great Leap Forward launched in China', '1958'],
    ['Economic reforms begin in China', '1978'],
    ['Pakistan begins economic reforms', '1988'],
    ['India launches its new economic policy', '1991'],
  ],
  sol: 'GLF 1958; China\'s reforms 1978; Pakistan\'s reforms 1988; India\'s new economic policy 1991.',
}));
Q('mt_terms', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each feature of China\'s development path with what it involved.',
  pairs: [
    ['Commune system', 'Collective cultivation of land'],
    ['Cultural Revolution', 'Students and professionals sent to work in rural areas'],
    ['Special economic zones', 'Areas offering facilities to attract foreign investors'],
    ['Dual pricing', 'Fixed price for a quota, market price for extra output'],
  ],
  sol: 'Communes meant collective farming; the Cultural Revolution sent students and professionals to the countryside; SEZs attracted foreign investment; dual pricing combined a state quota with market sales.',
}));
Q('ord_china', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these stages of China\'s development path in the order in which they happened.',
  items: [
    'People\'s Republic of China established',
    'First five-year plan begins',
    'Great Leap Forward launched',
    'Cultural Revolution',
    'Reforms begin with agriculture, trade and investment',
  ],
  sol: '1949 founding; 1953 first plan; 1958 Great Leap Forward; 1966–76 Cultural Revolution; 1978 reforms.',
}));
Q('num_sex_ratio', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: SR_VAL, unit: 'females per 1,000 males',
  stem: `An imagined district has ${inr(SR.f)} females and ${inr(SR.m)} males. What is its sex ratio (females per 1,000 males)?`,
  sol: `Step 1: Sex ratio = females ÷ males × 1,000.\nStep 2: ${inr(SR.f)} ÷ ${inr(SR.m)} × 1,000 = ${SR_VAL}.`,
}));
Q('num_density', num({
  t: [1, 2], d: 2, c: 'application', marks: 1, value: DEN_VAL, unit: 'persons per sq km',
  stem: `An imagined country has a population of ${inr(DEN.pop)} and an area of ${inr(DEN.area)} square kilometres. What is its density of population (persons per square kilometre)?`,
  sol: `Step 1: Density = population ÷ area.\nStep 2: ${inr(DEN.pop)} ÷ ${inr(DEN.area)} = ${DEN_VAL} persons per square kilometre.`,
}));
Q('num_ageing', num({
  t: 2, d: 3, c: 'application', marks: 1, value: AGE_VAL, unit: '%',
  stem: `In an imagined country of ${AGE.total} crore people, ${AGE.old} crore are aged 60 or above. What percentage of the population is elderly?`,
  sol: `Step 1: Share = elderly ÷ total × 100.\nStep 2: ${AGE.old} ÷ ${AGE.total} × 100 = ${AGE_VAL} per cent.`,
}));
Q('num_pci', num({
  t: [1, 2], d: 2, c: 'application', marks: 1, value: PCI_VAL, unit: '₹',
  stem: `An imagined country's national income is ₹${inr(PCI.gdp)} crore and its population is ${PCI.pop} crore. What is its per capita income (in ₹)?`,
  sol: `Step 1: Per capita income = national income ÷ population.\nStep 2: ${inr(PCI.gdp)} ÷ ${PCI.pop} = ₹${inr(PCI_VAL)}.`,
}));
Q('s_glf_fail', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why the Great Leap Forward campaign in China ran into serious difficulty.',
  model: '1. Farm output collapsed in a **severe famine**, linked to drought and to the campaign\'s own policies, and a very large number of people died.\n2. A **conflict with the Soviet Union** led to the withdrawal of Soviet experts who had been helping with industrial projects.',
  sol: 'Two separate reasons: the famine and the withdrawal of Soviet experts.',
  scheme: [['Famine and its effects', 1], ['Withdrawal of Soviet experts', 1]],
}));
Q('s_commune_vs_plot', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'How did the incentive to work on a Chinese farm change when collective commune land was divided into household plots after 1978?',
  model: 'In the **commune**, output was shared, so extra effort by one family brought it **little extra reward**. With a **household plot**, the family kept the **income left after paying fixed taxes**, so harder work and better care of the land raised its **own income**.',
  sol: 'Contrast how reward was linked to effort in the two systems.',
  scheme: [['Commune: reward weakly linked to effort', 1], ['Household plot: family keeps income after taxes', 1]],
}));
Q('s_sez_role', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two ways in which China\'s special economic zones helped its growth after 1978.',
  model: '1. They **attracted foreign direct investment** with better infrastructure and freer rules, bringing capital and technology.\n2. Firms in the zones **produced for export**, which earned foreign exchange and created jobs in manufacturing.',
  sol: 'One point on investment and technology, one on exports and jobs.',
  scheme: [['Attracted FDI, capital and technology', 1], ['Exports and manufacturing jobs', 1]],
}));
Q('s_one_child_effects', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain two long-term effects of China\'s one-child policy on its population.',
  model: '1. **Ageing:** after a few decades the share of **elderly people rose** and the share of young workers fell, so fewer earners support more dependants.\n2. **Sex ratio:** it is linked to a **decline in the sex ratio** (fewer females per 1,000 males), because of a preference for sons.',
  sol: 'One effect on age structure, one on the sex ratio.',
  scheme: [['Ageing of the population', 1], ['Decline in the sex ratio', 1]],
}));
Q('s_hdi_meaning', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why do economists compare countries on human development indicators and not only on GDP growth?',
  model: 'GDP growth shows how fast **output** rises, but not whether people are **healthy, educated and able to live longer**. Indicators such as **life expectancy, literacy and income per head** show how growth has improved **people\'s lives**.',
  sol: 'Contrast what GDP measures with what human development indicators add.',
  scheme: [['Limitation of GDP growth alone', 1], ['What human development indicators show', 1]],
}));
Q('s3_china_reforms', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe any three reforms introduced in China from 1978.',
  model: '1. **Agriculture:** commune land was divided into **plots for households**, which kept the income left after paying fixed taxes.\n2. **Industry:** private firms and **township and village enterprises** were allowed to compete with **state-owned enterprises**; **dual pricing** let firms sell output above a quota at market prices.\n3. **Opening up:** **special economic zones** were created to attract **foreign direct investment** and promote exports.',
  sol: 'Three reforms from different areas: agriculture, industry and pricing, foreign investment.',
  scheme: [['Household plots in agriculture', 1], ['Competition and dual pricing in industry', 1], ['SEZs and FDI', 1]],
}));
Q('s3_china_why_faster', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Many economists argue that China\'s reforms after 1978 succeeded partly because of what it had built earlier. Explain this argument with three points.',
  model: '1. Before 1978 China had expanded **basic education and health care**, so it had a **healthier, more literate workforce** ready for factory work.\n2. **Land reforms and communes** had built rural **infrastructure** such as irrigation and roads, which supported higher farm output once incentives improved.\n3. Earlier efforts gave it an **industrial base**; reforms then added **incentives, competition and foreign investment** to use these foundations more efficiently.',
  sol: 'Three foundations from the pre-reform period and how reforms built on them.',
  scheme: [['Health and education base', 1], ['Rural infrastructure from earlier reforms', 1], ['Industrial base plus new incentives', 1]],
}));
Q('s3_china_india_sector', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the change in the sectoral structure of output and employment in China and India since the reforms.',
  model: '1. In **China**, **manufacturing (industry)** became the main driver of growth, and a large share of workers **moved out of agriculture** into factories.\n2. In **India**, the **service sector** has led the growth of output, while industry\'s share grew more slowly.\n3. In India **agriculture still employs a large share of workers** although its share of output is small, so many workers remain in low-productivity farming.',
  sol: 'One point on China, one on India, one comparing employment.',
  scheme: [['China: industry-led, workers left agriculture', 1], ['India: services-led output', 1], ['India: agriculture still a large employer', 1]],
}));
Q('s3_glf_vs_reforms', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Compare the approach of the Great Leap Forward with the approach of China\'s reforms after 1978. Which do you consider more effective, and why?',
  model: '1. The **Great Leap Forward** relied on **mass campaigns and collective production** (communes, backyard industries) directed by the state.\n2. The **reforms** relied on **incentives and markets**: household plots, dual pricing, competition and foreign investment.\n3. The **reforms were more effective**, because they linked **reward to effort** and brought capital and technology, producing sustained growth, while the earlier campaign suffered sharp setbacks.',
  sol: 'Describe both approaches and give a reasoned judgement.',
  scheme: [['Approach of the GLF', 1], ['Approach of the reforms', 1], ['Reasoned judgement', 1]],
}));
Q('l_china_path', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Trace China\'s development path from 1949 to the reforms of 1978 and after, explaining how its strategy changed.',
  model: '1. **1949–53:** the People\'s Republic was set up in **1949**; the economy was state-directed, and the **first five-year plan began in 1953**.\n2. **Great Leap Forward (1958):** a campaign of mass **industrialisation**, with backyard industries and **communes** for collective farming; a severe famine and the withdrawal of Soviet experts caused serious setbacks.\n3. **Cultural Revolution (1966–76):** students and professionals were sent to work in the **countryside**.\n4. **Reforms from 1978:** in phases — **household plots** in agriculture, then industry; **township and village enterprises** and private firms competed with state enterprises; **dual pricing**.\n5. **Opening up:** **special economic zones** attracted **FDI**, and manufacturing exports drove rapid growth.',
  sol: 'Five stages in order, showing the shift from campaigns and collectives to incentives and markets.',
  scheme: [['Founding and first plan', 1], ['Great Leap Forward and communes', 1], ['Cultural Revolution', 1], ['1978 reforms in phases', 1], ['SEZs and FDI', 1]],
}));
Q('l_three_compare', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'India, Pakistan and China started their journeys at about the same time with similar problems. Compare their development experience on growth, population and human development, and draw a balanced conclusion.',
  model: '1. **Starting point:** all three were **poor, mainly agricultural** economies around **1947–49**, and began five-year plans in the 1950s.\n2. **Growth:** **China** grew fastest after **1978**, led by **manufacturing** and exports; **India** grew steadily, led more by **services**; **Pakistan**\'s growth was more **uneven**, relying on remittances and aid.\n3. **Population:** China\'s **one-child policy** slowed population growth, but brought **ageing** and a lower sex ratio; India and Pakistan still have younger, faster-growing populations.\n4. **Human development:** China is **ahead on most indicators**; India and Pakistan are closer to each other.\n5. **Conclusion:** each path had costs and gains; human development measures leave out **liberty**, so growth figures alone do not settle which path is best.',
  sol: 'Compare on each dimension, then give a balanced conclusion that notes the limits of the comparison.',
  scheme: [['Common starting point', 1], ['Growth compared', 1], ['Population compared', 1], ['Human development compared', 1], ['Balanced conclusion', 1]],
}));
Q('l_hdi_compare', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain why China has done better than India and Pakistan on most human development indicators, and why such indicators do not tell the whole story.',
  model: '1. **Early social investment:** even before 1978, China spread **basic health care** and **primary education** widely, including in rural areas.\n2. **Effects:** this raised **life expectancy** and **literacy**, and lowered infant deaths.\n3. **Growth:** rapid growth after 1978 raised **income per head**, which also counts in human development measures.\n4. **India and Pakistan** spread education and health more slowly, so they lag on several indicators, though each does better on some.\n5. **Limits:** these indicators leave out **liberty** — political and civil freedoms and protection of rights — and say little about how fairly gains are shared, so they give only part of the picture.',
  sol: 'Reasons for China\'s lead, the position of the other two, then the limits of the measures.',
  scheme: [['Early health and education investment', 1], ['Effect on life expectancy and literacy', 1], ['Income growth after 1978', 1], ['Position of India and Pakistan', 1], ['Limits: liberty and distribution', 1]],
}));
Q('l_lessons', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'What lessons can a developing country draw from the experiences of India, Pakistan and China? Give five points.',
  model: '1. **Invest in people early:** China\'s spread of **health and education** prepared a workforce for later growth.\n2. **Incentives matter:** output rose when farmers and firms could **keep the rewards** of extra effort, as with household plots.\n3. **Build a broad export base:** growth that relies on **remittances and aid**, as Pakistan\'s often did, is less secure than growth from **manufactured exports**.\n4. **Stability and continuity** of policy encourage long-term investment.\n5. **Balance growth with other goals:** population policies affect **ageing and the sex ratio**, and growth figures do not measure **freedoms**, so a country should weigh these too.',
  sol: 'Five lessons, each tied to the experience of at least one of the three countries.',
  scheme: [['Human capital', 1], ['Incentives', 1], ['Export base vs external dependence', 1], ['Policy stability', 1], ['Wider goals beyond growth', 1]],
}));

// ================================================================ case-based
Q('cb_three', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table comparing three imagined Asian economies and answer the questions that follow. *(Imagined countries and figures, written by SOYL for practice; not real data for any country.)*',
  passage: `**Selected indicators of three imagined economies, average of recent years**\n\n| Indicator | Country A | Country B | Country C |\n|---|---|---|---|\n| Growth of GDP (per cent a year) | ${ABC.A.gdpG} | ${ABC.B.gdpG} | ${ABC.C.gdpG} |\n| Growth of population (per cent a year) | ${ABC.A.popG} | ${ABC.B.popG} | ${ABC.C.popG} |\n| Workers in agriculture (per cent) | ${ABC.A.agriWork} | ${ABC.B.agriWork} | ${ABC.C.agriWork} |\n| Industry's share of GDP (per cent) | ${ABC.A.indGdp} | ${ABC.B.indGdp} | ${ABC.C.indGdp} |\n| Services' share of GDP (per cent) | ${ABC.A.servGdp} | ${ABC.B.servGdp} | ${ABC.C.servGdp} |\n| Life expectancy (years) | ${ABC.A.life} | ${ABC.B.life} | ${ABC.C.life} |`,
  parts: [
    child('a', num({ t: [1, 2], d: 2, c: 'application', marks: 1, value: ABC_PCG_C, unit: '%', stem: 'Approximately how fast (in per cent a year) is per capita income growing in Country C?', sol: `Step 1: Per capita growth ≈ GDP growth − population growth.\nStep 2: ${ABC.C.gdpG} − ${ABC.C.popG} = ${ABC_PCG_C} per cent a year.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which country has the largest industry share of GDP and the smallest share of workers in agriculture?', model: `**Country A** (industry ${ABC.A.indGdp} per cent of GDP; ${ABC.A.agriWork} per cent of workers in agriculture).`, sol: 'Compare the industry row and the agriculture-workers row.', scheme: [['Country A with the figures', 1]] })),
    child('c', short({ t: [1, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Country B has a large services share of GDP but 44 per cent of its workers are still in agriculture. What problem does this suggest, and what could reduce it?', model: `Output has moved to **services**, but **jobs have not**: many workers remain in **low-productivity farming**. Expanding **labour-intensive manufacturing** and **skills** would move workers into better-paid jobs.`, sol: 'Identify the mismatch between output and employment, then suggest a remedy.', scheme: [['Problem: workers stuck in low-productivity agriculture', 1], ['A suitable remedy', 1]] }), [
      short({ t: [1, 2], d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Country A grows fastest and has the highest life expectancy. Can we conclude that its people are better off in every respect? Give one reason for your answer.', model: 'Not necessarily. The table shows **output and health**, but not **how fairly income is shared** or whether people enjoy **political and civil freedoms**, so it cannot show that people are better off in **every** respect.', sol: 'A reasoned "not necessarily", naming something the indicators leave out.', scheme: [['Judgement', 1], ['Reason: distribution or liberty not shown', 1]] }),
    ]),
  ],
}));
Q('cb_village', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read this imagined account of a farming family in a rural Chinese village before and after the 1978 reforms, and answer the questions that follow. *(Imagined family and village, written by SOYL for practice.)*',
  passage: '**"The year the fields were divided" — an imagined account**\n\nIn the commune years, Grandfather Li worked in a team that farmed the land together, and the team\'s grain was shared out by work points. "Whether I worked hard or not, my share hardly changed," he remembered. After 1978 the village divided the land into plots for each household. The Li family paid the taxes fixed by the government and could sell what was left. They began to use more manure, repaired the irrigation channel and even grew vegetables for the market in the nearby town. Within a few years their harvest was larger than ever before, and the younger son found work in a new factory run by the township.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Under which system was land farmed before the reform described in the account?', model: 'The **commune system** (collective cultivation).', sol: 'The team farmed together and shared grain: collective farming in communes.', scheme: [['Commune / collective farming', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the kind of enterprise where the younger son found work.', model: 'A **township and village enterprise** (owned and run by a local collective).', sol: 'The factory was run by the township.', scheme: [['Township and village enterprise', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the Li family\'s harvest rose after the reform.', model: 'Once the family **kept the income left after fixed taxes**, extra effort raised its **own earnings**. So it invested in **manure and irrigation** and grew crops for the **market**, which raised output.', sol: 'Link the new incentive to the family\'s new investments and output.', scheme: [['Incentive: income kept after taxes', 1], ['Resulting investments and higher output', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Grandfather Li says that in the commune "my share hardly changed". What weakness of collective farming does this reveal?', model: 'Collective farming **weakened the link between effort and reward**: a hard-working member got about the same as others, so people had **little incentive** to work harder or improve the land.', sol: 'Name the incentive problem and its effect.', scheme: [['Weak link between effort and reward', 1], ['Effect on effort and output', 1]] }),
    ]),
  ],
}));
Q('cb_meghdesh', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the extract from an imagined economic survey of Meghdesh, a South Asian country invented by SOYL, and answer the questions that follow. *(Imagined country and figures.)*',
  passage: `**Meghdesh Economic Survey (imagined): a note on foreign exchange**\n\nMeghdesh followed a mixed economy after independence and built textile mills behind high tariffs. Wheat output rose sharply after high-yielding seeds arrived. Today, of every ₹100 the country earns from abroad through merchandise exports, it receives another ₹${REM_VAL} as remittances from its workers in West Asian countries. Its exports are still mainly cotton yarn, rice and leather goods. Last year, a fall in oil prices cut jobs in West Asia and remittances dropped. At the same time a poor monsoon reduced the wheat crop, and growth fell to its lowest level in a decade.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: REM.remit, unit: 'thousand crore rupees', stem: `If Meghdesh's merchandise exports were ₹${REM.exports} thousand crore, how much did it receive as remittances (in ₹ thousand crore)?`, sol: `Step 1: The note gives ₹${REM_VAL} of remittances for every ₹100 of exports.\nStep 2: Remittances = ${REM.exports} × ${REM_VAL} ÷ 100 = ₹${REM.remit} thousand crore.` })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Which earlier development in Meghdesh\'s agriculture does the survey mention?', model: 'The arrival of **high-yielding seeds** (a **Green Revolution**), which raised wheat output.', sol: 'Read the second sentence of the note.', scheme: [['Green Revolution / HYV seeds', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the survey, explain why Meghdesh\'s growth is vulnerable.', model: 'Growth depends on **remittances**, which fell when **jobs in West Asia** were cut, and on **farm output**, which fell with a **poor monsoon**. Its exports are **narrow and low-value**, so they cannot make up for these shocks.', sol: 'Use two shocks from the passage and the narrow export base.', scheme: [['External dependence (remittances)', 1], ['Farm/weather dependence and narrow exports', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two policies that could make Meghdesh\'s growth more stable.', model: '(1) **Diversify exports** towards higher-value manufactures by investing in **skills and technology**. (2) Expand **irrigation** and crop insurance so that output depends less on the **monsoon**.', sol: 'Two workable policies matched to the risks in the passage.', scheme: [['First suitable policy', 1], ['Second suitable policy', 1]] }),
    ]),
  ],
}));
Q('cb_population', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined news report about the population of the Republic of Tianmar, a country invented by SOYL, and answer the questions that follow.',
  passage: `**Tianmar (imagined) faces an older future**\n\nForty years ago Tianmar limited most families to one child to slow its fast-growing population. The policy worked: population growth fell to almost zero. Today, ${AGE.old} crore of Tianmar's ${AGE.total} crore people are aged 60 or above. Factory owners complain that fewer young people are joining the workforce, and a survey finds that in several provinces there are noticeably fewer girls than boys. The government has now allowed families to have more children, but young couples say that housing and schooling are expensive.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'understanding', marks: 1, value: AGE_VAL, unit: '%', stem: 'What percentage of Tianmar\'s population is aged 60 or above?', sol: `Step 1: Share = ${AGE.old} ÷ ${AGE.total} × 100.\nStep 2: = ${AGE_VAL} per cent.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which real country\'s population policy does Tianmar\'s policy most resemble?', model: '**China\'s one-child policy**, introduced in the late 1970s.', sol: 'A one-child limit to slow population growth was China\'s policy.', scheme: [['China\'s one-child policy', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain two economic problems that Tianmar\'s population changes can create.', model: '(1) **Ageing:** fewer young workers must support more **elderly dependants**, raising the cost of pensions and health care. (2) **Labour shortage:** fewer new workers can slow the **growth of output** in factories.', sol: 'Two problems that follow from the report.', scheme: [['Burden of an ageing population', 1], ['Shrinking workforce and slower growth', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does the survey about "fewer girls than boys" tell us about Tianmar\'s sex ratio, and why might a strict limit on children make this worse?', model: 'The **sex ratio is low** (fewer females per 1,000 males). When families can have **only one child**, a **preference for sons** can lead to fewer girls being born or surviving.', sol: 'Name the low sex ratio and link it to son preference under a strict limit.', scheme: [['Low sex ratio', 1], ['Link with son preference under a one-child limit', 1]] }),
    ]),
  ],
}));

// ================================================================ extra objective items (deck checks)
Q('m_check_density', mcq({
  t: [1, 2], d: 2, c: 'application',
  stem: 'Two imagined countries have the same area. Country P has twice the population of Country Q. How do their densities of population compare?',
  opts: ['P\'s density is twice Q\'s', 'Q\'s density is twice P\'s', 'Both have the same density', 'P\'s density is four times Q\'s'],
  sol: 'Density = population ÷ area. With equal areas, twice the population means twice the density.',
}));
Q('m_check_pcg', mcq({
  t: [1, 2], d: 3, c: 'application',
  stem: 'Two imagined countries both grow at 6 per cent a year. Population grows at 1 per cent in Country X and at 3 per cent in Country Y. What follows?',
  opts: [
    'Per capita income rises faster in X (about 5 per cent) than in Y (about 3 per cent)',
    'Per capita income rises equally fast in both',
    'Per capita income rises faster in Y because it has more people',
    'Per capita income falls in Y',
  ],
  sol: 'Per capita growth ≈ GDP growth − population growth: about 5 per cent in X and 3 per cent in Y. It still rises in Y, only more slowly.',
}));
Q('m_check_doubling', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Using the rule of 70, a population growing at ${DBL.g} per cent a year will double in roughly how many years?`,
  opts: [`${DBL_VAL} years`, '20 years', '70 years', '140 years'],
  sol: `Doubling time ≈ 70 ÷ growth rate = 70 ÷ ${DBL.g} = ${DBL_VAL} years.`,
}));
Q('tf_check_hdi', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Human development indicators such as life expectancy and literacy also measure how much political freedom people enjoy.',
  sol: 'They do not. Life expectancy, literacy and income say nothing directly about political and civil freedoms, which is why some economists suggest adding liberty indicators.',
}));
