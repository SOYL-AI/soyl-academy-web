// ISC 12 Biology ch17 Ecosystem — Part 1 (t01–t03), Part 2 (t04–t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { ENERGY, PYRAMIDS, POND, DECAY, E } from './svgs.mjs';
import { npp, pct, tenPercent, efficiency, upright, litterLeft, K_DECAY } from './calc.mjs';

export const V = {
  energy: svgV(ENERGY, 'Energy passing up four trophic levels with heat lost at each'),
  pyramids: svgV(PYRAMIDS, 'Pyramids of number, biomass in the sea, and energy'),
  pond: svgV(POND, 'A pond ecosystem with producers, consumers, decomposers and abiotic components'),
  decay: svgV(DECAY, 'Litter decomposing faster in a warm, moist habitat than in a cold, dry one'),
};

// ---------------------------------------------------------------- computed numbers
export const PROD = { gpp: 25000, r: 9000 };
export const NPP = npp(PROD.gpp, PROD.r);
export const NPP_PCT = pct(NPP, PROD.gpp);
export const WARM6 = litterLeft(100, K_DECAY.warm, 6);
export const COLD6 = litterLeft(100, K_DECAY.cold, 6);
export const E5 = tenPercent(50000, 4);
export const EFF = efficiency(E[1], E[0]);
export const TREE = [1, 400, 30];
export const SEA = [4, 21];

