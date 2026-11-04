// ISC 11 Biology ch14 Respiration in Plants — Part 1 (t01–t02), Part 2 (t03–t04).
import { sl, deck, table, flow, svgV, chem, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { MITO, GLYCO, KREBS, ETS, AMPHI, FERM } from './svgs.mjs';
import { GLY, LINK2, KREBS1, KREBS2, TOTAL, Y, Y2, FOLD, FERM_ATP, effAerobic, effFerm, EN, RQ, EQ, SEED, SEED_RQ, mul } from './calc.mjs';

export const V = {
  mito: svgV(MITO, 'Labelled mitochondrion with outer and inner membranes, cristae, matrix and intermembrane space'),
  glyco: svgV(GLYCO, 'Glycolysis flowchart with ATP and NADH counts'),
  krebs: svgV(KREBS, 'Link reaction and Krebs cycle flowchart'),
  ets: svgV(ETS, 'Electron transport system and ATP synthase on the inner mitochondrial membrane'),
  amphi: svgV(AMPHI, 'Respiration as an amphibolic pathway'),
  ferm: svgV(FERM, 'Fates of pyruvate: alcoholic fermentation, lactic acid fermentation and aerobic respiration'),
};

const G6 = mul(GLY, 6);

export const deck1 = deck({
  part: 1,
  title: 'Respiration in Plants — Part 1: Gas exchange, fermentation, glycolysis and the Krebs cycle',
  goals: [
    'Describe gas exchange in plants and compare aerobic respiration with alcoholic and lactic acid fermentation',
    'Outline glycolysis and the Krebs cycle as flowcharts showing ATP, NADH and FADH2 formed',
    'Do the arithmetic of ATP, NADH, FADH2 and carbon dioxide for one glucose',
  ],
  slides: [
    sl('title', 'Releasing the energy in food', {
      b: 'Part 1 — how plants exchange gases, what happens with and without oxygen, and the first two stages of respiration.',
      v: flow('LR', [['g', 'Glucose'], ['p', 'Pyruvate'], ['k', 'Krebs cycle'], ['a', 'Carbon dioxide, water, ATP']], [['g', 'p'], ['p', 'k'], ['k', 'a']], 'Glucose to pyruvate to the Krebs cycle to carbon dioxide, water and ATP'),
      n: 'Cells release the energy stored in glucose a little at a time and trap it in ATP. Part one follows glucose as far as the Krebs cycle.',
    }),
    sl('concept', 'Gas exchange in plants', {
      b: 'Plants have **no special breathing organs**. Each organ exchanges gases by **diffusion**, which works because respiration is slow, living cells lie close to the surface or to air spaces, and gases diffuse easily.',
      v: table(['Organ', 'Route of gas exchange'], [['Leaf', 'Stomata, then intercellular air spaces'], ['Woody stem', 'Lenticels'], ['Young stem', 'Stomata and cuticle'], ['Root', 'Root hairs and the soil air around them']], 'Table of routes of gas exchange in plant organs'),
      n: 'Oxygen diffuses in and carbon dioxide diffuses out. In leaves the gases pass through stomata, in woody stems through lenticels, and in roots through root hairs from the air held in soil.',
    }),
    sl('concept', 'Aerobic respiration: the overall change', {
      b: 'In **aerobic respiration**, glucose is **completely oxidised** to carbon dioxide and water, using oxygen. About **686 kcal** is released per mole of glucose, and part of it is trapped in ATP.',
      v: chem('C6H12O6 + 6O2 -> 6CO2 + 6H2O', 'Equation of aerobic respiration of glucose'),
      n: 'This is the reverse of the overall change in photosynthesis. Every living cell does it, in the cytoplasm and mitochondria, all the time, day and night.',
    }),
    sl('diagram', 'What happens to pyruvate', {
      b: 'Glycolysis takes place in the **cytoplasm** with or without oxygen. After it, the fate of pyruvate depends on oxygen: **fermentation** without it, **Krebs cycle** with it.',
      v: V.ferm,
      n: 'Without oxygen, yeast and waterlogged roots make ethanol and carbon dioxide, and muscle and some bacteria make lactic acid. With oxygen, pyruvate enters the mitochondrion and is fully oxidised.',
    }),
    sl('concept', 'Aerobic respiration and fermentation compared', {
      b: 'Fermentation is **incomplete oxidation**: much of the energy stays in the end product.',
      v: table(['Feature', 'Aerobic', 'Alcoholic fermentation', 'Lactic acid fermentation'], [['Oxygen', 'Needed', 'Not needed', 'Not needed'], ['Site', 'Cytoplasm then mitochondria', 'Cytoplasm', 'Cytoplasm'], ['End products', 'CO₂ and H₂O', 'Ethanol and CO₂', 'Lactic acid'], ['Where', 'Most cells', 'Yeast, flooded roots', 'Muscle, lactic acid bacteria'], ['ATP per glucose', `${Y.total}`, `${FERM_ATP}`, `${FERM_ATP}`]], 'Table comparing aerobic respiration with alcoholic and lactic acid fermentation'),
      n: 'Fermentation recovers only two ATP from each glucose. Alcoholic fermentation releases carbon dioxide, and lactic acid fermentation does not. Yeast stops when alcohol rises to about thirteen percent, which poisons it.',
    }),
    sl('check', 'Quick check: fermentation', {
      b: 'Identify the gas that makes dough rise.',
      n: 'Quick check. Which fermentation makes a gas?',
      chk: 'dough-check',
    }),
    sl('diagram', 'The mitochondrion: where most ATP is made', {
      b: 'The **matrix** holds the Krebs cycle enzymes; the **inner membrane** and its folds, the **cristae**, hold the electron transport system and ATP synthase.',
      v: V.mito,
      n: 'A mitochondrion has two membranes. The inner one is folded into cristae, which give a large surface for electron transport. The Krebs cycle runs in the fluid matrix inside.',
    }),
    sl('diagram', 'Glycolysis as a flowchart', {
      b: 'Glycolysis, the **EMP pathway** (Embden, Meyerhof and Parnas), changes one **glucose (6 C)** into two **pyruvate (3 C)**. Two ATP are spent early; four ATP and two NADH are formed later. **Net: 2 ATP and 2 NADH.**',
      v: V.glyco,
      n: 'Glucose is first energised using two ATP. It then splits into two three-carbon sugars, which are changed to two pyruvate with the formation of four ATP and two NADH. The net gain is two ATP and two NADH.',
    }),
    sl('example', 'Worked example 1: glycolysis of six glucose molecules', {
      b: `A cell breaks down 6 glucose molecules by glycolysis. Find the ATP used, ATP formed, net ATP, NADH and pyruvate.`,
      ul: [
        r`ATP used $= 6 \times ${GLY.used} = ${G6.used}$; ATP formed $= 6 \times ${GLY.gross} = ${G6.gross}$.`,
        r`Net ATP $= ${G6.gross} - ${G6.used} = ${G6.net}$.`,
        r`NADH $= 6 \times ${GLY.nadh} = ${G6.nadh}$; pyruvate $= 6 \times ${GLY.pyruvate} = ${G6.pyruvate}$.`,
      ],
      v: table(['Item (6 glucose)', 'Number'], [['ATP used', String(G6.used)], ['ATP formed', String(G6.gross)], ['Net ATP', String(G6.net)], ['NADH', String(G6.nadh)], ['Pyruvate', String(G6.pyruvate)]], `Worked table: net ${G6.net} ATP, ${G6.nadh} NADH, ${G6.pyruvate} pyruvate`),
      n: 'Multiply each figure for one glucose by six. Twenty-four ATP are formed but twelve were spent, so the net gain is twelve ATP, with twelve NADH and twelve pyruvate.',
    }),
    sl('check', 'Quick check: net ATP', {
      b: 'Find the net ATP gain of glycolysis for several glucose molecules.',
      n: 'Quick check. Remember the net gain for one glucose.',
      chk: 'glyc-check',
    }),
    sl('diagram', 'Link reaction and Krebs cycle', {
      b: 'In the **link reaction** each **pyruvate** gives **acetyl CoA**, CO₂ and NADH. In the **Krebs cycle** (Hans Krebs, 1937), in the matrix, acetyl CoA joins **OAA (4 C)** to give **citric acid (6 C)**, two CO₂ are released, and OAA is regenerated.',
      v: V.krebs,
      n: 'Pyruvate loses one carbon dioxide to become acetyl CoA, which enters the cycle. Round the cycle two more carbon dioxide molecules leave, and NADH, FADH two and a little ATP are made. The starting acid is regenerated.',
    }),
    sl('example', 'Worked example 2: one glucose through the link reaction and the Krebs cycle', {
      b: `One glucose gives 2 pyruvate. Find the CO₂, NADH, FADH₂ and ATP from the link reaction and the Krebs cycle. (Per acetyl CoA: ${KREBS1.nadh} NADH, ${KREBS1.fadh2} FADH₂, ${KREBS1.atp} ATP, ${KREBS1.co2} CO₂.)`,
      ul: [
        r`Link reaction: $2 \times 1 = ${LINK2.co2}$ CO₂ and ${LINK2.nadh} NADH.`,
        r`Krebs cycle: $2 \times ${KREBS1.nadh} = ${KREBS2.nadh}$ NADH; $2 \times ${KREBS1.fadh2} = ${KREBS2.fadh2}$ FADH₂; $${KREBS2.atp}$ ATP; $2 \times ${KREBS1.co2} = ${KREBS2.co2}$ CO₂.`,
        r`Carbon check: glucose 6 C $= ${LINK2.co2} + ${KREBS2.co2} = ${LINK2.co2 + KREBS2.co2}$ CO₂.`,
      ],
      v: table(['Stage', 'CO₂', 'NADH', 'FADH₂', 'ATP'], [['Link reaction', String(LINK2.co2), String(LINK2.nadh), '0', '0'], ['Krebs cycle', String(KREBS2.co2), String(KREBS2.nadh), String(KREBS2.fadh2), String(KREBS2.atp)], ['Total with link', String(TOTAL.co2 - 0), String(LINK2.nadh + KREBS2.nadh), String(KREBS2.fadh2), String(KREBS2.atp)]], 'Worked table of the products of the link reaction and Krebs cycle for one glucose'),
      n: 'The cycle turns twice for one glucose, so double each figure. All six carbon atoms of the glucose have then left as carbon dioxide: two from the link reaction and four from the cycle.',
    }),
    sl('check', 'Quick check: Krebs cycle', {
      b: 'Count the NADH formed in the Krebs cycle from several glucose molecules.',
      n: 'Quick check. The cycle turns twice for every glucose.',
      chk: 'krebs-check',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Plants exchange gases by diffusion through stomata, lenticels and root surfaces.',
        `Aerobic respiration: complete oxidation; ${Y.total} ATP per glucose. Fermentation: ${FERM_ATP} ATP per glucose.`,
        `Glycolysis (cytoplasm): glucose to 2 pyruvate; net ${GLY.net} ATP and ${GLY.nadh} NADH.`,
        `Link reaction and Krebs cycle (matrix): ${TOTAL.co2} CO₂, ${LINK2.nadh + KREBS2.nadh} NADH, ${KREBS2.fadh2} FADH₂ and ${KREBS2.atp} ATP per glucose.`,
      ],
      v: table(['Stage', 'Site'], [['Glycolysis', 'Cytoplasm'], ['Link reaction and Krebs cycle', 'Mitochondrial matrix']], 'Summary table of the sites of respiration stages'),
      n: 'To recap: gases diffuse in and out of plants. Glycolysis splits glucose into pyruvate in the cytoplasm. With oxygen, pyruvate enters the mitochondrion and is completely oxidised in the link reaction and Krebs cycle.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Compare **aerobic respiration** with **alcoholic and lactic fermentation** in a table.',
        'Draw **glycolysis and the Krebs cycle as flowcharts** with ATP, NADH, FADH₂ and CO₂ marked; do not write detailed intermediates.',
        'Give **net** ATP: 2 (glycolysis), not 4.',
        'State the **site** of each stage.',
      ],
      n: 'Exam tips. Compare aerobic and anaerobic respiration in a table. Draw the two pathways as simple flowcharts and mark the products. Give the net gain of ATP, not the gross. And state where each stage takes place.',
    }),
  ],
});

