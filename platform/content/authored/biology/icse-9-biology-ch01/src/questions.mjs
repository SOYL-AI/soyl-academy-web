// ICSE 9 Biology ch01 The Cell: A Unit of Life — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from './lib.mjs';
import { CHEEK, MAG2, PEEL, SIZE, MITO, FIELD } from './calc.mjs';
import { PLANT_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const plantFig = svgV(PLANT_LETTERED, 'A plant cell with parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('protoplasm-mcq', mcq({
  stem: 'Which term covers the cytoplasm and the nucleus of a cell together?',
  right: 'Protoplasm', wrong: ['Nucleoplasm', 'Cell sap', 'Cell membrane'],
  sol: 'Protoplasm is the whole living content of a cell: cytoplasm plus nucleus — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('wall-mcq', mcq({
  stem: 'Which statement about the cell wall of a plant cell is correct?',
  right: 'It is non-living and freely permeable', wrong: ['It is living and selectively permeable', 'It is made of lipids and proteins', 'It is found in all animal cells'],
  sol: 'The cellulose wall is a non-living, freely permeable layer outside the membrane — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('power-mcq', mcq({
  stem: 'Mitochondria are called the powerhouses of the cell because they',
  right: 'release energy from food during respiration', wrong: ['make proteins from amino acids', 'trap light energy', 'store cell sap'],
  sol: 'Respiration in the mitochondria releases the energy the cell uses — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('leuco-mcq', mcq({
  stem: 'Which plastid is colourless and stores starch, oil or protein?',
  right: 'Leucoplast', wrong: ['Chloroplast', 'Chromoplast', 'Lysosome'],
  sol: 'Leucoplasts are colourless storage plastids — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('lyso-mcq', mcq({
  stem: 'Which organelle is known as the suicide bag of the cell?',
  right: 'Lysosome', wrong: ['Ribosome', 'Golgi body', 'Centrosome'],
  sol: 'Lysosomes hold digestive enzymes that can digest the cell itself — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('prok-mcq', mcq({
  stem: 'Which of the following is a prokaryotic cell?',
  right: 'A bacterium', wrong: ['An Amoeba', 'A yeast cell', 'A cell of a mango leaf'],
  sol: 'Only the bacterium lacks a true nucleus; the others are eukaryotic — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('centro-mcq', mcq({
  stem: 'Which structure is present in an animal cell but absent from the cell of a higher plant?',
  right: 'Centrosome', wrong: ['Nucleus', 'Mitochondrion', 'Ribosome'],
  sol: 'Higher plant cells lack a centrosome — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- t01 protoplasm and cytoplasm; cell theory
add('cytoplasm-mcq', mcq({
  stem: 'A student removes the nucleus from a living cell with a very fine needle. The living material that remains inside the cell membrane is the',
  right: 'cytoplasm', wrong: ['nucleoplasm', 'protoplasm of the nucleus', 'cell sap'],
  sol: 'Protoplasm minus the nucleus is the cytoplasm — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cell-tf', tf({
  stem: 'Every new cell of a multicellular body is formed by the division of an already existing cell.',
  key: 't',
  sol: 'True. The third point of the cell theory: cells arise only from pre-existing cells.',
  d: 1, c: 'understanding', t: [1],
}));
add('term-cytoplasm', term({
  stem: 'Give the biological term: the jelly-like living matter between the cell membrane and the nucleus.',
  model: '**Cytoplasm.**', sol: 'Cytoplasm.', sch: 'Cytoplasm',
  d: 1, c: 'recall', t: [1],
}));
add('protoplasm-short', short({
  marks: 2,
  stem: 'A student writes: "Protoplasm and cytoplasm are the same thing." Correct this statement.',
  model: '**Protoplasm** is all the living matter of the cell, that is the **cytoplasm and the nucleus** together. The **cytoplasm** is only the part of the protoplasm lying outside the nucleus, inside the cell membrane.',
  sol: 'Protoplasm = cytoplasm + nucleus.',
  scheme: [['Protoplasm includes the nucleus', 1], ['Cytoplasm is the part outside the nucleus', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 cell wall and cell membrane
add('membrane-mcq', mcq({
  stem: 'Slices of raw beetroot lose their red pigment into warm water but not into cold water. The warm water has damaged the',
  right: 'living cell membrane, which then loses its control over what leaves', wrong: ['non-living cell wall, which then stops being permeable', 'nucleolus, which then makes no ribosomes', 'ribosomes, which then make no protein'],
  sol: 'Heat destroys the living, selectively permeable membrane, so the pigment leaks out — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('wallfunc-mcq', mcq({
  stem: 'A plant cell placed in pure water takes in a lot of water but does not burst. The structure that prevents this is the',
  right: 'cell wall, because it is rigid and strong', wrong: ['cell membrane, because it is made of cellulose', 'nucleus, because it controls the cell', 'cytoplasm, because it is jelly-like'],
  sol: 'The strong cellulose wall resists the swelling of the cell — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('figA-mcq', mcq({
  stem: 'In the figure of a plant cell, which letter marks the thick layer that is non-living and freely permeable?',
  right: 'A', wrong: ['B', 'D', 'E'],
  sol: 'A is the cell wall; E is the cell membrane just inside it, B the large vacuole and D the nucleus — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [plantFig],
}));
add('ar-wall', ar({
  a: 'Plant cells placed in pure water do not burst.',
  r: 'A plant cell is surrounded by a rigid cell wall.',
  key: 'c',
  sol: 'Both are true, and the rigid wall resists the swelling of the cell, which explains why it does not burst — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('membrane-tf', tf({
  stem: 'The cell membrane is a non-living layer that allows all substances to pass freely.',
  key: 'f',
  sol: 'False. The cell membrane is living and selectively permeable; it is the cell wall that is non-living and freely permeable.',
  d: 2, c: 'understanding', t: [2],
}));
add('odd-wall', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Cell wall, Large vacuole, Plastid, Centrosome.',
  model: '**Centrosome**; the others are **features of a plant cell**.', sol: 'Higher plants have no centrosome.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2, 6],
}));
add('wall-membrane-short', short({
  marks: 2,
  stem: 'State two differences between the cell wall and the cell membrane of a plant cell.',
  model: '1. The cell wall is **non-living** and made of **cellulose**; the cell membrane is **living** and made of lipids and proteins.\n2. The cell wall is **freely permeable**; the cell membrane is **selectively permeable**.',
  sol: 'Living or non-living; composition; permeability.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 nucleus, nucleolus, mitochondria, ER, ribosomes, Golgi
add('nucleolus-mcq', mcq({
  stem: 'A cell that must build a great deal of protein has a large, dark nucleolus. This is because the nucleolus',
  right: 'makes the ribosomes on which proteins are built', wrong: ['stores the cell sap', 'packs proteins into vesicles', 'releases energy from glucose'],
  sol: 'The nucleolus makes ribosomes, the sites of protein synthesis — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cristae-mcq', mcq({
  stem: 'The inner membrane of a mitochondrion is folded into cristae. This arrangement helps the organelle by',
  right: 'giving a large surface for the reactions of respiration', wrong: ['trapping sunlight for photosynthesis', 'holding the digestive enzymes', 'forming the spindle in cell division'],
  sol: 'More folds mean a larger surface for respiration — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('golgi-mcq', mcq({
  stem: 'Small vesicles filled with secretions bud off from a stack of flat, curved sacs near the nucleus. The stack is the',
  right: 'Golgi body', wrong: ['mitochondrion', 'lysosome', 'nucleolus'],
  sol: 'Golgi bodies modify, pack and send out materials in vesicles — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ribosome-mcq', mcq({
  stem: 'Which of the following is NOT surrounded by a membrane?',
  right: 'A ribosome', wrong: ['A mitochondrion', 'A lysosome', 'The nucleus'],
  sol: 'Ribosomes are tiny granules without a membrane — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('rer-mcq', mcq({
  stem: 'A chemical damages the ribosomes of a cell and leaves its other organelles unharmed. Which activity will be reduced most?',
  right: 'Making proteins', wrong: ['Releasing energy in respiration', 'Controlling the entry of substances', 'Storing water in the vacuole'],
  sol: 'Ribosomes are the site of protein synthesis — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sperm-mcq', mcq({
  stem: 'A sperm cell swims for hours. The middle region behind its head is packed with mitochondria because',
  right: 'its tail needs a continuous supply of energy', wrong: ['the head must digest the egg membrane', 'the cell must make a large amount of protein', 'the cell must store starch'],
  sol: 'Mitochondria release the energy for the beating tail — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('mag-mcq', mcq({
  stem: `A cell of actual width ${MAG2.actualUm} micrometres is drawn ${MAG2.drawingCm} cm wide. The magnification of the drawing is`,
  right: `${MAG2.magnification} times`, wrong: ['200 times', '500 times', '20 000 times'],
  sol: `${MAG2.drawingCm} cm is ${MAG2.drawingCm * 10000} micrometres; ${MAG2.drawingCm * 10000} ÷ ${MAG2.actualUm} = ${MAG2.magnification} — option (@K).`,
  d: 3, c: 'application', t: [3, 6],
}), (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md === '2000 times' || 'key');
add('fill-cristae', fill({
  stem: 'The folds of the inner membrane of a mitochondrion are called ______.',
  acc: [['cristae', 'crista']],
  sol: 'Cristae.',
  d: 1, c: 'recall', t: [3],
}));
add('ar-nucleolus', ar({
  a: 'The nucleolus is surrounded by its own double membrane.',
  r: 'The nucleolus makes ribosomes.',
  key: 'b',
  sol: 'The assertion is false: the nucleolus has no membrane of its own. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('term-golgi', term({
  stem: 'Give the biological term: the cell organelle, made of stacked flat sacs, that modifies, packs and secretes substances.',
  model: '**Golgi body.**', sol: 'Golgi body.', sch: 'Golgi body',
  d: 1, c: 'recall', t: [3],
}));
add('rer-short', short({
  marks: 2,
  stem: 'Distinguish between rough and smooth endoplasmic reticulum on one point of structure and one of function.',
  model: '**Structure:** rough ER has **ribosomes** on its surface; smooth ER has none. **Function:** rough ER helps make and carry **proteins**; smooth ER helps make **lipids** and remove harmful substances.',
  sol: 'Ribosomes present or absent; protein or lipid work.',
  scheme: [['Structural difference', 1], ['Functional difference', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('mito-short', short({
  marks: 3,
  stem: 'Explain why mitochondria are called the powerhouses of the cell. Refer to their structure in your answer.',
  model: 'Mitochondria carry out **respiration**, which **releases energy** from food. The **inner membrane is folded into cristae**, giving a large surface for the reactions. The energy is stored as ATP and used for all the cell\'s activities, such as movement and making substances.',
  sol: 'Respiration, energy release, cristae and use of energy.',
  scheme: [['Respiration releases energy', 1], ['Cristae give a large surface', 1], ['Energy used by the cell', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('animal-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a generalised animal cell. Label the cell membrane, nucleus, nucleolus, mitochondrion, Golgi body and centrosome.',
  model: 'A rounded, irregular outline (**cell membrane**) containing **cytoplasm**; a large central **nucleus** with a dark **nucleolus**; a **mitochondrion** with folded inner membrane, a **Golgi body** of stacked sacs and a **centrosome** of two short rods near the nucleus. No cell wall is drawn.',
  sol: 'Outline with no wall; six labels.',
  scheme: [['Cell outline with cytoplasm and no wall', 1], ['Nucleus with nucleolus and the organelles drawn', 1], ['Six correct labels', 1]],
  d: 2, c: 'application', t: [3, 6],
}));

// ---------------------------------------------------------------- t04 plastids, lysosomes, centrosome, vacuoles
add('chromo-mcq', mcq({
  stem: 'A tomato is green when young and red when ripe. Which change in its cells accounts for the new colour?',
  right: 'Chloroplasts change into chromoplasts with red pigment', wrong: ['Leucoplasts change into chloroplasts', 'Lysosomes fill with cell sap', 'The nucleus changes into a plastid'],
  sol: 'Green chloroplasts turn into red chromoplasts as the fruit ripens — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('potato-mcq', mcq({
  stem: 'A drop of iodine turns the cells of a cut potato tuber blue-black. The starch they contain is stored in',
  right: 'leucoplasts', wrong: ['chloroplasts', 'chromoplasts', 'lysosomes'],
  sol: 'Underground storage tissue has colourless leucoplasts that store starch — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('vac-mcq', mcq({
  stem: 'A limp lettuce leaf becomes crisp after soaking in water. This happens because the large vacuoles of its cells',
  right: 'fill with water and make the cells firm (turgid)', wrong: ['digest the cell sap', 'release energy for the cells', 'make new cell walls'],
  sol: 'Water filling the large vacuole makes the cell turgid — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ar-lyso', ar({
  a: 'Lysosomes are called suicide bags.',
  r: 'Lysosomes contain digestive enzymes that can digest the cell\'s own parts.',
  key: 'c',
  sol: 'Both are true, and the self-digesting ability of the enzymes explains the name — option (c).',
  d: 2, c: 'analysis', t: [4],
}));
add('ar-leuco', ar({
  a: 'Leucoplasts are present in the cells of a potato tuber.',
  r: 'Chloroplasts contain the green pigment chlorophyll.',
  key: 'd',
  sol: 'Both statements are true, but the reason has nothing to do with why leucoplasts occur in the tuber — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('odd-plastid', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Chloroplast, Chromoplast, Leucoplast, Lysosome.',
  model: '**Lysosome**; the others are **plastids**.', sol: 'A lysosome is not a plastid.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [4],
}));
add('term-chlorophyll', term({
  stem: 'Give the biological term: the green pigment present in a chloroplast.',
  model: '**Chlorophyll.**', sol: 'Chlorophyll.', sch: 'Chlorophyll',
  d: 1, c: 'recall', t: [4],
}));
add('reason-lyso', term({
  stem: 'Give reason: lysosomes are called suicide bags.',
  model: 'Lysosomes hold **digestive enzymes**; if the lysosome bursts, the enzymes can **digest the cell\'s own parts**.', sol: 'Enzymes can digest their own cell.', sch: 'Digestive enzymes digest own cell',
  d: 2, c: 'understanding', t: [4],
}));
add('centro-short', short({
  marks: 2,
  stem: 'Name the organelle that helps in cell division in animal cells. State where it lies and the structures that make it up.',
  model: 'The **centrosome**. It lies **near the nucleus** and consists of **two centrioles**, which help to form the **spindle** during cell division.',
  sol: 'Centrosome; near nucleus; two centrioles.',
  scheme: [['Centrosome and position', 1], ['Two centrioles and spindle', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('vacuole-short', short({
  marks: 2,
  stem: 'State two functions of the large central vacuole of a plant cell.',
  model: '1. It **stores** water, mineral salts and food materials dissolved in the **cell sap**.\n2. It keeps the cell **turgid** (firm), which helps to support soft parts of the plant.',
  sol: 'Storage; turgidity.',
  scheme: [['Storage', 1], ['Turgidity and support', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('onion-short', short({
  marks: 2,
  stem: 'Cells from the white inner scale leaf of an onion bulb show a wall and a nucleus but no chloroplasts. Give two reasons.',
  model: 'The bulb grows **underground** where there is **no light**, so chlorophyll is not made. Its cells have **leucoplasts**, which **store food** such as starch, instead of chloroplasts.',
  sol: 'No light; leucoplasts store food.',
  scheme: [['No light underground', 1], ['Leucoplasts for storage instead', 1]],
  d: 3, c: 'application', t: [4],
}));
add('plastid-short', short({
  marks: 3,
  stem: 'Name the three kinds of plastid and give one function of each.',
  model: '1. **Chloroplast** (green): traps light for **photosynthesis**.\n2. **Chromoplast** (red, orange or yellow): gives **colour** to flowers and fruits.\n3. **Leucoplast** (colourless): **stores** starch, oil or protein as a reserve.',
  sol: 'Chloroplast, chromoplast, leucoplast with functions.',
  scheme: [['Chloroplast and function', 1], ['Chromoplast and function', 1], ['Leucoplast and function', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 prokaryotic and eukaryotic cells
add('nostoc-mcq', mcq({
  stem: 'Nostoc, a blue-green alga in a pond, makes its food by photosynthesis. Which statement about its cell is correct?',
  right: 'Its chlorophyll is not inside chloroplasts, because it has no membrane-bound organelles', wrong: ['Its DNA is enclosed by a nuclear membrane', 'Its respiration takes place in mitochondria', 'Its proteins are packed by a Golgi body'],
  sol: 'Being prokaryotic, it has no chloroplasts, mitochondria, Golgi body or nuclear membrane — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('yeast-mcq', mcq({
  stem: 'A one-celled yeast has its DNA inside a nucleus bounded by a nuclear membrane. It is therefore a',
  right: 'eukaryotic cell', wrong: ['prokaryotic cell', 'virus', 'cell without any DNA'],
  sol: 'A true nucleus marks a eukaryotic cell — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('common-mcq', mcq({
  stem: 'Which structure is present in both a bacterial cell and a plant cell?',
  right: 'Ribosomes', wrong: ['Nuclear membrane', 'Mitochondria', 'Golgi bodies'],
  sol: 'Ribosomes occur in every cell; the other three are absent from bacteria — option (@K).',
  d: 2, c: 'analysis', t: [5],
}));
add('ar-bact', ar({
  a: 'Bacteria are called prokaryotes.',
  r: 'Bacteria have neither a nucleus nor any DNA.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: bacteria have DNA, lying free as a nucleoid — option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('ribosome-tf', tf({
  stem: 'Ribosomes are present in both prokaryotic and eukaryotic cells.',
  key: 't',
  sol: 'True. Every living cell needs ribosomes to make proteins.',
  d: 2, c: 'understanding', t: [5],
}));
add('fill-nucleoid', fill({
  stem: 'In a bacterial cell, the DNA lies in an area of the cytoplasm called the ______.',
  acc: [['nucleoid']],
  sol: 'Nucleoid.',
  d: 1, c: 'recall', t: [5],
}));
add('odd-prok', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Bacterium, Nostoc, Yeast, Anabaena.',
  model: '**Yeast**; the others are **prokaryotic organisms**.', sol: 'Yeast is eukaryotic.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [5],
}));
add('reason-prok', term({
  stem: 'Give reason: a bacterium is called a prokaryotic cell.',
  model: 'It has **no true nucleus**: the DNA is not enclosed by a nuclear membrane, and it has no membrane-bound organelles.', sol: 'No nuclear membrane or organelles.', sch: 'No true nucleus',
  d: 2, c: 'understanding', t: [5],
}));
add('prok-short', short({
  marks: 2,
  stem: 'Give two reasons why a bacterium is classed as a prokaryotic cell.',
  model: '1. Its DNA lies free as a **nucleoid**; there is **no nuclear membrane**, so no true nucleus.\n2. It has **no membrane-bound organelles** such as mitochondria, Golgi bodies or chloroplasts.',
  sol: 'No true nucleus; no organelles.',
  scheme: [['No nuclear membrane', 1], ['No membrane-bound organelles', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('table3-short', short({
  marks: 3,
  stem: 'Tabulate three differences between a prokaryotic cell and a eukaryotic cell.',
  model: '| Prokaryotic cell | Eukaryotic cell |\n|---|---|\n| No true nucleus; **nucleoid** | **True nucleus** with membrane |\n| **No** membrane-bound organelles | Mitochondria, ER, Golgi **present** |\n| Usually **small** | Usually **larger** |\n| e.g. bacteria | e.g. Amoeba, yeast |',
  sol: 'Nucleus; organelles; size; examples.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('size-num', num({
  stem: `A leaf cell is ${SIZE.leafCellUm} micrometres long and a bacterium is ${SIZE.bacteriumUm} micrometres long. How many times longer is the leaf cell?`,
  value: SIZE.times,
  sol: r`$${SIZE.leafCellUm} \div ${SIZE.bacteriumUm} = ${SIZE.times}$ times.`,
  scheme: [[`${SIZE.times} times`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => q.answer.value === 50 || 'value');

// ---------------------------------------------------------------- t06 plant versus animal cell
add('figB-mcq', mcq({
  stem: 'In the figure of a plant cell, which letter marks the structure that stores water and keeps the cell firm?',
  right: 'B', wrong: ['A', 'C', 'D'],
  sol: 'B is the large central vacuole; C is a chloroplast and D the nucleus — option (@K).',
  d: 2, c: 'application', t: [6, 4],
  assets: [plantFig],
}));
add('plant-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a generalised plant cell. Label the cell wall, cell membrane, large vacuole, nucleus, chloroplast and cytoplasm.',
  model: 'A **rectangular** outline with a **thick cell wall** and a thin **cell membrane** inside it; a **large central vacuole** pushing the **nucleus** to the side; **chloroplasts** in the **cytoplasm** near the edge. No centrosome is drawn.',
  sol: 'Rectangular outline, wall, vacuole, six labels.',
  scheme: [['Rectangular cell with wall and membrane', 1], ['Large vacuole, nucleus and chloroplasts', 1], ['Six correct labels', 1]],
  d: 2, c: 'application', t: [6],
}));
add('row-num', num({
  stem: `Cells of a leaf are each ${FIELD.cellUm} micrometres long. How many cells in a single row will fit across a microscope field ${FIELD.widthUm} micrometres wide?`,
  value: FIELD.cellsInRow,
  sol: r`$${FIELD.widthUm} \div ${FIELD.cellUm} = ${FIELD.cellsInRow}$ cells.`,
  scheme: [[`${FIELD.cellsInRow} cells`, 1]],
  d: 2, c: 'application', t: [6],
}), (q) => q.answer.value === 25 || 'value');
add('mito-num', num({
  stem: `A micrograph shows ${MITO.sperm} mitochondria in the middle piece of a sperm and ${MITO.skin} in a skin cell. How many times more mitochondria does the sperm show?`,
  value: MITO.times,
  sol: r`$${MITO.sperm} \div ${MITO.skin} = ${MITO.times}$ times.`,
  scheme: [[`${MITO.times} times`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 8 || 'value');
add('passage-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [cell wall, nucleus, chloroplast, mitochondrion, vacuole, centrosome, lysosome, ribosome]\n\nA plant cell is kept firm by the (a) ______ and by water in its large (b) ______. Light is trapped in the (c) ______, while the (d) ______ releases energy in respiration. An animal cell, unlike a higher plant cell, has a (e) ______ that helps form the spindle.',
  acc: [['cell wall'], ['vacuole'], ['chloroplast'], ['mitochondrion', 'mitochondria'], ['centrosome']],
  sol: '(a) cell wall; (b) vacuole; (c) chloroplast; (d) mitochondrion; (e) centrosome.',
  d: 2, c: 'understanding', t: [6, 4],
}));
add('cell-match5', match({
  marks: 5,
  stem: 'Study the diagram of a plant cell and match each lettered part with its function or description.',
  pairs: [
    ['A', 'Non-living layer that gives shape and protection'],
    ['B', 'Stores water and keeps the cell firm'],
    ['C', 'Traps light for photosynthesis'],
    ['D', 'Controls the activities of the cell'],
    ['E', 'Living, selectively permeable layer'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'A cell wall; B large vacuole; C chloroplast; D nucleus; E cell membrane.',
  d: 2, c: 'application', t: [2, 6],
  assets: [plantFig],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('cheek-long', long({
  marks: 10, wl: null,
  stem: `In a practical class a student scrapes the inside of her cheek, stains the cells with methylene blue and views them under a microscope. A cheek cell is ${CHEEK.actualUm} micrometres wide and she draws it ${CHEEK.drawingCm} cm wide.\n\n(a) Calculate the magnification of her drawing. Show your working. [2]\n\n(b) She also views a peel of onion scale leaf. State two features she sees in the onion cells but not in the cheek cells. [2]\n\n(c) Why do cheek cells have no fixed shape, while onion cells are regular? [2]\n\n(d) Draw a neat, labelled diagram of the cheek cell, naming four parts. [4]`,
  model: `**(a)** Drawing width = ${CHEEK.drawingCm} cm = ${CHEEK.drawingUm} micrometres. Magnification = ${CHEEK.drawingUm} ÷ ${CHEEK.actualUm} = **${CHEEK.magnification} times**.\n\n**(b)** A **cell wall** and a **large vacuole** (or plastids in some leaf cells).\n\n**(c)** Animal cells have only a flexible **cell membrane** and no wall, so their shape can change; the **rigid cellulose wall** gives onion cells a fixed, regular shape.\n\n**(d)** An irregular, rounded outline (**cell membrane**) enclosing **cytoplasm**, with a central **nucleus** and a **nucleolus**; a small **vacuole** may be drawn. No wall.`,
  sol: `Magnification is drawing size divided by real size, ${CHEEK.magnification} times; wall and vacuole are the plant features; the wall fixes the shape.`,
  scheme: [['Units converted to micrometres', 1], [`${CHEEK.magnification} times`, 1], ['Two features', 2], ['Wall rigid; membrane flexible', 2], ['Outline with no wall', 1], ['Nucleus and nucleolus', 1], ['Four labels', 2]],
  d: 3, c: 'application', t: [1, 2, 6],
}), (q) => q.stem_md.includes('[4]') || 'parts');
add('leaf-long', long({
  marks: 10, wl: null,
  stem: `A student peels the lower surface of a leaf from a garden plant, mounts it in water and studies ${PEEL.cells} cells of the green mesophyll layer under a microscope. Of these, ${PEEL.withChloroplast} cells show green oval bodies and the rest show none.\n\n(a) What percentage of the cells show the green bodies? [2]\n\n(b) Name the green bodies and the pigment in them, and state their function. [3]\n\n(c) Name one plastid of another colour and one place in a plant where it is found. [1]\n\n(d) Draw a neat, labelled diagram of a plant cell, naming four parts. [4]`,
  model: `**(a)** ${PEEL.withChloroplast} ÷ ${PEEL.cells} × 100 = **${PEEL.pct} percent**.\n\n**(b)** **Chloroplasts**; the pigment is **chlorophyll**; they trap light for **photosynthesis**.\n\n**(c)** **Chromoplast** in a ripe tomato or a petal (or **leucoplast** in a potato tuber).\n\n**(d)** A rectangular outline with **cell wall** and **cell membrane**; **large vacuole**; **nucleus**; **chloroplasts** in the cytoplasm.`,
  sol: `${PEEL.pct} percent; chloroplast, chlorophyll, photosynthesis; chromoplast; labelled plant cell.`,
  scheme: [['Working', 1], [`${PEEL.pct} percent`, 1], ['Chloroplast', 1], ['Chlorophyll', 1], ['Photosynthesis', 1], ['Another plastid and place', 1], ['Rectangular cell with wall and vacuole', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [4, 6],
}), (q) => PEEL.pct === 75 || 'pct');
add('gland-long', long({
  marks: 10, wl: null,
  stem: 'A cell lining the wall of the stomach makes the enzyme pepsin, which is a protein, and releases it into the stomach.\n\n(a) Name, in order, the organelles through which the pepsin passes from its making to its release. [3]\n\n(b) The cell needs a great deal of energy for this work. Name the organelle that supplies it and the process involved. [2]\n\n(c) State what would happen to the cell\'s ability to make pepsin if its nucleolus failed to work. Give a reason. [2]\n\n(d) Draw a neat, labelled diagram of a Golgi body. [3]',
  model: '**(a)** **Ribosomes** (build the protein) → **rough endoplasmic reticulum** (carries it) → **Golgi body** (modifies and packs it into vesicles) → **cell membrane** (releases it).\n\n**(b)** The **mitochondria**, by **respiration**, which releases energy from food.\n\n(c) The cell could not make enough pepsin, because the **nucleolus makes ribosomes**, and without ribosomes proteins cannot be built.\n\n**(d)** A stack of four or five **flat, curved sacs** one above another, with small **vesicles** budding from the edges; labelled **Golgi body**, **sacs** and **vesicles**.',
  sol: 'Ribosome, rough ER, Golgi body, cell membrane; mitochondria and respiration; nucleolus makes ribosomes; labelled Golgi body.',
  scheme: [['Ribosomes and rough ER', 1], ['Golgi body', 1], ['Cell membrane', 1], ['Mitochondria', 1], ['Respiration', 1], ['Less pepsin', 1], ['Nucleolus makes ribosomes', 1], ['Stack of sacs with vesicles', 2], ['Labels', 1]],
  d: 3, c: 'application', t: [3],
}));
add('bacteria-long', long({
  marks: 10, wl: null,
  stem: 'A student studies two cells under an electron microscope. Cell P has a wall, ribosomes and DNA lying free in the cytoplasm, but no nuclear membrane and no mitochondria. Cell Q has a cellulose wall, a nucleus, chloroplasts and a large vacuole.\n\n(a) Name the type of cell each is and give one reason for each. [3]\n\n(b) Name one structure present in both P and Q. [1]\n\n(c) Tabulate two differences between P and Q other than those in the description. [2]\n\n(d) Draw a neat, labelled diagram of cell P, naming four parts. [4]',
  model: '**(a)** P is **prokaryotic** (no nuclear membrane; DNA free). Q is **eukaryotic** (has a true nucleus bounded by a membrane); Q is also a **plant cell** (cellulose wall, chloroplasts).\n\n**(b)** **Ribosomes** (or a cell wall, or a cell membrane).\n\n**(c)** | P | Q |\n|---|---|\n| Usually very small | Larger |\n| Has a **nucleoid** and may carry **plasmids** | Has chromosomes inside a nucleus |\n\n**(d)** A rod-shaped outline with **cell wall**, **cell membrane**, **cytoplasm** with **ribosomes**, a **nucleoid** (coiled DNA) and possibly a **flagellum**; no nucleus or organelles drawn.',
  sol: 'P prokaryotic, Q eukaryotic; ribosomes common; size and DNA arrangement differ; labelled bacterium.',
  scheme: [['P prokaryotic with reason', 1], ['Q eukaryotic with reason', 2], ['Common structure', 1], ['Two differences', 2], ['Outline with wall, membrane', 1], ['Nucleoid and ribosomes', 1], ['Four labels', 2]],
  d: 3, c: 'analysis', t: [5],
}));
add('wbc-long', long({
  marks: 10, wl: null,
  stem: 'A white blood cell of the human body engulfs a bacterium, enclosing it in a vesicle. Enzymes then break the bacterium down.\n\n(a) Name the organelle that supplies the enzymes and explain why it is called a suicide bag. [2]\n\n(b) The white blood cell must move and engulf the bacterium. Name the organelle that supplies its energy and the process. [2]\n\n(c) State three ways in which the structure of the bacterium differs from that of the white blood cell. [3]\n\n(d) Draw a neat, labelled diagram of a mitochondrion. [3]',
  model: '**(a)** The **lysosome**; its **digestive enzymes** can digest the cell\'s own parts if the bag bursts.\n\n**(b)** The **mitochondria**, by **respiration**.\n\n**(c)** The bacterium has **no true nucleus** (nucleoid only); **no membrane-bound organelles**; it has a **cell wall**, which the white blood cell lacks; it is much **smaller**. (any three)\n\n**(d)** An **oval** body with a smooth **outer membrane** and an **inner membrane folded into cristae**; the space inside is the matrix.',
  sol: 'Lysosome; mitochondria and respiration; three prokaryote differences; labelled mitochondrion.',
  scheme: [['Lysosome', 1], ['Digests own cell', 1], ['Mitochondria', 1], ['Respiration', 1], ['Three differences', 3], ['Oval with cristae', 2], ['Labels', 1]],
  d: 3, c: 'application', t: [3, 4, 5],
}));
add('plantanimal-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of a plant cell. Parts are lettered A to E.\n\n(a) Name the parts A and E and state one difference between them. [3]\n\n(b) A student says that the cell in the diagram could not belong to an animal. Give three structural reasons that support her. [3]\n\n(c) The part marked C is missing from the cells of a plant grown in the dark. State the effect on the plant and give a reason. [2]\n\n(d) Draw a neat, labelled diagram of an animal cell, showing two structures that the cell in the diagram does not have. [2]',
  model: '**(a)** A is the **cell wall**; E is the **cell membrane**. The wall is **non-living and freely permeable**; the membrane is **living and selectively permeable**.\n\n**(b)** It has a **cell wall**, a **large central vacuole** and **plastids (chloroplasts)**; an animal cell has none of these. (any three)\n\n**(c)** C is a **chloroplast**. Without it the plant cannot **photosynthesise**, so it would be pale and could not make its own food.\n\n**(d)** A rounded outline with membrane, nucleus and cytoplasm, and a **centrosome** and **small vacuoles** (or lysosomes), which the plant cell does not show.',
  sol: 'A cell wall, E cell membrane; wall, vacuole, plastids absent in animals; chloroplast photosynthesis; animal cell with centrosome.',
  scheme: [['A and E named', 1], ['Difference between them', 2], ['Three structural reasons', 3], ['Photosynthesis lost', 1], ['Pale, cannot make food', 1], ['Animal cell outline and nucleus', 1], ['Centrosome and small vacuole', 1]],
  d: 4, c: 'analysis', t: [2, 4, 6],
  assets: [plantFig],
}));
