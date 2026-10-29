// Build CBSE 12 Economics ch12 Environment and Sustainable Development. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch12', 'economics-commerce');
const { inr } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- deck figures (computed, never typed)
const pct = (part, whole) => Math.round((1000 * part) / whole) / 10;
// Worked example 1: an imagined forest.
const WE1 = { stock: 30000, regrow: 1500, fell: 2000 };
const WE1_LOSS = WE1.fell - WE1.regrow; // 500
const WE1_YEARS = WE1.stock / WE1_LOSS; // 60
// Worked example 2: opportunity cost of dirty water for one imagined family (₹ a year).
const WE2 = { medicine: 3600, days: 4, wage: 600, filter: 1800 };
const WE2_WAGES = WE2.days * WE2.wage; // 2,400
const WE2_TOTAL = WE2.medicine + WE2_WAGES + WE2.filter; // 7,800
// Worked example 3: a sustainable bamboo quota.
const WE3 = { regrow: 800, demand: 1000 };
const WE3_CUT = WE3.demand - WE3.regrow; // 200
const WE3_PCT = pct(WE3_CUT, WE3.demand); // 20
// Worked example 4: solar panels at an imagined health centre.
const WE4 = { cost: 120000, units: 12, days: 250, tariff: 10 };
const WE4_SAVE = WE4.units * WE4.days * WE4.tariff; // 30,000
const WE4_YEARS = WE4.cost / WE4_SAVE; // 4
if (WE1_LOSS !== 500 || WE1_YEARS !== 60 || WE2_WAGES !== 2400 || WE2_TOTAL !== 7800 || WE3_CUT !== 200 || WE3_PCT !== 20 || WE4_SAVE !== 30000 || WE4_YEARS !== 4)
  throw new Error('ch12 deck figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What the environment is', 'Its four functions', 'Limits: absorptive and carrying capacity', 'Why a crisis now', 'India\'s environment', 'Global warming and ozone'], 'Route map of Part 1: what the environment is, its four functions, its limits, why there is a crisis now, India\'s environment, and global warming and ozone depletion', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Meaning of sustainable development', 'Daly\'s principles', 'Clean energy', 'Cleaner fuels', 'Traditional knowledge', 'Compost and biopest control'], 'Route map of Part 2: meaning of sustainable development, Daly\'s principles, clean energy, cleaner fuels, traditional knowledge, and composting and biopest control', 'Part 2 at a glance');
