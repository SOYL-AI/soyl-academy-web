// ICSE 10 Biology ch14 Population — Part 1 (t01–t02), Part 2 (t03–t04).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { WORLD_FIG, INDIA_FIG, STAGES_FIG, SURGERY } from './svgs.mjs';
import { TOWN, DIST, VILLAGE, STAGES, censusRise } from './calc.mjs';

const lakh = (n) => n.toLocaleString('en-IN');
const rs = (n) => `₹${lakh(n)}`;

export const V = {
  world: svgV(WORLD_FIG, 'World population milestones from 1804 to 2022, approximate UN figures'),
  india: svgV(INDIA_FIG, 'Population of India at each Census from 1951 to 2011'),
  stages: svgV(STAGES_FIG, 'Schematic graph of birth rate and death rate through four stages'),
  surgery: svgV(SURGERY, 'Sites of the cut in vasectomy and tubectomy'),
  problems: flow('TB', [['p', 'Population explosion'], ['u', 'Unemployment'], ['r', 'Over-use of resources'], ['i', 'Low per capita income'], ['c', 'Price rise'], ['o', 'Pollution'], ['w', 'Unequal wealth']], [['p', 'u'], ['p', 'r'], ['p', 'i'], ['p', 'c'], ['p', 'o'], ['p', 'w']], 'Flow: population explosion leads to unemployment, over-use of resources, low per capita income, price rise, pollution and unequal distribution of wealth'),
};

