// ISC 11 Biology ch13 Photosynthesis in Higher Plants — Part 1 (t01–t02), Part 2 (t03–t06).
import { sl, deck, table, flow, svgV, chem, plot, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { CHLORO, SPECTRA, ENGELMANN, ZSCHEME, CHEMIO, CALVIN_SVG, C4_SVG, KRANZ } from './svgs.mjs';
import { GLU, GLU4, GLU_WATER, o2FromWater, GRAD, GRAD_FOLD, CARB6, PR, PR_LOSS, LIM, rate, plateauAt, limiting, ENG, ENG_TOTAL, LEAF_CO2, LEAF_GLU, LEAF_O2, C4_VS_C3 } from './calc.mjs';

export const V = {
  chloro: svgV(CHLORO, 'Labelled chloroplast with grana, stroma lamellae and stroma'),
  spectra: svgV(SPECTRA, 'Absorption spectra of chlorophyll a, chlorophyll b and carotenoids and the action spectrum of photosynthesis'),
  engelmann: svgV(ENGELMANN, 'Engelmann experiment: bacteria gather at violet-blue and red light on an algal filament'),
  z: svgV(ZSCHEME, 'Z-scheme of non-cyclic photophosphorylation with the cyclic loop'),
  chemio: svgV(CHEMIO, 'Chemiosmosis across the thylakoid membrane'),
  calvin: svgV(CALVIN_SVG, 'Calvin cycle for three turns: carboxylation, reduction and regeneration'),
  c4: svgV(C4_SVG, 'C4 pathway across mesophyll and bundle sheath cells'),
  kranz: svgV(KRANZ, 'Kranz anatomy: wreath of bundle sheath cells around a vascular bundle'),
  blackman: plot(
    {
      x: { min: 0, max: 100, label: 'Light intensity (klux)' },
      y: { min: 0, max: 50, label: 'Rate of photosynthesis (arbitrary units)' },
      series: [
        { label: 'Low carbon dioxide', points: [[0, 0], [plateauAt(LIM.capLow), LIM.capLow], [100, LIM.capLow]], kind: 'line' },
        { label: 'High carbon dioxide', points: [[0, 0], [plateauAt(LIM.capHigh), LIM.capHigh], [100, LIM.capHigh]], kind: 'line' },
      ],
    },
    'Rate of photosynthesis against light intensity at two carbon dioxide levels: each curve rises and then flattens, the higher carbon dioxide curve flattening at a higher rate',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Photosynthesis in Higher Plants — Part 1: Pigments and the photochemical phase',
  goals: [
    'Describe the chloroplast, the pigments of photosynthesis, absorption and action spectra and Engelmann’s experiment',
    'Draw the Z-scheme and compare cyclic with non-cyclic photophosphorylation',
    'Explain ATP synthesis in the chloroplast by Mitchell’s chemiosmotic hypothesis',
  ],
  slides: [
    sl('title', 'Making food from light', {
      b: 'Part 1 — pigments, photosystems and how light energy becomes chemical energy.',
      v: flow('LR', [['l', 'Light'], ['p', 'Pigments'], ['a', 'ATP and NADPH'], ['c', 'Calvin cycle'], ['s', 'Sugar']], [['l', 'p'], ['p', 'a'], ['a', 'c'], ['c', 's']], 'Flow from light through pigments to ATP and NADPH, the Calvin cycle and sugar'),
      n: 'Green plants are autotrophs. They trap light energy with pigments, turn it into ATP and NADPH in the photochemical phase, and use these to build sugar in the biosynthetic phase.',
    }),
    sl('concept', 'Photosynthesis: an autotrophic way of feeding', {
      b: 'Photosynthesis is a **physico-chemical process**: green cells use light energy to build organic compounds from carbon dioxide and water, releasing **oxygen**. It is the basis of nearly all food on Earth.',
      v: chem('6CO2 + 12H2O ->[light][chlorophyll] C6H12O6 + 6O2 + 6H2O', 'Overall equation of photosynthesis with twelve water molecules used and six formed'),
      n: 'Using the full equation, twelve water molecules are used and six are formed again. Oxygen comes from water, not from carbon dioxide, and the glucose is built with the help of light and chlorophyll.',
    }),
    sl('diagram', 'Site of photosynthesis: the chloroplast', {
      b: 'In the leaf, photosynthesis goes on mainly in **mesophyll cells**, inside **chloroplasts**. The **grana** and stroma lamellae hold the pigments and the light reaction; the **stroma** holds the enzymes of the biosynthetic phase.',
      v: V.chloro,
      n: 'A chloroplast has a double membrane. Inside are stacks of flat thylakoid discs, the grana, joined by lamellae. Light is trapped on the thylakoid membranes, while sugar is made in the fluid stroma around them.',
    }),
    sl('concept', 'Pigments of photosynthesis', {
      b: '**Chlorophyll a** is the main pigment and the only one in reaction centres. The others are **accessory pigments** that pass energy on to it and protect it.',
      v: table(['Pigment', 'Colour on a chromatogram', 'Role'], [['Chlorophyll a', 'Bright or blue-green', 'Primary pigment; reaction centre'], ['Chlorophyll b', 'Yellow-green', 'Accessory; widens the range of light absorbed'], ['Xanthophylls', 'Yellow', 'Accessory; protect chlorophyll'], ['Carotenoids (carotenes)', 'Yellow to yellow-orange', 'Accessory; protect chlorophyll from photo-oxidation']], 'Table of the four kinds of photosynthetic pigment, their colours and roles'),
      n: 'Chlorophyll a does the real work of converting light energy. Chlorophyll b, xanthophylls and carotenoids pass captured energy to it, widen the range of colours used, and shield it from damage in bright light.',
    }),
    sl('diagram', 'Absorption spectrum and action spectrum', {
      b: 'An **absorption spectrum** plots how much light a pigment absorbs at each wavelength. An **action spectrum** plots the **rate of photosynthesis** at each wavelength. The action spectrum follows the combined absorption of the pigments.',
      v: V.spectra,
      n: 'Chlorophyll absorbs mainly violet-blue and red light and very little green. The action spectrum has peaks in the same regions. This shows that light absorbed by chlorophylls is the light that drives photosynthesis.',
    }),
    sl('diagram', 'Engelmann’s experiment', {
      b: 'Engelmann placed a filament of the green alga **Cladophora** with **aerobic bacteria** in a drop of water and lit it with a spectrum from a prism. Bacteria crowded where **oxygen release** was highest.',
      v: V.engelmann,
      n: 'Aerobic bacteria swim to where oxygen is plentiful. They gathered in the violet-blue and red regions and were few in the green region. So photosynthesis is fastest in blue and red light, matching the action spectrum.',
    }),
    sl('check', 'Quick check: Engelmann', {
      b: 'Why did Engelmann use aerobic bacteria?',
      n: 'Quick check. What did the bacteria show him about the alga?',
      chk: 'engel-check',
    }),
    sl('concept', 'Photosystems and light-harvesting complexes', {
      b: 'Pigments are organised into two **photosystems** in the thylakoid membrane. Each has a **light-harvesting complex (LHC)**, or antenna, of hundreds of pigment molecules that funnels energy to one special chlorophyll a, the **reaction centre**.',
      v: table(['Feature', 'Photosystem II', 'Photosystem I'], [['Reaction-centre chlorophyll a', 'P680 (absorbs best at 680 nm)', 'P700 (absorbs best at 700 nm)'], ['Main location', 'Grana thylakoids', 'Stroma lamellae and edges of grana'], ['Splits water?', 'Yes, with oxygen release', 'No'], ['Electron donor', 'Water', 'Plastocyanin']], 'Table comparing photosystem II and photosystem I'),
      n: 'Photosystem two has the reaction centre P six eighty and photosystem one has P seven hundred. The names give the wavelength of light, in nanometres, that each absorbs best. Only photosystem two splits water.',
    }),
    sl('diagram', 'The Z-scheme of non-cyclic photophosphorylation', {
      b: 'Light excites P680 and P700 in turn. Electrons flow from water through **PS II**, the **cytochrome b6-f complex** and **PS I** to **NADP⁺**. Energy released on the way to PS I makes **ATP**. The path is shaped like the letter Z.',
      v: V.z,
      n: 'Water is split to replace the electrons lost by photosystem two. Electrons fall down a chain to photosystem one, releasing energy for ATP. A second boost of light sends them on to ferredoxin and NADPH. Oxygen is released.',
    }),
    sl('example', 'Worked example 1: water and oxygen for one glucose', {
      b: `The Calvin cycle needs ${GLU.nadph} NADPH to make one glucose. Each NADPH takes 2 electrons, and each water gives 2 electrons. How many water molecules are split, and how many oxygen molecules are released?`,
      ul: [
        r`Electrons needed $= ${GLU.nadph} \times 2 = ${GLU.nadph * 2}$.`,
        r`Water split $= ${GLU.nadph * 2} \div 2 = ${GLU_WATER}$.`,
        r`Each oxygen molecule needs 2 water, so oxygen $= ${GLU_WATER} \div 2 = ${o2FromWater(GLU_WATER)}$.`,
      ],
      v: table(['Quantity (one glucose)', 'Number'], [['NADPH made', String(GLU.nadph)], ['Electrons from water', String(GLU.nadph * 2)], ['Water molecules split', String(GLU_WATER)], ['Oxygen molecules released', String(o2FromWater(GLU_WATER))]], `Worked table: ${GLU_WATER} water split, ${o2FromWater(GLU_WATER)} oxygen released`),
      n: 'Work backwards from NADPH. Twelve NADPH need twenty-four electrons. Each water gives two, so twelve waters are split, and every two waters give one oxygen molecule, so six oxygen molecules are released.',
    }),
    sl('concept', 'Cyclic and non-cyclic photophosphorylation', {
      b: 'Photophosphorylation is the making of **ATP using light energy**. The cell can use either path.',
      v: table(['Feature', 'Non-cyclic', 'Cyclic'], [['Photosystems used', 'PS II and PS I', 'PS I only'], ['Electron path', 'Water to NADP⁺ (one way)', 'Back to the cytochrome complex (a loop)'], ['Products', 'ATP, NADPH and oxygen', 'ATP only'], ['Water splitting', 'Yes', 'No'], ['Where', 'Grana', 'Stroma lamellae']], 'Table comparing cyclic and non-cyclic photophosphorylation'),
      n: 'In the cyclic path, electrons leaving photosystem one return to the chain instead of reaching NADP. So only ATP is made. No water is split, and no oxygen is released.',
    }),
    sl('check', 'Quick check: cyclic path', {
      b: 'Judge the statement about cyclic photophosphorylation.',
      n: 'Quick check. Does the cyclic path make NADPH?',
      chk: 'cyclic-check',
    }),
    sl('diagram', 'Chemiosmosis: how the chloroplast makes ATP', {
      b: '**Mitchell’s chemiosmotic hypothesis (1961):** ATP is made when **protons flow down a gradient** through ATP synthase. Protons build up in the **lumen** because water splits there, plastoquinone carries H⁺ inward, and NADP reductase removes H⁺ from the **stroma**.',
      v: V.chemio,
      n: 'Three things raise the proton level inside the thylakoid and lower it outside: splitting of water, the carrying of protons by plastoquinone, and the use of protons by the enzyme that makes NADPH. Protons then flow out through the ATP synthase and drive ATP formation.',
    }),
    sl('example', 'Worked example 2: size of the gradient', {
      b: `The lumen of an illuminated thylakoid has pH ${GRAD.lumen}; the stroma has pH ${GRAD.stroma}. By how many times is the H⁺ concentration higher in the lumen?`,
      ul: [
        r`pH difference $= ${GRAD.stroma} - ${GRAD.lumen} = ${GRAD.stroma - GRAD.lumen}$ units.`,
        r`Each pH unit is a tenfold change, so fold difference $= 10^{${GRAD.stroma - GRAD.lumen}} = ${GRAD_FOLD}$.`,
      ],
      v: table(['Compartment', 'pH', 'Relative H⁺'], [['Stroma', String(GRAD.stroma), '1'], ['Lumen', String(GRAD.lumen), String(GRAD_FOLD)]], `Worked table: lumen has ${GRAD_FOLD} times more H⁺`),
      n: 'Each unit of pH is a tenfold change in proton concentration. A difference of two units therefore means the lumen holds one hundred times more protons than the stroma. This gradient stores the energy used to make ATP.',
    }),
    sl('check', 'Quick check: proton gradient', {
      b: 'Find the fold difference in H⁺ between two compartments.',
      n: 'Quick check. Use the rule that each pH unit is a tenfold change.',
      chk: 'gradient-check',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Chlorophyll a is the primary pigment; chlorophyll b, xanthophylls and carotenoids are accessory pigments.',
        'Action spectrum follows absorption (violet-blue and red); Engelmann’s bacteria showed this.',
        'PS II (P680) splits water; PS I (P700) makes NADPH; the Z-scheme links them.',
        'Cyclic: PS I only, ATP only. Non-cyclic: ATP, NADPH and oxygen.',
        `Mitchell’s chemiosmosis: gradient (lumen high H⁺) drives ATP synthase; one glucose needs ${GLU_WATER} water split.`,
      ],
      v: table(['Phase', 'Products'], [['Non-cyclic', 'ATP, NADPH, oxygen'], ['Cyclic', 'ATP']], 'Summary table of the products of the two kinds of photophosphorylation'),
      n: 'To recap: pigments capture light, two photosystems pass electrons along the Z-scheme, and a proton gradient across the thylakoid membrane drives ATP synthesis. The non-cyclic path gives ATP, NADPH and oxygen; the cyclic path gives only ATP.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **Z-scheme** with P680, P700, water, ATP and NADPH labelled.',
        'Compare **cyclic and non-cyclic** in a table of five features.',
        'Say **Mitchell** and **chemiosmotic hypothesis** by name; give the three causes of the gradient.',
        'Distinguish **absorption** from **action** spectrum and describe **Engelmann**.',
      ],
      n: 'Exam tips. Label the Z-scheme fully. Compare the two kinds of phosphorylation in a table. Name Mitchell and give three causes of the proton gradient. And keep absorption and action spectra apart.',
    }),
  ],
});

