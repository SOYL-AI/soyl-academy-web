// ICSE 10 Physics ch12 Radioactivity and Nuclear Energy — two decks: Part 1 (t01–t03) the nucleus, Z and A, isotopes;
// radioactivity; alpha, beta and gamma radiations and their properties; changes in the nucleus in alpha and beta decay;
// Part 2 (t04–t05) uses of radioisotopes, harmful effects, background radiation, safety, X-rays and fallout; nuclear fission
// and fusion; safe disposal of nuclear waste. Nuclide symbols are written in plain LaTeX (not mhchem).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { DEFLECTION, PENETRATION } from './svgs.mjs';

const V = {
  defl: svgV(DEFLECTION, 'Alpha, beta and gamma radiations passing between charged plates: alpha bends slightly to the negative plate, beta sharply to the positive plate, gamma goes straight'),
  pen: svgV(PENETRATION, 'Alpha stopped by paper, beta by a few millimetres of aluminium, gamma reduced only by several centimetres of lead'),
};
const N = (A, Z, X) => `{}^{${A}}_{${Z}}\\text{${X}}`;

export const deck1 = deck({
  part: 1,
  title: 'Radioactivity — Part 1: The nucleus and radioactive decay',
  goals: [
    'Represent a nuclide with Z and A and count its protons and neutrons',
    'Define isotopes with examples',
    'Compare alpha, beta and gamma radiations',
    'Write balanced equations for alpha and beta decay',
  ],
  slides: [
    sl('title', 'Inside the atom’s core', {
      b: 'Part 1 — the tiny nucleus holds almost all the mass of an atom. Some nuclei are unstable and break up on their own, giving out radiation.',
      v: table(['Particle', 'Where', 'Charge', 'Mass (approx.)'], [['Proton', 'Nucleus', '+1', '1 u'], ['Neutron', 'Nucleus', '0', '1 u'], ['Electron', 'Outside the nucleus', '−1', '1/1840 u']], 'Table of the three particles in an atom with location, charge and mass'),
      n: 'Namaste! An atom is mostly empty space, with a tiny, dense nucleus at its centre made of protons and neutrons. In 1896 Henri Becquerel found that uranium salts gave out invisible rays on their own. In this part we look at the structure of the nucleus and the three kinds of radiation given out when unstable nuclei break up.',
    }),
    sl('concept', 'Atomic number, mass number and isotopes', {
      b: r`**Atomic number** $Z$: number of protons in the nucleus (also the number of electrons in a neutral atom); it decides the element. **Mass number** $A$: number of protons + neutrons (nucleons). Number of neutrons $N = A - Z$. A nuclide is written $${N('A', 'Z', 'X')}$, e.g. $${N(23, 11, 'Na')}$: 11 protons, 12 neutrons. **Isotopes:** atoms of the same element (same $Z$) with different mass numbers (different numbers of neutrons), e.g. $${N(1, 1, 'H')}$, $${N(2, 1, 'H')}$, $${N(3, 1, 'H')}$; $${N(12, 6, 'C')}$ and $${N(14, 6, 'C')}$. They have the same chemical properties.`,
      v: table(['Nuclide', 'Z (protons)', 'A', 'Neutrons'], [['Sodium-23', '11', '23', '12'], ['Cobalt-60', '27', '60', '33'], ['Carbon-14', '6', '14', '8'], ['Radium-226', '88', '226', '138']], 'Table of four nuclides with their protons, mass numbers and neutrons'),
      n: 'The atomic number is the number of protons and decides which element an atom is. The mass number is the total number of protons and neutrons. Subtract one from the other to get the number of neutrons. Atoms of the same element with different numbers of neutrons are called isotopes, like carbon twelve and carbon fourteen. Isotopes behave the same way chemically.',
    }),
    sl('check', 'Quick check: protons and neutrons', {
      b: 'Count protons and neutrons in a nuclide.',
      n: 'Quick check. Neutrons equal mass number minus atomic number.',
      chk: 'count-mcq',
    }),
    sl('concept', 'Radioactivity', {
      b: '**Radioactivity** is the **spontaneous disintegration** of the nucleus of an unstable atom, with the emission of **alpha (α)**, **beta (β)** or **gamma (γ)** radiation. It is a **nuclear** process: it is **not affected** by temperature, pressure, chemical combination or physical state. Naturally radioactive elements include uranium, thorium, radium and polonium; heavy nuclei (Z > 82) are generally unstable.',
      v: table(['Feature', 'Radioactivity'], [['Cause', 'Unstable nucleus'], ['Affected by heating or pressure?', 'No'], ['Affected by chemical combination?', 'No'], ['Radiations given out', 'α, β, γ']], 'Table of features of radioactivity'),
      n: 'Radioactivity is the breaking up of an unstable nucleus all by itself, giving out alpha, beta or gamma radiation. It happens inside the nucleus, so heating, cooling, squeezing or combining the element with others makes no difference to it. Very heavy elements such as uranium and radium are naturally radioactive.',
    }),
    sl('diagram', 'Alpha, beta and gamma: charge and deflection', {
      b: '**Alpha particles** are helium nuclei, ${}^{4}_{2}$He: charge +2e, mass 4 u. **Beta particles** are fast electrons emitted from the nucleus: charge −e, mass about 1/1840 u. **Gamma rays** are electromagnetic waves of very short wavelength: no charge, no mass. In an electric (or magnetic) field, α and β bend in **opposite directions** (β much more, being far lighter), and γ is **not deflected**.',
      v: V.defl,
      n: 'Alpha particles are helium nuclei, with two protons and two neutrons, so they carry a double positive charge. Beta particles are very fast electrons that come out of the nucleus, with a single negative charge and tiny mass. Gamma rays are electromagnetic waves with no charge or mass. Between charged plates, alpha and beta bend opposite ways, beta much more, and gamma goes straight through.',
    }),
    sl('diagram', 'Penetrating and ionising power', {
      b: 'The three radiations differ greatly in how far they travel and how strongly they **ionise** the air (knock electrons out of atoms). **α:** least penetrating (stopped by paper or a few cm of air), **most ionising**. **β:** stopped by a few mm of aluminium; moderately ionising. **γ:** most penetrating (reduced only by several cm of lead or thick concrete), **least ionising**. Speeds: α about 1/10 of the speed of light; β up to 0.99 of it; γ at the speed of light.',
      v: V.pen,
      n: 'The more a radiation ionises the air, the faster it loses energy and the shorter its range. Alpha particles ionise strongly and are stopped by a sheet of paper. Beta particles go further and are stopped by a few millimetres of aluminium. Gamma rays ionise least and can pass through several centimetres of lead. So penetrating power and ionising power run in opposite orders.',
    }),
    sl('example', 'Worked example: identifying radiation', {
      b: '**Problem.** A source gives radiation that passes through a sheet of paper but is stopped by 5 mm of aluminium, and bends towards the positive plate in an electric field. (a) Identify it. (b) What would happen with a sheet of paper and an α emitter? (c) Which radiation would pass through the aluminium and not bend?\n\n**(a)** β particles (negative, stopped by aluminium).\n\n**(b)** The α particles would be stopped by the paper.\n\n**(c)** γ rays (no charge, very penetrating).',
      v: table(['Test', 'α', 'β', 'γ'], [['Passes paper?', 'No', 'Yes', 'Yes'], ['Passes 5 mm Al?', 'No', 'No', 'Yes'], ['Bends towards + plate?', 'No (towards −)', 'Yes', 'No bend']], 'Table of tests used to identify alpha, beta and gamma radiation'),
      n: 'Use the clues one at a time. It gets through paper, so it is not alpha. It is stopped by aluminium, so it is not gamma. And it bends towards the positive plate, which shows a negative charge. So it is beta radiation. Alpha particles would be stopped by the paper, while gamma rays would pass through the aluminium without bending.',
    }),
    sl('check', 'Quick check: properties of radiation', {
      b: 'Compare the properties of α, β and γ.',
      n: 'Quick check. Alpha ionises most and penetrates least; gamma the reverse.',
      chk: 'prop-mcq',
    }),
    sl('concept', 'Changes in the nucleus: alpha and beta decay', {
      b: r`**Alpha decay:** the nucleus loses 2 protons and 2 neutrons: $A$ decreases by 4, $Z$ by 2 — a new element two places back in the periodic table. $${N(226, 88, 'Ra')} \rightarrow ${N(222, 86, 'Rn')} + ${N(4, 2, 'He')}$. **Beta decay:** a neutron changes into a proton and an electron, and the electron is emitted: $A$ unchanged, $Z$ increases by 1 — the next element. $${N(14, 6, 'C')} \rightarrow ${N(14, 7, 'N')} + {}^{0}_{-1}e$. **Gamma emission:** no change in $A$ or $Z$; the nucleus only loses energy. In every equation the totals of $A$ and of $Z$ balance.`,
      v: table(['Emission', 'Change in A', 'Change in Z', 'Element'], [['α', '− 4', '− 2', 'Changes'], ['β', '0', '+ 1', 'Changes'], ['γ', '0', '0', 'Same']], 'Table of the changes in mass number and atomic number for alpha, beta and gamma emission'),
      n: 'When a nucleus gives out an alpha particle, it loses two protons and two neutrons, so its mass number falls by four and its atomic number by two. In beta decay, a neutron turns into a proton and an electron, and the electron shoots out, so the mass number stays the same and the atomic number goes up by one. Gamma emission changes neither number.',
    }),
    sl('example', 'Worked example: a decay series', {
      b: r`**Problem.** $${N(238, 92, 'U')}$ emits one α particle, then two β particles. Find $A$ and $Z$ after each step and name the final element (Z = 92 uranium).

**α:** $A = 238 - 4 = 234$, $Z = 92 - 2 = 90$ (thorium).

**First β:** $A = 234$, $Z = 90 + 1 = 91$ (protactinium).

**Second β:** $A = 234$, $Z = 91 + 1 = 92$ — **uranium-234**, an isotope of the starting element.`,
      v: flow('LR', [['a', 'U-238 (Z 92)'], ['b', 'Th-234 (Z 90)'], ['c', 'Pa-234 (Z 91)'], ['d', 'U-234 (Z 92)']], [['a', 'b', 'α'], ['b', 'c', 'β'], ['c', 'd', 'β']], 'Flow of uranium-238 decaying by one alpha and two beta emissions to uranium-234'),
      n: 'Work step by step. The alpha emission takes four off the mass number and two off the atomic number, giving thorium two thirty four. Each beta emission leaves the mass number alone and adds one to the atomic number. After two beta emissions the atomic number is back to ninety two, so the result is uranium two thirty four, an isotope of the uranium we started with.',
    }),
    sl('check', 'Quick check: decay equations', {
      b: 'Predict A and Z after a decay.',
      n: 'Quick check. Alpha: mass number down four, atomic number down two. Beta: atomic number up one.',
      chk: 'decay-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Nuclide notation: mass number A on top, atomic number Z below; neutrons = A − Z.',
        'Isotopes: same Z, different A.',
        'Radioactivity: spontaneous disintegration of unstable nuclei; unaffected by physical or chemical conditions.',
        'α: +2e, 4 u, most ionising, least penetrating; β: −e, light, moderate; γ: no charge, most penetrating.',
        'α decay: A − 4, Z − 2; β decay: A same, Z + 1; γ: no change.',
      ],
      v: table(['Radiation', 'Stopped by'], [['α', 'Paper'], ['β', 'Few mm aluminium'], ['γ', 'Several cm lead (reduced)']], 'Summary table of what stops each radiation'),
      n: 'Let us sum up Part 1. A nucleus is described by its atomic number and mass number, and isotopes share an atomic number. Radioactivity is the spontaneous break-up of unstable nuclei. Alpha particles ionise most and penetrate least, gamma rays the reverse. Alpha decay lowers the mass number by four and atomic number by two; beta decay raises the atomic number by one.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Check that A and Z both balance in every decay equation.',
        'A β particle comes from the nucleus (a neutron changing to a proton), not from the electron shells.',
        'Learn the order of ionising power (α > β > γ) and of penetrating power (γ > β > α).',
        'Gamma emission does not change the element.',
      ],
      v: table(['Slip', 'Fix'], [['β decay lowers Z', 'Z increases by 1'], ['α is an electron', 'α is a helium nucleus'], ['γ changes A', 'No change in A or Z']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. In every decay equation, check that the mass numbers and atomic numbers balance on both sides. Remember that the beta particle comes from the nucleus. Learn the orders of ionising and penetrating power, which run in opposite directions. And gamma emission never changes the element.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Radioactivity — Part 2: Uses, hazards and nuclear energy',
  goals: [
    'Give uses of radioisotopes in medicine, industry and agriculture',
    'Describe harmful effects, background radiation and safety precautions',
    'Distinguish nuclear fission from fusion with equations',
    'Explain why nuclear waste must be disposed of safely',
  ],
  slides: [
    sl('title', 'Helpful and harmful', {
      b: 'Part 2 — radiation can cure cancer and power cities, but it can also damage living cells. Using it safely means understanding both sides.',
      v: table(['Use', 'Risk'], [['Cancer treatment with cobalt-60', 'Damage to healthy tissue'], ['Nuclear power stations', 'Radioactive waste'], ['Tracers in medicine and farming', 'Exposure if handled carelessly']], 'Table pairing uses of radioactivity with their risks'),
      n: 'Radiation from radioactive substances is used to treat cancer, check welds, trace leaks and even date ancient objects. Nuclear reactions power electricity stations and the Sun itself. But the same radiation can harm living cells. In this part we look at uses, hazards and safety, and at the two nuclear reactions that release huge amounts of energy.',
    }),
    sl('concept', 'Uses of radioisotopes', {
      b: '**Medicine:** cobalt-60 (γ) to destroy cancer cells (radiotherapy); iodine-131 to diagnose and treat thyroid disorders; sterilising surgical instruments with γ rays. **Industry:** detecting leaks in underground pipes; checking the thickness of paper or metal sheets; finding flaws in welds. **Agriculture:** phosphorus-32 as a tracer to study how plants take up fertiliser; preserving food and producing improved seed varieties. **Dating:** carbon-14 to find the age of old wood and bones.',
      v: table(['Field', 'Radioisotope', 'Use'], [['Medicine', 'Cobalt-60', 'Radiotherapy for cancer'], ['Medicine', 'Iodine-131', 'Thyroid diagnosis and treatment'], ['Agriculture', 'Phosphorus-32', 'Tracer for fertiliser uptake'], ['Archaeology', 'Carbon-14', 'Dating ancient remains'], ['Industry', 'γ sources', 'Checking welds and pipe leaks']], 'Table of radioisotopes and their uses in different fields'),
      n: 'Radioisotopes have many uses. In medicine, gamma rays from cobalt sixty destroy cancer cells, and iodine one thirty one is used for thyroid problems. In industry, radiation reveals leaks in buried pipes and flaws in welds. Farmers and scientists use phosphorus thirty two to trace how plants take up fertiliser, and carbon fourteen tells archaeologists how old a piece of wood is.',
    }),
    sl('check', 'Quick check: uses', {
      b: 'Match a radioisotope with its use.',
      n: 'Quick check. Think of cobalt sixty for cancer and carbon fourteen for dating.',
      chk: 'use-mcq',
    }),
    sl('concept', 'Harmful effects, background radiation and safety', {
      b: '**Harmful effects:** radiation ionises molecules in cells — causing burns, radiation sickness, cancer (leukaemia) and **genetic mutations** passed to children. **Background radiation:** always present — **cosmic rays** from space, radioactive rocks and soil (radon gas), building materials, potassium-40 in food and our bodies, and medical X-rays. **Safety precautions:** handle sources with **long tongs**, store them in **thick lead containers**, keep exposure time short and distance large, wear **lead aprons** and **film badges (dosimeters)**, and never eat or drink near sources. **X-rays**, though not from the nucleus, are also ionising and need care. **Radioactive fallout** is dust from nuclear explosions or accidents that settles over a wide area.',
      v: table(['Source of background radiation', 'Natural or man-made'], [['Cosmic rays', 'Natural'], ['Radon from rocks and soil', 'Natural'], ['Potassium-40 in food and body', 'Natural'], ['Medical X-rays', 'Man-made'], ['Fallout from nuclear tests', 'Man-made']], 'Table of sources of background radiation'),
      n: 'Radiation damages living cells by ionising their molecules. It can cause burns, sickness, cancer and changes in genes that are passed on to children. We are always exposed to a little background radiation from space, rocks, soil and even our own food. People who work with radioactive sources use long tongs, lead containers and lead aprons, keep their distance and time short, and wear badges that record their dose.',
    }),
    sl('example', 'Worked example: choosing a source', {
      b: '**Problem.** Choose α, β or γ for each job and give a reason: (a) checking the thickness of paper on a production line; (b) finding a leak in a pipe buried 1 m underground; (c) a smoke alarm in which the radiation must ionise the air strongly but not escape the alarm.\n\n**(a)** β: partly absorbed by paper, so the count changes with thickness (α would be stopped completely, γ hardly affected).\n\n**(b)** γ: penetrates the soil to reach a detector at the surface.\n\n**(c)** α: strongly ionising, stopped by a few cm of air or the alarm case.',
      v: table(['Job', 'Radiation', 'Reason'], [['Paper thickness', 'β', 'Partly absorbed by paper'], ['Buried pipe leak', 'γ', 'Penetrates soil'], ['Smoke alarm', 'α', 'Strongly ionising, short range']], 'Table of three jobs and the best radiation for each'),
      n: 'Match the radiation to the job. For paper thickness you want radiation that paper partly absorbs, which is beta. To detect a leak through a metre of soil, you need gamma rays, the most penetrating. A smoke alarm needs strong ionisation in a small space with no escape, which is exactly what alpha particles give.',
    }),
    sl('check', 'Quick check: safety', {
      b: 'Choose a correct safety precaution.',
      n: 'Quick check. Distance, shielding and short time keep doses low.',
      chk: 'safety-mcq',
    }),
    sl('concept', 'Nuclear fission', {
      b: r`**Nuclear fission:** a heavy nucleus splits into two lighter nuclei of comparable size when struck by a slow neutron, releasing **energy** and **2–3 neutrons**. For example $${N(235, 92, 'U')} + {}^{1}_{0}n \rightarrow ${N(141, 56, 'Ba')} + ${N(92, 36, 'Kr')} + 3\,{}^{1}_{0}n + \text{energy}$. The neutrons released can split more nuclei — a **chain reaction**. **Controlled** in a nuclear reactor (power stations); **uncontrolled** in an atom bomb. The energy comes from a small loss of mass, $E = mc^{2}$.`,
      v: flow('LR', [['a', 'Slow neutron'], ['b', 'U-235 nucleus'], ['c', 'Ba-141 + Kr-92'], ['d', '3 neutrons'], ['e', 'More fissions (chain reaction)']], [['a', 'b'], ['b', 'c', 'splits'], ['b', 'd'], ['d', 'e']], 'Flow of a neutron splitting uranium-235 into barium and krypton with three neutrons that cause further fissions'),
      n: 'In nuclear fission, a slow neutron strikes a heavy nucleus such as uranium two thirty five, which splits into two smaller nuclei, releasing a great deal of energy and two or three more neutrons. These neutrons can split further nuclei, setting off a chain reaction. In a reactor the chain reaction is controlled to produce steady power; in an atom bomb it runs out of control.',
    }),
    sl('concept', 'Nuclear fusion', {
      b: r`**Nuclear fusion:** two light nuclei join to form a heavier nucleus, releasing energy. For example $${N(2, 1, 'H')} + ${N(3, 1, 'H')} \rightarrow ${N(4, 2, 'He')} + {}^{1}_{0}n + \text{energy}$. It needs **extremely high temperatures** (millions of kelvin) so the positively charged nuclei can overcome their repulsion — it powers the **Sun and stars** and the hydrogen bomb. Fusion releases more energy **per unit mass** than fission and produces little long-lived waste, but it has not yet been controlled for power.`,
      v: table(['Feature', 'Fission', 'Fusion'], [['Process', 'Heavy nucleus splits', 'Light nuclei join'], ['Fuel', 'U-235, Pu-239', 'Isotopes of hydrogen'], ['Conditions', 'Slow neutrons', 'Millions of kelvin'], ['Natural example', 'None common', 'Sun and stars'], ['Waste', 'Radioactive, long-lived', 'Little']], 'Table comparing nuclear fission and fusion'),
      n: 'In nuclear fusion, very light nuclei such as isotopes of hydrogen join to make a heavier nucleus, releasing energy. Because nuclei repel each other, fusion needs temperatures of millions of degrees, which is why it happens naturally only in stars like the Sun. Fusion gives more energy per kilogram than fission and leaves little dangerous waste, but scientists have not yet controlled it to make electricity.',
    }),
    sl('example', 'Worked example: balancing nuclear equations', {
      b: r`**Problem.** Find $x$ and $y$: (a) $${N(235, 92, 'U')} + {}^{1}_{0}n \rightarrow {}^{144}_{56}\text{Ba} + {}^{x}_{36}\text{Kr} + 3\,{}^{1}_{0}n$; (b) $${N(2, 1, 'H')} + ${N(2, 1, 'H')} \rightarrow {}^{3}_{y}\text{He} + {}^{1}_{0}n$.

**(a)** Mass numbers: $235 + 1 = 144 + x + 3$, so $x = ${235 + 1 - 144 - 3}$. Atomic numbers: $92 = 56 + 36$ ✓.

**(b)** Atomic numbers: $1 + 1 = y + 0$, so $y = 2$. Mass numbers: $2 + 2 = 3 + 1$ ✓.`,
      v: table(['Equation', 'Mass numbers', 'Atomic numbers'], [['(a) fission', '236 = 144 + 89 + 3', '92 = 56 + 36'], ['(b) fusion', '4 = 3 + 1', '2 = 2 + 0']], 'Table checking mass and atomic numbers in two nuclear equations'),
      n: 'In every nuclear equation the mass numbers add up to the same total on both sides, and so do the atomic numbers. In the fission equation, two hundred and thirty six must equal one hundred and forty four plus x plus three, so x is eighty nine. In the fusion equation, the atomic numbers two must equal y plus zero, so y is two, which is helium.',
    }),
    sl('concept', 'Safe disposal of nuclear waste', {
      b: 'Spent fuel from reactors stays dangerously **radioactive for thousands of years** and gives out heat. It must not reach water, soil or air. Methods: store it under water in **cooling ponds** first; then seal it in **glass or steel containers** inside thick concrete; finally bury it **deep underground** in stable rock formations away from water and earthquakes. Low-level waste (gloves, clothing) is packed and buried in shallow sites. Careless disposal would cause cancers and genetic damage in people living nearby for generations.',
      v: flow('LR', [['a', 'Spent fuel'], ['b', 'Cooling pond (years)'], ['c', 'Sealed in glass, steel, concrete'], ['d', 'Deep underground storage']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of nuclear waste from cooling ponds to sealed containers to deep underground storage'),
      n: 'Used reactor fuel stays dangerously radioactive for thousands of years and keeps giving out heat. First it is cooled under water in ponds for several years. Then it is sealed in glass or steel containers surrounded by concrete, and finally stored deep underground in stable rock, far from water supplies and earthquake zones. This keeps the radiation away from people and the environment.',
    }),
    sl('check', 'Quick check: fission and fusion', {
      b: 'Distinguish fission from fusion.',
      n: 'Quick check. Fission splits heavy nuclei; fusion joins light ones.',
      chk: 'fission-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Uses: Co-60 radiotherapy, I-131 thyroid, P-32 tracer, C-14 dating, leak and thickness tests.',
        'Hazards: burns, cancer, genetic mutation; background radiation from cosmic rays, rocks, radon, K-40, X-rays.',
        'Safety: tongs, lead shielding, distance, short time, film badges.',
        'Fission: heavy nucleus splits, chain reaction, reactors and atom bombs. Fusion: light nuclei join at millions of kelvin, the Sun.',
        'Nuclear waste: cooling ponds, sealed containers, deep underground storage.',
      ],
      v: table(['Reaction', 'Example'], [['Fission', 'U-235 + n → Ba + Kr + 3n'], ['Fusion', '²H + ³H → ⁴He + n']], 'Summary table of fission and fusion'),
      n: 'Let us sum up Part 2. Radioisotopes are used in medicine, industry, farming and dating, but radiation can cause cancer and genetic damage, so sources are handled with tongs, lead shielding and badges. Fission splits heavy nuclei and can run as a chain reaction; fusion joins light nuclei and powers the Sun. Nuclear waste must be cooled, sealed and stored deep underground.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Name the isotope and the use together (Co-60 → cancer therapy).',
        'For safety questions, give practical steps: tongs, lead, distance, time, badges.',
        'In fission equations, count the neutrons released when balancing A.',
        'Fusion needs very high temperature to overcome repulsion between nuclei.',
      ],
      v: table(['Slip', 'Fix'], [['Fission joins nuclei', 'Fission splits a heavy nucleus'], ['Background radiation is man-made only', 'Mostly natural'], ['Forgetting the 3 neutrons when balancing', 'Include them in the A total']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Always name the isotope with its use. For safety, give practical steps such as tongs, lead shielding, distance, short exposure and film badges. When balancing a fission equation, include the neutrons released. And explain that fusion needs very high temperatures so that the nuclei can overcome their repulsion.',
    }),
  ],
});
