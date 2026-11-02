// ch11 Photosynthesis in Higher Plants — two decks: Part 1 (t01 site and pigments, t02 light reaction), Part 2 (t03 Calvin cycle, C4, photorespiration; t04 limiting factors).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { CHLOROPLAST, THYLAKOID, ZSCHEME, CALVIN_SVG, C4_SVG, BLACKMAN, SPECTRUM, CHROMATOGRAM } from './svgs.mjs';
import { N, TURN, CALVIN, C4, OVERALL, SPOTS, SOLVENT_FRONT, rf, rate, limiting } from './calc.mjs';

export const V = {
  chloroplast: svgV(CHLOROPLAST, 'Section of a chloroplast showing outer and inner membranes, stroma, grana of stacked thylakoids and stroma lamellae'),
  thylakoid: svgV(THYLAKOID, 'Thylakoid membrane with photosystem II, cytochrome b6f, photosystem I, NADP reductase and ATP synthase, lumen above and stroma below, with electron and proton flow'),
  z: svgV(ZSCHEME, 'Z scheme of electron flow from water through photosystem II and photosystem I to NADPH, drawn against energy level'),
  calvin: svgV(CALVIN_SVG, 'The Calvin cycle for three turns: carboxylation, reduction and regeneration with ATP and NADPH counts'),
  c4: svgV(C4_SVG, 'The C4 pathway across a mesophyll cell and a bundle sheath cell'),
  blackman: svgV(BLACKMAN, 'Graph of the rate of photosynthesis against light intensity for three conditions of carbon dioxide and temperature, showing limiting factors'),
  spectrum: svgV(SPECTRUM, 'Absorption spectra of chlorophyll a, chlorophyll b and carotenoids with the action spectrum of photosynthesis'),
  chrom: svgV(CHROMATOGRAM, 'Paper chromatogram of leaf pigments with carotenoids, xanthophylls, chlorophyll a and chlorophyll b from the top and a centimetre ruler'),
};