export const deck1 = deck({
  part: 1,
  title: 'Ecosystem — Part 1: Structure, productivity and decomposition',
  goals: [
    'Define an ecosystem, name its types, and describe the structure and function of a pond',
    'Distinguish GPP, NPP and secondary productivity; explain PAR, standing crop and standing state',
    'Describe the steps of decomposition and the factors that affect its rate',
  ],
  slides: [
    sl('title', 'The ecosystem', {
      b: 'Part 1 — what an ecosystem is, how much it produces, and how dead matter is recycled.',
      v: flow('LR', [['a', 'Abiotic components'], ['p', 'Producers'], ['c', 'Consumers'], ['d', 'Decomposers']], [['a', 'p'], ['p', 'c'], ['c', 'd'], ['d', 'a']], 'Cycle from abiotic components to producers, consumers and decomposers and back'),
      n: 'An ecosystem is a functional unit of nature in which living organisms interact among themselves and with their physical surroundings. Energy flows through it, and nutrients are cycled back again and again.',
    }),
    sl('concept', 'Types and components of ecosystems', {
      b: 'Ecosystems vary in size from a small pond to a large forest or sea.',
      v: table(['Category', 'Examples or members'], [['Terrestrial', 'Forest, grassland, desert'], ['Aquatic', 'Pond, lake, wetland, river, estuary'], ['Man-made', 'Crop fields, aquarium'], ['Biotic components', 'Producers, consumers, decomposers'], ['Abiotic components', 'Water, soil, minerals, light, temperature']], 'Table of types and components of ecosystems'),
      n: 'Whatever its size, every ecosystem has living parts and non-living parts that interact. The forest, grassland and desert are terrestrial; ponds, lakes, rivers and estuaries are aquatic; crop fields and aquaria are made by people.',
    }),
    sl('diagram', 'A pond ecosystem', {
      b: 'A pond is a shallow water body showing all the basic components of an ecosystem.',
      v: V.pond,
      n: 'Phytoplankton, algae and floating, submerged and marginal plants are the producers. Zooplankton and free-swimming and bottom-dwelling animals are consumers. Fungi, bacteria and flagellates at the bottom decompose dead matter, and sunlight, temperature and dissolved substances are the abiotic components.',
    }),
    sl('concept', 'How a pond works', {
      b: 'A pond performs all the functions of an ecosystem.',
      v: table(['Function', 'In the pond'], [['Production', 'Autotrophs convert inorganic materials into organic matter using sunlight'], ['Consumption', 'Heterotrophs eat the autotrophs'], ['Decomposition', 'Dead organic matter is broken down and minerals are released for reuse'], ['Energy flow', 'Energy moves one way to higher trophic levels and is lost as heat']], 'Table of functions of a pond ecosystem'),
      n: 'In a pond, as in any ecosystem, materials go round in cycles but energy passes through only once. Without decomposers, nutrients would stay locked in dead bodies.',
    }),
    sl('check', 'Quick check: pond', {
      b: 'Which are the producers in a pond?',
      n: 'Quick check. Which organisms make food by photosynthesis?',
      chk: 'pond-mcq',
    }),
    sl('concept', 'Productivity', {
      b: '**Primary production** is the amount of biomass produced per unit area over a time period by plants; its rate is **productivity**, in g m⁻² yr⁻¹ or kcal m⁻² yr⁻¹. **Gross primary productivity (GPP)** is the rate of production of organic matter in photosynthesis; some is used in **respiration (R)**. **Net primary productivity: NPP = GPP − R**, available to heterotrophs. **Secondary productivity** is the rate of formation of new organic matter by **consumers**.',
      v: table(['Term', 'Meaning'], [['GPP', 'Total rate of photosynthetic production'], ['R', 'Organic matter used by plants in respiration'], ['NPP', 'GPP − R; available to consumers and decomposers'], ['Secondary productivity', 'Rate of new biomass made by consumers']], 'Table of productivity terms'),
      n: 'Plants use part of what they make to stay alive. What is left over, the net primary productivity, is the food available to every other organism in the ecosystem.',
    }),
    sl('example', 'Worked example 1: net primary productivity', {
      b: `A grassland has a GPP of ${PROD.gpp} kcal m⁻² yr⁻¹, and its plants use ${PROD.r} kcal m⁻² yr⁻¹ in respiration. Find the NPP and the percentage of GPP available to consumers.`,
      ul: [
        r`$\text{NPP} = \text{GPP} - R = ${PROD.gpp} - ${PROD.r} = ${NPP}$ kcal m⁻² yr⁻¹.`,
        r`Percentage $= \dfrac{${NPP}}{${PROD.gpp}} \times 100 = ${NPP_PCT}$ percent.`,
      ],
      v: table(['Quantity', 'kcal m⁻² yr⁻¹'], [['GPP', String(PROD.gpp)], ['Respiration', String(PROD.r)], ['NPP', String(NPP)]], `Worked table: NPP ${NPP}, ${NPP_PCT} percent of GPP`),
      n: 'Subtract what the plants respire from what they produce. Here a little under two thirds of the gross production is left for herbivores and decomposers.',
    }),
    sl('concept', 'PAR, global productivity, standing crop and standing state', {
      b: 'Only part of sunlight can drive photosynthesis.',
      v: table(['Term', 'Meaning'], [['Photosynthetically active radiation (PAR)', 'About 50 percent of incident solar radiation; plants capture only 2–10 percent of PAR'], ['Global NPP', 'About 170 billion tons (dry weight) a year; oceans give only about 55 billion tons though they cover about 70 percent of the surface'], ['Standing crop', 'Amount of living material (biomass) at each trophic level at a particular time'], ['Standing state', 'Amount of nutrients such as carbon, nitrogen, phosphorus and calcium in the soil at a given time']], 'Table of PAR, global productivity, standing crop and standing state'),
      n: 'Although oceans cover most of the Earth, they are less productive than land, mainly because nutrients are scarce in open water. Standing crop is living biomass; standing state is the store of nutrients in the soil.',
    }),
    sl('concept', 'Decomposition', {
      b: '**Decomposers** break down complex organic matter (**detritus**: dead leaves, bark, flowers, animal remains, faeces) into inorganic substances such as carbon dioxide, water and nutrients.',
      v: table(['Step', 'What happens'], [['Fragmentation', 'Detritivores such as earthworms break detritus into small particles'], ['Leaching', 'Water-soluble inorganic nutrients move down into the soil and are precipitated as unavailable salts'], ['Catabolism', 'Bacterial and fungal enzymes degrade detritus into simpler inorganic substances'], ['Humification', 'Dark, amorphous humus accumulates; it resists microbes and decomposes very slowly; it stores nutrients'], ['Mineralisation', 'Some microbes degrade humus further, releasing inorganic nutrients']], 'Table of the steps of decomposition'),
      n: 'All these steps go on at the same time on the same pieces of detritus. Humus is a colloid that holds nutrients for a long time, and mineralisation slowly releases them for plants to use again.',
    }),
    sl('diagram', 'Climate and the rate of decomposition', {
      b: '**Warm and moist** conditions favour decomposition; **low temperature** and **anaerobic** conditions slow it, so organic matter builds up.',
      v: V.decay,
      n: 'The curves show the same litter decomposing in two habitats. In a warm, wet forest, most leaves have disappeared within a year. In a cold or waterlogged place, they last much longer, which is why peat and thick litter accumulate there.',
    }),
    sl('example', 'Worked example 2: comparing decomposition', {
      b: `Using the model M = M₀e^{−kt} with k = ${K_DECAY.warm} per month (warm, moist forest) and k = ${K_DECAY.cold} per month (cold, dry habitat), what percentage of 100 g of litter remains after 6 months in each?`,
      ul: [
        r`Warm: $100 \times e^{-${K_DECAY.warm} \times 6} = ${WARM6}$ g.`,
        r`Cold: $100 \times e^{-${K_DECAY.cold} \times 6} = ${COLD6}$ g.`,
        'Warmth and moisture speed up microbial activity, so litter vanishes far faster in the forest.',
      ],
      v: table(['Habitat', 'Litter left after 6 months (g)'], [['Warm, moist', String(WARM6)], ['Cold, dry', String(COLD6)]], `Worked table: ${WARM6} grams versus ${COLD6} grams`),
      n: 'In the warm forest less than a quarter of the litter remains after six months, while in the cold, dry habitat more than four fifths is still there. Temperature and moisture strongly control decomposers.',
    }),
    sl('concept', 'Factors affecting decomposition', {
      b: 'The rate depends on the detritus itself and on the climate.',
      v: table(['Factor', 'Effect'], [['Lignin and chitin in detritus', 'Slow decomposition'], ['Nitrogen and water-soluble sugars in detritus', 'Fast decomposition'], ['Warm, moist conditions', 'Favour decomposers: fast'], ['Low temperature, waterlogging (anaerobic)', 'Inhibit decomposers: slow; organic matter builds up']], 'Table of factors affecting decomposition'),
      n: 'Woody material rich in lignin, and insect shells rich in chitin, rot slowly. Soft, nitrogen-rich leaves rot quickly. Decomposition is largely an oxygen-requiring process, so waterlogged soils store organic matter.',
    }),
    sl('check', 'Quick check: productivity', {
      b: 'Judge the assertion and the reason about net primary productivity.',
      n: 'Quick check. What do plants use in respiration?',
      chk: 'npp-ar',
    }),
    sl('check', 'Quick check: humus', {
      b: 'Which statement about humus is correct?',
      n: 'Quick check. Does humus decompose quickly or slowly?',
      chk: 'humus-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Ecosystem: functional unit; terrestrial, aquatic, man-made; biotic and abiotic components.',
        'Pond: producers (phytoplankton, plants), consumers (zooplankton, fish), decomposers (bacteria, fungi), abiotic components.',
        'Productivity: GPP, NPP = GPP − R, secondary productivity; PAR (2–10 percent captured); standing crop and standing state.',
        'Decomposition: fragmentation, leaching, catabolism, humification, mineralisation.',
        'Rate: slow with lignin, chitin, cold, anaerobic conditions; fast with nitrogen, sugars, warmth, moisture.',
      ],
      v: table(['Term', 'Key point'], [['NPP', 'GPP − R'], ['Humus', 'Slow to decompose; stores nutrients'], ['Standing state', 'Nutrients in soil']], 'Summary table of key terms'),
      n: 'To recap: an ecosystem has living and non-living parts, plants produce organic matter at a measurable rate, and decomposers return nutrients through a series of steps whose speed depends on the litter and the climate.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Use **NPP = GPP − R** with units.',
        'Give the **five steps** of decomposition in order.',
        'Distinguish **standing crop** from **standing state**.',
        'Describe the **pond** with producers, consumers, decomposers and abiotic components.',
      ],
      n: 'Exam tips. Write the productivity equation with units. Learn the steps of decomposition in order. Keep standing crop and standing state apart. And describe a pond with all its components.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Ecosystem — Part 2: Energy flow and ecological pyramids',
  goals: [
    'Distinguish grazing and detritus food chains, and explain food webs and trophic levels',
    'Apply the 10 percent law to energy flow',
    'Describe pyramids of number, biomass and energy, with upright and inverted examples',
  ],
  slides: [
    sl('title', 'Energy in ecosystems', {
      b: 'Part 2 — how energy moves through food chains and webs, and how it shapes ecological pyramids.',
      v: flow('LR', [['s', 'Sun'], ['p', 'Producers'], ['h', 'Herbivores'], ['c', 'Carnivores'], ['x', 'Heat lost']], [['s', 'p'], ['p', 'h'], ['h', 'c'], ['c', 'x']], 'Flow of energy from the sun through producers, herbivores and carnivores, ending as heat'),
      n: 'Except for deep-sea communities around hydrothermal vents, the sun is the only source of energy for all ecosystems. Energy passes in one direction, from producers to consumers, and is lost as heat at every step.',
    }),
    sl('concept', 'Food chains', {
      b: 'There are two main kinds of food chain.',
      v: table(['Feature', 'Grazing food chain (GFC)', 'Detritus food chain (DFC)'], [['Begins with', 'Living producers (green plants)', 'Dead organic matter (detritus)'], ['Example', 'Grass → goat → man', 'Dead leaves → earthworm → bird'], ['Main conduit in', 'Aquatic ecosystems', 'Terrestrial ecosystems (a larger fraction of energy)'], ['Organisms', 'Herbivores, carnivores', 'Decomposers (saprotrophs: fungi, bacteria) and detritivores']], 'Table comparing grazing and detritus food chains'),
      n: 'In a forest, most leaves are never eaten by herbivores; they fall and are broken down. So in land ecosystems more energy flows through the detritus food chain. The two chains are linked, because detritivores may be eaten by grazing-chain animals.',
    }),
    sl('concept', 'Food webs and trophic levels', {
      b: 'Natural food chains are interconnected into a **food web**. Each organism occupies a **trophic level** according to its source of food.',
      v: table(['Trophic level', 'Members'], [['First', 'Producers (plants, phytoplankton)'], ['Second', 'Primary consumers (herbivores: grasshopper, cow, zooplankton)'], ['Third', 'Secondary consumers (primary carnivores: frog, fish)'], ['Fourth', 'Tertiary consumers (top carnivores: snake, hawk)']], 'Table of trophic levels and members'),
      n: 'A food web is more realistic than a single chain, because most animals eat more than one kind of food. A species may even feed at more than one trophic level at the same time.',
    }),
    sl('diagram', 'Energy flow and the 10 percent law', {
      b: 'At each transfer, most energy is used in respiration and lost as **heat**; only about **10 percent** passes to the next trophic level (**Lindeman’s 10 percent law**). Energy flow is therefore **unidirectional**, and the number of trophic levels is **limited**.',
      v: V.energy,
      n: 'Because only a tenth of the energy reaches each higher level, there is too little energy left after four or five transfers to support another level. That is why food chains are short.',
    }),
    sl('example', 'Worked example 1: applying the 10 percent law', {
      b: `Producers in a lake trap ${E5[0]} J of energy. Using the 10 percent law, how much energy reaches primary, secondary and tertiary consumers? What is the transfer efficiency?`,
      ul: [
        r`Primary $= ${E5[0]} \times 0.1 = ${E5[1]}$ J; secondary $= ${E5[2]}$ J; tertiary $= ${E5[3]}$ J.`,
        r`Efficiency $= \dfrac{${E5[1]}}{${E5[0]}} \times 100 = ${efficiency(E5[1], E5[0])}$ percent at each step.`,
      ],
      v: table(['Trophic level', 'Energy (J)'], [['Producers', String(E5[0])], ['Primary consumers', String(E5[1])], ['Secondary consumers', String(E5[2])], ['Tertiary consumers', String(E5[3])]], `Worked table: ${E5[3]} J reaches tertiary consumers`),
      n: 'Multiply by one tenth at each step. Only one thousandth of the producers’ energy reaches the top carnivores, which is why there are so few of them.',
    }),
    sl('diagram', 'Ecological pyramids', {
      b: 'The relation between trophic levels can be shown as pyramids of **number**, **biomass** or **energy**, with **producers at the base** and top carnivores at the apex.',
      v: V.pyramids,
      n: 'Most pyramids are upright. But a pyramid of biomass in the sea can be inverted, because the small standing crop of fast-growing phytoplankton supports a larger biomass of zooplankton and fish. The pyramid of energy is always upright.',
    }),
    sl('concept', 'Upright and inverted pyramids', {
      b: 'Whether a pyramid is upright depends on what is measured.',
      v: table(['Pyramid', 'Usually', 'Exception'], [['Number', 'Upright (grassland)', 'Inverted in a tree: one tree supports many insects'], ['Biomass', 'Upright (forest, grassland)', 'Inverted in the sea: phytoplankton biomass less than zooplankton or fish'], ['Energy', 'Always upright', 'None: energy is lost at each level']], 'Table of upright and inverted pyramids'),
      n: 'A single large tree supports thousands of insects, so a pyramid of numbers based on a tree is inverted. Energy, however, can never increase from one level to the next.',
    }),
    sl('example', 'Worked example 2: is it upright?', {
      b: `Classify each pyramid as upright or inverted: (i) numbers on one tree — ${TREE.join(', ')} (tree, insects, birds); (ii) biomass in the sea — ${SEA.join(', ')} g/m² (phytoplankton, zooplankton); (iii) energy — ${E.join(', ')} J.`,
      ul: [
        `(i) The second level is larger than the first: **${upright(TREE) ? 'upright' : 'inverted'}**.`,
        `(ii) Zooplankton exceed phytoplankton: **${upright(SEA) ? 'upright' : 'inverted'}**.`,
        `(iii) Each level is smaller: **${upright(E) ? 'upright' : 'inverted'}** — energy pyramids always are.`,
      ],
      v: table(['Pyramid', 'Shape'], [['Numbers on a tree', upright(TREE) ? 'Upright' : 'Inverted'], ['Biomass in the sea', upright(SEA) ? 'Upright' : 'Inverted'], ['Energy', upright(E) ? 'Upright' : 'Inverted']], 'Worked table: tree numbers and sea biomass inverted; energy upright'),
      n: 'A pyramid is upright only if every level is smaller than the one below it. The tree and sea examples break this rule, but the energy pyramid never does.',
    }),
    sl('concept', 'Limitations of ecological pyramids', {
      b: 'Pyramids are useful but simplified.',
      v: table(['Limitation', 'Why it matters'], [['Assume a simple food chain', 'Nature has complex food webs'], ['Place each species at one trophic level', 'Many species feed at several levels'], ['Ignore saprophytes (decomposers)', 'Decomposers play a vital role in energy flow']], 'Table of limitations of ecological pyramids'),
      n: 'Real ecosystems are tangled webs, many animals feed at more than one level, and pyramids leave out the decomposers that process much of the energy. So pyramids are a simplified picture.',
    }),
    sl('check', 'Quick check: detritus food chain', {
      b: 'With what does a detritus food chain begin?',
      n: 'Quick check. Living plants, or dead organic matter?',
      chk: 'dfc-mcq',
    }),
    sl('check', 'Quick check: 10 percent law', {
      b: 'If producers trap 30 000 J, how much reaches primary consumers?',
      n: 'Quick check. Take one tenth.',
      chk: 'tenpct-mcq',
    }),
    sl('check', 'Quick check: pyramids', {
      b: 'Judge the assertion and the reason about the pyramid of energy.',
      n: 'Quick check. Can energy increase from one level to the next?',
      chk: 'pyramid-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Sun is the source of energy; flow is unidirectional with heat loss.',
        'Grazing food chain (aquatic main conduit) and detritus food chain (larger in terrestrial ecosystems); food webs.',
        'Trophic levels: producers, primary, secondary and tertiary consumers.',
        `10 percent law (Lindeman): about 10 percent passes on; efficiency here ${EFF} percent.`,
        'Pyramids: number (inverted for a tree), biomass (inverted in the sea), energy (always upright); limitations.',
      ],
      v: table(['Pyramid', 'Can be inverted?'], [['Number', 'Yes'], ['Biomass', 'Yes'], ['Energy', 'No']], 'Summary table of pyramid types'),
      n: 'To recap: energy enters as sunlight, passes one way through food chains and webs, and only about a tenth moves to each higher level. Pyramids of number and biomass may be inverted, but the pyramid of energy is always upright.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Compare **GFC and DFC** in a table with an example each.',
        'Apply the **10 percent law** step by step with units.',
        'Give an example of an **inverted** pyramid of number and of biomass.',
        'Explain **why** the pyramid of energy is never inverted.',
      ],
      n: 'Exam tips. Compare the two kinds of food chain with examples. Apply the ten percent law one step at a time. Give inverted pyramids of number and biomass. And explain why the energy pyramid is always upright.',
    }),
  ],
});
