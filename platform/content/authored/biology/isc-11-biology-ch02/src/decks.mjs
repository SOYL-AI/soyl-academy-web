// ISC 11 Biology ch02 Biological Classification: Domains, Kingdoms and Monera. Part 1 (t01-t02) domains, kingdoms and the bacterial cell;
// Part 2 (t03-t04) reproduction (definitions only), archaebacteria, Mycoplasma and the uses of bacteria.
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { BACT, SHAPES, GRAM as GRAM_SVG, DOMAINS } from './svgs.mjs';
import { DOM, KING, hetOnly, YEAR, mag, toMm, SIZE, growth, generations, GROWTH_ROWS, GRAM, pct, biogas } from './calc.mjs';

export const V = {
  domains: svgV(DOMAINS, 'Tree of life with the three domains Bacteria, Archaea and Eukarya'),
  bact: svgV(BACT, 'Labelled diagram of a typical bacterial cell'),
  shapes: svgV(SHAPES, 'Shapes of bacteria: coccus, diplococcus, streptococcus, staphylococcus, bacillus, vibrio and spirillum'),
  gram: svgV(GRAM_SVG, 'Cross-sections of Gram-positive and Gram-negative cell walls'),
};

// ---------------------------------------------------------------- computed numbers
const HET = hetOnly.length;
const BAC_MM = toMm(mag(SIZE.bacillus, 1000));
const MYC_UM = mag(SIZE.mycoplasma, 1000);
const RATIO = SIZE.bacillus / SIZE.mycoplasma;
const GAP = YEAR.woese - YEAR.whittaker;
const PURPLE = pct(GRAM.purple, GRAM.total);
const GEN = generations(40, 240);
const END = growth(500, 40, 240);
const GAS25 = biogas(25);
const GAS60 = biogas(60);

