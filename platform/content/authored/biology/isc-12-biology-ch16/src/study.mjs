// ISC 12 Biology ch16 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, B_RATE, D_RATE, MR_N, MR } from './decks.mjs';
import { R } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Organisms and Populations — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Population attributes',
      `A **population** is a group of individuals of a species living in a well-defined geographical area, sharing or competing for similar resources and potentially interbreeding. A population has attributes that individual organisms do not.

**Population density (N)** — the number of individuals per unit area or volume. It may be measured by: a **total count** (large, visible animals); **quadrats** (plants; count in sample squares); **percentage cover** or **biomass** when a simple count is misleading (a single huge banyan tree versus 200 carrot-grass plants); **relative density** (fish caught per trap); **indirect signs** such as **pug marks and faecal pellets** (tiger census); and **mark–recapture**: N = (number marked × number in second catch) ÷ number recaptured marked (for example, ${MR.marked} marked, ${MR.caught} caught, ${MR.recaptured} recaptured → about ${MR_N}).

**Natality** is the number of births during a given period that are added to the initial density; the **birth rate** is expressed per individual per unit time (for example ${B_RATE} per plant per year). **Mortality** is the number of deaths; the **death rate** is per individual per unit time (for example ${D_RATE}). **Immigration** is the number of individuals of the same species that come into the habitat from elsewhere; **emigration** the number that leave. Hence
**N(t+1) = N(t) + [(B + I) − (D + E)]**.

**Sex ratio** is the proportion of females to males (for example 60 percent female, 40 percent male).

**Age structure:** plotted as an **age pyramid** of pre-reproductive, reproductive and post-reproductive individuals: **expanding** (triangular, broad base — growing), **stable** (bell-shaped) and **declining** (urn-shaped).

**Carrying capacity (K)** — the maximum number of individuals of a species that a habitat can support, set by its limited resources.`,
      [kt('Population density', 'Number of individuals per unit area or volume.'), kt('Natality', 'Births per individual per unit time.'), kt('Mortality', 'Deaths per individual per unit time.'), kt('Carrying capacity (K)', 'Maximum population a habitat can support.')],
      V.density,
      [1],
      [V.pyramids],
    ),
    sec(
      '2. Population growth',
      `**Exponential growth:** when resources are **unlimited**, each species can realise its full innate potential to grow. If the per-capita birth rate is b and death rate d, the **intrinsic rate of natural increase** is **r = b − d**, and
**dN/dt = rN**, integrating to **N_t = N₀e^{rt}**.
The graph of N against t is **J-shaped**. Values of r: Norway rat **${R.rat}**, flour beetle **${R.beetle}**, human population of India in 1981 **${R.india1981}**. Doubling time = ln 2 ÷ r.

**Logistic growth:** no population has unlimited resources; competition for food and space leads to survival of the fittest. A population growing in a habitat with limited resources shows a **lag phase**, then **acceleration**, then **deceleration**, and finally an **asymptote** when density reaches the **carrying capacity K**. This **sigmoid (S-shaped)** curve is the **Verhulst–Pearl logistic growth** model:
**dN/dt = rN (K − N)/K**.
As N approaches K, (K − N)/K approaches zero, so growth slows and stops. Since resources for most animal populations are finite, the logistic model is considered **more realistic**.`,
      [kt('Intrinsic rate of natural increase (r)', 'Per-capita birth rate minus death rate.'), kt('Exponential growth', 'Growth with unlimited resources: dN/dt = rN; J-shaped.'), kt('Logistic growth', 'Growth limited by K: dN/dt = rN(K − N)/K; S-shaped.')],
      V.growth,
      [2],
    ),
    sec(
      '3. Life history variation',
      `Populations evolve to **maximise their reproductive fitness**, also called **Darwinian fitness (high r value)**, in the habitat in which they live. Under a particular set of selection pressures, organisms evolve towards the most efficient reproductive strategy.
- Some organisms **breed only once** in their lifetime (**Pacific salmon fish, bamboo**); others **breed many times** (most **birds and mammals**).
- Some produce a **large number of small-sized offspring** (**oysters, pelagic fishes**); others produce a **small number of large-sized offspring** (**birds, mammals**).
Ecologists suggest that **life-history traits** of organisms have evolved in relation to the **constraints imposed by the abiotic and biotic components** of the habitat.`,
      [kt('Reproductive (Darwinian) fitness', 'Ability to leave surviving offspring; a high r.'), kt('Life history', 'Pattern of growth, reproduction and survival over a lifetime.')],
      table(['Strategy', 'Examples'], [['Breed once', 'Pacific salmon, bamboo'], ['Breed many times', 'Birds, mammals'], ['Many small offspring', 'Oysters, pelagic fishes'], ['Few large offspring', 'Birds, mammals']], 'Table of life history strategies'),
      [3],
    ),
    sec(
      '4. Mutualism and competition',
      `**Population interactions** (+ beneficial, − detrimental, 0 neutral): mutualism (+, +), competition (−, −), predation (+, −), parasitism (+, −), commensalism (+, 0), amensalism (−, 0).

**Mutualism:** both species benefit. **Lichens** — a fungus and a photosynthesising alga or cyanobacterium. **Mycorrhizae** — fungi and roots of higher plants: the fungus helps absorb nutrients; the plant provides carbohydrates. **Plant–animal mutualism**: plants reward pollinators and seed dispersers with nectar, pollen or fruit. Every **fig species** is pollinated only by its partner **wasp species**; the female wasp uses the fruit as an egg-laying site and pollinates the fig inflorescence, and the developing seeds feed its larvae. The Mediterranean orchid ***Ophrys*** uses **sexual deceit**: one petal resembles the female of a bee species, and the male “pseudocopulates” with it and transfers pollen.

**Competition:** both species are harmed. It is commonly between closely related species competing for the same limited resources, but this is not always so: **flamingoes and resident fishes** in some shallow South American lakes compete for **zooplankton**. Resources need not be limiting: in **interference competition**, the feeding efficiency of one species may be reduced by the interfering and inhibitory presence of the other. The **Abingdon tortoise** of the Galapagos became extinct within a decade after **goats** were introduced, owing to the goats’ greater browsing efficiency.
- **Competitive release:** a species whose distribution is restricted by a superior competitor **expands dramatically** when the competitor is removed. **Connell** showed that on the rocky sea coasts of **Scotland**, the larger and competitively superior barnacle ***Balanus*** dominates the intertidal area and excludes the smaller ***Chthamalus***.
- **Gause’s competitive exclusion principle:** two closely related species competing for the same resources **cannot coexist indefinitely**; the competitively inferior one will eventually be **eliminated** (shown with two species of *Paramecium*).
- **Resource partitioning:** **MacArthur** showed that **five closely related species of warblers** on the same tree avoided competition and coexisted because of differences in their **foraging activities**.`,
      [kt('Mutualism', 'Interaction benefiting both species.'), kt('Interference competition', 'One species reduces the feeding efficiency of another even when resources are not limiting.'), kt('Competitive release', 'Expansion of a species when a superior competitor is removed.'), kt('Gause’s principle', 'Two species with identical requirements cannot coexist indefinitely.')],
      V.gause,
      [4],
    ),
    sec(
      '5. Predation, parasitism, commensalism and amensalism',
      `**Predation:** nature’s way of **transferring energy** fixed by plants to higher trophic levels. Predators keep **prey populations under control** — the **prickly pear cactus** introduced into Australia spread over millions of hectares until a cactus-feeding **moth** was introduced. Predators help **maintain species diversity** by reducing competition among prey: when the starfish ***Pisaster*** was removed from an American intertidal community, **more than 10 species of invertebrates** became extinct within a year owing to interspecific competition. Prudent predators avoid over-exploiting their prey.
**Anti-predator defences:** **camouflage (cryptic colouration)** in some insects and frogs; the **Monarch butterfly** is distasteful because of a chemical it acquires by feeding on a poisonous weed as a caterpillar; **thorns** (Acacia, cactus); **chemicals** — ***Calotropis*** produces highly poisonous **cardiac glycosides**; nicotine, caffeine, quinine, strychnine and opium are produced as defences against grazers and browsers.

**Parasitism:** the parasite gains food and shelter at the host’s expense. Many parasites are **host-specific** and have evolved adaptations: **loss of unnecessary sense organs**, **adhesive organs or suckers**, **loss of the digestive system**, and **high reproductive capacity**. Life cycles are often complex, with **intermediate hosts** — the **human liver fluke** depends on a **snail** and a **fish**; the malaria parasite needs a **mosquito**. Parasites may reduce host survival, growth and reproduction and make the host more vulnerable to predators.
- **Ectoparasites** feed on the external surface: **lice** on humans, **ticks** on dogs, **copepods** on marine fish; ***Cuscuta*** on hedge plants (it has lost its chlorophyll and leaves).
- **Endoparasites** live inside the host: tapeworm, liver fluke, *Plasmodium*; they have simplified morphology and high reproductive potential.
- **Brood parasitism:** the **cuckoo (koel)** lays eggs in the nest of its host, the **crow**, which incubates them; the parasitic eggs **resemble the host’s eggs** in size and colour, reducing the chance that the host detects and ejects them.

**Commensalism:** one species benefits; the other is neither harmed nor benefited — an **orchid** growing as an epiphyte on a **mango** branch; **barnacles** on the back of a **whale**; **cattle egrets** foraging near grazing **cattle**, which stir up insects; **sea anemone and clown fish** (the fish gains protection from predators among the stinging tentacles).

**Amensalism:** one species is harmed and the other is unaffected — for example ***Penicillium*** secretes penicillin, which inhibits bacteria.`,
      [kt('Predation', 'Interaction in which one species kills and eats another (+, −).'), kt('Brood parasitism', 'Laying eggs in a host’s nest for the host to raise.'), kt('Commensalism', 'One species benefits, the other is unaffected (+, 0).'), kt('Amensalism', 'One species is harmed, the other unaffected (−, 0).')],
      table(['Interaction', 'Example'], [['Predation', 'Moth controlling prickly pear'], ['Brood parasitism', 'Koel and crow'], ['Commensalism', 'Clown fish and sea anemone'], ['Amensalism', 'Penicillium and bacteria']], 'Table of interactions with examples'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving rates as totals instead of per individual per unit time.
- Writing dN/dt = rN for logistic growth (logistic is rN(K − N)/K).
- Calling a declining population’s pyramid triangular (it is urn-shaped).
- Saying competition occurs only when resources are limiting (interference competition does not need this).
- Calling Cuscuta an endoparasite (it is an ectoparasite).
- Mixing up commensalism (+, 0) and amensalism (−, 0).

**How marks are usually awarded**
- 1-mark subparts: an attribute, a value of r, an example of an interaction, a parasite type.
- 2–3-mark questions: birth and death rates; N(t+1); age pyramids; Gause’s principle; competitive release; parasite adaptations.
- 5-mark questions in parts: growth models with graphs and equations; population interactions with examples.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define population density.', 'Individuals per unit area or volume.', 'definition', 1),
    fc(2, 'How are tigers counted?', 'Pug marks and faecal pellets.', 'fact', 1),
    fc(3, 'Mark–recapture formula?', 'N = marked × caught ÷ recaptured.', 'exam-tip', 1),
    fc(4, 'Four factors changing density?', 'Natality, mortality, immigration, emigration.', 'concept', 1),
    fc(5, 'Equation for change in N?', 'N(t+1) = N(t) + [(B + I) − (D + E)].', 'exam-tip', 1),
    fc(6, 'Age pyramid of a growing population?', 'Expanding (triangular).', 'fact', 1),
    fc(7, 'Age pyramid of a declining population?', 'Urn-shaped.', 'fact', 1),
    fc(8, 'What is carrying capacity?', 'Maximum population a habitat can support.', 'definition', 1),
    fc(9, 'Exponential growth equation?', 'dN/dt = rN; J-shaped.', 'fact', 2),
    fc(10, 'Logistic growth equation?', 'dN/dt = rN(K − N)/K; S-shaped.', 'fact', 2),
    fc(11, 'r of the flour beetle?', '0.12.', 'fact', 2),
    fc(12, 'r of India in 1981?', '0.0205.', 'fact', 2),
    fc(13, 'Phases of the sigmoid curve?', 'Lag, exponential, deceleration, asymptote.', 'concept', 2),
    fc(14, 'Which growth model is more realistic?', 'Logistic.', 'concept', 2),
    fc(15, 'Organisms that breed once?', 'Pacific salmon, bamboo.', 'fact', 3),
    fc(16, 'Many small offspring?', 'Oysters, pelagic fishes.', 'fact', 3),
    fc(17, 'Signs for mutualism and competition?', '+/+ and −/−.', 'concept', 4),
    fc(18, 'Fig and wasp relationship?', 'Mutualism: pollination for egg-laying site and food.', 'fact', 4),
    fc(19, 'Ophrys orchid strategy?', 'Sexual deceit: pseudocopulation by male bees.', 'fact', 4),
    fc(20, 'What is interference competition?', 'One species reduces another’s feeding efficiency.', 'definition', 4),
    fc(21, 'Connell’s barnacles?', 'Balanus excludes Chthamalus; competitive release.', 'fact', 4),
    fc(22, 'State Gause’s principle.', 'Two species with the same needs cannot coexist indefinitely.', 'definition', 4),
    fc(23, 'MacArthur’s warblers show?', 'Resource partitioning.', 'fact', 4),
    fc(24, 'How was prickly pear controlled?', 'By introducing a cactus-feeding moth.', 'fact', 5),
    fc(25, 'Effect of removing Pisaster?', 'Over 10 invertebrate species extinct in a year.', 'fact', 5),
    fc(26, 'Why is the Monarch butterfly distasteful?', 'Chemical from the weed eaten as a caterpillar.', 'fact', 5),
    fc(27, 'Defence of Calotropis?', 'Cardiac glycosides.', 'fact', 5),
    fc(28, 'Three adaptations of parasites?', 'Loss of sense organs, suckers, high reproduction.', 'concept', 5),
    fc(29, 'Example of brood parasitism?', 'Koel lays eggs in a crow’s nest.', 'fact', 5),
    fc(30, 'Example of commensalism?', 'Orchid on mango; clown fish and anemone.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
