// ch11 Photosynthesis in Higher Plants — question bank. AR keys: b a d c a c d (see order of add calls).
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { N, CALVIN, C4, TURN, SPOTS, rf, rate, atpFor, nadphFor, turnsForGlucose, glucoseFromCo2Mol, gross, ppm } from './calc.mjs';
import { THYLAKOID_LETTERED, CHROMATOGRAM_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 site and pigments
add('pigment-mcq', mcq({
  stem: 'A student runs a green leaf extract on chromatography paper. The band that lies lowest on the paper, nearest the origin, is yellow green. Which pigment forms this band?',
  right: 'Chlorophyll b',
  wrong: ['Chlorophyll a', 'Xanthophyll', 'Carotenoid'],
  sol: 'On the chromatogram the order from the top is carotenoids, xanthophylls, chlorophyll a and chlorophyll b; the yellow green band at the bottom is chlorophyll b — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('stromalamellae-mcq', mcq({
  stem: 'A student isolates a membrane fraction from chloroplasts that makes ATP in light but cannot split water or release oxygen, and it has no NADP reductase. It most probably came from',
  right: 'stroma lamellae',
  wrong: ['the grana thylakoids', 'the outer membrane', 'the stroma'],
  sol: 'The stroma lamellae lack photosystem II and NADP reductase, so they can only carry out cyclic photophosphorylation (ATP alone) — option (@K).',
  d: 3, c: 'application', t: [1, 2],
}));
add('carotenoid-mcq', mcq({
  stem: 'A mutant seedling that lacks carotenoids but has normal chlorophylls bleaches and dies in strong sunlight, although normal seedlings do well. Which role of carotenoids does this show?',
  right: 'They protect chlorophyll a from photo-oxidation.',
  wrong: ['They form the reaction centre of photosystem II.', 'They are the chief pigment that splits water.', 'They make NADPH from NADP⁺.'],
  sol: 'Accessory pigments, including carotenoids, protect chlorophyll a from photo-oxidation; the reaction centre is a chlorophyll a molecule — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('green-mcq', mcq({
  stem: 'A grower lights a seedling tray with a lamp that gives only green light and finds the seedlings grow very poorly. The best explanation is that',
  right: 'the leaf pigments absorb green light least, so little energy is trapped',
  wrong: ['green light is absorbed so strongly that the leaves overheat', 'green light destroys the thylakoid membranes', 'green light cannot reach the leaf surface'],
  sol: 'The absorption and action spectra both show that green light is the least effective for photosynthesis because it is absorbed least — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('notaccessory-mcq', mcq({
  stem: 'Which of these is not an accessory pigment of photosynthesis?',
  right: 'Chlorophyll a',
  wrong: ['Chlorophyll b', 'Xanthophyll', 'Carotenoid'],
  sol: 'Chlorophyll a is the chief pigment; chlorophyll b, xanthophylls and carotenoids are accessory pigments — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('actionspec-mcq', mcq({
  stem: 'An action spectrum of photosynthesis is a graph of',
  right: 'the rate of photosynthesis against the wavelength of light',
  wrong: ['the light absorbed by chlorophyll a against the wavelength of light', 'the rate of photosynthesis against the temperature', 'the amount of oxygen released against the age of the leaf'],
  sol: 'An action spectrum plots the rate of photosynthesis at each wavelength; plotting absorption against wavelength gives the absorption spectrum — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('stroma-mcq', mcq({
  stem: 'The enzymes that fix carbon dioxide into sugar are located in the',
  right: 'stroma of the chloroplast',
  wrong: ['lumen of the thylakoids', 'outer membrane of the chloroplast', 'grana membranes'],
  sol: 'The Calvin cycle enzymes lie in the stroma, whereas the light reaction occurs on the thylakoid membranes of the grana — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
{
  const lettered = svgV(CHROMATOGRAM_LETTERED, 'Paper chromatogram of leaf pigments with four bands labelled A to D and a ruler in centimetres');
  add('chromlet-mcq', mcq({
    stem: 'In the chromatogram of a leaf extract shown (bands A to D, ruler in centimetres, solvent front at 12 cm), the band of chlorophyll a is bright or blue green and lies at 6 cm. Which letter marks chlorophyll a?',
    right: 'D',
    wrong: ['A', 'B', 'C'],
    sol: 'Band D lies at 6 cm from the origin. Band C (11.4 cm) is carotenoids, A (9.0 cm) xanthophylls and B (4.2 cm) chlorophyll b — option (@K).',
    assets: [lettered], d: 2, c: 'application', t: [1],
  }));
  add('chromrf-num', num({
    stem: 'Using the same chromatogram (solvent front at 12 cm), calculate the Rf value of band B. Give the value to two decimal places.',
    value: rf(SPOTS[3][1]), tol: 0.01,
    sol: r`Band B lies at ${SPOTS[3][1]} cm, so $R_f = \dfrac{${SPOTS[3][1]}}{12} = ${rf(SPOTS[3][1])}$.`,
    scheme: [['Reads 4.2 cm from the ruler', 0.5], [`Rf = ${rf(SPOTS[3][1])}`, 0.5]],
    assets: [lettered], d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 0.35 || 'value');
}
add('xanth-tf', tf({
  stem: 'Xanthophylls are yellow pigments that act as accessory pigments of photosynthesis.',
  key: 't',
  sol: 'True. Xanthophylls are yellow and, like chlorophyll b and the carotenoids, are accessory pigments.',
  d: 1, c: 'recall', t: [1],
}));
add('farthest-fill', fill({
  stem: 'In paper chromatography of leaf pigments the pigments that travel farthest and form the top band are the ______.',
  acc: [['carotenoids', 'carotenoid', 'carotenes']],
  sol: 'Carotenoids (yellow to yellow-orange).',
  d: 1, c: 'recall', t: [1],
}));
add('spectrum-ar', ar({
  a: 'The action spectrum of photosynthesis closely resembles the combined absorption spectrum of the leaf pigments.',
  r: 'Leaves look green because they absorb green light least.',
  key: 'b',
  sol: 'Both statements are true, but the green colour of leaves does not explain why the action spectrum follows the absorption: it is because the absorbed light drives the light reaction — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('rfdist-num', num({
  stem: 'A pigment has an Rf value of 0.35 in a solvent that has risen 12 cm from the origin. How far, in cm, has the pigment moved?',
  value: N.rfDist, unit: 'cm',
  sol: r`$R_f = \dfrac{d}{12}$, so $d = 0.35 \times 12 = ${N.rfDist}$ cm.`,
  scheme: [[`${N.rfDist} cm`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 4.2 || 'value');
add('rfratio-num', num({
  stem: 'On a chromatogram the solvent front has moved 15 cm and a yellow band 9 cm. What is the Rf value of the band?',
  value: N.rf9of15,
  sol: r`$R_f = \dfrac{9}{15} = ${N.rf9of15}$.`,
  scheme: [[`${N.rf9of15}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 0.6 || 'value');
add('pigments-short', short({
  marks: 2,
  stem: 'Name the four kinds of pigment in a green leaf and give the colour of each band on a chromatogram.',
  model: '**Chlorophyll a** is bright or blue green, **chlorophyll b** is yellow green, **xanthophylls** are yellow, and **carotenoids** are yellow to yellow-orange. On a chromatogram the carotenoids travel farthest and chlorophyll b least.',
  sol: 'Four pigments and colours.',
  scheme: [['Four pigments named', 1], ['Colours correct', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('accessory-short', short({
  marks: 2,
  stem: 'What are accessory pigments? State two ways in which they help photosynthesis.',
  model: '**Accessory pigments** are chlorophyll b, xanthophylls and carotenoids, which **absorb light and pass the energy to chlorophyll a**. They enable a **wider range of wavelengths** to be used and **protect chlorophyll a from photo-oxidation**.',
  sol: 'Definition; two functions.',
  scheme: [['Which pigments; pass energy to chlorophyll a', 1], ['Wider range of wavelengths; protection', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('spectra-short', short({
  marks: 3,
  stem: 'Distinguish an absorption spectrum from an action spectrum, and say how the two compare for photosynthesis and what this shows.',
  model: 'An **absorption spectrum** shows how much light a pigment absorbs at each wavelength. An **action spectrum** shows the **rate of photosynthesis** at each wavelength. The action spectrum **closely follows the combined absorption spectra** of the pigments, with peaks in the violet-blue and red. This shows that the **light absorbed by the pigments drives photosynthesis**, and that green light is the least effective.',
  sol: 'Definitions, comparison, conclusion.',
  scheme: [['Absorption spectrum defined', 1], ['Action spectrum defined', 1], ['They match: absorbed light drives photosynthesis', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('chloroplast-long', long({
  stem: 'Describe the structure of a chloroplast and state which stage of photosynthesis takes place in each part. Name the pigments present and the chief pigment.',
  model: 'A **chloroplast** has a **double membrane**, the outer and inner membranes, enclosing the **stroma**. Inside the stroma are **grana**, stacks of flattened sacs called **thylakoids**, joined by **stroma lamellae**.\n\nThe **light reaction** takes place on the **thylakoid membranes** of the grana, where the pigments and photosystems lie. The membranes of the stroma lamellae lack photosystem II and NADP reductase. The **stroma** contains the enzymes of the **Calvin cycle**, where CO₂ is fixed into sugar.\n\nThe pigments are **chlorophyll a** (bright or blue green), **chlorophyll b** (yellow green), **xanthophylls** (yellow) and **carotenoids** (yellow to yellow-orange). **Chlorophyll a is the chief pigment**; the others are accessory pigments.',
  sol: 'Structure, stages by region, pigments.',
  scheme: [['Double membrane, stroma, grana, thylakoids, lamellae', 2], ['Light reaction in thylakoids; Calvin cycle in stroma', 1.5], ['Four pigments; chief pigment', 1.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 light reaction
add('water-mcq', mcq({
  stem: 'In non-cyclic photophosphorylation the electrons lost by the reaction centre of photosystem II are replaced by electrons that come from',
  right: 'the splitting of water',
  wrong: ['the splitting of carbon dioxide', 'NADPH made in the stroma', 'photosystem I'],
  sol: 'Water is split in association with PS II: 2 H₂O → 4 H⁺ + O₂ + 4 e⁻, and the electrons replace those lost by P680 — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('gradient-mcq', mcq({
  stem: 'During the light reaction, protons accumulate',
  right: 'in the lumen of the thylakoids',
  wrong: ['in the stroma of the chloroplast', 'between the outer and inner membranes of the chloroplast', 'in the cytoplasm outside the chloroplast'],
  sol: 'Water splitting and the carrier plastoquinone add protons to the lumen, while NADP reductase removes protons from the stroma, so the lumen becomes acidic — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('oxygen-source-mcq', mcq({
  stem: 'Algae are grown in water containing a heavy isotope of oxygen, with ordinary carbon dioxide. The oxygen gas released is found to contain the heavy isotope, but when the isotope is given only in the carbon dioxide it is not. What does this show?',
  right: 'The oxygen released in photosynthesis comes from water.',
  wrong: ['The oxygen released comes from carbon dioxide.', 'Oxygen is made in the Calvin cycle.', 'Oxygen is released only by the C₄ pathway.'],
  sol: 'Only labelled water gives labelled oxygen, so the oxygen comes from the splitting of water at photosystem II — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('cyclic-mcq', mcq({
  stem: 'A leaf is lit only with far-red light of wavelength beyond 680 nm. Which product can the chloroplasts still make?',
  right: 'ATP, by cyclic photophosphorylation through photosystem I',
  wrong: ['NADPH, by non-cyclic flow through both photosystems', 'Oxygen, by the splitting of water', 'Glucose, by the light reaction alone'],
  sol: 'Light beyond 680 nm excites PS I but not PS II, so only cyclic flow occurs: ATP is made, with no water splitting, oxygen or NADPH — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('nadpr-mcq', mcq({
  stem: 'Where is NADP reductase located, and what does it do?',
  right: 'On the stroma side of the thylakoid membrane; it reduces NADP⁺ to NADPH',
  wrong: ['On the lumen side of the thylakoid membrane; it splits water', 'In the stroma lamellae only; it makes ATP', 'In the outer membrane; it fixes carbon dioxide'],
  sol: 'NADP reductase works on the stroma side, using electrons from ferredoxin and protons from the stroma to form NADPH — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('cf0-mcq', mcq({
  stem: 'In ATP synthase of the thylakoid membrane, the transmembrane channel through which protons flow is called',
  right: 'CF₀',
  wrong: ['CF₁', 'P680', 'RuBisCO'],
  sol: 'CF₀ is the transmembrane channel; the CF₁ knob protrudes on the stroma side and changes its shape to make ATP — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('zorder-mcq', mcq({
  stem: 'Which sequence correctly lists the carriers that an electron meets after leaving photosystem II in non-cyclic flow?',
  right: 'Plastoquinone, cytochrome b₆f, plastocyanin, photosystem I, ferredoxin',
  wrong: ['Cytochrome b₆f, plastoquinone, plastocyanin, photosystem I, ferredoxin', 'Plastoquinone, plastocyanin, cytochrome b₆f, ferredoxin, photosystem I', 'Ferredoxin, plastoquinone, cytochrome b₆f, plastocyanin, photosystem I'],
  sol: 'The order in the Z scheme is PS II, plastoquinone, cytochrome b₆f, plastocyanin, PS I, ferredoxin and NADP reductase — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('leaky-mcq', mcq({
  stem: 'Isolated illuminated thylakoids are treated with a chemical that makes their membranes freely leaky to protons. Electron flow continues but ATP synthesis stops. Which idea does this support?',
  right: 'ATP synthesis depends on a proton gradient across the membrane (chemiosmosis).',
  wrong: ['ATP is made directly by the splitting of water.', 'ATP is made by the Calvin cycle, not the light reaction.', 'NADPH must be present for ATP to be made.'],
  sol: 'Removing the proton gradient stops ATP synthesis even though electrons still flow, which supports the chemiosmotic hypothesis — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('p680-mcq', mcq({
  stem: 'The reaction centre of photosystem II is a chlorophyll a molecule that absorbs light best at',
  right: '680 nm, and is called P680',
  wrong: ['700 nm, and is called P700', '450 nm, and is called P450', '560 nm, and is called P560'],
  sol: 'The reaction centre of PS II is P680; that of PS I is P700 — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
{
  const lettered = svgV(THYLAKOID_LETTERED, 'Thylakoid membrane with five protein complexes labelled A to E, lumen above and stroma below');
  add('thylet-mcq', mcq({
    stem: 'The figure shows a thylakoid membrane with lumen above and stroma below, and five complexes labelled A to E. Which letter marks the complex that splits water and releases oxygen into the lumen?',
    right: 'D',
    wrong: ['A', 'B', 'C'],
    sol: 'Complex D is photosystem II, the first photosystem in the electron path, which splits water on the lumen side. A is ATP synthase, B photosystem I, C the cytochrome b₆f complex and E NADP reductase — option (@K).',
    assets: [lettered], d: 2, c: 'application', t: [2],
  }));
  add('thylatp-mcq', mcq({
    stem: 'In the same figure, which letter marks the complex through which protons flow out of the lumen and which makes ATP?',
    right: 'A',
    wrong: ['B', 'C', 'E'],
    sol: 'Complex A, with a channel in the membrane and a knob on the stroma side, is ATP synthase — option (@K).',
    assets: [lettered], d: 2, c: 'application', t: [2],
  }));
}
add('cyclic-ar', ar({
  a: 'Cyclic photophosphorylation produces no NADPH.',
  r: 'In cyclic flow the excited electrons return to photosystem I instead of reaching NADP⁺.',
  key: 'a',
  sol: 'Both statements are true, and because the electrons return to PS I they never reach NADP⁺, so no NADPH forms — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('oxygen-ar', ar({
  a: 'The oxygen released in photosynthesis comes from carbon dioxide.',
  r: 'Splitting of water at photosystem II replaces the electrons lost by the reaction centre P680.',
  key: 'd',
  sol: 'A is false: the oxygen comes from the splitting of water. R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('chemi-ar', ar({
  a: 'During the light reaction protons accumulate in the lumen of the thylakoids.',
  r: 'NADP reductase releases protons into the lumen when it reduces NADP⁺.',
  key: 'c',
  sol: 'A is true. R is false: NADP reductase takes up protons from the stroma, which lowers the proton concentration there; the lumen gains protons from water splitting and from plastoquinone — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('ps1-tf', tf({
  stem: 'Photosystem I is found only in the grana thylakoids, and is absent from the stroma lamellae.',
  key: 'f',
  sol: 'False. The stroma lamellae have photosystem I (and carry out cyclic flow) but lack photosystem II and NADP reductase.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('plasto-fill', fill({
  stem: 'In the Z scheme the electron carrier that passes electrons from the cytochrome b₆f complex to photosystem I is ______.',
  acc: [['plastocyanin', 'Plastocyanin']],
  sol: 'Plastocyanin.',
  d: 2, c: 'recall', t: [2],
}));
add('light-match', match({
  stem: 'Match each component of the thylakoid membrane (column I) with its role (column II).',
  pairs: [
    ['Photosystem II', 'Splits water, releasing protons, electrons and oxygen in the lumen'],
    ['Plastoquinone', 'Carries electrons and moves protons from stroma to lumen'],
    ['NADP reductase', 'Reduces NADP⁺ to NADPH using protons from the stroma'],
    ['ATP synthase', 'Makes ATP as protons flow out through its channel'],
  ],
  order: [3, 0, 2, 1],
  sol: 'PS II splits water; plastoquinone carries electrons and protons; NADP reductase makes NADPH on the stroma side; ATP synthase makes ATP from the proton gradient.',
  d: 2, c: 'understanding', t: [2],
}));
add('o2water-num', num({
  stem: 'During a burst of light, 24 water molecules are split in a chloroplast. How many oxygen molecules are released?',
  value: N.o2from24,
  sol: r`Each $2\,\text{H}_2\text{O}$ gives one $\text{O}_2$, so $\dfrac{24}{2} = ${N.o2from24}$ oxygen molecules.`,
  scheme: [[`${N.o2from24}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 12 || 'value');
add('nadphe-num', num({
  stem: 'The splitting of 24 water molecules releases 4 electrons for every 2 water molecules. If every electron goes to NADP⁺ and each NADPH takes 2 electrons, how many NADPH can be made?',
  value: N.nadphFrom48,
  sol: r`Electrons $= 24 \times 2 = ${N.e24}$, since each water gives 2; NADPH $= \dfrac{${N.e24}}{2} = ${N.nadphFrom48}$.`,
  scheme: [[`${N.e24} electrons`, 0.5], [`${N.nadphFrom48} NADPH`, 0.5]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 24 || 'value');
add('proton-num', num({
  stem: 'Splitting two water molecules gives four protons. How many protons are released into the lumen by the splitting of 6 water molecules?',
  value: N.h6,
  sol: r`$\dfrac{6}{2} \times 4 = ${N.h6}$ protons.`,
  scheme: [[`${N.h6}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 12 || 'value');
add('cyclic-short', short({
  marks: 2,
  stem: 'State two differences between cyclic and non-cyclic photophosphorylation.',
  model: '**Non-cyclic** photophosphorylation uses **both photosystems** and the electrons pass from water to NADP⁺, giving **ATP, NADPH and oxygen**. **Cyclic** photophosphorylation uses **only photosystem I**; the electrons **return to PS I** and only **ATP** is made, with no water splitting, oxygen or NADPH.',
  sol: 'Photosystems and products.',
  scheme: [['Photosystems and electron path', 1], ['Products', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('whyatp-short', short({
  marks: 2,
  stem: 'Why can the light reaction go on making ATP in far-red light that cannot support oxygen release?',
  model: 'Far-red light of wavelength beyond 680 nm **excites photosystem I but not photosystem II**. Only **cyclic photophosphorylation** can occur: the electrons circulate through PS I and the cytochrome complex and **ATP is made**. With PS II idle there is **no water splitting and no oxygen**.',
  sol: 'Only PS I excited; cyclic flow.',
  scheme: [['Only PS I is excited beyond 680 nm', 1], ['Cyclic flow makes ATP; no water splitting or oxygen', 1]],
  d: 3, c: 'application', t: [2],
}));
add('protongrad-short', short({
  marks: 2,
  stem: 'Name the three events that raise the proton concentration in the thylakoid lumen relative to the stroma.',
  model: 'First, **splitting of water** inside the lumen releases protons. Second, the carrier **plastoquinone** takes protons from the stroma and releases them in the lumen as it passes electrons on. Third, **NADP reductase** uses protons from the stroma to reduce NADP⁺, **lowering the stroma concentration** further.',
  sol: 'Three events.',
  scheme: [['Water splitting; plastoquinone', 1.5], ['NADP reductase uses stromal protons', 0.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('chemi-short', short({
  marks: 3,
  stem: 'Explain the chemiosmotic hypothesis of ATP synthesis in the thylakoid, naming the parts of ATP synthase.',
  model: 'As electrons flow, **protons accumulate in the lumen**, building a **gradient** across the thylakoid membrane. **ATP synthase** has a transmembrane channel, **CF₀**, and a knob, **CF₁**, on the stroma side. Protons flow back down their gradient through CF₀; the **breakdown of the gradient** releases energy that causes a **conformational change in CF₁**, which makes **ATP** from ADP and phosphate.',
  sol: 'Gradient; CF0 and CF1; ATP formation.',
  scheme: [['Proton gradient across the membrane', 1], ['CF₀ channel and CF₁ knob', 1], ['Gradient breakdown changes CF₁; ATP made', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('zscheme-short', short({
  marks: 3,
  stem: 'Describe how the two photosystems work together in non-cyclic photophosphorylation, and state the final products.',
  model: 'In **PS II** (P680) light excites electrons, which pass **downhill** through plastoquinone, the cytochrome b₆f complex and plastocyanin to **PS I**. Water splitting replaces the lost electrons. In **PS I** (P700) light excites the electrons again; they pass through ferredoxin to **NADP reductase**, which makes **NADPH**. The products are **ATP, NADPH and oxygen**.',
  sol: 'PS II to PS I to NADP.',
  scheme: [['PS II excitation and downhill transfer', 1], ['PS I excitation to NADP reductase', 1], ['Products', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('light-long', long({
  stem: 'Describe the light reaction of photosynthesis. Include the photosystems, non-cyclic electron flow, the source of oxygen, how ATP is made by chemiosmosis, and how cyclic flow differs.',
  model: 'Pigments are organised in **photosystems I and II**, each with an antenna of pigment molecules and a chlorophyll a **reaction centre**: **P700** in PS I and **P680** in PS II.\n\n**Non-cyclic flow (Z scheme).** Light excites PS II; electrons pass downhill through plastoquinone, cytochrome b₆f and plastocyanin to PS I, excited again, and then through ferredoxin to **NADP reductase**, which makes **NADPH**. Electrons lost by PS II are replaced by **splitting of water**, the source of the **oxygen**.\n\n**Chemiosmosis.** Water splitting, proton transport by plastoquinone and use of stromal protons by NADP reductase build a **proton gradient** in the lumen. Protons flow out through **CF₀** of **ATP synthase**; CF₁ changes shape and makes **ATP**.\n\n**Cyclic flow** uses **PS I only**; electrons return to PS I, making **ATP alone**.',
  sol: 'Photosystems, Z scheme, oxygen, chemiosmosis, cyclic.',
  scheme: [['Photosystems and reaction centres', 1], ['Non-cyclic electron flow and NADPH', 1.5], ['Water as source of oxygen', 0.5], ['Chemiosmosis and ATP synthase', 1], ['Cyclic flow', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 Calvin cycle, C4 pathway, photorespiration
add('calvin-mcq', mcq({
  stem: 'How many ATP molecules does the Calvin cycle need to fix one molecule of carbon dioxide?',
  right: String(CALVIN.atpPerCO2),
  wrong: ['2', '5', '6'],
  sol: `Two ATP for the reduction of PGA and one ATP to regenerate RuBP make ${CALVIN.atpPerCO2} ATP per CO₂ — option (@K).`,
  d: 2, c: 'recall', t: [3],
}), () => CALVIN.atpPerCO2 === 3 || 'value');
add('c4-mcq', mcq({
  stem: 'In a C₄ plant such as maize, the enzyme RuBisCO and the Calvin cycle are found in',
  right: 'the bundle sheath cells only',
  wrong: ['the mesophyll cells only', 'both mesophyll and bundle sheath cells equally', 'the guard cells of the stomata'],
  sol: 'Mesophyll cells fix CO₂ with PEP carboxylase; the C₄ acid releases CO₂ in the bundle sheath cells, where RuBisCO and the Calvin cycle operate — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('firstprod-mcq', mcq({
  stem: 'A scientist exposes algae to radioactive CO₂ for a few seconds and finds the label first in a three-carbon acid. Which acid is it?',
  right: '3-phosphoglyceric acid (PGA)',
  wrong: ['Oxaloacetic acid', 'Phosphoenol pyruvate', 'Malic acid'],
  sol: 'The first stable product of CO₂ fixation in the Calvin cycle is the 3-carbon PGA; oxaloacetic acid and malic acid are 4-carbon acids of the C₄ pathway, and PEP is the 3-carbon acceptor — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('pepacc-mcq', mcq({
  stem: 'In the mesophyll cells of a C₄ plant, the primary acceptor of carbon dioxide is',
  right: 'phosphoenol pyruvate (PEP), a 3-carbon compound',
  wrong: ['ribulose bisphosphate (RuBP), a 5-carbon compound', 'oxaloacetic acid, a 4-carbon compound', 'pyruvate, a 3-carbon compound formed in the bundle sheath'],
  sol: 'PEP is the primary CO₂ acceptor of C₄ plants, acted on by PEP carboxylase; RuBP is the acceptor in the Calvin cycle — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('regen-mcq', mcq({
  stem: 'Which stage of the Calvin cycle uses ATP but no NADPH?',
  right: 'Regeneration of RuBP',
  wrong: ['Carboxylation of RuBP', 'Reduction of PGA', 'Splitting of water'],
  sol: 'Regeneration of RuBP needs one ATP per CO₂; reduction needs both ATP and NADPH; carboxylation needs neither — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('hotfield-mcq', mcq({
  stem: 'On a hot, bright afternoon the maize in a field keeps growing faster than the wheat beside it. Which statement explains this best?',
  right: 'Maize concentrates CO₂ at RuBisCO and has no photorespiration, so it loses less fixed carbon.',
  wrong: ['Maize has no Calvin cycle and so needs no ATP.', 'Maize uses the light reaction without photosystem II.', 'Maize closes its stomata fully, so no water is lost and no CO₂ is needed.'],
  sol: 'C₄ plants avoid photorespiration because CO₂ is concentrated in the bundle sheath, and they have a higher temperature optimum — option (@K).',
  d: 3, c: 'application', t: [3, 4],
}));
add('phosphoglyc-mcq', mcq({
  stem: 'A C₃ leaf in a closed bright chamber uses up the CO₂ until the gas inside has little CO₂ and plenty of O₂. A product that now begins to form from RuBP is',
  right: 'phosphoglycolate, a 2-carbon compound',
  wrong: ['oxaloacetic acid, a 4-carbon compound', 'two molecules of PGA only', 'glucose, directly'],
  sol: 'In a high O₂, low CO₂ situation RuBisCO binds O₂, and RuBP gives one PGA and one phosphoglycolate (2C) instead of two PGA — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => 5 === 3 + 2 || 'carbon');
add('kranz-mcq', mcq({
  stem: 'Which feature belongs to the leaf anatomy of C₄ plants?',
  right: 'Large bundle sheath cells with thick walls around the vascular bundles',
  wrong: ['No bundle sheath cells, with mesophyll touching the veins', 'Thin-walled bundle sheath cells with many air spaces', 'Chloroplasts in guard cells only'],
  sol: 'Kranz anatomy: large, thick-walled bundle sheath cells, impervious to gases and without intercellular spaces, surround the vascular bundles — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('rubisco-mcq', mcq({
  stem: 'RuBisCO is called an oxygenase as well as a carboxylase because',
  right: 'its active site can bind O₂ as well as CO₂, depending on their relative concentrations',
  wrong: ['it releases O₂ during the splitting of water', 'it works only in the dark and only in the presence of O₂', 'it is found only in mitochondria, where O₂ is used'],
  sol: 'The same active site binds CO₂ (carboxylation) or O₂ (oxygenation), which starts photorespiration — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('turnsc-mcq', mcq({
  stem: `In three turns of the Calvin cycle, ${TURN.rubp} RuBP molecules combine with 3 CO₂ molecules. How many carbon atoms are in the PGA formed?`,
  right: '18',
  wrong: ['15', '9', '6'],
  sol: 'Three RuBP (3 × 5 = 15 carbons) plus 3 CO₂ (3 carbons) give 18 carbons, in 6 molecules of 3-carbon PGA — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => TURN.carbonIn === 18 || 'carbon');
add('c4-ar', ar({
  a: 'C₄ plants show no photorespiration.',
  r: 'RuBisCO is present in both the mesophyll and bundle sheath cells of C₄ plants.',
  key: 'c',
  sol: 'A is true because CO₂ is concentrated at RuBisCO in the bundle sheath. R is false: RuBisCO is found only in the bundle sheath cells — option (c).',
  d: 3, c: 'understanding', t: [3],
}));
add('photoresp-ar', ar({
  a: 'Photorespiration is considered a wasteful process.',
  r: 'In photorespiration no sugar, ATP or NADPH is made and CO₂ is released.',
  key: 'a',
  sol: 'Both statements are true, and R explains A: the pathway uses energy and loses CO₂ without any gain — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('rubisco-tf', tf({
  stem: 'RuBisCO is the enzyme that fixes CO₂ onto RuBP in the stroma.',
  key: 't',
  sol: 'True. RuBisCO catalyses carboxylation of RuBP to give two molecules of PGA.',
  d: 1, c: 'recall', t: [3],
}));
add('oaa-fill', fill({
  stem: 'The first stable product of CO₂ fixation in C₄ plants is the 4-carbon acid ______.',
  acc: [['oxaloacetic acid', 'oxaloacetate', 'OAA', 'oxaloacetic acid (OAA)']],
  sol: 'Oxaloacetic acid (OAA), formed by PEP carboxylase.',
  d: 1, c: 'recall', t: [3],
}));
add('calvin-match', match({
  stem: 'Match each item of the Calvin cycle (column I) with its description (column II).',
  pairs: [
    ['Carboxylation', 'RuBP combines with CO₂, catalysed by RuBisCO'],
    ['Reduction', '2 ATP and 2 NADPH used for each CO₂ fixed'],
    ['Regeneration', '1 ATP used for each CO₂ fixed to remake RuBP'],
    ['First stable product', 'A 3-carbon acid, PGA'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Carboxylation: RuBP plus CO₂ with RuBisCO; reduction: 2 ATP and 2 NADPH; regeneration: 1 ATP; the first stable product is PGA.',
  d: 2, c: 'understanding', t: [3],
}));
add('atp12-num', num({
  stem: 'How many ATP molecules are needed to fix 12 molecules of CO₂ in a C₃ plant, using the textbook figure of 3 ATP per CO₂?',
  value: N.atp12,
  sol: r`$12 \times ${CALVIN.atpPerCO2} = ${N.atp12}$ ATP.`,
  scheme: [[`${N.atp12} ATP`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === atpFor(12) || 'value');
add('nadph15-num', num({
  stem: 'How many NADPH molecules are used in the Calvin cycle to fix 15 molecules of CO₂?',
  value: N.nadph15,
  sol: r`$15 \times ${CALVIN.nadphPerCO2} = ${N.nadph15}$ NADPH.`,
  scheme: [[`${N.nadph15} NADPH`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === nadphFor(15) || 'value');
add('turns4-num', num({
  stem: 'How many turns of the Calvin cycle are needed to make 4 molecules of glucose?',
  value: N.turns4glucose,
  sol: r`One glucose needs 6 turns, so $4 \times 6 = ${N.turns4glucose}$ turns.`,
  scheme: [[`${N.turns4glucose} turns`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === turnsForGlucose(4) || 'value');
add('glucose30-num', num({
  stem: 'A leaf fixes 30 molecules of CO₂ into sugar in the Calvin cycle. How many molecules of glucose could be made from this carbon?',
  value: N.glucoseFrom30,
  sol: r`Each glucose has 6 carbons from 6 CO$_2$, so $\dfrac{30}{6} = ${N.glucoseFrom30}$ glucose.`,
  scheme: [[`${N.glucoseFrom30}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === glucoseFromCo2Mol(30) || 'value');
add('c4atp-num', num({
  stem: 'A C₄ plant needs 5 ATP for each CO₂ fixed. How many ATP does it need to fix 9 molecules of CO₂?',
  value: N.atp9c4,
  sol: r`$9 \times ${C4.atpPerCO2} = ${N.atp9c4}$ ATP.`,
  scheme: [[`${N.atp9c4} ATP`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === atpFor(9, 'c4') || 'value');
add('co2mass-num', num({
  stem: 'Glucose has a molar mass of 180 g and carbon dioxide 44 g. Using the equation in which 6 CO₂ give 1 glucose, how many grams of CO₂ are needed to make 9 g of glucose?',
  value: N.co2For9g, tol: 0.05, unit: 'g',
  sol: r`9 g is $\dfrac{9}{180} = 0.05$ mol of glucose, which needs $0.05 \times 6 = 0.3$ mol of CO$_2$, that is $0.3 \times 44 = ${N.co2For9g}$ g.`,
  scheme: [['0.05 mol glucose; 0.3 mol CO₂', 0.5], [`${N.co2For9g} g`, 0.5]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 13.2 || 'value');
add('kranz-short', short({
  marks: 2,
  stem: 'What is Kranz anatomy? Name two of its features.',
  model: '**Kranz anatomy** is the special leaf anatomy of C₄ plants. Large **bundle sheath cells** surround the vascular bundles, with **thick walls impervious to gaseous exchange** and **no intercellular spaces**. It allows CO₂ to be concentrated in the bundle sheath cells.',
  sol: 'Definition; two features.',
  scheme: [['Bundle sheath cells around vascular bundles', 1], ['Thick, gas-tight walls; no intercellular spaces', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('rubiscoO-short', short({
  marks: 2,
  stem: 'Why does a C₃ plant lose some of its fixed carbon on a hot, dry day with its stomata partly closed? Name the enzyme involved.',
  model: 'With stomata partly closed, **CO₂ inside the leaf falls and O₂ rises**. The enzyme **RuBisCO** then binds **O₂ instead of CO₂**, so RuBP gives **phosphoglycolate and one PGA** and CO₂ is released: **photorespiration**, in which no sugar, ATP or NADPH is made.',
  sol: 'RuBisCO oxygenase action.',
  scheme: [['Low CO₂, high O₂; RuBisCO binds O₂', 1], ['Photorespiration: no sugar, CO₂ released', 1]],
  d: 3, c: 'application', t: [3, 4],
}));
add('regencost-short', short({
  marks: 2,
  stem: 'State the three stages of the Calvin cycle and the number of ATP and NADPH molecules used per CO₂ fixed.',
  model: 'The stages are **carboxylation, reduction and regeneration**. Reduction needs **2 ATP and 2 NADPH** per CO₂, and regeneration of RuBP needs **1 ATP**. So each CO₂ fixed costs **3 ATP and 2 NADPH**.',
  sol: 'Three stages; 3 ATP and 2 NADPH.',
  scheme: [['Three stages named', 1], ['3 ATP and 2 NADPH per CO₂', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('c4path-short', short({
  marks: 3,
  stem: 'Describe how CO₂ is fixed in a C₄ plant, mentioning the two kinds of cell, the enzymes and the first product.',
  model: 'In **mesophyll cells** the enzyme **PEP carboxylase** fixes CO₂ onto **PEP** (3C) to form **oxaloacetic acid** (4C), which is converted to malic or aspartic acid. These **4-carbon acids move to the bundle sheath cells** and break down, releasing **CO₂** and a 3-carbon molecule. The CO₂ enters the **Calvin cycle** with **RuBisCO**, and the 3-carbon molecule returns to the mesophyll to regenerate PEP.',
  sol: 'PEPcase in mesophyll; transfer; Calvin cycle in bundle sheath.',
  scheme: [['PEP carboxylase fixes CO₂ on PEP to OAA in mesophyll', 1], ['4C acids go to bundle sheath and release CO₂', 1], ['Calvin cycle; 3C molecule returns', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('c3c4-short', short({
  marks: 3,
  stem: 'Give three differences between C₃ and C₄ plants.',
  model: 'In **C₃ plants** the first stable product is the 3-carbon **PGA**, there is **no Kranz anatomy**, **photorespiration occurs**, and the temperature optimum is lower. In **C₄ plants** the first product is the 4-carbon **oxaloacetic acid**, there is **Kranz anatomy** with the Calvin cycle in bundle sheath cells, **photorespiration is absent**, the **temperature optimum is higher** and productivity is greater.',
  sol: 'Three contrasting features.',
  scheme: [['First product and CO₂ acceptor', 1], ['Anatomy', 1], ['Photorespiration or temperature or productivity', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('photoresp-short', short({
  marks: 3,
  stem: 'What is photorespiration? Explain why it is wasteful and why C₄ plants do not show it.',
  model: '**Photorespiration** is the pathway that begins when **RuBisCO binds O₂** in place of CO₂ at high O₂ and low CO₂, so RuBP gives **PGA and phosphoglycolate**. It is **wasteful** because **no sugar, ATP or NADPH** is made and **CO₂ is released**. **C₄ plants** avoid it because they **concentrate CO₂ at RuBisCO** in the bundle sheath cells, so O₂ cannot compete.',
  sol: 'Definition; waste; absence in C4.',
  scheme: [['RuBisCO binds O₂; PGA and phosphoglycolate', 1], ['No sugar, ATP or NADPH; CO₂ released', 1], ['C₄ plants concentrate CO₂', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('calvin-long', long({
  stem: 'Describe the Calvin cycle in three stages. State the enzyme of the first stage, the ATP and NADPH used per CO₂, and the totals for making one glucose.',
  model: 'The **Calvin cycle** takes place in the **stroma**.\n\n**Carboxylation:** CO₂ combines with **RuBP** (5C), catalysed by **RuBisCO**, to give two molecules of **PGA** (3C), the first stable product.\n\n**Reduction:** PGA is phosphorylated and reduced to **triose phosphate (G3P)**, using **2 ATP and 2 NADPH** for each CO₂ fixed.\n\n**Regeneration:** RuBP is regenerated so the cycle continues; this needs **1 ATP** per CO₂.\n\nSo each CO₂ costs **3 ATP and 2 NADPH**. One glucose needs **6 turns**, that is **18 ATP and 12 NADPH**. In three turns, 3 RuBP and 3 CO₂ give 6 PGA and then 6 G3P; five of these regenerate 3 RuBP and one is the net gain.',
  sol: 'Three stages with enzyme and totals.',
  scheme: [['Carboxylation with RuBisCO and PGA', 1.5], ['Reduction with 2 ATP and 2 NADPH', 1], ['Regeneration with 1 ATP', 1], ['Totals: 3 and 2 per CO₂; 18 and 12 per glucose', 1.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [3],
}));
add('c4-long', long({
  stem: 'A student says that C₄ plants have no Calvin cycle. Evaluate this claim by describing the C₄ pathway and the leaf anatomy that supports it, and give two advantages of C₄ plants.',
  model: '**The claim is wrong.** C₄ plants fix CO₂ twice and the Calvin cycle still operates.\n\n**Anatomy.** Kranz anatomy: large **bundle sheath cells** with thick, gas-tight walls and no intercellular spaces surround the vascular bundles.\n\n**Pathway.** In the **mesophyll cells** **PEP carboxylase** fixes CO₂ onto **PEP** (3C) to form **oxaloacetic acid** (4C), converted to malic or aspartic acid. These move to the **bundle sheath cells** and release **CO₂** and a 3-carbon molecule. The CO₂ enters the **Calvin cycle**, with **RuBisCO** present only here, and the 3-carbon molecule returns to regenerate PEP.\n\n**Advantages.** C₄ plants have **no photorespiration**, a **higher temperature optimum** and respond to high light, giving **greater productivity**.',
  sol: 'Claim rejected; anatomy; pathway; advantages.',
  scheme: [['Claim judged wrong', 0.5], ['Kranz anatomy', 1], ['PEP carboxylase, OAA, transfer, release of CO₂', 2], ['Calvin cycle in bundle sheath', 0.5], ['Two advantages', 1]],
  wl: [80, 240],
  d: 3, c: 'evaluation', t: [3],
}));

// ---------------------------------------------------------------- t04 factors affecting photosynthesis
add('limit-mcq', mcq({
  stem: 'A student doubles the light falling on a leaf in a chamber, but the rate of photosynthesis does not change. The most probable explanation is that',
  right: 'another factor, such as CO₂ concentration, is now limiting the rate',
  wrong: ['light has no effect on photosynthesis', 'photosynthesis has stopped because the leaf is too bright', 'chlorophyll absorbs light only in the dark'],
  sol: 'By Blackman’s law the rate is set by the factor nearest its minimum; if more light changes nothing, light is no longer limiting and another factor, such as CO₂, is — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('blackman-mcq', mcq({
  stem: 'According to Blackman’s law of limiting factors, when a process depends on several factors its rate is set by',
  right: 'the factor nearest to its minimum value',
  wrong: ['the factor present in the greatest amount', 'the sum of all the factors', 'the factor that was supplied first'],
  sol: 'The rate is determined by the factor that is nearest to its minimal value — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('greenhouse-mcq', mcq({
  stem: 'Growers of tomato and bell pepper in greenhouses sometimes enrich the air with carbon dioxide. This raises yield because',
  right: 'the CO₂ in ordinary air limits photosynthesis of these C₃ plants',
  wrong: ['CO₂ replaces light as the energy source', 'CO₂ closes the stomata and saves water', 'CO₂ makes the Calvin cycle unnecessary'],
  sol: 'C₃ plants respond to CO₂ increases up to about 450 µL per L, so the present level is limiting for them — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('sat-mcq', mcq({
  stem: 'For most plants, light saturation of photosynthesis is reached at about',
  right: '10 percent of full sunlight',
  wrong: ['1 percent of full sunlight', '50 percent of full sunlight', '100 percent of full sunlight'],
  sol: 'Light saturation occurs at about 10 percent of full sunlight, except in shade plants — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('stomata-mcq', mcq({
  stem: 'During a long drought a crop is not short of light or warmth, yet its rate of photosynthesis falls. The chief reason is that',
  right: 'water stress closes the stomata and cuts the supply of CO₂',
  wrong: ['water is the raw material of the Calvin cycle and runs out', 'water stress raises the CO₂ concentration inside the leaf', 'chlorophyll is destroyed within a day of water stress'],
  sol: 'Water stress closes stomata, reducing CO₂ availability, and wilting also reduces leaf area — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('tempopt-mcq', mcq({
  stem: 'A C₃ crop and a C₄ crop are grown together as the day warms from 25 °C to 40 °C. Which result is expected?',
  right: 'The C₄ crop keeps a higher rate because its temperature optimum is higher.',
  wrong: ['The C₃ crop keeps a higher rate because it has Kranz anatomy.', 'Both crops stop photosynthesis at exactly the same temperature.', 'The rate of the C₄ crop falls because it has photorespiration.'],
  sol: 'C₄ plants respond to higher temperatures and have a higher temperature optimum than C₃ plants — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('graph-mcq', mcq({
  stem: `In the model of the graph (rate in arbitrary units), a leaf at 25 °C with CO₂ at 300 µL per L gives a rate of ${rate(10, 300)} at 10 percent light. Which change raises the rate?`,
  right: 'Raising CO₂ to 450 µL per L',
  wrong: ['Raising light from 10 to 20 percent', 'Lowering the temperature from 25 °C to 20 °C', 'Raising light from 10 to 40 percent'],
  sol: `At 10 percent light and 300 µL per L, CO₂ is limiting (rate ${rate(10, 300)}); more light does nothing, and raising CO₂ to 450 gives ${rate(10, 450)} — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}), () => rate(10, 450) > rate(10, 300) && rate(40, 300) === rate(10, 300) || 'model');
add('blackman-ar', ar({
  a: 'Raising the light intensity from 15 to 60 percent of full sunlight greatly raises the rate of photosynthesis of a C₃ plant in ordinary air.',
  r: 'The CO₂ concentration of ordinary air is a limiting factor for C₃ plants.',
  key: 'd',
  sol: 'A is false: light saturates near 10 percent of full sunlight, and in ordinary air CO₂ limits the rate. R is true — option (d).',
  d: 3, c: 'understanding', t: [4],
}));
add('ppm-num', num({
  stem: 'The CO₂ concentration of air is about 0.04 percent by volume. Express this in microlitres of CO₂ per litre of air.',
  value: N.ppm004, unit: 'microlitres per litre',
  sol: r`$0.04\% = \dfrac{0.04}{100} \text{ L per L} = 0.0004 \text{ L per L} = ${N.ppm004}$ microlitres per litre.`,
  scheme: [[`${N.ppm004}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => ppm(0.04) === 400 || 'value');
add('rate6-num', num({
  stem: `In the graph model (arbitrary units) the rate of photosynthesis is set by the smallest of three values: light = 4.5 × (light in percent), CO₂ = 0.1 × (CO₂ in µL per L), and a temperature value of 50 at 25 °C. Find the rate at 6 percent light and 450 µL per L CO₂ at 25 °C.`,
  value: N.rate6_450,
  sol: r`Light value $= 4.5 \times 6 = 27$; CO$_2$ value $= 0.1 \times 450 = 45$; temperature value $= 50$. The smallest is $${N.rate6_450}$, so light is limiting.`,
  scheme: [['Three values found', 0.5], [`Rate ${N.rate6_450}`, 0.5]],
  d: 3, c: 'application', t: [4],
}), (q) => rate(6, 450) === 27 || 'value');
add('rate15-num', num({
  stem: 'Using the same model (light value = 4.5 × light in percent; CO₂ value = 0.1 × CO₂ in µL per L; temperature value 50 at 25 °C), find the rate at 15 percent light and 300 µL per L CO₂ at 25 °C.',
  value: N.rate15_300,
  sol: r`Light value $= 4.5 \times 15 = 67.5$; CO$_2$ value $= 0.1 \times 300 = 30$; temperature value $= 50$. The smallest is $${N.rate15_300}$, so CO$_2$ is limiting.`,
  scheme: [['Three values found', 0.5], [`Rate ${N.rate15_300}`, 0.5]],
  d: 3, c: 'application', t: [4],
}), (q) => rate(15, 300) === 30 || 'value');
add('gross-num', num({
  stem: 'A leaf disc in light takes up CO₂ equal to a net photosynthesis of 11 units per hour, while in the dark it releases CO₂ equal to 5 units per hour by respiration. Taking respiration to go on at the same rate in light, what is the gross photosynthesis in units per hour?',
  value: N.gross3,
  sol: r`Gross $=$ net $+$ respiration $= 11 + 5 = ${N.gross3}$ units per hour.`,
  scheme: [[`${N.gross3} units`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === gross(11, 5) || 'value');
add('blackman-short', short({
  marks: 2,
  stem: 'State Blackman’s law of limiting factors and illustrate it with an example.',
  model: '**Blackman’s law** states that if a process is affected by more than one factor, its **rate is determined by the factor nearest its minimal value**. For example, in dim light the rate rises when **light** is increased, but once light is enough, adding more has no effect and the rate is then set by **CO₂ concentration**.',
  sol: 'Statement and example.',
  scheme: [['Statement of the law', 1], ['Example with light and CO₂', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('water-short', short({
  marks: 2,
  stem: 'How does water shortage reduce the rate of photosynthesis, even though water is needed in the light reaction only in small amounts?',
  model: 'Water stress causes the **stomata to close**, which **reduces the CO₂ available** to the leaf. The leaves may also **wilt**, which **reduces the leaf surface area** and metabolic activity, so the rate falls.',
  sol: 'Stomata close; wilting.',
  scheme: [['Stomata close; less CO₂', 1], ['Wilting reduces surface area and metabolism', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('co2c3c4-short', short({
  marks: 3,
  stem: 'Compare the response of C₃ and C₄ plants to increasing CO₂ at high light, and say what this means for crops in greenhouses.',
  model: 'At **high light** both C₃ and C₄ plants raise their rate with more CO₂, but **C₄ plants saturate at about 360 µL per L**, whereas **C₃ plants keep responding up to about 450 µL per L**. Thus the present CO₂ level **limits C₃ plants**. Greenhouse crops such as **tomato and bell pepper** therefore give **higher yields** when the air is enriched with CO₂.',
  sol: 'Saturation points; implication.',
  scheme: [['C₄ saturate near 360', 1], ['C₃ respond to about 450', 1], ['Greenhouse enrichment raises yield', 1]],
  d: 3, c: 'application', t: [4],
}));
add('factors-short', short({
  marks: 3,
  stem: 'Describe the effects of light, temperature and water on the rate of photosynthesis.',
  model: '**Light:** the rate rises with intensity and **saturates at about 10 percent of full sunlight**. **Temperature:** the **dark reactions are enzymatic and temperature sensitive**, and **C₄ plants have a higher optimum** than C₃ plants. **Water:** water stress **closes the stomata**, lowering the supply of CO₂, and wilting reduces the leaf surface.',
  sol: 'Light, temperature and water effects.',
  scheme: [['Light with saturation', 1], ['Temperature and C₄ optimum', 1], ['Water and stomata', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('factors-long', long({
  stem: 'State Blackman’s law of limiting factors and describe how light, carbon dioxide, temperature and water affect the rate of photosynthesis, with the difference between C₃ and C₄ plants.',
  model: '**Blackman’s law (1905):** if a process is affected by more than one factor, its **rate is determined by the factor nearest its minimal value**.\n\n**Light:** the rate rises with intensity and levels off, since other factors then limit; **saturation occurs at about 10 percent of full sunlight**.\n\n**Carbon dioxide:** the major limiting factor, since air has only **0.03 to 0.04 percent**. At high light **C₄ plants saturate at about 360 µL per L**, while **C₃ plants respond up to about 450 µL per L**, which is why greenhouse tomato and bell pepper give more with CO₂ enrichment.\n\n**Temperature:** dark reactions are enzymatic and temperature controlled; **C₄ plants have a higher optimum** than C₃ plants.\n\n**Water:** stress closes stomata, reducing CO₂, and wilting reduces leaf area.',
  sol: 'Law and four factors, C3/C4.',
  scheme: [['Blackman’s law', 1], ['Light with saturation', 1], ['CO₂ with C₃/C₄ response', 1.5], ['Temperature', 1], ['Water', 0.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- cases
{
  const C = N.rfCase;
  add('chromcase-case', mk.case({
    passage: `A student runs an extract of spinach leaves on chromatography paper. After the run the solvent front has moved ${C.front} cm from the origin. She records four bands measured from the origin.\n\n| Band | Colour | Distance from origin (cm) |\n|---|---|---|\n| P | Yellow to yellow-orange | ${C.spots[0]} |\n| Q | Yellow | ${C.spots[1]} |\n| R | Bright or blue green | ${C.spots[2]} |\n| S | Yellow green | ${C.spots[3]} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which band is chlorophyll b?',
        right: 'Band S',
        wrong: ['Band P', 'Band Q', 'Band R'],
        sol: 'Chlorophyll b is the yellow green pigment and travels least, so it is band S — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'Calculate the Rf value of band R, to two decimal places.',
        value: N.rfCaseRf[2], tol: 0.01,
        sol: r`$R_f = \dfrac{${C.spots[2]}}{${C.front}} = ${N.rfCaseRf[2]}$.`,
        scheme: [[`Rf = ${N.rfCaseRf[2]}`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the chief pigment among P to S, and state two functions of the other pigments.',
        model: 'The chief pigment is **chlorophyll a** (band R). The others are **accessory pigments**: they **absorb light and pass the energy to chlorophyll a**, widening the range of wavelengths used, and they **protect chlorophyll a from photo-oxidation**.',
        sol: 'Chlorophyll a; accessory functions.',
        scheme: [['Chlorophyll a named', 0.5], ['Two functions of accessory pigments', 1.5]],
        d: 2, c: 'understanding', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Explain why band P travelled farther than band S, and say what this tells about the two pigments in this solvent.',
          model: 'The Rf value of P is **higher** than that of S, since it moved a **greater share of the solvent’s distance**. This shows that the pigment of P (carotenoids) is **more soluble in the solvent** and less strongly held by the paper than that of S (chlorophyll b).',
          sol: 'Higher solubility, higher Rf.',
          scheme: [['P has a higher Rf', 1], ['More soluble, less held by the paper', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 0.5 || 'value');
}
{
  add('jagendorf-case', mk.case({
    passage: 'A researcher soaks isolated thylakoids in an acidic buffer until the inside of each thylakoid is acidic. She then moves them in the dark to an alkaline buffer containing ADP and phosphate. ATP is formed for a short time, although no light is given and no electrons flow. When the experiment is repeated with a chemical that makes the membrane freely leaky to protons, no ATP forms.',
    d: 4, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'What do these observations show?',
        right: 'A proton gradient across the thylakoid membrane is enough to drive ATP synthesis.',
        wrong: ['Light is needed to make ATP in the thylakoid.', 'ATP is made by NADP reductase.', 'Protons must be carried out of the thylakoid by plastoquinone for ATP to form.'],
        sol: 'ATP formed in the dark with no electron flow, but only when a gradient existed, which supports the chemiosmotic hypothesis — option (@K).',
        d: 3, c: 'analysis', t: [2],
      })),
      part('b', num({
        stem: 'In the living chloroplast, how many protons are released into the lumen by the splitting of 6 water molecules? (Two water molecules give four protons.)',
        value: N.h6,
        sol: r`$\dfrac{6}{2} \times 4 = ${N.h6}$ protons.`,
        scheme: [[`${N.h6} protons`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the part of the thylakoid membrane through which the protons flowed out, and explain how the flow produced ATP.',
        model: 'The protons flowed out through the **CF₀ channel of ATP synthase**. The **breakdown of the proton gradient** released energy that caused a **conformational change in the CF₁ knob**, which then made **ATP** from ADP and phosphate.',
        sol: 'CF0 channel; CF1 changes shape.',
        scheme: [['ATP synthase, CF₀ channel', 1], ['Gradient breakdown changes CF₁; ATP made', 1]],
        d: 3, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Explain why the leaky chemical stops ATP formation in the living chloroplast even though electrons keep flowing.',
          model: 'The chemical **lets protons leak back** across the membrane, so the **proton gradient cannot build up** in the lumen. Without the gradient there is **no energy to drive CF₁ of ATP synthase**, so **no ATP is made**, although electron flow continues.',
          sol: 'No gradient, no ATP.',
          scheme: [['Protons leak; gradient lost', 1], ['No energy for ATP synthase', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 12 || 'value');
}
{
  add('maize-case', mk.case({
    passage: 'On a hot afternoon (about 38 °C, bright sun) a farmer compares maize and wheat grown side by side. The maize leaves show large bundle sheath cells around the veins, while the wheat leaves do not. Measurements show that the maize fixes CO₂ much faster and loses almost none of its fixed carbon, while the wheat loses some of the carbon it has fixed.',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which process accounts for the carbon lost by the wheat?',
        right: 'Photorespiration, started by RuBisCO binding O₂',
        wrong: ['Cyclic photophosphorylation in the stroma lamellae', 'Splitting of water at photosystem II', 'Regeneration of RuBP in the bundle sheath'],
        sol: 'In C₃ plants RuBisCO binds O₂ when CO₂ is low, releasing CO₂ in photorespiration; C₄ plants do not show it — option (@K).',
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: `Maize (C₄) needs 5 ATP and wheat (C₃) 3 ATP per CO₂ fixed. How many more ATP does the maize need than the wheat to fix 18 molecules of CO₂?`,
        value: N.atp18diff,
        sol: r`Maize: $18 \times 5 = ${N.atp18c4}$ ATP; wheat: $18 \times 3 = ${N.atp18c3}$ ATP; difference $= ${N.atp18c4} - ${N.atp18c3} = ${N.atp18diff}$ ATP.`,
        scheme: [['Both totals', 0.5], [`${N.atp18diff} ATP`, 0.5]],
        d: 3, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain how the leaf anatomy of maize helps it avoid losing fixed carbon.',
        model: 'The **large, thick-walled bundle sheath cells** are impervious to gases, so the **CO₂ released from C₄ acids is concentrated around RuBisCO** there. With a high CO₂ concentration at the enzyme, **O₂ cannot compete**, so there is **no photorespiration** and little fixed carbon is lost.',
        sol: 'Kranz anatomy concentrates CO2.',
        scheme: [['Bundle sheath cells concentrate CO₂ at RuBisCO', 1], ['High CO₂ prevents O₂ binding; no photorespiration', 1]],
        d: 3, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Why is the extra ATP cost of the C₄ pathway worthwhile for maize in hot, bright conditions?',
          model: 'The **2 extra ATP per CO₂** are spent to regenerate PEP and concentrate CO₂. In **hot, bright conditions** this avoids **photorespiration** and lets the plant use light fully, so **net productivity is greater** than in a C₃ plant, whose fixed carbon is partly lost.',
          sol: 'Avoids photorespiration; higher productivity.',
          scheme: [['Extra ATP concentrates CO₂', 1], ['Avoids photorespiration; greater productivity', 1]],
          d: 3, c: 'evaluation', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 36 || 'value');
}
{
  const rows = [[5, 450], [10, 300], [10, 450], [20, 450]];
  add('greenhouse-case', mk.case({
    passage: `A grower records the rate of photosynthesis of tomato plants (arbitrary units) in a greenhouse at 25 °C.\n\n| Trial | Light (percent of full sunlight) | CO₂ (µL per L) | Rate |\n|---|---|---|---|\n${rows.map(([L, C], i) => `| ${i + 1} | ${L} | ${C} | ${rate(L, C)} |`).join('\n')}`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which factor is limiting the rate in trial 1?',
        right: 'Light',
        wrong: ['Carbon dioxide', 'Temperature', 'Water'],
        sol: `At 5 percent light the rate is ${rate(5, 450)}; in trial 3, with more light, it is ${rate(10, 450)}, so light is limiting in trial 1 — option (@K).`,
        d: 2, c: 'application', t: [4],
      })),
      part('b', num({
        stem: 'By how much does the rate rise when the CO₂ is increased from 300 to 450 µL per L at 10 percent light (trial 2 to trial 3)?',
        value: rate(10, 450) - rate(10, 300),
        sol: r`$${rate(10, 450)} - ${rate(10, 300)} = ${rate(10, 450) - rate(10, 300)}$ units.`,
        scheme: [[`${rate(10, 450) - rate(10, 300)} units`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why does the rate not rise between trial 3 and trial 4 although the light is doubled?',
        model: 'By **Blackman’s law** the rate is set by the factor **nearest its minimum**. In trial 4 the light is more than enough, so **CO₂ is limiting again**; with the CO₂ unchanged at 450 µL per L, **more light cannot raise the rate**.',
        sol: 'CO2 limiting.',
        scheme: [['Blackman’s law: factor nearest minimum', 1], ['CO₂ limiting; more light has no effect', 1]],
        d: 3, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'Suggest, with a reason, one change that the grower could make to raise the rate beyond trial 4.',
          model: 'Since **CO₂ is limiting** in trial 4, the grower can **enrich the greenhouse air with CO₂**. C₃ plants such as tomato respond to CO₂ up to about 450 µL per L and beyond, so the rate **would rise** until another factor, such as temperature or light, becomes limiting.',
          sol: 'Enrich with CO2.',
          scheme: [['CO₂ enrichment', 1], ['Reason: CO₂ is the limiting factor for C₃ plants', 1]],
          d: 3, c: 'evaluation', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 15 && rows.every(([L, C]) => rate(L, C) > 0) || 'value');
}
