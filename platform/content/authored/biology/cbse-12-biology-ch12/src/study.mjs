// ch12 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Ecosystem — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Ecosystem: structure and function',
      `An **ecosystem** is a functional unit of nature in which living organisms interact among themselves and with their surrounding physical environment. Its size ranges from a small pond to a large forest or a sea; the entire **biosphere** is regarded as a global ecosystem.

**Types:** **terrestrial** (forest, grassland, desert) and **aquatic** (pond, lake, wetland, river, estuary); **man-made** ecosystems include crop fields and an aquarium.

**Structure.** Biotic and abiotic components interact and function as a unit, giving a physical structure characteristic of each ecosystem. Identification and enumeration of plant and animal species gives the **species composition**. **Stratification** is the vertical distribution of different species occupying different levels: in a forest, **trees** occupy the top layer, **shrubs** the second, and **herbs and grasses** the bottom layers.

**Pond ecosystem.**
- Abiotic: water with dissolved inorganic and organic substances, and the rich soil deposit at the bottom. Solar input, the cycle of temperature, day length and other climatic conditions regulate the rate of function.
- Autotrophs: phytoplankton, some algae, and floating, submerged and marginal plants.
- Consumers: zooplankton, and free-swimming and bottom-dwelling forms.
- Decomposers: fungi, bacteria and flagellates, especially abundant at the bottom.

**Functions** (pond and biosphere alike): conversion of inorganic into organic material by autotrophs using the sun’s radiant energy; consumption of autotrophs by heterotrophs; decomposition and mineralisation of dead organic matter, releasing minerals for reuse; unidirectional movement of energy towards higher trophic levels and its dissipation and loss as heat.

**Four important components of ecosystem function:** productivity, decomposition, energy flow and nutrient cycling.`,
      [kt('Ecosystem', 'A functional unit of nature in which living organisms interact among themselves and with the physical environment.'), kt('Stratification', 'Vertical distribution of different species at different levels in an ecosystem.'), kt('Species composition', 'The identity and number of plant and animal species in an ecosystem.')],
      V.strata,
      [1],
      [table(['Pond component', 'Examples'], [['Abiotic', 'Water, dissolved substances, bottom soil'], ['Producers', 'Phytoplankton, algae, floating, submerged and marginal plants'], ['Consumers', 'Zooplankton, free-swimming and bottom-dwelling forms'], ['Decomposers', 'Fungi, bacteria, flagellates']], 'Table of the components of a pond ecosystem')],
    ),
    sec(
      '2. Productivity',
      `A constant input of solar energy is the basic requirement for any ecosystem to function and sustain.

- **Primary production:** the amount of biomass or organic matter produced per unit area over a time period by plants during photosynthesis; expressed as weight (g m⁻²) or energy (kcal m⁻²).
- **Productivity:** the **rate** of biomass production, expressed in g m⁻² yr⁻¹ or kcal m⁻² yr⁻¹, so that different ecosystems can be compared.
- **Gross primary productivity (GPP):** the rate of production of organic matter during photosynthesis. A considerable amount of GPP is used by plants in **respiration (R)**.
- **Net primary productivity (NPP) = GPP − R:** the biomass available for consumption by heterotrophs (herbivores and decomposers).
- **Secondary productivity:** the rate of formation of new organic matter by consumers.

Primary productivity depends on the plant species inhabiting an area, environmental factors, availability of nutrients and the photosynthetic capacity of plants. The annual NPP of the whole biosphere is about **170 billion tons** (dry weight) of organic matter. Although oceans occupy about **70 percent** of the surface, their productivity is only **55 billion tons**; the rest is on land.`,
      [kt('Primary productivity', 'The rate at which plants produce biomass per unit area.'), kt('GPP', 'Gross primary productivity: rate of production of organic matter in photosynthesis.'), kt('NPP', 'Net primary productivity: GPP minus respiration losses; available to heterotrophs.'), kt('Secondary productivity', 'The rate of formation of new organic matter by consumers.')],
      table(['Quantity', 'Relation or value'], [['NPP', 'GPP − R'], ['Biosphere NPP', 'About 170 billion tons a year'], ['Ocean NPP', 'About 55 billion tons a year']], 'Table of productivity relations and biosphere values'),
      [2],
      [],
      [{ label: 'Net primary productivity', latex: '\\text{NPP} = \\text{GPP} - R' }],
    ),
    sec(
      '3. Decomposition',
      `Decomposers break down complex organic matter into inorganic substances like carbon dioxide, water and nutrients. The raw material, **detritus**, is dead plant remains such as leaves, bark and flowers, and dead remains of animals, including fecal matter.

**Steps:**
1. **Fragmentation:** detritivores (e.g. earthworm) break detritus into smaller particles.
2. **Leaching:** water-soluble inorganic nutrients go down into the soil horizon and get precipitated as unavailable salts.
3. **Catabolism:** bacterial and fungal enzymes degrade detritus into simpler inorganic substances.
4. **Humification:** accumulation of a dark coloured amorphous substance, **humus**, that is highly resistant to microbial action and decomposes at an extremely slow rate. Being colloidal, it serves as a reservoir of nutrients.
5. **Mineralisation:** humus is further degraded by some microbes, releasing inorganic nutrients.

Fragmentation, leaching and catabolism operate simultaneously on the detritus.

**Factors.** Decomposition is largely an **oxygen-requiring** process. Its rate is controlled by the **chemical composition of detritus** and **climatic factors**. It is **slower** if detritus is rich in **lignin and chitin**, and **quicker** if it is rich in **nitrogen and water-soluble substances like sugars**. **Warm and moist** conditions favour it; **low temperature** and **anaerobiosis** inhibit it, resulting in a build-up of organic material.`,
      [kt('Detritus', 'Dead plant and animal remains, including fecal matter, the raw material for decomposition.'), kt('Detritivore', 'An animal, such as an earthworm, that breaks detritus into smaller particles.'), kt('Humus', 'Dark, amorphous, colloidal organic matter that is resistant to decay and stores nutrients.'), kt('Mineralisation', 'Release of inorganic nutrients from humus by microbes.')],
      flow('LR', [['f', 'Fragmentation'], ['l', 'Leaching'], ['c', 'Catabolism'], ['h', 'Humification'], ['m', 'Mineralisation']], [['f', 'l'], ['l', 'c'], ['c', 'h'], ['h', 'm']], 'Flow of the five steps of decomposition'),
      [2],
    ),
    sec(
      '4. Energy flow',
      `Except for the deep-sea hydrothermal ecosystem, the **sun** is the only source of energy for all ecosystems on Earth. Of the incident solar radiation, **less than 50 percent** is photosynthetically active radiation (**PAR**); plants capture only **2–10 percent of PAR**, and this small amount sustains the entire living world.

There is a **unidirectional flow of energy** from the sun to producers and then to consumers. Ecosystems are not exempt from the **second law of thermodynamics**: they need a constant supply of energy to synthesise the molecules they require, to counteract the universal tendency towards increasing disorderliness.

- **Producers:** green plants. **Consumers:** all animals depend on plants directly or indirectly. **Primary consumers** (herbivores: insects, birds and mammals on land; molluscs in water); **secondary consumers** (carnivores) and so on.
- **Grazing food chain (GFC):** grass → goat → man.
- **Detritus food chain (DFC):** begins with dead organic matter; made of decomposers (heterotrophs, mainly fungi and bacteria — **saprotrophs**) that secrete digestive enzymes and absorb the products.
- In an **aquatic** ecosystem the GFC is the major conduit of energy flow; in a **terrestrial** ecosystem a much larger fraction of energy flows through the DFC. The DFC may be connected with the GFC at some levels; the natural interconnection of food chains is a **food web**.
- **Trophic levels:** producers (first), herbivores (second), carnivores (third). Each level has a certain mass of living material at a particular time, the **standing crop**, measured as biomass or number per unit area.
- The number of trophic levels in a grazing food chain is restricted because transfer of energy follows the **10 percent law**: only about 10 percent of the energy is transferred to each trophic level from the lower one.`,
      [kt('PAR', 'Photosynthetically active radiation: the part of sunlight (under 50 percent) usable in photosynthesis.'), kt('Detritus food chain', 'A food chain that begins with dead organic matter and decomposers.'), kt('Standing crop', 'The mass of living material, or number of organisms, at a trophic level at a particular time.'), kt('10 percent law', 'Only about 10 percent of energy passes from one trophic level to the next.')],
      V.energy,
      [3],
    ),
    sec(
      '5. Ecological pyramids',
      `The relationship between producers and consumers can be shown as a **pyramid** of **number**, **biomass** or **energy**, with the producers at the base and top consumers at the apex.

- **Pyramid of number:** usually upright (many grass plants, fewer herbivores, very few top carnivores); inverted when one large tree supports many insects.
- **Pyramid of biomass:** usually upright on land; **inverted in the sea**, because the biomass of fishes (and zooplankton) far exceeds that of phytoplankton at any time.
- **Pyramid of energy:** **always upright**, never inverted, because when energy flows from one trophic level to the next some energy is always lost as heat.

**Limitations:** pyramids do not take into account the same species belonging to two or more trophic levels; they assume a simple food chain, which almost never exists in nature, and do not accommodate a food web; and saprophytes are given no place in them, even though they play a vital role in the ecosystem.`,
      [kt('Ecological pyramid', 'A diagram of the number, biomass or energy at successive trophic levels, with producers at the base.'), kt('Inverted pyramid', 'A pyramid in which a higher trophic level is larger than the one below it.')],
      V.pyramids,
      [4],
      [table(['Pyramid', 'Usual shape', 'Exception'], [['Number', 'Upright', 'Inverted for a tree and its insects'], ['Biomass', 'Upright', 'Inverted in the sea'], ['Energy', 'Always upright', 'None']], 'Table of the three pyramids, usual shape and exceptions')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing NPP = GPP + R (it is GPP − R).
- Saying energy is recycled (it flows one way; minerals are recycled).
- Saying the pyramid of energy can be inverted.
- Saying the pyramid of biomass in the sea is upright.
- Mixing up the order of decomposition steps, or saying humus decomposes quickly.
- Forgetting that the sun is not the source for deep-sea hydrothermal ecosystems.

**How marks are usually awarded**
- 1-mark items: a term, a step, a pyramid shape, an NPP or energy value.
- 2–3-mark answers: GPP and NPP; steps or factors of decomposition; GFC vs DFC; why energy pyramids are upright.
- 5-mark answers: decomposition in full; energy flow with the 10 percent law; pyramids with examples and limitations.
- Case-based items: productivity data, decomposition experiments, food chains or pyramid data, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define ecosystem.', 'A functional unit of nature where organisms interact with each other and the physical environment.', 'definition', 1),
    fc(2, 'Two broad types of ecosystem?', 'Terrestrial and aquatic (also man-made, such as crop fields and aquaria).', 'fact', 1),
    fc(3, 'What is stratification?', 'Vertical distribution of species at different levels: trees, shrubs, herbs and grasses.', 'definition', 1),
    fc(4, 'Producers in a pond?', 'Phytoplankton, algae, floating, submerged and marginal plants.', 'fact', 1),
    fc(5, 'Decomposers in a pond?', 'Fungi, bacteria and flagellates, mostly at the bottom.', 'fact', 1),
    fc(6, 'Four components of ecosystem function?', 'Productivity, decomposition, energy flow, nutrient cycling.', 'concept', 1),
    fc(7, 'What regulates the rate of function of a pond?', 'Solar input, temperature cycle, day length and climate.', 'fact', 1),
    fc(8, 'What is primary production?', 'Biomass made per unit area over a time by plants in photosynthesis.', 'definition', 2),
    fc(9, 'Units of productivity?', 'g per square metre per year, or kcal per square metre per year.', 'fact', 2),
    fc(10, 'NPP equals?', 'GPP minus respiration losses (R).', 'formula', 2),
    fc(11, 'What is secondary productivity?', 'Rate of formation of new organic matter by consumers.', 'definition', 2),
    fc(12, 'Annual NPP of the biosphere?', 'About 170 billion tons dry weight; oceans only 55 billion tons.', 'fact', 2),
    fc(13, 'What is detritus?', 'Dead plant remains and dead animal remains, including fecal matter.', 'definition', 2),
    fc(14, 'Steps of decomposition in order?', 'Fragmentation, leaching, catabolism, humification, mineralisation.', 'concept', 2),
    fc(15, 'Who carries out fragmentation?', 'Detritivores such as earthworms.', 'fact', 2),
    fc(16, 'What happens in leaching?', 'Water-soluble nutrients move down into the soil and precipitate as unavailable salts.', 'concept', 2),
    fc(17, 'What is humus?', 'Dark, amorphous, colloidal matter, resistant to decay; a nutrient reservoir.', 'definition', 2),
    fc(18, 'Detritus that decomposes slowly?', 'Rich in lignin and chitin.', 'fact', 2),
    fc(19, 'Conditions that slow decomposition?', 'Low temperature and anaerobiosis.', 'concept', 2),
    fc(20, 'Only ecosystem not powered by the sun?', 'Deep-sea hydrothermal ecosystem.', 'fact', 3),
    fc(21, 'What share of sunlight is PAR?', 'Less than 50 percent.', 'fact', 3),
    fc(22, 'What share of PAR do plants capture?', '2–10 percent.', 'fact', 3),
    fc(23, 'Why is energy flow unidirectional?', 'Energy is lost as heat at each step (second law of thermodynamics).', 'concept', 3),
    fc(24, 'Example of a grazing food chain?', 'Grass → goat → man.', 'fact', 3),
    fc(25, 'Where does a detritus food chain begin?', 'With dead organic matter; decomposers are saprotrophs.', 'concept', 3),
    fc(26, 'Main energy route on land and in water?', 'Land: detritus food chain; water: grazing food chain.', 'exam-tip', 3),
    fc(27, 'What is standing crop?', 'Mass of living material (or number) at a trophic level at a given time.', 'definition', 3),
    fc(28, 'State the 10 percent law.', 'Only about 10 percent of energy passes to the next trophic level.', 'definition', 3),
    fc(29, 'What is a food web?', 'The natural interconnection of food chains.', 'definition', 3),
    fc(30, 'Which pyramid is always upright?', 'The pyramid of energy.', 'exam-tip', 4),
    fc(31, 'Inverted pyramid of biomass occurs in?', 'The sea: phytoplankton biomass is less than that of consumers.', 'fact', 4),
    fc(32, 'Example of an inverted pyramid of numbers?', 'One large tree supporting many insects.', 'fact', 4),
    fc(33, 'Three limitations of pyramids?', 'Species at two levels ignored; food webs ignored; saprophytes left out.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
