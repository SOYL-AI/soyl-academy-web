// ICSE 10 Biology ch05 Photosynthesis — question bank in ICSE 2027 style, experiment-heavy.
// Detailed equations of the dark reaction are a removed topic and are not asked. Atom counts and hydrilla rates come from calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { EQ, HYD } from './calc.mjs';
import { CHLOROPLAST_LETTERED, WATERBATH, LIGHTSCREEN, MOLL, VARIEGATED, HYDRILLA, BUBBLES, CARBON } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const chloroFig = svgV(CHLOROPLAST_LETTERED, 'A chloroplast with five parts lettered A to E');
const bathFig = svgV(WATERBATH, 'Removing chlorophyll from a leaf in a water bath');
const screenFig = svgV(LIGHTSCREEN, 'Light screen experiment before and after the starch test');
const mollFig = svgV(MOLL, "Moll's half-leaf experiment with potassium hydroxide");
const variFig = svgV(VARIEGATED, 'A variegated leaf before and after the starch test');
const hydFig = svgV(HYDRILLA, 'Collecting oxygen from hydrilla in light');
const bubFig = svgV(BUBBLES, 'Bubbles of oxygen per minute from hydrilla under different conditions');
const cycleFig = svgV(CARBON, 'The carbon cycle');
const EQUATION = String.raw`\ce{6CO2 + 12H2O -> C6H12O6 + 6O2 + 6H2O}`;

