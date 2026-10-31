// ISC 12 Biology ch16 Organisms and Populations — Part 1 (t01–t02), Part 2 (t03–t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { GROWTH, PYRAMIDS, DENSITY, GAUSE_SVG, GAUSE_END } from './svgs.mjs';
import { rate, nextN, doublingTime, density, lincoln, round, R, compete, GAUSE } from './calc.mjs';

export const V = {
  growth: svgV(GROWTH, 'Exponential (J-shaped) and logistic (S-shaped) growth curves with carrying capacity K'),
  pyramids: svgV(PYRAMIDS, 'Expanding, stable and declining age pyramids'),
  density: svgV(DENSITY, 'Natality and immigration add to a population; mortality and emigration remove from it'),
  gause: svgV(GAUSE_SVG, 'Model of Gause’s competition experiment with two Paramecium species'),
};

// ---------------------------------------------------------------- computed numbers
export const QUAD = { counts: [12, 9, 15, 8, 11], area: 1 };
export const QUAD_D = density(QUAD.counts.reduce((a, b) => a + b, 0), QUAD.counts.length * QUAD.area);
export const MR = { marked: 60, caught: 50, recaptured: 12 };
export const MR_N = lincoln(MR.marked, MR.caught, MR.recaptured);
export const BR = { N: 50, born: 15 };
export const DR = { N: 80, died: 6 };
export const B_RATE = rate(BR.born, BR.N);
export const D_RATE = rate(DR.died, DR.N);
export const N_NEXT = nextN(500, 60, 14, 40, 9);
export const DT_BEETLE = round(doublingTime(R.beetle), 1);
const TOG = compete(GAUSE);
export const PEAK2 = Math.max(...TOG.map((x) => x[2]));
export const PEAK2_DAY = TOG.findIndex((x) => x[2] === PEAK2);
export const PISASTER = { before: 15, after: 5 };

