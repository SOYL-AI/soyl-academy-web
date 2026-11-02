// ch12 Respiration in Plants — two decks: Part 1 (t01 glycolysis and fermentation; link reaction and Krebs cycle), Part 2 (t02 electron transport; t03 energy relations, RQ, amphibolic pathway).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { GLYCOLYSIS, FATES, KREBS, MITO, ETS, ATP_BARS } from './svgs.mjs';
import { GLYC, LINK, TCA, CONV, CONV_NEW, N, SOURCES, RQ, EQN, GLUCOSE_KJ, ATP_KJ, TOTAL_NADH, TOTAL_FADH2 } from './calc.mjs';

export const V = {
  glyc: svgV(GLYCOLYSIS, 'Flow of glycolysis from glucose to two pyruvic acid, with the steps that use and make ATP and NADH'),
  fates: svgV(FATES, 'Three fates of pyruvic acid: lactic acid, ethanol with carbon dioxide, and acetyl CoA'),
  krebs: svgV(KREBS, 'The Krebs cycle as a ring of eight acids with the steps that release carbon dioxide, NADH, FADH2 and ATP'),
  mito: svgV(MITO, 'Labelled section of a mitochondrion with outer membrane, intermembrane space, inner membrane, cristae and matrix'),
  ets: svgV(ETS, 'Electron transport system in the inner mitochondrial membrane with complexes I to IV, ubiquinone, cytochrome c and ATP synthase'),
  bars: svgV(ATP_BARS, 'Bar chart of ATP per glucose from glycolysis, link reaction, Krebs cycle and the total of 38'),
};
const sat = (v) => String(v);

