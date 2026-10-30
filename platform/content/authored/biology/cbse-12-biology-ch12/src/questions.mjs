// ch12 Ecosystem — question bank. AR keys: a b c a d.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { npp, tenPercent, efficiency, pct, upright, round } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 structure and function
add('strata-mcq', mcq({
  stem: 'In a forest showing vertical stratification, which plants occupy the bottom layers?',
  right: 'Herbs and grasses',
  wrong: ['Tall trees', 'Shrubs', 'Climbers at the canopy'],
  sol: 'Trees form the top layer, shrubs the second, and herbs and grasses the bottom layers — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('bottom-mcq', mcq({
  stem: 'In a pond ecosystem, where are decomposers such as fungi, bacteria and flagellates especially abundant?',
  right: 'At the bottom of the pond',
  wrong: ['On the surface film of water', 'Only on floating plants', 'In the open middle water'],
  sol: 'Dead organic matter settles at the bottom, where decomposers are most abundant — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('manmade-mcq', mcq({
  stem: 'Which of these is a man-made ecosystem?',
  right: 'An aquarium',
  wrong: ['An estuary', 'A desert', 'A wetland'],
  sol: 'Crop fields and aquaria are made by people; the others are natural — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('regulate-mcq', mcq({
  stem: 'The same pond is studied in midsummer and in midwinter. Its producers make far more organic matter in summer. Which factors best explain the difference?',
  right: 'Greater solar input, higher temperature and longer day length in summer',
  wrong: ['More fish being present in summer', 'A deeper pond in summer', 'A change in the colour of the pond bottom'],
  sol: 'Solar input, the cycle of temperature, day length and other climatic conditions regulate the rate of function of a pond — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('aquarium-mcq', mcq({
  stem: 'A sealed glass jar contains pond water, water plants, snails and bacteria. It is kept in complete darkness for several weeks. Which process stops first and causes the whole system to fail?',
  right: 'Conversion of inorganic into organic matter by the producers',
  wrong: ['Decomposition by bacteria', 'Respiration by snails', 'Loss of heat from the jar'],
  sol: 'Without light the producers cannot use radiant energy to make organic matter, so no new energy enters the system — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('recycle-mcq', mcq({
  stem: 'In a pond, a dead fish sinks to the bottom. A few weeks later, algae near the bottom grow faster. Which ecosystem function links these events?',
  right: 'Decomposition and mineralisation, releasing nutrients for reuse',
  wrong: ['Unidirectional flow of energy back to the producers', 'Stratification of the pond', 'Secondary productivity of the fish'],
  sol: 'Decomposers break down the dead fish and release minerals that the algae reuse — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('sample-mcq', mcq({
  stem: 'A student examines a drop of pond water and sees tiny green floating organisms that make their own food. To which group do they belong?',
  right: 'Phytoplankton (producers)',
  wrong: ['Zooplankton (consumers)', 'Flagellate decomposers', 'Abiotic components'],
  sol: 'Tiny floating photosynthetic organisms are phytoplankton, the producers of the pond — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('biosphere-tf', tf({
  stem: 'Many ecologists regard the entire biosphere as a global ecosystem made up of many local ecosystems.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [1],
}));
add('strata-fill', fill({
  stem: 'The vertical distribution of different species occupying different levels in an ecosystem is called ______.',
  acc: [['stratification']],
  sol: 'Stratification.',
  d: 1, c: 'recall', t: [1],
}));
add('mineral-ar', ar({
  a: 'In an ecosystem, minerals are recycled but energy is not.',
  r: 'At every transfer between trophic levels, energy is lost as heat, while decomposers release minerals for reuse.',
  key: 'a',
  sol: 'Both are true, and the heat loss and mineral release explain the difference — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('component-match', match({
  stem: 'Match each pond organism (column I) with its role (column II).',
  pairs: [
    ['Phytoplankton', 'Producer'],
    ['Zooplankton', 'Primary consumer'],
    ['Small fish eating zooplankton', 'Secondary consumer'],
    ['Bacteria in bottom mud', 'Decomposer'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Phytoplankton produce; zooplankton graze; fish eat zooplankton; bacteria decompose.',
  d: 2, c: 'understanding', t: [1],
}));
add('pond-short', short({
  marks: 3,
  stem: 'Describe the biotic and abiotic components of a pond ecosystem, with examples.',
  model: '**Abiotic:** water with **dissolved inorganic and organic substances**, and the **rich soil deposit** at the bottom; solar input, temperature and day length regulate its rate of function.\n\n**Producers:** **phytoplankton**, some algae, and **floating, submerged and marginal plants**.\n\n**Consumers:** **zooplankton** and free-swimming and bottom-dwelling animals. **Decomposers:** **fungi, bacteria and flagellates**, abundant at the bottom.',
  sol: 'Abiotic, producers, consumers, decomposers.',
  scheme: [['Abiotic components', 1], ['Producers', 1], ['Consumers and decomposers', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('functions-short', short({
  marks: 2,
  stem: 'List the four important components of the functioning of an ecosystem, and state how energy and minerals differ in the way they move.',
  model: 'The four components are **productivity, decomposition, energy flow and nutrient cycling**. **Energy flows one way**, from the sun through producers to consumers, and is lost as heat, while **minerals are recycled** by decomposition and mineralisation.',
  sol: 'Four components; one-way energy, recycled minerals.',
  scheme: [['Four components', 1], ['Energy one way; minerals recycled', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('strata-short', short({
  marks: 2,
  stem: 'A dense forest is replaced by a single-layer plantation of one tree species. Using the idea of stratification, explain how the variety of animals is likely to change.',
  model: 'In the forest, **trees, shrubs and herbs** formed **separate vertical layers**, each with different light, food and shelter, so many species lived at different levels. The plantation has **fewer layers and one plant species**, so fewer niches are available and the **variety of animals is likely to fall**.',
  sol: 'Fewer layers, fewer species.',
  scheme: [['Layers provide varied habitats', 1], ['Fewer layers: fewer animal species', 1]],
  d: 3, c: 'application', t: [1],
}));
add('ecosystem-long', long({
  stem: 'What is an ecosystem? Describe its structure, using a pond as an example, and explain the functions that every ecosystem performs.',
  model: '**Definition.** An ecosystem is a functional unit of nature in which living organisms interact among themselves and with their surrounding physical environment. It may be as small as a pond or as large as a forest; the whole biosphere is a global ecosystem. Ecosystems may be terrestrial, aquatic or man-made.\n\n**Structure.** Biotic and abiotic components interact to give a structure characteristic of each ecosystem, described by its species composition and stratification; in a forest, trees, shrubs and herbs occupy different layers. In a pond, the abiotic part is water with dissolved substances and the soil at the bottom, regulated by sunlight, temperature and day length. Producers are phytoplankton, algae and floating, submerged and marginal plants; consumers are zooplankton and free-swimming and bottom-dwelling animals; decomposers are fungi, bacteria and flagellates at the bottom.\n\n**Functions.** Autotrophs convert inorganic into organic material using the sun’s radiant energy; heterotrophs consume the autotrophs; dead organic matter is decomposed and mineralised so that minerals are reused; and energy moves one way towards higher trophic levels and is lost as heat. These correspond to productivity, decomposition, nutrient cycling and energy flow.',
  sol: 'Definition, structure with pond, functions.',
  scheme: [['Definition and types', 1], ['Structure: composition and stratification', 1], ['Pond components', 1.5], ['Four functions', 1.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 productivity and decomposition
{
  const g = 3000, rr = 1100, n = npp(g, rr);
  add('npp-num', num({
    stem: `A grassland has a gross primary productivity of ${g} kcal m⁻² yr⁻¹, and its plants use ${rr} kcal m⁻² yr⁻¹ in respiration. What is its net primary productivity (in kcal m⁻² yr⁻¹)?`,
    value: n,
    sol: r`$\text{NPP} = \text{GPP} - R = ${g} - ${rr} = ${n}$ kcal m⁻² yr⁻¹.`,
    scheme: [[`${n}`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 1900 || 'value');
}
{
  const n = 1600, rr = 800, g = n + rr;
  add('gpp-num', num({
    stem: `A forest has a net primary productivity of ${n} g m⁻² yr⁻¹, and its plants respire ${rr} g m⁻² yr⁻¹. What is its gross primary productivity?`,
    value: g,
    sol: r`$\text{GPP} = \text{NPP} + R = ${n} + ${rr} = ${g}$ g m⁻² yr⁻¹.`,
    scheme: [[`${g}`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => npp(q.answer.value, 800) === 1600 || 'value');
}
{
  const g = 2000, rr = 500, p = pct(npp(g, rr), g);
  add('nppshare-num', num({
    stem: `In a crop, GPP is ${g} kcal m⁻² yr⁻¹ and respiration is ${rr} kcal m⁻² yr⁻¹. What percentage of the GPP is available to heterotrophs as NPP?`,
    value: p, unit: '%',
    sol: r`$\text{NPP} = ${g} - ${rr} = ${npp(g, rr)}$; $\dfrac{${npp(g, rr)}}{${g}} \times 100 = ${p}$ percent.`,
    scheme: [[`${p}%`, 1]],
    d: 2, c: 'application', t: [2],
  }), (q) => q.answer.value === 75 || 'value');
}
{
  const total = 170, ocean = 55, land = total - ocean;
  add('land-num', num({
    stem: `The annual net primary productivity of the biosphere is about ${total} billion tons of organic matter, of which the oceans contribute about ${ocean} billion tons. How much is produced on land?`,
    value: land, unit: 'billion tons',
    sol: r`Land $= ${total} - ${ocean} = ${land}$ billion tons.`,
    scheme: [[`${land} billion tons`, 1]],
    d: 1, c: 'application', t: [2],
  }), (q) => q.answer.value === 115 || 'value');
}
add('units-mcq', mcq({
  stem: 'Which unit is suitable for expressing primary productivity?',
  right: 'kcal per square metre per year',
  wrong: ['kcal per gram', 'Number of species per square metre', 'Grams per litre'],
  sol: 'Productivity is a rate of production per unit area: g or kcal per square metre per year — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('secondary-mcq', mcq({
  stem: 'Secondary productivity is the rate of',
  right: 'formation of new organic matter by consumers',
  wrong: ['photosynthesis by plants', 'respiration by plants', 'decomposition of detritus'],
  sol: 'Secondary productivity refers to new organic matter formed by consumers — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('ocean-mcq', mcq({
  stem: 'Oceans cover about 70 percent of the Earth’s surface but contribute only about a third of the biosphere’s NPP. What does this show?',
  right: 'Productivity per unit area in the oceans is lower than on land, as primary productivity depends on factors such as nutrient availability.',
  wrong: ['Oceans have no producers.', 'Oceans have more decomposers than producers.', 'NPP does not depend on the area of an ecosystem.'],
  sol: 'A large area with a small share of production means low productivity per square metre; productivity depends on nutrients, light and the plants present — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('fragment-mcq', mcq({
  stem: 'Breaking down detritus into smaller particles by earthworms is called',
  right: 'fragmentation',
  wrong: ['leaching', 'catabolism', 'humification'],
  sol: 'Detritivores such as earthworms carry out fragmentation — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('leaching-mcq', mcq({
  stem: 'What happens during leaching in decomposition?',
  right: 'Water-soluble inorganic nutrients move down into the soil and get precipitated as unavailable salts.',
  wrong: ['Earthworms break detritus into small pieces.', 'Enzymes convert detritus into simpler substances.', 'Humus releases nutrients through microbes.'],
  sol: 'Leaching moves soluble nutrients down the soil horizon, where they are precipitated as unavailable salts — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('humus-mcq', mcq({
  stem: 'Which statement about humus is correct?',
  right: 'It is dark, amorphous and colloidal, decomposes extremely slowly and acts as a reservoir of nutrients.',
  wrong: ['It is decomposed very quickly by bacteria.', 'It is made only of lignin.', 'It is formed before fragmentation begins.'],
  sol: 'Humus is resistant to microbial action, decomposes very slowly and stores nutrients — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('order-mcq', mcq({
  stem: 'Which sequence shows the steps of decomposition in the order in which humus forms and is then broken down?',
  right: 'Fragmentation, leaching, catabolism, humification, mineralisation',
  wrong: ['Humification, fragmentation, mineralisation, leaching, catabolism', 'Mineralisation, catabolism, leaching, fragmentation, humification', 'Leaching, humification, fragmentation, mineralisation, catabolism'],
  sol: 'Detritus is fragmented, leached and catabolised; humus then forms and is finally mineralised — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('bog-mcq', mcq({
  stem: 'Thick layers of partly decayed plant matter build up in cold, waterlogged bogs. What is the best explanation?',
  right: 'Low temperature and lack of oxygen (anaerobiosis) inhibit decomposition.',
  wrong: ['Bog plants are rich in sugars and nitrogen.', 'Leaching is faster in waterlogged soil.', 'Decomposers grow best in cold water.'],
  sol: 'Decomposition is largely oxygen-requiring and is slowed by cold; so organic matter accumulates — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('litter-mcq', mcq({
  stem: 'Two kinds of leaf litter are left on moist forest soil: soft leaves rich in sugars and nitrogen, and tough woody twigs rich in lignin. Which will decompose faster, and why?',
  right: 'The soft leaves, because detritus rich in nitrogen and water-soluble sugars decomposes quickly',
  wrong: ['The twigs, because lignin is easily digested', 'Both at the same rate, because only temperature matters', 'The twigs, because they hold more water'],
  sol: 'Lignin slows decomposition; nitrogen and sugars speed it up — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('oxygen-tf', tf({
  stem: 'Decomposition is largely an oxygen-requiring process.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [2],
}));
add('humus-fill', fill({
  stem: 'The dark, amorphous substance formed during decomposition that is highly resistant to microbial action is called ______.',
  acc: [['humus']],
  sol: 'Humus.',
  d: 1, c: 'recall', t: [2],
}));
add('catabolism-fill', fill({
  stem: 'Degradation of detritus into simpler inorganic substances by bacterial and fungal enzymes is called ______.',
  acc: [['catabolism']],
  sol: 'Catabolism.',
  d: 1, c: 'recall', t: [2],
}));
add('lignin-ar', ar({
  a: 'Decomposition is faster in warm and moist conditions.',
  r: 'Detritus rich in lignin and chitin decomposes slowly.',
  key: 'b',
  sol: 'Both are true, but R is about the chemical composition of detritus and does not explain the effect of climate in A — option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('gpp-short', short({
  marks: 2,
  stem: 'Distinguish between gross primary productivity and net primary productivity.',
  model: '**GPP** is the **rate of production of organic matter during photosynthesis**. A considerable part of it is used by the plants in **respiration**. **NPP** is what remains, **NPP = GPP − R**, and it is the biomass **available to heterotrophs** (herbivores and decomposers).',
  sol: 'Definitions and relation.',
  scheme: [['GPP defined', 1], ['NPP = GPP − R, available to consumers', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('productivity-short', short({
  marks: 2,
  stem: 'Ecosystem P has GPP 2500 and R 1500, while ecosystem Q has GPP 2000 and R 600 (both in g m⁻² yr⁻¹). Which can support more herbivores? Show your working.',
  model: `NPP of P $= 2500 - 1500 = ${npp(2500, 1500)}$; NPP of Q $= 2000 - 600 = ${npp(2000, 600)}$ g m⁻² yr⁻¹. **Q** has the higher **NPP**, which is the biomass **available to heterotrophs**, so Q can support more herbivores even though its GPP is lower.`,
  sol: 'Compare NPP, not GPP.',
  scheme: [['Both NPP values', 1], ['Q, because NPP is what consumers can use', 1]],
  d: 3, c: 'application', t: [2],
}), () => npp(2000, 600) > npp(2500, 1500) || 'compare');
add('decomp-short', short({
  marks: 3,
  stem: 'Describe the steps by which detritus is decomposed in soil.',
  model: '1. **Fragmentation:** detritivores such as earthworms break detritus into smaller particles.\n2. **Leaching:** water-soluble nutrients move down into the soil and are precipitated as unavailable salts.\n3. **Catabolism:** bacterial and fungal **enzymes** degrade detritus into simpler inorganic substances.\n4. **Humification** forms **humus**, which decomposes very slowly.\n5. **Mineralisation:** microbes degrade humus, releasing **inorganic nutrients**.',
  sol: 'Five steps in order.',
  scheme: [['Fragmentation and leaching', 1], ['Catabolism', 1], ['Humification and mineralisation', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('factors-short', short({
  marks: 3,
  stem: 'Leaf litter on the floor of a tropical rainforest disappears within months, while litter in a cold coniferous forest can remain for years. Explain, using the factors that control decomposition.',
  model: 'Decomposition is faster in **warm and moist** conditions, which favour decomposers, as in the **rainforest**. In the cold forest, **low temperature** slows decomposers. Conifer needles and woody litter are rich in **lignin**, which decomposes slowly, whereas soft leaves rich in **nitrogen and sugars** break down quickly. So litter **accumulates** in the cold forest.',
  sol: 'Climate and chemical composition.',
  scheme: [['Warm, moist conditions favour decomposition', 1], ['Low temperature slows it', 1], ['Lignin versus nitrogen and sugars', 1]],
  d: 3, c: 'application', t: [2],
}));
add('decomp-long', long({
  stem: 'Explain the process of decomposition, naming each step, and discuss the factors that control its rate.',
  model: '**Decomposition.** Decomposers break down complex organic matter into inorganic substances such as carbon dioxide, water and nutrients. The raw material is detritus: dead plant remains such as leaves, bark and flowers, and dead animal remains including fecal matter.\n\n**Steps.** In fragmentation, detritivores such as earthworms break detritus into smaller particles. In leaching, water-soluble inorganic nutrients go down into the soil horizon and are precipitated as unavailable salts. In catabolism, bacterial and fungal enzymes degrade detritus into simpler inorganic substances. These three steps occur simultaneously. Humification then produces humus, a dark, amorphous, colloidal substance that resists microbial action, decomposes extremely slowly and acts as a reservoir of nutrients. Finally, in mineralisation, some microbes degrade humus and release inorganic nutrients.\n\n**Factors.** Decomposition is largely an oxygen-requiring process. Its rate depends on the chemical composition of detritus: it is slow when detritus is rich in lignin and chitin, and quick when it is rich in nitrogen and water-soluble substances such as sugars. Climate also matters: warm and moist conditions favour decomposition, while low temperature and anaerobiosis inhibit it, so organic material builds up.',
  sol: 'Steps and factors.',
  scheme: [['Detritus and decomposers', 0.5], ['Fragmentation, leaching, catabolism', 1.5], ['Humification and mineralisation', 1], ['Chemical composition', 1], ['Climate and oxygen', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('productivity-long', long({
  stem: 'Explain primary and secondary productivity, gross and net primary productivity, and the factors on which primary productivity depends. Use biosphere figures to compare land and oceans.',
  model: '**Primary production** is the amount of biomass or organic matter produced per unit area over a time period by plants during photosynthesis, expressed as weight (g per square metre) or energy (kcal per square metre). Its rate is **primary productivity**, expressed in g or kcal per square metre per year, so that ecosystems can be compared.\n\n**GPP and NPP.** Gross primary productivity is the rate of production of organic matter during photosynthesis. Plants use a considerable part of it in respiration (R). What remains, NPP = GPP − R, is available for consumption by heterotrophs, both herbivores and decomposers. **Secondary productivity** is the rate of formation of new organic matter by consumers.\n\n**Factors.** Primary productivity depends on the plant species in an area, environmental factors, the availability of nutrients and the photosynthetic capacity of the plants, so it varies between ecosystems.\n\n**Land and oceans.** The biosphere’s annual NPP is about 170 billion tons (dry weight). Although oceans cover about 70 percent of the surface, they produce only about 55 billion tons; about 115 billion tons come from land, so productivity per unit area is much lower in the oceans.',
  sol: 'Definitions, NPP relation, factors, comparison.',
  scheme: [['Primary production and productivity with units', 1], ['GPP, NPP = GPP − R, secondary productivity', 1.5], ['Factors', 1], ['Land and ocean comparison', 1.5]],
  wl: [80, 240],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 energy flow
{
  const e = tenPercent(20000, 3);
  add('tenpc-num', num({
    stem: 'In a food chain, producers fix 20000 J of energy. Using the 10 percent law, how much energy reaches the secondary consumers?',
    value: e[2], unit: 'J',
    sol: r`Primary consumers $= 20000 \times 0.1 = ${e[1]}$ J; secondary consumers $= ${e[1]} \times 0.1 = ${e[2]}$ J.`,
    scheme: [[`${e[2]} J`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 200 || 'value');
}
{
  const sun = 1000000, par = round(sun * 0.45, 0), fixed = round(par * 0.02, 0);
  add('par-num', num({
    stem: `Of ${sun} J of sunlight falling on a field, 45 percent is photosynthetically active radiation (PAR). If the crop captures 2 percent of the PAR, how much energy does it capture?`,
    value: fixed, unit: 'J',
    sol: r`PAR $= ${sun} \times 0.45 = ${par}$ J; captured $= ${par} \times 0.02 = ${fixed}$ J.`,
    scheme: [[`${fixed} J`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 9000 || 'value');
}
add('par-mcq', mcq({
  stem: 'What fraction of photosynthetically active radiation (PAR) do plants capture?',
  right: 'Only about 2–10 percent',
  wrong: ['About 50–60 percent', 'About 90 percent', 'All of it'],
  sol: 'Plants capture only 2–10 percent of PAR — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('vent-mcq', mcq({
  stem: 'An expedition finds a rich community of animals around hot vents on the deep ocean floor, where no sunlight ever reaches. What can be concluded about this ecosystem?',
  right: 'It is a deep-sea hydrothermal ecosystem, the one kind of ecosystem whose energy does not come from the sun.',
  wrong: ['It must receive sunlight through the water.', 'Its animals need no energy at all.', 'It is powered by the decomposition of floating phytoplankton only.'],
  sol: 'Except for the deep-sea hydrothermal ecosystem, the sun is the only source of energy; a vent community without light is such an exception — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('law-mcq', mcq({
  stem: 'Why do ecosystems need a constant supply of energy?',
  right: 'They obey the second law of thermodynamics and must counteract the tendency towards increasing disorder.',
  wrong: ['Energy is recycled within the ecosystem.', 'Decomposers create energy from minerals.', 'Producers store energy permanently.'],
  sol: 'Energy is needed continuously to synthesise molecules against the universal tendency towards disorder — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('trophic-mcq', mcq({
  stem: 'In the food chain grass → grasshopper → frog → snake → hawk, the frog is',
  right: 'a secondary consumer at the third trophic level',
  wrong: ['a primary consumer at the second trophic level', 'a tertiary consumer at the fourth trophic level', 'a producer at the first trophic level'],
  sol: 'Grass is level 1, grasshopper level 2 (primary consumer) and frog level 3 (secondary consumer) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('standing-mcq', mcq({
  stem: 'An ecologist harvests and dries all the grasshoppers in one square metre of a meadow on 1 July and weighs them. What has she measured?',
  right: 'The standing crop of the second trophic level, as biomass per unit area',
  wrong: ['The secondary productivity per year', 'The energy lost as heat by grasshoppers', 'The gross primary productivity of the meadow'],
  sol: 'Standing crop is the mass of living material at a trophic level at a particular time, per unit area — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('levels-mcq', mcq({
  stem: 'A student asks why we never see a food chain with ten trophic levels. What is the best answer?',
  right: 'Only about 10 percent of energy passes to each next level, so too little remains to support many levels.',
  wrong: ['Animals cannot eat more than one kind of food.', 'Decomposers eat all the top consumers.', 'Energy increases at each level and becomes harmful.'],
  sol: 'The 10 percent law restricts the number of trophic levels in a grazing food chain — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('saprotroph-fill', fill({
  stem: 'Decomposers such as fungi and bacteria, which secrete digestive enzymes onto dead matter and absorb the products, are called ______.',
  acc: [['saprotrophs', 'saprotroph', 'saprophytes']],
  sol: 'Saprotrophs.',
  d: 1, c: 'recall', t: [3],
}));
add('web-tf', tf({
  stem: 'The natural interconnection of food chains forms a food web.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('dfc-ar', ar({
  a: 'In a terrestrial ecosystem, a much larger fraction of energy flows through the detritus food chain than through the grazing food chain.',
  r: 'The detritus food chain begins with living plants eaten by herbivores.',
  key: 'c',
  sol: 'A is true; R is false, because the detritus food chain begins with dead organic matter — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('gfcdfc-short', short({
  marks: 3,
  stem: 'Distinguish between the grazing food chain and the detritus food chain, and state which is more important for energy flow on land and in water.',
  model: 'The **grazing food chain** begins with **living green plants** eaten by herbivores, e.g. **grass → goat → man**. The **detritus food chain** begins with **dead organic matter**; its decomposers, mainly **fungi and bacteria (saprotrophs)**, secrete enzymes and absorb the products. In **aquatic** ecosystems the **grazing chain** is the main conduit of energy; on **land** a much larger fraction flows through the **detritus chain**. The two are linked in **food webs**.',
  sol: 'Starting points, example, importance.',
  scheme: [['GFC with example', 1], ['DFC with decomposers', 1], ['Land versus water', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('tenlaw-short', short({
  marks: 2,
  stem: 'A lake’s phytoplankton fix 80000 kJ of energy in a season. Using the 10 percent law, estimate the energy available to fish that eat zooplankton, and state where the rest goes.',
  model: `Zooplankton receive about $80000 \\times 0.1 = ${tenPercent(80000, 3)[1]}$ kJ, and the fish about $${tenPercent(80000, 3)[1]} \\times 0.1 = ${tenPercent(80000, 3)[2]}$ kJ. The rest is **lost as heat** in **respiration** at each level (and some passes to decomposers), so energy flow is **unidirectional**.`,
  sol: 'Two steps of 10 percent; loss as heat.',
  scheme: [[`${tenPercent(80000, 3)[2]} kJ`, 1], ['Rest lost as heat in respiration', 1]],
  d: 2, c: 'application', t: [3],
}), () => tenPercent(80000, 3)[2] === 800 || 'value');
add('energy-long', long({
  stem: 'Describe the flow of energy in an ecosystem. Explain why it is unidirectional, distinguish grazing and detritus food chains, and explain how the 10 percent law limits the number of trophic levels.',
  model: '**Source.** Except for deep-sea hydrothermal ecosystems, the sun is the only source of energy. Less than 50 percent of incident solar radiation is photosynthetically active radiation (PAR), and plants capture only 2–10 percent of PAR; this small amount sustains the living world.\n\n**One-way flow.** Energy flows from the sun to producers and then to consumers. Ecosystems obey the second law of thermodynamics: they need a constant supply of energy to synthesise molecules and counteract the tendency towards disorder, and at every transfer much energy is lost as heat, so it cannot be recycled.\n\n**Food chains.** Green plants are producers; herbivores are primary consumers and carnivores secondary consumers. The grazing food chain starts with living plants (grass → goat → man). The detritus food chain starts with dead organic matter and is made of decomposers, mainly fungi and bacteria, which are saprotrophs. In water the grazing chain is the main route of energy; on land much more energy flows through the detritus chain. Linked chains form food webs.\n\n**Trophic levels.** Each trophic level has a standing crop. Only about 10 percent of the energy at one level passes to the next, so after four or five levels too little energy remains to support another population.',
  sol: 'Source, one-way flow, chains, 10 percent law.',
  scheme: [['Sun, PAR and capture', 1], ['Unidirectional flow and second law', 1], ['GFC and DFC with land and water', 1.5], ['10 percent law limiting trophic levels', 1.5]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 ecological pyramids
add('never-mcq', mcq({
  stem: 'Which ecological pyramid can never be inverted?',
  right: 'Pyramid of energy',
  wrong: ['Pyramid of numbers', 'Pyramid of biomass', 'All three can be inverted'],
  sol: 'Energy is always lost as heat from one level to the next, so the energy pyramid is always upright — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('tree-mcq', mcq({
  stem: 'A single large banyan tree supports thousands of caterpillars, which are eaten by a few birds. What is the shape of the pyramid of numbers for this food chain?',
  right: 'Inverted at the base: few producers support many herbivores',
  wrong: ['Upright, with many producers at the base', 'Always the same as the pyramid of energy', 'A straight column with equal levels'],
  sol: 'One tree (producer) supporting many caterpillars gives a narrow base under a wide second level — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('omnivore-mcq', mcq({
  stem: 'A sparrow eats both grain and insects. Which limitation of ecological pyramids does this illustrate?',
  right: 'Pyramids do not take into account a species that belongs to two or more trophic levels.',
  wrong: ['Pyramids leave out the producers.', 'Pyramids cannot show energy.', 'Pyramids include decomposers at every level.'],
  sol: 'A sparrow is both a primary and a secondary consumer, which a pyramid cannot show — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('limit-mcq', mcq({
  stem: 'Which organisms are given no place in ecological pyramids, though they play a vital role in the ecosystem?',
  right: 'Saprophytes (decomposers)',
  wrong: ['Producers', 'Herbivores', 'Top carnivores'],
  sol: 'Saprophytes are not shown in ecological pyramids — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
{
  const a = 2000, b = 180, e = efficiency(b, a);
  add('eff-num', num({
    stem: `Herbivores in a meadow take in ${a} kJ m⁻² yr⁻¹ of energy, and the carnivores feeding on them take in ${b} kJ m⁻² yr⁻¹. What percentage of the herbivores’ energy is transferred to the carnivores?`,
    value: e, unit: '%',
    sol: r`Transfer $= \dfrac{${b}}{${a}} \times 100 = ${e}$ percent.`,
    scheme: [[`${e}%`, 1]],
    d: 2, c: 'application', t: [4],
  }), (q) => q.answer.value === 9 || 'value');
}
add('biomass-ar', ar({
  a: 'The pyramid of biomass in the sea is generally inverted.',
  r: 'The biomass of fishes far exceeds that of phytoplankton.',
  key: 'a',
  sol: 'Both are true, and the larger biomass of consumers than of phytoplankton explains the inversion — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('energyinv-ar', ar({
  a: 'In the sea, the pyramid of energy is inverted, like the pyramid of biomass.',
  r: 'When energy flows from one trophic level to the next, some energy is always lost as heat.',
  key: 'd',
  sol: 'Because energy is always lost at each step, the energy pyramid is always upright, even in the sea; A is false and R is true — option (d).',
  d: 4, c: 'analysis', t: [4],
}));
add('limits-short', short({
  marks: 2,
  stem: 'State three limitations of ecological pyramids.',
  model: '1. They do not take into account the **same species belonging to two or more trophic levels**.\n2. They assume a **simple food chain**, which almost never exists, and **do not accommodate a food web**.\n3. **Saprophytes** are given **no place**, although they play a vital role.',
  sol: 'Three limitations.',
  scheme: [['Any two limitations', 1], ['Third limitation', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('pyramid-short', short({
  marks: 3,
  stem: 'In a stretch of sea, the standing crop of phytoplankton is 5 g m⁻² and that of zooplankton 22 g m⁻². Describe the pyramid of biomass these data give, explain how it is possible, and state the shape of the pyramid of energy for the same stretch.',
  model: 'The pyramid of biomass is **inverted**: the producer level (5 g m⁻²) is **narrower** than the consumer level (22 g m⁻²). This is possible because **standing crop** is measured at **one time**; phytoplankton are small and reproduce very fast, so a small standing crop supports a larger mass of consumers. The **pyramid of energy** is still **upright**, because energy is **lost as heat** at each transfer.',
  sol: 'Inverted biomass; reason; upright energy.',
  scheme: [['Inverted biomass pyramid', 1], ['Standing crop at one time; fast turnover', 1], ['Energy pyramid upright', 1]],
  d: 3, c: 'application', t: [4],
}), () => !upright([5, 22]) || 'shape');
add('pyramid-long', long({
  stem: 'What are ecological pyramids? Describe pyramids of number, biomass and energy, explaining with examples when each can be inverted, and state their limitations.',
  model: '**Ecological pyramids** show the relationship between trophic levels in terms of number, biomass or energy. The base is always the producers and the apex the top consumers.\n\n**Pyramid of number.** In a grassland it is upright: very many grass plants support fewer herbivores, still fewer carnivores and very few top carnivores. It is inverted when one large tree supports many insects.\n\n**Pyramid of biomass.** On land it is usually upright. In the sea it is generally inverted, because at any time the biomass of fishes and zooplankton far exceeds that of the phytoplankton, which are small and reproduce rapidly.\n\n**Pyramid of energy.** It is always upright and can never be inverted, because when energy flows from one trophic level to the next, some energy is always lost as heat; each level therefore has less energy than the one below it, roughly 10 percent passing on.\n\n**Limitations.** Pyramids do not take into account the same species belonging to two or more trophic levels; they assume a simple food chain and do not accommodate a food web; and saprophytes are given no place in them, although they play a vital role in the ecosystem.',
  sol: 'Definition; three pyramids with inversions; limitations.',
  scheme: [['Definition and base/apex', 0.5], ['Pyramid of number with inversion', 1], ['Pyramid of biomass with inversion in the sea', 1.5], ['Pyramid of energy always upright with reason', 1], ['Limitations', 1]],
  wl: [80, 240],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- cases
{
  const P = { gpp: 3600, r: 2000 }, Q = { gpp: 2400, r: 600 };
  const nP = npp(P.gpp, P.r), nQ = npp(Q.gpp, Q.r);
  add('productivity-case', mk.case({
    passage: `An ecologist measured productivity in two ecosystems for a year (values in g m⁻² yr⁻¹).\n\n| Ecosystem | GPP | Respiration by plants (R) |\n|---|---|---|\n| P: mature forest | ${P.gpp} | ${P.r} |\n| Q: young grassland | ${Q.gpp} | ${Q.r} |`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'What is the net primary productivity of ecosystem P?',
        value: nP,
        sol: r`$\text{NPP} = ${P.gpp} - ${P.r} = ${nP}$ g m⁻² yr⁻¹.`,
        scheme: [[`${nP}`, 1]],
        d: 1, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: 'Which ecosystem makes more organic matter available to herbivores and decomposers each year?',
        right: `Q, because its NPP (${nQ}) is higher than that of P (${nP})`,
        wrong: [`P, because its GPP (${P.gpp}) is higher`, 'Both equally, because NPP equals GPP', 'Neither, because NPP is used only by plants'],
        sol: 'NPP, not GPP, is available to heterotrophs; Q has the higher NPP — option (@K).',
        d: 3, c: 'analysis', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why GPP and NPP differ, and name the kind of productivity shown by the herbivores that feed on Q.',
        model: 'Plants use a considerable part of **GPP** in their own **respiration**, so **NPP = GPP − R**. The rate at which herbivores form new organic matter is **secondary productivity**.',
        sol: 'Respiration; secondary productivity.',
        scheme: [['Respiration uses part of GPP', 1], ['Secondary productivity', 1]],
        d: 2, c: 'understanding', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'State two factors on which the primary productivity of an ecosystem depends.',
          model: 'Primary productivity depends on the **plant species** present and their **photosynthetic capacity**, on the **availability of nutrients**, and on **environmental factors** such as light, temperature and water.',
          sol: 'Any two factors.',
          scheme: [['First factor', 1], ['Second factor', 1]],
          d: 1, c: 'recall', t: [2],
        }),
      ]),
    ],
  }), (q) => (q.children[0].answer.value === 1600 && nQ > nP) || 'values');
}
{
  const start = 20, warm = 6, cold = 16, lw = pct(start - warm, start), lc = pct(start - cold, start);
  add('litter-case', mk.case({
    passage: `Students placed ${start} g of dry leaf litter in mesh bags on the soil at two sites and weighed what remained after six months.\n\n| Site | Conditions | Litter left after 6 months |\n|---|---|---|\n| A | Warm, moist forest floor | ${warm} g |\n| B | Cold, dry hillside | ${cold} g |`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'What percentage of the litter was lost at site A?',
        value: lw, unit: '%',
        sol: r`Lost $= \dfrac{${start} - ${warm}}{${start}} \times 100 = \dfrac{${start - warm}}{${start}} \times 100 = ${lw}$ percent.`,
        scheme: [[`${lw}%`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('b', mcq({
        stem: `At site B only ${lc} percent was lost. Which statement explains the difference?`,
        right: 'Warm, moist conditions favour decomposers, while low temperature and dryness slow them.',
        wrong: ['Site B had more earthworms.', 'Leaching is faster in dry soil.', 'Decomposition does not need water.'],
        sol: 'Temperature and soil moisture regulate decomposer activity — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'The mesh of the bags was fine enough to keep earthworms out. Which step of decomposition would this reduce, and how would it affect the result?',
        model: 'It would reduce **fragmentation**, which is done by detritivores such as **earthworms**. Larger pieces have **less surface area** for microbial **enzymes** (catabolism), so decomposition would be **slower** than in open soil.',
        sol: 'Fragmentation reduced.',
        scheme: [['Fragmentation by earthworms', 1], ['Slower decomposition, less surface for microbes', 1]],
        d: 3, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Name the dark substance that slowly forms in the soil at site A, and state why it is useful.',
          model: '**Humus**. It is **colloidal** and highly **resistant** to microbial action, so it decomposes very slowly and acts as a **reservoir of nutrients**, which are released gradually by **mineralisation**.',
          sol: 'Humus as nutrient reservoir.',
          scheme: [['Humus', 1], ['Reservoir of nutrients, slow release', 1]],
          d: 2, c: 'understanding', t: [2],
        }),
      ]),
    ],
  }), (q) => (q.children[0].answer.value === 70 && lc === 20) || 'values');
}
{
  const e = tenPercent(40000, 4);
  add('energy-case', mk.case({
    passage: `In a grassland food chain, grass → grasshopper → frog → snake, the grass fixes ${e[0]} kJ of energy in a season. Assume that the 10 percent law holds at every step.`,
    d: 3, c: 'application',
    children: [
      part('a', num({
        stem: 'How much energy reaches the snakes?',
        value: e[3], unit: 'kJ',
        sol: r`$${e[0]} \times 0.1 = ${e[1]}$; $${e[1]} \times 0.1 = ${e[2]}$; $${e[2]} \times 0.1 = ${e[3]}$ kJ.`,
        scheme: [[`${e[3]} kJ`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('b', mcq({
        stem: 'At which trophic level is the frog?',
        right: 'Third trophic level (secondary consumer)',
        wrong: ['Second trophic level (primary consumer)', 'Fourth trophic level (tertiary consumer)', 'First trophic level (producer)'],
        sol: 'Grass 1, grasshopper 2, frog 3 — option (@K).',
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'What happens to the 90 percent of energy that is not passed on at each step, and why does this limit the length of the chain?',
        model: 'Most of it is **used in respiration and lost as heat** (some passes to decomposers in dead matter). Because so little passes on, after four or five levels there is **too little energy** to support another population, so food chains are short.',
        sol: 'Heat loss; too little energy.',
        scheme: [['Lost as heat in respiration', 1], ['Too little energy for more levels', 1]],
        d: 2, c: 'understanding', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Dead grass and dead grasshoppers are also eaten by detritivores and decomposers. Name this food chain and say how important it is on land.',
          model: 'This is the **detritus food chain**, which begins with **dead organic matter** and involves decomposers such as fungi and bacteria. In **terrestrial** ecosystems a **much larger fraction** of energy flows through it than through the grazing food chain.',
          sol: 'DFC; major route on land.',
          scheme: [['Detritus food chain', 1], ['Larger energy fraction on land', 1]],
          d: 2, c: 'understanding', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[0].answer.value === 40 || 'value');
}
{
  const bio = [6, 25, 4], en = tenPercent(12000, 3);
  add('pyramid-case', mk.case({
    passage: `In a coastal sea, ecologists recorded the standing crop and the energy flow at three trophic levels.\n\n| Level | Standing crop (g m⁻²) | Energy flow (kJ m⁻² yr⁻¹) |\n|---|---|---|\n| Phytoplankton | ${bio[0]} | ${en[0]} |\n| Zooplankton | ${bio[1]} | ${en[1]} |\n| Small fish | ${bio[2]} | ${en[2]} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What is the shape of the pyramid of biomass for the first two levels?',
        right: 'Inverted: the zooplankton level is wider than the phytoplankton base',
        wrong: ['Upright: the base is widest', 'Equal at both levels', 'It cannot be drawn from standing crop'],
        sol: `${bio[1]} g m⁻² of zooplankton exceeds ${bio[0]} g m⁻² of phytoplankton, so the pyramid is inverted — option (@K).`,
        d: 2, c: 'application', t: [4],
      })),
      part('b', num({
        stem: 'What percentage of the energy flowing through the zooplankton passes to the small fish?',
        value: efficiency(en[2], en[1]), unit: '%',
        sol: r`$\dfrac{${en[2]}}{${en[1]}} \times 100 = ${efficiency(en[2], en[1])}$ percent.`,
        scheme: [[`${efficiency(en[2], en[1])}%`, 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the pyramid of energy for this sea is upright although the pyramid of biomass is not.',
        model: 'Energy is **lost as heat** at every transfer, so each level receives **less energy** than the one below and the energy pyramid is **always upright**. Biomass is a **standing crop at one time**; fast-reproducing phytoplankton can have a small standing crop yet support a larger mass of consumers.',
        sol: 'Heat loss versus standing crop.',
        scheme: [['Energy lost at each level: upright', 1], ['Standing crop at one time explains inverted biomass', 1]],
        d: 3, c: 'analysis', t: [4],
      }), [
        short({
          marks: 2,
          stem: 'Some fish here eat both phytoplankton and zooplankton. Which limitation of pyramids does this show, and why?',
          model: 'Pyramids **do not take into account a species that belongs to two or more trophic levels**. These fish are both **primary** and **secondary consumers**, so they cannot be placed at a single level; pyramids also **ignore food webs**.',
          sol: 'Species at two levels.',
          scheme: [['Limitation named', 1], ['Fish at two levels explained', 1]],
          d: 2, c: 'application', t: [4],
        }),
      ]),
    ],
  }), (q) => (q.children[1].answer.value === 10 && upright(en) && !upright(bio.slice(0, 2))) || 'values');
}
