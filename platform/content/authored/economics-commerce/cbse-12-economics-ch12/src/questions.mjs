// CBSE 12 Economics, ch12 Environment and Sustainable Development — question bank. Every scenario,
// table and passage is written by SOYL (imagined towns, villages, firms and figures, labelled as such);
// no NCERT exercise or board/sample-paper item is reused. Real-world facts are limited to stable,
// commonly taught ones (the four functions of the environment; Montreal Protocol 1987, Kyoto Protocol
// 1997, Paris Agreement 2015 stated broadly; the Brundtland Commission's idea of sustainable development,
// paraphrased; Herman Daly's principles, paraphrased). No Indian environmental statistics are stated.
// Every computed figure is derived here, never typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// Forest: regrowth vs felling (tonnes of timber a year).
export const FOREST = { stock: 48000, regrow: 2000, fell: 2600 };
export const FOREST_LOSS = FOREST.fell - FOREST.regrow; // 600
export const FOREST_YEARS = FOREST.stock / FOREST_LOSS; // 80
// Groundwater: recharge vs pumping (million litres a year).
export const WATER = { recharge: 120, pumped: 150 };
export const WATER_OVER = WATER.pumped - WATER.recharge; // 30
export const WATER_PCT = pct(WATER_OVER, WATER.recharge); // 25
// Pasture carrying capacity (cattle).
export const PASTURE = { capacity: 120, kept: 150 };
export const PASTURE_EXCESS = PASTURE.kept - PASTURE.capacity; // 30
export const PASTURE_PCT = pct(PASTURE_EXCESS, PASTURE.capacity); // 25
// Biogas: firewood saved by one household (kg).
export const BIOGAS = { perDay: 6, days: 365 };
export const BIOGAS_SAVED = BIOGAS.perDay * BIOGAS.days; // 2,190
// Solar panels at a school.
export const SOLAR = { kwhPerDay: 20, days: 300, tariff: 8, cost: 240000 };
export const SOLAR_SAVING = SOLAR.kwhPerDay * SOLAR.days * SOLAR.tariff; // 48,000
export const SOLAR_PAYBACK = SOLAR.cost / SOLAR_SAVING; // 5
// Opportunity cost of polluted air for one household (₹ a year).
export const AIR = { medicine: 4500, daysLost: 6, wage: 500 };
export const AIR_WAGES = AIR.daysLost * AIR.wage; // 3,000
export const AIR_TOTAL = AIR.medicine + AIR_WAGES; // 7,500
// Case: lake Neelsar (tonnes of waste a year).
export const LAKE = { capacity: 40, a: 20, b: 16, c: 14 };
export const LAKE_TOTAL = LAKE.a + LAKE.b + LAKE.c; // 50
export const LAKE_EXCESS = LAKE_TOTAL - LAKE.capacity; // 10
export const LAKE_CUT = pct(LAKE_EXCESS, LAKE_TOTAL); // 20
// Case: Kesarpur energy switch (households).
export const KES = { households: 400, biogas: 140, lpg: 120 };
export const KES_SWITCHED = KES.biogas + KES.lpg; // 260
export const KES_PCT = pct(KES_SWITCHED, KES.households); // 65
// Case: fishing quota (tonnes a year).
export const FISH = { regen: 900, catchNow: 1200 };
export const FISH_CUT = FISH.catchNow - FISH.regen; // 300
export const FISH_CUT_PCT = pct(FISH_CUT, FISH.catchNow); // 25

const expect = [
  [FOREST_LOSS, 600], [FOREST_YEARS, 80], [WATER_OVER, 30], [WATER_PCT, 25], [PASTURE_EXCESS, 30], [PASTURE_PCT, 25],
  [BIOGAS_SAVED, 2190], [SOLAR_SAVING, 48000], [SOLAR_PAYBACK, 5], [AIR_WAGES, 3000], [AIR_TOTAL, 7500],
  [LAKE_TOTAL, 50], [LAKE_EXCESS, 10], [LAKE_CUT, 20], [KES_SWITCHED, 260], [KES_PCT, 65], [FISH_CUT, 300], [FISH_CUT_PCT, 25],
];
expect.forEach(([v, e], i) => { if (v !== e) throw new Error(`ch12 figure ${i}: ${v} != ${e}`); });

