// ch13 Biodiversity and Conservation — three decks: Part 1 (t01), Part 2 (t02), Part 3 (t03).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { SPECIESAREA, LATITUDE, SHARES } from './svgs.mjs';
import { round, zFrom, areaFactor, pct, BIRDS, INDIA } from './calc.mjs';

export const V = {
  speciesarea: svgV(SPECIESAREA, 'Species–area curve on ordinary axes and straight lines on log–log axes with slopes Z for regions and continents'),
  latitude: svgV(LATITUDE, 'Bar chart of bird species falling from Colombia and India to New York and Greenland'),
  shares: svgV(SHARES, 'Bars showing animals over 70 percent and plants at most 22 percent of species, and insects over 70 percent of animals'),
};

// ---------------------------------------------------------------- computed numbers
const IND = { ratio: round(INDIA.species / INDIA.land, 1) };
const SA = { A1: 10, S1: 40, A2: 1000, S2: 80 };
SA.z = round(zFrom([SA.A1, SA.S1], [SA.A2, SA.S2]), 2);
const AREA10 = round(areaFactor(10, 0.15), 2);
const LOST = { before: 14, now: 6 };
LOST.pctLost = round(((LOST.before - LOST.now) / LOST.before) * 100, 1);
const COL_GR = round(BIRDS[0].n / BIRDS[3].n, 0);

