// CBSE 12 Economics, ch09 Human Capital Formation in India — question bank. Every scenario, table and
// passage is written by SOYL (imagined people, districts and figures, labelled as such); no NCERT
// exercise or board/sample-paper item is reused. Real-world facts are limited to stable ones (Article
// 21A, the RTE Act 2009, the long-standing 6 per cent of GDP goal for education). Every computed figure
// is derived here, never typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// Returns to a skill course (imagined ITI electrician course, monthly earnings in ₹).
export const ITI = { cost: 60000, before: 12000, after: 18000 };
export const ITI_GAIN_M = ITI.after - ITI.before; // 6,000 a month
export const ITI_GAIN_Y = ITI_GAIN_M * 12; // 72,000 a year
export const ITI_PAYBACK = ITI.cost / ITI_GAIN_M; // 10 months
// Migration decision (imagined worker, ₹ a month; one-time cost of moving).
export const MIG = { home: 10000, city: 25000, cost: 30000, extraLiving: 5000 };
export const MIG_NET_M = MIG.city - MIG.extraLiving - MIG.home; // 10,000 a month
export const MIG_NET_Y = MIG_NET_M * 12 - MIG.cost; // 90,000 in the first year
// Health: days lost to illness (imagined farm worker, daily wage ₹).
export const SICK = { days: 24, wage: 450 };
export const SICK_LOSS = SICK.days * SICK.wage; // 10,800
// Imagined state budget (₹ crore).
export const STATE = { gsdp: 400000, spend: 80000, edu: 12000 };
export const EDU_SHARE_SPEND = pct(STATE.edu, STATE.spend); // 15
export const EDU_SHARE_GSDP = pct(STATE.edu, STATE.gsdp); // 3
export const EDU_AT_6 = (6 * STATE.gsdp) / 100; // 24,000
export const EDU_GAP = EDU_AT_6 - STATE.edu; // 12,000
// Imagined district school cohort.
export const COHORT = { enrolled: 400, completed8: 340 };
export const DROP = COHORT.enrolled - COHORT.completed8; // 60
export const DROP_PCT = pct(DROP, COHORT.enrolled); // 15
// Imagined district literacy (per cent).
export const LIT = { male: 82, female: 64 };
export const LIT_GAP = LIT.male - LIT.female; // 18
// Pupil–teacher ratio (imagined school).
export const PTR = { pupils: 1200, teachers: 30 };
export const PTR_VAL = PTR.pupils / PTR.teachers; // 40
// Imagined household spending on education (₹ a year).
export const HH = { income: 240000, edu: 18000 };
export const HH_PCT = pct(HH.edu, HH.income); // 7.5
if (
  ITI_GAIN_M !== 6000 || ITI_GAIN_Y !== 72000 || ITI_PAYBACK !== 10 || MIG_NET_M !== 10000 || MIG_NET_Y !== 90000 || SICK_LOSS !== 10800 ||
  EDU_SHARE_SPEND !== 15 || EDU_SHARE_GSDP !== 3 || EDU_AT_6 !== 24000 || EDU_GAP !== 12000 || DROP !== 60 || DROP_PCT !== 15 ||
  LIT_GAP !== 18 || PTR_VAL !== 40 || HH_PCT !== 7.5
)
  throw new Error('figure check failed');

