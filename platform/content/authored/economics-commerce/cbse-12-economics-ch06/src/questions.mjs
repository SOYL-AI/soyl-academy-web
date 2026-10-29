// CBSE 12 Economics, ch06 Indian Economy on the Eve of Independence — question bank. Every scenario,
// table and passage is written by SOYL (imagined districts, letters and figures, labelled as such);
// no NCERT exercise or board/sample-paper item is reused. Real-world facts are limited to stable,
// commonly taught ones, stated as approximate (shares of the workforce, literacy, life expectancy).
// Every computed figure is derived here, never typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const T = 1;

// ---------------------------------------------------------------- computed figures
// Imagined province: workforce by occupation (rounded to the pattern of the time).
export const PROV = { total: 250000, agri: 180000, mfg: 25000, serv: 45000 };
if (PROV.agri + PROV.mfg + PROV.serv !== PROV.total) throw new Error('province shares');
export const PROV_AGRI = pct(PROV.agri, PROV.total); // 72
export const PROV_SERV = pct(PROV.serv, PROV.total); // 18
// Imagined trade account (₹ crore).
export const TRADE = { x: 380, m: 290 };
export const SURPLUS = TRADE.x - TRADE.m; // 90
// Imagined district literacy.
export const LIT = { lit: 2400, pop: 15000 };
export const LIT_PCT = pct(LIT.lit, LIT.pop); // 16
// Infant mortality applied to an imagined birth cohort.
export const IMR = { rate: 218, births: 5000 };
export const IMR_DEATHS = (IMR.rate * IMR.births) / 1000; // 1,090
// Imagined weaver's income before and after mill cloth arrived.
export const WEAVE = { before: 240, after: 150 };
export const WEAVE_FALL = pct(WEAVE.before - WEAVE.after, WEAVE.before); // 37.5
if (PROV_AGRI !== 72 || PROV_SERV !== 18 || SURPLUS !== 90 || LIT_PCT !== 16 || IMR_DEATHS !== 1090 || WEAVE_FALL !== 37.5) throw new Error('figure check failed');

// ================================================================ colonial aims, national income
Q('m_aim', mcq({
  t: T, d: 1, c: 'understanding',
  stem: 'The main economic aim of British colonial policy in India was to',
  opts: [
    'turn India into a supplier of raw materials and a market for British manufactured goods',
    'build a strong capital goods industry in India',
    'make India self-reliant in food and machinery',
    'raise the living standards of Indian farmers through land reform',
  ],
  sol: 'Colonial policy served the interests of the ruling country: raw materials flowed to British factories and their finished goods were sold back in India. Building Indian heavy industry, self-reliance and land reform were never its goals.',
}));
Q('m_vkrv', mcq({
  t: T, d: 2, c: 'recall',
  stem: 'Whose estimates of India\'s national and per capita income during the colonial period are generally regarded as the most significant?',
  opts: ['V. K. R. V. Rao', 'Adam Smith', 'J. M. Keynes', 'Alfred Marshall'],
  sol: 'Several Indian and British scholars estimated India\'s income in colonial times; the estimates of V. K. R. V. Rao are usually treated as the most important. The other three are economists who did not estimate Indian national income.',
}));
Q('m_growth', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'Which statement best describes the growth of India\'s economy in the first half of the twentieth century?',
  opts: [
    'Aggregate real output grew by less than 2 per cent a year and per capita output by about half a per cent',
    'Output grew by about 8 per cent a year, mainly because of railways',
    'Output fell every year from 1900 to 1947',
    'Per capita output grew faster than in Britain',
  ],
  sol: 'Estimates for that period show very slow growth: under 2 per cent a year for total output and only about half a per cent per head, since population also grew. There was neither a boom nor a continuous fall.',
}));
Q('ar_estimates', ar({
  t: T, d: 3, c: 'analysis', key: 'b',
  a: 'The colonial government made no serious effort to measure India\'s national and per capita income.',
  r: 'Individual scholars such as Dadabhai Naoroji and William Digby made estimates of India\'s income during the colonial period.',
  sol: 'A is true: the government did not measure national income seriously, and private estimates differ in method and results. R is also true, but it does not explain A; it only says who filled the gap.',
}));