// ================================================================ t01 Environment, functions, crisis, India, global issues
Q('m_env_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In economics, the environment is best described as',
  opts: [
    'the total planetary inheritance: all biotic and abiotic resources taken together',
    'only the forests and wild animals of a country',
    'the buildings, roads and machines made by people',
    'the climate of a region in a particular season',
  ],
  sol: 'The environment covers all living (biotic) and non-living (abiotic) elements and resources. Forests alone are only a part of it; buildings and machines are man-made capital; climate is one aspect of it.',
}));
Q('m_abiotic', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which of the following is an **abiotic** element of the environment?',
  opts: ['Sunlight', 'Earthworms in a field', 'Mangrove trees', 'Bacteria in the soil'],
  sol: 'Sunlight is non-living, so it is abiotic. Earthworms, mangroves and soil bacteria are living organisms, so they are biotic elements.',
}));
Q('m_function_assim', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A river carries away and breaks down the treated waste water of an imagined town. Which function of the environment is the river performing?',
  opts: ['Assimilating waste', 'Supplying renewable resources', 'Providing aesthetic services', 'Sustaining genetic diversity'],
  sol: 'Absorbing and breaking down waste is the assimilation function. Supplying resources would be giving water for use; aesthetic services are scenery and enjoyment; genetic diversity refers to the variety of life the environment sustains.',
}));
Q('m_function_aesthetic', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Tourists travel to an imagined hill station only to enjoy its waterfalls and views. Which function of the environment do they use?',
  opts: ['Aesthetic services', 'Assimilation of waste', 'Supply of non-renewable resources', 'Sustaining life through biodiversity'],
  sol: 'Enjoying scenery is an aesthetic service. Nothing is being extracted, no waste is being absorbed, and the visit is not about the variety of species that sustains life.',
}));
Q('m_absorptive', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The **absorptive capacity** of the environment means its ability to',
  opts: [
    'absorb degradation, such as pollution, without lasting harm',
    'supply an unlimited amount of minerals',
    'support any number of people at any level of consumption',
    'produce goods in factories',
  ],
  sol: 'Absorptive capacity is the ability to take in degradation (waste, pollution) and neutralise it. The other options describe unlimited supply, an unlimited population, and production, none of which is this concept.',
}));
Q('m_carrying', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined coastal district catches fish faster than the stock can breed and dumps more sewage than the sea can break down. What does this show?',
  opts: [
    'The environment\'s carrying capacity is being exceeded',
    'The district is using only renewable resources, so there is no problem',
    'The environment is performing all its functions well',
    'Fish are a non-renewable resource',
  ],
  sol: 'Carrying capacity needs two conditions: extraction below regeneration, and waste within absorptive capacity. Both are broken here. Fish are renewable, but a renewable resource can still be exhausted if it is used faster than it regenerates.',
}));
Q('m_nonrenew', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which of the following is a **non-renewable** resource?',
  opts: ['Coal', 'Timber from a managed plantation', 'Fish in a river', 'Solar energy'],
  sol: 'Coal takes millions of years to form, so once used it is gone for practical purposes. Timber and fish regenerate if harvested carefully; solar energy is continuously available.',
}));
Q('m_crisis', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Why is today\'s environmental problem described as a **reversal of supply and demand**?',
  opts: [
    'Earlier, environmental resources were plentiful and demand was low; now demand for resources and waste-absorbing services exceeds what the environment can supply',
    'Earlier, demand for environmental resources was higher than supply; now supply is far greater',
    'The price of every natural resource has fallen sharply',
    'Industries have stopped using natural resources altogether',
  ],
  sol: 'Population growth, industrialisation and rising consumption have raised the demand for resources and for waste absorption above what the environment can supply. The second option reverses this; prices have not all fallen; industry still depends on natural resources.',
}));
Q('m_land_degr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which one of the following is **NOT** a cause of land degradation?',
  opts: [
    'Planting trees on bare slopes',
    'Overgrazing of pastures',
    'Excessive use of chemical fertilisers and pesticides',
    'Poor irrigation management leading to waterlogging and salinity',
  ],
  sol: 'Planting trees protects soil from erosion, so it reduces degradation. Overgrazing, overuse of agrochemicals and waterlogging all degrade land.',
}));
Q('m_air_urban', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Air quality in an imagined fast-growing city worsens every winter. Which pair of sources is most likely to be responsible?',
  opts: [
    'Vehicle exhaust and emissions from industries and power plants',
    'Organic farming and rainwater harvesting',
    'Solar panels and wind turbines',
    'Tree plantations and city parks',
  ],
  sol: 'In Indian cities, vehicles and industrial or thermal power emissions are the main sources of air pollution (along with dust and burning of waste). The other pairs reduce pollution rather than cause it.',
}));
Q('m_gw_cause', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Global warming is mainly caused by',
  opts: [
    'a rise in greenhouse gases such as carbon dioxide and methane from burning fossil fuels and clearing forests',
    'the depletion of the ozone layer by volcanic dust',
    'a fall in the amount of sunlight reaching the earth',
    'the use of solar and wind energy',
  ],
  sol: 'Greenhouse gases trap heat in the lower atmosphere; burning coal, oil and gas and cutting forests raise their concentration. Ozone depletion is a separate problem; less sunlight would cool the earth; solar and wind energy reduce emissions.',
}));
Q('m_gw_effect', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined island nation in the Indian Ocean is planning to move villages inland. Which effect of global warming is it most likely preparing for?',
  opts: ['A rise in sea level as polar ice melts', 'A thicker ozone layer', 'Fewer tropical diseases', 'Lower average temperatures'],
  sol: 'Warming melts glaciers and polar ice and expands sea water, so sea levels rise and low-lying coasts are threatened. The other options are not effects of global warming (it tends to spread tropical diseases, not reduce them).',
}));
Q('m_ozone_cause', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The thinning of the ozone layer in the stratosphere is mainly caused by',
  opts: [
    'chlorofluorocarbons (CFCs) and halons used in refrigerants, aerosol sprays and fire extinguishers',
    'carbon dioxide from burning firewood',
    'organic manure used on farms',
    'water vapour from rivers',
  ],
  sol: 'Chlorine and bromine compounds such as CFCs and halons break down ozone molecules. Carbon dioxide is linked to global warming, not ozone depletion; manure and water vapour are not causes.',
}));
Q('m_ozone_harm', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Doctors in an imagined country report more cases of skin cancer and cataract, and marine scientists find fewer plankton. Which environmental change best explains both?',
  opts: [
    'Depletion of the ozone layer, letting more ultraviolet radiation reach the earth',
    'Overgrazing of pastures',
    'Waterlogging of irrigated land',
    'Loss of soil fertility',
  ],
  sol: 'The ozone layer filters out ultraviolet radiation; when it thins, more UV reaches the surface, causing skin cancer and eye damage and harming plankton. The other options affect land, not radiation.',
}));
Q('m_montreal', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The international agreement of 1987 to phase out ozone-depleting substances such as CFCs is the',
  opts: ['Montreal Protocol', 'Kyoto Protocol', 'Paris Agreement', 'Brundtland Report'],
  sol: 'The Montreal Protocol (1987) deals with ozone-depleting substances. Kyoto (1997) and Paris (2015) deal with greenhouse gases; the Brundtland Report (1987) set out the idea of sustainable development.',
}));
Q('m_opp_cost', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined state spends large sums on treating water-borne diseases and on cleaning a polluted river. In economic terms, these sums are best described as',
  opts: [
    'the opportunity cost of environmental degradation, since the money could have been used elsewhere',
    'investment that raises the environment\'s absorptive capacity for ever',
    'a sign that degradation has no economic cost',
    'transfer payments that add to national income',
  ],
  sol: 'Money spent repairing damage or treating its effects cannot be spent on schools, roads or other uses: that forgone use is the opportunity cost of degradation. Such spending does not make the environment limitless, shows a real cost, and is not a transfer payment.',
}));
Q('ar_renew', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'A renewable resource such as groundwater can be exhausted.',
  r: 'A renewable resource is exhausted when it is used faster than it is replenished.',
  sol: 'Both are true, and R explains A: groundwater is recharged by rain, but if it is pumped faster than it is recharged the water table keeps falling until wells run dry.',
}));
Q('ar_crisis', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Environmental problems have become more serious in recent decades.',
  r: 'The ozone layer protects the earth from ultraviolet radiation.',
  sol: 'Both statements are true, but R does not explain A. A is explained by the rising demand for resources and waste absorption (population growth, industrialisation, consumption); R only states what the ozone layer does.',
}));
Q('ar_cfc', ar({
  t: 1, d: 2, c: 'analysis', key: 'd',
  a: 'Global warming is caused mainly by chlorofluorocarbons breaking down ozone.',
  r: 'Burning fossil fuels raises the level of carbon dioxide in the atmosphere.',
  sol: 'A is false: global warming is caused mainly by greenhouse gases such as carbon dioxide and methane; CFCs are chiefly linked to ozone depletion. R is true.',
}));
Q('ar_absorb', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'When waste exceeds the absorptive capacity of the environment, pollution builds up.',
  r: 'The environment can absorb any amount of waste if enough time passes.',
  sol: 'A is true: waste beyond the absorptive capacity accumulates as pollution. R is false: absorptive capacity is limited, and some wastes (plastics, heavy metals) persist for very long periods.',
}));
Q('tf_biotic', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Water, air and soil minerals are biotic elements of the environment.',
  sol: 'They are non-living, so they are abiotic elements. Biotic elements are living things such as plants, animals and micro-organisms.',
}));
Q('tf_renew_exhaust', tf({
  t: 1, d: 2, c: 'application', ans: true,
  stem: 'True or false? A village pasture can be ruined by overgrazing even though grass is a renewable resource.',
  sol: 'If more animals graze than the grass can regrow for, the cover is destroyed and the soil erodes, so even a renewable resource can be exhausted.',
}));
Q('fb_functions', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The environment supplies resources, ___ wastes, sustains life by providing genetic diversity and biodiversity, and provides ___ services such as scenery.',
  acc: [['assimilates', 'absorbs'], ['aesthetic']],
  sol: 'The environment assimilates (absorbs) wastes and provides aesthetic services; its other two functions are supplying resources and sustaining life.',
}));
Q('mt_functions', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each imagined example with the function of the environment it shows.',
  pairs: [
    ['A paper mill draws bamboo from a forest', 'Supplies resources'],
    ['A wetland breaks down the sewage of a nearby town', 'Assimilates waste'],
    ['A forest is home to thousands of species of plants and insects', 'Sustains life through biodiversity'],
    ['Families picnic by a lake to enjoy the view', 'Provides aesthetic services'],
  ],
  sol: 'Bamboo for paper is a resource; the wetland absorbs waste; species variety sustains life; enjoying the view is an aesthetic service.',
}));
Q('mt_problems', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each global environmental problem or agreement with the item linked to it.',
  pairs: [
    ['Global warming', 'Greenhouse gases trapping heat'],
    ['Ozone depletion', 'More ultraviolet radiation reaching the earth'],
    ['Montreal Protocol', 'Phasing out CFCs and halons'],
    ['Kyoto Protocol', 'Industrialised nations to cut greenhouse gas emissions'],
  ],
  sol: 'Warming comes from greenhouse gases; ozone thinning lets in more UV; the Montreal Protocol (1987) phases out ozone-depleting substances; the Kyoto Protocol (1997) set emission cuts for industrialised nations.',
}));
Q('ord_crisis', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these stages in the order in which an environmental crisis develops in an imagined river valley.',
  items: [
    'Population and industry in the valley grow',
    'Demand for water, timber and waste disposal rises',
    'Extraction exceeds regeneration and waste exceeds absorptive capacity',
    'The river is polluted and forests thin out, and costs of repair rise',
  ],
  sol: 'Growth raises demand; demand pushes use beyond the environment\'s limits; the result is degradation and rising costs.',
}));
Q('n_forest', num({
  t: 1, d: 3, c: 'application', marks: 2, value: FOREST_YEARS, unit: 'years',
  stem: `An imagined forest holds ${inr(FOREST.stock)} tonnes of timber. It regrows ${inr(FOREST.regrow)} tonnes a year, but ${inr(FOREST.fell)} tonnes are felled every year. If this continues, in how many years will the timber stock be used up?`,
  sol: `Step 1: Net loss a year = felling − regrowth = ${inr(FOREST.fell)} − ${inr(FOREST.regrow)} = ${inr(FOREST_LOSS)} tonnes.\nStep 2: Years = stock ÷ net loss = ${inr(FOREST.stock)} ÷ ${inr(FOREST_LOSS)} = ${FOREST_YEARS} years.`,
  scheme: [['Net annual loss', 1], [`Years = ${FOREST_YEARS}`, 1]],
}));
Q('n_water', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: WATER_PCT, unit: '%',
  stem: `In an imagined block, rain recharges ${WATER.recharge} million litres of groundwater a year, but farmers pump out ${WATER.pumped} million litres. By what percentage of the recharge does pumping exceed it?`,
  sol: `Step 1: Excess = ${WATER.pumped} − ${WATER.recharge} = ${WATER_OVER} million litres.\nStep 2: Percentage = ${WATER_OVER} ÷ ${WATER.recharge} × 100 = ${WATER_PCT} per cent.`,
}));
Q('n_pasture', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: PASTURE_EXCESS, unit: 'cattle',
  stem: `The village pasture of an imagined hamlet can feed ${PASTURE.capacity} cattle without damage. Villagers keep ${PASTURE.kept}. How many cattle exceed the pasture's carrying capacity?`,
  sol: `Step 1: Excess = cattle kept − capacity.\nStep 2: ${PASTURE.kept} − ${PASTURE.capacity} = ${PASTURE_EXCESS} cattle.`,
}));
Q('n_opp_air', num({
  t: 1, d: 3, c: 'application', marks: 2, value: AIR_TOTAL, unit: '₹',
  stem: `Because of polluted air, an imagined household in a city spends ₹${inr(AIR.medicine)} a year on medicines for breathing problems, and its earning member loses ${AIR.daysLost} working days a year at ₹${AIR.wage} a day. What is the household's yearly cost of the pollution (in ₹)?`,
  sol: `Step 1: Wages lost = ${AIR.daysLost} × ${AIR.wage} = ₹${inr(AIR_WAGES)}.\nStep 2: Total = ${inr(AIR.medicine)} + ${inr(AIR_WAGES)} = ₹${inr(AIR_TOTAL)}.`,
  scheme: [['Wages lost', 1], [`Total ₹${inr(AIR_TOTAL)}`, 1]],
}));
Q('s_functions', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any four functions performed by the environment.',
  model: '1. It **supplies resources**, renewable and non-renewable.\n2. It **assimilates waste** produced by people and industry.\n3. It **sustains life** by providing genetic diversity and biodiversity.\n4. It provides **aesthetic services** such as scenery and clean surroundings.',
  sol: 'Name the four functions; half a mark each.',
  scheme: [['First two functions', 1], ['Other two functions', 1]],
}));
Q('s_absorb_carry', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the absorptive capacity and the carrying capacity of the environment.',
  model: '**Absorptive capacity** is the ability of the environment to take in degradation such as waste and pollution. **Carrying capacity** holds when resources are extracted no faster than they regenerate **and** wastes stay within the absorptive capacity, so the environment can keep supporting life.',
  sol: 'One clear meaning for each; carrying capacity needs both of its conditions.',
  scheme: [['Absorptive capacity', 1], ['Carrying capacity with both conditions', 1]],
}));
Q('s_renew_nonrenew', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does a renewable resource differ from a non-renewable one? Explain with one example of each.',
  model: '**Renewable** resources can be used without being exhausted, as long as use stays within their natural replenishment, e.g. **forest timber** or **fish**. **Non-renewable** resources get exhausted with use because they form over very long periods, e.g. **coal** or **petroleum**.',
  sol: 'Meaning plus example for each type.',
  scheme: [['Renewable with example', 1], ['Non-renewable with example', 1]],
}));
Q('s_ozone', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Why is the depletion of the ozone layer a matter of concern? Give two effects.',
  model: 'The ozone layer **filters ultraviolet radiation**. When it thins, more UV reaches the earth, causing (1) **skin cancer and cataract** in humans and (2) harm to **plankton** and crops, which disturbs **food chains**.',
  sol: 'Link thinning to UV, then two distinct effects.',
  scheme: [['First effect', 1], ['Second effect', 1]],
}));
Q('s3_crisis', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why the supply–demand relationship for environmental resources has reversed over time.',
  model: '1. **Earlier**, population was small and industry limited, so environmental resources and the capacity to absorb waste were **plentiful relative to demand**.\n2. **Now**, rapid **population growth**, **industrialisation** and rising **consumption** have sharply raised the demand for resources and for waste absorption.\n3. Meanwhile **supply has shrunk** because of overuse and pollution, so demand **exceeds** what the environment can supply: the reversal behind today\'s crisis.',
  sol: 'Earlier position, cause of rising demand, shrinking supply leading to the reversal.',
  scheme: [['Earlier: supply exceeded demand', 1], ['Causes of rising demand', 1], ['Shrinking supply and the reversal', 1]],
}));
Q('s3_land', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'A farmers\' group in an imagined district finds that its soil yields less every year. Suggest three likely causes of this land degradation.',
  model: '1. **Overuse of chemical fertilisers and pesticides**, which harms soil organisms and structure.\n2. **Poor irrigation management**, causing **waterlogging and salinity**.\n3. **Deforestation and overgrazing** on nearby slopes, which leave soil bare so that rain **erodes** the fertile top layer. (Also: improper crop rotation, shifting cultivation, unsustainable fuelwood use.)',
  sol: 'Three distinct, plausible causes, each linked to the soil.',
  scheme: [['First cause', 1], ['Second cause', 1], ['Third cause', 1]],
}));
Q('l_gw', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'What is global warming? Explain its causes and any three of its likely effects, and name the international efforts to deal with it.',
  model: '1. **Meaning:** a gradual rise in the **average temperature** of the earth\'s lower atmosphere.\n2. **Causes:** more **greenhouse gases** (carbon dioxide, methane) from **burning coal, oil and gas**, and **deforestation**, which removes the trees that absorb carbon dioxide.\n3. **Effects:** **melting** of glaciers and polar ice and a **rise in sea level** that threatens coasts;\n4. more **extreme weather** (heat waves, floods, droughts) that disrupts farming, and the **spread of tropical diseases**.\n5. **Efforts:** the **Kyoto Protocol (1997)** set emission cuts for industrialised countries; the **Paris Agreement (2015)** commits countries to national plans to limit warming.',
  sol: 'Meaning, causes, three effects and the international response; one mark each, with effects carrying two marks.',
  scheme: [['Meaning', 1], ['Causes', 1], ['First effect', 1], ['Two more effects', 1], ['International efforts', 1]],
}));
Q('l_india_env', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'India is rich in natural resources, yet its environment faces serious threats. Explain any four such threats and their economic cost.',
  model: '1. **Land degradation** from deforestation, overgrazing, overuse of agrochemicals and waterlogging lowers farm output.\n2. **Loss of biodiversity** as forests and wetlands shrink, weakening the life-support function of the environment.\n3. **Air pollution** in cities from vehicles, industry and burning of waste harms health.\n4. **Water pollution** of rivers and groundwater by sewage and industrial effluents spreads disease.\n5. **Economic cost:** money spent on **health care, cleaning and lost workdays** is an **opportunity cost**; it could have been used for development.',
  sol: 'Four threats with a line each, then the opportunity-cost argument.',
  scheme: [['First threat', 1], ['Second threat', 1], ['Third threat', 1], ['Fourth threat', 1], ['Economic (opportunity) cost', 1]],
}));
Q('l_opp_cost', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"Growth that ignores the environment is costly growth." Evaluate this statement with reference to the opportunity costs of environmental degradation.',
  model: '1. **Growth draws on the environment:** factories, farms and cities use resources and dump waste.\n2. **Degradation has real costs:** polluted air and water raise spending on **medicines and hospitals** and cause **lost workdays**.\n3. **Repair is expensive:** cleaning rivers, reclaiming saline land and replanting forests use funds that could have built **schools or roads**; this forgone use is the **opportunity cost**.\n4. **Future output falls:** degraded soil, depleted groundwater and fish stocks reduce **future production**.\n5. **Judgement:** the statement is largely valid; growth that respects **carrying capacity** avoids these costs, though some environmental use is unavoidable for development.',
  sol: 'Explain costs (health, repair, future output) and reach a balanced judgement.',
  scheme: [['Growth uses the environment', 1], ['Health and productivity costs', 1], ['Repair spending as opportunity cost', 1], ['Loss of future output', 1], ['Balanced judgement', 1]],
}));