// ================================================================ t01 Human capital and its role in development
Q('m_hc_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: '**Human capital** refers to',
  opts: [
    'the stock of skill, knowledge and health embodied in the people of a country',
    'the total population of a country at a point of time',
    'machines and buildings owned by workers',
    'the money saved by households in banks',
  ],
  sol: 'Human capital is the stock of productive ability (skill, expertise, knowledge, health) in people. Population is a head count, machines are physical capital, and savings are financial assets.',
}));
Q('m_not_source', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is **NOT** a source of human capital formation?',
  opts: [
    'Buying a new tractor for a farm',
    'Expenditure on vocational training',
    'Expenditure on health care',
    'Migration in search of better-paid work',
  ],
  sol: 'A tractor is physical capital. Training, health and migration all raise the productive ability or earnings of people, so they are sources of human capital.',
}));
Q('m_flow_stock', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Human capital formation is best described as',
  opts: [
    'the process of adding to the stock of human capital over time',
    'the total number of educated people in a country on a given date',
    'the transfer of workers from villages to cities',
    'the purchase of shares in companies by households',
  ],
  sol: 'Human capital is a stock; human capital formation is the process (a flow over time) of adding to that stock through education, health, training and so on.',
}));
Q('m_physical_diff', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement correctly distinguishes human capital from physical capital?',
  opts: [
    'Human capital cannot be separated from its owner, whereas physical capital can be sold apart from its owner',
    'Physical capital is intangible, whereas human capital is tangible',
    'Only human capital depreciates with time',
    'Physical capital is perfectly mobile between countries, while human capital never moves',
  ],
  sol: 'Skill stays with the person who owns it, while a machine can be sold separately. Physical capital is tangible and human capital intangible; both depreciate (skills become outdated); and both can move, though under different restrictions.',
}));
Q('m_on_job', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A software firm in Pune pays for its new engineers to attend a six-week course on cloud security and asks them to stay with the firm for two years afterwards. Why does the firm insist on the two-year condition?',
  opts: [
    'To recover the benefit of the extra productivity created by the training it paid for',
    'Because the law forbids trained workers from changing jobs',
    'Because training lowers the productivity of workers in the short run',
    'To avoid paying the trainees any salary during the course',
  ],
  sol: 'On-the-job training is an investment by the firm; it gains only if the trained worker stays long enough for its extra output to repay the cost. No law forbids changing jobs, and training raises productivity.',
}));
Q('m_migration_cost', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Sunil moves from a village in Bihar to Bengaluru for a job in a hotel. Which of the following is a **cost** of this migration?',
  opts: [
    'Higher cost of living in the city and the cost of transport',
    'The higher salary he earns in Bengaluru',
    'The skills he picks up at the hotel',
    'The money he sends back to his family',
  ],
  sol: 'Migration costs include transport and the higher cost of living (and psychic costs of living away). Higher earnings and new skills are the returns that justify the move.',
}));
Q('m_info', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A state sets up a free portal that lists job openings, required skills and training centres. This spending adds to human capital mainly because',
  opts: [
    'information helps people choose the education and jobs that make the best use of their abilities',
    'it directly increases the stock of machines in the state',
    'it reduces the population of the state',
    'it guarantees a government job to every user',
  ],
  sol: 'Spending on information about labour markets and education helps people decide what to learn and where to work, raising the returns to their human capital. It adds no machines, does not change population, and guarantees nothing.',
}));
Q('m_twoway', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which statement best describes the link between human capital and economic growth?',
  opts: [
    'It runs both ways: more human capital raises output, and higher incomes allow more spending on education and health',
    'Only economic growth affects human capital; the reverse never happens',
    'Human capital raises growth only in agriculture',
    'There is no link, because growth depends only on physical capital',
  ],
  sol: 'Educated, healthy workers are more productive and innovate, which raises growth; a richer economy can in turn spend more on schools, hospitals and training. Physical capital alone cannot explain growth.',
}));
Q('m_hd_vs_hc', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'How does **human development** differ from **human capital**?',
  opts: [
    'Human development treats education and health as ends in themselves; human capital treats them as means to raise productivity',
    'Human development is concerned only with incomes; human capital only with health',
    'The two terms mean exactly the same thing',
    'Human capital is a wider idea than human development',
  ],
  sol: 'Human capital values education and health for the extra output they produce; human development values them as part of well-being whether or not they raise output. Human development is therefore the wider idea.',
}));
Q('m_productive', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Two weavers in an imagined Varanasi workshop use the same loom. Meera has completed a course in pattern design and produces saris that sell for much more. The difference in their earnings is mainly due to',
  opts: ['human capital', 'physical capital', 'land', 'financial capital'],
  sol: 'Both use the same physical capital (the loom); Meera\'s extra skill from the design course is human capital, which raises the value of her output.',
}));
Q('m_knowledge', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'An economy in which growth comes mainly from the creation, spread and use of knowledge, for example through information technology, is called a',
  opts: ['knowledge economy', 'subsistence economy', 'closed economy', 'barter economy'],
  sol: 'A knowledge economy relies on skilled people and information technology. A subsistence economy produces only for survival, a closed economy has no foreign trade, and a barter economy has no money.',
}));
Q('m_brain_drain', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Many doctors and engineers trained at public expense in India go abroad and settle there. From India\'s point of view, this is a problem mainly because',
  opts: [
    'the country loses the returns on human capital that it paid to create',
    'it increases India\'s population',
    'it lowers wages in the countries they move to',
    'it raises the number of seats in Indian medical colleges',
  ],
  sol: 'This is brain drain: public money creates scarce skills, but the output those skills produce is lost to the home economy. Population does not rise, and effects abroad are not India\'s concern here.',
}));
Q('m_health_prev', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of the following is an example of **preventive** health spending?',
  opts: [
    'A child immunisation drive in an imagined tribal block of Odisha',
    'Surgery for a broken leg in a district hospital',
    'Treating a patient with malaria',
    'Buying medicines for a patient with tuberculosis',
  ],
  sol: 'Preventive medicine (immunisation) stops illness before it occurs. Surgery and treating malaria or TB are curative medicine.',
}));
Q('m_both_capital', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why is human capital formation said to be necessary for **using physical capital well**?',
  opts: [
    'Modern machines need trained engineers, technicians and managers to run and maintain them',
    'Human capital is a substitute that removes the need for any machines',
    'Physical capital can only be bought by educated people',
    'Educated people do not need machines',
  ],
  sol: 'Physical and human capital are complements: imported or modern machinery is wasted without people trained to operate, repair and improve it.',
}));
Q('ar_intangible', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'Human capital is intangible.',
  r: 'Human capital is built into the minds and bodies of people and cannot be seen or sold separately from them.',
  sol: 'Both statements are true and R explains A: skill and knowledge exist only inside people, which is why human capital is intangible.',
}));
Q('ar_health', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'Expenditure on health is a source of human capital formation.',
  r: 'A healthy worker can work longer and more productively than a sick one.',
  sol: 'Both are true, and R is the reason: health raises the productive capacity of a worker, which is the essence of human capital.',
}));
Q('ar_depreciate', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'Human capital, unlike physical capital, never depreciates.',
  r: 'Skills can become outdated as technology changes, so workers need continuous training.',
  sol: 'A is false: human capital depreciates with age and as skills become outdated. R is true, and in fact shows why A is false.',
}));
Q('ar_hd', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Human development is a broader concept than human capital.',
  r: 'Education and health raise labour productivity.',
  sol: 'Both are true, but R does not explain A. R states the human capital view (education raises productivity); A is true because human development values education and health even when they do not raise output.',
}));
Q('tf_physical', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The benefits of human capital go only to the person who owns it.',
  sol: 'Human capital has social benefits too: an educated, healthy person spreads knowledge, keeps the family healthier and raises the productivity of others around them.',
}));
Q('tf_migration', tf({
  t: 1, d: 2, c: 'application', ans: true,
  stem: 'True or false? A nurse who moves from Kerala to a hospital in Delhi because she can earn more is adding to human capital formation through migration.',
  sol: 'Migration that lets a person use her skills where they earn more raises the returns to her human capital, so it is counted as a source of human capital formation, as long as the gain exceeds the cost of moving.',
}));
Q('fb_sources', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Training given by a firm to its own workers at the workplace is called ___ training.',
  acc: [['on-the-job', 'on the job', 'in-service']],
  sol: 'Training given by firms to their employees at the workplace is on-the-job training.',
}));
Q('mt_sources', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined case with the source of human capital formation it shows.',
  pairs: [
    ['A dairy cooperative runs a two-day course on cattle care for its members', 'On-the-job training'],
    ['A Class 12 student joins a degree course in commerce', 'Education'],
    ['A village gets a primary health centre and a clean water supply', 'Health'],
    ['A welder moves from Lucknow to Surat where shipyards pay more', 'Migration'],
  ],
  sol: 'A course for members while they work is on-the-job training; a degree is education; a health centre and clean water are health spending; moving to where skills earn more is migration.',
}));
Q('ord_hc_growth', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps of the chain by which spending on education raises economic growth.',
  items: [
    'Spending on schools, colleges and training',
    'People gain knowledge and skills',
    'Labour productivity rises and new ideas are used',
    'Output and incomes grow faster',
  ],
  sol: 'Spending creates skills, skills raise productivity and innovation, and higher productivity raises output and incomes (which can then fund more education).',
}));
Q('n_payback', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: ITI_PAYBACK, unit: 'months',
  stem: `An imagined electrician course at an ITI costs ₹${inr(ITI.cost)}. After it, Rahul's monthly earnings rise from ₹${inr(ITI.before)} to ₹${inr(ITI.after)}. In how many months will the extra earnings repay the cost of the course?`,
  sol: `Step 1: Extra earnings a month = ${inr(ITI.after)} − ${inr(ITI.before)} = ₹${inr(ITI_GAIN_M)}.\nStep 2: Months to repay = ${inr(ITI.cost)} ÷ ${inr(ITI_GAIN_M)} = ${ITI_PAYBACK} months.`,
}));
Q('n_sick', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: SICK_LOSS, unit: '₹',
  stem: `An imagined farm worker earning ₹${SICK.wage} a day falls ill with malaria and loses ${SICK.days} working days in a year. How much income does he lose (in ₹)?`,
  sol: `Step 1: Income lost = days lost × daily wage.\nStep 2: ${SICK.days} × ${SICK.wage} = ${inr(SICK_LOSS)}. So ₹${inr(SICK_LOSS)}.`,
}));
Q('n_migration', num({
  t: 1, d: 3, c: 'application', marks: 2, value: MIG_NET_Y, unit: '₹',
  stem: `Anil earns ₹${inr(MIG.home)} a month in his village. In a city he can earn ₹${inr(MIG.city)} a month, but living there costs him ₹${inr(MIG.extraLiving)} a month more, and moving costs ₹${inr(MIG.cost)} once. What is his net gain from migrating in the first year (in ₹)? *(Imagined figures.)*`,
  sol: `Step 1: Net extra income a month = ${inr(MIG.city)} − ${inr(MIG.extraLiving)} − ${inr(MIG.home)} = ₹${inr(MIG_NET_M)}.\nStep 2: For 12 months = ${inr(MIG_NET_M)} × 12 = ₹${inr(MIG_NET_M * 12)}.\nStep 3: Less the one-time cost: ${inr(MIG_NET_M * 12)} − ${inr(MIG.cost)} = ${inr(MIG_NET_Y)}. So ₹${inr(MIG_NET_Y)}.`,
  scheme: [['Net monthly gain after the extra living cost', 1], ['Annual gain less the cost of moving', 1]],
}));
Q('s_hc_physical', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two differences between human capital and physical capital.',
  model: '1. **Tangibility:** physical capital (a machine) is **tangible** and can be sold in the market; human capital is **intangible** and stays with its owner.\n2. **Benefits:** physical capital mainly benefits its **owner**; human capital also gives **social benefits** (an educated person helps others learn and stay healthy).',
  sol: 'Any two valid bases (tangibility, separability from the owner, mobility, private versus social benefit), each stating both sides.',
  scheme: [['First difference, both sides', 1], ['Second difference, both sides', 1]],
}));
Q('s_health', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain, with an example, how health expenditure adds to human capital.',
  model: 'A **healthy worker** works more days and with more energy. For example, if a mason in Jaipur is vaccinated and has clean water, he **misses fewer days** to illness and lays more bricks a day, so his **productivity and earnings** rise.',
  sol: 'Link health to the ability to work (more days, more effort) and give a concrete example.',
  scheme: [['Health raises the capacity to work', 1], ['Suitable example', 1]],
}));
Q('s_info', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is expenditure on information about jobs and education treated as a source of human capital formation?',
  model: 'Information about **job openings, wages and courses** helps people choose the **right education** and the job where their skills earn the most. Without it, skills may be wasted or people may train for jobs that no longer exist.',
  sol: 'Information improves decisions about what to learn and where to work, raising returns to skills.',
  scheme: [['Information guides choice of education and job', 1], ['Better use of skills / higher returns', 1]],
}));
Q('s_hd', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Distinguish between human capital and human development.',
  model: '1. **Human capital** sees education and health as **means** to raise labour productivity and output.\n2. **Human development** sees them as **ends in themselves**: being able to read and live a healthy life matter for well-being even if they add nothing to output.',
  sol: 'State the means-versus-ends contrast for both ideas.',
  scheme: [['Human capital: means to productivity', 1], ['Human development: ends in themselves', 1]],
}));
Q('s3_growth', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How does human capital contribute to economic growth? Give three points.',
  model: '1. **Productivity:** educated, trained workers produce more output per hour than untrained ones.\n2. **Innovation:** skilled people create and adapt new technology, which raises output from the same resources.\n3. **Absorbing capital:** a skilled workforce can run modern machines and manage firms, so investment in physical capital pays off.',
  sol: 'Three distinct channels, each linked to higher output.',
  scheme: [['Higher labour productivity', 1], ['Innovation and use of new technology', 1], ['Better use of physical capital', 1]],
}));
Q('s3_sources', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three sources of human capital formation.',
  model: '1. **Education:** schooling and higher studies build knowledge and raise future earnings.\n2. **Health:** preventive and curative care, clean water and nutrition let people work longer and better.\n3. **On-the-job training:** firms train workers in new methods, raising their productivity at the workplace.\n(Also: migration, information.)',
  sol: 'Any three of education, health, on-the-job training, migration and information, each explained.',
  scheme: [['First source explained', 1], ['Second source explained', 1], ['Third source explained', 1]],
}));
Q('s3_knowledge', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: '"India can become a knowledge economy." Give one argument for and two conditions that must be met.',
  model: '**For:** India has a **large young population** and a strong record in **IT and software services**, which use skills more than natural resources.\n**Conditions:** (1) **quality** schooling and higher education must reach rural and poor students, not just a few institutions; (2) **digital infrastructure** and research spending must expand so that knowledge is created here, not only applied.',
  sol: 'A balanced answer: one strength, then two realistic conditions.',
  scheme: [['One argument for', 1], ['First condition', 1], ['Second condition', 1]],
}));
Q('l_hc_growth', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the role of human capital in economic growth. Why is the relationship described as two-way?',
  model: '1. **Productivity:** an educated, trained worker produces more and better output than an untrained one.\n2. **Innovation:** skilled people invent and adapt technology, raising output from given resources.\n3. **Physical capital:** machines yield returns only when engineers and technicians can run and maintain them.\n4. **Other effects:** human capital changes attitudes (to savings, family size, hygiene), which also supports growth.\n5. **Two-way link:** growth raises incomes, so families and governments can spend **more on schools and hospitals**, which builds more human capital. Each feeds the other, though it is hard to prove which comes first.',
  sol: 'Four points on how human capital raises growth, then the reverse link from growth to human capital.',
  scheme: [['Productivity', 1], ['Innovation and technology', 1], ['Complement to physical capital', 1], ['Social effects (attitudes, health)', 1], ['Reverse link: growth funds human capital', 1]],
}));
Q('l_sources', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the five sources of human capital formation, with an Indian example of each.',
  model: '1. **Education:** a girl in Assam completing Class 12 can train as a nurse and earn far more.\n2. **Health:** a vaccination drive in Bihar villages cuts days lost to illness.\n3. **On-the-job training:** a car maker in Chennai trains new workers in robot welding.\n4. **Migration:** a carpenter moves from Odisha to Hyderabad, where his skills earn more than the cost of moving.\n5. **Information:** a state job portal tells youth which courses lead to jobs in demand.',
  sol: 'Each source named, explained in a phrase and given its own Indian example.',
  scheme: [['Education with example', 1], ['Health with example', 1], ['On-the-job training with example', 1], ['Migration with example', 1], ['Information with example', 1]],
}));

