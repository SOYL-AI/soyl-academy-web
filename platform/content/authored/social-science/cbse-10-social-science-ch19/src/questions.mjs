// CBSE 10 Social Science, ch19 Sectors of the Indian Economy — question bank. Every scenario, table
// and source is written by SOYL (imagined people, places and figures); no NCERT exercise, boxed source
// or board-paper item is reused. Real-world facts are limited to stable ones (definitions, MGNREGA 2005
// provisions, the broad sector pattern of India's output and employment).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, source, caseQ, child } from './lib.mjs';

const S2 = [25, 40];
const S3 = [40, 60];
const L5 = [100, 120];

// ================================================================ t01 Primary, secondary and tertiary sectors
Q('m_mushroom', mcq({
  t: 1, d: 1, c: 'application',
  stem: 'Kavita grows mushrooms in a shed on her farm near Solan and sells them at the weekly market. **Growing** the mushrooms belongs to which sector?',
  opts: ['Primary sector', 'Secondary sector', 'Tertiary sector', 'Public sector'],
  sol: 'Growing a crop uses natural resources directly (soil, water, organic matter), so it is a primary activity. Selling at the market is trade (tertiary), but the question asks about growing. "Public sector" is about ownership, not the type of activity.',
}));
Q('m_paneer', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which one of the following is a **secondary**-sector activity?',
  opts: [
    'A cooperative dairy turning milk into paneer and ghee',
    'A fisherman catching pomfret off the Konkan coast',
    'A truck carrying milk cans from villages to the dairy',
    'A veterinary doctor treating a sick cow',
  ],
  sol: 'The secondary sector changes a natural product into another form by manufacturing: milk becomes paneer and ghee. Fishing is primary; transporting and treating animals are services (tertiary).',
}));
Q('m_service_name', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Why is the tertiary sector also called the **service sector**?',
  opts: [
    'Its activities do not make a good themselves but provide services that support production and people\'s needs',
    'It produces goods by using natural resources directly',
    'It converts raw materials into finished goods in factories',
    'It is owned and run only by the government',
  ],
  sol: 'Transport, banking, trade, teaching and health care produce services, not goods. Using natural resources directly describes the primary sector, manufacturing the secondary sector, and ownership has nothing to do with this classification.',
}));
Q('m_drought_chain', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A drought sharply reduces the cotton crop in an imagined district of Gujarat. Which is the most likely chain of effects?',
  opts: [
    'Textile mills get less raw cotton, and the transporters and traders who move and sell cotton earn less',
    'Only cotton farmers lose; the secondary and tertiary sectors are not affected',
    'Textile mills produce more cloth because there is less cotton to buy',
    'Banks gain because farmers stop borrowing from them',
  ],
  sol: 'The sectors are interdependent: a shortfall in the primary sector (cotton) reduces raw material for the secondary sector (mills) and business for the tertiary sector (transport, trade, banking). The other options ignore or reverse these links.',
}));
Q('m_also_called', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Because most natural products come from farming, dairy, fishing and forestry, the primary sector is also called the',
  opts: ['agriculture and related sector', 'industrial sector', 'service sector', 'unorganised sector'],
  sol: 'The primary sector is also called the agriculture and related sector. The industrial sector is another name for the secondary sector, and the service sector for the tertiary sector; "unorganised" is a different classification (conditions of work).',
}));
Q('m_not_tertiary', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of the following is **NOT** a tertiary-sector activity?',
  opts: [
    'A carpenter making tables in his workshop',
    'A courier delivering parcels in Jaipur',
    'A bank clerk opening savings accounts',
    'A teacher taking online classes',
  ],
  sol: 'Making tables turns wood into furniture, which is manufacturing (secondary). Courier delivery, banking and teaching are services (tertiary).',
}));
Q('m_basis', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'On what basis are economic activities divided into the primary, secondary and tertiary sectors?',
  opts: [
    'The nature of the activity: using natural resources, manufacturing, or providing services',
    'Who owns the enterprise: the government or private persons',
    'Whether jobs are regular and protected by law',
    'The number of workers each enterprise employs',
  ],
  sol: 'The three-sector classification is based on the **nature of the activity**. Ownership is the basis of the public–private classification; job conditions are the basis of the organised–unorganised classification.',
}));
Q('ar_support', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Tertiary activities help the development of the primary and secondary sectors.',
  r: 'Goods produced in the primary and secondary sectors need transport, storage, banking and trade to reach buyers.',
  sol: 'Both statements are true, and R explains A: without services such as transport, storage, credit and trade, farm and factory goods could not reach buyers, so these sectors could not grow.',
}));
Q('tf_potter', tf({
  t: 1, d: 1, c: 'application', ans: true,
  stem: 'True or false? A potter shaping and baking clay pots in her courtyard is engaged in a secondary-sector activity.',
  sol: 'Clay (a natural product) is changed into pots by a manufacturing process, so this is a secondary activity, even though it is done at home and not in a factory.',
}));
Q('fb_secondary', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Activities in which natural products are changed into other forms through manufacturing belong to the ___ sector.',
  acc: [['secondary', 'industrial']],
  sol: 'Manufacturing activities form the secondary (industrial) sector.',
}));
Q('mt_rice', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each person in an imagined rice-growing village of Andhra Pradesh with the sector of their work.',
  pairs: [
    ['A farmer transplanting paddy seedlings', 'Primary sector'],
    ['A rice mill removing husk and polishing grain', 'Secondary sector'],
    ['A wholesaler who buys rice and sells it to city shops', 'Tertiary sector: trade'],
    ['A rural bank that gives the farmer a crop loan', 'Tertiary sector: finance'],
  ],
  sol: 'Growing paddy uses natural resources (primary); milling changes paddy into rice (secondary); buying and selling is trade, and lending is a banking service (both tertiary).',
}));
Q('s_prim_sec', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the primary and secondary sectors, giving one example of each.',
  model: '1. The **primary sector** produces goods by using **natural resources directly**, e.g. growing wheat or catching fish.\n2. The **secondary sector** changes natural products into **other forms by manufacturing**, e.g. a mill turning sugarcane into sugar.',
  sol: 'Define each sector by the nature of its activity and add one clear example to each.',
  scheme: [['Primary sector defined with an example', 1], ['Secondary sector defined with an example', 1]],
}));
Q('s_tert_supports', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Show with an example how the tertiary sector supports the primary sector.',
  model: 'A mango grower in Ratnagiri needs **trucks** to send fruit to Mumbai, **cold storage** to keep it fresh and a **bank loan** to buy fertiliser. These **services** (transport, storage, credit) let the farmer produce and sell more.',
  sol: 'Pick a primary activity and name two or three services it depends on, then say how they help it grow.',
  scheme: [['A primary activity with the services it uses', 1], ['How the services help it produce or sell more', 1]],
}));
Q('s3_interdependent', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: '"The three sectors of the economy are interdependent." Explain with the help of an example.',
  model: '1. **Primary depends on secondary and tertiary:** a sugarcane farmer in Uttar Pradesh sells cane to a **sugar mill** and needs **transport and credit**.\n2. **Secondary depends on primary:** the mill cannot run without **cane** as raw material.\n3. **Tertiary depends on both:** truckers, traders and banks earn by moving, selling and financing **cane and sugar**. If the cane crop fails, all three sectors suffer.',
  sol: 'Trace one product through all three sectors and show the dependence in each direction; end with what happens if one link breaks.',
  scheme: [['Dependence of the primary sector on the others', 1], ['Dependence of the secondary sector on the primary', 1], ['Dependence of the tertiary sector, with the effect of a break in the chain', 1]],
}));

