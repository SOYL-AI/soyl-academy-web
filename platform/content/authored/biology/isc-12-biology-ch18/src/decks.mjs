// ISC 12 Biology ch18 Biodiversity and its Conservation — Part 1 (t01–t02), Part 2 (t03–t06).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { SPECIESAREA, LATITUDE, SHARES, BIOSPHERE } from './svgs.mjs';
import { speciesFor, zFrom, areaFactor, pct, round, BIRDS, INDIA } from './calc.mjs';

export const V = {
  speciesarea: svgV(SPECIESAREA, 'Species–area curve and its straight-line log–log form'),
  latitude: svgV(LATITUDE, 'Bird species falling from the equator towards the poles'),
  shares: svgV(SHARES, 'Shares of animals, plants and insects among described species'),
  biosphere: svgV(BIOSPHERE, 'Core, buffer and transition zones of a biosphere reserve'),
};

// ---------------------------------------------------------------- computed numbers
export const AF = round(areaFactor(16, 0.25), 2);
export const ZZ = round(zFrom([100, 50], [10000, 200]), 2);
export const S_EX = Math.round(speciesFor(12, 625, 0.25));
export const RL = { total: 784, vert: 338, invert: 359, plants: 87 };
export const VERT_PCT = pct(RL.vert, RL.total);
export const RF = { before: 14, now: 6 };
export const RF_LOSS = round(((RF.before - RF.now) / RF.before) * 100, 1);