export const deck1 = deck({
  part: 1,
  title: 'Biological Classification — Part 1: Domains, kingdoms and the bacterial cell',
  goals: [
    'List the distinguishing features of the three domains and tabulate the five kingdoms',
    'Draw and label a typical bacterial cell',
    'Classify bacteria by shape, nutrition and respiration, and distinguish Gram-positive from Gram-negative bacteria',
  ],
  slides: [
    sl('title', 'Biological Classification', {
      b: 'Part 1: from three domains and five kingdoms to the structure of a bacterium.',
      v: flow('LR', [['d', 'Three domains (Woese)'], ['k', 'Five kingdoms (Whittaker)'], ['m', 'Kingdom Monera: bacteria']], [['d', 'k'], ['k', 'm']], 'Flow from domains to kingdoms to Monera'),
      n: 'Life can be grouped at the largest scale into three domains, and within them into five kingdoms. This part studies the domains and kingdoms, and then looks closely at kingdom Monera, the bacteria.',
    }),
    sl('concept', 'Three domains of life', {
      b: `Carl Woese proposed three domains in ${YEAR.woese}, ${GAP} years after Whittaker's five kingdoms, using ribosomal RNA sequences.`,
      v: table(['Domain', 'Cell type', 'Cell wall', 'Membrane lipids'], DOM.map((x) => [x.d, x.cell, x.wall, x.lipid]), 'Table of the three domains with cell type, cell wall and membrane lipids'),
      n: 'Woese compared the ribosomal RNA of many organisms and found that archaebacteria form a separate line. Archaea and Bacteria are both prokaryotes, but their cell walls and membrane lipids differ. Eukarya has cells with a true nucleus.',
    }),
    sl('diagram', 'The tree of three domains', {
      b: 'On the ribosomal RNA tree, Archaea are closer to Eukarya than to Bacteria, even though Archaea and Bacteria both lack a nucleus.',
      v: V.domains,
      n: 'The tree has three main branches. Bacteria diverge first. Archaea and Eukarya share a more recent common ancestor. Both bacteria and archaea are prokaryotes, and all protists, fungi, plants and animals belong to Eukarya.',
    }),
    sl('concept', 'Five kingdoms', {
      b: 'R. H. Whittaker proposed five kingdoms in 1969, using cell type, body organisation and mode of nutrition.',
      v: table(['Kingdom', 'Cell type', 'Body organisation', 'Cell wall', 'Nutrition'], KING.map((x) => [x.k, x.cell, x.body, x.wall, x.food]), 'Table of the five kingdoms by cell type, body organisation, cell wall and nutrition'),
      n: 'Monera has prokaryotic cells. The other four kingdoms are eukaryotic. Protista are mostly single-celled, while fungi, plants and animals are multicellular. Plants make their own food, fungi absorb food and animals ingest it.',
    }),
    sl('example', 'Worked example 1: placing three organisms', {
      b: 'Three unknown organisms are described. Place each in a kingdom.',
      ul: [
        '**X**: single cell, no nuclear membrane, wall of peptidoglycan: prokaryote, so **Monera**.',
        '**Y**: many cells, true nuclei, chitin wall, absorbs food: **Fungi**.',
        '**Z**: single cell with a nucleus and a shell of silica, makes food by photosynthesis: **Protista**.',
      ],
      v: table(['Organism', 'Key features', 'Kingdom'], [['X', 'Prokaryote; peptidoglycan wall', 'Monera'], ['Y', 'Multicellular; chitin; absorptive', 'Fungi'], ['Z', 'Unicellular eukaryote; silica shell; photosynthetic', 'Protista']], 'Worked table placing three organisms in kingdoms'),
      n: 'Use the cell type first. If there is no nuclear membrane, the organism is in Monera. Then look at body plan, wall material and nutrition. A chitin wall with absorptive feeding points to fungi, and a single-celled photosynthetic eukaryote is a protist.',
    }),
    sl('check', 'Quick check: kingdoms', {
      b: 'Use the table of kingdoms. In how many kingdoms are all the members heterotrophic?',
      n: 'Quick check. Look at the nutrition column.',
      chk: 'kingdoms-num',
    }),
    sl('diagram', 'A typical bacterial cell', {
      b: 'Bacteria are the smallest, simplest cells. Learn the parts from outside to inside.',
      v: V.bact,
      n: 'From outside inward: a capsule, a rigid cell wall of peptidoglycan, and the plasma membrane. Inside are the nucleoid, a small ring of DNA called a plasmid, ribosomes and sometimes a mesosome. Pili help attachment and a flagellum helps movement.',
    }),
    sl('concept', 'Parts of the bacterial cell', {
      b: 'Each part has a job.',
      v: table(['Part', 'Description and function'], [['Capsule', 'Sticky outer layer; protects the cell and helps it stick to surfaces'], ['Cell wall', 'Rigid layer of peptidoglycan; gives shape and protection'], ['Plasma membrane', 'Selectively permeable; may fold inwards as a mesosome'], ['Nucleoid', 'Region with the single circular chromosome; no nuclear membrane'], ['Plasmid', 'Small circular DNA; may carry genes for antibiotic resistance'], ['Ribosomes', 'Make proteins; smaller than those of eukaryotes'], ['Flagellum and pili', 'Movement; attachment, and the pili used in gene transfer']], 'Table of the parts of a bacterial cell and their functions'),
      n: 'The nucleoid is not enclosed by a membrane. A plasmid is a small extra ring of DNA that can carry useful genes such as resistance to antibiotics. The flagellum moves the cell, while pili help it attach.',
    }),
    sl('example', 'Worked example 2: how big does it look?', {
      b: `A bacillus ${SIZE.bacillus} micrometres long is seen under a microscope that magnifies a thousand times. How long does it look, and how much longer is it than a Mycoplasma cell of ${SIZE.mycoplasma} micrometre?`,
      ul: [
        `Apparent length = ${SIZE.bacillus} × 1000 = ${mag(SIZE.bacillus, 1000)} micrometres = **${BAC_MM} millimetres**.`,
        `Mycoplasma under the same lens: ${SIZE.mycoplasma} × 1000 = **${MYC_UM}** micrometres.`,
        `Ratio of lengths = ${SIZE.bacillus} ÷ ${SIZE.mycoplasma} = **${RATIO}**.`,
      ],
      v: table(['Cell', 'Actual size (micrometres)', 'Seen at 1000 times'], [['Bacillus', String(SIZE.bacillus), `${BAC_MM} millimetres`], ['Mycoplasma', String(SIZE.mycoplasma), `${toMm(MYC_UM)} millimetre`]], 'Worked table of apparent sizes of a bacillus and a Mycoplasma cell'),
      n: 'Multiply the actual length by the magnification. A bacillus of two micrometres looks two millimetres long at a thousand times. A Mycoplasma cell is twenty times shorter than that bacillus, which is why it is called the smallest living cell.',
    }),
    sl('check', 'Quick check: magnification', {
      b: 'A coccus of 1 micrometre diameter is viewed at 500 times. What diameter does it appear to have, in millimetres?',
      n: 'Quick check. Convert micrometres to millimetres by dividing by one thousand.',
      chk: 'mag-num',
    }),
    sl('diagram', 'Shapes of bacteria', {
      b: 'Bacteria are classified by shape into **cocci, bacilli, vibrios** and **spirilla**; cocci may form pairs, chains or clusters.',
      v: V.shapes,
      n: 'A coccus is spherical. Cocci in pairs are diplococci, in chains are streptococci and in grape-like clusters are staphylococci. A bacillus is rod-shaped, a vibrio is comma-shaped and a spirillum is spiral.',
    }),
    sl('concept', 'Nutrition and respiration', {
      b: 'Bacteria differ in how they feed and how they respire.',
      v: table(['Basis', 'Group', 'Feature and example'], [['Nutrition', 'Photoautotroph', 'Uses light energy; cyanobacteria, purple sulphur bacteria'], ['Nutrition', 'Chemoautotroph', 'Uses energy from inorganic chemicals; nitrifying and sulphur bacteria'], ['Nutrition', 'Heterotroph', 'Needs ready-made food; saprophytes (decay) and parasites (disease)'], ['Respiration', 'Obligate aerobe', 'Needs oxygen; Mycobacterium'], ['Respiration', 'Obligate anaerobe', 'Killed by oxygen; Clostridium'], ['Respiration', 'Facultative anaerobe', 'Lives with or without oxygen; Escherichia coli']], 'Table of bacterial groups by nutrition and by respiration'),
      n: 'Autotrophic bacteria make their own food, either with light or with chemical energy. Heterotrophic bacteria are saprophytes or parasites. For respiration, obligate aerobes need oxygen, obligate anaerobes cannot tolerate it, and facultative anaerobes manage either way.',
    }),
    sl('diagram', 'Gram-positive and Gram-negative walls', {
      b: 'Hans Christian Gram devised a stain in 1884 that divides bacteria into two groups by the structure of their walls.',
      v: V.gram,
      n: 'A Gram-positive wall has a thick layer of peptidoglycan and keeps the purple stain. A Gram-negative wall has a thin layer of peptidoglycan inside an outer membrane, loses the purple stain and takes up the pink counterstain.',
    }),
    sl('concept', 'The Gram staining steps', {
      b: 'Gram-positive: Staphylococcus, Bacillus. Gram-negative: Escherichia coli, Vibrio cholerae.',
      v: flow('LR', [['s1', 'Crystal violet'], ['s2', 'Iodine'], ['s3', 'Alcohol wash'], ['s4', 'Safranin']], [['s1', 's2'], ['s2', 's3'], ['s3', 's4']], 'Flow of the four steps of Gram staining'),
      n: 'Stain the smear with crystal violet, then add iodine, then wash with alcohol, and finally add the counterstain safranin. Gram-positive cells stay purple. Gram-negative cells lose the first stain and appear pink.',
    }),
    sl('check', 'Quick check: reading a smear', {
      b: `A smear shows ${GRAM.total} cells, of which ${GRAM.purple} are purple. What percentage are Gram-positive?`,
      n: 'Quick check. Which colour do Gram-positive cells keep?',
      chk: 'gram-num',
    }),
    sl('check', 'Quick check: domains', {
      b: 'Judge the assertion and the reason about the domains of life.',
      n: 'Quick check. What separates archaea from bacteria?',
      chk: 'domain-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Three domains (Woese, ${YEAR.woese}): Archaea, Bacteria, Eukarya; two are prokaryotic.`,
        `Five kingdoms (Whittaker, ${YEAR.whittaker}): Monera, Protista, Fungi, Plantae, Animalia; only Monera is prokaryotic.`,
        'Bacterial cell: capsule, wall, membrane, nucleoid, plasmid, ribosomes, flagellum, pili.',
        'Shapes: coccus, bacillus, vibrio, spirillum; nutrition autotrophic or heterotrophic; respiration aerobic, anaerobic or facultative.',
        'Gram-positive: thick peptidoglycan, purple. Gram-negative: thin peptidoglycan and outer membrane, pink.',
      ],
      v: table(['Domain', 'Prokaryotic?'], DOM.map((x) => [x.d, x.cell === 'Prokaryotic' ? 'Yes' : 'No']), 'Summary table of the three domains and whether each is prokaryotic'),
      n: 'To recap: three domains and five kingdoms organise life. Bacteria have a capsule, a peptidoglycan wall, a nucleoid and plasmids, come in four basic shapes, and are divided into Gram-positive and Gram-negative by their wall.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name **Woese** with the three domains and **Whittaker** with the five kingdoms.',
        'When drawing a bacterial cell, **label** capsule, wall, membrane, nucleoid, plasmid, ribosomes and flagellum.',
        'Link **Gram-positive** with a **thick** peptidoglycan layer and the purple stain.',
        'Say that the nucleoid has **no nuclear membrane**.',
      ],
      n: 'Exam tips. Link each classification to its scientist. Label the parts of a bacterial cell carefully. Remember that Gram-positive cells have a thick wall and stay purple. And say that the nucleoid lacks a nuclear membrane.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Biological Classification — Part 2: Reproduction, archaebacteria, Mycoplasma and uses of bacteria',
  goals: [
    'Define fission, conjugation, transduction and transformation',
    'Relate each group of archaebacteria to its extreme habitat and state three features of Mycoplasma',
    'Explain the role of bacteria in sewage treatment, energy production, antibiotics, curd and cheese',
  ],
  slides: [
    sl('title', 'Reproduction, extremes and uses', {
      b: 'Part 2: how bacteria multiply, where the toughest ones live, and how people use them.',
      v: flow('LR', [['f', 'Fission and gene transfer'], ['a', 'Archaebacteria'], ['m', 'Mycoplasma'], ['u', 'Uses of bacteria']], [['f', 'a'], ['a', 'm'], ['m', 'u']], 'Flow of the four topics of Part 2'),
      n: 'This part covers four things: how bacteria reproduce and exchange genes, the archaebacteria that live in extreme places, the wall-less Mycoplasma, and the many ways in which bacteria help us.',
    }),
    sl('concept', 'Reproduction in bacteria: definitions', {
      b: 'Only the **meaning** of each term is needed at this level.',
      v: table(['Term', 'Meaning'], [['Fission', 'A bacterial cell divides into two identical daughter cells; the usual way of increasing in number'], ['Conjugation', 'Transfer of DNA from one bacterium to another through direct contact'], ['Transduction', 'Transfer of bacterial DNA from one bacterium to another by a bacteriophage'], ['Transformation', 'Uptake of naked DNA from the surroundings by a bacterium']], 'Table defining fission, conjugation, transduction and transformation'),
      n: 'Fission makes two identical cells. The other three terms describe ways in which bacteria exchange genes without dividing: conjugation through contact, transduction by a virus, and transformation by taking up free DNA.',
    }),
    sl('check', 'Quick check: gene transfer', {
      b: 'Decide whether the statement about transformation is true or false.',
      n: 'Quick check. Does transformation need a virus?',
      chk: 'transf-tf',
    }),
    sl('example', 'Worked example 1: growth by fission', {
      b: `A tub of milk is seeded with 500 curd bacteria, each dividing every 40 minutes. How many bacteria after 4 hours if growth is unchecked?`,
      ul: [
        `4 hours = 240 minutes, so the number of generations = 240 ÷ 40 = **${GEN}**.`,
        `Each generation doubles the number: 500 × 2 to the power ${GEN} = **${END}**.`,
      ],
      v: table(['Minutes', 'Number of bacteria'], GROWTH_ROWS.map(([t, n]) => [String(t), String(n)]), 'Worked table of the number of bacteria every forty minutes for four hours'),
      n: 'Count the generations first. Four hours holds six generations of forty minutes. Doubling six times multiplies the number by sixty-four, so five hundred cells become thirty-two thousand.',
    }),
    sl('check', 'Quick check: doubling', {
      b: 'A culture starts with 300 cells and each divides every 30 minutes. How many cells after 2 hours?',
      n: 'Quick check. First find the number of generations.',
      chk: 'growth-num',
    }),
    sl('concept', 'Archaebacteria', {
      b: 'Archaebacteria lack peptidoglycan in the cell wall and live where few other cells can.',
      v: table(['Group', 'Habitat', 'Feature'], [['Methanogens', 'Marshes, rice-field mud and the gut of ruminants', 'Strict anaerobes that make methane (biogas)'], ['Halophiles', 'Very salty lakes and salt pans', 'Need high salt concentration'], ['Thermoacidophiles', 'Hot, acidic springs', 'Tolerate high temperature and strong acid']], 'Table of three groups of archaebacteria with habitat and feature'),
      n: 'Each group is named for its habitat. Methanogens live without oxygen and release methane. Halophiles need very salty water. Thermoacidophiles live in hot, acidic springs. All three have cell walls without peptidoglycan.',
    }),
    sl('check', 'Quick check: extreme habitats', {
      b: 'Match each bacterial group with its habitat or feature.',
      n: 'Quick check. Think of the habitat each name suggests.',
      chk: 'arch-match',
    }),
    sl('concept', 'Mycoplasma', {
      b: 'Mycoplasma are also known as **pleuropneumonia-like organisms** (PPLO).',
      v: table(['Feature', 'Detail'], [['No cell wall', 'Plasma membrane is the outer boundary; shape varies'], ['Smallest living cells', `About ${SIZE.mycoplasma} micrometre across`], ['Can survive without oxygen', 'Many live in anaerobic conditions'], ['Pathogenic', 'Cause diseases in plants and animals']], 'Table of the distinctive features of Mycoplasma'),
      n: 'Mycoplasma have no cell wall, so they are flexible and can change shape. They are the smallest known living cells, and many survive without oxygen. Some cause disease in plants and animals.',
    }),
    sl('concept', 'Comparing the groups', {
      b: 'Three kinds of prokaryote, three kinds of wall.',
      v: table(['Group', 'Cell wall', 'Habitat', 'Example'], [['Eubacteria', 'Peptidoglycan', 'Everywhere', 'Escherichia coli'], ['Archaebacteria', 'No peptidoglycan', 'Extreme habitats', 'Methanogens, halophiles'], ['Mycoplasma', 'None', 'Hosts such as plants and animals', 'PPLO']], 'Table comparing eubacteria, archaebacteria and Mycoplasma'),
      n: 'Eubacteria have a peptidoglycan wall. Archaebacteria have a wall without peptidoglycan. Mycoplasma have no wall at all, which is why antibiotics that block wall synthesis do not harm them.',
    }),
    sl('concept', 'Sewage treatment', {
      b: 'Bacteria clean sewage in stages.',
      v: flow('LR', [['a', 'Raw sewage'], ['b', 'Solids removed'], ['c', 'Aerobic bacteria in activated sludge'], ['d', 'Settled sludge'], ['e', 'Anaerobic digestion by methanogens']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the stages of sewage treatment'),
      n: 'After solids are removed, aerobic bacteria in flocs called activated sludge break down the organic matter. The settled sludge goes to a digester, where anaerobic bacteria, including methanogens, digest it and release biogas.',
    }),
    sl('concept', 'Energy from dung: biogas', {
      b: 'Methanogens make methane, the main gas in **biogas**, from cattle dung and other wastes.',
      v: flow('LR', [['d', 'Cattle dung and water'], ['g', 'Digester without oxygen'], ['m', 'Methanogens act'], ['b', 'Biogas fuel and manure']], [['d', 'g'], ['g', 'm'], ['m', 'b']], 'Flow from cattle dung to biogas'),
      n: 'Dung mixed with water is placed in a closed tank without oxygen. Different bacteria break it down, and methanogens form methane. The gas serves as fuel for cooking and lighting, and the slurry that remains is a good manure.',
    }),
    sl('example', 'Worked example 2: gas from a dung digester', {
      b: `A small plant yields about 0.04 cubic metre of biogas from each kilogram of dung. How much gas is expected from 25 kilograms and from 60 kilograms?`,
      ul: [
        `25 × 0.04 = **${GAS25}** cubic metre.`,
        `60 × 0.04 = **${GAS60}** cubic metres.`,
        'The yield is an assumed figure for practice; real plants vary.',
      ],
      v: table(['Dung (kilograms)', 'Biogas (cubic metres)'], [['25', String(GAS25)], ['60', String(GAS60)]], 'Worked table of biogas from 25 and 60 kilograms of dung'),
      n: 'Multiply the mass of dung by the yield per kilogram. Twenty-five kilograms give one cubic metre, and sixty kilograms give two point four. The yield used here is an assumed value, chosen only for practice.',
    }),
    sl('check', 'Quick check: biogas', {
      b: 'How much biogas is expected from 40 kilograms of dung at 0.04 cubic metre per kilogram?',
      n: 'Quick check. Multiply the mass by the yield.',
      chk: 'biogas-num',
    }),
    sl('concept', 'Antibiotics, curd and cheese', {
      b: 'Many everyday products depend on bacteria.',
      v: table(['Product', 'Bacterium', 'What happens'], [['Antibiotic streptomycin', 'Streptomyces', 'Soil bacterium that makes a drug against other bacteria'], ['Curd', 'Lactobacillus', 'Changes lactose in milk to lactic acid, which sets the milk'], ['Cheese', 'Lactobacillus and others', 'Acid and enzymes ripen and set the milk protein'], ['Swiss cheese holes', 'Propionibacterium shermanii', 'Releases carbon dioxide gas that forms holes']], 'Table of antibiotics, curd and cheese with the bacteria that make them'),
      n: 'Streptomyces gives streptomycin. Lactobacillus turns lactose into lactic acid and so sets milk into curd. Cheese is ripened by bacteria, and the large holes of Swiss cheese come from carbon dioxide produced by Propionibacterium.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Fission: one cell divides into two. Conjugation, transduction and transformation transfer DNA (definitions only).',
        'Archaebacteria: methanogens, halophiles, thermoacidophiles; no peptidoglycan.',
        'Mycoplasma (PPLO): no cell wall, smallest cells, can live without oxygen.',
        'Uses: sewage treatment, biogas, antibiotics (Streptomyces), curd (Lactobacillus), cheese (Propionibacterium holes).',
      ],
      v: table(['Group', 'Habitat or use'], [['Methanogens', 'Marshes; biogas'], ['Halophiles', 'Salty lakes'], ['Thermoacidophiles', 'Hot acidic springs'], ['Mycoplasma', 'No wall; smallest']], 'Summary table of archaebacteria and Mycoplasma'),
      n: 'To recap: bacteria multiply by fission and may exchange genes in three ways. Archaebacteria live in extreme habitats, Mycoplasma lack a wall, and bacteria help us clean sewage, make fuel gas, medicines, curd and cheese.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **definitions only** for conjugation, transduction and transformation.',
        'Pair each archaebacterial group with its **habitat**.',
        'State **three features** of Mycoplasma: no wall, smallest, survives without oxygen.',
        'Name the **organism** with each product: Lactobacillus, Streptomyces, Propionibacterium.',
      ],
      n: 'Exam tips. Define the three gene transfer terms without detail. Link each archaebacterial group with its habitat. Give three features of Mycoplasma. And name the bacterium for every product.',
    }),
  ],
});
