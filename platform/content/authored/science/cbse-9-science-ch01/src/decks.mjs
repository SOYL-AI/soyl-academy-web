// ch01 Cell: two decks. Part 1 (t01 to t03): discovery, plant and animal cells, prokaryotes and eukaryotes, organelles.
// Part 2 (t04 to t05): membrane, diffusion, osmosis, cell division and recent advances.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { PLANT_CELL, ANIMAL_CELL, PRO_EUK, OSMOSIS, PLASMOLYSIS, MITOSIS_MEIOSIS } from './svgs.mjs';
import { MAG, POTATO, ISO_TXT, CHR } from './data.mjs';

export const V = {
  plant: svgV(PLANT_CELL, 'Labelled schematic of a plant cell with cell wall, membrane, nucleus, large central vacuole, chloroplasts, mitochondria, rough ER and Golgi apparatus', 'A plant cell: schematic, not to scale.'),
  animal: svgV(ANIMAL_CELL, 'Labelled schematic of an animal cell with membrane, nucleus, nucleolus, mitochondria, small vacuoles, lysosomes, rough ER and Golgi apparatus', 'An animal cell: schematic, not to scale.'),
  proEuk: svgV(PRO_EUK, 'A bacterium with a nucleoid and no nuclear membrane drawn beside an animal cell with a true nucleus and organelles', 'Prokaryotic and eukaryotic cells: schematic, not to scale.'),
  osmosis: svgV(OSMOSIS, 'A funnel with sugar solution, closed by a membrane, in a beaker of water; the level in its stem rises as water enters', 'Water passes in through the membrane and the level rises: schematic.'),
  plasmolysis: svgV(PLASMOLYSIS, 'Three plant cells: swollen in a weaker solution, firm in an equal solution, and shrunken away from the wall in a stronger solution', 'What a plant cell does in three kinds of solution: schematic.'),
  mitMei: svgV(MITOSIS_MEIOSIS, 'Flow chart comparing mitosis, which gives two cells with the same chromosome number, and meiosis, which gives four cells with half the number', 'Chromosome numbers in mitosis and meiosis: schematic.'),
  timeline: table(
    ['Year', 'Scientist', 'What was found'],
    [
      ['1665', 'Robert Hooke', 'Saw box-like compartments in a thin slice of cork and called them cells'],
      ['1670s', 'Antonie van Leeuwenhoek', 'Saw living single cells, such as bacteria and pond organisms, with a single-lens microscope'],
      ['1838', 'Matthias Schleiden', 'Concluded that all plants are made of cells'],
      ['1839', 'Theodor Schwann', 'Concluded that all animals are made of cells'],
      ['1855', 'Rudolf Virchow', 'Stated that new cells arise only from existing cells'],
    ],
    'Table of five scientists, the year and what each found about cells',
  ),
  plantAnimal: table(
    ['Feature', 'Plant cell', 'Animal cell'],
    [
      ['Cell wall', 'Present, made of cellulose', 'Absent'],
      ['Shape', 'Usually fixed, often box-like', 'Usually round or irregular'],
      ['Vacuole', 'One large central vacuole', 'Several small vacuoles, or none'],
      ['Plastids (chloroplasts)', 'Present in green parts', 'Absent'],
      ['Nucleus position', 'Often pushed to one side', 'Often near the centre'],
      ['Stored food', 'Starch', 'Glycogen'],
    ],
    'Table comparing plant and animal cells on six features',
  ),
  proEukTable: table(
    ['Feature', 'Prokaryotic cell', 'Eukaryotic cell'],
    [
      ['Nucleus', 'No nuclear membrane; DNA lies in the nucleoid', 'True nucleus with a nuclear membrane'],
      ['Organelles with membranes', 'Absent', 'Present'],
      ['Typical size', 'About 1 to 5 micrometres', 'About 10 to 100 micrometres'],
      ['DNA', 'Usually one circular piece', 'Several linear chromosomes'],
      ['Examples', 'Bacteria, cyanobacteria', 'Amoeba, yeast, plants, animals'],
    ],
    'Table comparing prokaryotic and eukaryotic cells with examples',
  ),
};

const T = (...a) => a;