// ================================================================ t02 Comparing the sectors; GDP; employment; disguised unemployment
Q('m_gdp_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The Gross Domestic Product (GDP) of a country is the value of',
  opts: [
    'all final goods and services produced within the country during a particular year',
    'all goods and services, including intermediate goods, produced in a year',
    'all goods that the country exports during a year',
    'all goods and services produced by its citizens anywhere in the world',
  ],
  sol: 'GDP counts only **final** goods and services produced **within the country** in a year. Including intermediate goods would double count; exports are only a part of output; and output of citizens abroad is not produced within the country.',
}));
Q('m_intermediate', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A factory in Meerut makes cricket bats. Which of the following is an **intermediate** good?',
  opts: [
    'Willow wood bought by the factory to make the bats',
    'A finished bat bought by a young player',
    'A set of bats bought by a school for its team',
    'A bat-repair service bought by a club player',
  ],
  sol: 'Willow wood is used up in making the final good (the bat), so it is intermediate. Bats bought by users and a repair service bought by a player are final goods and services.',
}));
Q('m_double', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why is the value of intermediate goods **not** added separately when GDP is calculated?',
  opts: [
    'Their value is already included in the value of the final goods, so adding it again would count it twice',
    'Intermediate goods are not produced within the country',
    'Intermediate goods have no market value',
    'Only services, not goods, are counted in GDP',
  ],
  sol: 'The price of a final good already covers the raw materials used in it. Adding them again would be double counting. Intermediate goods do have value and may be made in the country; GDP counts both goods and services.',
}));
Q('m_largest_output', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In India today, which sector contributes the **largest share of GDP**?',
  opts: ['Tertiary sector', 'Primary sector', 'Secondary sector', 'All three contribute about equally'],
  sol: 'Over the past decades the tertiary sector has become the largest producing sector and now contributes more than half of India\'s GDP; the primary sector\'s share has fallen below one-fifth.',
}));
Q('m_largest_jobs', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which sector still provides work to the **largest share of India\'s workers**?',
  opts: ['Primary sector', 'Secondary sector', 'Tertiary sector', 'Public sector'],
  sol: 'Although its share of output has fallen, the primary sector (mainly agriculture) still employs the largest share of workers, a little under half. The public sector is an ownership category, not one of the three sectors.',
}));
Q('m_disguised_scene', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which situation best shows **disguised unemployment**?',
  opts: [
    'Five brothers work on a small family plot that needs only two workers; output would not fall if three left',
    'A graduate has applied for many jobs but has no work at all',
    'A factory worker loses his job when the factory closes down',
    'A woman works in a government office for eight hours a day with paid leave',
  ],
  sol: 'In disguised unemployment people **seem** to be working, but some are not needed: removing them does not reduce output. Having no work at all is open unemployment, losing a job when a factory closes is job loss, and the office worker is fully employed.',
}));
Q('m_not_reason', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of the following is **NOT** a reason for the growing importance of the tertiary sector in India?',
  opts: [
    'The primary sector has stopped producing goods',
    'Rising incomes increase demand for services such as eating out, tourism and private hospitals',
    'Growth of farming and industry needs more transport, storage and trade',
    'New services based on information and communication technology have grown fast',
  ],
  sol: 'The primary sector still produces large quantities of goods; only its **share** of GDP has fallen. The other three are genuine reasons: demand from rising incomes, support services for other sectors, and new IT-based services.',
}));
Q('m_history', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the history of today\'s developed countries, which sector became the most important **after** the primary sector?',
  opts: ['Secondary sector', 'Tertiary sector', 'Public sector', 'Unorganised sector'],
  sol: 'As new methods of production spread, factories grew and manufacturing (the secondary sector) became the most important; only later did services take over. Public and unorganised are other classifications.',
}));
Q('m_statements', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Read the statements about India.\n\nI. The tertiary sector\'s share of GDP has risen over the decades.\nII. The tertiary sector\'s share of employment has risen just as much as its share of GDP.\nIII. The primary sector still employs the largest share of workers.\n\nWhich of these are correct?',
  opts: ['I and III only', 'I and II only', 'II and III only', 'I, II and III'],
  sol: 'Statement I is correct. Statement II is wrong: the tertiary sector\'s share of jobs has grown much less than its share of output. Statement III is correct. So only I and III.',
}));
Q('ar_lowpaid', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'The share of the tertiary sector in India\'s GDP has risen.',
  r: 'The tertiary sector also includes many low-paid workers such as small shopkeepers, street vendors and repair persons.',
  sol: 'Both are true. But R does not explain why the share of the sector in GDP has risen (rising demand for services, support for other sectors and new IT services do). R is a separate fact about who works in the sector.',
}));
Q('ar_disguised', ar({
  t: 2, d: 2, c: 'analysis', key: 'c',
  a: 'In disguised unemployment, people appear to be employed.',
  r: 'Removing the extra workers in disguised unemployment reduces total output sharply.',
  sol: 'A is true: all members seem busy on the farm. R is false: the defining feature is that output does **not** fall when the extra workers are removed.',
}));
Q('ar_final', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'GDP counts only final goods and services.',
  r: 'Counting intermediate goods separately would lead to double counting.',
  sol: 'Both are true, and R is the reason for A: the value of the final good already includes the inputs.',
}));
Q('tf_gdp_inter', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The value of the flour bought by a bakery is added to GDP separately from the value of the bread it sells.',
  sol: 'Flour used by the bakery is an intermediate good. Its value is already inside the price of the bread, so adding it separately would count it twice.',
}));
Q('fb_gdp', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The value of all final goods and services produced within a country during a particular year is called its ___.',
  acc: [['Gross Domestic Product', 'GDP', 'gross domestic product (GDP)']],
  sol: 'This is the definition of Gross Domestic Product (GDP).',
}));
Q('fb_disguised', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'When more people are working on a task than are actually needed, so that some could leave without any fall in output, the situation is called ___ unemployment.',
  acc: [['disguised', 'hidden']],
  sol: 'This is disguised (hidden) unemployment: the surplus workers look employed.',
}));
Q('ord_history', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the stages through which the most important sector changed in today\'s developed countries, from earliest to latest.',
  items: [
    'Most people farm, herd animals and fish',
    'Better farming methods produce surplus food, so some people take up crafts and trade',
    'Factories spread and manufacturing becomes the most important activity',
    'Services become the largest producer and the largest employer',
  ],
  sol: 'Primary activities came first; surplus food freed people for crafts and trade; industrialisation made the secondary sector most important; finally the tertiary sector took the lead.',
}));
Q('mt_concepts', match({
  t: [2, 3], d: 2, c: 'application',
  stem: 'Match each idea with the example that illustrates it.',
  pairs: [
    ['Gross Domestic Product', 'The total value of all final goods and services produced in India in 2025–26'],
    ['Intermediate good', 'Cement bought by a builder to construct a house'],
    ['Disguised unemployment', 'Six members of a family working on a plot that needs three'],
    ['MGNREGA 2005', 'A rural household demanding 100 days of paid manual work in a year'],
  ],
  sol: 'GDP is the value of final output of a year; cement used by a builder is used up in making the house; six workers where three are enough shows hidden surplus labour; the right to 100 days of work for rural households comes from MGNREGA 2005.',
}));
Q('n_bread', num({
  t: 2, d: 2, c: 'application', marks: 2, value: 2000, unit: '₹',
  stem: 'In an imagined chain, a farmer sells wheat worth ₹800 to a flour mill. The mill sells the flour for ₹1,200 to a bakery. The bakery sells bread worth ₹2,000 to consumers. By how much does this chain add to GDP (in ₹)?',
  sol: 'Step 1: Only the final good, the bread sold to consumers, is counted: ₹2,000.\nStep 2: Check by value added: farmer ₹800 + mill (1,200 − 800) ₹400 + bakery (2,000 − 1,200) ₹800 = ₹2,000.\nStep 3: Adding 800 + 1,200 + 2,000 = ₹4,000 would count the wheat and flour twice. Answer: ₹2,000.',
  scheme: [['Counts only the final good (or adds value added at each stage)', 1], ['₹2,000', 1]],
}));
Q('n_family', num({
  t: 2, d: 2, c: 'application', marks: 1, value: 3, unit: 'persons',
  stem: 'In an imagined family in Bihar, seven members work on their 2-hectare farm. An agriculture officer finds that four of them could produce exactly the same output. How many members are disguisedly unemployed?',
  sol: 'Step 1: Workers needed for the same output = 4.\nStep 2: Surplus workers = 7 − 4 = 3.\nStep 3: These 3 members look busy but add nothing to output, so 3 are disguisedly unemployed.',
}));
Q('n_share', num({
  t: 2, d: 3, c: 'application', marks: 2, value: 54, unit: '%',
  stem: 'An imagined country\'s GDP in a year is ₹50 lakh crore, of which the tertiary sector produces ₹27 lakh crore. What is the tertiary sector\'s share of GDP, in per cent?',
  sol: 'Step 1: Share = (tertiary output ÷ GDP) × 100.\nStep 2: (27 ÷ 50) × 100 = 0.54 × 100 = 54.\nStep 3: The tertiary sector produces 54% of GDP, more than half.',
  scheme: [['Correct method (share = part ÷ total × 100)', 1], ['54%', 1]],
}));
Q('s_final_goods', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are final goods? Why does GDP count only final goods and services?',
  model: '1. **Final goods** reach the **consumer** and are not used up in making other goods, e.g. a bicycle bought by a student.\n2. Their price already **includes the value of intermediate goods**, so counting both would be **double counting**.',
  sol: 'Define final goods with an example, then give the double-counting reason.',
  scheme: [['Meaning of final goods with an example', 1], ['Double-counting reason', 1]],
}));
Q('s_disguised', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain disguised unemployment with an example from rural India.',
  model: '1. In **disguised unemployment** more people work on a task than are needed, so they **appear employed**.\n2. E.g., six members of a family in Odisha work on a small plot that needs three; if three leave, **output does not fall**.',
  sol: 'Give the meaning (surplus workers who appear employed) and an example where removing them leaves output unchanged.',
  scheme: [['Meaning of disguised unemployment', 1], ['Rural example showing output unchanged', 1]],
}));
Q('s_underemp_city', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two examples of underemployment in towns and cities.',
  model: '1. **Casual workers** such as painters and plumbers in a city find paid work only on **some days** of the week.\n2. A **street vendor** spends the whole day at her cart but earns little because she has **too few customers** for her time.',
  sol: 'Each example must show people working below their capacity (few days of work, or long hours with very little output or income).',
  scheme: [['First urban example of working below capacity', 1], ['Second urban example', 1]],
}));
Q('s3_tertiary_reasons', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three reasons why the tertiary sector has become the largest producing sector in India.',
  model: '1. **Basic services**: a country needs hospitals, schools, post offices, police, courts and banks, which are mainly services.\n2. **Support for other sectors**: growth of farming and industry needs **transport, storage, trade and credit**.\n3. **Rising incomes and new technology**: richer people demand eating out, tourism and private schools, and **IT-based services** have grown fast.',
  sol: 'Three distinct reasons, each linked to more demand for services: basic public services, services that support other sectors, and demand from higher incomes plus IT.',
  scheme: [['Basic services', 1], ['Support for primary and secondary sectors', 1], ['Rising incomes or new IT-based services', 1]],
}));
Q('s3_uneven_tertiary', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Not every part of the tertiary sector is growing equally. Explain this statement.',
  model: '1. **High-skill services** such as software, finance and telecom have grown fast and employ well-educated, well-paid workers.\n2. A large number of tertiary workers are **small shopkeepers, vendors, repair persons and transport workers** who earn little and have no job security.\n3. They are in services only because there are **no better jobs**; so the sector\'s growth has not improved everyone\'s life.',
  sol: 'Contrast the fast-growing modern services with the many low-paid, insecure service workers, and draw the conclusion.',
  scheme: [['Fast-growing high-skill services', 1], ['Many low-paid, insecure service workers', 1], ['Conclusion: growth is uneven', 1]],
}));
Q('s3_jobs_lag', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The tertiary sector produces more than half of India\'s GDP, but it employs less than a third of the workers. What problem does this show, and why has it happened?',
  model: '1. Jobs have **not shifted** out of agriculture as fast as **production** has; more than two-fifths of workers still depend on the primary sector.\n2. The secondary and tertiary sectors have **not created enough jobs**, and many new service jobs need **skills and education**.\n3. So many farm workers remain **underemployed**, with low incomes.',
  sol: 'Compare the shares of output and employment, explain why jobs lag (too few jobs created, skill needs), and state the result (underemployment in agriculture).',
  scheme: [['Mismatch of output and employment shares identified', 1], ['Reason: too few or skill-demanding jobs created', 1], ['Result: underemployment in the primary sector', 1]],
}));
Q('l_history_india', long({
  t: [1, 2], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe how the importance of the three sectors has changed over time in developed countries. How is India\'s experience similar and how is it different?',
  model: '1. **Early stage:** in today\'s developed countries most people worked in the **primary sector**: farming, herding and fishing.\n2. **Industrial stage:** better farming freed workers; with new methods, **factories** spread and the **secondary sector** became most important in output and jobs.\n3. **Service stage:** over the last century the **tertiary sector** became the largest in both **production and employment**.\n4. **India — similar:** our **output** has also shifted; the tertiary sector now produces **more than half of GDP**, and the primary sector less than a fifth.\n5. **India — different:** **jobs have not shifted** as much; the primary sector still employs the **largest share** of workers, so many remain underemployed.',
  sol: 'Three stages for developed countries, then one similarity (output) and one difference (employment) for India.',
  scheme: [['Primary stage', 1], ['Secondary stage', 1], ['Tertiary stage in output and employment', 1], ['India: similar shift in output', 1], ['India: employment has not shifted', 1]],
}));
Q('l_disguised', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'What is disguised unemployment? Why is it common in Indian agriculture? Suggest ways to reduce it.',
  model: '1. **Meaning:** more people work on a task than needed; they **appear employed**, but if some leave, **output does not fall**.\n2. **Why common:** most farm families own **small plots**, and members have **no other work nearby**, so all of them work on the family land.\n3. **Why common (2):** the secondary and tertiary sectors have **not created enough jobs** in rural areas.\n4. **Remedy — farm side:** **irrigation** and better seeds allow a second crop, so more labour is truly needed.\n5. **Remedy — off-farm jobs:** **food-processing units**, cold storage, rural roads, tourism and **MGNREGA** works give surplus workers paid work.',
  sol: 'Meaning, two reasons it is widespread in agriculture, and two kinds of remedies (more farm work; non-farm work).',
  scheme: [['Meaning', 1], ['Reason: small plots, no other work', 1], ['Reason: other sectors have not created enough jobs', 1], ['Remedy: irrigation or a second crop', 1], ['Remedy: rural non-farm jobs', 1]],
}));
Q('l_data_ranipur', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Study the table of an **imagined state, Ranipur**, and answer: compare the changes in each sector\'s share of output and of employment between 2000 and 2025, explain what the figures show, and suggest one way to deal with the problem they reveal.\n\n| Sector | Share of state output, 2000 (%) | Share of state output, 2025 (%) | Share of workers, 2000 (%) | Share of workers, 2025 (%) |\n|---|---|---|---|---|\n| Primary | 38 | 17 | 62 | 47 |\n| Secondary | 24 | 29 | 15 | 24 |\n| Tertiary | 38 | 54 | 23 | 29 |\n\n*(Imagined figures written by SOYL for practice.)*',
  model: '1. **Output:** the primary share **fell from 38% to 17%**, while the tertiary share **rose from 38% to 54%**, now more than half.\n2. **Employment:** the primary share of workers fell **only from 62% to 47%**; the tertiary share rose **only from 23% to 29%**.\n3. **Meaning:** in 2025, **47% of workers produce only 17% of output** in the primary sector, so output per worker there is very low.\n4. This shows **disguised unemployment and underemployment** in agriculture: jobs have **not shifted** as fast as production.\n5. **Suggestion:** create **rural non-farm jobs**, e.g. food-processing units and cold storage near farms, with skill training.',
  sol: 'Read both pairs of columns, compare changes (38 → 17 and 38 → 54 for output; 62 → 47 and 23 → 29 for workers), divide the reading into what fell and what rose, interpret the low output per worker, and give one remedy.',
  scheme: [['Change in output shares with figures', 1], ['Change in employment shares with figures', 1], ['Interpretation: low output per worker in the primary sector', 1], ['Names the problem: disguised unemployment / underemployment', 1], ['One suitable remedy', 1]],
}));

