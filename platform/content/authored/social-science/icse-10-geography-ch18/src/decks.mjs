// ICSE 10 Geography ch18 Waste Management — two decks: Part 1 (t01–t03) impact of waste accumulation, the need for waste
// management, and the key terms global warming, acid rain, eutrophication, thermal pollution and biomagnification; Part 2
// (t04–t05) segregation, dumping and sanitary landfills, composting, and reduce–reuse–recycle, with illustrative household
// and food-chain figures computed from svgs.mjs.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { WASTEBAR, LANDFILL, COMPOST, BIOMAG, HOUSE, kg, houseTotal, share, recyclableKg, ppm } from './svgs.mjs';

const V = {
  bar: svgV(WASTEBAR, 'Bar chart of the illustrative daily waste of one household by kind'),
  fill: svgV(LANDFILL, 'Cross-section of a sanitary landfill with liner, waste cells, leachate pipe, gas vent and cap'),
  comp: svgV(COMPOST, 'Compost pit filled in alternating layers of dry leaves, kitchen waste and soil'),
  bio: svgV(BIOMAG, 'Food chain with a persistent pesticide becoming more concentrated at each step'),
};
const BIRD = ppm('Fish-eating bird');
const PLANK = ppm('Plankton');
const factor = BIRD / PLANK;
const wetKg = kg('Kitchen and garden (wet)');
const saved = Math.round(((wetKg + recyclableKg()) / houseTotal()) * 100);

