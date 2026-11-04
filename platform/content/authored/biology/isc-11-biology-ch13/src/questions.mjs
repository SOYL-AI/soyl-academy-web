// ISC 11 Biology ch13 Photosynthesis in Higher Plants — question bank in ISC school-examination style.
// Every number is computed in calc.mjs. AR keys (ISC options): b a c d a.
import { mk, add, svgV, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { CHLORO_Q, ENGELMANN, ZSCHEME, CHEMIO, CALVIN_SVG, C4_SVG } from './svgs.mjs';
import { V } from './decks.mjs';
import { GLU, GLU4, CARB3, CARB6, ENG, ENG_RED_PCT, ENG_TOTAL, BUB, BUB_GREEN_PCT, BUB_TOTAL, PREP, PR, PR_LOSS, PR8, CALVIN9, C4_4, C4_EXTRA, TEMP, TEMP_OPT, lumenPh, hFold, GRAD2, LIM, rate, plateauAt, limiting, eq } from './calc.mjs';

const { mcq, ar, fill, num, short, long, part, tf } = mk;
const chloroFig = svgV(CHLORO_Q, 'Unlabelled chloroplast with parts marked A to E');
const engFig = svgV(ENGELMANN, 'Engelmann experiment: bacteria gather at violet-blue and red light on an algal filament');
const zFig = svgV(ZSCHEME, 'Z-scheme of non-cyclic photophosphorylation');
const chemioFig = svgV(CHEMIO, 'Chemiosmosis across the thylakoid membrane');
const calvinFig = svgV(CALVIN_SVG, 'Calvin cycle for three turns');
const c4Fig = svgV(C4_SVG, 'C4 pathway across two cell types');

// ================================================================ t01 pigments, spectra, Engelmann
add('accessory-mcq', mcq({
  stem: 'Which pigment is present in the reaction centres of both photosystems?',
  right: 'Chlorophyll a',
  wrong: ['Chlorophyll b', 'Xanthophyll', 'Carotene'],
  sol: 'Only chlorophyll a occurs in reaction centres; the others are accessory pigments — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('autumn-mcq', mcq({
  stem: 'In autumn the leaves of a deciduous tree turn yellow and orange as chlorophyll breaks down. The colours that become visible are due to',
  right: 'carotenoids and xanthophylls that were masked by chlorophyll',
  wrong: ['a new pigment made only in autumn from chlorophyll b', 'cytochromes released from the thylakoids', 'extra chlorophyll a in the vacuoles'],
  sol: 'Carotenoids and xanthophylls were present all along; the green of chlorophyll hid them — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('action-mcq', mcq({
  stem: 'A student lights a water plant with equal energy of each colour in turn and plots the volume of oxygen released against wavelength. The graph she draws is the',
  right: 'action spectrum of photosynthesis',
  wrong: ['absorption spectrum of chlorophyll a', 'absorption spectrum of carotenoids', 'emission spectrum of the lamp'],
  sol: 'A graph of the rate of photosynthesis against wavelength is an action spectrum — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('site-mcq', mcq({
  stem: 'Which pair correctly matches a phase of photosynthesis with its site in the chloroplast?',
  right: 'Light reaction: thylakoid membranes; Calvin cycle: stroma',
  wrong: ['Light reaction: stroma; Calvin cycle: thylakoid membranes', 'Light reaction: outer membrane; Calvin cycle: inner membrane', 'Light reaction: stroma; Calvin cycle: stroma'],
  sol: 'Pigments and photosystems are in the thylakoid membranes; the Calvin enzymes are in the stroma — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('engel-check', mcq({
  stem: 'In Engelmann’s experiment, aerobic bacteria were used because they',
  right: 'move towards regions where oxygen is released most',
  wrong: ['make oxygen in the light', 'absorb red light strongly', 'feed on chlorophyll'],
  sol: 'Aerobic bacteria gather where oxygen is plentiful, marking the regions of fastest photosynthesis — option (@K).',
  d: 2, c: 'understanding', t: [1],
  assets: [engFig],
}));
add('chloro-fig-mcq', mcq({
  stem: 'In the figure of a chloroplast, which letter marks the region that contains the enzymes of the Calvin cycle?',
  right: 'E',
  wrong: ['A', 'C', 'D'],
  sol: 'The Calvin cycle enzymes are in the fluid stroma, marked E — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [chloroFig],
}));
add('chloro-fig2-mcq', mcq({
  stem: 'In the same figure, which pair of letters marks the two membranes of the chloroplast envelope?',
  right: 'A and B',
  wrong: ['B and C', 'C and D', 'A and E'],
  sol: 'A is the outer and B the inner envelope membrane; C is a granum, D a stroma lamella and E the stroma — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [chloroFig],
}));
add('carot-tf', tf({
  stem: 'Carotenoids protect chlorophyll molecules from photo-oxidation in strong light.',
  key: 't',
  sol: 'True: carotenoids absorb excess energy and protect chlorophyll from damage.',
  d: 2, c: 'understanding', t: [1],
}));
{
  const redPct = ENG_RED_PCT;
  add('engpct-num', num({
    stem: `In a repeat of Engelmann’s experiment, bacteria were counted along the filament under three colour bands: ${ENG.map(([n, k]) => `${n} ${k}`).join(', ')}. What percentage of all the bacteria was found under the red band? (One decimal place.)`,
    value: redPct, tol: 0.05, unit: '%',
    sol: r`Total $= ${ENG_TOTAL}$; $\dfrac{${ENG[2][1]}}{${ENG_TOTAL}} \times 100 = ${redPct}$ percent.`,
    scheme: [[`${redPct}`, 1]],
    d: 2, c: 'application', t: [1],
  }), (q) => q.answer.value === 43.3 || 'value');
}
add('xanth-ar', ar({
  a: 'Xanthophylls are accessory pigments of photosynthesis.',
  r: 'Xanthophylls are yellow in colour.',
  key: 'b',
  sol: 'Both statements are true, but the yellow colour does not explain why xanthophylls are accessory pigments (they pass energy on and protect chlorophyll) — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('green-reason', short({
  marks: 1,
  stem: 'Give a reason: A healthy leaf looks green.',
  model: 'Chlorophylls absorb mostly violet-blue and red light and reflect or transmit green light.',
  sol: 'Green is weakly absorbed.',
  scheme: [['Absorb blue and red, reflect green', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('absact-short', short({
  marks: 2,
  stem: 'Distinguish between an absorption spectrum and an action spectrum.',
  model: 'An **absorption spectrum** is a graph of the **amount of light absorbed** by a pigment against **wavelength**. An **action spectrum** is a graph of the **rate of photosynthesis** (for example oxygen released) against wavelength. The action spectrum follows the combined absorption of the pigments.',
  sol: 'Definition of each.',
  scheme: [['Absorption spectrum: light absorbed against wavelength', 1], ['Action spectrum: rate of photosynthesis against wavelength', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('engel-short', short({
  marks: 2,
  stem: 'Describe how Engelmann showed which colours of light are most effective in photosynthesis.',
  model: 'He lit a filament of the alga **Cladophora**, kept in water with **aerobic bacteria**, with a **spectrum** from a prism. The bacteria collected in the **violet-blue and red** regions, where **most oxygen** was released, and were few in green. So blue and red light drive photosynthesis best.',
  sol: 'Method and result.',
  scheme: [['Alga, bacteria, spectrum', 1], ['Bacteria at blue and red, so those colours are best', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('pigment-short2', short({
  marks: 2,
  stem: 'Name two accessory pigments of photosynthesis and state two functions that accessory pigments perform.',
  model: 'Two accessory pigments are **chlorophyll b** and **carotenoids** (or xanthophylls). They **absorb light of wavelengths** that chlorophyll a absorbs poorly and **pass the energy** to chlorophyll a; carotenoids also **protect** chlorophyll from photo-oxidation.',
  sol: 'Two pigments; two functions.',
  scheme: [['Two accessory pigments', 1], ['Two functions', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('pigments-short3', short({
  marks: 3,
  stem: 'Name the four kinds of pigment in a green leaf, state the colour of each, and say which one is the primary pigment.',
  model: '**Chlorophyll a** is bright or blue-green and is the **primary pigment**, present in reaction centres. **Chlorophyll b** is yellow-green. **Xanthophylls** are yellow, and **carotenoids** (carotenes) are yellow to yellow-orange. Chlorophyll b, xanthophylls and carotenoids are accessory pigments that pass energy to chlorophyll a.',
  sol: 'Four pigments, colours, primary.',
  scheme: [['Four pigments named', 1], ['Colours', 1], ['Chlorophyll a primary', 1]],
  d: 1, c: 'recall', t: [1],
}));
{
  const [b, g, rd] = BUB;
  add('spectra-short3', short({
    marks: 3,
    stem: `Three identical Hydrilla twigs were lit for the same time through violet-blue, green and red filters of equal energy. They gave off ${b[1]}, ${g[1]} and ${rd[1]} bubbles per minute respectively. Which filter gave the highest rate? Why were bubbles still seen under green light, and what do the results suggest about the action spectrum?`,
    model: `The **violet-blue** filter gave the highest rate (${b[1]}), closely followed by red (${rd[1]}). Green gave only ${g[1]}, about ${BUB_GREEN_PCT} percent of all bubbles, because chlorophylls and accessory pigments absorb **some green light weakly**. The results suggest that the action spectrum has **peaks in blue and red** and a **low point in green**, matching absorption by the pigments.`,
    sol: 'Best filter; weak green absorption; action spectrum.',
    scheme: [['Violet-blue highest', 1], ['Green absorbed weakly', 1], ['Peaks in blue and red, trough in green', 1]],
    d: 3, c: 'application', t: [1],
  }), () => (b[1] > rd[1] && rd[1] > g[1]) || 'order');
}
add('chloro-long', long({
  stem: '(a) Draw a labelled diagram of a chloroplast showing the outer membrane, inner membrane, granum, stroma lamella and stroma. [2]\n(b) State the part of the chloroplast in which (i) the light reaction and (ii) the Calvin cycle take place. [1]\n(c) What is the function of a stroma lamella? [1]\n(d) Why are the thylakoids stacked into grana? [1]',
  model: '(a) **Diagram:** an oval chloroplast with a **double envelope** (outer and inner membrane); inside, stacks of flat **thylakoid discs** (**grana**) joined by **stroma lamellae**, all in the fluid **stroma**.\n\n(b) (i) The light reaction takes place on the **thylakoid membranes**; (ii) the Calvin cycle takes place in the **stroma**.\n\n(c) A **stroma lamella** joins the grana and carries **photosystem I** (cyclic photophosphorylation).\n\n(d) Stacking gives a **large surface area** for pigments and photosystems in a small volume, so more light is absorbed.',
  sol: 'Diagram; sites; lamella; stacking.',
  scheme: [['(a) Labelled diagram', 2], ['(b) Both sites', 1], ['(c) Function of lamella', 1], ['(d) Large surface', 1]],
  wl: [60, 200],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 photochemical phase and chemiosmosis
add('p680-mcq', mcq({
  stem: 'The reaction-centre chlorophyll a of photosystem II absorbs light best at a wavelength of',
  right: '680 nm',
  wrong: ['700 nm', '430 nm', '560 nm'],
  sol: 'PS II has the reaction centre P680 — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('lhc-mcq', mcq({
  stem: 'A mutant plant makes normal reaction centres but has very few light-harvesting complexes. Compared with a normal plant, it will',
  right: 'photosynthesise much more slowly in dim light, because fewer pigment molecules pass energy to each reaction centre',
  wrong: ['photosynthesise faster in dim light, because the reaction centres are less crowded', 'be unable to make ATP in any light, because ATP synthase is missing', 'release more oxygen, because carbon dioxide is fixed by the antenna'],
  sol: 'The antenna widens the pool of absorbed light that reaches each reaction centre — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('o2-mcq', mcq({
  stem: 'A water plant is given water made with heavy oxygen as a label, and carbon dioxide containing ordinary oxygen. The gas bubbles released in light will be found to contain the label because',
  right: 'water is split to replace electrons lost by photosystem II, releasing its oxygen',
  wrong: ['carbon dioxide is split in the Calvin cycle and its oxygen is released', 'NADPH is oxidised in the stroma and gives off oxygen', 'ATP is hydrolysed in the lumen and gives off oxygen'],
  sol: 'Water splitting at PS II releases oxygen, protons and electrons; the oxygen gas comes from water — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('mitchell-mcq', mcq({
  stem: 'The chemiosmotic hypothesis for the synthesis of ATP in chloroplasts and mitochondria was proposed by',
  right: 'Peter Mitchell',
  wrong: ['Melvin Calvin', 'Theodor Engelmann', 'F. F. Blackman'],
  sol: 'Peter Mitchell proposed chemiosmosis in 1961 — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('gradient-mcq', mcq({
  stem: 'Which of the following does NOT help to build up the high proton concentration inside the thylakoid lumen?',
  right: 'Flow of protons out of the lumen through the CF₀ channel',
  wrong: ['Splitting of water on the lumen side of the membrane', 'Carrying of protons from stroma to lumen by plastoquinone', 'Removal of protons from the stroma by NADP reductase'],
  sol: 'Outflow through CF₀ uses up the gradient to make ATP; the other three raise it — option (@K).',
  d: 3, c: 'analysis', t: [2],
  assets: [chemioFig],
}));
add('zscheme-mcq', mcq({
  stem: 'In non-cyclic photophosphorylation the final acceptor of electrons is',
  right: 'NADP⁺',
  wrong: ['oxygen', 'plastocyanin', 'P680'],
  sol: 'Electrons pass through ferredoxin and NADP reductase to NADP⁺, forming NADPH — option (@K).',
  d: 1, c: 'recall', t: [2],
  assets: [zFig],
}));
add('cf-mcq', mcq({
  stem: 'In isolated illuminated thylakoids, the CF₁ knobs of ATP synthase are removed but the CF₀ channels are left intact. Compared with normal thylakoids, what happens?',
  right: 'Protons leak out through the open CF₀ channels and no ATP is made',
  wrong: ['Protons build up more strongly in the lumen and ATP formation rises', 'Water is no longer split and NADPH formation stops at once', 'ATP is made in the stroma at the usual rate'],
  sol: 'CF₁ makes ATP; without it the CF₀ channel simply lets protons escape, so the gradient is lost and no ATP forms — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('lamellae-mcq', mcq({
  stem: 'Stroma lamellae that lack photosystem II are isolated and illuminated. Which process can still occur in them?',
  right: 'Cyclic photophosphorylation, giving ATP',
  wrong: ['Splitting of water with release of oxygen', 'Formation of NADPH using electrons from water', 'Carboxylation of RuBP by RuBisCO'],
  sol: 'PS I alone supports the cyclic pathway; water splitting needs PS II and carboxylation occurs in the stroma — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('uncoupler-mcq', mcq({
  stem: 'A chemical makes the thylakoid membrane freely leaky to protons but does not damage the electron carriers. In illuminated thylakoids, the immediate result is that',
  right: 'electron transport continues but ATP formation falls, because the proton gradient cannot be maintained',
  wrong: ['electron transport stops at once and ATP formation rises', 'both electron transport and ATP formation continue unchanged', 'NADPH formation stops but ATP formation rises'],
  sol: 'ATP synthase depends on the gradient; the carriers still pass electrons — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('nadpr-fill', fill({
  stem: 'The enzyme on the stroma side of the thylakoid membrane that passes electrons from ferredoxin to NADP⁺ is ______.',
  acc: [['NADP reductase', 'NADP+ reductase', 'ferredoxin-NADP reductase', 'ferredoxin NADP reductase']],
  sol: 'NADP reductase.',
  d: 1, c: 'recall', t: [2],
}));
add('water-num', num({
  stem: `A preparation of illuminated thylakoids forms ${PREP.nadph} molecules of NADPH by non-cyclic photophosphorylation. How many oxygen molecules are released? (Each NADPH takes 2 electrons; each water gives 2 electrons; one oxygen molecule comes from 2 water molecules.)`,
  value: PREP.o2, unit: 'molecules',
  sol: r`Water split $= ${PREP.nadph}$; oxygen $= ${PREP.nadph} \div 2 = ${PREP.o2}$.`,
  scheme: [[`${PREP.o2}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 30 || 'value');
{
  const g2 = hFold(GRAD2.lumen, GRAD2.stroma);
  add('gradient-check', num({
    stem: `The pH of the lumen of an illuminated thylakoid is ${GRAD2.lumen} and that of the stroma is ${GRAD2.stroma}. By how many times is the H⁺ concentration of the lumen greater than that of the stroma?`,
    value: g2, unit: 'times',
    sol: r`Difference $= ${GRAD2.stroma} - ${GRAD2.lumen} = 3$ pH units; $10^{3} = ${g2}$.`,
    scheme: [[`${g2}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 1000 || 'value');
}
add('noncyclic-ar', ar({
  a: 'Cyclic photophosphorylation does not release oxygen.',
  r: 'Only photosystem I works in cyclic photophosphorylation, so water is not split.',
  key: 'a',
  sol: 'Both are true; without PS II there is no water splitting and so no oxygen — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('cyclic-check', tf({
  stem: 'Cyclic photophosphorylation produces both ATP and NADPH.',
  key: 'f',
  sol: 'False: it produces only ATP, because the electrons return to the chain instead of reaching NADP⁺.',
  d: 2, c: 'understanding', t: [2],
}));
add('cyclic-reason', short({
  marks: 1,
  stem: 'Give a reason: No NADPH is formed in cyclic photophosphorylation.',
  model: 'The electrons from photosystem I return to the electron-transport chain instead of reaching NADP⁺.',
  sol: 'Electrons recycled.',
  scheme: [['Electrons return, do not reach NADP⁺', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('cyclic-short', short({
  marks: 2,
  stem: 'Illuminated thylakoids in beaker X make ATP and NADPH and release oxygen. Those in beaker Y make only ATP and release no oxygen. Name the pathway working in each beaker, with the photosystems involved.',
  model: '**Beaker X** shows **non-cyclic photophosphorylation**, which needs **photosystems II and I**: water is split, giving oxygen, and the electrons end at NADP⁺ to form NADPH. **Beaker Y** shows **cyclic photophosphorylation**, which needs **photosystem I only**: the electrons return to the cytochrome complex in a loop, so only ATP is made.',
  sol: 'Pathway and photosystems for each.',
  scheme: [['X: non-cyclic; PS II and PS I', 1], ['Y: cyclic; PS I only', 1]],
  d: 2, c: 'application', t: [2],
}));
add('lhc-short2', short({
  marks: 2,
  stem: 'What is a light-harvesting complex? State its function in a photosystem.',
  model: 'A **light-harvesting complex (LHC)**, or antenna, is a group of **hundreds of chlorophyll and carotenoid molecules** bound to proteins. It **absorbs light** over a wide range and **passes the energy** to the single **reaction-centre chlorophyll a** of the photosystem.',
  sol: 'Definition and function.',
  scheme: [['Many pigment molecules in an antenna', 1], ['Funnels energy to reaction centre', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('carriers-short2', short({
  marks: 2,
  stem: 'Name, in order, the carriers that pass electrons from photosystem II to photosystem I in the Z-scheme.',
  model: 'Electrons from the excited reaction centre **P680** pass to **pheophytin**, then to **plastoquinone (PQ)**, then through the **cytochrome b6-f complex** to **plastocyanin (PC)**, which gives them to **P700** of photosystem I.',
  sol: 'Order of carriers.',
  scheme: [['Pheophytin, PQ', 1], ['Cytochrome b6-f, PC, P700', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('noncyc-short3', short({
  marks: 3,
  stem: 'Explain how ATP and NADPH are formed in non-cyclic photophosphorylation.',
  model: 'Light excites **P680** of PS II, and its electrons pass down a chain (**pheophytin, plastoquinone, cytochrome b6-f, plastocyanin**) to P700. The energy released drives **ATP formation**. Light then excites **P700**; the electrons pass to **ferredoxin** and, through **NADP reductase**, to **NADP⁺**, forming **NADPH**. Electrons lost by P680 are replaced by **splitting water**, which releases oxygen.',
  sol: 'ATP, NADPH and water splitting.',
  scheme: [['Electron flow from PS II down the chain with ATP', 1], ['PS I electrons to NADP⁺ giving NADPH', 1], ['Water splitting replaces electrons', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('chemio-short3', short({
  marks: 3,
  stem: 'State the chemiosmotic hypothesis of ATP synthesis and give two ways in which a proton gradient is built across the thylakoid membrane.',
  model: 'According to **Mitchell’s chemiosmotic hypothesis**, ATP is made when **protons flow down a concentration gradient** through **ATP synthase**. The gradient is built (i) by the **splitting of water** on the lumen side, which releases H⁺ inside, and (ii) by **plastoquinone carrying H⁺ from the stroma into the lumen** as electrons pass; protons are also removed from the stroma by NADP reductase.',
  sol: 'Hypothesis and two causes.',
  scheme: [['Proton flow through ATP synthase gives ATP', 1], ['Water splitting in lumen', 1], ['Plastoquinone carries H⁺ in', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('cyclic-short3', short({
  marks: 3,
  stem: 'The Calvin cycle needs ATP and NADPH in the ratio 3 : 2. Explain why a chloroplast may need cyclic photophosphorylation as well as the non-cyclic pathway.',
  model: 'Non-cyclic photophosphorylation makes **ATP and NADPH together**, but not enough ATP for the **3 : 2** requirement of the Calvin cycle (per carbon dioxide fixed, three ATP and two NADPH). **Cyclic photophosphorylation** makes **extra ATP without NADPH**, so the chloroplast can balance its supply to its need. It also supplies ATP when NADPH is not being used.',
  sol: 'Balancing the ratio.',
  scheme: [['Calvin cycle needs 3 ATP : 2 NADPH', 1], ['Non-cyclic does not give enough ATP', 1], ['Cyclic gives extra ATP only', 1]],
  d: 4, c: 'analysis', t: [2, 3],
}));
add('zscheme-long', long({
  stem: '(a) Draw the Z-scheme of non-cyclic photophosphorylation, labelling P680, P700, plastoquinone, the cytochrome b6-f complex, plastocyanin, ferredoxin, ATP, NADPH and water splitting. [3]\n(b) Name two products of the process other than ATP. [1]\n(c) Why is water splitting necessary? [1]',
  model: '(a) **Diagram:** water splitting at **PS II**; light excites **P680**; electrons fall through **pheophytin, PQ, cytochrome b6-f** (with **ATP** made) and **PC** to **P700**; light excites **P700**; electrons pass to **ferredoxin** and **NADP reductase**, giving **NADPH**; the path forms a **Z** against energy level.\n\n(b) **NADPH** and **oxygen**.\n\n(c) Water supplies **electrons to replace those lost by P680**, so photosystem II can keep working; it also releases **H⁺** into the lumen and **oxygen**.',
  sol: 'Z-scheme, products, role of water.',
  scheme: [['(a) Carriers in order', 2], ['(a) Light steps, ATP, NADPH', 1], ['(b) NADPH and oxygen', 1], ['(c) Replaces electrons', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}));
add('chemio-long', long({
  stem: '(a) Draw a labelled diagram of the thylakoid membrane showing PS II, the cytochrome b6-f complex, PS I, ATP synthase and the direction of H⁺ movement. [2]\n(b) State three events that make the lumen rich in protons. [2]\n(c) Name the two parts of ATP synthase and state the function of each. [1]',
  model: '(a) **Diagram:** a membrane with **lumen** above and **stroma** below; PS II, the **cytochrome b6-f complex**, PS I and **ATP synthase** in it; arrows showing **H⁺ entering the lumen** and flowing **out through ATP synthase**.\n\n(b) (i) **Splitting of water** releases H⁺ in the lumen; (ii) **plastoquinone carries H⁺ from the stroma into the lumen**; (iii) **NADP reductase removes H⁺ from the stroma**, which keeps the stroma low in H⁺.\n\n(c) **CF₀** is the **channel** through the membrane for H⁺; **CF₁** is the **knob in the stroma** that makes **ATP** from ADP and Pi.',
  sol: 'Diagram; three causes; CF0 and CF1.',
  scheme: [['(a) Labelled diagram', 2], ['(b) Three events', 2], ['(c) CF0 and CF1', 1]],
  wl: [60, 200],
  d: 3, c: 'understanding', t: [2],
}));

// ================================================================ t03 Calvin cycle
add('rubisco-mcq', mcq({
  stem: 'The enzyme that fixes carbon dioxide on to RuBP in the Calvin cycle is',
  right: 'RuBisCO',
  wrong: ['PEP carboxylase', 'ATP synthase', 'NADP reductase'],
  sol: 'RuBisCO catalyses carboxylation of RuBP — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('stage-mcq', mcq({
  stem: 'In which stage of the Calvin cycle is ATP used but NADPH not used?',
  right: 'Regeneration of RuBP',
  wrong: ['Carboxylation of RuBP', 'Reduction of PGA', 'Release of G3P to make sugar'],
  sol: 'Reduction uses both; regeneration uses ATP only; carboxylation uses neither — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('pga-mcq', mcq({
  stem: `A chloroplast extract is supplied with ${CARB3.rubpIn} molecules of RuBP and ${CARB3.rubpIn} molecules of carbon dioxide, with RuBisCO. How many molecules of PGA are formed?`,
  right: String(CARB3.pga),
  wrong: ['3', '9', '12'],
  sol: `Each RuBP and CO₂ gives two PGA, so ${CARB3.rubpIn} × 2 = ${CARB3.pga} — option (@K).`,
  d: 2, c: 'application', t: [3],
  assets: [calvinFig],
}), (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md === '6' || 'key');
{
  const out = CARB6.g3pExit;
  add('g3p-mcq', mcq({
    stem: `In six turns of the Calvin cycle, ${CARB6.pga} molecules of G3P are formed. How many of them leave the cycle to make one glucose?`,
    right: String(out),
    wrong: ['1', '6', '10'],
    sol: `Two G3P (6 C) leave and ${CARB6.g3pKept} regenerate ${CARB6.rubpOut} RuBP — option (@K).`,
    d: 3, c: 'application', t: [3],
  }), (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md === '2' || 'key');
}
{
  const atp = CALVIN9.atp;
  add('calvin-check', num({
    stem: `A leaf fixes ${CALVIN9.turns} molecules of carbon dioxide in the Calvin cycle. How many ATP molecules are used? (3 ATP per CO₂ fixed.)`,
    value: atp, unit: 'ATP',
    sol: r`ATP $= ${CALVIN9.turns} \times 3 = ${atp}$.`,
    scheme: [[`${atp}`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 27 || 'value');
}
{
  const g = GLU.atp;
  add('glucose-num', num({
    stem: 'A C3 plant uses 3 ATP for every carbon dioxide molecule fixed, and one glucose needs six carbon dioxide molecules. How many ATP are needed to make three glucose molecules by the Calvin cycle?',
    value: g * 3, unit: 'ATP',
    sol: r`One glucose needs $6 \times 3 = ${g}$ ATP; three need $3 \times ${g} = ${g * 3}$.`,
    scheme: [[`${g * 3}`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 54 || 'value');
}
{
  const gl = 0.9;
  add('leafglu-num', num({
    stem: 'A leaf takes up 1.32 g of carbon dioxide in an hour and converts it all into glucose. What mass of glucose is formed? (C = 12, H = 1, O = 16.)',
    value: gl, tol: 0.005, unit: 'g',
    sol: r`6 CO₂ (264 g) give 1 glucose (180 g); $1.32 \times \dfrac{180}{264} = ${gl}$ g.`,
    scheme: [[`${gl} g`, 1]],
    d: 3, c: 'application', t: [3],
  }), () => { eq(1.32 * 180 / 264, 0.9, 'glucose'); return true; });
}
add('calvin-short2', short({
  marks: 2,
  stem: 'Name the three stages of the Calvin cycle and state the product of the first stage.',
  model: 'The stages are **carboxylation**, **reduction** and **regeneration**. In **carboxylation**, carbon dioxide combines with **RuBP**, under **RuBisCO**, to give **PGA**, a three-carbon acid; this is the first stable product.',
  sol: 'Three stages; PGA.',
  scheme: [['Three stages', 1], ['PGA from RuBP + CO₂', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('calvin-short3', short({
  marks: 3,
  stem: 'Describe the three stages of the Calvin cycle.',
  model: '**Carboxylation:** CO₂ combines with the five-carbon acceptor **RuBP**, catalysed by **RuBisCO**, to give two molecules of three-carbon **PGA**. **Reduction:** PGA is reduced to **G3P** (triose phosphate) using **ATP and NADPH**. **Regeneration:** most G3P is rearranged to **RuBP** using **ATP**, so the cycle continues; a little G3P leaves to make sugar.',
  sol: 'Three stages.',
  scheme: [['Carboxylation', 1], ['Reduction', 1], ['Regeneration', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('carbon-short3', short({
  marks: 3,
  stem: `The Calvin cycle runs six times to make one glucose. State the number of CO₂ and RuBP molecules that enter, the number of PGA formed, and the number of G3P that leave and that regenerate RuBP.`,
  model: `${CARB6.rubpIn} **CO₂** and ${CARB6.rubpIn} **RuBP** enter (${CARB6.cIn} carbon atoms in all), and carboxylation gives ${CARB6.pga} **PGA**. After reduction there are ${CARB6.pga} **G3P**, of which ${CARB6.g3pExit} leave the cycle to form one **glucose** (${CARB6.cExit} carbon atoms) and ${CARB6.g3pKept} are used, with ATP, to **regenerate ${CARB6.rubpOut} RuBP** (${CARB6.g3pKept * 3} carbon atoms), so the cycle can continue.`,
  sol: 'Carbon bookkeeping.',
  scheme: [['Inputs: 6 CO₂, 6 RuBP', 1], ['12 PGA and 12 G3P', 1], ['2 leave; 10 regenerate 6 RuBP', 1]],
  d: 3, c: 'application', t: [3],
}), () => (CARB6.pga === 12 && CARB6.g3pExit === 2 && CARB6.g3pKept === 10 && CARB6.rubpOut === 6) || 'counts');
add('calvin-long', long({
  stem: '(a) Draw a flow diagram of the Calvin cycle showing carboxylation, reduction and regeneration, with RuBP, PGA and G3P. [3]\n(b) Calculate the ATP and NADPH needed for the cycle to make one glucose molecule, showing your working. [2]',
  model: `(a) **Diagram:** **RuBP** (5 C) + **CO₂** → (RuBisCO, **carboxylation**) → 2 **PGA** (3 C) → (ATP and NADPH, **reduction**) → **G3P**; most G3P → (ATP, **regeneration**) → **RuBP**; a little G3P leaves to make sugar.\n\n(b) One glucose needs **six turns** (six CO₂). Each CO₂ uses **3 ATP and 2 NADPH**, so ATP = 6 × 3 = **${GLU.atp}** and NADPH = 6 × 2 = **${GLU.nadph}**.`,
  sol: 'Cycle diagram; energy count.',
  scheme: [['(a) Three stages in order', 2], ['(a) Molecules and enzyme', 1], ['(b) Working', 1], ['(b) Both totals', 1]],
  wl: [50, 200],
  d: 3, c: 'application', t: [3],
}), () => (GLU.atp === 18 && GLU.nadph === 12) || 'totals');

// ================================================================ t04 C4 pathway
add('kranz-mcq', mcq({
  stem: 'Kranz anatomy, with a ring of chloroplast-rich bundle sheath cells around the vascular bundle, is found in the leaves of',
  right: 'maize',
  wrong: ['wheat', 'rice', 'pea'],
  sol: 'Maize is a C4 plant with Kranz anatomy; wheat, rice and pea are C3 plants — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('c4first-mcq', mcq({
  stem: 'The first stable product formed when sugarcane fixes carbon dioxide is',
  right: 'oxaloacetic acid, a four-carbon compound',
  wrong: ['PGA, a three-carbon compound', 'RuBP, a five-carbon compound', 'pyruvic acid, a three-carbon compound'],
  sol: 'In C4 plants PEP carboxylase fixes CO₂ on PEP to give OAA — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('pepc-mcq', mcq({
  stem: 'Maize continues to fix carbon dioxide efficiently even when its stomata are partly closed on a hot afternoon, mainly because',
  right: 'PEP carboxylase has a high affinity for CO₂ and does not bind oxygen',
  wrong: ['RuBisCO is absent from its leaves', 'its mesophyll cells make more chlorophyll b', 'it carries out photorespiration at a higher rate'],
  sol: 'PEPcase captures even small amounts of CO₂ and has no oxygenase activity — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('c4-check', mcq({
  stem: 'In a C4 leaf, the Calvin cycle takes place in the',
  right: 'chloroplasts of the bundle sheath cells',
  wrong: ['chloroplasts of the mesophyll cells', 'cytoplasm of the guard cells', 'vacuoles of the epidermis'],
  sol: 'CO₂ is released from malate in the bundle sheath and fixed there by RuBisCO — option (@K).',
  d: 1, c: 'recall', t: [4],
  assets: [c4Fig],
}));
add('c4cond-mcq', mcq({
  stem: 'Which habitat is likely to favour a C4 plant over a C3 plant?',
  right: 'A hot, bright and dry plain',
  wrong: ['A cool, shaded forest floor', 'A cold, cloudy hillside', 'A waterlogged cool marsh'],
  sol: 'C4 plants avoid photorespiration and keep fixing CO₂ in heat and strong light — option (@K).',
  d: 2, c: 'application', t: [4],
}));
{
  const a = C4_4.atp;
  add('c4atp-num', num({
    stem: `A C4 plant needs 5 ATP for every carbon dioxide molecule fixed. How many ATP does it use to fix ${C4_4.turns} molecules of carbon dioxide?`,
    value: a, unit: 'ATP',
    sol: r`ATP $= ${C4_4.turns} \times 5 = ${a}$.`,
    scheme: [[`${a}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 20 || 'value');
}
add('c4extra-num', num({
  stem: 'How many more ATP does a C4 plant need than a C3 plant to make one glucose molecule? (C3: 3 ATP per CO₂; C4: 5 ATP per CO₂.)',
  value: C4_EXTRA, unit: 'ATP',
  sol: r`C4: $6 \times 5 = ${GLU4.atp}$; C3: $6 \times 3 = ${GLU.atp}$; extra $= ${C4_EXTRA}$.`,
  scheme: [[`${C4_EXTRA}`, 1]],
  d: 3, c: 'application', t: [4],
}), (q) => q.answer.value === 12 || 'value');
add('c4-ar', ar({
  a: 'C4 plants lose more of their fixed carbon through photorespiration than C3 plants.',
  r: 'The Calvin cycle of a C4 plant runs in the mesophyll cells.',
  key: 'd',
  sol: 'Both are false: C4 plants have negligible photorespiration, and their Calvin cycle runs in the bundle sheath — option (d).',
  d: 3, c: 'understanding', t: [4],
}));
add('hatch-short2', short({
  marks: 2,
  stem: 'State two structural or biochemical features that distinguish a C4 leaf from a C3 leaf.',
  model: 'A **C4 leaf** has **Kranz anatomy**, with large chloroplast-rich **bundle sheath cells** around the vascular bundle, and the **Calvin cycle is confined to them**. It has **two carboxylating enzymes**: **PEP carboxylase** in the mesophyll fixes CO₂ first and RuBisCO works later. A C3 leaf has neither of these.',
  sol: 'Two features.',
  scheme: [['Kranz anatomy; Calvin cycle in bundle sheath', 1], ['Two carboxylating enzymes', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('c4-short3', short({
  marks: 3,
  stem: 'Describe the C4 pathway of carbon dioxide fixation, as worked out by Hatch and Slack.',
  model: 'In **mesophyll cells**, **PEP carboxylase** fixes CO₂ on to **PEP** (three carbons) to form **oxaloacetic acid** (four carbons), which becomes **malate**. Malate moves to the **bundle sheath cells**, where it breaks down to **pyruvate and CO₂**. The CO₂ enters the **Calvin cycle**. Pyruvate returns to the mesophyll and is changed back to **PEP** using ATP.',
  sol: 'Pathway.',
  scheme: [['PEP + CO₂ gives OAA in mesophyll', 1], ['Malate to bundle sheath; CO₂ released to Calvin cycle', 1], ['Pyruvate returns; PEP regenerated with ATP', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('c4vs-short3', short({
  marks: 3,
  stem: 'On a hot, bright day a wheat crop photosynthesises more slowly than a maize crop in a neighbouring field. Give three reasons.',
  model: 'Maize is a **C4 plant**: its **PEP carboxylase** fixes CO₂ efficiently even when stomata are partly closed. Its **Kranz anatomy** concentrates CO₂ around RuBisCO in the bundle sheath, so **photorespiration is negligible**. Wheat, a **C3 plant**, loses carbon by **photorespiration** in heat, and its optimum temperature is lower.',
  sol: 'Three reasons.',
  scheme: [['PEP carboxylase fixes CO₂ efficiently', 1], ['Kranz anatomy; no photorespiration', 1], ['Wheat loses carbon by photorespiration; lower optimum', 1]],
  d: 3, c: 'application', t: [4],
}));
add('c4-long', long({
  stem: '(a) Draw a labelled flow diagram of the C4 pathway showing mesophyll and bundle sheath cells, PEP, OAA, malate, pyruvate and the Calvin cycle. [3]\n(b) What is Kranz anatomy? [1]\n(c) Why is photorespiration negligible in C4 plants? [1]',
  model: '(a) **Diagram:** in the **mesophyll cell**, CO₂ + **PEP** → (PEP carboxylase) → **OAA** → **malate**; malate moves to the **bundle sheath cell** → **pyruvate + CO₂**; CO₂ → **Calvin cycle** → sugar; pyruvate returns and → **PEP** (ATP).\n\n(b) **Kranz anatomy** is a ring (wreath) of large **bundle sheath cells** rich in chloroplasts around each **vascular bundle**, with mesophyll cells outside.\n\n(c) CO₂ is **released at high concentration** in the bundle sheath, so **RuBisCO acts as a carboxylase**, not as an oxygenase.',
  sol: 'C4 pathway; Kranz; photorespiration.',
  scheme: [['(a) Mesophyll steps', 1], ['(a) Bundle sheath steps and Calvin cycle', 2], ['(b) Kranz anatomy', 1], ['(c) High CO₂ around RuBisCO', 1]],
  wl: [50, 200],
  d: 3, c: 'understanding', t: [4],
}));

// ================================================================ t05 photorespiration
add('prloc-mcq', mcq({
  stem: 'The three cell organelles that take part in photorespiration are',
  right: 'chloroplast, peroxisome and mitochondrion',
  wrong: ['chloroplast, Golgi body and lysosome', 'peroxisome, nucleus and ribosome', 'mitochondrion, vacuole and endoplasmic reticulum'],
  sol: 'The pathway runs from the chloroplast to the peroxisome to the mitochondrion — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('prcond-mcq', mcq({
  stem: 'Photorespiration is most likely to be fast in a C3 leaf on a day that is',
  right: 'hot and bright, with the stomata partly closed',
  wrong: ['cool and cloudy, with the stomata wide open', 'dark, with high carbon dioxide', 'cold, with high carbon dioxide and low oxygen'],
  sol: 'High temperature and closed stomata lower CO₂ and raise the O₂ to CO₂ ratio inside the leaf — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('prloss-num', num({
  stem: `In photorespiration ${PR8.glycolate} molecules of glycolate (2 carbons each) are converted into serine (3 carbons) and carbon dioxide. How many carbon atoms are lost as carbon dioxide?`,
  value: PR8.co2, unit: 'carbon atoms',
  sol: r`Pairs of glycolate $= ${PR8.glycolate} \div 2 = ${PR8.serine}$; each pair loses 1 C, so loss $= ${PR8.co2}$ of ${PR8.carbonIn} C (${PR_LOSS} percent).`,
  scheme: [[`${PR8.co2}`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 4 || 'value');
add('photoresp-ar', ar({
  a: 'Photorespiration is a wasteful process in C3 plants.',
  r: 'Photorespiration makes ATP and NADPH that the plant can use in the Calvin cycle.',
  key: 'c',
  sol: 'A is true: carbon already fixed is lost and energy is used. R is false: no ATP or NADPH is made — option (c).',
  d: 3, c: 'understanding', t: [5],
}));
add('pr-reason', short({
  marks: 1,
  stem: 'Give a reason: Photorespiration is not seen in C4 plants.',
  model: 'CO₂ is concentrated around RuBisCO in the bundle sheath cells, so RuBisCO does not act as an oxygenase.',
  sol: 'High CO₂ at RuBisCO.',
  scheme: [['High CO₂ around RuBisCO', 1]],
  d: 2, c: 'understanding', t: [5, 4],
}));
add('pr-short2', short({
  marks: 2,
  stem: 'What is photorespiration? State the condition in which RuBisCO begins this process.',
  model: '**Photorespiration** is the **light-dependent uptake of oxygen and release of carbon dioxide** through a pathway in the **chloroplast, peroxisome and mitochondrion**, with no ATP or NADPH made. It begins when **oxygen is high and carbon dioxide is low**, and **RuBisCO acts as an oxygenase** on RuBP.',
  sol: 'Definition and condition.',
  scheme: [['Definition', 1], ['High O₂, low CO₂; RuBisCO oxygenase', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('pr-short3', short({
  marks: 3,
  stem: 'Describe the main steps of photorespiration and explain why it is considered wasteful.',
  model: 'RuBisCO adds **oxygen** to **RuBP**, giving one **PGA** and one two-carbon **phosphoglycolate**, which becomes **glycolate**. Glycolate passes to the **peroxisome** and forms **glycine**; in the **mitochondrion** two glycine give **serine and CO₂**. It is **wasteful** because **CO₂ is lost**, ATP and NADPH are used, and **no sugar** is made.',
  sol: 'Steps and waste.',
  scheme: [['RuBP oxygenation gives PGA and phosphoglycolate', 1], ['Peroxisome and mitochondrion; CO₂ released', 1], ['Why wasteful', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ================================================================ t06 Blackman and factors
add('blackman-mcq', mcq({
  stem: 'According to Blackman’s law of limiting factors, when a process depends on several factors its rate is determined by the factor that is',
  right: 'nearest its minimum value',
  wrong: ['nearest its maximum value', 'present in the greatest amount', 'changed most recently'],
  sol: 'The factor in shortest supply sets the rate — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('limiting-mcq', mcq({
  stem: `The graph shows the rate of photosynthesis in a leaf at two carbon dioxide levels. At 60 klux in the low-carbon-dioxide curve, which change will raise the rate?`,
  right: 'Raising the carbon dioxide concentration',
  wrong: ['Raising the light intensity further', 'Reducing the light intensity', 'Replacing white light by green light'],
  sol: `At 60 klux the low-CO₂ curve is flat at ${rate(60, LIM.capLow)} units, so CO₂ is limiting; with more CO₂ the rate would be ${rate(60, LIM.capHigh)} — option (@K).`,
  d: 3, c: 'application', t: [6],
  assets: [V.blackman],
}), () => limiting(60, LIM.capLow) === 'carbon dioxide' || 'limiting');
add('blackman-check', mcq({
  stem: `On the low-carbon-dioxide curve of the graph, the rate at 30 klux is ${rate(30, LIM.capLow)} units. Which factor limits photosynthesis at this point?`,
  right: 'Light intensity',
  wrong: ['Carbon dioxide concentration', 'Chlorophyll content', 'Temperature'],
  sol: 'The curve is still rising with light, so light is limiting — option (@K).',
  d: 2, c: 'application', t: [6],
  assets: [V.blackman],
}), () => limiting(30, LIM.capLow) === 'light' || 'limiting');
add('temp-mcq', mcq({
  stem: `A student measures the rate of photosynthesis of a pond weed at different temperatures in bright light with plenty of CO₂: ${TEMP.map(([t, v]) => `${t} °C: ${v}`).join('; ')} (arbitrary units). What is the optimum temperature?`,
  right: `${TEMP_OPT} °C`,
  wrong: ['10 °C', '40 °C', '50 °C'],
  sol: `The rate is highest, 24 units, at ${TEMP_OPT} °C — option (@K).`,
  d: 2, c: 'application', t: [6],
}), (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md === '30 °C' || 'key');
add('stomata-mcq', mcq({
  stem: 'During a prolonged drought the rate of photosynthesis of a crop falls mainly because',
  right: 'stomata close, so less carbon dioxide enters the leaf',
  wrong: ['chlorophyll turns into carotenoid', 'oxygen is no longer needed', 'sunlight cannot reach the plant'],
  sol: 'Water shortage closes the stomata, limiting CO₂ — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('rate-num', num({
  stem: `Using the graph of rate against light intensity, what is the rate of photosynthesis at 100 klux on the high-carbon-dioxide curve? (Arbitrary units.)`,
  value: rate(100, LIM.capHigh), unit: 'units',
  sol: `The high-CO₂ curve flattens at ${plateauAt(LIM.capHigh)} klux at ${LIM.capHigh} units — ${rate(100, LIM.capHigh)}.`,
  scheme: [[`${rate(100, LIM.capHigh)}`, 1]],
  d: 2, c: 'application', t: [6],
  assets: [V.blackman],
}), (q) => q.answer.value === 48 || 'value');
add('blackman-ar', ar({
  a: 'In bright light, the rate of photosynthesis of a crop in a closed greenhouse can be raised by adding carbon dioxide.',
  r: 'The rate of a process is limited by the factor nearest its minimum value.',
  key: 'a',
  sol: 'In bright light CO₂ is the limiting factor, and Blackman’s law explains why adding it helps — option (a).',
  d: 3, c: 'application', t: [6],
}));
add('blackman-short2', short({
  marks: 2,
  stem: 'State Blackman’s law of limiting factors and give one example from photosynthesis.',
  model: '**Blackman’s law of limiting factors** states that when a process depends on **several factors**, its rate is determined by the factor that is **nearest its minimum value**. For example, in dim light the rate is **limited by light**, and raising carbon dioxide does not increase it.',
  sol: 'Law and example.',
  scheme: [['Statement', 1], ['Example', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('temp-short2', short({
  marks: 2,
  stem: 'Why does the rate of photosynthesis rise with temperature up to an optimum and then fall?',
  model: 'The **dark reactions** are **enzyme-controlled**, so their rate **rises with temperature** up to the **optimum**. Above it the **enzymes begin to be denatured**, and stomata may close, so the rate **falls**.',
  sol: 'Enzymes.',
  scheme: [['Enzymatic reactions speed up to the optimum', 1], ['Denaturation above it', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('factors-short3', short({
  marks: 3,
  stem: 'Explain the effect of light intensity, carbon dioxide concentration and water supply on the rate of photosynthesis.',
  model: 'The rate **rises with light intensity** and then **saturates**, when another factor becomes limiting. It **rises with carbon dioxide concentration** up to a limit, and C3 plants respond to higher concentrations than C4 plants. A **shortage of water** closes the **stomata**, which reduces carbon dioxide entry and so lowers the rate.',
  sol: 'Three factors.',
  scheme: [['Light rises then saturates', 1], ['Carbon dioxide', 1], ['Water and stomata', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('graph-short3', short({
  marks: 3,
  stem: 'In the graph, both curves rise together up to 30 klux and then the low-carbon-dioxide curve flattens. Explain the shape of the curves using Blackman’s law.',
  model: `Up to ${plateauAt(LIM.capLow)} klux **light is the limiting factor** for both curves, so they rise together (the rate at 30 klux is ${rate(30, LIM.capLow)} units for both). Beyond ${plateauAt(LIM.capLow)} klux the low-CO₂ curve **flattens at ${LIM.capLow} units**, because **carbon dioxide** is now nearest its minimum. The high-CO₂ curve keeps rising until ${plateauAt(LIM.capHigh)} klux, when light is no longer limiting.`,
  sol: 'Limiting factor changes.',
  scheme: [['Light limiting while curves coincide', 1], ['Low-CO₂ curve flattens: CO₂ limiting', 1], ['High-CO₂ curve flattens at higher light', 1]],
  d: 3, c: 'analysis', t: [6],
  assets: [V.blackman],
}), () => (rate(30, LIM.capLow) === rate(30, LIM.capHigh) && plateauAt(LIM.capLow) === 40 && plateauAt(LIM.capHigh) === 80) || 'graph');
