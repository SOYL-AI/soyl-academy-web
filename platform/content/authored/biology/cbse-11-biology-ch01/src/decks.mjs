// ch01 The Living World — two decks: Part 1 (t01 and the meaning of taxonomy and systematics), Part 2 (t02 hierarchy, t03 binomial nomenclature).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { HIER, DOMAINS_SVG, LINEAGE, BINOM } from './svgs.mjs';
import { CAMPUS, DESCRIBED, GARDEN, gardenGenera, gardenSpecies, gardenMean, BRANCH, sharedRank, sharedCount, LIN, nameProblems } from './calc.mjs';

export const V = {
  hier: svgV(HIER, 'Funnel of the seven taxonomic categories from kingdom to species with the classification of the human'),
  domains: svgV(DOMAINS_SVG, 'Tree of the three domains: Bacteria, Archaea and Eukarya, with the four kingdoms of Eukarya'),
  lineage: svgV(LINEAGE, 'Lineage tree of tiger, lion, domestic cat and dog showing the order, families, genera and species'),
  binom: svgV(BINOM, 'Scientific name Mangifera indica Linn. with genus, species epithet and author marked, in printed and handwritten forms'),
};

export const deck1 = deck({
  part: 1,
  title: 'The Living World — Part 1: Biodiversity, classification and the three domains',
  goals: [
    'Explain why the diversity of life makes classification necessary',
    'Distinguish identification, nomenclature and classification',
    'Describe the three domains of life and place an organism in its domain',
    'Define taxonomy and systematics',
  ],
  slides: [
    sl('title', 'The Living World', {
      b: 'Part 1 — the variety of life, why we sort it, and the three great domains.',
      v: flow('LR', [['d', 'Diversity of life'], ['n', 'Need to sort it'], ['a', 'Three domains'], ['t', 'Taxonomy and systematics']], [['d', 'n'], ['n', 'a'], ['a', 't']], 'Flow from the diversity of life to the need for classification, the three domains and taxonomy'),
      n: 'Look around a garden, a pond or a forest edge. The variety of living things is enormous. Today we ask how biologists make sense of that variety, and how they place every organism into a group that tells us something useful about it.',
    }),
    sl('concept', 'Biodiversity: the variety of life', {
      b: `**Biodiversity** is the variety of living organisms on Earth. Life is found in cold mountains, deserts, deep oceans, hot springs and rainforests. The number of species that are known and described is about **${DESCRIBED.low} to ${DESCRIBED.high} million**, and new species are still being found.`,
      v: table(['Habitat', 'A few of its inhabitants'], [['Rainforest canopy', 'Orchids, monkeys, hornbills, beetles'], ['Hot desert', 'Cacti, camels, lizards, scorpions'], ['Open ocean', 'Algae, jellyfish, whales, many bacteria'], ['Hot spring', 'Heat-loving prokaryotes called archaea'], ['Soil', 'Fungi, earthworms, bacteria, roots']], 'Table of habitats and some of the organisms that live in them'),
      n: 'Biodiversity means the variety of living things. Organisms live in forests, deserts, oceans, soil and even hot springs. The number of species already known and described is between one point seven and one point eight million, and the count is still growing.',
    }),
    sl('concept', 'Why do we need classification?', {
      b: '**Classification** is the grouping of organisms into convenient categories on the basis of observable characters. It is needed because nobody can study millions of species one by one.',
      v: table(['Problem without classification', 'Help from classification'], [['Millions of species to learn', 'Groups let us study a few examples and apply the pattern to many'], ['Local names differ from place to place', 'One agreed scientific name for each organism'], ['A new organism is found', 'Its characters show where it belongs and what it resembles'], ['Relationships are unclear', 'Groups reveal which organisms are close relatives']], 'Table of problems that classification solves'),
      n: 'Without classification we would have to learn millions of species one by one. Local names change from region to region. Classification gives every organism a place and a standard name, and shows which organisms are close relatives.',
    }),
    sl('check', 'Quick check: three steps', {
      b: 'A student finds an unfamiliar plant and works out which known species it is. Which step is she carrying out?',
      n: 'Quick check. Is she naming a new thing, grouping things, or finding out which known thing she holds?',
      chk: 'steps-mcq',
    }),
    sl('concept', 'Identification, nomenclature and classification', {
      b: '**Identification** finds the correct name and position of an organism. **Nomenclature** is the naming of organisms. **Classification** places organisms in groups according to their similarities and differences.',
      v: flow('LR', [['i', 'Identification: which organism is this?'], ['n', 'Nomenclature: what is its standard name?'], ['c', 'Classification: which group does it belong to?']], [['i', 'n'], ['n', 'c']], 'Flow of identification, nomenclature and classification'),
      n: 'Three jobs go together. Identification asks which organism this is. Nomenclature gives it a standard name. Classification places it in a group of similar organisms.',
    }),
    sl('diagram', 'The three domains of life', {
      b: 'Carl Woese proposed in 1990 that living organisms fall into **three domains**: **Bacteria**, **Archaea** and **Eukarya**. The domains were separated by differences in ribosomal RNA, cell walls and other features.',
      v: V.domains,
      n: 'Bacteria and archaea are both prokaryotes, which have no true nucleus. Eukarya have a true nucleus and membrane-bound organelles. All eukaryotes, from amoeba to mango trees to humans, belong to one domain.',
    }),
    sl('concept', 'Comparing the three domains', {
      b: 'Archaea look like bacteria under a microscope but differ in their chemistry.',
      v: table(['Feature', 'Bacteria', 'Archaea', 'Eukarya'], [['Nucleus and organelles', 'Absent', 'Absent', 'Present; membrane-bound'], ['Cell wall', 'Contains peptidoglycan', 'Lacks peptidoglycan', 'Cellulose in plants, chitin in fungi, absent in animal cells'], ['Typical habitat', 'Almost everywhere', 'Often extreme: very salty, hot, oxygen-free', 'Almost everywhere'], ['Groups included', 'True bacteria', 'Methanogens, halophiles, thermoacidophiles', 'Protista, Fungi, Plantae, Animalia']], 'Table comparing Bacteria, Archaea and Eukarya'),
      n: 'Bacteria have peptidoglycan in their cell walls. Archaea do not, and many of them live where conditions are extreme, such as salt pans, hot springs and swamps without oxygen. Eukarya have a nucleus and membrane-bound organelles.',
    }),
    sl('example', 'Worked example 1: placing a microbe in a domain', {
      b: 'A microbe from a salt pan has a cell without a nucleus. Its cell wall has no peptidoglycan, and it grows only in very salty water. Which domain does it belong to?',
      ul: [
        'No nucleus and no organelles: it is a **prokaryote**, so not Eukarya.',
        'Cell wall **without peptidoglycan**: not Bacteria.',
        'Lives in an **extreme habitat** (very salty): typical of **Archaea** (a halophile).',
      ],
      v: flow('TB', [['a', 'No nucleus: prokaryote'], ['b', 'No peptidoglycan: not Bacteria'], ['c', 'Extreme habitat: Archaea']], [['a', 'b'], ['b', 'c']], 'Flow that places a salt-pan microbe in the domain Archaea'),
      n: 'Work through the clues in order. No nucleus means a prokaryote, so it is not a eukaryote. A cell wall without peptidoglycan rules out bacteria. A very salty habitat fits archaea, so this microbe belongs to the domain Archaea.',
    }),
    sl('check', 'Quick check: domains', {
      b: 'Judge the assertion and the reason about the domain Archaea.',
      n: 'Quick check. What do archaea lack in their cell walls?',
      chk: 'domains-ar',
    }),
    sl('example', 'Worked example 2: a campus survey', {
      b: `A school biodiversity club lists ${CAMPUS.total} species on its campus: ${CAMPUS.Plants} plants, ${CAMPUS.Insects} insects, ${CAMPUS.Birds} birds and ${CAMPUS.Others} others. What percentage are insects, and why does the club sort them into groups?`,
      ul: [
        r`Total $= ${CAMPUS.Plants} + ${CAMPUS.Insects} + ${CAMPUS.Birds} + ${CAMPUS.Others} = ${CAMPUS.total}$ species.`,
        r`Insects: $\dfrac{${CAMPUS.Insects}}{${CAMPUS.total}} \times 100 = ${CAMPUS.insectPct}$ percent.`,
        'Sorting into groups lets the club compare the groups and study one example from each.',
      ],
      v: table(['Group', 'Species', 'Share (percent)'], [['Plants', String(CAMPUS.Plants), String(CAMPUS.plantPct)], ['Insects', String(CAMPUS.Insects), String(CAMPUS.insectPct)], ['Birds', String(CAMPUS.Birds), String(CAMPUS.birdPct)], ['Others', String(CAMPUS.Others), String(CAMPUS.othersPct)]], `Worked table of campus species: insects ${CAMPUS.insectPct} percent of ${CAMPUS.total}`),
      n: 'First find the total, four hundred species. Then divide the number of insect species by the total and multiply by one hundred. One hundred and twenty out of four hundred is thirty percent. Grouping makes such comparisons possible.',
    }),
    sl('concept', 'Taxonomy and systematics', {
      b: '**Taxonomy** is the science of identifying, naming and classifying organisms. **Systematics** is the wider study of the diversity of organisms and their relationships. The word comes from the Latin *systema*, a systematic arrangement; Linnaeus used it in his book *Systema Naturae*.',
      v: table(['Term', 'What it covers'], [['Taxonomy', 'Identification, nomenclature and classification'], ['Systematics', 'Taxonomy plus the evolutionary relationships among organisms'], ['Taxon', 'Any named group of organisms, such as a genus or an order']], 'Table defining taxonomy, systematics and taxon'),
      n: 'Taxonomy deals with identifying, naming and classifying. Systematics is wider. It also asks how organisms are related through evolution. Its name comes from the Latin word for a systematic arrangement.',
    }),
    sl('check', 'Quick check: systematics', {
      b: 'Which term includes the study of evolutionary relationships among organisms in addition to their identification, naming and classification?',
      n: 'Quick check. One of the two terms is wider than the other.',
      chk: 'systematics-mcq',
    }),
    sl('concept', 'A species list as data', {
      b: `A gardener records species by genus: ${GARDEN.map(([g, n]) => `${g} ${n}`).join(', ')}. This is **${gardenGenera} genera** and **${gardenSpecies} species**, an average of **${gardenMean} species per genus**.`,
      v: table(['Genus', 'Species recorded'], GARDEN.map(([g, n]) => [g, String(n)]), `Table of species recorded in each of ${gardenGenera} genera`),
      n: 'Counting taxa is a good habit. Add the species in every genus to get the total, then divide by the number of genera to get the average. Higher categories hold more organisms than lower ones.',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Biodiversity: about ${DESCRIBED.low} to ${DESCRIBED.high} million species are known and described.`,
        'Classification makes the study of many species manageable and gives standard names.',
        'Identification, nomenclature and classification are linked steps.',
        'Three domains (Woese, 1990): Bacteria, Archaea, Eukarya.',
        'Archaea: no peptidoglycan; often extreme habitats. Eukarya: true nucleus.',
        'Taxonomy: identify, name, classify. Systematics: adds evolutionary relationships.',
      ],
      v: table(['Domain', 'Nucleus', 'Cell wall'], [['Bacteria', 'No', 'Peptidoglycan'], ['Archaea', 'No', 'No peptidoglycan'], ['Eukarya', 'Yes', 'Varies']], 'Summary table of the three domains'),
      n: 'To recap: life is hugely diverse, so we classify. Identification, nomenclature and classification work together. There are three domains, bacteria, archaea and eukarya. And systematics is the broader study that includes relationships.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name all **three domains** and give one distinguishing feature of each.',
        'Keep **taxonomy** (identify, name, classify) apart from **systematics** (adds relationships).',
        'Quote the **number of known species** as a range: 1.7 to 1.8 million.',
        'For a worked survey, write the **total first**, then the percentage.',
      ],
      n: 'Exam tips. Name the three domains with one feature of each. Do not mix up taxonomy and systematics. Quote the number of known species as a range. And in survey sums, find the total before working out percentages.',
    }),
  ],
});

const lin = (n) => LIN[n];
export const deck2 = deck({
  part: 2,
  title: 'The Living World — Part 2: The taxonomic hierarchy and binomial nomenclature',
  goals: [
    'Arrange the seven taxonomic categories in order and describe each',
    'Explain the species concept and the idea of a taxon',
    'Work out the lowest category two organisms share',
    'Write scientific names by the rules of ICBN and ICZN',
  ],
  slides: [
    sl('title', 'Hierarchy and naming', {
      b: 'Part 2 — the ladder of categories from species to kingdom, and the two-word names that every biologist uses.',
      v: flow('LR', [['s', 'Species'], ['g', 'Genus'], ['f', 'Family'], ['o', 'Order'], ['c', 'Class'], ['p', 'Phylum or division'], ['k', 'Kingdom']], [['s', 'g'], ['g', 'f'], ['f', 'o'], ['o', 'c'], ['c', 'p'], ['p', 'k']], 'Flow of the seven taxonomic categories from species to kingdom'),
      n: 'Every organism sits on a ladder of groups, from the narrow species at the bottom to the broad kingdom at the top. And every organism carries a two word name that is the same all over the world.',
    }),
    sl('concept', 'Taxonomic categories', {
      b: 'Each step of the ladder is a **taxonomic category**, or rank. A group of organisms placed in a rank is a **taxon**. The ranks are arranged in a **hierarchy**: each higher rank includes several lower ones.',
      v: table(['Category', 'Meaning'], [['Species', 'Individuals with fundamental similarities, distinct from other such groups'], ['Genus', 'Related species that share more characters with each other than with other genera'], ['Family', 'Related genera'], ['Order', 'Related families'], ['Class', 'Related orders'], ['Phylum (Division in plants)', 'Related classes'], ['Kingdom', 'All the phyla or divisions of one great group, such as animals']], 'Table of the seven taxonomic categories and what each contains'),
      n: 'Species is the basic unit. Related species form a genus, related genera form a family, related families form an order, orders form a class, classes form a phylum, which plant biologists call a division, and phyla form a kingdom.',
    }),
    sl('diagram', 'The hierarchy as a funnel', {
      b: 'The funnel shows the classification of the human. **Going up**, a category includes more organisms that share **fewer** characters. **Going down**, it includes fewer organisms that share **more** characters.',
      v: V.hier,
      n: 'At the top, the kingdom Animalia contains a huge number of animals that share only a few basic features. At the bottom, the species sapiens contains only humans, who share a great many features.',
    }),
    sl('check', 'Quick check: order of ranks', {
      b: 'Which category lies immediately above the genus in the hierarchy?',
      n: 'Quick check. Related genera are grouped into this category.',
      chk: 'rank-order-mcq',
    }),
    sl('concept', 'The species concept', {
      b: 'A **species** is a group of individuals with fundamental similarities, which can be told apart from other species. Biologists often add the **biological species concept**: members interbreed and produce fertile offspring, but are reproductively isolated from other species.',
      v: table(['Test', 'Question to ask'], [['Similarity', 'Do the individuals share the same fundamental characters?'], ['Distinctness', 'Can they be told apart from every other species?'], ['Interbreeding', 'Do they breed with each other and produce fertile young, but not with other species?']], 'Table of three tests of the species concept'),
      n: 'A species is a group of organisms with fundamental similarities that can be distinguished from other species. Many biologists add that members of a species interbreed and produce fertile offspring, while staying separate from other species.',
    }),
    sl('concept', 'Hierarchy of four organisms', {
      b: 'Each organism is placed in one taxon at every rank. Plants use the term division instead of phylum.',
      v: table(['Rank', ...['Panthera tigris', 'Felis catus', 'Solanum tuberosum', 'Oryza sativa'].map((n) => `${n} (${LIN[n].common})`)], [['Family', ...['Panthera tigris', 'Felis catus', 'Solanum tuberosum', 'Oryza sativa'].map((n) => lin(n).Family)], ['Order', ...['Panthera tigris', 'Felis catus', 'Solanum tuberosum', 'Oryza sativa'].map((n) => lin(n).Order)], ['Class', ...['Panthera tigris', 'Felis catus', 'Solanum tuberosum', 'Oryza sativa'].map((n) => lin(n).Class)], ['Phylum or division', ...['Panthera tigris', 'Felis catus', 'Solanum tuberosum', 'Oryza sativa'].map((n) => lin(n).Phylum)], ['Kingdom', ...['Panthera tigris', 'Felis catus', 'Solanum tuberosum', 'Oryza sativa'].map((n) => lin(n).Kingdom)]], 'Table of the family, order, class, phylum or division, and kingdom of tiger, cat, potato and rice'),
      n: 'Compare the columns. The tiger and the cat share the family, the order, the class, the phylum and the kingdom. Potato and rice share only the division and the kingdom. The animals and plants share no category at all.',
    }),
    sl('diagram', 'Who shares which category?', {
      b: 'In the tree, organisms that branch apart **later** share **more** categories. The tiger and the lion share the genus *Panthera*; the tiger and the cat share only the family Felidae.',
      v: V.lineage,
      n: 'In this tree of carnivores, the tiger and the lion branch apart at the species level, so they share the genus. The cat branches off earlier, within the same family. The dog branches off earlier still, within the same order.',
    }),
    sl('example', 'Worked example 1: the lowest shared category', {
      b: 'The tiger, *Panthera tigris*, and the dog, *Canis familiaris*, are compared. What is the lowest category in which they are placed together, and how many of the seven ranks do they share?',
      ul: [
        `Genus: *Panthera* and *Canis* differ. Family: ${lin('Panthera tigris').Family} and ${lin('Canis familiaris').Family} differ.`,
        `Order: both **${lin('Panthera tigris').Order}**. So the lowest shared category is the **${sharedRank('Panthera tigris', 'Canis familiaris').toLowerCase()}**.`,
        `Shared ranks: order, class, phylum and kingdom, which is **${sharedCount('Panthera tigris', 'Canis familiaris')}** of the seven.`,
      ],
      v: flow('TB', [['a', 'Species, genus, family differ'], ['b', 'Order: same (Carnivora)'], ['c', 'Class, phylum, kingdom: same']], [['a', 'b'], ['b', 'c']], 'Flow that finds the lowest shared category of tiger and dog as the order'),
      n: 'Start at the bottom and move up. The species differ, the genera differ and the families differ. At the order they match, so the order is the lowest shared category. From there upward everything matches, which makes four of the seven ranks.',
    }),
    sl('check', 'Quick check: shared category', {
      b: 'Which is the lowest category shared by a potato plant and a chilli plant?',
      n: 'Quick check. Look at their genus, then their family.',
      chk: 'shared-rank-mcq',
    }),
    sl('concept', 'Binomial nomenclature', {
      b: 'Every species has a **scientific name** of two words, a system called **binomial nomenclature**. It was introduced by **Carolus Linnaeus**. The first word is the **genus** and the second is the **species epithet**.',
      v: V.binom,
      n: 'In binomial nomenclature each species gets a two word name. The first word is the genus and the second is the species epithet. Linnaeus introduced this system, and the abbreviated name of an author may follow the two words.',
    }),
    sl('concept', 'Rules for writing scientific names', {
      b: 'Plant names follow the **ICBN** (International Code of Botanical Nomenclature); animal names follow the **ICZN** (International Code of Zoological Nomenclature).',
      v: table(['Rule', 'Example'], [['Names are in Latin or Latinised form', 'indica, domestica'], ['Printed in italics; handwritten, each word underlined separately', 'Mangifera indica'], ['Genus: first letter capital', 'Mangifera'], ['Species epithet: all small letters', 'indica'], ['Author’s abbreviated name follows, in ordinary type', 'Mangifera indica Linn.']], 'Table of the rules of binomial nomenclature with examples'),
      n: 'Names come from Latin. Printed names are in italics. When handwritten, each of the two words is underlined separately. The genus begins with a capital letter and the species epithet is all small letters.',
    }),
    sl('example', 'Worked example 2: correcting names', {
      b: 'A student writes four names. Check each against the rules and correct it.',
      ul: [
        `*mangifera indica* breaks a rule: ${nameProblems('mangifera indica')[0]}. Correct: *Mangifera indica*.`,
        `*Panthera Tigris* breaks a rule: ${nameProblems('Panthera Tigris')[0]}. Correct: *Panthera tigris*.`,
        `*TRITICUM AESTIVUM* breaks **${nameProblems('TRITICUM AESTIVUM').length}** rules. Correct: *Triticum aestivum*.`,
      ],
      v: table(['Written', 'Problem', 'Correct'], [['mangifera indica', 'Genus has no capital', 'Mangifera indica'], ['Panthera Tigris', 'Epithet has a capital', 'Panthera tigris'], ['TRITICUM AESTIVUM', 'Both words capitals', 'Triticum aestivum']], 'Table of three wrongly written names, the problem in each and the corrected names'),
      n: 'Check the genus first. It must start with a capital and continue in small letters. Then check the species epithet. It must be all small letters. A name written wholly in capitals breaks both rules.',
    }),
    sl('check', 'Quick check: writing a name', {
      b: 'Which of these is the correct way to write the scientific name of the potato in print?',
      n: 'Quick check. Capital for the genus, small letters for the epithet.',
      chk: 'name-write-mcq',
    }),
    sl('concept', 'Why a universal name matters', {
      b: 'A plant may have a different local name in every language and region. Its **scientific name is the same everywhere**, so scientists in any country know which organism is meant.',
      v: table(['Local name', 'Language', 'Scientific name'], [['Brinjal', 'Hindi and English in India', 'Solanum melongena'], ['Eggplant', 'American English', 'Solanum melongena'], ['Aubergine', 'British English and French', 'Solanum melongena']], 'Table showing three local names of one plant sharing one scientific name'),
      n: 'One crop plant can be called brinjal, eggplant or aubergine. The scientific name is the same in every country, which removes the confusion.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Seven categories from species up to kingdom: species, genus, family, order, class, phylum (division in plants), kingdom.',
        'A taxon is a named group at any rank; higher ranks include more organisms with fewer shared characters.',
        'Species: fundamental similarities, distinct; often also interbreeding and reproductively isolated.',
        'Binomial nomenclature (Linnaeus): genus then species epithet.',
        'ICBN for plants and ICZN for animals: Latin, italics, genus capital, epithet small, underline each word by hand.',
        `Example: ${LIN['Panthera tigris'].common} and dog share only the order and above.`,
      ],
      v: table(['Part of the name', 'Rule'], [['Genus', 'Capital first letter'], ['Species epithet', 'All small letters'], ['Printed', 'Italics'], ['Handwritten', 'Underline each word']], 'Summary table of the rules for writing scientific names'),
      n: 'To recap: seven categories form a hierarchy, and organisms that share lower categories are closer relatives. The two word scientific name, introduced by Linnaeus, gives each species a universal name written by simple rules.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write the seven categories **in order** and say that plants use **division**.',
        'Find a shared category by **starting at the species and moving upward**.',
        'Write names with a **capital genus**, **small epithet**, and **italics or underline**.',
        'Name **ICBN** for plants and **ICZN** for animals.',
      ],
      n: 'Exam tips. Write the seven categories in order. To find a shared category, start low and move up. Follow the rules for writing names, and remember which code covers plants and which covers animals.',
    }),
  ],
});
