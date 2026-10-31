// ISC 12 Biology ch17 Ecosystem — question bank in ISC style.
// NPP, energy transfers, efficiencies, litter decay and pyramid shapes are computed by calc.mjs. AR keys (ISC options): a b c d.
import { mk, add, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { npp, pct, tenPercent, efficiency, upright, litterLeft, K_DECAY, round } from './calc.mjs';
import { POND, PYRAMIDS } from './svgs.mjs';

const { mcq, ar, fill, num, short, long, part } = mk;
const pondFig = svgV(POND, 'A pond ecosystem with producers, consumers, decomposers and abiotic components');
const pyrFig = svgV(PYRAMIDS, 'Pyramids of number, biomass in the sea, and energy');

// ---------------------------------------------------------------- t01 ecosystem and pond
add('pond-mcq', mcq({
  stem: 'Which organisms are the producers of a pond ecosystem?',
  right: 'Phytoplankton, algae and floating, submerged and marginal plants',
  wrong: ['Zooplankton and fish', 'Fungi and bacteria at the bottom', 'Frogs and water snakes'],
  sol: 'Producers are the photosynthetic autotrophs — option (@K).',
  d: 1, c: 'understanding', t: [1],
  assets: [pondFig],
}));
add('abiotic-mcq', mcq({
  stem: 'A student lists items found in a school pond: zooplankton, dissolved phosphates, water lilies, and bacteria in the mud. Which item is an abiotic component?',
  right: 'Dissolved phosphates',
  wrong: ['Zooplankton', 'Water lilies', 'Bacteria in the mud'],
  sol: 'Dissolved inorganic substances are non-living components — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('manmade-mcq', mcq({
  stem: 'Near a village there are a paddy field, a natural lake, a patch of wild grassland and an estuary. Which of these is a man-made ecosystem?',
  right: 'The paddy field',
  wrong: ['The natural lake', 'The wild grassland', 'The estuary'],
  sol: 'Crop fields and aquaria are man-made ecosystems — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('bottom-mcq', mcq({
  stem: 'A student collects samples from the surface water, the middle and the bottom mud of a pond. In which sample would decomposers such as bacteria and fungi be most abundant?',
  right: 'The bottom mud',
  wrong: ['The surface water', 'The middle water', 'All equally'],
  sol: 'Dead matter settles at the bottom, where decomposers are most abundant — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('marginal-mcq', mcq({
  stem: 'Reeds and grasses rooted in the shallow water along the edge of a pond are best described as',
  right: 'marginal plants that act as producers',
  wrong: ['decomposers of the pond', 'zooplankton', 'abiotic components'],
  sol: 'Marginal plants at the edges are autotrophs — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('strat-fill', fill({
  stem: 'The vertical distribution of species at different levels in an ecosystem, such as trees, shrubs and herbs in a forest, is called ______.',
  acc: [['stratification']],
  sol: 'Stratification.',
  d: 1, c: 'recall', t: [1],
}));
add('ecosystem-short', short({
  marks: 2,
  stem: 'Define an ecosystem and name its biotic and abiotic components.',
  model: 'An **ecosystem** is a **functional unit of nature** in which living organisms **interact** among themselves and with their **physical environment**. **Biotic** components are **producers, consumers and decomposers**; **abiotic** components include **water, soil, minerals, light and temperature**.',
  sol: 'Definition and components.',
  scheme: [['Definition', 1], ['Biotic and abiotic components', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('pondfunc-short', short({
  marks: 2,
  stem: 'State the four functions performed by a pond ecosystem.',
  model: '(i) **Conversion of inorganic into organic material** by autotrophs using sunlight; (ii) **consumption** of autotrophs by **heterotrophs**; (iii) **decomposition and mineralisation** of dead organic matter, releasing minerals for reuse; (iv) **unidirectional flow of energy** to higher trophic levels, with **loss as heat**.',
  sol: 'Four functions.',
  scheme: [['Two functions', 1], ['Two more', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('pond-short3', short({
  marks: 3,
  stem: 'A class studies the pond in its school garden. Describe the producers, consumers, decomposers and abiotic components they should record.',
  model: '**Producers:** **phytoplankton**, algae, and **floating, submerged and marginal plants**. **Consumers:** **zooplankton** and **free-swimming and bottom-dwelling** animals such as fish, insects and snails. **Decomposers:** **bacteria, fungi and flagellates**, mostly in the **bottom mud**. **Abiotic components:** **water** with **dissolved inorganic and organic substances**, the **soil deposit** at the bottom, and **sunlight, temperature and day length**.',
  sol: 'Four groups.',
  scheme: [['Producers and consumers', 1], ['Decomposers', 1], ['Abiotic components', 1]],
  d: 3, c: 'application', t: [1],
  assets: [pondFig],
}));
add('pond-long', long({
  stem: '(a) Draw a labelled diagram of a pond ecosystem showing its components. [2]\n(b) Explain the functions of a pond ecosystem. [2]\n(c) If all decomposers in a pond were killed, what would happen over time? [1]',
  model: '(a) **Diagram:** a pond with **sunlight**; **phytoplankton**, **floating**, **submerged** and **marginal plants** (producers); **zooplankton** and **fish** (consumers); **bacteria and fungi** in the **bottom mud** (decomposers); **water with dissolved substances** and **soil deposit** (abiotic).\n\n(b) **Producers** convert inorganic materials into organic matter using sunlight; **consumers** eat them; **decomposers** break down dead matter and **mineralise** it; **energy** flows one way and is lost as **heat**.\n\n(c) Dead matter would **accumulate**; **nutrients** would stay locked in it and not be **recycled**, so the producers would run short of minerals and the whole ecosystem would **decline**.',
  sol: 'Diagram; functions; decomposers.',
  scheme: [['(a) Labelled pond', 2], ['(b) Production, consumption', 1], ['(b) Decomposition, energy flow', 1], ['(c) Nutrients not recycled', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 productivity
add('npp-ar', ar({
  a: 'Net primary productivity is always less than gross primary productivity.',
  r: 'Plants use part of the organic matter they produce in respiration.',
  key: 'a',
  sol: 'Both are true, and respiratory loss (NPP = GPP − R) explains the difference — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('gppdef-mcq', mcq({
  stem: 'Gross primary productivity of an ecosystem is the',
  right: 'rate of production of organic matter by plants during photosynthesis',
  wrong: ['amount of nutrients in the soil at a given time', 'rate of formation of new organic matter by consumers', 'biomass at each trophic level at a particular time'],
  sol: 'GPP is total photosynthetic production per unit area per unit time — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('par-mcq', mcq({
  stem: 'About what fraction of the incident solar radiation is photosynthetically active radiation (PAR)?',
  right: 'About 50 percent',
  wrong: ['About 2–10 percent', 'About 1 percent', 'About 90 percent'],
  sol: 'PAR is about half of incident radiation; plants capture 2–10 percent of PAR — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ocean-mcq', mcq({
  stem: 'Oceans cover about 70 percent of the Earth’s surface but contribute only about a third of global net primary productivity. What is the main reason?',
  right: 'Open ocean water is poor in nutrients, which limits phytoplankton growth.',
  wrong: ['Phytoplankton cannot photosynthesise.', 'Sunlight does not reach the ocean surface.', 'Oceans have no producers.'],
  sol: 'Nutrient scarcity limits primary productivity in most of the ocean — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('standing-mcq', mcq({
  stem: 'The amount of nitrogen, phosphorus and calcium present in the soil of an ecosystem at a given time is its',
  right: 'standing state',
  wrong: ['standing crop', 'gross primary productivity', 'secondary productivity'],
  sol: 'Standing state refers to nutrients; standing crop to living biomass — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('secondary-mcq', mcq({
  stem: 'The rate at which herbivores and carnivores in a grassland form new organic matter is called',
  right: 'secondary productivity',
  wrong: ['gross primary productivity', 'net primary productivity', 'standing state'],
  sol: 'Secondary productivity is production by consumers — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ocean-fill', fill({
  stem: 'Of the global annual net primary productivity of about 170 billion tons, the oceans contribute only about ______ billion tons.',
  acc: [['55']],
  sol: '55 billion tons.',
  d: 2, c: 'recall', t: [2],
}));
{
  const n = npp(18000, 7500);
  add('npp-num', num({
    stem: 'A wheat field has a gross primary productivity of 18 000 kcal m⁻² yr⁻¹, and the wheat plants respire 7500 kcal m⁻² yr⁻¹. What is the net primary productivity?',
    value: n, unit: 'kcal m⁻² yr⁻¹',
    sol: r`$\text{NPP} = 18000 - 7500 = ${n}$.`,
    scheme: [[`${n}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 10500 || 'value');
}
{
  const p = pct(npp(12000, 4200), 12000);
  add('nppct-num', num({
    stem: 'In a lake, phytoplankton have a GPP of 12 000 kcal m⁻² yr⁻¹ and lose 4200 kcal m⁻² yr⁻¹ in respiration. What percentage of GPP is available to consumers as NPP?',
    value: p, tol: 0.05, unit: '%',
    sol: r`NPP $= 12000 - 4200 = 7800$; $\dfrac{7800}{12000} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 65 || 'value');
}
{
  const R = 20000 - 12000;
  add('r-num', num({
    stem: 'A forest has a GPP of 20 000 kcal m⁻² yr⁻¹ and an NPP of 12 000 kcal m⁻² yr⁻¹. How much energy do its plants use in respiration?',
    value: R, unit: 'kcal m⁻² yr⁻¹',
    sol: r`$R = \text{GPP} - \text{NPP} = 20000 - 12000 = ${R}$.`,
    scheme: [[`${R}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 8000 || 'value');
}
{
  const parE = 100000 * 0.5, cap = parE * 0.04;
  add('parenergy-num', num({
    stem: 'A field receives 100 000 J of solar radiation. If PAR is 50 percent of this and the crop captures 4 percent of the PAR, how many joules are captured in photosynthesis?',
    value: cap, unit: 'J',
    sol: r`PAR $= 100000 \times 0.5 = ${parE}$ J; captured $= ${parE} \times 0.04 = ${cap}$ J.`,
    scheme: [[`${cap}`, 1]],
    d: 3, c: 'application', t: [2],
  }), (q) => q.answer.value === 2000 || 'value');
}
add('standing-short', short({
  marks: 2,
  stem: 'Distinguish between standing crop and standing state of an ecosystem.',
  model: '**Standing crop** is the **mass of living material (biomass)** present at each **trophic level** at a particular time, measured as fresh or dry weight per unit area. **Standing state** is the amount of **nutrients** — carbon, nitrogen, phosphorus, calcium — present in the **soil** at any given time.',
  sol: 'Biomass vs nutrients.',
  scheme: [['Standing crop', 1], ['Standing state', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('productivity-short', short({
  marks: 3,
  stem: 'Distinguish between gross primary productivity, net primary productivity and secondary productivity, and write the relation between the first two.',
  model: '**GPP** is the **rate of production of organic matter** by plants during **photosynthesis**. Part of it is used by the plants in **respiration (R)**. **NPP** is what remains, **NPP = GPP − R**, and is available to **herbivores and decomposers**. **Secondary productivity** is the **rate of formation of new organic matter by consumers**. All are expressed per unit area per unit time (g m⁻² yr⁻¹ or kcal m⁻² yr⁻¹).',
  sol: 'Three terms; relation.',
  scheme: [['GPP', 1], ['NPP = GPP − R', 1], ['Secondary productivity', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('par-short3', short({
  marks: 3,
  stem: 'Of 2 000 000 J of sunlight falling on a pasture, half is PAR and the grass captures 2 percent of the PAR. Calculate the energy captured and comment on why this small fraction matters for the whole ecosystem.',
  model: `PAR = 2 000 000 × 0.5 = **1 000 000 J**; captured = 1 000 000 × 0.02 = **${round(1000000 * 0.02, 0)} J**. Plants capture only **2–10 percent of PAR**, yet this small amount is the **only energy input** for herbivores, carnivores and decomposers; everything else in the ecosystem depends on it, and much of it is later **lost as heat**.`,
  sol: 'Calculation; significance.',
  scheme: [['PAR calculated', 1], ['Energy captured', 1], ['Sustains the ecosystem', 1]],
  d: 3, c: 'application', t: [2],
}), () => round(1000000 * 0.02, 0) === 20000 || 'par');
add('productivity-long', long({
  stem: '(a) Define primary productivity and state its units. [1]\n(b) Explain GPP, NPP and the relation between them. [2]\n(c) A tropical rain forest has GPP 30 000 and R 18 000 kcal m⁻² yr⁻¹; a grassland has GPP 12 000 and R 4000 kcal m⁻² yr⁻¹. Which has the higher NPP, and which converts the higher percentage of GPP into NPP? [2]',
  model: `(a) **Primary productivity** is the **rate of biomass production** by plants per unit area, in **g m⁻² yr⁻¹** or **kcal m⁻² yr⁻¹**.\n\n(b) **GPP** is the rate of production of organic matter in **photosynthesis**; part is used in **respiration (R)**; **NPP = GPP − R** is available to **heterotrophs**.\n\n(c) Forest NPP = **${npp(30000, 18000)}**; grassland NPP = **${npp(12000, 4000)}**. The **forest** has the higher NPP, but the **grassland** converts a higher percentage of GPP (**${pct(npp(12000, 4000), 12000)} percent** vs **${pct(npp(30000, 18000), 30000)} percent**), as forest trees respire much more.`,
  sol: 'Definition; GPP and NPP; comparison.',
  scheme: [['(a) Definition and units', 1], ['(b) GPP, R, NPP', 2], ['(c) NPP values', 1], ['(c) Percentages compared', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [2],
}), () => (npp(30000, 18000) === 12000 && npp(12000, 4000) === 8000) || 'npp');

// ---------------------------------------------------------------- t03 decomposition
add('humus-mcq', mcq({
  stem: 'A dark, crumbly layer forms in the upper soil of a forest after years of leaf fall. Which statement about this humus is correct?',
  right: 'It is dark, amorphous and highly resistant to microbial action, and it stores nutrients.',
  wrong: ['It decomposes faster than fresh leaves.', 'It is formed by leaching of salts.', 'It is the first step of decomposition.'],
  sol: 'Humus resists decay and acts as a colloidal reservoir of nutrients — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('frag-mcq', mcq({
  stem: 'Earthworms in a garden break fallen leaves into tiny pieces. Which step of decomposition is this?',
  right: 'Fragmentation',
  wrong: ['Leaching', 'Humification', 'Mineralisation'],
  sol: 'Detritivores carry out fragmentation — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('leaching-mcq', mcq({
  stem: 'During decomposition, water-soluble inorganic nutrients move down into the soil and are precipitated as unavailable salts. This step is',
  right: 'leaching',
  wrong: ['catabolism', 'fragmentation', 'humification'],
  sol: 'Leaching moves soluble nutrients down the soil — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('lignin-mcq', mcq({
  stem: 'Which of these, placed in identical conditions, would decompose most slowly?',
  right: 'Woody twigs rich in lignin',
  wrong: ['Fresh green leaves rich in nitrogen', 'Overripe fruit rich in sugars', 'Dead earthworms rich in protein'],
  sol: 'Lignin and chitin slow decomposition — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('climate-mcq', mcq({
  stem: 'Thick layers of partly decomposed plant matter (peat) build up in cold, waterlogged bogs. What is the best explanation?',
  right: 'Low temperature and lack of oxygen inhibit decomposers.',
  wrong: ['Too many decomposers compete for the litter.', 'Warm, moist conditions speed up humification.', 'Plants do not shed leaves in bogs.'],
  sol: 'Cold and anaerobic conditions slow decomposition, so organic matter accumulates — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('decomp-ar', ar({
  a: 'Decomposition of litter is faster in warm, moist conditions.',
  r: 'Decomposition is mainly an anaerobic process.',
  key: 'c',
  sol: 'A is true; R is false: decomposition is largely an oxygen-requiring (aerobic) process — option (c).',
  d: 3, c: 'understanding', t: [3],
}));
add('catabolism-fill', fill({
  stem: 'The step in which bacterial and fungal enzymes degrade detritus into simpler inorganic substances is called ______.',
  acc: [['catabolism']],
  sol: 'Catabolism.',
  d: 1, c: 'recall', t: [3],
}));
{
  const left = litterLeft(100, K_DECAY.warm, 4);
  add('decay-num', num({
    stem: `Leaf litter in a warm forest loses mass as M = M₀e^{−kt}, with k = ${K_DECAY.warm} per month. What mass of an initial 100 g remains after 4 months? (Take e⁻¹ = 0.368; one decimal place.)`,
    value: left, tol: 0.1, unit: 'g',
    sol: r`$M = 100 \times e^{-${K_DECAY.warm} \times 4} = 100 \times e^{-1} = ${left}$ g.`,
    scheme: [[`${left} g`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 36.8 || 'value');
}
add('factors-short', short({
  marks: 2,
  stem: 'A gardener wants her compost pit to decompose quickly. Suggest two things she should do, and explain each using the factors that control decomposition.',
  model: '(i) Keep the pit **moist and warm** (and turn it for **air**) — decomposition is mainly **aerobic** and is favoured by **warmth and moisture**. (ii) Add **soft, nitrogen-rich** material such as green leaves and kitchen waste, and avoid woody material — detritus rich in **nitrogen and sugars** decomposes faster than that rich in **lignin**.',
  sol: 'Climate and chemistry.',
  scheme: [['Warm, moist, aerated', 1], ['Nitrogen-rich, not lignin-rich', 1]],
  d: 2, c: 'application', t: [3],
}));
add('decomp-short', short({
  marks: 3,
  stem: 'Describe the steps by which fallen leaves are decomposed in soil.',
  model: '**Fragmentation:** detritivores such as **earthworms** break the leaves into **small particles**. **Leaching:** **water-soluble** inorganic nutrients move down into the soil and are **precipitated as unavailable salts**. **Catabolism:** **bacterial and fungal enzymes** degrade the detritus into simpler inorganic substances. **Humification:** dark, amorphous **humus** forms, which **resists** decay and stores nutrients. **Mineralisation:** some microbes slowly degrade humus, releasing **inorganic nutrients**.',
  sol: 'Five steps.',
  scheme: [['Fragmentation and leaching', 1], ['Catabolism', 1], ['Humification and mineralisation', 1]],
  d: 2, c: 'understanding', t: [3],
}));
{
  const warm = litterLeft(100, K_DECAY.warm, 12), cold = litterLeft(100, K_DECAY.cold, 12);
  add('litter-short', short({
    marks: 3,
    stem: `Litter bags with 100 g of leaves were left in two forests for a year. In forest P, ${warm} g remained; in forest Q, ${cold} g remained. Suggest the climate of each forest, and predict which forest has the deeper layer of litter and humus on its floor. Explain.`,
    model: `P lost most of its litter (only ${warm} g left), so it is probably **warm and moist**, favouring decomposers. Q lost little (${cold} g left), so it is probably **cold or dry** (or waterlogged), where **low temperature or anaerobic conditions** inhibit decomposers. **Q** will have the **deeper litter and humus layer**, because dead matter **accumulates** faster than it is broken down, while in P nutrients are **recycled quickly**.`,
    sol: 'Climates; accumulation.',
    scheme: [['P warm, moist', 1], ['Q cold or dry; decomposers inhibited', 1], ['Q accumulates litter', 1]],
    d: 4, c: 'analysis', t: [3],
  }), () => warm < cold || 'decay');
}
add('decomp-long', long({
  stem: '(a) What is detritus? Name two detritivores or decomposers. [1]\n(b) Describe the five steps of decomposition. [3]\n(c) Explain why leaf litter in a tropical rain forest disappears much faster than in a coniferous forest of a cold region. [1]',
  model: '(a) **Detritus** is dead plant remains (leaves, bark, flowers) and dead animal remains including **faecal matter**; e.g. **earthworms** (detritivores), **bacteria and fungi** (decomposers).\n\n(b) **Fragmentation** by detritivores into small particles; **leaching** of soluble nutrients into the soil, precipitated as salts; **catabolism** by bacterial and fungal **enzymes** into simpler inorganic substances; **humification** to resistant, dark **humus**; **mineralisation** of humus releasing inorganic nutrients.\n\n(c) The rain forest is **warm and moist**, favouring rapid microbial activity; the cold forest has **low temperatures** and needle litter rich in **resistant compounds**, so decomposition is **slow**.',
  sol: 'Detritus; steps; climate.',
  scheme: [['(a) Detritus and examples', 1], ['(b) Five steps', 3], ['(c) Warm, moist vs cold', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 energy flow
add('dfc-mcq', mcq({
  stem: 'A detritus food chain begins with',
  right: 'dead organic matter',
  wrong: ['living green plants', 'herbivores', 'top carnivores'],
  sol: 'The DFC starts with detritus — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('tenpct-mcq', mcq({
  stem: 'Producers in a meadow trap 30 000 J of energy. Following the 10 percent law, how much energy is passed on to the primary consumers?',
  right: '3000 J',
  wrong: ['300 J', '27 000 J', '30 J'],
  sol: r`$30000 \times 0.1 = 3000$ J — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => tenPercent(30000, 2)[1] === 3000 || 'ten');
add('trophic-mcq', mcq({
  stem: 'In the food chain grass → grasshopper → frog → snake → hawk, at which trophic level is the frog?',
  right: 'Third (secondary consumer)',
  wrong: ['Second (primary consumer)', 'Fourth (tertiary consumer)', 'First (producer)'],
  sol: 'Grass 1, grasshopper 2, frog 3 — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('aquaticgfc-mcq', mcq({
  stem: 'Which statement about the two kinds of food chain is correct?',
  right: 'In aquatic ecosystems the grazing food chain is the major conduit of energy flow.',
  wrong: ['In terrestrial ecosystems almost all energy flows through the grazing food chain.', 'The detritus food chain begins with green plants.', 'The two food chains are never connected.'],
  sol: 'GFC dominates in water; DFC carries more energy on land — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('vent-mcq', mcq({
  stem: 'Which ecosystems are an exception to the rule that the sun is the source of all energy?',
  right: 'Deep-sea hydrothermal vent communities',
  wrong: ['Tropical rain forests', 'Grasslands', 'Ponds'],
  sol: 'Vent ecosystems depend on chemical energy — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('saprotroph-mcq', mcq({
  stem: 'Fungi and bacteria that obtain their food by secreting digestive enzymes onto dead organic matter belong to which group?',
  right: 'Saprotrophs (decomposers) of the detritus food chain',
  wrong: ['Producers of the grazing food chain', 'Primary carnivores', 'Herbivores'],
  sol: 'Decomposers are heterotrophic saprotrophs — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('lindeman-fill', fill({
  stem: 'The 10 percent law of energy transfer between trophic levels was proposed by ______.',
  acc: [['Lindeman', 'Raymond Lindeman']],
  sol: 'Lindeman.',
  d: 1, c: 'recall', t: [4],
}));
{
  const e = tenPercent(80000, 3)[2];
  add('energy-num', num({
    stem: 'Phytoplankton in a lake trap 80 000 J. Using the 10 percent law, how much energy reaches the secondary consumers (small fish that eat zooplankton)?',
    value: e, unit: 'J',
    sol: r`$80000 \times 0.1 \times 0.1 = ${e}$ J.`,
    scheme: [[`${e}`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 800 || 'value');
}
{
  const ef = efficiency(180, 2000);
  add('efficiency-num', num({
    stem: 'Herbivores in a field take in 2000 kJ of plant energy, and the carnivores that eat them gain 180 kJ. What is the ecological efficiency of transfer from herbivores to carnivores, in percent?',
    value: ef, tol: 0.05, unit: '%',
    sol: r`$\dfrac{180}{2000} \times 100 = ${ef}$ percent.`,
    scheme: [[`${ef}`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.value === 9 || 'value');
}
add('web-short', short({
  marks: 2,
  stem: 'What is a food web? Why is it a more realistic picture of an ecosystem than a food chain?',
  model: 'A **food web** is a network of **interconnected food chains** in an ecosystem. It is more realistic because most animals eat **more than one kind of food** and are eaten by **more than one predator**, and a species may feed at **more than one trophic level**; a single chain ignores these links.',
  sol: 'Definition; realism.',
  scheme: [['Definition', 1], ['Reason more realistic', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('gfcdfc-short', short({
  marks: 3,
  stem: 'Distinguish between the grazing food chain and the detritus food chain, giving an example of each, and state in which kind of ecosystem each carries more energy.',
  model: 'The **grazing food chain** begins with **living green plants** (producers) and passes to herbivores and carnivores — for example **grass → goat → man**; it is the **major conduit** in **aquatic** ecosystems. The **detritus food chain** begins with **dead organic matter** and involves **decomposers** (saprotrophic fungi and bacteria) and detritivores — for example **dead leaves → earthworm → bird**; in **terrestrial** ecosystems a much **larger fraction** of energy flows through it.',
  sol: 'Starting point, example, ecosystem.',
  scheme: [['GFC with example', 1], ['DFC with example', 1], ['Aquatic vs terrestrial', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('energy-short3', short({
  marks: 3,
  stem: 'Explain why food chains in nature rarely have more than four or five trophic levels.',
  model: 'Energy flow is **unidirectional**, and at each transfer only about **10 percent** of the energy passes to the next level (**10 percent law**); the rest is used in **respiration** and lost as **heat**, or remains unused. After four or five transfers, only a **tiny fraction** of the energy fixed by producers remains — too little to support a **viable population** of a further level of consumers.',
  sol: '10 percent law.',
  scheme: [['About 10 percent transferred', 1], ['Rest lost as heat', 1], ['Too little for more levels', 1]],
  d: 3, c: 'application', t: [4],
}));
add('energy-long', long({
  stem: '(a) Explain why energy flow in an ecosystem is described as unidirectional. [1]\n(b) State the 10 percent law. If producers fix 60 000 J, how much energy reaches each of the next three trophic levels? [2]\n(c) Draw a pyramid of energy for this chain and explain why it can never be inverted. [2]',
  model: `(a) Energy passes from the **sun to producers to consumers** and is lost as **heat** at each level; it **does not return** to the sun or to producers.\n\n(b) Only about **10 percent** of the energy at one trophic level passes to the next (**Lindeman**). Primary consumers **${tenPercent(60000, 4)[1]} J**, secondary **${tenPercent(60000, 4)[2]} J**, tertiary **${tenPercent(60000, 4)[3]} J**.\n\n(c) **Diagram:** four stacked bars narrowing upwards — producers **60000**, then **6000**, **600**, **60 J**. Energy is **lost as heat** at every transfer, so each level must have **less** energy than the one below; the pyramid is **always upright**.`,
  sol: 'Unidirectional; 10 percent; pyramid.',
  scheme: [['(a) Unidirectional with heat loss', 1], ['(b) Law', 1], ['(b) Three values', 1], ['(c) Pyramid drawn', 1], ['(c) Never inverted', 1]],
  wl: [60, 200],
  d: 3, c: 'application', t: [4, 5],
}), () => tenPercent(60000, 4).join() === '60000,6000,600,60' || 'ten');

// ---------------------------------------------------------------- t05 ecological pyramids
add('pyramid-ar', ar({
  a: 'The pyramid of energy is always upright.',
  r: 'Some energy is always lost as heat when it passes from one trophic level to the next.',
  key: 'a',
  sol: 'Both are true, and heat loss at each transfer explains why the energy pyramid cannot be inverted — option (a).',
  d: 3, c: 'understanding', t: [5],
}));
add('invert-ar', ar({
  a: 'The pyramid of biomass in the sea is upright.',
  r: 'Phytoplankton have a much larger standing crop than the fishes that depend on them.',
  key: 'd',
  sol: 'Both are false: the sea’s pyramid of biomass is inverted, because fish and zooplankton biomass exceeds the small standing crop of phytoplankton — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('tree-mcq', mcq({
  stem: 'A single mango tree supports 2000 caterpillars, which are eaten by 15 birds. What shape is the pyramid of numbers for this food chain?',
  right: 'Inverted at the base, because one tree supports many caterpillars',
  wrong: ['Upright, because producers are always most numerous', 'A straight column, because numbers are equal', 'It cannot be drawn for a tree'],
  sol: 'The producer level (1 tree) is smaller than the herbivore level (2000) — option (@K).',
  d: 2, c: 'application', t: [5],
}), () => !upright([1, 2000, 15]) || 'tree');
add('sea-mcq', mcq({
  stem: 'In the open sea, a sample shows 4 g m⁻² of phytoplankton supporting 21 g m⁻² of zooplankton. Which pyramid is inverted here, and why is this possible?',
  right: 'The pyramid of biomass; phytoplankton reproduce so fast that a small standing crop supports a larger consumer biomass.',
  wrong: ['The pyramid of energy; zooplankton make their own energy.', 'The pyramid of numbers; there are fewer zooplankton than phytoplankton.', 'No pyramid is inverted; zooplankton are producers.'],
  sol: 'Biomass in the sea is inverted, but energy is not — option (@K).',
  d: 3, c: 'application', t: [5],
  assets: [pyrFig],
}), () => !upright([4, 21]) || 'sea');
add('grassland-mcq', mcq({
  stem: 'A grassland has 1 500 000 grass plants, 150 000 insects, 15 000 frogs and 15 snakes in the same area. The pyramid of numbers is',
  right: 'upright',
  wrong: ['inverted', 'spindle-shaped', 'impossible to draw'],
  sol: 'Each level is smaller than the one below — option (@K).',
  d: 2, c: 'application', t: [5],
}), () => upright([1500000, 150000, 15000, 15]) || 'grass');
add('base-mcq', mcq({
  stem: 'In any ecological pyramid, the base always represents',
  right: 'the producers (first trophic level)',
  wrong: ['the decomposers', 'the top carnivores', 'the abiotic components'],
  sol: 'Producers form the base — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('limitation-mcq', mcq({
  stem: 'Which is a limitation of ecological pyramids?',
  right: 'They give no place to saprophytes and assume a simple food chain.',
  wrong: ['They cannot show energy.', 'They always show inverted shapes.', 'They include too many trophic levels.'],
  sol: 'Pyramids ignore decomposers, food webs and species at several levels — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('pyramid-short', short({
  marks: 2,
  stem: 'Classify these two pyramids: (i) numbers on one banyan tree — 1 tree, 5000 insects, 40 birds; (ii) energy in a lake — 50 000, 5000, 500 J. State whether each is upright or inverted, with a reason.',
  model: `(i) **${upright([1, 5000, 40]) ? 'Upright' : 'Inverted'}** at the base: the single **producer** supports far more **insects**. (ii) **${upright([50000, 5000, 500]) ? 'Upright' : 'Inverted'}**: each level has **less energy** than the one below because energy is **lost as heat** at each transfer.`,
  sol: 'Tree inverted; energy upright.',
  scheme: [['(i) Inverted with reason', 1], ['(ii) Upright with reason', 1]],
  d: 2, c: 'application', t: [5],
}), () => (!upright([1, 5000, 40]) && upright([50000, 5000, 500])) || 'shapes');
add('pyrlimit-short', short({
  marks: 2,
  stem: 'State two limitations of ecological pyramids.',
  model: '(i) They assume a **simple food chain**, which almost never exists in nature, and cannot show a **food web**. (ii) They do not account for the same species belonging to **two or more trophic levels**, and they give **no place to saprophytes (decomposers)**, which play a vital role.',
  sol: 'Two limitations.',
  scheme: [['First limitation', 1], ['Second limitation', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('pyramid-short3', short({
  marks: 3,
  stem: 'Describe the pyramids of number, biomass and energy, giving one example of an upright and one of an inverted pyramid where possible.',
  model: '**Pyramid of numbers:** upright in a **grassland** (many grasses, fewer herbivores, few carnivores); **inverted** for a **single tree** supporting many insects. **Pyramid of biomass:** upright on land; **inverted in the sea**, where fish and zooplankton biomass exceeds that of phytoplankton. **Pyramid of energy:** **always upright**, because energy is **lost as heat** at each level; it can **never** be inverted.',
  sol: 'Three pyramids.',
  scheme: [['Numbers with examples', 1], ['Biomass with examples', 1], ['Energy always upright', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- stimulus-based
{
  const L = [['Phytoplankton', 120000], ['Zooplankton', 11000], ['Small fish', 1000], ['Large fish', 85]];
  const ef1 = efficiency(L[1][1], L[0][1]), ef2 = efficiency(L[2][1], L[1][1]);
  add('lake-case', mk.case({
    passage: `Ecologists measured the energy (kJ m⁻² yr⁻¹) at each trophic level of a lake.\n\n| Trophic level | Organisms | Energy |\n|---|---|---|\n${L.map(([o, e], i) => `| ${i + 1} | ${o} | ${e} |`).join('\n')}`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'Calculate the efficiency of energy transfer from phytoplankton to zooplankton, in percent (one decimal place).',
        value: ef1, tol: 0.05, unit: '%',
        sol: r`$\dfrac{${L[1][1]}}{${L[0][1]}} \times 100 = ${ef1}$ percent.`,
        scheme: [[`${ef1}`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('b', mcq({
        stem: `The efficiency from zooplankton to small fish is ${ef2} percent. Which statement best fits the data?`,
        right: 'Transfer efficiencies are close to the 10 percent predicted by Lindeman’s law.',
        wrong: ['Energy increases at each trophic level.', 'Small fish receive more energy than zooplankton.', 'The pyramid of energy here is inverted.'],
        sol: 'Both efficiencies are near 10 percent, and each level has less energy — option (@K).',
        d: 3, c: 'analysis', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'What happens to the energy that does not pass from phytoplankton to zooplankton?',
        model: 'Most is **used in respiration** by the phytoplankton and **lost as heat**; some is in parts **not eaten** or **not digested**, which pass to **decomposers** through the **detritus food chain**.',
        sol: 'Respiration and detritus.',
        scheme: [['Respiration, heat loss', 1], ['Uneaten matter to decomposers', 1]],
        d: 3, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'Why would a fifth trophic level, a fish-eating bird, be very small in numbers on this lake?',
          model: 'Only about **10 percent** of the large fish’s **85 kJ** — about **8.5 kJ m⁻² yr⁻¹** — would reach the birds, which is **very little energy**, so only a **few birds** could be supported.',
          sol: 'Little energy left.',
          scheme: [['About 10 percent of 85 kJ', 1], ['Supports few birds', 1]],
          d: 3, c: 'analysis', t: [4],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 9.2 || 'value');
}
{
  const M = [0, 2, 4, 8];
  const warm = M.map((m) => litterLeft(50, K_DECAY.warm, m));
  const cold = M.map((m) => litterLeft(50, K_DECAY.cold, m));
  add('litter-case', mk.case({
    passage: `Mesh bags with 50 g of dry leaf litter were buried in two sites and the mass remaining was measured.\n\n| Months | ${M.join(' | ')} |\n|${M.map(() => '---|').join('')}---|\n| Site X (g) | ${warm.join(' | ')} |\n| Site Y (g) | ${cold.join(' | ')} |`,
    d: 3, c: 'analysis',
    children: [
      part('a', num({
        stem: 'What percentage of the original litter had decomposed in site X after 8 months? (One decimal place.)',
        value: round(((50 - warm[3]) / 50) * 100, 1), tol: 0.1, unit: '%',
        sol: r`$\dfrac{50 - ${warm[3]}}{50} \times 100 = ${round(((50 - warm[3]) / 50) * 100, 1)}$ percent.`,
        scheme: [[`${round(((50 - warm[3]) / 50) * 100, 1)}`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('b', mcq({
        stem: 'Which description of the two sites best fits the data?',
        right: 'Site X is warm and moist; site Y is cold or dry.',
        wrong: ['Site X is cold and waterlogged; site Y is warm and moist.', 'Both sites have the same climate.', 'Site Y has more decomposers than site X.'],
        sol: 'Faster loss in X indicates conditions favouring decomposers — option (@K).',
        d: 3, c: 'analysis', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why were the bags made of mesh rather than closed plastic?',
        model: 'Mesh lets **air, water**, **microbes** and small **detritivores** reach the litter, so it decomposes as it would naturally; a **closed** bag would keep them out and make conditions **anaerobic**.',
        sol: 'Natural access.',
        scheme: [['Access for decomposers, air, water', 1], ['Closed bag would be unnatural', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Which site would you expect to have the larger store of nutrients locked in litter and humus, and why?',
          model: '**Site Y**: litter decomposes **slowly**, so organic matter and the **nutrients** in it **accumulate** on the floor instead of being quickly **mineralised** and taken up by plants.',
          sol: 'Site Y.',
          scheme: [['Site Y', 1], ['Slow decomposition, accumulation', 1]],
          d: 3, c: 'analysis', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 86.4 || 'value');
}
