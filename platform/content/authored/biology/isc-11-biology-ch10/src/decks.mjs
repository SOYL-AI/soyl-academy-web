// ISC 11 Biology ch10 Cell: The Unit of Life. Part 1 (t01-t03) and Part 2 (t04-t06).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { MEMBRANE, CARRIERS, ENDO, ORGANELLES, AXONEME_SVG, CHROMOSOMES, RATEGRAPH } from './svgs.mjs';
import { CUBES, SMALL_IN_BIG, SA_SMALL_TOTAL, TR, CARRIER, CAR_SAT_200, GAIN_100_200, CROSS, SCALE, MITO_CM, realUm, ribosomesAcross, axonemeMicrotubules, CILIA_PER_CELL, cellMicrotubules, centrioleMicrotubules, BASAL_TOTAL, CHR, shortShare, longArm, armRatio, kind, YEARS } from './calc.mjs';

export const V = {
  membrane: svgV(MEMBRANE, 'Fluid mosaic model of the plasma membrane with its lipids, proteins and carbohydrate chains labelled'),
  carriers: svgV(CARRIERS, 'Uniport, symport and antiport carriers drawn across a membrane'),
  endo: svgV(ENDO, 'Route of a secreted protein from the rough endoplasmic reticulum through the Golgi complex to secretion or a lysosome'),
  organelles: svgV(ORGANELLES, 'Ultrastructure of a mitochondrion and a chloroplast, labelled'),
  axoneme: svgV(AXONEME_SVG, 'Cross-sections of a nine plus two axoneme and of a centriole with nine triplets'),
  chromosomes: svgV(CHROMOSOMES, 'Metacentric, submetacentric, acrocentric and telocentric chromosomes with the centromere marked'),
  rate: svgV(RATEGRAPH, 'Graph of the rate of entry against concentration for simple diffusion and for a carrier'),
};

const [c2, c4, c8] = CUBES;
const t = (n) => TR.find((x) => x.s === n);

