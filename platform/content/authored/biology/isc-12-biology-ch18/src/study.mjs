// ISC 12 Biology ch18 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { INDIA } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biodiversity and its Conservation — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Levels and extent of biodiversity',
      `**Biodiversity** — a term popularised by the sociobiologist **Edward Wilson** — is the combined diversity at all levels of biological organisation.
- **Genetic diversity:** a single species may show high diversity at the genetic level over its distributional range. The medicinal plant ***Rauwolfia vomitoria*** growing in different Himalayan ranges shows variation in the potency and concentration of the active chemical **reserpine**. India has more than **50 000** genetically different strains of **rice** and about **1000** varieties of **mango**.
- **Species diversity:** diversity at the species level; for example the **Western Ghats** have a greater **amphibian** species diversity than the **Eastern Ghats**.
- **Ecological diversity:** at the ecosystem level; India, with its **deserts, rain forests, mangroves, coral reefs, wetlands, estuaries and alpine meadows**, has a greater ecosystem diversity than a Scandinavian country such as Norway.

**How many species?** According to the **IUCN (2004)**, the total number of plant and animal species described so far is slightly more than **1.5 million**; **Robert May** placed the global species diversity at about **7 million**. More than **70 percent** of all recorded species are **animals**, while plants (including algae, fungi, bryophytes, gymnosperms and angiosperms) are no more than **22 percent**. Among animals, **insects** are the most species-rich group, making up more than **70 percent** — out of every 10 animals, 7 are insects. The number of fungus species is more than that of fishes, amphibians, reptiles and mammals combined.

**India** has only **${INDIA.land} percent** of the world’s land area, but its share of global species diversity is an impressive **${INDIA.species} percent**; it is one of the **12 mega-diversity countries**, with nearly **45 000** species of plants and twice as many of animals.`,
      [kt('Biodiversity', 'Diversity at all levels of biological organisation.'), kt('Genetic diversity', 'Variation in genes within a species.'), kt('Mega-diversity country', 'One of 12 countries holding a very large share of the world’s species.')],
      V.shares,
      [1],
    ),
    sec(
      '2. Patterns of biodiversity and its importance',
      `**Latitudinal gradients:** species diversity **decreases** as we move away from the **equator** towards the **poles**. Tropics (23.5° N to 23.5° S) harbour more species than temperate or polar areas. **Colombia**, near the equator, has nearly **1400** species of birds, **New York** at 41° N has **105**, and **Greenland** at 71° N only **56**; **India**, largely in the tropics, has more than **1200**. A tropical forest such as the **Amazon** has the greatest biodiversity on Earth (more than 40 000 plant species, 3000 fishes, 1300 birds, 427 mammals, 427 amphibians, 378 reptiles and more than 125 000 invertebrates). Reasons proposed: (a) the tropics have remained relatively **undisturbed for millions of years**, giving long evolutionary time for diversification; (b) tropical environments are **less seasonal, relatively more constant and predictable**, promoting **niche specialisation**; (c) there is **more solar energy**, contributing to **higher productivity**.

**Species–area relationship:** **Alexander von Humboldt** observed that within a region, **species richness increased with increasing explored area, but only up to a limit**. On a normal scale the relation is a **rectangular hyperbola**; on a logarithmic scale it is a **straight line** described by
**log S = log C + Z log A** (S = species richness, A = area, Z = slope of the line (regression coefficient), C = Y-intercept), that is, **S = CA^Z**.
The value of **Z** lies in the range **0.1 to 0.2**, regardless of taxonomic group or region; for **very large areas** such as entire continents the slope is much steeper, **0.6 to 1.2** (for frugivorous birds and mammals in tropical forests of different continents, about 1.15).

**Importance of species diversity:** communities with more species tend to be **more stable** — **David Tilman’s** long-term experiments showed that plots with more species had **less year-to-year variation** in total biomass, and that increased diversity contributed to **higher productivity**. **Paul Ehrlich’s rivet popper hypothesis:** an ecosystem is like an **aeroplane** whose parts are joined by thousands of **rivets (species)**. Removing a few rivets from the seats or windows (loss of minor species) may not affect flight safety, but as more rivets are removed the plane becomes dangerously weak; loss of rivets on the **wings** (key species that drive major ecosystem functions) is a **serious threat**.

**Why conserve biodiversity?**
- **Narrowly utilitarian:** humans derive countless **direct economic benefits** — food (cereals, pulses, fruits), firewood, fibre, construction material, industrial products (tannins, lubricants, dyes, resins, perfumes) and medicines; more than **25 percent** of drugs on the market are derived from plants; nations exploring molecular, genetic and species-level diversity for economically important products practise **bioprospecting**.
- **Broadly utilitarian:** biodiversity provides **ecosystem services** — the **Amazon** forest is estimated to produce through photosynthesis about **20 percent** of the total oxygen in the Earth’s atmosphere; **pollination** by bees, bumblebees, birds and bats; aesthetic pleasures.
- **Ethical:** every species has an **intrinsic value**, even if it has no economic value to us; we have a **moral duty** to care for its well-being and pass on our biological legacy to future generations.`,
      [kt('Latitudinal gradient', 'Fall in species diversity from the equator towards the poles.'), kt('Species–area relationship', 'S = CA^Z; species richness rises with area up to a limit.'), kt('Rivet popper hypothesis', 'Ehrlich’s analogy of species as rivets of an aeroplane.'), kt('Bioprospecting', 'Exploring biodiversity for economically important products.')],
      V.speciesarea,
      [2],
      [V.latitude],
    ),
    sec(
      '3. Loss of biodiversity',
      `The colonisation of tropical Pacific islands by humans is said to have led to the extinction of more than 2000 species of native birds. The **IUCN Red List (2004)** documents the extinction of **784 species** (338 vertebrates, 359 invertebrates and 87 plants) in the last 500 years. **Recent extinctions** include the **dodo** (Mauritius), **quagga** (Africa), **thylacine** (Australia), **Steller’s sea cow** (Russia) and **three subspecies of tiger** (**Bali, Javan, Caspian**); in the last twenty years alone, 27 species have disappeared. More than **15 500** species worldwide face the threat of extinction, including **12 percent of birds, 23 percent of mammals, 32 percent of amphibians and 31 percent of gymnosperms**. Loss of biodiversity in a region may lead to a **decline in plant production**, **lowered resistance** to environmental perturbations such as drought, and increased variability in ecosystem processes.

**Causes — the “evil quartet”:**
1. **Habitat loss and fragmentation** — the most important cause. Tropical rain forests once covered more than **14 percent** of the Earth’s land surface but now cover no more than **6 percent**; the **Amazon rain forest** (“lungs of the planet”) is being cut and cleared for cultivating **soya beans** or for conversion to grasslands for raising **beef cattle**. When large habitats are broken into small fragments, **mammals and birds** needing large territories and **migratory** animals are badly affected.
2. **Over-exploitation** — many species extinctions in the last 500 years (**Steller’s sea cow, passenger pigeon**) were due to over-exploitation by humans; many marine fish populations are over-harvested.
3. **Alien species invasions** — when alien species are introduced, some turn invasive and cause decline or extinction of indigenous species. The **Nile perch** introduced into **Lake Victoria** (East Africa) led to the extinction of an ecologically unique assemblage of more than **200 species of cichlid fish**. Invasive weeds such as **carrot grass (Parthenium)**, **Lantana** and **water hyacinth (Eichhornia)** threaten native species; the illegal introduction of the **African catfish *Clarias gariepinus*** for aquaculture threatens indigenous catfishes.
4. **Co-extinctions** — when a species becomes extinct, plant and animal species **obligately associated** with it also become extinct: when a host fish species becomes extinct, its unique assemblage of **parasites** meets the same fate; co-evolved **plant–pollinator** mutualisms are another example.`,
      [kt('Evil quartet', 'Habitat loss and fragmentation, over-exploitation, alien species invasions, co-extinctions.'), kt('Co-extinction', 'Extinction of a species because an obligately associated species went extinct.'), kt('Invasive species', 'Introduced species that spreads and harms native species.')],
      table(['Cause', 'Example'], [['Habitat loss', 'Amazon cleared for soybeans and cattle'], ['Over-exploitation', 'Steller’s sea cow, passenger pigeon'], ['Alien species', 'Nile perch in Lake Victoria'], ['Co-extinction', 'Host fish and its parasites']], 'Table of the evil quartet with examples'),
      [3],
    ),
    sec(
      '4. In-situ conservation',
      `**In-situ (on site)** conservation protects species in their **natural habitat**, together with the whole ecosystem.

**Biodiversity hotspots** — regions with **very high levels of species richness** and **high degree of endemism** (species confined to that region). Initially 25 hotspots were identified; the number now stands at **34**. Three of them — **Western Ghats and Sri Lanka, Indo-Burma, and the Himalaya** — cover India’s exceptionally high biodiversity regions. Although all the hotspots together cover **less than 2 percent** of the Earth’s land area, they harbour an extremely high number of species; **strict protection** of these hotspots could reduce the ongoing mass extinctions by almost **30 percent**.

**Protected areas** in India: ecologically unique and biodiversity-rich regions are legally protected as **biosphere reserves, national parks and wildlife sanctuaries**. A **biosphere reserve** has a strictly protected **core zone**, a surrounding **buffer zone** where limited activities (research, education, tourism) are permitted, and an outer **transition zone** where people live and use resources sustainably. **National parks** protect whole ecosystems strictly; **sanctuaries** protect particular species while allowing some human activities.

**Sacred groves** — India has a history of religious and cultural traditions that emphasised protection of nature. In many cultures, tracts of forest were set aside, and all the trees and wildlife within them were venerated and given total protection. Such sacred groves are found in the **Khasi and Jaintia Hills** in Meghalaya, the **Aravalli Hills** of Rajasthan, the **Western Ghat** regions of Karnataka and Maharashtra, and the **Sarguja, Chanda and Bastar** areas of Madhya Pradesh. In Meghalaya, sacred groves are the last refuges for a large number of rare and threatened plants.

**Ramsar sites** — wetlands of international importance designated under the **Ramsar Convention** (signed at Ramsar, Iran, in **1971**) for the conservation and wise use of wetlands.

**Red Data Book** — maintained by the **IUCN (International Union for Conservation of Nature)**, it documents threatened species and classifies them into categories such as **extinct, extinct in the wild, critically endangered, endangered and vulnerable**, guiding conservation priorities.`,
      [kt('In-situ conservation', 'Protection of species in their natural habitats.'), kt('Biodiversity hotspot', 'Region with very high species richness and endemism.'), kt('Sacred grove', 'Forest tract protected by religious or cultural tradition.'), kt('Red Data Book', 'IUCN record of threatened species and their categories.')],
      V.biosphere,
      [4],
    ),
    sec(
      '5. Ex-situ conservation',
      `**Ex-situ (off site)** conservation protects threatened animals and plants by taking them **out of their natural habitat** and placing them in special settings where they can be protected and given special care.
- **Zoological parks, botanical gardens and wildlife safari parks** serve this purpose; many animals that have become extinct in the wild continue to be maintained in zoos.
- **Captive breeding** of endangered species, with release into the wild where possible.
- **Cryopreservation** — gametes of threatened species can be preserved in **viable and fertile condition for long periods** using cryopreservation techniques (storage in **liquid nitrogen at −196 °C**).
- **In vitro fertilisation** of eggs, and **tissue culture** methods for propagating plants.
- **Seed banks** — seeds of different genetic strains of commercially important plants can be kept for long periods.
Ex-situ methods complement, but cannot replace, the protection of natural habitats.`,
      [kt('Ex-situ conservation', 'Protection of species outside their natural habitats.'), kt('Cryopreservation', 'Storage of gametes or tissues in liquid nitrogen at −196 °C.'), kt('Seed bank', 'Store of viable seeds of many plant strains.')],
      table(['Method', 'Example'], [['Zoos and safari parks', 'Captive breeding of endangered animals'], ['Botanical gardens', 'Living collections of rare plants'], ['Cryopreservation', 'Frozen gametes and embryos'], ['Seed banks', 'Stored seeds of crop varieties']], 'Table of ex-situ methods with examples'),
      [5],
    ),
    sec(
      '6. International conventions',
      `Biodiversity knows no political boundaries, and conservation is a collective responsibility of all nations.
- **The Earth Summit**, held in **Rio de Janeiro** in **1992**, called upon all nations to take appropriate measures for the **conservation of biodiversity** and the **sustainable utilisation of its benefits**; it produced the **Convention on Biological Diversity (CBD)**, which also seeks fair and equitable sharing of benefits from genetic resources.
- **The World Summit on Sustainable Development**, held in **Johannesburg, South Africa**, in **2002**: **190 countries** pledged their commitment to achieve, **by 2010**, a **significant reduction in the current rate of biodiversity loss** at global, regional and local levels.`,
      [kt('Earth Summit', 'Rio de Janeiro, 1992; Convention on Biological Diversity.'), kt('World Summit', 'Johannesburg, 2002; pledge to reduce biodiversity loss by 2010.')],
      table(['Summit', 'Place, year', 'Agenda'], [['Earth Summit', 'Rio de Janeiro, 1992', 'Conservation and sustainable use of biodiversity'], ['World Summit on Sustainable Development', 'Johannesburg, 2002', 'Significant reduction in the rate of biodiversity loss by 2010']], 'Table of international summits'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing Z as 0.6–1.2 for all regions (that is for whole continents; usually 0.1–0.2).
- Saying species diversity increases towards the poles (it decreases).
- Naming the dodo as Australian (Mauritius) or the thylacine as Russian (Australia).
- Confusing in-situ (natural habitat) with ex-situ (outside it).
- Giving the Earth Summit as Johannesburg (Rio, 1992; Johannesburg was the World Summit, 2002).
- Listing the evil quartet without examples.

**How marks are usually awarded**
- 1-mark subparts: a level of biodiversity, a value of Z, a recent extinction, an Indian hotspot, a summit and year.
- 2–3-mark questions: latitudinal gradient with reasons; species–area relationship; rivet popper; evil quartet; in-situ vs ex-situ.
- 5-mark questions in parts: biodiversity patterns with the equation; causes of loss; conservation strategies and international efforts.`,
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
    fc(2, 'Three levels of biodiversity?', 'Genetic, species, ecological.', 'concept', 1),
    fc(3, 'Example of genetic diversity?', 'Reserpine in Rauwolfia vomitoria; rice and mango varieties.', 'exam-tip', 1),
    fc(4, 'Described species (IUCN 2004)?', 'Slightly more than 1.5 million.', 'fact', 1),
    fc(5, 'Share of insects among animals?', 'More than 70 percent.', 'fact', 1),
    fc(6, 'India’s share of land and of species?', '2.4 percent and 8.1 percent.', 'fact', 1),
    fc(7, 'Trend of diversity with latitude?', 'Decreases from equator to poles.', 'concept', 2),
    fc(8, 'Bird species in Colombia vs Greenland?', 'About 1400 vs 56.', 'fact', 2),
    fc(9, 'Three reasons for tropical diversity?', 'Long evolutionary time, stable climate, more energy.', 'concept', 2),
    fc(10, 'Who described the species–area relationship?', 'Alexander von Humboldt.', 'fact', 2),
    fc(11, 'Species–area equation?', 'log S = log C + Z log A.', 'exam-tip', 2),
    fc(12, 'Usual value of Z?', '0.1 to 0.2 (0.6–1.2 for continents).', 'fact', 2),
    fc(13, 'Rivet popper hypothesis is by?', 'Paul Ehrlich.', 'fact', 2),
    fc(14, 'What do rivets on the wings represent?', 'Key species driving major functions.', 'concept', 2),
    fc(15, 'Narrowly utilitarian reason?', 'Direct benefits: food, fibre, medicines.', 'definition', 2),
    fc(16, 'Oxygen from the Amazon?', 'About 20 percent of atmospheric oxygen.', 'fact', 2),
    fc(17, 'Extinctions in 500 years (IUCN 2004)?', '784 species.', 'fact', 3),
    fc(18, 'Where did the dodo live?', 'Mauritius.', 'fact', 3),
    fc(19, 'Three extinct tiger subspecies?', 'Bali, Javan, Caspian.', 'fact', 3),
    fc(20, 'Name the evil quartet.', 'Habitat loss, over-exploitation, alien species, co-extinctions.', 'exam-tip', 3),
    fc(21, 'Effect of Nile perch in Lake Victoria?', 'Extinction of over 200 cichlid species.', 'fact', 3),
    fc(22, 'Example of co-extinction?', 'A host fish and its parasites.', 'fact', 3),
    fc(23, 'Number of hotspots worldwide?', '34.', 'fact', 4),
    fc(24, 'Hotspots covering India?', 'Western Ghats and Sri Lanka, Indo-Burma, Himalaya.', 'fact', 4),
    fc(25, 'Zones of a biosphere reserve?', 'Core, buffer, transition.', 'fact', 4),
    fc(26, 'Sacred groves in Meghalaya?', 'Khasi and Jaintia Hills.', 'fact', 4),
    fc(27, 'What are Ramsar sites?', 'Wetlands of international importance.', 'definition', 4),
    fc(28, 'Temperature of cryopreservation?', '−196 °C (liquid nitrogen).', 'fact', 5),
    fc(29, 'Earth Summit: place and year?', 'Rio de Janeiro, 1992.', 'fact', 6),
    fc(30, 'World Summit: place and year?', 'Johannesburg, 2002.', 'fact', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