// ================================================================ t03 Creating more employment; MGNREGA
Q('m_mgnrega_days', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Under MGNREGA 2005, how many days of wage employment in a year are guaranteed to a rural household whose adult members ask for work?',
  opts: ['100 days', '50 days', '200 days', '365 days'],
  sol: 'The Act guarantees 100 days of unskilled manual work in a financial year to every rural household that demands it.',
}));
Q('m_allowance', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under MGNREGA, if the government fails to provide work within 15 days of an application, the applicant',
  opts: [
    'is entitled to an unemployment allowance',
    'loses the right to apply again that year',
    'must find work in the private sector',
    'is given a permanent government job',
  ],
  sol: 'The guarantee is a legal right: if work is not provided within 15 days, the applicant gets an unemployment allowance. The other options contradict the Act.',
}));
Q('m_check_dam', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined village of Vidarbha, farmers grow only one rain-fed crop a year and are idle for months. Which step would most directly create more work **in the village itself**?',
  opts: [
    'Building check dams and small canals so that a second crop can be grown',
    'Opening a shopping mall in the state capital',
    'Giving each family a one-time cash gift',
    'Moving the village\'s weekly market to the city',
  ],
  sol: 'Irrigation allows a second crop, so farm families and labourers get work for more months of the year in the village. A mall far away, a one-time gift or moving the market does not create lasting local work.',
}));
Q('m_women_share', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Under MGNREGA 2005, at least what share of the people given work should be women?',
  opts: ['One-third', 'One-half', 'One-fourth', 'Two-thirds'],
  sol: 'The Act gives priority to women so that at least one-third of the beneficiaries are women.',
}));
Q('m_right_to_work', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why is MGNREGA 2005 described as implementing the **right to work**?',
  opts: [
    'Rural households can legally demand work, and if it is not given they receive an allowance',
    'It gives every citizen a permanent job in a government office',
    'It is a charity programme that officials may stop at any time',
    'It guarantees jobs only to graduates in cities',
  ],
  sol: 'Work under MGNREGA is a legal entitlement that can be demanded, backed by the unemployment allowance. It is not a permanent job, not a discretionary charity, and it is for rural households doing unskilled manual work.',
}));
Q('ar_mgnrega_city', ar({
  t: 3, d: 2, c: 'analysis', key: 'd',
  a: 'MGNREGA 2005 guarantees 100 days of work to every unemployed person living in a city.',
  r: 'MGNREGA aims to provide wage employment to households in rural areas.',
  sol: 'A is false: the guarantee is for **rural households**, not for individuals in cities. R is true.',
}));
Q('fb_2005', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The Mahatma Gandhi National Rural Employment Guarantee Act was passed by Parliament in the year ___.',
  acc: [['2005']],
  sol: 'The Act was passed in 2005 (as NREGA; "Mahatma Gandhi" was added to its name in 2009).',
}));
Q('ord_mgnrega', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps by which a rural household gets work under MGNREGA, in the correct order.',
  items: [
    'The household registers with the gram panchayat and receives a job card',
    'An adult member applies for work',
    'Work is provided within 15 days of the application (or an unemployment allowance is due)',
    'Wages are paid into the worker\'s bank or post-office account',
  ],
  sol: 'Registration and a job card come first, then the application for work, then work within 15 days, and finally payment of wages into an account.',
}));
Q('n_days_left', num({
  t: 3, d: 2, c: 'application', marks: 1, value: 42, unit: 'days',
  stem: 'An imagined household in Jharkhand has already received 58 days of work under MGNREGA 2005 in the current financial year. For how many more days can it still demand work this year under the Act\'s guarantee?',
  sol: 'Step 1: Guarantee = 100 days per household per financial year.\nStep 2: Days left = 100 − 58 = 42 days.',
}));
Q('s_mgnrega_feat', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two features of MGNREGA 2005.',
  model: '1. Every **rural household** is guaranteed **100 days** of unskilled manual work in a year.\n2. If work is not given within **15 days**, an **unemployment allowance** is paid. (Also: at least one-third of workers are women.)',
  sol: 'Any two correct provisions: 100 days, rural households, unemployment allowance, priority to women, works that improve land and water.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_roads_storage', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'How can better rural roads and storage facilities create employment in villages?',
  model: '1. **Roads** let farmers send produce to bigger markets and create work for **truck drivers, loaders and traders**.\n2. **Cold storage and godowns** let farmers store crops and sell later, and employ **workers, managers and technicians**.',
  sol: 'Link each facility to new activities and the jobs they create.',
  scheme: [['Roads and the jobs they create', 1], ['Storage and the jobs it creates', 1]],
}));
Q('s3_semi_rural', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Suggest three ways in which more employment can be created in a semi-rural area such as a small town surrounded by farms.',
  model: '1. **Agro-processing**: set up units for pickles, rice milling or fruit juice using local crops.\n2. **Cheap credit**: bank and SHG loans let people start **small shops, dairies or workshops**.\n3. **Services**: expand **schools, health centres, tourism** and repair work, which need local workers.',
  sol: 'Three different, realistic sources of work tied to the area (processing, credit for small enterprises, local services).',
  scheme: [['First suitable way', 1], ['Second suitable way', 1], ['Third suitable way', 1]],
}));
Q('s3_mgnrega_village', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'How does MGNREGA help both rural households and the village economy? Give three points.',
  model: '1. **Households** get a guaranteed **income** in the lean season, which reduces hunger and distress migration.\n2. Works such as **ponds, check dams and tree planting** build assets that raise **farm output** for years.\n3. Wages are **spent locally**, which helps village shops and other workers; and **women** gain paid work and some independence.',
  sol: 'One benefit to households, one to land productivity, one to the wider village economy or women.',
  scheme: [['Benefit to households (income, less migration)', 1], ['Lasting assets that raise output', 1], ['Wider benefit: local spending or women\'s work', 1]],
}));
Q('l_mgnrega', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'MGNREGA 2005 is often called a law that implements the "right to work". Explain its main features and evaluate how far it helps rural people.',
  model: '1. **Guarantee:** every **rural household** can demand **100 days** of unskilled manual work in a year.\n2. **Legal right:** if work is not given within **15 days**, an **unemployment allowance** is due; at least **one-third** of workers are **women**.\n3. **Useful works:** priority to **water conservation, land development and rural roads**, which raise future output.\n4. **Helps:** it gives income in the **lean season**, reduces **distress migration**, and payments into **bank accounts** reduce cheating.\n5. **Limits:** **delayed wages**, fewer days than promised in many districts and weak works reduce its benefit; with timely payment and **social audits**, it works far better.',
  sol: 'Two points on features, one on the kind of works, then a balanced judgement: benefits and limitations.',
  scheme: [['100 days for rural households', 1], ['Legal right: allowance; priority to women', 1], ['Kind of works and why they matter', 1], ['Benefits with reasons', 1], ['Limitations or conditions for success', 1]],
}));
Q('sb_gramsabha', source({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**Minutes of a gram sabha meeting, Kherwada village, Rajasthan (imagined), 2024**\n\nThe sarpanch read out the list of works for the coming year under the rural employment guarantee: deepening the old village pond, a check dam on the seasonal stream and a road to the hamlet of Bhilwas. Rukma Devi said that last year 46 households worked on the pond and that more than half of the workers were women. She complained that wages for the last fortnight of work came six weeks late. A young farmer said that since the check dam was built, his family now grows wheat in winter and he no longer goes to Surat to work in a factory.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Under which Act is this work most likely being provided?', model: '**MGNREGA 2005** (the Mahatma Gandhi National Rural Employment Guarantee Act).', sol: 'Rural works chosen by the gram sabha, with wages for manual work, point to the 2005 employment guarantee Act.', scheme: [['MGNREGA 2005', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Give one piece of evidence from the source that the scheme had a lasting effect on farming.', model: 'After the **check dam**, the farmer\'s family can **grow wheat in winter** (a second crop).', sol: 'Look for an asset that changed farming: the check dam made a winter crop possible.', scheme: [['Check dam enabling a second crop', 1]] })),
    child('c', short({ t: [3, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the young farmer\'s experience show that such works can reduce underemployment and migration?', model: 'Before, his family had **work for only one season**, so he **migrated** to a factory in Surat. The check dam created a **second crop**, so there is now **enough work at home**, and he no longer needs to leave the village.', sol: 'Connect the new asset to more months of farm work, and then to the end of seasonal migration.', scheme: [['Earlier underemployment and migration', 1], ['How the second crop provides work at home', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Rukma Devi complains about late wages. Suggest two ways to make the scheme work better for workers.', model: '(1) Pay wages **on time**, within the period fixed by law, directly into **bank accounts**, with compensation for delays. (2) Hold regular **social audits** in the gram sabha so that workers can check muster rolls and complain openly.', sol: 'Suggestions must address delays or accountability; any two workable steps.', scheme: [['First workable suggestion', 1], ['Second workable suggestion', 1]] }),
    ]),
  ],
}));
Q('cb_wages', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined households and an imagined notified wage of ₹300 a day, written by SOYL for practice.)*',
  passage: '**Work received under MGNREGA in one financial year, Sonpur panchayat (imagined)**\n\n| Household | Days of work received | Days asked for |\n|---|---|---|\n| Mahato | 60 | 60 |\n| Oraon | 75 | 100 |\n| Kumari | 100 | 100 |',
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: 18000, unit: '₹', stem: 'At ₹300 a day, how much did the Mahato household earn from this work in the year (in ₹)?', sol: 'Step 1: Earnings = days × daily wage.\nStep 2: 60 × 300 = 18,000. So ₹18,000.' })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: 25, unit: 'days', stem: 'The Oraon household asked for 100 days. For how many days was it denied work that it had demanded?', sol: 'Step 1: Days asked − days received.\nStep 2: 100 − 75 = 25 days.' })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What is the Oraon household entitled to for the days of work it was denied, and why?', model: 'If work demanded is not provided within **15 days** of the application, the Act entitles the household to an **unemployment allowance**, because the work is a **legal right**, not a favour.', sol: 'State the entitlement (allowance) and the reason (guarantee by law).', scheme: [['Unemployment allowance', 1], ['Reason: work is a legal guarantee', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The Kumari household has used all its guaranteed days. Suggest two other ways in which its members could find work in the area.', model: '(1) A **bank or SHG loan** to start a small enterprise such as a **dairy, tailoring or a tea stall**. (2) Work in a nearby **food-processing unit, cold storage or construction site**.', sol: 'Any two realistic non-MGNREGA sources of work in or near a village.', scheme: [['First realistic source of work', 1], ['Second realistic source of work', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 Organised and unorganised sectors
Q('m_org_feature', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Which of the following is a feature of the **organised** sector?',
  opts: [
    'Workers get paid leave, provident fund and fixed working hours',
    'Jobs are mostly irregular and low-paid',
    'Enterprises are not registered with the government',
    'Workers can be dismissed at any time without notice',
  ],
  sol: 'Organised-sector enterprises are registered and follow laws that give workers regular jobs with paid leave, provident fund and fixed hours. The other three describe the unorganised sector.',
}));
Q('m_headload', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Which worker is most likely to be in the **unorganised** sector?',
  opts: [
    'A head-load worker at a wholesale vegetable market, paid per load carried',
    'A clerk in a nationalised bank',
    'A teacher in a government school',
    'An engineer in a registered steel company with an appointment letter',
  ],
  sol: 'Payment per load, no fixed employer and no written terms mark unorganised work. The bank clerk, government teacher and the engineer with an appointment letter all have regular, protected jobs.',
}));
Q('m_gig', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Ayaan delivers food in Pune through a mobile app. He is paid per delivery, pays for his own petrol, and gets no paid leave or fixed salary. His work is closest to',
  opts: [
    'unorganised-sector work, even though it is linked to a large company',
    'organised-sector work, because the app company is large',
    'public-sector work, because he serves the public',
    'primary-sector work, because he travels outdoors',
  ],
  sol: 'What matters is the terms of work: no regular salary, no paid leave and no job security make it unorganised work, whatever the size of the company. "Public sector" is about government ownership, and delivery is a service, not a primary activity.',
}));
Q('m_registered', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Enterprises in the organised sector are those that',
  opts: [
    'are registered with the government and have to follow its rules on employment',
    'are always owned by the government',
    'employ only family members',
    'produce only goods and not services',
  ],
  sol: 'Registration and following labour rules define the organised sector. Ownership (government or private) and the kind of output are separate questions.',
}));
Q('m_protect', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Which step would best protect workers in the unorganised sector?',
  opts: [
    'Registering them for social security such as pensions, accident insurance and health cover',
    'Closing small workshops so that their workers must look for jobs in big factories',
    'Removing minimum wages so that employers hire more people',
    'Allowing longer working hours without any overtime payment',
  ],
  sol: 'Social security reduces the risks these workers face. Closing workshops destroys jobs, and removing minimum wages or overtime would make their conditions worse.',
}));
Q('m_contract', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Since the 1990s, many large companies have hired more workers on short contracts through contractors instead of as permanent staff. What is the main effect?',
  opts: [
    'Even inside organised enterprises, more workers lack job security and benefits',
    'All contract workers automatically get pensions and paid leave',
    'The unorganised sector has disappeared',
    'Workers become owners of the companies',
  ],
  sol: 'Contract workers in large firms often have unorganised-type conditions: no security, no paid leave, no provident fund. The unorganised sector has grown, not disappeared.',
}));
Q('ar_insecurity', ar({
  t: 4, d: 2, c: 'understanding', key: 'a',
  a: 'Workers in the unorganised sector often face job insecurity.',
  r: 'Rules and regulations on employment are largely not followed in the unorganised sector.',
  sol: 'Both are true, and R explains A: because rules are not followed, workers can be dismissed at any time and have no protection.',
}));
Q('ar_skills', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'Organised-sector jobs are more secure than unorganised-sector jobs.',
  r: 'Many organised-sector jobs require formal education and technical skills.',
  sol: 'Both are true, but R does not explain A. Security comes from registration and labour laws that protect workers, not from the skills a job needs.',
}));
Q('tf_bigco', tf({
  t: 4, d: 2, c: 'analysis', ans: false,
  stem: 'True or false? Every worker employed in a large, registered company is in the organised sector.',
  sol: 'Large companies also hire contract and casual workers who get no regular salary, paid leave or provident fund; their conditions are those of the unorganised sector.',
}));
Q('s_org_vs_unorg', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two differences between jobs in the organised and unorganised sectors.',
  model: '1. Organised jobs are **regular and secure**; unorganised jobs are **irregular** and workers can be **dismissed any time**.\n2. Organised workers get **paid leave, provident fund and medical benefits**; unorganised workers usually get **none**.',
  sol: 'Each difference must compare both sectors on the same point (security, benefits, wages, hours, registration).',
  scheme: [['First difference stated for both sectors', 1], ['Second difference stated for both sectors', 1]],
}));
Q('s_why_protect', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why do workers in the unorganised sector need protection? Give two reasons.',
  model: '1. Their jobs are **low-paid and irregular**, and they can be **dismissed** without notice.\n2. They get **no paid leave, pension or medical benefits**, so illness, injury or old age can push them into **poverty**.',
  sol: 'Two separate risks: insecurity and low pay; lack of social security.',
  scheme: [['Insecure, low-paid work', 1], ['No social security or benefits', 1]],
}));
Q('s3_nurse_domestic', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the working conditions of a nurse in a government hospital and a domestic worker employed by a family in a city.',
  model: '1. **Security:** the nurse has a **permanent post** with an appointment letter; the domestic worker can be **told to leave any day**.\n2. **Benefits:** the nurse gets **paid leave, provident fund and pension**; the domestic worker usually gets **none**.\n3. **Hours and pay:** the nurse has fixed hours and **overtime rules**; the domestic worker often works **long hours** for low pay, set by the employer.',
  sol: 'Three points of comparison, each covering both workers: security, benefits, hours and pay.',
  scheme: [['Job security compared', 1], ['Benefits compared', 1], ['Hours and pay compared', 1]],
}));
Q('s3_protect_ways', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Suggest three ways in which the government can protect workers in the unorganised sector.',
  model: '1. **Enforce minimum wages** and fair hours, with simple ways to complain.\n2. Provide **social security**: register workers (e.g. on the **e-Shram** portal) for pension, accident insurance and health cover.\n3. Help small enterprises with **cheap credit, raw materials and marketing**, so that they survive and pay better.',
  sol: 'Any three distinct measures covering wages, social security and support to small enterprises (or cooperatives, skills training).',
  scheme: [['First measure', 1], ['Second measure', 1], ['Third measure', 1]],
}));
Q('l_org_unorg', long({
  t: 4, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Distinguish between the organised and unorganised sectors on any five points.',
  model: '1. **Registration:** organised enterprises are **registered** with the government; unorganised units are **small and scattered**, often unregistered.\n2. **Rules:** the organised sector follows **labour laws**; in the unorganised sector rules exist but are **not followed**.\n3. **Security:** organised jobs are **regular**; unorganised workers can be **dismissed any time**.\n4. **Benefits:** organised workers get **paid leave, provident fund, gratuity, medical benefits**; unorganised workers mostly get **none**.\n5. **Wages and hours:** organised workers have **fixed hours and overtime pay**; unorganised workers are **low-paid**, often working long hours without overtime.',
  sol: 'Five points of difference, each stated for both sectors.',
  scheme: [['Registration', 1], ['Rules followed or not', 1], ['Job security', 1], ['Benefits', 1], ['Wages and hours', 1]],
}));
Q('l_protect_eval', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"Workers in the unorganised sector need protection on economic, social and other grounds." Do you agree? Support your answer and suggest measures.',
  model: '1. **Agree.** A large majority of India\'s workers, around **nine in ten**, work without formal job protection, so their welfare is the welfare of most families.\n2. **Economic grounds:** they are **low-paid**, work **irregularly** and can be dismissed any time; illness or injury means **no income**.\n3. **Social grounds:** workers from **socially disadvantaged communities** and many **women** are over-represented in such work and face discrimination.\n4. **Measures:** enforce **minimum wages**; give **social security** (pensions, health and accident cover) through registration such as **e-Shram**.\n5. **Measures (2):** support small units with **credit and marketing**; encourage **cooperatives** and skill training, so that incomes rise.',
  sol: 'Take a position, give economic and social grounds with evidence, then suggest at least two kinds of measures.',
  scheme: [['Position with a reason of scale', 1], ['Economic grounds', 1], ['Social grounds', 1], ['Measure: wages and social security', 1], ['Measure: support to small enterprises or cooperatives', 1]],
}));
Q('sb_rider', source({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**From the diary of Imran, a delivery rider in Bengaluru (imagined), 2025**\n\nTwelve hours on the road today and 23 orders. The app cut the payment per order again last week, and nobody explained why. In the evening rain a car hit my scooter. I lost two days of work while the scooter was repaired, and I paid the mechanic myself. My cousin works in a bank. When he was ill last year, he still got his salary for the days he stayed at home. Today the union people came to our stand and helped twenty of us register on the government portal for unorganised workers.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'application', marks: 1, stem: 'Is Imran\'s work in the organised or the unorganised sector?', model: 'The **unorganised sector**.', sol: 'Pay per order, no paid leave and no security mark unorganised work.', scheme: [['Unorganised sector', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Give one example from the source of the insecurity Imran faces.', model: 'His **pay per order was cut** without explanation / he **lost two days\' income** after the accident and paid for repairs himself.', sol: 'Any one sign of insecurity named in the diary.', scheme: [['One example from the source', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Compare the position of Imran with that of his cousin who works in a bank.', model: 'The cousin is in the **organised sector**: he has a regular salary and **paid sick leave**. Imran has **no paid leave or fixed pay**; when he cannot work, he **earns nothing** and bears his own costs.', sol: 'One point for the cousin\'s organised-sector protection, one for Imran\'s lack of it.', scheme: [['Cousin: organised-sector protection', 1], ['Imran: no protection, income lost', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): How can registering on a government portal for unorganised workers help riders like Imran? Give two ways.', model: '(1) Registration lets the government reach them with **accident insurance and pension** schemes. (2) It creates a **record** of their work, so they can claim **social security benefits** and be counted in labour policies.', sol: 'Two benefits that follow from being registered (access to schemes; recognition as workers).', scheme: [['First benefit', 1], ['Second benefit', 1]] }),
    ]),
  ],
}));
Q('cb_two_workers', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined workers and figures written by SOYL for practice.)*',
  passage: '| | Sunita | Ramesh |\n|---|---|---|\n| Work | Clerk in a nationalised bank, Lucknow | Worker at a brick kiln near Lucknow |\n| Pay | Monthly salary of ₹38,000 | ₹550 a day, only on days the kiln runs |\n| Days of work in a year | About 290 working days, plus paid holidays | About 180 days (the kiln shuts in the monsoon) |\n| Leave and benefits | Paid leave, provident fund, medical benefits, pension | None |\n| Appointment letter | Yes | No |',
  parts: [
    child('a', mcq({ t: 4, d: 1, c: 'application', stem: 'In which sector is Ramesh employed?', opts: ['Unorganised sector', 'Organised sector', 'Public sector', 'Tertiary sector'], sol: 'Daily pay, seasonal work, no benefits and no appointment letter mark unorganised work. Brick-making is a secondary activity, not tertiary.' })),
    child('b', num({ t: 4, d: 2, c: 'understanding', marks: 1, value: 99000, unit: '₹', stem: 'What is Ramesh\'s income for the year from the kiln (in ₹)?', sol: 'Step 1: Income = days worked × daily wage.\nStep 2: 180 × 550 = 99,000. So ₹99,000 a year.' })),
    child('c', short({ t: [4, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Sunita works in the public sector and the organised sector at the same time. Explain how this is possible.', model: 'The two classifications use **different bases**. A **nationalised bank** is **owned by the government** (public sector), and because it is registered and follows labour laws, her job is also in the **organised sector**.', sol: 'Name the basis of each classification (ownership; conditions of work) and apply both to Sunita.', scheme: [['Public sector: government ownership', 1], ['Organised sector: registered, regular, protected job', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two ways to improve Ramesh\'s conditions of work.', model: '(1) Enforce **minimum wages** and safe working conditions at the kiln. (2) Provide **social security** (health and accident cover, pension) and **MGNREGA** or other work in the off-season.', sol: 'Two measures that address his low pay, seasonal work or lack of benefits.', scheme: [['First suitable measure', 1], ['Second suitable measure', 1]] }),
    ]),
  ],
}));

