// ISC 11 Biology ch10 Cell: The Unit of Life — question bank in the ISC school-examination style.
// Every number is computed in calc.mjs. AR keys (ISC options): a b c d. Deck 'check' items: virchow-mcq, transport-mcq, golgi-mcq,
// plastid-mcq, cilium-mcq, chromtype-mcq (these are not used in the chapter tests).
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { MEMBRANE_L, CHROMOSOMES_L } from './svgs.mjs';
import { CUBES, cube, cutFactor, carrier, CARRIER, TR, ENZ, FRACTIONS, share, richest, total, SCALE2, realUm2, CILIA_B, basalTotal, axonemeMicrotubules, centrioleMicrotubules, KARYO, KARYO_TOTAL, pct, EXTRA, kind, shortShare, CHR, YEARS, round } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const memFig = svgV(MEMBRANE_L, 'Plasma membrane with parts marked A to E');
const chrFig = svgV(CHROMOSOMES_L, 'Four chromosomes marked A to D drawn to the same scale');
const [c2, c4, c8] = CUBES;
const t = (n) => TR.find((x) => x.s === n);

// ---------------------------------------------------------------- deck check items (objective)
add('virchow-mcq', mcq({
  stem: 'Which idea did Rudolf Virchow add to the cell theory of Schleiden and Schwann?',
  right: 'All new cells arise from pre-existing cells',
  wrong: ['All plants are made of cells', 'All animals are made of cells', 'The cell is bounded by a membrane'],
  sol: 'Omnis cellula-e cellula: cells come only from cells — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('transport-mcq', mcq({
  stem: 'Which statement separates active transport from facilitated diffusion?',
  right: 'Active transport moves a substance against its concentration gradient and uses ATP',
  wrong: ['Only active transport needs a protein in the membrane', 'Only facilitated diffusion is specific for the substance it moves', 'Only facilitated diffusion can move a substance across a lipid bilayer'],
  sol: 'Both use carrier proteins and both are specific; only active transport works uphill with ATP — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('golgi-mcq', mcq({
  stem: 'Which organelle modifies, sorts and packs proteins into vesicles for secretion?',
  right: 'Golgi complex',
  wrong: ['Smooth endoplasmic reticulum', 'Lysosome', 'Nucleolus'],
  sol: 'Proteins from the rough ER are finished and dispatched by the Golgi complex — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('plastid-mcq', mcq({
  stem: 'Which plastid stores oils and fats in the cells of an oil-rich seed?',
  right: 'Elaioplast',
  wrong: ['Amyloplast', 'Aleuroplast', 'Chromoplast'],
  sol: 'Elaioplasts store oils; amyloplasts store starch and aleuroplasts proteins — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('cilium-mcq', mcq({
  stem: 'In a cross-section of a cilium, the microtubules of the axoneme are arranged as',
  right: 'nine outer doublets around two central single microtubules',
  wrong: ['nine outer triplets around two central microtubules', 'nine outer doublets with no central microtubules', 'two outer doublets around nine central microtubules'],
  sol: 'The axoneme has the 9 + 2 pattern — option (@K).',
  d: 1, c: 'recall', t: [5],
}), (q) => axonemeMicrotubules === 20 || 'count');
add('chromtype-mcq', mcq({
  stem: 'A chromosome has its centromere at the extreme end. It is called',
  right: 'telocentric',
  wrong: ['acrocentric', 'submetacentric', 'metacentric'],
  sol: 'A terminal centromere makes the chromosome telocentric — option (@K).',
  d: 1, c: 'recall', t: [6],
}));

