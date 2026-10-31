// ISC 12 Biology ch18 Biodiversity and its Conservation — question bank in ISC style.
// Species–area values, Z, percentages and ratios are computed by calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { speciesFor, zFrom, areaFactor, pct, round, INDIA } from './calc.mjs';
import { LATITUDE, SPECIESAREA } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const latFig = svgV(LATITUDE, 'Bird species falling from the equator towards the poles');
const saFig = svgV(SPECIESAREA, 'Species–area curve and its straight-line log–log form');

// ---------------------------------------------------------------- t01 levels and extent of biodiversity
add('genetic-mcq', mcq({
  stem: 'Samples of Rauwolfia vomitoria collected from different Himalayan ranges differ in the strength of their reserpine. This illustrates',
  right: 'genetic diversity',
  wrong: ['species diversity', 'ecological diversity', 'the latitudinal gradient'],
  sol: 'Variation within one species is genetic diversity — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('species-mcq', mcq({
  stem: 'A survey records more kinds of frogs and toads in the Western Ghats than in the Eastern Ghats. This difference is an example of',
  right: 'species diversity',
  wrong: ['genetic diversity', 'ecosystem diversity', 'co-extinction'],
  sol: 'Different numbers of amphibian species reflect species diversity — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ecological-mcq', mcq({
  stem: 'India has deserts, rain forests, mangroves, coral reefs, wetlands and alpine meadows, whereas Norway has far fewer kinds. This compares their',
  right: 'ecological (ecosystem) diversity',
  wrong: ['genetic diversity', 'species–area relationship', 'standing crop'],
  sol: 'Variety of ecosystems is ecological diversity — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('described-mcq', mcq({
  stem: 'According to the IUCN (2004), roughly how many species of plants and animals have been described?',
  right: 'Slightly more than 1.5 million',
  wrong: ['About 7 million', 'About 50 000', 'About 15 000'],
  sol: '1.5 million are described; about 7 million is Robert May’s estimate of the total — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('insect-mcq', mcq({
  stem: 'If you picked ten animal species at random from the list of all described animals, about how many would you expect to be insects?',
  right: 'Seven',
  wrong: ['One', 'Three', 'Ten'],
  sol: 'Insects make up more than 70 percent of described animal species — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
{
  const ratio = round(INDIA.species / INDIA.land, 1);
  add('india-num', num({
    stem: `India has ${INDIA.land} percent of the world’s land area but ${INDIA.species} percent of its recorded species. How many times its “fair share” by area does India hold? (One decimal place.)`,
    value: ratio, tol: 0.05,
    sol: r`$\dfrac{${INDIA.species}}{${INDIA.land}} = ${ratio}$.`,
    scheme: [[`${ratio}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 3.4 || 'value');
}
add('mega-fill', fill({
  stem: 'India is one of the ______ mega-diversity countries of the world.',
  acc: [['12', 'twelve']],
  sol: '12.',
  d: 1, c: 'recall', t: [1],
}));
add('levels-short', short({
  marks: 2,
  stem: 'Name the three levels of biodiversity and give one Indian example of each.',
  model: '**Genetic diversity** — over **50 000 strains of rice** (or reserpine variation in *Rauwolfia vomitoria*). **Species diversity** — more **amphibian species** in the **Western Ghats** than the Eastern Ghats. **Ecological diversity** — India’s **deserts, rain forests, mangroves, coral reefs and alpine meadows**.',
  sol: 'Three levels.',
  scheme: [['Two levels with examples', 1], ['Third level with example', 1]],
  d: 1, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 patterns and importance
add('tropics-mcq', mcq({
  stem: 'Which is a proposed reason for the very high species diversity of tropical regions?',
  right: 'They have remained relatively undisturbed for millions of years, allowing long evolutionary time for speciation.',
  wrong: ['They receive less solar energy than temperate regions.', 'They have very seasonal, unpredictable climates.', 'They were repeatedly covered by ice sheets.'],
  sol: 'Long undisturbed time, stable climate and more energy are the proposed reasons — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('colombia-mcq', mcq({
  stem: 'Colombia (near the equator) has about 1400 bird species, New York (41° N) about 105 and Greenland (71° N) about 56. These data illustrate',
  right: 'the latitudinal gradient in species diversity',
  wrong: ['the species–area relationship', 'the rivet popper hypothesis', 'co-extinction'],
  sol: 'Diversity falls from the equator towards the poles — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [latFig],
}));
add('humboldt-mcq', mcq({
  stem: 'Who first observed that within a region, species richness increases with the area explored, but only up to a limit?',
  right: 'Alexander von Humboldt',
  wrong: ['Paul Ehrlich', 'David Tilman', 'Robert May'],
  sol: 'The species–area relationship is Humboldt’s — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('z-mcq', mcq({
  stem: 'For the species–area relationship within a region, the value of Z usually lies between',
  right: '0.1 and 0.2',
  wrong: ['0.6 and 1.2', '1 and 10', '0.001 and 0.01'],
  sol: 'Z is typically 0.1–0.2; it rises to 0.6–1.2 for whole continents — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('continent-mcq', mcq({
  stem: 'When frugivorous birds and mammals in the tropical forests of different continents are compared, the slope Z of the species–area line is about 1.15. Why is it so much steeper than usual?',
  right: 'Very large areas such as whole continents are being compared.',
  wrong: ['Birds and mammals are not counted correctly.', 'Tropical forests have fewer species than deserts.', 'Z is always above 1 for animals.'],
  sol: 'Z of 0.6–1.2 applies to very large areas such as entire continents — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('rivet-ar', ar({
  a: 'The loss of a key species can seriously harm the functioning of an ecosystem.',
  r: 'In the rivet popper analogy, key species are like rivets on an aeroplane’s wings, which carry out major functions.',
  key: 'a',
  sol: 'Both are true, and the analogy explains why losing a key species is so serious — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('tilman-mcq', mcq({
  stem: 'David Tilman’s long-term field experiments showed that plots with more plant species',
  right: 'had less year-to-year variation in total biomass and higher productivity',
  wrong: ['always had fewer insects', 'had more variation in biomass every year', 'had a lower carrying capacity'],
  sol: 'Greater diversity gave greater stability and productivity — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('utilitarian-mcq', mcq({
  stem: 'A farmer’s mango trees fruit well only when wild bees from a nearby forest visit them. Protecting the forest for this reason is an example of which argument for conserving biodiversity?',
  right: 'Broadly utilitarian — biodiversity provides ecosystem services such as pollination',
  wrong: ['Narrowly utilitarian — direct sale of forest products', 'Ethical — every species has intrinsic value', 'Ex-situ conservation'],
  sol: 'Pollination is an ecosystem service, a broadly utilitarian benefit — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('amazon-mcq', mcq({
  stem: 'The Amazon rain forest is often called the “lungs of the planet”. Which ecosystem service does this refer to?',
  right: 'Production of about 20 percent of the oxygen in the atmosphere through photosynthesis',
  wrong: ['Supply of more than 25 percent of drugs', 'Removal of all carbon dioxide from the air', 'Pollination of crops worldwide'],
  sol: 'The Amazon produces about a fifth of atmospheric oxygen — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('bioprospect-fill', fill({
  stem: 'Exploring molecular, genetic and species-level diversity for products of economic importance is called ______.',
  acc: [['bioprospecting']],
  sol: 'Bioprospecting.',
  d: 1, c: 'recall', t: [2],
}));
{
  const f = round(areaFactor(81, 0.25), 2);
  add('area-num', num({
    stem: 'With Z = 0.25 in the species–area relationship, by what factor does species richness increase if the area surveyed is increased 81 times?',
    value: f, tol: 0.01,
    sol: r`Factor $= 81^{0.25} = ${f}$.`,
    scheme: [[`${f}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 3 || 'value');
}
{
  const s = Math.round(speciesFor(20, 256, 0.25));
  add('sar-num', num({
    stem: 'For a group of islands, S = CA^Z with C = 20 and Z = 0.25 (A in km²). How many species are expected on an island of 256 km²?',
    value: s,
    sol: r`$S = 20 \times 256^{0.25} = 20 \times 4 = ${s}$.`,
    scheme: [[`${s}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 80 || 'value');
}
{
  const z = round(zFrom([50, 40], [5000, 100]), 2);
  add('z-num', num({
    stem: 'Surveys of ants found 40 species in 50 km² and 100 species in 5000 km² of the same region. Calculate Z, the slope of the log–log species–area line. (Two decimal places.)',
    value: z, tol: 0.01,
    sol: r`$Z = \dfrac{\log 100 - \log 40}{\log 5000 - \log 50} = \dfrac{\log 2.5}{\log 100} = \dfrac{0.398}{2} = ${z}$.`,
    scheme: [[`${z}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 0.2 || 'value');
}
add('rivet-short', short({
  marks: 2,
  stem: 'Explain Paul Ehrlich’s rivet popper hypothesis.',
  model: 'An **ecosystem** is compared to an **aeroplane** and its **species** to the **rivets** holding it together. Losing a few rivets from **seats or windows** (minor species) may not affect safety, but steady loss weakens the plane; losing rivets on the **wings** (**key species** that drive major ecosystem functions) is a **serious threat** to the ecosystem.',
  sol: 'Analogy explained.',
  scheme: [['Ecosystem as plane, species as rivets', 1], ['Key species on wings: serious', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('ethical-short', short({
  marks: 2,
  stem: 'A rare beetle found only on one hillside has no known use to humans. A developer argues that it need not be protected. Give the ethical argument against him and one utilitarian argument too.',
  model: '**Ethical:** every species has an **intrinsic value**, even with no economic use; we have a **moral duty** to care for it and pass on our biological legacy to future generations. **Utilitarian:** the beetle may have **undiscovered uses** (bioprospecting) or play a role in **ecosystem services** such as decomposition or pollination.',
  sol: 'Ethical and utilitarian.',
  scheme: [['Ethical: intrinsic value, moral duty', 1], ['Utilitarian argument', 1]],
  d: 3, c: 'application', t: [2],
}));
add('gradient-short', short({
  marks: 3,
  stem: 'What is the latitudinal gradient in species diversity? Give three reasons proposed to explain it.',
  model: 'Species diversity **decreases** from the **equator towards the poles** — for example, about 1400 bird species in Colombia but only 56 in Greenland. Reasons: (i) tropical latitudes have remained **undisturbed for millions of years**, giving long evolutionary time for **speciation**; (ii) tropical environments are **less seasonal, more constant and predictable**, promoting **niche specialisation**; (iii) more **solar energy** in the tropics gives **higher productivity**, supporting more species.',
  sol: 'Definition and reasons.',
  scheme: [['Definition with example', 1], ['Two reasons', 1], ['Third reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('sar-short', short({
  marks: 3,
  stem: 'Describe the species–area relationship, giving its equation on a logarithmic scale and the usual values of Z, and explain what happens to the curve on a normal scale.',
  model: '**Humboldt** found that species richness **increases with area**, but only **up to a limit**. On a **normal scale** the graph is a **rectangular hyperbola**, rising steeply and then levelling off. On a **log scale** it is a **straight line**: **log S = log C + Z log A** (S = species richness, A = area, C = Y-intercept, Z = slope). **Z** is usually **0.1–0.2**, but **0.6–1.2** when very large areas such as **whole continents** are compared.',
  sol: 'Curve, equation, Z.',
  scheme: [['Rectangular hyperbola on normal scale', 1], ['Log equation', 1], ['Values of Z', 1]],
  d: 3, c: 'application', t: [2],
  assets: [saFig],
}));
add('conserve-short', short({
  marks: 3,
  stem: 'Explain the narrowly utilitarian, broadly utilitarian and ethical arguments for conserving biodiversity, with one example of each.',
  model: '**Narrowly utilitarian:** biodiversity gives **direct economic benefits** — food, fibre, firewood, industrial products, and **medicines** (more than 25 percent of drugs come from plants). **Broadly utilitarian:** it provides **ecosystem services** — the **Amazon** produces about **20 percent** of atmospheric oxygen; bees and birds **pollinate** crops. **Ethical:** every species has **intrinsic value**, and we have a **moral duty** to protect it for future generations.',
  sol: 'Three arguments.',
  scheme: [['Narrowly utilitarian', 1], ['Broadly utilitarian', 1], ['Ethical', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('patterns-long', long({
  stem: '(a) Explain the latitudinal gradient in biodiversity with an example. [1]\n(b) Write the equation of the species–area relationship and explain each term. [2]\n(c) A reserve of 625 km² holds 75 species of birds. Using Z = 0.25, how many species would you expect in a reserve of 39 km² in the same region? Comment on what this means for small fragments. [2]',
  model: `(a) Diversity **decreases from the equator to the poles**: Colombia has about **1400** bird species, Greenland about **56**.\n\n(b) **log S = log C + Z log A** (or **S = CA^Z**): **S** = species richness, **A** = area, **C** = Y-intercept, **Z** = slope (regression coefficient), usually 0.1–0.2.\n\n(c) The area ratio is 39/625 ≈ 1/16, so species fall by a factor of $16^{0.25} = 2$: about **${Math.round(75 / areaFactor(16, 0.25))} species**. A small **fragment** supports far fewer species, so **habitat fragmentation** leads to loss of species.`,
  sol: 'Gradient; equation; calculation.',
  scheme: [['(a) Gradient with example', 1], ['(b) Equation', 1], ['(b) Terms', 1], ['(c) About 38 species', 1], ['(c) Fragments lose species', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}), () => Math.round(75 / areaFactor(16, 0.25)) === 38 || 'species');

// ---------------------------------------------------------------- t03 loss of biodiversity
add('nileperch-mcq', mcq({
  stem: 'After the Nile perch was introduced into Lake Victoria in East Africa, what happened to the lake’s native fish?',
  right: 'More than 200 species of cichlid fish became extinct.',
  wrong: ['Cichlid fish became more numerous as the perch ate their predators.', 'The perch died out because of competition.', 'Nothing changed, as the perch ate only plants.'],
  sol: 'An alien predator eliminated a unique cichlid assemblage — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('dodo-mcq', mcq({
  stem: 'The dodo, a flightless bird that became extinct after humans arrived, lived on the island of',
  right: 'Mauritius',
  wrong: ['Galapagos', 'Sri Lanka', 'Greenland'],
  sol: 'The dodo lived on Mauritius — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('extinct-mcq', mcq({
  stem: 'Which list contains only recent extinctions?',
  right: 'Dodo, quagga, thylacine, Steller’s sea cow',
  wrong: ['Dodo, cheetah, lion, tiger', 'Quagga, elephant, rhinoceros, bison', 'Thylacine, kangaroo, koala, platypus'],
  sol: 'These four, with three tiger subspecies, are recent extinctions — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('habitat-mcq', mcq({
  stem: 'Which is regarded as the most important cause of the loss of biodiversity?',
  right: 'Habitat loss and fragmentation',
  wrong: ['Co-extinction', 'Cryopreservation', 'Rising numbers of zoos'],
  sol: 'Habitat loss is the leading cause in the evil quartet — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('coextinct-mcq', mcq({
  stem: 'A fish species found in a single lake becomes extinct. Shortly afterwards, several species of parasites found only on that fish also disappear. This is an example of',
  right: 'co-extinction',
  wrong: ['over-exploitation', 'alien species invasion', 'habitat fragmentation'],
  sol: 'Obligately associated species die out with their host — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('overexploit-mcq', mcq({
  stem: 'The passenger pigeon, once seen in flocks of millions, became extinct after intensive hunting. This illustrates which cause of biodiversity loss?',
  right: 'Over-exploitation',
  wrong: ['Co-extinction', 'Alien species invasion', 'Latitudinal gradient'],
  sol: 'Excessive harvesting by humans — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('catfish-mcq', mcq({
  stem: 'The African catfish Clarias gariepinus was introduced illegally into Indian waters for aquaculture. Why is this a conservation concern?',
  right: 'It threatens the indigenous catfishes of Indian rivers.',
  wrong: ['It pollinates aquatic plants too quickly.', 'It is a co-extinct parasite.', 'It cannot survive in Indian rivers.'],
  sol: 'Invasive alien species can drive native species to decline — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('lantana-mcq', mcq({
  stem: 'Carrot grass (Parthenium), Lantana and water hyacinth have spread widely in India, crowding out native plants. They are examples of',
  right: 'invasive alien species',
  wrong: ['endemic species of hotspots', 'keystone native species', 'species preserved in seed banks'],
  sol: 'These introduced weeds are invasive aliens — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('fragment-ar', ar({
  a: 'Habitat fragmentation particularly harms mammals and birds that need large territories.',
  r: 'Fragmentation increases the continuous area available to wide-ranging and migratory animals.',
  key: 'c',
  sol: 'A is true; R is false: fragmentation breaks habitat into small, isolated pieces, reducing the area available — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
{
  const p = pct(87, 784);
  add('redlist-num', num({
    stem: 'The IUCN Red List (2004) records 784 extinctions in the last 500 years, of which 87 were plants. What percentage of these extinctions were plants? (One decimal place.)',
    value: p, tol: 0.05, unit: '%',
    sol: r`$\dfrac{87}{784} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 11.1 || 'value');
}
add('loss-short', short({
  marks: 2,
  stem: 'State two consequences of the loss of biodiversity in a region.',
  model: 'Loss of biodiversity may lead to (i) a **decline in plant production** and (ii) **lowered resistance** to environmental perturbations such as **drought**, and (iii) **increased variability** in ecosystem processes such as plant productivity, water use and pest and disease cycles.',
  sol: 'Two consequences.',
  scheme: [['First consequence', 1], ['Second consequence', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('evil-short', short({
  marks: 3,
  stem: 'A forest near a growing town is being cleared for a highway and farms, its large deer are hunted for meat, and an ornamental weed from another continent is spreading through it. Identify the causes of biodiversity loss involved, and name the fourth cause of the “evil quartet”.',
  model: '**Clearing** for a highway and farms is **habitat loss and fragmentation** — the forest is reduced and broken into pieces. **Hunting** deer is **over-exploitation**. The spreading foreign weed is an **alien species invasion**, like **Lantana** or **Parthenium**. The fourth cause is **co-extinction**: species obligately linked to a lost species (such as its **parasites** or **pollinators**) die out with it.',
  sol: 'Four causes.',
  scheme: [['Habitat loss and fragmentation', 1], ['Over-exploitation and alien invasion', 1], ['Co-extinction', 1]],
  d: 3, c: 'application', t: [3],
}));
{
  const pM = 23, pA = 32, pB = 12;
  add('redlist-short3', short({
    marks: 3,
    stem: `According to the IUCN, about ${pB} percent of bird species, ${pM} percent of mammal species and ${pA} percent of amphibian species are threatened with extinction. Interpret these figures and suggest why amphibians might be the most threatened group.`,
    model: `**Amphibians** (${pA} percent) are the **most threatened**, followed by **mammals** (${pM} percent) and **birds** (${pB} percent). Amphibians live partly in **water and partly on land** and have **moist, permeable skins**, so they are very sensitive to **habitat loss**, especially draining of **wetlands**, to **pollution**, and to **disease**; many also have **small ranges**. Their decline is an early **warning** of environmental damage.`,
    sol: 'Ranking and reasons.',
    scheme: [['Amphibians most threatened; ranking', 1], ['Reasons: wetlands, skin, pollution', 1], ['Small ranges or warning signal', 1]],
    d: 4, c: 'analysis', t: [3],
  }));
}
add('evil-long', long({
  stem: '(a) Name the four major causes of biodiversity loss (the “evil quartet”) and give an example of each. [4]\n(b) Why is the clearing of the Amazon rain forest a matter of global concern? [1]',
  model: '(a) **Habitat loss and fragmentation** — tropical rain forests fell from about **14 percent** to no more than **6 percent** of the land; the **Amazon** is being cleared for **soybeans** and **cattle**. **Over-exploitation** — **Steller’s sea cow** and the **passenger pigeon** were hunted to extinction. **Alien species invasions** — the **Nile perch** in **Lake Victoria** wiped out over **200 cichlid species**; **Parthenium, Lantana**, water hyacinth and the **African catfish** in India. **Co-extinctions** — a host fish and its **parasites**; a plant and its specialised **pollinator**.\n\n(b) The Amazon holds the **greatest biodiversity** on Earth and produces about **20 percent** of the **oxygen** in the atmosphere (“lungs of the planet”), so its loss affects the **whole world**.',
  sol: 'Evil quartet; Amazon.',
  scheme: [['(a) Habitat loss with example', 1], ['(a) Over-exploitation with example', 1], ['(a) Alien species with example', 1], ['(a) Co-extinction with example', 1], ['(b) Global importance', 1]],
  wl: [80, 220],
  d: 3, c: 'application', t: [2, 3],
}));

// ---------------------------------------------------------------- t04 in-situ conservation
add('hotspot-mcq', mcq({
  stem: 'Which of these is one of the biodiversity hotspots covering India?',
  right: 'The Western Ghats and Sri Lanka',
  wrong: ['The Thar Desert', 'The Deccan Plateau', 'The Gangetic plain'],
  sol: 'India’s hotspots are the Western Ghats and Sri Lanka, Indo-Burma and the Himalaya — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('endemism-mcq', mcq({
  stem: 'Which two criteria are used to identify a region as a biodiversity hotspot?',
  right: 'Very high species richness and a high degree of endemism',
  wrong: ['Large area and low rainfall', 'Many zoos and botanical gardens', 'High human population and many farms'],
  sol: 'Hotspots have many species, many found nowhere else — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('sacred-mcq', mcq({
  stem: 'In the Khasi and Jaintia Hills of Meghalaya, some forest patches are left untouched by local people for religious reasons and shelter many rare plants. These are',
  right: 'sacred groves, a form of in-situ conservation',
  wrong: ['seed banks, a form of ex-situ conservation', 'Ramsar sites for wetlands', 'botanical gardens'],
  sol: 'Sacred groves protect species in their natural habitat — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ramsar-mcq', mcq({
  stem: 'Ramsar sites are protected areas of international importance for',
  right: 'wetlands',
  wrong: ['deserts', 'coral islands only', 'mountain glaciers'],
  sol: 'The Ramsar Convention (1971) protects wetlands — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('redbook-mcq', mcq({
  stem: 'What is the Red Data Book?',
  right: 'A record maintained by the IUCN that lists threatened species in categories such as endangered and vulnerable',
  wrong: ['A list of all species found in India', 'A record of all national parks of the world', 'A book of agricultural pests'],
  sol: 'The IUCN Red Data Book documents threatened species — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('biosphere-mcq', mcq({
  stem: 'In a biosphere reserve, in which zone are research, education and limited tourism permitted while human settlement is not?',
  right: 'The buffer zone',
  wrong: ['The core zone', 'The transition zone', 'Outside the reserve only'],
  sol: 'The core is strictly protected; the buffer allows limited activities; people live in the transition zone — option (@K).',
  d: 2, c: 'application', t: [4],
}));
{
  const left = 1000 - 1000 * 0.3;
  add('hotspot-num', num({
    stem: 'Suppose 1000 species are expected to become extinct over a period without action. Strict protection of all hotspots is estimated to reduce such extinctions by almost 30 percent. About how many extinctions would still be expected?',
    value: left,
    sol: r`$1000 - 0.3 \times 1000 = ${left}$.`,
    scheme: [[`${left}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 700 || 'value');
}
add('insitu-short', short({
  marks: 2,
  stem: 'What is in-situ conservation? Name four kinds of protected area used for it in India.',
  model: '**In-situ conservation** protects species **in their natural habitat**, together with their ecosystem. Protected areas include **biosphere reserves**, **national parks**, **wildlife sanctuaries** and **sacred groves** (also Ramsar wetland sites).',
  sol: 'Definition; areas.',
  scheme: [['Definition', 1], ['Four protected areas', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('hotspot-short', short({
  marks: 3,
  stem: 'What are biodiversity hotspots? Name India’s hotspots and explain why conservation efforts are focused on them.',
  model: '**Hotspots** are regions with **very high species richness** and a **high degree of endemism**. There are **34** worldwide; three cover India: the **Western Ghats and Sri Lanka**, **Indo-Burma** and the **Himalaya**. Although together they cover **less than 2 percent** of the Earth’s land, they hold an extremely large share of species; **strict protection** of them could reduce ongoing **mass extinctions by almost 30 percent**.',
  sol: 'Definition, India, rationale.',
  scheme: [['Definition', 1], ['India’s three hotspots', 1], ['Small area, large benefit', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('sacred-short3', short({
  marks: 3,
  stem: 'Explain why sacred groves are valuable for conservation, and name two regions of India where they are found.',
  model: 'Sacred groves are forest tracts set aside by **religious and cultural tradition**, in which **all trees and wildlife are venerated** and given **total protection**. Because they have been **undisturbed** for a long time, they act as **refuges** for many **rare and threatened** plants and animals — in Meghalaya they are the last refuges of many rare species — and preserve **local genetic diversity**. They are found in the **Khasi and Jaintia Hills** (Meghalaya), the **Aravalli Hills** (Rajasthan), the **Western Ghats** of Karnataka and Maharashtra, and the **Sarguja, Chanda and Bastar** areas.',
  sol: 'Value and regions.',
  scheme: [['Traditional total protection', 1], ['Refuges for rare species', 1], ['Two regions', 1]],
  d: 3, c: 'application', t: [4],
}));
add('insitu-long', long({
  stem: '(a) Draw a labelled diagram of the zones of a biosphere reserve and state the activities allowed in each. [2]\n(b) What are biodiversity hotspots? Name the three that cover India. [2]\n(c) What is the Red Data Book? [1]',
  model: '(a) **Diagram:** three concentric zones — an inner **core zone** (strictly protected; no human activity except research), a **buffer zone** (limited activities such as **research, education and tourism**), and an outer **transition zone** (human **settlements, farming** and other **sustainable** uses).\n\n(b) Regions with **very high species richness** and **high endemism**; India: **Western Ghats and Sri Lanka**, **Indo-Burma** and the **Himalaya**.\n\n(c) A record maintained by the **IUCN** that lists **threatened species** in categories such as **critically endangered, endangered and vulnerable**.',
  sol: 'Zones; hotspots; Red Data Book.',
  scheme: [['(a) Labelled zones with activities', 2], ['(b) Definition', 1], ['(b) Three hotspots', 1], ['(c) Red Data Book', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 ex-situ conservation
add('cryo-ar', ar({
  a: 'Gametes of threatened species can be kept viable and fertile for long periods by cryopreservation.',
  r: 'Seed banks store the seeds of commercially important plants.',
  key: 'b',
  sol: 'Both are true, but seed banks do not explain how cryopreservation keeps gametes viable (storage in liquid nitrogen at −196 °C) — option (b).',
  d: 3, c: 'understanding', t: [5],
}));
add('seedbank-mcq', mcq({
  stem: 'An agricultural institute wants to preserve seeds of hundreds of traditional rice varieties for future breeding. Which method is most suitable?',
  right: 'A seed bank (ex-situ conservation)',
  wrong: ['A sacred grove', 'A biosphere reserve core zone', 'A Ramsar site'],
  sol: 'Seed banks keep seeds of many strains viable for long periods — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('captive-mcq', mcq({
  stem: 'Only a few dozen individuals of a vulture species survive in the wild. A centre breeds them in large aviaries and later releases young birds. This is',
  right: 'captive breeding, a form of ex-situ conservation',
  wrong: ['in-situ conservation in a sacred grove', 'co-extinction', 'bioprospecting'],
  sol: 'Breeding outside the natural habitat is ex-situ — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('tissue-mcq', mcq({
  stem: 'A rare orchid produces very few seeds. Which ex-situ method could produce many plants from a small piece of its tissue?',
  right: 'Tissue culture',
  wrong: ['Cryopreservation of gametes only', 'Declaring a Ramsar site', 'Captive breeding'],
  sol: 'Tissue culture propagates plants from small explants — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('exsitu-mcq', mcq({
  stem: 'A state protects a rare tree in four ways: in a national park, in a sacred grove, in a biosphere reserve and in a botanical garden in its capital. Which of these is an ex-situ method?',
  right: 'The botanical garden',
  wrong: ['The national park', 'The sacred grove', 'The biosphere reserve'],
  sol: 'Botanical gardens keep plants outside their natural habitat — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('exsitu-short', short({
  marks: 2,
  stem: 'A rare Himalayan plant is losing its habitat to landslides. Suggest two ex-situ methods to save it, and explain each.',
  model: '(i) Grow it in a **botanical garden** under suitable conditions, where it is protected and can be studied. (ii) Store its **seeds** in a **seed bank**, or preserve tissue by **cryopreservation** in liquid nitrogen at −196 °C, or propagate it by **tissue culture**, so it can later be **re-introduced** into the wild.',
  sol: 'Two methods.',
  scheme: [['Botanical garden', 1], ['Seed bank, cryopreservation or tissue culture', 1]],
  d: 2, c: 'application', t: [5],
}));
add('compare-short', short({
  marks: 3,
  stem: 'Distinguish between in-situ and ex-situ conservation, giving two examples of each, and state which is generally preferred.',
  model: '**In-situ** conservation protects species **in their natural habitat**, along with the whole **ecosystem** — **national parks, sanctuaries, biosphere reserves, sacred groves**. **Ex-situ** conservation protects threatened species **outside their natural habitat** — **zoos, botanical gardens, seed banks, cryopreservation**. **In-situ** is generally **preferred**, because it conserves interactions and natural evolution, while ex-situ methods serve as a **back-up** for species on the brink.',
  sol: 'Distinction; examples; preference.',
  scheme: [['In-situ with examples', 1], ['Ex-situ with examples', 1], ['In-situ preferred, reason', 1]],
  d: 2, c: 'understanding', t: [4, 5],
}));

// ---------------------------------------------------------------- t06 international conventions
add('rio-mcq', mcq({
  stem: 'The Earth Summit, at which the Convention on Biological Diversity was agreed, was held in',
  right: 'Rio de Janeiro in 1992',
  wrong: ['Johannesburg in 2002', 'Ramsar in 1971', 'Stockholm in 1972'],
  sol: 'The Earth Summit was held at Rio de Janeiro in 1992 — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('joburg-mcq', mcq({
  stem: 'At the World Summit on Sustainable Development (Johannesburg, 2002), about 190 countries pledged to',
  right: 'achieve a significant reduction in the current rate of biodiversity loss by 2010',
  wrong: ['ban all agriculture in hotspots', 'stop all international trade in seeds', 'double the number of zoos by 2010'],
  sol: 'The pledge was to significantly reduce the rate of biodiversity loss by 2010 — option (@K).',
  d: 2, c: 'recall', t: [6],
}));
add('summit-ar', ar({
  a: 'The Earth Summit on biodiversity was held in Johannesburg in 2002.',
  r: 'The World Summit on Sustainable Development was held in Rio de Janeiro in 1992.',
  key: 'd',
  sol: 'Both are false: the Earth Summit was at Rio de Janeiro in 1992, and the World Summit at Johannesburg in 2002 — option (d).',
  d: 2, c: 'understanding', t: [6],
}));
add('summits-short', short({
  marks: 2,
  stem: 'State the place, year and main outcome of (i) the Earth Summit and (ii) the World Summit on Sustainable Development.',
  model: '(i) **Earth Summit** — **Rio de Janeiro, 1992**: nations agreed to take measures for the **conservation of biodiversity** and the **sustainable use** of its benefits (**Convention on Biological Diversity**). (ii) **World Summit** — **Johannesburg, South Africa, 2002**: **190 countries** pledged to achieve **by 2010** a **significant reduction** in the current **rate of biodiversity loss**.',
  sol: 'Two summits.',
  scheme: [['Earth Summit', 1], ['World Summit', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('conservation-long', long({
  stem: '(a) Describe four methods of ex-situ conservation. [2]\n(b) Explain why ex-situ conservation alone cannot save biodiversity. [1]\n(c) Name the two international summits on biodiversity, with their places, years and agendas. [2]',
  model: '(a) **Zoos, botanical gardens and wildlife safari parks** keep and breed threatened species; **captive breeding** for release into the wild; **cryopreservation** of gametes in **liquid nitrogen at −196 °C**; **seed banks** for seeds of commercially important plants; **in vitro fertilisation** and **tissue culture**.\n\n(b) It saves only **a few** species and individuals, **cannot** preserve whole **ecosystems** or their **interactions**, and species kept in captivity may lose **natural behaviour** and **genetic diversity**; **protecting habitats** (in-situ) is essential.\n\n(c) **Earth Summit**, **Rio de Janeiro, 1992** — conservation and **sustainable use** of biodiversity (Convention on Biological Diversity). **World Summit on Sustainable Development**, **Johannesburg, 2002** — **190 countries** pledged to **significantly reduce** the rate of biodiversity loss **by 2010**.',
  sol: 'Ex-situ; limits; summits.',
  scheme: [['(a) Four methods', 2], ['(b) Limitation', 1], ['(c) Earth Summit', 1], ['(c) World Summit', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [5, 6],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const I = [['P', 16, 42], ['Q', 256, 84], ['R', 4096, 168]];
  const z = round(zFrom([I[0][1], I[0][2]], [I[2][1], I[2][2]]), 2);
  add('island-case', mk.case({
    passage: `Ecologists counted the plant species on three islands of an archipelago.\n\n| Island | Area (km²) | Plant species |\n|---|---|---|\n${I.map((row) => `| ${row.join(' | ')} |`).join('\n')}`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'Calculate Z from islands P and R. (Two decimal places.)',
        value: z, tol: 0.01,
        sol: r`$Z = \dfrac{\log 168 - \log 42}{\log 4096 - \log 16} = \dfrac{\log 4}{\log 256} = ${z}$.`,
        scheme: [[`${z}`, 1]],
        d: 3, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Each 16-fold increase in area doubles the number of species. What shape would a graph of species against area (both on ordinary scales) have?',
        right: 'A curve that rises steeply and then levels off (rectangular hyperbola)',
        wrong: ['A straight line through the origin', 'A curve that rises more and more steeply', 'A horizontal straight line'],
        sol: 'On normal scales the species–area relation is a rectangular hyperbola — option (@K).',
        d: 3, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'If half of island R’s forest were cleared, what would you predict for its plant species, and why?',
        model: 'Species would **decline**: with less **area**, fewer species can be supported (S = CA^Z). Halving the area with Z = 0.25 predicts a fall of about **16 percent** (2^0.25 ≈ 1.19), and many **endemic** species might be lost entirely.',
        sol: 'Fewer species.',
        scheme: [['Species decline with area', 1], ['Quantified or endemics lost', 1]],
        d: 3, c: 'analysis', t: [2, 3],
      }), [
        short({
          marks: 2,
          stem: 'Why might species richness on islands also depend on their distance from the mainland?',
          model: 'Islands **farther** from the mainland receive **fewer colonists** (seeds, animals) by dispersal, so fewer species arrive and establish; **near** islands are colonised more often and can hold more species.',
          sol: 'Dispersal.',
          scheme: [['Fewer colonists reach far islands', 1], ['Near islands receive more', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 0.25 || 'value');
}
{
  const L = { before: 300, after: 95 };
  const lost = pct(L.before - L.after, L.before);
  add('invasion-case', mk.case({
    passage: `A large tropical lake had about ${L.before} species of small endemic fish. A large predatory fish was introduced from another continent to increase the commercial catch. Thirty years later, surveys found only about ${L.after} of the original species.`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'What percentage of the original endemic fish species was lost? (One decimal place.)',
        value: lost, tol: 0.05, unit: '%',
        sol: r`$\dfrac{${L.before} - ${L.after}}{${L.before}} \times 100 = ${lost}$ percent.`,
        scheme: [[`${lost}`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('b', mcq({
        stem: 'Which real case does this most closely resemble?',
        right: 'Nile perch introduced into Lake Victoria',
        wrong: ['Steller’s sea cow in Russia', 'The dodo in Mauritius', 'Water hyacinth in Indian ponds'],
        sol: 'The Nile perch caused the extinction of over 200 cichlid species — option (@K).',
        d: 2, c: 'analysis', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Which cause of the evil quartet is shown, and why are lakes and islands especially vulnerable to it?',
        model: '**Alien species invasion.** Lakes and islands hold many **endemic** species that evolved **without such predators or competitors**, so they have **no defences**; the invader spreads **unchecked** and many native species are lost.',
        sol: 'Alien invasion; endemics.',
        scheme: [['Alien species invasion', 1], ['Endemics lack defences', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Suggest one way in which such losses could have been avoided.',
          model: 'By **strict rules** against introducing **alien species**, with careful **risk assessment** before any introduction; native fisheries could be developed instead, and **ex-situ** stocks of endemic fish kept as insurance.',
          sol: 'Prevent introduction.',
          scheme: [['Regulate alien introductions', 1], ['Native alternatives or ex-situ stocks', 1]],
          d: 2, c: 'application', t: [3, 5],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 68.3 || 'value');
}
