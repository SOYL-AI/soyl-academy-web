// ch12 Ecosystem — three decks: Part 1 (t01), Part 2 (t02), Part 3 (t03–t04).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { ENERGY, PYRAMIDS, STRATA, E } from './svgs.mjs';
import { npp, tenPercent, efficiency, pct } from './calc.mjs';

export const V = {
  energy: svgV(ENERGY, 'Energy flowing from producers to tertiary consumers, with about 10 percent passed on and the rest lost as heat'),
  pyramids: svgV(PYRAMIDS, 'Upright pyramid of numbers, inverted pyramid of biomass in the sea, and upright pyramid of energy'),
  strata: svgV(STRATA, 'Vertical stratification of a forest into trees, shrubs, and herbs and grasses'),
};

// ---------------------------------------------------------------- computed numbers
const CROP = { gpp: 2400, r: 900 };
CROP.npp = npp(CROP.gpp, CROP.r);
CROP.pctR = pct(CROP.r, CROP.gpp);
const BIO = { total: 170, ocean: 55 };
BIO.land = BIO.total - BIO.ocean;
BIO.pOcean = pct(BIO.ocean, BIO.total);
const CHAIN = tenPercent(50000, 4);
const EFF = { pc: 1200, sc: 150 };
EFF.e = efficiency(EFF.sc, EFF.pc);