export const deck1 = deck({
  part: 1,
  title: 'Biodiversity and its Conservation — Part 1: Biodiversity and its patterns',
  goals: [
    'Distinguish genetic, species and ecosystem diversity, and state the global numbers and proportions of major taxa',
    'Explain the latitudinal gradient and the species–area relationship (graph and equation)',
    'Explain the rivet popper hypothesis and the narrowly utilitarian, broadly utilitarian and ethical reasons for conserving biodiversity',
  ],
  slides: [
    sl('title', 'Biodiversity', {
      b: 'Part 1 — what biodiversity is, how it is distributed, and why it matters.',
      v: flow('LR', [['g', 'Genetic diversity'], ['s', 'Species diversity'], ['e', 'Ecosystem diversity']], [['g', 's'], ['s', 'e']], 'Flow from genetic diversity to species diversity to ecosystem diversity'),
      n: 'Biodiversity, a term popularised by the sociobiologist Edward Wilson, is the combined diversity at all levels of biological organisation, from genes to whole ecosystems.',
    }),
    sl('concept', 'Three levels of biodiversity', {
      b: 'Biodiversity exists at three levels.',
      v: table(['Level', 'Example'], [['Genetic diversity', 'Rauwolfia vomitoria in different Himalayan ranges varies in the potency of its chemical reserpine; India has over 50 000 strains of rice and about 1000 varieties of mango'], ['Species diversity', 'The Western Ghats have a greater diversity of amphibian species than the Eastern Ghats'], ['Ecological (ecosystem) diversity', 'India’s deserts, rain forests, mangroves, coral reefs, wetlands, estuaries and alpine meadows, far more than a Scandinavian country']], 'Table of the three levels of biodiversity'),
      n: 'A single medicinal plant may differ in its chemistry from one mountain range to another. The number of species differs from region to region. And a large country with varied landscapes holds many different kinds of ecosystem.',
    }),
    sl('diagram', 'How many species are there?', {
      b: 'The **IUCN (2004)** puts the number of described species at slightly more than **1.5 million**; **Robert May** estimated the global total at about **7 million**. More than **70 percent** of recorded species are **animals**; plants are no more than **22 percent**; among animals, **insects** are more than 70 percent.',
      v: V.shares,
      n: 'Out of every ten animals, seven are insects. Many species, especially of insects and micro-organisms, are still undescribed, which is why estimates of the total vary so widely.',
    }),
    sl('concept', 'India’s biodiversity', {
      b: `India has only **${INDIA.land} percent** of the world’s land area but about **${INDIA.species} percent** of global species diversity, making it one of the **12 mega-diversity countries**.`,
      v: table(['Group', 'Approximate number in India'], [['Plant species', 'About 45 000'], ['Animal species', 'About twice as many as plants'], ['Bird species', 'About 1200']], 'Table of approximate species numbers in India'),
      n: 'India holds more than three times its share of the world’s species, considering its land area. Many of its species, and many of the world’s, are yet to be discovered and named.',
    }),
    sl('diagram', 'The latitudinal gradient', {
      b: 'Species diversity **decreases from the equator towards the poles**. For example, birds: ' + BIRDS.map((b) => `${b.place} (${b.lat}) about ${b.n}`).join('; ') + '.',
      v: V.latitude,
      n: 'The tropics hold far more species than temperate or polar regions. A tropical forest like the Amazon has tens of thousands of plant species, thousands of fish, and over a thousand bird species.',
    }),
    sl('concept', 'Why are the tropics so diverse?', {
      b: 'Ecologists have proposed several reasons.',
      v: table(['Hypothesis', 'Explanation'], [['Evolutionary time', 'Tropical latitudes have remained relatively undisturbed for millions of years, allowing long evolutionary time for speciation'], ['Stable environment', 'Less seasonal, more constant and predictable conditions promote niche specialisation'], ['More energy', 'More solar energy contributes to higher productivity, which can support more species']], 'Table of reasons for high tropical diversity'),
      n: 'Temperate regions were repeatedly glaciated in the past, while the tropics were not. Their steady climate and abundant energy allow many species to specialise and coexist.',
    }),
    sl('check', 'Quick check: genetic diversity', {
      b: 'Variation in reserpine content of Rauwolfia from different Himalayan ranges is an example of which level of biodiversity?',
      n: 'Quick check. Is it about genes, species or ecosystems?',
      chk: 'genetic-mcq',
    }),
    sl('diagram', 'The species–area relationship', {
      b: '**Alexander von Humboldt** observed that within a region, **species richness increases with explored area, but only up to a limit**. On a normal scale the relation is a **rectangular hyperbola**; on a log scale it is a **straight line**: **log S = log C + Z log A**, or **S = CA^Z**, where S is species richness, A area, C the Y-intercept and Z the slope.',
      v: V.speciesarea,
      n: 'Z, the slope or regression coefficient, is usually between point one and point two for any taxonomic group or region. But when very large areas such as whole continents are compared, the slope is much steeper, from about point six to one point two.',
    }),
    sl('example', 'Worked example 1: using S = CA^Z', {
      b: `(i) With Z = 0.25, by what factor does the number of species rise if the area surveyed is made 16 times larger? (ii) With C = 12 and Z = 0.25, how many species are expected in an area of 625 km²?`,
      ul: [
        r`(i) Factor $= 16^{0.25} = ${AF}$: species double.`,
        r`(ii) $S = 12 \times 625^{0.25} = 12 \times 5 = ${S_EX}$ species.`,
      ],
      v: table(['Question', 'Answer'], [['Area × 16, Z = 0.25', `Species × ${AF}`], ['S for A = 625', String(S_EX)]], `Worked table: species double; ${S_EX} species`),
      n: 'Because Z is small, even a big increase in area gives only a modest increase in species: sixteen times the area merely doubles them. The same equation predicts how many species a given area should hold.',
    }),
    sl('example', 'Worked example 2: finding Z from two surveys', {
      b: 'A survey found 50 species of beetles in 100 km² and 200 species in 10 000 km² of the same region. Find Z.',
      ul: [
        r`$Z = \dfrac{\log S_{2} - \log S_{1}}{\log A_{2} - \log A_{1}} = \dfrac{\log 200 - \log 50}{\log 10000 - \log 100}$.`,
        r`$Z = \dfrac{\log 4}{\log 100} = \dfrac{0.602}{2} = ${ZZ}$.`,
      ],
      v: table(['Area (km²)', 'Species'], [['100', '50'], ['10 000', '200']], `Worked table: Z about ${ZZ}`),
      n: 'Taking logarithms turns the curve into a straight line whose slope is Z. Here Z is about point three, a little above the usual range, as might happen when a larger, more varied area is compared.',
    }),
    sl('concept', 'Importance of species diversity: the rivet popper hypothesis', {
      b: '**David Tilman** found that plots with **more species** showed **less year-to-year variation** in total biomass and higher productivity. **Paul Ehrlich’s rivet popper hypothesis** compares an ecosystem to an **aeroplane** and species to its **rivets**.',
      v: table(['Rivets lost', 'Effect on the aeroplane (ecosystem)'], [['A few rivets from seats or windows', 'Little immediate danger (loss of minor species)'], ['Rivets steadily lost over time', 'The aircraft becomes dangerously weak'], ['Rivets from the wings', 'A serious threat to the safety of the plane (loss of key species that drive major functions)']], 'Table explaining the rivet popper hypothesis'),
      n: 'Every species we lose weakens the ecosystem a little, and losing species that perform key functions is like pulling rivets from the wings. Richer communities also tend to be more stable and more productive.',
    }),
    sl('concept', 'Why should we conserve biodiversity?', {
      b: 'The reasons are grouped into three categories.',
      v: table(['Reason', 'Meaning and examples'], [['Narrowly utilitarian', 'Direct economic benefits: food, firewood, fibre, construction material, tannins, dyes, resins, perfumes; more than 25 percent of drugs come from plants; bioprospecting for useful products'], ['Broadly utilitarian', 'Ecosystem services: the Amazon forest produces about 20 percent of the oxygen in the atmosphere through photosynthesis; pollination by bees, birds and bats; aesthetic pleasure'], ['Ethical', 'Every species has an intrinsic value; we have a moral duty to care for it and pass it on to future generations']], 'Table of reasons for conserving biodiversity'),
      n: 'Some benefits are direct, like food and medicine. Others are services nature provides free, like clean air and pollination, which would be impossible to replace. And many people feel that every species has a right to exist.',
    }),
    sl('check', 'Quick check: rivet popper', {
      b: 'Judge the assertion and the reason about the rivet popper hypothesis.',
      n: 'Quick check. In the analogy, what do the rivets stand for?',
      chk: 'rivet-ar',
    }),
    sl('check', 'Quick check: tropics', {
      b: 'Which is a proposed reason for the high species diversity of the tropics?',
      n: 'Quick check. Think about time, stability and energy.',
      chk: 'tropics-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Genetic (Rauwolfia, rice, mango), species (Western Ghats amphibians) and ecosystem diversity.',
        'About 1.5 million species described (IUCN 2004); about 7 million estimated (May); over 70 percent animals, insects over 70 percent of animals.',
        `India: ${INDIA.land} percent of land, ${INDIA.species} percent of species; one of 12 mega-diversity countries.`,
        'Latitudinal gradient; species–area relationship S = CA^Z (Humboldt), Z usually 0.1–0.2, 0.6–1.2 for continents.',
        'Rivet popper hypothesis (Ehrlich); narrowly utilitarian, broadly utilitarian and ethical reasons for conservation.',
      ],
      v: table(['Concept', 'Person'], [['Biodiversity (popularised)', 'Edward Wilson'], ['Species–area relationship', 'Alexander von Humboldt'], ['Rivet popper hypothesis', 'Paul Ehrlich'], ['Stability experiments', 'David Tilman']], 'Summary table of concepts and scientists'),
      n: 'To recap: biodiversity exists at the level of genes, species and ecosystems, is richest in the tropics, rises with area according to a simple equation, and is worth conserving for practical, ecological and ethical reasons.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give an **Indian example** for each level of biodiversity.',
        'Write **log S = log C + Z log A** and give the usual **values of Z**.',
        'Quote **bird numbers** to illustrate the latitudinal gradient.',
        'Explain the **rivet popper** analogy fully.',
      ],
      n: 'Exam tips. Use Indian examples for the three levels. Write the species–area equation in both forms and know the values of Z. Quote bird numbers for the latitudinal gradient. And explain the rivet popper analogy step by step.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biodiversity and its Conservation — Part 2: Loss and conservation of biodiversity',
  goals: [
    'Name recent extinctions and explain the four major causes of biodiversity loss',
    'Describe in-situ conservation: biosphere reserves, national parks, sanctuaries, sacred groves, hotspots, Ramsar sites and the Red Data Book',
    'Describe ex-situ conservation, and the Earth Summit and World Summit',
  ],
  slides: [
    sl('title', 'Loss and conservation', {
      b: 'Part 2 — why species are disappearing, and how they can be protected.',
      v: flow('LR', [['l', 'Loss of biodiversity'], ['c', 'Causes (evil quartet)'], ['i', 'In-situ conservation'], ['e', 'Ex-situ conservation'], ['t', 'International action']], [['l', 'c'], ['c', 'i'], ['i', 'e'], ['e', 't']], 'Flow from loss of biodiversity to its causes and to in-situ, ex-situ and international conservation'),
      n: 'The colonisation of islands by humans, and the spread of human activity everywhere, has led to the extinction of many species. Understanding why helps us decide how best to protect what remains.',
    }),
    sl('concept', 'Loss of biodiversity', {
      b: `The **IUCN Red List (2004)** documents the extinction of **${RL.total} species** (${RL.vert} vertebrates, ${RL.invert} invertebrates and ${RL.plants} plants) in the last 500 years.`,
      v: table(['Recent extinction', 'Where'], [['Dodo', 'Mauritius'], ['Quagga', 'Africa'], ['Thylacine', 'Australia'], ['Steller’s sea cow', 'Russia'], ['Three subspecies of tiger (Bali, Javan, Caspian)', 'Asia']], 'Table of recent extinctions'),
      n: 'Today, more than fifteen thousand species face the threat of extinction, including about twelve percent of birds, twenty three percent of mammals and thirty two percent of amphibians. Loss of species reduces plant production and lowers resistance to disturbances.',
    }),
    sl('example', 'Worked example 1: reading the Red List', {
      b: `Of the ${RL.total} species documented as extinct in the last 500 years, ${RL.vert} were vertebrates. What percentage is this? Which group contributed the most extinctions?`,
      ul: [
        r`Vertebrates $= \dfrac{${RL.vert}}{${RL.total}} \times 100 = ${VERT_PCT}$ percent.`,
        `Invertebrates (${RL.invert}) contributed the **most**, followed by vertebrates (${RL.vert}) and plants (${RL.plants}).`,
      ],
      v: table(['Group', 'Extinct species', 'Percent'], [['Vertebrates', String(RL.vert), String(VERT_PCT)], ['Invertebrates', String(RL.invert), String(pct(RL.invert, RL.total))], ['Plants', String(RL.plants), String(pct(RL.plants, RL.total))]], `Worked table: ${VERT_PCT} percent vertebrates`),
      n: 'Dividing each group by the total shows that vertebrates account for over forty percent of recorded extinctions, though invertebrates are the largest group. Many invertebrate extinctions are probably never recorded at all.',
    }),
    sl('concept', 'Causes: the evil quartet', {
      b: 'Four major causes drive the loss of biodiversity.',
      v: table(['Cause', 'Example'], [['Habitat loss and fragmentation', 'Tropical rain forests once covered 14 percent of the land, now no more than 6 percent; the Amazon is cleared for soybeans and cattle'], ['Over-exploitation', 'Steller’s sea cow and the passenger pigeon were hunted to extinction; many marine fish are over-harvested'], ['Alien species invasions', 'Nile perch in Lake Victoria caused the extinction of over 200 species of cichlid fish; carrot grass (Parthenium), Lantana and water hyacinth; African catfish threatens native catfishes'], ['Co-extinctions', 'When a host fish dies out, its specific parasites die too; a plant and its specialised pollinator']], 'Table of the four causes of biodiversity loss'),
      n: 'Habitat loss is the most important cause. Large fragments are needed by animals with big territories, and fragmentation also harms migratory animals. Introduced species can spread unchecked and wipe out native ones.',
    }),
    sl('example', 'Worked example 2: shrinking rain forests', {
      b: `Tropical rain forests once covered about ${RF.before} percent of the Earth’s land surface and now cover no more than ${RF.now} percent. What percentage of the original rain forest has been lost?`,
      ul: [
        r`Loss $= \dfrac{${RF.before} - ${RF.now}}{${RF.before}} \times 100 = ${RF_LOSS}$ percent.`,
        'Since species richness rises with area, such losses mean the extinction of very many species.',
      ],
      v: table(['Coverage', 'Percent of land'], [['Original', String(RF.before)], ['Now', String(RF.now)]], `Worked table: ${RF_LOSS} percent of the rain forest lost`),
      n: 'More than half of the original rain forest is gone. Using the species–area relationship, a large loss of area means a large loss of species, especially in the species-rich tropics.',
    }),
    sl('check', 'Quick check: alien species', {
      b: 'What happened after Nile perch were introduced into Lake Victoria?',
      n: 'Quick check. Think of the native cichlid fish.',
      chk: 'nileperch-mcq',
    }),
    sl('concept', 'In-situ conservation: hotspots', {
      b: '**In-situ** (on site) conservation protects species in their **natural habitats**. **Biodiversity hotspots** are regions with **very high species richness** and **high endemism**. There are **34** hotspots; three cover India: **Western Ghats and Sri Lanka, Indo-Burma, and the Himalaya**.',
      v: table(['Point', 'Detail'], [['Area covered', 'Less than 2 percent of the Earth’s land'], ['Species held', 'An extremely high number'], ['Benefit of strict protection', 'Could reduce ongoing mass extinctions by almost 30 percent']], 'Table about biodiversity hotspots'),
      n: 'Protecting a few small regions with very many endemic species gives the greatest benefit for the effort. That is why conservation focuses on hotspots.',
    }),
    sl('diagram', 'Protected areas and biosphere reserves', {
      b: 'India protects ecologically rich areas as **biosphere reserves, national parks and wildlife sanctuaries**. A **biosphere reserve** has a strictly protected **core zone**, a **buffer zone** for limited activities, and a **transition zone** where people live and use resources sustainably.',
      v: V.biosphere,
      n: 'National parks give strict protection to whole ecosystems; sanctuaries protect particular species while allowing some human activity; biosphere reserves protect large areas together with the local people who live there.',
    }),
    sl('concept', 'Sacred groves, Ramsar sites and the Red Data Book', {
      b: 'Other forms of in-situ protection and record-keeping.',
      v: table(['Measure', 'Detail'], [['Sacred groves', 'Forest tracts protected by tradition: Khasi and Jaintia Hills (Meghalaya), Aravalli Hills (Rajasthan), Western Ghats of Karnataka and Maharashtra, Sarguja, Chanda and Bastar areas'], ['Ramsar sites', 'Wetlands of international importance designated under the Ramsar Convention (1971)'], ['Red Data Book', 'Kept by the IUCN; lists threatened species in categories such as extinct, critically endangered, endangered and vulnerable']], 'Table of sacred groves, Ramsar sites and the Red Data Book'),
      n: 'In sacred groves, all the trees and wildlife are venerated and protected, so they shelter many rare species. Ramsar sites protect wetlands, and the Red Data Book tells us which species most need help.',
    }),
    sl('check', 'Quick check: hotspots', {
      b: 'Which region is one of the biodiversity hotspots covering India?',
      n: 'Quick check. Think of a mountain range along India’s west coast.',
      chk: 'hotspot-mcq',
    }),
    sl('concept', 'Ex-situ conservation', {
      b: '**Ex-situ** (off site) conservation protects threatened species **outside their natural habitat**.',
      v: table(['Method', 'What it does'], [['Zoological parks, botanical gardens, wildlife safari parks', 'Keep and breed threatened animals and plants'], ['Captive breeding', 'Breeds endangered animals for release into the wild'], ['Cryopreservation', 'Stores gametes and embryos in liquid nitrogen at −196 °C for long periods'], ['In vitro fertilisation and tissue culture', 'Produce offspring or plants from few individuals'], ['Seed banks', 'Keep seeds of commercially important plants viable for long periods']], 'Table of methods of ex-situ conservation'),
      n: 'When a species is on the brink, its last individuals can be bred in captivity, and its gametes or seeds can be frozen for the future. Ex-situ methods are a back-up to protecting habitats, not a replacement.',
    }),
    sl('concept', 'International efforts', {
      b: 'Biodiversity knows no political boundaries, so conservation needs international action.',
      v: table(['Meeting', 'Place and year', 'Outcome'], [['Earth Summit', 'Rio de Janeiro, 1992', 'Convention on Biological Diversity: conservation of biodiversity and sustainable use of its benefits'], ['World Summit on Sustainable Development', 'Johannesburg, South Africa, 2002', '190 countries pledged to achieve by 2010 a significant reduction in the current rate of biodiversity loss at global, regional and local levels']], 'Table of the Earth Summit and the World Summit'),
      n: 'At the Earth Summit, nations agreed to take measures for conserving biodiversity and using it sustainably. Ten years later, at the World Summit, they pledged to slow the rate of biodiversity loss.',
    }),
    sl('check', 'Quick check: cryopreservation', {
      b: 'Judge the assertion and the reason about cryopreservation.',
      n: 'Quick check. At what temperature are gametes stored?',
      chk: 'cryo-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Extinctions: dodo, quagga, thylacine, Steller’s sea cow, three tiger subspecies; 784 in 500 years (IUCN 2004).',
        'Evil quartet: habitat loss and fragmentation, over-exploitation, alien invasions (Nile perch, Parthenium, Lantana, water hyacinth, African catfish), co-extinctions.',
        'In-situ: hotspots (34; three in India), biosphere reserves, national parks, sanctuaries, sacred groves, Ramsar sites; Red Data Book.',
        'Ex-situ: zoos, botanical gardens, safari parks, captive breeding, cryopreservation, seed banks, tissue culture.',
        'Earth Summit (Rio, 1992) and World Summit (Johannesburg, 2002).',
      ],
      v: table(['Approach', 'Examples'], [['In-situ', 'Biosphere reserves, sacred groves'], ['Ex-situ', 'Seed banks, cryopreservation']], 'Summary table of in-situ and ex-situ conservation'),
      n: 'To recap: species are being lost through habitat loss, over-exploitation, invasions and co-extinctions. We protect them in their natural homes, in zoos and seed banks, and through international agreements.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name the **evil quartet** with **one example** each.',
        'Distinguish **in-situ and ex-situ** with examples.',
        'Name **India’s three hotspots** and give the **Rio and Johannesburg** summits with years.',
        'List **recent extinctions** with their locations.',
      ],
      n: 'Exam tips. Learn the four causes with examples. Compare in-situ and ex-situ conservation. Remember India’s hotspots and the two summits with their places and years. And name the recent extinctions.',
    }),
  ],
});
