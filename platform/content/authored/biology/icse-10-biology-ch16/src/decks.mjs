// ICSE 10 Biology ch16 Pollution — Part 1 (t01–t03), Part 2 (t04–t06).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { GREENHOUSE, OZONE, ACIDRAIN, DDT_CHAIN, TOWN, NOISE_FIG } from './svgs.mjs';
import { DDT, DDT_BIRD_WATER, CANTEEN, DO, NOISE_LIMIT, NOISY } from './calc.mjs';

export const V = {
  greenhouse: svgV(GREENHOUSE, 'The greenhouse effect'),
  ozone: svgV(OZONE, 'The ozone layer and its depletion by CFCs'),
  acid: svgV(ACIDRAIN, 'How acid rain forms and what it damages'),
  ddt: svgV(DDT_CHAIN, 'DDT concentration rising along a lake food chain, imagined values'),
  town: svgV(TOWN, 'Five sources of pollution in a town beside a river'),
  noise: svgV(NOISE_FIG, 'Imagined sound levels at five places compared with the harmful level'),
};

export const deck1 = deck({
  part: 1,
  title: 'Pollution — Part 1: Air, water, soil, waste, radiation and noise',
  goals: [
    'Name the main air pollutants and their sources',
    'Explain how detergents, sewage, industrial waste, oil spills and hot water pollute water, and name sources of soil pollution',
    'Explain why biomedical waste must be segregated, and state the sources and effects of radiation and noise',
  ],
  slides: [
    sl('title', 'Pollution', {
      b: 'Part 1 — what pollutes our air, water and soil, and where it comes from.',
      v: V.town,
      n: 'Look at this town by a river. A car puffs out exhaust, a power plant pours hot water into the river, drains carry sewage, garbage burns in a heap and fertiliser washes off the fields. Each one is a source of pollution. In this part we meet them one by one.',
    }),
    sl('concept', 'Air pollutants and their sources', {
      v: table(['Pollutant', 'Main sources', 'Harm'], [['Carbon monoxide', 'Vehicle exhaust, burning garbage', 'Combines with haemoglobin; less oxygen to tissues'], ['Sulphur dioxide', 'Coal-burning power plants, factories, brick kilns', 'Irritates lungs; forms acid rain'], ['Nitrogen oxides', 'Vehicles, power plants', 'Lung damage; acid rain; smog'], ['Particulate matter (soot, dust)', 'Brick kilns, diesel engines, burning garbage and crop stubble', 'Coughs, asthma, lung disease'], ['Carbon dioxide', 'Burning coal, petrol and wood', 'Global warming']], 'Table of five air pollutants, their main sources and harmful effects'),
      n: 'Most air pollution comes from burning things: fuels in vehicles, coal in power plants and kilns, and garbage in the open. Each burning releases a mixture of gases and fine particles that harm our lungs and the planet.',
    }),
    sl('check', 'Quick check: winter haze', {
      b: 'Which pollutant forms most of a smoky winter haze?',
      chk: 'stubble-mcq',
      n: 'Think of tiny particles of soot and dust.',
    }),
    sl('concept', 'Water pollution', {
      v: table(['Pollutant', 'Effect on water'], [['Sewage', 'Bacteria decomposing it use up oxygen; spreads cholera, typhoid'], ['Detergents and fertilisers', 'Phosphates and nitrates cause algal bloom (eutrophication)'], ['Industrial waste', 'Poisons such as mercury and lead build up in fish'], ['Oil spills', 'Coat birds\' feathers; block air exchange at the surface']], 'Table of four water pollutants and their effects'),
      n: 'Water carries away whatever we pour into it. Sewage and detergents feed microbes and algae that steal the oxygen fish need. Factory poisons build up in fish. Oil floats as a film that kills birds and blocks air from the water.',
    }),
    sl('example', 'Worked example 1: why do fish die below a power plant?', {
      b: `Water at **${DO.cool.t} °C** holds about **${DO.cool.mg}** mg of oxygen per litre; at **${DO.warm.t} °C**, only about **${DO.warm.mg}**.`,
      ul: [`Step 1: fall = ${DO.cool.mg} − ${DO.warm.mg} = **${DO.fall}** mg per litre.`, `Step 2: as a percentage of ${DO.cool.mg}: about **${DO.pctFall} per cent** less oxygen.`, 'Step 3: warm fish are more active and need **more** oxygen, so they suffocate: **thermal pollution**.'],
      v: table(['Water', 'Dissolved oxygen (mg per litre)'], [[`${DO.cool.t} °C`, String(DO.cool.mg)], [`${DO.warm.t} °C`, String(DO.warm.mg)], ['Fall', String(DO.fall)]], `Worked table: dissolved oxygen falls from ${DO.cool.mg} to ${DO.warm.mg} milligrams per litre when water warms from ${DO.cool.t} to ${DO.warm.t} degrees`),
      n: 'Warm water simply cannot hold as much oxygen as cool water. At the same time, fish in warm water breathe faster and need more. That double blow is why hot water from power plants can empty a river of fish.',
    }),
    sl('check', 'Quick check: hot water', {
      b: 'Fill in: hot water from power plants causes ______ pollution.',
      chk: 'thermal-fill',
      n: 'The word comes from heat.',
    }),
    sl('concept', 'Soil pollution', {
      v: table(['Source', 'Effect on soil'], [['Excess chemical fertilisers', 'Soil becomes acidic or salty; useful organisms die'], ['Pesticides such as DDT', 'Persist and enter food chains'], ['Urban waste: plastics, metals, e-waste', 'Do not decay; block air and water; leak poisons'], ['Industrial waste', 'Heavy metals make soil toxic']], 'Table of four sources of soil pollution and their effects'),
      n: 'Soil is alive with tiny organisms that keep it fertile. Too much fertiliser, persistent pesticides and dumped plastics and metals poison them, so the soil slowly loses its fertility.',
    }),
    sl('concept', 'Biomedical waste and radiation', {
      b: '**Biomedical waste** (syringes, needles, dressings, body tissues) can spread infection; it must be **segregated** in colour-coded bins and treated by **autoclaving** or **incineration**. **Radiation** from X-rays, radioactive waste and nuclear accidents can damage genes and cause **cancer**.',
      v: table(['Waste or source', 'Why it is dangerous', 'Safe handling'], [['Used needles and syringes', 'Injury; spread of hepatitis and other infections', 'Puncture-proof container; treated before disposal'], ['Soiled dressings, tissues', 'Germs', 'Separate bin; incineration'], ['Radioactive waste, X-rays', 'Gene damage, cancer', 'Shielding (lead); sealed, guarded storage']], 'Table of biomedical waste and radiation sources, their dangers and safe handling'),
      n: 'A used needle in an ordinary bin can infect the person who empties it. That is why hospitals sort their waste into separate coloured bins. Radiation is invisible, so X ray rooms use lead shields and radioactive waste is sealed away.',
    }),
    sl('diagram', 'Noise pollution', {
      b: `Sound is measured in **decibels (dB)**. Long exposure above about **${NOISE_LIMIT} dB** can damage hearing.`,
      v: V.noise,
      n: 'A library is quiet, a classroom a little louder. But a busy road, a wedding band or a firecracker nearby go well past the harmful level. Loud noise can cause hearing loss, stress, sleeplessness and high blood pressure.',
    }),
    sl('example', 'Worked example 2: reading a noise chart', {
      b: `Which places in the chart are above about ${NOISE_LIMIT} dB?`,
      ul: ['Step 1: find the harmful line on the chart.', `Step 2: list the bars that cross it: ${NOISY.map((n) => n.place).join(', ')}.`, `Step 3: count them: **${NOISY.length}** places; suggest one remedy for each.`],
      v: table(['Place', 'Level (dB)', 'Remedy'], NOISY.map((n) => [n.place, String(n.db), n.place === 'Busy road' ? 'No pressure horns; trees as sound barriers' : n.place === 'Wedding band' ? 'Limit volume and timing' : 'Avoid loud firecrackers; keep distance'], ), 'Worked table of three loud places, their sound levels and a remedy for each'),
      n: 'Read the chart against the line, count the bars that cross it, and think of a practical remedy for each. Quieter horns, lower volumes and keeping a safe distance all protect our ears.',
    }),
    sl('check', 'Quick check: how many are too loud?', {
      b: 'How many places in the chart are above the harmful level?',
      chk: 'noise-chart-mcq',
      n: 'Count the red bars.',
    }),
    sl('summary', 'Summary', {
      ul: ['Air: carbon monoxide, sulphur dioxide, nitrogen oxides, particulate matter, carbon dioxide from vehicles, industry, kilns and burning garbage.', 'Water: sewage, detergents, industrial waste, oil; hot water causes thermal pollution.', 'Soil: excess fertilisers, pesticides, urban and industrial waste.', 'Biomedical waste must be segregated; radiation and noise harm health.'],
      v: table(['Type', 'One key source'], [['Air', 'Vehicle exhaust'], ['Water', 'Untreated sewage'], ['Soil', 'Excess fertiliser'], ['Noise', 'Horns and loudspeakers']], 'Summary table of one key source for each type of pollution'),
      n: 'To recap. Burning pollutes the air, waste pollutes water and soil, hospitals must handle their waste with care, and loud noise and radiation harm our health. Knowing the source is the first step to controlling it.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Pair every pollutant with its **source** and its **effect**.', 'Thermal pollution works by **lowering dissolved oxygen**.', 'Biomedical waste: **segregate**, then **autoclave or incinerate**.', 'Write the unit **decibel (dB)** for noise.'],
      n: 'Exam tips. Always link a pollutant to where it comes from and what it does. Explain thermal pollution through oxygen. Say that biomedical waste is segregated and treated. And measure noise in decibels.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Pollution — Part 2: Waste, global effects and control',
  goals: [
    'Classify wastes as biodegradable or non-biodegradable and explain why DDT is harmful in food chains',
    'Explain the causes and effects of global warming, acid rain and ozone depletion',
    'Suggest control measures and describe the aims of the Swachh Bharat Abhiyan',
  ],
  slides: [
    sl('title', 'Waste, Global Effects and Control', {
      b: 'Part 2 — wastes that stay, problems that cross borders, and what we can do.',
      v: flow('LR', [['w', 'Wastes and pesticides'], ['g', 'Global effects'], ['c', 'Control measures']], [['w', 'g'], ['g', 'c']], 'Flow: wastes and pesticides, then global effects, then control measures'),
      n: 'Some wastes disappear quickly, others stay for centuries. Some pollutants harm the whole planet, warming it, souring its rain and thinning its ozone shield. In this part we look at these problems and at the ways to control them.',
    }),
    sl('concept', 'Biodegradable and non-biodegradable wastes', {
      v: table(['Biodegradable', 'Non-biodegradable'], [['Broken down by bacteria and fungi', 'Not broken down by decomposers'], ['Food scraps, paper, cow dung, leaves', 'Plastics, glass, metals, DDT'], ['Can be composted', 'Must be reduced, reused or recycled']], 'Table comparing biodegradable and non-biodegradable wastes'),
      n: 'A banana peel rots in days because bacteria and fungi feed on it. A plastic bag can lie in the soil for hundreds of years because nothing can digest it. That difference decides how each kind of waste should be handled.',
    }),
    sl('check', 'Quick check: why plastics stay', {
      b: 'Plastics are called non-biodegradable because…',
      chk: 'nonbio-mcq',
      n: 'Who breaks down dead matter?',
    }),
    sl('diagram', 'DDT in a food chain', {
      b: `DDT is **non-biodegradable**. It is stored in body fat and becomes **more concentrated** at each step: **biomagnification**.`,
      v: V.ddt,
      n: 'DDT washed into a lake is present in only tiny amounts. But plankton absorb it, small fish eat lots of plankton, large fish eat lots of small fish, and birds eat the large fish. At every step the DDT piles up, so the bird at the top carries the most.',
    }),
    sl('example', 'Worked example 1: how much does DDT build up?', {
      b: `Using the imagined values: lake water **${DDT[0].ppm}** ppm, fish-eating bird **${DDT[4].ppm}** ppm.`,
      ul: [`Step 1: divide the higher level by the lower: ${DDT[4].ppm} ÷ ${DDT[0].ppm}.`, `Step 2: the answer is **${DDT_BIRD_WATER.toLocaleString('en-IN')}** (ten lakh) times.`, 'Step 3: explain: not broken down, not excreted, and each animal eats many from the level below.'],
      v: table(['Level', 'DDT (ppm)'], DDT.map((d) => [d.level, String(d.ppm)]), `Worked table of DDT levels from ${DDT[0].ppm} parts per million in water to ${DDT[4].ppm} in the bird`),
      n: 'Dividing shows how dramatic biomagnification is. The bird holds about a million times the concentration found in the water. That is why a pesticide sprayed in small amounts can still thin the eggshells of birds of prey.',
    }),
    sl('diagram', 'The greenhouse effect and global warming', {
      b: '**Carbon dioxide**, methane, nitrous oxide and CFCs trap heat given off by the Earth. More of these gases means **global warming**: melting glaciers, rising seas, extreme weather.',
      v: V.greenhouse,
      n: 'Sunlight passes through the air and warms the ground. The warm ground gives off heat, and greenhouse gases trap part of it. A little of this keeps the Earth warm enough for life. Too much, from burning fuels and cutting forests, is heating the planet.',
    }),
    sl('diagram', 'Acid rain', {
      b: '**Sulphur dioxide** and **nitrogen oxides** dissolve in rain water to form **sulphuric and nitric acids**. Acid rain damages trees, makes lakes acidic and corrodes marble.',
      v: V.acid,
      n: 'When coal and petrol burn, sulphur and nitrogen oxides rise into the clouds and turn into acids. The rain that falls can be many kilometres away. It kills fish in lakes, harms forests and eats away at marble buildings and statues.',
    }),
    sl('diagram', 'Ozone layer depletion', {
      b: 'The **ozone layer** in the stratosphere absorbs harmful **UV rays**. **CFCs** from old refrigerators, air conditioners and sprays destroy ozone, letting more UV-B reach the ground: **skin cancer, cataract, crop damage**.',
      v: V.ozone,
      n: 'High above the clouds, a thin layer of ozone acts as a sunscreen for the planet. CFCs drift up and break it down. Where the layer thins, more ultraviolet light reaches us, raising the risk of skin cancer and eye damage.',
    }),
    sl('check', 'Quick check: the ozone destroyers', {
      b: 'Fill in: chlorofluorocarbons, or ______, deplete the ozone layer.',
      chk: 'cfc-fill',
      n: 'Three capital letters.',
    }),
    sl('concept', 'Controlling pollution', {
      v: table(['Measure', 'How it helps'], [['CNG for buses and autos', 'Burns cleanly: less smoke and sulphur dioxide'], ['Bharat Stage emission norms', 'Limit pollutants from new vehicles (BS-VI in force across India since April 2020)'], ['Switching off engines at red lights', 'Saves fuel; less exhaust'], ['Social forestry', 'Trees absorb carbon dioxide and trap dust'], ['Sewage treatment plants', 'Clean sewage before it reaches rivers'], ['Bans on single-use plastics', 'Less non-biodegradable waste (India: listed items banned from July 2022)'], ['Organic farming', 'Compost and natural pest control instead of chemicals']], 'Table of seven pollution control measures and how each helps'),
      n: 'Every source has a remedy. Cleaner fuels and stricter vehicle norms cut exhaust. Trees soak up gases and dust. Treatment plants clean sewage. Plastic bans and organic farming keep persistent chemicals out of the soil and water.',
    }),
    sl('example', 'Worked example 2: auditing a canteen', {
      b: `A school canteen produced **${CANTEEN.total} kg** of waste in a day.`,
      ul: [`Step 1: biodegradable = food ${CANTEEN.food} + paper ${CANTEEN.paper} = **${CANTEEN.bio} kg**.`, `Step 2: share = ${CANTEEN.bio} ÷ ${CANTEEN.total} × 100 = **${CANTEEN.pctBio} per cent**.`, `Step 3: compost the ${CANTEEN.bio} kg; send the other ${CANTEEN.nonbio} kg (plastic, glass, cans) for recycling.`],
      v: table(['Waste', 'Mass (kg)', 'Type'], [['Food scraps', String(CANTEEN.food), 'Biodegradable'], ['Paper', String(CANTEEN.paper), 'Biodegradable'], ['Plastic wrappers', String(CANTEEN.plastic), 'Non-biodegradable'], ['Glass bottles', String(CANTEEN.glass), 'Non-biodegradable'], ['Metal cans', String(CANTEEN.cans), 'Non-biodegradable']], `Worked table of canteen waste: ${CANTEEN.bio} of ${CANTEEN.total} kilograms is biodegradable`),
      n: 'Sort first, then calculate. Three quarters of this canteen’s waste can be turned into compost. The rest should be kept out of the compost pit and sent for recycling. Segregating waste at the source makes both possible.',
    }),
    sl('concept', 'The Swachh Bharat Abhiyan', {
      b: 'Launched by the Government of India on **2 October 2014**.',
      v: table(['Aim', 'Example of action'], [['A clean India', 'Cleanliness drives in streets, schools and public places'], ['End open defecation', 'Building and using toilets in homes, schools and villages'], ['Scientific waste management', 'Segregating wet and dry waste; composting; recycling'], ['Change in habits', 'Awareness: no littering, keep surroundings clean']], 'Table of four aims of the Swachh Bharat Abhiyan with an example of action for each'),
      n: 'The Clean India Mission asks everyone to take part. Its aims are simple: clean surroundings, a toilet for every family, proper handling of waste, and a change in our everyday habits.',
    }),
    sl('check', 'Quick check: Clean India', {
      b: 'The Swachh Bharat Abhiyan aims mainly to…',
      chk: 'swachh-mcq',
      n: 'Think of toilets and waste.',
    }),
    sl('summary', 'Summary', {
      ul: ['Biodegradable wastes rot; non-biodegradable ones persist. DDT builds up in food chains (biomagnification).', 'Greenhouse gases cause global warming; sulphur and nitrogen oxides cause acid rain; CFCs deplete ozone.', 'Controls: CNG, Bharat Stage norms, switching off at signals, social forestry, sewage treatment, plastic bans, organic farming.', 'Swachh Bharat Abhiyan: clean India, toilets, waste management.'],
      v: table(['Problem', 'Main cause'], [['Global warming', 'Carbon dioxide'], ['Acid rain', 'Sulphur dioxide, nitrogen oxides'], ['Ozone depletion', 'CFCs']], 'Summary table of three global problems and their main causes'),
      n: 'To recap. Persistent wastes and pesticides build up. Gases from burning warm the planet and sour the rain, and CFCs thin the ozone layer. Cleaner fuels, trees, treatment plants and cleaner habits are the answer.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Do not confuse the **greenhouse effect** (heat trapped) with **ozone depletion** (UV let in).', 'Acid rain: name **both** gases and **both** acids.', 'For DDT, use the word **biomagnification**.', 'Give **dates** only as stated: Swachh Bharat 2014; BS-VI 2020.'],
      n: 'Exam tips. Keep the greenhouse effect and the ozone hole apart. For acid rain name the gases and the acids. Use the word biomagnification for DDT. And quote dates carefully.',
    }),
  ],
});