// ================================================================ agriculture
Q('m_agri_share', mcq({
  t: T, d: 1, c: 'recall',
  stem: 'On the eve of independence, roughly what share of India\'s population depended on agriculture, directly or indirectly, for a living?',
  opts: ['About 85 per cent', 'About 25 per cent', 'About 50 per cent', 'About 10 per cent'],
  sol: 'Most Indians lived in villages and depended on farming: the usual estimate is about 85 per cent of the population. The other figures are far too low for an agrarian colonial economy.',
}));
Q('m_zamindari', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'Under the zamindari system in parts of colonial India, the zamindars',
  opts: [
    'collected rent from cultivators but rarely invested in improving the land',
    'were small farmers who owned and tilled their own land',
    'were government officers paid a fixed salary to build irrigation',
    'bought crops from farmers at a guaranteed support price',
  ],
  sol: 'The land revenue arrangement placed zamindars between the state and the tiller. Their interest lay in collecting as much rent as possible, so little was spent on improving land. They were not tillers, salaried officers or crop buyers.',
}));
Q('m_commercial', mcq({
  t: T, d: 2, c: 'understanding',
  stem: '**Commercialisation of agriculture** in colonial India refers to',
  opts: [
    'a shift by some farmers from food crops to cash crops such as indigo, cotton and jute',
    'the use of tractors and combine harvesters on most farms',
    'the government buying all food grains at fixed prices',
    'the replacement of farming by factory work in villages',
  ],
  sol: 'Some areas moved from food grains to crops sold for cash, largely to supply British industry. This did not bring mechanisation or prosperity to most farmers, and farming remained the main occupation.',
}));
Q('m_stagnation_cause', mcq({
  t: T, d: 3, c: 'analysis',
  stem: 'Which one of the following was **NOT** a cause of the stagnation of agriculture under colonial rule?',
  opts: [
    'A widespread use of chemical fertilisers and high-yielding seeds',
    'Lack of investment in irrigation and flood control',
    'The burden of rent and revenue on cultivators',
    'Low levels of technology on most farms',
  ],
  sol: 'Fertilisers and high-yielding seeds spread only after independence (the Green Revolution of the 1960s). Poor irrigation, heavy rent and revenue demands and backward technology were real causes of colonial stagnation.',
}));
Q('m_revenue_terms', mcq({
  t: T, d: 3, c: 'application',
  stem: 'An imagined zamindar must deposit a fixed sum of revenue by a set date each year or lose his rights. A drought ruins the crop. What is he most likely to do?',
  opts: [
    'Press the cultivators hard for rent anyway, worsening their distress',
    'Cancel the rent for the year and invest in a canal',
    'Ask the government for a subsidy on fertilisers',
    'Switch the village to factory production',
  ],
  sol: 'Fixed revenue deadlines left no room for bad years, so rent was extracted even when harvests failed, adding to tenants\' misery. Waiving rent and building canals was rare, fertiliser subsidies did not exist, and a village cannot simply turn industrial.',
}));
Q('ar_commercial', ar({
  t: T, d: 3, c: 'analysis', key: 'c',
  a: 'In some regions, colonial agriculture showed higher yields of cash crops in particular years.',
  r: 'Commercialisation of agriculture made most Indian farmers prosperous.',
  sol: 'A is true: there were pockets of higher cash-crop output. R is false: the gains went largely to traders, moneylenders and British industry, while most cultivators stayed poor and indebted.',
}));
Q('tf_irrigation', tf({
  t: T, d: 1, c: 'recall', ans: false,
  stem: 'True or false? By 1947 most of India\'s farmland was irrigated by canals built under colonial rule.',
  sol: 'Most farmland still depended on rainfall; investment in irrigation and flood control was very limited, which kept yields low.',
}));
Q('fb_zamindar', fb({
  t: T, d: 1, c: 'recall',
  stem: 'Under the permanent settlement in Bengal, the profits from agriculture went mainly to the ___ rather than to the cultivators.',
  acc: [['zamindars', 'zamindar', 'landlords']],
  sol: 'The zamindars (landlords) collected the rent and kept the surplus; the cultivators were left with little.',
}));
Q('s_stagnation', short({
  t: T, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons for the low productivity of Indian agriculture under colonial rule.',
  model: '1. The **land settlement system** (zamindari) let landlords take most of the surplus as rent, so neither they nor tenants invested in the land.\n2. **Backward technology** and very little **irrigation**, fertiliser or flood control kept yields low.',
  sol: 'One institutional reason and one technical reason, each explained in a line.',
  scheme: [['Land settlement / rent burden', 1], ['Technology or irrigation', 1]],
}));
Q('s_commercial', short({
  t: T, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why did the commercialisation of agriculture not make most Indian farmers better off?',
  model: 'Farmers were pushed to grow **cash crops for British industry**, but the **prices and profits** were taken largely by **traders, moneylenders** and exporters. Growing less food also left many families **exposed to famine** and debt.',
  sol: 'Link the cash crop to who captured its value, and add one cost to farmers.',
  scheme: [['Gains captured by traders or exporters', 1], ['A cost to farmers (food, debt)', 1]],
}));
Q('s3_agri_effects', short({
  t: T, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three features of Indian agriculture on the eve of independence.',
  model: '1. **Main occupation:** most of the population lived in villages and depended on farming.\n2. **Stagnation:** output per acre stayed low because of the **zamindari** system, rent pressure and **little irrigation or technology**.\n3. **Commercialisation:** some regions grew **cash crops** (indigo, jute, cotton) for British industry, but **cultivators gained little** and food security weakened.',
  sol: 'Three distinct features: dependence, stagnation with causes, commercialisation with its effect.',
  scheme: [['Dependence on agriculture', 1], ['Stagnation with a cause', 1], ['Commercialisation and its effect', 1]],
}));
Q('l_agriculture', long({
  t: T, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: '"Indian agriculture under colonial rule was both the largest and the most stagnant sector." Explain this statement with reasons.',
  model: '1. **Largest:** about **85 per cent** of the people depended on farming, and about **seven in ten** workers were cultivators or labourers.\n2. **Land settlement:** under **zamindari**, rent went to landlords who **seldom invested**; fixed revenue deadlines squeezed tenants even in bad years.\n3. **Low technology:** wooden ploughs, **little fertiliser** and old methods kept yields low.\n4. **Poor irrigation:** most land was **rain-fed**; flood control and canals were neglected.\n5. **Commercialisation:** cash crops for British industry raised output in **some pockets**, but profits went to traders and exporters, so the sector as a whole **stagnated**.',
  sol: 'One point on size, then four causes of stagnation, each explained briefly.',
  scheme: [['Size: dependence of people and workers', 1], ['Land settlement and rent', 1], ['Technology', 1], ['Irrigation', 1], ['Commercialisation and who gained', 1]],
}));