// ================================================================ t05 Public and private sectors
Q('m_pub_basis', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'The public and private sectors are distinguished on the basis of',
  opts: [
    'who owns the assets and is responsible for providing the goods and services',
    'whether the activity uses natural resources directly',
    'whether workers get paid leave and provident fund',
    'whether the enterprise is in a village or a city',
  ],
  sol: 'In the public sector the government owns most assets and provides the services; in the private sector they are owned and run by individuals or companies. The other options are bases of other classifications or irrelevant.',
}));
Q('m_pub_example', mcq({
  t: 5, d: 1, c: 'application',
  stem: 'Which of the following is an example of a **public-sector** enterprise?',
  opts: ['Indian Railways', 'A private airline', 'A family-run sweet shop in Agra', 'A private software company in Hyderabad'],
  sol: 'Indian Railways is owned and run by the Government of India. The other three are owned by private individuals or companies.',
}));
Q('m_motive', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which statement about motives is correct?',
  opts: [
    'The private sector is guided mainly by profit; the public sector aims at public welfare and may not seek profit',
    'Both sectors are guided only by public welfare',
    'The public sector is guided mainly by profit; the private sector by welfare',
    'Neither sector cares about profit',
  ],
  sol: 'Private enterprises must earn profits to survive. Public enterprises are meant to serve the public, even at a loss where needed (e.g. subsidised services).',
}));
Q('m_fci', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'The Food Corporation of India buys wheat and rice from farmers at a minimum support price and supplies it to ration shops, where it is sold cheaply or given free to eligible families. Why does the government do this?',
  opts: [
    'To support farmers\' incomes and give poor families cheap food, bearing part of the cost itself',
    'To earn a large profit from buying low and selling high',
    'To stop farmers from selling to private traders by law',
    'Because private traders are not allowed to deal in foodgrains',
  ],
  sol: 'The public sector here pursues welfare: a fair price for farmers and food security for the poor, paid for partly by the government. It does not aim at profit, and private trade in grain is allowed.',
}));
Q('m_roads_why', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Why does the government, rather than private companies, usually build rural roads and small bridges?',
  opts: [
    'They need huge spending, and it is hard to charge each user enough to earn a profit',
    'Private companies are not allowed to build anything in India',
    'Rural roads are not useful to anybody except the government',
    'The government wants to earn more profit than private firms',
  ],
  sol: 'Roads and bridges benefit everyone but are costly, and collecting a fee from each user is difficult, so private firms would not provide them at a reasonable cost. Private firms do build some infrastructure, and the government\'s motive is welfare, not profit.',
}));
Q('ar_subsidy', ar({
  t: 5, d: 3, c: 'analysis', key: 'c',
  a: 'Governments often supply electricity to small industries at subsidised rates.',
  r: 'The public sector\'s only motive is to earn as much profit as possible.',
  sol: 'A is true: cheap power helps small industries grow and create jobs. R is false: the public sector aims at public welfare, which is exactly why it may sell below cost.',
}));
Q('tf_free', tf({
  t: 5, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Everything provided by the public sector is supplied free of cost.',
  sol: 'Many public-sector services charge a price (railway tickets, electricity bills, post); the price may be low or subsidised, but it is not always free.',
}));
Q('mt_sectors', match({
  t: [4, 5], d: 2, c: 'understanding',
  stem: 'Match each term with its correct description.',
  pairs: [
    ['Organised sector', 'Registered enterprises that follow labour laws and give regular jobs'],
    ['Unorganised sector', 'Small, scattered units where employment rules are largely not followed'],
    ['Public sector', 'The government owns most of the assets and provides the services'],
    ['Private sector', 'Assets are owned by individuals or companies, guided mainly by profit'],
  ],
  sol: 'Organised and unorganised describe conditions of work; public and private describe ownership. Read each description for its key idea: registration, rules not followed, government ownership, private ownership.',
}));
Q('s_pub_priv', short({
  t: 5, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the public and private sectors on the basis of ownership and motive.',
  model: '1. **Ownership:** in the public sector the **government** owns most assets (e.g. Indian Railways); in the private sector **individuals or companies** own them.\n2. **Motive:** the private sector seeks **profit**; the public sector aims at **public welfare**.',
  sol: 'One point on ownership with both sectors, one on motive with both sectors.',
  scheme: [['Ownership difference', 1], ['Motive difference', 1]],
}));
Q('s_not_private', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Why can the government not leave the supply of all essential services to the private sector? Give two reasons.',
  model: '1. Services such as **roads, dams and bridges** need huge spending, and private firms cannot charge users enough to earn a **profit**.\n2. Private hospitals and schools charge prices many **poor families cannot afford**, so the government must provide them cheaply.',
  sol: 'Reasons: high cost with no easy way to charge users; affordability and welfare for the poor.',
  scheme: [['High cost / no profit for private firms', 1], ['Affordability for poor people', 1]],
}));
Q('s3_govt_role', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three ways in which the public sector contributes to the economic development of a country.',
  model: '1. It builds **infrastructure** such as roads, railways, ports and dams that private firms would not build at reasonable cost.\n2. It supports **small industries and farmers**, e.g. cheap electricity and buying grain at a minimum support price.\n3. It provides **health, education and food security** for all, which raises people\'s ability to work and earn.',
  sol: 'Three distinct roles: infrastructure, support to producers, and social services.',
  scheme: [['Infrastructure', 1], ['Support to producers', 1], ['Health, education or food security', 1]],
}));
Q('s3_health_edu', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why is it necessary for the government to spend on health and education?',
  model: '1. Healthy and educated people are **more productive**, so this spending raises the **income of the country** in the long run.\n2. Many poor families **cannot afford** private schools and hospitals; without public provision they would be left out.\n3. Good schools and clinics reduce **inequality** and give every child a **fair chance**, which a profit-seeking private sector alone will not ensure.',
  sol: 'Link the spending to productivity, affordability and equity.',
  scheme: [['Productivity and growth', 1], ['Affordability for the poor', 1], ['Equity / fair chance', 1]],
}));
Q('l_public_role', long({
  t: 5, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the role of the public sector in the economic development of India.',
  model: '1. **Infrastructure:** the government builds **roads, railways, ports, dams and power plants**, which need huge investment that private firms avoid.\n2. **Support to producers:** it supplies **electricity** cheaply to small industries and buys grain from farmers at a **minimum support price**.\n3. **Food security:** through the **public distribution system** it provides cheap or free grain to poor families.\n4. **Health and education:** it runs **schools, hospitals and nutrition** programmes so that every citizen can develop skills.\n5. **Balanced development:** it can invest in **backward regions** and create jobs where private firms would not go, reducing inequality.',
  sol: 'Five distinct roles, each with an example; the reasoning is why the private sector alone would not do this.',
  scheme: [['Infrastructure', 1], ['Support to producers', 1], ['Food security', 1], ['Health and education', 1], ['Balanced regional development / jobs', 1]],
}));
Q('sb_buses', source({
  t: 5, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**Report of a municipal council debate, Shantinagar (imagined), 2025**\n\nThe city\'s buses are run by the municipal transport corporation, which lost money last year. One councillor proposed handing all routes to a private company that promised newer buses and on-time service. "The company will run only the busy routes," replied another councillor. "Who will carry students to the villages on the edge of the city, where buses run half empty?" A shopkeeper in the public gallery said she would happily pay a little more for a cleaner bus. The council finally decided to keep the corporation but hire private operators for some busy routes under strict rules on fares.',
  parts: [
    child('a', short({ t: 5, d: 1, c: 'application', marks: 1, stem: 'In which sector are the city\'s buses run at present?', model: 'The **public sector** (a municipal corporation owns and runs them).', sol: 'The buses are owned and run by a government body.', scheme: [['Public sector', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'understanding', marks: 1, stem: 'Why would the private company want to run only the busy routes?', model: 'Its main motive is **profit**; busy routes earn more than half-empty ones.', sol: 'Link the choice of routes to the profit motive.', scheme: [['Profit motive explained', 1]] })),
    child('c', short({ t: 5, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Do you think the council\'s final decision was sensible? Give two reasons.', model: 'Yes. (1) Keeping the corporation protects **loss-making but necessary routes** for students and villagers, a **welfare** goal. (2) Private operators on **busy routes** can improve service, while **fare rules** protect passengers from high prices.', sol: 'Take a position and give one welfare reason and one efficiency or regulation reason.', scheme: [['Reason linked to welfare / necessary routes', 1], ['Reason linked to efficiency with regulation', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why may a public-sector service be right to continue even when it makes a loss?', model: 'It serves **public welfare**, not profit: buses to the city\'s edge let **students and workers** reach schools and jobs. Their wider benefit to the city is greater than the **money lost**, so the loss is a cost worth bearing.', sol: 'Explain the welfare motive and the wider social benefit of the service.', scheme: [['Welfare motive', 1], ['Wider social benefit outweighs the loss', 1]] }),
    ]),
  ],
}));

// ================================================================ more t02 / t03 practice and passages
Q('sb_letter', source({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**Letter from Ram Prasad, a farmer in Gaya district, Bihar, to his brother in Delhi (imagined), 2024**\n\nOur four sons still work on our one and a half acres, but honestly two of them are enough for the work. When Bablu went to Ludhiana last year to work in a cycle factory, the paddy harvest was the same as before. People say a company may open a unit near the block office to process makhana and vegetables. If that happens, the boys could earn here and still help at harvest time. The new road to the block office already lets the vegetable traders come to our village twice a week.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'understanding', marks: 1, stem: 'Name the kind of unemployment described in the first two sentences.', model: '**Disguised unemployment**.', sol: 'Four work where two are enough, and output did not fall when one left.', scheme: [['Disguised unemployment', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which fact in the source shows that output did not depend on all four sons?', model: 'When **Bablu left** for Ludhiana, the **paddy harvest was the same**.', sol: 'Find the sentence where a worker leaves and output is unchanged.', scheme: [['Harvest unchanged after Bablu left', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How would the proposed processing unit help this family and the village?', model: 'It would give the **surplus sons paid work near home**, so family income rises without migration. Farmers would also get a **steady buyer** for makhana and vegetables, which raises their earnings.', sol: 'One benefit to the family (local jobs) and one to farmers or the village (market for produce).', scheme: [['Jobs for surplus workers near home', 1], ['Market for local produce / village benefit', 1]] }), [
      short({ t: 3, d: 2, c: 'application', marks: 2, stem: '**Or** (ii): How does the new road mentioned in the source help create employment?', model: 'Traders now **come to the village** to buy vegetables, so farmers can **grow and sell more**. More trade also creates work for **drivers, loaders and small shops** along the road.', sol: 'Link the road to better market access and then to new jobs.', scheme: [['Market access for farmers', 1], ['New jobs in transport and trade', 1]] }),
    ]),
  ],
}));
Q('cb_navgarh', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined state and figures written by SOYL for practice.)*',
  passage: '**Navgarh (imagined state): output and workers by sector**\n\n| Sector | Output, 2005 (₹ thousand crore) | Output, 2025 (₹ thousand crore) | Workers, 2025 (lakh) |\n|---|---|---|---|\n| Primary | 60 | 90 | 120 |\n| Secondary | 50 | 150 | 50 |\n| Tertiary | 90 | 360 | 80 |\n| **Total** | **200** | **600** | **250** |',
  parts: [
    child('a', num({ t: 2, d: 2, c: 'understanding', marks: 1, value: 60, unit: '%', stem: 'What was the tertiary sector\'s share of Navgarh\'s output in 2025, in per cent?', sol: 'Step 1: Share = 360 ÷ 600 × 100.\nStep 2: 360 ÷ 600 = 0.6, and 0.6 × 100 = 60. So 60%.' })),
    child('b', num({ t: 2, d: 3, c: 'application', marks: 1, value: 48, unit: '%', stem: 'What share of Navgarh\'s workers were in the primary sector in 2025, in per cent?', sol: 'Step 1: Share = 120 ÷ 250 × 100.\nStep 2: 120 ÷ 250 = 0.48, and 0.48 × 100 = 48. So 48%.' })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Using your answers, what do the figures suggest about work in Navgarh\'s primary sector?', model: 'Almost **half the workers (48%)** produce only **15% of output** (90 of 600). Output per worker is very low, which suggests **disguised unemployment or underemployment** in agriculture.', sol: 'Compare the primary sector\'s share of workers (48%) with its share of output (90 ÷ 600 = 15%) and name the problem.', scheme: [['Compares share of workers with share of output', 1], ['Identifies disguised unemployment / underemployment', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which sector\'s output grew the most between 2005 and 2025? Give one reason why this may have happened.', model: 'The **tertiary sector**: its output rose **fourfold, from 90 to 360**. Reason: rising incomes raised demand for services such as **health care, education, tourism and IT**, and other sectors needed more **transport and trade**.', sol: 'Compare growth: primary 90 ÷ 60 = 1.5 times, secondary 150 ÷ 50 = 3 times, tertiary 360 ÷ 90 = 4 times. Then give one reason for the growth of services.', scheme: [['Tertiary, with the figures', 1], ['One valid reason', 1]] }),
    ]),
  ],
}));