export const deck1 = deck({
  part: 1,
  title: 'Ecosystem — Part 1: Structure and function',
  goals: [
    'Define an ecosystem and give examples of its types',
    'Describe the biotic and abiotic components and stratification',
    'Describe the structure and functions of a pond ecosystem',
  ],
  slides: [
    sl('title', 'Ecosystem', {
      b: 'Part 1 — an ecosystem is a functional unit of nature in which living organisms interact among themselves and with their physical surroundings.',
      v: flow('LR', [['b', 'Biotic components (living)'], ['a', 'Abiotic components (physical)'], ['e', 'Ecosystem']], [['b', 'e', 'interact'], ['a', 'e', 'interact']], 'Flow showing biotic and abiotic components forming an ecosystem'),
      n: 'An ecosystem can be as small as a pond or as large as a forest or a sea. Many ecologists regard the entire biosphere as a global ecosystem made of many local ones. Because the global ecosystem is too big to study at once, we divide it into smaller units.',
    }),
    sl('concept', 'Types of ecosystems', {
      b: 'Ecosystems are broadly **terrestrial** or **aquatic**, and some are **man-made**.',
      v: table(['Type', 'Examples'], [['Terrestrial', 'Forest, grassland, desert'], ['Aquatic', 'Pond, lake, wetland, river, estuary'], ['Man-made', 'Crop fields, aquarium']], 'Table of terrestrial, aquatic and man-made ecosystems with examples'),
      n: 'Forests, grasslands and deserts are terrestrial ecosystems. Ponds, lakes, wetlands, rivers and estuaries are aquatic. Crop fields and an aquarium are ecosystems made by people. All of them work on the same basic principles.',
    }),
    sl('concept', 'Structure: biotic and abiotic', {
      b: 'In an ecosystem, **biotic** and **abiotic** components interact and function as a unit. The interaction produces a **physical structure** characteristic of each type of ecosystem. Identification and enumeration of plant and animal species gives its **species composition**.',
      v: table(['Component', 'Examples'], [['Abiotic', 'Water, soil, dissolved inorganic and organic substances, sunlight, temperature'], ['Producers (autotrophs)', 'Plants, phytoplankton, algae'], ['Consumers (heterotrophs)', 'Herbivores, carnivores'], ['Decomposers', 'Bacteria, fungi']], 'Table of ecosystem components with examples'),
      n: 'The living part of an ecosystem includes producers, consumers and decomposers. The non-living part includes water, soil, minerals, light and temperature. The two parts are linked: plants take minerals from the soil, and decomposers return them.',
    }),
    sl('diagram', 'Vertical stratification', {
      b: 'The vertical distribution of different species occupying different levels is called **stratification**. In a forest, **trees** occupy the top vertical strata or layer, **shrubs** the second, and **herbs and grasses** the bottom layers.',
      v: V.strata,
      n: 'Walk into a forest and look up. The tallest trees form a canopy, shrubs grow beneath them, and herbs and grasses cover the ground. Each layer receives a different amount of light and supports different animals. This layering is called stratification.',
    }),
    sl('check', 'Quick check: stratification', {
      b: 'Which plants occupy the bottom layer in a stratified forest?',
      n: 'Quick check. Think about the plants closest to the ground.',
      chk: 'strata-mcq',
    }),
    sl('concept', 'A pond ecosystem', {
      b: 'A pond is a shallow water body in which all the basic components of an ecosystem are well exhibited.',
      v: table(['Component', 'In a pond'], [['Abiotic', 'Water with dissolved inorganic and organic substances; rich soil deposit at the bottom'], ['Regulators', 'Solar input, cycle of temperature, day length and other climatic conditions'], ['Autotrophs', 'Phytoplankton, some algae, floating, submerged and marginal plants'], ['Consumers', 'Zooplankton, free-swimming and bottom-dwelling forms'], ['Decomposers', 'Fungi, bacteria and flagellates, abundant at the bottom']], 'Table of the components of a pond ecosystem'),
      n: 'In a pond, tiny floating phytoplankton and larger plants are the producers. Zooplankton and fish are consumers. Fungi, bacteria and flagellates at the bottom decompose dead matter. Sunlight, temperature and day length control how fast the pond works.',
    }),
    sl('example', 'Worked example 1: sorting a pond', {
      b: 'A student lists what she found in a pond sample. Sort each into abiotic, producer, consumer or decomposer.',
      ul: [
        'Dissolved phosphate and the mud at the bottom → **abiotic**.',
        'Phytoplankton and a submerged water plant → **producers** (autotrophs).',
        'Zooplankton and a small fish → **consumers**.',
        'Bacteria and fungi in the bottom sediment → **decomposers**.',
      ],
      v: table(['Item', 'Category'], [['Phosphate, mud', 'Abiotic'], ['Phytoplankton, water plant', 'Producer'], ['Zooplankton, fish', 'Consumer'], ['Bacteria, fungi', 'Decomposer']], 'Worked table sorting pond items into four categories'),
      n: 'Ask whether each item is alive, and if so, how it gets food. Minerals and mud are abiotic. Organisms that make food by photosynthesis are producers. Those that eat others are consumers. And bacteria and fungi that break down dead matter are decomposers.',
    }),
    sl('concept', 'Functions of a pond', {
      b: 'A pond performs all the functions of any ecosystem, and of the biosphere as a whole.',
      v: flow('TB', [['p', 'Autotrophs convert inorganic material into organic material using the sun’s radiant energy'], ['c', 'Heterotrophs consume the autotrophs'], ['d', 'Dead organic matter is decomposed and mineralised, releasing minerals for reuse'], ['h', 'Energy moves one way to higher trophic levels and is lost as heat']], [['p', 'c'], ['c', 'd'], ['d', 'p', 'minerals reused']], 'Flow of the four functions of a pond ecosystem'),
      n: 'Producers capture sunlight and make organic matter. Consumers eat the producers. Decomposers break down dead matter and return minerals for reuse. Energy, however, flows only one way, towards higher trophic levels, and is lost as heat along the way.',
    }),
    sl('check', 'Quick check: pond producers', {
      b: 'Judge the assertion and the reason about the pond ecosystem.',
      n: 'Quick check. Do minerals and energy behave in the same way?',
      chk: 'mineral-ar',
    }),
    sl('example', 'Worked example 2: four components of function', {
      b: 'The four important components of ecosystem function are productivity, decomposition, energy flow and nutrient cycling. Match each to an event in a pond.',
      ul: [
        'Phytoplankton make new organic matter in sunlight → **productivity**.',
        'Bacteria break down a dead fish into simpler substances → **decomposition**.',
        'A fish eats zooplankton, gaining part of its energy → **energy flow**.',
        'Phosphate released from the dead fish is taken up again by algae → **nutrient cycling**.',
      ],
      v: table(['Event', 'Function'], [['Phytoplankton photosynthesise', 'Productivity'], ['Dead fish broken down', 'Decomposition'], ['Fish eats zooplankton', 'Energy flow'], ['Phosphate reused', 'Nutrient cycling']], 'Worked table matching pond events to the four ecosystem functions'),
      n: 'Each pond event illustrates one function. Making organic matter is productivity. Breaking down dead matter is decomposition. Passing food energy up a chain is energy flow. And re-using released minerals is nutrient cycling.',
    }),
    sl('check', 'Quick check: decomposers', {
      b: 'Where are decomposers especially abundant in a pond?',
      n: 'Quick check. Where does dead matter collect?',
      chk: 'bottom-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Ecosystem: functional unit where organisms interact among themselves and with the physical environment; biosphere is the global ecosystem.',
        'Types: terrestrial, aquatic, man-made.',
        'Structure: biotic and abiotic components; species composition; stratification (trees, shrubs, herbs and grasses).',
        'Pond: phytoplankton and plants (producers), zooplankton and fish (consumers), bacteria, fungi and flagellates (decomposers).',
        'Functions: productivity, decomposition, energy flow, nutrient cycling.',
      ],
      v: table(['Layer', 'Plants'], [['Top', 'Trees'], ['Second', 'Shrubs'], ['Bottom', 'Herbs, grasses']], 'Summary table of forest strata'),
      n: 'To recap: an ecosystem is a unit of living and non-living parts working together. Its structure includes species composition and stratification. And every ecosystem, from a pond to the biosphere, carries out productivity, decomposition, energy flow and nutrient cycling.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Define **ecosystem** and **stratification** precisely.',
        'Name the **components of a pond** with examples.',
        'List the **four functions** of an ecosystem.',
        'Say that energy flow is **unidirectional** while minerals are **recycled**.',
      ],
      n: 'Exam tips. Define ecosystem and stratification. Name the parts of a pond with examples. List the four functions. And remember that energy flows one way while minerals are recycled.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Ecosystem — Part 2: Productivity and decomposition',
  goals: [
    'Define primary and secondary productivity, GPP and NPP',
    'Calculate NPP from GPP and respiration',
    'Describe the steps of decomposition and the factors that affect it',
  ],
  slides: [
    sl('title', 'Productivity and decomposition', {
      b: 'Part 2 — how much organic matter an ecosystem makes, and how dead matter is broken down.',
      v: flow('LR', [['s', 'Sunlight'], ['p', 'Producers make biomass'], ['c', 'Consumers'], ['d', 'Detritus decomposed'], ['m', 'Minerals']], [['s', 'p'], ['p', 'c'], ['p', 'd'], ['c', 'd'], ['d', 'm'], ['m', 'p']], 'Flow from sunlight to producers, consumers, detritus and minerals'),
      n: 'A constant input of solar energy is the basic requirement for any ecosystem to function and sustain. Producers use it to make organic matter, and decomposers later break down whatever dies, returning minerals to the soil.',
    }),
    sl('concept', 'Primary production and productivity', {
      b: '**Primary production** is the amount of biomass or organic matter produced per unit area over a time period by plants during photosynthesis, expressed as weight (g per square metre) or energy (kcal per square metre). The **rate** of biomass production is **productivity**.',
      m: [r`\text{Productivity units: } \mathrm{g\,m^{-2}\,yr^{-1}} \ \text{or} \ \mathrm{kcal\,m^{-2}\,yr^{-1}}`],
      v: table(['Term', 'Meaning'], [['Gross primary productivity (GPP)', 'Rate of production of organic matter during photosynthesis'], ['Respiration (R)', 'Part of GPP used by plants themselves'], ['Net primary productivity (NPP)', 'GPP − R: biomass available to consumers'], ['Secondary productivity', 'Rate of formation of new organic matter by consumers']], 'Table of productivity terms and meanings'),
      n: 'Productivity is expressed per unit area per unit time, so ecosystems can be compared. Plants use a considerable part of what they make for their own respiration. Only what remains, the net primary productivity, is available to herbivores and decomposers.',
    }),
    sl('example', 'Worked example 1: from GPP to NPP', {
      b: `A crop field has a GPP of ${CROP.gpp} kcal per square metre per year, and the plants use ${CROP.r} kcal per square metre per year in respiration. Find the NPP and the percentage of GPP used in respiration.`,
      ul: [
        r`$\text{NPP} = \text{GPP} - R = ${CROP.gpp} - ${CROP.r} = ${CROP.npp}\ \mathrm{kcal\,m^{-2}\,yr^{-1}}$.`,
        r`Respiration share $= \dfrac{${CROP.r}}{${CROP.gpp}} \times 100 = ${CROP.pctR}$ percent.`,
        'NPP is what herbivores and decomposers can use.',
      ],
      v: table(['Quantity', 'kcal per square metre per year'], [['GPP', String(CROP.gpp)], ['Respiration', String(CROP.r)], ['NPP', String(CROP.npp)]], `Worked table: NPP equals ${CROP.npp}`),
      n: 'Subtract respiration from gross productivity to get net productivity: fifteen hundred kilocalories per square metre per year. The plants used a little over a third of what they made just to stay alive.',
    }),
    sl('check', 'Quick check: NPP', {
      b: 'Calculate NPP from GPP and respiration.',
      n: 'Quick check. Subtract respiration from GPP.',
      chk: 'npp-num',
    }),
    sl('concept', 'What controls productivity?', {
      b: 'Primary productivity depends on the **plant species** in an area, **environmental factors**, **availability of nutrients** and the **photosynthetic capacity** of plants, so it varies between ecosystems.',
      v: table(['Biosphere figure', 'Value'], [['Annual NPP of the whole biosphere', `About ${BIO.total} billion tons (dry weight)`], ['Share of Earth’s surface covered by oceans', 'About 70 percent'], ['Annual NPP of the oceans', `Only ${BIO.ocean} billion tons`]], 'Table of biosphere productivity figures'),
      n: 'Although oceans cover about seventy percent of the Earth’s surface, they produce less than a third of the biosphere’s net primary production. The rest comes from land. Nutrients and light are often in short supply in the open ocean.',
    }),
    sl('example', 'Worked example 2: land versus ocean', {
      b: `Of about ${BIO.total} billion tons of NPP made each year, the oceans make ${BIO.ocean} billion tons. How much is made on land, and what percentage comes from the oceans?`,
      ul: [
        r`Land $= ${BIO.total} - ${BIO.ocean} = ${BIO.land}$ billion tons.`,
        r`Ocean share $= \dfrac{${BIO.ocean}}{${BIO.total}} \times 100 \approx ${BIO.pOcean}$ percent.`,
        'So about 70 percent of the surface gives only about a third of the production.',
      ],
      v: table(['Region', 'NPP (billion tons)'], [['Oceans', String(BIO.ocean)], ['Land', String(BIO.land)], ['Total', String(BIO.total)]], `Worked table: land ${BIO.land}, ocean ${BIO.ocean} billion tons`),
      n: 'Subtracting gives one hundred and fifteen billion tons on land. The oceans contribute about thirty-two percent of the total even though they cover most of the planet. This tells us ocean productivity per square metre is low.',
    }),
    sl('concept', 'Decomposition', {
      b: 'Decomposers break down complex organic matter into inorganic substances like **carbon dioxide, water and nutrients**. The raw material is **detritus**: dead plant remains (leaves, bark, flowers) and dead remains of animals, including fecal matter.',
      v: flow('TB', [['f', 'Fragmentation: detritivores (earthworm) break detritus into small particles'], ['l', 'Leaching: water-soluble nutrients go down into the soil and precipitate as unavailable salts'], ['c', 'Catabolism: bacterial and fungal enzymes degrade detritus into simpler inorganic substances'], ['h', 'Humification: dark, amorphous humus forms; resistant, decomposes very slowly'], ['m', 'Mineralisation: humus degraded by microbes, releasing inorganic nutrients']], [['f', 'l'], ['l', 'c'], ['c', 'h'], ['h', 'm']], 'Flow of the steps of decomposition'),
      n: 'An earthworm is often called the farmer’s friend because it breaks detritus into small pieces and loosens the soil. Fragmentation, leaching and catabolism go on at the same time. Humus is colloidal and acts as a reservoir of nutrients, which are released slowly by mineralisation.',
    }),
    sl('check', 'Quick check: decomposition steps', {
      b: 'Which step of decomposition is carried out by earthworms?',
      n: 'Quick check. Earthworms break things into pieces.',
      chk: 'fragment-mcq',
    }),
    sl('concept', 'Factors affecting decomposition', {
      b: 'Decomposition is largely an **oxygen-requiring** process. Its rate is controlled by the **chemical composition of detritus** and by **climate**.',
      v: table(['Factor', 'Faster decomposition', 'Slower decomposition'], [['Chemical composition', 'Rich in nitrogen and water-soluble substances such as sugars', 'Rich in lignin and chitin'], ['Temperature', 'Warm', 'Low temperature'], ['Soil moisture', 'Moist', 'Dry, or waterlogged without oxygen (anaerobiosis)']], 'Table of factors that speed up or slow down decomposition'),
      n: 'Leaves rich in sugars and nitrogen rot quickly, while woody material rich in lignin, or insect remains rich in chitin, rot slowly. Warm, moist conditions favour decomposers. Cold or oxygen-poor conditions slow decomposition, so organic matter builds up.',
    }),
    sl('check', 'Quick check: factors', {
      b: 'Judge the assertion and the reason about decomposition.',
      n: 'Quick check. What do lignin and chitin do to the rate?',
      chk: 'lignin-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Primary production: biomass made per unit area by plants; productivity is its rate (g or kcal per square metre per year).',
        'NPP = GPP − R; secondary productivity is made by consumers.',
        `Biosphere NPP about ${BIO.total} billion tons a year; oceans only ${BIO.ocean} billion tons.`,
        'Decomposition: fragmentation, leaching, catabolism, humification, mineralisation.',
        'Faster with nitrogen and sugars, warmth, moisture and oxygen; slower with lignin, chitin, cold and anaerobiosis.',
      ],
      v: table(['Quantity', 'Relation'], [['NPP', 'GPP − R'], ['Humus', 'Slowly mineralised']], 'Summary table of key relations'),
      n: 'To recap: productivity measures how fast an ecosystem makes organic matter, and net primary productivity is what is left after the plants’ respiration. Decomposition turns detritus into minerals through five steps, and its rate depends on the detritus and the climate.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write **NPP = GPP − R** and give **units**.',
        'Name the **steps of decomposition in order** and the organisms involved.',
        'Explain the **effect of lignin, chitin, temperature and moisture**.',
        'Define **humus** and its role.',
      ],
      n: 'Exam tips. Write the relation between gross and net productivity with units. Name the decomposition steps in order. Explain the factors that change the rate. And define humus.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Ecosystem — Part 3: Energy flow and ecological pyramids',
  goals: [
    'Trace the flow of energy through grazing and detritus food chains',
    'Apply the 10 percent law',
    'Construct and interpret pyramids of number, biomass and energy and state their limitations',
  ],
  slides: [
    sl('title', 'Energy flow and ecological pyramids', {
      b: 'Part 3 — where the energy goes, and how we picture it.',
      v: flow('LR', [['s', 'Sun'], ['p', 'Producers'], ['h', 'Herbivores'], ['c', 'Carnivores']], [['s', 'p'], ['p', 'h'], ['h', 'c']], 'Flow of energy from the sun through producers to herbivores and carnivores'),
      n: 'Except for deep-sea hydrothermal ecosystems, the sun is the only source of energy for all ecosystems on Earth. Of the incident solar radiation, less than half is photosynthetically active radiation, and plants capture only two to ten percent of it. Yet this small amount sustains the entire living world.',
    }),
    sl('diagram', 'Unidirectional flow of energy', {
      b: 'Energy flows **one way**: from the sun to producers and then to consumers. Ecosystems are not exempt from the **second law of thermodynamics**; they need a constant supply of energy to make the molecules they require and counteract the tendency towards disorder. At each step energy is lost as **heat**.',
      v: V.energy,
      n: 'Green plants are producers. All animals depend on plants, directly or indirectly. Herbivores are primary consumers, and the carnivores that eat them are secondary consumers. At every step much of the energy is used in respiration and lost as heat, so it cannot be recycled.',
    }),
    sl('concept', 'Grazing and detritus food chains', {
      b: 'The **grazing food chain (GFC)** starts with living plants, for example grass → goat → man. The **detritus food chain (DFC)** starts with **dead organic matter** and is made of decomposers, mainly **fungi and bacteria** (saprotrophs), which secrete digestive enzymes and absorb the products.',
      v: table(['Ecosystem', 'Major route of energy'], [['Aquatic', 'Grazing food chain'], ['Terrestrial', 'Detritus food chain carries a much larger fraction of energy']], 'Table comparing the main energy route in aquatic and terrestrial ecosystems'),
      n: 'In water, most energy passes through grazing food chains. On land, a much larger share flows through detritus food chains. The two are linked: animals of the detritus chain may be eaten by animals of the grazing chain. Such interconnected chains form a food web.',
    }),
    sl('concept', 'Trophic levels and standing crop', {
      b: 'Organisms occupy a place in the ecosystem according to their source of nutrition, called a **trophic level**: producers first, herbivores (primary consumers) second, carnivores (secondary consumers) third. Each trophic level has a certain mass of living material at a particular time, the **standing crop**, measured as **biomass** or **number per unit area**.',
      v: table(['Trophic level', 'Example'], [['First: producers', 'Grass, phytoplankton'], ['Second: primary consumers', 'Grasshopper, goat, zooplankton'], ['Third: secondary consumers', 'Frog, fish'], ['Fourth: tertiary consumers', 'Snake, man']], 'Table of trophic levels with examples'),
      n: 'The number of trophic levels in a grazing food chain is limited by the ten percent law: only about ten percent of the energy at one level passes on to the next. After a few levels too little energy remains to support another population.',
    }),
    sl('example', 'Worked example 1: the 10 percent law', {
      b: `Producers in a grassland fix ${CHAIN[0]} J of energy. Using the 10 percent law, how much energy reaches the primary, secondary and tertiary consumers?`,
      ul: [
        r`Primary consumers $= ${CHAIN[0]} \times 0.1 = ${CHAIN[1]}$ J.`,
        r`Secondary consumers $= ${CHAIN[1]} \times 0.1 = ${CHAIN[2]}$ J.`,
        r`Tertiary consumers $= ${CHAIN[2]} \times 0.1 = ${CHAIN[3]}$ J.`,
        'The rest is lost mainly as heat in respiration at each level.',
      ],
      v: table(['Level', 'Energy (J)'], [['Producers', String(CHAIN[0])], ['Primary consumers', String(CHAIN[1])], ['Secondary consumers', String(CHAIN[2])], ['Tertiary consumers', String(CHAIN[3])]], `Worked table: ${CHAIN.join(', ')} joules`),
      n: 'Multiply by one-tenth at each step. Fifty thousand joules at the producers becomes five thousand, then five hundred, then only fifty at the tertiary consumers. That is why food chains rarely have more than four or five levels.',
    }),
    sl('check', 'Quick check: 10 percent law', {
      b: 'Apply the 10 percent law to a food chain.',
      n: 'Quick check. Divide by ten at each step.',
      chk: 'tenpc-num',
    }),
    sl('diagram', 'Ecological pyramids', {
      b: 'The relationship between trophic levels can be shown as a pyramid of **number**, **biomass** or **energy**. The base is the producers and the apex the top consumers. Pyramids of number and biomass are usually upright, but the **pyramid of biomass in the sea is inverted**, as the biomass of fishes (and zooplankton) far exceeds that of phytoplankton. The **pyramid of energy is always upright**.',
      v: V.pyramids,
      n: 'In the sea, phytoplankton reproduce so fast that a small standing crop at any moment supports a larger mass of animals, so the biomass pyramid stands on its point. A single large tree supporting many insects gives an inverted pyramid of numbers. But energy is always lost at each step, so the energy pyramid can never be inverted.',
    }),
    sl('example', 'Worked example 2: is the pyramid upright?', {
      b: `In a pond, primary consumers take in ${EFF.pc} kJ per square metre per year and secondary consumers ${EFF.sc} kJ. Find the efficiency of transfer, and explain why a pyramid of energy is always upright.`,
      ul: [
        r`Efficiency $= \dfrac{${EFF.sc}}{${EFF.pc}} \times 100 = ${EFF.e}$ percent.`,
        'Each level receives less energy than the level below, because energy is lost as heat at every transfer.',
        'So each bar of an energy pyramid is narrower than the one below: it is always upright.',
      ],
      v: table(['Level', 'Energy (kJ per square metre per year)'], [['Primary consumers', String(EFF.pc)], ['Secondary consumers', String(EFF.sc)], ['Efficiency', `${EFF.e} percent`]], `Worked table: efficiency ${EFF.e} percent`),
      n: 'Divide the energy at the higher level by the energy at the lower level and multiply by a hundred: twelve point five percent, close to the ten percent rule. Because energy always decreases from one level to the next, the energy pyramid can never stand on its point.',
    }),
    sl('check', 'Quick check: inverted pyramids', {
      b: 'Which ecological pyramid can never be inverted?',
      n: 'Quick check. Which quantity is always lost at each level?',
      chk: 'never-mcq',
    }),
    sl('concept', 'Limitations of ecological pyramids', {
      b: 'Ecological pyramids are useful but simplified.',
      v: table(['Limitation', 'Why it matters'], [['They do not take into account the same species belonging to two or more trophic levels', 'For example, a bird that eats both seeds and insects'], ['They assume a simple food chain', 'Real ecosystems have food webs'], ['Saprophytes are given no place', 'Yet decomposers play a vital role in the ecosystem']], 'Table of three limitations of ecological pyramids'),
      n: 'A pyramid places each species at one level, though many feed at more than one. It assumes a single chain, though nature has webs. And it leaves out the decomposers, even though they recycle the minerals on which the whole ecosystem depends.',
    }),
    sl('check', 'Quick check: food chains', {
      b: 'Judge the assertion and the reason about food chains on land.',
      n: 'Quick check. Through which chain does most energy flow on land?',
      chk: 'dfc-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'The sun is the only energy source (except deep-sea hydrothermal ecosystems); PAR is under half of sunlight; plants capture 2–10 percent of PAR.',
        'Energy flow is unidirectional; heat is lost at each step (second law of thermodynamics).',
        'GFC starts from living plants; DFC from detritus; on land most energy flows through DFC; chains link into food webs.',
        'Trophic levels and standing crop; 10 percent law limits chain length.',
        'Pyramids of number, biomass, energy; biomass in sea inverted; energy always upright; limitations.',
      ],
      v: table(['Pyramid', 'Can it be inverted?'], [['Number', 'Yes (tree and insects)'], ['Biomass', 'Yes (sea)'], ['Energy', 'Never']], 'Summary table of whether each pyramid can be inverted'),
      n: 'To recap: energy enters as sunlight, flows one way through trophic levels, and is lost as heat at every step, so only about ten percent passes on. Pyramids picture this, and the pyramid of energy is the only one that is always upright.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Contrast **GFC and DFC** with one example each.',
        'Apply the **10 percent law** step by step and show units.',
        'Explain **why the energy pyramid is always upright** and give **an inverted biomass pyramid** example.',
        'State **three limitations** of pyramids.',
      ],
      n: 'Exam tips. Contrast grazing and detritus food chains. Apply the ten percent law one step at a time. Explain why energy pyramids are always upright and when biomass pyramids are inverted. And learn three limitations.',
    }),
  ],
});
