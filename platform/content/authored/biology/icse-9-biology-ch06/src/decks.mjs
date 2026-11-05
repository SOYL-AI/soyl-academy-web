// ICSE 9 Biology ch06 Respiration in Plants — Part 1 (t01–t02), Part 2 (t03–t04).
import { sl, deck, table, flow, chem, svgV, r } from '../../icse-9-biology-ch01/src/lib.mjs';
import { CELL, CO2_SET, THERMOS } from './svgs.mjs';
import { N5, N5_O2, N5_CO2, N5_WATER, N8, N8_ETHANOL, N8_CO2, LIME, LIME_RATIO, FLASK_A, FLASK_B, RISE_A, RISE_B, RISE_PER_DAY } from './calc.mjs';

export const V = {
  cell: svgV(CELL, 'A plant cell showing glycolysis in the cytoplasm and the Krebs cycle in the mitochondrion'),
  co2: svgV(CO2_SET, 'Two flasks of seeds with delivery tubes into lime water: germinating seeds turn it milky, boiled seeds do not'),
  thermos: svgV(THERMOS, 'Two vacuum flasks with thermometers, one with germinating seeds and one with boiled seeds'),
};
const aeroEq = chem(r`C6H12O6 + 6O2 -> 6CO2 + 6H2O + \text{energy}`, 'Aerobic respiration: one glucose and six oxygen give six carbon dioxide, six water and energy');
const anaeroEq = chem(r`C6H12O6 -> 2C2H5OH + 2CO2 + \text{energy}`, 'Anaerobic respiration: one glucose gives two ethanol, two carbon dioxide and a little energy');

