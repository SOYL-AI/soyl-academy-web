// ch08 Cell: The Unit of Life — two decks: Part 1 (t01 cell theory and cell types, t02 membrane and wall), Part 2 (t03 organelles).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { PROKARYOTE, MEMBRANE, ANIMAL_CELL, PLANT_CELL, MITO_CHLORO, AXONEME, CHROMOSOMES } from './svgs.mjs';
import { magnification, armRatio } from './calc.mjs';

export const V = {
  prokaryote: svgV(PROKARYOTE, 'Bacterial cell with capsule, cell wall, plasma membrane, mesosome, nucleoid, plasmids, ribosomes, inclusion bodies, flagellum and pili'),
  membrane: svgV(MEMBRANE, 'Fluid mosaic membrane: lipid bilayer with polar heads and hydrophobic tails, integral and peripheral proteins, and carbohydrate chains'),
  animal: svgV(ANIMAL_CELL, 'Animal cell with nucleus, rough and smooth ER, Golgi apparatus, mitochondria, lysosomes, ribosomes and centrioles'),
  plant: svgV(PLANT_CELL, 'Plant cell with cell wall, middle lamella, plasmodesmata, central vacuole with tonoplast, chloroplasts, nucleus, mitochondria and Golgi apparatus'),
  mitoChloro: svgV(MITO_CHLORO, 'Mitochondrion with cristae and matrix beside a chloroplast with grana, stroma lamellae and stroma, both with DNA and 70S ribosomes'),
  axoneme: svgV(AXONEME, 'Cross-sections of a cilium with the 9 plus 2 microtubule array and of a centriole with nine triplets and a central hub'),
  chromosomes: svgV(CHROMOSOMES, 'Metacentric, sub-metacentric, acrocentric and telocentric chromosomes drawn by centromere position'),
};

// ---------------------------------------------------------------- computed numbers
const MAG = { mm: 18, um: 3 };
MAG.x = magnification(MAG.mm, MAG.um);
const ARMS = [
  ['P', 3, 3],
  ['Q', 4, 2],
  ['R', 5.5, 0.5],
  ['S', 6, 0],
].map(([n, L, s]) => ({ n, L, s, ratio: armRatio(L, s) }));
const typeOf = (a) => (a.s === 0 ? 'Telocentric' : a.ratio <= 1.2 ? 'Metacentric' : a.ratio <= 3 ? 'Sub-metacentric' : 'Acrocentric');

