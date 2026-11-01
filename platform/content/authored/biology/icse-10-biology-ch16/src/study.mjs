// ICSE 10 Biology ch16 Pollution — notes and flashcards.
import { T, table, unit, PROV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { NOISE_LIMIT, DO, RAIN } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Pollution — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Air pollution: sources and major pollutants',
      `**Pollution** is the addition of harmful substances (**pollutants**) or energy to air, water or soil, making it harmful to living things.

**Sources:** vehicles, industries and power plants, burning of garbage, brick kilns, burning of crop stubble.

| Pollutant | Source | Effect |
|---|---|---|
| Carbon monoxide | Incomplete burning in vehicles | Combines with haemoglobin; less oxygen carried; headache, death |
| Sulphur dioxide | Burning coal (power plants, kilns, factories) | Irritates eyes and lungs; acid rain |
| Nitrogen oxides | Vehicles, power plants | Lung damage; acid rain; smog |
| Particulate matter | Kilns, diesel engines, burning garbage and stubble | Coughs, asthma, lung disease; haze |
| Carbon dioxide | Burning fossil fuels and wood | Global warming |`,
      [kt('Pollutant', 'A substance that makes air, water or soil harmful to living things.'), kt('Particulate matter', 'Fine solid particles such as soot and dust suspended in air.')],
      V.town,
      [1],
    ),
    sec(
      '2. Water, thermal and soil pollution',
      `**Water pollution**
- **Domestic sewage:** organic matter decomposed by bacteria that use up **dissolved oxygen**; germs cause cholera, typhoid, jaundice.
- **Detergents** (phosphates) and **fertilisers** (nitrates): cause **eutrophication** (algal bloom); dead algae decay and use up oxygen; fish die.
- **Industrial waste:** poisonous chemicals and heavy metals such as **mercury** and **lead** build up in fish and people.
- **Oil spills:** an oil film coats birds' feathers and cuts off gas exchange between air and water.

**Thermal pollution:** hot water from power plants and industries raises water temperature; warm water holds **less dissolved oxygen** (about ${DO.cool.mg} mg per litre at ${DO.cool.t} °C but about ${DO.warm.mg} at ${DO.warm.t} °C), so fish and other aquatic life suffer.

**Soil pollution:** excess chemical **fertilisers** and **pesticides**, **urban waste** (plastics, metals, e-waste), industrial waste and acid rain; soil loses fertility and its organisms.`,
      [kt('Eutrophication', 'Excessive growth of algae due to nutrients such as phosphates and nitrates.'), kt('Thermal pollution', 'Harmful warming of water bodies by hot water from industry.')],
      table(['Pollutant', 'Main effect'], [['Sewage', 'Oxygen used up; disease'], ['Detergents, fertilisers', 'Algal bloom'], ['Hot water', 'Less dissolved oxygen'], ['Oil', 'Birds and gas exchange harmed']], 'Table of four water pollutants and their main effects'),
      [2],
    ),
    sec(
      '3. Biomedical waste, radiation and noise pollution',
      `**Biomedical waste:** used syringes, needles, dressings, body tissues and expired medicines from hospitals and clinics. It can spread infections (such as hepatitis) and injure waste handlers, so it must be **segregated at source** into colour-coded containers (for example, sharps in puncture-proof containers, as under India's Bio-Medical Waste Management Rules, 2016) and treated by **autoclaving**, **incineration** or other approved methods.

**Radiation pollution:** sources include X-rays, radioactive waste from nuclear power plants, nuclear accidents and nuclear tests. Effects: damage to genes (mutations), **cancer**, burns, harm to unborn babies. Protection: lead shielding, safe storage of radioactive waste.

**Noise pollution:** unwanted, loud sound measured in **decibels (dB)**. Sources: vehicle horns and traffic, loudspeakers, firecrackers, aircraft, factories and construction. Long exposure above about **${NOISE_LIMIT} dB** can damage hearing. Effects: **hearing loss**, stress, irritability, sleeplessness, high blood pressure.`,
      [kt('Biomedical waste', 'Waste from hospitals and clinics that may carry infection.'), kt('Decibel', 'Unit used to measure the loudness of sound.')],
      V.noise,
      [3],
    ),
    sec(
      '4. Biodegradable and non-biodegradable wastes; DDT',
      `| Biodegradable | Non-biodegradable |
|---|---|
| Broken down by bacteria and fungi | Not broken down by decomposers |
| Food scraps, paper, cow dung, leaves | Plastics, glass, metals, DDT |
| Can be composted | Must be reduced, reused, recycled |

**DDT** is a **non-biodegradable** (persistent) pesticide. It is not broken down or excreted and is stored in body fat. As each animal eats many from the level below, DDT becomes more **concentrated at each step** of the food chain: **biological magnification**. Top consumers such as fish-eating birds are harmed most (for example, thin eggshells that break). Many countries, including India, have banned or restricted its use in farming.`,
      [kt('Biodegradable', 'Can be broken down by decomposers.'), kt('Biomagnification', 'Increase in concentration of a persistent chemical along a food chain.')],
      V.ddt,
      [4],
    ),
    sec(
      '5. Greenhouse effect, global warming, acid rain and ozone depletion',
      `**Greenhouse effect:** carbon dioxide, methane, nitrous oxide, CFCs and water vapour let sunlight through but **trap heat** given off by the Earth. More of these gases (from burning fuels, deforestation, paddy fields and cattle) cause **global warming**: melting glaciers and polar ice, rising sea levels, extreme weather, harm to crops and wildlife.

**Acid rain:** **sulphur dioxide** and **nitrogen oxides** dissolve in rain water to form **sulphuric and nitric acids** (rain more acidic than its normal pH of about ${RAIN.normal}). Effects: acidic lakes (fish die), damaged forests and soils, corroded **marble** and metal.

**Ozone depletion:** the **ozone layer** in the **stratosphere** absorbs most harmful **UV rays**. **CFCs** from old refrigerators, air conditioners and sprays release chlorine, which destroys ozone (an "ozone hole" was found over Antarctica in the 1980s). More UV-B causes **skin cancer**, **cataract**, weaker immunity and harm to crops and plankton. Under the **Montreal Protocol (1987)** countries agreed to phase out CFCs.`,
      [kt('Greenhouse effect', 'Trapping of the Earth\'s heat by gases in the atmosphere.'), kt('Acid rain', 'Rain made acidic by dissolved sulphur and nitrogen oxides.'), kt('Ozone layer', 'Layer of ozone in the stratosphere that absorbs UV rays.')],
      V.greenhouse,
      [5],
      [V.acid, V.ozone],
    ),
    sec(
      '6. Control measures and the Swachh Bharat Abhiyan',
      `- **CNG** (compressed natural gas) for buses and autos: burns cleanly.
- **Bharat Stage (BS) emission norms:** Government of India standards limiting vehicle pollutants; **BS-VI** has applied across India since **April 2020** (as of 2026).
- **Switching off engines** at long red lights; using public transport.
- **Social forestry:** planting trees on community land to absorb carbon dioxide and trap dust.
- **Sewage treatment plants** before discharge into rivers; cooling of hot water before release.
- **Bans on plastics:** India banned a list of single-use plastic items from **1 July 2022**; many states have their own bans.
- **Organic farming:** compost and biological pest control instead of chemical fertilisers and pesticides.

**Swachh Bharat Abhiyan** (Clean India Mission), launched on **2 October 2014**. Aims: a clean India; an end to **open defecation** through toilets; **scientific solid-waste management** (segregation, composting, recycling); a change in people's habits about cleanliness.`,
      [kt('CNG', 'Compressed natural gas, a cleaner vehicle fuel.'), kt('Social forestry', 'Planting trees on community and public land.'), kt('Swachh Bharat Abhiyan', 'Clean India Mission launched in 2014.')],
      table(['Measure', 'Pollution reduced'], [['CNG, BS norms', 'Air'], ['Sewage treatment', 'Water'], ['Organic farming', 'Soil and water'], ['Plastic bans', 'Soil and water']], 'Table of four control measures and the pollution each reduces'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Mixing up the greenhouse effect (heat trapped) and ozone depletion (UV let in).
- Naming carbon dioxide as the cause of acid rain (it is sulphur dioxide and nitrogen oxides).
- Saying thermal pollution poisons fish (it lowers dissolved oxygen).
- Calling paper non-biodegradable, or DDT biodegradable.
- Giving dates for schemes and norms that are not asked; when you do, use the ones above.

**How marks are usually awarded**
- 1 mark: a term, a pollutant, an odd one out **with its category**.
- 2 marks: a source and its effect, or two measures.
- 3 marks: formation and effects of acid rain, a labelled greenhouse diagram, or three control measures with reasons.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Pollutant?', 'Substance that makes the environment harmful.', 'definition', 1),
    fc(2, 'Why is carbon monoxide dangerous?', 'Combines with haemoglobin; less oxygen.', 'concept', 1),
    fc(3, 'Main source of sulphur dioxide?', 'Burning coal.', 'fact', 1),
    fc(4, 'What causes winter haze?', 'Particulate matter from burning and traffic.', 'fact', 1),
    fc(5, 'Two air pollutants from vehicles?', 'Carbon monoxide; nitrogen oxides.', 'fact', 1),
    fc(6, 'How does sewage kill fish?', 'Bacteria use up dissolved oxygen.', 'concept', 2),
    fc(7, 'Eutrophication?', 'Algal bloom from phosphates and nitrates.', 'definition', 2),
    fc(8, 'Thermal pollution?', 'Hot water lowers dissolved oxygen.', 'definition', 2),
    fc(9, 'Effect of an oil spill on birds?', 'Feathers coated; cannot fly or keep warm.', 'fact', 2),
    fc(10, 'Two causes of soil pollution?', 'Excess fertilisers; plastic waste.', 'fact', 2),
    fc(11, 'Biomedical waste?', 'Infectious waste from hospitals and clinics.', 'definition', 3),
    fc(12, 'How is biomedical waste handled?', 'Segregated, then autoclaved or incinerated.', 'exam-tip', 3),
    fc(13, 'Effect of radiation?', 'Gene damage; cancer.', 'fact', 3),
    fc(14, 'Unit of loudness?', 'Decibel (dB).', 'fact', 3),
    fc(15, 'Two effects of noise?', 'Hearing loss; high blood pressure.', 'fact', 3),
    fc(16, 'Biodegradable?', 'Broken down by decomposers.', 'definition', 4),
    fc(17, 'Two non-biodegradable wastes?', 'Plastics; glass.', 'fact', 4),
    fc(18, 'Biomagnification?', 'Concentration rises along the food chain.', 'definition', 4),
    fc(19, 'Why is DDT harmful to birds of prey?', 'Builds up; thin eggshells.', 'concept', 4),
    fc(20, 'Main greenhouse gas from fuels?', 'Carbon dioxide.', 'fact', 5),
    fc(21, 'Two effects of global warming?', 'Melting glaciers; rising sea level.', 'fact', 5),
    fc(22, 'Gases causing acid rain?', 'Sulphur dioxide, nitrogen oxides.', 'fact', 5),
    fc(23, 'Acids in acid rain?', 'Sulphuric and nitric acids.', 'fact', 5),
    fc(24, 'Where is the ozone layer?', 'Stratosphere.', 'fact', 5),
    fc(25, 'Chemicals that deplete ozone?', 'CFCs.', 'fact', 5),
    fc(26, 'Effect of more UV-B?', 'Skin cancer; cataract.', 'fact', 5),
    fc(27, 'CNG?', 'Compressed natural gas; cleaner fuel.', 'definition', 6),
    fc(28, 'Bharat Stage norms?', 'Indian limits on vehicle emissions.', 'definition', 6),
    fc(29, 'Swachh Bharat Abhiyan launched?', '2 October 2014.', 'fact', 6),
    fc(30, 'Two aims of Swachh Bharat?', 'Clean India; end open defecation.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