// ================================================================ industry
Q('m_deind', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'The decline of India\'s handicraft industries under colonial rule is described as',
  opts: ['de-industrialisation', 'import substitution', 'liberalisation', 'disinvestment'],
  sol: 'The fall of traditional crafts without modern industry taking their place is called de-industrialisation. Import substitution, liberalisation and disinvestment are post-independence policy terms.',
}));
Q('m_tisco', mcq({
  t: T, d: 1, c: 'recall',
  stem: 'The Tata Iron and Steel Company (TISCO) was incorporated in the year',
  opts: ['1907', '1853', '1869', '1921'],
  sol: 'TISCO was incorporated in 1907. The year 1853 is linked with the first passenger train, 1869 with the opening of the Suez Canal, and 1921 with the demographic divide.',
}));
Q('m_jute_cotton', mcq({
  t: T, d: 2, c: 'recall',
  stem: 'Which pair correctly matches a modern industry of colonial India with the region where it was concentrated?',
  opts: ['Jute mills: Bengal', 'Cotton textile mills: Assam', 'Jute mills: Gujarat', 'Cotton textile mills: Bengal only'],
  sol: 'Jute mills came up mainly around Bengal (and were largely foreign-owned); cotton mills were concentrated in western India, in present-day Maharashtra and Gujarat, and were mainly Indian-owned.',
}));
Q('m_capital_goods', mcq({
  t: T, d: 3, c: 'analysis',
  stem: 'Why is the near-absence of a **capital goods industry** in 1947 regarded as a serious weakness?',
  opts: [
    'Without home-made machine tools and machinery, India had to import the means to build any new industry',
    'Capital goods are bought directly by households for consumption',
    'It meant India had no cotton or jute mills at all',
    'It made agricultural output rise too quickly',
  ],
  sol: 'Capital goods (machines that make other goods) are the base of industrial growth; lacking them, the country depended on imports for every new factory. Households do not buy capital goods, cotton and jute mills did exist, and agriculture was stagnant.',
}));
Q('m_handicraft_why', mcq({
  t: T, d: 3, c: 'application',
  stem: 'An imagined weaver family in a Bengal village loses its customers in the 1880s. Which colonial-era change best explains this?',
  opts: [
    'Cheap machine-made cloth from British mills flooded Indian markets',
    'The government raised the price of imported cloth with high tariffs',
    'Indian mills made only capital goods',
    'Railways were banned from carrying cloth',
  ],
  sol: 'Machine-made British cloth was cheaper and entered India duty-free or at low duty, so hand-woven cloth lost its market. India did not protect its weavers with high tariffs, its mills made consumer goods, and railways actually helped imported cloth reach villages.',
}));
Q('m_public_sector', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'On the eve of independence, the public sector in India was',
  opts: [
    'small, and limited mainly to railways, power, communication, ports and some departmental undertakings',
    'the largest employer, running most factories',
    'responsible for most steel and cement production',
    'absent altogether',
  ],
  sol: 'Government enterprise was confined to a few areas such as railways, power generation, communications and ports. It did not run most factories, steel was private (TISCO), and it was not absent.',
}));
Q('ar_deind', ar({
  t: T, d: 3, c: 'analysis', key: 'a',
  a: 'De-industrialisation added to unemployment in colonial India.',
  r: 'As handicrafts declined, few modern factories came up to absorb the artisans who lost their work.',
  sol: 'Both are true, and R explains A: artisans thrown out of work by the collapse of crafts found no new industrial jobs, so many fell back on farming or became unemployed.',
}));
Q('ar_capital', ar({
  t: T, d: 4, c: 'evaluation', key: 'd',
  a: 'By 1947 India had a well-developed machine tools and heavy engineering industry.',
  r: 'The growth of the industrial sector during colonial rule was very slow and its share in output remained small.',
  sol: 'A is false: there was hardly any capital goods base, only a few beginnings. R is true: industry grew slowly and contributed little to national output.',
}));
Q('tf_deind', tf({
  t: T, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Under colonial rule, India\'s traditional handicrafts declined without a matching rise of modern industry.',
  sol: 'This two-sided outcome is what de-industrialisation means: crafts fell, and modern industry was too small to replace them.',
}));
Q('n_weaver', num({
  t: T, d: 2, c: 'application', marks: 1, value: WEAVE_FALL, unit: '%', tol: 0.1,
  stem: `An imagined weaver earned ₹${WEAVE.before} a year before machine-made cloth reached his town and ₹${WEAVE.after} a year after. By what percentage did his income fall?`,
  sol: `Step 1: Fall = ${WEAVE.before} − ${WEAVE.after} = ${WEAVE.before - WEAVE.after}.\nStep 2: Percentage fall = ${WEAVE.before - WEAVE.after} ÷ ${WEAVE.before} × 100 = ${WEAVE_FALL} per cent.`,
}));
Q('s_deind', short({
  t: T, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by de-industrialisation? Give one reason for it in colonial India.',
  model: '**De-industrialisation** is the decline of a country\'s existing industries without new ones taking their place. In India, **cheap machine-made goods from Britain**, imported at low duties, destroyed the market for **handicrafts**.',
  sol: 'A definition plus one cause.',
  scheme: [['Meaning', 1], ['A valid reason', 1]],
}));
Q('s_twofold', short({
  t: T, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain the two-fold motive behind the colonial policy of de-industrialising India.',
  model: '1. To obtain **cheap raw materials** from India for the expanding **industries of Britain**.\n2. To use India as a large **market for British finished goods**, so that British industry could keep growing.',
  sol: 'Two motives: raw materials in, finished goods out.',
  scheme: [['Raw materials for British industry', 1], ['Market for British goods', 1]],
}));
Q('s3_industry', short({
  t: T, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three limitations of the modern industrial sector in India in 1947.',
  model: '1. **Slow growth:** a few cotton and jute mills, steel (TISCO, 1907) and later sugar, cement and paper; industry\'s **share of output stayed small**.\n2. **No capital goods base:** machines had to be **imported**, so new industry was hard to start.\n3. **Uneven and narrow:** factories were confined to a **few regions**, and the **public sector** was limited to railways, ports, power and communication.',
  sol: 'Three distinct limitations, each with a brief explanation.',
  scheme: [['Slow growth / small share', 1], ['Lack of capital goods', 1], ['Regional concentration or small public sector', 1]],
}));
Q('l_industry', long({
  t: T, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the state of Indian industry on the eve of independence.',
  model: '1. **Handicrafts declined:** cheap British machine cloth and low import duties destroyed markets of weavers and artisans (**de-industrialisation**).\n2. **Few modern industries:** cotton mills in western India (mostly Indian-owned) and jute mills in Bengal (mostly foreign-owned) from the second half of the nineteenth century; **TISCO in 1907**; sugar, cement and paper later.\n3. **No capital goods sector:** almost no machine tools, so growth depended on imports.\n4. **Small share and slow growth:** industry contributed little to national output.\n5. **Limited public sector:** confined to railways, power, communication and ports. **Judgement:** a weak, narrow base that independent India had to rebuild through planning.',
  sol: 'Four features with evidence, ending in a reasoned judgement.',
  scheme: [['Decline of handicrafts and its cause', 1], ['Modern industries named with region or ownership', 1], ['Lack of capital goods', 1], ['Small share or small public sector', 1], ['Reasoned overall judgement', 1]],
}));