export const deck1 = deck({
  part: 1,
  title: 'Photosynthesis in Higher Plants — Part 1: Site, pigments and the light reaction',
  goals: [
    'Describe the chloroplast and the pigments involved in photosynthesis',
    'Explain the light reaction: photosystems, electron transport, cyclic and non-cyclic photophosphorylation',
    'Explain the chemiosmotic hypothesis of ATP synthesis',
  ],
  slides: [
    sl('title', 'Photosynthesis in Higher Plants', {
      b: 'Part 1 — where light energy is captured and how it becomes ATP and NADPH.',
      v: flow('LR', [['l', 'Light energy'], ['r', 'Light reaction: ATP, NADPH and oxygen'], ['c', 'Calvin cycle: sugar from carbon dioxide']], [['l', 'r'], ['r', 'c']], 'Flow from light energy through the light reaction to the Calvin cycle'),
      n: 'Almost all life depends on photosynthesis. Green plants use light energy to build sugar from carbon dioxide and water, and release oxygen. The process has two linked parts. The light reaction captures energy as ATP and NADPH, and the Calvin cycle uses them to make sugar. In this part we study the first.',
    }),
    sl('concept', 'The site: the chloroplast', {
      b: 'In green plants photosynthesis takes place mainly in the **leaves**, in **chloroplasts**. The chloroplast has a **double membrane**. **Grana** (stacks of **thylakoids**) joined by **stroma lamellae** lie in the **stroma**.',
      v: V.chloroplast,
      n: 'The light reaction needs pigments and takes place on the thylakoid membranes of the grana. The stroma contains the enzymes that fix carbon dioxide, so the Calvin cycle happens there. The membranes of the stroma lamellae lack photosystem two and the enzyme that makes NADPH.',
    }),
    sl('concept', 'Photosynthetic pigments', {
      b: '**Chlorophyll a** is the chief pigment. **Chlorophyll b, xanthophylls and carotenoids** are **accessory pigments**: they absorb light and pass the energy to chlorophyll a, widen the range of light used, and protect chlorophyll a from photo-oxidation.',
      v: table(
        ['Pigment', 'Colour', 'Role'],
        [
          ['Chlorophyll a', 'Bright or blue green', 'Chief pigment; forms the reaction centre'],
          ['Chlorophyll b', 'Yellow green', 'Accessory'],
          ['Xanthophylls', 'Yellow', 'Accessory'],
          ['Carotenoids', 'Yellow to yellow-orange', 'Accessory; protect chlorophyll a'],
        ],
        'Table of the four leaf pigments with their colours and roles',
      ),
      n: 'Leaf pigments can be separated by paper chromatography. Chlorophyll a is the chief pigment that traps light. The other three are accessory pigments. They absorb light at other wavelengths and pass the energy on to chlorophyll a, and they also protect it from damage by too much light.',
    }),
    sl('example', 'Worked example 1: reading a pigment chromatogram', {
      b: `A leaf extract is run on paper with the solvent front ${SOLVENT_FRONT} cm from the origin. The four bands lie ${SPOTS.map(([n, d]) => `${d} cm (${n.toLowerCase()})`).join(', ')} from the origin. Find each Rf value and say which pigment is most soluble in the solvent.`,
      ul: [
        r`$R_f = \dfrac{\text{distance moved by pigment}}{\text{distance moved by solvent}}$, so carotenoids: $\dfrac{${SPOTS[0][1]}}{${SOLVENT_FRONT}} = ${rf(SPOTS[0][1])}$.`,
        r`Xanthophylls: $\dfrac{${SPOTS[1][1]}}{${SOLVENT_FRONT}} = ${rf(SPOTS[1][1])}$; chlorophyll a: $\dfrac{${SPOTS[2][1]}}{${SOLVENT_FRONT}} = ${rf(SPOTS[2][1])}$; chlorophyll b: $\dfrac{${SPOTS[3][1]}}{${SOLVENT_FRONT}} = ${rf(SPOTS[3][1])}$.`,
        'Carotenoids travel farthest, so they are the most soluble in this solvent.',
      ],
      v: V.chrom,
      n: 'The retention factor is the distance moved by the pigment divided by the distance moved by the solvent. Carotenoids moved eleven point four centimetres out of twelve, which gives zero point nine five, the highest value. Chlorophyll b moved the least, so it has the lowest value and is least soluble in this solvent.',
    }),
    sl('check', 'Quick check: pigments', {
      b: 'Interpret a chromatogram.',
      n: 'Quick check. Which pigment will appear lowest on the paper, and which is the chief pigment?',
      chk: 'pigment-mcq',
    }),
    sl('diagram', 'Absorption and action spectra', {
      b: 'Chlorophyll a absorbs mainly in the **violet-blue and red** regions. The **action spectrum** of photosynthesis follows the **absorption** of the pigments together, so green light is the least effective.',
      v: V.spectrum,
      n: 'The absorption spectrum shows how much light a pigment takes in at each wavelength. Chlorophyll a absorbs strongly in the violet blue and the red. The action spectrum, which shows the rate of photosynthesis at each wavelength, closely matches the combined absorption of all the pigments. Little green light is absorbed, which is why leaves look green.',
    }),
    sl('concept', 'Photosystems and reaction centres', {
      b: 'The pigments are organised into **light-harvesting complexes** within **photosystem I (PS I)** and **photosystem II (PS II)**. Hundreds of pigment molecules act as an **antenna**; one chlorophyll a molecule forms the **reaction centre**.',
      v: table(
        ['Photosystem', 'Reaction centre', 'Absorbs best at', 'Where it is found'],
        [
          ['PS II', 'P680', '680 nm (red)', 'Grana thylakoids; not in stroma lamellae'],
          ['PS I', 'P700', '700 nm (far red)', 'Grana and stroma lamellae'],
        ],
        'Table of photosystem II and photosystem I with their reaction centres and absorption peaks',
      ),
      n: 'Each photosystem has an antenna of many pigment molecules that funnels light energy to a single chlorophyll a molecule, the reaction centre. In photosystem one the reaction centre absorbs best at seven hundred nanometres, and in photosystem two at six hundred and eighty nanometres.',
    }),
    sl('diagram', 'The thylakoid membrane at work', {
      b: 'The light reaction takes place on the **thylakoid membrane**: water is split on the **lumen** side, electrons flow along the carriers, **NADP reductase** works on the **stroma** side, and **ATP synthase** makes ATP.',
      v: V.thylakoid,
      n: 'Light excites photosystem two, and water is split on the lumen side, releasing oxygen, protons and electrons. The electrons pass along carriers to photosystem one. There, light excites them again and they reach NADP reductase on the stroma side, which makes NADPH. Protons build up in the lumen and flow out through ATP synthase.',
    }),
    sl('diagram', 'The Z scheme: non-cyclic electron flow', {
      b: 'In **non-cyclic photophosphorylation** both photosystems work in series: electrons move from **water → PS II → plastoquinone → cytochrome b₆f → plastocyanin → PS I → ferredoxin → NADP⁺**. The result is **ATP, NADPH and oxygen**.',
      v: V.z,
      n: 'The path of the electron looks like the letter Z when drawn against energy. Light raises the electron in photosystem two, it runs downhill to photosystem one, and light lifts it again. Finally it reaches NADP plus, which is reduced to NADPH. Water splitting replaces the electrons lost by photosystem two, and releases oxygen.',
    }),
    sl('check', 'Quick check: electron flow', {
      b: 'Follow the electrons.',
      n: 'Quick check. Where do the electrons that replace those lost by photosystem two come from?',
      chk: 'water-mcq',
    }),
    sl('concept', 'Cyclic and non-cyclic photophosphorylation', {
      b: 'Compare the two routes by **which photosystems act** and **what they produce**.',
      v: table(
        ['Feature', 'Non-cyclic', 'Cyclic'],
        [
          ['Photosystems', 'PS II and PS I', 'PS I only'],
          ['Electron path', 'Water to NADP⁺; electrons do not return', 'Electrons return to PS I'],
          ['Products', 'ATP, NADPH and O₂', 'ATP only'],
          ['Water splitting', 'Yes', 'No'],
          ['Where', 'Grana thylakoids', 'Stroma lamellae; when light above 680 nm only'],
        ],
        'Table comparing non-cyclic and cyclic photophosphorylation',
      ),
      n: 'In cyclic photophosphorylation only photosystem one works. The excited electron passes down a chain of carriers and returns to photosystem one, so only ATP is made, no NADPH and no oxygen. It takes place in the stroma lamellae, and when only light of wavelengths longer than six hundred and eighty nanometres is available.',
    }),
    sl('concept', 'The chemiosmotic hypothesis', {
      b: 'ATP is made because of a **proton gradient across the thylakoid membrane**, with **protons accumulating in the lumen**.',
      v: flow(
        'LR',
        [['w', 'Water split in the lumen: H⁺ released'], ['p', 'Carriers move H⁺ from stroma to lumen'], ['n', 'NADP reductase uses H⁺ in the stroma'], ['g', 'Gradient: more H⁺ in the lumen'], ['a', 'ATP synthase: CF₀ channel and CF₁ make ATP']],
        [['w', 'g'], ['p', 'g'], ['n', 'g'], ['g', 'a']],
        'Flow from three proton-moving events to a proton gradient and then ATP synthase',
      ),
      n: 'Three events raise the proton concentration in the lumen. Water is split inside it. Carriers move protons from the stroma into the lumen as electrons pass. And NADP reductase uses up protons on the stroma side. The breakdown of this gradient through the channel of ATP synthase changes the shape of its knob and makes ATP.',
    }),
    sl('check', 'Quick check: the proton gradient', {
      b: 'Choose where protons are stored.',
      n: 'Quick check. On which side of the thylakoid membrane do protons accumulate?',
      chk: 'gradient-mcq',
    }),
    sl('example', 'Worked example 2: from water to NADPH', {
      b: `The overall equation for one glucose needs ${OVERALL.waterIn} water molecules to be split. How many oxygen molecules and electrons result, and how many NADPH can those electrons reduce? (Each NADPH takes 2 electrons.)`,
      ul: [
        r`Each $2\,\text{H}_2\text{O}$ gives one $\text{O}_2$ and $4$ electrons, so ${OVERALL.waterIn} water molecules give $\dfrac{${OVERALL.waterIn}}{2} = ${OVERALL.o2}$ oxygen molecules.`,
        r`Electrons: $${OVERALL.waterIn} \times 2 = 24$.`,
        r`NADPH: $\dfrac{24}{2} = ${N.nadph6}$, exactly the number of NADPH the Calvin cycle needs for one glucose.`,
      ],
      v: table(['Quantity', 'Count'], [['Water molecules split', String(OVERALL.waterIn)], ['Oxygen molecules released', String(OVERALL.o2)], ['Electrons released', '24'], ['NADPH that can be made', String(N.nadph6)]], 'Worked table: 12 water, 6 oxygen, 24 electrons, 12 NADPH'),
      n: 'Splitting two water molecules gives one oxygen molecule and four electrons. Twelve waters give six oxygen molecules and twenty four electrons. Each NADPH takes two electrons, so twenty four electrons make twelve NADPH, exactly the amount the Calvin cycle needs for one glucose. The oxygen comes from water, not from carbon dioxide.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Chloroplast: grana (light reaction) and stroma (Calvin cycle).',
        'Chlorophyll a is the chief pigment; chlorophyll b, xanthophylls and carotenoids are accessory.',
        'PS II (P680) and PS I (P700); the Z scheme gives ATP, NADPH and O₂.',
        'Cyclic: PS I only, ATP only. Non-cyclic: both, ATP + NADPH + O₂.',
        'Chemiosmosis: H⁺ gradient in the lumen drives ATP synthase.',
      ],
      v: V.thylakoid,
      n: 'To recap: the chloroplast traps light in the thylakoid membranes. Photosystem two and photosystem one work in series to move electrons from water to NADP plus, making ATP and NADPH and releasing oxygen. In cyclic flow only photosystem one acts, and only ATP is made. A proton gradient across the thylakoid drives ATP synthase.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **Z scheme** from water to NADPH and label **P680, P700** and the carriers in order.',
        'Say **oxygen comes from water** and that **cyclic** flow makes **ATP only**.',
        'Name the **three proton-moving events** when you explain chemiosmosis.',
        'For chromatography, give the **order of bands** and compute **Rf** with the formula.',
      ],
      n: 'Exam tips. Draw the Z scheme with the carriers in the right order. Remember that the oxygen comes from water and that cyclic flow gives only ATP. When explaining chemiosmosis, name the three events that build the proton gradient. And in chromatography problems, write the formula for the retention factor.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Photosynthesis in Higher Plants — Part 2: Calvin cycle, C4 pathway, photorespiration and limiting factors',
  goals: [
    'Describe the three stages of the Calvin cycle and count its ATP and NADPH use',
    'Compare the C3 and C4 pathways and explain photorespiration',
    'Explain the effect of light, carbon dioxide, temperature and water, and the law of limiting factors',
  ],
  slides: [
    sl('title', 'Making sugar and what limits it', {
      b: 'Part 2 — the Calvin cycle, the C4 pathway, photorespiration and the factors that limit the rate.',
      v: flow('LR', [['c', 'CO₂ fixed by RuBisCO'], ['r', 'Reduced using ATP and NADPH'], ['s', 'Sugar and regenerated RuBP']], [['c', 'r'], ['r', 's']], 'Flow from carbon dioxide fixation through reduction to sugar and RuBP regeneration'),
      n: 'The light reaction makes ATP and NADPH, but sugar is made in the stroma by the Calvin cycle. In this part we count what the cycle costs, see how C four plants change the story, understand why photorespiration wastes energy, and ask what limits the rate of photosynthesis.',
    }),
    sl('diagram', 'The Calvin cycle', {
      b: 'The Calvin cycle occurs in the **stroma** of all photosynthetic plants. It has three stages: **carboxylation, reduction and regeneration**.',
      v: V.calvin,
      n: 'Carbon dioxide combines with the five carbon sugar RuBP, in a reaction catalysed by RuBisCO, to form two molecules of the three carbon acid PGA. PGA is reduced to a three carbon sugar using ATP and NADPH. Most of this sugar is used to regenerate RuBP, which also needs ATP. After three turns, one three carbon sugar is the net gain.',
    }),
    sl('concept', 'The three stages in detail', {
      b: 'Learn each stage by its **input, enzyme or energy source, and output**.',
      v: table(
        ['Stage', 'What happens', 'Energy'],
        [
          ['Carboxylation', 'RuBP + CO₂ → 2 PGA, catalysed by **RuBisCO**, the most abundant enzyme on Earth', 'None'],
          ['Reduction', 'PGA → triose phosphate (G3P) in two steps: phosphorylation, then reduction', `${CALVIN.reductionAtp} ATP and ${CALVIN.reductionNadph} NADPH per CO₂`],
          ['Regeneration', 'RuBP is regenerated so the cycle can continue', `${CALVIN.regenAtp} ATP per CO₂`],
        ],
        'Table of carboxylation, reduction and regeneration in the Calvin cycle',
      ),
      n: 'The first stable product, PGA, has three carbons, so plants using only this pathway are called C three plants. Reduction needs two ATP and two NADPH for every carbon dioxide fixed. Regeneration of RuBP needs one more ATP. So each carbon dioxide costs three ATP and two NADPH.',
    }),
    sl('example', 'Worked example 1: the cost of one glucose', {
      b: `How many turns of the Calvin cycle, how many ATP and how many NADPH are needed to make one glucose (6 carbons)? Per CO₂ the cycle uses ${CALVIN.atpPerCO2} ATP and ${CALVIN.nadphPerCO2} NADPH.`,
      ul: [
        r`One CO$_2$ is fixed per turn, so glucose needs $6$ turns.`,
        r`ATP: $6 \times ${CALVIN.atpPerCO2} = ${N.atp6}$.`,
        r`NADPH: $6 \times ${CALVIN.nadphPerCO2} = ${N.nadph6}$.`,
      ],
      v: table(['Quantity', 'For one glucose'], [['Turns of the cycle', '6'], ['ATP', String(N.atp6)], ['NADPH', String(N.nadph6)]], `Worked table: 6 turns, ${N.atp6} ATP, ${N.nadph6} NADPH`),
      n: 'Each turn fixes one carbon dioxide, so a six carbon glucose needs six turns. At three ATP per turn that is eighteen ATP, and at two NADPH per turn it is twelve NADPH. These totals match the textbook figures for the C three pathway.',
    }),
    sl('check', 'Quick check: Calvin cycle', {
      b: 'Count the energy cost.',
      n: 'Quick check. How many ATP does the cycle need to fix one carbon dioxide?',
      chk: 'calvin-mcq',
    }),
    sl('diagram', 'The C4 pathway', {
      b: 'In **C4 plants** the first product is a **4-carbon acid**. **PEP carboxylase** in **mesophyll cells** fixes CO₂ onto **PEP (3C)** to give **oxaloacetate (4C)**. The acid goes to the **bundle sheath cells**, releases CO₂, and the CO₂ enters the **Calvin cycle**.',
      v: V.c4,
      n: 'The primary acceptor of carbon dioxide in the mesophyll cell is PEP, a three carbon molecule, and the enzyme is PEP carboxylase. The four carbon acid moves into the bundle sheath cell, where it is broken down to release carbon dioxide. The three carbon molecule returns to the mesophyll and is turned back into PEP.',
    }),
    sl('concept', 'Kranz anatomy and C3 versus C4', {
      b: '**Kranz anatomy:** large **bundle sheath** cells around the vascular bundles, with **thick walls impervious to gases** and no intercellular spaces. **RuBisCO is only in the bundle sheath**; the Calvin cycle runs there.',
      v: table(
        ['Feature', 'C3 plants', 'C4 plants'],
        [
          ['First stable product', 'PGA (3C)', 'Oxaloacetate (4C)'],
          ['CO₂ acceptor', 'RuBP', 'PEP in mesophyll; RuBP in bundle sheath'],
          ['Photorespiration', 'Occurs', 'Absent'],
          ['Temperature optimum', 'Lower', 'Higher'],
          ['Productivity', 'Lower', 'Greater'],
          ['Examples', 'Wheat, rice', 'Maize, sugarcane'],
        ],
        'Table comparing C3 and C4 plants',
      ),
      n: 'C four plants have a special leaf anatomy called Kranz anatomy. Large bundle sheath cells surround the veins, with thick walls and no air spaces. Because the carbon dioxide is concentrated there, C four plants have no photorespiration, tolerate higher temperatures and have greater productivity.',
    }),
    sl('example', 'Worked example 2: C3 versus C4 energy cost', {
      b: `A C4 plant spends ${C4.extraAtp} extra ATP per CO₂ to regenerate PEP, so it needs ${C4.atpPerCO2} ATP and ${CALVIN.nadphPerCO2} NADPH per CO₂. Compare the ATP needed for one glucose in C3 and C4 plants, and the ATP : NADPH ratios.`,
      ul: [
        r`C$_3$: $6 \times ${CALVIN.atpPerCO2} = ${N.atp6}$ ATP; C$_4$: $6 \times ${C4.atpPerCO2} = ${N.atp6c4}$ ATP.`,
        r`Extra ATP in C$_4$: $${N.atp6c4} - ${N.atp6} = ${N.atp6c4 - N.atp6}$, which is $6 \times ${C4.extraAtp}$.`,
        r`Ratios: C$_3$: $\dfrac{${CALVIN.atpPerCO2}}{${CALVIN.nadphPerCO2}} = ${N.ratioC3}$; C$_4$: $\dfrac{${C4.atpPerCO2}}{${CALVIN.nadphPerCO2}} = ${N.ratioC4}$.`,
      ],
      v: table(['Plant type', 'ATP per glucose', 'NADPH per glucose', 'ATP : NADPH'], [['C3', String(N.atp6), String(N.nadph6), String(N.ratioC3)], ['C4', String(N.atp6c4), String(N.nadph6), String(N.ratioC4)]], 'Worked table comparing ATP and NADPH needs of C3 and C4 plants'),
      n: 'A C three plant needs eighteen ATP for one glucose, a C four plant thirty, because of two extra ATP for each carbon dioxide. The NADPH need is the same, twelve. So C four plants need more ATP in proportion to NADPH, which cyclic flow of electrons can help to supply. The extra cost pays off in hot, bright places.',
    }),
    sl('check', 'Quick check: C4 plants', {
      b: 'Identify where a reaction occurs.',
      n: 'Quick check. In which cells does RuBisCO work in a C four plant?',
      chk: 'c4-mcq',
    }),
    sl('concept', 'Photorespiration', {
      b: 'RuBisCO can bind **O₂ as well as CO₂**. In a high O₂ and low CO₂ situation, **RuBP + O₂ → PGA + phosphoglycolate**. There is **no sugar, ATP or NADPH made**, and CO₂ is released: it is a **wasteful** process.',
      v: flow(
        'LR',
        [['a', 'RuBisCO active site binds CO₂'], ['b', 'Calvin cycle: 2 PGA'], ['c', 'RuBisCO active site binds O₂'], ['d', 'RuBP → PGA + phosphoglycolate'], ['e', 'Chloroplast, peroxisome, mitochondrion: CO₂ released']],
        [['a', 'b'], ['c', 'd'], ['d', 'e']],
        'Flow comparing carboxylation with the oxygenase reaction of RuBisCO that starts photorespiration',
      ),
      n: 'The enzyme RuBisCO has an active site that binds both carbon dioxide and oxygen. When oxygen is high and carbon dioxide low, RuBP takes up oxygen and one of the products is phosphoglycolate. No sugar, ATP or NADPH is made, and the pathway through three organelles releases carbon dioxide, so it wastes energy. C four plants avoid it by concentrating carbon dioxide at RuBisCO.',
    }),
    sl('check', 'Quick check: photorespiration', {
      b: 'Judge the assertion and the reason.',
      n: 'Quick check. Why is photorespiration called a wasteful process?',
      chk: 'photoresp-ar',
    }),
    sl('concept', 'Factors affecting photosynthesis', {
      b: 'The rate depends on **light, carbon dioxide, temperature and water**, and on internal factors such as the number, age and orientation of leaves and the amount of chlorophyll.',
      v: table(
        ['Factor', 'Effect'],
        [
          ['Light', 'Rate rises with intensity, then saturates; about 10 percent of full sunlight is enough for saturation'],
          ['CO₂', `Present at about 0.03–0.04 percent; raising it increases the rate. C4 plants saturate near 360 µL per L; C3 plants respond up to about 450 µL per L`],
          ['Temperature', 'Dark reactions are enzymatic and temperature sensitive; C4 plants have a higher optimum than C3 plants'],
          ['Water', 'Water stress closes stomata, cutting CO₂ supply, and wilting reduces leaf area'],
        ],
        'Table of external factors affecting photosynthesis',
      ),
      n: 'The usual amount of carbon dioxide in air is limiting for C three plants, so greenhouse crops such as tomato and bell pepper give higher yields when the air is enriched with it. Temperature affects the enzyme controlled reactions, and water stress closes stomata and so cuts off the supply of carbon dioxide.',
    }),
    sl('diagram', 'Blackman’s law of limiting factors', {
      b: '**Law of limiting factors:** if a process depends on several factors, its rate is determined by the factor **nearest its minimum value**. At low light, light limits; once light is enough, **CO₂ or temperature** takes over.',
      v: V.blackman,
      n: 'In the graph every curve rises together at low light, because light is limiting. Each then levels off at a height set by another factor. With three hundred microlitres of carbon dioxide the plateau is lowest. More carbon dioxide raises it, but heat at forty five degrees lowers the plateau, because temperature has become limiting.',
    }),
    sl('example', 'Worked example 3: which factor is limiting?', {
      b: `Use the graph model (arbitrary units): rate with light at 4 percent, CO₂ at 300 µL per L and 25 °C is ${rate(4, 300)}. Predict what happens to the rate when (i) light is raised to 10 percent, and (ii) CO₂ is then raised to 450 µL per L.`,
      ul: [
        r`(i) Light at 4 percent is limiting (${rate(4, 300)}). At 10 percent the rate rises to only ${rate(10, 300)}, because now **CO₂ is limiting**.`,
        r`(ii) Raising CO₂ to 450 lifts the rate to ${rate(10, 450)}, because the added CO₂ removes the limit.`,
        r`(iii) A further rise in light to 20 percent leaves it at ${rate(20, 450)}, because **CO₂, not light, is limiting** again.`,
      ],
      v: table(['Light (percent)', 'CO₂ (µL per L)', 'Rate', 'Limiting factor'], [[4, 300], [10, 300], [10, 450], [20, 450]].map(([L, C]) => [String(L), String(C), String(rate(L, C)), limiting(L, C).join(' and ')]), 'Worked table of rates and limiting factors for four combinations of light and carbon dioxide'),
      n: 'At low light, more light raises the rate, so light is limiting. At ten percent light the rate stops rising with light, and carbon dioxide has become limiting. Adding carbon dioxide lifts the rate. After that, extra light brings no further increase, because carbon dioxide is limiting again.',
    }),
    sl('check', 'Quick check: limiting factors', {
      b: 'Identify the limiting factor from data.',
      n: 'Quick check. If doubling the light does not change the rate, which factor is probably limiting?',
      chk: 'limit-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        `Calvin cycle in the stroma: carboxylation (RuBisCO), reduction, regeneration; ${CALVIN.atpPerCO2} ATP and ${CALVIN.nadphPerCO2} NADPH per CO₂; ${N.atp6} ATP and ${N.nadph6} NADPH per glucose.`,
        `C4: PEP carboxylase in mesophyll, Calvin cycle in bundle sheath; ${C4.atpPerCO2} ATP per CO₂; no photorespiration.`,
        'Photorespiration: RuBisCO binds O₂; no sugar, ATP or NADPH; wasteful.',
        'Factors: light, CO₂, temperature, water.',
        'Blackman: the factor nearest its minimum sets the rate.',
      ],
      v: V.calvin,
      n: 'To recap: the Calvin cycle fixes carbon dioxide, reduces it with ATP and NADPH, and regenerates RuBP. C four plants add a mesophyll step that concentrates carbon dioxide and so avoid photorespiration. The rate of photosynthesis is set by the factor that is nearest its minimum, as Blackman said.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        `Quote **${CALVIN.atpPerCO2} ATP and ${CALVIN.nadphPerCO2} NADPH per CO₂**, and scale to glucose with **6 turns**.`,
        'In C3 versus C4 answers use a **table** and mention **Kranz anatomy, PEP carboxylase and no photorespiration**.',
        'Explain photorespiration as **RuBisCO acting as an oxygenase**.',
        'State Blackman’s law in words, then apply it to a **graph or data table**.',
      ],
      n: 'Exam tips. Remember three ATP and two NADPH per carbon dioxide, and multiply by six turns for glucose. Compare C three and C four plants in a table, with Kranz anatomy and PEP carboxylase. Describe photorespiration as RuBisCO acting on oxygen. And state Blackman’s law before applying it to data.',
    }),
  ],
});
