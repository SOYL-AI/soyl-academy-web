// CBSE 12 Economics, ch07 Indian Economy 1950-1990 — question bank. Every scenario, table and passage
// is written by SOYL (imagined farmers, districts, firms and figures, labelled as such); no NCERT
// exercise or board/sample-paper item is reused. Real-world facts are limited to stable, commonly
// taught ones (Planning Commission 1950, First Plan 1951, IPR 1956, Karve Committee 1955, the Green
// Revolution from the mid-1960s, NITI Aayog 2015), stated broadly. Every computed figure is derived here.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// Marketed surplus of an imagined Punjab farmer (quintals of wheat).
export const MS = { output: 50, kept: 12 };
export const MS_SOLD = MS.output - MS.kept; // 38
export const MS_PCT = pct(MS_SOLD, MS.output); // 76
// Land ceiling in an imagined state (hectares).
export const CEIL = { owned: 40, ceiling: 15, plot: 2.5 };
export const CEIL_SURPLUS = CEIL.owned - CEIL.ceiling; // 25
export const CEIL_FAMILIES = CEIL_SURPLUS / CEIL.plot; // 10
// Tariff on an imported machine (₹).
export const TAR = { import: 200000, rate: 60, domestic: 280000 };
export const TAR_DUTY = (TAR.import * TAR.rate) / 100; // 1,20,000
export const TAR_LANDED = TAR.import + TAR_DUTY; // 3,20,000
export const TAR_GAP = TAR_LANDED - TAR.domestic; // 40,000
// Wheat yield in an imagined district (kg per hectare) before and after HYV seeds.
export const YLD = { before: 1200, after: 2100 };
export const YLD_RISE = pct(YLD.after - YLD.before, YLD.before); // 75
// Import quota (units of an imagined good).
export const QUO = { demand: 10000, quota: 2500 };
export const QUO_DOM = QUO.demand - QUO.quota; // 7,500
// Industry's share of output in an imagined state (₹ crore).
export const IND = { y1: { ind: 90, total: 600 }, y2: { ind: 360, total: 1500 } };
export const IND_S1 = pct(IND.y1.ind, IND.y1.total); // 15
export const IND_S2 = pct(IND.y2.ind, IND.y2.total); // 24
// Case: imagined village after the Green Revolution (quintals of wheat).
export const GRV = { big: { output: 400, kept: 40 }, small: { output: 30, kept: 24 } };
export const GRV_BIG = pct(GRV.big.output - GRV.big.kept, GRV.big.output); // 90
export const GRV_SMALL = pct(GRV.small.output - GRV.small.kept, GRV.small.output); // 20
// Case: imagined scooter maker under protection (units per worker per year; price in ₹).
export const SCO = { home: 18, world: 45 };
export const SCO_RATIO = SCO.world / SCO.home; // 2.5
if (MS_SOLD !== 38 || MS_PCT !== 76 || CEIL_SURPLUS !== 25 || CEIL_FAMILIES !== 10 || TAR_DUTY !== 120000 || TAR_LANDED !== 320000 || TAR_GAP !== 40000 || YLD_RISE !== 75 || QUO_DOM !== 7500 || IND_S1 !== 15 || IND_S2 !== 24 || GRV_BIG !== 90 || GRV_SMALL !== 20 || SCO_RATIO !== 2.5) throw new Error('figure check failed');