export const deck1 = deck({
  part: 1,
  title: 'Cell, Part 1: discovery, kinds of cells and organelles',
  goals: [
    'Describe how cells were discovered and state the cell theory',
    'Compare plant and animal cells, and prokaryotic and eukaryotic cells, with examples',
    'Explain the function of the nucleus, mitochondria, ER, Golgi apparatus, lysosomes, vacuoles, plastids and cell wall',
    'Use magnification to find the actual size of a cell from a drawing',
  ],
  slides: [
    sl('title', 'Cell: the unit of life', {
      b: 'Part 1: how cells were found, what kinds there are, and what the parts inside them do.',
      v: table(['Cell', 'Typical size'], [['Bacterium', 'about 1 to 5 micrometres'], ['Human cheek cell', 'about 60 micrometres'], ['Human egg cell', 'about 0.1 millimetre'], ['Ostrich egg yolk', 'a few centimetres across']], 'Table of the approximate sizes of four cells, from tiny to very large'),
      n: 'Every living thing you can name, from a banyan tree to the bacteria on your skin, is built of cells. Most are far too small to see without a microscope. A few, like the yolk of an ostrich egg, are huge. In this part we learn how cells were discovered, how plant and animal cells differ, and what the tiny parts inside a cell do.',
    }),
    sl('concept', 'How cells were discovered', {
      b: 'A **cell** is the basic structural and functional unit of life. Cells were found only after microscopes were invented.',
      v: V.timeline,
      n: 'In sixteen sixty-five Robert Hooke looked at a thin slice of cork and saw many small box-like rooms. He called them cells. Later Leeuwenhoek used a single-lens microscope and saw living cells in pond water. In the eighteen thirties Schleiden and Schwann said that plants and animals are made of cells, and Virchow added that new cells come only from old cells.',
    }),
    sl('concept', 'The cell theory', {
      b: 'Three ideas together form the **cell theory**:\n\n1. All living organisms are made of one or more cells.\n2. The cell is the basic unit of structure and function.\n3. All cells arise from pre-existing cells.',
      v: flow('LR', [['a', 'Hooke sees cell walls in cork'], ['b', 'Leeuwenhoek sees living cells'], ['c', 'Schleiden and Schwann: plants and animals are made of cells'], ['d', 'Virchow: cells come from cells']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of four steps in the development of the cell theory'),
      n: 'The cell theory grew step by step. First came the sight of cells, then of living cells. Then Schleiden and Schwann joined plants and animals under one idea. Virchow completed it. Today we say three things: all organisms are made of cells, the cell is the unit of structure and function, and every cell comes from a cell that already existed.',
    }),
    sl('concept', 'Cells differ in size and shape', {
      b: 'Cells are measured in **micrometres**. One millimetre is one thousand micrometres. Shape follows job: a nerve cell is long and thin, a red blood cell is a small flexible disc, a plant cell in a stem is long and tube-like.',
      v: table(['Cell', 'Shape', 'How shape helps'], [['Nerve cell', 'Long, with branches', 'Carries signals over long distances'], ['Red blood cell', 'Small round disc', 'Squeezes through narrow blood vessels'], ['Muscle cell', 'Long fibre', 'Shortens to produce movement'], ['Root hair cell', 'Long thin extension', 'Reaches more soil water']], 'Table of four cells, their shapes and how each shape suits the job'),
      n: 'Cells come in many shapes and sizes, measured in micrometres. A micrometre is a thousandth of a millimetre. A nerve cell is long and branched so that it can carry signals far. A red blood cell is a small disc that squeezes through narrow vessels. A root hair cell has a long thin extension that reaches more of the water in the soil.',
    }),
    sl('example', 'Worked example: size from a drawing', {
      b: r`**Problem.** A student draws an onion peel cell. The drawing is ${MAG.image_mm} mm long and the magnification is ${MAG.m} times. Find the actual length of the cell in micrometres.

**Step 1.** Magnification $= \dfrac{\text{size of drawing}}{\text{actual size}}$, so actual size $= \dfrac{\text{size of drawing}}{\text{magnification}}$.

**Step 2.** Actual size $= \dfrac{${MAG.image_mm}\ \text{mm}}{${MAG.m}} = ${MAG.actual_mm}\ \text{mm}$.

**Step 3.** Convert: $${MAG.actual_mm}\ \text{mm} \times 1000 = ${MAG.actual_um}\ \mu\text{m}$.`,
      v: flow('LR', [['a', 'Drawing size'], ['b', 'Divide by magnification'], ['c', 'Actual size in mm'], ['d', 'Multiply by 1000: micrometres']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing the steps from drawing size to actual size in micrometres'),
      n: 'Here is how to find the real size of a cell. Divide the size of the drawing by the magnification. That gives the actual size in millimetres. To change millimetres into micrometres, multiply by one thousand. For the onion cell drawn twenty-four millimetres long at a magnification of four hundred, the actual length is sixty micrometres.',
    }),
    sl('check', 'Quick check: discovery', {
      b: 'Link a discovery to the scientist.',
      n: 'Quick check. Think about who saw what, and in which order the ideas of the cell theory were built.',
      chk: 'chk-discovery',
    }),
    sl('concept', 'A plant cell', {
      b: 'A plant cell has a rigid **cell wall** of cellulose outside the cell membrane, a large central **vacuole**, and green **chloroplasts** in the parts exposed to light.',
      v: V.plant,
      n: 'Look at the plant cell. Outside the thin cell membrane is a rigid cell wall of cellulose, which gives the cell its fixed shape. A large central vacuole filled with cell sap pushes the nucleus to the side. Green chloroplasts capture light for photosynthesis, and mitochondria release energy. The endoplasmic reticulum and the Golgi apparatus handle proteins and other products.',
    }),
    sl('concept', 'An animal cell', {
      b: 'An animal cell has **no cell wall** and no chloroplasts. Its nucleus is usually near the centre, and its vacuoles are small.',
      v: V.animal,
      n: 'Now the animal cell. It has only a flexible cell membrane, so animal cells can change shape and can have many forms. The nucleus often sits near the centre. Vacuoles are small, and there are lysosomes, mitochondria, endoplasmic reticulum and a Golgi apparatus. There are no chloroplasts, so an animal cell cannot make food by photosynthesis.',
    }),
    sl('concept', 'Plant cells and animal cells compared', {
      b: 'Both have a cell membrane, cytoplasm, nucleus, mitochondria, ER and Golgi apparatus. They differ in the features below.',
      v: V.plantAnimal,
      n: 'Plant and animal cells share many parts, such as the membrane, nucleus, mitochondria and Golgi apparatus. The differences matter in exams. Plant cells have a cellulose cell wall, one large central vacuole and chloroplasts. Animal cells have no wall and no chloroplasts, and their vacuoles are small. Plants store food as starch, while animals store it as glycogen.',
    }),
    sl('concept', 'Prokaryotic and eukaryotic cells', {
      b: 'In a **prokaryotic** cell the DNA lies free in a region called the **nucleoid**, with no nuclear membrane. A **eukaryotic** cell has a true nucleus and membrane-bound organelles.',
      v: V.proEuk,
      n: 'Cells fall into two big groups. In a prokaryotic cell, such as a bacterium, the DNA lies in a region called the nucleoid. There is no nuclear membrane and there are no organelles with membranes. In a eukaryotic cell, the DNA is inside a true nucleus, and organelles such as mitochondria and the Golgi apparatus are wrapped in membranes.',
    }),
    sl('check', 'Quick check: kinds of cells', {
      b: 'Decide whether a cell is prokaryotic or eukaryotic.',
      n: 'Quick check. Ask yourself one question first: is the DNA enclosed in a nuclear membrane or not?',
      chk: 'chk-kinds',
    }),
    sl('concept', 'Examples and differences', {
      b: 'Prokaryotes are mostly unicellular and small. Eukaryotes include single-celled organisms such as *Amoeba* and yeast, as well as all plants, animals and fungi.',
      v: V.proEukTable,
      n: 'Here are the differences in one place. Prokaryotes have no true nucleus and no membrane-bound organelles. Their DNA is usually one circular piece, and the cells are small. Eukaryotes have a true nucleus, organelles with membranes, several chromosomes and larger cells. Bacteria and cyanobacteria are prokaryotes. Amoeba, yeast, plants and animals are eukaryotes.',
    }),
    sl('concept', 'Nucleus, ER and Golgi apparatus', {
      b: 'The **nucleus** holds the DNA and controls the cell. The **rough ER**, studded with ribosomes, makes proteins; the **smooth ER** makes lipids and helps remove harmful substances. The **Golgi apparatus** modifies, packs and dispatches products in small sacs called vesicles.',
      v: flow('LR', [['a', 'Nucleus: instructions'], ['b', 'Ribosomes on rough ER make protein'], ['c', 'Golgi apparatus packs it'], ['d', 'Vesicle carries it out of the cell']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing the route of a protein from the nucleus to the outside of the cell'),
      n: 'Think of a cell as a small factory. The nucleus holds the instructions, written in DNA. Ribosomes on the rough endoplasmic reticulum build proteins by following them. The smooth endoplasmic reticulum makes fats and helps to remove harmful substances. The Golgi apparatus then modifies and packs the products into vesicles, which carry them to where they are needed.',
    }),
    sl('concept', 'Mitochondria, lysosomes and vacuoles', {
      b: '**Mitochondria** release energy from food in respiration, so they are called the powerhouses of the cell. **Lysosomes** hold enzymes that digest worn-out parts and germs. **Vacuoles** store water, food and wastes.',
      v: table(['Organelle', 'Structure', 'Job'], [['Mitochondrion', 'Double membrane; inner folds', 'Releases energy as ATP'], ['Lysosome', 'Small sac of enzymes', 'Digests waste and germs'], ['Vacuole', 'Fluid-filled sac', 'Stores water, food, wastes; keeps plant cells firm']], 'Table of mitochondria, lysosomes and vacuoles with their structure and job'),
      n: 'Mitochondria have two membranes, and the inner one is folded. They release energy from food during respiration, which is why we call them the powerhouses of the cell. Lysosomes are small sacs of digestive enzymes that break down worn-out parts and germs. Vacuoles are fluid-filled sacs for storage. In plants, the large vacuole also keeps the cell firm.',
    }),
    sl('concept', 'Plastids and the cell wall', {
      b: '**Plastids** are found only in plant cells. **Chloroplasts** contain chlorophyll for photosynthesis. **Chromoplasts** hold coloured pigments, and **leucoplasts** store starch, oil or protein. The **cell wall** is made of cellulose and is fully permeable.',
      v: table(['Structure', 'Where', 'Job'], [['Chloroplast', 'Green parts of plants', 'Photosynthesis'], ['Chromoplast', 'Petals, ripe fruit', 'Gives colour'], ['Leucoplast', 'Roots, potato tuber', 'Stores starch, oil or protein'], ['Cell wall', 'Outside the membrane of plant cells', 'Gives shape and protection']], 'Table of three kinds of plastid and the cell wall with their places and jobs'),
      n: 'Plastids are found only in plant cells. Chloroplasts are green because of chlorophyll, and they carry out photosynthesis. Chromoplasts give petals and ripe fruits their colours. Leucoplasts are colourless and store starch, oil or protein, for example in a potato. Outside all this, the cellulose cell wall gives shape and protection. Water and dissolved substances pass through it freely.',
    }),
    sl('example', 'Worked example: which cell is it?', {
      b: r`**Problem.** A student sees cell P under the microscope. It has a thick boundary outside the membrane, a large central sac and green oval bodies. Cell Q has a thin boundary only, many tiny sacs and no green bodies. Name the kind of cell in each case and give two reasons.

**Step 1.** Thick outer boundary, large vacuole and green bodies: cell wall, central vacuole and chloroplasts.

**Step 2.** So P is a **plant cell**. Q has no wall, no chloroplasts and small vacuoles: an **animal cell**.`,
      v: table(['Clue', 'Points to'], [['Cell wall', 'Plant'], ['Large central vacuole', 'Plant'], ['Chloroplasts', 'Plant'], ['No wall, small vacuoles', 'Animal']], 'Table linking observed clues to plant or animal cell'),
      n: 'Work like a detective. Cell P has a thick boundary outside the membrane, a large central vacuole and green oval bodies. These are a cell wall, a vacuole and chloroplasts, so P is a plant cell. Cell Q has only a thin boundary, many small vacuoles and no green bodies. It has no wall and no chloroplasts, so Q is an animal cell.',
    }),
    sl('check', 'Quick check: organelles', {
      b: 'Match an organelle to its job.',
      n: 'Quick check. Recall the job of each organelle, and decide which one fits the clue in the question.',
      chk: 'chk-organelle',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Hooke saw cells in cork; Leeuwenhoek saw living cells; Schleiden, Schwann and Virchow built the cell theory.',
        'Plant cells have a cellulose wall, a large vacuole and chloroplasts; animal cells do not.',
        'Prokaryotes have no true nucleus or membrane-bound organelles; eukaryotes have both.',
        'Nucleus controls; mitochondria release energy; ER and Golgi make and pack products; lysosomes digest.',
        'Actual size equals drawing size divided by magnification.',
      ],
      v: table(['Organelle', 'One-line job'], [['Nucleus', 'Controls the cell; holds DNA'], ['Mitochondrion', 'Releases energy'], ['Rough ER', 'Makes proteins'], ['Golgi apparatus', 'Packs and dispatches'], ['Lysosome', 'Digests']], 'Summary table of five organelles and their jobs'),
      n: 'Let us sum up. Cells were first seen by Hooke, and the cell theory was completed by Schleiden, Schwann and Virchow. Plant cells have a cell wall, a large vacuole and chloroplasts. Prokaryotes have no true nucleus. The nucleus controls the cell, mitochondria release energy, the endoplasmic reticulum and Golgi apparatus make and pack products, and lysosomes digest. Next we study how substances move across the membrane.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'In a diagram, draw labels in a straight line and use ruled lines that touch the part.',
        'Write "cellulose" for the plant cell wall and "chlorophyll" for the pigment in chloroplasts.',
        'When comparing cells, write both columns for every feature.',
        'Give examples when you are asked to distinguish prokaryotes from eukaryotes.',
        'Convert units before you use the magnification formula.',
      ],
      v: table(['Slip', 'Fix'], [['Calling mitochondria the place where energy is made from nothing', 'They release energy from food'], ['Writing "no nucleus" for bacteria', 'Say no true nucleus; DNA lies in the nucleoid'], ['Forgetting units', 'Write micrometres or millimetres']], 'Table of three common slips and their fixes'),
      n: 'Some exam tips. When you draw a cell, use ruled label lines that touch the part. Write cellulose for the plant cell wall and chlorophyll for the green pigment. In comparisons, fill in both sides of every row. Give examples such as bacteria and amoeba. And remember to convert units before using the magnification formula.',
    }),
  ],
});

const potatoRows = POTATO.map((p) => [`${p.conc} percent sugar`, p.start.toFixed(1), p.final.toFixed(1), `${p.pct > 0 ? '+' : ''}${p.pct.toFixed(0)} percent`]);

export const deck2 = deck({
  part: 2,
  title: 'Cell, Part 2: membrane, osmosis and cell division',
  goals: [
    'Explain diffusion and osmosis and relate them to the selectively permeable cell membrane',
    'Describe simple activities that show osmosis, and explain endosmosis, exosmosis and plasmolysis',
    'Outline mitosis and meiosis and compute chromosome numbers',
    'Give cautious textbook-level examples of recent advances in cell biology',
  ],
  slides: [
    sl('title', 'How cells exchange and divide', {
      b: 'Part 2: water and dissolved substances crossing the membrane, and how one cell becomes two.',
      v: table(['Everyday event', 'Cell idea behind it'], [['Dried raisins swell in water', 'Osmosis'], ['Wilted palak revives in water', 'Water enters cells'], ['Salt draws water out of a pickle', 'Water leaves cells'], ['A cut heals', 'Cells divide']], 'Table linking four everyday events to the cell idea behind each'),
      n: 'Why do dried raisins swell in water? Why does salt draw water out of raw mango pickle? Why does a wilted bunch of palak freshen up in a bowl of water? The answers lie in how substances cross the cell membrane. This part also shows how one cell divides into two, so that you grow and wounds heal.',
    }),
    sl('concept', 'The membrane is selective', {
      b: 'The **plasma membrane** is **selectively permeable**: it lets some substances pass freely, others slowly and some not at all.',
      v: table(['Substance', 'Crossing the membrane'], [['Oxygen, carbon dioxide', 'Pass freely'], ['Water', 'Passes through easily'], ['Glucose, ions', 'Pass slowly, helped by carriers'], ['Large proteins, starch', 'Cannot pass']], 'Table of four kinds of substance and how easily each crosses the cell membrane'),
      n: 'The plasma membrane works like a careful gatekeeper. Small molecules such as oxygen and carbon dioxide pass freely. Water passes through easily. Glucose and ions pass slowly, with the help of special carriers. Large molecules such as proteins and starch cannot pass. We call this property selective permeability.',
    }),
    sl('concept', 'Diffusion', {
      b: '**Diffusion** is the movement of particles from a region of **higher concentration** to a region of **lower concentration**, caused by their random motion. It needs no energy from the cell.',
      v: table(['Example', 'What diffuses', 'From where to where'], [['Smell of incense', 'Scent particles', 'Near the stick to the whole room'], ['Ink in a glass of water', 'Dye', 'Drop to all the water'], ['Gas exchange in a leaf', 'Carbon dioxide', 'Air to inside the leaf'], ['Cell respiration', 'Oxygen', 'Blood to the cell']], 'Table of four examples of diffusion in daily life and in cells'),
      n: 'Diffusion is the spreading of particles from where they are crowded to where they are fewer. You notice it when the smell of incense reaches the next room, or when a drop of ink colours a whole glass of water. Cells use diffusion to take in oxygen and let out carbon dioxide. Diffusion needs no energy from the cell.',
    }),
    sl('concept', 'Osmosis', {
      b: '**Osmosis** is the net movement of **water** through a selectively permeable membrane from a region of higher water concentration to a region of lower water concentration, that is, towards the stronger solution.',
      v: V.osmosis,
      n: 'Osmosis is diffusion of water across a selectively permeable membrane. Look at the funnel. The sugar solution inside has less free water than the pure water outside. So water moves in through the membrane. Sugar molecules are too big to move out. The level in the stem rises. Water always moves towards the region with more dissolved substance.',
    }),
    sl('concept', 'Activity: an egg in water', {
      b: 'Soak a raw egg in vinegar for a day to dissolve the shell. The thin **membrane** remains. Weigh the egg, then place it in pure water. In another set-up, use a strong sugar solution.',
      v: table(['Liquid outside', 'What happens', 'Reason'], [['Pure water', 'Egg swells and gains mass', 'Water enters: endosmosis'], ['Strong sugar solution', 'Egg shrinks and loses mass', 'Water leaves: exosmosis']], 'Table of the result of placing a shell-less egg in pure water and in strong sugar solution'),
      n: 'Here is a simple activity. Soak a raw egg in vinegar for a day. The shell dissolves, but a thin membrane remains. Put the egg in pure water, and it swells as water enters by osmosis. Put another in a strong sugar solution, and it shrinks as water leaves. Weighing the egg before and after shows the change.',
    }),
    sl('concept', 'Activity: raisins and the potato osmometer', {
      b: '**Raisins:** dry raisins swell in water and stay shrunken in strong sugar solution. **Potato osmometer:** scoop a cavity in a potato, add sugar, and stand it in water. Water enters and the sugar solution in the cavity rises.',
      v: flow('LR', [['a', 'Potato cavity holds sugar'], ['b', 'Potato stands in water'], ['c', 'Water enters by osmosis'], ['d', 'Level in cavity rises']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the four steps in the potato osmometer activity'),
      n: 'Two more activities. Drop dry raisins into water, and they swell as water enters. Keep others in strong sugar solution, and they stay shrunken. For the potato osmometer, scoop out a cavity, put sugar in it and stand the potato in water. Over a few hours, water enters through the potato cells and the level of liquid in the cavity rises.',
    }),
    sl('example', 'Worked example: potato strips', {
      b: r`**Problem (data given).** Four potato strips of $10.0\ \text{g}$ each are left for an hour in sugar solutions of different strengths. The table shows the final mass. Find the strength at which the mass would not change.

**Step 1.** Percentage change $= \dfrac{\text{final} - \text{initial}}{\text{initial}} \times 100$. For 5 percent sugar: $\dfrac{10.3 - 10.0}{10.0} \times 100 = +3$ percent. For 10 percent: $-6$ percent.

**Step 2.** The change goes from $+3$ to $-6$ between 5 and 10 percent, a swing of 9 over 5 units.

**Step 3.** Zero change is $\dfrac{3}{9}$ of the way: $5 + \dfrac{3}{9} \times 5 \approx ${ISO_TXT}$ percent. At about this strength the solution is isotonic with the potato cells.`,
      v: table(['Sugar solution', 'Start mass (g)', 'Final mass (g)', 'Change'], potatoRows, 'Table of the masses of four potato strips before and after one hour in sugar solutions (given data)'),
      n: 'Let us use data. Four potato strips of the same mass were kept in sugar solutions of different strengths. Work out the percentage change in mass for each. In pure water the strip gains, and in strong solutions it loses. The change goes from a gain to a loss between five and ten percent sugar, so the no-change point lies between them, at about six point seven percent.',
    }),
    sl('check', 'Quick check: osmosis', {
      b: 'Predict the direction of water movement.',
      n: 'Quick check. Compare the two sides of the membrane, and decide which side has more dissolved substance.',
      chk: 'chk-osmosis',
    }),
    sl('concept', 'Hypotonic, isotonic and hypertonic solutions', {
      b: 'In a **hypotonic** (weaker) solution water enters the cell: **endosmosis**. In an **isotonic** solution there is no net movement. In a **hypertonic** (stronger) solution water leaves: **exosmosis**. A plant cell that loses water shrinks away from its wall: **plasmolysis**.',
      v: V.plasmolysis,
      n: 'Compare the solution outside with the cell sap inside. In a weaker, or hypotonic, solution water enters the cell. This is endosmosis, and a plant cell becomes firm and turgid. In an isotonic solution there is no net movement. In a stronger, or hypertonic, solution water leaves the cell. This is exosmosis, and a plant cell shrinks away from its wall. That is called plasmolysis.',
    }),
    sl('concept', 'Osmosis in daily life', {
      b: 'Osmosis explains many everyday events. Roots take up water by osmosis, and the turgid cells keep leaves and stems firm.',
      v: table(['Observation', 'Explanation'], [['Wilted palak freshens in water', 'Cells gain water and become turgid'], ['Salt on cut raw mango pulls out liquid', 'Strong salt outside draws water out of cells'], ['Roots absorb water from moist soil', 'Root hair cells have stronger sap than the soil water, so water enters'], ['Drinking sea water makes you more thirsty', 'Water is drawn out of body cells towards the salt']], 'Table of four everyday observations and the osmosis explanation for each'),
      n: 'Osmosis is at work around you. A wilted bunch of palak becomes crisp in water because its cells take water in. Salt sprinkled on cut raw mango draws the liquid out. Roots absorb water from soil by osmosis. Drinking sea water does not quench thirst, because the strong salt solution draws water out of your body cells.',
    }),
    sl('check', 'Quick check: plasmolysis', {
      b: 'Identify what is happening to a cell.',
      n: 'Quick check. First decide whether the outside solution is weaker or stronger than the cell sap.',
      chk: 'chk-plasmolysis',
    }),
    sl('concept', 'Cell division: mitosis', {
      b: '**Mitosis** makes two identical cells from one. It gives growth, repair and replacement of worn-out cells. The chromosomes are copied first. The stages are prophase, metaphase, anaphase and telophase.',
      v: flow('LR', [['a', 'Prophase: chromosomes become visible'], ['b', 'Metaphase: line up in the middle'], ['c', 'Anaphase: copies pulled apart'], ['d', 'Telophase: two nuclei form'], ['e', 'Cytoplasm divides: two cells']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the stages of mitosis from prophase to two daughter cells'),
      n: 'Before a cell divides, its DNA is copied. In mitosis, the chromosomes become visible in prophase, line up in the middle in metaphase, and the copies are pulled apart in anaphase. In telophase two new nuclei form, and then the cytoplasm divides. The two daughter cells are identical to the parent. Mitosis gives growth, repair and replacement of cells.',
    }),
    sl('concept', 'Cell division: meiosis', {
      b: '**Meiosis** occurs in reproductive organs to make **gametes**. One cell divides twice to give four cells, each with **half** the chromosome number. Fertilisation then restores the full number.',
      v: V.mitMei,
      n: 'Meiosis is the division that makes gametes, which are sperms and egg cells, or pollen and egg cells in plants. A cell divides twice and gives four cells, each with half the number of chromosomes. When a sperm fuses with an egg at fertilisation, the full number is restored. Mitosis keeps the number the same, and meiosis halves it.',
    }),
    sl('example', 'Worked example: counting chromosomes', {
      b: r`**Problem.** An onion root-tip cell has ${CHR.onion} chromosomes. (a) How many chromosomes in each cell after three rounds of mitosis, and how many cells? (b) How many chromosomes in an onion gamete?

**Step 1.** Mitosis keeps the number: each cell still has ${CHR.onion}. Three rounds give $2 \times 2 \times 2 = 8$ cells.

**Step 2.** Meiosis halves the number: $${CHR.onion} \div 2 = ${CHR.onion / 2}$ in each gamete.`,
      v: table(['Process', 'Cells made', 'Chromosomes in each'], [['3 rounds of mitosis', '8', String(CHR.onion)], ['Meiosis (one cell)', '4', String(CHR.onion / 2)], ['Fertilisation', '1 zygote', String(CHR.onion)]], 'Table of cells and chromosome numbers after mitosis, meiosis and fertilisation in onion'),
      n: 'Let us count. An onion root-tip cell has sixteen chromosomes. After one round of mitosis there are two cells, after two rounds four, and after three rounds eight cells, each still with sixteen chromosomes. Meiosis halves the number, so each onion gamete has eight. When two gametes fuse, the zygote has sixteen again.',
    }),
    sl('concept', 'Mitosis and meiosis compared', {
      b: 'Compare the two divisions on four points: where, how many divisions, how many cells and what number of chromosomes.',
      v: table(['Feature', 'Mitosis', 'Meiosis'], [['Where', 'Body cells', 'Reproductive organs'], ['Divisions', 'One', 'Two'], ['Cells formed', 'Two', 'Four'], ['Chromosomes', 'Same as parent', 'Half of parent'], ['Purpose', 'Growth, repair', 'Making gametes']], 'Table comparing mitosis and meiosis on five features'),
      n: 'Here is the comparison. Mitosis takes place in body cells, has one division and makes two cells with the same chromosome number as the parent. Its purpose is growth and repair. Meiosis takes place in reproductive organs, has two divisions and makes four cells with half the number. Its purpose is to make gametes.',
    }),
    sl('check', 'Quick check: meiosis', {
      b: 'Work out the chromosome number of a gamete.',
      n: 'Quick check. Remember that mitosis keeps the chromosome number and meiosis halves it.',
      chk: 'chk-meiosis',
    }),
    sl('concept', 'Recent advances in cell biology', {
      b: 'New tools let us see and use cells better. Some uses are well established, others are still being researched.',
      v: table(['Advance', 'What it is', 'Cautious note'], [['Stem cells', 'Cells that can divide and become specialised', 'Bone marrow transplants are an established treatment; many other uses are still under research'], ['Fluorescence microscopy', 'Glowing dyes light up chosen parts of a cell', 'Shows where a substance is inside a living cell'], ['Electron microscopy', 'Uses a beam of electrons', 'Shows details far too small for a light microscope; samples are not alive'], ['Cell culture', 'Growing cells in a dish', 'Used to test medicines and study diseases']], 'Table of four advances in cell biology with a cautious note on each'),
      n: 'Cell biology keeps moving. Stem cells can divide and become many kinds of specialised cell. Bone marrow transplants, which use such cells, are an established treatment for some blood diseases, while many other uses are still being researched. Fluorescence microscopes use glowing dyes to light up chosen parts of a living cell. Electron microscopes show structures far too small for ordinary light microscopes.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'The plasma membrane is selectively permeable.',
        'Diffusion: particles move from higher to lower concentration. Osmosis: water moves through a membrane towards the stronger solution.',
        'Hypotonic gives endosmosis; hypertonic gives exosmosis and plasmolysis in plant cells.',
        'Mitosis: one division, two identical cells. Meiosis: two divisions, four cells with half the chromosomes.',
        'Stem cells, fluorescence and electron microscopes are recent advances, used with care.',
      ],
      v: table(['Term', 'Meaning in one line'], [['Endosmosis', 'Water enters the cell'], ['Exosmosis', 'Water leaves the cell'], ['Plasmolysis', 'Protoplast shrinks away from the wall'], ['Gamete', 'Sex cell with half the chromosomes']], 'Summary table of four key terms from Part 2'),
      n: 'To sum up Part 2. The plasma membrane is selectively permeable. Diffusion moves particles from higher to lower concentration. Osmosis moves water through a membrane towards the stronger solution. In a weaker solution cells gain water, and in a stronger solution they lose it, and plant cells may plasmolyse. Mitosis makes two identical cells, while meiosis makes four gametes with half the chromosomes.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Always say "water moves" in osmosis, not "solute moves".',
        'Name the solution (hypotonic, isotonic or hypertonic) before describing what the cell does.',
        'Use "net movement" when you explain diffusion and osmosis.',
        'For chromosome numbers, write the working: halve for meiosis, keep the same for mitosis.',
        'For recent advances, name one use and say whether it is established or still being researched.',
      ],
      v: table(['Slip', 'Fix'], [['Saying sugar enters the egg', 'Water enters; sugar is too big to pass'], ['Writing that meiosis gives two cells', 'It gives four, with half the number'], ['Calling plasmolysis a gain of water', 'It is a loss of water']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Some exam tips. In osmosis it is always water that moves. Name the kind of solution first, then say what the cell does. Use the words net movement. Show your working for chromosome numbers: halve for meiosis and keep the same for mitosis. And for recent advances, name a use, and say whether it is established or still under research.',
    }),
  ],
});
void T;