// ================================================================ foreign trade
Q('m_exports', mcq({
  t: T, d: 1, c: 'understanding',
  stem: 'In colonial times India mainly **exported**',
  opts: [
    'primary products such as raw cotton, raw silk, jute, indigo and sugar',
    'machinery and machine tools',
    'finished woollen and silk garments to Britain',
    'steel and heavy chemicals',
  ],
  sol: 'India supplied raw materials and other primary products. It imported finished goods such as cloth and light machinery from British factories; it had no large steel or chemical exports.',
}));
Q('m_monopoly', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'Which statement about India\'s foreign trade under colonial rule is correct?',
  opts: [
    'Britain controlled India\'s trade, and more than half of it was with Britain',
    'Most of India\'s trade was with the United States',
    'India had a large import surplus every year',
    'India traded freely with every country on equal terms',
  ],
  sol: 'Through its control of exports and imports, Britain kept more than half of India\'s trade for itself; the rest was mainly with countries such as China, Ceylon and Persia. India usually ran an export surplus, not an import surplus.',
}));
Q('m_suez', mcq({
  t: T, d: 2, c: 'application',
  stem: 'The opening of the Suez Canal in 1869 affected India\'s trade mainly by',
  opts: [
    'cutting the cost and time of shipping between Britain and India, tightening British control of trade',
    'diverting all Indian trade to China',
    'ending India\'s exports of raw materials',
    'making Indian handicrafts competitive again',
  ],
  sol: 'The canal shortened the sea route between Britain and India, so British goods reached India faster and more cheaply and raw materials flowed out more easily. It did not divert trade to China, end raw-material exports or revive crafts.',
}));
Q('m_surplus_use', mcq({
  t: T, d: 3, c: 'analysis',
  stem: 'India\'s large export surplus under colonial rule did **not** build up its wealth because',
  opts: [
    'it was used to pay for the colonial government\'s expenses in Britain, wars and invisible imports',
    'it was spent on building heavy industries in India',
    'exports were always smaller than imports',
    'it was invested in Indian schools and hospitals',
  ],
  sol: 'The surplus went out of the country as payments for the colonial establishment in Britain, war expenses and services such as shipping: a drain of wealth. It was not used for Indian industry or welfare, and exports did exceed imports.',
}));
Q('ar_surplus', ar({
  t: T, d: 4, c: 'evaluation', key: 'a',
  a: 'Despite an export surplus, colonial India faced shortages of essential goods such as food grains, clothes and kerosene.',
  r: 'The export surplus was drained out to meet the expenses of the colonial administration and was not used to import goods India needed.',
  sol: 'Both are true, and R explains A: since the surplus left the country, it did not pay for imports of necessities or bring in gold, so shortages persisted alongside a surplus.',
}));
Q('fb_suez', fb({
  t: T, d: 1, c: 'recall',
  stem: 'The ___ Canal, opened in 1869, became a highway for trade between Britain and India.',
  acc: [['Suez']],
  sol: 'The Suez Canal shortened the route and lowered the cost of British trade with India.',
}));
Q('n_surplus', num({
  t: T, d: 2, c: 'application', marks: 1, value: SURPLUS, unit: '₹ crore',
  stem: `In an imagined year, colonial India\'s exports were worth ₹${TRADE.x} crore and its imports ₹${TRADE.m} crore. Calculate the export surplus.`,
  sol: `Step 1: Export surplus = exports − imports.\nStep 2: ${TRADE.x} − ${TRADE.m} = ${SURPLUS}. So ₹${SURPLUS} crore.`,
}));
Q('mt_dates', match({
  t: T, d: 2, c: 'recall', marks: 2,
  stem: 'Match each year with the event linked to it in the economic history of colonial India.',
  pairs: [
    ['1853', 'First passenger train in India'],
    ['1869', 'Opening of the Suez Canal'],
    ['1881', 'First census'],
    ['1907', 'Incorporation of TISCO'],
  ],
  sol: 'Railways began carrying passengers in 1853; the Suez Canal opened in 1869; the first census was taken in 1881; TISCO was incorporated in 1907.',
}));
Q('s_trade', short({
  t: T, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features of India\'s foreign trade during colonial rule.',
  model: '1. **Composition:** India **exported raw materials** (cotton, jute, silk, indigo) and **imported finished goods** (cloth, light machinery).\n2. **Direction:** Britain held a **monopoly**: more than half of the trade was with Britain.',
  sol: 'Any two of composition, direction, export surplus and its drain.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s3_drain', short({
  t: T, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'India had an export surplus throughout colonial rule. Why is it said that this surplus was a "drain" rather than a gain?',
  model: '1. The surplus was **used up abroad**: it paid for the **colonial administration in Britain**, its **wars** and services such as shipping and insurance.\n2. **No gold or silver** flowed into India in return, so the surplus did not add to national wealth.\n3. Meanwhile India faced **shortages of food grains, cloth and kerosene**, so the people gained nothing from it.',
  sol: 'Where the surplus went, what India failed to receive, and the effect on people.',
  scheme: [['Uses abroad', 1], ['No inflow of wealth', 1], ['Shortages at home', 1]],
}));
Q('l_trade', long({
  t: T, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain how colonial policy shaped the composition, direction and outcome of India\'s foreign trade.',
  model: '1. **Composition:** India became an **exporter of primary products** (raw cotton, silk, jute, indigo, sugar) and an **importer of finished consumer goods** and light machinery.\n2. **Direction:** Britain controlled trade, so **more than half** of it was with Britain; the rest went mainly to China, Ceylon and Persia.\n3. **Suez Canal (1869):** cheaper, faster shipping tightened this pattern.\n4. **Export surplus:** exports exceeded imports, but the surplus paid for the **colonial establishment, wars and invisible imports**: a **drain** of wealth.\n5. **Outcome:** shortages of grain, cloth and kerosene at home, and no foundation for Indian industry.',
  sol: 'Composition, direction, Suez, surplus and drain, and the outcome.',
  scheme: [['Composition', 1], ['Direction and monopoly', 1], ['Suez Canal effect', 1], ['Surplus used as a drain', 1], ['Outcome for India', 1]],
}));

// ================================================================ demography
Q('m_census', mcq({
  t: T, d: 1, c: 'recall',
  stem: 'The first official census of British India was taken in',
  opts: ['1881', '1921', '1853', '1907'],
  sol: 'The census series began in 1881. 1921 marks the demographic divide; 1853 and 1907 relate to railways and TISCO.',
}));
Q('m_1921', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'Why is 1921 called the year of the **great divide** in India\'s demographic history?',
  opts: [
    'After 1921 the population grew steadily, as India moved into the second stage of the demographic transition',
    'After 1921 the population began to fall every decade',
    'It was the year of India\'s first census',
    'Birth and death rates both became low in 1921',
  ],
  sol: 'Before 1921 growth was uneven and slow; after it the death rate fell while the birth rate stayed high, so population grew steadily (the second stage). The first census was in 1881, and low birth and death rates came much later.',
}));
Q('m_demo_stage', mcq({
  t: T, d: 3, c: 'application',
  stem: 'An imagined region has a birth rate of 46 and a death rate of 44 per thousand people per year. Its population',
  opts: [
    'grows very slowly, as in the first stage of the demographic transition',
    'grows very fast, as in the second stage',
    'falls quickly every year',
    'is in the final stage of low birth and death rates',
  ],
  sol: 'With both rates high and close together, natural growth is only about 2 per thousand a year: slow growth, typical of the first stage (India before 1921). Fast growth needs a falling death rate with a high birth rate.',
}));
Q('m_lit_women', mcq({
  t: T, d: 2, c: 'recall',
  stem: 'On the eve of independence, the overall literacy rate in India was roughly',
  opts: ['less than 16 per cent', 'about 50 per cent', 'about 75 per cent', 'about 90 per cent'],
  sol: 'Fewer than one in six people could read and write; female literacy was far lower, at about 7 per cent. The higher figures belong to much later decades.',
}));
Q('ar_mortality', ar({
  t: T, d: 3, c: 'analysis', key: 'a',
  a: 'Life expectancy in colonial India was very low, at about 32 years.',
  r: 'Public health facilities were scarce, and water-borne and air-borne diseases spread widely.',
  sol: 'Both are true, and R explains A: with little public health care, diseases and famines caused high death rates, including very high infant mortality, so average life was short.',
}));
Q('tf_census', tf({
  t: T, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Before 1921, India\'s population grew rapidly because the death rate had fallen sharply.',
  sol: 'The opposite: before 1921 both birth and death rates were high, so growth was slow and uneven. Steady growth came after 1921, when the death rate began to fall.',
}));
Q('n_literacy', num({
  t: T, d: 2, c: 'application', marks: 1, value: LIT_PCT, unit: '%', tol: 0.1,
  stem: `In an imagined district of 1941, ${inr(LIT.lit)} out of ${inr(LIT.pop)} people could read and write. Calculate its literacy rate.`,
  sol: `Step 1: Literacy rate = literates ÷ population × 100.\nStep 2: ${inr(LIT.lit)} ÷ ${inr(LIT.pop)} × 100 = ${LIT_PCT} per cent, close to the all-India level of the time.`,
}));
Q('n_imr', num({
  t: T, d: 3, c: 'application', marks: 1, value: IMR_DEATHS, unit: 'infants',
  stem: `If the infant mortality rate was ${IMR.rate} per thousand live births, how many of ${inr(IMR.births)} babies born in an imagined district would be expected to die before their first birthday?`,
  sol: `Step 1: Deaths = rate ÷ 1,000 × births.\nStep 2: ${IMR.rate} ÷ 1000 × ${inr(IMR.births)} = ${inr(IMR_DEATHS)} infants.`,
}));
Q('s_demo', short({
  t: T, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe any two demographic features of India on the eve of independence.',
  model: '1. **High birth and death rates:** until 1921 population grew slowly; **infant mortality** was over 200 per thousand.\n2. **Low quality of life:** **literacy** was below 16 per cent and **life expectancy** was only about 32 years.',
  sol: 'Any two: high vital rates, high infant mortality, low literacy, low life expectancy, poverty.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s3_demo_eval', short({
  t: T, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'How did the demographic condition of colonial India reflect its economic backwardness? Give three points.',
  model: '1. **Short lives:** life expectancy of about **32 years** showed poor nutrition and **scarce public health** care.\n2. **High infant mortality** (over 200 per thousand) showed the absence of clean water and medical help in villages.\n3. **Low literacy** (under 16 per cent, about 7 per cent for women) showed **neglect of education**, which kept productivity and incomes low.',
  sol: 'Three indicators, each tied to an economic cause or effect.',
  scheme: [['Life expectancy linked to health care', 1], ['Infant mortality linked to living conditions', 1], ['Literacy linked to productivity', 1]],
}));

// ================================================================ occupational structure
Q('m_occ', mcq({
  t: T, d: 1, c: 'recall',
  stem: 'On the eve of independence, about what share of India\'s workforce was engaged in agriculture?',
  opts: ['70 to 75 per cent', '30 to 35 per cent', '10 to 15 per cent', '90 to 95 per cent'],
  sol: 'Agriculture employed roughly 70–75 per cent of workers, with manufacturing about 10 per cent and services about 15–20 per cent.',
}));
Q('m_regional', mcq({
  t: T, d: 3, c: 'analysis',
  stem: 'What does it show that in some regions (parts of the Madras, Bombay and Bengal presidencies) the share of agriculture in the workforce fell slightly, while in others (such as Orissa, Rajasthan and Punjab) it rose?',
  opts: [
    'Growing regional variation in occupational structure',
    'A rapid all-India shift of workers into factories',
    'That agriculture had become highly productive everywhere',
    'That services employed most workers in every province',
  ],
  sol: 'The changes went in opposite directions in different areas, so the main lesson is unevenness between regions. There was no rapid national shift to industry, no general rise in farm productivity, and services were a minor employer.',
}));
Q('n_province', num({
  t: T, d: 2, c: 'application', marks: 1, value: PROV_AGRI, unit: '%',
  stem: `An imagined province in 1946 had ${inr(PROV.total)} workers, of whom ${inr(PROV.agri)} worked in agriculture. What percentage of its workforce was in agriculture?`,
  sol: `Step 1: Share = agricultural workers ÷ all workers × 100.\nStep 2: ${inr(PROV.agri)} ÷ ${inr(PROV.total)} × 100 = ${PROV_AGRI} per cent.`,
}));
Q('ord_shares', ord({
  t: T, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the three sectors in **descending** order of their share in India\'s workforce on the eve of independence.',
  items: ['Agriculture (primary sector)', 'Services (tertiary sector)', 'Manufacturing (secondary sector)'],
  sol: 'Agriculture had about 70–75 per cent, services about 15–20 per cent and manufacturing about 10 per cent.',
}));
Q('s_occ', short({
  t: T, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by occupational structure? Describe India\'s occupational structure in 1947.',
  model: '**Occupational structure** is the distribution of the **workforce among sectors**. In 1947 about **70–75 per cent** worked in **agriculture**, about **10 per cent** in **manufacturing** and about **15–20 per cent** in **services**.',
  sol: 'Meaning plus the three approximate shares.',
  scheme: [['Meaning', 1], ['Approximate shares', 1]],
}));

// ================================================================ infrastructure
Q('m_rail_year', mcq({
  t: T, d: 1, c: 'recall',
  stem: 'The first passenger train in India ran in',
  opts: ['1853', '1869', '1881', '1907'],
  sol: 'Passenger rail service began in 1853. The other years mark the Suez Canal, the first census and TISCO.',
}));
Q('m_rail_effect', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'Which was a **positive** effect of the railways in colonial India?',
  opts: [
    'They enabled long-distance travel and helped break geographical and cultural barriers',
    'They raised the incomes of most cultivators',
    'They protected Indian handicrafts from foreign competition',
    'They ended famines in India',
  ],
  sol: 'Railways let people travel far and mix across regions. They did not raise most farmers\' incomes, they actually carried cheap British goods into the interior (hurting crafts), and famines still occurred.',
}));
Q('m_infra_purpose', mcq({
  t: T, d: 3, c: 'analysis',
  stem: 'Roads, railways, ports and the telegraph were developed under colonial rule mainly to',
  opts: [
    'move troops and administer the colony, and carry raw materials to ports and British goods inland',
    'connect every village to markets for the benefit of farmers',
    'build a national industrial base for Indian entrepreneurs',
    'promote tourism within India',
  ],
  sol: 'The network served colonial purposes: administration, defence and an export-oriented trade. Most villages stayed unconnected, it was not meant to help Indian industry, and tourism was not the aim.',
}));
Q('m_telegraph', mcq({
  t: T, d: 3, c: 'application',
  stem: 'A colonial official in Lahore (imagined scene) sends an urgent message to Calcutta about unrest. Which colonial-era infrastructure best served this purpose?',
  opts: ['The electric telegraph', 'Inland waterways', 'Public schools', 'Village wells'],
  sol: 'The electric telegraph was expanded largely to keep law and order and speed up administrative messages. Waterways carry goods slowly, and schools and wells do not carry messages.',
}));
Q('ar_rail', ar({
  t: T, d: 3, c: 'analysis', key: 'b',
  a: 'Railways helped the commercialisation of Indian agriculture.',
  r: 'Railways allowed people to travel long distances and broke down cultural barriers.',
  sol: 'A is true: railways carried cash crops to ports and widened markets. R is also true, but it describes a social effect; it does not explain the spread of cash crops.',
}));
Q('tf_waterways', tf({
  t: T, d: 3, c: 'application', ans: true,
  stem: 'True or false? Some inland waterways developed in colonial times, such as a coastal canal in Orissa, proved uneconomical and could not compete with the railways.',
  sol: 'Waterways like the Orissa coastal canal were expensive to run and lost traffic to the railways that ran alongside them.',
}));
Q('mt_infra', match({
  t: T, d: 3, c: 'application', marks: 2,
  stem: 'Match each part of colonial infrastructure with the colonial purpose it mainly served.',
  pairs: [
    ['Railways', 'Carrying raw materials to ports and British goods inland'],
    ['Electric telegraph', 'Maintaining law and order'],
    ['Ports', 'Handling the export–import trade with Britain'],
    ['Roads to the frontier', 'Moving troops'],
  ],
  sol: 'Railways moved goods for trade; the telegraph sped up messages for law and order; ports handled overseas trade; roads served military movement.',
}));
Q('s_rail_mixed', short({
  t: T, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Give one positive and one negative effect of the railways in colonial India.',
  model: '**Positive:** long-distance travel became possible, breaking **geographical and cultural barriers** and widening markets.\n**Negative:** they carried **cheap British goods** into the interior and raw materials out, which **hurt handicrafts** and served export trade more than Indians.',
  sol: 'One benefit and one cost, each explained.',
  scheme: [['Positive effect', 1], ['Negative effect', 1]],
}));
Q('s3_infra', short({
  t: T, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why infrastructure developed under colonial rule did not serve the needs of the Indian people.',
  model: '1. **Purpose:** railways, roads and ports were built to **move troops**, run the administration and serve **export trade**, not to link villages.\n2. **Coverage:** most rural areas lacked **all-weather roads**, so farmers could not reach markets, especially in the rains.\n3. **Effects:** the network carried **British goods inland**, hurting crafts, and the costly **telegraph** served law and order more than commerce of ordinary people.',
  sol: 'Purpose, coverage and effects, each tied to people\'s needs.',
  scheme: [['Colonial purpose', 1], ['Poor rural coverage', 1], ['Harmful or limited effects', 1]],
}));
Q('l_infra', long({
  t: T, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"Colonial infrastructure was a mixed blessing for India." Evaluate this statement.',
  model: '1. **Railways (from 1853):** allowed **long-distance travel**, broke geographical and cultural barriers and widened markets.\n2. **Communications:** posts and the **electric telegraph** linked distant parts of the country.\n3. **But the purpose was colonial:** routes connected the interior to **ports**, moving raw materials out and **British goods in**, which hurt handicrafts.\n4. **Uneven coverage:** most **villages lacked all-weather roads**; some waterways, like a coastal canal in Orissa, proved uneconomical.\n5. **Judgement:** the network gave independent India a **useful base**, but it was built for **administration and trade**, not for the people\'s development, so it was indeed a mixed blessing.',
  sol: 'Two benefits, two limitations, and a reasoned judgement.',
  scheme: [['Benefit of railways', 1], ['Benefit of communications', 1], ['Colonial purpose and effect on crafts', 1], ['Uneven coverage', 1], ['Reasoned judgement', 1]],
}));