export const deck1 = deck({
  part: 1,
  title: 'Cell: The Unit of Life — Part 1: Cell theory, cell types, membrane and wall',
  goals: [
    'State the cell theory and the contributions that built it',
    'Compare prokaryotic and eukaryotic cells',
    'Describe the fluid mosaic model and transport across membranes',
    'Describe the plant cell wall and middle lamella',
  ],
  slides: [
    sl('title', 'Cell: The Unit of Life', {
      b: 'Part 1 — how we learnt that all life is made of cells, and how the simplest cells and the cell boundary are built.',
      v: flow('LR', [['l', 'Leeuwenhoek: living cells seen'], ['b', 'Brown: nucleus'], ['s', 'Schleiden and Schwann: cell theory'], ['v', 'Virchow: cells from cells']], [['l', 'b'], ['b', 's'], ['s', 'v']], 'Flow of discoveries leading to the cell theory'),
      n: 'Anything less than a complete cell cannot live independently, so the cell is the fundamental unit of life. Unicellular organisms carry out all life processes within one cell, while multicellular organisms are built of many cells.',
    }),
    sl('concept', 'The cell theory', {
      b: 'The cell theory grew from the work of several scientists.',
      v: table(['Scientist', 'Contribution'], [['Anton von Leeuwenhoek', 'First saw and described a live cell'], ['Robert Brown (1831)', 'Discovered the nucleus'], ['Matthias Schleiden (1838)', 'Plants are made of different kinds of cells forming tissues'], ['Theodore Schwann (1839)', 'Animal cells have a thin outer layer (plasma membrane); the cell wall is unique to plant cells; bodies are made of cells and their products'], ['Rudolf Virchow (1855)', 'New cells arise from pre-existing cells']], 'Table of scientists and their contributions to the cell theory'),
      n: 'Schleiden and Schwann together proposed that plants and animals are composed of cells and products of cells, but they could not explain how new cells formed. Virchow showed that cells divide, so every cell comes from a pre-existing cell. These two ideas make up the modern cell theory.',
    }),
    sl('concept', 'Sizes and shapes of cells', {
      b: 'Cells vary greatly in size and shape, which suits their functions.',
      v: table(['Cell', 'Size or feature'], [['Mycoplasma', 'Smallest cells, about 0.3 µm long'], ['Typical bacteria', '3 to 5 µm'], ['Human red blood cell', 'About 7 µm across'], ['Egg of an ostrich', 'Largest isolated single cell'], ['Nerve cell', 'Among the longest cells']], 'Table of cell sizes from Mycoplasma to the ostrich egg'),
      n: 'Cells may be disc-like, polygonal, columnar, cuboidal, thread-like or irregular. A red blood cell is a flexible disc that slips through capillaries, while a nerve cell is long enough to carry messages across the body.',
    }),
    sl('example', 'Worked example 1: finding a magnification', {
      b: `A bacterium ${MAG.um} µm long appears ${MAG.mm} mm long in an electron micrograph. What is the magnification?`,
      ul: [
        r`Magnification $= \dfrac{\text{image size}}{\text{real size}}$, with both in the same unit.`,
        r`$\dfrac{${MAG.mm} \times 1000}{${MAG.um}} = ${MAG.x}$.`,
        'An image like this could only come from an electron microscope; light microscopes magnify much less.',
      ],
      v: table(['Quantity', 'Value'], [['Image', `${MAG.mm} mm = ${MAG.mm * 1000} µm`], ['Real size', `${MAG.um} µm`], ['Magnification', String(MAG.x)]], `Worked table: magnification ${MAG.x}`),
      n: 'First convert eighteen millimetres to eighteen thousand micrometres. Then divide by the real length of three micrometres. The magnification is six thousand times.',
    }),
    sl('concept', 'Prokaryotic and eukaryotic cells', {
      b: 'Cells are of two kinds, depending on whether the genetic material is enclosed by a nuclear membrane.',
      v: table(['Feature', 'Prokaryotic', 'Eukaryotic'], [['Examples', 'Bacteria, blue-green algae, mycoplasma, PPLO', 'Protists, plants, animals, fungi'], ['Nuclear envelope', 'Absent: naked genetic material', 'Present: organised nucleus'], ['Membrane-bound organelles', 'Absent', 'Present: ER, Golgi, mitochondria and others'], ['Ribosomes', '70S', '80S in cytoplasm'], ['Size and division', 'Usually smaller; multiply rapidly', 'Usually larger']], 'Table comparing prokaryotic and eukaryotic cells'),
      n: 'Prokaryotes have no nuclear envelope and no membrane-bound organelles, only ribosomes. Eukaryotic cells are divided into many compartments by membranes. Among eukaryotes, plant cells have walls, plastids and a large central vacuole, while animal cells have centrioles.',
    }),
    sl('diagram', 'A prokaryotic cell', {
      b: 'Bacteria may be rods (**bacillus**), spheres (**coccus**), commas (**vibrio**) or spirals (**spirillum**). The genomic DNA is a single circular chromosome; **plasmids** carry extra genes such as antibiotic resistance.',
      v: V.prokaryote,
      n: 'The cell envelope has three layers: the glycocalyx outside, then the cell wall, then the plasma membrane. The mesosome, an infolding of the membrane, helps in forming the wall, copying and sharing DNA, respiration and secretion. Flagella give motility, while pili and fimbriae help in attachment.',
    }),
    sl('concept', 'The bacterial cell envelope and inclusions', {
      b: 'Differences in the envelope explain why some bacteria are **Gram-positive** (take up the Gram stain) and others **Gram-negative**.',
      v: table(['Structure', 'Feature'], [['Glycocalyx', 'Loose sheath: slime layer; thick and tough: capsule'], ['Cell wall', 'Fixes shape, stops bursting or collapse'], ['Chromatophores', 'Pigment-containing membrane extensions in cyanobacteria'], ['Ribosomes', '70S (50S plus 30S), about 15 nm by 20 nm; may form polysomes on one mRNA'], ['Inclusion bodies', 'Phosphate, cyanophycean and glycogen granules, not membrane-bound; gas vacuoles in some photosynthetic bacteria']], 'Table of the bacterial envelope, ribosomes and inclusions'),
      n: 'The envelope works as a single protective unit. Ribosomes, attached to the plasma membrane, make proteins, and several may work along one messenger RNA as a polysome. Reserve foods lie free in the cytoplasm as inclusion bodies.',
    }),
    sl('check', 'Quick check: smallest cells', {
      b: 'Which organisms have the smallest cells known?',
      n: 'Quick check. These prokaryotes even lack a cell wall.',
      chk: 'smallest-mcq',
    }),
    sl('check', 'Quick check: mesosomes', {
      b: 'Which is NOT a function of the mesosome?',
      n: 'Quick check. Remember that bacteria have no chloroplasts.',
      chk: 'mesosome-mcq',
    }),
    sl('diagram', 'The plasma membrane', {
      b: 'Studies on human red blood cells show a **lipid bilayer**, mainly of phosphoglycerides, with **polar heads outwards** and **hydrophobic tails inwards**. The red cell membrane has about **52 percent protein** and **40 percent lipid**.',
      v: V.membrane,
      n: 'In the fluid mosaic model of Singer and Nicolson, the lipid is quasi-fluid, so proteins can move sideways. Integral proteins are partly or totally buried, and peripheral proteins lie on the surface. Fluidity is needed for growth, cell junctions, secretion, endocytosis and cell division.',
    }),
    sl('concept', 'Transport across the membrane', {
      b: 'The membrane is **selectively permeable**.',
      v: table(['Kind', 'What happens', 'Energy'], [['Simple diffusion', 'Neutral solutes move down their concentration gradient', 'None (passive)'], ['Osmosis', 'Water diffuses across the membrane', 'None (passive)'], ['Carrier-assisted', 'Polar molecules cross the non-polar bilayer with carrier proteins', 'None when down the gradient'], ['Active transport', 'Ions such as sodium moved against the gradient, as by the sodium–potassium pump', 'ATP']], 'Table of passive and active transport across the membrane'),
      n: 'Passive transport moves substances from high to low concentration without spending energy. Polar molecules cannot dissolve through the lipid core, so they need carrier proteins. Active transport pumps substances against the gradient and uses energy from ATP.',
    }),
    sl('example', 'Worked example 2: which kind of transport?', {
      b: 'Decide how each substance crosses the membrane.',
      ul: [
        'Carbon dioxide leaving a respiring cell, where it is more concentrated inside → **simple diffusion**.',
        'Water entering a dried raisin placed in water → **osmosis**.',
        'Glucose, a polar molecule, entering a cell down its gradient → **carrier protein** (passive).',
        'Potassium taken into a cell that already has more potassium than the outside → **active transport** with ATP.',
      ],
      v: table(['Substance', 'Direction', 'Mode'], [['Carbon dioxide', 'Down gradient', 'Diffusion'], ['Water', 'Into raisin', 'Osmosis'], ['Glucose', 'Down gradient, polar', 'Carrier'], ['Potassium', 'Against gradient', 'Active']], 'Worked table classifying four movements across the membrane'),
      n: 'Ask two questions. Is the substance moving down or against its gradient? And can it pass through lipid? Down the gradient through lipid is diffusion; water is osmosis; polar molecules need carriers; anything against the gradient needs energy.',
    }),
    sl('check', 'Quick check: bilayer', {
      b: 'How are the lipid molecules arranged in the membrane?',
      n: 'Quick check. Which part of the lipid avoids water?',
      chk: 'lipids-mcq',
    }),
    sl('concept', 'The cell wall', {
      b: 'Fungi and plants have a **non-living rigid cell wall** outside the plasma membrane. It gives shape, protects against mechanical damage and infection, helps cell-to-cell interaction and blocks undesirable macromolecules.',
      v: table(['Part', 'Detail'], [['Algal wall', 'Cellulose, galactans, mannans and minerals such as calcium carbonate'], ['Other plant walls', 'Cellulose, hemicellulose, pectins and proteins'], ['Primary wall', 'Thin wall of young cells, capable of growth'], ['Secondary wall', 'Formed on the inner side, towards the membrane, as the cell matures'], ['Middle lamella', 'Mainly calcium pectate; glues neighbouring cells'], ['Plasmodesmata', 'Cross the wall and middle lamella, connecting neighbouring cytoplasms']], 'Table of cell wall composition and layers'),
      n: 'The primary wall can grow, but its capacity falls as the cell matures, and a secondary wall is laid down inside it. Neighbouring cells are glued by the middle lamella and linked by fine cytoplasmic strands called plasmodesmata.',
    }),
    sl('check', 'Quick check: middle lamella', {
      b: 'What is the main substance of the middle lamella?',
      n: 'Quick check. It is a calcium compound.',
      chk: 'lamella-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Cell theory: organisms are made of cells and cell products; cells arise from pre-existing cells (Schleiden, Schwann, Virchow).',
        'Sizes: Mycoplasma 0.3 µm, bacteria 3 to 5 µm, red cell 7 µm; ostrich egg largest single cell.',
        'Prokaryotes: no nuclear envelope, no membrane-bound organelles; envelope of glycocalyx, wall and membrane; mesosomes, plasmids, 70S ribosomes, inclusion bodies, flagella, pili, fimbriae.',
        'Fluid mosaic membrane: lipid bilayer with integral and peripheral proteins; passive and active transport.',
        'Cell wall: primary and secondary walls, middle lamella of calcium pectate, plasmodesmata.',
      ],
      v: table(['Idea', 'Key point'], [['Cell theory', 'Cells from cells'], ['Prokaryote', 'No nuclear envelope'], ['Membrane', 'Quasi-fluid bilayer'], ['Wall', 'Rigid, non-living']], 'Summary table of four key ideas'),
      n: 'To recap: the cell is the unit of life, and every cell comes from another. Prokaryotes lack a nuclear envelope and membrane organelles. The plasma membrane is a fluid bilayer that controls transport, and plant cells add a rigid wall outside it.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'State **both parts** of the cell theory and credit **Virchow**.',
        'Compare prokaryotes and eukaryotes in a **table** of three or more features.',
        'Draw the **fluid mosaic** membrane with labels.',
        'Classify transport by **gradient** and **energy**.',
      ],
      n: 'Exam tips. Write both statements of the cell theory. Use tables to compare cell types. Practise a labelled drawing of the fluid mosaic membrane. And always decide transport type from the gradient and the need for energy.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Cell: The Unit of Life — Part 2: Cell organelles',
  goals: [
    'Describe the endomembrane system: ER, Golgi, lysosomes and vacuoles',
    'Compare mitochondria and plastids',
    'Describe ribosomes, the cytoskeleton, cilia, flagella and centrioles',
    'Describe the nucleus and classify chromosomes',
  ],
  slides: [
    sl('title', 'Cell organelles', {
      b: 'Part 2 — the compartments of a eukaryotic cell and what each one does.',
      v: flow('LR', [['r', 'Rough ER: proteins made'], ['g', 'Golgi: modified and packaged'], ['l', 'Lysosomes'], ['s', 'Secretory vesicles to membrane']], [['r', 'g'], ['g', 'l'], ['g', 's']], 'Flow of proteins from rough ER through the Golgi to lysosomes or secretion'),
      n: 'Many membrane-bound organelles work together as the endomembrane system: the endoplasmic reticulum, Golgi complex, lysosomes and vacuoles. Mitochondria, chloroplasts and peroxisomes are not included, because their functions are not coordinated with these.',
    }),
    sl('diagram', 'An animal cell', {
      b: 'Animal cells have **centrioles** and lack a cell wall, plastids and a large central vacuole.',
      v: V.animal,
      n: 'The nucleus is wrapped in a double envelope with pores. Rough endoplasmic reticulum, studded with ribosomes, is continuous with the outer nuclear membrane. Smooth endoplasmic reticulum, the Golgi apparatus, mitochondria and lysosomes are spread through the cytoplasm, and a centrosome with two centrioles lies near the nucleus.',
    }),
    sl('diagram', 'A plant cell', {
      b: 'Plant cells have a **cell wall**, **plastids** and a **large central vacuole**; centrioles are absent in almost all plant cells.',
      v: V.plant,
      n: 'In a mature plant cell the central vacuole, bounded by the tonoplast, may fill up to ninety percent of the cell and pushes the nucleus and cytoplasm to the edges. Chloroplasts trap light, and plasmodesmata cross the wall to link neighbouring cells.',
    }),
    sl('concept', 'Endoplasmic reticulum and Golgi apparatus', {
      b: 'The **ER** is a network of tubules that divides the cell into a **luminal** (inside ER) and an **extra-luminal** (cytoplasm) compartment. The **Golgi apparatus**, seen by **Camillo Golgi (1898)**, is a stack of flat cisternae 0.5 to 1.0 µm across.',
      v: table(['Organelle', 'Structure', 'Function'], [['Rough ER', 'Ribosomes on outer surface; continuous with nuclear envelope', 'Protein synthesis and secretion'], ['Smooth ER', 'No ribosomes', 'Lipid synthesis; steroid hormones in animal cells'], ['Golgi apparatus', 'Cisternae with convex cis (forming) face and concave trans (maturing) face', 'Modifies and packages materials; forms glycoproteins and glycolipids']], 'Table of rough ER, smooth ER and Golgi apparatus'),
      n: 'Vesicles from the endoplasmic reticulum fuse with the cis face of the Golgi apparatus. Inside the cisternae the proteins are modified and packaged, and they leave from the trans face, either for use inside the cell or for secretion.',
    }),
    sl('concept', 'Lysosomes, vacuoles and microbodies', {
      b: 'Three more kinds of membrane-bound sacs.',
      v: table(['Organelle', 'Features'], [['Lysosome', 'Formed by Golgi packaging; hydrolytic enzymes (lipases, proteases, carbohydrases) active at acidic pH; digest carbohydrates, proteins, lipids and nucleic acids'], ['Vacuole', 'Bounded by the tonoplast; water, sap, excretory products; up to 90 percent of a plant cell; tonoplast moves ions in against their gradient'], ['Contractile vacuole', 'Osmoregulation and excretion in Amoeba'], ['Food vacuole', 'Formed when protists engulf food'], ['Microbodies', 'Minute vesicles with enzymes, in plant and animal cells']], 'Table of lysosomes, vacuoles and microbodies'),
      n: 'Lysosomes are the cell’s digestive bags, with enzymes that work in acid. Vacuoles store sap and wastes; in plants their membrane, the tonoplast, pumps ions inwards, so the sap becomes much more concentrated than the cytoplasm.',
    }),
    sl('check', 'Quick check: endomembrane system', {
      b: 'Which organelle is NOT part of the endomembrane system?',
      n: 'Quick check. Which of these has its own DNA and works independently?',
      chk: 'endomem-mcq',
    }),
    sl('example', 'Worked example 1: which organelle is busy?', {
      b: 'Predict the organelle that will be most extensive in each cell.',
      ul: [
        'A gland cell secreting a protein enzyme → **rough ER and Golgi apparatus**.',
        'A cell making steroid hormones → **smooth ER**.',
        'A white blood cell digesting engulfed bacteria → **lysosomes**.',
        'An insect flight muscle cell → **mitochondria**, for ATP.',
      ],
      v: table(['Cell', 'Main job', 'Busy organelle'], [['Enzyme-secreting gland', 'Make and export protein', 'Rough ER, Golgi'], ['Steroid-making cell', 'Make lipid hormones', 'Smooth ER'], ['White blood cell', 'Digest bacteria', 'Lysosomes'], ['Flight muscle', 'Use much energy', 'Mitochondria']], 'Worked table matching cell jobs to busy organelles'),
      n: 'Structure follows function. A cell that exports protein is full of rough endoplasmic reticulum and Golgi stacks. Lipid makers have smooth reticulum. Cells that digest have many lysosomes, and very active cells have many mitochondria.',
    }),
    sl('diagram', 'Mitochondria and chloroplasts', {
      b: 'Both have **two membranes**, their own **circular DNA** and **70S ribosomes**. Mitochondria (0.2 to 1.0 µm wide, 1.0 to 4.1 µm long) divide by fission.',
      v: V.mitoChloro,
      n: 'In a mitochondrion the inner membrane folds into cristae that increase the surface area; the matrix and membranes carry the enzymes of aerobic respiration, which makes ATP. In a chloroplast, thylakoids stacked as grana carry chlorophyll, and the stroma holds enzymes that make carbohydrates and proteins.',
    }),
    sl('concept', 'Plastids', {
      b: 'Plastids occur in all plant cells and in euglenoids. Chloroplasts are mostly in the **mesophyll** of leaves: one per cell in **Chlamydomonas**, 20 to 40 per mesophyll cell; 5 to 10 µm long and 2 to 4 µm wide.',
      v: table(['Plastid', 'Pigment or store', 'Example'], [['Chloroplast', 'Chlorophyll and carotenoids; trap light', 'Leaf mesophyll'], ['Chromoplast', 'Carotenoids such as carotene and xanthophylls: yellow, orange, red', 'Coloured fruits, carrot root'], ['Amyloplast (leucoplast)', 'Starch', 'Potato tuber'], ['Elaioplast (leucoplast)', 'Oils and fats', 'Oily seeds'], ['Aleuroplast (leucoplast)', 'Proteins', 'Protein-rich seeds']], 'Table of kinds of plastids'),
      n: 'Plastids are named by their pigments or stores. Green chloroplasts trap light, coloured chromoplasts hold fat-soluble carotenoids, and colourless leucoplasts store starch, oils or proteins.',
    }),
    sl('concept', 'Ribosomes and the cytoskeleton', {
      b: 'Ribosomes, seen by **George Palade (1953)**, are made of **RNA and protein** and have **no membrane**. The **cytoskeleton** of microtubules, microfilaments and intermediate filaments gives mechanical support, motility and shape.',
      v: table(['Ribosome', 'Subunits', 'Where'], [['80S', '60S and 40S', 'Eukaryotic cytoplasm'], ['70S', '50S and 30S', 'Prokaryotes, mitochondria, chloroplasts']], 'Table of 80S and 70S ribosomes and their subunits'),
      n: 'S stands for the Svedberg unit, a sedimentation coefficient that indirectly measures density and size. That is why a fifty S and a thirty S subunit make a seventy S ribosome: the values do not simply add up.',
    }),
    sl('check', 'Quick check: chloroplast', {
      b: 'Where are the enzymes for carbohydrate and protein synthesis in a chloroplast?',
      n: 'Quick check. Think of the fluid that surrounds the grana.',
      chk: 'stroma-mcq',
    }),
    sl('diagram', 'Cilia, flagella and centrioles', {
      b: 'Cilia work like oars; flagella are longer and move the cell. Both have an **axoneme** of **nine peripheral doublets and a central pair (9 + 2)** and arise from **basal bodies**.',
      v: V.axoneme,
      n: 'Radial spokes join the central sheath to each doublet, and linkers join the doublets. A centrosome has two centrioles lying at right angles, each a cartwheel of nine triplets around a central hub. Centrioles form basal bodies and the spindle fibres of dividing animal cells. Bacterial flagella are built quite differently.',
    }),
    sl('concept', 'The nucleus', {
      b: '**Robert Brown** described the nucleus in 1831; **Flemming** named the stainable material **chromatin**.',
      v: table(['Part', 'Feature'], [['Nuclear envelope', 'Two membranes with a perinuclear space of 10 to 50 nm; outer membrane continuous with ER'], ['Nuclear pores', 'Let RNA and proteins move in both directions'], ['Nucleolus', 'Not membrane-bound; site of ribosomal RNA synthesis; larger in protein-making cells'], ['Chromatin', 'DNA, histones, non-histone proteins and RNA; about two metres of DNA in a human cell']], 'Table of parts of the nucleus'),
      n: 'Most cells have one nucleus, but mature red blood cells of many mammals and the sieve tube cells of plants have none. During division the loose chromatin condenses into distinct chromosomes.',
    }),
    sl('diagram', 'Kinds of chromosomes', {
      b: 'Each chromosome has a **centromere** (primary constriction) with disc-shaped **kinetochores**. Some have a **secondary constriction** that cuts off a **satellite**.',
      v: V.chromosomes,
      n: 'The position of the centromere names the chromosome. In the middle gives a metacentric chromosome; a little off-centre, sub-metacentric; very near one end, acrocentric; and at the very tip, telocentric.',
    }),
    sl('example', 'Worked example 2: naming chromosomes from arm lengths', {
      b: 'Four chromosomes have these arm lengths in micrometres (long arm, short arm). Classify each.',
      ul: ARMS.map((a) => `${a.n}: ${a.L} and ${a.s} → arm ratio ${a.s === 0 ? 'undefined (no short arm)' : a.ratio} → **${typeOf(a).toLowerCase()}**.`),
      v: table(['Chromosome', 'Arms', 'Long ÷ short', 'Type'], ARMS.map((a) => [a.n, `${a.L}, ${a.s}`, a.s === 0 ? 'no short arm' : String(a.ratio), typeOf(a)]), 'Worked table classifying four chromosomes by arm ratio'),
      n: 'Divide the long arm by the short arm. Equal arms give a ratio of one, which is metacentric. A ratio of about two is sub-metacentric. A very large ratio means one arm is tiny, which is acrocentric. With no short arm at all, the centromere is at the tip, so the chromosome is telocentric.',
    }),
    sl('check', 'Quick check: ribosomes', {
      b: 'True or false: a 50S and a 30S subunit form an 80S ribosome.',
      n: 'Quick check. Do Svedberg values simply add up?',
      chk: 'svedberg-tf',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Endomembrane system: ER (rough: proteins; smooth: lipids), Golgi (cis to trans; packaging, glycoproteins), lysosomes (acid hydrolases), vacuoles (tonoplast).',
        'Mitochondria: cristae, matrix, ATP; chloroplasts: grana, stroma lamellae, stroma; both with DNA and 70S ribosomes.',
        'Plastids: chloroplasts, chromoplasts, leucoplasts (amyloplasts, elaioplasts, aleuroplasts).',
        'Ribosomes 80S (60S plus 40S) and 70S (50S plus 30S); cytoskeleton; 9 plus 2 axoneme; centrioles with nine triplets.',
        'Nucleus: double envelope with pores, nucleolus, chromatin; chromosomes metacentric to telocentric.',
      ],
      v: table(['Organelle', 'One-line role'], [['Rough ER', 'Makes proteins'], ['Golgi', 'Packages'], ['Lysosome', 'Digests'], ['Mitochondrion', 'Makes ATP'], ['Chloroplast', 'Traps light'], ['Nucleolus', 'Makes rRNA']], 'Summary table of organelles and roles'),
      n: 'To recap: the endomembrane system makes, modifies and packages materials. Mitochondria and chloroplasts are double-membrane energy organelles with their own DNA. Ribosomes make proteins, the cytoskeleton gives shape and movement, and the nucleus stores and protects the genetic material.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name the **cis and trans faces** of the Golgi correctly.',
        'Do not add **Svedberg values**.',
        'Draw **mitochondrion** and **chloroplast** with at least five labels.',
        'Classify chromosomes by **centromere position**.',
      ],
      n: 'Exam tips. Material enters the Golgi at the cis face and leaves at the trans face. Remember that subunit S values do not add up. Practise labelled drawings of the mitochondrion and chloroplast. And classify chromosomes by where the centromere sits.',
    }),
  ],
});