const vBiotic = table(
  ['Biotic (living)', 'Abiotic (non-living)'],
  [
    ['Plants and trees', 'Air'],
    ['Animals, birds, fish', 'Water'],
    ['Micro-organisms in soil and water', 'Sunlight'],
    ['Human beings', 'Soil minerals, rocks'],
  ],
  'Table of the elements of the environment: biotic elements are plants, animals, micro-organisms and humans; abiotic elements are air, water, sunlight and soil minerals',
  'Environment = all biotic and abiotic elements together.',
);
const vFunctions = (() => {
  const s = new Svg(560, 300);
  s.rect(200, 120, 160, 60, { fill: 'fill', color: 'accent', sw: 2, rx: 30 });
  s.text(280, 150, 'Environment', { size: 16, bold: true });
  const boxes = [
    [20, 20, 'Supplies resources', 'timber, water, minerals'],
    [340, 20, 'Assimilates waste', 'breaks down pollution'],
    [20, 220, 'Sustains life', 'genetic and biodiversity'],
    [340, 220, 'Aesthetic services', 'scenery, clean surroundings'],
  ];
  for (const [x, y, h, sub] of boxes) {
    s.rect(x, y, 200, 60, { color: 'accent', sw: 1.6, rx: 8 });
    s.text(x + 100, y + 22, h, { size: 14, bold: true });
    s.text(x + 100, y + 42, sub, { size: 12, muted: true });
  }
  s.arrow(240, 120, 170, 84, { sw: 1.6 });
  s.arrow(320, 120, 390, 84, { sw: 1.6 });
  s.arrow(240, 180, 170, 216, { sw: 1.6 });
  s.arrow(320, 180, 390, 216, { sw: 1.6 });
  return s.visual('Diagram of the four functions of the environment around a central oval: it supplies resources, assimilates waste, sustains life through genetic and biodiversity, and provides aesthetic services', 'The four functions of the environment');
})();
const vRenew = table(
  ['', 'Renewable', 'Non-renewable'],
  [
    ['Meaning', 'Replenished by nature; usable again if use stays within regeneration', 'Formed over very long periods; exhausted with use'],
    ['Examples', 'Forests, fish, groundwater, solar and wind energy', 'Coal, petroleum, natural gas, metal ores'],
    ['Risk', 'Exhausted if used faster than it regenerates', 'Runs out; substitutes needed'],
  ],
  'Table comparing renewable resources (forests, fish, groundwater, sun, wind; exhausted only if used faster than they regenerate) with non-renewable resources (coal, petroleum, gas, ores; exhausted with use)',
);
const vCapacity = flow('TB', ['Carrying capacity is maintained when', 'Extraction does not exceed regeneration', 'Waste stays within absorptive capacity', 'The environment keeps supporting life'], 'Diagram: carrying capacity is maintained when extraction does not exceed regeneration and waste stays within absorptive capacity; then the environment keeps supporting life', 'Both conditions are needed', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n3', to: 'n4' },
]);
const vWE1 = table(
  ['Step', 'Working (imagined forest)', 'Result'],
  [
    ['1. Compare use with regrowth', `Felling ${inr(WE1.fell)} t vs regrowth ${inr(WE1.regrow)} t a year`, 'Felling is higher: not sustainable'],
    ['2. Net loss a year', `${inr(WE1.fell)} − ${inr(WE1.regrow)}`, `${inr(WE1_LOSS)} t`],
    ['3. Years until exhausted', `${inr(WE1.stock)} ÷ ${inr(WE1_LOSS)}`, `${WE1_YEARS} years`],
    ['4. Sustainable limit', 'Felling no more than regrowth', `${inr(WE1.regrow)} t a year`],
  ],
  `Table working out an imagined forest: felling ${inr(WE1.fell)} tonnes against regrowth ${inr(WE1.regrow)} tonnes gives a net loss of ${inr(WE1_LOSS)} tonnes a year, so a stock of ${inr(WE1.stock)} tonnes lasts ${WE1_YEARS} years; the sustainable limit is ${inr(WE1.regrow)} tonnes`,
  'Imagined figures; t = tonnes of timber.',
);
const vReversal = (() => {
  const s = new Svg(560, 290);
  const base = 230;
  const bar = (x, h, fill, label) => {
    s.rect(x, base - h, 60, h, { fill, color: 'accent', sw: 1.4, rx: 2 });
    s.text(x + 30, base + 16, label, { size: 12 });
  };
  bar(70, 160, 'accent', 'Supply');
  bar(150, 60, 'fill', 'Demand');
  bar(330, 70, 'accent', 'Supply');
  bar(410, 170, 'fill', 'Demand');
  s.line(40, base, 520, base, { sw: 1.4 });
  s.text(140, 268, 'Earlier', { size: 14, bold: true });
  s.text(400, 268, 'Now', { size: 14, bold: true });
  s.text(280, 24, 'Environmental resources and services (schematic)', { size: 13, muted: true });
  return s.visual('Schematic bar chart: earlier, the supply of environmental resources and services was much larger than the demand for them; now demand is much larger than the shrunken supply', 'Schematic only, with no real figures. The supply and demand of environmental resources have reversed.');
})();
const vIndia = table(
  ['Threat', 'Main causes', 'Who is hurt'],
  [
    ['Land degradation', 'Deforestation, overgrazing, agrochemicals, waterlogging', 'Farmers, through lower yields'],
    ['Loss of biodiversity', 'Shrinking forests and wetlands, poaching', 'Everyone: weaker life-support'],
    ['Air pollution', 'Vehicles, industry, power plants, burning waste', 'City dwellers\' health'],
    ['Water pollution', 'Sewage, industrial effluents, farm run-off', 'People who drink and fish'],
  ],
  'Table of threats to India\'s environment: land degradation, loss of biodiversity, air pollution and water pollution, with their main causes and who is hurt',
  'Stated qualitatively; no statistics.',
);
const vLand = flow('LR', ['Forests cut, pastures overgrazed', 'Soil left bare', 'Rain and wind erode topsoil', 'Yields fall'], 'Flow of land degradation: forests cut and pastures overgrazed leave soil bare, rain and wind erode topsoil, and yields fall', 'One path to land degradation');
const vWE2 = table(
  ['Cost (imagined family, a year)', 'Working', '₹'],
  [
    ['Medicines for stomach illness', '—', inr(WE2.medicine)],
    ['Wages lost', `${WE2.days} days × ₹${WE2.wage}`, inr(WE2_WAGES)],
    ['Water filter and boiling fuel', '—', inr(WE2.filter)],
    ['**Total cost of dirty water**', '', `**${inr(WE2_TOTAL)}**`],
  ],
  `Table of the yearly cost of dirty water to an imagined family: ${inr(WE2.medicine)} rupees of medicines, ${inr(WE2_WAGES)} rupees of lost wages and ${inr(WE2.filter)} rupees on filtering, a total of ${inr(WE2_TOTAL)} rupees`,
  'This money could have gone to food or school fees: its opportunity cost.',
);
const vWarming = flow('LR', ['Burning coal, oil and gas; cutting forests', 'More greenhouse gases in the air', 'More heat trapped near the surface', 'Melting ice, rising seas, extreme weather'], 'Flow of global warming: burning fossil fuels and cutting forests add greenhouse gases, which trap more heat, leading to melting ice, rising seas and extreme weather', 'How global warming happens');
const vTreaties = table(
  ['Agreement', 'Year', 'Deals with'],
  [
    ['Montreal Protocol', '1987', 'Phasing out ozone-depleting substances such as CFCs'],
    ['Kyoto Protocol', '1997', 'Emission cuts for industrialised countries'],
    ['Paris Agreement', '2015', 'National plans by all countries to limit warming'],
  ],
  'Table of international agreements: the Montreal Protocol of 1987 on ozone-depleting substances, the Kyoto Protocol of 1997 on emission cuts for industrialised countries, and the Paris Agreement of 2015 on national plans to limit warming',
);
const vOzone = flow('LR', ['CFCs and halons released', 'They reach the stratosphere', 'Ozone molecules broken down', 'More ultraviolet rays reach the earth', 'Skin cancer, cataract, harm to plankton'], 'Flow of ozone depletion: CFCs and halons reach the stratosphere, break down ozone, more ultraviolet rays reach the earth, causing skin cancer, cataract and harm to plankton', 'How the ozone layer thins');
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Environment', 'All biotic and abiotic elements together'],
    ['Four functions', 'Supply resources, assimilate waste, sustain life, aesthetic services'],
    ['Limits', 'Absorptive capacity; carrying capacity needs both conditions'],
    ['Crisis', 'Demand for environmental resources now exceeds supply'],
    ['India', 'Land degradation, biodiversity loss, air and water pollution; opportunity costs'],
    ['Global', 'Global warming (greenhouse gases) and ozone depletion (CFCs)'],
  ],
  'Summary table of Part 1: the environment, its four functions, its limits, the crisis, threats in India and global problems',
);
const vSD = flow('LR', ['Present generation meets its needs', 'Resources and absorptive capacity kept intact', 'Future generations can meet their needs'], 'Flow of sustainable development: the present generation meets its needs while keeping resources and absorptive capacity intact, so future generations can meet theirs', 'The idea behind sustainable development');
const vWhyIndia = table(
  ['Reason', 'Why it matters in India'],
  [
    ['Large population', 'Many people depend directly on land, water and forests'],
    ['Costs of damage', 'Health spending and lost output slow development'],
    ['Fairness to the future', 'Children should inherit usable resources'],
  ],
  'Table of reasons sustainable development matters for India: a large population dependent on natural resources, the costs of damage, and fairness to future generations',
);
const vDaly = table(
  ['Principle (paraphrased)', 'What it means in practice'],
  [
    ['Population within carrying capacity', 'Numbers the environment can support'],
    ['Input-efficient technology', 'More output from fewer resources'],
    ['Renewables: harvest within regeneration', 'Catch, fell or pump no more than nature replaces'],
    ['Non-renewables: deplete no faster than substitutes appear', 'Build solar or wind as coal is used up'],
    ['Correct pollution', 'Treat waste; fix inefficiencies'],
  ],
  'Table of Herman Daly\'s principles of sustainable development, paraphrased: population within carrying capacity, input-efficient technology, harvesting renewables within regeneration, depleting non-renewables no faster than substitutes appear, and correcting pollution',
);
const vWE3 = table(
  ['Step', 'Working (imagined village bamboo grove)', 'Result'],
  [
    ['1. Sustainable limit', 'Equal to yearly regrowth', `${inr(WE3.regrow)} poles`],
    ['2. Present demand', 'Poles cut now', `${inr(WE3.demand)} poles`],
    ['3. Cut needed', `${inr(WE3.demand)} − ${inr(WE3.regrow)}`, `${WE3_CUT} poles`],
    ['4. As a percentage', `${WE3_CUT} ÷ ${inr(WE3.demand)} × 100`, `${WE3_PCT} per cent`],
  ],
  `Table of an imagined bamboo grove: it regrows ${inr(WE3.regrow)} poles a year, ${inr(WE3.demand)} are cut, so cutting must fall by ${WE3_CUT} poles, or ${WE3_PCT} per cent`,
  'Daly: harvest renewables no faster than they regenerate.',
);
const vEnergy = table(
  ['Source', 'How it works', 'Best suited to'],
  [
    ['Solar (photovoltaic)', 'Cells turn sunlight into electricity', 'Rooftops, schools, remote villages'],
    ['Wind', 'Turbines turn wind into electricity', 'Windy coasts and ridges'],
    ['Mini-hydel', 'Small turbines on stream flow', 'Hilly areas, nearby villages'],
  ],
  'Table of non-conventional energy sources: solar photovoltaic cells for rooftops and remote villages, wind turbines for windy coasts and ridges, and mini-hydel plants on streams in hilly areas',
);
const vBiogas = flow('LR', ['Cattle dung and farm waste', 'Gobar gas plant', 'Gas for cooking and lighting', 'Slurry used as manure'], 'Flow of a gobar gas plant: cattle dung and farm waste go into the plant, which gives gas for cooking and lighting and slurry used as manure', 'Nothing is wasted');
const vFuels = table(
  ['Switch', 'Where', 'Gain'],
  [
    ['Firewood → LPG or gobar gas', 'Rural kitchens', 'Less smoke indoors; fewer trees cut'],
    ['Diesel → CNG', 'City buses and autos', 'Cleaner city air'],
  ],
  'Table of cleaner fuel switches: from firewood to LPG or gobar gas in rural kitchens, with less smoke and fewer trees cut, and from diesel to CNG in city transport, with cleaner air',
);
const vWE4 = (() => {
  const s = new Svg(560, 300);
  const ch = s.chart({ x0: 0, x1: 6, y0: 0, y1: 160000, left: 80, top: 30, width: 420, height: 210, xLabel: 'Year', yLabel: 'Cumulative saving (₹)' });
  for (let y = 1; y <= 5; y++) {
    const v = WE4_SAVE * y;
    const x0 = ch.X(y - 0.3), x1 = ch.X(y + 0.3);
    s.rect(x0, ch.Y(v), x1 - x0, ch.Y(0) - ch.Y(v), { fill: y >= WE4_YEARS ? 'accent' : 'fill', color: 'accent', sw: 1.3, rx: 2 });
    ch.xTick(y, String(y));
  }
  ch.seg([0, WE4.cost], [6, WE4.cost], { dash: true, sw: 1.6 });
  ch.label([0.6, WE4.cost], `Cost ₹${inr(WE4.cost)}`, { dy: -12, size: 12, anchor: 'start' });
  ch.yTick(60000, '60,000').yTick(120000, '1,20,000');
  return s.visual(`Bar chart of cumulative savings from imagined solar panels: ${inr(WE4_SAVE)} rupees a year, reaching the cost of ${inr(WE4.cost)} rupees, shown as a dashed line, in year ${WE4_YEARS}`, `Imagined figures: saving ₹${inr(WE4_SAVE)} a year; payback in ${WE4_YEARS} years.`);
})();
const vTraditional = table(
  ['Area', 'Traditional practice', 'Why it is sustainable'],
  [
    ['Farming', 'Mixed cropping, natural manure', 'Soil stays fertile; fewer pests'],
    ['Health', 'Medicinal plants', 'Local, low-waste remedies'],
    ['Housing', 'Local materials, climate-suited design', 'Less energy for cooling or heating'],
    ['Water', 'Tanks, step-wells, check dams', 'Rainwater stored and recharged'],
  ],
  'Table of traditional practices that support sustainability: mixed cropping and manure in farming, medicinal plants in health, local materials in housing, and tanks and step-wells for water',
);
const vBio = flow('TB', ['Organic farming without chemicals', 'Biocomposting: earthworms turn waste into manure', 'Biopest control: neem, owls, snakes, birds', 'Healthy soil, safe food, clean water'], 'Diagram: organic farming without chemicals rests on biocomposting, where earthworms turn waste into manure, and biopest control with neem and predators such as owls, snakes and birds, giving healthy soil, safe food and clean water', 'Replacing chemicals with nature', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n3', to: 'n4' },
]);
const vBalance = flow('LR', ['Growth', 'Clean energy and efficient technology', 'Harvest within regeneration', 'Development that lasts'], 'Flow from growth through clean energy, efficient technology and harvesting within regeneration to development that lasts', 'Growth and care can go together');
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Sustainable development', 'Meet present needs without harming the future\'s ability to meet theirs'],
    ['Daly\'s principles', 'Population within capacity; efficient technology; harvest within regeneration; substitutes for non-renewables; correct pollution'],
    ['Energy', 'Solar, wind, mini-hydel'],
    ['Fuels', 'LPG and gobar gas in villages; CNG in cities'],
    ['Other strategies', 'Traditional knowledge, biocomposting, biopest control'],
  ],
  'Summary table of Part 2: sustainable development, Daly\'s principles, clean energy, cleaner fuels and other strategies',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Environment and Sustainable Development — Part 1: The Environment and its Limits',
  goals: [
    'Explain what the environment is and the four functions it performs',
    'Distinguish absorptive capacity, carrying capacity, and renewable and non-renewable resources',
    'Explain why environmental demand now exceeds supply, and the threats to India\'s environment and their costs',
    'Explain the causes and effects of global warming and ozone depletion and the international response',
  ],
  slides: [
    sl('title', 'Environment and Sustainable Development', {
      b: 'Part 1 — the **environment**, its **functions** and **limits**, and the problems of **India** and the **world**.',
      v: vRoute1,
      n: 'Every product we use, from a notebook to a mobile phone, begins with something taken from nature, and ends as waste that nature must absorb. For a long time economists treated nature as free and unlimited. In this chapter we see why that is no longer possible. Part 1 explains what the environment does for us, where its limits lie, and the problems we face in India and across the world.',
    }),
    sl('concept', 'What is the environment?', {
      b: 'The environment is the **total planetary inheritance**: all **biotic** (living) and **abiotic** (non-living) elements and resources.',
      v: vBiotic,
      n: 'Economists use the word environment for everything around us that we inherit, living and non-living. Plants, animals, micro-organisms and people are the biotic elements. Air, water, sunlight and soil minerals are the abiotic ones. They work together: plants need sunlight and water, and animals need plants. When one part is damaged, the others feel it too.',
    }),
    sl('diagram', 'Four functions of the environment', {
      v: vFunctions,
      n: 'The environment does four jobs for us. It supplies resources, such as timber, water and minerals. It assimilates waste, quietly breaking down what we throw away. It sustains life by providing the variety of genes and species that keeps ecosystems working. And it gives aesthetic services, the beauty of a river or a mountain that we enjoy. Learn these four by name, because examiners often ask for them.',
    }),
    sl('check', 'Quick check: living or non-living?', {
      b: 'Water, air and soil minerals: are they biotic elements of the environment?',
      chk: 'tf_biotic',
      n: 'Ask whether each of them is alive. If not, which word describes it?',
    }),
    sl('concept', 'Renewable and non-renewable resources', {
      v: vRenew,
      n: 'Resources come in two kinds. Renewable resources, such as forests, fish and groundwater, are replenished by nature, so they can last for ever if we use them carefully. Non-renewable resources, such as coal and petroleum, took millions of years to form and are gone once used. Notice the warning in the last row: even a renewable resource can be exhausted if we use it faster than nature can replace it.',
    }),
    sl('check', 'Quick check: enjoying the view', {
      b: 'Tourists visit an imagined hill station only for its waterfalls and views. Which function do they use?',
      chk: 'm_function_aesthetic',
      n: 'Nothing is taken away and no waste is absorbed. What are the tourists getting from nature?',
    }),
    sl('diagram', 'Absorptive and carrying capacity', {
      b: '**Absorptive capacity**: the ability to absorb degradation. **Carrying capacity**: both conditions below hold.',
      v: vCapacity,
      n: 'Two limits matter. Absorptive capacity is how much waste and pollution the environment can take in without lasting harm. Carrying capacity is the bigger idea: the environment can keep supporting life only if we extract resources no faster than they regenerate, and keep our waste within the absorptive capacity. Break either condition, and the environment slowly loses its power to support us.',
    }),
    sl('example', 'Worked example 1: is this forest used sustainably?', {
      b: `An imagined forest holds ${inr(WE1.stock)} tonnes of timber. It regrows ${inr(WE1.regrow)} tonnes a year; ${inr(WE1.fell)} tonnes are felled.`,
      bl: [
        'Step 1 — Compare felling with regrowth.',
        'Step 2 — Find the net loss a year.',
        'Step 3 — Divide the stock by the net loss.',
        'Step 4 — State the sustainable limit.',
      ],
      v: vWE1,
      n: `Felling of ${inr(WE1.fell)} tonnes is more than the regrowth of ${inr(WE1.regrow)}, so the forest shrinks by ${inr(WE1_LOSS)} tonnes every year. At that rate the stock of ${inr(WE1.stock)} tonnes lasts only ${WE1_YEARS} years. To use the forest sustainably, felling must come down to the regrowth, ${inr(WE1.regrow)} tonnes a year. This is the carrying-capacity rule in numbers.`,
    }),
    sl('check', 'Quick check: too many cattle', {
      b: 'A village pasture can feed 120 cattle without damage, but villagers keep 150. Find the excess.',
      chk: 'n_pasture',
      n: 'Compare the number of animals with what the pasture can carry, and find the difference.',
    }),
    sl('diagram', 'Why a crisis now? Supply and demand reversed', {
      v: vReversal,
      n: 'In earlier times there were fewer people and little industry, so nature supplied far more resources and waste-absorbing services than we demanded. Today the picture is reversed. Population growth, industrialisation and rising consumption have pushed demand above what the environment can supply, while overuse has shrunk that supply. This reversal is the heart of the environmental crisis.',
    }),
    sl('concept', 'Threats to India\'s environment', {
      b: 'India is rich in resources (fertile soil, rivers, forests, minerals), yet faces serious threats.',
      v: vIndia,
      n: 'India has fertile plains, great rivers, forests and minerals. Yet its environment faces four big threats. Land is degraded by deforestation, overgrazing and overuse of chemicals. Biodiversity is lost as forests and wetlands shrink. City air is polluted by vehicles and industry. Rivers and groundwater are polluted by sewage and factory waste. The poor, who depend most on nature, are often hurt first.',
    }),
    sl('diagram', 'One path to land degradation', {
      v: vLand,
      n: 'Here is how land degradation often happens. Trees are cut and pastures are overgrazed, so the soil is left bare. Rain and wind then carry away the fertile topsoil, and yields fall. Other causes include shifting cultivation without enough fallow time, too much fertiliser and pesticide, and poor drainage that leaves fields waterlogged and salty.',
    }),
    sl('example', 'Worked example 2: counting the cost of dirty water', {
      b: 'An imagined family drinks from a polluted well. What does the pollution cost it in a year?',
      bl: [
        'Step 1 — List every cost: health, lost work, protection.',
        'Step 2 — Convert lost days into rupees.',
        'Step 3 — Add the costs.',
        'Step 4 — Ask what else the money could have bought.',
      ],
      v: vWE2,
      n: `The family spends ${inr(WE2.medicine)} rupees on medicines. Its earner loses ${WE2.days} days of work at ${WE2.wage} rupees a day, which is ${inr(WE2_WAGES)} rupees. A filter and fuel for boiling cost ${inr(WE2.filter)} rupees more. The total is ${inr(WE2_TOTAL)} rupees a year. That money could have paid for food or school fees. This forgone use is the opportunity cost of environmental degradation.`,
    }),
    sl('diagram', 'Global warming', {
      b: 'A gradual rise in the **average temperature** of the earth\'s lower atmosphere.',
      v: vWarming,
      n: 'Global warming is the slow rise in the average temperature near the earth\'s surface. Burning coal, oil and gas, and cutting forests, add greenhouse gases such as carbon dioxide and methane to the air. These gases trap heat. The results include melting glaciers and polar ice, rising sea levels that threaten coasts, more extreme heat, floods and droughts, and the spread of tropical diseases.',
    }),
    sl('concept', 'The international response', {
      v: vTreaties,
      n: 'Because the atmosphere is shared, no country can solve these problems alone. In 1987 the Montreal Protocol began phasing out the chemicals that thin the ozone layer. In 1997 the Kyoto Protocol set emission cuts for industrialised countries. In 2015 the Paris Agreement asked every country to prepare its own plan to limit warming. Remember which agreement deals with which problem.',
    }),
    sl('diagram', 'Ozone depletion', {
      b: 'The **ozone layer** in the stratosphere filters out harmful **ultraviolet** rays.',
      v: vOzone,
      n: 'High above us, the ozone layer acts like a sunscreen for the planet. Chemicals called chlorofluorocarbons and halons, once common in refrigerators, sprays and fire extinguishers, rise into the stratosphere and break ozone down. More ultraviolet rays then reach the ground, causing skin cancer and cataract in people and harming plankton at the base of ocean food chains.',
    }),
    sl('check', 'Quick check: what thins the ozone layer?', {
      b: 'Which substances are mainly responsible for ozone depletion?',
      chk: 'm_ozone_cause',
      n: 'Do not confuse this with global warming. Think of the chemicals once used in refrigerators and spray cans.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. The environment is all living and non-living elements together. It supplies resources, absorbs waste, sustains life and gives aesthetic services. It has limits: absorptive capacity and carrying capacity. Demand for its services now exceeds supply, which is why India faces land, water, air and biodiversity problems, and the world faces global warming and ozone depletion.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the **four functions** exactly; give an example for each when asked.',
        'Carrying capacity needs **two** conditions: extraction within regeneration **and** waste within absorptive capacity.',
        'Do not mix up **global warming** (greenhouse gases) with **ozone depletion** (CFCs, halons).',
        'Agreements: **Montreal 1987** ozone; **Kyoto 1997** and **Paris 2015** climate.',
        'Opportunity cost: say what **else** the money could have been used for.',
        '5 marks: five distinct points (about 120 words), each with a reason.',
      ],
      n: 'A few tips for the exam. Name the four functions of the environment exactly. When you define carrying capacity, give both conditions. Never mix up global warming, caused by greenhouse gases, with ozone depletion, caused by chlorofluorocarbons and halons. Match each agreement to its problem. And when asked about the cost of degradation, explain what else the money could have been used for.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Environment and Sustainable Development — Part 2: Sustainable Development and its Strategies',
  goals: [
    'Explain the meaning of sustainable development and why it matters for India',
    'Explain Herman Daly\'s principles of sustainable development',
    'Explain strategies such as non-conventional energy, cleaner fuels, traditional knowledge, biocomposting and biopest control',
    'Evaluate how growth and care for the environment can go together',
  ],
  slides: [
    sl('title', 'Sustainable Development', {
      b: 'Part 2 — the **meaning** of sustainable development, **Daly\'s principles** and practical **strategies**.',
      v: vRoute2,
      n: 'In Part 1 we saw that our demands on nature have outgrown what it can supply. Does that mean development must stop? Not at all. In Part 2 we study sustainable development: growth that meets our needs today while leaving our children able to meet theirs. We will look at the principles behind it and at practical strategies that are already working in Indian villages and cities.',
    }),
    sl('concept', 'What is sustainable development?', {
      b: 'Development that meets **present needs** without reducing the ability of **future generations** to meet **their** needs (Brundtland Commission, 1987; paraphrased).',
      v: vSD,
      n: 'In 1987 a world commission, often called the Brundtland Commission, gave the idea that most people use today. In simple words, sustainable development lets the present generation meet its needs without reducing the ability of future generations to meet theirs. So it is not about stopping growth. It is about growing in a way that keeps resources and the environment\'s absorptive capacity intact.',
    }),
    sl('concept', 'Why it matters for India', {
      v: vWhyIndia,
      n: 'This idea matters especially for India. A very large number of people depend directly on land, water and forests, so damage to nature quickly becomes damage to livelihoods. Health spending and lost output caused by pollution slow down development itself. And fairness demands that our children inherit usable rivers, soil and forests, not exhausted ones.',
    }),
    sl('check', 'Quick check: does growth have to stop?', {
      b: 'True or false? Sustainable development means economic growth must stop.',
      chk: 'tf_sd_stop',
      n: 'Think about the definition. Does it say no growth, or growth of a particular kind?',
    }),
    sl('diagram', 'Herman Daly\'s principles', {
      v: vDaly,
      n: 'The economist Herman Daly suggested principles for sustainable development. Keep population within the carrying capacity. Use technology that gets more output from fewer inputs. Harvest renewable resources no faster than they regenerate. Use up non-renewable resources no faster than renewable substitutes are created. And correct the inefficiencies that come from pollution. Learn these in your own words.',
    }),
    sl('example', 'Worked example 3: setting a sustainable quota', {
      b: `An imagined village bamboo grove regrows ${inr(WE3.regrow)} poles a year, but villagers cut ${inr(WE3.demand)}.`,
      bl: [
        'Step 1 — The sustainable limit equals yearly regrowth.',
        'Step 2 — Compare it with present cutting.',
        'Step 3 — Find the cut needed, in poles and as a percentage.',
      ],
      v: vWE3,
      n: `Daly's rule for renewables says harvest no more than nature replaces. The grove regrows ${inr(WE3.regrow)} poles a year, so that is the limit. Villagers cut ${inr(WE3.demand)}, which is ${WE3_CUT} too many. As a share of present cutting, that is a cut of ${WE3_PCT} per cent. The village could meet the gap by planting more bamboo or by using other materials.`,
    }),
    sl('check', 'Quick check: coal and its substitutes', {
      b: 'A country uses up coal but builds solar and wind capacity just as fast. Which principle does it follow?',
      chk: 'm_daly_nonrenew',
      n: 'This rule is about non-renewable resources and what replaces them.',
    }),
    sl('concept', 'Strategy 1: non-conventional energy', {
      b: 'Most of India\'s electricity has come from coal-based thermal plants; cleaner sources reduce pollution.',
      v: vEnergy,
      n: 'Much of our electricity has come from burning coal, which pollutes the air and adds greenhouse gases. Non-conventional sources offer cleaner power. Photovoltaic cells turn sunlight directly into electricity. Wind turbines work well on windy coasts and ridges. Mini-hydel plants use the flow of hill streams to supply nearby villages without building huge dams.',
    }),
    sl('diagram', 'Strategy 2: cleaner fuels', {
      v: vFuels,
      n: 'Fuel choices matter too. In villages, many families have cooked on firewood and dung cakes, which fill kitchens with smoke and strip forests. Switching to LPG or to gobar gas reduces both problems. In cities, running buses and auto-rickshaws on compressed natural gas, or CNG, has helped reduce air pollution from vehicles.',
    }),
    sl('example', 'Worked example 4: does solar power pay?', {
      b: `An imagined health centre installs solar panels for ₹${inr(WE4.cost)}. They supply ${WE4.units} units a day on ${WE4.days} days a year; each unit saves ₹${WE4.tariff}.`,
      bl: [
        'Step 1 — Yearly saving = units a day × days × saving per unit.',
        'Step 2 — Payback period = cost ÷ yearly saving.',
        'Step 3 — Add the benefits that money does not measure.',
      ],
      v: vWE4,
      n: `Each year the panels save ${WE4.units} units for ${WE4.days} days at ${WE4.tariff} rupees a unit, that is ${inr(WE4_SAVE)} rupees. Dividing the cost of ${inr(WE4.cost)} rupees by this saving gives a payback of ${WE4_YEARS} years. After that the power is almost free. And there are gains money does not show: cleaner air and no fuel to buy.`,
    }),
    sl('diagram', 'How a gobar gas plant works', {
      v: vBiogas,
      n: 'A gobar gas plant is a good example of using waste as a resource. Cattle dung and farm waste go into a closed tank, where they produce gas for cooking and lighting. What is left, called slurry, is excellent manure for the fields. So the family gets clean fuel, the forest is spared, and the soil is fed.',
    }),
    sl('check', 'Quick check: benefits of biogas', {
      b: 'Which of these is NOT a benefit of switching from firewood to gobar gas?',
      chk: 'm_biogas',
      n: 'Three options are real benefits. Find the one that would harm the forest instead.',
    }),
    sl('concept', 'Strategy 3: traditional knowledge and practices', {
      v: vTraditional,
      n: 'For centuries, Indian communities developed practices suited to their local environment. Mixed cropping and natural manure kept soil fertile. Medicinal plants supported health care. Houses built from local materials stayed cool without electricity. Tanks and step-wells stored rainwater. Combining such knowledge with modern science can make development gentler on nature.',
    }),
    sl('diagram', 'Strategy 4: biocomposting and biopest control', {
      v: vBio,
      n: 'Organic farming replaces chemicals with nature. In biocomposting, earthworms turn farm and kitchen waste into rich manure quickly. In biopest control, farmers use neem-based sprays and rely on natural predators, such as owls, snakes and birds, that eat pests. The result is healthier soil, safer food and cleaner water, with less money spent on chemicals.',
    }),
    sl('check', 'Quick check: the role of earthworms', {
      b: 'In biocomposting, what do earthworms do?',
      chk: 'm_compost',
      n: 'Think of what happens to a heap of leaves and kitchen waste when earthworms are added.',
    }),
    sl('two-column', 'Growth and the environment: a balanced view', {
      cols: [
        '**Concerns**\n- Clean technology can cost more at first\n- Poor families need affordable fuel\n- Some damage cannot be undone',
        '**Ways forward**\n- Clean energy and efficient technology\n- Harvest within regeneration\n- Count environmental costs in decisions',
      ],
      v: vBalance,
      n: 'A balanced view admits real difficulties. Clean technology may cost more at first, and poor families need fuel they can afford. But some damage, such as lost species or exhausted aquifers, can never be undone, and pollution already costs us heavily. Growth and care for the environment can go together if we use clean energy, efficient technology and harvest within nature\'s limits.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Sustainable development meets today\'s needs without harming the future\'s ability to meet its own. Daly\'s principles turn this into rules about population, technology, renewables, non-renewables and pollution. Practical strategies include solar, wind and mini-hydel power, LPG, gobar gas and CNG, traditional knowledge, biocomposting and biopest control.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define sustainable development with **both** present and **future** generations.',
        'Daly\'s principles: write them in **your own words**; five are commonly asked.',
        'Strategies: name the strategy **and** say how it helps the environment.',
        'Numericals: **sustainable limit = regeneration**; payback = cost ÷ yearly saving.',
        'Evaluation questions: give **both sides**, then a reasoned judgement.',
      ],
      n: 'Some tips for this part. Always mention both present and future generations in the definition. Write Daly\'s principles in your own words. When you list strategies, say how each one helps the environment, because that explanation earns the mark. In numericals, the sustainable limit equals the rate of regeneration. And in evaluation questions, give both sides before your judgement.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Environment and Sustainable Development — notes',
  sections: [
    {
      h: '1. The environment and its functions',
      t: 1,
      b: 'The **environment** is the total planetary inheritance: all **biotic** elements (plants, animals, micro-organisms, people) and **abiotic** elements (air, water, sunlight, soil minerals) and the links between them.\n\n**Four functions**\n1. **Supplies resources**: renewable (forests, fish, groundwater) and non-renewable (coal, petroleum, ores).\n2. **Assimilates waste**: breaks down and absorbs what production and consumption throw away.\n3. **Sustains life**: genetic diversity and biodiversity keep ecosystems working.\n4. **Provides aesthetic services**: scenery, clean rivers, mountains that people enjoy.',
      terms: [
        ['Biotic elements', 'The living parts of the environment.'],
        ['Abiotic elements', 'The non-living parts of the environment, such as air, water and sunlight.'],
      ],
      v: vFunctions,
      vs: [vBiotic],
    },
    {
      h: '2. Limits: absorptive capacity, carrying capacity and the crisis',
      t: 1,
      b: '- **Absorptive capacity**: how much degradation (waste, pollution) the environment can take in and neutralise.\n- **Carrying capacity** is maintained only if (a) resources are **extracted within their rate of regeneration** and (b) **wastes stay within the absorptive capacity**.\n- **Renewable** resources last if used within regeneration; **non-renewable** ones run out with use.\n\n**Why there is a crisis now:** in earlier times, supply of environmental resources and services was far greater than demand. Population growth, industrialisation and higher consumption have **reversed** this: demand now exceeds supply, and overuse has reduced supply further.',
      terms: [
        ['Absorptive capacity', 'The ability of the environment to absorb degradation.'],
        ['Carrying capacity', 'The ability of the environment to keep supporting life, which holds when extraction stays within regeneration and waste within absorptive capacity.'],
        ['Renewable resource', 'A resource replenished by nature, exhausted only if used faster than it regenerates.'],
        ['Non-renewable resource', 'A resource exhausted by use, such as coal or petroleum.'],
      ],
      v: vCapacity,
      vs: [vRenew, vReversal],
    },
    {
      h: '3. State of India\'s environment and the cost of degradation',
      t: 1,
      b: 'India has rich soil, rivers, forests, minerals and biodiversity, but faces serious threats (stated here without statistics):\n- **Land degradation**: loss of forest cover, shifting cultivation without enough fallow, overgrazing, unsustainable fuelwood and fodder use, excessive agrochemicals, and poor irrigation management causing waterlogging and salinity.\n- **Loss of biodiversity** as forests and wetlands shrink.\n- **Air pollution**, mainly in cities, from vehicles, industry, thermal power and burning of waste.\n- **Water pollution** of rivers and groundwater from sewage, industrial effluents and farm run-off.\n\n**Opportunity cost:** spending on treating pollution-related illness, on lost workdays and on cleaning rivers or reclaiming land is money not available for schools, roads or jobs. India set up pollution control boards (the Central Pollution Control Board dates from 1974) to monitor and regulate pollution.',
      terms: [
        ['Land degradation', 'A fall in the quality and productivity of land through erosion, salinity, waterlogging or chemical damage.'],
        ['Opportunity cost of degradation', 'The best alternative use of the money and resources spent on coping with environmental damage.'],
      ],
      v: vIndia,
      vs: [vLand, vWE2],
    },
    {
      h: '4. Global warming and ozone depletion',
      t: 1,
      b: '**Global warming:** a gradual rise in the average temperature of the earth\'s lower atmosphere, caused by more **greenhouse gases** (carbon dioxide, methane and others) from burning fossil fuels and from deforestation. Likely effects: melting glaciers and polar ice, rising sea levels, more extreme weather, damage to farming, and the spread of tropical diseases.\n\n**Ozone depletion:** thinning of the ozone layer in the stratosphere, mainly by **chlorofluorocarbons (CFCs)** and **halons**. More ultraviolet radiation then reaches the earth, raising the risk of skin cancer and cataract and harming plankton and crops.\n\n**International response:** Montreal Protocol (1987) on ozone-depleting substances; Kyoto Protocol (1997) on emission cuts by industrialised countries; Paris Agreement (2015), under which every country prepares its own plan to limit warming.',
      terms: [
        ['Greenhouse gases', 'Gases such as carbon dioxide and methane that trap heat in the atmosphere.'],
        ['Ozone layer', 'A layer in the stratosphere that filters out most ultraviolet radiation.'],
      ],
      v: vWarming,
      vs: [vOzone, vTreaties],
    },
    {
      h: '5. Sustainable development and Daly\'s principles',
      t: 2,
      b: '**Meaning (paraphrasing the Brundtland Commission, 1987):** development that meets the needs of the present generation without reducing the ability of future generations to meet their own needs. It does not mean zero growth; it means growth that respects carrying capacity.\n\n**Herman Daly\'s principles (paraphrased):**\n1. Keep population at a level within the carrying capacity.\n2. Make technology **input-efficient**, not input-consuming.\n3. Harvest **renewable** resources no faster than they regenerate.\n4. Deplete **non-renewable** resources no faster than renewable substitutes are created.\n5. Correct the inefficiencies caused by pollution.',
      terms: [
        ['Sustainable development', 'Development that meets present needs while leaving future generations able to meet theirs.'],
        ['Input-efficient technology', 'Technology that produces more output from fewer resources.'],
      ],
      v: vSD,
      vs: [vDaly, vWE3],
    },
    {
      h: '6. Strategies for sustainable development',
      t: 2,
      b: '- **Non-conventional energy:** solar photovoltaic cells, wind turbines and **mini-hydel** plants on hill streams.\n- **Cleaner fuels:** **LPG** and **gobar gas** in rural kitchens (less smoke, fewer trees cut; slurry as manure); **CNG** in urban transport (cleaner air).\n- **Traditional knowledge:** mixed cropping and manure in farming, medicinal plants, climate-suited housing, tanks and step-wells for water.\n- **Biocomposting:** earthworms and composting turn organic waste into manure.\n- **Biopest control:** neem-based sprays and natural predators (owls, snakes, birds) instead of chemical pesticides.\n\nGrowth and care for the environment can go together when costs of degradation are counted and resources are used within nature\'s limits.',
      terms: [
        ['Mini-hydel plant', 'A small hydroelectric plant using the flow of a stream to supply nearby areas.'],
        ['Biopest control', 'Controlling pests with plant products and natural predators instead of chemicals.'],
        ['Biocomposting', 'Turning organic waste into manure, often with earthworms.'],
      ],
      v: vEnergy,
      vs: [vFuels, vBiogas, vWE4, vTraditional, vBio],
    },
  ],
  tips: '**Common mistakes**\n- Listing three functions of the environment instead of four, or leaving out **aesthetic services**.\n- Giving only one condition for **carrying capacity**.\n- Saying renewable resources can never run out: they can, if used faster than they regenerate.\n- Mixing up global warming (greenhouse gases) and ozone depletion (CFCs, halons), or the agreements for each.\n- Defining sustainable development without mentioning **future generations**.\n- Naming a strategy without explaining **how** it helps.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 3 marks: three distinct points (about 60–80 words).\n- 5 marks: five points, each explained (about 100–120 words); evaluation questions need both sides and a judgement.\n\n**Data in SOYL practice** are imagined; check every figure in a case before you calculate.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Environment** (economics)', 'The total planetary inheritance: all **biotic** and **abiotic** elements together.', 'definition', 1],
  ['Biotic vs abiotic', 'Biotic: living (plants, animals, microbes). Abiotic: non-living (air, water, sunlight, minerals).', 'concept', 1],
  ['Four functions of the environment', 'Supplies resources; assimilates waste; sustains life (biodiversity); aesthetic services.', 'concept', 1],
  ['A wetland absorbing a town\'s sewage shows which function?', '**Assimilation of waste**.', 'example', 1],
  ['**Absorptive capacity**', 'Ability of the environment to absorb **degradation** such as pollution.', 'definition', 1],
  ['**Carrying capacity**: two conditions', 'Extraction **within regeneration**; waste **within absorptive capacity**.', 'concept', 1],
  ['Can a renewable resource be exhausted?', '**Yes**, if used faster than it regenerates (e.g. groundwater).', 'exam-tip', 1],
  ['Examples of non-renewable resources', 'Coal, petroleum, natural gas, metal ores.', 'fact', 1],
  ['Why is there an environmental crisis now?', 'Demand for environmental resources and services now **exceeds supply**: a reversal.', 'concept', 1],
  ['Causes of land degradation', 'Deforestation, overgrazing, shifting cultivation, agrochemicals, waterlogging and salinity.', 'concept', 1],
  ['Main sources of urban air pollution', 'Vehicles, industry, thermal power, burning of waste.', 'fact', 1],
  ['**Opportunity cost** of degradation', 'Money spent on illness and clean-up that could have gone to other development.', 'definition', 1],
  ['**Global warming**', 'Rise in the average temperature of the lower atmosphere due to more **greenhouse gases**.', 'definition', 1],
  ['Two causes of global warming', 'Burning fossil fuels; deforestation.', 'concept', 1],
  ['Three effects of global warming', 'Melting ice and rising seas; extreme weather; spread of tropical diseases.', 'concept', 1],
  ['What thins the ozone layer?', '**CFCs** and **halons**.', 'fact', 1],
  ['Effects of ozone depletion', 'More UV radiation: skin cancer, cataract, harm to plankton and crops.', 'concept', 1],
  ['**Montreal Protocol** (1987)', 'Phase-out of ozone-depleting substances.', 'fact', 1],
  ['**Kyoto Protocol** (1997) and **Paris Agreement** (2015)', 'Climate agreements: emission cuts for industrialised countries; national plans by all countries.', 'fact', 1],
  ['**Sustainable development**', 'Meet present needs without reducing the ability of **future generations** to meet theirs.', 'definition', 2],
  ['Who popularised this definition, and when?', 'The **Brundtland Commission**, **1987**.', 'fact', 2],
  ['Daly: renewable resources', 'Harvest **no faster than they regenerate**.', 'concept', 2],
  ['Daly: non-renewable resources', 'Deplete **no faster than renewable substitutes** are created.', 'concept', 2],
  ['Daly: technology', 'Should be **input-efficient**, not input-consuming.', 'concept', 2],
  ['Non-conventional energy sources', 'Solar (photovoltaic), wind, mini-hydel.', 'fact', 2],
  ['Why gobar gas in villages?', 'Clean cooking fuel, fewer trees cut, less smoke, slurry as manure.', 'concept', 2],
  ['Why CNG in city transport?', 'Burns cleaner than diesel: less air pollution.', 'concept', 2],
  ['**Biopest control**', 'Neem sprays and natural predators (owls, snakes, birds) instead of chemical pesticides.', 'definition', 2],
  ['**Biocomposting**', 'Turning organic waste into manure, often with earthworms.', 'definition', 2],
  ['Sustainable limit in a numerical', 'Equal to the **rate of regeneration**.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Environment and Sustainable Development',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_function_assim', 'm_gw_cause', 'm_sd_def', 'ar_renew'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_absorb_carry', 's_cng_lpg', 's3_crisis'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_gw', 'l_strategies'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_kesarpur'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Environment and Sustainable Development',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_absorptive', 'm_crisis', 'm_land_degr', 'm_ozone_harm', 'm_opp_cost', 'm_daly', 'm_biopest', 'm_traditional', 'ar_cfc', 'ar_solar'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_functions', 's_daly_two', { attempt: 1, keys: ['s_renew_nonrenew', 's_biocompost'] }, 's3_land', { attempt: 1, keys: ['s3_nonconv', 's3_sd_why'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_india_env', { attempt: 1, keys: ['l_daly', 'l_sd_eval'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage or table and answer all parts. Part (c) of each has an internal choice.', items: ['cb_lake', 'cb_fishing'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (environment, functions, capacities, crisis, India, global warming and ozone) and t02 (sustainable development, Daly, strategies) of cbse-12-economics-ch12 only',
    originality: 'every case, report, table and figure written for this chapter (imagined towns, villages, coasts and figures, labelled); no NCERT text, exercise or board/sample-paper item reused; the Brundtland definition and Daly principles are paraphrased',
    data: `imagined figures computed by the build (forest ${inr(WE1_LOSS)} t net loss, ${WE1_YEARS} years; dirty-water cost ₹${inr(WE2_TOTAL)}; bamboo cut ${WE3_PCT} per cent; solar payback ${WE4_YEARS} years; question-bank figures asserted in questions.mjs)`,
    facts: 'Montreal Protocol 1987, Kyoto Protocol 1997, Paris Agreement 2015, Brundtland Commission 1987, Central Pollution Control Board 1974 (notes only); no Indian environmental statistics stated',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