// ================================================================ overall appraisal
Q('m_poverty', mcq({
  t: T, d: 2, c: 'understanding',
  stem: 'Which combination best sums up the Indian economy in 1947?',
  opts: [
    'Stagnant agriculture, weak industry, export-oriented trade, poor health and education, limited infrastructure',
    'Modern agriculture, strong heavy industry and a large import surplus',
    'High literacy, long life expectancy and a large service sector',
    'Rapid growth in output per head and full employment',
  ],
  sol: 'At independence the economy showed all the colonial weaknesses: stagnant farms, a narrow industrial base, trade geared to Britain, low literacy and life expectancy, and infrastructure built for colonial needs.',
}));
Q('s3_challenges', short({
  t: T, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Which three challenges did the colonial legacy leave for the planners of independent India?',
  model: '1. **Agriculture:** raising **farm productivity** through land reform, irrigation and new technology.\n2. **Industry:** building a **capital goods** base and creating jobs for those displaced by de-industrialisation.\n3. **People:** tackling **poverty, illiteracy and poor health**, and extending infrastructure to **villages**.',
  sol: 'Three challenges, each linked to a colonial weakness.',
  scheme: [['Agriculture', 1], ['Industry', 1], ['Human development or infrastructure', 1]],
}));
Q('l_overall', long({
  t: T, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Critically appraise the impact of British rule on the Indian economy, giving one point each on agriculture, industry, foreign trade, demography and infrastructure.',
  model: '1. **Agriculture:** stagnant; **zamindari** rent, little irrigation or technology; commercialisation helped traders more than tillers.\n2. **Industry:** **de-industrialisation** of handicrafts; only a few cotton and jute mills, TISCO, and **no capital goods** base.\n3. **Foreign trade:** India exported **raw materials** and imported finished goods; Britain\'s **monopoly**; the export surplus was **drained** away.\n4. **Demography:** high birth and death rates, life expectancy about **32 years**, literacy under **16 per cent**.\n5. **Infrastructure:** railways, ports and the telegraph built mainly for **colonial purposes**, though they later proved a useful base. Overall, the economy was left **poor and stagnant**.',
  sol: 'One supported point per area and an overall conclusion.',
  scheme: [['Agriculture', 1], ['Industry', 1], ['Foreign trade', 1], ['Demography', 1], ['Infrastructure with conclusion', 1]],
}));