export const deck1 = deck({
  part: 1,
  title: 'Biodiversity and Conservation — Part 1: Biodiversity, its patterns and importance',
  goals: [
    'Describe genetic, species and ecological diversity with examples',
    'Estimate global and Indian species numbers',
    'Explain latitudinal gradients and the species–area relationship',
    'Explain why species diversity matters to ecosystems',
  ],
  slides: [
    sl('title', 'Biodiversity and Conservation', {
      b: 'Part 1 — the variety of life, how it is distributed, and why it matters.',
      v: flow('LR', [['g', 'Genetic diversity'], ['s', 'Species diversity'], ['e', 'Ecological diversity']], [['g', 's'], ['s', 'e']], 'Flow of three levels of biodiversity'),
      n: 'Biodiversity is the term popularised by the sociobiologist Edward Wilson to describe the combined diversity at all levels of biological organisation. The most important levels are genetic diversity, species diversity and ecological diversity.',
    }),
    sl('concept', 'Three levels of diversity', {
      b: 'Diversity exists within species, among species and among ecosystems.',
      v: table(['Level', 'Example'], [['Genetic diversity', 'Rauwolfia vomitoria in different Himalayan ranges varies in the potency and concentration of reserpine; India has more than 50,000 strains of rice and 1,000 varieties of mango'], ['Species diversity', 'The Western Ghats have a greater diversity of amphibian species than the Eastern Ghats'], ['Ecological diversity', 'India’s deserts, rain forests, mangroves, coral reefs, wetlands, estuaries and alpine meadows give greater ecosystem diversity than a Scandinavian country such as Norway']], 'Table of the three levels of biodiversity with Indian examples'),
      n: 'A single medicinal plant can differ in its active chemical from one mountain range to another; that is genetic diversity. Different regions hold different numbers of species. And a country with deserts, forests, mangroves and reefs has far more ecological diversity than one with only a few kinds of ecosystem.',
    }),
    sl('diagram', 'How many species?', {
      b: 'The IUCN (2004) put the number of described plant and animal species at slightly **more than 1.5 million**. **Robert May** estimated the global total at about **7 million**. More than **70 percent** of recorded species are **animals**; plants make up no more than **22 percent**. Among animals, **insects** are the most species-rich group.',
      v: V.shares,
      n: 'We know only a fraction of the species on Earth, especially among insects and microbes. Out of every ten animals, seven are insects. The number of fungal species alone is more than the combined total of fishes, amphibians, reptiles and mammals.',
    }),
    sl('example', 'Worked example 1: India’s share', {
      b: `India has only ${INDIA.land} percent of the world’s land area but ${INDIA.species} percent of global species diversity. How many times its land share is its share of species?`,
      ul: [
        r`Ratio $= \dfrac{${INDIA.species}}{${INDIA.land}} \approx ${IND.ratio}$.`,
        'India is one of the **12 mega diversity countries** of the world; nearly **45,000 plant species** and twice as many animal species have been recorded.',
        'Applying May’s estimates, more than 1,00,000 plant and 3,00,000 animal species may still await discovery in India.',
      ],
      v: table(['Measure', 'India (percent of world)'], [['Land area', String(INDIA.land)], ['Species diversity', String(INDIA.species)], ['Ratio', String(IND.ratio)]], `Worked table: India’s species share is about ${IND.ratio} times its land share`),
      n: 'Divide eight point one by two point four to get about three point four. India holds more than three times as large a share of the world’s species as of its land, which is why it is counted among the mega diversity countries.',
    }),
    sl('check', 'Quick check: levels', {
      b: 'Variation in reserpine content of Rauwolfia vomitoria in different Himalayan ranges is an example of which level of diversity?',
      n: 'Quick check. Is this variation within one species or among species?',
      chk: 'rauwolfia-mcq',
    }),
    sl('diagram', 'Latitudinal gradients', {
      b: 'Diversity generally **decreases from the equator towards the poles**. The tropics (23.5° N to 23.5° S) harbour more species than temperate or polar areas.',
      v: V.latitude,
      n: 'Colombia, near the equator, has about fourteen hundred species of birds, while Greenland, far to the north, has only fifty-six. A tropical forest in Ecuador can have up to ten times as many species of vascular plants as a temperate forest of the same area. The Amazon rain forest has the greatest biodiversity on Earth.',
    }),
    sl('concept', 'Why are the tropics so rich?', {
      b: 'Ecologists and evolutionary biologists have proposed several hypotheses.',
      v: table(['Hypothesis', 'Explanation'], [['Time for speciation', 'Temperate regions were subjected to frequent glaciations; tropical latitudes remained relatively undisturbed for millions of years, giving a long evolutionary time for diversification'], ['Constant environment', 'Tropical environments are less seasonal, more constant and predictable, promoting niche specialisation'], ['More solar energy', 'More solar energy in the tropics contributes to higher productivity, which might contribute indirectly to greater diversity']], 'Table of three explanations of greater tropical diversity'),
      n: 'Speciation takes time, and the tropics have had a long undisturbed history. Their steady, predictable climate allows species to specialise in narrow niches. And abundant sunlight drives high productivity, which can support more kinds of organisms.',
    }),
    sl('diagram', 'Species–area relationship', {
      b: '**Alexander von Humboldt** observed that within a region, species richness **increases with explored area, but only up to a limit**. On a logarithmic scale the relationship is a **straight line**.',
      v: V.speciesarea,
      m: [r`\log S = \log C + Z \log A`],
      n: 'S is species richness, A is area, C is the Y-intercept and Z is the slope, also called the regression coefficient. For most regions and groups Z lies between about zero point one and zero point two. For very large areas such as whole continents the slope is much steeper, about zero point six to one point two.',
    }),
    sl('example', 'Worked example 2: finding Z', {
      b: `A survey finds ${SA.S1} plant species in ${SA.A1} square kilometres and ${SA.S2} species in ${SA.A2} square kilometres of the same region. Estimate Z. By what factor would species rise if the area grew tenfold with Z = 0.15?`,
      ul: [
        r`$Z = \dfrac{\log ${SA.S2} - \log ${SA.S1}}{\log ${SA.A2} - \log ${SA.A1}} = \dfrac{\log 2}{2} \approx ${SA.z}$.`,
        r`Tenfold area: species rise by $10^{0.15} \approx ${AREA10}$ times.`,
        'Both values are typical of a region, not a continent.',
      ],
      v: table(['Area (square km)', 'Species'], [[String(SA.A1), String(SA.S1)], [String(SA.A2), String(SA.S2)], ['Z (computed)', String(SA.z)]], `Worked table: Z about ${SA.z}`),
      n: 'A hundredfold increase in area only doubled the species, so the slope on log axes is small, about zero point one five. With such a slope, ten times the area gives only about one point four times as many species.',
    }),
    sl('concept', 'Why does species diversity matter?', {
      b: 'A **stable** community should not show too much variation in productivity from year to year, must be resistant or resilient to occasional disturbances, and must resist invasions by alien species.',
      v: table(['Evidence or idea', 'What it shows'], [['David Tilman’s long-term outdoor plots', 'Plots with more species showed less year-to-year variation in total biomass, and higher diversity raised productivity'], ['Paul Ehrlich’s rivet popper hypothesis', 'An ecosystem is like an aeroplane held by rivets (species); losing a few may not matter at first, but losing key rivets, or many, endangers the whole']], 'Table of evidence and ideas on why species diversity matters'),
      n: 'Removing rivets from the seats may not matter, but removing rivets from the wings, the key species that drive major ecosystem functions, is serious. Rich biodiversity is essential for ecosystem health and for the survival of the human race.',
    }),
    sl('check', 'Quick check: latitude', {
      b: 'Judge the assertion and the reason about tropical diversity.',
      n: 'Quick check. Were the tropics disturbed by glaciations?',
      chk: 'tropics-ar',
    }),
    sl('check', 'Quick check: Z', {
      b: 'What is the usual range of Z for species–area relationships within a region?',
      n: 'Quick check. Regions have a shallow slope.',
      chk: 'z-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Levels: genetic (Rauwolfia, rice, mango), species (Western Ghats amphibians), ecological (India vs Norway).',
        'Over 1.5 million species described; May’s estimate about 7 million; animals over 70 percent, insects over 70 percent of animals.',
        `India: ${INDIA.land} percent of land, ${INDIA.species} percent of species; one of 12 mega diversity countries.`,
        'Diversity decreases from equator to poles: time, stable climate, more solar energy.',
        'Species–area: log S = log C + Z log A; Z 0.1–0.2 (regions), 0.6–1.2 (continents).',
        'Diversity brings stability and productivity (Tilman); rivet popper hypothesis (Ehrlich).',
      ],
      v: table(['Pattern', 'Rule'], [['Latitude', 'More species near the equator'], ['Area', 'More species in larger areas, up to a limit']], 'Summary table of two patterns of biodiversity'),
      n: 'To recap: biodiversity exists at genetic, species and ecological levels. It is richest in the tropics and rises with area. And diverse communities are more stable and productive, as Tilman’s experiments showed.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **one Indian example** for each level of diversity.',
        'Write the **species–area equation** and the **Z ranges**.',
        'Give **three reasons** for tropical richness.',
        'Explain the **rivet popper hypothesis** in your own words.',
      ],
      n: 'Exam tips. Give an Indian example for each level of diversity. Write the species–area equation and the ranges of Z. Learn three reasons for tropical richness. And explain the rivet popper idea simply.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biodiversity and Conservation — Part 2: Loss of biodiversity',
  goals: [
    'Describe the scale of recent extinctions',
    'Explain the effects of biodiversity loss',
    'Explain the four major causes ("evil quartet") with examples',
  ],
  slides: [
    sl('title', 'Loss of biodiversity', {
      b: 'Part 2 — species are disappearing far faster than in pre-human times, mainly because of human activities.',
      v: flow('LR', [['h', 'Human activities'], ['c', 'Four major causes'], ['l', 'Loss of species'], ['e', 'Weaker ecosystems']], [['h', 'c'], ['c', 'l'], ['l', 'e']], 'Flow from human activities through four causes to species loss and weaker ecosystems'),
      n: 'The colonisation of tropical Pacific islands by humans is said to have led to the extinction of more than two thousand species of native birds. The IUCN Red List of two thousand and four documents the extinction of seven hundred and eighty-four species in the last five hundred years.',
    }),
    sl('concept', 'Recent extinctions', {
      b: 'The IUCN Red List (2004) documents **784 extinctions** in the last 500 years: **338 vertebrates, 359 invertebrates and 87 plants**. In the last twenty years alone, **27 species** have disappeared.',
      v: table(['Extinct species', 'Where'], [['Dodo', 'Mauritius'], ['Quagga', 'Africa'], ['Thylacine', 'Australia'], ['Steller’s sea cow', 'Russia'], ['Three subspecies of tiger (Bali, Javan, Caspian)', 'Asia']], 'Table of recent extinctions with places'),
      n: 'Careful analysis shows that the extinctions are not random; some groups, like amphibians, appear more vulnerable. More than fifteen thousand five hundred species worldwide face the threat of extinction.',
    }),
    sl('concept', 'The sixth extinction', {
      b: 'Earth has seen five episodes of mass extinction since life originated. The **sixth extinction**, now in progress, differs: current species extinction rates are estimated to be **100 to 1,000 times faster** than in pre-human times, and **human activities** are responsible.',
      v: table(['Group', 'Share facing threat of extinction (percent)'], [['Birds', '12'], ['Mammals', '23'], ['Amphibians', '32'], ['Gymnosperms', '31']], 'Table of the share of species in four groups that face the threat of extinction'),
      n: 'Ecologists warn that if the present trends continue, nearly half of all species on Earth might be wiped out within the next hundred years. Amphibians are among the hardest hit.',
    }),
    sl('example', 'Worked example 1: reading extinction data', {
      b: 'Of the 784 documented extinctions, 338 were vertebrates, 359 invertebrates and 87 plants. What percentage were plants, and which group lost most species?',
      ul: [
        r`Check total: $338 + 359 + 87 = ${338 + 359 + 87}$.`,
        r`Plants $= \dfrac{87}{784} \times 100 \approx ${pct(87, 784)}$ percent.`,
        'Invertebrates lost the most species (359).',
      ],
      v: table(['Group', 'Extinctions', 'Percent'], [['Vertebrates', '338', String(pct(338, 784))], ['Invertebrates', '359', String(pct(359, 784))], ['Plants', '87', String(pct(87, 784))]], `Worked table: plants ${pct(87, 784)} percent of extinctions`),
      n: 'First confirm the three groups add to seven hundred and eighty-four. Plants are about eleven percent of the documented extinctions, and invertebrates form the largest group, though many invertebrate extinctions probably go unrecorded.',
    }),
    sl('concept', 'Effects of biodiversity loss', {
      b: 'Loss of biodiversity in a region may lead to:',
      v: table(['Effect', 'Meaning'], [['Decline in plant production', 'Less biomass made'], ['Lowered resistance to perturbations', 'For example, less able to withstand drought'], ['Increased variability in ecosystem processes', 'Plant productivity, water use, and pest and disease cycles fluctuate more']], 'Table of three effects of biodiversity loss'),
      n: 'Fewer species means a less productive and less stable ecosystem. It copes less well with drought, and processes such as water use and pest outbreaks become more unpredictable.',
    }),
    sl('check', 'Quick check: rate of extinction', {
      b: 'How much faster are current extinction rates estimated to be than in pre-human times?',
      n: 'Quick check. Recall the range given for the sixth extinction.',
      chk: 'rate-mcq',
    }),
    sl('concept', 'The evil quartet: habitat loss and over-exploitation', {
      b: '**Habitat loss and fragmentation** is the most important cause. **Over-exploitation** has driven several species to extinction.',
      v: table(['Cause', 'Examples'], [['Habitat loss', 'Tropical rain forests once covered more than 14 percent of Earth’s land surface, now no more than 6 percent; the Amazon, the “lungs of the planet”, is cleared for soya beans and cattle pasture'], ['Fragmentation', 'Mammals and birds needing large territories, and migratory animals, are badly affected'], ['Over-exploitation', 'Steller’s sea cow and the passenger pigeon became extinct; many marine fish populations are over-harvested']], 'Table of habitat loss, fragmentation and over-exploitation with examples'),
      n: 'When large habitats are broken into small fragments, animals that need large territories or migrate decline. And when need turns to greed, harvesting outpaces reproduction, as it did for Steller’s sea cow and the passenger pigeon.',
    }),
    sl('check', 'Quick check: fragmentation', {
      b: 'Which animals suffer most when a large forest is split into small patches?',
      n: 'Quick check. Think of animals that need a lot of space or travel far.',
      chk: 'fragment-mcq',
    }),
    sl('example', 'Worked example 2: shrinking rain forests', {
      b: `Tropical rain forests once covered more than ${LOST.before} percent of the Earth’s land surface but now cover no more than ${LOST.now} percent. What fraction of the original rain-forest area has been lost?`,
      ul: [
        r`Lost $= \dfrac{${LOST.before} - ${LOST.now}}{${LOST.before}} \times 100 \approx ${LOST.pctLost}$ percent.`,
        'More than half of the original rain-forest cover has gone.',
        'Habitat loss is the most important cause of extinctions of plants and animals.',
      ],
      v: table(['Time', 'Percent of land surface'], [['Earlier', String(LOST.before)], ['Now', String(LOST.now)], ['Loss of original area', `${LOST.pctLost} percent`]], `Worked table: about ${LOST.pctLost} percent of rain forest lost`),
      n: 'A fall from fourteen to six percent of the land surface means eight out of fourteen parts are gone, about fifty-seven percent of the original forest. Since rain forests hold so many species, this loss is especially serious.',
    }),
    sl('concept', 'The evil quartet: alien invasions and co-extinctions', {
      b: '**Alien species invasions:** some introduced species become invasive and cause decline or extinction of indigenous species. **Co-extinctions:** when a species becomes extinct, species associated with it in an obligatory way also become extinct.',
      v: table(['Cause', 'Examples'], [['Alien species', 'Nile perch in Lake Victoria (East Africa) led to the extinction of more than 200 species of cichlid fish; carrot grass (Parthenium), Lantana and water hyacinth (Eichhornia); illegally introduced African catfish Clarias gariepinus threatens native catfishes'], ['Co-extinction', 'When a host fish becomes extinct, its unique assemblage of parasites also becomes extinct; a plant and its pollinator in a co-evolved mutualism']], 'Table of alien species invasions and co-extinctions with examples'),
      n: 'An alien predator or competitor, free of its natural enemies, can wipe out native species, as the Nile perch did to cichlid fishes. And because many species depend on each other, the loss of one, such as a host or a pollinator, can drag others down with it.',
    }),
    sl('check', 'Quick check: alien species', {
      b: 'Judge the assertion and the reason about the Nile perch.',
      n: 'Quick check. Was the perch native to Lake Victoria?',
      chk: 'perch-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'IUCN (2004): 784 extinctions in 500 years (338 vertebrates, 359 invertebrates, 87 plants); dodo, quagga, thylacine, Steller’s sea cow, three tiger subspecies.',
        'Sixth extinction: 100–1,000 times faster than pre-human rates; caused by humans.',
        'Threatened: 12 percent birds, 23 percent mammals, 32 percent amphibians, 31 percent gymnosperms.',
        'Effects: lower production, lower resistance to drought, more variable processes.',
        'Evil quartet: habitat loss and fragmentation, over-exploitation, alien species invasions, co-extinctions.',
      ],
      v: table(['Cause', 'Key example'], [['Habitat loss', 'Amazon clearing'], ['Over-exploitation', 'Steller’s sea cow'], ['Alien species', 'Nile perch'], ['Co-extinction', 'Host fish and its parasites']], 'Summary table of the evil quartet with examples'),
      n: 'To recap: extinctions are now running far faster than ever before, and people are the cause. The four main drivers are habitat loss, over-exploitation, alien species and co-extinctions.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name the **evil quartet** with one **example** each.',
        'Explain **why fragmentation** harms large and migratory animals.',
        'Give **three effects** of biodiversity loss.',
        'Know a few **recent extinctions** with their places.',
      ],
      n: 'Exam tips. Name the four causes with an example each. Explain fragmentation. Give three effects of biodiversity loss. And remember a few recent extinctions with where they happened.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Biodiversity and Conservation — Part 3: Conservation',
  goals: [
    'Give the narrowly utilitarian, broadly utilitarian and ethical reasons for conservation',
    'Compare in situ and ex situ conservation with examples',
    'Explain hotspots, protected areas, sacred groves, Ramsar sites and the Red Data Book',
  ],
  slides: [
    sl('title', 'Biodiversity conservation', {
      b: 'Part 3 — why we should conserve biodiversity, and how.',
      v: flow('LR', [['w', 'Why conserve?'], ['i', 'In situ: on site'], ['x', 'Ex situ: off site'], ['g', 'Global agreements']], [['w', 'i'], ['w', 'x'], ['i', 'g'], ['x', 'g']], 'Flow from reasons for conservation to in situ, ex situ and global action'),
      n: 'The reasons for conserving biodiversity can be grouped into three categories: narrowly utilitarian, broadly utilitarian and ethical. Conservation itself can happen in the species’ natural home or away from it.',
    }),
    sl('concept', 'Why conserve biodiversity?', {
      b: 'Three kinds of argument.',
      v: table(['Argument', 'Examples'], [['Narrowly utilitarian', 'Food, firewood, fibre, construction material, tannins, lubricants, dyes, resins, perfumes; more than 25 percent of drugs sold today come from plants; 25,000 plant species are used in traditional medicine; bioprospecting for useful products'], ['Broadly utilitarian', 'Ecosystem services: the Amazon forest produces about 20 percent of the oxygen in Earth’s atmosphere through photosynthesis; pollination by bees, bumblebees, birds and bats; aesthetic pleasure'], ['Ethical', 'Every species has an intrinsic value, even if not of economic value; we have a moral duty to pass our biological legacy to future generations']], 'Table of three arguments for conserving biodiversity'),
      n: 'Nature gives us food, medicines and raw materials directly. It also provides services we could hardly pay for, such as oxygen and pollination. And beyond usefulness, every species has a right to exist and a value of its own.',
    }),
    sl('check', 'Quick check: arguments', {
      b: 'Pollination of crops by bees is an example of which argument for conservation?',
      n: 'Quick check. Is this a direct product or a service?',
      chk: 'pollination-mcq',
    }),
    sl('concept', 'In situ conservation: hotspots', {
      b: 'When we conserve and protect a whole ecosystem, its biodiversity at all levels is protected. **Biodiversity hotspots** are regions with **very high species richness** and a **high degree of endemism** (species found nowhere else).',
      v: table(['Fact', 'Detail'], [['Number of hotspots', 'Initially 25; 9 more added, now 34'], ['Hotspots covering India', 'Western Ghats and Sri Lanka; Indo-Burma; Himalaya'], ['Area', 'Together less than 2 percent of Earth’s land area'], ['Benefit', 'Strict protection could reduce ongoing mass extinctions by almost 30 percent']], 'Table of facts about biodiversity hotspots'),
      n: 'Conservationists cannot protect everything at once, so they focus on hotspots, small areas packed with species that live nowhere else. Three of the world’s thirty-four hotspots cover India’s exceptionally rich regions.',
    }),
    sl('concept', 'Protected areas and sacred groves', {
      b: 'In India, ecologically unique and biodiversity-rich regions are legally protected as **biosphere reserves**, **national parks** and **wildlife sanctuaries**. India also has a history of **religious and cultural traditions** that protect nature.',
      v: table(['Sacred groves', 'Region'], [['Khasi and Jaintia Hills', 'Meghalaya'], ['Aravalli Hills', 'Rajasthan'], ['Western Ghat regions', 'Karnataka and Maharashtra'], ['Sarguja, Chanda and Bastar areas', 'Madhya Pradesh']], 'Table of sacred grove regions in India'),
      n: 'In many cultures, tracts of forest were set aside and all trees and wildlife within them were venerated and given total protection. In Meghalaya, sacred groves are the last refuges for a large number of rare and threatened plants.',
    }),
    sl('concept', 'Ramsar sites and the Red Data Book', {
      b: '**Ramsar sites** are wetlands of international importance listed under the **Ramsar Convention** (signed at Ramsar, Iran, in 1971) for conservation and wise use. The **Red Data Book**, or Red List, maintained by the **IUCN**, documents species threatened with extinction.',
      v: table(['Tool', 'Purpose'], [['Ramsar site', 'Protects an internationally important wetland and its biodiversity'], ['Red Data Book (IUCN Red List)', 'Records the conservation status of species, such as critically endangered, endangered and vulnerable'], ['Protected areas', 'Biosphere reserves, national parks and sanctuaries conserve habitats in situ']], 'Table of conservation tools and their purposes'),
      n: 'Wetlands are among the most productive and threatened habitats, so the Ramsar Convention lists important ones for protection. The Red Data Book tells us which species are most at risk, so that conservation efforts can be directed where they are most needed.',
    }),
    sl('example', 'Worked example 1: in situ or ex situ?', {
      b: 'Classify each conservation action and give a reason.',
      ul: [
        'Declaring a forest as a national park to protect tigers → **in situ**: protected in its natural habitat.',
        'Storing seeds of rice varieties in a seed bank → **ex situ**: kept away from the natural habitat.',
        'Protecting a sacred grove in Meghalaya → **in situ**.',
        'Breeding an endangered deer in a zoo and keeping its gametes in cryopreservation → **ex situ**.',
      ],
      v: table(['Action', 'Type'], [['National park', 'In situ'], ['Seed bank', 'Ex situ'], ['Sacred grove', 'In situ'], ['Zoo breeding, cryopreservation', 'Ex situ']], 'Worked table classifying four actions as in situ or ex situ'),
      n: 'Ask one question: is the organism protected where it naturally lives? If yes, it is in situ conservation. If it is taken out and kept in a zoo, garden, seed bank or frozen store, it is ex situ.',
    }),
    sl('check', 'Quick check: hotspots', {
      b: 'Judge the assertion and the reason about biodiversity hotspots.',
      n: 'Quick check. What two features define a hotspot?',
      chk: 'hotspot-ar',
    }),
    sl('concept', 'Ex situ conservation', {
      b: 'Threatened animals and plants are taken out of their natural habitat and placed in special settings where they can be protected and given special care.',
      v: table(['Method', 'Use'], [['Zoological parks, botanical gardens, wildlife safari parks', 'Protect and breed threatened species; some animals extinct in the wild survive only in zoos'], ['Cryopreservation', 'Gametes of threatened species kept viable and fertile for long periods'], ['In vitro fertilisation', 'Eggs fertilised outside the body'], ['Tissue culture', 'Plants propagated'], ['Seed banks', 'Seeds of commercially important plants stored for long periods']], 'Table of ex situ conservation methods and uses'),
      n: 'Ex situ methods are a safety net. When a species has almost vanished from the wild, zoos and seed banks can keep it alive. Modern techniques let us freeze gametes, fertilise eggs in the laboratory and multiply plants from small pieces of tissue.',
    }),
    sl('example', 'Worked example 2: planning conservation', {
      b: 'A rare orchid grows only in one sacred grove and is pollinated by a single bee species. Suggest a conservation plan that uses both approaches.',
      ul: [
        '**In situ:** protect the whole grove, so that the orchid **and its pollinator** survive together (avoiding co-extinction).',
        '**Ex situ:** store seeds in a **seed bank** and grow plants by **tissue culture** in a botanical garden as a backup.',
        'Check its status in the **Red Data Book** and record it, so it gets priority.',
      ],
      v: flow('LR', [['g', 'Protect the grove (in situ)'], ['p', 'Orchid and pollinator survive'], ['s', 'Seed bank and tissue culture (ex situ)'], ['b', 'Backup population']], [['g', 'p'], ['s', 'b']], 'Worked flow of an in situ and ex situ plan for a rare orchid'),
      n: 'In situ protection keeps the orchid in its habitat together with the bee it depends on, so neither is lost. Ex situ seed banks and tissue culture provide a backup in case the wild population fails.',
    }),
    sl('concept', 'Global commitments', {
      b: 'Biodiversity knows no political boundaries, so conservation is a collective responsibility of all nations.',
      v: table(['Meeting', 'Outcome'], [['Earth Summit, Rio de Janeiro, 1992', 'All nations called on to take measures for conservation of biodiversity and sustainable use of its benefits'], ['World Summit on Sustainable Development, Johannesburg, 2002', '190 countries pledged to achieve, by 2010, a significant reduction in the current rate of biodiversity loss']], 'Table of two international meetings on biodiversity'),
      n: 'The historic convention on biological diversity at the Earth Summit in Rio de Janeiro called on all nations to conserve biodiversity. Ten years later, at Johannesburg, one hundred and ninety countries pledged to slow the rate of biodiversity loss.',
    }),
    sl('check', 'Quick check: ex situ', {
      b: 'Which of these is an ex situ method of conservation?',
      n: 'Quick check. Which method keeps material away from the natural habitat?',
      chk: 'exsitu-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Reasons: narrowly utilitarian (products, drugs, bioprospecting), broadly utilitarian (oxygen, pollination, aesthetics), ethical (intrinsic value).',
        'In situ: hotspots (34; three cover India; under 2 percent of land), biosphere reserves, national parks, sanctuaries, sacred groves, Ramsar wetlands.',
        'Red Data Book (IUCN) records threatened species.',
        'Ex situ: zoos, botanical gardens, safari parks, cryopreservation, in vitro fertilisation, tissue culture, seed banks.',
        'Rio (1992) and Johannesburg (2002) summits.',
      ],
      v: table(['Approach', 'Examples'], [['In situ', 'Hotspot, national park, sacred grove'], ['Ex situ', 'Zoo, seed bank, cryopreservation']], 'Summary table of in situ and ex situ approaches'),
      n: 'To recap: we conserve biodiversity for its products, its services and its own sake. In situ conservation protects whole habitats, while ex situ methods keep threatened species safe elsewhere. And nations have pledged to work together.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **one example for each argument** for conservation.',
        'Define **hotspot** using both **richness and endemism**; name India’s three.',
        'Classify methods as **in situ** or **ex situ** correctly.',
        'Name **sacred grove** regions and the purpose of **Ramsar sites** and the **Red Data Book**.',
      ],
      n: 'Exam tips. Give an example for each reason to conserve. Define a hotspot with both features and name India’s three. Sort methods into in situ and ex situ. And know sacred groves, Ramsar sites and the Red Data Book.',
    }),
  ],
});
export { COL_GR };