// ---------------------------------------------------------------- Part 2
const G = { s1: Y.g, s2: Y.l, s3: Y.k };
export const deck2 = deck({
  part: 2,
  title: 'Respiration in Plants — Part 2: Electron transport, ATP yield, the amphibolic pathway and RQ',
  goals: [
    'Explain how oxidative phosphorylation makes ATP at the inner mitochondrial membrane and calculate the ATP yield of one glucose',
    'Explain why respiration is an amphibolic pathway',
    'Calculate the respiratory quotient from equations and from data, and compare values for different substrates',
  ],
  slides: [
    sl('title', 'From carriers to ATP', {
      b: 'Part 2 — the electron transport system, the ATP count, and how respiration links to the rest of metabolism.',
      v: flow('LR', [['n', 'NADH and FADH₂'], ['e', 'Electron transport'], ['a', 'ATP and water']], [['n', 'e'], ['e', 'a']], 'NADH and FADH2 feed electron transport, which gives ATP and water'),
      n: 'Most of the ATP of respiration is made at the very end, when the carriers NADH and FADH two hand over their electrons to oxygen along a chain in the inner mitochondrial membrane.',
    }),
    sl('diagram', 'Electron transport system and oxidative phosphorylation', {
      b: 'NADH gives electrons to **complex I** and FADH₂ to **complex II**; electrons pass via **ubiquinone**, **complex III** and **cytochrome c** to **complex IV**, where **oxygen** is the **final acceptor** and forms water. Protons are pumped into the intermembrane space.',
      v: V.ets,
      n: 'As electrons pass along the chain, complexes one, three and four pump protons out of the matrix. Oxygen takes the electrons at the end and forms water. The protons then flow back through ATP synthase, and ATP is made.',
    }),
    sl('concept', 'The parts of the electron transport system', {
      b: 'In the textbook flowchart the chain is a series of carriers, in order. Detailed steps within each complex are not required.',
      v: table(['Part', 'Role'], [['Complex I', 'Accepts electrons from NADH; pumps H⁺'], ['Complex II', 'Accepts electrons from FADH₂'], ['Ubiquinone (UQ)', 'Mobile carrier to complex III'], ['Complex III and cytochrome c', 'Pump H⁺; carry electrons to complex IV'], ['Complex IV', 'Gives electrons to O₂; forms H₂O; pumps H⁺'], ['ATP synthase (F₀F₁)', 'H⁺ flows through F₀; F₁ makes ATP']], 'Table of the parts of the electron transport system and their roles'),
      n: 'Electrons enter from NADH at the first complex and from FADH two at the second. Both reach oxygen at the last complex. The protons that flow through the F zero channel drive the F one knob to make ATP.',
    }),
    sl('concept', 'Chemiosmosis in mitochondria and chloroplasts', {
      b: 'Both organelles use **Mitchell’s chemiosmosis**: a proton gradient across a membrane drives ATP synthase.',
      v: table(['Feature', 'Mitochondrion', 'Chloroplast'], [['Membrane', 'Inner membrane', 'Thylakoid membrane'], ['Energy source for the electrons', 'NADH and FADH₂', 'Light'], ['H⁺ pumped into', 'Intermembrane space', 'Thylakoid lumen'], ['ATP made on', 'Matrix side', 'Stroma side'], ['Final electron acceptor', 'Oxygen', 'NADP⁺']], 'Table comparing chemiosmosis in mitochondria and chloroplasts'),
      n: 'The two systems are alike in principle. Protons collect on one side of a membrane and flow back through ATP synthase. In the mitochondrion the ATP appears in the matrix, and in the chloroplast it appears in the stroma.',
    }),
    sl('check', 'Quick check: final acceptor', {
      b: 'Name the final acceptor of electrons in aerobic respiration.',
      n: 'Quick check. What is the last substance to receive the electrons?',
      chk: 'o2-check',
    }),
    sl('example', 'Worked example 1: ATP from one glucose', {
      b: `Calculate the ATP formed from one glucose by aerobic respiration, taking 3 ATP per NADH and 2 ATP per FADH₂ on the electron transport system.`,
      ul: [
        r`Glycolysis: $${GLY.net} + ${GLY.nadh} \times 3 = ${Y.glycolysis}$ ATP.`,
        r`Link reaction: $${LINK2.nadh} \times 3 = ${Y.link}$ ATP.`,
        r`Krebs cycle: $${KREBS2.atp} + ${KREBS2.nadh} \times 3 + ${KREBS2.fadh2} \times 2 = ${Y.krebs}$ ATP.`,
        r`Total $= ${Y.glycolysis} + ${Y.link} + ${Y.krebs} = ${Y.total}$ ATP.`,
      ],
      v: table(['Stage', 'ATP'], [['Glycolysis', String(Y.glycolysis)], ['Link reaction', String(Y.link)], ['Krebs cycle', String(Y.krebs)], ['Total', String(Y.total)]], `Worked table: ${Y.total} ATP per glucose`),
      n: 'Add the ATP made directly to three for each NADH and two for each FADH two. Glycolysis gives eight, the link reaction six and the Krebs cycle twenty-four, so the total is thirty-eight.',
    }),
    sl('concept', 'Why the ATP count differs between books', {
      b: 'The figure depends on the **ATP made per NADH and FADH₂**. Older books use 3 and 2 (total 38). Current estimates use 2.5 and 1.5 (total 32), because some energy is used to move NADH and pyruvate across membranes.',
      v: table(['Convention', 'ATP per NADH', 'ATP per FADH₂', 'Total per glucose'], [['Textbook (ISC)', '3', '2', String(Y.total)], ['Current estimate', '2.5', '1.5', String(Y2.total)]], 'Table of two conventions for the ATP yield of aerobic respiration'),
      n: 'Both totals are correct under their own assumptions. Always state your assumption in an examination. The syllabus figure of thirty-eight comes from three ATP per NADH and two per FADH two.',
    }),
    sl('example', 'Worked example 2: aerobic respiration against fermentation', {
      b: `Compare the ATP yield and the percentage of the energy of glucose (${EN.glucose} kcal per mole) trapped as ATP (${EN.atp} kcal per mole), for aerobic respiration and fermentation.`,
      ul: [
        r`Aerobic: $${Y.total} \times ${EN.atp} = ${(Y.total * EN.atp).toFixed(1)}$ kcal; $\dfrac{${(Y.total * EN.atp).toFixed(1)}}{${EN.glucose}} \times 100 \approx ${effAerobic}$ percent.`,
        r`Fermentation: $${FERM_ATP} \times ${EN.atp} = ${(FERM_ATP * EN.atp).toFixed(1)}$ kcal; $\dfrac{${(FERM_ATP * EN.atp).toFixed(1)}}{${EN.glucose}} \times 100 \approx ${effFerm}$ percent.`,
        r`Aerobic yield is $${Y.total} \div ${FERM_ATP} = ${FOLD}$ times that of fermentation.`,
      ],
      v: table(['Process', 'ATP', 'Energy trapped (percent)'], [['Aerobic', String(Y.total), String(effAerobic)], ['Fermentation', String(FERM_ATP), String(effFerm)]], `Worked table: ${effAerobic} percent against ${effFerm} percent`),
      n: 'Aerobic respiration traps about forty percent of the energy of glucose, and fermentation only about two percent. Aerobic respiration therefore gives nineteen times as much ATP from the same glucose.',
    }),
    sl('check', 'Quick check: ATP from the chain', {
      b: 'Count the ATP made on the electron transport system for one glucose.',
      n: 'Quick check. Leave out the ATP made directly in glycolysis and the Krebs cycle.',
      chk: 'etsatp-check',
    }),
    sl('diagram', 'Respiration as an amphibolic pathway', {
      b: 'Respiration is **amphibolic**: it is **catabolic** because it breaks down carbohydrates, fats and proteins, and **anabolic** because its intermediates are drawn off to build **fatty acids, amino acids and other compounds**.',
      v: V.amphi,
      n: 'Fats enter as fatty acids and glycerol, proteins as amino acids, and carbohydrates as glucose. The same intermediates can also leave the pathway to build new compounds, so respiration both breaks down and builds up.',
    }),
    sl('concept', 'Entry and exit points', {
      b: 'The **acetyl CoA** and Krebs cycle intermediates form the crossroads.',
      v: table(['Substrate', 'Enters respiration as', 'Anabolic use of intermediates'], [['Carbohydrate', 'Glucose, then pyruvate', 'Pyruvate for amino acid synthesis'], ['Fat', 'Glycerol (to a sugar phosphate) and fatty acids (to acetyl CoA)', 'Acetyl CoA for fatty acids'], ['Protein', 'Amino acids (to pyruvate, acetyl CoA or Krebs intermediates)', 'Krebs intermediates for amino acids']], 'Table of how carbohydrates, fats and proteins enter respiration and the anabolic uses of intermediates'),
      n: 'Fatty acids are broken into two-carbon units that enter as acetyl CoA. Amino acids lose their nitrogen and enter at pyruvate, acetyl CoA or a Krebs cycle acid. Intermediates can be drawn off again to build fatty acids and amino acids.',
    }),
    sl('concept', 'Respiratory quotient', {
      b: 'The **respiratory quotient (RQ)** is the ratio of the **volume of CO₂ released** to the **volume of O₂ consumed**. It depends on the substrate.',
      v: table(['Substrate', 'Example equation', 'RQ'], [['Carbohydrate', 'Glucose', `${RQ.glucose}`], ['Fat (fatty acid)', 'Palmitic acid', `${RQ.palmitic}`], ['Protein', 'Mixed', 'About 0.9'], ['Organic acid', 'Tartaric acid', `${RQ.tartaric}`], ['Anaerobic', 'No O₂ used', 'Infinite']], 'Table of respiratory quotients of different substrates'),
      n: 'Carbohydrates have a quotient of one. Fats need more oxygen for the carbon dioxide they give, so their quotient is below one. Organic acids contain a lot of oxygen themselves, so their quotient is above one.',
    }),
    sl('example', 'Worked example 3: RQ from balanced equations', {
      b: 'Find the RQ of (i) glucose and (ii) stearic acid, using balanced equations.',
      ul: [
        r`(i) $\text{C}_6\text{H}_{12}\text{O}_6 + 6\,\text{O}_2 \rightarrow 6\,\text{CO}_2 + 6\,\text{H}_2\text{O}$: $\text{RQ} = 6 \div 6 = ${RQ.glucose}$.`,
        r`(ii) $\text{C}_{18}\text{H}_{36}\text{O}_2 + 26\,\text{O}_2 \rightarrow 18\,\text{CO}_2 + 18\,\text{H}_2\text{O}$: $\text{RQ} = 18 \div 26 = ${RQ.stearic}$.`,
        'A fat needs much more oxygen for each CO₂ released, so its RQ is below 1.',
      ],
      v: table(['Substrate', 'CO₂', 'O₂', 'RQ'], [['Glucose', '6', '6', String(RQ.glucose)], ['Stearic acid', '18', '26', String(RQ.stearic)]], `Worked table: RQ ${RQ.glucose} and ${RQ.stearic}`),
      n: 'Count the carbon dioxide released and the oxygen used in the balanced equation, and divide. Glucose gives one. Stearic acid gives eighteen over twenty-six, which is about zero point seven.',
    }),
    sl('example', 'Worked example 4: RQ from respirometer readings', {
      b: `Germinating seeds in a respirometer used ${SEED.o2} mL of oxygen and released ${SEED.co2} mL of carbon dioxide in an hour. Find the RQ and say what the seeds probably respired.`,
      ul: [
        r`$\text{RQ} = \dfrac{${SEED.co2}}{${SEED.o2}} = ${SEED_RQ}$.`,
        'A value between that of fat (about 0.7) and carbohydrate (1.0) suggests a **mixture** of substrates.',
      ],
      v: table(['Reading', 'Volume (mL)'], [['Oxygen used', String(SEED.o2)], ['Carbon dioxide released', String(SEED.co2)], ['RQ', String(SEED_RQ)]], `Worked table: RQ ${SEED_RQ}`),
      n: 'Divide the carbon dioxide released by the oxygen used. The value of zero point eight lies between fat and carbohydrate, so the seeds were respiring a mixture of food reserves.',
    }),
    sl('check', 'Quick check: RQ', {
      b: 'Calculate an RQ from a balanced equation.',
      n: 'Quick check. Count carbon dioxide over oxygen.',
      chk: 'rq-check',
    }),
    sl('check', 'Quick check: amphibolic', {
      b: 'Decide why respiration is called amphibolic.',
      n: 'Quick check. Think of breaking down and building up.',
      chk: 'amph-check',
    }),
    sl('summary', 'Summary', {
      ul: [
        'ETS in the inner membrane: NADH and FADH₂ to O₂ (final acceptor); H⁺ gradient drives ATP synthase (oxidative phosphorylation).',
        `One glucose gives ${Y.total} ATP (3 per NADH, 2 per FADH₂); about ${Y2.total} by current estimates; fermentation gives ${FERM_ATP}.`,
        'Amphibolic: catabolic breakdown and anabolic use of intermediates.',
        `RQ = CO₂ ÷ O₂: carbohydrate ${RQ.glucose}; fats about 0.7; proteins about 0.9; organic acids above 1.`,
      ],
      v: table(['Substrate', 'RQ'], [['Carbohydrate', '1'], ['Fat', 'Less than 1'], ['Organic acid', 'More than 1']], 'Summary table of RQ for substrates'),
      n: 'To recap: electrons from NADH and FADH two pass to oxygen, and a proton gradient drives ATP synthesis. One glucose gives thirty-eight ATP on the textbook count. Respiration is amphibolic, and its quotient reveals the substrate.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Show the **ATP count by stage** and state the **3 and 2** assumption.',
        'Say **oxygen is the final electron acceptor** and gives water.',
        'Define **amphibolic** with one catabolic and one anabolic example.',
        'Write the **balanced equation** before working out an RQ.',
      ],
      n: 'Exam tips. Show the count of ATP stage by stage and state your assumption. Name oxygen as the final acceptor. Define amphibolic with two examples. And balance the equation before calculating a quotient.',
    }),
  ],
});
void G;
void EQ;
