// ISC 11 Biology ch14 Respiration in Plants — question bank in ISC school-examination style.
// Every number is computed in calc.mjs. AR keys (ISC options): a b d a c.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { MITO_Q, ETS, KREBS, GLYCO, AMPHI } from './svgs.mjs';
import { GLY, KREBS1, KREBS2, LINK2, TOTAL, Y, Y2, FOLD, FERM_ATP, FERM90, effAerobic, effFerm, EN, RQ, SEED, SEED_RQ, o2Used, mul, NO_FAD, eq } from './calc.mjs';

const { mcq, ar, fill, num, short, long, tf } = mk;
const mitoFig = svgV(MITO_Q, 'Unlabelled mitochondrion with parts marked A to E');
const etsFig = svgV(ETS, 'Electron transport system and ATP synthase');
const krebsFig = svgV(KREBS, 'Link reaction and Krebs cycle flowchart');
const glycoFig = svgV(GLYCO, 'Glycolysis flowchart');
const amphiFig = svgV(AMPHI, 'Respiration as an amphibolic pathway');
const optionText = (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md;

// ================================================================ t01 gas exchange, aerobic and anaerobic respiration, fermentation
add('lenticel-mcq', mcq({
  stem: 'Through which structures does the woody stem of a tree exchange gases with the air?',
  right: 'Lenticels',
  wrong: ['Stomata on the bark', 'Root hairs', 'Hydathodes'],
  sol: 'Woody stems are covered with bark, which has pores called lenticels — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('waterlog-mcq', mcq({
  stem: 'After a flood, the roots of maize plants in waterlogged soil are short of oxygen for several days. Which of the following do the root cells now produce and accumulate?',
  right: 'Ethanol, by anaerobic respiration, which can damage the roots',
  wrong: ['Extra oxygen, from the water around the roots', 'Starch, from the carbon dioxide in the soil', 'Lactic acid, which makes the roots grow faster'],
  sol: 'Root cells of higher plants ferment pyruvate to ethanol and CO₂ when oxygen is short — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('dough-check', mcq({
  stem: 'A baker leaves a lump of dough with yeast in a warm place for an hour, and it swells. The gas that makes it swell is',
  right: 'carbon dioxide, released by alcoholic fermentation',
  wrong: ['oxygen, released by photosynthesis', 'lactic acid vapour, from lactic acid fermentation', 'nitrogen, from the air in the dough'],
  sol: 'Yeast ferments sugar to ethanol and CO₂; the CO₂ is trapped in the dough — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('curd-mcq', mcq({
  stem: 'A spoonful of curd is added to warm milk, which is left overnight. By morning the milk has set and tastes sour. This is because',
  right: 'lactic acid bacteria ferment the milk sugar to lactic acid',
  wrong: ['yeast ferments the milk sugar to ethanol and carbon dioxide', 'the bacteria photosynthesise and make starch', 'the milk protein is oxidised completely to carbon dioxide and water'],
  sol: 'Lactic acid fermentation produces lactic acid, which sours and sets the milk — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('nad-mcq', mcq({
  stem: 'Glycolysis needs a constant supply of NAD⁺. In a yeast cell without oxygen, NAD⁺ is regenerated when',
  right: 'NADH passes its electrons to a product of pyruvate, which is reduced to ethanol',
  wrong: ['NADH passes its electrons to oxygen in the inner membrane', 'NADH is converted into ATP in the cytoplasm', 'NADH is broken down in the Krebs cycle'],
  sol: 'Fermentation reoxidises NADH so that glycolysis can continue — option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('mito-fig-mcq', mcq({
  stem: 'In the figure of a mitochondrion, which letter marks the part in which the enzymes of the Krebs cycle are found?',
  right: 'D',
  wrong: ['A', 'C', 'E'],
  sol: 'The Krebs cycle enzymes are in the matrix, the fluid-filled space marked D — option (@K).',
  d: 2, c: 'application', t: [2],
  assets: [mitoFig],
}));
add('mito-fig2-mcq', mcq({
  stem: 'In the same figure, which letter marks the structure that carries the electron transport system and ATP synthase, and so gives a large surface for ATP formation?',
  right: 'C',
  wrong: ['A', 'D', 'E'],
  sol: 'The folds of the inner membrane, the cristae (C), carry the ETS and ATP synthase — option (@K).',
  d: 2, c: 'application', t: [3],
  assets: [mitoFig],
}));
add('ferm-tf', tf({
  stem: 'Yeast cells fermenting sugar are poisoned by the alcohol they make when its concentration reaches about 13 percent.',
  key: 't',
  sol: 'True: this is why wine made by fermentation alone does not exceed about this strength.',
  d: 2, c: 'understanding', t: [1],
}));
{
  const eth = FERM90.ethanol;
  add('ferm-num', num({
    stem: 'A yeast culture ferments 90 g of glucose completely to ethanol and carbon dioxide (C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂). What mass of ethanol is formed? (C = 12, H = 1, O = 16.)',
    value: eth, unit: 'g',
    sol: r`$90 \div 180 = 0.5$ mol glucose gives $1$ mol ethanol; $1 \times 46 = ${eth}$ g.`,
    scheme: [[`${eth} g`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 46 || 'value');
}
{
  const n = 500;
  const aer = Y.total * n, fer = FERM_ATP * n, diff = aer - fer;
  add('fermatp-num', num({
    stem: `A tissue breaks down ${n} glucose molecules. How many more ATP would it gain by aerobic respiration (${Y.total} ATP per glucose) than by fermentation (${FERM_ATP} ATP per glucose)?`,
    value: diff, unit: 'ATP',
    sol: r`Aerobic $= ${n} \times ${Y.total} = ${aer}$; fermentation $= ${n} \times ${FERM_ATP} = ${fer}$; difference $= ${diff}$.`,
    scheme: [[`${diff}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 18000 || 'value');
}
add('ferm-ar', ar({
  a: 'Fermentation yields much less ATP per glucose than aerobic respiration.',
  r: 'In fermentation glucose is only partly broken down, so most of its energy remains in the end product.',
  key: 'a',
  sol: 'Both are true, and the incomplete oxidation explains the low yield — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ferm-reason', short({
  marks: 1,
  stem: 'Give a reason: Pea seeds soaked for several days in a tightly closed jar of water smell of alcohol.',
  model: 'With little oxygen the seed cells respire anaerobically (ferment), converting pyruvate to ethanol and carbon dioxide.',
  sol: 'Anaerobic respiration.',
  scheme: [['Anaerobic respiration forms ethanol', 1]],
  d: 2, c: 'application', t: [1],
}));
add('gasex-short2', short({
  marks: 2,
  stem: 'Name three routes by which plant organs exchange gases and state why plants do not need a special breathing system.',
  model: 'Gases pass through **stomata** in leaves, **lenticels** in woody stems and **root hairs** in roots. Plants need no special breathing system because each organ exchanges gases by **simple diffusion**, the **rate of respiration is low**, and living cells lie close to the surface or to air spaces.',
  sol: 'Three routes; reason.',
  scheme: [['Stomata, lenticels, root hairs', 1], ['Diffusion, low rate, short distance', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('aerobic-short2', short({
  marks: 2,
  stem: 'Distinguish between aerobic respiration and anaerobic respiration in terms of oxygen, end products and ATP yield.',
  model: '**Aerobic respiration** needs **oxygen**, oxidises glucose completely to **carbon dioxide and water** and yields **' + Y.total + ' ATP** per glucose. **Anaerobic respiration** needs **no oxygen**, oxidises glucose partly to **ethanol and carbon dioxide or to lactic acid**, and yields only **' + FERM_ATP + ' ATP** per glucose.',
  sol: 'Contrast on three features.',
  scheme: [['Oxygen and end products', 1], ['ATP yield', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('ferm-short3', short({
  marks: 3,
  stem: 'Compare aerobic respiration, alcoholic fermentation and lactic acid fermentation, giving the site, the end products and the net ATP of each.',
  model: '**Aerobic respiration** takes place in the cytoplasm and **mitochondria**, gives **CO₂ and H₂O** and about **' + Y.total + ' ATP**. **Alcoholic fermentation** (yeast, flooded roots) takes place in the **cytoplasm** and gives **ethanol and CO₂** with **' + FERM_ATP + ' ATP**. **Lactic acid fermentation** (muscle, lactic acid bacteria) also takes place in the **cytoplasm** and gives **lactic acid only**, with **' + FERM_ATP + ' ATP**.',
  sol: 'Three processes compared.',
  scheme: [['Aerobic site, products, ATP', 1], ['Alcoholic fermentation', 1], ['Lactic acid fermentation', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('fermapp-short3', short({
  marks: 3,
  stem: 'A winemaker seals grape juice with yeast in a vat. (i) Name the process and two products. (ii) Why does the yeast stop working when the alcohol reaches about 13 percent? (iii) What would happen to the yield of ATP if air were bubbled through the juice?',
  model: '(i) **Alcoholic fermentation** gives **ethanol and carbon dioxide**. (ii) Alcohol is **toxic to yeast**, so at about 13 percent the cells are poisoned and fermentation stops. (iii) With air, yeast would respire **aerobically**, completing the oxidation of pyruvate in mitochondria, so the **ATP yield per glucose would rise** from ' + FERM_ATP + ' to about ' + Y.total + ', and less alcohol would be made.',
  sol: 'Process; toxicity; effect of oxygen.',
  scheme: [['(i) Process and products', 1], ['(ii) Alcohol toxic', 1], ['(iii) More ATP with air', 1]],
  d: 3, c: 'application', t: [1],
}));
add('resp-long', long({
  stem: '(a) Write the balanced equations for aerobic respiration of glucose and for alcoholic fermentation of glucose. [2]\n(b) Name the stage common to both and state where it occurs. [1]\n(c) Give one tissue or organism in which alcoholic fermentation occurs and one in which lactic acid fermentation occurs. [1]\n(d) Why is fermentation much less efficient than aerobic respiration? [1]',
  model: '(a) **Aerobic:** C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy. **Alcoholic fermentation:** C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + energy.\n\n(b) **Glycolysis**, in the **cytoplasm**.\n\n(c) **Yeast** (or flooded roots) for alcoholic fermentation; **muscle cells** (or lactic acid bacteria) for lactic acid fermentation.\n\n(d) Glucose is only **partly oxidised**, so most of its **energy remains in ethanol or lactic acid**; only ' + FERM_ATP + ' ATP are formed against about ' + Y.total + '.',
  sol: 'Equations, glycolysis, examples, efficiency.',
  scheme: [['(a) Both equations balanced', 2], ['(b) Glycolysis in cytoplasm', 1], ['(c) Two examples', 1], ['(d) Partial oxidation', 1]],
  wl: [50, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 glycolysis and the Krebs cycle (flowcharts)
add('glyc-site-mcq', mcq({
  stem: 'In a plant cell, glycolysis takes place in the',
  right: 'cytoplasm',
  wrong: ['mitochondrial matrix', 'inner mitochondrial membrane', 'stroma of the chloroplast'],
  sol: 'Glycolysis, the EMP pathway, occurs in the cytoplasm — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('glycnet-mcq', mcq({
  stem: 'What is the net gain of glycolysis for each molecule of glucose?',
  right: `${GLY.net} ATP, ${GLY.nadh} NADH and ${GLY.pyruvate} pyruvate`,
  wrong: [`${GLY.gross} ATP, ${GLY.nadh} NADH and ${GLY.pyruvate} pyruvate`, `${GLY.net} ATP, 6 NADH and 1 pyruvate`, `${GLY.net} ATP, ${GLY.nadh} FADH₂ and ${GLY.pyruvate} acetyl CoA`],
  sol: `Four ATP are formed and two used, giving a net ${GLY.net} ATP, with ${GLY.nadh} NADH and ${GLY.pyruvate} pyruvate — option (@K).`,
  d: 2, c: 'understanding', t: [2],
  assets: [glycoFig],
}));
add('link-mcq', mcq({
  stem: 'Which set of products is formed when one pyruvate molecule enters the mitochondrion and undergoes the link reaction?',
  right: 'Acetyl CoA, carbon dioxide and NADH',
  wrong: ['Acetyl CoA, oxygen and FADH₂', 'Oxaloacetic acid, carbon dioxide and ATP', 'Citric acid, water and NADH'],
  sol: 'Pyruvate is oxidised and loses a carbon as CO₂, forming acetyl CoA and NADH — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('kreb-site-mcq', mcq({
  stem: 'The Krebs cycle takes place in the',
  right: 'matrix of the mitochondrion',
  wrong: ['cytoplasm', 'cristae', 'intermembrane space'],
  sol: 'The enzymes of the cycle are in the fluid matrix — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
{
  const co2 = 1 + KREBS1.co2;
  add('krebsco2-mcq', mcq({
    stem: 'A single molecule of pyruvate is completely oxidised by the link reaction and the Krebs cycle. How many molecules of carbon dioxide are released in all?',
    right: String(co2),
    wrong: ['1', '2', '6'],
    sol: `The link reaction releases 1 CO₂ and the cycle releases ${KREBS1.co2}, so ${co2} in all — option (@K).`,
    d: 3, c: 'application', t: [2],
    assets: [krebsFig],
  }), (q) => optionText(q) === '3' || 'key');
}
add('krebsfad-mcq', mcq({
  stem: 'FADH₂ is formed in',
  right: 'the Krebs cycle',
  wrong: ['glycolysis', 'the link reaction', 'the fermentation of pyruvate'],
  sol: 'Glycolysis and the link reaction give NADH only; the Krebs cycle gives NADH and FADH₂ — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('oaa-mcq', mcq({
  stem: 'In the Krebs cycle, acetyl CoA combines with a four-carbon acid to form citric acid. The four-carbon acid is',
  right: 'oxaloacetic acid',
  wrong: ['pyruvic acid', 'lactic acid', 'phosphoglyceric acid'],
  sol: 'Acetyl CoA joins oxaloacetic acid (OAA), which is regenerated at the end — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('emp-fill', fill({
  stem: 'The initials of the EMP pathway of glucose breakdown stand for Embden, Meyerhof and ______.',
  acc: [['Parnas']],
  sol: 'Parnas.',
  d: 1, c: 'recall', t: [2],
}));
{
  const n = 9, v = GLY.net * n;
  add('glyc-check', num({
    stem: `A tissue breaks down ${n} molecules of glucose by glycolysis. What is the net gain of ATP?`,
    value: v, unit: 'ATP',
    sol: r`Net ATP per glucose is $${GLY.net}$, so $${n} \times ${GLY.net} = ${v}$.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 18 || 'value');
}
{
  const n = 3, v = KREBS2.nadh * n;
  add('krebs-check', num({
    stem: `The pyruvate from ${n} glucose molecules is completely oxidised. How many NADH are formed in the Krebs cycle proper (not counting glycolysis or the link reaction)?`,
    value: v, unit: 'NADH',
    sol: r`Per glucose there are 2 turns of the cycle, each giving ${KREBS1.nadh} NADH, so $${KREBS2.nadh}$ per glucose; $${n} \times ${KREBS2.nadh} = ${v}$.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 18 || 'value');
}
{
  const n = 4, v = TOTAL.co2 * n;
  add('co2-num', num({
    stem: `How many molecules of carbon dioxide are released when ${n} molecules of glucose are completely oxidised by aerobic respiration?`,
    value: v, unit: 'CO₂',
    sol: r`One glucose (6 C) gives $${TOTAL.co2}$ CO₂ ($${LINK2.co2}$ from the link reaction, $${KREBS2.co2}$ from the Krebs cycle); $${n} \times ${TOTAL.co2} = ${v}$.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 24 || 'value');
}
add('glyc-ar', ar({
  a: 'Glycolysis occurs in all living cells.',
  r: 'The enzymes of glycolysis are located in the cytoplasm.',
  key: 'b',
  sol: 'Both are true, but the location of the enzymes does not explain why all cells have glycolysis — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('glycnet-ar', ar({
  a: 'Glycolysis gives a net gain of two ATP for each glucose.',
  r: 'Four ATP are used and two ATP are formed in glycolysis.',
  key: 'c',
  sol: 'A is true (4 formed, 2 used, net 2); R is false because it reverses the numbers — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('link-reason', short({
  marks: 1,
  stem: 'Give a reason: The conversion of pyruvate to acetyl CoA is called the link reaction.',
  model: 'It links glycolysis in the cytoplasm with the Krebs cycle in the mitochondrial matrix.',
  sol: 'Links the two stages.',
  scheme: [['Links glycolysis and the Krebs cycle', 1]],
  d: 1, c: 'understanding', t: [2],
}));
{
  const n = 7, g = mul(GLY, n);
  add('glyc-short2', short({
    marks: 2,
    stem: `A cell breaks down ${n} molecules of glucose by glycolysis. State the number of ATP used, the number of ATP formed, the net ATP and the number of NADH and pyruvate molecules.`,
    model: `ATP **used** = ${g.used}; ATP **formed** = ${g.gross}; **net ATP** = ${g.net}. **NADH** formed = ${g.nadh}, and **pyruvate** formed = ${g.pyruvate}. (For one glucose: used ${GLY.used}, formed ${GLY.gross}, net ${GLY.net}, NADH ${GLY.nadh}, pyruvate ${GLY.pyruvate}.)`,
    sol: 'Multiply by seven.',
    scheme: [['ATP used, formed, net', 1], ['NADH and pyruvate', 1]],
    d: 2, c: 'application', t: [2],
  }), () => (g.net === 14 && g.nadh === 14 && g.pyruvate === 14 && g.used === 14 && g.gross === 28) || 'counts');
}
add('link-short2', short({
  marks: 2,
  stem: 'What is the link reaction? State where it occurs and name its three products.',
  model: 'The **link reaction** is the oxidation of **pyruvate** to **acetyl CoA**. It occurs in the **mitochondrial matrix**. Its products are **acetyl CoA, carbon dioxide and NADH** (one of each for every pyruvate).',
  sol: 'Definition, site, products.',
  scheme: [['Definition and site', 1], ['Three products', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('glyc-short3', short({
  marks: 3,
  stem: 'Outline glycolysis as a flowchart, stating where it takes place and giving its net products for one glucose molecule.',
  model: `Glycolysis takes place in the **cytoplasm**. **Glucose (6 C)** is first energised using **${GLY.used} ATP** and split into **two three-carbon sugar phosphates**, which are changed to **two pyruvate (3 C)**. In these steps **${GLY.gross} ATP** and **${GLY.nadh} NADH** are formed. The **net** gain is **${GLY.net} ATP, ${GLY.nadh} NADH and ${GLY.pyruvate} pyruvate**.`,
  sol: 'Flowchart and net gain.',
  scheme: [['Site; glucose to two three-carbon sugars using ATP', 1], ['Two pyruvate with ATP and NADH formed', 1], ['Net products', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('krebs-short3', short({
  marks: 3,
  stem: 'Outline the Krebs cycle as a flowchart, stating where it occurs and what is formed from each acetyl CoA.',
  model: `The cycle occurs in the **mitochondrial matrix**. **Acetyl CoA (2 C)** joins **oxaloacetic acid (4 C)** to form **citric acid (6 C)**. Round the cycle **two CO₂** are released and **oxaloacetic acid is regenerated**. From each acetyl CoA the cycle forms **${KREBS1.nadh} NADH, ${KREBS1.fadh2} FADH₂ and ${KREBS1.atp} ATP**.`,
  sol: 'Flowchart and products.',
  scheme: [['Site; acetyl CoA + OAA to citric acid', 1], ['Two CO₂ released; OAA regenerated', 1], ['NADH, FADH₂, ATP', 1]],
  d: 2, c: 'understanding', t: [2],
  assets: [krebsFig],
}));
{
  add('prod-short3', short({
    marks: 3,
    stem: 'The two pyruvate from one glucose are completely oxidised through the link reaction and the Krebs cycle. Account for the six carbon atoms of glucose, and state the NADH, FADH₂ and ATP formed in these two stages together.',
    model: `Each pyruvate (3 C) loses **1 C** as CO₂ in the link reaction and its acetyl CoA (2 C) loses **2 C** in the cycle, so the six carbon atoms leave as **${TOTAL.co2} CO₂** (${LINK2.co2} + ${KREBS2.co2}). Together the stages give **${LINK2.nadh + KREBS2.nadh} NADH** (${LINK2.nadh} link + ${KREBS2.nadh} cycle), **${KREBS2.fadh2} FADH₂** and **${KREBS2.atp} ATP**.`,
    sol: 'Carbon and carriers.',
    scheme: [['Carbon atoms: 2 + 4 CO₂', 1], ['NADH 8', 1], ['FADH₂ 2 and ATP 2', 1]],
    d: 3, c: 'application', t: [2],
  }), () => (LINK2.nadh + KREBS2.nadh === 8 && TOTAL.co2 === 6) || 'counts');
}
add('glyc-long', long({
  stem: '(a) Show glycolysis as a flowchart, marking the ATP used and formed and the NADH formed. [2]\n(b) Show the link reaction and the Krebs cycle as a flowchart, marking the CO₂, NADH, FADH₂ and ATP formed for each acetyl CoA. [3]',
  model: `(a) **Glucose (6 C)** → (uses **${GLY.used} ATP**) → **2 three-carbon sugar phosphates** → (forms **${GLY.gross} ATP** and **${GLY.nadh} NADH**) → **2 pyruvate (3 C)**; net **${GLY.net} ATP**, **${GLY.nadh} NADH**.\n\n(b) **Pyruvate** → (link reaction: **CO₂ + NADH**) → **acetyl CoA (2 C)**; acetyl CoA + **oxaloacetic acid (4 C)** → **citric acid (6 C)** → (**2 CO₂**) → … → oxaloacetic acid; per acetyl CoA: **${KREBS1.nadh} NADH, ${KREBS1.fadh2} FADH₂, ${KREBS1.atp} ATP, ${KREBS1.co2} CO₂**.`,
  sol: 'Two flowcharts.',
  scheme: [['(a) Flowchart with ATP and NADH', 2], ['(b) Link reaction and cycle in order', 2], ['(b) Products per acetyl CoA', 1]],
  wl: [40, 200],
  d: 3, c: 'understanding', t: [2],
}));

// ================================================================ t03 ETS, oxidative phosphorylation, ATP yield
add('ets-site-mcq', mcq({
  stem: 'The electron transport system of aerobic respiration is located in the',
  right: 'inner mitochondrial membrane',
  wrong: ['outer mitochondrial membrane', 'matrix', 'cytoplasm'],
  sol: 'The carriers and ATP synthase are embedded in the inner membrane and cristae — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('o2-check', mcq({
  stem: 'In aerobic respiration, the final acceptor of electrons from the electron transport system is',
  right: 'oxygen, which forms water',
  wrong: ['carbon dioxide, which forms glucose', 'NAD⁺, which forms NADH', 'pyruvate, which forms ethanol'],
  sol: 'Oxygen takes the electrons at complex IV and combines with H⁺ to form water — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cyanide-mcq', mcq({
  stem: 'Cyanide poisons the last complex of the electron transport system, so electrons cannot be passed to oxygen. In cells treated with cyanide',
  right: 'oxygen use stops, the proton gradient is lost and almost all the ATP of aerobic respiration is lost',
  wrong: ['oxygen use rises, because electrons pile up at complex I', 'ATP formation in the matrix rises, because the Krebs cycle speeds up', 'only glycolysis stops, and the rest of respiration continues unchanged'],
  sol: 'The whole chain backs up; NAD⁺ and FAD are not regenerated, so the Krebs cycle also slows — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('uncoupler-mcq', mcq({
  stem: 'A chemical makes the inner mitochondrial membrane freely leaky to H⁺ but does not damage the carriers or ATP synthase. In respiring mitochondria supplied with glucose-derived substrates and oxygen, the immediate effects are that',
  right: 'oxygen consumption continues or rises, but little ATP is made and more energy is lost as heat',
  wrong: ['oxygen consumption stops and ATP rises', 'oxygen consumption and ATP both rise', 'oxygen consumption falls because the gradient is too steep'],
  sol: 'Electron transport continues, but without a gradient ATP synthase cannot make ATP; the energy is released as heat — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));
add('atpsyn-mcq', mcq({
  stem: 'In the ATP synthase of the inner mitochondrial membrane, the part that projects into the matrix and makes ATP from ADP and Pi is',
  right: 'F₁',
  wrong: ['F₀', 'cytochrome c', 'ubiquinone'],
  sol: 'F₀ is the membrane channel for H⁺; F₁ is the knob in the matrix that makes ATP — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('gradient-mcq', mcq({
  stem: 'When the electron transport system works in a mitochondrion, protons are pumped',
  right: 'from the matrix into the intermembrane space',
  wrong: ['from the intermembrane space into the matrix', 'from the cytoplasm into the matrix', 'from the matrix into the cytoplasm through the outer membrane'],
  sol: 'Complexes I, III and IV pump H⁺ out of the matrix, making the intermembrane space acidic — option (@K).',
  d: 2, c: 'understanding', t: [3],
  assets: [etsFig],
}));
add('fadh-mcq', mcq({
  stem: 'On the textbook count, FADH₂ yields 2 ATP while NADH yields 3 ATP. The best explanation is that FADH₂',
  right: 'passes its electrons to the chain at a later point (complex II), so fewer protons are pumped',
  wrong: ['passes its electrons to oxygen directly, without any carrier', 'is made only in glycolysis, where less energy is released', 'cannot pass electrons to ubiquinone'],
  sol: 'Electrons from FADH₂ bypass complex I, a proton-pumping step — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
{
  const v = Y.ets;
  add('etsatp-check', num({
    stem: `On the textbook count (3 ATP per NADH, 2 ATP per FADH₂), how many ATP are made on the electron transport system from the ${TOTAL.nadh} NADH and ${TOTAL.fadh2} FADH₂ formed by one glucose?`,
    value: v, unit: 'ATP',
    sol: r`$${TOTAL.nadh} \times 3 + ${TOTAL.fadh2} \times 2 = ${TOTAL.nadh * 3} + ${TOTAL.fadh2 * 2} = ${v}$.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 34 || 'value');
}
{
  const n = 3, v = Y.total * n;
  add('atp-num', num({
    stem: `Using the textbook count, how many ATP are formed in all when ${n} molecules of glucose are completely oxidised by aerobic respiration?`,
    value: v, unit: 'ATP',
    sol: r`$${n} \times ${Y.total} = ${v}$.`,
    scheme: [[`${v}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 114 || 'value');
}
add('nofad-num', num({
  stem: `A mutant cannot pass electrons from FADH₂ to the chain, so the ${TOTAL.fadh2} FADH₂ of each glucose give no ATP on the electron transport system. Using the textbook count, how many ATP does it get from one glucose?`,
  value: NO_FAD, unit: 'ATP',
  sol: r`$${Y.total} - ${TOTAL.fadh2} \times 2 = ${Y.total} - ${TOTAL.fadh2 * 2} = ${NO_FAD}$.`,
  scheme: [[`${NO_FAD}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 34 || 'value');
add('modern-num', num({
  stem: 'Current estimates give 2.5 ATP per NADH and 1.5 ATP per FADH₂. Using these values, and the 4 ATP made directly, calculate the ATP yield of one glucose.',
  value: Y2.total, unit: 'ATP',
  sol: r`$${TOTAL.nadh} \times 2.5 + ${TOTAL.fadh2} \times 1.5 + ${TOTAL.substrateAtp} = ${TOTAL.nadh * 2.5} + ${TOTAL.fadh2 * 1.5} + ${TOTAL.substrateAtp} = ${Y2.total}$.`,
  scheme: [[`${Y2.total}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 32 || 'value');
add('eff-num', num({
  stem: `One mole of glucose releases ${EN.glucose} kcal when it is oxidised, and one mole of ATP holds ${EN.atp} kcal. What percentage of the energy of glucose is trapped in ATP by aerobic respiration (${Y.total} ATP per glucose)? (One decimal place.)`,
  value: effAerobic, tol: 0.05, unit: '%',
  sol: r`$${Y.total} \times ${EN.atp} = ${(Y.total * EN.atp).toFixed(1)}$ kcal; $\dfrac{${(Y.total * EN.atp).toFixed(1)}}{${EN.glucose}} \times 100 = ${effAerobic}$ percent.`,
  scheme: [[`${effAerobic}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 40.4 || 'value');
add('ets-ar', ar({
  a: 'The electron transport system stops when oxygen is absent.',
  r: 'Oxygen is the final acceptor of electrons from the chain.',
  key: 'a',
  sol: 'Both are true; with no acceptor the carriers stay reduced and the chain stops — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('ets-reason', short({
  marks: 1,
  stem: 'Give a reason: Oxygen is essential for aerobic respiration, although the Krebs cycle itself does not use oxygen.',
  model: 'Oxygen is the final electron acceptor of the chain; without it NADH and FADH₂ cannot be reoxidised, so the Krebs cycle stops.',
  sol: 'Oxygen regenerates NAD⁺ and FAD.',
  scheme: [['Final acceptor; NAD⁺ and FAD regenerated', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('ets-short2', short({
  marks: 2,
  stem: 'Name the final acceptor of electrons in aerobic respiration, the substance it forms, and the carriers that give electrons to the first two complexes of the chain.',
  model: 'The final acceptor is **oxygen**, which combines with electrons and H⁺ to form **water**, at the last complex (complex IV). **NADH** gives electrons to **complex I** and **FADH₂** gives electrons to **complex II**.',
  sol: 'Acceptor, product, donors.',
  scheme: [['Oxygen and water', 1], ['NADH to complex I; FADH₂ to complex II', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('oxphos-short2', short({
  marks: 2,
  stem: 'What is oxidative phosphorylation? State where in the cell it takes place.',
  model: '**Oxidative phosphorylation** is the formation of **ATP from ADP and Pi** using the energy released as **electrons pass along the electron transport system** to oxygen. It takes place at the **inner mitochondrial membrane** (cristae).',
  sol: 'Definition and site.',
  scheme: [['ATP formation using electron transport energy', 1], ['Inner mitochondrial membrane', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('oxphos-short3', short({
  marks: 3,
  stem: 'Explain how ATP is made at the inner mitochondrial membrane according to the chemiosmotic hypothesis.',
  model: 'As electrons pass along the chain, complexes I, III and IV **pump protons from the matrix into the intermembrane space**, making a **proton gradient** and an electrical charge across the inner membrane. Protons then flow back **down the gradient through the F₀ channel** of **ATP synthase**. The energy of this flow is used by the **F₁ knob**, in the matrix, to make **ATP** from ADP and Pi.',
  sol: 'Gradient and ATP synthase.',
  scheme: [['Protons pumped into the intermembrane space', 1], ['Flow back through F₀', 1], ['F₁ makes ATP', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('chemcomp-short3', short({
  marks: 3,
  stem: 'State three similarities or differences between chemiosmosis in mitochondria and in chloroplasts.',
  model: 'In both, a **proton gradient** across a membrane drives **ATP synthase**. In a mitochondrion protons are pumped into the **intermembrane space** and the ATP appears in the **matrix**; in a chloroplast they accumulate in the **thylakoid lumen** and the ATP appears in the **stroma**. The electrons come from **NADH and FADH₂** in mitochondria but from **light and water** in chloroplasts.',
  sol: 'Compare the two organelles.',
  scheme: [['Similarity: gradient and ATP synthase', 1], ['Where H⁺ accumulates and where ATP appears', 1], ['Source of electrons', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('ets-long', long({
  stem: '(a) Draw a labelled diagram of the electron transport system in the inner mitochondrial membrane, showing complexes I to IV, ubiquinone, cytochrome c, ATP synthase, the direction of electron flow and of H⁺ movement. [3]\n(b) Name the final electron acceptor and the compound it forms. [1]\n(c) State the roles of F₀ and F₁ in ATP synthase. [1]',
  model: '(a) **Diagram:** an inner membrane with **intermembrane space** above and **matrix** below; **NADH → complex I**, **FADH₂ → complex II**, then **ubiquinone → complex III → cytochrome c → complex IV → oxygen**; **H⁺ pumped** at complexes I, III and IV into the intermembrane space; **ATP synthase** with H⁺ flowing back through it.\n\n(b) **Oxygen**, forming **water**.\n\n(c) **F₀** is the **channel** for H⁺ through the membrane; **F₁** is the **knob in the matrix** that makes **ATP**.',
  sol: 'Diagram; acceptor; F0 and F1.',
  scheme: [['(a) Carriers in order', 2], ['(a) H⁺ movement and ATP synthase', 1], ['(b) Oxygen and water', 1], ['(c) F₀ and F₁', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [3],
}));
{
  add('yield-long', long({
    stem: '(a) Calculate the net ATP yield of one glucose molecule in aerobic respiration, showing the contribution of glycolysis, the link reaction and the Krebs cycle (3 ATP per NADH, 2 ATP per FADH₂). [3]\n(b) Compare this with the yield of fermentation and state why they differ. [2]',
    model: `(a) **Glycolysis:** ${GLY.net} ATP + ${GLY.nadh} NADH × 3 = **${Y.glycolysis}**. **Link reaction:** ${LINK2.nadh} NADH × 3 = **${Y.link}**. **Krebs cycle:** ${KREBS2.atp} ATP + ${KREBS2.nadh} NADH × 3 + ${KREBS2.fadh2} FADH₂ × 2 = **${Y.krebs}**. **Total = ${Y.total} ATP.**\n\n(b) Fermentation yields only **${FERM_ATP} ATP** per glucose, so aerobic respiration gives **${FOLD} times** as much. In fermentation glucose is **only partly oxidised**, with no **electron transport system** or oxygen to take the electrons.`,
    sol: 'ATP count; comparison.',
    scheme: [['(a) Glycolysis stage', 1], ['(a) Link and Krebs stages', 1], ['(a) Total', 1], ['(b) Fermentation yield compared', 1], ['(b) Reason', 1]],
    wl: [60, 200],
    d: 3, c: 'application', t: [3, 1],
  }), () => (Y.total === 38 && FOLD === 19) || 'totals');
}

// ================================================================ t04 amphibolic pathway and RQ
add('amph-mcq', mcq({
  stem: 'Respiration is called an amphibolic pathway because it',
  right: 'breaks down food and also supplies intermediates for making other compounds',
  wrong: ['takes place both in the cytoplasm and in the chloroplast', 'uses both oxygen and carbon dioxide as final acceptors', 'is carried out by both plants and animals'],
  sol: 'Amphibolic means catabolic as well as anabolic — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('amphfat-mcq', mcq({
  stem: 'The fatty acids obtained from the hydrolysis of fats enter the respiratory pathway as',
  right: 'acetyl CoA',
  wrong: ['glucose', 'carbon dioxide', 'lactic acid'],
  sol: 'Fatty acids are broken into two-carbon units that enter as acetyl CoA — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('amph-check', mcq({
  stem: 'A plant cell uses Krebs cycle intermediates to make amino acids. This shows that respiration is',
  right: 'amphibolic, because it has an anabolic role as well as a catabolic role',
  wrong: ['purely catabolic, because it releases energy', 'purely anabolic, because it builds protein', 'anaerobic, because it needs no oxygen'],
  sol: 'Using intermediates to build compounds is anabolic; breakdown is catabolic; together, amphibolic — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [amphiFig],
}));
add('rqfat-mcq', mcq({
  stem: 'Seeds of groundnut, rich in oil, are allowed to germinate in a respirometer and their RQ is found to be close to 0.7. This is because',
  right: 'fat is oxidised, and it needs more oxygen than the carbon dioxide it releases',
  wrong: ['carbohydrate is oxidised, and it releases equal volumes of CO₂ and O₂', 'an organic acid is oxidised, and it releases more CO₂ than the O₂ it uses', 'respiration is anaerobic, and no oxygen is used'],
  sol: 'Fats contain little oxygen, so oxidation needs much oxygen for each CO₂ released, giving an RQ below 1 — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('rqacid-mcq', mcq({
  stem: `The leaves of a succulent plant, respiring tartaric acid in the dark, give an RQ of ${RQ.tartaric}. An RQ above 1 shows that the substrate`,
  right: 'contains a large amount of oxygen itself, so less external oxygen is needed',
  wrong: ['is a fat, which needs more oxygen than it releases CO₂', 'is a carbohydrate, which has an RQ of exactly 1', 'is being respired anaerobically'],
  sol: 'Organic acids are already rich in oxygen, so O₂ consumed is less than the CO₂ released — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('rqanaer-mcq', mcq({
  stem: 'The respiratory quotient of a tissue that is respiring entirely without oxygen, by fermentation, is' ,
  right: 'infinite, because CO₂ is released while no O₂ is used',
  wrong: ['equal to 1', 'zero, because no gas is exchanged', 'equal to 0.7'],
  sol: 'RQ = CO₂ ÷ O₂, and O₂ is zero, so the ratio is infinite — option (@K).',
  d: 2, c: 'application', t: [4],
}));
{
  const q1 = RQ.succinic;
  add('rq-check', num({
    stem: 'Succinic acid is respired as 2C₄H₆O₄ + 7O₂ → 8CO₂ + 6H₂O. Calculate the respiratory quotient. (Two decimal places.)',
    value: q1, tol: 0.005,
    sol: r`$\text{RQ} = \dfrac{8}{7} = ${q1}$.`,
    scheme: [[`${q1}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 1.14 || 'value');
}
add('rqpalm-num', num({
  stem: 'Palmitic acid is respired as C₁₆H₃₂O₂ + 23O₂ → 16CO₂ + 16H₂O. Calculate the respiratory quotient. (One decimal place.)',
  value: RQ.palmitic, tol: 0.05,
  sol: r`$\text{RQ} = \dfrac{16}{23} = 0.696 \approx ${RQ.palmitic}$.`,
  scheme: [[`${RQ.palmitic}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 0.7 || 'value');
{
  const co2 = 98, o2 = o2Used(co2, 0.7);
  add('rqseed-num', num({
    stem: `Sunflower seeds in a respirometer release ${co2} mL of carbon dioxide in an hour, and their RQ is 0.7. What volume of oxygen do they consume?`,
    value: o2, unit: 'mL',
    sol: r`$\text{O}_2 = \dfrac{\text{CO}_2}{\text{RQ}} = \dfrac{${co2}}{0.7} = ${o2}$ mL.`,
    scheme: [[`${o2} mL`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.value === 140 || 'value');
}
add('rqoxalic-num', num({
  stem: 'Oxalic acid is respired as 2C₂H₂O₄ + O₂ → 4CO₂ + 2H₂O. What is the respiratory quotient?',
  value: RQ.oxalic,
  sol: r`$\text{RQ} = \dfrac{4}{1} = ${RQ.oxalic}$.`,
  scheme: [[`${RQ.oxalic}`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 4 || 'value');
add('amph-ar', ar({
  a: 'Respiration is purely a catabolic process.',
  r: 'Intermediates of respiration are never used to make other compounds.',
  key: 'd',
  sol: 'Both are false: respiration is amphibolic, and its intermediates are used to make fatty acids, amino acids and other compounds — option (d).',
  d: 3, c: 'understanding', t: [4],
}));
add('rq-reason', short({
  marks: 1,
  stem: 'Give a reason: The respiratory quotient of a fat is less than 1.',
  model: 'A fat contains little oxygen, so its oxidation needs more oxygen than the volume of carbon dioxide released.',
  sol: 'More O₂ used than CO₂ released.',
  scheme: [['Fat oxidation needs more O₂ than the CO₂ released', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('amph-short2', short({
  marks: 2,
  stem: 'Why is respiration described as an amphibolic pathway? Give one catabolic and one anabolic role.',
  model: 'Respiration is **catabolic** because it **breaks down** carbohydrates, fats and proteins to release energy, and **anabolic** because its **intermediates are drawn off** to build other compounds. For example, glucose is oxidised to release ATP, while **acetyl CoA is used to make fatty acids** and Krebs cycle acids to make amino acids.',
  sol: 'Both roles with examples.',
  scheme: [['Catabolic role', 1], ['Anabolic role', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('rq-short2', short({
  marks: 2,
  stem: 'Define respiratory quotient and give its value for carbohydrates, fats and proteins.',
  model: 'The **respiratory quotient (RQ)** is the **ratio of the volume of carbon dioxide released to the volume of oxygen consumed** in respiration. It is **1.0 for carbohydrates**, **less than 1 (about 0.7) for fats** and about **0.9 for proteins**.',
  sol: 'Definition and three values.',
  scheme: [['Definition', 1], ['Three values', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('amph-short3', short({
  marks: 3,
  stem: 'Explain how fats and proteins can be used as respiratory substrates, and give one example of an anabolic use of respiratory intermediates.',
  model: '**Fats** are hydrolysed to **glycerol and fatty acids**; fatty acids are broken into two-carbon units that enter as **acetyl CoA**, and glycerol enters as a sugar phosphate. **Proteins** are broken into **amino acids**, which lose their amino group and enter as **pyruvate, acetyl CoA or Krebs cycle acids**. Anabolic use: **acetyl CoA is used to synthesise fatty acids**.',
  sol: 'Fats, proteins, anabolic example.',
  scheme: [['Fats enter via acetyl CoA', 1], ['Proteins enter via amino acids', 1], ['Anabolic example', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('rq-short3', short({
  marks: 3,
  stem: `Germinating seeds of four plants gave these RQ values in a respirometer: pea 0.9, castor 0.7, wheat 1.0, and a succulent leaf in the dark ${RQ.tartaric}. Identify the main substrate respired in each case, with a reason.`,
  model: `**Wheat (1.0)** respires **carbohydrate**, since equal volumes of CO₂ and O₂ are involved. **Castor (0.7)** respires **fat**, which needs more O₂ than the CO₂ released. **Pea (0.9)** is respiring mainly **protein** (or a mixture of carbohydrate and some fat). The **succulent leaf (${RQ.tartaric})** respires an **organic acid**, which is rich in oxygen, so RQ is above 1.`,
  sol: 'Four substrates.',
  scheme: [['Wheat: carbohydrate; castor: fat', 1], ['Pea: protein or mixture', 1], ['Leaf: organic acid, RQ above 1', 1]],
  d: 3, c: 'application', t: [4],
}));
{
  add('rqcalc-short3', short({
    marks: 3,
    stem: 'Stearic acid is oxidised in respiration as C₁₈H₃₆O₂ + 26O₂ → 18CO₂ + 18H₂O. (i) Confirm that the equation is balanced for carbon. (ii) Calculate the RQ. (iii) State what this value shows about the substrate.',
    model: `(i) Carbon: **18** on the left and **18** in 18CO₂ on the right, so it is balanced. (ii) **RQ = CO₂ ÷ O₂ = 18 ÷ 26 = ${RQ.stearic}**. (iii) A value **less than 1** shows that the substrate is a **fatty acid (fat)**, which needs more oxygen than the carbon dioxide it releases because it contains little oxygen.`,
    sol: 'Balance, RQ, meaning.',
    scheme: [['(i) Carbon balance', 1], ['(ii) RQ ' + RQ.stearic, 1], ['(iii) Fat, RQ below 1', 1]],
    d: 3, c: 'application', t: [4],
  }), () => (RQ.stearic === 0.69) || 'rq');
}
add('rq-long', long({
  stem: '(a) Define respiratory quotient. [1]\n(b) Calculate the RQ of glucose from its balanced equation for aerobic respiration. [1]\n(c) The RQ of a germinating oil seed is about 0.7, and that of a seedling respiring a mixture is ' + SEED_RQ + '. State what each value suggests about the substrate. [2]\n(d) What is the RQ of anaerobic respiration and why? [1]',
  model: `(a) **RQ** is the **ratio of the volume of CO₂ released to the volume of O₂ consumed**.\n\n(b) C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O, so RQ = **6 ÷ 6 = ${RQ.glucose}**.\n\n(c) About **0.7** suggests that **fat** is the main substrate; ${SEED_RQ} lies between fat and carbohydrate, suggesting a **mixture** of carbohydrate and fat.\n\n(d) It is **infinite**, because carbon dioxide is released but **no oxygen is consumed**.`,
  sol: 'Definition; glucose; two values; anaerobic.',
  scheme: [['(a) Definition', 1], ['(b) RQ of glucose', 1], ['(c) Fat; mixture', 2], ['(d) Infinite with reason', 1]],
  wl: [40, 200],
  d: 2, c: 'application', t: [4],
}));
add('amph-long', long({
  stem: '(a) Draw a labelled diagram to show that respiration is an amphibolic pathway, with carbohydrates, fats and proteins entering and at least two anabolic products leaving. [3]\n(b) Explain the terms catabolic and anabolic in this context. [2]',
  model: '(a) **Diagram:** a central box of **acetyl CoA and the Krebs cycle**; **carbohydrates** (glucose, pyruvate), **fats** (fatty acids, glycerol) and **proteins** (amino acids) entering it; arrows leaving it to **fatty acids** and **amino acids** (and pigments or nucleotides).\n\n(b) **Catabolic:** the **breakdown** of carbohydrates, fats and proteins, releasing energy as ATP. **Anabolic:** the **use of intermediates** of respiration as starting materials to **build** fatty acids, amino acids and other compounds.',
  sol: 'Diagram; catabolic and anabolic.',
  scheme: [['(a) Three entries', 1], ['(a) Two anabolic exits', 1], ['(a) Central pathway labelled', 1], ['(b) Catabolic', 1], ['(b) Anabolic', 1]],
  wl: [50, 200],
  d: 3, c: 'understanding', t: [4],
}));
void SEED;
void EN;
void eq;
void effFerm;
void Y2;