// ================================================================ t01 Economic system and plan goals
Q('m_mixed', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'The economic system India chose after independence is best described as a',
  opts: [
    'mixed economy, in which the public and private sectors work side by side under state planning',
    'pure market economy, with no role for the government',
    'centrally planned economy, in which the state owns every enterprise',
    'barter economy, with no use of money',
  ],
  sol: 'India combined features of capitalism and socialism: private enterprise continued, while the state planned, owned key industries and regulated the rest. A pure market economy and full state ownership were both rejected; money was always used.',
}));
Q('m_pc_year', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The Planning Commission of India was set up in',
  opts: ['1950', '1947', '1956', '1991'],
  sol: 'It was set up in 1950 with the Prime Minister as its chairperson; the First Five Year Plan began in 1951. 1956 is the year of the Industrial Policy Resolution and 1991 the year of economic reforms.',
}));
Q('m_modern', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the plans, the goal of **modernisation** meant',
  opts: [
    'adopting new technology in production and also changing social outlook, such as recognising equal rights of women',
    'importing as many consumer goods as possible',
    'replacing all farming by factory work within one plan',
    'reducing the role of the public sector',
  ],
  sol: 'Modernisation had two sides: new technology (for example, new seed varieties or modern machines) and social change, such as using the talents of women in the workplace. The other options describe none of the plan goals.',
}));
Q('m_selfrel', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A planner in the 1950s argues that India should grow its own food and make its own machines rather than buy them abroad. Which plan goal is she supporting?',
  opts: ['Self-reliance', 'Equity', 'Modernisation', 'Privatisation'],
  sol: 'Avoiding imports of goods that could be produced at home, especially food, is the goal of self-reliance; it was meant to reduce dependence on foreign countries. Privatisation was not a goal of the early plans.',
}));
Q('m_equity', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'GDP in an imagined state rises quickly, but most of the gain goes to a few large landowners and factory owners. Which plan goal has **not** been met?',
  opts: ['Equity', 'Growth', 'Modernisation', 'Self-reliance'],
  sol: 'Growth has happened, since GDP rose; what is missing is a fair spread of the benefits among all sections, which is the goal of equity.',
}));
Q('m_conflict', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which pair of plan goals is most likely to **conflict** when a modern machine replaces many workers in a labour-surplus economy?',
  opts: ['Modernisation and employment-friendly equity', 'Growth and self-reliance in food', 'Self-reliance and import substitution', 'Equity and land reforms'],
  sol: 'New technology (modernisation) may raise output but reduce jobs, which hurts the poor and therefore equity. Self-reliance and import substitution point the same way, and land reforms serve equity.',
}));
Q('m_niti', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In 2015 the Planning Commission was replaced by',
  opts: ['NITI Aayog', 'the Reserve Bank of India', 'the Finance Commission', 'the National Statistics Office'],
  sol: 'NITI Aayog (National Institution for Transforming India) replaced the Planning Commission in 2015. The RBI, the Finance Commission and the statistics office are separate bodies with other roles.',
}));
Q('ar_plan_period', ar({
  t: 1, d: 2, c: 'analysis', key: 'b',
  a: 'Each Five Year Plan spelt out its own priorities within the long-term goals of planning.',
  r: 'A plan covers a period of five years.',
  sol: 'Both statements are true. But the length of the plan does not explain why each plan set its own priorities; that reflected the changing needs of the economy within the long-term goals.',
}));
Q('ar_mixed', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'India\'s planners gave the public sector a leading role in heavy industry after independence.',
  r: 'Private investors at that time lacked the capital, and the market was too small, to undertake very large projects such as steel plants and dams.',
  sol: 'Both are true, and R explains A: huge, long-gestation projects needed resources and a willingness to wait for returns that private industry did not have, so the state stepped in.',
}));
Q('fb_goals', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The four long-term goals of Indian planning were growth, modernisation, ___ and equity.',
  acc: [['self-reliance', 'self reliance']],
  sol: 'The goals were growth, modernisation, self-reliance and equity.',
}));
Q('mt_goals', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined policy step of the 1950s–60s with the plan goal it mainly serves.',
  pairs: [
    ['Building a new steel plant to raise output', 'Growth'],
    ['Encouraging women to work in factories and offices', 'Modernisation'],
    ['Making machine tools at home instead of importing them', 'Self-reliance'],
    ['Giving surplus land to landless labourers', 'Equity'],
  ],
  sol: 'More output is growth; changing social outlook is part of modernisation; producing at home what was imported is self-reliance; redistributing land serves equity.',
}));
Q('s_mixed', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why did India choose a mixed economy after independence? Give two reasons.',
  model: '1. Leaders wanted the **state to plan** and invest in basic industries and welfare, because the private sector alone would not reduce **poverty and inequality**.\n2. They also did not want to abolish **private enterprise** and **democratic freedoms**, as a fully state-run economy would.',
  sol: 'One reason for a state role and one for keeping a private sector.',
  scheme: [['Reason for a state role (planning, welfare, basic industry)', 1], ['Reason for keeping private enterprise and freedom', 1]],
}));
Q('s_growth_gdp', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by the goal of growth? Why is a large share of services in GDP not, by itself, a sign of development?',
  model: '**Growth** means a rise in the country\'s capacity to produce goods and services, shown by a rising **GDP**. A large services share is a sign of development only when it follows growth in agriculture and industry; in a poor country it can reflect **low-paid informal services** rather than modern ones.',
  sol: 'Define growth through GDP, then say why the composition of GDP also matters.',
  scheme: [['Growth defined through GDP', 1], ['Why the services share alone can mislead', 1]],
}));
Q('s3_goals', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three goals of the Five Year Plans.',
  model: '1. **Growth:** a rise in productive capacity, measured by a steady increase in GDP.\n2. **Self-reliance:** reducing dependence on imports, especially of food, so that the young nation could not be pressured by other countries.\n3. **Equity:** making sure the benefits of growth reach the poor, through land reform, basic needs such as food, housing, education and health, and narrower income gaps.',
  sol: 'Any three of the four goals, each with its meaning.',
  scheme: [['First goal explained', 1], ['Second goal explained', 1], ['Third goal explained', 1]],
}));
Q('l_conflict', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Can all the goals of planning be achieved at the same time? Evaluate with examples of possible conflicts.',
  model: '1. **Not always:** the goals pull in different directions, so plans must set priorities.\n2. **Modernisation vs employment and equity:** labour-saving machines raise output but can reduce jobs in a country with many workers.\n3. **Growth vs equity:** rapid growth may first benefit those who already own land and capital.\n4. **Self-reliance vs efficiency:** producing everything at home may cost more than importing, which can slow growth.\n5. **Judgement:** conflicts can be eased by policies such as **land reform**, support for **small industry** and **public investment** in education, so growth and equity move together; each plan therefore balanced the goals rather than chasing one.',
  sol: 'A clear position, three conflicts with examples, and a balanced judgement on how they can be managed.',
  scheme: [['Position: goals can conflict and need priorities', 1], ['First conflict with example', 1], ['Second conflict with example', 1], ['Third conflict with example', 1], ['Balanced judgement on managing the conflicts', 1]],
}));

