// ICSE 10 Biology ch16 Pollution — question bank in ICSE 2027 style.
// DDT factors, waste shares, dissolved-oxygen falls, pH ratios, noise counts and fuel savings are computed by calc.mjs.
// Time-sensitive facts (Bharat Stage norms, Swachh Bharat Abhiyan, plastic bans) are stated as dated, stable facts only.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { DDT, DDT_BIRD_WATER, DDT_BIRD_SMALLFISH, CANTEEN, NOISY, NOISE_LIMIT, DO, RAIN, IDLE } from './calc.mjs';
import { DDT_CHAIN, TOWN_LETTERED, NOISE_FIG, OZONE } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const ddtFig = svgV(DDT_CHAIN, 'DDT levels along a lake food chain, imagined values');
const townFig = svgV(TOWN_LETTERED, 'A town beside a river with five sources of pollution lettered A to E');
const noiseFig = svgV(NOISE_FIG, 'Imagined sound levels in decibels at five places');
const ozoneFig = svgV(OZONE, 'The ozone layer and its depletion by CFCs');
const dd = (n) => n.toLocaleString('en-IN');

// ---------------------------------------------------------------- t01 air pollution: sources and pollutants
add('co-mcq', mcq({
  stem: 'Carbon monoxide in vehicle exhaust is dangerous because it',
  right: 'combines with haemoglobin and reduces the oxygen carried by the blood', wrong: ['dissolves in rain to form a strong acid', 'breaks down the ozone layer', 'raises the level of the sea'],
  sol: 'Carbon monoxide binds firmly to haemoglobin, so less oxygen reaches the tissues — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('source-mcq', mcq({
  stem: 'Which source releases the largest amounts of sulphur dioxide into the air?',
  right: 'Power plants and factories that burn coal', wrong: ['Solar panels', 'Wind turbines', 'Hydroelectric dams'],
  sol: 'Coal contains sulphur, which forms sulphur dioxide when burnt — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('stubble-mcq', mcq({
  stem: 'Each winter a town near farmland is covered by a thick, smoky haze when crop stubble is burnt in the fields and traffic jams are long. Which pollutant is mainly responsible for the haze?',
  right: 'Particulate matter (fine soot and dust)', wrong: ['Ozone in the stratosphere', 'Phosphates', 'Hot water'],
  sol: 'Burning stubble and vehicle exhaust release fine particles that hang in the cold, still air — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('co-ar', ar({
  a: 'Sitting in a closed garage with a car engine running can be fatal.',
  r: 'Car exhaust contains carbon monoxide, which reduces the oxygen-carrying capacity of the blood.',
  key: 'c',
  sol: 'Both are true, and the build-up of carbon monoxide in a closed space is exactly why it can kill — option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('pollutant-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: any substance that, when added to air, water or soil, makes it harmful to living things.',
  model: '**Pollutant.**',
  sol: 'Pollutant.', scheme: [['Pollutant', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-air', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Carbon monoxide, Sulphur dioxide, Nitrogen dioxide, Oxygen.',
  model: '**Oxygen**; the others are **air pollutants**.',
  sol: 'Oxygen is a normal part of clean air.', scheme: [['Odd one and category', 1]],
  d: 1, c: 'analysis', t: [1],
}));
add('reason-co', short({
  marks: 1, wl: null,
  stem: 'Give reason: a person can be poisoned by carbon monoxide without noticing it.',
  model: 'Carbon monoxide is **colourless and odourless**, so it cannot be seen or smelt while it **binds to haemoglobin**.',
  sol: 'Colourless, odourless.', scheme: [['Colourless and odourless', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('vehicle-short', short({
  marks: 2,
  stem: 'Name two pollutants released by vehicles and state one harmful effect of each.',
  model: '1. **Carbon monoxide:** combines with haemoglobin and reduces oxygen supply, causing headache and even death.\n2. **Nitrogen oxides:** irritate the lungs and help form **acid rain** and smog.',
  sol: 'Two pollutants with effects.',
  scheme: [['First pollutant and effect', 1], ['Second pollutant and effect', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 water, thermal and soil pollution
add('detergent-mcq', mcq({
  stem: 'Phosphates from detergents entering a pond lead to',
  right: 'rapid growth of algae, which later die and use up the oxygen in the water', wrong: ['a rise in the temperature of the water', 'the formation of acid rain', 'the thinning of the ozone layer'],
  sol: 'Phosphates are nutrients for algae; their decay uses up oxygen (eutrophication) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('sewage-mcq', mcq({
  stem: 'Untreated sewage flowing into a river harms fish mainly because',
  right: 'bacteria decomposing it use up the dissolved oxygen', wrong: ['it makes the water too hot', 'it contains radioactive substances', 'it turns the water alkaline'],
  sol: 'Decomposers break down the organic matter and consume much of the dissolved oxygen — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('oil-mcq', mcq({
  stem: 'An oil spill at sea kills many sea birds mainly because the oil',
  right: 'coats their feathers, so they cannot fly, float or keep warm', wrong: ['makes the sea water too salty', 'raises the temperature of the sea', 'adds phosphates to the water'],
  sol: 'Oiled feathers lose their waterproofing and insulation — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('thermal-mcq', mcq({
  stem: 'A power plant pours its hot cooling water into a river, and fish downstream begin to die. The main reason is that',
  right: 'warm water holds less dissolved oxygen', wrong: ['warm water contains more salt', 'hot water carries phosphates', 'fish cannot see in warm water'],
  sol: 'Oxygen is less soluble in warm water, while fish need more of it as they become more active — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('mercury-mcq', mcq({
  stem: 'Factory waste containing mercury is especially dangerous when it is dumped into the sea because',
  right: 'mercury collects in fish and passes to the people who eat them', wrong: ['mercury quickly breaks down into harmless salts', 'mercury makes the water too warm for fish', 'mercury adds oxygen to the water'],
  sol: 'Mercury is not broken down and builds up in food chains; it damages the nervous system of people who eat contaminated fish — option (@K).',
  d: 3, c: 'analysis', t: [2, 4],
}));
add('thermal-ar', ar({
  a: 'Thermal pollution can reduce the number of fish in a river.',
  r: 'Power plants use large amounts of water to cool their machines.',
  key: 'd',
  sol: 'Both are true, but using water for cooling does not by itself explain fish deaths; the cause is that the warmed water holds less oxygen — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('oil-ar', ar({
  a: 'An oil spill increases the amount of oxygen in sea water.',
  r: 'A layer of oil on the surface cuts off the exchange of gases between the air and the water.',
  key: 'b',
  sol: 'The assertion is false: the oil layer lowers the oxygen in the water. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('thermal-fill', fill({
  stem: 'Discharge of hot water from power plants into rivers causes ______ pollution.',
  acc: [['thermal']],
  sol: 'Thermal pollution.',
  d: 1, c: 'recall', t: [2],
}));
add('eutroph-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: the excessive growth of algae in a lake fed with nutrients from fertilisers or detergents.',
  model: '**Eutrophication** (algal bloom).',
  sol: 'Eutrophication.', scheme: [['Eutrophication or algal bloom', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('thermal-short', short({
  marks: 2,
  stem: 'What is thermal pollution? State its effect on aquatic life.',
  model: 'Thermal pollution is the **warming of a water body** by hot water released from power plants and factories. Warm water holds **less dissolved oxygen**, so fish and other aquatic animals **suffocate or die**, and their breeding is disturbed.',
  sol: 'Definition; less oxygen.',
  scheme: [['Definition', 1], ['Effect on aquatic life', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('soil-short', short({
  marks: 2,
  stem: 'Name two sources of soil pollution and state one harmful effect of each.',
  model: '1. **Excess chemical fertilisers:** make the soil acidic or salty and kill useful soil organisms.\n2. **Urban waste** such as plastics: does not decay, blocks water and air in the soil and releases harmful chemicals.',
  sol: 'Two sources with effects.',
  scheme: [['First source and effect', 1], ['Second source and effect', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 biomedical waste, radiation and noise
add('bmw-mcq', mcq({
  stem: 'Used syringes and blood-soaked bandages from a clinic should be',
  right: 'collected in separate colour-coded containers and treated, for example by autoclaving or incineration', wrong: ['thrown out with household garbage', 'burnt in an open heap', 'dumped into the nearest drain'],
  sol: 'Biomedical waste can spread infection, so it is segregated at source and treated safely — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('radiation-mcq', mcq({
  stem: 'Long exposure to radiation from radioactive substances can cause',
  right: 'damage to genes and cancer', wrong: ['acid rain', 'algal blooms', 'simple goitre'],
  sol: 'Radiation damages DNA, which can lead to mutations and cancer — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('noise-mcq', mcq({
  stem: 'Which of these is a harmful effect of continuous loud noise?',
  right: 'Loss of hearing, stress and high blood pressure', wrong: ['Rickets', 'Goitre', 'Night blindness'],
  sol: 'Loud noise damages the ear and raises stress and blood pressure — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('noise-chart-mcq', mcq({
  stem: `Study the chart. How many of the places have sound levels above about ${NOISE_LIMIT} dB, the level taken as harmful with long exposure?`,
  right: String(NOISY.length), wrong: ['1', '2', '5'],
  sol: `${NOISY.map((n) => `${n.place} (${n.db})`).join(', ')} are above ${NOISE_LIMIT} dB: ${NOISY.length} places — option (@K).`,
  d: 2, c: 'application', t: [3],
  assets: [noiseFig],
}));
add('bmw-ar', ar({
  a: 'Biomedical waste must be kept separate from ordinary household waste.',
  r: 'Hospitals produce large quantities of waste every day.',
  key: 'd',
  sol: 'Both are true, but the amount is not the reason; it must be separated because it can carry infection and injure people — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('xray-ar', ar({
  a: 'X-ray technicians wear lead aprons while at work.',
  r: 'X-rays are a form of noise pollution.',
  key: 'a',
  sol: 'The assertion is true: lead shields the body from radiation. The reason is false: X-rays are radiation, not noise — option (a).',
  d: 2, c: 'analysis', t: [3],
}));
add('decibel-fill', fill({
  stem: 'The loudness (intensity) of sound is measured in ______.',
  acc: [['decibels', 'decibel', 'dB']],
  sol: 'Decibels (dB).',
  d: 1, c: 'recall', t: [3],
}));
add('bmw-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: waste such as used syringes, dressings and body tissues produced in hospitals and clinics.',
  model: '**Biomedical waste.**',
  sol: 'Biomedical waste.', scheme: [['Biomedical waste', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('reason-sharps', short({
  marks: 1, wl: null,
  stem: 'Give reason: used needles from hospitals are collected in separate puncture-proof containers.',
  model: 'To prevent **injury and the spread of infections** such as hepatitis to cleaners and waste pickers.',
  sol: 'Prevents injury and infection.', scheme: [['Injury and infection prevented', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('noise-short', short({
  marks: 2,
  stem: 'Name two sources of noise pollution and two effects of loud noise on human health.',
  model: 'Sources: **vehicle horns and traffic**; **loudspeakers and firecrackers**. Effects: **loss of hearing**; **stress, sleeplessness and high blood pressure**.',
  sol: 'Two sources; two effects.',
  scheme: [['Two sources', 1], ['Two effects', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 biodegradable and non-biodegradable wastes; DDT
add('bio-mcq', mcq({
  stem: 'Which of these wastes is biodegradable?',
  right: 'Vegetable peels', wrong: ['Polythene bags', 'Glass bottles', 'Aluminium cans'],
  sol: 'Bacteria and fungi decompose vegetable matter; the others are not broken down — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('nonbio-mcq', mcq({
  stem: 'Plastics are called non-biodegradable because',
  right: 'decomposers such as bacteria and fungi cannot break them down', wrong: ['they dissolve quickly in water', 'they are made from plants', 'they burn without smoke'],
  sol: 'Without decomposition, plastics stay in the environment for very long times — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ddt-bird-mcq', mcq({
  stem: 'Study the figure. The fish-eating bird has the highest level of DDT in the food chain because',
  right: 'DDT is not broken down and builds up at each step of the food chain', wrong: ['birds drink more lake water than fish', 'DDT is made inside the body of the bird', 'birds are sprayed directly with DDT'],
  sol: 'Each animal eats many from the level below and stores their DDT, so it is concentrated upwards — option (@K).',
  d: 2, c: 'understanding', t: [4],
  assets: [ddtFig],
}));
add('ddt-num', num({
  stem: `Using the figure, how many times higher is the DDT level in the fish-eating bird (${DDT[4].ppm} ppm) than in the lake water (${DDT[0].ppm} ppm)?`,
  value: DDT_BIRD_WATER,
  sol: `$${DDT[4].ppm} \\div ${DDT[0].ppm} = ${DDT_BIRD_WATER}$, about ${dd(DDT_BIRD_WATER)} times (ten lakh).`,
  scheme: [[`${dd(DDT_BIRD_WATER)}`, 1]],
  d: 3, c: 'application', t: [4],
  assets: [ddtFig],
}), (q) => q.answer.value === 1000000 || 'value');
add('ddt-ar', ar({
  a: 'DDT harms fish-eating birds more than the plankton in the same lake.',
  r: 'DDT is a non-biodegradable pesticide that becomes more concentrated at each level of a food chain.',
  key: 'c',
  sol: 'Both are true, and biomagnification of the persistent DDT is why the top consumers carry the most — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('biomag-term', short({
  marks: 1, wl: null,
  stem: 'Give the term: the increase in the concentration of a non-biodegradable chemical at each level of a food chain.',
  model: '**Biological magnification** (biomagnification).',
  sol: 'Biomagnification.', scheme: [['Biomagnification', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('odd-waste', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Fruit peels, Paper, Cow dung, Plastic bottle.',
  model: '**Plastic bottle**; the others are **biodegradable wastes**.',
  sol: 'Plastic is non-biodegradable.', scheme: [['Odd one and category', 1]],
  d: 1, c: 'analysis', t: [4],
}));
add('reason-ddt', short({
  marks: 1, wl: null,
  stem: 'Give reason: DDT sprayed in small amounts on fields can still harm eagles and other birds of prey.',
  model: 'DDT is **not broken down**; it becomes **more concentrated at each step** of the food chain (biomagnification), so top predators get the highest dose.',
  sol: 'Biomagnification.', scheme: [['Persistent and magnified up the chain', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('bio-nonbio-short', short({
  marks: 2,
  stem: 'Distinguish between biodegradable and non-biodegradable wastes, giving one example of each.',
  model: '**Biodegradable** wastes are broken down by **bacteria and fungi** into harmless substances, for example **vegetable peels**. **Non-biodegradable** wastes are **not broken down** by decomposers and remain for a long time, for example **polythene bags**.',
  sol: 'Decomposition; examples.',
  scheme: [['Difference', 1], ['One example each', 1]],
  d: 1, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 greenhouse effect, acid rain, ozone depletion
add('greenhouse-mcq', mcq({
  stem: 'Which gas released by burning coal, petrol and wood adds most to the greenhouse effect?',
  right: 'Carbon dioxide', wrong: ['Oxygen', 'Nitrogen', 'Argon'],
  sol: 'Carbon dioxide from burning fuels traps heat radiated by the Earth — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('acidrain-mcq', mcq({
  stem: 'Acid rain is caused mainly by',
  right: 'sulphur dioxide and nitrogen oxides dissolving in rain water', wrong: ['carbon monoxide combining with haemoglobin', 'CFCs breaking down ozone', 'phosphates from detergents'],
  sol: 'These gases form sulphuric and nitric acids in the clouds — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('cfc-mcq', mcq({
  stem: 'Which of these can release chemicals that deplete the ozone layer?',
  right: 'Old refrigerators and air conditioners that use CFCs', wrong: ['Solar water heaters', 'Bicycles', 'Compost pits'],
  sol: 'CFCs leaking from old cooling machines and sprays rise to the stratosphere and destroy ozone — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('marble-mcq', mcq({
  stem: 'Over many years, the marble of an old monument near an oil refinery turned yellowish and pitted. The most likely cause is',
  right: 'acid rain formed from sulphur dioxide released by the refinery', wrong: ['depletion of the ozone layer', 'noise from traffic', 'thermal pollution of a nearby river'],
  sol: 'Sulphur dioxide forms acid rain, which reacts with the calcium carbonate of marble — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ph-num', num({
  stem: `Normal rain has a pH of about ${RAIN.normal}. A sample of acid rain has a pH of ${RAIN.acid}. Each drop of one pH unit makes a liquid ten times more acidic. How many times more acidic is the sample?`,
  value: RAIN.times,
  sol: `The pH falls from ${RAIN.normal} to ${RAIN.acid}, which is one unit; one unit lower = ${RAIN.times} times more acidic.`,
  scheme: [[`${RAIN.times} times`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 10 || 'value');
add('greenhouse-ar', ar({
  a: 'Without any greenhouse gases, the Earth would be much colder than it is.',
  r: 'Greenhouse gases trap part of the heat given off by the Earth.',
  key: 'c',
  sol: 'Both are true, and the trapping of heat by these gases is what keeps the Earth warm enough for life — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('uv-ar', ar({
  a: 'Depletion of the ozone layer increases the number of cases of skin cancer.',
  r: 'Depletion of the ozone layer makes rain acidic.',
  key: 'a',
  sol: 'The assertion is true: more UV-B reaches the ground. The reason is false: acid rain comes from sulphur and nitrogen oxides — option (a).',
  d: 2, c: 'analysis', t: [5],
}));
add('cfc-fill', fill({
  stem: 'Chlorofluorocarbons, or ______, once used in refrigerators and sprays, deplete the ozone layer.',
  acc: [['CFCs', 'CFC']],
  sol: 'CFCs.',
  d: 1, c: 'recall', t: [5],
}));
add('odd-greenhouse', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Carbon dioxide, Methane, Nitrous oxide, Oxygen.',
  model: '**Oxygen**; the others are **greenhouse gases**.',
  sol: 'Oxygen does not trap heat significantly.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('reason-acid', short({
  marks: 1, wl: null,
  stem: 'Give reason: fish disappear from lakes downwind of coal-burning power plants.',
  model: 'Sulphur dioxide from the plants forms **acid rain**, which makes the **lake water acidic**, killing fish and their eggs.',
  sol: 'Acid rain acidifies lakes.', scheme: [['Acid rain makes lakes acidic', 1]],
  d: 3, c: 'application', t: [5],
}));
add('acidrain-short', short({
  marks: 3,
  stem: 'Explain how acid rain is formed and state two of its harmful effects.',
  model: 'Burning coal and petrol releases **sulphur dioxide and nitrogen oxides**. In the clouds these dissolve in water droplets to form **sulphuric acid and nitric acid**, which fall as acid rain. Effects: it makes **lakes acidic**, killing fish, and it **damages trees** and **corrodes marble** buildings.',
  sol: 'Formation; two effects.',
  scheme: [['Gases released', 1], ['Acids formed in clouds', 1], ['Two effects', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('greenhouse-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a labelled diagram to show the greenhouse effect.',
  model: 'The Sun with arrows of **sunlight** passing through a layer of **greenhouse gases** to the Earth; arrows of **heat (infrared)** going up from the Earth, most **reflected back** by the gas layer and a few **escaping** to space.',
  sol: 'Labelled diagram.',
  scheme: [['Sunlight reaching the Earth through the gas layer', 1], ['Heat trapped and sent back', 1], ['Labels', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 control measures; Swachh Bharat Abhiyan
add('cng-mcq', mcq({
  stem: 'Public buses in Delhi were switched to CNG mainly because',
  right: 'CNG burns more cleanly, giving out far less smoke and sulphur dioxide than diesel', wrong: ['CNG gives buses a higher top speed', 'CNG engines need no fuel', 'CNG removes carbon dioxide from the air'],
  sol: 'Compressed natural gas burns almost completely and has little sulphur — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('bs-mcq', mcq({
  stem: 'Bharat Stage emission norms are',
  right: 'standards set by the Government of India that limit the pollutants a vehicle may release', wrong: ['rules for disposing of hospital waste', 'limits on noise from loudspeakers', 'standards for drinking water'],
  sol: 'BS norms limit exhaust pollutants such as carbon monoxide, nitrogen oxides and particles — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('swachh-mcq', mcq({
  stem: 'The Swachh Bharat Abhiyan, launched by the Government of India in October 2014, aims mainly to',
  right: 'make India clean, end open defecation and improve the handling of solid waste', wrong: ['build new highways', 'ban all private vehicles', 'increase the number of factories'],
  sol: 'The mission focuses on toilets, cleanliness and waste management — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('plastic-ar', ar({
  a: 'Plastic bags can safely be thrown into rivers because they float away.',
  r: 'Plastic bags are non-biodegradable.',
  key: 'b',
  sol: 'The assertion is false: plastics choke animals and block drains wherever they go. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [6, 4],
}));
add('sewage-fill', fill({
  stem: 'Before it is released into a river, sewage should be cleaned in a sewage ______ plant.',
  acc: [['treatment']],
  sol: 'Sewage treatment plant.',
  d: 1, c: 'recall', t: [6],
}));
add('odd-control', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Social forestry, Use of CNG, Sewage treatment, Open burning of garbage.',
  model: '**Open burning of garbage**; the others are **measures to control pollution**.',
  sol: 'Open burning causes pollution.', scheme: [['Odd one and category', 1]],
  d: 1, c: 'analysis', t: [6],
}));
add('reason-idle', short({
  marks: 1, wl: null,
  stem: 'Give reason: drivers are advised to switch off their engines at long red lights.',
  model: 'An idling engine **burns fuel and releases exhaust** without moving; switching off **saves fuel and reduces air pollution**.',
  sol: 'Saves fuel; less exhaust.', scheme: [['Less fuel burnt and less exhaust', 1]],
  d: 2, c: 'understanding', t: [6],
}));
add('swachh-short', short({
  marks: 2,
  stem: 'State two aims of the Swachh Bharat Abhiyan.',
  model: '1. To **end open defecation** by building and using toilets in homes, schools and public places.\n2. To keep streets and public places clean through **scientific collection and disposal of solid waste**, and to change people\'s habits about cleanliness.',
  sol: 'Two aims.',
  scheme: [['First aim', 1], ['Second aim', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('control-short', short({
  marks: 3,
  stem: 'Suggest three measures to reduce air pollution in a crowded city, and say how each helps.',
  model: '1. Run buses and autos on **CNG** and enforce **Bharat Stage** norms: vehicles give out less smoke and gas.\n2. **Switch off engines** at long red lights and use public transport: less fuel is burnt.\n3. Plant trees by **social forestry**: trees absorb carbon dioxide and trap dust.',
  sol: 'Three measures with reasons.',
  scheme: [['First measure', 1], ['Second measure', 1], ['Third measure', 1]],
  d: 2, c: 'application', t: [6],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('effects-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [ozone, ultraviolet, carbon dioxide, global warming, sulphur dioxide, acid rain, CFCs, decibel]\n\nBurning fossil fuels adds (a) ______ to the air, which traps heat and causes (b) ______. Factories that burn coal also release (c) ______, which dissolves in rain water to form (d) ______. High in the stratosphere, (e) ______ leaking from old refrigerators destroy the ozone layer.',
  acc: [['carbon dioxide'], ['global warming'], ['sulphur dioxide'], ['acid rain'], ['CFCs', 'CFC']],
  sol: '(a) carbon dioxide; (b) global warming; (c) sulphur dioxide; (d) acid rain; (e) CFCs.',
  d: 2, c: 'understanding', t: [5],
}));
add('water-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [sewage, detergents, oil, thermal, eutrophication, oxygen, mercury, pesticides]\n\nPhosphates from (a) ______ and nitrates from fertilisers make algae grow rapidly; this is called (b) ______. When the algae die, bacteria use up the dissolved (c) ______ and fish die. Hot water from power plants causes (d) ______ pollution, while a spill of (e) ______ at sea coats the feathers of birds.',
  acc: [['detergents', 'detergent'], ['eutrophication'], ['oxygen'], ['thermal'], ['oil']],
  sol: '(a) detergents; (b) eutrophication; (c) oxygen; (d) thermal; (e) oil.',
  d: 2, c: 'understanding', t: [2],
}));
add('town-match5', match({
  marks: 5,
  stem: 'Study the figure of a town beside a river and match each lettered source with the pollutant or effect it causes.',
  pairs: [
    ['A', 'Releases carbon monoxide, which combines with haemoglobin'],
    ['B', 'Warms the river, lowering its dissolved oxygen'],
    ['C', 'Adds organic matter and disease germs to the river'],
    ['D', 'Releases smoke, soot and poisonous gases into the air'],
    ['E', 'Adds nitrates and phosphates that cause algal bloom'],
  ],
  order: [3, 1, 4, 0, 2],
  sol: 'A vehicle exhaust; B hot water from the power plant; C untreated sewage; D burning garbage; E fertiliser run-off.',
  d: 3, c: 'application', t: [1, 2],
  assets: [townFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('ddt-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: `A lake near farmland was found to contain traces of DDT washed in from sprayed fields. Scientists measured the DDT in living things of the lake (imagined values, in parts per million): ${DDT.map((d) => `${d.level.toLowerCase()} ${d.ppm}`).join('; ')}. Fish-eating birds nesting by the lake were laying eggs with thin shells that broke easily.`,
  d: 4, c: 'analysis',
  assets: [ddtFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Give the term for the rise in DDT concentration along the food chain.', model: '**Biological magnification** (biomagnification).', sol: 'Biomagnification.', scheme: [['Biomagnification', 1]], d: 1, c: 'recall', t: [4] })),
    part('b', num({ marks: 2, stem: 'How many times more concentrated is DDT in the bird than in the small fish?', value: DDT_BIRD_SMALLFISH, sol: `$${DDT[4].ppm} \\div ${DDT[2].ppm} = ${DDT_BIRD_SMALLFISH}$ times.`, scheme: [['Correct values chosen', 1], [`${DDT_BIRD_SMALLFISH} times`, 1]], d: 2, c: 'application', t: [4] })),
    part('c', short({ marks: 3, stem: 'Explain why the level of DDT rises at each step of the food chain.', model: 'DDT is **non-biodegradable**: it is **not broken down** by decomposers or by the body, and it is **not excreted**, so it is **stored in body fat**. Each animal eats **many organisms** from the level below, collecting all their DDT. So the concentration **increases at every step**, and the top consumer has the most.', sol: 'Persistent, stored, many eaten.', scheme: [['Not broken down or excreted; stored in fat', 1], ['Each animal eats many from the level below', 1], ['Concentration rises at each step', 1]], d: 4, c: 'analysis', t: [4] })),
    part('d', short({ marks: 2, stem: 'How could DDT reduce the number of fish-eating birds around the lake?', model: 'DDT in the birds causes **thin eggshells** that **break** during nesting, so fewer chicks hatch. Over the years **fewer young** replace the old birds and the population **falls**.', sol: 'Thin eggshells, fewer chicks.', scheme: [['Thin eggshells break', 1], ['Fewer young, population falls', 1]], d: 3, c: 'application', t: [4] })),
    part('e', short({ marks: 2, stem: 'Suggest two ways in which farmers can control pests without causing this problem.', model: '1. Use **biological control**, such as encouraging birds, frogs and ladybirds that eat pests.\n2. Practise **organic farming** with **biodegradable** pesticides such as neem extracts, and use the least amount needed.', sol: 'Biological control; biodegradable pesticides.', scheme: [['First way', 1], ['Second way', 1]], d: 2, c: 'application', t: [4, 6] }), [
      short({ marks: 2, stem: 'Why are plankton and small fish not harmed as badly as the birds, although they live in the same lake?', model: 'They are at the **lower levels** of the food chain, so they collect **much less DDT**. The birds, at the **top**, eat many fish and build up the **highest concentration**.', sol: 'Lower levels collect less.', scheme: [['Lower levels: less DDT', 1], ['Top consumers: highest concentration', 1]], d: 3, c: 'analysis', t: [4] }),
    ]),
  ],
}));
add('river-case', mk.case({
  passage: `A river flows past a power plant and then past a town. Students tested the water at two points:\n\n| Place | Temperature | Dissolved oxygen (mg per litre) |\n|---|---|---|\n| Above the power plant | ${DO.cool.t} °C | ${DO.cool.mg} |\n| Just below the plant's outlet | ${DO.warm.t} °C | ${DO.warm.mg} |\n\nFurther downstream, where the town's drains enter, the water was dark and smelly and dead fish were floating.`,
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the type of pollution caused by the power plant.', model: '**Thermal pollution.**', sol: 'Thermal pollution.', scheme: [['Thermal pollution', 1]], d: 1, c: 'application', t: [2] })),
    part('b', num({ marks: 2, stem: 'By what percentage did the dissolved oxygen fall below the outlet (to one decimal place)?', value: DO.pctFall, tol: 0.1, unit: '%', sol: `Fall: ${DO.cool.mg} − ${DO.warm.mg} gives ${DO.fall} mg per litre. Percentage fall: $\\dfrac{${DO.fall}}{${DO.cool.mg}} \\times 100 \\approx ${DO.pctFall}$ per cent.`, scheme: [[`Fall of ${DO.fall} mg per litre`, 1], [`${DO.pctFall} per cent`, 1]], d: 3, c: 'application', t: [2] })),
    part('c', short({ marks: 2, stem: 'Why is the warm water below the outlet harmful to fish?', model: 'Warm water holds **less dissolved oxygen**, while fish in warm water become **more active** and need **more oxygen**. They may **suffocate**, and their eggs may fail to develop.', sol: 'Less oxygen, more demand.', scheme: [['Less dissolved oxygen', 1], ['Fish need more, may suffocate', 1]], d: 2, c: 'understanding', t: [2] })),
    part('d', short({ marks: 2, stem: 'Explain why the water near the town\'s drains was dark and smelly, with dead fish.', model: 'Untreated **sewage** from the drains adds **organic matter**. **Bacteria** decomposing it use up the **dissolved oxygen**, so fish die, and decay without oxygen releases **foul-smelling gases**.', sol: 'Sewage decay uses oxygen.', scheme: [['Sewage decomposed by bacteria', 1], ['Oxygen used up; fish die; smell', 1]], d: 3, c: 'analysis', t: [2] })),
    part('e', short({ marks: 3, stem: 'Suggest three measures to protect this river.', model: '1. The power plant should **cool its water** in cooling towers or ponds before release.\n2. The town should build a **sewage treatment plant** so that only treated water enters the river.\n3. **Ban dumping** of garbage and factory waste into the river, and plant trees along its banks.', sol: 'Three measures.', scheme: [['Cooling before release', 1], ['Sewage treatment', 1], ['Third measure', 1]], d: 2, c: 'application', t: [6] })),
  ],
}));
add('canteen-case', mk.case({
  passage: `The eco-club of a school weighed the waste from its canteen on one day:\n\n| Waste | Mass (kg) |\n|---|---|\n| Food scraps | ${CANTEEN.food} |\n| Paper plates and napkins | ${CANTEEN.paper} |\n| Plastic wrappers | ${CANTEEN.plastic} |\n| Glass bottles | ${CANTEEN.glass} |\n| Metal cans | ${CANTEEN.cans} |`,
  d: 3, c: 'application',
  children: [
    part('a', num({ marks: 2, stem: 'What percentage of the waste by mass is biodegradable?', value: CANTEEN.pctBio, unit: '%', sol: `Biodegradable $= ${CANTEEN.food} + ${CANTEEN.paper} = ${CANTEEN.bio}$ kg of ${CANTEEN.total} kg; $\\dfrac{${CANTEEN.bio}}{${CANTEEN.total}} \\times 100 = ${CANTEEN.pctBio}$ per cent.`, scheme: [['Biodegradable mass found', 1], [`${CANTEEN.pctBio} per cent`, 1]], d: 2, c: 'application', t: [4] })),
    part('b', short({ marks: 1, wl: null, stem: 'Name two items in the table that are non-biodegradable.', model: '**Plastic wrappers** and **glass bottles** (also metal cans).', sol: 'Plastic; glass or metal.', scheme: [['Two non-biodegradable items', 1]], d: 1, c: 'application', t: [4] })),
    part('c', short({ marks: 2, stem: 'How can the school dispose of its biodegradable waste usefully?', model: 'It can put the food scraps and paper in a **compost pit**, where **decomposers** turn them into **manure** for the school garden, instead of sending them to a landfill.', sol: 'Composting.', scheme: [['Composting', 1], ['Manure from decomposers', 1]], d: 2, c: 'application', t: [4, 6] })),
    part('d', short({ marks: 2, stem: 'Why are the plastic wrappers harmful if they are thrown on open land?', model: 'Plastics are **non-biodegradable** and stay for many years. They **block drains**, stop water and air entering the **soil**, and are **swallowed by cattle** and other animals, which may die.', sol: 'Persistent; block soil and drains; harm animals.', scheme: [['Persist for years', 1], ['Harm to soil, drains or animals', 1]], d: 2, c: 'understanding', t: [4] })),
    part('e', short({ marks: 3, stem: 'Suggest three steps the eco-club could take, in the spirit of the Swachh Bharat Abhiyan, to reduce the canteen\'s waste.', model: '1. Keep **separate bins** for wet (biodegradable) and dry (non-biodegradable) waste.\n2. **Reduce** plastic by using steel plates and refillable water bottles.\n3. Send glass, metal and clean plastic for **recycling**, and run a **cleanliness drive** to spread awareness.', sol: 'Segregate, reduce, recycle.', scheme: [['Segregation', 1], ['Reduce plastic', 1], ['Recycling or awareness', 1]], d: 2, c: 'application', t: [6] }), [
      short({ marks: 3, stem: 'State three aims of the Swachh Bharat Abhiyan that relate to waste and cleanliness.', model: '1. Keep streets, schools and public places **clean**.\n2. Ensure **scientific collection, segregation and disposal** of solid waste.\n3. Change people\'s **habits** so that they do not litter and they use toilets, ending **open defecation**.', sol: 'Three aims.', scheme: [['First aim', 1], ['Second aim', 1], ['Third aim', 1]], d: 1, c: 'recall', t: [6] }),
    ]),
  ],
}));
add('smog-case', mk.case({
  passage: `On winter mornings a city lies under a grey haze. Heavy traffic crawls through it, brick kilns burn on the outskirts, and heaps of garbage are often set on fire. A doctor reports more patients with coughs and asthma. The city council plans to act. A study shows that if each car stopped idling at ${IDLE.signals} long red lights a day, each lasting about ${IDLE.minutesEach} minutes, it would save ${IDLE.mlPerMinute} mL of fuel for every minute of idling.`,
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the gas in vehicle exhaust that combines with haemoglobin.', model: '**Carbon monoxide.**', sol: 'Carbon monoxide.', scheme: [['Carbon monoxide', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', short({ marks: 2, stem: 'Name the pollutant that forms most of the haze, and explain why it causes coughs and asthma.', model: '**Particulate matter** (fine soot and dust particles). These tiny particles are breathed **deep into the lungs**, where they **irritate** and inflame the air passages, causing coughing and attacks of **asthma**.', sol: 'Particulate matter irritates lungs.', scheme: [['Particulate matter', 1], ['Irritates the airways and lungs', 1]], d: 2, c: 'understanding', t: [1] })),
    part('c', num({ marks: 2, stem: 'How much fuel would one car save in a day by switching off at the red lights (in mL)?', value: IDLE.saved, unit: 'mL', sol: `$${IDLE.signals} \\times ${IDLE.minutesEach} \\times ${IDLE.mlPerMinute} = ${IDLE.saved}$ mL.`, scheme: [['Total idling minutes', 1], [`${IDLE.saved} mL`, 1]], d: 2, c: 'application', t: [6] })),
    part('d', short({ marks: 3, stem: 'Suggest three measures the council could take to clean the air, and say how each helps.', model: '1. Run buses and autos on **CNG** and allow only vehicles that meet the latest **Bharat Stage** norms: less smoke and gas.\n2. **Ban open burning** of garbage and move the brick kilns to **cleaner technology**: less soot.\n3. Plant trees through **social forestry** along roads: trees trap dust and absorb gases.', sol: 'Three measures.', scheme: [['First measure', 1], ['Second measure', 1], ['Third measure', 1]], d: 2, c: 'application', t: [6] })),
    part('e', short({ marks: 2, stem: 'The kilns burn coal. How could their smoke harm forests and buildings far away?', model: 'Coal smoke contains **sulphur dioxide**, which dissolves in rain water to form **sulphuric acid**. This **acid rain** can fall far from the city, **damaging trees** and **corroding marble** and limestone buildings.', sol: 'Sulphur dioxide forms acid rain.', scheme: [['Sulphur dioxide forms acid rain', 1], ['Damage to trees and buildings', 1]], d: 3, c: 'analysis', t: [5] })),
  ],
}));
add('townfig-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'The figure shows a town beside a river with five sources of pollution lettered A to E.',
  d: 3, c: 'analysis',
  assets: [townFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which letter shows a source of thermal pollution?', model: '**B** (hot water from the power plant).', sol: 'B.', scheme: [['B', 1]], d: 1, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'State two effects of the waste from C on the river and on people.', model: '1. Its **organic matter** is decomposed by bacteria that use up **dissolved oxygen**, so fish die.\n2. It carries **germs** that spread **water-borne diseases** such as cholera and typhoid among people who use the water.', sol: 'Oxygen used up; disease.', scheme: [['Effect on the river', 1], ['Effect on people', 1]], d: 2, c: 'understanding', t: [2] })),
    part('c', short({ marks: 2, stem: 'Explain why green patches appear in the river near E.', model: 'Rain washes **fertilisers** from the fields into the river. Their **nitrates and phosphates** act as nutrients, so **algae grow rapidly** and form green patches: **eutrophication** (algal bloom).', sol: 'Fertiliser nutrients: algal bloom.', scheme: [['Fertiliser nutrients washed in', 1], ['Algae grow rapidly (eutrophication)', 1]], d: 2, c: 'application', t: [2] })),
    part('d', short({ marks: 2, stem: 'Why is the activity at D harmful?', model: 'Burning garbage, especially **plastics**, releases **smoke, soot and poisonous gases** into the air. These cause **breathing problems** and some gases can cause **cancer**.', sol: 'Smoke and toxic gases.', scheme: [['Smoke and toxic gases', 1], ['Harm to health', 1]], d: 2, c: 'understanding', t: [1] })),
    part('e', short({ marks: 3, stem: 'Suggest one control measure each for the sources A, C and D.', model: '**A:** use **CNG** or vehicles that meet **Bharat Stage** norms, and switch off engines at red lights.\n**C:** treat the sewage in a **sewage treatment plant** before it enters the river.\n**D:** **segregate** waste, **compost** the biodegradable part and send the rest for recycling instead of burning it.', sol: 'One measure for each.', scheme: [['A', 1], ['C', 1], ['D', 1]], d: 3, c: 'application', t: [6] }), [
      short({ marks: 3, stem: 'Classify the five sources as causing mainly air pollution or mainly water pollution, and name the one that also harms soil.', model: '**Air pollution:** A (vehicle exhaust) and D (burning garbage). **Water pollution:** B (hot water), C (sewage) and E (fertiliser run-off). **E** also harms **soil**, since excess fertiliser changes its chemistry and kills soil organisms.', sol: 'Air: A, D; water: B, C, E; soil: E.', scheme: [['Air sources', 1], ['Water sources', 1], ['E harms soil', 1]], d: 3, c: 'analysis', t: [1, 2] }),
    ]),
  ],
}));
add('ozone-case', mk.case({
  stem: 'Study the figure and answer the questions.',
  passage: 'In the 1980s scientists found that the ozone layer over Antarctica had become very thin each spring, forming an "ozone hole". The main cause was CFCs from refrigerators, air conditioners and spray cans. Under an international agreement, the Montreal Protocol of 1987, countries agreed to phase out CFCs, and the ozone layer has since begun to recover slowly.',
  d: 3, c: 'analysis',
  assets: [ozoneFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'In which layer of the atmosphere is the ozone layer found?', model: 'The **stratosphere.**', sol: 'Stratosphere.', scheme: [['Stratosphere', 1]], d: 1, c: 'recall', t: [5] })),
    part('b', short({ marks: 2, stem: 'How do CFCs released on the ground damage the ozone layer?', model: 'CFCs are very stable, so they **rise slowly** to the stratosphere. There **ultraviolet light** breaks them down, releasing **chlorine**, which **breaks down ozone** molecules; one chlorine atom can destroy many.', sol: 'Chlorine from CFCs destroys ozone.', scheme: [['CFCs reach the stratosphere', 1], ['Chlorine released destroys ozone', 1]], d: 3, c: 'understanding', t: [5] })),
    part('c', short({ marks: 2, stem: 'State two effects on living things of more ultraviolet rays reaching the ground.', model: '1. More cases of **skin cancer** and **cataract** (clouding of the eye lens) in humans.\n2. **Damage to crops** and to **plankton** in the sea, which harms food chains.', sol: 'Two effects.', scheme: [['First effect', 1], ['Second effect', 1]], d: 2, c: 'understanding', t: [5] })),
    part('d', short({ marks: 2, stem: 'Why did the problem need an agreement among many countries, not action by one country alone?', model: 'CFCs released **anywhere** spread through the **whole atmosphere**, and the ozone layer protects the **whole Earth**. Only if **all countries** stopped using CFCs could the damage be halted.', sol: 'Global problem.', scheme: [['Pollutants spread worldwide', 1], ['All countries must act', 1]], d: 3, c: 'analysis', t: [5, 6] })),
    part('e', short({ marks: 3, stem: 'Give three differences between ozone depletion and the greenhouse effect.', model: '1. **Cause:** ozone depletion is caused mainly by **CFCs**; the greenhouse effect is increased mainly by **carbon dioxide** and methane.\n2. **Place:** ozone depletion happens in the **stratosphere**; heat is trapped in the **lower atmosphere**.\n3. **Effect:** ozone depletion lets in more **UV rays** (skin cancer); the greenhouse effect causes **global warming**.', sol: 'Cause, place, effect.', scheme: [['Cause', 1], ['Place', 1], ['Effect', 1]], d: 3, c: 'analysis', t: [5] })),
  ],
}));
