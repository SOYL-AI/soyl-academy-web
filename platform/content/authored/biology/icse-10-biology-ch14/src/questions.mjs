// ICSE 10 Biology ch14 Population — question bank in ICSE 2027 style.
// Every rate, density, growth figure and per capita income is computed by calc.mjs from imagined data; real figures
// (Census of India, UN world milestones) are dated in the stem and listed in the README review list.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { TOWN, DIST, HAMLET, VILLAGE, STAGES, WORLD, INDIA, growthRate, perThousand, yearsBetween, censusRise, censusPct } from './calc.mjs';
import { STAGES_FIG, SURGERY_LETTERED, WORLD_FIG, INDIA_FIG } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const stageFig = svgV(STAGES_FIG, 'Schematic graph of birth rate and death rate through four stages');
const surgFig = svgV(SURGERY_LETTERED, 'Vasectomy and tubectomy, with five parts lettered A to E');
const worldFig = svgV(WORLD_FIG, 'World population milestones, approximate UN figures');
const indiaFig = svgV(INDIA_FIG, 'Population of India at each Census from 1951 to 2011');
const lakh = (n) => n.toLocaleString('en-IN');
const rs = (n) => `₹${lakh(n)}`;

// ---------------------------------------------------------------- t01 population explosion and its causes
add('deathfall-mcq', mcq({
  stem: "The main reason for the rapid rise in India's population during the twentieth century was",
  right: 'a steep fall in the death rate while the birth rate stayed high', wrong: ['a sudden rise in the birth rate while the death rate stayed the same', 'large numbers of people moving into India from other countries', 'a rise in both the birth rate and the death rate'],
  sol: 'Better medicine and food cut deaths, but births fell only slowly, so the gap widened — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('notcause-mcq', mcq({
  stem: 'Which of these does NOT help to explain a high birth rate?',
  right: 'Better medical care for elderly people', wrong: ['Early marriage', 'Lack of awareness of family planning', 'Wanting more children to help earn for the family'],
  sol: 'Care of the elderly lowers the death rate; the other three raise the number of births — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('stagegap-mcq', mcq({
  stem: 'Study the graph. In which stage is the population growing fastest?',
  right: 'Stage 2, where the death rate has fallen but the birth rate is still high', wrong: ['Stage 1, where both rates are high', 'Stage 3, where the birth rate has started to fall', 'Stage 4, where both rates are low'],
  sol: `Growth depends on the gap between the two rates; it is widest in stage 2 (${STAGES[1].br} − ${STAGES[1].dr} per 1000) — option (@K).`,
  d: 3, c: 'application', t: [1, 2],
  assets: [stageFig],
}));
add('medicine-ar', ar({
  a: 'Advances in medicine have added to the rapid growth of the human population.',
  r: 'Vaccines, antibiotics and safer childbirth have lowered the death rate, especially among infants.',
  key: 'c',
  sol: 'Both are true, and the fall in deaths that medicine brought is exactly why the population grew faster — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('billion-ar', ar({
  a: "India's population, as counted in the Census of 2011, was more than one hundred crore.",
  r: 'India is one of the seven largest countries in the world by area.',
  key: 'd',
  sol: 'Both are true (about 121 crore in 2011; India is seventh by area), but a large area does not explain a large population — option (d).',
  d: 2, c: 'analysis', t: [1],
}));
add('lifeexp-tf', tf({
  stem: 'A rise in the average life expectancy adds to the growth of a population.',
  key: 't',
  sol: 'True. People live longer, so fewer die each year and the population grows.',
  d: 2, c: 'understanding', t: [1],
}));
add('explosion-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: a very rapid increase in the number of people in a region within a short time.',
  model: '**Population explosion.**',
  sol: 'Population explosion.', scheme: [['Population explosion', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-causes', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Early marriage, Illiteracy, Late marriage, Desire for a male child.',
  model: '**Late marriage**; the others are **causes of a high birth rate**.',
  sol: 'Late marriage lowers the birth rate.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('reason-infant', short({
  marks: 1, wl: null,
  stem: 'Give reason: a fall in infant deaths at first speeds up population growth.',
  model: 'More children **survive to grow up and have children**, while the **birth rate has not yet fallen**, so the gap between births and deaths widens.',
  sol: 'More survivors, birth rate unchanged.', scheme: [['More survive while births stay high', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('deathrate-short', short({
  marks: 2,
  stem: 'State two reasons for the fall in the death rate in India over the last hundred years.',
  model: '1. **Better medical care:** vaccines and antibiotics control diseases such as smallpox, cholera and tuberculosis.\n2. **More food and cleaner surroundings:** better farming, safe drinking water and sanitation reduce hunger and infection.',
  sol: 'Medicine; food and sanitation.',
  scheme: [['First reason', 1], ['Second reason', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('explosion-short', short({
  marks: 3,
  stem: 'Explain three main reasons for the population explosion in India.',
  model: '1. **Fall in death rate:** vaccines, antibiotics and better food mean fewer people die, especially infants.\n2. **High birth rate:** early marriage, illiteracy and lack of awareness of family planning keep births high.\n3. **Social and economic beliefs:** children are seen as **helpers and support in old age**, and many families wish for a son, so they have more children.',
  sol: 'Death rate fell; birth rate high; social beliefs.',
  scheme: [['Falling death rate', 1], ['High birth rate and its causes', 1], ['Social or economic beliefs', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 demography, density, birth rate, death rate, growth rate
add('demography-mcq', mcq({
  stem: 'Demography is the',
  right: 'statistical study of human populations: their size, density, births, deaths and movement', wrong: ['study of the structure of human organs', 'study of the spread of diseases among animals', 'counting of plants in a forest'],
  sol: 'Demography deals with population statistics such as birth rate, death rate and density — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('br-def-mcq', mcq({
  stem: 'The birth rate of a population is the number of',
  right: 'live births per 1000 people in a year', wrong: ['children born in one hospital in a day', 'children in each family', 'deaths per 1000 people in a year'],
  sol: 'Birth rate is expressed per 1000 of the population per year — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('density-mcq', mcq({
  stem: `A district of ${lakh(DIST.X.area)} square kilometres has ${lakh(DIST.X.pop)} people. Its population density is`,
  right: `${DIST.X.d} people per square kilometre`, wrong: [`${DIST.X.d / 10} people per square kilometre`, `${DIST.X.d * 10} people per square kilometre`, `${Math.round(DIST.X.area / DIST.X.pop * 1000000)} people per square kilometre`],
  sol: `Density = population ÷ area = ${lakh(DIST.X.pop)} ÷ ${lakh(DIST.X.area)} = ${DIST.X.d} per square kilometre — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('gr-mcq', mcq({
  stem: 'In a town the birth rate is 25 and the death rate is 9 per 1000 people per year. Ignoring migration, its growth rate is',
  right: `${growthRate(25, 9)} per cent a year`, wrong: ['3.4 per cent a year', '16 per cent a year', '0.16 per cent a year'],
  sol: `Growth rate = (25 − 9) ÷ 10 = ${growthRate(25, 9)} per cent a year — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('growth-ar', ar({
  a: `A country with a birth rate of 20 and a death rate of 8 per 1000 grows by ${growthRate(20, 8)} per cent a year, ignoring migration.`,
  r: 'The growth rate is found by adding the birth rate and the death rate.',
  key: 'a',
  sol: `The assertion is true: (20 − 8) ÷ 10 = ${growthRate(20, 8)} per cent. The reason is false: the death rate is subtracted, not added — option (a).`,
  d: 3, c: 'analysis', t: [2],
}));
add('migration-ar', ar({
  a: 'The population of a city can grow even if its birth rate and death rate are equal.',
  r: 'People may move into the city from villages and other towns.',
  key: 'c',
  sol: 'Both are true; with equal birth and death rates, the only source of growth is people moving in — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('density-tf', tf({
  stem: 'Population density is the number of people living in each square kilometre of land.',
  key: 't',
  sol: 'True. Density = population ÷ area.',
  d: 1, c: 'recall', t: [2],
}));
add('demography-fill', fill({
  stem: 'The statistical study of the size, density and growth of human populations is called ______.',
  acc: [['demography']],
  sol: 'Demography.',
  d: 1, c: 'recall', t: [2],
}));
add('deathrate-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the number of deaths per 1000 people of a population in a year.',
  model: '**Death rate** (mortality rate).',
  sol: 'Death rate.', scheme: [['Death rate', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('odd-demo', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Birth rate, Death rate, Literacy rate, People moving in.',
  model: '**Literacy rate**; the others **directly change the size of a population**.',
  sol: 'Literacy affects size only indirectly.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('br-num', num({
  stem: `A town of ${lakh(TOWN.pop)} people recorded ${lakh(TOWN.births)} live births in a year. Calculate its birth rate (per 1000 people per year).`,
  value: TOWN.br,
  sol: `Birth rate $= \\dfrac{${TOWN.births}}{${TOWN.pop}} \\times 1000 = ${TOWN.br}$ per 1000 per year.`,
  scheme: [[`${TOWN.br}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 22 || 'value');
add('hamlet-num', num({
  stem: `A village of ${lakh(HAMLET.pop)} people covers ${HAMLET.area} square kilometres. Find its population density (people per square kilometre).`,
  value: HAMLET.d,
  sol: `Density $= ${HAMLET.pop} \\div ${HAMLET.area} = ${HAMLET.d}$ people per square kilometre.`,
  scheme: [[`${HAMLET.d}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 650 || 'value');
add('growth-def-short', short({
  marks: 2,
  stem: 'Define growth rate of a population. How is it worked out from the birth rate and death rate?',
  model: 'Growth rate is the **increase in population per 100 people in a year**. Ignoring migration, it is **(birth rate − death rate) ÷ 10**, since both rates are given per 1000 people.',
  sol: 'Growth rate = (BR − DR) ÷ 10 per cent.',
  scheme: [['Definition', 1], ['Calculation from the two rates', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('district-short', short({
  marks: 2,
  stem: `District X has ${lakh(DIST.X.pop)} people on ${lakh(DIST.X.area)} square kilometres; District Y has ${lakh(DIST.Y.pop)} people on ${lakh(DIST.Y.area)} square kilometres. Which district is more densely populated? Show your working.`,
  model: `X: ${lakh(DIST.X.pop)} ÷ ${lakh(DIST.X.area)} = **${DIST.X.d}** per square kilometre. Y: ${lakh(DIST.Y.pop)} ÷ ${lakh(DIST.Y.area)} = **${DIST.Y.d}** per square kilometre. So **District X** is more densely populated, although it has a smaller area.`,
  sol: `X ${DIST.X.d}, Y ${DIST.Y.d}: X is denser.`,
  scheme: [['Both densities worked out', 1], ['District X', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 problems caused by population explosion
add('percapita-mcq', mcq({
  stem: "If a country's total income stays the same while its population doubles, its per capita income will",
  right: 'become half', wrong: ['double', 'stay the same', 'become four times'],
  sol: 'Per capita income = total income ÷ population; doubling the divisor halves the result — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('price-mcq', mcq({
  stem: 'A rapidly growing population tends to push up prices mainly because',
  right: 'the demand for food and goods rises faster than their supply', wrong: ['people earn much more money', 'factories produce too many goods', 'the death rate rises'],
  sol: 'When more people compete for limited goods, prices rise — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('unemploy-mcq', mcq({
  stem: 'Which problem arises when the number of people looking for work grows faster than the number of new jobs?',
  right: 'Unemployment', wrong: ['Afforestation', 'Fall in prices', 'Rise in per capita income'],
  sol: 'More job-seekers than jobs means many remain without work — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('forest-mcq', mcq({
  stem: 'A forest near a growing town is cleared for houses and farms, and the nearby stream dries up in summer. This is an example of',
  right: 'over-exploitation of natural resources caused by population pressure', wrong: ['sustainable use of resources', 'social forestry', 'a fall in population density'],
  sol: 'More people need more land, wood and water, so forests and water sources are used up — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('wealth-ar', ar({
  a: 'A population explosion helps to share wealth more evenly among people.',
  r: 'In a population explosion, more people have to share limited resources.',
  key: 'b',
  sol: 'The assertion is false: crowding usually makes the gap between rich and poor wider. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('slum-tf', tf({
  stem: 'A shortage of housing in fast-growing cities leads to the growth of slums.',
  key: 't',
  sol: 'True. People who cannot afford houses crowd into slums with poor sanitation.',
  d: 1, c: 'understanding', t: [3],
}));
add('percapita-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: the average income of a person, found by dividing the total income of a country by its population.',
  model: '**Per capita income.**',
  sol: 'Per capita income.', scheme: [['Per capita income', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('odd-problems', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Unemployment, Price rise, Low per capita income, Better schools for all.',
  model: '**Better schools for all**; the others are **problems caused by population explosion**.',
  sol: 'Crowding strains schools rather than improving them.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [3],
}));
add('reason-jobs', short({
  marks: 1, wl: null,
  stem: 'Give reason: population explosion leads to unemployment.',
  model: 'The number of people of working age **grows faster than new jobs** can be created, so many people **cannot find work**.',
  sol: 'Job-seekers outnumber jobs.', scheme: [['Job-seekers grow faster than jobs', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('resource-short', short({
  marks: 2,
  stem: 'How does population explosion lead to over-exploitation of natural resources? Give two examples.',
  model: 'More people need more **food, water, fuel, land and timber**, so resources are used faster than they are renewed. Examples: **forests are cut** for farms and houses; **groundwater is over-pumped** and wells run dry.',
  sol: 'Demand exceeds renewal; forests, water.',
  scheme: [['Demand exceeds renewal', 1], ['Two examples', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('village-short', short({
  marks: 2,
  stem: `A village earns ${rs(VILLAGE.income)} in a year and has ${lakh(VILLAGE.popBefore)} people. Find its per capita income. What will it become if the population grows to ${lakh(VILLAGE.popAfter)} while the income stays the same?`,
  model: `Per capita income = ${rs(VILLAGE.income)} ÷ ${lakh(VILLAGE.popBefore)} = **${rs(VILLAGE.pcBefore)}**. With ${lakh(VILLAGE.popAfter)} people it falls to ${rs(VILLAGE.income)} ÷ ${lakh(VILLAGE.popAfter)} = **${rs(VILLAGE.pcAfter)}**, a fall of ${rs(VILLAGE.fall)} per person.`,
  sol: `${rs(VILLAGE.pcBefore)}, then ${rs(VILLAGE.pcAfter)}.`,
  scheme: [[`${rs(VILLAGE.pcBefore)}`, 1], [`${rs(VILLAGE.pcAfter)}`, 1]],
  d: 2, c: 'application', t: [3],
}));
add('problems-short', short({
  marks: 3,
  stem: 'Explain how population explosion leads to (a) a rise in prices, (b) more pollution and (c) unequal distribution of wealth.',
  model: '(a) **Demand** for food, housing and goods rises faster than **supply**, so prices go up.\n(b) More people use more **vehicles, fuel and goods** and produce more **sewage and garbage**, polluting air, water and soil.\n(c) Those who own land and businesses gain, while the growing number of **poor** share very little, so the **gap between rich and poor widens**.',
  sol: 'Demand and supply; waste and fuel; gap widens.',
  scheme: [['Price rise', 1], ['Pollution', 1], ['Unequal wealth', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 population control; vasectomy and tubectomy
add('vasectomy-mcq', mcq({
  stem: 'In vasectomy,',
  right: 'a small piece of each vas deferens is removed and the cut ends are tied', wrong: ['the testes are removed', 'each oviduct is cut and tied', 'the prostate gland is removed'],
  sol: 'Cutting and tying the vas deferens stops sperms from reaching the urethra — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('tubectomy-mcq', mcq({
  stem: 'Tubectomy prevents pregnancy because',
  right: 'the egg cannot pass along the cut and tied oviducts to meet the sperms', wrong: ['the ovaries stop secreting hormones', 'menstruation stops completely', 'no more eggs are formed in the ovaries'],
  sol: 'The ovaries still release eggs and hormones; the cut tubes keep the egg and sperms apart — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('after-vas-mcq', mcq({
  stem: 'Which statement about a man who has had a vasectomy is correct?',
  right: 'His testes still make sperms and testosterone, but his semen contains no sperms', wrong: ['His testes stop making testosterone', 'His semen still contains sperms but they cannot swim', 'His secondary sexual characters disappear'],
  sol: 'Only the vas deferens is cut; the testes keep working, so hormones and characters are unchanged — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('need-mcq', mcq({
  stem: 'The main aim of population control in a country with a high growth rate is to',
  right: 'balance the population with the available resources and improve the quality of life', wrong: ['reduce the population to zero', 'stop all people from moving between states', 'increase the death rate'],
  sol: 'Control slows growth so that food, jobs, schools and health care can keep up — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('fig-cut-mcq', mcq({
  stem: 'In the figure, which letter marks the site that is cut and tied in tubectomy?',
  right: 'C', wrong: ['A', 'D', 'E'],
  sol: 'C marks the cut oviduct. A is the cut vas deferens, D the ovary and E the uterus — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [surgFig],
}));
add('permanent-ar', ar({
  a: 'Vasectomy is a permanent method of preventing conception.',
  r: 'In vasectomy the testes of the man are removed.',
  key: 'a',
  sol: 'The assertion is true: the cut tubes are not normally rejoined. The reason is false: the testes are not removed — option (a).',
  d: 2, c: 'analysis', t: [4],
}));
add('tub-tf', tf({
  stem: 'After tubectomy, a woman stops menstruating.',
  key: 'f',
  sol: 'False. The ovaries and uterus are untouched, so the cycle and menstruation continue.',
  d: 2, c: 'understanding', t: [4],
}));
add('tubectomy-fill', fill({
  stem: 'The surgical method of birth control in women, in which a small part of each oviduct is removed and the ends tied, is called ______.',
  acc: [['tubectomy']],
  sol: 'Tubectomy.',
  d: 1, c: 'recall', t: [4],
}));
add('vasectomy-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: the surgical method of birth control in men in which each vas deferens is cut and tied.',
  model: '**Vasectomy.**',
  sol: 'Vasectomy.', scheme: [['Vasectomy', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('reason-terminal', short({
  marks: 1, wl: null,
  stem: 'Give reason: vasectomy and tubectomy are chosen only by couples who do not want any more children.',
  model: 'They are **permanent** methods: the cut and tied tubes are **difficult to rejoin**.',
  sol: 'Permanent.', scheme: [['Permanent, hard to reverse', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('vas-tub-short', short({
  marks: 2,
  stem: 'Distinguish between vasectomy and tubectomy, giving two points.',
  model: '1. **Vasectomy** is done on **men**; **tubectomy** on **women**.\n2. In vasectomy each **vas deferens** is cut and tied, so sperms cannot reach the semen; in tubectomy each **oviduct** is cut and tied, so the egg cannot meet sperms.',
  sol: 'Person; tube cut.',
  scheme: [['Men vs women', 1], ['Tube cut and its effect', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('need-short', short({
  marks: 2,
  stem: 'Give two reasons why population control is needed in a country like India.',
  model: '1. Resources such as **land, water and food** are limited, and a fast-growing population uses them up.\n2. A smaller rate of growth lets the country provide enough **jobs, schools, housing and health care**, raising the **standard of living**.',
  sol: 'Limited resources; better quality of life.',
  scheme: [['First reason', 1], ['Second reason', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('surgery-draw', short({
  marks: 3, wl: null,
  stem: 'Draw simple labelled diagrams to show where the cut is made in (a) vasectomy and (b) tubectomy.',
  model: '(a) A testis with the **vas deferens** leading upwards; a short piece of the vas deferens removed and both ends **tied**. (b) The uterus with an **oviduct** on each side leading to an **ovary**; a short piece of each oviduct removed and both ends **tied**.',
  sol: 'Two diagrams with the cut sites labelled.',
  scheme: [['Vasectomy diagram with the cut vas deferens', 1], ['Tubectomy diagram with the cut oviducts', 1], ['Labels', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('demo-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [demography, birth rate, death rate, density, growth rate, per capita income, migration, explosion]\n\nThe statistical study of human populations is called (a) ______. The number of live births per 1000 people in a year is the (b) ______, and the number of deaths per 1000 people in a year is the (c) ______. The difference between the two, divided by 10, gives the (d) ______ in per cent. The number of people living in each square kilometre is the population (e) ______.',
  acc: [['demography'], ['birth rate'], ['death rate'], ['growth rate'], ['density']],
  sol: '(a) demography; (b) birth rate; (c) death rate; (d) growth rate; (e) density.',
  d: 2, c: 'understanding', t: [2],
}));
add('control-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [vasectomy, tubectomy, vas deferens, oviduct, sperms, egg, testosterone, uterus]\n\nIn (a) ______, a small part of each (b) ______ is removed and the ends tied, so that (c) ______ cannot pass into the semen. In tubectomy each (d) ______ is cut and tied, so that the (e) ______ cannot meet the sperms.',
  acc: [['vasectomy'], ['vas deferens'], ['sperms', 'sperm'], ['oviduct', 'fallopian tube'], ['egg', 'ovum']],
  sol: '(a) vasectomy; (b) vas deferens; (c) sperms; (d) oviduct; (e) egg.',
  d: 2, c: 'understanding', t: [4],
}));
add('surgery-match5', match({
  marks: 5,
  stem: 'Study the figure of vasectomy and tubectomy and match each lettered part with the correct statement.',
  pairs: [
    ['A', 'Cut and tied so that sperms cannot pass into the semen'],
    ['B', 'Goes on making sperms and testosterone after the operation'],
    ['C', 'Cut and tied so that the egg cannot meet the sperms'],
    ['D', 'Goes on releasing eggs and female hormones after the operation'],
    ['E', 'Keeps its monthly cycle of lining build-up and menstruation'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'A cut vas deferens; B testis; C cut oviduct; D ovary; E uterus.',
  d: 3, c: 'application', t: [4],
  assets: [surgFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('town-case', mk.case({
  passage: `The health office of a hill town recorded the following for one year:\n\n| Item | Number |\n|---|---|\n| Population at the start of the year | ${lakh(TOWN.pop)} |\n| Live births | ${lakh(TOWN.births)} |\n| Deaths | ${TOWN.deaths} |\n| People who moved into the town | ${TOWN.cameIn} |\n| People who moved out | ${TOWN.left} |`,
  d: 3, c: 'application',
  children: [
    part('a', num({ marks: 2, stem: 'Calculate the birth rate of the town (per 1000 people per year).', value: TOWN.br, sol: `Birth rate $= \\dfrac{${TOWN.births}}{${TOWN.pop}} \\times 1000 = ${TOWN.br}$.`, scheme: [['Formula used', 1], [`${TOWN.br}`, 1]], d: 2, c: 'application', t: [2] })),
    part('b', num({ stem: 'Calculate the death rate (per 1000 people per year).', value: TOWN.dr, sol: `Death rate $= \\dfrac{${TOWN.deaths}}{${TOWN.pop}} \\times 1000 = ${TOWN.dr}$.`, scheme: [[`${TOWN.dr}`, 1]], d: 2, c: 'application', t: [2] })),
    part('c', num({ marks: 2, stem: 'Find the natural growth rate of the town in per cent, ignoring migration.', value: TOWN.gr, unit: '%', sol: `Growth rate $= \\dfrac{${TOWN.br} - ${TOWN.dr}}{10} = ${TOWN.gr}$ per cent a year.`, scheme: [['Subtracts death rate from birth rate', 1], [`${TOWN.gr} per cent`, 1]], d: 2, c: 'application', t: [2] })),
    part('d', num({ marks: 2, stem: 'What was the population of the town at the end of the year, taking migration into account?', value: TOWN.next, sol: `${TOWN.pop} + ${TOWN.births} − ${TOWN.deaths} + ${TOWN.cameIn} − ${TOWN.left} = ${TOWN.next}.`, scheme: [['Adds births and arrivals, subtracts deaths and departures', 1], [`${lakh(TOWN.next)}`, 1]], d: 3, c: 'application', t: [2] })),
    part('e', short({ marks: 3, stem: 'The town council fears that the town will soon be overcrowded. State three problems the town may face if this growth continues.', model: '1. **Shortage of housing**, so slums grow on the hillsides.\n2. **Shortage of water**, as springs and wells cannot supply everyone, and more sewage and garbage **pollute** the streams.\n3. **Unemployment** and **rising prices**, as jobs and goods do not increase as fast as the number of people.', sol: 'Housing, water and pollution, jobs and prices.', scheme: [['First problem', 1], ['Second problem', 1], ['Third problem', 1]], d: 2, c: 'application', t: [3] })),
  ],
}));
add('stages-case', mk.case({
  stem: 'Study the graph and answer the questions.',
  passage: 'The schematic graph shows how the birth rate and the death rate of a country may change as it develops, in four stages. The shaded gap between the two lines shows how fast the population grows.',
  d: 3, c: 'analysis',
  assets: [stageFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'In which stage is the population growing fastest?', model: '**Stage 2.**', sol: 'Stage 2: widest gap.', scheme: [['Stage 2', 1]], d: 1, c: 'application', t: [1] })),
    part('b', num({ stem: `In stage 2, the birth rate is ${STAGES[1].br} and the death rate ${STAGES[1].dr} per 1000. Calculate the growth rate in per cent.`, value: STAGES[1].gr, unit: '%', sol: `$\\dfrac{${STAGES[1].br} - ${STAGES[1].dr}}{10} = ${STAGES[1].gr}$ per cent a year.`, scheme: [[`${STAGES[1].gr} per cent`, 1]], d: 2, c: 'application', t: [2] })),
    part('c', short({ marks: 2, stem: 'Why does the death rate fall before the birth rate does?', model: 'Medicines, vaccines, clean water and more food **save lives quickly** once they are available. The birth rate depends on **habits and beliefs** about family size, which **change slowly**, over a generation or more.', sol: 'Medical help acts fast; beliefs change slowly.', scheme: [['Death rate falls quickly with medicine and food', 1], ['Birth rate depends on slowly changing customs', 1]], d: 3, c: 'analysis', t: [1] })),
    part('d', short({ marks: 3, stem: 'Give three reasons why the birth rate falls in stage 3.', model: '1. **Education**, especially of girls, leads to later marriage and smaller families.\n2. Families learn about **family planning** and the small family norm.\n3. As fewer children die, parents no longer need many children for **support in old age**, and city living makes large families costly.', sol: 'Education, family planning, fewer child deaths.', scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]], d: 2, c: 'understanding', t: [1, 4] })),
    part('e', short({ marks: 3, stem: 'In stage 4 both rates are low. Explain why the population hardly grows, and state one advantage for the country.', model: `The birth rate (${STAGES[3].br}) is only a little above the death rate (${STAGES[3].dr}), so the **gap is small**: growth is only ${STAGES[3].gr} per cent a year. With a steady population, the country can provide enough **food, jobs, schools and health care** for everyone, and per capita income can rise.`, sol: 'Small gap; resources keep up.', scheme: [['Both rates low and close', 1], ['Small growth rate', 1], ['One advantage', 1]], d: 3, c: 'analysis', t: [2, 4] }), [
      short({ marks: 3, stem: 'Draw a simple flow chart to show how a fall in the death rate without a fall in the birth rate leads to a population explosion.', model: 'Better medicine and food → **death rate falls** → birth rate **stays high** → **gap between births and deaths widens** → population grows **very fast** → population explosion.', sol: 'Flow chart in steps.', scheme: [['Death rate falls', 1], ['Birth rate stays high, gap widens', 1], ['Rapid growth: explosion', 1]], d: 2, c: 'application', t: [1] }),
    ]),
  ],
}));
add('surgery-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'The figure shows the two common surgical methods of birth control. In each, a short piece of a tube is removed and the cut ends are tied. The parts are lettered A to E.',
  d: 3, c: 'analysis',
  assets: [surgFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the operation shown on the left.', model: '**Vasectomy.**', sol: 'Vasectomy.', scheme: [['Vasectomy', 1]], d: 1, c: 'recall', t: [4] })),
    part('b', short({ marks: 1, wl: null, stem: 'Name the tube marked C.', model: '**Oviduct** (fallopian tube).', sol: 'Oviduct.', scheme: [['Oviduct', 1]], d: 1, c: 'recall', t: [4] })),
    part('c', short({ marks: 2, stem: 'After the operation on the left, why do the voice, beard and other male characters stay the same?', model: 'Only the **vas deferens** is cut; the **testes (B)** are untouched and go on secreting **testosterone** into the **blood**, which keeps the male secondary sexual characters.', sol: 'Testes still secrete testosterone into blood.', scheme: [['Testes not affected', 1], ['Testosterone still reaches the blood', 1]], d: 3, c: 'analysis', t: [4] })),
    part('d', short({ marks: 2, stem: 'After the operation on the right, why does menstruation continue?', model: 'The **ovaries (D)** still release eggs and secrete **oestrogen and progesterone**, so the **uterus (E)** still builds up its lining and sheds it each month. Only the **oviducts** are blocked.', sol: 'Ovaries and uterus unaffected.', scheme: [['Ovaries still secrete hormones', 1], ['Uterine cycle continues', 1]], d: 3, c: 'analysis', t: [4] })),
    part('e', short({ marks: 2, stem: 'Explain how each operation prevents conception.', model: '**Vasectomy:** sperms from the testes cannot pass the cut **vas deferens**, so the semen has **no sperms**. **Tubectomy:** the egg cannot pass the cut **oviduct**, so it **cannot meet any sperm** and fertilisation does not occur.', sol: 'Blocked paths for sperm and egg.', scheme: [['Vasectomy', 1], ['Tubectomy', 1]], d: 2, c: 'understanding', t: [4] })),
    part('f', short({ marks: 2, stem: 'Why are these methods advised only for couples who do not want any more children?', model: 'They are **permanent** methods. The cut tubes are **difficult to rejoin**, so the person may **not be able to have children** later.', sol: 'Permanent, hard to reverse.', scheme: [['Permanent', 1], ['Difficult to reverse', 1]], d: 2, c: 'understanding', t: [4] }), [
      short({ marks: 2, stem: 'State two reasons why a country needs to slow down the growth of its population.', model: '1. Its **land, water and food** are limited and are being used up faster than they are renewed.\n2. Slower growth lets **jobs, schools, housing and health care** keep pace, so the **quality of life** improves.', sol: 'Limited resources; better life.', scheme: [['First reason', 1], ['Second reason', 1]], d: 2, c: 'understanding', t: [4] }),
    ]),
  ],
}));
add('world-case', mk.case({
  stem: 'Study the graph and answer the questions.',
  passage: `The graph shows approximate UN milestones for the world population: ${WORLD.map(([yr, b]) => `${b} billion in ${yr}`).join(', ')}.`,
  d: 3, c: 'analysis',
  assets: [worldFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the shape of this growth curve.', model: '**J-shaped** (exponential) curve.', sol: 'J-shaped.', scheme: [['J-shaped', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', num({ stem: 'How many years did the world take to grow from 1 billion to 2 billion?', value: yearsBetween(1, 2), unit: 'years', sol: `${WORLD[1][0]} − ${WORLD[0][0]} = ${yearsBetween(1, 2)} years.`, scheme: [[`${yearsBetween(1, 2)} years`, 1]], d: 1, c: 'application', t: [1] })),
    part('c', num({ stem: 'How many years did it take to grow from 7 billion to 8 billion?', value: yearsBetween(7, 8), unit: 'years', sol: `${WORLD[7][0]} − ${WORLD[6][0]} = ${yearsBetween(7, 8)} years.`, scheme: [[`${yearsBetween(7, 8)} years`, 1]], d: 1, c: 'application', t: [1] })),
    part('d', short({ marks: 3, stem: 'Explain why each additional billion has been added in less time than the one before.', model: 'The death rate fell sharply after about 1900 because of **vaccines, antibiotics, clean water and more food**, while the birth rate stayed high in many countries. Each year, a **larger population** also means **more parents**, so even the same rate of growth adds **more people** than before.', sol: 'Falling death rate; larger base.', scheme: [['Death rate fell', 1], ['Birth rate stayed high', 1], ['Larger population adds more people each year', 1]], d: 3, c: 'analysis', t: [1] })),
    part('e', short({ marks: 2, stem: 'State two effects of such rapid growth on the environment.', model: '1. **Forests are cleared** for farms and cities, and wildlife loses its habitat.\n2. More vehicles, factories and waste cause **air and water pollution**, and resources such as groundwater are **over-used**.', sol: 'Deforestation; pollution.', scheme: [['First effect', 1], ['Second effect', 1]], d: 2, c: 'understanding', t: [3] })),
    part('f', short({ marks: 2, stem: 'Suggest two ways in which the growth of population can be slowed.', model: '1. **Educating girls**, which leads to later marriage and smaller families.\n2. Spreading **awareness of family planning** and the small family norm through health centres.', sol: 'Education; family planning.', scheme: [['First way', 1], ['Second way', 1]], d: 2, c: 'application', t: [4] })),
  ],
}));
add('india-case', mk.case({
  stem: 'Study the bar chart and answer the questions.',
  passage: `The bar chart shows the population of India at each Census from 1951 to 2011, in crore (1 crore = 10 million): ${INDIA.map(([yr, v]) => `${yr}: ${v}`).join('; ')}.`,
  d: 3, c: 'application',
  assets: [indiaFig],
  children: [
    part('a', num({ stem: 'By how many crore did the population rise between the Census of 2001 and that of 2011?', value: censusRise(2001, 2011), unit: 'crore', sol: `$121.1 - 102.9 = ${censusRise(2001, 2011)}$ crore.`, scheme: [[`${censusRise(2001, 2011)} crore`, 1]], d: 1, c: 'application', t: [1] })),
    part('b', num({ marks: 2, stem: 'Express this rise as a percentage of the 2001 population (to one decimal place).', value: censusPct(2001, 2011), tol: 0.1, unit: '%', sol: `$\\dfrac{18.2}{102.9} \\times 100 \\approx ${censusPct(2001, 2011)}$ per cent.`, scheme: [['Divides the rise by the 2001 figure', 1], [`${censusPct(2001, 2011)} per cent`, 1]], d: 3, c: 'application', t: [2] })),
    part('c', short({ marks: 2, stem: 'Although the percentage growth each decade has slowed since 1991, the number of people added each decade has stayed very large. Why?', model: 'The percentage is applied to an **ever larger population**. Even a smaller rate of growth, applied to more than a hundred crore people, **adds many crore** each decade.', sol: 'Smaller rate on a larger base.', scheme: [['Larger base population', 1], ['Smaller rate still adds many people', 1]], d: 3, c: 'analysis', t: [1, 2] })),
    part('d', short({ marks: 2, stem: 'State two problems that such a large rise creates in Indian cities.', model: '1. **Shortage of housing**, with the growth of crowded **slums**.\n2. **Overloaded services**: traffic jams, shortage of water and power, and crowded schools and hospitals.', sol: 'Housing; services.', scheme: [['First problem', 1], ['Second problem', 1]], d: 2, c: 'understanding', t: [3] })),
    part('e', short({ marks: 3, stem: 'Suggest three measures, other than surgical methods, that can help to slow population growth.', model: '1. **Education**, especially of girls, so that they marry later and choose smaller families.\n2. **Awareness** of the **small family norm** and of family planning through health workers and the media.\n3. Better **health care for mothers and infants**, so that parents do not feel they need many children for some to survive.', sol: 'Education, awareness, child health.', scheme: [['First measure', 1], ['Second measure', 1], ['Third measure', 1]], d: 2, c: 'application', t: [4] })),
  ],
}));
add('percapita-case', mk.case({
  passage: `Two neighbouring villages, Sonpur and Ramgarh, each earned the same total income of ${rs(VILLAGE.income)} last year. Sonpur has ${lakh(VILLAGE.popBefore)} people; Ramgarh, where families are larger, has ${lakh(VILLAGE.popAfter)}. Ramgarh's school has 60 children in each class, and its only well runs dry every May.`,
  d: 3, c: 'analysis',
  children: [
    part('a', num({ stem: 'Calculate the per capita income of Sonpur (in rupees).', value: VILLAGE.pcBefore, sol: `${rs(VILLAGE.income)} ÷ ${lakh(VILLAGE.popBefore)} = ${VILLAGE.pcBefore}.`, scheme: [[`${rs(VILLAGE.pcBefore)}`, 1]], d: 1, c: 'application', t: [3] })),
    part('b', num({ stem: 'Calculate the per capita income of Ramgarh (in rupees).', value: VILLAGE.pcAfter, sol: `${rs(VILLAGE.income)} ÷ ${lakh(VILLAGE.popAfter)} = ${VILLAGE.pcAfter}.`, scheme: [[`${rs(VILLAGE.pcAfter)}`, 1]], d: 1, c: 'application', t: [3] })),
    part('c', short({ marks: 2, stem: 'Which village is likely to have the lower standard of living? Give a reason.', model: '**Ramgarh.** The same income is shared by **more people**, so each person has **less money** for food, clothing, education and health care.', sol: 'Ramgarh: lower per capita income.', scheme: [['Ramgarh', 1], ['Same income shared by more people', 1]], d: 2, c: 'analysis', t: [3] })),
    part('d', short({ marks: 3, stem: 'Using the information about the school and the well, explain how a large population puts pressure on services and resources. Add one more example.', model: 'With more children than the school was built for, classes of **60** mean **less attention** for each child. The **well runs dry** because more people draw more water than the rains put back, an example of **over-exploitation**. Another example: the village **health centre** becomes overcrowded, or nearby **trees are cut** for fuel.', sol: 'School, water, one more.', scheme: [['School overcrowding explained', 1], ['Well: over-use of water', 1], ['One more example', 1]], d: 3, c: 'application', t: [3] })),
    part('e', short({ marks: 3, stem: 'Ramgarh decides to run an awareness programme. Suggest three points it should include.', model: '1. The advantages of a **small family**: more food, care and education for each child.\n2. **Education of girls** and the legal age of marriage, so that they marry later.\n3. Information on **family planning** methods available at health centres, including permanent methods for couples who want no more children.', sol: 'Small family, girls\' education, family planning.', scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]], d: 2, c: 'application', t: [4] }), [
      short({ marks: 3, stem: 'State three other problems that rapid population growth can cause in a village like Ramgarh.', model: '1. **Unemployment**, as farm land is divided into smaller plots that cannot employ everyone.\n2. **Price rise** of food and land, as demand grows faster than supply.\n3. **Pollution** of ponds and fields by more sewage and garbage.', sol: 'Unemployment, prices, pollution.', scheme: [['First problem', 1], ['Second problem', 1], ['Third problem', 1]], d: 2, c: 'understanding', t: [3] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- further bank items
{
  const rises = INDIA.slice(1).map(([yr, v], i) => ({ from: INDIA[i][0], to: yr, rise: censusRise(INDIA[i][0], yr) }));
  const best = rises.reduce((m, x) => (x.rise > m.rise ? x : m));
  const others = rises.filter((x) => x !== best);
  add('census-mcq', mcq({
    stem: 'Study the bar chart of the Census of India. Between which two Census years did the population rise by the largest number of people?',
    right: `${best.from} and ${best.to}`, wrong: [`${others.at(-1).from} and ${others.at(-1).to}`, `${others[0].from} and ${others[0].to}`, `${others[3].from} and ${others[3].to}`],
    sol: `Rises in crore: ${rises.map((x) => `${x.from}–${x.to}: ${x.rise}`).join('; ')}. The largest is ${best.rise} crore, between ${best.from} and ${best.to}, just ahead of the last decade — option (@K).`,
    d: 4, c: 'analysis', t: [1, 2],
    assets: [indiaFig],
  }), (q) => (best.from === 1991 && best.rise === 18.3) || 'largest decade');
}
add('dr-num', num({
  stem: 'In a village of 8,000 people, 120 people died during the year. Calculate the death rate (per 1000 people per year).',
  value: perThousand(120, 8000),
  sol: `Death rate $= \\dfrac{120}{8000} \\times 1000 = ${perThousand(120, 8000)}$ per 1000 per year.`,
  scheme: [[`${perThousand(120, 8000)}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 15 || 'value');
add('decline-tf', tf({
  stem: 'If the birth rate of a country falls below its death rate, its population will decrease, ignoring migration.',
  key: 't',
  sol: 'True. More people die than are born each year, so the growth rate becomes negative.',
  d: 2, c: 'understanding', t: [2],
}));
add('smallfamily-mcq', mcq({
  stem: 'Which measure helps to lower the birth rate without any surgery?',
  right: 'Educating girls and spreading awareness of the small family norm', wrong: ['Building more homes for the elderly', 'Encouraging early marriage', 'Setting up more factories in villages'],
  sol: 'Educated girls tend to marry later and choose smaller families — option (@K).',
  d: 2, c: 'application', t: [4],
}));
