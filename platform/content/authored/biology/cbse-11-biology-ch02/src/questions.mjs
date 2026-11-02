// ch02 Biological Classification — question bank. AR keys: a c a c c b d a d.
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { BACT_Q } from './svgs.mjs';
import { KINGDOMS, K, countWhere, classify, YEAR, GAP, grow, WE_GROW, BASIDIA, CYCLE, YEAST, LICHEN, lichenRatio, PHAGE, LEAVES, Q, CASE } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const bactFig = svgV(BACT_Q, 'Five unlabelled bacterial forms marked A to E');

// ---------------------------------------------------------------- t01 five-kingdom classification
add('basis-mcq', mcq({
  stem: 'A student notes that an organism is multicellular, has a cellulose cell wall and has chloroplasts. According to the five-kingdom scheme, which kingdom should she place it in?',
  right: 'Plantae',
  wrong: ['Fungi', 'Protista', 'Monera'],
  sol: 'Multicellular eukaryotes with cellulose walls and photosynthesis belong to Plantae; fungi have chitin walls and no chloroplasts — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('twok-mcq', mcq({
  stem: 'A botanist in the 1900s labels a mould growing on bread, a photosynthetic Euglena and a rose all as “plants”. Which weakness of the two-kingdom system does this show?',
  right: 'It did not separate photosynthetic from non-photosynthetic organisms or unicellular from multicellular ones.',
  wrong: ['It placed all animals in the plant kingdom.', 'It had too many kingdoms for students to remember.', 'It separated prokaryotes from eukaryotes too strictly.'],
  sol: 'The two-kingdom system did not distinguish eukaryotes from prokaryotes, unicellular from multicellular, or photosynthetic from non-photosynthetic forms — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('whitt-mcq', mcq({
  stem: 'The five-kingdom classification was proposed by',
  right: 'R. H. Whittaker',
  wrong: ['Carolus Linnaeus', 'Carl Woese', 'D. J. Ivanowsky'],
  sol: 'R. H. Whittaker proposed the five-kingdom scheme in 1969 — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('wall-mcq', mcq({
  stem: 'A lab technician finds that the cell walls of an organism contain chitin. In which kingdom is it placed?',
  right: 'Fungi',
  wrong: ['Plantae', 'Animalia', 'Monera'],
  sol: 'Fungal cell walls are made of chitin and polysaccharides — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('nutrition-mcq', mcq({
  stem: 'A quiz question asks for the pair of kingdoms that each include both autotrophic and heterotrophic members. Which pair is correct?',
  right: 'Monera and Protista',
  wrong: ['Fungi and Animalia', 'Plantae and Fungi', 'Plantae and Animalia'],
  sol: 'Monera and Protista each contain autotrophs (photosynthetic, and in Monera chemosynthetic) and heterotrophs — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('pond-mcq', mcq({
  stem: 'A student examines a pond organism with a microscope: it has a well-formed nucleus, is a single cell, and swims using cilia. Using the five-kingdom key, which kingdom is it?',
  right: classify({ prokaryote: false, unicellular: true, wall: 'none', autotroph: false }),
  wrong: ['Monera', 'Fungi', 'Animalia'],
  sol: 'A single-celled eukaryote belongs to Protista (here a ciliate such as Paramecium) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('twok-ar', ar({
  a: 'Bacteria and fungi were wrongly grouped with plants in the two-kingdom system.',
  r: 'Bacteria and fungi do not photosynthesise, and their cell walls differ from those of plants.',
  key: 'a',
  sol: 'Both are true, and R explains A: the lack of photosynthesis and the different walls show that these organisms do not belong with plants — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('monera-ar', ar({
  a: 'Monera are placed in a kingdom of their own.',
  r: 'Kingdom Monera contains multicellular organisms with a true nucleus.',
  key: 'c',
  sol: 'A is true: bacteria differ from all other organisms in being prokaryotes. R is false: Monera are mostly unicellular and have no true nucleus — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('plantae-tf', tf({
  stem: 'In the five-kingdom scheme, every kingdom except Monera is made up of eukaryotes.',
  key: 't',
  sol: 'True: Protista, Fungi, Plantae and Animalia are eukaryotic; Monera are prokaryotic.',
  d: 1, c: 'recall', t: [1],
}));
add('kingdom-fill', fill({
  stem: 'The kingdom whose cells have no nuclear membrane is ______.',
  acc: [['Monera', 'monera']],
  sol: 'Monera.',
  d: 1, c: 'recall', t: [1],
}));
add('kingdom-match', match({
  stem: 'Match each kingdom (column I) with a feature (column II).',
  pairs: [
    ['Fungi', 'Cell wall of chitin'],
    ['Plantae', 'Cellulose wall and chloroplasts'],
    ['Animalia', 'No cell wall; food is ingested'],
    ['Monera', 'Cells without a nuclear membrane'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Fungi: chitin; Plantae: cellulose wall and chloroplasts; Animalia: no wall, food ingested; Monera: no nuclear membrane.',
  d: 1, c: 'understanding', t: [1],
}));
add('auto-num', num({
  stem: 'Using the five-kingdom table, in how many of the five kingdoms are there organisms that make their own food (autotrophs)?',
  value: countWhere((k) => k.auto),
  sol: 'Monera (photosynthetic and chemosynthetic bacteria), Protista (photosynthetic protists) and Plantae: 3 kingdoms.',
  scheme: [['3 kingdoms', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 3 || 'value');
add('twok-short2', short({
  marks: 2,
  stem: 'A student says, “Euglena is a plant because it photosynthesises.” Explain why Euglena is difficult to place in a two-kingdom system, and where it is placed in the five-kingdom system.',
  model: '*Euglena* photosynthesises in light like a plant but becomes **heterotrophic** in the dark and has **no cell wall**, only a protein-rich pellicle, and it moves by a flagellum like an animal, so it fits neither kingdom. In the five-kingdom system it is a **unicellular eukaryote** and is placed in **Protista**.',
  sol: 'Features of both; Protista.',
  scheme: [['Plant and animal features together', 1], ['Unicellular eukaryote: Protista', 1]],
  d: 2, c: 'application', t: [1],
}));
add('criteria-short2', short({
  marks: 2,
  stem: 'List four of the criteria that Whittaker used to define the five kingdoms.',
  model: 'Whittaker used five criteria. They were **cell structure** (prokaryotic or eukaryotic, wall present or absent), **body organisation** (cellular, loose tissue or tissues and organs), **mode of nutrition**, **reproduction** and **phylogenetic (evolutionary) relationships**; any four are enough.',
  sol: 'Any four criteria.',
  scheme: [['Two criteria', 1], ['Two more criteria', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Compare Plantae, Fungi and Animalia on their cell wall, mode of nutrition and body organisation.',
  model: '**Plantae:** cellulose cell wall; autotrophic by photosynthesis; tissues and organs. **Fungi:** chitin and polysaccharide wall; heterotrophic by absorption (saprophytes, parasites, symbionts); multicellular with loose tissue (hyphae). **Animalia:** no cell wall; heterotrophic, food is ingested and digested (holozoic); tissues, organs and organ systems.',
  sol: 'Three kingdoms on three features.',
  scheme: [['Plantae', 1], ['Fungi', 1], ['Animalia', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('place-short3', short({
  marks: 3,
  stem: 'A team finds three organisms: X, a single-celled eukaryote that photosynthesises; Y, a multicellular eukaryote with chitin walls that absorbs food; Z, a single-celled prokaryote with a peptidoglycan wall. Place each in a kingdom and give one reason.',
  model: '**X** belongs to **Protista**: it is a **unicellular eukaryote** with a nucleus, even though it photosynthesises like a plant. **Y** belongs to **Fungi**: it has **chitin walls**, a multicellular body and **absorptive heterotrophic** nutrition. **Z** belongs to **Monera**: it is a **prokaryote**, so it has no nuclear membrane and no membrane-bound organelles.',
  sol: 'Three placements with reasons.',
  scheme: [['X: Protista with reason', 1], ['Y: Fungi with reason', 1], ['Z: Monera with reason', 1]],
  d: 2, c: 'application', t: [1],
}));
add('kingdoms-long', long({
  stem: 'Explain why the five-kingdom classification replaced the two-kingdom system. Name the five kingdoms and compare them on cell type, cell wall, body organisation and mode of nutrition.',
  model: '**Why the change.** Linnaeus’s two kingdoms, Plantae and Animalia, did not distinguish between eukaryotes and prokaryotes, unicellular and multicellular organisms, or photosynthetic and non-photosynthetic organisms. Bacteria and fungi were counted as plants although they do not photosynthesise, and organisms like Euglena fitted neither kingdom.\n\n**The scheme.** R. H. Whittaker proposed five kingdoms in 1969, using cell structure, body organisation, mode of nutrition, reproduction and phylogenetic relationships: Monera, Protista, Fungi, Plantae and Animalia.\n\n**Comparison.** **Monera:** prokaryotic; non-cellulosic wall; cellular; autotrophic or heterotrophic. **Protista:** eukaryotic; wall present in some; cellular; autotrophic or heterotrophic. **Fungi:** eukaryotic; chitin wall; multicellular with loose tissue; heterotrophic. **Plantae:** eukaryotic; cellulose wall; tissues and organs; autotrophic. **Animalia:** eukaryotic; no wall; tissues, organs and organ systems; heterotrophic.',
  sol: 'Reasons; scheme; comparison.',
  scheme: [['Failings of two kingdoms', 1.5], ['Whittaker and criteria', 1], ['Five kingdoms compared', 2.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 Monera
add('cyano-mcq', mcq({
  stem: 'Specialised cells called heterocysts, found in Nostoc and Anabaena, are used for',
  right: 'fixation of atmospheric nitrogen',
  wrong: ['production of endospores', 'transfer of DNA between cells', 'storage of silica'],
  sol: 'Heterocysts of these cyanobacteria are the sites of nitrogen fixation — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('methano-mcq', mcq({
  stem: 'A village biogas plant is fed with cattle dung. Which organisms in the plant, related to those in the cows’ guts, produce the methane?',
  right: 'Methanogens, a group of archaebacteria',
  wrong: ['Cyanobacteria, which fix nitrogen', 'Diatoms, which make silica shells', 'Yeast, which ferments sugar'],
  sol: 'Methanogens, archaebacteria living in marshy areas and in the guts of ruminants, produce methane from dung — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('halo-mcq', mcq({
  stem: 'A salt-pan worker finds that the pink colour of the brine comes from prokaryotes that thrive in very salty water. Which group of archaebacteria are they?',
  right: 'Halophiles',
  wrong: ['Methanogens', 'Thermoacidophiles', 'Cyanobacteria'],
  sol: 'Halophiles are archaebacteria that live in extremely salty areas — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chemo-mcq', mcq({
  stem: 'Some soil bacteria oxidise ammonia and nitrites and use the energy released to make ATP. Which kind of nutrition do they show?',
  right: 'Chemosynthetic autotrophic nutrition',
  wrong: ['Photosynthetic autotrophic nutrition', 'Saprophytic heterotrophic nutrition', 'Holozoic nutrition'],
  sol: 'Using the energy from oxidising inorganic substances to make food is chemosynthetic autotrophy — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('curd-mcq', mcq({
  stem: 'A dairy converts warm milk into curd by adding a spoonful of old curd. Which group of Monera does the useful microbe belong to?',
  right: 'Heterotrophic eubacteria',
  wrong: ['Chemosynthetic bacteria', 'Mycoplasma', 'Methanogens'],
  sol: 'Bacteria that turn milk into curd are heterotrophic eubacteria — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('myco-mcq', mcq({
  stem: 'A laboratory finds that a tiny pathogen of plants and animals has no cell wall at all and grows without oxygen. It is most likely a',
  right: 'mycoplasma',
  wrong: ['cyanobacterium', 'halophile', 'diatom'],
  sol: 'Mycoplasma completely lack a cell wall, are the smallest living cells and can survive without oxygen — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('fission-mcq', mcq({
  stem: 'Which is the main method of reproduction in bacteria?',
  right: 'Fission into two cells',
  wrong: ['Budding of daughter cells from a stalk', 'Formation of basidiospores', 'Fusion of two nuclei followed by meiosis'],
  sol: 'Bacteria multiply mainly by fission — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('fig-cyano-mcq', mcq({
  stem: 'The figure shows five bacterial forms marked A to E. Which letter marks the filamentous form with one enlarged, thick-walled cell that fixes atmospheric nitrogen?',
  right: 'E',
  wrong: ['A', 'B', 'D'],
  sol: 'A is a coccus cluster, B bacilli, C a vibrio, D a spirillum and E a cyanobacterial filament with a heterocyst — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [bactFig],
}));
add('fig-vibrio-mcq', mcq({
  stem: 'In the same figure, the bacterium that causes cholera is comma-shaped. Which letter marks that shape?',
  right: 'C',
  wrong: ['A', 'B', 'D'],
  sol: 'The comma-shaped form is a vibrio, marked C — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [bactFig],
}));
add('fig-spirillum-mcq', mcq({
  stem: 'In the same figure, which letter marks the spiral form, called a spirillum, and which letter marks the rod-shaped bacillus? Choose the correct pair.',
  right: 'D and B',
  wrong: ['A and C', 'B and D', 'C and E'],
  sol: 'D is the spirillum and B the bacillus — option (@K).',
  d: 3, c: 'application', t: [2],
  assets: [bactFig],
}));
add('swab-num', num({
  stem: `A throat swab shows ${Q.swab.total} bacterial cells: ${Q.swab.cocci} cocci, ${Q.swab.bacilli} bacilli and the rest spirilla. How many spirilla are there?`,
  value: Q.swab.spirilla,
  sol: r`$${Q.swab.total} - ${Q.swab.cocci} - ${Q.swab.bacilli} = ${Q.swab.spirilla}$ spirilla.`,
  scheme: [[`${Q.swab.spirilla} spirilla`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 24 || 'value');
add('swabpct-num', num({
  stem: `In the same swab of ${Q.swab.total} cells, ${Q.swab.cocci} are cocci. What percentage of the cells are cocci?`,
  value: Q.swab.coccusPct, unit: 'percent',
  sol: r`$\dfrac{${Q.swab.cocci}}{${Q.swab.total}} \times 100 = ${Q.swab.coccusPct}$ percent.`,
  scheme: [[`${Q.swab.coccusPct} percent`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 40 || 'value');
add('grow-num', num({
  stem: `A culture starts with ${Q.grow.n0} bacterial cells with a generation time of ${Q.grow.gen} minutes. How many cells are present after ${Q.grow.minutes} minutes if growth is unchecked?`,
  value: Q.grow.n,
  sol: r`Generations $= \dfrac{${Q.grow.minutes}}{${Q.grow.gen}} = ${Q.grow.gens}$; cells $= ${Q.grow.n0} \times 2^{${Q.grow.gens}} = ${Q.grow.n}$.`,
  scheme: [['Generations', 0.5], [`${Q.grow.n} cells`, 0.5]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 256 && grow(4, 20, 120) === 256 || 'value');
add('archae-short2', short({
  marks: 2,
  stem: 'Name the three groups of archaebacteria and state the habitat of each.',
  model: '**Halophiles** live in extremely **salty** areas; **thermoacidophiles** live in **hot, acidic springs**; **methanogens** live in **marshy areas** and in the **guts of ruminants** such as cows, producing methane.',
  sol: 'Three groups with habitats.',
  scheme: [['Halophiles and thermoacidophiles with habitats', 1], ['Methanogens with habitat', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('myco-short2', short({
  marks: 2,
  stem: 'Give two features of mycoplasma that make them different from other bacteria.',
  model: 'Mycoplasma **completely lack a cell wall**, so they can change shape; they are the **smallest living cells** known and can **survive without oxygen**. They are **pathogenic** to animals and plants.',
  sol: 'Any two features.',
  scheme: [['No cell wall', 1], ['Smallest cells or anaerobic', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('nitrogen-short2', short({
  marks: 2,
  stem: 'A farmer finds that a pond covered with Nostoc and Anabaena enriches the rice field when its water is used for irrigation. Explain the role of these organisms.',
  model: '*Nostoc* and *Anabaena* are **cyanobacteria** that **fix atmospheric nitrogen** in their specialised cells, the **heterocysts**, so they add **nitrogen compounds** to the water and soil that crop plants can use. They are also **photosynthetic autotrophs**.',
  sol: 'Nitrogen fixation in heterocysts.',
  scheme: [['Cyanobacteria fix nitrogen in heterocysts', 1], ['Enrich soil; photosynthetic', 1]],
  d: 3, c: 'application', t: [2],
}));
add('bacteria-short3', short({
  marks: 3,
  stem: 'Describe three ways in which heterotrophic bacteria help humans and two ways in which they harm them.',
  model: '**Helpful:** bacteria **make curd** from milk; they **produce antibiotics**; they **fix nitrogen** in the roots of legumes; and as **decomposers** they recycle nutrients. **Harmful:** some cause diseases in humans such as **cholera, typhoid and tetanus**, and in plants such as **citrus canker**.',
  sol: 'Three benefits, two harms.',
  scheme: [['Three helpful roles', 1.5], ['Two harmful effects', 1.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('nutrition-short3', short({
  marks: 3,
  stem: 'Compare the photosynthetic, chemosynthetic and heterotrophic modes of nutrition in Monera, with one example of each.',
  model: '**Photosynthetic:** cyanobacteria make food using light, as in *Nostoc*. **Chemosynthetic:** bacteria oxidise **inorganic substances** such as ammonia and nitrites and use the energy to make food; they recycle nitrogen, phosphorus, iron and sulphur. **Heterotrophic:** bacteria such as the curd bacterium absorb food made by others, as **saprophytes or parasites**.',
  sol: 'Three modes with examples.',
  scheme: [['Photosynthetic with example', 1], ['Chemosynthetic with example', 1], ['Heterotrophic with example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('monera-long', long({
  stem: 'Describe kingdom Monera. Include the shapes of bacteria, the two main groups with their subgroups, the modes of nutrition, reproduction, and the roles of bacteria in nature and human life.',
  model: '**Features.** Bacteria are the sole members of Monera. They are prokaryotes and the most abundant micro-organisms, occurring in every kind of habitat. By shape they are **coccus** (spherical), **bacillus** (rod), **vibrio** (comma) and **spirillum** (spiral).\n\n**Groups.** **Archaebacteria** have a different cell-wall structure and live in harsh habitats: halophiles in very salty areas, thermoacidophiles in hot springs and methanogens in marshes and the guts of ruminants, producing methane. **Eubacteria** have a rigid cell wall: cyanobacteria (photosynthetic; *Nostoc* and *Anabaena* fix nitrogen in heterocysts), chemosynthetic autotrophs, and heterotrophs. Mycoplasma lack a cell wall.\n\n**Nutrition.** Autotrophic (photosynthetic or chemosynthetic) or heterotrophic (saprophytic or parasitic).\n\n**Reproduction.** Mainly by fission; some form spores in unfavourable conditions, and DNA may be transferred between cells.\n\n**Roles.** Decomposers and nutrient recyclers; curd, antibiotics and nitrogen fixation in legumes; pathogens causing cholera, typhoid, tetanus and citrus canker.',
  sol: 'Shapes; groups; nutrition; reproduction; roles.',
  scheme: [['Features and shapes', 1], ['Archaebacteria and eubacteria', 1.5], ['Nutrition and reproduction', 1], ['Roles', 1], ['Mycoplasma', 0.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t02 Protista
add('euglena-mcq', mcq({
  stem: 'Why is Euglena difficult to place in either the plant or the animal kingdom of the old two-kingdom system?',
  right: 'It photosynthesises in light but feeds on other organisms in the dark, and it has no cell wall.',
  wrong: ['It has a nucleus but no cytoplasm.', 'It has a cellulose cell wall but moves by muscles.', 'It is multicellular and lives only on land.'],
  sol: 'Euglena has chloroplasts and photosynthesises in light, becomes heterotrophic without light, and has a flexible pellicle, not a wall — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('diatom-mcq', mcq({
  stem: 'A factory filters sugar syrup through a fine, chemically inert earth made of fossil shells of microscopic organisms. Which protists left these shells?',
  right: 'Diatoms',
  wrong: ['Dinoflagellates', 'Slime moulds', 'Sporozoans'],
  sol: 'Diatoms have indestructible silica walls that remain as diatomaceous earth, used for filtering — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('redtide-mcq', mcq({
  stem: 'Fishermen on a coast see the sea turn red and many fish die. The cause is the rapid multiplication of which protists?',
  right: 'Dinoflagellates such as Gonyaulax',
  wrong: ['Euglenoids such as Euglena', 'Diatoms such as Pinnularia', 'Slime moulds such as Physarum'],
  sol: 'Red tides are caused by rapid multiplication of dinoflagellates like Gonyaulax, whose toxins can kill fish — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('slime-mcq', mcq({
  stem: 'A gardener sees a yellow, jelly-like mass creeping over decaying leaves and later forming small stalks with spores. To which group of protists does it belong?',
  right: 'Slime moulds',
  wrong: ['Euglenoids', 'Dinoflagellates', 'Ciliated protozoans'],
  sol: 'Slime moulds are saprophytic protists that form a plasmodium moving over decaying matter and later spore-bearing fruiting bodies — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('protozoa-mcq', mcq({
  stem: 'Plasmodium, which causes malaria, has an infectious spore-like stage. To which group of protozoans does it belong?',
  right: 'Sporozoans',
  wrong: ['Amoeboid protozoans', 'Flagellated protozoans', 'Ciliated protozoans'],
  sol: 'Plasmodium is a sporozoan — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('trypano-mcq', mcq({
  stem: 'A parasite that causes sleeping sickness moves with a long flagellum. In which group of protozoans is Trypanosoma placed?',
  right: 'Flagellated protozoans',
  wrong: ['Ciliated protozoans', 'Amoeboid protozoans', 'Sporozoans'],
  sol: 'Trypanosoma is a flagellated protozoan — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('diatom-ar', ar({
  a: 'The cell walls of diatoms remain in large deposits long after the organisms have died.',
  r: 'The cell walls of diatoms are made of silica, which is indestructible.',
  key: 'a',
  sol: 'Both are true and R explains A: indestructible silica walls persist as diatomaceous earth — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('protist-ar', ar({
  a: 'The kingdom Protista forms a link between the other kingdoms.',
  r: 'All protists are multicellular organisms with cell walls of cellulose.',
  key: 'c',
  sol: 'A is true. R is false: protists are unicellular eukaryotes and many have no cell wall or a different wall — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('protozoa-tf', tf({
  stem: 'Paramecium moves with the help of cilia, whereas Amoeba moves with pseudopodia.',
  key: 't',
  sol: 'True: Paramecium is a ciliated protozoan and Amoeba an amoeboid protozoan.',
  d: 1, c: 'recall', t: [2],
}));
add('pellicle-fill', fill({
  stem: 'Euglenoids have no cell wall but a flexible protein-rich layer called the ______.',
  acc: [['pellicle', 'Pellicle']],
  sol: 'Pellicle.',
  d: 1, c: 'recall', t: [2],
}));
add('protist-match', match({
  stem: 'Match each protist (column I) with its feature (column II).',
  pairs: [
    ['Amoeba', 'Moves by pseudopodia'],
    ['Paramecium', 'Covered with cilia'],
    ['Trypanosoma', 'Flagellated parasite'],
    ['Diatom', 'Two-part silica wall'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Amoeba: pseudopodia; Paramecium: cilia; Trypanosoma: flagellum; diatom: silica wall in two halves.',
  d: 1, c: 'understanding', t: [2],
}));
add('protist-num', num({
  stem: `A plankton sample of ${Q.protist.total} unicellular organisms has ${Q.protist.diatoms} diatoms, ${Q.protist.dino} dinoflagellates, ${Q.protist.euglena} euglenoids and ${Q.protist.others} others. What percentage are diatoms?`,
  value: Q.protist.diatomPct, unit: 'percent',
  sol: r`$\dfrac{${Q.protist.diatoms}}{${Q.protist.total}} \times 100 = ${Q.protist.diatomPct}$ percent.`,
  scheme: [[`${Q.protist.diatomPct} percent`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 45 || 'value');
add('protist-short2', short({
  marks: 2,
  stem: 'Why is the boundary of kingdom Protista said to be “not well defined”, and what does the kingdom link?',
  model: 'Protista contains very different **unicellular eukaryotes**, some photosynthetic like plants and some heterotrophic like animals, with features that overlap other kingdoms, so its **boundary is not well defined**. It forms a **connecting link** between **monera, plants, animals and fungi**.',
  sol: 'Overlapping features; link.',
  scheme: [['Overlapping plant and animal features', 1], ['Link between kingdoms', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('euglena-short2', short({
  marks: 2,
  stem: 'Name the structure that supports Euglena in place of a cell wall and describe how it feeds in bright light and in the dark.',
  model: 'Euglena has a **pellicle**, a flexible protein-rich layer. In **bright light** it is **photosynthetic**, using its chloroplasts; in the **dark** it becomes **heterotrophic** and feeds on other small organisms.',
  sol: 'Pellicle; two modes.',
  scheme: [['Pellicle', 0.5], ['Photosynthetic in light', 0.5], ['Heterotrophic in dark', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('dino-short2', short({
  marks: 2,
  stem: 'Explain how a “red tide” forms and why it harms marine life.',
  model: 'Some **dinoflagellates**, such as *Gonyaulax*, **multiply very rapidly** and their pigments turn the sea water **red**. Their **toxins** released into the water can **kill other marine animals such as fish**.',
  sol: 'Rapid multiplication; toxins.',
  scheme: [['Rapid multiplication gives colour', 1], ['Toxins kill fish', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('protozoa-short3', short({
  marks: 3,
  stem: 'Name four groups of protozoans and give one example and one distinguishing feature of each.',
  model: 'Protozoans are heterotrophic protists, living as predators or parasites. **Amoeboid:** *Amoeba* moves and feeds by **pseudopodia**. **Flagellated:** *Trypanosoma* has **flagella** and causes sleeping sickness. **Ciliated:** *Paramecium* has **cilia** that create a water current carrying food into the gullet. **Sporozoans:** *Plasmodium* has an **infectious spore-like stage** and causes malaria.',
  sol: 'Four groups with examples and features.',
  scheme: [['Amoeboid and flagellated', 1.5], ['Ciliated and sporozoans', 1.5]],
  d: 1, c: 'understanding', t: [2],
}));
add('protista-long', long({
  stem: 'Describe kingdom Protista. Name its main groups and, for each, give the distinguishing features and at least one example. Mention one harmful and one beneficial effect of protists.',
  model: '**Features.** Protista are unicellular eukaryotes with a nucleus and other organelles. The boundary with other kingdoms is not well defined, and they link monera, plants, animals and fungi.\n\n**Groups.** **Chrysophytes:** diatoms and golden algae; diatom walls are indestructible silica in two halves, forming diatomaceous earth; chief producers in the oceans. **Dinoflagellates:** mostly marine and photosynthetic with two flagella; *Gonyaulax* blooms cause red tides. **Euglenoids:** mostly freshwater; protein-rich pellicle; photosynthetic in light, heterotrophic in the dark; *Euglena*. **Slime moulds:** saprophytic; plasmodium; spore-bearing fruiting bodies. **Protozoans:** heterotrophic predators or parasites: *Amoeba* (pseudopodia), *Trypanosoma* (flagella), *Paramecium* (cilia) and *Plasmodium* (spore-like stage).\n\n**Effects.** Beneficial: diatoms are chief ocean producers and diatomaceous earth is used for filtering. Harmful: red tides kill fish, and parasitic protozoans cause sleeping sickness and malaria.',
  sol: 'Features; groups; effects.',
  scheme: [['General features', 1], ['Five groups with examples', 3], ['One harmful and one beneficial effect', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t02 Fungi
add('hyphae-mcq', mcq({
  stem: 'Which fungal structure is a continuous tube of cytoplasm containing many nuclei and having no cross walls?',
  right: 'A coenocytic hypha',
  wrong: ['A septate hypha', 'A basidium', 'A conidium'],
  sol: 'Hyphae without septa, with many nuclei in continuous cytoplasm, are coenocytic — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chitin-mcq', mcq({
  stem: 'An insect’s hard outer covering and a fungus’s cell wall both contain the same tough substance. Which substance is it?',
  right: 'Chitin',
  wrong: ['Cellulose', 'Peptidoglycan', 'Silica'],
  sol: 'Fungal cell walls are made of chitin and polysaccharides — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('saprophyte-mcq', mcq({
  stem: 'A mushroom grows on a fallen log and absorbs soluble nutrients from the dead wood. What kind of nutrition does it show?',
  right: 'Saprophytic heterotrophic nutrition',
  wrong: ['Photosynthetic autotrophic nutrition', 'Parasitic heterotrophic nutrition', 'Chemosynthetic autotrophic nutrition'],
  sol: 'Absorbing nutrients from dead organic matter is saprophytic nutrition — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('dikaryon-mcq', mcq({
  stem: 'In some fungi the nuclei of two parent hyphae do not fuse at once after the cytoplasm fuses. The cell then contains two separate haploid nuclei. This stage is called the',
  right: 'dikaryon',
  wrong: ['zygote', 'plasmodium', 'basidium'],
  sol: 'After plasmogamy, the cell with two genetically different haploid nuclei is a dikaryon (n + n); karyogamy follows later — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('asco-mcq', mcq({
  stem: 'A food scientist describes a mould that makes ascospores in sac-like asci and also makes conidia. To which class of fungi does it belong?',
  right: 'Ascomycetes',
  wrong: ['Phycomycetes', 'Basidiomycetes', 'Deuteromycetes'],
  sol: 'Ascospores inside asci are the sexual spores of Ascomycetes — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('basidio-mcq', mcq({
  stem: 'A forester collects a bracket fungus from a tree trunk. Its sexual spores are borne in fours on club-shaped structures. Which class does it belong to?',
  right: 'Basidiomycetes',
  wrong: ['Ascomycetes', 'Phycomycetes', 'Deuteromycetes'],
  sol: 'Four basidiospores borne on a basidium are typical of Basidiomycetes — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('imperfect-mcq', mcq({
  stem: 'Alternaria and Trichoderma are called “imperfect fungi” because',
  right: 'only their asexual phase is known',
  wrong: ['they lack a nucleus', 'they have no cell wall', 'they photosynthesise poorly'],
  sol: 'Deuteromycetes are called imperfect fungi because only the asexual or vegetative phases are known — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('yeast-mcq', mcq({
  stem: 'A baker uses a unicellular fungus that reproduces by budding to make dough rise. To which class does it belong?',
  right: 'Ascomycetes',
  wrong: ['Phycomycetes', 'Basidiomycetes', 'Deuteromycetes'],
  sol: 'Yeast is a unicellular member of Ascomycetes — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('rhizopus-mcq', mcq({
  stem: 'The black mould that grows on stale bread has aseptate coenocytic hyphae and forms zygospores. It belongs to',
  right: 'Phycomycetes',
  wrong: ['Ascomycetes', 'Basidiomycetes', 'Deuteromycetes'],
  sol: 'Rhizopus, a bread mould with coenocytic mycelium, is a phycomycete — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('plasmo-ar', ar({
  a: 'In many fungi a dikaryotic stage precedes the formation of a diploid zygote.',
  r: 'Plasmogamy is followed immediately by meiosis in all fungi.',
  key: 'c',
  sol: 'A is true: in Ascomycetes and Basidiomycetes plasmogamy is followed by a dikaryon stage and then karyogamy. R is false: meiosis follows karyogamy, not plasmogamy — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('yeast-ar', ar({
  a: 'Yeast is placed in the class Ascomycetes.',
  r: 'Yeast is a unicellular fungus.',
  key: 'b',
  sol: 'Both are true, but being unicellular does not explain the placement: yeast is in Ascomycetes because it forms ascospores in asci — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('basidium-tf', tf({
  stem: 'A basidium bears four basidiospores and is found in Basidiomycetes.',
  key: 't',
  sol: 'True: four basidiospores are borne exogenously on each basidium.',
  d: 1, c: 'recall', t: [2],
}));
add('chitin-fill', fill({
  stem: 'The network of fungal hyphae is called the ______.',
  acc: [['mycelium', 'Mycelium']],
  sol: 'Mycelium.',
  d: 1, c: 'recall', t: [2],
}));
add('basidia-num', num({
  stem: `A mushroom cap has ${BASIDIA.perCap} basidia, each carrying the usual number of basidiospores. How many basidiospores does it carry?`,
  value: BASIDIA.spores,
  sol: r`$${BASIDIA.perCap} \times ${BASIDIA.sporesPerBasidium} = ${BASIDIA.spores}$ basidiospores.`,
  scheme: [[`${BASIDIA.spores} basidiospores`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 1200 || 'value');
add('basidia2-num', num({
  stem: `A forest floor has ${Q.basidia.caps} mushrooms, each with ${Q.basidia.perCap} basidia. How many basidiospores can they release in all?`,
  value: Q.basidia.spores,
  sol: r`Each basidium has ${BASIDIA.sporesPerBasidium} basidiospores: $${Q.basidia.caps} \times ${Q.basidia.perCap} \times ${BASIDIA.sporesPerBasidium} = ${Q.basidia.spores}$.`,
  scheme: [['Spores per cap', 0.5], [`${Q.basidia.spores} basidiospores`, 0.5]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 6000 || 'value');
add('cycle-num', num({
  stem: `A fungus has ${CYCLE(6).hypha} chromosomes in each haploid nucleus. How many chromosomes does the diploid nucleus of its zygote contain?`,
  value: CYCLE(6).zygote,
  sol: r`Karyogamy joins two haploid nuclei: $2 \times ${CYCLE(6).hypha} = ${CYCLE(6).zygote}$ chromosomes.`,
  scheme: [[`${CYCLE(6).zygote} chromosomes`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 12 || 'value');
add('yeast-num', num({
  stem: `In a microscope field of baker’s yeast, ${YEAST.cells} cells are counted and ${YEAST.budding} of them carry a bud. What percentage of the cells are budding?`,
  value: YEAST.pct, unit: 'percent',
  sol: r`$\dfrac{${YEAST.budding}}{${YEAST.cells}} \times 100 = ${YEAST.pct}$ percent.`,
  scheme: [[`${YEAST.pct} percent`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 25 || 'value');
add('hyphae-short2', short({
  marks: 2,
  stem: 'Distinguish between coenocytic and septate hyphae.',
  model: '**Coenocytic** hyphae are continuous tubes without cross walls, filled with multinucleate cytoplasm. **Septate** hyphae have cross walls, called septa, that divide them into compartments, each with one or more nuclei.',
  sol: 'One point each.',
  scheme: [['Coenocytic: no septa, many nuclei', 1], ['Septate: cross walls', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('plasmogamy-short2', short({
  marks: 2,
  stem: 'Distinguish between plasmogamy and karyogamy.',
  model: '**Plasmogamy** is the **fusion of the protoplasm (cytoplasm)** of two parent cells or hyphae. **Karyogamy** is the **fusion of the two nuclei**. In many fungi a **dikaryon** (n + n) stage lies between them.',
  sol: 'Cytoplasm versus nuclei.',
  scheme: [['Plasmogamy: cytoplasm fuses', 1], ['Karyogamy: nuclei fuse', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('fungi-nutrition-short2', short({
  marks: 2,
  stem: 'A fungus grows on a living wheat plant and weakens it, while a mushroom grows on dead wood. Name the kind of nutrition of each.',
  model: 'The fungus on the living wheat is a **parasite**, obtaining food from a **living host**. The mushroom on dead wood is a **saprophyte**, absorbing **soluble organic matter from dead material**.',
  sol: 'Parasite; saprophyte.',
  scheme: [['Parasite on living host', 1], ['Saprophyte on dead matter', 1]],
  d: 2, c: 'application', t: [2],
}));
add('fungi-spore-short2', short({
  marks: 2,
  stem: 'Name the spores formed in asexual and in sexual reproduction in fungi, giving two examples of each.',
  model: 'In **asexual** reproduction fungi form spores such as **conidia, sporangiospores and zoospores**. In **sexual** reproduction they form **oospores, ascospores and basidiospores** after plasmogamy and karyogamy; any two examples of each type are accepted.',
  sol: 'Two lists.',
  scheme: [['Asexual spores', 1], ['Sexual spores', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('fungi-class-short3', short({
  marks: 3,
  stem: 'A student has three unlabelled mould cultures. Culture P has aseptate mycelium and zygospores, culture Q has septate mycelium with spores in sac-like asci, and culture R has septate mycelium with four spores on each club-shaped cell. Name the class of each.',
  model: '**P** has aseptate coenocytic mycelium and zygospores, so it is a member of **Phycomycetes** (for example *Rhizopus*). **Q** has septate mycelium and ascospores inside sac-like asci, so it belongs to **Ascomycetes** (for example *Penicillium*). **R** has septate mycelium and four basidiospores on each basidium, so it belongs to **Basidiomycetes** (for example *Agaricus*).',
  sol: 'Three classes with reasons.',
  scheme: [['P', 1], ['Q', 1], ['R', 1]],
  d: 3, c: 'application', t: [2],
}));
add('fungi-cycle-short3', short({
  marks: 3,
  stem: 'Describe the stages of the sexual cycle of an ascomycete or basidiomycete from the meeting of two hyphae to the formation of spores.',
  model: 'Hyphae of two compatible strains meet and their **cytoplasm fuses (plasmogamy)**. The cell then contains two separate haploid nuclei, a **dikaryon (n + n)**, which divide together. The two nuclei later **fuse (karyogamy)** to form a **diploid zygote nucleus**, which undergoes **meiosis** to form **haploid spores** (ascospores or basidiospores).',
  sol: 'Plasmogamy; dikaryon; karyogamy; meiosis.',
  scheme: [['Plasmogamy', 1], ['Dikaryon', 0.5], ['Karyogamy', 0.5], ['Meiosis and spores', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('fungi-long', long({
  stem: 'Describe the body, nutrition and reproduction of fungi, and name the four classes with their main features and an example of each.',
  model: '**Body and nutrition.** The fungal body is made of hyphae forming a mycelium; hyphae may be aseptate and coenocytic or septate. Cell walls contain chitin and polysaccharides. Fungi are heterotrophs: saprophytes on dead matter, parasites on living hosts, or symbionts (lichens, mycorrhiza).\n\n**Reproduction.** Vegetative by fragmentation, fission and budding; asexual by conidia, sporangiospores or zoospores; sexual by oospores, ascospores or basidiospores, after plasmogamy, an optional dikaryon stage and karyogamy, followed by meiosis.\n\n**Classes.** **Phycomycetes:** aseptate coenocytic mycelium; *Rhizopus*. **Ascomycetes:** septate, ascospores in asci; *Penicillium*, yeast. **Basidiomycetes:** four basidiospores on a basidium; *Agaricus*. **Deuteromycetes:** imperfect fungi with only asexual stage known; *Trichoderma*.',
  sol: 'Body; nutrition; reproduction; four classes.',
  scheme: [['Body and wall', 1], ['Nutrition', 1], ['Reproduction', 1.5], ['Four classes with examples', 1.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 lichens, viruses and viroids
add('viroid-mcq', mcq({
  stem: 'Which statement correctly describes a viroid?',
  right: 'It is a free RNA molecule of low molecular weight with no protein coat.',
  wrong: ['It is a DNA molecule enclosed in a protein coat.', 'It is a single cell with a nuclear membrane.', 'It is a bacterium that has lost its cell wall.'],
  sol: 'Viroids are infectious agents consisting only of low-molecular-weight free RNA, without the protein coat found in viruses — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('lichen-mcq', mcq({
  stem: 'A botanist peels a grey crust from a tree trunk and finds that it contains green photosynthetic cells enclosed in a network of threads. What is this organism?',
  right: 'A lichen, an association of an alga and a fungus',
  wrong: ['A slime mould, a plasmodium of protists', 'A mycoplasma colony on bark', 'A mushroom growing on dead wood'],
  sol: 'Algal cells enclosed in fungal hyphae form a lichen, a symbiotic association — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('indicator-mcq', mcq({
  stem: 'A student finds many lichens on trees in a hill village but almost none along a busy highway in the city. What does this suggest?',
  right: 'The air in the village is cleaner than the air by the highway.',
  wrong: ['The highway trees are older than the village trees.', 'Lichens need heavy traffic to grow.', 'The city soil lacks nitrogen-fixing bacteria.'],
  sol: 'Lichens do not grow in polluted air, so they indicate the level of pollution — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ivan-mcq', mcq({
  stem: 'In 1892 a scientist found that sap of diseased tobacco plants could still infect healthy plants after passing through a filter that stops bacteria. Who was he?',
  right: 'D. J. Ivanowsky',
  wrong: ['W. M. Stanley', 'T. O. Diener', 'R. H. Whittaker'],
  sol: 'D. J. Ivanowsky made this discovery in 1892; Beijerinck later called the fluid contagium vivum fluidum — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('stanley-mcq', mcq({
  stem: 'W. M. Stanley crystallised a virus in 1935 and found that the crystals were largely',
  right: 'protein',
  wrong: ['cellulose', 'chitin', 'silica'],
  sol: 'Stanley’s crystals of the virus were largely protein — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('capsid-mcq', mcq({
  stem: 'A student sketches a virus as nucleic acid surrounded by a coat made of repeating protein subunits. What are the subunits called?',
  right: 'Capsomeres',
  wrong: ['Hyphae', 'Heterocysts', 'Pseudopodia'],
  sol: 'The protein coat (capsid) of a virus is made of capsomeres — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('phage-mcq', mcq({
  stem: 'A bacteriophage that destroys bacteria in a sewage tank has which kind of genetic material?',
  right: 'Double-stranded DNA',
  wrong: ['Single-stranded RNA', 'Both DNA and RNA', 'No nucleic acid'],
  sol: 'Bacteriophages have double-stranded DNA — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('plantvirus-mcq', mcq({
  stem: 'Farmers see leaves with mosaic patterns, curling and yellowing with clear veins, and stunted plants. These symptoms are typical of infection by',
  right: 'a virus',
  wrong: ['a lichen', 'a slime mould', 'a diatom'],
  sol: 'Mosaic formation, leaf rolling and curling, yellowing and vein clearing, dwarfing and stunted growth are symptoms of plant viral diseases — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('virus-ar', ar({
  a: 'Viruses are classified in the kingdom Protista.',
  r: 'Viruses are not cellular and show the characters of life only inside a host cell.',
  key: 'd',
  sol: 'A is false: viruses are not placed in any of the five kingdoms. R is true: they are not cellular — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('viroid-ar', ar({
  a: 'A viroid is smaller than a virus.',
  r: 'A viroid consists only of free RNA of low molecular weight, with no protein coat.',
  key: 'a',
  sol: 'Both are true, and R explains A: with no protein coat and only a short RNA, a viroid is smaller than a virus — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('lichen-ar', ar({
  a: 'In a lichen the alga cannot supply food to the fungus.',
  r: 'The alga of a lichen prepares food by photosynthesis.',
  key: 'd',
  sol: 'A is false: the alga supplies food prepared by photosynthesis to the fungus. R is true — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('viroid-tf', tf({
  stem: 'Viroids were discovered by T. O. Diener as the cause of potato spindle tuber disease.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('virus-fill', fill({
  stem: 'The infectious fluid of tobacco mosaic disease was named contagium vivum fluidum by M. W. ______.',
  acc: [['Beijerinck', 'beijerinck']],
  sol: 'Beijerinck.',
  d: 1, c: 'recall', t: [3],
}));
add('gap-num', num({
  stem: `Ivanowsky’s tobacco experiment was in ${YEAR.ivanowsky}, and Stanley crystallised a virus in ${YEAR.stanley}. How many years separate the two?`,
  value: GAP.ivanowskyToStanley, unit: 'years',
  sol: r`$${YEAR.stanley} - ${YEAR.ivanowsky} = ${GAP.ivanowskyToStanley}$ years.`,
  scheme: [[`${GAP.ivanowskyToStanley} years`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 43 || 'value');
add('phage-num', num({
  stem: `A culture of bacteria is infected so that ${PHAGE.infected} cells each burst and release ${PHAGE.burst} new phage particles. How many phage particles are released in all?`,
  value: PHAGE.released,
  sol: r`$${PHAGE.infected} \times ${PHAGE.burst} = ${PHAGE.released}$ particles.`,
  scheme: [[`${PHAGE.released} particles`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 3000 || 'value');
add('lichen-num', num({
  stem: `Lichen cover on tree trunks is ${LICHEN[0][1]} percent at a city centre and ${LICHEN[3][1]} percent in a forest. How many times greater is the cover in the forest?`,
  value: lichenRatio, unit: 'times',
  sol: r`$\dfrac{${LICHEN[3][1]}}{${LICHEN[0][1]}} = ${lichenRatio}$ times.`,
  scheme: [[`${lichenRatio} times`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 30 || 'value');
add('leaf-num', num({
  stem: `A plant pathologist examines ${LEAVES.examined} tobacco leaves and finds mosaic patterns on ${LEAVES.mosaic}. What percentage of the leaves show the symptom?`,
  value: LEAVES.pct, unit: 'percent',
  sol: r`$\dfrac{${LEAVES.mosaic}}{${LEAVES.examined}} \times 100 = ${LEAVES.pct}$ percent.`,
  scheme: [[`${LEAVES.pct} percent`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 25 || 'value');
add('lichen-short2', short({
  marks: 2,
  stem: 'Name the two partners of a lichen and state what each contributes to the other.',
  model: 'A lichen is a partnership of an **alga (phycobiont)** and a **fungus (mycobiont)**. The **alga** prepares **food by photosynthesis**; the **fungus** provides **shelter**, absorbs **water and minerals** and protects the alga.',
  sol: 'Partners and contributions.',
  scheme: [['Alga and fungus named', 1], ['Contribution of each', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('viroid-short2', short({
  marks: 2,
  stem: 'A researcher finds an infectious agent in diseased potatoes that passes through every filter and, when purified, contains only a short RNA with no protein. What is this agent, who discovered such agents, and when?',
  model: 'It is a **viroid**: free **RNA of low molecular weight without a protein coat**. Viroids were discovered by **T. O. Diener** in **1971** as the cause of **potato spindle tuber disease**.',
  sol: 'Viroid; Diener 1971.',
  scheme: [['Viroid: free RNA, no coat', 1], ['Diener, 1971; potato spindle tuber disease', 1]],
  d: 2, c: 'application', t: [3],
}));
add('discovery-short2', short({
  marks: 2,
  stem: 'Describe how Ivanowsky and Beijerinck contributed to the discovery of viruses.',
  model: '**Ivanowsky (1892)** found that the sap of diseased tobacco plants was still infectious after passing through a filter that holds back bacteria. **Beijerinck (1898)** showed that the infectious fluid could infect healthy plants and called it **contagium vivum fluidum**, a living infectious fluid.',
  sol: 'One point each.',
  scheme: [['Ivanowsky: filter experiment', 1], ['Beijerinck: living infectious fluid', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('virus-short3', short({
  marks: 3,
  stem: 'Describe the structure of a virus. State what the genetic material may be, name its protein coat, and say what happens to a virus outside a host.',
  model: 'A virus is a **nucleoprotein**. The **genetic material** is **either RNA or DNA**, surrounded by a **protein coat, the capsid**, made of subunits called **capsomeres**. Outside a host cell a virus is **inert**; it can **replicate only inside a living host cell**.',
  sol: 'Genetic material; capsid; inert outside host.',
  scheme: [['RNA or DNA', 1], ['Capsid of capsomeres', 1], ['Inert outside, replicates only in host', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('compare-virus-short3', short({
  marks: 3,
  stem: 'Compare a virus and a viroid on their genetic material, protein coat and the diseases they cause, with one example of each.',
  model: 'A **virus** has **DNA or RNA** inside a **protein coat (capsid)** and causes diseases such as mumps, influenza and AIDS in humans and mosaic in tobacco. A **viroid** has only **low-molecular-weight free RNA** and **no protein coat**; it causes **potato spindle tuber disease**.',
  sol: 'Three features compared.',
  scheme: [['Genetic material', 1], ['Protein coat', 1], ['Diseases with examples', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('virus-long', long({
  stem: 'Describe the discovery, structure and nature of viruses. Include the work of Ivanowsky, Beijerinck and Stanley, the genetic material of plant, animal and bacterial viruses, and some diseases caused.',
  model: '**Discovery.** D. J. Ivanowsky (1892) found that the sap of diseased tobacco plants still infected healthy plants after filtering out bacteria. M. W. Beijerinck (1898) called the fluid contagium vivum fluidum. W. M. Stanley (1935) crystallised the virus and found the crystals largely protein.\n\n**Structure.** A virus is a nucleoprotein: genetic material, RNA or DNA but not both, enclosed in a protein coat, the capsid, made of capsomeres. Most plant viruses have single-stranded RNA; animal viruses have single- or double-stranded RNA or DNA; bacteriophages have double-stranded DNA.\n\n**Nature.** Outside a host a virus is inert and can be crystallised; inside a living host cell it uses the host’s machinery to replicate. For this reason viruses are not placed in the five kingdoms.\n\n**Diseases.** Mumps, smallpox, herpes, influenza and AIDS in humans; mosaic, leaf curling, yellowing and stunting in plants.',
  sol: 'Discovery; structure; nature; diseases.',
  scheme: [['Three discoveries', 1.5], ['Structure and genetic material', 1.5], ['Nature and host', 1], ['Diseases', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [3],
}));
add('virus-eval-long', long({
  stem: 'A magazine writes: “Viruses should be added as a sixth kingdom because they reproduce and evolve, so they are clearly alive.” Evaluate this claim using what you know about the nature of viruses, lichens and viroids, and state whether the five-kingdom scheme should be changed.',
  model: '**What the claim gets right.** Viruses carry genetic material (DNA or RNA), they replicate, and they evolve; so they do have some features of life.\n\n**What it misses.** Viruses are **not cellular**: a protein coat surrounds nucleic acid, and there is no cytoplasm or ribosomes. Outside a host a virus is **inert** and can even be **crystallised** (Stanley, 1935). It **replicates only inside a living host cell**, using the host’s machinery. Whittaker’s kingdoms were built on **cell structure, nutrition and body organisation**, and viruses fit none of these criteria. Viroids, which are only free RNA, show the same problem even more clearly.\n\n**Other special cases.** Lichens are partnerships of two organisms, an alga and a fungus, and also sit uneasily in a single kingdom, yet they are not given a kingdom.\n\n**Judgement.** The claim is only partly sound. Viruses are special cases that are **kept outside** the five kingdoms rather than made a sixth, because they lack a cellular structure and cannot live independently. Whether they are “alive” remains debated.',
  sol: 'What is right; what is missed; special cases; judgement.',
  scheme: [['Genetic material and evolution', 1], ['Not cellular; inert; needs host', 1.5], ['Criteria of the kingdoms; viroids and lichens', 1.5], ['Reasoned judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [3],
}));

// ---------------------------------------------------------------- cases
{
  const s = Q.swab;
  add('swab-case', mk.case({
    passage: `A microbiology class examines a pond-water culture under a microscope and tallies the bacterial cells by shape: ${s.cocci} spherical, ${s.bacilli} rod-shaped and the remaining cells spiral. The total number of cells counted is ${s.total}. A cyanobacterial filament with one enlarged cell is also seen but is not counted.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What are the spherical and the spiral bacterial shapes called?',
        right: 'Coccus and spirillum',
        wrong: ['Bacillus and vibrio', 'Vibrio and coccus', 'Spirillum and bacillus'],
        sol: 'Spherical cells are cocci and spiral cells are spirilla — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'What percentage of the counted cells are spiral?',
        value: s.spirPct, unit: 'percent',
        sol: r`Spiral cells $= ${s.total} - ${s.cocci} - ${s.bacilli} = ${s.spirilla}$; $\dfrac{${s.spirilla}}{${s.total}} \times 100 = ${s.spirPct}$ percent.`,
        scheme: [[`${s.spirPct} percent`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the enlarged cell of the cyanobacterial filament and state its function.',
        model: 'The enlarged cell is the **heterocyst**. It is the specialised cell in which **atmospheric nitrogen is fixed**, as in *Nostoc* and *Anabaena*.',
        sol: 'Heterocyst; nitrogen fixation.',
        scheme: [['Heterocyst', 1], ['Nitrogen fixation', 1]],
        wl: [10, 50],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'The class later finds that one culture lacks any cell wall and survives without oxygen. Name the organism and say why it is special.',
          model: 'The organism is a **mycoplasma**. It **completely lacks a cell wall**, is the **smallest living cell** known and can **survive without oxygen**; it may be pathogenic to animals and plants.',
          sol: 'Mycoplasma; features.',
          scheme: [['Mycoplasma', 1], ['No wall; smallest; anaerobic', 1]],
          wl: [10, 50],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 30 || 'value');
}
{
  const l = CASE.lake;
  add('lake-case', mk.case({
    passage: `After a hot spell a pond turns green with a cyanobacterial bloom. A student counts ${l.before} filaments per drop on day 0 and finds that the number doubles every day. A fisherman nearby also notices a sea inlet turning red in another season, where a different microscopic organism multiplied rapidly.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which of these is true of the cyanobacteria making the bloom?',
        right: 'They are photosynthetic prokaryotes of kingdom Monera.',
        wrong: ['They are unicellular eukaryotes of kingdom Protista.', 'They are heterotrophs with chitin walls.', 'They are multicellular plants with cellulose walls.'],
        sol: 'Cyanobacteria are photosynthetic autotrophs in the kingdom Monera — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: `How many filaments per drop are there on day ${l.days} if the number doubles each day?`,
        value: l.n,
        sol: r`$${l.before} \times 2^{${l.days}} = ${l.n}$ filaments per drop.`,
        scheme: [[`${l.n} filaments`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the organism that causes the red water in the inlet, and explain how it harms fish.',
        model: 'The red colour is caused by rapid multiplication of **dinoflagellates such as Gonyaulax**, forming a **red tide**. The **toxins** they release can **kill fish**.',
        sol: 'Dinoflagellates; toxins.',
        scheme: [['Dinoflagellates and red tide', 1], ['Toxins kill fish', 1]],
        wl: [10, 50],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Name the specialised cells in which some of the cyanobacteria of the bloom fix nitrogen, and say why this helps the pond ecosystem.',
          model: 'Nitrogen is fixed in **heterocysts**, as in *Nostoc* and *Anabaena*. This adds **nitrogen compounds** usable by other organisms, so it **enriches the pond** and the soil it irrigates.',
          sol: 'Heterocysts; enrichment.',
          scheme: [['Heterocysts', 1], ['Enriches nitrogen supply', 1]],
          wl: [10, 50],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 96 || 'value');
}
{
  const f = CASE.field;
  add('field-case', mk.case({
    passage: `In a wheat field a plant pathologist finds orange-brown pustules on the leaves of ${f.rusted} of ${f.plants} plants sampled. Under the microscope the fungus has septate mycelium, no asexual spores, and club-shaped cells bearing four spores each. The wheat also grows well beside mushrooms that feed on dead straw.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'To which class of fungi does the rust fungus belong?',
        right: 'Basidiomycetes',
        wrong: ['Ascomycetes', 'Phycomycetes', 'Deuteromycetes'],
        sol: 'Septate mycelium and four spores on a club-shaped basidium indicate Basidiomycetes (rusts and smuts) — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'What percentage of the sampled plants show rust?',
        value: f.pct, unit: 'percent',
        sol: r`$\dfrac{${f.rusted}}{${f.plants}} \times 100 = ${f.pct}$ percent.`,
        scheme: [[`${f.pct} percent`, 1]],
        d: 1, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Distinguish the mode of nutrition of the rust fungus from that of the mushrooms on dead straw.',
        model: 'The **rust fungus** is a **parasite**: it takes food from **living wheat plants**. The **mushrooms** are **saprophytes**: they absorb soluble nutrients from **dead straw**. Both are **heterotrophs**.',
        sol: 'Parasite versus saprophyte.',
        scheme: [['Rust: parasite on living host', 1], ['Mushroom: saprophyte on dead matter', 1]],
        wl: [10, 50],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Name the spore type produced on the club-shaped cells and the structure that bears them.',
          model: 'The club-shaped cell is a **basidium**, and it bears four **basidiospores**, the sexual spores of Basidiomycetes.',
          sol: 'Basidium; basidiospores.',
          scheme: [['Basidium', 1], ['Basidiospores', 1]],
          wl: [10, 50],
          d: 1, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 15 || 'value');
}
{
  const w = CASE.ward;
  add('virus-case', mk.case({
    passage: `A clinic records ${w.total} infectious cases in a month: ${w.bacterial} bacterial, ${w.viral} viral, ${w.protozoal} caused by protozoans and the rest fungal. Separately, a nursery owner finds that potato plants show stunted growth caused by a short free RNA with no protein coat, while tobacco plants nearby show mosaic patterns.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The agent that causes the potato disease is best described as a',
        right: 'viroid',
        wrong: ['bacteriophage', 'mycoplasma', 'cyanobacterium'],
        sol: 'A short, free RNA without a protein coat that causes potato spindle tuber disease is a viroid — option (@K).',
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'What percentage of the clinic’s cases are viral?',
        value: w.viralPct, unit: 'percent',
        sol: r`$\dfrac{${w.viral}}{${w.total}} \times 100 = ${w.viralPct}$ percent.`,
        scheme: [[`${w.viralPct} percent`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'State two differences between the potato agent and the agent that causes the tobacco mosaic.',
        model: 'The potato agent is a **viroid**: **only low-molecular-weight RNA** and **no protein coat**. The tobacco mosaic agent is a **virus**, with **genetic material (RNA) inside a protein coat (capsid)**; it is larger and made of nucleic acid plus protein.',
        sol: 'Coat and composition.',
        scheme: [['Viroid: RNA only, no coat', 1], ['Virus: nucleic acid plus protein coat', 1]],
        wl: [20, 55],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: `How many of the clinic’s cases are fungal? Name one feature of fungi that separates them from the bacteria in the list.`,
          model: r`Fungal cases $= ${w.total} - ${w.bacterial} - ${w.viral} - ${w.protozoal} = ${w.fungal}$. Fungi are **eukaryotes with chitin cell walls** and a mycelium of hyphae, whereas bacteria are **prokaryotes** without a nuclear membrane.`,
          sol: 'Count; feature.',
          scheme: [[`${w.fungal} cases`, 1], ['A feature of fungi', 1]],
          wl: [20, 55],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 30 || 'value');
}
void K; void KINGDOMS;
