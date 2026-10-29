// ch11 Organisms and Populations — three decks: Part 1 (t01), Part 2 (t02), Part 3 (t03).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { GROWTH, PYRAMIDS, DENSITY } from './svgs.mjs';
import { rate, nextN, logisticRate, round, R } from './calc.mjs';

export const V = {
  growth: svgV(GROWTH, 'Exponential J-shaped and logistic S-shaped population growth curves with the carrying capacity'),
  pyramids: svgV(PYRAMIDS, 'Expanding, stable and declining age pyramids'),
  density: svgV(DENSITY, 'Natality and immigration add to population density; mortality and emigration reduce it'),
};

// ---------------------------------------------------------------- computed numbers
const FROGS = { N: 60, born: 15 };
FROGS.b = rate(FROGS.born, FROGS.N, 2);
const FLIES = { N: 50, died: 5 };
FLIES.d = rate(FLIES.died, FLIES.N, 2);
const AGE = { pre: 450, rep: 400, post: 150 };
AGE.total = AGE.pre + AGE.rep + AGE.post;
AGE.pPre = Math.round((AGE.pre / AGE.total) * 100);
AGE.pRep = Math.round((AGE.rep / AGE.total) * 100);
AGE.pPost = Math.round((AGE.post / AGE.total) * 100);
const POND = { Nt: 500, B: 60, I: 15, D: 40, E: 25 };
POND.next = nextN(POND.Nt, POND.B, POND.I, POND.D, POND.E);
const BEETLE = { r: R.beetle, N: 200, K: 1000 };
BEETLE.exp = round(BEETLE.r * BEETLE.N, 1);
BEETLE.log = round(logisticRate(BEETLE.r, BEETLE.N, BEETLE.K), 1);
BEETLE.frac = round((BEETLE.K - BEETLE.N) / BEETLE.K, 2);