export const deck1 = deck({
  part: 1,
  title: 'Cell: The Unit of Life — Part 1: Cell theory, the membrane and the endomembrane system',
  goals: [
    'State the cell theory and Virchow’s modification; compare prokaryotic and eukaryotic cells and plant and animal cells',
    'Describe the cell wall and plasmodesmata, and the fluid mosaic model with active and passive transport',
    'Describe the endoplasmic reticulum, Golgi complex, lysosomes and vacuoles and how they work together in secretion',
  ],
  slides: [
    sl('title', 'The cell: the unit of life', {
      b: 'Part 1: the cell theory, the plasma membrane and the organelles that make and ship proteins.',
      v: flow('LR', [['h', 'Discovery'], ['t', 'Cell theory'], ['m', 'Membrane'], ['o', 'Endomembrane system']], [['h', 't'], ['t', 'm'], ['m', 'o']], 'Path from the discovery of cells to the cell theory, the membrane and the endomembrane system'),
      n: 'Every living thing is made of cells. In this part we follow how cells were discovered, how the cell theory was framed, how the membrane controls traffic, and how a group of organelles cooperates to make and export proteins.',
    }),
    sl('concept', 'Discovery and the cell theory', {
      b: 'The cell theory was built step by step. **Schleiden and Schwann** proposed that all plants and animals are made of cells and their products; **Virchow** added that new cells arise only from pre-existing cells (*omnis cellula-e cellula*), which **modified** the theory.',
      v: table(['Year', 'Scientist', 'Contribution'], [[String(YEARS.hooke), 'Robert Hooke', 'Saw box-like compartments in a slice of cork and named them cells'], [String(YEARS.leeuwenhoek), 'Anton van Leeuwenhoek', 'First saw living cells with a simple microscope'], [String(YEARS.brown), 'Robert Brown', 'Discovered the nucleus'], [String(YEARS.schleiden), 'Matthias Schleiden', 'All plants are made of cells'], [String(YEARS.schwann), 'Theodor Schwann', 'All animals are made of cells; the cell theory'], [String(YEARS.virchow), 'Rudolf Virchow', 'Cells arise from pre-existing cells']], 'Table of the people who built the cell theory'),
      n: 'Hooke named the cell from dead cork. Leeuwenhoek saw living ones. Brown found the nucleus. Schleiden and Schwann said that plants and animals are made of cells. Sixteen years later, Virchow completed the idea: every cell comes from an earlier cell.',
    }),
    sl('concept', 'Size and shape of cells', {
      b: 'Cell size ranges from the tiny **Mycoplasma** to the **ostrich egg**, the largest single cell; shape matches function.',
      v: table(['Cell', 'Size or shape', 'Link with function'], [['Mycoplasma', 'About 0.3 µm; smallest cell', 'Lives as a parasite with few needs'], ['Human red blood cell', 'About 7 µm; biconcave disc', 'Large surface for oxygen exchange'], ['Nerve cell', 'Branched, some over a metre long', 'Carries impulses over long distances'], ['Columnar epithelial cell', 'Tall and narrow', 'Lines a gut and absorbs food'], ['Spindle-shaped muscle cell', 'Long and tapering', 'Contracts along its length']], 'Table of cell sizes and shapes with their functions'),
      n: 'Cells vary widely in size and shape. Tiny Mycoplasma and huge egg cells are the extremes. A red blood cell is a flat disc, a nerve cell is long and branched, and a muscle cell is a spindle, each shape suiting its job.',
    }),
    sl('example', 'Worked example 1: why most cells are small', {
      b: `Three model cells are cubes of side ${c2.side}, ${c4.side} and ${c8.side} micrometres. Compare their surface area to volume ratio, and say what happens if the large cell's volume is divided into small cells.`,
      ul: [
        `Surface area is six times the side squared: ${c2.sa}, ${c4.sa} and ${c8.sa} square micrometres. Volume is the side cubed: ${c2.vol}, ${c4.vol} and ${c8.vol} cubic micrometres.`,
        `Ratio of surface to volume: ${c2.ratio}, ${c4.ratio} and ${c8.ratio}. The ratio falls as the cell grows.`,
        `The large cube holds ${SMALL_IN_BIG} small cubes. Their total surface is ${SA_SMALL_TOTAL}, which is ${SA_SMALL_TOTAL / c8.sa} times the ${c8.sa} of the large cube.`,
        'Many small cells exchange materials more quickly than one large cell of the same volume.',
      ],
      v: table(['Side', 'Surface area', 'Volume', 'Ratio'], CUBES.map((c) => [String(c.side), String(c.sa), String(c.vol), String(c.ratio)]), `Worked table: ratios ${CUBES.map((c) => c.ratio).join(', ')}`),
      n: 'As a cell grows, its volume rises faster than its surface. So the surface that must pass in food and oxygen becomes small compared with the cytoplasm to be served. Dividing the same volume into many small cells restores a large surface.',
    }),
    sl('concept', 'Prokaryotic and eukaryotic cells', {
      b: 'The two basic cell types differ in organisation, not in the molecules of life.',
      v: table(['Feature', 'Prokaryotic cell', 'Eukaryotic cell'], [['Nucleus', 'No nuclear envelope; nucleoid', 'True nucleus with a double envelope'], ['DNA', 'Circular, naked, one main chromosome', 'Linear, with histone proteins, several chromosomes'], ['Organelles', 'No membrane-bound organelles', 'Mitochondria, ER, Golgi and others'], ['Ribosomes', 'Smaller, 70S', 'Larger, 80S (70S in mitochondria and plastids)'], ['Division', 'Binary fission', 'Mitosis and meiosis'], ['Examples', 'Bacteria, cyanobacteria, Mycoplasma', 'Protists, fungi, plants, animals']], 'Table comparing prokaryotic and eukaryotic cells'),
      n: 'A prokaryote has its genetic material lying free in the cytoplasm and has no membrane-bound organelles. A eukaryote keeps its linear chromosomes inside a nucleus and divides its work among organelles. Bacteria are prokaryotes; protists, fungi, plants and animals are eukaryotes.',
    }),
    sl('concept', 'Plant cell and animal cell', {
      b: 'Both are eukaryotic, but they differ in several structures.',
      v: table(['Feature', 'Plant cell', 'Animal cell'], [['Cell wall', 'Present, made of cellulose', 'Absent'], ['Plastids', 'Present', 'Absent'], ['Vacuole', 'Large and central', 'Small and temporary'], ['Centrioles', 'Absent in higher plants', 'Present'], ['Reserve food', 'Starch', 'Glycogen'], ['Cytokinesis', 'Cell plate', 'Furrow']], 'Table comparing plant and animal cells'),
      n: 'A plant cell has a cellulose wall, plastids and a large central vacuole. An animal cell lacks these but has centrioles. They also store food differently: starch in plants and glycogen in animals.',
    }),
    sl('check', 'Quick check: the cell theory', {
      b: 'Which idea did Virchow add to the cell theory?',
      n: 'Quick check. What did Virchow add to the idea of Schleiden and Schwann?',
      chk: 'virchow-mcq',
    }),
    sl('concept', 'Cell wall and plasmodesmata', {
      b: 'The **cell wall** is a non-living, rigid outer layer in plants, algae and fungi. It protects the cell, gives it shape and prevents bursting. **Plasmodesmata** are cytoplasmic threads that pass through the walls and connect neighbouring cells.',
      v: table(['Part', 'Details'], [['Plant cell wall', 'Cellulose, hemicellulose, pectin and proteins; primary wall and, in some cells, a secondary wall'], ['Middle lamella', 'Calcium pectate that cements neighbouring cells'], ['Algae and fungi', 'Algal walls: cellulose, galactans, mannans, minerals; fungal walls: chitin'], ['Plasmodesmata', 'Channels lined by the plasma membrane and joined by a strand of endoplasmic reticulum; carry water, ions and small molecules between cells']], 'Table of the cell wall and plasmodesmata'),
      n: 'The wall is the protective outer coat of plant, algal and fungal cells. Neighbouring cells are cemented by the middle lamella, yet remain in contact because plasmodesmata link their cytoplasm through tiny gaps in the wall.',
    }),
    sl('diagram', 'The fluid mosaic model', {
      b: 'Singer and Nicolson proposed the **fluid mosaic model** in nineteen seventy-two: a **quasi-fluid lipid bilayer** in which **proteins float like a mosaic**.',
      v: V.membrane,
      n: 'Phospholipid molecules have water-loving heads facing outwards and water-hating tails inside. Integral proteins span the bilayer and peripheral proteins lie on its surface. Cholesterol adds stability. Because lipids and proteins can move sideways, the membrane is fluid.',
    }),
    sl('concept', 'Passive and active transport', {
      b: 'Substances cross the membrane without energy (**passive**) or with energy from ATP (**active**).',
      v: table(['Type', 'Direction and energy', 'Example'], [['Simple diffusion', 'Down a gradient, no carrier', 'Oxygen and carbon dioxide'], ['Facilitated diffusion', 'Down a gradient, carrier or channel, no ATP, saturates', 'Glucose entering a red blood cell'], ['Osmosis', 'Water down its gradient across the membrane', 'Water entering a root hair'], ['Active transport', 'Against a gradient, carrier, uses ATP', 'Sodium–potassium pump']], 'Table of passive and active transport'),
      n: 'Passive movements need no energy because they go downhill along a gradient. Facilitated diffusion uses carrier proteins but is still passive. Active transport pushes substances uphill and uses energy from ATP, as in the sodium potassium pump.',
    }),
    sl('diagram', 'Uniport, symport and antiport', {
      b: 'Carrier proteins can be classed by what they move and in which direction.',
      v: V.carriers,
      n: 'A uniport carries one substance in one direction. A symport carries two different substances together in the same direction. An antiport exchanges two substances, one going in while the other goes out.',
    }),
    sl('example', 'Worked example 2: reading a transport graph', {
      b: `The graph shows the rate of entry of a sugar into a cell by simple diffusion and by a carrier. The carrier's maximum is ${CARRIER.vmax} units a minute, reached only at very high concentration.`,
      ul: [
        `At a concentration of ${t(40).s} units the carrier moves ${t(40).car} units a minute, but diffusion only ${t(40).diff}.`,
        `Doubling the concentration from 100 to 200 raises the carrier rate by only ${GAIN_100_200.car} units (${GAIN_100_200.carPct} percent), yet diffusion rises by ${GAIN_100_200.diff} units. The carrier is already at ${CAR_SAT_200} percent of its maximum.`,
        'The carrier curve levels off because every carrier molecule is busy: facilitated diffusion is specific and saturable. The straight line shows no limit.',
      ],
      v: V.rate,
      n: 'At low concentration, carriers give a much faster entry than diffusion. But carriers can be fully occupied, so the curve flattens. Plain diffusion goes on rising steadily with the concentration.',
    }),
    sl('check', 'Quick check: transport', {
      b: 'Which statement separates active transport from facilitated diffusion?',
      n: 'Quick check. What does active transport need that facilitated diffusion does not?',
      chk: 'transport-mcq',
    }),
    sl('diagram', 'The endomembrane system', {
      b: 'The **endoplasmic reticulum, Golgi complex, lysosomes and vacuoles** are linked by vesicles and work as one system.',
      v: V.endo,
      n: 'Ribosomes on the rough endoplasmic reticulum make a protein into its cavity. Vesicles carry it to the forming face of the Golgi complex, where it is modified. Vesicles leaving the maturing face either secrete it at the membrane or become lysosomes.',
    }),
    sl('concept', 'ER, Golgi, lysosomes and vacuoles', {
      b: 'Each organelle of the system has its own job.',
      v: table(['Organelle', 'Structure', 'Function'], [['Rough ER', 'Flattened sacs with ribosomes, joined to the nuclear envelope', 'Makes proteins for secretion and for membranes'], ['Smooth ER', 'Tubes without ribosomes', 'Makes lipids and steroids; detoxifies'], ['Golgi complex', 'Stack of flattened cisternae, with a cis and a trans face', 'Modifies, sorts and packages; forms lysosomes'], ['Lysosome', 'Single-membrane bag of hydrolytic enzymes', 'Digests food and worn-out parts'], ['Vacuole', 'Single membrane (tonoplast) enclosing sap or water', 'Stores, maintains turgor, removes water in protists']], 'Table of the endomembrane organelles'),
      n: 'The rough endoplasmic reticulum makes protein and the smooth type makes lipids. The Golgi complex packages and sends products out. Lysosomes digest, and vacuoles store water and wastes and keep plant cells firm.',
    }),
    sl('check', 'Quick check: the Golgi complex', {
      b: 'Which organelle packages proteins for secretion?',
      n: 'Quick check. Which organelle sorts and packs the proteins that leave the cell?',
      chk: 'golgi-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Cell theory: all organisms are made of cells; cells arise from pre-existing cells (Virchow).',
        'Prokaryotic cells have no true nucleus or membrane-bound organelles; plant cells have a wall, plastids and a large vacuole.',
        'Fluid mosaic model (Singer and Nicolson): lipid bilayer with floating proteins.',
        'Passive transport needs no ATP; active transport does. Carriers: uniport, symport, antiport.',
        'Endomembrane system: ER, Golgi complex, lysosomes, vacuoles.',
      ],
      v: table(['Idea', 'Key point'], [['Virchow', 'Cells arise from cells'], ['Membrane', 'Fluid mosaic'], ['Golgi', 'Packs and sends products out']], 'Summary table of key points'),
      n: 'To recap: cells come from cells; prokaryotes and eukaryotes differ in organisation; the membrane is a fluid mosaic; transport can be passive or active; and linked organelles make, pack and export proteins.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write the **cell theory** with the modification by **Virchow**.',
        'Draw the **fluid mosaic model** and label lipids, integral and peripheral proteins, and carbohydrate chains.',
        'Give **one example each** of facilitated diffusion and active transport.',
        'Describe the **route of a secreted protein**: rough ER, vesicle, Golgi complex, vesicle.',
      ],
      n: 'Exam tips. State the cell theory with the change made by Virchow. Draw the membrane with all labels. Give one example each of facilitated diffusion and active transport. And describe the route of a secreted protein.',
    }),
  ],
});

