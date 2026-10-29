// ch11 Organisms and Populations — question bank. AR keys: d a c b a d.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { rate, nextN, expN, logisticRate, round, R } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 population attributes
{
  const N = 120, died = 6, d = rate(died, N, 3);
  add('deathrate-num', num({
    stem: `In a laboratory culture of ${N} flour beetles, ${died} beetles died during one month. What is the per capita death rate per month?`,
    value: d, tol: 0.0005,
    sol: r`Death rate $= \dfrac{${died}}{${N}} = ${d}$ deaths per beetle per month.`,
    scheme: [[`${d}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 0.05 || 'value');
}
{
  const N = 80, born = 20, b = rate(born, N, 2);
  add('birthrate-num', num({
    stem: `A herd of ${N} deer produced ${born} fawns in a breeding season. Calculate the birth rate per deer per season.`,
    value: b, tol: 0.005,
    sol: r`Birth rate $= \dfrac{${born}}{${N}} = ${b}$ offspring per deer per season.`,
    scheme: [[`${b}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 0.25 || 'value');
}
{
  const f = 360, m = 240, p = Math.round((f / (f + m)) * 100);
  add('sexratio-num', num({
    stem: `A survey of a bird population counted ${f} females and ${m} males. What percentage of the population is female?`,
    value: p, unit: '%',
    sol: r`Females $= \dfrac{${f}}{${f} + ${m}} \times 100 = \dfrac{${f}}{${f + m}} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}%`, 1]],
    d: 1, c: 'application', t: [1],
  }), (q) => q.answer.value === 60 || 'value');
}
{
  const pre = 300, rep = 500, post = 200, p = Math.round((rep / (pre + rep + post)) * 100);
  add('agegroup-num', num({
    stem: `A population has ${pre} pre-reproductive, ${rep} reproductive and ${post} post-reproductive individuals. What percentage of the population is in the reproductive age group?`,
    value: p, unit: '%',
    sol: r`Total $= ${pre} + ${rep} + ${post} = ${pre + rep + post}$; reproductive $= \dfrac{${rep}}{${pre + rep + post}} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}%`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 50 || 'value');
}
add('urn-mcq', mcq({
  stem: 'Which shape of age pyramid indicates a declining population?',
  right: 'Urn-shaped, with a narrow base of pre-reproductive individuals',
  wrong: ['Triangular, with a broad base of pre-reproductive individuals', 'Bell-shaped, with similar young and reproductive groups', 'Any pyramid with more females than males'],
  sol: 'A narrow base means fewer young individuals to replace the reproductive ones, so the population declines — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('tiger-mcq', mcq({
  stem: 'Tiger census in national parks and tiger reserves is often based on',
  right: 'pugmarks and fecal pellets',
  wrong: ['counting every tiger seen from a jeep', 'percent cover of tigers', 'the number of tigers caught per trap'],
  sol: 'Tigers are elusive, so indirect signs such as pugmarks and fecal pellets are used — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cover-mcq', mcq({
  stem: 'A plot contains 200 Parthenium plants and a single huge banyan tree whose canopy covers most of the plot. Which measure best describes the importance of the banyan population in the plot?',
  right: 'Percent cover or biomass',
  wrong: ['Number of individuals', 'Number of fruits per year', 'Number caught per trap'],
  sol: 'A count of one tree would greatly underestimate its role; percent cover or biomass is more meaningful — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('trap-mcq', mcq({
  stem: 'A fisheries officer wants to know whether the fish population of a lake is rising or falling from year to year, without counting every fish. What should she record?',
  right: 'The number of fish caught per trap each year',
  wrong: ['The weight of the largest fish', 'The total area of the lake', 'The number of species in the lake'],
  sol: 'A relative density such as catch per trap is enough to compare years — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('attribute-mcq', mcq({
  stem: 'Which of these is an attribute of a population but not of an individual?',
  right: 'Sex ratio',
  wrong: ['Age', 'Sex', 'Body weight'],
  sol: 'An individual is male or female; only a population has a sex ratio — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('pyramid-tf', tf({
  stem: 'An expanding (growing) population has an age pyramid with a broad base.',
  key: 't',
  sol: 'True. A large pre-reproductive group means the population will grow.',
  d: 1, c: 'recall', t: [1],
}));
add('pellet-fill', fill({
  stem: 'Besides pugmarks, a tiger census often uses ______ pellets as indirect evidence.',
  acc: [['fecal', 'faecal']],
  sol: 'Fecal.',
  d: 1, c: 'recall', t: [1],
}));
add('pyramid-ar', ar({
  a: 'An urn-shaped age pyramid indicates a growing population.',
  r: 'In an urn-shaped pyramid the pre-reproductive group is smaller than the reproductive group.',
  key: 'd',
  sol: 'A narrow base means fewer young will enter the reproductive group, so the population declines; A is false and R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('attr-short', short({
  marks: 2,
  stem: 'Define natality and mortality. Why are they expressed per individual rather than as totals?',
  model: '**Natality** is the number of **births** and **mortality** the number of **deaths** in a population during a given period. They are expressed **per individual (per capita)** because a total means little without the population size; per capita rates allow populations of **different sizes** to be compared.',
  sol: 'Definitions and reason.',
  scheme: [['Both definitions', 1], ['Per capita allows comparison', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('density-short', short({
  marks: 2,
  stem: 'Why is it not always necessary to count every individual to estimate population density? Give two methods used instead.',
  model: 'Often we only need to know whether a population is **changing** or how it **compares** with another, so a **relative density** is enough, and counting may be **impossible** (for example bacteria). Methods: **fish caught per trap**; **pugmarks and fecal pellets** for tigers; **percent cover or biomass** for plants.',
  sol: 'Reason and two methods.',
  scheme: [['Reason', 1], ['Two methods', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('pyramid-short', short({
  marks: 3,
  stem: 'Country X has 42 percent of its people below reproductive age and 8 percent above it; country Y has 18 percent below and 22 percent above. Describe the likely shape of each age pyramid and predict how each population will change.',
  model: '**Country X:** a large pre-reproductive group and a small post-reproductive group give a **triangular pyramid with a broad base** — an **expanding** population that will **grow** as the young reach reproductive age.\n\n**Country Y:** a small pre-reproductive group, smaller than the older groups above it, gives an **urn-shaped pyramid with a narrow base** — a **declining** population, as too few young will replace the reproductive adults.',
  sol: 'Shapes and predictions.',
  scheme: [['X: broad base, expanding', 1], ['Y: narrow base, urn-shaped', 1], ['Predictions with reason', 1]],
  d: 3, c: 'application', t: [1],
}));
add('attr-long', long({
  stem: 'Describe the attributes of a population that an individual does not have. Explain how age pyramids show the growth status of a population, and how population density can be estimated.',
  model: '**Attributes.** A population has a birth rate and a death rate, expressed per capita, for example 0.4 offspring per lotus plant per year; a sex ratio, such as 60 percent females and 40 percent males; an age distribution; and a population density.\n\n**Age pyramids.** When the percentage of individuals in each age group is plotted, the result is an age pyramid, with pre-reproductive individuals at the base, reproductive ones in the middle and post-reproductive ones at the top. A triangular pyramid with a broad base shows an expanding population; a bell shape shows a stable one; an urn shape with a narrow base shows a declining one.\n\n**Density.** Population size in an area need not always be a count. Percent cover or biomass is better where individuals differ greatly in size, as with one banyan tree among many Parthenium plants. Relative densities, such as fish caught per trap, are often enough. Tigers are counted from pugmarks and fecal pellets, and bacteria in a dish by indirect methods.',
  sol: 'Attributes, pyramids, density methods.',
  scheme: [['Birth and death rates, sex ratio', 1.5], ['Three pyramid shapes with growth status', 2], ['Density estimation methods', 1.5]],
  wl: [80, 220],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 population growth
add('adds-mcq', mcq({
  stem: 'Which two processes increase the density of a population?',
  right: 'Natality and immigration',
  wrong: ['Mortality and emigration', 'Natality and emigration', 'Mortality and immigration'],
  sol: 'Births and individuals arriving add to the population — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('salmon-mcq', mcq({
  stem: 'Which of these organisms breeds only once in its lifetime?',
  right: 'Pacific salmon',
  wrong: ['Sparrow', 'Elephant', 'Human'],
  sol: 'Pacific salmon and bamboo breed only once; most birds and mammals breed many times — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('k-mcq', mcq({
  stem: 'The carrying capacity of a habitat for a species is',
  right: 'the maximum population size that the habitat’s resources can support',
  wrong: ['the rate at which the population grows when resources are unlimited', 'the number of individuals that emigrate each year', 'the per capita birth rate'],
  sol: 'K is the maximum number the habitat can support, beyond which no further growth is possible — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('jcurve-mcq', mcq({
  stem: 'A few bacteria are placed in a large flask of fresh nutrient medium. For the first few hours their number rises along a J-shaped curve. Why?',
  right: 'Resources are effectively unlimited, so the population grows exponentially.',
  wrong: ['The population has reached its carrying capacity.', 'Emigration is greater than immigration.', 'The death rate is greater than the birth rate.'],
  sol: 'With unlimited resources each individual reproduces at its full potential, giving exponential (J-shaped) growth — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('asymptote-mcq', mcq({
  stem: 'A yeast population has stopped increasing and stays close to its carrying capacity. Which statement is true at this stage?',
  right: 'Births and deaths (with migration) balance, so the growth rate is about zero.',
  wrong: ['The population is in its lag phase.', 'The population is growing exponentially.', 'The birth rate has become zero.'],
  sol: 'At the asymptote N is near K, so (K − N)/K is near zero and additions balance losses — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('realistic-mcq', mcq({
  stem: 'Why is the logistic growth model considered more realistic than the exponential model?',
  right: 'Resources for growth in nature are finite and become limiting sooner or later.',
  wrong: ['Populations in nature never have a lag phase.', 'Birth rates always rise as populations grow.', 'Natural populations have no carrying capacity.'],
  sol: 'Because resources are limited, growth must eventually slow and level off — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('oyster-mcq', mcq({
  stem: 'A marine animal releases millions of tiny eggs into the open sea each season, and very few survive. Which pattern of life history does it show?',
  right: 'Many small-sized offspring, as in oysters and pelagic fishes',
  wrong: ['A few large-sized offspring, as in birds and mammals', 'Breeding only once, as in bamboo', 'No reproduction, as in sterile hybrids'],
  sol: 'Producing a large number of small offspring is the strategy of oysters and pelagic fishes — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('logistic-ar', ar({
  a: 'In logistic growth, the growth rate falls to zero when the population reaches the carrying capacity.',
  r: 'The factor (K − N)/K becomes zero when N equals K.',
  key: 'a',
  sol: 'Both are true; when N = K the factor (K − N)/K is zero, so dN/dt = 0 — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('exp-ar', ar({
  a: 'Exponential growth of a population gives a J-shaped curve.',
  r: 'In exponential growth, the population increases by the same number of individuals each year.',
  key: 'c',
  sol: 'A is true. R is false: the increase is a fixed fraction of the current size, so the number added grows each year — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
{
  const Nt = 800, B = 90, I = 20, D = 70, E = 30, n = nextN(Nt, B, I, D, E);
  add('nextn-num', num({
    stem: `A population of ${Nt} rabbits had ${B} births, ${I} immigrants, ${D} deaths and ${E} emigrants in a year. What is the population at the end of the year?`,
    value: n,
    sol: r`$N_{t+1} = ${Nt} + [(${B} + ${I}) - (${D} + ${E})] = ${Nt} + (${B + I} - ${D + E}) = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 810 || 'value');
}
{
  const N = 2000, g = round(R.rat * N, 1);
  add('exprate-num', num({
    stem: `A Norway rat population of ${N} grows exponentially with r = ${R.rat} per rat per year. What is its growth rate (dN/dt) in rats per year at this size?`,
    value: g,
    sol: r`$\dfrac{dN}{dt} = rN = ${R.rat} \times ${N} = ${g}$ rats per year.`,
    scheme: [[`${g}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 30 || 'value');
}
{
  const rr = 0.2, N = 300, K = 1200, g = round(logisticRate(rr, N, K), 1);
  add('lograte-num', num({
    stem: `A population with r = ${rr} has ${N} individuals in a habitat with carrying capacity ${K}. Using the logistic model, calculate its growth rate (dN/dt).`,
    value: g,
    sol: r`$\dfrac{dN}{dt} = rN\left(\dfrac{K - N}{K}\right) = ${rr} \times ${N} \times \dfrac{${K - N}}{${K}} = ${g}$.`,
    scheme: [[`${g}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 45 || 'value');
}
{
  const b = 0.06, d = 0.025, rv = round(b - d, 3);
  add('r-num', num({
    stem: `In a population the per capita birth rate is ${b} and the per capita death rate is ${d} per year. What is the intrinsic rate of natural increase, r?`,
    value: rv, tol: 0.0005,
    sol: r`$r = b - d = ${b} - ${d} = ${rv}$ per individual per year.`,
    scheme: [[`${rv}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 0.035 || 'value');
}
{
  const N0 = 100, rr = 0.1, t = 10, n = round(expN(N0, rr, t), 1);
  add('ent-num', num({
    stem: `A population of ${N0} grows exponentially with r = ${rr} per day. Using N(t) = N(0)e^(rt), find the population after ${t} days. (Take e = 2.718.)`,
    value: n, tol: 0.2,
    sol: r`$N_t = ${N0}\, e^{${rr} \times ${t}} = ${N0}\, e^{1} = ${N0} \times 2.718 \approx ${n}$.`,
    scheme: [[`${n} (about 272)`, 1]],
    d: 4, c: 'application', t: [2],
  }), (q) => Math.abs(q.answer.value - 271.8) < 0.05 || 'value');
}
add('growth-short', short({
  marks: 3,
  stem: 'Compare exponential and logistic growth of a population, giving the equation and the shape of the curve for each.',
  model: '**Exponential growth** occurs when **resources are unlimited**: $dN/dt = rN$, where r is the intrinsic rate of natural increase. The curve is **J-shaped**.\n\n**Logistic growth** occurs when **resources are limited**: $dN/dt = rN(K - N)/K$, where K is the **carrying capacity**. The curve is **S-shaped (sigmoid)**, with lag, acceleration, deceleration and an asymptote at K; it is more realistic.',
  sol: 'Conditions, equations and curves.',
  scheme: [['Exponential: unlimited resources, equation, J-shape', 1.5], ['Logistic: limited resources, equation, S-shape with K', 1.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('island-short', short({
  marks: 2,
  stem: 'A newly formed volcanic island is colonised by a species of lizard. Which process mainly increases the lizard population at first, and which takes over later? Explain.',
  model: 'At first, **immigration** is the main source, since lizards arrive from elsewhere to **colonise the new habitat**. Once a breeding population is established, **natality (births)** becomes the main way the population grows, as under normal conditions births and deaths matter most.',
  sol: 'Immigration first, then births.',
  scheme: [['Immigration during colonisation', 1], ['Births dominate later', 1]],
  d: 3, c: 'application', t: [2],
}));
add('lifehist-short', short({
  marks: 2,
  stem: 'What is meant by life history variation? Give one example each of an organism that breeds only once and one that produces a few large offspring.',
  model: 'Populations evolve the **reproductive strategy** that maximises their **reproductive (Darwinian) fitness** in their habitat, so species differ in how often they breed and how many offspring they produce. Breeds once: **Pacific salmon** (or bamboo). Few large offspring: **birds or mammals**.',
  sol: 'Meaning and examples.',
  scheme: [['Meaning: maximising reproductive fitness', 1], ['Two examples', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('rcompare-short', short({
  marks: 2,
  stem: `The r value of the flour beetle is ${R.beetle} and that of the Norway rat is ${R.rat}. Which population would grow faster under unlimited resources, and how many times faster per individual?`,
  model: `The **flour beetle** would grow faster, because its intrinsic rate of natural increase is higher. Per individual it grows $${R.beetle} \\div ${R.rat} = ${round(R.beetle / R.rat, 0)}$ times as fast, since under exponential growth dN/dt = rN.`,
  sol: 'Ratio of r values.',
  scheme: [['Flour beetle, higher r', 1], [`${round(R.beetle / R.rat, 0)} times`, 1]],
  d: 2, c: 'application', t: [2],
}), () => round(R.beetle / R.rat, 0) === 8 || 'ratio');
add('growth-long', long({
  stem: 'Explain how the density of a population changes. Describe the exponential and logistic models of population growth with their equations and curves, and explain why the logistic model is more realistic.',
  model: '**Changes in density.** Population density changes through four processes. Natality (B) and immigration (I) add individuals; mortality (D) and emigration (E) remove them, so N at time t + 1 equals N at time t plus (B + I) minus (D + E).\n\n**Exponential growth.** When food and space are unlimited, each species can realise its full potential. If b and d are the per capita birth and death rates, the growth rate is (b − d)N, written dN/dt = rN, where r is the intrinsic rate of natural increase (for example 0.12 for the flour beetle). The population follows N(t) = N(0)e^(rt), a J-shaped curve, and can reach enormous densities in a short time.\n\n**Logistic growth.** In nature, a habitat can support only a maximum number, its carrying capacity K. A population with limited resources shows a lag phase, then acceleration, deceleration and an asymptote at K, giving an S-shaped (sigmoid) curve. This Verhulst-Pearl model is written dN/dt = rN(K − N)/K.\n\n**Realism.** Resources for growth are finite for most populations and become limiting sooner or later, so competition slows growth; the logistic model is therefore more realistic.',
  sol: 'Density changes; two models; realism.',
  scheme: [['Four processes and equation', 1], ['Exponential model with equation and J-curve', 1.5], ['Logistic model with K, phases and S-curve', 1.5], ['Why logistic is more realistic', 1]],
  wl: [80, 230],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 population interactions
add('pisaster-mcq', mcq({
  stem: 'When the predatory starfish Pisaster was removed from an enclosed rocky intertidal area, what happened to the invertebrate community within a year?',
  right: 'More than 10 invertebrate species became extinct because of increased competition.',
  wrong: ['The number of invertebrate species doubled.', 'All invertebrates migrated away.', 'Nothing changed, as starfish do not affect prey.'],
  sol: 'Without the predator, competition among prey increased and many species were eliminated, showing that predators maintain diversity — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('mutual-mcq', mcq({
  stem: 'Which pair shows mutualism?',
  right: 'A fungus and an alga forming a lichen',
  wrong: ['A cuckoo and a crow', 'Cuscuta and a hedge plant', 'An orchid growing on a mango branch'],
  sol: 'In a lichen both partners benefit; the others are parasitism and commensalism — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('prickly-mcq', mcq({
  stem: 'An exotic weed introduced into a new country spreads rapidly and damages farmland. Which approach, used against the prickly pear cactus in Australia, would control it?',
  right: 'Introducing a natural predator of the weed from its original habitat',
  wrong: ['Introducing a competitor of the farm crops', 'Removing all insects from the area', 'Adding fertiliser to the weed'],
  sol: 'An invasive species often spreads because its natural predators are absent; introducing one is the basis of biological control — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('monarch-mcq', mcq({
  stem: 'Why do birds avoid eating the monarch butterfly?',
  right: 'It is highly distasteful because of a chemical its caterpillar acquires by feeding on a poisonous weed.',
  wrong: ['It is coloured exactly like its background.', 'It has thorns on its wings.', 'It produces cardiac glycosides in its own body from sunlight.'],
  sol: 'The caterpillar takes up a chemical from a poisonous weed, making the butterfly distasteful — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('calotropis-mcq', mcq({
  stem: 'Cattle and goats do not browse on Calotropis because it',
  right: 'produces highly poisonous cardiac glycosides',
  wrong: ['has long thorns', 'grows only underwater', 'has no leaves'],
  sol: 'Calotropis defends itself chemically with cardiac glycosides — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('abingdon-mcq', mcq({
  stem: 'The Abingdon tortoise of the Galapagos Islands became extinct within a decade of goats being introduced. Which interaction explains this?',
  right: 'Competition, as goats browsed more efficiently',
  wrong: ['Predation of tortoises by goats', 'Mutualism between goats and tortoises', 'Parasitism of tortoises by goats'],
  sol: 'The goats’ greater browsing efficiency made them the superior competitor — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('warbler-mcq', mcq({
  stem: 'Two closely related bird species live on the same trees and eat insects, but one feeds only at the tips of high branches and the other only near the trunk. What allows them to coexist?',
  right: 'Resource partitioning',
  wrong: ['Competitive exclusion', 'Brood parasitism', 'Commensalism'],
  sol: 'By foraging in different parts of the tree they avoid competition, as MacArthur showed for warblers — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cuscuta-mcq', mcq({
  stem: 'Cuscuta, which grows on hedge plants, is best described as',
  right: 'a parasitic plant that lacks chlorophyll and takes nutrition from its host',
  wrong: ['an epiphyte that harms nobody', 'a mutualist that supplies its host with sugar', 'a predator that eats insects'],
  sol: 'Cuscuta has no chlorophyll and derives nutrition from the host plant — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cuckoo-mcq', mcq({
  stem: 'A crow incubates eggs laid by a koel in its nest and fails to notice the difference. Which feature of the koel’s eggs makes this possible?',
  right: 'They resemble the crow’s eggs in size and colour.',
  wrong: ['They are much larger than the crow’s eggs.', 'They hatch only after the crow leaves.', 'They are buried under the nest.'],
  sol: 'In brood parasitism the parasite’s eggs have evolved to resemble the host’s, reducing detection — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('clown-mcq', mcq({
  stem: 'A clown fish lives among the stinging tentacles of a sea anemone, which protect it from predators; the anemone is not known to gain or lose. This is an example of',
  right: 'commensalism',
  wrong: ['parasitism', 'competition', 'amensalism'],
  sol: 'One partner benefits and the other is unaffected: commensalism (+, 0) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ophrys-mcq', mcq({
  stem: 'Ophrys orchids are pollinated by male bees attracted to a petal that looks like a female bee. If the colour pattern of the female bee changed slightly during evolution, what would most likely happen?',
  right: 'Pollination success would fall unless the orchid co-evolved to match.',
  wrong: ['Pollination would increase because males prefer new colours.', 'The orchid would switch to wind pollination at once.', 'Nothing, as bees do not use colour.'],
  sol: 'The deceit depends on close resemblance, so the orchid must co-evolve with the bee — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('fig-mcq', mcq({
  stem: 'In the fig–wasp relationship, what does the female wasp gain?',
  right: 'A site to lay eggs, with developing seeds to nourish its larvae',
  wrong: ['Nectar only', 'Protection from predators in the leaves', 'Nothing; it is a parasite of the fig'],
  sol: 'The wasp uses the fig fruit for oviposition and its seeds for larval food, while pollinating the fig — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('parasite-tf', tf({
  stem: 'Adaptations of many parasites include the loss of the digestive system and a high reproductive capacity.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('lichen-fill', fill({
  stem: 'A lichen is a mutualistic association between a fungus and photosynthesising ______ or cyanobacteria.',
  acc: [['algae', 'alga']],
  sol: 'Algae.',
  d: 1, c: 'recall', t: [3],
}));
add('phyto-fill', fill({
  stem: 'Nearly ______ percent of all insects are phytophagous (feed on plant sap and other parts of plants).',
  acc: [['25', 'twenty-five', 'twenty five']],
  sol: '25.',
  d: 1, c: 'recall', t: [3],
}));
add('fluke-ar', ar({
  a: 'Many parasites are host-specific.',
  r: 'The human liver fluke needs a snail and a fish as intermediate hosts to complete its life cycle.',
  key: 'b',
  sol: 'Both are true, but R describes the complex life cycle of one parasite and does not explain host specificity — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('egret-ar', ar({
  a: 'The cattle egret and grazing cattle show commensalism.',
  r: 'The egret feeds on insects stirred up by the cattle, while the cattle are neither harmed nor benefited.',
  key: 'a',
  sol: 'Both are true; one benefits and the other is unaffected, which defines commensalism — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('gause-ar', ar({
  a: 'Two closely related species competing for exactly the same resources can coexist indefinitely.',
  r: 'Under competitive exclusion, the competitively inferior species is eventually eliminated.',
  key: 'd',
  sol: 'Gause’s principle says they cannot coexist indefinitely; A is false and R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('interaction-match', match({
  stem: 'Match each pair of organisms (column I) with the interaction it shows (column II).',
  pairs: [
    ['Fig and its wasp', 'Mutualism'],
    ['Balanus and Chthamalus', 'Competition'],
    ['Koel and crow', 'Brood parasitism'],
    ['Barnacles on a whale', 'Commensalism'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Fig–wasp mutualism; barnacles competing; koel–crow brood parasitism; barnacles on whale commensalism.',
  d: 2, c: 'understanding', t: [3],
}));
add('classify-short', short({
  marks: 3,
  stem: 'Name the interaction, with the effect on each partner (+, − or 0), in each case: (i) mycorrhizal fungi on pine roots; (ii) lice on a human head; (iii) an orchid growing on a mango branch.',
  model: '(i) **Mutualism (+, +):** the fungus helps the roots absorb nutrients, and the plant supplies energy-yielding carbohydrates.\n\n(ii) **Parasitism (+, −):** lice are ectoparasites that feed on the host and harm it.\n\n(iii) **Commensalism (+, 0):** the orchid gains support and access to light, while the mango is neither harmed nor benefited.',
  sol: 'Three interactions with signs.',
  scheme: [['Mutualism with signs', 1], ['Parasitism with signs', 1], ['Commensalism with signs', 1]],
  d: 2, c: 'application', t: [3],
}));
add('parasite-short', short({
  marks: 3,
  stem: 'Describe three special adaptations of parasites, and explain how parasites can affect the population of their host.',
  model: 'Adaptations: **loss of unnecessary sense organs**; **adhesive organs or suckers** to cling to the host; **loss of the digestive system**; **high reproductive capacity**; complex life cycles with **intermediate hosts** (the liver fluke uses a snail and a fish).\n\nEffects: parasites **reduce the survival, growth and reproduction** of the host and can **lower its population density**; a weakened host may also become **easier prey** for predators.',
  sol: 'Three adaptations and effects.',
  scheme: [['Three adaptations', 2], ['Effect on host population', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('predation-short', short({
  marks: 2,
  stem: 'State two important roles of predators in an ecosystem, with an example of one.',
  model: 'Predators **transfer energy** fixed by plants to higher trophic levels and **keep prey populations under control**, as a moth controlled the prickly pear cactus in Australia. They also **maintain species diversity** by reducing competition among prey; removing the starfish Pisaster led to many extinctions.',
  sol: 'Two roles with an example.',
  scheme: [['Two roles', 1], ['Example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('competition-short', short({
  marks: 3,
  stem: 'On a rocky coast, the large barnacle Balanus occupies the lower shore and the small barnacle Chthamalus the upper shore. When Balanus was removed from the lower shore, Chthamalus spread downwards. Explain the result and name the principle it supports.',
  model: 'Chthamalus **can survive** on the lower shore, so its absence there was not due to physical conditions. It was **excluded by the larger, competitively superior Balanus**. When the competitor was removed, Chthamalus **expanded its range** — **competitive release**. The result supports **Gause’s competitive exclusion principle**: closely related species competing for the same resources cannot coexist indefinitely.',
  sol: 'Exclusion, release, Gause.',
  scheme: [['Exclusion by superior competitor', 1], ['Competitive release on removal', 1], ['Gause’s principle', 1]],
  d: 3, c: 'application', t: [3],
}));
add('mutualism-short', short({
  marks: 2,
  stem: 'Explain the mutualism between a fig and its pollinating wasp.',
  model: 'Each fig species is pollinated by **only one partner wasp species**. The female wasp **lays eggs in the fig fruit**, and its larvae feed on the **developing seeds**. While searching for egg-laying sites, the wasp **pollinates the fig inflorescence**, so both partners benefit.',
  sol: 'Benefits to each partner.',
  scheme: [['Benefit to wasp', 1], ['Benefit to fig: pollination', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('defence-short', short({
  marks: 2,
  stem: 'How do plants defend themselves against herbivores? Give two examples.',
  model: 'Plants cannot run away, so they use **morphological** and **chemical** defences. Thorns protect **Acacia** and **cactus**; **Calotropis** makes poisonous **cardiac glycosides**, so cattle and goats avoid it. Chemicals such as **nicotine, caffeine and quinine** are also defences.',
  sol: 'Morphological and chemical defences.',
  scheme: [['Morphological defence with example', 1], ['Chemical defence with example', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('interactions-long', long({
  stem: 'List the six kinds of population interaction with the effect of each on the two species, and explain mutualism, commensalism and parasitism with two examples each.',
  model: '**Kinds.** Mutualism (+, +); competition (−, −); predation (+, −); parasitism (+, −); commensalism (+, 0); amensalism (−, 0).\n\n**Mutualism.** Both species benefit. In lichens a fungus lives with photosynthesising algae or cyanobacteria. In mycorrhizae, fungi help plant roots absorb nutrients while the plant supplies carbohydrates. The fig and its wasp, and the Ophrys orchid and its bee, are plant–animal mutualisms.\n\n**Commensalism.** One species benefits and the other is unaffected. An orchid grows as an epiphyte on a mango branch, and barnacles grow on the back of a whale. The cattle egret feeds on insects stirred up by grazing cattle, and a clown fish shelters among the stinging tentacles of a sea anemone.\n\n**Parasitism.** The parasite benefits at the cost of the host. Ectoparasites such as lice on humans, ticks on dogs and Cuscuta on hedge plants feed from the surface; the human liver fluke is an endoparasite with a snail and a fish as intermediate hosts. In brood parasitism, the koel lays eggs resembling the crow’s in a crow’s nest.',
  sol: 'Six interactions; three explained with examples.',
  scheme: [['Six interactions with signs', 1.5], ['Mutualism with examples', 1], ['Commensalism with examples', 1], ['Parasitism with examples', 1.5]],
  wl: [80, 230],
  d: 2, c: 'understanding', t: [3],
}));
add('predation-long', long({
  stem: 'Explain the importance of predation in nature, with examples, and describe how prey animals and plants defend themselves.',
  model: '**Importance.** Predation is nature’s way of transferring the energy fixed by plants to higher trophic levels. Predators keep prey populations under control: the prickly pear cactus introduced into Australia in the early 1930s spread unchecked until a cactus-feeding moth from its natural habitat was introduced, the principle of biological control. Predators also maintain species diversity by reducing competition among prey; when the starfish Pisaster was removed from rocky intertidal communities on the American Pacific coast, more than 10 invertebrate species became extinct within a year.\n\n**Prey defences in animals.** Some insects and frogs are cryptically coloured (camouflaged). Others are poisonous or distasteful, like the monarch butterfly, whose caterpillar acquires a chemical by feeding on a poisonous weed.\n\n**Plant defences.** Nearly 25 percent of insects are phytophagous, and plants cannot run away. Thorns defend Acacia and cactus. Calotropis produces highly poisonous cardiac glycosides, so cattle and goats do not browse it. Nicotine, caffeine, quinine, strychnine and opium are also chemical defences against grazers and browsers.',
  sol: 'Roles of predation; animal and plant defences.',
  scheme: [['Energy transfer and population control (prickly pear)', 1.5], ['Diversity (Pisaster)', 1], ['Animal defences', 1], ['Plant defences', 1.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [3],
}));
add('competition-long', long({
  stem: 'What is competition between species? Using evidence from tortoises, barnacles and warblers, evaluate how far Gause’s competitive exclusion principle holds in nature.',
  model: '**Competition.** It is an interaction in which the fitness of one species, measured by its r, is significantly lower in the presence of another. It occurs between closely related and unrelated species (flamingoes and fishes compete for zooplankton in some South American lakes), and even when resources are plentiful, through interference.\n\n**Gause’s principle.** Two closely related species competing for the same resources cannot coexist indefinitely; the competitively inferior one is eventually eliminated.\n\n**Supporting evidence.** On the Galapagos, the Abingdon tortoise became extinct within a decade after goats were introduced, because of the goats’ greater browsing efficiency. On Scottish rocky coasts, the larger barnacle Balanus excludes the smaller Chthamalus from the intertidal zone; when Balanus is removed, Chthamalus expands its range (competitive release).\n\n**Limits.** MacArthur found five closely related warbler species living on the same tree that coexisted, because they foraged in different ways (resource partitioning). So exclusion follows only when species use resources in exactly the same way; species that partition resources can coexist. The principle holds, but nature often finds ways around it.',
  sol: 'Definition; principle; supporting and limiting evidence; judgement.',
  scheme: [['Definition of competition', 1], ['Gause’s principle', 1], ['Tortoise and barnacle evidence', 1.5], ['Warblers and resource partitioning; evaluation', 1.5]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [3],
}));

// ---------------------------------------------------------------- cases
{
  const N = 400, B = 100, D = 60, I = 10, E = 30;
  const b = rate(B, N, 2), n1 = nextN(N, B, I, D, E);
  add('attributes-case', mk.case({
    passage: `Wildlife staff followed a population of ${N} spotted deer in a sanctuary for one year.\n\n| Process | Number |\n|---|---|\n| Fawns born | ${B} |\n| Deaths | ${D} |\n| Deer arriving from a nearby forest | ${I} |\n| Deer leaving the sanctuary | ${E} |\n\nAt the end of the year, 45 percent of the deer were fawns and yearlings (pre-reproductive), 45 percent were breeding adults and 10 percent were old.`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'What was the birth rate per deer for the year?',
        value: b, tol: 0.005,
        sol: r`Birth rate $= \dfrac{${B}}{${N}} = ${b}$ fawns per deer per year.`,
        scheme: [[`${b}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What was the population at the end of the year?',
        value: n1,
        sol: r`$N_{t+1} = ${N} + [(${B} + ${I}) - (${D} + ${E})] = ${N} + (${B + I} - ${D + E}) = ${n1}$.`,
        scheme: [[`${n1}`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'What shape of age pyramid would this population have, and what does it predict?',
        model: 'A large pre-reproductive group (45 percent) and few old deer (10 percent) give a **broad-based, triangular pyramid**. This is an **expanding** population, which is expected to **keep growing** as the young deer reach breeding age.',
        sol: 'Broad base; expanding.',
        scheme: [['Broad-based triangular pyramid', 1], ['Expanding: will grow', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'The staff cannot see every deer in thick forest. Suggest how they could still estimate whether the population is rising or falling.',
          model: 'They could use **indirect, relative measures**, such as counts of **pellets (droppings)** or **hoof prints** along fixed paths each year, or sightings per kilometre walked. A rising or falling index shows the **trend** without counting every deer.',
          sol: 'Relative density indices.',
          scheme: [['An indirect measure', 1], ['Used to compare years', 1]],
          d: 3, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => (q.children[0].answer.value === 0.25 && q.children[1].answer.value === 420) || 'values');
}
{
  const K = 650, rr = 0.5, N = 130, g = round(logisticRate(rr, N, K), 1);
  add('growth-case', mk.case({
    passage: `A student grew yeast in a flask of nutrient medium and counted the cells (in thousands per millilitre) every 4 hours.\n\n| Time (h) | 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 |\n|---|---|---|---|---|---|---|---|---|\n| Yeast | 10 | 18 | 45 | 130 | 330 | 520 | 630 | 650 |\n\nAfter 28 hours the count stayed close to 650 for several more readings.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What kind of growth curve do these data give?',
        right: 'A sigmoid (S-shaped) logistic curve levelling off at about 650',
        wrong: ['A J-shaped curve that keeps rising', 'A straight line', 'A curve that falls from the start'],
        sol: 'Slow start, rapid rise, slowing and levelling off at a ceiling: logistic growth — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('b', num({
        stem: `Taking K = ${K} and r = ${rr} per hour, use the logistic equation to calculate the growth rate when N = ${N} (in thousands of cells per mL per hour).`,
        value: g,
        sol: r`$\dfrac{dN}{dt} = rN\left(\dfrac{K - N}{K}\right) = ${rr} \times ${N} \times \dfrac{${K - N}}{${K}} = ${g}$.`,
        scheme: [[`${g}`, 1]],
        d: 3, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why did the yeast population stop increasing after about 28 hours?',
        model: 'The flask has **limited resources** (nutrients, space) and wastes build up, so it reached its **carrying capacity (K)**, about 650. As N approached K, **competition** increased and births were balanced by deaths, so the growth rate fell to **about zero**.',
        sol: 'Carrying capacity reached.',
        scheme: [['Limited resources: carrying capacity', 1], ['Growth rate falls to zero as N nears K', 1]],
        d: 2, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Name the phases of the curve between 0–8 hours and 8–20 hours, and explain the difference.',
          model: '**0–8 hours: lag phase** — few cells, adjusting to the medium, so numbers rise slowly. **8–20 hours: acceleration (near-exponential) phase** — resources are plentiful and many cells are dividing, so numbers rise rapidly.',
          sol: 'Lag and acceleration phases.',
          scheme: [['Lag phase with reason', 1], ['Acceleration phase with reason', 1]],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 52 || 'value');
}
add('interaction-case', mk.case({
  passage: 'On a rocky sea shore, a predatory starfish feeds on mussels, barnacles and snails. Ecologists removed all starfish from one stretch of shore and kept them out for a year. Mussels quickly covered most of the rocks, and the number of invertebrate species in that stretch fell from 15 to 8. On an unchanged stretch nearby, all 15 species remained.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which interaction between the mussels and other invertebrates caused the loss of species?',
      right: 'Competition for space',
      wrong: ['Mutualism', 'Commensalism', 'Brood parasitism'],
      sol: 'Without the predator, the mussels out-competed other species for space on the rocks — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', num({
      stem: 'What percentage of the invertebrate species was lost from the stretch without starfish?',
      value: round(((15 - 8) / 15) * 100, 1), unit: '%',
      sol: r`Lost $= \dfrac{15 - 8}{15} \times 100 = \dfrac{7}{15} \times 100 \approx ${round(((15 - 8) / 15) * 100, 1)}$ percent.`,
      scheme: [[`${round(((15 - 8) / 15) * 100, 1)}%`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'What does this experiment show about the role of predators in a community?',
      model: 'Predators **maintain species diversity**. By feeding on the **dominant competitor** (mussels), the starfish **reduced the intensity of competition** among prey, allowing weaker competitors to survive. This matches the **Pisaster** experiments on the American Pacific coast.',
      sol: 'Predators maintain diversity by reducing competition.',
      scheme: [['Predators maintain diversity', 1], ['By reducing competition among prey', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Give two other ways in which predators are important in nature.',
        model: 'Predators **transfer the energy** fixed by plants to **higher trophic levels**. They also **keep prey populations under control**; for example, a cactus-feeding moth checked the prickly pear cactus in Australia.',
        sol: 'Energy transfer; population control.',
        scheme: [['Energy transfer', 1], ['Population control with example', 1]],
        d: 2, c: 'understanding', t: [3],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 46.7 || 'value');
{
  const g0 = 20, rr = 0.3, t = 5, n = Math.round(expN(g0, rr, t));
  add('island-case', mk.case({
    passage: `Sailors left ${g0} goats on an island where giant tortoises lived. With plenty of vegetation and no predators, the goat population grew rapidly. The goats browsed more efficiently than the tortoises, and within a decade the tortoises had disappeared from the island.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What kind of growth did the goats show in the early years?',
        right: 'Exponential growth, because resources were plentiful',
        wrong: ['Logistic growth at carrying capacity', 'No growth, because births equalled deaths', 'Declining growth, because of predators'],
        sol: 'Abundant resources and no predators allow near-exponential (J-shaped) growth — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('b', num({
        stem: `If the goats grew exponentially with r = ${rr} per year, about how many goats would there be after ${t} years? (Use $N_t = N_0 e^{rt}$ with $e^{1.5} \\approx 4.48$; give a whole number.)`,
        value: n,
        sol: r`$N_t = ${g0}\, e^{${rr} \times ${t}} = ${g0}\, e^{1.5} \approx ${g0} \times 4.48 \approx ${n}$ goats.`,
        scheme: [[`${n}`, 1]],
        d: 3, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the interaction that led to the loss of the tortoises and the principle it illustrates.',
        model: 'It was **competition** for vegetation: the goats were the **competitively superior** browsers. It illustrates **competitive exclusion** (Gause’s principle) — the inferior competitor, the tortoise, was eliminated, as happened to the **Abingdon tortoise** on the Galapagos.',
        sol: 'Competition; competitive exclusion.',
        scheme: [['Competition', 1], ['Competitive exclusion', 1]],
        d: 2, c: 'understanding', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Predict how the goat population would change once the vegetation began to run short, and name the model.',
          model: 'Growth would **slow down** as food became limiting and competition among goats increased, and the population would **level off near the carrying capacity (K)** of the island. This follows the **logistic (S-shaped)** model.',
          sol: 'Slowing; levelling at K; logistic.',
          scheme: [['Growth slows and levels at K', 1], ['Logistic model', 1]],
          d: 3, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 90 || 'value');
}
