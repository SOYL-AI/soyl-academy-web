// ISC 11 Biology ch01 The Living World: two decks. Part 1 (t01-t02) need, taxonomy, species and hierarchy; Part 2 (t03-t04) naming and systems.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { HIER, DENDRO, NAMEFIG, PHYLO } from './svgs.mjs';
import { ORG, RANKS, CHARS, MAT, NAMES4, sim, matches, between, ploidy, CHROM, sharedCount, lowestShared, firstSplit, binomial, YEARS, fixName, compound } from './calc.mjs';

export const V = {
  hier: svgV(HIER, 'The taxonomic hierarchy as a funnel of seven categories with the classification of man and mango'),
  dendro: svgV(DENDRO, 'Dendrogram grouping mango with neem and wheat with maize by overall similarity'),
  name: svgV(NAMEFIG, 'Parts of the scientific name Mangifera indica Linn.'),
  phylo: svgV(PHYLO, 'Phylogenetic tree of mango, neem, wheat and maize'),
};

// ---------------------------------------------------------------- computed numbers
const SIM_MN = sim('mango', 'neem');
const M_MN = matches('mango', 'neem');
const SIM_WZ = sim('wheat', 'maize');
const PLOIDY_WHEAT = ploidy(CHROM.wheat, 7);
const GAP = YEARS.speciesPlantarum - YEARS.systemaNaturae;
const SHARE_MD = sharedCount('man', 'dog');
const SHARE_MF = sharedCount('man', 'housefly');
const mark = (v) => (v ? '1' : '0');
const rows = ['Kingdom', 'Phylum / Division', 'Class', 'Order', 'Family', 'Genus', 'Species'].map((r, i) => [r, ...['man', 'housefly', 'mango', 'wheat'].map((k) => ORG[k].taxa[i])]);
void RANKS;