const m = (c) => `${c.short} + ${longArm(c)}`;
export const deck2 = deck({
  part: 2,
  title: 'Cell: The Unit of Life — Part 2: Organelles, cytoskeleton and the nucleus',
  goals: [
    'Draw and label a mitochondrion and a chloroplast; distinguish chloroplasts, chromoplasts and leucoplasts; describe ribosomes and microbodies',
    'Describe the cytoskeleton, the nine plus two arrangement of a cilium and the centriole',
    'Describe the nucleus and classify chromosomes by the position of the centromere',
  ],
  slides: [
    sl('title', 'Organelles, filaments and the nucleus', {
      b: 'Part 2: the organelles that release and trap energy, the cell skeleton, and the nucleus with its chromosomes.',
      v: flow('LR', [['e', 'Energy organelles'], ['r', 'Ribosomes and microbodies'], ['s', 'Cytoskeleton'], ['n', 'Nucleus']], [['e', 'r'], ['r', 's'], ['s', 'n']], 'Path from energy organelles to ribosomes, the cytoskeleton and the nucleus'),
      n: 'Here we meet the organelles that handle energy, then the ribosomes that build protein, the filaments that give the cell shape and movement, and finally the nucleus that holds the chromosomes.',
    }),
    sl('diagram', 'Mitochondrion and chloroplast', {
      b: 'Both are **double-membraned**, have their own **circular DNA** and **70S ribosomes**, and can divide on their own.',
      v: V.organelles,
      n: 'A mitochondrion has a smooth outer membrane and an inner membrane folded into cristae, enclosing the matrix. A chloroplast has a double envelope, stacks of thylakoids called grana joined by stroma lamellae, and a fluid stroma.',
    }),
    sl('concept', 'What each membrane compartment does', {
      b: 'Structure and function go together in both organelles.',
      v: table(['Region', 'Mitochondrion', 'Chloroplast'], [['Outer boundary', 'Outer membrane, permeable to small molecules', 'Outer membrane of the envelope'], ['Inner membrane system', 'Cristae carry the particles that make ATP', 'Thylakoids in grana trap light (light reaction)'], ['Fluid space', 'Matrix with respiratory enzymes, DNA, ribosomes', 'Stroma with enzymes for making carbohydrate (dark reaction), DNA, ribosomes'], ['Main job', 'Aerobic respiration: the power house', 'Photosynthesis']], 'Table comparing the regions of a mitochondrion and a chloroplast'),
      n: 'In the mitochondrion, the folded inner membrane increases the surface for making energy-rich ATP, and the matrix holds many respiratory enzymes. In the chloroplast, light is trapped by the thylakoids and carbohydrate is made in the stroma.',
    }),
    sl('concept', 'Plastids and their types', {
      b: '**Plastids** are double-membraned organelles of plant cells and algae, classified by their pigment.',
      v: table(['Plastid', 'Pigment', 'Role and example'], [['Chloroplast', 'Chlorophyll (green) with carotenoids', 'Photosynthesis; leaf mesophyll'], ['Chromoplast', 'Carotenoids and other fat-soluble pigments', 'Yellow, orange and red colours of petals and fruits'], ['Leucoplast', 'None (colourless)', 'Stores food: amyloplast (starch), elaioplast (oils), aleuroplast (proteins)']], 'Table of the three kinds of plastid'),
      n: 'Chloroplasts are green and make food. Chromoplasts carry yellow, orange or red pigments that colour flowers and fruits. Leucoplasts are colourless stores: amyloplasts keep starch, elaioplasts keep oil and aleuroplasts keep protein.',
    }),
    sl('example', 'Worked example 1: size from a scale bar', {
      b: `In an electron micrograph, a bar of ${SCALE.barCm} centimetres stands for ${SCALE.barUm} micrometre. A mitochondrion measures ${MITO_CM} centimetres. Find its real length, and how many ribosomes, each about twenty nanometres wide, would lie end to end along it.`,
      ul: [
        `One centimetre stands for ${SCALE.barUm} ÷ ${SCALE.barCm} = ${realUm(1)} micrometre.`,
        `Real length = ${MITO_CM} × ${realUm(1)} = ${realUm(MITO_CM)} micrometres, which is ${realUm(MITO_CM) * 1000} nanometres.`,
        `Ribosomes in a row: ${realUm(MITO_CM) * 1000} ÷ 20 = ${ribosomesAcross(realUm(MITO_CM))}.`,
      ],
      v: table(['Step', 'Result'], [['Real length', `${realUm(MITO_CM)} micrometres`], ['In nanometres', String(realUm(MITO_CM) * 1000)], ['Ribosomes in a row', String(ribosomesAcross(realUm(MITO_CM)))]], 'Worked table: length 1.8 micrometres and 90 ribosomes'),
      n: 'Divide the length on the picture by the scale to find the real size, then convert to the same unit as the ribosome. A single mitochondrion could hold a line of ninety ribosomes, which shows how small ribosomes are.',
    }),
    sl('concept', 'Ribosomes and microbodies', {
      b: '**Ribosomes** have no membrane; **microbodies** are single-membrane vesicles holding enzymes.',
      v: table(['Organelle', 'Features', 'Function'], [['Ribosome (prokaryote)', '70S, made of 50S and 30S subunits', 'Protein synthesis; also in mitochondria and plastids'], ['Ribosome (eukaryote)', '80S, made of 60S and 40S subunits; rRNA and proteins', 'Protein synthesis, free or on rough ER'], ['Peroxisome', 'Contains catalase', 'Breaks down hydrogen peroxide; works with chloroplasts in photorespiration'], ['Glyoxysome', 'Found in germinating fatty seeds', 'Converts stored fat into carbohydrate']], 'Table of ribosomes and microbodies'),
      n: 'Ribosomes are the sites of protein synthesis. Eukaryotic ribosomes are larger than those of bacteria. Peroxisomes break down hydrogen peroxide, and glyoxysomes of germinating oily seeds turn fat into sugar.',
    }),
    sl('check', 'Quick check: plastids', {
      b: 'Which plastid stores oils in a seed?',
      n: 'Quick check. Which colourless plastid stores oil?',
      chk: 'plastid-mcq',
    }),
    sl('concept', 'The cytoskeleton', {
      b: 'A network of protein filaments gives shape, support and movement.',
      v: table(['Filament', 'Protein and size', 'Role'], [['Microfilament', 'Actin; thinnest, about 7 nm', 'Contraction, cell shape, streaming of cytoplasm'], ['Intermediate filament', 'Fibrous proteins such as keratin; about 10 nm', 'Strong support; holds the nucleus and cell junctions'], ['Microtubule', 'Tubulin; hollow, about 25 nm', 'Spindle, cilia, flagella and centrioles; guides vesicles']], 'Table of the three cytoskeletal filaments'),
      n: 'Three kinds of filament make the cytoskeleton. Microfilaments of actin are thinnest and help movement. Intermediate filaments are tough and give support. Microtubules of tubulin form the spindle, cilia and flagella.',
    }),
    sl('diagram', 'Cilia, flagella and centrioles', {
      b: 'A cilium or flagellum has an **axoneme** of **nine doublets and two central microtubules**; its base is a **basal body** like a **centriole**, with **nine triplets**.',
      v: V.axoneme,
      n: 'Cilia are short and numerous; flagella are long and few. Both have nine outer doublets and two single central microtubules, joined by radial spokes. The basal body and the centriole have nine triplets and no central pair.',
    }),
    sl('example', 'Worked example 2: counting microtubules', {
      b: `A ciliated cell lining the windpipe has ${CILIA_PER_CELL} cilia, each with a nine plus two axoneme on a basal body. How many microtubules are there in all the axonemes, and in all the basal bodies?`,
      ul: [
        `One axoneme: 9 doublets × 2 + 2 = ${axonemeMicrotubules} microtubules.`,
        `All axonemes: ${CILIA_PER_CELL} × ${axonemeMicrotubules} = ${cellMicrotubules}.`,
        `One basal body: 9 triplets × 3 = ${centrioleMicrotubules}. All basal bodies: ${CILIA_PER_CELL} × ${centrioleMicrotubules} = ${BASAL_TOTAL}.`,
      ],
      v: table(['Structure', 'Microtubules'], [['One axoneme', String(axonemeMicrotubules)], ['All axonemes', String(cellMicrotubules)], ['One basal body', String(centrioleMicrotubules)], ['All basal bodies', String(BASAL_TOTAL)]], `Worked table: ${cellMicrotubules} in axonemes and ${BASAL_TOTAL} in basal bodies`),
      n: 'Count a doublet as two microtubules and a triplet as three. One axoneme therefore has twenty microtubules and one basal body twenty-seven. Multiplying by the number of cilia gives the totals for the whole cell.',
    }),
    sl('check', 'Quick check: cilia', {
      b: 'How are the microtubules of a cilium arranged in cross-section?',
      n: 'Quick check. Describe the arrangement of microtubules in a cilium.',
      chk: 'cilium-mcq',
    }),
    sl('concept', 'The nucleus', {
      b: 'The nucleus, discovered by **Robert Brown**, holds the chromosomes.',
      v: table(['Part', 'Description'], [['Nuclear envelope', 'Two membranes with a perinuclear space; nuclear pores let RNA and proteins pass'], ['Nucleoplasm and chromatin', 'Chromatin is DNA with histones; euchromatin is loose and active, heterochromatin is dense and inactive'], ['Nucleolus', 'Not membrane-bound; makes rRNA and assembles ribosome subunits; large in cells that make much protein']], 'Table of the parts of the nucleus'),
      n: 'The nucleus is wrapped in a double envelope with pores for traffic. Inside, chromatin is the thread-like form of chromosomes. The nucleolus is not enclosed by a membrane and is the site where ribosomal RNA is made and ribosomes are assembled.',
    }),
    sl('diagram', 'Types of chromosome', {
      b: 'Chromosomes are classed by the position of the **centromere**, which bears the **kinetochores**. A **secondary constriction** may cut off a **satellite**.',
      v: V.chromosomes,
      n: 'In a metacentric chromosome the centromere is in the middle. A submetacentric one has it a little off centre. An acrocentric one has it near one end, and a telocentric one has it at the very end. A satellite lies beyond a secondary constriction.',
    }),
    sl('example', 'Worked example 3: classifying chromosomes', {
      b: 'Four chromosomes of the same total length of twenty micrometres have the arm lengths below. Name the type of each.',
      ul: CHR.map((c) => `${c.name === 'telocentric' ? 'Arms 0 + 20' : `Arms ${m(c)}`}: the short arm is ${shortShare(c)} percent of the length, so the chromosome is ${kind(c.total, c.short)}.`),
      v: table(['Short + long arm', 'Short arm as share of length', 'Type'], CHR.map((c) => [m(c), `${shortShare(c)} percent`, kind(c.total, c.short)]), 'Worked table: metacentric, submetacentric, acrocentric and telocentric examples'),
      n: 'Compare the short arm with the whole chromosome. Near half the length means the centromere is central. A short arm well under half but still substantial means submetacentric. A very short arm means acrocentric, and no short arm means telocentric.',
    }),
    sl('check', 'Quick check: chromosome types', {
      b: 'A chromosome has its centromere at the extreme end. What is it called?',
      n: 'Quick check. Name the chromosome whose centromere is terminal.',
      chk: 'chromtype-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Mitochondria (cristae, matrix) and chloroplasts (grana, stroma) are double-membraned, with their own DNA and 70S ribosomes.',
        'Plastids: chloroplast, chromoplast, leucoplast (amyloplast, elaioplast, aleuroplast).',
        'Ribosomes: 70S and 80S. Microbodies: peroxisomes and glyoxysomes.',
        'Cytoskeleton: microfilaments, intermediate filaments, microtubules. Cilium: nine plus two; centriole: nine triplets.',
        'Nucleus: envelope, chromatin, nucleolus. Chromosomes: metacentric, submetacentric, acrocentric, telocentric; satellite.',
      ],
      v: table(['Structure', 'Key point'], [['Cilium', 'Nine doublets and two single microtubules'], ['Centriole', 'Nine triplets'], ['Nucleolus', 'Makes rRNA']], 'Summary table of key points'),
      n: 'To recap: energy organelles have double membranes and their own DNA, plastids differ by pigment, filaments form the cytoskeleton, cilia show a nine plus two pattern, and chromosomes are classed by the centromere position.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw a **mitochondrion** and a **chloroplast** with at least four labels each.',
        'Distinguish **chloroplast, chromoplast and leucoplast** by pigment and role.',
        'Write the **nine plus two** arrangement for a cilium and **nine triplets** for a centriole.',
        'Name the four **chromosome types** with the centromere position of each.',
      ],
      n: 'Exam tips. Draw and label a mitochondrion and a chloroplast. Separate the three plastids by pigment and role. Write the arrangement of microtubules in a cilium and in a centriole. And name the four chromosome types.',
    }),
  ],
});
void armRatio;
void CROSS;
