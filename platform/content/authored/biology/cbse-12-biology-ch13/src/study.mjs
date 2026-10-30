// ch13 notes and flashcards.
import { T, table, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biodiversity and Conservation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Biodiversity and its levels',
      `**Biodiversity**, a term popularised by the sociobiologist **Edward Wilson**, is the combined diversity at all levels of biological organisation.

- **Genetic diversity:** a single species may show high diversity at the genetic level over its range. *Rauwolfia vomitoria* growing in different Himalayan ranges varies in the potency and concentration of the chemical **reserpine**. India has more than **50,000** genetically different strains of rice and **1,000** varieties of mango.
- **Species diversity:** diversity at the species level; the **Western Ghats** have a greater amphibian species diversity than the **Eastern Ghats**.
- **Ecological diversity:** diversity of ecosystems; India, with its deserts, rain forests, mangroves, coral reefs, wetlands, estuaries and alpine meadows, has greater ecosystem diversity than a Scandinavian country like Norway.

**How many species?** According to the IUCN (2004), slightly more than **1.5 million** plant and animal species have been described. **Robert May** placed the global estimate at about **7 million**. More than **70 percent** of all recorded species are **animals**; plants (including algae, fungi, bryophytes, gymnosperms and angiosperms) make up no more than **22 percent**. Among animals, **insects** are the most species-rich group, making up more than 70 percent of the total; out of every 10 animals, 7 are insects. The number of fungal species exceeds the combined total of fishes, amphibians, reptiles and mammals.

**India** has only **2.4 percent** of the world’s land area but **8.1 percent** of global species diversity, making it one of the **12 mega diversity countries**. Nearly **45,000** species of plants and twice as many animals have been recorded; applying May’s estimates, more than 1,00,000 plant and 3,00,000 animal species may yet be discovered.`,
      [kt('Biodiversity', 'The combined diversity at all levels of biological organisation: genetic, species and ecological.'), kt('Genetic diversity', 'Variation in genes within a species, for example in the reserpine content of Rauwolfia vomitoria.'), kt('Mega diversity country', 'One of the 12 countries that together hold most of the world’s species; India is one.')],
      V.shares,
      [1],
    ),
    sec(
      '2. Patterns of biodiversity and its importance',
      `**Latitudinal gradients.** Species diversity generally **decreases from the equator towards the poles**. The tropics (23.5° N to 23.5° S) harbour more species than temperate or polar areas. Colombia, near the equator, has nearly **1,400** species of birds; New York at 41° N has **105**; Greenland at 71° N has **56**. India, with much of its land in tropical latitudes, has more than **1,200** bird species. A forest in a tropical region like Ecuador has up to **10 times** as many species of vascular plants as a forest of equal area in a temperate region like the Midwest of the USA. The **Amazon** rain forest has the greatest biodiversity on Earth.

Why the tropics are richer:
1. Speciation is generally a function of **time**. Temperate regions were subjected to frequent **glaciations** in the past, whereas tropical latitudes remained relatively undisturbed for millions of years.
2. Tropical environments are **less seasonal**, more constant and predictable, which promotes **niche specialisation**.
3. More **solar energy** is available in the tropics, contributing to higher **productivity**, which might in turn contribute indirectly to greater diversity.

**Species–area relationship.** **Alexander von Humboldt** observed that within a region species richness increases with increasing explored area, but only up to a limit. The relation is a rectangular hyperbola, and on a logarithmic scale a straight line: $\\log S = \\log C + Z \\log A$, where S is species richness, A area, C the Y-intercept and Z the slope (regression coefficient). Z lies in the range **0.1 to 0.2** regardless of taxonomic group or region; for very large areas such as entire continents the slope is much steeper, with Z of **0.6 to 1.2** (for example, frugivorous birds and mammals in tropical forests of different continents, slope 1.15).

**Importance of species diversity.** A stable community does not show too much variation in productivity from year to year, is resistant or resilient to occasional disturbances, and resists invasion by alien species. **David Tilman**’s long-term outdoor plot experiments showed that plots with more species had less year-to-year variation in total biomass, and that greater diversity contributed to higher productivity. **Paul Ehrlich**’s **rivet popper hypothesis** compares an ecosystem to an aeroplane whose rivets are species: losing a few rivets may not affect flight at first, but as more are removed the plane becomes dangerously weak, and losing rivets on the wings (key species that drive major ecosystem functions) is more serious than losing those on the seats.`,
      [kt('Latitudinal gradient', 'The decrease in species diversity from the equator towards the poles.'), kt('Species–area relationship', 'Increase of species richness with area, up to a limit; log S = log C + Z log A.'), kt('Rivet popper hypothesis', 'Paul Ehrlich’s analogy: species are rivets holding an ecosystem together; losing key species endangers it.')],
      V.latitude,
      [1],
      [V.speciesarea],
      [{ label: 'Species–area relationship (S species richness, A area, C intercept, Z slope)', latex: '\\log S = \\log C + Z \\log A' }],
    ),
    sec(
      '3. Loss of biodiversity',
      `The colonisation of tropical Pacific islands by humans is said to have led to the extinction of more than 2,000 species of native birds. The **IUCN Red List (2004)** documents the extinction of **784 species** (338 vertebrates, 359 invertebrates and 87 plants) in the last 500 years. Recent extinctions include the **dodo** (Mauritius), **quagga** (Africa), **thylacine** (Australia), **Steller’s sea cow** (Russia) and three subspecies of tiger (**Bali, Javan, Caspian**). In the last twenty years alone, 27 species have disappeared. More than **15,500** species worldwide face the threat of extinction; at present **12 percent** of bird species, **23 percent** of mammal species, **32 percent** of amphibian species and **31 percent** of gymnosperm species face this threat.

The **sixth extinction**, now in progress, differs from the five earlier mass extinctions: current rates are estimated to be **100 to 1,000 times faster** than in pre-human times, and **human activities** are responsible. If present trends continue, nearly half of all species might be wiped out within the next 100 years.

**Effects** of loss of biodiversity in a region: a decline in plant production; lowered resistance to environmental perturbations such as drought; and increased variability in certain ecosystem processes such as plant productivity, water use, and pest and disease cycles.

**Causes — the “evil quartet”:**
1. **Habitat loss and fragmentation** — the most important cause. Tropical rain forests once covered more than **14 percent** of the Earth’s land surface and now cover no more than **6 percent**. The **Amazon** rain forest, called the “lungs of the planet”, is being cut and cleared for cultivating soya beans or for conversion to grassland for raising beef cattle. When large habitats are broken into fragments, mammals and birds needing large territories and animals with migratory habits are badly affected.
2. **Over-exploitation** — when need turns to greed. **Steller’s sea cow** and the **passenger pigeon** became extinct through over-exploitation; many marine fish populations are over-harvested.
3. **Alien species invasions** — the **Nile perch** introduced into **Lake Victoria** in East Africa eventually led to the extinction of an ecologically unique assemblage of more than **200 species of cichlid fish**. Invasive weeds such as **carrot grass (Parthenium)**, **Lantana** and **water hyacinth (Eichhornia)** damage the environment; the illegal introduction of the African catfish ***Clarias gariepinus*** for aquaculture threatens indigenous catfishes in Indian rivers.
4. **Co-extinctions** — when a species becomes extinct, plant and animal species associated with it in an obligatory way also become extinct, e.g. the unique parasites of an extinct host fish, or a co-evolved plant and its pollinator.`,
      [kt('Sixth extinction', 'The present mass extinction, 100 to 1,000 times faster than pre-human rates and caused by humans.'), kt('Evil quartet', 'The four major causes of biodiversity loss: habitat loss and fragmentation, over-exploitation, alien species invasions and co-extinctions.'), kt('Co-extinction', 'Extinction of a species that depends obligatorily on another species that has become extinct.')],
      table(['Cause', 'Example'], [['Habitat loss and fragmentation', 'Rain forest down from over 14 to under 6 percent of land; Amazon clearing'], ['Over-exploitation', 'Steller’s sea cow, passenger pigeon'], ['Alien species', 'Nile perch in Lake Victoria; Parthenium, Lantana, Eichhornia; Clarias gariepinus'], ['Co-extinction', 'Parasites of an extinct host; plant and pollinator']], 'Table of the evil quartet with examples'),
      [2],
    ),
    sec(
      '4. Biodiversity conservation',
      `**Why conserve?**
- **Narrowly utilitarian:** humans derive countless direct economic benefits — food (cereals, pulses, fruits), firewood, fibre, construction material, and industrial products (tannins, lubricants, dyes, resins, perfumes). More than **25 percent** of the drugs currently sold in the market are derived from plants, and **25,000** plant species contribute to traditional medicines used by native peoples. Nations rich in biodiversity can expect benefits from **bioprospecting** (exploring molecular, genetic and species-level diversity for products of economic importance).
- **Broadly utilitarian:** biodiversity provides **ecosystem services**. The **Amazon** forest is estimated to produce, through photosynthesis, about **20 percent** of the total oxygen in Earth’s atmosphere. **Pollination** by bees, bumblebees, birds and bats is another service, as are the aesthetic pleasures of nature.
- **Ethical:** every species has an **intrinsic value**, even if not of current economic value to us; we have a moral duty to care for their well-being and to pass on our biological legacy in good order to future generations.

**In situ (on site) conservation** protects a whole ecosystem and hence its biodiversity at all levels.
- **Biodiversity hotspots** are regions with **very high levels of species richness** and a **high degree of endemism**. Initially 25 were identified, and 9 more were added, giving **34**. Three cover India’s exceptionally rich regions: **Western Ghats and Sri Lanka**, **Indo-Burma** and **Himalaya**. Hotspots together cover less than **2 percent** of the Earth’s land area, yet harbour a very high number of species; strict protection could reduce ongoing mass extinctions by almost **30 percent**.
- In India, ecologically unique and biodiversity-rich regions are legally protected as **biosphere reserves**, **national parks** and **wildlife sanctuaries**. (The textbook gives counts of 14, 90 and 448; official current counts are higher.)
- **Sacred groves:** tracts of forest set aside, with all trees and wildlife venerated and protected — in the **Khasi and Jaintia Hills** (Meghalaya), the **Aravalli Hills** (Rajasthan), the **Western Ghat** regions of Karnataka and Maharashtra, and the **Sarguja, Chanda and Bastar** areas of Madhya Pradesh. In Meghalaya they are the last refuges for many rare and threatened plants.
- **Ramsar sites:** wetlands of international importance designated under the **Ramsar Convention** (Ramsar, Iran, 1971) for conservation and wise use.
- **Red Data Book:** the IUCN Red List records the conservation status of species (for example critically endangered, endangered, vulnerable), guiding conservation priorities.

**Ex situ (off site) conservation:** threatened animals and plants are taken out of their natural habitat and protected in **zoological parks, botanical gardens and wildlife safari parks**; many animals extinct in the wild are maintained in zoos. **Cryopreservation** keeps gametes viable and fertile for long periods; eggs can be fertilised **in vitro**; plants can be propagated by **tissue culture**; seeds of commercially important plants are stored in **seed banks**.

**International efforts:** the **Earth Summit** at **Rio de Janeiro (1992)** called on all nations to take measures for conservation of biodiversity and sustainable use of its benefits; at the **World Summit on Sustainable Development** in **Johannesburg (2002)**, **190 countries** pledged to achieve, by 2010, a significant reduction in the current rate of biodiversity loss.`,
      [kt('Biodiversity hotspot', 'A region with very high species richness and a high degree of endemism.'), kt('Endemism', 'Occurrence of species found nowhere else.'), kt('Sacred grove', 'A forest tract protected for religious or cultural reasons.'), kt('Ramsar site', 'A wetland of international importance listed under the Ramsar Convention.'), kt('Cryopreservation', 'Storage of cells, gametes or tissues at very low temperature to keep them viable.')],
      table(['In situ', 'Ex situ'], [['Hotspots', 'Zoological parks'], ['Biosphere reserves, national parks, sanctuaries', 'Botanical gardens, safari parks'], ['Sacred groves', 'Seed banks, tissue culture'], ['Ramsar wetlands', 'Cryopreservation, in vitro fertilisation']], 'Table comparing in situ and ex situ conservation methods'),
      [3],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Defining a hotspot by species richness alone (endemism is also needed).
- Calling seed banks or zoos in situ conservation.
- Saying diversity increases towards the poles.
- Giving Z for continents as 0.1–0.2 (that is for regions; continents 0.6–1.2).
- Listing climate change or pollution as members of the evil quartet (the four are habitat loss, over-exploitation, alien species and co-extinctions).
- Mixing up narrowly and broadly utilitarian arguments.

**How marks are usually awarded**
- 1-mark items: name a level, a cause, a hotspot, an extinct species or a method.
- 2–3-mark answers: three levels with examples; reasons for tropical richness; species–area relation; three arguments for conservation.
- 5-mark answers: the evil quartet with examples; in situ and ex situ conservation; patterns of biodiversity.
- Case-based items: species–area data, extinction data, invasive species or conservation planning, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Who popularised the term biodiversity?', 'Edward Wilson.', 'fact', 1),
    fc(2, 'Three levels of biodiversity?', 'Genetic, species and ecological.', 'concept', 1),
    fc(3, 'Example of genetic diversity?', 'Reserpine content of Rauwolfia vomitoria varies across Himalayan ranges.', 'fact', 1),
    fc(4, 'Example of species diversity in India?', 'Western Ghats have more amphibian species than the Eastern Ghats.', 'fact', 1),
    fc(5, 'Described species (IUCN 2004)?', 'Slightly more than 1.5 million.', 'fact', 1),
    fc(6, 'Robert May’s global estimate?', 'About 7 million species.', 'fact', 1),
    fc(7, 'Share of insects among animals?', 'More than 70 percent: 7 of every 10 animals.', 'fact', 1),
    fc(8, 'India’s share of land and species?', '2.4 percent of land, 8.1 percent of species.', 'fact', 1),
    fc(9, 'Latitudinal gradient?', 'Diversity decreases from the equator to the poles.', 'concept', 1),
    fc(10, 'Three reasons for tropical richness?', 'Long undisturbed time, stable climate, more solar energy.', 'concept', 1),
    fc(11, 'Species–area equation?', 'log S = log C + Z log A.', 'formula', 1),
    fc(12, 'Z values?', '0.1–0.2 within regions; 0.6–1.2 for continents.', 'fact', 1),
    fc(13, 'Who observed the species–area relation?', 'Alexander von Humboldt.', 'fact', 1),
    fc(14, 'What did Tilman’s plots show?', 'More species: less year-to-year variation in biomass and higher productivity.', 'concept', 1),
    fc(15, 'Rivet popper hypothesis?', 'Paul Ehrlich: species are rivets; losing key ones endangers the ecosystem.', 'concept', 1),
    fc(16, 'Extinctions documented by IUCN (2004)?', '784 in 500 years: 338 vertebrates, 359 invertebrates, 87 plants.', 'fact', 2),
    fc(17, 'Name four recent extinctions.', 'Dodo, quagga, thylacine, Steller’s sea cow (also three tiger subspecies).', 'fact', 2),
    fc(18, 'Sixth extinction rate?', '100–1,000 times faster than pre-human times.', 'fact', 2),
    fc(19, 'Most threatened group by share?', 'Amphibians: 32 percent.', 'fact', 2),
    fc(20, 'Effects of biodiversity loss?', 'Lower plant production, lower resistance to drought, more variable processes.', 'concept', 2),
    fc(21, 'The evil quartet?', 'Habitat loss and fragmentation, over-exploitation, alien species, co-extinctions.', 'concept', 2),
    fc(22, 'Rain forest cover then and now?', 'Over 14 percent of land surface; now no more than 6 percent.', 'fact', 2),
    fc(23, 'Nile perch in Lake Victoria?', 'Led to extinction of over 200 cichlid fish species.', 'fact', 2),
    fc(24, 'Three invasive weeds in India?', 'Parthenium, Lantana, Eichhornia.', 'fact', 2),
    fc(25, 'What is co-extinction?', 'Loss of species that depend obligatorily on an extinct species.', 'definition', 2),
    fc(26, 'Three arguments for conservation?', 'Narrowly utilitarian, broadly utilitarian, ethical.', 'concept', 3),
    fc(27, 'What is bioprospecting?', 'Exploring biodiversity for products of economic importance.', 'definition', 3),
    fc(28, 'Oxygen from the Amazon?', 'About 20 percent of atmospheric oxygen.', 'fact', 3),
    fc(29, 'Define a hotspot.', 'Very high species richness and high endemism.', 'definition', 3),
    fc(30, 'Hotspots covering India?', 'Western Ghats and Sri Lanka, Indo-Burma, Himalaya.', 'fact', 3),
    fc(31, 'How many hotspots worldwide?', '34 (25 at first, 9 added).', 'fact', 3),
    fc(32, 'Sacred groves in Meghalaya?', 'Khasi and Jaintia Hills.', 'fact', 3),
    fc(33, 'What is a Ramsar site?', 'A wetland of international importance under the Ramsar Convention.', 'definition', 3),
    fc(34, 'Ex situ methods?', 'Zoos, botanical gardens, safari parks, cryopreservation, in vitro fertilisation, tissue culture, seed banks.', 'concept', 3),
    fc(35, 'Rio 1992 and Johannesburg 2002?', 'Earth Summit; 190 countries pledged to cut the rate of biodiversity loss by 2010.', 'fact', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