export const deck1 = deck({
  part: 1,
  title: 'Respiration in Plants — Part 1: Glycolysis, the Krebs cycle, and aerobic and anaerobic respiration',
  goals: [
    'State where glycolysis and the Krebs cycle take place and what each produces',
    'Write equations for aerobic and anaerobic respiration in plants',
    'Compare aerobic and anaerobic respiration in energy released and end products',
  ],
  slides: [
    sl('title', 'Respiration in Plants', {
      b: 'Part 1 — how every living cell of a plant releases the energy locked in food.',
      v: flow('LR', [['g', 'Glucose'], ['r', 'Respiration'], ['e', 'Energy for life processes']], [['g', 'r'], ['r', 'e']], 'Flow from glucose through respiration to energy for life processes'),
      n: 'A plant makes food in its leaves, but food is of no use until the energy in it is released. That release is respiration, and it goes on all day and all night in every living cell, in roots, stems, leaves and seeds.',
    }),
    sl('concept', 'Respiration is not breathing', {
      v: table(['', 'Respiration', 'Breathing or gas exchange'], [['Where', 'Inside every cell', 'At the surface of the organism'], ['What happens', 'Food is broken down to release energy', 'Gases are exchanged with the surroundings'], ['Result', 'Energy, carbon dioxide, water or alcohol', 'Oxygen taken in, carbon dioxide given out']], 'Table distinguishing respiration inside cells from gas exchange at the surface'),
      n: 'Do not confuse respiration with breathing. Respiration is a chemical process inside the cell that releases energy from food. Gas exchange is only the way oxygen reaches the cell and carbon dioxide leaves it.',
    }),
    sl('diagram', 'Where respiration happens', {
      b: 'Glucose is first broken down in the **cytoplasm**; the breakdown is finished in the **mitochondrion**.',
      v: V.cell,
      n: 'In the fluid of the cell, glucose is split into a smaller substance called pyruvate. With oxygen present, pyruvate moves into a mitochondrion, where it is broken down completely. Without oxygen, the cell makes alcohol and carbon dioxide instead.',
    }),
    sl('concept', 'Glycolysis and the Krebs cycle', {
      v: table(['', 'Glycolysis', 'Krebs cycle'], [['Where', 'Cytoplasm', 'Mitochondria'], ['Needs oxygen?', 'No', 'Yes'], ['Starts with', 'Glucose (six carbon atoms)', 'Pyruvate'], ['Produces', 'Two pyruvate and a little energy', 'Carbon dioxide, water and much more energy']], 'Table comparing glycolysis and the Krebs cycle for site, oxygen need, starting substance and products'),
      n: 'Glycolysis happens in the cytoplasm and does not need oxygen. It splits one glucose into two pyruvate and releases a little energy. The Krebs cycle happens in the mitochondria and needs oxygen. It releases carbon dioxide, water and most of the energy.',
    }),
    sl('check', 'Quick check: the site of glycolysis', {
      b: 'Glycolysis takes place in the',
      chk: 'chk-glyco',
      n: 'Where does glucose first meet the enzymes?',
    }),
    sl('concept', 'Aerobic respiration', {
      b: 'Aerobic respiration uses **oxygen** and breaks glucose down **completely**.',
      v: aeroEq,
      n: 'In aerobic respiration, one glucose molecule reacts with six molecules of oxygen to give six molecules of carbon dioxide and six of water, and a large amount of energy. It is the usual kind of respiration in plants.',
    }),
    sl('example', 'Worked example 1: aerobic respiration of five glucose molecules', {
      b: `${N5} glucose molecules are respired aerobically. How many oxygen molecules are used, and how many carbon dioxide and water molecules are made?`,
      ul: [`Step 1: one glucose uses 6 oxygen, so ${N5} × 6 = **${N5_O2}**.`, `Step 2: one glucose makes 6 carbon dioxide, so ${N5} × 6 = **${N5_CO2}**.`, `Step 3: one glucose makes 6 water, so ${N5} × 6 = **${N5_WATER}**.`],
      v: table(['Substance', 'Per glucose', `For ${N5} glucose`], [['Oxygen used', '6', String(N5_O2)], ['Carbon dioxide made', '6', String(N5_CO2)], ['Water made', '6', String(N5_WATER)]], 'Worked table: thirty oxygen used, thirty carbon dioxide and thirty water made for five glucose'),
      n: 'Read the numbers from the equation for one glucose and multiply by five. Six oxygen each gives thirty. Six carbon dioxide each gives thirty. Six water each gives thirty.',
    }),
    sl('concept', 'Anaerobic respiration', {
      b: 'In plants and yeast, anaerobic respiration works **without oxygen** and gives **alcohol**.',
      v: anaeroEq,
      n: 'Without oxygen, one glucose molecule is only partly broken down. It gives two molecules of alcohol and two of carbon dioxide, and releases much less energy. Yeast and roots in waterlogged soil respire in this way.',
    }),
    sl('concept', 'Aerobic and anaerobic compared', {
      v: table(['Feature', 'Aerobic', 'Anaerobic'], [['Oxygen', 'Needed', 'Not needed'], ['Breakdown of glucose', 'Complete', 'Incomplete'], ['End products', 'Carbon dioxide and water', 'Alcohol and carbon dioxide'], ['Energy released', 'Large (about 36 units per glucose)', 'Small (2 units per glucose)'], ['Site', 'Cytoplasm and mitochondria', 'Cytoplasm only']], 'Table comparing aerobic and anaerobic respiration in oxygen, breakdown, end products, energy and site'),
      n: 'Aerobic respiration needs oxygen, breaks glucose down completely, and gives carbon dioxide and water with a large amount of energy. Anaerobic respiration needs no oxygen and gives alcohol and carbon dioxide with only a small amount of energy.',
    }),
    sl('check', 'Quick check: alcohol', {
      b: 'In plants, anaerobic respiration of glucose gives carbon dioxide and',
      chk: 'chk-ethanol',
      n: 'Think of what yeast makes in fermentation.',
    }),
    sl('example', 'Worked example 2: anaerobic respiration of eight glucose molecules', {
      b: `${N8} glucose molecules are respired without oxygen. How many alcohol and carbon dioxide molecules are made?`,
      ul: [`Step 1: one glucose gives 2 alcohol, so ${N8} × 2 = **${N8_ETHANOL}**.`, `Step 2: one glucose gives 2 carbon dioxide, so ${N8} × 2 = **${N8_CO2}**.`],
      v: table(['Product', 'Per glucose', `For ${N8} glucose`], [['Alcohol (ethanol)', '2', String(N8_ETHANOL)], ['Carbon dioxide', '2', String(N8_CO2)]], 'Worked table: sixteen alcohol molecules and sixteen carbon dioxide molecules from eight glucose'),
      n: 'Use the anaerobic equation for one glucose. It gives two alcohol and two carbon dioxide. Multiply each by eight and you get sixteen of each.',
    }),
    sl('check', 'Quick check: the larger energy yield', {
      b: 'Which kind of respiration releases more energy from each glucose molecule?',
      chk: 'chk-aeroenergy',
      n: 'Complete breakdown releases more.',
    }),
    sl('summary', 'Summary', {
      ul: ['Glycolysis: cytoplasm, glucose to pyruvate, no oxygen needed.', 'Krebs cycle: mitochondria, needs oxygen, gives carbon dioxide, water and most of the energy.', 'Aerobic: more energy; anaerobic in plants: alcohol, carbon dioxide and little energy.'],
      v: table(['', 'Aerobic', 'Anaerobic'], [['Oxygen', 'Yes', 'No'], ['Products', 'Carbon dioxide, water', 'Alcohol, carbon dioxide'], ['Energy', 'Large', 'Small']], 'Summary table of aerobic and anaerobic respiration'),
      n: 'To recap. Glucose is first split in the cytoplasm by glycolysis. With oxygen the Krebs cycle in the mitochondria finishes the job and releases a lot of energy. Without oxygen plants make alcohol and carbon dioxide and release only a little energy.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write the equations **balanced**, with **energy** on the right.', 'Name the **site**: glycolysis in the **cytoplasm**, Krebs cycle in the **mitochondria**.', 'Do not call respiration **breathing**.', 'In comparisons, give a **matching point** for each side.'],
      n: 'Exam tips. Write equations balanced and show energy on the right. Name the site of each stage. Never call respiration breathing. And in a comparison, give a matching point for aerobic and for anaerobic respiration.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Respiration in Plants — Part 2: Gaseous exchange and experiments on respiration',
  goals: [
    'Describe how plants exchange gases and how respiration differs from photosynthesis',
    'Describe an experiment showing that germinating seeds give out carbon dioxide',
    'Describe the thermos-flask experiment for heat and explain the need for a control',
  ],
  slides: [
    sl('title', 'Gaseous Exchange and Experiments', {
      b: 'Part 2 — how gases move in plants, and how we can prove that seeds respire.',
      v: flow('LR', [['o', 'Oxygen in'], ['r', 'Respiration'], ['c', 'Carbon dioxide and heat out']], [['o', 'r'], ['r', 'c']], 'Flow from oxygen in, to respiration, to carbon dioxide and heat out'),
      n: 'Respiration takes in oxygen and gives out carbon dioxide and heat. We cannot see this, so we design experiments that make it visible, using germinating seeds because they respire fast.',
    }),
    sl('concept', 'Gaseous exchange in plants', {
      v: table(['Organ', 'Opening or surface', 'Gases that pass'], [['Leaves', 'Stomata', 'Oxygen in and carbon dioxide out (reverse in light, for photosynthesis)'], ['Young stems', 'Stomata', 'The same'], ['Woody stems', 'Lenticels', 'Oxygen in and carbon dioxide out'], ['Roots', 'Root hairs and surface cells', 'Oxygen from air spaces in the soil']], 'Table of the organs of a plant, their openings and the gases that pass through them'),
      n: 'Plants have no lungs. Gases diffuse through tiny pores called stomata in the leaves and young stems, through lenticels in woody stems, and through the surface of the roots, which take oxygen from air spaces in the soil.',
    }),
    sl('concept', 'Respiration and photosynthesis', {
      v: table(['', 'Respiration', 'Photosynthesis'], [['When', 'Day and night', 'Only in light'], ['Gas taken in', 'Oxygen', 'Carbon dioxide'], ['Gas given out', 'Carbon dioxide', 'Oxygen'], ['Food', 'Broken down', 'Made'], ['Energy', 'Released', 'Stored']], 'Table comparing respiration and photosynthesis'),
      n: 'The two processes are opposites. Respiration goes on day and night, uses oxygen and releases energy. Photosynthesis needs light, uses carbon dioxide and stores energy in food. In daylight a green plant gives out more oxygen than it takes in.',
    }),
    sl('check', 'Quick check: openings in woody stems', {
      b: 'Gases enter and leave the woody stem of a tree through',
      chk: 'chk-stomata',
      n: 'Think of the small raised pores on bark.',
    }),
    sl('diagram', 'Carbon dioxide from germinating seeds', {
      b: 'Same apparatus, same amount of seeds: only **flask X** has **living** seeds.',
      v: V.co2,
      n: 'Soaked germinating seeds are in flask X. Seeds that were boiled and cooled, which are dead, are in flask Y. Any gas given out passes along the delivery tube into lime water. Lime water turns milky when carbon dioxide is bubbled into it.',
    }),
    sl('concept', 'The experiment step by step', {
      v: table(['Step', 'What to do'], [['1', 'Put soaked germinating seeds in flask X and an equal mass of boiled, cooled seeds in flask Y'], ['2', 'Fit each flask with a cork and a delivery tube dipping into fresh lime water'], ['3', 'Leave both flasks for a few hours'], ['4', 'Observe the lime water: it turns milky in X but stays clear in Y']], 'Table of four steps in the experiment on carbon dioxide from germinating seeds'),
      n: 'Set up both flasks in the same way. After a few hours, the lime water from flask X is milky, which shows that carbon dioxide is given out. The lime water from flask Y, with the dead seeds, stays clear.',
    }),
    sl('example', 'Worked example 1: reading the times', {
      b: `The lime water turned milky in ${LIME[0].minutes} minutes with ${LIME[0].mass} g of germinating seeds and in ${LIME[1].minutes} minutes with ${LIME[1].mass} g. What do the results show?`,
      ul: [`Step 1: ${LIME[1].mass} g is double ${LIME[0].mass} g, and ${LIME[0].minutes} ÷ ${LIME[1].minutes} = **${LIME_RATIO}**.`, 'Step 2: twice the seeds gave the milky colour in half the time.', 'Step 3: so more seeds give out carbon dioxide **faster**: the gas comes from respiring seeds.'],
      v: table(['Mass of seeds', 'Time to turn milky'], LIME.map((l) => [`${l.mass} g`, `${l.minutes} minutes`]), 'Worked table: twenty-five grams took thirty-six minutes and fifty grams took eighteen minutes'),
      n: 'Compare the two times. Double the mass of seeds took half the time. More living cells means faster respiration and faster release of carbon dioxide.',
    }),
    sl('check', 'Quick check: lime water', {
      b: 'Lime water turns milky when which gas is passed through it?',
      chk: 'chk-limewater',
      n: 'The gas given out in respiration.',
    }),
    sl('concept', 'Why boiled seeds are the control', {
      v: table(['Question', 'Answer'], [['What is the control?', 'Flask Y, with boiled (dead) seeds'], ['What is kept the same?', 'Apparatus, mass of seeds, temperature, time'], ['What is different?', 'Only whether the seeds are alive'], ['What does it prove?', 'The carbon dioxide in X comes from living seeds, not from air, the flask or the water']], 'Table explaining the control in the carbon dioxide experiment'),
      n: 'A control changes only one thing. In flask Y the seeds are dead, so any difference from flask X must be due to life. It shows that the carbon dioxide comes from respiring seeds, and not from the apparatus.',
    }),
    sl('diagram', 'Heat from germinating seeds', {
      b: 'Respiration also releases **heat**. A vacuum flask keeps the heat in.',
      v: V.thermos,
      n: 'Soaked germinating seeds go in flask A and boiled seeds in flask B. A thermometer in each is held by cotton wool, which lets air in. The vacuum flask stops heat escaping, so even a small rise can be read.',
    }),
    sl('example', 'Worked example 2: reading the thermometers', {
      b: `After four days the thermometer in flask A reads ${FLASK_A[4]} degrees and in flask B ${FLASK_B[4]} degrees. Both started at ${FLASK_A[0]} degrees. What do the readings show?`,
      ul: [`Step 1: rise in A = ${FLASK_A[4]} − ${FLASK_A[0]} = **${RISE_A}** degrees; rise in B = ${FLASK_B[4]} − ${FLASK_B[0]} = **${RISE_B}**.`, `Step 2: mean rise in A = ${RISE_A} ÷ 4 = **${RISE_PER_DAY}** degrees a day.`, 'Step 3: flask B, the control, did not warm, so the heat in A comes from the **living seeds**.'],
      v: table(['Day', '0', '1', '2', '3', '4'], [['Flask A (degrees)', ...FLASK_A.map(String)], ['Flask B (degrees)', ...FLASK_B.map(String)]], 'Worked table of thermometer readings in flasks A and B over four days'),
      n: 'The thermometer in flask A climbs by two degrees every day, a rise of eight in all. The control, flask B, does not change. So the heat comes from the respiring seeds.',
    }),
    sl('check', 'Quick check: the control flask', {
      b: 'In the thermos-flask experiment, the flask of boiled seeds is used as a control because',
      chk: 'chk-control6',
      n: 'What difference does it keep?',
    }),
    sl('summary', 'Summary', {
      ul: ['Gases pass through stomata, lenticels and root surfaces.', 'Germinating seeds give out carbon dioxide: it turns lime water milky; boiled seeds do not.', 'Germinating seeds give out heat: the thermometer in the flask of living seeds rises, the control does not.'],
      v: table(['Experiment', 'Test', 'Control'], [['Carbon dioxide', 'Lime water turns milky', 'Boiled seeds'], ['Heat', 'Thermometer rises', 'Boiled seeds']], 'Summary table of the two experiments with their tests and controls'),
      n: 'To recap. Plants exchange gases through stomata, lenticels and roots. Living germinating seeds make lime water milky and warm a vacuum flask. The control with boiled seeds shows no change, which proves the effects come from respiration.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Name the **control** and say it contains **dead (boiled) seeds**.', 'Say that **lime water turns milky** and name **carbon dioxide**.', 'Mention **cotton wool** in the thermos flask: it lets air in but keeps heat.', 'Keep **everything else the same** in both flasks.'],
      n: 'Exam tips. Always name the control and say it holds boiled seeds. Say that lime water turns milky because of carbon dioxide. Mention the cotton wool in the thermos flask. And state that everything else is kept the same.',
    }),
  ],
});
