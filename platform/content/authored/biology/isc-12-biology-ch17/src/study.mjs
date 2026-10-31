// ISC 12 Biology ch17 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, NPP, PROD } from './decks.mjs';
import { E } from './svgs.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Ecosystem — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Ecosystem: structure and the pond',
      `An **ecosystem** is a **functional unit of nature** where living organisms interact among themselves and with their surrounding physical environment. Ecosystems vary greatly in size — from a small pond to a large forest or sea; the whole **biosphere** may be regarded as a global ecosystem.

**Types:** **terrestrial** (forest, grassland, desert) and **aquatic** (pond, lake, wetland, river, estuary); **man-made** ecosystems include crop fields and aquaria.

**Components:** **biotic** — producers (autotrophs), consumers (heterotrophs) and decomposers; **abiotic** — water, soil, minerals, light, temperature and other physical factors. Interaction of biotic and abiotic components gives a physical **structure** to an ecosystem, characterised by **species composition** and **stratification** (vertical distribution of species at different levels, for example trees, shrubs and herbs in a forest).

**The pond ecosystem:** a shallow water body in which all the basic components can be studied.
- **Abiotic:** water with **dissolved inorganic and organic substances** and the rich **soil deposit** at the bottom; the **solar input**, cycle of temperature, day length and other climatic conditions regulate the rate of function of the whole pond.
- **Producers (autotrophs):** **phytoplankton**, some algae, and **floating, submerged and marginal plants** along the edges.
- **Consumers:** **zooplankton** and **free-swimming and bottom-dwelling** forms.
- **Decomposers:** **fungi, bacteria and flagellates**, especially abundant at the **bottom**.

**Functions:** (i) **conversion of inorganic into organic material** with radiant energy by autotrophs; (ii) **consumption** of autotrophs by heterotrophs; (iii) **decomposition and mineralisation** of dead organic matter, releasing minerals for reuse; (iv) **unidirectional movement of energy** towards higher trophic levels and its dissipation and loss as **heat**.`,
      [kt('Ecosystem', 'Functional unit of nature with interacting organisms and physical environment.'), kt('Stratification', 'Vertical distribution of species at different levels.'), kt('Phytoplankton', 'Microscopic floating photosynthetic organisms; producers in water.')],
      V.pond,
      [1],
    ),
    sec(
      '2. Productivity',
      `A constant input of **solar energy** is the basic requirement for any ecosystem to function and sustain itself.
- **Primary production** is the amount of **biomass or organic matter** produced per unit area over a time period by plants during **photosynthesis**, expressed as weight (g m⁻²) or energy (kcal m⁻²). The **rate** of biomass production is **productivity** (g m⁻² yr⁻¹ or kcal m⁻² yr⁻¹).
- **Gross primary productivity (GPP)** is the rate of production of organic matter during photosynthesis. A considerable amount is used by plants in **respiration (R)**.
- **Net primary productivity (NPP) = GPP − R**: the biomass available for consumption by **heterotrophs** (herbivores and decomposers). Example: GPP ${PROD.gpp} − R ${PROD.r} = NPP ${NPP} kcal m⁻² yr⁻¹.
- **Secondary productivity** is the rate of formation of **new organic matter by consumers**.
Primary productivity depends on the plant species, environmental factors, availability of nutrients and photosynthetic capacity, so it varies between ecosystems. The **annual NPP of the whole biosphere** is about **170 billion tons** (dry weight) of organic matter; **oceans**, despite covering about **70 percent** of the surface, produce only about **55 billion tons**.

**Photosynthetically active radiation (PAR)** is about **50 percent** of the incident solar radiation; plants capture only **2–10 percent of PAR**, and this small amount sustains the entire living world.

**Standing crop** — the mass of living material (**biomass**) at each trophic level at a particular time (as fresh or dry weight per unit area). **Standing state** — the amount of **nutrients** such as carbon, nitrogen, phosphorus and calcium present in the **soil** at any given time.`,
      [kt('GPP', 'Rate of production of organic matter in photosynthesis.'), kt('NPP', 'GPP minus respiration; available to heterotrophs.'), kt('PAR', 'Photosynthetically active radiation, about half of incident sunlight.'), kt('Standing crop', 'Living biomass at a trophic level at a given time.')],
      table(['Term', 'Formula or value'], [['NPP', 'GPP − R'], ['PAR', 'About 50 percent of sunlight'], ['Captured by plants', '2–10 percent of PAR'], ['Global NPP', 'About 170 billion tons a year']], 'Table of productivity values'),
      [2],
    ),
    sec(
      '3. Decomposition',
      `**Decomposers** break down complex organic matter into inorganic substances such as **carbon dioxide, water and nutrients**; this process is **decomposition**. Dead plant remains (leaves, bark, flowers) and dead remains of animals, including faecal matter, form **detritus**, the raw material.

**Steps** (operating simultaneously on the detritus):
1. **Fragmentation** — **detritivores** such as **earthworms** break down detritus into **smaller particles**.
2. **Leaching** — **water-soluble inorganic nutrients** go down into the soil horizon and get **precipitated as unavailable salts**.
3. **Catabolism** — **bacterial and fungal enzymes** degrade detritus into **simpler inorganic substances**.
4. **Humification** — accumulation of a dark-coloured, amorphous substance called **humus**, which is **highly resistant** to microbial action and decomposes **extremely slowly**; being **colloidal**, it serves as a **reservoir of nutrients**.
5. **Mineralisation** — humus is further degraded by some microbes, releasing **inorganic nutrients**.

**Factors affecting the rate:** decomposition is largely an **oxygen-requiring** process. The rate is controlled by the **chemical composition** of the detritus — **slower** if it is rich in **lignin and chitin**, **quicker** if rich in **nitrogen and water-soluble substances such as sugars** — and by **climatic factors**: **warm and moist** environments favour it, whereas **low temperature and anaerobiosis** inhibit it, resulting in a build-up of organic material.`,
      [kt('Detritus', 'Dead plant and animal remains, the raw material of decomposition.'), kt('Humification', 'Formation of humus, which resists decomposition.'), kt('Mineralisation', 'Release of inorganic nutrients from humus.'), kt('Leaching', 'Washing of soluble nutrients down into the soil.')],
      V.decay,
      [3],
    ),
    sec(
      '4. Energy flow',
      `Except for deep-sea **hydrothermal** ecosystems, the **sun** is the only source of energy for all ecosystems. Of the incident solar radiation, less than 50 percent is PAR, and plants capture only 2–10 percent of it. Energy flow is **unidirectional**: from the sun to **producers** and then to **consumers**; it obeys the laws of thermodynamics, and at every transfer a great deal is lost as **heat**.

**Food chains:**
- **Grazing food chain (GFC)** — starts with living producers: grass → goat → man. In **aquatic** ecosystems the GFC is the **major conduit** for energy flow.
- **Detritus food chain (DFC)** — begins with **dead organic matter**; made up of **decomposers** (heterotrophic **saprotrophs**: fungi and bacteria) and detritivores. In **terrestrial** ecosystems a much **larger fraction** of energy flows through the DFC than through the GFC. The DFC may be connected with the GFC, as some DFC organisms are prey to GFC animals.
- **Food web** — natural interconnection of food chains.

**Trophic levels:** organisms occupy a place in the food chain according to their feeding relationship: **producers** (first), **herbivores or primary consumers** (second), **primary carnivores or secondary consumers** (third), **secondary carnivores or tertiary consumers** (fourth). A species may occupy more than one trophic level in the same ecosystem at the same time.

**10 percent law (Lindeman):** only about **10 percent** of the energy is transferred to each higher trophic level from the lower one (for example ${E.join(' → ')} J). Hence the number of trophic levels is limited.`,
      [kt('Grazing food chain', 'Food chain beginning with living green plants.'), kt('Detritus food chain', 'Food chain beginning with dead organic matter.'), kt('Trophic level', 'Feeding position of an organism in a food chain.'), kt('10 percent law', 'About 10 percent of energy passes to the next trophic level.')],
      V.energy,
      [4],
    ),
    sec(
      '5. Ecological pyramids',
      `The relationship between organisms at different trophic levels, in terms of **number, biomass or energy**, can be shown as a **pyramid**. The **base** represents the **producers** (first trophic level) and the **apex** the top-level consumers.
- **Pyramid of numbers** — usually **upright** (grassland: many grasses, fewer herbivores, few carnivores). It can be **inverted**: for example, **a single tree** supports a large number of **insects**, which support fewer birds.
- **Pyramid of biomass** — usually upright on land. In the **sea** it is generally **inverted**, because the **biomass of fishes** (and zooplankton) far exceeds that of the fast-reproducing **phytoplankton** at any one time.
- **Pyramid of energy** — **always upright** and can never be inverted, because when energy flows from one trophic level to the next, some is always **lost as heat** at each step.

**Limitations:** pyramids do not take into account the same species belonging to **two or more trophic levels**; they assume a **simple food chain**, which almost never exists in nature, and do not accommodate a **food web**; and **saprophytes** are not given any place, although they play a vital role.`,
      [kt('Pyramid of energy', 'Always upright, as energy is lost at every level.'), kt('Inverted pyramid of biomass', 'In the sea, consumer biomass exceeds phytoplankton biomass.'), kt('Inverted pyramid of numbers', 'One tree supporting many insects.')],
      V.pyramids,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing NPP = GPP + R (it is GPP − R).
- Confusing standing crop (biomass) with standing state (nutrients in soil).
- Saying humus decomposes quickly (it is highly resistant).
- Saying the grazing food chain carries most energy on land (the detritus food chain does).
- Saying the pyramid of energy can be inverted (never).
- Giving the 10 percent law as 10 percent lost (about 90 percent is lost; 10 percent passes on).

**How marks are usually awarded**
- 1-mark subparts: a producer, a step of decomposition, a value of PAR, a pyramid that can be inverted.
- 2–3-mark questions: GPP vs NPP; standing crop vs state; steps of decomposition; GFC vs DFC; 10 percent law.
- 5-mark questions in parts: pond ecosystem; decomposition with factors; energy flow with pyramids.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define an ecosystem.', 'Functional unit of interacting organisms and environment.', 'definition', 1),
    fc(2, 'Two man-made ecosystems?', 'Crop field, aquarium.', 'fact', 1),
    fc(3, 'Producers in a pond?', 'Phytoplankton, algae, floating, submerged and marginal plants.', 'fact', 1),
    fc(4, 'Where are pond decomposers abundant?', 'At the bottom.', 'fact', 1),
    fc(5, 'What is stratification?', 'Vertical layering of species.', 'definition', 1),
    fc(6, 'Define productivity.', 'Rate of biomass production per unit area.', 'definition', 2),
    fc(7, 'NPP equation?', 'NPP = GPP − R.', 'exam-tip', 2),
    fc(8, 'What is secondary productivity?', 'Rate of new organic matter made by consumers.', 'definition', 2),
    fc(9, 'Fraction of sunlight that is PAR?', 'About 50 percent.', 'fact', 2),
    fc(10, 'PAR captured by plants?', '2–10 percent.', 'fact', 2),
    fc(11, 'Global annual NPP?', 'About 170 billion tons dry weight.', 'fact', 2),
    fc(12, 'Standing crop vs standing state?', 'Living biomass vs nutrients in soil.', 'concept', 2),
    fc(13, 'What is detritus?', 'Dead plant and animal remains.', 'definition', 3),
    fc(14, 'Five steps of decomposition?', 'Fragmentation, leaching, catabolism, humification, mineralisation.', 'exam-tip', 3),
    fc(15, 'Who carries out fragmentation?', 'Detritivores such as earthworms.', 'fact', 3),
    fc(16, 'Why is humus important?', 'Resistant colloid; reservoir of nutrients.', 'concept', 3),
    fc(17, 'Detritus that decomposes slowly?', 'Rich in lignin and chitin.', 'fact', 3),
    fc(18, 'Conditions that slow decomposition?', 'Low temperature, anaerobiosis.', 'fact', 3),
    fc(19, 'Only energy source except vents?', 'The sun.', 'fact', 4),
    fc(20, 'Grazing food chain example?', 'Grass → goat → man.', 'fact', 4),
    fc(21, 'Main energy path on land?', 'Detritus food chain.', 'concept', 4),
    fc(22, 'Main energy path in water?', 'Grazing food chain.', 'concept', 4),
    fc(23, 'Who proposed the 10 percent law?', 'Lindeman.', 'fact', 4),
    fc(24, 'Why are food chains short?', 'Only about 10 percent of energy passes on each step.', 'concept', 4),
    fc(25, 'Trophic level of a frog eating insects?', 'Third (secondary consumer).', 'exam-tip', 4),
    fc(26, 'Inverted pyramid of numbers?', 'A tree with many insects.', 'fact', 5),
    fc(27, 'Inverted pyramid of biomass?', 'In the sea.', 'fact', 5),
    fc(28, 'Which pyramid is always upright?', 'Energy.', 'fact', 5),
    fc(29, 'One limitation of pyramids?', 'Ignore saprophytes (or food webs).', 'concept', 5),
    fc(30, 'What occupies the base of a pyramid?', 'Producers.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
