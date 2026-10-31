// ISC 12 Biology ch16 Organisms and Populations — question bank in ISC style.
// Rates, densities, mark–recapture estimates, growth values and percentages are computed by calc.mjs.
// AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { rate, nextN, expN, logisticRate, doublingTime, density, lincoln, round, R } from './calc.mjs';
import { PYRAMIDS, GROWTH } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const pyrFig = svgV(PYRAMIDS, 'Expanding, stable and declining age pyramids');
const growthFig = svgV(GROWTH, 'Exponential and logistic growth curves with carrying capacity K');

// ---------------------------------------------------------------- t01 population attributes
add('density-mcq', mcq({
  stem: 'Forest officials want to estimate the number of tigers in a large reserve where tigers are rarely seen. Which method is most practical?',
  right: 'Counting pug marks and faecal pellets',
  wrong: ['Counting every tiger seen from a jeep', 'Placing 1 m² quadrats across the reserve', 'Measuring the percentage cover of tigers'],
  sol: 'Indirect signs give a reliable relative estimate for elusive animals — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('quadrat-mcq', mcq({
  stem: 'One huge banyan tree and 200 small weeds grow in a plot. Why is a simple count of plants a poor measure of their relative importance?',
  right: 'Numbers ignore size; percentage cover or biomass reflects the banyan’s far larger share.',
  wrong: ['Plants can never be counted.', 'Weeds are not living organisms.', 'The banyan should be counted as 200 plants.'],
  sol: 'When individuals differ greatly in size, cover or biomass is more meaningful — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('natality-mcq', mcq({
  stem: 'In ecology, natality refers to',
  right: 'the number of births in a population during a given period, added to the initial density',
  wrong: ['the number of individuals entering from another habitat', 'the number of deaths in a given period', 'the ratio of females to males'],
  sol: 'Natality is births; immigration is entry from outside — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('immig-mcq', mcq({
  stem: 'A new pond forms after heavy rain, and within weeks it holds frogs that arrived from nearby ponds. Which process mainly increased the frog population at first?',
  right: 'Immigration',
  wrong: ['Natality', 'Emigration', 'Mortality'],
  sol: 'When a new habitat is colonised, immigration is the main source of individuals — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pyramid-mcq', mcq({
  stem: 'An age pyramid with a narrow base of pre-reproductive individuals and a wider middle (urn-shaped) indicates a population that is',
  right: 'declining',
  wrong: ['expanding rapidly', 'stable', 'at zero age'],
  sol: 'Few young individuals mean future decline — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('sexratio-mcq', mcq({
  stem: 'Two deer herds have the same size, but herd A is 70 percent female and herd B 30 percent female. Other things being equal, which herd can produce more fawns next season, and why?',
  right: 'Herd A, because more females can bear young',
  wrong: ['Herd B, because males produce the young', 'Both equally, because sex ratio does not affect births', 'Neither, because deer breed only once'],
  sol: 'Sex ratio affects natality; more females give more births — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pyr-ar', ar({
  a: 'An urn-shaped age pyramid indicates a rapidly growing population.',
  r: 'Urn-shaped pyramids have a broad base of pre-reproductive individuals.',
  key: 'd',
  sol: 'Both are false: an urn shape has a narrow base and indicates a declining population — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
{
  const b = rate(14, 40);
  add('brate-num', num({
    stem: 'A pond had 40 water hyacinth plants last year; 14 new plants were added by reproduction. What is the birth rate per plant per year?',
    value: b, tol: 0.001,
    sol: r`Birth rate $= \dfrac{14}{40} = ${b}$ per plant per year.`,
    scheme: [[`${b}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 0.35 || 'value');
}
{
  const d = rate(9, 120);
  add('drate-num', num({
    stem: 'In a culture of 120 fruit flies, 9 died during a week. What is the death rate per fly per week?',
    value: d, tol: 0.0005,
    sol: r`Death rate $= \dfrac{9}{120} = ${d}$ per fly per week.`,
    scheme: [[`${d}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 0.075 || 'value');
}
{
  const n = nextN(2400, 310, 45, 260, 95);
  add('nt-num', num({
    stem: 'A population of 2400 rabbits has 310 births, 45 immigrants, 260 deaths and 95 emigrants in a year. What is its size at the end of the year?',
    value: n,
    sol: r`$N_{t+1} = 2400 + (310 + 45) - (260 + 95) = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 2400 || 'value');
}
{
  const n = lincoln(40, 75, 10);
  add('lincoln-num', num({
    stem: 'In a lake, 40 fish were caught, tagged and released. A week later 75 fish were caught, of which 10 carried tags. Estimate the fish population.',
    value: n,
    sol: r`$N = \dfrac{40 \times 75}{10} = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 300 || 'value');
}
{
  const c = [6, 4, 7, 3, 5, 5];
  const d = density(c.reduce((a, b) => a + b, 0), c.length * 0.25);
  add('quadrat-num', num({
    stem: `Six quadrats, each 0.25 m², placed in a grassland held ${c.join(', ')} dandelion plants. What is the density of dandelions per square metre?`,
    value: d, tol: 0.01,
    sol: r`Total $= ${c.reduce((a, b) => a + b, 0)}$ plants in $6 \times 0.25 = 1.5$ m²; density $= \dfrac{30}{1.5} = ${d}$ per m².`,
    scheme: [[`${d}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 20 || 'value');
}
add('attr-short', short({
  marks: 2,
  stem: 'Name four attributes that a population has but an individual organism does not.',
  model: 'A population has a **population density**, a **birth rate (natality)** and a **death rate (mortality)** expressed per individual, a **sex ratio**, and an **age structure (age pyramid)**. An individual is born, dies and is male or female, but has none of these rates or ratios.',
  sol: 'Four attributes.',
  scheme: [['Two attributes', 1], ['Two more', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('pyramid-short', short({
  marks: 3,
  stem: 'Age pyramids of three countries are: X — broad base, narrow top; Y — almost equal widths of pre-reproductive and reproductive groups; Z — narrow base, wider middle. Name each shape and predict what will happen to each population.',
  model: 'X is **expanding (triangular)**: many young individuals will soon reproduce, so the population will **grow rapidly**. Y is **stable (bell-shaped)**: the young roughly replace the reproductive group, so the population stays **about the same**. Z is **declining (urn-shaped)**: too few young to replace the adults, so the population will **decrease**.',
  sol: 'Expanding, stable, declining.',
  scheme: [['X expanding: grows', 1], ['Y stable', 1], ['Z declining', 1]],
  d: 3, c: 'application', t: [1],
  assets: [pyrFig],
}));
add('density-short', short({
  marks: 3,
  stem: 'Describe three different methods of measuring population density, stating the kind of organism for which each is suitable.',
  model: '(i) **Quadrats**: count individuals in sample squares and scale up — for **plants** and slow-moving animals. (ii) **Percentage cover or biomass**: for plants of very **different sizes**, where a count would mislead. (iii) **Indirect estimates** such as **pug marks and faecal pellets** — for elusive animals like **tigers**; or **mark and recapture** for mobile animals such as **fish**.',
  sol: 'Three methods.',
  scheme: [['Quadrats', 1], ['Cover or biomass', 1], ['Indirect signs or mark–recapture', 1]],
  d: 2, c: 'understanding', t: [1],
}));
{
  const b = rate(30, 150), d = rate(18, 150);
  add('rates-short', short({
    marks: 3,
    stem: 'A population of 150 squirrels had 30 births and 18 deaths in a year, with no migration. Calculate the birth rate, death rate and r, and state whether the population is growing.',
    model: `Birth rate b = 30 ÷ 150 = **${b}**; death rate d = 18 ÷ 150 = **${d}** (per squirrel per year). Intrinsic rate **r = b − d = ${round(b - d, 3)}**. Since r is **positive**, the population is **growing**, from 150 to **${nextN(150, 30, 0, 18, 0)}** in the year.`,
    sol: 'Rates; r; growth.',
    scheme: [['Birth and death rates', 1], [`r = ${round(b - d, 3)}`, 1], ['Growing; new size', 1]],
    d: 3, c: 'application', t: [1, 2],
  }), () => (b === 0.2 && d === 0.12) || 'rates');
}
add('pop-long', long({
  stem: '(a) Define population density and name two methods of measuring it. [1]\n(b) Write the equation for the change in population size over a time interval and explain each term. [2]\n(c) A town’s population of 18 000 had 720 births, 300 deaths, 150 immigrants and 470 emigrants in a year. Calculate the population after the year and comment on the result. [2]',
  model: `(a) **Population density** is the number of individuals per unit **area or volume**; measured by **quadrats** or **mark–recapture** (also pug marks, biomass, percentage cover).\n\n(b) **N(t+1) = N(t) + [(B + I) − (D + E)]**, where **B** = births (natality), **I** = immigrants, **D** = deaths (mortality) and **E** = emigrants in the interval; N(t) is the starting density.\n\n(c) N = 18 000 + (720 + 150) − (300 + 470) = **${nextN(18000, 720, 150, 300, 470)}**. The population grew slightly; births exceeded deaths, but heavy **emigration** reduced the gain.`,
  sol: 'Density; equation; calculation.',
  scheme: [['(a) Definition and methods', 1], ['(b) Equation', 1], ['(b) Terms', 1], [`(c) ${nextN(18000, 720, 150, 300, 470)}`, 1], ['(c) Comment', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [1],
}), () => nextN(18000, 720, 150, 300, 470) === 18100 || 'N');

// ---------------------------------------------------------------- t02 population growth
add('logistic-ar', ar({
  a: 'In logistic growth, the growth rate falls almost to zero as the population nears the carrying capacity.',
  r: 'The term (K − N)/K approaches zero as N approaches K.',
  key: 'a',
  sol: 'Both are true, and the shrinking factor (K − N)/K explains the slowing — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('k-ar', ar({
  a: 'The logistic growth curve levels off at the carrying capacity.',
  r: 'In nature, resources available to a population are unlimited.',
  key: 'c',
  sol: 'A is true; R is false: resources are limited, which is why growth levels off at K — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('jcurve-mcq', mcq({
  stem: 'A few bacteria are placed in a large flask of fresh nutrient broth. For some hours their numbers rise faster and faster. Which growth pattern and equation describe this phase?',
  right: 'Exponential growth, dN/dt = rN, giving a J-shaped curve',
  wrong: ['Logistic growth, dN/dt = rN(K − N)/K, at its asymptote', 'Zero growth, dN/dt = 0', 'Declining growth, dN/dt = −rN'],
  sol: 'With plentiful resources, growth is exponential — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('k-mcq', mcq({
  stem: 'Deer introduced to an island increase rapidly at first, then more slowly, and their numbers settle around 900 for many years. What does 900 represent?',
  right: 'The carrying capacity of the island for deer',
  wrong: ['The intrinsic rate of natural increase', 'The birth rate per deer', 'The lag phase'],
  sol: 'The asymptote of logistic growth is K — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('rvalue-mcq', mcq({
  stem: 'The intrinsic rate of natural increase (r) of the human population of India in 1981 was about',
  right: '0.0205',
  wrong: ['0.015', '0.12', '2.05'],
  sol: 'r for India in 1981 was 0.0205; 0.015 is the Norway rat and 0.12 the flour beetle — option (@K).',
  d: 1, c: 'recall', t: [2],
}), () => R.india1981 === 0.0205 || 'r');
{
  const t = round(doublingTime(R.india1981), 1);
  add('doubling-num', num({
    stem: 'If India’s population had grown exponentially with r = 0.0205 per year, how many years would it take to double? Use doubling time = ln 2 ÷ r. (One decimal place.)',
    value: t, tol: 0.1, unit: 'years',
    sol: r`$\dfrac{0.693}{0.0205} \approx ${t}$ years.`,
    scheme: [[`${t}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => Math.abs(q.answer.value - 33.8) < 0.05 || 'value');
}
{
  const g = logisticRate(0.2, 250, 500);
  add('logistic-num', num({
    stem: 'For a population growing logistically with r = 0.2 per week and K = 500, what is the growth rate dN/dt when N = 250?',
    value: g, tol: 0.01, unit: 'per week',
    sol: r`$\dfrac{dN}{dt} = 0.2 \times 250 \times \dfrac{500 - 250}{500} = ${g}$.`,
    scheme: [[`${g}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 25 || 'value');
}
{
  const n = Math.round(expN(100, 0.1, 10));
  add('exp-num', num({
    stem: 'A population of 100 aphids grows exponentially with r = 0.1 per day. Using N = N₀e^{rt}, how many aphids are there after 10 days? (Take e = 2.718; nearest whole number.)',
    value: n, tol: 1,
    sol: r`$N = 100 \times e^{0.1 \times 10} = 100 \times 2.718 = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 272 || 'value');
}
add('phases-short', short({
  marks: 2,
  stem: 'Name the four phases of a sigmoid (logistic) growth curve and state what happens in the last one.',
  model: 'The phases are the **lag phase**, the **exponential (log) phase**, the **deceleration phase** and the **asymptote**. At the asymptote, the population has reached the **carrying capacity (K)**; births and deaths balance, so numbers stay **roughly constant**.',
  sol: 'Four phases.',
  scheme: [['Four phases', 1], ['Asymptote at K', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('growth-short', short({
  marks: 3,
  stem: 'Compare exponential and logistic growth with respect to resources, equation and shape of the curve.',
  model: '**Resources:** exponential growth occurs when resources are **unlimited**; logistic growth when they are **limited**. **Equation:** exponential — **dN/dt = rN**; logistic — **dN/dt = rN(K − N)/K**, where K is the carrying capacity. **Curve:** exponential gives a **J-shaped** curve rising ever faster; logistic gives an **S-shaped (sigmoid)** curve that levels off at **K**. The logistic model is **more realistic**.',
  sol: 'Three comparisons.',
  scheme: [['Resources', 1], ['Equations', 1], ['Curves', 1]],
  d: 2, c: 'understanding', t: [2],
  assets: [growthFig],
}));
add('growth-long', long({
  stem: '(a) Draw on one graph the curves of exponential and logistic growth, labelling the carrying capacity. [2]\n(b) Write the equation for each. [1]\n(c) A fish population has r = 0.4 per year in a lake with K = 2000. Calculate dN/dt when N = 1000 and when N = 1900, and explain the difference. [2]',
  model: `(a) **Graph:** time on the x-axis, N on the y-axis; a **J-shaped** exponential curve rising steeply; an **S-shaped** logistic curve with lag, rapid rise, deceleration and an **asymptote** at a dashed line marked **K**.\n\n(b) Exponential: **dN/dt = rN**; logistic: **dN/dt = rN(K − N)/K**.\n\n(c) At N = 1000: 0.4 × 1000 × 1000/2000 = **${logisticRate(0.4, 1000, 2000)}** per year. At N = 1900: 0.4 × 1900 × 100/2000 = **${logisticRate(0.4, 1900, 2000)}** per year. Near K, resources are almost used up, (K − N)/K is small, and growth **slows sharply**.`,
  sol: 'Curves; equations; calculation.',
  scheme: [['(a) Both curves with K', 2], ['(b) Two equations', 1], ['(c) Two values', 1], ['(c) Explanation', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}), () => (logisticRate(0.4, 1000, 2000) === 200 && logisticRate(0.4, 1900, 2000) === 38) || 'rates');

// ---------------------------------------------------------------- t03 life history variation
add('salmon-mcq', mcq({
  stem: 'Which organisms breed only once in their lifetime and then die?',
  right: 'Pacific salmon and bamboo',
  wrong: ['Most birds and mammals', 'Oysters and pelagic fishes', 'Humans and elephants'],
  sol: 'Pacific salmon and bamboo reproduce once — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('oyster-mcq', mcq({
  stem: 'Oysters release millions of tiny eggs, while elephants have one large calf every few years. These differences are best described as',
  right: 'life history variations that maximise reproductive fitness in each habitat',
  wrong: ['differences in carrying capacity only', 'examples of competitive exclusion', 'the result of brood parasitism'],
  sol: 'Each strategy maximises Darwinian fitness under its constraints — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('fitness-fill', fill({
  stem: 'Populations evolve to maximise their reproductive fitness, also called ______ fitness (a high r value).',
  acc: [['Darwinian']],
  sol: 'Darwinian fitness.',
  d: 1, c: 'recall', t: [3],
}));
add('lifehistory-short', short({
  marks: 2,
  stem: 'What is meant by life history variation? Give two contrasting examples.',
  model: 'Different species have evolved different patterns of **reproduction and survival** that **maximise reproductive fitness** in their habitats. Some **breed once** (Pacific salmon, bamboo), others **breed many times** (most birds and mammals); some produce **many small offspring** (oysters), others **few large offspring** (birds and mammals).',
  sol: 'Definition; examples.',
  scheme: [['Meaning', 1], ['Contrasting examples', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 mutualism and competition
add('gause-mcq', mcq({
  stem: 'Gause’s competitive exclusion principle states that',
  right: 'two closely related species competing for the same limiting resources cannot coexist indefinitely',
  wrong: ['all species in a habitat compete equally', 'predators always eliminate their prey', 'competition occurs only between unrelated species'],
  sol: 'The inferior competitor is eventually eliminated — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('fig-mcq', mcq({
  stem: 'A female wasp lays eggs inside the developing fruit of a fig species and pollinates its flowers, and her larvae feed on some of the seeds. This relationship is',
  right: 'mutualism',
  wrong: ['parasitism', 'commensalism', 'amensalism'],
  sol: 'Both benefit: the fig is pollinated and the wasp gets a site and food for its young — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ophrys-mcq', mcq({
  stem: 'The Mediterranean orchid Ophrys has a petal that resembles a female bee. How does this help the orchid?',
  right: 'Male bees try to mate with the petal and carry pollen to other flowers.',
  wrong: ['The petal stings bees that come near.', 'The petal produces honey for the bees.', 'Bees lay their eggs in the petal.'],
  sol: 'Sexual deceit by pseudocopulation brings about pollination — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('lichen-mcq', mcq({
  stem: 'A lichen is a mutualistic association between',
  right: 'a fungus and an alga or cyanobacterium',
  wrong: ['a fungus and the roots of a higher plant', 'a fig and a wasp', 'a cuckoo and a crow'],
  sol: 'Lichens are fungus–photosynthetic partner associations — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('interference-mcq', mcq({
  stem: 'A lake has abundant zooplankton, yet a fish species feeds less efficiently whenever a large flock of flamingoes is present. What kind of competition is this?',
  right: 'Interference competition',
  wrong: ['Mutualism', 'Commensalism', 'Brood parasitism'],
  sol: 'One species reduces the feeding efficiency of another even when the resource is not limiting — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('connell-mcq', mcq({
  stem: 'On a Scottish rocky shore, the barnacle Chthamalus is found only on high rocks. When the larger barnacle Balanus is removed from the lower rocks, Chthamalus spreads there. This shows',
  right: 'competitive release',
  wrong: ['mutualism', 'brood parasitism', 'logistic growth'],
  sol: 'Removing a superior competitor lets the inferior species expand — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('tortoise-mcq', mcq({
  stem: 'The Abingdon tortoise of the Galapagos became extinct within a decade after goats were introduced to its island. What was the main reason?',
  right: 'Goats were more efficient browsers and out-competed the tortoise for food.',
  wrong: ['Goats preyed on adult tortoises.', 'Goats were parasites of the tortoise.', 'Goats were mutualists that helped the tortoise.'],
  sol: 'Interspecific competition by a superior browser — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('warbler-mcq', mcq({
  stem: 'MacArthur found five closely related warbler species living on the same tree. How did they coexist?',
  right: 'By resource partitioning — feeding in different parts of the tree in different ways',
  wrong: ['By competitive exclusion of four species', 'By brood parasitism', 'By feeding on the same insects at the same place'],
  sol: 'Differences in foraging avoided competition — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('mutualism-short', short({
  marks: 2,
  stem: 'A gardener notices that her pea plants grow well in poor soil when certain fungi live in their roots. Name this association, the type of interaction, and how each partner benefits.',
  model: 'It is **mycorrhiza**, a **mutualism** (+, +). The **fungus** helps the plant **absorb nutrients**, especially phosphorus, from the soil, while the **plant** supplies the fungus with **carbohydrates** made in photosynthesis.',
  sol: 'Mycorrhiza; mutualism.',
  scheme: [['Mycorrhiza, mutualism', 1], ['Benefits to each', 1]],
  d: 2, c: 'application', t: [4],
}));
add('gause-short', short({
  marks: 2,
  stem: 'State Gause’s competitive exclusion principle and name the organisms he used.',
  model: 'Two **closely related species** competing for the **same resources** cannot **coexist indefinitely**; the **competitively inferior** one will eventually be **eliminated**. Gause showed this with two species of the protozoan ***Paramecium*** grown together in culture.',
  sol: 'Principle; Paramecium.',
  scheme: [['Principle', 1], ['Paramecium', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('competition-short', short({
  marks: 3,
  stem: 'Using the examples of flamingoes and fishes, the Abingdon tortoise, and MacArthur’s warblers, explain three different aspects of competition.',
  model: '**Flamingoes and fishes** in South American lakes compete for **zooplankton** — competition can occur between **unrelated** species. The **Abingdon tortoise** became **extinct** within a decade of **goats** being introduced, as goats browsed more efficiently — a superior competitor can **eliminate** another. **MacArthur’s warblers** coexisted on one tree by **feeding differently** — **resource partitioning** avoids competitive exclusion.',
  sol: 'Three aspects.',
  scheme: [['Unrelated competitors', 1], ['Elimination by superior competitor', 1], ['Resource partitioning', 1]],
  d: 3, c: 'application', t: [4],
}));
add('release-short', short({
  marks: 3,
  stem: 'In an experiment on a rocky shore, barnacle species X lives only on upper rocks and species Y on lower rocks. When Y is removed from some lower rocks, X settles and survives there; when X is removed from upper rocks, Y does not spread upwards. Interpret these results.',
  model: 'X **can** live on the lower rocks but is normally **excluded** there by **Y**, the **superior competitor** — when Y is removed, X spreads: **competitive release**. Y does **not** spread upwards when X is removed, so its upper limit is set by **physical factors** (such as drying out), not by competition with X. X’s **realised** range is therefore smaller than its **potential** range, as Connell found with *Chthamalus* and *Balanus*.',
  sol: 'Competitive release; physical limit.',
  scheme: [['Y excludes X below: competitive release', 1], ['Y limited above by physical factors', 1], ['Link to Connell', 1]],
  d: 4, c: 'analysis', t: [4],
}));
add('interactions-long', long({
  stem: '(a) Tabulate the six kinds of population interaction with their signs (+, −, 0). [2]\n(b) Give one example each of mutualism, commensalism and amensalism. [2]\n(c) What is meant by competitive release? [1]',
  model: '(a) **Mutualism +/+; competition −/−; predation +/−; parasitism +/−; commensalism +/0; amensalism −/0.**\n\n(b) **Mutualism:** fig and fig wasp (or lichen, mycorrhiza, Ophrys and bee). **Commensalism:** orchid epiphyte on a mango branch (or barnacles on a whale, cattle egret and cattle, clown fish and sea anemone). **Amensalism:** *Penicillium* secreting penicillin that harms bacteria.\n\n(c) **Competitive release** is the **expansion** of a species’ distribution when a **superior competitor** that restricted it is **removed** (Connell’s barnacles).',
  sol: 'Table; examples; release.',
  scheme: [['(a) Six interactions with signs', 2], ['(b) Three examples', 2], ['(c) Competitive release', 1]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [4, 5],
}));

// ---------------------------------------------------------------- t05 predation, parasitism, commensalism, amensalism
add('brood-ar', ar({
  a: 'A crow often incubates and rears the young of a koel.',
  r: 'The koel’s eggs resemble the crow’s in size and colour, so the crow does not detect and eject them.',
  key: 'a',
  sol: 'Both are true, and egg mimicry explains why the crow rears the koel’s young (brood parasitism) — option (a).',
  d: 3, c: 'understanding', t: [5],
}));
add('amens-ar', ar({
  a: 'A clown fish gains protection by living among the tentacles of a sea anemone.',
  r: 'Penicillium secretes a substance that inhibits bacteria.',
  key: 'b',
  sol: 'Both are true, but the action of Penicillium (amensalism) does not explain the clown fish–anemone commensalism — option (b).',
  d: 3, c: 'understanding', t: [5],
}));
add('commensal-mcq', mcq({
  stem: 'Cattle egrets follow grazing buffaloes and catch the insects disturbed by them; the buffaloes are not affected. This interaction is',
  right: 'commensalism',
  wrong: ['mutualism', 'parasitism', 'amensalism'],
  sol: 'One benefits, the other is unaffected — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('cuscuta-mcq', mcq({
  stem: 'A leafless, yellow, thread-like plant twines over a hedge and draws food from it through special roots. It is',
  right: 'Cuscuta, an ectoparasite',
  wrong: ['an orchid, a commensal epiphyte', 'a lichen, a mutualistic partner', 'Calotropis, a plant with cardiac glycosides'],
  sol: 'Cuscuta has lost chlorophyll and leaves and parasitises the host from outside — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('monarch-mcq', mcq({
  stem: 'Birds avoid eating Monarch butterflies. Why?',
  right: 'The butterfly is distasteful because of a chemical it acquired by feeding on a poisonous weed as a caterpillar.',
  wrong: ['It is camouflaged against tree bark.', 'It has sharp thorns.', 'It is too large for birds to eat.'],
  sol: 'A chemical defence acquired from its food plant — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('calotropis-mcq', mcq({
  stem: 'Cattle and goats avoid browsing on Calotropis growing in abandoned fields because it produces',
  right: 'highly poisonous cardiac glycosides',
  wrong: ['penicillin', 'thorns on every leaf', 'nectar that attracts bees'],
  sol: 'Calotropis is chemically defended — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('pisaster-mcq', mcq({
  stem: 'Scientists removed all the predatory starfish Pisaster from an enclosed intertidal area. Within a year more than ten invertebrate species had disappeared. Why?',
  right: 'Without the predator, competition among prey increased and a few species eliminated the others.',
  wrong: ['The starfish had been feeding all the invertebrates.', 'Removing the starfish made the water too warm.', 'The invertebrates were parasites of the starfish.'],
  sol: 'Predators can maintain diversity by limiting dominant prey — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('prickly-mcq', mcq({
  stem: 'When the prickly pear cactus spread over millions of hectares of Australian rangeland, how was it finally brought under control?',
  right: 'By introducing a cactus-feeding predator, a moth, from its natural habitat',
  wrong: ['By introducing goats that out-competed it', 'By planting orchids as epiphytes on it', 'By spraying penicillin'],
  sol: 'An introduced herbivore (predator) controlled the invasive plant — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('amensal-mcq', mcq({
  stem: 'Bacteria fail to grow around a colony of the mould Penicillium on an agar plate, while the mould is unaffected. This interaction is',
  right: 'amensalism',
  wrong: ['commensalism', 'mutualism', 'predation'],
  sol: 'One is harmed (−) and the other unaffected (0) — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('fluke-fill', fill({
  stem: 'The human liver fluke needs two intermediate hosts to complete its life cycle: a snail and a ______.',
  acc: [['fish']],
  sol: 'Fish.',
  d: 2, c: 'recall', t: [5],
}));
add('predation-short', short({
  marks: 2,
  stem: 'State two important roles of predators in nature, with an example of each.',
  model: '(i) Predators **keep prey populations in check**: the invasive **prickly pear cactus** in Australia was controlled by a cactus-feeding **moth**. (ii) Predators **maintain species diversity** by reducing competition among prey: removal of the starfish ***Pisaster*** led to the extinction of **over ten** invertebrate species. They also **transfer energy** to higher trophic levels.',
  sol: 'Two roles.',
  scheme: [['Control of prey with example', 1], ['Diversity with example', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('commensal-short', short({
  marks: 2,
  stem: 'An orchid grows on a mango branch, and barnacles grow on the back of a whale. Name the interaction in both cases, and explain why it is not parasitism.',
  model: 'Both are **commensalism** (+, 0). The **orchid** gains support and light, and the **barnacles** gain a moving home and access to food, while the **mango tree and whale** are **neither harmed nor benefited**. In parasitism the host would be **harmed** by losing food.',
  sol: 'Commensalism; host unharmed.',
  scheme: [['Commensalism, benefit to one', 1], ['Other unaffected, unlike parasitism', 1]],
  d: 2, c: 'application', t: [5],
}));
add('parasite-short', short({
  marks: 3,
  stem: 'Describe three special adaptations of parasites and explain the advantage of each.',
  model: '(i) **Loss of unnecessary sense organs** — inside a host they are not needed, saving energy. (ii) **Adhesive organs or suckers** — to **cling** to the host and not be dislodged. (iii) **Loss of the digestive system** (in endoparasites) — they absorb **pre-digested food** from the host. Also (iv) **high reproductive capacity**, so that some offspring find new hosts despite complex life cycles.',
  sol: 'Three adaptations.',
  scheme: [['First adaptation with reason', 1], ['Second', 1], ['Third', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('defence-short', short({
  marks: 3,
  stem: 'A field has grasses, an Acacia bush, Calotropis plants and many insects. Explain three different ways in which these prey organisms might avoid being eaten.',
  model: '**Camouflage:** some **insects** (and frogs) are **cryptically coloured** so that predators cannot easily see them. **Thorns:** the **Acacia** bears **thorns** that deter browsers. **Chemicals:** **Calotropis** produces poisonous **cardiac glycosides**, so cattle and goats avoid it; insects such as the **Monarch** become **distasteful** by storing chemicals from their food plant.',
  sol: 'Camouflage, thorns, chemicals.',
  scheme: [['Camouflage', 1], ['Thorns', 1], ['Chemical defences', 1]],
  d: 3, c: 'application', t: [5],
}));
add('parasite-long', long({
  stem: '(a) Distinguish between ectoparasites and endoparasites, giving two examples of each. [2]\n(b) What is brood parasitism? Explain with an example. [2]\n(c) Why do many endoparasites produce enormous numbers of eggs? [1]',
  model: '(a) **Ectoparasites** feed on the **external surface** of the host — **lice** on humans, **ticks** on dogs, copepods on fish, ***Cuscuta*** on hedge plants. **Endoparasites** live **inside** the host’s body — **tapeworm**, **liver fluke**, ***Plasmodium***.\n\n(b) In **brood parasitism**, a parasitic bird **lays its eggs in the nest of its host** and lets the host incubate them and rear the young. The **koel (cuckoo)** lays eggs in a **crow’s** nest; its eggs **resemble the crow’s** in size and colour, so the crow does not reject them.\n\n(c) Their life cycles are **complex**, often needing **intermediate hosts**, and most eggs never reach a new host; **high reproductive capacity** ensures some do.',
  sol: 'Ecto vs endo; brood; eggs.',
  scheme: [['(a) Distinction with examples', 2], ['(b) Brood parasitism with koel', 2], ['(c) High reproduction', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const Y = [[2019, 200, 46, 30], [2020, 216, 52, 31], [2021, 237, 55, 35]];
  const N22 = nextN(237, 55, 0, 35, 0);
  const b19 = rate(46, 200);
  add('pond-case', mk.case({
    passage: `A student recorded a frog population in a closed pond (no migration) each spring.\n\n| Year | Frogs at start | Births during year | Deaths during year |\n|---|---|---|---|\n${Y.map((row) => `| ${row.join(' | ')} |`).join('\n')}`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'How many frogs should be present at the start of 2022?',
        value: N22,
        sol: r`$237 + 55 - 35 = ${N22}$.`,
        scheme: [[`${N22}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('b', mcq({
        stem: `The birth rate in 2019 was ${b19} per frog. Which trend in the data best shows that the population is growing?`,
        right: 'Births exceed deaths every year, so r is positive.',
        wrong: ['Deaths increase every year.', 'The pond has no migration.', 'Births are less than 60 every year.'],
        sol: 'With no migration, growth depends on births exceeding deaths — option (@K).',
        d: 3, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Predict how the numbers will change over the next twenty years, and explain why.',
        model: 'Numbers will keep rising at first, but the pond has **limited food and space**, so growth will **slow** (deceleration) and the population will level off near the **carrying capacity** — **logistic (S-shaped) growth**, not unlimited exponential growth.',
        sol: 'Logistic levelling.',
        scheme: [['Growth slows', 1], ['Levels off at carrying capacity', 1]],
        d: 3, c: 'analysis', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Why was it important that the pond was closed to migration?',
          model: 'With **no immigration or emigration**, changes in numbers are due only to **births and deaths**, so the birth and death rates measured give the true **intrinsic rate of increase** of the population.',
          sol: 'Only B and D act.',
          scheme: [['No I or E', 1], ['Changes due to births and deaths only', 1]],
          d: 2, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 257 || 'value');
}
{
  const C = { withB: 12, withoutB: 46, total: 60 };
  const p1 = Math.round((C.withB / C.total) * 1000) / 10, p2 = Math.round((C.withoutB / C.total) * 1000) / 10;
  add('barnacle-case', mk.case({
    passage: `On a rocky shore, ${C.total} lower-shore plots were cleared. In half of the experiment the larger barnacle Balanus was allowed to settle; in the other half it was kept out. After a year, the number of plots in which the small barnacle Chthamalus had survived was recorded.\n\n| Treatment | Plots with surviving Chthamalus (out of ${C.total}) |\n|---|---|\n| Balanus present | ${C.withB} |\n| Balanus removed | ${C.withoutB} |`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'In what percentage of plots did Chthamalus survive when Balanus was removed?',
        value: p2, tol: 0.05, unit: '%',
        sol: r`$\dfrac{${C.withoutB}}{${C.total}} \times 100 = ${p2}$ percent.`,
        scheme: [[`${p2}`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('b', mcq({
        stem: `Chthamalus survived in only ${p1} percent of plots with Balanus. Which conclusion is best supported?`,
        right: 'Balanus out-competes Chthamalus on the lower shore.',
        wrong: ['Chthamalus cannot tolerate the lower shore at all.', 'Balanus is a mutualist of Chthamalus.', 'The two barnacles do not interact.'],
        sol: 'Chthamalus survives well there only when its competitor is absent — option (@K).',
        d: 3, c: 'analysis', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the phenomenon shown when Balanus is removed, and the scientist whose work this resembles.',
        model: 'It is **competitive release**: the inferior competitor **expands** into areas from which the **superior competitor** had excluded it. This resembles **Connell’s** experiments with barnacles on the rocky coast of **Scotland**.',
        sol: 'Competitive release; Connell.',
        scheme: [['Competitive release explained', 1], ['Connell', 1]],
        d: 3, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'How does this experiment support Gause’s competitive exclusion principle?',
          model: 'Two barnacle species competing for the **same space** on the lower shore **cannot coexist**: the **superior** Balanus **eliminates** most Chthamalus, just as Gause found that one *Paramecium* species excluded the other.',
          sol: 'Exclusion of inferior competitor.',
          scheme: [['Same resource, no coexistence', 1], ['Inferior eliminated', 1]],
          d: 3, c: 'analysis', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 76.7 || 'value');
}
