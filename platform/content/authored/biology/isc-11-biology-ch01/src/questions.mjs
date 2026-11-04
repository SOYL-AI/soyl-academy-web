// ISC 11 Biology ch01 The Living World: question bank in ISC school-examination style. Every count, similarity and ploidy is
// computed in calc.mjs. AR keys use the ISC Biology options: a b c d.
import { mk, add, svgV } from './lib.mjs';
import { HIER_L } from './svgs.mjs';
import { ORG, CHARS, MAT, sim, matches, ploidy, CHROM, SHEETS, sheetGenera, sheetFamilies, collection, sharedCount, lowestShared, firstSplit, YEARS, fixName, compound, eq, round } from './calc.mjs';

const { mcq, ar, fill, tf, num, short, long, part } = mk;
const flyFig = svgV(HIER_L, 'Funnel of the classification of the housefly with five categories marked A to E');
const tbl = (head, body) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${body.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// ---------------------------------------------------------------- t01 need, taxonomy, branches
add('need-mcq', mcq({
  stem: 'A herbal-products company finds that one root is sold under three different local names in three states, and that a poisonous look-alike is sold under one of those names. Which need for classification does this situation best show?',
  right: 'A universal and unambiguous way of identifying and naming organisms',
  wrong: ['A way of counting the cells in each organism', 'A method of proving that all organisms are alike', 'A way of breeding organisms in captivity'],
  sol: 'Different names for one organism, and one name for two organisms, show the need for a single scientific name and system of grouping — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('numtax-mcq', mcq({
  stem: 'A researcher scores forty characters of twelve grass species as present or absent, gives every character the same importance, and uses a computer to group the grasses by overall similarity. This approach is called',
  right: 'numerical taxonomy',
  wrong: ['cytotaxonomy', 'chemotaxonomy', 'an artificial system based on one character'],
  sol: 'Many equally weighted characters evaluated by computer define numerical taxonomy — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cyto-mcq', mcq({
  stem: 'Two shrubs look alike. A botanist finds that one has 16 chromosomes in its body cells and the other 24, and that their chromosomes differ in shape. Which branch of taxonomy has provided this evidence?',
  right: 'Cytotaxonomy',
  wrong: ['Chemotaxonomy', 'Numerical taxonomy', 'Nomenclature'],
  sol: 'Chromosome number and shape are cytological data, the basis of cytotaxonomy — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chemo-mcq', mcq({
  stem: 'Paper chromatography shows that the leaf extracts of two similar-looking herbs contain different alkaloids and flavonoids. A taxonomist uses this to treat them as separate species. The method is',
  right: 'chemotaxonomy',
  wrong: ['cytotaxonomy', 'numerical taxonomy', 'phylogenetic classification from fossils'],
  sol: 'Using chemical constituents such as alkaloids and flavonoids is chemotaxonomy — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('systema-mcq', mcq({
  stem: 'The word systematics comes from the Latin word systema, which Linnaeus used in the title of his book',
  right: 'Systema Naturae',
  wrong: ['Species Plantarum', 'Genera Plantarum', 'Origin of Species'],
  sol: 'Linnaeus published Systema Naturae in 1735 — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('equal-mcq', mcq({
  stem: 'In a numerical taxonomy study, the character “woody trunk” and the character “hollow internodes” are both scored 1 or 0. How are they treated?',
  right: 'Both carry equal weight in the calculation of similarity',
  wrong: ['The woody trunk counts more because it is easier to see', 'The hollow internodes count more because they are internal', 'Characters of the stem are ignored'],
  sol: 'Numerical taxonomy gives every character the same weight — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
{
  const s = sim('wheat', 'maize');
  const rows = CHARS.map((c, i) => [c, String(MAT.wheat[i]), String(MAT.maize[i])]);
  add('sim-num', num({
    stem: `Ten characters of two grasses are scored 1 (present) or 0 (absent). Each character counts equally.\n\n${tbl(['Character', 'Wheat', 'Maize'], rows)}\n\nWhat is the similarity of wheat and maize (matching characters divided by ten)? Give a decimal.`,
    value: s, tol: 0.001,
    sol: `They match in ${matches('wheat', 'maize')} of ${CHARS.length} characters: ${matches('wheat', 'maize')} / ${CHARS.length} = ${s}.`,
    scheme: [[`${s}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 0.8 || 'value');
}
{
  const p = ploidy(28, 7);
  add('ploidy-num', num({
    stem: 'A plant has 28 chromosomes in each body cell and its basic (monoploid) chromosome number is 7. How many sets of chromosomes does it have, that is, what is its level of ploidy?',
    value: p,
    sol: `28 / 7 = ${p} sets, so the plant is tetraploid.`,
    scheme: [[`${p}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 4 || 'value');
}
{
  const g = CHROM.wheat / 2;
  add('gamete-num', num({
    stem: 'Bread wheat has 42 chromosomes in each body cell. How many chromosomes does each of its gametes carry?',
    value: g,
    sol: `A gamete carries half the body-cell number: 42 / 2 = ${g}.`,
    scheme: [[`${g}`, 1]],
    d: 1, c: 'application', t: [1],
  }), (q) => q.answer.value === 21 || 'value');
}
add('equal-fill', fill({
  stem: 'In numerical taxonomy every character is given ______ weightage.',
  acc: [['equal', 'the same', 'same']],
  sol: 'Equal.',
  d: 1, c: 'recall', t: [1],
}));
add('numtax-ar', ar({
  a: 'In numerical taxonomy every character receives the same weight when similarity is calculated.',
  r: 'A computer can process a table with hundreds of characters for many organisms.',
  key: 'b',
  sol: 'Both statements are true, but the ability of a computer to handle many characters is not the reason for giving equal weight — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('cyto-ar', ar({
  a: 'Two plants that look alike can sometimes be separated into different species by cytotaxonomy.',
  r: 'Related species often differ in the number or structure of their chromosomes.',
  key: 'a',
  sol: 'Both are true, and the difference in chromosomes is the reason cytotaxonomy can separate look-alike species — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('reason1-short', short({
  marks: 1,
  stem: 'Give a reason: A herbarium sheet is labelled with a scientific name and not with the local name alone.',
  model: 'A scientific name is **universal and unique to one species**, so every botanist identifies the plant without confusion.',
  sol: 'Universal, unambiguous name.',
  scheme: [['Universal and unique name avoids confusion', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('analogy2-short', short({
  marks: 1,
  stem: 'Complete the analogy: Numerical taxonomy : equal weight to every character :: Cytotaxonomy : ______',
  model: '**Number, structure and behaviour of chromosomes** (cytological data).',
  sol: 'Chromosome data.',
  scheme: [['Chromosome number, structure or behaviour', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('cyto-short2', short({
  marks: 2,
  stem: 'Name the branch of taxonomy that depends on the chromosomes of an organism, and state two features of chromosomes that it uses.',
  model: 'The branch is **cytotaxonomy**. It uses the **number** of chromosomes (for example 42 in bread wheat) and their **size, shape and behaviour**, such as banding or pairing at meiosis, to separate species that look alike.',
  sol: 'Cytotaxonomy; two features.',
  scheme: [['Cytotaxonomy', 1], ['Two features of chromosomes', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('branches-short2', short({
  marks: 2,
  stem: 'Name the branch of taxonomy that uses (i) the alkaloids and proteins of an organism, and (ii) many equally weighted characters evaluated by computer.',
  model: '(i) **Chemotaxonomy**, which uses chemical constituents such as alkaloids, flavonoids and proteins. (ii) **Numerical taxonomy**, in which a large number of characters, each of **equal weight**, are coded and evaluated by computer to give overall similarity.',
  sol: 'Chemotaxonomy; numerical taxonomy.',
  scheme: [['(i) Chemotaxonomy with the data', 1], ['(ii) Numerical taxonomy with the data', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('need-short3', short({
  marks: 3,
  stem: 'A new museum is classifying its collection of preserved organisms. Give three reasons why classification is necessary.',
  model: '1. It makes the **very large variety** of organisms **manageable** by placing them in groups.\n2. It gives each organism a **universal name**, so that biologists everywhere can identify it without the confusion of local names.\n3. A **newly found organism** can be placed quickly among known ones, and the **relationships** shown by the groups let us predict its features.',
  sol: 'Three reasons.',
  scheme: [['Manageable groups', 1], ['Universal naming and identification', 1], ['Placing new organisms and showing relationships', 1]],
  d: 2, c: 'understanding', t: [1],
}));
{
  const rows = CHARS.map((c, i) => [c, String(MAT.mango[i]), String(MAT.neem[i]), String(MAT.wheat[i])]);
  const pairs = [['mango', 'neem'], ['mango', 'wheat'], ['neem', 'wheat']].map(([a, b]) => [a, b, matches(a, b), sim(a, b)]);
  add('matrix-short3', short({
    marks: 3,
    stem: `Ten characters of three plants are scored 1 (present) or 0 (absent), every character counting equally.\n\n${tbl(['Character', 'Mango', 'Neem', 'Wheat'], rows)}\n\nCalculate the proportion of matching characters for each pair. Which two plants should be grouped first, and what does the result suggest about the third?`,
    model: `Matching characters: mango and neem **${pairs[0][2]} of ${CHARS.length} (${pairs[0][3]})**; mango and wheat **${pairs[1][2]} of ${CHARS.length} (${pairs[1][3]})**; neem and wheat **${pairs[2][2]} of ${CHARS.length} (${pairs[2][3]})**. **Mango and neem** have the highest similarity and are grouped first. Wheat is far less similar to both, so it joins them only at a **low similarity**, and is a distinct, more distant group.`,
    sol: 'Three similarities; first pair; third plant.',
    scheme: [['Three matching counts or proportions', 1], ['Mango and neem grouped first', 1], ['Wheat distant from both', 1]],
    d: 4, c: 'analysis', t: [1],
  }), () => (matches('mango', 'neem') === 9 && matches('mango', 'wheat') === 2 && matches('neem', 'wheat') === 1) || 'matches');
}
add('taxonomy-long', long({
  stem: '(a) Give three reasons why living organisms need to be classified. [2]\n(b) State the kind of data used in (i) cytotaxonomy and (ii) chemotaxonomy. [2]\n(c) How does systematics differ from taxonomy, and from which word is it derived? [1]',
  model: '(a) Classification makes the **large variety** of organisms manageable, gives each a **universal name**, and lets a **new organism** be placed and its relationships predicted.\n\n(b) (i) **Cytotaxonomy** uses the **number, structure and behaviour of chromosomes**. (ii) **Chemotaxonomy** uses **chemical constituents** such as alkaloids, flavonoids and proteins, which may differ between look-alike species.\n\n(c) **Taxonomy** is identification, nomenclature and classification; **systematics** also studies **evolutionary relationships**. It is derived from the Latin word **systema**, used by Linnaeus in *Systema Naturae*.',
  sol: 'Reasons; three branches; systematics.',
  scheme: [['(a) Any two reasons', 1], ['(a) Third reason', 1], ['(b) Cytotaxonomy data', 1], ['(b) Chemotaxonomy data', 1], ['(c) Difference and origin of the word', 1]],
  wl: [80, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 species and hierarchy
add('bsc-mcq', mcq({
  stem: 'Two groups of beetles live in neighbouring valleys and differ slightly in wing colour. When released together in a large cage, they mate freely and raise fertile young. According to the biological species concept, the two groups are',
  right: 'members of one species',
  wrong: ['two species, because their wing colours differ', 'two genera of the same family', 'two varieties of different species'],
  sol: 'Free interbreeding with fertile offspring places them in one species, whatever small differences they show — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('order-mcq', mcq({
  stem: 'Which sequence lists taxonomic categories from the lowest to the highest?',
  right: 'Species, genus, family, order, class, phylum, kingdom',
  wrong: ['Genus, species, order, family, phylum, class, kingdom', 'Species, genus, order, family, class, kingdom, phylum', 'Kingdom, phylum, class, order, family, genus, species'],
  sol: 'The hierarchy rises from species through genus, family, order, class and phylum to kingdom — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('man-mcq', mcq({
  stem: 'Man, Homo sapiens, is placed in the order Primata. In which family is he placed?',
  right: 'Hominidae',
  wrong: ['Muscidae', 'Canidae', 'Poaceae'],
  sol: 'The classification of man is Animalia, Chordata, Mammalia, Primata, Hominidae, Homo, sapiens — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('mango-mcq', mcq({
  stem: 'Which pair gives the correct class and family of the mango, Mangifera indica?',
  right: 'Dicotyledonae and Anacardiaceae',
  wrong: ['Monocotyledonae and Anacardiaceae', 'Dicotyledonae and Poaceae', 'Monocotyledonae and Poaceae'],
  sol: 'Mango is a dicot in the family Anacardiaceae — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
{
  const l = lowestShared('wheat', 'maize');
  add('wheat-mcq', mcq({
    stem: 'Wheat (Triticum aestivum) and maize (Zea mays) are both placed in the order Poales. What is the lowest category that includes both?',
    right: l.toLowerCase(),
    wrong: ['genus', 'order', 'class'],
    sol: `They share kingdom, division, class, order and family (Poaceae), but their genera differ, so the lowest shared category is the ${l.toLowerCase()} — option (@K).`,
    d: 2, c: 'application', t: [2],
  }), () => l === 'Family' || 'rank');
}
add('funnel-mcq', mcq({
  stem: 'Of these taxa, which contains the largest number of organisms and has the smallest number of shared characters?',
  right: 'Plantae',
  wrong: ['Poaceae', 'Triticum', 'Triticum aestivum'],
  sol: 'The kingdom is the highest category listed, so it holds the most organisms with the fewest shared characters — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('taxon-mcq', mcq({
  stem: 'Which of the following is a taxonomic category (a rank) and not a taxon (an actual group)?',
  right: 'Family',
  wrong: ['Poaceae', 'Primata', 'Insecta'],
  sol: 'Family is a rank in the hierarchy; Poaceae, Primata and Insecta are actual groups, that is, taxa — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('fig-fam-mcq', mcq({
  stem: 'The figure shows the classification of the housefly, with five categories marked A to E. Which letter marks the family?',
  right: 'D',
  wrong: ['A', 'B', 'E'],
  sol: 'The taxa read Arthropoda (phylum), Insecta (class), Diptera (order), Muscidae (family) and Musca (genus), so the family is D — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [flyFig],
}));
add('fig-class-mcq', mcq({
  stem: 'In the same figure, a dragonfly belongs to the order Odonata of the same class as the housefly. Which letter marks the lowest category that includes both insects?',
  right: 'B',
  wrong: ['A', 'C', 'D'],
  sol: 'Both are insects, so the lowest shared category is the class Insecta, marked B; they differ at the order — option (@K).',
  d: 3, c: 'analysis', t: [2],
  assets: [flyFig],
}));
{
  const n = sharedCount('housefly', 'mosquito');
  add('fig-mosq-mcq', mcq({
    stem: 'A mosquito (Culex pipiens) belongs to the family Culicidae of the same order as the housefly. In the figure, which letters mark the lettered categories that the two insects share?',
    right: 'A, B and C',
    wrong: ['A and B only', 'A, B, C and D', 'C, D and E'],
    sol: `They share the kingdom, phylum (A), class (B) and order (C) — ${n} categories in all; they part at the family — option (@K).`,
    d: 3, c: 'analysis', t: [2],
    assets: [flyFig],
  }), () => n === 4 || 'count');
}
add('bsc-ar', ar({
  a: 'The biological species concept cannot be applied to a bacterium that multiplies only by binary fission.',
  r: 'The concept defines a species by interbreeding and the production of fertile offspring, which needs sexual reproduction.',
  key: 'a',
  sol: 'Both are true, and R explains A: without sexual reproduction there is no interbreeding to test — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('wheatmango-ar', ar({
  a: 'Wheat and mango are placed in the same division, Angiospermae.',
  r: 'Both wheat and mango are monocotyledons.',
  key: 'c',
  sol: 'A is true: both are flowering plants. R is false: mango is a dicot and wheat a monocot — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('genus-ar', ar({
  a: 'Two species of the same genus share more characters than two genera of the same family.',
  r: 'A genus is a lower category than a family and groups closely related species.',
  key: 'a',
  sol: 'Both are true. Because the genus is the lower rank, its species are more alike — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
{
  const sp = collection(3, 4, 7).species;
  add('collection-num', num({
    stem: 'A reference collection of plants has 3 families. Each family has 4 genera, and each genus has 7 species. How many species are in the collection?',
    value: sp,
    sol: `3 × 4 × 7 = ${sp} species.`,
    scheme: [[`${sp}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 84 || 'value');
}
{
  const n = sharedCount('housefly', 'mosquito');
  add('shared-num', num({
    stem: 'The housefly is classified as Animalia, Arthropoda, Insecta, Diptera, Muscidae, Musca, domestica. A mosquito is Animalia, Arthropoda, Insecta, Diptera, Culicidae, Culex, pipiens. In how many categories, counted from the kingdom downwards, are the two placed in the same taxon?',
    value: n,
    sol: `They are alike in kingdom, phylum, class and order and differ from the family downwards: ${n} categories.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 4 || 'value');
}
add('analogy1-short', short({
  marks: 1,
  stem: 'Complete the analogy: Species : sapiens :: Genus : ______ (in the classification of man).',
  model: '**Homo**.',
  sol: 'Homo.',
  scheme: [['Homo', 1]],
  wl: [1, 10],
  d: 1, c: 'recall', t: [2],
}));
add('bscdef-short2', short({
  marks: 2,
  stem: 'State the biological species concept and give one limitation of it.',
  model: 'A **species** is a group of **interbreeding natural populations** that are **reproductively isolated** from other such groups. A limitation is that it **cannot be applied to organisms that reproduce only asexually**, or to **fossils**, where interbreeding cannot be tested.',
  sol: 'Definition; limitation.',
  scheme: [['Statement of the concept', 1], ['A limitation', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('mango-short2', short({
  marks: 2,
  stem: 'Write the classification of the mango from kingdom to species, giving the scientific name.',
  model: `**Kingdom** ${ORG.mango.taxa[0]}; **Division** ${ORG.mango.taxa[1]}; **Class** ${ORG.mango.taxa[2]}; **Order** ${ORG.mango.taxa[3]}; **Family** ${ORG.mango.taxa[4]}; **Genus** ${ORG.mango.taxa[5]}; **Species** ${ORG.mango.taxa[6]}. The scientific name is *${ORG.mango.taxa[5]} ${ORG.mango.taxa[6]}*.`,
  sol: 'Seven taxa.',
  scheme: [['Kingdom to order correct', 1], ['Family, genus, species correct', 1]],
  wl: [20, 50],
  d: 1, c: 'recall', t: [2],
}));
add('wheat-short2', short({
  marks: 2,
  stem: 'Write the classification of wheat from kingdom to genus and state why wheat and mango are separated at the class.',
  model: `Wheat: **${ORG.wheat.taxa.slice(0, 6).join(', ')}**. Both are flowering plants of the same division, but wheat has **one cotyledon** in its seed (monocot) and mango **two** (dicot), so they are placed in different classes.`,
  sol: 'Classification; monocot against dicot.',
  scheme: [['Kingdom to genus correct', 1], ['Monocot against dicot reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('wheatrice-short3', short({
  marks: 3,
  stem: 'Wheat (Triticum aestivum) and rice (Oryza sativa) are both placed in the family Poaceae. Name the lowest category they share, state whether they belong to the same genus, and explain why they belong to different species.',
  model: `The lowest category they share is the **family** (Poaceae). They belong to **different genera**, *Triticum* and *Oryza*, so they are not in the same genus. They are also **different species**: the individuals of each interbreed and produce fertile young only with their own kind, and are **reproductively isolated** from the other.`,
  sol: 'Family; different genera; reproductive isolation.',
  scheme: [['Family as the lowest shared category', 1], ['Different genera', 1], ['Different species by reproductive isolation', 1]],
  d: 3, c: 'application', t: [2],
}));
add('manfly-short3', short({
  marks: 3,
  stem: 'Man and the housefly are both animals. Name the categories in which they are placed together, name the first category at which they are placed apart, and say what this shows about their relationship.',
  model: `They are placed together in the **kingdom Animalia** only (${sharedCount('man', 'housefly')} category). They first part at the **phylum**: man is a chordate (Chordata) and the housefly an arthropod (Arthropoda). Sharing so few categories shows that they are **distantly related**, unlike man and the dog, which stay together down to the class.`,
  sol: 'Shared kingdom; phylum; distant relation.',
  scheme: [['Kingdom only', 1], ['Parted at the phylum with the two names', 1], ['Distant relationship', 1]],
  d: 2, c: 'application', t: [2],
}), () => (lowestShared('man', 'housefly') === 'Kingdom' && firstSplit('man', 'housefly') === 'Phylum') || 'rank');
{
  const pairs = [['wheat', 'maize'], ['wheat', 'mango'], ['maize', 'mango']].map(([a, b]) => [a, b, sharedCount(a, b), lowestShared(a, b)]);
  eq(pairs.map((p) => p[2]), [5, 2, 2], 'shared counts for wheat, maize, mango');
  add('trend-short3', short({
    marks: 3,
    stem: 'Wheat and maize are monocots of the family Poaceae; mango is a dicot of the family Anacardiaceae. For each pair, name the lowest category shared and the number of categories shared, and state what this shows about their closeness.',
    model: `Wheat and maize share **${pairs[0][2]}** categories, down to the **family**; wheat and mango share **${pairs[1][2]}**, down to the **division**, and so do maize and mango. The pair that shares the **more** categories also shares **more characters**, so wheat and maize are **closely related**, while mango is distant from both.`,
    sol: 'Counts; lowest shared; conclusion.',
    scheme: [['Wheat and maize: five, family', 1], ['Other pairs: two, division', 1], ['More shared categories mean closer relationship', 1]],
    d: 3, c: 'analysis', t: [2],
  }));
}
add('hierarchy-long', long({
  stem: '(a) List the seven taxonomic categories in descending order, from the highest to the lowest. [1]\n(b) Write the classification of man from kingdom to species. [2]\n(c) State the lowest category that man shares with the dog (family Canidae, order Carnivora), and explain what happens to the number of organisms and the characters they share as we move from the kingdom to the species. [2]',
  model: `(a) **Kingdom, phylum (division in plants), class, order, family, genus, species.**\n\n(b) Man: **${ORG.man.taxa.join(', ')}** — that is, kingdom Animalia, phylum Chordata, class Mammalia, order Primata, family Hominidae, genus Homo, species sapiens.\n\n(c) Man and the dog share the kingdom, phylum and **class (Mammalia)**: the **${lowestShared('man', 'dog').toLowerCase()}** is the lowest shared category. Moving **down** from kingdom to species, the **number of organisms** in each group **decreases** and the **characters they share increase**.`,
  sol: 'Order; classification of man; shared class and trend.',
  scheme: [['(a) Seven categories in order', 1], ['(b) Kingdom to order', 1], ['(b) Family to species', 1], ['(c) Class as the lowest shared', 1], ['(c) Trend in number and shared characters', 1]],
  wl: [60, 200],
  d: 2, c: 'application', t: [2],
}), () => lowestShared('man', 'dog') === 'Class' || 'rank');

// ---------------------------------------------------------------- t03 binomial nomenclature
add('print-mcq', mcq({
  stem: 'Which is the correct way of writing the scientific name of wheat in a student’s handwritten answer?',
  right: 'Triticum aestivum, with each of the two words underlined separately',
  wrong: ['triticum Aestivum, written in italics', 'Triticum Aestivum, with one line under both words', 'TRITICUM AESTIVUM, with a single underline'],
  sol: 'The genus has a capital initial, the epithet a small initial, and in handwriting each word is underlined separately — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('genus-mcq', mcq({
  stem: 'A botanist labels two trees Ficus benghalensis and Ficus religiosa. What do the names tell her?',
  right: 'They belong to the same genus but are different species',
  wrong: ['They belong to the same species', 'They belong to the same species but different genera', 'They belong to different families'],
  sol: 'The same first word means the same genus; the different second word means a different species — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('advantage-mcq', mcq({
  stem: 'The fruit papaya is called papita, pawpaw and papaw in different regions, but a journal always writes Carica papaya. What advantage of the scientific name does this show?',
  right: 'It is the same in every language and refers to a single species',
  wrong: ['It is shorter than any common name', 'It describes the colour of the fruit', 'It can be changed by any author at any time'],
  sol: 'A scientific name is universal and unique — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('author-mcq', mcq({
  stem: 'In the name Triticum aestivum Linn., what does the abbreviation Linn. represent?',
  right: 'The scientist who first described the species',
  wrong: ['The family of wheat', 'The variety of wheat', 'The country where wheat was first grown'],
  sol: 'The author citation names the scientist who first described and named the species — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('codes-mcq', mcq({
  stem: 'A mycologist describes a new mushroom from the forests of Meghalaya. Which international code governs the scientific name she gives it?',
  right: 'International Code of Nomenclature for algae, fungi and plants',
  wrong: ['International Code of Zoological Nomenclature', 'Neither, since a mushroom needs no scientific name', 'Both, since a mushroom is neither a plant nor an animal'],
  sol: 'Fungi are named under the code for algae, fungi and plants — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('epithet-mcq', mcq({
  stem: 'In the name Musca domestica, the word domestica is the',
  right: 'species epithet',
  wrong: ['genus', 'family', 'author citation'],
  sol: 'The second word of a binomial is the species epithet — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
{
  const f = fixName('Homo Sapiens');
  add('rule-tf', tf({
    stem: 'In a handwritten answer, the scientific name Homo sapiens is correctly marked by drawing a single line under both words together.',
    key: 'f',
    sol: 'False. In handwriting the genus and the species epithet are underlined separately.',
    d: 1, c: 'recall', t: [3],
  }), () => f.join(' ') === 'Homo sapiens' || 'name');
}
add('linnaeus-fill', fill({
  stem: 'The two-word system of naming organisms was introduced by Carolus ______.',
  acc: [['Linnaeus', 'Carl Linnaeus']],
  sol: 'Linnaeus.',
  d: 1, c: 'recall', t: [3],
}));
add('reason2-short', short({
  marks: 1,
  stem: 'Give a reason: The same common name can be unsafe for identifying a medicinal plant.',
  model: 'One common name may be used for **different plants in different regions**, while one plant may have **many common names**.',
  sol: 'Common names are ambiguous.',
  scheme: [['Same name for different plants, or many names for one', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('advantages-short2', short({
  marks: 2,
  stem: 'State two advantages of scientific names over common names, using the example of the papaya, Carica papaya.',
  model: 'A scientific name such as *Carica papaya* is **universal**, the same in every language, whereas papita and pawpaw vary with the region. It is also **unique** to one species and follows **international rules**, so no other species can carry it.',
  sol: 'Universal; unique.',
  scheme: [['Universal in every language', 1], ['Unique to one species and rule-governed', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('printfix-short2', short({
  marks: 2,
  stem: 'A student writes “Homo Sapiens” in a printed article and, by hand, draws one line under the whole name. Point out the two mistakes and write the name correctly for print.',
  model: `The **species epithet** *sapiens* must begin with a **small letter**, not a capital. In handwriting, the **genus and the epithet are underlined separately**, not with one line. In print the correct form is *${fixName('Homo Sapiens').join(' ')}* in italics.`,
  sol: 'Capital in the epithet; one line under both.',
  scheme: [['Epithet capitalised', 1], ['Single underline for both words', 1]],
  d: 2, c: 'application', t: [3],
}));
add('rules-short3', short({
  marks: 3,
  stem: 'State three rules of binomial nomenclature, illustrating each with the name of wheat, Triticum aestivum Linn.',
  model: '1. The name has **two words, genus then species epithet**: *Triticum* is the genus and *aestivum* the epithet.\n2. The **genus begins with a capital letter and the epithet with a small letter**; in print both are in **italics**, and in handwriting each is **underlined separately**.\n3. The **author’s name**, abbreviated and in roman type, follows: **Linn.** shows that Linnaeus first described it.',
  sol: 'Three rules with the example.',
  scheme: [['Two words, genus and epithet', 1], ['Capital and small letters; italics or underline', 1], ['Author citation in roman type', 1]],
  d: 2, c: 'application', t: [3],
}));
add('binomial-long', long({
  stem: '(a) Who introduced binomial nomenclature, and what does the word binomial mean? [1]\n(b) State two rules for writing a scientific name, one for print and one for handwriting. [2]\n(c) Correct these two wrongly written names for a printed page, naming the fault in each: zea MAYS and azadirachta Indica. [2]',
  model: `(a) **Carolus Linnaeus** introduced it; **binomial** means a **two-word** name, genus followed by species epithet.\n\n(b) In **print** the name is set in **italics**; in **handwriting** the genus and the epithet are **underlined separately**. (Also: the genus begins with a capital letter and the epithet with a small letter.)\n\n(c) *${fixName('zea MAYS').join(' ')}*: the genus lacked a capital letter and the epithet was in capitals. *${fixName('azadirachta Indica').join(' ')}*: the genus lacked a capital and the epithet had a capital letter.`,
  sol: 'Introducer and meaning; two rules; corrections.',
  scheme: [['(a) Linnaeus; two-word name', 1], ['(b) Rule for print', 1], ['(b) Rule for handwriting', 1], ['(c) Zea mays with fault', 1], ['(c) Azadirachta indica with fault', 1]],
  wl: [60, 200],
  d: 2, c: 'application', t: [3],
}), () => fixName('zea MAYS').join(' ') === 'Zea mays' || 'fix');

// ---------------------------------------------------------------- t04 systems of classification
add('artificial-mcq', mcq({
  stem: 'An early botanist arranged all plants of a district into herbs, shrubs and trees, using only their habit. Which system of classification is this?',
  right: 'Artificial',
  wrong: ['Natural', 'Phylogenetic', 'Numerical'],
  sol: 'Grouping by one easily seen character is an artificial system — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('sexual-mcq', mcq({
  stem: 'The sexual system, which grouped plants by the number and arrangement of their stamens, was proposed by',
  right: 'Linnaeus',
  wrong: ['Bentham and Hooker', 'Engler and Prantl', 'Hutchinson'],
  sol: 'Linnaeus used the stamens as the basis of an artificial system — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('natural-mcq', mcq({
  stem: 'Bentham and Hooker grouped seed plants by using external and internal characters to find their overall natural affinities. Their system is',
  right: 'natural',
  wrong: ['artificial', 'phylogenetic', 'numerical'],
  sol: 'Using all natural affinities in many characters defines a natural system — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('phylo-mcq', mcq({
  stem: 'A taxonomist places two plants in one group because fossils and molecular evidence show that they descended from a recent common ancestor. Her system is',
  right: 'phylogenetic',
  wrong: ['artificial', 'natural, based on overall resemblance only', 'based on habit alone'],
  sol: 'Grouping by common ancestry is phylogenetic classification — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('limit-mcq', mcq({
  stem: 'An artificial key placed a tall herb and a shrub in different groups only because of their habit, even though their flowers and fruits are almost identical. This shows that artificial systems',
  right: 'can separate closely related plants because they use few characters',
  wrong: ['always show evolutionary descent', 'use fossils as their main evidence', 'give equal weight to hundreds of characters'],
  sol: 'A single character such as habit may separate related plants — option (@K).',
  d: 2, c: 'analysis', t: [4],
}));
add('phylo-ar', ar({
  a: 'A phylogenetic system classifies plants mainly by the number of their stamens.',
  r: 'Linnaeus’s sexual system was a phylogenetic system.',
  key: 'd',
  sol: 'Both are false. Stamen number is the basis of the artificial sexual system of Linnaeus; phylogenetic systems use descent — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('bh-ar', ar({
  a: 'The system of Bentham and Hooker is a phylogenetic system.',
  r: 'It was based on the number of stamens in the flower.',
  key: 'd',
  sol: 'Both are false: the system of Bentham and Hooker is natural, based on many characters — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('bentham-fill', fill({
  stem: 'The natural system of classification of seed plants was given by Bentham and ______.',
  acc: [['Hooker']],
  sol: 'Hooker.',
  d: 1, c: 'recall', t: [4],
}));
{
  const c = compound.length;
  add('compound-num', num({
    stem: 'An artificial key splits mango, neem, wheat and maize on one character, compound leaves present or absent (only neem has compound leaves). How many of the four plants fall into the “present” group?',
    value: c,
    sol: `Only neem has compound leaves: ${c} plant.`,
    scheme: [[`${c}`, 1]],
    d: 1, c: 'application', t: [4],
  }), (q) => q.answer.value === 1 || 'value');
}
add('artificial-short', short({
  marks: 1,
  stem: 'Give a reason: A purely artificial system of classification is not accepted today.',
  model: 'It uses **one or a few characters**, so it **separates related organisms and groups unrelated ones**.',
  sol: 'Few characters.',
  scheme: [['Few characters give misleading groups', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('phylo-short2', short({
  marks: 2,
  stem: 'What is a phylogenetic system of classification? Name two botanists who proposed such systems.',
  model: 'A **phylogenetic system** groups organisms according to their **evolutionary relationships and common ancestry**, using evidence from fossils, anatomy, embryology and molecular data. It was proposed by **Engler and Prantl** and by **Hutchinson**.',
  sol: 'Descent; two names.',
  scheme: [['Based on common ancestry', 1], ['Two botanists', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('systems-short2', short({
  marks: 2,
  stem: 'Distinguish between an artificial and a natural system of classification on the basis of the characters used, giving one example of each.',
  model: 'An **artificial system** uses **one or a few characters** such as habit or stamens, e.g. the sexual system of **Linnaeus**. A **natural system** uses **many external and internal characters** to show overall natural affinities, e.g. the system of **Bentham and Hooker**.',
  sol: 'Characters used; examples.',
  scheme: [['Artificial: few characters, example', 1], ['Natural: many characters, example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('three-short3', short({
  marks: 3,
  stem: 'Compare the artificial, natural and phylogenetic systems of classification, giving the basis of each in one line.',
  model: 'The **artificial** system uses **one or a few easily seen characters**, so it may separate related plants. The **natural** system uses **all natural affinities**, with external and internal characters, but does not show descent. The **phylogenetic** system uses **common ancestry**, shown by fossils, anatomy, embryology and molecular data.',
  sol: 'Three bases.',
  scheme: [['Artificial basis', 1], ['Natural basis', 1], ['Phylogenetic basis', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Using the four plants mango, neem, wheat and maize, explain how a key based on the single character “compound leaves” would group them, and why this grouping is misleading when compared with the grouping by overall similarity.',
  model: `A key on **compound leaves** puts **neem alone** in one group and mango, wheat and maize in the other. This is misleading because mango and neem agree in **${matches('mango', 'neem')} of ${CHARS.length}** characters (similarity ${sim('mango', 'neem')}) and are close relatives. Using **all characters**, **mango and neem** group together and **wheat and maize** group together.`,
  sol: 'Neem alone; misleading; natural groups.',
  scheme: [['Neem separated alone', 1], ['Mango and neem agree in nine characters', 1], ['Grouping by all characters', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('systems-long', long({
  stem: '(a) Define artificial, natural and phylogenetic systems of classification. [3]\n(b) Give one weakness of an artificial system. [1]\n(c) State one way in which a phylogenetic system goes beyond a natural system. [1]',
  model: '(a) The **artificial system** groups organisms by **one or a few easily seen characters**. The **natural system** uses **overall natural affinities** in many external and internal characters. The **phylogenetic system** is based on **evolutionary relationships and common ancestry**.\n\n(b) It **separates closely related organisms and places unrelated ones together**, because the few characters chosen may not reflect real relationship.\n\n(c) It **shows descent from common ancestors**, using fossils, anatomy, embryology and molecular data, which a natural system based on resemblance does not.',
  sol: 'Definitions; weakness; descent.',
  scheme: [['(a) Artificial defined', 1], ['(a) Natural defined', 1], ['(a) Phylogenetic defined', 1], ['(b) Weakness of artificial system', 1], ['(c) Descent from common ancestors', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- stimulus-based
add('herbarium-case', mk.case({
  passage: `A herbarium sheet lists six plants of a village.\n\n${tbl(['Scientific name', 'Family'], SHEETS.map((s) => [`*${s.name}*`, s.family]))}`,
  d: 3, c: 'application',
  children: [
    part('a', num({
      stem: 'How many different genera are listed?',
      value: sheetGenera,
      sol: `Ficus occurs twice, so the genera are Ficus, Mangifera, Oryza, Zea and Triticum: ${sheetGenera}.`,
      scheme: [[`${sheetGenera}`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('b', mcq({
      stem: 'Which is the lowest category that includes all six plants, given that the banyan, mango, rice, maize and wheat are all flowering plants?',
      right: 'Division',
      wrong: ['Class', 'Order', 'Family'],
      sol: 'The six plants include dicots and monocots, so they share only the kingdom and the division Angiospermae — option (@K).',
      d: 3, c: 'analysis', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: `Ficus benghalensis and Ficus religiosa: name the categories they share and explain why they are different species.`,
      model: 'They share the **genus *Ficus*** and therefore the family **Moraceae** and all higher categories. They are different species because each is a separate natural population, **reproductively isolated** from the other, with its own epithet.',
      sol: 'Shared down to genus; reproductive isolation.',
      scheme: [['Genus and higher categories shared', 1], ['Different species by isolation', 1]],
      d: 2, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Zea mays and Triticum aestivum are both grasses. Name the lowest category they share and explain why they are placed in different genera.',
        model: 'The lowest category they share is the **family Poaceae**. They are in different genera, *Zea* and *Triticum*, because each genus is a group of related species with **more characters in common** inside it than with the species of the other genus.',
        sol: 'Family; different genera.',
        scheme: [['Poaceae', 1], ['Different genera explained', 1]],
        d: 2, c: 'application', t: [2],
      }),
    ]),
  ],
}));
{
  const x = 10;
  const R = 40;
  add('chromosome-case', mk.case({
    passage: `A botanist records the number of chromosomes in the body cells of three look-alike herbs. The basic number of the group is ${x}.\n\n${tbl(['Herb', 'Chromosomes in a body cell'], [['P', 20], ['Q', 20], ['R', R]].map(([a, b]) => [a, String(b)]))}`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'What is the level of ploidy of herb R?',
        value: ploidy(R, x),
        sol: `${R} / ${x} = ${ploidy(R, x)} sets.`,
        scheme: [[`${ploidy(R, x)}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('b', mcq({
        stem: 'The botanist uses the chromosome numbers to treat R as a separate species. Which branch of taxonomy is this?',
        right: 'Cytotaxonomy',
        wrong: ['Chemotaxonomy', 'Numerical taxonomy', 'Nomenclature'],
        sol: 'Chromosome number is the data of cytotaxonomy — option (@K).',
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why can counting chromosomes alone not separate herbs P and Q, and what other kind of data could be tried?',
        model: 'P and Q have the **same chromosome number** (twenty), so counting separates nothing. Other data could be tried, such as **chromosome shape** and banding, **chemical constituents** (chemotaxonomy) or **many other characters** scored for numerical taxonomy.',
        sol: 'Same number; another data type.',
        scheme: [['Same chromosome number', 1], ['Another kind of data', 1]],
        d: 3, c: 'analysis', t: [1],
      })),
    ],
  }));
}
void round;
void YEARS;