// ================================================================ t02 Agriculture
Q('m_intermediary', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Abolition of intermediaries as a land reform meant',
  opts: [
    'removing zamindars and other middlemen so that cultivators dealt directly with the state',
    'removing traders from the wholesale grain market',
    'banning the use of tractors on small farms',
    'stopping the government from buying grain',
  ],
  sol: 'The reform ended the zamindari system: tillers became owners or dealt directly with the government, with no landlord taking a share of the produce in between. The other options are not land reforms.',
}));
Q('m_ceiling', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The main purpose of fixing a land ceiling was to',
  opts: [
    'reduce the concentration of land ownership by taking over land above the limit and giving it to the landless',
    'raise the land revenue collected from big farmers',
    'encourage farmers to buy more land',
    'stop farmers from growing cash crops',
  ],
  sol: 'A ceiling is the maximum land one owner may hold; land above it was to be acquired and redistributed, which serves equity. It was not a tax measure and did not regulate crops.',
}));
Q('m_ceiling_fail', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of the following was a common reason why land ceiling laws had limited success?',
  opts: [
    'Big landowners used loopholes, such as transferring land to relatives on paper, and challenged the laws in courts',
    'There was no land above the ceiling anywhere in India',
    'Landless labourers refused to accept land',
    'The laws applied only to land in cities',
  ],
  sol: 'Owners delayed implementation through court cases and evaded the limit by registering land in the names of relatives, so much less surplus land was taken over than expected. The other options are false.',
}));
Q('m_hyv', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Green Revolution was based mainly on the use of',
  opts: ['high yielding variety (HYV) seeds with fertilisers, pesticides and regular water', 'organic manure alone', 'more land brought under the plough', 'cooperative farming of all land'],
  sol: 'HYV seeds of wheat and rice, used with fertilisers, pesticides and assured irrigation, raised yields sharply. Expanding cultivated area and cooperative farming were not its basis.',
}));
Q('m_gr_phase1', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In its first phase (roughly the mid-1960s to the mid-1970s), the Green Revolution was largely limited to',
  opts: [
    'wheat, and to the better-off states with irrigation such as Punjab',
    'pulses, in every state equally',
    'cotton, mainly in rain-fed areas',
    'tea and coffee plantations in the hills',
  ],
  sol: 'At first the HYV package needed assured water and money for inputs, so its gains were concentrated in wheat and in better-irrigated, more prosperous states. It later spread to more states and crops, especially rice.',
}));
Q('m_marketed', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Marketed surplus means the part of',
  opts: ['farm output that farmers sell in the market', 'farm output that is exported', 'industrial output that is unsold', 'land that is above the ceiling'],
  sol: 'It is the share of their produce farmers sell after keeping what they need for their families; the Green Revolution raised it sharply.',
}));
Q('m_buffer', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A sharp rise in the harvest lets the government buy large quantities of wheat and store it. What is this stored grain called, and what is it mainly used for?',
  opts: [
    'A buffer stock, used to keep food available and prices steady in years of shortage',
    'A marketed surplus, used to pay farmers\' debts',
    'A land ceiling, used to give land to the landless',
    'An import quota, used to protect industry',
  ],
  sol: 'Grain procured and stored by the government is the buffer stock; it is released when harvests fail or prices rise. It was possible only because output rose enough to leave a surplus.',
}));
Q('m_small_farmer', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why did the gains of the Green Revolution reach small farmers too, contrary to early fears?',
  opts: [
    'The government gave cheap loans and subsidised fertilisers, so small farmers could also buy the inputs',
    'Small farmers were exempt from all taxes',
    'HYV seeds needed no fertiliser or water',
    'Only small farmers were allowed to use HYV seeds',
  ],
  sol: 'Loans at low interest from banks and subsidised inputs, together with research institutions that helped with pests, let small farmers adopt the package. HYV seeds actually need more water and fertiliser, and there was no exclusive rule for small farmers.',
}));
Q('m_subsidy_for', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which argument is made by those who want fertiliser subsidies to be **reduced or better targeted**?',
  opts: [
    'Much of the benefit goes to fertiliser makers and to farmers in richer regions, while it is a large burden on the budget',
    'Subsidies were never needed, even in the 1960s',
    'Subsidies always make every farmer poorer',
    'Farmers should be forced to stop using fertilisers',
  ],
  sol: 'Critics accept that subsidies helped spread new technology but argue that today much of the benefit goes to the fertiliser industry and better-off farmers, at a large fiscal cost. Supporters reply that most farmers are poor and still need help. The other options misstate the debate.',
}));
Q('ar_gr_risk', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'HYV crops carried a higher risk of failure from pest attacks than traditional crops.',
  r: 'HYV crops were more vulnerable to pests, so research institutes were set up to help farmers deal with them.',
  sol: 'Both are true, and R explains A: the new varieties were more prone to pests, which made crop failure a real risk and led the government to back research and advice.',
}));
Q('ar_workforce', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'By 1990 a large share of India\'s workforce, around two-thirds, still depended on agriculture.',
  r: 'By 1990 industry and services had absorbed most of the people who left farming.',
  sol: 'A is true: agriculture\'s share in GDP fell, but a very large part of the population still worked in it. R is false; industry and services did not grow fast enough to absorb these workers, which is why the share stayed high.',
}));
Q('tf_tenancy', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Tenancy reforms aimed to regulate rents and give tenants security so that they would invest in the land.',
  sol: 'A tenant who could be evicted at any time had little reason to improve the land; fixing rents and giving security of tenure (or ownership) encouraged investment.',
}));
Q('tf_gr_rice', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Green Revolution raised the output of all crops, including pulses, equally in every region.',
  sol: 'Its gains were concentrated in wheat and later rice, and at first in irrigated, better-off regions; many crops and rain-fed areas gained much less.',
}));
Q('n_marketed', num({
  t: 2, d: 2, c: 'application', marks: 1, value: MS_PCT, unit: '%',
  stem: `An imagined wheat farmer in Punjab harvests ${MS.output} quintals and keeps ${MS.kept} quintals for his family. What percentage of his output is marketed surplus?`,
  sol: `Step 1: Marketed surplus = ${MS.output} − ${MS.kept} = ${MS_SOLD} quintals.\nStep 2: Share = ${MS_SOLD} ÷ ${MS.output} × 100 = ${MS_PCT}%.`,
}));
Q('n_ceiling', num({
  t: 2, d: 2, c: 'application', marks: 1, value: CEIL_FAMILIES, unit: 'families',
  stem: `In an imagined state the land ceiling is ${CEIL.ceiling} hectares. A landowner holds ${CEIL.owned} hectares. If the surplus is given to landless families in plots of ${CEIL.plot} hectares each, how many families receive land?`,
  sol: `Step 1: Surplus land = ${CEIL.owned} − ${CEIL.ceiling} = ${CEIL_SURPLUS} hectares.\nStep 2: Families = ${CEIL_SURPLUS} ÷ ${CEIL.plot} = ${CEIL_FAMILIES}.`,
}));
Q('n_yield', num({
  t: 2, d: 3, c: 'application', marks: 2, value: YLD_RISE, unit: '%',
  stem: `In an imagined district, wheat yield rose from ${inr(YLD.before)} kg per hectare to ${inr(YLD.after)} kg per hectare after farmers adopted HYV seeds. Find the percentage increase in yield.`,
  sol: `Step 1: Increase = ${inr(YLD.after)} − ${inr(YLD.before)} = ${YLD.after - YLD.before} kg per hectare.\nStep 2: Percentage increase = ${YLD.after - YLD.before} ÷ ${inr(YLD.before)} × 100 = ${YLD_RISE}%.`,
  scheme: [['Increase in yield', 1], [`Percentage increase ${YLD_RISE}%`, 1]],
}));
Q('ord_gr', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these developments of Indian agriculture in the order in which they happened.',
  items: [
    'Abolition of intermediaries such as zamindars in the early years after independence',
    'Introduction of HYV wheat seeds in irrigated states in the mid-1960s',
    'Spread of HYV technology to more states and to rice from the mid-1970s',
    'Debate on reducing or targeting fertiliser subsidies in the reform years',
  ],
  sol: 'Land reforms began soon after independence; the HYV package arrived in the mid-1960s with wheat, spread to more crops and states from the mid-1970s, and the subsidy debate grew louder around the reforms of the 1990s.',
}));
Q('s_land_reform', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why were land reforms needed in India after independence? Give two reasons.',
  model: '1. **Equity:** ownership was highly concentrated, while tillers paid heavy rents to landlords and stayed poor.\n2. **Productivity:** cultivators who did not own the land had little **incentive to invest** in it, so yields stayed low; ownership was expected to raise output.',
  sol: 'One equity reason and one productivity (incentive) reason.',
  scheme: [['Equity reason', 1], ['Productivity or incentive reason', 1]],
}));
Q('s_subsidy_case', short({
  t: 2, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Give one argument for and one argument against continuing agricultural subsidies.',
  model: '**For:** most farmers are **small and poor**; without cheaper fertiliser and power they could not afford modern inputs, and farming would become riskier.\n**Against:** a large part of the benefit goes to **fertiliser makers and richer farmers**, and the cost limits public spending on irrigation or research.',
  sol: 'One balanced point on each side.',
  scheme: [['Argument for', 1], ['Argument against', 1]],
}));
Q('s3_gr_benefits', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three ways in which the Green Revolution helped the Indian economy.',
  model: '1. **Food self-sufficiency:** higher yields of wheat and rice ended dependence on food imports.\n2. **Marketed surplus and buffer stocks:** farmers sold a large part of their output, so the government could build stocks for lean years.\n3. **Lower relative food prices:** larger supplies kept the prices of food grains down compared with other goods, which helped low-income families who spend much of their income on food.',
  sol: 'Three distinct benefits, each linked to the rise in yields.',
  scheme: [['First benefit explained', 1], ['Second benefit explained', 1], ['Third benefit explained', 1]],
}));
Q('l_land_reform', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the main land reforms introduced in India after independence and analyse why their success was limited.',
  model: '1. **Abolition of intermediaries:** zamindars were removed, so tenants came into direct contact with the state.\n2. **Land ceiling:** a maximum holding per owner, with land above it to be given to the landless.\n3. **Tenancy reform:** regulation of rent and security of tenure, encouraging tenants to invest.\n4. **Limits:** big owners used **court cases** and **paper transfers** to relatives to evade the ceiling; some former zamindars kept large areas by claiming self-cultivation; many tenants were evicted.\n5. **Result:** success varied by state; where governments were committed to giving land to the tiller (for example, Kerala and West Bengal) progress was greater, but in most states the poorest gained little.',
  sol: 'Three reforms explained, then reasons for limited success and a judgement.',
  scheme: [['Abolition of intermediaries', 1], ['Land ceiling', 1], ['Tenancy reform', 1], ['Reasons for limited success', 1], ['Judgement on uneven results', 1]],
}));
Q('l_gr_eval', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"The Green Revolution made India self-sufficient in food, but it was not equally good for everyone." Evaluate this statement.',
  model: '1. **Self-sufficiency:** HYV seeds with fertiliser and irrigation raised wheat and rice yields, so India no longer had to import food grains.\n2. **Wider gains:** a large **marketed surplus** allowed **buffer stocks**, and steadier food prices helped poorer households.\n3. **Unequal at first:** the package needed water and money, so early gains went to irrigated, richer regions and to wheat; rain-fed areas and crops such as pulses gained less.\n4. **Risks for small farmers:** costly inputs and pest attacks could ruin them; **cheap credit and subsidies** reduced this risk, so many small farmers also gained.\n5. **Judgement:** the statement is largely valid; the revolution achieved food security, but regional and crop imbalances, and later strain on soil and water, show its gains were uneven.',
  sol: 'Benefits, the inequalities, how policy reduced them, and a balanced verdict.',
  scheme: [['Self-sufficiency explained', 1], ['Other gains (surplus, stocks, prices)', 1], ['Regional and crop inequality', 1], ['Risks for small farmers and policy response', 1], ['Balanced judgement', 1]],
}));