// ---------------------------------------------------------------- t01 definition, equation and significance
add('raw-mcq', mcq({
  stem: 'The raw materials of photosynthesis are',
  right: 'carbon dioxide and water', wrong: ['oxygen and glucose', 'glucose and water', 'carbon dioxide and oxygen'],
  sol: 'Carbon dioxide from the air and water from the soil are combined to form glucose — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('byproduct-mcq', mcq({
  stem: 'Oxygen is called a by-product of photosynthesis because',
  right: 'the main product is food (glucose), and oxygen is given out as an extra product', wrong: ['it is used up during photosynthesis', 'it is produced only at night', 'it is taken in from the air'],
  sol: 'The purpose of the process is to make glucose; oxygen from split water is released as a by-product — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('energy-ar', ar({
  a: 'Photosynthesis converts light energy into chemical energy.',
  r: 'Photosynthesis releases oxygen into the air.',
  key: 'd',
  sol: 'Both are true, but releasing oxygen does not explain the energy change; the energy is stored in glucose — option (d).',
  d: 2, c: 'analysis', t: [1],
}));
add('night-tf', tf({
  stem: 'Green plants carry out photosynthesis at night as fast as they do by day.',
  key: 'f',
  sol: 'False. Photosynthesis needs light, so it stops in darkness.',
  d: 1, c: 'understanding', t: [1],
}));
add('photo-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the process by which green plants make glucose from carbon dioxide and water, using light energy trapped by chlorophyll.',
  model: '**Photosynthesis.**',
  sol: 'Photosynthesis.', scheme: [['Photosynthesis', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-raw', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Carbon dioxide, Water, Light, Oxygen.',
  model: '**Oxygen**; the others are **requirements (inputs) of photosynthesis**.',
  sol: 'Oxygen is a product.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('equation-short', short({
  marks: 2,
  stem: 'Write the balanced chemical equation for photosynthesis and state the two conditions written over the arrow.',
  model: `$${EQUATION}$. The conditions written over the arrow are **sunlight** and **chlorophyll**.`,
  sol: 'Balanced equation; sunlight and chlorophyll.',
  scheme: [['Balanced equation', 1], ['Sunlight and chlorophyll', 1]],
  wl: null,
  d: 1, c: 'recall', t: [1],
}));
add('atoms-num', num({
  stem: 'Count the oxygen atoms on the left-hand side of the balanced equation 6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O.',
  value: EQ.left.O,
  sol: `Left side: $6 \\times 2 + 12 \\times 1 = ${EQ.left.O}$ oxygen atoms (the right side also has ${EQ.right.O}).`,
  scheme: [[`${EQ.left.O}`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 24 || 'value');

// ---------------------------------------------------------------- t02 chloroplast; stomata and carbon dioxide supply
add('grana-mcq', mcq({
  stem: 'The light phase of photosynthesis takes place in the',
  right: 'grana (thylakoids) of the chloroplast', wrong: ['stroma of the chloroplast', 'cytoplasm of the cell', 'mitochondria'],
  sol: 'Chlorophyll in the thylakoid membranes of the grana traps light — option (@K).',
  d: 1, c: 'recall', t: [2, 3],
}));
add('fig-granum-mcq', mcq({
  stem: 'In the figure of a chloroplast, which letter marks a stack of disc-shaped sacs that contain chlorophyll?',
  right: 'B', wrong: ['A', 'C', 'D'],
  sol: 'B is a granum. A is the envelope, C a stroma lamella, D the stroma and E a starch grain — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [chloroFig],
}));
add('stomata-co2-mcq', mcq({
  stem: 'On a bright morning, potassium ions move into the guard cells of a leaf. How does this help photosynthesis?',
  right: 'The stomata open, so carbon dioxide can diffuse into the leaf', wrong: ['The stomata close, so no water is lost', 'Potassium ions are built into glucose', 'Chlorophyll is made from potassium ions'],
  sol: 'K+ entry makes the guard cells turgid, opening the stomata for carbon dioxide to enter — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('grana-ar', ar({
  a: 'The grana of a chloroplast appear green.',
  r: 'The grana lie inside the chloroplast.',
  key: 'd',
  sol: 'Both are true, but their position does not explain the colour; they are green because their thylakoids contain chlorophyll — option (d).',
  d: 2, c: 'analysis', t: [2],
}));
add('granum-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: a stack of disc-shaped thylakoids inside a chloroplast.',
  model: '**Granum** (plural grana).',
  sol: 'Granum.', scheme: [['Granum', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('grana-stroma-short', short({
  marks: 2,
  stem: 'Give two differences between the grana and the stroma of a chloroplast.',
  model: '1. **Grana** are stacks of thylakoids that contain **chlorophyll**; the **stroma** is the colourless ground substance around them.\n2. The **light phase** takes place in the grana; the **dark phase** takes place in the stroma, which has the enzymes for making glucose.',
  sol: 'Structure; phase.',
  scheme: [['Structure', 1], ['Phase that occurs', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('chloro-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a chloroplast. Label the double membrane, a granum, a stroma lamella and the stroma.',
  model: 'An oval body bounded by **two membranes**; inside, several **grana** drawn as stacks of discs, joined by thin **stroma lamellae**, all lying in the **stroma**.',
  sol: 'Labelled chloroplast.',
  scheme: [['Oval outline with double membrane', 1], ['Grana joined by lamellae in the stroma', 1], ['Four correct labels', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 light (photochemical) phase
add('photolysis-mcq', mcq({
  stem: 'Photolysis of water is',
  right: 'the splitting of water molecules by light energy trapped by chlorophyll', wrong: ['the joining of hydrogen and carbon dioxide', 'the loss of water vapour from the leaf', 'the formation of starch from glucose'],
  sol: 'Light energy splits water into hydrogen ions, electrons and oxygen — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('o2-source-mcq', mcq({
  stem: 'A plant was given water whose oxygen atoms were of a special kind that can be traced. The traced atoms later appeared in the oxygen gas the plant released. This shows that the oxygen given out in photosynthesis comes from',
  right: 'water', wrong: ['carbon dioxide', 'glucose', 'chlorophyll'],
  sol: 'Only the water was labelled, and the label turned up in the oxygen released, so the oxygen comes from water split in photolysis — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('light-products-mcq', mcq({
  stem: 'The products of the light phase that are used in the dark phase are',
  right: 'ATP and NADPH', wrong: ['glucose and oxygen', 'carbon dioxide and water', 'starch and chlorophyll'],
  sol: 'ATP supplies energy and NADPH supplies hydrogen for fixing carbon dioxide — option (@K).',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('activation-mcq', mcq({
  stem: 'The first event of the light phase is',
  right: 'chlorophyll absorbing light energy and becoming activated', wrong: ['carbon dioxide combining with hydrogen', 'glucose changing into starch', 'oxygen entering the leaf'],
  sol: 'Activated chlorophyll then drives the splitting of water and the formation of ATP and NADPH — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('oxygen-ar', ar({
  a: 'The oxygen released in photosynthesis comes from water and not from carbon dioxide.',
  r: 'During photolysis, water molecules are split using light energy.',
  key: 'c',
  sol: 'Both are true, and the splitting of water is exactly where the oxygen comes from — option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('photolysis-fill', fill({
  stem: 'The splitting of water by light energy in the chloroplast is called ______.',
  acc: [['photolysis', 'photolysis of water']],
  sol: 'Photolysis.',
  d: 1, c: 'recall', t: [3],
}));
add('reason-photochemical', short({
  marks: 1, wl: null,
  stem: 'Give reason: the light phase is also called the photochemical phase.',
  model: 'Its reactions are driven **directly by light energy**, which activates chlorophyll and splits water.',
  sol: 'Driven directly by light.', scheme: [['Depends directly on light', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('light-phase-short', short({
  marks: 3,
  stem: 'Describe the events of the light phase in sequence and name its products.',
  model: '1. **Chlorophyll** in the grana **absorbs light** and becomes **activated**.\n2. The energy **splits water** (photolysis) into hydrogen and **oxygen**; the oxygen is **released**.\n3. The energy is stored as **ATP**, and the hydrogen is carried by **NADPH**. Products: **ATP, NADPH and oxygen**.',
  sol: 'Activation, photolysis, ATP and NADPH.',
  scheme: [['Chlorophyll activated by light', 1], ['Photolysis releases oxygen', 1], ['ATP and NADPH formed', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 dark (biosynthetic) phase
add('dark-mcq', mcq({
  stem: 'The dark phase is so called because',
  right: 'it does not need light directly, though it uses products of the light phase', wrong: ['it takes place only at night', 'it takes place in the dark grana', 'it needs no energy at all'],
  sol: 'It can occur in light or dark as long as ATP and NADPH are available — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('fix-mcq', mcq({
  stem: 'In the dark phase, carbon dioxide is',
  right: 'combined with hydrogen from NADPH, using energy from ATP, to form glucose', wrong: ['split into carbon and oxygen by light', 'released into the air', 'stored as chlorophyll'],
  sol: 'Carbon dioxide is fixed into glucose in the stroma using the products of the light phase — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('dark-stop-mcq', mcq({
  stem: 'A plant in bright light is suddenly moved into a dark cupboard. Soon afterwards glucose formation also stops. Why?',
  right: 'The supply of ATP and NADPH from the light phase runs out', wrong: ['The stroma is destroyed in darkness', 'Carbon dioxide cannot exist in darkness', 'The dark phase works only in light'],
  sol: 'The dark phase does not use light directly, but it depends on ATP and NADPH, which only the light phase makes — option (@K).',
  d: 4, c: 'analysis', t: [4, 3],
}));
add('dark-ar', ar({
  a: 'The dark phase of photosynthesis takes place only at night.',
  r: 'The dark phase does not directly require light.',
  key: 'b',
  sol: 'The assertion is false: the dark phase goes on during the day, using products of the light phase. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('dark-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the phase of photosynthesis in which carbon dioxide is converted into glucose in the stroma.',
  model: '**Dark phase** (biosynthetic phase).',
  sol: 'Dark phase.', scheme: [['Dark (biosynthetic) phase', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('odd-light', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Photolysis, Release of oxygen, Formation of ATP, Fixation of carbon dioxide.',
  model: '**Fixation of carbon dioxide**; the others are **events of the light phase**.',
  sol: 'Fixation belongs to the dark phase.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [3, 4],
}));
add('phases-short', short({
  marks: 3,
  stem: 'Compare the light phase and the dark phase of photosynthesis in site, requirements and products.',
  model: '| Point | Light phase | Dark phase |\n|---|---|---|\n| **Site** | Grana | Stroma |\n| **Needs** | Light, chlorophyll, water | Carbon dioxide, ATP, NADPH |\n| **Products** | ATP, NADPH, oxygen | Glucose |',
  sol: 'Site, needs, products.',
  scheme: [['Site', 1], ['Requirements', 1], ['Products', 1]],
  d: 2, c: 'understanding', t: [3, 4],
}));

// ---------------------------------------------------------------- t05 adaptations of leaves
add('broad-mcq', mcq({
  stem: 'Plants growing on the dim floor of a dense forest often have very large, thin leaves. How does this help them?',
  right: 'A large, thin leaf catches as much of the weak light as possible and lets it reach all its cells', wrong: ['Large leaves lose less water in the shade', 'Thin leaves store more starch', 'Large leaves need less chlorophyll'],
  sol: 'Light is the limiting factor in shade; a broad blade catches more of it and a thin one lets it reach every chloroplast — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('palisade-mcq', mcq({
  stem: 'The cells packed with the most chloroplasts lie just below the upper epidermis of a leaf. This is because',
  right: 'this is where they receive the most light', wrong: ['this is where the stomata are most numerous', 'this is closest to the soil', 'this is where water is lost fastest'],
  sol: 'Palisade cells near the upper surface get the strongest light — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('spongy-mcq', mcq({
  stem: 'The large air spaces of the spongy tissue help photosynthesis by',
  right: 'letting carbon dioxide reach the mesophyll cells quickly', wrong: ['storing starch', 'absorbing light', 'carrying water from the roots'],
  sol: 'Gases diffuse rapidly through the air spaces between stomata and cells — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('thin-ar', ar({
  a: 'Most leaves are thin.',
  r: 'In a thin leaf, carbon dioxide and light can easily reach all the cells.',
  key: 'c',
  sol: 'Both are true, and the short distance for gases and light is exactly why thinness helps photosynthesis — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('reason-veins', short({
  marks: 1, wl: null,
  stem: 'Give reason: a leaf has a dense network of veins.',
  model: 'Veins bring **water and minerals** (xylem) to every cell and carry away the **food made** (phloem).',
  sol: 'Supply and removal.', scheme: [['Bring water; remove food', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('adapt-short', short({
  marks: 2,
  stem: 'State two ways in which a leaf is adapted for photosynthesis.',
  model: '1. It is **broad and flat**, giving a large surface to absorb **light**.\n2. It has many **stomata** and **air spaces** for exchange of gases, and **palisade cells** packed with chloroplasts near the upper surface.',
  sol: 'Any two adaptations.',
  scheme: [['First adaptation', 1], ['Second adaptation', 1]],
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t06 experiments
add('destarch-mcq', mcq({
  stem: 'A potted plant is destarched by',
  right: 'keeping it in complete darkness for one to two days', wrong: ['keeping it in bright sunlight for a week', 'removing all its leaves', 'watering it with iodine solution'],
  sol: 'In darkness the plant uses up its stored starch and cannot make more — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('alcohol-mcq', mcq({
  stem: 'In the starch test, the leaf is boiled in alcohol to',
  right: 'remove its chlorophyll so that the colour change with iodine can be seen', wrong: ['kill the cells and stop all reactions', 'make the leaf soft and flexible', 'add starch to the leaf'],
  sol: 'Alcohol dissolves chlorophyll; the green colour would otherwise hide the iodine result — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
add('waterbath-mcq', mcq({
  stem: 'The test tube of alcohol is heated in a beaker of boiling water instead of directly over the flame because',
  right: 'alcohol is highly flammable', wrong: ['alcohol boils at a very high temperature', 'water removes chlorophyll faster', 'the flame would turn the leaf blue'],
  sol: 'A water bath heats alcohol safely, away from the naked flame — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('koh-mcq', mcq({
  stem: "In Moll's half-leaf experiment, potassium hydroxide solution is placed in the bottle to",
  right: 'absorb carbon dioxide from the air inside the bottle', wrong: ['supply oxygen to the leaf', 'remove chlorophyll from the leaf', 'keep the leaf moist'],
  sol: 'KOH removes carbon dioxide, so the leaf part inside has none — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('vari-mcq', mcq({
  stem: 'After the starch test on a variegated croton leaf that was in sunlight, the parts that turn blue-black are',
  right: 'only the parts that were green', wrong: ['only the parts that were white', 'the whole leaf', 'no part of the leaf'],
  sol: 'Only parts with chlorophyll made starch — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('screen-mcq', mcq({
  stem: 'A strip of black paper was clipped across a leaf of a destarched plant, which was then kept in sunlight. After the starch test the covered strip stays brown because',
  right: 'no light reached it, so no photosynthesis took place and no starch was made', wrong: ['the black paper absorbed all the iodine', 'the strip had no chlorophyll', 'the paper removed the starch'],
  sol: 'Light is necessary for photosynthesis; the covered part made no starch — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('splinter-mcq', mcq({
  stem: 'The gas collected from hydrilla kept in sunlight makes a glowing splinter burst into flame. The gas is',
  right: 'oxygen', wrong: ['carbon dioxide', 'hydrogen', 'water vapour'],
  sol: 'Oxygen rekindles a glowing splinter — option (@K).',
  d: 1, c: 'application', t: [6],
}));
add('bicarb-mcq', mcq({
  stem: 'Adding a pinch of sodium bicarbonate to the water around hydrilla increases the number of bubbles because',
  right: 'it supplies more carbon dioxide for photosynthesis', wrong: ['it supplies more oxygen to the plant', 'it warms the water', 'it adds chlorophyll to the leaves'],
  sol: 'Sodium bicarbonate releases carbon dioxide into the water — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('destarch-ar', ar({
  a: 'The plant must be destarched before an experiment to show that light is needed for photosynthesis.',
  r: 'Starch already present in the leaf could make the covered part test positive.',
  key: 'c',
  sol: 'Both are true, and the risk of old starch giving a false result is exactly why destarching is done — option (c).',
  d: 2, c: 'analysis', t: [6],
}));
add('boil-ar', ar({
  a: 'Boiling the leaf in water is the first step of the starch test.',
  r: 'Boiling in water removes the chlorophyll from the leaf.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: boiling water kills the cells and softens the leaf; alcohol removes the chlorophyll — option (a).',
  d: 2, c: 'analysis', t: [6],
}));
add('iodine-fill', fill({
  stem: 'Starch gives a ______ colour with iodine solution.',
  acc: [['blue-black', 'blue black', 'dark blue']],
  sol: 'Blue-black.',
  d: 1, c: 'recall', t: [6],
}));
add('destarch-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: removing the stored starch from the leaves of a plant by keeping it in darkness.',
  model: '**Destarching.**',
  sol: 'Destarching.', scheme: [['Destarching', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('odd-starch', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Iodine solution, Alcohol, Boiling water, Cobalt chloride paper.',
  model: '**Cobalt chloride paper**; the others are **used in the starch test** on a leaf.',
  sol: 'Cobalt chloride paper tests for water.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [6],
}));
add('reason-boil', short({
  marks: 1, wl: null,
  stem: 'Give reason: the leaf is boiled in water before it is put into alcohol.',
  model: 'Boiling **kills the cells**, stops all reactions and makes the cell membranes **permeable**, so alcohol and iodine can enter.',
  sol: 'Kills cells, makes them permeable.', scheme: [['Kills cells; lets alcohol and iodine in', 1]],
  d: 3, c: 'understanding', t: [6],
}));
add('steps-short', short({
  marks: 3,
  stem: 'List, in order, the steps of the starch test on a leaf, giving the purpose of each.',
  model: '1. **Boil in water** for a few minutes: kills the cells and softens the leaf.\n2. **Boil in alcohol** in a **water bath**: removes the chlorophyll.\n3. **Dip in warm water**: softens the brittle leaf.\n4. Spread on a tile and add **iodine solution**: parts with starch turn **blue-black**.',
  sol: 'Water, alcohol, warm water, iodine.',
  scheme: [['Boil in water, with purpose', 1], ['Alcohol in water bath, with purpose', 1], ['Warm water and iodine, with result', 1]],
  d: 1, c: 'recall', t: [6],
}));

// ---------------------------------------------------------------- t07 the carbon cycle
add('remove-co2-mcq', mcq({
  stem: 'Which process removes carbon dioxide from the air?',
  right: 'Photosynthesis', wrong: ['Respiration', 'Combustion', 'Decomposition'],
  sol: 'Green plants take in carbon dioxide during photosynthesis; the other three release it — option (@K).',
  d: 1, c: 'recall', t: [7],
}));
add('decomposer-mcq', mcq({
  stem: 'In the carbon cycle, decomposers return carbon to the air when they',
  right: 'break down dead bodies and wastes and release carbon dioxide in respiration', wrong: ['make glucose by photosynthesis', 'turn carbon dioxide into oxygen', 'store carbon as fossil fuels in a few days'],
  sol: 'Bacteria and fungi respire as they decompose dead matter, releasing carbon dioxide — option (@K).',
  d: 2, c: 'understanding', t: [7],
}));
add('fossil-mcq', mcq({
  stem: 'Burning coal and petrol adds to the air carbon that was',
  right: 'taken from the air by photosynthesis millions of years ago', wrong: ['made inside the Earth from oxygen', 'released by volcanoes last year', 'never part of any living thing'],
  sol: 'Fossil fuels formed from the remains of ancient plants and animals, whose carbon came from photosynthesis — option (@K).',
  d: 3, c: 'analysis', t: [7],
}));
add('cycle-ar', ar({
  a: 'Large-scale cutting and burning of forests increases the carbon dioxide in the air.',
  r: 'Fewer trees remove less carbon dioxide by photosynthesis, and burning wood releases carbon dioxide.',
  key: 'c',
  sol: 'Both are true, and less uptake plus more release is exactly why carbon dioxide rises — option (c).',
  d: 3, c: 'analysis', t: [7],
}));
add('odd-cycle', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Respiration, Combustion, Decomposition, Photosynthesis.',
  model: '**Photosynthesis**; the others **add carbon dioxide to the air**.',
  sol: 'Photosynthesis removes carbon dioxide.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [7],
}));
add('cycle-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a labelled diagram of the carbon cycle showing photosynthesis, respiration, decomposition and combustion.',
  model: 'A central box **carbon dioxide in the air**; an arrow to **green plants** labelled **photosynthesis**; arrows back to the air from plants and animals labelled **respiration**; plants to animals labelled **feeding**; dead bodies to **decomposers**, then to the air labelled **decomposition**; **fossil fuels** to the air labelled **combustion**.',
  sol: 'Labelled cycle.',
  scheme: [['Photosynthesis and respiration arrows', 1], ['Decomposition arrow', 1], ['Combustion arrow and labels', 1]],
  d: 2, c: 'application', t: [7],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('phases-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [grana, stroma, photolysis, oxygen, glucose, chlorophyll, starch, mitochondria]\n\nLight is absorbed by (a) ______ present in the (b) ______ of the chloroplast. The energy splits water by (c) ______, releasing (d) ______ gas. In the (e) ______, carbon dioxide is then converted into glucose.',
  acc: [['chlorophyll'], ['grana', 'thylakoids'], ['photolysis'], ['oxygen'], ['stroma']],
  sol: '(a) chlorophyll; (b) grana; (c) photolysis; (d) oxygen; (e) stroma.',
  d: 2, c: 'understanding', t: [2, 3, 4],
}));
add('test-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [darkness, sunlight, alcohol, water bath, iodine, blue-black, brown, potassium hydroxide]\n\nA plant is destarched by keeping it in (a) ______ for one to two days. In the starch test, the leaf is boiled in (b) ______, which is heated in a (c) ______. It is then tested with (d) ______ solution, and the parts that contain starch turn (e) ______.',
  acc: [['darkness'], ['alcohol'], ['water bath'], ['iodine'], ['blue-black', 'blue black']],
  sol: '(a) darkness; (b) alcohol; (c) water bath; (d) iodine; (e) blue-black.',
  d: 2, c: 'understanding', t: [6],
}));
add('chloro-match5', match({
  marks: 5,
  stem: 'Study the figure of a chloroplast and match each lettered part with its description.',
  pairs: [
    ['A', 'Double covering that controls what enters and leaves the chloroplast'],
    ['B', 'Contains chlorophyll; site of the light phase'],
    ['C', 'Thin sheet that joins one stack of sacs to another'],
    ['D', 'Colourless matrix with enzymes; site of the dark phase'],
    ['E', 'Store of food made from extra glucose'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'A envelope (double membrane); B granum; C stroma lamella; D stroma; E starch grain.',
  d: 2, c: 'application', t: [2],
  assets: [chloroFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, experiment-based)
add('starch-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'Zoya picked a leaf from a pot plant that had stood in sunlight all morning. She boiled it in water, then placed it in a test tube of alcohol standing in a beaker of boiling water, as shown. When the leaf turned pale, she dipped it in warm water, spread it on a white tile and added a few drops of iodine solution.',
  d: 3, c: 'application',
  assets: [bathFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'What colour did the leaf turn with iodine?', model: '**Blue-black.**', sol: 'Blue-black.', scheme: [['Blue-black', 1]], d: 1, c: 'application', t: [6] })),
    part('b', short({ marks: 2, stem: 'Why did Zoya boil the leaf in water first?', model: 'Boiling in water **kills the cells** and stops all chemical reactions, and makes the cell membranes **permeable** so that alcohol and later iodine can **enter** the cells.', sol: 'Kills cells; permeable.', scheme: [['Kills cells', 1], ['Lets alcohol and iodine enter', 1]], d: 2, c: 'understanding', t: [6] })),
    part('c', short({ marks: 2, stem: 'Why was the alcohol heated in a beaker of boiling water and not directly over the flame?', model: 'Alcohol is **highly flammable** and could catch fire over a naked flame. The **water bath** heats it gently and safely to its boiling point, which is below that of water.', sol: 'Flammable; safe heating.', scheme: [['Alcohol flammable', 1], ['Water bath heats it safely', 1]], d: 2, c: 'understanding', t: [6] })),
    part('d', short({ marks: 2, stem: 'Why did the leaf turn pale in the alcohol, and why was it then dipped in warm water?', model: 'The alcohol **dissolved the chlorophyll**, so the leaf lost its green colour and the iodine result could be seen. Alcohol makes the leaf **brittle**, so it was dipped in warm water to **soften** it before spreading it out.', sol: 'Chlorophyll removed; softened.', scheme: [['Alcohol removes chlorophyll', 1], ['Warm water softens the brittle leaf', 1]], d: 2, c: 'understanding', t: [6] })),
    part('e', short({ marks: 3, stem: 'Zoya repeated the test on a leaf from a similar plant that had been kept in a dark cupboard for two days. Predict the result and explain what the two results together show.', model: 'The second leaf would turn **brown** (the colour of iodine): it has **no starch**, because in darkness the plant **used up** its stored starch and could not make more. Together the results show that a leaf in **light makes starch** by photosynthesis, and that keeping a plant in the dark **destarches** it.', sol: 'Brown; no starch; light needed.', scheme: [['Brown, no starch', 1], ['Starch used up in darkness', 1], ['Light needed to make starch; destarching', 1]], d: 3, c: 'analysis', t: [6] })),
  ],
}));
add('screen-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'Kunal kept a potted plant in a dark room for two days. He then clipped a strip of black paper across both surfaces of one of its leaves and placed the plant in bright sunlight for six hours. Finally he tested the leaf for starch.',
  d: 3, c: 'analysis',
  assets: [screenFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Why was the plant kept in the dark for two days?', model: 'To **destarch** it, so that its leaves had **no starch** at the start.', sol: 'Destarching.', scheme: [['Destarching', 1]], d: 1, c: 'understanding', t: [6] })),
    part('b', short({ marks: 2, stem: 'Describe the result of the starch test.', model: 'The parts of the leaf that received **light** turned **blue-black**, while the strip covered by the black paper stayed **pale brown**.', sol: 'Exposed blue-black; covered brown.', scheme: [['Exposed parts blue-black', 1], ['Covered strip brown', 1]], d: 2, c: 'application', t: [6] })),
    part('c', short({ marks: 2, stem: 'What does the experiment show? Which part of the leaf acts as the control?', model: 'It shows that **light is necessary** for photosynthesis (for making starch). The **uncovered parts** of the same leaf, which had light, act as the **control**.', sol: 'Light necessary; uncovered part is control.', scheme: [['Light is necessary', 1], ['Uncovered part is the control', 1]], d: 2, c: 'understanding', t: [6] })),
    part('d', short({ marks: 2, stem: 'Why was the strip clipped on both surfaces of the leaf, and not just the upper one?', model: 'Light could enter through the **lower surface** too. Covering **both sides** makes sure the strip receives **no light at all**, so the result is reliable.', sol: 'Block light fully.', scheme: [['Light can enter from below', 1], ['Both sides block it completely', 1]], d: 3, c: 'application', t: [6] })),
    part('e', short({ marks: 3, stem: 'Suppose Kunal had forgotten to keep the plant in the dark before the experiment. How might his result and conclusion have been affected?', model: 'The leaf would already contain **starch** made earlier. The covered strip might then also turn **blue-black**, even though it received **no light** during the experiment. Kunal might wrongly conclude that **light is not needed**; the result would be **unreliable**.', sol: 'Old starch gives a false result.', scheme: [['Starch already present', 1], ['Covered part may turn blue-black', 1], ['Wrong or unreliable conclusion', 1]], d: 4, c: 'analysis', t: [6] }), [
      short({ marks: 3, stem: 'Name three other conditions or substances that must be shown to be necessary for photosynthesis, and the material used in a school experiment for one of them.', model: 'Besides light, photosynthesis needs **carbon dioxide**, **chlorophyll** and **water**. To show that carbon dioxide is needed, **potassium hydroxide** is used to absorb it from the air around part of a leaf (as in Moll\'s half-leaf experiment); to show that chlorophyll is needed, a **variegated leaf** is tested.', sol: 'Carbon dioxide, chlorophyll, water.', scheme: [['Two of carbon dioxide, chlorophyll, water', 1], ['Third', 1], ['Material for one', 1]], d: 2, c: 'understanding', t: [6] }),
    ]),
  ],
}));
add('moll-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: "In Moll's half-leaf experiment, a leaf of a destarched plant, still attached to the plant, was passed through a split cork into a wide-mouthed bottle containing potassium hydroxide solution. The cork was sealed with Vaseline. The plant was kept in sunlight for six hours and the leaf was then tested for starch.",
  d: 4, c: 'analysis',
  assets: [mollFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'What is the role of the potassium hydroxide solution?', model: 'It **absorbs carbon dioxide** from the air in the bottle.', sol: 'Absorbs carbon dioxide.', scheme: [['Absorbs carbon dioxide', 1]], d: 1, c: 'recall', t: [6] })),
    part('b', short({ marks: 2, stem: 'State the result of the starch test on the two halves of the leaf.', model: 'The half **inside the bottle** stays **brown** (no starch), while the half **outside** in the air turns **blue-black** (starch present).', sol: 'Inside brown; outside blue-black.', scheme: [['Inside half brown', 1], ['Outside half blue-black', 1]], d: 2, c: 'application', t: [6] })),
    part('c', short({ marks: 2, stem: 'What conclusion can be drawn? Why is the outer half a good control?', model: '**Carbon dioxide is necessary** for photosynthesis. The outer half is part of the **same leaf**, with the same light, water and chlorophyll; it differs **only** in having carbon dioxide.', sol: 'Carbon dioxide necessary; same leaf.', scheme: [['Carbon dioxide is necessary', 1], ['Only one condition differs', 1]], d: 3, c: 'analysis', t: [6] })),
    part('d', short({ marks: 2, stem: 'Why was the split cork sealed with Vaseline?', model: 'To make the bottle **airtight**, so that **no carbon dioxide** from outside could leak in and reach the inner half of the leaf.', sol: 'Airtight.', scheme: [['Airtight seal', 1], ['Keeps outside carbon dioxide out', 1]], d: 2, c: 'understanding', t: [6] })),
    part('e', short({ marks: 3, stem: 'Describe how you could show the same result using two whole potted plants under bell jars. Name the control.', model: 'Take two **destarched** potted plants and cover each with a **bell jar** on a greased glass plate. Under jar A place a dish of **potassium hydroxide** (to absorb carbon dioxide); under jar B, the **control**, place a dish of **water**. Keep both in **sunlight** for some hours and test a leaf from each for starch: only the leaf from **B** turns blue-black.', sol: 'KOH vs water under bell jars.', scheme: [['Destarched plants under airtight bell jars', 1], ['KOH in one; water in the control', 1], ['Starch only in the control', 1]], d: 4, c: 'application', t: [6] })),
  ],
}));
add('vari-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'A croton plant has leaves with green patches and white or yellowish margins. One such plant was destarched, kept in bright sunlight for a day, and one of its leaves was tested for starch.',
  d: 3, c: 'application',
  assets: [variFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'What name is given to a leaf with green and white areas?', model: 'A **variegated** leaf.', sol: 'Variegated.', scheme: [['Variegated', 1]], d: 1, c: 'recall', t: [6] })),
    part('b', short({ marks: 2, stem: 'State the colour of the green parts and of the white parts after the starch test.', model: 'The parts that were **green** turn **blue-black**; the parts that were **white** stay **pale brown** (the colour of iodine).', sol: 'Green to blue-black; white stays brown.', scheme: [['Green parts blue-black', 1], ['White parts brown', 1]], d: 2, c: 'application', t: [6] })),
    part('c', short({ marks: 2, stem: 'Explain why the white parts contain no starch.', model: 'The white parts have **no chlorophyll**, so they cannot **absorb light** energy for photosynthesis and make **no glucose**, which is stored as starch.', sol: 'No chlorophyll, no photosynthesis.', scheme: [['No chlorophyll', 1], ['No photosynthesis, so no starch', 1]], d: 2, c: 'understanding', t: [6] })),
    part('d', short({ marks: 2, stem: 'What conclusion does the experiment support? Which part of the leaf is the control?', model: 'It shows that **chlorophyll is necessary** for photosynthesis. The **green parts** of the same leaf, which had chlorophyll and the same light and carbon dioxide, act as the **control**.', sol: 'Chlorophyll necessary; green part control.', scheme: [['Chlorophyll is necessary', 1], ['Green part is the control', 1]], d: 2, c: 'understanding', t: [6] })),
    part('e', short({ marks: 3, wl: null, stem: 'Draw outline diagrams of the leaf before and after the starch test, labelling the areas of starch and no starch.', model: 'Two leaf outlines of the same shape. **Before:** shade the **green** centre and leave the **white** margin and patches unshaded. **After:** the former green areas shaded dark and labelled **blue-black (starch)**; the former white areas labelled **brown (no starch)**.', sol: 'Two labelled outlines.', scheme: [['Before outline with green and white areas', 1], ['After outline matching areas', 1], ['Labels for starch and no starch', 1]], d: 3, c: 'application', t: [6] })),
  ],
}));
add('hydrilla-case', mk.case({
  stem: 'Study the figure and the chart, and answer the questions.',
  passage: `A group placed sprigs of hydrilla under a funnel in a beaker of water, as shown, and counted the bubbles given off in ${HYD.minutes} minutes with a lamp at different distances. Then they added a pinch of sodium bicarbonate and counted again with the lamp at ${HYD.bicarb.cm} cm:\n\n| Lamp distance | Bubbles in ${HYD.minutes} minutes |\n|---|---|\n${HYD.rows.map((r) => `| ${r.cm} cm | ${r.n} |`).join('\n')}\n| ${HYD.bicarb.cm} cm, with sodium bicarbonate | ${HYD.bicarb.n} |`,
  d: 3, c: 'analysis',
  assets: [hydFig, bubFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'How would you show that the gas collected in the test tube is oxygen?', model: 'Insert a **glowing splinter**: it **bursts into flame**.', sol: 'Glowing splinter rekindles.', scheme: [['Glowing splinter relights', 1]], d: 1, c: 'application', t: [6] })),
    part('b', num({ marks: 2, stem: `Calculate the number of bubbles per minute with the lamp at ${HYD.rows[0].cm} cm.`, value: HYD.rows[0].rate, sol: `$${HYD.rows[0].n} \\div ${HYD.minutes} = ${HYD.rows[0].rate}$ bubbles per minute.`, scheme: [['Count divided by time', 1], [`${HYD.rows[0].rate}`, 1]], d: 1, c: 'application', t: [6] })),
    part('c', short({ marks: 2, stem: 'Why did the number of bubbles fall as the lamp was moved further away?', model: 'Further away the plant receives **less light**. With less light energy, **photosynthesis slows down**, so **less oxygen** is given off.', sol: 'Less light, slower photosynthesis.', scheme: [['Less light', 1], ['Slower photosynthesis, less oxygen', 1]], d: 2, c: 'understanding', t: [6] })),
    part('d', num({ marks: 2, stem: `By what percentage did the rate (bubbles per minute) at ${HYD.bicarb.cm} cm rise when sodium bicarbonate was added?`, value: HYD.bicarbPct, unit: '%', sol: `Without: ${HYD.base20} per minute; with: ${HYD.bicarb.rate} per minute. Rise: ${HYD.bicarb.rate} − ${HYD.base20}, which is ${HYD.bicarbRise}. Percentage: $\\dfrac{${HYD.bicarbRise}}{${HYD.base20}} \\times 100 = ${HYD.bicarbPct}$ per cent.`, scheme: [['Rates compared', 1], [`${HYD.bicarbPct} per cent`, 1]], d: 3, c: 'application', t: [6] })),
    part('e', short({ marks: 3, stem: 'Explain the effect of sodium bicarbonate, and state two precautions needed for a fair comparison between readings.', model: 'Sodium bicarbonate releases **carbon dioxide** into the water; more carbon dioxide lets **photosynthesis** go faster, so more oxygen is released. Precautions: keep the **temperature** of the water the **same** (a heat screen or water jacket between lamp and beaker), and let the plant **adjust** for a few minutes at each new distance before counting.', sol: 'More carbon dioxide; same temperature; time to adjust.', scheme: [['More carbon dioxide, faster photosynthesis', 1], ['First precaution', 1], ['Second precaution', 1]], d: 3, c: 'analysis', t: [6] })),
  ],
}));
add('cycle-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'The figure shows how carbon moves between the air, living things and fossil fuels. A town near a forest has been cutting the forest for timber and burning more coal in a new power station.',
  d: 3, c: 'analysis',
  assets: [cycleFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the only process in the figure that removes carbon dioxide from the air.', model: '**Photosynthesis.**', sol: 'Photosynthesis.', scheme: [['Photosynthesis', 1]], d: 1, c: 'recall', t: [7] })),
    part('b', short({ marks: 2, stem: 'Name two processes in the figure that return carbon dioxide to the air, and the organisms or source involved in each.', model: '1. **Respiration** by plants, animals and decomposers.\n2. **Combustion** of fossil fuels such as coal and petrol (or **decomposition** of dead bodies by bacteria and fungi).', sol: 'Respiration; combustion or decomposition.', scheme: [['First process with source', 1], ['Second process with source', 1]], d: 1, c: 'recall', t: [7] })),
    part('c', short({ marks: 2, stem: 'What would happen to the carbon in dead leaves and animals if there were no decomposers?', model: 'The carbon would stay **locked in dead bodies** and wastes and **not return** to the air. Carbon dioxide in the air would slowly **run short** for photosynthesis, and dead matter would pile up.', sol: 'Carbon locked up.', scheme: [['Carbon not returned', 1], ['Less carbon dioxide for plants', 1]], d: 3, c: 'analysis', t: [7] })),
    part('d', short({ marks: 2, stem: 'Explain why the carbon in coal is said to have come from photosynthesis.', model: 'Coal formed over **millions of years** from the buried remains of ancient **plants**. Those plants had built their bodies from **carbon dioxide** taken from the air by **photosynthesis**.', sol: 'Coal from ancient plants.', scheme: [['Coal from buried ancient plants', 1], ['Their carbon came from photosynthesis', 1]], d: 3, c: 'analysis', t: [7] })),
    part('e', short({ marks: 3, stem: 'Explain how the actions of the town will affect the amount of carbon dioxide in the air, and state one result of this change.', model: 'Cutting the forest leaves **fewer trees** to remove carbon dioxide by **photosynthesis**. Burning **more coal** releases extra carbon dioxide by **combustion**. Both **raise** the carbon dioxide in the air, which traps more heat and adds to **global warming**.', sol: 'Less uptake, more release; warming.', scheme: [['Fewer trees, less photosynthesis', 1], ['More combustion releases carbon dioxide', 1], ['Rise in carbon dioxide; global warming', 1]], d: 3, c: 'application', t: [7] }), [
      short({ marks: 3, stem: 'Suggest three ways in which the town could help to keep the carbon cycle in balance.', model: '1. **Plant trees** to replace those that were cut, so that more carbon dioxide is taken up again by photosynthesis.\n2. Burn **less coal** in the power station, for example by adding solar or wind power.\n3. **Compost** garden and kitchen waste instead of burning it, and save electricity at home.', sol: 'Trees, less coal, compost.', scheme: [['First way', 1], ['Second way', 1], ['Third way', 1]], d: 2, c: 'application', t: [7] }),
    ]),
  ],
}));
