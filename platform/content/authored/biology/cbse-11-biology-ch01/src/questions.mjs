// ch01 The Living World — question bank. AR keys: a d c b c b.
import { mk, add, r, svgV } from './lib.mjs';
import { HIER_Q } from './svgs.mjs';
import { DESCRIBED, CAMPUS, GARDEN, gardenMean, gardenGenera, gardenSpecies, BRANCH, DRAWER, REGISTER, Q, CASE, LOCAL_MORE, sharedRank, sharedCount, LIN, RANKS, pct } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const hierFig = svgV(HIER_Q, 'Funnel of the seven categories used to classify the tiger, with five ranks marked A to E');

// ---------------------------------------------------------------- t01 biodiversity, need for classification, three domains
add('steps-mcq', mcq({
  stem: 'A student finds an unfamiliar plant on a trek and works out which already-described species it is by using a field guide. Which of the three linked activities is she carrying out?',
  right: 'Identification',
  wrong: ['Nomenclature', 'Classification of a new kingdom', 'Systematics of a new domain'],
  sol: 'Finding the correct name and position of an organism that is already known is identification — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('described-mcq', mcq({
  stem: 'About how many species of living organisms have been identified and described so far?',
  right: `${DESCRIBED.low}–${DESCRIBED.high} million`,
  wrong: ['17–18 thousand', '170–180 million', '1.7–1.8 billion'],
  sol: `The number of species known and described is about ${DESCRIBED.low} to ${DESCRIBED.high} million — option (@K).`,
  d: 1, c: 'recall', t: [1],
}));
add('local-name-mcq', mcq({
  stem: 'At a regional seed fair, a stall owner and a visitor argue because the same herb is called by one name in the north and by a quite different name in the south. Which need of biology does this situation best illustrate?',
  right: 'A standard name that is used everywhere for each organism',
  wrong: ['A way of making new species in the laboratory', 'A method of counting cells under a microscope', 'A device for measuring the age of fossils'],
  sol: 'Local names vary from place to place, so a standard scientific name is needed; this is one of the aims of nomenclature and classification — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('wall-mcq', mcq({
  stem: 'A microbiologist treats a prokaryote with an enzyme that breaks down peptidoglycan. The cells burst, so their walls must have contained peptidoglycan. To which domain does this organism belong?',
  right: 'Bacteria',
  wrong: ['Archaea', 'Eukarya', 'Both Bacteria and Eukarya'],
  sol: 'Peptidoglycan occurs in bacterial cell walls but not in archaeal walls, and the cell is prokaryotic, so it is a bacterium — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('hotspring-mcq', mcq({
  stem: 'A prokaryote isolated from a boiling, very acidic spring has a cell wall with no peptidoglycan. Which domain is it most likely to belong to?',
  right: 'Archaea',
  wrong: ['Bacteria', 'Eukarya', 'Protista'],
  sol: 'Prokaryotes without peptidoglycan in the wall, living in extreme habitats, are archaea — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('eukarya-mcq', mcq({
  stem: 'Which domain contains all organisms whose cells have a true nucleus and membrane-bound organelles?',
  right: 'Eukarya',
  wrong: ['Bacteria', 'Archaea', 'Monera'],
  sol: 'Cells with a true nucleus and membrane-bound organelles belong to Eukarya — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('woese-mcq', mcq({
  stem: 'The scheme that places all living organisms in three domains was proposed in 1990 by',
  right: 'Carl Woese',
  wrong: ['Carolus Linnaeus', 'Robert Whittaker', 'Ernst Haeckel'],
  sol: 'Carl Woese proposed the three-domain scheme; Linnaeus introduced binomial nomenclature — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('nomenclature-mcq', mcq({
  stem: 'An expedition team gives a standard scientific name to a beetle that has been described but until now had only a local name. This activity is best called',
  right: 'nomenclature',
  wrong: ['identification of a new kingdom', 'a revision of the domains', 'field sampling'],
  sol: 'Giving a standard name to an organism is nomenclature — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('kingdoms-mcq', mcq({
  stem: 'A teacher says, “All the protists, fungi, plants and animals of the world fall under one domain.” Which domain is she describing?',
  right: 'Eukarya',
  wrong: ['Bacteria', 'Archaea', 'Prokarya'],
  sol: 'Protista, Fungi, Plantae and Animalia are the four kingdoms of the domain Eukarya — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('domains-ar', ar({
  a: 'Archaea and bacteria are placed in different domains although both are prokaryotes.',
  r: 'The cell walls of archaea lack peptidoglycan, which is present in the cell walls of bacteria.',
  key: 'a',
  sol: 'Both statements are true, and the difference in wall chemistry is one of the reasons for placing them in separate domains — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('archaea-tf', tf({
  stem: 'Archaea have a true nucleus and membrane-bound organelles.',
  key: 'f',
  sol: 'False: archaea are prokaryotes, with no true nucleus and no membrane-bound organelles.',
  d: 1, c: 'recall', t: [1],
}));
add('domain-fill', fill({
  stem: 'Organisms whose cells have a true nucleus belong to the domain ______.',
  acc: [['Eukarya', 'Eukaryota', 'eukarya']],
  sol: 'Eukarya.',
  d: 1, c: 'recall', t: [1],
}));
add('three-fill', fill({
  stem: 'Finding the correct name and position of an organism is called ______.',
  acc: [['identification', 'Identification']],
  sol: 'Identification.',
  d: 1, c: 'recall', t: [1],
}));
add('eukarya-ar', ar({
  a: 'Archaea belong to the domain Eukarya.',
  r: 'The cell walls of archaea lack peptidoglycan.',
  key: 'd',
  sol: 'A is false: archaea are prokaryotes and form their own domain, Archaea. R is true: archaeal cell walls lack peptidoglycan — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('need-ar', ar({
  a: 'Classification helps a biologist to place a newly discovered organism.',
  r: `The number of species that are known and described is about ${DESCRIBED.low} to ${DESCRIBED.high} million.`,
  key: 'b',
  sol: 'Both are true, but the count of described species does not explain how classification places a new organism; it works by comparing the new organism’s characters with those of known groups — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('campus-num', num({
  stem: `A school’s biodiversity register lists ${CAMPUS.total} species on its campus: ${CAMPUS.Plants} plants, ${CAMPUS.Insects} insects, ${CAMPUS.Birds} birds and ${CAMPUS.Others} others. What percentage of the species are birds?`,
  value: CAMPUS.birdPct, unit: 'percent',
  sol: r`$\dfrac{${CAMPUS.Birds}}{${CAMPUS.total}} \times 100 = ${CAMPUS.birdPct}$ percent.`,
  scheme: [[`${CAMPUS.birdPct} percent`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 12.5 || 'value');
add('pond-num', num({
  stem: `A pond survey records ${Q.pond.Fish} fish species, ${Q.pond.Insects} insect species, ${Q.pond.Plants} plant species and ${Q.pond.Algae} algal species. What percentage of the species recorded are insects?`,
  value: Q.pond.insectPct, unit: 'percent',
  sol: r`Total $= ${Q.pond.Fish} + ${Q.pond.Insects} + ${Q.pond.Plants} + ${Q.pond.Algae} = ${Q.pond.total}$; $\dfrac{${Q.pond.Insects}}{${Q.pond.total}} \times 100 = ${Q.pond.insectPct}$ percent.`,
  scheme: [['Total species', 0.5], [`${Q.pond.insectPct} percent`, 0.5]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 42 || 'value');
add('register-num', num({
  stem: `Taking the number of described species as ${REGISTER.described} (1.75 million), a museum holds a reference collection of ${REGISTER.held} species. What percentage of all described species does the collection cover?`,
  value: REGISTER.pct, tol: 0.01, unit: 'percent',
  sol: r`$\dfrac{${REGISTER.held}}{${REGISTER.described}} \times 100 = ${REGISTER.pct}$ percent.`,
  scheme: [[`${REGISTER.pct} percent`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 0.2 || 'value');
add('need-short2', short({
  marks: 2,
  stem: 'A hospital lab and a village health worker use two different local names for the same medicinal herb, and a patient is given the wrong herb. Which feature of classification would have prevented the mix-up? Explain briefly.',
  model: 'A **standard scientific name** for each organism, which is the same everywhere, would have removed the confusion caused by **local names that differ** from place to place and language to language. Classification also lets the herb be **identified** and placed in its group, so close relatives can be told apart.',
  sol: 'Standard name; local names differ.',
  scheme: [['Standard scientific name used everywhere', 1], ['Local names differ and cause confusion', 1]],
  d: 2, c: 'application', t: [1],
}));
add('steps-short2', short({
  marks: 2,
  stem: 'Distinguish between identification and nomenclature.',
  model: '**Identification** is finding the **correct name and position** of an organism, that is, deciding which known organism it is. **Nomenclature** is the **naming** of organisms, giving each a standard name.',
  sol: 'One point for each.',
  scheme: [['Identification: correct name and position', 1], ['Nomenclature: naming', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('domain-short2', short({
  marks: 2,
  stem: 'Archaea and bacteria are both prokaryotes. State two ways in which archaea differ from bacteria.',
  model: 'The **cell wall of archaea lacks peptidoglycan**, which is present in the wall of bacteria. Many archaea live in **extreme habitats**, such as very salty water, hot acidic springs and oxygen-free swamps; their membrane lipids and ribosomal RNA also differ from those of bacteria.',
  sol: 'Wall chemistry and habitat.',
  scheme: [['No peptidoglycan in the wall', 1], ['Extreme habitats or other difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('benefits-short3', short({
  marks: 3,
  stem: 'A museum is planning a new gallery of 2000 preserved animals. Explain three ways in which classifying the specimens will help visitors and researchers.',
  model: '**First,** grouping specimens by similarities makes a **large number of organisms easy to study**, because one example can represent a group. **Second,** each specimen carries a **standard scientific name**, so researchers in different countries know which organism is meant. **Third,** the groups show **which organisms are close relatives**, and a **newly collected specimen** can be placed by comparing its characters with known groups.',
  sol: 'Three benefits.',
  scheme: [['Easy study of many organisms', 1], ['Standard names', 1], ['Relationships and placing new organisms', 1]],
  d: 2, c: 'application', t: [1],
}));
add('domains-short3', short({
  marks: 3,
  stem: 'Name the three domains of life and state one distinguishing feature of each.',
  model: 'Life is placed in three domains. **Bacteria:** prokaryotes, with no true nucleus, and with **peptidoglycan** in the cell wall; they live almost everywhere. **Archaea:** prokaryotes whose cell walls **lack peptidoglycan**; many live in extreme habitats such as very salty water or hot springs. **Eukarya:** organisms with a **true nucleus** and membrane-bound organelles, including the protists, fungi, plants and animals.',
  sol: 'Three domains with features.',
  scheme: [['Bacteria with feature', 1], ['Archaea with feature', 1], ['Eukarya with feature', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('domains-long', long({
  stem: 'Describe the three domains of life. Compare their cell structure, cell walls and habitats, name the groups that fall under Eukarya, and say who proposed the scheme.',
  model: '**Scheme.** Carl Woese proposed in 1990 that living organisms be placed in three domains, Bacteria, Archaea and Eukarya, mainly because of differences in ribosomal RNA and in cell chemistry.\n\n**Bacteria.** These are prokaryotes: the cell has no true nucleus and no membrane-bound organelles. The cell wall contains peptidoglycan. Bacteria live almost everywhere, in soil, water and bodies of other organisms.\n\n**Archaea.** These are also prokaryotes, but the cell wall lacks peptidoglycan and the membrane lipids differ from those of bacteria. Many archaea live in extreme habitats, such as very salty water (halophiles), hot acidic springs (thermoacidophiles) and oxygen-free swamps (methanogens).\n\n**Eukarya.** These cells have a true nucleus and membrane-bound organelles. The domain includes the four kingdoms Protista, Fungi, Plantae and Animalia.\n\n**Comparison.** Bacteria and Archaea resemble each other in lacking a nucleus but differ in wall chemistry and habitat; both differ from Eukarya in cell organisation.',
  sol: 'Scheme; each domain; comparison.',
  scheme: [['Woese, 1990; three names', 1], ['Bacteria: prokaryote, peptidoglycan', 1], ['Archaea: prokaryote, no peptidoglycan, extreme habitats', 1.5], ['Eukarya: nucleus; four kingdoms', 1], ['Comparison', 0.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('need-long', long({
  stem: 'A student argues: “Computers can store a billion names, so classification is a waste of time; giving every species its own random code would be enough.” Evaluate this claim, using the purposes of identification, nomenclature and classification, and say what such a system would lose.',
  model: '**What the claim gets right.** A computer can store and search a huge number of names, so a list of codes could record every species and avoid confusion between local names.\n\n**What it misses.** Classification does more than store names. It **groups organisms by similarities**, so a few examples can represent a group and the study of about 1.7 to 1.8 million known species becomes manageable. Groups show **which organisms are close relatives**, so a new organism can be **identified and placed** by comparing its characters, and what is learned about one member can be applied to others. A random code carries no such information.\n\n**What would be lost.** Nomenclature gives a **meaningful standard name**, and in binomial names the genus itself tells us the nearest relatives. With random codes biologists could not predict the features of a newly found organism, compare groups or study relationships (systematics).\n\n**Judgement.** The claim is not sound. Storage is not the aim of classification; understanding diversity is. Codes may help to *record* species, but they cannot replace grouping and meaningful names.',
  sol: 'Fair point; what is missed; what is lost; judgement.',
  scheme: [['Acknowledges storage and search', 1], ['Grouping, study and relatives', 1.5], ['Placing a new organism; loss of meaning in names', 1.5], ['Reasoned judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [1],
}));

// ---------------------------------------------------------------- t02 taxonomy, systematics and the hierarchy
add('systematics-mcq', mcq({
  stem: 'Which term covers the identification, naming and classification of organisms and, in addition, the study of their evolutionary relationships?',
  right: 'Systematics',
  wrong: ['Taxonomy', 'Nomenclature', 'Identification'],
  sol: 'Taxonomy deals with identification, naming and classification; systematics is wider and includes relationships among organisms — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('rank-order-mcq', mcq({
  stem: 'Which category lies immediately above the genus in the taxonomic hierarchy?',
  right: 'Family',
  wrong: ['Species', 'Order', 'Class'],
  sol: 'The order of the categories from the lowest is species, genus, family, order, class, phylum or division, kingdom; related genera form a family — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('shared-rank-mcq', mcq({
  stem: `A potato plant (*Solanum tuberosum*) and a chilli plant (*Capsicum annuum*) are compared. What is the lowest taxonomic category that includes both?`,
  right: sharedRank('Solanum tuberosum', 'Capsicum annuum'),
  wrong: ['Genus', 'Species', 'Order'],
  sol: `The genera differ (Solanum and Capsicum), but both are in the family ${LIN['Solanum tuberosum'].Family}, so the lowest shared category is the family — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('genus-mcq', mcq({
  stem: 'A botanist notes that three plants differ as species but share many more characters with one another than with any other plant she has studied. Which taxonomic category is she most likely describing?',
  right: 'Genus',
  wrong: ['Family', 'Order', 'Kingdom'],
  sol: 'A genus is a group of related species with more characters in common with each other than with species of other genera — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('taxon-mcq', mcq({
  stem: 'A newspaper article says “the cat family, Felidae, is a taxon”. Which statement shows the correct use of the word taxon?',
  right: 'A taxon is a group of organisms placed in any taxonomic category, so Felidae is a taxon at the rank of family.',
  wrong: ['A taxon is the lowest category of classification, so Felidae is a species.', 'A taxon is the scientific name of one species, so Felidae is a name.', 'A taxon is a place where organisms are kept, so Felidae is a museum.'],
  sol: 'Any group of organisms placed in a category, whatever its rank, is a taxon — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('upward-mcq', mcq({
  stem: 'Moving up the hierarchy from genus to order, what happens to the number of organisms in a category and the characters they share?',
  right: 'More organisms are included, and they share fewer characters.',
  wrong: ['Fewer organisms are included, and they share more characters.', 'More organisms are included, and they share more characters.', 'Fewer organisms are included, and they share fewer characters.'],
  sol: 'Higher categories include more organisms with fewer characters in common — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('division-mcq', mcq({
  stem: 'A botany student and a zoology student both write the fifth step above species. Which pair of words is correct for them?',
  right: 'Botany: division; zoology: phylum',
  wrong: ['Botany: phylum; zoology: division', 'Botany: class; zoology: order', 'Botany: division; zoology: division'],
  sol: 'The category above class is called division in plants and phylum in animals — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('species-mcq', mcq({
  stem: 'Two groups of finches live on different islands and look alike. When brought together in an aviary, they do not mate with each other, but members of each group mate freely and raise fertile young. By the biological species concept, the two groups are',
  right: 'separate species, because they are reproductively isolated',
  wrong: ['one species, because they look alike', 'one species, because they live in the same aviary', 'separate genera, because they live on different islands'],
  sol: 'Members of a species interbreed with each other and are reproductively isolated from other species, so these are two species — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('lineage-mcq', mcq({
  stem: `A zoo keeper says the tiger (*Panthera tigris*) is “more closely related” to the lion (*Panthera leo*) than to the domestic cat (*Felis catus*). Which taxonomic evidence supports her?`,
  right: 'The tiger and the lion share the genus, while the tiger and the cat share only the family.',
  wrong: ['The tiger and the lion share the species, while the cat does not.', 'The tiger and the cat share the genus, while the lion does not.', 'The three animals belong to three different orders.'],
  sol: `The tiger and the lion share every rank down to genus (${sharedRank('Panthera tigris', 'Panthera leo')}), whereas the tiger and the cat share only down to ${sharedRank('Panthera tigris', 'Felis catus').toLowerCase()} — option (@K).`,
  d: 3, c: 'application', t: [2],
}));
add('fig-family-mcq', mcq({
  stem: 'The figure shows the categories used to classify the tiger, with five of them marked A to E. The domestic cat, Felis catus, belongs to a different genus from the tiger but to the same family. Which letter marks the lowest category that includes both animals?',
  right: 'D',
  wrong: ['B', 'C', 'E'],
  sol: 'A is phylum, B class, C order, D family and E genus. The tiger and the cat differ in genus (E) but share the family (D) — option (@K).',
  d: 3, c: 'application', t: [2],
  assets: [hierFig],
}));
add('fig-order-mcq', mcq({
  stem: 'In the same figure, the dog, Canis familiaris, belongs to a different family from the tiger but is placed with it in several higher categories. Which letter marks the lowest category that includes both the tiger and the dog?',
  right: 'C',
  wrong: ['A', 'D', 'E'],
  sol: 'The tiger (Felidae) and the dog (Canidae) differ in family (D) but share the order Carnivora, marked C — option (@K).',
  d: 3, c: 'application', t: [2],
  assets: [hierFig],
}));
add('fig-phylum-mcq', mcq({
  stem: 'In the same figure, which letter marks the category that botanists call a division when they classify plants?',
  right: 'A',
  wrong: ['B', 'C', 'D'],
  sol: 'A marks the phylum, the category called division in plants — option (@K).',
  d: 2, c: 'understanding', t: [2],
  assets: [hierFig],
}));
add('ranks-ar', ar({
  a: 'A family can contain several genera.',
  r: 'A genus is a group of related families.',
  key: 'c',
  sol: 'A is true: a family is a group of related genera. R is false: a genus is a group of related species — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('species-ar', ar({
  a: 'Two individuals that clearly share the fundamental characters of one species can still be placed in different genera.',
  r: 'A genus is a group of related species.',
  key: 'd',
  sol: 'A is false: individuals of one species belong to the same genus, since the genus is the group of related species that includes it. R is true — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('hierarchy-tf', tf({
  stem: 'In the hierarchy of categories, a class includes several related orders, and several classes form a phylum or division.',
  key: 't',
  sol: 'True: related orders form a class and related classes form a phylum or division.',
  d: 1, c: 'recall', t: [2],
}));
add('order-fill', fill({
  stem: 'A group of related families is placed in a taxonomic category called an ______.',
  acc: [['order', 'Order']],
  sol: 'Order.',
  d: 1, c: 'recall', t: [2],
}));
add('basic-fill', fill({
  stem: 'The lowest taxonomic category, a group of individuals with fundamental similarities, is the ______.',
  acc: [['species', 'Species']],
  sol: 'Species.',
  d: 1, c: 'recall', t: [2],
}));
add('rank-match', match({
  stem: 'A teacher describes four taxonomic categories. Match each category (column I) with its description (column II).',
  pairs: [
    ['Genus', 'A group of related species'],
    ['Family', 'A group of related genera'],
    ['Order', 'A group of related families'],
    ['Class', 'A group of related orders'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Genus: related species; family: related genera; order: related families; class: related orders.',
  d: 1, c: 'understanding', t: [2],
}));
add('shared-count-num', num({
  stem: `Of the seven obligatory categories, how many are shared (that is, the organisms fall in the same taxon) by a tiger (*Panthera tigris*, Felidae, Carnivora) and a dog (*Canis familiaris*, Canidae, Carnivora)? Both are mammals in the phylum Chordata.`,
  value: sharedCount('Panthera tigris', 'Canis familiaris'),
  sol: 'They differ in species, genus and family. They share the order, class, phylum and kingdom: 4 categories.',
  scheme: [['4 categories', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 4 || 'value');
add('branch-num', num({
  stem: `In an imaginary insect group, every genus has ${BRANCH.speciesPerGenus} species, every family has ${BRANCH.generaPerFamily} genera and every order has ${BRANCH.familiesPerOrder} families. How many species does one order contain?`,
  value: BRANCH.speciesPerOrder,
  sol: r`Species per family $= ${BRANCH.speciesPerGenus} \times ${BRANCH.generaPerFamily} = ${BRANCH.speciesPerFamily}$; species per order $= ${BRANCH.speciesPerFamily} \times ${BRANCH.familiesPerOrder} = ${BRANCH.speciesPerOrder}$.`,
  scheme: [['Species per family', 0.5], [`${BRANCH.speciesPerOrder} species`, 0.5]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 120 || 'value');
add('drawer-num', num({
  stem: `A museum drawer holds ${DRAWER.specimens} beetle specimens that belong to ${DRAWER.genera} genera, with the same number of specimens in each genus. How many specimens belong to each genus?`,
  value: DRAWER.perGenus,
  sol: r`$\dfrac{${DRAWER.specimens}}{${DRAWER.genera}} = ${DRAWER.perGenus}$ specimens per genus.`,
  scheme: [[`${DRAWER.perGenus} specimens`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 30 || 'value');
add('hill-num', num({
  stem: `A survey of a hill forest finds ${Q.hill.genera} genera of orchids with ${Q.hill.speciesPerGenus} species in each genus. How many orchid species does the survey record?`,
  value: Q.hill.species,
  sol: r`$${Q.hill.genera} \times ${Q.hill.speciesPerGenus} = ${Q.hill.species}$ species.`,
  scheme: [[`${Q.hill.species} species`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 60 || 'value');
add('garden-num', num({
  stem: `A garden records species in five genera: ${GARDEN.map(([g, n]) => `${g} ${n}`).join(', ')}. What is the mean number of species per genus?`,
  value: gardenMean,
  sol: r`Species $= ${GARDEN.map(([, n]) => n).join(' + ')} = ${gardenSpecies}$; genera $= ${gardenGenera}$; mean $= \dfrac{${gardenSpecies}}{${gardenGenera}} = ${gardenMean}$.`,
  scheme: [['Total species', 0.5], [`Mean ${gardenMean}`, 0.5]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 3 || 'value');
add('taxon-short2', short({
  marks: 2,
  stem: 'Define the terms taxon and taxonomic category, using the family Felidae as an example.',
  model: 'A **taxonomic category** is a rank in the hierarchy, such as species, genus or family; each is a unit of classification. A **taxon** is a group of organisms placed in a category: **Felidae**, the group of cats, is a taxon at the rank of **family**.',
  sol: 'Category versus taxon.',
  scheme: [['Taxonomic category: a rank', 1], ['Taxon: group placed in it; Felidae at family rank', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('species-short2', short({
  marks: 2,
  stem: 'A farmer says a mule must be a species because it looks like a horse and a donkey. Using the idea of a species, explain why this is not enough to call it one.',
  model: 'A species is a group of individuals with **fundamental similarities** that can be **distinguished from other species**, and its members **interbreed to produce fertile offspring** while being **reproductively isolated** from other species. A mule is a hybrid that cannot normally produce fertile young by itself, so it fails the interbreeding test.',
  sol: 'Species definition; fertile offspring test.',
  scheme: [['Species idea: similarities, distinct, interbreeding', 1], ['Mule fails the fertile-offspring test', 1]],
  d: 3, c: 'application', t: [2],
}));
add('upward-short2', short({
  marks: 2,
  stem: 'A student says, “Order has more characters in common than genus, since it is bigger.” Correct this statement.',
  model: 'The statement is wrong. Going **up** the hierarchy a category includes **more organisms**, but they share **fewer** characters. A genus holds closely related species with **many characters in common**, whereas an order holds several families that share **only a few** features.',
  sol: 'Fewer characters at higher ranks.',
  scheme: [['Higher category: more organisms, fewer shared characters', 1], ['Genus versus order comparison', 1]],
  d: 2, c: 'application', t: [2],
}));
add('ranks-short3', short({
  marks: 3,
  stem: 'Define genus, family and order, and name the category formed by a group of related orders.',
  model: '**Genus:** a group of related species that have more characters in common with each other than with species of other genera. **Family:** a group of related genera. **Order:** a group of related families. A group of related orders forms a **class**.',
  sol: 'Three definitions and class.',
  scheme: [['Genus', 1], ['Family and order', 1], ['Class', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('taxsys-short3', short({
  marks: 3,
  stem: 'Distinguish between taxonomy and systematics. Say where the word systematics comes from.',
  model: '**Taxonomy** is the science of **identifying, naming and classifying** organisms. **Systematics** is the **wider study of the diversity** of organisms and of the **relationships**, including evolutionary relationships, among them. The word comes from the Latin **systema**, a systematic arrangement; Linnaeus used it in **Systema Naturae**.',
  sol: 'Taxonomy; systematics; origin.',
  scheme: [['Taxonomy', 1], ['Systematics includes relationships', 1], ['Origin of the word', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('shared-short3', short({
  marks: 3,
  stem: `The tiger (*Panthera tigris*) and the housefly (*Musca domestica*) are both animals. Using their classification, explain why a tiger is much more closely related to a lion than to a housefly, and name the lowest category the tiger and housefly share.`,
  model: `The tiger and the lion are placed together in the same **genus (Panthera)** and therefore in every higher category as well, so they share **six of the seven** categories (every one except species). The tiger and the housefly differ in class (Mammalia and Insecta) and phylum (Chordata and Arthropoda); they share only the **kingdom Animalia**, the lowest category they have in common. A pair that shares **more categories** at lower levels has **more characters in common** and is more closely related.`,
  sol: 'Shared genus; different phylum; kingdom shared.',
  scheme: [['Tiger and lion share genus and every higher rank', 1], ['Tiger and housefly differ in class and phylum', 1], ['Kingdom is the lowest shared; more shared ranks, closer relatives', 1]],
  d: 3, c: 'application', t: [2],
}));
add('hierarchy-long', long({
  stem: 'Describe the taxonomic hierarchy. Name the seven categories in order, define each, show how the human is classified and explain what happens to the number of organisms and the characters they share as we move up the hierarchy.',
  model: '**Meaning.** Classification is carried out in steps called taxonomic categories, or ranks. Each category is a unit of classification, and a group of organisms placed in a category is a taxon. The categories form a hierarchy: **species, genus, family, order, class, phylum (called division in plants) and kingdom**.\n\n**Categories.** A **species** is a group of individuals with fundamental similarities, distinct from other species. A **genus** is a group of related species with more characters in common than with other genera. A **family** is a group of related genera, an **order** a group of related families, a **class** a group of related orders, a **phylum or division** a group of related classes, and a **kingdom** includes all the phyla or divisions of one great group.\n\n**Example.** The human: species sapiens, genus Homo, family Hominidae, order Primata, class Mammalia, phylum Chordata, kingdom Animalia.\n\n**Pattern.** Going **up**, each category includes **more organisms that share fewer characters**; going **down**, it includes **fewer organisms that share more characters**. So the species is the most specific category and the kingdom the broadest.\n\n*Diagram:* a funnel or ladder of the seven categories labelled with the human example.',
  sol: 'Order; definitions; example; pattern; diagram.',
  scheme: [['Seven categories in order', 1], ['Definitions', 1.5], ['Human example', 1], ['Pattern up and down', 1], ['Labelled diagram', 0.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('lineage-long', long({
  stem: `A seed bank labels three plants: potato (*Solanum tuberosum*), brinjal (*Solanum melongena*) and rice (*Oryza sativa*). Using taxonomic categories, compare how closely the three are related, state the lowest category each pair shares, and explain what the genus name tells a farmer.`,
  model: `**Potato and brinjal.** They have the same genus **Solanum**, so they are placed together in the genus, the family (Solanaceae), the order (Solanales), the class (Dicotyledonae), the division (Angiospermae) and the kingdom (Plantae). The **lowest shared category is the genus**; they differ only in the species epithet.\n\n**Potato and rice.** They differ in genus, family (Solanaceae and Poaceae), order (Solanales and Poales) and class (Dicotyledonae and Monocotyledonae). They share only the **division Angiospermae** and the kingdom Plantae, so the lowest shared category is the **division**.\n\n**Brinjal and rice.** The same as for potato and rice, because brinjal and potato are in the same genus.\n\n**Meaning of the genus.** The genus is a group of related species with many characters in common, so a farmer who knows how potato grows can **expect brinjal to have similar needs and similar problems**, and the farmer will find rice a very different plant.\n\n**Conclusion.** Potato and brinjal are close relatives; rice is a distant relative of both.`,
  sol: 'Pairs with shared categories; meaning of genus; conclusion.',
  scheme: [['Potato and brinjal share genus and everything above', 1.5], ['Potato or brinjal and rice share division only', 1.5], ['What the genus tells a farmer', 1], ['Conclusion', 1]],
  wl: [80, 240],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 binomial nomenclature
add('name-write-mcq', mcq({
  stem: 'Which of the following is the correct way to write the scientific name of the potato in a printed book?',
  right: '*Solanum tuberosum*',
  wrong: ['*solanum tuberosum*', '*Solanum Tuberosum*', '*SOLANUM TUBEROSUM*'],
  sol: 'The genus starts with a capital letter and the species epithet is all small letters, both in italics when printed — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('code-mcq', mcq({
  stem: 'A student is asked to name a newly discovered tree frog and a newly discovered orchid. Which pair of codes must she follow?',
  right: 'ICZN for the frog and ICBN for the orchid',
  wrong: ['ICBN for the frog and ICZN for the orchid', 'ICBN for both', 'ICZN for both'],
  sol: 'Animals are named under the ICZN and plants under the ICBN — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('author-mcq', mcq({
  stem: 'A herbarium label reads Mangifera indica Linn. What does Linn. show?',
  right: 'The abbreviated name of the scientist who named the species, written in ordinary type',
  wrong: ['The abbreviated name of the habitat of the species, written in italics', 'The family of the species, written in capitals', 'The place where the specimen was collected'],
  sol: 'The author’s abbreviated name (Linn. for Linnaeus) follows the species epithet — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('hand-mcq', mcq({
  stem: 'A student copies the name Panthera tigris into her notebook with a pen. How should she mark it to follow the rules?',
  right: 'Underline Panthera and tigris separately',
  wrong: ['Underline both words together with one line', 'Write both words in capital letters', 'Put the species epithet in brackets'],
  sol: 'In handwriting, each word of a scientific name is underlined separately to stand for italics — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('genus-first-mcq', mcq({
  stem: 'In the name Oryza sativa, which word is the species epithet and how is its first letter written?',
  right: 'sativa, with a small first letter',
  wrong: ['sativa, with a capital first letter', 'Oryza, with a capital first letter', 'Oryza, with a small first letter'],
  sol: 'The second word is the species epithet and is written entirely in small letters — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('linnaeus-mcq', mcq({
  stem: 'The two-word system in which the first word is the genus and the second the species epithet was introduced by',
  right: 'Carolus Linnaeus',
  wrong: ['Carl Woese', 'Charles Darwin', 'Gregor Mendel'],
  sol: 'Binomial nomenclature was introduced by Carolus Linnaeus — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('relatives-mcq', mcq({
  stem: 'A farmer notices that two crop plants are named Solanum tuberosum and Solanum melongena. What can he conclude from the names alone?',
  right: 'The two plants belong to the same genus and so are related species.',
  wrong: ['The two plants are the same species with two names.', 'The two plants belong to different genera of one species.', 'The two plants cannot be related, because their second words differ.'],
  sol: 'The first word, the genus, is the same, so the plants are related species of one genus — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('name-ar', ar({
  a: 'The scientific name of a species is the same in every country.',
  r: 'Scientific names are in Latin or Latinised form and follow international codes.',
  key: 'a',
  sol: 'Both are true, and R explains A: the common Latin form and the international codes keep each name the same everywhere — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('capital-ar', ar({
  a: 'In Homo sapiens the word sapiens begins with a small letter.',
  r: 'The genus is written with a small first letter and the species epithet with a capital.',
  key: 'c',
  sol: 'A is true. R is false: the genus starts with a capital letter and the species epithet is all small — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('epithet-tf', tf({
  stem: 'In the scientific name Triticum aestivum, the word aestivum is the genus and starts with a capital letter.',
  key: 'f',
  sol: 'False: aestivum is the species epithet and is written in small letters; Triticum is the genus.',
  d: 1, c: 'understanding', t: [3],
}));
add('linn-fill', fill({
  stem: 'Binomial nomenclature was introduced by Carolus ______.',
  acc: [['Linnaeus', 'linnaeus']],
  sol: 'Linnaeus.',
  d: 1, c: 'recall', t: [3],
}));
add('icbn-fill', fill({
  stem: 'The International Code of Zoological Nomenclature is abbreviated ______.',
  acc: [['ICZN', 'iczn']],
  sol: 'ICZN.',
  d: 1, c: 'recall', t: [3],
}));
add('rules-short2', short({
  marks: 2,
  stem: 'State any four rules for writing a scientific name.',
  model: 'Names are in **Latin** or Latinised form. In print both words are in **italics**; in handwriting each word is **underlined separately**. The **genus starts with a capital** letter, and the **species epithet is all small** letters. The **author’s abbreviated name** follows in ordinary type.',
  sol: 'Any four rules.',
  scheme: [['Two rules', 1], ['Two more rules', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('wrongname-short2', short({
  marks: 2,
  stem: 'A student writes the name of the housefly as “musca Domestica”. Identify the two mistakes and write the name correctly for a printed page.',
  model: 'The **genus** Musca must start with a **capital** letter, and the **species epithet** domestica must be written in **small** letters. Correct form, in italics: ***Musca domestica***.',
  sol: 'Two mistakes and the correct name.',
  scheme: [['Both mistakes identified', 1], ['Correct italic form', 1]],
  d: 2, c: 'application', t: [3],
}));
add('why-short2', short({
  marks: 2,
  stem: 'The brinjal is called eggplant in some countries and by many other names in Indian languages. Why do biologists still write Solanum melongena in research papers?',
  model: 'The **scientific name** is **the same in every country and language**, so scientists everywhere know exactly which plant is meant. **Local names** differ from region to region and can cause confusion.',
  sol: 'Universal name versus local names.',
  scheme: [['Scientific name same everywhere', 1], ['Local names differ and confuse', 1]],
  d: 2, c: 'application', t: [3],
}));
add('hand-short2', short({
  marks: 2,
  stem: 'How is the scientific name Mangifera indica written (a) in a printed book and (b) in a student’s handwritten answer?',
  model: '(a) In print the two words are written in **italics**: *Mangifera indica*. (b) When handwritten, **each word is underlined separately**. In both cases the genus has a **capital** first letter and the species epithet is in **small** letters.',
  sol: 'Italics; separate underlines.',
  scheme: [['Italics in print', 1], ['Separate underlines by hand; capital rule', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('rules-short3', short({
  marks: 3,
  stem: 'Explain, with the example of the tiger, Panthera tigris, three rules of binomial nomenclature.',
  model: 'First, the name has **two words**: the **genus** *Panthera* and the **species epithet** *tigris*. Second, the **genus starts with a capital** letter and the **epithet is entirely in small letters**. Third, the words are in **Latin or Latinised** form and printed in **italics**; handwritten, each word is **underlined separately**.',
  sol: 'Three rules with the example.',
  scheme: [['Two words: genus and epithet', 1], ['Capital and small letters', 1], ['Latin, italics or underlining', 1]],
  d: 2, c: 'application', t: [3],
}));
add('codes-short3', short({
  marks: 3,
  stem: 'Two new species are found in a forest, a fern and a beetle. Name the code that governs the naming of each, say who introduced the two-word system, and say what the first word of each name will represent.',
  model: 'The **fern**, being a plant, is named under the **ICBN**, the International Code of Botanical Nomenclature, and the **beetle**, being an animal, under the **ICZN**, the International Code of Zoological Nomenclature. The two-word system, **binomial nomenclature**, was introduced by **Carolus Linnaeus**. In each name the **first word will be the genus**, written with a capital letter, and the second the species epithet.',
  sol: 'Codes, Linnaeus, genus.',
  scheme: [['ICBN for the fern and ICZN for the beetle', 1], ['Linnaeus', 1], ['First word is the genus', 1]],
  d: 2, c: 'application', t: [3],
}));
add('nomenclature-long', long({
  stem: 'Explain binomial nomenclature. State who introduced it, the codes that govern it, the rules for writing a scientific name with examples of correct and wrong forms, and why it is important.',
  model: '**Meaning.** In binomial nomenclature every species has a scientific name of two words: the genus followed by the species epithet. It was introduced by Carolus Linnaeus.\n\n**Codes.** The naming of plants is governed by the International Code of Botanical Nomenclature (ICBN) and the naming of animals by the International Code of Zoological Nomenclature (ICZN).\n\n**Rules.** Names are in Latin or Latinised form. In print they are in italics; when handwritten, each word is underlined separately. The genus starts with a capital letter and the species epithet is entirely in small letters. The abbreviated name of the author may follow the species epithet in ordinary type.\n\n**Examples.** Correct: *Mangifera indica* Linn., *Panthera tigris*. Wrong: *mangifera indica* (genus without a capital), *Panthera Tigris* (epithet with a capital), *PANTHERA TIGRIS* (both in capitals).\n\n**Importance.** Local names vary from place to place, so a standard scientific name that is the same in every country removes confusion. The genus word also shows which species are closely related.',
  sol: 'Meaning; codes; rules; examples; importance.',
  scheme: [['Meaning and Linnaeus', 1], ['ICBN and ICZN', 1], ['Rules', 1.5], ['Correct and wrong examples', 1], ['Importance', 0.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- cases
{
  const f = CASE.forest;
  add('survey-case', mk.case({
    passage: `A forest department surveys a reserve and records the species of each group.\n\n| Group | Species recorded |\n|---|---|\n| Plants | ${f.Plants} |\n| Insects | ${f.Insects} |\n| Birds | ${f.Birds} |\n| Reptiles | ${f.Reptiles} |\n| Mammals | ${f.Mammals} |\n\nThe team sorts the records into groups and gives each species its standard scientific name.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The team sorts the species into groups such as insects, birds and mammals on the basis of their similarities and differences. This activity is called',
        right: 'classification',
        wrong: ['nomenclature', 'identification of a new species', 'biodiversity'],
        sol: 'Placing organisms in groups on the basis of similarities and differences is classification — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What percentage of the species recorded are insects?',
        value: f.insectPct, unit: 'percent',
        sol: r`Total $= ${f.Plants} + ${f.Insects} + ${f.Birds} + ${f.Reptiles} + ${f.Mammals} = ${f.total}$; $\dfrac{${f.Insects}}{${f.total}} \times 100 = ${f.insectPct}$ percent.`,
        scheme: [[`${f.insectPct} percent`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain how giving each species a standard scientific name helps the department when it shares its list with a university abroad.',
        model: 'A **standard scientific name is the same in every country**, so the university will know **exactly which species** each record refers to. **Local names** used in the reserve would differ from those used abroad and could cause **confusion**.',
        sol: 'Same name everywhere; local names confuse.',
        scheme: [['Standard name same everywhere', 1], ['Local names differ and confuse', 1]],
        wl: [20, 50],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: `Find the percentage of the recorded species that are animals (everything except plants) and say which two of the three domains they cannot belong to.`,
          model: r`Animals $= ${f.total} - ${f.Plants} = ${f.animals}$ species, which is $\dfrac{${f.animals}}{${f.total}} \times 100 = ${f.animalPct}$ percent. Animals have a true nucleus, so they belong to **Eukarya** and cannot be in **Bacteria** or **Archaea**, whose cells are prokaryotic.`,
          sol: 'Percentage; domain.',
          scheme: [[`${f.animalPct} percent`, 1], ['Eukarya; not Bacteria or Archaea', 1]],
          wl: [20, 50],
          d: 3, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 55 || 'value');
}
{
  add('names-case', mk.case({
    passage: `A seed company packs brinjal seeds for six states. Farmers in the six states call the plant by ${CASE.names.common} different local names, but the company’s supplier prints a single scientific name on every packet. One batch of packets carries the label “solanum Melongena”.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The label “solanum Melongena” breaks which rules of writing a scientific name?',
        right: 'The genus has no capital letter and the species epithet has a capital letter.',
        wrong: ['The genus has a capital letter and the epithet has none.', 'Both words are correctly written but not underlined.', 'The name has three words instead of two.'],
        sol: 'The genus must begin with a capital letter and the species epithet must be in small letters; the label reverses both — option (@K).',
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'How many more local names than scientific names does the plant have?',
        value: LOCAL_MORE,
        sol: r`$${CASE.names.common} - ${CASE.names.scientific} = ${LOCAL_MORE}$ more local names.`,
        scheme: [[`${LOCAL_MORE} more`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Write the correct form of the name for a printed packet and for a handwritten label.',
        model: 'Printed: ***Solanum melongena*** in italics, with a capital S and a small m. Handwritten: Solanum melongena with a **separate underline under each word**.',
        sol: 'Printed and handwritten forms.',
        scheme: [['Printed italic form with correct capitals', 1], ['Handwritten form with separate underlines', 1]],
        wl: [10, 50],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Explain why a single scientific name on every packet is better than printing the six local names.',
          model: 'The **scientific name is the same everywhere**, so every farmer, seller and scientist knows which plant is meant. Six **local names** would differ from state to state and **confuse** buyers who read another state’s name.',
          sol: 'One standard name.',
          scheme: [['Scientific name same everywhere', 1], ['Local names differ and confuse', 1]],
          wl: [20, 50],
          d: 2, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 5 || 'value');
}
{
  add('hierarchy-case', mk.case({
    passage: `A zoo labels four mammals with their classification.\n\n| Animal | Binomial | Family | Order |\n|---|---|---|---|\n| Tiger | *Panthera tigris* | ${LIN['Panthera tigris'].Family} | ${LIN['Panthera tigris'].Order} |\n| Lion | *Panthera leo* | ${LIN['Panthera leo'].Family} | ${LIN['Panthera leo'].Order} |\n| Domestic cat | *Felis catus* | ${LIN['Felis catus'].Family} | ${LIN['Felis catus'].Order} |\n| Dog | *Canis familiaris* | ${LIN['Canis familiaris'].Family} | ${LIN['Canis familiaris'].Order} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which two animals in the table belong to the same genus?',
        right: 'Tiger and lion',
        wrong: ['Tiger and domestic cat', 'Lion and dog', 'Domestic cat and dog'],
        sol: 'Both the tiger and the lion are placed in the genus Panthera — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'Of the seven obligatory categories, how many do the tiger and the domestic cat share? Both are mammals of the phylum Chordata in the kingdom Animalia.',
        value: sharedCount('Panthera tigris', 'Felis catus'),
        sol: 'They differ in species and genus; they share family, order, class, phylum and kingdom: 5 categories.',
        scheme: [['5 categories', 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Is the domestic cat more closely related to the tiger or to the dog? Give a reason from the table.',
        model: `The domestic cat is **more closely related to the tiger**. The cat and the tiger share the **family Felidae** (and everything above it), whereas the cat and the dog are placed together only in the **order Carnivora** and above, as their families differ.`,
        sol: 'Tiger; family shared.',
        scheme: [['Tiger', 1], ['Family shared; dog shares only order', 1]],
        wl: [20, 50],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'The tiger and the lion look quite different in colour and coat pattern. Why are they still classed as closely related?',
          model: 'They are in the **same genus, Panthera**, which is a group of **related species with more characters in common** with each other than with species of other genera. Differences in colour and coat pattern are small compared with the many **fundamental characters** they share.',
          sol: 'Same genus; many shared characters.',
          scheme: [['Same genus Panthera', 1], ['Many characters in common', 1]],
          wl: [20, 50],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 5 || 'value');
}
{
  const s = CASE.sample;
  add('domain-case', mk.case({
    passage: `A research group collects ${s.total} microbial isolates from a hot spring and from nearby soil and sorts them by cell structure.\n\n| Group | Cells | Number of isolates |\n|---|---|---|\n| X | No nucleus; peptidoglycan in the wall | ${s.bacteria} |\n| Y | No nucleus; no peptidoglycan; grows in boiling, acidic water | ${s.archaea} |\n| Z | Nucleus and membrane-bound organelles | ${s.eukarya} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'To which domain do the isolates in group Y belong?',
        right: 'Archaea',
        wrong: ['Bacteria', 'Eukarya', 'None of the three domains'],
        sol: 'Prokaryotes with no peptidoglycan that live in boiling acidic water are archaea — option (@K).',
        d: 2, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What percentage of the isolates are prokaryotes (groups X and Y together)?',
        value: s.prokPct, unit: 'percent',
        sol: r`Prokaryotes $= ${s.bacteria} + ${s.archaea} = ${s.prokaryotes}$; $\dfrac{${s.prokaryotes}}{${s.total}} \times 100 = ${s.prokPct}$ percent.`,
        scheme: [[`${s.prokPct} percent`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'State two features that separate group X from group Y, although both lack a nucleus.',
        model: 'Group X, **bacteria**, have **peptidoglycan** in their cell walls, while group Y, **archaea**, **lack peptidoglycan**. Archaea such as group Y often live in **extreme habitats** like boiling acidic water, whereas bacteria live almost everywhere.',
        sol: 'Wall chemistry; habitat.',
        scheme: [['Peptidoglycan present versus absent', 1], ['Habitat difference', 1]],
        wl: [20, 50],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Name the domain of group Z and the four kingdoms that it contains.',
          model: 'Group Z belongs to the domain **Eukarya**, which contains the four kingdoms **Protista, Fungi, Plantae and Animalia**.',
          sol: 'Eukarya and four kingdoms.',
          scheme: [['Eukarya', 1], ['Four kingdoms', 1]],
          wl: [10, 40],
          d: 1, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 50 || 'value');
}
void RANKS; void pct;