// ================================================================ t03 Industry
Q('m_ipr_a', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under the Industrial Policy Resolution 1956, the **first category** (Schedule A) consisted of industries that',
  opts: [
    'would be exclusively owned by the state',
    'would be left entirely to the private sector',
    'were reserved for small-scale units',
    'were to be closed down',
  ],
  sol: 'The first category was reserved for the state alone; the second had the state setting up new units with private firms supplementing it; the third was left to the private sector under licensing. Reservation for small units was a separate policy.',
}));
Q('m_licence', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under the industrial licensing system of 1950–90, a private firm needed a licence from the government to',
  opts: ['start a new industrial unit or expand its output', 'sell its products in the domestic market', 'pay wages to its workers', 'open a bank account'],
  sol: 'Licences controlled the setting up of new units and increases in capacity, so the state could steer investment into chosen industries and regions. Selling, paying wages or banking needed no industrial licence.',
}));
Q('m_backward', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A licensing officer in the 1960s grants a licence more easily to a factory planned in a backward district and offers it cheaper electricity. Which aim of policy does this serve?',
  opts: ['Promoting regional equality', 'Self-reliance in food', 'Reducing the public sector', 'Raising import duties'],
  sol: 'Easier licences, tax benefits and cheaper power for units in backward regions were meant to spread industry more evenly across regions.',
}));
Q('m_karve', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which committee, set up in 1955, recommended using small-scale industries to promote rural development?',
  opts: ['The Karve Committee (Village and Small-Scale Industries Committee)', 'The Election Commission', 'The Finance Commission', 'The Narasimham Committee on banking'],
  sol: 'The Karve Committee of 1955 saw village and small industries as a way to create jobs and develop rural areas. The banking committee named belongs to the reform years, and the Finance Commission deals with Centre–state finances.',
}));
Q('m_ssi_why', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why were small-scale industries considered especially suitable for India in 1950–90?',
  opts: [
    'They are labour-intensive, so they create more jobs per rupee invested',
    'They always produce at lower cost than large firms',
    'They need large imports of machinery',
    'They are owned by the government',
  ],
  sol: 'Small units use more labour and less capital, which suited a country with many workers and scarce capital. They do not always have lower costs; they usually need simple, local machinery; and most are privately owned.',
}));
Q('m_reserve', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Reserving certain products (for example, some garments and simple household goods) for small-scale units was meant to',
  opts: [
    'protect small units from competition with big firms, which could have driven them out',
    'make the products available only for export',
    'stop small units from growing beyond their size',
    'raise the prices of these products',
  ],
  sol: 'Small firms could not match the scale and resources of big business, so the products were reserved for them. Critics later argued that reservation kept firms small; but the aim was protection.',
}));
Q('m_ps_role', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which was **not** a reason for giving the public sector a leading role in industry in the early plans?',
  opts: [
    'Private industry was eager and able to finance huge projects such as steel plants',
    'Large projects needed more capital than private industrialists had',
    'The market for such goods was too small to attract private investors',
    'Planners wanted the state to control the commanding heights of the economy',
  ],
  sol: 'The reverse was true: industrialists lacked the capital and the market was small, so the state took charge of heavy industry. Control of key sectors was also an aim of planning.',
}));
Q('ar_ps_loss', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'Many public sector enterprises made losses but continued to function.',
  r: 'Public sector enterprises produce goods and services that are useful to the economy as a whole.',
  sol: 'Both are true. A loss-making unit was often kept open because closing it was hard and jobs were at stake, not simply because public enterprises produce useful goods; R does not explain why loss-makers continued.',
}));
Q('ar_licence_abuse', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Industrial licensing was sometimes used by big firms to block competitors.',
  r: 'A firm that already held a licence could apply for more licences in the same industry and so keep new rivals out.',
  sol: 'Both are true, and R explains A: obtaining licences in advance, without necessarily using them, could prevent other firms from entering.',
}));
Q('tf_ssi_def', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A small-scale industry was defined by a ceiling on the investment in its assets, and this ceiling has been raised from time to time.',
  sol: 'The definition was based on the maximum investment allowed in plant and machinery, and the limit was revised upward over the years.',
}));
Q('fb_ipr', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The Industrial Policy Resolution adopted in the year ___ became the basis of the Second Five Year Plan.',
  acc: [['1956']],
  sol: 'The Industrial Policy Resolution of 1956 formed the basis of the Second Plan, which aimed at a socialist pattern of society.',
}));
Q('mt_ipr', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each part of industrial policy (1950–90) with its description.',
  pairs: [
    ['First category of IPR 1956', 'Industries owned only by the state'],
    ['Second category of IPR 1956', 'State sets up new units; private firms supplement'],
    ['Third category of IPR 1956', 'Left to the private sector, under licensing'],
    ['Reservation policy', 'Some products made only by small-scale units'],
  ],
  sol: 'The three categories ranged from exclusive state ownership to private enterprise under licensing; reservation protected small units.',
}));
Q('n_ind_share', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: IND_S2, unit: '%',
  stem: `In an imagined state, industry produced ₹${IND.y2.ind} crore out of a total output of ₹${inr(IND.y2.total)} crore. What is industry's share of output?`,
  sol: `Step 1: Share = industrial output ÷ total output × 100.\nStep 2: ${IND.y2.ind} ÷ ${inr(IND.y2.total)} × 100 = ${IND_S2}%.`,
}));
Q('s_ipr', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the three categories of industries under the Industrial Policy Resolution 1956.',
  model: '1. **Exclusively state-owned** industries.\n2. Industries in which the **state would set up new units**, with the private sector supplementing its effort.\n3. **Remaining industries** left to the **private sector**, which needed licences.',
  sol: 'All three categories correctly described (two marks shared).',
  scheme: [['First category', 0.5], ['Second category', 0.5], ['Third category with licensing', 1]],
}));
Q('s_ssi', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two reasons why the government protected small-scale industries in 1950–90.',
  model: '1. They are **labour-intensive**, so they create more **employment** for the same investment.\n2. They could not **compete** with big firms, so reservation of products and concessions such as **lower excise duty** and **cheaper loans** kept them alive.',
  sol: 'One reason linked to employment and one to their weakness against big firms.',
  scheme: [['Employment reason', 1], ['Protection from competition with an example of support', 1]],
}));
Q('s3_ps_role', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three reasons why the public sector was given a leading role in industrial development after independence.',
  model: '1. **Lack of private capital:** industrialists did not have the huge funds needed for steel, power or heavy machinery.\n2. **Small market:** demand was too low for private firms to expect quick profits from such long-gestation projects.\n3. **Planning goals:** state control of the **commanding heights** let planners direct investment to basic industries and backward regions, serving growth and equity.',
  sol: 'Three distinct reasons, each explained.',
  scheme: [['First reason explained', 1], ['Second reason explained', 1], ['Third reason explained', 1]],
}));
Q('l_industry_eval', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the performance of the industrial sector in India between 1950 and 1990.',
  model: '1. **Diversified base:** industry\'s share of GDP rose substantially; industries grew beyond cotton and jute into steel, machines, chemicals and electronics.\n2. **Small industry:** reservation and support let many **small units** grow and create jobs.\n3. **Weaknesses of the public sector:** many enterprises made **losses** and continued in areas where the state was not needed.\n4. **Costs of licensing:** delays and **permit requirements** discouraged entry, encouraged rent-seeking and blocked competition.\n5. **Judgement:** the period built a broad industrial base and self-reliance, but **inefficiency and lack of competition** made reform necessary by 1991.',
  sol: 'Two strengths, two weaknesses and a reasoned judgement.',
  scheme: [['First strength', 1], ['Second strength', 1], ['Weakness of the public sector', 1], ['Weakness of licensing', 1], ['Balanced judgement', 1]],
}));