export const deck1 = deck({
  part: 1,
  title: 'Respiration in Plants — Part 1: Glycolysis, fermentation and the Krebs cycle',
  goals: [
    'Describe glycolysis and count its ATP, NADH and pyruvic acid',
    'Compare alcoholic and lactic acid fermentation and state their energy yield',
    'Describe the link reaction and the Krebs cycle and what each gives per glucose',
  ],
  slides: [
    sl('title', 'Respiration in Plants', {
      b: 'Part 1 — how a plant cell breaks glucose down in steps and traps the energy as ATP.',
      v: flow('LR', [['g', 'Glucose'], ['p', 'Pyruvic acid (glycolysis, cytoplasm)'], ['k', 'Krebs cycle (mitochondrial matrix)'], ['e', 'Electron transport: ATP, CO₂ and water']], [['g', 'p'], ['p', 'k'], ['k', 'e']], 'Flow from glucose through glycolysis, the Krebs cycle and electron transport'),
      n: 'Every living cell needs energy, and it gets it by breaking down food. Cellular respiration releases the energy of glucose in many small steps and traps it as ATP, the energy currency of the cell. This part follows glucose through glycolysis, fermentation and the Krebs cycle.',
    }),
    sl('concept', 'Cellular respiration: where each stage happens', {
      b: 'Respiration is the **enzymatic oxidation of food** in the cell, releasing energy in **small steps** and storing it in **ATP**. Plants have no special breathing organs; each part exchanges gases for itself.',
      v: table(
        ['Stage', 'Place in the cell', 'Needs oxygen?'],
        [
          ['Glycolysis', 'Cytoplasm', 'No'],
          ['Fermentation', 'Cytoplasm', 'No'],
          ['Link reaction and Krebs cycle', 'Mitochondrial matrix', 'Indirectly: needs NAD⁺ made by the electron transport system'],
          ['Electron transport and ATP synthesis', 'Inner mitochondrial membrane', 'Yes: oxygen is the final acceptor'],
        ],
        'Table of the stages of respiration with their sites and oxygen needs',
      ),
      n: 'Glycolysis and fermentation take place in the cytoplasm and do not need oxygen. The link reaction and the Krebs cycle are in the matrix of the mitochondrion, and the electron transport system is on the inner membrane, where oxygen is the final electron acceptor.',
    }),
    sl('diagram', 'Glycolysis', {
      b: '**Glycolysis** (the **EMP pathway**) splits one **glucose (6C)** into two **pyruvic acid (3C)** in the **cytoplasm**, in all living organisms.',
      v: V.glyc,
      n: 'Glucose is first phosphorylated twice, using two ATP, and then split into two three carbon sugar phosphates. Each is oxidised, and NAD plus is reduced to NADH. Two later steps make ATP directly from substrates. The end product is two molecules of pyruvic acid.',
    }),
    sl('concept', 'The balance sheet of glycolysis', {
      b: 'Glycolysis spends **2 ATP** early and makes **4 ATP** later, so the **net gain is 2 ATP**, plus **2 NADH** and **2 pyruvic acid**.',
      v: table(
        ['Item', 'Per glucose'],
        [
          ['ATP used', String(GLYC.atpIn)],
          ['ATP made (substrate-level phosphorylation)', String(GLYC.atpOut)],
          ['Net ATP', String(GLYC.netAtp)],
          ['NADH', String(GLYC.nadh)],
          ['Pyruvic acid', String(GLYC.pyruvate)],
        ],
        'Table of the ATP, NADH and pyruvic acid of glycolysis per glucose',
      ),
      n: 'Two ATP are used and four are made, so the cell gains two ATP for each glucose. It also gains two NADH and two molecules of pyruvic acid. The ATP is made by transferring phosphate directly from a substrate, which is called substrate level phosphorylation.',
    }),
    sl('example', 'Worked example 1: glycolysis of three glucose molecules', {
      b: `A cell breaks down ${3} glucose molecules by glycolysis. How many ATP are used and made, what is the net ATP, and how many NADH and pyruvic acid result?`,
      ul: [
        r`ATP used: $3 \times ${GLYC.atpIn} = ${N.glyc3.atpIn}$; ATP made: $3 \times ${GLYC.atpOut} = ${N.glyc3.atpOut}$.`,
        r`Net ATP: $${N.glyc3.atpOut} - ${N.glyc3.atpIn} = ${N.glyc3.atpNet}$.`,
        r`NADH: $3 \times ${GLYC.nadh} = ${N.glyc3.nadh}$; pyruvic acid: $3 \times ${GLYC.pyruvate} = ${N.glyc3.pyruvate}$.`,
      ],
      v: table(['Quantity', 'For 3 glucose'], [['ATP used', String(N.glyc3.atpIn)], ['ATP made', String(N.glyc3.atpOut)], ['Net ATP', String(N.glyc3.atpNet)], ['NADH', String(N.glyc3.nadh)], ['Pyruvic acid', String(N.glyc3.pyruvate)]], 'Worked table for glycolysis of three glucose'),
      n: 'For each glucose, two ATP are used and four made. For three glucose that is six used and twelve made, so six ATP net. The NADH and the pyruvic acid are each two per glucose, so six of each.',
    }),
    sl('check', 'Quick check: glycolysis', {
      b: 'Count the products of glycolysis.',
      n: 'Quick check. How much ATP does glycolysis gain on balance for each glucose?',
      chk: 'glyc-mcq',
    }),
    sl('diagram', 'The fates of pyruvic acid', {
      b: 'What happens next depends on **oxygen**: **fermentation** in the cytoplasm without it, or **aerobic respiration** in the mitochondria with it.',
      v: V.fates,
      n: 'Pyruvic acid has three possible fates. In yeast without oxygen it becomes ethanol and carbon dioxide. In muscle cells working hard without enough oxygen it becomes lactic acid. When oxygen is available, it enters the mitochondria and is oxidised completely to carbon dioxide and water.',
    }),
    sl('concept', 'Fermentation', {
      b: 'In **fermentation** the NADH made in glycolysis is **reoxidised to NAD⁺** so glycolysis can go on. Less than **7 percent** of the energy of glucose is released, and not all is trapped as ATP.',
      v: table(
        ['Feature', 'Alcoholic fermentation', 'Lactic acid fermentation'],
        [
          ['Organism', 'Yeast', 'Muscle cells; some bacteria'],
          ['Enzymes', 'Pyruvic acid decarboxylase, alcohol dehydrogenase', 'Lactate dehydrogenase'],
          ['Products', 'Ethanol + CO₂', 'Lactic acid, no CO₂'],
          ['Net ATP per glucose', String(GLYC.netAtp), String(GLYC.netAtp)],
        ],
        'Table comparing alcoholic and lactic acid fermentation',
      ),
      n: 'Fermentation allows glycolysis to continue by turning NADH back into NAD plus. Yeast makes ethanol and carbon dioxide, using two enzymes. Muscle cells make lactic acid, using lactate dehydrogenase. Both gain only two ATP per glucose, which is a small part of the energy in glucose.',
    }),
    sl('example', 'Worked example 2: a fermentation vat', {
      b: `Yeast ferments 90 g of glucose (180 g per mole) by alcoholic fermentation, each mole giving 2 mol ethanol (46 g per mole) and 2 mol CO₂ (44 g per mole). Find the masses of ethanol and CO₂ and check that mass is conserved. What percentage of glucose energy is trapped, given ${GLUCOSE_KJ} kJ per mole of glucose and ${ATP_KJ} kJ per mole of ATP?`,
      ul: [
        r`Glucose: $\dfrac{90}{180} = 0.5$ mol, so ethanol $= 0.5 \times 2 \times 46 = ${N.ethanol90}$ g.`,
        r`CO$_2$: $0.5 \times 2 \times 44 = ${N.co2f90}$ g; check: $${N.ethanol90} + ${N.co2f90} = 90$ g.`,
        r`ATP: $0.5 \times 2 = 1$ mol, trapping $1 \times ${ATP_KJ} = 30.5$ kJ out of $0.5 \times ${GLUCOSE_KJ} = 1435$ kJ, which is $\dfrac{30.5}{1435} \times 100 \approx ${N.effFerm}$ percent.`,
      ],
      v: table(['Quantity', 'Value'], [['Glucose', '90 g (0.5 mol)'], ['Ethanol', `${N.ethanol90} g`], ['Carbon dioxide', `${N.co2f90} g`], ['Energy trapped', `about ${N.effFerm} percent`]], 'Worked table for the fermentation of 90 grams of glucose'),
      n: 'Ninety grams is half a mole of glucose, which gives one mole of ethanol, forty six grams, and one mole of carbon dioxide, forty four grams. They add up to ninety grams, so mass is conserved. Only about two percent of the energy is trapped in ATP, well under the seven percent ceiling.',
    }),
    sl('check', 'Quick check: fermentation', {
      b: 'Identify the end products.',
      n: 'Quick check. Which fermentation gives no carbon dioxide?',
      chk: 'ferment-mcq',
    }),
    sl('diagram', 'The mitochondrion', {
      b: 'Aerobic respiration is completed in the **mitochondria**. The **matrix** holds the enzymes of the **link reaction and Krebs cycle**; the **inner membrane**, folded into **cristae**, carries the **electron transport system**.',
      v: V.mito,
      n: 'A mitochondrion has an outer membrane and a folded inner membrane. The folds, called cristae, increase the area that carries the electron transport system and ATP synthase. The matrix inside holds the enzymes for the link reaction and the Krebs cycle.',
    }),
    sl('concept', 'The link reaction', {
      b: '**Pyruvic acid** enters the matrix and is oxidised and decarboxylated to **acetyl CoA**: pyruvic acid + CoA + NAD⁺ → **acetyl CoA + CO₂ + NADH**.',
      v: table(
        ['Item', 'Per pyruvic acid', 'Per glucose (2 pyruvic acid)'],
        [['CO₂ released', '1', String(LINK.co2)], ['NADH made', '1', String(LINK.nadh)], ['Acetyl CoA made', '1', String(LINK.acetylCoA)]],
        'Table of the link reaction products per pyruvic acid and per glucose',
      ),
      n: 'Each pyruvic acid loses one carbon as carbon dioxide and forms acetyl CoA, with one NADH made. The enzyme is pyruvate dehydrogenase, which needs magnesium. One glucose gives two pyruvic acid, so two acetyl CoA, two carbon dioxide and two NADH.',
    }),
    sl('diagram', 'The Krebs cycle', {
      b: 'Acetyl CoA (2C) joins **oxaloacetic acid (4C)** to give **citric acid (6C)**. Two steps release **CO₂ and NADH**, one makes **ATP**, one **FADH₂**, and the last **NADH**, regenerating oxaloacetic acid.',
      v: V.krebs,
      n: 'The cycle turns once for each acetyl CoA. Two carbons enter and two leave as carbon dioxide, so the cycle can continue. One turn gives three NADH, one FADH two and one ATP. The NADH and FADH two carry electrons to the electron transport system.',
    }),
    sl('check', 'Quick check: the Krebs cycle', {
      b: 'Count the outputs of the cycle.',
      n: 'Quick check. How many NADH does one turn of the Krebs cycle give?',
      chk: 'tca-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Glycolysis (cytoplasm): glucose to 2 pyruvic acid; net 2 ATP and 2 NADH.',
        'Without oxygen: fermentation (ethanol + CO₂ in yeast; lactic acid in muscle), net 2 ATP.',
        'With oxygen: link reaction in the matrix gives acetyl CoA, CO₂ and NADH.',
        'Krebs cycle per acetyl CoA: 3 NADH, 1 FADH₂, 1 ATP, 2 CO₂.',
      ],
      v: V.krebs,
      n: 'To recap: glycolysis in the cytoplasm gives two pyruvic acid, two NADH and a net of two ATP. Without oxygen, fermentation follows. With oxygen the pyruvic acid goes to the matrix, becomes acetyl CoA and is oxidised in the Krebs cycle, which loads electrons onto NADH and FADH two.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write **gross 4 ATP, used 2, net 2** for glycolysis, and say **substrate-level phosphorylation**.',
        'Name the **enzymes** of each fermentation and the **products**.',
        'Say **where** each stage occurs: cytoplasm, matrix, inner membrane.',
        'Remember the Krebs cycle works **twice per glucose**: double the per-turn counts.',
      ],
      n: 'Exam tips. For glycolysis, give gross, used and net ATP. Name the enzymes and products of each fermentation. Say where each stage occurs. And remember that the Krebs cycle turns twice for every glucose, so double the counts for one turn.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Respiration in Plants — Part 2: Electron transport, energy relations and the respiratory quotient',
  goals: [
    'Describe the electron transport system and oxidative phosphorylation',
    'Calculate the ATP yield and energy efficiency of aerobic respiration and fermentation',
    'Calculate the respiratory quotient and explain why respiration is an amphibolic pathway',
  ],
  slides: [
    sl('title', 'Electron transport and energy relations', {
      b: 'Part 2 — how NADH and FADH₂ yield most of the ATP, and how to count it.',
      v: flow('LR', [['n', 'NADH and FADH₂'], ['e', 'Electron transport chain'], ['o', 'Oxygen: water formed'], ['a', 'ATP made by ATP synthase']], [['n', 'e'], ['e', 'o'], ['e', 'a']], 'Flow from NADH and FADH2 through the electron transport chain to oxygen and ATP'),
      n: 'Glycolysis and the Krebs cycle make only a little ATP directly. Most of the energy is held in NADH and FADH two. In this part we see how their electrons are passed along a chain to oxygen, how ATP is made, and how to calculate the totals.',
    }),
    sl('diagram', 'The electron transport system', {
      b: 'The ETS lies in the **inner mitochondrial membrane**. Electrons from **NADH (complex I)** and **FADH₂ (complex II)** pass to **ubiquinone**, **complex III**, **cytochrome c** and **complex IV**, and finally to **oxygen**.',
      v: V.ets,
      n: 'Electrons from NADH enter at complex one, and those from FADH two at complex two. They pass to ubiquinone, then to complex three, to the small protein cytochrome c, and to complex four, cytochrome c oxidase. At the end they combine with oxygen and protons to form water. Complexes one, three and four pump protons across the membrane.',
    }),
    sl('concept', 'Parts of the electron transport system', {
      b: 'Learn each component and its job.',
      v: table(
        ['Component', 'Role'],
        [
          ['Complex I (NADH dehydrogenase)', 'Receives electrons from NADH; passes them to ubiquinone'],
          ['Complex II (succinate dehydrogenase)', 'Receives electrons from FADH₂; passes them to ubiquinone'],
          ['Ubiquinone', 'Mobile carrier to complex III'],
          ['Complex III (cytochrome bc₁) and cytochrome c', 'Pass electrons on to complex IV'],
          ['Complex IV (cytochrome c oxidase)', 'Passes electrons to O₂, the final acceptor, forming water'],
        ],
        'Table of the components of the electron transport system and their roles',
      ),
      n: 'Oxygen is the ultimate acceptor of electrons. It drives the whole process by removing hydrogen from the system, and the oxygen is reduced to water. Without oxygen the chain stops, NAD plus and FAD cannot be regenerated, and the Krebs cycle also stops.',
    }),
    sl('check', 'Quick check: the chain', {
      b: 'Find the final electron acceptor.',
      n: 'Quick check. What accepts the electrons at the end of the chain?',
      chk: 'ets-mcq',
    }),
    sl('concept', 'Oxidative phosphorylation', {
      b: 'The proton gradient across the inner membrane drives **ATP synthase** (**complex V**), which has a channel, **F₀**, and a knob, **F₁**. Making ATP in this way is **oxidative phosphorylation**.',
      v: flow('LR', [['n', 'NADH and FADH₂ give up electrons'], ['p', 'Complexes I, III and IV pump H⁺ out of the matrix'], ['g', 'H⁺ gradient across the inner membrane'], ['a', 'H⁺ flows back through F₀; F₁ makes ATP']], [['n', 'p'], ['p', 'g'], ['g', 'a']], 'Flow from electron donation to proton pumping, the gradient and ATP synthesis'),
      n: 'As electrons move down the chain, protons are pumped from the matrix into the space between the membranes. The protons then flow back through the channel of ATP synthase, and the energy released changes the shape of its knob, which makes ATP from ADP and phosphate.',
    }),
    sl('example', 'Worked example 1: ATP from one turn of the Krebs cycle', {
      b: `Using the textbook convention of ${CONV.nadh} ATP per NADH and ${CONV.fadh2} ATP per FADH₂, find the ATP from one acetyl CoA oxidised in the Krebs cycle and the electron transport system.`,
      ul: [
        r`NADH: $${TCA.nadh} \times ${CONV.nadh} = ${TCA.nadh * CONV.nadh}$ ATP.`,
        r`FADH$_2$: $${TCA.fadh2} \times ${CONV.fadh2} = ${TCA.fadh2 * CONV.fadh2}$ ATP.`,
        r`Substrate-level ATP: ${TCA.atp}. Total: $${TCA.nadh * CONV.nadh} + ${TCA.fadh2 * CONV.fadh2} + ${TCA.atp} = ${N.tcaAtp}$ ATP.`,
      ],
      v: table(['Product of one turn', 'Number', 'ATP'], [['NADH', String(TCA.nadh), String(TCA.nadh * CONV.nadh)], ['FADH₂', String(TCA.fadh2), String(TCA.fadh2 * CONV.fadh2)], ['ATP (via GTP)', String(TCA.atp), String(TCA.atp)], ['Total', '', String(N.tcaAtp)]], 'Worked table: 12 ATP from one acetyl CoA'),
      n: 'One turn gives three NADH, worth nine ATP, one FADH two, worth two, and one ATP made directly. The total is twelve ATP for each acetyl CoA.',
    }),
    sl('diagram', 'The balance sheet per glucose', {
      b: `Counting **${CONV.nadh} ATP per NADH** and **${CONV.fadh2} ATP per FADH₂**, one glucose gives **${N.total} ATP** in complete aerobic respiration.`,
      v: V.bars,
      n: 'Glycolysis gives eight ATP counting its two NADH. The link reaction gives six from two NADH. The Krebs cycle, which turns twice, gives twenty four. Together that is thirty eight ATP, of which only four are made by substrate level phosphorylation.',
    }),
    sl('example', 'Worked example 2: totals and efficiency', {
      b: `Add up the ATP from one glucose, and find the percentage of the ${GLUCOSE_KJ} kJ per mole of glucose trapped as ATP (${ATP_KJ} kJ per mole). Compare with fermentation.`,
      ul: [
        r`NADH: $${TOTAL_NADH} \times ${CONV.nadh} = ${TOTAL_NADH * CONV.nadh}$; FADH$_2$: $${TOTAL_FADH2} \times ${CONV.fadh2} = ${TOTAL_FADH2 * CONV.fadh2}$; direct ATP: $2 + 2 = 4$.`,
        r`Total: $${TOTAL_NADH * CONV.nadh} + ${TOTAL_FADH2 * CONV.fadh2} + 4 = ${N.total}$ ATP, trapping $${N.total} \times ${ATP_KJ} = ${N.kjAero}$ kJ.`,
        r`Efficiency: $\dfrac{${N.kjAero}}{${GLUCOSE_KJ}} \times 100 \approx ${N.effAero}$ percent, against about ${N.effFerm} percent for fermentation.`,
      ],
      v: table(['Pathway', 'ATP per glucose', 'Energy trapped (kJ)', 'Efficiency (percent)'], [['Aerobic respiration', String(N.total), String(N.kjAero), String(N.effAero)], ['Fermentation', String(GLYC.netAtp), String(N.kjFerm), String(N.effFerm)]], 'Worked table comparing aerobic respiration and fermentation'),
      n: 'Ten NADH give thirty ATP and two FADH two give four, so with four direct ATP the total is thirty eight. That traps about one thousand one hundred and fifty nine kilojoules, roughly forty percent of the energy of glucose, whereas fermentation traps only about two percent.',
    }),
    sl('check', 'Quick check: the ATP total', {
      b: 'Add the contributions.',
      n: 'Quick check. How many ATP does the electron transport system make from the NADH and FADH two of one glucose?',
      chk: 'atp-mcq',
    }),
    sl('concept', 'Aerobic respiration versus fermentation', {
      b: 'The textbook figure of **38 ATP** is a **theoretical maximum**: it assumes a sequential pathway, no intermediates drawn off for other uses, only glucose respired, and cytoplasmic NADH entering the mitochondria without cost.',
      v: table(
        ['Feature', 'Aerobic respiration', 'Fermentation'],
        [
          ['Oxygen', 'Needed', 'Not needed'],
          ['Site', 'Cytoplasm then mitochondria', 'Cytoplasm'],
          ['End products', 'CO₂ and H₂O', 'Ethanol + CO₂ or lactic acid'],
          ['ATP per glucose', String(N.total), String(GLYC.netAtp)],
          ['Energy trapped', `about ${N.effAero} percent`, `about ${N.effFerm} percent`],
        ],
        'Table comparing aerobic respiration and fermentation',
      ),
      n: `Newer measurements give about two and a half ATP per NADH and one and a half per FADH two, so about ${N.totalNew} ATP per glucose. The textbook value of thirty eight is a convenient theoretical figure, and it is the one used in this chapter.`,
    }),
    sl('concept', 'Respiratory quotient', {
      b: 'The **respiratory quotient (RQ)** is the ratio of the **volume of CO₂ evolved** to the **volume of O₂ consumed**: RQ = CO₂ / O₂. It depends on the **substrate**.',
      v: table(
        ['Substrate', 'Balanced equation', 'RQ'],
        [
          ['Carbohydrate (glucose)', EQN.glucose.eq, sat(RQ.glucose)],
          ['Fat (tripalmitin)', EQN.tripalmitin.eq, sat(RQ.tripalmitin)],
          ['Organic acid (malic acid)', EQN.malic.eq, sat(RQ.malic)],
          ['Protein', 'mixed substrates', 'about 0.9'],
        ],
        'Table of respiratory quotients for carbohydrate, fat, organic acid and protein',
      ),
      n: 'The respiratory quotient is carbon dioxide evolved divided by oxygen used. For carbohydrates it is one. Fats contain less oxygen, so they need more oxygen and the quotient is about zero point seven. Proteins give about zero point nine, and organic acids give more than one. In anaerobic respiration no oxygen is used, so the quotient is infinite.',
    }),
    sl('example', 'Worked example 3: finding RQ and the substrate', {
      b: `Germinating seeds consume ${N.seedFat.o2} mL of O₂ and evolve ${N.seedFat.co2} mL of CO₂. A leaf of another plant consumes ${N.leaf.o2} mL of O₂ and evolves ${N.leaf.co2} mL of CO₂. Find each RQ and the probable substrate.`,
      ul: [
        r`Seeds: $\text{RQ} = \dfrac{${N.seedFat.co2}}{${N.seedFat.o2}} = ${N.seedRq}$, which points to **fat** as the main substrate.`,
        r`Leaf: $\text{RQ} = \dfrac{${N.leaf.co2}}{${N.leaf.o2}} = ${N.leafRq}$, above 1, which points to **organic acids** (such as malic acid) being respired.`,
        r`Check with glucose: $\dfrac{6}{6} = 1$ and tripalmitin: $\dfrac{102}{145} \approx ${RQ.tripalmitin}$.`,
      ],
      v: table(['Tissue', 'O₂ used (mL)', 'CO₂ evolved (mL)', 'RQ', 'Probable substrate'], [['Seeds', String(N.seedFat.o2), String(N.seedFat.co2), String(N.seedRq), 'Fat'], ['Leaf', String(N.leaf.o2), String(N.leaf.co2), String(N.leafRq), 'Organic acid']], 'Worked table of two respiratory quotients and probable substrates'),
      n: 'Ninety eight divided by one hundred and forty gives zero point seven, the value for fats. Sixty five divided by fifty gives one point three, greater than one, which suggests organic acids. Always divide carbon dioxide by oxygen, and then compare with the standard values.',
    }),
    sl('check', 'Quick check: RQ', {
      b: 'Compare substrates.',
      n: 'Quick check. Why is the quotient for fats lower than for carbohydrates?',
      chk: 'rq-mcq',
    }),
    sl('concept', 'Respiration is an amphibolic pathway', {
      b: 'The pathway is **catabolic** (breakdown of substrates) but also **anabolic**: its **intermediates are drawn off to make** fatty acids, amino acids and other compounds. It is therefore **amphibolic**.',
      v: flow(
        'LR',
        [['s', 'Carbohydrates, fats, proteins (substrates)'], ['p', 'Respiratory pathway: acetyl CoA, Krebs cycle'], ['b', 'Intermediates for fatty acids, amino acids and other products']],
        [['s', 'p'], ['p', 'b']],
        'Flow from different respiratory substrates into the pathway and from it to biosynthesis',
      ),
      n: 'Fats are broken into glycerol and fatty acids; glycerol enters as a sugar phosphate and fatty acids as acetyl CoA. Proteins are broken into amino acids, which lose their amino group and enter the Krebs cycle. In the other direction, intermediates such as acetyl CoA are used to make fatty acids, so the pathway is both breakdown and build up.',
    }),
    sl('check', 'Quick check: amphibolic', {
      b: 'Judge the assertion and the reason.',
      n: 'Quick check. What makes the pathway amphibolic?',
      chk: 'amph-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        `ETS in the inner mitochondrial membrane; oxygen is the final acceptor; ATP synthase makes ATP.`,
        `Textbook convention: ${CONV.nadh} ATP per NADH, ${CONV.fadh2} per FADH₂; ${N.total} ATP per glucose; fermentation ${GLYC.netAtp}.`,
        `Energy trapped: about ${N.effAero} percent aerobically; about ${N.effFerm} percent in fermentation.`,
        'RQ = CO₂ evolved / O₂ used: carbohydrate 1, fat about 0.7, protein about 0.9, organic acid above 1.',
        'Respiration is amphibolic: catabolic and anabolic.',
      ],
      v: V.bars,
      n: 'To recap: electrons from NADH and FADH two pass along the chain to oxygen, and ATP synthase uses the proton gradient to make ATP. By the textbook convention, one glucose gives thirty eight ATP in aerobic respiration, against two in fermentation. The respiratory quotient depends on the substrate, and the pathway is amphibolic.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        `State the **ATP convention** (${CONV.nadh} per NADH, ${CONV.fadh2} per FADH₂) before totalling to **${N.total}**.`,
        'In RQ answers write **CO₂ ÷ O₂** and link the value to the **substrate**.',
        'Say that **oxygen is the final electron acceptor** and that ATP synthase has **F₀ and F₁**.',
        'Define **amphibolic** with one catabolic and one anabolic example.',
      ],
      n: 'Exam tips. State the ATP convention before you total to thirty eight. For respiratory quotient, write carbon dioxide divided by oxygen, and link the value to the substrate. Say that oxygen is the final electron acceptor. And define amphibolic with one breakdown and one build up example.',
    }),
  ],
});