export const deck1 = deck({
  part: 1,
  title: 'Organisms and Populations — Part 1: Population attributes',
  goals: [
    'Define a population and list its attributes',
    'Calculate per capita birth and death rates',
    'Interpret age pyramids',
    'Explain how population density is measured',
  ],
  slides: [
    sl('title', 'Organisms and Populations', {
      b: 'Part 1 — a population has features that no single individual has.',
      v: flow('LR', [['i', 'Individual'], ['p', 'Population'], ['c', 'Community']], [['i', 'p', 'same species, same area'], ['p', 'c', 'many species together']], 'Flow from individual to population to community'),
      n: 'In nature we rarely find an isolated single individual of a species. Most live in groups in a well-defined area, share or compete for similar resources, and potentially interbreed. Such a group is a population. A population has attributes that an individual does not have.',
    }),
    sl('concept', 'Attributes of a population', {
      b: 'An individual is born and dies; a **population** has **birth rates** and **death rates**. An individual is male or female; a population has a **sex ratio**. A population also has an **age distribution** and a **population density**.',
      v: table(['Attribute', 'Meaning', 'Example'], [['Birth rate (natality)', 'Births per individual per unit time', '0.4 offspring per lotus plant per year'], ['Death rate (mortality)', 'Deaths per individual per unit time', '0.1 deaths per fruit fly per week'], ['Sex ratio', 'Proportion of females and males', '60 percent females, 40 percent males'], ['Age distribution', 'Proportion of individuals in each age group', 'Plotted as an age pyramid'], ['Population density (N)', 'Population size in a given area', 'Trees per hectare']], 'Table of population attributes with meanings and examples'),
      n: 'Birth and death rates are expressed per individual, or per capita, because the total number of births means little without knowing the size of the population. Sex ratio and age distribution describe the structure of a population, and density tells us how many there are.',
    }),
    sl('example', 'Worked example 1: per capita rates', {
      b: `A pond had ${FROGS.N} frogs last year, and ${FROGS.born} new frogs were added through reproduction. In a laboratory, ${FLIES.died} of ${FLIES.N} fruit flies died during a week. Calculate the birth rate and the death rate.`,
      ul: [
        r`Birth rate $= \dfrac{${FROGS.born}}{${FROGS.N}} = ${FROGS.b}$ offspring per frog per year.`,
        r`Death rate $= \dfrac{${FLIES.died}}{${FLIES.N}} = ${FLIES.d}$ deaths per fruit fly per week.`,
        'Always state the unit: per individual per unit time.',
      ],
      v: table(['Population', 'Size', 'Events', 'Per capita rate'], [['Frogs (births, 1 year)', String(FROGS.N), String(FROGS.born), String(FROGS.b)], ['Fruit flies (deaths, 1 week)', String(FLIES.N), String(FLIES.died), String(FLIES.d)]], `Worked table: birth rate ${FROGS.b} per frog per year, death rate ${FLIES.d} per fly per week`),
      n: 'Divide the number of births or deaths by the size of the population. Fifteen new frogs among sixty gives a birth rate of zero point two five per frog per year. Five deaths among fifty flies gives a death rate of zero point one per fly per week. Always give the time unit.',
    }),
    sl('check', 'Quick check: death rate', {
      b: 'Work out a per capita death rate.',
      n: 'Quick check. Divide the deaths by the population size.',
      chk: 'deathrate-num',
    }),
    sl('concept', 'Sex ratio and age distribution', {
      b: 'The **sex ratio** gives the proportion of females and males, for example **60 percent females and 40 percent males**. The **age distribution** gives the percentage of individuals that are **pre-reproductive**, **reproductive** and **post-reproductive**. Together they show how many individuals can breed now and in the near future.',
      v: table(['Age group', 'Role in growth'], [['Pre-reproductive', 'Will join the breeding group soon'], ['Reproductive', 'Produces offspring now'], ['Post-reproductive', 'No longer adds offspring']], 'Table of three age groups and their role in population growth'),
      n: 'An individual is simply male or female, but a population has a sex ratio. An individual has an age, but a population has an age distribution. Knowing how many individuals are young, breeding or old lets us predict whether the population will grow.',
    }),
    sl('diagram', 'Age pyramids', {
      b: 'When the age distribution (percentage of individuals of a given age or age group) is plotted for a population, the structure is called an **age pyramid**. Its shape reflects the growth status: **expanding** (growing), **stable** or **declining**.',
      v: V.pyramids,
      n: 'An age pyramid stacks the young at the bottom and the old at the top. A broad base of young people means many will soon reach reproductive age, so the population grows. A bell shape means a stable population, and a narrow base, like an urn, means a declining one.',
    }),
    sl('example', 'Worked example 2: reading an age structure', {
      b: `A town has ${AGE.pre} pre-reproductive, ${AGE.rep} reproductive and ${AGE.post} post-reproductive individuals. Find the percentage in each group and predict how the population will change.`,
      ul: [
        r`Total $= ${AGE.pre} + ${AGE.rep} + ${AGE.post} = ${AGE.total}$.`,
        r`Pre-reproductive $= \dfrac{${AGE.pre}}{${AGE.total}} \times 100 = ${AGE.pPre}$ percent; reproductive $= ${AGE.pRep}$ percent; post-reproductive $= ${AGE.pPost}$ percent.`,
        'The largest group is the youngest, so the pyramid has a broad base — **expanding**: the population will grow.',
      ],
      v: table(['Age group', 'Number', 'Percent'], [['Pre-reproductive', String(AGE.pre), String(AGE.pPre)], ['Reproductive', String(AGE.rep), String(AGE.pRep)], ['Post-reproductive', String(AGE.post), String(AGE.pPost)]], `Worked table: ${AGE.pPre}, ${AGE.pRep} and ${AGE.pPost} percent in the three age groups`),
      n: 'Add the groups to get one thousand, then convert each to a percentage. Forty-five percent are young, forty percent are of reproductive age and fifteen percent are old. A base wider than the middle gives an expanding pyramid, so we expect growth.',
    }),
    sl('check', 'Quick check: pyramid shape', {
      b: 'Which shape of age pyramid indicates a declining population?',
      n: 'Quick check. Think about the width of the base.',
      chk: 'urn-mcq',
    }),
    sl('concept', 'Measuring population density', {
      b: 'Counting every individual is ideal but often impossible or unnecessary. The method chosen depends on the organism and the question being asked.',
      v: table(['Situation', 'Better measure'], [['200 Parthenium plants but one huge banyan tree', 'Percent cover or biomass, not numbers'], ['Fish in a lake', 'Relative density: fish caught per trap'], ['Tigers in a reserve', 'Pugmarks and fecal pellets'], ['Bacteria in a Petri dish', 'Indirect measures, as counting is impossible']], 'Table of situations and suitable ways of measuring population density'),
      n: 'Numbers can mislead. Two hundred weeds and one huge banyan tree in the same area do not mean the banyan matters less, so percent cover or biomass is more meaningful. Often a relative density is enough, such as fish caught per trap, and tiger numbers are estimated from pugmarks and droppings.',
    }),
    sl('check', 'Quick check: tiger census', {
      b: 'How is a tiger census in a national park usually carried out?',
      n: 'Quick check. Tigers are hard to see, so what signs do they leave?',
      chk: 'tiger-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'A population: individuals of a species in a defined area that share resources and potentially interbreed.',
        'Attributes: birth rate, death rate (per capita), sex ratio, age distribution, population density.',
        'Age pyramids: expanding (broad base), stable (bell), declining (urn, narrow base).',
        'Density: numbers, percent cover, biomass, or relative density (fish per trap, pugmarks and fecal pellets).',
      ],
      v: table(['Pyramid', 'Growth status'], [['Broad base', 'Expanding'], ['Bell', 'Stable'], ['Narrow base', 'Declining']], 'Summary table of pyramid shapes and growth status'),
      n: 'To recap: populations have birth and death rates, a sex ratio, an age structure and a density. Age pyramids show whether a population is growing, stable or declining. And density can be measured in many ways, from percent cover to pugmarks.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Express birth and death rates **per individual per unit time**.',
        'Name the **three pyramid shapes** with the growth status of each.',
        'Explain **why numbers alone may mislead** (the banyan and Parthenium example).',
        'Know **indirect methods**: pugmarks, fecal pellets, catch per trap.',
      ],
      n: 'Exam tips. Give rates per individual per unit time. Name the three shapes of age pyramid and what each means. Explain why numbers can mislead. And learn the indirect ways of estimating density.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Organisms and Populations — Part 2: Population growth',
  goals: [
    'Explain how natality, mortality, immigration and emigration change population density',
    'Compare exponential and logistic growth models',
    'Explain carrying capacity',
    'Describe life history variation',
  ],
  slides: [
    sl('title', 'Population growth', {
      b: 'Part 2 — how fast can a population grow, and what stops it?',
      v: flow('LR', [['u', 'Unlimited resources'], ['j', 'Exponential (J-shaped) growth'], ['l', 'Limited resources'], ['s', 'Logistic (S-shaped) growth']], [['u', 'j'], ['l', 's']], 'Flow linking resource availability to the two growth models'),
      n: 'The size of a population is not static. It changes with food availability, predation pressure and weather. These changes tell us whether a population is flourishing or declining. Two simple models describe how populations grow.',
    }),
    sl('diagram', 'Four processes change density', {
      b: 'Density changes through **natality (B)** and **immigration (I)**, which add individuals, and **mortality (D)** and **emigration (E)**, which remove them.',
      v: V.density,
      m: [r`N_{t+1} = N_t + \left[(B + I) - (D + E)\right]`],
      n: 'Births and individuals arriving from elsewhere add to a population. Deaths and individuals leaving reduce it. Under normal conditions births and deaths matter most; immigration can be important when a new habitat is being colonised.',
    }),
    sl('example', 'Worked example 1: next year’s population', {
      b: `A deer population of ${POND.Nt} had ${POND.B} births, ${POND.I} immigrants, ${POND.D} deaths and ${POND.E} emigrants in a year. Find the population at the end of the year.`,
      ul: [
        r`$N_{t+1} = ${POND.Nt} + \left[(${POND.B} + ${POND.I}) - (${POND.D} + ${POND.E})\right]$.`,
        r`$= ${POND.Nt} + (${POND.B + POND.I} - ${POND.D + POND.E}) = ${POND.next}$.`,
        'Additions exceeded losses, so the population grew.',
      ],
      v: table(['Process', 'Number', 'Effect'], [['Births (B)', String(POND.B), 'Add'], ['Immigration (I)', String(POND.I), 'Add'], ['Deaths (D)', String(POND.D), 'Remove'], ['Emigration (E)', String(POND.E), 'Remove'], ['New population', String(POND.next), '']], `Worked table: population rises from ${POND.Nt} to ${POND.next}`),
      n: 'Add births and immigrants to get seventy-five, then add deaths and emigrants to get sixty-five. The difference is ten, so the population rises from five hundred to five hundred and ten.',
    }),
    sl('check', 'Quick check: density change', {
      b: 'Which two processes increase population density?',
      n: 'Quick check. Think about individuals being added.',
      chk: 'adds-mcq',
    }),
    sl('concept', 'Exponential growth', {
      b: 'When resources (food and space) are **unlimited**, each species can realise its full potential to grow. With **b** the per capita birth rate and **d** the per capita death rate, the population grows at a rate set by **r = b − d**, the **intrinsic rate of natural increase**.',
      m: [r`\dfrac{dN}{dt} = rN`, r`N_t = N_0\, e^{rt}`],
      v: table(['Organism or population', 'r'], [['Norway rat', String(R.rat)], ['Flour beetle', String(R.beetle)], ['Human population of India (1981)', String(R.india1981)]], 'Table of r values quoted for three populations'),
      n: 'With unlimited resources, a population grows by a fixed fraction of its size, so the bigger it gets, the faster it grows. The result is a J-shaped curve. Even a slow-breeding animal like the elephant could reach enormous numbers if nothing checked its growth.',
    }),
    sl('diagram', 'Exponential and logistic curves', {
      b: 'In nature, resources are limited. A habitat can support only a maximum number, the **carrying capacity (K)**. A population growing in such a habitat shows a **lag phase**, then **acceleration**, **deceleration** and an **asymptote** at K: the **logistic** or **Verhulst-Pearl** model.',
      v: V.growth,
      m: [r`\dfrac{dN}{dt} = rN\left(\dfrac{K - N}{K}\right)`],
      n: 'The logistic curve starts like the exponential one but bends over as resources run short and competition grows, finally levelling off at the carrying capacity. Because resources for most populations become limiting sooner or later, the logistic model is considered the more realistic one.',
    }),
    sl('example', 'Worked example 2: limits to growth', {
      b: `A flour beetle population (r = ${BEETLE.r}) has ${BEETLE.N} individuals in a habitat with carrying capacity ${BEETLE.K}. Compare its growth rate under the exponential and the logistic models.`,
      ul: [
        r`Exponential: $\dfrac{dN}{dt} = rN = ${BEETLE.r} \times ${BEETLE.N} = ${BEETLE.exp}$ per unit time.`,
        r`Logistic: $\dfrac{K - N}{K} = \dfrac{${BEETLE.K} - ${BEETLE.N}}{${BEETLE.K}} = ${BEETLE.frac}$, so $\dfrac{dN}{dt} = ${BEETLE.exp} \times ${BEETLE.frac} = ${BEETLE.log}$.`,
        'As N approaches K, the factor (K − N)/K approaches zero and growth stops.',
      ],
      v: table(['Model', 'Growth rate'], [['Exponential', String(BEETLE.exp)], ['Logistic', String(BEETLE.log)]], `Worked table: exponential ${BEETLE.exp}, logistic ${BEETLE.log}`),
      n: 'The exponential model gives twenty-four new beetles per unit time. In the logistic model, only eight-tenths of the habitat’s capacity remains unused, so the rate falls to nineteen point two. When the population reaches the carrying capacity, the logistic growth rate becomes zero.',
    }),
    sl('check', 'Quick check: carrying capacity', {
      b: 'Judge the assertion and the reason about logistic growth.',
      n: 'Quick check. What happens to growth as the population nears the carrying capacity?',
      chk: 'logistic-ar',
    }),
    sl('concept', 'Life history variation', {
      b: 'Populations evolve to maximise their **reproductive fitness** (**Darwinian fitness**, a high r value) in their habitat. Under a particular set of selection pressures, organisms evolve the most efficient reproductive strategy.',
      v: table(['Strategy', 'Examples'], [['Breed only once in a lifetime', 'Pacific salmon fish, bamboo'], ['Breed many times', 'Most birds and mammals'], ['Many small offspring', 'Oysters, pelagic fishes'], ['Few large offspring', 'Birds, mammals']], 'Table of life history strategies with examples'),
      n: 'Some organisms put all their effort into one burst of breeding, like the Pacific salmon and bamboo. Others breed many times. Some produce huge numbers of tiny offspring, like oysters, while birds and mammals produce a few large ones. Each is a way of maximising fitness in a particular habitat.',
    }),
    sl('check', 'Quick check: life history', {
      b: 'Which organism breeds only once in its lifetime?',
      n: 'Quick check. Recall the fish that dies after spawning.',
      chk: 'salmon-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        r`Density changes: $N_{t+1} = N_t + [(B + I) - (D + E)]$.`,
        r`Exponential: $dN/dt = rN$, J-shaped; $r = b - d$ (Norway rat 0.015, flour beetle 0.12, India 1981 0.0205).`,
        r`Logistic: $dN/dt = rN(K - N)/K$, S-shaped; lag, acceleration, deceleration, asymptote at K; more realistic.`,
        'Life history: breed once (salmon, bamboo) or many times; many small or few large offspring.',
      ],
      v: table(['Model', 'Shape', 'Resources'], [['Exponential', 'J', 'Unlimited'], ['Logistic', 'S', 'Limited']], 'Summary table comparing exponential and logistic growth'),
      n: 'To recap: births and immigration add to a population while deaths and emigration remove from it. Unlimited resources allow exponential, J-shaped growth. Limited resources give logistic, S-shaped growth that levels off at the carrying capacity.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write both **growth equations** and name the **curve shapes**.',
        'Define **carrying capacity** and **intrinsic rate of natural increase**.',
        'Label the **phases** of the logistic curve.',
        'Explain why the **logistic model is more realistic**.',
      ],
      n: 'Exam tips. Write both growth equations and match each to its curve. Define carrying capacity and the intrinsic rate of natural increase. Label the four phases of the S-shaped curve. And explain why it is more realistic.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Organisms and Populations — Part 3: Population interactions',
  goals: [
    'Classify interactions by their effect on each species',
    'Explain predation, competition and parasitism with examples',
    'Explain commensalism and mutualism with examples',
  ],
  slides: [
    sl('title', 'Population interactions', {
      b: 'Part 3 — no species lives alone: how populations of different species affect each other.',
      v: table(['Species A', 'Species B', 'Interaction'], [['+', '+', 'Mutualism'], ['−', '−', 'Competition'], ['+', '−', 'Predation'], ['+', '−', 'Parasitism'], ['+', '0', 'Commensalism'], ['−', '0', 'Amensalism']], 'Table of six interspecific interactions with the effect on each species'),
      n: 'Even the simplest community needs plants for food and microbes to break down wastes. Populations of different species interact, and each interaction can be beneficial, harmful or neutral to each partner. Predation and parasitism benefit one species at the cost of the other. Commensalism benefits one and leaves the other unaffected.',
    }),
    sl('concept', 'Predation', {
      b: 'Predation is nature’s way of **transferring energy** fixed by plants to higher trophic levels. Predators also **keep prey populations under control** and help **maintain species diversity** by reducing competition among prey.',
      v: table(['Case', 'What happened'], [['Prickly pear cactus in Australia (early 1930s)', 'Spread out of control until a cactus-feeding moth from its natural habitat was introduced'], ['Starfish Pisaster removed from rocky shores of the American Pacific coast', 'More than 10 invertebrate species became extinct within a year because of competition']], 'Table of two cases showing the role of predators'),
      n: 'When an exotic species is introduced without its natural predators, it can spread out of control, as the prickly pear cactus did in Australia. It was tamed only when its natural predator, a moth, was brought in. This is the idea behind biological control of pests.',
    }),
    sl('concept', 'Defences of prey', {
      b: 'Prey species have evolved defences. Nearly **25 percent of all insects** are plant eaters (phytophagous), and plants, which cannot run, rely on morphological and chemical defences.',
      v: table(['Defence', 'Example'], [['Camouflage (cryptic colouring)', 'Some insects and frogs'], ['Distasteful chemicals', 'Monarch butterfly: chemical acquired by its caterpillar from a poisonous weed'], ['Thorns', 'Acacia, cactus'], ['Poisons', 'Calotropis: cardiac glycosides, so cattle and goats avoid it'], ['Chemicals used by humans', 'Nicotine, caffeine, quinine, strychnine, opium']], 'Table of prey defences with examples'),
      n: 'Animals hide by camouflage or become distasteful, like the monarch butterfly, whose caterpillar takes up a chemical from a poisonous weed. Plants use thorns and chemicals. Many chemicals we use, such as nicotine, caffeine and quinine, are actually plant defences against grazers and browsers.',
    }),
    sl('check', 'Quick check: predators', {
      b: 'What happened when the starfish Pisaster was removed from a rocky intertidal community?',
      n: 'Quick check. Did diversity rise or fall?',
      chk: 'pisaster-mcq',
    }),
    sl('concept', 'Competition', {
      b: 'In competition, the **fitness** of one species (its r) is significantly lower in the presence of another. It happens between related and unrelated species, and even when resources are plentiful (**interference competition**).',
      v: table(['Evidence', 'Example'], [['Unrelated species compete', 'Flamingoes and resident fishes compete for zooplankton in some South American lakes'], ['Extinction by a superior competitor', 'Abingdon tortoise (Galapagos) extinct within a decade of goats being introduced'], ['Competitive exclusion in the field', 'On Scottish rocky coasts the larger barnacle Balanus excludes the smaller Chthamalus from the intertidal zone'], ['Coexistence by resource partitioning', 'MacArthur: five warbler species on the same tree forage differently']], 'Table of evidence for competition with examples'),
      n: 'Gause’s competitive exclusion principle states that two closely related species competing for the same resources cannot coexist indefinitely; the inferior one is eventually eliminated. But species can coexist by partitioning resources, for example feeding at different times or in different parts of a tree, as five warbler species do.',
    }),
    sl('example', 'Worked example 1: name the interaction', {
      b: 'Classify each interaction with signs for the two species.',
      ul: [
        'Goats introduced on a Galapagos island out-browse the native tortoise → **competition** (−, −), tortoise eliminated.',
        'A cuckoo lays its eggs in a crow’s nest; the crow raises the chicks → **brood parasitism** (+, −).',
        'An orchid grows as an epiphyte on a mango branch → **commensalism** (+, 0).',
        'A fungus and an alga live together as a lichen → **mutualism** (+, +).',
      ],
      v: table(['Pair', 'Signs', 'Interaction'], [['Goat and tortoise', '− −', 'Competition'], ['Cuckoo and crow', '+ −', 'Parasitism'], ['Orchid and mango', '+ 0', 'Commensalism'], ['Fungus and alga', '+ +', 'Mutualism']], 'Worked table classifying four interactions by signs'),
      n: 'Ask what each partner gains or loses. Competitors both lose. A brood parasite gains while its host loses. An epiphytic orchid gains support while the mango tree is unaffected. And the partners in a lichen both benefit.',
    }),
    sl('concept', 'Parasitism', {
      b: 'Many parasites are **host-specific** and evolve with their hosts. Adaptations: loss of unnecessary sense organs, **adhesive organs or suckers**, loss of the digestive system, and **high reproductive capacity**.',
      v: table(['Type', 'Example'], [['Ectoparasites (feed on the surface)', 'Lice on humans, ticks on dogs, copepods on marine fish, Cuscuta on hedge plants'], ['Endoparasites (live inside)', 'Human liver fluke: needs a snail and a fish as intermediate hosts'], ['Brood parasitism', 'Cuckoo (koel) lays eggs in a crow’s nest; its eggs resemble the host’s']], 'Table of kinds of parasites with examples'),
      n: 'Parasites harm their hosts by reducing survival, growth and reproduction, and can lower host population density or make hosts easier prey. Cuscuta, a parasitic plant without chlorophyll, takes nutrition from hedge plants. The cuckoo’s eggs look like the crow’s, so the crow is fooled into incubating them.',
    }),
    sl('check', 'Quick check: parasites', {
      b: 'Judge the assertion and the reason about the human liver fluke.',
      n: 'Quick check. How many intermediate hosts does it need?',
      chk: 'fluke-ar',
    }),
    sl('concept', 'Commensalism and mutualism', {
      b: '**Commensalism** (+, 0): orchid on a mango branch; barnacles on a whale’s back; **cattle egret** foraging near grazing cattle, which stir up insects; **clown fish** among the stinging tentacles of a **sea anemone**.\n\n**Mutualism** (+, +): **lichens** (fungus and alga or cyanobacterium); **mycorrhizae** (fungi help roots absorb nutrients, plants supply carbohydrates); **pollination** and **seed dispersal**.',
      v: table(['Mutualism', 'Benefit to each partner'], [['Fig and its wasp', 'Wasp lays eggs in the fruit and larvae feed on developing seeds; wasp pollinates the fig'], ['Ophrys orchid and bee', 'Petal resembles a female bee; male pseudocopulates and transfers pollen (sexual deceit)']], 'Table of two plant–animal mutualisms and partner benefits'),
      n: 'Each fig species is pollinated by only one partner wasp species, and the wasp needs the fig to raise its young. The Mediterranean orchid Ophrys has a petal that looks like a female bee. A male bee tries to mate with it and carries pollen to the next flower. If the bee’s colour pattern changed, the orchid would have to co-evolve.',
    }),
    sl('example', 'Worked example 2: a barnacle experiment', {
      b: 'On a rocky coast, the larger barnacle Balanus occupies the lower shore and the smaller Chthamalus the upper shore. When Balanus is removed from part of the lower shore, Chthamalus spreads into it. Explain.',
      ul: [
        'Chthamalus **can** live on the lower shore, so its restriction was not due to physical conditions.',
        'It was excluded by the **competitively superior** Balanus.',
        'When the competitor was removed, Chthamalus expanded its range — **competitive release**.',
        'This supports **Gause’s competitive exclusion principle**.',
      ],
      v: flow('LR', [['b', 'Balanus present: Chthamalus restricted'], ['r', 'Balanus removed'], ['e', 'Chthamalus expands: competitive release']], [['b', 'r'], ['r', 'e']], 'Worked flow showing competitive release of Chthamalus when Balanus is removed'),
      n: 'If Chthamalus could not survive lower down, removing Balanus would make no difference. Because it spreads at once, the barrier must have been competition. A species expanding its range when a superior competitor is removed is called competitive release.',
    }),
    sl('check', 'Quick check: mutualism', {
      b: 'Which pair shows mutualism?',
      n: 'Quick check. Both partners must benefit.',
      chk: 'mutual-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Signs: mutualism (+ +), competition (− −), predation and parasitism (+ −), commensalism (+ 0), amensalism (− 0).',
        'Predation: energy transfer, prey control (prickly pear), diversity (Pisaster); prey defences (camouflage, monarch, Calotropis).',
        'Competition: Abingdon tortoise, Balanus and Chthamalus, Gause’s principle, resource partitioning (warblers).',
        'Parasitism: host-specific; liver fluke, Cuscuta, cuckoo. Commensalism: orchid, barnacles, egret, clown fish. Mutualism: lichen, mycorrhiza, fig–wasp, Ophrys.',
      ],
      v: table(['Interaction', 'Key example'], [['Predation', 'Prickly pear and moth'], ['Competition', 'Balanus and Chthamalus'], ['Parasitism', 'Cuckoo and crow'], ['Commensalism', 'Cattle egret and cattle'], ['Mutualism', 'Fig and wasp']], 'Summary table of interactions with one key example each'),
      n: 'To recap: interactions are classified by their effect on each partner. Predators control prey and maintain diversity. Competition can exclude a species unless resources are partitioned. Parasites are adapted to their hosts, and commensals and mutualists live alongside others with benefit to one or both.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Use **signs** to classify interactions and give **one example** for each.',
        'State **Gause’s principle** and how **resource partitioning** allows coexistence.',
        'Describe **sexual deceit** in Ophrys and the **fig–wasp** partnership.',
        'List **parasite adaptations**.',
      ],
      n: 'Exam tips. Classify interactions using signs and learn an example for each. State Gause’s principle and explain resource partitioning. Describe the Ophrys orchid and the fig and wasp. And list the adaptations of parasites.',
    }),
  ],
});
