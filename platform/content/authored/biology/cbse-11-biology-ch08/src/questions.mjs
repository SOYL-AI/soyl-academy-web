// ch08 Cell: The Unit of Life — question bank. AR keys: a c b d.
import { mk, add, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { pct, share, ratio, actualUm, axonemeMT, centrioleMT, dnaPerChromosomeCm, SIZE } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 cell theory; prokaryotic and eukaryotic cells
add('virchow-mcq', mcq({
  stem: 'Schleiden and Schwann’s cell theory did not explain how new cells form. Who supplied this missing idea, and what was it?',
  right: 'Rudolf Virchow: all cells arise from pre-existing cells',
  wrong: ['Robert Brown: every cell has a nucleus', 'Anton von Leeuwenhoek: cells can be seen alive', 'Theodore Schwann: plant cells have a cell wall'],
  sol: 'Virchow (1855) explained that cells divide and new cells form from pre-existing cells, omnis cellula e cellula — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('schwann-mcq', mcq({
  stem: 'From his study of animal cells, Theodore Schwann reported that',
  right: 'cells have a thin outer layer, now called the plasma membrane, and the cell wall is a feature of plant cells',
  wrong: ['all cells arise from pre-existing cells', 'the nucleus is the control centre of the cell', 'ribosomes are the sites of protein synthesis'],
  sol: 'Schwann (1839) reported the thin outer layer of animal cells and concluded that the cell wall is unique to plant cells — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('smallest-mcq', mcq({
  stem: 'The smallest cells known, only about 0.3 µm in length, belong to',
  right: 'Mycoplasma',
  wrong: ['typical bacteria', 'human red blood cells', 'yeast'],
  sol: 'Mycoplasma cells are about 0.3 µm long; bacteria are 3–5 µm and human red cells about 7 µm — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('plasmid-mcq', mcq({
  stem: 'A bacterium survives an antibiotic that kills its neighbours, and it can pass this resistance to other bacteria. The resistance gene is most likely on',
  right: 'a plasmid, a small circular DNA outside the genomic DNA',
  wrong: ['the nuclear envelope', 'a mesosome', 'the glycocalyx'],
  sol: 'Plasmids give bacteria characters such as antibiotic resistance — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('mesosome-mcq', mcq({
  stem: 'Which of these is NOT a function of the mesosome of a bacterium?',
  right: 'Trapping light in stacked grana',
  wrong: ['Helping in cell wall formation', 'Helping in DNA replication and its distribution to daughter cells', 'Increasing the surface area and enzyme content of the plasma membrane'],
  sol: 'Mesosomes help in wall formation, DNA replication and distribution, respiration and secretion, and enlarge the membrane surface; bacteria have no grana — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('fimbriae-mcq', mcq({
  stem: 'Bacteria in a fast mountain stream stay attached to the rocks instead of being washed away. Which surface structures help them?',
  right: 'Fimbriae',
  wrong: ['Flagella', 'Mesosomes', 'Gas vacuoles'],
  sol: 'Fimbriae, small bristle-like fibres, help some bacteria attach to rocks in streams and to host tissues — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ribo70-mcq', mcq({
  stem: 'A prokaryotic ribosome is formed of',
  right: 'a 50S and a 30S subunit, making a 70S ribosome',
  wrong: ['a 60S and a 40S subunit, making an 80S ribosome', 'a 50S and a 30S subunit, making an 80S ribosome', 'a single 70S unit with no subunits'],
  sol: 'Prokaryotic ribosomes are 70S, with 50S and 30S subunits — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('inclusion-mcq', mcq({
  stem: 'A cyanobacterium stores phosphate granules, cyanophycean granules and glycogen granules free in its cytoplasm. These are',
  right: 'inclusion bodies, not bounded by any membrane',
  wrong: ['membrane-bound organelles', 'plasmids', 'mesosomes'],
  sol: 'Reserve materials stored free in the cytoplasm of prokaryotes are inclusion bodies — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('prokid-mcq', mcq({
  stem: 'A cell has a cell wall, ribosomes and a circular DNA lying free in the cytoplasm, but no nuclear envelope, mitochondria or Golgi apparatus. It is most likely',
  right: 'a bacterium',
  wrong: ['a leaf mesophyll cell', 'a fungal cell', 'a cheek cell'],
  sol: 'No nuclear envelope and no membrane-bound organelles mark a prokaryote — option (@K).',
  d: 2, c: 'analysis', t: [1],
}));
add('animalcell-mcq', mcq({
  stem: 'An unknown eukaryotic cell has centrioles but no cell wall, no plastids and no large central vacuole. It is most likely',
  right: 'an animal cell',
  wrong: ['a plant cell', 'a bacterial cell', 'a cyanobacterial cell'],
  sol: 'Animal cells have centrioles and lack the wall, plastids and large central vacuole of plant cells — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('myco-ar', ar({
  a: 'Mycoplasma keeps a fixed shape because it has a rigid cell wall.',
  r: 'Mycoplasma is a prokaryote.',
  key: 'd',
  sol: 'A is false: Mycoplasma is the prokaryote without a cell wall; R is true — option (d).',
  d: 2, c: 'application', t: [1],
}));
add('polysome-fill', fill({
  stem: 'Several ribosomes attached to a single mRNA form a chain called a polyribosome or ______.',
  acc: [['polysome']],
  sol: 'Polysome.',
  d: 1, c: 'recall', t: [1],
}));
{
  const v = ratio(SIZE.rbc, SIZE.mycoplasma);
  add('rbcmyco-num', num({
    stem: `A human red blood cell is about ${SIZE.rbc} µm across, and a Mycoplasma cell about ${SIZE.mycoplasma} µm. How many times wider is the red blood cell? (One decimal place.)`,
    value: v, tol: 0.05,
    sol: r`$\dfrac{${SIZE.rbc}}{${SIZE.mycoplasma}} \approx ${v}$ times.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 23.3 || 'value');
}
add('celltheory-short', short({
  marks: 2,
  stem: 'State the modern cell theory and name the scientist whose idea completed it.',
  model: 'The cell theory states that (i) **all living organisms are composed of cells and products of cells**, and (ii) **all cells arise from pre-existing cells**. Schleiden and Schwann proposed the first part; **Rudolf Virchow** (1855) added the second.',
  sol: 'Two statements and Virchow.',
  scheme: [['Two statements', 1], ['Virchow added cells from pre-existing cells', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('envelope-short', short({
  marks: 2,
  stem: 'Name the three layers of the bacterial cell envelope, and distinguish a slime layer from a capsule.',
  model: 'From outside inwards the envelope has the **glycocalyx**, the **cell wall** and the **plasma membrane**, acting together as one protective unit. A **slime layer** is a **loose sheath** of glycocalyx; a **capsule** is a **thick and tough** glycocalyx.',
  sol: 'Three layers; slime layer vs capsule.',
  scheme: [['Three layers in order', 1], ['Slime layer loose; capsule thick and tough', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('prokeuk-short', short({
  marks: 3,
  stem: 'Give three differences between prokaryotic and eukaryotic cells.',
  model: '1. **Nucleus:** prokaryotes have **no nuclear envelope**; the genetic material is naked. Eukaryotes have an organised nucleus with a **nuclear envelope**.\n2. **Organelles:** prokaryotes have **no membrane-bound organelles** (only ribosomes); eukaryotes have ER, Golgi, mitochondria and others.\n3. **Ribosomes:** prokaryotes have **70S** ribosomes; eukaryotic cytoplasm has **80S** ribosomes. Prokaryotes are also generally **smaller** and multiply faster.',
  sol: 'Nucleus, organelles, ribosomes.',
  scheme: [['Nuclear envelope', 1], ['Membrane-bound organelles', 1], ['70S vs 80S or size', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('plantanimal-short', short({
  marks: 3,
  stem: 'Two eukaryotic cells are seen under a microscope: cell X has a thick rigid boundary outside its membrane and a large central vacuole, and cell Y has neither. Identify them and give three structural differences that support your answer.',
  model: '**X is a plant cell** and **Y is an animal cell**.\n1. Plant cells have a **cell wall** outside the plasma membrane; animal cells do not.\n2. Plant cells have **plastids** such as chloroplasts; animal cells lack them.\n3. Plant cells have a **large central vacuole**, while animal cells have small or no vacuoles; animal cells have **centrioles**, absent in almost all plant cells.',
  sol: 'Plant X, animal Y; wall, plastids, vacuole and centrioles.',
  scheme: [['Identifies X and Y', 1], ['Wall and plastids', 1], ['Vacuole and centrioles', 1]],
  d: 2, c: 'application', t: [1],
}));
add('prokaryote-long', long({
  stem: 'Describe the structure of a typical prokaryotic cell, including its cell envelope, membrane extensions, surface structures, genetic material, ribosomes and inclusion bodies.',
  model: '**Prokaryotic cells** (bacteria, blue-green algae, mycoplasma and PPLO) are generally smaller than eukaryotic cells and multiply faster. Bacteria may be rods (bacillus), spheres (coccus), commas (vibrio) or spirals (spirillum).\n\n**Cell envelope.** Most have a chemically complex envelope of three tightly bound layers: an outer **glycocalyx** (a loose **slime layer** or a thick, tough **capsule**), a **cell wall** that fixes the shape and prevents bursting or collapse, and a selectively permeable **plasma membrane**. Differences in the envelope underlie the **Gram-positive** and **Gram-negative** reaction. Mycoplasma has no wall.\n\n**Membrane extensions.** The **mesosome**, an infolding of the plasma membrane as vesicles, tubules and lamellae, helps in wall formation, DNA replication and distribution, respiration and secretion, and increases membrane area. Cyanobacteria have pigment-containing **chromatophores**.\n\n**Surface structures.** Motile bacteria have **flagella**, each with a filament, hook and basal body. **Pili** are tubular protein structures, and **fimbriae** are bristle-like fibres that help attachment; neither aids motility.\n\n**Genetic material.** There is no nuclear envelope; the genomic DNA, a single circular chromosome, lies naked. Small circular **plasmids** carry genes such as antibiotic resistance.\n\n**Ribosomes and inclusions.** **70S ribosomes** (50S + 30S), about 15 nm by 20 nm, are associated with the membrane and may form **polysomes** on an mRNA. **Inclusion bodies**, free of membranes, store phosphate, cyanophycean and glycogen granules; some photosynthetic bacteria have **gas vacuoles**.',
  sol: 'Envelope, mesosome, appendages, DNA, ribosomes, inclusions.',
  scheme: [['Envelope layers, slime layer and capsule', 1.5], ['Mesosome and chromatophores', 1], ['Flagella, pili, fimbriae', 1], ['Nucleoid and plasmids', 0.5], ['70S ribosomes, polysomes, inclusion bodies', 1]],
  wl: [80, 300],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 cell membrane and cell wall
add('lipids-mcq', mcq({
  stem: 'In the lipid bilayer of the plasma membrane, the lipid molecules are arranged with',
  right: 'polar heads towards the outer sides and hydrophobic tails towards the inner part',
  wrong: ['hydrophobic tails towards both outer surfaces', 'polar heads all towards the cytoplasm only', 'tails and heads mixed at random'],
  sol: 'The non-polar tails are protected from the aqueous surroundings inside the bilayer — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('fluidity-mcq', mcq({
  stem: 'Which group of processes depends on the fluid nature of the plasma membrane?',
  right: 'Cell growth, formation of intercellular junctions, secretion, endocytosis and cell division',
  wrong: ['Replication of DNA in the nucleus only', 'Absorption of light by chlorophyll only', 'Synthesis of rRNA in the nucleolus only'],
  sol: 'Membrane fluidity is needed for growth, junctions, secretion, endocytosis and division — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('osmosis-mcq', mcq({
  stem: 'Red blood cells placed in distilled water swell and burst. Which process causes this?',
  right: 'Osmosis: water moves into the cells across the membrane',
  wrong: ['Active transport of salts out of the cells', 'Movement of membrane proteins to one side', 'Digestion of the membrane by lysosomes'],
  sol: 'Water diffuses into the cells by osmosis, down its own concentration gradient — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('active-mcq', mcq({
  stem: 'A cell keeps pumping sodium ions out although their concentration is already higher outside. This movement',
  right: 'is active transport that uses energy from ATP',
  wrong: ['is simple diffusion and needs no energy', 'is osmosis of sodium ions', 'happens only through the lipid tails without proteins'],
  sol: 'Moving ions against the concentration gradient requires ATP, as in the sodium–potassium pump — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('polar-mcq', mcq({
  stem: 'Why do polar molecules need a carrier protein to cross the plasma membrane?',
  right: 'They cannot pass through the non-polar lipid bilayer',
  wrong: ['They are always larger than the membrane', 'They move only against the gradient', 'They dissolve the lipid tails'],
  sol: 'The hydrophobic interior of the bilayer blocks polar molecules, so they need carriers — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('lamella-mcq', mcq({
  stem: 'Neighbouring plant cells are held together by the middle lamella, which is made mainly of',
  right: 'calcium pectate',
  wrong: ['cellulose', 'chitin', 'phospholipids'],
  sol: 'The middle lamella is a layer mainly of calcium pectate — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('wallalgae-mcq', mcq({
  stem: 'Which set of substances makes up the cell walls of algae?',
  right: 'Cellulose, galactans, mannans and minerals such as calcium carbonate',
  wrong: ['Peptidoglycan only', 'Chitin and lignin only', 'Phospholipids and cholesterol'],
  sol: 'Algal walls contain cellulose, galactans, mannans and calcium carbonate; other plants have cellulose, hemicellulose, pectins and proteins — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('plasmodesmata-mcq', mcq({
  stem: 'A plant virus moves from one leaf cell to the next without ever passing into the space outside the cells. Which structures could it use?',
  right: 'Plasmodesmata, which connect the cytoplasm of neighbouring cells',
  wrong: ['The middle lamella', 'The tonoplast', 'Nuclear pores'],
  sol: 'Plasmodesmata cross the wall and middle lamella and connect neighbouring cytoplasms — option (@K).',
  d: 3, c: 'application', t: [2],
}));
{
  const v = share(8, 40, 1);
  add('lipid-num', num({
    stem: 'The membrane of a human red blood cell is about 40 percent lipid by mass. What mass of lipid would be present in 8 mg of such membrane?',
    value: v, unit: 'mg',
    sol: r`$8 \times \dfrac{40}{100} = ${v}$ mg.`,
    scheme: [[`${v} mg`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 3.2 || 'value');
}
add('wallfn-short', short({
  marks: 2,
  stem: 'State four functions of the plant cell wall.',
  model: 'The cell wall is a **non-living rigid** layer that (i) **gives shape** to the cell, (ii) **protects** it from **mechanical damage and infection**, (iii) helps in **cell-to-cell interaction**, and (iv) acts as a **barrier to undesirable macromolecules**.',
  sol: 'Four functions.',
  scheme: [['Two functions', 1], ['Two more functions', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('fluidmosaic-short', short({
  marks: 3,
  stem: 'Describe the fluid mosaic model of the plasma membrane.',
  model: 'Proposed by **Singer and Nicolson (1972)**, the model describes the membrane as a **lipid bilayer**, mainly of **phosphoglycerides**, with **polar heads** facing outwards and **hydrophobic tails** inwards. **Proteins** are a mosaic within it: **integral proteins** are partly or totally buried, and **peripheral proteins** lie on the surface; carbohydrates are also present. The lipid is **quasi-fluid**, so **proteins can move laterally**; this fluidity is needed for growth, junctions, secretion, endocytosis and division.',
  sol: 'Bilayer, proteins, fluidity.',
  scheme: [['Bilayer with heads and tails', 1], ['Integral and peripheral proteins', 1], ['Quasi-fluid; lateral movement; importance', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('transport-short', short({
  marks: 3,
  stem: 'Classify each movement as simple diffusion, osmosis or active transport, with a reason: (i) oxygen entering a cell where its concentration is low; (ii) water entering a root hair cell with a concentrated sap; (iii) a plant cell taking up ions into its vacuole against their gradient.',
  model: '(i) **Simple diffusion**: oxygen moves **down its concentration gradient** without energy (passive).\n\n(ii) **Osmosis**: **water** moves across the membrane towards the more concentrated sap, also passively.\n\n(iii) **Active transport**: ions move **against the concentration gradient**, which needs energy from **ATP**; the tonoplast carries out such transport.',
  sol: 'Diffusion, osmosis, active transport.',
  scheme: [['(i) diffusion with reason', 1], ['(ii) osmosis with reason', 1], ['(iii) active with reason', 1]],
  d: 2, c: 'application', t: [2],
}));
add('membrane-long', long({
  stem: 'Describe the structure of the plasma membrane according to the fluid mosaic model and explain how substances move across it. Add a short account of the plant cell wall.',
  model: '**Composition.** Chemical studies, especially on human red blood cells, showed that the membrane is mainly **lipid and protein**, with some carbohydrate; the red cell membrane has about **52 percent protein and 40 percent lipid**. The lipids, mainly **phosphoglycerides**, form a **bilayer**, with **polar heads** towards the outer sides and **hydrophobic tails** inside.\n\n**Fluid mosaic model.** Singer and Nicolson (1972) proposed that the **quasi-fluid** lipid lets **proteins move laterally** within the bilayer. **Integral proteins** are partly or totally buried; **peripheral proteins** lie on the surface. Fluidity is important for cell growth, intercellular junctions, secretion, endocytosis and cell division.\n\n**Transport.** The membrane is **selectively permeable**. In **passive transport** substances move along the concentration gradient without energy: neutral solutes by **simple diffusion**, and water by **osmosis**. Polar molecules cannot pass the non-polar bilayer and need **carrier proteins**. In **active transport**, molecules move **against** the gradient using **ATP**, as in the **sodium–potassium pump**.\n\n**Cell wall.** Plant and fungal cells have a non-living rigid wall outside the membrane that gives shape, protects against mechanical damage and infection, aids cell-to-cell interaction and blocks undesirable macromolecules. Algal walls contain cellulose, galactans, mannans and calcium carbonate; other plants have cellulose, hemicellulose, pectins and proteins. A **primary wall** grows in young cells; a **secondary wall** forms on its inner side. The **middle lamella** of calcium pectate glues neighbours together, and **plasmodesmata** connect their cytoplasm.',
  sol: 'Model, transport, wall.',
  scheme: [['Composition and bilayer', 1], ['Fluid mosaic model and fluidity', 1.5], ['Passive and active transport', 1.5], ['Cell wall layers and plasmodesmata', 1]],
  wl: [80, 300],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 cell organelles
add('endomem-mcq', mcq({
  stem: 'Which organelle is NOT part of the endomembrane system?',
  right: 'Mitochondrion',
  wrong: ['Endoplasmic reticulum', 'Golgi complex', 'Lysosome'],
  sol: 'Mitochondria, chloroplasts and peroxisomes are excluded because their functions are not coordinated with the others — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('rer-mcq', mcq({
  stem: 'Cells of the pancreas pour out large quantities of digestive enzymes, which are proteins. Which organelle would be especially extensive in them?',
  right: 'Rough endoplasmic reticulum',
  wrong: ['Smooth endoplasmic reticulum', 'Chromoplasts', 'Contractile vacuoles'],
  sol: 'RER carries ribosomes and is abundant in cells active in protein synthesis and secretion — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ser-mcq', mcq({
  stem: 'Animal cells that make lipid-like steroid hormones are rich in',
  right: 'smooth endoplasmic reticulum',
  wrong: ['rough endoplasmic reticulum only', 'lysosomes', 'centrioles'],
  sol: 'SER is the major site of lipid synthesis, including steroidal hormones in animal cells — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('golgi-mcq', mcq({
  stem: 'Vesicles from the endoplasmic reticulum fuse with the Golgi apparatus at its',
  right: 'cis (forming) face, and the packaged materials leave from the trans (maturing) face',
  wrong: ['trans face, and leave from the cis face', 'nucleus-facing pores', 'cristae'],
  sol: 'ER vesicles fuse with the convex cis face; products move towards and leave from the concave trans face — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('tonoplast-mcq', mcq({
  stem: 'Why is the concentration of ions in the vacuole of a plant cell much higher than in the cytoplasm?',
  right: 'The tonoplast transports ions into the vacuole against their concentration gradient',
  wrong: ['Ions diffuse into the vacuole down their gradient', 'The vacuole has no membrane around it', 'The cell wall pumps ions into the vacuole'],
  sol: 'The tonoplast actively moves ions into the vacuole, so their concentration builds up — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('contractile-mcq', mcq({
  stem: 'An Amoeba living in pond water keeps gaining water by osmosis but does not burst. Which structure prevents this?',
  right: 'The contractile vacuole',
  wrong: ['A food vacuole', 'A lysosome', 'The Golgi apparatus'],
  sol: 'The contractile vacuole carries out osmoregulation and excretion in Amoeba — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cristae-mcq', mcq({
  stem: 'The infoldings of the inner membrane of a mitochondrion, which increase its surface area, are called',
  right: 'cristae',
  wrong: ['thylakoids', 'cisternae', 'grana'],
  sol: 'Cristae are the infoldings of the inner mitochondrial membrane — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('flightmito-mcq', mcq({
  stem: 'The flight muscle cells of a pigeon contain far more mitochondria than its fat-storing cells. The best explanation is that flight muscle',
  right: 'needs much more ATP, made by aerobic respiration in mitochondria',
  wrong: ['stores more fat in its mitochondria', 'makes proteins only in mitochondria', 'needs mitochondria to make cell walls'],
  sol: 'The number of mitochondria depends on the cell’s physiological activity; active cells need more ATP — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('amyloplast-mcq', mcq({
  stem: 'The cells of a potato tuber are packed with starch grains. These are stored in',
  right: 'amyloplasts',
  wrong: ['elaioplasts', 'aleuroplasts', 'chromoplasts'],
  sol: 'Amyloplasts are leucoplasts that store carbohydrates such as starch — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('chromoplast-mcq', mcq({
  stem: 'The orange colour of a carrot root comes from fat-soluble pigments in',
  right: 'chromoplasts containing carotenoids such as carotene',
  wrong: ['chloroplasts containing chlorophyll', 'leucoplasts storing proteins', 'mitochondria'],
  sol: 'Chromoplasts hold carotenoid pigments that give yellow, orange or red colours — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('stroma-mcq', mcq({
  stem: 'In a chloroplast, the enzymes needed to make carbohydrates and proteins are found in the',
  right: 'stroma',
  wrong: ['outer membrane', 'thylakoid membrane', 'space between the two envelope membranes'],
  sol: 'The stroma holds the enzymes for carbohydrate and protein synthesis, with DNA and ribosomes — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('axoneme-mcq', mcq({
  stem: 'A cross-section of a cilium shows its axoneme. What arrangement of microtubules would you see?',
  right: 'Nine peripheral doublets and a central pair (9 + 2)',
  wrong: ['Nine peripheral triplets and no central pair', 'Nine peripheral doublets and no central pair', 'Two peripheral doublets and nine central microtubules'],
  sol: 'The axoneme has the 9 + 2 array — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('pores-mcq', mcq({
  stem: 'Messenger RNA made in the nucleus must reach ribosomes in the cytoplasm. Through which structures does it pass?',
  right: 'Nuclear pores',
  wrong: ['The perinuclear space', 'The nucleolus', 'Plasmodesmata'],
  sol: 'Nuclear pores, formed where the two envelope membranes fuse, allow RNA and proteins to move in both directions — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('nucleolus-mcq', mcq({
  stem: 'Two cells are compared: cell P makes large amounts of protein, cell Q makes very little. Which observation is most likely?',
  right: 'P has larger and more numerous nucleoli, since nucleoli are sites of ribosomal RNA synthesis',
  wrong: ['Q has larger nucleoli, since it stores protein there', 'Neither has nucleoli, since they appear only in dividing cells', 'Both have identical nucleoli, since all cells have the same number'],
  sol: 'More rRNA is needed for more ribosomes, so protein-making cells have larger, more numerous nucleoli — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('mito-ar', ar({
  a: 'Mitochondria are called the power houses of the cell.',
  r: 'Mitochondria are the sites of aerobic respiration and produce cellular energy in the form of ATP.',
  key: 'a',
  sol: 'Both are true, and ATP production by aerobic respiration is why they are called power houses — option (a).',
  d: 1, c: 'understanding', t: [3],
}));
add('ribosome-ar', ar({
  a: 'Ribosomes are found in both prokaryotic and eukaryotic cells.',
  r: 'Ribosomes are surrounded by a single membrane.',
  key: 'c',
  sol: 'A is true; R is false, because ribosomes are made of RNA and protein and have no membrane — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('lyso-ar', ar({
  a: 'Lysosomes can digest carbohydrates, proteins, lipids and nucleic acids.',
  r: 'Lysosomes are formed by the process of packaging in the Golgi apparatus.',
  key: 'b',
  sol: 'Both are true, but the digestive range comes from their hydrolytic enzymes (lipases, proteases, carbohydrases) active at acidic pH, not from how they form — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('nonucleus-tf', tf({
  stem: 'The mature red blood cells of many mammals and the sieve tube cells of vascular plants have no nucleus.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('svedberg-tf', tf({
  stem: 'Because S values add up, a 50S and a 30S subunit join to form an 80S ribosome.',
  key: 'f',
  sol: 'False. S (Svedberg unit) is a sedimentation coefficient, not a simple sum; 50S and 30S form a 70S ribosome, and 60S and 40S form an 80S ribosome.',
  d: 2, c: 'understanding', t: [3],
}));
add('chlamy-tf', tf({
  stem: 'A cell of the green alga Chlamydomonas has a single chloroplast, while a leaf mesophyll cell may have 20 to 40.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('tonoplast-fill', fill({
  stem: 'The single membrane that bounds the vacuole of a plant cell is called the ______.',
  acc: [['tonoplast']],
  sol: 'Tonoplast.',
  d: 1, c: 'recall', t: [3],
}));
add('brown-fill', fill({
  stem: 'The nucleus was first described by Robert ______ in 1831.',
  acc: [['Brown']],
  sol: 'Robert Brown.',
  d: 1, c: 'recall', t: [3],
}));
add('plastid-match', match({
  stem: 'Match each plastid (column I) with what it holds or stores (column II).',
  pairs: [
    ['Amyloplast', 'Starch'],
    ['Elaioplast', 'Oils and fats'],
    ['Aleuroplast', 'Proteins'],
    ['Chromoplast', 'Carotenoid pigments'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Amyloplasts store starch, elaioplasts oils and fats, aleuroplasts proteins; chromoplasts hold carotenoids.',
  d: 1, c: 'recall', t: [3],
}));
{
  const v = actualUm(12, 6000);
  add('mitosize-num', num({
    stem: 'In an electron micrograph at a magnification of 6000, a mitochondrion measures 12 mm in length. What is its real length in micrometres? (1 mm = 1000 µm)',
    value: v, unit: 'µm',
    sol: r`$\dfrac{12 \times 1000}{6000} = ${v}$ µm, within the usual 1.0–4.1 µm length of mitochondria.`,
    scheme: [[`${v} µm`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 2 || 'value');
}
{
  const v = axonemeMT();
  add('axonemecount-num', num({
    stem: 'How many microtubules are there in all in the axoneme of a flagellum with the usual 9 + 2 arrangement?',
    value: v,
    sol: r`Nine doublets and a central pair: $9 \times 2 + 2 = ${v}$ microtubules.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 20 || 'value');
}
{
  const v = 2 * centrioleMT();
  add('centrosome-num', num({
    stem: 'A centrosome contains two centrioles, each with nine peripheral triplet fibrils of tubulin. How many microtubules do the two centrioles contain together?',
    value: v,
    sol: r`Each centriole: $9 \times 3 = 27$; two centrioles: $2 \times 27 = ${v}$ microtubules.`,
    scheme: [[`${v}`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 54 || 'value');
}
{
  const v = dnaPerChromosomeCm(2, 46);
  add('dna-num', num({
    stem: 'A single human cell has about 2 metres of DNA distributed among its 46 chromosomes. What is the average length of DNA per chromosome, in centimetres? (One decimal place.)',
    value: v, tol: 0.05, unit: 'cm',
    sol: r`$\dfrac{2 \times 100}{46} = \dfrac{200}{46} \approx ${v}$ cm.`,
    scheme: [[`${v} cm`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 4.3 || 'value');
}
add('erkind-short', short({
  marks: 2,
  stem: 'Cell A secretes a protein hormone, while cell B makes a steroid hormone. Which type of endoplasmic reticulum would dominate in each, and why?',
  model: 'Cell **A** would have extensive **rough ER**, whose attached **ribosomes** make proteins for secretion. Cell **B** would have extensive **smooth ER**, the major site of **lipid synthesis**, where **steroidal hormones** are made in animal cells.',
  sol: 'RER for proteins; SER for steroids.',
  scheme: [['A: RER with reason', 1], ['B: SER with reason', 1]],
  d: 2, c: 'application', t: [3],
}));
add('plastidclass-short', short({
  marks: 2,
  stem: 'Name the plastid you would expect in (i) the green mesophyll of a leaf, (ii) the oily endosperm of a castor seed, (iii) a red chilli fruit and (iv) a potato tuber.',
  model: '(i) **Chloroplasts**, with chlorophyll and carotenoids for trapping light. (ii) **Elaioplasts**, storing **oils and fats**. (iii) **Chromoplasts**, with **carotenoid** pigments giving the red colour. (iv) **Amyloplasts**, storing **starch**.',
  sol: 'Chloroplast, elaioplast, chromoplast, amyloplast.',
  scheme: [['(i) and (ii)', 1], ['(iii) and (iv)', 1]],
  d: 2, c: 'application', t: [3],
}));
add('centrosome-short', short({
  marks: 2,
  stem: 'Describe the structure of a centriole and state two of its roles.',
  model: 'A centrosome has **two centrioles at right angles**, in pericentriolar material. Each has a **cartwheel** of **nine peripheral triplet fibrils** of tubulin joined by **radial spokes** to a central **hub**. Centrioles form the **basal bodies** of cilia and flagella and the **spindle fibres** of animal cells in division.',
  sol: 'Cartwheel; two roles.',
  scheme: [['Nine triplets, hub, spokes', 1], ['Basal bodies and spindle', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('secretion-short', short({
  marks: 3,
  stem: 'Trace the route of a digestive enzyme from its synthesis to its release from a gland cell, naming each organelle and what happens there.',
  model: '1. The enzyme is made by **ribosomes on the rough ER** and enters the **ER lumen**.\n2. It travels in **vesicles** that fuse with the **cis face** of the **Golgi apparatus**; inside the **cisternae** it is **modified** (for example by adding sugars to form glycoproteins) and **packaged**.\n3. It leaves the **trans face** in **secretory vesicles**, which fuse with the **plasma membrane** and release it outside the cell.',
  sol: 'RER → vesicles → Golgi cis → trans → secretory vesicles → membrane.',
  scheme: [['RER synthesis', 1], ['Golgi modification and packaging', 1], ['Secretory vesicles to membrane', 1]],
  d: 3, c: 'application', t: [3],
}));
add('chromtypes-short', short({
  marks: 3,
  stem: 'How are chromosomes classified by the position of the centromere? Describe each type.',
  model: 'Every chromosome has a **primary constriction**, the **centromere**, with disc-shaped **kinetochores** on its sides.\n- **Metacentric:** centromere in the **middle**, two **equal** arms.\n- **Sub-metacentric:** centromere **nearer one end**, one shorter and one longer arm.\n- **Acrocentric:** centromere **close to one end**, one extremely short and one very long arm.\n- **Telocentric:** centromere at the **tip** (terminal).',
  sol: 'Four types.',
  scheme: [['Centromere and kinetochore', 1], ['Metacentric and sub-metacentric', 1], ['Acrocentric and telocentric', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('endomem-long', long({
  stem: 'What is the endomembrane system? Describe the structure and functions of its components.',
  model: 'Many membranous organelles work in a **coordinated** way and are grouped as the **endomembrane system**: the **endoplasmic reticulum, Golgi complex, lysosomes and vacuoles**. Mitochondria, chloroplasts and peroxisomes are excluded because their functions are not coordinated with these.\n\n**Endoplasmic reticulum.** A network of tiny tubules that divides the cell into a **luminal** and an **extra-luminal** compartment. **Rough ER** bears ribosomes, is continuous with the outer nuclear membrane and is extensive in cells that make and secrete proteins. **Smooth ER** is the main site of **lipid synthesis**; in animal cells it makes **steroidal hormones**.\n\n**Golgi apparatus.** Described by Camillo Golgi (1898), it is a stack of flat, disc-shaped **cisternae** (0.5–1.0 µm across) near the nucleus, with a convex **cis (forming) face** and a concave **trans (maturing) face**. Vesicles from the ER fuse with the cis face; proteins are modified and **packaged**, and leave from the trans face for secretion or for use inside the cell. It is the main site of **glycoprotein and glycolipid** formation.\n\n**Lysosomes.** Membrane-bound vesicles formed by Golgi packaging, rich in **hydrolytic enzymes** (lipases, proteases, carbohydrases) active at **acidic pH**; they can digest carbohydrates, proteins, lipids and nucleic acids.\n\n**Vacuoles.** Membrane-bound spaces holding water, sap and excretory products, bounded by the **tonoplast**. In plants they may fill **up to 90 percent** of the cell, and the tonoplast moves ions in against their gradient. **Contractile vacuoles** of Amoeba osmoregulate; **food vacuoles** form when protists engulf food.',
  sol: 'Definition; ER, Golgi, lysosomes, vacuoles.',
  scheme: [['Definition and exclusions', 1], ['RER and SER', 1], ['Golgi structure and function', 1.5], ['Lysosomes', 0.5], ['Vacuoles', 1]],
  wl: [80, 300],
  d: 3, c: 'understanding', t: [3],
}));
add('mitochloro-long', long({
  stem: 'Compare the structure and functions of mitochondria and chloroplasts, and explain which shared features suggest that both can make some of their own proteins and multiply within the cell.',
  model: '**Mitochondria.** Sausage-shaped or cylindrical, about 0.2–1.0 µm wide and 1.0–4.1 µm long, their number depends on the cell’s activity. Each has **two membranes**: a smooth outer membrane and an inner membrane folded into **cristae**, which increase the surface area. The **matrix** inside holds enzymes of aerobic respiration, a **single circular DNA**, a few RNA molecules and **70S ribosomes**. They are the sites of **aerobic respiration** and make **ATP**, so they are called the power houses of the cell.\n\n**Chloroplasts.** Lens-shaped or oval, about 5–10 µm long and 2–4 µm wide, mainly in the mesophyll (20–40 per cell; one in Chlamydomonas). They have **two membranes**, the inner less permeable. Inside, the **stroma** holds flattened **thylakoids** stacked into **grana**, joined by **stroma lamellae**; chlorophyll lies in the thylakoids. The stroma contains enzymes for making **carbohydrates and proteins**, **circular DNA** and **70S ribosomes**. They **trap light energy** for photosynthesis.\n\n**Shared features.** Both are **double-membrane** organelles outside the endomembrane system. Both have their **own circular DNA** and **70S ribosomes**, smaller than the 80S ribosomes of the cytoplasm, plus the components for protein synthesis; so each can make some of its own proteins. Mitochondria are known to **divide by fission**. These features show that both organelles are partly independent of the nucleus in their growth and multiplication, although most of their proteins are still coded by nuclear genes.',
  sol: 'Structure, function, shared features, reasoning.',
  scheme: [['Mitochondrion: membranes, cristae, matrix, ATP', 1.5], ['Chloroplast: membranes, grana, stroma, light', 1.5], ['Shared DNA, 70S ribosomes, fission', 1], ['Reasoned conclusion', 1]],
  wl: [80, 300],
  d: 4, c: 'analysis', t: [3],
}));
add('nucleus-long', long({
  stem: 'Describe the structure of the interphase nucleus and of chromosomes.',
  model: '**Discovery.** Robert Brown described the nucleus in 1831; Flemming named the material that takes up basic dyes **chromatin**.\n\n**Nuclear envelope.** Two parallel membranes separated by a **perinuclear space** of 10–50 nm form a barrier between nucleus and cytoplasm. The **outer membrane** is continuous with the **ER** and bears ribosomes. At many places the two membranes fuse to form **nuclear pores**, through which **RNA and proteins** move in both directions.\n\n**Contents.** The **nucleoplasm** holds one or more spherical **nucleoli**, not bounded by membranes, which are sites of active **ribosomal RNA** synthesis; cells making much protein have larger, more numerous nucleoli. **Chromatin**, a loose network of nucleoprotein fibres, contains **DNA**, basic **histone** proteins, non-histone proteins and RNA. A human cell has about **two metres** of DNA in **46 chromosomes**. Usually there is one nucleus per cell, but mature mammalian red cells and sieve tube cells have none.\n\n**Chromosomes.** During division chromatin condenses into chromosomes. Each has a **primary constriction**, the **centromere**, with disc-shaped **kinetochores**. By centromere position they are **metacentric** (middle, equal arms), **sub-metacentric** (nearer one end), **acrocentric** (close to one end, one extremely short arm) and **telocentric** (terminal). Some chromosomes have a non-staining **secondary constriction** that cuts off a small **satellite**.',
  sol: 'Envelope, nucleolus, chromatin, chromosomes.',
  scheme: [['Envelope, perinuclear space, pores', 1.5], ['Nucleolus and chromatin', 1.5], ['Centromere and four types', 1.5], ['Satellite or exceptions', 0.5]],
  wl: [80, 300],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- cases
{
  const v = pct(36, 48, 0);
  add('antibiotic-case', mk.case({
    passage: 'A microbiology class spreads a rod-shaped soil bacterium on 48 small plates containing an antibiotic. After two days, colonies grow on 36 plates. Under the microscope the bacteria have a thick, tough outer coat, and when stained by Gram’s method they keep the stain. Some cells carry long whip-like threads at one end.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Bacteria that keep the stain in Gram’s method are called',
        right: 'Gram-positive',
        wrong: ['Gram-negative', 'mycoplasma', 'eukaryotic'],
        sol: 'Bacteria that take up the Gram stain are Gram-positive; the difference reflects their cell envelope — option (@K).',
        d: 1, c: 'recall', t: [1],
      })),
      part('b', num({
        stem: 'On what percentage of the plates did the bacteria survive the antibiotic?',
        value: v, unit: '%',
        sol: r`$\dfrac{36}{48} \times 100 = ${v}$ percent.`,
        scheme: [[`${v}%`, 1]],
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the thick outer coat and the whip-like threads, and give the role of each.',
        model: 'The tough outer coat is a **capsule**, a thick form of the **glycocalyx** that, with the wall and membrane, forms a protective envelope. The threads are **flagella** (filament, hook and basal body), which give the bacterium **motility**.',
        sol: 'Capsule; flagella.',
        scheme: [['Capsule and role', 1], ['Flagella and role', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Where in the bacterial cell is a gene for antibiotic resistance usually carried, and how is that DNA different from the genomic DNA?',
          model: 'It is usually on a **plasmid**, a **small circular DNA** lying **outside the genomic DNA** in the cytoplasm. The genomic DNA is a **single large circular chromosome** forming the nucleoid, with **no nuclear envelope** around it.',
          sol: 'Plasmid.',
          scheme: [['Plasmid', 1], ['Small, separate from the single genomic chromosome', 1]],
          d: 2, c: 'application', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 75 || 'value');
}
{
  const v = share(5, 52, 1);
  add('rbcmem-case', mk.case({
    passage: 'Red blood cells are often used to study the plasma membrane because they have no nucleus or internal membranes. In one study, membranes from human red cells were found to be about 52 percent protein and 40 percent lipid by mass. When a few red cells were placed in distilled water, they swelled and burst within minutes.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which model of the membrane is supported by such studies?',
        right: 'The fluid mosaic model of Singer and Nicolson',
        wrong: ['The cell theory of Schleiden and Schwann', 'The 9 + 2 model of the axoneme', 'The cartwheel model of the centriole'],
        sol: 'The fluid mosaic model (1972) describes a quasi-fluid lipid bilayer with a mosaic of proteins — option (@K).',
        d: 1, c: 'recall', t: [2],
      })),
      part('b', num({
        stem: 'What mass of protein would be present in 5 mg of this membrane?',
        value: v, unit: 'mg',
        sol: r`$5 \times \dfrac{52}{100} = ${v}$ mg.`,
        scheme: [[`${v} mg`, 1]],
        d: 1, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the red cells burst in distilled water.',
        model: 'The membrane is **selectively permeable**. Water is more concentrated outside than inside the cells, so it moves **into the cells by osmosis**. Red cells have **no cell wall** to resist the swelling, so the membrane stretches and **bursts**.',
        sol: 'Osmosis; no wall.',
        scheme: [['Water enters by osmosis', 1], ['No cell wall, so cells burst', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'How are the lipid molecules arranged in the membrane, and why must polar molecules use carrier proteins to cross it?',
          model: 'The lipids form a **bilayer** with **polar heads** facing the outer sides and **hydrophobic tails** pointing inwards. This **non-polar interior** blocks polar molecules, so they need **carrier proteins** to pass across.',
          sol: 'Bilayer; non-polar core.',
          scheme: [['Heads out, tails in', 1], ['Non-polar core needs carriers', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 2.6 || 'value');
}
{
  add('pulse-case', mk.case({
    passage: 'Cells of a mammalian pancreas were given radioactive amino acids for 3 minutes, and the label was then followed (illustrative times). At 3 minutes most of the label lay in the rough endoplasmic reticulum; at 20 minutes it was in the Golgi apparatus; at 90 minutes it was in vesicles near the plasma membrane, and soon after, labelled enzyme appeared outside the cells.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Where were the radioactive amino acids first built into protein?',
        right: 'On ribosomes attached to the rough endoplasmic reticulum',
        wrong: ['In the Golgi cisternae', 'In lysosomes', 'In the nucleolus'],
        sol: 'Proteins for secretion are made by ribosomes on the rough ER — option (@K).',
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'How many minutes passed between the label being found in the rough ER and its arrival in the vesicles near the plasma membrane?',
        value: 87, unit: 'min',
        sol: r`$90 - 3 = 87$ minutes.`,
        scheme: [['87 min', 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'What happened to the protein in the Golgi apparatus, and through which face did it leave?',
        model: 'Vesicles from the ER fused with the **cis (forming) face**; in the **cisternae** the protein was **modified** (for example into **glycoproteins**) and **packaged** into vesicles, which left from the **trans (maturing) face** towards the plasma membrane.',
        sol: 'Modification and packaging; trans face.',
        scheme: [['Modified and packaged', 1], ['Entered cis, left trans', 1]],
        d: 2, c: 'understanding', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Some Golgi vesicles were not secreted but stayed in the cell as lysosomes. What do lysosomes contain and what can they digest?',
          model: 'Lysosomes contain many **hydrolytic enzymes** — **lipases, proteases and carbohydrases** — that work best at **acidic pH**. They can digest **carbohydrates, proteins, lipids and nucleic acids**.',
          sol: 'Hydrolases at acidic pH.',
          scheme: [['Hydrolytic enzymes at acidic pH', 1], ['Four classes digested', 1]],
          d: 2, c: 'understanding', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 87 || 'value');
}
{
  const total = 25 * 30;
  add('leaf-case', mk.case({
    passage: 'A student compares cells from the green mesophyll of a leaf with cells from the white root of the same plant. A count of 25 mesophyll cells gives an average of 30 chloroplasts per cell, each lens-shaped and about 6 µm long. The root cells show no chloroplasts but contain colourless plastids packed with starch.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'In which part of a chloroplast are the chlorophyll pigments located?',
        right: 'In the thylakoid membranes',
        wrong: ['In the stroma only', 'In the outer envelope membrane', 'In the circular DNA'],
        sol: 'Chlorophyll is present in the thylakoids — option (@K).',
        d: 1, c: 'recall', t: [3],
      })),
      part('b', num({
        stem: 'How many chloroplasts are there in all in the 25 mesophyll cells counted?',
        value: total,
        sol: r`$25 \times 30 = ${total}$ chloroplasts.`,
        scheme: [[`${total}`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Describe the internal structure of a chloroplast.',
        model: 'Two membranes enclose the **stroma**. In it, flattened sacs called **thylakoids** are stacked like coins into **grana**, joined by **stroma lamellae**; each thylakoid encloses a **lumen**. The stroma holds **enzymes**, **circular DNA** and **70S ribosomes**.',
        sol: 'Stroma, thylakoids, grana, lamellae.',
        scheme: [['Membranes, stroma, thylakoids and grana', 1], ['Stroma lamellae; DNA and ribosomes', 1]],
        d: 2, c: 'understanding', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Name the colourless plastids in the root cells and say what other kinds of colourless plastid store.',
          model: 'They are **leucoplasts**, colourless plastids of varied shapes and sizes; those storing starch, as in these root cells, are **amyloplasts**. Other leucoplasts are **elaioplasts**, which store **oils and fats**, and **aleuroplasts**, which store **proteins**.',
          sol: 'Leucoplasts.',
          scheme: [['Leucoplasts, amyloplasts', 1], ['Elaioplasts and aleuroplasts', 1]],
          d: 2, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 750 || 'value');
}
