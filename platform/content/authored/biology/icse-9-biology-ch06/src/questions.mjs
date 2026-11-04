// ICSE 9 Biology ch06 Respiration in Plants — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-biology-ch01/src/lib.mjs';
import { N8, N8_CO2, N8_ETHANOL, PYRUVATES_FROM_4, ATP_ANAERO, ATP_AERO, ATP_RATIO, ATP_12, LIME, LIME_RATIO, LIME_DIFF, FLASK_A, FLASK_B, RISE_A, RISE_PER_DAY, YEAST_ML, YEAST_MIN, YEAST_RATE, STOMATA, STOMATA_OPEN, STOMATA_SHUT } from './calc.mjs';
import { CELL_LETTERED, CO2_SET_BLIND, THERMOS } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const cellFig = svgV(CELL_LETTERED, 'A plant cell showing respiration with parts lettered A to E');
const co2Fig = svgV(CO2_SET_BLIND, 'Two flasks of seeds, X with soaked seeds and Y with soaked seeds that were boiled and cooled, each with a delivery tube into lime water');
const thermosFig = svgV(THERMOS, 'Two vacuum flasks with thermometers: A with germinating seeds and B with boiled seeds');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-glyco', mcq({
  stem: 'Glycolysis takes place in the',
  right: 'cytoplasm', wrong: ['mitochondria', 'nucleus', 'cell wall'],
  sol: 'Glucose is first broken down in the cytoplasm — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-ethanol', mcq({
  stem: 'In plants, anaerobic respiration of glucose gives carbon dioxide and',
  right: 'alcohol', wrong: ['water', 'oxygen', 'lactic acid'],
  sol: 'Plants and yeast form alcohol without oxygen — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-aeroenergy', mcq({
  stem: 'Which kind of respiration releases more energy from each glucose molecule?',
  right: 'Aerobic respiration', wrong: ['Anaerobic respiration', 'Both release the same', 'Neither releases energy'],
  sol: 'Complete breakdown with oxygen releases much more energy — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-stomata', mcq({
  stem: 'Gases enter and leave the woody stem of a tree through',
  right: 'lenticels', wrong: ['stomata of the root cap', 'root hairs', 'the cuticle'],
  sol: 'Lenticels are the pores in the bark — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-limewater', mcq({
  stem: 'Lime water turns milky when which gas is passed through it?',
  right: 'Carbon dioxide', wrong: ['Oxygen', 'Nitrogen', 'Hydrogen'],
  sol: 'Carbon dioxide turns lime water milky — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-control6', mcq({
  stem: 'In the thermos-flask experiment, the flask of boiled seeds is used as a control because',
  right: 'it shows that the heat comes from living seeds', wrong: ['it contains more oxygen', 'it is colder at the start', 'boiled seeds make heat faster'],
  sol: 'Dead seeds do not respire, so any heat in the other flask comes from life — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t01 outline of respiration
add('krebs-mcq', mcq({
  stem: 'A scientist finds that a cell without mitochondria cannot complete the breakdown of pyruvate. This shows that the final stage of aerobic respiration takes place in the',
  right: 'mitochondria', wrong: ['cytoplasm', 'cell sap', 'cell membrane'],
  sol: 'The Krebs cycle takes place in the mitochondria — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('glycoprod-mcq', mcq({
  stem: 'One glucose molecule is split into two smaller molecules in the cytoplasm without using oxygen. The smaller molecules are',
  right: 'pyruvate', wrong: ['carbon dioxide', 'alcohol', 'water'],
  sol: 'Glycolysis forms two pyruvate from one glucose — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('pyr-num', num({
  stem: 'Each glucose molecule gives two pyruvate molecules in glycolysis. How many pyruvate molecules are formed from 4 glucose molecules?',
  value: PYRUVATES_FROM_4,
  sol: r`$4 \times 2 = ${PYRUVATES_FROM_4}$ pyruvate molecules.`,
  scheme: [[`${PYRUVATES_FROM_4}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 8 || 'value');
add('figA-mcq', mcq({
  stem: 'In the figure of a plant cell, which letter marks the place where glycolysis takes place?',
  right: 'A', wrong: ['B', 'C', 'D'],
  sol: 'A is the cytoplasm; B is the mitochondrion, C pyruvate, D the products and E oxygen — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [cellFig],
}));
add('figE-mcq', mcq({
  stem: 'In the figure of a plant cell, which letter marks the gas that must enter the mitochondrion for the Krebs cycle to run?',
  right: 'E', wrong: ['A', 'C', 'D'],
  sol: 'E is oxygen — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [cellFig],
}));
add('breath-mcq', mcq({
  stem: 'Which statement correctly separates respiration from breathing?',
  right: 'Respiration releases energy from food inside cells, while breathing is only gas exchange', wrong: ['Respiration takes place only in the lungs', 'Breathing releases energy from food', 'Respiration takes place only in the day'],
  sol: 'Respiration is a chemical process in cells — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-glyco', ar({
  a: 'Glycolysis can take place even when no oxygen is present.',
  r: 'Glycolysis takes place in the cytoplasm and does not use oxygen.',
  key: 'c',
  sol: 'Both are true, and the second statement explains the first — option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('ar-night', ar({
  a: 'A plant respires only in the dark.',
  r: 'Photosynthesis needs light.',
  key: 'b',
  sol: 'The assertion is false: respiration goes on day and night. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('resp-tf', tf({
  stem: 'Respiration takes place only in the leaves of a plant.',
  key: 'f',
  sol: 'False. It takes place in every living cell, including roots, stems and seeds.',
  d: 1, c: 'understanding', t: [1],
}));
add('term-mito', term({
  stem: 'Give the biological term: the cell structure in which the Krebs cycle takes place.',
  model: '**Mitochondrion** (mitochondria).', sol: 'Mitochondrion.', sch: 'Mitochondria',
  d: 1, c: 'recall', t: [1],
}));
add('odd-resp', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Glucose, Pyruvate, Oxygen, Alcohol.',
  model: '**Oxygen**; the others are **substances that contain carbon**.', sol: 'Oxygen is the only one with no carbon.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [1],
}));
add('reason-mito', term({
  stem: 'Give reason: mitochondria are called the powerhouses of the cell.',
  model: 'Most of the **energy** from food is released in them by the **Krebs cycle**.', sol: 'Most energy is released there.', sch: 'Most energy released',
  d: 2, c: 'understanding', t: [1],
}));
add('glyco-short', short({
  marks: 2,
  stem: 'State where glycolysis takes place and what it produces from one glucose molecule.',
  model: 'Glycolysis takes place in the **cytoplasm**. It splits one glucose into **two pyruvate** molecules and releases **a little energy**, without using oxygen.',
  sol: 'Cytoplasm; two pyruvate.',
  scheme: [['Cytoplasm', 1], ['Two pyruvate (and a little energy)', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('krebs-short', short({
  marks: 2,
  stem: 'State where the Krebs cycle takes place, whether it needs oxygen and what it produces.',
  model: 'It takes place in the **mitochondria** and **needs oxygen**. It produces **carbon dioxide and water** and releases **much energy**.',
  sol: 'Mitochondria; oxygen needed; carbon dioxide, water, energy.',
  scheme: [['Mitochondria, oxygen needed', 1], ['Carbon dioxide, water and energy', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('compare1-table', short({
  marks: 3,
  stem: 'Tabulate three differences between glycolysis and the Krebs cycle.',
  model: '| Glycolysis | Krebs cycle |\n|---|---|\n| In the **cytoplasm** | In the **mitochondria** |\n| **No oxygen** needed | **Oxygen** needed |\n| Glucose gives **pyruvate** | Pyruvate gives **carbon dioxide and water** |\n| **A little** energy | **Much more** energy |',
  sol: 'Site; oxygen; products; energy.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('breath-short', short({
  marks: 3,
  stem: 'Distinguish between respiration and breathing in three points.',
  model: '1. Respiration is a **chemical process** inside cells; breathing or gas exchange is a **physical exchange of gases**.\n2. Respiration **releases energy** from food; breathing releases **none**.\n3. Respiration goes on in **every living cell**; gas exchange takes place at the **surface** of the organism.',
  sol: 'Chemical or physical; energy; place.',
  scheme: [['Chemical against physical', 1], ['Energy released or not', 1], ['Place', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('cell-match5', match({
  marks: 5,
  stem: 'Study the diagram of a cell and match each lettered part with its description.',
  pairs: [
    ['A', 'Place where glucose is split into pyruvate'],
    ['B', 'Place where pyruvate is broken down completely'],
    ['C', 'Three-carbon substance made in glycolysis'],
    ['D', 'Substances released after complete breakdown, with energy'],
    ['E', 'Gas needed by the Krebs cycle'],
  ],
  order: [1, 3, 0, 4, 2],
  sol: 'A cytoplasm; B mitochondrion; C pyruvate; D carbon dioxide and water; E oxygen.',
  d: 2, c: 'application', t: [1],
  assets: [cellFig],
}));

// ---------------------------------------------------------------- t02 aerobic and anaerobic
add('dough-mcq', mcq({
  stem: 'Bread dough rises when yeast is mixed with sugar and left in a warm place. The gas that makes it rise is formed by',
  right: 'anaerobic respiration of the yeast', wrong: ['photosynthesis in the yeast', 'aerobic respiration of the flour', 'breathing of the yeast'],
  sol: 'Yeast respires sugar without much oxygen and gives off carbon dioxide — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('flood-mcq', mcq({
  stem: 'The roots of a potted plant are in water-logged soil with little air. The roots will mainly',
  right: 'respire anaerobically and form alcohol', wrong: ['respire aerobically and form more energy', 'stop respiring at once', 'photosynthesise'],
  sol: 'Without oxygen, the roots carry out anaerobic respiration and make alcohol — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('eq-mcq', mcq({
  stem: 'Which equation represents the anaerobic respiration of glucose in plants?',
  right: String.raw`$\ce{C6H12O6 -> 2C2H5OH + 2CO2 + energy}$`, wrong: [String.raw`$\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O + energy}$`, String.raw`$\ce{6CO2 + 6H2O -> C6H12O6 + 6O2}$`, String.raw`$\ce{C6H12O6 -> 2C3H6O3 + energy}$`],
  sol: 'Plants form alcohol and carbon dioxide without oxygen — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('energy-mcq', mcq({
  stem: 'Compared with anaerobic respiration, aerobic respiration releases',
  right: 'much more energy because glucose is broken down completely', wrong: ['less energy because oxygen is used', 'the same energy in fewer steps', 'no energy but more heat'],
  sol: 'Complete breakdown releases far more energy — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('co2-num', num({
  stem: `${N8} glucose molecules are respired anaerobically in yeast. How many carbon dioxide molecules are formed?`,
  value: N8_CO2,
  sol: r`$${N8} \times 2 = ${N8_CO2}$ molecules.`,
  scheme: [[`${N8_CO2}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 16 || 'value');
add('atp-num', num({
  stem: `Taking the energy released as ${ATP_AERO} units for each glucose in aerobic respiration and ${ATP_ANAERO} units in anaerobic respiration, how many times more energy does aerobic respiration release from the same amount of glucose?`,
  value: ATP_RATIO,
  sol: r`$${ATP_AERO} \div ${ATP_ANAERO} = ${ATP_RATIO}$ times.`,
  scheme: [[`${ATP_RATIO}`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 18 || 'value');
add('ar-anaero', ar({
  a: 'Anaerobic respiration releases less energy than aerobic respiration.',
  r: 'In anaerobic respiration glucose is broken down only partly.',
  key: 'c',
  sol: 'Both are true, and partial breakdown explains the lower energy — option (c).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-yeast', ar({
  a: 'Yeast can respire in the absence of oxygen.',
  r: 'Yeast forms lactic acid when it respires without oxygen.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: yeast forms alcohol and carbon dioxide — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('lactic-tf', tf({
  stem: 'In plants, anaerobic respiration forms lactic acid.',
  key: 'f',
  sol: 'False. In plants and yeast it forms alcohol and carbon dioxide.',
  d: 1, c: 'recall', t: [2],
}));
add('term-aero', term({
  stem: 'Give the biological term: respiration that takes place in the absence of oxygen.',
  model: '**Anaerobic respiration.**', sol: 'Anaerobic respiration.', sch: 'Anaerobic respiration',
  d: 1, c: 'recall', t: [2],
}));
add('odd-eq', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Alcohol, Carbon dioxide, Water, Glucose.',
  model: '**Glucose**; the others are **products of respiration**.', sol: 'Glucose is the substrate that is broken down.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2],
}));
add('reason-anaero', term({
  stem: 'Give reason: anaerobic respiration releases much less energy than aerobic respiration.',
  model: 'Glucose is **only partly broken down**, and much of the energy is still held in the **alcohol**.', sol: 'Partial breakdown.', sch: 'Partial breakdown',
  d: 2, c: 'understanding', t: [2],
}));
add('fill-eq', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [oxygen, alcohol, mitochondria, cytoplasm, water, lactic acid, pyruvate, nucleus]\n\nGlycolysis takes place in the (a) ______ and forms (b) ______ from glucose. The Krebs cycle takes place in the (c) ______ and needs (d) ______. In plants, respiration without oxygen forms carbon dioxide and (e) ______.',
  acc: [['cytoplasm'], ['pyruvate'], ['mitochondria', 'mitochondrion'], ['oxygen'], ['alcohol']],
  sol: '(a) cytoplasm; (b) pyruvate; (c) mitochondria; (d) oxygen; (e) alcohol.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('aero-short', short({
  marks: 2,
  stem: 'Write the balanced equation for aerobic respiration of glucose.',
  model: 'C6H12O6 + 6O2 → 6CO2 + 6H2O + energy (glucose and oxygen give carbon dioxide, water and **energy**). The equation is **balanced**: six carbon atoms on each side.',
  sol: 'Balanced equation with energy.',
  scheme: [['Correct reactants and products', 1], ['Balanced, with energy', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('anaero-short', short({
  marks: 2,
  stem: 'Write the equation for anaerobic respiration in plants and name the two products.',
  model: 'C6H12O6 → 2C2H5OH + 2CO2 + energy (glucose gives alcohol, carbon dioxide and a little energy). The two products are **alcohol (ethanol)** and **carbon dioxide**, and no oxygen is used.',
  sol: 'Equation; alcohol and carbon dioxide.',
  scheme: [['Equation', 1], ['Two products named', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('aeroanaero-table', short({
  marks: 3,
  stem: 'Tabulate three differences between aerobic and anaerobic respiration.',
  model: '| Aerobic | Anaerobic |\n|---|---|\n| **Needs oxygen** | **No oxygen** needed |\n| **Complete** breakdown of glucose | **Incomplete** breakdown |\n| Forms **carbon dioxide and water** | Forms **alcohol and carbon dioxide** |\n| **Much** energy | **Little** energy |',
  sol: 'Oxygen; breakdown; products; energy.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('yeast-short', short({
  marks: 3,
  stem: 'Yeast in sugar solution produces bubbles. Name the process, the gas formed and the other product, and say whether oxygen is needed.',
  model: 'The process is **anaerobic respiration (fermentation)**, in which the yeast breaks glucose down only partly. The gas formed is **carbon dioxide** and the other product is **alcohol**. **Oxygen is not needed**, and only a small amount of energy is released.',
  sol: 'Fermentation; carbon dioxide and alcohol; no oxygen.',
  scheme: [['Anaerobic respiration or fermentation', 1], ['Carbon dioxide and alcohol', 1], ['Oxygen not needed', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 gaseous exchange and the carbon dioxide experiment
add('stoma-mcq', mcq({
  stem: 'Oxygen from the air reaches the inside of a young leaf mainly through tiny pores called',
  right: 'stomata', wrong: ['lenticels', 'root hairs', 'pollen tubes'],
  sol: 'Stomata open into the spaces inside the leaf — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('root-mcq', mcq({
  stem: 'Roots of a plant growing in compact, water-logged soil may die because they cannot get enough',
  right: 'oxygen for respiration', wrong: ['carbon dioxide for photosynthesis', 'light for photosynthesis', 'chlorophyll'],
  sol: 'Roots respire and need oxygen from the soil air — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('limewater-mcq', mcq({
  stem: 'Lime water in a test tube turns milky after air from a flask of germinating seeds is passed through it. This shows that the seeds',
  right: 'give out carbon dioxide', wrong: ['take in carbon dioxide', 'give out oxygen', 'take in water'],
  sol: 'The milky colour is the test for carbon dioxide — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('figX-mcq', mcq({
  stem: 'In the figure of two flasks with delivery tubes into lime water, the lime water is expected to turn milky first in the tube joined to',
  right: 'flask X, which holds soaked seeds', wrong: ['flask Y, which holds boiled seeds', 'both flasks at the same time', 'neither flask'],
  sol: 'Only living seeds respire and give out carbon dioxide — option (@K).',
  d: 3, c: 'analysis', t: [3],
  assets: [co2Fig],
}));
add('diffusion-mcq', mcq({
  stem: 'Gases move into and out of a plant mainly by',
  right: 'diffusion', wrong: ['breathing movements', 'pumping by a heart', 'osmosis through the cell wall'],
  sol: 'Plants have no lungs; gases move by diffusion — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-lime', ar({
  a: 'Flask Y, with boiled seeds, is the control in the carbon dioxide experiment.',
  r: 'Boiled seeds are dead and cannot respire.',
  key: 'c',
  sol: 'Both are true, and the death of the seeds explains why Y is a control — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-leaf', ar({
  a: 'Gases enter the leaf through stomata.',
  r: 'Lenticels are present on the leaf surface.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: lenticels are found on woody stems, not on leaves — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('lime-tf', tf({
  stem: 'Lime water turns milky when oxygen is passed through it.',
  key: 'f',
  sol: 'False. It turns milky with carbon dioxide.',
  d: 1, c: 'recall', t: [3],
}));
add('term-lenticel', term({
  stem: 'Give the biological term: the small pores in the bark of a woody stem through which gases pass.',
  model: '**Lenticels.**', sol: 'Lenticels.', sch: 'Lenticels',
  d: 1, c: 'recall', t: [3],
}));
add('odd-organ', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Stomata, Lenticels, Root hairs, Mitochondria.',
  model: '**Mitochondria**; the others are **places where gases enter or leave the plant**.', sol: 'Mitochondria are inside cells.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [3],
}));
add('reason-dead', term({
  stem: 'Give reason: the seeds used in the control flask are boiled and cooled.',
  model: 'Boiling **kills** the seeds, so they **cannot respire**.', sol: 'Dead seeds do not respire.', sch: 'Seeds are killed',
  d: 2, c: 'understanding', t: [3],
}));
add('lime-num', num({
  stem: `The lime water turned milky in ${LIME[0].minutes} minutes with ${LIME[0].mass} g of germinating seeds and in ${LIME[1].minutes} minutes with ${LIME[1].mass} g. How many minutes sooner did it turn milky with the larger mass?`,
  value: LIME_DIFF,
  sol: r`$${LIME[0].minutes} - ${LIME[1].minutes} = ${LIME_DIFF}$ minutes.`,
  scheme: [[`${LIME_DIFF}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 18 || 'value');
add('stomata-num', num({
  stem: `A patch of a leaf has ${STOMATA} stomata. In light, 3 out of every 4 are open. How many are closed?`,
  value: STOMATA_SHUT,
  sol: r`Open: $${STOMATA} \times 3 \div 4 = ${STOMATA_OPEN}$; closed: $${STOMATA} - ${STOMATA_OPEN} = ${STOMATA_SHUT}$.`,
  scheme: [[`${STOMATA_SHUT}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 300 || 'value');
add('gas-short', short({
  marks: 2,
  stem: 'Name the openings through which gases pass in (i) a leaf and (ii) a woody stem.',
  model: '(i) In a leaf the gases pass through the **stomata**. (ii) In a woody stem they pass through the **lenticels**.',
  sol: 'Stomata; lenticels.',
  scheme: [['Stomata in leaf', 1], ['Lenticels in woody stem', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('night-short', short({
  marks: 2,
  stem: 'A green plant gives out carbon dioxide at night but takes it in during the day. Explain why.',
  model: 'At night only **respiration** goes on, which **gives out carbon dioxide**. In the day **photosynthesis** also goes on and **uses more carbon dioxide** than respiration releases.',
  sol: 'Night: respiration only; day: photosynthesis uses more.',
  scheme: [['Night: respiration gives carbon dioxide', 1], ['Day: photosynthesis uses it', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('co2design-short', short({
  marks: 3,
  stem: 'Describe an experiment to show that germinating seeds give out carbon dioxide. Name the control.',
  model: 'Put **soaked germinating seeds** in one flask and an **equal mass of boiled, cooled (dead) seeds** in another. Fit each with a **cork and delivery tube** dipping into **lime water**. After some hours the lime water **turns milky** with the living seeds but stays **clear** in the **control (boiled seeds)**.',
  sol: 'Living and boiled seeds; lime water; milky against clear; control named.',
  scheme: [['Live and boiled seeds in flasks with delivery tubes into lime water', 1], ['Lime water milky only with live seeds', 1], ['Control is the boiled seeds', 1]],
  d: 2, c: 'application', t: [3],
}));
add('rp-table', short({
  marks: 3,
  stem: 'Tabulate three differences between respiration and photosynthesis in plants.',
  model: '| Respiration | Photosynthesis |\n|---|---|\n| Goes on **day and night** | Only in **light** |\n| Uses **oxygen**, gives **carbon dioxide** | Uses **carbon dioxide**, gives **oxygen** |\n| **Breaks down** food and **releases** energy | **Makes** food and **stores** energy |',
  sol: 'Time; gases; food and energy.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 heat in respiration
add('rise-mcq', mcq({
  stem: 'The thermometer in a vacuum flask of soaked germinating seeds shows a rise in temperature. This is because the seeds',
  right: 'release heat during respiration', wrong: ['absorb heat from the cotton wool', 'make heat by photosynthesis', 'take in cold air'],
  sol: 'Some of the energy released in respiration appears as heat — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('cotton-mcq', mcq({
  stem: 'In the thermos-flask experiment the mouth of the flask is closed with cotton wool, and not with a rubber stopper, because cotton wool',
  right: 'lets air in for the living seeds while keeping heat in', wrong: ['absorbs the heat from the seeds', 'makes the seeds respire faster', 'keeps all the air out'],
  sol: 'The seeds need oxygen, so air must be able to enter — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('vac-mcq', mcq({
  stem: 'A vacuum flask is used in the experiment on heat from germinating seeds because it',
  right: 'stops heat from escaping, so a small rise can be measured', wrong: ['supplies oxygen to the seeds', 'adds heat to the seeds', 'kills any germs'],
  sol: 'The vacuum is a poor conductor of heat — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('figThermos-mcq', mcq({
  stem: 'In the figure of two vacuum flasks, which flask is expected to show a rise in temperature after a few days?',
  right: 'A, which holds germinating seeds', wrong: ['B, which holds boiled seeds', 'Both by the same amount', 'Neither flask'],
  sol: 'Only living seeds release heat in respiration — option (@K).',
  d: 3, c: 'analysis', t: [4],
  assets: [thermosFig],
}));
add('ar-heat', ar({
  a: 'The thermometer in the flask of boiled seeds does not rise.',
  r: 'Cotton wool lets air into the flask.',
  key: 'd',
  sol: 'Both are true, but letting air in does not explain why the boiled seeds give out no heat — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('heat-tf', tf({
  stem: 'In the thermos-flask experiment, both flasks must start at the same temperature.',
  key: 't',
  sol: 'True. Only then can the rises be compared fairly.',
  d: 2, c: 'understanding', t: [4],
}));
add('term-control', term({
  stem: 'Give the biological term: a set-up that is identical to the experiment except for the one factor being tested.',
  model: '**Control.**', sol: 'Control.', sch: 'Control',
  d: 1, c: 'recall', t: [4],
}));
add('rise-num', num({
  stem: `The thermometer in a flask of germinating seeds reads ${FLASK_A[0]} degrees at the start and ${FLASK_A[4]} degrees four days later. What is the mean rise in degrees each day?`,
  value: RISE_PER_DAY,
  sol: r`$(${FLASK_A[4]} - ${FLASK_A[0]}) \div 4 = ${RISE_PER_DAY}$ degrees a day.`,
  scheme: [[`${RISE_PER_DAY}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 2 || 'value');
add('control-short', short({
  marks: 2,
  stem: 'Why is a flask of boiled seeds set up beside the flask of germinating seeds in the heat experiment?',
  model: 'It is the **control**. The boiled seeds are **dead**, so if its thermometer shows **no rise**, the heat in the other flask must come from **living seeds**.',
  sol: 'Control; shows heat comes from living seeds.',
  scheme: [['It is the control with dead seeds', 1], ['Shows heat comes from living seeds', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('thermos-short', short({
  marks: 2,
  stem: 'State the use of (i) the cotton wool and (ii) the vacuum flask in the experiment on heat from germinating seeds.',
  model: '(i) The **cotton wool** lets **air** reach the seeds but **holds the heat in**. (ii) The **vacuum flask** **prevents heat from escaping**, so a small rise can be measured.',
  sol: 'Cotton wool lets air in; vacuum flask keeps heat.',
  scheme: [['Cotton wool', 1], ['Vacuum flask', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('heatdesign-short', short({
  marks: 3,
  stem: 'Describe an experiment to show that heat is produced during respiration in germinating seeds.',
  model: 'Put **soaked germinating seeds** in one **vacuum flask** and **soaked seeds that were boiled and cooled** in another. Close each with **cotton wool** through which a **thermometer** passes. After a few days the thermometer in the flask of **living seeds shows a rise**; the **control (boiled seeds)** shows none.',
  sol: 'Living and boiled seeds in vacuum flasks; thermometers; rise in living only.',
  scheme: [['Living and boiled seeds in vacuum flasks', 1], ['Thermometer through cotton wool', 1], ['Rise only with living seeds; control named', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('cell-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of a plant cell showing respiration. Parts are lettered A to E.\n\n(a) Name the part A and the stage of respiration that takes place there. [2]\n\n(b) Name the part B and the stage that takes place there. [2]\n\n(c) Name the substance C and the gas E. [2]\n\n(d) Draw a neat, labelled diagram of a mitochondrion, naming four parts or substances that enter or leave it. [4]',
  model: '**(a)** A is the **cytoplasm**; **glycolysis** takes place there.\n\n**(b)** B is the **mitochondrion**; the **Krebs cycle** takes place there.\n\n**(c)** C is **pyruvate**; E is **oxygen**.\n\n**(d)** An **oval** with a **folded inner membrane**; arrows for **pyruvate** and **oxygen** entering and **carbon dioxide** and **water** (and energy) leaving. Four labels.',
  sol: 'Cytoplasm, glycolysis; mitochondrion, Krebs cycle; pyruvate, oxygen; labelled mitochondrion.',
  scheme: [['A cytoplasm', 1], ['Glycolysis', 1], ['B mitochondrion', 1], ['Krebs cycle', 1], ['C pyruvate', 1], ['E oxygen', 1], ['Mitochondrion outline with inner folds', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [1],
  assets: [cellFig],
}));
add('yeast-long', long({
  marks: 10, wl: null,
  stem: `A baker mixes yeast with sugar solution in a closed bottle with no air. The gas given off bubbles through a tube into water and ${YEAST_ML} mL is collected in ${YEAST_MIN} minutes.\n\n(a) Name the process taking place and the gas given off. [2]\n\n(b) Calculate the mean volume of gas given off each minute. [2]\n\n(c) Write the equation for this process. [3]\n\n(d) Draw a neat, labelled diagram of the apparatus, naming three parts. [3]`,
  model: `**(a)** **Anaerobic respiration** (fermentation); the gas is **carbon dioxide**.\n\n**(b)** ${YEAST_ML} ÷ ${YEAST_MIN} = **${YEAST_RATE} mL each minute**.\n\n**(c)** C6H12O6 → 2C2H5OH + 2CO2 + energy (**alcohol** and **carbon dioxide** formed).\n\n**(d)** A **bottle** of yeast and sugar solution, a **delivery tube** and a **container of water** (or a measuring tube) to collect the gas. Three labels.`,
  sol: `Anaerobic respiration, carbon dioxide; ${YEAST_RATE} mL a minute; equation; labelled apparatus.`,
  scheme: [['Anaerobic respiration', 1], ['Carbon dioxide', 1], [`${YEAST_RATE} mL a minute`, 2], ['Correct reactant and products', 1], ['Balanced', 1], ['Energy shown', 1], ['Apparatus drawn', 1], ['Three labels', 2]],
  d: 3, c: 'application', t: [2],
}), (q) => YEAST_RATE === 1.5 || 'rate');
add('co2-long', long({
  marks: 10, wl: null,
  stem: `A student sets up the flasks X and Y shown in the diagram. X holds soaked germinating seeds and Y holds an equal mass of soaked seeds that were boiled and cooled. Each flask has a delivery tube dipping into lime water. In a second trial the lime water turned milky in ${LIME[0].minutes} minutes with ${LIME[0].mass} g of germinating seeds and in ${LIME[1].minutes} minutes with ${LIME[1].mass} g.\n\n(a) State what happens to the lime water in X and in Y. [2]\n\n(b) Name the control and state why it is needed. [2]\n\n(c) Calculate how many times faster the lime water turned milky with ${LIME[1].mass} g than with ${LIME[0].mass} g, and give the reason. [2]\n\n(d) Draw a neat, labelled diagram of flask X with its delivery tube and lime water, naming four parts. [4]`,
  model: `**(a)** In X the lime water **turns milky**; in Y it **stays clear**.\n\n**(b)** **Flask Y** is the control. Its seeds are dead, so it shows that the **carbon dioxide comes from living seeds** and not from the apparatus.\n\n**(c)** ${LIME[0].minutes} ÷ ${LIME[1].minutes} = **${LIME_RATIO} times** faster. More seeds respire, so **more carbon dioxide** is given out each minute.\n\n**(d)** A **flask** with **germinating seeds**, a **cork**, a **delivery tube** and a **test tube of lime water**. Four labels.`,
  sol: `X milky, Y clear; Y control; ${LIME_RATIO} times faster; labelled flask X.`,
  scheme: [['X milky', 1], ['Y clear', 1], ['Y named as control', 1], ['Reason for the control', 1], [`${LIME_RATIO} times`, 1], ['Reason: more seeds, more carbon dioxide', 1], ['Flask with tube and lime water drawn', 2], ['Four labels', 2]],
  d: 3, c: 'analysis', t: [3],
  assets: [co2Fig],
}), (q) => LIME_RATIO === 2 || 'ratio');
add('heat-long', long({
  marks: 10, wl: null,
  stem: `Two vacuum flasks A and B are set up. A holds soaked germinating seeds and B holds soaked seeds that were boiled and cooled. Each has cotton wool and a thermometer. The thermometer in A reads ${FLASK_A.join(', ')} degrees on days 0 to 4, and the thermometer in B reads ${FLASK_B.join(', ')} degrees.\n\n(a) Calculate the rise in temperature in A and the mean rise each day. [2]\n\n(b) Explain why the temperature in B did not change. [2]\n\n(c) State the use of the cotton wool and of the vacuum flask. [2]\n\n(d) Draw a neat, labelled diagram of flask A, naming four parts. [4]`,
  model: `**(a)** Rise = ${FLASK_A[4]} − ${FLASK_A[0]} = **${RISE_A} degrees**; mean = ${RISE_A} ÷ 4 = **${RISE_PER_DAY} degrees a day**.\n\n**(b)** B holds **dead** seeds, which **do not respire** and so release no heat; it is the **control**.\n\n**(c)** **Cotton wool** lets **air** in and holds the thermometer; the **vacuum flask** **stops heat escaping**.\n\n**(d)** A **vacuum flask** with **germinating seeds**, a **cotton wool plug** and a **thermometer** with its bulb among the seeds. Four labels.`,
  sol: `${RISE_A} degrees and ${RISE_PER_DAY} a day; dead seeds do not respire; cotton wool and vacuum flask; labelled flask.`,
  scheme: [[`${RISE_A} degrees`, 1], [`${RISE_PER_DAY} degrees a day`, 1], ['Seeds are dead', 1], ['No respiration, no heat', 1], ['Cotton wool lets air in', 1], ['Vacuum flask keeps heat', 1], ['Flask with seeds, plug and thermometer drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [4],
  assets: [thermosFig],
}), (q) => RISE_A === 8 || 'rise');
add('flood-long', long({
  marks: 10, wl: null,
  stem: `A farmer's field floods and the roots of the crop are under water for a week, with almost no air. A student reads that aerobic respiration releases ${ATP_AERO} units of energy and anaerobic respiration ${ATP_ANAERO} units for each glucose molecule.\n\n(a) Name the type of respiration that the roots will mainly carry out and give a reason. [2]\n\n(b) Name the end products and state how they differ from those of aerobic respiration. [2]\n\n(c) Calculate the energy released from 12 glucose molecules by anaerobic respiration. [2]\n\n(d) Draw a neat, labelled diagram of a cell showing where glycolysis and the Krebs cycle take place, with four labels. [4]`,
  model: `**(a)** **Anaerobic respiration**, because there is **little or no oxygen**.\n\n**(b)** **Alcohol and carbon dioxide**; aerobic respiration forms **carbon dioxide and water**.\n\n**(c)** 12 × ${ATP_ANAERO} = **${ATP_12} units**.\n\n**(d)** A **cell** with **cytoplasm** (glycolysis) and a **mitochondrion** (Krebs cycle), with arrows for **glucose** and **pyruvate**. Four labels.`,
  sol: `Anaerobic, no oxygen; alcohol and carbon dioxide; ${ATP_12} units; labelled cell.`,
  scheme: [['Anaerobic respiration', 1], ['Reason: no oxygen', 1], ['Alcohol and carbon dioxide', 1], ['Differs from aerobic products', 1], ['12 × 2', 1], [`${ATP_12} units`, 1], ['Cell with cytoplasm and mitochondrion drawn', 2], ['Four labels', 2]],
  d: 4, c: 'analysis', t: [1, 2],
}), (q) => ATP_12 === 24 || 'atp');
add('gasex-long', long({
  marks: 10, wl: null,
  stem: `A leaf patch has ${STOMATA} stomata, of which ${STOMATA_OPEN} are open in bright light. A student also notes that the bark of a tree has small raised pores and that the roots of the same tree absorb oxygen from the soil.\n\n(a) Calculate how many stomata are closed. [2]\n\n(b) Name the pores in the bark and state how roots get oxygen. [2]\n\n(c) State the process by which gases move through these openings. [1]\n\n(d) Explain why a green plant gives out carbon dioxide at night but not by day. [2]\n\n(e) Draw a neat, labelled diagram of the control flask Y of the carbon dioxide experiment, naming three parts. [3]`,
  model: `**(a)** ${STOMATA} − ${STOMATA_OPEN} = **${STOMATA_SHUT}**.\n\n**(b)** The pores are **lenticels**; roots take **oxygen from air spaces in the soil** through root hairs and surface cells.\n\n**(c)** **Diffusion**.\n\n**(d)** At night only **respiration** goes on, giving out carbon dioxide; by day **photosynthesis uses it**, in greater amounts than respiration releases.\n\n**(e)** A **flask** with **boiled seeds**, a **cork** and **delivery tube** into **lime water**. Three labels.`,
  sol: `${STOMATA_SHUT} closed; lenticels, oxygen from soil air; diffusion; night and day; labelled flask Y.`,
  scheme: [[`${STOMATA_SHUT}`, 2], ['Lenticels', 1], ['Roots take oxygen from soil air', 1], ['Diffusion', 1], ['Night respiration only', 1], ['Day photosynthesis uses carbon dioxide', 1], ['Flask Y drawn', 1], ['Three labels', 2]],
  d: 3, c: 'application', t: [3],
}), (q) => STOMATA_SHUT === 300 || 'closed');