// ---------------------------------------------------------------- t01 cell theory, size, prokaryotic and eukaryotic, plant and animal
add('hooke-mcq', mcq({
  stem: 'In 1665 Robert Hooke examined a thin slice of cork under a microscope. What did he actually see?',
  right: 'Empty box-like compartments, the walls of dead cells',
  wrong: ['Living cells with streaming cytoplasm', 'A nucleus inside every compartment', 'Chains of bacteria between the cells'],
  sol: 'Cork is dead tissue; Hooke saw only the cell walls — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cubes-mcq', mcq({
  stem: `A model cell is a cube of side ${c4.side} micrometres. When it grows to a cube of side ${c8.side} micrometres, its surface area to volume ratio`,
  right: `halves, from ${c4.ratio} to ${c8.ratio}`,
  wrong: [`doubles, from ${c4.ratio} to ${c4.ratio * 2}`, `stays at ${c4.ratio}, because the shape is unchanged`, `falls to a quarter, from ${c4.ratio} to ${round(c4.ratio / 4, 3)}`],
  sol: `Surface area rises fourfold (${c4.sa} to ${c8.sa}) but volume eightfold (${c4.vol} to ${c8.vol}), so the ratio halves — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => c8.ratio * 2 === c4.ratio || 'ratio');
add('yeast-mcq', mcq({
  stem: 'A single-celled organism from a fermenting jar has a rigid wall containing chitin, a nucleus enclosed by an envelope and 80S ribosomes. It is most probably',
  right: 'a yeast',
  wrong: ['a cyanobacterium', 'a green alga', 'an Amoeba'],
  sol: 'A chitin wall with a true nucleus fits a fungus, not a bacterium, an alga (cellulose wall) or Amoeba (no wall) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('shared-mcq', mcq({
  stem: 'Which structure is present in both a bacterium and a human liver cell?',
  right: 'Ribosomes',
  wrong: ['A nuclear envelope', 'Mitochondria', 'Linear chromosomes with histones'],
  sol: 'Ribosomes occur in all cells; the other structures are eukaryotic only — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('virchow-ar', ar({
  a: 'A cell cannot arise from non-living matter in a sterilised, sealed nutrient broth.',
  r: 'According to Virchow, all cells arise from pre-existing cells.',
  key: 'a',
  sol: 'Both are true, and with no living cell present none can appear, as Virchow’s statement predicts — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('small-reason', short({
  marks: 1,
  stem: 'Give a reason: Most cells of a multicellular body are microscopic.',
  model: 'A small cell has a **large surface-to-volume ratio**, so materials enter and wastes leave quickly enough to serve all of its cytoplasm.',
  sol: 'Surface-to-volume ratio.',
  scheme: [['Large surface-to-volume ratio gives fast exchange', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('sav-num', num({
  stem: 'A cube-shaped cell has sides of 5 micrometres. Calculate its surface area to volume ratio.',
  value: cube(5).ratio, tol: 0.01, unit: null,
  sol: r`Surface area $= 6 \times 5^2 = ${cube(5).sa}$; volume $= 5^3 = ${cube(5).vol}$; ratio $= \dfrac{${cube(5).sa}}{${cube(5).vol}} = ${cube(5).ratio}$.`,
  scheme: [[`${cube(5).ratio}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 1.2 || 'value');
add('cut-num', num({
  stem: 'A cube-shaped cell of side 6 micrometres is divided into cubes of side 3 micrometres with the same total volume. By what factor does the total surface area increase?',
  value: cutFactor(6, 3), tol: 0, unit: null,
  sol: r`Number of small cubes $= \dfrac{6^3}{3^3} = ${(6 / 3) ** 3}$; their total surface $= ${(6 / 3) ** 3} \times ${cube(3).sa} = ${(6 / 3) ** 3 * cube(3).sa}$; the large cube has ${cube(6).sa}; factor $= ${cutFactor(6, 3)}$.`,
  scheme: [['Eight small cubes and their total surface', 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 2 || 'value');
add('theory-short2', short({
  marks: 2,
  stem: 'A student writes: “Virchow proposed the cell theory.” Correct her statement by naming the scientists who proposed the theory and stating what Virchow added.',
  model: 'The cell theory was proposed by **Schleiden and Schwann** (1838–1839): all plants and animals are made of **cells and their products**. **Virchow** (1855) **modified** it by stating that **new cells arise only from pre-existing cells** (*omnis cellula-e cellula*).',
  sol: 'Schleiden and Schwann; Virchow’s addition.',
  scheme: [['Proposed by Schleiden and Schwann', 1], ['Virchow: cells arise from pre-existing cells', 1]],
  d: 2, c: 'application', t: [1],
}));
add('pk-short3', short({
  marks: 3,
  stem: 'A bacterium and a yeast cell are both unicellular. Tabulate three structural differences between them, naming the type of cell each is.',
  model: 'The **bacterium** is **prokaryotic**; the **yeast** is **eukaryotic**.\n\n| Feature | Bacterium | Yeast |\n|---|---|---|\n| Nucleus | No envelope; **nucleoid** | **True nucleus** with envelope |\n| DNA | Circular, naked | Linear, with **histones** |\n| Organelles | **None** membrane-bound | Mitochondria, ER, Golgi complex |',
  sol: 'Table of three differences.',
  scheme: [['Types named', 1], ['Any two differences, 1 mark each', 2]],
  d: 2, c: 'application', t: [1],
}));
add('pa-short3', short({
  marks: 3,
  stem: 'A student sees under the microscope one cell with a cellulose wall and one without. Distinguish a plant cell from an animal cell on the basis of cell wall, vacuole and reserve food.',
  model: 'A **plant cell** has a **cellulose cell wall**, a **large central vacuole** and stores **starch**; an **animal cell** has **no wall**, only **small, temporary vacuoles** and stores **glycogen**. The plant cell also has plastids and divides by a cell plate, while the animal cell has centrioles and divides by a furrow.',
  sol: 'Wall, vacuole, reserve food.',
  scheme: [['Cell wall', 1], ['Vacuole', 1], ['Reserve food', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 cell wall, membrane, transport
add('middle-mcq', mcq({
  stem: 'A piece of soft fruit tissue is soaked in a chemical that dissolves calcium pectate, and the cells fall apart. Which layer was dissolved?',
  right: 'The middle lamella',
  wrong: ['The primary wall', 'The plasma membrane', 'The tonoplast'],
  sol: 'Calcium pectate is the cement of the middle lamella — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('mem-d-mcq', mcq({
  stem: 'In the figure of the plasma membrane, which letter marks a peripheral protein?',
  right: 'D',
  wrong: ['A', 'B', 'C'],
  sol: 'D lies on the surface without penetrating the bilayer — option (@K).',
  d: 1, c: 'recall', t: [2], assets: [memFig],
}));
add('mem-e-mcq', mcq({
  stem: 'In the same figure, the molecule marked E lies among the hydrophobic tails. Which statement about it is correct?',
  right: 'It is cholesterol, a lipid that helps to keep the membrane from becoming too fluid or too rigid.',
  wrong: ['It is a phospholipid that forms the second layer of the bilayer.', 'It is an integral protein that carries ions.', 'It is a carbohydrate chain that recognises other cells.'],
  sol: 'E is cholesterol, which regulates fluidity — option (@K).',
  d: 2, c: 'understanding', t: [2], assets: [memFig],
}));
add('diffusion-mcq', mcq({
  stem: 'A student measures the uptake of a sugar by two kinds of cell at rising outside concentrations. In cell P the uptake rises steadily without limit; in cell Q it rises and then levels off. What do the results suggest?',
  right: 'Cell P takes in the sugar by simple diffusion and cell Q by a carrier.',
  wrong: ['Cell P uses a carrier and cell Q simple diffusion.', 'Both cells use active transport.', 'Cell Q has no plasma membrane.'],
  sol: 'A limit means a finite number of carriers (facilitated diffusion); no limit means plain diffusion — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('symport-mcq', mcq({
  stem: 'A carrier in a gut cell can take in glucose only when a sodium ion binds to it at the same time and both move in the same direction. This carrier is a',
  right: 'symport',
  wrong: ['uniport', 'antiport', 'channel protein'],
  sol: 'Two substances moving together in one direction means symport — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('antiport-mcq', mcq({
  stem: 'A pump in the plasma membrane uses ATP to move sodium ions out of a cell while bringing potassium ions in. Which two terms describe it?',
  right: 'Active transport and antiport',
  wrong: ['Facilitated diffusion and uniport', 'Active transport and symport', 'Facilitated diffusion and antiport'],
  sol: 'It works against gradients with ATP and moves two ions in opposite directions — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('facil-ar', ar({
  a: 'The rate of facilitated diffusion stops rising when the outside concentration is very high.',
  r: 'Facilitated diffusion uses ATP to push molecules against a concentration gradient.',
  key: 'c',
  sol: 'The assertion is true because all carriers are occupied, but the reason is false: facilitated diffusion is passive and uses no ATP — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('wall-ar', ar({
  a: 'A plant cell kept in pure water does not burst.',
  r: 'A plant cell has a large central vacuole.',
  key: 'b',
  sol: 'Both are true, but the rigid cell wall, not the vacuole, resists the swelling — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('slide-reason', short({
  marks: 1,
  stem: 'Give a reason: Proteins can drift sideways within the plasma membrane.',
  model: 'The lipid bilayer is **quasi-fluid**, so the lipids and the proteins embedded in it can move laterally.',
  sol: 'Fluid bilayer.',
  scheme: [['Bilayer is fluid', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('transport-num', num({
  stem: r`A carrier follows $v = \dfrac{V_{\max} S}{K + S}$ with $V_{\max} = ${CARRIER.vmax}$ units a minute and $K = ${CARRIER.k}$. Find the rate at an outside concentration $S = 60$.`,
  value: carrier(60), tol: 0.1, unit: 'units per minute',
  sol: r`$v = \dfrac{${CARRIER.vmax} \times 60}{${CARRIER.k} + 60} = \dfrac{3600}{80} = ${carrier(60)}$ units per minute.`,
  scheme: [[`${carrier(60)}`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 45 || 'value');
add('active-short2', short({
  marks: 2,
  stem: 'Distinguish active transport from facilitated diffusion, giving one example of each.',
  model: '**Active transport** moves a substance **against its concentration gradient** using a carrier and **energy from ATP**; example: the **sodium–potassium pump**. **Facilitated diffusion** moves a substance **down its gradient** through a carrier or channel with **no ATP**; example: **glucose entering a red blood cell**.',
  sol: 'Gradient and ATP; two examples.',
  scheme: [['Active: against gradient, ATP, example', 1], ['Facilitated: down gradient, no ATP, example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('fmm-short3', short({
  marks: 3,
  stem: 'Explain how the fluid mosaic model accounts for (i) the selective permeability of the membrane and (ii) the ability of a cell to take in a droplet of fluid by forming a vesicle.',
  model: '(i) The **hydrophobic core** of the bilayer blocks charged and polar substances, while **proteins** (carriers and channels) let specific substances through, so the membrane is **selectively permeable**. (ii) Because the lipids and proteins are **fluid**, a patch of membrane can bend, enclose the droplet and **pinch off as a vesicle** without losing its continuity.',
  sol: 'Hydrophobic core and proteins; fluidity.',
  scheme: [['Hydrophobic core blocks polar substances', 1], ['Proteins give specificity', 1], ['Fluidity allows vesicle formation', 1]],
  d: 3, c: 'application', t: [2],
}));
add('fmm-long', mk.long({
  stem: '(a) Draw a labelled diagram of the fluid mosaic model of the plasma membrane. [2]\n(b) State who proposed the model and in which year, and name its two main kinds of molecule. [1]\n(c) Explain how the fluid nature of the membrane helps a cell. [2]',
  model: `(a) **Diagram:** a **phospholipid bilayer** with **heads outside and tails inside**; **integral proteins** spanning it and **peripheral proteins** on a surface; **cholesterol** among the tails; **carbohydrate chains** on the outer face.\n\n(b) **Singer and Nicolson**, **${YEARS.singer}**; the molecules are **lipids** (mainly phospholipids) and **proteins**.\n\n(c) Fluidity lets lipids and proteins **move laterally**, so the membrane can **form vesicles** (endocytosis and secretion), **change shape**, **grow**, **divide** with the cell and **form junctions**.`,
  sol: 'Diagram; proposers; fluidity.',
  scheme: [['(a) Bilayer with labels', 2], ['(b) Names, year, molecules', 1], ['(c) Two uses of fluidity', 2]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 endomembrane system
add('rer-mcq', mcq({
  stem: 'Plasma cells of the immune system secrete large amounts of antibody protein. Which organelle would be especially extensive in them?',
  right: 'Rough endoplasmic reticulum',
  wrong: ['Smooth endoplasmic reticulum', 'Peroxisomes', 'Centrioles'],
  sol: 'Secreted proteins are made on ribosomes of the rough ER — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ser-mcq', mcq({
  stem: 'Liver cells of a patient who has taken a sleeping drug for months show a marked increase in one organelle, which helps to detoxify the drug. This organelle is most likely the',
  right: 'smooth endoplasmic reticulum',
  wrong: ['rough endoplasmic reticulum', 'nucleolus', 'lysosome'],
  sol: 'Smooth ER enzymes detoxify drugs — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('lyso-mcq', mcq({
  stem: 'A drug raises the pH inside the lysosomes of a cell from about 5 to about 7.5. What is the most immediate effect?',
  right: 'Lysosomal enzymes work poorly, so digestion of engulfed material slows down.',
  wrong: ['Lysosomes stop receiving vesicles from the Golgi complex at once.', 'The lysosomal membrane dissolves.', 'The cell begins to make more ribosomes.'],
  sol: 'Lysosomal hydrolases are active at an acidic pH — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('lyso-reason', short({
  marks: 1,
  stem: 'Give a reason: The hydrolytic enzymes of a lysosome do not normally digest the rest of the cell.',
  model: 'The enzymes are **enclosed by a single membrane** and work best at the **acidic pH** inside the lysosome, so they are kept away from the cytoplasm.',
  sol: 'Enclosed by a membrane.',
  scheme: [['Enclosed by a membrane, acidic pH inside', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('golgi-short2', short({
  marks: 2,
  stem: 'State two functions of the Golgi complex and name the face through which material enters it.',
  model: 'The Golgi complex **modifies** proteins and lipids (for example by adding carbohydrate), then **sorts and packs** them into **vesicles** for secretion; it also **forms lysosomes**. Material enters through the **cis (forming) face**.',
  sol: 'Two functions; cis face.',
  scheme: [['Two functions', 1], ['Cis face', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('ser-short2', short({
  marks: 2,
  stem: 'State two functions of the smooth endoplasmic reticulum and say how it differs in structure from the rough type.',
  model: 'The smooth ER **makes lipids and steroid hormones** and **detoxifies drugs and poisons**. It is **tubular** and has **no ribosomes** on its surface, whereas the rough ER is made of flattened sacs studded with ribosomes.',
  sol: 'Two functions; no ribosomes.',
  scheme: [['Two functions', 1], ['Structural difference', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('secretion-short3', short({
  marks: 3,
  stem: 'A plasma cell secretes an antibody protein. Describe, in order, how the protein travels from its synthesis to its release.',
  model: 'It is made by **ribosomes on the rough ER** and enters the **ER cavity**. A **transport vesicle** carries it to the **cis face of the Golgi complex**, where it is **modified** as it passes through the cisternae. Vesicles bud from the **trans face** and fuse with the **plasma membrane**, releasing the antibody.',
  sol: 'Rough ER, vesicle, Golgi, vesicle, membrane.',
  scheme: [['Made on rough ER', 1], ['Vesicle to Golgi and modified', 1], ['Vesicle to plasma membrane', 1]],
  d: 2, c: 'application', t: [3],
}));
add('coord-short3', short({
  marks: 3,
  stem: 'Explain how lysosomes are related to the rough endoplasmic reticulum and the Golgi complex, and why these organelles are described together as a system.',
  model: 'The **lysosomal enzymes** are proteins made on the **rough ER**. They are carried in vesicles to the **Golgi complex**, which packs them into vesicles that bud off as **lysosomes**. Since each step passes material to the next by **vesicles** and their functions are **coordinated**, the ER, Golgi complex and lysosomes (and vacuoles) form one **endomembrane system**.',
  sol: 'ER to Golgi to lysosome; coordination.',
  scheme: [['Enzymes made on the rough ER', 1], ['Golgi packs them into lysosomes', 1], ['Linked by vesicles, so one system', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('endo-long', mk.long({
  stem: '(a) What is the endomembrane system? Name its four components. [1]\n(b) Describe the structure of the Golgi complex and state its role in secretion. [2]\n(c) Describe the structure and function of a lysosome. [2]',
  model: '(a) The **endomembrane system** is the group of membranous organelles whose functions are **coordinated**: the **endoplasmic reticulum**, **Golgi complex**, **lysosomes** and **vacuoles**.\n\n(b) The Golgi complex is a **stack of flattened cisternae** with a convex **cis (forming) face** that receives vesicles from the ER and a concave **trans (maturing) face**. It **modifies, sorts and packs** proteins and lipids into vesicles and sends them to the plasma membrane or to form lysosomes.\n\n(c) A lysosome is a **single-membrane vesicle** filled with **hydrolytic enzymes** (lipases, proteases and carbohydrases) that work at **acidic pH**. It **digests** food taken in and **worn-out organelles**, so it is called a “suicide bag”.',
  sol: 'Definition; Golgi; lysosome.',
  scheme: [['(a) Definition and four components', 1], ['(b) Structure with faces', 1], ['(b) Role in secretion', 1], ['(c) Structure', 1], ['(c) Function', 1]],
  wl: [60, 220],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 mitochondria, plastids, ribosomes, microbodies
add('cristae-mcq', mcq({
  stem: 'The heart muscle cells of a mouse work without rest, and their mitochondria have unusually numerous cristae. What does this feature provide?',
  right: 'A larger surface of inner membrane for the particles that make ATP',
  wrong: ['More space in the outer membrane for DNA', 'A larger matrix for ribosomes only', 'Extra pores for the entry of nuclear RNA'],
  sol: 'Cristae increase the inner membrane surface carrying the ATP-making particles — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('thylakoid-mcq', mcq({
  stem: 'A student breaks open chloroplasts and removes all the thylakoid membranes. Which activity of the chloroplast would be lost first?',
  right: 'Trapping of light energy by chlorophyll',
  wrong: ['Making carbohydrate from carbon dioxide in the stroma', 'Replication of the circular DNA', 'Synthesis of proteins on the 70S ribosomes'],
  sol: 'Chlorophyll sits in the thylakoids; the stroma enzymes and ribosomes are left behind — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('tomato-mcq', mcq({
  stem: 'A green tomato turns red as it ripens. Which change in its cells best explains the colour?',
  right: 'Chloroplasts change into chromoplasts rich in carotenoids',
  wrong: ['Leucoplasts fill with starch', 'The vacuole gains chlorophyll', 'Mitochondria lose their cristae'],
  sol: 'Ripening converts chloroplasts into chromoplasts with red carotenoid pigment — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('glyoxy-mcq', mcq({
  stem: 'In a germinating castor seed, stored fat is converted into sugar for the growing seedling. Which microbody carries out this conversion?',
  right: 'Glyoxysome',
  wrong: ['Peroxisome', 'Lysosome', 'Elaioplast'],
  sol: 'Glyoxysomes of fatty seeds change fat into carbohydrate — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('antibiotic-mcq', mcq({
  stem: 'An antibiotic stops protein synthesis on 70S ribosomes but not on 80S ribosomes. Which part of a human cell could it still affect?',
  right: 'The mitochondria, because they contain 70S ribosomes',
  wrong: ['The rough ER, because its ribosomes are 70S', 'The nucleolus, because it makes 70S subunits', 'No part, because human cells have no ribosomes'],
  sol: 'Cytoplasmic ribosomes are 80S, but mitochondrial ribosomes are 70S — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('mito-ar', ar({
  a: 'The inner membrane of a mitochondrion is thrown into folds called cristae.',
  r: 'Cristae increase the surface for the enzymes and particles of ATP formation.',
  key: 'a',
  sol: 'Both are true, and the reason explains the folding — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('crista-analogy', short({
  marks: 1,
  stem: 'Complete the analogy: Chloroplast : granum :: Mitochondrion : ______',
  model: '**Crista** (cristae).',
  sol: 'Crista.',
  scheme: [['Crista', 1]],
  wl: [1, 10],
  d: 1, c: 'recall', t: [4],
}));
add('scale-num', num({
  stem: `In a second electron micrograph a scale bar of ${SCALE2.barCm} centimetres stands for ${SCALE2.barUm} micrometre. A chloroplast measures 7.5 centimetres on the print. What is its real length in micrometres?`,
  value: realUm2(7.5), tol: 0.01, unit: 'µm',
  sol: r`$7.5 \times \dfrac{${SCALE2.barUm}}{${SCALE2.barCm}} = ${realUm2(7.5)}$ micrometres.`,
  scheme: [[`${realUm2(7.5)}`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 1.25 || 'value');
add('mito-short2', short({
  marks: 2,
  stem: 'State two structural features of a mitochondrion that suit it to producing ATP, and say how each helps.',
  model: 'The **inner membrane is folded into cristae**, which gives a **large surface** for the ATP-making particles. The **matrix contains the enzymes of respiration**, so the reactions that feed the particles take place close to them.',
  sol: 'Cristae; matrix enzymes.',
  scheme: [['Cristae and surface', 1], ['Matrix enzymes', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('plastid-short3', short({
  marks: 3,
  stem: 'Distinguish chloroplasts, chromoplasts and leucoplasts by their pigment and function.',
  model: '**Chloroplasts** contain **chlorophyll** (with carotenoids) and carry out **photosynthesis**. **Chromoplasts** contain **carotenoids** and other fat-soluble pigments and give **yellow, orange or red** colours to petals and fruits. **Leucoplasts** are **colourless** and **store food**: amyloplasts store starch, elaioplasts oils and aleuroplasts proteins.',
  sol: 'Pigment and function of each.',
  scheme: [['Chloroplast', 1], ['Chromoplast', 1], ['Leucoplast', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('micro-short3', short({
  marks: 3,
  stem: 'Compare peroxisomes and glyoxysomes in terms of the cells in which they are found, their enzymes and their function.',
  model: '**Peroxisomes** occur in **many cells**, such as leaf cells, and contain **catalase**, which **breaks down hydrogen peroxide** (and which, in leaves, works with chloroplasts and mitochondria in photorespiration). **Glyoxysomes** occur in **germinating fatty seeds**, contain enzymes of the **glyoxylate cycle**, and **convert stored fat into carbohydrate**. Both are single-membrane microbodies.',
  sol: 'Site, enzymes, function.',
  scheme: [['Peroxisome: site and function', 1], ['Glyoxysome: site and function', 1], ['Enzymes of each', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('organelle-long', mk.long({
  stem: '(a) Draw a labelled diagram of the ultrastructure of a mitochondrion. [2]\n(b) Draw a labelled diagram of a chloroplast. [2]\n(c) State one structural feature that is common to the two organelles. [1]',
  model: '(a) **Diagram:** an oval with a smooth **outer membrane**, an **inner membrane** folded into **cristae**, and the **matrix** inside; optionally circular DNA and ribosomes.\n\n(b) **Diagram:** a **double envelope** around a fluid **stroma**; **grana** (stacks of **thylakoids**) joined by **stroma lamellae**; optionally DNA and ribosomes.\n\n(c) Both are bounded by a **double membrane**, and both contain **circular DNA and 70S ribosomes** (any one).',
  sol: 'Two diagrams; common feature.',
  scheme: [['(a) Mitochondrion diagram with labels', 2], ['(b) Chloroplast diagram with labels', 2], ['(c) Common feature', 1]],
  wl: [50, 200],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 cytoskeleton, cilia, flagella, centrioles
add('actin-mcq', mcq({
  stem: 'A cell treated with a poison that breaks down its actin filaments would first lose its ability to',
  right: 'change shape and show streaming of its cytoplasm',
  wrong: ['make rRNA in the nucleolus', 'synthesise lipids on the smooth ER', 'trap light in the thylakoids'],
  sol: 'Actin microfilaments drive shape change and streaming — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('basal-mcq', mcq({
  stem: 'How many microtubules are seen in a cross-section of a basal body, in which the microtubules are in triplets?',
  right: String(centrioleMicrotubules),
  wrong: [String(axonemeMicrotubules), '18', '9'],
  sol: `Nine triplets give 9 × 3 = ${centrioleMicrotubules} microtubules — option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => centrioleMicrotubules === 27 || 'count');
add('centriole-mcq', mcq({
  stem: 'Centrioles would be absent from the dividing cells of which of these?',
  right: 'The root tip of a flowering plant',
  wrong: ['The skin of a frog', 'The gut of an earthworm', 'The bone marrow of a rat'],
  sol: 'Higher plants have no centrioles; the animal cells listed do — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('cilia-ar', ar({
  a: 'A cilium has nine peripheral triplets and a pair of central microtubules.',
  r: 'The basal body at the base of a cilium has nine doublets and two central microtubules.',
  key: 'd',
  sol: 'Both statements are false: a cilium has nine doublets (not triplets) with a central pair, and the basal body has nine triplets and no central pair — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('basal-num', num({
  stem: `A ciliated cell of a snail’s foot has ${CILIA_B} cilia. Each cilium rises from a basal body made of nine triplets of microtubules. How many microtubules are there in all the basal bodies of the cell?`,
  value: basalTotal(CILIA_B), tol: 0, unit: null,
  sol: r`$9 \times 3 = ${centrioleMicrotubules}$ per basal body; $${CILIA_B} \times ${centrioleMicrotubules} = ${basalTotal(CILIA_B)}$.`,
  scheme: [['27 per basal body', 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 4860 || 'value');
add('ifil-reason', short({
  marks: 1,
  stem: 'Give a reason: Cells of the outer layer of the skin are rich in intermediate filaments.',
  model: 'These cells face constant **stretching and rubbing**, and intermediate filaments such as **keratin** are **tough and give mechanical strength**.',
  sol: 'Mechanical strength.',
  scheme: [['Strength against stress', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('cytoskeleton-short2', short({
  marks: 2,
  stem: 'Name the three kinds of filament of the cytoskeleton in order of increasing thickness, and name the protein that forms the thinnest and the thickest.',
  model: 'In order of thickness: **microfilaments**, **intermediate filaments** and **microtubules**. The thinnest, the microfilament, is made of **actin**; the thickest, the microtubule, is made of **tubulin**.',
  sol: 'Order; actin; tubulin.',
  scheme: [['Order of the three filaments', 1], ['Actin and tubulin', 1]],
  d: 2, c: 'recall', t: [5],
}));
add('axoneme-short2', short({
  marks: 2,
  stem: 'Describe the arrangement of microtubules in a cross-section of a cilium and name the structure from which it arises.',
  model: 'A cross-section shows **nine peripheral doublet microtubules** around **two central single microtubules** (the **9 + 2** pattern), joined by **radial spokes** and enclosed by the plasma membrane. The cilium arises from a **basal body**.',
  sol: '9 + 2; basal body.',
  scheme: [['Nine doublets and two central microtubules', 1], ['Basal body', 1]],
  d: 2, c: 'recall', t: [5],
}));
add('cilflag-short3', short({
  marks: 3,
  stem: 'Differentiate cilia from flagella in three ways, and state what is common to their internal structure.',
  model: '**Cilia** are **short and numerous** and beat like oars; **flagella** are **long and few** and move in a wave-like way to push the cell. Cilia mainly **move fluid past a cell or move small cells**, whereas flagella **propel the whole cell**, as in a sperm. Both have the same **9 + 2 axoneme** and arise from a **basal body**.',
  sol: 'Length and number; movement; common structure.',
  scheme: [['Length and number', 1], ['Movement or function', 1], ['Common 9 + 2 structure', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 nucleus and chromosomes
add('nucleolus-mcq', mcq({
  stem: 'A pathologist finds that the nucleoli in the cells of a tissue are unusually large. The cells are most probably',
  right: 'making large amounts of protein, so they need many ribosomes',
  wrong: ['dormant, with condensed chromosomes', 'storing starch in amyloplasts', 'dividing by binary fission'],
  sol: 'The nucleolus makes rRNA and ribosome subunits; big nucleoli mean heavy protein synthesis — option (@K).',
  d: 3, c: 'application', t: [6],
}));
add('chromatin-mcq', mcq({
  stem: 'A stained nucleus shows dark, densely packed patches near the envelope and a lightly stained region in the centre. The lightly stained region is mainly',
  right: 'euchromatin, which is loosely packed and active in transcription',
  wrong: ['heterochromatin, which is loosely packed and inactive', 'the nucleolus, which is membrane-bound', 'the perinuclear space, which holds DNA'],
  sol: 'Light staining means loose, active euchromatin — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('chr-sat-mcq', mcq({
  stem: 'In the same figure, the small round body joined to chromosome A by a thin thread is the',
  right: 'satellite, cut off by a secondary constriction',
  wrong: ['kinetochore, found on the centromere', 'nucleolus, found inside the nucleus', 'chromatid, formed in the S phase'],
  sol: 'A knob beyond a secondary constriction is a satellite — option (@K).',
  d: 2, c: 'understanding', t: [6], assets: [chrFig],
}));
add('chr-uneq-mcq', mcq({
  stem: 'In the same figure, which pair of letters marks chromosomes with unequal arms in which the centromere is not terminal?',
  right: 'A and D',
  wrong: ['B and C', 'C and D', 'A and B'],
  sol: 'A (acrocentric) and D (submetacentric) have unequal arms with a non-terminal centromere; C has equal arms and B is terminal — option (@K).',
  d: 3, c: 'analysis', t: [6], assets: [chrFig],
}));
add('satellite-fill', fill({
  stem: 'A small segment cut off from the rest of a chromosome by a secondary constriction is called a ______.',
  acc: [['satellite', 'Satellite']],
  sol: 'Satellite.',
  d: 1, c: 'recall', t: [6],
}));
add('hetero-reason', short({
  marks: 1,
  stem: 'Give a reason: Genes lying in heterochromatin are generally not expressed.',
  model: 'Heterochromatin is **tightly packed**, so the enzymes that **transcribe** the DNA cannot reach the genes.',
  sol: 'Tight packing.',
  scheme: [['Tightly packed, not transcribed', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('arms-short2', short({
  marks: 2,
  stem: `A chromosome ${EXTRA.total} micrometres long has its centromere ${EXTRA.short} micrometres from one end. Name its type, giving a reason, and state the length of its long arm.`,
  model: `It is **acrocentric**, because the centromere lies **near one end**, leaving a very short arm (${EXTRA.short} micrometres, about ${shortShare(EXTRA)} percent of the length). The long arm is ${EXTRA.total} − ${EXTRA.short} = **${EXTRA.total - EXTRA.short} micrometres**.`,
  sol: 'Acrocentric; long arm 14.',
  scheme: [['Acrocentric with reason', 1], ['Long arm length', 1]],
  d: 2, c: 'application', t: [6],
}), () => kind(EXTRA.total, EXTRA.short) === 'acrocentric' || 'kind');
add('envelope-short3', short({
  marks: 3,
  stem: 'Describe the structure of the nuclear envelope and state the role of the nuclear pores.',
  model: 'The **nuclear envelope** is made of **two membranes** separated by a **perinuclear space**; the outer membrane is **continuous with the rough ER** and may carry ribosomes. It is perforated by **nuclear pores**, which **control the passage** of RNA, ribosome subunits and proteins between the nucleus and the cytoplasm.',
  sol: 'Two membranes; space; pores.',
  scheme: [['Two membranes and perinuclear space', 1], ['Outer membrane joined to rough ER', 1], ['Pores control traffic', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('chrtype-short3', short({
  marks: 3,
  stem: 'A cytologist sees four chromosomes of equal length. Their short arms are 9, 6, 3 and 0 micrometres on a total of 20 micrometres. Classify each and state where its centromere lies.',
  model: 'The 9 + 11 chromosome is **metacentric**, with the centromere **near the middle**. The 6 + 14 chromosome is **submetacentric**, with the centromere **a little off the middle**. The 3 + 17 chromosome is **acrocentric**, with it **near one end**, and the 0 + 20 chromosome is **telocentric**, with it at the **very end**.',
  sol: 'Four types with positions.',
  scheme: [['Metacentric', 1], ['Submetacentric and acrocentric', 1], ['Telocentric and positions', 1]],
  d: 3, c: 'application', t: [6],
}), () => CHR.map((c) => kind(c.total, c.short)).join() === 'metacentric,submetacentric,acrocentric,telocentric' || 'kinds');
add('nucleus-long', mk.long({
  stem: '(a) Draw a labelled diagram of a nucleus showing the envelope, pores, chromatin and nucleolus. [2]\n(b) Distinguish euchromatin from heterochromatin. [1]\n(c) Name the four types of chromosome by the position of the centromere. [2]',
  model: '(a) **Diagram:** a round nucleus with a **double nuclear envelope**, **nuclear pores**, **chromatin** threads in the **nucleoplasm** and a dense **nucleolus**.\n\n(b) **Euchromatin** is **loosely packed**, lightly stained and **active** in transcription; **heterochromatin** is **densely packed**, darkly stained and **inactive**.\n\n(c) **Metacentric** (centromere in the middle), **submetacentric** (a little off the middle), **acrocentric** (near one end) and **telocentric** (at the end).',
  sol: 'Diagram; chromatin; types.',
  scheme: [['(a) Labelled nucleus', 2], ['(b) Euchromatin and heterochromatin', 1], ['(c) Four types', 2]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- stimulus cases
{
  const E1 = 'Succinate dehydrogenase';
  const E2 = 'Glucose-6-phosphatase';
  const E3 = 'Acid phosphatase';
  const rows = Object.entries(ENZ).map(([n, a]) => `| ${n} | ${a.join(' | ')} |`).join('\n');
  add('frac-case', mk.case({
    passage: `A tissue from a mouse kidney was homogenised and spun at increasing speeds. Four marker enzymes were assayed in each fraction (units of activity). Succinate dehydrogenase marks mitochondria, glucose-6-phosphatase the endoplasmic reticulum, acid phosphatase lysosomes and catalase peroxisomes.\n\n| Enzyme | ${FRACTIONS.join(' | ')} |\n|---|---|---|---|---|\n${rows}`,
    d: 4, c: 'analysis',
    children: [
      part('a', num({
        stem: 'What percentage of the total activity of succinate dehydrogenase is in the heavy pellet?',
        value: share(E1, 1), tol: 0.1, unit: '%',
        sol: r`$\dfrac{${ENZ[E1][1]}}{${total(ENZ[E1])}} \times 100 = ${share(E1, 1)}$ percent.`,
        scheme: [[`${share(E1, 1)}`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('b', mcq({
        stem: 'Which fraction would you expect to contain the fragments of the endoplasmic reticulum, and why?',
        right: `The ${richest(E2).toLowerCase()}: broken pieces of ER close up into small vesicles that settle only at high speed.`,
        wrong: ['The nuclear pellet: the ER is joined to the nuclear envelope and sinks with it.', 'The supernatant: membranes dissolve in the homogenising fluid.', 'The heavy pellet: the ER is as large as a mitochondrion.'],
        sol: `Glucose-6-phosphatase is richest (${share(E2, 2)} percent) in the microsome pellet — option (@K).`,
        d: 3, c: 'analysis', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: `${share(E3, 3)} percent of the acid phosphatase is in the supernatant. Suggest a reason, and state what this shows about the lysosomes.`,
        model: 'Some **lysosomes burst** when the tissue was **homogenised**, so their enzymes were **released into the soluble fraction**. This shows that a **lysosome is a membrane-bound sac** that normally keeps its enzymes inside.',
        sol: 'Broken lysosomes.',
        scheme: [['Lysosomes broke during homogenisation', 1], ['Enzymes are normally enclosed by a membrane', 1]],
        wl: [8, 60],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'A student claims that the heavy pellet contains only mitochondria. Use the table to show that the claim is wrong.',
          model: `The heavy pellet also holds **${share(E3, 1)} percent of the acid phosphatase** (lysosomes) and **${share('Catalase', 1)} percent of the catalase** (peroxisomes), so it contains **lysosomes and peroxisomes** along with the mitochondria.`,
          sol: 'Other markers present.',
          scheme: [['Acid phosphatase or catalase present in the heavy pellet', 1], ['Conclusion: lysosomes and peroxisomes also present', 1]],
          wl: [8, 60],
          d: 3, c: 'analysis', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 84 || 'value');
}
{
  const K = KARYO;
  const rows = K.map((c) => `| ${c.no} | ${c.short} | ${c.long} |`).join('\n');
  add('karyo-case', mk.case({
    passage: `A cytologist measured the five different chromosomes in a root-tip cell of a plant (micrometres).\n\n| Chromosome | Short arm | Long arm |\n|---|---|---|\n${rows}\n\nChromosome 3 carries a small knob beyond a thin neck at the end of its short arm.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which numbered chromosome is acrocentric?',
        right: 'Chromosome 3',
        wrong: ['Chromosome 1', 'Chromosome 2', 'Chromosome 4'],
        sol: `Chromosome 3 has a short arm (${K[2].short}) that is only ${pct(K[2].short, K[2].total, 1)} percent of its length, with the centromere near one end — option (@K).`,
        d: 2, c: 'application', t: [6],
      })),
      part('b', num({
        stem: 'What is the total length of the five chromosomes?',
        value: KARYO_TOTAL, tol: 0, unit: 'µm',
        sol: r`$${K.map((c) => c.total).join(' + ')} = ${KARYO_TOTAL}$ micrometres.`,
        scheme: [[`${KARYO_TOTAL}`, 1]],
        d: 2, c: 'application', t: [6],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the knob on chromosome 3 and the thin neck that bears it.',
        model: 'The knob is a **satellite** and the thin neck is the **secondary constriction**.',
        sol: 'Satellite; secondary constriction.',
        scheme: [['Satellite', 1], ['Secondary constriction', 1]],
        wl: [8, 40],
        d: 2, c: 'recall', t: [6],
      }), [
        short({
          marks: 2,
          stem: 'Chromosome 4 has no short arm. Name its type and say where its centromere lies.',
          model: 'It is **telocentric**: the **centromere lies at the very end** of the chromosome, so there is only one arm.',
          sol: 'Telocentric.',
          scheme: [['Telocentric', 1], ['Centromere at the end', 1]],
          wl: [8, 40],
          d: 2, c: 'understanding', t: [6],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 78 || 'value');
}