// ---------------------------------------------------------------- Part 2
export const deck2 = deck({
  part: 2,
  title: 'Photosynthesis in Higher Plants — Part 2: Calvin cycle, C4 pathway, photorespiration and limiting factors',
  goals: [
    'Draw the Calvin cycle in sequence and calculate the ATP and NADPH for one glucose',
    'Describe the C4 pathway and Kranz anatomy and compare C3 with C4 plants',
    'Explain photorespiration and interpret graphs using Blackman’s law of limiting factors',
  ],
  slides: [
    sl('title', 'From ATP and NADPH to sugar', {
      b: 'Part 2 — the biosynthetic phase in C3 and C4 plants, photorespiration and limiting factors.',
      v: flow('LR', [['a', 'ATP and NADPH'], ['c', 'Calvin cycle'], ['g', 'Sugar']], [['a', 'c'], ['c', 'g']], 'ATP and NADPH drive the Calvin cycle, which gives sugar'),
      n: 'The ATP and NADPH from the light reaction are used in the stroma to fix carbon dioxide into sugar. This happens in the Calvin cycle in every green plant, with a special carbon dioxide pump in some.',
    }),
    sl('diagram', 'The Calvin cycle', {
      b: 'The **Calvin cycle** has three stages: **carboxylation** (CO₂ joins RuBP, enzyme **RuBisCO**), **reduction** (PGA to G3P using ATP and NADPH) and **regeneration** of RuBP. The first stable product is the three-carbon **PGA**.',
      v: V.calvin,
      n: 'Carbon dioxide is added to a five-carbon sugar, RuBP, to give two three-carbon acids. These are reduced using ATP and NADPH. Most of the product is used to regenerate RuBP, and only a small part leaves the cycle as sugar.',
    }),
    sl('concept', 'Three stages of the cycle', {
      b: 'RuBisCO is the most abundant enzyme on Earth. It is a **carboxylase** here and an **oxygenase** in photorespiration.',
      v: table(['Stage', 'What happens', 'Energy used'], [['Carboxylation', 'CO₂ + RuBP (5 C) gives 2 PGA (3 C), by RuBisCO', 'None'], ['Reduction', 'PGA to G3P (a triose phosphate)', 'ATP and NADPH'], ['Regeneration', 'G3P rearranged to RuBP', 'ATP']], 'Table of the three stages of the Calvin cycle'),
      n: 'Carboxylation uses no energy. Reduction uses both ATP and NADPH. Regeneration of the RuBP acceptor uses ATP only. The cycle must run six times to make one glucose.',
    }),
    sl('example', 'Worked example 1: cost of one glucose', {
      b: `Find the ATP and NADPH needed for the Calvin cycle to make one glucose (6 carbon atoms). Each CO₂ fixed uses 3 ATP and 2 NADPH.`,
      ul: [
        r`Turns of the cycle $= 6$ (one CO₂ per turn).`,
        r`ATP $= 6 \times 3 = ${GLU.atp}$; NADPH $= 6 \times 2 = ${GLU.nadph}$.`,
        r`Carbon check: ${CARB6.rubpIn} RuBP + ${CARB6.rubpIn} CO₂ = ${CARB6.cIn} C; ${CARB6.pga} PGA; ${CARB6.g3pExit} G3P leave (${CARB6.cExit} C); ${CARB6.g3pKept} G3P regenerate ${CARB6.rubpOut} RuBP.`,
      ],
      v: table(['Item (six turns)', 'Number'], [['CO₂ fixed', '6'], ['ATP', String(GLU.atp)], ['NADPH', String(GLU.nadph)], ['G3P leaving the cycle', String(CARB6.g3pExit)], ['RuBP regenerated', String(CARB6.rubpOut)]], `Worked table: ${GLU.atp} ATP and ${GLU.nadph} NADPH per glucose`),
      n: 'Six turns fix six carbon dioxide molecules. At three ATP and two NADPH per turn, that is eighteen ATP and twelve NADPH. Two of the twelve three-carbon sugars leave to make glucose, and ten regenerate six RuBP.',
    }),
    sl('check', 'Quick check: ATP count', {
      b: 'Calculate the ATP needed for a given number of CO₂ molecules fixed.',
      n: 'Quick check. Multiply the number of turns by the ATP used per turn.',
      chk: 'calvin-check',
    }),
    sl('concept', 'C4 plants: the Hatch and Slack pathway', {
      b: 'In **C4 plants** (maize, sugarcane, sorghum) CO₂ is first fixed in **mesophyll cells** by **PEP carboxylase** to the four-carbon **OAA**, which gives malate. Malate moves to **bundle sheath cells**, releases CO₂ there and the Calvin cycle runs. The path was worked out by **Hatch and Slack**.',
      v: table(['Step', 'Cell', 'Event'], [['1', 'Mesophyll', 'PEP (3 C) + CO₂ gives OAA (4 C); enzyme PEP carboxylase'], ['2', 'Mesophyll', 'OAA to malate, which moves into the bundle sheath'], ['3', 'Bundle sheath', 'Malate gives pyruvate + CO₂; CO₂ enters the Calvin cycle'], ['4', 'Mesophyll', 'Pyruvate returns and is converted to PEP using ATP']], 'Table of the four steps of the C4 pathway'),
      n: 'The first stable product is a four-carbon acid, so the plant is called C four. The pathway is a carbon dioxide pump: it fixes carbon dioxide in one cell and releases it at high level in another, where the Calvin cycle runs.',
    }),
    sl('diagram', 'The C4 pathway drawn', {
      b: 'The two cell types cooperate. **PEP carboxylase** has no affinity for oxygen, so it works well even when CO₂ is scarce.',
      v: V.c4,
      n: 'In the mesophyll, PEP carboxylase fixes carbon dioxide into oxaloacetate and malate. In the bundle sheath, malate releases carbon dioxide for RuBisCO and the Calvin cycle. Pyruvate goes back to the mesophyll to make PEP again.',
    }),
    sl('diagram', 'Kranz anatomy', {
      b: '**Kranz** means wreath. C4 leaves have a ring of large **bundle sheath cells** with many chloroplasts around each vascular bundle, and mesophyll cells outside. The Calvin cycle is **confined to the bundle sheath**.',
      v: V.kranz,
      n: 'Around each vascular bundle is a ring of large cells packed with chloroplasts, like a wreath. This special leaf anatomy keeps carbon dioxide concentrated around RuBisCO, which is how C four plants avoid photorespiration.',
    }),
    sl('concept', 'C3 plants and C4 plants compared', {
      b: 'C4 plants do best in **hot, bright, dry** habitats.',
      v: table(['Feature', 'C3 plants (wheat, rice)', 'C4 plants (maize, sugarcane)'], [['First stable product', 'PGA (3 C)', 'OAA (4 C)'], ['Leaf anatomy', 'No Kranz; Calvin cycle in mesophyll', 'Kranz anatomy; Calvin cycle in bundle sheath'], ['Carboxylating enzymes', 'RuBisCO only', 'PEP carboxylase, then RuBisCO'], ['Photorespiration', 'Present', 'Negligible'], ['Optimum temperature', `${C4_VS_C3.c3opt} °C`, `${C4_VS_C3.c4opt} °C`], ['ATP per CO₂', '3', '5']], 'Table comparing C3 and C4 plants in six features'),
      n: 'C four plants have two carboxylating enzymes, Kranz anatomy, little photorespiration and a higher temperature optimum. They are more productive in hot, bright places, at the cost of more ATP per carbon dioxide fixed.',
    }),
    sl('example', 'Worked example 2: the price of the C4 pump', {
      b: `PEP regeneration costs 2 extra ATP per CO₂. Compare the ATP and NADPH needed per glucose in C3 and C4 plants.`,
      ul: [
        r`C3: ATP $= 6 \times 3 = ${GLU.atp}$; NADPH $= ${GLU.nadph}$.`,
        r`C4: ATP $= 6 \times 5 = ${GLU4.atp}$; NADPH $= ${GLU4.nadph}$.`,
        `C4 plants spend **${GLU4.atp - GLU.atp} extra ATP** per glucose, but they avoid the loss by photorespiration.`,
      ],
      v: table(['Plant', 'ATP', 'NADPH'], [['C3', String(GLU.atp), String(GLU.nadph)], ['C4', String(GLU4.atp), String(GLU4.nadph)]], `Worked table: ${GLU.atp} versus ${GLU4.atp} ATP; ${GLU.nadph} NADPH in both`),
      n: 'C four plants pay twelve extra ATP per glucose to run the pump. NADPH needed is the same. In hot, bright weather this cost is worth paying, because photorespiration would waste more.',
    }),
    sl('check', 'Quick check: C4 anatomy', {
      b: 'Where does the Calvin cycle run in a C4 leaf?',
      n: 'Quick check. Think of the wreath of cells around the vascular bundle.',
      chk: 'c4-check',
    }),
    sl('concept', 'Photorespiration', {
      b: 'When **O₂ is high and CO₂ is low** (hot, dry days), **RuBisCO acts as an oxygenase**. RuBP + O₂ gives one PGA and one two-carbon **phosphoglycolate**. The pathway runs through the **chloroplast, peroxisome and mitochondrion**.',
      v: flow('LR', [['c', 'Chloroplast: RuBP + O2'], ['g', 'Glycolate'], ['p', 'Peroxisome: glycine'], ['m', 'Mitochondrion: serine + CO2']], [['c', 'g'], ['g', 'p'], ['p', 'm']], 'Photorespiratory pathway from chloroplast to peroxisome to mitochondrion, releasing carbon dioxide'),
      n: 'Photorespiration begins in the chloroplast, continues in the peroxisome and ends in the mitochondrion, where carbon dioxide is released. No ATP or NADPH is made, and no sugar is formed.',
    }),
    sl('example', 'Worked example 3: why photorespiration is wasteful', {
      b: `Two glycolate molecules (2 C each) are converted to one serine (3 C) and one CO₂. What percentage of the carbon is lost?`,
      ul: [
        r`Carbon in $= 2 \times 2 = ${PR.in}$; serine keeps ${PR.serine}; CO₂ lost $= ${PR.co2}$.`,
        r`Loss $= \dfrac{${PR.co2}}{${PR.in}} \times 100 = ${PR_LOSS}$ percent.`,
        'The cycle also uses ATP and NADPH, and makes none, so it lowers yield.',
      ],
      v: table(['Item', 'Carbon atoms'], [['Two glycolate', String(PR.in)], ['One serine', String(PR.serine)], ['CO₂ released', String(PR.co2)]], `Worked table: ${PR_LOSS} percent of the carbon is lost`),
      n: 'A quarter of the glycolate carbon is lost as carbon dioxide, and the pathway also spends energy. This is why photorespiration is called wasteful. C four plants do not suffer it, because their bundle sheath cells hold carbon dioxide at high levels.',
    }),
    sl('diagram', 'Blackman’s law of limiting factors', {
      b: '**Blackman (1905):** when several factors affect a process, its rate is determined by the factor **nearest its minimum value**. At low light the rate is **limited by light**; once light is enough, **CO₂** (or temperature) limits it.',
      v: V.blackman,
      n: 'In the graph, each curve rises with light and then flattens. The flat part shows that something else, here carbon dioxide, has become limiting. With more carbon dioxide the curve rises higher before it flattens.',
    }),
    sl('example', 'Worked example 4: reading the limiting factor', {
      b: `Using the graph, find the rate and the limiting factor at 30 klux and at 60 klux for the low-carbon-dioxide curve, and the rate at 60 klux if carbon dioxide is raised.`,
      ul: [
        `At 30 klux the rate is ${rate(30, LIM.capLow)} units: **${limiting(30, LIM.capLow)}** is limiting, because the curve is still rising.`,
        `At 60 klux the rate is ${rate(60, LIM.capLow)} units: **${limiting(60, LIM.capLow)}** is limiting, because the curve is flat.`,
        `With more carbon dioxide, the rate at 60 klux becomes ${rate(60, LIM.capHigh)} units, and light is limiting again.`,
      ],
      v: table(['Light (klux)', 'Low CO₂', 'High CO₂', 'Limiting (low CO₂)'], [['30', String(rate(30, LIM.capLow)), String(rate(30, LIM.capHigh)), limiting(30, LIM.capLow)], ['60', String(rate(60, LIM.capLow)), String(rate(60, LIM.capHigh)), limiting(60, LIM.capLow)]], 'Worked table of rates and limiting factors at two light intensities'),
      n: 'On a rising part of the curve, the factor on the axis is limiting. On a flat part, another factor is. Adding that other factor lifts the plateau, until light becomes limiting again.',
    }),
    sl('check', 'Quick check: limiting factor', {
      b: 'Name the limiting factor in a described experiment.',
      n: 'Quick check. Is the curve rising or flat?',
      chk: 'blackman-check',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Calvin cycle: carboxylation (RuBisCO), reduction, regeneration; one glucose needs ${GLU.atp} ATP and ${GLU.nadph} NADPH.`,
        'C4 pathway (Hatch and Slack): PEP carboxylase in mesophyll, Calvin cycle in bundle sheath; Kranz anatomy.',
        `C4 costs ${GLU4.atp} ATP per glucose but avoids photorespiration.`,
        `Photorespiration: RuBisCO oxygenase; chloroplast, peroxisome, mitochondrion; no ATP; ${PR_LOSS} percent of the carbon lost in the step shown.`,
        'Blackman: rate is set by the factor nearest its minimum; light, CO₂, temperature, water.',
      ],
      v: table(['Plant type', 'Photorespiration'], [['C3', 'Present'], ['C4', 'Negligible']], 'Summary table of photorespiration in C3 and C4 plants'),
      n: 'To recap: the Calvin cycle builds sugar using ATP and NADPH. C four plants add a carbon dioxide pump and Kranz anatomy that avoid photorespiration. Blackman’s law explains why the rate flattens when one factor runs short.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **Calvin cycle** with RuBP, PGA, G3P and the three stages in order.',
        'Give **18 ATP and 12 NADPH** (C3) and **30 ATP** (C4) per glucose with working.',
        'Compare **C3 and C4** in a table; name **Hatch and Slack** and **Kranz**.',
        'Say why photorespiration is **wasteful** and why it is absent in C4 plants.',
      ],
      n: 'Exam tips. Draw the Calvin cycle in sequence. Show the working for energy needed per glucose. Compare the two kinds of plant in a table and name the scientists. And explain why photorespiration is wasteful.',
    }),
  ],
});