export const deck1 = deck({
  part: 1,
  title: 'Population — Part 1: Population explosion and demography',
  goals: [
    'Explain the main reasons for the rapid rise in human population in India and the world',
    'Define demography, population density, birth rate, death rate and growth rate',
    'Calculate birth rate, death rate, growth rate and density from given data',
  ],
  slides: [
    sl('title', 'Population', {
      b: 'Part 1 — why the number of people has risen so fast, and how we measure it.',
      v: flow('LR', [['b', 'Births'], ['m', 'People moving in'], ['p', 'Population'], ['d', 'Deaths'], ['o', 'People moving out']], [['b', 'p', 'add'], ['m', 'p', 'add'], ['p', 'd', 'lose'], ['p', 'o', 'lose']], 'Flow: births and people moving in add to a population; deaths and people moving out reduce it'),
      n: 'A population changes in only four ways. Babies are born, people die, and people move in or move out. In this part we see why births have far outnumbered deaths in the last century, and we learn how to measure a population with a few simple rates.',
    }),
    sl('diagram', 'The world population curve', {
      b: 'World population took until about **1804** to reach **1 billion**, but only about **11 years** to go from 7 to 8 billion (approximate UN milestones). The curve is **J-shaped**.',
      v: V.world,
      n: 'For most of history the human population grew very slowly. Then, in the last two centuries, the curve turned sharply upwards. Each new billion has arrived faster than the one before. A curve like this is called J shaped.',
    }),
    sl('diagram', 'India at each Census', {
      b: `India's population, Census figures in crore: from **36.1** in 1951 to **121.1** in 2011. From 2001 to 2011 alone it rose by **${censusRise(2001, 2011)} crore**.`,
      v: V.india,
      n: 'In India the Census counts everyone once every ten years. The bars grow taller every time, and the rise in each decade is itself larger than before. India holds a large share of the world’s people on a small share of its land.',
    }),
    sl('concept', 'Why did the population explode?', {
      v: table(['Death rate fell because of', 'Birth rate stayed high because of'], [['Vaccines and antibiotics', 'Early marriage'], ['Safer childbirth; fewer infant deaths', 'Illiteracy; little knowledge of family planning'], ['More food; better farming', 'Children seen as help and support in old age'], ['Clean water and sanitation', 'Wish for a son; social customs']], 'Table of reasons why the death rate fell and why the birth rate stayed high'),
      n: 'The explosion came from a gap. Medicine, food and clean water cut the death rate quickly. But the birth rate depends on customs and beliefs, which change slowly. So for many years, far more people were born than died.',
    }),
    sl('diagram', 'The gap between births and deaths', {
      b: 'Growth is fastest when the **death rate has fallen** but the **birth rate is still high** (stage 2 in this schematic).',
      v: V.stages,
      n: 'This schematic graph shows a country passing through four stages. At first both rates are high and the population barely grows. Then deaths fall and the gap opens wide. Later, births fall too, and the gap closes again.',
    }),
    sl('check', 'Quick check: the widest gap', {
      b: 'In which stage is the population growing fastest?',
      chk: 'stagegap-mcq',
      n: 'Look for the widest shaded gap.',
    }),
    sl('concept', 'Measuring a population: demography', {
      b: '**Demography** is the statistical study of human populations.',
      v: table(['Term', 'Meaning'], [['Birth rate', 'Live births per 1000 people in a year'], ['Death rate', 'Deaths per 1000 people in a year'], ['Growth rate', '(Birth rate − death rate) ÷ 10, in per cent a year (migration ignored)'], ['Population density', 'Number of people per square kilometre']], 'Table of four demographic terms and their meanings'),
      n: 'Demographers use rates so that places of different sizes can be compared. Birth rate and death rate are counted per thousand people each year. Their difference, divided by ten, gives the growth rate in per cent. Density tells us how crowded the land is.',
    }),
    sl('example', 'Worked example 1: rates for a town', {
      b: `A town of **${lakh(TOWN.pop)}** people had **${lakh(TOWN.births)}** births and **${TOWN.deaths}** deaths in a year.`,
      ul: [`Step 1: birth rate = ${lakh(TOWN.births)} ÷ ${lakh(TOWN.pop)} × 1000 = **${TOWN.br}**.`, `Step 2: death rate = ${TOWN.deaths} ÷ ${lakh(TOWN.pop)} × 1000 = **${TOWN.dr}**.`, `Step 3: growth rate = (${TOWN.br} − ${TOWN.dr}) ÷ 10 = **${TOWN.gr} per cent** a year.`],
      v: table(['Quantity', 'Value'], [['Birth rate (per 1000)', String(TOWN.br)], ['Death rate (per 1000)', String(TOWN.dr)], ['Growth rate (per cent a year)', String(TOWN.gr)]], `Worked table: birth rate ${TOWN.br}, death rate ${TOWN.dr}, growth rate ${TOWN.gr} per cent a year`),
      n: `Divide the births by the population and multiply by a thousand. Do the same for deaths. Then subtract, and divide by ten to turn a rate per thousand into a percentage. This town grows by ${TOWN.gr} per cent a year.`,
    }),
    sl('check', 'Quick check: the study of populations', {
      b: 'Fill in: the statistical study of human populations is called ______.',
      chk: 'demography-fill',
      n: 'The word begins with the Greek for people.',
    }),
    sl('example', 'Worked example 2: which district is more crowded?', {
      b: 'Compare densities, not total populations.',
      ul: [`Step 1: X = ${lakh(DIST.X.pop)} ÷ ${lakh(DIST.X.area)} = **${DIST.X.d}** per square kilometre.`, `Step 2: Y = ${lakh(DIST.Y.pop)} ÷ ${lakh(DIST.Y.area)} = **${DIST.Y.d}** per square kilometre.`, 'Step 3: X is more crowded, though it is smaller.'],
      v: table(['District', 'People', 'Area (square km)', 'Density'], [['X', lakh(DIST.X.pop), lakh(DIST.X.area), String(DIST.X.d)], ['Y', lakh(DIST.Y.pop), lakh(DIST.Y.area), String(DIST.Y.d)]], `Worked table: district X has density ${DIST.X.d} and district Y has density ${DIST.Y.d} people per square kilometre`),
      n: 'District Y has more land, but District X packs more people into each square kilometre. Density is people divided by area, and it is the fair way to compare crowding.',
    }),
    sl('check', 'Quick check: density', {
      b: 'True or false: population density is the number of people per square kilometre.',
      chk: 'density-tf',
      n: 'People divided by area.',
    }),
    sl('summary', 'Summary', {
      ul: ['Population explosion: the death rate fell sharply while the birth rate stayed high.', 'Demography is the statistical study of populations.', 'Birth rate and death rate are per 1000 people per year.', 'Growth rate = (birth rate − death rate) ÷ 10 per cent; density = people ÷ area.'],
      v: table(['Rate', 'Unit'], [['Birth rate, death rate', 'Per 1000 per year'], ['Growth rate', 'Per cent per year'], ['Density', 'People per square km']], 'Summary table of the units of the demographic rates'),
      n: 'To recap. The population exploded because deaths fell faster than births. We measure a population with birth rate, death rate, growth rate and density, and each has its own unit.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Always state the **unit**: per 1000 per year, per cent per year, or per square kilometre.', 'Growth rate uses **birth rate minus death rate**, never the sum.', 'Show each **step** of a calculation.', 'For real figures, quote the **source and year** (for example, Census 2011).'],
      n: 'Exam tips. Write the unit with every rate. Subtract the death rate, do not add it. Show your working step by step. And when you quote a real figure, say where and when it comes from.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Population — Part 2: Problems and population control',
  goals: [
    'Explain how population explosion leads to unemployment, over-use of resources, low per capita income, price rise, pollution and unequal wealth',
    'State the need for population control',
    'Describe vasectomy and tubectomy and explain how each prevents conception',
  ],
  slides: [
    sl('title', 'Problems and Control', {
      b: 'Part 2 — what happens when people outgrow their resources, and how growth can be slowed.',
      v: V.problems,
      n: 'When a population grows faster than its food, water, jobs and homes, life becomes harder for everyone. In this part we look at the problems of a population explosion and at the ways a country can slow its growth.',
    }),
    sl('concept', 'Problems of population explosion', {
      v: table(['Problem', 'Why it happens'], [['Unemployment', 'Job-seekers grow faster than new jobs'], ['Over-use of resources', 'Forests, water, soil and minerals used faster than renewed'], ['Low per capita income', 'Total income shared by more people'], ['Price rise', 'Demand for goods grows faster than supply'], ['Pollution', 'More vehicles, fuel, sewage and garbage'], ['Unequal wealth', 'The gap between rich and poor widens']], 'Table of six problems caused by population explosion and why each happens'),
      n: 'Each problem has a simple cause. More people want more jobs, more food and more goods than the country can produce. Prices rise and incomes are spread thinly. More people also make more waste, and the gap between rich and poor grows.',
    }),
    sl('check', 'Quick check: jobs', {
      b: 'Job-seekers grow faster than jobs. Which problem results?',
      chk: 'unemploy-mcq',
      n: 'Many people without work.',
    }),
    sl('example', 'Worked example 1: per capita income', {
      b: `A village earns **${rs(VILLAGE.income)}** a year.`,
      ul: [`Step 1: with ${lakh(VILLAGE.popBefore)} people, per capita income = ${rs(VILLAGE.income)} ÷ ${lakh(VILLAGE.popBefore)} = **${rs(VILLAGE.pcBefore)}**.`, `Step 2: with ${lakh(VILLAGE.popAfter)} people and the same income = **${rs(VILLAGE.pcAfter)}**.`, `Step 3: each person is **${rs(VILLAGE.fall)}** poorer, though the village earns the same.`],
      v: table(['Population', 'Per capita income'], [[lakh(VILLAGE.popBefore), rs(VILLAGE.pcBefore)], [lakh(VILLAGE.popAfter), rs(VILLAGE.pcAfter)]], `Worked table: per capita income falls from ${VILLAGE.pcBefore} rupees to ${VILLAGE.pcAfter} rupees when the population rises from ${VILLAGE.popBefore} to ${VILLAGE.popAfter}`),
      n: 'Per capita income is total income divided by the number of people. If the income stays the same while the population grows, every share becomes smaller. That is why rapid growth keeps incomes low.',
    }),
    sl('concept', 'Why control population?', {
      v: table(['Need', 'Benefit of slower growth'], [['Limited land, water and food', 'Resources last and are not over-used'], ['Jobs, schools, hospitals', 'Services can keep pace with the people'], ['Income and prices', 'Higher per capita income; steadier prices'], ['Environment', 'Less pollution and forest loss']], 'Table of four needs for population control and the benefit of slower growth'),
      n: 'Population control does not mean having no children. It means slowing growth so that food, water, jobs, schools and hospitals can keep up, and everyone can enjoy a better quality of life.',
    }),
    sl('concept', 'Slowing growth without surgery', {
      v: table(['Measure', 'How it lowers the birth rate'], [['Education, especially of girls', 'Later marriage; smaller families by choice'], ['Small family norm', 'Families learn the benefits of fewer children'], ['Care of mothers and infants', 'When children survive, parents do not need many'], ['Family planning advice', 'Couples can space and limit births']], 'Table of four measures that lower the birth rate without surgery and how each works'),
      n: 'Most of the fall in birth rates comes from choices, not operations. When girls stay in school they marry later. When families see that their children survive and thrive, they choose to have fewer. Advice at health centres helps couples plan their families.',
    }),
    sl('diagram', 'Surgical methods: vasectomy and tubectomy', {
      b: '**Vasectomy** (men): a small piece of each **vas deferens** is removed and the ends tied. **Tubectomy** (women): a small piece of each **oviduct** is removed and the ends tied.',
      v: V.surgery,
      n: 'Both operations are small and both block a tube. In a man, the tubes that carry sperms are cut and tied, so no sperms reach the semen. In a woman, the oviducts are cut and tied, so the egg cannot meet any sperm.',
    }),
    sl('concept', 'Vasectomy and tubectomy compared', {
      v: table(['Point', 'Vasectomy', 'Tubectomy'], [['Done on', 'Men', 'Women'], ['Tube cut and tied', 'Each vas deferens', 'Each oviduct'], ['Effect', 'No sperms in the semen', 'Egg cannot meet sperms'], ['Still works normally', 'Testes: sperms and testosterone', 'Ovaries and uterus: eggs, hormones, menstruation'], ['Nature', 'Permanent', 'Permanent']], 'Table comparing vasectomy and tubectomy'),
      n: 'Notice what is not touched. After vasectomy the testes still make testosterone. After tubectomy the ovaries still make hormones and the monthly cycle goes on. Only the path of the gametes is blocked, which is why these methods are permanent.',
    }),
    sl('check', 'Quick check: the method for women', {
      b: 'Fill in: cutting and tying the oviducts is called ______.',
      chk: 'tubectomy-fill',
      n: 'Think of the tubes.',
    }),
    sl('example', 'Worked example 2: what still works after surgery?', {
      b: 'Decide, part by part, what is blocked and what keeps working.',
      ul: ['Step 1: name the **tube** that is cut.', 'Step 2: the **gamete** that uses that tube can no longer pass.', 'Step 3: the **organ** that makes hormones is not touched, so hormones continue.'],
      v: table(['After', 'Blocked', 'Still works'], [['Vasectomy', 'Passage of sperms', 'Testosterone; male characters'], ['Tubectomy', 'Passage of the egg', 'Oestrogen, progesterone; menstruation']], 'Worked table: vasectomy blocks sperms but testosterone continues; tubectomy blocks the egg but hormones and menstruation continue'),
      n: 'Work it out in order. Which tube was cut? Which cells can no longer pass? And is the organ that makes the hormones still there? It always is, so the person’s hormones and body features do not change.',
    }),
    sl('check', 'Quick check: after tubectomy', {
      b: 'True or false: after tubectomy a woman stops menstruating.',
      chk: 'tub-tf',
      n: 'Are the ovaries and uterus touched?',
    }),
    sl('summary', 'Summary', {
      ul: ['Population explosion causes unemployment, over-use of resources, low per capita income, price rise, pollution and unequal wealth.', 'Control is needed so that resources and services keep pace with people.', 'Vasectomy: each vas deferens cut and tied. Tubectomy: each oviduct cut and tied.', 'Hormones and the menstrual cycle continue after these operations.'],
      v: table(['Method', 'Tube cut'], [['Vasectomy', 'Vas deferens'], ['Tubectomy', 'Oviduct']], 'Summary table: vasectomy cuts the vas deferens, tubectomy cuts the oviduct'),
      n: 'To recap. Too many people for too few resources brings many problems. Slowing growth helps everyone. And the two surgical methods block the path of sperms or eggs while leaving the hormone making organs untouched.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['For each problem, give the **cause** in one line.', 'Per capita income = **total income ÷ population**.', 'Say what is **cut** and what is **not affected** in each operation.', 'Do not say the testes or ovaries are removed.'],
      n: 'Exam tips. Explain each problem with its cause. Remember the per capita formula. And in the operations, say which tube is cut and that the testes and ovaries keep working.',
    }),
  ],
});
