// ch11 notes and flashcards.
import { T, table, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { R } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Organisms and Populations — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Population attributes',
      `A **population** is a group of individuals of a species living in a well-defined geographical area, sharing or competing for similar resources and potentially interbreeding. A population has attributes that an individual does not.

- **Birth rate (natality)** and **death rate (mortality)** are expressed **per capita**: births or deaths per individual per unit time. Example: 8 new plants added to a pond with 20 lotus plants in a year gives 8/20 = 0.4 offspring per lotus plant per year; 4 deaths among 40 fruit flies in a week gives 0.1 per fly per week.
- **Sex ratio**: for example 60 percent females and 40 percent males.
- **Age distribution**: the percentage of individuals of each age group. Plotted for a population, it gives an **age pyramid** (for humans, males and females are shown in one combined diagram). Shapes: **expanding** (triangular, broad base — growing), **stable** (bell-shaped), **declining** (urn-shaped, narrow base).
- **Population density (N)**: the population size in a given area. It need not always be a count. With 200 *Parthenium* plants and a single huge banyan tree in an area, stating that banyan density is low would underestimate its enormous role; **percent cover** or **biomass** is more meaningful. **Relative densities** often serve the purpose — e.g. the number of fish caught per trap. Tiger census in national parks and reserves is often based on **pugmarks and fecal pellets**. Counting bacteria in a Petri dish is impossible, so indirect methods are used.`,
      [kt('Population', 'Individuals of a species in a defined area that share resources and can interbreed.'), kt('Natality', 'The number of births in a population per unit time, usually expressed per individual.'), kt('Age pyramid', 'A diagram of the age distribution of a population; its shape shows whether the population is growing, stable or declining.'), kt('Relative density', 'An index of abundance, such as catch per trap, used when absolute numbers are not needed.')],
      V.pyramids,
      [1],
      [table(['Organism', 'Method of estimating density'], [['Banyan among Parthenium', 'Percent cover or biomass'], ['Fish', 'Catch per trap'], ['Tiger', 'Pugmarks and fecal pellets']], 'Table of organisms and methods used to estimate their density')],
    ),
    sec(
      '2. Population growth',
      `**Changes in density.** Four processes: **natality (B)** and **immigration (I)** increase density; **mortality (D)** and **emigration (E)** decrease it. N(t+1) = N(t) + [(B + I) − (D + E)]. Under normal conditions births and deaths matter most; immigration matters when a new habitat is colonised.

**Exponential growth.** With **unlimited resources**, a population grows exponentially. If **b** and **d** are per capita birth and death rates, dN/dt = (b − d) × N; writing **r = b − d** (the **intrinsic rate of natural increase**), **dN/dt = rN**, giving $N_t = N_0 e^{rt}$, a **J-shaped** curve. Values of r: Norway rat ${R.rat}, flour beetle ${R.beetle}, human population of India in 1981 ${R.india1981}. Even a slow-growing animal like the elephant could reach enormous numbers without checks (Darwin).

**Logistic growth.** No population has unlimited resources, so competition arises and the fittest survive. A habitat supports a maximum number — its **carrying capacity (K)**. A population in a habitat with limited resources shows a **lag phase**, then **acceleration**, **deceleration**, and an **asymptote** at K: a **sigmoid (S-shaped)** curve. This is **Verhulst-Pearl logistic growth**: dN/dt = rN[(K − N)/K]. Because resources become limiting sooner or later, the logistic model is more realistic.

**Life history variation.** Populations evolve to maximise **reproductive (Darwinian) fitness** (a high r value) in their habitat. Some organisms breed only once in their lifetime (**Pacific salmon**, **bamboo**); others breed many times (most **birds and mammals**). Some produce many small offspring (**oysters, pelagic fishes**); others a few large offspring (**birds, mammals**).`,
      [kt('Intrinsic rate of natural increase (r)', 'The difference between per capita birth and death rates; the rate of growth under unlimited resources.'), kt('Carrying capacity (K)', 'The maximum population a habitat can support with its resources.'), kt('Logistic growth', 'S-shaped growth that slows as density approaches the carrying capacity.'), kt('Darwinian fitness', 'Reproductive fitness: the ability to leave offspring, reflected in a high r.')],
      V.growth,
      [2],
      [V.density],
      [
        { label: 'Change in density (B births, I immigrants, D deaths, E emigrants)', latex: 'N_{t+1} = N_t + \\left[(B + I) - (D + E)\\right]' },
        { label: 'Exponential growth (r: intrinsic rate of natural increase)', latex: '\\dfrac{dN}{dt} = rN, \\quad N_t = N_0 e^{rt}' },
        { label: 'Logistic growth (K: carrying capacity)', latex: '\\dfrac{dN}{dt} = rN\\left(\\dfrac{K - N}{K}\\right)' },
      ],
    ),
    sec(
      '3. Population interactions',
      `Interspecific interactions are beneficial (+), detrimental (−) or neutral (0) to each species: **mutualism** (+, +); **competition** (−, −); **predation** and **parasitism** (+, −); **commensalism** (+, 0); **amensalism** (−, 0).

**Predation.** Transfers energy fixed by plants to higher trophic levels; keeps prey populations under control (the **prickly pear cactus** introduced into Australia in the early 1930s was controlled only after a cactus-feeding moth from its natural habitat was introduced — the basis of **biological control**); maintains species diversity by reducing competition among prey (when the starfish ***Pisaster*** was removed from rocky intertidal communities of the American Pacific coast, more than 10 invertebrate species became extinct within a year). Prey defences: **camouflage** (insects, frogs); **distastefulness** (**monarch butterfly**, from a chemical its caterpillar takes from a poisonous weed); thorns (**Acacia**, cactus); poisons (**Calotropis** — cardiac glycosides; cattle and goats do not browse it); nicotine, caffeine, quinine, strychnine and opium are plant defences. Nearly 25 percent of insects are phytophagous.

**Competition.** The fitness (r) of one species is significantly lower in the presence of another. Unrelated species can compete (**flamingoes and resident fishes** for zooplankton in some shallow South American lakes). **Interference competition** occurs even when resources are not limiting. The **Abingdon tortoise** of the Galapagos became extinct within a decade of goats being introduced, owing to the goats’ greater browsing efficiency. **Competitive release**: a species restricted by a superior competitor expands its range when the competitor is removed. **Connell**: on Scottish rocky coasts the larger, superior barnacle ***Balanus*** excludes the smaller ***Chthamalus*** from the intertidal zone. **Gause’s competitive exclusion principle**: two closely related species competing for the same resources cannot coexist indefinitely; the inferior one is eventually eliminated. **Resource partitioning**: **MacArthur** showed that five closely related **warbler** species on the same tree avoided competition by differences in foraging. Herbivores and plants are more adversely affected by competition than carnivores.

**Parasitism.** Many parasites are **host-specific** and co-evolve with their hosts. Adaptations: loss of unnecessary sense organs, adhesive organs or suckers, loss of the digestive system, high reproductive capacity. Life cycles are often complex: the **human liver fluke** needs a **snail** and a **fish** as intermediate hosts; the malarial parasite needs a mosquito vector. Parasites reduce host survival, growth and reproduction and may make hosts vulnerable to predators. **Ectoparasites**: lice on humans, ticks on dogs, copepods on marine fish, ***Cuscuta*** (no chlorophyll) on hedge plants. **Endoparasites** live inside the host, with simplified bodies and high reproductive potential. **Brood parasitism**: the **cuckoo (koel)** lays eggs in a **crow’s** nest; its eggs resemble the host’s in size and colour.

**Commensalism.** Orchid growing as an epiphyte on a **mango** branch; **barnacles** on a whale’s back; **cattle egret** foraging near grazing cattle, which flush out insects; **clown fish** living among the stinging tentacles of a **sea anemone**, gaining protection.

**Mutualism.** **Lichens** (fungus with photosynthesising algae or cyanobacteria); **mycorrhizae** (fungi help plant roots absorb nutrients; the plant supplies carbohydrates); **pollination** and **seed dispersal**. Each **fig** species is pollinated only by its partner **wasp** species: the female wasp lays eggs in the fruit, the larvae feed on developing seeds, and the wasp pollinates the fig. The Mediterranean orchid ***Ophrys*** uses **sexual deceit**: one petal resembles a female bee in size, colour and markings; the male bee **pseudocopulates** with it and carries pollen to the next flower. If the female bee’s colour pattern changes, the orchid must **co-evolve** to keep its pollination success.`,
      [kt('Competitive exclusion principle', 'Two closely related species competing for the same resources cannot coexist indefinitely.'), kt('Resource partitioning', 'Use of a shared resource in different ways, places or times so that competitors can coexist.'), kt('Brood parasitism', 'Laying eggs in the nest of a host bird, which then incubates them.'), kt('Commensalism', 'An interaction in which one species benefits and the other is neither harmed nor benefited.'), kt('Mutualism', 'An interaction in which both species benefit.')],
      table(['Interaction', 'Species A', 'Species B', 'Example'], [['Mutualism', '+', '+', 'Lichen, mycorrhiza, fig and wasp'], ['Competition', '−', '−', 'Balanus and Chthamalus'], ['Predation', '+', '−', 'Moth and prickly pear'], ['Parasitism', '+', '−', 'Cuckoo and crow'], ['Commensalism', '+', '0', 'Orchid on mango'], ['Amensalism', '−', '0', 'One harmed, other unaffected']], 'Table of six interactions with signs and examples'),
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving birth or death rates as totals instead of per individual per unit time.
- Confusing the J-shaped (exponential) and S-shaped (logistic) curves.
- Writing r = b + d instead of r = b − d.
- Calling the cattle egret and cattle mutualism (the textbook treats it as commensalism).
- Calling clown fish and sea anemone parasitism (it is commensalism).
- Forgetting that predators can increase species diversity (Pisaster).

**How marks are usually awarded**
- 1-mark items: name the interaction, organism or term; a per capita rate.
- 2–3-mark answers: attribute definitions; pyramid shapes; growth equations with curves; one interaction with an example.
- 5-mark answers: compare growth models with graphs; describe interactions with examples; predation and prey defences.
- Case-based items: field data on population changes, growth curves or interaction scenarios, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a population?', 'Individuals of a species in a defined area that share resources and can interbreed.', 'definition', 1),
    fc(2, 'How are birth and death rates expressed?', 'Per capita: per individual per unit time.', 'concept', 1),
    fc(3, '20 lotus plants, 8 new in a year: birth rate?', '8/20 = 0.4 offspring per plant per year.', 'formula', 1),
    fc(4, 'What is sex ratio?', 'The proportion of females and males in a population.', 'definition', 1),
    fc(5, 'Three shapes of age pyramid?', 'Expanding (broad base), stable (bell), declining (urn).', 'concept', 1),
    fc(6, 'Why can numbers mislead about density?', 'One huge banyan matters more than many small weeds: use cover or biomass.', 'concept', 1),
    fc(7, 'How is a tiger census done?', 'Using pugmarks and fecal pellets.', 'fact', 1),
    fc(8, 'Example of relative density?', 'Number of fish caught per trap.', 'fact', 1),
    fc(9, 'Processes that add to density?', 'Natality and immigration.', 'concept', 2),
    fc(10, 'Processes that reduce density?', 'Mortality and emigration.', 'concept', 2),
    fc(11, 'Equation for density change?', 'N(t+1) = N(t) + [(B + I) − (D + E)].', 'formula', 2),
    fc(12, 'What is r?', 'Intrinsic rate of natural increase: b − d.', 'definition', 2),
    fc(13, 'Exponential growth equation and curve?', 'dN/dt = rN; J-shaped.', 'formula', 2),
    fc(14, 'Logistic growth equation and curve?', 'dN/dt = rN(K − N)/K; S-shaped.', 'formula', 2),
    fc(15, 'What is carrying capacity?', 'The maximum population a habitat can support.', 'definition', 2),
    fc(16, 'Phases of logistic growth?', 'Lag, acceleration, deceleration, asymptote.', 'concept', 2),
    fc(17, 'r values quoted in the chapter?', `Norway rat ${R.rat}, flour beetle ${R.beetle}, India 1981 ${R.india1981}.`, 'fact', 2),
    fc(18, 'Why is the logistic model more realistic?', 'Resources become limiting sooner or later.', 'concept', 2),
    fc(19, 'Organisms that breed once in a lifetime?', 'Pacific salmon, bamboo.', 'fact', 2),
    fc(20, 'Many small offspring vs few large?', 'Oysters, pelagic fishes vs birds, mammals.', 'fact', 2),
    fc(21, 'Signs of the six interactions?', 'Mutualism (+, +); competition (−, −); predation and parasitism (+, −); commensalism (+, 0); amensalism (−, 0).', 'concept', 3),
    fc(22, 'How was prickly pear controlled in Australia?', 'By introducing a cactus-feeding moth from its natural habitat.', 'fact', 3),
    fc(23, 'What happened when Pisaster was removed?', 'Over 10 invertebrate species went extinct within a year.', 'fact', 3),
    fc(24, 'Why is the monarch butterfly distasteful?', 'Its caterpillar takes up a chemical from a poisonous weed.', 'fact', 3),
    fc(25, 'Calotropis defence?', 'Cardiac glycosides, so cattle and goats avoid it.', 'fact', 3),
    fc(26, 'Gause’s principle?', 'Closely related species competing for the same resources cannot coexist indefinitely.', 'definition', 3),
    fc(27, 'Balanus and Chthamalus show?', 'Competitive exclusion on Scottish rocky coasts.', 'fact', 3),
    fc(28, 'Abingdon tortoise?', 'Extinct within a decade after goats were introduced (Galapagos).', 'fact', 3),
    fc(29, 'How do MacArthur’s warblers coexist?', 'Resource partitioning: different foraging behaviour.', 'concept', 3),
    fc(30, 'Parasite adaptations?', 'Lost sense organs, suckers, lost digestive system, high reproduction.', 'concept', 3),
    fc(31, 'Hosts of the human liver fluke?', 'Humans plus two intermediate hosts: a snail and a fish.', 'fact', 3),
    fc(32, 'Brood parasitism example?', 'Cuckoo (koel) laying eggs in a crow’s nest.', 'fact', 3),
    fc(33, 'Commensalism examples?', 'Orchid on mango, barnacles on whale, cattle egret, clown fish and sea anemone.', 'fact', 3),
    fc(34, 'Fig and wasp?', 'Wasp lays eggs in fig and pollinates it: obligate mutualism.', 'concept', 3),
    fc(35, 'Sexual deceit in Ophrys?', 'Petal mimics a female bee; male pseudocopulates and transfers pollen.', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
