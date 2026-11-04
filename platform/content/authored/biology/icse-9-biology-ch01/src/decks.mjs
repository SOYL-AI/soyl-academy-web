// ICSE 9 Biology ch01 The Cell: A Unit of Life — Part 1 (t01–t03), Part 2 (t04–t06).
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { ANIMAL, PLANT, BACTERIUM, PLASTIDS, ORGANELLES } from './svgs.mjs';
import { CHEEK, FIELD } from './calc.mjs';

export const V = {
  animal: svgV(ANIMAL, 'A generalised animal cell with its parts labelled'),
  plant: svgV(PLANT, 'A generalised plant cell with its parts labelled'),
  bacterium: svgV(BACTERIUM, 'A bacterium, a prokaryotic cell, with its parts labelled'),
  plastids: svgV(PLASTIDS, 'Chloroplast, chromoplast and leucoplast'),
  organelles: svgV(ORGANELLES, 'Mitochondrion, rough endoplasmic reticulum and Golgi body'),
};

export const deck1 = deck({
  part: 1,
  title: 'The Cell — Part 1: Cell theory, boundaries and the nucleus and organelles',
  goals: [
    'State the main points of the cell theory and distinguish protoplasm from cytoplasm',
    'Compare the cell wall and the cell membrane',
    'State the functions of the nucleus, nucleolus, mitochondria, endoplasmic reticulum, ribosomes and Golgi bodies',
  ],
  slides: [
    sl('title', 'The Cell: A Unit of Life', {
      b: 'Part 1 — what living things are made of, how a cell is wrapped, and what works inside it.',
      v: flow('LR', [['c', 'Cell'], ['t', 'Tissue'], ['o', 'Organ'], ['s', 'Organ system'], ['b', 'Organism']], [['c', 't'], ['t', 'o'], ['o', 's'], ['s', 'b']], 'Flow from cell to tissue to organ to organ system to organism'),
      n: 'A banyan tree and a bee look nothing alike, yet both are built from the same kind of tiny unit. Cells join to make tissues, tissues make organs, and organs work together as systems. In this part we look inside one cell.',
    }),
    sl('concept', 'The cell theory', {
      v: table(['Point of the cell theory', 'What it means'], [['All organisms are made of cells', 'One cell or many cells; no living thing is without them'], ['The cell is the unit of structure and function', 'It is the smallest part that carries out the activities of life'], ['New cells come from existing cells', 'Cells divide; they do not appear from non-living matter']], 'Table of the three main points of the cell theory'),
      n: 'The cell theory has three main ideas. Every organism is made of one or more cells. The cell is the basic unit of structure and of function. And every new cell comes from a cell that already exists.',
    }),
    sl('concept', 'Protoplasm and cytoplasm', {
      v: table(['Term', 'What it includes'], [['Protoplasm', 'All the living matter of a cell: cytoplasm and nucleus together'], ['Cytoplasm', 'The jelly-like part between the cell membrane and the nucleus; holds the organelles'], ['Nucleoplasm', 'The protoplasm inside the nucleus']], 'Table distinguishing protoplasm, cytoplasm and nucleoplasm'),
      n: 'Protoplasm is the whole living content of a cell. Take out the nucleus and what is left between the nucleus and the cell membrane is the cytoplasm. So the cytoplasm is only a part of the protoplasm.',
    }),
    sl('check', 'Quick check: the living content', {
      b: 'Which term covers the cytoplasm and the nucleus together?',
      chk: 'protoplasm-mcq',
      n: 'Think of the larger whole that contains both.',
    }),
    sl('diagram', 'A generalised animal cell', {
      b: 'An animal cell has a **cell membrane**, **cytoplasm** with organelles, and a **nucleus**. There is no cell wall.',
      v: V.animal,
      n: 'Here is a typical animal cell. The membrane forms its outer boundary. Inside, the cytoplasm holds the organelles, and the nucleus sits near the middle. Notice that there is no wall outside the membrane.',
    }),
    sl('concept', 'Cell wall and cell membrane', {
      v: table(['Point', 'Cell wall', 'Cell membrane'], [['Found in', 'Plant cells (also fungi and bacteria)', 'All cells'], ['Made of', 'Cellulose in plants', 'Lipids and proteins'], ['Living or non-living', 'Non-living', 'Living'], ['Permeability', 'Freely permeable', 'Selectively permeable'], ['Function', 'Shape, support and protection', 'Controls what enters and leaves']], 'Table comparing the cell wall and the cell membrane on where found, composition, living state, permeability and function'),
      n: 'The wall lies outside the membrane in plant cells. It is non-living, made of cellulose, and lets almost everything pass. The membrane is living and selective. It decides which substances may enter or leave the cell.',
    }),
    sl('example', 'Worked example 1: which boundary?', {
      b: 'A strip of tissue is boiled and its cells stop controlling what enters them, yet the cells keep their shape. Which boundary lost its control?',
      ul: ['Step 1: ask which boundary **controls** entry and exit: the **membrane**.', 'Step 2: boiling kills the **living** membrane, so control is lost.', 'Step 3: the **wall** is non-living and freely permeable, so the shape stays.'],
      v: table(['Question', 'Answer'], [['Which boundary controls entry?', 'Cell membrane'], ['Which is damaged by boiling?', 'Living cell membrane'], ['Why is the shape kept?', 'The cellulose wall is rigid and non-living']], 'Worked table linking each question to the cell membrane or the cell wall'),
      n: 'Work through it by asking what each boundary does. Control of entry belongs to the living membrane, and heat destroys it. The wall is a non-living cellulose frame, so the cell keeps its shape.',
    }),
    sl('check', 'Quick check: the two boundaries', {
      b: 'Which statement about the cell wall is correct?',
      chk: 'wall-mcq',
      n: 'Think about whether it is living and what it lets through.',
    }),
    sl('concept', 'Nucleus and nucleolus', {
      v: table(['Part', 'Description', 'Function'], [['Nuclear membrane', 'Double membrane with pores', 'Separates the nucleus and lets materials pass'], ['Nucleoplasm and chromatin', 'Jelly with thread-like DNA', 'Chromatin carries the genes'], ['Nucleolus', 'Dense round body inside the nucleus', 'Makes ribosomes'], ['Nucleus as a whole', 'Usually one large body', 'Controls the cell and passes on heredity']], 'Table of the nuclear membrane, nucleoplasm and chromatin, nucleolus and the nucleus as a whole with descriptions and functions'),
      n: 'The nucleus is the control centre. Its chromatin carries the genes that pass from parent to offspring. Inside it, the dense nucleolus makes the ribosomes, which the cell uses to build proteins.',
    }),
    sl('diagram', 'Mitochondria, ER and Golgi bodies', {
      b: '**Mitochondria** release energy; **rough ER** carries ribosomes and moves proteins; **Golgi bodies** pack and send out materials.',
      v: V.organelles,
      n: 'A mitochondrion has a folded inner membrane for respiration. The rough endoplasmic reticulum is a network of flat sacs covered in ribosomes. The Golgi body is a stack of sacs that packs substances into vesicles.',
    }),
    sl('example', 'Worked example 2: tracing a cell product', {
      b: 'A salivary gland cell makes the enzyme amylase and sends it out. Trace the route.',
      ul: ['Step 1: **ribosomes** on the rough ER build the protein.', 'Step 2: the **rough ER** carries it inside the cell.', 'Step 3: the **Golgi body** modifies and packs it into vesicles.', 'Step 4: vesicles fuse with the **cell membrane** and release it.'],
      v: flow('LR', [['r', 'Ribosomes: build protein'], ['e', 'Rough ER: carries it'], ['g', 'Golgi body: packs it'], ['m', 'Cell membrane: releases it']], [['r', 'e'], ['e', 'g'], ['g', 'm']], 'Flow of a protein from ribosomes to rough ER to Golgi body to the cell membrane'),
      n: 'Follow the enzyme step by step. Ribosomes make it, the rough endoplasmic reticulum carries it, the Golgi body packs it into a vesicle, and the vesicle opens at the cell membrane to release it outside.',
    }),
    sl('check', 'Quick check: the powerhouse', {
      b: 'Why are mitochondria called the powerhouses of the cell?',
      chk: 'power-mcq',
      n: 'Think about what respiration gives the cell.',
    }),
    sl('summary', 'Summary', {
      ul: ['Cell theory: made of cells; unit of structure and function; cells come from cells.', 'Protoplasm = cytoplasm + nucleus.', 'Wall: non-living, cellulose, freely permeable. Membrane: living, selectively permeable.', 'Nucleus controls; nucleolus makes ribosomes; ribosomes make protein.', 'Mitochondria release energy; ER transports; Golgi packs.'],
      v: table(['Organelle', 'One-word job'], [['Nucleus', 'Control'], ['Mitochondrion', 'Energy'], ['Ribosome', 'Protein'], ['Rough ER', 'Transport'], ['Golgi body', 'Packaging']], 'Summary table giving a one-word job for each organelle'),
      n: 'To recap. The cell is the unit of life. The wall protects, the membrane controls, the nucleus directs, ribosomes build protein, mitochondria supply energy, and the Golgi body packs and sends out.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Never write that the cell wall is **living** or **selectively permeable**.', 'Say **powerhouse** because mitochondria release **energy** in respiration.', 'Label diagrams with **ruled lines** that touch the part.', `A drawing 6 cm wide of a 60 micrometre cell is magnified **${CHEEK.magnification} times**: divide drawing size by real size.`],
      n: 'Exam tips. Do not call the cell wall living. Explain the powerhouse idea through respiration and energy. Draw ruled label lines that touch the part. And for magnification, divide the size of the drawing by the real size.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'The Cell — Part 2: Plastids, other organelles, and comparing cells',
  goals: [
    'Distinguish chloroplasts, chromoplasts and leucoplasts and state the functions of lysosomes, the centrosome and vacuoles',
    'List the differences between prokaryotic and eukaryotic cells',
    'Draw and tabulate the differences between plant and animal cells',
  ],
  slides: [
    sl('title', 'Plastids and Cell Types', {
      b: 'Part 2 — organelles of plant cells, and how cells are sorted into two great types.',
      v: flow('LR', [['c', 'All cells'], ['p', 'Prokaryotic: no true nucleus'], ['e', 'Eukaryotic: true nucleus']], [['c', 'p'], ['c', 'e']], 'Flow splitting all cells into prokaryotic cells with no true nucleus and eukaryotic cells with a true nucleus'),
      n: 'Cells are not all built alike. Some have a true nucleus and many organelles, and some have neither. First we meet the plastids and a few more organelles, then we compare the main kinds of cell.',
    }),
    sl('concept', 'Plastids', {
      v: table(['Plastid', 'Colour', 'Function'], [['Chloroplast', 'Green (chlorophyll)', 'Traps light for photosynthesis'], ['Chromoplast', 'Red, orange or yellow', 'Colours flowers and fruits'], ['Leucoplast', 'Colourless', 'Stores starch, oils or proteins']], 'Table of three plastids with colour and function'),
      n: 'Plastids are found in plant cells. Chloroplasts are green and make food by photosynthesis. Chromoplasts hold bright pigments. Leucoplasts have no colour and act as the stores of starch, oil or protein.',
    }),
    sl('diagram', 'Three kinds of plastid', {
      b: 'All three are **plastids**; what a plastid does depends on its **pigment** or contents.',
      v: V.plastids,
      n: 'In the chloroplast the green discs are stacked in grana. The chromoplast carries coloured droplets. The leucoplast is pale, with starch grains packed inside.',
    }),
    sl('check', 'Quick check: the colourless plastid', {
      b: 'Which plastid is colourless and stores starch?',
      chk: 'leuco-mcq',
      n: 'The name begins with a word meaning white.',
    }),
    sl('concept', 'Lysosomes, centrosome and vacuoles', {
      v: table(['Organelle', 'Structure', 'Function'], [['Lysosome', 'Small single-membrane bag of enzymes', 'Digests worn-out parts and foreign matter; called a suicide bag'], ['Centrosome', 'Two centrioles near the nucleus; animal cells', 'Helps form the spindle in cell division'], ['Vacuole', 'Sac of cell sap; large in plants, small in animals', 'Stores water and food; keeps plant cells firm']], 'Table of the lysosome, centrosome and vacuole with structure and function'),
      n: 'Lysosomes hold digestive enzymes and clean up the cell. The centrosome belongs to animal cells and helps in division. Vacuoles store cell sap, and in plants one large vacuole helps keep the cell firm.',
    }),
    sl('example', 'Worked example 1: the shrinking tadpole tail', {
      b: 'As a tadpole becomes a frog, its tail cells break down and the tail shrinks. Which organelle drives this?',
      ul: ['Step 1: the tail cells are being **digested**.', 'Step 2: the organelle holding **digestive enzymes** is the **lysosome**.', 'Step 3: its enzymes break down the cell parts, which is why it is called a **suicide bag**.'],
      v: table(['Clue', 'Reasoning'], [['Cells are broken down', 'Needs digestive enzymes'], ['Enzymes are held in a bag', 'Lysosome'], ['It can destroy its own cell', 'Suicide bag']], 'Worked table linking each clue about the tadpole tail to the lysosome'),
      n: 'Ask what is happening to the tail cells. They are being digested. The organelle that holds digestive enzymes is the lysosome, so lysosomes in the tail cells are doing the work.',
    }),
    sl('check', 'Quick check: the digestive bag', {
      b: 'Which organelle is known as the suicide bag of the cell?',
      chk: 'lyso-mcq',
      n: 'It holds enzymes that digest.',
    }),
    sl('diagram', 'A prokaryotic cell', {
      b: 'A bacterium has **no nuclear membrane**: its DNA lies in the cytoplasm as a **nucleoid**. It has **no membrane-bound organelles**.',
      v: V.bacterium,
      n: 'Look at the bacterium. Its DNA is not inside a nucleus but lies free as a nucleoid. It has a wall, a membrane and ribosomes, but none of the organelles that have their own membrane.',
    }),
    sl('concept', 'Prokaryotic and eukaryotic cells', {
      v: table(['Point', 'Prokaryotic', 'Eukaryotic'], [['Nucleus', 'No true nucleus; nucleoid', 'True nucleus with nuclear membrane'], ['Organelles', 'No membrane-bound organelles', 'Mitochondria, ER, Golgi and others'], ['Size', 'Usually small', 'Usually larger'], ['Examples', 'Bacteria, blue-green algae', 'Amoeba, yeast, plants, animals']], 'Table comparing prokaryotic and eukaryotic cells on nucleus, organelles, size and examples'),
      n: 'The big difference is the nucleus. Prokaryotic cells have a nucleoid and no membrane-bound organelles. Eukaryotic cells have a true nucleus and many organelles. Bacteria are prokaryotes. Amoeba, yeast, plants and animals are eukaryotes.',
    }),
    sl('example', 'Worked example 2: sorting an unknown cell', {
      b: 'A cell has a wall, ribosomes and DNA lying free, but no nuclear membrane and no mitochondria. What is it?',
      ul: ['Step 1: **no nuclear membrane** means no true nucleus.', 'Step 2: **no mitochondria** means no membrane-bound organelles.', 'Step 3: so it is a **prokaryotic** cell, such as a bacterium.'],
      v: flow('LR', [['n', 'Nuclear membrane present?'], ['a', 'Absent'], ['p', 'Prokaryotic cell']], [['n', 'a', 'No'], ['a', 'p']], 'Flow: no nuclear membrane leads to a prokaryotic cell'),
      n: 'Check the nucleus first. No nuclear membrane means no true nucleus, and no mitochondria means no membrane-bound organelles. Both clues point to a prokaryotic cell such as a bacterium.',
    }),
    sl('check', 'Quick check: the cell type', {
      b: 'Which of these is a prokaryotic cell?',
      chk: 'prok-mcq',
      n: 'Look for the organism with no true nucleus.',
    }),
    sl('diagram', 'A generalised plant cell', {
      b: 'A plant cell has a **cell wall**, a **large central vacuole** and **plastids**. It has **no centrosome** in higher plants.',
      v: V.plant,
      n: 'Compare this with the animal cell. The plant cell has a cellulose wall outside the membrane, chloroplasts, and a big central vacuole that pushes the nucleus to one side.',
    }),
    sl('concept', 'Plant cell and animal cell compared', {
      v: table(['Point', 'Plant cell', 'Animal cell'], [['Cell wall', 'Present (cellulose)', 'Absent'], ['Shape', 'Usually fixed, regular', 'Usually irregular, changeable'], ['Plastids', 'Present', 'Absent'], ['Vacuoles', 'One large central', 'Small and few, or temporary'], ['Centrosome', 'Absent in higher plants', 'Present'], ['Nucleus position', 'Often pushed to the side', 'Usually central']], 'Table comparing plant and animal cells on cell wall, shape, plastids, vacuoles, centrosome and position of the nucleus'),
      n: 'Learn four main differences. Plant cells have a cell wall, plastids and a large vacuole, and higher plants lack a centrosome. Animal cells have a centrosome and only small vacuoles.',
    }),
    sl('check', 'Quick check: two cell types', {
      b: 'Which structure is found in an animal cell but not in a plant cell of a higher plant?',
      chk: 'centro-mcq',
      n: 'It helps in division.',
    }),
    sl('summary', 'Summary', {
      ul: ['Plastids: chloroplast (photosynthesis), chromoplast (colour), leucoplast (storage).', 'Lysosome: digestion. Centrosome: division. Vacuole: storage and firmness.', 'Prokaryotic cell: no true nucleus, no membrane-bound organelles. Eukaryotic: both present.', 'Plant cell: wall, plastids, large vacuole. Animal cell: centrosome, small vacuoles.'],
      v: table(['Cell', 'Nucleus'], [['Bacterium', 'Nucleoid only'], ['Plant cell', 'True nucleus'], ['Animal cell', 'True nucleus']], 'Summary table of the nucleus in a bacterium, a plant cell and an animal cell'),
      n: 'To recap. Plastids give colour, food-making or storage. Lysosomes digest, the centrosome helps division, and vacuoles store. Bacteria are prokaryotic, while plant and animal cells are eukaryotic with distinct differences.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['A bacterium has **no true nucleus**, but it does have DNA.', 'Write **plastids** and **cell wall** as plant features, **centrosome** as an animal feature.', `Cells in a row: 2000 micrometres of field divided by 80 micrometres per cell gives **${FIELD.cellsInRow} cells**.`, 'In a plant and animal comparison, put **matching points** side by side.'],
      n: 'Exam tips. A bacterium has DNA but no true nucleus. List plastids and the wall as plant features and the centrosome as an animal feature. Write comparisons point against point, and show your working in any counting question.',
    }),
  ],
});