// ================================================================ t02 Growth of the education sector in India
Q('m_21a', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Article 21A of the Constitution and the Right to Education Act 2009 make education free and compulsory for children in the age group',
  opts: ['6 to 14 years', '3 to 10 years', '5 to 18 years', '10 to 16 years'],
  sol: 'Article 21A and the RTE Act 2009 cover children aged 6 to 14 years.',
}));
Q('m_six_pc', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The goal that public expenditure on education should reach about **6 per cent of GDP** was first set out by the',
  opts: ['Education Commission of 1964–66 (Kothari Commission)', 'Planning Commission in 1951', 'Reserve Bank of India', 'Finance Commission in 2020'],
  sol: 'The Education Commission (1964–66), chaired by D. S. Kothari, recommended about 6 per cent of GDP; the National Education Policy 2020 repeated the goal.',
}));
Q('m_indicator', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which indicator tells us how much the government spends on education **relative to the size of the economy**?',
  opts: [
    'Education expenditure as a percentage of GDP',
    'Education expenditure as a percentage of total government expenditure',
    'The number of schools in the country',
    'The literacy rate',
  ],
  sol: 'Spending as a share of GDP compares education spending with the size of the economy. Share of total government expenditure shows its priority in the budget; schools and literacy are outcome or input counts.',
}));
Q('m_quality', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'In an imagined district, almost every child of primary-school age is enrolled, but a survey finds that many Class 5 children cannot read a Class 2 text. This shows that',
  opts: [
    'access has improved, but the quality of learning remains a problem',
    'the district has achieved universal quality education',
    'enrolment is the main problem in the district',
    'children in the district do not attend any school',
  ],
  sol: 'Near-universal enrolment means access is good; weak reading shows poor learning outcomes, so quality, not enrolment, is the problem.',
}));
Q('m_dropout', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which measure is most directly aimed at reducing **dropouts** among children from poor families?',
  opts: [
    'Free midday meals and free textbooks in government schools',
    'Raising fees in government schools',
    'Closing small village schools',
    'Allowing children to start work at 10 years of age',
  ],
  sol: 'Midday meals and free books reduce the cost of schooling and give families a reason to keep children in school. The other options raise costs or push children out.',
}));
Q('m_gender', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A persistent feature of literacy in India is that',
  opts: [
    'female literacy has been lower than male literacy',
    'female literacy has always been higher than male literacy',
    'literacy is the same in all states',
    'rural literacy is higher than urban literacy',
  ],
  sol: 'Although the gap has narrowed, female literacy has remained below male literacy, and rural literacy below urban literacy, with large differences between states.',
}));
Q('m_higher', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'An imagined state spends a large share of its education budget on a few universities while many village schools lack teachers. The main concern with this pattern is that',
  opts: [
    'spending on higher education per student is high while basic schooling, which reaches far more children, is neglected',
    'universities do not create any human capital',
    'school education is the responsibility of private firms only',
    'it raises the literacy rate too quickly',
  ],
  sol: 'Higher education serves fewer students at a higher cost per student; if basic schooling is starved, most children lose out. Universities do create human capital, and schooling is mainly a public responsibility.',
}));
Q('m_unemp_educated', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Unemployment among educated youth is a concern for human capital formation mainly because',
  opts: [
    'resources spent on their education give little return when their skills are not used',
    'educated people do not want to work',
    'it reduces the number of schools',
    'it lowers the literacy rate',
  ],
  sol: 'When graduates and diploma holders find no suitable work, the human capital built at public and private cost lies idle, a waste of resources.',
}));
Q('m_ptr', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `An imagined school has ${inr(PTR.pupils)} pupils and ${PTR.teachers} teachers. Its pupil–teacher ratio is`,
  opts: [`${PTR_VAL} : 1`, `${PTR_VAL / 2} : 1`, `${PTR_VAL * 2} : 1`, `${PTR.teachers} : 1`],
  sol: `Pupil–teacher ratio = pupils ÷ teachers = ${inr(PTR.pupils)} ÷ ${PTR.teachers} = ${PTR_VAL}, so ${PTR_VAL} pupils per teacher.`,
}));
Q('m_regional', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is a problem of **regional disparity** in education?',
  opts: [
    'Literacy and school completion are much higher in some states than in others',
    'Boys and girls study the same syllabus',
    'Private schools charge fees',
    'Universities offer many courses',
  ],
  sol: 'Regional disparity means differences between states or regions in outcomes such as literacy and completion; the other statements describe no disparity.',
}));
Q('ar_rte', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'The Right to Education Act 2009 made elementary education a legal entitlement.',
  r: 'Under Article 21A, the State must provide free and compulsory education to all children aged 6 to 14.',
  sol: 'Both are true, and R explains A: the Act gives effect to the fundamental right in Article 21A, so children can claim elementary schooling as of right.',
}));
Q('ar_spending', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Public expenditure on education in India has stayed below the long-standing goal of 6 per cent of GDP.',
  r: 'Education in India is provided only by the central government.',
  sol: 'A is true (spending has remained below the 6 per cent goal). R is false: education is on the concurrent list and states spend the larger share; private and aided institutions also provide it.',
}));
Q('ar_gender', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Educating girls has benefits beyond the income of the girl herself.',
  r: 'Educated women tend to have healthier children, smaller families and more say in household decisions.',
  sol: 'Both are true, and R explains A: the gains spread to children\'s health, family size and the status of women, which is why girls\' education has large social returns.',
}));
Q('tf_6pc', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The 6 per cent goal for education refers to 6 per cent of total government expenditure.',
  sol: 'The goal refers to public expenditure on education as about 6 per cent of **GDP**, not of the government budget.',
}));
Q('fb_rte', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Free and compulsory education for children aged 6 to 14 became a fundamental right under Article ___ of the Constitution.',
  acc: [['21A', '21 A', '21-A']],
  sol: 'Article 21A, given effect by the RTE Act 2009.',
}));
Q('mt_problems', match({
  t: 2, d: 3, c: 'application',
  stem: 'Match each imagined situation with the problem of the education sector it shows.',
  pairs: [
    ['Village girls leave school after Class 8 because the nearest high school is 12 km away', 'Gender gap and dropout'],
    ['Children in Class 6 cannot solve Class 3 arithmetic', 'Low quality of learning'],
    ['A district in one state has 90 per cent literacy, while a district in another has 60 per cent', 'Regional disparity'],
    ['Graduates queue for a few clerical posts', 'Educated unemployment'],
  ],
  sol: 'Distance pushing girls out is a gender and dropout problem; weak arithmetic shows low quality; differences between districts of different states show regional disparity; graduates without suitable jobs show educated unemployment.',
}));
Q('n_edu_share', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: EDU_SHARE_GSDP, unit: '%',
  stem: `An imagined state has a State Domestic Product of ₹${inr(STATE.gsdp)} crore and spends ₹${inr(STATE.edu)} crore on education. What is education spending as a percentage of its State Domestic Product?`,
  sol: `Step 1: Share = education spending ÷ State Domestic Product × 100.\nStep 2: ${inr(STATE.edu)} ÷ ${inr(STATE.gsdp)} × 100 = ${EDU_SHARE_GSDP} per cent.`,
}));
Q('n_gap6', num({
  t: 2, d: 3, c: 'application', marks: 2, value: EDU_GAP, unit: '₹ crore',
  stem: `For the same imagined state (State Domestic Product ₹${inr(STATE.gsdp)} crore, education spending ₹${inr(STATE.edu)} crore), how much more must it spend each year to reach 6 per cent of its State Domestic Product (in ₹ crore)?`,
  sol: `Step 1: Spending at 6 per cent = 6 ÷ 100 × ${inr(STATE.gsdp)} = ₹${inr(EDU_AT_6)} crore.\nStep 2: Extra needed = ${inr(EDU_AT_6)} − ${inr(STATE.edu)} = ${inr(EDU_GAP)}. So ₹${inr(EDU_GAP)} crore.`,
  scheme: [['Spending at 6 per cent', 1], ['Gap from present spending', 1]],
}));
Q('n_dropout', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: DROP_PCT, unit: '%',
  stem: `In an imagined block, ${COHORT.enrolled} children joined Class 1 together and ${COHORT.completed8} of them completed Class 8. What percentage of the group dropped out before completing Class 8?`,
  sol: `Step 1: Dropouts = ${COHORT.enrolled} − ${COHORT.completed8} = ${DROP}.\nStep 2: Dropout rate = ${DROP} ÷ ${COHORT.enrolled} × 100 = ${DROP_PCT} per cent.`,
}));
Q('s_rte', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two provisions of the Right to Education Act 2009.',
  model: '1. **Free and compulsory** elementary education for every child aged **6 to 14** years in a neighbourhood school.\n2. Private unaided schools must reserve **25 per cent** of entry-level seats for children from weaker and disadvantaged groups. (Also: norms for teachers and buildings; no screening tests at admission.)',
  sol: 'Any two correct provisions of the Act.',
  scheme: [['First provision', 1], ['Second provision', 1]],
}));
Q('s_spend_indicators', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the two indicators used to judge government expenditure on education and say what each shows.',
  model: '1. **Education expenditure as a percentage of total government expenditure:** how high education ranks among the government\'s **priorities**.\n2. **Education expenditure as a percentage of GDP:** how much of the country\'s **income** is devoted to education.',
  sol: 'Name both indicators and give what each measures.',
  scheme: [['Share of government expenditure, with meaning', 1], ['Share of GDP, with meaning', 1]],
}));
Q('s_girls', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Suggest two measures to reduce the dropout of girls from secondary school in rural areas.',
  model: '1. **Schools closer to home** or safe transport (bicycles, buses) so that distance does not end a girl\'s schooling.\n2. **Separate toilets, women teachers and scholarships** tied to attendance, which make schooling safer and cheaper for families.',
  sol: 'Two practical measures that address distance, safety or cost.',
  scheme: [['First practical measure', 1], ['Second practical measure', 1]],
}));
Q('s_vocational', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why is vocational education important for India\'s human capital?',
  model: 'Vocational courses give **job-ready skills** (electrician, nurse, welder) that the economy needs. They reduce **educated unemployment** among youth who have degrees but no marketable skill, and they raise **productivity** in industry and services.',
  sol: 'Link vocational skills to employability and productivity.',
  scheme: [['Provides employable skills', 1], ['Reduces educated unemployment / raises productivity', 1]],
}));
Q('s3_achievements', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three achievements of the education sector in India since independence.',
  model: '1. **Literacy** has risen from under one in five people at independence to about three in four (Census 2011).\n2. **Enrolment** in primary school is now close to universal, helped by the RTE Act and midday meals.\n3. A large network of **higher and technical institutions** (universities, IITs, medical colleges) has built skilled human capital.',
  sol: 'Three distinct achievements, stated broadly.',
  scheme: [['Rise in literacy', 1], ['Near-universal primary enrolment', 1], ['Growth of higher and technical education', 1]],
}));
Q('s3_problems', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three problems of the education sector in India.',
  model: '1. **Low quality:** many children complete primary school without basic reading and arithmetic.\n2. **Gender and regional gaps:** girls, rural children and some states lag behind in literacy and completion.\n3. **Low spending:** public expenditure has remained below the 6 per cent of GDP goal, so schools lack teachers and facilities.',
  sol: 'Three distinct problems, each explained.',
  scheme: [['First problem explained', 1], ['Second problem explained', 1], ['Third problem explained', 1]],
}));
Q('l_state_edu', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Critically evaluate the state of the education sector in India.',
  model: '1. **Access:** literacy has risen greatly and primary enrolment is close to universal; the **RTE Act 2009** made elementary education a right.\n2. **Higher education:** a large system of universities and technical institutes supplies skilled workers for IT, health and industry.\n3. **Quality:** learning levels are often low; many children cannot read or calculate at their class level.\n4. **Equity:** girls, rural children, poorer groups and some states still lag behind; dropouts rise after the elementary stage.\n5. **Judgement:** India has achieved **quantity** more than **quality**; raising spending towards **6 per cent of GDP** and focusing on teachers and learning outcomes is the next step.',
  sol: 'Two achievements, two problems, and a balanced conclusion.',
  scheme: [['Achievement: access and literacy', 1], ['Achievement: higher education', 1], ['Problem: quality', 1], ['Problem: equity and dropouts', 1], ['Balanced judgement with a way forward', 1]],
}));
Q('l_govt_role', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Why should the government intervene in education and health? Explain.',
  model: '1. **Long-term gains:** returns to education and health come over many years, and poor families cannot wait or pay the cost now.\n2. **Social benefits:** an educated, healthy person benefits others (less disease, better-informed citizens), which private choices ignore.\n3. **Information gaps:** families may not know which courses or treatments are worth paying for, and private providers may overcharge.\n4. **Equity:** without public schools and hospitals, the poor would be shut out and inequality would grow.\n5. **Constitutional duty:** Article 21A makes elementary education a right, so the State must provide it.',
  sol: 'Five reasons: long gestation, externalities, information, equity, legal duty.',
  scheme: [['Long-term returns / cost', 1], ['Social benefits', 1], ['Information problem / exploitation', 1], ['Equity', 1], ['Constitutional duty', 1]],
}));
Q('l_problems_measures', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Identify three problems of human capital formation in India and suggest a measure for each. Which do you consider most urgent, and why?',
  model: '1. **Brain drain:** skilled doctors and engineers emigrate. *Measure:* better research facilities and pay at home.\n2. **Poor quality of schooling:** weak learning outcomes. *Measure:* trained teachers, regular assessment of learning.\n3. **Low public spending:** below 6 per cent of GDP. *Measure:* raise education and health budgets steadily.\n4. **Most urgent:** the **quality of school learning**, because every later skill (higher education, training) depends on basic reading and arithmetic.\n5. Without it, more spending or more seats will not create usable human capital.',
  sol: 'Three problems each paired with a realistic measure, then a reasoned choice.',
  scheme: [['First problem with measure', 1], ['Second problem with measure', 1], ['Third problem with measure', 1], ['Choice of most urgent', 1], ['Reason for the choice', 1]],
}));
Q('l_hc_hd_knowledge', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'India is often described as a country that can become a "knowledge economy". Examine this claim in the light of the state of its human capital.',
  model: '1. **Strength:** a large young workforce and a world-class **IT and software services** sector show that Indian skills can compete globally.\n2. **Strength:** a large number of engineers and scientists graduate each year, and digital access is spreading.\n3. **Weakness:** much of the workforce has **little schooling or training**, and many work in low-productivity jobs.\n4. **Weakness:** quality gaps in schools and low spending on **research** limit the creation of new knowledge.\n5. **Conclusion:** the potential is real, but it depends on spreading **quality education and skills** to the majority, not only to a few.',
  sol: 'Two strengths, two weaknesses, then a conditional conclusion.',
  scheme: [['First strength', 1], ['Second strength', 1], ['First weakness', 1], ['Second weakness', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ case-based
Q('cb_skill', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined account written by SOYL for practice; the person and figures are not real.)*',
  passage: `**From an imagined youth newsletter, Ranchi district**\n\nAfter Class 12, Rahul worked as a helper with a local contractor for ₹${inr(ITI.before)} a month. Last year he took a loan from his self-help group to join a one-year electrician course at the government ITI, which cost ₹${inr(ITI.cost)} in all. He now earns ₹${inr(ITI.after)} a month wiring new houses, and his employer has sent him for a short course on solar panels. His sister, a nurse, moved to a hospital in Pune last year because the pay was higher, though she says rent there takes a big share of her salary.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'application', marks: 1, value: ITI_GAIN_Y, unit: '₹', stem: 'By how much do Rahul\'s yearly earnings rise after the course (in ₹)?', sol: `Step 1: Monthly rise = ${inr(ITI.after)} − ${inr(ITI.before)} = ₹${inr(ITI_GAIN_M)}.\nStep 2: Yearly rise = ${inr(ITI_GAIN_M)} × 12 = ${inr(ITI_GAIN_Y)}. So ₹${inr(ITI_GAIN_Y)}.` })),
    child('b', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the source of human capital shown by the employer sending Rahul for a course on solar panels.', model: '**On-the-job training.**', sol: 'Training paid for by the employer during employment is on-the-job training.', scheme: [['On-the-job training', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the passage, explain why the sister\'s move to Pune is a source of human capital formation, and name one cost of the move.', model: 'Moving lets her **use her nursing skills where they earn more**, raising the return on her human capital, which is why migration counts as a source. **Cost:** the higher **rent** (cost of living) in Pune.', sol: 'Higher returns to existing skills, plus one cost from the passage.', scheme: [['Higher return to existing skills', 1], ['One cost of migration', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Was the loan for the ITI course a sound investment? Justify with the figures given.', model: `**Yes.** The course cost ₹${inr(ITI.cost)}, and his earnings rose by ₹${inr(ITI_GAIN_M)} a month, so the cost is **repaid in about ${ITI_PAYBACK} months**; after that the extra income continues for years.`, sol: 'Compare cost with the extra monthly earnings and conclude.', scheme: [['Use of the figures (payback)', 1], ['Justified judgement', 1]] }),
    ]),
  ],
}));
Q('cb_budget', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the data and answer the questions that follow. *(Imagined state and figures, written by SOYL for practice.)*',
  passage: `**Education finances of the imagined state of Vindhyapradesh (₹ crore)**\n\n| Item | Amount |\n|---|---|\n| State Domestic Product | ${inr(STATE.gsdp)} |\n| Total government expenditure | ${inr(STATE.spend)} |\n| Expenditure on education | ${inr(STATE.edu)} |\n\nThe state's education minister says the state "gives education a high priority", while a teachers' association says the state "spends too little on education".`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: EDU_SHARE_SPEND, unit: '%', stem: 'Calculate education expenditure as a percentage of total government expenditure.', sol: `Step 1: Share = ${inr(STATE.edu)} ÷ ${inr(STATE.spend)} × 100.\nStep 2: = ${EDU_SHARE_SPEND} per cent.` })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: EDU_SHARE_GSDP, unit: '%', stem: 'Calculate education expenditure as a percentage of the State Domestic Product.', sol: `Step 1: Share = ${inr(STATE.edu)} ÷ ${inr(STATE.gsdp)} × 100.\nStep 2: = ${EDU_SHARE_GSDP} per cent.` })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Using your answers, explain how both the minister and the teachers\' association can be right.', model: `The minister uses the **share of the budget**: ${EDU_SHARE_SPEND} per cent of all government spending is a large slice, showing priority. The association uses the **share of State Domestic Product**: ${EDU_SHARE_GSDP} per cent is only half the **6 per cent goal**, so the amount is small relative to the economy.`, sol: 'Each side relies on a different indicator; compare the second with the 6 per cent goal.', scheme: [['Minister: share of budget', 1], ['Association: share of income vs 6 per cent goal', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): How much more would the state need to spend to reach 6 per cent of its State Domestic Product? Suggest one use for the extra money.', model: `At 6 per cent it would spend ₹${inr(EDU_AT_6)} crore, so it needs **₹${inr(EDU_GAP)} crore more**. One use: **hire and train more teachers** for schools with too many pupils per teacher.`, sol: 'Compute 6 per cent of the State Domestic Product, subtract present spending, and give one sensible use.', scheme: [['Extra amount computed', 1], ['Suitable use', 1]] }),
    ]),
  ],
}));
Q('cb_village', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the data and answer the questions that follow. *(Imagined block and figures, written by SOYL for practice.)*',
  passage: `**School report of the imagined Kesharpur block**\n\n| Indicator | Value |\n|---|---|\n| Children who joined Class 1 together | ${COHORT.enrolled} |\n| Of them, completed Class 8 | ${COHORT.completed8} |\n| Male literacy rate | ${LIT.male} per cent |\n| Female literacy rate | ${LIT.female} per cent |\n\nThe block office notes that the nearest higher secondary school is far from most villages and that many families need older children to help on the farm during harvest.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: DROP_PCT, unit: '%', stem: 'What percentage of the children dropped out before completing Class 8?', sol: `Step 1: Dropouts = ${COHORT.enrolled} − ${COHORT.completed8} = ${DROP}.\nStep 2: ${DROP} ÷ ${COHORT.enrolled} × 100 = ${DROP_PCT} per cent.` })),
    child('b', num({ t: 2, d: 1, c: 'understanding', marks: 1, value: LIT_GAP, unit: 'percentage points', stem: 'What is the gender gap in literacy in the block (male minus female, in percentage points)?', sol: `Step 1: Gap = male rate − female rate.\nStep 2: ${LIT.male} − ${LIT.female} = ${LIT_GAP} percentage points.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two reasons from the report for dropouts in the block.', model: '(1) **Distance:** the higher secondary school is **far from most villages**. (2) **Child labour:** families need older children **on the farm at harvest**, so schooling is interrupted and then abandoned.', sol: 'Two reasons taken from the passage, each linked to dropping out.', scheme: [['Distance to school', 1], ['Need for children\'s labour', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two measures the block could take to narrow its gender gap in literacy.', model: '(1) **Free bicycles or school buses** for girls so that distance does not stop them. (2) **Scholarships for girls** linked to attendance, with women teachers and safe toilets in schools.', sol: 'Two practical measures aimed at girls.', scheme: [['First measure', 1], ['Second measure', 1]] }),
    ]),
  ],
}));