export const deck1 = deck({
  part: 1,
  title: 'Organisms and Populations — Part 1: Population attributes and growth',
  goals: [
    'Define population density and describe ways of measuring it',
    'Calculate natality, mortality and change in population size; interpret sex ratio and age pyramids',
    'Explain exponential and logistic growth with equations and graphs, and carrying capacity',
  ],
  slides: [
    sl('title', 'Populations', {
      b: 'Part 1 — the attributes of a population and how populations grow.',
      v: flow('LR', [['a', 'Attributes (density, rates, age)'], ['c', 'Change in size'], ['g', 'Growth models'], ['k', 'Carrying capacity']], [['a', 'c'], ['c', 'g'], ['g', 'k']], 'Flow from population attributes to change in size to growth models to carrying capacity'),
      n: 'A population is a group of individuals of one species living in a defined area at the same time. Unlike a single organism, a population has a birth rate, a death rate, a sex ratio and an age structure, and these decide how it grows.',
    }),
    sl('concept', 'Population attributes', {
      b: 'A population has attributes that an individual does not.',
      v: table(['Attribute', 'Meaning'], [['Population density (N)', 'Number of individuals per unit area or volume'], ['Natality (birth rate)', 'Births per individual per unit time'], ['Mortality (death rate)', 'Deaths per individual per unit time'], ['Immigration and emigration', 'Individuals entering from or leaving to other habitats'], ['Sex ratio', 'Proportion of females to males'], ['Age structure', 'Proportions of pre-reproductive, reproductive and post-reproductive individuals']], 'Table of population attributes'),
      n: 'An individual is born and dies, but a population has birth and death rates. An individual is male or female, but a population has a sex ratio. These features describe the population as a whole.',
    }),
    sl('concept', 'Measuring population density', {
      b: 'Counting every individual is often impossible, so ecologists use the method that suits the organism.',
      v: table(['Method', 'Used for'], [['Total count', 'Large, easily seen animals, such as a herd in a reserve'], ['Quadrats', 'Plants and slow-moving animals: count in sample squares and scale up'], ['Percentage cover or biomass', 'When numbers mislead, e.g. one huge banyan tree versus many small herbs'], ['Indirect signs', 'Pug marks and faecal pellets of tigers'], ['Mark and recapture', 'Mobile animals such as fish or insects']], 'Table of methods of measuring population density'),
      n: 'Sometimes the relative density is enough, such as the number of fish caught per trap. In a forest, one large tree may matter more than two hundred small plants, so percentage cover or biomass gives a truer picture than a simple count.',
    }),
    sl('example', 'Worked example 1: estimating density and size', {
      b: `(i) Five 1 m² quadrats in a meadow held ${QUAD.counts.join(', ')} plants of a herb. Find the density. (ii) In a pond, ${MR.marked} fish were caught, marked and released; later ${MR.caught} were caught, of which ${MR.recaptured} were marked. Estimate the fish population.`,
      ul: [
        r`(i) Density $= \dfrac{${QUAD.counts.join(' + ')}}{${QUAD.counts.length}\ \text{m}^{2}} = ${QUAD_D}$ plants per m².`,
        r`(ii) $N = \dfrac{\text{marked} \times \text{caught}}{\text{recaptured}} = \dfrac{${MR.marked} \times ${MR.caught}}{${MR.recaptured}} = ${MR_N}$ fish.`,
      ],
      v: table(['Method', 'Result'], [['Quadrats', `${QUAD_D} plants per m²`], ['Mark and recapture', `about ${MR_N} fish`]], `Worked table: ${QUAD_D} plants per square metre; about ${MR_N} fish`),
      n: 'Averaging over several quadrats smooths out patchiness. In mark and recapture, the fraction of marked fish in the second catch is taken to equal the fraction of the whole population that was marked.',
    }),
    sl('diagram', 'What changes population density', {
      b: 'Density changes through four processes: **natality (B)** and **immigration (I)** increase it; **mortality (D)** and **emigration (E)** decrease it. Over a time interval: **N(t+1) = N(t) + [(B + I) − (D + E)]**.',
      v: V.density,
      n: 'Usually births and deaths are the most important. Immigration may matter when a new habitat is being colonised, and emigration when a population becomes crowded.',
    }),
    sl('example', 'Worked example 2: rates and change in numbers', {
      b: `(i) A pond had ${BR.N} water lilies last year; ${BR.born} new plants were added by reproduction. (ii) In a lab, ${DR.died} of ${DR.N} beetles died in a week. Find each rate. (iii) A deer population of 500 has 60 births, 14 immigrants, 40 deaths and 9 emigrants in a year. Find N next year.`,
      ul: [
        r`(i) Birth rate $= \dfrac{${BR.born}}{${BR.N}} = ${B_RATE}$ per plant per year.`,
        r`(ii) Death rate $= \dfrac{${DR.died}}{${DR.N}} = ${D_RATE}$ per beetle per week.`,
        r`(iii) $N_{t+1} = 500 + (60 + 14) - (40 + 9) = ${N_NEXT}$.`,
      ],
      v: table(['Quantity', 'Value'], [['Birth rate', String(B_RATE)], ['Death rate', String(D_RATE)], ['Next year’s deer', String(N_NEXT)]], `Worked table: birth rate ${B_RATE}; death rate ${D_RATE}; ${N_NEXT} deer`),
      n: 'Rates are always per individual per unit time, so divide the number of births or deaths by the starting population. For the change in numbers, add the gains and subtract the losses.',
    }),
    sl('diagram', 'Age pyramids', {
      b: 'An **age pyramid** shows the proportions of **pre-reproductive, reproductive and post-reproductive** individuals. A broad base (**expanding**) means a growing population; a bell shape (**stable**) a steady one; an urn shape (**declining**) a shrinking one.',
      v: V.pyramids,
      n: 'A wide base means many young individuals who will soon reproduce, so the population will grow. A narrow base means few young, so numbers will fall. The pyramid of human populations is a key tool for planning.',
    }),
    sl('concept', 'Sex ratio and carrying capacity', {
      b: 'The **sex ratio** (for example 60 percent females and 40 percent males) affects how many offspring can be produced. Every habitat has limited resources and can support only a certain maximum number: its **carrying capacity (K)**.',
      v: table(['Term', 'Meaning'], [['Sex ratio', 'Proportion of females to males in a population'], ['Carrying capacity (K)', 'Maximum population a habitat can support with its resources'], ['Intrinsic rate of natural increase (r)', 'Birth rate minus death rate per individual: Norway rat 0.015, flour beetle 0.12, India (1981) 0.0205']], 'Table of sex ratio, carrying capacity and r'),
      n: 'Because only females bear young, a population with more females can grow faster. But no population can grow for ever; food, space and other resources set a ceiling, the carrying capacity.',
    }),
    sl('check', 'Quick check: density', {
      b: 'Which is the best way to measure the population of tigers in a large reserve?',
      n: 'Quick check. Tigers are rarely seen, but they leave signs.',
      chk: 'density-mcq',
    }),
    sl('diagram', 'Exponential and logistic growth', {
      b: 'With **unlimited resources**, growth is **exponential**: dN/dt = **rN**, giving a **J-shaped** curve, N_t = N₀e^{rt}. With **limited resources**, growth is **logistic** (Verhulst–Pearl): dN/dt = **rN(K − N)/K**, giving an **S-shaped (sigmoid)** curve that levels off at **K**.',
      v: V.growth,
      n: 'In the J curve, numbers rise faster and faster. In the S curve, a lag phase is followed by rapid growth, then growth slows as resources run short, and the population settles near the carrying capacity. The logistic model is more realistic.',
    }),
    sl('concept', 'Phases of the logistic curve', {
      b: 'The sigmoid curve has four phases.',
      v: table(['Phase', 'What happens'], [['Lag', 'Few individuals; slow growth while they adjust'], ['Exponential (log)', 'Rapid growth with plenty of resources'], ['Deceleration', 'Growth slows as competition for resources rises'], ['Asymptote', 'Population steady at the carrying capacity K']], 'Table of the phases of logistic growth'),
      n: 'As N approaches K, the term K minus N over K approaches zero, so the growth rate falls towards zero. That is why the S curve flattens out at the carrying capacity.',
    }),
    sl('example', 'Worked example 3: doubling time and logistic slowing', {
      b: `For the flour beetle, r = ${R.beetle} per day. Find the doubling time if growth were exponential. Then compare dN/dt at N = 100 and at N = 900 when K = 1000.`,
      ul: [
        r`Doubling time $= \dfrac{\ln 2}{r} = \dfrac{0.693}{${R.beetle}} \approx ${DT_BEETLE}$ days.`,
        r`At $N = 100$: $\dfrac{dN}{dt} = ${R.beetle} \times 100 \times \dfrac{900}{1000} = ${round(R.beetle * 100 * 0.9, 1)}$.`,
        r`At $N = 900$: $\dfrac{dN}{dt} = ${R.beetle} \times 900 \times \dfrac{100}{1000} = ${round(R.beetle * 900 * 0.1, 1)}$.`,
      ],
      v: table(['N', 'dN/dt (logistic, K = 1000)'], [[String(100), String(round(R.beetle * 100 * 0.9, 1))], [String(500), String(round(R.beetle * 500 * 0.5, 1))], [String(900), String(round(R.beetle * 900 * 0.1, 1))]], `Worked table: growth is fastest at half of K`),
      n: 'With no limits, the beetles would double in under six days. In the logistic model, growth is slow when there are few beetles and again when the population nears its carrying capacity; it is fastest at about half of K.',
    }),
    sl('check', 'Quick check: logistic growth', {
      b: 'Judge the assertion and the reason about logistic growth.',
      n: 'Quick check. What happens to the term K minus N as N approaches K?',
      chk: 'logistic-ar',
    }),
    sl('check', 'Quick check: age pyramids', {
      b: 'What does an urn-shaped age pyramid indicate?',
      n: 'Quick check. Are there many or few young individuals?',
      chk: 'pyramid-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Density measured by total count, quadrats, percentage cover or biomass, indirect signs, mark and recapture.',
        'Natality and immigration increase N; mortality and emigration decrease it: N(t+1) = N(t) + [(B + I) − (D + E)].',
        'Age pyramids: expanding, stable, declining; sex ratio; carrying capacity K.',
        'Exponential: dN/dt = rN, J-shaped. Logistic: dN/dt = rN(K − N)/K, S-shaped, levels at K.',
        'r: Norway rat 0.015, flour beetle 0.12, India (1981) 0.0205.',
      ],
      v: table(['Model', 'Curve'], [['Exponential', 'J-shaped'], ['Logistic', 'S-shaped (sigmoid)']], 'Summary table of growth models'),
      n: 'To recap: populations have density, rates, sex ratios and age structures. They grow exponentially when resources are unlimited, but in nature growth is logistic and levels off at the carrying capacity.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write the **N(t+1)** equation and use it in calculations.',
        'Give rates **per individual per unit time**.',
        'Draw **J and S curves** on one graph, labelling **K**.',
        'Name the **three pyramid shapes** and what each predicts.',
      ],
      n: 'Exam tips. Use the equation for change in numbers. Express rates per individual. Draw the two growth curves together and label the carrying capacity. And learn the three shapes of age pyramid.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Organisms and Populations — Part 2: Life history and population interactions',
  goals: [
    'Explain life history variation and reproductive fitness',
    'Describe mutualism and competition, including interference competition, competitive release and Gause’s principle',
    'Describe predation and anti-predator adaptations, parasitism, commensalism and amensalism',
  ],
  slides: [
    sl('title', 'Living together', {
      b: 'Part 2 — how organisms maximise reproductive fitness, and how populations of different species interact.',
      v: flow('LR', [['l', 'Life history'], ['m', 'Mutualism'], ['c', 'Competition'], ['p', 'Predation and parasitism'], ['o', 'Commensalism and amensalism']], [['l', 'm'], ['m', 'c'], ['c', 'p'], ['p', 'o']], 'Flow from life history to the main population interactions'),
      n: 'Every species tries to leave as many surviving offspring as possible, and no species lives alone. Its populations help, harm, or ignore populations of other species living nearby.',
    }),
    sl('concept', 'Life history variation', {
      b: 'Populations evolve to maximise **reproductive fitness (Darwinian fitness)**, a high r, in the habitat where they live.',
      v: table(['Pattern', 'Examples'], [['Breed only once in a lifetime', 'Pacific salmon, bamboo'], ['Breed many times', 'Most birds and mammals'], ['Many small offspring', 'Oysters, pelagic fishes'], ['Few large offspring', 'Birds, mammals']], 'Table of life history patterns'),
      n: 'Ecologists suggest that life-history traits evolve under the limits set by the abiotic and biotic surroundings. A species may put all its energy into one huge breeding event, like a salmon, or spread it over many seasons, like most mammals.',
    }),
    sl('concept', 'Population interactions', {
      b: 'Interactions between two species can be beneficial (+), harmful (−) or neutral (0) to each.',
      v: table(['Interaction', 'Species A', 'Species B'], [['Mutualism', '+', '+'], ['Competition', '−', '−'], ['Predation', '+', '−'], ['Parasitism', '+', '−'], ['Commensalism', '+', '0'], ['Amensalism', '−', '0']], 'Table of population interactions with plus, minus and zero signs'),
      n: 'In mutualism both gain, and in competition both lose. In predation and parasitism one gains at the other’s expense. In commensalism one gains while the other is unaffected, and in amensalism one is harmed while the other is unaffected.',
    }),
    sl('concept', 'Mutualism', {
      b: 'In **mutualism** both species benefit.',
      v: table(['Example', 'Benefit to each'], [['Lichens', 'Fungus gives shelter and water; alga or cyanobacterium makes food'], ['Mycorrhizae', 'Fungus absorbs nutrients for the plant; plant supplies carbohydrates'], ['Fig and fig wasp', 'Wasp pollinates the fig while laying eggs; fig seeds feed the wasp larvae (each fig species has its own wasp partner)'], ['Ophrys orchid and bee', 'Petal resembles a female bee; the male “pseudocopulates” and carries pollen (sexual deceit)']], 'Table of examples of mutualism'),
      n: 'Plants need animals to pollinate flowers and disperse seeds, and they reward them with nectar, pollen or fruit. Some partnerships are so close that each species depends on the other, like a fig and its wasp. The Ophrys orchid even tricks bees into pollinating it.',
    }),
    sl('concept', 'Competition', {
      b: '**Competition** harms both species. It occurs between closely related species, but also between unrelated ones for the same resource; resources need not be limiting — in **interference competition**, one species reduces the feeding efficiency of another.',
      v: table(['Example', 'What happened'], [['Flamingoes and fishes in South American lakes', 'Compete for the same zooplankton'], ['Abingdon tortoise (Galapagos)', 'Became extinct within a decade after goats were introduced, which were better at browsing'], ['Barnacles on the Scottish coast (Connell)', 'Larger Balanus excluded Chthamalus from the lower rocks; when Balanus was removed, Chthamalus spread there — competitive release']], 'Table of examples of competition'),
      n: 'Competitive release shows that a species confined to a small area can expand when a superior competitor is removed. Joseph Connell showed this with barnacles on Scottish rocky shores.',
    }),
    sl('diagram', 'Gause’s competitive exclusion principle', {
      b: '**Gause’s principle**: two closely related species competing for the **same limiting resources** cannot coexist indefinitely; the **competitively inferior** one is eventually **eliminated**. Gause showed this with two species of **Paramecium**.',
      v: V.gause,
      n: 'Grown alone, each species of Paramecium reaches its own carrying capacity. Grown together on the same food, one keeps increasing while the other rises at first and then declines and disappears.',
    }),
    sl('example', 'Worked example 1: reading the competition model', {
      b: `In the model, species 2 grown with species 1 peaks on day ${PEAK2_DAY} and then declines. Read the peak and the final numbers, and state the principle shown.`,
      ul: [
        `Species 2 alone reaches about **${Math.round(GAUSE_END.alone2)}**; with species 1 it peaks at only about **${Math.round(PEAK2)}** (day ${PEAK2_DAY}) and falls to **${Math.round(GAUSE_END.tog2)}** by day ${GAUSE.days}.`,
        `Species 1 reaches about **${Math.round(GAUSE_END.tog1)}** either way.`,
        '**Competitive exclusion**: the inferior competitor is eliminated.',
      ],
      v: table(['Species', 'Alone (day 24)', 'Together (day 24)'], [['1', String(Math.round(GAUSE_END.alone1)), String(Math.round(GAUSE_END.tog1))], ['2', String(Math.round(GAUSE_END.alone2)), String(Math.round(GAUSE_END.tog2))]], `Worked table: species 2 falls to ${Math.round(GAUSE_END.tog2)} when grown with species 1`),
      n: 'Comparing the two panels shows the effect of competition. Species 2 does well alone, but sharing food with a better competitor drives it out. This is what Gause found with Paramecium.',
    }),
    sl('concept', 'Resource partitioning', {
      b: 'Competing species can **coexist** by **resource partitioning**: using the same resource in different ways, places or times.',
      v: table(['Example', 'How they avoid competition'], [['Five warbler species on one tree (MacArthur)', 'Feed in different parts of the branches with different foraging activities'], ['Ophrys and other plants', 'Different pollinators'], ['Many grazers on grasslands', 'Feed at different heights or times']], 'Table of examples of resource partitioning'),
      n: 'Robert MacArthur found five closely related warblers living on the same tree. They avoided competition and coexisted because each fed in a different part of the tree in a different way.',
    }),
    sl('check', 'Quick check: Gause', {
      b: 'What does Gause’s competitive exclusion principle state?',
      n: 'Quick check. Can two species share exactly the same limiting resources for ever?',
      chk: 'gause-mcq',
    }),
    sl('concept', 'Predation and anti-predator defences', {
      b: '**Predators** transfer energy to higher trophic levels, **keep prey populations in check** and help **maintain species diversity**. Prey have evolved defences.',
      v: table(['Defence', 'Example'], [['Camouflage (cryptic colouring)', 'Some insects and frogs blend with their background'], ['Being distasteful', 'Monarch butterfly stores a poison from the weed it ate as a caterpillar'], ['Thorns', 'Acacia, cactus'], ['Chemicals', 'Calotropis makes cardiac glycosides; nicotine, caffeine, quinine, strychnine and opium deter herbivores']], 'Table of anti-predator defences'),
      n: 'When the prickly pear cactus spread over millions of hectares in Australia, it was controlled only by bringing in a moth that eats it. When the starfish Pisaster was removed from a rocky shore, more than ten species of invertebrates disappeared within a year, because one prey species took over.',
    }),
    sl('example', 'Worked example 2: a keystone predator', {
      b: `On an American rocky shore, removal of the predatory starfish Pisaster reduced the number of invertebrate species from about ${PISASTER.before} to ${PISASTER.before - 10} within a year (illustrative figures). What percentage of species was lost, and why?`,
      ul: [
        r`Loss $= \dfrac{10}{${PISASTER.before}} \times 100 = ${round((10 / PISASTER.before) * 100, 1)}$ percent.`,
        'Without the predator, **one prey species out-competed the others** for space, so diversity fell.',
      ],
      v: table(['Situation', 'Species'], [['With Pisaster', String(PISASTER.before)], ['A year after removal', String(PISASTER.before - 10)]], `Worked table: ${round((10 / PISASTER.before) * 100, 1)} percent of species lost`),
      n: 'Predators can increase diversity by preventing any one prey species from becoming dominant. Remove the predator, and competition among prey eliminates many species.',
    }),
    sl('concept', 'Parasitism', {
      b: 'Parasites live on or in a **host**, gaining food and shelter and harming it. Many are **host-specific** and have special **adaptations**: loss of unnecessary sense organs, **adhesive organs or suckers**, loss of the digestive system, and **high reproductive capacity**; many need **intermediate hosts** (the human liver fluke uses a snail and a fish).',
      v: table(['Type', 'Examples'], [['Ectoparasites (on the host)', 'Lice on humans, ticks on dogs, copepods on marine fish, Cuscuta on hedge plants'], ['Endoparasites (inside the host)', 'Tapeworm, liver fluke, Plasmodium'], ['Brood parasites', 'Cuckoo (koel) lays eggs in the nest of a crow, which rears its young; the eggs mimic the host’s in size and colour']], 'Table of types of parasites with examples'),
      n: 'Endoparasites have the simplest bodies, since they live surrounded by food. The cuckoo’s eggs resemble the crow’s, which reduces the chance that the host will detect and throw them out.',
    }),
    sl('concept', 'Commensalism and amensalism', {
      b: 'In **commensalism** one species benefits and the other is **neither harmed nor benefited**; in **amensalism** one is **harmed** and the other **unaffected**.',
      v: table(['Interaction', 'Example'], [['Commensalism', 'Orchid growing as an epiphyte on a mango branch'], ['Commensalism', 'Barnacles on the back of a whale'], ['Commensalism', 'Cattle egrets feeding on insects stirred up by grazing cattle'], ['Commensalism', 'Clown fish living among the stinging tentacles of a sea anemone'], ['Amensalism', 'Penicillium secretes penicillin, which harms bacteria, while the mould is unaffected']], 'Table of examples of commensalism and amensalism'),
      n: 'The clown fish gains protection among the anemone’s stinging tentacles, and the anemone does not seem to gain anything. In amensalism, a mould releases a chemical that harms nearby bacteria without any effect on itself.',
    }),
    sl('check', 'Quick check: brood parasites', {
      b: 'Judge the assertion and the reason about the cuckoo.',
      n: 'Quick check. Why do the cuckoo’s eggs look like the crow’s?',
      chk: 'brood-ar',
    }),
    sl('check', 'Quick check: commensalism', {
      b: 'Which pair shows commensalism?',
      n: 'Quick check. One gains and the other is unaffected.',
      chk: 'commensal-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Life history: maximise reproductive fitness; breed once (salmon, bamboo) or many times; many small or few large offspring.',
        'Mutualism: lichens, mycorrhizae, fig and wasp, Ophrys (sexual deceit).',
        'Competition: flamingoes and fish, Abingdon tortoise, interference; competitive release (Connell); Gause’s principle; resource partitioning (MacArthur).',
        'Predation: control of prey (prickly pear), diversity (Pisaster); defences: camouflage, Monarch, thorns, Calotropis.',
        'Parasitism (ecto-, endo-, brood); commensalism (orchid, barnacles, egret, clown fish); amensalism (Penicillium).',
      ],
      v: table(['Interaction', 'Signs'], [['Mutualism', '+ / +'], ['Competition', '− / −'], ['Predation, parasitism', '+ / −'], ['Commensalism', '+ / 0'], ['Amensalism', '− / 0']], 'Summary table of interactions and signs'),
      n: 'To recap: life histories are shaped to maximise reproductive fitness. Species interact as mutualists, competitors, predators, parasites, commensals or amensals, and these interactions shape communities.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give each interaction with its **signs** and a **named example**.',
        'State **Gause’s principle** and give **Connell’s** and **MacArthur’s** examples.',
        'List **three adaptations** of parasites and **three** anti-predator defences.',
        'Distinguish **ecto-, endo- and brood** parasites.',
      ],
      n: 'Exam tips. For each interaction, give the signs and an example. Learn Gause’s principle with the barnacle and warbler examples. List adaptations of parasites and defences of prey. And keep the three kinds of parasite apart.',
    }),
  ],
});
