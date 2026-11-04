// ch01 Cell: question bank. MCQ keys are placed by the builder (balanced). AR keys planned: b (ar-raisin), c (ar-bacteria), d (ar-mito-animal), a (ar-wall), a (ar-mitosis-cells), c (ar-sperm).
// Numericals are computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, dec } from './lib.mjs';
import { CHR } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 discovery, plant and animal cells
add('chk-discovery', mcq({
  stem: 'A single-lens microscope was used in the 1670s to report living single cells in pond water for the first time. Who made this report?',
  right: 'Antonie van Leeuwenhoek',
  wrong: ['Robert Hooke', 'Matthias Schleiden', 'Rudolf Virchow'],
  sol: 'Hooke saw only the walls of dead cork cells. Leeuwenhoek was the first to see living single cells, such as bacteria and pond organisms, so the answer is option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('disc-spont', mcq({
  stem: 'A village teacher claims that bacteria appear by themselves in boiled, sealed dal water, with no bacteria present at the start. Which idea of the cell theory does this claim go against?',
  right: 'All cells arise from pre-existing cells.',
  wrong: ['All organisms are made of cells.', 'Cells can be seen only with a microscope.', 'The cell is a unit of structure and function.'],
  sol: 'If bacteria appeared with no earlier bacteria, new cells would form from non-living matter. That contradicts the idea that cells come only from existing cells, option (@K), stated by Virchow.',
  d: 2, c: 'application', t: [1],
}));
add('mag-mcq', (() => {
  const img = 45, M = 500;
  const mm = img / M;
  const um = mm * 1000;
  return mcq({
    stem: `In a school laboratory a student draws a leaf cell ${img} mm long. The microscope magnification is ${M} times. The actual length of the cell is:`,
    right: `${um} µm`,
    wrong: [`${um / 10} µm`, `${um * 10} µm`, `${img * M / 1000} mm`],
    sol: r`Actual size $= \dfrac{\text{size of drawing}}{\text{magnification}} = \dfrac{${img}\ \text{mm}}{${M}} = ${mm}\ \text{mm} = ${um}\ \mu\text{m}$ — option (@K). (@1) and (@2) slip by a factor of ten in the conversion; (@3) multiplies instead of dividing.`,
    d: 2, c: 'application', t: [1],
  });
})(), () => near(45 / 500 * 1000, 90, 1e-9) || 'mag');
add('pa-mcq', mcq({
  stem: 'Which pair of features is found in a plant cell but NOT in an animal cell?',
  right: 'Cellulose cell wall and a large central vacuole',
  wrong: ['Nucleus and mitochondria', 'Cell membrane and cytoplasm', 'Ribosomes and Golgi apparatus'],
  sol: 'Both kinds of cell have a nucleus, mitochondria, membrane, cytoplasm, ribosomes and a Golgi apparatus. Only plant cells have a cellulose wall and a large central vacuole — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('ar-wall', ar({
  a: 'A plant cell has a fixed shape, but an animal cell can change its shape.',
  r: 'A plant cell is surrounded by a rigid cell wall made of cellulose.',
  key: 'a',
  sol: 'The rigid wall holds the plant cell in shape, while the animal cell has only a flexible membrane. R is the correct reason for A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('tf-cork', tf({
  stem: 'The box-like cells that Hooke saw in a thin slice of cork were living cells.',
  key: 'f',
  sol: 'False. Cork is dead tissue, so Hooke saw only the empty walls of dead cells. Living cells were first seen later by Leeuwenhoek.',
  d: 2, c: 'understanding', t: [1],
}));
add('fill-cellula', fill({
  stem: 'Hooke named the compartments he saw in cork “cells”, from a Latin word meaning a small ______.',
  acc: [['room', 'chamber']],
  sol: 'The word “cell” comes from the Latin cellula, a small room.',
  d: 1, c: 'recall', t: [1],
}));
add('s2-hooke', short({
  marks: 2,
  stem: 'Hooke looked at thin cork and Leeuwenhoek looked at a drop of pond water. State one difference between what the two scientists saw.',
  model: 'Hooke saw only the empty walls of dead cells, which looked like tiny rooms. Leeuwenhoek saw living single cells that moved and fed, such as bacteria and other tiny pond organisms. His single-lens microscope gave clearer images of living things.',
  sol: 'Dead cell walls against living cells.',
  scheme: [['Hooke: dead cell walls in cork', 1], ['Leeuwenhoek: living single cells in pond water', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-pa', short({
  marks: 2,
  stem: 'A leaf cell and a cheek cell are placed side by side. Give two features, other than the nucleus, that you would use to tell the two apart.',
  model: 'The leaf cell has a rigid cellulose cell wall outside the membrane, whereas the cheek cell has only a thin membrane. The leaf cell has green chloroplasts and a large central vacuole, whereas the cheek cell has no chloroplasts and only small vacuoles.',
  sol: 'Cell wall and chloroplasts or vacuole.',
  scheme: [['Cell wall present in the leaf cell, absent in the cheek cell', 1], ['Chloroplasts or large vacuole in the leaf cell only', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s3-theory', short({
  marks: 3,
  stem: 'State the cell theory in three points. Name the scientist who completed it and say what his addition was.',
  model: 'The cell theory says that all living things are made of one or more cells, that the cell is the basic unit of structure and function of life, and that all cells arise from cells that already exist. The last point was added by Rudolf Virchow in 1855. Schleiden and Schwann had earlier proposed that plants and animals are made of cells.',
  sol: 'Three points; Virchow added that cells come from cells.',
  scheme: [['Organisms are made of cells', 1], ['Cell is the unit of structure and function', 1], ['Cells arise from cells: Virchow', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('num-mag-bact', (() => {
  const img = 20, M = 10000;
  const mm = img / M;
  const um = mm * 1000;
  return num({
    stem: `A photograph of a bacterial cell is taken at a magnification of ${M}. The cell measures ${img} mm in the photograph. Find the actual length of the bacterium in micrometres.`,
    value: um, tol: 0.01, unit: 'µm',
    sol: r`Actual size $= \dfrac{${img}\ \text{mm}}{${M}} = ${mm}\ \text{mm}$. Since $1\ \text{mm} = 1000\ \mu\text{m}$, this is $${mm}\times 1000 = ${um}\ \mu\text{m}$, which lies in the usual 1 to 5 micrometre range for a bacterium.`,
    scheme: [['Divides the photograph size by the magnification', 1], ['Converts to micrometres: 2 µm', 1]],
    marks: 2, d: 2, c: 'application', t: [1, 2],
  });
})(), (q) => near(20 / 10000 * 1000, 2, 1e-9) && q.answer.value === 2 || 'bact');

// ---------------------------------------------------------------- t02 prokaryotes and eukaryotes
add('chk-kinds', mcq({
  stem: 'A microscope slide shows a cell that has a cell wall, ribosomes and DNA lying free in the cytoplasm, but no nuclear membrane and no mitochondria. The cell is most likely:',
  right: 'a bacterial cell, which is prokaryotic',
  wrong: ['an onion root cell, which is eukaryotic', 'a human cheek cell, which is eukaryotic', 'a yeast cell, which is eukaryotic'],
  sol: 'No nuclear membrane and no membrane-bound organelles mean a prokaryotic cell. Onion, human and yeast cells all have a true nucleus, so the answer is option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('prok-pair', mcq({
  stem: 'Which pair contains only prokaryotes?',
  right: 'Cyanobacteria and a soil bacterium',
  wrong: ['Yeast and Amoeba', 'A bacterium and a yeast', 'Spirogyra and Amoeba'],
  sol: 'Cyanobacteria and soil bacteria have no true nucleus, so both are prokaryotes — option (@K). Yeast, Amoeba and Spirogyra are all eukaryotes, which spoils the other pairs.',
  d: 2, c: 'application', t: [2],
}));
add('size-mcq', mcq({
  stem: 'Under a microscope a student measures two unknown cells: cell M is about 2 µm long and cell N about 60 µm long, and both contain DNA. Which conclusion is best supported by the sizes alone?',
  right: 'Cell M is more likely to be prokaryotic, because bacteria are usually 1 to 5 µm long.',
  wrong: ['Cell M is eukaryotic, because small cells always have a nucleus.', 'Cell N is prokaryotic, because large cells have no nucleus.', 'Both are prokaryotic, because both contain DNA.'],
  sol: 'Prokaryotic cells are usually 1 to 5 µm and eukaryotic cells 10 to 100 µm, so size points to M as prokaryotic — option (@K). Size is only a hint, and having DNA does not separate the two groups, since all cells contain DNA.',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-bacteria', ar({
  a: 'A bacterium and a human cell both contain DNA.',
  r: 'Both a bacterium and a human cell have a nucleus enclosed by a nuclear membrane.',
  key: 'c',
  sol: 'All cells contain DNA, so A is true. A bacterium has no nuclear membrane, so R is false — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('s2-nucleoid', short({
  marks: 2,
  stem: 'Where is the DNA found in a bacterium? Why is the bacterium called a prokaryote?',
  model: 'In a bacterium the DNA lies free in the cytoplasm in a region called the nucleoid. It is called a prokaryote because it has no nuclear membrane around the DNA, so it has no true nucleus, and it also has no membrane-bound organelles.',
  sol: 'Nucleoid; no true nucleus.',
  scheme: [['DNA lies in the nucleoid in the cytoplasm', 1], ['No nuclear membrane or true nucleus', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('long-proeuk', mk.long({
  stem: '(a) Draw a labelled sketch of a bacterial cell.\n\n(b) Give three differences between prokaryotic and eukaryotic cells, and one example of each kind of organism.',
  model: 'A bacterial cell sketch shows a cell wall, a cell membrane, cytoplasm with ribosomes, and a nucleoid of circular DNA with no nuclear membrane. A prokaryotic cell has no true nucleus, but a eukaryotic cell has a nucleus with a nuclear membrane. A prokaryotic cell has no membrane-bound organelles, but a eukaryotic cell has mitochondria, ER and a Golgi apparatus. Prokaryotic cells are small, about 1 to 5 micrometres, while eukaryotic cells are about 10 to 100 micrometres. Bacteria are prokaryotes; Amoeba, yeast, plants and animals are eukaryotes.',
  sol: 'Labelled sketch, three differences and examples.',
  scheme: [['Labelled sketch with at least four correct labels', 2], ['Three differences, one mark each', 2.5 - 0.5], ['Examples of both kinds', 1]].map(([a, b]) => [a, b]),
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 organelles
add('chk-organelle', mcq({
  stem: 'A researcher colours only the organelle that releases energy from glucose in a living cell. Which organelle will be coloured?',
  right: 'Mitochondrion',
  wrong: ['Lysosome', 'Golgi apparatus', 'Nucleolus'],
  sol: 'Energy is released from glucose in respiration, which happens in the mitochondria — option (@K). Lysosomes digest, the Golgi apparatus packs products and the nucleolus is inside the nucleus.',
  d: 1, c: 'understanding', t: [3],
}));
add('lyso-mcq', mcq({
  stem: 'A white blood cell swallows a bacterium. Which organelle will break down the bacterium inside the cell?',
  right: 'Lysosome',
  wrong: ['Nucleus', 'Chloroplast', 'Rough endoplasmic reticulum'],
  sol: 'Lysosomes contain digestive enzymes that break down germs and worn-out parts — option (@K). The nucleus controls the cell, chloroplasts are not found in animal cells, and the rough ER makes proteins.',
  d: 2, c: 'application', t: [3],
}));
add('tomato-mcq', mcq({
  stem: 'The red colour of a ripe tomato is due to pigments held in which kind of plastid?',
  right: 'Chromoplast',
  wrong: ['Chloroplast', 'Leucoplast', 'Lysosome'],
  sol: 'Chromoplasts hold coloured pigments in ripe fruits and petals — option (@K). Chloroplasts are green and leucoplasts are colourless.',
  d: 1, c: 'recall', t: [3],
}));
add('sperm-mito', mcq({
  stem: 'A sperm cell swims by lashing its tail, and many mitochondria are packed near the base of the tail. The best reason is that the mitochondria:',
  right: 'release the energy that the tail needs for movement',
  wrong: ['digest food for the sperm', 'make proteins for the head', 'store water for the tail'],
  sol: 'Moving the tail needs a steady supply of energy, which mitochondria release from food — option (@K). Digestion is done by lysosomes, protein making by ribosomes and storage by vacuoles.',
  d: 2, c: 'application', t: [3],
}));
add('wall-mcq', mcq({
  stem: 'Which statement about the plant cell wall is correct?',
  right: 'It is made of cellulose and lets water and dissolved substances pass through freely.',
  wrong: ['It is made of lipids and decides which substances enter the cell.', 'It lies inside the cell membrane and surrounds the nucleus.', 'It is found in animal cells but not in plant cells.'],
  sol: 'The wall is made of cellulose and is fully permeable, so it protects and shapes the cell but does not select substances — option (@K). Selecting is the job of the membrane, which lies inside the wall.',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-mito-animal', ar({
  a: 'Mitochondria are found only in animal cells.',
  r: 'Mitochondria release energy from food.',
  key: 'd',
  sol: 'Plant cells also respire and contain mitochondria, so A is false. R is a true statement about mitochondria — option (d).',
  d: 2, c: 'analysis', t: [3],
}));
add('tf-root', tf({
  stem: 'Every cell of a banyan tree, including those of its roots, contains chloroplasts.',
  key: 'f',
  sol: 'False. Chloroplasts are found in the green parts exposed to light. Cells deep in the roots have leucoplasts or no plastids with chlorophyll.',
  d: 2, c: 'application', t: [3],
}));
add('fill-leuco', fill({
  stem: 'Colourless plastids that store starch, oil or protein are called ______.',
  acc: [['leucoplasts', 'leucoplast']],
  sol: 'Leucoplasts are colourless storage plastids, found for example in a potato tuber.',
  d: 1, c: 'recall', t: [3],
}));
add('match-organelle', match({
  pairs: [['Nucleus', ''], ['Golgi apparatus', ''], ['Lysosome', ''], ['Large plant vacuole', '']].map(([l], i) => [l, ['Controls the cell and holds the DNA', 'Modifies and packs products into vesicles', 'Digests worn-out parts and germs', 'Stores cell sap and keeps the cell firm'][i]]),
  order: [2, 0, 3, 1],
  stem: 'Match each organelle (column I) with its job (column II).',
  sol: 'Nucleus controls the cell; the Golgi apparatus packs products; a lysosome digests; the large vacuole stores sap and keeps the cell firm.',
  d: 1, c: 'understanding', t: [3],
}));
add('s2-protpath', short({
  marks: 2,
  stem: 'A protein is made on the ribosomes of a cell and is sent out of the cell. Name the two organelles it passes through before it leaves, in order, and say what each does.',
  model: 'The protein is made by ribosomes on the rough endoplasmic reticulum, which also carries it inside the cell. It then goes to the Golgi apparatus, which modifies and packs it into vesicles that carry it to the cell membrane and out of the cell.',
  sol: 'Rough ER then Golgi apparatus, then vesicle.',
  scheme: [['Rough ER makes and carries the protein', 1], ['Golgi apparatus modifies and packs it in vesicles', 1]],
  d: 2, c: 'application', t: [3],
}));
add('s3-plastids', short({
  marks: 3,
  stem: 'Name the three kinds of plastid. For each, give one place in a plant where it is found and its job.',
  model: 'Chloroplasts are found in green leaves and carry out photosynthesis because they hold chlorophyll. Chromoplasts are found in petals and ripe fruits and give them their colours. Leucoplasts are colourless and found in storage organs such as potato tubers, where they store starch, oil or protein.',
  sol: 'Three plastids with place and job.',
  scheme: [['Chloroplast: leaf, photosynthesis', 1], ['Chromoplast: petal or fruit, colour', 1], ['Leucoplast: tuber or root, storage', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('long-plant', long({
  stem: '(a) Draw a neat labelled diagram of a plant cell.\n\n(b) Name any four organelles and state one function of each.',
  model: 'A labelled plant cell shows the cell wall, cell membrane, cytoplasm, nucleus, large central vacuole, chloroplasts, mitochondria, ER and Golgi apparatus. The nucleus holds the DNA and controls the cell. Mitochondria release energy from food in respiration. Chloroplasts hold chlorophyll and carry out photosynthesis. The large vacuole stores cell sap and keeps the cell firm. The cell wall of cellulose gives shape and protection.',
  sol: 'Labelled diagram, four organelles with functions.',
  scheme: [['Neat diagram with at least six correct labels', 2], ['Four organelles named', 1], ['A correct function for each of the four', 2]],
  d: 2, c: 'understanding', t: [1, 3],
}));
add('long-org', long({
  stem: 'A student makes a model of an animal cell. Explain how the nucleus, mitochondria, rough ER, Golgi apparatus and lysosomes work together when the cell makes and uses a protein, and name one part the model should NOT have that a plant cell model would.',
  model: 'The nucleus holds the DNA instructions. Ribosomes on the rough ER build the protein from these instructions. The Golgi apparatus modifies and packs it into vesicles. Mitochondria release the energy that all these steps need. Lysosomes digest worn-out parts, including damaged organelles, so the cell stays healthy. An animal cell model should not have a cellulose cell wall, chloroplasts or a large central vacuole, which belong in the plant cell model.',
  sol: 'A link of the five organelles, then one plant-only part.',
  scheme: [['Nucleus gives instructions and rough ER makes the protein', 1.5], ['Golgi apparatus packs the product', 1], ['Mitochondria supply energy and lysosomes digest waste', 1.5], ['One plant-only part, for example cell wall', 1]],
  d: 4, c: 'analysis', t: [3, 1],
}));
add('case-slides', mk.case({
  passage: `A student prepares three slides and records what she sees.

| Slide | Material | Observation |
|---|---|---|
| P | Thin peel from an onion bulb | Rectangular cells with thick walls, one large vacuole, no green bodies |
| Q | Leaf of the water plant *Hydrilla* | Green oval bodies seen moving along the cell edges |
| R | Scraping from the inside of her cheek | Rounded cells, thin boundary only, no green bodies |`,
  d: 2, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The green oval bodies seen in slide Q are:',
      right: 'chloroplasts',
      wrong: ['mitochondria', 'lysosomes', 'nuclei'],
      sol: 'Green oval bodies in a leaf cell are chloroplasts, which hold the green pigment chlorophyll — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Which slide shows an animal cell? Give one reason from the table.',
      model: 'Slide R, because the cells have only a thin boundary and no cell wall or green bodies.',
      sol: 'R: no wall, no chloroplasts.',
      scheme: [['Slide R with a reason', 1]],
      d: 1, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'The onion bulb grows underground, yet it is a plant. Explain why slide P shows no green bodies.',
      model: 'The onion bulb grows in the soil where there is no light, so its cells do not make chlorophyll and have no chloroplasts. Its cells have colourless plastids, leucoplasts, that store food such as starch, so no green bodies appear.',
      sol: 'No light underground, so no chloroplasts; storage plastids instead.',
      scheme: [['Underground, no light, so no chloroplasts', 1], ['Leucoplasts store food instead', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Give two features that would let you tell the cells of slide P from those of slide R.',
        model: 'Cells of slide P have a thick cell wall and one large central vacuole. Cells of slide R have no cell wall, and their vacuoles are small or absent.',
        sol: 'Cell wall and large vacuole in P.',
        scheme: [['Cell wall in P, absent in R', 1], ['Large vacuole in P, small or none in R', 1]],
        d: 2, c: 'application', t: [1],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t04 membrane, diffusion, osmosis
add('chk-osmosis', mcq({
  stem: 'Two beakers hold sugar solutions of 2 percent and 10 percent, separated by a membrane that only water can cross. In which direction is the net movement of water?',
  right: 'From the 2 percent solution to the 10 percent solution',
  wrong: ['From the 10 percent solution to the 2 percent solution', 'Sugar moves across and water does not', 'There is no movement of any kind'],
  sol: 'Water moves by osmosis towards the stronger solution, so it moves from the 2 percent side to the 10 percent side — option (@K). Sugar cannot cross, and molecules keep moving, so (@3) is wrong.',
  d: 2, c: 'application', t: [4],
}));
add('chk-plasmolysis', mcq({
  stem: 'A student puts a piece of onion peel in a strong salt solution and sees the contents of each cell pulling away from the cell wall. This is called:',
  right: 'plasmolysis',
  wrong: ['endosmosis', 'diffusion of the wall', 'turgor'],
  sol: 'In a stronger solution the cell loses water by exosmosis and the protoplast shrinks away from the wall; this is plasmolysis — option (@K). Endosmosis would swell the cell and turgor is firmness from water.',
  d: 2, c: 'application', t: [4],
}));
add('fert-mcq', mcq({
  stem: 'After heavy dosing with a very strong chemical fertiliser, the plants in a field wilt even though the soil is wet. The most likely reason is that:',
  right: 'the soil solution is stronger than the root cell sap, so water leaves the root cells',
  wrong: ['the soil solution is weaker than the root cell sap, so water leaves the root cells', 'the roots take in too much water and the cells burst', 'diffusion of fertiliser into the cells fills the vacuole'],
  sol: 'A very strong soil solution is hypertonic to the root cells, so water leaves them by exosmosis and the plant wilts — option (@K). The reverse would make cells gain water.',
  d: 3, c: 'analysis', t: [4],
}));
add('osmometer-mcq', mcq({
  stem: 'A potato osmometer is set up with sugar in the cavity and the potato stands in water. After three hours the liquid level in the cavity has risen. What does this show?',
  right: 'Water has entered the cavity from the beaker by osmosis.',
  wrong: ['Sugar has moved out of the cavity into the beaker.', 'The potato has made new water.', 'Water has left the cavity and evaporated.'],
  sol: 'The sugar solution is stronger than the water outside, so water enters through the potato cells by osmosis and raises the level — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ar-raisin', ar({
  a: 'Dry raisins swell when they are soaked in water.',
  r: 'Diffusion does not need the cell to supply energy.',
  key: 'b',
  sol: 'A is true: water enters raisins by osmosis. R is also true, but it does not explain why raisins swell — option (b).',
  d: 2, c: 'analysis', t: [4],
}));
add('tf-diffusion', tf({
  stem: 'When oxygen enters a cell by diffusion, the cell has to supply energy for the movement.',
  key: 'f',
  sol: 'False. Diffusion is the movement of particles from higher to lower concentration, and it needs no energy from the cell.',
  d: 1, c: 'understanding', t: [4],
}));
add('fill-plasmolysed', fill({
  stem: 'A plant cell that has lost water so that its protoplast has shrunk away from the cell wall is said to be ______.',
  acc: [['plasmolysed', 'plasmolysed cell', 'plasmolyzed']],
  sol: 'Loss of water in a hypertonic solution shrinks the protoplast away from the wall: the cell is plasmolysed.',
  d: 1, c: 'recall', t: [4],
}));
add('num-radish', (() => {
  const a = 8.0, b = 7.4;
  const pct = ((a - b) / a) * 100;
  return num({
    stem: `A piece of radish with a mass of ${a.toFixed(1)} g is kept in a 5 percent salt solution for one hour. Its mass is then ${b.toFixed(1)} g. Find the percentage loss in mass.`,
    value: pct, tol: 0.05, unit: 'percent',
    sol: r`Loss in mass $= ${a.toFixed(1)} - ${b.toFixed(1)} = ${(a - b).toFixed(1)}\ \text{g}$. Percentage loss $= \dfrac{${(a - b).toFixed(1)}}{${a.toFixed(1)}} \times 100 = ${dec(pct, 2)}$ percent. The loss shows that water left the cells by exosmosis.`,
    scheme: [['Finds the loss in mass, 0.6 g', 1], ['Divides by the starting mass and multiplies by 100: 7.5', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near(((8.0 - 7.4) / 8.0) * 100, 7.5, 1e-9) && near(q.answer.value, 7.5, 1e-9) || 'radish');
add('s2-egg', short({
  marks: 2,
  stem: 'Two shell-less eggs of equal mass are placed one in pure water and one in a strong salt solution for an hour. State what happens to the mass of each egg and name the process.',
  model: 'The egg in pure water gains mass because water enters it by endosmosis. The egg in strong salt solution loses mass because water leaves it by exosmosis. In both cases water moves through the selectively permeable egg membrane by osmosis.',
  sol: 'Gain in water, loss in salt solution.',
  scheme: [['Egg in water swells and gains mass: endosmosis', 1], ['Egg in salt solution shrinks and loses mass: exosmosis', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s2-diffosm', short({
  marks: 2,
  stem: 'Give two differences between diffusion and osmosis.',
  model: 'Diffusion can happen for any particles, such as gases or dissolved substances, and needs no membrane. Osmosis is the movement of water only, and it must take place through a selectively permeable membrane towards the stronger solution.',
  sol: 'Which particles move, and the need for a membrane.',
  scheme: [['Diffusion: any particles; osmosis: water only', 1], ['Osmosis needs a selectively permeable membrane; diffusion does not', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s3-activity', short({
  marks: 3,
  stem: 'Describe a simple activity with dry raisins to show osmosis. State what you do, what you observe and what you conclude.',
  model: 'Weigh some dry raisins and divide them into two bowls, one with plain water and one with strong sugar solution. Leave them overnight, then weigh again. The raisins in plain water swell and gain mass, whereas those in the strong sugar solution stay shrunken. This shows that water moves through the raisin skin by osmosis towards the stronger solution.',
  sol: 'Set-up, observation and conclusion.',
  scheme: [['Raisins in plain water and in strong sugar solution', 1], ['Raisins in water swell; others stay shrunken', 1], ['Water moves by osmosis towards the stronger solution', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s3-wall', short({
  marks: 3,
  stem: 'A plant cell and an animal cell with no wall are placed in pure water. Explain why the plant cell becomes firm but stays whole, while the animal cell may swell and burst.',
  model: 'In pure water both cells take in water by endosmosis. In the plant cell the swelling protoplast presses against the rigid cellulose cell wall, which resists and stops it bursting, so the cell becomes turgid and firm. The animal cell has only a thin flexible membrane, which cannot resist the swelling much, so it may burst.',
  sol: 'Both take in water; the wall resists in the plant cell.',
  scheme: [['Water enters both cells by endosmosis', 1], ['Plant cell wall resists swelling: turgid, firm', 1], ['Animal cell has no wall: it may burst', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('long-osmometer', long({
  stem: 'Describe how you would show osmosis using a potato osmometer. Draw a labelled diagram and write the apparatus, the procedure, the observation and the conclusion.',
  model: 'Take a large potato, peel it and scoop out a cavity. Put some sugar solution in the cavity and mark its level with a pin. Stand the potato in a beaker of water. After a few hours the level in the cavity has risen above the pin. A labelled diagram shows the potato, the cavity with sugar solution, the pin marking the level and the water in the beaker. The conclusion is that water entered the cavity through the potato cells by osmosis, towards the stronger sugar solution.',
  sol: 'Diagram, procedure, observation and conclusion.',
  scheme: [['Labelled diagram', 1.5], ['Procedure with sugar in the cavity and the potato in water', 1.5], ['Observation: level rises', 1], ['Conclusion: osmosis towards the stronger solution', 1]],
  d: 2, c: 'application', t: [4],
}));
add('long-tonic', long({
  stem: 'A cell can be kept in a weaker solution, an equal solution or a stronger solution. For each case, state the term for the solution, what happens to the water movement and what a plant cell looks like. Name the processes involved.',
  model: 'In a weaker, hypotonic solution water enters the cell by endosmosis, and a plant cell swells and becomes turgid. In an equal, isotonic solution there is no net movement of water, and the cell stays firm but not swollen. In a stronger, hypertonic solution water leaves the cell by exosmosis. A plant cell then shrinks and its protoplast pulls away from the wall, which is called plasmolysis.',
  sol: 'Three solutions with term, movement and appearance.',
  scheme: [['Hypotonic: endosmosis, turgid cell', 1.5], ['Isotonic: no net movement, firm cell', 1], ['Hypertonic: exosmosis, plasmolysis', 1.5], ['Terms used correctly throughout', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('case-carrot', (() => {
  const start = 8.0;
  const rows = [
    { c: 0, f: 8.8 },
    { c: 2, f: 8.2 },
    { c: 4, f: 7.6 },
    { c: 6, f: 7.2 },
  ].map((x) => ({ ...x, pct: ((x.f - start) / start) * 100 }));
  const iso = rows[1].c + ((rows[2].c - rows[1].c) * rows[1].pct) / (rows[1].pct - rows[2].pct);
  const table = rows.map((x) => `| ${x.c} | ${start.toFixed(1)} | ${x.f.toFixed(1)} |`).join('\n');
  return mk.case({
    passage: `A class cuts four carrot sticks of equal mass and leaves each for one hour in a salt solution of a different strength. The table shows the masses (illustrative data).

| Salt in solution (percent) | Mass at start (g) | Mass after one hour (g) |
|---|---|---|
${table}`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'The stick kept in plain water (0 percent salt) was in:',
        right: 'a hypotonic solution, so it gained water',
        wrong: ['a hypertonic solution, so it gained water', 'a hypotonic solution, so it lost water', 'an isotonic solution, so it gained water'],
        sol: 'Plain water is weaker than the carrot cell sap, so it is hypotonic and water enters the cells: the mass rises from 8.0 g to 8.8 g — option (@K).',
        d: 2, c: 'application', t: [4],
      })),
      part('b', short({
        marks: 1,
        stem: 'Calculate the percentage change in mass of the stick in the 4 percent solution.',
        model: `Change is 7.6 minus 8.0, which is −0.4 g, so the percentage change is −0.4 divided by 8.0 times 100, that is ${dec(rows[2].pct, 2)} percent (a loss of ${dec(-rows[2].pct, 2)} percent).`,
        sol: `(7.6 − 8.0) ÷ 8.0 × 100 = ${dec(rows[2].pct, 2)} percent.`,
        scheme: [['−5 percent (a loss of 5 percent)', 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: `Estimate the salt strength at which the carrot would neither gain nor lose mass. Assume the change varies in a straight line between the 2 percent and 4 percent solutions.`,
        model: `Between 2 and 4 percent the change goes from +${dec(rows[1].pct, 2)} to ${dec(rows[2].pct, 2)} percent, a swing of ${dec(rows[1].pct - rows[2].pct, 2)} over 2 units. Zero is reached ${dec(rows[1].pct, 2)} ÷ ${dec(rows[1].pct - rows[2].pct, 2)} of the way, so the strength is about ${dec(iso, 2)} percent.`,
        sol: `2 + 2 × (2.5 ÷ 7.5) ≈ ${dec(iso, 2)} percent.`,
        scheme: [['Percentage changes at 2 and 4 percent: +2.5 and −5', 1], ['Interpolation to about 2.7 percent', 1]],
        d: 3, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2, wl: null,
          stem: 'A shopkeeper wants fresh carrots to stay firm in a bucket of water. Should he add salt to the water? Use the table to support your answer.',
          model: 'No. Carrots gain water and stay firm in plain water, since their mass rises by 10 percent there. Adding salt makes the solution stronger, and above about 2.7 percent salt the carrots lose water and become soft.',
          sol: 'Plain water makes the carrot gain water; salt beyond 2.7 percent makes it lose.',
          scheme: [['Says no and cites the gain in plain water', 1], ['Salt above about 2.7 percent causes water loss', 1]],
          d: 3, c: 'evaluation', t: [4],
        }),
      ]),
    ],
  });
})(), null);

// ---------------------------------------------------------------- t05 cell division and recent advances
add('chk-meiosis', (() => {
  const body = CHR.maize;
  const g = body / 2;
  return mcq({
    stem: `A maize body cell has ${body} chromosomes. How many chromosomes are present in a pollen grain nucleus of the same plant?`,
    right: String(g),
    wrong: [String(body), String(body * 2), String(g / 2)],
    sol: `A pollen grain is a gamete made by meiosis, which halves the number: ${body} ÷ 2 = ${g} — option (@K). The number ${body} would be right for a body cell, and ${body * 2} would be a doubled number.`,
    d: 2, c: 'application', t: [5],
  });
})(), () => near(CHR.maize / 2, 10, 1e-9) || 'maize');
add('fly-mcq', (() => {
  const z = CHR.fruitfly;
  return mcq({
    stem: `A fruit fly zygote has ${z} chromosomes. A body cell of the adult fly and a sperm cell of the same fly will have, respectively:`,
    right: `${z} and ${z / 2}`,
    wrong: [`${z / 2} and ${z / 2}`, `${z} and ${z}`, `${z * 2} and ${z}`],
    sol: `The adult grows by mitosis, so its body cells keep ${z} chromosomes. A sperm is made by meiosis and has half, ${z / 2} — option (@K).`,
    d: 2, c: 'application', t: [5],
  });
})(), () => CHR.fruitfly / 2 === 4 || 'fly');
add('stem-mcq', mcq({
  stem: 'A clinic advertises that stem cell treatment can cure every disease. Which response is best supported at present?',
  right: 'Stem cells are used in some treatments, such as bone marrow transplants for blood diseases, but many other claims are still under research.',
  wrong: ['The claim is correct, because stem cells can become any cell and so can cure everything.', 'Stem cells cannot divide, so they have no medical use at all.', 'Stem cells exist only in embryos and cannot be used in adults.'],
  sol: 'Bone marrow transplant is an established use, while many other uses are being researched, so an all-disease cure is not supported — option (@K). Stem cells can divide, and adults also have them.',
  d: 4, c: 'evaluation', t: [5],
}));
add('em-mcq', mcq({
  stem: 'Why can an electron microscope show organelles in much finer detail than a school light microscope?',
  right: 'It uses a beam of electrons and can show much smaller details.',
  wrong: ['It uses glowing dyes to colour living cells.', 'It uses sunlight with stronger mirrors.', 'It makes cells divide so that they look bigger.'],
  sol: 'An electron microscope uses a beam of electrons and resolves details far too small for light — option (@K). Glowing dyes belong to fluorescence microscopy, and microscopes do not make cells divide.',
  d: 2, c: 'understanding', t: [5],
}));
add('ar-mitosis-cells', ar({
  a: 'The cells that line the inside of the intestine are replaced regularly.',
  r: 'Mitosis makes new identical cells that replace worn-out cells.',
  key: 'a',
  sol: 'Worn-out cells are replaced by new ones made by mitosis, so R correctly explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('ar-sperm', ar({
  a: 'A human sperm cell contains 23 chromosomes.',
  r: 'Sperm cells are formed by mitosis.',
  key: 'c',
  sol: 'A sperm is a gamete with half of 46, that is 23, so A is true. Gametes form by meiosis and not by mitosis, so R is false — option (c).',
  d: 2, c: 'analysis', t: [5],
}));
add('tf-zygote', tf({
  stem: 'A fertilised egg of a pea plant has the same number of chromosomes as an ordinary body cell of that plant.',
  key: 't',
  sol: 'True. Two gametes, each with half the number, fuse, so the zygote has the full number, the same as a body cell.',
  d: 2, c: 'understanding', t: [5],
}));
add('fill-metaphase', fill({
  stem: 'The stage of mitosis in which the chromosomes line up in the middle of the cell is called ______.',
  acc: [['metaphase']],
  sol: 'Chromosomes line up at the equator in metaphase, are pulled apart in anaphase.',
  d: 1, c: 'recall', t: [5],
}));
add('num-pea', (() => {
  const body = CHR.pea;
  const k = 3;
  const cells = 2 ** k;
  const total = cells * body;
  return num({
    stem: `A pea root-tip cell has ${body} chromosomes and divides by mitosis ${k} times in a row. What is the total number of chromosomes in all the cells formed?`,
    value: total, tol: 0,
    sol: `Each mitosis doubles the number of cells, so ${k} rounds give 2 × 2 × 2 = ${cells} cells. Each cell keeps ${body} chromosomes, so the total is ${cells} × ${body} = ${total}.`,
    scheme: [['Finds the number of cells: 8', 1], ['Multiplies by 14 to get 112', 1]],
    marks: 2, d: 3, c: 'application', t: [5],
  });
})(), (q) => 2 ** 3 * 14 === 112 && q.answer.value === 112 || 'pea');
add('s2-cut', short({
  marks: 2,
  stem: 'A cut on a cyclist\'s knee heals within a few days. Name the cell division that makes this possible and explain how it helps.',
  model: 'The division is mitosis. Cells near the wound divide by mitosis to make many new cells that are identical to the old ones, with the same number of chromosomes. These new cells replace the damaged ones and close the cut, so the skin is repaired.',
  sol: 'Mitosis produces new identical cells that repair the wound.',
  scheme: [['Mitosis named', 1], ['New identical cells replace damaged ones, repairing the cut', 1]],
  d: 2, c: 'application', t: [5],
}));
add('s2-advances', short({
  marks: 2,
  stem: 'Give one use of stem cells and one use of a fluorescence microscope. Say which use is well established.',
  model: 'Stem cells in bone marrow are transplanted to treat some blood diseases, and this is a well-established use, while many other uses are still under research. A fluorescence microscope uses glowing dyes to show where a chosen substance lies inside a living cell.',
  sol: 'Bone marrow transplant is the established use of stem cells.',
  scheme: [['Stem cells: bone marrow transplant, established', 1], ['Fluorescence microscope shows a chosen part with glowing dyes', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s3-halving', short({
  marks: 3,
  stem: 'Suppose gametes were made by mitosis instead of meiosis. What would happen to the chromosome number of the zygote in each generation? How does meiosis prevent this problem?',
  model: 'If gametes were made by mitosis, each would have the full number. Two gametes would then give a zygote with double the number, and the number would keep doubling in every generation. Meiosis prevents this because it halves the chromosome number in each gamete, so fertilisation brings it back to the normal number.',
  sol: 'Doubling each generation unless meiosis halves the number.',
  scheme: [['Mitosis gametes would carry the full number', 1], ['The zygote would have double and so on each generation', 1], ['Meiosis halves the number and fertilisation restores it', 1]],
  d: 4, c: 'analysis', t: [5],
}));
add('long-mitmei', long({
  stem: 'Compare mitosis and meiosis on five points. A cell of a certain plant has 12 chromosomes; state how many cells and how many chromosomes in each cell result from one mitosis and from one meiosis.',
  model: 'Mitosis takes place in body cells, but meiosis takes place in reproductive organs. Mitosis has one division and meiosis has two. Mitosis gives two cells and meiosis gives four. Mitosis keeps the chromosome number and meiosis halves it. Mitosis serves growth and repair, and meiosis makes gametes. For a cell with 12 chromosomes, mitosis gives 2 cells with 12 each, and meiosis gives 4 cells with 6 each.',
  sol: 'Five points; 2 cells of 12 and 4 cells of 6.',
  scheme: [['Five correct points of comparison, one-half mark each', 2.5], ['Mitosis: 2 cells with 12', 1], ['Meiosis: 4 cells with 6', 1.5]],
  d: 3, c: 'application', t: [5],
}));
add('case-chromosomes', mk.case({
  passage: `A student copies chromosome numbers from a reference book into a table, but one row has a mistake.

| Organism | Chromosomes in a body cell | Chromosomes in a gamete |
|---|---|---|
| Human | 46 | 23 |
| Onion | 16 | 8 |
| Pea | 14 | 14 |
| Rice | 24 | 12 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The mistake is in the row for:',
      right: 'pea',
      wrong: ['human', 'onion', 'rice'],
      sol: 'A gamete should have half the body-cell number. Human, onion and rice follow this rule, but pea shows 14 and 14, which is wrong — option (@K).',
      d: 2, c: 'analysis', t: [5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Write the correct number for the pea gamete.',
      model: 'The pea gamete has 7 chromosomes, half of 14.',
      sol: '14 ÷ 2 = 7.',
      scheme: [['7', 1]],
      d: 1, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'A rice zygote divides by mitosis twice. Find the number of cells formed and the number of chromosomes in each.',
      model: 'The rice zygote has 24 chromosomes. Two rounds of mitosis give 2 × 2 = 4 cells, and each keeps 24 chromosomes because mitosis does not change the number.',
      sol: '4 cells, 24 chromosomes each.',
      scheme: [['4 cells', 1], ['24 chromosomes in each cell', 1]],
      d: 3, c: 'application', t: [5],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'A pea gamete fuses with another pea gamete. How many chromosomes will the zygote have, and why?',
        model: 'The zygote has 14 chromosomes. Each pea gamete has 7, and fertilisation joins them, 7 + 7 = 14, restoring the number of a body cell.',
        sol: '7 + 7 = 14.',
        scheme: [['14 chromosomes', 1], ['Two gametes of 7 fuse, restoring the number', 1]],
        d: 2, c: 'application', t: [5],
      }),
    ]),
  ],
}), null);
add('case-stem', mk.case({
  passage: `A hospital leaflet says: “A child with a blood disease was treated with a transfusion of bone marrow stem cells from a matching donor and recovered well.” A second leaflet from a clinic claims that injections of stem cells can also “make any damaged organ new again in one week”. The doctors in the hospital say that research on many such uses is still going on. Researchers also use a fluorescence microscope, which shows a chosen protein glowing in a living cell, to study how cells divide.`,
  d: 3, c: 'evaluation',
  children: [
    part('a', mcq({
      stem: 'Which statement in the passage describes an established use of stem cells?',
      right: 'Bone marrow stem cells given to a child with a blood disease',
      wrong: ['Making any damaged organ new in one week', 'Injections that cure every disease', 'Making cells divide faster in a microscope'],
      sol: 'Bone marrow transplant is the established use, option (@K). The claims of renewing any organ in a week are not established.',
      d: 1, c: 'understanding', t: [5],
    })),
    part('b', short({
      marks: 1,
      stem: 'What does a fluorescence microscope help the researchers to see?',
      model: 'It shows where a chosen protein or part lies inside a living cell, by making it glow.',
      sol: 'A chosen part glows.',
      scheme: [['Chosen part of a living cell made to glow', 1]],
      d: 1, c: 'understanding', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Evaluate the second leaflet’s claim. Should a family trust it? Give two reasons.',
      model: 'The family should not trust it without proof. The claim is much stronger than the established uses, which are limited, such as bone marrow transplants. Doctors say research on other uses is still going on, so a cure in one week is not supported by evidence.',
      sol: 'Not established; research still going on.',
      scheme: [['Not trusted: it goes beyond established uses', 1], ['Research is still going on, so no evidence for a week-long cure', 1]],
      d: 3, c: 'evaluation', t: [5],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Suggest two questions a family should ask a clinic before accepting any stem cell treatment.',
        model: 'They should ask whether the treatment is an established one that doctors in recognised hospitals use, and what scientific evidence shows that it works and is safe for that disease.',
        sol: 'Is it established, and what is the evidence.',
        scheme: [['Question about whether the treatment is established', 1], ['Question about evidence of safety and benefit', 1]],
        d: 3, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}), null);
add('match-scientist', match({
  pairs: [['Robert Hooke', 'Named cells in thin slices of cork'], ['Leeuwenhoek', 'Saw living single cells in pond water'], ['Theodor Schwann', 'Said that animals are made of cells'], ['Rudolf Virchow', 'Said that new cells come from existing cells']],
  order: [3, 1, 0, 2],
  stem: 'Match each scientist (column I) with the finding (column II).',
  sol: 'Hooke named cells in cork; Leeuwenhoek saw living single cells; Schwann studied animals; Virchow said cells arise from cells.',
  d: 1, c: 'recall', t: [1],
}));
void r;