// ================================================================ t04 Trade policy
Q('m_isub', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'The trade policy of import substitution aimed to',
  opts: ['replace imports with goods produced at home', 'replace domestic goods with imports', 'export all raw materials', 'remove every tax on imports'],
  sol: 'Import substitution meant producing at home the goods that were earlier imported, behind protection from foreign competition.',
}));
Q('m_tariff', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A **tariff** protects domestic industry by',
  opts: [
    'raising the price of imported goods through a tax on them',
    'fixing the exact quantity of goods that can be imported',
    'lowering the price of imported goods',
    'paying exporters a bonus',
  ],
  sol: 'A tariff is a tax on imports; it makes imported goods dearer. Fixing quantities describes a quota.',
}));
Q('m_quota', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined rule of the 1970s says that no more than 500 sewing machines may be imported in a year. This is an example of',
  opts: ['an import quota', 'an import tariff', 'a subsidy on exports', 'a land ceiling'],
  sol: 'A limit on the quantity of imports is a quota; a tariff is a tax on imports.',
}));
Q('m_infant', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'The **infant industry** argument for protection says that',
  opts: [
    'young domestic industries need protection until they grow strong enough to compete with established foreign firms',
    'industries making goods for children should be protected',
    'protection should be permanent for all industries',
    'all imports harm consumers',
  ],
  sol: 'Like a child, a young industry needs care until it matures; once it can compete, protection should be removed. The argument is about new industries, not children\'s goods, and it does not justify permanent protection.',
}));
Q('m_isub_effect', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Which was a criticism of prolonged protection under import substitution?',
  opts: [
    'Protected firms faced little competition, so many continued to produce poor-quality goods at high cost',
    'Indian firms became too efficient to need any protection',
    'India stopped making any capital goods',
    'Imports of every kind rose sharply',
  ],
  sol: 'Shielded from foreign rivals, many firms had little incentive to improve quality or reduce costs. Protection actually helped capital goods industries grow and reduced imports.',
}));
Q('ar_isub', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'Import substitution helped India develop many industries that it earlier lacked.',
  r: 'Protection from foreign competition gave domestic firms a market in which to grow.',
  sol: 'Both are true, and R explains A: with imports restricted, domestic producers had an assured market, so industries such as machine tools and electronics could develop.',
}));
Q('ar_exports', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'The inward-looking trade policy of 1950–90 gave strong encouragement to exports.',
  r: 'An inward-looking policy concentrates on producing for the domestic market.',
  sol: 'A is false: the focus on replacing imports meant exports received little attention, and India\'s share in world trade stayed low. R is true.',
}));
Q('tf_tariff_quota', tf({
  t: 4, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? A quota is a tax on imported goods, while a tariff limits the quantity of imports.',
  sol: 'The definitions are reversed: a tariff is a tax on imports and a quota limits their quantity.',
}));
Q('n_tariff', num({
  t: 4, d: 3, c: 'application', marks: 2, value: TAR_LANDED, unit: '₹',
  stem: `An imagined Indian firm in 1975 wants a machine that costs ₹${inr(TAR.import)} abroad. A tariff of ${TAR.rate}% is charged on it. What is the price of the imported machine after the tariff (in ₹)?`,
  sol: `Step 1: Tariff = ${TAR.rate}% of ₹${inr(TAR.import)} = ₹${inr(TAR_DUTY)}.\nStep 2: Price after tariff = ${inr(TAR.import)} + ${inr(TAR_DUTY)} = ₹${inr(TAR_LANDED)}.`,
  scheme: [['Tariff amount', 1], [`Price ₹${inr(TAR_LANDED)}`, 1]],
}));
Q('n_quota', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: QUO_DOM, unit: 'units',
  stem: `Demand for an imagined good in a year is ${inr(QUO.demand)} units and imports are limited by a quota of ${inr(QUO.quota)} units. How many units must domestic producers supply to meet demand?`,
  sol: `Domestic supply needed = ${inr(QUO.demand)} − ${inr(QUO.quota)} = ${inr(QUO_DOM)} units.`,
}));
Q('s_tariff_quota', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between a tariff and a quota as tools of protection.',
  model: '1. A **tariff** is a **tax on imported goods**; it makes them **costlier**, so buyers turn to domestic goods.\n2. A **quota** fixes the **maximum quantity** of a good that can be imported, so only that amount can enter, whatever its price.',
  sol: 'One point for each tool, showing how it protects.',
  scheme: [['Tariff explained', 1], ['Quota explained', 1]],
}));
Q('s3_isub_effects', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Analyse three effects of the import substitution policy on Indian industry.',
  model: '1. **Growth of new industries:** protected markets let India build industries such as machine tools, chemicals and electronics, reducing dependence on imports.\n2. **Inefficiency:** without foreign competition, many firms had little reason to cut costs or improve quality.\n3. **Weak exports:** attention to the home market meant exports grew slowly, so earnings of foreign exchange stayed limited.',
  sol: 'One positive and two negative (or two positive and one negative) effects, each explained.',
  scheme: [['First effect explained', 1], ['Second effect explained', 1], ['Third effect explained', 1]],
}));
Q('l_isub', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'What was import substitution? Why did India adopt it, and what were its consequences?',
  model: '1. **Meaning:** producing at home goods that were earlier imported, an **inward-looking** trade strategy.\n2. **Tools:** **tariffs** made imports dearer and **quotas** limited their quantity.\n3. **Why:** planners feared that young Indian industries could not compete with advanced foreign firms (the **infant industry** argument) and wanted to save foreign exchange.\n4. **Gains:** domestic industry grew in many new areas and dependence on imports fell.\n5. **Costs:** protected firms faced little **competition**, so many produced **poor-quality goods at high cost**; exports grew slowly, which later contributed to the pressure for reform.',
  sol: 'Meaning, tools, reasons, gains and costs.',
  scheme: [['Meaning', 1], ['Tools: tariffs and quotas', 1], ['Reasons for adoption', 1], ['Gains', 1], ['Costs', 1]],
}));
Q('l_appraisal', long({
  t: [1, 3], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Critically appraise the overall economic record of India from 1950 to 1990. Why did many economists argue that change was needed by 1991?',
  model: '1. **Achievements:** a broad **industrial base**, including capital goods, and **food self-sufficiency** after the Green Revolution.\n2. **Equity measures:** land reforms in some states, support for **small industry** and public investment in basic sectors.\n3. **Shortcomings:** many **public sector units** were loss-making; the **licence-permit system** caused delays and discouraged enterprise.\n4. **Trade:** prolonged protection reduced competition, so quality and efficiency suffered, and exports stayed weak.\n5. **Need for change:** by 1990 these problems, along with slow growth of jobs outside agriculture, led many economists to argue for more competition and a smaller role for controls; others stressed protecting the gains in self-reliance and equity.',
  sol: 'Balanced appraisal: achievements, shortcomings and the debate on reform.',
  scheme: [['Achievements', 1], ['Equity measures', 1], ['Shortcomings in industry', 1], ['Shortcomings in trade', 1], ['Reasoned conclusion on the need for change', 1]],
}));