export const deck1 = deck({
  part: 1,
  title: 'The Living World — Part 1: Why we classify, taxonomy and the hierarchy',
  goals: [
    'Explain why living organisms need to be classified',
    'Distinguish numerical taxonomy, cytotaxonomy and chemotaxonomy by the data each uses',
    'Arrange the taxonomic categories in order and write the classification of man, housefly, mango and wheat',
  ],
  slides: [
    sl('title', 'The Living World', {
      b: 'Part 1: millions of kinds of life, and how biologists bring order to them.',
      v: flow('LR', [['n', 'Identify and name organisms'], ['c', 'Group them into categories'], ['s', 'Show how they are related']], [['n', 'c'], ['c', 's']], 'Flow from naming to grouping to showing relationships'),
      n: 'Millions of kinds of organisms share our planet, and new ones are still being found. To study them, biologists first identify and name them, then place them into groups, and finally try to show how the groups are related.',
    }),
    sl('concept', 'Why classify living organisms?', {
      b: 'Without a system, every biologist would have to start again with each organism.',
      v: table(['Problem', 'What classification gives'], [['Millions of kinds of organisms', 'Manageable groups to study together'], ['One organism, many local names', 'A single name understood everywhere'], ['A newly found organism', 'A quick way to place it among known ones'], ['Need to know how organisms are related', 'Groups that reflect resemblance and descent'], ['Information must be found again', 'Facts about a group apply to its members']], 'Table of problems and what classification provides'),
      n: 'Classification makes a huge variety manageable. A single scientific name ends confusion between local names, a newly found organism can be placed quickly, and what is known about a group helps us predict its members.',
    }),
    sl('concept', 'Taxonomy and systematics', {
      b: `**Taxonomy** covers identification, nomenclature and classification. **Systematics** adds the study of evolutionary relationships. The word comes from the Latin *systema*, used by Linnaeus in *Systema Naturae*, published in ${YEARS.systemaNaturae}.`,
      v: flow('LR', [['i', 'Identification'], ['n', 'Nomenclature'], ['c', 'Classification'], ['t', 'Taxonomy'], ['r', 'Plus evolutionary relationships'], ['s', 'Systematics']], [['i', 't'], ['n', 't'], ['c', 't'], ['t', 's'], ['r', 's']], 'Flow showing that taxonomy plus evolutionary relationships makes systematics'),
      n: 'Taxonomy covers three tasks: identifying organisms, naming them and classifying them. Systematics includes all of that and also studies how organisms are related by evolution. The word comes from the Latin systema, used by Linnaeus in the title of his book.',
    }),
    sl('concept', 'Modern branches of taxonomy', {
      b: 'Modern taxonomists use more than outward appearance.',
      v: table(['Branch', 'Data it uses', 'Typical question'], [['Numerical taxonomy', 'Many characters, each given equal weight and scored by computer', 'How similar overall are these two plants?'], ['Cytotaxonomy', 'Number, shape and behaviour of chromosomes', 'Do two look-alike plants differ in chromosome number?'], ['Chemotaxonomy', 'Chemical constituents such as alkaloids, flavonoids and proteins', 'Do two similar shrubs make the same chemicals?']], 'Table of three branches of taxonomy with the data each uses'),
      n: 'Numerical taxonomy scores many characters and gives each the same weight. Cytotaxonomy compares chromosomes, and chemotaxonomy compares chemical substances such as alkaloids and proteins. Together they supplement the study of form and structure.',
    }),
    sl('example', 'Worked example 1: scoring characters', {
      b: `Ten characters are scored 1 (present) or 0 (absent) for four plants. How similar are mango and neem?`,
      ul: [
        `Count the characters in which both plants score alike: **${M_MN}** of ${CHARS.length}.`,
        `Similarity = ${M_MN} divided by ${CHARS.length} = **${SIM_MN}**.`,
        `Only one character differs: neem has compound leaves, mango does not.`,
      ],
      v: table(['Character', 'Mango', 'Neem', 'Wheat', 'Maize'], CHARS.map((c, i) => [c, ...['mango', 'neem', 'wheat', 'maize'].map((k) => mark(MAT[k][i]))]), 'Table of ten characters scored 1 or 0 for mango, neem, wheat and maize'),
      n: 'Every character counts the same. Mango and neem score alike in nine of the ten characters, so their similarity is nine tenths. Only the compound leaves of neem set them apart.',
    }),
    sl('check', 'Quick check: similarity', {
      b: 'Work out the similarity of wheat and maize from the table.',
      n: 'Quick check. Count the characters in which the two grasses agree.',
      chk: 'sim-num',
    }),
    sl('diagram', 'Grouping by overall similarity', {
      b: `Plants that agree in most characters are joined first. Mango and neem join at ${SIM_MN}, wheat and maize at ${SIM_WZ}, and the two pairs only at ${between}.`,
      v: V.dendro,
      n: 'The tree joins the most similar plants first. Mango and neem form one cluster, wheat and maize another, and the two clusters are joined only at a very low similarity. A computer can build such a tree from hundreds of characters.',
    }),
    sl('example', 'Worked example 2: chromosome numbers', {
      b: `Cytotaxonomy compares chromosomes. Bread wheat has ${CHROM.wheat} chromosomes in a body cell and its basic number is 7. What is its level of ploidy?`,
      ul: [
        `Divide the body-cell number by the basic number: ${CHROM.wheat} divided by 7 = **${PLOIDY_WHEAT}**.`,
        `Bread wheat is therefore **hexaploid** (six sets).`,
        `Each gamete carries half the body-cell number: **${CHROM.wheat / 2}** chromosomes.`,
      ],
      v: table(['Organism', 'Chromosomes in a body cell'], [['Housefly', String(CHROM.housefly)], ['Garden pea', String(CHROM.pea)], ['Maize', String(CHROM.maize)], ['Mango', String(CHROM.mango)], ['Bread wheat', String(CHROM.wheat)], ['Man', String(CHROM.man)]], 'Table of chromosome numbers in body cells of six organisms'),
      n: 'The body cells of bread wheat have forty-two chromosomes, built from sets of seven. Forty-two divided by seven gives six sets, so wheat is hexaploid. Chromosome counts like these help to separate species that look alike.',
    }),
    sl('check', 'Quick check: ploidy', {
      b: 'What is the level of ploidy of a plant with 28 chromosomes in each body cell and a basic number of 7?',
      n: 'Quick check. Divide the body-cell number by the basic number.',
      chk: 'ploidy-num',
    }),
    sl('concept', 'The species concept', {
      b: 'The **biological species concept** (Ernst Mayr) defines a species as a group of interbreeding natural populations that are reproductively isolated from other such groups.',
      v: table(['Idea', 'Meaning'], [['Interbreeding', 'Members mate and produce fertile offspring'], ['Reproductive isolation', 'Members do not exchange genes with other species'], ['Lowest category', 'The basic unit of classification'], ['Limitation', 'Cannot be tested for asexual organisms or for fossils']], 'Table of ideas in the biological species concept'),
      n: 'A species is a natural group that can interbreed and produce fertile young, yet is reproductively isolated from other groups. It is the basic unit of classification, although the idea cannot be applied to organisms that reproduce only asexually, or to fossils.',
    }),
    sl('diagram', 'The taxonomic hierarchy', {
      b: 'Seven obligate categories run from **kingdom** down to **species**. Going down, organisms in a category become fewer and share more characters.',
      v: V.hier,
      n: 'The categories form a ladder. A kingdom holds a huge number of organisms with only a few shared features, while a species holds closely similar individuals. For plants, the second category is called division.',
    }),
    sl('concept', 'Four organisms classified', {
      b: 'Man, housefly, mango and wheat are the examples to learn.',
      v: table(['Category', 'Man', 'Housefly', 'Mango', 'Wheat'], rows, 'Table of the classification of man, housefly, mango and wheat from kingdom to species'),
      n: 'Man and housefly are both animals but separate at the phylum, chordates against arthropods. Mango and wheat are both flowering plants in the same division, but a dicot and a monocot, and so they separate at the class.',
    }),
    sl('example', 'Worked example 3: how close are two organisms?', {
      b: 'Use the table to compare man with the dog (Canidae, Carnivora) and with the housefly.',
      ul: [
        `Man and dog share kingdom, phylum and class: **${SHARE_MD}** categories; the lowest shared is the **${lowestShared('man', 'dog')}**; they part at the ${firstSplit('man', 'dog').toLowerCase()}.`,
        `Man and housefly share only the **${lowestShared('man', 'housefly').toLowerCase()}**: **${SHARE_MF}** category; they part at the ${firstSplit('man', 'housefly').toLowerCase()}.`,
        'More shared categories means closer relationship.',
      ],
      v: table(['Pair', 'Categories shared', 'Lowest shared'], [['Man and dog', String(SHARE_MD), lowestShared('man', 'dog')], ['Man and housefly', String(SHARE_MF), lowestShared('man', 'housefly')]], 'Table of categories shared by man with dog and with housefly'),
      n: 'Count from the kingdom downwards until the names differ. Man and dog agree down to the class, three categories. Man and housefly agree only in the kingdom. So the dog is a much closer relative of man than the housefly.',
    }),
    sl('check', 'Quick check: shared categories', {
      b: 'How many categories do the housefly and a mosquito (Culicidae, Diptera) share?',
      n: 'Quick check. Compare the two classifications until they first differ.',
      chk: 'shared-num',
    }),
    sl('check', 'Quick check: species idea', {
      b: 'Judge the assertion and the reason about the species concept.',
      n: 'Quick check. What does the species concept depend on?',
      chk: 'bsc-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Classification gives a manageable, universal and predictive order to life.',
        'Taxonomy = identification, nomenclature, classification; systematics adds evolutionary relationships.',
        `Numerical taxonomy (equal weight, e.g. similarity ${SIM_MN}), cytotaxonomy (chromosomes) and chemotaxonomy (chemicals) add data.`,
        'Species: interbreeding, reproductively isolated populations; the lowest category.',
        'Hierarchy: kingdom, phylum or division, class, order, family, genus, species.',
      ],
      v: table(['Branch', 'Data'], [['Numerical taxonomy', 'Many characters, equal weight'], ['Cytotaxonomy', 'Chromosomes'], ['Chemotaxonomy', 'Chemical constituents']], 'Summary table of branches and data'),
      n: 'To recap: classification brings order to life. Taxonomy names and groups organisms, and systematics adds their relationships. Numerical, cyto and chemotaxonomy supply extra data. The species is the basic unit, and seven categories form the hierarchy.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'List the categories in the **correct order**; plants use **division**, animals use **phylum**.',
        'Define **taxon** and **category** separately: a taxon is an actual group, a category is a rank.',
        'Name the **data** used when asked to distinguish the three branches of taxonomy.',
        'Show a **count of shared categories** when comparing two organisms.',
      ],
      n: 'Exam tips. Give the categories in order and use the right word for the second category. Keep taxon and category apart. Name the kind of data in each branch of taxonomy. And count shared categories when comparing organisms.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'The Living World — Part 2: Binomial nomenclature and systems of classification',
  goals: [
    'Write scientific names correctly following the rules of binomial nomenclature',
    'State two advantages of scientific names over common names',
    'Compare artificial, natural and phylogenetic systems by the characters each uses',
  ],
  slides: [
    sl('title', 'Names and systems', {
      b: 'Part 2: how organisms are named, and the ideas that guide how they are grouped.',
      v: flow('LR', [['b', 'Binomial nomenclature'], ['a', 'Artificial system'], ['n', 'Natural system'], ['p', 'Phylogenetic system']], [['b', 'a'], ['a', 'n'], ['n', 'p']], 'Flow from naming to artificial, natural and phylogenetic systems'),
      n: 'This part has two halves. First, the two-word system by which every organism receives a universal name. Second, the three kinds of system that biologists have used to group organisms: artificial, natural and phylogenetic.',
    }),
    sl('concept', 'Binomial nomenclature', {
      b: `Every species gets a **two-word** Latin or latinised name, introduced by **Carolus Linnaeus**. His *Species Plantarum* of ${YEARS.speciesPlantarum} came ${GAP} years after *Systema Naturae*.`,
      v: table(['Part of the name', 'Meaning'], [['First word', 'Genus, a group of related species'], ['Second word', 'Species epithet, which marks one species within the genus'], ['Author citation', 'Abbreviated name of the person who first described the species']], 'Table of the parts of a binomial'),
      n: 'Binomial means two names. The first word is the genus and the second is the species epithet. Together they name one species only. Linnaeus began using this system in the seventeen fifties, and it is now used worldwide.',
    }),
    sl('diagram', 'Parts of a scientific name', {
      b: 'Take the mango, *Mangifera indica* Linn. Notice the capital letter, the small letter and the roman author.',
      v: V.name,
      n: 'The genus has a capital first letter and the species epithet a small one. The author is written in roman type after the name, often abbreviated. In print the two words are in italics. In handwriting each is underlined separately.',
    }),
    sl('concept', 'Rules of binomial nomenclature', {
      b: 'International codes set the rules; every scientific name must follow them.',
      v: table(['Rule', 'Example'], [['Latin or latinised, usually from a Latin or Greek word', 'Triticum aestivum'], ['Genus begins with a capital letter, epithet with a small letter', 'Homo sapiens'], ['Printed: italics', 'Musca domestica'], ['Handwritten: underline genus and epithet separately', 'Oryza sativa, each word underlined'], ['Author name follows, in roman type and abbreviated', 'Mangifera indica Linn.']], 'Table of rules of binomial nomenclature with examples'),
      n: 'Remember four points: names are Latin in form, the genus starts with a capital and the epithet with a small letter, they are in italics when printed and underlined word by word when handwritten, and the author follows in roman type.',
    }),
    sl('example', 'Worked example 1: correcting written names', {
      b: 'Three names were written wrongly. Correct each for a printed page.',
      ul: [
        `**Homo Sapiens**: the epithet starts with a capital, so it becomes *${fixName('Homo Sapiens').join(' ')}*.`,
        `**zea MAYS**: the genus needs a capital and the epithet small letters, so it becomes *${fixName('zea MAYS').join(' ')}*.`,
        `**azadirachta Indica**: capital and small letters are both reversed, so it becomes *${fixName('azadirachta Indica').join(' ')}*.`,
      ],
      v: table(['Written', 'Printed form', 'Fault'], [['Homo Sapiens', fixName('Homo Sapiens').join(' '), 'Epithet capitalised'], ['zea MAYS', fixName('zea MAYS').join(' '), 'Genus not capitalised; epithet in capitals'], ['azadirachta Indica', fixName('azadirachta Indica').join(' '), 'Letters reversed']], 'Table of three wrongly written names and their corrections'),
      n: 'Check the genus first: it needs a capital letter. Then check that the species epithet is all in small letters. Finally, set both words in italics for print, or underline each one separately in handwriting.',
    }),
    sl('check', 'Quick check: writing names', {
      b: 'Decide whether the statement about handwritten names is true or false.',
      n: 'Quick check. How are the two words marked in handwriting?',
      chk: 'rule-tf',
    }),
    sl('concept', 'Why scientific names are better', {
      b: 'A local name works in one place. A scientific name works everywhere.',
      v: table(['Common name', 'Scientific name'], [['Differs between languages and regions', 'The same in every country'], ['One name may stand for different species', 'Each name belongs to one species only'], ['Gives no clue to relationships', 'The genus word shows close relatives'], ['No governing rules', 'Governed by international codes']], 'Table comparing common names with scientific names'),
      n: 'Common names change from place to place, and one name may even stand for two different plants. A scientific name is universal and unique, and it also tells us the genus, which hints at close relatives.',
    }),
    sl('concept', 'International codes', {
      b: 'Naming is regulated so that no two species carry the same name.',
      v: table(['Code', 'Governs names of'], [['International Code of Nomenclature for algae, fungi and plants', 'Algae, fungi and plants'], ['International Code of Zoological Nomenclature', 'Animals']], 'Table of two international codes of nomenclature'),
      n: 'Two codes guide scientists. One covers algae, fungi and plants, and the other covers animals. They decide, for example, that the oldest valid name is the one that is kept.',
    }),
    sl('check', 'Quick check: who named it?', {
      b: 'Complete the sentence about the introducer of binomial nomenclature.',
      n: 'Quick check. Think of the author of the book on plant species.',
      chk: 'linnaeus-fill',
    }),
    sl('concept', 'Systems of classification', {
      b: 'Over time, the basis for grouping organisms has changed.',
      v: flow('LR', [['a', 'Artificial: one or few characters'], ['n', 'Natural: all natural affinities'], ['p', 'Phylogenetic: evolutionary descent']], [['a', 'n'], ['n', 'p']], 'Flow from artificial to natural to phylogenetic systems'),
      n: 'Early systems used a single obvious character, such as habit or the number of stamens. Later systems used all natural resemblances. Modern systems try to follow evolutionary descent from common ancestors.',
    }),
    sl('concept', 'Comparing the three systems', {
      b: 'Learn each system by its basis, an example and its weakness.',
      v: table(['System', 'Basis', 'Example', 'Weakness'], [['Artificial', 'One or a few characters, such as habit or stamens', 'Linnaeus: number of stamens', 'Separates related plants and joins unrelated ones'], ['Natural', 'Overall resemblance in many characters, external and internal', 'Bentham and Hooker', 'Does not show evolutionary descent'], ['Phylogenetic', 'Common ancestry, from fossils, anatomy, embryology and molecules', 'Engler and Prantl; Hutchinson', 'Depends on evidence that may be incomplete']], 'Table comparing artificial, natural and phylogenetic systems'),
      n: 'An artificial system, like that of Linnaeus based on stamens, is easy but misleading. A natural system, such as Bentham and Hooker, uses many characters. A phylogenetic system, such as Engler and Prantl, follows descent from common ancestors.',
    }),
    sl('example', 'Worked example 2: one character or many?', {
      b: 'Use the four plants of Part 1. Group them first by a single character, then by overall similarity.',
      ul: [
        `Artificial key on **compound leaves**: only **${compound.length}** plant, neem, has them, so neem is separated from mango.`,
        `Natural grouping by all ten characters: mango and neem agree at **${SIM_MN}**, so they go together; wheat and maize at **${SIM_WZ}**.`,
        'The single character separated two close relatives.',
      ],
      v: table(['Method', 'Groups formed'], [['Artificial: compound leaves', `${NAMES4.neem} alone; ${NAMES4.mango}, ${NAMES4.wheat} and ${NAMES4.maize} together`], ['Natural: all ten characters', `${NAMES4.mango} with ${NAMES4.neem}; ${NAMES4.wheat} with ${NAMES4.maize}`]], 'Table of groups formed by an artificial and a natural method'),
      n: 'A single character such as compound leaves puts neem on its own, even though it resembles mango in nine of ten features. Using all the characters gives the groups that a botanist would accept. That is the weakness of artificial systems.',
    }),
    sl('check', 'Quick check: compound leaves', {
      b: 'An artificial key splits the four plants on compound leaves. How many fall into the group that has them?',
      n: 'Quick check. Look at the row for compound leaves in the table.',
      chk: 'compound-num',
    }),
    sl('diagram', 'A phylogenetic tree', {
      b: 'A phylogenetic system groups organisms by **descent from common ancestors**, using fossils, comparative anatomy, embryology and molecular data.',
      v: V.phylo,
      n: 'In this tree, a single ancestor splits into two lineages. Mango and neem share the dicot lineage and wheat and maize share the monocot lineage. Branching shows descent, not just outward resemblance.',
    }),
    sl('check', 'Quick check: phylogeny', {
      b: 'Judge the assertion and the reason about phylogenetic systems.',
      n: 'Quick check. What does a phylogenetic system rely on?',
      chk: 'phylo-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Binomial nomenclature: genus (capital) + species epithet (small); italics in print, separate underlines in handwriting; author follows.',
        'Introduced by Linnaeus; governed by international codes for plants and for animals.',
        'Advantages: universal, unique, shows relatives, rule-governed.',
        'Artificial (few characters), natural (all natural affinities) and phylogenetic (descent) systems.',
      ],
      v: table(['System', 'Example'], [['Artificial', 'Linnaeus, stamens'], ['Natural', 'Bentham and Hooker'], ['Phylogenetic', 'Engler and Prantl; Hutchinson']], 'Summary table of systems with examples'),
      n: 'To recap: scientific names have two words and follow strict rules, and they are universal and unique. Classification systems moved from artificial, using few characters, to natural, using many, and then to phylogenetic, using descent.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write names with a **capital genus** and **small epithet**; underline each word **separately** by hand.',
        'Give **two advantages** of scientific names: universal and unique.',
        'For each system state the **basis**, an **example** and a **weakness**.',
        'Never confuse a **natural** system with a **phylogenetic** one: descent is the difference.',
      ],
      n: 'Exam tips. Write the genus with a capital and the epithet in small letters, underlined separately. Give universal and unique as advantages. For each system, give the basis, an example and a weakness. And keep natural and phylogenetic apart.',
    }),
  ],
});
void binomial;