// ================================================================ t02 Sustainable development and strategies
Q('m_sd_def', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Sustainable development is development that',
  opts: [
    'meets the needs of the present generation without reducing the ability of future generations to meet their own needs',
    'maximises the output of the present generation, whatever the cost to the future',
    'stops all use of natural resources',
    'depends only on non-renewable resources',
  ],
  sol: 'This is the idea set out by the Brundtland Commission (1987). It does not ignore the future, does not stop resource use, and favours renewable resources.',
}));
Q('m_brundtland', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The definition of sustainable development most widely used today was given in 1987 by the',
  opts: ['World Commission on Environment and Development (Brundtland Commission)', 'Planning Commission of India', 'International Monetary Fund', 'Montreal Protocol conference'],
  sol: 'The World Commission on Environment and Development, chaired by Gro Harlem Brundtland, gave the definition in its 1987 report. The other bodies did not.',
}));
Q('m_daly', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined coastal state allows fishing only up to the number of fish that breed each year. Which of Herman Daly\'s principles of sustainable development does this follow?',
  opts: [
    'Renewable resources should be harvested no faster than they regenerate',
    'Human population should be limited to the carrying capacity',
    'Technology should be input-efficient, not input-consuming',
    'Non-renewable resources should be depleted no faster than renewable substitutes are created',
  ],
  sol: 'Fishing up to the yearly regeneration is the sustainable harvest of a renewable resource. The other principles deal with population, technology and non-renewables.',
}));
Q('m_daly_nonrenew', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'An imagined country uses up its coal reserves while investing just as fast in solar and wind capacity to replace them. Which principle of sustainable development is it applying?',
  opts: [
    'Non-renewable resources should be depleted no faster than renewable substitutes are created',
    'Pollution should be ignored because it is unavoidable',
    'Renewable resources should be harvested faster than they regenerate',
    'All resource use should stop until technology improves',
  ],
  sol: 'Daly\'s rule for non-renewables ties their rate of depletion to the creation of renewable substitutes. The other options either contradict sustainable development or are not among its principles.',
}));
Q('m_solar_pv', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Photovoltaic cells are used to',
  opts: ['convert sunlight directly into electricity', 'turn cow dung into gas', 'store groundwater for summer', 'measure air pollution'],
  sol: 'Photovoltaic (solar) cells convert sunlight into electricity. Biogas plants use dung; the other uses are unrelated.',
}));
Q('m_biogas', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A household in an imagined village switches from firewood to a gobar gas plant fed with cattle dung. Which is **NOT** a benefit of this switch?',
  opts: [
    'It increases the number of trees that must be cut for fuel',
    'It reduces smoke in the kitchen',
    'It leaves slurry that can be used as manure',
    'It saves time spent collecting firewood',
  ],
  sol: 'Biogas replaces firewood, so fewer trees are cut, not more. It reduces indoor smoke, its slurry is good manure, and it saves collection time.',
}));
Q('m_cng', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An imagined city converts its buses and auto-rickshaws to run on compressed natural gas (CNG). What is the main environmental aim?',
  opts: ['Reducing air pollution from vehicle exhaust', 'Increasing the use of coal', 'Raising the price of public transport', 'Reducing the number of buses'],
  sol: 'CNG burns more cleanly than diesel or petrol, so vehicle emissions fall. The other options are not aims of the switch.',
}));
Q('m_minihydel', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Mini-hydel plants are suitable mainly in',
  opts: [
    'hilly areas with streams, where small turbines can supply nearby villages',
    'deserts with no flowing water',
    'large cities that need thousands of megawatts',
    'coastal salt pans',
  ],
  sol: 'Mini-hydel plants use the flow of mountain streams to run small turbines and serve local needs without large dams. Deserts and salt pans lack flowing water, and they are too small for big cities.',
}));
Q('m_biopest', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A farmer in an imagined village sprays a neem-based mixture and keeps owls and snakes that eat crop pests. This is an example of',
  opts: ['biopest control', 'chemical pest control', 'shifting cultivation', 'monoculture'],
  sol: 'Using plant products such as neem and natural predators instead of chemical pesticides is biopest control. It is not chemical, and it is not a cropping system like shifting cultivation or monoculture.',
}));
Q('m_compost', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In biocomposting, earthworms are used to',
  opts: [
    'convert organic waste into manure faster than ordinary decay',
    'remove salt from waterlogged soil',
    'produce electricity from waste',
    'kill pests on crops',
  ],
  sol: 'Earthworms (vermicomposting) break down organic waste into rich compost quickly. They do not desalinate soil, generate electricity or act as pesticides.',
}));
Q('m_traditional', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why do supporters of sustainable development urge the use of traditional knowledge and practices?',
  opts: [
    'Many traditional practices in farming, health care and housing were adapted to local ecosystems and used resources carefully',
    'Traditional practices always produce higher output than modern methods',
    'Modern science has no role in sustainable development',
    'Traditional practices require more chemical inputs',
  ],
  sol: 'Practices such as mixed cropping, herbal medicine and local building materials evolved in harmony with nature. The claim is not that they always out-produce modern methods or that science is useless, and they use fewer chemicals.',
}));
Q('m_lpg_rural', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Giving subsidised LPG connections to rural households that cook on wood and dung cakes is expected to',
  opts: [
    'reduce indoor air pollution and pressure on forests',
    'increase deforestation',
    'raise the use of coal in homes',
    'have no effect on health',
  ],
  sol: 'LPG is a cleaner fuel, so kitchens have less smoke (better health, especially for women and children) and fewer trees are cut for fuel.',
}));
Q('ar_sd_future', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Sustainable development requires using resources with an eye to future generations.',
  r: 'Resources overused today may not be available to people in the future.',
  sol: 'Both are true, and R explains A: since overuse leaves less for later, development is sustainable only if present use protects the future\'s ability to meet its needs.',
}));
Q('ar_solar', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Solar and wind energy are encouraged as part of a strategy for sustainable development.',
  r: 'They are renewable sources and cause little pollution while generating power.',
  sol: 'Both are true, and R explains A: being renewable and clean, they can meet energy needs without exhausting resources or overloading the absorptive capacity.',
}));
Q('ar_chem', ar({
  t: 2, d: 2, c: 'analysis', key: 'c',
  a: 'Heavy use of chemical pesticides can harm soil, water and human health.',
  r: 'Chemical pesticides affect only the pests they are meant to kill.',
  sol: 'A is true: residues enter soil, water and food. R is false: chemical pesticides also kill useful insects and organisms and pollute the wider environment.',
}));
Q('tf_sd_stop', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Sustainable development means that economic growth must stop so that the environment can recover.',
  sol: 'Sustainable development allows growth, but growth that respects carrying capacity and leaves future generations able to meet their needs.',
}));
Q('tf_minihydel', tf({
  t: 2, d: 2, c: 'application', ans: true,
  stem: 'True or false? A mini-hydel plant on a hill stream can supply electricity to nearby villages without submerging large areas of land.',
  sol: 'Mini-hydel plants are small and use the natural flow of streams, so they do not need big reservoirs that flood land.',
}));
Q('fb_daly', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'According to Herman Daly, technological progress should be input-___ and not input-consuming.',
  acc: [['efficient']],
  sol: 'Technology should be input-efficient, getting more output from fewer resources.',
}));
Q('n_biogas', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: BIOGAS_SAVED, unit: 'kg',
  stem: `An imagined household used to burn ${BIOGAS.perDay} kg of firewood every day. After it installs a gobar gas plant, it stops using firewood. How many kg of firewood does it save in a year of ${BIOGAS.days} days?`,
  sol: `Step 1: Saving = firewood a day × days.\nStep 2: ${BIOGAS.perDay} × ${BIOGAS.days} = ${inr(BIOGAS_SAVED)} kg.`,
}));
Q('n_solar', num({
  t: 2, d: 3, c: 'application', marks: 2, value: SOLAR_PAYBACK, unit: 'years',
  stem: `An imagined school installs solar panels for ₹${inr(SOLAR.cost)}. They produce ${SOLAR.kwhPerDay} units of electricity a day on ${SOLAR.days} days a year, and each unit saves the school ₹${SOLAR.tariff} on its bill. In how many years will the savings repay the cost?`,
  sol: `Step 1: Yearly saving = ${SOLAR.kwhPerDay} × ${SOLAR.days} × ${SOLAR.tariff} = ₹${inr(SOLAR_SAVING)}.\nStep 2: Years = ${inr(SOLAR.cost)} ÷ ${inr(SOLAR_SAVING)} = ${SOLAR_PAYBACK} years.`,
  scheme: [[`Yearly saving ₹${inr(SOLAR_SAVING)}`, 1], [`Payback ${SOLAR_PAYBACK} years`, 1]],
}));
Q('s_daly_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two principles of sustainable development suggested by Herman Daly.',
  model: '1. **Renewable** resources should be harvested **no faster than they regenerate**.\n2. **Non-renewable** resources should be used up **no faster than renewable substitutes are created**. (Also: limit population to carrying capacity; input-efficient technology; correct pollution.)',
  sol: 'Any two of Daly\'s principles in own words.',
  scheme: [['First principle', 1], ['Second principle', 1]],
}));
Q('s_biocompost', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'How does biocomposting help sustainable development? Give two points.',
  model: '1. It turns **farm and kitchen waste** into **organic manure**, so less waste is dumped and less chemical fertiliser is needed.\n2. Organic manure **improves soil structure and fertility**, keeping land productive for **future** harvests.',
  sol: 'Two benefits: waste and fertiliser use reduced; soil kept fertile.',
  scheme: [['Waste reduced and fewer chemicals', 1], ['Long-term soil fertility', 1]],
}));
Q('s_cng_lpg', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain how LPG in rural kitchens and CNG in urban transport support sustainable development.',
  model: '**LPG** replaces firewood and dung cakes, so **fewer trees are cut** and kitchens have **less smoke**, protecting health. **CNG** burns more cleanly than diesel, so city **air pollution** from vehicles falls.',
  sol: 'One environmental gain from each fuel switch.',
  scheme: [['LPG in rural areas', 1], ['CNG in urban transport', 1]],
}));
Q('s3_nonconv', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined hill district depends on diesel generators for electricity. Suggest three non-conventional sources it could use, with a reason for each.',
  model: '1. **Mini-hydel plants** on its streams: small turbines can serve villages without large dams.\n2. **Solar photovoltaic** panels on homes and schools: sunlight is free and the panels cause no pollution while working.\n3. **Wind turbines** on exposed ridges, or **biogas** from cattle dung for cooking: both are renewable and cut diesel use.',
  sol: 'Three sources suited to hills, each with a reason.',
  scheme: [['First source with reason', 1], ['Second source with reason', 1], ['Third source with reason', 1]],
}));
Q('s3_traditional', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain, with three examples, how traditional knowledge can support sustainable development in India.',
  model: '1. **Farming:** mixed cropping and natural manure keep soil fertile and reduce pests without chemicals.\n2. **Health care:** traditional systems use local medicinal plants, with fewer side effects and little industrial waste.\n3. **Housing and water:** local materials and designs suited to the climate, and old step-wells and tanks, conserve energy and water.',
  sol: 'Three areas, each with how the practice saves resources or prevents harm.',
  scheme: [['First example explained', 1], ['Second example explained', 1], ['Third example explained', 1]],
}));
Q('s3_sd_why', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Why is sustainable development important for a country like India? Give three reasons.',
  model: '1. A **large and growing population** depends directly on land, water and forests, so overuse quickly hurts livelihoods.\n2. **Degradation costs** (health spending, lost output) take money away from development.\n3. **Future generations** must also be able to meet their needs, so growth today should not exhaust resources or exceed the absorptive capacity.',
  sol: 'Three reasons linked to population, costs and future generations.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('l_strategies', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain any five strategies for achieving sustainable development in India.',
  model: '1. **Non-conventional energy:** solar photovoltaic cells and wind turbines produce power with little pollution.\n2. **Cleaner fuels:** **LPG and gobar gas** in villages and **CNG** in city transport reduce smoke and tree-cutting.\n3. **Mini-hydel plants** on hill streams supply local power without large dams.\n4. **Traditional knowledge** in farming, health and housing uses resources carefully.\n5. **Biocomposting and biopest control** replace chemical fertilisers and pesticides with manure, neem and natural predators.',
  sol: 'Five distinct strategies, each with how it helps.',
  scheme: [['Strategy 1', 1], ['Strategy 2', 1], ['Strategy 3', 1], ['Strategy 4', 1], ['Strategy 5', 1]],
}));
Q('l_daly', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'What is sustainable development? Explain the principles suggested by Herman Daly to achieve it.',
  model: '1. **Meaning:** development that meets **present needs** without reducing the ability of **future generations** to meet theirs.\n2. **Population:** limit human numbers to a level within the **carrying capacity** of the environment.\n3. **Technology** should be **input-efficient**, raising output from fewer resources.\n4. **Renewable** resources should be harvested no faster than they **regenerate**, and **non-renewable** ones depleted no faster than **renewable substitutes** are created.\n5. **Pollution** and other inefficiencies should be **corrected**.',
  sol: 'Meaning plus Daly\'s principles in own words.',
  scheme: [['Meaning', 1], ['Population and carrying capacity', 1], ['Input-efficient technology', 1], ['Rules for renewable and non-renewable resources', 1], ['Correcting pollution', 1]],
}));
Q('l_sd_eval', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Some argue that a developing country should "grow first and clean up later". Evaluate this argument from the point of view of sustainable development.',
  model: '1. **For the argument:** growth raises incomes and pays for schools and hospitals; cleaner technology may cost more early on.\n2. **Against:** some damage is **irreversible**: lost species, exhausted aquifers and eroded topsoil cannot be cleaned up later.\n3. **Costs mount:** degradation raises **health spending and lost output** now, an opportunity cost that slows growth itself.\n4. **Future generations** bear the burden, which goes against the idea of sustainable development.\n5. **Judgement:** growth and care for the environment can go together through clean energy, efficient technology and sustainable harvesting; delaying action usually costs more.',
  sol: 'Points on both sides, then a reasoned judgement.',
  scheme: [['Case for the argument', 1], ['Irreversible damage', 1], ['Costs in the present', 1], ['Burden on future generations', 1], ['Balanced judgement', 1]],
}));