export const deck1 = deck({
  part: 1,
  title: 'Waste Management — Part 1: Impact of waste and key environmental terms',
  goals: [
    'Explain three harmful effects of accumulated waste with local examples',
    'Explain why waste management is essential in growing Indian cities',
    'Define global warming, acid rain, eutrophication, biomagnification and thermal pollution, with one cause and one effect of each',
  ],
  slides: [
    sl('title', 'Where does it all go?', {
      b: 'Part 1 — Every home, market, factory and hospital produces **waste**. When it piles up uncollected or is dumped carelessly, it spoils the landscape, pollutes air, water and soil, and spreads disease. Waste also links to wider problems such as global warming and polluted lakes.',
      v: table(['Source', 'Examples of waste'], [['Households', 'Food scraps, paper, plastic, glass, old batteries'], ['Markets', 'Vegetable waste, packaging'], ['Industries', 'Ash, slag, chemicals, hot water'], ['Hospitals', 'Used syringes, dressings (biomedical waste)'], ['Farms', 'Crop residue, pesticide containers']], 'Table of sources of waste with examples'),
      n: 'Namaste! Every kitchen, shop, factory and hospital throws something away. Some waste rots quickly, some lasts for centuries, and some is poisonous. If it is not collected and handled safely, it piles up, smells, pollutes and spreads disease. In this part we look at the harm caused by waste, why we must manage it, and five key environmental terms.',
    }),
    sl('concept', 'Spoilt landscapes and pollution', {
      b: '**Spoilage of the landscape:** heaps of garbage along roads, railway tracks and riverbanks, and huge **dumping grounds** such as Ghazipur in Delhi and Deonar in Mumbai, which rise like hills and ruin the scenery. **Water pollution:** rainwater seeping through waste forms **leachate**, which carries chemicals into groundwater and streams; plastic bags **clog drains**, worsening urban floods. **Air pollution:** burning garbage gives off smoke and toxic gases; rotting waste releases **methane**, which can catch fire. **Soil pollution:** plastics, batteries and chemicals poison the soil.',
      v: table(['Effect', 'How waste causes it'], [['Ugly landscape', 'Roadside heaps, giant dumps'], ['Water pollution', 'Leachate; drains clogged by plastic'], ['Air pollution', 'Burning garbage; methane fires'], ['Soil pollution', 'Plastics, batteries, chemicals']], 'Table of four harmful effects of waste and their causes'),
      n: 'Uncollected waste spoils the look of our towns, from roadside heaps to dumps that rise like hills on the edge of big cities. Rain seeping through the rubbish forms a dirty liquid called leachate that poisons wells and streams. Plastic bags block drains, so streets flood. Burning garbage fills the air with smoke, and rotting waste gives off methane, which can catch fire.',
    }),
    sl('concept', 'Health hazards', {
      b: 'Garbage heaps are breeding grounds for **flies, mosquitoes and rats**, which spread **cholera, typhoid, diarrhoea, dengue, malaria** and other diseases. Smoke from burning waste causes **breathing problems**. **Waste pickers** risk cuts, infections and poisoning from sharp, hazardous and biomedical waste. Stray **cattle** eat plastic bags and fall ill. After floods, rotting garbage and stagnant water raise the risk of epidemics — poor sanitation was one factor behind the plague outbreak in **Surat** in 1994.',
      v: table(['Hazard', 'Example'], [['Disease carriers', 'Flies, mosquitoes, rats'], ['Water-borne disease', 'Cholera, typhoid'], ['Breathing problems', 'Smoke from burning waste'], ['Injury and poisoning', 'Waste pickers handling sharp or toxic waste'], ['Harm to animals', 'Cattle eating plastic']], 'Table of health hazards caused by waste'),
      n: 'Garbage heaps breed flies, mosquitoes and rats, which spread diseases such as cholera, typhoid, dengue and malaria. Smoke from burning rubbish harms the lungs. People who pick through waste for a living risk cuts, infections and poisoning. Even cattle suffer when they swallow plastic bags. After floods, rotting garbage can help epidemics break out, as happened in Surat in nineteen ninety four.',
    }),
    sl('check', 'Quick check: impact of waste', {
      b: 'Link waste to a harmful effect.',
      n: 'Quick check. Leachate from dumps pollutes groundwater, and garbage heaps breed disease carriers.',
      chk: 'imp-chk',
    }),
    sl('concept', 'Why waste management is essential', {
      b: '**Growing cities produce more waste:** urban population and incomes are rising, and with them packaging and consumption. **Land is scarce:** cities are running out of space for dumps. **Public health:** proper collection and disposal prevent epidemics. **Clean environment:** protects rivers, groundwater, soil and air. **Resources:** waste contains valuable paper, metals, plastics and compost. **Jobs:** collection, recycling and composting employ many people. **Rules and missions:** the **Swachh Bharat Mission** (launched 2014) and the **Solid Waste Management Rules, 2016** require segregation at source (as of the early 2020s).',
      v: table(['Reason', 'Explanation'], [['More waste', 'Rising urban population and consumption'], ['Scarce land', 'No space for new dumps'], ['Health', 'Prevent epidemics'], ['Environment', 'Protect water, soil, air'], ['Resources and jobs', 'Recycling, compost, employment']], 'Table of reasons why waste management is needed'),
      n: 'Indian cities are growing fast, and people are buying more packaged goods, so the amount of waste keeps rising while land for dumps runs out. Managing waste properly protects health and keeps rivers, wells and air clean. It also recovers valuable materials such as paper, metal and compost and gives work to many people. National missions and rules now require every home to separate its waste.',
    }),
    sl('example', 'Worked example: trouble at a city dump', {
      b: '**Problem.** A large open dump on the edge of a city has grown into a hill of garbage. Explain three ways in which it harms the people living nearby.\n\n**Step 1. Water:** rain seeps through the waste and forms leachate, which pollutes wells and groundwater.\n\n**Step 2. Air:** rotting waste releases methane; fires break out and fill the area with smoke and foul smells.\n\n**Step 3. Health:** flies, mosquitoes and rats breed in the heap and spread disease; sometimes slopes of the heap collapse.',
      v: flow('LR', [['a', 'Open dump'], ['b', 'Leachate into groundwater'], ['c', 'Methane, fires, smoke'], ['d', 'Flies, rats, disease'], ['e', 'Harm to nearby residents']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['b', 'e'], ['c', 'e'], ['d', 'e']], 'Flow showing how an open dump harms nearby residents through water, air and disease'),
      n: 'An open dump harms its neighbours in three main ways. Rain soaks through the rubbish and carries poisons into wells as leachate. Rotting waste gives off methane, so fires break out and smoke and smells drift over homes. And flies, mosquitoes and rats breed in the heap and spread disease. Sometimes parts of a garbage hill even collapse.',
    }),
    sl('check', 'Quick check: need for management', {
      b: 'Explain why cities must manage waste.',
      n: 'Quick check. More waste, scarce land and risks to health make waste management essential.',
      chk: 'need-chk',
    }),
    sl('concept', 'Global warming and acid rain', {
      b: '**Global warming:** a rise in the average temperature of the Earth because **greenhouse gases** (carbon dioxide, methane, nitrous oxide) trap heat. **Causes:** burning coal, oil and gas; deforestation; **methane from landfills**, flooded paddy fields and cattle. **Effects:** melting Himalayan glaciers, rising sea level threatening low coasts and islands such as the Sundarbans and Lakshadweep, more extreme heat waves and floods. **Acid rain:** rain made acidic when **sulphur dioxide and nitrogen oxides** from power stations, factories and vehicles mix with water vapour. **Effects:** corrodes buildings and monuments (marble yellows and pits), harms forests and crops, acidifies lakes and kills fish.',
      v: table(['Term', 'One cause', 'One effect'], [['Global warming', 'Greenhouse gases from fuels, landfills', 'Melting glaciers, rising sea level'], ['Acid rain', 'Sulphur dioxide, nitrogen oxides', 'Corroded monuments, dead lakes']], 'Table of a cause and an effect of global warming and acid rain'),
      n: 'Global warming is the slow rise in the Earth’s average temperature as gases such as carbon dioxide and methane trap heat. Burning fuels, cutting forests and rotting waste in landfills all add these gases. Glaciers melt and the sea rises. Acid rain forms when sulphur and nitrogen gases from chimneys and exhausts mix with rain. It eats into marble, harms forests and kills fish in lakes.',
    }),
    sl('concept', 'Eutrophication', {
      b: '**Eutrophication** is the over-enrichment of a lake or slow river with **nutrients** — mainly **nitrates and phosphates** from fertiliser run-off, **untreated sewage** and detergents. The nutrients cause a rapid growth of **algae** (algal bloom) and water weeds. When they die, bacteria decompose them and use up the **dissolved oxygen**, so fish and other animals die and the water stinks. Urban lakes that receive sewage, such as Bellandur in Bengaluru, have suffered in this way.',
      v: flow('LR', [['a', 'Fertiliser run-off, sewage'], ['b', 'Excess nitrates, phosphates'], ['c', 'Algal bloom'], ['d', 'Algae die and decay'], ['e', 'Oxygen used up; fish die']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of eutrophication from nutrient inputs to algal bloom, decay, oxygen loss and fish death'),
      n: 'Eutrophication happens when a lake receives too many nutrients, mostly nitrates and phosphates from farm fertilisers, sewage and detergents. Algae grow wildly and cover the water. When the algae die, bacteria break them down and use up the oxygen in the water, so fish suffocate and the lake begins to smell. Many city lakes that receive sewage have suffered this fate.',
    }),
    sl('concept', 'Thermal pollution', {
      b: '**Thermal pollution** is the harmful rise in the temperature of a river, lake or sea when **hot water** from thermal or nuclear **power stations** and industries is discharged into it. Warm water holds **less dissolved oxygen**, speeds up the breathing of fish, kills sensitive species and eggs, and harms corals. **Remedies:** cool the water in **cooling towers** or **cooling ponds** before release, and reuse it in the plant.',
      v: table(['Aspect', 'Thermal pollution'], [['Cause', 'Hot water from power stations, industries'], ['Effect', 'Less dissolved oxygen; fish and eggs die'], ['Remedy', 'Cooling towers, cooling ponds, reuse']], 'Table of the cause, effect and remedy of thermal pollution'),
      n: 'Power stations and factories use huge amounts of water for cooling and often release it back into rivers or the sea while it is still hot. This is thermal pollution. Warm water holds less oxygen, so fish struggle to breathe, and their eggs and young may die. The answer is to cool the water in cooling towers or ponds first, and reuse it.',
    }),
    sl('diagram', 'Biomagnification', {
      b: '**Biomagnification** is the increase in the concentration of a **persistent, non-biodegradable** poison (such as the pesticide DDT, or mercury and lead) at each **higher level of a food chain**. The poison is not broken down or excreted, so each animal stores what it eats; a predator eating many prey collects far more. **Cause:** pesticide run-off and industrial waste reaching water. **Effects:** birds of prey lay thin-shelled eggs that break; mercury in fish once poisoned people at Minamata in Japan.',
      v: V.bio,
      n: 'Some poisons, such as certain pesticides and mercury, are never broken down. Tiny plants and animals in a lake absorb them, small fish eat many of those, large fish eat many small fish, and birds eat the large fish. At every step the poison becomes more concentrated. Top predators suffer most: birds of prey may lay thin shelled eggs, and people eating poisoned fish can fall ill.',
    }),
    sl('example', 'Worked example: reading the food chain', {
      b: `**Problem.** Using the illustrative figures, (a) how many times more concentrated is the pesticide in the fish-eating bird than in the plankton? (b) Why does this happen?\n\n**(a)** $\\dfrac{${BIRD}}{${PLANK}} = ${factor}$ times.\n\n**(b)** The pesticide is persistent: it is not broken down or excreted, so it builds up in body fat. Each predator eats many prey and keeps the poison from all of them, so the concentration rises at each step.`,
      v: table(['Level', 'Concentration (ppm, illustrative)'], [['Lake water', String(ppm('Lake water'))], ['Plankton', String(PLANK)], ['Small fish', String(ppm('Small fish'))], ['Large fish', String(ppm('Large fish'))], ['Fish-eating bird', String(BIRD)]], 'Table of illustrative pesticide concentrations along a food chain'),
      n: 'Divide the bird’s concentration by the plankton’s: the poison is two hundred and fifty times more concentrated in the bird. This happens because the pesticide is not broken down or passed out of the body. Every predator eats many prey and keeps all of their poison, so the amount stored keeps multiplying as we move up the food chain.',
    }),
    sl('check', 'Quick check: key terms', {
      b: 'Match a key term with its cause or effect.',
      n: 'Quick check. Nutrients cause eutrophication; persistent poisons cause biomagnification.',
      chk: 'term-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Accumulated waste spoils the landscape, pollutes water (leachate), air (burning, methane) and soil, and spreads disease.',
        'Waste management is essential: more urban waste, scarce land, health, environment, resources, jobs; Swachh Bharat Mission and the 2016 rules.',
        'Global warming: greenhouse gases trap heat; acid rain: sulphur and nitrogen oxides.',
        'Eutrophication: excess nutrients → algal bloom → oxygen loss; thermal pollution: hot water discharge.',
        'Biomagnification: persistent poisons concentrate up the food chain.',
      ],
      v: table(['Term', 'Key cause'], [['Global warming', 'Greenhouse gases'], ['Acid rain', 'Sulphur dioxide, nitrogen oxides'], ['Eutrophication', 'Nitrates, phosphates'], ['Biomagnification', 'Persistent poisons such as DDT'], ['Thermal pollution', 'Hot water discharge']], 'Summary table of five key terms and their causes'),
      n: 'To sum up Part 1. Waste left to pile up spoils the landscape, poisons water, air and soil, and spreads disease, so growing cities must manage it. Global warming comes from heat trapping gases, acid rain from sulphur and nitrogen gases, eutrophication from too many nutrients, thermal pollution from hot water, and biomagnification from poisons that build up along food chains.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For effects of waste, cover landscape, pollution and health, each with a local example.',
        'For each key term give a definition, one cause and one effect.',
        'Explain eutrophication as a chain: nutrients, algae, decay, oxygen loss.',
        'Biomagnification needs a persistent (non-biodegradable) substance.',
      ],
      v: table(['Slip', 'Fix'], [['Acid rain is caused by carbon monoxide', 'Sulphur dioxide and nitrogen oxides'], ['Eutrophication adds oxygen to lakes', 'It removes oxygen'], ['Thermal pollution is noise from machines', 'It is heated water released into water bodies']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. When asked about the harm caused by waste, write about the landscape, pollution and health, with local examples. For each key term, give a definition, a cause and an effect. Describe eutrophication as a chain of steps. And remember that thermal pollution means heated water released into rivers, not noise.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Waste Management — Part 2: Safe disposal and the three Rs',
  goals: [
    'Explain why segregation at source is the first step of waste management',
    'Compare landfill dumping with composting',
    'Suggest ways to reduce, reuse and recycle waste at home and school',
    'Work out shares of household waste from illustrative data',
  ],
  slides: [
    sl('title', 'From bin to benefit', {
      b: 'Part 2 — Safe disposal starts at home. Waste that is **separated** can be **composted**, **recycled** or **safely landfilled**; mixed waste can only be dumped. The best waste of all is the waste we never create — the idea behind **reduce, reuse, recycle**.',
      v: table(['Method', 'What it does'], [['Segregation at source', 'Separates wet, dry and hazardous waste at home'], ['Composting', 'Turns wet waste into manure'], ['Recycling', 'Turns dry waste into new products'], ['Sanitary landfill', 'Safely buries what is left']], 'Table of methods of safe disposal and what each does'),
      n: 'In this part we follow waste from the bin to safe disposal. If waste is separated at home, the wet part can become compost, the dry part can be recycled, and only a little needs to be buried in a properly built landfill. Mixed waste can only be dumped. Best of all is to create less waste in the first place, by reducing, reusing and recycling.',
    }),
    sl('concept', 'Segregation at source: the first step', {
      b: '**Segregation at source** means separating waste where it is produced — in the home, school or shop — into: **wet (biodegradable)** waste such as food scraps and garden waste (**green bin**); **dry** waste such as paper, plastic, glass and metal (**blue bin**); and **domestic hazardous** waste such as batteries, broken bulbs, medicines and paint, kept separately. **Why first:** clean wet waste can be composted and clean dry waste recycled; hazardous items are kept away from people and soil; much less goes to landfill; waste workers are safer; collection is cheaper.',
      v: flow('LR', [['a', 'Household waste'], ['b', 'Green bin: wet'], ['c', 'Blue bin: dry'], ['d', 'Hazardous: separate'], ['e', 'Compost'], ['f', 'Recycling'], ['g', 'Safe special disposal']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['b', 'e'], ['c', 'f'], ['d', 'g']], 'Flow of household waste separated into wet, dry and hazardous streams, each with its own destination'),
      n: 'Segregation at source means sorting waste where it is made. Food scraps and garden waste go into the green bin, paper, plastic, glass and metal into the blue bin, and batteries, broken bulbs and old medicines are kept apart. This is the first step because clean wet waste can become compost and clean dry waste can be recycled, while dangerous items are kept away from people.',
    }),
    sl('diagram', 'What is in a household bin?', {
      b: `The chart shows the illustrative daily waste of one household: total ${houseTotal().toFixed(1)} kg. **Wet** kitchen and garden waste is ${share(wetKg)}%; **recyclable** dry waste (paper, plastic, glass and metal) is ${recyclableKg()} kg, or ${share(recyclableKg())}%; dust and inert material ${share(kg('Dust and inert'))}%; domestic hazardous waste ${share(kg('Domestic hazardous'))}%. Most of a typical Indian household’s waste is wet and can be composted.`,
      v: V.bar,
      n: 'This chart shows what one imaginary household throws away in a day: two kilograms in all. Half of it is wet kitchen and garden waste, which could be composted. Paper, plastic, glass and metal make up nearly a third and could be recycled. Only the dust, inert material and the small hazardous part really need special disposal.',
    }),
    sl('check', 'Quick check: segregation', {
      b: 'Place an item in the correct bin.',
      n: 'Quick check. Food scraps go in the green bin; paper and plastic go in the blue bin.',
      chk: 'seg-chk',
    }),
    sl('example', 'Worked example: how much can a household divert?', {
      b: `**Problem.** Using the household figures, find (a) the share of recyclable dry waste, (b) the waste produced in a week, and (c) the percentage of waste kept out of the dump if wet waste is composted and dry waste recycled.\n\n**(a)** $\\dfrac{${recyclableKg()}}{${houseTotal().toFixed(1)}} \\times 100 = ${share(recyclableKg())}$%.\n\n**(b)** $${houseTotal().toFixed(1)} \\times 7 = ${houseTotal() * 7}$ kg.\n\n**(c)** $\\dfrac{${wetKg.toFixed(1)} + ${recyclableKg()}}{${houseTotal().toFixed(1)}} \\times 100 = ${saved}$%.`,
      v: table(['Stream', 'kg a day', 'Destination'], [['Wet', wetKg.toFixed(1), 'Compost'], ['Recyclable dry', String(recyclableKg()), 'Recycling'], ['Inert and hazardous', String(Math.round((houseTotal() - wetKg - recyclableKg()) * 10) / 10), 'Landfill or special disposal']], 'Table of the household waste streams and destinations'),
      n: 'The recyclable dry waste is six tenths of a kilogram out of two, which is thirty per cent. In a week the family throws away fourteen kilograms. If the wet waste is composted and the dry waste recycled, one point six kilograms a day never reach the dump, which is eighty per cent of the total. Segregation makes that possible.',
    }),
    sl('concept', 'Dumping: open dumps and sanitary landfills', {
      b: '**Open dumping** — tipping mixed waste on open land or low-lying areas — is cheap but causes leachate, methane fires, smoke, smells, flies and rats, and wastes land. A **sanitary landfill** is an engineered site: a pit lined with **clay and plastic**, **leachate collected** and treated, waste spread in thin **cells** with **daily soil cover**, **gas vents** for methane, and a final **clay cap** with soil and grass. Under the 2016 rules, only **inert rejects** that cannot be composted or recycled should go to landfills. Problems: land near cities is scarce and costly, and landfills fill up.',
      v: table(['Feature', 'Open dump', 'Sanitary landfill'], [['Liner', 'None', 'Clay and plastic'], ['Leachate', 'Seeps into groundwater', 'Collected and treated'], ['Cover', 'None; fires and flies', 'Daily soil cover; cap'], ['Methane', 'Escapes, catches fire', 'Vented or collected']], 'Table comparing an open dump and a sanitary landfill'),
      n: 'Open dumping simply tips mixed rubbish on open ground. It is cheap, but it pollutes groundwater, catches fire, smells and breeds disease. A sanitary landfill is carefully built: the pit is lined with clay and plastic, the leachate is piped away for treatment, each day’s waste is covered with soil, methane is vented, and the finished site is capped and grassed. Only waste that cannot be reused should go there.',
    }),
    sl('diagram', 'Inside a sanitary landfill', {
      b: 'Follow the layers from the bottom: **groundwater** lies safely below a **clay and plastic liner**; a **leachate pipe** on the liner carries polluted liquid to treatment; waste is laid in **cells** separated by **daily soil cover**; a **vent** releases or collects **methane**; a **clay cap, soil and grass** seal the top when the landfill is full.',
      v: V.fill,
      n: 'Look at the layers. At the bottom, a liner of clay and plastic keeps polluted liquid away from the groundwater below. A pipe on the liner collects that liquid and sends it for treatment. Waste is laid in cells, each covered with soil every day. A vent lets out methane gas, and when the landfill is full it is sealed with clay, soil and grass.',
    }),
    sl('check', 'Quick check: landfills', {
      b: 'Identify a feature of a sanitary landfill.',
      n: 'Quick check. A liner and leachate pipe protect groundwater in a sanitary landfill.',
      chk: 'landfill-chk',
    }),
    sl('diagram', 'Composting and vermicomposting', {
      b: '**Composting** is the decomposition of **biodegradable** waste by **microbes**, in the presence of **air**, into dark, crumbly, humus-rich **compost** (manure). In a **pit or bin**, kitchen waste is layered with dry leaves and a little soil, kept moist and turned regularly; it is ready in about six to eight weeks. In **vermicomposting**, **earthworms** eat the waste and leave nutrient-rich castings. Compost returns nutrients to the soil, cuts the need for chemical fertilisers and keeps wet waste out of dumps, where it would rot without air and give off methane.',
      v: V.comp,
      n: 'Composting lets microbes, and in vermicomposting earthworms, turn kitchen and garden waste into rich, dark manure. Layer the scraps with dry leaves and a little soil, keep the heap moist and turn it now and then, and in six to eight weeks it is ready. Compost feeds the soil, saves fertiliser and keeps wet waste out of dumps, where it would rot and give off methane.',
    }),
    sl('example', 'Worked example: landfill or compost?', {
      b: '**Problem.** A municipality must decide what to do with its wet waste. Compare dumping it in a landfill with composting it under four headings.\n\n**Land:** landfill uses scarce land for decades; composting needs small yards or home pits.\n\n**Pollution:** wet waste in landfills rots without air, producing methane and leachate; composting is aerobic and produces little methane.\n\n**Product:** landfill gives nothing back; composting gives manure.\n\n**Cost and care:** landfill needs transport and engineering; composting needs segregated waste and regular turning.',
      v: table(['Heading', 'Landfill', 'Composting'], [['Land', 'Large, long-term', 'Small'], ['Pollution', 'Methane, leachate', 'Little methane'], ['Product', 'None', 'Manure'], ['Needs', 'Transport, engineering', 'Segregation, turning, moisture']], 'Table comparing landfill dumping with composting for wet waste'),
      n: 'Compare the two for wet waste. A landfill eats up scarce land for decades, and buried food waste rots without air, giving off methane and leachate. Composting needs little space, produces little methane because air reaches the waste, and gives back useful manure. Its only demands are that waste be separated and that the heaps be kept moist and turned.',
    }),
    sl('check', 'Quick check: composting', {
      b: 'State a benefit of composting over landfilling.',
      n: 'Quick check. Composting turns wet waste into manure and keeps it out of landfills.',
      chk: 'compost-chk',
    }),
    sl('concept', 'Reduce, reuse, recycle', {
      b: '**Why:** natural resources and energy are saved; less waste reaches dumps; pollution falls; recycling gives jobs. **Reduce** (best): carry **cloth bags** and refillable bottles; refuse **single-use plastics** (India banned several such items from July 2022, as of the early 2020s); buy loose or in larger packs; plan meals to avoid food waste. **Reuse:** use glass jars and boxes again; write on both sides of paper; repair rather than replace; pass on books, uniforms and clothes. **Recycle:** give paper, cardboard, metal, glass and plastic to recyclers or the kabadiwala; send **e-waste** to authorised collectors.',
      v: table(['R', 'At home', 'At school'], [['Reduce', 'Cloth bags; no single-use plastic', 'Refillable bottles; digital notices'], ['Reuse', 'Glass jars; repair', 'Book banks; both sides of paper'], ['Recycle', 'Sell paper, metal to kabadiwala', 'Paper collection drives; e-waste bins']], 'Table of ways to reduce, reuse and recycle at home and at school'),
      n: 'The three Rs save resources and energy and cut pollution. Reducing is best: carry a cloth bag and a refillable bottle, refuse single use plastic and do not waste food. Reusing means giving things a second life: jars, boxes, paper used on both sides, and books and uniforms passed on. Recycling turns paper, metal, glass and plastic into new products.',
    }),
    sl('concept', 'Good practice in Indian cities and schools', {
      b: '**Indore** became known for segregating waste into several streams and composting wet waste, and was ranked India’s cleanest city in several national surveys (as of the early 2020s). **Alappuzha** in Kerala manages much of its waste through home and community composting. In **Pune**, a cooperative of waste pickers (SWaCH) collects segregated waste door to door. Schools can run **compost pits**, **paper recycling drives**, **plastic-free campuses** and **e-waste collection boxes**.',
      v: table(['Place', 'Practice'], [['Indore', 'Segregation into many streams; composting'], ['Alappuzha', 'Home and community composting'], ['Pune', 'Waste-picker cooperative, door-to-door collection'], ['Your school', 'Compost pit, paper drive, no plastic']], 'Table of examples of good waste-management practice'),
      n: 'Some Indian towns show what is possible. Indore separates its waste into several streams and composts the wet part, and it has repeatedly topped national cleanliness surveys. Alappuzha in Kerala composts much of its waste at home and in neighbourhoods. In Pune, a cooperative of waste pickers collects separated waste from homes. Your school can start with a compost pit and a paper drive.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Segregation at source (wet, dry, domestic hazardous) is the first step; it makes composting and recycling possible.',
        'Open dumps pollute; sanitary landfills are lined, covered, vented and capped and should take only inert rejects.',
        'Composting: aerobic decay of wet waste into manure; vermicomposting uses earthworms.',
        'Composting beats landfilling for wet waste: less land, less methane, a useful product.',
        'Reduce, reuse, recycle saves resources, energy and land; reduce is best.',
      ],
      v: table(['Waste type', 'Best route'], [['Wet', 'Compost'], ['Dry', 'Recycle'], ['Hazardous', 'Special collection'], ['Inert rejects', 'Sanitary landfill']], 'Summary table of the best route for each waste type'),
      n: 'To sum up Part 2. Sorting waste at home into wet, dry and hazardous is the first and most important step. Wet waste should be composted, dry waste recycled, hazardous waste collected separately, and only the leftovers placed in a properly built landfill. And the best way to manage waste is to make less of it, by reducing, reusing and recycling.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Say why segregation is the first step: it enables composting and recycling and isolates hazardous waste.',
        'Distinguish an open dump from a sanitary landfill by liner, leachate, cover and gas.',
        'Compare landfill and composting under clear headings: land, pollution, product, cost.',
        'Give practical 3R examples for home and school.',
      ],
      v: table(['Slip', 'Fix'], [['Composting happens without air', 'It is aerobic; landfills rot without air'], ['Batteries go in the green bin', 'Keep them as hazardous waste'], ['Recycling is better than reducing', 'Reducing comes first']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Explain why segregation comes first: it makes composting and recycling possible and keeps hazardous items apart. Distinguish an open dump from a sanitary landfill by its liner, leachate pipe, soil cover and gas vent. Compare landfill and composting under clear headings. And give practical examples of the three Rs, remembering that reducing comes first.',
    }),
  ],
});
