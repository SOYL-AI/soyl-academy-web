// ch12 Respiration in Plants — question bank. AR keys: b a c a c d b.
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { N, GLYC, LINK, TCA, CONV, CONV_NEW, RQ, EQN, rq, atpFrom, totalAtp, efficiency, ethanolFrom, co2FromFerment, co2Aero, o2Aero, round, ATP_KJ, GLUCOSE_KJ } from './calc.mjs';
import { ETS_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 glycolysis and fermentation
add('glyc-mcq', mcq({
  stem: 'Glycolysis spends some ATP early and makes more ATP later. How much ATP does it gain on balance for each glucose molecule?',
  right: `${GLYC.netAtp} ATP (${GLYC.atpOut} made and ${GLYC.atpIn} used)`,
  wrong: ['4 ATP (4 made and none used)', '6 ATP (made from two NADH)', '38 ATP (made with oxygen)'],
  sol: `Two ATP are used in the first two phosphorylations and four are made later, so the net gain is ${GLYC.netAtp} ATP — option (@K).`,
  d: 1, c: 'recall', t: [1],
}), () => GLYC.netAtp === 2 || 'value');
add('ferment-mcq', mcq({
  stem: 'During a sprint a leg muscle runs short of oxygen and its cells convert pyruvic acid to a product that does not contain the gas released in yeast fermentation. Which fermentation is this?',
  right: 'Lactic acid fermentation, which gives lactic acid and no CO₂',
  wrong: ['Alcoholic fermentation, which gives ethanol and CO₂', 'Aerobic respiration, which gives CO₂ and water', 'The link reaction, which gives acetyl CoA and CO₂'],
  sol: 'In muscle, lactate dehydrogenase reduces pyruvic acid to lactic acid; no CO₂ is released, unlike alcoholic fermentation in yeast — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cytoplasm-mcq', mcq({
  stem: 'A researcher removes all the mitochondria from a yeast extract and adds glucose to what is left. Which process can still go on in the extract?',
  right: 'Glycolysis, followed by fermentation if no oxygen is present',
  wrong: ['The Krebs cycle', 'Electron transport and oxidative phosphorylation', 'The link reaction that forms acetyl CoA'],
  sol: 'Glycolysis and fermentation take place in the cytoplasm; the link reaction, Krebs cycle and electron transport need mitochondria — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('nadh-mcq', mcq({
  stem: 'Why does a cell without oxygen reduce pyruvic acid to ethanol or lactic acid instead of leaving it as pyruvic acid?',
  right: 'The reduction oxidises NADH to NAD⁺, which glycolysis needs to continue.',
  wrong: ['The reduction makes a large amount of ATP.', 'The reduction removes the glucose that would poison the cell.', 'The reduction supplies the oxygen needed for glycolysis.'],
  sol: 'Glycolysis needs NAD⁺ to oxidise PGAL; fermentation regenerates NAD⁺ from NADH — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('exercise-mcq', mcq({
  stem: 'After a hard sprint a runner’s thigh muscles ache. Which compound has built up in them?',
  right: 'Lactic acid',
  wrong: ['Ethanol', 'Oxaloacetic acid', 'Acetyl CoA'],
  sol: 'With too little oxygen the muscle cells convert pyruvic acid to lactic acid — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('wine-mcq', mcq({
  stem: 'In a vat of grape juice the yeast stops fermenting once the alcohol reaches about 13 percent. The reason is that',
  right: 'the yeast is poisoned by the ethanol it has made',
  wrong: ['all the oxygen has been used up', 'the yeast has run out of NAD⁺ for aerobic respiration', 'lactic acid has replaced ethanol as the product'],
  sol: 'Fermentation products can be hazardous; yeast is poisoned when the alcohol reaches about 13 percent — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('substrate-mcq', mcq({
  stem: 'In glycolysis some ATP is made by passing a phosphate group straight from an intermediate to ADP. This way of making ATP is called',
  right: 'substrate-level phosphorylation',
  wrong: ['oxidative phosphorylation', 'photophosphorylation', 'chemiosmosis'],
  sol: 'ATP made by direct transfer of phosphate from a substrate is substrate-level phosphorylation — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('frac-mcq', mcq({
  stem: 'In fermentation the share of the energy of glucose that is released is',
  right: 'less than 7 percent',
  wrong: ['about 40 percent', 'about 70 percent', 'all of it, as heat'],
  sol: 'Less than 7 percent of the energy of glucose is released in fermentation, and not all of that is trapped in ATP — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('lactic-tf', tf({
  stem: 'Lactic acid fermentation in muscle cells releases carbon dioxide.',
  key: 'f',
  sol: 'False. Lactate dehydrogenase reduces pyruvic acid to lactic acid without releasing CO₂; the CO₂ in yeast fermentation comes from the decarboxylation of pyruvic acid.',
  d: 2, c: 'understanding', t: [1],
}));
add('emp-fill', fill({
  stem: 'Glycolysis is also known as the ______ pathway, after three scientists.',
  acc: [['EMP', 'Embden-Meyerhof-Parnas', 'Embden Meyerhof Parnas', 'Embden–Meyerhof–Parnas']],
  sol: 'EMP (Embden, Meyerhof and Parnas).',
  d: 1, c: 'recall', t: [1],
}));
add('ferment-ar', ar({
  a: 'Yeast can ferment glucose to ethanol and carbon dioxide when no oxygen is available.',
  r: 'Fermentation gives much less energy than complete aerobic respiration.',
  key: 'b',
  sol: 'Both statements are true, but the low energy yield does not explain how yeast manages without oxygen: fermentation regenerates NAD⁺, so glycolysis can go on — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('ferment-match', match({
  stem: 'Match each enzyme of respiration (column I) with the reaction it catalyses (column II).',
  pairs: [
    ['Lactate dehydrogenase', 'Pyruvic acid is reduced to lactic acid'],
    ['Alcohol dehydrogenase', 'Acetaldehyde is reduced to ethanol'],
    ['Pyruvic acid decarboxylase', 'Pyruvic acid loses CO₂ to give acetaldehyde'],
    ['Pyruvate dehydrogenase', 'Pyruvic acid is oxidised to acetyl CoA in the matrix'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Lactate dehydrogenase makes lactic acid; alcohol dehydrogenase makes ethanol from acetaldehyde; pyruvic acid decarboxylase releases CO₂; pyruvate dehydrogenase makes acetyl CoA in the link reaction.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('glyc5-num', num({
  stem: 'A cell breaks down 5 glucose molecules by glycolysis alone. What is the net gain of ATP?',
  value: N.glyc5.atpNet,
  sol: r`Net ATP per glucose $= ${GLYC.atpOut} - ${GLYC.atpIn} = ${GLYC.netAtp}$, so $5 \times ${GLYC.netAtp} = ${N.glyc5.atpNet}$ ATP.`,
  scheme: [[`${N.glyc5.atpNet} ATP`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 5 * GLYC.netAtp || 'value');
add('glycnadh-num', num({
  stem: 'How many molecules of NADH are formed when 7 glucose molecules pass through glycolysis?',
  value: 7 * GLYC.nadh,
  sol: r`$7 \times ${GLYC.nadh} = ${7 * GLYC.nadh}$ NADH.`,
  scheme: [[`${7 * GLYC.nadh} NADH`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 14 || 'value');
add('ethanol-num', num({
  stem: 'Yeast ferments 36 g of glucose. Each mole of glucose (180 g) gives 2 mol of ethanol (46 g per mole). What mass of ethanol, in g, is formed?',
  value: N.ethanol36, unit: 'g', tol: 0.05,
  sol: r`$\dfrac{36}{180} = 0.2$ mol glucose, giving $0.2 \times 2 = 0.4$ mol ethanol, so $0.4 \times 46 = ${N.ethanol36}$ g.`,
  scheme: [['0.2 mol glucose; 0.4 mol ethanol', 0.5], [`${N.ethanol36} g`, 0.5]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === ethanolFrom(36) || 'value');
add('co2ferm-num', num({
  stem: 'In the same fermentation of 36 g of glucose, 2 mol of CO₂ (44 g per mole) form per mole of glucose. What mass of CO₂, in g, is released?',
  value: N.co2f36, unit: 'g', tol: 0.05,
  sol: r`$0.2 \times 2 \times 44 = ${N.co2f36}$ g of CO$_2$.`,
  scheme: [[`${N.co2f36} g`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === co2FromFerment(36) || 'value');
add('atpmol-num', num({
  stem: 'How many moles of ATP are gained, on balance, when 2 mol of glucose are fermented by yeast?',
  value: N.yeast2mol,
  sol: r`Each mole of glucose gives a net $${GLYC.netAtp}$ mol of ATP, so $2 \times ${GLYC.netAtp} = ${N.yeast2mol}$ mol.`,
  scheme: [[`${N.yeast2mol} mol`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 4 || 'value');
add('glycsites-short', short({
  marks: 2,
  stem: 'State how many ATP molecules glycolysis uses and how many it makes for each glucose, and say what its end products are.',
  model: `For each glucose, glycolysis **uses ${GLYC.atpIn} ATP** (in the first two phosphorylations) and **makes ${GLYC.atpOut} ATP**, a net of **${GLYC.netAtp} ATP**. The end products are **${GLYC.pyruvate} molecules of pyruvic acid** and **${GLYC.nadh} NADH**.`,
  sol: 'ATP used, made, net; products.',
  scheme: [['ATP used, made and net', 1], ['Pyruvic acid and NADH', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('lactic-short', short({
  marks: 2,
  stem: 'Where and when do muscle cells make lactic acid, and which enzyme is involved?',
  model: 'In the **cytoplasm** of muscle cells during **strenuous exercise**, when oxygen is in short supply, **pyruvic acid** from glycolysis is **reduced to lactic acid** by the enzyme **lactate dehydrogenase**. This oxidises NADH to NAD⁺, so glycolysis can continue.',
  sol: 'Cytoplasm; low oxygen; lactate dehydrogenase.',
  scheme: [['Cytoplasm of muscle in low oxygen', 1], ['Pyruvic acid to lactic acid by lactate dehydrogenase', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('nad-short', short({
  marks: 2,
  stem: 'Explain why glycolysis would stop within moments in a yeast cell if it could not carry out fermentation in the absence of oxygen.',
  model: 'Glycolysis **reduces NAD⁺ to NADH** when each PGAL is oxidised. Without oxygen the cell cannot reoxidise NADH through the electron transport system, so **NAD⁺ would run out** and glycolysis would stop. **Fermentation reoxidises NADH to NAD⁺** by reducing pyruvic acid, so it keeps glycolysis going.',
  sol: 'NAD+ regeneration.',
  scheme: [['NAD⁺ is used up in glycolysis', 1], ['Fermentation regenerates NAD⁺', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('ferment-short3', short({
  marks: 3,
  stem: 'Describe alcoholic fermentation in yeast, naming the two enzymes, the products and the net ATP gain per glucose.',
  model: `In the cytoplasm of yeast without oxygen, **pyruvic acid decarboxylase** removes CO₂ from pyruvic acid to give **acetaldehyde**; **alcohol dehydrogenase** then reduces acetaldehyde to **ethanol**, oxidising NADH to NAD⁺. The products are **ethanol and CO₂**. The net gain is only **${GLYC.netAtp} ATP per glucose**, from glycolysis.`,
  sol: 'Enzymes, products, net ATP.',
  scheme: [['Two enzymes and acetaldehyde', 1], ['Ethanol and CO₂', 1], [`Net ${GLYC.netAtp} ATP`, 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('glyc-short3', short({
  marks: 3,
  stem: 'Outline the main events of glycolysis from glucose to pyruvic acid, mentioning where it occurs and the NADH formed.',
  model: `Glycolysis occurs in the **cytoplasm**. **Glucose** is phosphorylated using ATP to glucose 6-phosphate, isomerised to fructose 6-phosphate, and phosphorylated again to **fructose 1,6-bisphosphate**, which splits into **two 3-carbon PGAL**. Each PGAL is oxidised, forming **NADH** (${GLYC.nadh} per glucose), and later steps make **ATP**. The end product is **${GLYC.pyruvate} pyruvic acid**.`,
  sol: 'Phosphorylations, splitting, oxidation, pyruvic acid.',
  scheme: [['Site and two phosphorylations', 1], ['Splitting into two PGAL and oxidation to NADH', 1], ['ATP made; two pyruvic acid', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('glyc-long', long({
  stem: 'Describe glycolysis with its ATP balance, and compare the fates of pyruvic acid without and with oxygen.',
  model: `**Glycolysis** (the EMP pathway) occurs in the **cytoplasm** of all living organisms. **Glucose (6C)** is phosphorylated twice using **${GLYC.atpIn} ATP** and split into two 3-carbon PGAL; each is oxidised, reducing NAD⁺ to **NADH**, and **${GLYC.atpOut} ATP** are made by substrate-level phosphorylation, ending in **${GLYC.pyruvate} pyruvic acid**. The net gain is **${GLYC.netAtp} ATP and ${GLYC.nadh} NADH** per glucose.\n\n**Without oxygen,** pyruvic acid undergoes **fermentation**: in yeast it gives **ethanol and CO₂** (pyruvic acid decarboxylase, alcohol dehydrogenase); in muscle it gives **lactic acid** (lactate dehydrogenase). NADH is reoxidised to NAD⁺, and less than 7 percent of the energy is released.\n\n**With oxygen,** pyruvic acid enters the **mitochondria**, is oxidised to **acetyl CoA** and then completely to **CO₂ and water**, giving much more ATP.`,
  sol: 'Glycolysis balance; two fates.',
  scheme: [['Site and the steps of glycolysis', 1.5], ['ATP balance and NADH', 1], ['Fermentation products and enzymes', 1.5], ['Aerobic fate', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
{
  add('yeast-case', mk.case({
    passage: 'A brewer places 54 g of glucose in a sealed flask of sugar solution with yeast and no air. After some hours the solution has turned cloudy, small bubbles of gas rise from it, and the flask smells of alcohol. All the glucose is used up.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which gas forms the bubbles?',
        right: 'Carbon dioxide',
        wrong: ['Oxygen', 'Hydrogen', 'Nitrogen'],
        sol: 'In alcoholic fermentation, decarboxylation of pyruvic acid releases CO₂ — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'Find the mass of ethanol formed, in g (glucose 180 g per mole; each mole gives 2 mol ethanol of 46 g per mole).',
        value: N.ethanol54, unit: 'g', tol: 0.05,
        sol: r`$\dfrac{54}{180} = 0.3$ mol glucose gives $0.3 \times 2 = 0.6$ mol ethanol, which is $0.6 \times 46 = ${N.ethanol54}$ g.`,
        scheme: [['0.3 mol glucose; 0.6 mol ethanol', 0.5], [`${N.ethanol54} g`, 0.5]],
        d: 3, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the two enzymes that convert pyruvic acid into ethanol and say why the process is called anaerobic.',
        model: '**Pyruvic acid decarboxylase** forms acetaldehyde and CO₂, and **alcohol dehydrogenase** reduces acetaldehyde to ethanol. It is called **anaerobic** because it takes place **without oxygen**, with only glycolysis making ATP.',
        sol: 'Two enzymes; no oxygen.',
        scheme: [['Both enzymes named', 1], ['Anaerobic: no oxygen used', 1]],
        d: 2, c: 'understanding', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Why does the yeast in the flask make ethanol, rather than let NADH accumulate?',
          model: 'Glycolysis needs **NAD⁺** to oxidise PGAL. With no oxygen the cell cannot reoxidise NADH by the electron transport system, so **reducing acetaldehyde to ethanol regenerates NAD⁺ from NADH**. This lets glycolysis, and its small ATP gain, **carry on**.',
          sol: 'NAD+ regeneration.',
          scheme: [['No oxygen: NADH cannot be oxidised by the ETS', 1], ['Ethanol formation regenerates NAD⁺; glycolysis continues', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 27.6 || 'value');
}
{
  add('muscle-case', mk.case({
    passage: 'A marathon runner’s leg muscle cells use glucose. During a long steady run, oxygen reaches the muscle in plenty; during the final sprint, oxygen supply cannot keep up with demand and some cells switch to another way of breaking down glucose.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which product accumulates in the muscle cells during the final sprint?',
        right: 'Lactic acid',
        wrong: ['Ethanol', 'Acetyl CoA', 'Carbon dioxide only'],
        sol: 'When oxygen is short, pyruvic acid is reduced to lactic acid in muscle — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: `Taking 38 ATP per glucose for the steady run and ${GLYC.netAtp} ATP per glucose for the sprint, how many fewer ATP does a cell gain from 9 glucose molecules by the sprint route than by the steady route?`,
        value: N.diff9,
        sol: r`Per glucose the difference is $${totalAtp()} - ${GLYC.netAtp} = ${totalAtp() - GLYC.netAtp}$; for 9 glucose: $9 \times ${totalAtp() - GLYC.netAtp} = ${N.diff9}$ ATP.`,
        scheme: [['Difference of 36 per glucose', 0.5], [`${N.diff9} ATP`, 0.5]],
        d: 3, c: 'application', t: [1, 3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why does the sprint route give so much less ATP than the steady route?',
        model: 'In the sprint route only **glycolysis** makes ATP, a net of **2 ATP per glucose**, and the pyruvic acid ends as lactic acid with most of its **energy still unreleased**. In the steady route, pyruvic acid is **oxidised completely** through the Krebs cycle and the **electron transport system**, which makes most of the ATP.',
        sol: 'Only glycolysis versus complete oxidation.',
        scheme: [['Sprint: only glycolysis; energy left in lactic acid', 1], ['Steady: complete oxidation and ETS give more ATP', 1]],
        d: 2, c: 'understanding', t: [1, 2],
      }), [
        short({
          marks: 2,
          stem: 'Explain why the muscle cells can keep making ATP during the sprint at all, even though oxygen is short.',
          model: '**Glycolysis does not need oxygen**. The cells reduce pyruvic acid to lactic acid, which **regenerates NAD⁺ from NADH**, so glycolysis can continue and make its **net 2 ATP per glucose**, until oxygen is available again.',
          sol: 'Glycolysis needs no oxygen; NAD+ regenerated.',
          scheme: [['Glycolysis needs no oxygen', 1], ['Lactic acid formation regenerates NAD⁺', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 324 || 'value');
}

// ---------------------------------------------------------------- t02 aerobic respiration: link reaction, Krebs cycle, electron transport
add('tca-mcq', mcq({
  stem: 'One turn of the Krebs cycle oxidises one acetyl CoA. How many NADH molecules does that turn give?',
  right: String(TCA.nadh),
  wrong: ['1', '2', '4'],
  sol: `Isocitric acid, α-ketoglutaric acid and malic acid are each oxidised with NAD⁺, giving ${TCA.nadh} NADH (plus 1 FADH₂ and 1 ATP) per turn — option (@K).`,
  d: 2, c: 'recall', t: [2],
}), () => TCA.nadh === 3 || 'value');
add('ets-mcq', mcq({
  stem: 'At the end of the electron transport system in the inner mitochondrial membrane, the electrons are finally accepted by',
  right: 'oxygen, which forms water',
  wrong: ['NAD⁺, which forms NADH', 'ubiquinone, which forms ubiquinol', 'cytochrome c, which forms ATP'],
  sol: 'Complex IV passes the electrons to oxygen, the final acceptor, which combines with protons to form water — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('matrix-mcq', mcq({
  stem: 'The enzymes of the Krebs cycle are found in',
  right: 'the matrix of the mitochondrion',
  wrong: ['the cytoplasm outside the mitochondrion', 'the outer mitochondrial membrane', 'the intermembrane space'],
  sol: 'The Krebs cycle and the link reaction take place in the mitochondrial matrix — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('link-mcq', mcq({
  stem: 'In the matrix, pyruvic acid reacts with coenzyme A and NAD⁺. Which set of products forms?',
  right: 'Acetyl CoA, CO₂ and NADH',
  wrong: ['Acetyl CoA, ATP and FADH₂', 'Lactic acid and NADH', 'Citric acid and CO₂'],
  sol: 'The link reaction is oxidative decarboxylation: pyruvic acid + CoA + NAD⁺ → acetyl CoA + CO₂ + NADH — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('oaa-mcq', mcq({
  stem: 'The 2-carbon acetyl CoA enters the Krebs cycle by combining with a 4-carbon acid to form citric acid. This 4-carbon acid is',
  right: 'oxaloacetic acid',
  wrong: ['succinic acid', 'pyruvic acid', 'α-ketoglutaric acid'],
  sol: 'Acetyl CoA (2C) + oxaloacetic acid (4C) → citric acid (6C), and the cycle regenerates oxaloacetic acid at its end — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('co2-mcq', mcq({
  stem: 'In which pair of steps of the Krebs cycle is CO₂ released?',
  right: 'Isocitric acid to α-ketoglutaric acid, and α-ketoglutaric acid to succinyl CoA',
  wrong: ['Citric acid to isocitric acid, and fumaric acid to malic acid', 'Succinyl CoA to succinic acid, and succinic acid to fumaric acid', 'Malic acid to oxaloacetic acid, and oxaloacetic acid to citric acid'],
  sol: 'The two oxidative decarboxylations are isocitric to α-ketoglutaric acid (6C to 5C) and α-ketoglutaric acid to succinyl CoA (5C to 4C) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('cristae-mcq', mcq({
  stem: 'The inner mitochondrial membrane is folded into cristae. How does this help the cell?',
  right: 'It gives a large surface for the electron transport system and ATP synthase.',
  wrong: ['It allows the Krebs cycle to take place outside the matrix.', 'It lets glycolysis occur inside the mitochondrion.', 'It stores the oxygen that the cell needs.'],
  sol: 'The folds increase the area of the inner membrane that carries the ETS complexes and ATP synthase — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('twice-mcq', mcq({
  stem: 'For each glucose molecule that is completely oxidised, the Krebs cycle turns twice because',
  right: 'one glucose gives two pyruvic acid, and so two acetyl CoA',
  wrong: ['each turn of the cycle can handle only half a glucose', 'oxygen splits each glucose into two halves first', 'two ATP are needed to start each turn'],
  sol: 'Glycolysis gives 2 pyruvic acid, the link reaction gives 2 acetyl CoA, and each acetyl CoA enters one turn of the cycle — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('synthase-mcq', mcq({
  stem: 'In ATP synthase of the inner mitochondrial membrane, the part that forms the channel for protons is',
  right: 'F₀',
  wrong: ['F₁', 'cytochrome c', 'ubiquinone'],
  sol: 'F₀ is the channel in the membrane; the F₁ knob projects into the matrix and makes ATP — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('cyanide-mcq', mcq({
  stem: 'A poison blocks the transfer of electrons to oxygen by complex IV in the mitochondria of a cell supplied with glucose. What happens to the Krebs cycle?',
  right: 'It slows and stops, because NADH and FADH₂ cannot be reoxidised and NAD⁺ and FAD run short.',
  wrong: ['It speeds up, because oxygen is no longer used.', 'It continues unchanged, because oxygen is not used in the cycle.', 'It runs in the cytoplasm instead.'],
  sol: 'Oxygen is the final acceptor; without it the chain stops, NAD⁺ and FAD are not regenerated, and the cycle, which needs them, also stops — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('complex2-mcq', mcq({
  stem: 'Electrons from FADH₂ enter the electron transport system at',
  right: 'complex II (succinate dehydrogenase)',
  wrong: ['complex I (NADH dehydrogenase)', 'complex III (cytochrome bc₁)', 'complex IV (cytochrome c oxidase)'],
  sol: 'FADH₂ gives electrons to complex II, which passes them to ubiquinone; NADH gives its electrons to complex I — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('proton-mcq', mcq({
  stem: 'During oxidative phosphorylation, protons are pumped',
  right: 'from the matrix into the intermembrane space',
  wrong: ['from the intermembrane space into the matrix', 'from the cytoplasm into the matrix', 'from the matrix into the cytoplasm'],
  sol: 'Complexes I, III and IV pump protons from the matrix into the intermembrane space; they flow back through ATP synthase — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
{
  const lettered = svgV(ETS_LETTERED, 'Electron transport components in the inner mitochondrial membrane labelled A to E, intermembrane space above and matrix below');
  add('etslet-mcq', mcq({
    stem: 'The figure shows the inner mitochondrial membrane, intermembrane space above and matrix below, with components A to E. Electrons from NADH enter the chain first. Which letter marks the complex that receives them?',
    right: 'B',
    wrong: ['A', 'C', 'D'],
    sol: 'Complex I, labelled B, is NADH dehydrogenase, the first component on the left of the electron path. D is complex III, E cytochrome c, A complex IV and C ATP synthase — option (@K).',
    assets: [lettered], d: 2, c: 'application', t: [2],
  }));
  add('etslet2-mcq', mcq({
    stem: 'In the same figure, which letter marks the complex that passes electrons to oxygen?',
    right: 'A',
    wrong: ['B', 'D', 'E'],
    sol: 'Complex IV (cytochrome c oxidase), labelled A, is the last in the electron path and passes electrons to oxygen — option (@K).',
    assets: [lettered], d: 3, c: 'application', t: [2],
  }));
  add('etslet3-mcq', mcq({
    stem: 'In the same figure, which letter marks the structure through which protons flow back to the matrix while ATP is made?',
    right: 'C',
    wrong: ['A', 'B', 'D'],
    sol: 'ATP synthase, labelled C, with its channel in the membrane and knob in the matrix, makes ATP as protons flow through it — option (@K).',
    assets: [lettered], d: 2, c: 'application', t: [2],
  }));
}
add('oxygen-ar', ar({
  a: 'The Krebs cycle stops when a cell is deprived of oxygen, although oxygen is not used in any step of the cycle.',
  r: 'Without oxygen the electron transport system cannot regenerate NAD⁺ and FAD from NADH and FADH₂.',
  key: 'a',
  sol: 'Both statements are true, and R explains A: the cycle depends on NAD⁺ and FAD, which only the working electron transport system regenerates — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('cristae-ar', ar({
  a: 'Mitochondria of cells with a high demand for ATP have many cristae.',
  r: 'Cristae are folds of the outer mitochondrial membrane.',
  key: 'c',
  sol: 'A is true. R is false: cristae are folds of the inner membrane, which increase the area carrying the ETS and ATP synthase — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('cycle-ar', ar({
  a: 'The Krebs cycle turns twice for each glucose that is oxidised.',
  r: 'Each glucose gives two acetyl CoA molecules, and each enters the cycle once.',
  key: 'a',
  sol: 'Both statements are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('krebs-tf', tf({
  stem: 'Oxygen is used directly in the Krebs cycle to oxidise acetyl CoA to CO₂.',
  key: 'f',
  sol: 'False. The Krebs cycle itself uses NAD⁺ and FAD to oxidise acetyl CoA; oxygen is used only at the end of the electron transport system.',
  d: 2, c: 'understanding', t: [2],
}));
add('oxidase-fill', fill({
  stem: 'The complex that passes electrons to oxygen is called cytochrome c ______.',
  acc: [['oxidase', 'oxidase (complex IV)']],
  sol: 'Cytochrome c oxidase (complex IV).',
  d: 1, c: 'recall', t: [2],
}));
add('ets-match', match({
  stem: 'Match each component of the electron transport system (column I) with its role (column II).',
  pairs: [
    ['Complex I', 'Receives electrons from NADH'],
    ['Complex II', 'Receives electrons from FADH₂'],
    ['Complex IV', 'Passes electrons to oxygen'],
    ['ATP synthase', 'Makes ATP as protons flow through it'],
  ],
  order: [3, 0, 2, 1],
  sol: 'Complex I takes electrons from NADH; complex II from FADH₂; complex IV gives them to oxygen; ATP synthase makes ATP from the proton flow.',
  d: 2, c: 'recall', t: [2],
}));
add('link4-num', num({
  stem: 'The link reaction releases one CO₂ for each pyruvic acid. How many CO₂ molecules are released in the link reaction when 4 glucose molecules are oxidised?',
  value: N.link4,
  sol: r`Each glucose gives 2 pyruvic acid, so $4 \times 2 = 8$ pyruvic acid and $8$ CO$_2$ (that is $4 \times ${LINK.co2}$).`,
  scheme: [[`${N.link4} CO₂`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 4 * LINK.co2 || 'value');
add('tca3-num', num({
  stem: 'How many NADH molecules are made in the Krebs cycle itself (not counting the link reaction) when 3 glucose molecules are completely oxidised?',
  value: N.tca3nadh,
  sol: r`Each glucose gives 2 acetyl CoA, each giving ${TCA.nadh} NADH: $3 \times 2 \times ${TCA.nadh} = ${N.tca3nadh}$.`,
  scheme: [[`${N.tca3nadh} NADH`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 18 || 'value');
add('nadh7-num', num({
  stem: `Using the textbook convention of ${CONV.nadh} ATP per NADH, how many ATP are made when 7 NADH molecules are oxidised in the electron transport system?`,
  value: N.atpNadh7,
  sol: r`$7 \times ${CONV.nadh} = ${N.atpNadh7}$ ATP.`,
  scheme: [[`${N.atpNadh7} ATP`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 21 || 'value');
add('fadh5-num', num({
  stem: `A cell oxidises 5 FADH₂ in the electron transport system. At ${CONV.fadh2} ATP per FADH₂ (textbook convention), how many ATP are made?`,
  value: N.fadh2_5,
  sol: r`$5 \times ${CONV.fadh2} = ${N.fadh2_5}$ ATP.`,
  scheme: [[`${N.fadh2_5} ATP`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 10 || 'value');
add('oxid-num', num({
  stem: `The electron transport system of a mitochondrion oxidises ${N.oxid.nadh} NADH and ${N.oxid.fadh2} FADH₂. Using ${CONV.nadh} ATP per NADH and ${CONV.fadh2} per FADH₂, how many ATP are made?`,
  value: N.atpOxid,
  sol: r`$${N.oxid.nadh} \times ${CONV.nadh} = ${N.oxid.nadh * CONV.nadh}$ and $${N.oxid.fadh2} \times ${CONV.fadh2} = ${N.oxid.fadh2 * CONV.fadh2}$, so $${N.oxid.nadh * CONV.nadh} + ${N.oxid.fadh2 * CONV.fadh2} = ${N.atpOxid}$ ATP.`,
  scheme: [['Both products', 0.5], [`${N.atpOxid} ATP`, 0.5]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === atpFrom(12, 8) || 'value');
add('link-short', short({
  marks: 2,
  stem: 'Write the equation of the link reaction in words and state where it takes place.',
  model: '**Pyruvic acid + coenzyme A + NAD⁺ → acetyl CoA + CO₂ + NADH**. It is an oxidative decarboxylation catalysed by **pyruvate dehydrogenase**, and takes place in the **matrix of the mitochondrion**, after pyruvic acid has entered from the cytoplasm.',
  sol: 'Equation and site.',
  scheme: [['Equation', 1], ['Matrix of the mitochondrion', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('tca-short', short({
  marks: 2,
  stem: 'State the products of one turn of the Krebs cycle and say where in the mitochondrion it occurs.',
  model: `One turn, from one acetyl CoA, gives **${TCA.nadh} NADH, ${TCA.fadh2} FADH₂, ${TCA.atp} ATP** (through GTP, by substrate-level phosphorylation) and **${TCA.co2} CO₂**. The cycle occurs in the **mitochondrial matrix**.`,
  sol: 'Products per turn; matrix.',
  scheme: [['NADH, FADH₂, ATP and CO₂ counts', 1.5], ['Matrix', 0.5]],
  d: 1, c: 'recall', t: [2],
}));
add('complexes-short', short({
  marks: 2,
  stem: 'Name the complexes of the electron transport system that receive electrons from NADH and from FADH₂, and the final acceptor of the electrons.',
  model: '**Complex I (NADH dehydrogenase)** receives electrons from **NADH**, and **complex II (succinate dehydrogenase)** from **FADH₂**. Both pass them to ubiquinone and on through complex III, cytochrome c and complex IV. The final acceptor is **oxygen**, which forms **water**.',
  sol: 'Complex I, complex II, oxygen.',
  scheme: [['Complex I with NADH; complex II with FADH₂', 1], ['Oxygen as final acceptor, giving water', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('ets-short3', short({
  marks: 3,
  stem: 'Trace the path of electrons from NADH to oxygen in the electron transport system, naming the carriers in order.',
  model: 'NADH gives electrons to **complex I (NADH dehydrogenase)**, which passes them to **ubiquinone**. From ubiquinone they go to **complex III (cytochrome bc₁)**, then to the small carrier **cytochrome c**, then to **complex IV (cytochrome c oxidase)**. Complex IV passes them to **oxygen**, which combines with protons to give **water**. Electrons from FADH₂ join at complex II.',
  sol: 'Order of carriers to oxygen.',
  scheme: [['Complex I then ubiquinone', 1], ['Complex III, cytochrome c, complex IV', 1], ['Oxygen forms water; FADH₂ at complex II', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('oxphos-short3', short({
  marks: 3,
  stem: 'Explain how ATP is made by oxidative phosphorylation in the mitochondrion, naming the parts of ATP synthase.',
  model: 'As electrons pass along the chain, complexes I, III and IV **pump protons from the matrix into the intermembrane space**, producing a **proton gradient** across the inner membrane. Protons flow back through the **F₀ channel** of **ATP synthase**. The energy released changes the shape of the **F₁ knob**, which makes **ATP** from ADP and phosphate.',
  sol: 'Proton gradient; F0 and F1; ATP.',
  scheme: [['Protons pumped; gradient', 1], ['Flow through F₀', 1], ['F₁ changes shape and makes ATP', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('aerobic-long', long({
  stem: 'Describe aerobic respiration after glycolysis: the link reaction, the Krebs cycle and the electron transport system, with their sites and the products of each.',
  model: `After glycolysis, pyruvic acid enters the **mitochondrial matrix**.\n\n**Link reaction:** pyruvic acid + CoA + NAD⁺ → **acetyl CoA + CO₂ + NADH**.\n\n**Krebs cycle (matrix):** acetyl CoA (2C) joins **oxaloacetic acid** (4C) to form **citric acid** (6C). Two oxidative decarboxylations (via α-ketoglutaric acid and succinyl CoA) release **CO₂ and NADH**; ATP is made at the succinyl CoA step, **FADH₂** at the succinic acid step, and NADH again as malic acid gives oxaloacetic acid. Per acetyl CoA: **${TCA.nadh} NADH, ${TCA.fadh2} FADH₂, ${TCA.atp} ATP, ${TCA.co2} CO₂**; the cycle turns twice per glucose.\n\n**Electron transport system (inner membrane):** NADH and FADH₂ pass electrons through complexes I to IV to **oxygen**, forming **water**; protons pumped into the intermembrane space drive **ATP synthase** to make **ATP**.`,
  sol: 'Link reaction, Krebs cycle, ETS.',
  scheme: [['Link reaction', 1], ['Krebs cycle steps and products', 2], ['Electron transport and ATP synthase', 2]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('ets-long', long({
  stem: 'Describe the electron transport system and the way in which it leads to the synthesis of ATP. Explain why the system stops when oxygen is absent.',
  model: 'The **electron transport system** lies in the **inner mitochondrial membrane**. **Complex I (NADH dehydrogenase)** receives electrons from **NADH** and **complex II (succinate dehydrogenase)** from **FADH₂**; both pass them to **ubiquinone**, then to **complex III (cytochrome bc₁)**, **cytochrome c** and **complex IV (cytochrome c oxidase)**, and finally to **oxygen**, forming **water**.\n\nComplexes I, III and IV **pump protons** from the matrix into the intermembrane space, making a **proton gradient**. Protons flow back through the **F₀ channel** of **ATP synthase**, and the **F₁ knob** makes **ATP** (oxidative phosphorylation).\n\nOxygen is the **final acceptor**. Without it the chain is blocked, NADH and FADH₂ cannot be reoxidised, no gradient forms and **NAD⁺ and FAD run short**, so the Krebs cycle also stops.',
  sol: 'ETS path; chemiosmosis; role of oxygen.',
  scheme: [['Complexes and path of electrons', 1.5], ['Proton pumping and ATP synthase', 2], ['Oxygen as final acceptor; effect of its absence', 1.5]],
  wl: [80, 240],
  d: 3, c: 'analysis', t: [2],
}));
{
  add('ets-case', mk.case({
    passage: `A biochemist studies isolated mitochondria supplied with pyruvic acid and oxygen. She measures oxygen uptake and ATP formation. When she adds a poison that blocks complex IV, oxygen uptake and ATP formation both stop within a minute. In a second experiment she supplies the mitochondria with succinic acid, and finds that they still make ATP, although less ATP per oxygen atom used than with pyruvic acid.`,
    d: 4, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Why does oxygen uptake stop when complex IV is blocked?',
        right: 'Complex IV is the complex that passes electrons to oxygen.',
        wrong: ['Complex IV pumps oxygen into the matrix.', 'Complex IV makes ATP from oxygen.', 'Complex IV splits oxygen into two atoms before use.'],
        sol: 'Complex IV (cytochrome c oxidase) transfers electrons to O₂; with it blocked, oxygen is not reduced to water — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('b', num({
        stem: `In one experiment the mitochondria oxidise ${4} NADH and ${2} FADH₂ in the electron transport system. How many ATP are made by the electron transport system? (${CONV.nadh} ATP per NADH, ${CONV.fadh2} per FADH₂.)`,
        value: N.ets42,
        sol: r`$4 \times ${CONV.nadh} = 12$ and $2 \times ${CONV.fadh2} = 4$, so $12 + 4 = ${N.ets42}$ ATP.`,
        scheme: [['Both products', 0.5], [`${N.ets42} ATP`, 0.5]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why succinic acid gives less ATP per oxygen atom used than pyruvic acid does.',
        model: 'Succinic acid is oxidised by **succinate dehydrogenase (complex II)**, which yields **FADH₂** and passes electrons to ubiquinone, **bypassing complex I**. Fewer protons are pumped, so **less ATP** is made per oxygen atom than when **NADH** feeds complex I.',
        sol: 'FADH2 bypasses complex I; fewer protons pumped.',
        scheme: [['Succinic acid gives FADH₂ at complex II', 1], ['Bypasses complex I; less proton pumping and ATP', 1]],
        d: 4, c: 'analysis', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Why would the Krebs cycle in these mitochondria also stop when complex IV is blocked?',
          model: 'With complex IV blocked, electrons cannot reach oxygen, so **NADH and FADH₂ are not reoxidised**. **NAD⁺ and FAD run out**, and the Krebs cycle, which needs them to oxidise its intermediates, **slows and stops**.',
          sol: 'NAD+ and FAD not regenerated.',
          scheme: [['NADH and FADH₂ not reoxidised', 1], ['NAD⁺ and FAD run out; cycle stops', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 16 || 'value');
}

// ---------------------------------------------------------------- t03 energy relations, respiratory quotient, amphibolic pathway
add('atp-mcq', mcq({
  stem: `One glucose is completely oxidised. By the textbook convention (${CONV.nadh} ATP per NADH, ${CONV.fadh2} per FADH₂), how many ATP does the electron transport system make from the NADH and FADH₂ of the whole process?`,
  right: String(N.etsAtp),
  wrong: [String(N.total), '30', '4'],
  sol: `There are ${10} NADH and ${2} FADH₂ in all: ${10} × ${CONV.nadh} + ${2} × ${CONV.fadh2} = ${N.etsAtp} ATP from the ETS; the other 4 come from substrate-level phosphorylation, giving ${N.total} in all — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => N.etsAtp === 34 || 'value');
add('rq-mcq', mcq({
  stem: 'The respiratory quotient of fats is lower than that of carbohydrates because',
  right: 'fat molecules contain less oxygen than carbohydrates, so more oxygen is taken up for each CO₂ released',
  wrong: ['fats are respired without oxygen', 'fats release more CO₂ than the oxygen they use', 'fats are converted to carbohydrate before respiration'],
  sol: 'Fats are poor in oxygen, so a large volume of O₂ is used per volume of CO₂ released, and RQ is about 0.7 — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('o2use-mcq', mcq({
  stem: 'When one glucose molecule is completely oxidised in aerobic respiration, how many oxygen molecules are used and how many CO₂ molecules released?',
  right: '6 O₂ used and 6 CO₂ released',
  wrong: ['2 O₂ used and 6 CO₂ released', '6 O₂ used and 2 CO₂ released', '12 O₂ used and 6 CO₂ released'],
  sol: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O, so the volumes are equal and RQ is 1 — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => N.co2g18 !== undefined || 'x');
add('infinite-mcq', mcq({
  stem: 'Yeast ferments glucose in a sealed flask. The RQ of its respiration is',
  right: 'infinite, because CO₂ is evolved but no O₂ is consumed',
  wrong: ['exactly 1', 'about 0.7', 'zero, because no CO₂ is evolved'],
  sol: 'In anaerobic respiration CO₂ is released but no oxygen is used, so CO₂ ÷ O₂ is infinite — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('rqcarb-mcq', mcq({
  stem: 'A respirometer shows that a batch of germinating seeds takes up 60 mL of O₂ and releases 60 mL of CO₂. The main substrate being respired is probably',
  right: 'carbohydrate',
  wrong: ['fat', 'protein', 'an organic acid'],
  sol: 'RQ = 60 ÷ 60 = 1, the value for carbohydrates; fats give about 0.7, proteins about 0.9 and organic acids more than 1 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('fatentry-mcq', mcq({
  stem: 'When a fat is used as a respiratory substrate, which statement describes how it enters the pathway?',
  right: 'Glycerol enters as PGAL, and fatty acids enter as acetyl CoA.',
  wrong: ['Fatty acids enter as pyruvic acid, and glycerol as acetyl CoA.', 'Glycerol enters as oxaloacetic acid, and fatty acids as PGAL.', 'The whole fat molecule enters glycolysis as glucose.'],
  sol: 'Fats are broken into glycerol, which enters as PGAL, and fatty acids, which are degraded to acetyl CoA — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('convention-mcq', mcq({
  stem: 'Which of the following is not an assumption behind the textbook figure of 38 ATP per glucose?',
  right: 'Some Krebs cycle intermediates are drawn off to make amino acids and fatty acids.',
  wrong: ['The pathway is sequential and orderly.', 'NADH made in glycolysis enters the mitochondria and is oxidised there.', 'Only glucose is respired.'],
  sol: 'The calculation assumes that no intermediates are used for other compounds; in a living cell they often are, so 38 is a theoretical maximum — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('eff-mcq', mcq({
  stem: `Complete oxidation of a mole of glucose releases about ${GLUCOSE_KJ} kJ, and a mole of ATP traps about ${ATP_KJ} kJ. With 38 ATP per glucose, about what share of the energy is trapped in ATP?`,
  right: `${Math.round(N.effAero)} percent`,
  wrong: ['7 percent', '70 percent', '100 percent'],
  sol: `38 × ${ATP_KJ} = ${N.kjAero} kJ out of ${GLUCOSE_KJ} kJ is about ${N.effAero} percent, the rest being lost as heat — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => Math.round(N.effAero) === 40 || 'eff');
add('newconv-mcq', mcq({
  stem: 'Newer measurements give about 2.5 ATP per NADH and 1.5 ATP per FADH₂. With these values, and 4 ATP by substrate-level phosphorylation, the total from one glucose is about',
  right: String(N.totalNew),
  wrong: [String(N.total), '24', '40'],
  sol: `${10} × 2.5 + ${2} × 1.5 + 4 = 25 + 3 + 4 = ${N.totalNew} ATP — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => N.totalNew === 32 || 'value');
add('proteinentry-mcq', mcq({
  stem: 'Before the amino acids of a protein can enter the Krebs cycle as respiratory substrates, they must first',
  right: 'lose their amino group (be deaminated)',
  wrong: ['be converted to glucose by photosynthesis', 'be oxidised to CO₂ in the cytoplasm', 'be joined with fatty acids'],
  sol: 'Amino acids are deaminated and the remaining carbon skeletons enter the respiratory pathway, for example at the Krebs cycle — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('rq-ar', ar({
  a: 'The respiratory quotient of a fat such as tripalmitin is about 0.7.',
  r: 'Fats contain more oxygen than carbohydrates.',
  key: 'c',
  sol: 'A is true: 102 CO₂ ÷ 145 O₂ ≈ 0.7. R is false: fats contain less oxygen than carbohydrates, which is why they need more oxygen to be oxidised — option (c).',
  d: 3, c: 'understanding', t: [3],
}));
add('eff-ar', ar({
  a: 'Fermentation traps a larger share of the energy of glucose in ATP than aerobic respiration does.',
  r: 'Fermentation gives a net of 2 ATP per glucose, whereas aerobic respiration gives 38 by the textbook convention.',
  key: 'd',
  sol: 'A is false: fermentation traps only about 2 percent, against about 40 percent in aerobic respiration. R is true — option (d).',
  d: 3, c: 'understanding', t: [3],
}));
add('amph-ar', ar({
  a: 'Respiration is called an amphibolic pathway.',
  r: 'The complete respiration of glucose releases carbon dioxide and water.',
  key: 'b',
  sol: 'Both statements are true, but R does not explain A: the pathway is amphibolic because it both breaks substances down and supplies intermediates for synthesis — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('rq-tf', tf({
  stem: 'The respiratory quotient of fats is greater than that of carbohydrates.',
  key: 'f',
  sol: 'False. Carbohydrates have an RQ of 1; fats about 0.7, because they are poorer in oxygen.',
  d: 1, c: 'recall', t: [3],
}));
add('rq-fill', fill({
  stem: 'The respiratory quotient when glucose is completely oxidised in aerobic respiration is ______.',
  acc: [['1', 'one', '1.0', 'unity']],
  sol: 'RQ = 6 CO₂ ÷ 6 O₂ = 1.',
  d: 1, c: 'recall', t: [3],
}));
add('rq-match', match({
  stem: 'Match each substrate or condition (column I) with its respiratory quotient (column II).',
  pairs: [
    ['Carbohydrate (glucose)', '1'],
    ['Fat (tripalmitin)', 'About 0.7'],
    ['Protein', 'About 0.9'],
    ['Anaerobic respiration', 'Infinite (no O₂ consumed)'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Glucose 1; tripalmitin about 0.7; protein about 0.9; anaerobic respiration infinite because no oxygen is used.',
  d: 1, c: 'recall', t: [3],
}));
add('eff-num', num({
  stem: `Taking 38 ATP per glucose, ${ATP_KJ} kJ per mole of ATP and ${GLUCOSE_KJ} kJ per mole of glucose, what percentage of the energy of glucose is trapped in ATP? (One decimal place.)`,
  value: N.effAero, tol: 0.1, unit: 'percent',
  sol: r`Energy trapped $= 38 \times ${ATP_KJ} = ${N.kjAero}$ kJ; $\dfrac{${N.kjAero}}{${GLUCOSE_KJ}} \times 100 = ${N.effAero}$ percent.`,
  scheme: [[`${N.kjAero} kJ`, 0.5], [`${N.effAero} percent`, 0.5]],
  d: 2, c: 'application', t: [3],
}), (q) => efficiency(38) === 40.4 || 'value');
add('atp2mol-num', num({
  stem: 'How many moles of ATP are formed when 2 mol of glucose are completely oxidised in aerobic respiration (textbook convention)?',
  value: N.aero2mol,
  sol: r`$2 \times ${N.total} = ${N.aero2mol}$ mol of ATP.`,
  scheme: [[`${N.aero2mol} mol`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 76 || 'value');
add('co2g-num', num({
  stem: 'Glucose (180 g per mole) is completely oxidised: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O. What mass of CO₂ (44 g per mole), in g, is released when 18 g of glucose is oxidised?',
  value: N.co2g18, unit: 'g', tol: 0.05,
  sol: r`$\dfrac{18}{180} = 0.1$ mol glucose gives $0.6$ mol CO$_2$, which is $0.6 \times 44 = ${N.co2g18}$ g.`,
  scheme: [['0.1 mol; 0.6 mol CO₂', 0.5], [`${N.co2g18} g`, 0.5]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === co2Aero(18) || 'value');
add('o2g-num', num({
  stem: 'In the same oxidation of 18 g of glucose, what mass of oxygen (32 g per mole), in g, is used?',
  value: N.o2g18, unit: 'g', tol: 0.05,
  sol: r`$0.1$ mol glucose needs $0.6$ mol of O$_2$, which is $0.6 \times 32 = ${N.o2g18}$ g.`,
  scheme: [[`${N.o2g18} g`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === o2Aero(18) || 'value');
add('rqfat-num', num({
  stem: 'Tripalmitin respires as 2 C₅₁H₉₈O₆ + 145 O₂ → 102 CO₂ + 98 H₂O. Calculate its respiratory quotient to one decimal place.',
  value: 0.7, tol: 0.05,
  sol: r`$\text{RQ} = \dfrac{102}{145} = ${N.rqFatPerO2}$, about $0.7$.`,
  scheme: [['CO₂ ÷ O₂', 0.5], ['About 0.7', 0.5]],
  d: 2, c: 'application', t: [3],
}), (q) => EQN.tripalmitin.co2 / EQN.tripalmitin.o2 > 0.69 && EQN.tripalmitin.co2 / EQN.tripalmitin.o2 < 0.71 || 'value');
add('rqmixed-num', num({
  stem: 'A tissue respires two substrates at once. One uses 45 mL of O₂ and releases 45 mL of CO₂; the other uses 30 mL of O₂ and releases 21 mL of CO₂. What is the overall RQ of the tissue?',
  value: N.mixed2, tol: 0.01,
  sol: r`Total CO$_2 = 45 + 21 = 66$ mL; total O$_2 = 45 + 30 = 75$ mL; $\text{RQ} = \dfrac{66}{75} = ${N.mixed2}$.`,
  scheme: [['Totals 66 mL and 75 mL', 0.5], [`RQ = ${N.mixed2}`, 0.5]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 0.88 || 'value');
add('rqacid-num', num({
  stem: 'Oxalic acid respires as 2 C₂H₂O₄ + O₂ → 4 CO₂ + 2 H₂O. What is its respiratory quotient?',
  value: N.oxalicRq,
  sol: r`$\text{RQ} = \dfrac{4}{1} = ${N.oxalicRq}$, well above 1 because the acid is rich in oxygen.`,
  scheme: [[`RQ = ${N.oxalicRq}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 4 || 'value');
add('amph-short', short({
  marks: 2,
  stem: 'Why is the respiratory pathway described as amphibolic? Give one catabolic and one anabolic role.',
  model: 'The pathway is **catabolic**, since it **breaks down substrates** such as glucose, fats and proteins to release energy. It is also **anabolic**, since its **intermediates are drawn off to build** other compounds, for example **acetyl CoA is used to make fatty acids**. Having both roles, it is called **amphibolic**.',
  sol: 'Catabolic and anabolic roles.',
  scheme: [['Catabolic role with substrate example', 1], ['Anabolic role with intermediate example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('rq-short', short({
  marks: 2,
  stem: 'Define respiratory quotient and give its value for carbohydrates and for fats.',
  model: 'The **respiratory quotient** is the **ratio of the volume of CO₂ evolved to the volume of O₂ consumed** in respiration. It is **1** for **carbohydrates** and about **0.7** for **fats**, because fats contain less oxygen.',
  sol: 'Definition and values.',
  scheme: [['Definition', 1], ['Values for carbohydrate and fat', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('convention-short3', short({
  marks: 3,
  stem: 'State the ATP convention used to total the ATP from one glucose, give the total, and name two assumptions behind it.',
  model: `The textbook counts **${CONV.nadh} ATP per NADH** and **${CONV.fadh2} ATP per FADH₂**; with 4 ATP by substrate-level phosphorylation, one glucose gives **${N.total} ATP**. This assumes that the pathway is **sequential and orderly**, that **no intermediates are used** for other compounds, that **only glucose is respired**, and that NADH from glycolysis enters the mitochondria. It is a **theoretical maximum**.`,
  sol: 'Convention, total, assumptions.',
  scheme: [['3 ATP per NADH, 2 per FADH₂', 1], [`Total ${N.total} ATP`, 1], ['Two assumptions', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('rq-short3', short({
  marks: 3,
  stem: 'Explain why the respiratory quotient of a fat such as tripalmitin is about 0.7 while that of glucose is 1, using the equations.',
  model: 'For glucose, **C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O**, equal volumes are used and released, so RQ = **6 ÷ 6 = 1**. For tripalmitin, **2 C₅₁H₉₈O₆ + 145 O₂ → 102 CO₂ + 98 H₂O**, RQ = **102 ÷ 145 ≈ 0.7**. The fat has **much less oxygen** in its molecule, so **more O₂ must be taken in** to oxidise its carbon and hydrogen, and the quotient is lower.',
  sol: 'RQ from both equations; fats are oxygen-poor.',
  scheme: [['Glucose RQ = 1', 1], ['Tripalmitin RQ about 0.7', 1], ['Fats poor in oxygen, so more O₂ needed', 1]],
  d: 3, c: 'application', t: [3],
}));
add('fatprotein-short3', short({
  marks: 3,
  stem: 'Explain how fats and proteins are brought into the respiratory pathway when carbohydrate is scarce.',
  model: '**Fats** are broken into **glycerol and fatty acids**: glycerol enters as **PGAL** in glycolysis, and the fatty acids are broken down to **acetyl CoA**, which enters the Krebs cycle. **Proteins** are broken into **amino acids**, which are **deaminated**, and the carbon skeletons enter the pathway, for example at the Krebs cycle. Thus the pathway is a **common route** for all three substrates.',
  sol: 'Entry points of fats and proteins.',
  scheme: [['Glycerol to PGAL; fatty acids to acetyl CoA', 1.5], ['Amino acids deaminated; enter the Krebs cycle', 1], ['Common pathway', 0.5]],
  d: 2, c: 'understanding', t: [3],
}));
add('energy-long', long({
  stem: 'Compare aerobic respiration and fermentation in a table of five features, with the ATP balance sheet of aerobic respiration for one glucose and the energy efficiency of each.',
  model: `| Feature | Aerobic respiration | Fermentation |\n|---|---|---|\n| Oxygen | Needed | Not needed |\n| Site | Cytoplasm, then mitochondria | Cytoplasm |\n| End products | CO₂ and water | Ethanol and CO₂, or lactic acid |\n| ATP per glucose | ${N.total} | ${GLYC.netAtp} |\n| Energy trapped | about ${N.effAero} percent | about ${N.effFerm} percent |\n\n**Balance sheet** (${CONV.nadh} ATP per NADH, ${CONV.fadh2} per FADH₂): glycolysis ${GLYC.netAtp} ATP + ${GLYC.nadh} NADH (6) = **8**; link reaction ${LINK.nadh} NADH = **6**; Krebs cycle 2 ATP + 6 NADH (18) + 2 FADH₂ (4) = **24**; total **${N.total}**. Energy: ${N.total} × ${ATP_KJ} = ${N.kjAero} kJ out of ${GLUCOSE_KJ} kJ, about ${N.effAero} percent; fermentation traps about ${N.kjFerm} kJ, about ${N.effFerm} percent.`,
  sol: 'Table of five features, balance sheet, efficiency.',
  scheme: [['Five features', 2], ['Balance sheet to 38', 2], ['Efficiency of both', 1]],
  wl: [60, 240],
  d: 3, c: 'analysis', t: [3],
}));
add('rq-long', long({
  stem: 'Define respiratory quotient. Calculate it for glucose and tripalmitin from their equations, state the values for protein and for organic acids, and explain what happens in anaerobic respiration.',
  model: 'The **respiratory quotient (RQ)** is the **volume of CO₂ evolved divided by the volume of O₂ consumed**.\n\n**Glucose:** C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O, so RQ = 6 ÷ 6 = **1** (carbohydrates).\n\n**Tripalmitin (a fat):** 2 C₅₁H₉₈O₆ + 145 O₂ → 102 CO₂ + 98 H₂O, so RQ = 102 ÷ 145 ≈ **0.7**; fats contain less oxygen and need more of it.\n\n**Protein:** about **0.9**. **Organic acids**, which are rich in oxygen, give values **above 1** (for example malic acid, 4 ÷ 3 ≈ 1.33).\n\n**Anaerobic respiration:** CO₂ is evolved but **no oxygen is used**, so the RQ is **infinite**. A measured RQ therefore shows which substrate is being respired.',
  sol: 'Definition, two calculations, protein and acids, anaerobic.',
  scheme: [['Definition', 1], ['Glucose and tripalmitin calculations', 2], ['Protein and organic acids', 1], ['Anaerobic respiration', 1]],
  wl: [80, 240],
  d: 3, c: 'application', t: [3],
}));
{
  const S3 = N.seedCase;
  add('seed-case', mk.case({
    passage: `A student sets up three respirometers, each with a different batch of germinating seeds, and measures the oxygen used and carbon dioxide released in one hour.\n\n| Batch | Oxygen used (mL) | Carbon dioxide released (mL) |\n|---|---|---|\n| P | ${S3.P.o2} | ${S3.P.co2} |\n| Q | ${S3.Q.o2} | ${S3.Q.co2} |\n| R | ${S3.R.o2} | ${S3.R.co2} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which batch is most probably respiring fat as its main substrate?',
        right: 'Batch Q',
        wrong: ['Batch P', 'Batch R', 'None of them'],
        sol: `RQ of Q = ${S3.Q.co2} ÷ ${S3.Q.o2} = ${N.seedCaseRq.Q}, the value for fat, while P gives ${N.seedCaseRq.P} and R gives ${N.seedCaseRq.R} — option (@K).`,
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'Calculate the respiratory quotient of batch R.',
        value: N.seedCaseRq.R, tol: 0.01,
        sol: r`$\text{RQ} = \dfrac{${S3.R.co2}}{${S3.R.o2}} = ${N.seedCaseRq.R}$.`,
        scheme: [[`RQ = ${N.seedCaseRq.R}`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'State the substrate suggested for batch R and say why its quotient lies between those of the other two batches.',
        model: 'The RQ of batch R is about **0.9**, the value for **protein**. It lies **between** batch Q (about 0.7, fat) and batch P (1, carbohydrate) because **protein molecules contain more oxygen than fats but less than carbohydrates**, so the volume of O₂ used per CO₂ released is intermediate.',
        sol: 'Protein; intermediate oxygen content.',
        scheme: [['Protein, RQ about 0.9', 1], ['Intermediate oxygen content explains position', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'If the seeds of batch P were kept without oxygen, what would the respirometer show about CO₂ and what would the RQ be?',
          model: 'Without oxygen the seeds would respire **anaerobically**, by fermentation. **CO₂ would still be released**, as in alcoholic fermentation, but **no O₂ would be used**, so the respiratory quotient would be **infinite**.',
          sol: 'CO2 released, no oxygen; RQ infinite.',
          scheme: [['Fermentation still releases CO₂', 1], ['No O₂ used, so RQ infinite', 1]],
          d: 3, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 0.9 || 'value');
}