// ================================================================ case-based
Q('cb_letter', caseQ({
  t: T, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined letter written by SOYL for practice; the people and village are not real.)*',
  passage: '**Letter from Haripada, a weaver of an imagined village near Dhaka, to his brother in Calcutta, 1885**\n\nDear Dada, our looms are mostly silent now. The merchant who once bought our fine cloth says the city people want the cheap printed cloth that comes by ship from England and by train to our market town. Father has rented a small plot from the zamindar\'s agent to grow jute, which the agent says the Calcutta mills will buy. But the rent is high, the rains failed last year, and we still owe the moneylender. Cousin Nitai has gone to look for work at the jute mill near your quarters. Send news if there is any work there for me too.',
  parts: [
    child('a', short({ t: T, d: 1, c: 'recall', marks: 1, stem: 'Name the process shown by the "silent looms" of the weavers.', model: '**De-industrialisation** (decline of handicrafts).', sol: 'Handloom weaving collapsing under machine-made imports is de-industrialisation.', scheme: [['De-industrialisation', 1]] })),
    child('b', short({ t: T, d: 2, c: 'application', marks: 1, stem: 'Which feature of colonial agriculture is shown by the father growing jute for the mills?', model: '**Commercialisation of agriculture**: growing a cash crop for industry instead of food.', sol: 'A shift to a cash crop sold to mills shows commercialisation.', scheme: [['Commercialisation of agriculture', 1]] })),
    child('c', short({ t: T, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two problems in the letter that kept the family poor even after the switch to jute.', model: '(1) **High rent** to the zamindar\'s agent took most of the earnings. (2) **Dependence on rain** (no irrigation) and **debt** to the moneylender left them exposed when the crop failed.', sol: 'Pick two obstacles from the passage and link each to poverty.', scheme: [['First problem with link to poverty', 1], ['Second problem with link to poverty', 1]] }), [
      short({ t: T, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How did railways and shipping contribute to the weavers\' troubles described in the letter?', model: 'Ships brought **cheap machine-made cloth** from England, and **railways carried it inland** to the market town, so it reached rural buyers at low cost and **took away the weavers\' market**.', sol: 'Show how transport carried imported cloth into the interior.', scheme: [['Imported cloth via ships', 1], ['Railways carried it inland, displacing local cloth', 1]] }),
    ]),
  ],
}));
Q('cb_occupation', caseQ({
  t: T, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined province and rounded figures, written by SOYL for practice; the all-India column gives commonly cited approximate shares.)*',
  passage: `**Workforce by sector, imagined province of Sonagiri, 1946**\n\n| Sector | Workers in Sonagiri | All-India share (approximate) |\n|---|---|---|\n| Agriculture | ${inr(PROV.agri)} | 70–75 per cent |\n| Manufacturing | ${inr(PROV.mfg)} | about 10 per cent |\n| Services | ${inr(PROV.serv)} | 15–20 per cent |\n| **Total** | **${inr(PROV.total)}** | 100 per cent |`,
  parts: [
    child('a', num({ t: T, d: 2, c: 'application', marks: 1, value: PROV_SERV, unit: '%', stem: 'Calculate the share of services in Sonagiri\'s workforce.', sol: `Step 1: Share = service workers ÷ total × 100.\nStep 2: ${inr(PROV.serv)} ÷ ${inr(PROV.total)} × 100 = ${PROV_SERV} per cent.` })),
    child('b', short({ t: T, d: 2, c: 'understanding', marks: 1, stem: 'Is Sonagiri\'s pattern typical of India at the time? Give one reason.', model: '**Yes.** Its agriculture share (**72 per cent**) lies within the all-India range of 70–75 per cent, with services next and manufacturing smallest.', sol: 'Compare the province\'s shares with the all-India column.', scheme: [['Yes, with a comparison of shares', 1]] })),
    child('c', short({ t: T, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What does such a large share of workers in agriculture tell us about the economy? Give two points.', model: '(1) The economy was **backward and agrarian**: industry was too small to absorb workers. (2) With low farm **productivity**, so many workers on the land meant **low incomes and hidden unemployment**.', sol: 'Link the share to the weakness of industry and to low incomes.', scheme: [['Weak industrial base', 1], ['Low productivity / incomes', 1]] }), [
      short({ t: T, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): In some regions the share of agriculture in the workforce rose during colonial rule. Suggest two reasons.', model: '(1) **Decline of handicrafts** pushed artisans back to the land. (2) **Few new factories** came up in those regions, so there was **nowhere else to work**.', sol: 'Two reasons linked to de-industrialisation and lack of alternatives.', scheme: [['Artisans displaced to farming', 1], ['Lack of industrial jobs', 1]] }),
    ]),
  ],
}));
Q('cb_trade', caseQ({
  t: T, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined report written by SOYL for practice; the figures are illustrative, not historical data.)*',
  passage: `**From an imagined port officer\'s yearly report, Bombay, 1910**\n\nOutward cargo this year was again mostly raw cotton, oilseeds, jute and indigo, with a little sugar. Inward cargo was chiefly mill-made cloth, iron goods and light machinery, most of it from British ports; the shortened route through the canal keeps freight cheap. By our books, goods leaving the port were worth ₹${TRADE.x} crore and goods arriving ₹${TRADE.m} crore. Yet merchants here complain that no bullion came in to settle the difference, and the price of kerosene and cloth in the bazaar keeps rising.`,
  parts: [
    child('a', num({ t: T, d: 2, c: 'application', marks: 1, value: SURPLUS, unit: '₹ crore', stem: 'Calculate the export surplus recorded by the officer.', sol: `Step 1: Export surplus = exports − imports.\nStep 2: ${TRADE.x} − ${TRADE.m} = ${SURPLUS}. So ₹${SURPLUS} crore.` })),
    child('b', short({ t: T, d: 2, c: 'understanding', marks: 1, stem: 'Which canal is referred to as the "shortened route", and when did it open?', model: 'The **Suez Canal**, opened in **1869**.', sol: 'The canal that shortened the Britain–India sea route.', scheme: [['Suez Canal, 1869', 1]] })),
    child('c', short({ t: T, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Why did "no bullion" come in despite the surplus? What does this show?', model: 'The surplus was used to pay for the **colonial government\'s expenses in Britain**, its **wars** and invisible imports such as shipping. It shows a **drain of wealth**: the surplus left India instead of adding to its reserves.', sol: 'Where the surplus went, and the conclusion of a drain.', scheme: [['Uses of the surplus', 1], ['Drain of wealth', 1]] }), [
      short({ t: T, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Using the cargo lists, describe the composition of India\'s trade and explain why it suited Britain.', model: 'India **exported raw materials** (cotton, jute, oilseeds, indigo) and **imported finished goods** (cloth, iron goods, machinery). This fed **British factories** with cheap inputs and gave them a **large market**.', sol: 'Composition from the passage plus the British interest.', scheme: [['Composition', 1], ['Why it suited Britain', 1]] }),
    ]),
  ],
}));
