// ch13 Biodiversity and Conservation — question bank. AR keys: a c b a.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { round, zFrom, areaFactor, pct, BIRDS, INDIA } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 biodiversity, patterns, importance
add('rauwolfia-mcq', mcq({
  stem: 'Rauwolfia vomitoria growing in different Himalayan ranges differs in the potency and concentration of reserpine. This is an example of',
  right: 'genetic diversity',
  wrong: ['species diversity', 'ecological diversity', 'latitudinal diversity'],
  sol: 'The variation lies within one species, so it is genetic diversity — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('z-mcq', mcq({
  stem: 'For species–area relationships within a region, the slope Z usually lies in the range',
  right: '0.1 to 0.2',
  wrong: ['0.6 to 1.2', '1.5 to 2.0', '0 to 0.01'],
  sol: 'Z is about 0.1–0.2 within regions; 0.6–1.2 applies to very large areas such as continents — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('westernghats-mcq', mcq({
  stem: 'The Western Ghats have a greater diversity of amphibian species than the Eastern Ghats. This illustrates',
  right: 'species diversity',
  wrong: ['genetic diversity', 'ecological diversity', 'co-extinction'],
  sol: 'A difference in the number of species between regions is species diversity — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('insects-mcq', mcq({
  stem: 'Which group is the most species-rich among animals?',
  right: 'Insects',
  wrong: ['Mammals', 'Fishes', 'Birds'],
  sol: 'Insects make up more than 70 percent of animal species — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('continent-mcq', mcq({
  stem: 'A biogeographer plots log species against log area for fruit-eating birds across forests on different continents and finds a slope of 1.1. How should this be interpreted?',
  right: 'It is typical of very large areas such as whole continents, where Z is about 0.6–1.2.',
  wrong: ['It must be a mistake, as Z is always 0.1–0.2.', 'It shows that species fall as area rises.', 'It shows that area has no effect on species number.'],
  sol: 'For very large areas such as entire continents the slope is much steeper, about 0.6–1.2 — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('ecuador-mcq', mcq({
  stem: 'A temperate forest plot in the American Midwest has 100 species of vascular plants. About how many might an equal area of tropical forest in Ecuador have?',
  right: 'Up to about 1000',
  wrong: ['About 10', 'About 100', 'About 100000'],
  sol: 'A tropical forest like Ecuador’s can have up to 10 times as many vascular plant species as an equal temperate area: up to about 100 × 10 = 1000 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('latitude-mcq', mcq({
  stem: 'A student compares two equal plots of natural forest, one at 5° N and one at 50° N, on the same continent. What is she most likely to find?',
  right: 'More species in the plot at 5° N',
  wrong: ['More species in the plot at 50° N', 'The same number in both', 'No birds at all at 50° N'],
  sol: 'Diversity generally decreases from the equator towards the poles — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('stability-mcq', mcq({
  stem: 'In a long-term field experiment, plots sown with 16 plant species varied in total biomass by about 5 percent from year to year, while single-species plots varied by about 40 percent. What do the results suggest?',
  right: 'Communities with more species are more stable in productivity.',
  wrong: ['Species number has no effect on stability.', 'Single-species plots are more resistant to disturbance.', 'More species always reduce productivity.'],
  sol: 'Smaller year-to-year variation with more species matches Tilman’s finding that diversity brings stability — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('rivet-mcq', mcq({
  stem: 'In Paul Ehrlich’s rivet popper analogy, losing rivets from the wings of the aeroplane corresponds to',
  right: 'losing key species that drive major ecosystem functions',
  wrong: ['losing any species, all of which matter equally', 'adding alien species to an ecosystem', 'increasing the area of an ecosystem'],
  sol: 'Wing rivets stand for key species; their loss endangers the whole ecosystem — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('levels-match', match({
  stem: 'Match each example (column I) with the level of biodiversity it shows (column II).',
  pairs: [
    ['50,000 strains of rice in India', 'Genetic diversity in a crop'],
    ['More amphibian species in the Western Ghats than in the Eastern Ghats', 'Species diversity'],
    ['Deserts, mangroves, coral reefs and alpine meadows in one country', 'Ecological diversity'],
    ['Varying reserpine content in Rauwolfia', 'Genetic diversity in a medicinal plant'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Rice strains and reserpine variation are genetic; amphibians across regions are species; many ecosystem types are ecological.',
  d: 2, c: 'understanding', t: [1],
}));
add('wilson-fill', fill({
  stem: 'The term biodiversity was popularised by the sociobiologist Edward ______.',
  acc: [['Wilson']],
  sol: 'Wilson.',
  d: 1, c: 'recall', t: [1],
}));
add('mega-tf', tf({
  stem: 'India is one of the 12 mega diversity countries of the world.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('fungi-tf', tf({
  stem: 'The number of fungal species in the world is greater than the combined total of the species of fishes, amphibians, reptiles and mammals.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'recall', t: [1],
}));
add('tropics-ar', ar({
  a: 'Tropical latitudes generally have more species than temperate latitudes.',
  r: 'Tropical latitudes remained relatively undisturbed for millions of years, whereas temperate regions suffered frequent glaciations, so the tropics had longer evolutionary time for species diversification.',
  key: 'a',
  sol: 'Both are true, and the longer undisturbed time for speciation is one explanation of A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
{
  const ratio = round(INDIA.species / INDIA.land, 1);
  add('india-num', num({
    stem: `India has ${INDIA.land} percent of the world’s land area and ${INDIA.species} percent of global species diversity. How many times its share of land is its share of species? (One decimal place.)`,
    value: ratio, tol: 0.05,
    sol: r`$\dfrac{${INDIA.species}}{${INDIA.land}} = 3.375 \approx ${ratio}$.`,
    scheme: [[`${ratio}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 3.4 || 'value');
}
{
  const ratio = round(BIRDS[0].n / BIRDS[3].n, 0);
  add('birds-num', num({
    stem: `Colombia, near the equator, has about ${BIRDS[0].n} bird species, while Greenland at 71° N has ${BIRDS[3].n}. How many times as many bird species does Colombia have?`,
    value: ratio,
    sol: r`$\dfrac{${BIRDS[0].n}}{${BIRDS[3].n}} = ${ratio}$.`,
    scheme: [[`${ratio}`, 1]],
    d: 1, c: 'application', t: [1],
  }), (q) => q.answer.value === 25 || 'value');
}
{
  const z = round(zFrom([1, 40], [1000, 100]), 2);
  add('zcalc-num', num({
    stem: 'In a region, 40 species of beetles are found in 1 square kilometre and 100 species in 1000 square kilometres. Using log S = log C + Z log A, estimate Z to two decimal places.',
    value: z, tol: 0.01,
    sol: r`$Z = \dfrac{\log 100 - \log 40}{\log 1000 - \log 1} = \dfrac{\log 2.5}{3} = \dfrac{0.398}{3} \approx ${z}$.`,
    scheme: [[`${z}`, 1]],
    d: 4, c: 'application', t: [1],
  }), (q) => Math.abs(q.answer.value - 0.13) < 1e-9 || 'value');
}
{
  const f = round(areaFactor(100, 0.2), 2);
  add('areafactor-num', num({
    stem: 'For a group of organisms with Z = 0.2, by what factor would the number of species increase if the area surveyed increased 100 times? (Two decimal places.)',
    value: f, tol: 0.01,
    sol: r`$\dfrac{S_2}{S_1} = \left(\dfrac{A_2}{A_1}\right)^{Z} = 100^{0.2} \approx ${f}$.`,
    scheme: [[`${f}`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => Math.abs(q.answer.value - 2.51) < 1e-9 || 'value');
}
add('levels-short', short({
  marks: 3,
  stem: 'Describe the three levels of biodiversity, with one Indian example of each.',
  model: '**Genetic diversity:** variation within a species — *Rauwolfia vomitoria* differs in **reserpine** content across Himalayan ranges; India has over **50,000 strains of rice** and **1,000 varieties of mango**.\n\n**Species diversity:** variety of species in a region — the **Western Ghats** have more amphibian species than the **Eastern Ghats**.\n\n**Ecological diversity:** variety of ecosystems — India’s **deserts, rain forests, mangroves, coral reefs, wetlands, estuaries and alpine meadows**.',
  sol: 'Three levels with examples.',
  scheme: [['Genetic with example', 1], ['Species with example', 1], ['Ecological with example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('tropics-short', short({
  marks: 3,
  stem: 'Give three explanations proposed for the greater biological diversity of the tropics.',
  model: '1. **Time:** speciation is a function of time; temperate regions had frequent **glaciations**, while the tropics stayed relatively **undisturbed for millions of years**, giving a long evolutionary time for diversification.\n2. **Stable environment:** tropical environments are **less seasonal**, more constant and predictable, promoting **niche specialisation**.\n3. **Energy:** more **solar energy** is available, contributing to higher **productivity**, which may indirectly support greater diversity.',
  sol: 'Three hypotheses.',
  scheme: [['Time without glaciation', 1], ['Constant, predictable climate', 1], ['More solar energy and productivity', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('speciesarea-short', short({
  marks: 2,
  stem: 'A conservationist argues that protecting one very large reserve will save more species than protecting one small reserve. Use the species–area relationship to support her, giving the equation.',
  model: 'Humboldt showed that species richness **increases with area**, up to a limit: $\\log S = \\log C + Z \\log A$. A **larger area** (bigger A) therefore holds **more species** S; within a region Z is about **0.1–0.2**, so species keep rising, though more slowly, as area grows.',
  sol: 'Equation and its application.',
  scheme: [['Equation with symbols', 1], ['Larger area holds more species', 1]],
  d: 3, c: 'application', t: [1],
}));
add('rivet-short', short({
  marks: 2,
  stem: 'Explain the rivet popper hypothesis.',
  model: 'Paul Ehrlich compared an ecosystem to an **aeroplane** and its species to **rivets**. Removing a few rivets may not affect flight at first, but as more are lost the plane becomes **dangerously weak**. Losing rivets on the **wings** — **key species** driving major ecosystem functions — is more serious than losing those on the seats.',
  sol: 'Analogy and key species.',
  scheme: [['Species as rivets; cumulative loss weakens', 1], ['Key species matter most', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('patterns-long', long({
  stem: 'Describe the latitudinal gradient in species diversity and the species–area relationship, and explain why species diversity matters to an ecosystem.',
  model: '**Latitudinal gradient.** Species diversity generally decreases from the equator towards the poles. Colombia, near the equator, has nearly 1,400 bird species, New York at 41° N has 105 and Greenland at 71° N has only 56. A tropical forest in Ecuador may have up to ten times as many vascular plant species as an equal temperate forest. Explanations are the long undisturbed evolutionary time of the tropics, which escaped the glaciations of temperate regions; their less seasonal, more predictable environment, which favours niche specialisation; and their greater solar energy and productivity.\n\n**Species–area relationship.** Alexander von Humboldt observed that species richness increases with explored area, up to a limit. On logarithmic axes the relation is a straight line, log S = log C + Z log A, where Z, the slope, is about 0.1–0.2 within regions and 0.6–1.2 for very large areas such as continents.\n\n**Importance.** David Tilman’s experiments showed that plots with more species varied less in biomass from year to year and were more productive. A diverse community is more stable, more resistant or resilient to disturbance and harder for alien species to invade. Ehrlich’s rivet popper hypothesis warns that losing key species can make the whole ecosystem fail.',
  sol: 'Gradient with reasons; species–area; importance.',
  scheme: [['Latitudinal gradient with example', 1], ['Three reasons', 1.5], ['Species–area relation with Z', 1.5], ['Importance: Tilman and rivets', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [1],
}));
add('levels-long', long({
  stem: 'What is biodiversity? Describe its three levels with examples, and summarise how many species are known globally and in India.',
  model: '**Biodiversity**, a term popularised by Edward Wilson, is the combined diversity at all levels of biological organisation.\n\n**Genetic diversity** is variation within a species: Rauwolfia vomitoria in different Himalayan ranges varies in the potency and concentration of reserpine, and India has more than 50,000 strains of rice and 1,000 varieties of mango. **Species diversity** is the variety of species: the Western Ghats have more amphibian species than the Eastern Ghats. **Ecological diversity** is the variety of ecosystems: India, with deserts, rain forests, mangroves, coral reefs, wetlands, estuaries and alpine meadows, has more than a country such as Norway.\n\n**Global numbers.** The IUCN (2004) lists slightly more than 1.5 million described species, while Robert May estimated about 7 million in all. More than 70 percent of recorded species are animals and no more than 22 percent plants; insects make up more than 70 percent of animals.\n\n**India.** With only 2.4 percent of the world’s land, India has 8.1 percent of its species and is one of 12 mega diversity countries. About 45,000 plant species and twice as many animal species are recorded, and many more remain to be discovered.',
  sol: 'Definition, levels, global and Indian numbers.',
  scheme: [['Definition', 0.5], ['Three levels with examples', 2], ['Global numbers and proportions', 1.5], ['India’s share', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 loss of biodiversity
add('rate-mcq', mcq({
  stem: 'Current species extinction rates are estimated to be how much faster than in pre-human times?',
  right: '100 to 1,000 times faster',
  wrong: ['2 to 5 times faster', 'About the same', '10 times slower'],
  sol: 'The sixth extinction is running 100–1,000 times faster than pre-human rates — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('dodo-mcq', mcq({
  stem: 'The dodo, a recently extinct bird, lived in',
  right: 'Mauritius',
  wrong: ['Australia', 'Russia', 'Africa'],
  sol: 'The dodo was from Mauritius; the thylacine from Australia, Steller’s sea cow from Russia and the quagga from Africa — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('quartet-mcq', mcq({
  stem: 'Which of these is NOT one of the four major causes of biodiversity loss (the “evil quartet”)?',
  right: 'Creation of sacred groves',
  wrong: ['Habitat loss and fragmentation', 'Alien species invasions', 'Co-extinctions'],
  sol: 'The quartet is habitat loss and fragmentation, over-exploitation, alien species invasions and co-extinctions; sacred groves conserve biodiversity — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('fragment-mcq', mcq({
  stem: 'A new highway and farms split a large forest into many small patches. Which animals are likely to be affected most badly?',
  right: 'Mammals and birds that need large territories, and migratory animals',
  wrong: ['Soil bacteria', 'Insects that live on a single leaf', 'Plants that reproduce by spores'],
  sol: 'Fragmentation badly affects animals requiring large territories and those with migratory habits — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('harvest-mcq', mcq({
  stem: 'A sea fish was caught in large numbers for decades until its population collapsed. Which cause of biodiversity loss does this show, and which extinct animal is a classic example of it?',
  right: 'Over-exploitation; Steller’s sea cow',
  wrong: ['Alien species invasion; the Nile perch', 'Co-extinction; a host fish’s parasites', 'Habitat loss; the Amazon rain forest'],
  sol: 'Harvesting faster than a population can recover is over-exploitation, which drove Steller’s sea cow and the passenger pigeon to extinction — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('coext-mcq', mcq({
  stem: 'A fig species is pollinated by only one wasp species. If the wasp became extinct, what would most likely happen to the fig, and what is this called?',
  right: 'The fig would also decline to extinction: co-extinction.',
  wrong: ['The fig would spread faster: competitive release.', 'Nothing would change: commensalism.', 'The fig would become invasive: alien species invasion.'],
  sol: 'An obligate partner of an extinct species is also lost — co-extinction — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('clarias-mcq', mcq({
  stem: 'A fish farmer illegally introduces the African catfish Clarias gariepinus into ponds that drain into a river. What is the main concern for biodiversity?',
  right: 'It may become invasive and threaten the indigenous catfishes of the river.',
  wrong: ['It will pollinate river plants.', 'It will become extinct at once.', 'It will increase the number of native catfish species.'],
  sol: 'Illegal introduction of Clarias gariepinus for aquaculture poses a threat to indigenous catfishes — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('effects-mcq', mcq({
  stem: 'Which is a likely effect of loss of biodiversity in a region?',
  right: 'Lowered resistance to environmental perturbations such as drought',
  wrong: ['A rise in plant production', 'Less variability in pest and disease cycles', 'Greater resistance to alien species'],
  sol: 'Loss of biodiversity lowers plant production, lowers resistance to perturbations and increases variability in ecosystem processes — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('lungs-fill', fill({
  stem: 'The Amazon rain forest is so huge that it is called the “lungs of the ______”.',
  acc: [['planet']],
  sol: 'Planet.',
  d: 1, c: 'recall', t: [2],
}));
add('perch-ar', ar({
  a: 'The introduction of the Nile perch into Lake Victoria led to the extinction of more than 200 species of cichlid fish.',
  r: 'The Nile perch is a native fish that had always lived in Lake Victoria.',
  key: 'c',
  sol: 'A is true; R is false, because the Nile perch was introduced, an alien species that became invasive — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('amphibian-ar', ar({
  a: 'Amphibians appear to be more vulnerable to extinction than many other groups.',
  r: 'Tropical rain forests now cover no more than 6 percent of the Earth’s land surface.',
  key: 'b',
  sol: 'Both statements are true, but the shrinkage of rain forest is a general fact and is not given as the explanation of amphibian vulnerability — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
{
  const p = pct(338, 784);
  add('vert-num', num({
    stem: 'Of 784 extinctions documented by the IUCN in the last 500 years, 338 were vertebrates. What percentage is this? (One decimal place.)',
    value: p, tol: 0.05, unit: '%',
    sol: r`$\dfrac{338}{784} \times 100 \approx ${p}$ percent.`,
    scheme: [[`${p}%`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 43.1 || 'value');
}
{
  const land = 149, now = round(land * 0.06, 2);
  add('forest-num', num({
    stem: `The Earth’s land surface is about ${land} million square kilometres. If tropical rain forests now cover no more than 6 percent of it, what is the maximum area of rain forest left, in million square kilometres?`,
    value: now, tol: 0.01, unit: 'million km²',
    sol: r`$${land} \times \dfrac{6}{100} = ${now}$ million square kilometres.`,
    scheme: [[`${now}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => Math.abs(q.answer.value - 8.94) < 1e-9 || 'value');
}
add('quartet-short', short({
  marks: 3,
  stem: 'A newspaper reports: (i) forest cleared for soya bean farms; (ii) a weed spreading across grazing land; (iii) a parasite lost when its only host fish died out. Name the cause of biodiversity loss in each and give one more textbook example of each cause.',
  model: '(i) **Habitat loss** — e.g. Amazon rain forest cleared for soya beans and cattle; rain forest cover fell from over **14** to under **6 percent** of land.\n\n(ii) **Alien species invasion** — e.g. **Parthenium (carrot grass)**, **Lantana**, **water hyacinth**, or the **Nile perch** in Lake Victoria.\n\n(iii) **Co-extinction** — e.g. a co-evolved **plant and its pollinator**, where loss of one dooms the other.',
  sol: 'Cause and example for each.',
  scheme: [['Habitat loss with example', 1], ['Alien invasion with example', 1], ['Co-extinction with example', 1]],
  d: 2, c: 'application', t: [2],
}));
add('alien-short', short({
  marks: 2,
  stem: 'Why do some introduced species become invasive? Illustrate with an example from an African lake.',
  model: 'An introduced (alien) species often arrives **without its natural predators, parasites or competitors**, so it can multiply unchecked and **outcompete or prey on native species**. The **Nile perch**, introduced into **Lake Victoria**, eventually caused the extinction of more than **200 species of cichlid fish**.',
  sol: 'Reason and example.',
  scheme: [['No natural enemies; native species displaced', 1], ['Nile perch and cichlids', 1]],
  d: 2, c: 'application', t: [2],
}));
add('fragment-short', short({
  marks: 2,
  stem: 'A forest of 100 square kilometres is cut into ten separate patches of 5 square kilometres each, with farms between them. Explain two ways this may reduce biodiversity.',
  model: 'The total forest area has **halved**, so by the species–area relationship **fewer species** can be supported (**habitat loss**). Splitting it into small patches (**fragmentation**) badly affects **mammals and birds needing large territories** and **migratory animals**, which cannot move between patches.',
  sol: 'Habitat loss and fragmentation.',
  scheme: [['Less area: fewer species', 1], ['Fragmentation harms wide-ranging and migratory animals', 1]],
  d: 3, c: 'application', t: [2],
}));
add('effects-short', short({
  marks: 2,
  stem: 'State three effects of loss of biodiversity on an ecosystem.',
  model: '1. A **decline in plant production**.\n2. **Lowered resistance** to environmental perturbations such as **drought**.\n3. **Increased variability** in ecosystem processes such as **plant productivity, water use, and pest and disease cycles**.',
  sol: 'Three effects.',
  scheme: [['Any two effects', 1], ['Third effect', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('loss-long', long({
  stem: 'What is meant by the sixth extinction? Describe the four major causes of biodiversity loss, with examples.',
  model: '**Sixth extinction.** Earth has seen five mass extinctions. The sixth, now in progress, differs because current rates are estimated to be 100 to 1,000 times faster than in pre-human times, and human activities are responsible. The IUCN Red List (2004) documents 784 extinctions in 500 years, including the dodo, quagga, thylacine, Steller’s sea cow and three subspecies of tiger.\n\n**Habitat loss and fragmentation** is the most important cause. Tropical rain forests once covered more than 14 percent of the land surface and now cover no more than 6 percent; the Amazon is cleared for soya beans and cattle. Fragmentation badly affects animals needing large territories and migratory species.\n\n**Over-exploitation** occurs when need turns to greed: Steller’s sea cow and the passenger pigeon were hunted to extinction, and many marine fish are over-harvested.\n\n**Alien species invasions:** the Nile perch introduced into Lake Victoria wiped out more than 200 cichlid species; Parthenium, Lantana and water hyacinth damage Indian ecosystems; the African catfish Clarias gariepinus threatens native catfishes.\n\n**Co-extinctions:** when a species becomes extinct, those associated with it obligatorily also disappear, such as the parasites of an extinct host fish or a co-evolved plant and pollinator.',
  sol: 'Sixth extinction; four causes with examples.',
  scheme: [['Sixth extinction', 1], ['Habitat loss and fragmentation', 1], ['Over-exploitation', 1], ['Alien species', 1], ['Co-extinction', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 conservation
add('pollination-mcq', mcq({
  stem: 'Pollination of crops by bees, bumblebees, birds and bats is an example of which argument for conserving biodiversity?',
  right: 'Broadly utilitarian (ecosystem services)',
  wrong: ['Narrowly utilitarian (direct products)', 'Ethical (intrinsic value)', 'None; it is not a reason for conservation'],
  sol: 'Pollination is an ecosystem service, part of the broadly utilitarian argument — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('exsitu-mcq', mcq({
  stem: 'Which of these is an ex situ method of conservation?',
  right: 'Seed bank',
  wrong: ['National park', 'Sacred grove', 'Biosphere reserve'],
  sol: 'A seed bank keeps material away from the natural habitat; the others protect organisms where they live — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('indiahot-mcq', mcq({
  stem: 'Which of these is NOT one of the biodiversity hotspots that cover India’s rich regions?',
  right: 'The Thar Desert',
  wrong: ['Western Ghats and Sri Lanka', 'Indo-Burma', 'Himalaya'],
  sol: 'India’s rich regions are covered by the Western Ghats and Sri Lanka, Indo-Burma and Himalaya hotspots — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('sacred-mcq', mcq({
  stem: 'Sacred groves that are the last refuges of many rare and threatened plants are found in the Khasi and Jaintia Hills of',
  right: 'Meghalaya',
  wrong: ['Rajasthan', 'Karnataka', 'Madhya Pradesh'],
  sol: 'The Khasi and Jaintia Hills are in Meghalaya; Aravalli groves are in Rajasthan — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('drugs-mcq', mcq({
  stem: 'A pharmaceutical company screens thousands of rainforest plants for compounds that might treat cancer. What is this activity called, and which argument for conservation does it support?',
  right: 'Bioprospecting; the narrowly utilitarian argument',
  wrong: ['Biopiracy; the ethical argument', 'Cryopreservation; the broadly utilitarian argument', 'Fragmentation; the narrowly utilitarian argument'],
  sol: 'Exploring biodiversity for products of economic importance is bioprospecting, a direct (narrowly utilitarian) benefit — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ethical-mcq', mcq({
  stem: 'A rare beetle has no known economic use and no known role in any ecosystem service. Which argument best supports conserving it?',
  right: 'The ethical argument: every species has an intrinsic value.',
  wrong: ['The narrowly utilitarian argument', 'The broadly utilitarian argument', 'No argument supports it.'],
  sol: 'The ethical argument holds that every species has intrinsic value, even if not of current economic value — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cryo-mcq', mcq({
  stem: 'Only a few animals of a rare indigenous cattle breed remain. Which technique would keep its sperm and eggs viable for many years?',
  right: 'Cryopreservation',
  wrong: ['Tissue culture of leaves', 'Declaring a sacred grove', 'Fragmentation of the habitat'],
  sol: 'Cryopreservation keeps gametes of threatened species viable and fertile for long periods — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ramsar-mcq', mcq({
  stem: 'A state government wants international recognition and protection for a large lake and marsh used by migratory birds. Under which agreement could it be designated?',
  right: 'The Ramsar Convention, as a wetland of international importance',
  wrong: ['The Indian Patents Bill', 'The GEAC approval process', 'The Earth Summit seed-bank scheme'],
  sol: 'Ramsar sites are wetlands of international importance designated under the Ramsar Convention — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('reddata-mcq', mcq({
  stem: 'What is the main purpose of the Red Data Book (IUCN Red List)?',
  right: 'To document species threatened with extinction and their conservation status',
  wrong: ['To list all species used as food', 'To record patents on biological resources', 'To list national parks only'],
  sol: 'The Red List records threatened species, such as critically endangered, endangered and vulnerable ones — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('rio-fill', fill({
  stem: 'The historic Convention on Biological Diversity (the Earth Summit) was held at Rio de Janeiro in the year ______.',
  acc: [['1992']],
  sol: '1992.',
  d: 1, c: 'recall', t: [3],
}));
add('bioprospect-tf', tf({
  stem: 'More than 25 percent of the drugs currently sold in the market worldwide are derived from plants.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('hotspot-ar', ar({
  a: 'The Western Ghats and Sri Lanka region is recognised as a biodiversity hotspot.',
  r: 'Hotspots are regions with very high levels of species richness and a high degree of endemism.',
  key: 'a',
  sol: 'Both are true; the region qualifies because it has high species richness and endemism — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
{
  const expected = 1000, saved = Math.round(expected * 0.3);
  add('hotspot-num', num({
    stem: `Strict protection of biodiversity hotspots could reduce ongoing mass extinctions by almost 30 percent. If ${expected} species were expected to disappear without such protection, about how many could be saved?`,
    value: saved,
    sol: r`$${expected} \times \dfrac{30}{100} = ${saved}$ species.`,
    scheme: [[`${saved}`, 1]],
    d: 1, c: 'application', t: [3],
  }), (q) => q.answer.value === 300 || 'value');
}
add('insitu-short', short({
  marks: 3,
  stem: 'Classify each as in situ or ex situ conservation and give the reason: (i) a wildlife sanctuary for elephants; (ii) tissue culture of a rare orchid; (iii) a sacred grove in the Aravalli Hills.',
  model: '(i) **In situ** — elephants are protected **in their natural habitat**.\n\n(ii) **Ex situ** — the orchid is propagated **outside its natural habitat**, in a laboratory.\n\n(iii) **In situ** — the forest and its species are protected **where they occur**, through religious and cultural tradition.',
  sol: 'Natural habitat or not.',
  scheme: [['(i) in situ with reason', 1], ['(ii) ex situ with reason', 1], ['(iii) in situ with reason', 1]],
  d: 2, c: 'application', t: [3],
}));
add('why-short', short({
  marks: 3,
  stem: 'Give the three categories of reasons for conserving biodiversity, with one example of each.',
  model: '**Narrowly utilitarian:** direct products — food, firewood, fibre, industrial products, and **medicines** (more than **25 percent** of drugs sold come from plants).\n\n**Broadly utilitarian:** **ecosystem services** — the Amazon produces about **20 percent** of atmospheric oxygen; **pollination** by bees and birds.\n\n**Ethical:** every species has an **intrinsic value**, and we have a moral duty to pass on our biological legacy.',
  sol: 'Three categories with examples.',
  scheme: [['Narrowly utilitarian with example', 1], ['Broadly utilitarian with example', 1], ['Ethical', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('hotspot-short', short({
  marks: 2,
  stem: 'What are biodiversity hotspots? Name the hotspots that cover India’s rich regions.',
  model: 'Hotspots are regions with **very high species richness** and a **high degree of endemism**. There are **34** worldwide, together covering less than 2 percent of land. India’s rich regions are covered by **Western Ghats and Sri Lanka**, **Indo-Burma** and **Himalaya**.',
  sol: 'Definition and three names.',
  scheme: [['Definition with both features', 1], ['Three hotspots', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('plan-short', short({
  marks: 3,
  stem: 'A tree species is found only in a small hill forest and is threatened by logging. Suggest a conservation plan using both in situ and ex situ methods, and say how its status could be made known internationally.',
  model: '**In situ:** declare the hill forest a **protected area** (national park or sanctuary) or support its protection as a **sacred grove**, stopping logging and protecting its pollinators and dispersers.\n\n**Ex situ:** store its **seeds in a seed bank**, grow plants in a **botanical garden**, and propagate it by **tissue culture**.\n\n**Status:** have it assessed and listed in the **IUCN Red Data Book** as threatened, so it gains conservation priority.',
  sol: 'In situ, ex situ and Red List.',
  scheme: [['In situ measure', 1], ['Ex situ measures', 1], ['Red Data Book listing', 1]],
  d: 3, c: 'application', t: [3],
}));
add('conservation-long', long({
  stem: 'Compare in situ and ex situ conservation of biodiversity, describing the methods used in India and the international commitments made.',
  model: '**In situ (on site) conservation** protects species in their natural habitat, so the whole ecosystem and its biodiversity at all levels are conserved. Biodiversity hotspots, regions of very high species richness and endemism, are priorities; 34 exist, covering under 2 percent of land, and three — Western Ghats and Sri Lanka, Indo-Burma and Himalaya — cover India’s richest regions. India legally protects biosphere reserves, national parks and wildlife sanctuaries. Sacred groves in the Khasi and Jaintia Hills of Meghalaya, the Aravalli Hills of Rajasthan, the Western Ghats of Karnataka and Maharashtra, and Sarguja, Chanda and Bastar in Madhya Pradesh protect forests through tradition. Ramsar sites protect internationally important wetlands, and the IUCN Red Data Book identifies threatened species for priority.\n\n**Ex situ (off site) conservation** removes threatened species to special settings: zoological parks, botanical gardens and wildlife safari parks; cryopreservation of gametes; in vitro fertilisation; tissue culture of plants; and seed banks for commercially important plants. Some animals extinct in the wild survive only in zoos.\n\n**International.** At the Earth Summit in Rio de Janeiro (1992), nations agreed to conserve biodiversity and use it sustainably; at Johannesburg (2002), 190 countries pledged to reduce significantly the rate of biodiversity loss by 2010.',
  sol: 'In situ, ex situ, international.',
  scheme: [['In situ definition and hotspots', 1.5], ['Protected areas, sacred groves, Ramsar, Red Data Book', 1], ['Ex situ methods', 1.5], ['Rio and Johannesburg', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [3],
}));
add('why-long', long({
  stem: 'A city council member argues that money spent on conserving wild species is wasted because only a few species are useful to people. Evaluate this argument using the narrowly utilitarian, broadly utilitarian and ethical reasons for conservation.',
  model: '**Narrowly utilitarian.** The claim underestimates direct benefits. People obtain food, firewood, fibre, construction material and industrial products such as tannins, lubricants, dyes, resins and perfumes from wild species. More than 25 percent of drugs sold today come from plants, and 25,000 plant species are used in traditional medicine. Most species have never been examined, so bioprospecting may yet reveal valuable products in species now thought useless.\n\n**Broadly utilitarian.** Many benefits come as services rather than products. The Amazon forest is estimated to produce about 20 percent of the oxygen in Earth’s atmosphere. Bees, bumblebees, birds and bats pollinate crops, a service that would be very costly to replace. Nature also gives aesthetic pleasure. These benefits depend on many species working together, as the rivet popper hypothesis suggests.\n\n**Ethical.** Every species has an intrinsic value, whether or not it is useful to us, and we have a moral duty to pass on our biological legacy to future generations.\n\n**Judgement.** The argument fails on all three grounds: usefulness is often unknown or indirect, and value is not limited to use, so conservation spending is justified.',
  sol: 'Three arguments applied; judgement.',
  scheme: [['Narrowly utilitarian with examples', 1.5], ['Broadly utilitarian with examples', 1.5], ['Ethical argument', 1], ['Reasoned judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [3],
}));

// ---------------------------------------------------------------- cases
{
  const A = [1, 10, 100, 1000], Sv = [20, 28, 40, 56];
  const z = round(zFrom([A[0], Sv[0]], [A[3], Sv[3]]), 2);
  add('sa-case', mk.case({
    passage: `Ecologists counted bird species in nested areas of a tropical forest region.\n\n| Area (square km) | ${A.join(' | ')} |\n|---|---|---|---|---|\n| Bird species | ${Sv.join(' | ')} |\n\nWhen log S was plotted against log A, the points lay close to a straight line.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Who first described this pattern of species increasing with explored area?',
        right: 'Alexander von Humboldt',
        wrong: ['David Tilman', 'Paul Ehrlich', 'Robert May'],
        sol: 'Humboldt observed that species richness increases with explored area, up to a limit — option (@K).',
        d: 1, c: 'recall', t: [1],
      })),
      part('b', num({
        stem: 'Using the first and last points, calculate the slope Z to two decimal places.',
        value: z, tol: 0.01,
        sol: r`$Z = \dfrac{\log ${Sv[3]} - \log ${Sv[0]}}{\log ${A[3]} - \log ${A[0]}} = \dfrac{\log 2.8}{3} \approx ${z}$.`,
        scheme: [[`${z}`, 1]],
        d: 3, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Is this value typical? What value of Z would you expect if the comparison were made across whole continents?',
        model: `Yes: a Z of about ${z} lies in the usual range of **0.1–0.2** for areas within a region. Across **whole continents** the slope is much **steeper**, about **0.6–1.2**.`,
        sol: 'Within the regional range; continents steeper.',
        scheme: [['Typical regional value 0.1–0.2', 1], ['Continents 0.6–1.2', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Write the species–area equation in its logarithmic form and state what C and Z represent.',
          model: '$\\log S = \\log C + Z \\log A$. where S is species richness and A is area. **C** is the **Y-intercept** of the straight line on log–log axes, and **Z** is its **slope**, also called the **regression coefficient**; it shows how quickly species rise with area.',
          sol: 'Equation and meanings.',
          scheme: [['Equation', 1], ['C intercept, Z slope', 1]],
          d: 1, c: 'recall', t: [1],
        }),
      ]),
    ],
  }), (q) => Math.abs(q.children[1].answer.value - 0.15) < 1e-9 || 'value');
}
{
  const before = 150, after = 60, lost = pct(before - after, before, 0);
  add('lake-case', mk.case({
    passage: `A large tropical lake once held ${before} species of native fish, many found nowhere else. A large predatory fish from another continent was released into the lake to improve commercial fishing. Thirty years later, only ${after} native species could be found.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which cause of biodiversity loss is mainly responsible?',
        right: 'Alien species invasion',
        wrong: ['Co-extinction', 'Habitat fragmentation', 'Over-exploitation of the predator'],
        sol: 'An introduced predator became invasive and eliminated native species — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'What percentage of the native fish species was lost?',
        value: lost, unit: '%',
        sol: r`$\dfrac{${before} - ${after}}{${before}} \times 100 = \dfrac{${before - after}}{${before}} \times 100 = ${lost}$ percent.`,
        scheme: [[`${lost}%`, 1]],
        d: 1, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name a real example of this kind of event in Africa and explain why the introduced fish was so harmful.',
        model: 'The **Nile perch** introduced into **Lake Victoria** led to the extinction of more than **200 cichlid fish species**. As an **alien** species it had **no natural enemies** there and the native fish had no defences against it, so it **multiplied unchecked** and preyed on them.',
        sol: 'Nile perch; no natural enemies.',
        scheme: [['Nile perch and cichlids', 1], ['No natural enemies; unchecked spread', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Some parasites lived only on the native fish that disappeared. What would happen to them, and what is this called?',
          model: 'They would also **become extinct**, because they depended **obligatorily** on their host fish and could not live on any other host. When a species becomes extinct and the species tied to it are lost too, this is called **co-extinction**.',
          sol: 'Co-extinction.',
          scheme: [['Parasites also become extinct', 1], ['Co-extinction', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 60 || 'value');
}
{
  const total = 240, endemic = 36, p = pct(endemic, total, 0);
  add('grove-case', mk.case({
    passage: `A sacred grove in the hills of Meghalaya covers about 2 square kilometres. A botanical survey recorded ${total} plant species, of which ${endemic} are endemic (found nowhere else). Local communities have protected the grove for generations, but a road project now threatens one edge of it.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Protecting the grove where the plants grow is an example of',
        right: 'in situ conservation',
        wrong: ['ex situ conservation', 'cryopreservation', 'bioprospecting'],
        sol: 'Protecting organisms in their natural habitat is in situ conservation — option (@K).',
        d: 1, c: 'understanding', t: [3],
      })),
      part('b', num({
        stem: 'What percentage of the plant species in the grove is endemic?',
        value: p, unit: '%',
        sol: r`$\dfrac{${endemic}}{${total}} \times 100 = ${p}$ percent.`,
        scheme: [[`${p}%`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Suggest two ex situ measures that could act as a backup for the endemic plants.',
        model: 'Collect and store their **seeds in a seed bank**; propagate them by **tissue culture** and grow them in a **botanical garden**, so that they survive even if the grove is damaged.',
        sol: 'Any two ex situ methods.',
        scheme: [['First measure', 1], ['Second measure', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Why are sacred groves especially valuable for conservation in Meghalaya?',
          model: 'They are protected by **religious and cultural tradition**, so all trees and wildlife in them are left undisturbed. In Meghalaya they are the **last refuges** for a large number of **rare and threatened plants**.',
          sol: 'Traditional protection; last refuges.',
          scheme: [['Protected by tradition', 1], ['Last refuges for rare plants', 1]],
          d: 2, c: 'understanding', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 15 || 'value');
}
{
  const n = 250, th = Math.round(n * 0.32);
  add('threat-case', mk.case({
    passage: 'The IUCN reports the share of species facing the threat of extinction in different groups.\n\n| Group | Share threatened (percent) |\n|---|---|\n| Birds | 12 |\n| Mammals | 23 |\n| Amphibians | 32 |\n| Gymnosperms | 31 |',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which group has the largest share of species facing the threat of extinction?',
        right: 'Amphibians',
        wrong: ['Birds', 'Mammals', 'Gymnosperms'],
        sol: 'Amphibians, at 32 percent, have the largest share — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: `If a region has ${n} amphibian species and the global share applies, about how many would face the threat of extinction?`,
        value: th,
        sol: r`$${n} \times \dfrac{32}{100} = ${th}$ species.`,
        scheme: [[`${th}`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'How does the present rate of extinction differ from that of earlier mass extinctions, and who is responsible?',
        model: 'Present rates are estimated to be **100 to 1,000 times faster** than in pre-human times, and this **sixth extinction** is caused by **human activities**, unlike the earlier five.',
        sol: 'Faster and human-caused.',
        scheme: [['100–1,000 times faster', 1], ['Human activities responsible', 1]],
        d: 2, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Give two effects that the loss of many species could have on an ecosystem.',
          model: 'A **decline in plant production**, and **lowered resistance** to perturbations such as **drought**; ecosystem processes such as **water use** and **pest and disease cycles** may also become more **variable**.',
          sol: 'Any two effects.',
          scheme: [['First effect', 1], ['Second effect', 1]],
          d: 1, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 80 || 'value');
}