// ================================================================ case-based
Q('cb_village', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the passage and the table, and answer the questions that follow. *(Imagined village and figures, written by SOYL for practice.)*',
  passage: `**Ramgarh village (imagined), 1972**\n\nFive years after HYV wheat seeds reached Ramgarh, the village panchayat recorded the harvest of two families. The Sandhus own a large irrigated farm and a tube well; the Mehras farm a small plot and depend partly on a canal that runs dry in some months. Both bought seeds and fertiliser with a low-interest loan from a new branch of a nationalised bank.\n\n| Family | Wheat harvested (quintals) | Kept for the family (quintals) |\n|---|---|---|\n| Sandhu | ${GRV.big.output} | ${GRV.big.kept} |\n| Mehra | ${GRV.small.output} | ${GRV.small.kept} |`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: GRV_BIG, unit: '%', stem: 'What percentage of the Sandhu family\'s harvest is marketed surplus?', sol: `Step 1: Sold = ${GRV.big.output} − ${GRV.big.kept} = ${GRV.big.output - GRV.big.kept} quintals.\nStep 2: ${GRV.big.output - GRV.big.kept} ÷ ${GRV.big.output} × 100 = ${GRV_BIG}%.` })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: GRV_SMALL, unit: '%', stem: 'What percentage of the Mehra family\'s harvest is marketed surplus?', sol: `Step 1: Sold = ${GRV.small.output} − ${GRV.small.kept} = ${GRV.small.output - GRV.small.kept} quintals.\nStep 2: ${GRV.small.output - GRV.small.kept} ÷ ${GRV.small.output} × 100 = ${GRV_SMALL}%.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Using the passage, explain why the two families gained unequally from the new technology.', model: 'The HYV package needs **assured water** and **costly inputs**. The Sandhus have a **tube well** and a large farm, so their output and surplus are high; the Mehras depend on an **unreliable canal** and a small plot, so they gain much less.', sol: 'Link the difference in irrigation and farm size to the difference in gains.', scheme: [['Inputs and water needed by HYV seeds', 1], ['Applied to the two families', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): How did the bank loan help a small farmer like Mehra, and what risk still remained?', model: 'The **low-interest loan** let the Mehras buy HYV seeds and fertiliser they could not otherwise afford. The **risk** remained that a **pest attack** or a dry canal could ruin the crop and leave them in debt.', sol: 'One benefit of cheap credit and one remaining risk.', scheme: [['Benefit of cheap credit', 1], ['A remaining risk', 1]] }),
    ]),
  ],
}));
Q('cb_permit', caseQ({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Illustrative account written by SOYL for practice; the firm and people are imagined.)*',
  passage: `**From the diary of an imagined scooter maker, Pune, 1978**\n\nOur application to expand the plant has now waited fourteen months in Delhi. Meanwhile buyers book a scooter and wait years for delivery, because imports of scooters are not allowed and only a few firms hold licences. My engineers say our workers produce about ${SCO.home} scooters each in a year, while a visiting buyer told us a factory abroad gets about ${SCO.world} per worker. We can sell everything we make, so there is little pressure to change our old design.`,
  parts: [
    child('a', short({ t: 4, d: 1, c: 'understanding', marks: 1, stem: 'Name the trade policy that explains why scooters were not imported.', model: '**Import substitution** (protection through bans, quotas and tariffs).', sol: 'Restricting imports so that domestic firms supply the market is import substitution.', scheme: [['Import substitution', 1]] })),
    child('b', num({ t: 3, d: 2, c: 'understanding', marks: 1, value: SCO_RATIO, unit: 'times', stem: 'How many times as many scooters per worker does the factory abroad produce?', sol: `Ratio = ${SCO.world} ÷ ${SCO.home} = ${SCO_RATIO} times.` })),
    child('c', short({ t: [3, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two features of policy in 1950–90 shown in the diary and explain their effect.', model: '1. **Licensing:** the firm waits over a year to expand, so supply stays short and buyers wait.\n2. **Protection:** with no imports and few rivals, the firm sells all it makes and has **no incentive** to improve its design or productivity.', sol: 'Licensing and protection, each with its effect on the firm.', scheme: [['Licensing and its effect', 1], ['Protection and its effect', 1]] }), [
      short({ t: [3, 4], d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two changes in policy that could make the firm more efficient, with a reason for each.', model: '1. **Ease licensing**, so firms can expand and new rivals can enter, which pushes prices down and output up.\n2. **Gradually reduce protection**, so foreign competition forces the firm to improve its **design and productivity**.', sol: 'Two policy changes, each with how it raises efficiency.', scheme: [['First change with reason', 1], ['Second change with reason', 1]] }),
    ]),
  ],
}));
Q('cb_plans', caseQ({
  t: [1, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined state and figures, written by SOYL for practice.)*',
  passage: `**Output of the imagined state of Vindhyapur (₹ crore)**\n\n| Year | Industry | Total output |\n|---|---|---|\n| 1955 | ${IND.y1.ind} | ${IND.y1.total} |\n| 1985 | ${IND.y2.ind} | ${inr(IND.y2.total)} |\n\nOver these years the state government set up a public sector fertiliser plant and a power station, licensed two private textile mills in a backward district, and supported several hundred small workshops making tools and utensils.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'understanding', marks: 1, value: IND_S1, unit: '%', stem: 'What was industry\'s share of total output in 1955?', sol: `${IND.y1.ind} ÷ ${IND.y1.total} × 100 = ${IND_S1}%.` })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: `Industry's share in 1985 was ${IND_S2} per cent. State what this change shows about industrial development in the state.`, model: `The share rose from **${IND_S1}%** to **${IND_S2}%**, so industry **grew faster than the rest of the economy**: the state became more industrialised.`, sol: 'Compare the two shares and draw the conclusion.', scheme: [['Comparison and conclusion', 1]] })),
    child('c', short({ t: [1, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which two plan goals are served by licensing mills in a backward district and supporting small workshops? Explain.', model: '1. **Equity:** placing mills in a **backward district** spreads income and jobs to poorer regions.\n2. **Equity through employment / growth:** small **labour-intensive** workshops create many jobs and add to output.', sol: 'Name the goals and link each to the policy step.', scheme: [['Licensing in backward districts linked to a goal', 1], ['Small workshops linked to a goal', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one argument for and one against the state running the fertiliser plant itself.', model: '**For:** the plant needed large capital and served farmers across the state, so the state could invest where private firms would not. **Against:** a state plant may face little pressure to cut costs and may run at a **loss**, which burdens the budget.', sol: 'One argument on each side.', scheme: [['Argument for', 1], ['Argument against', 1]] }),
    ]),
  ],
}));