// ================================================================ case-based
Q('cb_lake', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined town, lake and figures, written by SOYL for practice.)*',
  passage: `**Waste discharged into Neelsar Lake, Neelgaon (imagined), tonnes a year**\n\n| Source | Waste (tonnes) |\n|---|---|\n| Dyeing unit | ${LAKE.a} |\n| Town sewage | ${LAKE.b} |\n| Fish-processing plant | ${LAKE.c} |\n\nScientists estimate that the lake can break down about ${LAKE.capacity} tonnes of such waste a year without harm. Fishermen report that catches have fallen for three years, and visitors no longer come for boating.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'understanding', marks: 1, value: LAKE_EXCESS, unit: 'tonnes', stem: 'By how many tonnes a year does the waste exceed what the lake can absorb?', sol: `Step 1: Total = ${LAKE.a} + ${LAKE.b} + ${LAKE.c} = ${LAKE_TOTAL} tonnes.\nStep 2: Excess = ${LAKE_TOTAL} − ${LAKE.capacity} = ${LAKE_EXCESS} tonnes.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which environmental concept does the figure of 40 tonnes describe?', model: 'The **absorptive capacity** of the lake.', sol: 'The ability to break down waste without harm is absorptive capacity.', scheme: [['Absorptive capacity', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which two functions of the environment is the lake now failing to perform? Use evidence from the passage.', model: `(1) **Supplying resources**: fish catches have fallen. (2) **Aesthetic services**: visitors no longer come for boating. (It is also failing to **assimilate** all the waste it receives.)`, sol: 'Two functions, each tied to a line in the passage.', scheme: [['First function with evidence', 1], ['Second function with evidence', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): If every source cut its waste by the same percentage, what cut would bring the total within the lake\'s capacity? Is an equal cut fair? Give one reason.', model: `A cut of **${LAKE_CUT} per cent** (${LAKE_EXCESS} ÷ ${LAKE_TOTAL} × 100). An equal cut may **not be fair**: the dyeing unit discharges the most and its chemicals may do more harm, so it could be asked to cut more or to **treat** its effluent.`, sol: 'Compute the common percentage cut, then a reasoned view on fairness.', scheme: [[`Cut of ${LAKE_CUT} per cent`, 1], ['Reasoned view on fairness', 1]] }),
    ]),
  ],
}));
Q('cb_kesarpur', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined village and figures, written by SOYL for practice.)*',
  passage: `**Kesarpur (imagined), Madhya Pradesh: a village changes its fuel**\n\nFive years ago all ${KES.households} households of Kesarpur cooked on firewood from the nearby forest, and women walked for hours to collect it. A self-help group then helped ${KES.biogas} households build gobar gas plants, and ${KES.lpg} households took LPG connections. The panchayat put solar lamps in the lanes and on the school roof. Women say their eyes no longer sting from smoke, and the forest guard reports that young trees are growing back. The rest of the households still use firewood because they own no cattle and find LPG refills costly.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'understanding', marks: 1, value: KES_PCT, unit: '%', stem: 'What percentage of Kesarpur\'s households have moved away from firewood?', sol: `Step 1: Households switched = ${KES.biogas} + ${KES.lpg} = ${KES_SWITCHED}.\nStep 2: Share = ${KES_SWITCHED} ÷ ${KES.households} × 100 = ${KES_PCT} per cent.` })),
    child('b', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name the non-conventional source of energy used for the lanes and school.', model: '**Solar energy** (solar lamps and panels).', sol: 'The passage mentions solar lamps and panels on the school roof.', scheme: [['Solar energy', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain two ways in which the change supports sustainable development, using evidence from the passage.', model: '(1) **Forests regenerate**: young trees are growing back because less wood is cut. (2) **Health improves**: women no longer suffer from kitchen **smoke**, and they save hours once spent collecting wood.', sol: 'Two benefits, each tied to evidence.', scheme: [['Environmental benefit with evidence', 1], ['Health or time benefit with evidence', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two ways to help the remaining households switch away from firewood.', model: '(1) A **community biogas plant** run by the SHG, so households without cattle can buy gas. (2) **Targeted help with LPG refills** or small loans, along with **solar cookers** for sunny months.', sol: 'Two workable steps addressing the stated barriers (no cattle; costly refills).', scheme: [['First workable step', 1], ['Second workable step', 1]] }),
    ]),
  ],
}));
Q('cb_fishing', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined coast and figures, written by SOYL for practice.)*',
  passage: `**Report of a fisheries officer, Sagarpatnam coast (imagined)**\n\nMarine biologists estimate that the fish stock off our coast regenerates by about ${FISH.regen} tonnes a year. Trawlers now land about ${inr(FISH.catchNow)} tonnes a year, and the average size of fish caught keeps falling. Older fishermen remember using nets with large mesh so that young fish escaped, and leaving the sea alone in the breeding season. The officer proposes a breeding-season ban, a minimum mesh size and a yearly catch limit.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Why is the fish stock shrinking even though fish are a renewable resource?', model: `The catch (**${inr(FISH.catchNow)} tonnes**) is greater than the yearly regeneration (**${FISH.regen} tonnes**), so the stock falls.`, sol: 'Compare extraction with regeneration.', scheme: [['Catch exceeds regeneration', 1]] })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: FISH_CUT_PCT, unit: '%', stem: 'By what percentage must the present catch be cut so that it equals the yearly regeneration?', sol: `Step 1: Cut needed = ${inr(FISH.catchNow)} − ${FISH.regen} = ${FISH_CUT} tonnes.\nStep 2: Percentage = ${FISH_CUT} ÷ ${inr(FISH.catchNow)} × 100 = ${FISH_CUT_PCT} per cent.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How do the older fishermen\'s practices show the value of traditional knowledge for sustainable development?', model: 'Large-mesh nets let **young fish escape** to breed, and resting the sea in the **breeding season** let the stock **regenerate**; both kept harvests within what nature replaces.', sol: 'Link each practice to regeneration.', scheme: [['Mesh size and young fish', 1], ['Breeding-season rest and regeneration', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Which of Herman Daly\'s principles does the officer\'s yearly catch limit follow? Explain briefly.', model: 'It follows the rule that **renewable resources** should be **harvested no faster than they regenerate**: a limit near the yearly regeneration keeps the **stock** stable for the future.', sol: 'Name the principle and link the limit to regeneration.', scheme: [['Principle named', 1], ['Link to regeneration', 1]] }),
    ]),
  ],
}));
