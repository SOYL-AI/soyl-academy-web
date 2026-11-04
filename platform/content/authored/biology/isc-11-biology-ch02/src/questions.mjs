// ISC 11 Biology ch02 Biological Classification: Domains, Kingdoms and Monera. Question bank in ISC school-examination style.
// Every count, growth figure, magnification and percentage is computed in calc.mjs. AR keys use the ISC Biology options: a b c d.
import { mk, add, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { BACT_L } from './svgs.mjs';
import { hetOnly, mag, toMm, SIZE, growth, generations, GRAM, pct, biogas, YEAR, eq } from './calc.mjs';

const { mcq, ar, fill, tf, num, short, long, part, match } = mk;
const cellFig = svgV(BACT_L, 'A bacterial cell with five parts marked A to E');
const tbl = (head, body) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${body.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// ---------------------------------------------------------------- t01 domains and kingdoms
add('woese-mcq', mcq({
  stem: 'A student wishes to credit the scientist who used ribosomal RNA sequences to show that archaebacteria deserve a domain of their own. Whom should she name?',
  right: 'Carl Woese',
  wrong: ['R. H. Whittaker', 'Hans Christian Gram', 'Carolus Linnaeus'],
  sol: 'Carl Woese proposed the three domains on the evidence of ribosomal RNA — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('whittaker-mcq', mcq({
  stem: 'In which year did R. H. Whittaker put forward the five-kingdom scheme of classification?',
  right: `${YEAR.whittaker}`,
  wrong: ['1735', `${YEAR.gram}`, `${YEAR.woese}`],
  sol: `Whittaker proposed five kingdoms in ${YEAR.whittaker}; 1735 is the date of Systema Naturae, ${YEAR.gram} of Gram’s stain and ${YEAR.woese} of the three domains — option (@K).`,
  d: 1, c: 'recall', t: [1],
}));
add('mono-mcq', mcq({
  stem: 'Which one of the five kingdoms is made up entirely of prokaryotes?',
  right: 'Monera',
  wrong: ['Protista', 'Fungi', 'Plantae'],
  sol: 'Only Monera has cells without a nuclear membrane — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('euk-mcq', mcq({
  stem: 'Which kingdoms together make up the domain Eukarya?',
  right: 'Protista, Fungi, Plantae and Animalia',
  wrong: ['Monera, Protista, Fungi and Plantae', 'Monera and Protista only', 'Fungi, Plantae and Animalia only'],
  sol: 'Eukarya includes every eukaryotic kingdom, that is, all except Monera — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('key-protist-mcq', mcq({
  stem: 'A pond organism is a single cell with a nucleus and a glassy shell of silica, and it makes its food by photosynthesis. In which kingdom is it placed?',
  right: 'Protista',
  wrong: ['Monera', 'Plantae', 'Fungi'],
  sol: 'A unicellular eukaryote that photosynthesises belongs to Protista — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('nutr-mcq', mcq({
  stem: 'Which pair correctly matches a kingdom with the material of its cell wall?',
  right: 'Fungi and chitin',
  wrong: ['Plantae and chitin', 'Monera and cellulose', 'Animalia and peptidoglycan'],
  sol: 'Fungal walls are made of chitin; plant walls of cellulose; Monera have peptidoglycan; animal cells have no wall — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('acid-mcq', mcq({
  stem: 'A microbe from an acidic mine drain has membrane lipids with ether linkages and a cell wall without peptidoglycan. In which domain is it placed?',
  right: 'Archaea',
  wrong: ['Bacteria', 'Eukarya', 'It cannot be placed in any domain'],
  sol: 'Ether-linked lipids and walls without peptidoglycan mark the Archaea — option (@K).',
  d: 2, c: 'application', t: [1],
}));
{
  const n = hetOnly.length;
  add('kingdoms-num', num({
    stem: 'The five kingdoms of Whittaker are Monera, Protista, Fungi, Plantae and Animalia. Monera, Protista and Plantae include autotrophs. In how many of the five kingdoms are all the members heterotrophic?',
    value: n,
    sol: `Only ${hetOnly.join(' and ')} are wholly heterotrophic: ${n} kingdoms.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 2 || 'value');
}
add('domain-ar', ar({
  a: 'On the ribosomal RNA tree, Archaea are more closely related to Eukarya than to Bacteria.',
  r: 'Archaea possess a nucleus enclosed by a nuclear membrane.',
  key: 'c',
  sol: 'A is true. R is false: archaea are prokaryotes and have no nuclear membrane — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('whit-ar', ar({
  a: 'Whittaker’s five-kingdom scheme is based on cell type, body organisation and mode of nutrition.',
  r: 'The five-kingdom scheme was proposed in the year 1969.',
  key: 'b',
  sol: 'Both are true, but the date of the proposal does not explain the criteria used — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('reason-short', short({
  marks: 1,
  stem: 'Give a reason: Whittaker placed bacteria in a kingdom separate from those of plants and fungi.',
  model: 'Bacteria are **prokaryotes**, with no nuclear membrane, unlike the **eukaryotic** cells of the other kingdoms.',
  sol: 'Prokaryotic cells.',
  scheme: [['Prokaryotic, no nuclear membrane', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('domain-short2', short({
  marks: 2,
  stem: 'Name the three domains of life, and state the scientist and the year associated with this scheme.',
  model: `The three domains are **Archaea, Bacteria and Eukarya**. The scheme was proposed by **Carl Woese** (with colleagues) in **${YEAR.woese}**, on the evidence of ribosomal RNA sequences.`,
  sol: 'Three domains; Woese and year.',
  scheme: [['Three domains', 1], ['Woese and the year', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('kingdoms-short2', short({
  marks: 2,
  stem: 'Name the kingdom described in each case: (i) prokaryotic cells with walls of peptidoglycan; (ii) multicellular heterotrophs that ingest food and have no cell wall; (iii) walls of chitin and absorptive nutrition; (iv) multicellular autotrophs with cellulose walls.',
  model: '(i) **Monera**; (ii) **Animalia**; (iii) **Fungi**; (iv) **Plantae**.',
  sol: 'Four kingdoms.',
  scheme: [['Two kingdoms correct', 1], ['All four correct', 1]],
  wl: [4, 40],
  d: 2, c: 'application', t: [1],
}));
add('domain3-short3', short({
  marks: 3,
  stem: 'Compare the three domains with respect to cell type, the presence of peptidoglycan in the cell wall and the nature of the membrane lipids.',
  model: '**Archaea:** prokaryotic cells; wall **without peptidoglycan**; **ether-linked, branched** membrane lipids.\n**Bacteria:** prokaryotic cells; wall **with peptidoglycan**; **ester-linked** lipids.\n**Eukarya:** **eukaryotic** cells with a nucleus; no peptidoglycan (walls of cellulose or chitin, or none); ester-linked lipids.',
  sol: 'Three domains compared.',
  scheme: [['Archaea', 1], ['Bacteria', 1], ['Eukarya', 1]],
  wl: [25, 90],
  d: 2, c: 'understanding', t: [1],
}));
add('king-short3', short({
  marks: 3,
  stem: 'Compare Monera, Protista and Plantae with respect to cell type, body organisation and mode of nutrition.',
  model: '**Monera:** prokaryotic; unicellular; autotrophic or heterotrophic.\n**Protista:** eukaryotic; mostly unicellular; autotrophic or heterotrophic.\n**Plantae:** eukaryotic; multicellular with tissues and organs; autotrophic by photosynthesis.',
  sol: 'Three kingdoms compared.',
  scheme: [['Monera', 1], ['Protista', 1], ['Plantae', 1]],
  wl: [25, 90],
  d: 2, c: 'understanding', t: [1],
}));
add('kingdoms-long', long({
  stem: '(a) Name the five kingdoms of Whittaker and state the year in which they were proposed. [1]\n(b) For Monera, Fungi and Animalia state the cell type, the cell wall and the mode of nutrition. [3]\n(c) Which one of the five kingdoms is shared between two domains, and which two domains? [1]',
  model: `(a) **Monera, Protista, Fungi, Plantae and Animalia**, proposed by Whittaker in **${YEAR.whittaker}**.\n\n(b) **Monera:** prokaryotic, wall of peptidoglycan (absent in Mycoplasma), autotrophic or heterotrophic. **Fungi:** eukaryotic, wall of chitin, heterotrophic by absorption. **Animalia:** eukaryotic, no cell wall, heterotrophic by ingestion.\n\n(c) **Monera**, whose members are placed in the domains **Bacteria and Archaea**.`,
  sol: 'Five kingdoms; three compared; Monera in two domains.',
  scheme: [['(a) Five kingdoms and the year', 1], ['(b) Monera', 1], ['(b) Fungi', 1], ['(b) Animalia', 1], ['(c) Monera in Bacteria and Archaea', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 bacteria
add('fig-nucleoid-mcq', mcq({
  stem: 'The figure shows a bacterial cell with five parts marked A to E. Which letter marks the region that holds the single circular chromosome and is not enclosed by a nuclear membrane?',
  right: 'D',
  wrong: ['A', 'B', 'E'],
  sol: 'The nucleoid, marked D, holds the circular DNA without a nuclear membrane — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [cellFig],
}));
add('fig-wall-mcq', mcq({
  stem: 'In the same figure, which letter marks the rigid layer of peptidoglycan that gives the cell its shape?',
  right: 'B',
  wrong: ['A', 'C', 'D'],
  sol: 'The rigid layer just inside the slime layer is the cell wall, marked B — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [cellFig],
}));
add('fig-flag-mcq', mcq({
  stem: 'In the same figure, which letter marks the structure that moves the cell through a liquid?',
  right: 'E',
  wrong: ['A', 'B', 'C'],
  sol: 'The whip-like flagellum, marked E, propels the cell — option (@K).',
  d: 1, c: 'application', t: [2],
  assets: [cellFig],
}));
add('shape-mcq', mcq({
  stem: 'Under a microscope a technician sees spherical bacteria joined end to end in long chains, like beads on a string. They are called',
  right: 'streptococci',
  wrong: ['staphylococci', 'diplococci', 'bacilli'],
  sol: 'Cocci arranged in chains are streptococci — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('resp-mcq', mcq({
  stem: 'The bacterium that causes tetanus grows in a deep, dirty wound and dies when exposed to air. It is best described as an',
  right: 'obligate anaerobe',
  wrong: ['obligate aerobe', 'facultative anaerobe', 'photoautotroph'],
  sol: 'An organism killed by oxygen is an obligate anaerobe — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('nutri-mcq', mcq({
  stem: 'A bacterium living in a sulphur spring oxidises hydrogen sulphide to obtain energy and builds sugars from carbon dioxide. Its mode of nutrition is',
  right: 'chemoautotrophic',
  wrong: ['photoautotrophic', 'saprophytic', 'parasitic'],
  sol: 'Energy from inorganic chemicals with carbon dioxide as the carbon source is chemoautotrophy — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gram-mcq', mcq({
  stem: 'After Gram staining, a smear shows cells that kept the purple stain after the alcohol wash. What does this show about their walls?',
  right: 'They have a thick layer of peptidoglycan',
  wrong: ['They have a thin layer of peptidoglycan inside an outer membrane', 'They have no peptidoglycan at all', 'They have walls of chitin'],
  sol: 'Cells that keep crystal violet are Gram-positive, with a thick peptidoglycan layer — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gramneg-mcq', mcq({
  stem: 'Which structure is present in Gram-negative bacteria but absent in Gram-positive bacteria?',
  right: 'An outer membrane containing lipopolysaccharide',
  wrong: ['A plasma membrane', 'A thick layer of peptidoglycan', 'Ribosomes'],
  sol: 'Gram-negative walls have an outer membrane with lipopolysaccharide — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('plasmid-mcq', mcq({
  stem: 'A harmless bacterium suddenly becomes resistant to an antibiotic after receiving a small circular DNA molecule from another cell. This DNA molecule is called a',
  right: 'plasmid',
  wrong: ['nucleoid', 'mesosome', 'ribosome'],
  sol: 'Small circular extra DNA that can carry resistance genes is a plasmid — option (@K).',
  d: 2, c: 'application', t: [2],
}));
{
  const mm = toMm(mag(1, 500));
  add('mag-num', num({
    stem: 'A coccus has a diameter of 1 micrometre. It is viewed under a microscope that magnifies 500 times. What diameter does it appear to have, in millimetres?',
    value: mm, tol: 0.001, unit: 'mm',
    sol: `1 micrometre × 500 = 500 micrometres = ${mm} millimetre.`,
    scheme: [[`${mm} mm`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 0.5 || 'value');
}
{
  const p = pct(GRAM.purple, GRAM.total);
  add('gram-num', num({
    stem: `A Gram-stained smear shows ${GRAM.total} cells, of which ${GRAM.purple} are purple and the rest pink. What percentage of the cells are Gram-positive?`,
    value: p, tol: 0.05, unit: '%',
    sol: `${GRAM.purple} / ${GRAM.total} × 100 = ${p} percent.`,
    scheme: [[`${p}%`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 60 || 'value');
}
{
  const r = SIZE.coccus / SIZE.mycoplasma;
  add('ratio-num', num({
    stem: 'A coccus is 1 micrometre across and a Mycoplasma cell is 0.1 micrometre across. How many times wider is the coccus than the Mycoplasma cell?',
    value: r, tol: 0.01,
    sol: `1 ÷ 0.1 = ${r} times.`,
    scheme: [[`${r}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 10 || 'value');
}
add('counter-fill', fill({
  stem: 'In Gram staining, the counterstain applied after the alcohol wash is ______.',
  acc: [['safranin', 'Safranin']],
  sol: 'Safranin.',
  d: 1, c: 'recall', t: [2],
}));
add('nucleoid-tf', tf({
  stem: 'The nucleoid of a bacterial cell is enclosed by a nuclear membrane.',
  key: 'f',
  sol: 'False. The nucleoid is a region of cytoplasm holding the circular DNA, with no nuclear membrane.',
  d: 1, c: 'recall', t: [2],
}));
add('gram-ar', ar({
  a: 'Gram-positive bacteria appear purple after Gram staining.',
  r: 'The Gram stain was devised by Hans Christian Gram in 1884.',
  key: 'b',
  sol: 'Both statements are true, but the date of the discovery does not explain the colour — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('anaerobe-ar', ar({
  a: 'The tetanus bacterium cannot be grown on an open dish exposed to air.',
  r: 'The tetanus bacterium is a facultative anaerobe.',
  key: 'c',
  sol: 'A is true: the bacterium is killed by oxygen. R is false: it is an obligate anaerobe — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('analogy1-short', short({
  marks: 1,
  stem: 'Complete the analogy: Gram-positive : thick peptidoglycan layer :: Gram-negative : ______',
  model: 'A **thin peptidoglycan layer inside an outer membrane**.',
  sol: 'Thin layer and outer membrane.',
  scheme: [['Thin peptidoglycan with an outer membrane', 1]],
  wl: [3, 25],
  d: 2, c: 'understanding', t: [2],
}));
add('struct-short2', short({
  marks: 2,
  stem: 'Name the structure of a bacterial cell that (i) carries genes for antibiotic resistance outside the main chromosome, and (ii) is the region that holds the main chromosome without a nuclear membrane.',
  model: '(i) The **plasmid**, a small circular DNA molecule. (ii) The **nucleoid**, which contains the single circular chromosome and is not bounded by a nuclear membrane.',
  sol: 'Plasmid; nucleoid.',
  scheme: [['Plasmid', 1], ['Nucleoid', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('gram-short2', short({
  marks: 2,
  stem: 'State two differences between Gram-positive and Gram-negative bacteria.',
  model: '**Gram-positive** bacteria have a **thick** peptidoglycan layer and **no outer membrane**, so they keep the crystal violet and look **purple**. **Gram-negative** bacteria have a **thin** peptidoglycan layer inside an **outer membrane**, lose the crystal violet and look **pink** with safranin.',
  sol: 'Wall thickness and outer membrane; colour.',
  scheme: [['Difference in the wall', 1], ['Difference in the stain colour', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('bact-short3', short({
  marks: 3,
  stem: 'Describe the nucleoid, the capsule and the flagellum of a bacterial cell, stating the function of each.',
  model: 'The **nucleoid** is the region of the cytoplasm that holds the single circular chromosome, with **no nuclear membrane**; it controls the cell. The **capsule** is a sticky outer layer that **protects** the cell and helps it **stick to surfaces**. The **flagellum** is a whip-like structure that **moves** the cell.',
  sol: 'Three structures with functions.',
  scheme: [['Nucleoid', 1], ['Capsule', 1], ['Flagellum', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('classify-short3', short({
  marks: 3,
  stem: 'Classify bacteria (i) by shape, naming four types, and (ii) by nutrition, naming the main groups with one example of each.',
  model: '(i) By shape: **coccus** (spherical), **bacillus** (rod), **vibrio** (comma) and **spirillum** (spiral). (ii) By nutrition: **autotrophs**, either **photoautotrophs** such as cyanobacteria or **chemoautotrophs** such as nitrifying bacteria; and **heterotrophs**, which include **saprophytes** and **parasites**.',
  sol: 'Four shapes; nutrition groups.',
  scheme: [['Four shapes', 1], ['Autotrophic groups with examples', 1], ['Heterotrophic groups', 1]],
  wl: [25, 90],
  d: 2, c: 'understanding', t: [2],
}));
add('gram3-short3', short({
  marks: 3,
  stem: 'Describe briefly how Gram staining divides bacteria into two groups. Name the stains used and the colours that the two groups show.',
  model: 'A smear is stained with **crystal violet**, treated with **iodine**, washed with **alcohol** and counterstained with **safranin**. **Gram-positive** bacteria, with a thick peptidoglycan wall, **retain the crystal violet** and look **purple**. **Gram-negative** bacteria, with a thin wall and an outer membrane, lose it and take up safranin, so they look **pink**.',
  sol: 'Steps; two colours.',
  scheme: [['Stains and order of steps', 1], ['Gram-positive purple and why', 1], ['Gram-negative pink and why', 1]],
  d: 2, c: 'application', t: [2],
}));
add('bacteria-long', long({
  stem: '(a) Draw a labelled diagram of a typical bacterial cell, showing at least five parts. [2]\n(b) Distinguish between obligate aerobes, obligate anaerobes and facultative anaerobes, with one example of each. [2]\n(c) State one function of pili and one function of flagella. [1]',
  model: '(a) A rod-shaped cell showing the **capsule, cell wall, plasma membrane, cytoplasm, nucleoid, plasmid, ribosomes, flagellum and pili**, with the nucleoid unbounded by a membrane (five correct labels for full marks).\n\n(b) **Obligate aerobes** need oxygen (*Mycobacterium*); **obligate anaerobes** are killed by oxygen (*Clostridium*); **facultative anaerobes** can live with or without oxygen (*Escherichia coli*).\n\n(c) **Pili** help the cell attach to surfaces or to other cells; **flagella** move the cell.',
  sol: 'Diagram; three respiration types; functions.',
  scheme: [['(a) Diagram drawn with correct outline', 1], ['(a) Five labels', 1], ['(b) Distinction of the three types', 1], ['(b) Three examples', 1], ['(c) Function of pili and flagella', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 reproduction (definitions only), archaebacteria, Mycoplasma
add('fission-mcq', mcq({
  stem: 'A single bacterial cell in a nutrient broth constricts in the middle and separates into two identical daughter cells. This is',
  right: 'fission',
  wrong: ['conjugation', 'transduction', 'transformation'],
  sol: 'Division of one cell into two identical cells is fission — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('transduction-mcq', mcq({
  stem: 'A bacteriophage carries a fragment of DNA from one bacterium into another, where it becomes part of the genome. This transfer is called',
  right: 'transduction',
  wrong: ['transformation', 'conjugation', 'fission'],
  sol: 'DNA moved from one bacterium to another by a bacteriophage is transduction — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('transformation-mcq', mcq({
  stem: 'A harmless bacterium acquires a new trait after taking up naked DNA released by dead cells in its surroundings. This process is',
  right: 'transformation',
  wrong: ['transduction', 'conjugation', 'fission'],
  sol: 'Uptake of naked DNA from the surroundings is transformation — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('methano-mcq', mcq({
  stem: 'Bubbles of methane rise from the oxygen-free mud of a paddy field. Which bacteria form the gas?',
  right: 'Methanogens',
  wrong: ['Halophiles', 'Thermoacidophiles', 'Cyanobacteria'],
  sol: 'Strict anaerobes that produce methane are the methanogens — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('halo-mcq', mcq({
  stem: 'Which archaebacteria would you expect to find in a lake whose water is several times saltier than sea water?',
  right: 'Halophiles',
  wrong: ['Methanogens', 'Thermoacidophiles', 'Nitrifying bacteria'],
  sol: 'Archaebacteria that need very high salt concentrations are halophiles — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('thermo-mcq', mcq({
  stem: 'A prokaryote grows best in a spring at about 80 degrees Celsius and at a very low pH. It is a',
  right: 'thermoacidophile',
  wrong: ['halophile', 'methanogen', 'cyanobacterium'],
  sol: 'Tolerance of high temperature and strong acid defines a thermoacidophile — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('archwall-mcq', mcq({
  stem: 'Which statement about the cell wall of archaebacteria is correct?',
  right: 'It does not contain peptidoglycan',
  wrong: ['It is made of cellulose', 'It is made of chitin', 'It is absent in all archaebacteria'],
  sol: 'Archaebacterial walls lack peptidoglycan — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('myco-mcq', mcq({
  stem: 'Which feature is characteristic of Mycoplasma?',
  right: 'It has no cell wall',
  wrong: ['It has a thick peptidoglycan wall', 'It has a true nucleus', 'It is larger than most bacteria'],
  sol: 'Mycoplasma lack a cell wall and are the smallest living cells — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('mycopen-mcq', mcq({
  stem: 'Penicillin kills many bacteria by blocking the building of the cell wall, yet it is useless against Mycoplasma. The reason is that Mycoplasma',
  right: 'have no cell wall for the drug to attack',
  wrong: ['are eukaryotes', 'have a wall of chitin that the drug cannot enter', 'live only in oxygen-rich habitats'],
  sol: 'A drug that blocks wall synthesis cannot act on a cell without a wall — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
{
  const g = generations(30, 150);
  const n = growth(1, 30, 150);
  add('gen-num', num({
    stem: 'A bacterium divides every 30 minutes. Starting from a single cell, how many cells will there be after 2 hours 30 minutes if growth is unchecked?',
    value: n,
    sol: `150 / 30 = ${g} generations; 2 to the power ${g} = ${n} cells.`,
    scheme: [[`${n}`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 32 || 'value');
}
{
  const n = growth(300, 30, 120);
  add('growth-num', num({
    stem: 'A culture starts with 300 cells and each cell divides every 30 minutes. How many cells will there be after 2 hours if growth is unchecked?',
    value: n,
    sol: `120 / 30 = 4 generations: 300 × 2 to the power 4 = 300 × 16 = ${n}.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 4800 || 'value');
}
add('transf-tf', tf({
  stem: 'Transformation in bacteria needs a bacteriophage to carry the DNA from one cell to another.',
  key: 'f',
  sol: 'False. Transformation is the uptake of naked DNA from the surroundings; carrying DNA by a bacteriophage is transduction.',
  d: 2, c: 'understanding', t: [3],
}));
add('arch-match', match({
  stem: 'Match each group of prokaryotes in column I with its habitat or feature in column II.',
  pairs: [['Methanogens', 'Strict anaerobes of marshes and the gut of ruminants'], ['Halophiles', 'Very salty lakes and salt pans'], ['Thermoacidophiles', 'Hot, acidic springs'], ['Mycoplasma', 'No cell wall; smallest living cells']],
  order: [2, 0, 3, 1],
  marks: 2,
  sol: 'Methanogens live in oxygen-free marshes and guts; halophiles need salt; thermoacidophiles live in hot acid springs; Mycoplasma lack a wall.',
  d: 2, c: 'understanding', t: [3],
}));
add('pplo-fill', fill({
  stem: 'The abbreviation PPLO stands for pleuropneumonia-like ______.',
  acc: [['organisms', 'organism']],
  sol: 'Organisms.',
  d: 1, c: 'recall', t: [3],
}));
add('fission-ar', ar({
  a: 'Conjugation is the usual way in which bacteria increase in number.',
  r: 'In conjugation a bacteriophage carries DNA from one bacterium to another.',
  key: 'd',
  sol: 'Both are false: fission is the usual way of increasing in number, and conjugation is the transfer of DNA by direct contact, whereas a bacteriophage is involved in transduction — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('myco-ar', ar({
  a: 'Penicillin does not harm Mycoplasma.',
  r: 'Mycoplasma have no cell wall, the structure that penicillin attacks.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('reason2-short', short({
  marks: 1,
  stem: 'Give a reason: Antibiotics that block the synthesis of the cell wall do not harm Mycoplasma.',
  model: 'Mycoplasma have **no cell wall**, so there is nothing for the antibiotic to act on.',
  sol: 'No cell wall.',
  scheme: [['No cell wall', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('define-short2', short({
  marks: 2,
  stem: 'Define transduction and transformation as they apply to bacteria.',
  model: '**Transduction** is the transfer of bacterial DNA from one bacterium to another by a **bacteriophage**. **Transformation** is the **uptake of naked DNA** from the surroundings by a bacterium.',
  sol: 'Two definitions.',
  scheme: [['Transduction', 1], ['Transformation', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('meth-short2', short({
  marks: 2,
  stem: 'Name the archaebacteria found in the stomach of a buffalo and in marshy mud, and state the useful gas they release and one use of that gas.',
  model: 'They are the **methanogens**, strict anaerobes. They release **methane**, the main gas of **biogas**, which is used as a **fuel** for cooking and lighting.',
  sol: 'Methanogens; methane; fuel.',
  scheme: [['Methanogens and methane', 1], ['One use of the gas', 1]],
  d: 2, c: 'application', t: [3],
}));
add('myco-short2', short({
  marks: 2,
  stem: 'State what PPLO stands for, and give one structural feature and one size feature of Mycoplasma.',
  model: '**PPLO** stands for **pleuropneumonia-like organisms**. Mycoplasma have **no cell wall** (structural feature) and are the **smallest living cells**, about one-tenth of a micrometre across (size feature).',
  sol: 'PPLO; no wall; smallest.',
  scheme: [['PPLO expanded', 1], ['No wall and smallest size', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('extreme-short3', short({
  marks: 3,
  stem: 'A team collects (a) bubbling mud from a marsh, (b) brine from a lake far saltier than the sea, and (c) water from a hot, acidic spring. Name the archaebacterial group most likely to be present in each sample and give one feature of each group.',
  model: '(a) **Methanogens**: strict anaerobes that produce methane. (b) **Halophiles**: need a very high salt concentration to grow. (c) **Thermoacidophiles**: tolerate high temperature and strong acid. All three have cell walls **without peptidoglycan**.',
  sol: 'Three groups with features.',
  scheme: [['Methanogens with a feature', 1], ['Halophiles with a feature', 1], ['Thermoacidophiles with a feature', 1]],
  wl: [25, 90],
  d: 2, c: 'application', t: [3],
}));
add('myco3-short3', short({
  marks: 3,
  stem: 'State three distinctive features of Mycoplasma. Explain why penicillin, which blocks wall synthesis, cannot control them.',
  model: 'Mycoplasma have **no cell wall**, are the **smallest living cells** and can **survive without oxygen**; their shape is variable and they cause disease in plants and animals. Penicillin acts by **blocking the building of the cell wall**; since Mycoplasma **have no wall**, it has no target in them.',
  sol: 'Three features; no target for penicillin.',
  scheme: [['Any two features', 1], ['Third feature', 1], ['Penicillin has no wall to act on', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('unknown-short3', short({
  marks: 3,
  stem: 'Organism P is a single cell with no nucleus; it lives at 85 degrees Celsius in a spring of very low pH and has no peptidoglycan in its wall. Organism Q is a single cell about 0.1 micrometre across with no wall at all. Place P and Q in a domain or group, and say whether a drug that blocks wall synthesis would harm each.',
  model: 'P is a **thermoacidophile**, an **archaebacterium** in the domain **Archaea**; it has **no peptidoglycan**, so a drug that blocks peptidoglycan wall synthesis would **not harm** it. Q is a **Mycoplasma**, a prokaryote in kingdom **Monera** and domain **Bacteria**; it has **no wall at all**, so the drug has **no target** and does not harm it.',
  sol: 'P archaebacterium; Q Mycoplasma; neither harmed.',
  scheme: [['P placed as archaebacterium', 1], ['Q placed as Mycoplasma', 1], ['Reason the drug fails for each', 1]],
  d: 4, c: 'evaluation', t: [3],
}));
add('archaea-long', long({
  stem: '(a) State two features that distinguish Archaea from Bacteria. [2]\n(b) Name the three groups of archaebacteria and give the habitat of each. [2]\n(c) Which group produces methane, and for what is the gas used? [1]',
  model: '(a) The cell wall of **Archaea has no peptidoglycan**, whereas that of Bacteria has it; the membrane lipids of Archaea are **ether-linked and branched**, those of Bacteria ester-linked.\n\n(b) **Methanogens** live in oxygen-free marshes and the gut of ruminants; **halophiles** in very salty lakes; **thermoacidophiles** in hot, acidic springs.\n\n(c) The **methanogens** produce methane, used as **biogas fuel**.',
  sol: 'Two features; three groups and habitats; methane.',
  scheme: [['(a) Wall', 1], ['(a) Membrane lipids', 1], ['(b) Three groups', 1], ['(b) Three habitats', 1], ['(c) Methanogens and fuel', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 economic importance
add('sludge-mcq', mcq({
  stem: 'In the activated sludge tank of a sewage plant, the flocs are chiefly made of',
  right: 'aerobic bacteria that oxidise organic matter',
  wrong: ['methanogens that make biogas', 'viruses that destroy bacteria', 'Streptomyces that make antibiotics'],
  sol: 'Flocs of aerobic bacteria oxidise the organic matter in sewage — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('curd-mcq', mcq({
  stem: 'When Lactobacillus grows in warm milk, the milk sets into curd because',
  right: 'lactose is changed into lactic acid, which curdles the milk protein',
  wrong: ['fat is changed into glucose', 'protein is changed into starch', 'water is changed into carbon dioxide'],
  sol: 'Lactic acid made from lactose curdles the milk protein — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('cheese-mcq', mcq({
  stem: 'The large holes in Swiss cheese are formed by',
  right: 'carbon dioxide released by Propionibacterium shermanii',
  wrong: ['methane produced by methanogens', 'air trapped by yeast', 'nitrogen released by Rhizobium'],
  sol: 'Propionibacterium shermanii gives off carbon dioxide that forms the holes — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('biogas-mcq', mcq({
  stem: 'The main gas in the biogas produced from cattle dung in a closed digester is',
  right: 'methane',
  wrong: ['oxygen', 'nitrogen', 'carbon monoxide'],
  sol: 'Methanogens produce methane, the main gas of biogas — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
{
  const b = biogas(40);
  add('biogas-num', num({
    stem: 'A small digester yields about 0.04 cubic metre of biogas from each kilogram of dung. How much gas is expected from 40 kilograms of dung?',
    value: b, tol: 0.001, unit: 'cubic metres',
    sol: `40 × 0.04 = ${b} cubic metres.`,
    scheme: [[`${b} cubic metres`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 1.6 || 'value');
}
add('streptomyces-fill', fill({
  stem: 'The antibiotic streptomycin is produced by the soil bacterium ______.',
  acc: [['Streptomyces', 'Streptomyces griseus']],
  sol: 'Streptomyces.',
  d: 1, c: 'recall', t: [4],
}));
add('sewage-ar', ar({
  a: 'Methanogens are useful in the digestion of sewage sludge.',
  r: 'Methanogens are strict anaerobes that produce methane from organic wastes.',
  key: 'a',
  sol: 'Both are true and R explains A: the sludge digester has no oxygen, and methanogens turn the wastes into biogas — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('analogy2-short', short({
  marks: 1,
  stem: 'Complete the analogy: Lactobacillus : curd :: Propionibacterium shermanii : ______',
  model: '**Swiss cheese**, whose holes are formed by the carbon dioxide it releases.',
  sol: 'Swiss cheese holes.',
  scheme: [['Swiss cheese (holes)', 1]],
  wl: [2, 25],
  d: 2, c: 'understanding', t: [4],
}));
add('curd-short2', short({
  marks: 2,
  stem: 'Explain how a spoonful of curd added to warm milk overnight turns the milk into curd.',
  model: 'The spoonful of curd supplies **lactic acid bacteria**, which **multiply** in the warm milk. They change the milk sugar **lactose into lactic acid**, and the acid **coagulates the milk protein**, so the milk sets as curd.',
  sol: 'Bacteria multiply; lactic acid coagulates protein.',
  scheme: [['Lactic acid bacteria multiply', 1], ['Lactose to lactic acid sets the milk', 1]],
  d: 2, c: 'application', t: [4],
}));
add('sewage-short2', short({
  marks: 2,
  stem: 'State the role of aerobic bacteria in the secondary treatment of sewage, and name the fuel gas released when the settled sludge is later digested without oxygen.',
  model: '**Aerobic bacteria** in flocs called **activated sludge** **oxidise the organic matter** in the sewage and so lower its oxygen demand. When the settled sludge is digested without oxygen, **biogas**, rich in **methane**, is released.',
  sol: 'Oxidise organic matter; biogas.',
  scheme: [['Aerobic bacteria oxidise organic matter', 1], ['Biogas or methane', 1]],
  d: 2, c: 'application', t: [4],
}));
add('econ-short3', short({
  marks: 3,
  stem: 'Name the bacterium and state its role in (i) the production of an antibiotic, (ii) the making of curd and (iii) the formation of the holes in Swiss cheese.',
  model: '(i) ***Streptomyces*** produces the antibiotic **streptomycin**. (ii) ***Lactobacillus*** converts **lactose into lactic acid**, which sets milk as curd. (iii) ***Propionibacterium shermanii*** releases **carbon dioxide**, which forms the large holes.',
  sol: 'Three bacteria with roles.',
  scheme: [['Streptomyces and streptomycin', 1], ['Lactobacillus and lactic acid', 1], ['Propionibacterium and carbon dioxide holes', 1]],
  wl: [25, 90],
  d: 2, c: 'recall', t: [4],
}));
add('econ-long', long({
  stem: '(a) Explain the role of bacteria in the two main stages of sewage treatment. [2]\n(b) Name the bacteria that produce (i) an antibiotic and (ii) the holes in Swiss cheese, with the product in each case. [2]\n(c) How does Lactobacillus help in making curd? [1]',
  model: '(a) In the **secondary stage**, **aerobic bacteria** in **activated sludge** oxidise the organic matter. In the **sludge digester**, **anaerobic bacteria** including **methanogens** digest the settled sludge and release **biogas**.\n\n(b) (i) ***Streptomyces*** produces **streptomycin**. (ii) ***Propionibacterium shermanii*** releases **carbon dioxide**, which forms the holes.\n\n(c) It converts **lactose into lactic acid**, which **coagulates the milk protein**.',
  sol: 'Sewage stages; two bacteria; curd.',
  scheme: [['(a) Aerobic oxidation in activated sludge', 1], ['(a) Anaerobic digestion', 1], ['(b) Streptomyces and streptomycin', 1], ['(b) Propionibacterium and carbon dioxide', 1], ['(c) Lactose to lactic acid', 1]],
  wl: [60, 200],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const rows = [['A', 'Clusters of spheres', 'Purple', 78], ['B', 'Rods', 'Pink', 30], ['C', 'Comma-shaped cells', 'Pink', 12]];
  const total = rows.reduce((s, r) => s + r[3], 0);
  const purple = rows.filter((r) => r[2] === 'Purple').reduce((s, r) => s + r[3], 0);
  const p = pct(purple, total);
  eq([total, purple, p], [120, 78, 65], 'case smear totals');
  add('smear-case', mk.case({
    passage: `A clinic stains three smears by Gram’s method and counts the cells.\n\n${tbl(['Smear', 'Cell shape', 'Colour after staining', 'Cells counted'], rows.map((r) => [r[0], r[1], r[2], String(r[3])]))}`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'What percentage of all the cells counted are Gram-positive?',
        value: p, tol: 0.05, unit: '%',
        sol: `Purple cells = ${purple} out of ${total}: ${purple} / ${total} × 100 = ${p} percent.`,
        scheme: [[`${p}%`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'What can be said about the walls of the cells in smear B?',
        right: 'They have a thin peptidoglycan layer inside an outer membrane',
        wrong: ['They have a thick peptidoglycan layer and no outer membrane', 'They have no peptidoglycan and are archaebacteria', 'They have a wall of chitin'],
        sol: 'Pink cells lost the crystal violet: Gram-negative walls, thin peptidoglycan with an outer membrane — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why do the cells of smears B and C appear pink and not purple?',
        model: 'Their walls have only a **thin layer of peptidoglycan** inside an **outer membrane**, so the **crystal violet is washed out** by the alcohol. They then take up the counterstain **safranin** and look **pink**.',
        sol: 'Thin wall; stain lost; safranin.',
        scheme: [['Thin peptidoglycan with outer membrane; crystal violet lost', 1], ['Safranin gives the pink colour', 1]],
        d: 2, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Name the shape of the cells in smear A and the way in which such cells are arranged, and name the shape of the cells in smear C.',
          model: 'The spheres of smear A are **cocci** arranged in **clusters** (**staphylococci**). The comma-shaped cells of smear C are **vibrios**.',
          sol: 'Staphylococci; vibrios.',
          scheme: [['Cocci in clusters', 1], ['Vibrios', 1]],
          wl: [8, 40],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }));
}
{
  const n0 = 800;
  const end = growth(n0, 30, 180);
  add('curd-case', mk.case({
    passage: `A dairy school starts a batch of curd by adding ${n0} lactic acid bacteria to a vessel of warm milk. Each bacterium divides every 30 minutes. After 3 hours the milk has set.`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'How many bacteria are present after 3 hours if growth is unchecked?',
        value: end,
        sol: `180 / 30 = 6 generations: ${n0} × 2 to the power 6 = ${n0} × 64 = ${end}.`,
        scheme: [[`${end}`, 1]],
        d: 3, c: 'application', t: [3],
      })),
      part('b', mcq({
        stem: 'Which change caused by these bacteria makes the milk set?',
        right: 'Lactose is converted into lactic acid',
        wrong: ['Lactose is converted into starch', 'Proteins are converted into fats', 'Lactic acid is converted into lactose'],
        sol: 'The bacteria turn lactose into lactic acid, which curdles the protein — option (@K).',
        d: 2, c: 'understanding', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why does the vessel need to be kept warm but not boiling hot for the curd to set?',
        model: 'Warmth lets the bacteria **multiply and make lactic acid** quickly, but boiling heat would **kill** the lactic acid bacteria, so the milk would not set.',
        sol: 'Warmth for growth; heat kills.',
        scheme: [['Warmth helps growth and acid production', 1], ['Boiling would kill the bacteria', 1]],
        d: 2, c: 'application', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'Why can unchecked growth of the bacteria in the vessel not continue for days?',
          model: 'The **milk sugar and other nutrients** are used up, and the **lactic acid** that builds up makes the milk **too acid**, so the bacteria stop dividing.',
          sol: 'Nutrients used; acid builds up.',
          scheme: [['Nutrients become limiting', 1], ['Lactic acid makes the medium acid', 1]],
          d: 3, c: 'analysis', t: [4],
        }),
      ]),
    ],
  }));
}
void generations;
